// ==UserScript==
// @name           activity bar
// @namespace      http://userscripts.org/users/58056
// @description    custom activity bar [c] flex
// @include        http://www*.cs-manager.com/csm/*
// ==/UserScript==

var allimgs = document.getElementsByTagName("img");
for(i=0; i<=allimgs.length; i++){
		switch(allimgs[i].getAttribute("src")){
			case "/images/activity_5.gif":
				allimgs[i].setAttribute('src','http://i43.tinypic.com/mjwc5d.png');
				break;
			case "/images/activity_4.gif":
				allimgs[i].setAttribute('src','http://i42.tinypic.com/211q5go.png');
				break;
			case "/images/activity_3.gif":
				allimgs[i].setAttribute('src','http://i43.tinypic.com/2ziabeg.png');
				break;
			case "/images/activity_2.gif":
				allimgs[i].setAttribute('src','http://i39.tinypic.com/1hdyer.png');
				break;
			case "/images/activity_1.gif":
				allimgs[i].setAttribute('src','http://i41.tinypic.com/123pmjo.png');
				break;
			case "/images/activity_0.gif":
				allimgs[i].setAttribute('src','http://i41.tinypic.com/jg2qt5.png');
				break;
		}

	}
