const process = require('process')
const { Client, query } = require('faunadb')
const faunaClient = new Client({
  secret: process.env.FAUNA_SECRET,
  domain: "db.us.fauna.com",
})

const handler = async (event) => {
  const { id } = event
  console.log(`Function 'read' invoked. Read id: ${id}`)

  try {
    const response = await faunaClient.query(query.Call(query.Function('RefEntity_Hydrated'),id))
    return {
      statusCode: 200,
      body: JSON.stringify(response),
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
