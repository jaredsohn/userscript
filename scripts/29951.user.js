// ==UserScript==
// @name           Travian Server Utils
// @author         Anlide <info@travutils.com>
// @namespace      tsu
// @description    TSU`s script
// @include        http://*.travian.*
// @exclude        http://forum.travian.*
// @exclude        http://www.travian.*
// ==/UserScript==


////////////////////////////////////////////////////////////////////////////////
// Consts
var user_color='#58C4FF';


////////////////////////////////////////////////////////////////////////////////
// Function add img+url at specific link

function add_url(elem, url, url2, add_onmouseout, add_onmousemove, color) {
 var child=document.createElement("a");
 child.setAttribute("href", url);
 child.setAttribute("target", "_blank");
 child.setAttribute("style", "margin-left: 5px; color: "+color+";");
 var add_1, add_2;
 if(add_onmouseout!=''){
  src_onmouseout=" onmouseout='"+add_onmouseout+"'";
 }else{
  src_onmouseout="";
 }
 if(add_onmousemove!=''){
  src_onmousemove=" onmousemove='"+add_onmousemove+"'";
 }else{
  src_onmousemove="";
 }
 child.innerHTML="<img alt='#'"+src_onmouseout+src_onmousemove+">";
 elem.parentNode.insertBefore(child,elem.nextSibling);
}


////////////////////////////////////////////////////////////////////////////////
// Main loop, update page

var title=document.title;
var sn=title.substring(8);
for (var i=0;i<document.links.length;i++) {
 var a=document.links[i];
 if (a.parentNode.className!='menu' && a.parentNode.className!='txt_menue') {
  if (a.getAttribute('href').search(/spieler[.]php[?]uid=/i)!=-1) {
   var idu=a.getAttribute('href').replace(/spieler[.]php[?]uid=/, '');
   if(idu!=0)add_url(a, "http://crop-finder.com/"+sn+"/u"+idu+"/", "", "", "", user_color);
  } else if (a.getAttribute('href').search(/allianz[.]php[?]aid=/i)!=-1) {
   var ida=a.getAttribute('href').replace(/allianz[.]php[?]aid=/, '');
   if(ida!=0)add_url(a, "http://crop-finder.com/"+sn+"/a"+ida+"/", "", "", "", user_color);
  } else if (a.getAttribute('href').search(/karte[.]php[?]d=/i)!=-1 && document.location.href.search(/karte[.]php/i)==-1) {
   var z=a.getAttribute('href').replace(/karte[.]php[?]d=/, '');
   z=z.substring(0,z.search(/[&]/i));
   y=Math.ceil(400-z/801);
   var x=z-401-((400-y)*801);
   var tmp='med_mouseMoveHandler(arguments[0],"('+x+'|'+y+')")';
   add_url(a, "http://crop-finder.com/"+sn+"/"+x+"|"+y+"/", "", "med_closeDescription()", tmp, user_color);
  }
 }
}


////////////////////////////////////////////////////////////////////////////////
// For future
//
//var body=document.getElementsByTagName("body")[0];
//var child=document.createElement("iframe");
//child.setAttribute("src", "http://travian-utils.com/");
//child.setAttribute("style", "visibility: hidden");
//body.appendChild(child);