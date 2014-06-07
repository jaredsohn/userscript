// ==UserScript==
// @name          Popmundo V2 Classic Looks V1
// @namespace     http://userstyles.org
// @description	  Popmundo v2'den retro temayÄ± seÃ§melisiniz,tÃ¼m temalarÄ±n devredÄ±ÅŸÄ± olduÄŸundan emin olunuz ve sadece chrome da dÃ¼zgÃ¼n gÃ¶rÃ¼nÃ¼r. Tema kÃ¼Ã§Ã¼k dÃ¼zenlemelerle daha eÄŸlenceli hale geldi :)
// @author        vincefloyd
// @homepage      http://userstyles.org/styles/82930
// @include       http://123.popmundo.com/*
// @include       https://123.popmundo.com/*
// @include       http://*.123.popmundo.com/*
// @include       https://*.123.popmundo.com/*
// @include       http://124.popmundo.com/*
// @include       https://124.popmundo.com/*
// @include       http://*.124.popmundo.com/*
// @include       https://*.124.popmundo.com/*
// @include       http://125.popmundo.com/*
// @include       https://125.popmundo.com/*
// @include       http://*.125.popmundo.com/*
// @include       https://*.125.popmundo.com/*
// @include       http://126.popmundo.com/*
// @include       https://126.popmundo.com/*
// @include       http://*.126.popmundo.com/*
// @include       https://*.126.popmundo.com/*
// @include       http://www.popmundo.com/*
// @include       https://www.popmundo.com/*
// @include       http://*.www.popmundo.com/*
// @include       https://*.www.popmundo.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#ctl00_cphTopColumn_ctl00_btnAddToAddressBook {\n   margin-right: -290px; \n}\n\ndiv#sidemenu p {\nmargin-right: 0px;\n}\n\n#ctl00_cphLeftColumn_ctl00_lnkVIP {\nwidth:34px;\nheight: 36px;\nbackground: url(http://i.imgur.com/GcdC34j.jpg);\nposition:absolute;\ntop:360px;\nfont-size: 0px;\nmargin-left: -41px;\n}\n\n\n#ctl00_cphLeftColumn_ctl01_pgfEditMessage {\nmargin-right: 0px;\n}\n\n\n#ctl00_cphLeftColumn_ctl01_divArtistBuzz > p:last-child {\nmargin-right: 0px;\n}\n\ndiv.box > p:last-child {\nmargin-bottom: 0;\nmargin-right: 240px;\n}\n\n#ctl00_cphRightColumn_ctl01_ddlCities {\n  margin-left:30px;\n  margin-top: -10px;\nposition:relative;\n}\n\ndiv.box.newsList h2 {\n    background-image: url(http://s17.postimage.org/60pkj6ntr/f_J3h_UTm.jpg);  \n  min-height:28px;\n  text-indent:28px;\n  border-top: 5px #fff solid;\n      }\n\n#ctl00_cphLeftColumn_ctl01_divCurrentMembers h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n\n#ctl00_cphLeftColumn_ctl00_divBasicInfo h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n#ctl00_cphLeftColumn_ctl01_divArtistBuzz h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n#ctl00_cphLeftColumn_ctl01_divArtistMessage h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n\n#ctl00_cphLeftColumn_ctl00_hdrSub {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n#ctl00_cphLeftColumn_ctl00_divNoteFromManagement h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n#ctl00_cphTopColumn_ctl00_hdrPeopleInfo {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n}\n\n#ctl00_cphLeftColumn_ctl01_divLatestShows h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n  border-top: 5px #fff solid;\n}\n\n\ndiv.charMainInfo {\nwidth: 170px;\nfloat: left;\nmargin-top: 105px;\nmargin-left: 10px;\n}\n\ndiv.charMainValues {\nfloat: left;\nwidth: 200px;\nmargin-left: -175px;\nmargin-top: 15px;\n}\n\n\n\ndiv.charMainToolbox {\nposition: fixed;\ntop: 180px;\nbackground-color: #fff;\npadding-top: 10px;\npadding-left: 10px;\nwidth: 100px;\nleft: 50%;\n  margin-left: -480px;\n-webkit-border-top-left-radius: 7px;\n-webkit-border-bottom-left-radius: 7px;\n-moz-border-radius-topleft: 7px;\n-moz-border-radius-bottomleft: 7px;\nborder-top-left-radius: 7px;\nborder-bottom-left-radius: 7px;\n}\n\n\ndiv#ctl00_cphLeftColumn_ctl00_divRecentEvents h2 {\nbackground: transparent;\ntext-indent: 0px;\nborder-top: 0px;\n}\n\ndiv#ctl00_cphLeftColumn_ctl00_divRecentEvents h2 {\nbackground: transparent;\ntext-indent: 0px;\nborder-top: 0px;\n}\n\n\ndiv.box h2 { \nbackground: transparent; \n}\n\ndiv#ctl00_cphLeftColumn_ctl00_divFocus {\n    overflow: auto;\n}\n\n\n\ndiv#ctl00_cphLeftColumn_ctl00_divRecentEvents {\n    overflow: auto;\n    float: right;\n    width: 238px;\n  margin-top: -170px;\n}\n\n\n\ndiv#ctl00_cphLeftColumn_ctl00_divBlog {\n    width: 238px;\n    float: right;\n  background: transparent;\n  position: relative;\n  top: -160px;\n}\n\n\n\n\ndiv#sidemenu h2 {\nbackground: url(http://s7.postimage.org/6g29rsagb/Ko_Ql_M48.jpg);\nborder-top:0px;\n  min-height:25px;\n  text-indent:25px;\n  color: #33647D;\n}\n\n\n\n\ndiv.charPresBox {\nbackground: #d1e1e5;\nheight: 212px;\n  margin-bottom: 5px;\n}\n\n\n\ndiv#sidemenu {\nborder: 0;\nwidth: 235px;\nfloat: right;\nmargin: 0; \nbackground: #aec8cf;\ncolor: #33647D;\n}\n\ndiv.localeLogo {\nbackground-size: cover;\n}\n\ndiv.cText_Light {\nbackground: transparent;\n}\n\ndiv.cText_Dark {\nbackground: transparent;\n}\n\ndiv.charPresBox h2 {\npadding-bottom: 9px;\npadding-top: 5px;\nposition: absolute;\ntop: 362px;\nborder: 5px;\nheight: 25px; \nborder-top-color: #fff;\nborder-top-style: solid;\nbackground-image: url(http://s7.postimage.org/fzl8hxa97/La_NVNo_S.png);\nmin-height: 28px;\ntext-indent: 31px;\ncolor: #33647D;\n  width: 350px;\nmargin-bottom:10px;\n}\n\ndiv.characterAchievements {\nfloat: right;\nborder-top: #fff 5px solid;\nposition: absolute;\nmargin-top: 190px;\nleft: 51%;\n  padding-right: 9px;\n  padding-left:16px;\n  margin-left: -16px;\nbackground: url(http://s11.postimage.org/mzr666bjn/gl_Ww_DTM.png);\n}\n\n\n\n\n\ndiv.gameimage {\nmargin-bottom: 15px;\nborder: 5px;\nborder-bottom-color: #fff;\nborder-bottom-style: solid;\n}\n\ndiv.entityLogo {\nheight: 66px;\nborder: 5px;\nborder-bottom-color: #fff;\nborder-bottom-style: solid;\n}\n\ndiv.localebox {\nbackground: #d1e1e5;\ncolor: #222;\nborder: 5px;\nborder-bottom-color: #fff;\nborder-bottom-style: solid;\n}\n\ntable.data th {\nbackground: #d1e1e5;\ncolor: #33647D;\nfont-size: 11px;\nborder: 5px;\nborder-top-color: #fff;\nborder-top-style: solid;\n}\n\ntable.sortable th.header {\nbackground-color: #d1e1e5;\nbackground-image: none;\nborder: 5px;\nborder-bottom-color: #fff;\nborder-bottom-style: solid;\n}\n\ndiv.chartsMain {\npadding: 15px 15px 15px 10px;\ncolor: #fff;\nmargin-bottom: 15px;\nheight: 358px;\nborder: 5px;\nborder-bottom-color: #fff;\nborder-bottom-style: solid;\n}\n\ntable.sortable th.header {\ncursor: pointer;\nborder: 5px;\nborder-top-color: #fff;\nborder-top-style: solid;\n}\n\na {\ntext-decoration: none;\ncolor: #33647D;\n}\n\ndiv#headermenu ul li a {\nbackground-position: left top;\npadding-left: 15px;\ncolor: #33647D;\nmargin-right: 2px;\n}\n\na:hover {\ntext-decoration: none;\n}\n\n\ndiv.entityLogoNoImg {\nbackground-repeat: repeat-x;\nbackground-color: #d1e1e5;\ncolor: #15609D;\ntext-align: center;\npadding: 20px 0;\n}\n\ndiv.avatar {\nfloat: left;\nmargin-right: 10px;\nborder: 5px solid #fff;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();