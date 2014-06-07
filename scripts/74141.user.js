// ==UserScript==
// @name			My Darkthrone
// @description		My modified version of Darkthrone the game
// @description		No Ads, instant battle text and stripped unecesary crap
// @description		Auto-refresh every hour, auto-recruiter when on page, auto-buy all mercenaries when on page
// @include			http://www.darkthrone.com*
// @author			Seth^^
// @author			highstrike@gmail.com
// @version			0.4 (Jun 06, 2010)
// ==/UserScript==

var $ = function(a) { return document.getElementById(a); }
var x = function(a, b, c, d){
    var e = (b == "*" && a.all)? a.all : a.getElementsByTagName(b);
    var f = new Array();
    var g = (typeof d != "undefined")? new RegExp("(^|\\s)" + d + "(\\s|$)", "i") : null;
    var h;
    var i;
    for(var j=0; j<e.length; j++){
        h = e[j];
        i = h.getAttribute && h.getAttribute(c);
        if(typeof i == "string" && i.length > 0){
            if(typeof d == "undefined" || (g && g.test(i))){
                f.push(h);
            }
        }
    }
    return f;
}

try {

window.setTimeout(function(){
	location.reload(true);
}, 3600000);

var a = $('wrap_right');
var b = $('wrap_right_dn');
var c = $('wrap_bottom');
var d = $('sidebar-right-logout');
var e = $('advisor');
var f = $('wrap_left_dn');
var g = $('attackinfo');
var h = $('wrap_content');
var i = $('recruit_link');
var j = $('formSubmitId_1');

if(a) a.parentNode.removeChild(a);
if(b) b.parentNode.removeChild(b);
if(c) c.parentNode.removeChild(c);
if(f) f.parentNode.removeChild(f);

if(d){
	d.style.color = 'black';
	d.style.textAlign = 'center';
	d.style.borderTop = '1px dashed black';
	d.style.paddingTop = '7px';
	d.style.fontWeight = 'bold';
	d.style.fontSize = '15px';
}

if(e) e.childNodes[1].childNodes[1].appendChild(d);
if(g){
	for(var z = 0; z < g.childNodes.length; z++)
		if(g.childNodes[z].nodeType != 3)
			g.childNodes[z].style.display = 'block';
}

if(h){
	var y = x(h, 'div', 'style', 'margin-bottom: 20px; width: 1px;');
	y[0].parentNode.removeChild(y[0]);
}

if(i){
	var ia = i.parentNode.parentNode;
	if (ia.hasChildNodes()) while (ia.childNodes.length > 6) ia.removeChild(ia.childNodes[ia.childNodes.length-1]);

	var ib = document.createElement('form');
	ib.style.display='none';
	i.appendChild(ib);

	window.setTimeout(function(){
		ib.method='POST';
		ib.action=i.href;
		ib.submit();
	}, Math.floor(Math.random() * (3300 - 2300 + 1)) + 2300);
}

if(j && j.action == 'http://www.darkthrone.com/mercenaries/buy'){
	if(j.childNodes[1].childNodes[1].childNodes[1].childNodes[2].childNodes[3].innerHTML.replace(/^\s+|\s+$/g,"") != 0){
		var a = document.getElementsByName('buy_all');
		a[0].click();
	}
}

} catch (e) { console.log(e); }