// ==UserScript==
// @id             JS_HIDE_ACH
// @name           hide_stuff_achievements
// @version        1.0
// @namespace      JS
// @author         rocket_turtle
// @description    show or hide stuff in the shops you already have, or hide achieved achievements
// @include        *.the-west.*/game.php*
// @run-at         document-end
// ==/UserScript==
// ==/UserScript==
// Changelog
// 0.5 hide achieved achievments
// 0.7 add button to hide / show hidden stuff
// 1.0 hide stuff in trader + shops you already have
// 1.1 + stuff you wear
// 1.5 display only stuff in your bag you have more than once in trader
// 1.6 + in market

var RegisterScript = document.createElement("script");
RegisterScript.type = "text/javascript";
RegisterScript.text = "TheWestApi.register('hide_stuff_ach', 'JS hide stuff and achievements', '1.33', '1.33', 'rocket_turtle', ' ')";
document.body.appendChild(RegisterScript);

if (location.href.indexOf(".the-west.") != -1 && location.href.indexOf("game.php") != -1){
	var style = document.createElement('style'); style.setAttribute('type', 'text/css');
	style.innerHTML = ''
	+ '.js_hide_button_old{ right:85px;top:8px;float:right;position:absolute;}'
	+ '.js_hide_button{ height:16px;width:16px;display:block;background:url("http://www.the-west.de/images/ranking/town_ranking_icons.png") repeat scroll 0px -80px transparent;}';
	
	var script = document.createElement('script'); script.setAttribute('type', 'text/javascript'); script.setAttribute('id', 'JS_HIDE_SCRIPT');
	var f1 = (function js_hide(){
		if( JS_HIDE ){
			for(var c=0; c < JS_HIDE_STUFF.length;c++){
				jQuery("#trader_inv_div").find('img[alt="' + JS_TRADER_INVENTORY[JS_HIDE_STUFF[c]].obj.name + '"]').parent().hide();
			}
			jQuery(".achievement").not(".achievement_achieved").hide();
		}
			
	}).toString();
	
	var f2 = (function js_hide_switch(){
		JS_HIDE=JS_HIDE?false:true;
		if(!JS_HIDE){
			for(var c=0; c < JS_HIDE_STUFF.length;c++){
				jQuery("#trader_inv_div").find('img[alt="' + JS_TRADER_INVENTORY[JS_HIDE_STUFF[c]].obj.name + '"]').parent().show();
			}
			jQuery(".achievement").not(".achievement_achieved").show();
		}
	}).toString();
	
	var f3 = (function js_hide_update_stuff_button(){
		// was soll versteckt werden
		JS_HIDE_STUFF = []
		JS_TRADER_INVENTORY = TraderInventory.getInstance().items;
		var t_inv = JS_TRADER_INVENTORY;
		var t_inv_a = [];
		for (var t_item in t_inv) {
			t_inv_a.push(t_item)
		}
		t_inv_a.sort(function (a, b) {return a - b;});
		var p_inv = PlayerInventory.getInstance().data;
		var count=0;
		for (var p_item in p_inv) {
		//alert(t_inv_a[count] +"<"+ p_inv[p_item].item_id);
			while( t_inv_a[count] < p_inv[p_item].item_id){
				if(count == t_inv_a.length){break;}
				count++;
			}
			if( t_inv_a[count] == p_inv[p_item].item_id){
				//alert(t_inv_a[count] +"="+ p_inv[p_item].item_id);
				JS_HIDE_STUFF.push(t_inv_a[count]);
				count++;
			}
		}
		
		var button = document.createElement('a');
		button.href = "javascript: js_hide_switch();";
		button.id = "JS_HIDE_ACH_BUTTON";
		button.className ="js_hide_button";
		
		var ach = jQuery(".achievements").find(".tw2gui_window_buttons");
		for(var c=0; c < ach.length; c++){
			jQuery(ach[c]).children().last().not(".js_hide_button").after( button.clone() );
		}
		
		button.addClass('js_hide_button_old'); // hier		
		var tailor = jQuery("#window_item_trader").find(".window_borders").children().first().next().not(".js_hide_button"); // add button
		tailor = tailor.add( jQuery("[id^='window_building_tailor_'].window").find(".window_borders").children().first().next().not(".js_hide_button") );
		tailor = tailor.add( jQuery("[id^='window_building_gunsmith_'].window").find(".window_borders").children().first().next().not(".js_hide_button") );
		tailor = tailor.add( jQuery("[id^='window_building_general_'].window").find(".window_borders").children().first().next().not(".js_hide_button") );
		for(var c=0; c < tailor.length; c++){
			jQuery(tailor[c]).after( button.clone() );
		}
	}).toString();
	
	script.text = f1 + f2 + f3;
	document.getElementsByTagName('head')[0].appendChild(script);
	document.getElementsByTagName('head')[0].appendChild(style);
}

location.assign('javascript:var JS_HIDE = '	+ GM_getValue ('JS_HIDE', true) + '; var JS_HIDE_STUFF = [] ; var JS_TRADER_INVENTORY = TraderInventory.getInstance().items; void(0)');
location.assign('javascript:var JS_HIDE_TIMER = window.setInterval( "js_hide()" , 200);var JS_HIDE_STUFF_TIMER = window.setInterval( "js_hide_update_stuff_button()" , 5000);');