import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { SecondaryButton } from '../../components/common/Button';

export const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 80,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

export const Logo = styled('img')({
  width: 60,
  height: 60,
  objectFit: 'contain',
});

export const LogoTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 600,
  '& span': {
    color: theme.palette.text.primary,
    fontWeight: 400,
  },
}));

export const ThemeToggle = styled(IconButton)({
  marginLeft: 'auto',
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  marginLeft: 16,
});

export const HeaderButton = styled(SecondaryButton)({
  minWidth: 'auto',
});

export const ContentContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
})); 