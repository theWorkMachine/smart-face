const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json("incorrect form submission")
    }
    db.select('email', 'hash')
        .from('login')
        .where('email', '=', req.body.email)
        .then(cred => {
            const isValid = bcrypt.compareSync(password, cred[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get users'))
            } else {
                res.status(400).json('invalid credentials!')
            }
        })
        .catch(err => res.status(400).json('invalid username or password'))
}

module.exports = {
    handleSignIn
}