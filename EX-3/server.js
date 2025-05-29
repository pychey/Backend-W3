import express from 'express';
import courses from "./course.js";

import logger from './middleware/logger.js';
import validateQuery from './middleware/validateQuery.js';
import authenticateToken from './middleware/auth.js';

const app = express();
const PORT = 3000;

app.use(logger);

app.get('/departments/:dept/courses', validateQuery,authenticateToken,
    (req, res) => {
        const { dept } = req.params;
        const { level, minCredits, maxCredits, semester, instructor } = req.query;
        
        const minCreditsNum = minCredits ? parseInt(minCredits) : null;
        const maxCreditsNum = maxCredits ? parseInt(maxCredits) : null;
        
        const filteredCourses = courses.filter(course => {
            if (course.department.toLowerCase() !== dept.toLowerCase()) {
                return false;
            }
            
            if (level && course.level.toLowerCase() !== level.toLowerCase()) {
                return false;
            }
            
            if (minCreditsNum !== null && course.credits < minCreditsNum) {
                return false;
            }
            
            if (maxCreditsNum !== null && course.credits > maxCreditsNum) {
                return false;
            }
            
            if (semester && course.semester.toLowerCase() !== semester.toLowerCase()) {
                return false;
            }
            
            if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) {
                return false;
            }
            
            return true;
        });
        
        res.json({
            results: filteredCourses,
            meta: {
                total: filteredCourses.length,
                department: dept,
                appliedFilters: {
                    level: level || 'none',
                    minCredits: minCreditsNum || 'none',
                    maxCredits: maxCreditsNum || 'none', 
                    semester: semester || 'none',
                    instructor: instructor || 'none'
                }
            }
        });
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});