// ==UserScript==
// @author 		Anudeep2011
// @name        CodeChef Solved Problems Marker
// @namespace   
// @include     *codechef.com*
// @version     beta
// @grant       none
// ==/UserScript==

var e = document.getElementById("user-bar");
var c = e.children[0];
if(c && c.className=='login-user') {
	var username = getLast(e.getElementsByTagName('a')[0].toString());
	setSeenList(username);
}

function setSeenList(username) {
	var http = new XMLHttpRequest();
	http.open('get','http://www.codechef.com/users/' + username.toLowerCase());
	http.onreadystatechange = Response;
	http.send(null);
	function Response() {    
		if (http.readyState == 4 && http.status == 200) {
			nextStep(http.responseText);
		}
	}
	function nextStep(html) {
		str = html.substring(html.search('Problems Successfully Solved'),html.search('Problems Solved'));
		var allproblems = document.getElementsByClassName('problemrow');
		for(var i=0;i<allproblems.length;i++) {
			var aobj = allproblems[i].getElementsByTagName('a')[0];
			if(str.search( '/'+getLast(aobj.toString())+',' )!=-1 ) {
				aobj.innerHTML = aobj.innerHTML + '&nbsp<img src="http://www.clker.com/img/thumbsup.png"/>';
			}
		}
	}
}

function getLast(s) {
	var ls=-1,lc=-1;
	for(var i=0;i<s.length;i++) {
		if(s[i]=='/') ls=i;
		if(s[i]==',') lc=i;
	}
	ls++;
	if(lc==-1) return s.substring(ls).toUpperCase();
	return s.substring(ls,lc).toUpperCase();
}