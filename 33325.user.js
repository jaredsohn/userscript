// ==UserScript==
// @version       1.6
// @include       *.fanfiction.net/s/*
// @namespace     ffnet
// @name          Fanfiction.net story export script.
// @author        Alssn
// @description   Writes all chapters of the story on one page.
// @require		  http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @changes       Rewrote some code to use jquery, changed design to fit the new ff.net scheme
// ==/UserScript==

var chapters=[];

var style = $("<style type='text/css'> .ffne_action{padding-right: 7px; cursor:pointer;} .ffne_action:hover{} #ffne_export{ } #ffne{float:right;margin-left: 0.9em;} #ffne_button{font-size:1.3em;cursor:pointer;line-height: 1em;padding-right: 7px;} .ffne_hidden{display:none;}</style>");
$('body').append(style);

function addButtons(){
	// Adding buttons
	res = document.getElementById('f_size');
	// creating links
	var node = $('.lc').first();
	var exportMenu = $('<span id="ffne"><span id="ffne_button" class="xcontrast_txt">fE</span></span>');
	var exportContainer = $('<span id="ffne_export"></span>');
	var addHeadersButton = $('<span href="javascript:" class="ffne_action" title="Add header to each chapter">Headers</span>');
	var addIndexButton = $('<span href="javascript:" class="ffne_action" title="Create table of contents">Index</span>');
	var addTitleButton = $('<span href="javascript:" class="ffne_action" title="Insert title and author">Title</span>');
	var expAllButton = $('<span href="javascript:" class="ffne_action" id="exportAllButton" title="Show the whole story on one page">Story</span>');
	var expRestButton = $('<span href="javascript:" class="ffne_action" id="exportRestButton" title="Export chapters from the current to the last one">Rest</span>');
	var expButton=$('<span href="javascript:" class="ffne_action" title="Show only text">Text</span>');
	exportMenu.append(exportContainer);
	exportContainer.append(expAllButton,expRestButton,expButton,'|&nbsp;&nbsp;',addHeadersButton,addTitleButton,addIndexButton);
	node.append(exportMenu);
	expAllButton.click(exportChapters);
	expRestButton.click(exportRest);
	expButton.click(exportCh);
	addHeadersButton.click(addHeaders);
	addTitleButton.click(addTitle);
	addIndexButton.click(addIndex);
	$('#ffne_button').click(function(){
		var cont = $('#ffne_export');
		if (cont.hasClass('ffne_hidden')){cont.removeClass('ffne_hidden');}else{cont.addClass('ffne_hidden')}
	});
	}

//Adding buttons to page;
addButtons();

//Adding table of contents
function addIndex(){
	var chapters = $('div[name="ffnee_chapter"]');
	var index = $('<div id="ffnee_index"><h2>Table of contents</h2></div>');
	var toC = $('<ol></ol>');
	index.append(toC);
	for (var i=0;i<chapters.length;i++){
		var item = $(chapters[i]); //chapter we are currently processing
		toC.append($('<li><a href="#'+item.attr('id')+'">'+item.attr('title')+'</a></li>'));
	}	
	$('#storytext').prepend(index);
}
//adding headers, as entered by author
function addHeaders(){
	var chapters = document.getElementsByName('ffnee_chapter');
	for (var i=0;i<chapters.length;i++){
	var item = chapters.item(i); //chapter to which we are adding a header
	var header = document.createElement('p');
	header.innerHTML = '<h2>Chapter '+(i+1)+': '+item.getAttribute('title')+'</h2>';
	item.insertBefore(header,item.firstChild);
	}
}
function addTitle(){
	var titleText = $('b.xcontrast_txt','#profile_top').first().html();
	var title = $('<h1>'+titleText+'</h1>');
	var authorText = $('a.xcontrast_txt[href^="/u/"]','#profile_top').first().html();
	var author = $('<h2>'+authorText+'</h2>');
	var storytext = $('#storytext');
	storytext.prepend(author,title);
}
function exportCh(){
document.body.innerHTML='<div style=\'padding-left:2em;padding-right:2em;padding-top:1em;\'>'+document.getElementById('storytextp').innerHTML+'</div>';
//Sadly, it is not possible to automatically copy text to clipboard in firefox without changing browser settings;
}
function exportRest(e){
	var chap_select = document.getElementById('chap_select');
	console.log('exporting rest');
	exportChapters(e,chap_select.value-1);
}
function exportChapters(e,start,end){
// Main actions   
	// Progress indicator
	var expDiv = document.getElementById('exportAllButton');
	var expText = expDiv.childNodes[0];
	var hr=location.href;
	var chapterNumIndex=hr.search(/\/\d{1,3}\//);
	//Getting number of chapters
	var storyLength=getLength(); 
	if (storyLength == 1){
		expText.nodeValue = 'Oneshot';
		return;
	}
	if (start==undefined){
		start=0;
	}
	if (end==undefined){
		end=storyLength;
	}
	storyLength = end-start;
	var totalStoryLength = storyLength;//reference
	console.log('retrieving '+totalStoryLength+' chapters');
	console.log('start is: '+start+', end is: '+end);
	//launching retrieving of all chapters simultaneously
	for (var i=start;i<end;i++){
		loadChapter(i+1,function(response,num){
			console.log(num);
			chapters[num]=parseChapter(response.responseText, num+1);
			expText.nodeValue = 'Export: Chapter '+String(totalStoryLength-storyLength+1)+' out of '+totalStoryLength;
			storyLength--;
			if (storyLength==0){
			console.log(chapters);
				parseStory(chapters);
				expText.nodeValue='Story (again)';
			}
		});
	}
}
    // Converting chapters' array into a whole;
function parseStory(chapters){
		var numCh= chapters.length;
		//document.body.innerHTML=chapters[0];
		var appendNode=document.getElementById('storytext');
		appendNode.innerHTML= '';
		var firstChapter=true;
    	for (var i=0;i<numCh;i++){
			if (chapters[i]!=undefined){
				//findHeader(chapters[i]);  //smart header search
				var st=chapters[i];
				st.setAttribute('name','ffnee_chapter');
				st.setAttribute('id','ffnee_ch'+i);
				if (firstChapter){
					firstChapter=false;
				}else {
					st.style.marginTop='10em';
				}
				appendNode.appendChild(st);
			}
    	}
    	
	}
function parseChapter(chapterHtml, chapterNumber){
	var t=document.createElement('div');
	t.innerHTML=chapterHtml;
	//extracting text only
	var ev='.//div[@id=\'storytext\']';
	var xpathResult = document.evaluate(ev,t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var chapterContent=document.createElement('div');
	chapterContent.setAttribute('title',getChapterName(t));
	chapterContent.innerHTML = xpathResult.snapshotItem(0).innerHTML;
	// console.log(chapterContent);
	return chapterContent;
}
function getChapterName(obj){
	var select = obj.getElementsByTagName('select')[1].getElementsByTagName('option');
	 for (var i=0;i<select.length;i++){
		 if (select[i].getAttribute('selected')!=null){
			 return(select[i].innerHTML.split(/[. ]{2}/)[1]);
		 }
	}
}
//  Getting number of chapters;
function getLength(){
	var chNum = document.getElementById('chap_select');
	if (chNum==null){
		numChapters = 1;
	}else {
		var numChapters = chNum.getElementsByTagName('option').length;
	}
	return (numChapters);
}
// This function loads chapters and extracts chapter's number and title 
function loadChapter(num,callback){
		var replStr='\/'+String(num)+'\/';
		var hr=location.href;
		var currentURL=hr.replace(/\/\d{1,3}\//,replStr);
		GM_xmlhttpRequest({ //Internal Greesemonkey function - main reason this couldn't work as a bookmarklet.
    		method: 'GET',
    		url: currentURL,
    		onload: function(responseDetails){callback(responseDetails,num-1)}
		});
	}
