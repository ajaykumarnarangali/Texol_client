export const regFormValidation = (data, setError) => {
    const err = {};
    if (!data.username || data.username.length < 3) {
        err.username = "enter valid name"
    }

    if (!data.email) {
        err.email = "enter valid email"
    }

    if (!data.password || data.password.length<5) {
        err.password = "enter valid password"
    }

    if (!data.phone || data.phone.length<10 || data.phone.length>10) {
        err.phone = "enter valid phone number"
    }
    setError(err);
    return err.name || err.age || err.email ? false : true;
}

export const signFormValidation = (data, setError) => {
    const err = {};

    if (!data.phone || data.phone.length<6 || data.phone.length>10) {
        err.phone = "enter valid phone number"
    }

    if (!data.password || data.password.length<5) {
        err.password = "enter valid password"
    }

    setError(err);
    return err.phone || err.password ? false : true;
}