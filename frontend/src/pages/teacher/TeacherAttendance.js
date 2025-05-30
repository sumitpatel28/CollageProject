import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
} from '@mui/material';
import { Save as SaveIcon, Assessment as AssessmentIcon } from '@mui/icons-material';

// Dummy student data
const dummyStudents = Array.from({ length: 50 }, (_, index) => ({
    id: `STD${(index + 1).toString().padStart(2, '0')}`,
    name: `Student ${index + 1}`,
    rollNumber: (index + 1).toString().padStart(3, '0'),
    class: index < 25 ? '10A' : '10B',
    previousAttendance: Math.floor(Math.random() * 21) + 80, // Random attendance between 80-100%
}));

// Dummy subjects
const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History'
];

const TeacherAttendance = () => {
    const [selectedSubject, setSelectedSubject] = useState('');
    const [attendance, setAttendance] = useState({});
    const [showStats, setShowStats] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedClass, setSelectedClass] = useState('all');

    // Initialize attendance state for all students
    const initializeAttendance = () => {
        const initialAttendance = {};
        dummyStudents.forEach(student => {
            initialAttendance[student.id] = true; // Default all present
        });
        setAttendance(initialAttendance);
    };

    // Handle subject change
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        initializeAttendance();
        setShowStats(false);
        setSaved(false);
    };

    // Handle attendance change
    const handleAttendanceChange = (studentId) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: !prev[studentId]
        }));
    };

    // Handle mark all
    const handleMarkAll = (present) => {
        const newAttendance = {};
        dummyStudents.forEach(student => {
            newAttendance[student.id] = present;
        });
        setAttendance(newAttendance);
    };

    // Calculate attendance statistics
    const calculateStats = () => {
        const totalStudents = dummyStudents.length;
        const presentStudents = Object.values(attendance).filter(status => status).length;
        const absentStudents = totalStudents - presentStudents;
        const attendancePercentage = (presentStudents / totalStudents) * 100;

        return {
            total: totalStudents,
            present: presentStudents,
            absent: absentStudents,
            percentage: attendancePercentage.toFixed(2)
        };
    };

    // Handle save attendance
    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setShowStats(true);
            setSaved(true);
            setLoading(false);
        }, 1000);
    };

    // Filter students based on selected class
    const filteredStudents = selectedClass === 'all' 
        ? dummyStudents 
        : dummyStudents.filter(student => student.class === selectedClass);

    const stats = calculateStats();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Take Attendance
                </Typography>

                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Subject</InputLabel>
                            <Select
                                value={selectedSubject}
                                onChange={handleSubjectChange}
                                label="Select Subject"
                            >
                                {subjects.map(subject => (
                                    <MenuItem key={subject} value={subject}>
                                        {subject}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <InputLabel>Select Class</InputLabel>
                            <Select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                label="Select Class"
                            >
                                <MenuItem value="all">All Classes</MenuItem>
                                <MenuItem value="10A">Class 10A</MenuItem>
                                <MenuItem value="10B">Class 10B</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {selectedSubject && (
                    <>
                        <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => handleMarkAll(true)}
                            >
                                Mark All Present
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleMarkAll(false)}
                            >
                                Mark All Absent
                            </Button>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Roll No.</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Class</TableCell>
                                        <TableCell>Previous Attendance</TableCell>
                                        <TableCell align="center">Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>{student.rollNumber}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.class}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={`${student.previousAttendance}%`}
                                                    color={student.previousAttendance >= 85 ? "success" : "warning"}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={attendance[student.id] || false}
                                                            onChange={() => handleAttendanceChange(student.id)}
                                                            color="primary"
                                                        />
                                                    }
                                                    label={attendance[student.id] ? "Present" : "Absent"}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                                onClick={handleSave}
                                disabled={loading || saved}
                            >
                                {loading ? 'Saving...' : 'Save Attendance'}
                            </Button>
                        </Box>

                        {saved && showStats && (
                            <Card sx={{ mt: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                        Attendance Statistics
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper sx={{ p: 2, textAlign: 'center' }}>
                                                <Typography variant="h4">{stats.total}</Typography>
                                                <Typography color="textSecondary">Total Students</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light' }}>
                                                <Typography variant="h4" color="white">{stats.present}</Typography>
                                                <Typography color="white">Present</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'error.light' }}>
                                                <Typography variant="h4" color="white">{stats.absent}</Typography>
                                                <Typography color="white">Absent</Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={3}>
                                            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'info.light' }}>
                                                <Typography variant="h4" color="white">{stats.percentage}%</Typography>
                                                <Typography color="white">Attendance Rate</Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        )}

                        {saved && (
                            <Alert severity="success" sx={{ mt: 2 }}>
                                Attendance has been saved successfully!
                            </Alert>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default TeacherAttendance; 