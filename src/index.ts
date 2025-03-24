import type { Core } from '@strapi/strapi'
import { localeSwitchLogger } from './utils/document-service-middlewares'

export default {
  register({ strapi }: { strapi: Core.Strapi }) {
    const middlewares = [localeSwitchLogger]
    middlewares.forEach((middleware) => {
      strapi.documents.use(middleware())
    })
  },
  bootstrap() {},
}
