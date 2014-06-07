// ==UserScript==
// @name           Facebook Autolike at Home by RadarPos.com
// @description    Automatically Likes everything on the home stream
// @namespace      http://www.radarpos.com/
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @match          *://www.facebook.com/*
// ==/UserScript==

// http://userscripts.org/scripts/review/120770
//
//

//disable in subscriber pages
var aurl = window.location.href;
if (aurl){
	if (aurl.indexOf('sk=subscribedto')>=0 || aurl.indexOf('sk=subscribers')>=0 || aurl.indexOf('reqs.php')>=0) {
		return;
	}
}


// didlikes counter
var doing_comment = false;
var ilo; var llist; var likeq;
var will_refresh=false;
var didmax=0;
var didlikes=0;
var didloops=0;
var didmoreposts=0;

var rnd; var rnm;
var rnm_min=15000;
var rnm_max=20000;
var rnd_min=5000;
var rnd_max=9000;

var ref_min=200000;
var ref_max=300000;

//debugging infos
var divobj_thumb; var divid_thumb;
var divid_thumb1='pagelet_welcome_box';
var divid_thumb2='pagelet_profile_picture';
var divid_thumb3='pagelet_profile_photo';
var divid_thumb4='pagelet_right_sidebar';

var divid_dids='iddidlikes';
var divid_loop='iddidloops';
var divid_rand='idrandom';
var divid_noti='idnoti';
var divid_plan='idplan';
var divid_layer='idlayer';
var divid_lastclick='idlastclick';
var divid_tryclick='idtryclick';
var divid_moreposts='idmoreposts';

//elapsed
var seconds; var minutes; 
var sdate = new Date();
var startTime = sdate.getTime();
var lastClick = startTime;


function tunda(milliSeconds){
	var atime = new Date().getTime(); 
	while (new Date().getTime() < atime + milliSeconds); 
}

function createLayer(){
	var div = document.getElementById(divid_layer);
	
	if (!div){
		var div = document.createElement(divid_layer);
		div.setAttribute('id', divid_layer);
		div.style.position = "fixed";
		div.style.display = "block"; 
		div.style.opacity= 0.90;
		div.style.top = "+30px";
		div.style.right = "+3px";
		div.style.backgroundColor = "#eceff5";
		div.style.border = "1px dashed #94a3c4";
		div.style.padding = "3px";
		div.style.margin = "3px";
		
		document.body.appendChild(div);
	}

	if (div) {
		divid_thumb = divid_layer;
		divobj_thumb = document.getElementById(divid_thumb);
	}
}


function refresh_page(){
	window.location.reload(true);
	will_refresh = false;
}

function compute_elapsed(){
	var edate = new Date();
	var endTime = edate.getTime();
	var timeDiff = endTime - startTime;

	// get seconds
	seconds = Math.round(timeDiff / 1000);
	// get minutes
	minutes = Math.round(timeDiff / 60000);
	
	if (minutes>5) {
		will_refresh = true;
		refresh_page();
	}
}

function inc_random(){
	compute_elapsed();
	
	if (rnm_max>50000 || minutes>5 || didlikes>20 || didloops>10) {
		will_refresh = true;
		refresh_page();
		return;
	}
	
	rnm_max= rnm_max + 50;
	rnm_min= rnm_min + 50;
	rnd_min= rnd_min + 50;
	rnd_max= rnd_max + 50;
}


function hide_by_id(idname){
	var obj=document.getElementById(idname);
	if (obj){
		obj.style.display = 'none';
		obj.style.visibility = 'hidden'; 
	}
}

function set_height_id(idname, aheight){
	var obj=document.getElementById(idname);
	if (obj){
		obj.style.height = aheight + 'px';
	}
}

function fillobj_thumb(){
	divobj_thumb = document.getElementById(divid_thumb1);
	if (!divobj_thumb) {
		divobj_thumb = document.getElementById(divid_thumb2);
		if (divobj_thumb) divid_thumb = divid_thumb2;
		else {
			divobj_thumb = document.getElementById(divid_thumb3);
			if (divobj_thumb) divid_thumb = divid_thumb3;
			else {
				divobj_thumb = document.getElementById(divid_thumb4);
				if (divobj_thumb) divid_thumb = divid_thumb4;
				else {
					//create self layer
					createLayer();
				}
			}
		}
	}
	else {
		divid_thumb = divid_thumb1;
	}
}

function insert_div_text(idname, txt){
	if (!divid_thumb) fillobj_thumb();
	
	divobj_thumb = document.getElementById(divid_thumb);
	if (!divobj_thumb) return;
	
	var divobj = document.getElementById(idname);
	if (!divobj) {
		divobj = document.createElement('div');
		divobj.id = idname;
		divobj.setAttribute('id', idname);
		divobj.style.padding = "1px";		
		divobj_thumb.appendChild(divobj);
	}
	
	divobj.innerHTML = txt;
}

function insert_noti(){
	var didmax = random_from_to(2,4);
	inc_random();
	compute_elapsed();
	
	var txt = '<br />Fb autolike'
	+ '<br />Max: ' + didmax + ', ' + rnm_max
	+ '<br />Elapsed: ' + seconds + ', ' + minutes
	+ '<br /><a href="#" onClick="disableLikesLoops(); return true;">Disable Loops</a>'
	+ '<br />';
	insert_div_text(divid_noti, txt);
}

function insert_random_next(arandom){
	insert_noti();
	insert_div_text(divid_rand, 'Next random: ' + arandom);
}

function insert_plan(aplan){
	insert_noti();
	insert_div_text(divid_plan, 'Plans: ' + aplan);
}

function insert_didloops(){
	insert_noti();
	insert_div_text(divid_loop, 'Loops: ' + didloops);
}

function insert_didlikes(){
	insert_noti();
	insert_didloops();
	insert_div_text(divid_dids, 'Likes: ' + didlikes);
}

function insert_didmoreposts(){
	insert_noti();
	insert_didloops();
	insert_div_text(divid_moreposts, 'MorePosts: ' + didmoreposts);
}

function insert_lastclick(delta){
	insert_noti();
	insert_div_text(divid_lastclick, 'Delta Last: ' + delta);
}

function insert_tryclick(delta){
	insert_noti();
	insert_div_text(divid_tryclick, 'Delta Try: ' + delta);
}


function random_from_to(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var $$ = function() {
	return document.querySelectorAll.apply(document, arguments);
};


	
function clicking_more_posts() {
	insert_didmoreposts();
	didmoreposts++;
	
	if (didmoreposts > 2) {
		if (ilo<0 && minutes>0){
			llist = $$("button[type=submit][title='Like this comment']");
			if (llist) ilo = llist.length-1;
			else ilo = -1;
			doing_comment = true;
		}
		
		insert_plan(ilo);
		insert_didlikes();
		compute_elapsed();
		insert_didmoreposts();
		
		return;
	}
	
	var idx = -1;
	var pager = document.getElementById('pagelet_stream_pager');
	if (pager) idx = 0;
	else {
		var pager = document.getElementById('profile_pager');
		if (pager) idx = 0;
		else {
			var pager = document.getElementById('pagelet_group_pager');
			if (pager) idx = 0;
		}
	}
	
	if (idx < 0) return;
	
	var alink = pager.getElementsByTagName('a')[0];
	if (alink) {
		var oc = alink.getAttribute('onClick');
		if (oc)
      try {
				eval(oc);
      } catch (e) {
				return false;
      }		
	}
}

function clicking_view_more_comment(){
	return;
	
	var mcoms = $$("input[type=submit][name='view_all[1]'][class='stat_elem']");
	if (!mcoms) return;
	if (!mcoms.length) return;
	
	var num = random_from_to(0, mcoms.length-1);
	mcoms[num].click();
}

function click_like_comment(){
	var coms = $$("button[type=submit][title='Like this comment']");
	if (!coms) return;
	if (!coms.length) return;
	
	var num = random_from_to(0, coms.length-1);
	coms[num].click();
}



function checkLikes() {
	
	//llist = $$("ul#home_stream > li.pvm button.like_link[name=like]");
	//var llist = $$("button[type=submit][title='Like this comment']");
	
	if (doing_comment) llist = $$("button[type=submit][title='Like this comment']");
	else llist = $$("button.like_link[name=like]");
	
	var f = (function() {
		if (!divid_thumb || !divobj_thumb) fillobj_thumb();
		
		if (llist) ilo = llist.length-1;
		else ilo = -1;
		
		if (ilo < 2){
			clicking_more_posts(); 
			tunda(2000);
			
			if (doing_comment) llist = $$("button[type=submit][title='Like this comment']");
			else llist = $$("button.like_link[name=like]");
			
			if (llist) ilo = llist.length-1;
			else ilo = -1;
		}
		
		insert_plan(ilo);
		insert_didlikes();
		compute_elapsed();
		
		if (ilo<0) return null;
		
		return function() {
			var adate = new Date();
			noww = adate.getTime();
			delta = noww - lastClick;
			insert_tryclick(delta);
			
			if (ilo>=0 && delta>rnd_min)
			try {
				llist[ilo--].click();
				
				didlikes++;
				var didmax = random_from_to(2,5);
				insert_didlikes();
				
				var adate = new Date();
				noww = adate.getTime();
				delta = noww - lastClick;
				insert_lastclick(delta);
			
				var adate = new Date();
				lastClick = adate.getTime();
			} catch (e) {
				return false;
			}
			
			insert_plan(ilo);
			
			//if already did 5 times
			if (ilo<0 && didlikes>0 && !will_refresh && minutes>5) {
				will_refresh = true;
				window.clearInterval(likeq);
				var rnd = random_from_to(rnd_min, rnd_max);
				var rnm = random_from_to(ref_min, ref_max);
				var likeq = window.setInterval('window.location.reload(true)', rnm);
				insert_random_next(rnm);
			}
			
			//if plenty of like links, do another loop
			if (ilo>5 && didlikes>didmax) {
				window.clearInterval(likeq);
				var rnm = random_from_to(rnm_min, rnm_max);
				var likeq = window.setInterval(f, rnm);
				insert_random_next(rnm);
				
				didloops++;
				insert_didloops();
			}
		}})();
	
	
	hide_by_id('pagelet_contextual_help');
	hide_by_id('pagelet_rhc_ticker');
	set_height_id('fbCoverImageContainer', 100);
	compute_elapsed();
	
	if (f) {
		var rnd = random_from_to(rnd_min, rnd_max);
		var likeq = window.setInterval(f, rnd);
		insert_random_next(rnd);
	}
	else {
		if (!will_refresh && minutes>5) {
			//if no like button at all
			will_refresh = true;
			window.clearInterval(likeq);
			var rnm = random_from_to(ref_min, ref_max);
			var likeq = window.setInterval('window.location.reload(true)', rnm);
			insert_random_next(rnm);
		}
		else {
			var rnm = random_from_to(ref_min, ref_max);
			var likeq = window.setInterval(f, rnm);
			insert_random_next(rnm);
		}
	}
}


function disableLikesLoops(){
	will_refresh = true;
	window.clearInterval(likeq);
	unset(likeq);
	
	didloops = -1;
	didlikes = -1;
	didmax = -1;
	didmoreposts = -1;
	
	insert_noti();
	insert_didlikes();
	insert_didmoreposts();
	insert_didloops();
}


hide_by_id('pagelet_contextual_help');
hide_by_id('pagelet_rhc_ticker');
set_height_id('fbCoverImageContainer', 100);

compute_elapsed();
fillobj_thumb();
insert_noti();
insert_didlikes();
insert_didmoreposts();

//checkLikes();
//var rnm = random_from_to(rnm_min, rnm_max);
window.setInterval(checkLikes, 500);

insert_random_next(rnm);
insert_noti();
