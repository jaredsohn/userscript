// ==UserScript==
// @name        EH Plus
// @description Gallery index/search: Improves appearance/layout, parses and cleans up titles. Can hide/fade galleries by tag (requires flagging perk). Can resort gallery thumbs which is useful when hiding. Gallery view: Can adjust thumb sizes to make neat rows (requires large thumb perk). General: Option for grey color scheme by rewriting css (might have a few issues). Settings panel pops out on the left on mouseover on pages where it works.
// @version     2014.2.26

// @include     /^http://(g\.e-|e[^-])hentai\.org/.*$/
// @include		http://95.211.199.*/archive/*
// @include		http://95.211.209.*/archive/*
// @include		http://37.48.81.*/archive/*

// @run-at 		document-start

// @require		http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @author      fyxie
// ==/UserScript==

//suspend reflow
$('<style type="text/css">html{background:#34353B;} body{display:none;}</style>').appendTo("head");


function showPage() {
	$('<style type="text/css">body{display:block;}</style>').appendTo("head");
}

   
function ehp() {

//grey css override
function grey_css() {
	if (!document.URL.match(/^http:\/\/g\.e-hentai\.org\/.*$/)) return;

	var ss = document.styleSheets;

	//replace colors in linked css 
	for (var i=0; i<ss.length; i++) {
		var rules = ss[i].cssRules || ss[i].rules;		
		for (var j=0; j<rules.length; j++) {		
			if (rules[j].style.backgroundColor)  {
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(224, 222, 211)','rgb(52, 53, 59)');
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(242, 240, 228)','rgb(52, 53, 59)');
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(227, 224, 209)','rgb(52, 53, 59)');
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(237, 234, 218)','rgb(52, 53, 59)');				
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(237, 235, 223)','rgb(79, 83, 91)');
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(242, 239, 223)','rgb(79, 83, 91)');
				rules[j].style.backgroundColor=rules[j].style.backgroundColor.replace('rgb(255, 255, 204)','rgb(79, 83, 91)');
			}
			
			if (rules[j].style.color)  {			
				rules[j].style.color=rules[j].style.color.replace('rgb(92, 13, 17)','rgb(221, 221, 221)');
				rules[j].style.color=rules[j].style.color.replace('rgb(155, 78, 3)','rgb(255, 251, 219)');
			}
			
		
			if (rules[j].style.borderColor)  {
				rules[j].style.borderColor=rules[j].style.borderColor.replace('rgb(92, 13, 17)','rgb(0, 0, 0)');
				rules[j].style.borderColor=rules[j].style.borderColor.replace('rgb(92, 13, 18)','rgb(0, 0, 0)');
				rules[j].style.borderColor=rules[j].style.borderColor.replace('rgb(227, 224, 209)','rgb(52, 53, 59)');
			}
			
			if (rules[j].style.borderBottomColor)  {
				rules[j].style.borderBottomColor=rules[j].style.borderBottomColor.replace('rgb(92, 13, 18)','rgb(0, 0, 0)');
			}
			
			if (rules[j].style.borderLeftColor)  {
				rules[j].style.borderLeftColor=rules[j].style.borderLeftColor.replace('rgb(92, 13, 18)','rgb(0, 0, 0)');
			}
			
			if (rules[j].style.borderRightColor)  {
				rules[j].style.borderRightColor=rules[j].style.borderRightColor.replace('rgb(92, 13, 18)','rgb(0, 0, 0)');
				rules[j].style.borderRightColor=rules[j].style.borderRightColor.replace('rgb(217, 215, 204)','rgb(0, 0, 0)');
				  
			}
		}
	}
	
	function replaceColorInline($search,$replace) {
		$('*[style*="'+$search+'"]').each( function() { 
			$tag = $(this);
			$style = $tag.attr('style');
			$style = $style.replace($search,$replace);
			$tag.attr('style',$style);		
		});
	}
	
		
	replaceColorInline('#5C0D12','#000000');
	replaceColorInline('#C2C1C1','#000000');	
	replaceColorInline('#F2EFDF','#4F535B');
	replaceColorInline('#F2F0E4','#34353B');
	
	$('<style type="text/css">'+
	' table.itg tr:nth-child(2n) { background: none repeat scroll 0 0 #4F535B !important; }' +
	' table.itg tr:nth-child(2n+1) {   background: none repeat scroll 0 0 #42464d !important; }' +
	'</style>').appendTo("head");
	
}


function i() {
$('<style type="text/css">'+
'div.fxs {width:195px; height:auto; left:-185px; top:100px; position:fixed; background-color:#4F535B; text-align:left; padding-left:10px; color:#DDDDDD;border: 2px solid #34353B;z-index: 10;}'+
'div.fxs:hover {left:0px;}'+
'input#cust[type=checkbox]:checked ~ div#custdiv { display:block !important;}'+
'#highlight:focus, #highlight:hover { width:400px !important;}'+
'</style>').appendTo("head");

	var $cfg_grey;
	var $cfg_shortentags;
	var $cfg_searchexpunged;
	
	var $cfg_fade;
	var $cfg_hide;	
		
	var $cfg_unchop;
	var $cfg_group;
	var $cfg_group_radius;
	
	var $cfg_columns;
	var $cfg_sortdef;
	var $cfg_sortsize;
	var $cfg_sortzig;
	var $cfg_sorttag;
	var $cfg_minimal;

	
	
	var $cfg_hidelist;
	var $cfg_showlist;
	var $cfg_fadealpha;

function getSettings() {
	
	$cfg_stars = GM_getValue("ehp_stars", false);
	$cfg_torrents = GM_getValue("ehp_torrents", false);
	
	$cfg_cust = GM_getValue("ehp_cust", false);
	$cfg_grey = GM_getValue("ehp_grey", true);
	$cfg_shortentags = GM_getValue("ehp_shortentags", true);
	$cfg_searchexpunged = GM_getValue("ehp_searchexpunged", false);
	
	$cfg_minimal = GM_getValue("ehp_minimal", true);
	$cfg_columns = parseInt(GM_getValue("ehp_columns", "6").replace(/[^0-9-]/,""),10);
	$cfg_columns = $cfg_columns ? $cfg_columns : 6;
	
	$cfg_fade = GM_getValue("ehp_fade", true);
	$cfg_fadealpha = GM_getValue("ehp_fadealpha", 0.2);
	$cfg_hide = GM_getValue("ehp_hide", false);

	$cfg_unchop = true;
	$cfg_group = GM_getValue("ehp_group", true);
	$cfg_group_radius = parseInt(GM_getValue("ehp_group_radius", "30").replace(/[^0-9-]/,""),10);
	
	
	$cfg_sortdef = GM_getValue("ehp_sortdef", false);
	$cfg_sortsize = GM_getValue("ehp_sortsize", true);
	$cfg_sortzig = GM_getValue("ehp_sortzig", false);
	$cfg_sorttag = GM_getValue("ehp_sorttag", false);
	
	$cfg_titleformat = GM_getValue("ehp_titleformat", 'title<br><span style="font-size:10px;color:#dddddd !important;">parody lang</span>');
	
	
	
	$cfg_hidelist = GM_getValue("ehp_hidelist", '');
	$cfg_showlist = GM_getValue("ehp_showlist", '');
	$cfg_highlight = GM_getValue("ehp_highlight", '');
}
getSettings();

$('div.ido').before('<div class="fxs"><br>'+
'<input id="cust"   type="checkbox" '+($cfg_cust?'checked':'')  +'>Custom Title [Advanced]<br>'+
'<div id="custdiv" style="display:none;">Valid Tags: category, con, circle,<br>artist, title, parody, lang, misc</b><br>'+
'<a style="padding-left:140px;" id="customreset" href="#">reset</a>'+
'<textarea class="stdinput" style="width:160px;" id="titleformat" rows="8"></textarea><br><br></div>'+

'<label><input id="shortentags"   type="checkbox" '+($cfg_shortentags?'checked':'')  +'>Shorten Tags</label><br>'+
'<label><input id="searchexpunged"   type="checkbox" '+($cfg_searchexpunged?'checked':'')  +'>Search Expunged</label><br>'+
'<label><input id="minimal"   type="checkbox" '+($cfg_minimal?'checked':'')  +'>Minimal UI</label><br>'+
'<label><input id="grey"   type="checkbox" '+($cfg_grey?'checked':'')  +'>Grey e-hentai</label><br>'+


'<label style="line-height:24px;"><input class="stdinput" id="columns" style="width:15px;margin:0;padding:1px;border:0;text-align:center;" type="textbox" value="'+$cfg_columns+'">  Tiles wide</label><br>'+


'<br><b style="margin-left:6px;font-size:110%;">Gallery sorting</b><br>'+
'<label><input id="sortdef" type="radio" name="order" '+($cfg_sortdef?'checked':'')+'>Default (fast, no grouping)</label><br>'+

'<label><input id="group" type="checkbox" '+($cfg_group?'checked':'')  +'>Group by title - Range</label>'+
'<label><input class="stdinput" id="group_radius" style="width:20px;margin:0;padding:1px;border:0;text-align:center;" type="textbox" value="'+$cfg_group_radius+'"> px</label><br>'+
'<label><input id="sortsize" type="radio" name="order" '+($cfg_sortsize?'checked':'')+'>Compact (tall to short)</label><br>'+
'<label><input id="sortzig" type="radio" name="order" '+($cfg_sortzig?'checked':'')+'>Compact (tall/short zigzag)</label><br>'+
'<label><input id="sorttag" type="radio" name="order" '+($cfg_sorttag?'checked':'')+'>Good tags first</label><br><br>'+

'<label><input id="fade"   type="checkbox" '+($cfg_fade?'checked':'')  +'>Fade all bad tags to </label>'+
'<input class="stdinput" id="fadealpha" style="width:30px;margin:0;padding:1px;border:0;" type="textbox" value="'+$cfg_fadealpha+'"><br>'+
'<label><input id="hide"   type="checkbox" '+($cfg_hide?'checked':'')  +'>Hide all bad tags</label><br>'+

'<br><b>Hide with these tags</b><br>(hidetag1, hidetag2, etc)<br>'+
'<input class="stdinput" style="width:160px;" id="hidelist" type="textbox" value="'+$cfg_hidelist+'"><br>'+

'<br><b>Never hide with these tags</b><br>(* in hide box for show only)<br>'+
'<input class="stdinput" style="width:160px;" id="showlist" type="textbox" value="'+$cfg_showlist+'"><br>'+

'<br><br><b>Highlight</b> (advanced)<a href="javascript:void(0)" style="margin-left:40px;" onclick="(function(){ var e = document.getElementById(\'hihelp\');if(e.style.display == \'block\') e.style.display = \'none\'; else e.style.display = \'block\'; })()">help</a>'+
'<div id="hihelp" style="display:none;">'+
'Highlight gallery frames.<br><br>'+
'<div style="padding-right:22px;">All selectors except tag search text within the title. Specific tags like artist need properly formatted gallery titles to work. When multiple matches, last is used. Tags search highlight is applied after title.</div><br><br>' +
'<div style="font-family:consolas">Usage:<br>selector:search text:color:[mode]<br>selector:#match regexp:color</div><br>Valid Selectors:<br><div style="font-family:consolas">* tag title parody <br>circle artist category</div>(* matches anywhere in the title)<br><br>Valid Modees:<br><div style="font-family:consolas">border top<br>fcolor fgrad (tag selector only)</div>(border is used when omitted)<br><br>'+
'Examples:<br><div style="font-family:consolas">title:pixiv:yellow<br>title:touhou:blue<br>tag:ahegao:#ff0000<br>tag:schoolgirl:red:top<br>circle:archives:pink<br>category:manga:orange:border<br>category:non-h:lightblue:top<br><br>parody:#(k\\-on!|haruhi):green</div></b><br>'+
'</div>'+
'<br>Enter highlights one per line. ' +
'<textarea class="stdinput" style="width:160px;" id="highlight" rows="8"></textarea><br><br>'+
'<br><input id="applybtn" type="button" value="Apply" /><br><div id="cBox" style="display:hidden"></div>&nbsp;');
$('textarea#titleformat').val($cfg_titleformat);
$('textarea#highlight').val($cfg_highlight);


$('div#searchbox > form').append('<div id="fxs2">'+
'<input id="fsrcb" class="starsetenable" type="checkbox" name="f_sr">'+
'<input id="star5" class="starset" type="radio" name="f_srdd" value="5"><label for="star5" class="irx"></label>'+
'<input id="star4" class="starset" type="radio" name="f_srdd" value="4"><label for="star4" class="irx"></label>'+
'<input id="star3" class="starset" type="radio" name="f_srdd" value="3"><label for="star3" class="irx"></label>'+
'<input id="star2" class="starset" type="radio" name="f_srdd" value="2"><label for="star2" class="irx"></label>'+
'<input id="star1" type="radio" name="f_srdd"><label for="star1" class="irx" id="irxn"></label>'+
'<br></div>');

//toggle advancedsearchenable
function xtt() { $("#fsrcb").prop('checked',true); }
function xttn() { $("#fsrcb").prop('checked',false); }

$("label.irx").click(xtt);
$("#irxn").click(xttn);


//submit when double click a star, but not on that star filter view
var curStarView = "";
var lastStarClick = "";
$("label.irx, #irxn").click(function(){
		
	if (lastStarClick == $(this).attr('for') && curStarView != $(this).attr('for')) {
		$('#searchbox > form').trigger('submit');
	}
	else lastStarClick = $(this).attr('for');
});




$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){ return null; }
    else{ return results[1] || 0; }
}
$(function() {
	if ($.urlParam('f_sr')=='on') 
		xtt();
	var i = $.urlParam('f_srdd')
	$('div#fxs2 input[value="'+i+'"]').prop('checked', true);
	
	curStarView='star'+i;
	if (i == '' || i == 'on' || i == null)
		curStarView='star'+1;
});





$('<style type="text/css">'+ 
'div#fxs2 {width:195px; position:absolute; right:-8px; top:-27px; visibility:hidden;}'+
'label.irx{background-image: url("http://st.exhentai.net/img/rt.png"); background-repeat: no-repeat; height: 16px; width:16px; float:right;}'+
'label.irx{background-position:-80px -1px; opacity:0.1; }'+

'input.starset:checked ~ label.irx {background-position:0 -1px; opacity:0.7; }'+
'div#fxs2 label.irx:hover,label.irx:hover ~ label.irx {background-position:0 -1px;  opacity:1; }'+


'#fxs2 input { position: absolute; visibility:hidden;}'+
'</style>').appendTo("head");


$('#customreset').click(function (e) {
	e.preventDefault(); 
	$('#titleformat').val('title<br><span class="subtitle">parody lang</span><div class="category catbox stroke2">category</div>'); 
	GM_setValue("ehp_titleformat", $('#titleformat').val());
});




$('div.fxs input[type="checkbox"]').click(function (e) {
	GM_setValue("ehp_"+$(this).attr("id"), $(this).prop("checked")?true:false);		
});


$('div.fxs input[type="radio"][name="order"]').click(function (e) {
	GM_setValue("ehp_sortdef", false);
	GM_setValue("ehp_sortsize", false);
	GM_setValue("ehp_sortzig", false);
	GM_setValue("ehp_sorttag", false);
	
	GM_setValue("ehp_"+$(this).attr("id"), $(this).prop("checked")?true:false);
});



$('div.fxs input[type="textbox"], div.fxs textarea').keyup(function (e) {
	GM_setValue("ehp_"+$(this).attr("id"), $(this).val());		
});


$('div.fxs input#applybtn').click(function (e) {
	try { $("head").html($head_html); }
	catch(err) { }
	
	try { $('div.ido').html($body_html); }
	catch(err) { }

	getSettings();
	applychanges();
});
//////////////////////////////////////////
//
//



//minimal gallery ui
function minimal_css() {
	//copy paste
	$inner = $cfg_columns * ($gtile_width + $gtile_pad ) + 25;
	$outer = Math.max($inner + 50);

	if (document.URL.match(/(stats.php|home.php|uconfig.php|archiver.php|hentaiathome.php|adoptaserver.php|bitcoin.php|hathperks.php|exchange.php)(\?.*)?$/)) return;
	$('<style type="text/css">'+
	' div#toppane { position:relative; } ' +
	' h1.ih { position:absolute; top:-74px; right:-6px; } ' +
	' table.itc { display:none; } ' +
	' div.idi { border: medium none; } ' +
	' p.nopm { position:absolute; top: -20px; right:0; } ' +
	' div#iw { padding-top: 23px; } ' +
	' p.nopm > input + input { display:none; } ' +
	' p.nopm input.stdinput {  background: none repeat scroll 0 0 #34353B; border: 1px dashed #616161; }' +
	' p.nopm input.stdinput:focus { background: none repeat scroll 0 0 #4F535B; border: 1px dashed #B1B1B1; }' +
	' p#nb a { text-decoration: none; padding: 0 5px; color:#B1B1B1; }' + 
	' p#nb a:hover { text-decoration: underline; }' + 
	' p#nb img + a + img + a { visibility:hidden; }' + 
	' p#nb:hover img + a + img + a { visibility:visible; }' + 

	' p#nb img { display:none; }' +
	' div.ido { margin-top:45px; margin-bottom:68px; } ' +	
	' table.ptt { position:relative; top:-62px } ' + 
	' div#toppane + div { margin-bottom:-28px; }' +
	' table.ptb { position:relative; bottom:-8px; } ' +
	' table.ptb { position:relative; bottom:-8px; } ' +
	' div#searchbox a { text-decoration: none; }' +
	' div.ido div p.ip { position:relative; top: -66px; width:400px;} ' +
	' div#dmo { display:none } ' + 
	' p.nopm + p.nopm { display: none } ' +
	' div#searchbox p.nopm { position:absolute; right:-10px; top:-55px; } ' +
	' p#nb { position:relative; left:'+(-468 - ($outer / 2 - 688))+'px; top:44px;} ' +
	' div.itg { margin-top:-50px; } ' +	
	' div.ido p.ip { position:absolute; bottom:-45px; width: 100%; } ' +	
	' div#fxs2 { visibility:visible;}'+
	'</style>').appendTo("head");

	//for real low res		
	if ($cfg_columns < 4) 
	$('<style type="text/css">'+
	' p.nopm input.stdinput { position:relative; top:-18px; } ' +
	' h1.ih { visibility: hidden; } ' +
	' p#nb { top: 3px;} ' +
	'</style>').appendTo("head");

}


$(
'<style type="text/css">'+
'div.fxs:not(:hover) div#hihelp { visibility: collapse; } '+
'div#hihelp {background: #4F535B; display: block; padding: 4px; position: absolute; right: -214px; top: 211px; width: 206px;} ' +
'div.itd4 {margin: 2px auto !important;}'+
'img.n { padding-top:1px; padding-left: 1px; padding-right: 1px; }'+
'img.rt { padding-right: 5px; width:56px;} '+
'.Non-H {color:lightblue;} '+
'.Image.Sets {color:#9966FF;} '+
'.Cosplay {color:#FF99FF;} '+
'.Asian.Porn {color:pink;} '+
'.Misc {color:white;} '+
'.Western {color:lightgreen;} '+
'.Game.CG {color:#99FFCC; } '+
'.Artist.CG {color:yellow; } '+
'.Manga {color:orange; } '+
'.Doujinshi{ color:salmon; } '+
'</style>').appendTo("head");


function zeroPad(n) {
  return (n < 10)? '00' + n : (n < 100)? '0' + n : '' + n;
}

//GM_setValue("eh_tagdb", uneval({})); //reset tagdb
$tagdb = eval(GM_getValue("eh_tagdb", {}));

$gtile_width = 214; 
$gtile_pad = 4;


$baseColors = new Object();
$baseColors['fr1'] = "#f93c3c"
$baseColors['fr2'] = "#d9a834"
$baseColors['fr3'] = "#d7d934"
$baseColors['fb1'] = "#34d934"
$baseColors['fb2'] = "#34cbd9"
$baseColors['fb3'] = "#c434d9"
$baseColors['fbx'] = "#bdbdbd"


$(
'<style type="text/css">'+

'.fr1 {color:#f93c3c;}'+  //red d93434
'.fr2 {color:#d9a834;}'+  //orange
'.fr3 {color:#d7d934;}'+  //yellow
'.fb1 {color:#34d934;}'+  //green
'.fb2 {color:#34cbd9;}'+  //blue
'.fb3 {color:#c434d9;}'+  //purple
'.fbx {color:#bdbdbd;}'+  //grey
'.itd1 ~ .c {display:none;}'+
'.itd1, .ido > h1.ih ~ div {'+
'    display: inline-block;'+
'    float: none !important;'+
'    margin: 0 !important;'+
'    vertical-align: top;}'+


'div.itg img, div.id3 { border-radius: 4px 4px 4px 4px; }'+
'div.id3 {position:relative;}'+
'div.id1 {position:relative; padding: 57px 0 7px; margin:0 '+ $gtile_pad +'px 13px 0; width:'+$gtile_width+'px}'+
'div.id2 {position:absolute; top:0; z-index:5; background-image: -moz-linear-gradient( rgba(52,53,59, 0.5) 5%, rgba(52,53,59, 0) 100%); width:'+$gtile_width+'px;'+
'border-radius: 9px 9px 0px 0px;'+
'} '+

'div.id2 a, .stroke { text-shadow: -1px -1px 0 rgba(0,0,0, 0.35), 1px -1px 0 rgba(0,0,0, 0.35), -1px 1px 0 rgba(0,0,0, 0.35), 1px 1px 0 rgba(0,0,0, 0.35),  0 -1px 0 rgba(0,0,0, 0.5), 0 1px 0 rgba(0,0,0, 0.5), -1px 0 0 rgba(0,0,0, 0.5), 1px 0 0 rgba(0,0,0, 0.5); }'+
'.stroke2 { text-shadow: -1px -1px 0 rgba(0,0,0, 0.46), 1px -1px 0 rgba(0,0,0, 0.46), -1px 1px 0 rgba(0,0,0, 0.46), 1px 1px 0 rgba(0,0,0, 0.46),  0 -1px 0 rgba(0,0,0, 0.65), 0 1px 0 rgba(0,0,0, 0.65), -1px 0 0 rgba(0,0,0, 0.65), 1px 0 0 rgba(0,0,0, 0.65); } '+
'.floatflag, .id2 { font-family: \'メイリオ\',Meiryo,Arial,\'DejaVu Sans\',sans-serif; font-size:11.4px; line-height:12.5px; }'+
'.floatflag, .catbox {font-family: \'メイリオ\',Meiryo,Arial,\'DejaVu Sans\',sans-serif; font-size:11.4px; line-height:12.5px;font-weight:bold;} ' +


'div.id2 {display: table; height:80px; text-align:left;}'+
'div.id2 a {font-weight:bold; color:skyblue; font-size:11.4px; line-height:12.5px;}'+
'span.subtitle {font-weight:normal; color:#d5d5d5; font-size:10.1px;}'+ 
'div.id2 a:visited, div.id2 a:visited span {font-weight:normal; color:#a9a9a9 !important; }'+
'div.id4 { position:absolute; bottom:2px; right:1px; text-align:right;}'+

'div.id2 a div.unseen   { color:#FFFFFF !important; float:left; width:0; text-shadow:none !important; } ' +
'div.id2 a:visited div.unseen { color:#41444b !important; } ' +
'span.expunged { color: #eba286; } '+

//along right stacked
'div.tagbox { position:absolute; line-height:1px; top:0; right:0; text-align:left; width:auto; max-width:185px; padding: 3px 5px 3px 7px; border-radius: 0 0 0 9px; box-shadow: 1px -1px 3px rgba(52, 53, 59, 0.2) inset; background: linear-gradient(to left bottom, rgba(78, 81, 88, 0.5) 15%, rgba(78, 81, 88, 0.2)); }'+

//top left
'div.catbox { background: linear-gradient(to right bottom, rgba(78, 81, 88, 0.5) 15%, rgba(78, 81, 88, 0.2)) repeat scroll 0 0 transparent; border-radius: 0 0 9px 0; box-shadow: 1px -1px 3px rgba(52, 53, 59, 0.2) inset; display: block; left: 4px; padding: 2px 7px; position: absolute; text-align: left; top: 57px; width: auto; } ' +

//bottom right
//' div.tagbox { background: linear-gradient(to left top, rgba(78, 81, 88, 0.5) 15%, rgba(78, 81, 88, 0.2)) repeat scroll 0 0 transparent; border-radius: 9px 0 0 0; bottom: 0; box-shadow: 1px 1px 2px rgba(52, 53, 59, 0.25) inset; max-width: 185px; padding: 2px 0 2px 7px; position: absolute; right: 0; text-align: right; width: auto; } ' +

'div.id2 a {display: table-cell; vertical-align:top;  padding: 5px 7px;}'+
'span.floatflag, div.id4 {pointer-events:none;}'+
'div.itg {padding-top:15px; padding-left:25px; max-width:1150px;}'+
' div#pt { padding-top:40px; } ' +


//list view row colors
' table.itg tr:nth-child(2n) { background: none repeat scroll 0 0 #F2F0E4 !important; }' +
' table.itg tr:nth-child(2n+1) { background: none repeat scroll 0 0 #EDEBDF !important; }' +

' div.id41, div.id42, div.id43, div.id44 { display: none; } ' +
' div.id1 { background: none repeat scroll 0 0 transparent; border: medium none; }' +
' div.itg { border: medium none; } '  +

' div.id2 { background-image: linear-gradient(rgba(52, 53, 59, 0.5) 5%, rgba(52, 53, 59, 0) 19%); border-radius: 9px 9px 9px 9px; box-shadow: 1px 0px 2px rgba(52, 53, 59, 1); height:100%; } '+
'</style>').appendTo("head");

if (!document.URL.match(/^http:\/\/g\.e-hentai\.org\/.*$/)) {	
	$('<style type="text/css">'+
	' table.itg tr:nth-child(2n) { background: none repeat scroll 0 0 #4F535B !important; }' +
	' table.itg tr:nth-child(2n+1) { background: none repeat scroll 0 0 #363940 !important; }' +
	'</style>').appendTo("head");
}



//
//
//
// save page state for soft reload
$head_html = $("head").html();
$body_html = $('div.ido').html();

$cfg_grey = GM_getValue("ehp_grey", true);
if ($cfg_grey) { grey_css(); }


function RegEscape(str) {
    return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}

//
//
//rebuild gallery titles
$list_t = [];
$list_ltm = [];
function fixTitles() {

	//thumbnail view
	$('.id2 a').each( function(i) {
		var $fulltitle = $(this).html();
	
		//(con) [circle (artist)] title (parody) [lang] [trans] [misc]	
		
		var $con = '';
		var $circle = '';
		var $extrahead = '';
		
		var $title = '';
		var $artist = '';
		var $parody = '';
		var $lang = '';
		var $remains = $fulltitle;
		
		var $category = $(this).closest('.id1').find('.id4 .id41').first().attr('title');
		
		//var $isExpunged = $(this).closest('.id1').find(".tn[title='This gallery is expunged']").length > 0;  //expunged		
		
		//con
		var $match = $remains.match(/^(\([^\)]*\))\s*(.*)/); // ()
		if ($match) {
			$remains = $match[2];
			$con = $match[1];
		}
		//circle
		$match = $remains.match(/^(\[[^\]]*\])\s*(.*)/); //[]
		if ($match) {
			$remains = $match[2];
			$circle = $match[1];
		}
		
		//artist (inside circle)
		$match = $circle.match(/^\[[^\(]*(\([^\)]*\)).*\]$/);
		if ($match) {
			$artist = $match[1];
			$circle = $circle.replace($artist,'');
			$circle = $circle.replace(' ]',']');
		}
		
		
		//extra pre title
		$match = $remains.match(/^(\([^\)]*\))\s*(.*)/); // ()
		if ($match) {
			$remains = $match[2];
			$extrahead += $match[1];
		}	
		$match = $remains.match(/^(\[[^\]]*\])\s*(.*)/); // []
		if ($match) {
			$remains = $match[2];
			$extrahead += $match[1];
		}
		
		
		//title
		$match = $remains.match(/^([^\[\(（]*)\s*(.*)/); //(con) [circle (artist)] title (parody) [lang] [trans] [misc]	
		if ($match) {
			$remains = $match[2];
			$title = $match[1].trim();
		}	
		
		$list_t[i] = $title;
		$list_ltm[i] = $remains;
		
		//try to detect and balance 2 line titles
		var $len = $title.length;
		if ($len > 25 && $len < 50) {	 //26 55
			$newt = '';
			$issplit = 0;
			$words = $title.split(" ");
			
			if ($words.length > 1) {
				$.each($words, function(i, v) {					
				
					if (!$issplit && ($newt.length + v.length) > ($len - $newt.length)) {
						$newt = $newt.trim()+'<br>';
						$issplit = 1;
					}				
					$newt += v + ' ';										
				});		
				$newt = $newt.trim();
				$title = $newt;
			}
		}
		

		//parody
		$match = $remains.match(/(\([^\)]*\))\s*(.*)/); // ()
		//$match = $remains.match(/\(([^\)]*)\)\s*(.*)/); // () --now excludes parens in capture
		if ($match) {
			$remains = $match[2];
			$parody = $match[1].trim();
		}
		
		//lang
		$match = $remains.match(/^(\[[^\]]*\])\s*(.*)/); //[]
		if ($match) {
			$remains = $match[2];
			$lang = $match[1].trim();
		}	
			

		//
		//highlight by title contents
		$div = $(this).closest('.id1');		
		$.each($hi_sets, function(i,v) {
			$hi_tags = v.split(/:/);
			
			if ($hi_tags.length == 3 || $hi_tags.length == 4) {
				$selector = $hi_tags[0];				
				$term = $hi_tags[1];
				$color = $hi_tags[2];
				
				$mode = "border";
				if ($hi_tags.length == 4) {
					if ($hi_tags[3] == "top") $mode = "top";
				}
					
								
				if ($term.charAt(0) != '#')
					$term = RegEscape($term);
				else 
					$term = $term.substring(1);
							

				$match = false;
				switch($selector) {
					case "*" :
					$match = $fulltitle.match(new RegExp($term, "i")); break;
				
					case "title" :
					if (!$title) break;
					$match = $title.match(new RegExp($term, "i")); break;
						
					case "parody" :
					if (!$parody) break;
					$match = $parody.match(new RegExp($term, "i")); break;
						
					case "circle" :
					if (!$circle) break;
					$match = $circle.match(new RegExp($term, "i")); break;
						
					case "artist" :
					if (!$artist) break;
					$match = $artist.match(new RegExp($term, "i")); break;
					
					case "category" :
					if (!$category) break;
					$match = $category.match(new RegExp($term, "i")); break;
					
					default : 						
				}			
				if ($match) {
					//highlight top
					if ($mode == "top") {
						$imgdiv = $div.find(".id3").first(); 
						$imgdiv.css('border-top', '7px solid ' + $color);
						$imgdiv.css('background-color', $color);
						$imgdiv.css('border-radius', '7px');
					}
					//highlight border
					else {
						$div.css('background', $color);
					}
						
				}				
			}	

		});		
		//$tags = $gettags.split(/,[ ]*/);
		
		//if ($isExpunged) $title = '<span class="expunged">' + $title + '</span>';
		
		var $newt = '';		
				
		if (!$cfg_cust) //default fixed title
		{
			$newt += $title;		
			$newt +=($title?'<br>':'')+'<span class="subtitle">'+ $parody + ($lang?' '+$lang:'') + '</span>';
			$len += $parody.length + $lang.length;
		}
		else
		{
			//custom style
			$customt = $cfg_titleformat;
			$customt = $customt.replace("con"   ,$con);
			$customt = $customt.replace("artist",$artist);
			$customt = $customt.replace("misc"  ,$remains);
			$customt = $customt.replace("circle",$circle);
			$customt = $customt.replace("lang"  ,$lang);			
			$customt = $customt.replace("parody",$parody);			
			$customt = $customt.replace("title" ,$title);
			$customt = $customt.replace(/category/gi ,$category);
			
			$newt = $customt;
		}

		
		//shrink font for long titles
		if ($len > 140) { //5 line tiny
			$(this).css('font-size','8.4px');
			$(this).css('line-height','9.3px');
		}
		else if ($len > 115) { //5 line small
			$(this).css('font-size','10.3px');
			$(this).css('line-height','10.1px');
		}

		
		//todo fix with custom
		//rescue malformed title (such as circle [ not closed)
		if (!$title && !$remains) 
			$newt = '<span style="font-size:10px;">'+($circle ? $circle : $con)+'</span>';

		$(this).html($newt);
		
	});
}

function injectTag($tag,$class,$text,$count) {	

	
	$stext = $text.replace(/.*:/,"");
	if ($cfg_shortentags) $stext = $stext.substring(0,4); //tag first4 chars without namespace
	$stext = $stext [0].toUpperCase() + $stext.slice(1); //upper first char
	
	$top = $count * 17;
	
	if ($count == 0) $tag.closest('.id1').children('.id3').append('<div class="tagbox"></div>');	
	
	//override color when grad style set 
	if ($flagLookupC[$text]) {
		$tag.closest('.id1').children('.id3').children('.tagbox').append('<div class="floatflag stroke2" style="color:'+$flagLookupC[$text]+'">'+$stext+'</div>&nbsp;');
	}
	else $tag.closest('.id1').children('.id3').children('.tagbox').append('<div class="floatflag stroke2 '+$class+'">'+$stext+'</div>&nbsp;');
	
	$type = $class.charAt(1);
	if ($type == 'r' && $cfg_fade)  {
		alphaThumb ($tag);		
	}
	
}

function alphaThumb($tag) { 
	$p = $tag.closest('.id1'); //also fade title in gallery
	
	var $alpha = parseFloat($cfg_fadealpha);
	if (isNaN($alpha))
		$alpha = '0.2';
	
	//$p.fadeTo(0, 0.15);
	$p.css('opacity', $alpha);
	//$p.animate({width: '114'}, 'slow'); //could do accordion with this
	
	$p.hover(
		function() { $(this).stop().fadeTo('fast', 1); }, 
		function() { $(this).stop().fadeTo('fast', $alpha); }		
	);
}

function killThumb($tag)  { 
	$listnode = $tag.closest('.id1');
	$listnode.detach();
}

function cleanTag($tag)   { $tag.detach(); }


//for hue sorting
function rgbToHue(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return h;
}


//
//foreach tag
function fixuptags() {
	$list_rating = [];
	$list_rating_faded = [];
	$g_hidden = [];
	$j=0;
	$rx=0;
	
	$('.itg > div.id1').each( function(ix) {
	$(this).find(".id44").each(function(index) {	
		$rating = 500; //center on 500
				
		//alert(uneval($tagdb));
		
		$posmap = [];
		$posmap["0px -1px"] = "fr1";
		$posmap["0px -18px"] = "fr2";
		$posmap["0px -35px"] = "fr3";
		$posmap["0px -52px"] = "fb1";
		$posmap["0px -69px"] = "fb2";
		$posmap["0px -86px"] = "fb3";
		
		$tagContainer = $(this);
		$div = $(this).closest('.id1');		
		
		$flagColors = [];
		$flagHues = [];
		$flagLookupC = new Object();
		$flagLookupH = new Object();
		$alltags = "";
		$tagHues = [];
		
		
		
		$tags = $(this).find(".tft");  //children
		$tags.each(function(jx) {			
			$gettags = $(this).prop("title");
			$position = $(this).css("background-position");
			$class = $posmap[$position] ? $posmap[$position] : "fbx" ;
			
			$tags = $gettags.split(/,[ ]*/);
			
			//for each tag
			$.each($tags,function(i,v) {
				
				//highlight by tag
				$.each($hi_sets, function(i,w) {
					$hi_tags = w.split(/:/);
					
					if ($hi_tags.length == 3 || $hi_tags.length == 4) {
						$selector = $hi_tags[0];
						$term = $hi_tags[1];
						$color = $hi_tags[2];
						
						$mode = "border";						
						if ($hi_tags.length == 4) {
							if ($hi_tags[3] == "top") $mode = "top";
							if ($hi_tags[3] == "fgrad") $mode = "fgrad";
							if ($hi_tags[3] == "fcolor") $mode = "fcolor";
						}
						
						if ($term.charAt(0) != '#') $term = RegEscape($term);
						else $term = $term.substring(1);

						$match = false;
						if ($selector == "tag")
							$match = v.match(new RegExp($term, "i"));

						if ($match) {
							//highlight top
							if ($mode == "top") {
								$imgdiv = $div.find(".id3").first(); 
								$imgdiv.css('border-top', '7px solid ' + $color);
								$imgdiv.css('background-color', $color);
								$imgdiv.css('border-radius', '7px');
							}
							//background gradient
							else if ($mode == "fgrad") {
								//decode to rgb, calculate hue for sorting
								$("#cBox").css('color',$color);
								$rgb = $("#cBox").css('color');
								$rgbx = $rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
								$hue = rgbToHue($rgbx[1],$rgbx[2],$rgbx[3]);
								
								$flagLookupC[v] = $color;
								$flagLookupH[v] = $hue;
								
								$flagHues.push(zeroPad(Math.floor($hue * 256)) + zeroPad($flagColors.length));								
								$flagColors.push($color);
							}
							//set flag color only
							else if ($mode == "fcolor") {
								//decode to rgb, calculate hue for sorting
								$("#cBox").css('color',$color);
								$rgb = $("#cBox").css('color');
								$rgbx = $rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
								$hue = rgbToHue($rgbx[1],$rgbx[2],$rgbx[3]);
								
								$flagLookupC[v] = $color;
								$flagLookupH[v] = $hue;
							}
							//highlight border
							else {
								$div.css('background', $color);
							}						
						}		
					}			
				});
			
				$tagdb[v] = $class;
				GM_setValue("eh_tagdb", uneval($tagdb));
			});
			
			$alltags = $alltags + (jx?",":"") + $tags
		});
		
		//virtual tag for expunged		
		/*
		$tagdb["expunged"] = "fr1";
		var $isExpunged = $(this).closest('.id1').find(".tn[title='This gallery is expunged']").length > 0;  //expunged		
		if ($isExpunged) {
			$alltags = $alltags + ($alltags.length>0?",":"") + "expunged";
		}*/
					
			
		//do hue sort
		$flagHues.sort().reverse();
		$flagColorsX = $flagColors;
		$flagColors = [];
		$.each($flagHues, function(i, v) {
			$ixx = parseInt(v.slice(-3),10);
			
			//more push = harder, fewer = softer
			$flagColors.push($flagColorsX[$ixx]);
			$flagColors.push($flagColorsX[$ixx]);
			$flagColors.push($flagColorsX[$ixx]);
			$flagColors.push($flagColorsX[$ixx]);
			$flagColors.push($flagColorsX[$ixx]);
			$flagColors.push($flagColorsX[$ixx]);			
		});
		
		//rainbow gradient for each set flag
		if ($flagColors.length > 0) {
			//if ($flagColors.length == 1) $flagColors.push($flagColors[0]);
			$div.css('background', "linear-gradient(to right, "+ $flagColors.join(", ") +")");
			//$div.css('background', "linear-gradient(to right, red, orange, yellow, green, blue)");				
		}
				
		if ($alltags) { //if it has tags
			$tags = $alltags.split(/,[ ]*/);
			
			//add base class hues to table
			//quick and dirty
			$.each($tags, function(i, v) {
			
				if ($flagLookupH.hasOwnProperty(v)) return true; //skip overridden tag colors
			
				$class = $tagdb[v];
				if (!$class) $class = "fbx";
				$col = $baseColors[$class];
				$("#cBox").css('color',$col);
				$rgb = $("#cBox").css('color');
				$rgbx = $rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
				$hue = rgbToHue($rgbx[1],$rgbx[2],$rgbx[3]);
				
				$flagLookupH[v] = $hue;
			});
			
			
			
			//sort tags by hue
			$tags.sort(function(a,b) {
				if (!$flagLookupH.hasOwnProperty(a) && !$flagLookupH.hasOwnProperty(b)) return 0;
				if (!$flagLookupH.hasOwnProperty(a) && $flagLookupH.hasOwnProperty(b)) return 1;
				if ($flagLookupH.hasOwnProperty(a) && !$flagLookupH.hasOwnProperty(b)) return -1;
				
				return $flagLookupH[a] < $flagLookupH[b] ? 1 : $flagLookupH[a] > $flagLookupH[b] ? -1 : 0;
			});
			
			
		
			$forceshow=0;
			if ($cfg_showlist) {
				$stags=$cfg_showlist.split(',');
				$.each($stags, function(i, v) {
					$stag = $.trim(v);					
					
					$tags.forEach( function($fulltag, $i) {
						$plaintag = $fulltag.replace(/.*:/,"");						
						if ($fulltag == $stag || $plaintag == $stag)
						$forceshow=1;
					});

				});
			}

			$faded = false;
			$hidden = false;
			$tags.forEach( function($fulltag, $i) {					
				//hide specific tags if set and matched unless in show list
				if ($cfg_hidelist && !$forceshow) {						
					$htags=$cfg_hidelist.split(',');
							
					$.each($htags, function(i, v) {
						$htag = $.trim(v);
						
						$plaintag = $fulltag.replace(/.*:/,""); //strip namespace						
						if ($fulltag == $htag || $plaintag == $htag || $htag == '*') {
							$hidden = true;
							killThumb ($tagContainer);							
							return false;//break;
						}										
					});					
				}
				
				
				if ($tagdb[$fulltag]) { //known tag
					$class = $tagdb[$fulltag];				
					
					$type = $class.charAt(1);
					if ($type == 'r' && $cfg_hide && !$forceshow)  {
						$hidden = true;
						killThumb ($tagContainer);	
						return false;//break;
					}
					
					if ($type == 'r')      $rating-=2;
					else if ($type == 'b') $rating++;
						
					
					injectTag($tagContainer,$class,$fulltag,$i);
				}
				else { //unknown tag
					$class = 'fbx';						
					injectTag($tagContainer,$class,$fulltag,$i);
				}
				
				
				if ($type == 'r' && $cfg_fade) $faded = true;
				
			});	
			cleanTag($tagContainer);
			
			if (!$hidden) {
				$list_rating_faded[$j]=$rating - ($faded?100:0); // -100 if faded
				$list_rating[$j++]=$rating; 
			}
			
			
		}
		else {
			
			
			//hide untagged if hidetag *
			$tag = $(this);
			$hidden = false;
			$faded = false;
			$htags=$cfg_hidelist.split(',');					
			$.each($htags, function(i, v) {
				$htag = $.trim(v);
				if ($htag == '*') {
					$hidden = true;
					killThumb($tagContainer);
					return false;//break;
				}										
			});
					
			
			if (!$hidden) {
				$list_rating_faded[$j]=500 - ($faded?100:0); // -100 if faded
				$list_rating[$j++]=500; 
			}
		}
		if ($hidden) {
			$list_ltm.splice(ix-($rx),1); //del from lang trans misc
			$list_t.splice(ix-($rx++),1); //del from title
		}
		
	});
	});
	
	//			
	$("div.id4").remove(); //nuke no longer needed id4 stuff
	$("div.id3 img").attr("title","");
	//nuke img title (mouseover)
}

function fixthumbheights() {
	$list_h = [];
	$list_hg = [];
	$list_e = [];
	//
	//
	//fixup thumb heights
	$('.itg > div.id1').each( function(i) { 	
		$img = $(this).children('.id3'); //				
		$thumb = $(this).children('.id3').find('img')
		$thumb.attr('alt','');
		$src = $thumb.attr("src");
		
		$thumb_res = $src.match( /^[^-]*-[^-]*-(\d+)-(\d+)-.{3}_l\.jpg$/);
		
		if (!$thumb_res) {
			//return true; //continue
			$hx = parseInt($img.css('height').replace(/[^0-9-]/,""),10) -3;
			$h = $hx;
			$w = 200;
		}
		else {
			$w = $thumb_res[1];
			$h = $thumb_res[2];
			
			$h = $h * 200 / $w;
			$w = 200;
			if ($h > 300) {
				$w = $w * 300 / $h;
				$h = 300;		
			}
			$w = Math.round($w *1);
			$h = Math.round($h *1);

			$hx = parseInt($img.css('height').replace(/[^0-9-]/,""),10) -3;
			if (!$cfg_unchop && !$cfg_group) {
				$h = Math.min($hx,$h);
			}
		}
		
		//now set after sort
		if ($cfg_sortdef) {
			$(this).css('height', ($h)+'px'); //main h
			$img.css('height', $h+'px'); //container h	
		}
		
		if ($w < 100) $w = 100; //for thin images so stars/tag visible
		$img.css('width', $w+'px'); //container w
		
		var $title = $list_t[i];
		var $misc = $list_ltm[i];
		
		$list_e[i] = $(this);
		$rating = $list_rating_faded[i];
		
		$list_h[i] = zeroPad($h) + $title + zeroPad($h) +  zeroPad(i); //HHH TITLE HHH III
		//sort rating first
		//$list_hg[i] = $title + "_" + zeroPad($rating) + $misc + zeroPad($h) + zeroPad(i); //TITLE _ [MISC] RRR HHH III
		//sort title first (fixes order on mismatched tags in set)
		$list_hg[i] = $title + "_" + $misc + zeroPad($rating) + zeroPad($h) + zeroPad(i); //TITLE _ [MISC] RRR HHH III
	});
	

	
}

function fuzzy_compare(a,b){
	var ah = parseInt(a.substring(a.length-6,a.length-3), 10);
	var bh = parseInt(b.substring(b.length-6,b.length-3), 10);
	
	if (ah + $cfg_group_radius < bh) return 1;
	if (bh + $cfg_group_radius < ah) return -1;
	
	var at = a.substring(0,a.length-6);
	var bt = b.substring(0,b.length-6);
	
	if (at < bt) return  1;
	if (at > bt) return -1;
	return 0;			
}


function sort_default() {
	$.each ($list_e, function(i,v) { v.detach(); });
	$('.itg').children('.c').each( function() { $(this).remove(); }); //strip clears
	$div = $('.itg');
	
	$.each($list_e, function(i,v) {
		v.appendTo($div);
		
		if (((i+1) % $cfg_columns) == 0)  { 
			$div.append('<div class="c"></div>');
		}
		
	});
	return;	
}

//
// sort by height etc
function sort_compact() {
	
	//fuzzy sort
	if ($cfg_group)  { 	
		
		//strip chars
		for(var $i=0; $i<$list_hg.length; $i++) {
			$list_hg[$i] = $list_hg[$i].replace(/[\s\.!,~～?:+”'="|/()[\]-]/g,"").toLowerCase();
		}
		
		//0 prefix single digit numbers
		for(var $i=0; $i<$list_hg.length; $i++) {
			$list_hg[$i] = $list_hg[$i].replace(/([^\d])(\d)([^\d])/g,"$10$2$3")
		}
		
		//01 suffix non numbered files
		for(var $i=0; $i<$list_hg.length; $i++) {
			$list_hg[$i] = $list_hg[$i].replace(/([^\d])(_[\d]{3})/g,"$101$2")
		}
		
		
	
		//fuzzy sort	
		for(var $i=0; $i<$list_hg.length; $i++) {
			for(var $j=$i; $j<$list_hg.length; $j++) {
				
				$cmp = fuzzy_compare($list_hg[$i], $list_hg[$j]);
				if ($cmp == 1) {
					$t = $list_hg[$i]
					$list_hg[$i] = $list_hg[$j];
					$list_hg[$j] = $t;
				}
				
			}
		}

		$list_h = $list_hg;
	
	}
	else {
		$list_h.sort();
		$list_h.reverse();
	}
	
	$.each ($list_e, function(i,v) { v.detach(); });
	$('.itg').children('.c').each( function() { $(this).remove(); }); //strip clears
	$('#pp').children('.c').each( function() { $(this).remove(); }); //strip clears
	$div = $('.itg');
		
	//big to small
	if ($cfg_sortsize) {
		$.each($list_h, function(i,v) {
			//alert(v);
			$j = parseInt(v.substring(v.length-3), 10);
			$list_e[$j].appendTo($div);
			
			if (((i+1) % $cfg_columns) == 0)  {
				$div.append('<div class="c"></div>');
			}
			
		});
	}
	
	//debug sorting
	/*
	for(var $i=0; $i<$list_h.length; $i++) {
		console.log($list_h[$i]);
	}
	*/
	
	try {
	$list_ht = $list_h.slice();
	if ($cfg_sortzig) {
		//zig zag tall and short rows
		$k=$list_ht.length; $j=0;
		for ($i=0; $i<$k; $i++) {
			
			if ($j) $x = $list_ht.pop();		
			else	$x = $list_ht.shift();
			
			$l = parseInt($x.substring($x.length-3), 10);
			$ele = $list_e[$l];
			
			$ele.appendTo($div);
			if ((($i+1) % $cfg_columns) == 0) { 
				$j = !$j;
				$div.append('<div class="c"></div>');
			}
		}	
	}
	} catch(e) { alert (e); }
	
}


function crop_tiles_fuzzy_sweep() {
	//fixup heights rowsweep fuzzy		
	$mindif = 0.1; //crop no more than this % round up (can be more in sweep case)
	for(var $i=0;$i<$list_h.length;$i+=$cfg_columns) {
					
		$min=999;
		//scan row
		$newh = [];
		for ($j=$i; $j<Math.min($list_h.length, $i+ $cfg_columns); $j++) {
			$v = $list_h[$j];
			$h = parseInt($v.substring($v.length-6,$v.length-3), 10);
							
			$min = Math.min($h,$min);			
		}
		

		for ($j=Math.min($list_h.length, $i+ $cfg_columns)-1; $j>=$i; $j--) {			
			
			//if all to left are > mindif taller then bump up size
			$minleft = 999;
			for ($k=$j; $k>=$i; $k--) {
				$v = $list_h[$k];
				$h = parseInt($v.substring($v.length-6,$v.length-3), 10);
				
				$minleft = Math.min($h,$minleft);
			}
			if ($minleft > ($mindif + 1) * $min) $min = $minleft;
			
			$v = $list_h[$j];
			$k = parseInt($v.substring($v.length-3), 10);
			$e = $list_e[$k];
			$e.css('height', ($min)+'px'); //main h
			$e.children('.id3').css('height', $min+'px'); //container h
			
		}
	}
}

function crop_tiles_fuzzy() {
	//fixup heights fuzzy
	$mindif = 0.1; //crop no more than this % round up
	for(var $i=0;$i<$list_h.length;$i+=$cfg_columns) {
					
		
		$rowmax = Math.min($list_h.length, $i+ $cfg_columns);
		$rowcount = $rowmax - $i;
		
		$doneCount = 0;				
		$done = [];				
		while ($doneCount < $rowcount) {
			//find min from undone
			$min=999;
			for ($j=$i; $j<$rowmax; $j++) {
				if ($done[$j] !== undefined) continue;
				
				$v = $list_h[$j];
				$h = parseInt($v.substring($v.length-6,$v.length-3), 10);
								
				$min = Math.min($h,$min);			
			}
							
			//crop all undone within radius, mark done
			for ($j=$i; $j<$rowmax; $j++) {
				if ($done[$j] !== undefined) continue;
				
				$v = $list_h[$j];
				$h = parseInt($v.substring($v.length-6,$v.length-3), 10);
				
				if ($h <= $min * (1 + $mindif)) {
					$k = parseInt($v.substring($v.length-3), 10);
					$e = $list_e[$k];
					$e.css('height', ($min)+'px'); //main h
					$e.children('.id3').css('height', $min+'px'); //container h
					$doneCount++;
					$done[$j] = true;
				}
			}
		}
	}
}


function crop_tiles() {
	if (!$cfg_group || $cfg_group_radius < 30) {
		crop_tiles_fuzzy_sweep();
	}
	else {		
		crop_tiles_fuzzy();
	}

}	
	
function sort_tag() {
	//
	// sort by rating each good tag +1 bad -2
	
	// RRR Title HHH III R=rating H=height I=index
	//$.each ($list_rating, function(i,v) { $list_h[i] = zeroPad(v) + $list_hg[i]; });
	
	// RRR HHH III R=rating H=height I=index
	$.each ($list_rating, function(i,v) { $list_h[i] = zeroPad(v) + $list_h[i].substring($list_h[i].length-6,$list_h[i].length); });
	
	
	$list_h.sort();
	$list_h.reverse();
	

	$.each ($list_e, function(i,v) { v.detach(); });
	$('.itg').children('.c').each( function() { $(this).remove(); });

	$div = $('.itg');
	
	
	//big to small	
	$.each($list_h, function(i,v) {
		$j = parseInt(v.substring(v.length-3,v.length), 10);
		if ((i % $cfg_columns) == 0) { $div.append('<div class="c"></div>'); }
		$list_e[$j].appendTo($div);				
	});
	
}

function fixColumns() {
	$inner = $cfg_columns * ($gtile_width + $gtile_pad ) + 25;
	$outer = Math.max($inner + 50);
	
	$(
	'<style type="text/css">'+
	'div.itg { width: ' + $inner + 'px; max-width: ' + $inner + 'px; min-width: ' + $inner + 'px;  }'+
	'div.ido { width: ' + $outer + 'px; max-width: ' + $outer + 'px; min-width: ' + $outer + 'px; }'+
	'div#pp { width: ' + $outer + 'px; max-width: ' + $outer + 'px; }'+
	'</style>').appendTo("head");
}

function applychanges() {
	if ($cfg_grey) { grey_css(); }	
	if ($cfg_minimal) { minimal_css(); }

	$hi_sets = $cfg_highlight.split(/[ ]*[,\n][ ]*/); //for highlighting

	fixColumns();
	fixTitles();
	fixuptags();
	
	fixthumbheights();
	
	
	if ($cfg_sortsize || $cfg_sortzig) {
		sort_compact();
		crop_tiles();
	}
	else if ($cfg_sorttag) {
		sort_tag();
		crop_tiles_fuzzy();
	}
	else sort_default();
		
	//fix links only when not already searching
	if ($cfg_searchexpunged) {
		
		//fix home link
		var $front_link = $("p#nb a").first();
		if ($front_link) {
			var $new_href = $front_link.attr('href').replace(/(.*)\/$/, '$1/?page=0&f_sh=on');
			$front_link.attr('href',$new_href);
		}
		
		//add expunge search to form
		$("form").append('<input type="hidden" name="f_sh" value="on">');
		
		if (!/Filter(&f_sh=on)?$/.test(document.location)) {
			$('<script type="text/javascript">'+
			'getrowurl = "http://exhentai.org/?page={?page?}&f_sh=on";'+
			'function sp(a){document.location=getrowurl.replace("{?page?}",a);}'+
			'</script>').appendTo("div#toppane");	

			$page_links = $("table.ptt td, table.ptb td");
			$page_links.each(function (i,v) {
				if (v.onclick) {
					var page =v.onclick.toString().replace(/[\s\S]*sp\((\d*)[\s\S]*/,"$1");
					if (!isNaN(page)) {
						v.onclick = function(){sp(page);};
					}
				}

			});

		}
		
		
	}

		
	showPage();
}

try { applychanges(); }
catch (err) { 
	showPage();
	alert(err);
}

} // i()


// *************************************************
// *************************************************
// *************************************************
	
function g() {

$(
'<style type="text/css">'+
'div.fxs {width:195px; height:auto; left:-185px; top:100px; position:fixed; background-color:#4F535B; text-align:left; padding-left:10px; color:#DDDDDD;border: 2px solid #34353B;z-index: 10;}'+
'div.fxs:hover {left:0px;}'+
'</style>').appendTo("head");

function mini_css() {


var $basex = $cfg_gal_width;
if ($cfg_thumbd) $basex = $cfg_thumbr_un * 228 + 25;
var $linkx = Math.floor($basex/2)-134;

$(  '<style type="text/css">'+
	' body { font-family: \'メイリオ\',Meiryo,Arial,\'DejaVu Sans\',sans-serif; }'+
	' h1#gj {border:none;} '+
	' div.gm:not(#cdiv) { margin-top: -4px; width: 229px; min-width:0; float:right; height:0px; background:none; border:none; height:40px; } '+
	' div#gd1 { padding-left: 13px; background: none repeat scroll 0 0 #4F535B; border: 1px black; padding: 15px; line-height:0; height:auto; } ' +
	' div#gd2 { overflow:visible; white-space:nowrap; right:281px; width: auto; text-align:right; position:absolute; top:5px; background:none; } '+
	' div#gd3 { right:0; top:0; z-index:4; position:absolute; } '+
	' div#gd4 { position:relative; width:235px; border:none; padding-top: 33px; padding-bottom:20px;} ' +
	' div#gd5 { width:220px;  }' +
	' div#gdn { text-align:left; position:absolute; right:16px; text-align:right; top:5px; margin:0; } ' +
	' div#gdn a { text-decoration:none; z-index:11;} ' +
	' div#gdd, div#gdd table { width:auto; } ' +
	' div#gdd { margin:0; position:absolute; left:-51px; top:-28px;} ' +
	' div#gdd td.gdt1 { display:none; } ' +
	' div#gdd td.gdt2 { padding-top:0; padding-bottom:0; } ' +
	' div#taglist div { clear: left; float: left; text-align:left; white-space:normal; color:#b1b1b1;}' +
	' div#taglist div a { color: #E6A82D; font-family:consolas; font-size:12px; font-weight:700;}' +
	' div#taglist div a[id^="ta_group:"], div#taglist div a[id^="ta_artist:"]  { color: #FF7E59; }' +
	' div#taglist div a[id^="ta_character:"] { color: #43CD34; }' +
	' div#taglist div a[id^="ta_parody:"] { color: #FF82FF; }' +
	' div#taglist tr td { float:left;clear:left; }' +
	' div#taglist tr td:first-child { padding:4px 0px 0px 4px !important;}' +
	' div#taglist { height:auto !important; width:auto;}' +
	' div#taglist a:hover { text-decoration: underline; } ' +
	' div#gdc, div#gd7 { display:none; } ' +
	' div#gleft { position:relative; height:0 !important; } ' +
	' div#gright { height:auto; width:auto; position:relative; z-index:3; background:none;} ' +
	' div#gmid { width:235px; height:auto; position:relative; right:-6px; top:-29px; bottom:-611px; padding-bottom:5px;} ' +
	' div#gd6, div#gd5 p.nopm, div#gd5 p.g1, div#gd5 p.g3, div#gdr { display:none; } '+
	' img.mr { float:left; clear:left; margin-top:6px; margin-right:2px; } ' + 
	' div#taglist { width:220px; padding: 2px 0 2px 12px; } ' +
	' div#tagmenu_act a { float: left; line-height:20px;} ' +
	' div#tagmenu_act { position:absolute; right:0; width:231px; height:69px; background:#4F535B;} ' +
	
	' div#tagmenu_act img + a + img + a + img + a + img { display:none; } ' +
	' div#tagmenu_act img + a + img + a + img + a + img + a { display:none; } ' +
	
	' div#tagmenu_new { position:absolute; bottom:10px; left:47px; width:auto;} ' +
	' input#newtagfield { width:100px !important; } ' +
	' td.gdt2 { text-align:left; } ' +
	' p.g2 + p.g2 { display:none; } ' + 
	' p.g2 img { display:none; } ' + 
	' p.g2 a { padding: 278px 6px 1px 93px; color:rgba(241,241,241, 0);  } ' + 
	' p.g2 a:hover { background:rgba(0,0,0, 0.35); color:rgba(255,251,219, 1); } ' + 
	' p.g2 { width: auto; } ' + 
	' div#gdd table tr + tr + tr { display:none; } '  +
	' p#nb a + img + a { display:none; } '  +
	' p#nb a + img { display:none; } '  +
	' p#nb { position:relative; height:0; top: 78px; right:'+ $linkx +'px; display:inline; color:#b1b1b1 !important; } ' + 
	' p#nb a { color:#b1b1b1; } ' + 	
	' p#nb img { display:none; } ' + 
	' img.ygm { display:none; } ' + 
	' p#nb a { text-decoration:none; } ' + 
	' p#nb a:hover { text-decoration:underline; } ' + 		
	' div#taglist {height:auto;} ' +
	' p.g2 { float:left; padding-top:0 !important; }' +
	' div#gright { top:-36px; right:-9px;  }' +
	' div#tagmenu_new .stdinput { border: 1px dashed #000000; background: none repeat scroll 0 0 #4F535B; } ' +
	' body { overflow-x:hidden; }'+
	'</style>').appendTo("head");

}


var $cfg_fixt;

function getSettings() {
	$cfg_fixt = GM_getValue("ehp_thumb", true);
	$cfg_grey = GM_getValue("ehp_grey", true);
	$cfg_mini = GM_getValue("ehp_mini", true);
	$cfg_linktags = GM_getValue("ehp_linktags", true);
	$cfg_autodl = GM_getValue("ehp_autodl", false);
	
	$cfg_thumbd = GM_getValue("ehp_thumbd", false);
	$cfg_thumbh = GM_getValue("ehp_thumbh", true);
	$cfg_thumbr = GM_getValue("ehp_thumbr", false);
	$cfg_thumbv = GM_getValue("ehp_thumbv", false);
	
		
	$cfg_thumbh_px = parseInt(GM_getValue("ehp_thumbh_px", "280").replace(/[^0-9-]/,""),10);
	$cfg_thumbr_un = parseInt(GM_getValue("ehp_thumbr_un", "5").replace(/[^0-9-]/,""),10);
	$cfg_thumbr_n = parseInt(GM_getValue("ehp_thumbr_n", "5").replace(/[^0-9-]/,""),10);
	$cfg_gal_width = parseInt(GM_getValue("ehp_gal_width", "1260").replace(/[^0-9-]/,""),10);
	
	$cfg_grey = GM_getValue("ehp_grey", true);
}
getSettings();


$('div#gdt').before('<div class="fxs"><br>'+

'<b style="margin-left:6px;font-size:110%;">Thumb Scaling</b><br>'+
'<label><input id="thumbd" type="radio" name="order" '+($cfg_thumbd?'checked':'')+'>Unscaled </label>'+
'<input class="stdinput" id="thumbr_un" style="width:15px;margin:0;padding:1px;border:0;" type="textbox" value="'+$cfg_thumbr_un+'">(per row)<hr style="margin-left:4px;width:160px;border:none;border-top:1px dashed grey;">'+
'<label style="padding-left:5px; line-height:18px;"> Scale Gallery Width <input class="stdinput" id="gal_width" style="width:30px;margin:0;padding:1px;border:0;" type="textbox" value="'+$cfg_gal_width+'"></label> (px)<br>'+
'<label><input id="thumbh" type="radio" name="order" '+($cfg_thumbh?'checked':'')+'>Scale to height ~</label>'+
'<input class="stdinput" id="thumbh_px" style="width:30px;margin:0;padding:1px;border:0;" type="textbox" value="'+$cfg_thumbh_px+'">(px)<br>'+
'<label><input id="thumbr" type="radio" name="order" '+($cfg_thumbr?'checked':'')+'>Scale to count </label>'+
'<input class="stdinput" id="thumbr_n" style="width:15px;margin:0;padding:1px;border:0;" type="textbox" value="'+$cfg_thumbr_n+'">(per row)<br><br>'+


'<label><input id="mini"     type="checkbox" '+($cfg_mini?'checked':'')  +'>Minimal UI</label><br>'+
'<label><input id="linktags" type="checkbox" '+($cfg_linktags?'checked':'')  +'>Direct Link Tags</label><br>'+
'<label><input id="grey"     type="checkbox" '+($cfg_grey?'checked':'')  +'>Grey e-hentai</label><br><br>'+
'<label><input id="autodl"   type="checkbox" '+($cfg_autodl?'checked':'')  +'>Auto Start Archive DL</label><br><div style="padding-right:22px;">Automatically accepts/begins archive download when you click to get an archive. Archives take GP so be careful.</div><br>'+

'<br><input id="applybtn" type="button" value="Apply" /><br>&nbsp;');


$('div.fxs input[type="checkbox"]').click(function (e) {
	GM_setValue("ehp_"+$(this).attr("id"), $(this).prop("checked")?true:false);		
});

$('div.fxs input[type="radio"]').click(function (e) {
	GM_setValue("ehp_thumbd", false); //hack
	GM_setValue("ehp_thumbh", false);
	GM_setValue("ehp_thumbr", false);
	GM_setValue("ehp_thumbv", false);
	
	GM_setValue("ehp_"+$(this).attr("id"), $(this).prop("checked")?true:false);
});

$('div.fxs input[type="textbox"], div.fxs textarea').keyup(function (e) {
	GM_setValue("ehp_"+$(this).attr("id"), $(this).val());		
});


$('div.fxs input#applybtn').click(function (e) {
	try { $("head").html($head_html); }
	catch(err) { }
	
	try { $('div#gdt').html($body_html); }
	catch(err) { }
	
	getSettings();
	if ($cfg_grey) { grey_css(); }
	if ($cfg_mini) { mini_css(); }
	applychanges();
});

//////////////////////////////////////////
//
//



//
//
//
// save page state for soft reload
$head_html = $("head").html();
$body_html = $('div#gdt').html();

if ($cfg_grey) { grey_css(); }
if ($cfg_mini) { mini_css(); }

function measure_thumbs() {
	$('.gdtl').each( function(i) {	
		$src = $(this).find('img').attr("src");
		$con = $src.match( /^[^-]*-[^-]*-(\d+)-(\d+)-.{3}_l\.jpg$/);
		$w = $con[1];
		$h = $con[2];
		
		$h = $h * 200 / $w;
		$w = 200;
		if ($h > 300) {
			$w = $w * 300 / $h;
			$h = 300;		
		}
		$wx[i] = $w;//Math.round($w);
		$hx[i] = $h;//Math.round($h);
		$img[i] = $(this).find('img');
		
		$total += $h;
		$count++;
	});
}

function default_css() {
	
	//default tiles are 320px
	//$tx = Math.floor(($cfg_gal_width - 25) / 228) * 228 + 25; //25px left padding
	$tx = $cfg_thumbr_un * 228 + 25;
	$('<style type="text/css">'+
	'div#gdt { max-width:'+$tx+'px; width:'+$tx+'px; min-width:'+$tx+'px;} '+
	'div#gdt {  padding: 15px 0 15px 25px !important; } '+
	'div.gdtl { padding-bottom:20px; padding-left:8px;} '+
	'div.gdtl img { border-radius: 4px 4px 4px 4px; } '+
	'div.gdtl { text-align:left } ' +
	'div.gdtl a { color:#C2A8A4; } ' +		
	'div.gdtl * { display:block; margin-top:1px;} ' +
	'div.gdtl { width: 220px } ' + 
	'</style>').appendTo("head");
}


function target_css() {
	$('<style type="text/css">'+
	'div#gdt { max-width:'+$cfg_gal_width+'px; width:'+$cfg_gal_width+'px; min-width:'+$cfg_gal_width+'px;} '+
	'div#gdt {  padding: 15px 25px !important; } '+
	'div.gdtl { padding-bottom:20px; padding-left:8px;} '+
	'div.gdtl img { border-radius: 4px 4px 4px 4px; } '+
	'div.gdtl { text-align:right } ' +
	'div.gdtl a { color:#C2A8A4; } ' +		
	'div.gdtl * { display:block; margin-top:1px;} ' +
	'</style>').appendTo("head");
}


function fixup_thumbs_height() {

	$wx = [];
	$hx = [];
	$img = [];

	$count = 0;
	$total = 0;
	measure_thumbs();

	$padding = 8;
	
	$sf=1;
	$k=0;
	$lastmaxh=$cfg_thumbh_px;
	//todo reject extreme aspects
	for ($i=0; $i<$img.length; $i++) {
		//scale and add images until width passes limit				
		$k = $i;		
		$last = 0;
		do {
			$k++;
			$targeth = $cfg_thumbh_px; //clamp scale to target
			
			//calc width based on target
			$last = $total;
			$total=0;
			for ($j=$i; $j<=$k; $j++) {
				$w = $wx[$j] * $targeth / $hx[$j];	
				$total += $w + $padding;			

				if ($j == $img.length ) { //past end case, fix totals (hack)
					$w = $wx[$j] * $targeth / $hx[$j];	
					$total += $w + $padding;
				}

			}
		} while ($total < ($cfg_gal_width - $padding) && $k<($img.length-1));
				
		//remove last image if it's farther from target height than with
		if ((($cfg_gal_width - $padding) - $last) < ($total - ($cfg_gal_width - $padding))) $k--;
		if ($k>=($img.length-1)) $k = $img.length-1; //keep k in bounds at end of list
		
		
		$maxh=0; //find maxh
		for ($j=$i; $j<=$k; $j++) { $maxh = Math.max($maxh, $hx[$j]); }
		
		$notlast = ($k+1) < $img.length;
		if ($notlast || $total > ($cfg_gal_width - $padding)) { //normal row case (and last row too big case)
			
			$total=0;
			for ($j=$i; $j<=$k; $j++) {
				$w = $wx[$j] * $maxh / $hx[$j];	
				$total += $w + $padding;		
			}
			
			$n = $k-$i+1;
			$padt = $padding * $n;
			$sf = ($cfg_gal_width - $padding - $padt) / ($total - $padt); //solve to $cfg_gal_width width
		}
		else $maxh = $lastmaxh; //ensure same ratio aspect as previous row

		$lastmaxh = $maxh;
		//setup image dimensions
		for ($j=$i; $j<=$k; $j++) {
			$wx[$j] = Math.floor($sf * $wx[$j] * $maxh / $hx[$j]);	
			$hx[$j] = Math.floor($sf * $maxh);		
		}

		
		if ($i > $k) break; //sanity check, probably not needed
		$i=$k;	
	}


	//apply fit row heights
	$.each($img, function(i,v) {
		v.attr('width',  $wx[i]);
		v.attr('height', $hx[i]);

		v.parent().parent().css('width',  $wx[i] +'px');
		v.parent().parent().css('height', $hx[i] +'px');	
	});
}


function fixup_thumbs_count() {

	$wx = [];
	$hx = [];
	$th = [];
	$img = [];

	$count = 0;
	$total = 0;
	measure_thumbs();

	$padding = 8;

	$sf=1;
	$sfx=1;
	$k=0;
	for ($i=0; $i<$img.length; $i++) {
		//pull images until width passes limit		
		$k=Math.min($i-1+$cfg_thumbr_n, $img.length-1); // n per row
		
		$islast = ($k+1) >= $img.length;

		$n = $k-$i+1;
		$padt = $padding * $n;
		$maxh=0; //find maxh
		for ($j=$i; $j<=$k; $j++) { $maxh = Math.max($maxh, $hx[$j]); }	 //$maxh = Math.max.apply(Math, $hx);
		
		
		$total=0;
		for ($j=$i; $j<=$k; $j++) {
			$w = $wx[$j] * $maxh / $hx[$j];	
			$total += $w + $padding;		
		}
			
		//solve to $cfg_gal_width width unless last row with < num items
		$sfx = ($cfg_gal_width - $padding - $padt) / ($total - $padt);
		if ($islast && $n < $cfg_thumbr_n) {
			$sf = ($cfg_gal_width - $padding - $padt) / ($total * $cfg_thumbr_n /$n  - $padt);
			if ($sfx < $sf) $sf = $sfx; //reduce if needed
			
		}
		else $sf = $sfx;
		
		
		//setup image dimensions
		for ($j=$i; $j<=$k; $j++) {
			$wx[$j] = Math.floor($sf * $wx[$j] * $maxh / $hx[$j]);	
			$hx[$j] = Math.floor($sf * $maxh);					
		}

		//advance i
		$i=$k;	
	}


	//apply fit row heights
	$.each($img, function(i,v) {
		v.attr('width',  $wx[i]);
		v.attr('height', $hx[i]);

		v.parent().parent().css('width',  $wx[i] +'px');
		v.parent().parent().css('height', $hx[i] +'px');	
	});

}


//remove click hanler for tags, reverts to direct link for search
function directlink_tags() {
	$(".gt a").each(function() {
		$(this).prop("onclick", null);
	});

}

function applychanges() {	
	
	if($cfg_thumbh || $cfg_thumbr) target_css();
	else default_css();

	if ($cfg_thumbh) fixup_thumbs_height(); //try for x height rows
	else if ($cfg_thumbr) fixup_thumbs_count(); //try for n images per row
	
	if($cfg_linktags) directlink_tags();
	showPage();
}
try { applychanges(); }
catch (err) { 
	showPage();	
	alert(err);	
}
}// g()


$cfg_autodl = GM_getValue("ehp_autodl", false);

if (document.URL.match(/^http:\/\/(g\.e-|e[^-])hentai\.org\/g\/.*$/)) { //gallery case
	g();	
}
else if (document.URL.match(/^http:\/\/(g\.e-|e[^-])hentai\.org\/archiver.php\?.*$/))  { //archive downloader step1
	showPage();
	if($cfg_autodl) {
		$(function() {
			$button = $('input.stdbtn');
			if ($button.attr('value') == 'Download Archive')
				$button.trigger('click');		
		});
	}
	else return;
}
else if (document.URL.match(/^http:\/\/95\.211\.(199|209)\.\d{1,3}\/archive\/.*$/) || document.URL.match(/^http:\/\/37\.48\.81\.\d{1,3}\/archive\/.*$/))  { //archive downloader step2
	showPage();
	if($cfg_autodl) {
		$(function() {
			$link = $('div#db a');
			if ($link.text() == 'Click Here To Start Downloading') {			
				$archive = 'http://' + window.location.hostname + $link.attr('href');
				window.location.href = $archive;
				//setTimeout(function(){ window.close(); },3000);
			}
		});
	}
	else return;
}
else if (document.URL.match(/^http:\/\/(g\.e-|e[^-])hentai\.org\/(?!s).*$/) && self == top) { //search / index case, exclude iframe (random) viewer	
	i();
}
else {
	showPage();
}

} // ehp();
addEventListener('DOMContentLoaded', ehp, false);