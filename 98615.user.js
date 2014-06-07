// ==UserScript==
// @name           daniweb_mod
// @version        .1
// @namespace      daniweb_mod
// @description    modify daniweb interface
// @include        http://www.daniweb.com/*
// @include        http://daniweb.com/*
// ==/UserScript==
String.prototype.repeat = function(l) {
	return new Array(l+1).join(this[0]);;
}

var img_show_top, img_show_ctrls;
var img_hide_top, img_hide_ctrls;
var gif_img = 'data:image/gif;base64,';

var img64_up = gif_img+'R0lGODlhBwAIAIABAGeEx////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAHAAgAAAINjGEJq8h80ElRhufsKgA7';
var img64_dn = gif_img+'R0lGODlhBwAIAIABAGeEx////yH5BAEKAAEALAAAAAAHAAgAAAIMBIIWqtm44GNnvgQLADs=';
var img64_lt = gif_img+'R0lGODlhCAAHAIABAGeEx////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAIAAcAAAINjGGBuoB+XlssJljPLQA7';
var img64_rt = gif_img+'R0lGODlhCAAHAIABAGeEx////yH5BAEKAAEALAAAAAAIAAcAAAINRG6YkMF63DJP2ttaAQA7';
var img64_uplt = gif_img+'R0lGODlhEQAKAPcAAAAAAGeExw'+'A'.repeat(1015)+
	'CH5BAEAAP8ALAAAAAARAAoAAAg2AP8JHEiwYMEABBEeHBhA4b+GDh86nIiwIcOLAi1mrJjQYMSI'
	+'DxNqzChyo0SGH0+aJGmwJcGAADs=';
var img64_dnrt = gif_img+'R0lGODlhEQAKAPcAAAAAAGeExw'+'A'.repeat(1015)
	+'CH5BAEAAP8ALAAAAAARAAoAAAg1AP8JHEiw4MAABxEKDIBQ4UKHDP9FlOhQIkGGFStaPGgwI8'
	+'WEHBeCnLjxY0KIEDteNMiSZUAAOw==';
var img64a = gif_img+'R0lGODlhEQAKAPcAAAAAAGeExw'+'A'.repeat(1015)
	+'CH5BAEAAP8ALAAAAAARAAoAAAgzAP8JHEiwYMEABBEOVLiQYYCHDRNGfKjQYUSD/ypizGhRYE'
	+'WIED0mdBiS40GJCzeqHBgQADs=';
var img64b = gif_img+'R0lGODlhEQAKAPcAAGeEx////w'+'A'.repeat(1015)
	+'CwAAAAAEQAKAAAIMwADCBxIsGBBAAQRDlS4kCGAhw0TRnyo0GFEgwEqYsxoUWBFiBA9JnQYku'
	+'NBiQs3qhwYEAA7';
var div_header = document.getElementById('header_container');
var div_nav = document.getElementById('navigation_container');
var asdfg = element_containing('thead','Private Messages in Folder').parentNode.parentNode.parentNode;

var GadsObj = document.getElementById('google_ads_div_Leaderboard');
if (!GadsObj) GadsObj = document.getElementById('google_ads_div_Leaderboard_ad_container');
if ((div_header) && (div_nav)) {
	var div_folderctrls = element_containing('div','Folder Controls')
	if (div_folderctrls) {
		div_folderctrls = div_folderctrls.parentNode;
		var div_userbar = document.getElementById('userbar_container');
		var tbl_controls = element_containing('tbody', '<a class="smallfont" href="/forums/calendar.php?do=viewreminder">').parentNode;//.parentNode;
		init_max_restore(
			element_containing('a','collapseimg_pmlistinfo').parentNode.parentNode.parentNode.parentNode
			, img64b
			, 'maximize_messages'
			, element_containing('thead','Private Messages in Folder').parentNode.parentNode.parentNode
		)
		init_show_hide(
			div_userbar
			, img64_uplt
			, 'fold_all'
			, document.getElementById('userbar_container')
			, document.getElementById('navigation_container')
			, document.getElementById('header_container')
			, element_containing('div','Folder Controls').parentNode
			, element_containing('tbody', '<a class="smallfont" href="/forums/calendar.php?do=viewreminder">').parentNode
			, element_containing('thead','Private Messages in Folder').parentNode
		)
		init_show_hide(
			div_nav
			, img64_up
			, 'nav_interface'
			, document.getElementById('navigation_container')
			, document.getElementById('header_container')
		);
		init_show_hide(
			div_folderctrls
			, img64_up
			, 'folders_interface'
			, element_containing('div','Folder Controls').parentNode
		);
		init_show_hide(
			tbl_controls
			, img64_lt
			, 'controls_interface'
			, element_containing('tbody', '<a class="smallfont" href="/forums/calendar.php?do=viewreminder">').parentNode
		);
	}
}

function init_show_hide(beside_obj, img_src, img_id, hide_ele) {
	var local_id   = img_id+'_hide';
	var persist_id = local_id+'hidden_persist';
	var args = Array.prototype.slice.call(arguments);
	var img            = document.createElement("img");
	img.hidden_monkey  = GM_getValue(persist_id, false);
	img.id             = local_id;
	img.src            = img_src;
	img.style.cursor   = 'pointer';
	img.style.padding  = '.5em .5em .5em .5em';
	img.style.cssFloat = 'left';
	img.style.display  = 'block';
	img.addEventListener('click', function() {
		var dispA
		if(img.hidden_monkey==true) {
			dispA='block';
			img.hidden_monkey = false;
			GM_setValue(persist_id, false);
		} else {
			dispA='none';
			img.hidden_monkey = true;
			GM_setValue(persist_id, true);
		}
		for(var i=0;i<args.length;i++){if(i>2){args[i].style.display=dispA;}}
	}, false);
	var objInsBefore = beside_obj.parentNode;
	objInsBefore.insertBefore(img, beside_obj);
	if (img.hidden_monkey == true) {
		dispA='none';
		img.hidden_monkey = true;
		for(var i=0;i<args.length;i++){if(i>2)args[i].style.display=dispA;}
	}
}
function init_max_restore(BesideObj, img_src, img_id, MaximizeEle) {
	var local_id   = img_id+'_max_restore';
	var persist_id = local_id+'maximized_persist'
	var args = Array.prototype.slice.call(arguments);;
	var ele            = eval(MaximizeEle);
	var img            = document.createElement('img');
	img.id             = local_id;
	img.src            = img_src;
	img.style.cursor   = 'pointer';
	img.style.padding  = '.5em .5em .5em .5em';
	img.style.cssFloat = 'left';
	img.style.display  = 'inline';
	img.elStyledisplay = MaximizeEle.style.display;
	img.elStyleposition= MaximizeEle.style.position;
	img.elStyletop     = MaximizeEle.style.top;
	img.elStyleleft    = MaximizeEle.style.left;
	img.elStylewidth   = MaximizeEle.style.width;
	img.elStyleheight  = MaximizeEle.style.height;
	img.big_gorilla    = GM_getValue(persist_id, false);
	img.addEventListener('click', function() {
		MaximizeEle = eval(MaximizeEle);
		if(img.big_gorilla==true) {
			if (GadsObj) GadsObj.style.display='';
			MaximizeEle.parentNode.insertBefore(img, MaximizeEle);
			MaximizeEle.style.display  = img.elStyledisplay;
			MaximizeEle.style.position = img.elStyleposition;
			MaximizeEle.style.top      = img.elStyletop;
			MaximizeEle.style.left     = img.elStyleleft;
			MaximizeEle.style.width    = img.elStylewidth;
			MaximizeEle.style.height   = img.elStyleheight;
			img.big_gorilla    = false;
			GM_setValue(persist_id, false);
		} else {
			if (GadsObj) GadsObj.style.display='none';
			MaximizeEle.insertBefore(img, MaximizeEle.firstChild);
			MaximizeEle.style.display  = 'block';
			MaximizeEle.style.position = 'absolute';
			MaximizeEle.style.top      = '0px';
			MaximizeEle.style.left     = '0px';
			MaximizeEle.style.width    = '90%';
			MaximizeEle.style.height   = '90%';
			img.big_gorilla    = true;
			GM_setValue(persist_id, true);
		}
		eval(MaximizeEle);
	}, false);
	eval(BesideObj).parentNode.insertBefore(img, eval(BesideObj));
	if (img.big_gorilla == true) {
		if (GadsObj) GadsObj.style.display='none';
		MaximizeEle.insertBefore(img, MaximizeEle.firstChild);
		MaximizeEle.style.display  = 'block';
		MaximizeEle.style.position = 'absolute';
		MaximizeEle.style.top      = '0px';
		MaximizeEle.style.left     = '0px';
		MaximizeEle.style.width    = '90%';
		MaximizeEle.style.height   = '90%';
		img.big_gorilla    = true;
	}
}

function element_containing(element, str, blTmp) {
	arr = document.getElementsByTagName(element);
	for(var i=0; i < arr.length; i++) {
		if (blTmp) GM_log(arr.item(i).innerHTML);
		if (arr.item(i).innerHTML == null) {}
		else if (arr.item(i).innerHTML.indexOf(str) <= 0) {}
		else if (arr.item(i).getElementsByTagName(element).length==0) {
			return arr.item(i);
		}
	} return null;
}
