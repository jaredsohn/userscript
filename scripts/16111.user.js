// ==UserScript==
// @name           Google OneClick
// @namespace      http://diveintogreasemonkey.org/download/
// @description    Have direct access to different searches from the main search bar!  Links at the top give direct searches.
// @include        http://www.google.com
//@author Ben Winston
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

var searchBar = Ev('/html/body/center/form/table/tbody/tr/td[2]/input[2]');

//Identify the 4 links
var images = Ev('/html/body/div/nobr/span[2]/a');
var maps = Ev('/html/body/div/nobr/span[3]/a');
var news = Ev('/html/body/div/nobr/span[4]/a');
var products = Ev('/html/body/div/nobr/span[5]/a');

//Event listeners
images.addEventListener('click',imgSearch,false);
maps.addEventListener('click',mapSearch,false);
news.addEventListener('click',newsSearch,false);
products.addEventListener('click',productsSearch,false);

//Dummy Hrefs
images.href = '#';
maps.href = '#';
news.href = '#';
products.href = '#';

//Functions
function imgSearch(){
	var searchURL = searchBar.value;
	images.href = 'http://images.google.com/images?hl=en&q=' + searchURL;
}
function mapSearch(){
	var searchURL = searchBar.value;
	maps.href = 'http://maps.google.com/maps?q=' + searchURL;
}
function newsSearch(){
	var searchURL = searchBar.value;
	news.href = 'http://news.google.com/news?q=' + searchURL;
}
function productsSearch(){
	var searchURL = searchBar.value;
	products.href = 'http://www.google.com/products?q=' + searchURL;
}
