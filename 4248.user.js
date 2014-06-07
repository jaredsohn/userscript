// ==UserScript==
// @name           Save Form Data
// @namespace      http://the-lastword.blogspot.com
// @description    Saves your post content every 30 characters so that you don't lose it to any unfortunate event! :P Retrieve your saved data by clicking the 'return data' link at the bottom-right!
// @include        http://*blogger.com/post-*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('.forms{position:fixed;bottom:5px;right:5px;font-size:7pt;color:silver;border:1px solid whitesmoke;padding:10px;} .forms a:link, .forms a:visited{color:gray}')

function $()
{
  for( var i = 0, node; i < arguments.length; i++ )
    if( node = document.getElementById( arguments[i] ) )
      return node;
}

function getBlogId()
{
 var id = /blogid=(\d+)/i.exec( location.search );
 if( id ) return id[1];
}

var para = getBlogId();
var i=0;
function save(){
	var text = $('textarea').value;
	if(text.length%30==0)
		GM_setValue('postcontent'+para,text);
	}

function retur(){
	var back = GM_getValue('postcontent'+para);
	$('textarea').value = back;
	}

var ret = document.createElement('a');
ret.id="ret";
ret.innerHTML="Return Data";

var div = document.createElement('div');
div.id="forms";
div.setAttribute('class','forms');

$('body').appendChild(div);
$('forms').appendChild(ret);

window.addEventListener('load',function(){$('textarea').addEventListener('keyup',save,true);},false);

$('ret').addEventListener('click',retur,true);