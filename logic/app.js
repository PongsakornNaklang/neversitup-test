const prompt = require('prompt-sync')();

const validatePincode = (pincode) => {
    let duplicateSetCount = 0

    //validate input must be number and at least 6 char
    if (isNaN(pincode) || pincode.length < 6) {
        return false
    }

    for (let i = 0; i < pincode.length; i++) {
        const num1 = pincode[i]
        const num2 = pincode[i + 1]
        const num3 = pincode[i + 2]

        //validate more than 2 duplicates number
        if (num1 === num2 && num1 === num3) {
            return false
        }

        //validate consecutive number
        if (((num1 - num2) === -1 && (num2 - num3) === -1) || ((num1 - num2) === 1 && (num2 - num3) === 1)) {
            return false
        }

        //count duplicates number set
        if (num1 == num2) {
            duplicateSetCount += 1
        }
    }

    //validate more than 2 duplicates number set
    if (duplicateSetCount >= 3) {
        return false
    }

    return true
}

function main() {
    const pincode = prompt('Enter your PIN code: ')
    const isValid = validatePincode(pincode)

    if (isValid) {
        console.log('PIN code is valid')
    } else {
        console.log('Invalid PIN code')
    }
}

main()
