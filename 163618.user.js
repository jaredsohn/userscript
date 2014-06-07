// ==UserScript==
// @name         vnhanced
// @version      2.1.1.1
// @namespace    http://vnhub.net/
// @include      http://www.vnations.net/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js
// @downloadURL  https://raw.githubusercontent.com/zoltansabjan/vNhanced/master/vNhanced.js
// @updateURL    https://raw.githubusercontent.com/zoltansabjan/vNhanced/master/vNhanced.js
// @source       https://github.com/zoltansabjan/vNhanced
// @icon         http://vnhub.net/vnhub/vNhanced/icons/icon_vnlogo.png
// @description  Enhances the look and some functions of the browser game ®Virtual Nations
// @author       Zoltan Sabjan <zoltan.sabjan@gmail.com> http://vnhub.net/
// @copyright    2013+, Zoltan Sabjan
// @run-at document-end
// ==/UserScript==
$(document).ready(modules);

function modules() {
    // pre-init
    event_handlers();

    // initialize
    $('head').append('<link rel="stylesheet" href="http://vnhub.net/vnhub/vNhanced/css/vNhanced.css" type="text/css" />'); // ************** inject vNhanced css to source

    // components    
    common_content();
    navbar();
    sidebar();
    module_events();
    module_weather();
    dashboard_articles();
    dashboard_rankings();
    dashboard_chat();
    dashboard_infrastructure();
}

function event_handlers() {
/*    $('.sidebar_switch').click(function() {
  		accordion_menu();
	});
    $(document).click(function(e) { // monitors for left button click
        if (e.button == 0) {

    	}
	});*/
}

function css_inject() { // unlimited css-objects as arguments, "css_inject('elem { styles; }', 'elem2 { styles; }'" --> ie.: "css_inject('.disable-hover { pointer-events: none; border: none; }')"
    var link = window.document.createElement('link');
	var argument_vault_array = [];
    for (var i = 0; i < arguments.length; i++) {
    	argument_vault_array.push(arguments[i]);
  	}
    var argument_vault = argument_vault_array.join('');
    link.rel = 'stylesheet';
	link.type = 'text/css';
    link.href = 'data:text/css,' + argument_vault + ' !important';
    document.getElementsByTagName("HEAD")[0].appendChild(link);
}

function common_content() {

}

function navbar() {
    $('.navbar').find('.brand').remove();
    $('.navbar').find('.container').prepend('<div id="brand" style="float: left; position: relative; top: -13px;"><a class="brand" href="/dashboard.php" style="top: 9px; font-size: 20px; height: 20px; line-height: 20px; padding: 0px; margin: 0px; width: auto; z-index: 2; position: relative; color: rgb(170, 167, 162); text-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px, rgba(255, 255, 255, 0.05) 1px 2px 0px; z-index: 3;">virtual nations</a><a class="brand ext_disabled" href="http://userscripts.org/scripts/show/163618" target="_blank" style="left: -140px; top: 20px; font-size: 9px; height: 9px; line-height: 9px; padding: 0px; margin: 0px; width: auto; z-index: 2; position: relative; color: rgb(170, 167, 162); text-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px, rgba(255, 255, 255, 0.05) 1px 2px 0px;">vnhanced v' + GM_info.script.version + '</a></div>');
    $('.navbar').find('img[src="http://static.vnations.net/images/icons/exclamation-octagon.png"]').attr('src', 'http://vnhub.net/vnhub/vNhanced/icons/icon_alert.png');
    $('.navbar').find('img[src="http://static.vnations.net/images/icons/target.png"]').attr('src', 'http://vnhub.net/vnhub/vNhanced/icons/icon_battle.png');
    $('.navbar').find('img[src="http://static.vnations.net/images/icons/sport.png"]').attr('src', 'http://vnhub.net/vnhub/vNhanced/icons/icon_sports.png');
    $('.navbar').find('.nb_boxes').find('a').each(function () { // append a div for the notification number if needed
        if ($(this).text() != 0) {
            $(this).append('<div class="notification_number" style="display: table-cell; padding: 0px 1px; border-radius: 4px 0px 4px 0px; box-shadow: rgba(255, 255, 255, 0.25) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 1px 1px 0px 0px, rgba(0, 0, 0, 0.25) 0px -7px 0px 0px inset; height: 12px; position: relative; top: -17px; left: 24px; background: -webkit-radial-gradient(3px 3px, circle, #B34D4D, #FF9045);"><p style="margin: 0px 2px 0px 2px; line-height: 12px; text-shadow: rgba(0, 0, 0, 0.5) 1px 1px 1px; color: rgb(255, 251, 244);">' + $(this).text() + '</p></div>');
        }
    });
    $('.navbar').find('.nb_boxes').find('a').contents().each(function () {
        if (this.nodeType === 3) {
            this.parentNode.removeChild(this);
        }
    });
}

function sidebar() {
    var sidebar = $('.sidebar');
    var sidebar_inner = $('.sidebar_inner');
    var sidebar_info =$('.sidebar_info');
    var accordion_container = $('#side_accordion');
    var accordion_panel = accordion_container.find('.panel');
    var accordion_panel_heading = accordion_container.find('.panel-heading');
    var accordion_panel_body = accordion_container.find('.panel-body');
    var accordion_hyperlinks = accordion_panel_body.find('a');
    var accordion_search = sidebar.find('#citsearch');
    var accordion_switch_on = $('.on_switch');
    var accordion_switch_off = $('.off_switch');
    
    sidebar.css({
        'background-color': 'transparent',
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_medium_grey.png)',
        'border': 'none',
        'overflow': 'hidden',
		'min-height': '800px',
        '-webkit-box-shadow': 'none',
        '-moz-box-shadow': 'none',
        'box-shadow': 'none'
    });
    sidebar_inner.css({
		'margin-top': '20px',
		'margin-left': '10px',
        'min-height': 'inherit'
    });
    accordion_container.css({
        'border': 'none',
		'margin-top': '5px',
		'margin-left': '-20px'
    });
    accordion_panel.css({
        'background-color': 'transparent',
        'border': 'none',
        'box-shadow': 'none'
    });
    accordion_panel_heading.css({
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_medium_grey.png)',
        'box-shadow': 'none',
        'text-shadow': 'rgba(255,255,255,0.1) 1px 1px 0px',
		'font-weight': 'bold',
		'font-size': '15px'
    });
    accordion_panel_body.css({
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)',
        'border': 'none',
        'margin-left': '20px',
        'margin-right': '30px',
        'border-radius': '5px',
        '-webkit-box-shadow': 'rgba(255, 255, 255, 0.23) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.3) 0px 0px 2px 2px inset',
        '-moz-box-shadow': 'rgba(255, 255, 255, 0.23) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.3) 0px 0px 2px 2px inset',
        'box-shadow': 'rgba(255, 255, 255, 0.23) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.3) 0px 0px 2px 2px inset'
    });
    accordion_hyperlinks.css({
        'color': 'rgb(126, 125, 123)',
        'text-shadow': 'rgba(0, 0, 0, 0.2) 1px 1px 0px'
    });
    sidebar_info.css({
        'left': '0px'
    });
    sidebar_info.find('li, ul').css({
        'background-color': 'transparent',
        'border': 'none'
    });
    accordion_search.children('.input-group-btn').remove();
    accordion_search.css({
    	'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)',
        'padding': '0px',
		'display': 'table-row-group'
    });
    accordion_search.children('input').css({
        'background-color': 'transparent',
        'border': 'none',
        '-webkit-box-shadow': 'rgba(255, 255, 255, 0.22) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.2) 0px 0px 2px 2px inset',
        '-moz-box-shadow': 'rgba(255, 255, 255, 0.22) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.2) 0px 0px 2px 2px inset',
        'box-shadow': 'rgba(255, 255, 255, 0.22) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.2) 0px 0px 2px 2px inset'
    });
    accordion_switch_on.css({
        'background': '#222 url("http://vnhub.net/vnhub/vNhanced/icons/icon_switch_on_sidebar.png")',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-color': 'transparent',
        'width': '24px',
        'height': '11px'
    });
    accordion_switch_off.css({
        'background': '#222 url("http://vnhub.net/vnhub/vNhanced/icons/icon_switch_off_sidebar.png")',
        'background-size': 'contain',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        'background-color': 'transparent',
        'width': '24px',
        'height': '11px'
    });
}

function module_weather() {
    var weather_container = $('a[href*="/nation/region.php?id="]').closest('.col-sm-6');
    var weather_panel = weather_container.find('.panel:first');
    var weather_panel_heading = weather_container.find('.panel-heading:first');
    var weather_panel_body = weather_container.find('.panel-body:first');
    var weather_panel_footer = weather_container.find('.panel-footer:first');
    
    weather_panel.css({
        'margin-top': '3px',
        'background-color': 'transparent',
        'border': 'none',
        '-webkit-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px',
        '-moz-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px',
        'box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px'
    });
    weather_panel_heading.css({
        'background-color': 'transparent',
        'border': 'none'
    });
    weather_panel_heading.find('a').css({
        'color': 'rgb(163, 155, 55)'
    });
    weather_panel_footer.css({
        'background-color': 'transparent',
        'border': 'none'
    });    
}

function module_events() {
    css_inject('.event_green { background-color: rgba(66, 255, 6, 0.02); }');
    css_inject('.event_red { background-color: rgba(255, 6, 6, 0.02) }');
    
    var events_container = $('.panel-heading:contains("Events")').closest('.col-sm-6');
    var events_panel = events_container.find('.panel:first').addClass('events_layer_container');
    var events_info = events_container.find('i');
    var events_content = events_container.find('font');
    var events_details = events_container.find('a');
    var events_panel_heading = events_container.find('.panel-heading:first');
    var events_panel_body = events_container.find('.panel-body:first');
    
    events_panel.find('div').wrapAll('<div class="events_layer_border"/>').wrapAll('<div class="events_layer_body"/>');
    var events_layer_border = events_container.find('.events_layer_border');
    var events_layer_body = events_container.find('.events_layer_body');
    events_layer_border.after('<div class="events_layer_cover"/>');
    var events_layer_cover = events_container.find('.events_layer_cover');
    events_info.each(function(){
        $(this).nextUntil("br").addBack().wrapAll("<div class='event_item'/>");
        if($(this).next('font').css('color') == 'rgb(255, 0, 0)'){
            $(this).next('font').css('color', 'rgb(221, 91, 91)');
            $(this).parent().addClass('event_red');
        }else if($(this).next('font').css('color') == 'rgb(0, 128, 0)'){
			$(this).next('font').css('color', 'rgb(131, 163, 48)');
            $(this).parent().addClass('event_green');
        }
    });
	var string = events_panel_body.justtext().split("\n");
    var events_item = events_container.find('.event_item');
    //events_item.after('<div class="event_item_cover"/>');
    var events_item_cover = events_container.find('.event_item_cover');
	events_container.find('br').remove();
    events_panel_heading.remove();
    var $draggableElems = events_panel_body.children('div').draggable({
        axis: 'y',
        drag: function (e, ui) {
        	var elemPos = $(value).position();
			initLeftOffset[key] = elemPos.left - pos.left;
            initTopOffset[key] = elemPos.top - pos.top;
        }
    });
    events_content.css({
        'margin': '0px 5px',
        'text-shadow': 'inherit'
    });
    events_details.css({
        'font-family': 'inherit',
        'font-size': 'inherit'
    });
    events_panel.find('.events_layer_border').css({
    	'padding': '7px',
        'box-shadow': 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px, rgba(0, 0, 0, 0.7) 0px 0px 1px 1px, rgba(0, 0, 0, 0.4) 0px 0px 2px 1px inset',
        'border-radius': '6px',
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)'
    });
    events_layer_body.css({
        'padding': '4px',
        'height': '166px',
        'box-shadow': 'rgba(255, 255, 255, 0.14) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.6) 0px 0px 0px 3px inset, rgba(255, 255, 255, 0.08) 0px 0px 0px 4px inset',
        'border-radius': '6px',
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)'
    });    
    events_panel.css({
        'padding': '5px',
        'border': 'none',
        'border-radius': '10px',
        'background-color': 'transparent',
        'background': 'repeating-linear-gradient(45deg, rgba(255, 153, 0, 0.15), rgba(255, 184, 0, 0.15) 10px, rgba(0, 0, 0, 0.15) 10px, rgba(0, 0, 0, 0.15) 20px)',
        '-webkit-box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.8) 0px 0px 0px 1px, rgba(255, 255, 255, 0.09) 0px 0px 0px 2px, rgba(0, 0, 0, 0.2) 0px 0px 0px 7px inset',
        '-moz-box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.8) 0px 0px 0px 1px, rgba(255, 255, 255, 0.09) 0px 0px 0px 2px, rgba(0, 0, 0, 0.2) 0px 0px 0px 7px inset',
        'box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.8) 0px 0px 0px 1px, rgba(255, 255, 255, 0.09) 0px 0px 0px 2px, rgba(0, 0, 0, 0.2) 0px 0px 0px 7px inset',
    });
    events_panel_body.css({
    	'margin-right': '5px',
        'padding': '0px',
        'height': '158px',
    });
    events_item.css({
        'height': '40px',
        'line-height': '40px',
        'margin': '0px 0px 1px 0px',
        'font-size': '12px',
        'border-radius': '3px',
        'text-shadow': 'rgba(0, 0, 0, 0.4) -1px -1px 0px, rgba(255, 153, 0, 0.3) 0px 0px 24px',
        'box-shadow': 'rgba(0, 0, 0, 0.7) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.08) 0px 0px 0px 2px inset'
    });
    events_item_cover.css({
        'pointer-events': 'none',
        'height': '40px',
        'line-height': '40px',
        'border-radius': '3px'
    });
    events_layer_cover.css({
        'pointer-events': 'none',
        'position': 'relative',
		'height': '176px',
        'margin': '2px 2px -178px',
		'top': '-180px',
		'border-radius': '4px',
		'background': 'rgba(255, 255, 255, 0.05)',
        'box-shadow': 'rgba(255, 251, 163, 0.1) 0px 0px 0px 1px inset, rgba(255, 252, 171, 0.1) 0px 0px 10px 1px inset'
    });
}

function dashboard_articles() {
	css_inject('.nav-tabs>li.active>a { color: rgb(163, 155, 55); text-shadow: rgba(0, 0, 0, 0.2) 1px 1px 0px 0px }');
    css_inject('.nav-tabs>li>a { color: rgb(126, 125, 123); text-shadow: rgba(0, 0, 0, 0.2) 1px 1px 0px 0px }');
    css_inject('.nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus { color: rgb(201, 191, 71); text-shadow: rgba(0, 0, 0, 0.2) 1px 1px 0px 0px }');
    
    var container = $('a:contains("Popular Articles")').closest('.col-sm-6');
    var panel = container.find('.panel:first');
    var panel_body = container.find('.panel-body:first');
    var navtabs = container.find('ul:first');
    var pane_1 = container.find('#news-1');
    var pane_2 = container.find('#news-2');
    var pane_3 = container.find('#news-3');
    var pane_3_panel = container.find('.w-box');
    var pane_3_panel_heading = container.find('.w-box-header');
    var pane_3_panel_body = container.find('.w-box-content');
    
    navtabs.css({
        'border': 'none'
    });
    panel.css({
        'background-color': 'transparent',
        'border': 'none',
        '-webkit-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px',
        '-moz-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px',
        'box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px'
    });
    panel_body.find('ul a').css({
        'background-color': 'transparent',
        'border': 'none'
    });
    pane_2.find('div:first').css({
        'overflow-x': 'hidden',
        'margin-bottom': '20px',
		'-webkit-box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
        '-moz-box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
        'box-shadow': 'rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px'
    });
    pane_1.find('div').wrapAll('<div id="wrap" style="height: 600px; overflow-y: scroll; overflow-x: hidden; margin-bottom: 20px; box-shadow: rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px;"/>');
    pane_1.find('.well').css({
        'border': 'none',
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_medium_grey.png)',
        '-webkit-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
        '-moz-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
        'box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
		'margin': '10px'
    });
    /*pane_1.children('p').css({
        'margin-bottom': '-5px'
    });*/
    pane_3_panel.css({
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_medium_grey.png)',
        '-webkit-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
        '-moz-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
        'box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px',
		'margin': '10px 10px -20px 10px'
    });
    pane_3_panel_heading.css({
        'background-image': 'none',
        'border': 'none'
    });
    pane_3_panel_body.css({
        'border': 'none'
    });
    pane_3.find('div:first').css({
        'overflow-x': 'hidden',
        'margin-bottom': '20px',
        'box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.5) 0px 0px 0px 1px'
    });
}

function dashboard_rankings() {
    $('.panel-heading:contains("Top Prestige"), .panel-heading:contains("Top Infantry Last Week")').closest('.row').wrapAll('<div class="container_rankings"/>');
    var container = $('.container_rankings');
    var row = container.find('.row');
    var container_panel = container.find('.col-sm-3');
    var panel = container.find('.panel');
    var panel_heading = container.find('.panel-heading');
    var panel_body = container.find('.panel-body');
    
    container.css({
        'background-color': 'transparent',
        'border': 'none',
        'border-radius': '5px',
        'padding': '10px',
        '-webkit-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px',
        '-moz-box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px',
        'box-shadow': 'inset rgba(255, 255, 255, 0.1) 0px 1px 0px 0px, inset rgba(255, 255, 255, 0.06) 0px 0px 0px 1px, rgba(0, 0, 0, 0.6) 0px 0px 4px 1px, rgba(0, 0, 0, 0.6) 0px 0px 0px 4px, rgba(255, 255, 255, 0.1) 0px 1px 0px 4px, rgba(255, 255, 255, 0.06) 0px 0px 0px 5px'
    });
    row.css({
        'margin': '0px'
    });
    container_panel.css({
        'padding': '10px'
    });
    panel.css({
        'margin': '0px',
        'background-color': 'transparent',
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)',
        'border': 'none',
        '-webkit-box-shadow': 'rgba(255, 255, 255, 0.07) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 1px 2px 0px, inset rgba(0, 0, 0, 0.15) 0px 0px 1px 1px',
        '-moz-box-shadow': 'rgba(255, 255, 255, 0.07) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 1px 2px 0px, inset rgba(0, 0, 0, 0.15) 0px 0px 1px 1px',
        'box-shadow': 'rgba(255, 255, 255, 0.07) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 1px 2px 0px, inset rgba(0, 0, 0, 0.15) 0px 0px 1px 1px'
    });
    panel_heading.css({
        'background-color': 'transparent',
        'border': 'none',
        'color': 'rgb(163, 155, 55)'
    });
}

function dashboard_chat() {
    css_inject('.chat_box .chat_msg .chat_msg_body { border: none; }');
    css_inject('.chat_box .chat_msg .chat_msg_body { background-image: url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_medium_grey.png); }');
    css_inject('.chat_box .chat_msg .chat_msg_body { border-radius: 3px; }');
    css_inject('.chat_box .chat_msg .chat_msg_body { -webkit-box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px; }');
    css_inject('.chat_box .chat_msg .chat_msg_body { -moz-box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px; }');
    css_inject('.chat_box .chat_msg .chat_msg_body { box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px; }');
    css_inject('input[name="chatmsg"] { color: rgb(243, 148, 22); border: none; border-radius: 1px; background: none; padding-left: 5px; box-shadow: rgba(255, 255, 255, 0.03) 0px 0px 0px 1px, rgba(255, 255, 255, 0.08) 0px 1px 1px 0px, rgba(0, 0, 0, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.13) 0px 0px 0px 10px inset; }');
    css_inject('div.gradbox_sectionheader { border: none; font-size: 11px; padding: 0 5px; background-color: transparent; margin: 0px 5px; }');
    css_inject('.vnboxdel { margin: 0px 5px; border: none; border-radius: 3px; background-image: url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_medium_cherry.png); -webkit-box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px; -moz-box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px; box-shadow: rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.1) 0px 1px 0px 0px inset, rgba(0, 0, 0, 0.3) 0px 0px 0px 1px; }');
    
    var container = $('#chat').parent();
    var panel = container.find('.w-box');
    var panel_heading = container.find('.w-box-header');
    var panel_body = container.find('.w-box-content');
    var panel_chat_message = container.find('.chat_msg');
    var panel_chat_message_heading = container.find('.chat_msg_heading');
    var panel_chat_message_body = container.find('.chat_msg_body');
    
    container.css({
        'background-color': 'transparent',
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)',
        'padding': '10px',
        'border-radius': '5px',
        '-webkit-box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.15) 0px 0px 1px 1px inset',
        '-moz-box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.15) 0px 0px 1px 1px inset',
        'box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px, rgba(255, 255, 255, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.15) 0px 0px 1px 1px inset'
    });
    panel.css({
        'border': 'none',
        '-webkit-box-shadow': 'none',
        '-moz-box-shadow': 'none',
        'box-shadow': 'none'
    });
    panel_heading.css({
        'background-image': 'url(http://vnhub.net/vnhub/vNhanced/images/background_tiled_dark_grey.png)',
        'border': 'none',
        'color': 'rgb(163, 155, 55)'
    });
    panel_body.css({
        'border': 'none'
    });
}

function dashboard_infrastructure() {
    var container = $('div:contains("Infrastructure")').closest('.col-sm-12');
    var img_holder = container.find('.text-center');
    var label = container.find('span');
    
    img_holder.find('img').each(function() {
        $(this).closest('.text-center').css({
            'background-image': 'url(' + $(this).attr('src') + ')',
            'background-size': $(this).attr('width') + 'px'
        });
        $(this).closest('.text-center').attr('oldtitle', $(this).attr('title'));
	});
    img_holder.find('img').remove();
    img_holder.css({
        'height': '75px',
		'width': '75px',
		'border-radius': '4px',
        'background-repeat': 'no-repeat',
        'margin': '5px',
        'padding-top': '75px',
        'overflow': 'hidden',
		'box-shadow': 'rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset, rgba(255, 255, 255, 0.15) 0px 0px 4px 2px inset, rgba(0, 0, 0, 0.8) 0px 0px 0px 1px, rgba(255, 255, 255, 0.08) 0px 0px 0px 4px ,rgba(0, 0, 0, 0.75) 0px 0px 0px 3px'
    });
    label.css({
        'width': '75px',
        'float': 'left',
        'font-size': '10px',
        'border-radius': '0px',
        'background': 'rgba(0, 0, 0, 0.8)',
        'white-space': 'normal'
    });
    img_holder.hover(
  		function() {
    		$(this).css('padding-top', 75 - $(this).find('.label').outerHeight() + 'px');
  		}, function() {
    		$(this).css('padding-top', '75px');
  		}
	);
}
jQuery.fn.justtext = function() {
    return $(this)  .clone()
            .children()
            .remove()
            .end()
            .text();
};