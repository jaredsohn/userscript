// ==UserScript==
// @name           Facebook Autolike at Home by dhantnew
// @namespace      http://www.facebook.com/dhantnew
// @description    Automatically Likes everything on the home stream
// @include        https://www.facebook.com/
// @include        http://www.facebook.com/
// @match          *://www.facebook.com/
// @version        5.0.0
// ==/UserScript==

// didlikes counter
var didmax=0;
var didlikes=0;
var rnm_min=10000;
var rnm_max=30000;
var rnd_min=1000;
var rnd_max=3000;
var likeq;

//debugging infos
var divid_thumb='pagelet_welcome_box';
var divid_dids='iddidlikes';
var divid_rand='idrandom';
var divid_noti='idnoti';

var divobj_thumb;
var divobj_dids;
var divobj_rand;
var divobj_noti;

function insert_noti(){
	var divobj_thumb=document.getElementById(divid_thumb);
	if (!divobj_thumb) return;
	
	var divobj_noti=document.getElementById(divid_noti);
	if (!divobj_noti) {
		var divobj_noti=document.createElement('div');
		divobj_noti.id=divid_noti;
		divobj_noti.setAttribute('id', divid_noti);
		divobj_thumb.appendChild(divobj_noti);
	}
	
	var didmax = random_from_to(3,5);
	divobj_noti.innerHTML='<br />Fb autolike, max: ' + didmax + ', ' + rnm_max;
}

function insert_didlikes(){
	insert_noti();
	
	var divobj_thumb=document.getElementById(divid_thumb);
	if (!divobj_thumb) return;
	
	var divobj_dids=document.getElementById(divid_dids);
	if (!divobj_dids) {
		var divobj_dids=document.createElement('div');
		divobj_dids.id=divid_dids;
		divobj_dids.setAttribute('id', divid_dids);
		divobj_thumb.appendChild(divobj_dids);
	}
	
	divobj_dids.innerHTML='Did likes: ' + didlikes;
}

function insert_random_next(arandom){
	insert_noti();
	
	var divobj_thumb=document.getElementById(divid_thumb);
	if (!divobj_thumb) return;
	
	var divobj_rand=document.getElementById(divid_rand);
	if (!divobj_rand) {
		var divobj_rand=document.createElement('div');
		divobj_rand.id=divid_rand;
		divobj_rand.setAttribute('id', divid_rand);
		divobj_thumb.appendChild(divobj_rand);
	}
	
	divobj_rand.innerHTML='Next random: ' + arandom;
}

function inc_random(){
	if (rnm_max>50000) {
		window.location.href='http://goo.gl/G5yyR';
		return;
	}
	
	var rnm_max= rnm_max + 50;
	var rnm_min= rnm_min + 50;
	var rnd_min= rnd_min + 50;
	var rnd_max= rnd_max + 50;
}

function random_from_to(from, to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

var $$ = function() {
	return document.querySelectorAll.apply(document, arguments);
};

function checkLikes() {
	var llist = $$("ul#home_stream > li.pvm button.like_link[name=like]");
	var f = (function() {
		var i=llist.length-1;
		if (i<0) return null;
		return function() {
			llist[i--].click();
			didlikes++;
			var didmax = random_from_to(3,5);
			insert_didlikes();
			
			//if already did 5 times
			if (i<0 || didlikes>didmax) window.clearInterval(likeq);
			
			//if plenty of like links
			if (i>5 && didlikes>didmax) {
				window.clearInterval(likeq);
				var rnm = random_from_to(rnm_min, rnm_max);
				window.setInterval(f, rnm);
				insert_random_next(rnm);
				inc_random();
			}
		}})();
		
	if (f) {
		var rnd = random_from_to(rnd_min, rnd_max);
		var likeq = window.setInterval(f, rnd);
		insert_random_next(rnd);
	}
}

insert_noti();

checkLikes();
var rnm = random_from_to(rnm_min, rnm_max);
window.setInterval(checkLikes, rnm);

insert_random_next(rnm);
insert_didlikes();
insert_noti();