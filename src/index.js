import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//returns winner or null if draw.
function CalculateWinner(squares){
    //all possible winning lines.
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

for(let i =0;i<lines.length;i++){
const [a,b,c] = lines[i];
if (squares[a] && squares[a]==squares[b] && squares[a]==squares[c]){
    console.log("WINNER: " + squares[a]);
return squares[a];
}
console.log("no winner :(");
return null;
}
}



//FUNCTION COMPONENT( NO STATE AND PURE)
function Square(props){
    return(
        <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
    );
}




  class Board extends React.Component {
    
    // 'life state up'
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXnext: true,
        }
    
    }

    handleClick(i){
        const squares = this.state.squares.slice(); 

        if(squares[i] || CalculateWinner(this.state.squares)){
        return;
        }
        squares[i] = this.state.isXnext ? 'X' : 'O';
        this.setState({squares: squares,
                    isXnext: !this.state.isXnext});


    }
    
    renderSquare(i) {
      return <Square value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
            />;
    }
  
    render() {

        const winner = CalculateWinner(this.state.squares);
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        }else{
            status = 'Next player: ' + (this.state.isXnext ? 'X' : 'O');
        }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    //   this.setState({this.state.currplayer: (currplayer=='X' ? 'O' : 'X')})
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  