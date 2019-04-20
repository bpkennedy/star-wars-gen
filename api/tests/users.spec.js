import { expect } from 'chai'
import {
  apiGet,
  setupTest
} from './fixture-helper'

describe('Ships', function () {
  setupTest(this)
  
  it('should get all ships', async () => {
    const response = await apiGet('ships')
    expect(response.status).to.eql(200)
  })
})
