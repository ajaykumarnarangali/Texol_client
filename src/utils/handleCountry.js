export const countries = [
    {
        code: '+91',
        flag: 'https://flagcdn.com/w40/in.png',
    },
    {
        code: '+1',
        flag: 'https://flagcdn.com/w40/us.png',
    },
    {
        code: '+44',
        flag: 'https://flagcdn.com/w40/gb.png',
    },
];

export const handleCountry = (setState, code) => {
    const country = countries.find((c) => c.code === code);
    if (country) {
        setState(country);
    }
};