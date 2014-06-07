// ==UserScript==

// @name          Newgrounds Flash Resizer

// @description	  Resizing options for viewing Flash files on Newgrounds

// @include       http://newgrounds.com/portal/view/*
// @include       http://www.newgrounds.com/portal/view/*

// @include       http://newgrounds.com/portal/viewer.php*
// @include       http://www.newgrounds.com/portal/viewer.php*

// ==/UserScript==


var embed_tag,original_size={w:0,h:0},url,just_visiting,i;

var layout,layout_width_offset=32;
var divs=document.getElementsByTagName("div");

var custsizestr="Enter a new size.  This size is a scaling factor, so the result size will be this number squared.\n(i.e. to make a flash 9x larger, you would input 3)";

// We have some menu commands.
GM_registerMenuCommand("Default Size",sizeOne);

GM_registerMenuCommand("1.5x Larger",sizeTwo);

GM_registerMenuCommand("2x Larger",sizeThree);

GM_registerMenuCommand("3x Larger",sizeFour);

GM_registerMenuCommand("4x Larger",sizeFive);

GM_registerMenuCommand("Custom size...",customSize);

GM_registerMenuCommand("Open in same tab",thisTab)



// functions for the right click menu commands.

function resizeIt(magnification)

{var new_layout_width=(original_size.w*magnification)+layout_width_offset;
 layout.style.width=new_layout_width.toString()+"px";
 embed_tag.setAttribute("width",original_size.w*magnification);

 embed_tag.setAttribute("height",original_size.h*magnification);

}



function sizeOne()

{if(!just_visiting)

  resizeIt(1);

 if(GM_getValue("openpref")!="default")

  GM_setValue("openpref","default");

}



function sizeTwo()

{if(!just_visiting)

  resizeIt(1.25);

 if(GM_getValue("openpref")!="1.25x")

  GM_setValue("openpref","1.25x");

}



function sizeThree()

{if(!just_visiting)

  resizeIt(1.5);

 if(GM_getValue("openpref")!="1.5x")

  GM_setValue("openpref","1.5x");

}



function sizeFour()

{if(!just_visiting)

  resizeIt(1.75);

 if(GM_getValue("openpref")!="1.75x")

  GM_setValue("openpref","1.75x"); 

}



function sizeFive()

{if(!just_visiting)

  resizeIt(2);

 if(GM_getValue("openpref")!="2x")

  GM_setValue("openpref","2x"); 

}



function customSize()

{var newSize=prompt(custsizestr,GM_getValue("customsize").toString());

 if(newSize=="" || newSize==null || newSize==GM_getValue("customsize").toString())

  return;

 while(isNaN(newSize))

 {newSize=prompt(custsizestr,GM_getValue("customsize").toString());

   if(newSize=="" || newSize==null || newSize==GM_getValue("customsize").toString())

    return;

 }

 resizeIt(newSize);

 if(GM_getValue("openpref")!="custom")

 {GM_setValue("openpref","custom");

  GM_setValue("customsize",newSize);

 }

}



function thisTab()

{if(!just_visiting)

  window.location.href=url;

 if(GM_getValue("openpref")!="thistab")

  GM_setValue("openpref","thistab");

}



// initialization

// see if we're just browsing NG or trying to view a flash

if(window.location.href.match("newgrounds\.com/portal/view/"))

 just_visiting=true;

else

 just_visiting=false;

if(!just_visiting)

{// we need to get a reference to the <embed> tag

 embed_tag=document.getElementsByTagName("embed")[0];
 
 // store its size off in original_size

 original_size.w=embed_tag.getAttribute("width");

 original_size.h=embed_tag.getAttribute("height");



 // get the url of the flash

 url=embed_tag.getAttribute("src");
 
 // do a quick css hack to make their layout resize when we resize
 for(i=0;i<divs.length;i++)
 {if(divs[i].getAttribute("id")=="popmovie")
   divs[i].style.width="100%";
 }
 // now the width of the entire layout will be controlled by the width
 // of this div, which we'll grab a reference to so we can resize it easily
 for(i=0;i<divs.length;i++)
 {if(divs[i].getAttribute("id")=="pop")
  {layout=divs[i];
   break;
  }
 }
 // let's also hide the ad area, just because I can
 for(i=0;i<divs.length;i++)
 {if((divs[i].className=="hr") || (divs[i].className=="popadtext"))
   divs[i].style.display="none";
 }
 document.getElementsByTagName("br")[0].style.display="none";

}



// and finally load prefs and adjust the size of the flash as necessary.

switch(GM_getValue("openpref"))

{case "default":

  break;

 case "1.25x":

  sizeTwo();

  break;

 case "1.5x":

  sizeThree();

  break;

 case "1.75x":

  sizeFour();

  break;

 case "2x":

  sizeFive();

  break;

case "custom":

  customSize();

  break;

 case "thistab":

  thisTab();

  break;

 default:

  //if we're here then this is the first time visiting newgrounds since

  //installing the script, so we should init the default values

  GM_setValue("openpref","normal");

  GM_setValue("customsize","1");

}