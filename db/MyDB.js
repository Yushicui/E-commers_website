import { query } from "express";
import { MongoClient } from "mongodb";

const MyDB = () => {
  const uri =
    "mongodb+srv://admin:admin@cluster0.duh9gcc.mongodb.net/?retryWrites=true&w=majority";
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("eCommer");
    return { client, db };
  };

  myDB.getUser = async (query = {}) => {
    const { client, db } = connect();
    const userCollection = db.collection("users");
    try {
      return userCollection.findOne(query);
    } catch (e) {
      await client.close();
    }
  };

  myDB.createUser = async (doc = {}) => {
    const { client, db } = connect();
    const userCollection = db.collection("users");
    try {
      return userCollection.insertOne(doc);
    } catch (e) {
      await client.close();
    }
  };

  myDB.getSearch = async ({ query = {}, MaxElements = 20 } = {}) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    //console.log("getSearch function", query);
    //find the query in the dataset
    //db.collection.find( { qty: { $gt: 4 } } )
    try {
      return await bookCollection.find(query).limit(MaxElements).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  //filter the query by isbn

  myDB.getBookByISBN = async ({ query = {} }) => {
    const { client, db } = connect();
    const bookCollection = db.collection("books");
    console.log("in the mongodb object .js search for");
    try {
      return await bookCollection.find(query).toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
};

export const myDB = MyDB();
