//get reference to first select element
const currencyEl_one = document.getElementById('currency-one')

//get reference to second select element
const currencyEl_two = document.getElementById('currency-two')

//get reference to first input element
const amountEl_one = document.getElementById('amount-one')

//get reference to second input element
const amountEl_two = document.getElementById('amount-two')

//get reference to rate
const rateEl = document.getElementById('rate')

//get reference to swap button
const swap = document.getElementById('swap')

function calculate() {
  //getting value of first select
  const currency_one = currencyEl_one.value

  //get reference to second select
  const currency_two = currencyEl_two.value

  //fetching the api
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data)

      //searching for the second select element from the api object
      const rate = data.rates[currency_two]

      //changing the rate text accordingly
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

      //changing the second input according to the rate
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2)
    })
}

//event for the first select element
currencyEl_one.addEventListener('change', calculate)

//event for the first input
amountEl_one.addEventListener('input', calculate)

//event for the second select element
currencyEl_two.addEventListener('change', calculate)

//event for the second input
amountEl_two.addEventListener('input', calculate)

//eveny for swap button
swap.addEventListener('click', function () {
  const temp = currencyEl_one.value

  currencyEl_one.value = currencyEl_two.value

  currencyEl_two.value = temp
  calculate()
})

calculate()

///

let btcPrice = 0

let ltcPrice = 0
let dogePrice = 0

async function getBtcPrice() {
  if (btcPrice !== 0) {
    document.getElementById('oneBtcPrice').innerHTML =
      ' $' + Number.parseFloat(btcPrice).toFixed(2)
  } else {
    try {
      fetch('https://api.coincap.io/v2/assets')
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(
              `Request error! ${response.status} ${response.statusText}`
            )
          } else if (response.ok == false) {
            throw new Error('Request ok is false!')
          }
          return response.json() // can be .json() or text()
        })
        .then(function (crypto) {
          console.log(crypto.data)
          console.log(crypto.data[0].priceUsd) //BTC
          console.log(crypto.data[19].priceUsd) //LTC
          console.log(crypto.data[12].priceUsd) //Doge

          btcPrice = crypto.data[0].priceUsd
          ltcPrice = crypto.data[19].priceUsd
          dogePrice = crypto.data[12].priceUsd

          document.getElementById('oneBtcPrice').innerHTML =
            ' $' + Number.parseFloat(btcPrice).toFixed(2)
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      document.querySelector('#oneBtcPrice').textContent = 'Error!'
    }
  }
}

window.addEventListener('load', getBtcPrice)

let usdOrBtc = document.getElementById('usdOrBtc')
usdOrBtc.addEventListener('change', function () {
  if (usdOrBtc.value === 'usdToBtc') {
    document.querySelector('.inputs').innerHTML =
      '<input id="usd" type="number" placeholder="Enter USD" step="0.01">'
  } else {
    document.querySelector('.inputs').innerHTML =
      '<input id="btc" type="number" placeholder="Enter BTC" step="0.000000001"></input>'
  }
})

function convert() {
  if (usdOrBtc.value === 'usdToBtc') {
    let usd = document.getElementById('usd').value

    if (usd !== undefined && usd !== null && usd !== '' && usd !== '0') {
      let sum = usd / btcPrice
      console.log('the converted sum is ' + sum)

      document.getElementById('currency').textContent = 'BTC '

      document.getElementById('amount').textContent = sum.toFixed(9)
    }
  } else {
    let btc = document.getElementById('btc').value

    if (btc !== undefined && btc !== null && btc !== '' && btc !== '0') {
      let sum = btc * btcPrice
      console.log('the converted sum is ' + sum)

      document.getElementById('currency').textContent = 'BTC '

      document.getElementById('amount').textContent = sum.toFixed(9)
    }
  }
}
