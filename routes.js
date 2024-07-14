const {Router}=require('express');

const {ObjectId}=require('mongodb');

// const router=Router();

const createRouter=(client)=>{ //the client parameter in here is the part of dependency injection in here

    const router=Router();

    router.get('/',(req,res)=>{

        // console.log('this is my page oliver');
    
        res.render('index');
    });
    
    
    router.get('/tasks',async(req,res)=>{

        try{

            const db=client.db('mongocrud');
    
            const vals=await db.collection('tasks').find().toArray();
    
            console.log('tasks are these',vals);
    
            res.json({message:'good',values:vals});

        }catch(er){

            res.json({message:er.message});
        }
    
        
    
    
    });

    router.post('/addtask',async(req,res)=>{
    
        const db=client.db('mongocrud');
    
        const {title,description}=req.body;
    
        // console.log('tasks are these',vals);

        let data=await db.collection('tasks').insertOne(req.body);

        if(data){

            res.json({message:'good insert'});
        
        }else{

            res.json({message:'bad insert'});
        }
    
        // res.send('goggo');
    
    
    })

    router.get('/get_task/:id',async(req,res)=>{

        // console.log(req.body);

        console.log(req.params.id);

        const db=client.db('mongocrud');

        let id=new ObjectId(req.params.id);

        let data=await db.collection('tasks').findOne({_id:id});
         
        console.log('this is the data',data);

        res.json({message:'giddy',data});
    })


    router.post('/editask',async(req,res)=>{

        console.log(req.body);

        let db=client.db('mongocrud');

        let id=new ObjectId(req.body.id);

        let ele=await db.collection('tasks').findOne({_id:id});

        if(ele){

            await db.collection('tasks').updateOne({_id:id},{$set:{title:req.body.title,description:req.body.description}});


            

            res.json({message:'success'});


        }else{


            res.json({message:'you are wrong buddy'});


        }

        

        


    });

    router.post('/deletetask',async(req,res)=>{

        console.log('we can delete this friggin task today and just now',req.body);

        const db=client.db('mongocrud');

        let id=new ObjectId(req.body.id);

        const data=db.collection('tasks').findOne({_id:id});

        if(data){

            await db.collection('tasks').deleteOne({_id:id});

            res.json({message:'success'});
        }
        
        

        


    });

    return router;
}




// exports.router=createRouter;
module.exports=createRouter;








