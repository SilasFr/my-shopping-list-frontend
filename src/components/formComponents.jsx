import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useState } from 'react';

export default function PasswordInput({ name, sx, label, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  function handlePasswordDisplay() {
    setShowPassword(!showPassword);
  }

  return (
    <FormControl sx={sx} variant="outlined">
      <InputLabel htmlFor={name} required>
        {label}
      </InputLabel>
      <OutlinedInput
        id={name}
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handlePasswordDisplay}
              onMouseDown={handlePasswordDisplay}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      ></OutlinedInput>
    </FormControl>
  );
}
