// ==UserScript==
// @name         Blogger keep current date/time on post
// @namespace    http://browservulsel.blogspot.com/
// @description  Blogger keep current date/time on post for Beta
// @include      http://*blogger.com/post-*
// @include      http://*blogger.com/posts.g?blogID=*
// ==/UserScript==

/*

	Author: Aditya Mukherjee
	Website: www.aditya-mukherjee.com
	Licensed under      <http://creativecommons.org/licenses/by-nc-nd/2.5/>
        Based on idea and Old Blogger script by Jasper http://browservulsel.blogspot.com/
        Tweaked by Kirk http://phydeaux3.blogspot.com to fix New Blogger toolbar problem from Greasemonkey v 0.6.8.20070314.0

*/

/*  
    4-03-07
    Wrapped in onload function to keep conflicts with Blogger scripts from happening
    4-15-07
    12pm had a bug, stepped on it
    -p3
*/

window.addEventListener("load", function(e) {

if(location.href.match(/posts.g/)){
	var td = document.getElementsByTagName('td');
	 for(var i=0;i<td.length;i++)
	   if(td[i].className=='link')
	     if(td[i].childNodes[0].className=='editLink')
	       if(td[i+1].childNodes[0].childNodes[0].className!="link")
   		     td[i].childNodes[0].childNodes[0].href += '&draft=1';
}

else {        

	var clearTO;

	function keepCurrentTime() {
		var now = new Date();
		var y = ''+now.getFullYear();
		var select = document.getElementById('date-input');
		select.value = now.getMonth()+1+'/';
		select.value += now.getDate()+'/';
		select.value += y.slice(2,4);

		var time = document.getElementById('time-input');		
		time.value = now.getHours();;
		time.value += ':'+now.getMinutes();

	}

	function keep(){
	if(document.getElementById('datetime').checked) clearTO = window.setInterval(keepCurrentTime, 1000);
	else if(!document.getElementById('datetime').checked)
		clearInterval(clearTO);
	}

	var ch = document.createElement('input');
	ch.setAttribute('id','datetime');
	ch.setAttribute('type','checkbox');
	ch.addEventListener('click', keep, true);

	if(location.href.match(/post-create.g/) || location.href.match(/draft=1/))
		ch.setAttribute('checked','checked');
	
	var ele = document.getElementById('postoptions');
	ele.appendChild(ch);
	ele.appendChild(document.createTextNode('Keep Current Date/Time'));

	keep();
        ele.style.display = 'block';
        document.getElementById('togglePostOptions').className = 'expanded';

}

}, false);