import React from 'react';

class Visualize extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.font = '16px Comic Sans Mr';
        ctx.fillStyle = 'black';

        for (let i = 0; i < this.props.grid.length; i++) {
            if (i !== 0) {
                ctx.fillText("Samm " + i, 17, i * 30 + 20)
            }
            if (this.props.grid[i][0] === '!') {
                ctx.beginPath();
                ctx.rect(80, i * 30, 1000, 25);
                ctx.stroke();
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.fillText('Uus fail ei mahu mällu', 500, i * 30 + 17);
                break;
            }
            for (let j = 0; j < this.props.grid[i].length; j++) {
                ctx.beginPath();
                ctx.rect(j * 20 + 80, i * 30, 20, 25);
                ctx.stroke();
                if (this.props.grid[i][j] !== ' ') {
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(j * 20 + 81, i * 30 + 1, 18, 23);
                    ctx.fillStyle = 'black';
                    ctx.fillText(this.props.grid[i][j], j * 20 + 84, i * 30 + 18);
                }
            }
        }
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} width={1500} height={340}></canvas>
            </div>
        )
    }
}

export default Visualize;