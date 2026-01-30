import { getPlaiceholder } from 'plaiceholder'
import type { CollectionBeforeChangeHook } from 'payload'

export const generateBlur: CollectionBeforeChangeHook = async ({ data, req, operation }) => {
    if (operation !== 'create' && operation !== 'update') return data

    if (req.file) {
        try {
            const fileValues = req.file
            const buffer = fileValues.data
            const { base64 } = await getPlaiceholder(buffer)
            data.blurDataURL = base64
        } catch (err) {
            req.payload.logger.error(`Error generating blur data URL: ${err}`)
        }
    }

    return data
}
