"use client";

import Image from "next/image";
import { TranslationLanguages } from "@/app/translate/page";
import React, { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import translate from "@/actions/translate";
import SubmitButton from "./SubmitButton";
import { Button } from "./ui/button";
import { Volume2Icon } from "lucide-react";

const initialState = {
  inputLanguage: "auto",
  input: "",
  outputLanguge: "es",
  output: "",
};

export type State = typeof initialState;

function TranslationForm({ languages }: { languages: TranslationLanguages }) {
  const [state, formAction] = useFormState(translate, initialState);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if(!input.trim()){
      return
    }
    
    const delayDebounceFn = setTimeout(() => {
      submitBtnRef.current?.click()
    }, 2000)
    return () => clearTimeout(delayDebounceFn)

  }, [input])
  

  useEffect(() => {
    if (state.output) {
      setOutput(state.output);
    }
  }, [state]);

  const playAudio = async () => {
    const synth = window.speechSynthesis;

    if(!output || !synth) return;

    const wordsToSay = new SpeechSynthesisUtterance(output);

    synth.speak(wordsToSay);
  }



  return (
    <div>

      <div className="flex space-y-2">
        <div className="flex items-center group cursor-pointer border rounded-md w-fit px-3 py-2 bg-[#E7F0FE] mb-5">
          <Image
           src="https://links.papareact.com/r9c"
           alt="logo"
           width= {30}
           height= {30}
          />
          <p className="text-sm font-medium text-blue-500 group-hover:underline ml-2 mt-1">
            Text
          </p>
        </div>
        {/* {recorder} */}
      </div>

      <form className="" action={formAction}>
        <div className="flex flex-col space-y-2 lg:flex-row lg:space-x-2">
          <div className="flex-1 space-y-2">
            <Select name="inputLanguage" defaultValue="auto">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a Language" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>
                  <SelectItem value="auto" key="auto">
                    Auto-Detection
                  </SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>

                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Textarea
              className="min-h-32 text-xl"
              placeholder="Type your message here."
              name="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <Select name="outputLanguage" defaultValue="es">
              <SelectTrigger className="w-[280px] border-none text-blue-500 font-bold">
                <SelectValue placeholder="Select a Language" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Want us to figure it out?</SelectLabel>
                  <SelectItem value="auto" key="auto">
                    Auto-Detection
                  </SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>

                  {Object.entries(languages.translation).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button 
              variant="ghost"
              type="button"
              onClick={playAudio}
              disabled={!output}
            >
              <Volume2Icon
               size={24}
               className="text-blue-500 cursor-pointer disabled:cursor-not-allowed"
              />
              
            </Button>
            </div>
            
            


            <Textarea
              className="min-h-32 text-xl"
              placeholder="Type your message here."
              name="output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <SubmitButton disabled={!input}/>
          <button type="submit" ref={submitBtnRef} hidden/>
        </div>

      </form>
    </div>
  );
}

export default TranslationForm;
