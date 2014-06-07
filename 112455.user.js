// ==UserScript==
// @name           lastfm-new-user-pic
// @namespace      http://userscripts.org/users/398905
// @description    changes the avatar on a lastfm user page to one of your choice
// @include        http://www.last.fm/user/*
// @include        http://www.lastfm.*/user/*
// @include        http://cn.last.fm/user/*
// @exclude        http://www.last.fm/user/*/*
// @exclude        http://www.lastfm.*/user/*/*
// @exclude        http://cn.last.fm/user/*/*
// ==/UserScript==
//
// initial release 2011-09-08
//
//
var userData=[
/*  ###################################################################################
        put your user data here, using the format in the examples:
                ["username","http://picture_URL"],
        
        Remember that the image will be scaled to width=126 pixels.
        Profile images from facebook & vkontakte have worked well.
    ################################################################################### */
    
	["Iskra42463","http://aux.iconpedia.net/uploads/252480643.png"],
	["VlastelinOgnya","http://www.gettyicons.com/free-icons/104/pioneer-camp/png/128/fire_128.png"]

/*  ###################################################################################
        end of user data
    ################################################################################### */
];

var pageUser=location.pathname.replace("\/user\/","");

for(i=0; i<userData.length; i++){
	if( userData[i][0]==pageUser ){
		var user=userData[i];
		workPage();
		break;
	}
}


function workPage(){
	allDivs = document.getElementsByTagName("DIV");
	nDivs = allDivs.length;
	console.log(nDivs);
	for( i=0; i<nDivs; i++){
		if( allDivs[i].className == 'badgeAvatar' ){
			allDivs[i].innerHTML = "<span class=\"userImage\"><img class=\"photo\" alt=\"\" \
				src=\""+user[1]+"\" width=\"126\"></span>";
		    break;
		}
	}
}


