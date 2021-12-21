const pl = require("tau-prolog");
require("tau-prolog/modules/promises.js")(pl);

let getDiagnosis = (async (symptoms) => {

    let answers = [];

    // illness(название, температура, кашель, горло, насморк, озноб, боль в мышцах, потеря вкусов и обоняния)

    const program = "illness('good', false, false, false, false, false, false, false).\n" +
        "illness('cold', true, true, false, false, false, true, false).\n" +
        "illness('cold', true, false, true, false, false, false, false).\n" +
        "illness('cold', true, false, false, true, true, false, false).\n" +
        "illness('flu', true, true, true, true, true, true, false).\n" +
        "illness('flu', true, false, true, true, true, true, false).\n" +
        "illness('angina', true, false, true, true, false, true, false).\n" +
        "illness('angina', true, false, true, false, false, true, false).\n" +
        "illness('coronavirus', false, false, true, false, false, true, false).\n" +
        "illness('coronavirus', true, true, true, true, true, true, true).";

    const goal = `illness(X, ${Boolean(symptoms.temp)}, 
        ${Boolean(symptoms.cough)}, 
        ${Boolean(symptoms.throat)}, 
        ${Boolean(symptoms.nose)}, 
        ${Boolean(symptoms.chills)}, 
        ${Boolean(symptoms.muscle)}, 
        ${Boolean(symptoms.taste)}
    ).`;

    const session = pl.create();
    await session.promiseConsult(program);
    await session.promiseQuery(goal);

    for await (let answer of session.promiseAnswers()) {
        if (answer.links.X.id === undefined) {
            answers.push('не удалось определить ваш диагноз, попробуйте еще раз')
        } else {
            answers.push(answer.links.X.id)
        }
    }

    return answers;
});

module.exports = getDiagnosis;