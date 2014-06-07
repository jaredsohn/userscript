// ==UserScript==
// @name           MikroTik
// @description    MikroTik Auto Login.
// @include        *10.9.5.1*
// ==/UserScript==


//the text that displays when not login.
wordBlock("Please log on to use the mikrotik hotspot service");
//wordBlock("");
function wordBlock(word){
if(document.body.innerHTML.indexOf(word) != -1){
Exist++;
}
}

if (Exist > 0) {
	document.sendin.username.value = 'clever';
	document.sendin.password.value = hexMD5('\161' + '12345' + '\230\070\075\254\047\342\020\322\374\203\005\377\377\022\243\163');
	document.sendin.submit();
	return false;
}

function doLogin() {
	document.sendin.username.value = document.login.username.value;
	document.sendin.password.value = hexMD5('\161' + document.login.password.value + '\230\070\075\254\047\342\020\322\374\203\005\377\377\022\243\163');
	document.sendin.submit();
	return false;
}