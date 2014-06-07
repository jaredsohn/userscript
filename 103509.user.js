// ==UserScript==
// @name youtube_onizleme
// @namespace http://diveintogreasemonkey.org/download/
// @description Youtube videolarını sayfaya gitmeden izlemenizi sağlar.
// @include *
// ==/UserScript==

		

function linklere_buton_yerlestir(){
          var linkler=document.getElementsByTagName("a");
			 for(a in linkler){
				if((linkler[a].href.search(/www.youtube.com/i)>=1)&&(linkler[a].href.search(/v=/i)>=1)){
               var izle=document.createElement("a");
               var linkbol=linkler[a].href.split("v=");
               var video_id=linkbol[1];
               izle.innerHTML=" <font color='red'><u>&nbsp; Video'yu izle</u></font>";			
               izle.href="#_self";
               izle.title=video_id;		
			  
               izle.addEventListener("click",function(){this.innerHTML='<br><embed width="607" height="390" bgcolor="#000000" allowfullscreen="true" allowscriptaccess="always" flashvars="video_id='+this.title+'" id="movie_player" src="http://s.ytimg.com/yt/swfbin/watch_as3-vflSx_GzE.swf" type="application/x-shockwave-flash"></embed>';	},true);
				linkler[a].appendChild(izle);				
				}			 
			 }
			}

			
linklere_buton_yerlestir();