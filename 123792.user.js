// ==UserScript==
// @name           SF - Tools
// @namespace     http://open-sys.info
// @author         virus [BP]
// @description  Einige nuetzliche Addons fuer das Browsergame " http://space-fights.de "
// @include        http://www.space-fights.de/galaxy1/*
// ==/UserScript==

/*
SF Tools V 0.1.3 , ein Greasemonkey-Userscript das einige nuetzliche Addons in das Game einfuegt.

Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der Creative Commons Attribution 2.0 License, weitergeben und/oder modifizieren.
( http://creativecommons.org/licenses/by-nc-sa/2.0/de/ )

Solltest du Verbesserungsvorschlaege haben oder Fehler ( Bugs ) finden kannst du mich ueber meine E-Mail Adresse oder als Ingame PM an virus [  BP ] erreichen.

Copyright (C) 2008 by VIRUS [ BP ] virus@projekt-x.info
*/

// Seiten URL
side_url = document.location.href;
side_hei = document.body.offsetHeight+50;

// Version
sf_tools_version = "0.1.3";

// Sonstige Var
day = ( new Date() ).getDay();

// Bilder ( Base64 codiert )
sft_calc_img = "iVBORw0KGgoAAAANSUhEUgAAAAkAAAALCAIAAAAiOzBMAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAA5SURBVHjaYmFYeo8BB2ABYq+lOZgS26KnsMBZyBIQ1SzIHDTAhKwPmQQCRqBbcNlHb32MeMIFIMAApHQm0lWdissAAAAASUVORK5CYII=";

// CSS ------------------------------------------------------------------------------------------------------------------------------
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = " TEST ";
    head.appendChild(style);
}

	// FO 10
   GM_addStyle('.fos_10           { font-size: 10px !important; }' +
               '.tbb              { background:#333333; }'+
			   '.sitefooter       { color:#ffffff;line-height:15px;background:#494949;border:1px solid #666666;-moz-opacity:.75; }'+
			   '.sitefooter:hover { -moz-opacity:1;}'+
			   '.m_sys            { width:20px;height:20px;font-size:10px;text-align:center;background:#494949;border:1px solid #666666;-moz-opacity:.75;cursor:pointer;}' +
			   '.m_sys:hover      { background:#00436C;-moz-opacity:1;}'+
			   'a.navi            { padding:2px 0 2px 4px;-moz-border-radius:5px; }'+
			   'body              { cursor:default; }'+
			   'td,input,textarea { -moz-border-radius:5px; }'+
			   'textarea          { width:100% !important; }'+
			   '#dia_1            { width:98%;border:1px solid #ffffff;margin:auto;overflow:auto; }'+
			   '#dia_2            { height:5px;background:#6ED2FA;float:left; }'
   );


// Konfigurationsmenü ---------------------------------------------------------------------------------------------------------------
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
    // Load current value into variable
    window[key] = GM_getValue(key, defaultValue);
    // Add menu toggle
    GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
	location.reload();

    });
}

// Zitatfunktion  - EIN / AUS
makeMenuToggle('sft_zitat', true, "ON", "OFF", "Zitatfunktion");

// Beschreibungen  - EIN / AUS
makeMenuToggle('sft_besch', true, "ON", "OFF", "Beschreibungen");


// Eingabe Signatur
GM_registerMenuCommand('Auto - SIG',
        function() {
            sig = prompt('Signatur', GM_getValue('sig'));
            GM_setValue('sig', sig);
        }
);

// Eingabe Ally TAG
GM_registerMenuCommand('Ally TAG',
        function() {
            ally_tag = prompt('Ally TAG', GM_getValue('ally_tag'));
            GM_setValue('ally_tag', ally_tag);
        }
);

// Eingabe MyLinks
GM_registerMenuCommand('My - LINK',
        function() {
            link = prompt('Links', GM_getValue('sft_my_link'));
            GM_setValue('sft_my_link', link);
        }
);

// Eingabe bevorzugter Handelplanet
GM_registerMenuCommand('Handelsplanet ID',
        function() {
            trade_plani = prompt('Handelsplanet ID\n\n( zum deaktivieren 0 eingeben )' , GM_getValue('sft_trade_plani'));
            GM_setValue('sft_trade_plani', trade_plani);
        }
);

// Eingabe Rundenende
GM_registerMenuCommand('Rundenende',
        function() {
            round_end = prompt('Rundenende als UNIXZEIT\n\n( zum deaktivieren 0 eingeben )', GM_getValue('sft_round_end'));
            GM_setValue('sft_round_end', round_end);
        }
);

// Check My Link
if ( !GM_getValue('sft_my_link') ) {
	 GM_setValue('sft_my_link', '');
}

// Check Ally TAG
if ( !GM_getValue('ally_tag') ) {
	 GM_setValue('ally_tag', '');
}

// Check Ally TAGs ( Alle Allys )
if ( !GM_getValue('ally_tags') ) {
	 GM_setValue('ally_tags', '');
}

// Check SIG
if ( !GM_getValue('sig') ) {
	 GM_setValue('sig', '');
}

// Chat Stop
if ( !GM_getValue('sft_chat_stop') ) {
	 GM_setValue('sft_chat_stop', '0');
}

// Rundenende -----------------------------------------------------------------------------------------------------------
if ( typeof(GM_getValue('sft_round_end')) != "undefined" && GM_getValue('sft_round_end') != 0 ) {
     time_ist = new Date().getTime() / 1000;
	 sec = GM_getValue('sft_round_end')-time_ist;
}
else {
     sec = false;
}


// Inline JS -------------------------------------------------------------------------------------------------------------
function insert_js(){
  var head = document.getElementsByTagName('head').item(0)
  script = document.createElement('script');
  script.type = 'text/javascript';
  head.appendChild(script);
}


// Rangliste
function insert_rangliste_js(){
  insert_js();
  script.innerHTML =

  'function sft_inline_highlight(tag){ '+

  'all_td  = document.getElementsByTagName("td");'+
  'pattern = eval("/>"+tag+"</g");'+

  '   for (i = 48; i <= all_td.length-1; i++) {'+
  '        if ( all_td[i].className == "tbcb" ) all_td[i].className = "tbc"; '+
  '        if ( all_td[i].innerHTML.search(pattern) != -1 && all_td[i].innerHTML.search(/allianzen/g) != -1)  {'+
  '             start = i-3;'+
  '			    for ( z = 0; z < 5; z++ ) {'+
  '			        all_td[start].className = "tbcb";'+
  '			        start++;'+
  '             }'+
  '             if ( typeof last_tag != "undefined" ) document.getElementById(last_tag).style.backgroundColor = "";'+
  '             document.getElementById(tag).style.backgroundColor = "#694949";'+
  '             last_tag = tag;'+
  '             i++;'+
  '        }'+
  '        else if ( all_td[i].innerHTML == "&nbsp;" && tag == "allylos" ) {'+
  '             start = i-3;'+
  '			    for ( z = 0; z < 5; z++ ) {'+
  '			        all_td[start].className = "tbcb";'+
  '			        start++;'+
  '             }'+
  '             if ( typeof last_tag != "undefined" ) document.getElementById(last_tag).style.backgroundColor = "";'+
  '             document.getElementById(tag).style.backgroundColor = "#694949";'+
  '             last_tag = tag;'+
  '             i++;'+
  '        }'+
  '  } }'+
  'function sft_show_rang(){ '+
  '   document.forms[0].plaetze.value = document.getElementById(\'show_rang\').value;'+
  '   document.forms[0].submit();'+
  '   return false;'+
  '}';
}

// Nachrichten
function insert_nachrichten_js(){
  insert_js();
  script.innerHTML =

  'function sft_check_rows(){ '+
  '   document.forms[0].text.rows = document.forms[0].text.value.match(/\\n/gi, "").length+2;'+
  '}';
}

// Flotten
function insert_flotten_js(max,res){
  insert_js();
  script.innerHTML =

  ' max = '+max+'; '+
  ' res = new Array('+res+'); '+

  'function sft_calc(art){ '+
  '   res_ist = 0; '+
  '   if ( art == "1" ) { '+
  '        for (var za = 0; za < res.length; za++) {'+
  '             res_ist = res_ist + ( document.forms.rsform[inputs[za]].value*res[za] ); '+
  '        } '+
  '   } '+
  '   else { '+
  '        res_ist = ( document.sendform.eisen.value * 1 ) + ( document.sendform.silizium.value * 1 )  + ( document.sendform.wasser.value * 1 ); '+
  '   } '+
  '   pro = ( res_ist / ( max / 100 ) ).toFixed(2); '+
  '   if ( pro > 100 ) pro = 100; '+
  '   if ( res_ist > max ) res_ist = max; '+
  '   document.getElementById("calc_out").innerHTML = pro+" %"; '+
  '   document.getElementById("calc_out_2").innerHTML = res_ist; '+
  '   document.getElementById("calc_out_3").innerHTML = ( 100 - pro ).toFixed(2) +" %"; '+
  '   document.getElementById("calc_out_4").innerHTML = ( max - res_ist ); '+
  '   document.getElementById("dia_2").style.width = pro+"%"; '+
  '}'+

  'function show_time(time){ '+
  '   document.getElementById("st").innerHTML = "<b>Ankunftszeit:</b>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;"+time; '+
  '}';
  
}

// Handel Parser
function insert_handel_js(){
  insert_js();
  left = (screen.availWidth - 730) / 2;
  top  = (screen.availHeight - 260) / 2;
  script.innerHTML =
  
  ' function pu(da) { '+
  '    url = "http://open-sys.info/sft_ha,"+da; '+
  '    tw = window.open(url,"opensys","width=730,height=260, top='+top+',left='+left+',toolbar=no,directories=no,status=no,scrollbars=no,resizable=no,menubar=no"); '+
  '    tw.focus(); '+
  '}';
  
}


// TD - Split
function split_td(){
 return document.getElementsByTagName("td");
}

// Sitefooter
function sft_last_td(){
    last_td = split_td();
	return last_td[last_td.length-1];
}

// Number Format
function nf(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + '.' + '$2');
	}
	return x1 + x2;
}

// EX Number
function sft_ex_num(string){
   return Number( string.replace(/\D/g, ""));
}

function rand(range) {
   return Math.ceil(Math.random() * 1000) % range + 1;
}

// Trim ( Lehzeichen entfernen ) 
function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


// Suchen und ausgeben der Position im Array ( THX @ Gumbo -> http://www.tutorials.de/forum/javascript-ajax/302422-index-position-eines-elementes-einem-array-ausgeben.html ) 
Array.prototype.search = function( value, strict ) {

	if( typeof value == "undefined" ) {
		return false;
	}
	
    var retVal = false;
	    
	if ( strict ) {
	   for ( key in this ) {
		   if ( this[key] === value ) {
			   retVal = key;
			    break;
		   }
	   }
    }
	else {
	     for ( key in this ) {
		     if ( this[key] == value ) {
			    retVal = key;
			    break;
		     }
	     }
    }	    
	return retVal*1;
}


// Seitenaufrufe zählen
function sft_count_reloads(){

	if ( GM_getValue('sft_reloads') ) {
	     sft_reloads = GM_getValue('sft_reloads').split(",");

		 if ( sft_reloads[0] != day ) {
		      sft_reloads[0] = day;
			  sft_reloads[1] = 0;
		 }

		 sft_reloads[1]++;
		 sft_reloads[2]++;

		 save = sft_reloads[0]+','+sft_reloads[1]+','+sft_reloads[2];

		 GM_setValue('sft_reloads', save);
    }
	else {
		 sft_reloads = day+',1,1';
		 GM_setValue('sft_reloads', sft_reloads);
		 sft_reloads = new Array(day,1,1);
	}

}


// Chatbeiträge zählen
function sft_count_chat(){

	if ( GM_getValue('sft_chat_counter') ) {
	     sft_chat_counter = GM_getValue('sft_chat_counter').split(",");

		 if ( sft_chat_counter[0] != day ) {
		      sft_chat_counter[0] = day;
			  sft_chat_counter[1] = 0;
		 }

		 sft_chat_counter[1]++;
		 sft_chat_counter[2]++;

		 save = sft_chat_counter[0]+','+sft_chat_counter[1]+','+sft_chat_counter[2];

		 GM_setValue('sft_chat_counter', save);
    }
	else {
		 sft_chat_counter = day+',1,1';
		 GM_setValue('sft_chat_counter', sft_chat_counter);
		 sft_chat_counter = new Array(day,1,1);
	}

}



// Sitefooter Menue
function sft_sitefooter() {
    last_td = sft_last_td();
	link_out = "";

	if ( GM_getValue('sft_my_link') != "" ) {
	     link_all = ( GM_getValue('sft_my_link') ).split("@");

		 for (var i = 0; i < link_all.length; i++) {
		      link       = link_all[i].split(",");
			  link_out  += '|&#160;<a target="_blank" href="'+link[1]+'">'+link[0]+'</a>&#160;';
		 }
	}

	last_td.innerHTML = '<div id="footer_left" class="small" style="width:90%;text-align:left;float:left";>&#160;<b><em>SF-Tools V '+sf_tools_version+'</em></b>&#160;|&#160;<b>Reloads:</b>&#160;&#160;'+nf(sft_reloads[1])+'&#160;/&#160;'+nf(sft_reloads[2])+'&#160;|&#160;<a target="_blank" title="Überprüfe ob deine Version '+sf_tools_version+' aktuell ist" href="http://open-sys.info/tools_updatecheck,'+sf_tools_version+'">Updatecheck</a>&#160;'+link_out+'</div><div id="footer_right" class="small" style="width:10%;float:left"></div>';
}


// Rundentimer ( root )
function sft_count(sec) {

    if ( typeof sec_s != "undefined" ) sec = sec_s;

	if ( sec > 0 ){
	    window.sec_s = sec-1;

    	h   = parseInt(sec/(60*60));
	    sec = sec-(h*(60*60));

		m   = parseInt(sec/(60));
	    sec = sec-(m*(60));

		s   = parseInt(sec);

        if ( h < 10 ) h ="0"+h;
		if ( m < 10 ) m ="0"+m;
		if ( s < 10 ) s ="0"+s;

		tstr = h+":"+m+":"+s;

		document.getElementById("footer_right").innerHTML = '<a target="_blank" href="http://open-sys.info/rundentimer">'+tstr+'</a>&#160;';

		window.setTimeout(sft_count, 1000);

	}
	else  {
		  document.getElementById("footer_right").innerHTML = "- Closed -";
	}

}


// Bau + Flugzeiten Rechner
function sft_time_calc(sec,art) {

    out = "";

	for (it = 1; it <= art; it++) {

		t = sec.split(":");
		t = ( t[0]*3600*it ) + ( t[1]*60*it ) + eval(t[2]*it);

		end_bz = new Date();
		end_bz = end_bz.getTime();
		end_bz = end_bz+(t*1000);
		end_bz = new Date(end_bz);

		day   = end_bz.getDate();
		month = end_bz.getMonth()+1;
		year  = end_bz.getYear();

		std   = end_bz.getHours();
		min   = end_bz.getMinutes();
		secu  = end_bz.getSeconds();

		if ( day < 10 ) day = "0" + day;
		if ( month < 10 ) month = "0" + month;
		if ( year < 1000 ) year += 1900;

		if ( std < 10 ) std = "0" + std;
		if ( min < 10 ) min = "0" + min;
		if ( secu < 10 ) secu = "0" + secu;

		out += ''+day+'.'+month+'.'+year+' - '+std+':'+min+':'+secu+' | '

    }

	return 	out.substring(0,out.length-3);

}


// Bauzeiten Check ( gebaeude.php | forschung.php )
function sft_bzc(){

	all_td = split_td();

	for (i = 0; i <= all_td.length-1; i++) { 
	    if ( all_td[i].innerHTML.search(/eisen.gif/g) != -1  ) {
		     eisen_ist = all_td[i+7].innerHTML.replace(/\./g, "");
			 sili_ist  = all_td[i+8].innerHTML.replace(/\./g, "");
			 h2o_ist   = all_td[i+9].innerHTML.replace(/\./g, "");
			 eng_ist   = all_td[i+10].innerHTML.split("/");
	    }
		else if ( all_td[i].innerHTML == "Ausbau benötigt:" || all_td[i].innerHTML == "Forschung benötigt:" ) {
		         kosten = all_td[i+1].innerHTML.split(",");
				 eisen_k = Math.floor( eisen_ist - ( kosten[0].replace(/\./g, "") ).match(/\d+/g, "") );
				 sili_k  = Math.floor( sili_ist - ( kosten[1].replace(/\./g, "") ).match(/\d+/g, "") );
				 h2o_k   = Math.floor( h2o_ist - ( kosten[2].replace(/\./g, "") ).match(/\d+/g, "") );
				 out     = "";

				 function sft_format_out(menge,art){
			        menge = ''+menge+'';
			        menge = nf(menge.replace(/\-/g, ""));

			        return(menge+' '+art+' | ');
	            }

				 if ( eisen_k < 0 )  out += sft_format_out(eisen_k,"Eisen");
				 if ( sili_k < 0 )   out += sft_format_out(sili_k,"Silizium");
				 if ( h2o_k < 0 )    out += sft_format_out(h2o_k,"Wasser");

				 if ( kosten.length == 4 ) {
				     eng_k   = Math.floor( eng_ist - ( kosten[3].replace(/\./g, "") ).match(/\d+/g, "") );
					 if ( eng_k < 0 )    out += sft_format_out(eng_k,"Energie");
				 }

				 out = ( out.substring(0,out.length-3) ).replace(/\|/g, '<span style="color:#D6D6D6;">|</span>');

                 // Bugfix [ fehlendes Bild ] -------------------------------------------------------------------------------
				 iz = 3;
				 if ( all_td[i-3].innerHTML.search(/img/g) != -1 ) { iz = 4 };

				 all_td[i-iz].innerHTML = '<div style="width:30%;float:left;">'+all_td[i-iz].innerHTML+'</div><div class="stt" style="width:70%;text-align:right;line-height:14px;float:left;">'+out+'</div>';


		}
		else if ( all_td[i].innerHTML == "Bauzeit:" || all_td[i].innerHTML == "Forschungszeit:" ) {

			    all_td[i+1].innerHTML += '&#160;&#160;<small>( '+sft_time_calc(all_td[i+1].innerHTML,1)+' )</small>';

			    if ( sec != false && t > sec ) {
			       all_td[i+2].style.color = "#ff0000";
			       all_td[i+2].innerHTML = "[ Gesperrt ]";
                }

				if ( GM_getValue('sft_besch') != "undefined" && GM_getValue('sft_besch') == false ) {
				     all_td[i-3].style.display = 'none';
				}


	    }
		else if ( all_td[i].innerHTML == '<a href="gebaeude.php?f=abbrechen">[Abbrechen]</a>' ) {
		        all_td[i].innerHTML = '<a href="gebaeude.php?f=abbrechen" onClick="return confirm(\'Bauauftrag abbrechen ?\')">[Abbrechen]</a>';
        }
		else if ( all_td[i].innerHTML == '<a href="forschung.php?f=abbrechen">[Abbrechen]</a>' ) {
		        all_td[i].innerHTML = '<a href="forschung.php?f=abbrechen" onClick="return confirm(\'Forschungsauftrag abbrechen ?\')">[Abbrechen]</a>';
        }

	}
}


// Max Ship / Deff ( raumschiffe.php | verteidigung.php )
function sft_max_bau(){

	all_td = split_td();
	f = 0;

	for (i = 0; i <= all_td.length-1; i++) {
	    if ( all_td[i].innerHTML.search(/eisen.gif/g) != -1  ) {
		     eisen_ist = all_td[i+7].innerHTML.replace(/\./g, "");
			 sili_ist  = all_td[i+8].innerHTML.replace(/\./g, "");
			 h2o_ist   = all_td[i+9].innerHTML.replace(/\./g, "");
			 rob_ist   = all_td[i+11].innerHTML.split("/");

	    }
		else if ( all_td[i].innerHTML == '<b>Neuer Bauauftrag</b>'  ) {
		          t = all_td[i+7].innerHTML.split(":");
				  t = ( t[0]*3600 ) + ( t[1]*60 ) + eval(t[2]);

				  if ( sec != false && t > sec ) {
			           all_td[i+10].style.color = "#ff0000";
			           all_td[i+10].innerHTML = "[ Gesperrt ]";
                  }
				  f++;
		}
		else if ( all_td[i].innerHTML == 'Bau benötigt:'  ) {
		          f++;
		          kosten    = all_td[i+1].innerHTML.split(",");
				  eisen_max = Math.floor( eisen_ist / ( kosten[0].replace(/\./g, "") ).match(/\d+/g, "") );
				  sili_max  = Math.floor( sili_ist / ( kosten[1].replace(/\./g, "") ).match(/\d+/g, "") );
				  h2o_max   = Math.floor( h2o_ist / ( kosten[2].replace(/\./g, "") ).match(/\d+/g, "") );
				  rob_max   = Math.floor( rob_ist[0].replace(/\./g, "") / ( kosten[3].replace(/\./g, "") ).match(/\d+/g, "") );

	    	      max_bau = Math.min(eisen_max,sili_max,h2o_max,rob_max);

				  if ( max_bau != 0 ) {
				       if ( max_bau > 999 ) max_bau = 999;
				       document.forms[f].elements.namedItem("anzahl").value = max_bau;
					   document.forms[f].elements.namedItem("anzahl").setAttribute('onfocus', 'this.value = ""');
					   document.forms[f].elements.namedItem("anzahl").setAttribute('onblur' , 'if ( this.value == "" ) this.value = "'+max_bau+'"');
			      }

				  if ( GM_getValue('sft_besch') != "undefined" && GM_getValue('sft_besch') == false ) {
				      all_td[i-3].style.display = 'none';
				  }

        }
		else if ( all_td[i].innerHTML == '<b>Vorhanden</b>'  ) {
		          ship_all = sft_ex_num(all_td[i+2].innerHTML);

				  if   ( side_url.search(/raumschiffe/g) != -1 ) fac = 20;
				  else   fac = 10;

		          for ( iz = 4; iz < fac; iz++ ) {
				        ship_all = ( ship_all + ( sft_ex_num(all_td[i+iz].innerHTML) ) ) ;
						iz++;
				  }

				  all_td[i+1].innerHTML = all_td[i+1].innerHTML+'<center><img src="../design/8ln.gif" height="3" width="130"><br/>Gesamt:&#160;'+nf(ship_all)+'</center>';

      }
	}
}

// Rangliste Highlight (  rangliste.php  )
function sft_high_ally_members(){

	all_td           = split_td();
	pattern          = eval("/>" + GM_getValue('ally_tag') + "</g");
	ally_members     = new Array();
	count_newbis = 0;

	// Member Counter
   function sft_count_members(y){

	   if ( all_td[y].innerHTML != "&nbsp;" ) {
	        ally_tag_array = all_td[y].innerHTML.split("\">");
	        ally_tag       = ally_tag_array[1].substring(0,ally_tag_array[1].length-4);
	   }
	   else {
	        ally_tag = "allylos";
	   }

	   if ( typeof ally_members[ally_tag] != 'undefined' ) {
		    ally_members[ally_tag] = ally_members[ally_tag]+1;
	   }
	   else {
			ally_members[ally_tag] = 1;
	   }
   }

	// Punktevergleich
   function sft_points(y){

	   ist  = all_td[y-1].innerHTML.replace(/\./g, "");
	   down = nf( ist - ( all_td[y+4].innerHTML.replace(/\./g, "") ) );
       if ( isNaN(down) ) down = "-";
	   all_td[y-1].innerHTML = '<div style="width:60%;float:left;">'+all_td[y-1].innerHTML+'</div><div class="fos_10" style="width:40%;text-align:right;line-height:14px;float:left;">'+down+' &#8595;</div>';

	}

	for (i = 48; i <= all_td.length-1; i++) {
	     if ( all_td[i].innerHTML.search(pattern) != -1 && all_td[i].innerHTML.search(/allianzen/g) != -1)  {
	          start = i-3;
			  for ( z = 0; z < 5; z++ ) {
			        all_td[start].className = 'tbcb';
			        start++;
			  }

			  sft_count_members(i);
			  sft_points(i);

	     }
		 else if ( all_td[i].innerHTML.search(/allianzen/g) != -1 || all_td[i].innerHTML == "&nbsp;")  {
		           sft_count_members(i);
                   sft_points(i);
		 }
		 else if ( all_td[i].innerHTML.search(/neu/g) != -1 )  {
		           count_newbis++;
		 }
		 else if ( all_td[i].innerHTML == '<b>Spieler</b>' ) {
		           all_td[i].style.width   = "25%";
				   all_td[i+1].style.width = "30%";
		 }
		 else if ( all_td[i].innerHTML == '<b>Plätze</b>' ) {
				   
				   /*
				   allElements = all_td[i+1].getElementsByTagName('option');
                   out = '<input name="plaetze" value="0" type="hidden">';

				   for ( var y = 0; y < allElements.length; y++ ) {

						 out_show = y+1;

						 if ( allElements[y].selected == true ) {
						      all_td[i].innerHTML = '<b>Plätze:</b> '+allElements[y].innerHTML;
							  out = out+'&#160;'+out_show+'&#160;|';
							  sel = y;
						 }
						 else {
						      out = out+'<a href="" title="Plätze '+allElements[y].innerHTML+'" onclick="document.forms[0].plaetze.value='+allElements[y].value+';document.forms[0].submit();return false;">&#160;'+out_show+'&#160;</a>|';
						 }

					}

				   pre  = "<<";
				   next = ">>";

				   if ( sel > 0 ) {
				        pre = '<a href="" title="Plätze '+allElements[sel-1].innerHTML+'" onclick="document.forms[0].plaetze.value='+allElements[sel-1].value+';document.forms[0].submit();return false;"><<</a>';
				   }

				   if ( sel < allElements.length-1 ) {
				        next = '<a href="" title="Plätze '+allElements[sel+1].innerHTML+'" onclick="document.forms[0].plaetze.value='+allElements[sel+1].value+';document.forms[0].submit();return false;">>></a>';
				   }

				   all_td[i+1].innerHTML = '<div style="width:15%;float:left;font-size:10px;">'+pre+'</div><div style="width:70%;float:left;"><small>'+out.substring(0,out.length-1)+'</small></div><div style="width:15%;float:left;font-size:10px;">'+next+'</div>';
		           all_td[i+2].innerHTML = '<input type="text" id="show_rang" onchange="sft_show_rang()" />';
				   */
		         
		}
		else if ( all_td[i].innerHTML == '<input name="anzeigen" value=" Suchen " type="submit">' ) {
		          ally_tags = GM_getValue('ally_tags').split(",")
		    	  all_td[i].innerHTML += '<br/><br/><img src="../design/8ln.gif" height="3" width="130">';

				  for ( z = 0; z < ally_tags.length-1; z++ ) {

				       ally_members_out = "-";

				       if ( typeof ally_members[ally_tags[z]] != 'undefined' ) {
                            ally_members_out = ally_members[ally_tags[z]];
                       }

				       all_td[i].innerHTML += '<a id="'+ally_tags[z]+'" class="navi" href="javascript:sft_inline_highlight(\''+ally_tags[z]+'\');"><div style="width:65%;letter-spacing:2px;float:left;">&#160;&#160;'+ally_tags[z]+'</div><div style="width:30%;color:#D6D6D6;font-size:10px;text-align:center;float:left;">'+ally_members_out+'</div>&#160;</a>';
				   }
				   all_td[i].innerHTML += '<img src="../design/8ln.gif" height="3" width="130"><a id="allylos" class="navi" href="javascript:sft_inline_highlight(\'allylos\');"><div style="width:65%;letter-spacing:2px;float:left;">&#160;Allylos</div><div style="width:30%;color:#ffffff;font-size:10px;text-align:center;float:left;">'+ally_members["allylos"]+'</div>&#160;</a>';
				   all_td[i].innerHTML += '<img src="../design/8ln.gif" height="3" width="130"><a class="navi" href="" onclick="return false"><div style="width:65%;letter-spacing:2px;float:left;">&#160;Noobs</div><div style="width:30%;color:#D6D6D6;font-size:10px;text-align:center;float:left;">'+count_newbis+'</div>&#160;</a>';

		 }
	}
}


// Ally Info 
function sft_view_allys(ally_id) {

    all_td    = split_td();
	ally_ids  = GM_getValue('ally_ids').split(",");
	pos       = ally_ids.search(ally_id);
	link_pre  = "&nbsp;<b><</b>&nbsp;";
	link_next = "&nbsp;<b>></b>&nbsp;";
	
	for (i = 0; i <= all_td.length-1; i++) {
	     if ( all_td[i].innerHTML == 'Mitglieder:'  ) {
		 
		     // Blättern
			 if ( all_td[i-2].innerHTML.search(/\/bilder\/allianz-logos/g) != -1 ) he = i-3;		
			 else he = i-2;
			 
			 if ( pos > 0 ) link_pre = '<a href="http://www.space-fights.de/galaxy1/allianzen.php?p=info&id='+ally_ids[pos-1]+'">&nbsp;<b><</b>&nbsp;</a>';
			 if ( pos < ally_ids.length-2 ) link_next = '<a href="http://www.space-fights.de/galaxy1/allianzen.php?p=info&id='+(ally_ids[pos+1])+'">&nbsp;<b>></b>&nbsp;</a>';
			 
			 all_td[he].innerHTML = '<span style="float:left;">'+all_td[he].innerHTML+'</span><span style="float:right;">'+link_pre+'&nbsp;&nbsp;'+link_next+'</span>';
			 
			 
			 // Members PM
			 ally_member     = all_td[i+1].innerHTML.split(',');
			 ally_member_new = "";
			 
			 for (y = 0; y <= ally_member.length-1; y++) {

                  ally_member[y] = trim(ally_member[y]);
			 
				  if ( ally_member[y].search(/\<b>/g) != -1 ) {
					   ally_member_new  += ' <a href="nachricht-senden.php?an='+ally_member[y].slice(3,ally_member[y].length-4)+'">'+ally_member[y]+'</a> |';
				  }
				  else {
				       ally_member_new  += ' <a href="nachricht-senden.php?an='+ally_member[y]+'">'+ally_member[y]+'</a> |';
				  }
               			  
			 }
			 
			 all_td[i+1].innerHTML = ally_member_new.slice(0,ally_member_new.length-2 );
			 
			 break;
			 
		 
		 }
	}

}

// Allys Einlesen / Ally Highlight (  allianzen.php )
function sft_get_allys(){

	all_td  = split_td();
	ally_tags = "";
	ally_ids  = "";

	// Punktevergleich
   function sft_points_2(y){
	   ist  = all_td[y+1].innerHTML.replace(/\./g, "");
	   down = nf( ist - ( all_td[y+6].innerHTML.replace(/\./g, "") ) );
       if ( down == "NaN" ) down = "-";
	   return down;
	}

	for (i = 0; i <= all_td.length-1; i++) {
	     if ( all_td[i].innerHTML == '<b>Allianztag</b>'  ) {
		      all_td[i].innerHTML = '<center><b>TAG</b></center>';
			  all_td[i+2].innerHTML = '<center><b>Members</b></center>';
			  all_td[i+1].setAttribute("width", "210px");


		      all_td[i+1].innerHTML = '<div style="width:70px;text-align:center;float:left;"><b>Punkte</b></div><div style="width:70px;text-align:center;float:left;"><b>&#216</b></div><div style="width:70px;text-align:center;float:left;">&#8595;</div>';
		      i = i+5;

   		      while ( all_td[i].innerHTML != '<a href="allianzen.php">Allianz-Liste</a>' ) {

					 if ( GM_getValue('ally_tag') == all_td[i].innerHTML ) {

						 start = i-2;

					     for (z = 0; z < 5; z++) {
                              all_td[start].className = 'tbcb';
			                  start++;
                         }
					 }

					 aid  = all_td[i-1].innerHTML.split("id=");
					 aid2 = aid[1].split('"');
					 ally_tags += all_td[i].innerHTML+",";
					 ally_ids  += aid2[0]+",";

					 // Allytags ersetzten
					 all_td[i-1].style.fontSize = "10px";
					 ally_name_array        = all_td[i-1].innerHTML.split("\">");
					 all_td[i].innerHTML    = '<a target="_blank" href="http://open-sys.info/allianzen_info_'+( ally_name_array[1].substring(0,ally_name_array[1].length-4)).replace(/ /gi,"_")+'">'+all_td[i].innerHTML+'</a>';
					 all_td[i+1].innerHTML  = '<div style="width:70px;font-size:10px;text-align:center;float:left;">'+all_td[i+1].innerHTML+'</div><div style="width:70px;font-size:10px;text-align:center;line-height:14px;float:left;">'+nf( Math.round( ( all_td[i+1].innerHTML.replace(/\./g,"") ) / all_td[i+2].innerHTML) )+'</div><div style="width:70px;font-size:10px;text-align:center;line-height:14px;float:left;">'+sft_points_2(i)+'</div>';

					 i = i+5;
			  }
		  GM_setValue('ally_tags', ally_tags);
		  GM_setValue('ally_ids', ally_ids);
	      break;
		 }
	}
}

// Bunker Füllstand (  rohstoffe.php  )
function sft_calc_bunker(){

   all_td  = split_td();

   for (i = 0; i <= all_td.length-1; i++) {
       if ( all_td[i].innerHTML == '<b>Gesamtproduktion</b>'  ) {

			// Sklaven ALL ( Ich weis , Sklaverei ist verboten - aber was solls , die bringen RES ;)  )
			rob_ei_ist = eval(document.forms[1].elements.namedItem("robots_eisen").value);
			rob_si_ist = eval(document.forms[1].elements.namedItem("robots_silizium").value);
			rob_wa_ist = eval(document.forms[1].elements.namedItem("robots_wasser").value);

			sklaven_all = rob_ei_ist+rob_si_ist+rob_wa_ist;

			all_td[i-1].innerHTML = '<b>'+sklaven_all+'</b>';

			// Res Gesamtproduktion ( Plani ALL )
			all_td[i+1].innerHTML = all_td[i+1].innerHTML+'<br/><b>Gesamt</b>&#160;<small>[24h]</small>';
	        all_td[i+2].style.verticalAlign="top";
			all_td[i+4].style.verticalAlign="top";

		    function sft_get_res(td_c){
		       wert = all_td[td_c].innerHTML.split("<br>");
			   return Number( wert[1].replace(/\D/g, ""));
		    }

			res_24 = nf ( sft_get_res(i+2) + sft_get_res(i+3) + sft_get_res(i+4) );

			all_td[i+3].innerHTML = all_td[i+3].innerHTML+'<br/><b>'+res_24+'</b>';
	   }
	   else if ( all_td[i].innerHTML == '<b>Rohstoffbunker</b>'  && document.forms[2].elements.namedItem("eisen") != null ) {
	             eisen_ist = eval(document.forms[2].elements.namedItem("eisen").value);
                 silli_ist = eval(document.forms[2].elements.namedItem("silizium").value);
                 h2o_ist   = eval(document.forms[2].elements.namedItem("wasser").value);

                 res_all = eisen_ist+silli_ist+h2o_ist;

				 split_string = all_td[i+5].innerHTML.split("von max.");
			     rest_pro = 100 - ( split_string[0].replace(/\%/g, "") );
			     rest_res = ( split_string[1].replace(/\./g, "") ) - res_all;

	             all_td[i+5].innerHTML = '<table class="tbb" style="width:100%;" cellspacing="1" border="0"><tr><td class="tbc fos_10" width="20%"><b>IST</b></td><td class="tbc fos_10" width="40%" align="center">'+split_string[0]+'</td><td class="tbc fos_10" width="40%" align="center">'+nf(res_all)+'</td></tr><tr><td class="tbc fos_10"><b>REST</b></td><td class="tbc fos_10" align="center">'+rest_pro+'%</td><td class="tbc fos_10" align="center">'+nf(rest_res)+'</td></tr><tr><td class="tbc fos_10"><b>MAX</b></td><td  class="tbc fos_10" colspan="2" align="center">'+split_string[1]+'</td></tr></table>';
			     break;
	   }
   }

}


// SIG (  nachricht-senden.php  )
function add_sig() {

   all_td  = split_td();

   for (i = 0; i <= all_td.length-1; i++) {
       if ( all_td[i].innerHTML == 'Text:'  ) {
            all_td[i+2].innerHTML = '<center><span style="cursor:pointer" onclick=\'document.forms[0].elements.namedItem("text").rows+=5;\'>&#160;+&#160;</span>&#160;&#160;&#160;<span style="cursor:pointer" onclick=\'document.forms[0].elements.namedItem("text").rows-=5;\'>&#160;-&#160;</span></center>';
	        break;
	   }
    }

	if ( GM_getValue('sig') != "" ) {
		sig = (GM_getValue('sig').replace(/\\n/g, "\n"));
		
		if ( GM_getValue('sft_zitat') == true ) {
			 document.forms[0].elements.namedItem("text").value = '\n\n'+sig+document.forms[0].elements.namedItem("text").value;
    	}
		else {
			 document.forms[0].elements.namedItem("text").value = '\n\n'+sig;
		}

		if ( document.forms[0].elements.namedItem("betreff").value == "" ) {
			 document.forms[0].elements.namedItem("betreff").focus();
			 document.forms[0].elements.namedItem("text").setAttribute("onfocus", "selectionStart=0;selectionEnd=0;");
		}
		else {
			 document.forms[0].elements.namedItem("text").focus();
			 document.forms[0].elements.namedItem("text").selectionStart = 0;
			 document.forms[0].elements.namedItem("text").selectionEnd = 0;
		}

	}

    document.forms[0].elements.namedItem("text").rows = document.forms[0].elements.namedItem("text").value.match(/\n/gi, "").length+2;
	document.forms[0].elements.namedItem("text").setAttribute("onkeyup", "sft_check_rows()");

}

// Nachichten Uebersicht (  nachrichten.php  )
function sft_news(){

   all_td  = split_td();

   for (i = 0; i <= all_td.length-1; i++) {
			
	    if ( all_td[i].innerHTML == "<b>Betreff</b>" ) {
			 
			 all_td[i].width = "48%";
			 all_td[i+1].width = "22%";
   		     y = i+4;

			 while ( all_td[y].innerHTML.search(/nachrichten/g) != -1 ) {
			        
					if ( all_td[y-1].innerHTML != "System" && all_td[y-1].innerHTML != "<b>System</b>" ) {
					     data = all_td[y].innerHTML.split("=");
					     nid = data[3].split('"');
					
					     all_td[y+1].innerHTML += '&nbsp;&nbsp;&nbsp;<a href="http://www.space-fights.de/galaxy1/nachricht-senden.php?re='+nid[0]+'"><img src="../design/mail.gif" alt="Nachricht senden" border="0" height="10" width="13"></a>';
			        }
					
					y = y+4;
					
			 }
			 break;
		}
		
   }
   
   
   
   
}


// Mission Control (  flotten.php  )
function sft_mission_control(){

   all_td  = split_td();
   mission = document.forms[1].elements.namedItem("Mission").value;

   function set_href(z,y){

	  set = all_td[z].getElementsByTagName("a");
	  new_href = set[0].getAttribute("href")+";sft_calc("+y+");";
      set[0].setAttribute("href", new_href);
	  new_href = set[1].getAttribute("href")+";sft_calc("+y+");";
	  set[1].setAttribute("href", new_href);

   }

   for (i = 0; i <= all_td.length-1; i++) {

	   if ( all_td[i].innerHTML == 'Mission:'  ) {
            for ( z = 0; z < 6; z++) {
			      all_td[i+2].setAttribute("onclick", "document.missions.Mission["+z+"].checked=true");
				  all_td[i+3].setAttribute("onclick", "document.missions.Mission["+z+"].checked=true");
				  all_td[i+4].style.display = 'none';
			      all_td[i+5].style.display = 'none';
				  i = i+5;
		    }
			break;
	   }
	   else if ( mission != "1" && mission != "3" && all_td[i].innerHTML == '<b>Ladekapazität</b>' && all_td[i+1].innerHTML == '<b>Vorhanden</b>') {

				all_l = 0;
				res = '';

				for ( z = i; z < all_td.length; z++ ) {

                     z = z+5;

  				     if ( all_td[z].innerHTML.search(/img/g) == -1 ) {

					       res_ship = sft_ex_num(all_td[z].innerHTML);
						   ship_ist = sft_ex_num(all_td[z+1].innerHTML)
						   max_res =  res_ship*ship_ist;

						   res += '"'+res_ship+'",';

						   all_l = ( all_l + max_res );

						   all_td[z].innerHTML = all_td[z].innerHTML+' | '+nf(max_res);

						   ship_input = all_td[z+2].getElementsByTagName("input");
						   ship_input[0].setAttribute("onkeyup", "sft_calc(1);");
						   ship_input[0].setAttribute('onclick', 'this.value="";sft_calc(1);');

						   set_href(z+2,1);

					       z = z-1;

					  }
					  else {

						   res = res.substring(0,res.length-1);
						   insert_flotten_js(all_l,res);
						   set_href(z-1,1)
						   orig = all_td[z-2].innerHTML.substr(6);

						   all_td[z-2].innerHTML = '<table class="tbb" style="width:100%;" cellspacing="1" border="0"><tr><td class="tbc fos_10" width="20%"><b>IST</b></td><td id="calc_out" class="tbc fos_10" width="40%" align="center">0.00 %</td><td id="calc_out_2" class="tbc fos_10" width="40%" align="center">0</td></tr><tr><td class="tbc fos_10"><b>REST</b></td><td id="calc_out_3" class="tbc fos_10" align="center">100.00 %</td><td id="calc_out_4" class="tbc fos_10" align="center">'+all_l+'</td></tr><tr><td class="tbc fos_10"><b>MAX</b></td><td  class="tbc fos_10" colspan="2" align="center">'+nf(all_l)+'</td></tr><tr><td class="tbc" colspan="3"><div id="dia_1"><div id="dia_2" style="width:0%;"></div></div></td></tr></table>'+orig;
					       break;

					  }

			    }
				break;

	   }
       else if ( all_td[i].innerHTML == 'Flugdauer:' ) {


				  fz_all = all_td[i+1].getElementsByTagName("option");

				  for (ic = 0; ic <= 9; ic++) {

					   akz = fz_all[ic].innerHTML.split("&");
					   fz_all[ic].setAttribute("onmouseover", 'show_time("'+sft_time_calc(akz[0],2)+'")');


				  }

				  akz = fz_all[0].innerHTML.split("&");

				  all_td[i+6].setAttribute("id", "st");
				  all_td[i+6].setAttribute("class", "tbc");
				 
				  if ( mission < 4 ) {
				       all_td[i+7].innerHTML = all_td[i+7].innerHTML+all_td[i+6].innerHTML.substr(6);
				  }
				  
				  all_td[i+6].innerHTML = "<b>Ankunftszeit:</b>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;"+sft_time_calc(akz[0],2);
				  all_l = sft_ex_num(all_td[i-4].innerHTML);
				  insert_flotten_js(all_l,0);

				  if ( mission == "4" || mission == "5" || mission == "6" ) {
				  
				  	   ot   = 0;
				  
				       if ( mission == "4" ) { ot = 2; }
				  
					   set_href(i+8+ot,2);
					   set_href(i+9+ot,2);
					   set_href(i+12+ot,2);
					   set_href(i+15+ot,2);

					   document.forms[1].elements.namedItem("eisen").setAttribute("onkeyup", "sft_calc(2)");					   
					   document.forms[1].elements.namedItem("eisen").setAttribute('onclick', 'this.value="";sft_calc(2);');					   
					   document.forms[1].elements.namedItem("silizium").setAttribute("onkeyup", "sft_calc(2)");
					   document.forms[1].elements.namedItem("silizium").setAttribute('onclick', 'this.value="";sft_calc(2);');
					   document.forms[1].elements.namedItem("wasser").setAttribute("onkeyup", "sft_calc(2)");
					   document.forms[1].elements.namedItem("wasser").setAttribute('onclick', 'this.value="";sft_calc(2);');

                       all_td[i+15+ot].innerHTML += all_td[i+14+ot].innerHTML.substr(6);					   
					   all_td[i+14+ot].innerHTML = '<table class="tbb" style="width:100%;" cellspacing="1" border="0"><tr><td class="tbc fos_10" width="20%"><b>IST</b></td><td id="calc_out" class="tbc fos_10" width="40%" align="center">0 %</td><td id="calc_out_2" class="tbc fos_10" width="40%" align="center">0</td></tr><tr><td class="tbc fos_10"><b>REST</b></td><td id="calc_out_3" class="tbc fos_10" align="center">100 %</td><td id="calc_out_4" class="tbc fos_10" align="center">'+nf(all_l)+'</td></tr><tr><td class="tbc fos_10"><b>MAX</b></td><td  class="tbc fos_10" colspan="2" align="center">'+nf(all_l)+'</td></tr><tr><td class="tbc" colspan="3"><div id="dia_1"><div id="dia_2" style="width:0%;"></div></div></td></tr></table>';

				  }
				  break;

	   }

   }

}

// Sun SYS (  sonnensysthem.php  )
function sft_sun_sys(){

   all_td  = split_td();
   out = '<table border="0" cellspacing="2" cellpadding="2" width="100%" height="100%"><tr>';
   vert_co = 0;
   hori_co = 0;
   kords_array = new Array(6,15,25,35,45);
   kords_area  = new Array("1_1","1_2","1_3","1_4","1_5","2_1","2_2","2_3","2_4","2_5","3_1","3_2","3_3","3_4","3_5","4_1","4_2","4_3","4_4","4_5","5_1","5_2","5_3","5_4","5_5");

   // Area
   area_key_x = Math.ceil( ( document.forms[1].elements.namedItem("y").value / 10 ) + 0.1 );
   area_key_y = Math.ceil( ( document.forms[1].elements.namedItem("x").value / 10 ) + 0.1 );

   if ( area_key_x > 5 ) area_key_x = 5;
   if ( area_key_y > 5 ) area_key_y = 5;

   area_key = area_key_x+'_'+area_key_y;

   for ( iz = 0; iz < 25; iz++ ) {
         if ( vert_co < 5 ) {

		     if ( kords_area[iz] == area_key ) {
			      out_area = '<span style="color:#FFD7A0;">'+(iz+1)+'</span>';
			 }
			 else {
			      out_area = iz+1;
			 }

			  out = out+'<td class="m_sys"><a class="m_sys_l" href="http://www.space-fights.de/galaxy1/sonnensystem.php?x='+kords_array[vert_co]+'&y='+kords_array[hori_co]+'">'+out_area+'</a></td>';
			  vert_co++;
		 }
		 else {
		      out     = out+'</tr><tr>';
			  vert_co = 0;
			  hori_co++;
			  iz--;
		}

   }

   out = out+'</tr></table>';

   for (i = 200; i <= all_td.length-1; i++) {
        if ( all_td[i].innerHTML == '<b>Minikarte</b>'  ) {
			all_td[i+1].innerHTML = all_td[i+1].innerHTML+'<br/>'+out;
			break;
	   }
   }
}

// Chat Stopuhr (  chat.php  )
function sft_chat_stop(){

  sft_cs++;
  GM_setValue('sft_chat_stop', sft_cs);
  
  cs_h = parseInt(sft_cs/(60*60));
  cs_sec = sft_cs-(cs_h*(60*60));

  cs_m   = parseInt(cs_sec/(60));
  cs_sec = cs_sec-(cs_m*(60));

  cs_s   = parseInt(cs_sec);

  if ( cs_h < 10 ) cs_h ="0"+cs_h;
  if ( cs_m < 10 ) cs_m ="0"+cs_m;
  if ( cs_s < 10 ) cs_s ="0"+cs_s;

  cs_tstr = cs_h+":"+cs_m+":"+cs_s;
  
  document.getElementById("cs").innerHTML = cs_tstr;
  window.setTimeout(sft_chat_stop, 1000);
  
}

// Chat (  chat.php  )
function sft_chat(){

   all_td  = split_td();
   
   key = rand(1000);
   document.forms[0].setAttribute("action", "/galaxy1/chat.php?key="+key );
   GM_setValue('sft_chat_key', key);
   
   sft_chat_counter = GM_getValue('sft_chat_counter').split(",");


   for (i = 0; i <= all_td.length-1; i++) {
	   if ( all_td[i].innerHTML == '<b>Im Chat</b>'  ) {
			out = "";

			if ( all_td[i+1].innerHTML.search(/und/g) != -1 ) {
			     user_split = all_td[i+1].innerHTML.split("<br>");
			     user_aktiv = user_split[0].split(",");

				 for ( z = 0; z < user_aktiv.length; z++ ) {

					   if ( z == 0 ) {
					        user_aktiv[z] = user_aktiv[z].substr(1);
					   }
					   else {
					        user_aktiv[z] = user_aktiv[z].replace(/ /, "");
					   }

				       out += '<div style="width:90%;float:left;">- <a href="nachricht-senden.php?an='+user_aktiv[z]+'">'+user_aktiv[z]+'</a></div><div style="width:10%;cursor:pointer;float:right;" onclick=\'document.chatform.beitrag.value="@ '+user_aktiv[z]+':"\'>@</div><br/>';
			     }

			     out_ver = Number( user_split[1].replace(/\D/g, "") );
			     out_all = z+out_ver;
			}
			else {
			      out_ver = Number( all_td[i+1].innerHTML.replace(/\D/g, "") );
				  out_all = out_ver;
				  z = 0;
			}

			out += '<br/><center><img src="../design/8ln.gif" height="3" width="130"><br/><br/>SI:&#160;'+z+'&#160;|&#160;VE:&#160;'+out_ver+'&#160;|&#160;ALL:&#160;'+out_all+'<br/><br/>Stat: '+sft_chat_counter[1]+' / '+sft_chat_counter[2]+'<br/><span id="cs"></span></center><br/>';
			all_td[i+1].innerHTML = out;
			
			sft_cs = GM_getValue('sft_chat_stop');
			sft_chat_stop();

            break;
	   }
    }
}


// Handel (  handel.php  )
function sft_handel(){

   all_td  = split_td();

   for (i = 0; i <= all_td.length-1; i++) {   
			if ( all_td[i].innerHTML == "<b>Erstellt am</b>" ) {
			
   		        while ( all_td[i+1].innerHTML.search(/spieler-info/g) != -1 ) {

					  io  = all_td[i+1].innerHTML.split(">");
					  us  = io[1].substring(0,io[1].length-3);
					  
					  
				  	  io  = all_td[i+2].innerHTML.split("&nbsp;");
                      r   = io[0].split(">");
                      rm1 =	sft_ex_num(r[1]);

                      if ( io[1].search(/Eisen/g) != -1 ) {
                          res_1 = rm1+"e";
                      }
                      else if ( io[1].search(/Silizium/g) != -1 ) {
                              res_1 = rm1+"s";
                      }
                      else if ( io[1].search(/Wasser/g) != -1 ) {
                              res_1 = rm1+"w";
                      }
					  
				  	  io  = all_td[i+3].innerHTML.split("&nbsp;");
                      r   = io[0].split(">");
                      rm2 =	sft_ex_num(r[1]);

                      if ( io[1].search(/Eisen/g) != -1 ) {
                          res_2 = rm2+"e";
                      }
                      else if ( io[1].search(/Silizium/g) != -1 ) {
                              res_2 = rm2+"s";
                      }
                      else if ( io[1].search(/Wasser/g) != -1 ) {
                              res_2 = rm2+"w";
                      }

				      all_td[i+4].innerHTML += '&nbsp;&nbsp;&nbsp;<img style="cursor:pointer;" onclick=\'pu("'+res_1+','+res_2+'")\' src="data:image/png;base64,'+sft_calc_img+'" height="11" width="9">&nbsp;<a href="nachricht-senden.php?an='+us+'"><img src="../design/mail.gif" alt="Nachricht senden" border="0" height="10" width="13"></a>';
					 					  
					  i = i+4;
			    }

				break;
				
			 }
			     
    }
			
}




// ************************************************************************************************************************************************************************************************************************************************************************************
// Reload Counter
sft_count_reloads();

// Sitefooter Menue
sft_sitefooter();

// Rundentimer
if ( sec != false  ) {
    sft_count(sec);
}
else {
     document.getElementById("footer_right").innerHTML = "- Closed -";
}

// Bevorzugter Handelsplanet
if ( typeof(GM_getValue('sft_trade_plani')) != "undefined" && GM_getValue('sft_trade_plani') != 0 ) {
    document.getElementsByTagName("td")[30].innerHTML = '<a class="navi" href="handel.php?planetNr='+GM_getValue('sft_trade_plani')+'">Handel</a>';
}

// Bauzeiten Check
if ( side_url.search(/gebaeude|forschung/g) != -1 ) {
   sft_bzc();
}

// Max Ship
else if ( side_url.search(/raumschiffe/g) != -1 ) {
        sft_max_bau();
}

// Max Deff
else if ( side_url.search(/verteidigung/g) != -1 ) {
        sft_max_bau();
}

// Highlight Ally Members
else if ( side_url.search(/rangliste/g) != -1 ) {
        insert_rangliste_js();
        sft_high_ally_members();
}

// Ally INFO
else if ( side_url.search(/allianzen.php\?p=info/g) != -1 ) {
		aid = side_url.split("=");
		sft_view_allys(aid[2]);
}

// Get Ally TAGs & IDs
else if ( side_url.search(/allianzen/g) != -1 ) {
        sft_get_allys();
}

// Calc Bunker
else if ( side_url.search(/rohstoffe/g) != -1 ) {
        sft_calc_bunker();
}

// Add SIG
else if ( side_url.search(/nachricht-senden/g) != -1 && document.forms[0].elements.namedItem("text") != null ) {
	    add_sig();
	    insert_nachrichten_js();
}

// News ( Buggig ) 
else if ( side_url.search(/nachrichten/g) != -1 ) {      
        sft_news();
}

// Mission Control
else if ( side_url.search(/flotten/g) != -1 &&  document.forms[1].elements.namedItem("Mission") != null ) {
        sft_mission_control();
}

// Sonnensysthem
else if ( side_url.search(/sonnensystem/g) != -1 ) {	
	    sft_sun_sys();
}

// Chat
else if ( side_url.search(/chat/g) != -1 ) {
		
		if ( side_url.search(/key/g) != -1 ) {
		     key = side_url.split("=");
		     
			 if ( GM_getValue('sft_chat_key') == key[1] ) {
			      sft_count_chat();
			 }

	    }
		
		sft_chat();
}


// Handel ( buggig ) 
else if ( side_url.search(/handel/g) != -1 ) {	
	    insert_handel_js();
		sft_handel();
}
