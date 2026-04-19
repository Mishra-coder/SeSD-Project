const logger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
    
    if (res.statusCode >= 400) {
      console.error(`[ERROR] ${logMessage}`);
    } else {
      console.log(`[INFO] ${logMessage}`);
    }
  });
  
  next();
};

module.exports = logger;