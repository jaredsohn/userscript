// ==UserScript==
// @author	VGK http://www.askedweb.com/
// @name	Digg Friends Easier
// @description	Adapted from the Digg Friends Easy script: Digg Helper For New Digg. Puts a "diggit" next to every post under /friends/submissions & /friends/shoutsin section.
// @include	http://digg.com/users/*/friends/submissions*
// @include	http://www.digg.com/users/*/friends/submissions*
// @include	http://www.digg.com/users/*/friends/shoutsin*
// @include	http://digg.com/users/*/friends/shoutsin*
// ==/UserScript==


(function() {

if ((/friends\/submissions/.test(window.location.href)) || (/friends\/shoutsin/.test(window.location.href))) 
{ 
var divs = document.getElementsByTagName('div');
var rowcount = 0;
    for(var i=0; i<divs.length; i++ )
   
      {
        var div = divs[i];
       
       /**for current  Digg Design**/
        if ((/item\-digg/.test(div.id)) || (/shout/.test(div.id)))
          {
            var t = '';
             var links = div.getElementsByTagName('a');
              for(var j=0; j<links.length; j++ )
                {

                  var l = links[j].href;
                  var cln = links[j].className;
                  
                  /**for current  Digg Design**/
                  /** At this we want to find link with atribute class='digg-count' **/
                     if (/digg\-count/.test(cln)) 
                        {
                          rowcount++;
                          var dgcnt = links[j].innerHTML;
                          t = l;
                          
                          /**for current  Digg Design**/
                          /** replace link content **/
                          links[j].innerHTML = '<span id="diggs' + rowcount + '"><strong id="diggs-strong-' + rowcount + '">' + dgcnt + '</strong></span>';
                           
                          var res = makeDNODE(t, rowcount, div ); 
                          break;

                        }
                  
                }
             
            
             /** for debug only **/  
            // break;
          }
        
      }


}

// end of anonym func 
})();


//-------------------------------------
function MyGetDiggitLink(s, rowcount){
var spliter = 	'javascript:dig(';
var	TS = s.split(spliter);
if(TS.length < 2){return '';}
var str = 	TS[1];
var spliter = 	')">';
var	TS = str.split(spliter);
var str = 	TS[0];
var spliter = 	',';
var	TS = str.split(spliter);
TS[0] = rowcount;
var str = 'javascript:dig(' + TS.join(',') + ')';
return str;
	}
//-------------------------------------	
/*
* Function makeDNODE
* t - url string
* rowcount - row number to callback
* div - reference to div node
* return false when done;
*/
function makeDNODE(t, rowcount, div )
{
	var ret = true;
                    GM_xmlhttpRequest({
                     method:"GET",
                     url:t,
                     headers:{
                       "User-Agent":navigator.userAgent
                     },
                     onload:function(details) 
                         {
                            ret = false;
                            var mrowcount = rowcount;
                            var mdiv = div;
                            var span = document.createElement('span');
                            
                            var DiggItLink = MyGetDiggitLink(details.responseText, mrowcount); 
                            if(DiggItLink)
                              {
                                 span.id = 'diglink' + mrowcount;
                                 span.className = "digg-it";
                                 var a =  document.createElement('a');
                                 a.href = DiggItLink;
                                 var txt = document.createTextNode(' ');
                                 div.appendChild(txt);
                                 span.appendChild(a);
                                 var txt = document.createTextNode('[digg]');
                                 a.appendChild(txt);
                                 mdiv.appendChild(span);
                               
                               }
                               else
                               	  {
                               	    span.innerHTML = ' <strong>dugg!<strong>';
                               	    mdiv.appendChild(span);
                               	  }

                         
                         },
                         
                        onerror:function(details)
                         {
                           ret = false;
                           var span = document.createElement('span');
                           var txt = document.createTextNode(details.statusText);
                           span.appendChild(txt);
                           div.appendChild(span);
                           
                         }
                     
                   });  	
return ret;
}
//-------------------------------------