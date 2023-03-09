import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchAsyncGetPost,
  fetchAsyncGetPosts,
  fetchAsyncDeletePost,
  selectPosts
} from './postSlice';
import ModalForm from './ModalForm';

// Style
const styles = {
  container: {
    marginTop: '20px'
  },
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
  },
  link : {
    width: '100%'
  }
};

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  //初回レンダリング時にposts情報取得
  useEffect(() => {
    dispatch(fetchAsyncGetPosts());
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(false);
    dispatch(fetchAsyncGetPost(0));
  }

  const handleOpenEdit = (id) => {
    setOpen(true);
    setIsEdit(true);
    dispatch(fetchAsyncGetPost(id));
  }

  const handleClickDelete = (id) => {
    dispatch(fetchAsyncDeletePost(id));
  }

  return (
    <div>
        <Container fixed maxWidth="md" style={styles.container}>
            <Button variant="outlined" onClick={handleOpen}>ADD POST</Button>
            <List>
                {posts && (
                    posts.map((post) => (
                        <ListItem key={post.id}>
                            <Link to={`/posts/${post.id}`} style={styles.link}>
                                <ListItemButton>
                                     {post.title}
                                </ListItemButton>
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton type="button" edge="end" aria-label="Edit" onClick={() => handleOpenEdit(post.id)} value={post.id}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton type="button" edge="end" aria-label="delete" onClick={() => handleClickDelete(post.id)} value={post.id}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                )}
            </List>
            <ModalForm propsOpen={[open, setOpen]} isEdit={isEdit} />
        </Container>
    </div>
  )
};

export default PostList;
