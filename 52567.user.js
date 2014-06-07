// ==UserScript==
// @name           FireTube
// @namespace      www.anketta.info
// @description    Adds user thumbnails next to comments
// @author		   Julijan Andjelic
// @include        http://www.youtube.com/watch?v=*
// @include	       http://*youtube.com/watch?v=*
// ==/UserScript==

var comments=document.getElementsByClassName('comment');
var oldComments=comments.length;
var i=-1;

function loadAvatar() {
	i++;
		//get the username
		if (comments[i].style.display!='none') {
			var username=comments[i].getElementsByClassName('author');
			username=username[0].innerHTML;
			
			
			GM_xmlhttpRequest({
				method: 'GET',
				url:	'http://gdata.youtube.com/feeds/api/users/'+username,
				onload: function(data) {
					try {
						var userDat=data.responseText;
						
						//if the account is suspended/deleted
						if (userDat=='User not found') {return loadAvatar();}
						
						//username
						userImage=/<media:thumbnail url='(.*?)'\/><yt:username>/.exec(userDat);
						userImage=userImage[1];
						//location
						var userLocation=/<yt:location>(.*?)<\/yt:location>/.exec(userDat);
						userLocation=userLocation[1];
						
						if (userImage!=null) {
							var comment=comments[i].getElementsByClassName('metadata');
							comment[0].innerHTML='<img src="'+userImage+'" width="88" height="88" style="margin-right: 5px; float: left;"><div style="float:left; clear: left;">'+comment[0].innerHTML+'</div>';
							
							var commentAuth=comments[i].getElementsByClassName('time');
							commentAuth[0].innerHTML=commentAuth[0].innerHTML+' ('+userLocation+')';
						}
						if (i<comments.length-1) {loadAvatar();}
					} catch(e) {console.log(e);}
				}
			});
		} else {
			if (i<comments.length-1) {loadAvatar();}
		}
}

loadAvatar();

function moreComments() {
	if (comments.length==oldComments) {
		setTimeout(moreComments,1000);
	} else {
		loadAvatar();
		oldComments=comments.length;
	}
}



//more comments button
document.getElementById('watch-comments-show-more-button').addEventListener('click', moreComments, false);