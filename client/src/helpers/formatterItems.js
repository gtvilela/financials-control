function formatCurrency(money) {
    const moneyFormatter = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return moneyFormatter.format(money)
}
module.exports = {
    formatCurrency
}