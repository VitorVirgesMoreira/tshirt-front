import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { TshirtResponseModel } from "../../models/tshirt/tshirt-response-model";
import TshirtService from "../../services/backend/tshirt-service";
import "./styles.css";

export default function Home() {
  const [data, setData] = useState<Array<TshirtResponseModel>>([]);

  useEffect(() => {
    fetchTshirtData();
  }, []);

  const fetchTshirtData = () => {
    TshirtService.getAll()
      .then((response) => {
        setData(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <TableContainer className="tshirt-table" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Number of Colors</TableCell>
            <TableCell>Number of Fabrics</TableCell>
            <TableCell>Number of Images</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.colorsNumber}</TableCell>
              <TableCell>{row.fabricsNumber}</TableCell>
              <TableCell>{row.imagesNumber}</TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={`/types/${row.id}/${encodeURIComponent(row.name)}`}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
