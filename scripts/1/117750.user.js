// ==UserScript==
// @author          ericxu
// @name            SMTH donate helper
// @namespace       SMTH donate helper
// @description     shows the party of specified donator
// @version         0.0.3
// @include         http://www.erepublik.com/en/economy/donate-money/*
// @include         http://www.erepublik.com/en/economy/donate-items/*
// ==/UserScript==
 function showparty(id)
 {
GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://api.erepublik.com/v2/feeds/citizens/'+id,
	headers: {
	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,
		"application/xml");
		var entries = dom.getElementsByTagName('party');
		var title;
		for (var i = 0; i < entries.length; i++) {
		title = entries[i].getElementsByTagName('name')[0].textContent;
		var insert=document.createElement("small");
		insert.textContent=title
		var insert2=document.createElement("small");
		insert2.textContent="Party:"+title;
		var sort=document.getElementsByTagName("small")
		var temp;
		for (i=0;i<sort.length;i++) {
			temp=sort[i].textContent.indexOf("Citizenship");
			if(temp!=-1){
				//sort[i].parentNode.insertBefore(insert,sort[i].nextSibling.nextSibling.nextSibling);
				sort[i].parentNode.insertBefore(insert2,sort[i].nextSibling.nextSibling.nextSibling);
			}
		}
		}
	}
});
}
var a=document.URL;
var b=a.split('/');
showparty(b[6]);