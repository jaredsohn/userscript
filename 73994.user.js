// ==UserScript==
// @name           Pennergame Shoutbox als Chat by Boggler
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    BandenShoutbox immer komplett im blick wie ein Chat
// @include        http://*pennergame.de/*
// ==/UserScript==

var body = document.getElementsByTagName('body')[0];

// Farbeinstellungen
var position = GM_getValue('position');
if(position == null){
var position = 'absolute';
}
var top = GM_getValue('top');
if(top == null){
var top = '150';
}
var rightleft = GM_getValue('rightleft');
if(rightleft == null){
var rightleft = 'right';
}
var vonseite = GM_getValue('vonseite');
if(vonseite == null){
var vonseite = '50';
}
var fontsize = GM_getValue('fontsize');
if(fontsize == null){
var fontsize = 'small';
}
var radius = GM_getValue('radius');
if(radius == null){
var radius = '20';
}
var border = GM_getValue('border');
if(border == null){
var border = '1px solid red';
}
var bgcolor = GM_getValue('bgcolor');
if(bgcolor == null){
var bgcolor = 'black';
}
var farbe1 = GM_getValue('farbe1');
if(farbe1 == null){
var farbe1 = 'green';
}
var farbe2 = GM_getValue('farbe2');
if(farbe2 == null){
var farbe2 = 'orange';
}
var farbe3 = GM_getValue('farbe3');
if(farbe3 == null){
var farbe3 = 'yellow';
}
body.innerHTML += '<span style="position:'+position+';top:'+top+'px;'+rightleft+':'+vonseite+'px;font-size:'+fontsize+';-moz-border-radius:'+radius+'px;border:'+border+'; background-color:'+bgcolor+'" id="all"><div id="dieganzebox"></div><div id="sendenfeld"><br><br><textarea id="nachricht" cols="50" rows="5"></textarea><br><input type="button" id="senden" value="Abschicken"><input type="button" id="einstellungen" value="[Einstellungen]"></div></span>';
var box = document.getElementById('dieganzebox');
box.innerHTML += '<font style="color:'+farbe1+'"><b>BandenChat(Shoutbox) overall</b></font><br><br>';
var i = 0;
uebertragen(i);

function uebertragen(i){
if(i<11){
GM_xmlhttpRequest({
		method: 'GET', 
		url: 'http://www.pennergame.de/gang/',
		onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var table = content.split('margin-bottom:10px">')[i].split('</table')[0];
		var id = table.split('/profil/id:')[1].split("/'")[0];
		var name = table.split("<a href='/profil/id:"+id+"/'>")[1].split('</a>')[0];
		var wann = table.split('schrieb am ')[1].split(' <a href=')[0];
		var was = table.split('padding:2px;"> <p>')[1].split('</p>')[0];
		box.innerHTML += '<br><br><a href="/profil/id:'+id+'"><font style="color:'+farbe2+'"><b>'+name+'</b></font></a><font style="color:'+farbe3+'"><b> '+wann+'</b></font><br><font style="color:'+farbe1+'"><b>'+was+'</b></font>';
		}})
		i++;
		uebertragen(i);
		
		}
		}
document.getElementById('senden').addEventListener('click', function sbsenden(){

GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://' + document.location.hostname + '/gang/chat/add/',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            data: encodeURI('f_text=' + document.getElementById('nachricht').value + '&Submit=Abschicken'),
            onload: function(responseDetails) {
			
			}})

location.reload()

},false);


document.getElementById('einstellungen').addEventListener('click', function sbsenden(){

document.getElementById('all').innerHTML = '<font style="color:'+farbe1+'">'
+'<h1><center><u><b><font style="color:'+farbe1+'">Farbe und Position</font></b></center></h1><table width="100%" style="border-color:#000000; border:5px"><div id="farbsetting"></div>'
+'<tr><td width="100"><font style="color:'+farbe1+'">Position:</td><td width="100"><input size="5" type="text" name="farbset" value="'+position+'" /></td><td width="100"><font style="color:'+farbe1+'"><font style="color:'+farbe1+'">Von Oben(px):</td><td width="100"><input size="5" type="text" name="farbset" value="'+top+'" /></td><font style="color:'+farbe1+'">Von Rechts(px):</td><td width="100"><input size="5" type="text" name="farbset" value="'+vonseite+'" /></tr>'
+'<tr><td width="100"><font style="color:'+farbe1+'">BG-Farbe:</td><td width="100"><input size="5" type="text" name="farbset" value="'+bgcolor+'" /></td><td width="100"><font style="color:'+farbe1+'"><font style="color:'+farbe1+'">Schriftfarbe:</td><td width="100"><input size="5" type="text" name="farbset" value="'+farbe1+'" /></td><font style="color:'+farbe1+'">Warnfarbe:</td><td width="100"><input size="5" type="text" name="farbset" value="'+farbe2+'" /></tr>'
+'<tr><td width="100"><font style="color:'+farbe1+'">Border</td><td width="100"><input size="5" type="text" name="farbset" value="'+border+'" /></td><td width="100"><font style="color:'+farbe1+'"><font style="color:'+farbe1+'">3.Farbe:</td><td width="100"><input size="5" type="text" name="farbset" value="'+farbe3+'" /></td><td><font style="color:'+farbe1+'">right or left <input size="5" type="text" name="farbset" value="'+rightleft+'" /></td></tr></font>'
+'<tr><td></td><td></td><td><input type="button" id="speichern" value="Speichern"></td>';
document.getElementById('speichern').addEventListener('click', function speichern(){
GM_setValue('position', document.getElementsByName('farbset')[0].value);
GM_setValue('top', document.getElementsByName('farbset')[1].value);
GM_setValue('vonseite', document.getElementsByName('farbset')[2].value);
GM_setValue('bgcolor', document.getElementsByName('farbset')[3].value);
GM_setValue('farbe1', document.getElementsByName('farbset')[4].value);
GM_setValue('farbe2', document.getElementsByName('farbset')[5].value);
GM_setValue('border', document.getElementsByName('farbset')[6].value);
GM_setValue('farbe3', document.getElementsByName('farbset')[7].value);
GM_setValue('rightleft', document.getElementsByName('farbset')[8].value);
location.reload()
},false);

},false);






