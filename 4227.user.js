// ==UserScript==
// @name         Delicious Tag Reference/Adder
// @namespace    http://the-lastword.blogspot.com/
// @description  Displays tags from del.icio.us for easy reference and adding to posts. Displays tags sorted by Frequency and Alphabetically. Also alters the post editors font to Tahoma and makes it a little smaller! A little aesthetic improvement! :)
// @include      http://*blogger.com/post-*
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

addGlobalStyle('#textarea { font-size: 8pt; font-family: "Tahoma"}');
addGlobalStyle('.categories { position:absolute; top: 25%; right:1%; border:1px solid whitesmoke; padding:10px; width:200px } .categories a{font-size:7pt;color:gray; text-decoration:none; cursor:pointer} .categories a:hover{color:steelblue} #switch{position:absolute;top:19%;color:red;right:4%}')

function getBlogId()
{
 var id = /blogid=(\d+)/i.exec( location.search );
 if( id ) return id[1];
}

para = getBlogId();
var delname = GM_getValue('delname'+para);
if(!delname) {delname = prompt('Delicious Username?'); GM_setValue('delname'+para, delname);};

var holy_grail = document.createElement('div');
holy_grail.id="holy_grail";
  
var div = document.createElement('div');
var div1 = document.createElement('div');
div1.setAttribute('class','categories');
div1.innerHTML="Loading...";
div1.setAttribute('style','display:none');
div1.id="alpha";
holy_grail.appendChild(div1);

div.setAttribute('class','categories');
div.setAttribute('style','display:block');
div.id="freq";
div.innerHTML="Loading...";
holy_grail.appendChild(div);
document.getElementById('body').appendChild(holy_grail);

function cat_freq(data){
  var Delicious_freq = {};
  Delicious_freq.tags = eval('('+data.responseText+')');
	document.getElementById('freq').innerHTML="";
	
	if(!document.getElementById('f-address')){  
  		for(var i in Delicious_freq.tags){
      		document.getElementById('freq').innerHTML+="<a onclick=\"javascript:document.getElementById			('tags').value+='"+i+",';\">"+i+"<\/a> - ";
 		} 
	}
	else{
   		for(var i in Delicious_freq.tags){
      		document.getElementById('freq').innerHTML+="<a onclick=\"javascript:document.getElementById			('f-address').value+='"+i+",';document.getElementById('tags').value+='"+i+",';\">"+i+"<\/a> - ";
		}
	}
}

function cat_alpha(data){
  var Delicious_alpha = {};
  Delicious_alpha.tags = eval('('+data.responseText+')');
	document.getElementById('alpha').innerHTML="";

	if(!document.getElementById('f-address')){  
  		for(var i in Delicious_alpha.tags){
      		document.getElementById('alpha').innerHTML+="<a onclick=\"javascript:document.getElementById			('tags').value+='"+i+",';\">"+i+"<\/a> - ";
 		} 
	}
	else{
   		for(var i in Delicious_alpha.tags){
      		document.getElementById('alpha').innerHTML+="<a onclick=\"javascript:document.getElementById			('f-address').value+='"+i+",';document.getElementById('tags').value+='"+i+",';\">"+i+"<\/a> - ";
		}
	}
}

GM_xmlhttpRequest({'method':'GET',
                  'url':'http://del.icio.us/feeds/json/tags/'+delname+'?sort=freq&raw',
                  'onload':cat_freq
                });

GM_xmlhttpRequest({'method':'GET',
                  'url':'http://del.icio.us/feeds/json/tags/'+delname+'?sort=alpha&raw',
                  'onload':cat_alpha
                });


function toggle(){
    if(document.getElementById('freq').style.display=="none"){
        document.getElementById('freq').style.display="block";
	document.getElementById('alpha').style.display="none";
	}
    else{
	document.getElementById('freq').style.display="none";
	document.getElementById('alpha').style.display="block";
	}
}

function switcher(){
var switch_link = document.createElement('a');
switch_link.id="switch";
switch_link.innerHTML="Switch Tags View";
document.getElementById('body').appendChild(switch_link);
}

switcher();
document.getElementById('switch').addEventListener('click',toggle,true);