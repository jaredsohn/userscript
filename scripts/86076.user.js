// ==UserScript==
// @name           GLB Forum Add GM Link
// @namespace      GLB
// @description    Add an Add GM Link beneath user name in forum threads
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

window.setTimeout( function() 
{


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var users = getElementsByClassName("user_name",document);

for (var i = 0; i < users.length; i++) {
    	var thisUser = users[i];
	var userIDstart =thisUser.innerHTML.indexOf('user_id=') + 8;
	var userIDend = thisUser.innerHTML.indexOf(' id=') - 1;
	var uid = thisUser.innerHTML.substring(userIDstart ,userIDend);
	thisUser.innerHTML = thisUser.innerHTML + '<br><a href="http://goallineblitz.com/game/team_gm.pl?team_id=5773&add_gm=' + uid + '">Add GM</a>';
}


}, 100);
