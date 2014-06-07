// ==UserScript==
// @name           Test
// @description    Test
// @include        https://secure.mpfrance.fr/*
// @version        1.0
// ==/UserScript==




var serverUrl = "http://localhost:8080/mail/";

var recipient = "cyril.auburtin@gmail.com";

var keyword="protection";

//https://secure.mpfrance.fr has already a refresh interval somewhere; //todo check its interval

var rf = document.getElementsByName("rightFrame");
if (rf.length>0){
	var doc = frame.contentDocument;
	var t=doc.getElementById("gvPub");
	if (t){
		var els = t.getElementsByClassName("FaxlistDetailVisited");
		var ids=[];
		for (var i=0; i<els.length; i++){
			var el = els[i];
			var id =el.href.match(/nr=(\d+)/)[1];
			
			parseMessage(id)
		}
		console.log(ids);
		
		
		
		
		
	}
}


function parseMessage( id){

	var ajax = new XMLHttpRequest();
	if (ajax){
		try {
			ajax.open('GET', 'https://secure.mpfrance.fr/entpubsshowtender.aspx?nr=' + id);
            ajax.onload = function() {
            	console.log(this.responseText);
            	var parser = new DOMParser();
            	var doc = parser.parseFromString(this.responseText, "text/html");
            	
            	if(this.responseText.indexOf(keyword)!==-1){
            		//sendMailByServer(recipient, id, title, message);
            	}
            	
            }
            ajax.send();
        } catch(fail) {
        	console.log(fail)
        }
	}
}

function sendMailByServer( id, title, message){

	var ajax = new XMLHttpRequest();
	if (ajax){
		try {
			ajax.open('GET', serverUrl+'sendmail.php?to=' + encodeURIComponent(recipient)+ '&message=');
			ajax.onreadystatechange = function() {
                if(this.readyState === 4) {
                    if(this.status < 200 || this.status >= 400) {
                        // The request failed; fall back to e-mail client
                        window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
                    }
                }
            }
			ajax.send();
        } catch(fail) {
            // Failed to open the request; fall back to e-mail client
            window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
        }
	}
}