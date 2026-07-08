export const Formatprice = (price: number): string => {
    if (price > 10000000) {
        const cr = (price / 10000000).toFixed(1).replace(/\.0$/, '') + ' Cr'
        return cr
    }

    if (price > 100000) {
        const l = (price / 100000).toFixed(1).replace(/\.0$/, '') + ' L'
        return l
    }

    return price.toString()
}