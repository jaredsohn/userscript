// ==UserScript==
// @name        Spin Chat Wachhund
// @namespace   spinwatchdog
// @description Postet irgendwas in den Spin Chat um nicht zu fliegen und versendet mails mit profildaten bei neuem dia ;]
// @include     http://www.spin.de/loggedin
// @version     1  
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

addJQuery(main);

function main() {
	//chose messages (Random) and default delay
	var messages = new Array(':)',':]',':>',':P','8)','X)','=)');

    //the default waiting time
	var defaultWait = 1200000;

	//your nickname
	var nickname = 'yournickname';

	//the chat to watch
	var favoritechat = 'Chat - Name';
    
	//the mailproxy php script (copy it to a file named mail.php and upload this on your server)
	//<?php
	//if (isset(jQ_POST)) {
	//	jQheaders .= "Content-type: text/html\r\n"; 
	//	mail(jQ_POST['to'] ,jQ_POST['subject'],jQ_POST['message'].'<br/><br/>'.jQ_POST['girl'], jQheaders);
	//}

	//where the above script is located at
	var mailphp = 'http://yourserver.com/mail.php';

	//the address, where the mails should be sent to
	var address = 'you@email.com'

	tabs = new Array();

	//wait, chose message, and send. avoids idle-kicks ;]
	function fake(message) {
		var chatInput = jQ('#tabcontent-1').contents().find('#chatinp');
		jQ(chatInput).val(message);
		var sendButton = jQ('#tabcontent-1').contents().find('button[type=submit]')
		jQ(sendButton).click();
		var wait = defaultWait;//parseInt(Math.random()*defaultWait);
		console.log('waiting: '+wait/1000+'sec');
		var index = parseInt(Math.random()*messages.length);
		var randomMessage = messages[index];
		console.log('sending: '+randomMessage);
		setTimeout(function() {
			fake(randomMessage);
		}, wait);
	}

	function checkProfile(name, callback) {

		jQ('div#profile').load('http://www.spin.de/hp/'+name+' #profilecontent', function() {
			var mailText = "Daten:<br/><br/>";
			if (jQ('div#profile').find('img.thumb').attr('src') != undefined) {
				mailText+= "<img src='"+jQ('div#profile').find('img.thumb').attr('src')+"'/>" + '<br/>';
			}
			else {
				mailText+= 'Kein Profilbild....!<br/>';
			}
			if (jQ('div#profile td:contains("Geburtsjahr")').length) {
				mailText+='Geburtsjahr:' + jQ('div#profile td:contains("Geburtsjahr")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Größe")').length) {
				mailText+='Größe:' + jQ('div#profile td:contains("Größe")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Gewicht")').length) {
				mailText+='Gewicht:' + jQ('div#profile td:contains("Gewicht")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Haare")').length) {
				mailText+='Haare:' + jQ('div#profile td:contains("Haare")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Körperbau")').length) {
				mailText+='Körper:' + jQ('div#profile td:contains("Körperbau")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Raucher")').length) {
				mailText+='Raucher:' + jQ('div#profile td:contains("Rauchen")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Typ-Stil)').length) {
				mailText+='Typ:' + jQ('div#profile td:contains("Typ-Stil")').next().text() + '<br/>';
			}
			if (jQ('div#profile td:contains("Beziehung")').length) {
				mailText+='Beziehung:' + jQ('div#profile td:contains("Beziehung")').next().text() + '<br/>';
			}
			callback(mailText);
		});
	}


	//check for new girls and send them via mail
	function checkTabs() {
		jQ('div.tt').each(function() {
			//get name and message
			var tabNum = jQ(this).parent().attr('id').split('-')[1];
			var text = jQ('iframe#tabcontent-'+tabNum).contents().find('div.chat').text();
			var name = jQ(this).text();
			//send it as email
			if (name != favoritechat && text!='' && !text.match(nickname)) {
				if (tabs.indexOf(name) == -1) {
					checkProfile(name, function(mailText) {
						tabs.push(name);
						jQ.post(mailphp,{
							name: name,
							to: address,
							subject: 'Neues Dia von http://www.spin.de/hp/'+name,
							message: 'Text: '+text,
							girl: mailText
						})
					})
				}
			}
	
		})
	}

	//function kick off
	jQ(function() {
		jQ('body').append('<div id="profile" style="display: none"></div>');
		setInterval(checkTabs, 10000);
		fake('re');
	})

}