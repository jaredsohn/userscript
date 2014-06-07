// ==UserScript==
// @name           TW bar
// @namespace      www.tribalwars.net
// @description    Premium bar for Tribalwars
// @include        http://*.tribalwars.*/game.php?*
// @include        http://*.tribalwars.*/staemme.php?*
// @version        1.6.3
// @require        http://userscripts.org/scripts/source/85148.user.js
// @require        http://userscripts.org/scripts/source/89044.user.js
// ==/UserScript==
//UPDATE INFO
//Add  new update for notepad from (code from http://userscripts.org/scripts/show/85674)
//fix bug with Ad Remover 


//Do Not Touch
function functionMain(e) {
	var b = document.getElementById('firsttime');

	if (b==null) {
		var ot = document.createElement('div'); // Added this element, hence the script must run only one time (without it, sometimes it will be 2 or 3 premium menus)
		ot.setAttribute('id','firsttime');
		document.getElementsByTagName('body')[0].appendChild(ot);

//en = English
//lt = Lithuanian
//ae = Arabic
//br = Spanish
//it = Italian
//hu = Hungarian
//nl = Dutch
//se = Swedish
//tur = Turkish
//asia = Thai
//bg = Bulgarian
//jb = Japanese
//hr = Croatian
//si = Slovenian
var lang = "en";   // Language option
		
		var langArr = new Array(8);
		if (lang == "en") {   // English
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Stats";
			langArr[16] = "Maps";
			langArr[17] = "Update";
			langArr[18] = "";
		}
		if (lang == "lt") {   // Lithuanian
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Statistika";
			langArr[16] = "Žemėlapiai";
			langArr[17] = "Atnaujinti";
			langArr[18] = "Šis v1.6";
		}
                if (lang == "ae") {   // Arabic
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Stats";
			langArr[16] = "Maps";
			langArr[17] = "Update";
			langArr[18] = "this v1.6";
		}
		if (lang == "br") {   // Spanish
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Estadísticas";
			langArr[16] = "Mapas";
			langArr[17] = "Actualizar";
			langArr[18] = "esta v1.6";
		}
                if (lang == "it") {   // Italian
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Statistiche";
			langArr[16] = "Mappe";
			langArr[17] = "Aggiorna";
			langArr[18] = "questo v1.6";
		}
                if (lang == "hu") {   // Hungarian
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "statisztika";
			langArr[16] = "Maps";
			langArr[17] = "Frissítés";
			langArr[18] = "ez v1.6";
		}
		if (lang == "nl") {   // dutch
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Statistieken";
			langArr[16] = "Maps";
			langArr[17] = "Bijwerken";
			langArr[18] = "Deze v1.6";
		}
                if (lang == "se") { // Swedish
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Stats";
			langArr[16] = "Kartor";
			langArr[17] = "Uppdatera";
			langArr[18] = "Detta v1.6";
                }
                if (lang == "tur") { // Turkish
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "İstatistikler";
			langArr[16] = "Maps";
			langArr[17] = "Update";
			langArr[18] = "Bu v1.6";
               }
                if (lang == "asia") { // Thai
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] ="สถิติ";
			langArr[16] ="Maps";
			langArr[17] ="ปรับปรุง";
			langArr[18] ="นี้ v1.6";
               }
                if (lang == "bg") {   // Bulgarian
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Статистика";
			langArr[16] = "Карти";
			langArr[17] = "обновяване";
			langArr[18] = "Това v1.6";
		}
                if (lang == "jb") {   // Japanese
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] ="統計";
			langArr[16] ="マップ";
			langArr[17] ="更新";
			langArr[18] ="この1.6";
		}
                if (lang == "hr") {   // Croatian
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Statistike";
			langArr[16] = "Mape";
			langArr[17] = "Ažuriraj";
			langArr[18] = "Ova v1.6";
		}
                if (lang == "si") { // Slovenian
			langArr[0] = "";
			langArr[1] = "";
			langArr[2] = "";
			langArr[3] = "";
			langArr[4] = "";
			langArr[5] = "";
			langArr[6] = "";
			langArr[7] = "";
			langArr[8] = "";
			langArr[9] = "";
			langArr[10] = "";
			langArr[11] = "";
			langArr[12] = "";
			langArr[13] = "";
			langArr[14] = "";
			langArr[15] = "Statistika";
			langArr[16] = "Maps";
			langArr[17] = "Posodobi";
			langArr[18] = "to v1.6";
               }
		tableIdIndex = 0;
		trIdIndex = 0;
		tdIdIndex = 0;

		if(String(document.location).indexOf("forum.php") < 0){
		if(String(document.location).indexOf("help2.php") < 0){
		if(String(document.location).indexOf("http://ch1.ds.ignames.net/forum.php") > -1){
			window.setTimeout(function(){
			var adDiv = document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
			 if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
				document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
			 }
			}, 500);
		}
		else{
		window.setTimeout(function() {
		//Werbung entfernen (muss als erstes gemacht werden, dass "Hauptframe" definiert werden kann):
		if(document.getElementsByTagName("frameset")[0]){
		 if(document.getElementsByTagName("frameset")[0].cols){
			document.getElementsByTagName("frameset")[0].cols = "*, 1";
			Hauptframe = frames[0].document;
		 }
		 else if(document.getElementsByTagName("frameset")[0].rows){
			document.getElementsByTagName("frameset")[0].rows = "1, *";
			Hauptframe = frames[1].document;
		 }
		 else Hauptframe = document;
		}else Hauptframe = document;
		//Village-Id holen
		 var rawVillId = String(Hauptframe.location);
		 VillId = rawVillId.substring(rawVillId.indexOf("village=")+8, rawVillId.indexOf("&"));
		//Quickbar erstellen
		 createQuickbarTable();
		 createQuickbarShortcuts();
		//Werbung im Forum entfernen
		 deleteForumAds();
		}, 500);
		}
		}
		}

		//Werbung im Forum l̦schen:
		window.deleteForumAds = function(){
		  if(Hauptframe.getElementsByTagName('iframe')[0]){
			var forumFrame = Hauptframe.getElementsByTagName('iframe')[0];
			var doc = forumFrame.contentDocument;
			var docBody = doc.getElementsByTagName('body')[0];
			var adDiv = docBody.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
			if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
				docBody.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
			}
		  }
		}

		window.newShortcut = function(imgSrc, aHref, text){
			var newImg = document.createElement("img");
			newImg.setAttribute("src", imgSrc);
			var newA = document.createElement("a");
			newA.setAttribute("href", aHref);
			newA.appendChild(newImg);
			var newText = document.createTextNode(text);
			newA.appendChild(newText);
			var newTd = document.createElement("td");
			newTd.setAttribute("id", "myQuickbarTd"+tdIdIndex);
			if(tdIdIndex == 0){
				newTd.setAttribute("style", "z-index:1;visibility:visible;background-image:url('http://i54.tinypic.com/k49i5s.jpg'); background-repeat:no-repeat; position:absolute;margin:-10px auto auto;width:193mm;left:220px;collapse: collapse;");
			}
			else if(tdIdIndex == 1){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;type:text/javascript;margin:-0px auto auto;width:1px auto auto;left:235px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 2){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:265px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 3){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:295px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 4){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:325px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 5){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:355px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 6){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:385px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 7){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:415px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 8){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:0px auto auto;height:1px auto auto;left:445px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 9){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:475px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 10){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:505px;border-collapse:collapse;};"); 
			}
			else if(tdIdIndex == 11){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px;height:1px auto auto;left:535px;border-collapse:collapse; font-size: 10px; font-family:hhh};};"); 
			}
			else if(tdIdIndex == 12){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px;height:1px;left:565px;border-collapse:collapse; font-size: 10px; font-family:hhh};};"); 
			}
			else if(tdIdIndex == 13){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px;height:1px auto auto;left:595px;border-collapse:collapse; font-size: 10px; font-family:hhh};"); 
			}
			else if(tdIdIndex == 14){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-0px auto auto;width:10px auto auto;height:1px auto auto;left:625px;border-collapse:collapse; font-size: 22px; font-family:hhh};"); 
			}
			else if(tdIdIndex == 15){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-1px auto auto;width:50px;height:1px;left:655px;border-collapse:collapse; font-size: 10px;};"); 
			}
			else if(tdIdIndex == 16){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-1px auto auto;width:50px;height:1px;left:715px;border-collapse:collapse; font-size: 10px;};"); 
			}
			else if(tdIdIndex == 17){
				newTd.setAttribute("style", " z-index:1;visibility:visible;position:absolute;margin:-1px auto auto;width:50px;height:1px;left:785px;border-collapse:collapse; font-size: 10px;};"); 
			}
			else if(tdIdIndex == 18){
				newTd.setAttribute("style", " visibility: hidden;z-index:1;position:absolute;margin:-1px auto auto;width:60px;height:1px;left:860px;border-collapse:collapse; font-size: 10px;};"); 
			}
			else{
				newTd.setAttribute("style", "visibility: hidden;border-width:1px; border-style:gold; border-color:;height:22px auto auto; border-left-style:none; border-right-style:none; background-repeat:repeat-y; background-color:; font-weight:900; FONT-COLOR:black; text-align:center; font-size:10px; width:10%; color:white; background: url(../../../static.grepolis.com/images/game/temp/button_left.png) no-repeat left; padding-left:4px; padding-right:4px; border-spacing:1px;");
			}
			Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
			Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
			tdIdIndex++;
		}

		window.createQuickbarTable = function() {
			var firstHR = Hauptframe.getElementsByTagName("hr")[0];
			var newTable = document.createElement("table");
			newTable.setAttribute("id", "myQuickbarTable"+tableIdIndex);
			newTable.setAttribute("style", "visibility: hidden;margin:11px auto auto; width:500px; border-collapse:separate; border-width:1px; border-style:solid; border-color:;");
			newTable.setAttribute("class", "menu nowrap");
			newTable.setAttribute("align", "center");
			var newTr = document.createElement("tr");
			newTr.setAttribute("id", "myQuickbarTr0");
			newTr.setAttribute("align", "center");
			Hauptframe.getElementsByTagName("body")[0].insertBefore(newTable, firstHR);
			Hauptframe.getElementById("myQuickbarTable"+tableIdIndex).appendChild(newTr);
		}

		window.createQuickbarShortcuts = function() {
			"<tr>   " + 
			newShortcut("http://i52.tinypic.com/2ypj607.jpg", "http://", langArr[0]);
                        newShortcut("../../../graphic/buildings/main.png", "../../../game.php?village="+VillId+"&screen=main", langArr[1]);
			newShortcut("../../../graphic/buildings/barracks.png", "../../../game.php?village="+VillId+"&screen=barracks", langArr[2]);
			newShortcut("../../../graphic/buildings/stable.png", "../../../game.php?village="+VillId+"&screen=stable", langArr[3]);
			newShortcut("../../../graphic/buildings/garage.png", "../../../game.php?village="+VillId+"&screen=garage", langArr[4]);
			newShortcut("../../../graphic/buildings/snob.png", "../../../game.php?village="+VillId+"&screen=snob", langArr[5]);
			+ "<tr>   " + 
			newShortcut("../../../graphic/buildings/smith.png", "../../../game.php?village="+VillId+"&screen=smith", langArr[6]);
			newShortcut("../../../graphic/buildings/market.png", "../../../game.php?village="+VillId+"&screen=market", langArr[7]);
                        newShortcut("../../../graphic/buildings/stone.png", "../../../game.php?village="+VillId+"&screen=stone", langArr[8]);
                        newShortcut("../../../graphic/buildings/iron.png", "../../../game.php?village="+VillId+"&screen=iron", langArr[9]);
                        newShortcut("../../../graphic/buildings/wood.png", "../../../game.php?village="+VillId+"&screen=wood", langArr[10]);
			newShortcut("../../../graphic/buildings/place.png", "../../../game.php?village="+VillId+"&screen=place", langArr[11]);
                        newShortcut("../../../graphic/buildings/farm.png", "../../../game.php?village="+VillId+"&screen=farm", langArr[12]);
                        newShortcut("../../../graphic/buildings/hide.png", "../../../game.php?village="+VillId+"&screen=hide", langArr[13]);
                        newShortcut("../../../graphic/buildings/wall.png", "../../../game.php?village="+VillId+"&screen=wall", langArr[14]);
                        newShortcut("http://www.twstats.com/img/favicon.ico", "http://www.twstats.com/", langArr[15]);
                        newShortcut("http://s1.tribalwarsmap.net/favicon.ico", "http://www.tribalwarsmap.com/", langArr[16]);
                        newShortcut("http://userscripts.org/images/script_icon.png", "http://userscripts.org/scripts/show/85148", langArr[17]);
                        newShortcut("http://userscripts.org/images/script_icon.png", "http://userscripts.org/scripts/source/85148.user.js", langArr[18]);
                        newShortcut("http://userscripts.org/images/script_icon.png", "http://userscripts.org/images/script_icon.png", langArr[19]);
			tableIdIndex++;
			trIdIndex++;
		}
	}
}

if (window.addEventListener) {
	window.addEventListener('load', functionMain, false);
} else {
	window.attachEvent('onload', functionMain);
}
var url=window.location.href;
var redirect="";
if(url.indexOf("tribalwars") != -1)
        redirect="http://www.tribalwars.net";
else if(url.indexOf("triburile") != -1)
        redirect="http://www.triburile.ro";
if(url.indexOf("logout.php") != -1){
	window.stop();
	window.location=redirect;
}
var localStore = false;

if(unsafeWindow.localStorage != null)
{
    localStore = true;
}

///////////////////////////////////////////////////////////////
// WENN SIE AUF JEDEN FALL COOKIES BENUTZEN WOLLEN, ENTFERNEN SIE DIE BEIDEN // VOR DER NÄCHSTEN ZEILE
//localStorage = false;
///////////////////////////////////////////////////////////////

(function()
{
    var data = '';
    
    if(localStore)
    { //Wenn localStorage unterstützt wird, es benutzen...
        data = unescape(unsafeWindow.localStorage.note_data);
    }
    else
    { //Sonst Cookies verwenden...
        data = GM_getValue('note_data','Schreibe hier deine Notizen nieder...');
    }
    
    if(!data)
        data = 'Schreibe hier deine Notizen nieder...';

    //Container für die Notizen erstellen
    var $ = unsafeWindow.$;
    
    var notiz = $('<div id="notiz"><br /></div>')
        .css({
            display:"none",
            position:"absolute",
            backgroundColor:"#ffff83",
            width:"500px",
            height:"400px",
            zIndex:"99",
            textAlign:"center",
            borderCollapse:"collapse",
            borderStyle:"solid",
            borderColor:"#994C00 #603000 #552A00 #804000",
            borderWidth:"2px",
            fontSize:"40px;",
        }).mouseover(function(){
            $(this).show();
        }).mouseout(function(){
            $(this).hide();
        }).append(
            $('<textarea id="note_text"></textarea>')
                .css({
                    width:"90%",
                    height:"88%",
                }).append(data)
        ).append(
            $('<input type="button" value="Save" id="save_note" />')
                .click(function(){
                    if(localStore)
                    { //Wenn localStorage unterstützt wird...
                        unsafeWindow.localStorage.note_data = escape($('#note_text').val());
                    }
                    else
                    { //Wenn nicht...
                        //Cookie setzen...
                        GM_setValue('note_data',$('#note_text').val());
                    }
                })
        ).appendTo($('body'));
        
    var menuTr = $('<td></td>').append(
        $('<a href="javascript:void(null)">Notebook</a>')
            .mouseover(function(){
                notiz.show();
            })
            .mouseout(function(){
                notiz.hide();
            })
    ).appendTo($('#menu_row'));
    
    notiz.css({
        top:menuTr.offset().top+menuTr.height(),
        left:menuTr.offset().left-400
    });
})();

//another comment :P
//start of the remove frame code
var frmsets = document.getElementsByTagName("frameset");
if(frmsets.length > 0){
	var frmset = frmsets[0];
	for(kk=0; kk<frmset.childNodes.length; kk++){
		var frm = frmset.childNodes[kk];
		if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main"){
			frm.src = "about:blank";
			frm.cols ='10';
		}
	}
	if(frmset.getAttribute("rows")) frmset.setAttribute("rows", "0, *");
	else frmset.setAttribute("cols", "*, 0");

	// Remove ads timer
	unsafeWindow.reload = function(ad_top, ad_sky){; };

	// No need to go any further; this must be the top page
	return;
}else{
	var ad_iframe = $("ad");
	if(ad_iframe && ad_iframe.tagName == "IFRAME"){
		ad_iframe.style.display = "none";
		var body_iframe = $("main");
		if(body_iframe && body_iframe.tagName == "IFRAME"){
			body_iframe.style.top = "0px";
			body_iframe.style.left = "0px";
		}
	}
}