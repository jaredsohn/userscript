// ==UserScript==
// @name           User, Topic, and Post Tracker
// @namespace      http://www.courtrivals.com/forums/index.php
// @description    Tracks changes in users, topics, and posts
// @include        http://www.courtrivals.com/forums/index.php
// ==/UserScript==


window.setTimeout( function() 
{
	var document_lines = document.documentElement.innerHTML;			
	var all_lines = document_lines.split("\n");
	
	var posts = 0;
	var posts_difference = 0;
	var users = 0;
	var users_difference = 0;
	var topics = 0;
	var topics_difference = 0;
	
	var old_date = 0;
	
	var users_re = /Total number of registered users: <strong>(\d+)/;
	var topics_re = /Total number of topics: <strong>(\d+)/;
	var posts_re = /Total number of posts: <strong>(\d+)/;
	
	var user_data = users_re.exec(all_lines);
	if(user_data)
	{
		users = user_data[1];
		//alert('For users, found ' + users);		
	}
	
	var topics_data = topics_re.exec(all_lines);
	if(topics_data)
	{
		topics = topics_data[1];
		//alert('For users, found ' + topics);
	}
	
	var posts_data = posts_re.exec(all_lines);
	if(posts_data)
	{
		posts = posts_data[1];
		//alert('For users, found ' + posts);
	}
	
	//   18951     55023    639231
	
	
	// ==============================================================================
	//  Lets grab some old values
	// ==============================================================================
	var returnedString = GM_getValue("cr_forum_data", null);
	if(returnedString)
	{
		var old_data = new Array();
		var old_values = new Array();
		old_data = returnedString.split("\n");
		old_date = old_data[0];
		
		old_values = old_data[1].split(":");
		posts_difference = +posts - old_values[0];
		users_difference = +users - old_values[1];
		topics_difference = +topics - old_values[2];
		
		//alert('Date: ' + old_date + '   Posts: ' + posts_difference + '   Users: ' + users_difference + '   Topics: ' + topics_difference);
	}
	
	
	// ==============================================================================
	//  Now put the stuff back where we can find it
	// ==============================================================================									
		//var re = new RegExp('\\b' + 'conr' + '\\b');		
		var re = /conr/;
	var re_2 = /Total number/i;	
	var els = document.getElementsByTagName("*");
				
	//alert(els[370].className);
	//alert(els[370].innerHTML);
 
	if(returnedString && re.test(els[370].className) && re_2.test(els[370].innerHTML) )
	{	
		//alert('Class = ' + els[370].className + ' gives us -> ' + els[370].innerHTML);

		
		els[370].innerHTML = els[370].innerHTML.replace(posts, posts + '  +' + posts_difference);
		els[370].innerHTML = els[370].innerHTML.replace(topics, topics + '  +' + topics_difference);
		els[370].innerHTML = els[370].innerHTML.replace(users, users + '  +' + users_difference);
		els[370].innerHTML += '<dd>Last forum visit: <strong>' + old_date + '</strong></dd>';
	}
	
		
	
	
	// ==============================================================================
	//  Save off the current values to determine activity.  Also tack on date/time and total points			
	// ==============================================================================	
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var hour = currentTime.getHours();
	var min = currentTime.getMinutes();
	if (min < 10)
	{
		min = "0" + min;
	}

	var formatted_date = hour + ':' + min + ' on ' + month + '/' + day;
	var string = formatted_date + '\n' + posts + ':' + users + ':' + topics;

	GM_setValue("cr_forum_data",string);
	
	
	
	
	
	
	
	
	function getElementsByClassName(classname, par)
	{
		var a=[];   
		var re = new RegExp('\\b' + classname + '\\b');

		var els = par.getElementsByTagName("*");
	 
		for(var i=0,j=els.length; i<j; i++) 
		{       
			if(re.test(els[i].className))
			{	
				//alert('Found an element ' + els[i].innerHTML);
				a.push(els[i].innerHTML);
			}
		}
		return a;
	};
	
	
	
	
	
	
	
	
	
	
}, 100);