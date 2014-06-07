// ==UserScript==
// @name            Q-Load.me Uploaded.to
// @description     Button für Q-Load in Uploaded einfügen
// @include         http://*uploaded.to/file/*
// @include         http://*uploaded.to/?id=*

tds = document.getElementsByTagName('td');
for(i=0;i<tds.length;i++){
	forms = tds[i].getElementsByTagName('form');
	for(i2=0;i2<forms.length;i2++){
		if(forms[i2].name=='download_form'){
			html2insert = '<form action="http://q-load.me/download" method="post"><input type="hidden" name="reqFile" value="'+document.location.href+'"><input type="submit" value="Q-LOAD!"></form>';
			tds[i].innerHTML = tds[i].innerHTML + html2insert;
		}
	}
}

// ==/UserScript==