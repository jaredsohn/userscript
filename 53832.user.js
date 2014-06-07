// ==UserScript==
// @version       1.0.1
// @include       http://patronuscharm.net/s/*
// @include       http://www.patronuscharm.net/s/*
// @namespace     pc
// @name          PatronusCharm.net story export script.
// @author        Alssn
// @description   Writes all chapters of the story on one page.
// @changes       Removed unnecessary code
// ==/UserScript==

function addButtons(){
// Adding buttons
	var res = document.getElementById('font-status'); //searching for span which contains menu elements
	res = res.parentNode;
	var addHeadersButton=document.createElement('a');
	addHeadersButton.href='javascript:';
	addHeadersButton.setAttribute('title','Add header to each chapter');
	addHeadersButton.setAttribute('class','smenu');
	addHeadersButton.innerHTML='H';
	var expAllButton=document.createElement('a');
	expAllButton.id='exportAllButton';
	expAllButton.setAttribute('class','smenu');
	expAllButton.setAttribute('title','Show the whole story on one page');
	expAllButton.href='javascript:';
	expAllButton.innerHTML='(Story)';
	var expButton=document.createElement('a');
	expButton.href='javascript:';
	expButton.setAttribute('class','smenu');
	expButton.setAttribute('title','Show only text');
	expButton.innerHTML='(Text)';
	// Adding listeners - that's the only way to do something after main code finsihed working;
	expAllButton.addEventListener('click',exportAll,false);
	expButton.addEventListener('click',exportCh,false);
	addHeadersButton.addEventListener('click',addHeaders,false);
	res.appendChild(expAllButton);
	res.appendChild(expButton);
	res.appendChild(addHeadersButton);
}

//adding headers, as entered by author
function addHeaders(){
	var chapters = document.getElementsByName('pce_chapter');
	for (var i=0;i<chapters.length;i++){
	var item = chapters.item(i);
	var header = document.createElement('p');
	header.innerHTML = '<p style="font-size: 8, color: 0x000040">'+'<h2>Chapter '+(i+1)+': '+item.getAttribute('title')+'</h2></p>';
	item.insertBefore(header,item.firstChild);
	}
}

function exportCh(){
document.body.innerHTML='<div id=\'text\' class=\'text\' style=\'padding-left:2em;padding-right:2em;padding-top:1em;\'>'+document.getElementById('text').innerHTML+'</div>';
//Sadly, it is not possible to automatically copy text to clipboard in firefox without changing browser settings;
}
function exportAll(){
// Main actions   
	var expDiv = document.getElementById('exportAllButton');
	// Progress indicator
	var expText = expDiv.childNodes[0];
	var chapters = new Array();
	//Here I get index of chapters' numbers in href string. Surpisingly complicated seeing as regexp doesn't have a function to get the last occurence.
	var hr=location.href;
	var chapterNumIndex=hr.search(/$/);
	var chapterNum=hr.split(/\//);
	var cNumLength = chapterNum[chapterNum.length-2].length;
	chapterNumIndex=hr.length-cNumLength-1;
	
	//Getting number of chapters
	var storyLength=getLength(); 
	if (storyLength == 1){
		expText.nodeValue = 'Oneshot';
		return;
	}
	var totalStoryLength = storyLength;//reference
	//launching retrieving of all chapters simultaneously
	for (var i=1;i<=storyLength;i++){
	loadChapter(i);
	}
//Functions
    // Converting chapters' array into a whole;
	function parseStory(){
		var numCh= chapters.length;
		//document.body.innerHTML=chapters[0];
		var appendNode=document.getElementById('storytext');
		appendNode.innerHTML= '';
    	for (var i=0;i<numCh;i++){
			//findHeader(chapters[i]);  //smart header search
			var st=chapters[i];
			st.setAttribute('name','pce_chapter');
			st.setAttribute('id','pce_ch'+i);
			if (i!=0){
				st.style.marginTop='10em';
			}
    		appendNode.appendChild(st);
    	}
    	expText.nodeValue='story(re)';
	}
	//  Getting number of chapters;
	function getLength(){
		var selectDiv = document.getElementById('au_chap'); //div containing chapter selector
		var chNum=document.evaluate('//SELECT[@name=\'select\']',selectDiv,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (chNum.snapshotLength>0){
			var numChapters = chNum.snapshotItem(0).length;
		}else{
			numChapters = 1;
		}
		return (numChapters);
	}
	// This function loads chapters and extracts chapter's number and title 
	function loadChapter(num){
		var replStr=String(num)+'/';
		var currentURL=hr.substring(0,chapterNumIndex)+replStr;
		GM_xmlhttpRequest({ //Internal Greesemonkey function - main reason this couldn't work as a bookmarklet.
    		method: 'GET',
    		url: currentURL,
    		onload: function(responseDetails) {
				parseChapter(responseDetails.responseText, responseDetails.finalUrl);
				storyLength--;
				if (storyLength==0){
					parseStory();
				}
  			}
		});
	}
	function parseChapter(chapterHtml, chapterURL){
		//getting chapter number
		var iChaptr = chapterURL.substring(chapterNumIndex,chapterURL.length-1);
		var chapterNumber=iChaptr.substring(1,iChaptr.length-1);
		var t=document.createElement('div');
		t.innerHTML=chapterHtml;
		//extracting text only
  		var ev='//div[@id=\'storytext\']';
		var xpathResult = document.evaluate(ev,t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     	chapterContent=document.createElement('div');
		chapterContent.setAttribute('title',getChapterName(t));
		chapterContent.innerHTML = xpathResult.snapshotItem(0).innerHTML;
		
		chapters[chapterNumber-1]=chapterContent;
		expText.nodeValue = 'Export: Chapter '+String(totalStoryLength-storyLength+1)+' out of '+totalStoryLength;
		function getChapterName(obj){
			var select = obj.getElementsByTagName('select')[1].getElementsByTagName('option');
			 for (var i=0;i<select.length;i++){
				 if (select[i].getAttribute('selected')!=null){
					 return(select[i].innerHTML.split(/[. ]{2}/)[1]);
				 }
			 }
		}
	}

}//.user.js
//Adding buttons to page;
addButtons();
