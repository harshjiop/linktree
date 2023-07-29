import mongoose, { Schema, model } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    FullName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
      select: false,
    },
    role: {
      type: "string",
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  // If password is not modified then do not hash it
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

// FIXME: Check if these methods are working as expected
userSchema.methods = {
  //method for generating the jwt token
  ganarateJWTToken: async function () {
    return await JWT.sign(
      { id: this._id, email: this.email, role: this.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  },

  //userSchema method for generating and return forgotPassword token
  // getForgotPasswordToken() {
  //   const forgotToken = crypto.randomBytes(20).toString("hex");
  //   //step 1 - save to DB
  //   this.forgotPasswordToken = crypto
  //     .createHash("sha256")
  //     .update(forgotToken)
  //     .digest("hex");

  //   /// forgot password expiry date
  //   this.forgotPasswordExpiryDate = Date.now() + 20 * 60 * 1000; // 20min

  //   //step 2 - return values to user
  //   return forgotToken;
  // },
};

// export default model("Userdata", userSchema);
const Users = model("Users", userSchema);
export default  Users ;
