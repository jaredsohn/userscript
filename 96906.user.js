// ==UserScript== 
// @name           AdopteUnLien 
// @namespace      http://www.adopteunmec.com 
// @description    Remplace le javascript d'adopte un mec par du vrai html...pratique pour les middle click 
// @include        http://www.adopteunmec.com/search.php* 
// ==/UserScript== 
 
 
  
 GM_addStyle(".toutRouge { border: 5px solid red;" ); 
 GM_addStyle(".toutOrange { border: 5px solid #ffd323;" ); 
 GM_addStyle(".toutVert { border: 5px solid #00cc33;" ); 
 
 document.getElementsByClassName = function(cl) { 
 	var retnode = []; 
 	var myclass = new RegExp('\\b'+cl+'\\b'); 
 	var elem = this.getElementsByTagName('*'); 
 	for (var i = 0; i < elem.length; i++) { 
   var classes = elem[i].className; 
   if (myclass.test(classes)) retnode.push(elem[i]); 
 	} 
 	return retnode; 
 };  
  
 var elts = document.getElementsByClassName("small" ); 
  
 for (var i = 0; i < elts.length; i++) { 
 	var gonzelle = elts[i]; 
 	// gonzelle.className = "toutRouge "+gonzelle.className; 
 	var url = gonzelle.getAttribute("onclick" ); 
 	var goodUrl = url.replace("top.window.location='", "http://www.adopteunmec.com" ); 
 	var goodUrl = goodUrl.replace("'", "" ); 
 	gonzelle.setAttribute("onclick", "" ); 
 	gonzelle.setAttribute("onmouseover", "" ); 
   
   
 	var innerHtml = gonzelle.innerHTML; 
 	gonzelle.innerHTML = "<a href='"+goodUrl+"'>"+innerHtml+"</a>"; 
 } 
  
  
 var elts = document.getElementsByClassName("small_age" ); 
 for (var i = 0; i < elts.length; i++) { 
 	var gonzelle = elts[i]; 
 	if(gonzelle.innerHTML <= "22 ans" ) { 
   gonzelle.className = "toutRouge "+gonzelle.className; 
 	} else if(gonzelle.innerHTML < "24 ans" ) { 
   gonzelle.className = "toutOrange "+gonzelle.className;    
 	} else if (gonzelle.innerHTML > "36 ans" ) { 
   gonzelle.className = "toutRouge "+gonzelle.className; 
 	} else if (gonzelle.innerHTML > "31 ans" ) { 
   gonzelle.className = "toutOrange "+gonzelle.className;    
 	} else { 
   gonzelle.className = "toutVert "+gonzelle.className; 
 	} 
 } 
