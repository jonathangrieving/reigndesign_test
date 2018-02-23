

# Reigndesign_test

Hacker News API consumer</br>
This node.js app gets hacker news from an API (provided by Algolia) and inserts the news from the JSON into MongoDB so they can be shown with an interface made with Pug (former Jade) that is basically a template engine.



// SETTING UP MONGODB

MongoDB Installer: https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.6.2-signed.msi/download

In order to set up the database you have to install MongoDB in your computer, afterthat you have to set your mongodb path in the command line:</br>
Example: C:\Program Files\MongoDB\Server\3.6\bin>mongod --dbpath C:/mongo-data</br>

Note: "mongod" is the command that executes the mongodb primary process.</br>
Once you've done that mongodb is ready to be called.



// Installing dependencies.

In order to install the dependencies you have to enter to the folder of the application in your terminal and run: </br>
npm install </br>
It will install the dependencies from the package.json file.
</br>
Note: If you download the ZIP from github you have to uncompress the file so you can enter to the folder from your command line.



// Running the app.

In order to run the app you should run "node app.js" in your command line and it will print "Running at localhost".</br>
Once an hour the application connects to the API and tries to get new data, you will get a message in the console if there's duplicated news trying to be saved. (It is explained in the note at the end of this document).

// FIRST INSERT FROM API TO MONGODB

The first GET route in the code ('/') is supposed to get the news from MongoDB and show them with the help of our template.</br>
You can enter to the root (http://localhost:3001) and it's not going to have any news displayed.

In order to populate MongoDB for the first time you have to enter to http://localhost:3001/firstInsert . </br>
After you do the first insert to mongodb you can go to the root route again (http://localhost:3001) and it should have a list of news displayed.


Note: In case you run firstInsert twice or more times, it's not going to insert duplicates because of the line:</br>
     >>>>>> db.news.createIndex({ objectID: 1 }, { unique: true }) <<<<<<<  </br>
It creates a unique identifier for every object inserted to our collection.</br>
In case you want to get duplicates anyways (so your console won't get any mongodb error for the duplicates) you just have to delete this line.
