// ==UserScript==
// @name           GLB Forum Mark as Read
// @namespace      Goal Line Blitz
// @include        http://goallineblitz.com/game/forum_thread_list.pl?*
// ==/UserScript==
// 


//function to allow for searching and retrieving elements by class name; modified to allow searching for 2 classes and returning as one array
function getElementsByClassName(classname, par, additionalclass){
   var a=[];  
   var re = new RegExp('\\b' + classname + '\\b'); 
   var re2 = new RegExp('\\b' + additionalclass + '\\b'); 
   var els = par.getElementsByTagName("*");
   for(var m=0,j=els.length; m<j; m++){      
      if(re.test(els[m].className) || re2.test(els[m].className)){
         a.push(els[m]);
      }
   }
   return a;
};

//function to execute when the Mark All Read button is clicked
function MarkAsRead(){
	//disable button and change display
	var button = document.getElementById('multibutton');
	button.setAttribute("disabled", true);
	button.setAttribute("value", "Working...")

	var gonethrough =0;
	var goalnum =0;
	
	//pull each new post element  : sticky_thread thread thread_new_posts   alternating_color2 thread thread_new_posts
	var stickies = getElementsByClassName('sticky_thread thread thread_new_posts',document, 'alternating_color2 thread thread_new_posts');
	
	var pagelink = '';
	goalnum = stickies.length;
	window.goalnum = goalnum;
	//if no new posts just reload page
	if (goalnum ==0) {
		window.location.reload();
	}

	//loop through links and open last page of new posts
	for (var i = 0;i<stickies.length;i++) {
		pagelink = stickies[i].innerHTML.substring(stickies[i].innerHTML.indexOf('<a href="') + 9,stickies[i].innerHTML.indexOf('>', stickies[i].innerHTML.indexOf('<a href="'))-1);
		//load link in GETHTTP request
		window.setTimeout(function(arg1){return function(){DoPage(arg1);}}(pagelink),window.timeouttime);
		window.timeouttime +=1500;
		
		
	}
};

var threads = document.getElementById('threads');
threads.innerHTML = threads.innerHTML.replace('<tbody>','<tbody><tr><td align="right" id="buttonrow" colspan=4></td></tr>');

//build button
var subpagehidden = document.createElement("input");
subpagehidden.setAttribute("name", "Mark All Read");
subpagehidden.setAttribute("type", "button");
subpagehidden.setAttribute("id", "multibutton")
subpagehidden.setAttribute("value", "Mark All Read");
subpagehidden.addEventListener("click", MarkAsRead,false);
var insertobj = document.getElementById('buttonrow');

insertobj.appendChild(subpagehidden);


//build global variables and functions whereas setTimeout can be utilized.
window.reload = function(){
	window.location.reload();
}
window.DoPage = function(pagepath){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://goallineblitz.com' + pagepath,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function() {
			 window.gonethrough++;
			 window.tiemouttime +=1500;
			 if (window.gonethrough == window.goalnum) {
				 window.location.reload()
			 }
		}
		});

}
window.gonethrough=0;
window.goalnum =0;
window.timeouttime=1500;
