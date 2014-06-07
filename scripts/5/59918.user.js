// ==UserScript==
// @name 		Orkut community thread Quick Replys
// @author 		Shubham Jain
// @namespace	 http://www.orkut.co.in/Main#Profile?uid=17477750861732923167
// @description 	Adds a quick reply text box to community threads on orkut with cpatcha support. It automatically takes on last page after a reply. Also it is ajax based script.
// @include 	http://*orkut*/CommMsgs*
// ==/UserScript==
function stripCommas(numString) {
	var re = /,/g;
	return numString.replace(re,"");
}
/*"     //if(http_request.responseText.match(/Captcha/)[0])"+
"//document.getElementById('pc_0')=http_request.responseText.match(/<img src=(.*)CaptchaImage(.*) alt=(.*)>/)[0];"+
"//else "+*/

function addForm()
{

	var posts = document.body.innerHTML.match(/showing <b>[0-9-,]+<\/b> of <b>([0-9,]+)<\/b>/);
	var vURL = window.location.href;
	var cmm = vURL.match(/cmm=[0-9]+/g);
	var tid = vURL.match(/tid=[0-9]+/g);
	var postToken = document.body.innerHTML.match(/<input.*"POST_TOKEN".*<input.*"signature".*>/g);

	posts[1]=stripCommas(posts[1]);

	var hiddeninputs = postToken[0];
	var crappy = "";
	var p = document.getElementById("mboxfull");
	var f = document.createElement("script");
	f.innerHTML ="\n"+
	"function alertContents() {\n"+
	"	if (http_request.readyState == 4) {\n"+
	"		if(http_request.responseText.match(/CaptchaImage/)){\n"+
	"			document.getElementById('pc_0').style.display ='inline';\n"+
	"			document.getElementById('pc_0').innerHTML='<h2>Captcha</h2>'+http_request.responseText.match(/<img(.*)CaptchaImage\\?xid=([^>]+)>/g)+'<br><div style=\"background-color: #DDEEFF;\"><div style=\\'margin-left: 20px\\'><input type=\"text\" size=22 id=\"cs\" /><br /><span class=\"grabtn\"><a href=\"javascript:void(0);\" onclick=ajax(\""+cmm[0]+'&'+tid[0]+'&'+"cs=\"+document.getElementById(\"cs\").value) class=\"btn\">submit captcha</a></span><span class=\"btnboxr\"><img src=\"http://img1.orkut.com/img/b.gif\" alt=\"\" height=\"1\" width=\"5\"></span></div></div>';\n"+
	"			return false;\n"+
	"		}\n"+
	"		if (http_request.status == 200) {\n"+
	"			window.location.href+='&na=2&nst="+(posts[1]-9)+"';\n"+
	"        } else {\n"+
	"  			alert('There was a problem with the request.');\n"+
	"		}\n"+
	"	}\n"+
	"};\n"+
	"function ajax(parameters){\n"+
		"var subjectText=encodeURIComponent(document.getElementById(\"subject\").value);\n"+
		"var bodyText=encodeURIComponent(document.getElementById(\"messageBody\").value);\n"+
		"var url='CommMsgPost?'+parameters;\n"+
		"parameters+='&POST_TOKEN='+encodeURIComponent(document.getElementsByName('POST_TOKEN')[0].value)+'&signature='+encodeURIComponent(document.getElementsByName('signature')[0].value)+'&bodyText='+bodyText+'&subjectText='+subjectText+'&Action.submit';\n"+
		"http_request=new XMLHttpRequest();\n"+
		"http_request.onreadystatechange = alertContents;\n"+
		"http_request.open('POST', url, true);\n"+
		"http_request.setRequestHeader(\"Content-type\", \"application/x-www-form-urlencoded\");\n"+
		"http_request.setRequestHeader(\"Content-length\", parameters.length);\n"+
		"http_request.send(parameters);\n"+
	"};\n"+


	"function hidepreview(){\n"+
	"	var gultuu = document.getElementById('pc_0');\n"+
	"	gultuu.style.display = 'none';\n"+
	"};\n\n"+

	"function ppreview(parameters){\n"+
	"	var subjectText=encodeURIComponent(document.getElementById(\"subject\").value);\n"+
	"	var bodyText=encodeURIComponent(document.getElementById(\"messageBody\").value);\n"+
	"	var gultuu = document.getElementById('pc_0');\n"+
	"	gultuu.style.display = 'inline';\n"+
	"   http_request=new XMLHttpRequest();\n"+
	"	var url='CommMsgPost?'+parameters;\n"+
	"	parameters+='&POST_TOKEN='+encodeURIComponent(document.getElementsByName('POST_TOKEN')[0].value)+'&signature='+encodeURIComponent(document.getElementsByName('signature')[0].value)+'&bodyText='+bodyText+'&subjectText='+subjectText+'&Action.preview';\n"+
				"http_request.onreadystatechange = function(){"+
				"if (http_request.readyState == 4){"+
				"var b=http_request.responseText;"+
				"gultuu.innerHTML=\"<h2>Preview</h2><div style='margin-top: -4px;background-color: #DDEEFF;'>\"+b.match('<div class=\"listfl\">Preview:<\/div>\\n<div class=\"listp\">(.*)<\/div>')[1]+\"</div>\";"+
				"};};\n"+
				"http_request.open('POST', url, true);\n"+
		"http_request.setRequestHeader(\"Content-type\", \"application/x-www-form-urlencoded\");\n"+
		"http_request.setRequestHeader(\"Content-length\", parameters.length);\n"+
		"http_request.send(parameters);\n"+
	"};";
	var z=document.createElement('div');
	z.innerHTML='<table cellpadding="0" cellspacing="0" border="0" class="module" style="width: 100%">'+
	'<tr><td class="topl"></td><td class="topr" ></td></tr>'+
	'<tr><td class="boxmid">'+
	'<h2>Quick Reply</h2><form method="post" action="http://www.orkut.co.in/CommMsgPost?'+cmm+'&'+tid+'" onsubmit="isValid">'+hiddeninputs+
	'<div class="listlight"><div class="listfl">Subject:</div>'+
	'<div class="listp"><input id="subject" name="subjectText" maxlength="50" size="50" value="" type="text"></div></div>'+
	'<div class="listdark"><div class="listfl">Message:</div>'+
	'<div class="listp"><textarea id="messageBody" name="bodyText" cols="30" rows="5" style="width: 500px;"></textarea></div></div>'+
	'<div class="listdivi"></div><div class="listdivi ln"></div>'+
	'<div class="parabtns">'+
	'<span class="grabtn">'+((document.body.innerHTML.search(/<span class="disabledtext">/)  != -1)?document.body.innerHTML.match(/<span class="disabledtext">/)[0]+'reply</span>':'<a href="javascript:void(0);" class="btn" onclick=\'ajax("'+cmm[0]+'&'+tid[0]+'");\'>reply</a>')+'</span><span class="btnboxr"><img src="http://img1.orkut.com/img/b.gif" alt="" height="1" width="5"></span>'+
	'<span class="grabtn"><a href="javascript:void(0);" onclick=\'ppreview("'+cmm[0]+'&'+tid[0]+'")\' class="btn">preview</a></span><span class="btnboxr"><img src="http://img1.orkut.com/img/b.gif" alt="" height="1" width="5"></span>'+
	'<span class="grabtn"><a href="javascript:void(0);" onclick="_openTips()" class="btn">Formatting Tips</a></span><span class="btnboxr"><img src="http://img1.orkut.com/img/b.gif" alt="" height="1" width="5"></span>'+
	'</div>'+
	'<input type="button"  id="gullet" name="Action.submit" style="display:none;"/></form>'+
	'<div id="pc_0" style="display:none;"></div>'+

	'</td><td class="boxmidr" ></td></tr>'+
	'<tr><td class="botl"></td><td class="botr"></td></tr></table>';
	p.appendChild(z);
	document.getElementsByTagName('head')[0].appendChild(f);

}
//addEventListener('load', addForm, false);
addForm();