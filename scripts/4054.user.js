// DKosWide
// version 0.3
// 2005-06-24
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DailyKos Wide", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Dailykos Wide
// @description     Makes a liquid layout, and gets rid of the ugly logo and bright orange
// @include         http://www.dailykos.com/*
// @include         http://*.dailykos.com/*
// ==/UserScript==



//First we remove the new garish logo from the webpage
//(this no longer works with new ajaxy dkos)
/*  var mast = document.getElementsByTagName('img');

  if( mast )
  {
      mast[0].src = "";
      mast[0].alt = "";			
      mast[0].height = "0";
      mast[0].width = "0";
  }
*/



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
addGlobalStyle('body {background:#fff url(); color: #000; padding: 0; margin: 0; font: 13px/1.6 Verdana, Arial, sans-serif; line-height:1.45em ! important;}');

//Make things liquid		
addGlobalStyle('#container {background: url(); width: 100%; border: none; margin: 0 auto; position: relative; background-color:white ! important;}');

//Push the main text to the left side and let it auto expand with a 244px buffer of padding for the right menu 	
addGlobalStyle('#main {position:absolute; left:0px; padding:0px 250px 0px 25px; margin:0px; width:auto; background-color:white; z-index:1 ! important;}');

//Hide those god damn ads	
//(personally I use adblock extension and whitelist dailykos)
//(the result is that no ads show on the front page, but they do show on all other pages)
addGlobalStyle('#ads {display:none; ! important;}');

//Make the mainmenu flush right	and set logo as the background image
//Yeah its ugly - but so is the source HTML flow...a pain for making liquid layouts
addGlobalStyle('#sidebar {position:absolute; right:0px; margin:0px; width: 240px; font-size: .9em; padding:150px 0px 30px 0px; margin-top:0px; border-left: thin dotted lightgrey; background-color:white; background: url(http://img222.imageshack.us/img222/9366/koswa7.png) top center no-repeat; z-index:2 ! important;}');

//Tone down that damn bright orange		
addGlobalStyle('#sidebar h3 {background:#e59044;  font-weight:bolder; color: #FFF; padding: 0.25em 15px 0.15em 15px; ! important;}');
addGlobalStyle('#sidebar a {border-bottom:solid 1px #ccc; ! important;}');
addGlobalStyle('#sidebar li a {border-bottom:none; ! important;}');
addGlobalStyle('#footer {display:none ! important;}');

//Remove the garish top masthead
addGlobalStyle('#mastheadSpan {display:none ! important;}');

//Make the comments also have full width capabilites (not sure if 'e' needs to be in there
addGlobalStyle('#comments,#e {width:100%;_width:100%;}');


/*
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
*/

