"use server";

import { State } from "@/components/TranslationForm";
import { auth } from "@clerk/nextjs/server";
import { v4 } from "uuid";
import axios from "axios";
import { addOrUpdateUser } from "@/mongodb/models/User";
import { revalidateTag } from "next/cache";

const key = process.env.AZURE_TEXT_TRANSLATION_KEY;
const endpoint = process.env.AZURE_TEXT_TRANSLATION;
const location = process.env.AZURE_TEXT_LOCATION;

async function translate(prevState: State, formData: FormData) {
  auth().protect();
  const { userId } = auth();
  if (!userId) throw new Error("user not found");

  const rawFormData = {
    input: formData.get("input") as string,
    inputLanguage: formData.get("inputLanguage") as string,
    output: formData.get("output") as string,
    outputLanguage: formData.get("outputLanguage") as string,
  };

  console.log("Rawform data: ", rawFormData);

  //  request to the Azure Translator API to translate the input text
  const response = await axios({
    baseURL: endpoint,
    url: "translate",
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": key!,
      "Ocp-Apim-Subscription-Region": location!,
      "Content-type": "application/json",
      "X-ClientTraceId": v4().toString(),
    },
    params: {
      "api-version": "3.0",
      from:
        rawFormData.inputLanguage === "auto" ? null : rawFormData.inputLanguage,
      to: rawFormData.outputLanguage,
    },
    data: [
      {
        text: rawFormData.input,
      },
    ],
    responseType: "json",
  });

  const data = response.data;

  if (data.error) {
    console.log(`Error ${data.error.code}: ${data.error.message}`);
  }

  //Push to MongoDB

  //
  if (rawFormData.inputLanguage === "auto") {
    rawFormData.inputLanguage = data[0].detectedLanguage.language;
  }

  try {
    const tranlation = {
      to: rawFormData.outputLanguage,
      from: rawFormData.inputLanguage,
      fromText: rawFormData.input,
      toText: data[0].translations[0].text,
    };

    addOrUpdateUser(userId, tranlation);
  } catch (error) {
    console.error("Error adding translation to user:", error);
  }

  revalidateTag('translation-history')

  return {
    ...prevState,
    output: data[0].translations[0].text,
  };
}

export default translate;
