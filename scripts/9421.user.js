/* vim: ts=4 noet ai :







$Id: $







Greasemonkey User Script; adds links to the bottom of blog posts 



on Wordpress.  These links include integration with 



 - Digg www.digg.com



 - DotNetKicks www.dotnetkicks.com



 - del.icio.us



 - email



 - Reddit reddit.com



 - Live.com favorites.live.com











LICENSE







=======







This program is free software; you can redistribute it and/or modify it

under the terms of the GNU General Public License as published by the

Free Software Foundation; either version 2 of the License, or (at your

option) any later version.



This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of

MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General

Public License for more details.



You should have received a copy of the GNU General Public License along

with this program; if not, write to the Free Software Foundation, Inc.,

59 Temple Place, Suite 330, Boston, MA 02111-1307 USA



CHANGELOG



=========



Version 1.2

	- initial release



*/



// ==UserScript==







// @name           Wordpress Linker



// @namespace      http://shaneosullivan.wordpress.com



// @description    Add links to Wordpress posts to Digg and other sites.



// @include        http:*wordpress.com/wp-admin/post-new.php*



// @include        http:*wordpress.com/wp-admin/post.php?action=edit&post=*



// @exclude



// @version	   1.2







// ==/UserScript==







// The SCRIPT object enables this script to automatically updated using 



// the User Scripts Update script (http://userscripts.org/scripts/show/2296)



var SCRIPT = {



	name: "Wordpress Linker",



	namespace: "http://shaneosullivan.wordpress.com",



	description: 'Add links to Wordpress posts to Digg and other sites.',



	source: "http://userscripts.org/scripts/show/9421",			// script homepage/description URL



			



	identifier: "http://userscripts.org"	// script URL



                 + "/scripts/source/9421",



	version: "1.0",								// version



	date: (new Date(2007, 5 - 1, 23))		// update date



			.valueOf()



};







try {



	addEventHandler(window, "load", function () { 



	try {



		(unsafeWindow || window.wrappedJSObject || window)



				.UserScriptUpdates.requestAutomaticUpdates(SCRIPT);



	} catch (ex) {} }, false);



} catch (ex) {}







function myLog(msg) {



	try {

		unsafeWindow.console.log(msg);

	} catch (e) {



		GM_log(msg);
	}

}







var PAGE_SCRAPERS = [



	function () {



		//wordpressPreview mode 



		var btn = document.getElementById("edButtonHTML");



		if(!btn){return null;}



		if(btn.getAttribute("class")=="edButtonFore"){return null;}



		



		var iFrame = doc.getElementById('mce_editor_0');



		if(!iFrame){return null;}



		return {



			element: iFrame.contentDocument.body,



			param: "innerHTML",



			title: document.getElementById("title").value



		}



	},



	function () {



		//Wordpress source code mode



		var btn = document.getElementById("edButtonHTML");



		if(!btn){return null;}



		if(btn.getAttribute("class")!="edButtonFore"){return null;}



		var textarea = doc.getElementById('content');



		if(!textarea){return null;}



		return {



			element : textarea,



			param : "value",



			title: document.getElementById("title").value



		}



	}



];



var doc = unsafeWindow.document;


var buttons = [];

var button = doc.getElementById("publish");

if(!button) {
//The default behaviour is to only add the links when the article is published.

//To add the links when just saving drafts, uncomment the code below, 

//and comment out the 'addListener(button , "click", doLinkAdd);' line below. 

//Note that if you do this, save a draft then publish another day, 

//the URL links will be wrong, so you're probably better off not doing it.

/*
  var postDiv = doc.getElementById("poststuff");
  if(postDiv) {
    var inputs = postDiv.getElementsByTagName("p")[1].getElementsByTagName("input");
    for(var count = 0; count < inputs.length; count++) {
      if(inputs[count].defaultValue.indexOf("Save") > -1) {
        buttons[buttons.length] = inputs[count];
        
      } 
    }
  }
*/
} else {
  buttons[0] = button;
}



myLog("WordPress linker running");

var doLinkAdd = function(evt) {



	try {

		var pageInfo;



		for(var i = 0; i < PAGE_SCRAPERS.length; i++){



			pageInfo = PAGE_SCRAPERS[i]();



			if(pageInfo){break;}



		}



		



		if(!pageInfo){



			myLog("Failed to find an element to alter");



			return;



		}



	



		//If the div is already inserted, do nothing 



		if(pageInfo.element[pageInfo.param].indexOf('href="http://www.digg.com/submit?') >-1		



			){



			myLog("Found the links div in bodyElement with tagName" + pageInfo.element.tagName);	



			return;



		}	



		var url = doc.location.protocol +"//"+doc.location.host;		



		var origPostTitle = pageInfo.title;

		

		var badChars = ['?','#'];

		for(var i = 0; i< badChars.length; i++)

		{

		  if(origPostTitle.indexOf(badChars[i]) > -1) 

		  {

			origPostTitle = origPostTitle.replace(badChars[i], "");

		  }

		}

		
		//Remove all periods

		origPostTitle = origPostTitle.replace(".","");
		

		var titlePartsLC = origPostTitle.toLowerCase().split(" ");		



		var postTitle = origPostTitle.split(" ").join("+");		



		var today = new Date();

		var month = today.getMonth()+1;

		var day = today.getDate();

		



		url += "/"+today.getFullYear();



		url += "/" + (month < 10 ? "0" + month : month);



		url += "/" + (day < 10 ? "0" + day : day);



		url += "/" + titlePartsLC.join("-");



		var hrefTitle = "Post '" + origPostTitle;



		var content = 



			'\n<p><br/><strong>' +



				'Share this post:'+



			'</strong>'+



			'<a href="http://www.digg.com/submit?url='+url+'&amp;phase=2" target="_blank" title="'+hrefTitle+'">'+



				'digg it'+



			'</a>'+



			 '|'+ 



			'<a href="http://www.dotnetkicks.com/submit/?url='+url+'&amp;title='+postTitle+'" target="_blank" title="'+hrefTitle+'">' +



				'kick it' +



			'</a>' +



			 '|' +



			'<a href="mailto:?body=Thought%20you%20might%20like%20this:%20'+url+'&amp;subject='+postTitle+'" target="_blank" title="'+hrefTitle+'">'+



				'Email it' +



			'</a>' +



			 '|' + 



			'<a href="http://del.icio.us/post?url='+url+'&amp;title='+postTitle+'" target="_blank" title="'+hrefTitle+'">'+



				'bookmark it' +



			'</a>' +



		 	'|' + 



			'<a href="http://reddit.com/submit?url='+url+'&amp;title='+postTitle+'" target="_blank" title="'+hrefTitle+'">'+



				'reddit' +



			'</a>' +



		 	'|' + 



			'<a href="https://favorites.live.com/quickadd.aspx?marklet=1&amp;mkt=en-us&amp;url='+url+'&amp;title='+postTitle+'&amp;top=1" target="_blank" title="'+hrefTitle+'">' +



				'liveIt' +



			'</a>' +



			'</p>';



		



		pageInfo.element[pageInfo.param] += content;



		



	} catch (e) {



		myLog("caught exception "+e);



	}



	return true;



};



function addListener(node, name, fn, capture) {



  var newFn = fn;



  if(node.addEventListener) {



  	node.addEventListener(name, fn, capture);



  } else {



  	name = name.indexOf("on") == 0 ? name : "on"+name;



	  	if(typeof node[name] == "function") {



	  		var oldEvt = node[name];	  		



	  		node[name] = newFn = function (e) {



	  			fn(e);



	  			return oldEvt(e);



	  		}



	  	} else {



	  		node[name] = fn;



	  	}  	



  }



  return newFn;



}



if(buttons.length > 0) {

	myLog("WordPress linker after working on inputs");

    for(var count = 0; count < buttons.length; count ++) {
      addListener(buttons[count], "click", doLinkAdd);
    }



} else {



	myLog("WordPress linker couldn't find the button");



}