// ==UserScript==
// @name           grepoSearch
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.*/game/map*
// @version        1.0
// @description    Search users and towns using various parameters
// @source         http://userscripts.org/scripts/show/94228
// ==/UserScript==

//@require greasekit

(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var lang = (n[1] || 'en'), world = n[2], server = lang + world;
    var townId = parseInt(uW.Game.townId, 10);
    
    var langs_stats = {
        fr: 'french',
        de: 'german',
        en: 'english'
    };
    
    var G = {}, M = {};
    window.G = G;
    window.M = M;
    
    window.mee = this;
    
    setTimeout(function(){
        var css = '#links a {line-height: 15px;}' +
        '.panel_search{float:left;width:235px;height: 100%;}' +
        '#grw_meta{text-align: left;position:absolute;height:404px;width:520px;left:2px;top:140px;z-index:13;}' +
        '#grw_meta #new_window_top, #grw_meta #new_window_bottom {width:520px;}' +
        '#grw_meta label{width: 4em;float: left;text-align: right;margin-right: 0.5em;display: block}' +
        '#grw_meta input{margin-left: 4.5em;display: block;}' +
        '#grw_meta p{margin: 0px;min-height:13px;}' +
        '#grw_world {overflow:auto;height:360px;font-size: 0.8em;}' +
        '#grw_world li{padding-left: 1.3em;}' +
        '#grw_world > ul{width:300px;}' +
        '#grw_world .map_jump_to_current_town_button {margin-top:0px;}' +
        '.f_ally{font-weight:bold;color:red;}' +
        '.f_name{font-size:1.2em;}';
        GM_addStyle(css);
        
        var el = $('<a href="#">Search</a>').click(mainworld);
        var w = el.wrap('<li></li>').parents()[0];
        $('#links ul').append(w);
    }, 200);
    
    function mainworld(){
        renderHtml(function(){
            loadworld(init);
        });
    }
    
    function init(){
        M = {
            towns: toarray(G.towns),
            alliances: toarray(G.alliances),
            players: toarray(G.players)
        };
        
        $("#town").autocomplete(M.towns, {
            minChars: 0,
            width: 310,
            matchContains: "word",
            autoFill: false,
            formatItem: function(row, i, max){
                var player = G.players[row.player_id] || {};
                return row.name + " - " + (player.name || '') + ' {' + row.island_x + ',' + row.island_y + '} - ' + row.id;
            },
            formatMatch: function(row, i, max){
                return row.name;
            },
            formatResult: function(row){
                return row.name;
            }
        }).result(function(event, row, formatted){
            $('#htown').val((row) ? row.id : '');
            $('#town').attr('title', formatTown({}, row));
        });
        
        $("#ally").autocomplete(M.alliances, {
            minChars: 0,
            width: 310,
            matchContains: "word",
            autoFill: false,
            formatItem: function(row, i, max){
                return row.name + ' - ' + row.members + ' members';
            },
            formatMatch: function(row, i, max){
                return row.name;
            },
            formatResult: function(row){
                return row.name;
            }
        }).result(function(event, row, formatted){
            $('#hally').val((row) ? row.id : '');
            $('#ally').attr('title', formatAlly({}, row));
        });
        
        $("#player").autocomplete(M.players, {
            minChars: 0,
            width: 250,
            matchContains: "word",
            autoFill: false,
            formatItem: function(row, i, max){
                return row.name + ' ' + row.points + ' pts';
            },
            formatMatch: function(row, i, max){
                return row.name;
            },
            formatResult: function(row){
                return row.name;
            }
        }).result(function(event, row, formatted){
            _log('player autocomplete');
            _log(row);
            _log(server);
            $('#hplayer').val((row) ? row.id : '');
            $('#player').attr('title', formatPlayer({}, row, true, true));
        });
        
        $('#grw_p1 input').attr('disabled', '');
    }
    
    function loadworld(cb){
        var URLBASE = '/data/', x = 0, rePlus = /\+/g;
        
        $('#grw_world').html('');
        $('#grw_info').html('load alliances...');
        load('alliances', 'id,name,points,villages,members,rank', fill_alliances, load_players);
        function load_players(){
            $('#grw_info').html('load players...');
            load('players', 'id,name,alliance_id,points,rank,towns', fill_players, load_towns);
        }
        function load_towns(){
            $('#grw_info').html('load towns...');
            load('towns', 'id,player_id,name,island_x,island_y,number_on_island,points', fill_towns, load_end);
        }
        function load_end(){
            $('#grw_info').html('Loaded ' + count(G.players) + ' players,' + count(G.alliances) + ' alliances,' + count(G.towns) + ' towns');
            if (cb) {
                cb();
            }
        }
        
        function load(id, names, cb, cbf){
            //names = names.split(',');
            //var len = names.length;
            G[id] = GM_getValue('G_' + id, G[id], {});
            //no cache
            if (true || isEmpty(G[id])) {
                G[id] = {};
                var lines, url = URLBASE + id + '.txt?r=' + Math.round(Math.random() * 99999);
                _log('load ' + url);
                $.get(url, function(data){
                    //_log('loading done');
                    G[id + '_data'] = data;
                    lines = data.split('\n');
                    _log(id + ' split done on ' + lines.length + ' lines');
                    for (l = 0, lc = lines.length; l < lc; l++) {
                        //_log('parse line ' + lines[l]);
                        d = lines[l].split(',');
                        if (d[0]) {
                            //_log(d);
                            G[id][d[0]] = cb(d);
                        }
                    }
                    //_log(id + ' parse done');
                    //GM_setValue('G_' + id, G[id]);
                    _log(lc + ' ' + id + ' stored');
                    cbf(++x);
                });
            } else {
                _log('get ' + id + ' from storage ');
                _log(G[id]);
                cbf(++x);
            }
        }
        
        function fill_alliances(d){
            return {
                id: parseInt(d[0], 10),
                name: decode(d[1]),
                points: parseInt(d[2], 10),
                villages: parseInt(d[3], 10),
                members: parseInt(d[4], 10),
                rank: parseInt(d[5], 10)
            };
        }
        function fill_players(d){
            return {
                id: parseInt(d[0], 10),
                name: decode(d[1]),
                alliance_id: parseInt(d[2], 10),
                points: parseInt(d[3], 10),
                rank: parseInt(d[4], 10),
                towns: parseInt(d[5], 10)
            };
        }
        function fill_towns(d){
            return {
                id: parseInt(d[0], 10),
                player_id: parseInt(d[1], 10),
                name: decode(d[2]),
                island_x: parseInt(d[3], 10),
                island_y: parseInt(d[4], 10),
                number_on_island: parseInt(d[5], 10),
                points: parseInt(d[5], 10)
            };
        }
        function decode(t){
            return decodeURIComponent(t || '').replace(rePlus, ' ');
        }
    }
    
    function filter(cfg){
        var o, d, m, reLine = /^.*$/mg, reName = /name/;
        cfg = cfg ||
        {
            town: town
        };
        if (cfg.ally) {
            cfg.ally = parseInt(cfg.ally, 10);
        }
        if (cfg.player) {
            cfg.player = parseInt(cfg.player, 10);
        }
        if (cfg.town) {
            cfg.town = parseInt(cfg.town, 10);
        }
        var mytown = G.towns[cfg.town];
        
        var html = '', res = filterMain();
        $('#grw_world').html('filter...');
        _log('Filter using:');
        _log(cfg);
        $('#grw_info').html('Found ' + res.length + ' towns ');
        if (cfg.filter === 'ally') {
            html = sortByAlly(res, true);
        } else if (cfg.filter === 'player') {
            html = sortByAlly(res, false);
        } else {
            html = sortByTowns(res);
        }
        
        $('#grw_world').html(html);
        
        function sortByAlly(r, byAlly){
            //ally, players, towns
            var html = '', o = {}, ghostid = 0;
            $.each(r, function(i, n){
                var a = (n.ally) ? n.ally.id : 0, t = n.town.id;
                if (n.player) {
                    p = n.player.id;
                } else {
                    if (cfg.ghost) {
                        p = 'ghost' + (++ghostid);
                    } else {
                        return;
                    }
                }
                o[a] = o[a] ||
                ((typeof n.ally === 'object') ? n.ally : {
                    name: 'Ghosts'
                });
                o[a]._players = o[a]._players || {};
                o[a]._players[p] = o[a]._players[p] || n.player ||
                {
                    name: p
                };
                o[a]._players[p]._towns = o[a]._players[p]._towns || {};
                o[a]._players[p]._towns[t] = n.town;
            });
            $.each(o, function(ida, a){
                var aname = a.name;
                if (byAlly) {
                    if (cfg.bbcode) {
                        aname = '[ally]' + a.name + '[/ally]';
                    } else {
                        aname = '<a target="_detail_ally" href="/game/alliance?alliance_id=' + a.id + '&action=profile&town_id=' + townId + '">' + a.name + '</a>';
                    }
                    html += '<ul><span class="f_ally">' + aname + '</span>';
                }
                $.each(a._players, function(idp, p){
                    var pname = p.name;
                    if (cfg.bbcode) {
                        if (p.name.indexOf('ghost') === 0) {
                            pname = '';
                        } else {
                            pname = '[player]' + p.name + '[/player]';
                        }
                    } else {
                        pname = '<a target="_detail_player" href="/game/player?player_id=' + p.id + '&town_id=' + townId + '">' + p.name + '</a>';
                        pname += '<a href="http://www.grepo-world.com/statistic.php?view=player_details&land=' + lang + '&world=' + world + '&player=' + p.name + '&language=' + langs_stats[lang] + '">' +
                        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAM5JREFUeNqEkr0Ng0AMhe8kWqqbIxNkgEyQKnNkhLTZIlIqmrQZIBOkpqW4giv4EXAXPUsPchCIJUvGz59tDDqEoNbsmV1HEXXee3U4nnWi/pgxRooBFUUhuU2obVvVNI1AwzAo59wEvV93WYMdYbv9Sfd9L8VwaF3XTRASaZoqxmVZSowigguIIidhrV8Q4mgSnVeaNwMYQexEAM+Evt+J+QU0n0SNHq1nrR0hXhDr5Hk+FtP01h+xZsnjdgm4Vl3X8iGrqlo4NOqo/QgwAJiJC8adQxVlAAAAAElFTkSuQmCC"></a>';
                    }
                    html += '<ul><span class="f_name">' + pname + '</span>';
                    $.each(p._towns, function(idt, t){
                        html += '<li>' + formatTown(cfg, t, p) + '</li>';
                    });
                    html += '</ul>';
                });
                if (byAlly) {
                    html += '</ul>';
                }
            });
            return html;
        }
        function sortByTowns(r){
            //towns, player, ally
            var html = '';
            $.each(r, function(i, o){
                html += formatTown(cfg, o.town);
                //html += '<a href="#' + o.town.id + '">' + o.town.name +' ('+o.town.points+ 'pts)</a>';
                if (o.player) {
                    html += ' [' + o.player.name + ']';
                }
                if (o.ally) {
                    html += ' of ' + o.ally.name;
                }
                if (o.player) {
                    html += ' (' + formatPlayer(cfg, o.player, false, false) + ' )<br/>';
                }
                html += '<br/>';
            });
            return html;
        }
        
        function filterMain(){
            var dist;
            
            _log('Filter on : ');
            if (cfg.ally) {
                var myalliance = G.alliances[cfg.ally];
                if (myalliance) {
                    _log('- Alliance : ' + formatAlly(cfg, myalliance) + ' )');
                } else {
                    console.error('Alliance not found: ' + cfg.ally);
                }
            }
            _log(cfg);
            var res = [];
            $.each(G.towns, function(i, town){
                var alliance = '', player = G.players[town.player_id];
                if ((!cfg.ghost && !player) || (cfg.ghost && player)) {
                    return;
                }
                
                if (cfg.town && (cfg.town !== town.id)) {
                    return;
                }
                
                if (cfg.points) {
                    if (town.points < cfg.points) {
                        return;
                    }
                }
                
                if (player) {
                    if (cfg.player && (cfg.player !== player.id)) {
                        return;
                    }
                    
                    alliance = G.alliances[player.alliance_id];
                    if (cfg.ally) {
                        if (!alliance || (cfg.ally !== alliance.id)) {
                            return;
                        }
                    }
                }
                if (cfg.sea) {
                    var x = parseInt(cfg.sea.substring(1, 0), 10), y = parseInt(cfg.sea.substring(2, 1), 10);
                    if (!(x == Math.floor(town.island_x / 100) &&
                    y == Math.floor(town.island_y / 100))) {
                        return;
                    }
                }
                if (mytown && cfg.distance) {
                    dist = getDistance(mytown, town);
                    if (dist > cfg.distance) {
                        return;
                    }
                }
                
                res.push({
                    town: town,
                    player: player,
                    ally: alliance
                });
            });
            _log('filtered items =' + res.length);
            //_log(res);
            return res;
        }
    }
    
    function formatTown(cfg, t, p){
        var tname = t.name;
        if (cfg.bbcode) {
            tname = '[town]' + t.name + '[/town]';
        } else {
            var playerId = (p) ? p.id : 0;
            var click = 'return Layout.townLinkClicked(this, ' + t.id + ', \'' + playerId + '\', \'/game/map?target_town_id=' + t.id + '&town_id=' + townId + '\')';
            tname = '<a href="#" onclick="' + click + '">' + t.name + '</a>';
        }
        
        var mer = '' + Math.floor(t.island_x / 100) + Math.floor(t.island_y / 100);
        var html = tname;
        //html += ' ('+t.points+ 'pts)';
        html += ' mer ' + mer+' {';
        if (cfg.bbcode) {
          html += '<a href="#" onclick="return WMap.jumpToPos(' + t.island_x + ', ' + t.island_y + ');">';
        }
        html += t.island_x + ',' + t.island_y ;
        if (cfg.bbcode) {
          html += '</a>';
        }
        html += '}';
        if (cfg.distance) {
            html += ' @' + getDistance(t, mytown);
        }
        return html;
    }
    
    function formatAlly(cfg, a){
        return a.name + ' ' + a.members + ' members, ' + a.points + 'pts, rank ' + a.rank + ', ' + a.villages + ' villages';
    }
    
    function formatPlayer(cfg, p, withAlly, withName){
        var t = '';
		if (withName){
			t+= p.name + ', ';
		}
		t+=p.points + 'pts, rank ' + p.rank + ',' + p.towns + ' towns';
        if (withAlly && p.ally) {
            t += ' - ' + formatAlliance(p.ally);
        }
        return t;
    }
    
    function getDistance(mytown, town){
        return Math.floor(Math.sqrt(Math.pow(mytown.island_x - town.island_x, 2) + Math.pow(mytown.island_y - town.island_y, 2)));
    }
    function toarray(obj){
        var o = [];
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                o.push(obj[prop]);
            }
        }
        return o;
    }
    function count(obj){
        var c = 0;
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                c++;
            }
        }
        return c;
    }
    function isEmpty(obj){
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }
    function _log(o){
        if (typeof console !== 'undefined') {
            console.log(o);
        }
    }
    
    
    function renderHtml(cb){
        var html = '<div id="grw_meta">' +
        '<div id="new_window_top"></div><div id="new_window_left"></div><div id="new_window_right"></div><div id="new_window_bottom"></div>' +
        '<div id="new_window_content">' +
        '<div id="grw_p1" class="panel_search">' +
        '<a class="cancel" href="#"></a>' +
        '<p><label>Alliance</label><input type="text" id="ally" value=""/><input type="hidden" id="hally" value=""/></p>' +
        '<p><label>Player</label><input type="text" id="player" value=""/><input type="hidden" id="hplayer" value=""/></p>' +
        '<p><label>Sea</label><input type="text" id="sea" value=""/></p>' +
        '<p><label>Points</label><input type="text" id="points" value=""/></p>' +
        '<p><label>Distance</label><input type="text" id="distance" value=""/></p>' +
        '<p><label>_from</label><input type="text" id="town" value=""/><input type="hidden" id="htown" value=""/></p>' +
        '<p><label>Ghost</label><input type="checkbox" id="ghost"/></p>' +
        '<p><label>BBCode</label><input type="checkbox" id="bbcode"/></p>' +
        '<p><label>Filter</label><select id="filter"><option value="town">By town</option><option value="player">By player</option><option value="ally" selected="selected">By alliance / towns</option></select></p>' +
        '<input id="search" type="button" value="Search"></input><br/>' +
        '<a href="/data/alliances.txt">alliances</a> - <a href="/data/players.txt">players</a> - <a href="/data/towns.txt">towns</a><br/>' +
        '</div>' +
        '<div class="panel_search">' +
        '<div id="grw_info"></div><div id="grw_world"></div>' +
        '</div>' +
        '</div></div>';
        if ($('#grw_meta').length === 0) {
            $(html).appendTo($(document.body));
            //$('#ally').val('my ally');
            //$('#hally').val('0000');
            /*
             $('#town').val('');
             $('#distance').val(20);
             $('#ghost').attr('checked', 'checked');
             */
            $('#grw_meta .cancel').click(function(){
                $('#grw_meta').hide();
            });
            $('#grw_p1 input').attr('disabled', 'disabled');
            
            $('#search').click(function(){
                //reset
                if ($('#player').val() === '') {
                    $('#hplayer').val('');
                }
                if ($('#ally').val() === '') {
                    $('#hally').val('');
                }
                if ($('#town').val() === '') {
                    $('#htown').val('');
                }
                
                filter({
                    ally: $('#hally').val(),
                    town: $('#htown').val(),
                    player: $('#hplayer').val(),
                    sea: $('#sea').val(),
                    filter: $('#filter').val(),
                    bbcode: ($('#bbcode:checked').length > 0),
                    ghost: ($('#ghost:checked').length > 0),
                    points: $('#points').val(),
                    distance: $('#distance').val()
                });
            });
            $("#grw_meta").draggable({
                cursor: 'move',
                handle: '#grw_p1'
            });
        } else {
            $('#grw_meta').show();
        }
        cb();
    }
})();
