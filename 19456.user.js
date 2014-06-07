// ==UserScript==
// @name            Cambridge Dictionary Simpler
// @namespace       orpelove@gmail.com
// @include         http://dictionary.cambridge.org/*
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

checkRemove("//div[@id='promo']");
checkRemove("//table[@id='strip']");
checkRemove("//img[@src='images-new/buy.jpg']");
checkRemove("//td[@id='right1']");
checkRemove("//td[@id='right2']");
checkRemove('/html/body/table[3]/tbody/tr/td[1]');
