const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors/bad-request')
const CustomAPIError = require('../errors/custom-error')



const login = async (req, res) => {
  const { username, password } = req.body
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate()

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })

  res.status(200).json({ msg: 'user created', token })
}

//mongo
//joi

const dashboard=async(req,res)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new CustomAPIError('No Token Provided',401)

    }

    const token=authHeader.split(' ')[1]
    console.log(token)

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        console.log(decoded);

        //const luckyNumber=Math.floor(Math.random()*100)

        res.status(200).json({msg:`your lucky number ${decoded.username}`});
        
    }catch(error){

        throw new CustomAPIError('No AUTHORIZED TO ACCESS THIS ROUTE',401)


    }



    
   


}

module.exports={
    login,
    dashboard
}