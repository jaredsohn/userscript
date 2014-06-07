// ==UserScript==
// @name          IDWS Cleaner
// @namespace     http://userstyles.org
// @description	  Cleans Indowebster download page into cleaner and tidier look
// @author        s4nji
// @homepage      http://userstyles.org/styles/35753
// @include       http://indowebster.com/*
// @include       https://indowebster.com/*
// @include       http://*.indowebster.com/*
// @include       https://*.indowebster.com/*
// ==/UserScript==
(function() {
var css = "#tr_iklanbaris2, #AdsAtas, #kiri > #embed, #kiri > #iklankiri, #kiri > #comments, #Ads_fileinfo, table[width='600'] > tbody, #embed_code, iframe, #menu_tab, center > div[style='float: left; margin-left: 20px; margin-top: 20px;'], #tagCloud, #tag, a[style*='cursor: pointer; color: rgb(0, 0, 0); text-decoration: none;'], div[style='width: 970px; height: 10px;'], div[style='background-color: rgb(255, 255, 255); width: 970px; height: 30px; float: left;'], #kanan, #adddate, #serverid, div[style*='overflow: hidden; position: absolute; z-index: '], #bawahsekali, #garis_atas, #footer2, #origname, #views, .description, input[value='add srt'], #input_srt, #iklan_atas, #FFN_imBox_Container, #toptabmenu, #tagCloudf, #kolomkiri, #dl_cont, #ban_728:nth-child(4), div#ban_728 > div:nth-child(1), #fixed-top-ads, embed, #isi > table, #AdsSearchAtas, ins{\ndisplay: none !important; }\n\n\n\n\ninput#go, #menu_bottom_isi, #lijit_container {\ndisplay: none !important; }\n\n\n\n\ndiv[style*='display: block'], \nimg[id*='information']\n{ display: none !important; }\n\n\n\n\n\n#test td:first-child, #test td:last-child {\ndisplay: none; }\n\n.niceform {\nmargin-left: auto !important; \nmargin-right: auto !important;\nmargin-top: 5% !important;\nmargin-bottom: 10% !important;\nwidth: 640px !important }\n\ndiv[style='margin-top: 20px; width: 502px; color: rgb(0, 0, 0);'] {\nmargin-top: 0 !important; }\n\na[style='color: rgb(0, 15, 255); text-decoration: underline;'] {\ncolor: #333333 !important;\ntext-decoration: none !important; }\n\n#ban_728 > div {\nmargin-left: 46% !important;\nmargin-right: 0px !important;\nmargin-bottom: 1px !important;\nmargin-top: 5px !important;\nfloat: none;  }\n\n#ban_728 {\nheight: 50px !important; \npadding: 0px !important;\nmargin-bottom: 0px !important; }\n\n#warn > h2 {\nfont-size: 35pt;\nmargin-top: 0.5% !important; }\n\n#fileinfo {\nfloat: none !important;\nleft: 27% !important;\nright: auto !important;\ntop: 0px !important; }\n\n#bingkai_isi {\nwidth: 540px !important; }\n\n#b_garisxatas, #b_garisxbawah {\nwidth: 516px !important; }";
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
