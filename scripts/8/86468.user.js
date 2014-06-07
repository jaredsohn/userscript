// ==UserScript==
// @name           Quick Smilie
// @namespace      WKW
// @description    Fügt eine Leiste mit Smilies und Sonderzeichen bei jeden Textfeld ein.
// @description    Author: http://www.wer-kennt-wen.de/person/8qd938zp
// @description    Version: 2010.09.24
// @include        http://www.wer-kennt-wen.de/*
// ==/UserScript==

var version = '2010.09.24';
var	url = document.URL;
var icon_mix = 'data:image/gif;base64,R0lGODdhDwAPAMZjAABaSgBdSARbUwBfTQBgSABgUwBiVQBjUABjUwJkUghjVwBmVABmVgNmVgJnVQBoVQBpVwJpVQFqVQNqVAdpUwFrVgdsUQxsWA5vVhNxVBlwXhZyVxh1ShV2Uh10UR96UyR8Vil5eiZ+YCp/TSmCUSyCUy2EVzOGUzOGWTuNVUSVUEmUWFaWnFKeWlmYjl2lWWGmXWeqXnCxU3SzYHW1VXW1W3W4Xnq6a368W4G+VoK+Xoa/XIHCXYjCXY+3v4+4tonEX5DIUZHHYJXMX5vGi53Ih5/JgZjQUZzPW5vPYZzMfZ/PXJ7QW5vRWp7QXZ3RXJ7RX6HSWqDUVaLTXaHTYaHUW6LUXqLVYKXVXKTVX6fVXajVXKbVYqfWXKnYXarYXK3ZYKjbX67dYP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAADwAPAAAHrIBjgoOEhYQ+RlQyOTcuhmNEUk08Gxk0TSmFRUcvHw4PCwkxYSODP0EoBQwPDxEPCTo7GoJKJwURFawPEAgzYByCLwYSCwgWEw8FK1laJIIjCwsULUIgGDBcUVAdghwIGTpfUz1DXUxdNgOCIgc1XktPVlFIVVclAIIsB0BbTv5OWbKkMJBgkAIQSbQswZIFhwkDAQoJ8NBDDAwQDRBENBSCgAoPAAJceESSUCAAOw==';
var smilie_url = new Array('http://static.werkenntwen.de/images/emoticons/grinsen.gif','http://static.werkenntwen.de/images/emoticons/zwinkern.gif','http://static.werkenntwen.de/images/emoticons/grinsen_zunge.gif','http://static.werkenntwen.de/images/emoticons/ueberrascht.gif','http://static.werkenntwen.de/images/emoticons/ungluecklich.gif','http://static.werkenntwen.de/images/emoticons/breites_grinsen.gif','http://static.werkenntwen.de/images/emoticons/cool.gif','http://static.werkenntwen.de/images/emoticons/kuss.gif','http://static.werkenntwen.de/images/emoticons/boese.gif','http://static.werkenntwen.de/images/emoticons/neidisch.gif');
var smilie_code = new Array(':-)',';-)',':-P',':-O',':-(',':-D','8-)',':-*',':-@','(neidisch)');
var so_zeichen_code = new Array('ツ','㋡','☺','☹','☻','¿','ღ','♡','♧','♠','♣','♥','♦','❤','❥','❦','❧','❢','❣','✓','✔','✕','✖','✗','✘','☼','✪','☆','★','✫','✬','✭','✮','✷','✶','✯','✰','✸','✱','✵','✲','✳','❉','❊','❋','❈','✴','❅','❆','❇','✾','❄','✿','❀','❃','❂','❁','❏','❐','❑','❒','❖','❘','❙','❚','➟','➠','➡','➢','➣','➤','➥','➦','➧','➨','➩','➪','➫','➬','➭','➮','➯','➱','◀','▶','☞','☜','♫','♪','☏','♀','♂','ﾉ८ん ❤ のﾉ८ん','©','•','■','½','¼','¾','—','▬','✈','✉','✂','☑','☒','█)','║','═','╝','╚','╗','╔','╬','╩','╦');
var so_zeichen = new Array('ツ','㋡','☺','☹','☻','¿','ღ','♡','♧','♠','♣','♥','♦','❤','❥','❦','❧','❢','❣','✓','✔','✕','✖','✗','✘','☼','✪','☆','★','✫','✬','✭','✮','✷','✶','✯','✰','✸','✱','✵','✲','✳','❉','❊','❋','❈','✴','❅','❆','❇','✾','❄','✿','❀','❃','❂','❁','❏','❐','❑','❒','❖','❘','❙','❚','➟','➠','➡','➢','➣','➤','➥','➦','➧','➨','➩','➪','➫','➬','➭','➮','➯','➱','◀','▶','☞','☜','♫','♪','☏','♀','♂','Ild','©','•','■','½','¼','¾','—','▬','✈','✉','✂','☑','☒','█)','║','═','╝','╚','╗','╔','╬','╩','╦');

//☠ ☮ ✌ ✟ ✝ † ⊱ ⊰ ♈ ♍ ✉ ☂ ♼♼ ி ♧ ☜♡☞ ☾ ☽ ☆ ☃ ※ -:¦:- ❊ ..-`҉҉´✬✬ .✺
//ª¤♥¤ª ¨˜“ªª“˜¨ ⁂..⁂ ◟-◞ .°j ☁☁. .
//﴿ ﴾ ☚ ☛ ☀ ☤ ♕ ♔ ☍☍ ☀ ♏ ♦ ♣ ♠ ♀ ♪ ☭ ⋡ ✈
//↓↑ → ← ↨ ↔ ∟ ⌂ ┬ ├ ─ ┼ ▲ ♦_♦ ◘ ± ½
//∭ ⍒ ஊ ಊ ஆ Ѽ Ƹ̵̡Ӝ̵Ʒ ¥ Ƣ Φ ֶ Φ ≎ ჱ ڿ ␣გ.გ .ð๑ð⋓ Ø ϖ
//® � ∀
//那 是 我 的 誰 知 道 誰 ⋡=╩=╦=╩=╦=
//=╦=╩=╦=╩=╦=
//.....=╦=╩=╦=╩=
//.....=╩=╦=╩=
//
//╠╣ ⎳ ╔╗
//║═╗
//╚═╝ ²²²²²²²²²
/// ▲ ◕ ◒ ◓ ●● ⊏⊐ ◣_◢ ◙_◙ ▀° ╥─o ¶ c█ ║║█║║▐ ▋ ▬ ▬ ╝╚ ╗╗ ╬ 田田 門 [].[]
//- ▂▃▅▆ + ▬|████|▬ ▀▄▀▄ ▁▁▅▅▁▁

//▓▒░ (▒) {▒♥▒} _▒_

	function smile()
	{
		var allTextareas = document.getElementsByTagName('textarea');

		if (allTextareas.length)
		{
			for (var x = 0; x < allTextareas.length; x++)
			{
				var thisTextarea = allTextareas[x];
				thisTextarea.setAttribute('title' , ''+x+'');
				thisTextarea.addEventListener('keydown' , resizeTextArea , false );
				var table = document.createElement('table');
				table.setAttribute('border' , '0');

				///// GB-Eintrag & Blog /////
				if ( thisTextarea.id == 'gb_body' || thisTextarea.id == 'body'){
					if (url.indexOf('/forum/showThread') > -1)
					{
						///// Forums-Thread antworten /////
						table.setAttribute('style' , 'padding:0px 0px 0px 0px');
					}else{
						///// GB-Eintrag & Blog /////
						table.setAttribute('style' , 'padding:0px 0px 0px 70px;');
					}				
				}
				///// GB-Kommentar /////
				if ( thisTextarea.name == 'comment' ){
					table.setAttribute('style' , 'padding:0px 0px 0px 30px');
				}
				///// Event eintragen /////
				if ( thisTextarea.name == 'description' || thisTextarea.name == 'routeDescription'){
					table.setAttribute('style' , 'padding:0px 0px 0px 210px');
				}
				///// Gruppe bearbeiten /////
				if ( thisTextarea.id == 'edit_ClubDescription' || thisTextarea.id == 'edit_ClubNews' || thisTextarea.id == 'edit_ClubSnippet' ){
					table.setAttribute('style' , 'padding:0px 0px 0px 260px');
				}

				///// tr1 mit WKW-Smilies /////
				tr1 = table.appendChild(document.createElement('tr'));

				///// tr mit WKW-Smilies aus Array erzeigen /////
				for ( i=0; i < smilie_url.length; i++)
				{
					td = tr1.appendChild(document.createElement('td'));
					td.setAttribute('style', 'padding:4px 4px 4px 4px;	cursor:pointer;');
					img = td.appendChild(document.createElement('img'));
					img.src = smilie_url[i]; // URL-Smilie
					img.id = smilie_code[i]; // echte schreibweise
					img.title = smilie_code[i];
					img.alt = smilie_code[i];
					img.name = x; // Nummer der aufrufenden Textarea
					img.addEventListener('click' , insert , false );
				}
				///// (mehr)-Link einfügen /////
				td = tr1.appendChild(document.createElement('td'));
				var a = td.appendChild(document.createElement('a'));
				a.setAttribute('style' , 'cursor:pointer;');
				a.appendChild(document.createTextNode('(mehr)'));
				a.name = x; // Nummer der aufrufenden Textarea
				a.addEventListener('click', changeTr ,true);

				td = tr1.appendChild(document.createElement('td'));
				var img = td.appendChild(document.createElement('img'));
				img.src = 'http://static.werkenntwen.de/images/icons/help_h2.gif';
				img.setAttribute('style' , 'cursor:pointer;');
				img.addEventListener('click', einstellungen ,true);


				

				///// tr2 mit Sonderzeichen /////
				tr2 = table.appendChild(document.createElement('tr'));
				tr2.setAttribute('style' , 'display:none;');

				///// tr mit Sonderzeichen aus Array erzeugen /////
				cells = 0; // zählt die Zellen pro TR
				tr_nr = 0; // Zähler für die TR-ID damit changeTr weiß welche
				tr2.id = 'tr_'+x+'_'+tr_nr;

				td = tr2.appendChild(document.createElement('td'));
				td.setAttribute('colspan', '3');
				a = td.appendChild(document.createElement('a'));
				a.appendChild(document.createTextNode('mix'));
				a.setAttribute('style' , 'cursor:pointer;');
				a.name = x; // Nummer der aufrufenden Textarea
				a.addEventListener('click' , mix_text , false );

				td = tr2.appendChild(document.createElement('td'));
				td.setAttribute('colspan', '3');
				a = td.appendChild(document.createElement('a'));
				a.setAttribute('style' , 'cursor:pointer;');
				a.appendChild(document.createTextNode('flip'));
				a.name = x; // Nummer der aufrufenden Textarea
				a.addEventListener('click' , flip , false );

				td = tr2.appendChild(document.createElement('td'));
				td.setAttribute('colspan', '3');
				a = td.appendChild(document.createElement('a'));
				a.setAttribute('style' , 'cursor:pointer;');
				a.appendChild(document.createTextNode('drehen'));
				a.name = x; // Nummer der aufrufenden Textarea
				a.addEventListener('click' , textUmdrehen , false );

				td = tr2.appendChild(document.createElement('td'));
				td.setAttribute('colspan', '3');
				a = td.appendChild(document.createElement('a'));
				a.setAttribute('style' , 'cursor:pointer;');
				a.appendChild(document.createTextNode('g̶e̶l̶ö̶s̶c̶h̶t̶'));
				a.name = x; // Nummer der aufrufenden Textarea
				a.addEventListener('click' , geloescht , false );

				tr2 = table.appendChild(document.createElement('tr'));
				tr2.setAttribute('style' , 'display:none; font-size: 1.4em;');
				tr_nr++;
				tr2.id = 'tr_'+x+'_'+tr_nr; // Nr. der Textarea + Nr. der TR

				for ( i=0; i < so_zeichen.length; i++)
				{
					td = tr2.appendChild(document.createElement('td'));
					td.setAttribute('style', 'padding:3px 3px 3px 3px;');
					a = td.appendChild(document.createElement('a'));
					a.setAttribute('style' , 'color:black;text-decoration:none;cursor:pointer;');
					a.appendChild(document.createTextNode(so_zeichen[i]));
					a.id = so_zeichen_code[i];
					a.name = x; // Nummer der aufrufenden Textarea
					a.addEventListener('click' , insert , false );
					cells++;
					if (cells == 11)
					{
						tr2 = table.appendChild(document.createElement('tr'));
						tr2.setAttribute('style' , 'display:none; font-size: 1.4em;');
						tr_nr++;
						tr2.id = 'tr_'+x+'_'+tr_nr; // Nr. der Textarea + Nr. der TR
						cells = 0;
					}
				}
				thisTextarea.parentNode.insertBefore(table, thisTextarea.nextSibling);
			}
		}
	}

	///// TR Style setzen /////
    function changeTr(e)
    {
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;
		for ( i=0; i < 12; i++ )
		{
		    tr_style = document.getElementById('tr_'+el.name+'_'+i)
		    if ( tr_style.style.display == 'none' ) {
		        document.getElementById('tr_'+el.name+'_'+i).style.display = "table-row";
		    }else {
		        document.getElementById('tr_'+el.name+'_'+i).style.display = "none";
		    }
		}	
    }
	///// Smilies und Sonderzeichen einfügen /////
	function insert(e)
	{
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;

		///// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/beispiel.htm /////
		var allTextareas = document.getElementsByTagName('textarea');
		///// Welche Textarea hat den Focus? /////
 		var input = allTextareas[el.name];
  		input.focus();

		if(typeof input.selectionStart != 'undefined')
		{	
			///// Smilie an Pos. 'X' einfügen /////
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var insText = input.value.substring(start, end);
			input.value = input.value.substr(0, start) + ' ' + el.id + ' ' + insText +  input.value.substr(end);
			///// Anpassen der Cursorposition /////
			var pos;
			if (insText.length == 0) {
			  pos = start + el.id.length+2;
			} else {
			  pos = start + el.id.length+2 + insText.length+2 + el.id.length+2;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
		}
	} 

	///// Version auf www.userscripts.org abfragen /////
	function versionstest(){
		GM_xmlhttpRequest(
		{
		method: 'GET',
		url: 'http://userscripts.org/scripts/show/86468',
		onload: function(responseDetails)
		{
			version_start = responseDetails.responseText.indexOf('<title>')+15;
			version_stop = responseDetails.responseText.indexOf(' for Greasemonkey</title>');
			//versions_nr = responseDetails.responseText.substring(version_start,version_stop);
			versions_nr = responseDetails.responseText.match(/[0-9]{4}.[0-9]{2}.[0-9]{2}./);
			Eingabe = confirm('Quick Smilie\n\nDeine Version:\nVERSION: '+version+'\nAktuell:\nVERSION: '+versions_nr+'\n\nMöchtest Du zu der Downloadseite wechseln?');
				if (Eingabe)
					window.location.href = 'http://userscripts.org/scripts/show/86468';
			}
		});
	}

	///// Zeichen vertauschen //////
	function arrayShuffle()
	{
		var tmp,rand;
		for(var i=0;i<this.length;i++)
		{
			rand=Math.floor(Math.random()*this.length);
			tmp=this[i];
			this[i]=this[rand];
			this[rand]=tmp;
		}
	}
	Array.prototype.shuffle=arrayShuffle;
	function mix_text(e)
	{
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;

		var allTextareas = document.getElementsByTagName('textarea');
		///// Welche Textarea hat den Focus? /////
 		var input = allTextareas[el.name];
  		input.focus();
		if(typeof input.selectionStart != 'undefined')
		{	
			///// Smilie an Pos. 'X' einfügen /////
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var insText = input.value.substring(start, end);
			if (insText.length != 0) {
				text=insText.split(" ");
				var ausgabe=new Array();
				for(var j=0;j<text.length;j++)
				{
					var wort=text[j];
					if(wort=="")
					{
						wort=" ";
					}
					var anfang=wort.substr(0,1);
					var ende=wort.substr(wort.length-1,1);
					wort=wort.substring(1,wort.length-1);
					wort=wort.split("");
					wort.shuffle();
					wort=wort.join("");

					wort_neu=anfang+wort+ende;
					ausgabe[j]=wort_neu;
				}
				insText=ausgabe.join(" ");
			}
			input.value = input.value.substr(0, start) + el.id + insText +  input.value.substr(end);
			///// Anpassen der Cursorposition /////
			var pos;
			if (insText.length == 0) {
				pos = start + el.id.length;
				alert('Markiere den Text den du bearbeiten möchtest.');
			} else {
				pos = start + el.id.length + insText.length + el.id.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
		}
	}

	///// Zeichen auf den Kopf stellen //////
	///// http://www.revfad.com /////
	function flip(e)
	{
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;
		var allTextareas = document.getElementsByTagName('textarea');
		///// Welche Textarea hat den Focus? /////
		var input = allTextareas[el.name];
  		input.focus();
		if(typeof input.selectionStart != 'undefined')
		{	
			///// Smilie an Pos. 'X' einfügen /////
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var insText = input.value.substring(start, end);
			insText = flipString(insText.toLowerCase());
			input.value = input.value.substr(0, start) + el.id + insText +  input.value.substr(end);
			///// Anpassen der Cursorposition /////
			var pos;
			if (insText.length == 0) {
				pos = start + el.id.length;
				alert('Markiere den Text den du bearbeiten möchtest.');
			} else {
				pos = start + el.id.length + insText.length + el.id.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
		}
	}

	function flipString(aString)
	{
		var last = aString.length - 1;
		var result = new Array(aString.length)
		for (var i = last; i >= 0; --i)
		{
			var c = aString.charAt(i)
 			var r = flipTable[c]
  			result[last - i] = r ? r : c
		}
		return result.join('')
	}

	var flipTable = {
		a : '\u0250',
		b : 'q',
		c : '\u0254', //open o -- from pne
		d : 'p',
		e : '\u01DD',
		f : '\u025F', //from pne
		g : '\u0183',
		h : '\u0265',
		i : '\u0131', //from pne
		j : '\u027E',
		k : '\u029E',
		//l : '\u0283',
		m : '\u026F',
		n : 'u',
		r : '\u0279',
		t : '\u0287',
		v : '\u028C',
		w : '\u028D',
		y : '\u028E',
		'.' : '\u02D9',
		'[' : ']',
		'(' : ')',
		'{' : '}',
		'?' : '\u00BF', //from pne
		'!' : '\u00A1',
		"\'" : ',',
		'<' : '>',
		'_' : '\u203E',
		'\u203F' : '\u2040',
		'\u2045' : '\u2046',
		'\u2234' : '\u2235',
		'\r' : '\n' 
	}

	for (i in flipTable)
	{
		flipTable[flipTable[i]] = i
	}

	///// Duchgestrichen schreiben //////
	function geloescht(e)
	{
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;
		var allTextareas = document.getElementsByTagName('textarea');
		///// Welche Textarea hat den Focus? /////
		var input = allTextareas[el.name];
  		input.focus();
		if(typeof input.selectionStart != 'undefined')
		{	
			///// Smilie an Pos. 'X' einfügen /////
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var insText = input.value.substring(start, end);
			text = insText;
			laenge = text.length;
			neuText = "";
			for (i = laenge; i >= 0; i-- )  //       
			{
				neuText = text.substr(i,1)+'\u0336'+neuText;
			}
			insText = neuText;

					input.value = input.value.substr(0, start) + el.id + insText +  input.value.substr(end);
			///// Anpassen der Cursorposition /////
			var pos;
			if (insText.length == 0) {
				pos = start + el.id.length;
				alert('Markiere den Text den du bearbeiten möchtest.');
			} else {
				pos = start + el.id.length + insText.length + el.id.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
		}
	}

	///// Rückwärts schreiben /////
	///// http://www.kostenlose-javascripts.de/javascripts/texteffekte/namen-rueckwaerts-gelesen.html /////
	function textUmdrehen(e)
	{
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;
		var allTextareas = document.getElementsByTagName('textarea');
		///// Welche Textarea hat den Focus? /////
		var input = allTextareas[el.name];
  		input.focus();

		if(typeof input.selectionStart != 'undefined')
		{	
			///// Smilie an Pos. 'X' einfügen /////
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var insText = input.value.substring(start, end);
			text = insText;
			laenge = text.length;
			neuText = "";
			for (i = 0; i < laenge; i++ )
			{
				neuText = text.substr(i,1) + neuText;
			}
			insText = neuText;
			input.value = input.value.substr(0, start) + el.id + insText +  input.value.substr(end);
			///// Anpassen der Cursorposition /////
			var pos;
			if (insText.length == 0) {
				pos = start + el.id.length;
				alert('Markiere den Text den du bearbeiten möchtest.');
			} else {
				pos = start + el.id.length + insText.length + el.id.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
		}
	}

	//// Textarea vergrößern /////
    function resizeTextArea(e) {
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;
		var allTextareas = document.getElementsByTagName('textarea');
		///// Welche Textarea hat den Focus? /////
		var input = allTextareas[el.title];
		lines = input.getAttribute('rows');
		lines_now = input.value.split("\n");
		if (lines < lines_now.length){
			input.setAttribute('rows' , ''+lines_now.length+'');
		}
		

	}

	function zitat(e) {  
		var selObj = window.getSelection().toString(); 
		if ( selObj == '' )
		{
			alert('Markiere den Text den du zitieren möchtest');
		}else{


		var textarea = document.getElementsByTagName('textarea'); // aktuelle Textarea
		lines_now = textarea[0].value.split("\n");
		var lines = textarea[0].getAttribute('rows');
		lines=parseInt(textarea[0].getAttribute('rows')); // hat moementan wieviele Zeilen?
		var e=e? e : window.event;
		var el=e.target? e.target : e.srcElement;
		if(el.name != '')
		{
			var zitattext = '\n[zitat]Zitat: '+el.name+'\n'+selObj+'[/zitat]\n';// Zitat Forum
			lines = lines + 4; // plus 4 Zeilen
		}else{
			var zitattext = '\n[zitat]'+selObj+'[/zitat]\n'; // Zitat PN
			lines = lines + 3; // plus 3 Zeilen
		}
			textarea[0].setAttribute('rows' , ''+lines+'');
		 	textarea[0].setAttribute('style' , 'width:430px;');
			textarea[0].value = textarea[0].value+zitattext;
		}
	}
	//// Zitat bei Nachrichten /////
	if( url.indexOf('message/read') > -1){
		var allDiv = document.getElementsByTagName('div');
		if (allDiv.length)
		{
			for (var x = 0; x < allDiv.length; x++)
			{
				thisDiv = allDiv[x];
				divClass = thisDiv.getAttribute('class');

				if ( divClass == 'messagediv-active' ){
					var button = thisDiv.appendChild(document.createElement("input"));
					button.type = "button";
					button.value = " Zitat ";
					button.addEventListener("click", zitat, false);
					c=thisDiv.firstElementChild.innerHTML;
					var b='';
					for ( i=0; i<c.length; i++){
						var b=b+c[i];
					}
					b=b.replace(/\[zitat\]/g,'<div id="zitat">');
					b=b.replace(/\[\/zitat\]/g,'</div>');
					thisDiv.firstElementChild.innerHTML=b;
				}				
			}
		}
	}
	//// Zitat im Forum /////
	if( url.indexOf('forum/showThread') > -1){
		var allDiv = document.getElementsByTagName('div');
		if (allDiv.length)
		{
			for (var x = 0; x < allDiv.length; x++)
			{
				thisDiv = allDiv[x];
				divClass = thisDiv.getAttribute('class');

				if ( divClass == 'postUser' ){
					img=thisDiv.firstElementChild.innerHTML;
					var name = img.match(/alt="([^"]*)/g);
					poster_name = name.toString(); 
					poster_name = poster_name.substr(5);
					var br = thisDiv.appendChild(document.createElement("p"));
					var button = br.appendChild(document.createElement("input"));
					button.name = poster_name; // Name der Threadposters
					button.type = "button";
					button.value = " Zitat ";
					button.addEventListener("click", zitat, false);
				}
				if ( divClass == 'entry' ){
					c=thisDiv.innerHTML;
					var b='';
					for ( i=0; i<c.length; i++){
						var b=b+c[i];
					}
					b=b.replace(/\[zitat\]/g,'<div id="zitat_forum"><b>'); // DIV einfügen Fett machen
					b=b.replace(/\[\/zitat\]<br>/g,'</div>'); // DIV schließen
					b=b.replace(/\n/g,'</b>'); // Fett schließen
					thisDiv.innerHTML=b;
				}				
			}
		}
	}

	  //////////////////////////////
////////// CSS einfügen Start /////
	//////////////////////////////

var css = "" + (<r><![CDATA[

#zitat
{
	background-color:#E7EEF5;
	border:1px solid #B6CCE4;
	padding:8px;
	text-align:left;
	width:400px;
}

#zitat_forum
{
	background-color:#E7EEF5;
	border:1px solid #B6CCE4;
	padding:8px;
	text-align:left;
	width:475px;
}

#overlay
{
	position:fixed!important;
	top:0!important;
	bottom:0!important;
	left:0!important;
	right:0!important;
	width:100%!important;
	height:100%!important;
	margin:0!important;
	padding:0!important;
	border:0px none!important;
	background:none transparent!important;
	z-index:65536!important;
}
#overlay
{
	background-color:#CCC!important;
	opacity:0.7!important;
	-moz-opacity:0.7!important;
}
#fieldset a
{
	font-size: 0.8em!important;
}
#einstellungen fieldset
{
	z-index:65536!important;
	background:none white!important;
	position:fixed!important;
	width:60%!important;
	height:auto!important;
	margin:0 -12.5em!important;
	top:10px!important;
	left:40%!important;
	text-align:left!important;
	padding: 5px 10px 12px !important;
	font-size: 0.95em!important;
}
#einstellungen fieldset legend
{
	background-color:white!important;
	padding:0 2px !important;
}
#einstellungen fieldset label
{
	display:block!important;
}
#einstellungen fieldset td
{
	vertical-align: top;

}
#einstellungen fieldset hr
{
	margin: 4px 4px 4px 4px!important;
}

]]></r>);

	if(GM_addStyle)
		GM_addStyle(css);
		else
		{
			var head = document.getElementsByTagName('head')[0];
			if(head)
			{
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = css;
				head.appendChild(style);
			}
		}

	  /////////////////////////////
////////// CSS einfügen Ende /////
	/////////////////////////////

	  //////////////////////////////////////////////
////////// Einstellung & Hilfe erzeugen Start /////
	//////////////////////////////////////////////

	function einstellungen ()
	{
			var form = document.body.insertBefore(document.createElement("form"), document.body.firstChild);
			form.id = "einstellungen";
			var overlay = form.appendChild(document.createElement("div"));
			overlay.id = "overlay";
		
			var fieldset = form.appendChild(document.createElement("fieldset"));
		
			var legend = fieldset.appendChild(document.createElement("legend"));
			legend.appendChild(document.createTextNode("Quick Smilie - Einstellungen"));

			///// Navigation START /////
			var div = fieldset.appendChild(document.createElement("div"));
	 		div.setAttribute('id' , 'navigation');

			var ul = div.appendChild(document.createElement("ul"));
			var li = ul.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.appendChild(document.createTextNode("Funktionen"));
			a.setAttribute('id' , 'table1');
			a.addEventListener('click', changeTable, false);

			var li = ul.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.appendChild(document.createTextNode("Version"));
			a.addEventListener('click', versionstest, false);
			///// Navigation ENDE /////


			///// Tabelle Hilfe START /////
			var table = fieldset.appendChild(document.createElement("table"));
			table.setAttribute('id' , 'table_1');
			table.setAttribute('style' , 'display:block;');
			table.setAttribute('border' , '0');
			var tr = table.appendChild(document.createElement("tr"));

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr1');
			a.appendChild(document.createTextNode('1. mix'));
			a.addEventListener('click' , changeTr , false);

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr2');
			a.appendChild(document.createTextNode('2. flip'));
			a.addEventListener('click' , changeTr , false);

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr3');
			a.appendChild(document.createTextNode('3. drehen'));
			a.addEventListener('click' , changeTr , false);


			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr4');
			a.appendChild(document.createTextNode('4. g̶e̶l̶ö̶s̶c̶h̶t̶'));
			a.addEventListener('click' , changeTr , false);


			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr5');
			a.appendChild(document.createTextNode('5. Vorsicht....'));
			a.addEventListener('click' , changeTr , false);


			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr6');
			a.appendChild(document.createTextNode('6. Danke ;-)'));
			a.addEventListener('click' , changeTr , false);


			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_1');
			tr.setAttribute('style' , 'display:block');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>luat einer suitde enier ehenclgsin uänristevit ist es elga, in welcehr rienhgfleoe die bbutcheasn eenis wotres steenh. eiizng wiithcg ist, dass der estre und ltzete bhtsucabe nihct vacuesrhtt werned. den rest könenn wir tdzoretm onhe pbelmore lnsee. das leigt drana, dsas wir nhict jeedn bstacuhebn eelznin lnese, sodrnen das wrot als gznaes.<br><br>Der Studie dieser Universität kann man glauben! Schreibe einen Text und klicke dann auf "mix" und die Buchstaben werden verstauscht.<br>Möchtest Du die Aktion rückgängig machen klicke in das Textfeld und drücke "Strg+Z".</p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_2');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>ɟdoʞ ʇɥǝʇs ʇlǝʍ ǝıp pun dılɟ<br><br>Klickst Du wieder auf "flip" ist die Welt wieder in Ordnung.</p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_3');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>!ztaS nettelpmok nenie sad tbigre neseleg sträwkcür hcuA<br><br>luat einer suitde enier ehenclgsin uänristevit ist es elga, in welcehr rienhgfleoe die bbutcheasn eenis wotres steenh... und das gilt auch wenn der Satz rückwärts geschrieben wird.</p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_4');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>Mxie deienn Txet eianfch ewats<br><br>ɟdoʞ uǝp ɟnɐ ʇxǝʇ uǝuıǝp llǝʇs<br><br>sträwkcür txet nenied ebierhcs ◀◀◀<br><br>Jetzt kannst Du deinen Text absenden, o̶d̶e̶r̶ ̶l̶ö̶s̶c̶h̶e̶ ̶e̶i̶n̶f̶a̶c̶h̶ ̶a̶l̶l̶e̶s̶̶<br></p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_5');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>slɔoɥǝ säʇzǝ ʞuɐu ʞıǝu ɯɔusǝɥ ɯǝɥɹ lsǝǝu<br><br>Oder???<br>"solche sätze kann kein mensch mehr lesen" wenn man mix, flip und drehen auswählt!<br>Aber "Strg+Z" macht immer alles wieder rückgängig <img src="http://static.werkenntwen.de/images/emoticons/zwinkern.gif" alt=";-)" title=";-)"><br><br>Bei "Was XYZ" gerade macht" gibt es ja die Beschränkung auf max. 160 Zeichen. Sonderzeichen wie  ☹  ♡  ❣  ✖  verbrauchen aber in den Augen von WKW <u>mehr</u> wie 1 Zeichen.<br>Dummerweise bemerkt man das erst beim absenden des Textes. Probieren geht über studieren!!!<br><br>Du siehst keine Sonderzeichen - nur Datenmüll?<br>Evtl. hilft dir das hier weiter:<br><a href="http://www.firefox-browser.de/wiki/FAQ:Fehlende_Schriften" target="blank">http://www.firefox-browser.de/wiki/FAQ:Fehlende_Schriften</a></p>';
			
			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_6');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p><font color="#ec4317"><b>Dieses Script ist völlig fehlerfrei!</b></font><br>Der Fehler sitzt immer 60cm vom Bildschirm entfernt und nennt sich "Benutzer".<br>Ja - ich rede von Dir <img src="http://static.werkenntwen.de/images/emoticons/breites_grinsen.gif" alt="???" title="???" id="foo"><br>Wenn Du allerdings vom Gegenteil überzeugt bist, Dir eine Funktion noch fehlen sollte, Du Hilfe benötigst oder Ideen hast, komm in die <a href="http://www.wer-kennt-wen.de/club/dktzafvd" target="blank">Quick Smilie Gruppe</a>!<br>Ausserdem wirst Du da auch immer über aktuelle Updates informiert.<br>Nicht ist so alt wie Die Version von gestern!<br>P.S.<br>Ja klar..... Du darfst natürlich Deinen Freunden von diesem Script hier erzählen und sie in die Gruppe einladen <img src="http://static.werkenntwen.de/images/emoticons/zwinkern.gif" alt=";-)" title=";-)"></p>';

			///// Tabelle Hilfe ENDE /////
		
			var button = fieldset.appendChild(document.createElement("input"));
			button.type = "button";
			button.value = "Schließen";
			button.addEventListener("click", abbruch, false);

			function changeTable(e)
			{
				var e=e? e : window.event;
				var el=e.target? e.target : e.srcElement;
				show_table = el.id.substring(5); 
				for ( i=1; i < 4; i++ )
				{
					if ( show_table == i ) {

						document.getElementById('table_'+i).style.display = "block";
					}else {

						document.getElementById('table_'+i).style.display = "none";
					}
				}
			}

			function changeTr(e)
			{
				var e=e? e : window.event;
				var el=e.target? e.target : e.srcElement;
				show_tr = el.id.substring(2); 
				for ( i=1; i < 7; i++ )
				{
					if ( show_tr == i ) {

						document.getElementById('tr_'+i).style.display = "block";
					}else {

						document.getElementById('tr_'+i).style.display = "none";
					}
				}
			}


	};

	function abbruch()
	{
		if(!document.getElementById('einstellungen'))
			return;
		
		var form = document.getElementById('einstellungen');
		form.parentNode.removeChild(form);
	};


///////////////////////////////////////////
window.addEventListener('load',smile,true);
///////////////////////////////////////////
