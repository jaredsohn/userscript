// ==UserScript==
// @name           Buit teller van saah (aangepast)
// @namespace      Buit teller van saah
// @description    telt farm buiten per dag/week/maand
// @include        http://nl*.tribalwars.nl/game.php?village=*&screen=report&mode=*&view=*
// @include        http://nl*.tribalwars.nl/*
// ==/UserScript==



var win=frames.main||self,doc=win.document;
function getCookie(n) {
	var c = '; ' + doc.cookie + ';',
		s = '; ' + encodeURIComponent(n) + '=',
		b = c.indexOf(s),
		e;
	if (b == -1) return '';
	b = b + s.length;
	e = c.indexOf(';', b);
	return decodeURIComponent(c.substring(b, e))
}


function setCookie(n, v, l) {
	var e = encodeURIComponent,
		L = parseInt(l) || 0,
		c = doc.cookie;
	if (L && c.length + e(n + v).length - e(('; ' + c).indexOf('; ' + n + '=') + 1 ? n + getCookie(n) : '').length > 4027) throw alert('Cookie "' + n + '" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');
	doc.cookie = e(n) + '=' + e(v) + '; max-age=' + L
}
var loSt = win.localStorage,
	getValue = loSt ?
function (n) {
	return loSt.getItem(n) || ''
} : getCookie,
setValue = loSt ?
function (n, v) {
	v === 0 || v ? loSt.setItem(n, v) : loSt.removeItem(n)
} : function (n, v) {
	setCookie(n, v, 1e7)
},
getValueC = loSt ?
function (n) {
	var v = getCookie(n);
	if (v != '') {
		setValue(n, v);
		setCookie(n, 0)
	} else return getValue(n);
	return v
} : getCookie;
function getResources(doc) {
	/* function by Blackcomb */
    var ref = null; /* DOMElement reference */
    var resources = [ "", "", "" ]; /* Resources */
    var i = 0; /* iterator */
    var j = -1; /* resources pointer */

    /* Get an array of all TH elements */
    ref = doc.getElementsByTagName("th");

    /* Find the TH with text "Buit:" in it */
    for (i = 0; i < ref.length; i++)
    {
        if (ref[i].textContent == "Buit:")
        {
            ref = ref[i];
            break;
        }
    }
    /* If the TH is not found return error code -1 */
    if (ref.nodeName === undefined)
        return -1; /* error

    /* Find the first sibling TD element */
    while (ref.nodeName != "TD")
    {
        ref = ref.nextSibling;
    }

    /* Get the child nodes in the TD */
    ref = ref.childNodes;

    /* loop through the child nodes */
    for (i = 0; i < ref.length; i++)
    {
        /* IMG nodes increase the pointer position with 1 */
        if (ref[i].nodeName == "IMG")
            j++;

        /* #TEXT nodes append their text to the resource at the */
        /* current pointer position */
        if (ref[i].nodeName == "#text")
            resources[j] = "" + resources[j] + ref[i].textContent;

        /* other nodes are ignored (for instance <span>'s) */
    }
    /* parse the textual numbers to integers */
    for (i = 0; i < 3; i++)
    {
        resources[i] = parseInt(resources[i]);

    }

    return resources;
}
function getValue(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function setValue(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function dat(i){
var myDate=new Date();
myDate.setDate(myDate.getDate()-i);
return myDate;}
function addCommas(nStr)
{
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? ',' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}



server = doc.URL.match(/\d+/);
id = doc.URL.match(/view=(\d+)/)[1];
id = id.toString(36);
datum = doc.body.innerHTML.match(/(\d+.\d+.\d+) \d+:\d+/)[1];

vandaag_naam = 'buitteller_w'+server+'_date_'+datum;
id_naam = 'buittellerid_w'+server+'_date_'+datum;

if (getResources(doc) != -1) {
	if (getValue(vandaag_naam) && getValue(id_naam)) {
		if (!getValue(id_naam).match(id)) {
			cook = getValue(vandaag_naam).split(',');
			for (i = 0; i <= 3; i++) {
				if (isNaN(parseFloat(getResources(doc)[i]))) {
					cook[i] = cook[i];
				} else {
					cook[i] = cook[i] * 1 + getResources(doc)[i] * 1;
				}

				setValue(vandaag_naam, cook, 30);
				done = getValue(id_naam);
				done = done + ',' + id;
				setValue(id_naam, done, 30);
			}

		}

	} else {
		cook = [0,0,0];
			for (i = 0; i <= 3; i++) {
				if (!isNaN(parseFloat(getResources(doc)[i]))) {
					cook[i] = getResources(doc)[i] * 1;
				}
			}

		setValue(vandaag_naam, cook, 30);
		setValue(id_naam, id, 30);
	}
}


maand = [0,0,0];
week = [0,0,0];
for(i=0;i<=30;i++){
	var date = dat(i);
	var d  = date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var m = date.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	datum = day+'.'+month+'.'+(year*1-2000);

	if(getValue('buitteller_w'+server+'_date_'+datum)){
		tijdelijk = getValue('buitteller_w'+server+'_date_'+datum).split(',');
		maand[0] += tijdelijk[0]*1;
		maand[1] += tijdelijk[1]*1;
		maand[2] += tijdelijk[2]*1;
		if(i<=7){
			week[0] += tijdelijk[0]*1;
			week[1] += tijdelijk[1]*1;
			week[2] += tijdelijk[2]*1;
		}
	}
}

dag = '<img src="/graphic/holz.png?1" title="Hout" alt="" />'+addCommas(getValue(vandaag_naam).split(',')[0]);
dag += '   <img src="/graphic/lehm.png?1" title="leem" alt="" />'+addCommas(getValue(vandaag_naam).split(',')[1]);
dag += '   <img src="/graphic/eisen.png?1" title="ijzer" alt="" />'+addCommas(getValue(vandaag_naam).split(',')[2]);
weekk = '<img src="/graphic/holz.png?1" title="Hout" alt="" />'+Math.round(week[0]/1000)+"k";
weekk += '   <img src="/graphic/lehm.png?1" title="leem" alt="" />'+Math.round(week[1]/1000)+"k";
weekk += '   <img src="/graphic/eisen.png?1" title="ijzer" alt="" />'+Math.round(week[2]/1000)+"k";
maandk = '<img src="/graphic/holz.png?1" title="Hout" alt="" />'+Math.round(maand[0]/1000)+"k";
maandk += '   <img src="/graphic/lehm.png?1" title="leem" alt="" />'+Math.round(maand[1]/1000)+"k";
maandk += '   <img src="/graphic/eisen.png?1" title="ijzer" alt="" />'+Math.round(maand[2]/1000)+"k";

tabel = doc.getElementsByTagName('table');
for(i=0;i<tabel.length;i++){
	if(tabel[i].innerHTML.match('Verzonden')){
		n = i;
	}
}

tabel[n].innerHTML = '\n<tr><td>deze maand</td><td>'+maandk+'</td></tr>'+tabel[n].innerHTML;
tabel[n].innerHTML = '\n<tr><td>deze week</td><td>'+weekk+'</td></tr>'+tabel[n].innerHTML;
tabel[n].innerHTML = '\n<tr><td>vandaag</td><td>'+dag+'</td></tr>'+tabel[n].innerHTML;
tabel[n].innerHTML = '\n<tr><td><b>Periode</b></td><td><b>Totale buit</b></td></tr>'+tabel[n].innerHTML;