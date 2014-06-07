// ==UserScript==
// @name        MassTagerT_++
// @namespace      av.com & sake
// @description       De tagger zoals de tagger ooit bedoeld was.
// @author 			rookmaster
// @include            http://nl*.tribalwars.nl/game.php?village=*&mode=incomings*
// @include         http://*.tribalwars.nl/game.php?*&mode=incomings*&subtype=attacks*
// @include         http://nl19.tribalwars.nl/game.php?village=19511&mode=incomings&subtype=attacks&screen=overview_villages&page=-1&group=0
// @include            http://nl*.tribalwars.nl/game.php?village=*&screen=overview
// @include            http://nl*.tribalwars.nl/game.php*screen=report*
// @icon                http://www.tribalwars.nl/graphic/rabe.png
/*TW v8.9 fix by Patricier */ 
// ==/UserScript==
(function () {
    var kleurtjes = 1;
    if (window.opera) {
        unsafeWindow = window;
    }
    var $ = unsafeWindow.$;
    var jQuery = unsafeWindow.jQuery;
    var game_data = unsafeWindow.game_data;
    var labels = ['BLOCKED', 'DODGE', 'dodged', 'CHECK_STACK', '-----------------------------------------Herbekijken', 'OSnodig'];
    var shortcuts = {
            'b' : 'BLOCKED',
            'd' : 'DODGE',
            'q' : 'dodged',
            'c' : 'CHECK_STACK',
            'h' : '-----------------------------------------Herbekijken',
            'o' : 'OSnodig'
        };
    if (!document.getElementById("quickbar_outer")) {
        return;
    }
    function qDebug(text, raw) {
        text = '' + text;
        var dbg = $('#qdebugdiv');
        if (!dbg.length) {
            dbg = $("<div id='qdebugdiv'></div>").attr('class', 'content-border')
                    .css({padding: 5, 'background-color' : 'white', 'white-space' : 'pre', 'font-family' : 'arial', 'margin-bottom' : 1})
                    .appendTo($('#contentContainer')[0].insertRow(0).insertCell(0));
        }
        var d = $("<div></div>").appendTo(dbg);
       if (! raw) d.text(text);
       else d.html(text);
    };

(function(jQuery){

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
        if ( typeof handleObj.data !== "string" ) {
            return;
        }
        var origHandler = handleObj.handler,
            keys = handleObj.data.toLowerCase().split(" ");
        handleObj.handler = function( event ) {
            if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) ||
                event.target.type === "text") ) {
                return;            }
            var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
                character = String.fromCharCode( event.which ).toLowerCase(),
                key, modif = "", possible = {};
            if ( event.altKey && special !== "alt" ) {
                modif += "alt+";
            }
            if ( event.ctrlKey && special !== "ctrl" ) {
                modif += "ctrl+";
            }
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
    if (! div.length) return;
    var table = div.find("table");
    var th = table.find("th:first");
    var all = 0;
    table.find('span[id^="labelText"]').each(function(i,e) {
        if ($(this).parents("td:first").find('img[src*=attack]').length == 0)
            return;
        all++;
    });
    var img = $("<img src='graphic/unit/def.png' />").css('margin-left', 5).appendTo(th);
    var colspan = th.parents("tr:first")[0].cells.length;


    function updateMarks(changed) {
        for (var id in changed) {
            var c = changed[id];
            $(c).next('input[type=button]')[0].click();
        }
    }

    function markAttacks(commands, label, filter, marklast) {
        var changed = new Object();

        var negate = false;
        if (filter && (filter.charAt(0) == '!' || filter.charAt(0) == '/')) {
            negate = true;
            filter = filter.substring(1);
        } else if (! filter) {
            filter = null;
        }

        if (label && label[0] == '_')
            label = label.toLowerCase();
        else
            label = label.toUpperCase();

        for (var i=0; i < commands.length; i++) {
            var c = commands[i];
            var id = c.getAttribute("id").replace("editInput", "label");
            if ($("#"+id.replace('[', '\\[').replace(']', '\\]')).prev('img[src*=attack]').length == 0)
                continue;


            if (filter == '$') {
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
            }

            // Special treatment
            if (label && label[0] == '_') {
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

            if (match && negate && filter==='')
                continue; // Filter was anything

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



    // Hover for individual marks
    $("#show_incoming_units td").hover(function() {
        $(this).attr('data-mark-me', true);
    }, function (){
//        $(this).removeAttr('data-mark-me');
    });


// Keyboard shortcuts 
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


    function showFilter() {
        if ($('#speedtagger-filter').length > 0) return;
        var button = $("#speedtagger-tagAll input[type=button]");
        var filter = $("<input type='text' id='speedtagger-filter' value='!' />")
            .attr('title', 'Hernoem alle dat deze tekst bevat. Begin met ! om alles behalve deze te hernoemen.');
        button.before("<br />Filter: ").before(filter);
    }

    function showMarker() {
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
        var cell = $(tr[0].insertCell(0)).text("Markeren als: ").attr('colspan', colspan);

        var input = $("<select></select>").attr('id', 'speedtagger-select').appendTo(cell);
        for (var i=0; i < labels.length; i++) {
            $("<option></option>").val(labels[i]).text(labels[i]).appendTo(input);
        }

        for (var shortcut in shortcuts) {
            if (! shortcuts.hasOwnProperty(shortcut))
                continue;
            if (shortcuts[shortcut] && shortcuts[shortcut][0] == '_')
                continue;
            input.find("option[value="+shortcuts[shortcut]+"]").text(shortcuts[shortcut]+' ('+shortcut+')');
        }

        // Text mode 
        $("<option></option>").val("").text("Andere").appendTo(input);



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
            $("#speedtagger-tagAll").remove();
        });
    }

    // Click 
    th.click(function (){
        showMarker();
        $('speedtagger-select').focus();
        return false;
    });



    $(document).bind('keydown', 'c', function() { showMarker(); showCustomMark(); return false; });
    $(document).bind('keydown', 'x', function() {
        if ($('#speedtagger-select').length == 0)
            showMarker();
        showFilter();
        return false;
    });

    if (all) {
        // Create some distance 
        var tr = table[0].insertRow(table[0].rows.length-1);
        tr.style.height = "8px";

        tr = table[0].insertRow(table[0].rows.length-1);
        var td = $(tr.insertCell(0));
        td.attr('colspan', colspan);

        // Laatste aanval 
        $("<a href='#'>&raquo; Laatste aanval markeren</a>").appendTo(td)
            .click(function () {
                var commands = table.find('input[id^="editInput"]');
                markLast(commands);
                return false;
            });
    }


} 


    // Markeren van rapportjes

else if (game_data["screen"] == "report") {
var patterns = [/(LAATSTE?)_*\)/i, /(TERUG(\s*[0-9]+)?)_*\)/i, /(CHECK)_*\)/i];
    var span = $("span[id^=labelText]");
    for (var i=0; i < span.length; i++) {
        var s = span[i];
        for (var j=0; j < patterns.length; j++) {
            var p = patterns[j];
            s.innerHTML = s.innerHTML.replace(p, "<span style='background-color:#FA1B02; color: black;'>$1</span>");
        }
    }
};// lol
var mtT_config = {
 'speed': {'Scout':4,'LC':5,'ZC':6,'Bijl':9,'Zwaard':11,'Ram/kata':15,'______________________________EDEL!!':17},
 'texts': {'unknown':'Onbekend: ','estimated':'Geschat: ','hour':'u'},
 'min_attacks': 8,
 'bot_detected': false,
 'surl': (unsafeWindow.game_data.player.sitter_id>0)?'&t='+unsafeWindow.game_data.player.id:''
}

unsafeWindow.mtT_Dec2Hrs = function(d) {
 var m=d-Math.floor(d),
  m=m*60/100;
 return Math.floor(d)+Math.round(m*100)/100;
}
unsafeWindow.mtT_Attacker = function(cmd,lnk,inp,coords,time_known,ms) {
 if (mtT_config.bot_detected) return;
 var sec = inp[0].value.match(/Aanval \{(\d+)s}/);
 
 if ((sec)&&(sec.length==2)) {
  sec = sec[1];
  var _url = unsafeWindow.game_data.link_base_pure.replace('&screen=','&screen=info_command')+'&id='+cmd+'&type=other';

  lnk.style.fontWeight = 'normal';
  
  setTimeout(function() {
   unsafeWindow.jQuery.ajax({
    url: _url,
    success: function success(data, textStatus, jqXHR) {
     if (mtT_config.bot_detected) return;
     var bot = data.match(/id=.*bot_check_image.*id=.*bot_check_code/);
     if (bot) {
      mtT_config.bot_detected = true;
      alert('bot-detection detected!');
      return;
     }
    
     var v = '';
     var vl = data.match(/<a.*village=\d+.*id=\d+.*screen=info_village.*>.*\((\d+\|\d+)\).*<\/a>/);
     if ((vl)&&(vl.length==2)) {
      var f = coords.split('|'),
       t = vl[1].split('|'),
	   
       q=Math.sqrt(Math.pow(f[0]-t[0],2)+Math.pow(f[1]-t[1],2)),
       m = Math.round((sec/60/q)*100)/100;
    
      for (var key in mtT_config.speed) {
       if (m <= mtT_config.speed[key]) {
        if (!time_known) { v += mtT_config.texts.unknown; }
        v += key+(time_known?'':'+');
        break;
       }
      }
      v += ' ('+vl[1]+')';
     }
//     var pl = data.match(/<a.*village=\d+.*screen=info_player.*id=\d+.*>(.*)<\/a>/);
    var pl = data.match(/<a.*village=\d+.*screen=info_player.*id=\d+.*>(.*)<\/a>/);
     if ((pl)&&(pl.length==2)) {
      v += ' '+pl[1];
     }
     if (!time_known) v+= ' {T'+unsafeWindow.mtT_Dec2Hrs(sec/3600)+mtT_config.texts.hour+'}';
     if (v != '') {
      inp[0].value = v;
      inp[1].click();
     
      lnk.parentNode.className = 'selected';
     }
     lnk.style.fontWeight = '';
    }
   });
  },ms);
 }
}
unsafeWindow.mtT_Tag = function(time_known) {

 seconds=function(val){
  val=val.split(":");
  return 3600*val[0]+60*val[1]+parseInt(val[2]);
 };
 
 var t = document.getElementById('incomings_table');
 console.log("1: " + t);
 if (t) {
  var lnk,p,m,id,s,c,f,x,att=[];
  for (var i=0;i<t.rows.length;i++) {
   lnk = t.rows[i].cells[0].getElementsByClassName('attack-icon');
   //console.log("2: " + lnk.length);
   if ((lnk)&&(lnk.length==1)) {
    p = '&id=(\\d+)';	
	if ((lnk[0].href.indexOf('id=') > -1) && (lnk[0].href.indexOf('&type=other') > -1) && (lnk[0].href.indexOf('&screen=info_command') > -1)) m = lnk[0].href.match(p);
	//console.log("4: " + m);
    if ((m)&&(m.length==2)) {
     id = m[1];
     s = lnk[0].getElementsByTagName('span')[0].firstChild.nodeValue;
     if (s.substr(0,6)=='Aanval') {
      c = t.rows[i].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
      f = t.rows[i].cells[0].getElementsByTagName('span')[2].getElementsByTagName('input');
      
      if (s.match(/\{\d+s}/)) {
       att.push([id,lnk[0],f,c]);
      } else if (s.length==6) {
       x = t.rows[i].cells[4].getElementsByClassName('timer');
       if ((x)&&(x.length==1)) {
        s = seconds(x[0].firstChild.nodeValue);
        f[0].value = 'Aanval {'+s+'s}';
        f[1].click();
        att.push([id,lnk[0],f,c]);
       }
      }
     }
    }
   }
  }
  
  if (att.length>0) {
   if (confirm('Er '+(att.length==1?'is ':'zijn ')+att.length+(att.length==1?' aanval':' aanvallen')+' om te taggen, doorgaan?')) {
    var ms = 50;
    for (i=0;i<att.length;i++) {
     unsafeWindow.mtT_Attacker(att[i][0],att[i][1],att[i][2],att[i][3],time_known,ms);
     ms += 50;
    }
   }
  } else {
   alert('Er zijn geen aanvallen om te taggen.');
  }
 }
}
unsafeWindow.mtT_Estimate = function() {
 var t = document.getElementById('incomings_table');
 if (t) {
  var lnk,id,s,c,f,p,k,m,est=[],att=[];
  for (var i=0;i<t.rows.length;i++) {
   lnk = t.rows[i].cells[0].getElementsByClassName('attack-icon');
   if ((lnk)&&(lnk.length==1)) {
 p = '&id=(\\d+)';	
	if ((lnk[0].href.indexOf('id=') > -1) && (lnk[0].href.indexOf('&type=other') > -1) && (lnk[0].href.indexOf('&screen=info_command') > -1)) m = lnk[0].href.match(p);
    if ((m)&&(m.length==2)) {
     id = m[1];
     s = lnk[0].getElementsByTagName('span')[0].firstChild.nodeValue;
     p = '^(?!'+mtT_config.texts.estimated+')('+mtT_config.texts.unknown+')?.*(';
     for (k in mtT_config.speed) {
      p+= k+'|';
     }
     p = p.slice(0,-1)+')\\+?.* \\((\\d+\\|\\d+)\\)(.*)';
     m = s.match(p);
     if (m) {
      if (m[1]==mtT_config.texts.unknown) {
       est[est.length] = Array(id,-1,-1,i,m[3],m[4]);
      } else {
       att[att.length] = Array(id,m[2],m[3],i,-1);
      }
     }
    }
   }
  }
  
  if (est.length==0) { alert('Er zijn geen onbekende aanvallen om te schatten.'); return; }
  if (att.length<2) { alert('Er zijn niet genoeg bekende aanvallen om te schatten.'); return; }
  if (!confirm('Er '+((est.length==1)?'is ':'zijn ')+est.length+' onbekende '+((est.length==1)?'aanval':'aanvallen')+', doorgaan?')) return;
   
  att.sort();
  var i,y;
  for (i=0;i<att.length;i++) {
   for (y=0;y<est.length;y++) {
    if (est[y][0] > att[i][0]) {
     est[y][1] = i;
    } else {
     est[y][2] = i;
     continue;
    }
   }
  }

  function seconds(val){
   val=val.split(":");
   return 3600*val[0]+60*val[1]+parseInt(val[2]);
  };
  function distance(from,to) {
   var f=from.split('|'),t=to.split('|');
   return Math.sqrt(Math.pow(f[0]-t[0],2)+Math.pow(f[1]-t[1],2));
  };
  function ttime(from,to,unit) {
   return Math.round((mtT_config.speed[unit]*60)*distance(from,to));
  };
  function accuracy(diff,rnd,avg) {
   var c1=5000,c2=100000,c3=c2*10;
   var f1=5,f2=10,f3=50;
   if (avg) diff=diff/(mtT_config.min_attacks/15);
   var ac = (diff<=c1)?(diff/c1)*f1:(diff<=c2)?f1+(diff/c2)*f2:(diff<=c3)?f2+(diff/c3)*70:-1;
   if (ac!=-1) {
    ac = Math.floor((100-ac)*rnd)/rnd;
   } else {
    ac = '<30';
   }
   return ac;
  }
   
  var cnt=0,b,a,c,tm,s;
  for (i=0;i<est.length;i++) {
   if ((est[i][1]!=-1)&&(est[i][2]!=-1)) {
    b = att[est[i][1]];
    if (b[4]==-1) {
     c = t.rows[b[3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
     tm = t.rows[b[3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      tm = ttime(c,b[2],b[1]);
      att[est[i][1]][4] = (tm-s);
      b[4] = (tm-s);
     }
    }

    a = att[est[i][2]];
    if (a[4]==-1) {
     c = t.rows[a[3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
     tm = t.rows[a[3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      tm = ttime(c,a[2],a[1]);
      att[est[i][2]][4] = (tm-s);
      a[4] = (tm-s);
     }
    }
    
    if ((b[4]!=-1)&&(a[4]!=-1)) {
     
     var diff = (b[4]-a[4]),
      tid = (a[0]-b[0]),
      did = (a[0]-est[i][0]),
      pct = (did/tid),
      xx = diff*(did/tid),
      zz = Math.round(a[4]+(diff*pct));
     
     tm = t.rows[est[i][3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      zz += s;
      
      var from = est[i][4];
      var to = t.rows[est[i][3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
      var inp = t.rows[est[i][3]].cells[0].getElementsByTagName('span')[2].getElementsByTagName('input');
      var dist = distance(from,to);
      var mpf = Math.floor(((zz/dist)/60)*100)/100;
      var val = mtT_config.texts.estimated;
      
      for (var key in mtT_config.speed) {
       if (mpf <= mtT_config.speed[key]) {
        val += key;
        break;
       }
      }
      val += ' ('+from+')'+est[i][5];
      
      ac = accuracy(diff,10);
      
      val += ' ['+ac+'%]';
      val += ' {'+unsafeWindow.mtT_Dec2Hrs(zz/3600)+mtT_config.texts.hour+'}';

      inp[0].value = val;
      inp[1].click();
      
      t.rows[est[i][3]].className = 'selected';
      
      cnt++;
     }
    }
   }
  }
  
  var z = est.length-cnt;
  if (z>0) {
   
   if (!confirm('Voor '+z+((z==1)?' aanval':' aanvallen')+' is geen voor of na bekend, schatten o.b.v. gemiddelde?')) return;
   if (att.length<=mtT_config.min_attacks) { alert('Er zijn niet genoeg aanvallen bekend voor een schatting o.b.v. het gemiddelde.'); return; }
   
   var avg=0,tot=0,cnt=0;
   for (z=0;z<att.length;z++) {
    a = att[z];
    if (a[4]==-1) {
     c = t.rows[a[3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
     tm = t.rows[a[3]].cells[4].getElementsByClassName('timer');
     if ((tm)&&(tm.length==1)) {
      s = seconds(tm[0].firstChild.nodeValue);
      tm = ttime(c,a[2],a[1]);
      att[z][4] = (tm-s);
      a[4] = (tm-s);
     }
    }
    if (a[4]!=-1) {
     if (cnt>0) {
      if (att[z-1][4]-a[4]<0) continue;
      avg = (att[z-1][4]-a[4])/(a[0]-att[z-1][0]);
      tot += avg;
     }
     cnt++;
    }
   }
   
   if (cnt>1) {
    avg = tot/(cnt-1);
    cnt = 0;
    
    for (z=0;z<est.length;z++) {
     s = -1;
     diff = -1;
     if (est[z][1]!=-1) {
      b = att[est[z][1]];
      diff = est[z][0]-b[0];
      s = b[4]-avg*diff;
     } else if (est[z][2]!=-1) {
      a = att[est[z][2]];
      diff = a[0]-est[z][0];
      s = a[4]+avg*diff;
     }
     
     if (s!=-1) {
      tm = t.rows[est[z][3]].cells[4].getElementsByClassName('timer');
      if ((tm)&&(tm.length==1)) {
       s += seconds(tm[0].firstChild.nodeValue);
     
       var from = est[z][4];
       var to = t.rows[est[z][3]].cells[1].getElementsByTagName('a')[0].firstChild.nodeValue.match(/.*\((\d+\|\d+)\).*/)[1];
       var inp = t.rows[est[z][3]].cells[0].getElementsByTagName('span')[2].getElementsByTagName('input');
       var dist = distance(from,to);
       var mpf = Math.round((s/dist)/60);
       
       var val = mtT_config.texts.estimated;
       for (var key in mtT_config.speed) {
        if (mpf <= mtT_config.speed[key]) {
         val += key;
         break;
        }
       }
       val += ' ('+from+')'+est[z][5];
       
       ac = accuracy(diff,10,true);
       
       val += ' [D'+ac+'%]';
       val += ' {'+unsafeWindow.mtT_Dec2Hrs(s/3600)+mtT_config.texts.hour+'}';
     
       t.rows[est[z][3]].className = 'selected';

       inp[0].value = val;
       inp[1].click();
      
       cnt++;
      }
     }
    }
    if (cnt>0) {
     alert('Er '((cnt==1)?'is ':'zijn ')+cnt+((cnt==1)?' aanval':' aanvallen')+' geschat m.b.v. het gemiddelde verschil.');
    }
   }
  } else {
   alert('Er '((cnt==1)?'is ':'zijn ')+cnt+((cnt==1)?' aanval':' aanvallen')+' geschat m.b.v. voor en na.');
  }
 }
}
unsafeWindow.mtT_Manual = function() {
 seconds=function(val){
  val=val.split(":");
  return 3600*val[0]+60*val[1]+parseInt(val[2]);
 };
 
 var t = document.getElementById('incomings_table');
 if (t) {
  var lnk,p,m,s,c,ids=[];
  c = document.createElement('th');
  c.appendChild(document.createTextNode('#'));
  c.style.textAlign = 'center';
  t.rows[0].insertBefore(c,t.rows[0].cells[0]);
  c = document.createElement('th');
  c.appendChild(document.createTextNode('ID'));
  t.rows[0].insertBefore(c,t.rows[0].cells[1]);
  for (var i=1;i<(t.rows.length-1);i++) {
   c = t.rows[i].insertCell(0);
   c.style.textAlign = 'center';
   c.appendChild(document.createTextNode(''));
   c = t.rows[i].insertCell(1);
   lnk = t.rows[i].cells[2].getElementsByClassName('attack-icon');
   if ((lnk)&&(lnk.length==1)) {
	p = '&id=(\\d+)';	
//	if ((lnk[0].href.indexOf('id=') > -1) && (lnk[0].href.indexOf('&type=other') > -1) && (lnk[0].href.indexOf('&screen=info_command') > -1)) m = lnk[0].href.match(p);
	if ((lnk[0].href.indexOf('id=') > -1) && (lnk[0].href.indexOf('&mode=incomings') > -1) && (lnk[0].href.indexOf('&screen=overview_villages') > -1)) m = lnk[0].href.match(p);	
    if ((m)&&(m.length==2)) {
     c.appendChild(document.createTextNode(m[1]));
     ids[ids.length] = [m[1],i];
    }
   }
  }
  c = document.createElement('th');
  c.colSpan = 2;
  t.rows[i].insertBefore(c,t.rows[i].cells[0]);
  
  function moverow(row,idx) {
   t.tBodies[0].insertBefore(t.tBodies[0].removeChild(t.tBodies[0].rows[row]),t.tBodies[0].rows[idx]);
  }
  
  ids.sort(function(a,b){return (a[0]-b[0]);});
  
  for (i=0;i<ids.length;i++) {
   t.rows[ids[i][1]].cells[0].firstChild.nodeValue = (i+1);
  }

  var curr,nrow,prev=-1,loop;
  for (curr=1;curr<(t.rows.length-1);) {
   nrow = t.rows[curr].cells[0].firstChild.nodeValue;
   if (!nrow) { curr++; continue; }
   if (nrow==curr) { curr++; continue; }
   if (curr==prev) { loop++; if(loop>t.rows.length){alert('possible infinite loop: breaking from code!');break;}} else { prev=curr; loop=0; }
   moverow(curr,nrow);
  }}
  }
  
   unsafeWindow.mtT_Kleurtjes= function() {
 //sake
 if (kleurtjes && game_data["screen"] == "overview_villages" && game_data["mode"] == 'incomings') {

    var addColor = function(label, color) {
        var span = $("<span></span>").text(" ")
            .attr("data-speedtagger", "color")
           .css({display:'inline-block',width:8,height:8, 'background-color':color, 'border':'1px solid black', 'vertical-align':'middle', 'margin-left':3, 'margin-right':3})
           .insertBefore(label);
 //          .insert(label);
  }
    var defcolor = '#FF2900';
    var patterns = [/^[_ ]*(safe|BLOCKED|OK|ok|stacked|dood|fake|block(ed)?)/i, '#008000',
                    /^[_ ]*(ontweken|dodged|)/i, '#F70AE8',					
                    /^[_ ]*(Herbekijken|os|OS|OS_BIJ|gevr(aagd)?)/i, '#490AF7',						
                    /^[_ ]*(ontwijk[^d]|(bij)?stacken)/i, '#F1880F'];
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
}
// sake fake

unsafeWindow.mtT_Herkomstatts =function() {
(function (){
var type = 2;  var fakeCount = 0; 
var table = document.getElementById("incomings_table");
var rows = table.getElementsByTagName("tr");

//-------Debugger---------
function fnDebugger(m) {
    if ($('#' + this._debugID).length <= 0) {
        $('body').append('<div id="' + this._debugID + '"></div>');
    }

    $('#' + this._debugID).append('<span id="' + ((typeof (id) == 'undefined') ? '' : id) + '">' + m + '</span><br/>');
}

var allcoord = new Array(rows.length);
for (i = 1; i < rows.length - 2; i++) {
    cells = rows[i].getElementsByTagName("td");

    var contents = ($(cells[0].getElementsByTagName("a")[0].firstChild).text());

    allcoord[i - 1] = contents.match(/\d+\|\d+/);


}
var data = "";

function removeDuplicateElement(arrayName) {
    var newArray = new Array();
    label: for (var i = 0; i < arrayName.length; i++) {
    for (var j = 0; j < newArray.length; j++) {
        //fnDebugger("Old Array: " + arrayName[i]);
        //fnDebugger("New Array: " + newArray[j]);
        if (!(newArray[j] == undefined) && !(arrayName[i] == undefined)) {
            if (newArray[j].toString() == arrayName[i].toString()) {
                continue label;
               //fnDebugger("I MATCHED: " + newArray[j] + "--- " + arrayName[i]);
               //fnDebugger("J: " + j + "--- I: " + i);
            }
        } 
    }
        newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}


data = removeDuplicateElement(allcoord);

//alert("data\n" + data)
//alert("allcoord\n" + allcoord)
var output = "";
var unnamed = 0;
for (y = 0; y < data.length - 1; y++) {
    var counter = 0;
    for (i = 1; i < rows.length - 1; i++) {
        cells = rows[i].getElementsByTagName("td");
        var contents = ($(cells[0].getElementsByTagName("a")[0].firstChild).text());

        if (contents.match(/\d+\|\d+/g)) {
            contents = contents.match(/\d+\|\d+/g);
            if (data[y] == contents[0]) {
                counter += 1
            }
        }
        else {
            unnamed++;
        }
       // alert(counter);
    }
    if (counter > fakeCount) {
        output += data[y] + "\t\t-\t " + counter + "\n";
    }


}

if (type == 1) {
    //Alert
    alert("From \t\t Totaal\n" + output + "\n\n Er zijn " + unnamed  + " tags die geen (xxx|yyy) hebben.\n\nAls Inkleuren aan staat dan werkt de tool niet.\n(herlaad pagina)");
}
    //Pop up

    var outputData = "";
    outputData += "<textarea cols='42' rows='50'>\n";
    outputData += "Uit dorp\t-\tTotaal\n" + output;
    outputData +=  "\n\nEr zijn " + unnamed + " tags die geen juiste (xxx|yyy) hebben.\n\nAls Inkleuren aan staat dan werkt de tool niet.\n(herlaad pagina)";
    outputData += "</textarea><br/>\n";
    var popup = window.open('about:blank','fake','width=400,height=480,scrollbars=yes');
    popup.document.open('text/html', 'replace');
    popup.document.write(outputData);
    popup.document.close();
	
void(0);


})();
}
unsafeWindow.mtT_Manual = function() {
 seconds=function(val){
  val=val.split(":");
  return 3600*val[0]+60*val[1]+parseInt(val[2]);
 };
 
 var t = document.getElementById('incomings_table');
 if (t) {
  var lnk,p,m,s,c,ids=[];
  c = document.createElement('th');
  c.appendChild(document.createTextNode('#'));
  c.style.textAlign = 'center';
  t.rows[0].insertBefore(c,t.rows[0].cells[0]);
  c = document.createElement('th');
  c.appendChild(document.createTextNode('ID'));
  t.rows[0].insertBefore(c,t.rows[0].cells[1]);
  for (var i=1;i<(t.rows.length-1);i++) {
   c = t.rows[i].insertCell(0);
   c.style.textAlign = 'center';
   c.appendChild(document.createTextNode(''));
   c = t.rows[i].insertCell(1);
   lnk = t.rows[i].cells[2].getElementsByClassName('attack-icon');
   if ((lnk)&&(lnk.length==1)) {
    p = mtT_config.surl+'&screen=info_command'+'&id=(\\d+)&type=other'; // --> sake nog te testen
    m = lnk[0].href.match(p);
    if ((m)&&(m.length==2)) {
     c.appendChild(document.createTextNode(m[1]));
     ids[ids.length] = [m[1],i];
    }
   }
  }
  c = document.createElement('th');
  c.colSpan = 2;
  t.rows[i].insertBefore(c,t.rows[i].cells[0]);
  
  function moverow(row,idx) {
   t.tBodies[0].insertBefore(t.tBodies[0].removeChild(t.tBodies[0].rows[row]),t.tBodies[0].rows[idx]);
  }
  
  ids.sort(function(a,b){return (a[0]-b[0]);});
  
  for (i=0;i<ids.length;i++) {
   t.rows[ids[i][1]].cells[0].firstChild.nodeValue = (i+1);
  }

  var curr,nrow,prev=-1,loop;
  for (curr=1;curr<(t.rows.length-1);) {
   nrow = t.rows[curr].cells[0].firstChild.nodeValue;
   if (!nrow) { curr++; continue; }
   if (nrow==curr) { curr++; continue; }
   if (curr==prev) { loop++; if(loop>t.rows.length){alert('possible infinite loop: breaking from code!');break;}} else { prev=curr; loop=0; }
   moverow(curr,nrow);
  }
  
  document.getElementById('mtT_btnTagKnown').disabled = true;
  document.getElementById('mtT_btnTagUnknown').disabled = true;
  document.getElementById('mtT_btnEstimate').disabled = true;
  document.getElementById('mtT_btnManual').disabled = true;
  document.getElementById('mtT_Kleurtjes').disabled = true;
  document.getElementById('mtT_Herkomstatts').disabled = true; 
 }
}
 //alert('sake');
function mtT_Main() {
//   alert('sake');
 var tbl = document.getElementById('incomings_table');
 if (tbl) {
  t = document.createElement('table');
  t.className ='vis modemenu'; // 'vis modemenu';
  var r = t.insertRow(-1);
  c = r.insertCell(-1);
  c.style.padding = '3px';
  var img = document.createElement('img');
  img.src = 'graphic/unit/att.png?';
  c.appendChild(img);

  c = r.insertCell(-1);
  c.style.fontWeight = 'bold';
  c.style.paddingRight = '10px';
  c.appendChild(document.createTextNode('MassTaggerT'));
  
  var b = document.createElement('input');
  b.id = 'mtT_btnTagKnown';
  b.type = 'button';
  b.style.background = "#99F7C5";
  b.value = 'Taggen!';
  b.style.fontWeight = 'bold'; 
  b.setAttribute('onclick','mtT_Tag(true);');
   c = r.insertCell(-1);
  c.appendChild(b);
  
  b = document.createElement('input');
  b.id = 'mtT_btnTagUnknown';
  b.type = 'button';
  b.style.background = "#FA9393";
  b.value = 'Tijd niet bekend, Taggen';
  b.setAttribute('onclick','mtT_Tag(false);');
   c = r.insertCell(-1);
  c.appendChild(b);
  
  b = document.createElement('input');
  b.id = 'mtT_btnEstimate';
  b.type = 'button';
  b.style.background = "#99DDF7";
  b.value = 'Schat de niet bekende met ID\'s';
  b.setAttribute('onclick','mtT_Estimate();');
  c = r.insertCell(-1);
  c.appendChild(b);
  
  b = document.createElement('input');
  b.id = 'mtT_btnManual';
  b.type = 'button';
  b.style.background = "#99DDF7";
  b.value = 'Handmatige schatting (op ID\'s)';
  b.setAttribute('onclick','mtT_Manual();');
  c.appendChild(b);
  
  b = document.createElement('input');
  b.type = 'button';
  b.style.background = "#A8F7AA";
  b.value = 'Stop timers';
  b.setAttribute('onclick','if(timers.length>0){this.value="Start de timers";tmptimers=timers;timers=[];}else{this.value="Stop de timers";timers=tmptimers;}');
  c = r.insertCell(-1);
  c.appendChild(b);

  var r = t.insertRow(-1);
  c = r.insertCell(-1);
  c.style.padding = '3px';
  var img = document.createElement('img');
  img.src = 'graphic/unit/def.png';
  c.appendChild(img);

  c = r.insertCell(-1);
  c.style.fontWeight = 'bold';
  c.style.paddingRight = '10px';
  c.appendChild(document.createTextNode('Extra'));

  
    b = document.createElement('input');
  b.id = 'mtT_btnKleurtjes';
  b.type = 'button';
  b.style.background = "#F7DB99";
  b.value = 'Inkleuren';
  b.setAttribute('onclick','mtT_Kleurtjes();');
  c = r.insertCell(-1);
  c.appendChild(b); 
 
   b = document.createElement('input');
  b.id = 'mtT_btnHerkomstatts';
  b.type = 'button';
  b.style.background = "#F7DB99";
  b.value = '"Fake" aanvallen filtreren';
  b.setAttribute('onclick','mtT_Herkomstatts();');
  c = r.insertCell(-1);
  c.appendChild(b); 

  $(function(){
$("<button>!! click me</buttion></br><p id='tagger' style='display:none'><b> Script Functie : </b></br></br>1- Als aanval tijden bekend zijn klik groene button [Taggen!] </br>2- Als je de stuurtijd niet weet klik dan de rode button [Tijd niet bekend ,Taggen]</br></br>3- De button [schat de niet benende met ID's] kun je pas gebruiken na dat er 8 aanvllen juist getagd zijn.</br>Hoe meer aanvallen je juist getagd hebt hoe nou keuriger de schatting zal zijn.</br></p>").prependTo(".vis:eq(2)");

$("button").click(function(){
$("#tagger").slideToggle();
     });
});

  tbl.parentNode.insertBefore(t,tbl);
 }
}
var url = document.location.href;
//if (url.match(/village=.*&screen=overview_villages&mode=incomings.*/)) {
 if (url.match(/village=.*&mode=incomings&.*/)) {
 mtT_Main();
}
window.onload = function() {// deze nog uitwerken naar een bruikbaar iets
    srcdir = 'http://www.marketshop.ro/triburile/img';
    troepen = {'Scout':'spy.png', 'LC':'light.png', 'ZC':'heavy.png', 'Bijl':'axe.png', 'Zwaard':'sword.png', 'Ram/kata':'ram.png' , 'Ram':'ram.png' ,'EDEL': 'snob.png', 'DODGE':'attack.png', 'Dodgen':'attack.png',  'dodged':'fake.png', '2bT':'fake.png', 'Fake':'fake.png', 'BLOCK':'fake.png', 'BLOCKED':'fake.png' ,' ' :'attack.png'};
	pagina = game_data.screen;
	mod = game_data.mode;
  if ( mod == "incomings" &&pagina == "overview_villages" ) { 
    css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = srcdir + "/06-iconatac.css";
    document.getElementsByTagName("head")[0].appendChild(css);
    $(".attack-icon").each(function () {
    tag = $(this).children().text().split(" ")[0];
    eval("$(this).addClass(troepen[\"" + tag + "\"].split(\".\")[0])");
    });
}
    };
})();