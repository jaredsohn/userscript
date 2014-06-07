// ==UserScript==
// @name       TB Script
// @namespace  No homepage :(
// @version    1
// @description  Made by HAsselnöten
// @include    *tribalwars.se/game.php?*
// @inclued    *
// @copyright  2012+, Hasselnöten Inc ^^
// ==/UserScript==



///Global variables
//

var err = 0;

var popup;
var list;
var cdiff = -1;
var body = document.getElementById('ds_body');


TW = {
    player: {
        rank: "",
        score: "",
        username: "",
        village: "",
        alliance: "",
        villages: [],
    },
    global: {
        screen: "",
        world: "",
        coords: "",
    },
    links: {
        ret: "",
        current: window.location.href,
        last: "",
    },
};

Settings = {
    reports: {
        enabled: false,
        spy: false,
        attack: false,
        colorsupport: false,

        min: 0,
        max: 0,
    },
    autospy: {
        enabled: false,
        visible: false,
        spies: 0,
        map: false,
        close: false,

        x: 0,
        y: 0,
    },
    extraclock: {
        enabled: false,
        diff: -1,

        x: 0,
        y: 0,
    },
    stamlist: {
        enabled: false,
        users: [],
        checked: [],

        x: 0,
        y: 0,
    },
    farm: {
        coords: [],
        troops: [],
    },
    timedevent: {
        time: null,
    },
};

//
///


// FIXA EN HAR SKRIVIT LISTA!!
// Högra sidan
// Ta namnen från medlems sidan
// Sett en checkbox DONE


// 1. Set cookie onfocus and when navigates to (Settings.autospy.map = true) -> set to flase onblur and onclose 
// 1. Send_troops -> screen = info_village + cookie last == map
// 2. screen == place


/// 
/// $(window).on('beforeunload', function() { *Function* });
/// 
/// 

/// SETTTINGS POSITION TO ABSOLUTE


// 
// var b = document.getElementById('report_list').parentNode.getElementsByClassName('vis')[1].getElementsByTagName('tr')[0];
// <tr>
// var c = document.createElement('td');
// c.innderHtml = <input type="submit" id="asd">  --> /game.php?screen=map#490;463  cords.split('|') -> screen=map#cords[0];cords[1];
// foreach checkbox on page if checkbox.name.indexOf('id') !=-1; --> thiscb.parentNode.getElementByTagName('span') foreach if id.indexOf('labelText_') -> that.innerHTML.substring(indexOf('|') - 4 + 4)


/// -||-
/// Fixa en shourtcut/fast attack list -> add coords.
/// sett en cookie onclik + redirect
/// 
/// 

// 
// Auto fill form
// Listview (select?)
// Add and remove schems
// 


//
// timed events like 12:00:00 setInterval(code,millisec,lang) // parse to date - date.now .setInterval
// test with date.now.miliseconds. (console.log)
// date.getTime();

// var d = new Date();
// d.setTime(ts * 1000);
// dateString = d.toUTCString();  // or d.toString if local time required
// alert(dateString);

// 
// Egna mallar. Ta bort de gamla?
// 
// 
// 

// 
// Remove scrollbar -> caused by Settings not hidden correctly.
// 

function timedevent() {

    if (Settings.timedevent.time != null) {
        console.log("new Date() " + new Date().getTime() + " - " + Date.parse(Settings.timedevent.time) + " = " + (new Date() - Date.parse(Settings.timedevent.time)));
        var a = setTimeout(function () {

            console.log(new Date().getSeconds() + " : " + new Date().getMilliseconds());

        }, Math.abs(new Date() - Date.parse(Settings.timedevent.time)));

    } else {
        var t = new Date();
        t.setMinutes = t.getMinutes() + 2;
        console.log(t);
        Settings.timedevent.time = "2013 06 05 01:23:00";

    }
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}
init();

function init() {
    clean();
    trim();


    if (typeof (window.google_render_ad) != "undefined") {
        RemoveAdds();
        console.log("No kind of adblocker found. Disabling ads manually for you <3")
    } else
        console.log("If you do not have any kind of adblocker please contact the creator of The Dark Side of TW");

    CheckGlobal();
    timedevent();
    console.log("HEEJ?" + Settings.timedevent.time != null);

    popup = document.createElement('div');
    popup.id = "settings";
    popup.style.visibility = "hidden";
    popup.innerHTML = popup.innerHTML = " <div id=\"hide\" style=\"z-index:100; position:fixed; width:100%; height:100%; top:0px; left:0px; background: rgba(0,0,0,0.5); \"></div> <table style=\"width: 700px; margin-left: -350px; position:absolute; \" id=\"popup_box\" cellspacing=\"0\"> <tbody><tr> <td class=\"popup_box_top_left\"></td> <td class=\"popup_box_top\"></td> <td class=\"popup_box_top_right\"></td> </tr><tr> <td class=\"popup_box_left\"></td> <td class=\"popup_box_content\"> <div> <h1 style=\" margin-left: 268px; \">Settings</h1> <h3 style=\" margin-left: 20px; \">Rapporter</h3> <label style=\" display: block; \"><input type=\"checkbox\" id=\"displayres\">Vill du visa resurserna för varje rapport på rapportöverblicks sidan?</label> <label style=\" display: block; margin-left: 40px; \"><input type=\"radio\" name=\"reportkind\" id=\"reportkind1\">Spejarrapporter</label> <label style=\" display: block; margin-left: 40px; \"><input type=\"radio\" name=\"reportkind\" id=\"reportkind2\">Anfallsrapporter</label><label style=\" display: block; margin-left: 40px; \"><input type=\"radio\" name=\"reportkind\" id=\"reportkind3\">Båda sorterna</label><label style=\" display: block; \"><input type=\"checkbox\" id=\"colorsupport\">Färg support</label> <p> </p><p>Input format: Trä:Lera:Järn</p> <label style=\" display: block; \">Mini. värde: <input type=\"text\" id=\"reportmin\" style=\" margin-left: 3px; \"> (alla raporter under detta värde kommer visas i röd text)</label> <label style=\" display: block; \">Max. värde: <input type=\"text\" id=\"reportmax\"> (alla raporter över detta värde kommer visas i grön text)</label> <h3 style=\" margin-left: 20px; margin-top: 25px; \">Snabbspionera läge</h3> <label style=\" display: block; \"><input type=\"checkbox\" id=\"snabbtoggle\">På/Av</label> <label style=\" display: block; \">Spioner<input type=\"text\" id=\"snabbammount\"> Hur många spioner som ska skickas per gång</label>  <label style=\" display: block; \"><input type=\"checkbox\" id=\"snabbgenväg\">Snabbspionera checkbox genväg i kart fönstret (högra hörnet)</label> <label>Offsets: 'x'<input type=\"text\" id=\"snabbx\"></label><label style=\"display:inline-block;\">'y'<input type=\"text\" id=\"snabby\"></label> <h3 style=\" margin-left: 20px; margin-top: 25px; \">Extra klocka</h3> <label style=\" display: block; \"><input type=\"checkbox\" id=\"clocktoggle\">På/Av</label> <p>Kalibrera Extra klockan</p> <label style=\" display: block; \"><input type=\"text\" id=\"clockh\"> Flyttar klockan 'x' px åt höger (använd negativa tal för att flytta den åt vänster)</label> <label style=\" display: block; \"><input type=\"text\" id=\"clockd\"> Flyttar ner klockan 'x' px (använd negativa tal för att flytta den uppåt)</label> <h3 style=\" margin-left: 20px; margin-top: 25px; \">Checklist för stam medlemmar</h3> <label style=\"display:block;\"><input type=\"checkbox\" id=\"listtoggle\">Visa/Göm</label> <label>x+= <input id=\"listx\" type=\"text\"></label><label>y+= <input id=\"listy\" type=\"text\"></label> <h3 style=\" margin-left: 20px; margin-top: 25px; \">Events</h3> <label style=\"display:block\"><input id=\"evtsnabb\" type=\"checkbox\">Enabel event shortcut</label> <input type=\"submit\" value=\"Add Event\" id=\"evtadd\" style=\"dispalay:block; margin-top:7px\"> </div> <div style=\"text-align:center\"> <input type=\"submit\" value=\"Ändra\" id=\"ändra\" style=\"display:inline-block;margin-top: 25px;\"> <input type=\"submit\" value=\"Avbryt\" id=\"avbryt\" style=\"display:inline-block\"> </div> </div> </td> <td class=\"popup_box_right\"></td> </tr><tr> <td class=\"popup_box_bottom_left\"></td> <td class=\"popup_box_bottom\"></td> <td class=\"popup_box_bottom_right\"></td> </tr> </tbody></table> </div>";
    body.appendChild(popup);

    initlist();

    document.getElementById('hide').addEventListener('click', function () {
        document.getElementById('settings').style.visibility = 'hidden';

        initialize();
    });
    document.getElementById('avbryt').addEventListener('click', function () {
        document.getElementById('settings').style.visibility = 'hidden';

        initialize();
    });
    document.getElementById('clockh').addEventListener('keyup', function () {

        var value = parseInt(document.getElementById('clockh').value) || 0;
        var value2 = parseInt(document.getElementById('clockd').value) || 0;
        xyClock(value, value2);
    });
    document.getElementById('clockd').addEventListener('keyup', function (e) {

        var value = parseInt(document.getElementById('clockd').value) || 0;
        var value2 = parseInt(document.getElementById('clockh').value) || 0;
        xyClock(value2, value);
    });
    document.getElementById('snabbx').addEventListener('keyup', function () {

        var value = parseInt(document.getElementById('snabbx').value) || 0;
        var value2 = parseInt(document.getElementById('snabby').value) || 0;
        xySpy(value, value2);
    });
    document.getElementById('snabby').addEventListener('keyup', function (e) {

        var value = parseInt(document.getElementById('snabby').value) || 0;
        var value2 = parseInt(document.getElementById('snabbx').value) || 0;
        xySpy(value2, value);
    });
    document.getElementById('listtoggle').addEventListener('click', function () {

        document.getElementById('checklist').style.visibility = this.checked ? "visible" : "hidden";
        Settings.stamlist.enabled = this.checked;
        console.log(this.checked);

    });
    document.getElementById('listx').addEventListener('keyup', function (e) {

        var value = parseInt(document.getElementById('listx').value) || 0;
        var value2 = parseInt(document.getElementById('listy').value) || 0;
        xyList(value, value2);
    });
    document.getElementById('listy').addEventListener('keyup', function (e) {

        var value = parseInt(document.getElementById('listx').value) || 0;
        var value2 = parseInt(document.getElementById('listy').value) || 0;
        xyList(value, value2);
    });

    document.getElementById('evtadd').addEventListener('keyup', function (e) {

        var value = parseInt(document.getElementById('listx').value) || 0;
        var value2 = parseInt(document.getElementById('listy').value) || 0;
        xyList(value, value2);
    });

    var apply = document.getElementById('ändra');
    apply.addEventListener('click', function () {
        document.getElementById('settings').style.visibility = 'hidden';

        Settings.reports.enabled = document.getElementById("displayres").checked;
        Settings.reports.spy = document.getElementById("reportkind3").checked ? true : document.getElementById("reportkind1").checked;
        Settings.reports.attack = document.getElementById("reportkind3").checked ? true : document.getElementById("reportkind2").checked;

        Settings.reports.colorsupport = document.getElementById('colorsupport').checked;
        Settings.reports.min = document.getElementById('reportmin').value;
        Settings.reports.max = document.getElementById('reportmax').value;

        Settings.autospy.enabled = document.getElementById('snabbtoggle').checked;
        Settings.autospy.visible = document.getElementById('snabbgenväg').checked;

        Settings.autospy.x = document.getElementById('snabbx').value || 0;
        Settings.autospy.y = document.getElementById('snabby').value || 0;

        Settings.autospy.spies = document.getElementById('snabbammount').value;

        Settings.extraclock.enabled = document.getElementById('clocktoggle').checked;
        Settings.extraclock.x = document.getElementById('clockh').value;
        Settings.extraclock.y = document.getElementById('clockd').value;

        Settings.stamlist.enabled = document.getElementById('listtoggle').checked;
        Settings.stamlist.x = document.getElementById('listx').value;
        Settings.stamlist.y = document.getElementById('listy').value;

        SetCookie("Settings", JSON.stringify(Settings));
        initialize();
        fillSettings();
    });



    initialize();
    fillSettings();
    playerInfo();

    Execute();
}


function initlist() {

    list = document.createElement('div');
    list.id = "checklist";
    list.style.visibility = Settings.stamlist.enabled ? "visible" : "hidden";
    list.innerHTML = "</div> <table style=\"width: 300px; left:" + (100 + parseInt(Settings.stamlist.x)) + "px; top:" + (100 + parseInt(Settings.stamlist.y)) + "px; z-index: 99; position:absolute;\" id=\"listtable\" cellspacing=\"0\"> <tbody><tr> <td class=\"popup_box_top_left\"></td> <td class=\"popup_box_top\"></td> <td class=\"popup_box_top_right\"></td> </tr><tr> <td class=\"popup_box_left\"></td> <td class=\"popup_box_content\"> <div id=\"contentlist\"> <input type=\"submit\" id=\"hidelist\" value=\" Hide \" style=\"margin-top: 15px; margin-left: 45px;\"><input type=\"submit\" value=\"Reset\" id=\"resetlist\" style=\"margin-left: 10px; margin-top: 15px;\"><input type=\"submit\" value=\"Reload\" id=\"reloadlist\" style=\"margin-top: 15px; margin-left: 10px;\"></div> </td> <td class=\"popup_box_right\"></td> </tr><tr> <td class=\"popup_box_bottom_left\"></td> <td class=\"popup_box_bottom\"></td> <td class=\"popup_box_bottom_right\"></td> </tr> </tbody></table>";
    body.appendChild(list);

    var add = document.getElementById('contentlist');
    for (var i = 0; i < Settings.stamlist.users.length; i++) {
        var b = document.createElement('label');
        b.style.marginLeft = "25px";
        b.innerHTML = "<input type=\"checkbox\" id=\"" + i + "hej\" " + (Settings.stamlist.checked[i] ? "checked" : "") + " \">" + Settings.stamlist.users[i];
        b.style.display = "block";
        add.insertBefore(b, document.getElementById("hidelist"));

        document.getElementById(i + 'hej').addEventListener('click', function () {
            var n = parseInt(this.id.replace("hej", ""));
            Settings.stamlist.checked[n] = this.checked;
            SetCookie("Settings", JSON.stringify(Settings));
            console.log(this.checked + "  " + Settings.stamlist.checked[n])
        });
    }

    document.getElementById('hidelist').addEventListener('click', function () {
        list.style.visibility = "hidden";
        Settings.stamlist.enabled = false;
        SetCookie("Settings", JSON.stringify(Settings));
    });
    document.getElementById('reloadlist').addEventListener('click', function () {
        for (var i = 0; i < Settings.stamlist.users.length; i++) {
            document.getElementById(i + "hej").checked = false;
            console.log(document.getElementById(i + "hej"));
            Settings.stamlist.checked[i] = false;
        }
        console.log("asd1");

        allyMemberList();
        console.log("asd");
        SetCookie("Settings", JSON.stringify(Settings));
    });
    document.getElementById('resetlist').addEventListener('click', function () {
        for (var i = 0; i < Settings.stamlist.users.length; i++) {
            document.getElementById(i + "hej").checked = false;
            console.log(document.getElementById(i + "hej"));
            Settings.stamlist.checked[i] = false;

        }
        SetCookie("Settings", JSON.stringify(Settings));

    });

}


function xyClock(xoffset, yoffset) {

    xoffset = parseInt(xoffset);
    yoffset = parseInt(yoffset);

    document.getElementById('sub').style.top = (8 + yoffset) + 'px';
    document.getElementById('add').style.top = (8 + yoffset) + 'px';
    document.getElementById('Tid').style.top = (1 + yoffset) + 'px';

    document.getElementById('sub').style.left = (160 + xoffset) + 'px';
    document.getElementById('add').style.left = (70 + xoffset) + 'px';
    document.getElementById('Tid').style.left = (100 + xoffset) + 'px';
}
function xySpy(xoffset, yoffset) {
    xoffset = parseInt(xoffset);
    yoffset = parseInt(yoffset);

    document.getElementById('spy_cb').style.top = (13 + yoffset) + 'px';
    document.getElementById('cb_p').style.top = (4 + yoffset) + 'px';

    document.getElementById('spy_cb').style.right = (402 + xoffset) + 'px';
    document.getElementById('cb_p').style.right = (265 + xoffset) + 'px';
}
function xyList(xoffset, yoffset) {
    xoffset = parseInt(xoffset);
    yoffset = parseInt(yoffset);

    document.getElementById('listtable').style.left = (100 + xoffset) + 'px';
    document.getElementById('listtable').style.top = (100 + yoffset) + 'px';

}


function playerInfo() {

	var request = new XMLHttpRequest();
	request.open('GET', "/game.php?screen=ranking", false);
	request.send();
	if (request.status === 200) {
		//Modify the downloaded content, so only the Tree Clay and Iron labels is left
		var start = request.responseText.substr(request.responseText.indexOf("class=\"lit\"") - 5, request.responseText.length)
		start = start.substr(0, start.indexOf("</tr>") + 5);


		
		while(start.indexOf("<") !=-1 && start.indexOf(">") !=-1) {
			temp = start.substr(start.indexOf("<") , start.indexOf(">") - start.indexOf("<") + 1);
			start = start.replace(temp, "");
		}

		
		while(start.indexOf("\t") !=-1)
			start = start.replace("\t", "");
		
		start = start.replace("\n", "");
		
		while(start.indexOf("\n\n") !=-1)
			start = start.replace("\n\n", "\n");
		
		start = start.replace("\n", "");
		
			
		start = start.split("\n");
		TW.player.rank = start[0];
		TW.player.username = start[1];
		TW.player.alliance = start[2];
		TW.player.score = start[3];
	}
	
	//Go to overwive and get all villages.

}
function allyMemberList() {

    var request = new XMLHttpRequest();
    request.open('GET', "/game.php?mode=members&screen=ally", false);
    request.send();
    if (request.status === 200) {
        //var resp = request.response.toString().substring(request.response.toString().indexOf("<div id=\"ally_content\">") + 23, request.response.toString().indexOf("</div>", request.response.toString().indexOf("<div id=\"ally_content\">")) + 6);
        //console.log(resp);
        //resp = resp.substring(0, resp.indexOf("<br />"));
        //console.log(resp);
        //resp = resp.replace(resp.substring(resp.indexOf("<tr>"), resp.indexOf("</tr>")));
        //console.log(resp);

        var resp = request.response.toString().substring(request.response.toString().indexOf("<tr class=\"row_a \">"), request.response.toString().lastIndexOf("<tr class=\"row_a \">"));
        var resp2 = request.response.toString().substring(request.response.toString().indexOf("<tr class=\"row_a \">"), request.response.toString().lastIndexOf("<tr class=\"row_b \">"));

        if (resp2.length > resp.length)
            resp = resp2;


        removeById("checklist");



        var a = document.createElement('div');
        a.id = "tmp";
        a.style.visibility = "hidden";
        a.innerHTML = resp;
        document.getElementById('ds_body').appendChild(a);


        var a = a.getElementsByTagName('a');
        var add = document.getElementById('contentlist');

        Settings.stamlist.users = [];
        Settings.stamlist.checked = [];

        
        for (var i = 0; i < a.length; i++) {
            Settings.stamlist.users.push(a[i].innerHTML);
            Settings.stamlist.checked.push(false);
        }

        $('#tmp').remove();

        initlist();
    }
}

// Todo.
// Use it x)
// 1. Get page. Some indexOf and shit...
// 2. Find something to do :D
// 3. Ranking + Score + Username
// DONEopw


// For clock configuration
// Change how you add secs. Turn "real time" to seconds then add cdiff then divide.


function removeById(id)
{
    elem=document.getElementById(id);
    elem.parentNode.removeChild(elem);
}
function removeByElement(elm)
{
    elm.parentNode.removeChild(elem);
}

function CheckGlobal() {


	if (ReadCookie('village_id') == "" || ReadCookie('village_id') == "NaN") {
		var href = window.location.href.replace('http://', '');
		var w = href.substring(0, href.indexOf("."));
		SetCookieOnce('world', w);
	}

	
	if (ReadCookie('village_id') == "" || ReadCookie('village_id') == "NaN") {
		if (screen == "main") {
			var v = window.location.href;
			v = v.substring(v.indexOf("=") + 1, v.indexOf("&"));
			SetCookieOnce('village_id', v);
		}
		else {
			var v = ReadCookie("global_village_id")
			SetCookieOnce('village_id', v);
		}
	}
	
	
	if (ReadCookie('coords') == "" || ReadCookie('coords') == "NaN") {
		var c = document.getElementById('menu_row2').getElementsByClassName('box-item')[2].getElementsByTagName('b')[0].innerText.substring(1, 8);
		SetCookieOnce('coords', c);
	}

	if (ReadCookie('Settings') != "" && ReadCookie('coords') != "NaN") {
	    Settings = JSON.parse(ReadCookie("Settings"));
	    console.log(Settings);
	}


	var wnd = window.location.href;
	var a = wnd.substr(wnd.lastIndexOf("screen=") + 7, wnd.length - (wnd.lastIndexOf("screen=") + 7));
	if (a.indexOf('#') !=-1) {
	    a = a.replace(a.substring(a.indexOf('#'), a.length), "");
	}
	SetCookie("screen", a);


	TW.global.world = ReadCookie('world');
	TW.player.village = ReadCookie('village_id');
	TW.global.coords = ReadCookie('coords');
	TW.global.screen = ReadCookie('screen');

}

function fillSettings() {

    document.getElementById('displayres').checked = Settings.reports.enabled;


    if (Settings.reports.attack && Settings.reports.spy)
        document.getElementById('reportkind3').checked = true;
    else if (Settings.reports.attack)
        document.getElementById('reportkind2').checked = true;
    else
        document.getElementById('reportkind1').checked = true;

    document.getElementById('colorsupport').checked = Settings.reports.colorsupport;
    document.getElementById('reportmin').value = Settings.reports.min;
    document.getElementById('reportmax').value = Settings.reports.max;

    document.getElementById('snabbtoggle').checked = Settings.autospy.enabled;
    document.getElementById('snabbammount').value = Settings.autospy.spies;

    document.getElementById('snabbgenväg').checked = Settings.autospy.visible;
    document.getElementById('snabbx').value = Settings.autospy.x;
    document.getElementById('snabby').value = Settings.autospy.y;

    document.getElementById('clocktoggle').checked = Settings.extraclock.enabled;
    document.getElementById('clockh').value = Settings.extraclock.x;
    document.getElementById('clockd').value = Settings.extraclock.y;

    document.getElementById('listtoggle').checked = Settings.stamlist.enabled;
    document.getElementById('listx').value = Settings.stamlist.x;
    document.getElementById('listy').value = Settings.stamlist.y;



}


//Themse? :D


function initialize() {
    var cb1;
    if (document.getElementById('spy_cb') == null) {
        cb1 = document.createElement("input");
    } else {
        cb1 = document.getElementById('spy_cb');
    }

    cb1.setAttribute("type", "checkbox");
    cb1.setAttribute("name", "spy_cb");
    cb1.setAttribute('style', 'position:absolute;right: ' + (402 + (parseInt(Settings.autospy.x) || 0)) + 'px;top: ' + (13 + (parseInt(Settings.autospy.y) || 0)) + 'px;');
    cb1.setAttribute('id', 'spy_cb');
    cb1.style.visibility = Settings.autospy.visible ? "visible" : "hidden";
    cb1.checked = Settings.autospy.enabled;
    if (document.getElementById('spy_cb') == null) {
        document.getElementById('topTable').appendChild(cb1);
        cb1.addEventListener("click", function () {
            Settings.autospy.enabled = document.getElementById('snabbtoggle').checked = this.checked;
            UpdateSpyLabel();
            SetCookie("Settings", JSON.stringify(Settings));
        }); 
    }


    document.getElementById('spy_cb').checked = Settings.autospy.enabled;
    

    var p;
    if (document.getElementById('cb_p') == null)
        p = document.createElement('p');
    else
        p = document.getElementById('cb_p');

    p.setAttribute("name", "cb_p");
    
    p.setAttribute('style', 'position:absolute;right: ' + (265 + (parseInt(Settings.autospy.x) || 0)) + 'px;top: ' + (4 + (parseInt(Settings.autospy.y) || 0)) + 'px;');
    p.setAttribute('id', 'cb_p');
    p.style.visibility = Settings.autospy.visible ? "visible" : "hidden";

    if (document.getElementById('cb_p') == null) {
        document.getElementById('topTable').appendChild(p);
        p.addEventListener("click", function () { SpyAmount(); });
    }
    UpdateSpyLabel();

    //main button, why del_btn as name? xD Lazy fuck
    if (document.getElementById('Hope') == null) {
        var btn = document.createElement("input");
        btn.setAttribute("type", "submit");
        btn.setAttribute("name", "Hope");
        btn.addEventListener("click", function () {
            popup.style.visibility = "visible";
        });
        btn.setAttribute('style', 'position:absolute;right:10% ;top: 11px;');
        btn.setAttribute('id', 'del_btn');
        btn.setAttribute('value', 'HopE');
        document.getElementById('topTable').appendChild(btn);
    }

    

    if (document.getElementById('logo') == null) {
        var p = document.createElement('p');
        p.setAttribute("name", "logo");
        p.setAttribute('style', 'position:absolute;right: 2%;top: -8px;');
        p.setAttribute('id', 'logo');
        document.getElementById('linkContainer').appendChild(p);
        p.appendChild(document.createTextNode("Hasselnöten Inc ©"));
    }

    //Clock
    var p;
    if (document.getElementById('Tid') == null) {
        p = document.createElement('p');
    } else
        p = document.getElementById('Tid')

    p.setAttribute("name", "Tid");
    p.setAttribute('style', 'position:absolute;left: ' + (100 + (parseInt(Settings.extraclock.x) || 0)) + 'px ;top: ' + (1 + (parseInt(Settings.extraclock.y) || 0)) + 'px;');
    p.setAttribute('id', 'Tid');
    p.style.visibility = Settings.extraclock.enabled ? "visible" : "hidden"
    
    if (document.getElementById('Tid') == null) {
        document.getElementById('topTable').appendChild(p);
        p.appendChild(document.createTextNode(document.getElementById('serverTime').innerText));
        setInterval(function () {
            Tick()
        }, 1000);
    }
    //Clock add secs and subtract secs
    var btn;
    if (document.getElementById('add') == null) {
        btn = document.createElement('input');
    } else {
        btn = document.getElementById('add');
    }

    btn.id = "add";
    btn.type = "button";
    btn.value = "+";
    btn.setAttribute('style', 'position:absolute; left: ' + (70 + (parseInt(Settings.extraclock.x) || 0)) + 'px ;top: ' + (8 + (parseInt(Settings.extraclock.y) || 0)) + 'px;');
    btn.style.visibility = Settings.extraclock.enabled ? "visible" : "hidden";

    if (document.getElementById('add') == null) {
        btn.addEventListener('click', function () {
            cdiff++;
            console.log(cdiff);
        })
        document.getElementById('topTable').appendChild(btn);
    }


    if (document.getElementById('sub') == null) {
        btn = document.createElement('input');
    } else
        btn = document.getElementById('sub');

    btn.id = "sub";
    btn.type = "button";
    btn.value = "-";
    btn.setAttribute('style', 'position:absolute; left: ' + (160 + (parseInt(Settings.extraclock.x) || 0)) + 'px ;top: ' + (8 + (parseInt(Settings.extraclock.y) || 0)) + 'px;');
    btn.style.visibility = Settings.extraclock.enabled ? "visible" : "hidden";

    if (document.getElementById('sub') == null) {
        btn.addEventListener('click', function () {
            cdiff--;
            console.log(cdiff);
        })
        document.getElementById('topTable').appendChild(btn);

    }
	//
}


function Execute() {
    //Checking witch page the script is at, for the scout sending part*
    //Reads some cookies*

    if (TW.global.screen == "map") {
        Settings.autospy.map = true;
        SetCookie("Settings", JSON.stringify(Settings));


        window.onblur = function () {
            Settings.autospy.map = false;
            SetCookie("Settings", JSON.stringify(Settings));
            return null;
        }

        window.onfocus = function () {
            Settings.autospy.map = true;
            SetCookie("Settings", JSON.stringify(Settings));
            return null;
        }

        $(window).on('beforeunload', function () {
            Settings.autospy.map = false;
            SetCookie("Settings", JSON.stringify(Settings));
        });
    }

    if (parseInt(Settings.autospy.spies) != 0 && Settings.autospy.enabled && Settings.autospy.map && TW.global.screen != "map") {
        console.log(TW.global.screen);
        spy();
    }
    else if (TW.global.screen == "report" && Settings.reports.enabled && TW.links.current.indexOf('view') == -1) {
        displayReport();
    }
    
}


function displayReport() {

    var table = document.getElementById('report_list');
    var image = table.getElementsByTagName('img');
    var picked = [];

    for (var i = 0; i < image.length; i++) {
        if (Settings.reports.attack) {
            if (image[i].src.indexOf('green.png') != -1)
                picked.push(image[i]);
        }
        if (Settings.reports.spy)
            if (image[i].src.indexOf('blue.png') != -1)
                picked.push(image[i]);
    }

            
    for (var i = 0; i < picked.length; i++) {
        var id = picked[i].parentNode.getElementsByTagName('input')[0].name.replace("id_", "");
        var label = document.getElementById('labelText_' + id);

        if (label.innerHTML.indexOf('assistans') == -1) {
            var request = new XMLHttpRequest();
            request.open('GET', label.parentNode.href, false);
            request.send();
            if (request.status === 200) {
                var part;
                if (request.response.indexOf("<td width=\"250\">") != -1)
                    part = request.response.substring(request.response.indexOf("<th>Byte:</th>"), request.response.indexOf("</td>", request.response.indexOf("<td width=\"250\">")));
                else
                    part = request.response.substring(request.response.indexOf("<th>Resurser spejade:</th>"), request.response.indexOf("</td>", request.response.indexOf("<th>Resurser spejade:</th><td>")));
                part = part.toString();
                var old = null;
                while (part.indexOf('<') != -1 && part.indexOf('>') != -1) {
                    part = part.replace(part.substring(part.indexOf('<'), part.indexOf('>') + 1), "");

                    if (old == part)
                        break;
                    old = part;
                }

                var newt = label.innerHTML.replace(TW.player.username, "Du");
                newt = newt.replace(newt.substring(newt.indexOf('('), newt.indexOf(')') + 1), "");
                part = part.split(' ');
                part = part.clean('');
                if (part[1].indexOf('spejade') != -1) {
                    part[0] += " " + part[1];
                    part.splice(1, 1);
                }

                if (Settings.reports.colorsupport) {
                    for (var j = 1; j < part.length; j++) {
                        var c;
                        if (Settings.reports.min > parseInt(part[j]))
                            c = "rgb(209, 26, 26)";
                        else if (Settings.reports.max < parseInt(part[j]))
                            c = "rgb(31, 112, 16)";
                        else if (Settings.reports.max > parseInt(part[j]))
                            c = "rgb(216, 189, 83)";
                        part[j] = "<span style=\"color:" + c + ";\"> " + part[j] + "</span>";
                    }
                } 
                label.innerHTML = newt + "<br>" + " [ " + part[0] + " Trä: " + part[1] + " Lera: " + part[2] + " Järn: " + part[3] + " ]";
                
            }
        }

    }

}


function spy() {


    if (TW.global.screen == "info_village") {
        var a = document.getElementById('send_troops');
        window.location.href = a.href;
    }
    else if (TW.global.screen == "place" && TW.links.current.indexOf("&try=confirm") == -1 && document.getElementById('inputx').value != "") {
        var d = window.document;

        d.forms[0].spy.value = parseInt(Settings.autospy.spies);
        document.getElementById('target_attack').click();
    }
    else if (TW.global.screen == "place" && TW.links.current.indexOf("&try=confirm") != -1) {

        document.getElementById('troop_confirm_go').click();
    }
    else {
        console.log("STOPP!!");
        window.close();
    }


}


function Tick() {

    var test = HHMMSSToSec(document.getElementById('serverTime').innerHTML);
    test += cdiff;
    test = SecToDateString(test);
    var hope = test.split(":")
    var Hours = parseInt(hope[0]);
    var Minutes = parseInt(hope[1]);
    var Secs = parseInt(hope[2]);
    //    var Millisec = 0;
    //    if (Millisec < 9) {
    //        Millisec += 1;
    //    } else {
    //        Millisec = 0;
    if (Secs < 59) {
        Secs += 1;
    } else {
        Secs = 0;
        if (Minutes < 59) {
            Minutes += 1;
        } else {
            Minutes = 0;
            Hours += 1;
        }
    }
    //    }

    //var n = new Date();
    //var tid = n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds() + ":" + n.getMilliseconds();
    //document.getElementById('Tid').firstChild.nodeValue = tid;
    var append = "";

    if (Hours < 10) append += "0" + Hours.toString() + ":"; else append += Hours.toString() + ":";
    if (Minutes < 10) append += "0" + Minutes.toString() + ":"; else append += Minutes.toString() + ":";
    if (Secs < 10) append += "0" + Secs.toString(); else append += Secs.toString();
    //var append = Hours + ":" + Minutes + ":" + Secs;
    document.getElementById('Tid').firstChild.nodeValue = append;

    //.appendChild(document.createTextNode(append));
}

function UpdateSpyLabel() {
    //Uppdates the label
    if (Settings.autospy.enabled) {
        var results = "Auto send : True" + ", " + Settings.autospy.spies;
    }
    else {
        var results = "Auto send : False, 0";
    }
    // Not in use
    if (document.getElementById("topTable") != null && document.getElementById("cb_p") != null && false) {
        var x = document.getElementById("topTable");
        var v = document.getElementById("cb_p");
        x.removeChild(v);
    }
    //

    var p = document.getElementById('cb_p');
    try {
        p.removeChild(p.firstChild);
    } catch (e) {}

    try {
        p.appendChild(document.createTextNode(results));
    } catch (e) {}

}
function SpyAmount() {
    //Configuration for sending scouts, then uppdates label
    var p = prompt("How many spys do you want to send?");
    if (parseInt(p) > 0) {
        Settings.autospy.spies = parseInt(p);
        var c = document.getElementById('spy_cb');
        c.checked = true;
    }
    else {
        var c = document.getElementById('spy_cb');
        c.checked = false;
    }
    Settings.autospy.enabled = document.getElementById('spy_cb').checked;

    UpdateSpyLabel();

}

function SecToDateString(totalSec) {
    var hours = parseInt(totalSec / 3600) % 24;
    var minutes = parseInt(totalSec / 60) % 60;
    var seconds = totalSec % 60;

    return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);

}
function HHMMSSToSec(str) {
    str = str.split(':');
    return ((parseInt(str[0]) * 3600) + (parseInt(str[1]) * 60) + parseInt(str[2]))
}

function trim() {
    Array.prototype.trim = function (array) {
        var i,
            len = this.length,
            out = [],
            obj = {};

        for (i = 0; i < len; i++) {
            obj[this[i]] = 0;
        }
        for (i in obj) {
            if (i != "") {
                out.push(i);
            }
        }
        out.sort();
        return out;
    };
}
function clean() {
    Array.prototype.clean = function (deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };
}

function isNegative(nr) {
    return (nr < 0);
}



//Cookie functions
function SetCookie(name, value) {
    var exdays = 365;
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toGMTString()) + "; path=/";
    document.cookie = name + "=" + c_value;
}
function SetCookieOnce(name, value) {
    var c_value = escape(value) + "; path=/";
    document.cookie = name + "=" + c_value;
}
function ReadCookie(cookieName) {
    var theCookie = " " + document.cookie;
    var ind = theCookie.indexOf(" " + cookieName + "=");
    if (ind == -1) ind = theCookie.indexOf(";" + cookieName + "=");
    if (ind == -1 || cookieName == "") return "";
    var ind1 = theCookie.indexOf(";", ind + 1);
    if (ind1 == -1) ind1 = theCookie.length;
    return unescape(theCookie.substring(ind + cookieName.length + 2, ind1));
}
function DelCookie(cookieName) {
    var expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() - 1);
    document.cookie = cookieName + "=" + ((expiry.toGMTString) ? "; expires=" + expiry.toGMTString() : "") + "; path=/";
}
//
//


function DarkThem() {
    var css = "";
    css += "@namespace url(http://www.w3.org/1999/xhtml);";
    css += "body{color:#ffffff!important;background:black!important;}\n.top_bar{}\nhr{border-bottom:1px solid #555!important;border-top:1px solid #555!important;}\n.top_shadow{background:#666!important;}\nth, .vis > h4{border-radius:5px!important;box-shadow:1px 1px 20px #000!important;color:#999!important;background-image: url(http://images.orkut.com/orkut/photos/OQAAAGjCh1OQksKX_V4niIaFuum9FRJ9HjZKVtc1xqYsFaKScS7UwxO-GQFkPj9abVyJSEGOdNX_f8zghkVhmrgy8j0Am1T1UGyNbVn476HmInjGG81NZnrR_z5a.jpg) !important;  background-color: transparent !important;}\n.vis td, .vis_item{color:#bbb!important;background:#000!important;}\nh2{color:#cccccc!important;}\na{color:#f9f9f9!important;}\na:hover{text-shadow:1px 1px 2px aqua!important;}\n.post{background:#111!important;}\n.igmline{background:#333!important;}\n.maincell{background:#111!important;}\n.header-border .firstcell,.icon-box,.box-item{color:#fff!important;border:solid 1px #555!important;padding:3px!important;background:#333!important;}\n.quest{background-color:#111!important;border:1px solid #333!important;}\n.report_transparent_overlay{background-image:none!important;box-shadow: 1px 1px 50px #000 inset !important;}\n#content_value table{border:none !important;}\n#mapCoords{background-color:#000!important;}\n.server_info{color:#fff!important;text-shadow:1px 1px 2px aqua !important;}\n\n.content-border{background:#111!important;border:solid 1px #666!important;}\n#main_layout .bg_left{background:#111!important;}\n#main_layout .bg_bottomleft{background:#111!important;}\n#main_layout .bg_bottomcenter{background:#111!important;}\n#main_layout .bg_bottomright{background:#111!important;}\n#main_layout .bg_right{background:#111!important;}\n#main_layout .bg_leftborder{background:#111!important;}\n.server_info{background:#111!important;}\n#main_layout .bg_rightborder{background:#111!important;}\n#footer,#inline_popup_menu{background-image: url(http://images.orkut.com/orkut/photos/OQAAAGjCh1OQksKX_V4niIaFuum9FRJ9HjZKVtc1xqYsFaKScS7UwxO-GQFkPj9abVyJSEGOdNX_f8zghkVhmrgy8j0Am1T1UGyNbVn476HmInjGG81NZnrR_z5a.jpg) !important;  background-color: transparent !important;}\n\n\n#quickbar_inner .bottomborder .main, .quickbar, .topborder .main, #quickbar_inner .left, #quickbar_inner .right {background-image: url(http://images.orkut.com/orkut/photos/OQAAAGjCh1OQksKX_V4niIaFuum9FRJ9HjZKVtc1xqYsFaKScS7UwxO-GQFkPj9abVyJSEGOdNX_f8zghkVhmrgy8j0Am1T1UGyNbVn476HmInjGG81NZnrR_z5a.jpg) !important;  background-color: transparent !important;}\n#quickbar_inner .left, #quickbar_inner .right{width:1px!important;}\n\n#inner-border{border:solid 1px #555!important;}\ndiv.vis{border:1px solid #000000!important;border-radius:10px!important;box-shadow:1px 1px 20px #000!important;}";
    css += ".maincell table{background: transparent repeat scroll right top!important;color:#fff!important;}\n\n #content_value th{background-color:#333!important;}\n\n#inline_popup_main{border:solid 1px #555!important;background:#333!important;}\n#inline_popup{border:solid 1px #444!important;}\n.forum{background:#333!important;}\n#forum_box{background:#000!important;}\n.thread_button span{color:black!important;}";
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            var node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            heads[0].appendChild(node);
        }
    }
}


function RemoveAdds() {
    var a = document.getElementById("ads");
    var b = document.getElementById("Advertisement");
    var c = document.getElementById("abgb");
    var d = document.getElementById("google_image_div");
    var e = document.getElementById("SkyScraperAd");
    var f = document.getElementById("container");
    var g = document.getElementById("ad_leaderboard");
    if (a != null) {
        a.parentNode.removeChild(a);
    }
    if (b != null) {
        b.parentNode.removeChild(b);
    }
    if (c != null) {
        c.parentNode.removeChild(c);
    }
    if (d != null) {
        d.parentNode.removeChild(d);
    }
    if (e != null) {
        e.parentNode.removeChild(e);
    }
    if (f != null) {
        f.parentNode.removeChild(f);
    }
    if (g != null) {
        g.parentNode.removeChild(g);
    }
}





function FarmScript() {
    if (false) {
        if ((tosend == "" || tosend == "NaN" || tosend.length != 12) && false) {
            alert("You have to set how many troops you want to send. \nAdd --> type \"Set\" or \"Troops\" ");
            SetCookie("Attack", "true");
        }
        else if (false) {

            var d = document;
            if (window.frames.length > 0) d = window.main.document;

            var b = attacklist[currentattack].split("|");
            var c = ReadCookie("toSend").split(',')

            d.forms[0].x.value = b[0];
            d.forms[0].y.value = b[1];

            d.forms[0].spear.value = tosend[0]; //spjutsman
            d.forms[0].sword.value = tosend[1]; //svärdsman
            d.forms[0].axe.value = tosend[2];   // yxman
            d.forms[0].spy.value = tosend[3];   //spejare
            d.forms[0].light.value = tosend[4]; //lätt kavaleri
            d.forms[0].heavy.value = tosend[5]; //tungt kavaleri
            d.forms[0].ram.value = tosend[6];   //murbräcak
            d.forms[0].catapult.value = tosend[7];  //katapult
            d.forms[0].snob.value = tosend[8];  //Adelsman
            d.forms[0].archer.value = tosend[9];//bågskytt
            d.forms[0].marcher.value = tosend[10];  //beriden bågskytt
            d.forms[0].knight.value = tosend[11];   //paladin



            if (currentattack < attacklist.length - 1) {
                currentattack++;
                SetCookieOnce("currentAttack", currentattack);
                SetCookieOnce("Attack", "true");
            }
            else {
                alert("All troops sent!")
                DelCookie("Attack");
                SetCookie("currentAttack", "0");
            }
            confirm();
        }
    }
}
