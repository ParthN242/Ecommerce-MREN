export default (theFunc) => async (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};
