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
        let held_tetromino = R.clone(initial_game.held_tetromino);
        initial_game = Tetris.hold(initial_game);
        let held_tetromino1 = R.clone(initial_game.held_tetromino);
        // let flg = R.equals(held_tetromino1.block_type, held_tetromino.block_type)
        if (R.equals(held_tetromino1.block_type, held_tetromino.block_type)) {
            throw new Error(
                `The inital and final tetrominos do not match
                Initial: ${JSON.stringify(held_tetromino1)}
                Final:   ${JSON.stringify(held_tetromino)}`
            );
        }
    }
    );

    it(
        `If there is no reservation, execute the reservation and deploy the next quadruple deck`,
        function () {
            let tinitial_game = Tetris.new_game()
            let tnext_tetrominos = R.clone(tinitial_game.next_tetromino);
            tinitial_game.can_hold = '';
            tinitial_game = Tetris.hold(tinitial_game);
            let theld_tetrominos = R.clone(tinitial_game.current_tetromino);
            if (!R.equals(theld_tetrominos.block_type, tnext_tetrominos.block_type)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(theld_tetrominos)}
                    Final:   ${JSON.stringify(tnext_tetrominos)}`
                );
            }
        }
    );
});
