import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: "name", headerName: "Product Code", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "price", headerName: "Price ($)", type: "number", flex: 1 },
  { field: "weight", headerName: "Weight (kg)", type: "number", flex: 1 },
  { field: "uom", headerName: "UOM", flex: 1 },
  { field: "quantity_per_uom", headerName: "Qty/UOM", type: "number", flex: 1 },
  { field: "stock_level", headerName: "Stock Level", type: "number", flex: 1 },
];

const initialRows = [
  { id: 1, name: "Product A", description: "High-quality product", price: 99, weight: 1.2, uom: "Box", quantity_per_uom: 10, stock_level: 50 },
  { id: 2, name: "Product B", description: "Affordable and durable", price: 149, weight: 2.5, uom: "Pack", quantity_per_uom: 20, stock_level: 30 },
  { id: 3, name: "Product C", description: "Best-selling item", price: 199, weight: 3.0, uom: "Piece", quantity_per_uom: 1, stock_level: 80 },
  { id: 4, name: "Product D", description: "Eco-friendly", price: 79, weight: 0.8, uom: "Bag", quantity_per_uom: 5, stock_level: 40 },
  { id: 5, name: "Product E", description: "Lightweight and durable", price: 129, weight: 1.5, uom: "Pack", quantity_per_uom: 15, stock_level: 20 },
  { id: 6, name: "Product F", description: "Water-resistant", price: 89, weight: 2.2, uom: "Box", quantity_per_uom: 8, stock_level: 35 },
  { id: 7, name: "Product G", description: "Premium quality", price: 229, weight: 4.0, uom: "Piece", quantity_per_uom: 1, stock_level: 25 },
  { id: 8, name: "Product H", description: "Compact and efficient", price: 109, weight: 1.0, uom: "Bag", quantity_per_uom: 3, stock_level: 60 },
  { id: 9, name: "Product I", description: "Stainless steel", price: 159, weight: 3.5, uom: "Pack", quantity_per_uom: 12, stock_level: 10 },
  { id: 10, name: "Product J", description: "Long-lasting", price: 189, weight: 2.8, uom: "Box", quantity_per_uom: 6, stock_level: 15 },
  { id: 11, name: "Product K", description: "Light and strong", price: 99, weight: 1.8, uom: "Piece", quantity_per_uom: 1, stock_level: 45 },
  { id: 12, name: "Product K", description: "Light and strong", price: 99, weight: 1.8, uom: "Piece", quantity_per_uom: 1, stock_level: 45 },

];

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [selectionModel, setSelectionModel] = useState([]);

  const filteredRows = initialRows.filter((row) =>
    row[searchColumn]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProduct = () => {
    console.log(`Edit product with id ${selectionModel[0]}`);
  }

  const handleDeleteProduct = () => {
    console.log(`Delete product with ${selectionModel.join(', ')}`);
  } 

  return (
    <Container sx={{ mt: 2, width: "160%" }}>
      <Typography variant="h4" gutterBottom sx={{mb: 2, mt: 5}}>
        Inventory Management
      </Typography>
      
      <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderColor: 'divider' }}>
        <Box sx={{display: 'flex', alignItems: 'center', borderColor: 'divider' }}>
          <TextField
            select
            label="Search By"
            value={searchColumn}
            onChange={(e) => setSearchColumn(e.target.value)}
            sx={{ mr: 2, width: 150 }}
          >
            {columns.map((col) => (
              <MenuItem key={col.field} value={col.field}>
                {col.headerName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={`Search ${columns.find((col) => col.field === searchColumn)?.headerName}`}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{width: 300 }}
          />
        </Box>
        <Box  sx={{display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            startIcon={<AddIcon/>}
            sx={{ marginRight: 2 }}
          >
              Add New Product
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditProduct}
            disabled={selectionModel.length !== 1}
            sx={{ marginRight: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteProduct}
            disabled={selectionModel.length === 0}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={[20]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pagination
        disableColumnFilter
        checkboxSelection
        selectionModel={selectionModel}
        onRowSelectionModelChange ={(newSelection) => {console.log('fire');setSelectionModel(newSelection)}}
      />
      
    </Container>
  );
};

export default InventoryManagement;
