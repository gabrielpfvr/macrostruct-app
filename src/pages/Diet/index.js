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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { listDiets, deleteDiet } from '../../services/diet';
import { ROUTES } from '../../config/constants';

export default function Diet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [diets, setDiets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [dietToDelete, setDietToDelete] = useState(null);

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

  const fetchDiets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await listDiets(page, rowsPerPage);
      setDiets(response.content);
      setTotalElements(response.page.totalElements);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchDiets();
  }, [fetchDiets]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateClick = () => {
    navigate(ROUTES.DIET_CREATE);
  };

  const handleView = (id) => {
    navigate(ROUTES.DIET_DETAIL.replace(':id', id));
  };

  const handleEdit = (id) => {
    navigate(ROUTES.DIET_EDIT.replace(':id', id));
  };

  const handleDeleteClick = (diet) => {
    setDietToDelete(diet);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!dietToDelete) return;

    setDeleteLoading(true);
    try {
      await deleteDiet(dietToDelete.id);
      setSuccess('Dieta excluída com sucesso');
      await fetchDiets();
    } catch (err) {
      setError('Erro ao excluir dieta');
    } finally {
      setDeleteLoading(false);
      setDeleteDialogOpen(false);
      setDietToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDietToDelete(null);
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Dietas Cadastradas
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateClick}
          >
            Cadastrar Dieta
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Descrição</TableCell>
                  <TableCell align="right">Peso (kg)</TableCell>
                  <TableCell align="right">Altura (cm)</TableCell>
                  <TableCell align="right">TDEE</TableCell>
                  <TableCell align="right">Refeições</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : diets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Nenhuma dieta cadastrada
                    </TableCell>
                  </TableRow>
                ) : (
                  diets.map((diet) => (
                    <TableRow key={diet.id}>
                      <TableCell>{diet.description}</TableCell>
                      <TableCell align="right">{diet.weight}</TableCell>
                      <TableCell align="right">{diet.height}</TableCell>
                      <TableCell align="right">{diet.tdee}</TableCell>
                      <TableCell align="right">{diet.totalMeals}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleView(diet.id)}
                          size="small"
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(diet.id)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(diet)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
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

        <Dialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
        >
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Tem certeza que deseja excluir a dieta "{dietToDelete?.description}"? Esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} disabled={deleteLoading}>
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteConfirm} 
              color="error" 
              disabled={deleteLoading}
            >
              {deleteLoading ? <CircularProgress size={24} /> : 'Excluir'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
} 