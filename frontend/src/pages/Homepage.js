import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Paper, Typography, Card, CardContent, Divider, Avatar } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import CountUp from 'react-countup';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import ForumIcon from '@mui/icons-material/Forum';

const Homepage = () => {
    return (
        <>
            <HeroSection>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={6}>
                        <img src={Students} alt="students" style={{ width: '100%' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledPaper elevation={3}>
                            <StyledTitle>
                                Welcome to
                                <br />
                                School Management
                                <br />
                                System
                            </StyledTitle>
                            <StyledText>
                                Streamline school management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                                <StyledText>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{color:"#550080"}}>
                                        Sign up
                                    </Link>
                                </StyledText>
                            </StyledBox>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </HeroSection>

            {/* Stats Section */}
            <StatsSection>
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: '#252525' }}>
                    Our Impact
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <SchoolIcon sx={{ fontSize: 48, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                <CountUp end={50} duration={2.5} /> +
                            </Typography>
                            <Typography variant="body1">Schools</Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <PeopleIcon sx={{ fontSize: 48, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                <CountUp end={5000} duration={2.5} /> +
                            </Typography>
                            <Typography variant="body1">Students</Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <MenuBookIcon sx={{ fontSize: 48, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                <CountUp end={500} duration={2.5} /> +
                            </Typography>
                            <Typography variant="body1">Teachers</Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <EventNoteIcon sx={{ fontSize: 48, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                                <CountUp end={98} duration={2.5} /> %
                            </Typography>
                            <Typography variant="body1">Attendance Rate</Typography>
                        </StatCard>
                    </Grid>
                </Grid>
            </StatsSection>

            {/* Features Section */}
            <FeaturesSection>
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: '#252525' }}>
                    Key Features
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <AssignmentIcon sx={{ fontSize: 40, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Advanced Attendance Tracking
                            </Typography>
                            <Typography variant="body1">
                                Track student attendance in real-time with detailed reports and analytics. Send automated notifications for absences.
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <GradeIcon sx={{ fontSize: 40, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Comprehensive Assessment
                            </Typography>
                            <Typography variant="body1">
                                Create, manage, and grade assessments with ease. Generate detailed performance reports for students and classes.
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureCard>
                            <ForumIcon sx={{ fontSize: 40, color: '#7f56da', mb: 2 }} />
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Seamless Communication
                            </Typography>
                            <Typography variant="body1">
                                Foster collaboration between teachers, students, and parents with our integrated messaging and notification system.
                            </Typography>
                        </FeatureCard>
                    </Grid>
                </Grid>
            </FeaturesSection>

            {/* Testimonials Section */}
            <TestimonialsSection>
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: '#252525' }}>
                    What People Say
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <TestimonialCard>
                            <Avatar sx={{ width: 70, height: 70, mb: 2, bgcolor: '#7f56da' }}>DP</Avatar>
                            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                                "This system has revolutionized how we manage our school. The attendance tracking and performance analytics are invaluable."
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Dr. Patel</Typography>
                            <Typography variant="body2">Principal, Delhi Public School</Typography>
                        </TestimonialCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TestimonialCard>
                            <Avatar sx={{ width: 70, height: 70, mb: 2, bgcolor: '#7f56da' }}>RK</Avatar>
                            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                                "As a teacher, I can focus more on teaching rather than administrative tasks. The assessment tools are exceptional."
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ravi Kumar</Typography>
                            <Typography variant="body2">Science Teacher, Model School</Typography>
                        </TestimonialCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TestimonialCard>
                            <Avatar sx={{ width: 70, height: 70, mb: 2, bgcolor: '#7f56da' }}>AS</Avatar>
                            <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic' }}>
                                "The parent portal keeps me updated on my child's progress in real-time. I appreciate the transparent communication system."
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Anita Sharma</Typography>
                            <Typography variant="body2">Parent</Typography>
                        </TestimonialCard>
                    </Grid>
                </Grid>
            </TestimonialsSection>
        </>
    );
};

export default Homepage;

const HeroSection = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 0;
`;

const StyledPaper = styled.div`
  padding: 24px;
  height: 100%;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  padding-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px; 
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// New styled components for the added sections
const StatsSection = styled(Container)`
  padding: 80px 0;
  background-color: #f8f9fa;
`;

const FeaturesSection = styled(Container)`
  padding: 80px 0;
`;

const TestimonialsSection = styled(Container)`
  padding: 80px 0;
  background-color: #f8f9fa;
`;

const StatCard = styled(Paper)`
  padding: 24px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const FeatureCard = styled(Paper)`
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const TestimonialCard = styled(Paper)`
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;
