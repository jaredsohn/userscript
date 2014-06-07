// ==UserScript==
// @name		  Steam Gallery
// @namespace	  http://userscripts.org/users/130612
// @description   Adds gallery buttons to steam showcases
// @match         http://store.steampowered.com/app/*
// @version       0.2
// ==/UserScript==

(function add_gallery_buttons() {
	var frame = jQuery('#highlight_player_area');
	
	var no_select_css = {
        '-moz-user-select'     : 'none',
        '-khtml-user-select'   : 'none',
        '-webkit-user-select'  : 'none',
        '-o-user-select'       : 'none',
        'user-select'          : 'none'
    };
    
    var go_area_css = {
        position: 'absolute', 
        'z-index': '99999', 
        bottom: '1px',
        'background-color': 'rgba(255, 255, 255, 0.35)', 
        height: '20%', 
        width: '10%', 
        cursor: 'pointer'
    };

    var arrow_css = {
        position: 'relative', 
        top: '45%', 
        'font-size': '600%', 
        color: 'rgba(255, 255, 255, 0.5)', 
        'line-height': '0'
    };
        
    var go_prev_css = jQuery.extend({
        left: 0
    }, go_area_css);
    
    var go_next_css = jQuery.extend({
        right: 0
    }, go_area_css);
	
	var go_prev = jQuery("<div>");
    go_prev.attr('id', 'go-prev').css(go_prev_css);
	go_prev.css(no_select_css);
	
	var go_next = jQuery("<div>");
    go_next.attr('id', 'go-next').css(go_next_css);
    go_next.css(no_select_css);
    
    var arrow = jQuery('<span>');
    arrow.css(arrow_css);
    
    go_prev.append(arrow.clone().html('&#9664;'));
    go_next.append(arrow.clone().html('&#9654;'));
    
    go_prev.click(function(){
        var prev_screenshot = jQuery('.highlight_strip_item.focus').prev('.highlight_strip_screenshot')[0] || jQuery('.highlight_strip_screenshot').last()[0];
        jQuery(prev_screenshot).click();
    });
    
    go_next.click(function(){
        var next_screenshot = jQuery('.highlight_strip_item.focus').next('.highlight_strip_screenshot')[0] || jQuery('.highlight_strip_screenshot').first()[0];
        jQuery(next_screenshot).click();
    });
    
    frame.append(go_prev).append(go_next);
})();