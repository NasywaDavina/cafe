const express = require(`express`)
const app = express()

const PORT = 8000

const mejaRoute = require(`./routes/meja-route`)
const menuRoute = require(`./routes/menu-route`)
const userRoute = require(`./routes/user-route`)
const transaksiRoute = require(`./routes/transaksi-route`)
const auth = require(`./routes/auth-route`)


app.use(`/auth`, auth)
app.use(mejaRoute)
app.use(menuRoute)
app.use(userRoute)
app.use(transaksiRoute)

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}`)
})