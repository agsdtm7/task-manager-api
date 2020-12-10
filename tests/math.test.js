const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .2)
    expect(total).toBe(12)
})

test('Should calculate with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should convert from 32 Fahrenheit to 0 Celsius', () => {
    const temperature = fahrenheitToCelsius(32)
    expect(temperature).toBe(0)
})

test('Should convert from 0 Celsius to 32 Fahrenheit', () => {
    const temperature = celsiusToFahrenheit(0)
    expect(temperature).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done() //
//     }, 2000)
// })

test('Should add two number', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Should add two numbers async/await', async () => {
    const sum = await add(10, 23)
    expect(sum).toBe(33)
})

// THIS IS WRONG!!!!
// test('Should add two numbers', (demo) => {
//     const total = add(2, 3)
//     expect(total).toBe(5)
//     demo()
// })