

import { ITranslation } from '@/mongodb/models/User'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

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
        <div>TranslationHistory</div>
    ) 
}

export default TranslationHistory