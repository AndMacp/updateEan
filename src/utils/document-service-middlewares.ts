import { eanHelper } from './ean-helper-functions'

const localeSwitchLogger = () => {
  return async (context, next) => {
    const uid = context.uid
    const locale =
      context.params?.locale ||
      context.request?.query?.locale ||
      context.params?.data?.locale

    const isDraft = context.params?.data?.publishedAt == null

    // Inject EAN before update happens
    if (context.action === 'update' && locale && isDraft) {
      const fields = eanHelper.getFieldsArray()
      if (fields) {
        fields.forEach((field) => {
          const key = Object.keys(field)[0]
          const value = field[key]
          context.params.data[key] = value
        })
      }
    }

    const result = await next()

    if (
      context.action === 'create' ||
      context.action === 'createLocalization'
    ) {
      eanHelper.saveUnlocalizedFields(result, uid)
    }

    return result
  }
}

export { localeSwitchLogger }
