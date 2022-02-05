const welcome = (req, res) => {
    res.status(200).send('Welcome')   
}

module.exports = {welcome}