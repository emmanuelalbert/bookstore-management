const jsonserver=require('json-server');
const bookserver=jsonserver.create();
const router=jsonserver.router('db.json');
const middlewares=jsonserver.defaults();
bookserver.use(middlewares);
bookserver.use(router);

const PORT=process.env.PORT || 3000;
bookserver.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
