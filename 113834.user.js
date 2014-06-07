// ==UserScript==
// @name           Betaseries.com - recherche torrents
// @description    Recherche un épisode rapidement sur des sites de torrents
// @namespace      http://userscripts.org/users/44573
// @match          http://www.betaseries.com/*
// @match          https://www.betaseries.com/*
// @version        2.2.0
// ==/UserScript==

function main() {

/**
* jQuery PostBlank Plugin 1.0.0
*
* Copyright 2011, pac1250@gmail.com
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/
(function(a){a.postblank=function(c){c=a.extend({method:"POST",action:document.location.href,target:"_blank",enctype:"application/x-www-form-urlencoded",data:{}},c);var b=a('<form id="jQueryPostBlankPluginForm"></form>').appendTo("body");for(param in c){if(param!="data"){b.attr(param,c[param])}}for(name in c.data){a('<input type="hidden" />').appendTo("#jQueryPostBlankPluginForm").attr("name",name).attr("value",c.data[name])}b.submit().remove();return this};a.fn.postblank=a.postblank})(jQuery);
// jQuery PostBlank end
	
	$('<style id="torrent_css" type="text/css">'
	+ ' div.torrent-links-div { position: absolute; border: 1px solid #DDDDDD; background-color: #FFFFFF; z-index: 3; }'
	+ ' div.torrent-links-div div.torrent-links-div-div { line-height: 16px; padding: 2px; cursor: pointer; }'
	+ ' div.torrent-links-div div.torrent-links-div-div:hover { background-color: #EEEEEE; }'
	+ ' div.torrent-links-div div.torrent-links-div-div img { vertical-align: middle; }'
	+ ' div.torrent-links-div div.torrent-links-div-div span { vertical-align: middle; padding: 0 5px; }'
	+ '</style>').appendTo('head');
	
	var torrent_data = {
		tpb : {
			name: 'The Pirate Bay',
			icon: 'data:image/gif;base64,R0lGODlhEAAQAMZlAAAAAAEBAQICAgMDAwUFBQsLCw0NDQ8PDxAQEBERERISEhMTExQUFBkZGRsbGx4eHh8fHyAgICEhISMjIyYmJicnJyoqKisrKy0tLTY2Njc3Nzk5OTw8PD09PT8/P0BAQEFBQUJCQkNDQ0lJSVJSUlRUVFdXV1hYWFlZWVpaWltbW19fX2BgYGFhYWVlZWxsbG5ubnFxcXJycnd3d3p6eoKCgoODg4aGhoiIiImJiYuLi46OjpeXl5iYmJycnJ2dnaSkpKWlpaampqenp6ioqKqqqqurq62tra6urq+vr7GxsbKysra2trm5ub29vb+/v8HBwcLCwsXFxcjIyNHR0dLS0tTU1NfX19nZ2d3d3eLi4uXl5efn5+zs7O/v7/Hx8fPz8/r6+vv7+/z8/P7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAEAAQAAAHwoBlgmVkhYaGg4JXIyAijo8hIUSJRgCWl5gliUmWBAILCAMDAQApmwAYVStLWC5LOAAoiUgAGVsoEBUTVDcAJok+lgeYBgO1YYPBlhAFABQElhfIVjE9xholDgArHAkAIGRjTwA1O0FMRUJBQEdJSls8KjTfHiw7VGKCXlI/NgsfTV58GDKDAQAGGyQ06IAihIUKZbggiBDChAsdOUhY6ADjQQsoZcAokPElUZkvUU4AmCJojJMuJgdpGZElpk1CggIBADs=',
			search: function(title, episode) {
				$.postblank({
					method: 'GET',
					action: 'https://thepiratebay.se/s/',
					data: {
						q: (title + ' ' + episode),
						category: 0,
						page: 0,
						orderby: 7,
					}
				});
			}
		},
		eztv : {
			name: 'EZTV.it',
			icon: 'data:image/gif;base64,R0lGODlhEAAQAKUfAA9/8B9/8Cd/8B+I8Ux/8C+Q8liI8T+Z82SQ8k+h9HCZ83yh9F+q9Yiq9W+y9pSy9n+796C794/D+KvD+J/M+bfM+a/U+r/d+8/d+8/l/Nvl/N/u/efu/e/2/vP2/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKACAALAAAAAAQABAAAAZ/wI9wSCwOMwcAwPG5KJ8FYadw+VAAEgtFeBhkhJKnkjF0ACxDSdQYlhDDm2HVAiATN4PD90LJ5IcJcgcBAhAfSWJrQh4IFUaPCgQECJIEHBWSRgSOHAaOHw8Ymp8RD0INj5tCGAYeGBOpnx+NDxypE7AfEwsLjx8Nqh8aBLlCQQA7',
			search: function(title, episode) {
				$.postblank({
					method: 'POST',
					action: 'https://eztv.it/search/',
					data: {
						SearchString: '',
						SearchString1: (title + ' ' + episode),
						search: 'Search',
					}
				});
			}
		},
		torrentz : {
			name: 'Torrentz.eu',
			icon: 'data:image/ico;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZZjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8IAAA/DcAAPw7AAD8PQAA/CAAAPw/AAD8PwAA/D8AAPw/AAD8PwAA/D8AAPw/AAB8PgAAAAAAAAAAAACAAQAA',
			search: function(title, episode) {
				$.postblank({
					method: 'GET',
					action: 'https://torrentz.eu/search',
					data: {
						f: (title + ' ' + episode),
					}
				});
			}
		},
		kickass : {
			name: 'Kickass Torrent',
			icon: 'data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHUFLcyFLV74bO0UuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeQEthLmNy+DVzhf81c4X/NXOF/ydUYdscPEUdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkTFeuN3WG/zh2iP84doj/OHaI/zh2iP84doj/M2t7/B9BS1IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlS1ecPHmM/zx5jP88eYz/WIyc/3OfrP9BfI//PHmM/zx5jP83b4D9IEFLPgAAAAAAAAAAAAAAAAAAAAAiQ0wzPXiJ/kB9j/9AfY//XZGg//b5+v//////4uvu/2iZp/9AfY//QH2P/zNkcu4AAAAAAAAAAAAAAAAAAAAAMl1q2UWBlP9FgZT/RYGU/73T2f///////f7+//L29//p8PL/RYGU/0WBlP9FgZT/KUxXgAAAAAAAAAAAJ0ZPHUeBk/9Khpj/SoaY/0qGmP/b5+r//////7vR2P9Khpj/bp6t/0qGmP9Khpj/SoaY/zlndOcAAAAAAAAAAC9SXIBPi53/T4ud/0+Lnf9Pi53/0eHm///////F2d//T4ud/0+Lnf9Pi53/T4ud/0+Lnf9Mhpf/KEZPEgAAAAA4YGu+VJCh/1SQof9UkKH/VJCh/8HX3f//////6/L0/1SQof9UkKH/VJCh/1SQof9UkKH/VJCh/y9QWVwAAAAAQGp31lmUpv9ZlKb/aZ6u/5u/yv/W5en////////////C2N//3urt/3Smtf9ZlKb/WZSm/1mUpv81WWOIAAAAAENseNRemar/Xpmq/3Wntv////////////////////////////////+VvMf/Xpmq/16Zqv9emar/OFtlhAAAAABCaHS+Y52v/2Odr/9nn7H/iLTC/4Kxv//0+Pn//////6zL1f9jna//Y52v/2Odr/9jna//Y52v/zdXYVwAAAAAPF5od2ehsv9nobL/Z6Gy/2ehsv9nobL/xtzi///////f6+//Z6Gy/2ehsv9nobL/Z6Gy/2Wdrv80UVoSAAAAADZTXBJkmqr+a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9rpbb/a6W2/2ultv9SfovlAAAAAAAAAAAAAAAAS3J9xG+ouf9vqLn/XIuZ9GGTovpvqLn/b6i5/2+ouf9gkqD5Zpqp/W+ouf9vqLn/QWJsdwAAAAAAAAAAAAAAADtZYhdbipfxQWJrbgAAAAAAAAAAR2t2p2CRn/dBYmtuAAAAAAAAAABGanSgVH6L3wAAAAAAAAAA/j8AAPgPAADwBwAA4AMAAMADAADAAQAAgAEAAIAAAACAAAAAgAAAAIAAAACAAAAAgAAAAIABAADAAQAAxjMAAA==',
			search: function(title, episode) {
				$.postblank({
					method: 'GET',
					action: 'http://kat.ph/usearch/' + encodeURIComponent(title) + ' ' + encodeURIComponent(episode) +'/',
					data: {
						field: 'seeders',
						sorder: 'desc',
					}
				});
			}
		},
	};
	
	function torrent_clean_title(title) {
		return title.replace(/'s\b/gi, ' ')
		            .replace(/:/gi, '')
		            .replace(/^The /gi, '')
		            .replace(/ \(20[0-9][0-9]\)/gi, '')
		            .replace(/20[0-9][0-9]/gi, '')
		            .replace(/CSI NY/gi, 'CSI New York');
	}
	
	function torrent_check() {
		
		var htmlBefore = '<span class="torrent-links"><a>↓ Chercher l\'épisode ↓</a></span> &mdash; ';
		var htmlAfter = '<div class="torrent-links-div">';
		for(torrent_site in torrent_data) {
			var site_data = torrent_data[torrent_site];
			htmlAfter += '<div class="torrent-links-div-div">';
			htmlAfter += '    <img src="' + site_data.icon + '" />';
			htmlAfter += '    <span>' + site_data.name + '</span>';
			htmlAfter += '    <input type="hidden" name="site" value="' + torrent_site + '">';
			htmlAfter += '    <input type="hidden" name="title" value="">';
			htmlAfter += '    <input type="hidden" name="episode" value="">';
			htmlAfter += '</div>';
		}
		htmlAfter += '</div>';
		
		$('div.item div.titre a.ep:not(.torrent-checked)').each(function(index, Element) {
			
			if(!$(this).hasClass('torrent-checked')) {
				
				$(this)
					.addClass('torrent-checked')
					.siblings('span.srtlinks')
					.before(htmlBefore)
					.siblings('.torrent-links')
					.click(function() { $(this).siblings('.torrent-links-div').toggle(); })
					.after(htmlAfter)
					.siblings('.torrent-links-div')
					.hide()
					.children('.torrent-links-div-div')
					.click(function(eventObject) {
						torrent_data[$("input[name='site']", this).val()].search($("input[name='title']", this).val(), $("input[name='episode']", this).val());
						$(this).parents('.torrent-links-div:first').hide();
					});
				
				var title = torrent_clean_title($(this).text());
				var episode = $(this).next('a').text();
				$(this).siblings('.torrent-links-div').each(function(index, Element) {
					$("input[name='title']", this).val(title);
					$("input[name='episode']", this).val(episode);
				});
			}
		});
	}
	
	$(document).ready(function() {
		torrent_check();
		$(document).bind('DOMNodeInserted', torrent_check);
	});

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
