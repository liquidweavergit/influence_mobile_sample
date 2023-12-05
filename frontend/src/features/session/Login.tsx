import React, {FormEvent, Fragment, useEffect, useRef, useState} from "react";
import {
  Alert,
  Card, CardActions,
  CardContent,
  FormControl,
  FormGroup, Input,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import userStore from "../../stores/userStore";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Link, useNavigate} from "react-router-dom";

interface LoginProps {

}

const Login: React.FC<LoginProps> = () => {
  const loading = userStore((state) => state.loading);
  const errors = userStore((state) => state.errors);
  const user = userStore((state) => state.user);
  const updateAttribute = userStore((state) => state.updateAttribute);
  const login = userStore((state) => state.login);
  const getAccessToken = userStore((state) => state.getAccessToken);

  const passwordRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    login();

    if (getAccessToken()) {
      navigate('/');
    }
  }

  return (
    <section style={{marginTop: '2em'}}>
      <Container maxWidth={'md'}>
        <Card sx={{boxShadow: 1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth={'sm'}>
              <Typography variant={'h2'} color={'text.primary'} gutterBottom>
                Login
              </Typography>
              {errors?.length > 0 &&
                <Alert color={'error'}>
                  {errors.map((error, index) => {
                    return <div key={index}>
                      {error}
                    </div>
                  })}
                </Alert>
              }
              <form onSubmit={handleSubmit}>
                <FormGroup row={true} id={'email-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor={'email'} id={'email-label'}>Email Address</InputLabel>
                    <Input id={'email'}
                           type={'email'}
                           inputRef={emailRef}
                           onChange={(event) => updateAttribute('email', event.target.value)}
                           value={user.email} />
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'password-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor={'password'} id={'password-label'}>Password</InputLabel>
                    <OutlinedInput id={'password'}
                                   type={showPassword ? 'text' : 'password'}
                                   inputRef={passwordRef}
                                   onChange={(event) => updateAttribute('password', event.target.value)}
                                   value={user.password}
                                   endAdornment={
                      <InputAdornment position={'end'}>
                        <IconButton aria-label={'toggle password visibility'}
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge={'end'}/>
                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                      </InputAdornment>
                    } />
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'submit-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <Button disabled={loading}
                            variant={'contained'}
                            color={'primary'}
                            type={'submit'}
                            id={'submit-button'}>Login</Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
          <CardActions sx={{marginTop: '1em', justifyContent: 'center'}} disableSpacing>
            <Box>
              <Typography variant={'body2'} color={'text.secondary'} align={'center'}>
                <Link to={'/forgot-password'}>Forgot Password</Link>
              </Typography>
              <Typography variant={'body2'} color={'text.secondary'} align={'center'}>
                <Link to={'/register'}>Create an Account</Link>
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Container>
    </section>
  )
};

export default Login;