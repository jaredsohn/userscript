// ==UserScript==
// @name           Needy Links (Non-replacing version)
// @namespace      shaldengeki
// @description    Adds "Needy Links", links that need votes. Written by shaldengeki.
// @include        http://endoftheinter.net/*
// @include        http://boards.endoftheinter.net/*
// @include        http://links.endoftheinter.net/*
// @include        https://endoftheinter.net/*
// @include        https://boards.endoftheinter.net/*
// @include        https://links.endoftheinter.net/*
// @include        http://archives.endoftheinter.net/*
// ==/UserScript==


var as=document.getElementsByTagName("a");

function goNeedy() {
	//if we're on the 'needy links' page, then redirect to a needy link.
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://links.endoftheinter.net/links.php?mode=as&s_aw=&s_ep=&s_ao=&s_wo=&s_to=0&t_t=2&t_f=&t_m=86400&v_t=1&v_f=&n_t=2&n_f=2&exclude=0&category=0&go=Search', 
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Needy Links Script',
		},
		onload: function(response) {
			//get a random linkid from this list.
			if (Math.random() >= .5) {
				var random_tr_class = 1;
			} else {
				var random_tr_class = 0;
			}
			var random_tr_index = Math.floor(Math.random()*26);
			var random_tr_location = response.responseText.indexOf('<tr class="r' + random_tr_class);
			for (var i = 1; i < random_tr_index; i++) {
				random_tr_location = response.responseText.indexOf('<tr class="r' + random_tr_class, random_tr_location+1);
			}
			var linkid = response.responseText.slice(response.responseText.indexOf('linkme.php?l=', random_tr_location)+13, response.responseText.indexOf('">', random_tr_location+15));
			window.location = "http://links.endoftheinter.net/linkme.php?l=" + linkid;
		}
	});
}

//replace random link with needy links link.
for(var x = 0; x < as.length; x++) {
	if (as[i].innerHTML=="Random link") {
		var s=document.createElement("span");
		s.innerHTML=" | <a href=''>Needy Links</a>";
		s.addEventListener("click", goNeedy, true);
		as[i].parentNode.appendChild(s);
		break;
	}
}