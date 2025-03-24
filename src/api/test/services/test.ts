/**
 * test service
 */

import { factories } from '@strapi/strapi'

let savedEan

export default factories.createCoreService('api::test.test', ({ strapi }) => ({
  async saveEanCode(eanCode) {
    savedEan = eanCode.ean
  },

  async getSavedEan() {
    return savedEan
  },
}))
