import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { listFood } from '../../services/food';
import { ROUTES } from '../../config/constants';

export default function Food() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState('description');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [totalElements, setTotalElements] = useState(0);

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

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      const response = await listFood(page, rowsPerPage, orderBy, orderDirection);
      setFoods(response.content);
      setTotalElements(response.page.totalElements);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, orderBy, orderDirection]);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSort = (property) => () => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCreateClick = () => {
    navigate(ROUTES.FOOD_CREATE);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Alimentos Cadastrados
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Cadastrar Alimento
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'description'}
                      direction={orderBy === 'description' ? orderDirection : 'asc'}
                      onClick={handleSort('description')}
                    >
                      Descrição
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'servingSize'}
                      direction={orderBy === 'servingSize' ? orderDirection : 'asc'}
                      onClick={handleSort('servingSize')}
                    >
                      Porção (g)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'carbohydrates'}
                      direction={orderBy === 'carbohydrates' ? orderDirection : 'asc'}
                      onClick={handleSort('carbohydrates')}
                    >
                      Carboidratos (g)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'protein'}
                      direction={orderBy === 'protein' ? orderDirection : 'asc'}
                      onClick={handleSort('protein')}
                    >
                      Proteínas (g)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'totalFat'}
                      direction={orderBy === 'totalFat' ? orderDirection : 'asc'}
                      onClick={handleSort('totalFat')}
                    >
                      Gorduras (g)
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="right">
                    <TableSortLabel
                      active={orderBy === 'calories'}
                      direction={orderBy === 'calories' ? orderDirection : 'asc'}
                      onClick={handleSort('calories')}
                    >
                      Calorias
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : foods.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Nenhum alimento cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  foods.map((food, index) => (
                    <TableRow key={index}>
                      <TableCell>{food.description}</TableCell>
                      <TableCell align="right">{food.servingSize}</TableCell>
                      <TableCell align="right">{food.carbohydrates.toFixed(1)}</TableCell>
                      <TableCell align="right">{food.protein.toFixed(1)}</TableCell>
                      <TableCell align="right">{food.totalFat.toFixed(1)}</TableCell>
                      <TableCell align="right">{food.calories.toFixed(1)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalElements}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            labelRowsPerPage="Itens por página"
          />
        </Paper>
      </Container>
    </MainLayout>
  );
} 