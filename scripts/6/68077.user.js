// ==UserScript==
// @name GmailDefaultClient
// @description Sets Gmail as default webmail client to handle the mailto protocol
// @author Charles
// @namespace http://www.adsweep.org
// @version 0.4
// @run-at document-start
// ==/UserScript==

/*

Opera users: Opera 10 can now set webmails as default handlers for the mailto protocol.
To do so, open C:\Program Files\Opera\defaults\webmailproviders.ini and add this:

[Gmail]
ID=3
URL=https://mail.google.com/mail?view=cm&tf=0&to=%t&cc=%c&bcc=%b&su=%j&body=%m
ICON=http://mail.google.com/mail/images/favicon.ico

Close Opera. Save using UTF-8 character set. Start Opera.
Then if you want, go to "Preferences > Advanced > Programs", double-click the mailto entry
and select Gmail from the list to set it as default webmail. If you don't do it, just
click a mailto link on a webpage, and Opera will ask you what email client or webmail you
want to use to handle this protocol. Choose Gmail from the list.

*/


GmailDefaultClient();

function GmailDefaultClient(){
		if(location.href){
			var ua=navigator.userAgent;
			if(ua.match(/Chrom(ium|e)|Iron/)){
				window.addEventListener("DOMContentLoaded", AddGmailDefaultClient, false);
			} else if(ua.indexOf("Gecko")!=-1) {
				window.addEventListener("load", AddGmailDefaultClient, false);
			} else if(ua.indexOf("Opera")!=-1) {
				document.addEventListener("DOMContentLoaded", AddGmailDefaultClient, false);
			}
		}
}

function AddGmailDefaultClient(){
	if(document.getElementsByTagName("A")){
		var anchorTags=document.getElementsByTagName("A");
		for(a=0;a<anchorTags.length;a++){
			for(var x=0;x<anchorTags[a].attributes.length;x++){
				if(anchorTags[a].attributes[x].nodeName.toLowerCase()=='href'){

					// Is it a "mailto" link?
					if(anchorTags[a].attributes[x].nodeValue.match(/^mailto:/)){

						// Create list of parameters for Gmail
						var queryString='';
						
						// Assume the link has only the recipient as parameter
						var newMessageValues=[anchorTags[a].attributes[x].nodeValue];

						// Does the link have more than 1 parameter?
						if(anchorTags[a].attributes[x].nodeValue.match(/\?|&/)){
							var newMessageValues=anchorTags[a].attributes[x].nodeValue.split(/\?|&/);
						}
						for(i in newMessageValues){
							if(typeof newMessageValues[i]=="string"){
								if(newMessageValues[i].match(/^mailto:/)){
									var to=newMessageValues[i].split(":");
									queryString+='to='+to[1]+'&'
								} else if(newMessageValues[i].match(/^bcc=/)){
									var bcc=newMessageValues[i].split("=");
									queryString+='bcc='+bcc[1]+'&'
								} else if(newMessageValues[i].match(/^cc=/)){
									var cc=newMessageValues[i].split("=");
									queryString+='cc='+cc[1]+'&'
								} else if(newMessageValues[i].match(/^subject=/)){
									var subject=newMessageValues[i].split("=");
									queryString+='su='+subject[1]+'&'
								} else if(newMessageValues[i].match(/^body=/)){
									var body=newMessageValues[i].split("=");
									queryString+='body='+body[1]+'&'
								}
							}
						}
						escape(queryString);
						anchorTags[a].setAttribute("onclick","function newWindow(mypage,myname,w,h,features) {var winl = (screen.width-w)/2;var wint = (screen.height-h)/2;if (winl < 0) winl = 0;if (wint < 0) wint = 0;var settings = 'height=' + h + ',';settings += 'width=' + w + ',';settings += 'top=' + wint + ',';settings += 'left=' + winl + ',';settings += features;win = window.open(mypage,myname,settings);win.window.focus();}window.open('https://mail.google.com/mail')");
						anchorTags[a].setAttribute("href","javascript:;");
						if(anchorTags[a].hasAttribute('target')){
							anchorTags[a].removeAttribute('target');
						}
					}
				}
			}
		}
	}
}