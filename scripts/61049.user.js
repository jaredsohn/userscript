// ==UserScript==
// @name           DinoRPG Info and Merguez Automation
// @namespace      DinoRPG
// @description    Making DinoRPG simpler
// @include        http://en.dinorpg.com/*
// @include        http://www.dinorpg.com/*
// @include        http://es.dinorpg.com/*
// @include        http://www.dinorpg.de/*
// @author         I I I
// @author         sunn0
// ==/UserScript==

/* Show answers directly */
if(document.getElementById("answers")){
    document.getElementById("answers").style.display = 'block';
}

/* Hide View Image */
var views = document.getElementsByClassName("view");
if(views.length){
    views[0].style.display = "none";
}

/* Hide notifications */
var notification = document.getElementById( "notification" );
if ( notification )
{
	document.body.removeChild( notification );
}


/* Compact Dinoz list */
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#dinozList ul li a, #dinozList ul li a embed { height:23px; display:block; overflow:hidden; }');

/* Move buttons to right menu */
if( document.getElementsByClassName("footer")
    && document.getElementById("dinozList")
){
    var footer = document.getElementsByClassName("footer")[0].getElementsByTagName("ul")[0];
    var div = document.getElementById("dinozList");
    var buttons = div.getElementsByClassName("button");
    for(var i = 0; i < buttons.length; i++) {
        var a = document.createElement("a");
        a.href = buttons[i].href;
        a.innerHTML = buttons[i].innerHTML;
        var li = document.createElement("li");
        li.appendChild(a);
        footer.appendChild(li);
        buttons[i].style.display = "none";
    }
}
 
/* Merguez automation */
function performAction(dinoId, action, referer){
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.open('GET','http://' + location.host + '/dino/' + dinoId + '/' + action, false);
    xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
    xmlhttp.setRequestHeader('Accept','text/html,application/xhtml+xml,application/xml;');
    xmlhttp.setRequestHeader('Referer','http://' + location.host + '/' + referer);
    xmlhttp.setRequestHeader('Cookie',document.cookie);
    xmlhttp.send();
    return xmlhttp.responseText;
}

var actions = document.getElementsByClassName("action");

for(var i = 0; i < actions.length; i++){
    var trs = actions[i].getElementsByTagName("tr");
    for(var j = 0; j < trs.length; j++){
        var tr = trs[j];
        var onclick = tr.getAttribute("onClick");
        var re = /\/(\d+)\/act\/dialog\/merguez/.exec(onclick);
        if(re){
            dinoId = re[1];
            tr.setAttribute("onClick", "");
            tr.addEventListener("click", function(){
                    if(document.getElementById("tooltip")){
                        document.getElementById("tooltip").style.display = "none";
                    }
                    tr.style.cursor = "wait";
                    var tds = tr.getElementsByTagName("td");
                    for(var k = 0; k < tds.length; k++){
                        var td = tds[k];
                        td.style.cursor = "wait";
                        td.style.color = "#ffffff";
                        td.style.backgroundColor = "transparent";
                    }
                    var label = tr.getElementsByClassName("label")[0];
                    label.innerHTML = "Clicked!";
                    var res = performAction(dinoId, 'act/dialog/merguez', 'dino/' + dinoId);
                    label.innerHTML = "Ah!";
                    res = performAction(dinoId, 'act/dialog/merguez?goto=ah', 'dino/' + dinoId + '/act/dialog/merguez');
                    label.innerHTML = "Ok!";
                    res = performAction(dinoId, 'act/dialog/merguez?goto=ok', 'dino/' + dinoId + '/act/dialog/merguez');
                    label.innerHTML = "Thanks!";
                    res = performAction(dinoId, 'act/dialog/merguez?goto=thanks', 'dino/' + dinoId + '/act/dialog/merguez');
                    document.location = '/dino/setTab?t=inv';
                }, 
                false
            );
        }
        
    }
}

/* Original script - http://userscripts.org/scripts/show/57493 */

var bars = 0;

function details(param) {
	var a = split(param);
	this.current = Number(a[0]);
	this.total = Number(a[1]);
	this.missing = Number(a[1]) - Number(a[0]);
	var p = Number(a[0] * 100 / a[1]).toFixed(2);
	if (p == Math.round(p))
		p = Number(p).toFixed(0);
	this.percentage = p;
}
var hpBar = document.getElementsByClassName('life ')[0];
var hp = new details(hpBar);
var xpBar = document.getElementsByClassName('xp')[0];
var xp = new details(xpBar);

if (!GM_getValue('dinorpg_config_display_hp'))
	GM_setValue('dinorpg_config_display_hp', promptDisplay('HP', 1));
if (!GM_getValue('dinorpg_config_display_xp'))
	GM_setValue('dinorpg_config_display_xp', promptDisplay('XP', 1));
hpBar.appendChild(newBar(GM_getValue('dinorpg_config_display_hp').replace('%c', hp.current).replace('%t', hp.total).replace('%m', hp.missing).replace('%p', hp.percentage + '%')));
xpBar.appendChild(newBar(GM_getValue('dinorpg_config_display_xp').replace('%c', xp.current).replace('%t', xp.total).replace('%m', xp.missing).replace('%p', xp.percentage + '%')));

function promptDisplay(param1, param2) {
	var display = new Array();
//	display[0] = '%c left';
//	display[1] = '%m to go';
	display[2] = '%c / %t';
	display[3] = '%c / %t : %p';
	display[4] = '%c / %t : %m';
	display[5] = '%c : %p';
	display[6] = '%p';
	display[7] = '%p : %m';
	display[8] = '%m';
	var choices = '';
	for (i = 2; i != display.length; ++i) {
		if (choices.length > 0)
			choices += '\n';
		choices += (i - 1) + '\t' + display[i];
	}
	var c = prompt('How to display ' + param1 + '?\n' +
						'\t%c\t\tcurrent\n' + 
						'\t%t\t\ttotal\n' +
						'\t%m\t\tmissing\n' +
						'\t%p\t\tpercentage\n\n' + choices, param2);

	if (c == null || c.length < 1 || Number(c) < 1 || Number(c) >= display.length - 1)
		c = param2;
	return display[Number(c) + 1];
}

function split(param) {
	return param.innerHTML.split('</strong>')[1].split('</div>')[0].replace(/ /g, '').split('/');
}

function newBar(param) {
	var nBar = document.createElement('div');
	nBar.innerHTML = '<b>&nbsp;' + param + '</b>';
	nBar.style.position = 'absolute';
	nBar.style.top = Number(bars * 15 - 1) + 'px';
	nBar.style.color = '#000000';
	nBar.style.fontSize = '11px';
	nBar.style.textAlign = 'left';
	++bars;
	return nBar;
}
