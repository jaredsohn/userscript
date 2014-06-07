// ==UserScript==
// @name           Dictionary.com Ad Remove
// @namespace      http://diveintogreasemonkey.org/download/
// @include        http://dictionary.reference.com/wordoftheday/
// @author Ben Winston
// ==/UserScript==
/* Functions ----------------------------------------------------------------------------------------*/
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
/*End Functions ----------------------------------------------------------------------------------------*/


//Kill sidebar.
checkRemove("//*[@id='sidebar']");
//Kill top flash ad 
checkRemove("//*[@class='banner ad']");
checkRemove("//*[@class='banner ad-home']");
//Kill end of page ads
checkRemove('//*[@id="google_ads_div_D_SERP_Bottom"]');
//Kill all embeds. Just to be sure.
removeAll('embed');
//Display text across full length of the page
Ev('//*[@id="primary"]').style.width = '100%';
//Kill text ads for /browse
if(window.location.href.indexOf('browse')>-1)
{
	//*sigh* Kill more ads...
	checkRemove('/html/body/div[2]/div/div[2]/div');
	checkRemove('/html/body/div[2]/div/div/div');
	checkRemove('/html/body/div[2]/div/div/table');
	checkRemove('/html/body/div[2]/div/div/a');
	checkRemove('/html/body/div[2]/div/div/a');
	checkRemove("//*[@class='endofpagead']");
	//Remove extra line spans and whitespace
	checkRemove('/html/body/div[2]/div/div/span[2]');
	checkRemove('/html/body/div[2]/div/div/span[2]');
	checkRemove('/html/body/div[2]/div/div/span[2]');
	//When the word is not found, related ads occur
	if(Ev('/html/body/div[2]/div/div/b'))
	{
		if(Ev('/html/body/div[2]/div/div/b').innerHTML == 'Related Ads:')
		{
			checkRemove('/html/body/div[2]/div/div/b');
			checkRemove('/html/body/div[2]/div/div/table');
		}
	}
}