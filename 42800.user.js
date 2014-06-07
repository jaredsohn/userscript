// ==UserScript==

// @name           Ignore in Forums
// @namespace      GLB
// @description    Add users to the file to ignore in the forums
// @include        http://goallineblitz.com/game/forum_thread.pl?thread_id=*
// ==/UserScript==

window.setTimeout( function() 
{

//Add users to ignoreList by placing them in the array separated by commas and with ' ' around them
var ignoreList = new Array('sujung','Example1','Example2');

//Select option: 1 completely deletes post of user, 2 inserts both text and avatar of your choice into the post of that agent,
// option 3 inserts just text of your choice to the posts, an option 4 inserts just avatar of your choice.
var optionSelected = 2; 

//If optionSelected = 2 or 4, you can also select the avatar you want the user to have.....be creative
var avatarLink = 'http://i102.photobucket.com/albums/m82/d8ona/i_suck.jpg'

//If optionSelected 2 or 3, postReplace is the text you want to replace the original post with......again, be creative
var postReplace = 'I like dudes tbh';

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


			
for (var j=0;j<ignoreList.length;j++) {
	var dParent = document.getElementById('content'); 
	var d = getElementsByClassName('post content_container', document);
	for (i=0;i<d.length;i++) {
		var userNameHTML = getElementsByClassName('user_name', d[i]);
		var tempStr1 = userNameHTML[0].getElementsByTagName('a');
		var userName = tempStr1[0].innerHTML;
  		if (ignoreList[j]==userName) {
			if (optionSelected==1) {
				dParent.removeChild(d[i]);
			}
			else if (optionSelected==2) {
				
				var postContents = getElementsByClassName('post_content',d[i]);
				postContents[0].innerHTML=postReplace;
				
				var avatarLoc = getElementsByClassName('user_avatar',d[i]);
				var avatarLoc1 = avatarLoc[0].getElementsByTagName('img')
				avatarLoc1[0].src = avatarLink;
			}
			else if (optionSelected==3) {
				var postContents = getElementsByClassName('post_content',d[i]);
				postContents[0].innerHTML=postReplace;
			}
			else if (optionSelected==4) {
				var avatarLoc = getElementsByClassName('user_avatar',d[i]);
				var avatarLoc1 = avatarLoc[0].getElementsByTagName('img')
				avatarLoc1[0].src = avatarLink;
			}
					
		}
	}
}





}, 100);