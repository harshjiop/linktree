import linkSchema from "../models/link.models.js";

const home = async (req, res) => {
  res.json({ Type: " link get" });
};
const createlink = async (req, res) => {
  try {
    const { title, link } = req.body;
    // console.log(req.user.id);
    const mylink = await linkSchema.create({
      author: req.user.id,
      links: {
        title,
        link,
      },
    });
    res.status(200).json({
      success: true,
      message: "link add ",
      data: mylink,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const Getmyalllink = async (req, res) => {
  try {
    // const  authorId  = req.user.id;
    //  console.log(authorId);
    const mylink = await linkSchema.find({ authorId: req.params.authorId });
    res.status(200).json({
      success: true,
      message: "My all link ",
      data: mylink,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const addlink = async (req, res) => {
  try {
    const { title, link } = req.body;
    console.log(req.params.id)
    console.log(title, link);

    res.status(200).json({
      success: true,
      message: "this is add new link ",
      data: mylink,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export { home, createlink, Getmyalllink, addlink };
