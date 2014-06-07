// ==UserScript==
// @name           Szeroko zmienione forum - przyciski, ostatnie posty, zmiany tytulow stron
// @namespace      ginden_tagi_przyciski
// @include        http://*forum.acidcave.net/*
// ==/UserScript==



addEventListener(window, 'load', testowanie); //dodajemy kod OnLoad
function testowanie() {
		var button_style= "font-weight: bold; width: auto; border: 1px solid white !important; padding-left: 3px; "+
		"padding-right: 3px; margin-left: 2px; margin-right: 2px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;"+
		"background-color: black; color: #FFFFAA; padding-bottom: 2px; padding-top: 2px;" +
		"-moz-box-shadow: 0px 0px 3px white; box-shadow: 0px 0px 3px white; -webkit-box-shadow: 0px 0px 3px white;";
		var temp = '<input class="tag_button ginden" value="B" style="'+ button_style + '" ' +
		'onclick="taguj(\'[b]\', \'[/b]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="I" style="'+ button_style + ' font-style: italic; " ' +
		'onclick="taguj(\'[i]\', \'[/i]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="U" style="'+ button_style + ' font-decoration: underline; " ' +
		'onclick="taguj(\'[f td=u]\', \'[/f]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="Cytat" style="'+ button_style + '" ' +
		'onclick="taguj(\'[q]\', \'[/q]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="S" style="'+ button_style + ' " ' +
		'onclick="taguj(\'[f td=t]\', \'[/f]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="Cytat=" style="'+ button_style + '" ' +
		'onclick="taguj(\'[q=]\', \'[/q]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="Kod" style="'+ button_style + '" ' +
		'onclick="taguj(\'[q=Kod][f c=white]\', \'[/f][/q]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="A" style="'+ button_style + '" ' +
		'onclick="taguj(\'[a]\', \'[/a]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="A=" style="'+ button_style + '" ' +
		'onclick="taguj(\'[a=\'+prompt(\'Podaj URL\')+\']\', \'[/a]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="Kolor" style="'+ button_style + '" ' +
		'onclick="taguj(\'[f c=\'+prompt(\'Podaj kolor\')+\']\', \'[/f]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="Obrazek" style="'+ button_style + '" ' +
		'onclick="taguj(\'[img]\', \'[/img]\')" type="button">';
		temp = temp + '<input class="tag_button ginden" value="URL to A" style="'+ button_style + '" ' +
		'onclick="url_to_a()" type="button">';
		var siteURL = document.URL;
		
		var AJAX_enabled = 1; //włączony AJAX
		var temp2;
		
		if (siteURL.indexOf('postAdd.php') > 1) {
			document.title = 'Dodawanie posta - Forum Kwasowej Groty';			
		}
		if (siteURL.indexOf('postEdit.php') > 1) {
			document.title = 'Edycja posta - Forum Kwasowej Groty';			
		}
		if (siteURL.indexOf('topicAdd.php') > 1) {
			document.title = 'Dodawanie tematu - Forum Kwasowej Groty';			
		}
		if (siteURL.indexOf('topicAdd.php') > 1) {
			document.title = 'Dodawanie tematu - Forum Kwasowej Groty';			
		}
		if (siteURL.indexOf('table.php') > 1) {
			temp2 = document.getElementsByTagName("table")[1].firstChild.nextSibling.firstChild.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.innerHTML;
			document.title = temp2 + ' - Forum Kwasowej Groty';			
		}
		if (siteURL.indexOf('topic.php') > 1) {
			temp2 = document.getElementsByTagName("table")[2].firstChild.nextSibling.firstChild.firstChild.nextSibling.innerHTML;
			temp2 = temp2.replace('			temat: ', '');
			document.title = temp2 + ' - Forum Kwasowej Groty';
			
			///html/body/table[3]/tbody/tr/td[2]
		}
		if (siteURL.indexOf('profile.php') > 1) {
			document.title = 'Zobacz profil - Forum Kwasowej Groty';
		}
		if (siteURL.indexOf('profileEdit.php') > 1) {
			document.title = 'Edytuj profil - Forum Kwasowej Groty';
		}
		if (siteURL.indexOf('postAdd.php') > 1 ||
		    siteURL.indexOf('postEdit.php') > 1 ||
		    siteURL.indexOf('topicAdd.php') > 1) { //dodawanie postów
			var skrypcik_pomocniczy = document.createElement('script'); //tworzymy skrypt
			skrypcik_pomocniczy.setAttribute("type", "text/javascript"); //javascript
			skrypcik_pomocniczy.setAttribute("src", "http://ginden.boo.pl/ac_forum_b.js"); //b, bo to skrypt b
			var pole_tekstowe = document.getElementsByName("tresc")[0]; //piersze pole tekstowe z tekstem. :P
			pole_tekstowe.parentNode.insertBefore(skrypcik_pomocniczy, pole_tekstowe); //wstawiamy przed, niezbyt wiadomo, czy kod sie nie bedzie zmienial itd.
			var belka = document.createElement('div'); //div
			belka.setAttribute('style', 'margin-bottom: 10px;'); //oddzielenie od dolu
			belka.innerHTML = temp; //temp po prostu.
			pole_tekstowe.parentNode.insertBefore(belka, pole_tekstowe);
			
			
			if (AJAX_enabled == 1) { //włączony AJAX działa!
				http_request = new XMLHttpRequest();
				http_request.onreadystatechange = function(){
					var AJAX_temp;
					var AJAX_temp4;
					var tekstowe_pole = document.getElementsByName("tresc")[0];
					AJAX_temp4 = tekstowe_pole.value;
					var AJAX_temp3 = document.getElementsByName("tresc")[0].parentNode.parentNode.parentNode;
					var AJAX_temp2 = document.getElementsByName("TID")[0].parentNode;
					if (http_request.readyState == 4) {
						
						AJAX_temp3.innerHTML =AJAX_temp3.innerHTML.replace(
									'http://img152.imageshack.us/img152/728/loaderpliku2.gif',
									'');
						
						var AJAX_text = http_request.responseText;
						AJAX_text = AJAX_text.substring(AJAX_text.indexOf('<table cellpadding="10" style="margin: 0px auto;">'),
										AJAX_text.indexOf('<table width="700" cellpadding="5" style="margin: 0px auto; border-top: solid 0px;">'));
						AJAX_text = AJAX_text.replace(/	/g, ''); // dla mnie, to trzeba chyba usunac...
						var AJAX_array = AJAX_text.split('<tr>', 7);
						AJAX_temp = 0;
						AJAX_text = '';
						while (AJAX_temp <= 7) {
							AJAX_text = AJAX_text+'<tr>'+AJAX_array[AJAX_temp];
							
							
							 
							AJAX_temp ++;
						}
						AJAX_temp = null;
						AJAX_temp = document.createElement('div');
						AJAX_temp.setAttribute('style', 'width: 845px; height: 300px; margin: 0px auto; overflow: auto; border: 3px solid gray;');
						 //formularz?
						
						AJAX_temp.innerHTML = '<table style="margin 0px !important; border: 0px !important;"><tr><td>'+AJAX_text+'</tr></td></table>';
						AJAX_temp2.parentNode.insertBefore(AJAX_temp, AJAX_temp2.nextSibling);
						document.getElementsByName("tresc")[0].value = AJAX_temp4;
						
					}
					if (http_request.readyState == 1) {
						
							if(AJAX_temp3.innerHTML.indexOf('loaderpliku') == -1) {
							       AJAX_temp3.innerHTML = '<img src="http://img152.imageshack.us/img152/728/loaderpliku2.gif" /><br />'
									+AJAX_temp3.innerHTML;
							       
							}
						
						
					}
					
				
				
				};
				http_request.overrideMimeType("text/html; charset=iso-8859-2"); /// kodowanie groty
				http_request.open('GET', 'http://www.forum.acidcave.net/topic.php?TID='+document.getElementsByName("TID")[0].getAttribute('value'), true);
				http_request.send(null);
			}
			
		}
		
		
	}
 
 
function addEventListener(element, eventName, callback, useCapture) {
	if (element.addEventListener) {
	  element.addEventListener(eventName, callback, useCapture || false);
	} else if (element.attachEvent) {
	  element.attachEvent('on' + eventName, callback);
	} else {
	  return false;
	}
	return true;
}