import axios from 'axios'

const apiPath = 'http://localhost:3000/api/v1/'

export async function apiGet(path) {
  return axios.get(apiPath + path)
}

export async function apiPost(path, body) {
  return axios.post(apiPath + path, {body})
}

export async function apiPut(path, body) {
  return axios.put(apiPath + path, {body})
}

export async function apiDelete(path) {
  return await axios.delete(apiPath + path)
}

export function setupTest(test) {
  const timeout = 5 * 60 * 1000
  test.timeout(timeout)
  let db
  
  before(async () => {
    const app = require('../src/index.js')
    db = app.database
  })

  after(async () => {
    require('../src/index.js').stop()
    db = null
    delete require.cache[require.resolve('../src/index.js')]
  })

  beforeEach(async () => {
    const helper = require('../src/seedDatabaseHelper')
    await helper.clearDatabase(db)
    await helper.seedDatabase(db)
  })
  
  afterEach(async () => {
    delete require.cache[require.resolve('../src/seedDatabaseHelper.js')]
  })
}