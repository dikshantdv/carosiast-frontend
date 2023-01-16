export const priceAbbr = (num) => {
    if (num > 999 && num < 100000) {
        return (num / 1000).toString().slice(0, 4) + " K";
    } else if (num >= 100000 && num < 10000000) {
        return (num / 100000).toString().slice(0, 4) + " Lakh";
    } else if (num >= 10000000) {
        return (num / 10000000).toString().slice(0, 4) + " Crore";
    } else if (num < 999) {
        return num;
    }
};