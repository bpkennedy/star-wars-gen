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
  
  before(async () => {
    require('../src/index.js')
  })

  after(async () => {
    require('../src/index.js').stop()
    delete require.cache[require.resolve('../src/index.js')]
  })

  // beforeEach(async () => {
  //     await removeExistingData()
  //     await seedDatabaseData(DataSource.knex())
  // })
}