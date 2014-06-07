// ==UserScript==
// @name        nfl video link
// @namespace   nfl video link
// @include     http://www.nfl.com/videos/*
// @version     1
// @grant       none
// ==/UserScript==


//http://www.nfl.com/videos/nfl-videos


findcomments(document);

function findcomments(d)
{
    if(!d)
        return;
    if(d.nodeType==8){
		if(d.data.match(/VIDEO DETAILS:/)){
			var b = d.data.split("Video URL:      ")[1];
			var c = b.split("700k.mp4")[0];
			
					
			var p = document.getElementsByClassName("caption");
			var link = document.createElement("a");
			link.textContent = "700k ";
			link.href = c + "700k.mp4";
			p[0].appendChild(link);
			
			var p1 = document.getElementsByClassName("caption");
			var link1 = document.createElement("a");
			link1.textContent = "3200k";
			link1.href = c + "3200k.mp4";
			p1[0].appendChild(link1);
			
			
		}	
	}
    if(!d.childNodes)
        return;
    for(var i=0;i<d.childNodes.length;i++)
        findcomments(d.childNodes[i]);
}