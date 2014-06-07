// ==UserScript==
// @name           LM v2.2.3 Images
// @namespace      
// @include       http://www.linkomanija.net/*
// @include       https://www.linkomanija.net/*
// @include       http://linkomanija.net/*
// @include       https://linkomanija.net/*
// @include       www.linkomanija.net/*
// @include       www.linkomanija.net/*
// ==/UserScript==

var imgs = document.getElementsByTagName('img')

for ( var i in imgs )
{

	for ( o = 1; o <5; o++)
	{
		if (imgs[i].src == "http://static.linkomanija.net/pic/bar_left.gif"){
		imgs[i].src = "https://sceneaccess.eu/pic/bar_left.gif"
		}
                if (imgs[i].src == "http://static.linkomanija.net/pic/bar.gif"){
		imgs[i].src = "https://sceneaccess.eu/pic/bar.gif"
		}
                if (imgs[i].src == "http://static.linkomanija.net/pic/bar_right.gif"){
		imgs[i].src = "https://sceneaccess.eu/pic/bar_right.gif"
		}
                if (imgs[i].src == "http://static.linkomanija.net/images/dn.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/down.png"
		}
                if (imgs[i].src == "http://static.linkomanija.net/images/searchbutton.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/search.gif"
		}
                if (imgs[i].src == "http://static.linkomanija.net/images/logout.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/offline_pic.png"
		}
                if (imgs[i].src == "http://static.linkomanija.net/images/ul.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/up.png"
		}
                if (imgs[i].src == "http://static.linkomanija.net/pic/starbig.png"){
		imgs[i].src = "https://sceneaccess.eu/pics/icons/donor_big.png"
		}
                if (imgs[i].src == "http://static.linkomanija.net/images/ul.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/icons/up.png"
		}
                if (imgs[i].src == "http://static.linkomanija.net/images/buddylist.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/addasfriend.png"
		}
                if (imgs[i].src == "http://static.linkomanija.net/pic/download.gif"){
		imgs[i].src = "https://sceneaccess.eu/pic/download.gif"
                }
                if (imgs[i].src == "http://static.linkomanija.net/images/donate.gif"){
		imgs[i].src = "http://img529.imageshack.us/img529/3251/donate.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/images/invite.gif"){
		imgs[i].src = "http://img51.imageshack.us/img51/1196/111nk.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/images/upload.gif"){
		imgs[i].src = "http://img409.imageshack.us/img409/4581/1pix.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/images/sentbox.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/sentbox.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/images/mytorrents.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/up.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/pic/online.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/online_pic.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/pic/offline.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/offline_pic.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/pic/button_pm.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/inbox.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/pic/buttons/button_pm.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/inbox.png"
                }
                if (imgs[i].src == "http://static.linkomanija.net/pic/star.gif"){
		imgs[i].src = "https://sceneaccess.eu/pics/icons/donor_big.png"
                }
	}
	
}