// ==UserScript==
// @name           zshare_ajaxbypasser
// @namespace      Emilio
// @include        http://www.zshare.net/download/*
// ==/UserScript==

(function () {

//Download accelerator & direct link generator
try{
	var req = new XMLHttpRequest();
	req.open('POST',window.location.href,true);
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if(req.status == 200)
			{
				//Get & clean form
				var dl_element = document.getElementsByTagName('form')[0];
				dl_element.innerHTML = '';
				//Parse the URL!
				eval('var link_enc='+req.responseText.split('var link_enc=')[1].split('link = ')[0]);
				//Generate new HTML on the fly
				var html_to_add = document.createElement('a');
				html_to_add.setAttribute('href',link_enc.join(''));
				html_to_add.innerHTML = '<img src="/images/download.gif" height="57" border="0" width="219" />';
				dl_element.appendChild(html_to_add);
				alert('Ready! Click Download to start downloading directly!');
			}else{
				alert('Error loading page');
  			}
		}
	};
	req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	req.send('download=1&imageField='); 
}catch(e){
	alert(e.message);
}

})();