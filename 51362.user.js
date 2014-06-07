// ==UserScript==
// @name           Mininova filter
// @namespace      hr.frenky
// @include        http://www.mininova.org/*
// @exclude        http://www.mininova.org/tor/*
// ==/UserScript==


//Kad smo vec tu.. Mozemo i obrisati reklame :D
var classElements = document.getElementsByTagName("iframe");
for (var i=0; i<classElements.length; i++){
 classElements[i].parentNode.removeChild(classElements[i]);
}
document.getElementById("adspot-a").parentNode.removeChild(document.getElementById("adspot-a"));


//Ovo isto radi... Samo dodat buttone ispod location bar-a
//al' mi fakat nije jasno zasto u prvom prolazu ne obrise sve... Zato ga pozovem 10 puta :) Neka radi ti moderni CPU-ovi...

window.add_Buttons_mn=function(){
	var pTag = document.createElement("span");
  pTag.setAttribute("align","center");
  pTag.innerHTML = "<br>Toolbox: <a href=\"#\" onClick=\"removeAllOnPrivateTrackers();removeAllWithUnknownNumberOfLeechers();mininova_filter(20);\">Remove <strong>all configured</strong></a>";
  pTag.innerHTML += "&nbsp;-&nbsp;<a href=\"#\" onClick=\"removeAllOnPrivateTrackers();\">Remove all torrents on <strong>private trackers</strong></a>";
  pTag.innerHTML +="&nbsp;-&nbsp;<a href=\"#\" onClick=\"mininova_filter(20);\">Remove all torrents with <strong>small number</strong> of leechers</a>";
  pTag.innerHTML +="&nbsp;-&nbsp;<a href=\"#\" onClick=\"removeAllWithUnknownNumberOfLeechers();\">Remove all torrents with <strong>unknown number</strong> of leechers</a>";
  document.getElementById("location").appendChild(pTag); 
	
	var scrTag = document.createElement("script");
	scrTag.innerHTML = "function removeAllOnPrivateTrackers(){";
  scrTag.innerHTML +="    for (counter=0;counter<10;counter++){";
  scrTag.innerHTML +="      var classElements = new Array();";
  scrTag.innerHTML +="      var classElements = document.getElementsByTagName(\"img\");";
  scrTag.innerHTML +="      if(classElements.length==0) return;";
  scrTag.innerHTML +="      for (var i=0; i<classElements.length; i++){";
  scrTag.innerHTML +="        try{";
  scrTag.innerHTML +="          if (classElements[i].alt==\"\[P\]\"){";
  scrTag.innerHTML +="            var tr_el=classElements[i].parentNode;";
  scrTag.innerHTML +="            for (j=0;j<10;j++){";
  scrTag.innerHTML +="              if (tr_el.tagName==\"TR\"){";
  scrTag.innerHTML +="                break;";
  scrTag.innerHTML +="              }else{";
  scrTag.innerHTML +="                tr_el=tr_el.parentNode;";
  scrTag.innerHTML +="              }";
  scrTag.innerHTML +="            }";
  scrTag.innerHTML +="            var parrent_el=tr_el.parentNode;";
  scrTag.innerHTML +="            parrent_el.removeChild(tr_el);";
  scrTag.innerHTML +="          }";
  scrTag.innerHTML +="        }catch(err){";
  scrTag.innerHTML +="          alert(err);";
  scrTag.innerHTML +="          return;";
  scrTag.innerHTML +="        }";
  scrTag.innerHTML +="      }";
  scrTag.innerHTML +="    }";
  scrTag.innerHTML +="}";
  scrTag.innerHTML +="";
  scrTag.innerHTML +="function removeAllWithUnknownNumberOfLeechers(){";
  scrTag.innerHTML +="    for (counter=0;counter<10;counter++){";
  scrTag.innerHTML +="    var classElements = new Array();";
  scrTag.innerHTML +="    var classElements = document.getElementsByTagName(\"td\");";
  scrTag.innerHTML +="    for (var i=0; i<classElements.length; i++){";
  scrTag.innerHTML +="      try{";
  scrTag.innerHTML +="      	if (classElements[i].innerHTML==\"---\"){";
  scrTag.innerHTML +="      		var tr_el=classElements[i].parentNode;";
  scrTag.innerHTML +="  		  	for (j=0;j<10;j++){";
  scrTag.innerHTML +="  		  		if (tr_el.tagName==\"TR\"){";
  scrTag.innerHTML +="  		  	    var parrent_el=tr_el.parentNode;";
  scrTag.innerHTML +="  		  	    parrent_el.removeChild(tr_el);";
  scrTag.innerHTML +="  	  				break;";
  scrTag.innerHTML +="  		  		}else{";
  scrTag.innerHTML +="  		  			tr_el=tr_el.parentNode;";
  scrTag.innerHTML +="  		  		}";
  scrTag.innerHTML +="  		  	}";
  scrTag.innerHTML +="        }";
  scrTag.innerHTML +="     }catch(err){}";
  scrTag.innerHTML +="    } ";
  scrTag.innerHTML +="    }";
  scrTag.innerHTML +="}     ";
  scrTag.innerHTML +="";
  scrTag.innerHTML +="function getElementsByClass(searchClass,node,tag) {";
  scrTag.innerHTML +="	var classElements = new Array();";
  scrTag.innerHTML +="	if ( node == null )";
  scrTag.innerHTML +="	node = document;";
  scrTag.innerHTML +="	if ( tag == null )";
  scrTag.innerHTML +="	tag = '*';";
  scrTag.innerHTML +="	var els = node.getElementsByTagName(tag);";
  scrTag.innerHTML +="	var elsLen = els.length;";
  scrTag.innerHTML +="	var pattern = new RegExp(\"(^|\\s)\"+searchClass+\"(\\s|$)\");";
  scrTag.innerHTML +="	for (i = 0, j = 0; i < elsLen; i++) {";
  scrTag.innerHTML +="		if ( pattern.test(els[i].className) ) {";
  scrTag.innerHTML +="			classElements[j] = els[i];";
  scrTag.innerHTML +="			j++;";
  scrTag.innerHTML +="		}";
  scrTag.innerHTML +="	}";
  scrTag.innerHTML +="	return classElements;";
  scrTag.innerHTML +="}";
  scrTag.innerHTML +="";
  scrTag.innerHTML +="function mininova_filter(minimun_leecher_count){";
  scrTag.innerHTML +="    for (counter=0;counter<10;counter++){";
  scrTag.innerHTML +="	var classElements = getElementsByClass(\"b\",null,\"span\");";
  scrTag.innerHTML +="	for (i=0;i<classElements.length;i++){";
  scrTag.innerHTML +="		var leechers= parseInt(classElements[i].innerHTML);";
  scrTag.innerHTML +="		if (leechers<minimun_leecher_count || classElements[i].innerHTML==\"---\"){";
  scrTag.innerHTML +="			    var tr_el=classElements[i].parentNode;";
  scrTag.innerHTML +="  		  	for (j=0;j<10;j++){";
  scrTag.innerHTML +="  		  		if (tr_el.tagName==\"TR\"){";
  scrTag.innerHTML +="  		  	    var parrent_el=tr_el.parentNode;";
  scrTag.innerHTML +="  		  	    parrent_el.removeChild(tr_el);";
  scrTag.innerHTML +="  	  				break;";
  scrTag.innerHTML +="  		  		}else{";
  scrTag.innerHTML +="  		  			tr_el=tr_el.parentNode;";
  scrTag.innerHTML +="  		  		}";
  scrTag.innerHTML +="  		  	}";
  scrTag.innerHTML +="		}";
  scrTag.innerHTML +="	}";
  scrTag.innerHTML +="    }";
  scrTag.innerHTML +="}";
  scrTag.innerHTML +="";
  document.body.appendChild(scrTag); 
  
}

add_Buttons_mn();


GM_log("Done");