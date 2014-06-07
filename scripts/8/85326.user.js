// ==UserScript==
// @name           grepoWall
// @author         LudoO
// @namespace      ludoo
// @include        http://*.grepolis.*/game/building_wall*
// @version        1.7
// @description    Shows losts since last saved wall
// @source         http://userscripts.org/scripts/show/85326
// ==/UserScript==

//1.7: new layout 50px
//1.6: fixed images margins
//1.5: fixed for new wall's layout (big icons 50x50)
//     +change for new big icon, if not there ;)

(function(){
    var ff = (typeof unsafeWindow !== 'undefined');
    var uW = ((ff) ? unsafeWindow : window), $ = uW.jQuery;
    
    var n = /(\w+)(\d+)\.grepolis\.com/.exec(window.location.host);
    var lang = (n[1] || 'en'); // , server = (n[1] + n[2]);
    var townId = parseInt(uW.Game.townId, 10);
    var nwWall = ($('.wall_report_unit').length > 0);
    var Ts = {
        en: {
            save: 'Save',
            saved: 'Wall status saved',
            lastime: 'Last saved time : '
        },
        fr: {
            save: 'Sauver',
            saved: 'Etats des remparts sauvé',
            lastime: 'Dernière sauvegarde le : '
        },
        de: {
            save: 'Speichern',
            saved: 'Mauer Status wurde gespeichert.',
            lastime: 'Zuletzt gespeichert Zeit : '
        }
    };
    var T = Ts[lang];
    var reUnit = /game\/units\/(\w+)_\d+x\d+\.png/;
    function getUnitName(e){
        var name = '';
        if (e.style) {
            var m = reUnit.exec(e.style.backgroundImage);
            if (m && m[1]) {
                name = m[1];
            }
        }
        return name;
    }
    function redcounts(save){
        // attacks
        redcount('left', true, save);
        redcount('right', true, save);
        // defenders
        redcount('left', false, save);
        redcount('right', false, save);
        if (save) {
            // save time
            tsave('wall_lastime', getDate());
        } else {
            tget('wall_lastime', '', function(o){
                if (o) {
                    $('.game_list li.odd').first().append('<p>' + T.lastime + o + '</p>');
                }
            });
        }
    }
    function redcount(dir, attack, save){
        var id = 'wall_' + dir + ((attack) ? '_d' : '_a');
        tget(id, {}, function(o){
            rc(o, attack, dir, save);
        });
    }
    function rc(pw, attack, dir, save){
        var w = {};
        var index = (attack) ? 1 : 2;
        var els = $('li.odd');
        var items = els[index];
        var clsReportUnit = (nwWall) ? 'wall_report_unit' : 'report_unit';
        $(items).find('.list_item_' + dir + ' .' + clsReportUnit).each(function(i, o){
            if (!save) {
                $(this).wrap('<div class="report_side_att"></div>');
            }
            var name = getUnitName(o);
            w[name] = parseInt($(o).find('.place_unit_white').text(), 10);
            _log(name + ' : ' + pw[name] + '->' + w[name]);
            if (!save) {
                var diff = '?';
                if (typeof pw[name] !== 'undefined') {
                    diff = pw[name] - w[name];
                }
                $(this).after('<span class="report_losts bold">' + diff + '</span>');
            }
        });
        if (save) {
            _log('save: ' + JSON.stringify(w));
            tsave('wall_' + dir + ((attack) ? '_d' : '_a'), w);
        }
    }
    
    redcounts(false);
    $('#content .menu_inner').append('<ul><li class="building_main_tear_down"><a class="submenu_link" href="#" id="target_savewall">' +
    '<span class="left"><span class="right"><span class="middle">' +
    T.save +
    '</span></span>' +
    '</span></a></li></ul>');
    
    $('#target_savewall').click(function(){
        redcounts(true);
        alert(T.saved);
    });
    
    function tsave(name, value){
        setTimeout(function(){
            if (ff && typeof value === 'object') {
                value = JSON.stringify(value);
            }
            GM_setValue(name, value);
        }, 0);
    }
    function tget(name, def, cb){
        setTimeout(function(){
            var o = GM_getValue(name, def);
            if (ff) {
                try {
                    o = JSON.parse(o);
                } catch (e) {
                }
            }
            cb(o);
        }, 0);
    }
    function _log(o){
        //GM_log(o);
    }
    function getDate(){
        var now = new Date();
        return (now.getDate() + '/' + now.getMonth() + '/' + (1900 + now.getYear()) + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds());
    }
    setTimeout(function(){
        GM_addStyle(".wall_unit_container {width:340px;}" +
        ".report_side_att {float: left;margin: 3px;text-align: center;width: 50px;} ");
        if (!nwWall) {
            GM_addStyle(".report_unit{width:50px;height:50px}");
            $('.report_unit').each(function(i, o){
                o.style.backgroundImage = o.style.backgroundImage.replace(/_\d+x\d+/, '_50x50');
            });
        }
    }, 200);
})();
