// ==UserScript==
// @name            ParaChat Optimizer 2.6
// @namespace       http://www.primedesigning.com
// @include         http://chat.parachat.com/chat/*
// @include         https://chat.parachat.com/chat/*
// @description     Removes everything except the chat window from ParaChat and adds all the chat tools you'll ever need.
// @grant			none
// ==/UserScript==

// Last updated: 10/29/2013

var seperator="*`^@";
			
if (window.location.href.indexOf("user=")==-1) {
    document.body.innerHTML='<div id="pOptions"><form id="pForm" name="cForm">Username:<input type="text" size=25 maxlength=20 id="paraBoxUser" name="user"><br>Room:<input type="text" size="25" name="room" value="Lobby-2"><br>Chat width:<input type="text" size="15" name="width" value="Stretch"><br>Chat height:<input type="text" size="15" name="height" value="Stretch"><br>Tab title:<input type="text" size="35" name="title" value="Chat Room - Join a Free Chat Room"><br>Timestamp:<input type="checkbox" name="stamp"><br>Window color:<input type="text" length=25 name="window" value="EEEEEE"><br>Window font color:<input type="text" length=25 name="font" value="111111"><br><label>Show tools:<input type="checkbox" name="tools" checked></label><br><input type="submit" id="pConnect" value="Connect" style="font: 10pt arial;" onClick="javascript: paraOp()"><input type="button" onClick="javascript: resetter()" value="Reset to defaults"><br>';
	cookieval=getCookier();
	if (cookieval!=null && cookieval!="") {
		document.cForm.user.value=cookieval.split(seperator)[0];
		document.cForm.room.value=cookieval.split(seperator)[1];
		document.cForm.width.value=cookieval.split(seperator)[2];
		document.cForm.height.value=cookieval.split(seperator)[3];
		document.cForm.title.value=cookieval.split(seperator)[4];
		document.cForm.stamp.checked=(cookieval.split(seperator)[5]=="true");
		document.cForm.window.value=cookieval.split(seperator)[6];
		document.cForm.font.value=cookieval.split(seperator)[7];
		document.cForm.tools.checked=(cookieval.split(seperator)[8]=="true");
	}
} else {
	uname=window.location.href.split("user=")[1].split("&")[0];
    if (!(uname.length>0)) {
        uname="Guest_"+Math.floor(Math.random()*100000);
    } else {
		uname=uname.replace(/[+]/g, " ");
	}
	
	if (inurl("title")!="false") {
		wintitle=inurl("title");
	} else {
		wintitle="Chat Room - Join a Chat Room";
	}
	wintitle=wintitle.replace(/[+]/g, " ");
	
    if (inurl("width")!="false") {
        wwidth=inurl("width");
        if (wwidth=="Stretch") {
            winwidth=window.innerWidth-20;
        }
    } else {
		winwidth=window.innerWidth-20;
	}
	if (inurl("height")!="false") {
        wheight=inurl("height");
        if (wheight=="Stretch") {
            winheight=window.innerHeight;
        }
    } else {
		winheight=window.innerHeight;
	}
	
	if (inurl("room")!="false") {
		room=inurl("room");
	} else {
		room="Lobby-2";
	}
	
    stamp=inurl("stamp");
	
	if (inurl("font")!="false") {
		fontcolor=inurl("font");
	} else {
		fontcolor="111111";
	}
	
	if (inurl("window")!="false") {
		windowcolor=inurl("window");
	} else {
		windowcolor="EEEEEE";
	}
	
	if (inurl("tools")!="false") {
		tools="inline";
		toolcook="true";
	} else {
		tools="none";
		toolcook="false";
	}
	
	document.body.style.background="#"+windowcolor;
	document.title=wintitle;
    document.body.innerHTML='<applet width='+(winwidth)+' height='+(winheight)+' codebase=http://basicplus.parachat.com/pchat/bc code=ParaChat.class archive=signedpapp.jar><param name=Col.UserList.Fg value=333333><param name=Val.Avatar value=false><param name=Val.MainFont value=Helvetica><param name=Col.List.Adm value=FF0000><param name=Col.List.Mod value=FF0000><param name=Val.Stamp value='+stamp+'><param name=Net.Site value=iPhone><param name=Net.Room value="'+room+'"><param name=Col.MainBg value="'+windowcolor+'"><param name=Col.MainFg value="'+fontcolor+'"><param name=jnlp_href value=paraapplet.jnlp><param name=Ctrl.AutoLogin value=true><param name=Net.User value="'+uname+'"><param name=codebase_lookup value=false><param name="downloadpath" value="http://chat.parachat.com/applet"></applet><br><style>body {background:#'+windowcolor+'; color:#'+fontcolor+';}#tools {display:'+tools+';}#tabler {height:50px;}#tabler td {border:1px solid black}#zalgotable {height:150px}</style><div id="tools"><table id="tabler"><tr><td><b><u>Normal duplicate characters</u></b><br>&middot;асеɡһірѕху<br>&middot;АВϹЕԌНІΚМΝОРЅТХΥΖ</td><td><b><u>Upside down</u></b><br>&middot;ɐɔəɟЧʞɯоɹƨʇʌʍхʎ<br>&middot;ІНΓиОΛХ</td><td><b><u>Reverse</u></b><br>&middot;ɘƨх<br>&middot;АƆƎНІМИОЯТХ</td><td><b><u>Miscellaneous</u></b><br>&middot;ˁ˚ᴥ˚ˀ &nbsp; &nbsp; (   ๏   Y   ๏   )<br>&middot;¯&#92;_(ツ)_/¯ &nbsp; &nbsp; ۜ\(סּںסּَ` )/ۜ  <br>&nbsp;</td></tr></table><table id="zalgotable"><tr><td id="lulz_container" style="BORDER: black 2px solid; PADDING: 3px;" width="30%"><p style="height:30px">Zalgo text generator (2009 - tchouky)</p><p style="height:120px" id="lulz"></p></td><td style="BORDER-RIGHT: black 2px solid; BORDER-TOP: black 2px solid; BORDER-LEFT: black 2px solid; BORDER-BOTTOM: black 2px solid"><textarea id="zalgo_txt" style="FONT-FAMILY: Times New Roman" rows="4" cols="40">ZALGO!</textarea><form id="zalgo_form" action=""><input id="zalgo_btn" onclick="zalgo_textarea("zalgo_txt");" type="button" value="fuck up!"><br /><table><tr><td><input id="zalgo_opt_up" type="checkbox">fuck up going up<BR><input id="zalgo_opt_mid" type="checkbox" CHECKED>fuck up the middle<BR><input id="zalgo_opt_down" type="checkbox" CHECKED>fuck up going down<BR></td><td><input id="zalgo_opt_mini" type="radio" name="optval" CHECKED >mini fuck up<BR><input id="zalgo_opt_normal" type="radio" name="optval">normal fuck up<BR><input id="zalgo_opt_maxi" type="radio" name="optval">maxi fuck up<BR></td></tr></table></form><script type="text/javascript">zalgo_textarea("zalgo_txt");</script></TD><td align=center width="50%"><form name="h" id="h"><textarea rows="5" cols="20" name="original" style="width:468px;height:110px;" onkeyup="flip()">Write here.</textarea><br><textarea rows="5" cols="20" name="flipped" style="width:468px;height:110px;"></textarea><br><input type="button" value="Flip Text" onClick="flip()"></form></td></tr></TABLE><br><div style="font-size:18px">Crazy text generator</div><input class="enter" id="inbox" name="input_box[]" onfocus="focuson()" onblur="bluron()" onKeyUp="symbol_convert()" size="50" type="text" value="Type your text here..." style="width:80%;display:inline;" /><br><input id="code-10" name="output_box1[]"><input id="code-30" name="output_box3[]"><input id="code-130" name="output_box130[]"><input id="code-140" name="output_box140[]"><input id="code-150" name="output_box150[]"><input id="code-80" name="output_box8[]"><input id="code-40" name="output_box4[]"><input id="code-50" name="output_box5[]"><input id="code-20" name="output_box2[]"><input id="code-60" name="output_box6[]"><input id="code-70" name="output_box7[]"><input id="code-90" name="output_box9[]"><input id="code-110" name="output_box110[]"><input id="code-120" name="output_box120[]"><input id="code-100" name="output_box10[]"></div>';
	cook=uname+seperator+room+seperator+wwidth+seperator+wheight+seperator+wintitle+seperator+stamp+seperator+windowcolor+seperator+fontcolor+seperator+toolcook;
	cookier(cook);
}

function inurl(urlstring) {
	tempstring=urlstring+"=";
	if (window.location.href.indexOf(tempstring)!=-1) {
		if (window.location.href.split(tempstring)[1].split("&")[0].length>0) {
			return window.location.href.split(tempstring)[1].split("&")[0];
		}
	}
	return "false";
}

function resetter() {
	document.cForm.user.value="";
	document.cForm.room.value="Lobby-2";
	document.cForm.width.value="Stretch";
	document.cForm.height.value="Stretch";
	document.cForm.title.value="Chat Room - Join a Free Chat Room";
	document.cForm.stamp.checked=false;
	document.cForm.window.value="EEEEEE";
	document.cForm.font.value="111111";
	document.cForm.tools.checked=true;
}

function cookier(valuein) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + 365);
	var c_value=escape(valuein) + ((365==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie="parachatscript=" + c_value;
}

function getCookier() {
	c_name="parachatscript";
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1) {
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1) {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}



//FOLLOWING SCRIPTS ARE WRITTEN BY OTHERS

//============================================================
			// ZALGO text script by tchouky
			//============================================================

			// data set of leet unicode chars
			//---------------------------------------------------

			//those go UP
			var zalgo_up = [
				'\u030d', /*     ?     */		'\u030e', /*     "     */		'\u0304', /*     Ϡ    */		'\u0305', /*     Ϡ    */
				'\u033f', /*     ?     */		'\u0311', /*     ?     */		'\u0306', /*     ?     */		'\u0310', /*     ?     */
				'\u0352', /*     ?     */		'\u0357', /*     ?     */		'\u0351', /*     ?     */		'\u0307', /*     ?     */
				'\u0308', /*     Ƞ    */		'\u030a', /*     Р    */		'\u0342', /*     ?     */		'\u0343', /*     ?     */
				'\u0344', /*     ?     */		'\u034a', /*     ?     */		'\u034b', /*     ?     */		'\u034c', /*     ?     */
				'\u0303', /*     ~     */		'\u0302', /*     ^     */		'\u030c', /*     ?     */		'\u0350', /*     ?     */
				'\u0300', /*     `     */		'\u0301', /*     Ԡ    */		'\u030b', /*     ?     */		'\u030f', /*     ?     */
				'\u0312', /*     ?     */		'\u0313', /*     ?     */		'\u0314', /*     ?     */		'\u033d', /*     ?     */
				'\u0309', /*     ?     */		'\u0363', /*     ?     */		'\u0364', /*     ?     */		'\u0365', /*     ?     */
				'\u0366', /*     ?     */		'\u0367', /*     ?     */		'\u0368', /*     ?     */		'\u0369', /*     ?     */
				'\u036a', /*     ?     */		'\u036b', /*     ?     */		'\u036c', /*     ?     */		'\u036d', /*     ?     */
				'\u036e', /*     ?     */		'\u036f', /*     ?     */		'\u033e', /*     ?     */		'\u035b', /*     ?     */
				'\u0346', /*     ?     */		'\u031a' /*     ?     */
			];

			//those go DOWN
			var zalgo_down = [
				'\u0316', /*     ?     */		'\u0317', /*     ?     */		'\u0318', /*     ?     */		'\u0319', /*     ?     */
				'\u031c', /*     ?     */		'\u031d', /*     ?     */		'\u031e', /*     ?     */		'\u031f', /*     ?     */
				'\u0320', /*     ?     */		'\u0324', /*     ?     */		'\u0325', /*     ?     */		'\u0326', /*     ?     */
				'\u0329', /*     ?     */		'\u032a', /*     ?     */		'\u032b', /*     ?     */		'\u032c', /*     ?     */
				'\u032d', /*     ?     */		'\u032e', /*     ?     */		'\u032f', /*     ?     */		'\u0330', /*     ?     */
				'\u0331', /*     _     */		'\u0332', /*     _     */		'\u0333', /*     ?     */		'\u0339', /*     ?     */
				'\u033a', /*     ?     */		'\u033b', /*     ?     */		'\u033c', /*     ?     */		'\u0345', /*     ?     */
				'\u0347', /*     ?     */		'\u0348', /*     ?     */		'\u0349', /*     ?     */		'\u034d', /*     ?     */
				'\u034e', /*     ?     */		'\u0353', /*     ?     */		'\u0354', /*     ?     */		'\u0355', /*     ?     */
				'\u0356', /*     ?     */		'\u0359', /*     ?     */		'\u035a', /*     ?     */		'\u0323' /*     ?     */
			];
			
			//those always stay in the middle
			var zalgo_mid = [
				'\u0315', /*     ?     */		'\u031b', /*     ?     */		'\u0340', /*     ?     */		'\u0341', /*     ?     */
				'\u0358', /*     ?     */		'\u0321', /*     ?     */		'\u0322', /*     ?     */		'\u0327', /*     ؠ    */
				'\u0328', /*     ?     */		'\u0334', /*     ?     */		'\u0335', /*     ?     */		'\u0336', /*     ?     */
				'\u034f', /*     ?     */		'\u035c', /*     ?     */		'\u035d', /*     ?     */		'\u035e', /*     ?     */
				'\u035f', /*     ?     */		'\u0360', /*     ?     */		'\u0362', /*     ?     */		'\u0338', /*     ?     */
				'\u0337', /*     ?     */		'\u0361', /*     ?     */		'\u0489' /*     ?_     */		
			];
			
			// rand funcs
			//---------------------------------------------------
			
			//gets an int between 0 and max
			function rand(max)
			{
				return Math.floor(Math.random() * max);
			}

			//gets a random char from a zalgo char table
			function rand_zalgo(array)
			{
				var ind = Math.floor(Math.random() * array.length);
				return array[ind];
			}
			
			// utils funcs
			//---------------------------------------------------
			
			//hide show element
			function toggle(id)
			{
				if(document.getElementById(id).style.display == "none")
					document.getElementById(id).style.display = "block";
				else
					document.getElementById(id).style.display = "none";
			}
			
			
			//lookup char to know if its a zalgo char or not
			function is_zalgo_char(c)
			{
				var i;
				for(i=0; i<zalgo_up.length; i++)
					if(c == zalgo_up[i])
						return true;
				for(i=0; i<zalgo_down.length; i++)
					if(c == zalgo_down[i])
						return true;
				for(i=0; i<zalgo_mid.length; i++)
					if(c == zalgo_mid[i])
						return true;
				return false;
			}
			
			// main shit
			//---------------------------------------------------
			function zalgo_textarea(id)
			{
				var p = document.getElementById(id);
				
				var txt = p.value;
				var newtxt = '';
					
				for(var i=0; i<txt.length; i++)
				{
					if(is_zalgo_char(txt.substr(i, 1)))
						continue;
					
					var num_up;
					var num_mid;
					var num_down;
					
					//add the normal character
					newtxt += txt.substr(i, 1);

					//options
					if(document.getElementById('zalgo_opt_mini').checked)
					{
						num_up = rand(8);
						num_mid = rand(2);
						num_down = rand(8);
					}
					else if(document.getElementById('zalgo_opt_normal').checked)
					{
						num_up = rand(16) / 2 + 1;
						num_mid = rand(6) / 2;
						num_down = rand(16) / 2 + 1;
					}
					else //maxi
					{
						num_up = rand(64) / 4 + 3;
						num_mid = rand(16) / 4 + 1;
						num_down = rand(64) / 4 + 3;
					}
					
					
					if(document.getElementById('zalgo_opt_up').checked)
						for(var j=0; j<num_up; j++)
							newtxt += rand_zalgo(zalgo_up);
					if(document.getElementById('zalgo_opt_mid').checked)
						for(var j=0; j<num_mid; j++)
							newtxt += rand_zalgo(zalgo_mid);
					if(document.getElementById('zalgo_opt_down').checked)
						for(var j=0; j<num_down; j++)
							newtxt += rand_zalgo(zalgo_down);
				}

				//result is in nextxt, display that
				
				//remove all children of lulz_container
				var container = document.getElementById('lulz_container');
				while(container.childNodes.length)
					container.removeChild(container.childNodes[0]);

				//build blocks for each line & create a <br />
				var lines = newtxt.split("\n");
				for(var i=0; i<lines.length; i++)
				{
					var n = document.createElement('text');
					n.innerHTML = lines[i];
					container.appendChild(n);
					var nl = document.createElement('br');
					container.appendChild(nl);
				}

				//done
			}
			
	function flip() {
	var result = flipString(document.h.original.value);
	document.h.flipped.value = result;
}

function flipString(aString) {
	aString = aString.toLowerCase();
	var last = aString.length - 1;
	var result = "";
	for (var i = last; i >= 0; --i) {
		result += flipChar(aString.charAt(i))
	}
	return result;
}

function flipChar(c) {
	if (c == 'a') {
		return '\u0250'
	}
	else if (c == 'b') {
		return 'q'
	}
	else if (c == 'c') {
		return '\u0254'  
	}
	else if (c == 'd') {
		return 'p'
	}
	else if (c == 'e') {
		return '\u01DD'
	}
	else if (c == 'f') {
		return '\u025F' 
	}
	else if (c == 'g') {
		return 'b'
	}
	else if (c == 'h') {
		return '\u0265'
	}
	else if (c == 'i') {
		return '\u0131'//'\u0131\u0323' 
	}
	else if (c == 'j') {
		return '\u0638'
	}
	else if (c == 'k') {
		return '\u029E'
	}
	else if (c == 'l') {
		return '\u05DF'
	}
	else if (c == 'm') {
		return '\u026F'
	}
	else if (c == 'n') {
		return 'u'
	}
	else if (c == 'o') {
		return 'o'
	}
	else if (c == 'p') {
		return 'd'
	}
	else if (c == 'q') {
		return 'b'
	}
	else if (c == 'r') {
		return '\u0279'
	}
	else if (c == 's') {
		return 's'
	}
	else if (c == 't') {
		return '\u0287'
	}
	else if (c == 'u') {
		return 'n'
	}
	else if (c == 'v') {
		return '\u028C'
	}
	else if (c == 'w') {
		return '\u028D'
	}
	else if (c == 'x') {
		return 'x'
	}
	else if (c == 'y') {
		return '\u028E'
	}
	else if (c == 'z') {
		return 'z'
	}
	else if (c == '[') {
		return ']'
	}
	else if (c == ']') {
		return '['
	}
	else if (c == '(') {
		return ')'
	}
	else if (c == ')') {
		return '('
	}
	else if (c == '{') {
		return '}'
	}
	else if (c == '}') {
		return '{'
	}
	else if (c == '?') {
		return '\u00BF'  
	}
	else if (c == '\u00BF') {
		return '?'
	}
	else if (c == '!') {
		return '\u00A1'
	}
	else if (c == "\'") {
		return ','
	}
	else if (c == ',') {
		return "\'"
	}
	else if (c == '.') {
		return '\u02D9'
	}
	else if (c == '_') {
		return '\u203E'
	}
	else if (c == ';') {
		return '\u061B'
	}
	else if (c == '9') {
		return '6'
	}
	else if (c == '6') {
		return '9'
	}
	return c;
}