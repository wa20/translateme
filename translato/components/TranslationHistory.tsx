

import { ITranslation } from '@/mongodb/models/User'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import TimeAgoText from './TimeAgoText';

const getLanguage = (code: string) => {
    const lang = new Intl.DisplayNames(['en'], {type: "language"});
    return lang.of(code);
}

async function TranslationHistory() {
    const { userId } = auth()

    const url = `${process.env.NODE_ENV === "development" ? "http://localhost:3000" : process.env.VERCEL_URL}/translation-history?userId=${userId}`

    const response = await fetch(url, {
        next: {
            tags: ['translation-history']
        }
    })

    const { translations }: { translations: Array<ITranslation> } = await response.json()

    console.log('translation hitory: ', translations)
    return (
        <div>
            <h1 className='text-3xl my-5'>Translation History</h1>

            {translations.length === 0 && (
                <p className='mb-5 text-gray-400'>You currently have no translations.</p>
            )}

            <ul className='divide-y border rounded-md'>
                {translations.map((translation) => (
                    <li 
                    key={translation._id}
                    className='flex justify-between items-centerp-5 hover:bg-gray-50 relative'
                    
                    >
                        <p className='text-sm mb-5 text-gray-500'>
                            {getLanguage(translation.from)}
                            {" -> "}
                            {getLanguage(translation.to)}
                        </p>
                        <div className='space-y-2 pr-5'>
                            <p>{translation.fromText}</p>
                            <p className='text-gray-400'>{translation.toText}</p>
                        </div>

                        {/* TODO add TimeAgo component  */}
                        <p className='absolute top-2 right-2 text-gray-300 text-sm'>
                            <TimeAgoText date={new Date(translation.timestamp).toISOString()}></TimeAgoText>
                        </p>
                        

                        {/* TODO add delete button */}


                    </li>
                ))}
            </ul>
        </div>
    ) 
}

export default TranslationHistory