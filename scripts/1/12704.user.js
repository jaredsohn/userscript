// ==UserScript==
// @name          Darckr in Flickr
// @description	  Add links to darck equivalents of flickr pages
// @namespace     http://flickr.com/photos/lo1/
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// ==/UserScript==

/*
    @author=Laurent Henocque  
    @copyright=Laurent Henocque  
*/

var uri=document.location.pathname;
var uria=uri.split(new RegExp("/"));
if(uria[0]=="") uria.splice(0,1);
if(uria[uria.length-1]=="") uria.splice(uria.length-1,1);

var pagetype="";
var setid;
var poolid;
var photoid;

function IsNumeric(sText)

{
   var ValidChars = "0123456789.";
   var IsNumber=true;
   var Char;

 
   for (i = 0; i < sText.length && IsNumber == true; i++) 
      { 
      Char = sText.charAt(i); 
      if (ValidChars.indexOf(Char) == -1) 
         {
         IsNumber = false;
         }
      }
   return IsNumber;
}

//window.alert(uria);

if(uria[0]=="photos"){
    if(uria.length==2) pagetype="user";
    else if(uria[2]=="sets"){pagetype="set";setid=uria[3];}
    else if(IsNumeric(uria[2])) {pagetype="photo";photoid=uria[2];}
}else if(uria[0]=="groups"&&uria[2]=="pool"){pagetype="group";}

//window.alert(pagetype);

if(pagetype=="") return;

var Main=document.getElementById("Main");
var p = document.createElement('p');
p.setAttribute('class','Links');
//var p2 = document.createElement('p');
//p2.setAttribute('class','Links');
var a = document.createElement('a');
a.setAttribute('class', "Plain");

if(pagetype=="photo"){    
    a.setAttribute('href', "http://darckr.com/photo?photoid="+photoid);
    a.innerHTML="View this picture";
}else if(pagetype=="set"){
    a.setAttribute('href', "http://darckr.com/set?setid="+setid);
    a.innerHTML="View this set";
}else{
    var inputs = document.evaluate("//input",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var nsid = '';
    var element;
    for (i=0; i<inputs.snapshotLength; i++) {
    	element = inputs.snapshotItem(i);
    	if (element.name == 'w') {
    	   nsid=element.value;
    	   break;
    	}
    }
    if(pagetype=="user"){
        a.setAttribute('href', "http://darckr.com/username?username="+nsid);
        a.innerHTML="View this stream";
    }else if (pagetype=="group"){
        a.setAttribute('href', "http://darckr.com/group?groupid="+nsid);
        a.innerHTML="View this group";
    }
}
   
var links=document.evaluate("//p[@class='Links']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if(links.snapshotLength !=0) {
    var separator=links.snapshotItem(0).getElementsByTagName('img')[0];
    var img=document.createElement('img');
    img.setAttribute('src',separator.src);
    img.setAttribute('alt',separator.alt);
    img.setAttribute('width',separator.width);
    img.setAttribute('height',separator.height);
    var link = document.createElement('a');
    if(pagetype=="user") link.setAttribute('href', "http://darckr.com/username?id="+nsid);
    if(pagetype=="set") link.setAttribute('href', "http://darckr.com/set?setid="+setid);
    if(pagetype=="photo") link.setAttribute('href', "http://darckr.com/photo?photoid="+photoid);
    link.innerHTML="Darckr";
    links.snapshotItem(0).appendChild(img);
    links.snapshotItem(0).appendChild(link);
}

p.appendChild(a);
if(pagetype=="user"){
    var span= document.createElement('span');
    span.innerHTML=", or ";
    p.appendChild(span);

    a = document.createElement('a');
    a.setAttribute('class', "Plain");
    a.setAttribute('href', "http://darckr.com/username?id="+nsid+"&sort=interestingness-desc");
    a.innerHTML="interesting";
    p.appendChild(a);
    
    span= document.createElement('span');
    span.innerHTML=", or ";
    p.appendChild(span);

    a = document.createElement('a');
    a.setAttribute('class', "Plain");
    a.setAttribute('href', "http://darckr.com/sets?username="+nsid);
    a.innerHTML="sets";
    p.appendChild(a);
    
    span= document.createElement('span');
    span.innerHTML=", or ";
    p.appendChild(span);

    a = document.createElement('a');
    a.setAttribute('class', "Plain");
    a.setAttribute('href', "http://darckr.com/usernamecomments?username="+nsid);
    a.innerHTML="comment or fave";
    p.appendChild(a);
}
span= document.createElement('span');
    span.innerHTML=", or ";
    p.appendChild(span);

a = document.createElement('a');
a.setAttribute('class', "Plain");
a.setAttribute('href', "http://darckr.com/explore");
a.innerHTML="Explore with Darckr";
p.appendChild(a);
//Main.insertBefore(p2,Main.firstChild);
Main.insertBefore(p,Main.firstChild);
