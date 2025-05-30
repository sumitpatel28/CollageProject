import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { PictureAsPdf, Search as SearchIcon, Download as DownloadIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';

// Dummy data for resources (same as teacher's but with more subject-specific content)
const dummyResources = [
    {
        _id: '1',
        title: 'Mathematics Fundamentals',
        description: 'Basic mathematics concepts including algebra, geometry, and trigonometry. Perfect for class 10 students preparing for exams.',
        pdfUrl: 'https://example.com/math.pdf',
        createdAt: '2024-03-15',
        subject: 'Mathematics',
        teacherName: 'Mr. Johnson'
    },
    {
        _id: '2',
        title: 'Physics Notes - Chapter 1',
        description: 'Comprehensive notes on mechanics and motion. Includes solved examples and practice problems.',
        pdfUrl: 'https://example.com/physics.pdf',
        createdAt: '2024-03-14',
        subject: 'Physics',
        teacherName: 'Mrs. Smith'
    },
    {
        _id: '3',
        title: 'Chemistry Lab Manual',
        description: 'Laboratory procedures and safety guidelines for chemistry experiments. Essential reading before practical sessions.',
        pdfUrl: 'https://example.com/chemistry.pdf',
        createdAt: '2024-03-13',
        subject: 'Chemistry',
        teacherName: 'Dr. Williams'
    },
    {
        _id: '4',
        title: 'Biology Study Guide',
        description: 'Complete study material for cell biology and genetics. Includes colorful diagrams and explanations.',
        pdfUrl: 'https://example.com/biology.pdf',
        createdAt: '2024-03-12',
        subject: 'Biology',
        teacherName: 'Ms. Brown'
    },
    {
        _id: '5',
        title: 'English Literature Notes',
        description: 'Analysis of classic literature and poetry. Contains chapter summaries and important quotes.',
        pdfUrl: 'https://example.com/english.pdf',
        createdAt: '2024-03-11',
        subject: 'English',
        teacherName: 'Mrs. Davis'
    },
    {
        _id: '6',
        title: 'History Timeline Charts',
        description: 'Comprehensive timeline charts covering major historical events. Great for visual learners.',
        pdfUrl: 'https://example.com/history.pdf',
        createdAt: '2024-03-10',
        subject: 'History',
        teacherName: 'Mr. Wilson'
    }
];

const StudentResources = () => {
    const [resources, setResources] = useState(dummyResources);
    const [searchTerm, setSearchTerm] = useState('');
    const { currentUser } = useSelector((state) => state.user);

    // Filter resources based on search term
    const filteredResources = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = (resource) => {
        // Simulate download - in real app, this would trigger actual file download
        window.open(resource.pdfUrl, '_blank');
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Study Resources
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search resources by title, subject, or teacher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ mt: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredResources.map((resource) => (
                    <Grid item xs={12} md={6} key={resource._id}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <Typography variant="h6" component="h2">
                                        {resource.title}
                                    </Typography>
                                </Box>
                                <Typography color="textSecondary" gutterBottom>
                                    {resource.subject} | By {resource.teacherName}
                                </Typography>
                                <Typography color="textSecondary" variant="caption" display="block">
                                    Added on {resource.createdAt}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
                                    {resource.description}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<PictureAsPdf />}
                                        size="small"
                                        onClick={() => window.open(resource.pdfUrl, '_blank')}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        size="small"
                                        onClick={() => handleDownload(resource)}
                                    >
                                        Download
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {filteredResources.length === 0 && (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="textSecondary">
                        No resources found matching your search.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default StudentResources; 