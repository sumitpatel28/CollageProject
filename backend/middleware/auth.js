const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const Teacher = require('../models/teacherSchema');
const Student = require('../models/studentSchema');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource"
            });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login to access this resource"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            });
        }

        // Check user role and get user details
        let user;
        if (decoded.role === 'Admin') {
            user = await Admin.findById(decoded.id);
        } else if (decoded.role === 'Teacher') {
            user = await Teacher.findById(decoded.id);
        } else if (decoded.role === 'Student') {
            user = await Student.findById(decoded.id);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed",
            error: error.message
        });
    }
};
