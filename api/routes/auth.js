const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


//REGISTER

router.post("/register", async (req, res) => {
    try{

        //generate new encripted password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const user = await new User({
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            desc: req.body.desc,
            city: req.body.city,
            from: req.body.from,
            notificaciones: req.body.notificaciones,
            mensajesPorLeer: req.body.mensajesPorLeer,
            solicitudesAmistad: req.body.solicitudesAmistad,
            isAdmin: req.body.isAdmin
        });
    
        await user.save();
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})


//LOGIN

router.post("/login", async (req, res) => {
    try{
        //busco por email
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("User not found!")

        //si encuentro comparo si la contraseña coincide
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.send(404).json("wrong user or password")

        res.status(200).json(user)
    } catch (err) {
        console.log(err)
    }
})


module.exports = router;