// ==UserScript==
// @name           TriTrans search box add-in
// @namespace      Aspi
// @description    Adds the search box of TriTrans' main page to the search result pages.
// @include        http://*.tritrans.net/*
// @require        http://usocheckup.redirectme.net/98129.js?method=update
// @version        1.04
// ==/UserScript==

// ==ChangeLog==
// @history        1.04 Added index page manipulation
// @history        1.03 Added updater - usoCheckup
// @history        1.02 Added text input focus on page load
// @history        1.01 Added "remembering search language" feature
// @history        1.00 Initial release
// ==/ChangeLog==

(function(){
	//crt is short for "create"
	function crt(elm, typeparam, nameparam) {
		var a = document.createElement(elm);
		if (typeparam) {
			a.type = typeparam;
		}
		if (nameparam) {
			a.name = nameparam;
		}
		
		return a;
	}
	
	// If elms already exist (if is on index page), run one function.
	if (document.getElementsByName('spraak')[0]) {
		var choices = document.getElementsByName('spraak');
		
		// Loop through, and modify, input radio buttons and their "labels" (choice[i].nextSibling).
		for (var i = 0, l = choices.length; i < l; i += 1) {
			// Set id.
			var theId = choices[i].value;
			choices[i].id = theId;
			
			// Make their "labels" real labels.
			var oldLabel = choices[i].nextSibling, newLabel = document.createElement('label');
			// Copy previous attributes.
			for (var j = 0, m = oldLabel.attributes.length; j < m; j += 1) {
				newLabel.setAttribute(oldLabel.attributes[j].name, oldLabel.attributes[j].value);
			}
			// Copy previous value.
			newLabel.textContent = oldLabel.textContent;
			
			newLabel.setAttribute('for', theId);
			
			// Replace old with new.
			oldLabel.parentNode.replaceChild(newLabel, oldLabel);
		}
		
		
	// If elms doesn't exist (if is on search results page), run other function.
	} else {
		var container=crt('table'),
			ucontainer=crt('tr'),
			uucontainer=crt('th'),
			formelm=crt('form',null,'glose'),
			radio1=crt('input','radio','spraak'),
			span1=crt('label'),
			br1=crt('br'),
			
			radio2=crt('input','radio','spraak'),
			span2=crt('label'),
			br2=crt('br'),
			
			radio3=crt('input','radio','spraak'),
			span3=crt('label'),
			br3=crt('br');
			
			text1=crt('input','text','Fra'),
			submit1=crt('input','submit','button')
		;
		
		container.align='center';
		ucontainer.align='left';
		
		formelm.value='';
		formelm.method='get';
		formelm.action='http://www.tritrans.net/cgibin/translate.cgi';
		
		radio1.value='Engelsk';
		radio1.id='Engelsk';
		radio2.value='Spansk';
		radio2.id='Spansk';
		radio3.value='Norsk';
		radio3.id='Norsk';
		
		span1.innerHTML='From English';
		span1.setAttribute('for','Engelsk');
		span2.innerHTML='From Spanish';
		span2.setAttribute('for','Spansk');
		span3.innerHTML='From Norwegian';
		span3.setAttribute('for','Norsk');
		
		text1.id='Fra';
		
		submit1.value='Translate!';
		
		//atf is short for "add to form"
		function atf(elm){
			formelm.appendChild(elm);
		}
		
		atf(radio1);
		atf(span1);
		atf(br1);
		atf(radio2);
		atf(span2);
		atf(br2);
		atf(radio3);
		atf(span3);
		atf(br3);
		atf(text1);
		atf(submit1);
		
		uucontainer.appendChild(formelm);
		ucontainer.appendChild(uucontainer);
		container.appendChild(ucontainer);
		
		
		if(document.getElementsByTagName('p')[1]){
			document.getElementsByTagName('p')[1].appendChild(container);
			var radios=document.getElementsByName('spraak');
			switch(location.search.charAt(8)){
				case 'E':
					radios[0].checked=true;
					break;
				case 'S':
					radios[1].checked=true;
					break;
				default:
					radios[2].checked=true;
			}
			document.getElementById('Fra').focus();
		}
	}
}());