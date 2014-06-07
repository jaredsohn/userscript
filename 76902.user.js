scr_meta=<><![CDATA[
// ==UserScript==
// @name           Report Iframe
// @namespace      http://userscripts.org/
// @description    See external report in the IGM window
// @version        0.2.9
// @include        http://s*.travian.*/nachrichten.php?*
// @include        http://www.travian.org/nachrichten.php?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==
]]></>.toString();


css = 
"#reportframe { background-color: white; -moz-border-radius: 5px; -moz-box-shadow: 0 0 5px 5px black; position: fixed; top: 0; left: 5%; display: none; z-index: 9999999; }" + 
"#reportbackground { opacity: 0.7; position: fixed; top: 0px; left: 0%; z-index: 9999997; display: none; background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAAz0lEQVRYhcXWQQoEIQwEwNY3hPgv%2FadfdC%2BCq%2BPujI62OQg5SNHQhxjvPWYnxigiqvr9NqtzrvvXHlFDCJPwSxVzid%2BrM%2FASdRhepY7BC9UBeK36FF6uPoJ3qPfwJvUG3qf%2Bg7eqP%2BHdah8mqB2Yo7YwTa1gplpgspphvgrAAOCrAMwRNcZoj6giYo%2BoqmqPqCUxWc2J%2BaqItOXiqKpqj6hVuZhqKRdZzYn5qoiYlBJfVdX%2BzbVbdc51YIKK683FUVuYplYwUy0wWc0wXwXwAfyl8Pg4LSOEAAAAAElFTkSuQmCC) repeat scroll 0 0 transparent; }" +
"#reporttip { z-index: 9999999; color: #00C000; text-decoration: underline; font-weight:bold; display: none; position: absolute; border: 2px solid #333; background-color: #ffed8a; padding: 4px 6px; cursor: pointer; }";


$(function () {
	AnotherAutoUpdater.check();
	GM_addStyle(css);
	$('<div id="reportbackground"></div><iframe id="reportframe" width="90%" height="100%"></iframe><div id="reporttip">Open link</div>')
		.appendTo('body');
});

$('.message').mouseup(function (e) {
	var selectedLink = window.getSelection().toString();
	var coordenatesRegex = /^\(?\s?-?([1-9]|[1-9]\d|[123]\d{2}|40{2})\s?[\/\\|]\s?-?([1-9]|[1-9]\d|[123]\d{2}|40{2})\s?\)?$/;
	var httpRegex = /^http:\/\/.*$/i;
	var $reporttip = $('#reporttip');
	var $reportframe = $('#reportframe');
	var largura = $(document).width();
	var altura = $(document).height();
	if (selectedLink.match(httpRegex)) {
		$reporttip
			.css('textDecoration', 'underline')
			.text('Open link')
			.css('top', (e.pageY + 15) + 'px')
			.css('left', (e.pageX - 35) + 'px')
			.fadeIn('fast');
		setTimeout(function () {
			$(document).bind('click.report',function (e) {
				if ($(e.target).is('#reporttip')) { 
					$reporttip.css('textDecoration', 'none').text('Loading...');
					$('body').css('cursor','pointer');
					$('#reportbackground').css('width', largura).css('height', altura).show();
					$reportframe.attr('src', selectedLink);
					$reporttip.hide();
					$reportframe.slideDown('fast');
				} else {
					$('body').css('cursor','');
					$reportframe.fadeOut('fast');
					$('#reportbackground').hide();
					$(document).unbind('click.report');
					$reporttip.fadeOut('fast');
					$reportframe.attr('src', '');				
				}
			});
		}, 500);
	} else if (selectedLink.match(coordenatesRegex)) {
		var  coordsXYToZ = function (x, y) {
			x = parseInt(x);
			y = parseInt(y);
			var coordZ = (x + 401) + ((400 - y) * 801);
			return coordZ;
		}
		var finalZ = coordsXYToZ(RegExp.$1, RegExp.$2);
		var villageUrlRegex = new RegExp('(karte\\.php\\?d='+finalZ+'.*?)"');
		$.get('http://speed.travian.pt/karte.php?z=' + finalZ, function (response) {
			$reporttip
				.css('textDecoration', 'underline')
				.text('View Village');
			setTimeout(function () {
				$(document).bind('click.report',function (e) {
					if ($(e.target).is('#reporttip')) { 
						$reporttip.css('textDecoration', 'none').text('Loading...');
						$('body').css('cursor','pointer');
						$('#reportbackground').css('width', largura).css('height', altura).show();
						$reportframe.
							attr('src', window.location.protocol + '//' + window.location.hostname + '/' + response.match(villageUrlRegex)[1]);
						$reporttip.hide();
						$reportframe.slideDown('fast');
					} else {
						$('body').css('cursor','');
						$reportframe.fadeOut('fast');
						$('#reportbackground').hide();
						$(document).unbind('click.report').unbind('mouseenter.report');
						$reporttip.fadeOut('fast');		
						$reportframe.attr('src', '');
					}
				});			
			}, 500);
		});
		$reporttip
			.css('textDecoration', 'none').text('Loading...')
			.css('top', (e.pageY + 15) + 'px')
			.css('left', (e.pageX - 35) + 'px')
			.fadeIn('fast');
	}	
});

var AnotherAutoUpdater = { // update script by sizzlemctwizzle THANKS! http://userscripts.org/scripts/show/38017
 
	id: '76902', 
	days: 5, 
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function(response) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
			onload: function(xpr) {AnotherAutoUpdater.compare(xpr,response);}
		});
	},
	compare: function(xpr,response) {
		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ) {
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
			GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
			GM_setValue('updated_'+this.id, this.time+'');
			top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
		} else if ( (this.xversion) && (+this.xversion > +this.version) ) {
			if(confirm('Do you want to turn off auto updating for this script?')) {
				GM_setValue('updated_'+this.id, 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); AnotherAutoUpdater.call(true);});
				alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
			} else {
				GM_setValue('updated_'+this.id, this.time+'');
			}
		} else {
			if(response) alert('No updates available for '+this.name);
			GM_setValue('updated_'+this.id, this.time+'');
		}
	},
	check: function() {
		if (GM_getValue('updated_'+this.id, 0) == "off")
			GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
		else {
			if (+this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)) {
			GM_setValue('updated_'+this.id, this.time+'');
			this.call();
		}
		GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');AnotherAutoUpdater.call(true)});
		}
	}
};




