// ==UserScript==
// @name           Przyciski tagow na forum Kwasowej Groty
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
		
		if (siteURL.indexOf('postAdd.php') > 1 ||
		    siteURL.indexOf('postEdit.php') > 1 ||
		    siteURL.indexOf('topicAdd.php') > 1) { //dodawanie postów
			var skrypcik_pomocniczy = document.createElement('script');
			skrypcik_pomocniczy.setAttribute("type", "text/javascript");
			skrypcik_pomocniczy.setAttribute("src", "http://ginden.boo.pl/ac_forum_b.js");
			var pole_tekstowe = document.getElementsByName("tresc")[0];
			pole_tekstowe.parentNode.insertBefore(skrypcik_pomocniczy, pole_tekstowe);
			var belka = document.createElement('div');
			belka.setAttribute('style', 'margin-bottom: 10px;');
			belka.innerHTML = temp;
			pole_tekstowe.parentNode.insertBefore(belka, pole_tekstowe);
		
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