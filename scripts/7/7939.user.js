//
// By Faisal Deshmukh
// Script Version: 5.0
//
//
// ==UserScript==
// @name          Super-Clean Answers.com ++
// @namespace	  http://userscripts.org/scripts/show/7939
// @description   Fixes various answers.com annoyances.
// @include       http://answers.com/*
// @include       http://*.answers.com/*
// ==/UserScript==


//alert('boogeyman is here');

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen, tv, projection, print';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeByXPath(xpath) {
    var allElements, thisElement;
    allElements = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        thisElement.parentNode.removeChild(thisElement);
    }
}

function getQuery () 
{
  var metaElements = document.all ?
    document.all.tags('META') :
    document.getElementsByTagName ?
    document.getElementsByTagName ('META') : new Array();
  var metaQuery = new Array();
  var i = 0;
  for (var m = 0; m < metaElements.length; m++)
    if (metaElements[m].name == 'URL')
      metaQuery[i++] = metaElements[m].content;

//Determine Slicing start pt
	var startPoint=0; 
	for(var i=0; i<metaQuery[0].length; i++)	
  	{
		if(metaQuery[0][i]=="=")
		{
			startPoint = i+1;
			break;
		}
	}

//Determine Slicing end pt
	var endPoint=startPoint; 
	for(var i=startPoint; i<metaQuery[0].length; i++)	
	{
		if(metaQuery[0][i]=="&")	
			break;
		else 	
			endPoint++;
	}

//Slice
	var realQuery = metaQuery[0].slice(startPoint,endPoint);

	return realQuery;
}

//WORK ON THIS
/*
addGlobalStyle(

	'.content {min-width: 5000px ! important }'	//stretches the content //840px //works with 5.0

+
	'p { width: 5000%; text-align: justify ! important} '
+
	'.bodyHead { width: 5000% ! important} '
+
	'.div {overflow: visible ! important }'	

	  'p { width: 98%; text-align: justify ! important} ' +
        '#middle { width: 100% ! important} ' +
        '.bodyHead { width: 80% ! important} ' +
//        'div.content { width: 150% ! important} ' +	//stretches the content including the thick gray lines
        'span.hw { font-size: inherit ! important} ' +
                'div.gradient_bedge { font-size: inherit ! important} ' +
        'div.pageTools { width: 100% ! important } ' +
	'.tight_dataSourceTitle {min-width: 845px ! important }' +	//stretches blue boxes
	'p.didYouMean { width: 145% ! important} ' 			//stretches the "Or did you mean:" section

	

);
*/

/* DISABLED
//  *****start of horizontal scroll bar removal*****

var targetElement = document.getElementById('outline');
if (targetElement) {
    targetElement.style.overflowX = "hidden";
    targetElement.style.overflowY = "hidden";	//commenting this will produce another vertical scroll bar
}

//  *****end of horizontal scroll bar removal*****
*/


//  *****removal by known div id / id*****			//use this if div id or id are known

var targetElement = document.getElementById('top_radlinks');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('World_of_the_Body');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('wikiDonate');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('gray_brcorner');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('h_ads2');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads3');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
/*
var targetElement = document.getElementById('ads_div');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
*/





/* REMAINING DISABLED
var targetElement = document.getElementById('lookup');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('copyrightTable');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads1');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads2');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads3');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads4');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads5');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads6');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('b_ads');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}


var targetElement = document.getElementById('navOther');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('navExplore');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('wikiDonate');	//removes donate to wiki
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('new_icons');	//removes vertical bars from top right
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('after_ad0');	//removes some useless stuff
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('h_ads0');		//removes some useless stuff
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('new_right');	//removes shopping box from web search (RHS)
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('navigationSection');	//removes navigation links from LHS
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('Best_of_the_Web');	//removes Best of the Web section
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('Translations');	//removes translations
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('Shopping');	//removes shopping section
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('horizontalTaxonomy2');	//removes the new top horizontal menu
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('tab17Table');	//removes 'Also from ans.com'
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('th1');	//removes ad just above the search result
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}


*/

//  *****end of removal by known div id / id*****


//  *****start of new links*****

var linky = document.createElement('div');

var query = getQuery();

var newLinkies ="<font size='2'>&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://www.google.com/search?q=" + query + "'>Web</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://images.google.com/images?q="  + query + "'>Images</a></font><br>&nbsp;";


linky.innerHTML = newLinkies;

var targetElement = document.getElementById('new_left');	//removes navigation links from LHS
if (targetElement) {
	targetElement.parentNode.insertBefore(linky, targetElement);

}

//  *****end of new links*****

/* DISABLED 
//  *****start of EOP box*****
	

var abc = document.createElement('div');
//var newHTML = "<span style = 'border: 2px solid rgb(208, 219, 239); text-align: center; margin: 0px; padding: 0px; background-color: white; height: 60px; background-image: url(http://site.answers.com/main11569/images/backTaxonomyHeader2.gif);background-position: left bottom; background-repeat: repeat-x;'> End of page </span>";
var newHTML = "";

abc.id = 'blueHr';
abc.innerHTML = newHTML;
abc.style.textAlign = 'center';

var targetElement = document.getElementById('footer');
if (targetElement) {
targetElement.parentNode.replaceChild(abc, targetElement);
}

//  *****end of eop box*****
*/


//  *****start of Removal by class and links****

removeByXPath('//div[@class="ads"]');				// removes ads from RHS
removeByXPath('//div[@class="ads_div"]');
removeByXPath('//p[@class="grayHeading"]/../../../../../../../..');	// removes citation box at bottom

/* REMAINING DISABLED
removeByXPath('//div[@style="margin: 10px 1px 0px; padding: 5px 0px; width: 772px; background-image: url(http://site.answers.com/main791/images/backTaxonomyHeader2.gif); background-position: left bottom; background-repeat: repeat-x;"]');
removeByXPath('//div[@style="border-top: 1px solid rgb(208, 219, 239); margin: 0px; padding: 0px; width: 772px; height: 60px; background-image: url(http://site.answers.com/main791/images/backTaxonomyHeader2.gif); background-position: left bottom; background-repeat: repeat-x; text-align: center;"]');


//removeByXPath('//div[@class="footer"]');
removeByXPath('//div[@class="pageTools"]');
removeByXPath('//div[@class="backTopicTitle"]');
removeByXPath('//a[@href="#copyright"]');

removeByXPath('//p[@class="copyright"]');	//kills class copyright
//removeByXPath('//script');			//disables answerTips


removeByXPath('//a[@href="http://librarians.answers.com"]');
removeByXPath('//a[@href="/main/advertise_with_us.jsp"]');
removeByXPath('//a[@href="/main/answers_business.jsp"]');
removeByXPath('//a[@href="/main/about_press_kit.jsp"]');
removeByXPath('//a[@href="http://teachers.answers.com"]');
removeByXPath('//a[@href="/main/new_blogger.jsp"]');
removeByXPath('//a[@href="/main/webmasters.jsp"]');

removeByXPath('//a[@href="/main/business.jsp"]');
removeByXPath('//a[@href="/main/entertainment.jsp"]');
removeByXPath('//a[@href="/main/health.jsp"]');
removeByXPath('//a[@href="/main/people.jsp"]');
removeByXPath('//a[@href="/main/places.jsp"]');
removeByXPath('//a[@href="/main/reference.jsp"]');
removeByXPath('//a[@href="/main/science.jsp"]');
removeByXPath('//a[@href="/main/shopping.jsp"]');
removeByXPath('//a[@href="/main/words.jsp"]');
removeByXPath('//a[@href="/main/what_content.jsp"]');
*/

//  *****end of Removal by class and links****
