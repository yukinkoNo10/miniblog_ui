import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState, useEffect } from "react";
import {
  fetchAsyncUpdatePost,
  fetchAsyncNewPost,
  selectPost,
} from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }
}

const ModalForm = (props) => {
  const [open, setOpen] = props.propsOpen;
  const isEdit = props.isEdit;

  const dispatch = useDispatch();
  const currentPost = useSelector(selectPost);

  useEffect(() => {
    setInputPost({
      id: currentPost.id,
      title: currentPost.title,
      body: currentPost.body,
      author: currentPost.author,
    });
  }, [currentPost]);

  const [inputPost, setInputPost] = useState({
    id: null,
    title: "",
    body: "",
    author: "",
  });

  const handleClose = () => {
    setInputPost({
      id: null,
      title: "",
      body: "",
      author: "",
    });
    setOpen(false);
  };

  const handleInputTitle = (e) => {
    setInputPost({
      ...inputPost,
      title: e.target.value,
    });
  };
  const handleInputBody = (e) => {
    setInputPost({
      ...inputPost,
      body: e.target.value,
    });
  };
  const handleInputAuthor = (e) => {
    setInputPost({
      ...inputPost,
      author: e.target.value,
    });
  };

  const onClickUpdate = () => {
    dispatch(fetchAsyncUpdatePost(inputPost));
    setInputPost({
      id: null,
      title: "",
      body: "",
      author: "",
    });
    setOpen(false);
  };

  const onClickCreate = () => {
    dispatch(fetchAsyncNewPost(inputPost));
    setInputPost({
      id: null,
      title: "",
      body: "",
      author: "",
    });
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEdit ? "Edit Post" : "Create Post"}
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { my: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="title"
            label="Title"
            value={inputPost.title}
            reqwired="true"
            fullWidth
            onChange={handleInputTitle}
          />
          <TextField
            id="body"
            label="Body"
            value={inputPost.body}
            reqwired="true"
            fullWidth
            onChange={handleInputBody}
          />
          <TextField
            id="author"
            label="Author"
            value={inputPost.author}
            reqwired="true"
            fullWidth
            onChange={handleInputAuthor}
          />
          <Stack direction="row" spacing={2}>
            <Button
              id="save"
              variant="outlined"
              color="secondary"
              onClick={handleClose}
            >
              CANCEL
            </Button>
            {isEdit ? (
              <Button
                id="save"
                variant="outlined"
                onClick={onClickUpdate}
              >UPDATE</Button>
            ) : (
              <Button
                id="save"
                variant="outlined"
                onClick={onClickCreate}
              >CREATE</Button>
            )}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalForm;
