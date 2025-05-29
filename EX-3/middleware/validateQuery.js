const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;
    
    if (minCredits || maxCredits) {
        let minCreditsNum = null;
        let maxCreditsNum = null;
        
        if (minCredits) {
            minCreditsNum = parseInt(minCredits);
            if (isNaN(minCreditsNum) || !Number.isInteger(parseFloat(minCredits))) {
                return res.status(400).json({
                    error: "Bad Request",
                    message: "minCredits must be a valid integer"
                });
            }
        }
        
        if (maxCredits) {
            maxCreditsNum = parseInt(maxCredits);
            if (isNaN(maxCreditsNum) || !Number.isInteger(parseFloat(maxCredits))) {
                return res.status(400).json({
                    error: "Bad Request", 
                    message: "maxCredits must be a valid integer"
                });
            }
        }
        
        if (minCreditsNum !== null && maxCreditsNum !== null && minCreditsNum > maxCreditsNum) {
            return res.status(400).json({
                error: "Bad Request",
                message: "minCredits cannot be greater than maxCredits"
            });
        }
    }
    
    next();
};

export default validateQuery;