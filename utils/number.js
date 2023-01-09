const toInt = (val) => {
    return parseInt(val) > 0 ? parseInt(val) : undefined
}

const toFloat = (val) => {
    return parseFloat(val) > 0 ? parseFloat(val) : undefined
}

module.exports = {
    toInt,
    toFloat
}