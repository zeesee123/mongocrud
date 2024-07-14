    // console.log('this is the server file');

    const express=require('express');

    const app=express();

    const {MongoClient}=require('mongodb');

    const createRouter=require('./routes');

    let client;

    // console.log(MongoClient);

    //middleware stuff

    app.set('view engine','ejs');

    app.use(express.urlencoded({extended:true}));

    app.use(express.json());


    //routing

    

    async function createServer(){

        const url='mongodb+srv://zubinchadha:chowmein123@cluster0.d8dfvzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        
        client=await MongoClient.connect(url);

        const router=createRouter(client);

        app.use('/',router);

        // console.log('************this is the client***************',client);

        app.listen(3000,()=>{

            console.log('server is running');
        })



        
    }


    createServer();
    
    