const formatPrice = (amount: number) => {
    return (
        new Intl.NumberFormat('de-CH', {style:'currency', currency:'CHF'}).format(amount / 100)
    )
}

export default formatPrice