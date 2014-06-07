// ==UserScript==
// @author	Don Draper - http://promote-my-site.com
// @name	Digg Shouts
// @description	Modification of Digg Friends Easy to Digg Shouts
// Works on the shoutsin pages, and changes URLs to the actual story as instead of the Digg summary page.
// Puts a Digg link on the shout itself.
// @include	http://digg.com/users/*/shoutsin*
// ==/UserScript==

(function() {

if (/shoutsin/.test(window.location.href))
{

var divs = document.getElementsByTagName('div');
var rowcount = 0;

    for(var i=0; i<divs.length; i++ )

      {
        var div = divs[i];

       /**for current  Digg Design**/
        if (/shout-/.test(div.id))
          {
						var shouta = div.id.split('-');
						var shoutid = shouta[1];
						delshout = document.getElementById('delete-shout-'+shoutid);

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
                          links[j].innerHTML = '<span id="diggs' + rowcount + '" ><strong id="diggs-strong-' + rowcount + '">' + dgcnt + '</strong></span>';

													// Added the shoutid to the params to make things easier
                          var res = makeDNODE(t, rowcount, div, shoutid );
                          break;

                        }

                }

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
var str = 'javascript:dig(' + TS.join(',') + ');';
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
function makeDNODE(t, rowcount, div, shoutid )
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

														// Break out the link to the actual article so we can replace it
														var splitter = '<h3 id="title">';
														var r1 = details.responseText;
														var r2 = r1.split(splitter);
														var r3 = r2[1].split("</h3>");
														var r4 = r3[0].split('"');
														var hr = r4[1];

                            var DiggItLink = MyGetDiggitLink(details.responseText, mrowcount);

                            if(DiggItLink)
                              {

																// Replace all links to the Digg page with the link to the actual article
             										var l2 = div.getElementsByTagName('a');
              									for(var j=0; j<l2.length; j++ ) {
																	 if ( l2[j].href == t && l2[j].className != 'digg-count') {
																		 l2[j].href = hr;
																	 }
																}



                                 span.id = 'diglink' + mrowcount;
                                 span.className = "digg-it";
                                 var a =  document.createElement('a');
                                 a.href = DiggItLink;
																 a.id = 'digg-shout-'+shoutid;
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