import React, {FormEvent, useEffect} from "react";
import Container from "@mui/material/Container";
import {
  Alert,
  Card,
  CardContent,
  FormControl,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {Radio, RadioGroup} from "@mui/joy";
import Button from "@mui/material/Button";
import userStore from "../../stores/userStore";
import {useNavigate} from "react-router-dom";

interface UpdateUserProps {

}

const UpdateUser: React.FC<UpdateUserProps> = () => {
  const loading = userStore((state) => state.loading);
  const errors = userStore((state) => state.errors);
  const user = userStore((state) => state.user);
  const updateAttribute = userStore((state) => state.updateAttribute);
  const fetchUser = userStore((state) => state.fetchUser);
  const updateUser = userStore((state) => state.updateUser);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user.email || user.email === '') {
      fetchUser();
    }
  },[user.email]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    updateUser();
    navigate('/');
  }

  return (
    <section style={{marginTop: '2em'}}>
      <Container maxWidth={'md'}>
        <Card sx={{boxShadow: 1, maxWidth: 'md'}}>
          <CardContent>
            <Container maxWidth={'sm'}>
              <Typography variant={'h2'} color={'text.primary'} gutterBottom>
                Update Profile
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
                <FormGroup row={true} id={'submit-group'} sx={{marginTop: '1em'}}>
                  <FormControl fullWidth>
                    <Button disabled={loading}
                            variant={'contained'}
                            color={'primary'}
                            type={'submit'}
                            id={'submit-button'}>Update Profile</Button>
                  </FormControl>
                </FormGroup>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Container>
    </section>
  )
};

export default UpdateUser;