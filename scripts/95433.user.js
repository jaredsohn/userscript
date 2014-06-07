// ==UserScript==
// @name           Echo Bazaar Unbizarred
// @namespace      http://userscripts.org/users/150266
// @description    UI improvements for Echo Bazaar
// @include        http://echobazaar.failbettergames.com/Me/Landing*
// @include        http://echobazaar.failbettergames.com/Gap/Load*
// ==/UserScript==

/*
* TODO:
* clean up code
* fix story tab travel
* move stats to left side of page
* dynamic CSS (if style ever changes, change with it)
*/

/* 
* Called on page load.
* gets all Tab elements and replaces the onclick attribute
* with custom event listener
* then removes that huge crappy banner
*/
function main() {
	//add our style info
	makeCSS();
	//move flavor text to bottom
	
	//move player stats to right side
	
	//remove banner
	//later just make it smaller
	var areaBanner = document.getElementById('currentAreaSection');
	areaBanner.parentNode.removeChild(areaBanner);
}

/*
* Do CSS stuff
*/
function makeCSS() {
	//start
	document.styleSheets[0].insertRule('input.mini_go_btn { font-size: 1.5em!important}',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { font-weight: normal',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { color: #fff',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/go_btn_bg.jpg)',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { border: 1px solid #640505',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { background-repeat: repeat-x',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { display: inline',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { cursor: pointer',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { margin: 0',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { padding: 2px!important',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { width: auto!important',0);
    document.styleSheets[0].insertRule('input.mini_go_btn { clear: both',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { float: right',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { position: relative',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { right: 7px',0);
	document.styleSheets[0].insertRule('input.mini_go_btn { top: 20px',0);
	//end
	//start
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { font-size: 1.5em!important}',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { font-weight: normal',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { color: #fff',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/standard_btn_bg_greyed.jpg)',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { border: 1px solid #640505',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { background-repeat: repeat-x',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { display: inline',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { cursor: pointer',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { margin: 0',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { padding: 2px!important',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { width: auto!important',0);
    document.styleSheets[0].insertRule('input.mini_go_btn_greyed { clear: both',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { float: right',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { position: relative',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { right: 7px',0);
	document.styleSheets[0].insertRule('input.mini_go_btn_greyed { top: 20px',0);
	//end
	//start
	document.styleSheets[0].insertRule('input.mini_bronze_btn { font-size: 1.5em!important}',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { font-weight: normal',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { color: #fff',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/bronze_btn_bg.png)',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { border: 1px solid #640505',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { background-repeat: repeat-x',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { display: inline',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { cursor: pointer',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { margin: 0',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { padding: 2px!important',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { width: auto!important',0);
    document.styleSheets[0].insertRule('input.mini_bronze_btn { clear: both',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { float: right',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { position: relative',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { right: 7px',0);
	document.styleSheets[0].insertRule('input.mini_bronze_btn { top: 20px',0);
	//end
	//start
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { font-size: 1.5em!important}',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { font-weight: normal',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { color: #fff',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/fatecost_btn_bg.png)',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { border: 1px solid #640505',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { background-repeat: repeat-x',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { display: inline',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { cursor: pointer',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { margin: 0',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { padding: 2px!important',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { width: auto!important',0);
    document.styleSheets[0].insertRule('input.mini_fatecost_btn { clear: both',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { float: right',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { position: relative',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { right: 7px',0);
	document.styleSheets[0].insertRule('input.mini_fatecost_btn { top: 20px',0);
	//end
	//start
	document.styleSheets[0].insertRule('input.mini_gold_btn { font-size: 1.5em!important}',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { font-weight: normal',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { color: #fff',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/gold_btn_bg.png)',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { border: 1px solid #640505',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { background-repeat: repeat-x',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { display: inline',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { cursor: pointer',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { margin: 0',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { padding: 2px!important',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { width: auto!important',0);
    document.styleSheets[0].insertRule('input.mini_gold_btn { clear: both',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { float: right',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { position: relative',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { right: 7px',0);
	document.styleSheets[0].insertRule('input.mini_gold_btn { top: 20px',0);
	//end
	//start
	document.styleSheets[0].insertRule('input.mini_silver_btn { font-size: 1.5em!important}',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { font-weight: normal',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { color: #fff',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/silver_btn_bg.png)',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { border: 1px solid #640505',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { background-repeat: repeat-x',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { display: inline',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { cursor: pointer',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { margin: 0',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { padding: 2px!important',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { width: auto!important',0);
    document.styleSheets[0].insertRule('input.mini_silver_btn { clear: both',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { float: right',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { position: relative',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { right: 7px',0);
	document.styleSheets[0].insertRule('input.mini_silver_btn { top: 20px',0);
	//end
	document.styleSheets[0].insertRule('.mini_storylet h1, .mini_storylet h2, .mini_storylet h3{ font-size: 1em }',0);
	document.styleSheets[0].insertRule('.mini_storylet h1, .mini_storylet h2, .mini_storylet h3{ padding: 0 }',0);
	document.styleSheets[0].insertRule('.mini_storylet h1, .mini_storylet h2, .mini_storylet h3{ margin: 0 0 0 0 }',0);
	document.styleSheets[0].insertRule('.mini_storylet_farright { width: 100px}',0);
	document.styleSheets[0].insertRule('.mini_storylet_farright { float: left}',0);
	document.styleSheets[0].insertRule('.mini_storylet_farright { padding: 0}',0);
	document.styleSheets[0].insertRule('.mini_storylet_farright { margin: 0}',0);
	document.styleSheets[0].insertRule('.mini_storylet_rhs { width: 500px}',0);
	document.styleSheets[0].insertRule('.mini_storylet_rhs { float: left}', 0);
	document.styleSheets[0].insertRule('.mini_storylet_rhs { padding: 0}', 0);
	document.styleSheets[0].insertRule('.mini_storylet_rhs { margin: 0}', 0);
	document.styleSheets[0].insertRule('.mini_storylet_lhs { width: 10px}',0);
	document.styleSheets[0].insertRule('.mini_storylet_lhs { float: left}', 0);
	document.styleSheets[0].insertRule('.mini_storylet_lhs { padding: 0 15px 0 0}', 0);
	document.styleSheets[0].insertRule('.mini_storylet_lhs { margin: 0}', 0);
	document.styleSheets[0].insertRule('.mini_storylet { width: 625px}', 0);
	document.styleSheets[0].insertRule('.mini_storylet { background-image: url(http://images.echobazaar.failbettergames.com.s3.amazonaws.com/storylet_bg.png)}', 0);
	document.styleSheets[0].insertRule('.mini_storylet { background-repeat: repeat-x}', 0)
	document.styleSheets[0].insertRule('.mini_storylet { float: left}', 0);
	document.styleSheets[0].insertRule('.mini_storylet { padding: 6px 0 0 6px}', 0);
	document.styleSheets[0].insertRule('.mini_storylet { margin: 0px 0 0 0}', 0);
	document.styleSheets[0].insertRule('.mini_storylet { min-height: 60px}', 0);
}

/*
* Called when content we care about is being loaded
* then calls the actual content loader contained in external site JS
*/

function myContentLoader(url, tab, callback) {
	myContentLoaderWithParams(url, { 'cb':1 }, tab, callback);
}

function myContentLoaderWithParams(url, params, tab, callback) {
	//call real content loader
	_loadMainContentWithParams(url, params, tab, callback);
	//alert(url + ', ' + params + ', ' + tab + ', ' + callback)
	window.setTimeout(useContent,100);
}

/*
* Check if the content we're looking for is loaded
* if it is do the proper content function
*/

function useContent() {
	var loaded = !(document.getElementById('mainContentLoading').style.display=='inline');
	if (loaded) {
		var id;
		if (document.getElementsByClassName('selected').length<1) {
			id = curTab;
		}
		else
		{
			id = document.getElementsByClassName('selected')[0].id;
			curTab=id;
		}
		if (id=='storyTab') {
			doStoryContent();
		}
	} 
	else 
	{
		window.setTimeout(useContent,100);
	}
}

/*
* Story Tab Function
* Does stuff for the story tab
* Makes storylets into small boxes that expand on keypress
*/

function doStoryContent() {
	//alert('story content start');
	var mainContent = document.getElementById('mainContentViaAjax');
	//alert(mainContent);
	var storylets = mainContent.getElementsByClassName('storylet');
	var oppertunities = document.getElementById('opportunitiesSection');
	//check if storylets exists
	if (storylets) {
		//alert(storylets.length);
		var storyletsFull=new Array();
		var len=storylets.length;
		for(var i=0;i<len;i++) {
			storyletsFull[i]=storylets[i];
		}
		for(var i=len-1;i>=0;i--) {
			storylets[i].parentNode.replaceChild(miniStoryletBuilder(storyletsFull[i]),storylets[i]);
		}
	}
}

/*
* Return a mini storylet based on a regular (full) storylet
* EITHER IS FROM story MAIN TAB or from EVENT ID
*/

function miniStoryletBuilder(storylet) {
	//add minimizer to regular storylet
	var minImg = document.createElement('img');
	minImg.src = minusImg;
	minImg.addEventListener('click',function(event) {
		event.target.parentNode.parentNode.parentNode.replaceChild(miniStorylet, storylet);
	},true);
	storylet.childNodes[1].appendChild(minImg);
	//make miniStorylet element
	var miniStorylet = document.createElement('div');
	miniStorylet.setAttribute('class','mini_storylet');
	//make storylet pieces
	var miniLhs = document.createElement('div');
	miniLhs.setAttribute('class','mini_storylet_lhs');
	var miniRhs = document.createElement('div');
	miniRhs.setAttribute('class','mini_storylet_rhs');
	var miniFarright = document.createElement('div');
	miniFarright.setAttribute('class','mini_storylet_farright');
	//go about making miniStorylet
	var goButton;
	//do expand button
	var expImg = document.createElement('img');
	expImg.src = plusImg;
	expImg.addEventListener('click',function(event) {
		event.target.parentNode.parentNode.parentNode.replaceChild(storylet, miniStorylet);
	},true);
	miniLhs.appendChild(expImg);
	
	//build rest of ministorylet
	//what type of storylet?
	if (storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('h2').length>0) {
		//main storylet
		miniRhs.appendChild(storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('h2')[0].cloneNode(true));
		//var infoTxt = storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('strong')[0];		
		if (storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('strong').length<0){
			miniRhs.appendChild(storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('p')[0].cloneNode(true));
		} 
		else 
		{
			var p = miniRhs.appendChild(document.createElement('p'));
			p.appendChild(document.createTextNode('Unlocked with '));
			p.appendChild(storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('strong')[0].cloneNode(true));
		}
		goButton = storylet.getElementsByClassName('storylet_farright')[0].getElementsByTagName('input')[0].cloneNode(true);
	}
	else
	{
		//secondary storylet (gotten from eventId)
		var buttons = storylet.getElementsByClassName('storylet_farright')[0].getElementsByTagName('input');
		//which button is visible?
		if (buttons[0].style.display=='') {
			goButton=buttons[0].cloneNode(true);
		}
		else
		{
			goButton=buttons[1].cloneNode(true);
		}
		miniRhs.appendChild(storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('h5')[0].cloneNode(true));
		miniRhs.appendChild(storylet.getElementsByClassName('storylet_rhs')[0].getElementsByTagName('p')[1].cloneNode(true));
	}
	goButton.setAttribute('class','mini_'+goButton.getAttribute('class'));
	miniFarright.appendChild(goButton);
	//append ministorylet pieces
	miniStorylet.appendChild(miniLhs);
	miniStorylet.appendChild(miniRhs);
	miniStorylet.appendChild(miniFarright);
	//return the miniStorylet
	return miniStorylet;	
}

/*
* Swap a reduced storylet with a large one
*/
function swapStorylet(newStorylet, oldStorylet) {
	alert(swap);
}

/*
* Where the magic begins
*/
var plusImg = 'data:image/gif;base64,R0lGODlhCgAKAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAAKAAoAAAISjANwi8qWHnQz2YvvipI%2Fz4AFADs%3D';
var minusImg = 'data:image/gif;base64,R0lGODlhCgAKAIABAAAAAP%2F%2F%2FyH5BAEAAAEALAAAAAAKAAoAAAIMjI%2BpywgPo5St2loAADs%3D';
//alert('start');
var _loadMainContentWithParams = unsafeWindow.loadMainContentWithParams;
unsafeWindow.loadMainContentWithParams = myContentLoaderWithParams;
unsafeWindow.loadMainContent = myContentLoader;
var curTab;
main();