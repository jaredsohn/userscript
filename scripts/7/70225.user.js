// ==UserScript==
// @name           Buit teller van saah
// @namespace      Buit teller van saah
// @description    telt farm buiten per dag/week/maand
// @include        http://nl*.tribalwars.nl/game.php?village=*&screen=report&mode=*&view=*
// @include        http://nl*.tribalwars.nl/game.php?view=*&mode=*&village=*&screen=report
// ==/UserScript==



var doc = document;
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
function createCookie(name,value,days) {
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


server = doc.URL.match(/\d+/);
id = doc.URL.match(/view=(\d+)/)[1];
datum = doc.body.innerHTML.match(/(\d+.\d+.\d+) \d+:\d+/)[1];

vandaag_naam = 'buitteller_w'+server+'_date_'+datum;
id_naam = 'buittellerid_w'+server+'_date_'+datum;

if(getResources(doc) != -1){
	if(readCookie(vandaag_naam)){
		cook = readCookie(vandaag_naam).split(',');
		for(i=0;i<=3;i++){
		
		
		if (isNaN(parseFloat(getResources(doc)[i]))) 
	{
		cook[i] = cook[i];
	} else {
		cook[i] = cook[i] * 1 + getResources(doc)[i] * 1;
	}
		
		createCookie(vandaag_naam,cook,30);
		done = readCookie(id_naam);
		done = done+','+id;
		createCookie(id_naam,done,30);
	}
	
	} else {
		createCookie(vandaag_naam,getResources(doc),30);
		createCookie(id_naam,id,30);
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

	if(readCookie('buitteller_w'+server+'_date_'+datum)){
		tijdelijk = readCookie('buitteller_w'+server+'_date_'+datum).split(',');
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

dag = '<img src="/graphic/holz.png?1" title="Hout" alt="" />'+readCookie(vandaag_naam).split(',')[0];
dag += '   <img src="/graphic/lehm.png?1" title="leem" alt="" />'+readCookie(vandaag_naam).split(',')[1];
dag += '   <img src="/graphic/eisen.png?1" title="ijzer" alt="" />'+readCookie(vandaag_naam).split(',')[2];
weekk = '<img src="/graphic/holz.png?1" title="Hout" alt="" />'+week[0];
weekk += '   <img src="/graphic/lehm.png?1" title="leem" alt="" />'+week[1];
weekk += '   <img src="/graphic/eisen.png?1" title="ijzer" alt="" />'+week[2];
maandk = '<img src="/graphic/holz.png?1" title="Hout" alt="" />'+maand[0];
maandk += '   <img src="/graphic/lehm.png?1" title="leem" alt="" />'+maand[1];
maandk += '   <img src="/graphic/eisen.png?1" title="ijzer" alt="" />'+maand[2];

tabel = doc.getElementsByTagName('table');
for(i=0;i<tabel.length;i++){
	if(tabel[i].innerHTML.match('Verzonden')){
		n = i;
	}
}

tabel[n].innerHTML = '\n<tr><td>deze maand</td><td>'+maandk+'</td></tr>'+tabel[n].innerHTML;
tabel[n].innerHTML = '\n<tr><td>deze week</td><td>'+weekk+'</td></tr>'+tabel[n].innerHTML;
tabel[n].innerHTML = '\n<tr><td>vandaag</td><td>'+dag+'</td></tr>'+tabel[n].innerHTML;
tabel[n].innerHTML = '\n<tr><td><b>farm teller</b></td><td><i>gemaakt door saah</i></td></tr>'+tabel[n].innerHTML;