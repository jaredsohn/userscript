// ==UserScript==

// @name           YouPorn - Beautifier

// @namespace      youpornbeautifier

// @description    Improves video play experience.

// @source         http://userscripts.org/scripts/show/20416

// @identifier     http://userscripts.org/scripts/source/20416.user.js

// @version        0.1.4

// @date           2009-04-07

// @creator        dinimer

// @include        http://www.youporn.com/watch/*

// @include        http://youporn.com/watch/*

// @include        http://www.youporn.com

// @include        http://youporn.com

// ==/UserScript==





/***********************************/

/*   C O N F I G U R A T I O N S   */

/***********************************/



var autoPlay = false;  //set to true if you wish that the movie plays automatically





/***********************************/

/*   L I C E N S E                 */

/***********************************/



// This software is released under the MIT license

// 

// Copyright (c) 2008 dinimer http://userscripts.org/users/42842

// 

// Permission is hereby granted, free of charge, to any person obtaining a copy

// of this software and associated documentation files (the "Software"), to deal

// in the Software without restriction, including without limitation the rights

// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

// copies of the Software, and to permit persons to whom the Software is

// furnished to do so, subject to the following conditions:

// 

// The above copyright notice and this permission notice shall be included in

// all copies or substantial portions of the Software.

// 

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN

// THE SOFTWARE.





/***********************************/

/*   C H A N G E L O G             */

/***********************************/


// 0.1.4 [2009-04-07]
//       New: Auto enter, without click
//       Fixed: Ads removing
//
// 0.1.3 [2008-02-06]
//       New: secondary ads removing
//
// 0.1.2 [2008-02-04]
//       Fixed: del() possible failure
//

// 0.1.1 [2008-01-17] 

//       New: now under MIT licence

//       Fixed: after-movie ads removed

// 

// 0.1.0 [2008-01-16] 

//       initial public release

// 





// --- do not make changes below this line, unless you know what you are doing ---------------------------------------------------------------------------

function id(what) {

  return document.getElementById(what);

}



function hide(what){

	what = isString(what)? id(what) : what;

	return what? what.style.display = "none" : null;

}



function del(what){;
	var ret = false;
	if(what && what.parentNode){
		ret = what.parentNode;

		what.parentNode.removeChild(what);
	}
	return ret;

}



function isString(what){

	if(typeof what == "string"){

		return true;

	}

	if(typeof what == "object"){  

		return what.constructor.toString().match(/string/i)? true : false;		

	}

	return false;

}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle(" #main-ad, #ft-ad-container, #primaryAdTop, #primaryAdTop, #primaryAdBottom, #ft{display:none;} ");



//auto enter
var enterbutton = id("enterbutton");
if(enterbutton){
	enterbutton.click();
}


//resize player

var player = id("mpl");



//// FLASHVARS //////

// file 		= 	http://download.youporn.com/download/167387/flv/blabla.flv

// et_url		=	http://pages.etology.com/xml/29112.php                 <-- this is after-movie-ads

// height		=	470

// width		=	600

// location		=	http://files.youporn.com/player/etologyplayer4.swf

// showdigits	=	false

// bufferlength	=	3

// type		=	flv

// usekeys		=	false

// autostart		=	true

var mpl = id("mpl");

var flashvars = mpl.getAttribute("flashvars").split("&");
var container = del(mpl);
if(container){


	var newFlashvars = "";

	for(var i=0; i<flashvars.length; i++){

		var pair = flashvars[i].split("=");

	

		if(pair[0] == "et_url"){

			pair[1] = ""; //shut up after-movie-ads

		}

		if(pair[0] == "height"){

			pair[1] = "744";

		}

		if(pair[0] == "width"){

			pair[1] = "950";

		}

		if(pair[0] == "autostart"){

			pair[1] = autoPlay? "true" : "false";

		}

		newFlashvars += (pair[0]) + "=" + (pair[1]) + "&"

	}



	//// ATTRIBUTES /////

	// id			=	mpl

	// width		=	600

	// height		=	470

	// flasvars		=	<see above>

	// allowfullscreen = 	true

	// quality		=	high

	// name		=	mpl

	// src		= 	http://files.youporn.com/player/etologyplayer4.swf

	var newMpl = document.createElement('embed');

	newMpl.setAttribute("id", 				"mpl");

	newMpl.setAttribute("width", 			"950");

	newMpl.setAttribute("height", 			"744");

	newMpl.setAttribute("flashvars", 		newFlashvars);

	newMpl.setAttribute("allowfullscreen", 	"true");

	newMpl.setAttribute("quality", 			"high");

	newMpl.setAttribute("name", 			"mpl");

	newMpl.setAttribute("src", 				mpl.getAttribute("src"));
	
	id("player").style.height = "744px";

	id("player").appendChild(newMpl);

}
