import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { UnAuthenticatedError } from "../errors/index.js";


//************************************ REGISTER-USER-START-API ***********************************
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide all values");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("Email already exist. Please provide different email");
    }

    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({
      user: {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        location: user.location,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};
  //************************************ REGISTER-USER-END-API **********************************


  //************************************ LOGIN-USER-START-API ***********************************
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values..");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnAuthenticatedError("Invalid credentials..Wrong email");
  }
  console.log(user);

  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new UnAuthenticatedError("Invalied credentials..Wrong password");
  }

  const token = await user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

  //************************************ LOGIN-USER-END-API ***********************************


  //************************************ UPDATE-USER-START-API *********************************
const updateUser = async (req, res) => {
  const { email, name, lastname, location } = req.body;

  if (!email || !name || !lastname || !location) {
    throw new BadRequestError("Please provide all values..");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastname = lastname;
  user.location = location;

  await user.save();

  const token = user.createJWT()

  res.status(StatusCodes.OK).json({ user, token, location:user.location });

};
  //************************************ UPDATE-USER-END-API *******************************

export { register, login, updateUser };
