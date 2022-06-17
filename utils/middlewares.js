const unknownEndpoint=(req,res)=>{
    res.status(404).send({error:"unknown endpoint"});
}

const errorHandler=(error,req,res,next)=>{
    console.log(error.message);
    res.status(400).send({error:error.message});
    next(error);
}

module.exports={unknownEndpoint,errorHandler};