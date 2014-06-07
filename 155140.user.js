// ==UserScript==
// @name           MAL Relogin
// @include        http://myanimelist.net*
// ==/UserScript==

(function(){

	if(window.location.href != "http://myanimelist.net/login.php" && /problem keeping you logged in/.exec(document.body.innerHTML)){
		localStorage.setItem('url', window.location.href);
		window.location.href = "http://myanimelist.net/login.php";
	}

	if(window.location.href == "http://myanimelist.net/panel.php") {
		var url = localStorage.getItem('url');
		if(url !== null){
			localStorage.removeItem('url');
			if(url != window.location.href){
				window.location.href = url;
			}
		}
	}

})();
