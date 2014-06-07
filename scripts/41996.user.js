// ==UserScript==
// @name           blueVZ (Dunkelblau Mod)
// @namespace      http://suwandhi.de/svz
// @description    Das StudiVZ in Dunkelblau
// @include        http://*studivz.net/*
// @version        1.3 (Mod 1.0)
// ==/UserScript==

// Copyright 2009 by Philipp Krueger

	var stack1='Background-Color:';
	var all = document.getElementsByTagName('*');
	for each(item in all){
		var bgcolor;
		try{
			bgcolor=window.getComputedStyle(item,"").getPropertyValue("background-color");
		}
		catch(error){
			bgcolor="#000000";
		}
		// Farbcode umrechnen
		if(document.ids){
			bgcolor="#00000".substr(0,(7-bgcolor.toString(16).length))+bgcolor.toString(16);
		}
		else if(bgcolor.indexOf('rgb')>-1){
			bgcolor=bgcolor.split("(")[1].split(")")[0].split(",");
			for(i=0;i<3;i++){
				bgcolor[i]=(bgcolor[i]*1).toString(16);
				if(bgcolor[i]==0)
					bgcolor[i]="00";
			}
			bgcolor="#"+bgcolor.join("");
		}
		// Falls nicht durchsichtig und nicht weiss, anzeigen! Wird nur gebraucht, um alle Farbcodes eines Designs anzeigen zu lassen...
		//if((bgcolor!='transparent')&&(bgcolor!='#ffffff')&&(bgcolor!='#000000')){
		//	stack1=stack1+bgcolor;
		//}
		// Farben ersetzen
		if (bgcolor=="#ee0000"){item.style.backgroundColor="#eeeeee";} // StudiVZ | suche | einladen...
		else if(bgcolor=="#e06060"){item.style.backgroundColor="#6699cc";} // blabla's Seite (Uni soundso) | Plauderkasten
		else if(bgcolor=="#2080ff"){item.style.backgroundColor="#000000";} // ?
		else if(bgcolor=="#f5f6f7"){item.style.backgroundColor="#eeeeee";} // Freundesliste Aktualisiert (Datum, Ist gerade)
		else if(bgcolor=="#ff8888"){item.style.backgroundColor="#000000";} // ?
		else if(bgcolor=="#ffe0e0"){item.style.backgroundColor="#eeeeee";} // Box "Du hast x Alben.", "Du hast x Freunde an der Uni soundso.", "Du hast x Freunde an ..."
		else if(bgcolor=="#ffb0b0"){item.style.backgroundColor="#CCDDEE";} // Fotoalben, x ist gerade ..., Lehrveranstaltungen, Gruppen
		else if(bgcolor=="#ff4040"){item.style.backgroundColor="#eeeeee";} // ?
		else if(bgcolor=="#f7f7f7"){item.style.backgroundColor="#eeeeee";} // Box über Pinnwandeinträgen "bla (Uni laber) schrieb..."
		else if(bgcolor=="#f8f8f8"){item.style.backgroundColor="#ffffff";} // ?
	}
	
	//var stack2='Border-Color:';
	var all = document.getElementsByTagName('*');
	var errall;
	for each(item in all){
		//###################### BORDER BOTTOM COLOR ###
		var borderbottomcolor;
		try{borderbottomcolor=window.getComputedStyle(item,"").getPropertyValue("border-bottom-color",false);}
		catch(error){borderbottomcolor="#000000";}
		if(document.ids){borderbottomcolor="#00000".substr(0,(7-borderbottomcolor.toString(16).length))+borderbottomcolor.toString(16);}
		else if(borderbottomcolor.indexOf('rgb')>-1){
			borderbottomcolor=borderbottomcolor.split("(")[1].split(")")[0].split(",");
			for(i=0;i<3;i++){
				borderbottomcolor[i]=(borderbottomcolor[i]*1).toString(16);
				if(borderbottomcolor[i]==0){borderbottomcolor[i]="00";}
			}
			borderbottomcolor="#"+borderbottomcolor.join("");
		}
		//if(borderbottomcolor!='#000000'){stack2=stack2+borderbottomcolor;}
		// Farben ersetzen
		if(borderbottomcolor=="#0000ee"){item.style.borderBottomColor="#000000";} // ?
		else if(borderbottomcolor=="#ffffff"){item.style.borderBottomColor="#ffffff";} // unter Privatsshäre
		else if(borderbottomcolor=="#ff8080"){item.style.borderBottomColor="#6688bb";} // unter Lehrveranstaltungen, Gruppen, Du hast x Freunde...
		else if(borderbottomcolor=="#ffb0b0"){item.style.borderBottomColor="#cccccc";} // unter Start, Meine Freunde, Meine Fotoalben, Seite bearbeiten, ...
		else if(borderbottomcolor=="#999999"){item.style.borderBottomColor="#cccccc";} // unter "Meine Freunde" Name des Freundes-Suchfeld
		else if(borderbottomcolor=="#777777"){item.style.borderBottomColor="#000000";} // ?
		else if(borderbottomcolor=="#ee0000"){item.style.borderBottomColor="#cccccc";} // unter "Meine Freunde" Alle Freunde | Uni | Freundeslisten
		else if(borderbottomcolor=="#cccccc"){item.style.borderBottomColor="#cccccc";} // Bilder
		else if(borderbottomcolor=="#904040"){item.style.borderBottomColor="#000000";} // ?
		else if(borderbottomcolor=="#aa0000"){item.style.borderBottomColor="#cccccc";} // Button Suchen, Abschicken, Vergiss es
		else if(borderbottomcolor=="#ff8888"){item.style.borderBottomColor="#000000";} // ?
		else if(borderbottomcolor=="#e06060"){item.style.borderBottomColor="#336699";} // ?
		else if(borderbottomcolor=="#d07070"){item.style.borderBottomColor="#cccccc";} // ?
		else if(borderbottomcolor=="#888888"){item.style.borderBottomColor="#cccccc";} // ?
		else if(borderbottomcolor=="#666666"){item.style.borderBottomColor="#cccccc";} // ?

		//###################### BORDER LEFT COLOR ###
		try{borderleftcolor=window.getComputedStyle(item,"").getPropertyValue("border-left-color",false);}
		catch(error){borderleftcolor="#000000";}
		if(document.ids){borderleftcolor="#00000".substr(0,(7-borderleftcolor.toString(16).length))+borderleftcolor.toString(16);}
		else if(borderleftcolor.indexOf('rgb')>-1){
			borderleftcolor=borderleftcolor.split("(")[1].split(")")[0].split(",");
			for(i=0;i<3;i++){
				borderleftcolor[i]=(borderleftcolor[i]*1).toString(16);
				if(borderleftcolor[i]==0){borderleftcolor[i]="00";}
			}
			borderleftcolor="#"+borderleftcolor.join("");
		}
		//if(borderleftcolor!='#000000'){stack2=stack2+borderleftcolor;}
		// Farben ersetzen
		if(borderleftcolor=="#0000ee"){item.style.borderLeftColor="#ffffff";} // ?
		else if(borderleftcolor=="#ffffff"){item.style.borderLeftColor="#ffffff";} // ?
		else if(borderleftcolor=="#ff8080"){item.style.borderLeftColor="#336699";} // Main
		else if(borderleftcolor=="#ffb0b0"){item.style.borderLeftColor="#336699";} // Suche
		else if(borderleftcolor=="#999999"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#777777"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#ee0000"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#cccccc"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#904040"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#aa0000"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#ff8888"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#e06060"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#d07070"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#888888"){item.style.borderLeftColor="#cccccc";} // ?
		else if(borderleftcolor=="#666666"){item.style.borderLeftColor="#cccccc";} // ?

		//###################### BORDER RIGHT COLOR ###
		try{borderrightcolor=window.getComputedStyle(item,"").getPropertyValue("border-right-color",false);}
		catch(error){borderrightcolor="#000000";}
		if(document.ids){borderrightcolor="#00000".substr(0,(7-borderrightcolor.toString(16).length))+borderrightcolor.toString(16);}
		else if(borderrightcolor.indexOf('rgb')>-1){
			borderrightcolor=borderrightcolor.split("(")[1].split(")")[0].split(",");
			for(i=0;i<3;i++){
				borderrightcolor[i]=(borderrightcolor[i]*1).toString(16);
				if(borderrightcolor[i]==0){borderrightcolor[i]="00";}
			}
			borderrightcolor="#"+borderrightcolor.join("");
		}
		//if(borderrightcolor!='#000000'){stack2=stack2+borderrightcolor;}
		// Farben ersetzen
		if(borderrightcolor=="#0000ee"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#ffffff"){item.style.borderRightColor="#ffffff";} // ?
		else if(borderrightcolor=="#ff8080"){item.style.borderRightColor="#336699";} // ?
		else if(borderrightcolor=="#ffb0b0"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#999999"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#777777"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#ee0000"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#cccccc"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#904040"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#aa0000"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#ff8888"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#e06060"){item.style.borderRightColor="#336699";} // ?
		else if(borderrightcolor=="#d07070"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#888888"){item.style.borderRightColor="#cccccc";} // ?
		else if(borderrightcolor=="#666666"){item.style.borderRightColor="#cccccc";} // ?

		//###################### BORDER TOP COLOR ###
		try{bordertopcolor=window.getComputedStyle(item,"").getPropertyValue("border-top-color",false);}
		catch(error){bordertopcolor="#000000";}
		if(document.ids){bordertopcolor="#00000".substr(0,(7-bordertopcolor.toString(16).length))+bordertopcolor.toString(16);}
		else if(bordertopcolor.indexOf('rgb')>-1){
			bordertopcolor=bordertopcolor.split("(")[1].split(")")[0].split(",");
			for(i=0;i<3;i++){
				bordertopcolor[i]=(bordertopcolor[i]*1).toString(16);
				if(bordertopcolor[i]==0){bordertopcolor[i]="00";}
			}
			bordertopcolor="#"+bordertopcolor.join("");
		}
		//if(bordertopcolor!='#000000'){stack2=stack2+bordertopcolor;}
		// Farben ersetzen
		if(bordertopcolor=="#0000ee"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#ffffff"){item.style.borderTopColor="#ffffff";} // ?
		else if(bordertopcolor=="#ff8080"){item.style.borderTopColor="#6688bb";} // ?
		else if(bordertopcolor=="#ffb0b0"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#999999"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#777777"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#ee0000"){item.style.borderTopColor="#336699";} // ?
		else if(bordertopcolor=="#cccccc"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#904040"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#aa0000"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#ff8888"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#e06060"){item.style.borderTopColor="#336699";} // ?
		else if(bordertopcolor=="#d07070"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#888888"){item.style.borderTopColor="#cccccc";} // ?
		else if(bordertopcolor=="#666666"){item.style.borderTopColor="#cccccc";} // ?
	}

	//var stack3=']Color:';
	var all = document.getElementsByTagName('*');
	for each(item in all){
		var color;
		try{
			color=window.getComputedStyle(item,"").getPropertyValue("color");
		}
		catch(error){
			color="#000000";
		}
		if(document.ids){
			color="#00000".substr(0,(7-color.toString(16).length))+color.toString(16);
		}
		else if(color.indexOf('rgb')>-1){
			color=color.split("(")[1].split(")")[0].split(",");
			for(i=0;i<3;i++){
				color[i]=(color[i]*1).toString(16);
				if(color[i]==0)
					color[i]="00";
			}
			color="#"+color.join("");
		}
		// Falls nicht durchsichtig und nicht weiss, anzeigen! Wird nur gebraucht, um alle Farbcodes eines Designs anzeigen zu lassen...
		//if((color!='transparent')&&(color!='#ffffff')&&(color!='#000000')){
		//	stack3=stack3+color;
		//}
		// Farben ersetzen
		if(color=="#ee0000"){item.style.color="#003366";} // Links
		else if(color=="#777777"){item.style.color="#777777";} // Beschreibungen (Name, Verzeichnis, Hochschule, Über sich selbst, ...)
		else if(color=="#904040"){item.style.color="#000000";} // Überschriften (Verbindung, Information, Lehrveranstaltungen, Gruppen, Fotoalben, ...)
		else if(color=="#f7f7f7"){item.style.color="#000000";} // ?
		else if(color=="#cccccc"){item.style.color="#cccccc";} // [bearbeiten]
		else if(color=="#e06060"){item.style.color="#000000";} // Überschriften (Account, Allgemeines, Persönliches, Arbeit, ...)
		else if(color=="#d07070"){item.style.color="#000000";} // ?
		else if(color=="#888888"){item.style.color="#888888";} // ausgeblendete Gruppen
	}

	//var colorlist = document.createTextNode(stack2);
	//var colorlist = document.createTextNode("["+temp+"]");
	//try{document.getElementById("Grid-Page-Center-Top").appendChild(colorlist);}catch(e){alert("meh, didn't work, aborted with error"+e);}

function addGlobalStyle(css) {
     var head, style;
     head = document.getElementsByTagName('head')[0];
     if (!head) { return; }
     style = document.createElement('style');
     style.type = 'text/css';
     style.innerHTML = css;
     head.appendChild(style);
}
addGlobalStyle('@import url(http://suwandhi.de/svz/svz_darkblue.css);');

	// Substitute images
	document.getElementById("Grid-Page-Center-Top").style.background='#036 url(http://img22.imageshack.us/img22/7250/svzheaderfillll6.gif) repeat-x top left';
	document.getElementById("Grid-Page-Center-Top-Title").childNodes[1].src='data:image/png;base64,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';
	document.getElementById("Grid-Page-Center-Top-Navigation").style.background='#036 url(http://img22.imageshack.us/img22/7250/svzheaderfillll6.gif) repeat-x top left';