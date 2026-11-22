const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });
  if (!result.success) {
    return res.status(400).json({
      message: result.error.issues[0].message,
    });
  }
  req.validated = result.data;
  next();
};

export default validate;
