// ==UserScript==
// @name           torrentz.com_More_Comments
// @namespace      http://
// @description    The script collects comments and description info from other sites and shows them in torrentz.com page
// @include        http://torrentz.com/*
// @include        http://*.torrentz.com/*
// ==/UserScript==


var lianks = document.evaluate(
  "//div[@class='download']/dl/dt/a",
  document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
 var thepiratebay= new Array(6)
 thepiratebay[0]="thepiratebay.org"; //name and search string in link to get description
 thepiratebay[1]='<div class="nfo">.*?<\/div>'; //descriptionxpath
 thepiratebay[2]='same'; 
 thepiratebay[3]=''; 
 thepiratebay[4]=''; 
 thepiratebay[5]='<div id="comments">.*?<div class="ads" '; //commentsxpath
 
 var mininova= new Array(6)
 mininova[0]="mininova.org"; //name
 mininova[1]='<div id="description">.*?</div>';	//descriptionxpath
 mininova[2]='not_the_sme'; // commentsurl
 mininova[3]='tor'; // whattofind
 mininova[4]='com'; // whattoreplace
 mininova[5]='</p><div id="comment.*?<p id="addcomment">';//commentsxpath
 
 var newtorrents= new Array(6) 
 newtorrents[0]='newtorrents.info';
 newtorrents[1]='none_none_none';	
 newtorrents[2]='not_the_sme'; // commentsurl
 newtorrents[3]='.info/torrent/'; // whattofind 	
 newtorrents[4]='.info/comments/'; // whattoreplace
 newtorrents[5]="<table border='1'.*?</table><br><br><b>";	
 
var torrents=[mininova,thepiratebay,newtorrents];

for (var y = 0; y < lianks.snapshotLength; y++) {
	var link = lianks.snapshotItem(y);	
	     for (var i=0; i<torrents.length; i++) {
     if (link.href.match(torrents[i][0])) { 

//torrents[i][3] = link.href; table

var url              = link.href;
var name             = torrents[i][0];
var descriptionxpath = torrents[i][1];
var commentsurl      = torrents[i][2]; 
var whattofind       = torrents[i][3];
var whattoreplace    = torrents[i][4];
var commentsxpath    = torrents[i][5];


geturl(url,name,descriptionxpath,commentsurl,commentsxpath,whattofind,whattoreplace);


																					}
																	      }  
}

function geturl(url,name,descriptionxpath,commentsurl,commentsxpath,whattofind,whattoreplace){


GM_xmlhttpRequest({
method: 'GET',
url: url,
headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', },
onload: function(responseDetails) {

// some replacements
responseDetails.responseText = responseDetails.responseText.replace(/<br \/>\r\n<br \/>/g,'<hr/>');
responseDetails.responseText = responseDetails.responseText.replace(/\r\n\r\n/g,'<hr/>');
responseDetails.responseText = responseDetails.responseText.replace(/\r\n/g,'<br/>');
responseDetails.responseText = responseDetails.responseText.replace(/<hr\/><hr\/>/g,'<hr/>');
responseDetails.responseText = responseDetails.responseText.replace(/<hr\/><hr\/>/g,'<hr/>');
responseDetails.responseText = responseDetails.responseText.replace(/\n/g,'');
responseDetails.responseText = responseDetails.responseText.replace(/\r/g,'')
responseDetails.responseText = responseDetails.responseText.replace(/\t/g,'')
responseDetails.responseText = responseDetails.responseText.replace(/<pre /g,'<p ');
responseDetails.responseText = responseDetails.responseText.replace(/<\/pre>/g,'</p>');
responseDetails.responseText = responseDetails.responseText.replace(/<pre>/g,'<p>');
responseDetails.responseText = responseDetails.responseText.replace(/<\/pre>/g,'</p>');
responseDetails.responseText = responseDetails.responseText.replace(/<br \/><br \/>/g,'<hr/>');
responseDetails.responseText = responseDetails.responseText.replace(/<br\/>&gt;/g,'&gt;');

//javascript length of a string

var description = responseDetails.responseText.match(descriptionxpath);
//return description;

if (description && (description != null)){
AddDescription(name,description);
}

// if the comments url are in the same page don't get it again so :

if (commentsurl == 'same')
   {
var comments = responseDetails.responseText.match(commentsxpath);
AddComments(name,comments);
   }
 else if (commentsurl == 'not_the_sme')
   {
url = url.replace((whattofind),(whattoreplace)); //regular expressions replace arrays javascript
// another way url = href.replace('search', 'images').replace('www', 'images');
commentsurl = 'same';
geturl(url,name,descriptionxpath,commentsurl,commentsxpath,whattofind,whattoreplace);
   }

}
});
}

// taken from http://www.dustindiaz.com/getelementsbyclass/
// start getElementsByClass
function getElementsByClass(node,searchClass,tag) {  
var classElements = new Array();
var els = node.getElementsByTagName(tag); // use "*" for all elements
var elsLen = els.length;
var pattern = new RegExp("\\b"+searchClass+"\\b");
for (i = 0, j = 0; i < elsLen; i++) {
 if ( pattern.test(els[i].className) ) {
 classElements[j] = els[i];
 j++;
 }
}
return classElements;
}
// taken from http://www.dustindiaz.com/getelementsbyclass/
// end getElementsByClass






function AddDescription(name,description){

//alert(description.length);
newdescriptions = document.createElement("div");
newdescriptions.setAttribute('class', 'usdescriptions');
newdescriptions.id = "userscript description";
newdescriptions.innerHTML = '<h2>Description from '+name+ '</h2><div class="usdescription">'+
'<p style="padding: 2px; float: right; font-size: 0.9em;"><span style="color:#588FC7;"><strong>'
+name+
'</strong> description</span></p>'
+description+
'</div>';

var existingobject = getElementsByClass(document,'files','div');
existingobject[0].parentNode.insertBefore(newdescriptions,existingobject[0]);

}

function AddComments(name,comments){
if (comments != null){
newcomments = document.createElement("div");
newcomments.setAttribute('class', 'uscomments');
newcomments.id = "userscript comments";
newcomments.innerHTML = '<h2>Comments from '+name+ '</h2><div class="uscomment">'+
'<p style="padding: 2px; float: right; font-size: 0.9em;"><span style="color:#336699;"><strong>'
+name+
'</strong> comments</span></p>'
+comments+
'</div>';
var existingobject_to_add_comments = getElementsByClass(document,'files','div');
existingobject_to_add_comments[0].parentNode.insertBefore(newcomments,existingobject_to_add_comments[0]);
}
}

// new style
	//GM_addStyle('div.uscomments {background:#336699 url(/img/ctr.gif) no-repeat scroll right top;margin:20px 0pt;} ');
	GM_addStyle('div.uscomments {background:#336699 url(/img/ctr.gif) no-repeat scroll right top;margin:20px 245px 20px 18pt;} ');
	GM_addStyle('div.uscomments > div.uscomment {background-color:#FFFFFF;border-bottom:1px solid #ACB2B9;padding:10px;} ');
	GM_addStyle('div.uscomments > h2 {background:transparent url(/img/ctl.gif) no-repeat scroll left top;border-bottom:1px solid #FFFFFF;color:white;font-size:20px;font-weight:normal;padding:5px 0pt 5px 20px;}');

	//GM_addStyle('div.usdescriptions {background:#588FC7 url(/img/ctr.gif) no-repeat scroll right top;margin:20px 0pt;} ');
	GM_addStyle('div.usdescriptions {background:#588FC7 url(/img/ctr.gif) no-repeat scroll right top;margin:20px 245px 20px 0pt;} ');
	GM_addStyle('div.usdescriptions > div.usdescription {background-color:#FFFFFF;border-bottom:1px solid #ACB2B9;padding:10px;} ');
	GM_addStyle('div.usdescriptions > h2 {background:transparent url(/img/ctl.gif) no-repeat scroll left top;border-bottom:1px solid #FFFFFF;color:white;font-size:20px;font-weight:normal;padding:5px 0pt 5px 20px;}');

// hidding some stuff

	GM_addStyle('.browse-coms {visibility:hidden;} ');

// old style
	GM_addStyle('#description {padding:1em;font-size:12px;} ');
	//GM_addStyle('#description {border:1px dashed #000000;padding:1em;font-size:12px;} ');
	GM_addStyle('.nfo {color:#555555;font-family:"Courier New",monospace;font-size:small;font-size-adjust:none;font-stretch:normal;font-style:normal;font-variant:normal;font-weight:normal;line-height:1em;margin:0pt;white-space:-moz-pre-wrap;} ');
  // nice too = 	GM_addStyle('#description hr {background: #fff url(http://www.blakems.com/i/borderLine.gif) no-repeat center bottom;margin: 8px auto;height: 1px;border: 0 none;  }');
 	GM_addStyle('hr {background: #fff url(http://img523.imageshack.us/img523/9415/hruc8.png) no-repeat center bottom;margin: 8px auto;height: 1px;border: 0 none;  }');
  GM_addStyle('pre {white-space: -moz-pre-wrap; font-family:"Courier New",Courier,monospace;font-size:11px; }');
  GM_addStyle('.comment h3 {font-size:89%;margin:0pt 0pt 1em;padding-bottom:0.5em; }');
  GM_addStyle('#p-body-comments div.comment {font-size:0.9em; }');

// MEMO
//http://www.newtorrents.info/torrent/26515/In.The.Land.Of.Women.DVDRip.XviD.SIZEFIX-DMT.html?nopop=1
//http://www.newtorrents.info/comments/26515/In.The.Land.Of.Women.DVDRip.XviD.SIZEFIX-DMT.html

