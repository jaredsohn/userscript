// ==UserScript==
// @name           AllianceBoard++
// @description    by Darth Brunus - Modified by ShadowKeeper24
// @version        1.1.55
// @include        http://*stardriftempires.com/*/show/*
// @include        http://*playstarfleet.com/*/show/*
// @include        http://*playstarfleetextreme.com/*/show/*
// ==/UserScript==
// 1.1.55 added defences and satellites icons, updated [help]
// 1.1.50 added ships for universes, added 52 emoticons, added [help]
// 1.1.32 Corrected Issues with the img and nocode tags to work correctly
// 1.1.30 added [nocode] so you can escape the bbcode
// 1.1.25 added ship icons for nova
// 1.1.21 added ship icons for sde
// 1.1.20 Added Some Smilies
// 1.1.10 Removed Delete Checker
// 1.1.00 Modified Script to work with Stardrift Empires as well as Nova Universe

if(location.pathname.match(/^\/(alliances|topics).*/)) {
	
	// Align left the topic subjects
	var subjects = document.getElementsByClassName("subject");
	for(var i = 0; i < subjects.length; i++) {
		subjects[i].setAttribute("style", "text-align: left");
	}
}

// Parse BB code
if(location.pathname.match(/^\/topics.*/)) {
	
	var msgArray = document.getElementsByClassName("body");
	for(var i = 0; i < msgArray.length; i++) {
	
	var helpme;
	re = new RegExp("\\[help\\]", "gi");
	helpme = "[nocode][b]Bold[/b][/nocode] = [b]Bold[/b]\r\n<br>\r\n";
    helpme += "[nocode][i]Italicize[/i][/nocode] = [i]Italicize[/i]\r\n<br>\r\n";
    helpme += "[nocode][u]Underline[/u][/nocode] = [u]Underline[/u]\r\n<br><br>\r\n";

    helpme += "[nocode][url]http://www.google.com[/url][/nocode] = [url]http://www.google.com[/url]\r\n<br>\r\n";
    helpme += "[nocode][url=\"http://www.google.com\"]Google[/url][/nocode] = [url=\"http://www.google.com\"]Google[/url]\r\n<br><br>\r\n";

    helpme += "[nocode][size=\"15\"]Bigger[/size][/nocode] = [size=\"15\"]Bigger[/size]\r\n<br>\r\n";
    helpme += "[nocode][font=\"MATURA MT\"]Font MATURA MT[/font][/nocode] = [font=\"MATURA MT\"]Font MATURA MT[/font]\r\n<br>\r\n";
    helpme += "[nocode][color=\"red\"]red[/color][/nocode] = [color=\"red\"]red[/color]\r\n<br><br>\r\n";

    helpme += "[nocode][img]http://stardriftempires.com/images/syfy/ship_templates/icon_poseidon_class.png[/img][/nocode] = [img]http://stardriftempires.com/images/syfy/ship_templates/icon_poseidon_class.png[/img]\r\n<br><br>\r\n";

    helpme += "[nocode]:)[/nocode] = :)\r\n<br>\r\n";
    helpme += "[nocode]B)[/nocode] = B)\r\n<br>\r\n";
    helpme += "[nocode]:D[/nocode] = :D\r\n<br>\r\n";
    helpme += "[nocode]:([/nocode] = :(\r\n<br>\r\n";
    helpme += "[nocode];)[/nocode] = ;)\r\n<br><br>\r\n";

    helpme += "[nocode]icon_athena_class[/nocode] = icon_athena_class\r\n<br>\r\n";
    helpme += "[nocode][ship]hades[/ship][/nocode] = [ship]hades[/ship]\r\n<br><br>\r\n";
	
    helpme += "[nocode]icon_pulse_cannon[/nocode] = icon_pulse_cannon\r\n<br>\r\n";
    helpme += "[nocode][defence]missle[/defence][/nocode] = [defence]missle[/defence]\r\n<br><br>\r\n";
	
    helpme += "[nocode]icon_pulse_cannon[/nocode] = icon_pulse_cannon\r\n<br>\r\n";
    helpme += "[nocode][defence]missle[/defence][/nocode] = [defence]missle[/defence]\r\n<br><br>\r\n";
	
    helpme += "[nocode][defence]abm[/defence][/nocode] = [defence]abm[/defence]\r\n<br>\r\n";
    helpme += "[nocode][defence]ibm[/defence][/nocode] = [defence]ibm[/defence]\r\n<br><br>\r\n";
	
    helpme += "[nocode][nocode][color=red]red[/color][/nocode][/nocode] = [color=red]red[/color] - Does not encode the BBCODE\r\n<br><br>\r\n"; 

	helpme += "[nocode][help][/nocode] = Displays this help\r\n<br><br>\r\n";
	
	helpme += "For even more smilies that we can use here, visit <a href='http://community.klipsch.com/forums/p/83596/837817.aspx'>Klipsch</a> website.";
	
	msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, helpme);
	
	//[nocode] - allows to bypass bbcode
	re = new RegExp("\\[nocode\\](.*?)\\[/nocode\\]", "i");
	var content;
	content = re.exec(msgArray[i].innerHTML);
	while (content != null){
	    content=RegExp.$1;
	    content = content.replace(/\[/g,"%5B").replace(/\]/g,"%5D").replace(/_/g,"%5F").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\:/g,"%3A").replace(/\;/g,"%3B");
	    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, content);
	    content = re.exec(msgArray[i].innerHTML);
	}
			
	//[img] done this way to avoid conflicts
    re = new RegExp("\\[img\\](.*?)\\[/img\\]", "i");
    content = re.exec(msgArray[i].innerHTML);
	while (content != null){
	    content=RegExp.$1;
	    content = content.replace(/_/g,"%5F");
	    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='" + content + "' />");
	    content = re.exec(msgArray[i].innerHTML);
	}
	
	//Basic BBCode section
	//Bold / Italicize / Underline
		var re = new RegExp("\\[(b|i|u)\\](.*?)\\[\/\\1\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<$1>$2</$1>");
		
	//URL's
		re = new RegExp("\\[url\\](.*?)\\[/url\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<a href='$1'>$1</a>");
		
		re = new RegExp("\\[url=\"([^\\]]*?)\"\\](.*?)\\[/url\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<a href='$1'>$2</a>");
		
	//Styles
		re = new RegExp("\\[size=\"([^\\]<>;\"]*?)\"\\](.*?)\\[/size\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<span style='font-size: $1pt'>$2</span>");
		
		re = new RegExp("\\[font=\"([^\\]<>;\"]*?)\"\\](.*?)\\[/font\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<span style='font-family: $1'>$2</span>");

		re = new RegExp("\\[color=\"([^\\]<>;\"]*?)\"\\](.*?)\\[/color\\]", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<span style='color: $1'>$2</span>");
		
	
	
	//Smilies with brackets
	var smilieArr = [["Smile" ,"[:)]" ,"1"],["Big Smile" ,"[:D]" ,"2"],["Surprise" ,"[:O]" ,"3"],["Razz" ,"[:P]" ,"4"],["Wink" ,"[;)]" ,"5"],["Sad" ,"[:(]" ,"6"],["Tounge Tied" ,"[:S]" ,"7"],["Indifferent" ,"[:|]" ,"8"],["Crying" ,"[:'(]" ,"9"],["Embarrassed" ,"[:$]" ,"10"],["Cool" ,"[H]" ,"11"],["Angry" ,"[:@]" ,"12"],["Angel" ,"[A]" ,"13"],["Devil" ,"[6]" ,"14"],["Geeked" ,"[8-|]" ,"15"],["Zip It!" ,"[:#]" ,"16"],["Whisper" ,"[:-*]" ,"17"],["Huh?" ,"[:^)]" ,"18"],["Put me to sleep / Boring" ,"[|-)]" ,"20"],["Thumbs Up / Yes!" ,"[Y]" ,"21"],["Beer!" ,"[B]" ,"22"],["Left Hug" ,"[{]" ,"24"],["Music Note" ,"[8]" ,"29"],["Clock" ,"[O]" ,"31"],["Snail" ,"[sn]" ,"32"],["Pizza Slice" ,"[pi]" ,"33"],["Automobile" ,"[au]" ,"34"],["Umbrella" ,"[um]" ,"35"],["Computer" ,"[co]" ,"36"],["Rain Storm" ,"[st]" ,"37"],["Moons" ,"[mo]" ,"38"],["Super Angry" ,"[8o|]" ,"39"],["Hmmm...?" ,"[^o)]" ,"40"],["Ick!" ,"[+o(]" ,"41"],["Confused" ,"[*-)]" ,"42"],["Roll Eyes" ,"[8-)]" ,"43"],["Cuppa Coffee" ,"[C]" ,"44"],["Thumbs Down / No!" ,"[N]" ,"45"],["Cocktails / Martini" ,"[D]" ,"46"],["Person" ,"[Z]" ,"47"],["Right Hug" ,"[}]" ,"48"],["Birthday Cake" ,"[^]" ,"49"],["Broken Heart" ,"[U]" ,"50"],["Gift" ,"[G]" ,"51"],["Wilted Flower" ,"[W]" ,"52"],["Movie Reel" ,"[~]" ,"53"],["Idea / Light Bulb" ,"[I]" ,"55"],["Silver Moon" ,"[S]" ,"56"],["E-Mail" ,"[E]" ,"57"],["Jet / Airplane" ,"[ap]" ,"58"],["Paradise" ,"[ip]" ,"59"],["Lightning" ,"[li]" ,"60"]];
	
    re = new RegExp("\\[:\\)\\]|\\[:D\\]|\\[:O\\]|\\[:P\\]|\\[;\\)\\]|\\[:\\(\\]|\\[:S\\]|\\[:\\|\\]|\\[:'\\(\\]|\\[:\\$\\]|\\[H\\]|\\[:@\\]|\\[A\\]|\\[6\\]|\\[8-\\|\\]|\\[:#\\]|\\[:-\\*\\]|\\[:\\^\\)\\]|\\[\\|-\\)\\]|\\[Y\\]|\\[B\\]|\\[\\{\\]|\\[8\\]|\\[O\\]|\\[sn\\]|\\[pi\\]|\\[au\\]|\\[um\\]|\\[co\\]|\\[st\\]|\\[mo\\]|\\[8o\\|\\]|\\[\\^o\\)\\]|\\[\\+o\\(\\]|\\[\\*-\\)\\]|\\[8-\\)\\]|\\[C\\]|\\[N\\]|\\[D\\]|\\[Z\\]|\\[\\}\\]|\\[\\^\\]|\\[U\\]|\\[G\\]|\\[W\\]|\\[~\\]|\\[I\\]|\\[S\\]|\\[E\\]|\\[ap\\]|\\[ip\\]|\\[li\\]", "i");
    content = re.exec(msgArray[i].innerHTML);
	while (content != null){
	    var sText="";
		var sLoc="";
		content = content.toString();// + " "
	    //content = content.slice(1, content.length-1);
		for(var y=0; y<smilieArr.length; y++) {
          if(smilieArr[y][1]==content){
		      sText = smilieArr[y][0];
			  sLoc = smilieArr[y][2];
			  break;
		  };
        };

		//alert(content);
	    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://forums.klipsch.com/emoticons/emotion-" + sLoc + ".gif' alt='" + sText + "' title='" + sText + "' border='0' />");
	    content = re.exec(msgArray[i].innerHTML);
	}
	
		re = new RegExp(":\\)", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://freesmileyface.net/smiley/happy/happy-134.png' alt='Happy' border='0' />");
		
		re = new RegExp("B\\)", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://freesmileyface.net/smiley/happy/happy-121.gif' alt='Cool' border='0' />");
		
		re = new RegExp(":D", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://freesmileyface.net/smiley/happy/happy-097.png' alt='Very Happy' border='0' />");
		
		re = new RegExp(":\\(", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://freesmileyface.net/smiley/sad/sad-019.gif' alt='Sad' border='0' />");
		
		re = new RegExp(";\\)", "gi");
		msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://freesmileyface.net/smiley/winks/icon_wink.gif' alt='Wink' border='0' />");
	
	//SDE and Nova Ship/Defence Grahpics
	    var loc;
        if(window.location.hostname.match("stardriftempires.com")) {
		    loc = "stardriftempires.com/images/syfy/";
		}
		else
		{
		    loc = "nova.playstarfleet.com/images/starfleet/";
		}
	        
			//ships
            re = new RegExp("Icon_(.*?)_class", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"ship_templates/icon_$1_class.png' alt=' $1 ' title='$1' height='20' width='40' border='0' />");
		
		    re = new RegExp("\\[ship\\](.*?)\\[/ship\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"ship_templates/icon_$1_class.png' alt=' $1 ' title='$1' height='20' width='40' border='0' />"); 
			
            re = new RegExp("icon_regen_solar_satellite|\\[defence\\]genesis\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_missile_turret.png' alt=' genesis ' title='genesis' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_solar_satellite|\\[defence\\]helios\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_missile_turret.png' alt=' helios ' title='helios' height='20' width='40' border='0' />");
			
			//Defences			
            re = new RegExp("Icon_missile_turret|\\[defence\\]missle\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_missile_turret.png' alt=' missile turrent ' title='missile turrent' height='20' width='40' border='0' />");
			
            re = new RegExp("Icon_laser_turret|\\[defence\\]laser\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_laser_turret.png' alt=' laser turrent ' title='laser turrent' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_pulse_cannon|\\[defence\\]pulse\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_pulse_cannon.png' alt=' pulse cannon ' title='pulse cannon' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_particle_cannon|\\[defence\\]particle\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_particle_cannon.png' alt=' particle cannon ' title='particle cannon' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_antiballistic_missile|\\[defence\\]abm\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_antiballistic_missile.png' alt=' antiballistic missile ' title='antiballistic missile' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_decoy|\\[defence\\]decoy\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_decoy.png' alt=' decoy ' title='decoy' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_interplanetary_missile|\\[defence\\]ibm\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_interplanetary_missile.png' alt=' interplanetary missle ' title='interplanetary missle' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_gauss_cannon|\\[defence\\]gauss\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_gauss_cannon.png' alt=' gauss cannon ' title='gauss cannon' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_large_decoy|\\[defence\\]large decoy\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_large_decoy.png' alt=' large decoy ' title='large decoy' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_plasma_turret|\\[defence\\]plasma\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_plasma_turret.png' alt=' plasma turrent ' title='plasma turrent' height='20' width='40' border='0' />");
			
            re = new RegExp("icon_space_mine|\\[defence\\]mine\\[/defence\\]", "gi");
		    msgArray[i].innerHTML = msgArray[i].innerHTML.replace(re, "<img src='http://"+ loc +"defense_templates/icon_space_mine.png' alt=' space mine ' title='space mine' height='20' width='40' border='0' />");
		
	//Decodes the nocode and img tags
	msgArray[i].innerHTML = msgArray[i].innerHTML.replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/%5F/g,"_").replace(/%28/g,"(").replace(/%29/g,")").replace(/%3A/g,":").replace(/%3B/g,";");
	
	
	}
}