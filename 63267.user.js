// ==UserScript==
// @name			  Wykop black list
// @version			0.0.0.0.0.00001 pre-alpha
// @include     http://www.wykop.pl/*
// ==/UserScript==

/****************************************************************************************/
/*** Skrypt dostarczający alternatywną funkcjonalność "Czarnej listy" dla wykop.pl.   ***/
/*** Pozwala łatwo blokować komentarze użytkowników po nickach                        ***/
/*** z możliwością zastosowania gwiazdki zastępującej dowolny ciąg znaków             ***/
/*** Działa na Operze i Firefoksie z zainstalowanym dodatkiem Greasemonkey            ***/
/****************************************************************************************/
/**/              var vbl=new Object(); vbl.trolle=new Array(                         /**/   
/****************************************************************************************/  
/*** Poniżej lista trolli, w cudzysłowach, oddzielamy przecinkami                     ***/                                                                               
/****************************************************************************************/   
 "InformacjaNieprawdziwa*",
 "*LATO*",
 "KolorowyBuraczekZWernisazu"                                                                                                                                                                    
/****************************************************************************************/  
/**/                                   );                                             /**/                                                                           
/****************************************************************************************/ 

vbl.base_url="wykop.pl/";

vbl.minusuj_trolle = true;       //zmien "true" na "false", jeśli nie chcesz automatycznie minusować trolli
vbl.minusuj_dokarmiaczy = false; //zmien "false" na "true", jeśli chcesz automatycznie minusować dokarmiaczy :)

vbl.pass="WYKOP KURWA!";

vbl.minusuj=function(id)
{
    req=new new XMLHttpRequest();
    req.onreadystatechange = function(){/*bum*/};
    req.open("POST", "http://"+vbl.base_url+"requestcommentvote");
    req.send("comment_array="+id+",-1");
}

vbl._click=function(el)
{
    if(el.click)  // Opera, IE
    {
        el.click();
    }                  
    else           // Firefox...
    {
	      if(document.createEvent) 
        {
	          var evObj = document.createEvent('MouseEvents');
	          evObj.initEvent( "click", true, false );
	          el.dispatchEvent(evObj);
	      } 
        else if( document.createEventObject ) 
        {
        	  el.fireEvent('onclick');
	      }
	  }
        
    
}

vbl.init=function()
{
    if(!document.location.href.match(vbl.base_url))
        return 1;

    vbl.zalogowany=!document.getElementById("login-form").childNodes[1].childNodes[1];

    vbl.wzorki=new Array();
    for(i in vbl.trolle)
    {
        vbl.wzorki[i]=new RegExp("^"+vbl.trolle[i].replace(/ /g,"").replace(/\*/g,".*")+"$","");
    }
    vbl.li=document.getElementsByTagName("li");

    var poprz_troll=false;
    
    for(i in vbl.li)
    {       
        if(vbl.li[i].id.match(/comment-\d+/i))
        {
            var jest_trollem=false;
            var nick=vbl.li[i].childNodes[1].childNodes[1].childNodes[1].innerHTML;
            for(j in vbl.wzorki)
            {
                if(nick.match(vbl.wzorki[j]))
                {
                    jest_trollem=true;
                    if(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1].className=="hide")
                    {
                        vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1].className="show";
                        vbl._click(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1]);
                        vbl._click(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1]);
                    }
                    if(vbl.minusuj_trolle && vbl.zalogowany)
                    {
                       // vbl.li[i].childNodes[1].childNodes[3].childNodes[3].childNodes[5].click();   
                       vbl.minusuj(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1].title.replace(/\D/g,""));
                    }   
                    vbl.li[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML="-9999";
                    vbl.li[i].childNodes[1].childNodes[1].childNodes[1].innerHTML += "&nbsp;&nbsp; -- troll";  
                    break;
                }
            }
            
            if(!jest_trollem && poprz_troll && vbl.li[i].className=="level-2")
            {
                if(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1].className=="hide")
                {
                    vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1].className="show";
                    vbl._click(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1]);
                    vbl._click(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1]);
                }
                if(vbl.minusuj_dokarmiaczy && vbl.zalogowany)
                {
                   // vbl.li[i].childNodes[1].childNodes[3].childNodes[3].childNodes[5].click();
                   vbl.minusuj(vbl.li[i].childNodes[1].childNodes[3].childNodes[1].childNodes[1].title.replace(/\D/g,""));
                }           
                vbl.li[i].childNodes[1].childNodes[3].childNodes[3].childNodes[1].innerHTML="-999";
                vbl.li[i].childNodes[1].childNodes[1].childNodes[1].innerHTML += "&nbsp;&nbsp; -- dokarmiacz trolli";  
            }
            
            if(jest_trollem && vbl.li[i].className=="level-1")
            {
                poprz_troll=true;
            }
            else if(!jest_trollem && vbl.li[i].className=="level-1")
            {
                poprz_troll=false;
            }
        }
    }
    return 1;
}
if(window.addEventListener) // normalne przeglądarki
    window.addEventListener('load', vbl.init, false);
else if(window.attachEvent) // IE...
    window.attachEvent('load', vbl.init);             
else if(setTimeout)         // jakieś kompletnie archaiczne przeglądarki
    setTimeout(function(){vbl.init();},1000);
else                        // Czyzby IE 0.1 beta? :o
    vbl.init();