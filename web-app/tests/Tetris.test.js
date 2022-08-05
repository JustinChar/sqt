import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = initial_game.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_game = Tetris.hold(
                Tetris.hard_drop(
                    Tetris.hold(initial_game)
                )
            );
            const final_piece = final_game.current_tetromino;
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(`Retention cannot be performed twice in a row`, function () {
        let initial_game = Tetris.new_game()
        initial_game = Tetris.hold(initial_game);
        let held_tetromino = JSON.stringify(initial_game.held_tetromino);
        initial_game = Tetris.hold(initial_game);
        let held_tetromino1 = JSON.stringify(initial_game.held_tetromino);
        if (!R.equals(held_tetromino1, held_tetromino)) {
            throw new Error(
                `The inital and final tetrominos do not match
                Initial: ${JSON.stringify(initial_piece)}
                Final:   ${JSON.stringify(final_piece)}`
            );
        }
    }
    );

    it(
        `If there is no reservation, execute the reservation and deploy the next quadruple deck`,
        function () {
            let tinitial_game = Tetris.new_game()
            let tnext_tetrominos = JSON.stringify(tinitial_game.next_tetromino);
            tinitial_game.can_hold = '';
            tinitial_game = Tetris.hold(tinitial_game);
            let theld_tetrominos = JSON.stringify(tinitial_game.current_tetromino);
            console.log(theld_tetrominos,tnext_tetrominos)
            if (theld_tetrominos !== tnext_tetrominos) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(theld_tetrominos)}
                    Final:   ${JSON.stringify(tnext_tetrominos)}`
                );
            }
        }
    );
});
