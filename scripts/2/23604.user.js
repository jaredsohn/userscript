// ==UserScript==
// @name          Orkut champ Orkut Black
// @namespace     Orkut Champ
// @description	  Make your orkut black looking, not the author of the script, just fixed it to work better.
// @author        Mister ABC
// @homepage      http://userstyles.org/styles/3539
// @include http://www.orkut.com/*

// ==/UserScript==
var css = "*{ color:#999 !important; border:#333 !important; } table{ border: 1px #333 solid !important; } .thumbbox,.divihor,.listdivi,a.userbutton,.floatdiv .floatcontent,.floatanchorselected,.percentbar,.percentbarinner,.modal-dialog-bg,body,.userinfodivi,.ln,.tabdivi,a.userbutton:hover,.listdark,.listitemdark,.listitemsel,.listlight,.listitemlight,.listitem,.listitemchk,.listimg,.photothumb,.newsitem,.promobg,.module .boxmid,.module .boxmidsml,.module .boxmidlrg,.module .boxmidlock,#header,#header li.logobg,#header li.logobg .logo,ul.intabs li.sel{ background-color:#000 !important; } #header,#header li.logobg,#header li.logobg .logo,ul.intabs li.sel{background-image:url(http://img3.orkut.com/img/castro/orkut_logo.png) !important;} #header{background-image:url(http://img2.orkut.com/img/castro/header_bg.png) !important;} a:hover,.parabtns a.btn:hover,.inlinebtns a.btn:hover{color:#333 !important;} a.userbutton:hover{background-color:#111 !important;text-decoration:underline !important;} .topr,.topl,.topr_lrg,.topl_lrg,.topr_g,.topl_g,.boxgrid,ul.intabs li,ul.intabs li.sel,.footer_l,.footer_r,.module .botl,.module .botr,.btnboxr,.module .boxmidr,.module .boxmidsmlr,.grabtn,.grabtnnf,.module .topl,.module .topl_lrg,.module .topl_g,ul.intabs li .ltab,ul.intabs li.sel .ltab{ background-image:url() !important; } .mainsearch{background-image:url(http://img1.orkut.com/img/castro/search_bg.png) !important;} #footer .logosml{background-image:url(http://img4.orkut.com/img/castro/orkut_logo_sml.png) !important;} #footer .logogoogle{background-image:url(http://img2.orkut.com/img/castro/google_logo_sml.png) !important;} a.arrexpanded{background-image:url(http://img1.orkut.com/img/castro/arr_expanded.gif) !important;} a.arrcollapsed{background-image:url(http://img2.orkut.com/img/castro/arr_collapsed.gif) !important;} .boxmidlock .boxgrid{background-image:none !important;} textarea,input:focus{border:1px #333 solid !important;background:#000 !important} .listdark,div[class=’listdark darkblueborder’],div[class=’para’],textarea:focus,input{background:#111 !important} ";
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
