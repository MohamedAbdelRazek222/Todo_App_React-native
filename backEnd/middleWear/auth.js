const jwt = require('jsonwebtoken');
const {
    userModel
} = require('../DB/Model/User');

const auth = () => {



    return async (req, res, next) => {

        try {

            console.log(req.headers)
            const headerToken = req.headers['authorization']

            console.log(JSON.stringify(headerToken));
            if (!headerToken || headerToken == undefined ||
                headerToken == null || !headerToken.startsWith(`${process.env.Bearer} `)) {


                res.json({
                    message: "in-valid token "
                })

            } else {

                const token = headerToken.split(" ")[1]
                console.log({token})
                const decoded = jwt.verify(token, process.env.loginToken)

                console.log({
                    decoded
                });
                if (decoded && decoded.isLogged) {

                    const findUser = await userModel.findById({
                        _id: decoded._id
                    })


                    if (!findUser) {


                        res.json({
                            message: "invalid  login user"
                        });



                    } else {
                        req.user = findUser

                        next()

                    }


                } else {
                    res.json({
                        message: "invalid  token signture"
                    });

                }

            }
        } catch (e) {


            res.json({
                message: "error auth",
                e
            })

        }

    }
}
module.exports = {
    auth
}