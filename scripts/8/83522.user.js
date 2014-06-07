// ==UserScript==
// @name           Bitewny IRC Obrony Narodowej
// @namespace      erepublik.com
// @include        http://www.erepublik.com/pl/battlefield/*
// @include        http://www.erepublik.com/en/battlefield/*
// ==/UserScript==


// USERSCRIPT ONLY FOR ePOLAND OR EDEN CITIZENS !!! //
// EDITING AND USING BY CITIZENS OF PHOENIX ALLIANCE IS STRICTLY FORBIDDEN !!! //


// ZMIENNE KONFIGUROWALNE I TAKIE TAM BAJERY //
	
	var siec = 'irc.quakenet.org';
	var kanal = '#obrona.narodowa';
	var sourceserver = 'http://demo.bdl.pl/erepirc/'; // <--- pliki appletu pobierane są z mojego serwera, mam nadzieję, że wytrzyma

// KONIEC //

function getElementsByClassName(node,classname) {
  if (node.getElementsByClassName) {
    return node.getElementsByClassName(classname);
  } else {
    return (function getElementsByClass(searchClass,node) {
        if ( node == null )
          node = document;
        var classElements = [],
            els = node.getElementsByTagName("*"),
            elsLen = els.length,
            pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

        for (i = 0, j = 0; i < elsLen; i++) {
          if ( pattern.test(els[i].className) ) {
              classElements[j] = els[i];
              j++;
          }
        }
        return classElements;
    })(classname, node);
  }
}

var ircDiv = document.createElement('div');
		ircDiv.style.padding = '20px';
		ircDiv.style.textAlign = 'center';
		ircDiv.style.fontSize = '20px';
		ircDiv.style.color = '#439CB9';
		ircDiv.style.backgroundColor = '#F0F0F0';
		ircDiv.addEventListener("mouseover", function () { ircDiv.style.backgroundColor = '#BEE2F2';  }, false);
		ircDiv.addEventListener("mouseout", function () { ircDiv.style.backgroundColor = '#F0F0F0'; }, false);
		
		
		ircDiv.innerHTML = '<b>Wyświetl kanał IRC</b>';
		
		ircDiv.addEventListener('click',
function () {

//pobieram nick użytkownika
var nick = getElementsByClassName(document, 'citizen_name')[0].innerHTML;

		ircDiv.style.display = 'none';	
		
	var ircDiv2 = document.createElement('div');
        ircDiv2.style.marginTop = '5px';
		
		battleClient = document.getElementById('client');
		battleClient.appendChild(ircDiv2);
		
        ircDiv2.innerHTML = 	
		
		"<h1 class='sIFR-replaced'>"+
			"<embed width='250' height='28' src='http://www.erepublik.com/flash/delicious.swf' quality='best' flashvars='txt=[IRC] Obrona Narodowa&amp;&amp;textcolor=#737373&amp;hovercolor=null&amp;linkcolor=null&amp;w=250&amp;h=28' wmode='transparent' bgcolor='transparent' sifr='true' type='application/x-shockwave-flash' class='sIFR-flash' style='width: 250px; height: 28px;'><span class='sIFR-alternate'>[IRC] Obrona Narodowa</span>"+
		
		"</h1>"+
		
		'<applet name="applet" codebase="'+sourceserver+'" code="IRCApplet.class" archive="irc.jar,sbox.jar" width="690" height="400">'+

'<param name="CABINETS" value="irccab,securedirc.cab,sbox.cab">'+
'<param name="coding" value="2">'+
'<param name="language" value="polish">'+
'<param name="languageencoding" value="ISO-8859-2">'+
'<param name="language" value="polish">'+

'<param name="sbox:language" value="sbox-polish">'+
'<param name="sbox:coding" value="2">'+
'<param name="sbox:languageencoding" value="ISO-8859-2">'+

'<param name="nick" value="'+nick+'">'+
'<param name="name" value="'+nick+'">'+

'<param name="host" value="'+siec+'">'+
'<param name="command1" value="/join '+kanal+'">'+  //łączenie z kanałem

'<param name="gui" value="sbox">'+
'<param name="quitmessage" value="Papa !">'+
'<param name="multiserver" value="false">'+
'<param name="authorizedleavelist" value="all">'+
'<param name="autorejoin" value="false">'+

'<param name="style:sourcefontrule1" value="all all Verdana 10">'+

'<param name="sbox:timestamp" value="true">'+
'<param name="sbox:highlight" value="true">'+
'<param name="sbox:highlightnick" value="true">'+
'<param name="sbox:highlightlinks" value="true">'+
'<param name="sbox:styleselector" value="true">'+
'<param name="sbox:setfontonstyle" value="true">'+
'<param name="sbox:showhelp" value="false">'+
'<param name="sbox:showabout" value="false">'+
'<param name="sbox:leftnickalign" value="true">'+
'<param name="sbox:showmenubar" value="false">'+

'<param name="sbox:showtaskbar" value="false">'+
'<param name="sbox:taskbarside" value="0">'+

'<param name="sbox:prefixops" value="true">'+
'<param name="sbox:prefixbold" value="false">'+
'<param name="sbox:prefixfg" value="3">'+
'<param name="sbox:prefixbg" value="0">'+
'<param name="style:sourcefontrule1" value="all all Tahoma 14">'+

'<param name="sbox:nickprefix" value="<\b">'+
'<param name="sbox:nickpostfix" value="\b> ">'+

'</applet>';
},
false
);

battleClient = document.getElementById('client');
battleClient.appendChild(ircDiv);