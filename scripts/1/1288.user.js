// DKosAttent
// version 0.3
// 2005-06-24
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DailyKos Attention", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Dailykos Attention
// @description     Makes a liquid layout, and gets rid of the ugly logo and bright orange
// @include         http://www.dailykos.com/*
// @include         http://dailykos.com/*
// ==/UserScript==



//First we remove the new garish logo from the webpage
  var mast = document.getElementsByTagName('img');

  if( mast )
  {
      mast[0].src = "";
      mast[0].alt = "";			
      mast[0].height = "0";
      mast[0].width = "0";
  }


//This is the function for changing any styles	
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


//Now lets change some of the styles...
//First we get rid of the silly fixed width column image in the background and set the color to white		
addGlobalStyle('body {background:#fff url(); color: #000; padding: 0; margin: 0; font: 11px/1.6 Verdana, Arial, sans-serif; line-height:1.45em ! important;}');
//Make things liquid		
addGlobalStyle('#container {background: url(); width: 100%; height: 93px; margin: 0 auto; position: relative; background-color:white ! important;}');
//Push the main text to the left side and let it auto expand		
addGlobalStyle('#main {position:absolute; left:0px; padding:0px 200px 0px 18px; margin:0px; width:auto; background-color:white; z-index:1 ! important;}');
//Hide those god damn blinking ads		
addGlobalStyle('#ads {display:none; ! important;}');
//Make the mainmenu flush right	and set logo as the background image
//Yeah its ugly - but so is the source HTML flow...a pain for making liquid layouts
//plus I didn't know how to add a new element before everything else in a div	
addGlobalStyle('#sidebar {position:absolute; right:0px; margin:0px; width: 194px; font-size: .9em; padding:150px 0px 30px 0px; margin-top:0px; border-left:solid 1px #ccc; background-color:white; background: url(http://img155.echo.cx/img155/176/littleman019ma.jpg) top left no-repeat; z-index:2 ! important;}');
//Tone down that damn bright orange		
addGlobalStyle('#sidebar h3 {background:#e59044;  font-weight:bolder; color: #FFF; padding: 0.25em 10px 0.15em 10px; ! important;}');
addGlobalStyle('#sidebar a {border-bottom:solid 1px #ccc; ! important;}');
addGlobalStyle('#sidebar li a {border-bottom:none; ! important;}');
addGlobalStyle('#footer {display:none ! important;}');
//Make the comment cells indent less
addGlobalStyle('dd {margin-left: 16px ! important;}');

//Last we add the Daily Kos name on top of the logo and make it link home. Its ugly but it works!		
var main, newElement;
main = document.getElementById('main');
if (main) {
    newElement = document.createElement('div');
		var s = '<a href="/" style="color:#ffc080; line-height: .8em; opacity: 0.7">Daily Kos</a>';
		newElement.setAttribute("style", "position:absolute; right:0px; padding:0px 0px 0px 0px; width:194px; color:white; font-size:40px; z-index:3");
		newElement.innerHTML = s;
    main.parentNode.insertBefore(newElement, main);
}
