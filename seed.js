const db = require('../CalendarBackEnd/db')
const { _Event } = require('../CalendarBackEnd/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  const Event = await _Event.create({ year: 2018, month: 10, day: 31, description: 'Party!!!' })
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })


console.log('seeding...')