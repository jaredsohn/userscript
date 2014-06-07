// ==UserScript==
// @name         seolinktool
// @namespace	 http://www.seolinktool.com/
// @include      *
// ==/UserScript==

var seolinkhome = "http://www.seolinktool.com/SLT";
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function buildLoginForm(frm) {
    add_window_style();

    var container = new_node('div', 'seolinktool_form');
    container.className = '__seofrm_window';
    var title = new_node('h1');
    title.className = '__seofrm_title';
    title.appendChild(new_text_node('SEO Link Tool Login'));
    container.appendChild(title);

    var note = new_node('div', '__seofrm_note');
    note.appendChild(new_text_node('Please enter your login details:'));
    container.appendChild(note);

    var data = build_post_data(frm);
    container.appendChild(data);

    var buttons = new_node('div', '__seofrm_buttons');
    var btn_send_mod = new_node('button', '__seofrm_btn_send_mod');
    btn_send_mod.className = '__seofrm_button';
    btn_send_mod.appendChild(new_text_node('Submit'));
    buttons.appendChild(btn_send_mod);
    btn_send_mod.addEventListener('click', function(e) { submitLoginForm(win) }, false);

    var btn_cancel = new_node('button', '__seofrm_btn_cancel');
    btn_cancel.className = '__seofrm_button';
    btn_cancel.appendChild(new_text_node('Cancel'));
    buttons.appendChild(btn_cancel);
    container.appendChild(buttons);
    btn_cancel.addEventListener('click', function(e) { cancelForm(win) }, false);

    var win = Window(container);

    container.form = frm;

    return win;
}

function buildLogoutForm(frm) {
    add_window_style();

    var container = new_node('div', 'seolinktool_form');
    container.className = '__seofrm_window';
    var title = new_node('h1');
    title.className = '__seofrm_title';
    title.appendChild(new_text_node('SEO Link Tool Logout'));
    container.appendChild(title);

    var note = new_node('div', '__seofrm_note');
    note.appendChild(new_text_node('Are you sure you wish to logout?'));
    container.appendChild(note);

    var data = build_post_data(frm);
    container.appendChild(data);

    var buttons = new_node('div', '__seofrm_buttons');
    var btn_send_mod = new_node('button', '__seofrm_btn_send_mod');
    btn_send_mod.className = '__seofrm_button';
    btn_send_mod.appendChild(new_text_node('Submit'));
    buttons.appendChild(btn_send_mod);
    btn_send_mod.addEventListener('click', function(e) { submitLogoutForm(win) }, false);

    var btn_cancel = new_node('button', '__seofrm_btn_cancel');
    btn_cancel.className = '__seofrm_button';
    btn_cancel.appendChild(new_text_node('Cancel'));
    buttons.appendChild(btn_cancel);
    container.appendChild(buttons);
    btn_cancel.addEventListener('click', function(e) { cancelForm(win) }, false);

    var win = Window(container);

    container.form = frm;

    return win;
}

function buildRecordForm(frm) {
    add_window_style();

    var container = new_node('div', 'seolinktool_form');
    container.className = '__seofrm_window';
    var title = new_node('h1');
    title.className = '__seofrm_title';
    title.appendChild(new_text_node('SEO Link Tool information for ' + document.location));
    container.appendChild(title);

    var note = new_node('div', '__seofrm_note');
    note.appendChild(new_text_node('Please enter the details for this page:'));
    container.appendChild(note);

    var data = build_post_data(frm);
    container.appendChild(data);

    var buttons = new_node('div', '__seofrm_buttons');
    var btn_send_mod = new_node('button', '__seofrm_btn_send_mod');
    btn_send_mod.className = '__seofrm_button';
    btn_send_mod.appendChild(new_text_node('Submit'));
    buttons.appendChild(btn_send_mod);
    btn_send_mod.addEventListener('click', function(e) { submitRecordForm(win) }, false);

    var btn_cancel = new_node('button', '__seofrm_btn_cancel');
    btn_cancel.className = '__seofrm_button';
    btn_cancel.appendChild(new_text_node('Cancel'));
    buttons.appendChild(btn_cancel);
    container.appendChild(buttons);
    btn_cancel.addEventListener('click', function(e) { cancelForm(win) }, false);

    var win = Window(container);

    container.form = frm;

    return win;
}

function build_post_data(f) {
    var table = new_node('table');

    var thead = new_node('thead');
    var th_row = new_node('tr');
    var th = new_node('th');
    th.appendChild(new_text_node("Enter SEO Link Tool Data"));
    th_row.appendChild(th);
    table.appendChild(thead);

    var attrs = new Array('alt', 'value');
    var tbody = new_node('tbody');
    var el_count = 0;
    for (var i = 0; i < f.elements.length; i++) {
        if (!f.elements[i].name)
            continue;
        var row = new_node('tr');
        row.className = el_count++ % 2 == 0 ? '__seofrm_row_even' : '__seofrm_row_odd';

        for (var a = 0; a < attrs.length; a++) {
            var cell = new_node('td', '__seofrm_cell_' + attrs[a] + '_' + i);
            cell.className = '__seofrm_cell_' + attrs[a];
            var data;
            if (attrs[a] == 'value') {
                var type = f.elements[i][attrs[a]];
                if (type == 'textarea') {
                    data = new_node('textarea', '__seofrm_cell_value_text_' + i);
                    data.rows = 3;
                } else if (type == 'select') {
                    data = new_node('select', '__seofrm_cell_value_text_' + i);
		    data.addEventListener('click', addOptions, false);
                } else {
                    data = new_node('input', '__seofrm_cell_value_text_' + i);
                    data.type = type;
                    data.maxLength = 1024;
                }
                data.name = f.elements[i].name; 
                data.readOnly = false;
                data.className = '__seofrm_edit_field';
            } else {
                data = new_text_node(f.elements[i][attrs[a]]);
            }
            cell.appendChild(data);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    var data = new_node('div', '__seofrm_post_info');
    data.className = '__seofrm_post_info';
    data.appendChild(table);

    return data;
}

function addOptions(e) {
    var data = e.target;
    GM_xmlhttpRequest({
	method: 'GET',
	url: seolinkhome + '/listtags.php?type=' + data.name,
	headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	    'Accept': 'text/text',
	},
	onload: function(responseDetails) {
	   var text = responseDetails.responseText;
           var texts = text.split("|");
           for (var i = 0; i < texts.length; i++) {
               data.options[i] = new Option(texts[i], texts[i]);
           }
	}
    });
}

function cancelForm(win) {
    win.close();
}

function submitLogoutForm(win) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: seolinkhome + '/logoutxml.php',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/xml',
        },
        onload: function(responseDetails) {
            closeSeoTool();
            initSeoTool();
        }
    });
    win.close();
}
function submitLoginForm(win) {
    GM_xmlhttpRequest({
        method: 'POST',
        url: seolinkhome + '/loginxml.php',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/xml',
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        data : loginFormData(),
        onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText,
                "text/xml");
            var seolink = dom.getElementsByTagName('seolink');
            alert(seolink[0].textContent);
            closeSeoTool();
            initSeoTool();
        }
    });

    win.close();
}

function submitRecordForm(win) {
    GM_xmlhttpRequest({
        method: 'POST',
        url: seolinkhome + '/recordvisitdata.php',
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'text/xml',
            'Content-type' : 'application/x-www-form-urlencoded'
        },
        data : recordFormData(),
        onload: function(responseDetails) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(responseDetails.responseText,
                "text/xml");
            var seolink = dom.getElementsByTagName('seolink');
            alert(seolink[0].textContent);
            closeSeoTool();
            initSeoTool();
        }
    });

    win.close();
}

function loginFormData() {
    var returnData = "";
    var f = document.getElementsByName('__seologinform__')[0];
    for (var i = 0; i < f.elements.length; i++) {
        var edit = document.getElementById('__seofrm_cell_value_text_' + i);
        returnData = returnData + escape(f.elements[i].name) + "=" + escape(edit.value) + "&";
    }
    return returnData;
}

function recordFormData() {
    var returnData = "";
    var f = document.getElementsByName('__seoform__')[0];
    for (var i = 0; i < f.elements.length; i++) {
        var edit = document.getElementById('__seofrm_cell_value_text_' + i);
        if (edit.type == 'checkbox') {
            if (edit.checked) {
                returnData = returnData + escape(f.elements[i].name) + "=true&";
            }
        } else {
            returnData = returnData + escape(f.elements[i].name) + "=" + escape(edit.value) + "&";
        }
    }
    returnData = returnData + 'vdomain=' + escape(document.domain) 
			+ '&vurl=' + escape(document.location)
	 		+ '&vtitle=' + escape(document.title);
    return returnData;
}

function new_node(type, id) {
    var node = document.createElement(type);
    if (id && id.length > 0)
        node.id = id;
    return node;
}

function new_text_node(txt) {
    return document.createTextNode(txt);
}

function add_style(style_id, style_rules) {
    if (document.getElementById(style_id))
        return;

    var style = new_node("style", style_id);
    style.type = "text/css";
    style.innerHTML = style_rules;
    document.getElementsByTagName('head')[0].appendChild(style);
}

function add_window_style() {
    var seofrm_style_rules = ' \
.seolinktool_form { \
  margin: 0; padding: 0; \
} \
 \
.__seofrm_window { \
  background-color: #bfbfff; \
  border-color: #000040; \
  border-style: solid; \
  border-width: 2px; \
  /* opacity: .90; */                           \
  margin: 0px; \
  padding: 1px 2px; \
  position: absolute; \
  text-align: center; \
  visibility: hidden; \
  z-index: 1000; \
 \
  -moz-border-radius: 15px; \
} \
 \
.__seofrm_title { \
  background-color: #4040ff; \
  color: #ffffff; \
  margin: 1px; padding: 1px; \
  font: caption; \
  font-weight: bold; \
  text-align: center; \
  white-space: nowrap; \
  overflow: hidden; \
 \
  -moz-border-radius: 20px; \
} \
 \
#__seofrm_note { \
  border: solid 0px black; \
  color: #800000; \
  margin: 0; \
  font: caption; \
  font-weight: bold; \
  text-align: center; \
} \
 \
#__seofrm_buttons { \
  width: 99%; \
  text-align: center; \
  position: absolute; \
  bottom: 5px; \
} \
 \
.__seofrm_button { \
  background-color: #4040ff; \
  color: #fff; \
  margin: 0 5px; padding: 2px; \
  font: icon; \
  font-weight: bold; \
 \
  -moz-border-radius: 15px; \
} \
 \
.__seofrm_button:hover { \
  background-color: #ff4040; \
  cursor: pointer; \
} \
 \
.__seofrm_post_info { \
  max-height: 335px; \
  overflow: auto; \
  margin: 3px 2px; padding: 0; \
  border: 1px solid #008080; \
} \
 \
.__seofrm_post_info table { \
  width: 100%; \
  font: bold 0.8em "sans serif"; \
} \
 \
.__seofrm_post_info table thead tr { \
  background-color: black; \
  color: white; \
} \
 \
.__seofrm_post_info table td { \
  text-align: left; \
} \
 \
.__seofrm_row_odd { \
  background-color: #eee; \
} \
 \
.__seofrm_row_even { \
  background-color: #ccc; \
} \
 \
.__seofrm_view_field { \
  background-color: inherit; \
  border: 0px solid black; \
  width: 25em; \
  font: bold 2em "sans serif"; \
} \
 \
.__seofrm_edit_field { \
  background-color: #ffc; \
  color: blue; \
  border: 1px solid black; \
  padding: -1px; \
  width: 25em; \
  font: bold 1em "sans serif"; \
} \
';
    add_style("__seofrm_style", seofrm_style_rules);
}

function Window(el) {
    document.getElementsByTagName('body')[0].appendChild(el);
    var win = {
        frame: el,
        open: function() {
            var width = 420;
            var height = 330;
            this.frame.style.width = width + 'px';
            this.frame.style.height = height + 'px';
            this.frame.style.left = parseInt(window.scrollX + (window.innerWidth - width)/2) + 'px';
            this.frame.style.top = parseInt(window.scrollY + (window.innerHeight - height)/2) + 'px';
            this.frame.style.visibility = "visible";
        },
        close: function() {
            this.frame.style.visibility = "hidden";
        },
    };
    return win;
}

function showForm(e) {
    var target = e ? e.target : this;
    var frm;
    if (target.tagName.toLowerCase() == 'input') {
        frm = target.form;
    } else {
        frm = target;
    }
    if (frm.name == '__seoform__') {
	var content = buildRecordForm(frm);
	content.open();
        return false;
    } else if (frm.name == '__seologinform__') {
	var content = buildLoginForm(frm);
	content.open();
        return false;
    } else if (frm.name == '__seologoutform__') {
	var content = buildLogoutForm(frm);
	content.open();
        return false;
    } else {
        frm.real_submit();
    }
}

function closeSeoTool() {
    var seotoolbar=document.getElementById('seotoolbar-div-0'); 
    seotoolbar.parentNode.removeChild(seotoolbar);
}
function initSeoTool() {
siteseen =
'<div id="__seotool_siteseen" align="left" style="display:none; vertical-align:top;"> <span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:5px solid orange;' +
    'text-align:center;">' +
    'Site Visited</span></div>';
pageseen =
'<div id="__seotool_pageseen" align="left" style="display:none; vertical-align:top;"> <span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:5px solid red;' +
    'text-align:center; ">' +
    'Page Visited</span></div>';
noneseen =
'<div id="__seotool_noneseen" align="left" style="display:none; vertical-align:top;"> <span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:5px solid green;' +
    'text-align:center;">' +
    'Not Visited</span></div>';
loginbutton =
'<div id="__seotool_login" align="left" style="display:none; vertical-align:top;"> <span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:2px solid #ffc;' +
    'text-align:center;cursor:pointer"' +
    'title="click to login to seolinktool" ' +
    'onclick="document.__seologinform__.submit();">' +
    'Login &lt;-</span></div>';
logoutbutton =
'<div id="__seotool_logout" align="left" style="display:none; vertical-align:top;">&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:2px solid #ffc;' +
    'text-align:center;cursor:pointer"' +
    'title="click to logout from seolinktool" ' +
    'onclick="document.__seologoutform__.submit();">' +
    'Logout -&gt;</span></div>';
recordbutton =
'<div align="right" style="vertical-align:top;"> <span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:2px solid #ffc;' +
    'text-align:center;cursor:pointer" ' +
    'title="click to record seo data" ' +
    'onclick="document.__seoform__.submit();">' +
	    'Record Visit O</span></div>';
closebutton =
'<div align="right" style="vertical-align:top;"> <span style="margin-top:5px;padding-left:5px;padding-right:5px;margin:3px;width:100px;height:6px;' +
    'border:2px solid #ffc;' +
    'text-align:center;cursor:pointer" ' +
    'title="click to close the seotool bar" ' +
    'onclick="var seotoolbar=document.getElementById(\'seotoolbar-div-0\');seotoolbar.parentNode.removeChild(seotoolbar);">' +
    'Hide X</span></div>';
seologinform = 
'<form name="__seologinform__"  method="POST" target="' + seolinkhome + '/loginxml.php">' +
'<input type="hidden" alt="User" name="user" value="text"/> ' +
'<input type="hidden" alt="Password" name="pass" value="password"/> </form>';

seologoutform =
'<form name="__seologoutform__"  method="POST" target="' + seolinkhome + '/logoutxml.php"></form>'; 

seoform = 
'<form name="__seoform__"  method="POST" target="' + seolinkhome + '/recordvisitdata.php">' +
'<input type="hidden" alt="Visitor" name="vvisitor"  value="select" maxlength="64"/>' +
'<input type="hidden" alt="Project" name="vproject"  value="select" maxlength="64"/>' +
'<input type="hidden" alt="Web Master Email" name="vwmemail"  value="text" maxlength="150"/>' +
'<input type="hidden" alt="Mail Sent?" name="vemailsent" value="checkbox"/>' +
'<input type="hidden" alt="Comment" name="vcomment"  value="textarea" maxlength="1024"/>' +
'<input type="hidden" alt="Custom" name="vcustom"  value="text" maxlength="64"/>' +
'</form>';
text = '<div id="__seotool_text" style="display:block; padding-top:2px;" align="left"><a href="' + seolinkhome + '/home.php"> SEOLinkTool.com</a></div>';
desc = '<div><table id="seotoolbar-table" border=0 width="99%">' +
          '<tr><td valign="top"  width="190">' + text + seoform + seologinform + seologoutform + '</td><td valign="top"  align="left">' 
          + logoutbutton + '</td><td valign="top" >' + loginbutton + '</td><td valign="top" >'
          + pageseen + '</td><td valign="top" >' + siteseen + '</td><td valign="top"  >' + noneseen + '</td><td valign="top"  align="right">'
          + recordbutton + '</td><td valign="top"  align="right" style="padding-right:5px;">'+ closebutton + '</td></tr></table></div>';

div = document.createElement("div");
div.id = "seotoolbar-div-0";
div.innerHTML = desc;

addGlobalStyle(
'#seotoolbar-div-0 {' +
'  position: fixed;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: 0;' +
'  top: auto;' +
'  border: none;' +
'  background: black;' +
'  color: white;' +
'  margin: 1em 0 0 0;' +
'  padding: 2px 0 0.4em 0;' +
'  width: 100%;' +
'  font-family: Verdana, sans-serif;' +
'  font-size: 8pt;' +
'  line-height: 160%;' +
'  height: 20px; ' +
'  z-index: 99999;' +
'  opacity: .70;' +
'}' +
'#seotoolbar-div-0 a,' +
'#seotoolbar-div-0 li,' +
'#seotoolbar-div-0 span,' +
'#seotoolbar-div-0 tr,' +
'#seotoolbar-div-0 td,' +
'#seotoolbar-div-0 strong {' +
'  background-color: transparent;' +
'  color: white;' +
'}' +
'#seotoolbar-div-0 a, ' +
'#seotoolbar-div-0 div {' +
'  margin: 0 1em 0 1em;' +
'  color: white;' +
'  font-family: Verdana, sans-serif;' +
'  font-size: 8pt;' +
'}'
);
document.body.insertBefore(div, document.body.firstChild);
document.body.appendChild(div);

unsafeWindow.HTMLFormElement.prototype.real_submit = unsafeWindow.HTMLFormElement.prototype.submit;
unsafeWindow.HTMLFormElement.prototype.submit = showForm;
window.addEventListener('submit', function(e) {
			showForm(e);
			e.preventDefault();
		    }, false);

GM_xmlhttpRequest({
    method: 'GET',
    url: seolinkhome + '/loginstatusxml.php?',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "text/xml");
        var seolink = dom.getElementsByTagName('seolink');
        if (seolink[0].textContent != '') {
            var logout = document.getElementById("__seotool_logout");
            logout.innerHTML = seolink[0].textContent + logout.innerHTML;
            logout.style.display = 'block';
        }
    }
});
GM_xmlhttpRequest({
    method: 'GET',
    url: seolinkhome + '/visitstatus.php?vdomain='+escape(document.domain)+'+&vurl='+escape(document.location),
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'text/xml',
    },
    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText,
            "text/xml");
        var seolink = dom.getElementsByTagName('seolink');
        document.getElementById("__seotool_" + (seolink[0].textContent)).style.display = 'block';
    }
});
}

initSeoTool();
