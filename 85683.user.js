// ==UserScript==
// @name           LookupWord
// @namespace      http://userscripts.org/scripts/show/85683
// @description    Highlight the word and choose the website you want to get more information.
// @resource searchicon  http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/glassicon.png
// @resource grayicon    http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bglassicon.png
// @include  *
// ==/UserScript==

var txtSel; 
var currentURL;

document.addEventListener('mouseup', ShowIcon, false);
document.addEventListener('mousedown', Clearing, false);

function Clearing(evt){
    
	var divMenu = getId('divMenu');
	if(divMenu)
	{
		if(!clickedInsideID(evt.target,'divMenu'))
			divMenu.parentNode.removeChild(divMenu);
	}	
}

function ShowIcon(evt){
	if(!evt.ctrlKey && GM_getValue('ctrl'))
		return;
		
	var divMenu = getId('divMenu');
	txtSel = getSelection(evt);
	
	//if no text is selected
	if(!txtSel || txtSel=="")
	{
		if(divMenu)
		{
			if(!clickedInsideID(evt.target,'divMenu'))
				divMenu.parentNode.removeChild(divMenu);
		}
		return;
	}
	if(divMenu)
	{
		if(!clickedInsideID(evt.target,'divMenu'))
			divMenu.parentNode.removeChild(divMenu);
		return;
	}
	
	//no text selected
	if(!txtSel || txtSel=="")
	{
		if(divMenu = getId('divMenu'))
			divMenu.parentNode.removeChild(divMenu);
		return;
	}	
	//cleanup divs
	if(divMenu = getId('divMenu'))
	{
		divMenu.parentNode.removeChild(divMenu);
	}
	
	 divMenu = createElement('div', {id:'divMenu', style:'cursor: pointer; cursor: hand; border : 5px solid #3366FF; background-color: #CCCCFF; position:absolute; top:'+(evt.clientY+window.pageYOffset+10)+'px; left:'+(evt.clientX+window.pageXOffset+10)+'px; padding:1px 1px 1px 1px; z-index:100; -moz-border-radius: 36px / 12px; -moz-box-shadow: 2px 2px 6px rgba(0,0,0,0.6);'});
   document.body.appendChild(divMenu);
	var divSearch = null;
	divSearch = createElement('div', {id:'divSearch', style:'overflow:auto; padding:1px;'}, null);
	var searchicon = createElement('img',{id:'searchicon',border:0}); 
	searchicon.src = GM_getResourceURL("searchicon");
	divSearch.appendChild(searchicon);
  var grayicon = createElement('img',{id:'grayicon',border:0});
	grayicon.src = GM_getResourceURL("grayicon");
	searchicon.addEventListener('mouseover',function(evt){divSearch.replaceChild(grayicon,searchicon);}, false);
	grayicon.addEventListener('mouseout',function(evt){divSearch.replaceChild(searchicon,grayicon);}, false);
	divSearch.addEventListener('click',wansearch, false);
	divMenu.appendChild(divSearch);
}

function wansearch(evt)
{    
	var divoption = null;
	var divResult = null;
	var divMenu = getId('divMenu');
	var selecttxt,tmptxt;
	var wscreen = (screen.availWidth-640)/2;
	var hscreen = (screen.availHeight-640)/2;
	divMenu.setAttribute('style','border : 5px solid #3366FF; background-color: #CCCCFF; position: fixed; top: '+hscreen+'px; left: '+wscreen+'px; padding:5px 5px 5px 5px; z-index:100; -moz-border-radius: 10px 10px 10px 10px;'); 
	
	if(divSearch = getId('divSearch'))
	{
		divSearch.parentNode.removeChild(divSearch);
	}	
	
	String.prototype.Ltrim = function () {
        var reExtraSpace = /^\s+(.*?)\s+$/;
        return this.replace(reExtraSpace, "$1");
    };

	tmptxt = window.getSelection().toString();
	window.getSelection().removeAllRanges();
	selecttxt = tmptxt.Ltrim();
	selecttxt = Rtrim(selecttxt);
	
	divResult = createElement('div', {id:'divResult', style:'overflow:auto; padding:1px;'}, null);
	divMenu.appendChild(divResult);
	
	divoption = createElement('div', {id:'divoption', style:'overflow:auto; padding:1px;'}, null);
	divMenu.insertBefore(divoption,divResult);
  var longdo = createElement('img',{id:'longdo', title:'Longdo Dictionary', border:0, style:'cursor:pointer; cursor:hand;'});
	longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
	var bing = createElement('img',{id:'bing', title:'Bing', border:0, style:'cursor:pointer; cursor:hand;'});
	bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	var wiki = createElement('img',{id:'wiki', title:'Wikipedia', border:0, style:'cursor:pointer; cursor:hand;'});
	wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';
	var google = createElement('img',{id:'google', title:'Google', border:0, style:'cursor:pointer; cursor:hand;'});
	google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	var googletrans = createElement('img',{id:'googletrans', title:'GoogleTranslate', border:0, style:'cursor:pointer; cursor:hand;'});
	googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
	var youtube = createElement('img',{id:'youtube', title:'Fooooo', border:0, style:'cursor:pointer; cursor:hand;'});
	youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
  var facebook = createElement('img',{id:'facebook', title:'Facebook', border:0, style:'cursor:pointer; cursor:hand;'});
	facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	var twitter = createElement('img',{id:'twitter', title:'Twitter', border:0, style:'cursor:pointer; cursor:hand;'});
	twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';
	var closedisplay = createElement('img',{id:'closedisplay', title:'Close this window', border:0,align:'right', style:'cursor:pointer; cursor:hand;'});
	closedisplay.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/closeicon.gif';
	var amazon = createElement('img',{id:'amazon', title:'Amazon', border:0, style:'cursor:pointer; cursor:hand;'});
	amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';
	divoption.appendChild(wiki);
	divoption.appendChild(bing);
	divoption.appendChild(google);
	divoption.appendChild(googletrans);
	divoption.appendChild(longdo);
	divoption.appendChild(youtube);
	divoption.appendChild(amazon);
	divoption.appendChild(facebook);
	divoption.appendChild(twitter);
	divoption.appendChild(closedisplay);	
	wiki.addEventListener('mouseover',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bwikipediaicon.png';}, false);
	wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
	wiki.addEventListener('click',function(evt){getwiki(selecttxt);}, false);
  bing.addEventListener('mouseover',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bbingicon.png';}, false);
	bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
	bing.addEventListener('click',function(evt){getbing(selecttxt);}, false);
	longdo.addEventListener('mouseover',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/blongdodictthai.png';}, false);
	longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	longdo.addEventListener('click',function(evt){getlongdo(selecttxt);}, false);
	google.addEventListener('mouseover',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgoogleicon.png';}, false);
	google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	google.addEventListener('click',function(evt){getgoogle(selecttxt);}, false);
	googletrans.addEventListener('mouseover',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bggticon.png';}, false);
	googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	googletrans.addEventListener('click',function(evt){getgoogletranslate(selecttxt);}, false);
	youtube.addEventListener('mouseover',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bfooooo.jpg';}, false);
	youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
	youtube.addEventListener('click',function(evt){getyoutube(selecttxt);}, false);
	amazon.addEventListener('mouseover',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bamazonicon.png';}, false);
	amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
	amazon.addEventListener('click',function(evt){getamazon(selecttxt);}, false);
	closedisplay.addEventListener('click',function(evt){divMenu.parentNode.removeChild(divMenu);}, false);
	facebook.addEventListener('mouseover',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bfacebookicon.png';}, false);
	facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
	facebook.addEventListener('click',function(evt){getfacebook(selecttxt);}, false);
	twitter.addEventListener('mouseover',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/btwittericon.png';}, false);
	twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	twitter.addEventListener('click',function(evt){gettwitter(selecttxt);}, false);        
}

function getwiki(selecttxt){
	var divResult = getId('divResult');
	var searchtext = selecttxt;
	currentURL = "http://en.wikipedia.org/w/index.php?title=Special%3ASearch&search="+searchtext;
	divResult.innerHTML = '<iframe src="'+currentURL+'" id="iwikipedia" frameborder="0" height="400" width="640"></iframe>';
	  var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgwikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgwikipediaicon.png';}, false);
	  var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	  var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	  var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getgoogle(selecttxt){
	var divResult = getId('divResult');
  var searchtext = selecttxt;
	currentURL = "http://www.google.co.th/search?q="+searchtext;
	divResult.innerHTML = '<iframe src="'+currentURL+'" id="igoogle" frameborder="0" height="400" width="640"></iframe>';
	  var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bggoogleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bggoogleicon.png';}, false);
	  var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	 var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	 var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getlongdo(selecttxt){
	var divResult = getId('divResult');
  var searchtext = selecttxt;   
  currentURL = "http://dict.longdo.com/search/"+selecttxt;
	divResult.innerHTML = '<iframe src="'+currentURL+'" id="ilongdo" frameborder="0" height="400" width="640"></iframe>';
	 var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bglongdodictthai.png';
	  longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bglongdodictthai.png';}, false);
	 var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	 var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	  var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getgoogletranslate(selecttxt){	
	  var divResult = getId('divResult');
    var searchtext = selecttxt;  
    currentURL = "http://translate.google.co.th/?hl=th&tab=wT#en|th|"+selecttxt;
	 divResult.innerHTML = '<iframe src="'+currentURL+'" id="igoogletranslate" frameborder="0" height="400" width="640"></iframe>';
	 var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgggticon.png';
	  googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgggticon.png';}, false);
	 var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	 var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	  var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getyoutube(selecttxt){
    var divResult = getId('divResult');
    var searchtext = selecttxt;  
    currentURL = "http://en.fooooo.com/search/"+searchtext;
	 divResult.innerHTML = '<iframe src="'+currentURL+'" id="iyoutube" frameborder="0" height="400" width="640"></iframe>';
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgfooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgfooooo.jpg';}, false);
	  var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	  var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	  var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	  var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getfacebook(selecttxt){	
    var divResult = getId('divResult');
    divResult.setAttribute('style','background-color:#FFFFFF;');
    var searchtext = selecttxt;    
    currentURL = "http://www.facebooksearch.us/q/"+selecttxt+"/5";
	  divResult.innerHTML = '<iframe src="'+currentURL+'" id="ifacebook" frameborder="0" height="400" width="640"></iframe>';
    var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
    bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
	 var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/grayfacebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/grayfacebookicon.png';}, false);
	 var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	 var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	 var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	 var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function gettwitter(selecttxt){	
	  var divResult = getId('divResult');
    var searchtext = selecttxt;  
    currentURL = "http://search.twitter.com/search?q="+selecttxt;
	  divResult.innerHTML = '<iframe src="'+currentURL+'" id="itwitter" frameborder="0" height="400" width="640"></iframe>';
	  var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgtwittericon.png';
	  twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgtwittericon.png';}, false);
	  var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
 	 var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	 youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getbing(selecttxt){	
	  var divResult = getId('divResult');
    var searchtext = selecttxt;  
    currentURL = "http://www.bing.com/search?q="+selecttxt+"&go=&form=QBLH&qs=n&sk=";
	  divResult.innerHTML = '<iframe src="'+currentURL+'" id="ibing" frameborder="0" height="400" width="640"></iframe>';
    var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgbingicon.png';
    bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgbingicon.png';}, false);
	 var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
	 var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	 var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	 var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';  
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/amazonicon.png';}, false);
}

function getamazon(selecttxt){
   var divResult = getId('divResult');
   var searchtext = selecttxt;
   currentURL = "http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords="+searchtext+"&x=0&y=0";
   divResult.innerHTML = '<iframe src="'+currentURL+'" id="iamazon" frameborder="0" height="400" width="640"></iframe>';
    var amazon = getId('amazon');
    amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgamazonicon.png';
    amazon.addEventListener('mouseout',function(evt){amazon.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bgamazonicon.png';}, false);
	 var google = getId('google');  
    google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';
	  google.addEventListener('mouseout',function(evt){google.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/googleicon.png';}, false);
    var bing = getId('bing');
    bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';
	  bing.addEventListener('mouseout',function(evt){bing.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/bingicon.png';}, false);
    var longdo= getId('longdo');
    longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';
    longdo.addEventListener('mouseout',function(evt){longdo.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/longdodictthai.png';}, false);
	  var googletrans= getId('googletrans');
    googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';
    googletrans.addEventListener('mouseout',function(evt){googletrans.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/ggticon.png';}, false);
	  var youtube= getId('youtube');
    youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';
	  youtube.addEventListener('mouseout',function(evt){youtube.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/fooooo.jpg';}, false);
    var facebook = getId('facebook');
    facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';
	  facebook.addEventListener('mouseout',function(evt){facebook.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/facebookicon.png';}, false);
    var twitter= getId('twitter');
    twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';  
    twitter.addEventListener('mouseout',function(evt){twitter.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/twittericon.png';}, false);
	  var wiki = getId('wiki');
    wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';	
    wiki.addEventListener('mouseout',function(evt){wiki.src = 'http://harmonia.acc.chula.ac.th/~wilaiporn2010/picture/wikipediaicon.png';}, false);
}

function Rtrim(trimtxt)
{
	var temp = trimtxt;
	while (temp.substr(trimtxt.length-1,1) == " ")
	{
		temp = trimtxt.slice(0,trimtxt.length-1);
	}
	return temp;
}

function trim(str){
	return str.replace(/^\s+/,'').replace(/\s+$/,'');
}

function getSelection(evt){
	var txt = null;
	//get selected text
	if(evt && evt.target.nodeName=='TEXTAREA')
	{
		 txt = evt.target.value.substr(evt.target.selectionStart, evt.target.selectionEnd - evt.target.selectionStart); 
	}
	else if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	return txt;
}

function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);
	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}
	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
	if(html) 
		node.innerHTML = html;
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function clickedInsideID(target, id) {
	if (target.getAttribute('id')==id)
		return getId(id);
	
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target.getAttribute('id')==id)
					return getId(id);
			}catch(e){
			}
		}
	}
	return null;
}


//---------------------- start about IP ----------------------
function $(s) {
    return document.getElementById(s);
}

function getElementsByClassName(className, tagName) {
    tagName = typeof(tagName) != 'undefined' ? tagName : '*';
    var result = new Array();
    var c = 0;
    var tags = document.getElementsByTagName(tagName);
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className == className) {
            result[c++] = tags[i];
        }
    }
    return result;
}

function findLeft(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        do curleft += obj.offsetLeft;
        while ((obj = obj.offsetParent));
        
        return [curleft];
    }
    return false;
}

function initial() {
    window.iCounter=0;
	//regular expression of IP Address
    var rgexp = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/ig;

    jap = document.evaluate('.//text()[normalize-space(.) != ""]',document.body,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

    for (var i = 0, item;
        (item = jap.snapshotItem(i)); i++) {
        var source = item.data;

        if (rgexp.test(source)) {
        var span = document.createElement("span");
        item.parentNode.replaceChild(span, item);
        result=source.match(rgexp);
        var nre = new RegExp(rgexp);
        startIndex=0;
        for (var j=0;j<result.length;j++){
            var m = nre.exec(source);
            //get ony text
            var nont =source.substr(startIndex, m.index-startIndex);
            span.appendChild(document.createTextNode(nont));
            span.appendChild(getdb(m));
            //create new index
            startIndex=m[0].length+m.index;
        }
        //get the text again after found ip
        span.appendChild(document.createTextNode(source.substr(startIndex)));
        span.normalize();
        }
    }
}

function getdb(ip) {
    var db = document.createElement("span");
    db.id = 'iBox_' + ++window.iCounter;
    db.innerHTML=ip;
    db.className = 'iBox';
    db.setAttribute('style', ' background-color: #FFFF00; border : 1px dotted #FF6633 '); 
    db.addEventListener("mouseover", createDiv, false);
    db.addEventListener("mouseout", function () { this.firstChild.nextSibling.style.display='none'}, false);
    return db;
}

function createDiv() { 
//creates DIV
    var ip = this.innerHTML;
    var i = this.id.replace('iBox_', '');
    tmp=i;
        if ($('iCon_' + i)) {
        $('iCon_' + i).style.display = '';
        $('iCon_' + i).style.left = findLeft(this);
        
      }
    else {
        var d = document.createElement('div');
        d.className = 'iCon';
        d.setAttribute('style', 'font-family: arial;font-size: 12px; font-style:normal; font-weight:bolder; font-color:#FF3300; position:absolute; text-align:left; border : 5px solid #FF6600; -moz-border-radius: 20px 20px 20px 20px;  background-color: #FFFF33; padding:10px 10px 10px 10px;z-index:100;');
        d.style.left = findLeft(this)+'px';
        d.id = 'iCon_' + i;
        d.innerHTML = getInner(ip);
        $('iBox_' + i).appendChild(d);
        }

}

function getInner(ip) { 
	//get ip from http://www.geoplugin.net
    var str = 'IP Address: '+ip;
    str += '<div id="resultPlaceHolder_'+tmp+'">Retrieving Information...</div>';
   loadJS('http://www.geoplugin.net/json.gp?ip=' +ip);
    return str;
}

function loadJS(url) {
    setTimeout(function () {
        doRequest(url);
    }, 0);
}


function doRequest(url) {
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
            'Accept': 'application/json'
        },
        onload: function (xhr) {
            response = eval(xhr.responseText);
        }
    });
}
function geoPlugin(obj){
// show more detail about selected IP Address        
     if (obj.geoplugin_countryName){
         var str='';
         if (obj.geoplugin_city!=""){
     str+='City : '+obj.geoplugin_city;
     
 }
 if (obj.geoplugin_regionName){
     str+='<br>Region : '+obj.geoplugin_regionName;
 }
    str+='<br>Country : '+obj.geoplugin_countryName;
    str+=' &nbsp; <img src="http://www.translatorscafe.com/cafe/images/flags/'+obj.geoplugin_countryCode+'.gif" alt="'+obj.geoplugin_countryCode+'">'

 str+='<br>'
 
 $('resultPlaceHolder_'+tmp).innerHTML=str;
}
else if (obj && obj.geoplugin_countryName==''){
     $('resultPlaceHolder_'+tmp).innerHTML="This IP Adress is a reserved IP Address!"
}
else $('resultPlaceHolder_'+tmp).innerHTML="Error";
}

initial();