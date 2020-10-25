module.exports={
    updateContact: async function(_id, name, number, email){
        if(name || number || email){
            await MongoClient.connect(mongoUrl, function(err,db){
                dbo=db.db("portfolio");

                if(name)
                    dbo.collection("contacts").findOneAndUpdate({"_id": ObjectId(_id)}, {
                        $set:{name:name}
                    });

                if(number)
                    dbo.collection("contacts").findOneAndUpdate({"_id": ObjectId(_id)}, {
                        $set:{number:number}
                });

                if(email)
                    dbo.collection("contacts").findOneAndUpdate({"_id": ObjectId(_id)}, {
                        $set:{email:email}
                });
            });
            res.redirect('/admin');
        }
    }
};