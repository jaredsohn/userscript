// Autor: -== VelMizar ==-
// Fecha de modificacion: 18/09/11

// ==UserScript==
// @name           SkanerGallakssy
// @author         VelMizar
// @date           18-09-2011
// @namespace      SkanerGallakssy
// @description    SkanerGallakssy
// @include        http://speed.lordgalaxy.ru//game.php?page=galaxy*
// @exclude        *mode=ffleett*

// ==/UserScript==

 //---- globallStor ---- 
 var storage = window.localStorage; 
 // --------------------- vyxidni danni --------------------
 var galactykiv =9;
 var systemm =499;
 var planet =15;
var infoNIKIgrok = new Array(
'Император',
'air17',
'veselyi',
'sunmoose',
'Чертяка',
'PANTEJ',
'АРДОН',
'Mike_Wasovski	',
'SpongeBob',
'yozhig',
'Синоптик',
'Чингачгук',
'shaGuar',
'TOYOT',
'LEXA1',
'Starik',
'Voi Admiral Saphael',
'PushkovAlex',
'Феникс',
'sapega',
'alex979',
'dim128',
'ЛёхаГур',
'Cindarella',
'IMPERIAL',
'skf14',
'shturman',
'europa',
'Gangrena',
'ZmVIRUS',
'lev83',
'snackecan',
'farht',
'GARI',
'ЭСКАЛИБУ',
'spartak',
'kot21',
'Anval',
'centawr'	,
'putnik'	,
'Hammerik'	,
's.t.a.l.k.e.r.'	,
'Alone'	,
'Малой'	,
'Metrolog'	,
'spirit91'	,
'Zergut'	,
'aleks1977'	,
'sergo'	,
'Lal_SS'	,
'Lokki'	,
'Lipodu	'	,
'Rusich'	,
'alien57'	,
'OLDFOX'	,
'Messershmidt'	,
'wtopor'	,
'СЕКАЧ'	,
'Anak1m'	,
'999Nik0on999'	,
'kide3333'	,
'Valan'	,
'Аспид'	,
'Dokvos'	,
'gudvin25'	,
'媒介-泥棒'	,
'Tiberius_War'	,
'killer'	,
'Feanor'	,
'Paladin'	,
'SteelRat'	,
'NemiroFF'	,
'Toretto69'	,
'Sting'	,
'Shooter_USSR'	,
'Arnita'	,
'Amyr'	,
'_____xD'	,
'Леприкон'	,
'maxxx'	,
'ELITE'	,
'Mig777'	,
'хотабыч'	,
'GraFMorT'	,
'WhiteWolf203	'	,
'пантеон'	,
'Odessa'	,
'HnumRa'	,
'Bagum'	,
'Burav'	,
'MayDay'	,
'6y6lukys'	,
'zaja'	,
'Revan'	,
'dikiy'	,
'POMOR'	,
'Gavrowka'	,
'DollaR'	,
'alex4172'	,
'ури00'
);
 //---- при відсутності вносимо початкові глобальні дані ----
for (i = 1; i <= 100; i++) {
	if (!storage.getItem("Lord"+i)) storage.setItem("Lord"+i, " -- ");
	};


vidlik1=60;
function startTime1() {
var v = new Date();
var txt_12 = document.getElementById('txt_12');
var n = new Date();
sekundy1 = vidlik1;
sekundy1 = sekundy1 - Math.round((n.getTime() - v.getTime()) / 1000.);
minuty1 = 0;
godyny1 = 0;
if (sekundy1 < 0) {
	txt_12.innerHTML = "-";
} else {
	if (sekundy1 > 59) {
		minuty1 = Math.floor(sekundy1 / 60);
		sekundy1 = sekundy1 - minuty1 * 60;
	}
	if (minuty1 > 59) {
		godyny1 = Math.floor(minuty1 / 60);
		minuty1 = minuty1 - godyny1 * 60;
	}
	if (sekundy1 < 10) {
		sekundy1 = "0" + sekundy1;
	}
	if (minuty1 < 10) {
		minuty1 = "0" + minuty1;
	}
	txt_12.innerHTML = godyny1 + ":" + minuty1 + ":" + sekundy1;
}
vidlik1 = vidlik1 - 1;
if (vidlik1 <= 0) {
		widOpen();
		vidlik1=360;
	}else if (vidlik1 == 50){
		//activVyznachennya();
		}
}




// ---------------------- Container -------------------------------
var myContainerLordInfo = "";
for (i = 1; i <= 100; i++) {
	myContainerLordInfo = myContainerLordInfo + 
	'<tr>'+
          '<td>'+
		   '<div id="txt0_'+i+'">'+infoNIKIgrok[i]+'</div></td>'+
		  '<td>'+
		   '<div id="txt1_'+i+'">'+storage.getItem("Lord"+i)+'</div></td></tr>'
		   
	};


var myContainerLord = document.createElement('div');
    myContainerLord.id = "myContainerLord"; 
	myContainerLord.className = 'myContainerLord';
	myContainerLord.innerHTML = '<div style="border:2; position:absolute; z-index:1000; left: 965px; top: 185px; color:#F0F; font-size:24px" class="dragable">********'+
'<div id="dell0" style="position:absolute; color:#F00; z-index:1001; left: 125px; top: 3px;">'+

'<p style="font-size:16px"><input id="dell" type="button" value="x"/></p>'+

'</div>'+	
'<div style="position:absolute; left: -55px; top: 13px; margin:0px 0px 5px 0px; width:222px; float:left; overflow:hidden;">'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_kopf.gif) no-repeat; height:32px; font-size:11px; text-transform:uppercase;">'+
  '<div style=" position:absolute; top:0px; text-align:center">'+
    '<h3 style="color:#6F9FC8; font-size:11px; padding-top:0px; width:222px; text-align:center;">Menyu botta:</h3>'+
  '</div></div>'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_mitte.gif) repeat-y; padding:0px 15px;">'+
    '<table width="188" cellpadding="0" cellspacing="0" style="margin: 5px 0px -15px 2px; font-size:14px;">'+
         '<tbody>'+
		 
		 '<tr>'+
          '<td colspan="2">'+ 
           '<div id="txt_6" style="color:#9F9FF8; font-size:12px; text-align:center padding-top:5px;">Сканування галактик</div>'+
		   '</td></tr>'+ 
		 
		
        '<tr>'+
          '<td>'+
		   '<div id="txt_11">до натиснення кнопки лишилось:</div></td>'+
		  '<td>'+
		   '<div id="txt_12">00:00:00</div></td></tr>'+ 
		   
		 myContainerLordInfo +
		   
		'<tr>'+
          '<td colspan="2">'+ 
		  '<br>'+
           '<div id="txt_5">'+
		    '<input type="button" onClick="widDelete"  value="Старт!"/>'+
		    '<input type="button" onClick="alert(event)" value="Фініш!"/></div>'+
			'<br>'+
           '<div id="txt_6">000оо000*000оо000</div>'+
         
		   '</td></tr>'+ 
        '</tbody></table></div>'+
  '<div style="background:url(http://uni101.ogame.ru/game/img/navigation/box_1_fuss.gif) no-repeat; height:21px;">'+
  '</div></div></div>';	
  





// ------------------- vidobrazyty Container cherez 10 sekund -------------------------------dell
 setTimeout(function() {
					 document.body.appendChild(myContainerLord);
					// document.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 
 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime1()},999);