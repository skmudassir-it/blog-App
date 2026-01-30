import type { CollectionBeforeChangeHook } from 'payload'
import readingTime from 'reading-time'

export const populateReadTime: CollectionBeforeChangeHook = async ({ data, req }) => {
    if (data?.content) {
        // We need to extract text from RichText. 
        // This is a simplified extraction. For robust Lexical extraction, we might need to traverse.
        // However, just JSON stringifying might give enough tokens for an estimate.
        const textContent = JSON.stringify(data.content)
        const stats = readingTime(textContent)
        data.readTime = stats.minutes
    }
    return data
}
