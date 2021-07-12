# Cookie Defaults

Express JS has a nice `res.cookie` function that makes it easy to set values
for cookies. Cookie settings are pretty important for security and this library
creates a single place to set default values to make security code review easy
and ensure consistency across the codebase.

## Installation

As usual:

```js
npm install cookie-defaults
```
## Usage:

```js
const { cookieDefaults } = require('cookie-defaults')

const app = express()

app.use(
  cookieDefaults({
    httpOnly: true,
    sameSite: true,
    secure: true,
  }),
)

app.get('/', function (req, res) {
  res.cookie('token1', 'value1') // use res.cookie without options
  res.cookie('token2', 'value2', {
    httpOnly: false, // defaults will override options
    sameSite: false,
    secure: false,
  })
  res.send('Hello World!')
})

// Resulting cookie:
// token1=value1; Path=/; HttpOnly; Secure; SameSite=Strict
// token2=value2; Path=/; HttpOnly; Secure; SameSite=Strict
```
