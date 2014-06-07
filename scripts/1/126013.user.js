// ==UserScript==
// @name           Twitter Drafts
// @namespace      http://frozengoods.wordpress.com
// @author         freezer52000
// @description    Save tweets to drafts before publishing them
// @version        1.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://*.twitter.com/*
// @include        https://*.twitter.com/*
// ==/UserScript==

function c1 (q,root){return document.evaluate(q,root?root:document,null,9,null).singleNodeValue;}

function safe_unescape(str) {
	str = unescape(str);
	str = str.replace("\\", "");
	str = str.replace("<", "");
	str = str.replace(">", "");
	return str;
}

function draftbutton_click () {
  return function (e) {
    var gmbinder, s_gm = document.createElement('div');
    if (gmbinder = c1('.//div[contains(@id,"gmbinder")]')) {
      document.body.removeChild(gmbinder);
    }
    
//    alert("showing window");
    s_gm.type = 'text/html';
    s_gm.id = 'yegmbinder';
    var text = "<div id=tweet_dialog class=\"twttr-dialog-container draggable ui-draggable\" \
    style=\"top: 0px; left: 150px; top: 200px; width: 500px; position: absolute; visibility: visible; display: block;\"> \
	<div class=\"twttr-dialog\" data-component-term=\"tweet_dialog\" style=\"width: 500px; height: auto;\"> \
		<div class=\"twttr-dialog-header js-twttr-dialog-draggable\">\
			<h3>Select Draft</h3>\
			<a href=\"javascript:yeCloseDraftWin()\"><div class=\"twttr-dialog-close\">\
			<b>\xD7</b></div></a>\
		</div>\
		<div class=\"twttr-dialog-inside\">";

    var numSaved = parseInt(localStorage.getItem("twitterDrafts_numSaved"));
    if (!numSaved)
    {
	text = text + "No drafts saved.<br>"
    }
    else
    {
	text = text + "Loaded drafts are removed from the list; save them again if you don't want to tweet.<br>"
	text = text + "<ul>";
	for (var i=0; i<numSaved; i++)
	{
		var content = localStorage.getItem("twitterDrafts_" + i);
		if (content)
		{
			text = text + "<li><a href=\"javascript:yeLoadDraftTweet(" + i + ");\">" + safe_unescape(content) + "<br></a>";
		}
	}
	text = text + "</ul>";
	text = text + "<a href=\"javascript:yeClearAllDrafts()\">Erase all</a>";
    }

    text = text + "</div>\
	</div>\
    </div>\
    ";
    s_gm.innerHTML = text;
    /*
    var target = document.getElementsByClassName("twttr-dialog-wrapper");
    if (target.length>0)
    {
	target[0].appendChild(s_gm);
//	target[0].style.display = "";
    }
    */
    document.body.appendChild(s_gm);

/*    
    s_gm = document.createElement('div');
    s_gm.innerHTML = "<div class=\"twttr-dialog-overlay\" style=\"display: block; \"></div>";
    s_gm.type = 'text/html';
    document.body.appendChild(s_gm);
*/
  }
}

function save_to_drafts_click (entry) {
  return function (e) {
    var gmbinder, s_gm = document.createElement('script');
    if (gmbinder = c1('.//script[contains(@id,"gmbindersc1")]')) {
      document.body.removeChild(gmbinder);
    }
    s_gm.type = 'text/javascript';
    s_gm.id = 'yegmbindersc1';
    var text="";
    var el = entry.getElementsByClassName("twitter-anywhere-tweet-box-editor");
    for (var i = 0; i < el.length; i++)
	text = text + el[i].value;
    s_gm.innerHTML = "yeSaveToDrafts('" + escape(text) + "')";
    document.body.appendChild(s_gm);
  }
}

function add_save_to_drafts(entry) {
  var target;
  if (!(target = c1('.//span[contains(@class,"geo-control")]', entry))) 
		return;

  // return if exist
  if (c1('.//a[contains(@class,"ye-save-to-drafts")]', entry)) return;
	
  // b tag
  var b = document.createElement('b');
  b.appendChild(document.createTextNode('Save'));

  // span tag
  var span = document.createElement('span');
//  span.appendChild(img);
  span.appendChild(b);

  // a tag
  var a = document.createElement('a');
  a.setAttribute('class', 'ye-save-to-drafts');
  a.setAttribute('href', '#');
  a.addEventListener('click', save_to_drafts_click(entry), false);
  a.appendChild(span);
  // add action
  //entry.getElementsByClassName('tweet-actions')[0].appendChild(a);
  target.appendChild(a);


}

function make_all() {
//  var si = document.getElementById('page-node-home');
  var si = document.getElementsByClassName('global-nav');
	if(si.length == 0) return;

  // b tag
  var b = document.createElement('b');
  b.appendChild(document.createTextNode('Drafts'));

  // span tag
  var span = document.createElement('span');
  //span.appendChild(img);
  span.appendChild(b);

  // a tag
  var a = document.createElement('a');
  a.setAttribute('class', 'ye-tweet-drafts');
  a.setAttribute('href', '#');
  a.addEventListener('click', draftbutton_click(), false);
  a.appendChild(span);
  // add action
  //entry.getElementsByClassName('tweet-actions')[0].appendChild(a);
  si[0].appendChild(a);
	
  //code for opening TweetDialog added on the head section, since it doesn't work otherwise
  var s_gm = document.createElement('script');
  s_gm.type = 'text/javascript';
  s_gm.id = 'yeShowTweetBoxHeaderScript';
  s_gm.innerHTML = '\
  function yeCloseDraftWin() \
  {\
  var obj = document.getElementById("yegmbinder"); if (obj) obj.parentNode.removeChild(obj); \
  }\
  function yeClearAllDrafts() \
  {\
  var numSaved = parseInt(localStorage.getItem("twitterDrafts_numSaved"));\
  for (var i=0; i<numSaved; i++)\
	localStorage.removeItem("twitterDrafts_" + i);\
  localStorage.removeItem("twitterDrafts_numSaved");\
  yeCloseDraftWin();\
  }\
function yeLoadDraftTweet(i) \
  { \
	yeCloseDraftWin();\
	var numSaved = parseInt(localStorage.getItem("twitterDrafts_numSaved"));\
	if (i >= numSaved) return;\
	var content = localStorage.getItem("twitterDrafts_" + i);\
	localStorage.removeItem("twitterDrafts_" + i);\
	var prevIndex = i;\
	var newNumSaved = numSaved-1;\
	for (var j=i+1; j<numSaved; j++)\
	{\
		var nextItem = localStorage.getItem("twitterDrafts_" + j);\
		if (nextItem)\
		{\
			localStorage.setItem("twitterDrafts_" + prevIndex, nextItem);\
			newNumSaved = prevIndex+1;\
			prevIndex = j;\
			localStorage.removeItem("twitterDrafts_" + j);\
		}\
	}\
	localStorage.setItem("twitterDrafts_numSaved", (newNumSaved));\
  var TBox = new twttr.widget.TweetDialog(\
	{modal: false,draggable: true,template: {title: _("Draft tweet")},\
	defaultContent: unescape(content), origin: "Twitter Drafts"}); \
	TBox.open();\
	document.getElementsByClassName("twttr-dialog")[0].getElementsByClassName("tweet-button")[0].className = "tweet-button btn primary-btn";\
	}\
  function yeSaveToDrafts(c) \
  { \
	var numSaved1 = localStorage.getItem("twitterDrafts_numSaved");\
	var numSaved;\
	if (!numSaved1 || isNaN(numSaved1)) numSaved = 0; else numSaved = parseInt(numSaved1);\
	localStorage.setItem("twitterDrafts_" + numSaved, c);\
	localStorage.setItem("twitterDrafts_numSaved", (numSaved+1));\
	alert("saved tweet #" + (numSaved+1));\
  }';

  var headElm = document.getElementsByTagName('head');
  headElm[0].appendChild(s_gm);
}

var logged = false;

//if (logged = c1('.//a[contains(@class,"js-global-new-tweet")]')) {
  // DOM node inserted event
  document.addEventListener('DOMNodeInserted', function (event) {
    var cname, elmt = event.target;
//    if (!(/DIV/.test(elmt.tagName))) return;
    if (cname = elmt.className) {
      if (/tweet-box/.test(cname)) {
        add_save_to_drafts(elmt);
      }
    }
  }, false);
//}

  // add code to page
  make_all();

//}

