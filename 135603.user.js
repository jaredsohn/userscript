// ==UserScript==
// @id             wololo.net-0ed71db0-83b7-4b0d-9d32-04a97688ede3@scriptish
// @name           distract-o-matic+
// @version        1.9.9.3.3
// @namespace      xnx_distract
// @author         Xian Nox + John Omniviz(I just do a terrible job at maintaning it)
// @description    Rescaling for gravatar avatars on /talk + Custom titles
// @include        http://wololo.net/talk/*
// @include        http://forum.coldbird.uk.to/*
// @include        http://forums.hgoel.info/*
// @run-at         document-end
// ==/UserScript==

var re = new RegExp("http://www.gravatar.com/avatar/*");
var redir_re = new RegExp("&redir");
var avi_size = 200;
var sett_script = "";

// http://www.quirksmode.org/js/cookies.html
function setCookie(c_name, value, exdays) {
    if(isNaN(value) || value < 0 || value > 512) {
        alert("Invalid size. [1~512]");
        return false;
    }
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
    alert("Cookie saved. Refresh to update the avatars. ^_^");
    return true;
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	alert("Cookie " + name + " nommed. =^_^=");
}

function checkCookie() {
    var size = readCookie("xnx_distract_avi_size");
    
    if (size != null && size != "") {
        avi_size = size;

    } else {        
        do { size = prompt("Avatar size:", ""); }
        while (isNaN(size) || size < 0 || size > 512);
        
        if (size != null && size != "") {
            setCookie("xnx_distract_avi_size", size, 365);
        }
        avi_size = size;
    }
}

// entry point
checkCookie();
if (avi_size != null && avi_size > 0) {
    for (var i = 0; i < document.images.length; i++) {
        if (document.images[i].src.match(re)) { // it's a gravatar image
            if (document.images[i].src.match(redir_re)) {
                var test = document.images[i].src;
                var testRE = test.match("&redir=(.*)&");
                document.images[i].src = testRE[1];
            } else {
                document.images[i].src += "&s=" + avi_size;
            }
            document.images[i].width = avi_size;
            document.images[i].height = avi_size;
        }
    }
}

function contentEval(source) {
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;

    document.body.appendChild(script);
}

sett_script += "function settingsWindow() {";
sett_script += "    wnd = window.open('','','width=300,height=130');";
sett_script += "    wnd.document.write(\"<html><head></head><body><pre>distract-o-matic settings<br><form><input ";
if (avi_size > 0)
    sett_script += "checked='checked'";
sett_script += " name='distract_enabled_1' type='checkbox' /> Enable huge gravatars<br>Avatar size: <input name='distract_avi_size' type='text' ";
sett_script += " value='" + avi_size +"' ";
sett_script += "/><br><input name='save_settings' type='button' value='Save settings' onclick='if(document.forms[0].distract_enabled_1.checked) setCookie(\\\"xnx_distract_avi_size\\\", document.forms[0].distract_avi_size.value, 356); else setCookie(\\\"xnx_distract_avi_size\\\", 0, 356);'/> <input name='reset' type='button' value='Delete cookie' onclick='eraseCookie(\\\"xnx_distract_avi_size\\\");'/></form></pre></body></html>\");";
sett_script += "    var script = wnd.document.createElement('script');";
sett_script += "    script.setAttribute('type', 'text/javascript');";
sett_script += "    script.setAttribute('src', 'http://xiannox.users.sourceforge.net/distract-o-matic/cookie_v1.js');";
sett_script += "    wnd.document.getElementsByTagName('head')[0].appendChild(script);";
sett_script += "    wnd.focus();";
sett_script += "}";

contentEval(sett_script);

var r = document.createElement('center');
r.innerHTML = "| distract-o-matic <a href='javascript:settingsWindow();'>settings</a>";
document.body.appendChild(r);
r = document.createElement('a');

if(location.href == "http://wololo.net/talk/ucp.php?i=profile&mode=avatar") {
    var ucp_form = document.getElementById("ucp");
    var gen_script = "";
    gen_script += "function generate_gravatar_link() {";
    gen_script += "    document.getElementById(\"ucp\").elements[2].value = \"http://www.gravatar.com/avatar/\" + hex_md5(document.getElementById(\"ucp\").email.value) + \"?s=100&foo=bar.png\";";
    gen_script += "    document.getElementById(\"ucp\").elements[3].value = \"100\";";
    gen_script += "    document.getElementById(\"ucp\").elements[4].value = \"100\";";
    gen_script += "}";
    contentEval(gen_script);

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://xiannox.users.sourceforge.net/distract-o-matic/md5-min.js');
    document.getElementsByTagName('head')[0].appendChild(script);

    ucp_form.innerHTML += "distract-o-matic advanced options: generate gravatar link: <br>";
    ucp_form.innerHTML += "Email (the one used on gravatar): <input type='text' name='email'><input type='button' value='-->' onclick='generate_gravatar_link();'><br>";
}


var i = 0;
var id = 0;

function get_title(id) {
      //Xian Nox
    if (id == 390)
        return "<font color='#800080'>Nyx Avatar</font>";
      //jc_gargma
    if (id == 517)
        return "Princess Random";
      //fouadtjuhmaster 
    if (id == 1075)
        return "He hath seen the light~";
      //fate6
    if (id == 7326)
        return "<image src=https://dl.dropboxusercontent.com/u/88081634/pics/350/twilight_title.jpg>";
      //qwikrazor87
    if (id == 8591)
        return "<span style=color:#808080;font-weight:bold;font-style:italic;><marquee>Perma IP/MAC Banned</marquee></span>";
      //toBsucht 
    if (id == 966)
        return "Very Important Pony";
      //Davee
    if (id == 1400)
       return "l33t h4x0r";
      //rodras
    if (id == 8356)
       return "newb";
      //m0skit0
    if (id == 75)
       return "Thunderbolts and Lightning, very very frightening";
      //neur0n
    if (id == 111)
       return "Usagi-mimi is best mimi";
      //Casavult
    if (id == 4092)
       return "XxMLGxPR0_Sn1p3sxX";
      //Coldbird
    if (id == 442)
       return "a PROfessional";
      //ChemDog
    if (id == 5773)
       return "crazy dancing weirdo man";
      //Wololo
    if (id == 2)
       return "Bears!";
      //thebudds
    if (id == 403)
       return "MJ all day";
      //Dovahkiin
    if (id == 8862)
       return "Fus Ro Dah!!!!";
      //TelcoLou
    if (id == 8535)
       return "Kickin it Old-Shcool";
     //TragicTheBlubbering
    if (id == 87)
       return "Hero of Time";
     //naki-the-curious
    if (id == 3480)
       return "Neko~nyaa";
      //XxGodOfWar2xX
    if (id == 2212)
       return "<image src=https://dl.dropboxusercontent.com/u/88081634/pics/350/fluttershy_title.jpg>";
      //wth
    if (id == 5202)
       return "Exploiting like a BOSS";
      //frank
    if (id == 2956)
       return "Categorized";
      //nisarg_kolhe
    if (id == 661)
       return "A Curious Lurker";
     //Disturbed0ne
    if (id == 1531)
       return "makes good Scootaloo";
     //SMOKE
    if (id == 8320)
       return "<image src=https://dl.dropboxusercontent.com/u/57453425/Distract-O-Matic/title.png>";
    //NNNRT
   if (id == 10300)
      return "Rare Tiger";
    //hgoel0974
   if (id == 10210)
      return "XILIO C#erinator";
    //vitalovesnintendo
   if (id == 41340)
      return "Treason!";
    //codestation
   if (id == 1662)
      return "<image src=http://codestation.nekmo.com/misc/title_bar.png>";
    //DS_Marine
   if (id == 17194)
      return "Now in 2D!";
    //>forces<   
   if (id == 11807)
      return "2 for the price of 1";
    //m1k33
   if (id == 5348)
      return "<span style=color:#FF00FF;font-weight:bold;text-decoration:line-through;>Crossdresser</span>";
    //josh_axey
   if (id == 15533)
      return "<span style=color:#800080;font-weight:bold;font-style:italic;>Maid Wrangler</span>";
    //Default title
      return "Blank Flank";
    return -19;
}

if (window.location.href.indexOf("http://wololo.net/talk/memberlist.php?mode=viewprofile&u=") == 0) {
    id = window.location.href.substr(57);
    if (get_title(id) != -19) {
        var x = document.getElementsByTagName("dl");
        for (i = 0; i < x.length; i++) {
            if(x[i].innerHTML.indexOf("User avatar") != -1) {
                x[i].innerHTML += "<dd style=\"text-align: center;\">"+get_title(id)+"</dd>";
            }
        }
    }
}

if (window.location.href.indexOf("http://wololo.net/talk/viewtopic.php?") == 0) {
    var x = document.getElementsByTagName("dl");
    for (i = 0; i < x.length; i++) {
        if(x[i].innerHTML.indexOf("./memberlist.php?mode=viewprofile&amp;u=") != -1) {
            var split = x[i].innerHTML.indexOf("<dd>&nbsp;</dd>");
            var yav = x[i].innerHTML.substr(x[i].innerHTML.indexOf("./memberlist.php?mode=viewprofile&amp;u=") + 40);
            id = yav.substr(0, yav.indexOf('"'));
            if (get_title(id) != -19) {
                var t2 = x[i].innerHTML.substr(split);
                var t1 = x[i].innerHTML.substr(0, split);
                x[i].innerHTML = t1 + "<dd>"+get_title(id)+"</dd>" + t2;
            }
        }
    }
}