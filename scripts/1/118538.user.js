// ==UserScript==
// @name           Tatoeba Visual Linker
// @namespace      http://userscripts.org/users/61020
// @description    Put a sentence into your "shopping cart" to easily link it to another sentence later.
// @include        http://*.tatoeba.org/*
// @include        http://*.tatoeba.org/*
// @match          http://*.tatoeba.org/*
// @match          http://*.tatoeba.org/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @require        https://jquery-json.googlecode.com/files/jquery.json-2.2.js

// ==/UserScript==

$(document).ready(main);

function main(){
	
	// The Icon graphics included in this script can be found for free at http://www.famfamfam.com/lab/icons/silk/
	
	console.log('initializing');
	textfield_key = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFZSURBVDjL3ZM9S0JhGIbPH/APBEFQ7Q32gS0tlQ21iDVYJ/qAooaGliYRtKBBimrIwKSkooTGaiitFnvJjzLLPGXZCfVVRMWPo6ZwNzaZmlvDtT1cw831MACYWmD+gYAQglpgCCEoFot/glL6IygrKnwhYl1B6HwWcbepekHUbkCUzKGQIqCWCcQ5S+WC2MMRIlcsCgkjEm4VolYl3vaH4LkwViYImReQjx0iF1QiR7eQuFdC4FXg9H2VjRi5WUfatwzBP4MsPw/hfRQCJ4dD0wWGUopSBDzX4E+nETBPIullIbwMIOtTIPMsh0Mtxt3JbulAuM2WYd+2xCHwOmReZRC8PbCttqed6lbq0rTRA7ZB9muJHyapMxfcQdLVAeGpF/aNzoxO0Th+JqsTXbL1orIpfx5LST68hIy3H7Y1SUo/1jRS1S8QrXjx0dAdvtVK/HtTzYOl7r4BQSM7uFIKnq0AAAAASUVORK5CYII=';
	not_translation =		'data:image/png;base64,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';
	server_error =			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI4SURBVDjLpVPNaxNBFP9tNx9N0zW7ENRFE6ygpYaCNXrQkwWtFUUEc6hgD/0TxKsS1KOX4LlQEAUPfoAKpScDAcHUhI1VCr2kF4VWsRBCk93szPhmYqJt0pMLj8fMzu/jvTejCSHwP19g90a5XF7wff9Wq9UKUAZlFZ7nyfw8k8nc7EtQqVRiBJg3TTMTDg/BJRA4h/JHLi3LxNLS4gytegkcx5mW4Hg8figajaK6/g1SnXMBLjgRCTAic123fwl0eDGZTKqNRqOJFoFXKiUi4N24OHVZldGXQNYYCoVQq9XayozhROqkUhd/1GWz93QgmRmB5CE5FGm94ixTZkrdjv3CSNCHxs29HbR7JRSRJEiNn1LqEE0cFq9h2ZM4auZ7CAY6DjoEikQqs3btgUAe8cQ57LMnkDA2sPrq+pm+BF0w+9s4nf2AsfUFRtwEq71BYmIOzPXurTydDu4gkM3p3EjZODU+cmE0PuJIahZollF88gzDZgN+07tKca3HgZyCruuqbmk/7FWxPxaCYW2Du1Wqj4PVlzFy/o7mu+7D4uOzxr8OioVCAfV6HYZhYHAwgOHae5hJGuX2Z8I2kL4xCu59p39rODA+M+a73m2J1TrWc7ncFZrGfdu208fMTRqdhoPHI6RapPI8lF6uEskYND0GRC7h0/zdTcH5pLb7NWaz2akLVv7d6dmFoD6wDuFvyfns6LseGcXGVwdrbx+80Po95w+P0j8F40OyH0Lewm6Ibkb7dpZ+A2HofmbUgVesAAAAAElFTkSuQmCC';
	cart_delete =			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJ4SURBVDjLpZNLiFJRGMe/q1biA99UpqOilqALmYW6yM2MFLQtwU27bLbNLLSgidEethxcGLRTXIkbFyEYQlQu7qJNMD5AYXxcUZMRMhtf19s5NzRnExMdOPfAOff//f7fOd9HMAwD/zN4/ypIJpPMbDaD+XwOaL1PFAoF1sJisQCaps9M/NP6xEKj0QgOhwO63S6k0+kjHk7B5XKxgr+N6XQKqVSqbbPZ1LVaDbLZ7DEKGONhcrVaBaFQCK1WC9RqNdTrddBqtey+Xq+HSqUCJpMJJBKJutlsQqlUwgEfBAKBPM/tdhP5fJ4RCAQwGAyc6IDs9/vOyWRCIpvO8XhMdjoddm232+z+aDTC6VDYGQd/cH4ikQi7IDFZLBaTmIyIJCbLZDLSYrGAXC4nrVYrBmEHLawlls+YyWQYj8cD6FKh1+s5sRiTsZiiKKdSqSSRfadKpSIbjQaEQiFi5QAPZGm/WCyCwWBgyWazGaRSKUtWKBQkujzAQex2O6aviodYL6REIsEsn2vtrdmp6X6ByxQJvEEPRnwh8GfDJ7dy89fEeSqx4NMFxRp1+PqW9+IlgxVOv+ag+Ok9PSiXdtlKjMfjNxBlDxEfLonrDjZ/jGBzywv82geAjy9AIJGCXqfjnlSY3wFQTl6/378TjUZLSPAICQ+DweDh0kF+++WCf8VAwJ29Pz1wcBW4C0LPphCLxZ4i4XONRsMWEK60crm8cnHz6C1s370HwsY7mJx24CcKMPzOhXINqDN3EIlElo2yGw6HVw4++64dXBCL9jcUMw6P04Lhtzkcd7n0bMw8I87bzgXfxuPRSXuHSxM6mstQSPXmdm7+6heR5oijWAuHSQAAAABJRU5ErkJggg==';
	server_connect =		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKFSURBVDjLpVPfSxRRFP52Z3aXXdOd1V11NbYHUUQRtRIi38pCCQoi6KWX/oRefeq1t94TgyCJhKiHWgwki4pgU3YxonzQ1BXBrXHd2Z2Ze2fuTPdef0Sl9NDA5dyBc77vO+c7N+D7Pv7nU/+VsLCwcN913RuO46g8gkd5KKUiPgocpaBQKMR5wYSmadcikRgIL4LnQWbzmkRCw8xM9nAF+Xx+VBQnk8n2uro6rHzbgGD3PB+e73EgH4yDEUIOB+DJ2UwmI++WZcPhxYuFeQ7gHZwLF8dkG38BPHj9I1Ovr0PXdXR3d+8yM4ae3gHJ7u+xi9Z/UzD1Vo9Sh005O8Wx5mgUiqIgl8thYGBQSi/kczwyyc44YPrSlV8KOKvKJ1qIhAKdqtaCT8ub6EhUZIJQwJiH3r6Tkn1fhb83g6Ds06ZtFnE7Y2FACXhQm7rwfjWCdMcg5uZeIfviKZgcoodS/Qomy3fBRykJJEDVpO2E/3AgrJdqCCkewlobJp7NS8+Hhk5j+vFDuMzF5Nd7WC1tShUHLRiWlVICQM32OZiNrW0H8ZiK9IkOvFt8g/7qMhKNTcJ+3Gq6Da9RrIInwaWCHcPqog6BaTuomARGzcZSUUfZIIgeP4XsR4bh4XN7FvoyCjChQCk1Xw4bJplNaWGlwgvDXIqq8B0PBrhdDGsrJZztaUUmHZV2it7FRsbjDdylD1DLhlVtiAVDYkg1i2B9YwfGdg1W1YZdJWiMEIxc70cymZKS91e/tSUlHVLLVXM26IdGP383UCzqjlOzxxl1l5hNSy6lGyNnyr0vZ57f4cV9+49JxF172RfVNMyrlS3niWuR865Fj+Wmb9I/lnONn+xRr/UnsVG4KayFAQcAAAAASUVORK5CYII=';
	cart_add =				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJZSURBVDjLpVJda5JhGPYH9Ac66bSdFHTydtDhIAiCiA6CEbGiL1bUTgaO9pHk1+y11ymyNT/wYypMxzanqa8Km9PJxg5EJcWBJq7OzUHIRlfP/VQyKWLRCzcP78113dd1X8+jAKD4n/pngtfrhdPpxMLCAqxW6x1FLpcD1dbWFjY2NpBOpyHLMmKxGNbX17GysoJgMIhAIACPx8OxR0dHODg4gMlkKiuy2SyOj4/R7Xb/Wp1OBw6H41O73Ua1WoUkSQ2DwTCiyGQyvNFqtZDP59FsNkG9RqOBZDKJ/f19RCIRjgmFQiiXy9zRzMzMYC+DVCqF7e1tRKNRYXNzE8vLywKRFxcXBVrDZrMJRDabzYLP5+P7q9Xqgd6AeDyOYrHIM6jX6zwDUiZypVLpKbOBKBQKpI6pqakzfbewurqKw8NDJBIJsKSFcDhMSgLZZWEJRNbpdILdbicyfrtGBpzY3d1FrVYDkUl5aWkJpVKJBnJltgr29vagVCq//fEduN1uShrz8/OwWCyUNFjS0Gg0UBqe44VlCI/e3sDQ60FcU16cOPVDeiLdfKUK3kOkbEXhswwpOYLb0gVcfnpW5ACXy3We2Xs3NzdHScNoNEKv11PSmJ6exl3dVayVTFj7YKbdIaYeQko9pgFf+QAWFrczOzs7KoriR0YePeng+stLeF+24+QXLlppwA8Ae9MTLGl+XTs7O/D7/Tzp8fFxjI2N4cqzc3gj34dOHuZkXWK438Gv0mq1UKlUmJyc7HPAgOpb4gCM8gOuTCf99zI4TTGwntUXsv3z1FP/O6UL4ZoSeea0AAAAAElFTkSuQmCC';
	cart_remove =			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4y5WSTUjTYRzH16VLRgSRl24FdbCDl/9FjF7oEOGhg52CQlLWH8TNl7nl5hq4F9/Sbcpe1ZnbwL3gJglzKP7nNs01y9xgY4EpeuskDEJ8+fY8z0FaTqLDjwd+z+/7/f2ez/MTARCVi9r+qxeeRSpQ67mePq+GxrkXbxZvHY8kX0O/9BLVlivCfxlohBpMfJJgMR9A6NsEZB/rcbf/soveTU1NYXx8HHa7HaOjoy9EyWQSNOLxOARBwHvhMaY/KxErzMC/boIz8Q7elBm8/ymq9ZWs9vDwEHt7exgeHs6KEokEjo6OcHBwwMK4VA9dtA4WgUck60Zw3Q7e9wD3Rq6hSnvpeH9/H/l8HkNDQz/6+vp40fLyMkvs7u5idXUVOzs7oDlFuIYYfMDMVxueWCtZTSAQQDabhd/vR29v76NTBgsLC1hZWcHc3BwXi8UQDAa5t8H7iGRcCH2xoc5645iKTSYT5/F42Pt7enrunBpEIhFsbm4yBltbW4hGo5AHHkI6XYNXrio8d9xknd1uNzY2Nmh3dHd3V5T8QigUQrFYxPz8PAhpbnZ2lnbi6LgEFkfFer2eczqdVIwz30gKlalUCoVCAVScy+Xg8/mQyWSoIevscDiQTqchl8tPyu7B5OQkxsbGYLVaYTabKWkQ0tBqtdBoNFCr1QiHw2hvbz/55yaWi87OzottbW1oaWn5WWLgcrluk/FsFouFksbg4CAMBgMlzbp2dXVBJpOhtbWVvZ3n+WKJAYGlpKfRaJQMDAxsE7Hk7+5SqVTS3Ny8TcSSpqamXyUGZKeVhDRblLW1NXi9XkZaoVCgo6MDRAybzcbWmNSioaHhe1kGOp2OwVKpVGcmEIvFksbGRirGn/nfGF/N1BNy810AAAAASUVORK5CYIIK';
	cart_error =			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKoSURBVDjLpZLbT5JhHMdZ1/VP1Cqrtco21kU3zevWVa3NXOuuedVmoU2jUR6CoRwcw1SYHIzJQQxBUXgLXg6Ga+mIwkBBBp08pYGvEOa393nbWC5Xa1389mzPnu/v+/t+nh8PAO9/6p8FBoMBWq0Wvb29UKlU13ihUAikAoEAfD4fKIrC5OQkxsfHMTo6CrvdDovFApPJBL1ez70tl8vI5XKQy+UxXjAYxPb2Nkql0h8rn89Do9G839jYwNzcHGQyWVoikdTzaJrmLrLZLKamppDJZEDu0uk0PB4PkskknE4n98ZqtSIWi3ETicXimgoDr9eLcDgMl8vF9/v9sNlsfCI2Go18EqOvr49PxEqlkj84OMjlb21trao0cLvdiEajHINUKsUxIM5EHI/HQTmUmKcFGHqixezsLHGHUCjcv+sXRkZGUCgUMDExAZY03+FwECf+sNWEhLs2vZq0YMZeZ+zv7ydi/PaNbK6W6elpJBIJEDFxNpvNiIdUWI4bUS7M4/XwFbwKO9DU1LSz5x7odDpCGj09Peju7kafqg1R62UUl50ofujC2oILkaGbENxp2PnrIr21Xdr3xnzRsPLOimL2AehHZ/Ft1YoZbQ1kwutfdzUYGBg4ypJ+rFarCWl0dnZCIxcgTTWjtKQHM38DdMcZbGUasZ4ag6frwveI4tyBSgMWVgs5FQrFLalUuigVtzWwTi+/sOC2Fm9jM3H1ZyXr2ChyZPxKhCTVwkoDdqdb2LXkFiUSiWBM14wM3YXSJzXnvpmsZSNUcyeTqgfz8Snohyc/+0Unju/K3d7eDpFIhJD8/DqzsoDSGoXiEstgyfJL2VDOx5B7YcSz5iOWPQGy460EO04zgbZTDOvEsE6M7/4x5vm9KoYVMdTdwwzVeIjxCg4GfgDxYPxXmKLFvgAAAABJRU5ErkJggg==';
	direct_translation =	'/img/direct_translation.png';
	textfield_add =			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADTSURBVDjLY/j//z8DJZhhGBhw8uTJ/5RgsAF//vwhC7948QJhADkGDTEDtp9c+790ZsL/tD7//4ldXv+X7pmBagA+vOnosv+NqxP/b7ky9f+FZ7v+9+/O+h/er/u/fXHZfwaQKYRwYpfn/42XJ/zfeG3SfxDo2ZP6v39P+n/bfHniEotPteH/bVfm/EcGmy5N/W+eLUmcAZY50t+7dyX9b9+VANbcvjMB7AKgAd+JMgCosCW4R+N/764UsM0gGsQHivcQneaBijuA+BPI2VC6AyQOAPdpPzVHO/APAAAAAElFTkSuQmCC';
	indirect_translation =	'/img/indirect_translation.png';
	
	default_shopping = {};
	default_shopping = $.toJSON(default_shopping);
	
	//BEGIN USER STATS
	shopping = GM_getValue('shopping');
	shopping = shopping || default_shopping;
	shopping = $.evalJSON(shopping);
	console.log('shopping: '+$.toJSON(shopping));
	
	automatically_numeric = GM_getValue('automatically_numeric');
	automatically_numeric = automatically_numeric || false;
	
	setup = false;
	if(window.location.href.split('/')[4] == 'user' && window.location.href.split('/')[5] == 'profile' && window.location.href.split('/')[6] == $('.menuSection').attr('href').split('/')[4]){
		setup = true;
		
		if($('.userscriptSettings').is('*')){
			settings = $('.userscriptSettings');
		}
		else{
			settings = $('<div class="module profileSummary userscriptSettings"><h2>userscripts</h2></div>');
			$('.profileSummary').after(settings);
		}
		
		settings.append('<h3>Visual Linker</h3>');
		contentdiv = $('<form id="visuallinker"></form>');
		settings.append(contentdiv);
		
		contentdiv.append('<table>');
		contentdiv.append('<tr><td><label for="delete" class="field">delete list</label></td><td><input type="button" id="shopping" value="delete list" '+( shopping==default_shopping ? 'diabled="disabled"' : '' )+'"></td></tr>');
		contentdiv.append('</table>');

		$('#shopping').click(function(){
			if(confirm("Really delete the whole shopping cart?")){
				shopping = $.evalJSON(default_shopping);
				GM_setValue('shopping',$.toJSON(shopping));
				console.log('shopping: '+$.toJSON(shopping));
			}
		});
	}
	else{
		
		interface_lang = $('#languageSelection option[selected="selected"]').val();
		
		cart_button_add =    $('<a class="audioButton cartButton notincart" style="background-image:url('+cart_add+');    background-repeat: no-repeat;background-position: center center; float: right; margin: 0.5em 0;" title="Add this sentence to the \'shopping cart\'."></a>');
		cart_button_remove = $('<a class="audioButton cartButton    incart" style="background-image:url('+cart_delete+'); background-repeat: no-repeat;background-position: center center; float: right; margin: 0.5em 0;" title="Remove this sentence from the \'shopping cart\'."></a>');

		empty_cart_button = $('<li class="option tocart"><a title="Click to remove all items from the whole shopping cart."><img width="16" height="16" src="'+cart_remove+'"></a></li>');
		
		empty_cart_button.click(function(event){
			event.preventDefault();
			if(confirm("Really delete the whole shopping cart?")){
				shopping = $.evalJSON(default_shopping);
				GM_setValue('shopping',$.toJSON(shopping));
				console.log('shopping: '+$.toJSON(shopping));
				
				$('.sentences_set').each(function(){
					showcart($(this));
				});
			}
		});
		
		$('.sentences_set ul.menu .option.addToList').before(empty_cart_button);
		
		numeric = $('<li class="option numeric"><a title="Click to toggle sentence number input field. (Double-click to always show the input field.)"><img width="16" height="16" src="'+(automatically_numeric ? textfield_key : textfield_add)+'"></a></li>');
		
		numeric.click(function(event){
			if(!$(this).parentsUntil('.sentences_set').parent().find('.cart #cart_0').is('*')){
			
				add_numeric = $('<div class="sentence indirectTranslation" id="cart_0"><a class="show button" title="Not yet linked to main sentence (click to go to this sentence)"><img width="18" height="16" src="'+not_translation+'"></a><!-- a style="background-image:url('+cart_delete+'); background-repeat: no-repeat;background-position: center center;" class="audioButton cartButton" alt="0" title="Remove this sentence from the \'shopping cart\'."></a--><a class="link button" title="Fetch sentence from server by number. Type the sentence\'s number into the textfield and hit the [enter] key."><img src="'+server_connect+'"></a><!--img width="30" height="20" src="http://flags.tatoeba.org/img/flags/unknown.png" class="languageFlag" alt="unknown" title="The language of the sentence cannot be known yet." --><a class="sentenceContent text"><input type="number" min="1" size="10" title="Fetch sentence from server by number. Type the sentence\'s number into the textfield and hit the [enter] key."></a></div>');
				
				$(add_numeric).find('input').keypress(function(event) {
					if ( event.which == 13 ) {
						event.preventDefault();
						id = $(this).val();
						console.log(id);
						$(add_numeric).find('.link.button img').attr('src', 'http://flags.tatoeba.org/img/loading-small.gif');
						if(typeof(shopping[id])=='undefined'){
							imtheget = $.get(
								'http://tatoeba.org/sentences/show/'+id,
								function(data) {
									if($(data).find('.sentences_set').is('*')){
										console.log(data);
										lang = $(data).find('.sentences_set .mainSentence .languageFlag').attr('src');
										cont = $(data).find('.sentences_set .mainSentence .sentenceContent').removeAttr('href').html();
										audio = $(data).find('.sentences_set .mainSentence .audioButton').attr('href');
										
										add_to_cart(id, {lang:lang, cont:cont, audio:audio});
									}
									else{
										$(add_numeric).find('.link.button img').attr('src', server_error);
									}
								}
							).error(function(){
								$(add_numeric).find('.link.button img').attr('src', server_error);
							});
						}
						else{
							$(add_numeric).find('.link.button img').attr('src', cart_error);
						}
						
					}
				});
				
				$(add_numeric).find('.link.button img').click(function(){
					id = $(add_numeric).find('input').val();
					console.log(id);
					$(add_numeric).find('.link.button img').attr('src', 'http://flags.tatoeba.org/img/loading-small.gif');
					if(typeof(shopping[id])=='undefined'){
						imtheget = $.get(
							'http://tatoeba.org/sentences/show/'+id,
							function(data) {
								if($(data).find('.sentences_set').is('*')){
									console.log(data);
									lang = $(data).find('.sentences_set .mainSentence .languageFlag').attr('src');
									cont = $(data).find('.sentences_set .mainSentence .sentenceContent').removeAttr('href').html();
									audio = $(data).find('.sentences_set .mainSentence .audioButton').attr('href');
									
									add_to_cart(id, {lang:lang, cont:cont, audio:audio});
								}
								else{
									$(add_numeric).find('.link.button img').attr('src', server_error);
								}
							}
						).error(function(){
							$(add_numeric).find('.link.button img').attr('src', server_error);
						});
					}
					else{
						$(add_numeric).find('.link.button img').attr('src', cart_error);
					}
				});
			
				$(this).parentsUntil('.sentences_set').parent().find('.cart').append(add_numeric);
				
			}
			else{
				$(this).parentsUntil('.sentences_set').parent().find('#cart_0').remove();
			}
			event.preventDefault();
		});
		numeric.dblclick(function(event){
			event.preventDefault();
			automatically_numeric = !automatically_numeric;
			
			GM_setValue('automatically_numeric',automatically_numeric);
			console.log('automatically_numeric: '+automatically_numeric);
			
			$(numeric).find('img').attr('src', (automatically_numeric ? textfield_key : textfield_add) );
			$(this).parentsUntil('.sentences_set').parent().find('#cart_0').remove();
			$(numeric).click();
		});
		$('.sentences_set ul.menu .option.addToList').before(numeric);
		
		function showcart(sentences_set){
			
			if($(sentences_set).find('.cart').is('*')){
				cart = $(sentences_set).find('.cart');
				$(cart).empty();
			}
			else{
				cart = $('<div class="translations cart"></div>').css({'border-top':'1px dashed #CCCCCC'});
				$(sentences_set).find('.translations').after(cart);
			}
			
			chief_sentence = $(sentences_set).attr('id').split('_').reverse()[0];
			
			directs = $(sentences_set).find('.directTranslation').map(function(){
				return $(this).attr('id').split('_')[1];
			});
			
			indirects = $(sentences_set).find('.indirectTranslation').map(function(){
				return $(this).attr('id').split('_')[1];
			});
			
			$.each(shopping,function(id, value){
				lang = shopping[id]['lang'];
				cont = shopping[id]['cont'];
				audio = shopping[id]['audio'];
				
				isself = (id==chief_sentence);
				isdirect = ($.inArray(id, directs)>=0 ? true : false);
				isindirect = ($.inArray(id, indirects)>=0 ? true : false);
				
				sentence_in_basket = $('<div id="cart_'+id+'" class="sentence'+(isself ? ' mainSentence':(isdirect ? ' directTranslation': ' indirectTranslation'))+'"></div>');
				sentence_in_basket.data({id:id, lang:lang, cont:cont, audio:audio});
				
				if(!isself){
					image = (isdirect ? direct_translation : (isindirect ? indirect_translation: not_translation));
					sentence_in_basket.append('<a class="show button" href="/sentences/show/'+id+'" title="'+ (isdirect ? 'Already' : (isindirect ? 'Indirectly': 'Not yet')) +' linked to main sentence (click to go to this sentence)"><img width="18" height="16" src="'+image+'"></a>');
					
					if(!isdirect){
						sentence_in_basket.append($('<a class="add link button" href="/'+interface_lang+'/links/add/'+chief_sentence+'/'+id+'" title="Link this sentence to the main sentence."><img width="16" height="16" src="http://flags.tatoeba.org/img/link.png"></a>').data('sentenceId', chief_sentence).data('translationId', id));
					}
					else {
						sentence_in_basket.append($('<a class="delete link button" href="/'+interface_lang+'/links/delete/'+chief_sentence+'/'+id+'" title="Unlink this sentence from the main sentence."><img width="16" height="16" src="http://flags.tatoeba.org/img/unlink.png"></a>').data('sentenceId', chief_sentence).data('translationId', id));
					}
				}
				
				if(!$(sentences_set).parent().is('.sentenceInList')){
					audio = audio | false;
					audiotrue = (audio ? audio.split('.').reverse()[0]=='mp3' : false);
					audioURL = audio;
					sentence_in_basket.append('<a onclick="return false;" class="audioButton '+(audiotrue? 'audioAvailable': 'audioUnavailable')+'" href="'+audio+'"></a>').click(function(){
						// this is copied from sentences.playaudio.js
						$('#audioPlayer').html(
							'<object data="'+ audioURL +'" type="audio/mpeg" data="'+ audioURL +'" width="0" height="0">'+
							'<param name="src" value="'+ audioURL +'" />' +
							'<object '+
								'type="application/x-shockwave-flash" '+
								'data="http://static.tatoeba.org/dewplayer-mini.swf?autostart=1&amp;mp3='+audioURL +'" '+
								'width="0" '+
								'height="0" '+
							'>'+
							'<param name="movie" value="http://static.tatoeba.org/dewplayer-mini.swf?autostart=1&amp;mp3='+audioURL +'" />'+
							'</object>'+
							'</object>'
						); 
					});
				}
				
				sentence_in_basket.append(cart_button_remove.clone());
				
				sentence_in_basket.append('<img width="30" height="20" alt="'+lang+'" class="languageFlag" src="'+lang+'">');
				sentence_in_basket.append($('<a href="/sentences/show/'+id+'" class="sentenceContent"></div>').append($(cont).removeClass('editableSentence')));
				cart.append(sentence_in_basket);
			});
		}
		function add_to_cart(id, object){
			// reload the shopping cart so we can use it across tabs
			shopping = GM_getValue('shopping');
			shopping = shopping || default_shopping;
			shopping = $.evalJSON(shopping);
			
			shopping[id] = {lang:lang, cont:cont, audio:audio};
			GM_setValue('shopping',$.toJSON(shopping));
			console.log('shopping: '+$.toJSON(shopping));
			
			$('.sentences_set').each(function(){
				showcart($(this));
				if(automatically_numeric){$(this).find('.numeric').click();}
			});
		}
		
		function remove_from_cart(id){
			// reload the shopping cart so we can use it across tabs
			shopping = GM_getValue('shopping');
			shopping = shopping || default_shopping;
			shopping = $.evalJSON(shopping);
			
			console.log(id);
			delete shopping[id];
			GM_setValue('shopping',$.toJSON(shopping));
			console.log('shopping: '+$.toJSON(shopping));
			
			$('.sentences_set').each(function(){
				showcart($(this));
				if(automatically_numeric){$(this).find('.numeric').click();}
			});
		}

		$('.sentences_set').each(function(){
			showcart($(this));
			if(automatically_numeric){$(this).find('.numeric').click();}
		});

		$('.sentences_set .translations:not(.cart) .sentence, .sentences_set > .mainSentence').each(function(){
			id = $(this).find('.languageFlag').attr('id').split('_').reverse()[0];
			lang = $(this).find('.languageFlag').attr('src');
			cont = $(this).find('.sentenceContent').removeAttr('href').html();
			audio = $(this).find('.audioButton').attr('href');
			incart = typeof(shopping[id]) == 'object';
			$(this).data({id:id, lang:lang, cont:cont, audio:audio});
			$(this).addClass('id'+id);
			$(this).find('.languageFlag').before((incart ? cart_button_remove.clone() : cart_button_add.clone()));
		});

		$('.sentences_set').on('click', '.cartButton', function(event){
			data = $(this).parentsUntil('sentence').data();
			id = data['id'];
			lang = data['lang'];
			cont = data['cont'];
			audio = data['audio'];
			incart = typeof(shopping[id]) == 'object';
			if(incart){
				remove_from_cart(id);
				$('.sentences_set .sentence.id'+id+' .cartButton').replaceWith(cart_button_add.clone());
			}
			else{
				add_to_cart(id, {lang:lang, cont:cont, audio:audio});
				$('.sentences_set .sentence.id'+id+' .cartButton').replaceWith(cart_button_remove.clone());
			}
		});
		
		//Below is an adaption of original code from Tatoeba, as greasemonkey cannot (to my knowledge) interact with the code from the page itself
		
		/**
		 * Tatoeba Project, free collaborative creation of multilingual corpuses project
		 * Copyright (C) 2011  HO Ngoc Phuong Trang <tranglich@gmail.com>
		 *
		 * This program is free software: you can redistribute it and/or modify
		 * it under the terms of the GNU Affero General Public License as published by
		 * the Free Software Foundation, either version 3 of the License, or
		 * (at your option) any later version.
		 *
		 * This program is distributed in the hope that it will be useful,
		 * but WITHOUT ANY WARRANTY; without even the implied warranty of
		 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		 * GNU Affero General Public License for more details.
		 *
		 * You should have received a copy of the GNU Affero General Public License
		 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
		 */
		 
		 //http://tatoeba.org/js/links.add_and_delete.js
	 
		$(".cart .link").click(function(event){ //modified by Jakob
			event.preventDefault();//modified by Jakob
			
			var sentenceId = $(this).data("sentenceId");
			var translationId = $(this).data("translationId");
			var rootUrl = 'http://tatoeba.org/';
			var image = $(this);
			var action = null;
			
			if ($(this).hasClass("add")){
				var action = 'add';
				var newAction = 'delete';
				var removeClass = "indirectTranslation";
				var addClass = "directTranslation";
				var newType = "direct";
			} else if ($(this).hasClass("delete")){
				var action = 'delete';
				var newAction = 'add';
				var removeClass = "directTranslation";
				var addClass = "indirectTranslation";
				var newType = "indirect";
			}
			
			if (action != null) {
				// Show the loading gif...
				$(this).html(
					"<img src='/img/loading-small.gif' alt='loading'>"
				);
				
				// Send request...
				$.get(
					rootUrl + interface_lang + "/links/"+action+"/"+sentenceId+"/"+translationId,
					function(data) {
						var elementId = "#translation_"+translationId+"_"+sentenceId;
						var cartId = "#cart_"+sentenceId;
						
						// Update the link or unlink image
						image.html(data);
						image.removeClass(action);
						image.addClass(newAction);
						
						// update the class of the sentence and the arrow
						$(elementId).removeClass(removeClass);
						$(elementId).addClass(addClass);
						$(elementId+" .show img").attr(
							'src', '/img/'+newType+'_translation.png'
						);
						$(elementId+" .link").html(data);
						
						$(image).parent().removeClass(removeClass);
						$(image).parent().addClass(addClass);
						$(image).parent().find(" .show img").attr(
							'src', '/img/'+newType+'_translation.png'
						);
						$(image).html(data);
					}
				);
			}
		});
	}
}