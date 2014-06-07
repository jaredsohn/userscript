// ==UserScript==
// @version 3
// @name Orkut community thread Quick Replys
// @author  http://www.orkut.com/Profile.aspx?uid=5864958054912067163
// @namespace Modified By KOK
// @description Adds a quick reply text box to community threads on orkut
// @include http://www.orkut.co.in/*CommMsgs.aspx*
// ==/UserScript==

// If you want to use signature add your siggy here
// for new line add \n
var signature = "";


function addForm()
{
var colorarray= new Array("aqua","blue","fuchsia","gold","gray","green","lime","maroon","navy","olive","orange","pink","purple","red","silver","teal","violet","yellow");  
var crappy = "";
for(var i=0;i<colorarray.length;i++)
{
crappy += "craptext=craptext.replace(/([[]){1}("+
colorarray[i]+"]){1}/gi,'<font color=\""+colorarray[i]+"\">');"+
"craptext=craptext.replace(/([[]\\/){1}("+
colorarray[i]+"]){1}/gi,'</font>');";
}
var p = document.getElementById("mboxfull");
var f = document.createElement("div");
f.innerHTML = '<script>'+
"function urlsss() {"+
"var kok=document.getElementsByTagName('TEXTAREA')[0].value;"+
"kok=kok.replace(/http:\\/\\//gi,\"\");"+
"kok=kok.replace(/www./g,\"\");"+
"kok=kok.replace(/\\.(.*[^\\/])/,'.­$1');"+
"document.getElementsByTagName('TEXTAREA')[0].value=kok;"+
"}"+
"function hidepreview(){"+
"var gultuu = document.getElementById('pc_0');"+
"gultuu.style.display = 'none';"+
"}"+
"function click() {"+
"if (document.getElementsByTagName('TEXTAREA')[0].value == \"\") {"+
"alert(\"Please, Write Something Then Click submit\");"+
"} else {"+
"urlsss();"+
"document.getElementById('gullet').click();"+
"}"+
"}"+
"function ppreview(){"+
"var gultuu = document.getElementById('pc_0');"+
"gultuu.style.display = 'inline';"+
"var gultus = document.getElementById('preview_0');"+
"var craptext = document.getElementsByTagName('textarea')[0].value;"+
"craptext=craptext.replace(/\\n/g,'<br/>');"+
"craptext=craptext.replace(/([[]){1}(b]){1}/gi,'<b>');"+
"craptext=craptext.replace(/([[]\\/){1}(b]){1}/gi,'</b>');"+
"craptext=craptext.replace(/([[]){1}(i]){1}/gi,'<i>');"+
"craptext=craptext.replace(/([[]\\/){1}(i]){1}/gi,'</i>');"+
"craptext=craptext.replace(/([[]){1}(u]){1}/gi,'<u>');"+
"craptext=craptext.replace(/([[]\\/){1}(u]){1}/gi,'</u>');"+crappy+
"craptext=craptext.replace(/([[]){1}(:\\(]){1}/gi,'<img src=\"http://img4.orkut.com/img/i_sad.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(8\\)]){1}/gi,'<img src=\"http://img3.orkut.com/img/i_cool.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:x]){1}/gi,'<img src=\"http://img2.orkut.com/img/i_angry.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:\\)]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_smile.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(;\\)]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_wink.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:d]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_bigsmile.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:o]){1}/gi,'<img src=\"http://img1.orkut.com/img/i_surprise.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(:p]){1}/gi,'<img src=\"http://img3.orkut.com/img/i_funny.gif\"/>');"+
"craptext=craptext.replace(/([[]){1}(\\/\\)]){1}/gi,'<img src=\"http://img4.orkut.com/img/i_confuse.gif\"/>');"+
"gultus.innerHTML = craptext;"+
"}"+
'</script>'+
'<table cellpadding="0" cellspacing="0" border="0" class="module" style="width: 100%">'+
'<tr><td class="topl_g"></td><td class="topr_g" ></td></tr>'+
'<tr><td class="boxmidlrg">'+
'<h2 class="smaller">Quick Reply v3</h2><form method="post" action="http://www.orkut.co.in/CommMsgPost.aspx?'+cmm+'&'+tid+'">'+ queryToken +
'<div class="listdark"><div class="listfl">Author:</div><div class="listp">'+authorbuttons+'</div></div>'+
'<div class="listlight"><div class="listfl">Subject:</div>'+
'<div class="listp"><input id="subject" name="subjectText" type="text" maxlength="50" size="50" value="" /></div></div>'+
'<div class="listdark"><div class="listfl">Message:</div>'+
'<div class="listp"><textarea id="messageBody" name="bodyText" cols="30" rows="5" style="width: 500px;">' + signature + '</textarea></div></div>'+
'<div class="listdivi"></div><div class="listdivi ln"></div>'+
'<div class="parabtns">'+
'<span class="grabtn"><a href="javascript:void(0);" onclick="click()" class="btn">submit</a></span><span class="btnboxr"><img src="http://img1.orkut.com/img/b.gif" alt="" height="1" width="5"></span>'+
'<span class="grabtn"><a href="javascript:void(0);" onclick="ppreview()" class="btn">preview</a></span><span class="btnboxr"><img src="http://img1.orkut.com/img/b.gif" alt="" height="1" width="5"></span>'+
'<span class="grabtn"><a href="javascript:_openTips()" class="btn">Formatting Tips</a></span><span class="btnboxr"><img src="http://img1.orkut.com/img/b.gif" alt="" height="1" width="5"></span>'+
'</div>'+
'<input type="submit"  id="gullet" name="Action.submit" style="display:none;"/></form>'+
'<div id="pc_0" style="display:none;"><h2>Preview</h2>'+
'<div id ="preview_0" style="padding: 2px; background-color: EFF7FF; width: 800px;"></div><a href="javascript:void(0)" onclick="hidepreview();">hide preview</a></div>'+
'</td><td class="boxmidr" ></td></tr>'+
'<tr><td class="botl"></td><td class="botr"></td></tr></table>';
p.appendChild(f);
}

var vURL = window.location.href;
var cmm = vURL.match(/cmm=[0-9]+/g);
var tid = vURL.match(/tid=[0-9]+/g);
pageRequest = new XMLHttpRequest();
pageRequest.open('GET', 'http://www.orkut.co.in/CommMsgPost.aspx?'+cmm+'&'+tid, false);
pageRequest.send(null);
var replyPage = pageRequest.responseText;
var posttoken = replyPage.match(/name="POST_TOKEN" value="(.*?)"/);
var sig = replyPage.match(/name="signature" value="(.*?)"/);
var queryToken = "<input type=\"hidden\" name=\"POST_TOKEN\" value=\"" + posttoken[1] + "\"><input type=\"hidden\" name=\"signature\" value=\"" + sig[1] + "\">";
var anon0 = replyPage.match(/.*isAnonymous0.*$/gm);
var anon1 = replyPage.match(/.*isAnonymous1.*$/gm);
var authorbuttons = (anon1 == null)?anon0[0]+anon0[1]:anon0[0]+anon0[1]+" &nbsp;"+anon1[0]+anon1[1];
addEventListener('load', addForm, false);