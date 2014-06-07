// ==UserScript==
// @name           FreeRice 2 Auto Feed
// @namespace      Pi
// @include        http://*.freerice.*/*
// @include        http://freerice.*/*
// @version        1.54
// @require        http://sizzlemctwizzle.com/updater.php?id=89869

// ==/UserScript==

//***Settings***
var MAX_QUESTIONS_TO_ANSWER = 100000;
var INTERVAL_IN_SECONDS = 1;

var debug = false;
var GM_KEY_PREFIX = "GM_KEY_";
var MAX_DAYS = 5000;
var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0);

function log(message)
{
	if(!debug) return;
	if(isChrome) console.info(message);
	else GM_log(message);
}

function GM_GlobalSetValue(key, val)
{
    var gmFound = false;
    try
    {
        if(GM_setValue && !isChrome) // to increase the problems, Chrome defines the method and says "not supported".
        {
            GM_setValue(key, val);
            gmFound = true;
        }
    }
    catch(ex)
    {
        //I hate you Google Chrome.
    }
   
    if(!gmFound)
    {
        //work around using cookies.
        createCookie(GM_KEY_PREFIX + key, val, MAX_DAYS);
    }
}

function GM_GlobalGetValue(key, defaultValue)
{
    var returnValue = defaultValue;
    var gmFound = false;
    try
    {
        if(GM_getValue && !isChrome)
        {
            returnValue = GM_getValue(key, defaultValue);
            gmFound = true;
        }
    }
    catch(ex)
    {
		//do nothing
    }
    if(!gmFound)
    {
		var cookieTry = readCookie(GM_KEY_PREFIX + key);
		if(cookieTry)
		{
			returnValue = cookieTry;
			if(returnValue == "false") //most probably, we wanted this. 
				returnValue = false;
			else if(returnValue == "true")
				returnValue = true;
		}
    }

    return returnValue;
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

function getChildrenByXPath(currentNode, xpath, CallBack)
{
	var returnArray = new Array();	
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i)) : nodesSnapshot.snapshotItem(i));

	return returnArray;
}

function getChildrenByTagName(currentNode, tagName, attributeName, attributeValue, strictChildren, CallBack)
{
	var modifier = "//";
	if(strictChildren)
		modifier = "./";
	var xpath = modifier + tagName;
	if(attributeName && attributeValue)
		xpath += "[@" + attributeName + "='" + attributeValue + "']";
	return getChildrenByXPath(currentNode, xpath, CallBack);
}

function getFirstChildByTagName(currentNode, tagName, attributeName, attributeValue)
{
	var array = getChildrenByTagName(currentNode, tagName, attributeName, attributeValue);
	if(array && array.length > 0)
		return array[0];
	else
		return null;
}

function found(arr, str)
{
  var i = arr.length;
  while (i--)
  {
    if (str.indexOf(arr[i]) >= 0)
      return arr[i];
  }
  return null;
}

var supportedModes = ['Multiplication Table'];
var answered = false;
var falseRetries = 0;
var countAnswered = 0;
var MAX_FALSE_RETRIES = 30;
var maxQuestionsToAnswer = GM_GlobalGetValue("MAX_QUESTIONS_TO_ANSWER", MAX_QUESTIONS_TO_ANSWER);
var timeInterval = GM_GlobalGetValue("INTERVAL_IN_SECONDS", INTERVAL_IN_SECONDS);
var enabled = true;

function answerQuestion()
{
	var question = null, result = null;
	var titleDiv = document.getElementById('question-title');
	answered = false;
	if(titleDiv && enabled)
	{
		var questionTag = titleDiv.getElementsByTagName('b');
		if(questionTag)
			question = questionTag[0].innerHTML;
		var blockTitle = getFirstChildByTagName(document, 'div', 'class', 'block-title', false);
		if(blockTitle)
		{
			var mode = found(supportedModes, blockTitle.innerHTML);
			if(mode && mode == 'Multiplication Table') //No other mode supported right now. 
			{
				result = eval(question.replace('x','*').replace('X','*'));
				var choices = getChildrenByXPath(document, "//a[@class='answer-item']");
				for(i in choices)
				{
					if(choices[i].innerHTML.replace(/ /g,"") == result)
					{
						//Location Hack to circumvent their 'default click event' changes to the website. 
						location.href = "javascript:ExternalGame.submitAnswer(" + choices[i].getAttribute("rel") + ");void(0);";
						answered = true;
						++countAnswered;
						falseRetries = 0;
						log("Correct answer number " + countAnswered + " is: " +  result);
						break;
					}
				}
			}
		}
	}
	if(!answered)
	{
		++falseRetries;
		log(falseRetries + " retries.");
	}
	if((falseRetries < MAX_FALSE_RETRIES) && (countAnswered < maxQuestionsToAnswer))
		setTimeout(answerQuestion, timeInterval * 1000);
}

function changeTimeInterval()
{
	var newVal = prompt("Enter the time interval(in seconds) between answering two questions.");
	if(!isNaN(newVal))
	{
		GM_GlobalSetValue("INTERVAL_IN_SECONDS", newVal);
		timeInterval = newVal;
		log("Time interval set to : " + timeInterval);
	}
}

function changeMaxAnswers()
{
	var newVal = prompt("Enter the number of questions to automatically answer for each page load.");
	if(!isNaN(newVal))
	{
		GM_GlobalSetValue("MAX_QUESTIONS_TO_ANSWER", newVal);
		maxQuestionsToAnswer = newVal;
		log("maxQuestionsToAnswer set to " + maxQuestionsToAnswer);
	}
}

function stopAutoAnswer()
{
	enabled = false;
}


//Main
if(top == self)
{
	setTimeout(answerQuestion, timeInterval * 1000);
	log("Will try to answer " + maxQuestionsToAnswer + " questions with the interval of " + timeInterval + " between each question");

	if(!isChrome)
	{
		try
		{
			GM_registerMenuCommand("Set time interval", changeTimeInterval);
			GM_registerMenuCommand("Set maximum questions to auto-answer each pageload", changeMaxAnswers);
			GM_registerMenuCommand("Stop auto answering", stopAutoAnswer);
		}
		catch(ex)
		{
			log(ex);
		}
	}
}
