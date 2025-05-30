import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TextField,
    Typography,
    Card,
    CardContent,
    Grid,
    IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, PictureAsPdf } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import axios from 'axios';

// Dummy data for resources
const dummyResources = [
    {
        _id: '1',
        title: 'Mathematics Fundamentals',
        description: 'Basic mathematics concepts including algebra, geometry, and trigonometry',
        pdfUrl: 'https://example.com/math.pdf',
        createdAt: '2024-03-15'
    },
    {
        _id: '2',
        title: 'Physics Notes - Chapter 1',
        description: 'Comprehensive notes on mechanics and motion',
        pdfUrl: 'https://example.com/physics.pdf',
        createdAt: '2024-03-14'
    },
    {
        _id: '3',
        title: 'Chemistry Lab Manual',
        description: 'Laboratory procedures and safety guidelines for chemistry experiments',
        pdfUrl: 'https://example.com/chemistry.pdf',
        createdAt: '2024-03-13'
    },
    {
        _id: '4',
        title: 'Biology Study Guide',
        description: 'Complete study material for cell biology and genetics',
        pdfUrl: 'https://example.com/biology.pdf',
        createdAt: '2024-03-12'
    },
    {
        _id: '5',
        title: 'English Literature Notes',
        description: 'Analysis of classic literature and poetry',
        pdfUrl: 'https://example.com/english.pdf',
        createdAt: '2024-03-11'
    }
];

const TeacherResources = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [resources, setResources] = useState(dummyResources);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedResource, setSelectedResource] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        pdfFile: null
    });
    const [isEditing, setIsEditing] = useState(false);

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchResources();
    }, []);

    const fetchResources = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/resources/all`);
            setResources(response.data.resources);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setFormData({ title: '', description: '', pdfFile: null });
        setIsEditing(false);
        setSelectedResource(null);
    };

    const handleEditResource = (resource) => {
        setSelectedResource(resource);
        setFormData({
            title: resource.title,
            description: resource.description,
            pdfFile: null
        });
        setIsEditing(true);
        setOpenDialog(true);
    };

    const handleDeleteClick = (resource) => {
        setSelectedResource(resource);
        setOpenDeleteDialog(true);
    };

    const handleDeleteConfirm = () => {
        const updatedResources = resources.filter(r => r._id !== selectedResource._id);
        setResources(updatedResources);
        setOpenDeleteDialog(false);
        setSelectedResource(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            const updatedResources = resources.map(r => 
                r._id === selectedResource._id 
                ? { ...r, title: formData.title, description: formData.description }
                : r
            );
            setResources(updatedResources);
        } else {
            const newResource = {
                _id: String(resources.length + 1),
                title: formData.title,
                description: formData.description,
                pdfUrl: formData.pdfFile ? URL.createObjectURL(formData.pdfFile) : 'https://example.com/dummy.pdf',
                createdAt: new Date().toISOString().split('T')[0]
            };
            setResources([newResource, ...resources]);
        }
        handleCloseDialog();
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Study Resources
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                >
                    Add Resource
                </Button>
            </Box>

            <Grid container spacing={3}>
                {resources.map((resource) => (
                    <Grid item xs={12} md={6} key={resource._id}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="h6" component="h2">
                                        {resource.title}
                                    </Typography>
                                    <Box>
                                        <IconButton size="small" onClick={() => handleEditResource(resource)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" color="error" onClick={() => handleDeleteClick(resource)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography color="textSecondary" gutterBottom>
                                    Added on {resource.createdAt}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                                    {resource.description}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<PictureAsPdf />}
                                    size="small"
                                    onClick={() => window.open(resource.pdfUrl, '_blank')}
                                >
                                    View PDF
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Resource Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{isEditing ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
                <DialogContent>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <input
                            accept="application/pdf"
                            type="file"
                            onChange={(e) => setFormData({ ...formData, pdfFile: e.target.files[0] })}
                            style={{ marginTop: '16px' }}
                        />
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancel</Button>
                            <Button type="submit" variant="contained">
                                {isEditing ? 'Update' : 'Create'}
                            </Button>
                        </DialogActions>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Delete Resource</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this resource?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TeacherResources; 