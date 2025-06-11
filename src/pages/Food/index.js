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
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { listFood, deleteFoods } from '../../services/food';
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
  const [selected, setSelected] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = foods.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteClick = () => {
    if (selected.length > 0) {
      setDeleteDialogOpen(true);
    }
  };

  // HERE is the fix: use deleteFoods from service with proper async handling
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await deleteFoods(selected);  // <-- Using imported service function
      setSuccess(`${selected.length} alimento(s) excluído(s) com sucesso`);
      setSelected([]);
      await fetchFoods();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Erro ao excluir alimento(s)');
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const isSelected = (id) => selected.includes(id);

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Alimentos Cadastrados</Typography>
          <Box>
            {selected.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleDeleteClick}
                sx={{ mr: 2 }}
              >
                Excluir Selecionados ({selected.length})
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateClick}
            >
              Cadastrar Alimento
            </Button>
          </Box>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < foods.length}
                      checked={foods.length > 0 && selected.length === foods.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
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
                    <TableCell colSpan={7} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : foods.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Nenhum alimento cadastrado
                    </TableCell>
                  </TableRow>
                ) : (
                  foods.map((food) => {
                    const isItemSelected = isSelected(food.id);
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        key={food.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleCheckboxClick(event, food.id)}
                          />
                        </TableCell>
                        <TableCell>{food.description}</TableCell>
                        <TableCell align="right">{food.servingSize}</TableCell>
                        <TableCell align="right">{food.carbohydrates.toFixed(1)}</TableCell>
                        <TableCell align="right">{food.protein.toFixed(1)}</TableCell>
                        <TableCell align="right">{food.totalFat.toFixed(1)}</TableCell>
                        <TableCell align="right">{food.calories.toFixed(1)}</TableCell>
                      </TableRow>
                    );
                  })
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

        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir {selected.length} alimento(s)? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} disabled={deleteLoading}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteConfirm} color="error" disabled={deleteLoading}>
              {deleteLoading ? <CircularProgress size={24} /> : 'Excluir'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
}
