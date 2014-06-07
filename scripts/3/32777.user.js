/*
Copyright 2008 @Rasatavohary v2.3
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @author      rasatavohary
// @aemail rasatavohary@yahoo.fr
// @namespace	http://userscripts.org/
// @name	Triball Wars Task Queue
// @description This script let you plan future link clikc on every single link 
// @include     http://s*.tribalwars.*/*
// @version     0.1
// ==/UserScript==

var exportBtn="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK3RFWHRDcmVhdGlvbiBUaW1lAERvIDE0IE5vdiAyMDAyIDIzOjU5OjI0ICswMTAwuV2feAAAAAd0SU1FB9MKBhQKJOpmhKsAAAAJcEhZcwAACvAAAArwAUKsNJgAAAAEZ0FNQQAAsY8L/GEFAAAC+klEQVR42nWTWUhUURjH/2fGGWdz0sYZc0src0lwVEpQ0rLCCI2UUKKgyKKCeuotCKKXknqQNnoJogWCeihoUtvMXqpJrRCpTAfL3NDZnMW529zbueOdiaI++N2Hc+7/f77vO98B/grnJRT2dGhv/OxpdTnO6jrpkoWShP9EYiP0GC1J1oaTan1lzeiohzx33COOd0yUblVS+ikBiqSQCLX8eXYBplVlx7udTm/po3u3iGvkAyGEQ4iFN92McO9Vw+5jjforapF97RyJGQl/ZKASsdcXsljf9l2DLQMwmgBRBE7UpjZlZtqbjIbliER8aN708aVrZuGwox+98YyIbDB4a8Nnn0cscU8NQmcAzGkrUVFWBKPRAo5bBMsGwfNhMIwH7wdcwbbzaKSyj3LlsQy0UffarbuOIDhXh5Gvg5hwDcFg2wb/5EOAaKg4Arf7GzyeAOiJeiqppUzIBirZgI9CRGACJrUH5SVZaGrZj1DQB3PWdszPDWNqagCmvBbojGaoYgqkU5Jj5VOIEJUgCQxYjgfDMvAwPF2ex8+ROwhHwrAWH0SjywFhTRt0KbmyjsRZ8hMFkeOW6oSxAB2f+tE5PgN3ZhNM644ioNYjKPHYN/4AYmGDShH/vgWOF2izQtSAh+j/ggMVDah/2ombnBOE3oYmWY2cnAw011Wh/e59FbESSPOSrCXyHJD2HfpTFssyjSBEwLMBpOnT4Be08NoYVK0vQHnRKlQU5CMrJRWlxXnoFYdteIU+qp2NDVJrDVfr8/rykjREnUxbE/GPoX7NZvSPTePN93FMzrjxfXYO+bk2XLztCDEd7BMsxubgR7yWFbZU7NyzEfV1dk2Ndbl2ZU6ukQiGarilbDhD09yZ2WdSskYX9pz2dUt+6QfV9MizEDfQKleTTSnKt6Fodw0q7atJddeAti/Dfoi5nH19C86hSwpIU/SfF5Qhij/RTaWzslEKJVUxK1SMfXKvKTpFOExZSIzyP0KlDIpZEbHKK1QrbyAcf5W/AKTbLdC5GpsCAAAAAElFTkSuQmCC";


// **************************************************
// Initialize and Setup this script to work with JQuery
// **************************************************
// Add jQuery with plugin
function include(scriptSrc){
	var scriptTag = document.createElement('script');
	scriptTag.src = scriptSrc;
	scriptTag.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(scriptTag);
}
GM_wait();

var allTasks = new Array();
var maximumTimes = 100; // Means that we won't overflow (here) 100 seconds running 

// I use JQuery to ease Grease Monkey Javascript 
include('http://myzo.fr/jquery-1.2.6.js');
include('http://myzo.fr/jquery.dynacloud-3.js');
include('http://myzo.fr/jquery-xpath.js');
include('http://myzo.fr/jquery.timer.js');


// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100);
	}else {
		$ = unsafeWindow.jQuery;
		$().ready(function (){				
				// Creation of the Link to Queue all the task 
				createQueueLinks();
				
				// Process all the link
				process();
				
		});
		// Call to All Function that use JQuery Libraire	
	}
}

function process(){
	//all call to jquery code is here 
	// We've got a timer which run every seconds 
	// Each time we found a link to click on
	// We click on the link 
	// The end is currently 1000000
	$.timer({name:"process", interval: 1, end: maximumTimes}, function() {
		for(var i=0;i<allTasks.length;i++){
			var strTask = allTasks[i];
			var delay = strTask.split('###')[1];
			var href =  strTask.split('###')[0];
			allTasks.splice(i);// We remove it
			delay = delay - 1;
			if(delay==0){
				var str =window.location.href;
			    var newStr= str.substr(0,str.indexOf("/",8))+"/"+href;
			   // $("a[@href='"+newStr+"']").trigger('click');	
				window.location.href=newStr;
			}else{
				allTasks[i] = href + '###'+ delay;
			}
		}
	
		// TODO Read/Store the cookie 
		
		// TODO Stored task like : taskname;taskUrl;taskTime|taskName2;taskUrl2;taskTime2 ....
		
		// TODO Explore the Tasks, check which one is about to be realised 
		
		// TODO Just run the tasks 
		
	
	});

}

// Create the queue Links and the handle function of the Quelinks
// Here it is a simple Example
// So I d'ont care about the delay of execution of the task, it will only be a prompt dialog which will do that 
function createQueueLinks(){
	
	$("a[@href*=action]").each(function(){
		var strHTml = "<img id='delay' href='"+ $(this).attr("href")+ "' src='" + exportBtn + "'/>";
	    $(this).after(strHTml);
	});
	
	$("img[@id='delay']").click(function(){
		// When clicked just put this task into an Array like :
		// url + Time delay in seconds 
		var delay = prompt('Enter the delay in Seconds',10);
		allTasks.push($(this).attr("href") + '###' + delay);
	});
}

