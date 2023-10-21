import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import TypeService from "../../services/backend/type-service";
import { TypeResponseModel } from "../../models/type/type-response-model";
import { ImageResponseModel } from "../../models/image/image-response-model";
import ImageService from "../../services/backend/image-service";
import { ImageRequestModel } from "../../models/image/image-request-model";

import "./styles.css";

export default function Types() {
  const { id, name } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<ImageResponseModel[]>(
    []
  );
  const [data, setData] = useState<Array<TypeResponseModel>>([]);
  const [file, setFile] = useState<File | null>(null);
  const [typeId, setTypeId] = useState<string>("");

  useEffect(() => {
    fetchTypesData();
  }, []);

  const handleOpenModal = (images: ImageResponseModel[], id: string) => {
    setSelectedImages(images);
    setModalOpen(true);
    setTypeId(id);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddImage = () => {
    if (file) {
      const requestModel = {
        TypeId: typeId,
        ImageFile: file,
      } as ImageRequestModel;

      const formData = new FormData();

      formData.append("ImageFile", requestModel.ImageFile);
      formData.append("TypeId", requestModel.TypeId);

      ImageService.createImage(formData).then(() => {
        fetchTypesData();
        handleCloseModal();
      });
    }
  };

  const handleDeleteImage = async (id: string) => {
    ImageService.deleteImage(id).then(() => {
      fetchTypesData();
      handleCloseModal();
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFile(file);

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const imageBase64 = e.target?.result as string;

        setSelectedImages((prevSelectedImages) => [
          ...prevSelectedImages,
          {
            imageId: "",
            imageBase64,
          },
        ]);
      };

      reader.readAsDataURL(file);
    }
  };

  const fetchTypesData = () => {
    TypeService.getTypesByTshirtId(id!)
      .then((response) => {
        setData(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="type-tshirt">
      <h1 className="title">Item name: {name}</h1>

      <TableContainer className="type-table" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Color</TableCell>
              <TableCell>Fabric</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.fabric}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenModal(item.images, item.id)}
                  >
                    View Images
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className="modal-content">
          <h2>Images</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button onClick={handleAddImage} className="add-image-button">
            Adicionar imagem
          </button>
          <ul>
            {selectedImages.map((image, index) => (
              <li key={index} className="image-item">
                <button
                  onClick={() => handleDeleteImage(image.imageId)}
                  className="delete-image-button"
                >
                  X
                </button>
                <img
                  className="image"
                  src={`data:image/jpeg;base64,${image.imageBase64}`}
                  alt={`Image ${index}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
