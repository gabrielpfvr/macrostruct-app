import { styled } from '@mui/material/styles';
import { Button as MuiButton } from '@mui/material';

export const PrimaryButton = styled(MuiButton)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(1.5, 4),
  alignSelf: 'center',
}));

export const SecondaryButton = styled(MuiButton)(({ theme }) => ({
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: '#222',
  },
})); 