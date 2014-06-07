// ==UserScript==
// @name          SxS comment helper
// @description   Helps with SxS utility tasks 
// @include     	https://www.raterhub.com/evaluation/rater/task/*
//@include      	http://www.raterhub.com/evaluation/rater/task/*
// ==/UserScript==


window.onload = function () {
    var glob_chkBoxes = {
        good: {},
        best: {},
        "404": {},
        porn: {},
        foreignlanguage: {},
        didntload: {}
    };
    var glob_node = document.getElementById("left.result.0");
    var glob_flipLR = (glob_node.id.trim())[0].toUpperCase() !== (glob_node.childNodes[1].innerHTML.trim())[0].toUpperCase();
    var glob_saveUserComment = '';
    //var glob_pqThumbSlider = [];
    var glob_thumbSliders = [];
    var glob_pqThumbSliders = [];
    var glob_thumbSlidersDupes = {};
    var glob_porn = [];
    var thumbSlider = document.getElementsByClassName('ewokui-slider-thumb');
    var pqThumbSlider = document.getElementsByClassName('ewokui-pqslider-thumb');
    var comment = document.getElementById("comment");
    if (/sxs/i.test(document.title) && !/YouTube BU Instructions/ig.test(document.body.innerHTML)) {
        var task = (document.getElementsByClassName("ewok-task-query")[0]) ? document.getElementsByClassName("ewok-task-query") : (document.getElementsByClassName("query-info-query")[0]) ? document.getElementsByClassName("query-info-query") : false;
        var doKnowGo = [
            ["Action", "do", "What do they want to do?"],
            ["Information", "know", "Wants to find info. about?"],
            ["Navigation", "go", "What url do they want?"]
        ];
        var radioButtons = document.getElementsByClassName('ewok-scores-score');
        var resultFlags = document.getElementsByClassName('result-flags');
        // Add event listener to thumb sliders
        try {
            for (var i = 0; thumbSlider[i]; i++) {
                var temp = thumbSlider[i].parentElement.id.match(/([l|r])\w*\.\w*\.(\d*)\./i);
                if (glob_flipLR) {
                    switch (temp[1].toUpperCase()) {
                        case "L":
                            temp[1] = "R";
                            break;
                        case "R":
                            temp[1] = "L";
                    }
                } else {
                    temp[1] = temp[1].toUpperCase();
                }
                temp = temp[1] + (parseInt(temp[2]) + 1);
                glob_thumbSliders.push([thumbSlider[i], temp]);
                glob_thumbSlidersDupes[temp] = thumbSlider[i];
                thumbSlider[i].setAttribute("thisis", temp);
                thumbSlider[i].parentNode.setAttribute("thisis", temp);
                thumbSlider[i].addEventListener('mouseup', function () {
                    makeComment();
                });
                thumbSlider[i].parentNode.addEventListener('mouseup', function () {
                    setTimeout(function () {
                        makeComment();
                    }, 300);
                });
                try {
                    glob_pqThumbSliders.push([pqThumbSlider[i], temp]);
                    pqThumbSlider[i].setAttribute("thisis", temp);
                    pqThumbSlider[i].parentNode.setAttribute("thisis", temp);
                    pqThumbSlider[i].addEventListener('mouseup', function () {
                        makeComment();
                    });
                    pqThumbSlider[i].parentNode.addEventListener('mouseup', function () {
                        setTimeout(function () {
                            makeComment();
                        }, 300);
                    });
                } catch (e) {
                    //do nothing.
                }
            }
        } catch (e) {
            //do nothing
        }
        //  Add event listener to radio buttons.
        for (var i = 0; radioButtons[i]; i++) {
            radioButtons[i].addEventListener('mousedown', function () {
                makeComment(this.className.match(/\d/)[0]);
            });
            if (i > 6) {
                radioButtons[i].childNodes[0].addEventListener('change', function () {
                    makeComment();
                    evt.preventDefault();
                });
            }
        }

        function defaultCheckBoxesAddEventList(arg1_type, arg2_rL) {
            if (this.nextSibling == undefined) {
                return;
            };
            glob_porn.push([this, arg1_type, arg2_rL]);
            glob_chkBoxes[arg1_type][arg2_rL] = this;
            this.nextSibling.nextSibling.addEventListener('mouseup', function () {
                var lR = this.parentNode.id.match(/^([lr])\w*\.\w*\.(\d*)/i);
                if (glob_flipLR) {
                    if (lR[1].toUpperCase() == "R") {
                        lR = "L" + parseInt(lR[2]) + 1;
                    } else {
                        lR = "R" + parseInt(lR[2]) + 1;
                    }
                } else {
                    lR = lR[1].toUpperCase() + parseInt(lR[2]) + 1;
                }
                setTimeout(function () {
                    makeComment()
                }, 300);
                var parentId = this.parentNode.id.match(/\w*$/)[0];
                var checked = this.parentNode.childNodes[1].checked;
                for (var n = this.parentNode.parentNode.parentNode.nextSibling; n = n.nextSibling;) {
                    if (/dupeMessage/ig.test(n.id)) {
                        var matches = n.innerHTML.match(/dupe.*/i)[0].match(/([rl]\d*)/ig);
                        if (matches == null) {
                            break;
                        }
                        for (var i = 0, len = matches.length; i < len; i++) {
                            //glob_chkBoxes[name][matches[i]].checked = checked;
                            var temp = glob_chkBoxes[parentId][matches[i]].nextSibling.nextSibling.childNodes[0]; //.className.replace(/off/ig, "on");
                            if (glob_chkBoxes[parentId][matches[i]].checked === checked) {
                                temp.click();
                            }
                        }
                    }
                }
            });
        }
        for (var i = 0, len = thumbSlider.length; i < len; i++) {
            var t = i.toString();
            var p = i + 1;
            defaultCheckBoxesAddEventList.call(document.getElementsByName('left.result.' + t + '.porn')[0], "porn", (glob_flipLR) ? "R" + p : "L" + p);
            defaultCheckBoxesAddEventList.call(document.getElementsByName('right.result.' + t + '.porn')[0], "porn", (glob_flipLR) ? "L" + p : "R" + p);
            defaultCheckBoxesAddEventList.call(document.getElementsByName('left.result.' + t + '.foreignlanguage')[0], "foreignlanguage", (glob_flipLR) ? "R" + p : "L" + p);
            defaultCheckBoxesAddEventList.call(document.getElementsByName('right.result.' + t + '.foreignlanguage')[0], "foreignlanguage", (glob_flipLR) ? "L" + p : "R" + p);
            defaultCheckBoxesAddEventList.call(document.getElementsByName('left.result.' + t + '.didntload')[0], "didntload", (glob_flipLR) ? "R" + p : "L" + p);
            defaultCheckBoxesAddEventList.call(document.getElementsByName('right.result.' + t + '.didntload')[0], "didntload", (glob_flipLR) ? "L" + p : "R" + p);
        }
        //  Checkbox constructor

        function NewCheckBox(arg1_id, arg2_num, arg3_value, arg4_title) {
            this.checkBox = document.createElement('input');
            this.checkBox.type = "checkbox";
            this.checkBox.id = arg1_id + "ResultsChkBx" + arg2_num;
            this.checkBox.title = arg4_title;
            this.checkBox.value = arg3_value;
            glob_chkBoxes[arg1_id][this.checkBox.value] = this.checkBox;
            glob_porn.push([this.checkBox, arg1_id, this.checkBox.value]);
            this.label = document.createElement('label');
            this.label.setAttribute("for", arg1_id + "ResultsChkBx" + arg2_num);
            this.label.title = arg4_title;
            this.label.innerHTML = arg4_title[0];
            resultFlags[arg2_num].childNodes[1].appendChild(this.checkBox);
            resultFlags[arg2_num].childNodes[1].appendChild(this.label);
            this.checkBox.addEventListener('change', function () {
                var title = this.title.toLowerCase();
                var checked = this.checked;
                if (title == 'best') {
                    glob_chkBoxes.good[this.value].checked = false;
                    glob_chkBoxes.good[this.value].disabled = checked;
                }
                for (var n = this.parentNode.parentNode.nextSibling; n = n.nextSibling;) {
                    if (/dupeMessage/ig.test(n.id)) {
                        var matches = n.innerHTML.match(/([rl]\d*)/ig);
                        if (matches == null) {
                            break;
                        }
                        for (var i = 0; i < matches.length; i++) {
                            glob_chkBoxes[title][matches[i]].checked = checked;
                            if (title == 'best') {
                                glob_chkBoxes.good[matches[i]].checked = false;
                                glob_chkBoxes.good[matches[i]].disabled = checked;
                            }
                        }
                    }
                }
                makeComment();
            });
        }
        //  Create good/best/404 results checkboxes and add event listenter.
        for (var i = 0; resultFlags[i]; i++) {
            var parseParentId = resultFlags[i].parentNode.id.match(/([lr]+)\w*\.\w*\.(\d+)/i); //parentNode.childNodes[1].innerHTML.match(/[lr]\d+/i);    //id.match(/([lr]).*\..*\.(\d+)/i);
            if (glob_flipLR) {
                switch (parseParentId[1].toUpperCase()) {
                    case "L":
                        parseParentId[1] = "R";
                        break;
                    case "R":
                        parseParentId[1] = "L";
                }
            }
            var value = parseParentId[1].toUpperCase() + (parseInt(parseParentId[2]) + 1);
            (new NewCheckBox("good", i, value, "Good"));
            (new NewCheckBox("best", i, value, "Best"));
            (new NewCheckBox("404", i, value, "404")).label.innerHTML = "404";
        }
        //  Create checkbox\text box for "do know go" to the right of the search term.
        for (var i = 0; i < 3; i++) {
            var label = document.createElement('label');
            label.innerHTML = " " + doKnowGo[i][0] + "(<i>" + doKnowGo[i][1] + "</i>)";
            label.setAttribute("for", doKnowGo[i][1]);
            label.style.color = "grey";
            var checkBox = document.createElement('input');
            checkBox.type = "checkbox";
            checkBox.id = doKnowGo[i][1];
            checkBox.value = doKnowGo[i][1];
            task[0].appendChild(label);
            task[0].appendChild(checkBox);
            var text = document.createElement('input');
            text.type = text;
            text.size = "20";
            text.id = doKnowGo[i][1] + "Text";
            text.placeholder = doKnowGo[i][2];
            text.disabled = true;
            task[0].appendChild(text);
            text.addEventListener('blur', function () {
                makeComment();
            });
            checkBox.addEventListener('change', function () {
                var textBox = document.getElementById(this.id + "Text");
                if (this.checked === false) {
                    textBox.disabled = true;
                } else {
                    textBox.disabled = false;
                }
                makeComment();
            });
        }
        document.getElementById('ewok-task-submit-button').addEventListener('mouseover', function () {
            this.disabled = true;
            var comment = document.getElementById("comment");
            glob_saveUserComment = comment.value;
            comment.value = comment.value.replace(/\§/, '');
            this.disabled = false;
        });
        document.getElementById('ewok-task-submit-button').addEventListener('mouseout', function () {
            document.getElementById("comment").value = glob_saveUserComment;
        });
        document.getElementById('ewok-task-submit-done-button').addEventListener('mouseover', function () {
            this.disabled = true;
            var comment = document.getElementById("comment");
            glob_saveUserComment = comment.value;
            comment.value = comment.value.replace(/\§/, '');
            this.disabled = false;
        });
        document.getElementById('ewok-task-submit-done-button').addEventListener('mouseout', function () {
            document.getElementById("comment").value = glob_saveUserComment;
        });
    }
    makeComment = function (arg1_num) {
        var comment = document.getElementById("comment");
        var radioButtons = document.getElementsByClassName('ewok-scores-score');
        var userInput;
        var sideIsBetter = '';
        var queryIntent = [];
        var userWantsTo = [];
        var isAV = [];
        var isOT = [];
        var isLow = [];
        var isLowest = [];
        var goodResults = [];
        var bestResults = [];
        var fourOFourResults = [];
        var porn = [];
        var didntLoad = [];
        var foreignLanguage = [];
        if (document.getElementById("do").checked) {
            queryIntent.push("Action");
        }
        if (document.getElementById("go").checked) {
            queryIntent.push("Navigation");
        }
        if (document.getElementById("know").checked) {
            queryIntent.push("Information");
        }
        if (queryIntent.length != 0) {
            queryIntent = queryIntent.join(" or ") + " query. ";
            if (document.getElementById("do").checked && document.getElementById("doText").value != '') {
                userWantsTo.push((document.getElementById("doText").value.replace(/\§/, "")).trim());
            }
            if (document.getElementById("know").checked && document.getElementById("knowText").value != '') {
                userWantsTo.push("find info. about " + (document.getElementById("knowText").value.replace(/\§/, "")).trim());
            }
            if (document.getElementById("go").checked && document.getElementById("goText").value != '') {
                userWantsTo.push('navigate to ' + (document.getElementById("goText").value.replace(/\§/, "")).trim());
            }
            if (userWantsTo.length != 0) {
                userWantsTo = "The user wants to " + userWantsTo.join(" or ") + ". ";
            }
        }
        if (comment.value != "") {
            try {
                userInput = comment.value.match(/\§([\s\S\w\W]*)/i)[1];
            } catch (e) {
                alert(" \n The comment needs this symbol " + String.fromCharCode(167) + " to be located before the text that you type. \n " + "Any text to the right of the symbol won't get changed, text to the left of the symbol is generated by the script. \n " + "Please copy (Ctrl-c) and paste (Ctrl-v) that symbol into the comment to the left of anything you have typed. Or just paste " + "it to the end. Or delete all the comments from the box. Muchos Gracias (Remember to delete that symbol before you send in the task!)");
                return;
            }
        } else {
            userInput = "";
        }
        for (var l = 0, len = glob_thumbSliders.length; l < len; l++) {
            //console.log(glob_thumbSliders[l][0].style.left)
            if (glob_thumbSliders[l][0].style.left == "290px") {
                isAV.push(glob_thumbSliders[l][1]);
            } else if (glob_thumbSliders[l][0].style.left == "58px") {
                isOT.push(glob_thumbSliders[l][1]);
            }
        }
        try {
            for (var l = 0, len = glob_pqThumbSliders.length; l < len; l++) {
                var temp = glob_pqThumbSliders[l][0].style.left.replace(/px/, '');
                if (temp <= 76 && temp >= 38) {
                    isLowest.push(glob_pqThumbSliders[l][1]);
                }
            }
        } catch (e) {}
        if (isAV.length != 0) {
            var isAre = (isAV.length > 1) ? 'are' : 'is';
            isAV = isAV.join() + " " + isAre + " AV. "
        }
        if (isOT.length != 0) {
            var isAre = (isOT.length > 1) ? 'are' : 'is';
            isOT = isOT.join() + " " + isAre + " OT. ";
        }
        if (isLowest.length != 0) {
            var isAre = (isLowest.length > 1) ? 'are' : 'is';
            isLowest = isLowest.join() + " " + isAre + " low or lowest quality. "
        }
        if (!arg1_num) {
            for (var l = 7; radioButtons[l]; l++) {
                var node = radioButtons[l].childNodes[0];
                var temp = (/much/i.test(node.value)) ? "better or much better" : (/slightly/i.test(node.value)) ? "slightly better or better" : "better";
                if (node.checked) {
                    if (l < 10) {
                        sideIsBetter = "The Left side is " + temp + " because ";
                    } else if (l == 10) {
                        sideIsBetter = "Both sides are the same or about the same. ";
                    } else if (l > 10) {
                        sideIsBetter = "The Right side is " + temp + " because ";
                    }
                }
            }
        } else {
            // This is a hack job or work around for the "which side is better" table cell issue.
            switch (parseInt(arg1_num)) {
                case 0:
                    sideIsBetter = "The Left side is better or much better because ";
                    break;
                case 1:
                    sideIsBetter = "The Left side is better because ";
                    break;
                case 2:
                    sideIsBetter = "The Left side is slightly better or better because ";
                    break;
                case 3:
                    sideIsBetter = "Both sides are the same or about the same. ";
                    break;
                case 4:
                    sideIsBetter = "The Right side is slightly better or better because ";
                    break;
                case 5:
                    sideIsBetter = "The Right side is better because ";
                    break;
                case 6:
                    sideIsBetter = "The Right side is better or much better because  ";
            }
        }
        for (i = 0, v = glob_porn.length; i < v; i++) {
            if (glob_porn[i][0].checked === true) {
                switch (glob_porn[i][1]) {
                    case "porn":
                        porn.push(glob_porn[i][2]);
                        break;
                    case "didntload":
                        didntLoad.push(glob_porn[i][2]);
                        break;
                    case "foreignlanguage":
                        foreignLanguage.push(glob_porn[i][2]);
                        break;
                    case "best":
                        bestResults.push(glob_porn[i][2]);
                        break;
                    case "good":
                        goodResults.push(glob_porn[i][2]);
                        break;
                    case "404":
                        fourOFourResults.push(glob_porn[i][2]);
                }
            }
        }
        if (porn.length != 0) {
            var s = (porn.length > 1) ? 's' : '';
            var isAre = (porn.length > 1) ? 'are' : 'is';
            porn = porn.join(",") + " " + isAre + " porn. ";
        }
        if (foreignLanguage.length != 0) {
            var s = (foreignLanguage.length > 1) ? 's' : '';
            var isAre = (foreignLanguage.length > 1) ? 'are' : 'is';
            foreignLanguage = foreignLanguage.join(",") + " " + isAre + " foreign language. ";
        }
        if (didntLoad.length != 0) {
            var s = (didntLoad.length > 1) ? 's' : '';
            var isAre = (didntLoad.length > 1) ? 'are' : 'is';
            didntLoad = didntLoad.join(",") + " did not load. ";
        }
        if (goodResults.length != 0) {
            var s = (goodResults.length > 1) ? 's' : '';
            var isAre = (goodResults.length > 1) ? 'are' : 'is';
            goodResults = goodResults.join(",") + " " + isAre + " good or really good. "
        }
        if (bestResults.length != 0) {
            var s = (bestResults.length > 1) ? 's' : '';
            var isAre = (bestResults.length > 1) ? 'are' : 'is';
            bestResults = bestResults.join(",") + " " + isAre + " the best result" + s + ". "
        }
        if (fourOFourResults.length != 0) {
            var s = (fourOFourResults.length > 1) ? 's' : '';
            var isAre = (fourOFourResults.length > 1) ? 'are' : 'is';
            fourOFourResults = fourOFourResults.join(",") + " returned a 404 error. "
        }
        comment.value = queryIntent + userWantsTo + porn + isAV + isOT + isLowest + bestResults + goodResults + fourOFourResults + didntLoad + foreignLanguage + sideIsBetter + String.fromCharCode(167) + userInput;
    }
}