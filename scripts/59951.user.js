// ==UserScript==
// @name           TH high-priority info location - nav pane fix
// @namespace      http://userscripts.org/users/110369
// @include       https://www.twilightheroes.com/*
// @include       http://www.twilightheroes.com/*
// @include       https://twilightheroes.com/*
// @include       http://twilightheroes.com/*
// ==/UserScript==
(function() {

var css = "";
document.body.id='nodefaultstyle';
if (false || (document.domain == "twilightheroes.com" || document.domain== "www.twilightheroes.com"))
	css += "body {\n	color: #069!important;\n	background-color: #057!important;\n}\n\n#wrapheader {\n	background-image: none!important;}\n#wrapnav {\n	background-color: #00ECEC!important;\n	border-color: #00B8C2!important;\n}\n\n#logodesc {\n	background: #00DFE4!important;\n	border-bottom: 1px solid #0087A7!important;\n}\n.forumrules {\n	background-color: #00CC79!important;\n	border-color: #009860!important;\n}\nh1 {\n	color: #0ff!important;\n}\n\n.postapprove, .postapprove a:visited, .postapprove a:hover, .postapprove a:link, .postapprove a:active {\n	color: #084!important;\n}\n.posthilit {\n	background-color: #0f9!important;\n}\n\n.gen {\n        color: #0ff!important;\n}\n\n.copyright {\n	color: #044!important;\n}\n\nth {\n	color: #00A34F!important;\n	background-color: #006699!important;\n	background-image: none!important;\n}\n\n.tablebg {\n	background-color: #00B8C2!important;\n}\n\n.catdiv,.rtl .catdiv {\n	background: #069!important;\n}\n\n.cat {\n	background-color: #00D0D7!important;\n	background-image: none!important;\n}\n\n.row1 {\n	background-color: #00ECEC!important;\n}\n\n.row2 {\n	background-color: #00E1E5!important;\n}\n\n.row3 {\n	background-color: #00C8D0!important;\n}\n\n.spacer {\n	background-color: #D1D7DC!important;\n}\n\nhr {\n	background-color: #00D7DC!important;\n	color: #00D7DC!important;\n}\n\n\na:link {\n	color: #000!important;\n}\n\na:active,\na:visited {\n	color: #086!important;\n}\n\na:hover {\n	color: #069!important;\n}\n\na.forumlink {\n	color: #069!important;\n}\n\na.topictitle:visited {\n	color: #0B2!important;\n}\n\nth a,\nth a:visited {\n	color: #002985 !important;\n}\ninput {\n	color: #003333!important;\n	border: 1px solid #00B8C2!important;\n	background-color: #00FAFA!important;\n}\n\ntextarea {\n	background-color: #00FAFA!important;\n	color: #003333!important;\n	border: 1px solid #00B8C2!important;\n}\n\nselect {\n	color: #003333!important;\n	background-color: #00FAFA!important;\n	border: 1px solid #00B8C2!important;\n}\n.post {\n	background-color: #069!important;\n}\n\n.btnbbcode {\n	background-color: #00EFEF!important;\n	border: 1px solid #006666!important;\n}\n\n.btnmain {\n	background-color: #00ECEC!important;\n	border: 1px solid #00B8C2!important;\n}\n\n.btnlite {\n	background-color: #ECECEC!important;\n	border: 1px solid #A9B8C2!important;\n}\n\n.btnfile {\n	background-color: #00ECEC!important;\n	border: 1px solid #00B8C2!important;\n}\n\n.helpline {\n	background-color: #00E3E7!important;}\n.quotetitle, .attachtitle {\n	border-color: #00B8C2!important;\n	color: #003333!important;\n	background-color: #00B8C2!important;\n}\n\n.quotecontent, .attachcontent {\n	border-color: #00B8C2!important;\n	background-color: #00FAFA!important;\n	color: #005C77!important;\n}\n.codetitle {\n	border-color: #00B8C2!important;\n	color: #003333!important;\n	background-color: #00B8C2!important;\n}\n\n.codecontent {\n	border-color: #00B8C2!important;\n	background-color: #00FAFA!important;\n}\n\n.syntaxbg {\n	color: #00FFFF!important;\n}\n\n.syntaxcomment {\n	color: #00FF80!important;\n}\n.syntaxstring {\n	color: #000DD0!important;\n}\n\n\n\n.pm_marked_colour {\n	background-color: #000000!important;\n}\n\n.pm_replied_colour {\n	background-color: #00B8C2!important;\n}\n\n.pm_friend_colour {\n	background-color: #007700!important;\n}\n\n.pm_foe_colour {\n	background-color: #00DD00!important;\n}\n.sep {\n	background-color: #00A34F!important;\n}\n\nh1 {\ncolor:#050!important;\n}\nh2 {\ncolor:#001337!important;\n}tr,td, td#bgcolor{background-color:#057!important}\n*{color:#000!important};a:active, a:visited{color:#000!important};";
;
if (false || (location.href.replace(location.hash,'') == "http://www.twilightheroes.com/nav.php"))
	css += "body{color:#069!important;background-color:#00abcb};a:active, a:visited{color:#000!important};";
else if (false || (location.href.replace(location.hash,'') == "http://www.twilightheroes.com/header.php"))
	css += "a{color:#069!important};tr,td,td#bgcolor{background-color:#057!important}";
GM_addStyle(css);})();
if (false || (location.href.replace(location.hash,'') == "http://www.twilightheroes.com/header.php") || (location.href.replace(location.hash,'') == "http://www.twilightheroes.com/nav.php")){
	var images= document.getElementsByTagName('img');
	while (images[0]) {
	    images[0].parentNode.removeChild(images[0]);}}
if (false || (location.href.replace(location.hash,'') == "http://www.twilightheroes.com/nav.php")){
	var swp=document.firstChild.childNodes[1];
	var tmp=swp.removeChild(swp.childNodes[2]);
	swp.appendChild(tmp);
	tmp=swp.childNodes[2];
	var swp2=tmp.firstChild;
	for(var x=0;x<11;x++){
		tmp=swp2.removeChild(swp2.childNodes[7]);
		swp.appendChild(tmp);}
}
