export const catchingErrors = function (module, res, message) {
  console.error(`Error occured during ${module}: `, message);
  return res
    .status(500)
    .json({ success: false, message: `Error in ${module}` });
};

export const notFoundErr = function (module, res) {
  console.error(`Error occured during ${module}, cant find id`);
  return res
    .status(404)
    .json({ success: false, message: `ID not found during ${module}` });
};
