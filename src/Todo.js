import React, {useState} from 'react'
import {List, ListItem, ListItemText, ListItemAvatar, Button, Modal, makeStyles, Input, FormControl, InputLabel} from '@material-ui/core';
import './Todo.css';
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      '& > *': {
        margin: theme.spacing(4),
      },
    },
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
  }));


function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const [input, setInput] = useState('');
    
    const updateTodo = (Event) => {
        Event.preventDefault();
        db.collection('todos').doc(props.text.id).set({
            todo: input
        }, {merge: true})
        setOpen(false)
    };

    return (
        <>
        <Modal
            className={classes.modal}
            open={open}
            onClose={e => setOpen(false)}>
                <div className={classes.paper}>
                    <h1>Edit</h1>
                    <form className={classes.root}>
                        <FormControl>
                            <InputLabel>Edit Todo</InputLabel>
                            <Input placeholder={props.text.todo} value={input} onChange={Event => setInput(Event.target.value)} />
                        </FormControl> 
                        <Button disabled={!input} variant="contained" color='primary' type='submit' onClick={updateTodo}>Update Todo</Button>
                    </form>
                </div>
        </Modal>

        <List className='todo_list'>
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.text.todo} secondary="My Tasks" />
                <div className={classes.root}>
                    <Button startIcon={<EditIcon />} variant="contained" color="primary" onClick={e => setOpen(true)}>
                        Edit
                    </Button>
                    <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" onClick={Event => db.collection('todos').doc(props.text.id).delete()}>
                        Delete
                    </Button>
                </div>
            </ListItem>
        </List>
        </>
    )
}

export default Todo
