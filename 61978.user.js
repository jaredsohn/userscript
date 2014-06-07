// ==UserScript==
// @name          Power Ficwad.com
// @author        Utimer
// @version       1.0.1
// @description   Enhances Ficwad.com.
// @include       http://*.ficwad.com/*
// @namespace     http://userscripts.org/scripts/show/61978
// @updateURL     http://userscripts.org/scripts/source/61978.meta.js
// @history       1.0.1 Actually use the build-in updater.
// @history       1.0 First version.
// ==/UserScript==

/* begin settings */
var colorDate =  true;
var markWords = ['slash', 'M/M', 'MPREG'];
/* end settings */

var done = false,currentPage = -1,totalPage = -1,currentCat = -1,highestHash=0,lastSepTop = 0,ajaxActivity = false,selects = document.getElementsByTagName('select'),chapterselect,loading;

for (var i = 0; i < selects.length; i++) {
	if (selects[i].name == 'goto') {
		chapterselect = selects[i];
		filterTitles();
	}
}

var storylist = document.getElementById("storylist");
if (storylist)
{
	var catnav = document.getElementsByClassName("catnav");
	if (catnav[0]){
		for (var i = 0; i < catnav[0].childNodes.length; i++) {
			var match = catnav[0].childNodes[i].innerHTML.match(/\[(\d*)\]/);
			if (match)
			{
				currentPage = parseInt(match[1]);
				totalPage = Math.max(totalPage, currentPage);
			}else{
				match = catnav[0].childNodes[i].innerHTML.match(/\[<a href="\/category\/(\d*)\/(\d*)">(\d*)<\/a>\]/);
				if (match)
				{
					currentCat = match[1];
					totalPage = Math.max(totalPage, parseInt(match[3]));
				}
			}
		}
	}
	if (getHash()!= '' &&isFinite(getHash())  && parseInt(getHash()) != currentPage) {
		document.location = getPageLink(getHash());
		setAjaxActivity(true, ' -- JUMPING TO PAGE '+getHash()+" -- ");
	}else{
		for(var i=1;i<catnav.length;i++)
			catnav[i].style.display = 'none';
			
		setInterval(testScrollPositionList,50);
		
		storylist.innerHTML = updateMetas(storylist.innerHTML);
	}
}
var meta = document.getElementsByClassName("meta");
if (meta[0])
	meta[0].innerHTML = updateMetas(meta[0].innerHTML);

	
var storytext = document.getElementById('storytext');
if (storytext)
{
	if (chapterselect) // one or more chapters?
	{
		currentPage = chapterselect.selectedIndex;
		totalPage = chapterselect.options.length - 1;
		
		if (getHash()!= '' && isFinite(getHash()) && parseInt(getHash()) != currentPage) {
			document.location = getChapterLink(getHash());
			setAjaxActivity(true, ' -- JUMPING TO CHAPTER '+getHash()+" ("+getChapterTitle(getHash()) +") -- ");
		}else{
			var header = "<span style=\"background-color:black;color:white;display:block;\">"+currentPage+"/"+totalPage +  ": "+ filterTitle(currentPage, getChapterTitle(currentPage)) + "</span>";
			storytext.innerHTML = header + storytext.innerHTML;
			
			setInterval(testScrollPosition,50);
			
			var chapterforms = document.getElementsByClassName("chapterform");
			for (var i = 1; i < chapterforms.length; i++) {
				chapterforms[i].style.display="none";
			}
		}
	}else{
		var titleheader = document.getElementsByTagName('h4');
		if (titleheader && titleheader[0])
		{
			var title = titleheader[0].innerHTML.match(/<a href="\/story\/(\d*)\/?">(.*?)<\/a>/i);
			if (title && title[2])
				storytext.innerHTML = "<span style=\"background-color:black;color:white;display:block;\">"+filterTitle(currentPage, title[2])+"</span>"+storytext.innerHTML;
		}
		storytext.innerHTML = storytext.innerHTML+"<span style=\"background-color:black;color:white;display:block;\">End of story</span>";
	}
}
makeLoadingBar();

function setAjaxActivity( bool, text )
{
	ajaxActivity = bool;
	if (!text) text = '-- Loading --';
	loading.innerHTML = text;
	loading.style.display = (bool?'inherit':'none');
}

function getChapterTitle( chapter )
{
	return chapterselect.options[chapter].text;
}

function getChapterLink( chapter )
{
	return "http://www.ficwad.com"+chapterselect.options[chapter].value;
}

function getPageLink( page )
{
	return "http://www.ficwad.com/category/"+currentCat+'/'+page;
}

function testScrollPosition()
{
	if ( (currentPage<totalPage) && (!ajaxActivity) && (document.body.offsetHeight-window.pageYOffset<1.5*window.innerHeight) )
	{
		currentPage++;
		setAjaxActivity( true, ' -- Loading chapter '+currentPage+'/'+totalPage+': '+getChapterTitle(currentPage) + ' -- ' );
		getChapter(storytext, getChapterLink(currentPage), getChapterTitle(currentPage) , false );
	}
	
	if ((window.pageYOffset+100) > lastSepTop && (window.pageYOffset-100) < lastSepTop && lastSepTop > 0 && getHash() != currentPage && highestHash < currentPage)
		document.location.hash = highestHash = currentPage;
}

function testScrollPositionList()
{
	if ( (currentPage<totalPage) && (!ajaxActivity) && (document.body.offsetHeight-window.pageYOffset<1.5*window.innerHeight) )
	{
		currentPage++;
		setAjaxActivity( true, ' -- Loading page '+currentPage+'/'+totalPage+' -- ' );
		getList();
	}

	if ((window.pageYOffset+100) > lastSepTop && (window.pageYOffset-100) < lastSepTop && lastSepTop > 0 && getHash() != currentPage)
		document.location.hash = currentPage;
}

function getHash() {
	var hash = document.location.hash;
	return hash.substr(1);
}

function getChapter( storyelm, chapterlink, chapterTitle, addBefore )
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: chapterlink,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		},
		onload: function(responseDetails) {

			var ctext = responseDetails.responseText.match(/<div id="storytext">([\s\S]*?)<\/div>/);
			ctext = ctext[0].replace("<div id=\"storytext\">","");
			var storytext = "<span style=\"background-color:black;color:white;display:block;\" id=\"GEASEMONKEYSEPERATOR"+currentPage+"\">"+currentPage+"/"+totalPage +  ": "+ filterTitle(currentPage, chapterTitle) + "</span>" + ctext;
			if (currentPage == totalPage)
				storytext += "<span style=\"background-color:black;color:white;display:block;\">End of story</span>";
			if (addBefore)
				storyelm.innerHTML = storytext + storyelm.innerHTML;
			else
				storyelm.innerHTML = storyelm.innerHTML + storytext;

			var lastSep = document.getElementById('GEASEMONKEYSEPERATOR'+currentPage);
			if (lastSep)
				lastSepTop = lastSep.offsetTop;
				
			setAjaxActivity( false );
		}
	});
}
function getList()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: getPageLink(currentPage),
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		},
		onload: function(responseDetails) {
			var ctext = responseDetails.responseText.match(/<ul id="storylist">([\s\S]*?)<\/ul>/);
			ctext = ctext[0].replace("<ul id=\"storylist\">","");
			var listtext = "<span style=\"background-color:black;color:white;display:block;\" id=\"GEASEMONKEYSEPERATOR"+currentPage+"\">"+currentPage+"/"+totalPage + "</span>" + updateMetas(ctext);
			if (currentPage == totalPage)
				listtext += "<span style=\"background-color:black;color:white;display:block;\">End of List</span>";

			storylist.innerHTML = storylist.innerHTML + listtext;
			var lastSep = document.getElementById('GEASEMONKEYSEPERATOR'+currentPage);
			if (lastSep)
				lastSepTop = lastSep.offsetTop;
			updateCatNav();
			
			setAjaxActivity( false );
		}
	});
}

function updateMetas( storylistHTML )
{
	for (var i=0;i<markWords.length;i++)
	{
		var exact =  storylistHTML.match(new RegExp(markWords[i], "ig"));
		if (exact)
			storylistHTML = storylistHTML.replace(exact[0], "<span style=\"color: red;\">"+exact[0]+"</span>");
	}
	// Remove the category from the listing, REALLY why list it for EVERY item...
	storylistHTML = storylistHTML.replace(/Category:&nbsp;<a href="\/category\/(\d*?)">(.*?)<\/a> -/ig, '');
	
	// Combine Chapter size and word count into size
	storylistHTML = storylistHTML.replace(/Chapters:&nbsp;(\d*?) -(.*?)- (\d*?)&nbsp;words/ig, function(){
		var chap = parseInt( RegExp.$1 );
		var words = parseInt( RegExp.$3 );
		var rest = RegExp.$2;
		return '<abbr title="Average words per chapter: '+addCommas(Math.round(words/chap))+'">Size:&nbsp;'+addCommas(chap)+'/'+addCommas(words)+'</abbr> - '+ rest;
	});

	// Seperate size generation for stories with only one chapter.
	storylistHTML = storylistHTML.replace(/(Published:&nbsp;\d{4}\/\d{1,2}\/\d{1,2} -)(.*?)- (\d*?)&nbsp;words/ig, function(){
		var chap = 1;
		var words = parseInt( RegExp.$3 );
		var pub = RegExp.$1;
		var rest = RegExp.$2;
		return '<abbr title="Oneshot with '+addCommas(words)+'">Size:&nbsp;'+addCommas(chap)+'/'+addCommas(words)+'</abbr> - '+ pub + rest; 
	});
	
	storylistHTML = storylistHTML.replace(/Published:&nbsp;(\d{4})\/(\d{1,2})\/(\d{1,2}) - Updated:&nbsp;(\d{4})\/(\d{1,2})\/(\d{1,2})(.*?)<\/p>/ig, function(){
		var today = new Date();
		var pubdate = new Date(RegExp.$1, (RegExp.$2-1),RegExp.$3,today.getHours(),today.getMinutes(),today.getSeconds());
		var update = new Date(RegExp.$4, (RegExp.$5-1),RegExp.$6,today.getHours(),today.getMinutes(),today.getSeconds());
		var rest = RegExp.$7;
		var completed = (rest.match("- Complete") != null);
		if (completed)
			rest = rest.replace(/- Complete/,'');
		var output = '';
		var presult = applyColor( pubdate );
		if (completed)
		{
			if ((pubdate - update) != 0) {
				var uresult = applyColor( update );
				output += "<span style=\"color: #EE44EE;\"><abbr title=\"Published :"+pubdate.toDateString()+" ("+presult[1]+"). Updated: "+update.toDateString()+" ("+uresult[1]+")\">Completed "+uresult[1]+" ago</abbr></span>";
			}else{
				output += "<span style=\"color: #EE44EE;\"><abbr title=\"Published :"+pubdate.toDateString()+"\">Completed "+presult[1]+" ago</abbr></span>";
			}
		}else{
			if ((pubdate - update) != 0) {
				var uresult = applyColor( update );
				output += "<abbr title=\""+pubdate.toDateString()+"\">Published:&nbsp;"+presult[1]+"</abbr>";
				output += " - <span style=\"color: "+uresult[0]+";\"><abbr title=\""+update.toDateString()+"\">Updated:&nbsp;"+uresult[1]+"</abbr></span>";
			}else{
				output += "<span style=\"color: "+presult[0]+";\"><abbr title=\""+pubdate.toDateString()+"\">Published:&nbsp;"+presult[1]+"</abbr></span>";
			}
		}
		output += rest+"</p>";
		return output;
	});
	return storylistHTML;
}

function makeLoadingBar()
{
	loading = document.createElement('div');
	loading.style.position = 'fixed';
	loading.style.left = '0px';
	loading.style.right = '0px';
	loading.style.bottom = '0px';
	loading.innerHTML = '-- Loading --';
	loading.style.backgroundColor = 'black';
	loading.style.border="3px solid red";
	loading.style.color = 'white';
	loading.style.padding = '4px';
	loading.style.textAlign = 'center';
	loading.style.display = (ajaxActivity?'inherit':'none');
	document.body.appendChild(loading);
}

function applyColor ( inputDate )
{
	var diff = 0, endresult = '';
	var today = new Date();
	diff = Math.round((today - inputDate)/(1000*60*60*24));
	
	if (colorDate == true) {
		var color = '';
		switch (true) {
			case (diff < 14): color = "#00A000"; break;   // Green
			case (diff < 31): color = "#0000CD"; break;   // Blue
			case (diff < 90): color = "#800080"; break;   // Purple
			case (diff < 180): color = "#FF8C00"; break;  // Orange
			case (diff >= 180): color = "#FF0000"; break; // Red
		}
	}
	
	if (diff == 0) {
		endresult = "Today";
	} else if (diff == 1) {
		endresult = "Yesterday";
	} else {
		var resultArray=new Array();
		var years = Math.floor(diff / 365);
		var weeks = Math.floor((diff % 365) / 7);
		var days = Math.floor(diff % 7);
		if (years > 0) resultArray.push(years+" year"+((years>1?'s':'')));
		if (weeks > 0) resultArray.push(weeks+" week"+((weeks>1?'s':'')));
		if (days  > 0) resultArray.push(days +" day" +((days >1?'s':'')));
		endresult = resultArray.join(', ');
	}
	
	return [color, endresult];
}

function updateCatNav()
{
	var catnav = document.getElementsByClassName("catnav");
	if (catnav[0]){
		for (var i = 0; i < catnav[0].childNodes.length; i++) {
			var match = catnav[0].childNodes[i].innerHTML.match(/\[<a href="\/category\/(\d*)\/(\d*)">(\d*)<\/a>\]/);
			if (match)
			{
				if (currentPage == parseInt(match[2]))
					catnav[0].childNodes[i].innerHTML = '[<a href="javascript:window.scrollTo(0,document.getElementById(\'GEASEMONKEYSEPERATOR'+currentPage+'\').offsetTop)">'+currentPage+'</a>]';
			}
		}
	}
}
function filterTitles()
{
	for (var i=1;i<chapterselect.options.length;i++){
		chapterselect.options[i].innerHTML = filterTitle( i , chapterselect.options[i].innerHTML);
	}
}

function filterTitle( chapnum, title )
{
	var matcher = new RegExp('^'+chapnum+' ?[\.\):]? ?'+chapnum+'', "ig")
	return title.replace(matcher, chapnum);
}

function addCommas(num)
{
	var str = (num+"").split("."),
	dec=str[1]||"",
	num=str[0].replace(/(\d)(?=(\d{3})+\b)/g,"$1,");
	return (dec) ? num+'.'+dec : num;
}
