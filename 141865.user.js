// ==UserScript==
// @name           HptKey
// @namespace      bananaz
// @include        http://ae*.tribalwars.ae/game.php*
// ==/UserScript==
 
/*TASTENBELEGUNG
- Tastenbelegung fuer die beiden verschiedenen Modi
- Tasten duerfen fuer beide Modi verwendet werden
- einzelne Kleinbuchstaben
- soll Funktion nicht verfuegbar sein, keine Taste eintragen (also '')
*/

var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'Hit key', [8.5, 8.6], 'Bananaz', 'Tigerteufel@team.die-staemme.de' );
 
var script = 'HitKey';                //NUR BUCHSTABEN!!
//-------------------------------------------------------
//GameData
function getGameData() {
        var arr = document.getElementsByTagName('script');
        Main: for (a = 0; a < arr.length; a++) {
                if (arr[a].innerHTML.match('game_data')) {
                        var str = arr[a].innerHTML.split('\n');
                        for (i = 0; i < str.length; i++) {
                                if (str[i].match('game_data')) {
                                        eval(str[i]);
                                        break Main;
                                }
                        }
                }
        }
        return game_data;
}
 
//Keycode einer Taste (a-zA-Z) ermitteln
function getKeyCode(taste) {
        taste = taste.toLowerCase();
        var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        var keycode = 0;
        for (a = 0; a < alphabet.length; a++) {
                var index = a + 65;
                if (alphabet[a] == taste) {keycode = index; break}
        }
        return keycode;
}
 
//document.getElementsByClassName -> gcn
if (!document.getElementsByClassName) {
        function gcn(classname) {
                var arr = [];
                var reg = new RegExp('\\b' + classname + '\\b');
                var knoten = document.getElementsByTagName("body")[0];
                var elemente = knoten.getElementsByTagName("*");
                var l = elemente.length;
                for(var i = 0; i < l; i++) {
                        if (reg.test(elemente[i].className)) arr.push(elemente[i]);
                }
                return arr;
        }
}
else {
        function gcn(classname) {
                return document.getElementsByClassName(classname);
        }
}
 
//document.getElementById -> gid
function gid(id) {
        return document.getElementById(id);
}
 
//document.getElementsByTagName -> gtn
function gtn(tagname) {
        return document.getElementsByTagName(tagname);
}
//document.getElementsByName -> gbn
function gbn(name) {
        return document.getElementsByName(name);
}
 
//Einstellungsobjekt
function settingObject() {
        this.structure = 0;
        this.create = function(arr) {
                this.structure = arr;
                for (a = 0; a < arr.length; a++) {
                        this[arr[a]] = '';
                }
        };
        this.toString = function() {
                if (this.structure != 0) {
                        var arr = new Array();
                        for (a = 0; a < this.structure.length; a++) {
                                arr[a] = this.structure[a] + ':' + this[this.structure[a]];
                        }
                        return arr.join(',');
                }
        };
        this.load = function(str,standard) {
                if (this.structure != 0) {
                        if (str != '' && str != undefined && str != null) {var arr = str.split(',');}
                        else if (standard != '' && standard != undefined && standard != null) {var arr = standard.split(',');}
                        else {return;}
                        var dpExec = /(\D+):(.+)/;
                        for (a = 0; a < arr.length; a++) {
                                if (dpExec.exec(arr[a])) {
                                        for (i = 0; i < this.structure.length; i++) {
                                                if (this.structure[i] == dpExec.exec(arr[a])[1]) {this[dpExec.exec(arr[a])[1]] = dpExec.exec(arr[a])[2]; break}
                                        }
                                }
                        }
                }
        }
}
 
//DragObjekt
function dragObject() {
        var self = this;
        this.aktID = '';
        this.OffsetX = 0;
        this.OffsetY = 0;
        this.MouseX = 0;
        this.MouseY = 0;
        this.browser = '';
        if (navigator.appName == 'Netscape') {this.browser = 'FF'}
        else if (navigator.appName == 'Microsoft Internet Explorer') {this.browser = 'IE'}
        this.startDrag = function(event) {
                self.aktID = this.id.replace('Drag', '');
                var element = gid(self.aktID);
                self.OffsetX = event.clientX - parseInt(element.style.left.replace('px', ''));
                self.OffsetY = event.clientY - parseInt(element.style.top.replace('px', ''));
                self.WindowX = window.innerWidth - parseInt(element.style.width.replace('px', ''));
                self.WindowY = window.innerHeight;
                if (self.browser == 'FF') {
                        document.addEventListener('mousemove', self.mouseMoveFF, false);
                }
                else if (self.browser == 'IE') {
                        document.addEventListener('mousemove', self.mouseMoveIE, false);
                }
                document.addEventListener('mouseup', self.endDrag, false);
        }
        this.mouseMoveFF = function(event) {
                if (self.aktID != '') {
                        self.MouseX = event.clientX;
                        self.MouseY = event.clientY;
                        var newX = self.MouseX - self.OffsetX;
                        var newY = self.MouseY - self.OffsetY;
                        gid(self.aktID).style.top = String((newY > 55 ? (newY < self.WindowY - 100 ? newY : self.WindowY - 100) : 55)) + 'px';
                        gid(self.aktID).style.left = String((newX > 30 ? (newX < self.WindowX - 30 ? newX : self.WindowX - 30) : 30)) + 'px';
                        window.getSelection().removeAllRanges();
                }
        }
        this.mouseMoveIE = function(event) {
                if (self.aktID != '') {
                        self.MouseX = event.clientX;
                        self.MouseY = event.clientY;
                        var newX = self.MouseX - self.OffsetX;
                        var newY = self.MouseY - self.OffsetY;
                        gid(self.aktID).style.top = String((newY > 55 ? (newY < self.WindowY - 100 ? newY : self.WindowY - 100) : 55)) + 'px';
                        gid(self.aktID).style.left = String((newX > 30 ? (newX < self.WindowX - 30 ? newX : self.WindowX - 30) : 30)) + 'px';
                        document.selection.empty();
                }
        }
        this.endDrag = function() {
                self.aktID = '';
                if (self.browser == 'FF') {document.removeEventListener('mousemove', self.mouseMoveFF, false)}
                else {document.removeEventListener('mousemove', self.mouseMoveIE, false)}
                document.removeEventListener('mouseup', self.endDrag, false);
        }
}
 
//--------------------------------------------------------------------
 
function Storage(pre) {
        this.ls = false;
        this.pre = pre;
        try {this.ls = typeof(localStorage) != 'undefined';} catch(e) {}
        if (!this.ls) {alert('Keine geeignete Speichermoeglichgkeit gefunden')}
        else {
                this.del = function(key) {
                        localStorage.removeItem(this.pre+'_'+key);
                }
                this.get = function(key) {
                        return localStorage.getItem(this.pre+'_'+key);
                }
                this.set = function(key,value) {
                        localStorage.setItem(this.pre+'_'+key,value);
                }
        }
}
 
function load() {
        table = new Array(
                script + ' - Optionen',
                new Array('Status:', 'Normal', 'StatusNormal', 'radio:status', 'Deff', 'StatusDeff', 'radio:status'/*, 'Schrotten', 'StatusSchrott', 'radio:status'*/, 'Aus', 'StatusAus', 'radio:status'),
                new Array('Normal Optionen:', 'unit/unit_spear.png Speer', 'TroupSpear', 'troup:5', 'unit/unit_sword.png Schwert', 'TroupSword', 'troup:5', 'unit/unit_axe.png Axt', 'TroupAxe', 'troup:5', 'unit/unit_archer.png Bogen', 'TroupArcher', 'troup:5', 'unit/unit_spy.png Sp?her', 'TroupSpy', 'troup:5', 'unit/unit_light.png LKav', 'TroupLight', 'troup:5', 'unit/unit_marcher.png BBogen', 'TroupMarcher', 'troup:5', 'unit/unit_heavy.png SKav', 'TroupHeavy', 'troup:5', 'unit/unit_ram.png Ramme', 'TroupRam', 'troup:5', 'unit/unit_catapult.png Katapult', 'TroupCatapult', 'troup:5', 'unit/unit_snob.png AG', 'TroupSnob', 'troup:5', 'Koords nutzen?', 'TroupUseKoords', 'check', '', 'TroupKoords', 'koord', 'command/support.png Unterstützen?', 'TroupSupport', 'check'),
                new Array('Deff Optionen:', 'Deff ohne unit/unit_spy.png?', 'DeffWithoutSpy', 'check', 'Deff - x unit/unit_heavy.png', 'DeffMinHeavy', 'numall:4', 'Deff - x unit/unit_heavy.png / unit/unit_snob.png', 'DeffMinHeavyProSnob', 'number:3')/*,
                new Array('Schrotten Optionen:', 'unit/unit_spear.png Speer', 'SchrottSpear', 'numall:5', 'unit/unit_sword.png Schwert', 'SchrottSword', 'numall:5', 'unit/unit_axe.png Axt', 'SchrottAxe', 'numall:5', 'unit/unit_archer.png Bogen', 'SchrottArcher', 'numall:5', 'unit/unit_spy.png Sp?her', 'SchrottSpy', 'numall:5', 'unit/unit_light.png LKav', 'SchrottLight', 'numall:5', 'unit/unit_marcher.png BBogen', 'SchrottMarcher', 'numall:5', 'unit/unit_heavy.png SKav', 'SchrottHeavy', 'numall:5', 'unit/unit_ram.png Ramme', 'SchrottRam', 'numall:5', 'unit/unit_catapult.png Katapult', 'SchrottCatapult', 'numall:5', '+ unit/unit_snob.png AGs', 'SchrottSnob', 'check', 'command/attack.png Angriff', 'SchrottAttack', 'koord', 'command/support.png Abstellen', 'SchrottSupport', 'koord')*/
        );
        var setting_standard = 'StatusNormal:1,StatusDeff:0,StatusSchrott:0,StatusAus:0,TroupSpear:0,TroupSword:0,TroupAxe:500,TroupArcher:0,TroupSpy:0,TroupLight:100,TroupMarcher:0,TroupHeavy:0,TroupRam:0,TroupCatapult:0,TroupSnob:1,TroupUseKoords:0,TroupKoords:0,TroupSupport:0,DeffWithoutSpy:0,DeffMinHeavy:0,DeffMinHeavyProSnob:0,SchrottSpear:0,SchrottSword:0,SchrottAxe:0,SchrottArcher:0,SchrottSpy:0,SchrottLight:0,SchrottMarcher:0,SchrottHeavy:0,SchrottRam:0,SchrottCatapult:0,SchrottSnob:0,SchrottAttack:0,SchrottSupport:0';
 
        stor = new Storage(script);
        drag = new dragObject();
 
        //Einstellungsstruktur laden
        var settingStructure = new Array();
        for (a = 1; a < table.length; a++) {
                for (i = 1; i < table[a].length; i += 3) {
                        settingStructure[settingStructure.length] = table[a][i+1];
                }
        }
        setting = new settingObject;
        setting.create(settingStructure);
        setting.load(stor.get('settings'),setting_standard);
}
//------------------------------------------------------
 
function openSettings() {
        if (gid('div' + script) == undefined) {
 
                var controlFunction = new Array(
                        'var val=this.value.replace(/[^a-z]/g, \'\'); this.value=val;',
                        'var val=this.value.replace(/[^\\d]/g, \'\'); val=val.replace(/^0(.+)/,\'$1\'); this.value=val;',
                        'var val=this.value.replace(/[^!\\d]/g, \'\'); val=val.replace(/^0(.+)/,\'$1\'); if(val.match(\'!\')){val=\'!\'}; this.value=val;',
                        'var val=this.value.replace(/[^-!\\d]/g, \'\'); if(val.match(\'!\')){val=\'!\'}; if(val.match(\'-\')){val=(val.charAt(0)==\'-\'?\'-\':\'\')+val.replace(/-/g, \'\')}; val=val.replace(/^0(.+)/,\'$1\'); val=val.replace(/^-0(.+)/,\'-$1\'); val=val.replace(/^-0/,\'0\');this.value=val;'
                );
 
                //Fenster erstellen
                var div = '';
                div += '<div id="div' + script + '" style="top: 100px; left: 700px; width: 200px; position: absolute; border-top: 2px solid #804000; border-left: 2px solid #804000; border-right: 2px solid #603000; border-bottom: 2px solid #402000; background-image: url("http://de26.die-staemme.de/graphic/index/main_bg.jpg"); z-index: 5;">';
                div += '<div id="div' + script + 'Drag" style="background-color: #c1a264; background-image: url("/graphic/screen/tableheader_bg3.png"); background-repeat: repeat-x; width: auto; padding: 2px 5px; text-align: right; cursor: move;">';
                div += '<a id="close' + script + '" style="display: inline;" href="javascript:;">schlie?en</a></div>';
                div += '<div style="overflow: auto; background-image: url("/graphic/index/main_bg.jpg"); padding: 3px;">';
 
                //Titel
                div += '<h4>' + table[0] + '</h4><br>';
 
                //Tabellenanfang
                div += '<table id="table' + script + '" class="vis" style="width: 100%;"><tbody>';
 
                var dpExec = /^(\D+):(.+)$/;
                var actionExec = /(check|radio|taste|number|numall|troup|arrow|koord|color|select)/;
                for (a = 1; a < table.length; a++) {
                        //Oberspalte
                        div += '<tr style="cursor: pointer;"><th colspan="2" style="padding: 3px">' + table[a][0] + '</th></tr>';
                        for (i = 1; i < table[a].length; i += 3) {
                                //Bilder einfuegen
                                var table_with_png = table[a][i].replace(/\b(\S+)\.png/g, '<img src="/graphic/$1.png?1">');
                                //Erste Zelle
                                div += '<tr style="display: ' + (a > 1 ? 'none' : '') + ';"><td ' + (table_with_png.match(/[:|=]$/) ? 'align="right" ' : '') + 'style="width: 50%; padding: 3px">' + table_with_png + '</td>';
                                //Zweite Zelle
                                if (actionExec.test(table[a][i+2])) {
                                        switch (actionExec.exec(table[a][i+2])[1]) {
                                                case 'check':
                                                        div += '<td style="width: 50%" align="center"><input type="checkbox" id="set' + script + table[a][i+1] + '"></td>';
                                                        break;
                                                case 'radio':
                                                        div += '<td style="width: 50%" align="center"><input type="radio" id="set' + script + table[a][i+1] + '" name="' + dpExec.exec(table[a][i+2])[2] + '"></td>';
                                                        break;
                                                case 'taste':
                                                        div += '<td style="width: 50%" align="center"><input type="text" style="text-align:center;" id="set' + script + table[a][i+1] + '" maxlength="1" size="1" onkeyup="' + controlFunction[0] + '" onblur="' + controlFunction[0] + '"></td>';
                                                        break;
                                                case 'number':
                                                        div += '<td style="width: 50%" align="center"><input type="text" style="text-align:center;" id="set' + script + table[a][i+1] + '" maxlength="' + dpExec.exec(table[a][i+2])[2] + '" size="' + String(parseInt(dpExec.exec(table[a][i+2])[2]) - 1) + '" onkeyup="' + controlFunction[1][0] + '" onblur="' + controlFunction[1][1] + '"></td>';
                                                        break;
                                                case 'numall':
                                                        div += '<td style="width: 50%" align="center"><input type="text" style="text-align:center;" id="set' + script + table[a][i+1] + '" maxlength="' + dpExec.exec(table[a][i+2])[2] + '" size="' + String(parseInt(dpExec.exec(table[a][i+2])[2]) - 1) + '" onkeyup="' + controlFunction[2][0] + '" onblur="' + controlFunction[2][1] + '"></td>';
                                                        break;
                                                case 'troup':
                                                        div += '<td style="width: 50%" align="center"><input type="text" style="text-align:center;" id="set' + script + table[a][i+1] + '" maxlength="' + dpExec.exec(table[a][i+2])[2] + '" size="' + String(parseInt(dpExec.exec(table[a][i+2])[2]) - 1) + '" onkeyup="' + controlFunction[3][0] + '" onblur="' + controlFunction[3][1] + '"></td>';
                                                        break;
                                                case 'arrow':
                                                        var limitExec = /\((\d+),(\d+),(\d+)\)/;
                                                        if (limitExec.test(table[a][i+2])) {
                                                                var min = limitExec.exec(table[a][i+2])[1];
                                                                var max = limitExec.exec(table[a][i+2])[2];
                                                                var step = limitExec.exec(table[a][i+2])[3];
                                                                controlFunction[5] = new Array('val=this.value.replace(/[^\\d]/g,\'\');this.value=(parseInt(val)>' + max + '?' + max + ':val);',
                                                                                                                        'val=(this.value==\'\'?\'0\':this.value.replace(/[^\\d]/g,\'\').replace(/^0*([^0]\\d*|0)$/,\'$1\'));this.value=(parseInt(val)<' + min + '?\'' + min + '\':(parseInt(val)>' + max + '?\'' + max + '\':val));');
                                                                div += '<td style="width: 50%; height: 30px;" align="center">';
                                                                div += '<table><tr><td>';
                                                                div += '<a href="javascript:;" onclick="document.getElementById(\'set' + script + table[a][i+1] + '\').value=(parseInt(document.getElementById(\'set' + script + table[a][i+1] + '\').value)-' + step + '<' + min + '?' + min + ':String(parseInt(document.getElementById(\'set' + script + table[a][i+1] + '\').value)-' + step + '));"><span class="arrowLeft" style="display: inline-block; height: 22px; width: 16px;"> </span></a>';
                                                                div += '</td><td>';
                                                                div += '<input type="text" style="text-align:center;" id="set' + script + table[a][i+1] + '" maxlength="' + max.length + '" size="1" onkeyup="' + controlFunction[5][0] + '" onblur="' + controlFunction[5][1] + '">';
                                                                div += '</td><td>';
                                                                div += '<a href="javascript:;" onclick="document.getElementById(\'set' + script + table[a][i+1] + '\').value=(parseInt(document.getElementById(\'set' + script + table[a][i+1] + '\').value)+' + step + '>' + max + '?' + max + ':String(parseInt(document.getElementById(\'set' + script + table[a][i+1] + '\').value)+' + step + '));"><span class="arrowRight" style="display: inline-block; height: 22px; width: 16px;"> </span></a>';
                                                                div += '</td></tr></table>';
                                                                div += '</td>';
                                                        }
                                                        else {div += '<td style="width: 50%" align="center">falsche Grenzenangabe</td>'}
                                                        break;
                                                case 'koord':
                                                        controlFunction[6] = new Array(controlFunction[1][0],
                                                                                                                controlFunction[1][0] + 'document.getElementById(\'set' + script + table[a][i+1] + '\').value=document.getElementById(\'set' + script + table[a][i+1] + 'X\').value+\'|\'+document.getElementById(\'set' + script + table[a][i+1] + 'Y\').value;');
                                                        div += '<td style="width: 50%" align="center">';
                                                        div += '<input type="hidden" id="set' + script + table[a][i+1] + '">';
                                                        div += '<input type="text" id="set' + script + table[a][i+1] + 'X" style="text-align:center;" maxlength="3" size="1" onkeyup="' + controlFunction[6][0] + 'if(this.value.length==3){document.getElementById(\'set' + script + table[a][i+1] + 'Y\').focus();document.getElementById(\'set' + script + table[a][i+1] + 'Y\').select()};" onblur="' + controlFunction[6][1] + '">';
                                                        div += '|<input type="text" id="set' + script + table[a][i+1] + 'Y" style="text-align:center;" maxlength="3" size="1" onkeyup="' + controlFunction[6][0] + '" onblur="' + controlFunction[6][1] + '">';
                                                        div += '</td>';
                                                        break;
                                                case 'color':
                                                        controlFunction[7] = new Array('this.value=this.value.toLowerCase().replace(/[^a-f\\d]/,\'\');',
                                                                                                                'this.value=this.value.toLowerCase().replace(/[^a-f\\d]/,\'\');if(this.value.length<6){this.value=\'' + dpExec.exec(table[a][i+2])[2] + '\'};');
                                                        div += '<td style="width: 50%" align="center">';
                                                        div += '#<input type="text" id="set' + script + table[a][i+1] + '" style="text-align:center;" maxlength="6" size="5" onkeyup="' + controlFunction[7][0] + '" onblur="' + controlFunction[7][1] + '">';
                                                        div += '</td>';
                                                        break;
                                                case 'select':
                                                        var replaceExec = /^select\((.+)\)/;
                                                        if (replaceExec.test(table[a][i+2])) {
                                                                div += '<td style="width: 50%" align="center"><select id="set' + script + table[a][i+1] + '" size="1">';
                                                                var str = replaceExec.exec(table[a][i+2])[1];
                                                                var options = str.split(',');
                                                                var optionExec = /^([^:]+):([a-z\d]+)$/;
                                                                var iH = '';
                                                                for (x = 0; x < options.length; x++) {
                                                                        if (optionExec.test(options[x])) {
                                                                                iH += '<option value="' + optionExec.exec(options[x])[2] + '">' + optionExec.exec(options[x])[1] + '</option>';
                                                                        }
                                                                        else {iH = '<option>Optionfehler</option>'; break}
                                                                }
                                                                div += iH;
                                                                div += '</select></td>';
                                                        }
                                                        else {div += '<td style="width: 50%" align="center">Select-/Klammerfehler</td>'}
                                                        break;
                                                default:
                                                        div += '<td style="width: 50%" align="center">FEHLER</td>';
                                                        break;
                                        }
                                }
                                else {div += '<td style="width: 50%" align="center">keine zulaessige Deklaration</td>'}
                                div += '</tr>';
                        }
                        //Speichern
                        div += '<tr style="display: ' + (a > 1 ? 'none' : '') + ';"><td colspan="2" style="padding: 3px; width: 50%; background-image: url("http://de26.die-staemme.de/graphic/background/content.jpg");" align="right"><a name="save' + script + '" href="javascript:;">Speichern</a></td></tr>';
                }
 
                //Tabellenende
                div += '</tbody></table></div></div>';
 
                //Einbinden
                gid('pop_current_label').innerHTML += div;
 
                //Einstellungen eintragen
                for (a = 0; a < setting.structure.length; a++) {
                        if (setting[setting.structure[a]] != undefined && gid('set' + script + setting.structure[a]) != undefined) {
                                if (gid('set' + script + setting.structure[a]).tagName.toLowerCase() == 'select') {
                                        var options = gid('set' + script + setting.structure[a]).getElementsByTagName('option');
                                        for (i = 0; i < options.length; i++) {
                                                if (options[i].value == setting[setting.structure[a]]) {options[i].selected = true; break}
                                        }
                                }
                                else if (gid('set' + script + setting.structure[a]).type == 'text') {
                                        gid('set' + script + setting.structure[a]).value = setting[setting.structure[a]];
                                }
                                else if (gid('set' + script + setting.structure[a]).type == 'hidden') {
                                        if (setting[setting.structure[a]].split('|')[1] != undefined) {
                                                gid('set' + script + setting.structure[a]).value = setting[setting.structure[a]];
                                                gid('set' + script + setting.structure[a] + 'X').value = setting[setting.structure[a]].split('|')[0];
                                                gid('set' + script + setting.structure[a] + 'Y').value = setting[setting.structure[a]].split('|')[1];
                                        }
                                }
                                else {
                                        if (setting[setting.structure[a]] == '1') {
                                                gid('set' + script + setting.structure[a]).checked = true;
                                        }
                                }
                        }
                }
 
                //Schliessen
                gid('close' + script).addEventListener('click', function(){
                        var tab = gid('div' + script);
                        tab.parentNode.removeChild(tab);
                }, false);
 
                //Auf-/Zuklappen
                var th = gid('table' + script).getElementsByTagName('th');
                for (a = 0; a < th.length; a++) {
                        th[a].parentNode.addEventListener('click', function(){
                                var tr = gid('table' + script).getElementsByTagName('tr');
                                var akt = false;
                                for (i = 0; i < tr.length; i++) {
                                        if (this == tr[i]) {akt = true}
                                        else {
                                                if(tr[i].firstChild.tagName == 'TH') {akt = false}
                                        }
                                        if (akt || tr[i].firstChild.tagName == 'TH') {
                                                tr[i].style.display = '';
                                        }
                                        else {tr[i].style.display = 'none'}
                                }
                        }, false);
                }
 
                //Speichernbuttons
                var saves = gbn('save' + script);
                for (a = 0; a < saves.length; a++) {
                        saves[a].addEventListener('click', function(){
                                for (i = 0; i < setting.structure.length; i++) {
                                        setting[setting.structure[i]] = '0';
                                        if (gid('set' + script + setting.structure[i]) != null) {
                                                var obj = gid('set' + script + setting.structure[i]);
                                                if (obj.tagName.toLowerCase() == 'select') {
                                                        setting[setting.structure[i]] = obj.getElementsByTagName('option')[obj.selectedIndex].value;
                                                }
                                                else if ((obj.type == 'text' || obj.type == 'hidden') && obj.value != '') {
                                                        setting[setting.structure[i]] = obj.value;
                                                }
                                                else {
                                                        if(obj.checked) {setting[setting.structure[i]] = '1'}
                                                }
                                        }
                                }
                                stor.set('settings', setting.toString());
                                openSettings();
                        }, false);
                }
 
                //Draggable
                gid('div' + script + 'Drag').addEventListener('mousedown', drag.startDrag, false);
        }
        else {
                var tab = gid('div' + script);
                tab.parentNode.removeChild(tab);
        }
}
 
function getTroupInsert(set, akt) {
        var ins = 0;
        if (set == '!') {ins = akt;}
        else if (set.charAt(0) == '-') {
                var abzug = parseInt(set.substring(1));
                ins = (akt > abzug ? akt - abzug : 0);
        }
        else {
                set = parseInt(set);
                ins = (akt >= set ? set : akt);
        }
        return (ins != 0 ? ins : '');
}
 
function getInputs() {
        var inputs = gtn('input');
        var arr = new Array();
        for (a = 0; a < inputs.length; a++) {
                if(inputs[a].type == 'text') {
                        if (!(inputs[a].id.match('unit_input') || inputs[a].id == 'inputx' || inputs[a].id == 'inputy' || inputs[a].className.match('resources_max') || inputs[a].className.match('recruit_unit'))) {
                                arr.push(inputs[a].value);
                        }
                }
        }
        var inputs = gtn('textarea');
        for (a = 0; a < inputs.length; a++) {
                arr.push(inputs[a].value);
        }
        return arr;
}
 
function addNormalTasten() {
        //Keycodes ermitteln
        var previousVillage = getKeyCode(normal.previousVillage);
        var nextVillage = getKeyCode(normal.nextVillage);
        var previousReport = getKeyCode(normal.previousReport);
        var nextReport = getKeyCode(normal.nextReport);
        var insertTroups = getKeyCode(normal.insertTroups);
        var villageTroups = getKeyCode(normal.villageTroups);
        var attack = getKeyCode(normal.attack);
        var support = getKeyCode(normal.support);
        var confirm = getKeyCode(normal.confirm);
 
        //Eventlistener erstellen
        var controlInputs = new Array();
        document.addEventListener('keydown', function(event) {
                if (event.which == previousVillage || event.which ==  nextVillage || event.which == previousReport || event.which == nextReport || event.which ==  insertTroups || event.which == villageTroups || event.which == attack || event.which == support || event.which == confirm) {
                        controlInputs[0] = getInputs();
                }
        }, true);
        document.addEventListener('keyup', function(event) {
                if (event.which == previousVillage || event.which ==  nextVillage || event.which == previousReport || event.which == nextReport || event.which ==  insertTroups || event.which == villageTroups || event.which == attack || event.which == support || event.which == confirm) {
                        if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
                                var bool = true;
                                controlInputs[1] = getInputs();
                                for (a = 0; a < controlInputs[1].length; a++) {
                                        if (controlInputs[0][a] != controlInputs[1][a]) {
                                                bool = false;
                                                break;
                                        }
                                }
                                if (bool) {
                                        switch(event.which) {
                                                case previousVillage:
                                                        window.location.href = game_data['link_base_pure'].replace('village=', 'village=p').replace('screen=', 'screen=' + game_data['screen']) + (game_data['mode'] != null ? '&mode=' + game_data['mode'] : '');
                                                        //var input = new Array();
                                                        //input = document.getElementsByTagName('a');
                                                        //for (a = 0; a < input.length; a++) {if (input[a].href.match('village=p') && input[a].className.match('village_switch_link')) {window.location.href = input[a].href; break}}
                                                        break;
                                                case nextVillage:
                                                        window.location.href = game_data['link_base_pure'].replace('village=', 'village=n').replace('screen=', 'screen=' + game_data['screen']) + (game_data['mode'] != null ? '&mode=' + game_data['mode'] : '');
                                                        //var input = new Array();
                                                        //input = document.getElementsByTagName('a');
                                                        //for (a = 0; a < input.length; a++) {if (input[a].href.match('village=n') && input[a].className.match('village_switch_link')) {window.location.href = input[a].href; break}}
                                                        break;
                                                case previousReport:
                                                        if (window.location.href.match(/screen=report.+view=/)) {
                                                                var input = new Array();
                                                                input = document.getElementsByTagName('a');
                                                                for (a = 0; a < input.length; a++) {if (input[a].innerHTML == '&lt;&lt;') {window.location.href = input[a].href; break}}
                                                        }
                                                        break;
                                                case nextReport:
                                                        if (window.location.href.match(/screen=report.+view=/)) {
                                                                var input = new Array();
                                                                input = document.getElementsByTagName('a');
                                                                for (a = 0; a < input.length; a++) {if (input[a].innerHTML == '&gt;&gt;') {window.location.href = input[a].href; break}}
                                                        }
                                                        break;
                                                case insertTroups:
                                                        if (game_data['screen'] == 'place' && (game_data['mode'] == null || game_data['mode'] == 'command')) {
                                                                var troup = new Array('Spear', 'Sword', 'Axe', 'Archer', 'Spy', 'Light', 'Marcher', 'Heavy', 'Ram', 'Catapult', 'Snob');
                                                                var aktExec = />\((\d+)\)<\/a>/;
                                                                for (a = 0; a < troup.length; a++) {
                                                                        var str = gid('unit_input_' + troup[a].toLowerCase()).parentNode.innerHTML;
                                                                        if (aktExec.test(str)) {
                                                                                var akt = parseInt(aktExec.exec(str)[1]);
                                                                                gid('unit_input_' + troup[a].toLowerCase()).value = getTroupInsert(setting['Troup' + troup[a]], akt);
                                                                        }
                                                                }
                                                                if (setting['TroupUseKoords'] != undefined && setting['TroupUseKoords'] == '1' && setting['TroupKoords'] != undefined) {
                                                                        gid('inputx').value = setting['TroupKoords'].split('|')[0];
                                                                        gid('inputy').value = setting['TroupKoords'].split('|')[1];
                                                                }
                                                                if (setting['TroupSupport'] != undefined && setting['TroupSupport'] == '1') {gid('target_support').click()}
                                                                else {gid('target_attack').click()}
                                                        }
                                                        break;
                                                case villageTroups:
                                                        window.location.href = game_data['link_base_pure'].replace('screen=', 'screen=' + 'place') + '&mode=units';
                                                        break;
                                                case attack:
                                                        if (game_data['screen'] == 'place' && (game_data['mode'] == null || game_data['mode'] == 'command')) {
                                                                gid('target_attack').click();
                                                        }
                                                        break;
                                                case support:
                                                        if (game_data['screen'] == 'place' && (game_data['mode'] == null || game_data['mode'] == 'command')) {
                                                                gid('target_support').click();
                                                        }
                                                        break;
                                                case confirm:
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('input');
                                                        for (a = 0; a < input.length; a++) {if ((input[a].type == 'submit' || input[a].type == 'button') && input[a].style.display != 'none' && input[a].value.match('OK')) {input[a].click(); break}}
                                                        break;
                                        }
                                }
                        }
                }
        }, true);
}
 
function addDeffTasten() {
        //Keycodes ermitteln
        var previousUnits = getKeyCode(deff.previousUnits);
        var nextUnits = getKeyCode(deff.nextUnits);
        var importKoords = getKeyCode(deff.importKoords);
        var insertKoords = getKeyCode(deff.insertKoords);
        var confirm = getKeyCode(deff.confirm);
 
        //Eventlistener erstellen
        var controlInputs = new Array();
        document.addEventListener('keydown', function(event) {
                if (event.which == previousUnits || event.which ==  nextUnits || event.which == importKoords || event.which == insertKoords || event.which == confirm) {
                        controlInputs[0] = getInputs();
                }
        }, true);
        document.addEventListener('keyup', function(event) {
                if (event.which == previousUnits || event.which ==  nextUnits || event.which == importKoords || event.which == insertKoords || event.which == confirm) {
                        if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
                                var bool = true;
                                controlInputs[1] = getInputs();
                                for (a = 0; a < controlInputs[1].length; a++) {
                                        if (controlInputs[0][a] != controlInputs[1][a]) {
                                                bool = false;
                                                break;
                                        }
                                }
                                if (bool) {
                                        switch(event.which) {
                                                case previousUnits:
                                                        window.location.href = game_data['link_base_pure'].replace('village=', 'village=p').replace('screen=', 'screen=' + 'place') + '&mode=units';
                                                        break;
                                                case nextUnits:
                                                        window.location.href = game_data['link_base_pure'].replace('village=', 'village=n').replace('screen=', 'screen=' + 'place') + '&mode=units';
                                                        break;
                                                case importKoords:
                                                        if (game_data['screen'] == 'place' && game_data['mode'] == 'units') {
                                                                var table = gid('units_away');
                                                                if (table == undefined) {alert('Fehler beim Einlesen!')}
                                                                else {
                                                                        var koordExec = /\((\d+\|\d+)\) K\d+/;
                                                                        var koords = koordExec.exec(table.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML)[1];
                                                                        stor.set(script + 'koord', koords);
                                                                }
                                                                window.location.href = game_data['link_base_pure'].replace('screen=', 'screen=' + 'place');
                                                        }
                                                        break;
                                                case insertKoords:
                                                        if (game_data['screen'] == 'place' && (game_data['mode'] == null || game_data['mode'] == 'command') && stor.get(script + 'koord') != undefined) {
                                                                var troups = new Array('Spear', 'Sword', 'Archer', 'Spy', 'Heavy');
                                                                if (setting['DeffWithoutSpy'] != undefined && setting['DeffWithoutSpy'] == '1') {troups = new Array('Spear', 'Sword', 'Archer', 'Heavy')}
                                                                var maxExec = />\((\d+)\)<\/a>/;
                                                                for (a = 0; a < troups.length; a++) {
                                                                        var max = parseInt(maxExec.exec(gbn(troups[a].toLowerCase())[0].parentNode.innerHTML)[1]);
                                                                        if (troups[a] == 'Heavy' && setting['DeffMinHeavyProSnob'] != undefined) {
                                                                                var snobZahl = parseInt(maxExec.exec(gbn('snob')[0].parentNode.innerHTML)[1]);
                                                                                max -= snobZahl * parseInt(setting['DeffMinHeavyProSnob']);
                                                                        }
                                                                        if (troups[a] == 'Heavy' && setting['DeffMinHeavy'] != undefined) {
                                                                                if (setting['DeffMinHeavy'] == '!') {max = 0}
                                                                                else {max -= parseInt(setting['DeffMinHeavy'])}
                                                                        }
                                                                        if (max <= 0) {max = ''}
                                                                        gbn(troups[a].toLowerCase())[0].value = String(max);
                                                                }
                                                                gid('inputx').value = stor.get(script + 'koord').split('|')[0];
                                                                gid('inputy').value = stor.get(script + 'koord').split('|')[1];
                                                                stor.del(script + 'koord');
                                                                gbn('support')[0].click();
                                                        }
                                                        break;
                                                case confirm:
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('input');
                                                        for (a = 0; a < input.length; a++) {if (input[a].type == 'submit' && input[a].value.match('OK')) {input[a].click(); break}}
                                                        break;
                                        }
                                }
                        }
                }
        }, true);
}
 
function addSchrottTasten() {
        //Keycodes ermitteln
        var previousUnits = getKeyCode(schrott.previousUnits);
        var nextUnits = getKeyCode(schrott.nextUnits);
        var previousTrain = getKeyCode(schrott.previousTrain);
        var nextTrain = getKeyCode(schrott.nextTrain);
        var someTroups = getKeyCode(schrott.someTroups);
        var importTroups = getKeyCode(schrott.importTroups);
        var insertTroups = getKeyCode(schrott.insertTroups);
        var confirm = getKeyCode(schrott.confirm);
 
        //Eventlistener erstellen
        var controlInputs = new Array();
        document.addEventListener('keydown', function(event) {
                if (event.which == previousUnits || event.which ==  nextUnits || event.which == previousTrain || event.which == nextTrain || event.which == someTroups || event.which == importTroups || event.which == insertTroups || event.which == confirm) {
                        controlInputs[0] = getInputs();
                }
        }, true);
        document.addEventListener('keyup', function(event) {
                if (event.which == previousUnits || event.which ==  nextUnits || event.which == previousTrain || event.which == nextTrain || event.which == someTroups || event.which == importTroups || event.which == insertTroups || event.which == confirm) {
                        if (!event.altKey && !event.ctrlKey && !event.shiftKey) {
                                var bool = true;
                                controlInputs[1] = getInputs();
                                for (a = 0; a < controlInputs[1].length; a++) {
                                        if (controlInputs[0][a] != controlInputs[1][a]) {
                                                bool = false;
                                                break;
                                        }
                                }
                                if (bool) {
                                        switch(event.which) {
                                                case previousUnits:
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('a');
                                                        for (a = 0; a < input.length; a++) {
                                                                if (input[a].href.match('village=')) {
                                                                        var dorfIdExec = /village=(\d+)/;
                                                                        var tExec = /t=(\d+)/;
                                                                        window.location.href = input[a].href.split('game.php')[0] + 'game.php?village=p' + dorfIdExec.exec(input[a].href)[1] + '&screen=place&mode=units' + (tExec.test(input[a].href) ? '&t=' + tExec.exec(input[a].href)[1] : '');
                                                                        break;
                                                                }
                                                        }
                                                        break;
                                                case nextUnits:
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('a');
                                                        for (a = 0; a < input.length; a++) {
                                                                if (input[a].href.match('village=')) {
                                                                        var dorfIdExec = /village=(\d+)/;
                                                                        var tExec = /t=(\d+)/;
                                                                        window.location.href = input[a].href.split('game.php')[0] + 'game.php?village=n' + dorfIdExec.exec(input[a].href)[1] + '&screen=place&mode=units' + (tExec.test(input[a].href) ? '&t=' + tExec.exec(input[a].href)[1] : '');
                                                                        break;
                                                                }
                                                        }
                                                        break;
                                                case previousTrain:
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('a');
                                                        for (a = 0; a < input.length; a++) {
                                                                if (input[a].href.match('village=')) {
                                                                        var dorfIdExec = /village=(\d+)/;
                                                                        var tExec = /t=(\d+)/;
                                                                        window.location.href = input[a].href.split('game.php')[0] + 'game.php?village=p' + dorfIdExec.exec(input[a].href)[1] + '&screen=train' + (tExec.test(input[a].href) ? '&t=' + tExec.exec(input[a].href)[1] : '');
                                                                        break;
                                                                }
                                                        }
                                                        break;
                                                case nextTrain:
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('a');
                                                        for (a = 0; a < input.length; a++) {
                                                                if (input[a].href.match('village=')) {
                                                                        var dorfIdExec = /village=(\d+)/;
                                                                        var tExec = /t=(\d+)/;
                                                                        window.location.href = input[a].href.split('game.php')[0] + 'game.php?village=n' + dorfIdExec.exec(input[a].href)[1] + '&screen=train' + (tExec.test(input[a].href) ? '&t=' + tExec.exec(input[a].href)[1] : '');
                                                                        break;
                                                                }
                                                        }
                                                        break;
                                                case someTroups:
                                                        if (window.location.href.match(/screen=place.+mode=units/)) {
                                                                var input = document.getElementsByTagName('a');
                                                                for (a = 0; a < input.length; a++) {
                                                                        if (input[a].innerHTML == 'einige' && input[a+1].innerHTML == 'alle') {
                                                                                window.location.href = input[a].href;
                                                                                break;
                                                                        }
                                                                }
                                                        }
                                                        break;
                                                case importTroups:
                                                        if (window.location.href.match('screen=train') && !window.location.href.match('mode=mass')) {
                                                                var tables = new Array();
                                                                tables = document.getElementsByTagName('table');
                                                                for (a = 0; a < tables.length; a++) {
                                                                        if (tables[a].className == 'vis' && tables[a].getElementsByTagName('th')[3] != undefined && tables[a].getElementsByTagName('th')[0].innerHTML == 'Einheit' && tables[a].getElementsByTagName('th')[3].innerHTML.match('Insgesamt')) {var table = tables[a]; break}
                                                                }
                                                                if (table == undefined) {alert('Fehler beim Einlesen!')}
                                                                else {
                                                                        var zahlen = new Array();
                                                                        var rows = table.getElementsByTagName('tr');
                                                                        var bool = true;
                                                                        for (a = 1; a < rows.length - 1; a++) {
                                                                                if (rows[a].className != 'row_a' && rows[a].className != 'row_b') {bool = false; break}
                                                                                else {
                                                                                        var td = rows[a].getElementsByTagName('td')[6];
                                                                                        zahlen[a-1] = td.innerHTML.split('/')[1];
                                                                                }
                                                                        }
                                                                        if (bool) {
                                                                                stor.set('troups', zahlen.join(','));
                                                                                var input = document.getElementsByTagName('a');
                                                                                for (a = 0; a < input.length; a++) {
                                                                                        if (input[a].href.match('village=')) {
                                                                                                var dorfIdExec = /village=(\d+)/;
                                                                                                var tExec = /t=(\d+)/;
                                                                                                window.location.href = input[a].href.split('game.php')[0] + 'game.php?village=' + dorfIdExec.exec(input[a].href)[1] + '&screen=place' + (tExec.test(input[a].href) ? '&t=' + tExec.exec(input[a].href)[1] : '');
                                                                                                break;
                                                                                        }
                                                                                }
                                                                        }
                                                                        else {alert('Fehler beim Einlesen!')}
                                                                }
                                                        }
                                                        break;
                                                case insertTroups:
                                                        if (window.location.href.match('screen=place') && gbn('attack')[0] != undefined && stor.get('troups') != undefined) {
                                                                var troups = new Array('Spear:1', 'Sword:1', 'Axe:1', 'Archer:1', 'Spy:2', 'Light:4', 'Marcher:5', 'Heavy:6', 'Ram:5', 'Catapult:8');
                                                                var zahlen = new Array();
                                                                zahlen = stor.get('troups').split(',');
                                                                var destroy = new Array();
                                                                var sum = 0;
                                                                for (a = 0; a < troups.length; a++) {
                                                                        if (gid('pop_max').innerHTML == '26400' && troups[a].split(':')[0] == 'Heavy') {zahlen[a] = String(parseInt(zahlen[a]) - 400)}
                                                                        if (setting['Schrott' + troups[a].split(':')[0]] == '!' || parseInt(setting['Schrott' + troups[a].split(':')[0]]) >= parseInt(zahlen[a])) {destroy[a] = ''}
                                                                        else {
                                                                                destroy[a] = parseInt(zahlen[a]) - parseInt(setting['Schrott' + troups[a].split(':')[0]]);
                                                                                sum += destroy[a] * parseInt(troups[a].split(':')[1]);
                                                                        }
                                                                        gbn(troups[a].split(':')[0].toLowerCase())[0].value = destroy[a];
                                                                }
                                                                if (setting['SchrottSnob'] == '0') {
                                                                        var maxExec = />\((\d+)\)<\/a>/;
                                                                        max = parseInt(maxExec.exec(gbn('snob')[0].parentNode.innerHTML)[1]);
                                                                        sum += max * 100;
                                                                        gbn('snob')[0].value = max;
                                                                }
                                                                if (sum != 0) {
                                                                        if (sum >= 104) {
                                                                                gid('inputx').value = setting['SchrottAttack'].split('|')[0];
                                                                                gid('inputy').value = setting['SchrottAttack'].split('|')[1];
                                                                                gbn('attack')[0].click();
                                                                        }
                                                                        else {
                                                                                gid('inputx').value = setting['SchrottSupport'].split('|')[0];
                                                                                gid('inputy').value = setting['SchrottSupport'].split('|')[1];
                                                                                gbn('support')[0].click();
                                                                        }
                                                                }
                                                                stor.del('troups');
                                                        }
                                                        break;
                                                case confirm:
                                                        if (window.location.href.match(/mode=units.+try=back.+unit_id=/)) {
                                                                var troups = new Array('Spear', 'Sword', 'Axe', 'Archer', 'Spy', 'Light', 'Marcher', 'Heavy', 'Ram', 'Catapult');
                                                                var maxExec = />\((\d+)\)<\/a>/;
                                                                for (a = 0; a < troups.length; a++) {
                                                                        var input = document.getElementsByName(troups[a].toLowerCase())[0];
                                                                        max = parseInt(maxExec.exec(input.parentNode.innerHTML)[1]);
                                                                        input.value = '';
                                                                        if (max > parseInt(setting['Schrott' + troups[a]])) {
                                                                                input.value = max - parseInt(setting['Schrott' + troups[a]]);
                                                                        }
                                                                }
                                                        }
                                                        var input = new Array();
                                                        input = document.getElementsByTagName('input');
                                                        for (a = 0; a < input.length; a++) {if (input[a].type == 'submit' && input[a].value.match('OK')) {input[a].click(); break}}
                                                        break;
                                        }
                                }
                        }
                }
        }, true);
}
 
function addOverviewTasten() {
        var confirm = getKeyCode(overview.confirm);
        //Eventlistener erstellen
        document.addEventListener('keyup', function(event) {
                if (event.which == confirm) {
                        var input = new Array();
                        input = document.getElementsByTagName('input');
                        for (a = 0; a < input.length; a++) {if (input[a].type == 'button' && input[a].parentNode.style.display != 'none' && input[a].getAttribute('onclick').match(/editSubmitNew/)) {input[a].click(); break}}
                }
        }, true);
}
 
function main() {
        load();
        game_data = getGameData();
        if (!game_data.player.premium)  return;
        var pml = gid('pop_max_label');
        pml.addEventListener('click', openSettings, 'false');
        pml.style.cursor = 'pointer';
        pml.title = script + '-Optionen';
        var excludes = /screen=(mail|memo|overview_villages|settings)/;
        if (!window.location.href.match(excludes)) {
                if (setting['StatusNormal'] == '1') {addNormalTasten()}
                else if (setting['StatusDeff'] == '1') {addDeffTasten()}
                else if (setting['StatusSchrott'] == '1') {addSchrottTasten()}
        }
        else if (window.location.href.match(/screen=overview_villages/)) {
                addOverviewTasten();
        }
}
 
main();