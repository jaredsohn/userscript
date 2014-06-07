// ==UserScript==
// @id				IgnoreButtons
// @name			Ignore Users on ATS
// @version			1.0
// @namespace		
// @author			winofiend
// @description		
// @include			http://www.abovetopsecret.com/forum/*
// @require			http://code.jquery.com/jquery-1.9.1.min.js
// @run-at			document-end
// ==/UserScript==

// You need to enter YOUR username in the isme field below or you'll be able to ignore yourself. lol

var isme = 'your_username';
var img_ignore = 'http://files.abovetopsecret.com/files/img/iu513ed049.png';
var img_unignore = 'http://files.abovetopsecret.com/files/img/uh513ed054.png';
var img_posts = 'http://files.abovetopsecret.com/files/img/wp513ed04f.png';
var img_tools = 'http://files.abovetopsecret.com/files/img/mh5141663e.png';

var leftRow = document.querySelectorAll('#posttopL');
var rightRow = document.querySelectorAll('#posttopR');
var posts = document.querySelectorAll('#threadpost');
var postbody = document.querySelectorAll('#postcontainer');
var hidelist = GM_getValue('hidelist'); 
if (!hidelist) { hidelist = '||'; }

for (var i=0; i<posts.length; i++){
	// resize the top of postcontainer to allow room for new buttons.
	$(leftRow[i]).width('410px');
	$(rightRow[i]).width('320px');

	// get the post author name to check.
	if (i < posts.length-1) { 
		var element =  posts[i+1].querySelector('#threadpostavatar b');
		if (typeof(element) != 'undefined' && element != null)
		{
			var user = posts[i+1].querySelector('b').textContent;
			
		}
	}
	else {
		// prevent errors in a slack way. lol
		var user = "dosen't exist";
	}
	
	if (hidelist.indexOf('|'+user+'|') > -1){ 
	// if the user is in the ignore list, draw the Unignore button only.
		var btnUnignore=document.createElement('img');
		btnUnignore.setAttribute('src', img_unignore);
		btnUnignore.setAttribute('id', user);
		btnUnignore.setAttribute('onmouseout', 'this.style.opacity=0.4;this.filters.alpha.opacity=40'); 
		btnUnignore.setAttribute('onmouseover', 'this.style.opacity=1;this.filters.alpha.opacity=100');
		btnUnignore.setAttribute('style', 'opacity: 0.4;');
		btnUnignore.onclick = function(){
			hidelist = hidelist.replace('|'+this.id+'|','');
			GM_setValue('hidelist',hidelist);
			location.reload(); 
		}
		$(postbody[i]).html(btnUnignore);
		$(postbody[i]).append('<br><br><font size = "3" face="verdana" color="green"><center><b>User is Ignored.</b></center></font>');
	}
	else {
	// the user is not in ignore, draw the Posts button.
		var btnPosts=document.createElement('img');
		btnPosts.setAttribute('src', img_posts);
		btnPosts.setAttribute('id', user);
		btnPosts.setAttribute('onmouseout', 'this.style.opacity=0.4;this.filters.alpha.opacity=40'); 
		btnPosts.setAttribute('onmouseover', 'this.style.opacity=1;this.filters.alpha.opacity=100');
		btnPosts.setAttribute('style', 'opacity: 0.4;');
		btnPosts.onclick = function(){
			location.href = location.href.split('/pg')[0]+'/pg1&mem='+this.id; 
		}
		$(rightRow[i]).prepend(btnPosts);
		if (user != isme) {     
		// if the user is not me and is not in Ignore then draw the Tools and Ignore buttons.
			var btnTools=document.createElement('img');
			btnTools.setAttribute('src', img_tools);
			btnTools.setAttribute('id', user);
			btnTools.setAttribute('onmouseout', 'this.style.opacity=0.4;this.filters.alpha.opacity=40'); 
			btnTools.setAttribute('onmouseover', 'this.style.opacity=1;this.filters.alpha.opacity=100');
			btnTools.setAttribute('style', 'opacity: 0.4;');
			btnTools.onclick = function(){
				window.open('http://www.abovetopsecret.com/forum/memcenter.php?display=upload', '_blank');
			}
			$(rightRow[i]).prepend(btnTools);
			
			var btnIgnore=document.createElement('img');
			btnIgnore.setAttribute('src', img_ignore);
			btnIgnore.setAttribute('id', user);
			btnIgnore.setAttribute('onmouseout', 'this.style.opacity=0.4;this.filters.alpha.opacity=40'); 
			btnIgnore.setAttribute('onmouseover', 'this.style.opacity=1;this.filters.alpha.opacity=100');
			btnIgnore.setAttribute('style', 'opacity: 0.4;');
			btnIgnore.onclick = function(){
				hidelist += '|'+this.id+'|';
				GM_setValue('hidelist',hidelist);
				location.reload(); 
			}
			$(rightRow[i]).prepend(btnIgnore);
		}
	
	}
}
// hide the ATS ribbon, if you find it intrusive, uncomment the lines. (remove the //)
// document.getElementById("atsribbon").style.display = "none";
// document.getElementById("atslivebadge").style.display = "none";

