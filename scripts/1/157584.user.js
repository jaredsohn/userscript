// ==UserScript==
// @name          realDDB
// @description   Real DDB for jvc
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/avertir_moderateur.cgi?*
// @version       1.0
// ==/UserScript==
var inputs = document.getElementById('pseudo_pass').getElementsByTagName('input');
var data = "";
function ddb(data){
for (var i = 0; i < 50; i++) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', location.href, true);
	xhr.send(data);
};
}
for (var i = inputs.length - 1; i >= 0; i--) {
	data += inputs[i].name+'='+inputs[i].value+'&';
};
data += 'motif=Autre'
document.getElementsByName('submit')[0].onclick = function(e){e.preventDefault();if (confirm('MassDDB ?')){ddb(data);}}
