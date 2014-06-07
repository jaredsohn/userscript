// Autor: -== VelMizar ==-
// Fecha de modificacion: 04/05/13

// ==UserScript==
// @name           ZborResursov
// @author         VelMizar
// @date           04-05-2013
// @namespace      ZborResursovv
// @description    ZborResursovvv
// @include        *page=fleet*
// @exclude        *page=galaxy*
// @exclude        *page=anonce*
// @exclude        *page=market*

// ==/UserScript==

 //---- globallStor ---- 
 var storage = window.localStorage; 
 //---- при відсутності вносимо початкові глобальні дані ----
 //---- відвідування сторінок в секундах (тому назад був)----
 if (!storage.getItem("OstanyaVidpravkaUT")) storage.setItem("OstanyaVidpravkaUT", 0);
 if (!storage.getItem("CHasPovernenyaUT")) storage.setItem("CHasPovernenyaUT", 0); 
 if (!storage.getItem("AktyvMisiiTransportRes")) storage.setItem("AktyvMisiiTransportRes", 0); 
 //---- ### ----
  if (!storage.getItem("povtorPlanet")) storage.setItem("povtorPlanet", 0);
  if (!storage.getItem("vizitPlanet")) storage.setItem("vizitPlanet", 0);
// --------------------- vyxidni danni --------------------
chsas = new Date();
var posylannya = new Array(

);



vidlik1=60;
function startTime1() {

var txtFF_2 = document.getElementById('txtFF_2');
var txtvikoncse = document.getElementById('vikoncse');
var txtservertime2 = document.getElementById('servertime2');
var txtkoordyn = document.getElementById('koordyn');
var txtMetal = document.getElementById('txtM_2');
var txtCrystal = document.getElementById('txtK_2');
var txtDeuterium = document.getElementById('txtD_2');
var txtTM = document.getElementById('txtTM_2');
var txtEnergik = document.getElementById('txtE_2');
var txtZagolovok = document.getElementById('txtZagol');
var txtCHasPovernenyaIDCs = document.getElementById('txtart_5');

var v = new Date();
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
	txtFF_2.innerHTML = godyny1 + ":" + minuty1 + ":" + sekundy1;
	txtservertime2.innerHTML = document.getElementsByTagName('ul').item(0).getElementsByTagName('td')[0].innerHTML;
	txtkoordyn.innerHTML = infoKoordynaty();
	txtMetal.innerHTML = parseInt(document.getElementById("current_metal").innerHTML.replace(/\./g, '')); 
	txtCrystal.innerHTML = parseInt(document.getElementById("current_crystal").innerHTML.replace(/\./g, ''));
	txtDeuterium.innerHTML = parseInt(document.getElementById("current_deuterium").innerHTML.replace(/\./g, ''));
	txtTM.innerHTML = parseInt(document.getElementById("current_deuterium").parentNode.getElementsByTagName('td').item(3).innerHTML);
	txtEnergik.innerHTML = parseInt(document.getElementById("current_deuterium").parentNode.getElementsByTagName('td').item(4).innerHTML.replace(/\./g, ''));
	txtZagolovok.innerHTML = infoStorinky();
	var timka = Math.floor(parseInt(storage.getItem("CHasPovernenyaIDCs"), 10)-(chsas.getTime())/1000);
	txtCHasPovernenyaIDCs.innerHTML = perevodTime(timka);
	
}
vidlik1 = vidlik1 - 1;

if (vidlik1 <= 0 ) {
	  if (infoStorinky() == "Рух кораблів" || infoStorinky() == "Визначення місця призначення" || infoStorinky() == "Завантажувальний відсік" || infoStorinky() == "Експедиційні групи") {
		widOpen();
		//return;
	  }
	 // vidlik1=360;
	}else if (vidlik1 == 50){
		txtvikoncse.getElementsByTagName("h3").item(0).innerHTML = infoLogoNik();
		aktyvTrans();
	}
}


function aktyvTrans(){ 

        var Metal=parseInt(document.getElementById("current_metal").innerHTML.replace(/\./g, ''));
        var Crystal=parseInt(document.getElementById("current_crystal").innerHTML.replace(/\./g, ''));
		var Deuterium=parseInt(document.getElementById("current_deuterium").innerHTML.replace(/\./g, ''));
		var Resov = Metal+Crystal+Deuterium;
		var koordynata = infoKoordynaty();
		var koordynataCP = infoKoordynataCP();
		var pozMatrycsi = 0;
		var infoTagOption = document.getElementsByTagName('option');
		var infoTagInput = document.getElementsByTagName('input');
					
  for (i = 0; i <= 35; i++) {
	if (koordynataCP == posylannya[i][1]) {
	 pozMatrycsi = i;
	}};	


   if (infoStorinky() == "Рух кораблів") {
     if (Resov>=2000000 && Deuterium>=1000000) {		
//-----------------------------------		
	var infoTagTD = document.getElementsByTagName("td");
    var kilkUT=0;
  for (i = 0; i < infoTagTD.length; i++) {
    if (infoTagTD.item(i).id == "ship217_value") {
	  kilkUT=parseInt(infoTagTD.item(i).innerHTML.replace(/\./g, ''));	  
	};
  };
  
  if (kilkUT==0) {
      widOpen();	
  };
	
 var pUT=0;
  for (i = 0; i < kilkUT; i++) {
	if (pUT*400000000 <= Resov && pUT<=kilkUT) {
	 pUT++;
	}};
 

var infoTagInput = document.getElementsByTagName('input');  
   for (i = 0; i < infoTagInput.length; i++) {
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			if (infoTagInput.item(i).id == "ship217_input") {
			infoTagInput.item(i).value=pUT;
			};
    };		
      if (Deuterium>=1000000 && Resov>=2000000 && pUT!=0) {
		     // Активовуємо атоматичне завантаження і відправку ресурсів:
	   storage.setItem("AktyvMisiiTransportRes", 1);
	   // ------------end---------------
	   setTimeout(function() {activButtonDali();}, 2000); 
	  }else if (Deuterium>=1000000 && Resov>=2000000 && pUT==0) {
	   setTimeout(function() {widOpen();}, 5000); 
	  };
//------------end-----------------------
    };
   };
   
   if (infoStorinky() == "Визначення місця призначення") {
	  if (!document.getElementsByTagName) return;
	//Система куди летимо...
	var infoPlankaPryznach = posylannya[pozMatrycsi][3];	
                          var poz_3=parseInt(infoPlankaPryznach.indexOf(":", 2), 10);
				          var poz_4=parseInt(infoPlankaPryznach.indexOf("", 999), 10);
				          var infGalakt=parseInt(infoPlankaPryznach.substring(0, 1), 10);  
                          var infSyst=parseInt(infoPlankaPryznach.substring(2, poz_3), 10);
                          var infPlank=parseInt(infoPlankaPryznach.substring((poz_3+1), (poz_4-2)), 10);  
	                      var infPlankVyd=parseInt(infoPlankaPryznach.substring((poz_4-1), poz_4), 10);
	 alert("===== "+infGalakt+":"+infSyst+":"+infPlank+":"+infPlankVyd+" ======");
	if (Resov>=2000000 && Deuterium>=1000000) {		
//-----------------------------------	
        for (i = 0; i < infoTagInput.length; i++) {
			    if (infoTagInput.item(i).name == "galaxy") {
			        infoTagInput.item(i).value=infGalakt;
			     };
				 if (infoTagInput.item(i).name == "system") {
			         infoTagInput.item(i).value=infSyst;
			     };
				 if (infoTagInput.item(i).name == "planet") {
			         infoTagInput.item(i).value=infPlank;
			     };
		  };		

		for (i = 0; i < infoTagOption.length; i++) {
			if (infoTagOption.item(i).innerHTML == "Планета" && infoTagOption.item(i).selected == "selected") {
				infoTagOption.item(i).value=infPlankVyd;
				infoTagOption.item(i).innerHTML="РесБаза";
			};
			if (infoTagOption.item(i).innerHTML == "Луна" && infoTagOption.item(i).selected == "selected") {
				infoTagOption.item(i).value=infPlankVyd;
				infoTagOption.item(i).innerHTML="РесБаза";
			};
		};
				//Посилаємо на ...;
		for (i2 = 0; i2 < infoTagOption.length; i2++) {
			     if (infoTagOption.item(i2).innerHTML == "100" && infoTagOption.item(i2).value=="10") {
				     infoTagOption.item(i2).selected="selected";
			        	// Встановuли швидкість льоту
			       };
		};
			activButtonDali();
			return;

		//--------end--------------
   };
};   
   

   if (infoStorinky() == "Завантажувальний відсік") {
       var infoRadioTrans = document.getElementById("radio_3");
       var infoRadioOst = document.getElementById("radio_4");
	   // Якщо активна автоматична місія транспортування ресурсів =1 to:
		if (parseInt(storage.getItem("AktyvMisiiTransportRes"), 10) == 1) {
			infoRadioTrans.checked = true;

			// Завантаження ресурсами
			  for (i = 0; i < infoTagInput.length; i++) {
			    if (infoTagInput.item(i).name == "resource1") {
			        infoTagInput.item(i).value = Math.floor(Metal/1000)*1000;
			     };
				 if (infoTagInput.item(i).name == "resource2") {
			        infoTagInput.item(i).value=Math.floor(Crystal/1000)*1000;
			     };
				 if (infoTagInput.item(i).name == "resource3") {
			        infoTagInput.item(i).value=Math.floor(Deuterium/10000)*10000;
			     };
		       };
			    // Вимикаемо атоматичне завантаження і відправку ресурсів:
	            storage.setItem("AktyvMisiiTransportRes", 0);
	            // ------------end---------------
			activButtonDali();
		};
		
	};

}		



	

// ---------------------- Container -------------------------------
var myContainer = document.createElement('div');
    myContainer.id = "myContainer"; 
	myContainer.className = 'myContainer';
	myContainer.innerHTML = '<div style="border:0px; border-radius: 5px; position: fixed; z-index:100; right: 15%; bottom: 30px; color:#fdfa00; font-size:11px;  height: 25px; width: 90px; background: url(http://antik-mebel.com.ua/js/img/button.gif);" id="dragable">'+
	
'<div style="position:absolute; left: -205px; top: 10px; margin:0px 0px 5px 0px; width:506px; float:left; overflow:hidden;">'+
  '<div style="">'+
  '<div id="vikoncse" style="position:absolute; top:-25px; left: -5px; font-size:11px; text-align:center; text-transform:uppercase; z-index:99;">'+
    '<h3 style="color:#fdfa00; font-size:12px; padding-top:10px; width:516px; text-align:center;">Vikoncse</h3>'+
  '</div></div>'+
  
  
  
  '<div style="left: 0px; position: relative; top: 0px; width: 100%; display: block;">'+
  '<div style="margin-top: 0px !important; margin: 0px auto; min-height: 310px; min-width: 516px; position: relative; width: 506px; z-index: 1; display: block;">'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_01.png); height: 90px; width: 250px; left: 0px; top: 0px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_02.png); height: 90px; left: 250px; top: 0px; right: 255px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_03.png); height: 90px; width: 255px; top: 0px; right: 0px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_04.png); width: 250px; left: 0px; top: 90px; bottom: 45px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_05.png); left: 250px; right: 255px; top: 90px; bottom: 45px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_06.png); width: 255px; bottom: 45px; top: 90px; right: 0px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_07.png); height: 45px; width: 250px; left: 0px; bottom: 0px; position: absolute; z-index: -1;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_08.png); height: 45px; bottom: 0px; left: 250px; right: 255px; position: absolute; z-index: -1 ;display: block;"></div>'+
    '<div style="background-image: url(http://velmizar.narod.ru/images/blok/BrowserPreview_09.png); height: 45px; width: 255px; bottom: 0px; right: 0px; position: absolute; z-index: -1; display: block;"></div>'+
    '<div style="padding: 9px; position: relative; z-index: 1; display: block; font-size: 12px;">'+
  
  
  

'<div id="servertime2" style="position:absolute; top: 15px; left: 100px; font-size:9px; z-index:2">00:00:00:00</div>'+
'<div id="koordyn" style="position:absolute; top: 15px; right: 110px; font-size:9px; z-index:2">00:00:00:00</div>'+

  '<div style="position:absolute; padding:15px 15px;">'+
    '<table width="460" cellpadding="0" cellspacing="0" style="margin: 5px 0px -15px 2px; font-size:9px; border-radius: 15px;" border="1">'+
         '<tbody>'+
		 
		 '<tr>'+
          '<td colspan="7">'+ 
           '<div id="txtZagol" style="color:#9F9FF8; font-size:12px; text-align:center;">Росташування: Ми позамежами гри</div>'+
		   '</td>'+ 
		   '</tr>'+ 
		 
        '<tr>'+
          '<td>'+
		   '<div id="txtz_1" style="color:#6F6FF6; font-size:10px; text-align:center;">Місія</div></td>'+

		    '<td>'+
		   '<div id="txtz_2" style="color:#6F6FF6; font-size:10px; text-align:center;">Задіяно кораблів</div></td>'+

		    '<td>'+
		   '<div id="txtz_3" style="color:#6F6FF6; font-size:10px; text-align:center;">Звідки</div></td>'+

		    '<td>'+
		   '<div id="txtz_4" style="color:#6F6FF6; font-size:10px; text-align:center;">Куда</div></td>'+

		    '<td>'+
		   '<div id="txtz_5" style="color:#6F6FF6; font-size:10px; text-align:center;">Вантаж</div></td>'+

		    '<td>'+
		   '<div id="txtz_6" style="color:#6F6FF6; font-size:10px; text-align:center;">Час повернення найближчого</div></td>'+

		    '<td>'+
		   '<div id="txtz_7" style="color:#6F6FF6; font-size:10px; text-align:center;">Різне</div></td>'+
		   '</tr>'+ 
		   
        '<tr>'+
          '<td>'+
		   '<div id="mission_tm" style="text-align:left; width:100px;"><input id="m_tm" type="checkbox" name="m_tm" value="1" checked><label for="m_tm">Пошук ТМ:</label></div></td>'+

		    '<td>'+
		   '<div id="txttm_1" style="text-align:center;">1</div></td>'+

		    '<td>'+
		   '<div id="txttm_2" style="text-align:center;"><input id="m_art4" type="text" name="m_art4" value="1:111:11" size="8" style="font-size:9px; width:40px;"></div></td>'+

		    '<td>'+
		   '<div id="txttm_3" style="text-align:center;"><input id="m_art4" type="text" name="m_art4" value="1:111:11:1" size="10" style="font-size:9px; width:50px;"></div></td>'+		   

		    '<td>'+
		   '<div id="txttm_4" style="text-align:center;"><input id="m_tm4" type="text" name="m_tm4" value="2000" size="10" style="font-size:9px; width:30px;"></div></td>'+		   

		    '<td>'+
		   '<div id="txttm_5" style="text-align:center;">00:00:00</div></td>'+		   

		    '<td>'+
		   '<div id="txttm_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 
		  
		   
        '<tr>'+
          '<td>'+
		   '<div id="mission_art" style="text-align:left;"><input id="m_art" type="checkbox" name="m_art" value="1" checked><label for="m_art">Пошук арт.:</label></div></td>'+

		    '<td>'+
		   '<div id="txtart_1" style="text-align:center;"><input id="m_art4" type="text" name="m_art4" value="7" size="3" style="font-size:9px; width:10px;"></div></td>'+

		    '<td>'+
		   '<div id="txtart_2" style="text-align:center;"><input id="m_art4" type="text" name="m_art4" value="1:111:11" size="10" style="font-size:9px; width:40px;"></div></td>'+

		    '<td>'+
		   '<div id="txtart_3" style="text-align:center;"><input id="m_art4" type="text" name="m_art4" value="1:111:11:1" size="10" style="font-size:9px; width:50px;"></div></td>'+		   

		    '<td>'+
		   '<div id="txtart_4" style="text-align:center;"><input id="m_art4" type="text" name="m_art4" value="2000" size="10" style="font-size:9px; width:30px;"></div></td>'+		   

		    '<td>'+
		   '<div id="txtart_5" style="text-align:center;">00:00:00</div></td>'+		   

		    '<td>'+
		   '<div id="txtart_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 
		  		  
        '<tr>'+
          '<td>'+
		   '<div id="mission_transp" style="text-align:left;"><input id="m_transp" type="checkbox" name="m_transp" value="1" checked><label for="m_transp">Трансп. рес.:</label></div></td>'+

		    '<td colspan="3" style="text-align:center;">'+
		   '<div id="txttransp_1">----</div></td>'+		   

		    '<td>'+
		   '<div id="txttransp_4" style="text-align:center;"><input id="m_transp4" type="text" name="m_transp4" value="1000000" size="10" style="font-size:9px; width:40px;"></div></td>'+		   

		    '<td>'+
		   '<div id="txttransp_5" style="text-align:center;">---</div></td>'+		   

		    '<td>'+
		   '<div id="txttransp_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 
		  
		  		  
        '<tr>'+
          '<td>'+
		   '<div id="mission_obRes" style="text-align:left;"><input id="m_obRes" type="checkbox" name="m_obRes" value="1" checked><label for="m_obRes">Обмін рес.:</label></div></td>'+

		    '<td colspan="3">'+
		   '<div id="txtobRes_1" style="text-align:center;">----</div></td>'+		   

		    '<td>'+
		   '<div id="txtobRes_4" style="text-align:center;"><input id="m_obRes4" type="text" name="m_obRes4" value="1000000" size="10" style="font-size:9px; width:40px;"></div></td>'+		   

		    '<td>'+
		   '<div id="txtobRes_5" style="text-align:center;">---</div></td>'+		   

		    '<td>'+
		   '<div id="txtobRes_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 
	
		  		  
        '<tr>'+
          '<td>'+
		   '<div id="mission_doslid" style="text-align:left;"><input id="m_doslid" type="checkbox" name="m_doslid" value="1" checked><label for="m_doslid">Дослід.:</label></div></td>'+

		    '<td colspan="4">'+
		   '<div id="txtdoslid_1" style="text-align:center;">----</div></td>'+		
		   
		    '<td>'+
		   '<div id="txtdoslid_5" style="text-align:center;">---</div></td>'+	
		   
		    '<td>'+
		   '<div id="txtdoslid_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 

		  		  
        '<tr>'+
          '<td>'+
		   '<div id="mission_bud" style="text-align:left;"><input id="m_bud" type="checkbox" name="m_bud" value="1" checked><label for="m_bud">Будівн.:</label></div></td>'+

		    '<td colspan="4">'+
		   '<div id="txtbud_1" style="text-align:center;">----</div></td>'+		     

		    '<td>'+
		   '<div id="txtbud_5" style="text-align:center;">---</div></td>'+		 
		   
		    '<td>'+
		   '<div id="txtbud_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 
			  
		  		  
        '<tr>'+
          '<td>'+
		   '<div id="mission_eg" style="text-align:left;"><input id="m_eg" type="checkbox" name="m_eg" value="1" checked><label for="m_eg">Експ.групи:</label></div></td>'+

		    '<td>'+
		   '<div id="txteg_1" style="text-align:center;"><input id="m_eg1" type="text" name="m_eg1" value="2" size="3" style="font-size:9px; width:10px;"></div></td>'+		     

		    '<td colspan="3">'+
		   '<div id="txteg_2" style="text-align:center;">----</div></td>'+		     

		    '<td>'+
		   '<div id="txteg_5" style="text-align:center;">---</div></td>'+		 
		   
		    '<td>'+
		   '<div id="txteg_6" style="text-align:center;">---</div></td>'+		   
		   '</tr>'+ 


        '<tr>'+
          '<td>'+
		   '<div id="txtM_1" style="color:#6F6FF6; font-size:10px; text-align:center;">Метал:</div></td>'+

		    '<td>'+
		   '<div id="txtK_1" style="color:#6F6FF6; font-size:10px; text-align:center;">Кристал:</div></td>'+

		    '<td>'+
		   '<div id="txtD_1" style="color:#6F6FF6; font-size:10px; text-align:center;">Дейтерій:</div></td>'+

		    '<td>'+
		   '<div id="txtTM_1" style="color:#6F6FF6; font-size:10px; text-align:center;">ТМ:</div></td>'+

		    '<td>'+
		   '<div id="txtE_1" style="color:#6F6FF6; font-size:10px; text-align:center;">Енергія:</div></td>'+

		    '<td>'+
		   '<div id="txtFF_1" style="color:#6F6FF6; font-size:10px; text-align:center;">Таймер:</div></td>'+

		    '<td>'+
		   '<div id="txtFFF_1" style="color:#6F6FF6; font-size:10px; text-align:center;">---</div></td>'+
		   '</tr>'+ 


 '<tr>'+
          '<td>'+
		   '<div id="txtM_2" style="color:#6F6006; font-size:10px; text-align:center;">00000000</div></td>'+

		    '<td>'+
		   '<div id="txtK_2" style="color:#6F6006; font-size:10px; text-align:center;">00000000</div></td>'+

		    '<td>'+
		   '<div id="txtD_2" style="color:#6F6006; font-size:10px; text-align:center;">00000000</div></td>'+

		    '<td>'+
		   '<div id="txtTM_2" style="color:#6F6006; font-size:10px; text-align:center;">00</div></td>'+

		    '<td>'+
		   '<div id="txtE_2" style="color:#6F6006; font-size:10px; text-align:center;">000000</div></td>'+

		    '<td>'+
		   '<div id="txtFF_2" style="color:#6F6006; font-size:10px; text-align:center;">00:00:00</div></td>'+

		    '<td>'+
		   '<div id="txtFFF_2" style="color:#6F6006; font-size:10px; text-align:center;">---</div></td>'+
		   '</tr>'+ 


        '</tbody></table></div>'+
  '<div style="height:21px;">'+
  '</div></div></div></div></div>';	
  


    

// система функцiй на пересування вiконця Container
// --------------------------- 
function collectElems(){  
  var b=document.all||document.getElementsByTagName('*');  
  for(var i=0;i<b.length;i++){  
  addEvt(b[i],'mousedown',function(a){  
  if(mousePosition(a).t.id.match(/dragable/ig)){  
  dragElems(mousePosition(a).t,a)  
  }  
  })  
  }  
  }  
collectElems();  
function dragElems(b,c){  
  mousePosition(c,'p');  
  var i,x,y,l,t;  
  i=true;  
  x=mousePosition(c).x;  
  y=mousePosition(c).y;  
  l=b.offsetLeft;  
  t=b.offsetTop;  
  addEvt(b,'mouseup',function(){i=false});  
  addEvt(document,'mouseup',function(){i=false});  
  addEvt(document,'mousemove',function(a){  
  if(i){  
  mousePosition(a,'p');  
  b.style.left=l+mousePosition(a).x-x+'px';  
  b.style.top=t+mousePosition(a).y-y+'px'  
  }  
  })  
  }  
function mousePosition(event,i){  
  var d,x,y,t,b;  
  d=document;  
  b=/*@cc_on!@*/false;  
  e=b?window.event:event;  
  if(i){b?e.returnValue=false:e.preventDefault()}  
  x=(b?d.documentElement.scrollTop:d.body.scrollTop)+e.clientX;  
  y=(b?d.documentElement.scrollLeft:d.body.scrollLeft)+e.clientY;  
  t=b?e.srcElement:e.target;  
  return{x:x,y:y,t:t}  
  }  
function addEvt(a,b,i){  
  if(a.addEventListener){a.addEventListener(b,i,false)}else  
  if(a.attachEvent){a.attachEvent('on'+b,i)}else  
  {a['on'+b]=i}  
}  
// --------------------------- 
	
 setTimeout(function() {
					 document.body.appendChild(myContainer);
					// document.getElementById("dell").onclick =alert('---------##----------');
					} , 5000); 	






function infoStorinky(){ 
	// інформація про те на якій сторінці находимось.
var infStorinka="Ми позамежами гри!";
var infoTagTD = document.getElementsByTagName('td');
var infoTagA = document.getElementsByTagName('a');
var infoTagTH = document.getElementsByTagName('th');
var infoTagH2 = document.getElementsByTagName('h2');
var infoTagInput = document.getElementsByTagName('input');
var infPrys=0;

for (i = 0; i < infoTagTD.length; i++) {
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			if (infoTagTD.item(i).innerHTML == "Приказ") {
			infStorinka="Рух кораблів";
			} else if (infoTagTD.item(i).innerHTML == "Максимальная скорость") {
			infStorinka="Визначення місця призначення";
			} else if (infoTagTD.item(i).innerHTML == "Остаток") {
			infStorinka="Завантажувальний відсік";
			} else if (infoTagTD.item(i).innerHTML == "Флотов в полете") {
			infStorinka="Огляд подій";
			} else if (infoTagTD.item(i).innerHTML == "Занятость полей") {
			infStorinka="Розбудова імперії";
			} else if (infoTagTD.item(i).innerHTML == "Курс обмена") {
			infStorinka="Обмін ресов";
			} else if (infoTagTD.item(i).innerHTML == "Кому") {
			infStorinka="Повідомлення";
			
			};
		};

for (i = 0; i < infoTagA.length; i++) {
			if (infoTagA.item(i).innerHTML == "Шпионаж") {
			infStorinka="Дослідження";
			} else if (infoTagA.item(i).innerHTML == '<img src="styles/skins/gow/gebaeude/202.gif" alt="Малый транспорт" width="120" height="120">') {
			infStorinka="Верфь";
			
			};
		};


for (i = 0; i < infoTagTH.length; i++) {
			if (infoTagTH.item(i).innerHTML == "Вызвать скупщика") {
			infStorinka="Торговець";
			} else if (infoTagTH.item(i).innerHTML == "Обменять металл") {
			infStorinka="Обмін металу";
			} else if (infoTagTH.item(i).innerHTML == "Обменять кристалл") {
			infStorinka="Обмін кристалу";
			} else if (infoTagTH.item(i).innerHTML == "Обменять дейтерий") {
			infStorinka="Обмін дейтерію";
			} else if (infoTagTH.item(i).innerHTML == "<center><strong><h2><em>Скупщик Темной Материи</em></h2></strong></center>") {
			infStorinka="Обмін ТМ";
			} else if (infoTagTH.item(i).innerHTML == "Артефакты на складе") {
			infStorinka="Склад артефактів";
			} else if (infoTagTH.item(i).innerHTML == "Солнечная система") {
			infStorinka="Огляд галактик";
			} else if (infoTagTH.item(i).innerHTML == "Написать новое сообщение") {
			infStorinka="Повідомлення";
			} else if (infoTagTH.item(i).innerHTML == '<div align="center">Отправить в экспедицию</div>') {
			infStorinka="Експедиційні групи";
			} else if (infoTagTH.item(i).innerHTML == '<div align="center">Время до возврата</div>') {
			infStorinka="Список експедиційних груп що в польоті";
			};
		};

for (i = 0; i < infoTagH2.length; i++) {
			if (infoTagH2.item(i).innerHTML == "Межгалактический рынок") {
				for (i2 = 0; i2 < infoTagInput.length; i2++) {
			        if (infoTagInput.item(i2).value == "Сохранить фильтр") {
						 infPrys=1; 
		        	}
			    };
				if (infPrys == 1) {
					 infStorinka="Базар";
				}else{infStorinka="Підтвербження покупки";};
		    };
 };


 return infStorinka;
}


function perevodTime(sekundy) {
	var godyny = 0;
	var minuty = 0;
	var tablo = "--:--:--";
    godynnyk = new Date();	
      if (sekundy < 0) {
	    tablo = "00:00:00";
       } else {
	     if (sekundy > 59) {
		          minuty = Math.floor(sekundy / 60);
		          sekundy = sekundy - minuty * 60;
	     };
	     if (minuty > 59) {
		          godyny = Math.floor(minuty / 60);
		          minuty = minuty - godyny * 60;
	     };
	     if (sekundy < 10) sekundy = "0" + sekundy;
	     if (minuty < 10)  minuty = "0" + minuty;
		tablo = godyny + ":" + minuty + ":" + sekundy; 
	   };
	return tablo;
}




function infoLogoNik(){ 
	// інформація про наявний ник гравця.
var infLogoNik="xXx";
var infoTagUL = document.getElementsByTagName('ul');
var infoTagFont = infoTagUL.item(0).getElementsByTagName('font');
    infLogoNik=infoTagFont[2].innerHTML;
 return infLogoNik;
}




function infoKoordynaty(){ 
// де зараз знаходимось? координати?
 var infoTagInput = document.getElementsByTagName('input'); 
 var nGalaxy =0;
 var nSystem =0;
 var nPlanet =0;
 var nPlanet_type =0;
 var koordynata ="";
// var win_24 = alert("====== infoTagInput.length: "+infoTagInput.length+" ======");
for (i = 0; i < infoTagInput.length; i++) {
			//var win_21=alert("====="+infoTagInput.item(i).innerHTML+"======");
			
			if (infoTagInput.item(i).name == "galaxy") {
			nGalaxy=infoTagInput.item(i).value;
			//} else if (infoTagInput.item(i).name == "thisgalaxy") {
			//nGalaxy=infoTagInput.item(i).value;
			//} else if (infoTagInput.item(i).name == "thissystem") {
			//nSystem=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "system") {
			nSystem=infoTagInput.item(i).value;
			//} else if (infoTagInput.item(i).name == "thisplanet") {
			//nPlanet=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planet") {
			nPlanet=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "thisplanettype") {
			nPlanet_type=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planet_type") {
			nPlanet_type=infoTagInput.item(i).value;
			} else if (infoTagInput.item(i).name == "planettype") {
			nPlanet_type=infoTagInput.item(i).value;
			};
		};
	 koordynata=nGalaxy+":"+nSystem+":"+nPlanet+":"+nPlanet_type;	
//var win_24 = alert("====== маєм систему: "+koordynata+" ======");
return koordynata;
}



function infoKoordynataCP(){ 
 var infoTagOption = document.getElementsByTagName('option');
// Координата ср (номер планети) 
for (i = 0; i < infoTagOption.length; i++) {
			if (infoTagOption.item(i).selected == true) {
			var poz1=infoTagOption.item(i).value.indexOf("cp=");
		    var poz2=infoTagOption.item(i).value.indexOf("&re=0");
		    var cpActiv = infoTagOption.item(i).value.substring(poz1+3, poz2);
			break;
			};			
		};
return cpActiv;
}



function activPerezagruzka(){
	// Перезавантаження
window.open("http://ru2.lordgalaxy.ru//game.php?page=fleet","_self");
}

function widOpen(){
	// Перейти на на іншу планету.. послідовно напочатку по лунах потім по планетах:
var koordynataCP = infoKoordynataCP();
  for (i = 0; i <= 35; i++) {
	if (koordynataCP == posylannya[i][1] && i<35) {
	 pozMatrycsi = i+1;
	}else{pozMatrycsi = 0;};
  };	

	// Перейти на довільну планету - вкладка: флот
	// Math.floor(Math.random() * (max - min + 1)) + min;
   // var k=Math.floor( Math.random() * (39 - 0 + 1)) + 0;
	
	
    window.open(posylannya[pozMatrycsi][0],'_self');
}

function activButtonDali(){ 
		var infoTagInput = document.getElementsByTagName('input');
for (i = 0; i < infoTagInput.length; i++) {
			//Знаходимо і натискаэмо кнопку "Дальше"
			if (infoTagInput.item(i).value=="Дальше") {
			var evt = document.createEvent('MouseEvents');
		        evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		            infoTagInput.item(i).dispatchEvent(evt);	
			};
		};
} 









 //-------- zapusk funkcsii iz zaderzhkoj -----------------
setInterval(function() {startTime1()},999);
