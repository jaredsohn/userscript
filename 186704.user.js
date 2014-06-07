// ==UserScript==
// @name           No Recomendations
// @namespace      http://software.sitesbr.net
// @description    Remove all Facebook Recomendations
// @include        *facebook.com/*
// @version        2.0
// ==/UserScript==
 
 
var sc = function(){	

var langpt = navigator.language.match(/pt/);
var frasepess = langpt ? "pessoas que" : "people you m";
var showP = langpt ? "Mostrar Pessoas" : "Show People";
var hideP = langpt ? "Ocultar Pessoas" : "Hide People";
var infoP = langpt ? "Recomendando somente Pessoas" : "Only recommending People";
var tirarAviso = false;
                 
function sa_setCookie(c_name,value/*,exdays*/){
    var exdate=new Date(), exdays = arguments.length == 2?0:arguments[2];
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ( ! exdays ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
    top.location.reload();
}

function sa_getCookie(c_name){
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++){
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name){
    return unescape(y);
    }
  }
 return null;            
}


      setInterval( function(){
 
      var showPeople = sa_getCookie('showPeople');
      if( showPeople) showPeople = parseInt(showPeople);
            
      if( showPeople){
         dvs = document.getElementsByTagName('div');
         for(i=0;i<dvs.length;i++){
           div = dvs[i];
           cl = div.getAttribute("class");
           if( cl == 'ego_section'){
               if( div.parentNode.parentNode.innerHTML.indexOf(infoP) == -1){
                 adv = document.createElement('div');
                 adv.id="sa_div_norecom";
                 adv.innerHTML = infoP;
                 div.parentNode.parentNode.appendChild(adv);
               }
               if( div.innerHTML.toLowerCase().indexOf(frasepess) == -1)
               div.parentNode.removeChild(div);
               else if(div.innerHTML.indexOf( hideP) == -1){
                 bt = document.createElement('input');
                 bt.type='button';
                 bt.id = "sa_bt_showp";
                 bt.value= hideP;
                 bt.setAttribute("onclick", "sa_setCookie('showPeople', 0, 365)");
                 div.appendChild( document.createElement('br'));
                 div.appendChild(bt);
                 tirarAviso = true;
               }
           }
         }
       } else {
         div = document.getElementById("pagelet_ego_pane");
	    div.innerHTML = "";                        
	    bt = document.createElement('input');
                 bt.type='button';
                 bt.value= showP;
                 bt.setAttribute("onclick", "sa_setCookie('showPeople', 1, 365)");
                 div.appendChild( document.createElement('br'));
                 div.appendChild(bt);

	 }
	 anob = document.getElementById('pagelet_ticker'); if(anob) anob.parentNode.removeChild(anob);
      tirarAviso = document.getElementById( "sa_bt_showp" );
	 if( tirarAviso){
		anob = document.getElementById('sa_div_norecom'); if(anob) anob.parentNode.removeChild(anob);
	 }
	 }, 1000);
	 
};
	
nsc = document.createElement('script');
nsc.setAttribute("type", "text/javascript");
bd = sc.toString(); 	
nsc.innerHTML = bd.substring(13, bd.length -2);
alvo = document.getElementsByTagName('head')[0];
alvo.insertBefore( nsc, alvo.firstChild);