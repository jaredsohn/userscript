// ==UserScript==
// @name          -ORKUT- theme NBfun.net
// @namespace     ORkut theme maker - Mr.Nobody
// @description	  Make your own theme for orkut!!!
// @author        OUG( various script writers)
// @homepage      http://Nbfun.net
// @include       http://www.orkut.*/*
// ==/UserScript==

var css = "body{background-image: url(\"http://media1.santabanta.com/full1/indian  celebrities(f)/sameera reddy/sam41a.jpg\") !important;} /* theme: Hinata-chan autor: Brek */ .listfl{color:#FFFFFF!important;} p,h1,h2,h3,h4,table,tr,b,form,ul,li,td,div{color: #BEBEBE !important;} /* ancoras */ a[href] { color: #EEE5DE !important; text-decoration: none !important; } a[href]:hover { color: #FF0000 !important; text-decoration: none !important; } /* cool edit ;] */ div[class=\"newsItem\"] { background: transparent !important; border: 1px transparent !important; } table[id=\"textPanel\"] { background: transparent !important; } textarea[id=\"messageBody\"], textarea, input, option, select { background: transparent repeat-x fixed !important; color: #A4D3EE !important; } /* texto */ li, span, body, table, td[class*=panel], td[id*=tab], td[class*=cat], td[id=\"headerMenu\"], td[class=navInfo], table.karmatable td, table.friendtable td, td[class=\"row0\"], tr[class=\"row0\"], td[class*=\"tab\"], tr[bgcolor=\"#e5ecf4\"], tr[bgcolor=\"#bfd0ea\"], a[class=\"category_link\"], div[class=\"row1\"], td[align=\"right\"], tr[class=\"panelHeader\"], tr[bgcolor=\"#c9d6eb\"], td[class=rowLabel], tr[class=\"row1\"], td[class=\"row1\"], tr[class=\"messageBody\"], tr[bgcolor=\"#d4dded\"] { color: gray !important; } td[bgcolor=\"##4F4F4F\"] { background: transparent url() !important; } div[style=\"background:#4F4F4F\"] { background: transparent !important; padding: 10px 0px 10px 0px; font-size: 110%; color: #ccc !important; } /* bg */ li, table, td[class*=panel], span, td[id*=tab], td[class*=cat], td[id=\"headerMenu\"], td[class=navInfo], table.karmatable td, table.friendtable td, td[class=\"row0\"], tr[class=\"row0\"], td[class*=\"tab\"], tr[bgcolor=\"#e5ecf4\"], tr[bgcolor=\"#bfd0ea\"], a[class=\"category_link\"], tr[class=\"panelHeader\"], tr[bgcolor=\"#c9d6eb\"], td[background*=\"tr8.gif\"][align=\"center\"] { background: transparent !important; } body { background: transparent url(\"http://media1.santabanta.com/full1/indian  celebrities(f)/sameera reddy/sam41a.jpg\") !important; } /* bg 2 */ /* input, option, select, textarea,*/ div[class=\"row1\"], tr[class=\"row1\"], td[class=\"row1\"], tr[bgcolor=\"#68838B\"] { background-color: transparent !important; } /*MENU SUPERIOR*/ #header { background-color: transparent !important; font-size: 12px !important;background-repeat: repeat-x !important;height: 31px !important;} #header a:link { color: silver !important; text-decoration: none;font-weight: bold !important; } #header a:visited { color: silver !important; text-decoration: none;font-weight: bold !important; } #header a:hover { color: silver !important; text-decoration: none; font-weight: bold !important; } #headerMenu{background: transparent !important;background-color: transparent !important;background-repeat: repeat-x !important;font-family: \"Comic Sans MS\" !important;} #header li{color: gray !important;font-size:11px;height:31px;line-height:31px;text-align:center;} /*AVISOS*/ .newsitem, .promobg, .promo, .warning{background: transparent !important; font-style:italic;text-align:left !important; } /*Menu Inferior*/ .footer_l{background-image: url() !important; background-color: transparent !important; margin: 0px !important; color: #FFFFFF !important;background-repeat: repeat-x !important;} .footer_r{Display: none!important;} #footer { background: transparent !important; font-size: 12px !important;height: 31px !important; margin: 0px 0px 0px} #footer a:link { color: #FFFFFF !important; text-decoration: none;font-weight: bold !important; } #footer a:visited { color: #33FF33 !important; text-decoration: none;font-weight: bold !important; } #footer a:hover { color: #E6E6FA !important; text-decoration: none; font-weight: bold !important; } #footer .logogoogle{display: none !important;} /*CLASSES REMOVIDAS PRA FICAR UMA SKIN TRANSPARENTE*/ .botl{Display: none !important;} .botr{Display: none !important;} .lbox{Display: none !important;} .topl{Display: none !important;} .topr{Display: none !important;} .listdivi ln{Display: none !important;} .boxmidr{Display: none !important;} .topr_g{Display: none !important;} .uname{background: transparent !important;} .topr_lrg{Display: none !important;} .rbox{Display: none !important;} boxmidsmlr{Display: none !important;} .thumbbox{background-color: transparent !important;} .divihor{background-color: transparent !important;} .boxgrid{background: transparent !important;} .boxmidlock{background: transparent !important;} .boxmidlrg{background-image:none !important;} .module .topl,.module .topl_lrg,.module .topl_g{background-image:none!important;} .userinfodivi,.ln{background: transparent !important;} .tabdivi{background:transparent !important;} .listlight,.listitemlight,.listitem,.listitemchk{background: transparent !important;} .listdark,.listitemdark,.listitemsel{background: transparent !important;} .thumbbox{background-color: transparent !important;} .divihor{background-color: transparent !important;} .boxgrid{background: transparent !important;} .module .boxmid,.module .boxmidsml,.module .boxmidlrg,.module .boxmidlock{background:none!important;} a.userbutton{background: transparent !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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

	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.htmlorkut.com'>Html Orkut</a>&nbsp;|&nbsp;</li>";



	var td=document.getElementsByTagName("ul")[1];
	td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkutplus.org'><b>Orkut Plus!</b></a>&nbsp;|&nbsp;</li>";

