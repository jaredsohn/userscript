// ==UserScript==
// @name           AcakataHelperBot
// @namespace      bambu/com.plurk
// @description    Answer-gathering bot for acakata.com web game, provides guesses for known answers based on gathered question-answer pairs, created by plurk.com/bambu, version 1.0.0
// @include        http://www.acakata.com/*
// ==/UserScript==

var isHintsGiven = true;
logHistory();

var tLastParsedChildIdx = 0;

function logHistory()
{
	var form = document.forms.namedItem('publish_form');
	var input = form.elements.namedItem('payload');
	var hist = document.getElementById('history');
	
	var tCurrentChildNodeCount = hist.childElementCount;
	for (i = tLastParsedChildIdx; i < tCurrentChildNodeCount; i++)
	{
		var chatline = hist.childNodes[i];
		
		if (chatline.className == 'q')
		{
			var hint = chatline.childNodes[0].textContent;
			hint = hint.substr(2, hint.length-3);
			
			var scrambledword = chatline.childNodes[1].innerHTML;
			var scrambledword_orig = scrambledword;
			
			var explodedsw = scrambledword.split("");
			explodedsw.sort();
			
			scrambledword = explodedsw.join("");
			
			if (i == (tCurrentChildNodeCount-1)) // if fresh question
			{
				tUnscrambledWord = GM_getValue(scrambledword, "");
				
				if (tUnscrambledWord.length > 0 && isHintsGiven)
				{
					showMessage('The answer is [' + tUnscrambledWord + ']!');
				}
				else if (!isHintsGiven)
				{
					showMessage('Hints are disabled!');
				}
				else
				{
					showMessage('Uhh.. I don\'t know the answer to [' + scrambledword_orig + '], but if someone answer it I\'ll remember the answer for future questions.');
				}
			}
		}
		else if (chatline.className == 'sys')
		{
			var answer = chatline.childNodes[1].textContent;
			
			// Check if really answer
			answerword = ' answer';
			if (answer.substr(0, answerword.length) === answerword)
			{
				tExtractedAnswer = answer.substr(10, answer.length-28);
				
				var explodedsw = tExtractedAnswer.split("");
				explodedsw.sort();
				
				tScrambledAnswer = explodedsw.join("");
				
				if (GM_getValue(tScrambledAnswer, "").length == 0) // if not yet found in database
				{
					showMessage('New answer [' + tExtractedAnswer + '] found, stored in database.');
					GM_setValue(tScrambledAnswer, tExtractedAnswer);
				}
			}
		}
		else
		{
		}
	}
	
	tLastParsedChildIdx = tCurrentChildNodeCount;
	
	window.setTimeout(logHistory, 500);
}

function showMessage(msg)
{
	document.getElementById('announcement').textContent = msg;
}

function disableHints()
{
	isHintsGiven = false;
}

function enableHints()
{
	isHintsGiven = true;
}

function showWordCount()
{
	var tWordList = GM_listValues();
	alert('Number of words that I remember so far is ' + tWordList.length + ' words!');
}

GM_registerMenuCommand("Stop Giving Me Hints!", disableHints);
GM_registerMenuCommand("I Need Hints Please!", enableHints);

GM_registerMenuCommand("How Many Words in the Database?", showWordCount);
