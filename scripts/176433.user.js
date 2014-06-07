// ==UserScript==
// @name           SpeedTagger
// @namespace      speedtagger
// @author         Obliterator - Aanpassingen door Warre
// @version        0.6.8
// @description    Speedy Tagger
// @include        http://nl*.tribalwars.nl/game.php*screen=info_command*
// @include        http://nl*.tribalwars.nl/game.php*screen=overview*
// @include        http://nl*.tribalwars.nl/game.php*screen=report*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function (){
var kleurtjes = 1;

if (window.opera) {
    unsafeWindow = window;
}

var $ = unsafeWindow.$;
var jQuery = unsafeWindow.jQuery;
var game_data = unsafeWindow.game_data;

var fmt = 'MARKEREN {#tag} ({#coordatt}) {#attacker} F{#field}';
//var fmt2 = 'EIGEN {#tag} op ({#coorddef}) F{#field}';
var labels = ['OK', 'DODGE', 'DODGED', 'BIJSTACKEN', 'GEVRAAGD', '__DUBBEL', '__FAKE'];
var tags = ['Scouts', 'LC', 'ZC', 'Bijl', 'Zwaard', 'Ram/Kata', '**Edel**'];
var shortcuts = {
    'o':'OK',
    's':'DODGED',
    'd':'DODGE',
    'b':'BIJSTACKEN',
    'g':'GEVRAAGD',
    'm':'MARKEREN',
    'f':'__fake',
};

	
	/**Making a new th on the top of the page + Making a SPEEDTAGGER button**/
	var tr = $('#content_value table#incomings_table tr:first');
	var newtr = tr.before('<tr><th><input type="button" id="starttagger" value="SPEEDTAGGER"/></th><th id="topselect" colspan="5"></span></th></tr>');
	
	
$("#starttagger").click(function() {
 var sp = [9, 10, 11, 18, 22, 30, 35],
        w = location.host.match(/\d+/),
        ma = [1500, 1500, 1500, 1500, 1500, 1500, w == 1 ? 1e3 : w == 2 ? 70 : w == 3 ? 100 : w == 5 || w == 10 ? 42 : 77],
        u = ['Scouts', 'Lichte cav.', 'Heavy cav.', 'Bijl/Speer', 'Zwaard', 'Ram/Kata', 'Edel'],
        win = frames.main || self,
        doc = win.document,
        o = doc.getElementById('overview'),
        tc = 'textContent',
        b = [],
        d, v, i, l, s, t, Gu = doc.links[0];
    Gu = Gu ? Gu.href : doc.URL;
    var Gut = Gu.match(/t=\d+/),
        Guv = Gu.match(/village=\d+/);
    Gu = 'game.php?' + (Gut || '') + (Gut && Guv ? '&' : '') + (Guv || '');

    function gu(u) {
        return u ? u.replace(/{game\}/g, Gu) : Gu
    }
    if (w == 2) for (i = 0; i < 7; i++) sp[i] /= 2;
    if (!(tc in doc.body)) tc = 'innerText';
    if (o && o.value == 'incomings') {
        var newtags = 0;
        t = doc.getElementById('incomings_form').getElementsByTagName('th')[0].offsetParent.rows, rf = /id=(\d+)/;
        for (i = 1, l = t.length, s; i < l; i++) {
            s = t[i].getElementsByTagName('input');
            if (!s.length) continue;
            s = [s[s.length - 2], s[s.length - 1]];
            v = s[0].value.split(' ');
            if (!v.length) continue;
            if (v[0] == '2bT') d = v[2];
            else if (v[0] == 'Aanval') {
                d = t[i].cells[4][tc];
                newtags++
            } else continue;
            b.push([s, d, t[i].getElementsByTagName('a')[0].href.match(rf)[1]])
        }
        l = b.length;
        for (i = 0; i < l; i++) {
            s = b[i][0];
            var val = '2bT ' + (l - 1 > i ? b[i + 1][2] : 0) + ' ' + b[i][1];
            if (val != s[0].value) {
                s[0].value = val;
                s[1].click()
            }
        }
        if (l) {
            if (confirm('Er zijn ' + l + ' dorpen (' + newtags + ' nieuwe) die getagd moeten worden.\nWil je naar de eerste bevel gaan?')) location.href = gu() + '&screen=info_command&id=' + b[0][2] +'&type=other';
        } else alert('Er zijn geen dorpen die getagd kunnen worden.');
        return
    }
    if (!doc.URL.match('screen=info_command')) {
        location.href = game_data["link_base_pure"].replace("screen=", "screen=overview_villages&mode=incomings&type=all&subtype=attacks&group=0");
        return
    }
    var bt = doc.getElementsByTagName('th')[0].offsetParent,
        vr = /^.{3,32} \(((\d{1,3})\|(\d{1,3}))\) .(\d{1,2})$/,
        r = bt.rows;
    if (r[5].cells[1][tc].match(/^\d+:\d{2}:\d{2}$/)) bt.deleteRow(5);
    var fp = r[1].cells[2][tc],
        fd = r[2].cells[1].firstChild[tc].match(vr),
        tp = r[3].cells[2][tc],
        td = r[4].cells[1].firstChild[tc].match(vr),
        at = r[5].cells[1][tc],
        ai = r[6].cells[1][tc],
        f = Math.sqrt(Math.pow(fd[2] - td[2], 2) + Math.pow(fd[3] - td[3], 2)),
        ei = doc.getElementById('editInput').value.match(/^2bT (\d+) (\d+:\d{2}:\d{2})/);
    if (ei) {
        ai = ei[2];
        if ((ei = ei[1]) > 0) {
            var a = doc.createElement('a');
            a.href = gu() + '&screen=info_command&id=' + ei + '&type=other';
            a.style.cssFloat = 'right';
            a[tc] = 'Volgende bevel';
            r[0].cells[0].appendChild(a)
        }
    }

    function n2(n) {
        n = Math.floor(n);
        return n > 9 ? n : '0' + n
    }

    function tf(f) {
        f = f.split(':');
        return 60 * f[0] + 1 * f[1] + f[2] / 60
    }

    function ft(m) {
        return n2(m / 60) + ':' + n2(m % 2560) + ':' + n2(m % 251 * 60)
    }
    r[6].cells[1].appendChild(doc.createTextNode(' (Gebruikte tijd: '));
    var rt = doc.createElement('span');
    rt[tc] = ai;
    r[6].cells[1].appendChild(rt);
    r[6].cells[1].appendChild(doc.createTextNode(')'));
    mx = tf(ai);
    var tr = doc.createElement('tr');
    tr.insertCell(0);
    tr.insertCell(1);
    var rn = tr.insertCell(2);
    var ri = doc.createElement('input');
    ri.setAttribute("type", "text");
    ri.size = 34;
    rn.appendChild(ri);
    var ed = doc.getElementById('edit');
    var ok = $(ed).children("input[type='button'][value='OK']")[0];
    rn.appendChild(ok.cloneNode(false));
    var ht = bt.insertRow(r.length),
        h, th, F, c;
    for (i = 0, h = ['Eenheid', 'Looptijd', 'Benoemen']; i < 3; i++) {
        th = doc.createElement('th');
        th[tc] = h[i];
        ht.appendChild(th)
    }
    var Rt = /{#tag}/g,
        Rf = /{#field}/g,
        Rca = /{#coordatt}/g,
        Rcd = /{#coorddef}/g,
        Ra = /{#attacker}/g,
        Rd = /{#defender}/g;
    var row = $(bt).find("td:contains('Aankomst in:')")[0].parentNode.nextSibling;
    var F = document.createElement("tr"),
        p = F.insertCell(0);
    p.colSpan = 2;
    p[tc] = 'Loopafstand:';
    F.insertCell(1)[tc] = f.toFixed(2) + ' velden';
    row.parentNode.insertBefore(F, row);
    bt.style.width = "600px";
    p = bt.insertRow(bt.rows.length - 1);
    p.style.height = "5px";
    fr = f.toFixed(1), g = [];
    var c;
    for (i = sp.length - 1; i >= 0; i--) {
        if ((s = Math.round(f * sp[i] * 60) / 60) < mx) break;
        if (f > ma[i]) continue;
        o = tr.cloneNode(true);
        (c = o.cells)[0][tc] = u[i];
        c[1][tc] = ft(s);
        c[2].firstChild.value = fmt.replace(Rf, fr).replace(Rca, fd[1]).replace(Rcd, td[1]).replace(Ra, fp).replace(Rd, tp).replace(Rt, tags[i]);
        c[2].lastChild.addEventListener("click", function () {
            var editinput = $(ed).children("#editInput")[0];
            var value = $(this).prev("input")[0].value;
            if (editinput.value != value) {
                editinput.value = value;
                $(ed).children("input[type='button'][value='OK']")[0].click()
            } else if (ei && ei > 0) {
                var a = location.href = gu() + '&screen=info_command&id=' + ei + '&type=other';
            }
            return false
        }, false);
        g.push(o)
    }
    g.reverse();
    for (i = 0, l = g.length; i < l; i++) {
        bt.appendChild(g[i])
    }
    if (l == 1) c[2].lastChild.focus();
    return
});

if (! document.getElementById("quickbar_outer")) {
    return;
}

function qDebug(text, raw) {
    text = ''+text;
    var dbg = $('#qdebugdiv');
    if (! dbg.length) {
        dbg = $("<div id='qdebugdiv'></div>").attr('class', 'content-border')
            .css({padding: 5, 'background-color':'white', 'white-space':'pre', 'font-family':'arial','margin-bottom':1})
            .appendTo($('#contentContainer')[0].insertRow(0).insertCell(0));
    }
    var d = $("<div></div>").appendTo(dbg);
    if (! raw) d.text(text);
    else d.html(text);
}
	
	/**Making the box width 100% - THX DGF**/
	
    var mainTable = $("#overviewtable");
    var incomingTable = $("#show_incoming_units table.vis:first");
    var outgoingTable = $("#show_outgoing_units");
	
	    var newLayout = "<tbody><tr><td colspan=2><div class='outerBorder' id=myprettynewcell>";
        newLayout += "</div></td></tr></tbody>";
        mainTable.append(newLayout);

        var prettyCell = $("#myprettynewcell");
        prettyCell.append($("#show_incoming_units"));
        prettyCell.append($("#show_outgoing_units"));
	
	/** Return original script **/

/* jQuery Hotkeys Plugin
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* Based upon the plugin by Tzury Bar Yochay:
* http://github.com/tzuryby/hotkeys
*
* Original idea by:
* Binny V A, http://www.openjs.com/scripts/events/keyboard_shortcuts/
*/

(function (jQuery){

    jQuery.hotkeys = {
        version: "0.8",

        specialKeys: {
            8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
            20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
            37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
            96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
            104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/",
            112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
            120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
        },

        shiftNums: {
            "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&",
            "8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<",
            ".": ">",  "/": "?",  "\\": "|"
        }
    };

    function keyHandler( handleObj ) {
        // Only care when a possible input has been specified
        if ( typeof handleObj.data !== "string" ) {
            return;
        }

        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");

        handleObj.handler = function( event ) {
            // Don't fire in text-accepting inputs that we didn't directly bind to
            if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
                event.target.type === "text") ) {
                return;
            }

            // Keypress represents characters, not special keys
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
                character = String.fromCharCode( event.which ).toLowerCase(),
                key, modif = "", possible = {};

            // check combinations (alt|ctrl|shift+anything)
            if ( event.altKey && special !== "alt" ) {
                modif += "alt+";
            }

            if ( event.ctrlKey && special !== "ctrl" ) {
                modif += "ctrl+";
            }

            // TODO: Need to make sure this works consistently across platforms
            if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
                modif += "meta+";
            }

            if ( event.shiftKey && special !== "shift" ) {
                modif += "shift+";
            }

            if ( special ) {
                possible[ modif + special ] = true;

            } else {
                possible[ modif + character ] = true;
                possible[ modif + jQuery.hotkeys.shiftNums[ character ] ] = true;

                // "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
                if ( modif === "shift+" ) {
                    possible[ jQuery.hotkeys.shiftNums[ character ] ] = true;
                }
            }

            for ( var i = 0, l = keys.length; i < l; i++ ) {
                if ( possible[ keys[i] ] ) {
                    return origHandler.apply( this, arguments );
                }
            }
        };
    }

    jQuery.each([ "keydown", "keyup", "keypress" ], function() {
        jQuery.event.special[ this ] = { add: keyHandler };
    });

})( jQuery );


if (game_data["screen"] == 'overview') {
    var div = $("#show_incoming_units");
    if (! div.length || ! div.is(':visible')) return;

    var table = div.find("table");
    var th = table.find("th:first");

    var all = 0;
    var ram = 0;
    var matched = new Object();
    table.find('span[id^="labelText"]').each(function(i,e) {
        if ($(this).parents("td:first").find('img[src*=attack]').length == 0)
            return;
        all++;
        var m = e.textContent.match(/\([0-9]+\|[0-9]+\)/);
        if (!m || matched.hasOwnProperty(m[0]))
            return;
        matched[m[0]] = 1;
        if (e.textContent.match(/[^(]*(Ram|Edel)/) != -1)
            ram++;
    });

    /*if (ram > 0) {
		if (ram == 1) {
        th.append(" ("+ram+" aanval)");
    } else {
		th.append(" ("+ram+" aanvallen)");
	}
	}

    var img = $("<img src='graphic/rename.png' />").css('margin-left', 5).appendTo(th);*/
    var colspan = th.parents("tr:first")[0].cells.length;


    /*******/

   function updateMarks(changed) {
        for (var id in changed) {
            var c = changed[id];
            $(c).next('input[type=button]')[0].click();
        }
    }

    function markAttacks(commands, label, filter, marklast) {
        var changed = new Object();

        var negate = false;
      /*  if (filter && (filter.charAt(0) == '!' || filter.charAt(0) == '/')) {
            negate = true;
            filter = filter.substring(1);
        } else if (! filter) {
            filter = null;
        }*/

        if (label == "_")
            label = label.toLowerCase();
        else
            label = label.toUpperCase();

        for (var i=0; i < commands.length; i++) {
            var c = commands[i];
            var id = c.getAttribute("id").replace("editInput", "label");
            if ($("#"+id.replace('[', '\\[').replace(']', '\\]')).prev('img[src*=attack]').length == 0)
                continue;


            /*if (filter == '$') {
                var marked = $(c).attr('data-marked');
                if (! marked) {
                    continue;
                }
            } else {
                $(c).removeAttr('data-marked');
                if (filter) {
                    var match = c.value.toUpperCase().indexOf(filter) == -1;
                    if (match != negate) continue;
                }
            }*/

            // Special treatment
            if (label  == '_') {
                var match = c.value.match(/^([A-Za-z_]*\s+)?(_+ ?[a-zA-Z]+ ?_*) /);
                if (match) {
                    var old = match[2];
                    c.value = c.value.replace(old, '');
                    if ($.trim(old).toUpperCase() == label.toUpperCase()) {
                        changed[id] = c;
                        continue;
                    }
                }
            }

            var match = c.value.match(/^([A-Z]{2,}) (.*)/);

            /*if (match && negate && filter==='')
                continue; // Filter was anything*/

            if (match && match[1] != 'LC' && match[1] != 'ZC') {
                if (label == match[1]) continue;
                if (label && label[0] == '_')
                    c.value = match[1]+" "+label+" "+match[2];
                else
                    c.value = label+" "+match[2];
            } else {
                c.value = label+" "+c.value;
            }

            $(c).attr('data-marked', true);
            changed[id] = c;
        }

        if (marklast) {
            last_changed = markLast(commands, false);
            for (var id in last_changed) {
                changed[id] = last_changed[id];
            }
        }
        updateMarks(changed);

    }

    function markCheck(commands) {
        commands.each(function (i, e) {
            e = $(e);
            var v = e.val();
            var p = /\s*(LAATSTE|CHECK)$/i;
            var match = v.match(p);
            if (match) {
                if (match[1] == 'LAATSTE') return;
                e.val(v.replace(p, ''));
            } else {
                e.val(v+' CHECK');
            }
            e.next('input[type=button]').click();
        });
    }

    function markLast(commands, click) {
        if (click == undefined)
            click = true;

        var changed = new Object();
        var last = null;
        for (var i=0; i < commands.length; i++) {
            var c = commands[i];

            var id = c.getAttribute("id").replace("editInput", "label");
            if ($("#"+id.replace('[', '\\[').replace(']', '\\]')).prev('img[src*=attack]').length == 0)
                continue;

            if (last) {
                var match = last.value.match(/(.*) LAATSTE$/);
                if (match) {
                    last.value = match[1];
                    changed[last.getAttribute("id")] = last;
                }
            }
            last = c;
        }

        if (last) {
            var match = last.value.match(/(.*) LAATSTE$/);
            if (! match) {
                last.value += " LAATSTE";
                changed[last.getAttribute("id")] = last;
            }
        }

        if (click)
            updateMarks(changed);

        return changed;
    }

    /*******/

    //Hover for individual marks
    $("#show_incoming_units tr").find("td:first").hover(function() {
        $(this).css('background-color', '#DFCCA6').attr('data-mark-me', true);
    }, function (){
        $(this).css('background-color', '').removeAttr('data-mark-me');
    });


    /**keyboard shortcuts */
    var shortcutGenerator = function(label) {
        return function() {
            var filter = null;
            var marklast = false;
            var commands = table.find('td[data-mark-me] input[id^="editInput"]');
            if (commands.length == 0) {
                //if (label && label[0] == '_')
                //    return false; // This one is individual only

                commands = table.find('input[id^="editInput"]');
                marklast = true;
                var filterctrl = $("#speedtagger-filter");
                if (filterctrl.length) {
                    filter = filterctrl.val().toUpperCase();
                    filterctrl.val('$');
                }
            }
            markAttacks(commands, label, filter, marklast);
            return false;
        }
    };
    for (var key in shortcuts) {
        if (! shortcuts.hasOwnProperty(key))
            continue;
        $(document).bind('keydown', key, shortcutGenerator(shortcuts[key]));
    }


   /* (function showFilter() {
        if ($('#speedtagger-filter').length > 0) return;
        var button = $("#speedtagger-tagAll input[type=button]");
        var filter = $("<input type='text' id='speedtagger-filter' value='!' />")
            .attr('title', 'Hernoem alle dat deze tekst bevat. Begin met ! om alles behalve deze te hernoemen.');
        button.before("<br />Filter: ").before(filter);
    })();*/

    (function showMarker() {
        var filter = $("#speedtagger-filter");
        var tr = $("#speedtagger-tagAll");

        if (filter.length && tr.length) {
            tr.remove();
        } else if (tr.length) {
            showFilter();
            $("#speedtagger-filter").focus();
            return false;
        }

        tr = $(table[0].insertRow(1)).attr('id', 'speedtagger-tagAll');
        var cell = $(tr[0].insertCell(0)).attr('colspan', colspan);
		$('<span><b>:::</b></span>').css('margin-right', '10px').appendTo(cell);
		//$('<span><b>Markeren als: </b></span>').appendTo(cell);

       // var input = $("<select></select>").attr('id', 'speedtagger-select').appendTo(cell);
       /* for (var i=0; i < labels.length; i++) {
           $("<option></option>").val(labels[i]).text(labels[i]).appendTo(input);
        }

        for (var shortcut in shortcuts) {
            if (! shortcuts.hasOwnProperty(shortcut))
                continue;
            if (shortcuts[shortcut] && shortcuts[shortcut][0] == '_')
                continue;
            input.find("option[value="+shortcuts[shortcut]+"]").text(shortcuts[shortcut]+' ('+shortcut+')');
        }

        /**Text mode */
       // $("<option></option>").val("").text("Andere").appendTo(input);


/*
        input.change(function() {
            var input = $(this);
            if (input.val())
                return false;
            showCustomMark();
        });

        var button = $("<input type='button'>").val("OK").appendTo(cell).click(function () {
            var input = $("#speedtagger-select")[0];
            var filter = null;
            var commands = table.find('input[id^="editInput"]');
            var filterctrl = $("#speedtagger-filter");
            if (filterctrl.length) {
                filter = filterctrl.val().toUpperCase();
                filterctrl.val('$');
            }
            markAttacks(commands, input.value, filter, true);
            //$("#speedtagger-tagAll").remove();
        });*/
		
		
		    function showCustomMark() {
        $("<input type='text' />").css('width', '7em')
            .replaceAll($('#speedtagger-select'))
            .keypress(function(e) {
                    if(e.which == 13) {
                        $(this).next('input[type=button]').click();
                    }
                })
            .attr('id', 'speedtagger-select')[0].focus();
    }
	
		
		// Button OK
		 var button = $("<input type='button'>").val("OK").appendTo(cell).click(function () {
            var input = "OK";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
        });
		// Button DODGE
		 var button = $("<input type='button'>").val("DODGE").appendTo(cell).click(function () {
            var input = "DODGE";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
        });
		// Button DODGED
		 var button = $("<input type='button'>").val("DODGED").appendTo(cell).click(function () {
            var input = "DODGED";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
        });
		// Button BIJSTACKEN
		 var button = $("<input type='button'>").val("BIJSTACKEN").appendTo(cell).click(function () {
            var input = "BIJSTACKEN";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
		});
		// Button GEVRAAGD
		 var button = $("<input type='button'>").val("GEVRAAGD").appendTo(cell).click(function () {
            var input = "GEVRAAGD";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
		});
		
		$('<span><b>:::</b></span>').css('margin', '10px').appendTo(cell);
		
		// custom BUTTON
			var input1 = $("<input type='text'/>").css('width', '7em').val('').appendTo(cell);
			var button = $("<input type='button'>").val("OK").appendTo(cell).click(function () {
            var input = input1.val();
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
        });
		
		$('<span><b>:::</b></span>').css('margin', '10px').appendTo(cell);
		
		// Button __DUBBEL
		 var button = $("<input type='button'>").val("_DUBBEL").appendTo(cell).click(function () {
            var input = "__DUBBEL";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
		});
		// Button __FAKE
		 var button = $("<input type='button''>").val("_FAKE").appendTo(cell).click(function () {
            var input = "__FAKE";
            var commands = table.find('input[id^="editInput"]');
            markAttacks(commands, input, filter, true);
		});
		
		$('<span><b>:::</b></span>').css('margin', '10px').appendTo(cell);
    })();

    /** Click *//*
    th.click(function (){
        showMarker();
        $('speedtagger-select').focus();
        return false;
    });*/



   /* $(document).bind('keydown', 'c', function() {
        var commands = table.find('td[data-mark-me] input[id^="editInput"]');
        if (commands.length != 0)
            markCheck(commands);
        return false;
    });
    $(document).bind('keydown', 'x', function() {
        if ($('#speedtagger-select').length == 0)
            showMarker();
        showFilter();
        return false;
    });*/

    if (all) {
        /** Create some distance **/
        var tr = table[0].insertRow(table[0].rows.length-1);
        tr.style.height = "8px";

        tr = table[0].insertRow(table[0].rows.length-1);
        var td = $(tr.insertCell(0));
        td.attr('colspan', colspan);

        /** Laatste aanval **/
		
        $("<a href='#'>&raquo; Laatste aanval markeren</a>").appendTo(td)
            .click(function () {
                var commands = table.find('input[id^="editInput"]');
                markLast(commands);
                return false;
            });
    }


} else if (game_data["screen"] == 'info_command') {

    function zeropad(n) {
        n = Math.floor(n);
        return n > 9 ? n : '0' + n;
    }
    function formatDuration(m) {
        return zeropad(m/60)+':'+zeropad(m%60)+':'+zeropad(Math.round(m%1 * 60));
	}
    function parseDuration(s) {
        var match = s.match(/(\d+):(\d{2}):(\d{2})/);
        return parseInt(match[1])*60+parseInt(match[2])+parseInt(match[3])/60;
    }

    var Rt = /{#tag}/g,
        Rf = /{#field}/g,
        Rca = /{#coordatt}/g,
        Rcd = /{#coorddef}/g,
        Ra = /{#attacker}/g,
        Rd = /{#defender}/g;

    var w = location.host.match(/\d+/);
    var looptijden = [9, 10, 11, 18, 22, 30, 35];
    var max = [1500, 1500, 1500, 1500, 1500, 1500, w == 1 ? 1E3 : w == 2 || w == 19 ? 70 : w == 3 ? 100 : w == 5 || w == 10 ? 42 : w == 20 ? 200 : w == 21 ? 200 : 77];
    var labels = ['Scouts', 'Lichte cav.', 'Heavy cav.', 'Bijl/Speer', 'Zwaard', 'Ram/Kata', 'Edel'];

    var pattern = /.*\(((\d{1,3})\|(\d{1,3}))\) .\d+$/;
    var table = $('#label').parents('table').eq(0);
    var r = 0;
    var rows = table[r++].rows;
    var aname = rows[r++].cells[2].textContent;
    var amatch = rows[r++].cells[1].firstChild.textContent.match(pattern);
    var dname = rows[r++].cells[2].textContent;
    var dmatch = rows[r++].cells[1].firstChild.textContent.match(pattern);

    if (rows[r].cells[0].textContent.match(/duur/i))
        r++;

    var arrival = $(table).find("td:contains('Aankomst:')").next('td').text();
	var arrivaltime = arrival.substr(8, 9);
    var time = $(table).find("td:contains('Aankomst in:')").next('td').text();
    var tijd = parseDuration(time);

    var tagmatch = $('#editInput').val().match(/^2bT (\d+) (\d+:\d{2}:\d{2})/);
    var fields = Math.sqrt(Math.pow(amatch[2]-dmatch[2], 2) + Math.pow(amatch[3]-dmatch[3], 2));

    if (tagmatch) {
        time = tagmatch[2];
        if (parseInt(tagmatch[1],0) > 0) {
            $("<a></a>").css('float', 'right').text('Volgende bevel')
                .attr('href', location.href.replace(/id=\d+/, "id="+tagmatch[1]))
                .appendTo(rows[0].cells[0]);
        }
    }

    table.css('width', 600);
    //rows[6].cells[1].textContent += " (Gebruikte tijd: "+time+")";

    // Loopafstand
    //var row = table[0].insertRow(6);
    var tr = $("<tr></tr>").insertBefore($(table).find("td:contains('Aankomst:')").parents('tr:first'));
    $("<td></td>").attr('colspan', 2).text('Loopafstand:').appendTo(tr);
    $("<td></td>").text(Math.round(fields*100)/100+" velden").appendTo(tr);


    var editinput = $("#editInput");
    var troops = table.nextAll('table').find('td.unit-item');
    var tag = null;
    if (troops.length) {
        // Auto tag
        var units = troops.eq(0).parents("table:first").find("tr:first").find("td,th");
        var unitTags = {
            spear:3,
            sword:4,
            axe:3,
            archer:3,
            spy:0,
            light:1,
            marcher:1,
            heavy:2,
            ram:5,
            catapult:5,
            snob:6,
            knight:1,
        }

        tag = 0;
        units.each(function(i, e) {
            var unit = $(e).find("img:first").attr('src');

            if (! unit)
                return;

            unit = unit.match(/unit_([a-z]+)/)[1];

            if (unit in unitTags && parseInt(troops.eq(i).text(),10) > 0) {
                if (unitTags[unit] > tag)
                    tag = unitTags[unit];
            }
        });

        var val = editinput.val();

        if (val == "Aanval" || val == "Bevel" || val == "" || val.match(/^EIGEN /) || val.match(/^2bT (\d+) (\d+:\d{2}:\d{2})/)) {
            var format = fmt2.replace(Rf, Math.floor(fields)).replace(Rca, amatch[1]).replace(Rcd, dmatch[1]).replace(Ra, aname).replace(Rd, dname).replace(Rt, tags[tag]);

            if (editinput.val() != format) {
                editinput.val(format);
                editinput.next("input[type='button'][value='Ok'],input[type='button'][value='OK']").click();
            }
        }

        // Replace format
        fmt = fmt2;

    }

    // Build tag table
    table = $("<table><tr><th>Eenheid</th><th>Looptijd</th><th>Verschil</th><th>Benoemen</th></tr></table>")
        .addClass('vis').css('margin-top', 10)
        .insertAfter(table);

    for (var i=0; i < labels.length; i++) {
        if (tag != null && tag != i)
            continue;
	
        if (max[i] < fields) break;
        var looptijd = looptijden[i]*fields;
        if (tijd > looptijd) continue;
		var tussentijd = formatDuration(looptijd-tijd);
		/*var huidigetijd = $('#serverTime').text();
		var huidigetijd2 = parseDuration(huidigetijd);*/
		/*var arrivaltime2 =  parseDuration(arrivaltime);
		alert(arrivaltime2);
		var verstuurtijd = arivaltime2-looptijd;*/

        var format = fmt.replace(Rf, Math.floor(fields)).replace(Rca, amatch[1]).replace(Rcd, dmatch[1]).replace(Ra, aname).replace(Rd, dname).replace(Rt, tags[i]);
        var row = $("<tr></tr>").appendTo(table);

        $("<td></td>").text(labels[i]).appendTo(row);
        //$("<td></td>").css('text-align', 'right').css('padding', 5).text(time).appendTo(row);
        $("<td></td>").css('padding', 5).text(formatDuration(looptijd)).appendTo(row);
//		$("<td></td>").css('padding', 5).text(aankomsttijd-looptijd).appendTo(row);
        $("<td></td>").css('padding', 5).text(tussentijd).appendTo(row);


        $("<td><input type='text' /><input type='button' value='OK' /></td>").appendTo(row).find('input')
            .eq(0).val(format).css('width', 250).end()
            .eq(1).click(function () {
                var editinput = $("#editInput");
                var value = $(this).prev("input").val();
                if (editinput.val() != value) {
                    editinput.val(value);
                	  editinput.next("input[type='button'][value='Ok'],input[type='button'][value='OK']").click();
                } else if (tagmatch && tagmatch[1] > 0) {
                    /* Volgende bevel */
                    location.href = location.href.replace(/id=\d+/, "id="+tagmatch[1]);
                }
                return false;
            });
    }

    if (table[0].rows.length == 2) {
        table.find('input[type=button]')[0].focus();
    } else {
        table.find('td:contains("Ram/Kata")').nextAll('td').find('input[type=button]')[0].focus();
    }

    return
}


/**Markeren van aanvallen**/
    
else if (kleurtjes && game_data["screen"] == "overview_villages" && game_data["mode"] == 'incomings') {
    var addColor = function(label, color) {
        var span = $("<span></span>").text(" ")
            .attr("data-speedtagger", "color")
            .css({display:'inline-block',width:8,height:8, 'background-color':color, 'border':'1px solid black', 'vertical-align':'middle', 'margin-left':3, 'margin-right':3})
            .insertBefore(label);
    }

    var defcolor = '#FF2900';
    //var patterns = [/^[_ ]*(safe|ok|stacked|dood|fake|blocked)/i, '#008000', /^[_ ]*(ontweken|dodged)/i, '#C0BD0B', /^[_ ]*(ontwijk|dodge[^d]|os|(bij)?stacken|gevr(aagd)?)/i, '#FFBF00'];
    var patterns = [/^[_ ]*(safe|ok|stacked|dood|block(ed)?)/i, '#40FF00',
                    /^[_ ]*(ontweken|dodged)/i, '#82FA58',
                    /^[_ ]*(gevr(aagd)?)/i, '#FFFF00',
                    /^[_ ]*(ontwijk(en)?|dodge)/i, '#FF8000',
					/^[_ ]*(os|(bij)?stacken)/i, '#0000FF',
					/^[_ ]*(MARKEREN|Aanval|2bT)/i, '#FF0000'];


    var labels = $("#incomings_table").find("span[id^=labelText]");

    unsafeWindow.speedtagger_defcolor = defcolor;
    unsafeWindow.speedtagger_patterns = patterns;
    unsafeWindow.speedtagger_labels = labels;

    patterns = unsafeWindow.speedtagger_patterns;

    labels.each(function (i, label) {
        label = $(label);
        if (label.parent("a.attack-icon").length == 0) {
            return;
        }

        for (var j=0; j < patterns.length; j+=2) {
            if (patterns[j].exec(label.text())) {
                addColor(label, patterns[j+1]);
                label = 0;
                break;
            }
        }
        if (label) {
            addColor(label, defcolor);
        }
    });
}




/**Markeren van rapportjes**/

else if (game_data["screen"] == "report") {
    var patterns = [/(LAATSTE?)[_ !*]*\)\s*$/i, /(TERUG(STUREN)?(\s*[0-9]+)?)[_ !*]*\)\s*$/i, /(CHECK)[_ !*]*\)\s*$/i];
    var span = $("span[id^=labelText]");
    for (var i=0; i < span.length; i++) {
        var s = span[i];
        for (var j=0; j < patterns.length; j++) {
            var p = patterns[j];
            s.innerHTML = s.innerHTML.replace(p, "<span style='background-color:#CE4E4E; color: black;'>$1</span>");
        }
    }
}


})();