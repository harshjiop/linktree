import jwt from "jsonwebtoken";
const jwtAuth =  (req, res, next) => {
    try {
        const token = req.header("token")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        const payload =  jwt.verify(token, process.env.JWT_SECRET_KEY
            , (err, user) => {
            if (err) return res.status(400).json({ msg: "Authorization is not valid." });
            // console.log("user",user);
            req.user = user;
            next()
        }
        )
        // req.user = { id: payload.id, email: payload.email };
        // console.log(res.user);
    } catch (err) {
        return res.status(400).json({ msg: err.msg })

    } 
    

};
export default jwtAuth;
