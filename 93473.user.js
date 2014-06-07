// ==UserScript==
// @name           MAL Covers 3
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// @description    Adds a cover image for each anime in your anime list.
// @version        3.2
// ==/UserScript==

(function() {
	
function main() {

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/* jQuery Sonar */
(function(g,m,l,o){g.fn.sonar=function(a,b){"boolean"===typeof a&&(b=a,a=o);return g.sonar(this[0],a,b)};var k=l.body,r=g(m),j=function(a,b,f){if(a){k||(k=l.body);var c=a,d=0,e=k.offsetHeight,g=m.innerHeight||l.documentElement.clientHeight||k.clientHeight||0,h=l.documentElement.scrollTop||m.pageYOffset||k.scrollTop||0,j=a.offsetHeight||0;if(!a.sonarElemTop||a.sonarBodyHeight!==e){if(c.offsetParent){do d+=c.offsetTop;while(c=c.offsetParent)}a.sonarElemTop=d;a.sonarBodyHeight=e}b=b===o?0:b;return!(a.sonarElemTop+
(f?0:j)<h-b)&&!(a.sonarElemTop+(f?j:0)>h+g+b)}},h={},p=0,n,s=function(){n&&clearTimeout(n);n=setTimeout(function(){var a,b,f,c,d,e,i;for(f in h){b=h[f];for(e=0,i=b.length;e<i;e++)if(c=b[e],a=c.elem,d=j(a,c.px,c.full),"scrollout"===f?!d:d){if(!c.tr)a["_"+f]?(g(a).trigger(f),c.tr=1):(b.splice(e,1),e--,i--)}else c.tr=0}},0)},q=function(a,b){var f=b.px,c=b.full,d=b.evt,e=j(a,f,c),i=0;a["_"+d]=1;if("scrollout"===d?!e:e)setTimeout(function(){g(a).trigger("scrollout"===d?"scrollout":"scrollin")},0),i=1;
h[d].push({elem:a,px:f,full:c,tr:i});p||(r.bind("scroll",s),p=1)};g.sonar=j;h.scrollin=[];g.event.special.scrollin={add:function(a){a=a.data||{};this.scrollin||q(this,{px:a.distance,full:a.full,evt:"scrollin"})},remove:function(){this._scrollin=0}};h.scrollout=[];g.event.special.scrollout={add:function(a){a=a.data||{};this.scrollout||q(this,{px:a.distance,full:a.full,evt:"scrollout"})},remove:function(){this._scrollout=0}}})(jQuery,window,document);

/* MAL 3 */
var mal3 = {};

mal3.version = 2;

mal3.config = {
	defaults: {
		mode: 'classic'
	},
	request_url: 'http://mal3.alex7kom.me',
	dummy_covers: {
		nya: 'http://mal3static.alex7kom.me/nya.png',
		cnf: 'http://mal3static.alex7kom.me/cnf.png'
	}
};

mal3.your_anime = {};

mal3.warnings = {};

mal3.trim = function(str) {
	if (!String.prototype.trim) {
		return str.replace(/^\s+|\s+$/g, '');
	} else {
		return str.trim();
	}
};

mal3.setCookie = function(name, value) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 365);
	var expires = exdate.toGMTString();
	document.cookie = name + "=" + escape(value) + "; expires=" + expires + "; path=/";
};

mal3.getCookie = function(name) {
	var cookies = {};
	var rawCookies = document.cookie.split(';');
	var cookie;
	for (var i = 0; i < rawCookies.length; i++) {
		cookie = rawCookies[i].split('=');
		cookies[mal3.trim(cookie[0])] = mal3.trim(cookie[1]);
	}
	return cookies;
};

mal3.lazyLoadImage = function(img) {
	var $img = jQuery(img),
		src = $img.attr('data-lazy-src');

	$img.unbind('scrollin') // remove event binding
		.hide()
		.removeAttr('data-lazy-src')
		.attr('data-lazy-loaded', 'true');

	img.src = src;
	$img.fadeIn('slow');
};

mal3.toggleMode = function(e){
	$('.mal3_action_link').removeClass('mal3_current');
	if(e.target.id == 'mal3_enable_classic' && mal3.mode != 'classic') {
		$('#mal3_enable_classic').addClass('mal3_current');
		mal3.setCookie('mode','classic');
	} else if (e.target.id == 'mal3_enable_decat' && mal3.mode != 'decat') {
		$('#mal3_enable_decat').addClass('mal3_current');
		mal3.setCookie('mode','decat');
	}
	$('#mal3_message').html('Reload page to see the changes.');
	return false;
};

mal3.placeCopyright = function() {
	$('#copyright').append('<br /><a href="https://alex7kom.me/myanimelist-s-oblozhkami-v-3/">MAL Covers 3 UserScript (v.3.'+ mal3.version +')</a> by Alex7Kom. Mode: <a href="#" id="mal3_enable_classic" class="mal3_action_link">Standard</a> | <a href="#" id="mal3_enable_decat" class="mal3_action_link">Description</a><br><span id="mal3_message" class="mal3_message"></span>');
};

mal3.showMessage = function(message) {
	$('#mal3_message').html(message);
};

mal3.showWarning = function(message, id) {
	if (!mal3.warnings[id]) {
		$('<div class="mal3warning">' + message + '</div>').prependTo('#list_surround');
		mal3.warnings[id] = true;
	}
};

mal3.zoom = function() {
	var cover_src = $(this).attr('src');
	var cover_id = $(this).attr('data-id');
	if(cover_src != mal3.config.dummy_covers.nya && cover_src != mal3.config.dummy_covers.cnf){
		var cover_pos = $(this).offset();
		var bbottom = $(document).height() - (cover_pos.top + $(this).height());
		var under_height = bbottom - ($(document).height() - ($(document).scrollTop() + $(window).height()));
		var above_height = $(document).scrollTop() - cover_pos.top;

		var cover_elem = $('#cover' + cover_id).length > 0 ? $('#cover' + cover_id) : $('<img class="mal3zoomed" id="cover' + cover_id + '" data-id="' + cover_id + '" src="' + cover_src + '" />');

		$(cover_elem).attr('style', 'top: ' + cover_pos.top + 'px; left: ' + cover_pos.left + 'px;');

		if(under_height > 200){
			$(cover_elem)
				.appendTo('body')
				.bind('mouseover', function(){
					mal3.zoomImage(this, under_height, above_height);
				})
				.bind('mouseleave', function(){
					mal3.unZoomImage(this, cover_pos.top);
				})
				.click(function(){
					mal3.openLink(cover_id);
				});
		} else {
			$(cover_elem)
				.appendTo('body')
				.bind('mouseover', function(){
					mal3.zoomImage(this, under_height, above_height, cover_pos.top + 5 - $(this).height()*1.25);
				})
				.bind('mouseleave', function(){
					mal3.unZoomImage(this, cover_pos.top);
				})
				.click(function(){
					mal3.openLink(cover_id);
				});
		}
	}
};

mal3.zoomImage = function(elem, under_height, above_height, top) {
	var params = {width: '225'};
	if(top){
		params.top = top;
	}
	$(elem).animate(params, 300);
	if(under_height < 0){
		$.scrollTo($(document).scrollTop() - under_height-20, 300);
	} else if(above_height > 0){
		$.scrollTo($(document).scrollTop() - above_height, 300);
	}
};

mal3.unZoomImage = function(elem, top){
	var params = {width: '100'};
	if(top){
		params.top = top;
	}
	$(elem).animate(params, 300, function(){
		$(elem).remove();
	});
};

mal3.openLink = function(id){
	window.open('http://myanimelist.net/' + (mal3.type == 'a' ? 'anime' : 'manga') + '/' + id + '/','_blank');
	window.focus();
};

mal3.bindZoom = function(){
	$('img.mal3img').unbind('mouseenter');
	$('img.mal3img').bind('mouseenter', mal3.zoom);
};

mal3.expandInfo = function(event){
	var series_id = $(event.target).attr("anime-id");
	var colorType = $(event.target).attr("color-type");
	if ($('#more'+series_id).css('display') == 'block') {
		$('#more'+series_id).hide();
		return false;
	}
	
	var memberId = $('#listUserId').val();
	
	$.post("/includes/ajax-no-auth.inc.php?t=6", {color:colorType,id:series_id,memId:memberId,type:$('#listType').val()}, function(data) {
		$('#more'+series_id).html(data.html);
		if(mal3.your_anime[series_id] !== undefined){
			$('#more' + series_id + ' td div:first').before('<img src="' + mal3.your_anime[series_id] + '" class="mal3decat" />');
		}
		$('#more'+series_id).show();
	}, "json");
};

mal3.requestCovers = function(z, url_params) {
	var url = mal3.config.request_url + '/r/' + mal3.version + '/' + mal3.type + '/' + url_params[z].join(';;') + '/';

	$.ajax({
		type: 'GET',
		url: url,
		async: false,
		jsonpCallback: 'jsonCallback' + z,
		contentType: "application/json",
		dataType: 'jsonp',
		success: function(json) {
			if(json.data !== undefined){
				if(mal3.mode == 'classic'){
					jQuery.each(json.data, function(index, value) {
						$("#"+index+" > tr > td > img.mal3img")
							.attr('data-lazy-src',value)
							.attr('data-id',index)
							.bind('scrollin',{ distance: 100 }, function(){
								mal3.lazyLoadImage(this);
							});
					});

					mal3.bindZoom();
				} else if(mal3.mode == 'decat') {
					$.extend(mal3.your_anime, json.data);
				}
			}
		}
	});
};

mal3.animepatt = /\/animelist\//i;
mal3.url_patt = /\/(?:manga|anime)\/(\d+)\//i;

if(mal3.animepatt.exec(location.href)){
	mal3.type = 'a';
} else {
	mal3.type = 'm';
}

mal3.mode = mal3.getCookie()['mode'];
if(mal3.mode != 'classic' && mal3.mode != 'decat'){
	mal3.mode = mal3.config.defaults.mode;
}

mal3.setCookie('mode', mal3.mode);

$(document).ready(function(){
	mal3.placeCopyright();
	
	$('#mal3_enable_classic, #mal3_enable_decat').click(mal3.toggleMode);

	if(mal3.mode == 'classic'){
		$('#mal3_enable_classic').addClass('mal3_current');
	} else if(mal3.mode == 'decat'){
		$('#mal3_enable_decat').addClass('mal3_current');
	}

	var list = $("a.animetitle");

	var get_object = {};

	for (var i = 0; i < list.length; i++) {
		var id_afterexec = mal3.url_patt.exec($(list[i]).attr("href"));
		get_object[id_afterexec[1]] = $(list[i]).find("span").html();
		$(list[i]).parent().parent().parent().attr("id",id_afterexec[1]);
		if(mal3.mode == 'classic'){
			$("#"+id_afterexec[1]).find("a.animetitle").parent().before('<td class="mal3td ' + $("#"+id_afterexec[1]+" > tr > td:first").attr('class') + '"><img src="' + mal3.config.dummy_covers.nya + '" class="mal3img" /></td>');
		} else if(mal3.mode == 'decat'){
			var derp = String($('#' + id_afterexec[1] + ' a[title="View More Information"]').attr('onclick'));
			$('#' + id_afterexec[1] + ' a[title="View More Information"]').removeAttr('onclick').click(mal3.expandInfo);
			$('#' + id_afterexec[1] + ' a[title="View More Information"]').attr("anime-id",id_afterexec[1]).attr("color-type",derp.substring(derp.length-5,derp.length-4));
		}
	}

	var url_params = [];

	var w = 0;
	for (var key in get_object) {
		if (get_object.hasOwnProperty(key)) {
			var n = Math.floor(w/150);
			if(typeof url_params[n] == "undefined"){
				url_params[n] = [];
			}
			url_params[n].push(key + ',,'+encodeURIComponent(get_object[key]));
			w++;
		}
	}

	for (var z = 0; z < url_params.length; z++) {
		mal3.requestCovers(z, url_params);
	}

});

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

var style = document.createElement('style');
style.innerHTML = '.mal3_action_link { text-decoration: none; border-bottom: 1px dashed; } .mal3_current { border: 0; } .mal3_message { color: Red; } .mal3img { width: 100%; height: auto; } .mal3td { width: 100px; height: 150px; } .mal3decat { float: right; margin: 15px; } .mal3zoomed { cursor: hand; cursor: pointer; position: absolute; width: 100px; height: auto; } .mal3warning { margin: 10px; padding: 10px; text-align: center; background: #fff; border: 2px solid #fae3e3;  color: #000; } .mal3warning a { text-decoration: underline; }';
(document.body || document.head || document.documentElement).appendChild(style);

})();