// -----------------------------------------------------
//
// ==UserScript==
// @name            Uploaded.to-Auto-download
// @namespace       Uploaded.to-Auto-download
// @description     Auto-download on uploaded.to
// @include         http://*uploaded.to*
// ==/UserScript==

	var Uri={
		uitlezen:function(id){
		var s=document.location.href.match('(?:\\?|\&)'+id+'=([^\&]*)');
		return s?unescape(s[1].replace(/\+/g,' ')):false}
	}

	function checkFirstPage() {

		var imageElems = document.getElementsByTagName('form');

		for (var i = 0; i < imageElems.length; i++) {
			if (imageElems[i].getAttribute('name') == 'download_form') {
				return true;
			}
		}
		return false;



		//if (document.forms["download_form"]) return true;
		//return false;
	}


	function sendForm() {
		var imageElems = document.getElementsByTagName('form');

		for (var i = 0; i < imageElems.length; i++) {
			if (imageElems[i].getAttribute('name') == 'download_form') {
				imageElems[i].submit();

				document.forms[0].innerHTML = '<input type="submit" value="Bezig...">';

			}
		}

	//		window.setTimeout("document.download_form.submit();", 1000);
	}

	function isError() {
		var imageElems = document.getElementsByTagName('div');

		for (var i = 0; i < imageElems.length; i++) {
			if (imageElems[i].getAttribute('class') == 'box_red') {
				return true;
			}
		}
		return false;
	}
	function getErrorBox(){
		var imageElems = document.getElementsByTagName('div');

		for (var i = 0; i < imageElems.length; i++) {
			if (imageElems[i].getAttribute('class') == 'box_red') {
				return imageElems[i];//.getAttribute('class');
			}
		}
		return false;
	}
/*
function Trim(str)
{  while(str.charAt(0) == (" ") )
  {  str = str.substring(1);
  }
  while(str.charAt(str.length-1) == " " )
  {  str = str.substring(0,str.length-1);
  }
  return str;
}*/

	function getErrorType(){
		var el=false;
		if(el=getErrorBox()){

			var imageElems = el.getElementsByTagName('div');

			for (var i = 0; i < imageElems.length; i++) {
				if (imageElems[i].getAttribute('style') == 'font-weight: bold;') {
					return imageElems[i].textContent;
				}
			}
			var regExp = /\s+/g;
			return el.getElementsByTagName('div').textContent.replace(regExp,'');
		}
		return false;
	}

	

	function setTitle(t){
		var currentTime = new Date()
		currentTime.setSeconds(currentTime.getSeconds()+t);
		//currentTime.setMinutes(currentTime.getMinutes()+t/60);
		var hours = currentTime.getHours()
		var minutes = currentTime.getMinutes()

		document.title='Refresh in: ' + t + ' seconds, on ' + hours + ':' + minutes;
	}


	function goBack(){
		document.location.href = 'http://www.uploaded.to/?id=' + Uri.uitlezen("id");

			//window.setTimeout("history.go(-1);", getErrorTypeTime()*1000);
	}

	function getErrorTypeTime() {
		if(isError()){
			var text=getErrorType();
			switch (text) {
				case "Your Free-Traffic is exceeded!":
					setTitle(5*60);
					return 5*60;
					break;
				case "Download failed!":
					setTitle(60);
					return 60;
					break;
				case "File doesn't exist (deleted by Admin-Panel or wrong ID).":
				case "Address Not Found":
					setTitle(99999*99999);
					return 99999*99999;
					break;
			}
		}
		return 99999*99999;
	}

		if (checkFirstPage()) {
			document.forms[0].innerHTML = '<input type="submit" value="Download will start...">';
			sendForm();

			return;
		}
		
		if (isError()) {
			window.setTimeout("goBack()", getErrorTypeTime()*1000);
		}