// ==UserScript==
// @name         Invisible Fix
// @author       No Name
// @description  Some Fixes in orkut 
// @include      http://*.orkut.*
// @exclude      http://*.orkut.*/*GLogin.aspx?*

// ==/UserScript==

for( var i = 0, link; link =document.links[i]; i++ )
{if(link.offsetWidth==0 && link.href != "javascript:void(0);" && link.innerHTML.length <6 &&  !link.search.match(/\?q=/gi))
{link.appendChild(document.createTextNode("IF"));
link.style.color=(link.href.match(/=$/))?"red":"green";}}


{
			if(document.getElementById("liframe")!=null){
				var liframe = document.getElementById("liframe");
				liframe.parentNode.removeChild(liframe);
			}
		}


function fuck_google(){if(document.images[2].src.match(/b/gi)) { 
                   fuck = document.images[3]                   }  
            else { fuck = document.images[2]                   }
}        fuck_google()

if(fuck.src.match(/(mittel|medium)/gi)){
 cabeca   = document.getElementsByTagName('head').item(0)      ;

  icone = document.createElement('link')                       ;  
  icone . href= fuck . src                                     ;
  icone . rel="SHORTCUT ICON"                                  ;    
  icone . type="image/x-icon"                                  ; 
     
           cabeca.appendChild(icone)                           ;
}

//Original Credit: anurag pratik[http://userscripts.org/users/41083]