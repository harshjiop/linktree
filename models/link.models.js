import mongoose, { Schema, model } from "mongoose";
// import User from "./user.models.js";

const linkSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    links: [
      {
        title: {
          type: "string",
          required: true,
        },
        link: {
          type: "string",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const link = model("link", linkSchema);
export default link;

// pw start code

// const linkSchema = new Schema(
//   {
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Users",
//       required: true,
//     },
//     links: [linkSchema]
//   },
//   {
//     timestamps: true,
//   }
// );

// const linksSchema = new Schema({
//   url: String,
//   title: String
// });

// pw close code

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const linkSchema = new Schema({
//   url: String,
//   title: String
// });

// const authorSchema = new Schema({
//   authorId: {
//     type: String,
//     required: true
//   },
//   links: [linkSchema]
// });

// const Author = mongoose.model('Author', authorSchema);

// title: {
//   type: "string",
//   required: true,
// },
// link: {
//   type: "string",
//   required: true,
// },
// author: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Users",
//   required: true,
// },

// const linkSchema = new Schema(
//   {
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Users",
//       required: true,
//     },
//     links: [linkSchema]
//   },
//   {
//     timestamps: true,
//   }
// );

// const linksSchema = new Schema({
//   url: String,
//   title: String
// });
