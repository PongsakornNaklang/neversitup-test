const axios = require('axios');

const postProfile = async (payload) => {
    try {
        const res = await axios.post('http://localhost:3001/user/profile', payload);
        console.log(res);
        return res
    } catch (err) {
        console.log(err);
        return err
    }
}

module.exports = { postProfile }
