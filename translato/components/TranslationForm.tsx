"use client";

import { TranslationLanguages } from "@/app/translate/page";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TranslationForm({ languages }: { languages: TranslationLanguages }) {
  return (
    <div>
      <form>
        <div>
          <Select>
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
        </div>
      </form>
    </div>
  );
}

export default TranslationForm;
