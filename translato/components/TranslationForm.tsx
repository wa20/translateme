"use client";

import { TranslationLanguages } from "@/app/translate/page";
import React, { useState } from "react";
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

const initialState = {
  inputLanguage: 'auto',
  input: '',
  outputLanguge: 'es',
  output: ''
}

export type State = typeof initialState

function TranslationForm({ languages }: { languages: TranslationLanguages }) {
  const [state, formAction] = useFormState(translate, initialState);
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')


  console.log('state: ', state)


  return (
    <div>
      <form 
      className=""
      action={formAction}
      >
        <div>
          <Select name="inputLanguge" defaultValue="auto">
            <SelectTrigger className="w-[280px]">
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

        <div>
          <Select name="outputLanguge" defaultValue="es">
            <SelectTrigger className="w-[280px]">
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
            name="output"
            value={output}
            onChange={(e) => setOutput(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">
             Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default TranslationForm;
