// ==UserScript==
// @name           FDZone Extra Smilies
// @namespace     http://userscripts.org/users/61831
// @description    Add extra smilies support
// @include        http://pro.tw.fdzone.org/viewthread.php?*
// @include        http://pro.tw.fdzone.org/post.php?*
// ==/UserScript==

GM_addStyle('.smileybtn { border: 0px; margin-right: 3px } ');
var smileyToolBox = document.createElement('div');
smileyToolBox.setAttribute("style","background-color: #FAFBFC; display: none; z-index: 10;position: absolute; border: 3px #cdbdcd solid;");
var curPage = 1;
var NUM_OF_PER_LINE = 12;
var EX_SMILY_DIV_NAME = 'exSmilyDiv';
var NUM_OF_PAGE_CTRL_PER_LINE = 10;
var TO_PAGE_ATTR_NAME = 'page';

var smilyImgs = new Array(
//========================================================================== * begin monkey

//========================================================================== * end monkey	

//========================================================================== * begin onion
'http://i63.photobucket.com/albums/h153/zach14c/onion/001.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/002.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/003.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/004.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/005.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/006.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/007.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/008.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/009.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/010.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/011.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/012.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/013.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/014.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/015.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/016.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/017.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/018.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/019.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/020.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/021.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/022.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/023.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/024.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/025.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/026.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/027.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/028.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/029.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/030.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/031.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/032.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/033.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/034.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/035.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/036.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/037.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/038.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/039.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/040.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/041.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/042.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/043.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/044.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/045.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/046.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/047.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/048.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/049.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/050.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/051.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/052.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/053.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/054.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/055.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/056.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/057.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/058.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/059.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/060.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/061.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/062.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/063.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/064.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/065.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/066.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/067.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/068.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/069.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/070.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/071.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/072.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/073.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/074.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/075.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/076.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/077.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/078.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/079.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/080.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/081.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/082.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/083.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/084.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/085.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/086.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/087.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/088.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/089.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/090.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/091.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/092.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/093.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/094.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/095.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/096.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/097.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/098.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/099.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/100.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/101.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/102.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/103.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/104.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/105.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/106.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/107.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/108.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/109.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/110.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/111.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/112.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/114.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/115.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/116.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/117.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/118.gif',
'http://i63.photobucket.com/albums/h153/zach14c/onion/119.gif',
'http://i62.photobucket.com/albums/h118/lee62817/113.gif'

//========================================================================== * end onion	
	
);

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

window.addEventListener("load", function(e) 
{
	var ta;
	for(i=0; i< _gt('textarea').length; i++) {
		ta = _gt('textarea')[i];
		appendToolBar(ta);
	}

},false);

getMaxPage = function(){
	var maxPages = smilyImgs.length / NUM_OF_PER_LINE;
	maxPages = maxPages + " ";
	maxPages = parseInt(maxPages);
	
	return maxPages;	
}

goPreviousPage = function(e){
	if( (curPage - 1) <= 0 ){
		return;
	}
	
	curPage--;
	var smilyDiv = _gi(EX_SMILY_DIV_NAME);
	if(smilyDiv) {
		showCurrentPageSmilies(smilyDiv);
	}	
}

goPage = function(e){
	var srcLink = e.target;
	if(srcLink){
		var toPage = srcLink.getAttribute(TO_PAGE_ATTR_NAME);
		curPage = toPage;
		var smilyDiv = _gi(EX_SMILY_DIV_NAME);
		showCurrentPageSmilies(smilyDiv);
	}
	
}

goNextPage = function(e){
	var maxPages = getMaxPage();
	if ( (maxPages * NUM_OF_PER_LINE) < smilyImgs.length ) {
		maxPages++;
	}
	if(curPage + 1 > maxPages){
		return;
	}
	
	curPage++;
	var smilyDiv = _gi(EX_SMILY_DIV_NAME);
	if(smilyDiv) {
		showCurrentPageSmilies(smilyDiv);
	}
}

putImgTag = function(e){
	var srcImg = e.target;
	if(!srcImg){
		return;
	}
	var srcUrl = srcImg.getAttribute("src");
	if(srcUrl != ""){
		addText("[img]" + srcUrl + "[/img]");
	}
}

addText = function (text) {
    var textbox = document.evaluate('//textarea', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null).iterateNext();
    if (textbox.selectionStart || textbox.selectionStart == '0') {
        textbox.value = textbox.value.substring(0, textbox.selectionStart)+ text + textbox.value.substring(textbox.selectionEnd, textbox.value.length); 
    }
    else {
        textbox.value += text; 
    }
     textbox.focus();
}


showCurrentPageSmilies = function(smilyDiv){
	if(smilyDiv.hasChildNodes()){
		var tbls = smilyDiv.getElementsByTagName('table');
		if(tbls.length > 0){
			tbl = tbls[0];
			var tds = tbl.getElementsByTagName('td');
			for(var j = tds.length-1; j >= 0 ; j--){
				td = tds[j];
				td.parentNode.removeChild(td);
			}
			tbl.parentNode.removeChild(tbl);
		}
	}
		
	var smilyTbl = _ce('table');
	var smilyTr = _ce('tr');
		
	for(var i = (curPage - 1) * NUM_OF_PER_LINE ; i < ((curPage - 1) * NUM_OF_PER_LINE + NUM_OF_PER_LINE - 1); i++){	
		var smilyTd = _ce('td');
		var imgLink = _ce('a');
		imgLink.setAttribute('href','javascript: void(0)');
		imgLink.addEventListener('click', putImgTag, true);
	    var smilyImg = _ce('img');
	    smilyImg.className = 'smileybtn';
	    smilyImg.src = smilyImgs[i];
	    smilyImg.setAttribute('alt',smilyImgs[i]);
	    imgLink.appendChild(smilyImg);
	    smilyTd.appendChild(imgLink);
	    smilyTr.appendChild(smilyTd);
	}
	smilyTbl.appendChild(smilyTr);
	smilyDiv.appendChild(smilyTbl);	
}

genQuickPageTbl = function(){
	var maxPages = getMaxPage();
	var quickBarDiv = _ce('div');
	var quickBarTbl = _ce('table');	
	var quickBarTr;
	
	for(var i = 1 ; i <= maxPages ; i++){
		if( (i-1) % NUM_OF_PAGE_CTRL_PER_LINE == 0 ){
			if(quickBarTr){
				quickBarTbl.appendChild(quickBarTr);
				quickBarTr = null;
			}
			quickBarTr = _ce('tr');
		}
		var quickBarTd = _ce('td');
		var quickPageLink = _ce('a');
		quickPageLink.setAttribute('href','javascript: void(0)');
		quickPageLink.setAttribute(TO_PAGE_ATTR_NAME, i);
		quickPageLink.appendChild(_ct(i));
		quickPageLink.addEventListener('click', goPage, true);		
		quickBarTd.appendChild(quickPageLink);
		quickBarTr.appendChild(quickBarTd);
	}
	quickBarTbl.appendChild(quickBarTr);
	quickBarDiv.appendChild(quickBarTbl);
	return quickBarDiv;
}

appendToolBar = function(ta)
{
	
	var toolbarContainer = _ce('div');
	var toolbarTr = _ce('tr');	
	
	//previous button
	var toolbarTd = _ce('td');
	var b4Link = _ce('a');
	b4Link.setAttribute('href','javascript: void(0)');
	b4Link.appendChild(_ct("<"));
	b4Link.addEventListener('click', goPreviousPage, true);
	toolbarTd.appendChild(b4Link);
	toolbarTd.appendChild(_ce('td').appendChild(_ct(" ")));
	toolbarTr.appendChild(toolbarTd);
	
	//image buttons
	var smilyDiv = _ce('div');
	smilyDiv.setAttribute('id', EX_SMILY_DIV_NAME);
	showCurrentPageSmilies(smilyDiv);
	toolbarTd = _ce('td');
	toolbarTd.appendChild(smilyDiv);
	toolbarTr.appendChild(toolbarTd);
	
	//next button
	toolbarTd = _ce('td');
	var afLink = _ce('a');
	afLink.setAttribute('href','javascript: void(0)');
	afLink.appendChild(_ct(">"));
	afLink.addEventListener('click', goNextPage, true);
	toolbarTd.appendChild(afLink);
	toolbarTd.appendChild(_ce('td').appendChild(_ct(" ")));	
	toolbarTr.appendChild(toolbarTd);
	
	//quick page bar
	var quickBarTr = _ce('tr');
	quickBarTr.appendChild(_ce('td'));
	var quickBarDiv = genQuickPageTbl();	
	quickBarTr.appendChild(_ce('td').appendChild(quickBarDiv));
	quickBarTr.appendChild(_ce('td'));
	
	toolbarContainer.appendChild(toolbarTr);
	toolbarContainer.appendChild(quickBarTr);
	ta.parentNode.appendChild(toolbarContainer);
}

