// ==UserScript==

// @name           QTCU Disable Virtual Keyboard

// @namespace      http://fremnet.net/



// @description    Disables the virtual keyboard on QTCU

// @include        https://netteller*.tsw.com.au/*/ntv45.asp?*

// @include        https://netaccess*.qtcu.com.au/*/ntv45.asp?*



// ==/UserScript==



// Our callback for keypress



function dokeypress(e) {



	if (e.which==0) return true;



	if (e.which==8) return true;



	if (e.which==13) return true;



	if (e.which==32) return true;


	if (e.ctrlKey) return true;


	key='`1234567890-=qwertyuiop[]\\asdfghjkl;\'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?';



	n=key.indexOf(String.fromCharCode(e.which));

	c=unsafeWindow.skx.charAt(n);

	var field = e.target;
	if (field.selectionStart < field.textLength) {
		var selectionStart = field.selectionStart;
		var selectionEnd = field.selectionEnd;
		field.value = field.value.substring(0,selectionStart) + c + field.value.substring(selectionEnd);
		field.selectionStart = selectionStart + 1;
		field.selectionEnd = selectionStart + 1;
	} else {
		e.target.value += c;
	}


	e.preventDefault();



	return false



}







// Eradicate the annoying functions from the page.



unsafeWindow.kpinit = function() {}



unsafeWindow.defocus = function () {}



unsafeWindow.recallkp = function() {}







// Use their own scripting against them



ft = document.getElementsByTagName("INPUT");



for (var i=0; i<ft.length; i++){



	if (ft[i].type.toLowerCase() == "password"){



		// Clean it up...



		if (window.location.href.match('wci=entry') && ft[i].name=='PWD') {



			ft[1].parentNode.parentNode.parentNode.childNodes['2'].cells[0].innerHTML = 'Access Password:';



			ft[1].parentNode.parentNode.parentNode.deleteRow(2);



		}



		ft[i].removeAttribute('onfocus');



		ft[i].addEventListener('keypress',dokeypress,true);



	}



}


