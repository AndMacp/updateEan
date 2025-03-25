const fieldsArray: { [key: string]: any }[] = []

const eanHelper = {
  saveUnlocalizedFields(result: any, uid: any) {
    const schema = strapi.contentTypes[uid]

    const systemFields = [
      'createdAt',
      'updatedAt',
      'publishedAt',
      'createdBy',
      'updatedBy',
      'locale',
      'localizations',
    ]

    Object.entries(schema.attributes).forEach(([key, attr]) => {
      if (
        !(attr as any).pluginOptions?.i18n?.localized &&
        !systemFields.includes(key)
      ) {
        fieldsArray.push({ [key]: result[key] })
      }
    })
  },

  getFieldsArray() {
    return fieldsArray
  },
}

export { eanHelper }
