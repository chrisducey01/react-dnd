import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 14px;
    margin-bottom: 24px;
    background-color: ${props=>(props.isDragging ? 'lightgreen' : 'white')};
    display:flex;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;

    &:last-child{
        margin-bottom: 0px;
    }
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;

export class Task extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.task.id} index={this.props.index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <Handle />
                        {this.props.task.content}
                    </Container>
                )}
            </Draggable>
        )
    }
}

export default Task
