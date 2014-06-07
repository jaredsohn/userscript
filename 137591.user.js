// ==UserScript==
// @name          Pixiv Filter Chrome
// @namespace     Pixiv Filter Chrome
// @description   Filters out images with few than the designated users(bookmarks); support Chrome. Just combining code of original Pixiv Filter and GM_ApiBrowerChech by GIJoe from GM forum. See below for author credit of each part.
// @include       http://www.pixiv.net/search.php*
// @include       http://www.pixiv.net/tags.php*
// ==/UserScript==




// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/

//--- to test localStorage in firefox
//delete GM_log; delete GM_getValue; delete GM_setValue; delete GM_deleteValue; delete GM_xmlhttpRequest; delete GM_openInTab; delete GM_registerMenuCommand;

var gvar=function() {} // Global variables
function GM_ApiBrowserCheck() {
  const GMSTORAGE_PATH = 'GM_'; // You can change it to avoid conflict with others scripts
  if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
  if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
  GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
  GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
    var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
    var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
    if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
    return sel;
  }
  var needApiUpgrade=false;
  if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
    needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
  }
  if(typeof(GM_setValue)!='undefined') {
    var gsv=GM_setValue.toString();
    if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
    else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
  } else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

  if(needApiUpgrade) {
    GM_log('Try to recreate needed GM Api...');
    var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
    if(ws=='object') {
      GM_log('Using localStorage for GM Api.');
      GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
      GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
      GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
    } else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
      GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
      GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
      GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
      GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
    }
    if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
    if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
    if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
      GM_log('Using XMLHttpRequest for GM Api.');
      GM_xmlhttpRequest=function(obj) {
        var request=new XMLHttpRequest();
        request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
        request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
        try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
        if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
        request.send(obj.data); return request;
  } } }
}
GM_ApiBrowserCheck();

//--- to test some value defined by GM_ApiBrowserCheck
//GM_clog('isOpera='+gvar.isOpera);
//GM_clog('isGreaseMonkey='+gvar.isGreaseMonkey);
//GM_clog('isBuggedChrome='+gvar.isBuggedChrome);




// ==UserScript==
// @name           Pixiv Filter
// @namespace      Pixiv Filter
// @description    Filters out images with few than the designated users(bookmarks)
// @include        http://www.pixiv.net/search.php*
// @include        http://www.pixiv.net/tags.php*
// ==/UserScript==

var minusers,bookmarks,users,nextpagetop,nextpagebot,nextpagelink,currentpagenum,loadingtop,loadingbot,nextbuttop,nextbutbot,promptbutton;
var maxelements = 20;
var currentelements = 0;

document.body.innerHTML = document.body.innerHTML.replace(/\<div class\=\"user\-ad\-container\"([^]+?)\<\/section\>/, '<div>'); 

minusers = GM_getValue('minimumusers', 10);

var books = document.getElementsByClassName('bookmark-count ui-tooltip');
var table = books[0].parentNode.parentNode.parentNode.parentNode;
		
RemovePageNumbers();

ImageSortInitial();



if (nextpagelink == null)
{
	if (currentpagenum > 1)
	{
		loadingtop.innerHTML = "Showing Page " + currentpagenum;
		loadingbot.innerHTML = "Showing Page " + currentpagenum;
	}
}
else
{
	LoadNextPage(nextpagelink.href);
}


function ImageSortInitial()	
{
	if (minusers > 0)
	{
		var nobooks = document.getElementsByClassName('image');
		for (var i = nobooks.length - 1; i >= 0; --i) 
		{
			var count = nobooks[i].getElementsByClassName('bookmark-count ui-tooltip');
			if (count[0] == null)
			{
				nobooks[i].parentNode.removeChild(nobooks[i]);
			}
		}
	}
	
	
	for (var i = books.length - 1; i >= 0; --i)
	{
			if (books[i].innerHTML != null) 
			{
				parnode = books[i].parentNode.parentNode.parentNode;
				users = /\d+/.exec(books[i].innerHTML);
				if (users < minusers) 
				{
					parnode.parentNode.removeChild(parnode);
				}
				else 
				{
					currentelements++;
					if (maxelements <= currentelements) 
					{
						i=-1;
					}
				}
			}
			else 
			{
				parnode.parentNode.removeChild(parnode);
			}
	}
}

function ImageSort(currentdoc)	
{
	    var currentlinks = currentdoc.getElementsByClassName('ui-scroll-view');
    var tempstring = "";
	for (var i = currentlinks.length - 1; i >= 0; --i)
	{
        if (currentlinks[i].parentNode.innerHTML != null) 
		{
            tempstring = "src" + /\=([^]+?)\"/.exec(/data-src\=\"([^]+?)\"/.exec(currentlinks[i].parentNode.innerHTML));
            currentlinks[i].parentNode.innerHTML = currentlinks[i].parentNode.innerHTML.replace(/src\=\"([^]+?)\"/, tempstring);
		}
	}
    var currentbooks = currentdoc.getElementsByClassName('bookmark-count ui-tooltip');
	for (var i = currentbooks.length - 1; i >= 0; --i)
	{
			if (currentbooks[i].innerHTML != null) 
			{
				users = /\d+/.exec(currentbooks[i].innerHTML);
				if (users >= minusers) 
				{
					parnode = currentbooks[i].parentNode.parentNode.parentNode;
					table.appendChild(parnode);
					currentelements++;
					if (currentelements >=  maxelements) 
					{
						i=-1;
					}
				}
			}
	}
}

function RemovePageNumbers()	
{
	var pagers = document.getElementsByClassName('pager');
	var pagenodes;
	currentpagenum = /\d+/.exec(/p\=\d+/.exec(window.location));
	
	pagenodes = pagers[0].firstChild.getElementsByTagName("li");
	for (var d = pagenodes.length - 1; d >= 0; --d)
	{
		if (pagenodes[d].className == "current") 
		{
			loadingtop = pagenodes[d];
			pagenodes[d].innerHTML = "Loading...";
		}
		else if (pagenodes[d].className == "next")
		{
			nextpagetop = pagenodes[d].firstChild;
			nextpagelink = pagenodes[d].firstChild;
			nextbuttop = pagenodes[d];
			nextbuttop.style.visibility = 'hidden';
		}
		else 
		{
			pagenodes[d].parentNode.removeChild(pagenodes[d]);
		}
	}
		
	pagenodes = pagers[1].firstChild.getElementsByTagName("li");
	for (var d = pagenodes.length - 1; d >= 0; --d)
	{
		if (pagenodes[d].className == "current") 
		{
			loadingbot = pagenodes[d];
			pagenodes[d].innerHTML = "Loading...";
		}
		else if (pagenodes[d].className == "next")
		{
			nextpagebot = pagenodes[d].firstChild;
			nextpagelink = pagenodes[d].firstChild;
			nextbutbot = pagenodes[d];
			nextbutbot.style.visibility = 'hidden';
			currentpagenum = /\d+/.exec(/p\=\d+/.exec(nextpagelink.href)) - 1;
			
			promptbutton = document.createElement("div");
			
			//promptbutton.innerHTML = "<input class='btn_type09' name='btns[submit_index]' value='Minimum Users' type='submit' />";
			promptbutton.innerHTML = '<ul><li><input type="submit" name="minurs" value="Minimum Users"  class="btn_type09" /></ul></li>';
			pagenodes[d].parentNode.appendChild(promptbutton);

			
			promptbutton.addEventListener("click",  function() {
				var input = prompt("Minimum number of users(bookmarks):", 10);
				var request = /\d+/.exec(input);
				if (request != null)
				{
					minusers = parseInt(request[0]);
					window.setTimeout(function() {								
					GM_setValue('minimumusers', minusers);
					}, 0);
				}
				window.location.reload();
			}, false); 
		}
		else 
		{
			pagenodes[d].parentNode.removeChild(pagenodes[d]);
		}
	}
	
}

function LoadNextPage(nextpageurl)
{
	
	var loadpagenum = /\d+/.exec(/p\=\d+/.exec(nextpageurl));
	loadingtop.innerHTML = "Loading Page " + loadpagenum + "...";
	loadingbot.innerHTML = "Loading Page " + loadpagenum + "...";
	
	GM_xmlhttpRequest({
	method: "GET",
	url: nextpageurl,

	onload: function(response)
	{	
		var clutterfree = response.responseText.replace(/\<section class\=\"showcase\"([^]+?)\<\/section\>/, '');	
		var preextraction = /\<section id\=\"search\-result\"([^]+?)\<\/section\>/.exec(clutterfree);
var classreg = "img style\=\"opacity\: 1\;\" class"
        var extraction = preextraction[0].replace(/img class/g, classreg);   
		var tempnode = document.createElement('div');
		tempnode.innerHTML = '<section id="search-result"' + extraction + '</section>';
		ImageSort(tempnode);

		if (maxelements > currentelements) 
		{
			var pagercontent = /\<nav class\=\"pager([^]+?)\<\/nav\>/.exec(clutterfree);
			var pagerul = /\<ul\>([^]+?)\<\/ul\>/.exec(pagercontent);
			var tempulnode = document.createElement('div');
			tempulnode.innerHTML = '<ul>' + pagerul[0] + '</ul>';
			if (tempulnode.innerHTML != null) 
			{
				var nextpagenodes = tempulnode.getElementsByTagName("li");
				for (var d = nextpagenodes.length - 1; d >= 0; --d)
				{
					
					if (nextpagenodes[d].className == "next")
					{
						nextpagelink = nextpagenodes[d].firstChild;
						LoadNextPage(nextpagelink.href);
						
						d = -1;
					}
					else if (d <= 0)
					{
						loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
						loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
					}
				}
			}		
		}
		else
		{
			loadingtop.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
			loadingbot.innerHTML = "Showing Pages " + currentpagenum + " to " + loadpagenum;
			nextpagetop.href = nextpagelink.href;
			nextpagebot.href = nextpagelink.href;
			nextbuttop.style.visibility = 'visible';
			nextbutbot.style.visibility = 'visible';
            //var extraction2 = /\<section id\=\"search\-result\"([^]+?)\<\/section\>/.exec(document.documentElement.innerHTML);
            //alert(extraction2);
		} 
	} 
});

}


