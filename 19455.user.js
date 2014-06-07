// ==UserScript==
// @name            Naver Eng-Eng Dictionary Simpler
// @namespace       orpelove@gmail.com
// @include         http://eedic.naver.com/eedic*
// ==/UserScript==

function docEval(evalString)
{
	var evaluated;
	var evaluated  = document.evaluate(
	evalString,
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	return evaluated;
}
function Ev(evalString)
{
	var evaluated  = docEval(evalString);
	var evaluatedReturn = evaluated.snapshotItem(0);
	return evaluatedReturn;
}
function pOut(child)
{
child.parentNode.removeChild(child);
}

function removeX(xpathString)
{
	var thisNode = Ev(xpathString);
	pOut(thisNode);
}

function removeAll(tagName){
	var allTags = document.getElementsByTagName(tagName);
	for(var i = 0; i < allTags.length; i++)
	{
		var thisTag = allTags[i];
		pOut(thisTag);
	}
}
function checkRemove(xpStr)
{
	if(Ev(xpStr))
	{
		removeX(xpStr);
	}
}

checkRemove("//div[@id='gnb_area']");

checkRemove('/html/body/center/table[3]/tbody/tr/td[5]/table/tbody/tr');
checkRemove('/html/body/center/table[3]/tbody/tr/td[5]/table/tbody/tr');
checkRemove('/html/body/center/table[3]/tbody/tr/td[5]/table/tbody/tr');

checkRemove('/html/body/center/div/h1');
checkRemove("//ul[@class='service']");
checkRemove("//div[@id='menu']");

checkRemove('/html/body/center/table[3]/tbody/tr/td');
checkRemove('/html/body/center/table[5]');
checkRemove('/html/body/center/table[5]');
