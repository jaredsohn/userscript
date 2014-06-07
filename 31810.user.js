// ==UserScript==
// @name           heise-forum-navigator
// @include        http://www.heise.de/*
// ==/UserScript==

// *************************************************************
// ***   heise-forum-navigator *** (c) 2008 Bernd Kreuss     ***
// *** This Script is freeware / Dieses Script ist Freeware  ***
// ***      Wer es verbessert moege aber bitte dennoch       ***
// ***            nicht meinen Namen entfernen               ***
// *************************************************************

/* Dieses Greasemonkey Script dient der schnellen Navigation im Heiseforum
unter Zuhilfenahme der Tastatur. Zusaetzlich verfuegt es noch ueber ein paar
Layout-Anpassungen die helfen sollen die Aufmerksamkeit auf das Wesentliche zu
lenken.

Installation:
============
1 Verwenden Sie Firefox als Webbrowser.
2 Installieren Sie das Firefox-Add-On Greasemonkey.
3 Installieren Sie in Greasemonkey dieses Script fuer http://www.heise.de/*

(Greasemonkey wird wissen wollen, welches Ihr Editor ist. Waehlen Sie
einen, der gut mit JavaScript zurecht kommt. Diese Wahl wird in
about:config gespeichert und kann dort geaendert werden)

(wenn sie dieses script als .js speichern und mit Firefox oeffnen oder
per drag'n'drop hineinziehen wird ihnen ebenfalls die Installation in 
Greasemonkey angeboten werden)

Konfiguration
=============
Auf jeder Heiseforenseite sehen Sie ganz links oben genau in der Ecke ein 
kleines Symbol. Klicken Sie darauf um den Konfigurationsdialog zu öffnen.
Die Konfiguration ist auch ueber das Greasemonkey-Menue zu erreichen.
 
Verwendung
==========
Betreten Sie bei Heise ein beliebiges Forum. Sie sehen eine Liste mit
16 Thread-Eroeffnungen, die oberste ist gelb hinterlegt. Betaetigen Sie
die Pfeiltasten "Up" und "Down" um die gelbe Markierung zu bewegen.

Sobald sie am untersten Thread angekommen sind und die "Down"-Taste noch
einmal druecken wird zur naechst-aelteren Seite gewechselt sofern es eine 
gibt, entsprechend wird bei Betaetigung der "Up"-Taste am oberen Rand in 
Richtung neuere Postings geblaettert sofern moeglich.

Sind sie bereits ganz oben beim neuesten Thread wird durch erneutes
Druecken von "UP" ein Reload der Übersichtsseite ausgeführt.

Druecken Sie die Pfeiltaste fuer Rechts, dann wird versucht, ein neues 
Fenster/Tab (je nachdem wie sie Tab-Browsing konfiguriert haben) zu
oeffnen und Sie koennen das erste Posting des betreffenden Threads lesen.

Bitte definieren Sie hierfuer eine PopUp-Blocker-Ausnahme fuer Heise.de!

"Right" und "Left" koennen Sie nun verwenden um in diesem Thread von
Posting zu Posting zu blaettern. "Up"/"Down" behalten auf diesen
Seiten ihre normale Funktion fuer Scrolling des Bildschirms. "Left" im
ersten Posting des Threads schliesst das Tab/Fenster wieder und bringt
Sie somit zurueck zur Uebersicht.

Klicken Sie auf den Antworten-Hotkey (Taste f) und Sie koennen
auf ein Posting antworten. Benachrichtigungs-Checkbox, Zitat und
Signatur werden automatisch gemaess Ihrer Konfiguration gesetzt. 
Bitte beachten Sie, dass das automatische Einfuegen eines Zitates 
einen Reload verursacht, was die Funktion des Zurueck-Buttons im 
Browser beeintraechtigt.

Klicken Sie auf den Schliessen-Hotkey (Taste x) und das
Posting-Lese-Fenster oder -Tab wird geschlossen und sie sind
wieder in der Thread-Uebersicht.
*/

//das sind die Keycodes fuer die Pfeiltasten. ich weiss nicht, ob die
//von der Platform abhaengen. hier bei mir zumindest gelten die folgenden Codes: 
var keycode = {
    down : 40,
    up : 38,
    left: 37,
    right : 39,
    pg_up : 33,
    pg_down: 34
};

// kann man das irgendwie machen? Ich will an die history rankommen zum schnellen Blättern.
// Untiger Aufruf wird schweigend abgeschmettert, gibt es eine Möglichkeit, diese Rechte
// permanent zu setzen? E-Mail bitte an mich.
// unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");

var conf = new configuration();
var page = new pageParser();
var keys = new keyMapper();

//Auf einer Artilekseite
if (page.e_forum_link){
    keys.mapLink(page.e_forum_link, keycode.right, "right", true);
    keys.mapLink(page.e_article_next, keycode.pg_up, "page-up");
    keys.mapLink(page.e_article_prev, keycode.pg_down, "page-down");
    keys.installHandler();
}

//Auf den Seiten fuer Forum- und Thread-Uebersicht und Posting-Lesen 
if (page.e_forum_navi){
    if (conf.get("forum_set_position")){
        page.e_forum_titel && (page.e_forum_titel.display = "none");
        isolate(page.e_forum, conf.get("forum_left"), conf.get("forum_top"), conf.get("forum_width"));
    }
    
    if (page.e_answer){
        //in einem Posting
        keys.mapLink(page.e_pnext, keycode.right, "right");
        if (page.e_pback){
            keys.mapLink(page.e_pback, keycode.left, "left");
        }else{
            keys.map(keycode.left, closeWindow);
        }
        keys.mapLink(page.e_answer, conf.get("key_answer"), conf.get("key_answer"));
        keys.mapLink(page.e_post, conf.get("key_post"), conf.get("key_post"));
        keys.map(conf.get("key_close"), closeWindow);

        //bewertungen (nur ++ und --)
        keys.mapLink(page.e_minus, "-");
        keys.mapLink(page.e_plus, "+");

        //bei Darstellung in Eingangsreihenfolge
        keys.mapLink(page.e_naechster, keycode.pg_up, "page-up");
        keys.mapLink(page.e_vorheriger, keycode.pg_down, "page-down");
        
        //bei Darstellung in Threads
        keys.mapLink(page.e_tnewer, keycode.pg_up, "page-up");
        keys.mapLink(page.e_tolder, keycode.pg_down, "page-down");
    }else{
        //in der Uerbersicht
        keys.map(keycode.left, closeWindow);
        keys.map(conf.get("key_close"), closeWindow);
        keys.mapLink(page.e_newer, keycode.pg_up, "page-up");
        keys.mapLink(page.e_older, keycode.pg_down, "page-down");
        keys.mapLink(page.e_post, conf.get("key_post"), conf.get("key_post"), true);
        
        if (page.o_thread_list){
            keys.map(keycode.up, function(){page.o_thread_list.up()});
            keys.map(keycode.down, function(){page.o_thread_list.down()});
            keys.map(keycode.right, function(){page.o_thread_list.go()});
        }
    }
    keys.installHandler();
}

//Auf der Seite fuer Posting schreiben
if (page.e_chk_email){
    if (conf.get("forum_set_position")){
        isolate(page.e_forum, conf.get("forum_left"), conf.get("forum_top"), conf.get("forum_width"))
    }

    //E-Mail-Benachrichtigung?
    if (conf.get("post_email")){
        page.e_chk_email.checked = true;
    }

    //Zitat?
    var flag_quote_clicked = false;
    if (conf.get("post_quote")){
        //ist die Textbox noch leer?
        if (!page.e_textarea.value){
            if(page.e_quote_button){
                page.e_quote_button.click();
                var flag_quote_clicked = true;
            }
        }
    }

    //Signatur
    var sig = "\n\n\n" + conf.get("post_signature");
    if (sig && !flag_quote_clicked){
        if (!page.e_textarea.value){
            page.e_textarea.value = sig;
        }else{
            var ls = sig.length;
            var lt = page.e_textarea.value.length;
            if (ls > lt){
                page.e_textarea.value += sig;
            }else{
                if (page.e_textarea.value.substr(lt - ls) != sig){
                    page.e_textarea.value += sig;
                }
            }
        }
    }

    page.e_textarea.focus();
}

// Bindet Funktionen an Tasten.
function keyMapper(){
    this.mapping = {}
    var that = this;

    // Bindet eine beliebige Funktion an eine beliebige Taste.
    // key kann entweder ein numerischer keycode oder ein Zeichen sein.
    this.map = function(key, handler){
        this.mapping[key] = handler;
    }

    // Bindet eine Taste an ein <a>-Element und beschriftet dieses.
    this.mapLink = function(link, key, lbl, new_window){
        if (link){
            lbl && mark(link, lbl);
            this.map(key, function(){
                if (new_window){
                    window.open(link.href);
                }else{
                    if (document.referrer == link.href){
                        history.back();
                    }else{
                        document.location.href = link.href;
                    }
                }
            });
        }
    }

    // Installiert den Hook fuer die Tastaturereignisse
    this.installHandler = function(){
        document.addEventListener("keypress", this.handler, true);
    }
    
    this.removeHandler = function(){
        document.removeEventListener("keypress", this.handler, true);
    }

    // Der eigentliche Event-Handler. Sucht nach einem evtl. von uns
    // definierten Mapping fuer die jeweilige Taste und falls eines 
    // vorhanden ist ruft er die damit verknuepfte Funktion auf. 
    this.handler = function(event){
        if (event.keyCode in that.mapping){
            that.mapping[event.keyCode].call();
            event.preventDefault();
            event.stopPropagation();
        }
        
        if (String.fromCharCode(event.charCode) in that.mapping){
            that.mapping[String.fromCharCode(event.charCode)].call();
            event.preventDefault();
            event.stopPropagation();
        }
    }
}

//Sucht mittels xpath-Ausdruecken alle relevanten Elemente aus der Seite
function pageParser(){ 
    this.e_body = document.body;

    //News-Seite
    this.e_forum_link = xpath(document, '//a[contains(.,"Kommentare lesen") or .="Kommentieren"]');
    this.e_article_next = xpath(document, '//a[contains(.,"chste")]');
    this.e_article_prev = xpath(document, '//a[contains(.,"Vorige")]');
    
    //Forum
    this.e_forum = xpath(document, '//div[@class="forum_content"] | //td[@class="f-content" or @class="content" or @id="content"]');
    this.e_forum_navi = xpath(document, '//ul[@class="forum_navi"]');
    this.e_forum_titel = xpath(this.e_forum, 'div[@class="forum_titel"]');
    this.e_pback = xpath(this.e_forum_navi,'li[contains(.,"Beitrag")]/a[.="<<"]');
    this.e_pnext = xpath(this.e_forum_navi,'li[contains(.,"Beitrag")]/a[.=">>"]');
    this.e_tnewer = xpath(this.e_forum_navi,'li[contains(.,"Thread")]/a[.="<<"]');
    this.e_tolder = xpath(this.e_forum_navi,'li[contains(.,"Thread")]/a[.=">>"]');
    this.e_answer = xpath(this.e_forum_navi,'li/a[.="Beantworten"]');
    this.e_minus = xpath(this.e_forum, '//a[@class="wertenminus" and contains(@title, "belangloser")]');
    this.e_plus = xpath(this.e_forum, '//a[@class="wertenplus" and contains(@title, "lesenswert")]');
    
    //Posting blaettern in Eingangsreihenfolge
    this.e_vorheriger = xpath(this.e_forum_navi, 'li/a[.="Vorheriger"]');
    this.e_naechster = xpath(this.e_forum_navi, 'li/a[contains(.,"chster")]');

    //Posting-Seite
    this.e_textarea = xpath(document, '//textarea[@name="message"]');
    this.e_chk_email = xpath(document, '//input[@name="mail_if_answer"]');
    this.e_quote_button = xpath(document, '//input[@name="quote"]');

    //Thread-Liste
    this.e_thread_tree = xpath(document, '//ul[@class="thread_tree" or @class="fora_list"]');
    this.e_thread_list = xpathAll(this.e_thread_tree, 'li/div[@class="hover"]');
    this.e_newer =  xpath(this.e_forum_navi,'li/a[.="Neuere"]');
    this.e_older =  xpath(this.e_forum_navi,'li/a[contains(.,"ltere")]');
    this.e_post = xpath(this.e_forum_navi, 'li/a[.="Neues Thema"]');    
    
    //wenn wir zuvor zurueckgeblaettert haben, dann erkennen wir das
    //anhand des Fragezeichens am Ende der URL (weil wir die Seite beim
    //zurueckblaettern mit einen angehaengten Fragezeichen aufgerufen haben)
    var back = (document.location.href[document.location.href.length -1] == "?");

    //Dieses Objekt macht den navigierbaren Balken in der Thread-Liste
    if (!this.e_answer){
        this.o_thread_list = new ThreadList(this.e_thread_list, back);
    }
}

//Liefert das erste Element das auf den xpath matcht
function xpath(root, path, show_debug){
    if (root){
        var res = document.evaluate(path, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var element = res.snapshotItem(0);
        show_debug && debug(element);
        return element;
    }else{
        return false;
    }
}

//Liefert alle Elemente die auf den xpath matchen als Javascript-Array
function xpathAll(root, path, show_debug){
    var list = [];
    if (root){
        var res = document.evaluate(path, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i=0 ; i < res.snapshotLength; i++){
            show_debug && debug(res.snapshotItem(i));
            list.push(res.snapshotItem(i));
        }
    }
    return list;
}

function mark(element, text){
    element && (element.innerHTML += " <em>[" + text + "]</em>");
}

function debug(element){
    element && (element.style.border = "5px solid red");
}

function closeWindow(){
    window.close();
}

// Stellt ein Element auf der Seite frei. Es verschwindet alles bis auf
// das jeweilige Element welches neue absolute Position und Groesse erhaelt.
function isolate(element, left, top, width){
    // Die *gesamte* Seite wird nach links aus dem Blickfeld geschoben
    var b = document.body;
    b.style.position = "absolute";
    b.style.left = "-2000px";
    b.style.background = "none";

    // Das fragliche Element wird nunmehr direkt an body angehaengt
    // und relativ dazu wieder genauso weit nach rechts geschoben.
    b.appendChild(element);
    element.style.position = "absolute";
    element.style.top = top + "px";
    element.style.left = 2000 + parseInt(left) + "px";
    element.style.width = width + "px";
}

// Der gelbe Balken fuer die Navigation in der Threaduebersicht
// Enthaelt eine Liste der hover-DIVs und eine dazu passende Liste
// der zugehoerigen Links. Kann ein neues Fenster oeffnen um dem Link
// zu folgen, vor und zurueckblaettern und die Seite neu laden falls 
// die Markierung auf der ersten seite oben anstoesst.
function ThreadList(divs, backwards){
    this.divs = divs;
    this.href = "";
    this.last = this.divs.length - 1;
    this.pos = 0;
    if (backwards){
        this.pos = this.last;
    }

    // wird vom keymaping aufgerufen. bewegt den Balken nach oben.
    this.up = function(){
        if (this.pos > 0){
            this.pos--;
            this.highlight();
        }else{
            if (page.e_newer){
                //geh zur "neuere"-Seite
                this.color("orangered");
                document.location.href = page.e_newer.href + "?";
            }else{
                //"neuere" gibts nicht, also reload
                this.color("greenyellow");
                if (document.location.href[document.location.href.length -1] == "?"){
                    document.location.href = document.location.href.substr(0, document.location.href.length -1);
                }else{
                    document.location.href += "";
                }
            }
        }
    }

    // wird vom keymaping aufgerufen. bewegt den Balken nach unten.
    this.down = function(){
        if (this.pos < this.last){
            this.pos++;
            this.highlight();
            return true;
        }else{
            if (page.e_older){
                //geh zur "aeltere"-Seite
                this.color("orangered");
                document.location.href = page.e_older.href;
            }
        }
    }

    this.color = function(value){
        this.divs[this.pos].style.background = value;
    }

    // malt den Balken neu. wird nach jeder Bewegung aufgerufen.
    this.highlight = function(){
        for (var i = 0; i <= this.last; i++){
            this.divs[i].style.background = "none";
        }
        this.color("yellow");
        var link = xpath(this.divs[this.pos], 'div[@class="thread_title" or @class="forum_title"]/a');
        if (link){
            this.href = link.href;
        }else{
            this.href = null;
        }
    }
    
    // oeffnet den Link, der gerade unter dem gelben Balken liegt.
    this.go = function(){
        this.href && window.open(this.href);
    }

    if (this.divs.length){
        this.highlight();
    }
}

// Die persistente Konfiguration inclusive Konfigurationsdialog
// und Link sowie Menueeintrag zum selbigen.
function configuration(){
    this.settings = {
        //default settings
        forum_set_position : false,
        forum_top : 20,
        forum_left : 20,
        forum_width : 950,
        key_post : "p",
        key_answer : "f",
        key_close : "x",
        post_signature : "-- \nTastaturnavigation im Heise-Forum, Signaturen und mehr\nmit Greasemonkey und dem heise-forum-navigator\n",
        post_quote : true,
        post_email : true
    }

    this.load = function(){
        for (var key in this.settings){
            this.settings[key] = GM_getValue(key, this.settings[key]);
        }
    }

    this.save = function(){
        for (var key in this.settings){
            GM_setValue(key, this.settings[key]);
        }
    }

    this.get = function(key){
    return this.settings[key];
    }

    this.set = function(key, value){
        this.settings[key] = value;
    }

    this.handlerOpen = function(){
        if (this.dialogDiv == null){
            var html = '<h1>heise-forum-navigator::configurator</h1>';
            html += '<table>';
            html += '<tr><td colspan="2"><input type="checkbox" id="cfg_forum_set_position">Use values below to force forum position if you have no user style<br>(which would be the better and cleaner solution).</td></tr>';
            html += '<tr><td>Left:</td><td><input type="text" id="cfg_forum_left" value=""></td></tr>';
            html += '<tr><td>Top:</td><td><input type="text" id="cfg_forum_top" value=""></td></tr>';
            html += '<tr><td>Width:</td><td><input type="text" id="cfg_forum_width" value=""></td></tr>';
            html += '<tr><td>Key Post:</td><td><input type="text" id="cfg_key_post" value=""></td></tr>';
            html += '<tr><td>Key Answer:</td><td><input type="text" id="cfg_key_answer" value=""></td></tr>';
            html += '<tr><td>Key Close:</td><td><input type="text" id="cfg_key_close" value=""></td></tr>';
            html += '<tr><td colspan="2"><input type="checkbox" id="cfg_post_quote">Quote automatically</td></tr>';
            html += '<tr><td colspan="2"><input type="checkbox" id="cfg_post_email">Send e-mail</td></tr>';
            html += '<tr><td>Signature</td><td><textarea id="cfg_post_signature" cols="60" rows="5"></textarea></td></tr>';
            html += '<tr><td></td><td align="right"><input type="button" id="cfg_cancel" value="Cancel">';
            html += '<input type="button" id="cfg_save" value="Save"></td></tr>';
            html += '</table>';

            var css = "position: fixed; top: 20px; left: 20px; padding: 10px; ";
            css += "background: yellow; border: 1px solid blue; ";

            var d = document.createElement('div');
            d.innerHTML = html;
            d.style.cssText = css;
            document.body.appendChild(d)
            this.dialogDiv = d;

            for (var key in this.settings){
                var element = document.getElementById("cfg_" + key);
                if (element){
                    if (element.getAttribute("type") == "checkbox"){
                        element.checked = this.get(key);
                    }else{
                        element.value = this.get(key);
                    }
                }
            }

            this.handlerDataChanged();
            var p = document.getElementById("cfg_forum_set_position");
            var c = document.getElementById("cfg_cancel");
            var s = document.getElementById("cfg_save");
            p.addEventListener("click", function(){that.handlerDataChanged()}, true);
            c.addEventListener("click", function(){that.handlerCancel()}, true);
            s.addEventListener("click", function(){that.handlerSave()}, true);
        }
    }

    this.setEnabled = function(id, enabled){
        var el = document.getElementById(id);
        if (el){
            el.disabled = !enabled;
        }
    }

    this.handlerDataChanged = function(){
        if (document.getElementById("cfg_forum_set_position").checked){
            this.setEnabled('cfg_forum_left', true);
            this.setEnabled('cfg_forum_top', true);
            this.setEnabled('cfg_forum_width', true);
        }else{
            this.setEnabled('cfg_forum_left', false);
            this.setEnabled('cfg_forum_top', false);
            this.setEnabled('cfg_forum_width', false);
        }
    }

    this.handlerSave = function(){
        for (var key in this.settings){
            var element = document.getElementById("cfg_" + key);
            if (element){
                if (element.getAttribute("type") == "checkbox"){
                    this.set(key, element.checked);
                }else{
                    this.set(key, element.value);
                }
            }
        }
        this.save();
        this.handlerCancel();
        document.location.href += "";
    }

    this.handlerCancel = function(){
        document.body.removeChild(this.dialogDiv); 
        this.dialogDiv = null;
    }

    this.addLink = function(){
        var link = document.createElement('div');
        link.innerHTML = "&pi;";
        link.style.cssText = "position: fixed; top: 0px; left:0px;";
        document.body.appendChild(link);
        link.addEventListener('click', function(){that.handlerOpen()}, true);
    }

    this.addMenuCommand = function(){
        GM_registerMenuCommand(
            "heise-forum-navigator::configurator",
            function(){that.handlerOpen()}
        );
    }

    var that = this;
    this.dialogDiv = null;
    this.load();
    this.addLink();
    this.addMenuCommand();
}
