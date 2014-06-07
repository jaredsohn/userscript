// ==UserScript==
// @name          Post Editor Native Search
// @description   Add native blog search capabilities to post editor/create page
// @namespace     http://the-lastword.blogspot.com/
// @include       http://www.blogger.com/post-*

// ==/UserScript==

function getBlogId()
{
 var id = /blogid=(\d+)/i.exec( location.search );
 if( id ) return id[1];
}

/* Get values from stored keys. If none are found, then prompt for
values from user. Values inputted are "BlogName" and "Count" (number
of results to be displayed */

var para = getBlogId();
var blogname = GM_getValue('blogname'+para);
if(!blogname) {blogname = prompt('Blog URL (without http://)?'); GM_setValue('blogname'+para, blogname);};
var count = GM_getValue('count'+para);
if(!count) {count = prompt('Number of results to show?'); GM_setValue('count'+para, count);};

/* Set values upon user request */

function name()	{var para = getBlogId(); var blogname = prompt("Blog URL (without http://)?"); GM_setValue("blogname"+para, blogname);}
function nos() {count = prompt('Number of results to show?'); GM_setValue('count'+para, count);}

/* ```````````````````````````````````````` */

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

/* Style the results display */

addGlobalStyle('.results{position:absolute;top:40%;right:1%;font-size:7pt;color:gray;border:1px dotted whitesmoke;width:200px;padding:10px;font-family:"Tahoma";}');
addGlobalStyle('.results a{text-decoration:none;cursor:pointer}');
addGlobalStyle('#links {position:fixed;bottom:7%;right:5px;font-size:7pt;border:1px solid whitesmoke;padding:5px}');

function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}

/* Main function to write all data to the div ID="text" */

function spec(data){
var rss = eval('('+data.responseText+')');

function display_search(){
  $('spec').innerHTML="";
}

var i=0;
var results = new Array();

if (!rss.item) return;
else if (typeof(rss.item[1])=="undefined") { results.push(rss.item); display_search(); }
else { results=rss.item; display_search(); }

for(i=0;i<results.length;i++){

    var app=document.createElement('a');
    var dv=document.createElement('div');
    var sp=document.createElement('br');

    app.innerHTML=results[i].title;
    app.title=results[i].title;
	app.setAttribute('onclick','document.getElementById(\'f-address\').value+=\''+results[i].link+'\,\'');
    
        dv.innerHTML=results[i].description+'<br \/>'+'<a href=\"'+results[i].link+'\" target=\"_blank\"><span style=\"color:green;font-weight:normal\">'+results[i].link.replace('http://'+blogname,'...')+'<\/span><\/a>';

        $('spec').appendChild(app);
        $('spec').appendChild(dv);
        $('spec').appendChild(sp);

	}
}
/*
function genr(data){
var rss = eval('('+data.responseText+')');

function display_search(){
  $('genr').innerHTML="";
}

var i=0;
var results = new Array();

if (!rss.item) return;
else if (typeof(rss.item[1])=="undefined") { results.push(rss.item); display_search(); }
else { results=rss.item; display_search(); }

for(i=0;i<results.length;i++){

    var app=document.createElement('a');
    var dv=document.createElement('div');
    var sp=document.createElement('br');

    app.href="#";
    app.innerHTML=results[i].title;
    app.title=results[i].title;
	app.setAttribute('onclick','document.getElementById(\'f-address\').value+=\''+results[i].link+'\,\'');
    
        dv.innerHTML=results[i].description+'<br \/>'+'<a href=\"'+results[i].link+'\" target=\"_blank\"><span style=\"color:green;font-weight:normal\">'+results[i].link.replace('http://'+blogname,'...')+'<\/span><\/a>';

        $('genr').appendChild(app);
        $('genr').appendChild(dv);
        $('genr').appendChild(sp);

	}
}
*/

var results = document.createElement('div');
results.id="spec";
results.setAttribute("class","results");
$('body').appendChild(results);

var link = document.createElement('a');
link.id="setname";
link.innerHTML="Set Blog Name";
var link2 = document.createElement('a');
link2.id="setno";
link2.innerHTML="Set Result Count";

var links = document.createElement('div');
links.id="links";
$('body').appendChild(links);

$('links').appendChild(link);
$('links').appendChild(document.createElement('br'));
$('links').appendChild(link2);

$('setname').addEventListener('click',name,false);
$('setno').addEventListener('click',nos,false);

/*
var results2 = document.createElement('div');
results2.id="genr";
results2.setAttribute("class","results");
$('body').appendChild(results2);
*/

/* Add event to title field. Triggers search on keypress */

$("f-title").addEventListener('keyup',function(){blogname = GM_getValue('blogname'+para);GM_xmlhttpRequest({'method':'GET','url': 'http://xoxotools.ning.com/outlineconvert.php?output=json&classes=item&url=http%3A%2F%2Fsearch.blogger.com%2Fblogsearch_feeds%3Fas_q%3D'+$("f-title").value.replace(/\s/ig,"%2520")+'%2Bblogurl%3A'+blogname+'%26ui%3Dblg%26ie%3Dutf-8%26num%3D'+count+'%26output%3Drss&xn_auth=no&submit=Convert','onload':spec});},true);
/* $("f-title").addEventListener('keyup',function(){GM_xmlhttpRequest({'method':'GET','url': 'http://xoxotools.ning.com/outlineconvert.php?output=json&classes=item&url=http%3A%2F%2Fsearch.blogger.com%2Fblogsearch_feeds%3Fas_q%3D'+$("f-title").value.replace(/\s/ig,"%2520")+'%26ui%3Dblg%26ie%3Dutf-8%26num%3D'+count+'%26output%3Drss&xn_auth=no&submit=Convert','onload':genr});},true); */