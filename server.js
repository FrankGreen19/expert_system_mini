const express = require("express");
const app = express();
const getDiagnosis = require("./medSystem");

app.set("view engine", "ejs");

const illnesses = [];
illnesses['cold'] = 'простуда';
illnesses['flu'] = 'грипп';
illnesses['angina'] = 'ангина';
illnesses['coronavirus'] = 'коронавирус';
illnesses['good'] = 'все хорошо, вы здоровы!';

const urlencodedParser = express.urlencoded({extended: false});

app.get("/", async function(request, response){
    if (request.query.diagnosis) {
        response.render("index", {
            diagnosis: request.query.diagnosis
        });
    } else {
        response.render("index", {
            diagnosis: ''
        });
    }
});

app.post("/check", urlencodedParser, async function(request, response){
    if (request.body) {
        let diagnosis = await getDiagnosis(request.body);
        if (diagnosis.length > 0) {
            diagnosis = illnesses[diagnosis];
        } else {
            diagnosis = 'не удалось определить диагноз, попробуйте еще раз!'
        }

        response.redirect('/?diagnosis=' + diagnosis)
    } else {
        response.redirect('/?diagnosis=' + 'вы не заполнили поля!')
    }
});

app.listen(3000);