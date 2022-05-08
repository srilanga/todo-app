// One row UI -> able to re-use
import React from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import './Todo.css';

function Todo(props) {
  return (
    <List class="todo__list">
        <ListItem>
            <ListItemText primary={props.text} secondary='Dummy deadline' />
        </ListItem>
    </List>
  )
}

export default Todo