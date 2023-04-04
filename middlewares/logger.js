export const customLogger = (req, res, next) => {

  let method = req.method;
  let url = req.url;
  let status = res.statusCode;

  const cloneBody = JSON.parse(JSON.stringify(req.body));
  const cloneParams = JSON.parse(JSON.stringify(req.params));
  const cloneQuery = JSON.parse(JSON.stringify(req.query));
  delete cloneBody.password;

  let log = `[request] ${method}:${url} ${status}`;

  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    return oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk) chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
    console.log(
      log,
      Object.keys(cloneBody).length > 0
        ? `\n[body]: ${JSON.stringify(cloneBody)}`
        : '',
      Object.keys(cloneParams).length > 0
        ? `\n[params]: ${JSON.stringify(cloneParams)}`
        : '',
      Object.keys(cloneQuery).length > 0
        ? `\n[query]: ${JSON.stringify(cloneQuery)}`
        : '',
      Object.keys(body).length > 0 ? `\n[response]: ${body}` : ''
    );

    oldEnd.apply(res, arguments);
  };

  next();
};
