function logEndpoint(req, res, next) {
  console.log(`Request recieved: ${req.method} ${req.baseUrl + req.path}`);
  next(); // Llama a next() para pasar la solicitud al siguiente middleware
}

function logSuccess(req, res, next) {
  const originalSend = res.send;

  res.send = function (data) {
    console.log(`Success: ${req.method} ${req.baseUrl + req.path}`);
    originalSend.apply(res, arguments);
  };
  next();
}

export { logEndpoint, logSuccess };
