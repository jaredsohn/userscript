// ==UserScript==
// @name           No SC2@TLnet
// @namespace      No SC2_TL.net
// @description    Removes the SC2 section from the TeamLiquid.net menu.
// @include        http://www.teamliquid.net/*
// ==/UserScript==

//Made by quirinus -> http://www.teamliquid.net/forum/profile.php?user=quirinus




	var divArray = document.body.getElementsByTagName('div');
	var divArray_len=divArray.length;
	for (i=0;i<divArray_len;i++) {
		
		if (divArray[i].style.cssText=="font-size: 8pt;") {
			var streams_mess=divArray[i];
			var streams_mess_backup=streams_mess.innerHTML;
			break;
		}
	}
	
	
	var stream_lines=streams_mess.innerHTML.split("<br>");
	var stream_lines_len=stream_lines.length;
	var new_stream_lines = new Array();
	for (i=0;i<stream_lines_len;i++) {
		if (stream_lines[i].indexOf('[SC2]')!=-1) {
			continue;
		}
		if (stream_lines[i].indexOf('[Misc]')!=-1) {
			if (stream_lines[i].indexOf('\u2192')==-1) {
				continue;
			}
		}
		new_stream_lines.push(stream_lines[i]);
	}
	
	var new_stream_mess=new_stream_lines.join('<br>');


var s_SC2_onoff = GM_getValue('s_SC2_onoff', 'show');
	
	if (s_SC2_onoff=='show') {
		streams_mess.innerHTML=streams_mess_backup;
		s_SC2_onoff_text="Hide SC2 Streams";
	}
	else {
		streams_mess.innerHTML=new_stream_mess;
		s_SC2_onoff_text="Show SC2 Streams";
	}
	
	var s_sc2_in=document.createElement("a");
	s_sc2_in.id="s_sc2_button";
	s_sc2_in.style.position="absolute";
	s_sc2_in.style.right="0.2em";
	s_sc2_in.style.top="2em";
	s_sc2_in.style.cursor = 'pointer';
	var s_txtt=document.createTextNode(s_SC2_onoff_text);
	s_sc2_in.appendChild(s_txtt);
	document.body.appendChild(s_sc2_in);





	
	
	

	
	
	




	var SC2_onoff = GM_getValue('SC2_onoff', 'show');
	var x=document.getElementById('nav_starcraft2');
	
	if (SC2_onoff=='show') {
		x.style.display='block';
		x.nextSibling.style.display='block';
		SC2_onoff_text="Hide SC2 Subforum";
	}
	else {
		x.style.display='none';
		x.nextSibling.style.display='none';
		SC2_onoff_text="Show SC2 Subforum";
	}
	
	var sc2_in=document.createElement("a");
	sc2_in.id="sc2_button";
	sc2_in.style.position="absolute";
	sc2_in.style.right="0.2em";
	sc2_in.style.top="0.8em";
	sc2_in.style.cursor = 'pointer';
	var txtt=document.createTextNode(SC2_onoff_text);
	sc2_in.appendChild(txtt);
	document.body.appendChild(sc2_in);
	
	
	
	document.addEventListener('click', function(event) {			
		var id=event.target.id;
		if (id==sc2_in.id) {
			if (SC2_onoff=='show') {
				sc2_in.innerHTML="Hide SC2 Subforum";
				GM_setValue("SC2_onoff", 'show');
				SC2_onoff='hide';
				x.style.display='block';
				x.nextSibling.style.display='block';
			}
			else {
				sc2_in.innerHTML="Show SC2 Subforum";
				GM_setValue("SC2_onoff", 'hide');
				SC2_onoff='show';
				x.style.display='none';
				x.nextSibling.style.display='none';
			}
		}
		

		if (id==s_sc2_in.id) {
			if (s_SC2_onoff=='show') {
				s_sc2_in.innerHTML="Hide SC2 Streams";
				GM_setValue("s_SC2_onoff", 'show');
				s_SC2_onoff='hide';
				streams_mess.innerHTML=streams_mess_backup;
			}
			else {
				s_sc2_in.innerHTML="Show SC2 Streams";
				GM_setValue("s_SC2_onoff", 'hide');
				s_SC2_onoff='show';
				streams_mess.innerHTML=new_stream_mess;
			}
		}
		
		
	}, true);
