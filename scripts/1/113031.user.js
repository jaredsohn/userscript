// ==UserScript==
// @name           Texags Watch Highlight
// @namespace      bmc13texagswatchhighlight
// @description    Version 1.1.1
// @icon		   data:image/png;base64,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
// @include        http://www.texags.com/main/*
// @include        http://texags.com/main/*
// @include        http://*.texags.com/main/*
// @include        https://www.texags.com/main/*
// @include        https://texags.com/main/*
// @include        https://*.texags.com/main/*
// ==/UserScript==

/*********  USER-DEFINED VARIABLES  ***********/
/**********************************************/

var eraserSRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjJJREFUeNqkk8+LEmEYx593dlQQVPBvKAg8rAfBREITDXYHD7V0qVuXoTQwPMgSLkgXITxEUEyXZaGiW+y65KUfp6g5epdV9xY0Ooq/nZm3531zxNb11DO8PO+873ze7/d93ncIIQTsiMfjkEqlwOFwwNXCGxBwjM0KQMIUIAlACebPBsBPEygY2EQGRiIRiMVi4HK54JK4bgFN7n56+4yJVXfu2+v+YJNiJpPZBPK1LYCUVD0qdTUNrQiQrr0rfdy5t8WNAXwXYHMw+Nbu8WGpgzClaN6yoNPpwO3a+wMTQMJvbpBsNssdOJ3OZRZFcduyrPCTaxFF73a5MrNPFlk/Pwe/3w+1h/vP1xyg0vZ0Og3ncjnFSIWAoipTZg5YX2s2//YpL+KWcBGeTCbhfD6vzGYzME0T3HeTy0V+L2Cfzwcnj/Zf4OipsAqPx+NwoVBQ0AGH7ea6cxN+nZ3hGhaHq4+fvsRjPEEf34RV5WKxqGD+B2aticrWXoLDp7mDV1jAY8S+8mO0lcvlsjIajdaOot1uYw0F8Hq9sPfhtfyA0Cah5Is9LzLlSqWiDIfDNbjVai1hSZJkwzBUPMw6WflGtEFmdTWYbRtOJBIcdrvd9Ysigq7rajqdlj0eDy8Sa41Gg2c2Fo1G5X6/r+J7/bLbJqByXdM0NRgMygzCPi8WUw6FQvJgMNgI8y0s7Nd7vR4EAgF5Pp/z7Swui4rbWMJXJgS8+AtQ++jxIfyO/0f8EWAADzdBFBtx5MkAAAAASUVORK5CYII=';
var highlighterSRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAfhJREFUeNpi+P//PwMxeG89CycQ26OLMzEQAfY1sPoxsbB/E5DTPQBkT0CRJMJmv/3N3P/fXG///+fT6v+Xllr8B4pNIMoFUJs36obUMAjJaTAw/rrNoOESxyCspJcPcwkjyBRiNP/7tJ3hz48PDH/+STD8+iPJcPfgcoZPT69NxGoALs0/v35i+PL+C8OvvwoM/5jkGZ6dXorpBUKaP739yvCfRYnh49ObDL8+P0c1YHunDg8jKw9ezewivgwfHl9jeH9zMzAG/rrBvTB37lxmRkbGP0xMTAw25pwMiiKXGP58vYOp+cl1hvc3NoE1OzX83g13QXJy8t/v378fcXFxYdh3+CPDjYdyDL9/c6FoBjkbqtkTpBmkD8ULP3780Pzz5w+Ds7Mzw/4TvxmuPNRi+P5dAK753fUNIM0+QM07YHrgXpjQ25nCyMIxG2SAq6srAycnJ8OmTZsYtKS/MEgy3QBqXg/TvBXZUiZoyHv8+3J/Nsj5SkpKYI0fPnxg8PHxYbj4gJ3h+bXdIM3+6JrBLgAmSw8mZtbt/3VyGY5e5WVQVVVlOHv2LMPfv39fAOU/irE8OGrKuSkTqPkXtgTHwsTMsl3TI4nh138uhq8PDzOcPnn5wo8/4lmTJk06TkxGA7sASGcCsR8QTwfiGqBt7xiIBAABBgCq3WnfTNMstwAAAABJRU5ErkJggg==';
var hidethreadbuttonsrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABf0lEQVQ4ja1Ty26CUBCFpHbJorX/QWL8Ew1GEyWBUnTJkp0IicEdFdBojJr4Aj5L60eApTPE2wAVmzSd5ORy59zDzJ0DFPXfwTDM0y8cXcQ/8DxvdbvdU71eF/Ik5Pher3fsdDo2bEt5npZl+d1xnHi328W6rl+azaZEyFqtJkIuQs513VgURTvTSbVafTZN8+T7frzdbhMYhhG2Wq1Bu93ugzgkeTwzGo3OLMu+ZFqwLEtYLpeX/X4fbzabBNPpNAHZYwer1eoCnUrUrRiPx29wIMJKRIDAZ8xBgci2bbloiEnAHQeHw+G7KoHneTFU1u+KMVRV7ZOqaeDVgBvcFXMcJwyHw5BcIQ3MIddoNF5visE2Hq0iYlyDIEiQzqHFWCgjRhs1TTsSB67TjgDGfD7X1+t1SDhc4exHpVIpp99BgwM2eozDAuFnetpgpYgWI4dngJtQ+U9akqTSbDZzF4vFGV72454gEpCDjibwWT8WzZFWFKVcRF65wp/pT/EFEAk0zgbhR9gAAAAASUVORK5CYII=';
var scriptOptionsImgSRC = 'data:image/gif;base64,R0lGODlhWgAPAPcAAAAAAJmZmf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABaAA8AAAirAP8JHEiwoMGDCBMqXMhwYYCGECNKnAjxIcWLGDMqtKixo0eKHD+KHIkw5EABKE+m/IdyZUuWL2HGVClAYMuaMlPG3HnS5kqDJlkWxCmUKM6jPW0aNCpUqVOnTF02TRhU5tOnSKcyHdpz69SmUYv6JFqwateuM4/O/Io1J0GyWcXC5Ap0aVqpSl+STToUL12rgKOuJWiWpGGPhQ8rvph4seOKjyNjbCy5ctmAADs=';

var staffList = Array('WatchOle', 'Liucci', 'JeremyK', 'MWR Admin', 'ooshwa', 'myBCS.com', 'thisladyisacop', 'TLIAC', 'Mr. Traffic', 'gabe_bock', 'Logan Lee', 'ACutt817', 'Brandon Leone', 'TexasA&amp;MFoundation', 'Zerick Rollins', 'AndrewstheMAN', 'Beau Holder', 'Coach Sherrill', 'Jordan Kirkland');
var i,j,k;

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function getImgElementsPartialSrc(searchString,node) 
{
	var classElements = new Array();
	var foundElement = null;
	if ( node == null )
	{
		node = document;
	}
	
	var els = node.getElementsByTagName('img');
	
	var pattern = new RegExp(searchString);
	for (i = 0; i < els.length; i++) {
		if ( pattern.test(els[i].src) ) 
		{
			foundElement = els[i];
			i = els.length;
		}
	}
	
	return foundElement;
}

//use http://www.allprofitallfree.com/color-wheel2.html to pick the color of your choice 
//then copy and paste the 6 digit/letter HTML code after the # sign in place of the old color code

var staffListHighlightColor = '#ffdddd';
var postedHighlightColor = '#ddffdd';
var repliedHighlightColor = '#ddddff';
var repliedHighlightColorLight = '#efefff';

var testPM = /privatemessage.postmessage/;

var testReply = /forum.postreply/;
var testPost = /forum.posttopic/;
var testEdit = /forum.replyedit.asp/;

var testTopic = /forum.topic.asp/;
var testThread = /forum.reply.asp/;
var testWatch = /watchtopics.asp/;

var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;
var testForumLinks = /forum.main.asp/;

var testTopicHTML = /Topic:/;
var url = window.location.href;

console.log("starting");
// if(testThread.test(url)==true){console.log('true');}else{console.log('false');}
// if(testReply.test(url)==true){console.log('true');}else{console.log('false');}
// if(testPost.test(url)==true){console.log('true');}else{console.log('false');}
// if(testPM.test(url)==true){console.log('true');}else{console.log('false');}
// if(testEdit.test(url)==true){console.log('true');}else{console.log('false');}
// if(testTopic.test(url)==true){console.log('true');}else{console.log('false');}
// if(testBCSTopic.test(url)==true){console.log('true');}else{console.log('false');}
// if(testBCSThread.test(url)==true){console.log('true');}else{console.log('false');}
// if(testForumLinks.test(url)==true){console.log('true');}else{console.log('false');}

//var optionsPage = '\'<div align="center" style="font-color:#ffffff;"><table><tbody><tr><td><img src="/images/spacer.gif" width="10" height="20"></td><td></td></tr><tr><td>check box</td><td>option listed here</td></tr></tbody></table></div>\'';

var showHighlightButtons = localStorage.getItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE');
if(showHighlightButtons == null || showHighlightButtons == 'none')
{
	localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','true');
	showHighlightButtons = 'true';
}
var highlightStaffThreads = localStorage.getItem('HIGHLIGHT_STAFF_THREADS_TOPICS_PAGE');
if(highlightStaffThreads == null || highlightStaffThreads == 'none')
{
	localStorage.setItem('HIGHLIGHT_STAFF_THREADS_TOPICS_PAGE','true');
	highlightStaffThreads = 'true';
}
var showHideThreadButtons = localStorage.getItem('SHOW_HIDE_THREAD_BUTTONS');
if(showHideThreadButtons == null || showHideThreadButtons == 'none')
{
	localStorage.setItem('SHOW_HIDE_THREAD_BUTTONS','true');
	showHideThreadButtons = 'true';
}

var showHiddenThreads = localStorage.getItem('SHOW_HIDDEN_THREADS');
if(showHiddenThreads == null || showHiddenThreads == 'none')
{
	localStorage.setItem('SHOW_HIDDEN_THREADS','false');
	showHiddenThreads = 'false';
}
console.log('showing the highlight options? ' + showHighlightButtons);
console.log('highlighting staff threads? ' + highlightStaffThreads);
console.log('show hide thread buttons? ' + showHideThreadButtons);
console.log('show hidden threads? ' + showHiddenThreads);
// do always
var optionsExist = document.getElementById("optionsdiv");

if(optionsExist != null) //add to options page already in page
{
	console.log('options section already added!');
	var tableBody = document.getElementById('optionstablebody');
	var table2row1 = document.createElement('tr');
	var table2row1cell1 = document.createElement('td');
	var table2row1cell2 = document.createElement('td');
	var table2row2 = document.createElement('tr');
	var table2row2cell1 = document.createElement('td');
	var table2row2cell2 = document.createElement('td');
	var table2row3 = document.createElement('tr');
	var table2row3cell1 = document.createElement('td');
	var table2row3cell2 = document.createElement('td');
	var table2row4 = document.createElement('tr');
	var table2row4cell1 = document.createElement('td');
	var table2row4cell2 = document.createElement('td');
		
	var highlightoptionsCB = document.createElement('input');
	highlightoptionsCB.setAttribute('type','checkbox');
	highlightoptionsCB.setAttribute('id','highlightoptionsCB');
	if(showHighlightButtons == 'true')
	{
		console.log('highlightoptionsCB set checked');
		highlightoptionsCB.setAttribute('checked','yes');
	}
	table2row1cell1.appendChild(highlightoptionsCB);
	table2row1cell2.innerHTML = 'Show highlight options on topic pages and watchlist?';
	table2row1.appendChild(table2row1cell1);
	table2row1.appendChild(table2row1cell2);
	tableBody.appendChild(table2row1);
	
	var highlightStaffThreadsCB = document.createElement('input');
	highlightStaffThreadsCB.setAttribute('type','checkbox');
	highlightStaffThreadsCB.setAttribute('id','highlightStaffThreadsCB');
	if(highlightStaffThreads == 'true')
	{
		console.log('highlightStaffThreadsCB set checked');
		highlightStaffThreadsCB.setAttribute('checked','yes');
	}
	table2row2cell1.appendChild(highlightStaffThreadsCB);
	table2row2cell2.innerHTML = 'Highlight threads started by staff?';
	table2row2.appendChild(table2row2cell1);
	table2row2.appendChild(table2row2cell2);
	tableBody.appendChild(table2row2);
	
	var hideThreadButtonsCB = document.createElement('input');
	hideThreadButtonsCB.setAttribute('type','checkbox');
	hideThreadButtonsCB.setAttribute('id','hideThreadButtonsCB');
	if(showHideThreadButtons == 'true')
	{
		console.log('hideThreadButtonsCB set checked');
		hideThreadButtonsCB.setAttribute('checked','yes');
	}
	table2row3cell1.appendChild(hideThreadButtonsCB);
	table2row3cell2.innerHTML = 'Show "Hide Thread" buttons?';
	table2row3.appendChild(table2row3cell1);
	table2row3.appendChild(table2row3cell2);
	tableBody.appendChild(table2row3);
	
	var showHiddenThreadsCB = document.createElement('input');
	showHiddenThreadsCB.setAttribute('type','checkbox');
	showHiddenThreadsCB.setAttribute('id','showHiddenThreadsCB');
	if(showHiddenThreads == 'true')
	{
		console.log('showHiddenThreadsCB set checked');
		showHiddenThreadsCB.setAttribute('checked','yes');
	}
	table2row4cell1.appendChild(showHiddenThreadsCB);
	table2row4cell2.innerHTML = 'Show previously hidden threads?';
	table2row4.appendChild(table2row4cell1);
	table2row4.appendChild(table2row4cell2);
	tableBody.appendChild(table2row4);
	
	var saveButton = document.getElementById('optionssavebutton');
	console.log(saveButton);
	saveButton.addEventListener('click', function(event) { var oSHBTP = document.getElementById('highlightoptionsCB');if(oSHBTP.checked == 'yes' || oSHBTP.checked == true){console.log('saving yes');localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','true');}else{console.log(oSHBTP.checked);console.log('saving no');localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','false');}var oDiv2 = document.getElementById('optionsdiv');oDiv2.style.visibility = 'hidden'; }, false);
	saveButton.addEventListener('click', function(event) { var oHLST = document.getElementById('highlightStaffThreadsCB');if(oHLST.checked == 'yes' || oHLST.checked == true){console.log('highlighting staff threads');localStorage.setItem('HIGHLIGHT_STAFF_THREADS_TOPICS_PAGE','true');}else{console.log(oHLST.checked);console.log('not highlighting staff threads');localStorage.setItem('HIGHLIGHT_STAFF_THREADS_TOPICS_PAGE','false');}var oDiv3 = document.getElementById('optionsdiv');oDiv3.style.visibility = 'hidden'; }, false);
	saveButton.addEventListener('click', function(event) { var oSHTB = document.getElementById('hideThreadButtonsCB');if(oSHTB.checked == 'yes' || oSHTB.checked == true){console.log('showing buttons for hiding threads');localStorage.setItem('SHOW_HIDE_THREAD_BUTTONS','true');}else{console.log(oSHTB.checked);console.log('not showing buttons for hiding threads');localStorage.setItem('SHOW_HIDE_THREAD_BUTTONS','false');}var oDiv4 = document.getElementById('optionsdiv');oDiv4.style.visibility = 'hidden'; }, false);
	saveButton.addEventListener('click', function(event) { var oSHThr = document.getElementById('showHiddenThreadsCB');if(oSHThr.checked == 'yes' || oSHThr.checked == true){console.log('showing hidden threads');localStorage.setItem('SHOW_HIDDEN_THREADS','true');}else{console.log(oSHThr.checked);console.log('not showing buttons for hiding threads');localStorage.setItem('SHOW_HIDDEN_THREADS','false');}var oDiv5 = document.getElementById('optionsdiv');oDiv5.style.visibility = 'hidden'; }, false);
}
else
{
	var headMenuImg = getImgElementsPartialSrc('menu.header.gif',null);
	console.log(headMenuImg);
	if(headMenuImg != null)
	{
		var headerNode = headMenuImg.parentNode;
		
		var overDiv = document.createElement("div");
		overDiv.setAttribute("id","optionsdiv");
        
		overDiv.setAttribute("style","position:relative;overflow:hidden;float:left;width:1;visibility:hidden;");
        
		var transparentDiv = document.createElement("div");
		transparentDiv.setAttribute("style","z-index:100;position:absolute;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.75;-moz-opacity:0.75;filter:alpha(opacity=75);position:fixed;");	
        
		overDiv.appendChild(transparentDiv);
        
        
		var secondDiv = document.createElement('div');
        
		secondDiv.setAttribute('style','z-index:2000;top:0;left:0;background:#ffffff;opacity:1.0;-moz-opacity:1.0;filter:alpha(opacity=100);position:fixed;float:left;');
        
        
		//secondDiv.innerHTML = "<table><tbody><tr><td><input type='checkbox'></td><td>Show highlight options on topic pages and watchlist?</td></tr></tbody></table>";
        
        
		var table1 = document.createElement('table');
        
		var table2 = document.createElement('tbody');
		table2.setAttribute('id','optionstablebody');
        
		var table2row1 = document.createElement('tr');
        
		var table2row1cell1 = document.createElement('td');
        
		var table2row1cell2 = document.createElement('td');
        
		var table2row2 = document.createElement('tr');
        
		var table2row2cell1 = document.createElement('td');
        
		var table2row2cell2 = document.createElement('td');
		var table2row3 = document.createElement('tr');
		var table2row3cell1 = document.createElement('td');
		var table2row3cell2 = document.createElement('td');
 
		var table2row4 = document.createElement('tr');
		var table2row4cell1 = document.createElement('td');
		var table2row4cell2 = document.createElement('td');

		
        
		var highlightoptionsCB = document.createElement('input');
        
		highlightoptionsCB.setAttribute('type','checkbox');
        
		highlightoptionsCB.setAttribute('id','highlightoptionsCB');
        
		if(showHighlightButtons == 'true')
       
		{
            
			highlightoptionsCB.setAttribute('checked','yes');
        
		}
        
		table2row1cell1.appendChild(highlightoptionsCB);
        
		table2row1cell2.innerHTML = 'Show highlight options on topic pages and watchlist?';
        
		table2row1.appendChild(table2row1cell1);
        table2row1.appendChild(table2row1cell2);
        
        table2.appendChild(table2row1);
        
		
		var highlightStaffThreadsCB = document.createElement('input');
		highlightStaffThreadsCB.setAttribute('type','checkbox');
		highlightStaffThreadsCB.setAttribute('id','highlightStaffThreadsCB');
		if(highlightStaffThreads == 'true')
		{
			highlightStaffThreadsCB.setAttribute('checked','yes');
		}
		table2row2cell1.appendChild(highlightStaffThreadsCB);
		table2row2cell2.innerHTML = 'Highlight threads started by staff?';
		table2row2.appendChild(table2row2cell1);
		table2row2.appendChild(table2row2cell2);
		table2.appendChild(table2row2);
		
		var hideThreadButtonsCB = document.createElement('input');
		hideThreadButtonsCB.setAttribute('type','checkbox');
		hideThreadButtonsCB.setAttribute('id','hideThreadButtonsCB');
		if(hideThreadButtonsCB == 'true')
		{
			hideThreadButtonsCB.setAttribute('checked','yes');
		}
		table2row3cell1.appendChild(hideThreadButtonsCB);
		table2row3cell2.innerHTML = 'Show "Hide Thread" buttons?';
		table2row3.appendChild(table2row3cell1);
		table2row3.appendChild(table2row3cell2);
		table2.appendChild(table2row3);
		
		var showHiddenThreadsCB = document.createElement('input');
		showHiddenThreadsCB.setAttribute('type','checkbox');
		showHiddenThreadsCB.setAttribute('id','showHiddenThreadsCB');
		if(showHiddenThreads == 'true')
		{
			showHiddenThreadsCB.setAttribute('checked','yes');
		}
		table2row4cell1.appendChild(showHiddenThreadsCB);
		table2row4cell2.innerHTML = 'Show previously hidden threads?';
		table2row4.appendChild(table2row4cell1);
		table2row4.appendChild(table2row4cell2);
		table2.appendChild(table2row4);
		
		table1.appendChild(table2);

       secondDiv.appendChild(table1);

		var savebutton = document.createElement('input');
		savebutton.setAttribute('id','optionssavebutton');
		savebutton.setAttribute('type','button');
		savebutton.setAttribute('height','30');
		savebutton.setAttribute('value','Save settings');
		//savebutton.setAttribute('onclick',"var o = document.getElementById('highlightoptionsCB');if(o.checked == 'yes' || o.checked == true){console.log('saving yes');localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','true');}else{console.log(o.checked);console.log('saving no');localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','false');}o = document.getElementById('optionsdiv');o.style.visibility = 'hidden';");
		

        var cancelbutton = document.createElement('input');
		cancelbutton.setAttribute('type','button');
		cancelbutton.setAttribute('height','30');
		cancelbutton.setAttribute('value','Cancel');
		cancelbutton.setAttribute('onclick',"var o = document.getElementById('optionsdiv');o.style.visibility = 'hidden';");
        
		var clearButton = document.createElement('input');
		clearButton.setAttribute('id','optionsclearbutton');
		clearButton.setAttribute('type','button');
		clearButton.setAttribute('height','30');
		clearButton.setAttribute('value','Clear all script data');
        clearButton.addEventListener('click', function(event) { var deleteConfirm = confirm ("Are you sure you want to clear all stored data and settings?"); if(deleteConfirm){ localStorage.clear(); } } );
        
		secondDiv.appendChild(savebutton);
		secondDiv.appendChild(cancelbutton);
		secondDiv.appendChild(clearButton);
        
		overDiv.appendChild(secondDiv);
        document.body.appendChild(overDiv);

		try{
		var saveButton2 = document.getElementById('optionssavebutton');
		saveButton2.addEventListener('click', function(event) { var oSHBTP = document.getElementById('highlightoptionsCB');if(oSHBTP.checked == 'yes' || oSHBTP.checked == true){console.log('saving yes');localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','true');}else{console.log(oSHBTP.checked);console.log('saving no');localStorage.setItem('SHOW_HIGHLIGHT_BUTTONS_TOPICS_PAGE','false');}var oDiv2 = document.getElementById('optionsdiv');oDiv2.style.visibility = 'hidden'; }, false);
		saveButton2.addEventListener('click', function(event) { var oHLST = document.getElementById('highlightStaffThreadsCB');if(oHLST.checked == 'yes' || oHLST.checked == true){console.log('highlighting staff threads');localStorage.setItem('HIGHLIGHT_STAFF_THREADS_TOPICS_PAGE','true');}else{console.log(oHLST.checked);console.log('not highlighting staff threads');localStorage.setItem('HIGHLIGHT_STAFF_THREADS_TOPICS_PAGE','false');}var oDiv3 = document.getElementById('optionsdiv');oDiv3.style.visibility = 'hidden'; }, false);
		saveButton2.addEventListener('click', function(event) { var oSHTB = document.getElementById('hideThreadButtonsCB');if(oSHTB.checked == 'yes' || oSHTB.checked == true){console.log('showing buttons for hiding threads');localStorage.setItem('SHOW_HIDE_THREAD_BUTTONS','true');}else{console.log(oSHTB.checked);console.log('not showing buttons for hiding threads');localStorage.setItem('SHOW_HIDE_THREAD_BUTTONS','false');}var oDiv4 = document.getElementById('optionsdiv');oDiv4.style.visibility = 'hidden'; }, false);
		saveButton2.addEventListener('click', function(event) { var oSHThr = document.getElementById('showHiddenThreadsCB');if(oSHThr.checked == 'yes' || oSHThr.checked == true){console.log('showing hidden threads');localStorage.setItem('SHOW_HIDDEN_THREADS','true');}else{console.log(oSHThr.checked);console.log('not showing buttons for hiding threads');localStorage.setItem('SHOW_HIDDEN_THREADS','false');}var oDiv5 = document.getElementById('optionsdiv');oDiv5.style.visibility = 'hidden'; }, false);
		saveButton2.addEventListener('click', function(event) { window.location.reload(); });
        
        
		// build options button
        //--------------------------------------------------------------
		var optionsSpan = document.createElement('span');
		optionsSpan.setAttribute('id','bmc13scriptsettings');
		optionsSpan.setAttribute('onmouseover','this.style.backgroundColor=\'#000000\';');
		optionsSpan.setAttribute('onmouseout','this.style.backgroundColor=\'\';');
		//optionsSpan.setAttribute('onclick','document.body.innerHTML=' + optionsPage + ';');
		optionsSpan.setAttribute('onclick','var o = document.getElementById("optionsdiv");o.style.visibility = "visible";');	
		
		var optionsImg = document.createElement('img');
		optionsImg.setAttribute('src',scriptOptionsImgSRC);
		
		optionsSpan.appendChild(optionsImg);
		
		headerNode.appendChild(optionsSpan);
        //--------------------------------------------------------------
		}catch(err){console.log(err);}
	}
}

if (	testThread.test(url) 
	&& !testReply.test(url) 
	&& !testPost.test(url) 
	&& !testPM.test(url)
	&& !testEdit.test(url)
	&& !testTopic.test(url)
	&& !testBCSTopic.test(url)
	&& !testBCSThread.test(url)
	&& !testForumLinks.test(url))
{
	//var thisAnchor, userLevelImg, userName, agTagImgNode;
	//var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	//console.log("num names: " + allAnchors.snapshotLength);
	var findingtoprow = getElementsByClass('whitestandard',document,'td');

	console.log('found a thread');
	
	if(findingtoprow)
	{
		var storedbefore = false;
		var findTopicID = /topic_id=(\d+)/;
		url.match(findTopicID);
		var topicID = RegExp.$1;
		var findTopicResult = localStorage.getItem(topicID);
		console.log(findTopicResult);
		if(findTopicResult != null && findTopicResult != -1)
		{
			storedbefore = true;
			// i've highlighted this thread before, so set number to 0 to reset unread count
			localStorage.setItem(topicID,'0');
		}
		console.log('topic id = ' + topicID);
		//addEventListener('click', function(event) { if(null == localStorage.getItem(topicID))	localStorage.setItem(topicID, 'none'); }, false);
		console.log('found whitestandard');
		
		for (i = 0; i < findingtoprow.length; i++) 
		
		{
			
			try
			{
				if(testTopicHTML.test(findingtoprow[i].innerHTML))
				{
					var addtoarea = findingtoprow[i].parentNode.lastChild;
					var highlighterorcancelimg = document.createElement('img');
					
					if(storedbefore)
					{
						// show a delete option
						highlighterorcancelimg.setAttribute('src',eraserSRC);
						highlighterorcancelimg.setAttribute('onclick','{console.log(\'trying to delete\');localStorage.setItem(' + topicID + ', -1);}');
                        highlighterorcancelimg.setAttribute('title','Remove this thread from the highlight list');
					}
					else
					{
						// show an highlight option
						highlighterorcancelimg.setAttribute('src',highlighterSRC);
						highlighterorcancelimg.setAttribute('onclick','{console.log(\'trying to highlight\');localStorage.setItem(' + topicID + ', \'0\');}');
                        highlighterorcancelimg.setAttribute('title','Add this thread to the highlight list');
					}
					
					
					var linkelement = document.createElement('a');
					linkelement.setAttribute('href','');
					
					linkelement.appendChild(highlighterorcancelimg);
					
					
					var spacer = document.createElement('img');
					spacer.setAttribute('src','/images/spacer.gif');
					spacer.setAttribute('width','10');
					spacer.setAttribute('height','1');
					spacer.setAttribute('border','0');
					
					addtoarea.insertBefore(spacer, addtoarea.firstChild);
					//addtoarea.insertBefore(spacer, addtoarea.firstChild);
					addtoarea.insertBefore(linkelement,addtoarea.firstChild);
				}
			}
			catch(err)
			{
				console.log(err);
			}
		}
	}
}
else if (testTopic.test(url)) /* look for a topics page */
{
	var thisTopic, topicID, lastReplyCount, currentReplyCount, theFooter, myUserName;
	var findTopicID = /topic_id=(\d+)/; /* regular expression to extract the topic id */
	
	/*******************get the logged in user's name*******************/
	theFooter = getElementsByClass("footer2");
try
{
	myUserName = theFooter[0].childNodes[1].innerHTML;
}
catch(err)
{
	console.log('no user name');
	myUserName = '';
}
	/*******************************************************************/
	
	try
	{
		// get the list of topics
		var topics = getElementsByClass("topics", null, "a");
		
		// go through the list of topics, and color them
		for (i=0; i<topics.length; i++) 
		{
			thisTopic = topics[i];
			thisTopic.href.match(findTopicID);
			topicID = RegExp.$1;
			var hiddenThread = 'false';
			console.log('showing hidden threads? ' + showHiddenThreads);
			if(showHiddenThreads == 'false')
			{
			
				hiddenThread = localStorage.getItem("HIDE_THREAD_BT" + topicID);
				try
				{
					if(hiddenThread != null && hiddenThread == '1')
					{
						hiddenThread = 'true';
					
						// delete thread
						var toPicRow = thisTopic.parentNode.parentNode;
						toPicRow.parentNode.removeChild(toPicRow);
						console.log(topicID + ' hidden');
					}
					if(hiddenThread == null)
					{
						hiddenThread = 'false';
					}
				}
				catch(err)
				{
				}
			}
			console.log('is this thread hidden? ' + hiddenThread);
			if(hiddenThread == 'false')
			{
				lastReplyCount = localStorage.getItem(topicID);
				var thisThreadPoster = thisTopic.parentNode.parentNode.childNodes[3].innerHTML;
				if (lastReplyCount == null || lastReplyCount == -1) // i haven't stored information about this topic before or i decided to not highlight this topic
				{
					if(lastReplyCount == null)
					{
						// was this thread posted by me?
						if (thisThreadPoster == myUserName) 
						{
							// go through all the table cells for the topic and change their background color
							for(j=0;j<thisTopic.parentNode.parentNode.childNodes.length; j++)
							{
								thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = postedHighlightColor;
								thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
							}
							currentReplyCount = thisTopic.parentNode.parentNode.childNodes[4].innerHTML;
							// store this thread with the current number of posts
							localStorage.setItem(topicID, currentReplyCount);
						}
						if(highlightStaffThreads == 'true')
						{
							console.log('highlighting staff threads');
							// go through the staff list to mark their threads
							for(j=0; j<staffList.length; j++)
							{
								if (staffList[j].toUpperCase() == thisThreadPoster.toUpperCase())
								{
									// go through all the table cells for the topic and change their background color
									for(k=0;k<thisTopic.parentNode.parentNode.childNodes.length; k++)
									{
										thisTopic.parentNode.parentNode.childNodes[k].style.backgroundColor = staffListHighlightColor;
										thisTopic.parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
									}
									currentReplyCount = thisTopic.parentNode.parentNode.childNodes[4].innerHTML;
									// store this thread with a -2 until it is actively viewed
									localStorage.setItem(topicID, -2);
									
									// found a staff member, so jump out of the for loop
									j = staffList.length;
								}
							}
						}
					}
				}
				else if ((lastReplyCount == -2 && highlightStaffThreads == 'true') || lastReplyCount >= 0 ) // some information about this topic was in the database
				{
					var bgColor;
					
					if (thisThreadPoster == myUserName)
					{
						// i posted this thread, so set bgcolor to my color
						bgColor = postedHighlightColor;
					}
					else
					{
						// i didn't post this thread, so i am either watching it, i replied to it, or staff posted it
						bgColor = repliedHighlightColor;
						// go through the staff list to mark their threads
						for(j=0; j<staffList.length; j++)
						{
							if (staffList[j].toUpperCase() == thisThreadPoster.toUpperCase())
							{
								bgColor = staffListHighlightColor;
								// found a staff member, so jump out of the for loop
								j = staffList.length;
							}
						}
						
					}
					
					// go through all the table cells for the topic and change their background color to what was set above
					for(j=0;j<thisTopic.parentNode.parentNode.childNodes.length; j++)
					{
						thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = bgColor;
						thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
					}
					currentReplyCount = thisTopic.parentNode.parentNode.childNodes[4].innerHTML;
					
					if(lastReplyCount == 0)
					{
						localStorage.setItem(topicID,currentReplyCount);
					}
					else if (lastReplyCount == -2)
					{
						// i haven't posted on or visited this thread yet, so don't do anything
						thisTopic.setAttribute('onclick','localStorage.setItem(' + topicID + ',' + currentReplyCount +');');
						thisTopic.parentNode.parentNode.childNodes[6].firstChild.setAttribute('onclick','localStorage.setItem(' + topicID + ',' + currentReplyCount +');');
					}
					else if (currentReplyCount != lastReplyCount) 
					{
						// update the current reply count section of the row to say xx + x
						thisTopic.setAttribute('onclick','localStorage.setItem(' + topicID + ',' + currentReplyCount +');');
					thisTopic.parentNode.parentNode.childNodes[6].firstChild.setAttribute('onclick','localStorage.setItem(' + topicID + ',' + currentReplyCount +');');
						var newPosts = currentReplyCount - lastReplyCount;
						if(newPosts != null && newPosts > 0)
						{
							var redFont = document.createElement('font');
							redFont.setAttribute('color','#ff0000');
							redFont.innerHTML = '&nbsp;+&nbsp;' + newPosts.toString(10);
							thisTopic.parentNode.parentNode.childNodes[4].innerHTML = lastReplyCount.toString(10);
							thisTopic.parentNode.parentNode.childNodes[4].appendChild(redFont);
							//thisTopic.parentNode.parentNode.childNodes[4].innerHTML = lastReplyCount +" <font color='red'>+" + (currentReplyCount-lastReplyCount) + "</font>";
						}
						//localStorage.setItem(topicID,currentReplyCount);
					}
				}
				
				// add code here to look at option
				if(showHighlightButtons == null || showHighlightButtons == 'none' || showHighlightButtons == 'true')
				{
					// add highlighter or erase buttons to left side of topics list
					console.log('---------------------------');
					var highlighterorcancelimg = document.createElement('img');
					thisTopic = topics[i];
					thisTopic.href.match(findTopicID);
					topicID = RegExp.$1;
					lastReplyCount = localStorage.getItem(topicID);
					console.log(topicID + " - " + lastReplyCount);
					if (lastReplyCount == null || lastReplyCount == -1 || (lastReplyCount == -2 && highlightStaffThreads == 'false')) // i haven't stored information about this topic before or i decided to not highlight this topic
					{
						// show an highlight option
						highlighterorcancelimg.setAttribute('src',highlighterSRC);
						highlighterorcancelimg.setAttribute('onclick','{console.log(\'trying to highlight\');localStorage.setItem(' + topicID + ', \'0\');window.location.reload();}');
						highlighterorcancelimg.setAttribute('title','Add this thread to the highlight list');
					}
					else
					{
						// show a delete option
						highlighterorcancelimg.setAttribute('src',eraserSRC);
						highlighterorcancelimg.setAttribute('onclick','{console.log(\'trying to delete\');localStorage.setItem(' + topicID + ', -1);window.location.reload();}');
						highlighterorcancelimg.setAttribute('title','Remove this thread from the highlight list');
						highlighterorcancelimg.addEventListener('click', function(event) {console.log('trying to delete');localStorage.setItem(topicID, -1);window.location.reload();}, false);
					}
					
					highlighterorcancelimg.setAttribute('width','16');
					highlighterorcancelimg.setAttribute('height','16');
					highlighterorcancelimg.setAttribute('align','center');
					highlighterorcancelimg.setAttribute('valign','top');
					var spacer = document.createElement('img');
					spacer.setAttribute('src','/images/spacer.gif');
					spacer.setAttribute('width','15');
					spacer.setAttribute('height','1');
					spacer.setAttribute('border','0');
					spacer.setAttribute('align','center');
					spacer.setAttribute('valign','middle');
		
					//newrowcell.appendChild(highlighterorcancelimg);
					//thisTopic.parentNode.parentNode.appendChild(newrowcell);
					var firstCell = thisTopic.parentNode.parentNode.firstChild;
					firstCell.setAttribute('width','60');
					firstCell.insertBefore(spacer,firstCell.firstChild);
					//firstCell.removeChild(firstCell.firstChild);
					firstCell.insertBefore(highlighterorcancelimg,firstCell.firstChild);
					//firstCell.appendChild(highlighterorcancelimg);
				}
				
				if(showHideThreadButtons == null || showHideThreadButtons == 'none' || showHideThreadButtons == 'true')
				{
					thisTopic = topics[i];
					topicRow = thisTopic.parentNode.parentNode;
					topicRow.setAttribute('id','THREAD_BT' + topicID);
					var hideThreadButtonImg = document.createElement('img');
					hideThreadButtonImg.setAttribute('id','BT' + topicID);
					hideThreadButtonImg.setAttribute('src',hidethreadbuttonsrc);
					hideThreadButtonImg.setAttribute('width','16');
					hideThreadButtonImg.setAttribute('height','16');
					//hideThreadButtonImg.setAttribute('valign','top');
					hideThreadButtonImg.setAttribute('style','position:relative;float:right;top:0px;right:0px;');
					hideThreadButtonImg.addEventListener ('click', function(event) { console.log('received click event on ' + this.id); localStorage.setItem("HIDE_THREAD_" + this.id,1);var toPic = document.getElementById('THREAD_' + this.id);if(toPic!=null){toPic.parentNode.removeChild(toPic); } }, false );
					
					thisTopic.parentNode.appendChild(hideThreadButtonImg);
					
					// var tempButton = document.getElementById('BT' + topicID);
					// if(tempButton != null)
					// {
						// tempButton.addEventListener ('click', function(event) { console.log('received click event on '); localStorage.setItem("HIDE_THREAD_" + this.id,1);var toPic = document.getElementById('THREAD_' + this.id);if(toPic!=null){toPic.parentNode.removeChild(toPic); } } );
					// }
				}
			}
		}
	}
	catch(err)
	{
		console.log(err);
	}
}
else if (testReply.test(url) || testPost.test(url)) 
{ // if submit is clicked on a post, add this thread to the highlight list
	var findTopicID = /topic_id=(\d+)/;
	url.match(findTopicID);
	var topicID = RegExp.$1;
	var submitSpan = getElementsByClass("inlinewordbuttons",document,"span");
	submitSpan[0].childNodes[0].childNodes[0].addEventListener('click', function(event) {if(null == localStorage.getItem(topicID)){localStorage.setItem(topicID, 0);}}, false);
}
else if (testWatch.test(url))
{ // add highlight/unhighlight buttons to watchlist
// add code here to look at option
if(showHighlightButtons == null || showHighlightButtons == 'none' || showHighlightButtons == 'true')
{
    var thisTopic, topicID, lastReplyCount, currentReplyCount;
	var findTopicID = /topic_id=(\d+)/; /* regular expression to extract the topic id */

	console.log(myUserName);
	try
	{
		// get the list of topics
		var topics = getElementsByClass("topics", null, "a");
        console.log(topics.length);
		// go through the list of topics
		for (i=0; i<topics.length; i++) 
		{
			// add highlighter or erase buttons to left side of watch list
            console.log('---------------------------');
            var highlighterorcancelimg = document.createElement('img');
			thisTopic = topics[i];
			thisTopic.href.match(findTopicID);
			topicID = RegExp.$1;
			lastReplyCount = localStorage.getItem(topicID);
            console.log(topicID + " - " + lastReplyCount);
			if (lastReplyCount == null || lastReplyCount == -1) // i haven't stored information about this topic before or i decided to not highlight this topic
			{
				// show an highlight option
                highlighterorcancelimg.setAttribute('src',highlighterSRC);
				highlighterorcancelimg.setAttribute('onclick','{console.log(\'trying to highlight\');localStorage.setItem(' + topicID + ', \'0\');window.location.reload();}');
                highlighterorcancelimg.setAttribute('title','Add this thread to the highlight list');
            }
            else
            {
                // show a delete option
                highlighterorcancelimg.setAttribute('src',eraserSRC);
                highlighterorcancelimg.setAttribute('onclick','{console.log(\'trying to delete\');localStorage.setItem(' + topicID + ', -1);window.location.reload();}');
                highlighterorcancelimg.setAttribute('title','Remove this thread from the highlight list');
				
				for(k=0;k<thisTopic.parentNode.parentNode.childNodes.length; k++)
				{
					thisTopic.parentNode.parentNode.childNodes[k].style.backgroundColor = repliedHighlightColorLight;
					//thisTopic.parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
				}
            }
            
			// add code here to look at option
			if(true)
			{
				highlighterorcancelimg.setAttribute('width','16');
				highlighterorcancelimg.setAttribute('height','16');
				highlighterorcancelimg.setAttribute('align','center');
				highlighterorcancelimg.setAttribute('valign','top');
				var spacer = document.createElement('img');
				spacer.setAttribute('src','/images/spacer.gif');
				spacer.setAttribute('width','10');
				spacer.setAttribute('height','1');
				spacer.setAttribute('border','0');
				spacer.setAttribute('align','center');
				spacer.setAttribute('valign','middle');

				//newrowcell.appendChild(highlighterorcancelimg);
				//thisTopic.parentNode.parentNode.appendChild(newrowcell);
				var firstCell = thisTopic.parentNode.parentNode.firstChild;
				firstCell.setAttribute('width','70');
				firstCell.insertBefore(spacer,firstCell.firstChild);
				//firstCell.removeChild(firstCell.firstChild);
				firstCell.insertBefore(highlighterorcancelimg,firstCell.firstChild);
				//firstCell.appendChild(highlighterorcancelimg);
			}
            
        }
    }
    catch(err)
    {
        console.log(err);
    }
}
}


console.log("finito");

// update alt tags to be title tags
//document.body.innerHTML = document.body.innerHTML.replace(/alt=/gi, 'title=');