const Doner = require('./Donerschema');
const User = require('./Userschema');


module.exports = async function(req, res, next) {
    const token = req.header('token');
    
    const response = await Doner.find({token: token});

    const response1 = await User.find({token: token});


    if(response.length > 0 || response1.length>0)
    {
        next()
    }
    else
    {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
