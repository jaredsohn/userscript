// ==UserScript==
// @name        SETboy
// @namespace   crs.upd.edu.ph/set_answer/
// @include     http://crs.upd.edu.ph/set_answer/part1/*/*
// @include     https://crs.upd.edu.ph/set_answer/part1/*/*
// @version     1.0
// @grant       GM_registerMenuCommand
// @description Automated UP SET Answerer
// ==/UserScript==

//0 = 1 2 3 4 5 NA
//1 = 0 1 2-3 4-5 6 NA
//2 = 1.0 1.25 1.5 ...
//3 = SA A D SD NA
//6 = Very Much, Much, Some, Very Little,...
//7 = The Best, Among the best, ...
//8 = Yes No
//9 = course rate
//10 = Ignored
//11 = dismiss
//12 = return paper
//13 = fairness

//array describing what kind of question "question_x" is...
var questionType = new Array(
    0, 0, 0, 0, 0, 0, //part 1
    1, 1, 
    2,
    3, 3, 3, 3, 3, 3, 3, //part 2
    8, 8, 10, 10, 9,
    6, 6, 
    10, 10,
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, //part3
    1, 1, 
    11, 10, 12, 13, 10,
    7,
    10 //part 4
);

//array describing whether giving a higher score on this question 
//implies a negative feedback on the prof.
var negativeQuestion = new Array(
    false, false, false, false, false, false, //part 1
    false, false, 
    false, 
    false, false, false, false, false, false, false, //part 2
    false, true, false, false, false, 
    false, false, 
    false, false, 
    false, true, false, false, false, false, true, false, false, true, false, false, false, false, false, false, true, false, true, false, false, false, true, false, true, false, //part 3
    false, false, 
    false, false, false, false, false,
    false,
    false //part 4
);

GM_registerMenuCommand("All Random", allRand, "r");
GM_registerMenuCommand("Awesome", awesome, "a");
GM_registerMenuCommand("Meh", meh, "m");
GM_registerMenuCommand("Screw this", screw, "s");
//execute(0);

//functions

function allRand() {
    execute(0);
}   

function awesome() {
    execute(1);
}

function meh() {
    execute(2);  
}

function screw() {
    execute(3);
}

function execute(rating) {
    var i;
    
    
    for(i = 0; i < questionType.length; i++) {
        if(questionType[i] != 10) {
            setRadioButton(i, evaluateQuestion(i, rating));
        }
    }
}

//0 = random
//1 = cool
//2 = meh
//3 = bad
function evaluateQuestion(question, rating) {
    switch(questionType[question]) {
        //different algorithm for each question type
        //also takes into account negative questions
        case 0:
            return type0(question, rating);
        case 1:
            return type1(question, rating);
        case 2:
            return type2(question, rating);
        case 3:
            return type3(question, rating);
        case 4:
            return type4(question, rating);
        case 5:
            return type5(question, rating);
        case 6:
            return type6(question, rating);
        case 7:
            return type7(question, rating);
        case 8:
            return type8(question, rating);
        case 9:
            return type9(question, rating);
        case 11:
            return type11(question, rating);
        case 12:
            return type12(question, rating);
        case 13:
            return type13(question, rating);
    }
}

function type0(question, rating) {
    //1 2 3 4 5 NA
    
    switch(rating) {
        case 0:
            return Math.floor(Math.random() * 4.99);
        case 1:
            return negativeQuestion[question] ? 4 : 0;
        case 2:
            return 2;
        case 3:
            return negativeQuestion[question] ? 0 : 4;
    }
}

function type1(question, rating) {
    //1 = 0 1 2-3 4-5 6 NA
    
    return type0(question, rating);
}

function type2(question, rating) {
    //2 = 1.0 1.25 1.5 ...
    
    switch(rating) {
        case 0:
            return Math.floor(Math.random() * 11.99);
        case 1:
            return negativeQuestion[question] ? 10 : 0;
        case 2:
            return 4;
        case 3:
            return negativeQuestion[question] ? 0 : 10;
    }
}

function type3(question, rating) {
    //3 = SA A D SD NA
    
    switch(rating) {
        case 0:
            return Math.floor(Math.random() * 3.99);
        case 1:
            return negativeQuestion[question] ? 3 : 0;
        case 2:
            return Math.floor(1 + Math.random() * 1.99);
        case 3:
            return negativeQuestion[question] ? 0 : 3;
    }
}

function type4(question, rating) {
    //4 = lol, fail
    
    return type1(question, rating);
}

function type5(question, rating) {
    //5 = lol, fail
    
    return type1(question, rating);
}

function type6(question, rating) {
    //6 = Very Much, Much, Some, Very Little,...
    
    return type0(question, rating);
}

function type7(question, rating) {
    //7 = The Best, Among the best, ...
    
    return type0(question, rating);
}

function type8(question, rating) {
    //8 = Yes No
    
    switch(rating) {
        case 0:
            return Math.floor(Math.random() * 1.99);
        case 1:
            return negativeQuestion[question] ? 1 : 0;
        case 2:
            return 1;
        case 3:
            return negativeQuestion[question] ? 0 : 1;
    }
}

function type9(question, rating) {
    switch(rating) {
        case 0:
            return Math.floor(Math.random() * 4.99);
        case 1:
            return negativeQuestion[question] ? Math.floor(Math.random() * 1.99) * 4 : 2;
        case 2:
            return 2;
        case 3:
            return negativeQuestion[question] ? 2 : Math.floor(Math.random() * 1.99) * 4;
    }
}

function type11(question, rating) {
    switch(rating) {
        case 0:
            return Math.floor(Math.random() * 3.99);
        case 1:
            return negativeQuestion[question] ? 3 : 1;
        case 2:
            return 1 + Math.floor(Math.random() * 1.99);
        case 3:
            return negativeQuestion[question] ? 1 : 3;
    }
}

function type12(question, rating) {
    //1 = 0 1 2-3 4-5 6 NA
    
    return type1(question, rating);
}

function type13(question, rating) {
    //1 = 0 1 2-3 4-5 6 NA
    
    return type1(question, rating);
}

function isRadioButton(elm) {
    return (elm.tagName.toUpperCase()=="INPUT" && elm.type=="radio"); 
}

function setRadioButton(question, button) {
    var radio = null;
    var tq = question + 1;
    
    do {
        radio = document.evaluate(
            "//input[@type='radio' and @name='question_" + tq + "']", 
            document.getElementById('rightcolumn'), null, 
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
        );
        tq++;
    } while (radio.snapshotLength == 0 || tq > 5000); //work around for question 408
    
    var i;
    for(i = 0; i < radio.snapshotLength; i++) {
        var elm = radio.snapshotItem(i);
        
        if (i == button) {
            elm.checked = true;
            elm.click();
        }
    }
}