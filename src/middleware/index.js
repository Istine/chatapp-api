import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string().email("must be a valid email"),
  password: Yup.string().min(3, "must be at least 3 characters long"),
});

export const validateSignupData = async (req, res, next) => {
  try {
    const value = await schema.validate(req.body);
    if (value) return next();
    return res
      .status(400)
      .json({ message: "data validation failed", error: value });
  } catch (error) {
    next(error);
  }
};
