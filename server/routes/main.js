import {Router} from 'express'
import mongoose from 'mongoose';
import posts from '../models/post.js';
const router = Router();

    // home route
    router.get('/',async (req,res)=>{
        try {
            // const data = await posts.find(); 

            let perPage = 3;
            const page = req.query.page || 1

            const data = await posts.aggregate([{ $sort:{createdAt:-1}}])
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec();
            
            const count = await posts.countDocuments();
            const nextpage = parseInt(page) + 1;
            const hasNextPage = nextpage <= Math.ceil(count/perPage);

            res.render('index',
                {
                    data,
                    current:page,
                    nextpage:hasNextPage ? nextpage : null
                });
        } catch (error) {
            console.log(error);
        }
    });

    
    // post route
    router.get('/post/:id',async (req,res)=>{
        try {

            const locals = {
                title:"Blog post",
                description:"Simple Blog created using Nodejs,Expressjs and MongoDB"
            }
            let slug = req.params.id;
            const data = await posts.findById({_id:slug}); 

            res.render('post',{locals,data});
        } catch (error) {
            console.log(error);
        }
    });

    // post search route
    router.post('/search',async (req,res)=>{
        try {

            const locals = {
                title:"Blog post",
                description:"Simple Blog created using Nodejs,Expressjs and MongoDB"
            }
            
            let searchTerm = req.body.searchTerm;
            const searchNospecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
            const data = await posts.find({
                $or:[
                    {title:{$regex:new RegExp(searchNospecialChar,'i')}},
                    {body:{$regex:new RegExp(searchNospecialChar,'i')}}
                ]
            }); 
            res.render("search",{
                data,
                locals
            });
        } catch (error) {
            console.log(error);
        }
    });




    router.get('/about',(req,res)=>{
        res.render('about');
    });
    router.get('/contact',(req,res)=>{
        res.render('contact',{title:'home'})
    });


    // function insertpostdata() {
    //     posts.insertMany([
    //         {
    //         title:"today's day",
    //         body:"today is a great day with bit of rain"
    //         },
    //         {
    //             title:"symbiosis",
    //             body:"Great infrastructure not great study"
    //         },
    //         {
    //             title:"symbiosis",
    //             body:"Great infrastructure not great study"
    //         },
    //         {
    //             title:"symbiosis",
    //             body:"Great infrastructure not great study"
    //         },
    //         {
    //             title:"symbiosis",
    //             body:"Great infrastructure not great study"
    //         },
    //         {
    //             title:"symbiosis",
    //             body:"Great infrastructure not great study"
    //         }
    //     ])
    // }
    // insertpostdata();

export {router as main};