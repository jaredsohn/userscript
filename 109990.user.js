// ==UserScript==
// @name           linki do facebooka
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/out/users_info.php?user_id=*
// ==/UserScript==

var $ = unsafeWindow.$;

$("div.album div:odd").each(function(){
	var match = this.innerHTML.match(/\d+_\d+_(\d+)_\d+_\d+.*jpg/	);
	if(match){
		var id = match[1];
		this.innerHTML = this.innerHTML.replace(match[0], 
			"<a href='http://www.facebook.com/profile.php?id="+match[1]+"'>"+match[0]+"</a>"
		);
	}
});