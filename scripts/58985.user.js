// ==UserScript==
// @name           Is_cool auto sender
// @namespace      http://nirahiel.olympe-network.com
// @include        http://apps.facebook.com/is_cool/*
// @author         Nirahiel
// @description    This script will check who from your friends sent you points, then will send them points, and accept their points.This script is not used to cheat, only to make the process easier.
// @description    Updated for the new Is Cool, works fine now :)
// @version        1.1
// @require	       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
if(!GM_getValue || !GM_setValue) {
	alert("Please upgrade to the latest version of GreaseMonkey");
	return;
}
var configured = GM_getValue("config","no");
if(configured == "no") {
	if(confirm("Is_cool auto sender configuration.\n"+
	"Do you want to enable auto refresh of the page ?\n"+
	"(Note, that would be cheating, use at your own risk)")) {
	GM_setValue("refresh","yes");
	}
	GM_setValue("config","yes");
}
function log(a) {
	if(unsafeWindow.console && console.log) {
		console.log(a);
	}
}
function trim (myString)
{
return myString.replace(/^\s+/g,'').replace(/\s+$/g,'')
} 
function reload() {
	var timer = Math.floor(Math.random()*10000)*2;
	setTimeout(function() {
		log("Refreshing NOW !");
		document.location.href = "http://apps.facebook.com/is_cool/";
	},timer);
	log("----------");
	log("Refreshing in " + (Math.floor(timer / 1000)+1) + " seconds");
	log("----------");
	for(a=0;a<timer;a+=5000) {
		setTimeout(function(b){
			log("Refreshing in " + (Math.floor(b / 1000)+1) + " seconds");
			log("----------");
		},a,timer-a);
	}
	return false;
}
$(function() {
	log("Starting script");
	//On va chercher a récupérer la liste des users qui nous ont envoyé des points
	var form_recv = $('#app25148877350_form_receive_point');
	var recv = form_recv.find('.invit');
	var form_send = $('#app25148877350_form_sent_point');
	var send = form_send.find('.invit');
	//on regarde si cette liste est vide
	if(recv.length == 0) {
		if(GM_getValue("refresh","no") == "yes") {
		return reload();
		} else {
		return false;
		}
	}
	var exists = false;
	var igot = false;
	recv.each(function() {
		igot = true;
		//on va regarder s'il existe des correspondances à gauche
		var item = $(this);
		var nom = item.text();
		nom = trim(nom);
		log("Processing "+nom);
		item.find("input").attr("checked","checked");
		send.each(function() {
			var that = $(this);
			if(trim(that.text()) == nom) {
				exists = true;
				that.find("input").attr("checked","checked");
				log("    "+nom+" found !");
			}
		});
	});
	if(exists == true) {
		log("Sending cool points");
		$("#app25148877350_form_sent_point_submitok").val(1);
		$("#app25148877350_form_sent_point").submit();
	} else if(igot == true) {
		log("Receiving cool points");
		$("#app25148877350_form_receive_point_submitok").val(1);
		$("#app25148877350_form_receive_point").submit();
	}
	
});