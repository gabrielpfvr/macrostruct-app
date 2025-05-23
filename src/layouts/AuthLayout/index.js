import React from 'react';
import PropTypes from 'prop-types';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/images/logo.png';
import { useTheme } from '../../theme/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  PageContainer,
  HeaderContainer,
  LogoContainer,
  Logo,
  LogoTitle,
  HeaderButton,
  ThemeToggle,
  ButtonsContainer,
  Divider,
  ContentContainer,
} from './styles';

export default function AuthLayout({ children }) {
  const { toggleTheme, mode } = useTheme();
  const { logout, isAuthenticated } = useAuth();

  return (
    <PageContainer>
      <HeaderContainer>
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
          <LogoTitle variant="h4">
            MacroStruct <span>- Dieta Fácil</span>
          </LogoTitle>
        </LogoContainer>
        <ThemeToggle
          onClick={toggleTheme}
          color="inherit"
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </ThemeToggle>
        <ButtonsContainer>
          {isAuthenticated && (
            <HeaderButton
              variant="contained"
              onClick={logout}
              startIcon={<LogoutIcon />}
            >
              Sair
            </HeaderButton>
          )}
        </ButtonsContainer>
      </HeaderContainer>

      <Divider />

      <ContentContainer>
        {children}
      </ContentContainer>
    </PageContainer>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}; 