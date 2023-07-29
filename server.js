import app from './index.js';
const Port = process.env.PORT;
app.listen(Port,()=>{
    console.log(`server running http://localhoast:${Port}`)
})