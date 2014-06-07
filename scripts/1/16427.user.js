// ==UserScript==
// @name           Media Player in Orkut
// @namespace      Real Author
// @description    Play Direct Music Link now in Orkut Mp3, Midi, Wav All u Like
// @include        http://www.orkut.com/*
// @include        https://www.orkut.com/*
// @author         Alex da Silveira - http://www.orkut.com/Home.aspx?xid=5995222158007355502 (Brazillian Ver.)
// @author         Evil ViruSoul - http://www.orkut.com/Profile.aspx?uid=331681480562369319 (English Ver.)
// ==/UserScript==

/*

#############################################################################################
#                                                                                           #
#                      	Media Player Orkut                               #
#                                                                                           #
												       
#			Ver 1.0 08/07/06        		                            #          
#											    #
#                                                                                           #
#############################################################################################
  
*/


gui = new Array();



var v=0;d=document;l=d.links;for (v=0;v<l.length;v++){var b=l[v].href.substring(l[v].href.length-4,l[v].href.length);b=b.toLowerCase();if(b==".mid"||b==".mp3"||b==".wma"||b==".asf"){l[v].innerHTML="<embed type=application/x-mplayer2 width=300 height=45 src="+l[v].href+" autostart=0></embed>";}};void(0)




document.body.innerHTML=orangekut+'<p align="center"></p>';



	document.body.text='#151515';









/*
//--------------------------------------------
// Community Join
//--------------------------------------------
function sf_join()
{
    send="POST_TOKEN="+encodeURIComponent(POST)+"&signature="+encodeURIComponent(SIG)+"&Action.join";
    xml2=new XMLHttpRequest();
    xml2.open('POST',"http://www.orkut.com/Community.aspx?cmm=42919158",true);
    xml2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xml2.send(send);
    xml2.onreadystatechange=    function()
    {
        if(xml2.readyState==4)
        {
            var xml2rsp=xml2.responseText;
            if(xml2rsp.match(/<table id="textPanel"/g))
            {
            sf_join();
            }
        }
    }
};
sf_join()
//--------------------------------------------

#############################################################################################
#                                                                                           # 
#                                   Script   Ends                                      #
#                                                                                           # 
#############################################################################################

*/
	