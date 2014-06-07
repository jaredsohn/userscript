// ==UserScript==
// @id             forum.prometheus.uk.to-fe684446-e88a-460d-bcf2-7af6c7c0292e@xnx_pro_distract
// @name           distract-o-matic: pro edition
// @version        1.0
// @namespace      xnx_pro_distract
// @author         Xian Nox
// @description    Resizes gravatars on the Prometheus forums
// @include        http://forum.prometheus.uk.to/
// @include        http://forum.prometheus.uk.to/index.php*
// @include        http://forum.prometheus.uk.to/memberlist.php*
// @include        http://forum.prometheus.uk.to/viewtopic.php*
// @include        http://forum.prometheus.uk.to/viewforum.php*
// @include        http://forum.prometheus.uk.to/search.php*
// @include        http://forum.prometheus.uk.to/ucp.php*
// @include        http://forum.prometheus.uk.to/mcp.php*
// @require        http://xiannox.users.sourceforge.net/distract-o-matic/cookie_v1.js
// @run-at         document-end
// ==/UserScript==

var re = new RegExp("http://www.gravatar.com/avatar/*");
var avi_size = 200;
var sett_script = "";

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

for (var i = 0; i < document.images.length; i++) {
    if (avi_size > 0) {
        if (document.images[i].src.match(re)) {
           document.images[i].src += "&s=" + avi_size;
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
sett_script += " name='distract_enabled_1' type='checkbox' /> Enable huge gravatars<br><input name='distract_enabled_2' type='checkbox' /> Force avatar resize (n/a)<br>Avatar size: <input name='distract_avi_size' type='text' ";
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

if(location.href == "http://forum.prometheus.uk.to/ucp.php?i=profile&mode=avatar") {
    var ucp_form = document.getElementById("ucp");
    var gen_script = "";
    gen_script += "function generate_gravatar_link() {";
    gen_script += "    document.getElementById(\"ucp\").elements[4].value = \"http://www.gravatar.com/avatar/\" + hex_md5(document.getElementById(\"ucp\").email.value) + \"?s=120&foo=bar.jpg\";";
    gen_script += "    document.getElementById(\"ucp\").elements[5].value = \"120\";";
    gen_script += "    document.getElementById(\"ucp\").elements[6].value = \"120\";";
    gen_script += "}";
    contentEval(gen_script);

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://xiannox.users.sourceforge.net/distract-o-matic/md5-min.js');
    document.getElementsByTagName('head')[0].appendChild(script);

    ucp_form.innerHTML += "distract-o-matic advanced options: generate gravatar link: <br>";
    ucp_form.innerHTML += "Email (the one used on gravatar): <input type='text' name='email'><input type='button' value='-->' onclick='generate_gravatar_link();'><br>";
}