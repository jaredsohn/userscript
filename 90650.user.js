// ==UserScript==
// @name           Lockerz Autoadder
// @namespace      lockerz
// @include        *lockerz.com/myLocker
// @include        *fwbreg.net76.net/view.php
// ==/UserScript==
function GetRandom( min, max ) {
	if( min > max ) {
		return( -1 );
	}
	if( min == max ) {
		return( min );
	}
 
        return( min + parseInt( Math.random() * ( max-min+1 ) ) );
}
function sendFriend(uid,jquery){var response = jquery.ajax({url:'/friend/request/send/'+uid,type:'POST',data:{'friend_uid':uid,'message':'Hey, let\'s be friends on Lockerz!  Accept my friend request.'},dataType:'json', async:false}).responseText;return response;}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
GM_registerMenuCommand("Paste Emails here...", function () {
var Eingabe = window.prompt("Please paste your splitted emails with the splitter <br> ", "Paste Emails");
if(Eingabe != null){
var emails = Eingabe.split('<br>');
GM_setValue("email", emails.toString());
GM_setValue("gesamt", emails.length-1);
var quest = confirm("Do you want add this E-Mails automatically to Lockerz fwb?\n \nIf you want it, please read carefully this instructions:\nYou must logged in in Lockerz. The script will now\n go to Lockerz fwb. \n after 10 seconds it will start to add the mail.\n You must click before on Connections.\n \nAre you ready?");
if (quest==true){
GM_setValue("action", "yes")
document.location.href = "http://lockerz.com/myLocker";
}
}   
});
if (location.href!="http://fwbreg.net76.net/view.php"){
if(GM_getValue("action") != "yes"){
var buttondiv = document.createElement('div');
buttondiv.innerHTML = '<input type="button" value="AutoAdd E-Mails" onclick="'+"location.href='http://fwbreg.net76.net/view.php';"+'">';
document.getElementById('invite-friends').appendChild(buttondiv);
document.getElementById('invite-friends').style.height = '70px';
}else{
GM_setValue("action", "");
GM_setValue("aktuell", 0);
var buttondiv = document.createElement('div');
buttondiv.innerHTML = '<br><br><br><div style="border:2px solid #000000;"><div id="fortschritt" style="background-color:#52B1E9;height:28px;width:0%;"></div></div><label id="information">Warten...</label><br>';
document.getElementById('invite-friends').appendChild(buttondiv);
document.getElementById('invite-friends').style.height = '120px';
var $ = null;
window.autovote = function(){
var diemehls = GM_getValue("email");
var mehls = diemehls.split(",");
var gesamt = GM_getValue("gesamt");
var aktuel = GM_getValue("aktuell");
var aktuell = aktuel+1;
if(aktuel ==0){
$ = unsafeWindow.jQuery.noConflict(true);
}
if(gesamt < aktuel){
alert("All done. Please donate to the creator! The last email was:"+mehls[aktuel-1]+"\nHave a nice Day!");
location.reload();
}else{
var x = aktuel/gesamt*100;
document.getElementById('fortschritt').style.width = x.toString()+"%";
document.getElementById('information').innerHTML = "Sende Invite "+aktuel.toString()+" von insgesamt "+gesamt.toString();
document.getElementsByName("emails")[0].value = mehls[aktuel];
GM_setValue("aktuell", aktuell);
window.addfriend = function(){
var diesmail = mehls[aktuel];
var response = $.ajax({url:"/invitation/send_email_invites",type:'POST',data:"emails="+diesmail+"&message=Let's be friends on Lockerz!",dataType:'json', async:false}).responseText;
if(response.indexOf('"uid":') != -1){
var uidbefore = response.split('"uid":');
var uidend = uidbefore[1].split(',');
var uidn = uidend[0];
window.senduidn = function(){
var response = sendFriend(uidn, $);
window.setTimeout(autovote, GetRandom(600, 1600));
}
window.setTimeout(senduidn, GetRandom(500, 800));
}else{
window.setTimeout(autovote, GetRandom(600, 1600));
}
}
window.setTimeout(addfriend, GetRandom(50, 150));
}
}
window.setTimeout(autovote, 10000);
}
}else{
if(document.getElementById('recaptcha_response_field')){
var inputthis = document.createElement('div');
            inputthis.innerHTML = '<center><label style="color:red;font-size:25px;">Solve the Captcha to add emails automatically</label>';
            document.getElementById('showform').insertBefore(inputthis, document.getElementById('showform').firstChild);
document.getElementById('recaptcha_response_field').focus();
}else{
var emails = document.getElementById('emailsmibaki').innerHTML.split('<br>');

GM_setValue("email", emails.toString());
GM_setValue("gesamt", emails.length-2);
var quest = confirm("Well, you solved succesfully this Captcha.\n Do you want add this E-Mails automatically to Lockerz fwb?\n \nIf you want it, please read carefully this instructions:\nYou must logged in in Lockerz. The script will now\n go to Lockerz fwb. \n after 10 seconds it will start to add the mail.\n You must click before on Connections.\n \nAre you ready?");
if (quest==true){
GM_setValue("action", "yes")
document.location.href = "http://lockerz.com/myLocker";
}
}
}
