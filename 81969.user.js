// ==UserScript==
// @name           change SIS link to hostname
// @include        *
// @author         congxz6688
// ==/UserScript==

var titless=document.getElementsByTagName("title")[0].innerHTML;

if(titless.indexOf("SexInSex")!=-1){
    var yesorno=false;
    var allareas=["文学作者区","评论推荐区","文学交流区","长篇连载区","生活情感区","武侠玄幻区","都市校园区","名家经典作品集","另类酷文区"];

    for (s=0; s<allareas.length; s++){
	if(titless.indexOf(allareas[s])!=-1){
		yesorno=true;
		break;
	}
    }

    if(yesorno){
	myhost=window.location.href.match(/http:\/\/.*\//);
	var allanch=document.getElementsByTagName("a")

	for (i=0;i<allanch.length;i++){
		allanch[i].href=allanch[i].href.replace(/http:\/\/.*\//,myhost)
	}
    }
}