

// ==UserScript==
// @name            HKG Quick Reply
// @namespace       http://forum.hkgolden.com
// @description     Quick Reply v2.3a (by jackyct1)
// @include         http://forum*.hkgolden.com/view.asp*
// ==/UserScript==

// ===============
// script by jackyct1
// version 2.3a
// ===============

(function() {

	tdList = document.getElementsByTagName("td");
	loc=""+document.location+"";
	var msgQuote = new Array();
	var checkedPage = false;
	var startPageNum = false;

	function getCookie(c_name) {
		if (document.cookie.length>0) {
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1) {
				c_start=c_start + c_name.length+1
				c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			}
		}
		return null
	}
	hkgLastReply=getCookie('hkgLastReply');
	if (hkgLastReply==null) hkgLastReply='';
	hkgLastReply = hkgLastReply.replace(/(\n)/g, "\\n");
	hkgLastReply = hkgLastReply.replace(/(\')/g, "\\'");
	hkgLastReply = hkgLastReply.replace(/(\")/g, "&quot;");

	var GM_s = document.createElement('script');
	funText = 'function InsertText( text, splittable ) {\n';
	funText += 'var TextArea = document.getElementById("messagetext");\n';
	funText += 'var l;\n';
	funText += 'if (TextArea) {\n';
	funText += 'TextArea.focus();\n';
	funText += 'if (splittable)\n';
	funText += 'l = text.split(/,/);\n';
	funText += 'else\n';
	funText += 'l = text\n';
	funText += '\n';
	funText += 'var ti = TextArea.selectionEnd, ts = TextArea.selectionStart;// Copied from the Glomerulus\n';
	funText += 'if (l instanceof Array) {\n';
	funText += 'if (ti != ts) {\n';
	funText += 'if (l[0]!="[quote]") {var subValue = TextArea.value.substring(ts, ti).replace(/(\\n)/g, l[2]+"\\n"+l[0])}else{var subValue = TextArea.value.substring(ts, ti)};\n';
	funText += 'TextArea.value = TextArea.value.substring(0, ts) + l[0] + subValue + l[2] + TextArea.value.substr(ti);\n';
	funText += 'TextArea.selectionStart = ts + l[0].length\n';
	funText += 'TextArea.selectionEnd = ti + l[2].length - 1;\n';
	funText += '} else {\n';
	funText += 'TextArea.value = TextArea.value.substring(0, ts) + l[0] + l[1] + l[2] + TextArea.value.substr(ti);\n';
	funText += 'TextArea.selectionStart = ti + l[0].length;\n';
	funText += 'TextArea.selectionEnd = TextArea.selectionStart + l[1].length;\n';
	funText += '}\n';
	funText += '} else {\n';
	funText += 'TextArea.value = TextArea.value.substring(0, ts) + l + " " + TextArea.value.substr(ti);\n';
	funText += 'TextArea.selectionStart = TextArea.selectionEnd = ti + l.length + 1;\n';
	funText += '}\n';
	funText += 'TextArea.focus();\n';
	funText += '}\n';
	funText += '//return false;\n';
	funText += '}\n';
	funText += 'function setCookie(c_name,value,expiredays) {\n';
	funText += 'var exdate=new Date()\n';
	funText += 'exdate.setDate(exdate.getDate()+expiredays)\n';
	funText += 'document.cookie=c_name+ "=" +escape(value)+\n';
	funText += '((expiredays==null) ? "" : "; expires="+exdate)\n';
	funText += '}\n';
	funText += 'function EndText() {\n';
	funText += 'var TextArea = document.getElementById("messagetext");\n';
	funText += 'if (TextArea.value) {\n';
	funText += 'TextArea.value=TextArea.value.replace(/  /g, "&nbsp; ");\n';
	funText += 'arTempText=TextArea.value.split("[/quote]");\n';
	funText += 'tempText=arTempText[arTempText.length-1];\n';
	funText += 'tempText=tempText.substr(0,280);\n';
	funText += 'setCookie(\'hkgLastReply\',tempText,365);\n';
	funText += '}\n';
	funText += '}\n';
	GM_ss=document.createTextNode(funText);
	GM_s.appendChild(GM_ss);
	document.getElementsByTagName('head')[0].appendChild(GM_s); 

	//html_to_bbcode
	function htmlToBBcode(msg) {
		var bbmsg;
		bbmsg = msg.replace(/(<br>)/g, "");
		bbmsg = bbmsg.replace(/(\\)/g, "\\\\");
		bbmsg = bbmsg.replace(/(\n)/g, "\\n");
		bbmsg = bbmsg.replace(/(<img src=\"([^\"]*)\" alt=\"([^\"]*)\">)/g, "$3");
		for (var b=0; b<bbmsg.split("img").length; b++) {
			bbmsg = bbmsg.replace(/((.*)\<a([^\>]*)\>\<img(.*)src=\"([^\"]*)\"([^>]*)><\/a>)/g, "$2[img]$5[/img]");
		};
		bbmsg = bbmsg.replace(/(<a href=\"([^\"]*)\" rel=\"external\">([^<]*)<\/a>)/g, "[url]$2[/url]");
		bbmsg = bbmsg.replace(/(<a href=\"mailto:([^\"]*)\">([^<]*)<\/a>)/g, "[url]$2[/url]");
		bbmsg = bbmsg.replace(/(<blockquote><div style=\"color: rgb\(0, 0, 160\);\">)/g, "[quote]");
		bbmsg = bbmsg.replace(/(<\/div><\/blockquote>)/g, "[/quote]");
		bbmsg = bbmsg.replace(/(<ul>)/g, "[list]");
		bbmsg = bbmsg.replace(/(<li>)/g, "[*]");
		bbmsg = bbmsg.replace(/(<\/li>)/g, "[/*]");
		bbmsg = bbmsg.replace(/(<\/ul>)/g, "[/list]");
		bbmsg = bbmsg.replace(/(<div style=\"text-align: (left|center|right);\"><!--start ([^-]*)-->)/g, "[$2]");
		bbmsg = bbmsg.replace(/(<!--end (left|center|right)--><\/div>)/g, "[/$2]");
		bbmsg = bbmsg.replace(/(<strong>)/g, "[b]");
		bbmsg = bbmsg.replace(/(<\/strong>)/g, "[/b]");
		bbmsg = bbmsg.replace(/(<em>)/g, "[i]");
		bbmsg = bbmsg.replace(/(<\/em>)/g, "[/i]");
		bbmsg = bbmsg.replace(/(<ins>)/g, "[u]");
		bbmsg = bbmsg.replace(/(<\/ins>)/g, "[/u]");
		bbmsg = bbmsg.replace(/(<del>)/g, "[s]");
		bbmsg = bbmsg.replace(/(<\/del>)/g, "[/s]");
		bbmsg = bbmsg.replace(/(<br>)/g, "[br]");
		bbmsg = bbmsg.replace(/<h([1-6]{1})>/g, "[h$1]");
		bbmsg = bbmsg.replace(/<\/h([1-6]{1})>/g, "[/h$1]");
		bbmsg = bbmsg.replace(/(<span style=\"font-size: xx-large;\"><!--start size-->)/g, "[size=6]");
		bbmsg = bbmsg.replace(/(<span style=\"font-size: x-large;\"><!--start size-->)/g, "[size=5]");
		bbmsg = bbmsg.replace(/(<span style=\"font-size: large;\"><!--start size-->)/g, "[size=4]");
		bbmsg = bbmsg.replace(/(<span style=\"font-size: medium;\"><!--start size-->)/g, "[size=3]");
		bbmsg = bbmsg.replace(/(<span style=\"font-size: small;\"><!--start size-->)/g, "[size=2]");
		bbmsg = bbmsg.replace(/(<span style=\"font-size: x-small;\"><!--start size-->)/g, "[size=1]");
		bbmsg = bbmsg.replace(/(<!--end size\[([0-9]?)\]-->)/g, "[/size=$2]");
		bbmsg = bbmsg.replace(/(<span style=\"color: ([^;]*);\"><!--start color-->)/g, "[$2]");
		bbmsg = bbmsg.replace(/(<!--end color\[([^\]]*)\]-->)/g, "[/$2]");
		bbmsg = bbmsg.replace(/(\")/g, "&quot;");
		bbmsg = bbmsg.replace(/(\'\')/g, "\\\'");
		bbmsg = bbmsg.replace(/(<\/span>)/g, "");
		bbmsg = "[quote]"+bbmsg+"[/quote]";
		//alert(bbmsg);
    	return(bbmsg);
	}

	msgSubject='&nbsp;';
	//check_login + msg_subject + msg_quote
	for (var i=0; i<tdList.length; i++) {
		if(tdList[i].getAttribute("style")!=null){
			if (tdList[i].getAttribute("style").indexOf("width: 45%;")>=0 && tdList[i].innerHTML.indexOf("javascript:islogout()")>=0){
				startScript = 1;
			}
			if (tdList[i].getAttribute("style").indexOf("font-weight: bold;")>=0 && tdList[i].getAttribute("style").indexOf("150px;")>=0){
				//alert(tdList[i].innerHTML);
				msgSubject=unescape(tdList[i+1].innerHTML);
				msgSubject = msgSubject.replace(/(	)/g, "-");
			}
			if (tdList[i].getAttribute("style").indexOf("background-color: rgb(243, 242, 241); height: 100%;")>=0){
				htb=htmlToBBcode(tdList[i+1].innerHTML);
				//msgQuote="&nbsp;<img style='border-width: 0px; cursor: pointer;' src='images/quote.gif' onclick=\"javascript:document.getElementById('messagetext').focus();document.getElementById('messagetext').value='"+htb+"'\" alt='QuickQuote' />";
				msgQuote="&nbsp;<a style='cursor: pointer;' onclick=\"javascript:document.getElementById('messagetext').focus();document.getElementById('messagetext').value='"+htb+"'\"><strong>[&#24341;]</strong></a>";
				tdList[i+2].innerHTML+=msgQuote;
				//alert(htb);
			}
		}
	}

	//Search_event
	function SearchEvent() {
		func=SearchEvent.caller;
		while(func!=null) {
			var arg0=func.arguments[0];
			if(arg0) {
				if(arg0.constructor==Event) return arg0;
			}
			func=func.caller;
		}
		return null;
	}
	event=SearchEvent();

	//script_start + check_page
	tempPage = loc.replace(/(.*)page=([0-9]{0,2})(.*)/i, "$2");
	if (typeof(startScript)=="number") {
		for (var i=0; i<tdList.length; i++) {
			if(tdList[i].getAttribute("style")!=null){
				if (tdList[i].getAttribute("style").indexOf("width: 46%;")>=0 && startPageNum!=true) {
					var tpageNum = tdList[i].innerHTML.match(/([0-9]+)<\/option>/g);
					var apageNum = tpageNum[tpageNum.length-1].match(/([0-9]+)/i);
					var pageNum = apageNum[0];
					startPageNum=true;
					//alert(pageNum);
				}
				if (tempPage>1 && tdList[i].getAttribute("style").indexOf("width: 150px;")>=0 && checkedPage!=true) {
					if (tdList[i-1].innerHTML.match(/[0-9]+/i)%50==0) {pageNum++;};
					checkedPage=true;
				} else if (tdList[i].getAttribute("style").indexOf("width: 100%; text-align: right;")>=0 && checkedPage!=true) {
					if (tdList[i+1].innerHTML.match(/[0-9]+/i)%50==0) {var pageNum=2;};
					if (tdList[i+1].innerHTML.match(/[0-9]+/i)==0) {var pageNum=1;};
					checkedPage=true;
				}
				if (tdList[i].getAttribute("style").indexOf("width: 57%;")>=0 && tdList[i].getAttribute("style").indexOf("text-align: right;")<0){
					tempNum = loc.match(/[0-9]{3,}/i);
					temp = "<br /><br /><form target='reload"+tempNum+"' id='newmessage' method='post' action='validate.asp?messageid="+tempNum+"' onkeydown=\"if(event.ctrlKey&&event.keyCode==13){if(document.getElementById('messagesend').value=='Y'){window.location.href='view.asp?message="+tempNum+"&page="+pageNum+"';}else{EndText();document.getElementById('messagesend').value='Y';this.submit();};}\">";
					temp += "<table class='repliers' border='1' cellpadding='8' cellspacing='0' style='border-collapse: collapse;border-color:#111111;margin-left:auto;margin-right:auto;' width='550'>";
					temp += "<tr><td valign=\"top\" style=\"background-color: #336699; color:#FFFFFF; font-weight:bold;\">&#24555;&#36895;&#22238;&#35206;</td></tr><tr><td style=\"background-color: #F3F2F1; height: 100%;\">";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='images/image.gif' onclick=\"javascript:InsertText('[img],Image,[/img]', true);\" alt='Image' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='images/url.gif' onclick=\"javascript:InsertText('[url],Url,[/url]', true);\" alt='Link' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='images/quote.gif' onclick=\"javascript:InsertText('[quote],Quote,[/quote]', true);\" alt='Quote' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='images/leftjust.gif' onclick=\"javascript:InsertText('[left],text,[/left]',true);\" alt='Align Left' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='images/centered.gif' onclick=\"javascript:InsertText('[center],text,[/center]',true);\" alt='Align Center' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='images/rightjust.gif' onclick=\"javascript:InsertText('[right],text,[/right]',true);\" alt='Align Right' />&nbsp;";
					temp += "<a href=\"javascript:InsertText('[b],&#31895;&#39636;,[/b]',true);\" style='font-weight: bold; text-decoration: none;'>B</a>&nbsp;";
					temp += "<a href=\"javascript:InsertText('[i],&#26012;&#39636;,[/i]',true);\" style='font-style: italic; text-decoration: none;'>I </a>&nbsp;";
					temp += "<a href=\"javascript:InsertText('[u],&#24213;&#32218;,[/u]',true);\"><ins>U</ins></a>&nbsp;";
					temp += "<a href=\"javascript:InsertText('[s],&#26012;&#39636;,[/s]',true);\" style='text-decoration: none;'><del>S</del></a>&nbsp;";
					temp += "<select size='1' name='fontsize' onchange=\"javascript:InsertText(this.value, true);this.options[0].selected=true;\"><option value=',,' selected='selected'>&#23383;&#22411;&#22823;&#23567;</option><option value='[size=6],&#36229;&#22823;,[/size=6]'>[size=6]&#36229;&#22823;[/size=6]</option><option value='[size=5],&#29305;&#22823;,[/size=5]'>[size=5]&#29305;&#22823;[/size=5]</option><option value='[size=4],&#22823;,[/size=4]'>[size=4]&#22823;[/size=4]</option><option value='[size=3],&#19968;&#33324;,[/size=3]'>[size=3]&#19968;&#33324;[/size=3]</option><option value='[size=2],&#23567;,[/size=2]'>[size=2]&#23567;[/size=2]</option><option value='[size=1],&#29305;&#23567;,[/size=1]'>[size=1]&#29305;&#23567;[/size=1]</option></select>&nbsp;";
					temp += "<select size='1' name='fontcolor' onchange=\"javascript:InsertText(this.value, true);this.options[0].selected=true;\"><option value=',,' selected='selected'>&#23383;&#22411;&#38991;&#33394;</option><option value='[red],&#32005;&#33394;,[/red]' style='color: red;'>[red]&#32005;&#33394;[/red]</option><option value='[green],&#32160;&#33394;,[/green]' style='color: green;'>[green]&#32160;&#33394;[/green]</option><option value='[blue],&#34253;&#33394;,[/blue]' style='color: blue;'>[blue]&#34253;&#33394;[/blue]</option><option value='[purple],&#32043;&#33394;,[/purple]' style='color: purple;'>[purple]&#32043;&#33394;[/purple]</option><option value='[violet],&#32043;&#32005;,[/violet]' style='color: violet;'>[violet]&#32043;&#32005;[/violet]</option><option value='[brown],&#26837;&#33394;,[/brown]' style='color: brown;'>[brown]&#26837;&#33394;[/brown]</option><option value='[black],&#40657;&#33394;,[/black]' style='color: black;'>[black]&#40657;&#33394;[/black]</option><option value='[pink],&#31881;&#32005;,[/pink]' style='color: pink;'>[pink]&#31881;&#32005;[/pink]</option><option value='[orange],&#27225;&#33394;,[/orange]' style='color: orange;'>[orange]&#27225;&#33394;[/orange]</option><option value='[gold],&#37329;&#33394;,[/gold]' style='color: gold;'>[gold]&#37329;&#33394;[/gold]</option><option value='[maroon],&#28145;&#32005;,[/maroon]' style='color: maroon;'>[maroon]&#28145;&#32005;[/maroon]</option><option value='[teal],&#28154;&#34253;,[/teal]' style='color: teal;'>[teal]&#28154;&#34253;[/teal]</option><option value='[navy],&#28145;&#34253;,[/navy]' style='color: navy;'>[navy]&#28145;&#34253;[/navy]</option><option value='[limegreen],&#28154;&#32160;,[/limegreen]' style='color: limegreen;'>[limegreen]&#28154;&#32160;[/limegreen]</option></select>&nbsp;<br />";
					temp += "<hr />";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/angel.gif' onclick=\"javascript:InsertText('O:-)',false)\"width='15' height='23' alt='O:-)' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/dead.gif' onclick=\"javascript:InsertText('xx(',false)\"width='15' height='15' alt='xx(' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/smile.gif' onclick=\"javascript:InsertText(':)',false)\"width='15' height='15' alt=':)' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/clown.gif' onclick=\"javascript:InsertText(':o)',false)\"width='15' height='15' alt=':o)' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/frown.gif' onclick=\"javascript:InsertText(':-(',false)\"width='15' height='15' alt=':-(' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/cry.gif' onclick=\"javascript:InsertText(':~(',false)\"alt=':~(' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/wink.gif' onclick=\"javascript:InsertText(';-)',false)\"width='15' height='15' alt=';-)' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/angry.gif' onclick=\"javascript:InsertText(':-[',false)\"width='15' height='15' alt=':-[' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/devil.gif' onclick=\"javascript:InsertText(':-]',false)\"width='15' height='15' alt=':-]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/biggrin.gif' onclick=\"javascript:InsertText(':D',false)\"width='15' height='15' alt=':D' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/oh.gif' onclick=\"javascript:InsertText(':O',false)\"width='15' height='15' alt=':O' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/tongue.gif' onclick=\"javascript:InsertText(':P',false)\"width='15' height='15' alt=':P' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/kiss.gif' onclick=\"javascript:InsertText('^3^',false)\"alt='^3^' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/wonder.gif' onclick=\"javascript:InsertText('?_?',false)\"alt='?_?' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/agree.gif' onclick=\"javascript:InsertText('#yup#',false)\"width='26' height='28' alt='#yup#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/donno.gif' onclick=\"javascript:InsertText('#ng#',false)\"width='16' height='16' alt='#ng#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/hehe.gif' onclick=\"javascript:InsertText('#hehe#',false)\"width='15' height='15' alt='#hehe#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/love.gif' onclick=\"javascript:InsertText('#love#',false)\"width='15' height='15' alt='#love#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/surprise.gif' onclick=\"javascript:InsertText('#oh#',false)\"width='15' height='15' alt='#oh#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/chicken.gif' onclick=\"javascript:InsertText('#cn#',false)\"width='18' height='13' alt='#cn#' /><br />";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/ass.gif' onclick=\"javascript:InsertText('#ass#',false)\"alt='#ass#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/sosad.gif' onclick=\"javascript:InsertText('[sosad]',false)\"alt='[sosad]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/good.gif' onclick=\"javascript:InsertText('#good#',false)\"alt='#good#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/hoho.gif' onclick=\"javascript:InsertText('#hoho#',false)\"alt='#hoho#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/kill.gif' onclick=\"javascript:InsertText('#kill#',false)\"alt='#kill#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/bye.gif' onclick=\"javascript:InsertText('#bye#',false)\"alt='#bye#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/z.gif' onclick=\"javascript:InsertText('Z_Z',false)\"alt='Z_Z' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/@.gif' onclick=\"javascript:InsertText('@_@',false)\"alt='@_@' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/adore.gif' onclick=\"javascript:InsertText('#adore#',false)\"alt='#adore#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/wonder2.gif' onclick=\"javascript:InsertText('???',false)\"alt='???' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/banghead.gif' onclick=\"javascript:InsertText('[banghead]',false)\"alt='[banghead]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/bouncer.gif' onclick=\"javascript:InsertText('[bouncer]',false)\"alt='[bouncer]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/bouncy.gif' onclick=\"javascript:InsertText('[bouncy]',false)\"alt='[bouncy]' /><br />";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/censored.gif' onclick=\"javascript:InsertText('[censored]',false)\"alt='[censored]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/flowerface.gif' onclick=\"javascript:InsertText('[flowerface]',false)\"alt='[flowerface]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/shocking.gif' onclick=\"javascript:InsertText('[shocking]',false)\"alt='[shocking]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/photo.gif' onclick=\"javascript:InsertText('[photo]',false)\"alt='[photo]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/fire.gif' onclick=\"javascript:InsertText('#fire#',false)\"alt='#fire#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/yipes.gif' onclick=\"javascript:InsertText('[yipes]',false)\"alt='[yipes]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/369.gif' onclick=\"javascript:InsertText('[369]',false)\"alt='[369]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/bomb.gif' onclick=\"javascript:InsertText('[bomb]',false)\"alt='[bomb]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/slick.gif' onclick=\"javascript:InsertText('[slick]',false)\"alt='[slick]' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/fuck.gif' onclick=\"javascript:InsertText('fuck',false)\"alt='fuck' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/no.gif' onclick=\"javascript:InsertText('#no#',false)\"alt='#no#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/kill2.gif' onclick=\"javascript:InsertText('#kill2#',false)\"alt='#kill2#' />&nbsp;";
					temp += "<img style='border-width: 0px; cursor: pointer;' src='faces/offtopic.gif' onclick=\"javascript:InsertText('[offtopic]',false)\"alt='[offtopic]' /><br />";
					temp += "<textarea rows='8' name='messagetext' cols='80' style='width: 534; word-break: break-all;' id='messagetext'></textarea><br />";
					temp += "<input type='hidden' name='messagetype' value='Y' /><input type='hidden' name='messagesubject' value='"+msgSubject+"' /><input type='hidden' id='messagesuccess' value='N' /><input type='hidden' id='messagesend' value='N' />";
					temp += "<table width=100%><tr><td align='left'><input type='image' src='images/btn-submit.gif' style='border-width: 0px;' onclick=\"if(document.getElementById('messagesend').value=='Y'){window.location.href='view.asp?message="+tempNum+"&page="+pageNum+"';}else{EndText();document.getElementById('messagesend').value='Y';this.submit();}\" />&nbsp;&nbsp;(&#21487;&#20351;&#29992; Ctrl+Enter &#30452;&#25509;&#36865;&#20986;)</td>";
					temp += "<td align='right'><a style='cursor: pointer;' onclick=\"javascript:document.getElementById('messagetext').focus();document.getElementById('messagetext').value='"+hkgLastReply+"'\"><strong>[&#24489;]</strong></a></td></tr></table>";
					temp += "</td></tr></table>";
					temp += "</form><iframe name='reload"+tempNum+"' onload=\"document.getElementById('messagesuccess').value=='Y' ? window.location.href='view.asp?message="+tempNum+"&page="+pageNum+"' : document.getElementById('messagesuccess').value='Y';\" style=\"display:none;\"></iframe><br /><br />";
					tdList[i+2].innerHTML+=temp;
				}
			}
		}
	}

})();