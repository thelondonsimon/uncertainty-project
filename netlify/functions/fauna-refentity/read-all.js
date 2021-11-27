const process = require('process')
const { Client, query } = require('faunadb')
const faunaClient = new Client({
  secret: process.env.FAUNA_SECRET,
  domain: "db.us.fauna.com",
})

const handler = async () => {
  console.log('Function `fauna-refentity/read-all` invoked')

  try {
    const response = await faunaClient.query(query.Paginate(query.Match(query.Index('RefEntity_all'))))
    const itemRefs = response.data
    // create new query out of item refs. http://bit.ly/2LG3MLg
    const getAllItemsDataQuery = itemRefs.map((ref) => query.Get(ref))
    // then query the refs
    const ret = await faunaClient.query(getAllItemsDataQuery)
    return {
      statusCode: 200,
      body: JSON.stringify(ret),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
