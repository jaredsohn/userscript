// (c) 2012 HAPblB
//
// ==UserScript==
// @name		HWM_Partner_Bonus
// @namespace      HWM
// @version		0.0.5
// @include        http://*.heroeswm.*/invitations.php
// @include        http://*.lordswm.*/invitations.php
// @author  	HAPblB
// @homepage 	http://userscripts.org/scripts/show/140994
// ==/UserScript==

var version = '0.0.5';

var script_num = 140994;
var script_name = 'HWM_Partner_Bonus';
var string_upd = /140994=(\d+\.\d+\.\d+)/;



var lvl = [0,500,150,600,1800,3000,6000,9000,12000,15000,24000,36000,45000,60000,75000,90000];
var e0 = GI( "//a[contains(@href, 'hwmb2.php')]" ).snapshotItem(0);

var partner=e0.parentNode.childNodes[e0.parentNode.childNodes.length-4].childNodes[0];
var summ=0;
for(var q=1;q<partner.childNodes.length;q++){
summ+=parseInt(partner.childNodes[q].childNodes[2].textContent);
//partner.childNodes[i].childNodes[1].innerHTML+='&nbsp;<!--'+calc_lvl(partner.childNodes[i].childNodes[2])+']-->&nbsp;';
partner.childNodes[q].childNodes[2].innerHTML=nmFrmt(partner.childNodes[q].childNodes[2].textContent);
}

var newtr = document.createElement('tr');
var newtd1 = document.createElement('td');
newtr.appendChild(newtd1);
partner.childNodes[0].childNodes[0].setAttribute('rowspan','2');
partner.childNodes[0].childNodes[1].setAttribute('rowspan','2');
newtd1.setAttribute('align','center');
newtd1.setAttribute('class','wblight');
newtd1.innerHTML='&nbsp;<b>'+nmFrmt(summ)+'</b>&nbsp;';
partner.insertBefore(newtr,partner.childNodes[1]);

function calc_lvl(bonus){
var grad=0;
var curr_lvl=0;
for(var j=0;j<lvl.length;j++){
	grad+=lvl[j];
	if(grad==parseInt(bonus.textContent)){
		curr_lvl=j+1;
		break;
		}
	}
return curr_lvl;
}

function GI( xpath ){	
	return document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}
function nmFrmt(n) {
    n = n.toString();
    var a = ",";
    var b = ".";
    var c = "";
    var d = n.split(b);
    var e = d[0];
    var f = d[1];
    if (typeof(e) != "undefined") {
        for (i = e.length - 1; i >= 0; i--) c += e.charAt(i);
        c = c.replace(/(\d{3})/g, "$1" + a);
        if (c.slice(-a.length) == a) c = c.slice(0, -a.length);
        e = "";
        for (i = c.length - 1; i >= 0; i--) e += c.charAt(i);
        if (typeof(f) != "undefined" && f.length > 0) e += b + f
    }
    return e
}