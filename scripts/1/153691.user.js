// ==UserScript==
// @name        BBCode Restrictions
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description Stop annoying BBCode usage like super large text, bright colors, alignment, and special fonts.
// @include     http://forum.onverse.com/showthread.php*
// @include     http://forum.onverse.com/newreply.php*
// @version     1.4
// ==/UserScript==

function getStyle(oElm, strCssRule){
    // Source: http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue.toLowerCase();
}
function splitDecimalRGB(color) {
    // Source: http://haacked.com/archive/2009/12/29/convert-rgb-to-hex.aspx
    if (color.substr(0, 1) === '#') {
        return false;
        // Don't need to do this
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    return [red, green, blue];
}
function normalizeColor(element) {
    var a = splitDecimalRGB(getStyle(element,'color'));
    var difference = Math.pow(Math.sqrt(Math.abs(245-a[0])) + Math.sqrt(Math.abs(255-a[1])) + Math.sqrt(Math.abs(255-a[2])),2);
    if(difference > 600)
        return;
    var changeEach = Math.pow(Math.sqrt(600-difference)/3,2);
    var notEnough;
    var i;
    for(i = 0; i < 3; i++)
        if(a[i] < changeEach) {
            changeEach += a[i]/2;
            notEnough = i;
            a[i] = 0;
            break; // Can do this because a single color is going to be different enough
        }
    changeEach=Math.floor(changeEach);
    for(i = 0; i < 3; i++) {
        if(i == notEnough)
            continue;
        a[i]-=changeEach;
    }
    element.style.color = 'rgb('+a[0]+','+a[1]+','+a[2]+')';
}
function normalizeSize(element) {
    if(parseInt(getStyle(element, "font-size")) > 24)
        element.style.fontSize = "24px";
}
function normalizeAlignment(element) {
    if(getStyle(element, "text-align").indexOf('left') == -1)
        element.style.textAlign = 'left';
}
function normalizeFont(element) {
    if(window.values.fontList.length > 0)
        window.values.fontList.forEach(function(a){if(getStyle(this,"font-family") == a.trim()) this.style.fontFamily = "verdana,geneva,lucida,'lucida grande',arial,helvetica,sans-serif";},element)
    else if(!!element.face)
        element.style.fontFamily = "verdana,geneva,lucida,'lucida grande',arial,helvetica,sans-serif";
}

window.values = {color: true, size: true, align: false, font: false, fontList: []};
if(localStorage) {
    if(localStorage["ovForumColor"] == 'false')
        window.values.color = false;
    if(localStorage["ovForumSize"] == 'false')
        window.values.size = false;
    if(localStorage["ovForumAlign"] == 'true')
        window.values.align = true;
    if(localStorage["ovForumFont"] == 'true') {
        window.values.font = true;
        if(localStorage["ovForumRemoveFonts"])
            window.values.fontList = localStorage["ovForumRemoveFonts"].split(',');
        window.values.fontList.forEach(function(a){a = a.replace(/^\s+|\s+$/g, '');}); // Trim
    }
}
var i;
var posts = document.getElementsByClassName('alt1');
var lookThrough = [];
for(i = 0; i < posts.length; i++)
    lookThrough = lookThrough.concat(Array.prototype.slice.call(posts[i].getElementsByTagName('font')));
if(window.values.color)
    lookThrough.forEach(function(a){normalizeColor(a);});
if(window.values.size)
    lookThrough.forEach(function(a){normalizeSize(a);});
if(window.values.align)
    lookThrough.forEach(function(a){normalizeAlignment(a);});
if(window.values.font)
    lookThrough.forEach(function(a){normalizeFont(a);});

if(document.getElementById('threadtools_menu')) {
	var add = document.createElement('tr');
	var cur = document.createElement('td');
	cur.onmouseover = function(){this.className = 'vbmenu_hilite vbmenu_hilite_alink';};
	cur.onmouseout = function(){this.className = 'vbmenu_option vbmenu_option_alink';};
	var style = document.createElement('style');
	style.innerHTML = "#notif {background-color: #AAAAAA;height: 380px;left: 0;position: fixed;right: 0;text-align: center;-moz-box-shadow: 0 0 15px 10px #AAAAAA, 0 0 15px 10px #AAAAAA;-webkit-box-shadow: 0 0 15px 10px #AAAAAA, 0 0 15px 10px #AAAAAA;box-shadow: 0 0 15px 10px #AAAAAA, 0 0 15px 10px #AAAAAA;" +
		"top: 20%;top: -moz-calc(50% - 190px);top: -ms-calc(50% - 190px);top: -o-calc(50% - 190px);top: -webkit-calc(50% - 190px);top: calc(50% - 190px);border-collapse: separate;} " +
		"#notif a {color: #000;font-size: 0.8em;font-weight: normal;margin: 0 3px;padding: 2px 8px;text-decoration: none;cursor: pointer;} #notif a:hover {background-color: #FFEAB7;} " +
		"#notif a.selected {background-color: #FF9C42;font-weight: bold;cursor: default;} #notif h2 {margin: 20px 0;} #notif p {width: 240px; display: inline-block}";
	document.head.appendChild(style);
	cur.onclick = function(){
		document.getElementById('threadtools_menu').style.display = 'none';
		if(document.getElementById('notif'))
			return;
		var a = document.createElement('div');
		a.id = 'notif';
		var b = document.createElement('h2');
		b.innerHTML = 'Select what BBCode customizations you wish to change:';
		a.appendChild(b);
		b = document.createElement('p');
		b.innerHTML = 'Colors';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Restrict';
		b.onclick = function(){localStorage["ovForumColor"] = ""; this.className = "selected"; this.nextSibling.className = "";};
		if(localStorage["ovForumColor"] != "false")
			b.className = 'selected';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Do Nothing';
		b.onclick = function(){localStorage["ovForumColor"] = "false"; this.className = "selected"; this.previousSibling.className = "";};
		if(localStorage["ovForumColor"] == "false")
			b.className = 'selected';
		a.appendChild(b);
		a.appendChild(document.createElement('br'));
		
		b = document.createElement('p');
		b.innerHTML = 'Size';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Restrict';
		b.onclick = function(){localStorage["ovForumSize"] = ""; this.className = "selected"; this.nextSibling.className = "";};
		if(localStorage["ovForumSize"] != "false")
			b.className = 'selected';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Do Nothing';
		b.onclick = function(){localStorage["ovForumSize"] = "false"; this.className = "selected"; this.previousSibling.className = "";};
		if(localStorage["ovForumSize"] == "false")
			b.className = 'selected';
		a.appendChild(b);
		a.appendChild(document.createElement('br'));
		
		b = document.createElement('p');
		b.innerHTML = 'Alignment';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Restrict';
		b.onclick = function(){localStorage["ovForumAlign"] = "true"; this.className = "selected"; this.nextSibling.className = "";};
		if(localStorage["ovForumAlign"] == "true")
			b.className = 'selected';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Do Nothing';
		b.onclick = function(){localStorage["ovForumAlign"] = ""; this.className = "selected"; this.previousSibling.className = "";};
		if(localStorage["ovForumAlign"] != "true")
			b.className = 'selected';
		a.appendChild(b);
		a.appendChild(document.createElement('br'));
		
		b = document.createElement('p');
		b.innerHTML = 'Fonts';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Restrict';
		b.onclick = function(){localStorage["ovForumFont"] = "true"; this.className = "selected"; this.nextSibling.className = "";};
		if(localStorage["ovForumFont"] == "true")
			b.className = 'selected';
		a.appendChild(b);
		b = document.createElement('a');
		b.innerHTML = 'Do Nothing';
		b.onclick = function(){localStorage["ovForumFont"] = ""; this.className = "selected"; this.previousSibling.className = "";};
		if(localStorage["ovForumFont"] != "true")
			b.className = 'selected';
		a.appendChild(b);
		a.appendChild(document.createElement('br'));
		
		b = document.createElement('p');
		b.innerHTML = 'Blacklisted fonts (separate by commas, leave blank to block all)';
		a.appendChild(b);
		b = document.createElement('input');
		b.type = 'text';
		if(localStorage["ovForumRemoveFonts"])
			b.value = localStorage["ovForumRemoveFonts"];
		b.onchange = function(){localStorage["ovForumRemoveFonts"] = this.value;}
		a.appendChild(b);
		a.appendChild(document.createElement('br'));
		
		b = document.createElement('button');
		b.innerHTML = 'Close';
		b.onclick = function() {document.body.removeChild(this.parentNode);};
		a.appendChild(b);
		document.body.appendChild(a);
		return false;
	};
	add.appendChild(cur);
	cur.className = 'vbmenu_option vbmenu_option_alink';
	cur = cur.appendChild(document.createElement('img'));
	cur.src = "images/icons/icon1.gif";
	cur.className = 'inlineimg';
	cur.alt = 'Posts';
	cur = cur.parentNode.appendChild(document.createElement('a'));
	cur.href = '#';
	cur.innerHTML = 'BBCode Restrictions';
	var parent = document.getElementById('threadtools_menu').getElementsByTagName('tbody')[0];
	if(parent.children.length <= 4)
		parent.appendChild(add);
	else
		parent.insertBefore(add, parent.children[4]);
}