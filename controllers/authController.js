import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Please provide all values");
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("Email already exist.Please provide different error");
    }

    const user = await User.create(req.body);
    const token = user.createJWT();
    res
      .status(201)
      .json({
        user: {
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          location: user.location,
        },
        token,
      });
  } catch (error) {
    res.status(500).json({ msg: "There was an error", error });
  }
};

const login = async (req, res) => {
  res.send("login auth");
};

const updateUser = async (req, res) => {
  res.send("updateUser auth");
};

export { register, login, updateUser };
