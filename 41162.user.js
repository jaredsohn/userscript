// ==UserScript==
// @name           My Favorite Chats
// @namespace      http://paramour.net78.net/
// @include        http://chat.deviantart.com/*
// @exclude        http://chat.deviantart.com/chat/*
// ==/UserScript==

function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 ;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return ""
}

function setCookie(c_name,value,expiredays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}


//Oh geez
script = document.createElement('script');
script.id = "favchats";
script.src="http://paramour.net78.net/chatfunctions.js";
document.getElementsByTagName('head')[0].appendChild(script);
var allTR, thisTR;
allTR = document.getElementsByTagName('tr');
for (var i = 0; i < allTR.length; i++) {
 thisTR = allTR[i];
 content=thisTR.innerHTML;
 if(content.search("#")!="-1"){
  td = thisTR.getElementsByTagName("td");
  alink = td[0].getElementsByTagName("a");
  chatname=alink[0].innerHTML;
  link = td[0].innerHTML;
  favimg="data:image/gif;base64,R0lGODlhDwAQAMQfAP%2FTZfZwCP7pa%2FGIAMiYBP%2FVPSYkGZp5Ff6rBf%2FKNc16AP%2BqJEZMRv%2F98v%2BnFKdjAdGtL%2F%2FBEmlWEzs%2FOEEyCv%2BcJuWtANKzQLKPE8%2B2mv%2B4GP%2Fll%2F%2FGJP%2FgvggHBf%2F%2F%2FyH5BAEAAB8ALAAAAAAPABAAAAVf4Pd5pGieptd5KEqqbyuqXdat8kiuJcO2MJOBIouNJBdDTggR%2FFyvR0JgeT09B4GgANgUEprBc4ThdhqASmA8U0QAgIVYxjgUFgjOWjYhRAIKCA5sMwQPLwSEOhMpPyEAOw%3D%3D";
  TRadd="<a onclick=\"clickfav('"+chatname+"&&\');alert('Added to favourites'); addtoboxxy('"+chatname+"'.replace(/#/g, '').replace(/&&/g, ''));\" ><img src=\""+favimg+"\" title=\""+chatname+"\" /></a>";
  td[0].innerHTML=TRadd+link;
 }
}

var tadaa, tedaa;
tadaa=document.getElementsByTagName('h2');
for (var i = 0; i < tadaa.length; i++) {
 tedaa=tadaa[i];
 if(tedaa.innerHTML.search("Shoutbox")!="-1") {
  boxxy = document.createElement('div');
  boxxy.id = "favouritesboxxy";
  boxxy.innerHTML="<h2 class=\"chatside\">Your Favourite Chatrooms</h2>";
  favoriteslist=getCookie("favoritechats");
  favorite=favoriteslist.split("&&");
  boxi="";
  for(var x in favorite) {
   minusnumber=favorite[x].replace(/#/g, "");
   if(minusnumber!=null && minusnumber!="undefined" && minusnumber!="" && minusnumber!=" "){
    boxi+="<div id=\""+minusnumber+"\" class=\"favouritez\" style=\"background:#AFBBB0;border:1px solid #BAC5BA;vertical-align: middle;width=100000px;padding-left:4px;padding-bottom:4px;padding-top:4px;\"><span style=\"text-align:right;\"><img src=\"data:image/gif;base64,R0lGODlhFAAUANUiAN5%2Ff%2ByNjaJDQ%2F%2Fb29Jzc%2BOEhPWWlv%2Ff36pLS85vb7ZXV7FSUuiJibBRUa1OTstsbMFiYvqbm%2B%2BQkPGSkvydndV2dq5PT8NkZOaHh%2F%2BpqaBBQf2ensZnZ8pra%2F%2FU1Nh5eaVGRv%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACIALAAAAAAUABQAAAaNQJFwSCwaj8ikcsk8LhygqBTRSC4iG4PWIAkYAgukI1MIMD6fQuFjCB9BlMnhoB7QA9U3JXAIDQYhBwB4SCARBB8eISEeFRwMFoUTDwSKjAkQAJFvZ4Aeih4PHw5IAp0eCQkeAwQEpEcIEh0VmBCUFwB5RgoYAQC%2FAB8EwQpJCggCyckaCMVNz9DR0klBADs%3D\" onclick=\"clickunfav('#"+minusnumber+"');alert('Removed from favourites.');disablingThings('"+minusnumber+"');opacity('"+minusnumber+"', 100, 0, 500);\" /></span>&nbsp;<strong><a class=\"a\" href=\"http://chat.deviantart.com/chat/"+minusnumber+"\">#"+minusnumber+"</a></strong></div>";
   }
  }
  boxxy.innerHTML+=boxi;
  tadaa[i].parentNode.insertBefore(boxxy, tadaa[i]);
break; }
}
 