// ==UserScript==
// @name           Ad Remover
// @description    Ersetzt Werbung auf Facebook mit einem netten Pic (häufiges update ^^)
// @author         Sebastian Schuch
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// @version        0.1
// ==/UserScript==

function getRandom(min, max)	
{
 	if(min > max) 
	{
  		return -1;
	 }
 
 	if(min == max) 
	{
  		return min;
 	}
 
 	var r;
 
 	do 
	{
  		r = Math.random();
 	}
 	while(r == 1.0);
 
 	return min + parseInt(r * (max-min+1));
}

grandparent = document.getElementById('globalContainer');
function getString()
{
    var temp=getRandom(1,5);
    if (temp==1)
    {
        return "<img src='http://files.sharenator.com/me_gusta2_s566x564_182695_580_Troll_Face_Meme-s566x564-184114.png' heigth='250px' width='250px'/>"; 
    }
    else if (temp==2)
    {
        return "<img src='http://www.estudiopirata.com/wp-content/uploads/2011/10/spray_trollface_copy1.png' heigth='250px' width='250px'/>";
    }
    else if (temp==3)
    {
        return "<img src='http://ssl.gstatic.com/android/market/org.lulz_industries.foreveralonewidget/hi-256-0-953976f7a934426412d0af020f5b11ef07539fa9' heigth='250px' width='250px'/>"; 
    }
    else if (temp==4)
    {
        return "<img src='http://g1.gstatic.com/android/market/org.lulz_industries.holdthebutton/hi-256-0-8fb21a37a0e3f073ca648e0eaa79589b21fd0cfd' heigth='250px' width='250px'/>"; 
    }
    else if (temp==5)
    {
        return "<img src='http://24.media.tumblr.com/avatar_8ea5ac248cf2_128.png' heigth='250px' width='250px'/>"; 
    }
    
}

var removeAdz = function()
{
    Werbung=document.getElementById('pagelet_ego_pane_w');
    Werbung.innerHTML=getString(); 
}
grandparent.addEventListener("DOMSubtreeModified", removeAdz, true);

removeAdz();