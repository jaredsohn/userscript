// ==UserScript==
// @name        Homosuck
// @namespace   pendevin
// @description Makes Homestuck suck less
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @version     1
// ==/UserScript==

//does shit with xpaths i guess
var XPATH={
	//returns an ordered array of objects matching the xpath expression
	//if context is undefined, defaults to the document
	//returns an empty array if there are no matches
	get:function(expression,context){
		//optional variable, yo
		if(context==undefined)
			context=document;
		var xpathResult=document.evaluate(expression,context,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		var result=[];
		for(var i=0;i<xpathResult.snapshotLength;i++)
			result.push(xpathResult.snapshotItem(i));
		return result.length>0?result:[];
	},

	//counts all the elements that match the xpath expression
	//if context is undefined, defaults to the document
	count:function(expression,context){
		//optional variable, yo
		if(context==undefined)
			context=document;
		expression='count('+expression+')';
		var xpathResult=document.evaluate(expression,context,null,XPathResult.NUMBER_TYPE,null);
		return xpathResult.numberValue;
	}
}

function simulateClick(element){
  var evt=document.createEvent("MouseEvents");
  evt.initMouseEvent("click",true,true,window,1,0,0,0,0,false,false,false,false,0,null);
	element.dispatchEvent(evt);
}

var title=XPATH.get('//td[@bgcolor="#EEEEEE"]/table/tbody/tr/td[2]/center/p')[0];
var images=XPATH.get('//td[@bgcolor="#EEEEEE"]/center')[0];
var text=XPATH.get('//td[@bgcolor="#EEEEEE"]/table/tbody/tr/td[1]/center')[0];
var banner=XPATH.get('//td[@background="images/bannerframe.png"]/center/a')[0];
var news=XPATH.get('//table[@width="676"]/tbody/tr/td/table')[0];
var searchLink=XPATH.get('//font[@size="1"]/b/a[6]')[0];
var backLink=XPATH.get('//span[@style="font-size: 10px;"]/b[2]/a')[0];
var latest=[
	XPATH.get('//table[@width="255"]/tbody/tr[2]/td/center/img[2]')[0],
	XPATH.get('//table[@width="255"]/tbody/tr[3]/td/table/tbody/tr/td/p')[0],
	XPATH.get('//table[@width="255"]/tbody/tr[4]/td/center/font')[0],
	XPATH.get('//table[@width="255"]/tbody/tr[4]/td/center[2]/span')[0]
];
var command=XPATH.get('//table/tbody/tr/td/font//a[contains(@href,"?s=6&p=")]')[0];

if(text){
	if(text.firstElementChild.textContent=='\n	\n			\n')
		text.firstElementChild.style.display='none';
	text.firstElementChild.style.maxHeight='450px';
	text.firstElementChild.style.overflowY='auto';
	if(text.children[1]){
		text.children[1].style.maxHeight='450px';
		text.children[1].style.overflowY='auto';
	}
}


for(var i=0;i<document.getElementsByClassName('spoiler').length;i++){
    //get pesterlog
    var pesterlog=document.getElementsByClassName('spoiler')[i];
    var log=pesterlog.getElementsByTagName('p')[0];

    //apply scrolling
    pesterlog.getElementsByTagName("table")[0].style.width='100%';
    log.style.maxHeight='402px';
    log.style.margin='10px 11px 14px 18px';
    log.style.overflowY='scroll';

		//put in the chat log type
		var logTitle=document.createElement('p');
		logTitle.textContent=pesterlog.previousSibling.textContent.substring(5);
		logTitle.style.fontWeight='bold';
		logTitle.style.fontFamily='courier,monospace';
		logTitle.style.margin='2px 18px 6px 11px';
		log.parentNode.insertBefore(logTitle,log);

    pesterlog.previousSibling.style.display='none';
    pesterlog.style.display='block';
    pesterlog.firstChild.firstChild.style.display='none';
}

//shortcuts
document.addEventListener('keypress',function keyPress(e){
	if(e.ctrlKey&&e.keyCode==37)
		simulateClick(backLink);
	else if(command&&e.ctrlKey&&e.keyCode==39)
		simulateClick(command);
},true);