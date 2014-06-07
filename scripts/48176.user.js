// ==UserScript==
// @name           LA - AutoBank
// @namespace      Legendarena
// @include        *legendarena.com/
// ==/UserScript==

var username,PW,xmlhttp,a,b,t;

function logout() {
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET","logout.php",false);
	xmlhttp.send(null);
}

function bank (){
	
	xmlhttp=new XMLHttpRequest()
	xmlhttp.open("GET","stats.php",false);
	xmlhttp.send(null);
	
	a=xmlhttp.responseText.indexOf("Money")
	s=xmlhttp.responseText.substring(a,xmlhttp.responseText.length);
	b=s.indexOf(":");
	money=parseInt(s.substring(b+1,b+20));
				
	GM_xmlhttpRequest({
                    method: "POST",
                	headers: {'User-Agent':'Mozilla/4.0 (compatible) <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a>',
                			  'Accept':'application/atom+xml,application/xml,text/xml',
                			  'Content-Type':'application/x-www-form-urlencoded'},
                    url: "http://legendarena.com/clan.php?action=deposit",
                	data: "howmuch="+money,
                    onload: function(r) {
                        logout();
                    }
                });
}

function Login(){

GM_xmlhttpRequest({
                    method: "POST",
                	headers: {'User-Agent':'Mozilla/4.0 (compatible) <a href="https://addons.mozilla.org/en-US/firefox/addon/748">Greasemonkey</a>',
                			  'Accept':'application/atom+xml,application/xml,text/xml',
                			  'Content-Type':'application/x-www-form-urlencoded'},
                    url: "http://legendarena.com/login.php",
                	data: "name="+username+"&password="+PW,
                    onload: function(r) {
                        bank();
                    }
                });

t=(Math.floor(Math.random()*80)+40)*60*1000;
sas=window.setInterval(Login, t );
				
}


//insert UserName and Password
 username="XXXXXXXXX";
 PW="XXXXXXXX";
 

 var sas = window.setInterval(Login, 2400000 );