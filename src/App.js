import React, { Component } from 'react';
import data from './data';
import Column from './components/Column';
import './reset.css';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;


class App extends Component {
  constructor(props){
    super(props);
    this.state = data;
  }

  componentDidMount(){
     const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/ne/news";
     const headers = {
       "x-rapidapi-key": "1918920b03msha6fce5bb1344417p16cfcbjsnd91e277e0013",
       "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
       "useQueryString": "true"
     }
     Axios.get(url, {headers: headers})
     .then(res=>{
       console.log(res.data);
       let articles = {};
       let tasks = this.state.tasks;
      
       
       res.data.forEach(article=>{
         articles[article.guid] = {id:article.guid, content:article.title};
       });
       articles = {...tasks, ...articles};
       let columns = this.state.columns;
       columns['column-1'].taskIds = Object.keys(articles);
       let newState = {...this.state, columns:columns, tasks:{...articles}};
       console.log(Object.keys(articles));
       this.setState(newState);
     })
     .catch(err=>{
       console.log(err);
     })
  }

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if(start === finish){
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }
  
      this.setState(newState)
      return;
    }

    const startTaksIds = Array.from(start.taskIds);
    startTaksIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaksIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index,0,draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns:{
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish  
      }
    };

    this.setState(newState);
  };


  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {
            this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasks} />;
            })
          }
        </Container>
      </DragDropContext>
    );
  }
}

export default App;
