// ==UserScript==
// @name           PS RLS Helper
// @version        1.0
// @namespace      *
// @include        http://rls.us.playstation.com/*
// ==/UserScript==

GM_registerMenuCommand('PS RLS Helper: Clear Variables', clearVars);

function click(elm) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
	elm.dispatchEvent(evt);
} 

function clearVars(target) {
	storedMostQuestions = GM_getValue('mostQuestions');
	if (target == null) {
		GM_setValue('quizName', '');
	}
	
	for (i=0;i<parseFloat(storedMostQuestions);i++) {
		GM_setValue('question' + i + 'Label', '');
		GM_setValue('question' + i + 'Value', '');
		GM_setValue('question' + i + 'Valid', false); //set it this way to verify that things are being set
	}
}

myLoc = document.location.href;
//If we are taking a quiz
if (myLoc.match('CourseQuiz.aspx')) {
	storedQuizName = GM_getValue('quizName');
	storedMostQuestions = GM_getValue('mostQuestions');
	
	quizName = document.getElementById('courseQuiz_lblQuizTitle').innerHTML.replace(/[^a-zA-Z0-9 ]/g,'');
	if(document.getElementById('courseQuiz_lblQuestionNum')) {
		questionNum = document.getElementById('courseQuiz_lblQuestionNum').innerHTML;
		questionNum --;
		totalQuestions = document.getElementById('courseQuiz_lblQuestionTotal').innerHTML;
		if ((storedMostQuestions == '') || (storedMostQuestions == undefined)) {
			storedMostQuestions = totalQuestions;
			GM_setValue('mostQuestions',storedMostQuestions);
		}
		
		//If this is a new quiz
		if (storedQuizName != quizName) {
			//If this is the first question
			if (questionNum == 0) {
				//Clear all stored Questions and Answers
				clearVars('q');
			}
			
			//Set the question label
			GM_setValue('question' + questionNum + 'Label' , document.getElementById('courseQuiz_lblQuestion').innerHTML.replace(/[^a-zA-Z0-9 ]/g,''));
			
			//Set a listener on the submit button
			document.getElementById('courseQuiz_btnSubmit').addEventListener('click', function() {
				//Get selected answer
				answerTable = document.getElementById('courseQuiz_rbAnswers');
				answers = answerTable.getElementsByTagName('input');
				for(i=0;i<answers.length;i++) {
					if (answers[i].checked) {
						GM_setValue('question' + questionNum + 'Value', answers[i].nextSibling.innerHTML.replace(/[^a-zA-Z0-9 ]/g,''));
					}
				}
			},false);
			
		//If we are retaking the quiz
		} else {
			//Find which question this is locally
			label = document.getElementById('courseQuiz_lblQuestion').innerHTML.replace(/[^a-zA-Z0-9 ]/g,'');
			for(i1=0;i1<parseFloat(totalQuestions);i1++) {
				if (GM_getValue('question'+i1+'Label')==label) {
					//Check if valid
					storedValid = GM_getValue('question'+i1+'Valid');
					//Get what options we've tried
					storedValue = GM_getValue('question'+i1+'Value');
					storedArr = storedValue.split(';');
					
					//Get answer table
					answerTable = document.getElementById('courseQuiz_rbAnswers');
					answers = answerTable.getElementsByTagName('input');
					for(i2=0;i2<answers.length;i2++) {
						if(storedValid==true) {
							if (answers[i2].nextSibling.innerHTML.replace(/[^a-zA-Z0-9 ]/g,'') == storedValue) {
								answers[i2].checked = true;
								click(document.getElementById('courseQuiz_btnSubmit'));
							} else {
								answers[i2].nextSibling.style.color = '#D99';
							}
							document.getElementById('courseQuiz_lblQuestion').style.color = '#AAA';
						} else {
							match=false;
							for(i3=0;i3<storedArr.length;i3++) {
								if (answers[i2].nextSibling.innerHTML.replace(/[^a-zA-Z0-9 ]/g,'') == storedArr[i3]) {
									answers[i2].nextSibling.style.color = '#D99';
									match=true;
								}
								answers[i2].parentNode.parentNode.style.display = "block";
								answers[i2].parentNode.parentNode.style.paddingBottom = "5px";
							}
							
							if ((storedArr.length >= answers.length) && (i2 == 0)) {
								GM_setValue('question'+i2+'Value','');
								alert('umm... sorry about that. I think we got some wrong records for this question');
							} else {
								if ((storedArr.length+1==answers.length)&&(match==false)) {
									answers[i2].checked = true;
									click(document.getElementById('courseQuiz_btnSubmit'));
									
									myChecked = answers[i2].nextSibling.innerHTML.replace(/[^a-zA-Z0-9 ]/g,'');
									GM_setValue('question'+i2+'Value', GM_getValue('question'+i2+'Value') + ';' + myChecked);
								} else {
									document.getElementById('courseQuiz_lblQuestion').style.backgroundColor = '#FFF';
								}
							}
						}
					}
					
					document.getElementById('courseQuiz_lblQuestion').style.marginRight = '75px';
					document.getElementById('courseQuiz_lblQuestion').style.padding = '20px';
					document.getElementById('courseQuiz_lblQuestion').style.display = 'block';
					
					//Stop the loop
					i1=parseFloat(totalQuestions);
				}
			}
			//Listen for new answer
			//document.getElementById('courseQuiz_lblQuestionNum').addEventListener('click', function() {
			document.getElementById('courseQuiz_btnSubmit').addEventListener('click', function() {
				//Get selected answer
				answerTable = document.getElementById('courseQuiz_rbAnswers');
				answers = answerTable.getElementsByTagName('input');
				//Find the answer we checked
				for(i1=0;i1<answers.length;i1++) {
					if (answers[i1].checked) {
						myChecked = answers[i1].nextSibling.innerHTML.replace(/[^a-zA-Z0-9 ]/g,'');
						myLabel = document.getElementById('courseQuiz_lblQuestion').innerHTML.replace(/[^a-zA-Z0-9 ]/g,'');
						//Find the locally stored question
						for(i2=0;i2<parseFloat(totalQuestions); i2++) {
							if (myLabel == GM_getValue('question'+i2+'Label')) {
								GM_setValue('question'+i2+'Value', GM_getValue('question'+i2+'Value') + ';' + myChecked);
								i2=parseFloat(totalQuestions);
							}
						}
						i1=answers.length;
					}
				}
			},false);
		}
		
		//Add listener to options to subit question when they are clicked, so less clicks = better
		answerTable = document.getElementById('courseQuiz_rbAnswers');
		answers = answerTable.getElementsByTagName('input');
		for(i=0;i<answers.length;i++) {
			answers[i].addEventListener('click', function() {
				click(document.getElementById('courseQuiz_btnSubmit'));
			},false);
			answers[i].nextSibling.addEventListener('click', function() {
				click(document.getElementById('courseQuiz_btnSubmit'));
			},false);
		}
	} else {
		responses = document.getElementsByClassName('response_set');
		for(i1=0;i1<responses.length;i1++) {
			//Check if correct
			if (responses[i1].childNodes[1].className.match('incorrect')) {
				valid = false;
			} else {
				valid = true;
			}
			
			//We need to verify the variable number because if we are seeing the results 
			//from taking the quiz the second or more time
			for(i2=0;i2<responses.length; i2++) {
				if (responses[i1].childNodes[0].innerHTML.replace(/[^a-zA-Z0-9 ]/g,'') == GM_getValue('question'+i2+'Label')) {
					//Store Correctness
					GM_setValue('question'+i2+'Valid',valid);
					
					//This is for if I get multiple answer tracking working, 
					//so that when a correct answer is chosen it only tracks the correct one
					if (valid == true) {
						GM_setValue('question'+i2+'Value',responses[i1].childNodes[1].innerHTML.replace(/[^a-zA-Z0-9 ]/g,''));
					}
					
					//End Loop
					i2=responses.length;
				}
			}
		}
		
		//Set quiz name so that qw don't overwrite any data
		GM_setValue('quizName',quizName);
	}
}

function toggleQuizzes() {
	listItems = document.getElementsByClassName('training_list_item');
	window.count = 0;
	window.totalQ = listItems.length;
	for(i=0;i<listItems.length;i++) {
		if (listItems[i].childNodes[13].textContent.match(/[\d]/)) {
			if (window.hideToggle == 'visible') {
				listItems[i].style.display = 'none';
			} else {
				listItems[i].removeAttribute('style');
			}
			window.count++;
		}
	}
	
	if (window.hideToggle == 'visible') {
		window.hideToggle = 'hidden';
	} else {
		window.hideToggle = 'visible';
	}
}

if (myLoc.match('Training.aspx')) {
	window.hideToggle = 'visible';
	
	toggleQuizzes();
	
	document.getElementsByClassName('training_list_header')[0].childNodes[1].innerHTML = '<a id="greaseHidden" style="color: #666;" href="javascript:">' + window.count + ' of ' + window.totalQ + ' quizzes taken</a>';
	document.getElementById('greaseHidden').addEventListener('click', function() {
		toggleQuizzes();
	},false);
}