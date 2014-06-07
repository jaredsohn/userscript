// ==UserScript==
// @name			Usuwanie reklam z o2
// @description		Oprócz schowania bannerów dodaje przycisk do zaznaczania reklam przesłanych przez o2
// @include			http://poczta*.o2.pl/*
// ==/UserScript==
(function(){

function Check(){
	var mails = document.getElementById('maillist-table').getElementsByClassName('mail');
	for(i=0; i < mails.length; i++){
			var titles = mails[i].getElementsByTagName('td');
			var b = titles[1].getElementsByTagName('a')[0].innerHTML.replace(/^\s+|\s+$/g, "");
			var a = titles[1].title.replace(/^\s+|\s+$/g, "");
			if(a.indexOf(b) == 1 && a.split(b).pop().indexOf(' - prz') == 0)
				titles[0].getElementsByTagName('input')[0].checked = true;
	}
}
function MakeButt(){
	button = document.getElementById('contextnav-markasread');
	button.style.display = 'inline-block';
	button.id = 'contextnav-checkads';
	button.getElementsByClassName('label')[0].innerHTML = 'Zaznacz reklamy o2';
	button.addEventListener('click',Check,false);
	var css = document.createElement('style');
	css.type = 'text/css';
	css.innerHTML = '#adv-top,.ad-button,#adv-sidebar,#adv-sidebar-iframe-bottom,#mailbox-adv{display:none!important}';
	document.body.appendChild(css);
}
function Try(){
	if(document.getElementById('contextnav-actions-fieldset'))
		MakeButt();
}
Try();
})();