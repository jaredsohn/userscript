// ==UserScript==
// @name           MailXtra
// @namespace      Jan-Frederik Leissner
// @description    Verbessert die Mailanzeige!
// @include        https://myuos.uni-osnabrueck.de/webmail/src/right_main.php*
// @version        1.00
// ==/UserScript==

// Cookie erstellen
function createCookie(name,value,days) {if (days) {var date = new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires = "; expires="+date.toGMTString();}else var expires = "";document.cookie = name+"="+value+expires+"; path=/";}
// Cookie auslesen.
function readCookie(name) {var nameEQ = name + "=";var ca = document.cookie.split(';');for(var i=0;i < ca.length;i++) {var c = ca[i];while (c.charAt(0)==' ') c = c.substring(1,c.length);if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);}return null;}
// Get Variablen aus URL auslesen und abspeichern.
function getUrlVars(){var vars = [], hash;var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');for(var i = 0; i < hashes.length; i++){hash = hashes[i].split('=');vars.push(hash[0]);vars[hash[0]] = hash[1];}return vars;}
//in_array Funktion:
function in_array(item,arr) {for(p=0;p<arr.length;p++) if (item == arr[p]) return true;return false;}

//############################//
//        Einstellungen       //
//############################//		
	//Zeichenfolge vor den Antwormails:
	var preSignRe = "Re:";

//############################//
//       Platzsparendes       //
//############################//
	//Aufklappfunktion:
	function openTR(e){
		m = e.target.parentNode.getAttribute('id');
		if(mails[m]["Objekt"].getElementsByTagName('td')[4].innerHTML.match('icon_aufklappen') != null){
			for(var z=0;z<remails.length;z++){
				remails[z]["Objekt"].setAttribute("style","display:none");
			}
			for(var k=0;k<mails[m]["RE"].length;k++){
				remails[mails[m]["RE"][k]]["Objekt"].setAttribute("style","display:show");
			}
		}else{
			for(var z=0;z<remails.length;z++){
				remails[z]["Objekt"].setAttribute("style","display:none");
			}
			m = e.target.parentNode.getAttribute('id');
		}
	}

	//Alle Mails mit 'RE: ' im Namen finden, ausblenden und in Array sichern.
	 var mails = new Array();
	 var mails_i = 0;
	 
	 var target; //Das Lokale Zielelement
	 var open = new Array();
	 
	 var remails = new Array(); //Die RE Mails
	 var remails_i = 0;
	 
	 var image = "<img title='Antwortmails auf- oder zuklappen!' alt='[Aufklappen]' src='http://www.ad-autodienst.de/partner/images/icon_aufklappen.gif'>";
	 
	 //Alle Mails ohne RE aufspüren und abspeichern
	 for(var i =0;i<document.getElementsByTagName('tr').length;i++){
		if(document.getElementsByTagName('tr')[i].getAttribute("valign") == 'top'){	
			target = document.getElementsByTagName('tr')[i];
			if(target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].innerHTML.match(/Re: /) == null){
				mails[mails_i] = new Array();
				mails[mails_i]["Objekt"] = target;
				if(target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].title != ""){
					mails[mails_i]["Name"] = target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].title.replace(/ /g,"");
				}else{
					mails[mails_i]["Name"] = target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].innerHTML.replace(/ /g,"");
				}
				mails[mails_i]["A"] = target.getElementsByTagName('td')[4].getElementsByTagName('a')[0];
				mails[mails_i]["RE"] = new Array();
				mails_i++;
			}else{
				remails[remails_i] = new Array();
				target.setAttribute("id","re_"+remails_i);
				remails[remails_i]["Objekt"] = target;
				if(target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].title != ""){
					remails[remails_i]["Name"] = target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].title.replace(/ /g,"");
				}else{
					remails[remails_i]["Name"] = target.getElementsByTagName('td')[4].getElementsByTagName('a')[0].innerHTML.replace(/ /g,"");
				}
				remails_i++;
			}
		}
	 }
	 
	 //Nun die entsprechnenden Antworten ausblenden!
	 var n = 0;
	 for(var i=0;i<mails.length;i++){
		n = 0;
		for(var k=0;k<remails.length;k++){
			if(remails[k]["Name"] == preSignRe+mails[i]["Name"]){
				mails[i]["RE"][n] = k;
				if(remails[k]["Objekt"].getElementsByTagName('td')[4].innerHTML.match('<b>') == null){
					remails[k]["Objekt"].setAttribute("style","display:none;");
					for(var z=0;z<5;z++){
						remails[k]["Objekt"].getElementsByTagName('td')[z].setAttribute('bgcolor',"#FFA07A");	
					}
				}
				n++;		
			}
		}
		if(n==1){
			mails[i]["A"].parentNode.innerHTML += "<br><b>"+n+"</b> Antwort <a id='"+i+"' href='#re_"+mails[i]["RE"][0]+"' >"+image+"</a>";
			document.getElementById(i).addEventListener('click' , function(e){openTR(e);} , false);
		}
		if(n>=2){
			mails[i]["A"].parentNode.innerHTML += "<br><b>"+n+"</b> Antworten <a id='"+i+"' href='#re_"+mails[i]["RE"][0]+"' >"+image+"</a>";
			document.getElementById(i).addEventListener('click' , function(e){openTR(e);} , false);
		}
	 }
 

//############################//
//     Mail-Zeichen title     //
//############################//
	
	
//############################//
//Gelesen/Ungelesen markieren //
//############################//
	//Buttons einfügen:
	document.getElementsByName('attache')[0].parentNode.innerHTML += "<br>"+
																	 "<small>Markieren:</small>"+
																	 "<input id='mark0' type='submit' value='Keine'><input id='mark1' type='submit' value='Gelesene'><input id='mark2' type='submit' value='Ungelesene'>";
	document.getElementById('mark0').addEventListener('click' ,function(){markMails(0)}, false);
	document.getElementById('mark1').addEventListener('click' ,function(){markMails(1)}, false);
	document.getElementById('mark2').addEventListener('click' ,function(){markMails(2)}, false);
	
	function markMails(typ){
		var zahl = 0;
		//Demarkierung:
		if(typ == 0){
			for(var i =0;i<document.getElementsByTagName('tr').length;i++){
				if(document.getElementsByTagName('tr')[i].getAttribute("valign") == 'top'){	
					target = document.getElementsByTagName('tr')[i];
					target.getElementsByTagName('td')[0].getElementsByTagName('input')[0].removeAttribute('checked');
				}
			}
		}		
		//Gelesene
		if(typ == 1){
			for(var i =0;i<document.getElementsByTagName('tr').length;i++){
				if(document.getElementsByTagName('tr')[i].getAttribute("valign") == 'top'){	
					target = document.getElementsByTagName('tr')[i];
					if(target.getElementsByTagName('td')[1].innerHTML.match('<b>') == null){
						target.getElementsByTagName('td')[0].getElementsByTagName('input')[0].setAttribute('checked','true');
						zahl++;
					}
				}
			}
			alert(zahl+" Mail/s markiert");
		}
		//Ungelesene
		if(typ == 2){
			for(var i =0;i<document.getElementsByTagName('tr').length;i++){
				if(document.getElementsByTagName('tr')[i].getAttribute("valign") == 'top'){	
					target = document.getElementsByTagName('tr')[i];
					if(target.getElementsByTagName('td')[1].innerHTML.match('<b>') != null){
						target.getElementsByTagName('td')[0].getElementsByTagName('input')[0].setAttribute('checked','true');
						zahl++;
					}
				}
			}
			alert(zahl+" Mail/s markiert");
		}
	}