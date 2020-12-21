import React, { Component } from 'react'
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';

const Container = styled(Card)`
    margin: 18px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    min-width: 320px;
    display: flex;
    flex-direction: column;
`;

const Title = styled(Card.Header)`
    padding: 12px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    font-size: 32px;
`;
const TaskList = styled(Card.Body)`
    padding: 24px;
    transition: background-color 0.5s ease;
    background-color: ${props=>(props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 140px;
`;

export class Column extends Component {
    render() {
        return (
            <Container as="section">
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => {
                                return <Task key={task.id} task={task} index={index}/>
                            })}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        )
    }
}

export default Column
