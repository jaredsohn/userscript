// ==UserScript==
// @name           Quick Goto
// @namespace      GOTO
// @author         Obliterator
// @description    Quick Goto
// @version        1.0.2
// @include        http://nl*.tribalwars.nl/game.php*screen=place*
// @include        http://nl*.tribalwars.nl/game.php*screen=info_player*
// @include        http://nl*.tribalwars.nl/game.php*screen=overview_villages*
// ==/UserScript==


(function (){

    if (window.opera) {
        unsafeWindow = window;
    }

    var $ = unsafeWindow.$;
    var data = unsafeWindow.game_data;

    if (! document.getElementById("quickbar_outer")) {
        return;
    }

    var toolname = 'Goto';
    var world = window.top.location.href.match('http://([^"]+).tribalwars.nl')[1];
    var URL = 'http://'+world+'.tribalwars.nl/game.php?village={id}&screen=place';

    var id = parseInt(data["player"]["id"]);
    var t = parseInt(data["player"]["sitter_id"]);
    if (isNaN(t) || t == 0)
        t = 0;
    else
        URL = URL+'&t='+id;

if (! JSON.stringify)
    JSON.stringify = function(data) { return JSON.encode(data); };

var set_cookie = function(arr, type) {
    type = type ? '_'+type : '';
    var value = JSON.stringify(arr);
    window.localStorage.setItem('tw_quickgoto_'+world+type, value);
};
var get_cookie = function(type) {
    type = type ? '_'+type : '';
    if (window.localStorage.getItem('tw_quickgoto_'+world+type)) {
        return JSON.parse(window.localStorage.getItem('tw_quickgoto_'+world+type));
    }
    return [];
};



function qDebug(text, raw, add) {
    text = ''+text;
    var dbg = $('#qdebugdiv');
    if (! dbg.length) {
        var table = $("<table><tr><td><div></div></td></tr></table>")
            .addClass('main').css('width', '100%')
            .css('border-width', 4)
            .appendTo($('#contentContainer')[0].insertRow(0).insertCell(0));

        dbg = table.find("div").eq(0).attr('id', 'qdebugdiv')
            .css({padding: 5, 'white-space':'pre', 'font-family':'arial','margin-bottom':1});
    }
    if (! add) dbg.empty();
    var d = $("<div></div>").appendTo(dbg);
    if (! raw) d.text(text);
    else d.html(text);
    $('<span></span>').text(toolname+': ').addClass('error').prependTo(d);
}



var $x = function(p, context) {
    if(!context)
        context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++)
        arr.push(item);
    return arr;
};

String.prototype.coords = function() {
    var matches = this.match(/.*(^|[^0-9])([0-9]{1,3})\|([0-9]{1,3}).*/);
    if (matches) return {x:matches[2],y:matches[3]};
    return null;
}
String.prototype.stringCoords = function() {
    var coords = this.coords();
    return coords ? coords.x+'|'+coords.y : null;
}


if (data['screen'] == 'info_player') {

    function loadVillages(callback) {
        var rows = $('#villages_list')[0].rows;
        if (rows[rows.length-1].cells.length == 1) {
            // Fetch all villages first.
            $('#goto_buttons').hide();
            $('#goto_wait').show();
            $(rows[rows.length-1].cells[0]).find('a:first').click();
        }

        function loader() {
            var rows = $('#villages_list')[0].rows;
            if (rows[rows.length-1].cells.length > 1) {
                var map = new Object();
                for (i=rows.length-1; i > 0; i--) {
                    var row = rows[i].cells;
                    matches = row[0].innerHTML.match(/id=([0-9]+)/);
                    map[row[1].textContent] = matches[1];
                }
                callback(map);
                $('#goto_wait').hide();
                $('#goto_buttons').show();
            } else {
                setTimeout(loader, 150);
            }
        }

        loader();
    }


    var gototable = $("<table></table>").attr('id', 'goto_table')
        .addClass('vis').css('width', '100%').insertBefore($("<br />").insertBefore('#villages_list'))[0];

    $("<th>Goto tool</th>").appendTo(gototable.insertRow(0));
    $("<td></td>").text('Bezig met dorpen ophalen...').appendTo($(gototable.insertRow(1)).attr('id', 'goto_wait').hide());

    var td = $("<td></td>").appendTo($(gototable.insertRow(1)).attr('id', 'goto_buttons'));

    var button = $("<input type='button'></input>")
        .attr({id:'goto_savebutton', value:'Bewaar dorpen', title:'Bewaar deze dorpen voor goto gebruik.'})
        .appendTo(td);

    button[0].addEventListener("click", function(evt) {
        loadVillages(function (map){
            set_cookie(map);
            $('#goto_savebutton').val('Dorpen bewaard!').attr('disabled', true);
        });
    }, false);



    var tdselect = $("<td></td>").appendTo($(gototable.insertRow(2)).attr('id', 'goto_select').hide());
    $("<textarea></textarea>").attr('id', 'goto_select_area')
        .css({width:'95%', height:150})
        .appendTo(tdselect)
        .focus(function() {
            this.select();
        });

    button = $("<input type='button'></input>")
        .attr({id:'gotoselectbutton', value:'Selecteer dorpen', title:'Selecteer deze dorpen om te plakken in de clustergenerator.'})
        .css('margin-left', 4)
        .appendTo(td);

    button[0].addEventListener("click", function(evt) {
        if ($('#goto_select').is(':visible'))
            return $('#goto_select').hide();

        loadVillages(function (map){
            var villages = new Array();
            for (var v in map) {
                if (map.hasOwnProperty(v))
                    villages.push(v);
            }
            $('#goto_select_area').val(villages.join('\n'));
            $('#goto_select').show();
        });
    }, false);


} else if (data['screen'] == 'place' && (!data['mode'] || data['mode'] == 'command')) {

    var menu = $('table.modemenu');

    if (! menu.length) {
        menu = $("<table></table>").css('width', '100').addClass('vis modemenu');
        var form = $('#content_value').find('form').eq(0);

        var table = $("<table></table>").css('width', '100%').appendTo($('#content_value'));
        form.find('h2').eq(0).appendTo($(table[0].insertRow(0).insertCell(0)).attr('colspan', 2));
        var row = table[0].insertRow(1);
        menu.appendTo($(row.insertCell(0)).attr('valign', 'top').attr('width', 100));
        form.appendTo($(row.insertCell(1)).attr('valign', 'top').attr('width', '*'));
    }

    var a = $("<a href='#'>Goto</a>").appendTo(menu[0].insertRow(menu[0].rows.length).insertCell(0));

    var gotocell = $(menu[0].insertRow(menu[0].rows.length).insertCell(0))
        .attr('id', 'goto-cell').hide();

    var area = $("<textarea></textarea>")
        .attr('id', 'goto-area')
        .css({width: '95%', height: 200})
        .appendTo(gotocell);

    a.click(function () {
        if (get_cookie('enabled').enabled) {
            set_cookie({enabled:0}, 'enabled');
            $('#goto-cell').hide();
        } else {
            set_cookie({enabled:1}, 'enabled');
            $('#goto-cell').show();
            $('#goto-area').focus();
        }
        return false;
    });

    if (! get_cookie('enabled').enabled)
        gotocell.hide();
    else {
		gotocell.show();
        //$('#goto-area').focus();
    }



    if (location.href.match(/try=confirm/)
            && ($("#content_value").find("h2:contains('Aanval')").length > 0) || ($("#content_value").find("h2:contains('Ondersteun')").length > 0))  {

        if (! area.is(':visible')) {
            $("#troop_confirm_go").focus();
        } else {
            $(document).ready(function() { // Prevent anything else from stealing the focus
                $('#goto-area').focus();
            });
        }

        area[0].addEventListener('input', function(){
            function go(kata) {
                if (kata) {
                    var select = $("select[name=building]");
                    select.find("option").each(function (i, e) {
                        if ($.trim($(e).text().toLowerCase()) == kata) {
                            select.val(e.value);
                        }
                    });
                }
                $("#troop_confirm_go").click(); // Illegaal
                $("#troop_confirm_go").focus();
            }

            var table = $("#content_value").find("form > table")[1];
            var katas = parseInt(table.rows[1].cells[9].textContent);

            var kata = this.value.match(/\bk(ata)?=([a-zA-Z]+)\b/);
            if (kata) {
                kata = kata[2].toLowerCase();
                if (katas <= 5 && kata != 'verzamelplaats' && kata != 'adelshoeve')
                    go(false);
                else
                    go(kata);
            } else {
                go(false);
            }

        }, false);


        return;
    }


    $('#inputx')[0].addEventListener('keyup', function(){
        if (! $("#goto-cell").is(':visible'))
            return;

        setTimeout(function () {
            if (! isNaN(parseInt($('#inputx').val())) && ! isNaN(parseInt($('#inputy').val()))) {
                if (! $("#target_attack").is(":visible")) {
                    $("#units_form").append("<input type='hidden' name='support' value='Ondersteunen' />");
                    $("#units_form").submit(); //Illegaal
                    $("#target_support").focus();
                } else if (! $("#target_support").is(":visible")) {
                    $("#units_form").append("<input type='hidden' name='attack' value='Aanvallen' />");
                    $("#units_form").submit(); //Illegaal
                    $("#target_attack").focus();
                }
            }
        }, 50); // Stupid Macs.
    }, false);


    function switchVillage(field) {
        function go(coords) {
            if (! coords)
                return;

            // Strip zeros
            coords = coords.split('|');
            coords = parseInt(coords[0], 10)+'|'+parseInt(coords[1], 10);

            var villages = get_cookie();
            if (!villages[coords]) {
                // Show warning
                var url = location.href.replace('#', '') + '&screen=info_player&id='+data.player.id;
                qDebug("Dorp "+coords+" niet gevonden. Ga naar je <a href='"+url+"'>profiel</a> en klik op de bewaren knop.", true);
                return;
            }

            var id = villages[coords];
            var group = field.value.match(/\bi=([a-zA-Z0-9\-_]+)\b/);
            if (group) {
                localStorage.setItem("invuller_groupID", group[1]);
                localStorage.setItem("invuller_fromID", id);
            }

            if (data.village.id == id) {
                $("#invuller_launcher").click();
                $("#inputx")[0].focus();
                return;
            }

            window.top.location.href=URL.replace(/{id}/, id);
        }

        var coords = field.value.match(/([0-9]+\|[0-9]+).*[^0-9]([0-9]+\|[0-9]+).*/);
        if (coords) {
            go(coords[2]);
        } else {
            coords = field.value.match(/(?:.*[^0-9])?([0-9]+\|[0-9]+).*/);
            if (coords)
                go(coords[1]);
        }

    }

    area[0].addEventListener('input', function() { switchVillage(this); }, false);

    if (area.val()) {
        switchVillage(area[0]);
    } else {
        $("#inputx")[0].focus();
    }


} else if (data['screen'] == 'place' && data['mode'] == 'units') {
    var villages = get_cookie();
    var table = $("form[method=post]").find("table")[0];

    var rows = table.rows;
    if (rows.length <= 3)
        return;

    /* Colour own villages */
    var troops = new Array();
    var coords = data["village"]["coord"].split('|');
    var x = parseInt(coords[0], 10);
    var y = parseInt(coords[1], 10);
    var last = null;


    /* Fields */
    $("<th></th>").text("Afstand").insertBefore(rows[0].cells[1]);
    for (var i=1, end=rows.length; i < end; i++) {
        var row = rows[i];
        var td0 = row.cells[0];
        if (td0.tagName.toLowerCase() == "th") {
            $("<th></th>").insertAfter(td0);
            if (! last) last = row;
            continue;
        }

        // Calculate distance
        var td = row.insertCell(1);
        var coords = td0.textContent.match(/\(([0-9]+)\|([0-9]+)\)/);

        var fields = 0;
        if (coords) {
            fields = Math.round(Math.sqrt(Math.pow(parseInt(coords[1], 10)-x, 2)+Math.pow(parseInt(coords[2], 10)-y, 2))*10)/10;
        } else {
            td.className = "hidden";
        }

        td.textContent = fields;
        troops.push(row);

        if (! coords || !villages[coords[1]+"|"+coords[2]])
            continue;

        $(td0).css({'border-left':'4px solid #008000'});
    }

    /* Sorting */
    troops.sort(function (a, b) {
        return parseFloat(a.cells[1].textContent) - parseFloat(b.cells[1].textContent);
    });

    var body = rows[0].parentNode;
    for (var i=0, len=troops.length; i < len; i++) {
        body.removeChild(troops[i]);
        body.insertBefore(troops[i], last);
    }

} else if (data['screen'] == 'overview_villages' && location.href.match(/mode=units/) && location.href.match(/type=away_detail/)) {

    function insertButton(table, callback, name, id) {
        var b = $("<button />").text(name ? name : 'Selecteren').css({'font-size':11, 'padding':0, 'margin-left':4})
            .appendTo(table[0].rows[0].cells[0])
            .click(callback);
        if (id) b.attr('id', id);
        return b;
    }
    function showPopup(el, w, callback, focus) {
        var container = $("<div />").hide().attr('data-popup-container', 1)
            .css({'padding':10, 'background-color':'#BAEF9E'}).appendTo(document.body)
            .append(el);

        var div = $("<div></div>").css({'padding-top':10, 'text-align':'right'}).appendTo(container);

        var ok = $("<button />").appendTo(div).text('OK').click(function () {
                if (callback) callback();
                $(this).parents('div[data-popup-container]').hide().remove();
                $('#goto-button').removeAttr("disabled");
                return false;
            });

        if (callback) {
            $("<button />").appendTo(div).text('Annuleren').click(function () {
                $(this).parents('div[data-popup-container]').hide().remove();
                $('#goto-button').removeAttr("disabled");
                return false;
            });
        }

        var w = $(el).width(); // +Padding
        var h = container.height();

        var x = ($(window).width()-w)/2;
        var y = ($(window).height()-h)/2;

        container.css({position:'fixed', width:w, height:h, top:y, left:x}).show();

        if (focus) $(focus).focus();
        else ok.focus();
    }


    function showSchemaPopup(schema) {
        var div = $("<div></div>").css({'width':300});
        $("<div />").text("Plak dit schema in de aanvalsplanner:").appendTo(div);
        var textarea = $("<textarea></textarea>").css({'width':'100%', 'height': 200, 'box-sizing':'border-box'}).val(schema.join("\n")).appendTo(div);
        showPopup(div, 300, null, textarea);
    }



    function buildSchema(minpop, player) {
        if (player != null)
            player = player.toLowerCase();

        var population = [1, 1, 1, 1, 2, 4, 5, 6, 5, 8, 10, 100];
        function getPopulation(troops) {
            var p = 0;
            for (var i=troops.length-1; i >= 0; i--) {
                p += troops[i]*population[i];
            }
            return p;
        }

        // Build goto schema
        var style = {'background-color':'#BAEF9E', 'border-color':'#008000', 'border-style': "solid", 'border-width':2};
        var normal = {'background-color':'', 'border-color':'', 'border-style': "", 'border-width':''};

        var schema = new Array();
        var targets = new Object();
        var sources = new Object();
        var defence = [1,1,0,1,0,0,0,1,0,0,0,0];
        var rows = table[0].rows;

        var src = null;
        var target = null;
        var troops;

        for (var i=0, rowcount=rows.length; i < rowcount; i++) {
            var row = rows[i];
            var r = $(row);
            if (r.hasClass('units_away')) {
                if (src && target) {
                    if (! targets.hasOwnProperty(target))
                        targets[target] = new Array();
                    targets[target].push(src);
                    src = null;
                    target = null;
                }

                var cell = $(row.cells[0]);
                if (cell.attr('data-goto-style')) {
                    cell.removeAttr('data-goto-style').css(normal);
                }

                src = cell.find('a').text().stringCoords();
                troops = new Array();
                var cells = row.cells;
                for (var j=0; j < population.length; j++) {
                    troops.push(defence[j] ? parseInt(cells[j+2].textContent, 10) : 0);
                }
                if (getPopulation(troops) < minpop) {
                    src = null;
                    continue
                }
                sources[src] = row;


            } else if (src != null) {
                var a = $(row.cells[0]).find('a');
                target = a.eq(0).text().stringCoords();
                if (! target) continue;

                if (player != null) {
                    if (a.length > 1) {
                        if (player === '' || a.eq(1).text().toLowerCase().indexOf(player) == -1) {
                            target = null;
                            continue;
                        }
                    } else if (player !== '') {
                        target = null;
                        continue;
                    }
                }

                troops = new Array();
                var cells = row.cells;
                for (var j=0; j < population.length; j++) {
                    troops.push(defence[j] ? parseInt(cells[j+1].textContent, 10) : 0);
                }
                if (getPopulation(troops) < 1000) {
                    target = null;
                    continue
                }
            }
        }


        var now = new Date();
        now.setHours(now.getHours()+1);
        now = now.getDate()+"/"+(now.getMonth()+1)+" "+now.getHours()+":00";
        for (var target in targets) {
            schema.push('['+target+' '+now+']');
            var srcs = targets[target];
            for (var i=0; i < srcs.length; i++) {
                schema.push(srcs[i]);
                $(sources[srcs[i]].cells[0]).css(style).attr('data-goto-style', 1);
            }
            schema.push("");
        }

        showSchemaPopup(schema);
    }




    // Run
    var table = $('#units_table');

    insertButton(table, function () {
        $('#goto-button').attr("disabled", "disabled");

        var div = $("<div></div>").css({'width':300});
        var html = "<form><div style='font-weight: bold; margin-bottom: 5px;'>Minimum populatie:</div><div style='margin-left: 20px;'><input type='text' value='500' id='goto-pop' style='width: 100px;' /></div>";
        html += "<div style='font-weight: bold; margin-top: 20px; margin-bottom: 5px;'>Speler:</div>";
        html += "<div style='margin-left: 20px;'><input type='radio' name='goto-player' id='goto-player-all' checked /><label for='goto-player-all'>alle</label></div>";
        html += "<div style='margin-left: 20px;'><input type='radio' name='goto-player' id='goto-player-self' /><label for='goto-player-self'>eigen</label></div>";
        html += "<div style='margin-left: 20px;'><input type='radio' name='goto-player' id='goto-player' /><label for='goto-player'>andere: </label>";
        html += "  <input type='text' id='goto-player-text' value='' style='width: 200px' /></div></form>";

        div.html(html);

        div.find('#goto-player-text').focus(function () {
            div.find('input[type=radio]').removeAttr('checked');
            div.find('#goto-player').attr('checked', 'checked');
        });

        showPopup(div, 300, function () {
            var player = null;
            var p = parseInt($('#goto-pop').val(), 10);
            if (isNaN(p) || p < 0) p = 500;
            if ($('#goto-player-self').is(':checked'))
                player = '';
            else if ($('#goto-player').is(':checked'))
                player = $('#goto-player-text').val();
            buildSchema(p, player);
        });

        return false;
    }, "Troepen aanvullen", 'goto-button');
}


})();
