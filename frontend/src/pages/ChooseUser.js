import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  const navigateHandler = (user) => {
    setActiveCard(user);
    setTimeout(() => {
      if (user === "Admin") {
        if (visitor === "guest") {
          const email = "yogendra@12";
          const fields = { email, password };
          setLoader(true);
          dispatch(loginUser(fields, user));
        }
        else {
          navigate('/Adminlogin');
        }
      }
      else if (user === "Student") {
        if (visitor === "guest") {
          const rollNum = "1";
          const studentName = "Dipesh Awasthi";
          const fields = { rollNum, studentName, password };
          setLoader(true);
          dispatch(loginUser(fields, user));
        }
        else {
          navigate('/Studentlogin');
        }
      }
      else if (user === "Teacher") {
        if (visitor === "guest") {
          const email = "tony@12";
          const fields = { email, password };
          setLoader(true);
          dispatch(loginUser(fields, user));
        }
        else {
          navigate('/Teacherlogin');
        }
      }
    }, 300);
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      }
      else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    }
    else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <StyledOverlay />
      <HeaderText data-aos="fade-down">
        <GradientText>Choose Your Role</GradientText>
        <SubText>Select the appropriate option to access your dashboard</SubText>
      </HeaderText>
      
      <CardContainer>
        <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} data-aos="zoom-in" data-aos-delay="100">
            <RoleCard 
              elevation={6} 
              onClick={() => navigateHandler("Admin")}
              className={activeCard === "Admin" ? "active" : ""}
            >
              <IconContainer>
                <AccountCircle fontSize="large" />
              </IconContainer>
              <CardContent>
                <RoleTitle>Admin</RoleTitle>
                <RoleDescription>
                  Login as an administrator to manage school data, users, and system settings.
                </RoleDescription>
              </CardContent>
              <CardOverlay className="overlay" />
            </RoleCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} data-aos="zoom-in" data-aos-delay="200">
            <RoleCard 
              elevation={6} 
              onClick={() => navigateHandler("Student")}
              className={activeCard === "Student" ? "active" : ""}
            >
              <IconContainer>
                <School fontSize="large" />
              </IconContainer>
              <CardContent>
                <RoleTitle>Student</RoleTitle>
                <RoleDescription>
                  Login as a student to access your courses, assignments, grades, and learning materials.
                </RoleDescription>
              </CardContent>
              <CardOverlay className="overlay" />
            </RoleCard>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4} data-aos="zoom-in" data-aos-delay="300">
            <RoleCard 
              elevation={6} 
              onClick={() => navigateHandler("Teacher")}
              className={activeCard === "Teacher" ? "active" : ""}
            >
              <IconContainer>
                <Group fontSize="large" />
              </IconContainer>
              <CardContent>
                <RoleTitle>Teacher</RoleTitle>
                <RoleDescription>
                  Login as a teacher to manage classes, create assignments, and track student performance.
                </RoleDescription>
              </CardContent>
              <CardOverlay className="overlay" />
            </RoleCard>
          </Grid>
        </Grid>
      </CardContainer>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, fontWeight: 500 }}>Please Wait...</Typography>
        </Box>
      </Backdrop>
      
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Animations
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

// Styled Components
const StyledContainer = styled.div`
  position: relative;
  background: linear-gradient(135deg, #2a0845 0%, #1c1c75 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow: hidden;
`;

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 30% 20%, rgba(90, 40, 200, 0.2) 0%, transparent 40%),
                    radial-gradient(circle at 80% 80%, rgba(90, 40, 200, 0.2) 0%, transparent 40%);
  z-index: 0;
`;

const HeaderText = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: 1;
`;

const GradientText = styled(Typography).attrs({
  variant: 'h3',
  component: 'h1'
})`
  background: linear-gradient(90deg, #FFFFFF 0%, #B99CFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`;

const SubText = styled(Typography).attrs({
  variant: 'subtitle1'
})`
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto;
  font-weight: 300;
`;

const CardContainer = styled(Container)`
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
  max-width: 1200px;
`;

const RoleCard = styled(Paper)`
  position: relative;
  padding: 2rem 1.5rem;
  text-align: center;
  background: rgba(31, 31, 56, 0.85);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  border-radius: 16px;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(44, 44, 108, 0.9);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    
    .overlay {
      opacity: 1;
    }
  }
  
  &.active {
    transform: scale(0.95);
    background: rgba(20, 20, 45, 0.95);
    color: white;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(125, 90, 254, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
`;

const IconContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7d5afe 0%, #4a2fbd 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  
  & > svg {
    font-size: 2.5rem;
    color: white;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const RoleTitle = styled(Typography).attrs({
  variant: 'h5',
  component: 'h2'
})`
  margin-bottom: 1rem;
  font-weight: 600;
  color: white;
`;

const RoleDescription = styled(Typography).attrs({
  variant: 'body2'
})`
  color: inherit;
  font-size: 0.95rem;
  line-height: 1.6;
`;