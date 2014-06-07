// ==UserScript==
// @name           Active Friends At Top
// @namespace      justjustin.facebook.activetop
// @include        http://*facebook.com/*
// @include        https://*facebook.com/*
// ==/UserScript==

function letsJQuery() {

	var uncared_for_name = "FRIENDS YOU DON'T CARE ABOUT";
	var sidebar_selector = '.fbChatSidebar .fbChatOrderedList';
	var sidebar = 'fbChatOrderedList';
	var new_sidebar_class = 'fbChatOrderedListNew';
	var id='';
	
	var debug = false;
	var run_once = false;
	var count = 0;
	var running = false;
	var insertion = 0;
	
	log('running');
	wait();
	
	function wait(){
		var rex = /ai.php/i;
		var loc = window.location + "";
		loc = loc.search(rex);
		if(loc != -1){
			log('ai.php dieing');
			return;
		}
		if(window.going == 1){
			log('window.going is set');
			return;
		}
		if(typeof window.jQuery == 'undefined')
		{
			count++;
			setTimeout(wait, 100);
		}
		else{
			window.going = 1;
			$.noConflict();
			log('Took '+count+'attempts. '+(count * 100)+'ms');
			count = 0;
			lets_go();
		}
	}
	
	function lets_go(){
		//Check if really facebook.
		
		if(run_once == false){
			my_run();
		}
		else{
			run_once = true;
		}
	}
	
	function my_run()
	{
		if(jQuery(sidebar_selector).find('.item:not(.active)').length <= 1){
			count++;
			setTimeout(my_run, 200);
		}
		else{
			log('Took '+count+' attempts for userlist. '+(count * 200)+'ms');
			count = 0;
			if(jQuery(sidebar_selector).find('.separator').length != 2){
				log("see me once");
				newprepUserList();
				newupdateUserList();
			}
			registerListener();
		}
	}
	function newprepUserList(){
		id = jQuery(sidebar_selector).attr('id');
		
		var new_sep = jQuery(sidebar_selector).find('.separator').clone();
		jQuery(sidebar_selector).find('.separator .text').html(uncared_for_name);
		jQuery(sidebar_selector).find('.separator').addClass('no_care_sep');
		
		jQuery(new_sep).find('.text').html('OFFLINE FRIENDS');
		jQuery(new_sep).addClass('offline_sep');
		
		jQuery(sidebar_selector).append(new_sep);
		jQuery(sidebar_selector).prepend("<div class='insert_after' style='display:none;'></div>");
		
	}
	
	function newupdateUserList(){
		if(id != jQuery(sidebar_selector).attr('id'))
		{
			log('ID Change from ' + id + ' to ' + jQuery(sidebar_selector).attr('id'));
			id = jQuery(sidebar_selector).attr('id');
		}
		
		jQuery(sidebar_selector).children().each(function(){
			if(jQuery(this).is('.separator')){
				return false;
			}
			if(jQuery(this).is('.insert_after')){
				return;
			}
			
			if(jQuery(this).is('.active, .idle')){
				jQuery(this).insertAfter(sidebar_selector + ' .insert_after');
			}
			else{
				jQuery(this).insertAfter(sidebar_selector +' > :last');
			}
		});
	}
	
	function registerListener(){
		jQuery(sidebar_selector).parent().bind("DOMNodeInserted", function(){
			insertion = new Date().getTime();
			if(running){
				return;
			}
			running = true;
			timerHelper();
		});
	}
	
	function timerHelper(){
		var new_time = new Date().getTime();
		if(new_time - insertion < 50){
			setTimeout(timerHelper, 50);
			return;
		}
		
		if(changed()){
			log('Rearranging');
			newprepUserList();
			newupdateUserList();
		}
		running = false;
	}
	
	function changed(){
		if(jQuery(sidebar_selector).find('.separator').length == 2){
			return false;
		}
		return true;
	}
	function log(obj){
		if(debug){
			console.log(obj);
		}
	}
}

// Create element to inject jQuery into page
var jQuery = document.createElement("script"),
    inject = document.createElement("script");

// Set script element to jQuery Google CDN
jQuery.setAttribute('type', 'text/javascript');
jQuery.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js');

// Load script element with our userjs
inject.setAttribute('type', 'text/javascript');
inject.appendChild(document.createTextNode('(' + letsJQuery + ')()'));

unsafeWindow.console.log('injecting');
// Append script
document.body.appendChild(jQuery);
document.body.appendChild(inject);