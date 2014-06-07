// ==UserScript==
// @name           Minecraft For Free Fullscreen Mod
// @namespace      http://www.dylanmediagroup.com
// @description    Play Minecraft For Free on a fullscreen applet.
// @include        *
// ==/UserScript==

var viewportwidth;
var viewportheight;
var minecraft = document.getElementsByTagName('applet');

// Finds User's Screen Dimentions

 if (typeof window.innerWidth != 'undefined')
 {
      viewportwidth = window.innerWidth,
      viewportheight = window.innerHeight
 }
  
 else if (typeof document.documentElement != 'undefined'
     && typeof document.documentElement.clientWidth !=
     'undefined' && document.documentElement.clientWidth != 0)
 {
       viewportwidth = document.documentElement.clientWidth,
       viewportheight = document.documentElement.clientHeight
 }
  
 else
 {
       viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
       viewportheight = document.getElementsByTagName('body')[0].clientHeight
 }

// Resizes Applet, Changes Styles, Removes Ads
var container = document.getElementsByClassName('mid_content');

if(viewportwidth > "1600" && viewportwidth < "1700" && viewportheight > "900" && viewportheight < "1000"){
for (i=0; i<container.length; i++)
{
		minecraft[i].style.width = viewportwidth - 50 + "px";
		container[i].style.margin = "-125px -230px";
}

}else{
for (i=0; i<container.length; i++)
{
		minecraft[i].style.width = viewportwidth - 50 + "px";
		container[i].style.margin = "-125px 0";
}

}

var gamebox = document.getElementsByClassName('game_box');

for (i=0; i<gamebox.length; i++)
{
	gamebox[i].style.width = viewportwidth - 50 + "px";
}

if(window.location.href === "http://minecraftforfree.com/play.php"){

for (i=0; i<minecraft.length; i++)
{
	minecraft[i].style.height = viewportheight - 50 + "px";
	minecraft[i].style.width = viewportwidth - 50 + "px";
}

var container = document.getElementsByClassName('mid_content');

var gamebox = document.getElementsByClassName('game_box');

for (i=0; i<gamebox.length; i++)
{
	gamebox[i].style.width = viewportwidth - 50 + "px";
	gamebox[i].style.position = "fixed";
	gamebox[i].top = "130px";
	gamebox[i].left = "0";
}

var ads = document.getElementsByTagName('ins');

for (i=0; i<ads.length; i++)
{
	ads[i].style.visibility = "hidden";
}

var footer = document.getElementsByClassName('footer');

for (i=0; i<footer.length; i++)
{
	footer[i].style.visibility = "hidden";
}

var title = document.getElementsByClassName('content_box content_title');

for (i=0; i<title.length; i++)
{
	gamebox[i].style.width = viewportwidth - 50 + "px";
}

}