// ==UserScript==
// @name				KB-Hosting
// @author				dob (http://userscripts.org/users/33073); Mikado (http://userscripts.org/users/31647); JoeSimmons (http://userscripts.org/users/JoeSimmons); Jarett (http://userscripts.org/users/38602);
// @author				Un1matr1x 	http://kb.un1matr1x.de
// @date				2012-12-01
// @version				0.4.00
// @Development Stages	Release
// @description			KB-Hosting Script zum Speichern von Kampfberichten auf kb.un1mtar1x.de
// @namespace			KB-Hosting
// @include				http://*.ogame.*/game/index.php?page=bericht&*&bericht=*
// @include				http://*.ogame.*/game/index.php?page=combatreport*
// @include				http://*/br.php?rid=*
// @include				http://*/rw.php?raport=*

// ==/UserScript==

//======================Changelog======================\\
//--v0.4.00 by Un1matr1x--------------------[Release]--\\
// ! change some basics to fix GoogleChrome / FF17	   \\
//--v0.3.05 by Un1matr1x--------------------[Release]--\\
// ~ change image to base64							   \\
//--v0.3.03 by Un1matr1x--------------------[Release]--\\
// + french translation improved [thx to mafmaf] 	   \\
//--v0.3.02 by Un1matr1x--------------------[Release]--\\
// + danish translation added [thx MaBoNi82]           \\
//--v0.3.01 by Un1matr1x--------------------[Release]--\\
// + spanish translation improved [thx to Mr. Méndez]  \\
//--v0.3.00 by Un1matr1x--------------------[Release]--\\
// + russian translation added [thx Tarja The Witch]   \\
// ! fix for open stored CombatReports @KB-Hosting 3.0 \\
//--v0.2.01 by Un1matr1x--------------------[Release]--\\
// + poor translations for Updatecheck added		   \\
// ~ include-change to work with new ogame-naming	   \\
//--v0.2.00 by Un1matr1x--------------------[Release]--\\
// + Script Update Checker from Jarett added		   \\
//--v0.1.00 by JoeSimmons-------------------[Release]--\\
// ~ code optimization (language switch)			   \\
// ? approval by oGameTech-Team	for oGame			   \\
//--v0.0.10 by Un1matr1x-----------------------[RC03]--\\
// ! fix of the language optimization				   \\
//--v0.0.09 by JoeSimmons----------------------[RC02]--\\
// ~ code optimization (language selection)			   \\
//--v0.0.08 by Un1matr1x-----------------------[RC01]--\\
// + Adding multiple languages						   \\
//--v0.0.07 by JoeSimmons----------------------[Beta]--\\
// + removing Button itself from transferred sc 	   \\
//--v0.0.06 by Un1matr1x-----------------------[Beta]--\\
// ! fix of the optimized "open in a new tab"		   \\
//--v0.0.05 by JoeSimmons----------------------[Beta]--\\
// ~ code optimization (open in a new Tab)			   \\
// + checkboxes for BR-Options (exclusiv skin)		   \\
//--v0.0.04 by Un1matr1x-----------------------[Beta]--\\
// + Name & Alliance selectable						   \\
//--v0.0.03 by Mikado--------------------------[Beta]--\\
// *http://userscripts.org/topics/28748#posts-132699*  \\
// + BR-Title selectable							   \\
// + open saved BR in a new Tab						   \\
//--v0.0.02 by Mikado-------------------------[Alpha]--\\
// + transmitting Username,... additional to the	   \\
//   sourcecode of the BattleRepport				   \\
//--v0.0.01 by dob-------------------------[preAlpha]--\\
// *http://userscripts.org/topics/28748#posts-132659*  \\
// + first version							  		   \\
//=====================================================\\

//====================Sprachauswahl=======================*/
var GameURL=location.href;
//==============Standartsprache festlegen=======================*/
var Sprache='de';
//====================Bild hinzufügen=======================*/
var button_image='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';
//====================Mögliche tld-s=======================*/
const tld = new Array('de','org','us','se','com.es','ro','cz','fr','it','onet.pl','com.tr','info','at','ru','dk');

for(var i=0 ; i<tld.length ; i++) {
	if ((GameURL.indexOf('ogame.'+tld[i],0))>=0) Sprache = tld[i];
	if ((GameURL.indexOf('durks.'+tld[i],0))>=0) Sprache = tld[i];
	if ((GameURL.indexOf('nonamegame.'+tld[i],0))>=0) Sprache = tld[i];
	if ((GameURL.indexOf('speed-game.'+tld[i],0))>=0) Sprache = tld[i];
}

//=================Spreache überprüfen=================\\
//alert(Sprache)
switch(Sprache) {
case 'org': Sprache='us'; break;
case 'info': Sprache='de'; break;
case 'at': Sprache='de'; break;
case 'com.es': Sprache='es'; break;
case 'onet.pl': Sprache='pl'; break;
case 'com.tr': Sprache='tr'; break;
}


var bez = {
/*=======================Deutsch=======================*/
de: {
button : 'KB Speichern',
name : 'Name:',
allianz : 'Allianz:',
titel : 'Titel:',
privat : 'Privater KB\n\n[OK] für Ja\n[Abbrechen] für Nein',
koord : 'Koordinaten\n\n[OK] = Anzeigen\n[Abbrechen]= Verstecken',
tech : 'Techniklevel\n\n[OK] = Anzeigen\n[Abbrechen]= Verstecken',
time : 'Kampfberichtszeit\n\n[OK] = Anzeigen\n[Abbrechen]= Verstecken',
update_avalible : 'Es ist ein Update für das Greasemonkey-Skript zum Speichern von KBs vorhanden.\nMöchtest du auf die Installationsseite?',
update_unavalible : 'Das Skript ist auf dem neuesten Stand.',
update_error : 'in Fehler ist aufgetreten, während der Suche nach Updates:\n'
},
/*=======================Englisch=======================*/
us: {
button : 'Store CR',
name : 'Name:',
allianz : 'Alliance:',
titel : 'Title:',
privat : 'privat CR\n\n[OK] for Yes\n[Cancel] for No',
koord : 'Coordinates\n\n[OK] = Show\n[Cancel]= Hide',
tech : 'Technologylevel\n\n[OK] = Show\n[Cancel]= Hide',
time : 'CombatReportTime\n\n[OK] = Show\n[Cancel]= Hide',
update_avalible : 'There is an update available for the Greasemonkey script to store CombatReports\nWould you like to go to the install page now?',
update_unavalible : 'Your script is up to date.',
update_error : 'An error occurred while checking for updates:\n'
},
/*=======================Spanisch=======================*/
es: {
button : 'Guardar RdB',
name : 'Nombre:',
allianz : 'Alianza:',
titel : 'Título:',
privat : 'privado RdB\n\n[Aceptar] para Si\n[Cancelar] para No',
koord : 'Coordenadas\n\n[Aceptar] = Visualizar\n[cancelar] = ocultar',
tech : 'nivel tecnico\n\n[Aceptar] = Visualizar\n[cancelar] = ocultar',
time : 'tiempo del Reporte de Batalla\n\n[Aceptar] = Visualizar\n[cancelar] = ocultar',
update_avalible : 'Hay una actualización para guardar el script de Greasemonkey BdRs disponible.  Te gustaría ir ahora a la página de instalar?',
update_unavalible : 'Tu script esta a nivel actual.',
update_error : 'Se produjo un error al comprobar las actualizaciones:\n'
},
/*======================Französisch=======================*/
fr: {
button : 'Sauvegarder le RC',
name : 'Nom:',
allianz : 'Alliance:',
titel : 'Titre:',
privat : 'RdC privé\n\n[OK] pour Oui\n[Cancel] pour Non',
koord : 'Coordonnées\n\n[OK] = Afficher\n[Cancel]= Cacher',
tech : 'Niveau des technologies\n\n[OK] = Afficher\n[Cancel]= Cacher',
time : 'Heure du RC\n\n[OK] = Afficher\n[Cancel]= Cacher',
update_avalible : 'Il y a une mise a jour disponible pour le script Greasemonkey de sauvegarde des RC.\nVoulez-vous aller à la page d\'installation maintenant ?',
update_unavalible : 'Votre script est à jour.',
update_error : 'Une erreur s\'est produite lors de la vérification de mises à jour:\n'
},
/*======================Italienisch=======================*/
it: {
button : 'Salva CR',
name : 'Nome:',
allianz : 'Alleanza:',
titel : 'Titolo:',
privat : 'CR privato\n\n[OK] per Si\n[Annulla] per No',
koord : 'Coordinate\n\n[OK] = Visualizza\n[Annulla]= Nascondi',
tech : 'Tecnologie\n\n[OK] = Visualizza\n[Annulla]= Nascondi',
time : 'Orario del Combat Report\n\n[OK] = Visualizza\n[Annulla]= Nascondi',
update_avalible : 'Non è disponibile un aggiornamento per il Greasemonkey script per salva CR\nVuoi andare alla pagina di installazione adesso?',
update_unavalible : 'Il tuo script è fino ad oggi.',
update_error : 'Si è verificato un errore durante il controllo per gli aggiornamenti:\n'
},
/*=======================Polnisch=======================*/
pl: {
button : 'Zapisz RW',
name : 'Nazwa:',
allianz : 'Sojusz:',
titel : 'Tytuł:',
privat : 'prywatny RW\n\n[OK] dla Tak\n[Zrezygnuj] dla Nie',
koord : 'Koordynaty\n\n[OK] = Pokaż\n[Zrezygnuj]= Ukryj',
tech : 'Poziom technologii\n\n[OK] = Pokaż\n[Zrezygnuj]= Ukryj',
time : 'CzasRaportuWojennego\n\n[OK] = Pokaż\n[Zrezygnuj]= Ukryj',
update_avalible : 'Istnieje aktualizacji dostępnych dla Greasemonkey skrypt do zapisz RW\nCzy chcesz przejść do strony zainstalować teraz?',
update_unavalible : 'Twój skrypt jest aktualne.',
update_error : 'Wystąpił błąd podczas sprawdzania dostępności aktualizacji:\n'
},
/*=======================Türkisch=======================*/
tr: {
button : 'Kaydet SR',
name : 'Isim:',
allianz : 'Ittifak:',
titel : 'Baslik:',
privat : 'Ozel SR\n\n[Tamam] için Evet\n[İptal] için Hayır',
koord : 'Koordinatlar\n\n[Tamam] = Goster\n[İptal]= Gizle',
tech : 'Teknoloji Seviyeleri\n\n[Tamam] = Goster\n[İptal]= Gizle',
time : 'Savas Raporu Zaman\n\n[Tamam] = Goster\n[İptal]= Gizle',
update_avalible : 'Bir güncelleştirme Greasemonkey betiği için kullanılabilir kaydet SR\nSize şimdi sayfası gitmek ister misiniz?',
update_unavalible : 'Script güncel olduğunu.',
update_error : 'Bir hata oluştu güncellemeleri kontrol:\n'
},
/*======================Schwedisch=======================*/
se: {
button : 'Spara KR',
name : 'Namn:',
allianz : 'Allians:',
titel : 'Titel:',
privat : 'privat KR\n\n[OK] för Ja\n[Avbryt] för Nej',
koord : 'Koordinater\n\n[OK] = Visa\n[Avbryt]= Gömma',
tech : 'Technologynivå\n\n[OK] = Visa\n[Avbryt]= Gömma',
time : 'KampRapportsTid\n\n[OK] = Visa\n[Avbryt]= Gömma',
update_avalible : 'Det finns en uppdatering tillgänglig för Greasemonkey script för att spara KR\nVill du gå till installera sidan nu?',
update_unavalible : 'Ditt script är aktuell.',
update_error : 'Ett fel uppstod vid att söka efter uppdateringar:\n'
},
/*======================Teschisch=======================*/
cz: {
button : 'Uložit BZ',
name : 'Jméno:',
allianz : 'Aliance:',
titel : 'Titulek:',
privat : 'soukromé BZ\n\n[OK] pro Ano\n[Zrušit] pro Ne',
koord : 'Souøadnice\n\n[OK] = Ukázat\n[Zrušit]= Skrýt',
tech : 'Technologický level\n\n[OK] = Ukázat\n[Zrušit]= Skrýt',
time : 'Èas bitevní zprávy\n\n[OK] = Ukázat\n[Zrušit]= Skrýt',
update_avalible : 'K dispozici je aktualizace k dispozici pro Greasemonkey skript pro uložit BZ\nChtěli byste jít na stránku nainstalovat nyní?',
update_unavalible : 'Váš skript je aktuální.',
update_error : 'Došlo k chybě při kontrole aktualizace:\n'
},
/*======================Rumänisch=======================*/
ro: {
button : 'Salvează RdL',
name : 'Nume:',
allianz : 'Alianta:',
titel : 'Titlu:',
privat : 'RdL privat\n\n[OK] pentru Da\n[Anulare] pentru Nu',
koord : 'Coordinate\n\n[OK] = Arata\n[Anulare]= Ascunde',
tech : 'Nivelul de tehnologie\n\n[OK] = Arata\n[Anulare]= Ascunde',
time : 'Data raportului de lupta\n\n[OK] = Arata\n[Anulare]= Ascunde',
update_avalible : 'Nu există o actualizare disponibilă pentru Greasemonkey script-ul pentru a salvează RdL\nDoriţi să mergeţi la pagina de instala acum?',
update_unavalible : 'Script-ul dvs. este până la data de.',
update_error : 'A apărut o eroare la verificarea de actualizări:\n'
},
/*=======================Danish=======================*/
dk: {
button : 'Store CR',
name : 'Navn:',
allianz : 'Alliance:',
titel : 'Titel:',
privat : 'privat CR\n\n[OK] for JA\n[Cancel] for NEJ',
koord : 'Kordinater\n\n[OK] = VIS\n[Cancel]= SKJUL',
tech : 'Teknologilevel\n\n[OK] = VIS\n[Cancel]= SKJUL',
time : 'KampReportTid\n\n[OK] = VIS\n[Cancel]= SKJUL',
update_avalible : 'Der er en update tilgængelig for Greasemonkey scriptet til at gemme CombatReports\nVil du gerne gå til installations siden nu?',
update_unavalible : 'Dit script er up to date.',
update_error : 'Der skete en fejl mens der blev tjekket for updates:\n'
	},
/*=======================Russian=======================*/
ru: {
button : 'Сохранить доклад',
name : 'Имя:',
allianz : 'Альянс:',
titel : 'Название:',
privat : 'Приватный доклад\n\n[ОК] = Да\n[Отмена] = Нет',
koord : 'Координаты\n\n[ОК] = Показать\n[Отмена]= Скрыть',
tech : 'Технологии\n\n[ОК] = Показать\n[Отмена]= Скрыть',
time : 'Дата/Время\n\n[ОК] = Показать\n[Отмена]= Скрыть',
update_avalible : 'Доступно обновление для скрипта, сохраняющего боевые доклады.\nПерейти на страницу установки?',
update_unavalible : 'Новых версий не найдено.',
update_error : 'Ошибка во время проверки обновлений:\n'
}
};

/*===================AutoUpdate-Check=======================*/

var SUC_script_num = 51558; // Change this to the number given to the script by userscripts.org (check the address bar)
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm(bez[Sprache].update_avalible))
								{
									GM_openInTab('http://kb.un1matr1x.de/viewforum.php?f=3');
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert(bez[Sprache].update_unavalible);
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert(bez[Sprache].update_error+err);
			}
		}
	}
	GM_registerMenuCommand('Manual Update Check 4 KB-Hosting', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}


/*=================KB Speicher Button==================*/
var link = document.createElement("a");
	link.setAttribute('style', 'position: fixed; top: 2px; right: 2px; padding: 4px; text-decoration:none; color:#f1f1f1;font: 12px Verdana,Arial,SunSans-Regular,Sans-Serif;text-align:center; background:url("data:image/gif;base64,' + button_image + '") no-repeat;height:29px;width:135px;');
	link.setAttribute('href', 'javascript:void(0);');
	link.textContent = bez[Sprache].button;
	link.addEventListener("click", function(e) {
//===========Button beim Übertragen entfernen==========
		e.currentTarget.parentNode.removeChild(e.currentTarget);
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://kb.un1matr1x.de/store_api.php",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
//=======Daten für die Übertragung, incl. Auswahl======
			data: "username=" + encodeURIComponent(prompt(bez[Sprache].name) || 'ScriptUser') + "&userally=" + encodeURIComponent(prompt(bez[Sprache].allianz) || '') + "&titel=" + encodeURIComponent(prompt(bez[Sprache].titel) || '') + "&privat_kb=" + (confirm(bez[Sprache].privat)?'true':'false') + "&time=" + (confirm(bez[Sprache].time)?'true':'false') + "&koord=" + (confirm(bez[Sprache].koord)?'true':'false') + "&tech=" + (confirm(bez[Sprache].tech)?'true':'false') + "&style=0&kb=" + encodeURIComponent(document.body.innerHTML),
			onload: function(e) {
//============KB nach dem Speichern öffnen=============
				//GM_log(e.responseText);
				GM_openInTab(e.responseText);
			}
		});
	}, false);

document.body.appendChild(link);