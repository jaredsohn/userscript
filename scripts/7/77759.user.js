// ==UserScript==
// @name           OTR Clicker v3.2
// @namespace      leinad6
// @description    OTR CLICKER by leinad6
// @include        http://www.onlinetvrecorder.com/*
// ==/UserScript==


// (C) 2010 by leinad6
//    Homepage: http://leinad6.kilu.de

function click(it) 
{
							 var evt = document.createEvent('MouseEvents');
							 evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
							 it.dispatchEvent(evt);
} 
function close()
{

	if(currentsite.match("buyclicks")&& !currentsite.match("bcbf.php") && !currentsite.match("newrunningcampaigns.php"))
	{		
                var Elements2=0;
				Elements2 = document.getElementsByTagName("a");
				if( Elements2[0].innerHTML=="mit diesem Link"){
				click(Elements2[0]);
				}
  

	}
}
function antiblock()
{

var test=document.getElementById("4efabf");
if(test){
test.style.visibility='hidden';
}

}



function autoclick()
{
var left=0; var right=0;
var searchstring = "<div id=\"gwphintext\" onmouseover=\"this.innerHTML='Hier  sind  Banner, die GWPs bringen'\" onmouseout=\"this.innerHTML='Banner mit GWP-Vergütung'\">Banner mit GWP-Vergütung</div>";
var first=0; var second=0;


var Elements = document.getElementsByTagName("div");
reArray = new Array();

for(var i=0; i < Elements.length;i++)
{
reArray.push( Elements[i].id );
}

var leftelement = document.getElementById(reArray[9]);
var rightelement = document.getElementById(reArray[10]);

if(Elements[2].innerHTML.match("Banner mit GWP-Vergütung")||Elements[3].innerHTML.match("Banner mit GWP Vergütung")){
var left=1;
}
if(Elements[5].innerHTML.match("Banner mit GWP-Vergütung")||Elements[6].innerHTML.match("Banner mit GWP Vergütung")){
var right=1;
}

if(left==1){
click(leftelement);
left=0;
}
else {
var rightelement = document.getElementById(reArray[9]);
}

if(right==1){
click(rightelement);
right=0;
}



if(right!=1 && left!=1)
{
    window.location.reload();
}

}

/**
* MAIN CONTENT
*/
var currentsite=window.location.href;
var ref=document.referrer;
var closeing = setInterval(function(){ close();},100);
	

if(currentsite.match("newrunningcampaigns")&& currentsite.match(".php")&& currentsite.match("onlinetvrecorder.com"))
{
	var clickit = setInterval(function(){autoclick();},6000);
	document.title = "OTR _ BANNERKLICK";
}
else if(clickit)
{
clearInterval(clickit);clearInterval(closeing);
}

if(currentsite.match("buyclicks")&& currentsite.match("bcbf.php"))
{
			var frame = document.getElementById("mainFrame");
					if(frame)
												{  
												//Auskommentieren um die Fenster kleiner zu machen: //window.resizeTo(1000,100);window.moveTo(0,100);     
												}
}




