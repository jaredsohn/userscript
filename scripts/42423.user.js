// ==UserScript==
// @name           Torrentz Direct-Download v2 
// @description    Add direct download links to torrent links in the Torrentz Search Result Page, rewritten using switch[faster]
// @include        http://www.torrentz.com/*
// @include        http://www.torrentz.eu/*
// @include        http://*torrentz.com/*
// @include        http://*torrentz.eu/*
// @date           2009-03-05
// @version        2.0

// @author	   	 yogesh[DOT]mangaj[AT]gmail[DOT]com
// ==/UserScript==

// Class for torrents links div is download

var torrentzDL = {
init: function() {

   GM_addStyle("div.download dl dt a.torrentz {color: #336699; text-align: center; font-weight: normal; font-size: 0.8em; line-height: 10px;} div.download dl dt a.torrentz:hover{color: #33CC00;} div.download dl dt a.torrentz:visited{color: #C1C1C1;}");

	
   var dts = document.getElementsByClassName("download")[0].getElementsByTagName("dt");
	var j=0;
								
for(var i=0;i<dts.length;i++)
{ 
	var href = dts[i].getElementsByTagName("a")[0].href;
	var hrfd = href.split("/");

     	var dllink = document.createElement("a");
			dllink.setAttribute("class","torrentz");
			dllink.href = href;
			dllink.style.display = 'block';
				
     	switch(hrfd[2]) {	
	
   	case "thepiratebay.org":
		dllink.href = "http://torrents.thepiratebay.org/"+hrfd[4]+"/"+hrfd[5]+"."+hrfd[4]+".TPB.torrent";
		break;
					
	case "www.vertor.com":	
		dllink.href = "http://www.vertor.com/index.php?mod=download&id="+hrfd[4];
		break;
					
        case "fenopy.com":
		dllink.href = href.replace("==/index.html","==/download.torrent");
		break;

        case "www.h33t.com":
		dllink.href = href.replace("details.php?id=","download.php?id=");
		break;

        case "www.mybittorrent.com":
		dllink.href = href.replace("/info/","/dl/");
               break;   

	case "coda.fm":
		dllink.href = "http://coda.fm/"+hrfd[3]+"/"+hrfd[4]+"/torrent/download";
		break;

	case "torrentportal.com":
		dllink.href = href.replace("/details/","/download/");
		break;

         case "btjunkie.org":
		dllink.href = "http://dl.btjunkie.org/"+hrfd[3]+"/"+hrfd[4]+"/"+hrfd[5]+"/download.torrent";
               break;
               
         case "rarbg.com":
               dllink.href = "http://rarbg.com/download.php?id="+hrfd[6];
               break;
               
         case "www.torrentreactor.net":
               dllink.href = "http://dl.torrentreactor.net/download.php?id="+hrfd[4]+"&name="+hrfd[5];
               break;
               
         case "www.fulldls.com":
               dllink.href = href.replace("/torrent-","/download-").replace(".html","-Fulldls.torrent");
               break;
               
         case "www.bittorrent.am":    
               hrfd[7] = hrfd[7].replace(".html","");           
               dllink.href = "http://www.bittorrent.am/download.php?id="+hrfd[4]+"&name="+hrfd[7];
         		break;
               
         case "www.newtorrents.info":
               dllink.href = "http://www.newtorrents.info/down.php?id=" + hrfd[4];
               break;
               
         case  "extratorrent.com":
               dllink.href = "http://extratorrent.com/download.php?id=" + hrfd[4];
               break;    
               
         case "torrentdownloads.net":
               dllink.href = "http://torrentdownloads.net/download.php?id=" + hrfd[4];
               break;

         case "www.btmon.com":
               dllink.href = href.replace(".torrent.html",".torrent");
               break;
                        

                        

			
	default: dllink.href = "";
                  j--;
                  break;					


					}



                                j++;
				dllink.target = "_blank";
				if(dllink.href != window.location.href) {
				dllink.appendChild(document.createTextNode("Direct Download " +j));
				dts[i].appendChild(dllink);
            }
				}
			}	
}

torrentzDL.init();