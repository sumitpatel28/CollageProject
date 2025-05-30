import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, 
    Grid, 
    Box, 
    Typography, 
    Paper, 
    Checkbox, 
    FormControlLabel, 
    TextField, 
    CssBaseline, 
    IconButton, 
    InputAdornment, 
    CircularProgress, 
    Backdrop,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from '../components/buttonStyles';
import styled, { keyframes } from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const defaultTheme = createTheme();

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
        else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    const guestModeHandler = () => {
        const password = "zxc";

        if (role === "Admin") {
            const email = "yogendra@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
        else if (role === "Student") {
            const rollNum = "1";
            const studentName = "Dipesh Awasthi";
            const fields = { rollNum, studentName, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
        else if (role === "Teacher") {
            const email = "tony@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
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
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    const getRoleColor = () => {
        switch(role) {
            case 'Admin': return '#7f56da';
            case 'Student': return '#4caf50';
            case 'Teacher': return '#2196f3';
            default: return '#7f56da';
        }
    };

    const getRoleGradient = () => {
        switch(role) {
            case 'Admin': return 'linear-gradient(90deg, #7f56da, #9b6ffa)';
            case 'Student': return 'linear-gradient(90deg, #4caf50, #80e27e)';
            case 'Teacher': return 'linear-gradient(90deg, #2196f3, #21cbf3)';
            default: return 'linear-gradient(90deg, #7f56da, #9b6ffa)';
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <LoginContainer>
                <StyledBackButtonContainer>
                    <IconButton 
                        component={Link} 
                        to="/choose" 
                        aria-label="go back" 
                        sx={{ color: '#fff' }}
                    >
                        <ArrowBack />
                    </IconButton>
                </StyledBackButtonContainer>
                
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid 
                        item 
                        xs={12} 
                        sm={12} 
                        md={5} 
                        component={StyledPaper} 
                        elevation={isMobile ? 0 : 6} 
                        square
                        order={{ xs: 2, md: 1 }}
                    >
                        <LoginBox
                            sx={{
                                my: 8,
                                mx: 4,
                            }}
                        >
                            <RoleTitle roleColor={getRoleColor()}>
                                {role} Login
                            </RoleTitle>
                            <Typography variant="body1" sx={{ mb: 4, color: 'rgba(0, 0, 0, 0.6)' }}>
                                Welcome back! Please enter your credentials to access your account
                            </Typography>
                            
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                {role === "Student" ? (
                                    <>
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="rollNumber"
                                            label="Roll Number"
                                            name="rollNumber"
                                            autoComplete="off"
                                            type="number"
                                            autoFocus
                                            error={rollNumberError}
                                            helperText={rollNumberError && 'Roll Number is required'}
                                            onChange={handleInputChange}
                                            inputProps={{ min: 0 }}
                                            InputLabelProps={{
                                                style: { color: rollNumberError ? '' : 'rgba(0, 0, 0, 0.6)' }
                                            }}
                                            roleColor={getRoleColor()}
                                        />
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="studentName"
                                            label="Full Name"
                                            name="studentName"
                                            autoComplete="name"
                                            error={studentNameError}
                                            helperText={studentNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                            InputLabelProps={{
                                                style: { color: studentNameError ? '' : 'rgba(0, 0, 0, 0.6)' }
                                            }}
                                            roleColor={getRoleColor()}
                                        />
                                    </>
                                ) : (
                                    <StyledTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                        InputLabelProps={{
                                            style: { color: emailError ? '' : 'rgba(0, 0, 0, 0.6)' }
                                        }}
                                        roleColor={getRoleColor()}
                                    />
                                )}
                                <StyledTextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    InputLabelProps={{
                                        style: { color: passwordError ? '' : 'rgba(0, 0, 0, 0.6)' }
                                    }}
                                    roleColor={getRoleColor()}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setToggle(!toggle)} edge="end" sx={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid container sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mt: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <StyledCheckbox 
                                                value="remember" 
                                                color="primary" 
                                                roleColor={getRoleColor()} 
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                                Remember me
                                            </Typography>
                                        }
                                    />
                                    <StyledForgotLink href="#">
                                        Forgot password?
                                    </StyledForgotLink>
                                </Grid>
                                
                                <LoginButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    roleGradient={getRoleGradient()}
                                    disabled={loader}
                                >
                                    {loader ? (
                                        <CircularProgress size={24} sx={{ color: '#fff' }} />
                                    ) : (
                                        "Sign In"
                                    )}
                                </LoginButton>
                                
                                <GuestButton
                                    fullWidth
                                    onClick={guestModeHandler}
                                    variant="outlined"
                                    sx={{ mb: 3 }}
                                    roleColor={getRoleColor()}
                                    disabled={guestLoader}
                                >
                                    {guestLoader ? (
                                        <CircularProgress size={24} sx={{ color: getRoleColor() }} />
                                    ) : (
                                        "Login as Guest"
                                    )}
                                </GuestButton>
                                
                                {role === "Admin" && (
                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
                                                Don't have an account?{' '}
                                                <StyledSignUpLink to="/Adminregister" roleColor={getRoleColor()}>
                                                    Sign up now
                                                </StyledSignUpLink>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                )}
                            </Box>
                        </LoginBox>
                    </Grid>
                    
                    <Grid
                        item
                        xs={false}
                        sm={false}
                        md={7}
                        sx={{
                            backgroundImage: `url(${bgpic})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: 'relative',
                            display: { xs: 'none', md: 'block' },
                        }}
                        order={{ xs: 1, md: 2 }}
                    >
                        <RoleOverlay role={role} />
                        <WelcomeTextContainer>
                            <WelcomeTitle>
                                Welcome to the School Management System
                            </WelcomeTitle>
                            <WelcomeSubtitle>
                                {role === "Admin" && "Manage your school with powerful admin tools"}
                                {role === "Student" && "Access your courses, assignments and grades"}
                                {role === "Teacher" && "Manage your classes and track student progress"}
                            </WelcomeSubtitle>
                        </WelcomeTextContainer>
                    </Grid>
                </Grid>
                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={guestLoader}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CircularProgress color="primary" />
                        <Typography sx={{ mt: 2, fontWeight: 500 }}>Logging in as guest...</Typography>
                    </Box>
                </Backdrop>
                
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </LoginContainer>
        </ThemeProvider>
    );
};

export default LoginPage;

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const LoginContainer = styled.div`
    position: relative;
    min-height: 100vh;
    background-color: #f5f5f5;
`;

const StyledBackButtonContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
`;

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    height: 100%;
    border-radius: 0;
    position: relative;
    z-index: 1;
    animation: ${fadeIn} 0.6s ease-out;
    
    @media (min-width: 900px) {
        border-radius: 20px 0 0 20px;
        margin: 2rem 0 2rem 2rem;
    }
`;

const LoginBox = styled(Box)`
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    
    @media (min-width: 600px) {
        padding: 0;
    }
`;

const RoleTitle = styled(Typography).attrs({
    variant: 'h4',
    component: 'h1'
})`
    font-weight: 700;
    margin-bottom: 8px;
    color: ${props => props.roleColor || '#7f56da'};
    position: relative;
    
    &:after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 60px;
        height: 4px;
        background: ${props => props.roleColor || '#7f56da'};
        border-radius: 2px;
    }
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 16px;
    transition: all 0.3s ease;
    
    & .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border-color: ${props => props.roleColor || '#7f56da'};
        }
        
        &:hover fieldset {
            border-color: ${props => props.roleColor || '#7f56da'};
        }
    }
    
    & .MuiInputLabel-root.Mui-focused {
        color: ${props => props.roleColor || '#7f56da'};
    }
`;

const StyledCheckbox = styled(Checkbox)`
    &.Mui-checked {
        color: ${props => props.roleColor || '#7f56da'};
    }
`;

const LoginButton = styled(Button)`
    padding: 12px;
    font-weight: 600;
    font-size: 1rem;
    text-transform: none;
    border-radius: 8px;
    background: ${props => props.roleGradient || 'linear-gradient(90deg, #7f56da, #9b6ffa)'};
    box-shadow: 0 8px 16px rgba(127, 86, 218, 0.2);
    transition: all 0.3s ease;
    border: none;
    
    &:hover {
        box-shadow: 0 12px 20px rgba(127, 86, 218, 0.3);
        transform: translateY(-2px);
        background: ${props => props.roleGradient || 'linear-gradient(90deg, #7f56da, #9b6ffa)'};
    }
    
    &:disabled {
        background: #e0e0e0;
        color: #a0a0a0;
        box-shadow: none;
    }
`;

const GuestButton = styled(Button)`
    padding: 11px;
    font-weight: 500;
    font-size: 1rem;
    text-transform: none;
    border-radius: 8px;
    color: ${props => props.roleColor || '#7f56da'};
    border-color: ${props => props.roleColor || '#7f56da'};
    border-width: 2px;
    transition: all 0.3s ease;
    
    &:hover {
        background-color: rgba(127, 86, 218, 0.04);
        border-color: ${props => props.roleColor || '#7f56da'};
        border-width: 2px;
    }
    
    &:disabled {
        border-color: #e0e0e0;
        color: #a0a0a0;
    }
`;

const StyledForgotLink = styled.a`
    color: #5f6368;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
        color: #1a73e8;
        text-decoration: underline;
    }
`;

const StyledSignUpLink = styled(Link)`
    color: ${props => props.roleColor || '#7f56da'};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
        text-decoration: underline;
    }
`;

const RoleOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => {
        switch(props.role) {
            case 'Admin': return 'linear-gradient(135deg, rgba(127, 86, 218, 0.7), rgba(155, 111, 250, 0.8))';
            case 'Student': return 'linear-gradient(135deg, rgba(76, 175, 80, 0.7), rgba(128, 226, 126, 0.8))';
            case 'Teacher': return 'linear-gradient(135deg, rgba(33, 150, 243, 0.7), rgba(33, 203, 243, 0.8))';
            default: return 'linear-gradient(135deg, rgba(127, 86, 218, 0.7), rgba(155, 111, 250, 0.8))';
        }
    }};
    backdrop-filter: blur(3px);
`;

const WelcomeTextContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    width: 80%;
    max-width: 600px;
    z-index: 1;
`;

const WelcomeTitle = styled(Typography).attrs({
    variant: 'h3',
    component: 'h2'
})`
    font-weight: 700;
    margin-bottom: 16px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const WelcomeSubtitle = styled(Typography).attrs({
    variant: 'h6',
    component: 'p'
})`
    font-weight: 400;
    opacity: 0.9;
    line-height: 1.6;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;
