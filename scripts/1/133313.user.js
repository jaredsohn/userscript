// ==UserScript==
// @name           BigShark
// @namespace      .
// @description    Bigger buttons for Grooveshark.com
// @include        http://*.grooveshark.com/*
// @include        https://*.grooveshark.com/*
// @version        1.0
// ==/UserScript==

/**
 * BigShark - Bigger buttons for Grooveshark.com
 * @require jQuery
 * @date 5/8/12
 * @author Ivan Lazarevic
 * @link http://workshop.rs
 */
var bigShark = function($, window, undefined) {

	var bs = {};
	
	/**
	 * Adding Button for show/hide BigShark
	 */
	bs.addMenu = function(){
		var $menu = $('<div />').attr('id','bigSharkMenu').html('BIG SHARK').click( function(){ $('#bigSharkHolder').slideToggle(); });
		$('body').append($menu);
	};
	
	/**
	 * Create holder for controls buttons and controls
	 */
	bs.addHolder = function(){
		var $holder = $('<div />').attr('id','bigSharkHolder');
			$next 	= $('<div />').attr('id','bigSharkNext').click( function(){ Grooveshark.next(); $('#bigSharkPause').show(); $('#bigSharkPlay').hide(); }).html('&raquo;').addClass('bigSharkControls');
			$prev 	= $('<div />').attr('id','bigSharkPrev').click( function(){ Grooveshark.previous(); $('#bigSharkPause').show(); $('#bigSharkPlay').hide(); }).html('&laquo;').addClass('bigSharkControls');	
			$play 	= $('<div />').attr('id','bigSharkPlay').click( function(){ Grooveshark.play(); $(this).hide(); $('#bigSharkPause').show(); }).html('&gt;').addClass('bigSharkControls');
			$pause 	= $('<div />').attr('id','bigSharkPause').click( function(){ Grooveshark.pause(); $(this).hide(); $('#bigSharkPlay').show(); }).html('||').addClass('bigSharkControls');						
		$('#content').append($holder);
		$('#bigSharkHolder').append($play, $pause, $next, $prev);
	};

	/**
	 * Append CSS for BigShark
	 */
	bs.addStyle = function(){
		var style  = "<style>";
			style += "	#bigSharkMenu { position: absolute; top: -5px; left: 450px; padding: 15px 10px 10px; z-index: 9999; cursor: pointer; }";
			style += "	#bigSharkMenu { background-color: #0099FF; border-radius: 5px; }";

			style += "	#bigSharkHolder { display: none; position: absolute; top: 0; bottom: 0; left: 0px; right: 0; background-color: white; z-index: 9999 }";
			style += "	.bigSharkControls { padding-top: 250px; width: 20%; position: absolute; top: 0; bottom: 0; font-weight: bold; font-size: 150px; color: #FFF; text-align: center; background-color: #000; cursor: pointer; -moz-transition: all 0.3s ease-in-out;}";
			style += "	#bigSharkNext { right: 0; border-left: 1px dashed #f3f3f3; }";	
			style += "	#bigSharkPrev { border-right: 1px dashed #f3f3f3; }";	
			style += "	#bigSharkPlay { width: 100%; }";
			style += "	#bigSharkPause { width: 100%; display: none; }";
			style += " .bigSharkControls:hover { background-color: #FFF; color: #000; }"									
			style += "</style>";
		$('body').append(style);
	};
	
	/**
	 * Script initialization
	 */
	bs.init = function(){
		if($('#header_account_group').length || $('#session_btn_signup').length) {
			this.addStyle();
			this.addMenu();
			this.addHolder();
		} else {
			setTimeout(function() { bs.init(); }, 500);
		}
	};
	
	
	bs.init();

};


var script = document.createElement('script');
script.textContent = '(' + bigShark + ')(jQuery, window);';
document.body.appendChild(script);