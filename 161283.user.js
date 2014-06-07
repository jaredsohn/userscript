// ==UserScript==
// @name        MyLearningAutoLearn
// @summary     Learns mylearning learning content for you
// @namespace   404
// @include     https://mylearning-*.plateau.com/plateau/user/exam/*
// @version     4
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_openInTab
// @updateURL       http://userscripts.org/scripts/source/161283.meta.js
// @downloadURL     http://userscripts.org/scripts/source/161283.user.js
// ==/UserScript==

function delayAmount() { return 4000 + Math.floor(Math.random()*4000); }

var rightAnswers = GM_getValue("rightAnswers", 0);
var allAnswers = GM_getValue("allAnswers", 0)

var cbs = [];
var progress;
var questionText;
var titleVar = getCourseVar();
var answerDB = deserialize(titleVar, {});
try {
    var title = document.getElementsByClassName('SectionTitle')[0];

	questionText = document.getElementById('questionElement0').getElementsByTagName('td')[0].textContent;


	progress = title.textContent.match(/Question\s+(\d+)\s+of\s+(\d+)/);
	var answered = allAnswers + '/' + progress[2];
	var accuracy = rightAnswers + '/' + allAnswers + ' ' + (rightAnswers*100/allAnswers)+'%';
	var knownAnswers = Object.keys(answerDB).length;
	var knownProgress = knownAnswers + '/' + progress[2];
	title.innerHTML += '<table><tr><th>Answered:</th><td><progress max="' + progress[2] + '" value="' + allAnswers + '"> ' + answered + '</progress></td><td>' + answered+ '</td></tr>' +
		'<tr><th>Accuracy</th><td><meter min="0" max="' + allAnswers + '" value="' + rightAnswers + '">' + accuracy +'</meter></td><td>' + accuracy + '</td></tr>' +
		'<tr><th>Knowledge in DB</th><td><meter min="0" max="' + progress[2] + '" value="' + knownAnswers + '">' + knownProgress + '</meter></td><td>' + knownProgress + '</td></tr>' +
		'</table>';

	

} catch(e) { /* just shut up */ }

String.prototype.endsWith = function(suffix) {
	return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function deserialize(name, def) {
	return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

function saveProgress() {
	GM_setValue("allAnswers", allAnswers); GM_setValue("rightAnswers", rightAnswers);
}
function resetProgress() {
	rightAnswers = 0;
	allAnswers = 0;
	saveProgress();
}

function getRightAnswerImgs() {
	var resRight = [], resNotWrong = []
		var imgs = document.getElementsByTagName('img');
	var type2 = false;
	var isWrong = false, isWrong2 = false;
	for (var i = 0; i < imgs.length; i++) {
		if (imgs[i].getAttribute("src").endsWith("_rightanswer.gif")) {
			resRight.push(imgs[i]);
		}
		if (imgs[i].getAttribute("src").endsWith("_wronganswer.gif")) {
			type2 = true;
		}
		if (imgs[i].getAttribute("src").endsWith("_on_wronganswer.gif") ||
			imgs[i].getAttribute("src").endsWith("_off_rightanswer.gif")) {
			isWrong = true;
		}
		if (imgs[i].getAttribute("src").endsWith("_off.gif")) {
			isWrong2 = true;
		}
		if (imgs[i].getAttribute("src").endsWith("_on.gif") || imgs[i].getAttribute("src").endsWith("_off.gif")) {
			resNotWrong.push(imgs[i]);
		}
	}
	return [resRight.length ? resRight : (type2 ? resNotWrong : []), type2 ? !(isWrong || isWrong2) : !isWrong];
}

function learn() {
	var hasEnoughRightAnswers = progress[2] * 0.8 <= rightAnswers;
	var rightAnswerKnown = questionText in answerDB;
	if(hasEnoughRightAnswers) {
		console.log("We have enough good answers " + progress[2] + " questions, " + rightAnswers + "answers");
	}
	if(rightAnswerKnown) {
		console.log("Answer \"" + questionText + " \"found. Has " + Object.keys(answerDB).length + " answers in db");
	}
	if((hasEnoughRightAnswers && Math.random() < 0.5) || !rightAnswerKnown) {
		unsafeWindow.toggleDistractorOption(0);
	} else {
		answerDB[questionText].forEach(function(ans) {
				var tds = document.getElementsByTagName('td');
				for(j=0; j< tds.length; j++) {
				var td = tds[j];
				if(td.textContent == ans) {
				td.click();
				}
				}
				});
	}
	cbs.push(setTimeout(function() { unsafeWindow.gradeQuestion() }, delayAmount()));
}
function keypress(event) {
	if (event.which == 13 && event.ctrlKey) {
		if(GM_getValue('autolearn', false)) return;
		alert("Watch, and learn the answers :)");
		GM_setValue('autolearn', true);
		allAnswers = 0; rightAnswers = 0;
		saveProgress();
		learn();
	}

	if (event.which == 'x'.charCodeAt(0)) {
		GM_setValue('autolearn', false);
		resetProgress();
		alert("Aborting learning.\nProgress info will be incorrect.");
		cbs.forEach(function(elem) { clearTimeout(elem); });

	}
}

function getCourseVar() {
	// detect course domain
	var title = document.getElementsByClassName('PageTitle'); if(!title.length) return;
	title = title[0].textContent;
	if(title.substring(0,6) != "Exam: ") return;

	return 'Course_' + title.substring(6).replace(/[^a-zA-Z_0-9]/g, '_');
}

function main() {
	var res = getRightAnswerImgs();
	var answerImgs = res[0];
	var isRight = res[1];
	if(answerImgs.length) {
		// administer answers
		allAnswers++; if(isRight) rightAnswers++;
		console.log("Stat: " + rightAnswers + "/" + allAnswers);
		saveProgress();

		// figure out the right answer, and store it
		var answers = [];
		answerImgs.forEach(function(a) {
				answers.push(a.parentNode.parentNode.children[1].textContent);
				});
		answerDB[questionText] = answers;
		serialize(titleVar, answerDB);

		if(progress[1] != progress[2]) {
			if(GM_getValue('autolearn', false)) {
				cbs.push(setTimeout(function() { unsafeWindow.displayNextQuestion('NEXT') }, delayAmount()));
			}
		} else {

			GM_setValue('autolearn', false);

			if(confirm("This was the last question. From " + allAnswers + " questions I answered " +
				rightAnswers + " correctly\nWould you mind rating this script?")) {
				GM_openInTab("http://userscripts.org/scripts/reviews/161283");
			}
			resetProgress();
		}
	} else {
		if(progress[1] == 1) {
			alert("Hey, if you would like some help, press Ctrl+Enter after dismissing this dialog.\n" +
				"To stop the learning process, just press 'x' anytime.");
		}
		window.addEventListener('keypress', keypress);
		if(GM_getValue('autolearn', false)) {
			cbs.push(setTimeout(function() { learn(); }, delayAmount()));
		}
	}
}


if(titleVar) {
	main();
}
