// ==UserScript==
// @name           Gegner suchen fuer das zur Zeit defekt tuerkische pennergame
// @namespace      http://forum.ego-shooters.net
// @description    sucht trotz der defekten Highscore bei tuerkischen pennergame nach gegner in deinen punktebereich 
// @include        http://www.serserionline.com/fight/overview/*
// ==/UserScript==




var siglink = 'http://inodes.pennergame.de/de_DE/signaturen/';
try {
	var body_split = document.body.innerHTML.split('href="/profil/id:')[1];
	var id = body_split.split('/')[0];
min = id-Number(100);
max = id;
} catch (err){}



try {
	var body_split3 = document.body.innerHTML.split('Puan:</span><span class="el2">');
	var body_split_4 = body_split3[1].split('</span>');
	var userpoints = body_split_4[0];

      var angriffmax = Math.floor(userpoints*1.5);
      var angriffmin = Math.floor(userpoints*0.8);
      
      GM_setValue("angriffmax",angriffmax);
      GM_setValue("angriffmin",angriffmin);
      GM_setValue("userpoints",userpoints);
} catch (err){}




				Tabels =document.getElementsByClassName('settingpoint2')[0];
				var tr = document.getElementById('form1');
				tr.innerHTML += '<br>Gegner suche f&uuml;r T&uuml;rkische Pennergame <br> Einfach id von bis eingeben dann auf suche klicken und es werden Gegner gesucht die in euren Punktebereich sind .<br>Bitte testet erst mit 100,500,1000 ids wie gzt euer Pc ist .<br>Das Script durchsucht ca 1000 Penner in 10 Sekunden und das schafft nict jeder Pc .<br>Deshalb erst niedrige Zahl testen und immer mehr eingeben um den absturz von Firefox zu verhindern.<br>Min und max id sind Deine id minus 100 .Habe das mal standart so ausgesucht kann aber jeder endern.<br>Mfg Basti1012.'
				+'<br>von id :<input type="text" id="mini" name="mini" value="'+min+'"><br>Bis id :<input type="text" id="maxi" name="maxi" value="'+max+'"><br><input type="button" id="geldsucher" name="geldsucher" value="Suche Starten" /> <br>Mfg Basti1012<br><div name="sbalki" id="sbalki"</div>'
				+'<div align="left" name="info" id="info"></div>'
				+'<table class="list" border="1" width="800"><tbody>'
				+'<tr>'
				+'<th scope="col" align="center" width="100">-</th>'
				+'<th scope="col" align="center" width="100">Platz</th>'
				+'<th scope="col" align="center" width="200">Profil</th>'
				+'<th scope="col" align="center" width="100">Punkte</th>'
				+'<th scope="col" align="center" width="100">Geld</th>'
				+'<th scope="col" align="center" width="100">Reg</th>'
				+'<th scope="col" align="center" width="100">Status</th>'
				+'<th scope="col" align="center" width="200">Bande</th>'
				+'<th scope="col" align="center" width="60">promille</th>'
				+'<th scope="col" align="center" width="20">S</th>'
				+'<th scope="col" align="center" width="20">f</th>'

				+'</tr>';

document.getElementById('geldsucher').addEventListener('click', function linktklickerone() {
var mini = document.getElementsByName('mini')[0].value;
var maxi = document.getElementsByName('maxi')[0].value;
var unter =maxi-mini;
x=0;
for(a = mini; a <= maxi; a++) {
x++;
scannen(a,unter,x);
}
},false);






function scannen (a,unter,x){
  var maxatt = GM_getValue("angriffmax");
  var minatt = GM_getValue("angriffmin");
    try{
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.serserionline.com/dev/api/user.'+a+'.xml',
				onload: function(responseDetails) {
					var parser = new DOMParser();
					
					var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
					var name = dom.getElementsByTagName('name')[0].textContent;
					var id = dom.getElementsByTagName('id')[0].textContent;
					var platz = dom.getElementsByTagName('position')[0].textContent;
					var pts = dom.getElementsByTagName('points')[0].textContent;
					var reg = dom.getElementsByTagName('reg_since')[0].textContent;
					var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
					var city = dom.getElementsByTagName('city')[0].textContent;

					try{
						var cash = dom.getElementsByTagName('cash')[0].textContent/100;
					}catch(e){
						cash='- - -';
					}

					try{
						var bandeid = dom.getElementsByTagName('id')[1].textContent;
						var bande = dom.getElementsByTagName('name')[1].textContent;
						var status = dom.getElementsByTagName('status')[0].textContent;
						var joined = dom.getElementsByTagName('joined')[0].textContent;
					}catch(e){
						var bande = 'No';
						var bandeid = 'e';
					}

        				if (status==3) {
       						var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
 						var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
					}else if (status==2) {

        					var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
     						var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
					}else if (status==1) {

        					var statu = '<img src="http://media.pennergame.de/img/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
 						var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
					}else if (status==0) {-';//<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
						var statu = '-';
						var bandeergebniss = '-';
					}

						try{
							var cash = dom.getElementsByTagName('cash')[0].textContent/100;
							var pro = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + siglink + id + '.jpg"></div></div>';
						}catch(e){
							var pro = '- - -';
						}

						var fight ='<a href="/fight/?to='+name+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
						var sms ='<a href="/messages/write/?to='+id+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';
						if (cash <= 1000000){
							farbe1 = "black";}
						if (cash <= 900000){
							var farbe1 = "gray";}
						if (cash <= 800000){
							farbe1 = "blue";}
						if (cash <= 700000){
							var farbe1 = "cyan";}
						if (cash <= 600000){
							farbe1 = "red";}
						if (cash <= 500000){
							var farbe1 = "green";}
						if (cash <= 400000){
							farbe1 = "magenta";}
						if (cash <= 300000){
							farbe1 = "orange";}
						if (cash <= 200000){
							var farbe1 = "yellow";}
						if (cash <= 100000){
							var farbe1 = "white";}


s=unter-x;
var Stadterg = unter/500;//Math.round((Stadtpro*a)*1)/1
var balkie = s*Stadterg;//Math.round((Stadterg*3)*10)/10
var reinmachen ='[Idgesamt:<strong><b> '+a+' </b></strong>von '+unter+'.Noch <strong><b> '+balkie+'  % </b></strong> zu Durchsuchen ]';

document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:green; font-size:120%;\"><b>Suche ist bei <font style=\"color:red; font-size:180%;\">'+a+'</font> Id </b></font>'
+'<br>'+reinmachen+''
+'<br><div class="processbar_clean" style="width: 500px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"></div></div>';



  if (GM_getValue("angriffmax")>pts && GM_getValue("angriffmin") < pts) {
 
angreifbar = 'green';



tr.innerHTML +='<table class="list" border="1" width="800"><tbody>'
+'<tr bgcolor="">'
+'<th scope="col" align="center" width="100">'+a+'</th>'
+'<th scope="col" align="center" width="100">'+platz+'</th>'
+'<th scope="col" align="center" width="200"><a href=/profil/id:'+id+'/>'+name+'</a></th>'
+'<th scope="col" align="center" bgcolor="'+angreifbar+'" width="100">'+pts+'</th>'
+'<th scope="col" align="center"  width="100"><font style=\"color:'+farbe1+'; font-size:100%;\"><b>'+cash+' &euro;</font></th>'
+'<th scope="col" align="center" width="100">'+reg+'</th>'
+'<th scope="col" align="center" width="100">'+statu+'</th>'
+'<th scope="col" align="center" width="200">'+bandeergebniss+'</th>'
+'<th scope="col" align="center" width="80">'+pro+'</th>'
+'<th scope="col" align="center" width="10">'+sms+'</th>'
+'<th scope="col" align="center" width="10">'+fight+'</th>'
+'</tr>';
}else{







}



}});
}catch(e){}


}

// copyright by basti1012