const pl = require("tau-prolog");
const session = pl.create(1000);
// const show = x => {
//     let a = ;
// };

// Get Node.js argument: node ./script.js item
const item = process.argv[2];

// Program and goal
const program = "illness('cold', true, true, false, true, false, false, false).\n" +
    "illness('flu', true, true, true, true, true, true, false).\n" +
    "illness('angina', true, false, true, false, false, true, false).\n" +
    "illness('coronavirus', true, true, true, true, true, true, true).";

const goal = `
    illness(X, true, true, true, true, true, true, false).
`;

// Consult program, query goal, and show answers
async function test () {
    let answer = false;

    await session.consult(program, {
        success: function() {
            session.query(goal, {
                success: function() {
                    session.answers(x => console.log(session.format_answer(x)));
                }
            })
        }
    });
}

test()