const Resource = require('../models/resourceSchema');

// Create a new resource
exports.createResource = async (req, res) => {
    try {
        const { title, description, pdfUrl } = req.body;
        const teacher = req.user._id;
        const school = req.user.school;

        const resource = new Resource({
            title,
            description,
            pdfUrl,
            teacher,
            school
        });

        await resource.save();
        res.status(201).json({
            success: true,
            message: "Resource created successfully",
            resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating resource",
            error: error.message
        });
    }
};

// Get all resources for a school
exports.getAllResources = async (req, res) => {
    try {
        const school = req.user.school;
        const resources = await Resource.find({ school })
            .populate('teacher', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            resources
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching resources",
            error: error.message
        });
    }
};

// Get a single resource
exports.getResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id)
            .populate('teacher', 'name');

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            });
        }

        res.status(200).json({
            success: true,
            resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching resource",
            error: error.message
        });
    }
};

// Update a resource
exports.updateResource = async (req, res) => {
    try {
        const { title, description, pdfUrl } = req.body;
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            });
        }

        // Check if the teacher owns this resource
        if (resource.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this resource"
            });
        }

        resource.title = title;
        resource.description = description;
        if (pdfUrl) {
            resource.pdfUrl = pdfUrl;
        }

        await resource.save();

        res.status(200).json({
            success: true,
            message: "Resource updated successfully",
            resource
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating resource",
            error: error.message
        });
    }
};

// Delete a resource
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: "Resource not found"
            });
        }

        // Check if the teacher owns this resource
        if (resource.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this resource"
            });
        }

        await resource.deleteOne();

        res.status(200).json({
            success: true,
            message: "Resource deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting resource",
            error: error.message
        });
    }
}; 