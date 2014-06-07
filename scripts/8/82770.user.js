// ==UserScript==
// @name    		Gaia - Shop Preview Fixes
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description 	Adds hand poses, sit/kneel options, and a "hide background" option to the previews in Gaia's gold shops, cash shop, marketplace, and MC museum. 
// @include 		http://www.gaiaonline.com/*
// @require 		http://code.jquery.com/jquery-1.3.2.min.js
// @require 		http://sizzlemctwizzle.com/updater.php?id=82770
// ==/UserScript==

/* Latest version: added a hide background option, per request. 
Also, some cleanup of the animated preview code. */

/* new CSS for the new buttons */
var newcss = "\n\
#preview_navigation { \n\
	padding-left: 14px; \n\
} \n\
#newbuttons, #bghide { \n\
	clear: both; \n\
	padding-top: 2px; \n\
} \n\
#kneel_toggle { \n\
	background: url(http://i25.tinypic.com/fkd3tk.png) no-repeat scroll 0px 0px; \n\
	display: block; \n\
	height: 23px; \n\
	width: 30px; \n\
	float: left; \n\
	outline: none; \n\
	margin-right: 2px; \n\
} \n\
#kneel_toggle.selected { background-position: 0px -23px; } \n\
#hands_toggle { \n\
	background: url(http://i31.tinypic.com/1hfas1.png) no-repeat scroll 0px 0px; \n\
	display: block; \n\
	height: 23px; \n\
	width: 23px; \n\
	float: left; \n\
	outline: none; \n\
} \n\
#hands_toggle.a1 { background-position: -23px 0px; } \n\
#hands_toggle.a2 { background-position: -46px 0px; } \n\
#hands_toggle.b1 { background-position: -69px 0px; } \n\
#hands_toggle.b2 { background-position: -92px 0px; } \n\
#hands_toggle.c1 { background-position: -115px 0px; } \n\
#hands_toggle.c2 { background-position: -138px 0px; } \n\
#kneel_toggle span, #hands_toggle span { display: none; } \n\
#bghide label { float: left; font-size: 11px; margin-left: 5px !important;} \n\
#bghide input { float: left; margin-left: 3px; } \n\
#anim_avatar_preview { background: none !important; } \n\
";

/* add the new CSS */
function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

/* add the new toggle buttons */
function AddPreviewButtons(where) 
{
	var buttonmargin = "9px";
	var kneel = '<a class="unselected" id="kneel_toggle" href="javascript:{}" title="Sitting/Standing view"><span>Sitting/Standing view</span></a>';
	var hands = '<a class="unselected" id="hands_toggle" href="javascript:{}" title="Click to cycle through hand poses"><span>Cycle through hand poses</span></a>';
	var bghide = '<div id="bghide"><form action="" name="settings"><input id="hide_background" name="hide_background" value="true" type="checkbox" /><label for="hide_background">Hide Background</label></div>';
	if (where == "mcs") // fix the spacing on the MC page a bit
	{
		$(".get_one_cta").css("left","698px");
		$("#items_bg").css("top","-204px");
		$("#anim_avatar_preview").css("border","1px solid #c7c28f");
	}
	else if (where == "mcmuseum") // turn on the preview nav and fix the position of things
	{
		$("#preview_navigation").css({"display":"block", "position":"absolute", "left":"85px", "top":"190px"});
		$("#anim_avatar_preview").css({"position":"absolute", "left":"80px", "top":"37px"});
		bghide = ""; // MC Museum already has no background
	}
	var newbuttons = '<div id="newbuttons" style="margin-left: '+buttonmargin+';">'+kneel+hands+'</div>'+bghide;
	$(newbuttons).appendTo('#preview_navigation');
	$("#facing_toggle").insertAfter("#kneel_toggle");
}

/* preview changes pose when a new toggle button is clicked */
function changepose()
{
	var thebutton = this.id;
	var arrbutton, arrURL, arrnew, arrclass;
	
	if (thebutton == "kneel_toggle")
	{
		arrbutton = ["unselected","selected"];
		arrURL = ["stand","sit"];
		arrnew = ["sit","stand"];
		arrclass = ["selected","unselected"];
	}
	else if (thebutton == "hands_toggle")
	{
		arrbutton = ["unselected","a1","a2","b1","b2","c1","c2"];
		arrURL = ["p=aa","p=a-","p=-a","p=b-","p=-b","p=c-","p=-c"];
		arrnew = ["p=a-","p=-a","p=b-","p=-b","p=c-","p=-c","p=a-"];
		arrclass = ["a1","a2","b1","b2","c1","c2","a1"];
	}
	
	var buttonclass = document.getElementById(thebutton).className;
	var i = arrbutton.indexOf(buttonclass);
	var previewIMG = document.getElementById("img_avatar_preview");
	var previewURL = previewIMG.src;
	
	$(this).removeClass().addClass(arrclass[i]);
	previewURL = previewURL.replace(arrURL[i], arrnew[i]);
	previewIMG.src = previewURL;
	
	if( $("#anim_toggle").hasClass("selected") )
	{
		var previewAnim = $("#anim_avatar_preview").html();
		previewAnim = previewAnim.replace(new RegExp(arrURL[i],"g"), arrnew[i]);
		previewAnim = previewAnim.replace(/[\r\n]+|\t+|\s{2,}/g, ""); //clears out weird whitespace
		$("#anim_avatar_object").replaceWith(previewAnim);
	}
}

/* hides the preview background; has a user setting so that the preference is kept throughout Gaia */
function hidebg()
{
	var previewIMG = document.getElementById("img_avatar_preview");
	var previewURL = previewIMG.src;
	var queryString = {};
	previewURL.replace(
		new RegExp("([^?=/]+)(=([^/]*))?", "g"),
		function($0, $1, $2, $3) { queryString[$1] = $3; }
	);
	var bg = "bg=" + queryString["bg"];
	var oldbg = "bg=" + queryString["oldbg"];
	var bgbutton = document.getElementById("hide_background");
	if ( previewURL.indexOf("/bg=none/") == -1 )
	{
		previewURL = previewURL.replace(bg, "bg=none/old"+bg);
		bgbutton.checked = true;
		GM_setValue("bghide", true);
	}
	else 
	{
		previewURL = previewURL.replace("bg=none/old"+oldbg, oldbg);
		bgbutton.checked = false;
		GM_setValue("bghide", false);
	}
	previewIMG.src = previewURL;
}

/* when one of the original buttons is clicked, checks the new buttons and changes the preview to match */
function checkbuttons()
{
	var previewIMG = document.getElementById("img_avatar_preview");
	var previewURL = previewIMG.src;
	if( $("#kneel_toggle").hasClass("selected") && (previewURL.indexOf("s=sit") == -1) )
	{
		previewURL = previewURL.replace(/s=stand/, "s=sit");
	}
	var handsbutton = document.getElementById("hands_toggle");
	if( handsbutton && !($(handsbutton).hasClass("unselected")) && (previewURL.indexOf("p=aa") != -1) )
	{
		var arrclass = ["a1","a2","b1","b2","c1","c2"];
		var arrURL = ["p=a-","p=-a","p=b-","p=-b","p=c-","p=-c"];
		var handsclass = document.getElementById("hands_toggle").className;
		var i = arrclass.indexOf(handsclass);
		previewURL = previewURL.replace(/p=aa/, arrURL[i]);
	}
	var bgbutton = document.getElementById("hide_background");
	if((previewURL.indexOf("/bg=none/") == -1) && (bgbutton.checked == true))
	{
		var queryString = {};
		previewURL.replace(
			new RegExp("([^?=/]+)(=([^/]*))?", "g"),
			function($0, $1, $2, $3) { queryString[$1] = $3; }
		);
		var bg = "bg=" + queryString["bg"];
		var oldbg = "bg=" + queryString["oldbg"];
		previewURL = previewURL.replace(bg, "bg=none/old"+bg);
	}
	previewIMG.src = previewURL;
	if( $("#anim_toggle").hasClass("selected") )
	{
		window.setTimeout(checkanim, 2000);
	}
}

/* when the animation button is clicked, checks the new buttons and changes the flash to match */
function checkanim()
{
	var previewAnim = $("#anim_avatar_preview").html();
	var x;
	var buttons = ["kneel_toggle","hands_toggle"];
	for (x in buttons)
	{
		var thebutton = buttons[x];
		var arrold, arrnew, arrclass;
		if (thebutton == "kneel_toggle")
		{
			arrclass = ["selected","unselected"];
			arrold = ["stand","sit"];
			arrnew = ["sit","stand"];
		}
		else if (thebutton == "hands_toggle")
		{
			arrclass = ["unselected","a1","a2","b1","b2","c1","c2"];
			arrold = ["\/p\=.{2}\/","\/p\=.{2}\/","\/p\=.{2}\/","\/p\=.{2}\/","\/p\=.{2}\/","\/p\=.{2}\/","\/p\=.{2}\/"];
			arrnew = ["/p=aa/","/p=a-/","/p=-a/","/p=b-/","/p=-b/","/p=c-/","/p=-c/"];
		}
		
		var buttonclass = document.getElementById(thebutton).className;
		var i = arrclass.indexOf(buttonclass);
		previewAnim = previewAnim.replace(new RegExp(arrold[i],"g"), arrnew[i]);
	}
	
	previewAnim = previewAnim.replace(/[\r\n]+|\t+|\s{2,}/g, ""); //clears out weird whitespace
	$("#anim_avatar_object").replaceWith(previewAnim);
	
	// Animated previews don't have a background, so the checkbox does nothing, so hide it.
	if( $("#anim_toggle").hasClass("selected") )
	{
		$("#bghide").css("visibility","hidden");
	}
	else
	{
		$("#bghide").css("visibility","visible");
	}
}

/* makes sure the new toggle buttons match the preview image pose when a shop item is first opened */
function initbuttons()
{
	var previewIMG = document.getElementById("img_avatar_preview");
	var previewURL = previewIMG.src;
	if ( (previewURL.indexOf("s=stand") != -1) && !($("#kneel_toggle").hasClass("unselected")) )
	{
		$("#kneel_toggle").removeClass().addClass("unselected");
	}
	var arrURL = ["p=aa","p=a-","p=-a","p=b-","p=-b","p=c-","p=-c"];
	var arrbutton = ["unselected","a1","a2","b1","b2","c1","c2"];
	var i=0;
	for (i=0;i<7;i++)
	{
		if ( previewURL.indexOf(arrURL[i]) != -1 )
		{
			break;
		}
	}
	$("#hands_toggle").removeClass().addClass(arrbutton[i]);
	var bgbutton = document.getElementById("hide_background");
	if((previewURL.indexOf("/bg=none/") == -1) && (bgbutton.checked == true))
	{
		var queryString = {};
		previewURL.replace(
			new RegExp("([^?=/]+)(=([^/]*))?", "g"),
			function($0, $1, $2, $3) { queryString[$1] = $3; }
		);
		var bg = "bg=" + queryString["bg"];
		var oldbg = "bg=" + queryString["oldbg"];
		previewURL = previewURL.replace(bg, "bg=none/old"+bg);
		previewIMG.src = previewURL;
	}
}

/* activate everything, but not on pages where the CS can't appear */

if (document.getElementById("gaia_menu_bar") != null ) 
{
	addGlobalStyle(newcss);
	
	var loc = document.URL;
	if (loc.indexOf("/gaia/shopping") != -1) 
	{
		AddPreviewButtons("shops");
		$("#buy-items-group a").live("click", initbuttons);
	}
	else if (loc.indexOf("/collectibles") != -1 && loc.indexOf("museum") == -1  && document.getElementById("preview_navigation") ) 
	{
		AddPreviewButtons("mcs");
	}
	else if (loc.indexOf("/collectibles/museum") != -1 ) 
	{
		AddPreviewButtons("mcmuseum");
	}
	else if (loc.indexOf("/marketplace/itemdetail") != -1 )
	{ 
		AddPreviewButtons();
	}
	
	/* the cash shop module may appear anywhere on Gaia, so we 
	only activate its things when the preview button is clicked */
	var cspreview = $("#cash_shop ul.icon_detail a.info_button");
	cspreview.live("click", function() {
		$("#cash_shop div.cashshop-modules-itempreview div.items").css("top","325px");
		AddPreviewButtons("cashshop");
		$("#bghide label").css("color","white");
		cspreview.die("click"); //or else it keeps adding buttons every time you click preview
		});
	
	/* event handlers for the new buttons */
	$("#kneel_toggle, #hands_toggle").live("click", changepose);
	$("#hide_background").live("click", hidebg);
	$("#item_view, #saved_view, #dressup_view, #facing_toggle").live("click", checkbuttons);
	$("#anim_toggle").live("click", function() {
		window.setTimeout(checkanim, 2000);
		});
	
	/* get the hide background user setting, enable it if true */
	var bgbox = document.getElementById("bghide");
	if ( bgbox && (GM_getValue("bghide") == true) )
	{
		hidebg();
	}
}
