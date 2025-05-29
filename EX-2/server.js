// server.js
import express from 'express';
import courses from "./course.js";

const app = express();
const PORT = 3000;

app.set('json spaces', 2);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params; 
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    
    const minCreditsNum = minCredits ? parseInt(minCredits) : null;
    const maxCreditsNum = maxCredits ? parseInt(maxCredits) : null;
    
    if (minCreditsNum !== null && maxCreditsNum !== null && minCreditsNum > maxCreditsNum) {
        return res.json({
            results: [],
            meta: {
                total: 0,
                error: "Invalid credit range: minCredits cannot be greater than maxCredits"
            }
        });
    }
    
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
            total: filteredCourses.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});