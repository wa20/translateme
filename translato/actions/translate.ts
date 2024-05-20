'use server'

import { State } from "@/components/TranslationForm"
import { auth } from "@clerk/nextjs/server"
import { Input } from "postcss"
import { v4 } from "uuid"
import axios from 'axios';

const key = process.env.AZURE_TEXT_TRANSALATION_KEY
const endpoint = process.env.AZURE_TEXT_TRANSALATION
const location = process.env.AZURE_TEXT_LOCATION


async function translate(prevState: State, formData: FormData) {

 auth().protect()

 const { userId } = auth()

 if(!userId) throw new Error("user not found")

 
    const rawFromData = {
        input: formData.get("input") as string,
        inputLanguage: formData.get('inputLanguage') as string,
        output: formData.get('output') as string,
        outputLanguage: formData.get('outputLanguage') as string
    };


    //  request to the Azure Translator API to translate the input text
    const response = await axios({
        baseURL: process.env.AZURE_TEXT_TRANSALATION, //endpoint
        url: '/translat',
        method: 'POST',
        headers: {
            "Ocp-Apim-Subscription-key": key!,
            "Ocp-Apim-Subscription-Region": location!,
            "Content-type": "application/json",
            "X-ClientTraceId": v4().toString(),
        },

        params: {
            "api-version": "3.0",
            from: rawFromData.inputLanguage === "auto" ? null : rawFromData.inputLanguage,
            to: rawFromData.outputLanguage,

        },
        data: [{
            text: rawFromData.input 
        }],
        responseType: "json",
    })

    const data = response.data;

    if (data.error) {
        console.log(`Error ${data.error.code}: ${data.error.message}`)
    }

    //Push to MongoDB 
    return {
        ...prevState,
        output: data[0].translations[0].text
    }


 
}

export default translate