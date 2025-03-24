const localeSwitchLogger = () => {
  return async (context, next) => {
    const locale =
      context.params?.locale ||
      context.request?.query?.locale ||
      context.params?.data?.locale

    const isDraft = context.params?.data?.publishedAt == null

    // Inject EAN before update happens
    if (context.action === 'update' && locale && isDraft) {
      const eanCode = await strapi.service('api::test.test').getSavedEan()
      if (eanCode) {
        context.params.data.ean = eanCode // <-- This must happen BEFORE next()
      }
    }

    const result = await next() // Perform the update with modified payload

    // Optionally, after creation/localization, save the EAN
    if (['create', 'createLocalization'].includes(context.action)) {
      await strapi.service('api::test.test').saveEanCode(result)
    }

    return result
  }
}

export { localeSwitchLogger }
