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
        context.params.data.ean = eanCode
      }
    }

    const result = await next()

    if (
      context.action === 'create' ||
      context.action === 'createLocalization'
    ) {
      await strapi.service('api::test.test').saveEanCode(result)
    }

    return result
  }
}

export { localeSwitchLogger }
