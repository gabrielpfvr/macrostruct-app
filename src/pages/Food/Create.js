import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tab,
  Tabs,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { createFood, importFoodFromFile } from '../../services/food';
import { ROUTES } from '../../config/constants';

function TabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`food-tabpanel-${index}`}
      aria-labelledby={`food-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FoodCreate() {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    description: '',
    servingSize: '',
    carbohydrates: '',
    protein: '',
    totalFat: '',
    calories: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    let timeoutId;
    if (success) {
      timeoutId = setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [success]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError(null);
    setSuccess(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.ms-excel' || 
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Por favor, selecione um arquivo Excel válido (.xls ou .xlsx)');
      setFile(null);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const foodData = {
        ...formData,
        servingSize: parseInt(formData.servingSize),
        carbohydrates: parseFloat(formData.carbohydrates),
        protein: parseFloat(formData.protein),
        totalFat: parseFloat(formData.totalFat),
        calories: parseFloat(formData.calories),
      };

      await createFood(foodData);
      setSuccess('Alimento cadastrado com sucesso!');
      setFormData({
        description: '',
        servingSize: '',
        carbohydrates: '',
        protein: '',
        totalFat: '',
        calories: '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecione um arquivo');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await importFoodFromFile(file);
      setSuccess('Alimentos importados com sucesso!');
      setFile(null);
      // Reset file input
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Cadastro de Alimentos
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate(ROUTES.FOOD)}
          >
            Voltar
          </Button>
        </Box>

        <Paper sx={{ mt: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Cadastro Manual" />
            <Tab label="Importar Excel" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mt: 2, mx: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mt: 2, mx: 3 }}>
              {success}
            </Alert>
          )}

          <TabPanel value={tabValue} index={0}>
            <form onSubmit={handleManualSubmit}>
              <TextField
                fullWidth
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Porção (g)"
                name="servingSize"
                type="number"
                value={formData.servingSize}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Carboidratos (g)"
                name="carbohydrates"
                type="number"
                value={formData.carbohydrates}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Proteínas (g)"
                name="protein"
                type="number"
                value={formData.protein}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Gorduras Totais (g)"
                name="totalFat"
                type="number"
                value={formData.totalFat}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Calorias"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
              </Button>
            </form>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Button
                variant="outlined"
                href="/planilha-exemplo.xlsx"
                download
              >
                Baixar Modelo de Excel
              </Button>
            </Box>
            <form onSubmit={handleFileSubmit}>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  mb: 2,
                }}
              >
                <input
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <Button
                    component="span"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Selecionar Arquivo
                  </Button>
                </label>
                {file && (
                  <Typography sx={{ mt: 2 }}>
                    Arquivo selecionado: {file.name}
                  </Typography>
                )}
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!file || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Importar'}
              </Button>
            </form>
          </TabPanel>
        </Paper>
      </Container>
    </MainLayout>
  );
} 