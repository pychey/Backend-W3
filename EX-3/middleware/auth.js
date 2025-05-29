const VALID_TOKENS = ['xyz123', 'abc456', 'token789'];

const authenticateToken = (req, res, next) => {
    const token = req.query.token;
    
    if (!token) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Access token is required. Please provide a valid token in the query parameter."
        });
    }
    
    if (!VALID_TOKENS.includes(token)) {
        return res.status(401).json({
            error: "Unauthorized", 
            message: "Invalid or expired token. Please provide a valid access token."
        });
    }
    
    req.user = {
        authenticated: true,
        token: token
    };
    
    console.log(`Authentication successful for token: ${token}`);
    
    next();
};

export default authenticateToken;