// ==UserScript==
// @name           grepoReports
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.*/game/report*
// @version        1.2
// @description    Show all reports without pagination +filter spy/attacks
// @source         http://userscripts.org/scripts/show/87370
// ==/UserScript==

(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var params = {}, p = (window.location.search || '?').substring(1).split('&');
    $.each(p, function(i, o){
        var m = o.split('=');
        params[m[0]] = m[1];
    });
    var action = params.action || 'index';
    /*if (action !== 'index') {
     return;
     }*/
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var lang = (n[1] || 'en'), server = (n[1] + n[2]);
    var townId = parseInt(uW.Game.townId, 10);
    var Ts = {
        en: {
            showall: 'Show all',
            spy: 'Spies',
            attack: 'Attacks'
        },
        fr: {
            showall: 'Tout afficher',
            spy: 'Espions',
            attack: 'Attaques'
        }
    };
    var T = Ts[lang] || Ts.en;
    var shown=false, url0 = window.location.href.replace(/#.*$/, '');
    var rePage = /<ul\sclass="game_list"\sid="report_list">(.*?)<\/ul>/im;
    var reOffset = /offset=(\d+)/;
    if (!params.offset) {
        url0 = url0.split('#')[0] + '&offset=0';
    }
    var offset = 0;
    var last = $('.game_header .paginator_bg').last().text();
    last = parseInt(last, 10);
    
    var cfg= {};
    if ($('#report_list').length > 0) {
		cfg={
			el: $('#report_list'),
			s1: '<ul class="game_list" id="report_list">',
        	s2: '</ul>',
			items:'#report_list li'
		};
		cfg.offset=cfg.s1.length;
    } else {
        cfg={
			el: $('.game_table'),
        	s1: '<tr class="game_table_even">',
        	s2: '</table>',
			items:'.game_table tr'
		};
    }
    
    $('#content .menu_inner ul').append('<li class="building_main_tear_down"><a class="submenu_link" href="#" id="target_showall">' +
    '<span class="left"><span class="right"><span class="middle">' +
    T.showall +
    '</span></span>' +
    '</span></a></li>');
    
    $('#target_showall').click(showall);
    
    var widths = [200, 20, 180, 20, 160];
    if ($('.game_table').length > 0) {
        //fix columns width
        $('.game_table tr').first().find('th').each(function(i, el){
            if (widths[i]) {
                el.style.width = widths[i] + 'px';
            }
        });
    }
    
    function addButton(id, fn){
        var el = $('<a href="#" id="filter_' + id + '" class="button" style="float:right;"><span class="left"><span class="right"><span class="middle">' + T[id] + '</span></span></span></a>');
        el.click(fn);
        $('.game_header').append(el);
    }
    function addInput(id, fn){
        var el = $('<input type="text" width="20" id="filter_' + id + '" style="float:right;"/>');
        el.blur(fn).keypress(function(e){
            var k = e.keyCode || e.which;
            if (k == 13) {
                fn();
                return false;
            } else {
                return true;
            }
        });
        $('.game_header').append(el);
    }
    
    function showall(){
        if (shown){
			return;	
		}
		shown=true;
		var _f = false;
        $('.paginator_bg').hide();
        if (action === 'index') {
            addButton('spy', function(){
                if (_f) {
                    $(cfg.items).show();
                } else {
                    $(cfg.items).hide();
                    $(cfg.items+':not(.color_highlight)').show();
                }
                _f = !_f;
            });
            addButton('attack', function(){
                if (_f) {
                    $(cfg.items).show();
                } else {
                    $(cfg.items).hide();
                    $(cfg.items+'.color_highlight').show();
                }
                _f = !_f;
            });
        }
        addInput('q', function(){
            var q = $('#filter_q').val().toLowerCase();
            $(cfg.items).each(function(i, el){
                var b = ($(el).text().toLowerCase().indexOf(q) >= 0);
                $(el).toggle(b);
            });
            _f = false;
        });
        var ns = reOffset.exec(url0);
        offset = (ns && ns[1]) ? parseInt(ns[1], 10) : 0;
        addPage(offset + 10, 1);
    }
    
    function addPage(offset, page){
        if (page>9) {
            //limit max
            return;
        }
        var url = url0.replace(reOffset, 'offset=' + offset);
        $.get(url, function(data){
            if (data) {
                data = data.replace(/\s*\n\s*/g, '');
                //console.log([url, data]);
                var p1 = data.indexOf(cfg.s1);
                if (p1>=0) {
					p1 += cfg.offset||0;
                    var p2 = data.indexOf(cfg.s2, p1);
                    if (p2>=0) {
                        var m = data.substr(p1, p2 - p1);
                        if (m) {
                            $(m).appendTo(cfg.el);
                            offset += 10;
                            if (offset < last * 10) {
                             addPage(offset, ++page);
                            }
                        } else {
                            //console.log('m null');
                        }
                    } else {
                        //console.log('not found s2 :');
                    }
                } else {
                    //console.log('not found s1 :');
                }
            }
        });
    }
    
})();

