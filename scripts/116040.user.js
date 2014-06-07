// ==UserScript==
// @name           TLR Gratz Buttons
// @namespace      TLR
// @include        http://www.thelostrunes.com/game.php
// @include        http://thelostrunes.com/game.php
// @date           19.09.2011
// @version        1.0
// @author         poppu
// ==/UserScript==


/*
* TLR Gratz Buttons :
*	1 - normal gratz button
*	2 - reverse gratz button  (use with caution !  mutable ) 
*	3 - CAPS gratz button  (don't use this !!!!  mutable+++ / bannable)
*/

/*
*	Adding Gratz Buttons
*	Comment chatform.insertBefore() to remove one of the button
*/
function addContent(){
	var chatform = document.getElementById('chatinput').parentNode;
	var chatinput = document.getElementById('chatinput');
	if (chatform){
		span = document.createElement('input');
		span.setAttribute('type', 'button');
		span.setAttribute('name', 'gratz_bot');
		span.setAttribute('value', 'Gratz !');
		span.setAttribute('onclick', 'GratzThemAll()');
		chatform.insertBefore(span, chatinput);
		
		span2 = document.createElement('input');
		span2.setAttribute('type', 'button');
		span2.setAttribute('name', 'gratz_bot_reverse');
		span2.setAttribute('value', '!! esreveR');
		span2.setAttribute('onclick', 'GratzReverse()');
		//chatform.insertBefore(span2, chatinput);
		
		span3 = document.createElement('input');
		span3.setAttribute('type', 'button');
		span3.setAttribute('name', 'gratz_bot_caps');
		span3.setAttribute('value', 'CAPS !!!');
		span3.setAttribute('onclick', 'GratzCAPS()');
		//chatform.insertBefore(span3, chatinput);		
	}
}
addContent();

function addGlobalJS(js){
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (head){
		script = document.createElement('script');
		script.type = 'text/javascript';
		script.innerHTML = js;
		head.appendChild(script);
	}
}

//Obfuscated version of the GratzThemAll function below. 
//Feel free to redo at http://javascriptobfuscator.com/default.aspx  if you are paranoid
addGlobalJS('var _0xdef3=["\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x68\x61\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x3C\x62\x72\x3E","\x73\x70\x6C\x69\x74","\x6C\x65\x6E\x67\x74\x68","\x47\x6C\x6F\x62\x61\x6C","\x69\x6E\x64\x65\x78\x4F\x66","\x73\x6C\x69\x63\x65","\x20","\x70\x75\x73\x68","\x73\x6F\x72\x74","\x41\x72\x65\x6E\x61","\x73\x70\x6C\x69\x63\x65","\x54\x68\x65","\x2C\x20","\x6A\x6F\x69\x6E","\x76\x61\x6C\x75\x65","\x63\x68\x61\x74\x69\x6E\x70\x75\x74","\x47\x72\x61\x74\x7A\x20","\x20\x21\x21\x21\x20\x20\x20\x3A\x29"];function GratzThemAll(){var _0x2247x2=document[_0xdef3[2]](_0xdef3[1])[_0xdef3[0]];var _0x2247x3=_0x2247x2[_0xdef3[4]](_0xdef3[3]);var _0x2247x4= new Array();for(var _0x2247x5=0;_0x2247x5<_0x2247x3[_0xdef3[5]];_0x2247x5++){var _0x2247x6=_0x2247x3[_0x2247x5];var _0x2247x7=_0x2247x6[_0xdef3[7]](_0xdef3[6]);if(_0x2247x7!=-1){_0x2247x6=_0x2247x6[_0xdef3[8]](_0x2247x7);full_line_tab=_0x2247x6[_0xdef3[4]](_0xdef3[9]);player_name=full_line_tab[1];_0x2247x4[_0xdef3[10]](player_name);} ;} ;function _0x2247x8(_0x2247x9){_0x2247x9[_0xdef3[11]]();for(var _0x2247x5=1;_0x2247x5<_0x2247x9[_0xdef3[5]];){var _0x2247xa=_0x2247x9[_0x2247x5-1][_0xdef3[7]](_0xdef3[12]);if(_0x2247xa==3){_0x2247x9[_0xdef3[13]](_0x2247x5-1,1);} ;if(_0x2247x9[_0x2247x5-1]==_0x2247x9[_0x2247x5]||_0x2247x9[_0x2247x5]==_0xdef3[14]){_0x2247x9[_0xdef3[13]](_0x2247x5,1);} else {_0x2247x5++;} ;} ;return _0x2247x9;} ;_0x2247x8(_0x2247x4);players_name_string=_0x2247x4[_0xdef3[16]](_0xdef3[15]);document[_0xdef3[2]](_0xdef3[18])[_0xdef3[17]]=_0xdef3[19]+players_name_string+_0xdef3[20];} ;');

/*
function GratzThemAll()
{
	var chat_div = document.getElementById('chat').innerHTML;
	var full_chat_lines_tab = chat_div.split("<br>");
	var players_name_tab = new Array();

	//Retrieving players names
	for (var i=0; i<full_chat_lines_tab.length; i++)
	{
		var full_line = full_chat_lines_tab[i];
		var start = full_line.indexOf("Global");
		if(start != -1)
		{
			full_line = full_line.slice(start);
			full_line_tab = full_line.split(" ");
			player_name = full_line_tab[1]
			players_name_tab.push(player_name);
		}
	}
	
	//Remove duplicates, and sort names by alphabetical order
	function unique(a){
		a.sort();
		for(var i = 1; i < a.length;){
			var arena_check_index = a[i-1].indexOf("Arena");
			if(arena_check_index == 3){
				a.splice(i-1, 1);
			}
			if(a[i-1] == a[i] || a[i] == "The"){
				a.splice(i, 1);
			} else {
				i++;
			}
		}
		return a;
	}  
	unique(players_name_tab);

	//Change this part if you want to customize the final string !
	players_name_string=players_name_tab.join(", ");
	document.getElementById('chatinput').value = "Gratz "+players_name_string+" !!!   :)" ;
}
*/


//Obfuscated version of the GratzReverse function below. 
//Feel free to redo at http://javascriptobfuscator.com/default.aspx  if you are paranoid

addGlobalJS('var _0x8cc7=["\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x68\x61\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x3C\x62\x72\x3E","\x73\x70\x6C\x69\x74","\x6C\x65\x6E\x67\x74\x68","\x47\x6C\x6F\x62\x61\x6C","\x69\x6E\x64\x65\x78\x4F\x66","\x73\x6C\x69\x63\x65","\x20","\x70\x75\x73\x68","\x73\x6F\x72\x74","\x41\x72\x65\x6E\x61","\x73\x70\x6C\x69\x63\x65","\x54\x68\x65","\x2C\x20","\x6A\x6F\x69\x6E","\x47\x72\x61\x74\x7A\x20","\x20\x21\x21\x21\x20\x20\x20\x3A\x29","","\x72\x65\x76\x65\x72\x73\x65","\x76\x61\x6C\x75\x65","\x63\x68\x61\x74\x69\x6E\x70\x75\x74"];function GratzReverse(){var _0x37ebx2=document[_0x8cc7[2]](_0x8cc7[1])[_0x8cc7[0]];var _0x37ebx3=_0x37ebx2[_0x8cc7[4]](_0x8cc7[3]);var _0x37ebx4= new Array();for(var _0x37ebx5=0;_0x37ebx5<_0x37ebx3[_0x8cc7[5]];_0x37ebx5++){var _0x37ebx6=_0x37ebx3[_0x37ebx5];var _0x37ebx7=_0x37ebx6[_0x8cc7[7]](_0x8cc7[6]);if(_0x37ebx7!=-1){_0x37ebx6=_0x37ebx6[_0x8cc7[8]](_0x37ebx7);full_line_tab=_0x37ebx6[_0x8cc7[4]](_0x8cc7[9]);player_name=full_line_tab[1];_0x37ebx4[_0x8cc7[10]](player_name);} ;} ;function _0x37ebx8(_0x37ebx9){_0x37ebx9[_0x8cc7[11]]();for(var _0x37ebx5=1;_0x37ebx5<_0x37ebx9[_0x8cc7[5]];){var _0x37ebxa=_0x37ebx9[_0x37ebx5-1][_0x8cc7[7]](_0x8cc7[12]);if(_0x37ebxa==3){_0x37ebx9[_0x8cc7[13]](_0x37ebx5-1,1);} ;if(_0x37ebx9[_0x37ebx5-1]==_0x37ebx9[_0x37ebx5]||_0x37ebx9[_0x37ebx5]==_0x8cc7[14]){_0x37ebx9[_0x8cc7[13]](_0x37ebx5,1);} else {_0x37ebx5++;} ;} ;return _0x37ebx9;} ;_0x37ebx8(_0x37ebx4);players_name_string=_0x37ebx4[_0x8cc7[16]](_0x8cc7[15]);full_string=_0x8cc7[17]+players_name_string+_0x8cc7[18];var _0x37ebxb=full_string[_0x8cc7[4]](_0x8cc7[19])[_0x8cc7[20]]()[_0x8cc7[16]](_0x8cc7[19]);document[_0x8cc7[2]](_0x8cc7[22])[_0x8cc7[21]]=_0x37ebxb;} ;');

/*
function GratzReverse()
{
	var chat_div = document.getElementById('chat').innerHTML;
	var full_chat_lines_tab = chat_div.split("<br>");
	var players_name_tab = new Array();

	//Retrieving players names
	for (var i=0; i<full_chat_lines_tab.length; i++)
	{
		var full_line = full_chat_lines_tab[i];
		var start = full_line.indexOf("Global");
		if(start != -1)
		{
			full_line = full_line.slice(start);
			full_line_tab = full_line.split(" ");
			player_name = full_line_tab[1]
			players_name_tab.push(player_name);
		}
	}
	
	//Remove duplicates, and sort names by alphabetical order
	function unique(a){
		a.sort();
		for(var i = 1; i < a.length;){
			var arena_check_index = a[i-1].indexOf("Arena");
			if(arena_check_index == 3){
				a.splice(i-1, 1);
			}
			if(a[i-1] == a[i] || a[i] == "The"){
				a.splice(i, 1);
			} else {
				i++;
			}
		}
		return a;
	}  
	unique(players_name_tab);

	//Change this part if you want to customize the final string !
	players_name_string=players_name_tab.join(", ");
	full_string = "Gratz "+players_name_string+" !!!   :)";

	var reverse_full_string = full_string.split("").reverse().join("");
	document.getElementById('chatinput').value = reverse_full_string;
}
*/


//Obfuscated version of the GratzCAPS function below. 
//Feel free to redo at http://javascriptobfuscator.com/default.aspx  if you are paranoid

addGlobalJS('var _0x753f=["\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x63\x68\x61\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x3C\x62\x72\x3E","\x73\x70\x6C\x69\x74","\x6C\x65\x6E\x67\x74\x68","\x47\x6C\x6F\x62\x61\x6C","\x69\x6E\x64\x65\x78\x4F\x66","\x73\x6C\x69\x63\x65","\x20","\x70\x75\x73\x68","\x73\x6F\x72\x74","\x41\x72\x65\x6E\x61","\x73\x70\x6C\x69\x63\x65","\x54\x68\x65","\x2C\x20","\x6A\x6F\x69\x6E","\x47\x72\x61\x74\x7A\x20","\x20\x21\x21\x21\x20\x20\x20\x3A\x29","\x74\x6F\x55\x70\x70\x65\x72\x43\x61\x73\x65","\x76\x61\x6C\x75\x65","\x63\x68\x61\x74\x69\x6E\x70\x75\x74"];function GratzCAPS(){var _0x7f21x2=document[_0x753f[2]](_0x753f[1])[_0x753f[0]];var _0x7f21x3=_0x7f21x2[_0x753f[4]](_0x753f[3]);var _0x7f21x4= new Array();for(var _0x7f21x5=0;_0x7f21x5<_0x7f21x3[_0x753f[5]];_0x7f21x5++){var _0x7f21x6=_0x7f21x3[_0x7f21x5];var _0x7f21x7=_0x7f21x6[_0x753f[7]](_0x753f[6]);if(_0x7f21x7!=-1){_0x7f21x6=_0x7f21x6[_0x753f[8]](_0x7f21x7);full_line_tab=_0x7f21x6[_0x753f[4]](_0x753f[9]);player_name=full_line_tab[1];_0x7f21x4[_0x753f[10]](player_name);} ;} ;function _0x7f21x8(_0x7f21x9){_0x7f21x9[_0x753f[11]]();for(var _0x7f21x5=1;_0x7f21x5<_0x7f21x9[_0x753f[5]];){var _0x7f21xa=_0x7f21x9[_0x7f21x5-1][_0x753f[7]](_0x753f[12]);if(_0x7f21xa==3){_0x7f21x9[_0x753f[13]](_0x7f21x5-1,1);} ;if(_0x7f21x9[_0x7f21x5-1]==_0x7f21x9[_0x7f21x5]||_0x7f21x9[_0x7f21x5]==_0x753f[14]){_0x7f21x9[_0x753f[13]](_0x7f21x5,1);} else {_0x7f21x5++;} ;} ;return _0x7f21x9;} ;_0x7f21x8(_0x7f21x4);players_name_string=_0x7f21x4[_0x753f[16]](_0x753f[15]);full_string=_0x753f[17]+players_name_string+_0x753f[18];full_string=full_string[_0x753f[19]]();document[_0x753f[2]](_0x753f[21])[_0x753f[20]]=full_string;} ;');

/*
function GratzCAPS()
{
	var chat_div = document.getElementById('chat').innerHTML;
	var full_chat_lines_tab = chat_div.split("<br>");
	var players_name_tab = new Array();

	//Retrieving players names
	for (var i=0; i<full_chat_lines_tab.length; i++)
	{
		var full_line = full_chat_lines_tab[i];
		var start = full_line.indexOf("Global");
		if(start != -1)
		{
			full_line = full_line.slice(start);
			full_line_tab = full_line.split(" ");
			player_name = full_line_tab[1]
			players_name_tab.push(player_name);
		}
	}
	
	//Remove duplicates, and sort names by alphabetical order
	function unique(a){
		a.sort();
		for(var i = 1; i < a.length;){
			var arena_check_index = a[i-1].indexOf("Arena");
			if(arena_check_index == 3){
				a.splice(i-1, 1);
			}
			if(a[i-1] == a[i] || a[i] == "The"){
				a.splice(i, 1);
			} else {
				i++;
			}
		}
		return a;
	}  
	unique(players_name_tab);

	//Change this part if you want to customize the final string !
	players_name_string=players_name_tab.join(", ");
	full_string = "Gratz "+players_name_string+" !!!   :)";
	full_string = full_string.toUpperCase();
	document.getElementById('chatinput').value = full_string;
}
*/
