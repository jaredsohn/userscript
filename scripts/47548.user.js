// ==UserScript==
// @name Be a dictionary
// @namespace http://www.answers.com/*
// @description I wrote this script for language learing, after you install this, try 'http://www.answers.com/help'. You can see cleaned dictionary.
// @include http://www.answers.com/*
// @exclude
// ==/UserScript==

//	만든 함수 begin
//	DOM node의 차일드 노드 중에, cntElement번째 엘리먼트노드를 리턴함
function getElementNodeByCount(parentNode, cntElement)
{
	if(parentNode == null)
		return	null;
	
	for(var i=0; i<parentNode.childNodes.length; ++i)
	{
		var	childNode = parentNode.childNodes.item(i);
		if(childNode.nodeType == 1){	//	1 means ELEMENT_NODE.
			--cntElement;
			if(0 == cntElement){
				return	childNode;
			}
		}
	}
	
	return	null;
}

//	DOM node의 차일드 노드 중에, cntElement번재 텍스트노드를 리턴함
function getTextNodeByCount(parentNode, cntElement)
{
	if(parentNode == null)
		return	null;
			
	for(var i=0; i<parentNode.childNodes.length; ++i)
	{
		var	childNode = parentNode.childNodes.item(i);
		if(childNode.nodeType == 3){	//	3 means TEXT_NODE.
			--cntElement;
			if(0 == cntElement){
				return	childNode;
			}
		}
	}
	
	return	null;
}

//	차일드노드 모두 덤프 뜨는 함수
function dumpAllChildNode(targetNode)
{
	if(targetNode == null){
		//GM_log('dumpall null');
		return	null;
	}
	
	for(var i=0; i<targetNode.childNodes.length; ++i)
	{
		var	childNode = targetNode.childNodes.item(i);
		
		//GM_log(childNode + '/'+i+'/' + childNode.nodeType + '/' + childNode.nodeName + '/' + childNode.nodeValue);
	}
	
	return	null;
}

function removeAllChildNodes(parentNode)
{
	if(parentNode == null)
		return	null;
	
	for(var i=0; i<parentNode.childNodes.length; ++i)
	{
		var	childNode = parentNode.childNodes.item(i);
		childNode.nodeValue	= '';
		childNode.parentNode.removeChild(childNode);
	}
}
	
function removeAllDescendant(targetNode)
{
	if(targetNode == null)
		return	null;
	
	for(var i=0; i<targetNode.childNodes.length; ++i)
	{
		var	childNode = targetNode.childNodes.item(i);
		removeAllDescendant(childNode);
		targetNode.removeChild(childNode);
	}
}

//	첫글자만 대문자로 만들어 리턴함
function keyword1UpperCase(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
}
//	만든 함수 end

//	실제 코드 돌기 시작함
//GM_log('aaa');
var thisURL = new String(location.href);
//GM_log('bbb');
var keyword	= thisURL.replace('http://www.answers.com/','');

var	answers_com_keyword = '';


var resultsFor = document.getElementById('resultsFor');
if(resultsFor){	
	//dumpAllChildNode(resultsFor);
	var h1Element  = getElementNodeByCount(resultsFor, 1);
	if(h1Element){
		answers_com_keyword = getTextNodeByCount(h1Element, 1);
		if(answers_com_keyword){
			answers_com_keyword	= answers_com_keyword.nodeValue;
		}
	}
}

//GM_log('keyword : '+keyword);
//GM_log('answers_com_keyword : '+answers_com_keyword);

//	answers.com에 없는 단어를 검색하였는지 확인
//		answers.com에 없는 단어를 검색한 경우,
//		유사한 단어를 보여주기 때문에, 검색한 단어(var keyword)와,
//		answers.com이 보여준 단어(answers_com_keyword)가 동일한지 확인해야 함
if(keyword != answers_com_keyword){
	//GM_log('keywords are not matched. ' + keyword + '/' + answers_com_keyword);
	var bodyElement = document.getElementsByTagName('body')[0];
	var	childNodeForBody;
	//GM_log('1');
	removeAllDescendant(bodyElement);
	//GM_log('2');
	childNodeForBody = document.createElement('h1'); 
	//GM_log('3');
	textNode = document.createTextNode('You search : \''+keyword+'\' did not match any words.'); 
	//GM_log('4');
	childNodeForBody.appendChild(textNode);
	//GM_log('5');
	//bodyElement.appendChild(childNodeForBody);
	var pageWrapper;
	pageWrapper = document.getElementById('pageWrapper');	
	pageWrapper.parentNode.replaceChild(childNodeForBody, pageWrapper);
	//GM_log('xxx');
}
else{


var headerSection2 = document.getElementById('headerSection2');
if (headerSection2) {
	headerSection2.parentNode.removeChild(headerSection2);
}

var h_ads0 = document.getElementById('h_ads0');
if (h_ads0) {
	h_ads0.parentNode.removeChild(h_ads0);
}

var h_ads1 = document.getElementById('h_ads1');
if (h_ads1) {
	h_ads1.parentNode.removeChild(h_ads1);
}

var h_ads2 = document.getElementById('h_ads2');
if (h_ads2){
	h_ads2.parentNode.removeChild(h_ads2);
}

var h_ads3 = document.getElementById('h_ads3');
if (h_ads3){
	h_ads3.parentNode.removeChild(h_ads3);
}

var h_ads4 = document.getElementById('h_ads4');
if (h_ads3){
	h_ads4.parentNode.removeChild(h_ads4);
}

var h_ads5 = document.getElementById('h_ads5');
if (h_ads5){
	h_ads5.parentNode.removeChild(h_ads5);
}

var h_ads6 = document.getElementById('h_ads6');
if (h_ads6){
	h_ads6.parentNode.removeChild(h_ads6);
}

var learnMore = document.getElementById('learnMore');
if (learnMore) {
	learnMore.parentNode.removeChild(learnMore);
}

/*
var copyrightTable = document.getElementById('copyrightTable');
if (copyrightTable){
	copyrightTable.parentNode.removeChild(copyrightTable);
}
*/

var Computer_Desktop_Encyclopedia_d = document.getElementById('Computer_Desktop_Encyclopedia_d');
if (Computer_Desktop_Encyclopedia_d){
	Computer_Desktop_Encyclopedia_d.parentNode.removeChild(Computer_Desktop_Encyclopedia_d);
}

var Abbreviations_d = document.getElementById('Abbreviations_d');
if (Abbreviations_d){
	Abbreviations_d.parentNode.removeChild(Abbreviations_d);
}

var Translations_d = document.getElementById('Translations_d');
if (Translations_d){
	Translations_d.parentNode.removeChild(Translations_d);
}

var Shopping_d = document.getElementById('Shopping_d');
if (Shopping_d){
	Shopping_d.parentNode.removeChild(Shopping_d);
}

var Best_of_the_Web_d = document.getElementById('Best_of_the_Web_d');
if (Best_of_the_Web_d){
	Best_of_the_Web_d.parentNode.removeChild(Best_of_the_Web_d);
}

var resultsFor = document.getElementById('resultsFor');
if (resultsFor){
	resultsFor.parentNode.removeChild(resultsFor);
}

var perdym = document.getElementById('perdym');
if (perdym){
	perdym.parentNode.removeChild(perdym);
}

var lowerDymForm = document.getElementById('lowerDymForm');
if (lowerDymForm){
	lowerDymForm.parentNode.removeChild(lowerDymForm);
}

var Wikipedia_d = document.getElementById('Wikipedia_d');
if (Wikipedia_d){
	Wikipedia_d.parentNode.removeChild(Wikipedia_d);
}

var Word_Tutor_d = document.getElementById('Word_Tutor_d');
if (Word_Tutor_d){
	Word_Tutor_d.parentNode.removeChild(Word_Tutor_d);
}

var tab17Table = document.getElementById('tab17Table');
if(tab17Table){
	tab17Table.parentNode.removeChild(tab17Table);
}

var copyrightTable = document.getElementById('copyrightTable');
if (copyrightTable){
	copyrightTable.parentNode.removeChild(copyrightTable);
}


var pageWrapper;
pageWrapper = document.getElementById('pageWrapper');

var new_left;
new_left = document.getElementById('new_left');
new_left.setAttribute('align', 'left');

if (pageWrapper) {
	pageWrapper.parentNode.replaceChild(new_left, pageWrapper);
}

//	단어 & 발음기호, 지우기 begin
var firstDs = document.getElementById('firstDs');
var balum;
var balum1;
var balumkiho;

balum = getElementNodeByCount(firstDs, 1);	//	<div class="DsAndEntryName">
balum = getElementNodeByCount(balum, 1);
balum = getElementNodeByCount(balum, 1);
balum = getElementNodeByCount(balum, 1);
balum = getElementNodeByCount(balum, 1);
balum1 = getElementNodeByCount(balum, 2);
removeAllDescendant(balum1);

balumkiho = getElementNodeByCount(balum, 3);
removeAllDescendant(balumkiho);
//	단어 & 발음기호, 지우기 end




var keywordUpperCase	= keyword.toUpperCase();
var keywordLowerCase	= keyword.toLowerCase();
var keyword1	= keyword1UpperCase(keyword);

//	본문에 찾는 단어가 언급된 경우 모두 ??? 로 바꿈함
//		모두 소문자
document.body.innerHTML= document.body.innerHTML.replace(new RegExp(keywordLowerCase, "g"), '?????');
//GM_log(keywordLowerCase);

//		첫 글자만 대문자
document.body.innerHTML= document.body.innerHTML.replace(new RegExp(keyword1, "g"), '?????');
//GM_log(keyword1);

//		모두 대문자
document.body.innerHTML= document.body.innerHTML.replace(new RegExp(keywordUpperCase, "g"), '?????');
//GM_log(keywordUpperCase);

//GM_log('Everything is done.');


}	//	Else{

// to do
// 없는 단어 일때, 처리
