import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import { SecondaryButton } from '../../../components/common/Button';

export const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  padding: theme.spacing(4, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
}));

export const HeaderContainer = styled(Box)({
  width: '100%',
  position: 'relative',
  marginBottom: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 120,
});

export const Logo = styled('img')({
  width: 100,
  height: 100,
  objectFit: 'contain',
});

export const ThemeToggle = styled(IconButton)({
  position: 'absolute',
  left: 16,
  top: '50%',
  transform: 'translateY(-50%)',
});

export const HomeButton = styled(SecondaryButton)({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
});

export const Divider = styled(Box)({
  width: '100%',
  borderTop: '1px solid black',
  marginBottom: 24,
});

export const FormContainer = styled('form')(({ theme }) => ({
  width: '100%',
  maxWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
})); 