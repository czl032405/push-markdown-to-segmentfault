# mongoose笔记

## mongodb

### brief
base on **document** **json** **bson**

### files [windows]
- Server mongod.exe  
- Router mongos.exe  
- Client mongo.exe   
- MonitoringTools mongostat.exe, mongotop.exe  
- ImportExportTools mongodump.exe, mongorestore.exe, mongoexport.exe, mongoimport.exe
- MiscellaneousTools bsondump.exe, mongofiles.exe, mongooplog.exe, mongoperf.exe


### run the server
- default data path : \data\db
```cli
//create database
mongo [options] [db address] [file names (ending in .js)]
mongo demodatabase
```
```cli
//insert or create
db.collection.insert()
```
```cli
//read
db.collection.find()
```
```cli
//update
db.collection.update()
```
```cli
//remove
db.collection.remove()
```


### curd commands
- **if not exits, then create it**
```cli
mongo 
```

### gui viewer
- MongoDB Compass


--------

## mongoose

### connect
```javascript
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_database');
```
<!--more-->

### define model 
```javascript
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var BlogPost = new Schema({
    author    : ObjectId,
    title     : String,
    body      : String,
    date      : Date
});
```

### access model
```javascript   
//first time
var MyModel = mongoose.model('ModelName', mySchema);
//then
var MyModel = mongoose.model('ModelName');
//new instance
var myModel = new MyModel();
//save
myModel.save(callback);
//find
MyModel.find(callback);
...
...

```





> [参考资料]
https://www.mongodb.org/
https://docs.mongodb.com/manual/
https://github.com/Automattic/mongoose
http://mongoosejs.com/docs/guide.html


