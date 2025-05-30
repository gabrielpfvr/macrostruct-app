import React from 'react';
import PropTypes from 'prop-types';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PersonIcon from '@mui/icons-material/Person';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useTheme } from '../../theme/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { ROUTES } from '../../config/constants';
import {
  PageContainer,
  HeaderContainer,
  LogoContainer,
  Logo,
  LogoTitle,
  HeaderButton,
  ThemeToggle,
  ButtonsContainer,
  ContentContainer,
} from './styles';

export default function MainLayout({ children }) {
  const { toggleTheme, mode } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.PROFILE);
  }

  return (
    <PageContainer>
      <HeaderContainer>
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
          <LogoTitle variant="h5">
            MacroStruct <span>- Dieta Fácil</span>
          </LogoTitle>
        </LogoContainer>
        
        <ButtonsContainer>
          <HeaderButton
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleHomeClick}
          >
            Início
          </HeaderButton>
          <HeaderButton
            variant="contained"
            startIcon={<RestaurantIcon />}
          >
            Alimentos
          </HeaderButton>
          <HeaderButton
            variant="contained"
            startIcon={<FoodBankIcon />}
          >
            Minhas Dietas
          </HeaderButton>
          <HeaderButton
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={handleProfileClick}
          >
            Perfil
          </HeaderButton>
        </ButtonsContainer>

        <ThemeToggle
          onClick={toggleTheme}
          color="inherit"
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </ThemeToggle>

        <ButtonsContainer>
          <HeaderButton
            variant="contained"
            onClick={logout}
            startIcon={<LogoutIcon />}
          >
            Sair
          </HeaderButton>
        </ButtonsContainer>
      </HeaderContainer>

      <ContentContainer>
        {children}
      </ContentContainer>
    </PageContainer>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}; 