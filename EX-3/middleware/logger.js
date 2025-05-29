const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    
    const method = req.method;
    const path = req.path;
    const queryParams = req.query;
    
    console.log(`[${timestamp}] ${method} ${path}`);
    
    if (Object.keys(queryParams).length > 0) {
        console.log(`Query Parameters:`, {...queryParams});
    }
    
    next();
};

export default logger;