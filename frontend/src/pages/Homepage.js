import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Box, 
    Button, 
    Paper, 
    Typography, 
    Divider, 
    Avatar, 
    useMediaQuery, 
    useTheme,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import styled, { keyframes } from 'styled-components';
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
import SecurityIcon from '@mui/icons-material/Security';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Homepage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Handle scroll to change navbar appearance
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);
    
    useEffect(() => {
        Aos.init({ duration: 1000, once: true, easing: 'ease-in-out' });
    }, []);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 80,
                behavior: 'smooth',
            });
        }
        if (mobileOpen) setMobileOpen(false);
    };
    
    const navLinks = [
        { name: 'Home', action: () => scrollToSection('hero') },
        { name: 'Features', action: () => scrollToSection('features') },
        { name: 'Testimonials', action: () => scrollToSection('testimonials') },
        { name: 'Login', to: '/choose' },
    ];
    
    const drawer = (
        <DrawerContainer>
            <DrawerHeader>
                <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
                    <CloseIcon />
                </IconButton>
            </DrawerHeader>
            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <List>
                {navLinks.map((link, index) => (
                    <ListItem 
                        button 
                        key={index} 
                        onClick={link.action}
                        component={link.to ? Link : 'div'}
                        to={link.to || undefined}
                    >
                        <ListItemText 
                            primary={link.name} 
                            primaryTypographyProps={{ 
                                style: { 
                                    color: '#fff',
                                    fontWeight: 500,
                                    fontSize: '1.1rem'
                                } 
                            }}
                        />
                    </ListItem>
                ))}
                <ListItem>
                    <Button 
                        variant="contained" 
                        component={Link} 
                        to="/Adminregister"
                        fullWidth
                        sx={{ 
                            mt: 2, 
                            backgroundColor: '#fff', 
                            color: '#7f56da',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.9)'
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                </ListItem>
            </List>
        </DrawerContainer>
    );
    
    return (
        <>
            {/* Navbar */}
            <NavBar position="fixed" scrolled={scrolled ? 'true' : 'false'}>
                <Container maxWidth="lg">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <LogoContainer>
                            <SchoolIcon sx={{ fontSize: 32, color: scrolled ? "#7f56da" : "#fff", mr: 1 }} />
                            <LogoText scrolled={scrolled ? 'true' : 'false'}>
                                School MS
                            </LogoText>
                        </LogoContainer>
                        
                        {!isTablet ? (
                            <NavLinksContainer>
                                {navLinks.map((link, index) => (
                                    link.to ? (
                                        <NavLinkButton
                                            key={index}
                                            component={Link}
                                            to={link.to}
                                            scrolled={scrolled ? 'true' : 'false'}
                                        >
                                            {link.name}
                                        </NavLinkButton>
                                    ) : (
                                        <NavLinkButton
                                            key={index}
                                            onClick={link.action}
                                            scrolled={scrolled ? 'true' : 'false'}
                                        >
                                            {link.name}
                                        </NavLinkButton>
                                    )
                                ))}
                                <ActionButton
                                    variant="contained"
                                    component={Link}
                                    to="/Adminregister"
                                    scrolled={scrolled ? 'true' : 'false'}
                                >
                                    Sign Up
                                </ActionButton>
                            </NavLinksContainer>
                        ) : (
                            <IconButton
                                edge="end"
                                color="inherit"
                                aria-label="menu"
                                onClick={handleDrawerToggle}
                                sx={{ color: scrolled ? '#7f56da' : '#fff' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>
            </NavBar>
            
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { 
                        width: '70%', 
                        maxWidth: '300px', 
                        backgroundColor: '#2a0845',
                        backgroundImage: 'linear-gradient(135deg, #2a0845 0%, #1c1c75 100%)'
                    },
                }}
            >
                {drawer}
            </Drawer>

            <HeroSection id="hero">
                <HeroOverlay />
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} md={6} data-aos="fade-right">
                        <HeroImageContainer>
                            <img src={Students} alt="students" style={{ width: '100%', maxWidth: '600px' }} />
                        </HeroImageContainer>
                    </Grid>
                    <Grid item xs={12} md={6} data-aos="fade-left">
                        <StyledPaper elevation={3}>
                            <GlowingTitle>
                                Welcome to
                                <GradientSpan> School Management</GradientSpan>
                                <br />
                                System
                            </GlowingTitle>
                            <StyledText>
                                Streamline school management, class organization, and add students and faculty.
                                Seamlessly track attendance, assess performance, and provide feedback.
                                Access records, view marks, and communicate effortlessly.
                            </StyledText>
                            <AnimatedBox>
                                <StyledLink to="/choose">
                                    <GlowingButton variant="contained" fullWidth>
                                        Login
                                    </GlowingButton>
                                </StyledLink>
                                <StyledLink to="/chooseasguest">
                                    <Button variant="outlined" fullWidth
                                        sx={{ 
                                            mt: 2, 
                                            mb: 3, 
                                            color: "#7f56da", 
                                            borderColor: "#7f56da",
                                            borderWidth: '2px',
                                            '&:hover': {
                                                borderWidth: '2px',
                                                backgroundColor: 'rgba(127, 86, 218, 0.05)'
                                            }
                                        }}
                                    >
                                        Login as Guest
                                    </Button>
                                </StyledLink>
                                <StyledText>
                                    Don't have an account?{' '}
                                    <StyledSignUpLink to="/Adminregister">
                                        Sign up
                                    </StyledSignUpLink>
                                </StyledText>
                            </AnimatedBox>
                        </StyledPaper>
                    </Grid>
                </Grid>
            </HeroSection>

            {/* Stats Section */}
            <StatsSection>
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: '#252525' }} data-aos="fade-up">
                    <GradientSpan>Our Impact</GradientSpan>
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6} md={3} data-aos="zoom-in" data-aos-delay="100">
                        <StatCard>
                            <IconCircle>
                                <SchoolIcon sx={{ fontSize: 36, color: '#fff' }} />
                            </IconCircle>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                                <CountUp end={50} duration={2.5} /> +
                            </Typography>
                            <Typography variant="body1">Schools</Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} data-aos="zoom-in" data-aos-delay="200">
                        <StatCard>
                            <IconCircle>
                                <PeopleIcon sx={{ fontSize: 36, color: '#fff' }} />
                            </IconCircle>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                                <CountUp end={5000} duration={2.5} /> +
                            </Typography>
                            <Typography variant="body1">Students</Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} data-aos="zoom-in" data-aos-delay="300">
                        <StatCard>
                            <IconCircle>
                                <MenuBookIcon sx={{ fontSize: 36, color: '#fff' }} />
                            </IconCircle>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                                <CountUp end={500} duration={2.5} /> +
                            </Typography>
                            <Typography variant="body1">Teachers</Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} data-aos="zoom-in" data-aos-delay="400">
                        <StatCard>
                            <IconCircle>
                                <EventNoteIcon sx={{ fontSize: 36, color: '#fff' }} />
                            </IconCircle>
                            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 2 }}>
                                <CountUp end={98} duration={2.5} /> %
                            </Typography>
                            <Typography variant="body1">Attendance Rate</Typography>
                        </StatCard>
                    </Grid>
                </Grid>
            </StatsSection>

            {/* Features Section */}
            <FeaturesSection id="features">
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: '#252525' }} data-aos="fade-up">
                    <GradientSpan>Key Features</GradientSpan>
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} data-aos="fade-up" data-aos-delay="100">
                        <FeatureCard>
                            <FeatureIconWrapper>
                                <AssignmentIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </FeatureIconWrapper>
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Advanced Attendance Tracking
                            </Typography>
                            <Typography variant="body1">
                                Track student attendance in real-time with detailed reports and analytics. Send automated notifications for absences.
                            </Typography>
                            <FeatureButtonWrapper>
                                <Button 
                                    variant="text" 
                                    sx={{ 
                                        color: '#7f56da', 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(127, 86, 218, 0.08)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </FeatureButtonWrapper>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={4} data-aos="fade-up" data-aos-delay="200">
                        <FeatureCard>
                            <FeatureIconWrapper>
                                <GradeIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </FeatureIconWrapper>
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Comprehensive Assessment
                            </Typography>
                            <Typography variant="body1">
                                Create, manage, and grade assessments with ease. Generate detailed performance reports for students and classes.
                            </Typography>
                            <FeatureButtonWrapper>
                                <Button 
                                    variant="text" 
                                    sx={{ 
                                        color: '#7f56da', 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(127, 86, 218, 0.08)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </FeatureButtonWrapper>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={4} data-aos="fade-up" data-aos-delay="300">
                        <FeatureCard>
                            <FeatureIconWrapper>
                                <ForumIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </FeatureIconWrapper>
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Seamless Communication
                            </Typography>
                            <Typography variant="body1">
                                Foster collaboration between teachers, students, and parents with our integrated messaging and notification system.
                            </Typography>
                            <FeatureButtonWrapper>
                                <Button 
                                    variant="text" 
                                    sx={{ 
                                        color: '#7f56da', 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(127, 86, 218, 0.08)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </FeatureButtonWrapper>
                        </FeatureCard>
                    </Grid>
                </Grid>
                
                {/* Additional Features Row */}
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4} data-aos="fade-up" data-aos-delay="400">
                        <FeatureCard>
                            <FeatureIconWrapper>
                                <SecurityIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </FeatureIconWrapper>
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Advanced Security
                            </Typography>
                            <Typography variant="body1">
                                Protect sensitive school data with our enterprise-grade security systems. Role-based access controls ensure data privacy.
                            </Typography>
                            <FeatureButtonWrapper>
                                <Button 
                                    variant="text" 
                                    sx={{ 
                                        color: '#7f56da', 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(127, 86, 218, 0.08)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </FeatureButtonWrapper>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={4} data-aos="fade-up" data-aos-delay="500">
                        <FeatureCard>
                            <FeatureIconWrapper>
                                <DevicesIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </FeatureIconWrapper>
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Multi-Platform Access
                            </Typography>
                            <Typography variant="body1">
                                Access your school management system from any device. Our responsive design works on desktops, tablets, and mobile phones.
                            </Typography>
                            <FeatureButtonWrapper>
                                <Button 
                                    variant="text" 
                                    sx={{ 
                                        color: '#7f56da', 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(127, 86, 218, 0.08)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </FeatureButtonWrapper>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} md={4} data-aos="fade-up" data-aos-delay="600">
                        <FeatureCard>
                            <FeatureIconWrapper>
                                <SpeedIcon sx={{ fontSize: 40, color: '#fff' }} />
                            </FeatureIconWrapper>
                            <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Performance Analytics
                            </Typography>
                            <Typography variant="body1">
                                Gain insights into student performance with advanced analytics and visualizations. Make data-driven decisions for better outcomes.
                            </Typography>
                            <FeatureButtonWrapper>
                                <Button 
                                    variant="text" 
                                    sx={{ 
                                        color: '#7f56da', 
                                        fontWeight: 'bold',
                                        '&:hover': {
                                            backgroundColor: 'rgba(127, 86, 218, 0.08)'
                                        }
                                    }}
                                >
                                    Learn More
                                </Button>
                            </FeatureButtonWrapper>
                        </FeatureCard>
                    </Grid>
                </Grid>
            </FeaturesSection>

            {/* Testimonials Section */}
            <TestimonialsSection id="testimonials">
                <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold', color: '#252525' }} data-aos="fade-up">
                    <GradientSpan>What People Say</GradientSpan>
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="100">
                        <TestimonialCard>
                            <QuoteMark>"</QuoteMark>
                            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                                This system has revolutionized how we manage our school. The attendance tracking and performance analytics are invaluable.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <TestimonialFooter>
                                <Avatar sx={{ width: 60, height: 60, bgcolor: '#7f56da' }}>DP</Avatar>
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Dr. Patel</Typography>
                                    <Typography variant="body2">Principal, Delhi Public School</Typography>
                                </Box>
                            </TestimonialFooter>
                        </TestimonialCard>
                    </Grid>
                    <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="200">
                        <TestimonialCard>
                            <QuoteMark>"</QuoteMark>
                            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                                As a teacher, I can focus more on teaching rather than administrative tasks. The assessment tools are exceptional.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <TestimonialFooter>
                                <Avatar sx={{ width: 60, height: 60, bgcolor: '#7f56da' }}>RK</Avatar>
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Ravi Kumar</Typography>
                                    <Typography variant="body2">Science Teacher, Model School</Typography>
                                </Box>
                            </TestimonialFooter>
                        </TestimonialCard>
                    </Grid>
                    <Grid item xs={12} md={4} data-aos="flip-left" data-aos-delay="300">
                        <TestimonialCard>
                            <QuoteMark>"</QuoteMark>
                            <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic', position: 'relative', zIndex: 1 }}>
                                The parent portal keeps me updated on my child's progress in real-time. I appreciate the transparent communication system.
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <TestimonialFooter>
                                <Avatar sx={{ width: 60, height: 60, bgcolor: '#7f56da' }}>AS</Avatar>
                                <Box sx={{ ml: 2 }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Anita Sharma</Typography>
                                    <Typography variant="body2">Parent</Typography>
                                </Box>
                            </TestimonialFooter>
                        </TestimonialCard>
                    </Grid>
                </Grid>
            </TestimonialsSection>
            
            {/* CTA Section */}
            <CTASection data-aos="fade-up">
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, fontWeight: 'bold', color: '#fff' }}>
                    Ready to Transform Your School Management?
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#fff', maxWidth: '800px', mx: 'auto' }}>
                    Join thousands of schools that are already benefiting from our comprehensive school management system.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <StyledLink to="/choose">
                        <Button variant="contained" 
                            sx={{ 
                                bgcolor: '#fff', 
                                color: '#7f56da', 
                                px: 4, 
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    bgcolor: '#f0f0f0'
                                }
                            }}
                        >
                            Get Started Now
                        </Button>
                    </StyledLink>
                    <Button variant="outlined" 
                        sx={{ 
                            color: '#fff', 
                            borderColor: '#fff',
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            '&:hover': {
                                borderColor: '#fff',
                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Request Demo
                    </Button>
                </Box>
            </CTASection>
        </>
    );
};

export default Homepage;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const glow = keyframes`
  0% {
    text-shadow: 0 0 10px rgba(127, 86, 218, 0.1);
  }
  50% {
    text-shadow: 0 0 20px rgba(127, 86, 218, 0.3);
  }
  100% {
    text-shadow: 0 0 10px rgba(127, 86, 218, 0.1);
  }
`;

// Navbar Styled Components
const NavBar = styled(AppBar)`
    background-color: ${props => props.scrolled === 'true' ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
    box-shadow: ${props => props.scrolled === 'true' ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none'};
    transition: all 0.3s ease;
    height: 70px;
    display: flex;
    justify-content: center;
    backdrop-filter: ${props => props.scrolled === 'true' ? 'blur(10px)' : 'none'};
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const LogoText = styled(Typography)`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.scrolled === 'true' ? '#333' : '#fff'};
    transition: color 0.3s ease;
    margin-left: 8px;
`;

const NavLinksContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const NavLinkButton = styled(Button)`
    color: ${props => props.scrolled === 'true' ? '#555' : '#fff'};
    font-weight: 500;
    padding: 8px 16px;
    transition: all 0.3s ease;
    position: relative;
    
    &:after {
        content: '';
        position: absolute;
        bottom: 6px;
        left: 50%;
        width: 0;
        height: 2px;
        background: ${props => props.scrolled === 'true' ? '#7f56da' : '#fff'};
        transition: all 0.3s ease;
        transform: translateX(-50%);
    }
    
    &:hover {
        background: transparent;
        color: ${props => props.scrolled === 'true' ? '#7f56da' : '#fff'};
        
        &:after {
            width: 30px;
        }
    }
`;

const ActionButton = styled(Button)`
    background: ${props => props.scrolled === 'true' ? 'linear-gradient(90deg, #7f56da, #9b6ffa)' : 'rgba(255, 255, 255, 0.2)'};
    color: ${props => props.scrolled === 'true' ? '#fff' : '#fff'};
    padding: 6px 20px;
    border-radius: 8px;
    text-transform: none;
    font-weight: 600;
    margin-left: 8px;
    box-shadow: ${props => props.scrolled === 'true' ? '0 4px 12px rgba(127, 86, 218, 0.2)' : 'none'};
    border: ${props => props.scrolled === 'true' ? 'none' : '1px solid rgba(255, 255, 255, 0.4)'};
    
    &:hover {
        background: ${props => props.scrolled === 'true' ? 'linear-gradient(90deg, #7a1ccb, #9b6ffa)' : 'rgba(255, 255, 255, 0.3)'};
        box-shadow: ${props => props.scrolled === 'true' ? '0 6px 15px rgba(127, 86, 218, 0.3)' : 'none'};
    }
`;

const DrawerContainer = styled.div`
    padding: 16px;
    height: 100%;
`;

const DrawerHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 8px 0;
`;

// Existing Styled Components
const HeroSection = styled(Container)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(127, 86, 218, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: -1;
`;

const HeroImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${float} 6s ease-in-out infinite;
`;

const StyledPaper = styled.div`
  padding: 32px;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AnimatedBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const GlowingTitle = styled.h1`
  font-size: 3.2rem;
  color: #252525;
  font-weight: 800;
  padding-top: 0;
  line-height: 1.2;
  margin-bottom: 24px;
  animation: ${glow} 3s ease-in-out infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientSpan = styled.span`
  background: linear-gradient(90deg, #7f56da 0%, #9b6ffa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const StyledText = styled.p`
  margin-top: 16px;
  margin-bottom: 16px; 
  letter-spacing: 0.3px;
  line-height: 1.6;
  color: #555;
  font-size: 1.1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StyledSignUpLink = styled(Link)`
  color: #7f56da;
  font-weight: bold;
  text-decoration: none;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #7f56da;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const GlowingButton = styled(LightPurpleButton)`
  && {
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: bold;
    letter-spacing: 0.5px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(127, 86, 218, 0.3);
    transition: all 0.3s ease;
    background: linear-gradient(90deg, #7f56da 0%, #9b6ffa 100%);
    
    &:hover {
      box-shadow: 0 0 20px rgba(127, 86, 218, 0.5);
      background: linear-gradient(90deg, #7a1ccb 0%, #9b6ffa 100%);
      transform: translateY(-2px);
    }
  }
`;

// Stats Section
const StatsSection = styled(Container)`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #eef1f5 100%);
`;

const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7f56da 0%, #9b6ffa 100%);
  margin-bottom: 16px;
  box-shadow: 0 10px 20px rgba(127, 86, 218, 0.3);
`;

const StatCard = styled(Paper)`
  padding: 32px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.4s ease;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  background: #fff;
  
  &:hover {
    transform: translateY(-16px);
    box-shadow: 0 16px 32px rgba(127, 86, 218, 0.15);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #7f56da 0%, #9b6ffa 100%);
  }
`;

// Features Section
const FeaturesSection = styled(Container)`
  padding: 100px 0;
`;

const FeatureIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7f56da 0%, #9b6ffa 100%);
  margin-bottom: 24px;
  box-shadow: 0 10px 20px rgba(127, 86, 218, 0.2);
`;

const FeatureButtonWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const FeatureCard = styled(Paper)`
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  transition: all 0.3s ease;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  background: #fff;
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(127, 86, 218, 0.15);
  }
`;

// Testimonials Section
const TestimonialsSection = styled(Container)`
  padding: 100px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #eef1f5 100%);
`;

const QuoteMark = styled.div`
  font-size: 120px;
  line-height: 0;
  position: absolute;
  top: 40px;
  left: 20px;
  color: rgba(127, 86, 218, 0.1);
  font-family: Georgia, serif;
`;

const TestimonialFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
`;

const TestimonialCard = styled(Paper)`
  padding: 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  background: #fff;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-12px) rotate(1deg);
    box-shadow: 0 20px 40px rgba(127, 86, 218, 0.15);
  }
`;

// CTA Section
const CTASection = styled(Container)`
  padding: 80px 0;
  background: linear-gradient(135deg, #7f56da 0%, #9b6ffa 100%);
  border-radius: 0;
  margin-bottom: 0;
`;
