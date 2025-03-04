import React from 'react';
import TextField from '@mui/material/TextField';
import CheckBox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface ChildProps {
    condition: boolean;
    setCondition: (value: boolean) => void;
  }

export function Login({ condition, setCondition }: ChildProps) {
    const handleCondition = () => {
        setCondition(!condition);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField label="Email Address"
                    required
                    fullWidth
                    name="email"
                    autoComplete='email'
                    autoFocus
                />
                <TextField
                    label="Password"
                    type="password"
                    required
                    fullWidth
                    name="password"
                    autoComplete="current-password"
                />
                <FormControlLabel
                    control={<CheckBox value="remember"
                        color="primary" />}
                    label="remember me"
                />
                <Button type="submit" fullWidth variant="contained"
                    sx={{ mt: 3, mb:2 }}
                    onClick={handleCondition}>
                    Sign in
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link>Forgot password?</Link>
                    </Grid>
                    <Grid item>
                        <Link>Sign up</Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}