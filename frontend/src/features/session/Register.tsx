import React, {FormEvent, useEffect, useRef, useState} from "react";
import Container from "@mui/material/Container";
import {
  Alert,
  Card, CardActions,
  CardContent,
  FormControl,
  FormGroup, FormLabel,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import {Radio, RadioGroup} from "@mui/joy";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Link, useNavigate} from "react-router-dom";
import userStore from "../../stores/userStore";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

interface RegisterProps {

}

const Register: React.FC<RegisterProps> = () => {
  const loading = userStore((state) => state.loading);
  const errors = userStore((state) => state.errors);
  const user = userStore((state) => state.user);
  const updateAttribute = userStore((state) => state.updateAttribute);
  const createUser = userStore((state) => state.createUser);
  const resetUser = userStore((state) => state.resetUser);

  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmationRef = useRef<HTMLInputElement>();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    createUser();
  }

  useEffect(() => {
    if (user.id && user.id > 0) {
      console.log("forwarding...")
      navigate('/login');
    }
  }, [user.id])

  const handleLogin = () => {
    resetUser();
    navigate('/login');
  }

  return (
    <section style={{marginTop: '2em'}}>
      <Container maxWidth={'md'}>
        <Card sx={{boxShadow: 1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth={'sm'}>
              <Typography variant={'h2'} color={'text.primary'} gutterBottom>
                Create Account
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
                           onChange={(event) => updateAttribute('email', event.target.value)}
                           value={user.email} />
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'username-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor={'email'} id={'username-label'}>Username</InputLabel>
                    <Input id={'username'}
                           type={'username'}
                           onChange={(event) => updateAttribute('username', event.target.value)}
                           value={user.username} />
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'first_name-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor={'first_name'} id={'first_name-label'}>First Name</InputLabel>
                    <Input id={'first_name'}
                           type={'first_name'}
                           onChange={(event) => updateAttribute('first_name', event.target.value)}
                           value={user.first_name} />
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'last_name-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor={'last_name'} id={'last_name-label'}>Last Name</InputLabel>
                    <Input id={'last_name'}
                           type={'last_name'}
                           onChange={(event) => updateAttribute('last_name', event.target.value)}
                           value={user.last_name} />
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'birthdate-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="us">
                      <DatePicker
                        label="Birthday"
                        value={dayjs(user.birthdate)}
                        format={'YYYY-MM-DD'}
                        onChange={(newValue) => updateAttribute('birthdate', newValue)}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </FormGroup>
                <FormGroup row={true} id={'gender-group'} sx={{marginTop: '1dm'}}>
                  <FormControl fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      defaultValue="female"
                      name="controlled-radio-buttons-group"
                      value={user.gender}
                      onChange={(event) => updateAttribute('gender', event.target.defaultValue)}
                      sx={{ my: 1 }}
                    >
                      <Radio value="female" label={'Female'} />
                      <Radio value="male" label={'Male'} />
                      <Radio value="other" label={'Other'} />
                    </RadioGroup>
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
                <FormGroup row={true} id={'password-confirmation-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor={'password-confirmation'} id={'password-confirmation-label'}>Password Confirmation</InputLabel>
                    <OutlinedInput id={'password-confirmation'}
                                   type={showPassword ? 'text' : 'password'}
                                   inputRef={passwordRef}
                                   onChange={(event) => updateAttribute('password_confirmation', event.target.value)}
                                   value={user.password_confirmation}
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
                            id={'submit-button'}>Create Account</Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
          <CardActions sx={{marginTop: '1em', justifyContent: 'center'}} disableSpacing>
            <Box>
              <Typography variant={'body2'} color={'text.secondary'} align={'center'}>
                <Link to={'/login'} onMouseDown={handleLogin}>Login to an existing account</Link>
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Container>
    </section>
  )
}

export default Register;