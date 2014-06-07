// ==UserScript==
// @name           ForumTidy
// @namespace      ForumTidy
// @version_timestamp        1242403641552
// @include        http://www.abrsm.org/forum/*
// ==/UserScript==


var ForumTidy={

	RemoveFluff:function() {
		var div=document.getElementById('header');
		div.parentNode.style.display = 'none';

		var i = document.getElementsByTagName('p');
		for(t=0; t<i.length; t++) {
			var bwtext = i[t].innerHTML;
			if (bwtext.indexOf("FORUMS RULES - A SNAPSHOT") != -1) {
				i[t].parentNode.style.display = 'none';
			}
		}
	}
};

var href=document.location.href;
window.addEventListener("load", function(e) {
	ForumTidy.RemoveFluff();
},false);
