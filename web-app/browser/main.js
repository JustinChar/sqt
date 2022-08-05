import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;

let game = Tetris.new_game();

let nextDome = document.querySelector('.next .cntent')
let holdDome = document.querySelector('.hold .cntent')
console.log(holdDome)
document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);

const grid = document.getElementById("grid");

const range = (n) => Array.from({ "length": n }, (ignore, k) => k);

const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";

    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});

const update_grid = function () {
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
        });
    });

    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell current ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );
    renderElementUi(game)
};

// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        game = Tetris.soft_drop(game);
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
    }
    if (event.key === 'c') {
        game = Tetris.hold(game);

    }
    update_grid();
};

const timer_function = function () {
    game = Tetris.next_turn(game);
   

    update_grid();
    setTimeout(timer_function, 500);
};

setTimeout(timer_function, 500);

update_grid();
// 获取元素对象

// 设置渲染函数
function renderElementUi(game) {
    let next = game.next_tetromino.grid
    let hold = game.held_tetromino?.grid;
    if (next) {
        let arr = []
        arr.push([0, 0, 0, 0, 0, 0])
        nextDome.innerHTML = ``
        for (let pop of next) {
            pop = [...pop]
            pop.unshift(0)
            if (pop.length < 6) {
                for (let i = pop.length; i < 6; i++) {
                    pop.push(0)
                }
            }
            arr.push(pop)
        }
        if (arr.length < 7) {
            arr.push([0, 0, 0, 0, 0, 0])
        }
        for (let pop of arr) {
            let row = document.createElement('div')
            row.className = 'row'
            for (let pops of pop) {
                let cell = document.createElement('div')
                cell.className = `cell ${pops && pops !== ' ' ? game.next_tetromino.block_type : ''}`
                row.appendChild(cell)
            }
            nextDome.appendChild(row)
        }
    }
    if (hold) {
        let arr = []
        arr.push([0, 0, 0, 0, 0, 0])
        holdDome.innerHTML = ``
        for (let pop of hold) {
            pop = [...pop]
            pop.unshift(0)
            if (pop.length < 6) {
                for (let i = pop.length; i < 6; i++) {
                    pop.push(0)
                }
            }
            arr.push(pop)
        }
        if (arr.length < 7) {
            arr.push([0, 0, 0, 0, 0, 0])
        }
        for (let pop of arr) {
            let row = document.createElement('div')
            row.className = 'row'
            for (let pops of pop) {
                let cell = document.createElement('div')
                cell.className = `cell ${pops && pops !== ' ' ? game.held_tetromino.block_type : ''}`
                row.appendChild(cell)
            }
            holdDome.appendChild(row)
        }
    }
}
