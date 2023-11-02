
export const checkRoles = (roles) => {
  return (req, res, next) => {
    const { user } = req;
    console.log(user.roles);
    if(roles.indexOf(user.roles) !== -1){
    // if (user && roles.some((role) => user.roles && user.roles.includes(role))) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};
