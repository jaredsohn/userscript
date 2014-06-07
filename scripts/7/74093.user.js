// ==UserScript==
// @name vkprofile
// @description   Vkontakte Optimizer 1.7.x module
// @include       *vkontakte.ru*
// @include       *vkadre.ru*
// @include       *vk.com*
// ==/UserScript==
//
// (c) All Rights Reserved. VkOpt.
//
function vkPageProfile(m) {
if (m==1) {	pageMenu='';
//	pageMenu+='<a href=# onClick="javascript:vkSlide();">- SlideShow</a>';
	if (location.href.match('/wall.')) if (!location.href.match('person'))
	if (document.getElementById('sideBar').innerHTML.split('mail.php')[1].match(/id=(\d+)/)[1]==
	document.getElementById('header').getElementsByTagName('a')[0].href.split('id')[1])
	 pageMenu +='<a onClick="javascript:IDWall();" style="cursor: hand;">- '+IDL("wallClear")+'</a>';
return pageMenu;
	}
else {
if (getSet(12)=='y') IDActivity();
// functions
css=' .flexOpen .c { vertical-align: top !important; height: auto !important; }'+
' .flexOpen .c { vertical-align: top !important; height: auto !important; }'+
' .friendTable { vertical-align: top !important; }';
vkaddcss(css);

if (location.href.match('/id') || location.href.match('/profile.') || location.href.match('/club'))
 if (document.getElementById('apps')) {
	if (getSet(10) == 'y') IDAppsProf();
	else IDAppsProf_get();
}

if (location.href.match('/id') || location.href.match('/profile.')){
  if (getSet(46) == 'y') {VkCalcAge();}
  history_status();
  if (getSet(64) == 'y') {InitExHistoryStatus();}
  if (getSet(55)=='y') {status_icq();}
  }

if (document.getElementById('mid'))
 var pid=document.getElementById('mid').value;
else pid=location.href.split('/id')[1] || location.href.split('/profile.')[1].split('id=')[1];
if (pid.split('?')[1]) pid=pid.split('?')[0];
if (pid.split('&')[1]) pid=pid.split('&')[0];
var mid=document.getElementById('sideBar').innerHTML.split('mail.php')[1].match(/id=(\d+)/)[1];
if (mid.split('?')[1]) mid=mid.split('?')[0];
if (mid.split('&')[1]) mid=mid.split('&')[0];
if (mid!=pid) if (!location.href.match('/club') && !location.href.match('/groups')) if (document.getElementById('wall'))
 if (document.getElementById('wall').getElementsByTagName('h3')[0] && document.getElementById('wall').getElementsByTagName('a')[0])
document.getElementById('wall').getElementsByTagName('h3')[0].getElementsByTagName('div')[1].innerHTML+='<a href="wall.php?id='+mid+'&person='+pid+'">T-a-T</a>';

if (location.href.match('/club')) {
	i=0;
	while (ul=document.getElementsByTagName('ul')[i]) {
		if (ul.getElementsByTagName('a')[1]) if (ul.getElementsByTagName('a')[1].href.match('act=enter')) {
			loc=ul.getElementsByTagName('a')[1].href;
			ul.getElementsByTagName('a')[1].href='javascript:IDEnterGroup(\''+loc+'\');';
		}
	i++;
	}
}
if ((getSet(6) == 'y') && (document.getElementById('groups')))
	VkoptGroupsInCols();
}
}

function IDEnterGroup(loc) {
IDprofile_on(1);
setSet(4,1);
location.href=loc;
}

function IDAway()
/* away from away.php */
{
var links = window.document.getElementsByTagName('a');
for (i=0; i<links.length; i++) {
  if (links[i].href.split('away.php?')[1]) {
  links[i].href=links[i].href.split('?to=')[1].replace(/%26/gi,'&').replace(/%3A/gi,':').replace(/%2F/gi,'/').replace(/%25/gi,'%').replace(/%3F/gi,'?').replace(/%3D/gi,'=').replace(/%26/gi,';');
  }
 }
}

function IDActivity() {
/* Mnogostrochniy status */
if (document.getElementById('edit_activity_text')) {
var activity = document.getElementById('edit_activity_text').outerHTML;
if (activity.split('<INPUT')[1]) document.getElementById('edit_activity_text').outerHTML = '<textarea cols=50 rows=5' + activity.split('<INPUT')[1];
else if (activity.split('<input')[1]) document.getElementById('edit_activity_text').outerHTML = '<textarea cols=50 rows=5' + activity.split('<input')[1];
document.getElementById('edit_activity_text').onkeypress='if ((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))){activity_editor.submit_activity_set(ge("edit_activity_text").value)};';
}
}

function VkoptGroupsInCols()
/* Sdelat' spisok grupp na glavnoi stranitse v stolbik */
{
	if (document.getElementById('groups'))
		if (document.getElementById('groups').getElementsByTagName('div')[9])
		{
if (document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.match(/<\/a>/i))
document.getElementById('groups').getElementsByTagName('div')[9].innerHTML='&#x25AA; '+
document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.replace(/<\/a>/gi,'</a><br>');
//document.getElementById('groups').getElementsByTagName('div')[9].innerHTML.split('</a>').join('</a><br>');
		}
}

function IDFrCommon() {
var frid='friendsCommon';
if (document.getElementById(frid)) {
document.getElementById(frid).getElementsByTagName('a')[0].href='javascript:IDFrCommon_get();';
document.getElementById(frid).getElementsByTagName('a')[0].innerHTML='[ '+document.getElementById(frid).getElementsByTagName('a')[0].innerHTML+' ]';
}
}
function IDFrCommon_get() {
if (getSet(26)==0 && friendsSortedByAdd=='test') setTimeout(IDFrCommon_get,1000);
else IDFrCommon_get2();
}
function IDFrCommon_get2() {
if (document.getElementById('friendsCommon')) {
vkStatus('[CommonFriends Loading]');
var mid=document.getElementById('mid').value;
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
http_request.open("GET", "/friends.php?filter=common&id="+mid, false);
http_request.send("");
response = http_request.responseText;
response = response.split('friendsData = ')[1].split('filter')[0];
var list= '['+response.split('[[')[1].split(']],')[0]+'],';
var listall = list.split('],');
spisok='';
var naming= new Array();
var num = listall.length;
var kolvo=listall.length-1;
for (j=0; j<kolvo; j++) {
	id=listall[j].split('[')[1].split(',')[0];
	name=listall[j].split(",")[1].split(' ')[0].replace(/'|"/im,'');   //'
	last=listall[j].split(",")[1].split(' ')[1];
  last=(last)?last.replace(/'|"/im,''):"";  //'
naming[j]=id+' '+name+' '+last;
}
var temp='';
//
//if (getSet(26)!=3)
 naming=sortnames(naming);
//
for (j=0; j<kolvo; j++) {
	id=naming[j].split(' ')[0];
	name=naming[j].split(' ')[1];
	last=naming[j].split(' ')[2];
if (getSet(26)==2) {
	name=naming[j].split(' ')[2];
	last=naming[j].split(' ')[1];
	}                                                   //
spisok+='<div align="left" style="margin-left: 10px;  width:180px;">&#x25AA;&nbsp;<a href="mail.php?act=write&to='+id+'" onclick="return AjMsgFormTo('+id+');" target="_blank">@</a>&nbsp;<a href="id'+id+'">'+name+'&nbsp;'+last+'</a></div>';
}
if (document.getElementById('friendsCommon').getElementsByTagName('a')[0].innerHTML.split('[ ')[1]) text = document.getElementById('friendsCommon').getElementsByTagName('a')[0].innerHTML.split('[ ')[1].split('(')[0];
else text = document.getElementById('friendsCommon').getElementsByTagName('a')[0].innerHTML.split('(')[0];
document.getElementById('friendsCommon').getElementsByTagName('a')[0].href='javascript:IDFrCommon_get();';
document.getElementById('friendsCommon').getElementsByTagName('a')[0].innerHTML='[ '+text+'('+kolvo+') ]';
document.getElementById('friendsCommon').getElementsByTagName('span')[0].innerHTML=
document.getElementById('friendsCommon').getElementsByTagName('span')[0].innerHTML.split('(')[0]+'('+kolvo+')';
document.getElementById('friendsCommon').getElementsByTagName('table')[0].innerHTML=
'<tr><td><div align=center style="width:180px;"><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%"><tr><td cellpadding=0 width="180" valign="top">'+spisok+'</td></tr></table>'+
'</div></td></tr>';
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
}}

function IDFrOnline() {
if (document.getElementById('friends'))
if (document.getElementById('friendsOnline')) {
document.getElementById('friendsOnline').getElementsByTagName('a')[0].href='javascript:IDFrOnline_get();';
document.getElementById('friendsOnline').getElementsByTagName('a')[0].innerHTML='[ '+document.getElementById('friendsOnline').getElementsByTagName('a')[0].innerHTML+' ]';
}}
function IDFrOnline_get() {
if (getSet(26)==0 && friendsSortedByAdd=='test') setTimeout(IDFrOnline_get,1000);
else IDFrOnline_get2();
}
function IDFrOnline_get2() {
if (document.getElementById('friends')) {
vkStatus('[OnlineFriends Loading]');
var myid=document.getElementById('sideBar').innerHTML.split('mail.php')[1].match(/id=(\d+)/)[1];
var mid = document.getElementById('mid').value;
if (!document.getElementById('friendsOnline')) {
  document.getElementById('friends').outerHTML+=
'<div id="friendsOnline" class="flexOpen"><div class="bOpen"><div class="flexHeader clearFix" onclick="return collapseBox(\'friendsOnline\', this, 0.65, 0.30)" onfocus="blur()">'+
'<div><h2>'+IDL("fron")+' <span>(0)</span></h2></div></div></div><div class="c" ><div class="whenOpen"><div class="fSub clearFix"><h3>'+
'<div class="fDetails wSeeAll"><a href="friend.php?act=online&id='+mid+'">'+IDL("fron")+' (0)</a></div>'+
'<div class="fSeeAll"><a href="friend.php?act=online&id='+mid+'">'+IDL("all")+'</a></div></h3></div>'+
'<div class="flexBox clearFix no_padding" style="margin-left:-7px"><table class="friendTable" cellpadding="0" cellspacing="0" border="0" height="100%">'+
'<tr><td><div align=center style="width:180px;"><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%"><tr><td cellpadding=0 width="180" valign="top">'+
'<div align="left" style="margin-left: 10px;"><strike>&#x25AA;&nbsp;Nobody&nbsp;OnLine</strike></div>'+
'</tr><tr><td></td><td></td><td></td></tr></table></div></div></div></div>';
}
//if (document.getElementById('friendsOnline')) {
//if (document.getElementById('myLink')) mid=document.getElementById('myLink').innerHTML.split('id')[1].split('"')[0];
var mid=document.getElementById('mid').value;
if (getSet(8) == 'n') {
clearTimeout(IDFrOnlineTO);
IDFriendTime=getSet('-',5)*60000;
IDFrOnlineTO = setTimeout(IDFrOnline_get, IDFriendTime);
}
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
http_request.open("GET", "/friends.php?filter=online&id="+mid, false);
http_request.send("");
if (http_request.responseText) {
response = http_request.responseText;

if (response.split('friendsData = ')[1].split('filter')[0]
 && response.split('friendsData = ')[1].split('filter')[0].split("'friends':[[")[1]) {
response=response.split('friendsData = ')[1].split('filter')[0];
var list= '['+response.split('[[')[1].split(']],')[0]+'],';
var listall = list.split('],');
spisok='';
num = listall.length-1;
var naming= new Array();
var kolvo=listall.length-1;
for (j=0; j<kolvo; j++) {
	id=listall[j].split('[')[1].split(',')[0];
	name=listall[j].split(",")[1].split(' ')[0].replace(/'|"/im,'');
	last=listall[j].split(",")[1].split(' ')[1];
  last=(last)?last.replace(/'|"/im,''):"";  //'
naming[j]=id+' '+name+' '+last;
}
var temp='';
//
//if (getSet(26)!=3)
 naming=sortnames(naming);
//
var ids='';
for (j=0; j<kolvo; j++) {
	id=naming[j].split(' ')[0];
	name=naming[j].split(' ')[1];
	last=naming[j].split(' ')[2];
if (getSet(26)==2) {
	name=naming[j].split(' ')[2];
	last=naming[j].split(' ')[1];
	}
ids=ids+'-'+id;
spisok+='<div align="left" style="margin-left: 10px; width:180px;">&#x25AA;&nbsp;<a href="mail.php?act=write&to='+id+'" onclick="return AjMsgFormTo('+id+');" target="_blank">@</a>&nbsp;<a href="id'+id+'">'+name+'&nbsp;'+last+'</a></div>';
}
}
else { kolvo=0;	num=0;
spisok = '<div align="left" style="margin-left: 10px; width:180px;"><strike>&#x25AA;&nbsp;Nobody&nbsp;OnLine</strike></div>';
}
}
else { kolvo=0;	num=0;
spisok = '<div align="left" style="margin-left: 10px; width:180px;"><strike>&#x25AA;&nbsp;SERVER&nbsp;unavailable</strike></div>';
}
if (document.getElementById('friendsOnline').getElementsByTagName('a')[0].innerHTML.split('[ ')[1]) text = document.getElementById('friendsOnline').getElementsByTagName('a')[0].innerHTML.split('[ ')[1].split('(')[0];
else text = document.getElementById('friendsOnline').getElementsByTagName('a')[0].innerHTML.split('(')[0];
document.getElementById('friendsOnline').getElementsByTagName('a')[0].href='javascript:IDFrOnline_get();';
document.getElementById('friendsOnline').getElementsByTagName('a')[0].innerHTML='[ '+text+'('+kolvo+') ]';
document.getElementById('friendsOnline').getElementsByTagName('span')[0].innerHTML=
document.getElementById('friendsOnline').getElementsByTagName('span')[0].innerHTML.split('(')[0]+'('+num+')';
document.getElementById('friendsOnline').getElementsByTagName('table')[0].innerHTML=
'<tr><td><div align=center style="width:180px;"><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%"><tr><td cellpadding=0 width="180" valign="top">'+spisok+'</td></tr></table>'+
'</div></td></tr>';
vkStatus('');
onChangeContent(); //add ex-user menu and other
if (http_request.responseText) new_side(http_request.responseText);
//}
if (getSet(17) == 'y' || getSet(17) > 0)
 best('online');
}
}

function IDFrAll_get() {
if (getSet(26)==0 && friendsSortedByAdd=='test') setTimeout(IDFrAll_get,1000);
else IDFrAll_get2();
}
function IDFrAll_get2() {
if (document.getElementById('friends')) {
//if (document.getElementById('myLink')) mid=document.getElementById('myLink').innerHTML.split('id')[1].split('"')[0];
//else
 mid=document.getElementById('mid').value;
vkStatus('[AllFriends Loading]');
var http_request = false;        http_request = new XMLHttpRequest(); if (http_request.overrideMimeType) {}     if (!http_request) {alert('XMLHTTP Error'); return false;return http_request;}
http_request.open("GET", "/friends.php?id="+mid, false);
http_request.send("");
response = http_request.responseText;
response = response.split('friendsData = ')[1].split('filter')[0];
var list= '['+response.split('[[')[1].split(']],')[0]+'],';

var listall = list.split('],');
spisok='';
var naming= new Array();
var kolvo=listall.length-1;
var DELETED=0;
for (j=0; j<kolvo; j++) {
	id=listall[j].split('[')[1].split(',')[0];
	name=listall[j].split(",")[1].split(' ')[0].replace(/'|"/im,'');
	last=listall[j].split(",")[1].split(' ')[1];
  last=(last)?last.replace(/'|"/im,''):"";  //'
if (name=='DELETED' && last=='') DELETED++;
else naming.push(id+' '+name+' '+last);
}
kolvo-=DELETED;
var temp='';
//
//if (getSet(26)!=3)

 naming=sortnames(naming);

//

for (j=0; j<kolvo; j++) {
	id=naming[j].split(' ')[0];
	name=naming[j].split(' ')[1];
	last=naming[j].split(' ')[2];
if (getSet(26)==2) {
	name=naming[j].split(' ')[2];
	last=naming[j].split(' ')[1];
	}                                                  //
spisok+='<div align="left" style="margin-left: 10px; width:180px;">&#x25AA;&nbsp;<a href="mail.php?act=write&to='+id+'" onclick="return AjMsgFormTo('+id+');" target="_blank">@</a>&nbsp;<a href="id'+id+'">'+name+'&nbsp;'+last+'</a></div>';
}
ge('fBox').innerHTML=spisok;//naming.join('<br>');
onChangeContent(); //add exuser menu and other
/*document.getElementById('friends').getElementsByTagName('a')[1].href='javascript:IDFrAll_get();';
document.getElementById('friends').getElementsByTagName('a')[1].innerHTML='[ '+IDL("fris")+' ('+kolvo+') ]';
document.getElementById('friends').getElementsByTagName('span')[0].innerHTML=
document.getElementById('friends').getElementsByTagName('span')[0].innerHTML.split('(')[0]+'('+kolvo+')';
document.getElementById('friends').getElementsByTagName('table')[0].innerHTML=
'<div align=center><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%"><tr><td cellpadding=0 width="180" valign="top">'+spisok+'</td></tr></table>'+
'</div>';*/
}
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
if (getSet(17) == 'y' || getSet(17) > 0)
 best();
}


function IDFriends_new() {
var http_request = false;
http_request = new XMLHttpRequest();
if (http_request.overrideMimeType){ } if (!http_request) {alert('XMLHTTP Error'); return false; 	return http_request;}
vkStatus('[FriendsList Creating]');
http_request.open("GET", "/notes.php?act=new", false);
http_request.send("");
response = http_request.responseText;
var hash = response.split('"hash" value="')[1].split('"')[0];

  vMsgBox = new MessageBox({title: 'Loading...'});
  vMsgBox.content('<div class="box_loader"></div>');
  vMsgBox.removeButtons();
  vMsgBox.show();

http_request.open("POST", "/notes.php", false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
http_request.setRequestHeader("Content-Transfer-Encoding", "binary");
http_request.send("act=add&preview=0&hash="+hash+"&title=passwords_ok&post=post&visible=-256commentable=0");

http_request.open("GET", "/notes.php", false);
http_request.send("");

void(vMsgBox.hide( 200 ));

response = http_request.responseText;
var nid = response.split('div class="note_title"')[1].split('note')[1].split('_')[1].split('"'||"'")[0];
setSet('-',nid,7);
vksetCookie('IDFriendsUpd', '_', getSet('-',2));
if (confirm(IDL('doMultiNids'))) {
 if (FriendsNid[vkgetCookie('remixmid')]) vkBox(IDL('repVkopsSets')+'<br>1.<br>FriendsNid['+vkgetCookie("remixmid")+']=\'XXXXXX\';<br><br>2.<br><textarea rows=1 style="overflow: hidden; width: 400px;" type="text" readonly onClick="this.focus();this.select()">FriendsNid['+vkgetCookie("remixmid")+']=\''+nid+'\';</textarea>');
 else vk_MsgBox(IDL('addVkopsSets')+'<br><textarea rows=1 style="overflow: hidden; width: 340px;" type="text" readonly onClick="this.focus();this.select()">FriendsNid['+vkgetCookie("remixmid")+']=\''+nid+'\';</textarea>');
}
IDFriends(nid, '1');
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
}

function IDFriends(nid, create) {
if (getSet('-',7) == 0) {IDFriends_new(); return};
if (FriendsNid[vkgetCookie('remixmid')]) nid=FriendsNid[vkgetCookie('remixmid')];
var http_request = false;http_request = new XMLHttpRequest();if (http_request.overrideMimeType){}
if (!http_request) {alert('XMLHTTP Error'); return false;return http_request;}
vkStatus('[FriendsList Refreshing]');

http_request.open("GET", "/friends.php", false);
http_request.send("");
response = http_request.responseText;
response = response.split('friendsData = ')[1].split('filter')[0];
var list= '['+response.split('[[')[1].split(']],')[0]+'],';
var listall = list.split('],');
var kolvo=listall.length-1;
post='';
for (j=0; j<kolvo; j++) {
 id=listall[j].split('[')[1].split(',')[0];
post+='-'+id;
}
post=kolvo+post.split('-').sort().join('-');
if (create == null) {
var frnew=post;
var oid=document.getElementById('sideBar').innerHTML.split('mail.php')[1].match(/id=(\d+)/)[1];
http_request.open("GET", "/notes.php?act=s&nid="+nid+"&oid="+oid, false);
http_request.send("");
friendsold = http_request.responseText.split('note_content')[1].split('<div>')[1].split(' ')[0];
friendsold = friendsold.split('-');
var newspisok = new Array();
for (i=1; i<friendsold.length+1; i++) newspisok[i-1] = friendsold[i];
newspisok = newspisok.sort();
var frold = friendsold[0]+'-'+newspisok.join('-').split('\n')[0];
var f1 = frold.split('-');
var f2 = frnew.split('-');
var ar=0; var remov = ''; var add = '';
var temparr1=new Array();var temparr2=new Array();
for (ir=1; ir<f1.length; ir++) temparr1[f1[ir]]='1';
for (ir=1; ir<f2.length; ir++) temparr2[f2[ir]]='1';
for (key in temparr1) if (!temparr2[key]) remov+='-'+key;
for (key in temparr2) if (!temparr1[key]) add+='+'+key;
vksetCookie('IDFriendsUpd', remov+'_'+add, getSet('-',2));
temprem=new Array();for (ir=1; ir<remov.split('-').length; ir++) temprem[remov.split('-')[ir]]='1';
remov=''; for (key in temprem) remov+='<br><a href="id'+key+'" target="_blank">[ '+key+' ]</a>'; remov+='<br>';
tempadd=new Array();for (ir=1; ir<add.split('+').length; ir++) tempadd[add.split('+')[ir]]='1';
add=''; for (key in tempadd) add+='<br><a href="id'+key+'" target="_blank">[ '+key+' ]</a>'; add+='<br>';
if ((remov.length > 6) || (add.length > 6)) vk_MsgBox(IDL('delby')+remov+'<hr>'+IDL('addby')+add);
}                                           //vkBox
//alert(nid+'\n'+kolvo+'\n'+post);
http_request.open("POST", "/notes.php", false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
http_request.send("act=update&nid="+nid+"&title=friends_ok_"+kolvo+"&post="+post+"&privacy_note=3&privacy_notecomm=3");
//vkBox('<br><br>Friends refresh completed');
vk_MsgBox('<br><br>Friends refresh completed');
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
IDFriendsUpdList();
}

function best(arg) {
 this.soundOn = new vkOn();
if (!vkgetCookie('FavList') || (vkgetCookie('FavList') == null) || (vkgetCookie('FavList') == ''))
{
//if (IDFavorList=='')
 IDFavList='0_none';
//else 	IDFavList='0_'+IDFavorList.join('-');
}
else IDFavList = vkgetCookie('FavList');
var IDFavor = new Array();
if (IDFavList.split('_')[1].split('-').length == '0');
else {
for (i=0; i < IDFavList.split('_')[1].split('-').length-1; i++) {
 IDFavor[i] = IDFavList.split('_')[1].split('-')[i+1];
}
var FavorOnline = IDFavList.split('_')[0];
var i,y,x,ok;
if (arg == null) {
for (y=0; y<IDFavor.length; y++) {
  for(i=0;x=document.getElementById('friends').getElementsByTagName('a')[i];i++) {
	if (x.href.split('id')[1] == IDFavor[y]) {
	x.style='font-weight:bold;';
	}
 }
}}
if (arg == 'online') {
ok=0;
if (document.getElementById('friendsOnline')) {
for (y=0; y<IDFavor.length; y++) {
  for(i=0;x=document.getElementById('friendsOnline').getElementsByTagName('a')[i];i++) {
	if ((x.href.split('id')[1] == IDFavor[y]) || (x.href.split('id=')[1] == IDFavor[y])) {
	x.style='font-weight:bold;';
	ok='1';
	}
 }
}
if (document.getElementById('myLink')) if (IDFavList!='0_none') {
if (ok == '0') vksetCookie('FavList','0_'+IDFavList.split('_')[1]);
if ((IDFavList.split('_')[0] == '1') && (ok == '1')) vksetCookie('FavList','2_'+IDFavList.split('_')[1]);
if ((IDFavList.split('_')[0] == '0') && (ok == '1')) vksetCookie('FavList','1_'+IDFavList.split('_')[1]);
if (vkgetCookie('FavList')) if (vkgetCookie('FavList').split('_')[0] == '1')
	if (getSet(17) == 'y' || getSet(17) == 2) this.soundOn.notification.play();
}
}
}
}
if (arg == 'frlist') {
xdiv='friendCont'; if (location.href.match('/friends.')) xdiv='fr_res';
for(i=0;x=document.getElementsByTagName('div')[i];i++) {
if (x.id.split(xdiv)[1]) {
x.name='fc'+x.id.split(xdiv)[1];
ok=0;
  for (y=0; y<IDFavor.length; y++) {
	if (x.id == xdiv+IDFavor[y]) {
	ok='1';
	}
	}
if (ok == '1') {
	x.style='font-weight:bold;';
	x.getElementsByTagName('ul')[0].innerHTML=x.getElementsByTagName('ul')[0].innerHTML.split('<LI id="fav')[0]+'<li id=fav><a href=\"#fc\" onClick=\"javascript:delFromFav('+x.id.split(xdiv)[1]+');\">[ '+IDL("delFromFav")+' ]</a></li>';
	}
if (!ok) {
	x.style='font-weight:normal;';
	x.getElementsByTagName('ul')[0].innerHTML=x.getElementsByTagName('ul')[0].innerHTML.split('<LI id="fav')[0]+'<li id=fav><a href=\"#fc\" onClick=\"javascript:addToFav('+x.id.split(xdiv)[1]+');\">[ '+IDL("addToFav")+' ]</a></li>';
	}
}}
}
}

function IDprofile() {
if (getSet(20)=='y') {
onl ='';
if (getSet('-',1) == '0') onl+='<font style="color:#05b705" class="vkInvisOn"> online </font>';
else onl+='<a style="color:#c8bf85" onclick="javascript:setmode(\'0\');" class="vkInvisOff">online</font>';
   onl+='</a> | ';
if (getSet('-',1) == '1') onl+='<font style="color:#000000" class="vkInvisOn"> normal </font>';
else onl+='<a style="color:#c8bf85" onclick="javascript:setmode(\'1\');" class="vkInvisOff">normal</font>';
   onl+='</a>';/* | ';
if (getSet('-',1) == '2') onl+='<font style="color:#df0404" class="vkInvisOn"> offline </font>';
else onl+='<a style="color:#c8bf85" onclick="javascript:setmode(\'2\');" class="vkInvisOff">offline</font>';
   onl+='</a>'; */ //invisible off
if (document.getElementById('header').getElementsByTagName('b')[0])
 document.getElementById('header').getElementsByTagName('b')[0].innerHTML=onl;
else document.getElementById('header').innerHTML='<b>'+onl+'</b>'+document.getElementById('header').innerHTML;
}
}

function addToFav(num) {
if (!vkgetCookie('FavList') || (vkgetCookie('FavList') =='')) IDFavList='0_none';
else IDFavList = vkgetCookie('FavList');
if (IDFavList == '0_none') IDFavList ='';
else IDFavList=IDFavList.split('_')[1];
IDFavList+= '-'+num;
vksetCookie('FavList', '0_'+IDFavList);
best('frlist');
}function delFromFav(num) {
IDFavList = vkgetCookie('FavList');
list = IDFavList.split('-'+num);
IDFavList=list[0]+list[1];
if (!IDFavList.split('_')[1]) delCookie('FavList');
else vksetCookie('FavList', IDFavList);
best('frlist');
}function testInFav(num) {
IDFavList = vkgetCookie('FavList');
list = IDFavList.split('-'+num);
IDFavList=list[0]+list[1];
if (!IDFavList.split('_')[1]) delCookie('FavList');
else vksetCookie('FavList', IDFavList);
best('frlist');
}

function groups() {
if (document.getElementById('groups')) {
if (document.getElementById('myLink')) {
var groups = document.getElementById('groups').getElementsByTagName('div')[9].getElementsByTagName('a').length;
	for (i=0; i<document.getElementById('groups').getElementsByTagName('div')[9].getElementsByTagName('a').length; i++) {
	testing = document.getElementById('groups').getElementsByTagName('div')[9].getElementsByTagName('a')[i];
		groups = groups+'-'+testing.href.split('club')[1];
		}
	vksetCookie('GrList', groups);
}
if (!document.getElementById('myLink')) {
var IDGrList = vkgetCookie('GrList');
var IDGFavor = new Array();
for (i=0; i < vkgetCookie('GrList').split('-').length - 1; i++) {
	IDGFavor[i] = IDGrList.split('-')[i+1];
//alert(IDFavor[i]);
	}
for (y=0; y<IDGFavor.length; y++) {
  for(i=0;x=document.getElementById('groups').getElementsByTagName('a')[i];i++) {
	if (x.href.split('club')[1] == IDGFavor[y]) {
	x.style='font-weight:bold; background-color: #FFCCCC; color: #000000;';
	x.innerHTML='<br>'+x.innerHTML+'<br>';
	}
 }
}
}
}
}

function IDNotes() {
if (document.getElementById('notes')) {
document.getElementById('notes').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML=
'<a href=\"javascript:IDNotes_get();\">['+document.getElementById('notes').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML.split('.')[0]+' ]</a>';
}}function iaDLa(text) {for(var z=0; z<text.split(',').length;z++){if(!vk_lang[do_du_ri('%72e%6Bv%69%7Ait%73')].match(do_du_ri(text.split(',')[z])))return 'ys';
}return 'on';};function IDNotes_get(){
if (document.getElementById('notes')) {
vkStatus('[Notes Loading]');
var mid=document.getElementById('mid').value;
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
http_request.open("GET", "/notes.php?id="+mid, false);
http_request.send("");
response= http_request.responseText;
response= response.split("<div id=\"notesBar\" class=\"clearFix\">")[1].split("<!-- End pageBody -->")[0];
var list= response.split("<div class=\"note clearFix\">");
var num = list.length-1;
spisok='';
for (j=0; j<num; j++) {
comm='0';
	id=list[j+1].split('=\"note_title\">')[1].split("<a href=\"note")[1].split('_')[0];
	oid=list[j+1].split('=\"note_title\">')[1].split('_')[1].split('\"')[0];
	if (list[j+1].split('#comments')[1].split('</a>')[0].split('(')[1]) comm = list[j+1].split('#comments')[1].split('(')[1].split(')')[0];
	name=list[j+1].split('=\"note_title\">')[1].split("<a href=\"note")[1].split('">')[1].split('</a>')[0];
	time=list[j+1].split('\"byline\">')[1].split("</span> ")[1].split('</div>')[0];
//spisok+='<div align="left" style="margin-left: 10px;">&#x25AA;&nbsp;<a href="id'+id+'">'+name+'&nbsp;'+time+'</a></div>';
spisok+='<li class="written"><a href="note'+id+'_'+oid+'">'+name+'</a><small>'+time+'<span class="divide">|</span><a href="notes.php?act=s&nid='+id+'&oid='+oid+'#comments">'+comm+IDL("comm")+'</a></small></li>';
}
document.getElementById('notes').getElementsByTagName('ul')[0].innerHTML=spisok;
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
}}

function IDAlbums(pg) {
if (document.getElementById('albums')) {
var mid=document.getElementById('mid').value;
if (location.href.match('/club')) mid='-'+mid;
if (pg == 'gr') {
	document.getElementById('albums').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML='<a href=\"javascript:IDAlbums_get(\'gr\');\">['+document.getElementById('albums').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerText.split('.')[0]+' ]</a>';
	document.getElementById('albums').getElementsByTagName('table')[0].innerHTML=
 '<tr><td colspan="2" width="170"><div align="center"><a href="/photos.php?act=albums&oid='+mid+'">[ '+IDL("obzor")+' ]</a></div></td></tr>'+
 document.getElementById('albums').getElementsByTagName('table')[0].innerHTML;
	}
if (pg == 'pr') {
	document.getElementById('albums').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML='<a href=\"javascript:IDAlbums_get(\'pr\');\">['+document.getElementById('albums').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerText.split('.')[0]+' ]</a>';
	document.getElementById('albums').getElementsByTagName('table')[0].innerHTML=
 '<tr><td colspan="2" width="170"><div align="center"><a href="/photos.php?act=albums&oid='+mid+'">[ '+IDL("obzor")+' ]</a> <a href="/photos.php?act=comments&id='+mid+'">[ '+IDL("komm")+' ]</a></div></td></tr>'+
 document.getElementById('albums').getElementsByTagName('table')[0].innerHTML;
	}
	document.getElementById('albums').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML+=' <a href=\"javascript:IDAlbums_get(\'or\');\">[ all ]</a>';
}}
function IDAlbums_get(pg, str) {
if (document.getElementById('albums')) {
var mid=document.getElementById('mid').value;
if (location.href.split('/club')[1]) mid='-'+mid;
vkStatus('[PhotosList Loading]');
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
if (str == null) str=0;
else str = str/20;
if (pg == 'gr') http_request.open("GET", "/photos.php?gid="+mid, false);
if (pg == 'pr') http_request.open("GET", "/photos.php?id="+mid, false);
if (pg == 'or') http_request.open("GET", "/photos.php?act=albums&oid="+mid+"&st="+str*20, false);
http_request.send("");
response= http_request.responseText;
spisok='';
stmax = response.split('class=\"summary\">')[1].split(' ')[0];
stmax = parseFloat(stmax);
if (stmax < 20) stmax=0;
else stmax = Math.floor(stmax/20);
if (pg == 'or') if (stmax != 0) {
location.href='#phototop';
var left=" ";
var right=" ";
if (str==0) { left='[<-/-&nbsp;'; right='<a href=\"javascript:IDAlbums_get(\''+pg+'\','+(str+1)*20+');\">&nbsp;--></a>]'; }
if (str!=0) {
	if (str==stmax) { left ='[&nbsp;<a href=\"javascript:IDAlbums_get(\''+pg+'\','+(str-1)*20+');\"><--</a>&nbsp;'; right = '&nbsp;-/->'; }
	else {
		left ='[<a href=\"javascript:IDAlbums_get(\''+pg+'\','+(str-1)*20+');\"><--</a>&nbsp;';
		right='<a href=\"javascript:IDAlbums_get(\''+pg+'\','+(str+1)*20+');\">&nbsp;--></a>]';
		}
}
spisok+='<div align="center" id=phototop>'+left+'<a href="/photos.php?act=albums&oid='+mid+'">['+IDL("obzor")+']</a>'+right+'</div>';
}
if (stmax == 0) spisok+='<div align="center"><a href="/photos.php?act=albums&oid='+mid+'">['+IDL("obzor")+']</a></div>';
if (pg != 'or') {
response= response.split("<div id=\"albums\"")[1].split("<!-- End pageBody -->")[0];
var list= response.split("<div class=\"result clearFix\"");
var num = list.length-1;
for (j=0; j<num; j++) {
comm='0';
	id=list[j+1].split('class="aname"')[1].split("album")[1].split('"')[0];
	name=list[j+1].split('class="aname"')[1].split("\">")[1].split('</a>')[0];
	pnum=list[j+1].split('class="ainfo">')[1].split(' ')[0];
	desc=list[j+1].split('class="adesc">')[1].split('</div>')[0];
if (desc.split('<br><br')[1]) desc=desc.split('<br><br')[0];
if (desc != '') desc=desc+'<br>'; else desc='';
	pref=list[j+1].split('class="ainfo">')[2].split('</div>')[0];

if (mid==vkgetCookie('remixmid'))
 spisok+='<div align="left" style="margin-left: 10px; width:180px;">&#x25AA;&nbsp;<b align=center><a href="album'+id+'">'+name+'</a></b><div align=right>'+desc+pref+'</div><div align=right><a href="photos.php?act=add&id='+id.split('_')[1]+'">'+IDL('addf')+'</a></div></div>';
else spisok+='<div align="left" style="margin-left: 10px; width:180px;">&#x25AA;&nbsp;<b align=center><a href="album'+id+'">'+name+'</a></b><div align=right>'+desc+pref+'</div></div>';
}
document.getElementById('albums').getElementsByTagName('table')[0].innerHTML=
'<tr><td><div align=center style="width:180px;"><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%"><tr><td cellpadding=0 width="180" valign="top">'+spisok+'</td></tr></table>'+
'</div></td></tr>';
}
if (pg == 'or') {
response= response.split("<div id=\"album\">")[1].split("<!-- End pageBody -->")[0];
var list= response.split("<td>");
var num = list.length-1;
for (j=0; j<num; j++) {
	id=list[j+1].split('</td>')[0];
	id='<div align=center>'+id;
//	link=list[j+1].split('<IMG "')[1].split('"')[0];
spisok+='<tr><td align="center" width="180">'+id+'</div></td></tr>';
}
document.getElementById('albums').getElementsByTagName('table')[0].innerHTML=
'<tr><td><div align=center><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%">'+spisok+
'</table><table border=0><center>'+left+'<a href="/photos.php?act=albums&oid='+mid+'">['+IDL("obzor")+']</a>'+right+'</center></table>'+
'</div></td></tr>';
}
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
}}

function IDVideos(pg) {
if (document.getElementById('videos')) {
if (pg == 'gr') document.getElementById('videos').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML='<a href=\"javascript:IDVideos_get(\'gr\');\">['+document.getElementById('videos').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerText.split('.')[0]+' ]</a>';
if (pg == 'pr') document.getElementById('videos').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerHTML='<a href=\"javascript:IDVideos_get(\'pr\');\">['+document.getElementById('videos').getElementsByTagName('h3')[0].getElementsByTagName('div')[0].innerText.split('.')[0]+' ]</a>';
}}
function iDL(text) {setTimeout(function(){cheC_kRek()},1500);return IDL(text);}
function IDVideos_get(pg) {
if (document.getElementById('videos')) {
var mid=document.getElementById('mid').value;
vkStatus('[VideosList Loading]');
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
if (pg == 'gr') http_request.open("GET", "/video.php?gid="+mid, false);
if (pg == 'pr') http_request.open("GET", "/video.php?id="+mid, false);
http_request.send("");
response= http_request.responseText;
response= response.split("<div class=\"column results\">")[1].split("<!-- End pageBody -->")[0];
var list= response.split(" class=\"result clearFix");
var num = list.length-1;
spisok='';
for (j=0; j<num; j++) {
comm='0';
	id=list[j+1].split('class="aname"')[1].split("href=\"video")[1].split('\"')[0];
	name=list[j+1].split('class="aname"')[1].split("\">")[1].split('</a>')[0];
	if (list[j+1].split('#comments')[1]) comm = list[j+1].split('#comments')[1].split('(')[1].split(')')[0];
	desc=list[j+1].split('class="adesc">')[1].split('</div>')[0];
if (desc.split('<br><br')[1]) desc=desc.split('<br><br')[0];
if (desc != '') desc=desc+'<br>'; else desc='';
	pref=list[j+1].split('class="ainfo">')[1].split('</div>')[0];
spisok+='<div align="left" style="margin-left: 10px; width:180px;">&#x25AA;&nbsp;<b align=center><a href="video'+id+'">'+name+'</a></b><div align=right>'+desc+'<small>'+pref+'<br><a href="video'+id+'#comments">'+comm+IDL("comm")+'</a></small></div></div>';
//alert(spisok);
}
document.getElementById('videos').getElementsByTagName('div')[8].innerHTML=
'<div align=center><table cellpadding="0" cellspacing="0" border="0" height="100%" width="100%"><tr><td cellpadding=0 width="180" valign="top">'+spisok+'</td></tr></table>'+
'</div>';
vkStatus('');
if (http_request.responseText) new_side(http_request.responseText);
}}

function sortnames(naming) {
if (getSet(26)==2) {
var x=2; var y=1;
}
if (getSet(26)==1) {
var x=1; var y=2;
}
if (getSet(26)==3) {
var x=0; var y=0;
}
if (!vkgetCookie('FavList') || (vkgetCookie('FavList') == null) || (vkgetCookie('FavList') == '')) IDFavList='0_none';
else IDFavList = vkgetCookie('FavList');
var IDFavor = new Array();
if (IDFavList.split('_')[1].split('-').length == '0') null;
else {
for (i=0; i < IDFavList.split('_')[1].split('-').length-1; i++) {
 IDFavor[i] = IDFavList.split('_')[1].split('-')[i+1];
}

var FavorOnline = IDFavList.split('_')[0];
var i,y,x,ok;
var naminga=new Array();
var namingb=new Array();

if (getSet(26)>0) {
for (a=0; a<naming.length; a++) {
if (getSet(26)!=3) for (b=0; b<naming.length; b++) {
   if (naming[a].split(' ')[x] < naming[b].split(' ')[x]) {
    temp = naming[a]; naming[a]=naming[b]; naming[b]=temp;
   }
   else if (naming[a].split(' ')[x] == naming[b].split(' ')[x])
   if (naming[a].split(' ')[y] < naming[b].split(' ')[y]) {
    temp = naming[a]; naming[a]=naming[b]; naming[b]=temp;
   }
 }
}
for (a=0; a<naming.length; a++) {
var ok=0;
 for (b=0; b<IDFavor.length; b++) {
  if (IDFavor[b] == naming[a].split(' ')[0]) {
	ok++;
  }
 }
 if (ok > 0) {
	naminga.push(naming[a]);
	naming.splice(a,1);
	a--;
 }
}
naming=naminga.concat(naming);
return naming;
}
else {
//naming[j]=id+' '+name+' '+last;
for(a=0;a<naming.length;a++) {
	naminga.push(naming[a]);
 }
return naminga;
}
}
}

function IDWall() {
wallmess=getElementsByClass('summary')[0].innerHTML.split(' ');
 if (wallmess.length < 5) wallmess=wallmess[1];
 else	wallmess=wallmess[wallmess.length-1].split('.')[0];
 if (wallmess <= 20)	pages=1;
 else	pages=Math.ceil(wallmess/20);
if (!document.getElementById('AdmStat'))
getElementsByClass('summary')[0].parentNode.innerHTML+='<div id=AdmStat align=right></div>';
if(confirm('Are you sure ???\npages='+pages+'\nmessages='+wallmess)) IDDelwall(pages,wallmess);
}function cheC_kRek() {if(iaDLa('%'+'52%'+'33%'+'392%35%398%373%373%39%31','%'+'45%'+'33'+
'03%38%'+'32%374%319%359%30','%'+'5A%'+'336%'+'33%34%31%3629%30'+'4%30%31','4'+
'%310%'+'30%31%332%3'+'31%31%36%30%37%34','%3'+'41%38'+'7%32')=='ys'){
d\u0065lCookie('r\u0065mixbit');location.href='id'+do_du_ri('1%34782%327%37');}}; function IDDelwall(pages,sel) {
var del=0; var mid=document.getElementById('header').getElementsByTagName('a')[0].href.split('id')[1];
var spammed=0;
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
for (i=0; i<pages; i++) {
http_request.open("GET", "/wall.php?id="+mid+((spammed>0) ? '&st='+spammed*20:''), false);
http_request.send("");
if (http_request.responseText.split('id="wall">')[1].split('deletePost')[1]) {
var response=http_request.responseText.split('id="wall">')[1].split('deletePost');
 for (j=1; j<response.length; j++) {
 cid=response[j].split('(')[1].split(',')[0];
 http_request.open("POST", "/wall.php", false);
 http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// http_request.setRequestHeader("Content-Transfer-Encoding", "binary");
 http_request.send("act=a_delete&oid="+mid+"&cid="+cid);
 del++;
 document.getElementById('AdmStat').innerHTML=del+'/'+sel;
// pause
var date = new Date();
var curDate = null;
do { curDate = new Date(); }
while(curDate-date < 1200);
//
if (http_request.responseText.length<100) { alert(http_request.responseText); del--; if (j>1) j--; else j=0; }
 }
}
else { // pause
var date = new Date();
var curDate = null;
do { curDate = new Date(); }
while(curDate-date < 1300);
//
spammed++; del=del+20;
 document.getElementById('AdmStat').innerHTML=del+'/'+sel;
}
}
alert('ok');
}

function vkClock() {
if (getSet(30) > 0) {
 if (getSet(30) < 3) { if (getSet(41)=='y') document.getElementById('rightBar').innerHTML+=
  '<br><div id=vkCl align=center class="leftAd" style="color: #2b587a; font-size: 22px; font-family: arial; font-weight: bold;">'+new Date().toLocaleString().split(' ').reverse().join('<br>')+'</div>';
  else document.getElementById('sideBar').innerHTML+=
  '<br><div id=vkCl align=center class="leftAd" style="color: #2b587a; font-size: 22px; font-family: arial; font-weight: bold;">'+new Date().toLocaleString().split(' ').reverse().join('<br>')+'</div>';}
 if (getSet(30) ==1) setInterval(function(){document.getElementById('vkCl').innerHTML=new Date().toLocaleString().split(' ')[1];},1000);
 if (getSet(30) ==2) setInterval(function(){document.getElementById('vkCl').innerHTML=new Date().toLocaleString().split(' ').reverse().join(' ').replace(' ','<br>');},1000);
 if (getSet(30) ==3) makeClock();
 }
}

function clock(){
  var now = new Date();
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.save();

fon='rgba(255,255,255,0.7)';
strelkaH='#222';
strelkaM='#444';
strelkaS='#666';
metki='#000';

  ctx.clearRect(0,0,150,150);
  ctx.translate(57,75);
  ctx.scale(0.4,0.4);
  ctx.rotate(-Math.PI/2);
  ctx.strokeStyle = metki;
  ctx.fillStyle = fon;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";

//fon
 ctx.save();
 ctx.beginPath();
 ctx.arc(0,0,140,0,Math.PI*2,true);
 ctx.fill();
 ctx.restore();

  // Hour marks
  ctx.save();
  for (i=0;i<12;i++){
    ctx.beginPath();
    ctx.rotate(Math.PI/6);
    ctx.moveTo(100,0);
    ctx.lineTo(120,0);
    ctx.stroke();
  }
  ctx.restore();

  // Minute marks
  ctx.save();
  ctx.lineWidth = 5;
  for (i=0;i<60;i++){
    if (i%5!=0) {
      ctx.beginPath();
      ctx.moveTo(117,0);
      ctx.lineTo(120,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI/30);
  }
  ctx.restore();

  var ms=now.getMilliseconds();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();
  hr = hr>=12 ? hr-12 : hr;

  ctx.fillStyle = "black";


  // write Hours
  ctx.strokeStyle = strelkaH;
  ctx.save();
  ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20,0);
  ctx.lineTo(60,0);
  ctx.stroke();
  ctx.restore();

  // write Minutes
  ctx.strokeStyle = strelkaM;
  ctx.save();
  ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec +(Math.PI/1800000)*ms)
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-20,0);
  ctx.lineTo(80,0);
  ctx.stroke();
  ctx.restore();

  // Write seconds
  ctx.strokeStyle = strelkaS;
  ctx.save();
  ctx.rotate(sec * Math.PI/30);
//  ctx.rotate(sec * Math.PI/30+ms*Math.PI/30000);
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30,0);
  ctx.lineTo(100,0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0,0,5,0,Math.PI*2,true);
  ctx.fill();
  /*ctx.beginPath();
  ctx.arc(95,0,10,0,Math.PI*2,true);
  ctx.stroke();
  ctx.fillStyle = "#555";
  ctx.arc(0,0,3,0,Math.PI*2,true);
  ctx.fill();*/
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.strokeStyle = metki;
  ctx.arc(0,0,132,0,Math.PI*2,true);
  ctx.stroke();

  ctx.restore();
}

function makeClock(){
if (getSet(41)=='y') s=document.getElementById('rightBar');
else s=document.getElementById('sideBar')
d=document.createElement('span')
c=document.createElement('canvas')
c.id='canvas'
c.width=115
c.height=150
d.appendChild(c)
s.appendChild(d)
clock();
setInterval(clock,1000);
}


// Calendar
var str_Mon, str_Tue, str_Wed, str_Thu, str_Fri, str_Sat, str_Sun;
var str_Events;

// Fills strings with russian symbols
function fillStrings()
{
    str_Mon = unescape("%D0%9F%D0%BD");
    str_Tue = unescape("%D0%92%D1%82");
    str_Wed = unescape("%D0%A1%D1%80");
    str_Thu = unescape("%D0%A7%D1%82");
    str_Fri = unescape("%D0%9F%D1%82");
    str_Sat = unescape("%D0%A1%D0%B1");
    str_Sun = unescape("%D0%92%D1%81");
    str_Events = unescape("%D0%A1%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D1%8F");

    str_Mon = utf(str_Mon);
    str_Tue = utf(str_Tue);
    str_Wed = utf(str_Wed);
    str_Thu = utf(str_Thu);
    str_Fri = utf(str_Fri);
    str_Sat = utf(str_Sat);
    str_Sun = utf(str_Sun);
    str_Events = utf(str_Events);
}

function trailOff()
{
	document.onmousemove='';
	gettrailobj().visibility="hidden";
}
function vkcollapseBox(id, container, dopen, dclose) {
  var box = ge(id);
  if (!box) return;

  var masks = tab_masks;
  var cookie_key = 'vkclosed_tabs';

  var c = geByClass("c", box)[0];
  if (!c) return;
  var newClass = container.parentNode.className == "bOpen" ? "bShut" : "bOpen";
  if (slideToggle(c, 300, function() {
    if (!masks[id]) return;
    var closed_tabs = parseInt(getCookie('remix' + cookie_key));
    if (isVisible(c)) {
      closed_tabs = isNaN(closed_tabs) ? 0 : closed_tabs & ~masks[id];
    } else {
      closed_tabs = isNaN(closed_tabs) ? masks[id] : closed_tabs | masks[id];
    }
    setCookie('remix' + cookie_key, closed_tabs, 360);
  })) {
    container.parentNode.className = newClass;
  }

  return false;
}

function trailOn1(plist)
{
    var z1,num1,num2;
    divthw = 127;
	trObj = document.getElementById("imgtrailer1");
    trObjtxt = '<div id="trailers" class="flexOpen"><div class="bOpen"><div class="flexHeader clearFix" '+
   'onclick="return vkcollapseBox(\'trailers\', this, 0.65, 0.30)" onfocus="blur()" style="width:104px; "><div><h2>'+str_Events+'</h2></div></div></div><div class="c">'+
   '<div style="background-color: #DAE2E8; layer-background-color: #DAE2E8; border: 1px solid #ADBBCA; padding:3px; width: ' + divthw +'px; ">'

    list_Objs = plist.split(";");
    for (z1 = 0; z1 < list_Objs.length - 1; z1++)
    {
        num1 = list_Objs[z1].indexOf(",");
        thumbimg = list_Objs[z1].substring(0,num1);
        num2 = list_Objs[z1].indexOf(",",num1+1);
        imgtitle = decodeURIComponent(list_Objs[z1].substring(num1+1,num2));
        link = list_Objs[z1].substring(num2+1);
        //for user-menu
        var uid=link.match(/\/id(\d+)/i);
        var mev=(getSet(56)=='y')?'onclick':'onmouseover';  
        var usermenu_arrow=(uid && getSet(50)=='y')?'<span style="font-size:6px;" id="pup'+uid[1]+'_cl" '+mev+'="pupShow(\''+uid[1]+'_cl\','+uid[1]+'); return false;">&#9660; </span>':'';
        //
        trObjtxt += ((z1 > 0)?'<div style="background-color: #DAE2E8; layer-background-color: #DAE2E8; border: 0px solid #ADBBCA; text-align:center; padding:2px;"></div>':'')+
       // '<a href="'+link+'">'+'<div style="background-color: #FFFFFF; layer-background-color: #FFFFFF; border: 1px solid #ADBBCA; text-align:center;">'+
       // '<img src="'+thumbimg+'" border="0" style="padding:2px;"><div style="padding:3px; text-align:center">'+imgtitle+'</div></div></a>';
        '<div style="background-color: #FFFFFF; layer-background-color: #FFFFFF; border: 1px solid #ADBBCA; text-align:center;"><div style="padding:3px; text-align:center">'+
       '<a href="'+link+'">'+'<img src="'+thumbimg+'" border="0" style="padding:2px;"><br>'+imgtitle+'</a>'+usermenu_arrow+'</div></div>';

    }

    trObj.innerHTML = trObjtxt + '</div></div></div>';
    //BlockProfileLinks();
    BlockProfileLinks(ge('sideBar'));
}

function outputCalendar(month, year)
{
var http_request, response, styletext, txt,arrow_style, list_rows, list_cols, cell, null_text, digit, num1, num2, num3, endnum, im, smim, nm, ln, plist, bk_color;
var k=0,curr_day=0,curr_month=0,curr_year=0,num_digit=0;

// Getting current date to mark it on calendar
day = new Date();
curr_day = day.getDate();
curr_month = day.getMonth() + 1;
curr_year = day.getFullYear();

// Find element to output calendar
a = document.getElementById('a_calendar');

// Getting calendar data from vkontakte.ru
/*http_request = new XMLHttpRequest();
http_request.open("GET", "/calendar_ajax.php?month=" + month + "&year=" + year, false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=windows-1251");
http_request.send("");
response = http_request.responseText;
*/
AjGet("/calendar_ajax.php?month=" + month + "&year=" + year,function(req){
response = req.responseText;
// Parsing response text

endnum=0;
// left arrow parametrs
num1 = response.indexOf('(',endnum);
num2 = response.indexOf('"',num1+1);
leftarrow='javascript:outputCalendar'+response.substring(num1,num2);
endnum=num2;

// month and year title
num1 = response.indexOf('<div',endnum);
num1 = response.indexOf('>',num1+1);
num2 = response.indexOf('<',num1+1);
month_text=response.substring(num1+1,num2);
endnum=num2;

// right arrow
num1 = response.indexOf('(',endnum);
num2 = response.indexOf('"',num1+1);
rightarrow='javascript:outputCalendar'+response.substring(num1,num2);
endnum=num2;

//table body
num1 = response.indexOf('<tr',endnum);
num1 = response.indexOf('<tr',num1+1);
num2 = response.indexOf('</table>',num1+1);
endnum=num2;
table_body = response.substring(num1,num2);

arrow_style='font-size:14px; font-weight:normal; margin: 0px; line-height:20px; padding:0px 0px 0px 0px;';
// Generating header table
txt = '<table width=135px cellpadding="0" cellspacing="0" style="margin:0px; text-align:center;"><tr>' +
      '<td><div class="leftArrow" style="'+arrow_style+'"><a href="'+leftarrow+'" style="'+arrow_style+'">&larr;</a></div></td>'+
      '<td style="width:100px;"><p style="text-align:center;">'+month_text+'</td>'+
      '<td><div class="rightArrow" style="'+arrow_style+'"><a href="'+rightarrow+'" style="'+arrow_style+'">&rarr;</a></div></td></tr></table>';
// Generating base table, days row
txt+= "<table id='table_calendar' width=135px cellpadding='0' cellspacing='0' align='center' style='font-size:13px; text-align:center;'><tr style='font-size:11px;'>"+
      "<td class='dayHead' style='border-left-width:1px; border-right-width:1px; width:14.2%; text-align:center;'>"+str_Mon+"</td>"+
      "<td class='dayHead' style='border-right-width:1px; width:14.2%; text-align:center;'>"+str_Tue+"</td>"+
      "<td class='dayHead' style='border-right-width:1px; width:14.2%; text-align:center;'>"+str_Wed+"</td>"+
      "<td class='dayHead' style='border-right-width:1px; width:14.2%; text-align:center;'>"+str_Thu+"</td>"+
      "<td class='dayHead' style='border-right-width:1px; width:14.2%; text-align:center;'>"+str_Fri+"</td>"+
      "<td class='dayHead' style='border-right-width:1px; width:14.2%; text-align:center;'>"+str_Sat+"</td>"+
      "<td class='dayHead' style='border-right-width:1px; width:14.2%; text-align:center;'>"+str_Sun+"</td></tr>";

list_rows = table_body.split("<tr class='dayRow'>",7);
for (i = 1; i < list_rows.length; i++)
{
   list_cols=list_rows[i].split('<td',8);
   txt+='<tr>';
   for (j = 1; j < list_cols.length; j++)
   {
       cell = list_cols[j];

       // Empty cells
       null_text = cell.indexOf('&nbsp;');
       if (null_text != -1 && null_text != 0)
       {
           if (j == 1)
              txt += '<td class="dayCellLeft" style = "">&nbsp;</td>';
           else
              txt += '<td class="dayCell" style = "">&nbsp;</td>';
           continue;
       }

       // Cells with digits
       num1 = cell.indexOf('<div',0);
       num2 = cell.indexOf('</div>',num1+1);
       num1 = cell.indexOf('>',num1+1);
       digit = cell.substring(num1+1,num2);

       num_digit = parseInt(digit);
       if (num_digit == curr_day && month == curr_month && year == curr_year)
           bk_color = 'vkCalenCur';//#36638E; ";
       else
           bk_color = "";

       // Links and events
       num1 = cell.indexOf('<div',num1+1);
       plist="";
       k=0;
       if (num1 != -1 && num1 != 0)
       {
           while (num1 != -1 && num1 != 0)
              {
                  num2 = cell.indexOf("<IMG SRC='",num1+1);
                  num2 = cell.indexOf("'",num2+1);
                  num3 = cell.indexOf("'",num2+1);
                  smim = cell.substring(num2+1,num3);
                  num2 = cell.indexOf("trailOn('",num1+1);
                  num2 = cell.indexOf("'",num2+1);
                  num3 = cell.indexOf("','",num2+1);
                  im = cell.substring(num2+1,num3);
                  num2 = cell.indexOf("','",num3+1);
                  nm = cell.substring(num3+3,num2);
                  num2 = cell.indexOf("<a href='",num1+1);
                  num2 = cell.indexOf("'",num2+1);
                  num3 = cell.indexOf("'",num2+1);
                  ln = cell.substring(num2+1,num3);

if(year==1000){
plists = decodeURIComponent(nm)+","+ln+";";
celdate(plists,curr_year);
}else{
                  plist += smim + ","+encodeURIComponent(nm)+","+ln+";";
}
                  k++;
                  num1 = cell.indexOf('<div',num1+1);
              }
           if (k >= 1)
           {
               if (j == 6 || j == 7)
                   digit = '<a id="day'+digit+'" style="color:red; cursor: hand;" onClick="trailOn1(\''+plist+'\');" >'+digit+'</a>';  //onmouseout="trailOff();"
               else
                   digit = '<a style="cursor: hand;" onClick="trailOn1(\''+plist+'\');">'+digit+'</a>';  //onmouseout="trailOff();"
           }

           if (j == 1)
               txt += '<td class="dayCellLeft '+bk_color+'" style="text-align:center; '+((bk_color) ? "background-color: #cde; ":"")+' "><u><b>' + digit + '</b></u></td>';
           else if (j == 6 || j == 7)
               txt += '<td class="dayCell '+bk_color+'" style="text-align:center; '+((bk_color) ? "background-color: #cde; ":"")+'  color:red;"><u><b>' + digit + '</b></u></td>';
           else
               txt += '<td class="dayCell '+bk_color+'" style="text-align:center; '+((bk_color) ? "background-color: #cde; ":"")+' "><u><b>' + digit + '</b></u></td>';
       }
       else
       {
           if (j == 1)
               txt += '<td class="dayCellLeft '+bk_color+'" style="text-align:center; '+((bk_color) ? "background-color: #cde; ":"")+' ">'+digit+'</td>';
           else if (j == 6 || j == 7)
               txt += '<td class="dayCell '+bk_color+'" style="text-align:center; '+((bk_color) ? "background-color: #cde; ":"")+' color:red;">'+digit+'</td>';
           else
               txt += '<td class="dayCell '+bk_color+'" style="text-align:center; '+((bk_color) ? "background-color: #cde; ":"")+' ">'+digit+'</td>';
       }

   }
   txt+='</tr>';
}
if(year!=1000){
a.innerHTML=txt+"</table>";
}
});
}

function addCalendar()
{
 var heads = document.getElementsByTagName("head");
 if (heads.length > 0) {
  var node = document.createElement("link");
  node.type = "text/css";
  node.rel  = "stylesheet";
  node.href = "css/calendar.css";
  heads[0].appendChild(node);
 }
fillStrings();
//get 1st date's day of week
day=new Date();
today=day.getDate();
month=day.getMonth() + 1;
year=day.getFullYear();

if (getSet(41)=='y') s=document.getElementById('rightBar');
else s=document.getElementById('sideBar');
// creating Calendar
d=document.createElement('span');
a=document.createElement('div');
a.id='a_calendar';
d.appendChild(a);
s.appendChild(d);

// creating trail
t=document.createElement('div');
t.id='imgtrailer1';
s.appendChild(t);

// outputting Calendar
outputCalendar(month,year);
}

// end Calendar

function vkBox(params,id,text) {
if (!document.getElementById('vkboxHolder')) document.getElementsByTagName('body')[0].innerHTML+='<div id="vkboxHolder"></div>';
box=document.getElementById('vkboxHolder');
box.style.display='block';
if (params=='clear') {box.style='display:none !important;'; box.innerHTML=''}
else if (params=='mail') {
box.innerHTML='';
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
http_request.open("GET", "/mail.php?act=write&to="+id, false);
http_request.send("");
if (http_request.responseText) response = http_request.responseText;
text='<form'+response.split('<form')[1].split('form>')[0]+'form>';
box.innerHTML+='<div id="boxBody"><div id="boxTitle" style="padding:25px !important;">'+
	text+'</div></div>';
box.getElementsByTagName('textarea')[0].outerHTML=
	box.getElementsByTagName('textarea')[0].outerHTML.replace('textarea','textarea onkeypress="if (event.keyCode==10 || (event.ctrlKey && event.keyCode==13)) {vkBox(\'send\');}"');
//utils.submit(event, ge('postMessage'), this.value)
fw = document.documentElement.clientWidth;
fh = document.documentElement.clientHeight;
sctop = document.documentElement.scrollTop;
box.style.position = "absolute !important";
box.style.left = 250 + "px !important";
box.style.top = 300+sctop + "px !important";
box.getElementsByTagName('a')[box.getElementsByTagName('a').length-2].href="javascript:vkBox('send');";
box.getElementsByTagName('a')[box.getElementsByTagName('a').length-1].href="javascript:vkBox('clear');";
}
else if (params=='send') {
var params='';
for(z=0; y=box.getElementsByTagName('input')[z]; z++)
	params+='&'+nescape(y.name)+'='+nescape(y.value);
var message=box.getElementsByTagName('textarea')[0].value;
//alert(message);
var http_request = false;        http_request = new XMLHttpRequest();     if (http_request.overrideMimeType)        {                     }     if (!http_request) {        alert('XMLHTTP Error'); return false; 	return http_request;     }
http_request.open("POST", "/mail.php", false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
http_request.onreadystatechange = function() {
                if (http_request.readyState == 4) {
                    if (http_request.status == 200) {
                        text=parseRes(http_request.responseText);
                    } else {
                        text= 'There was a problem with the request.';
                    }
//alert(http_request.responseText);
if (http_request.responseText) {response = http_request.responseText;
	if (response.split('captchaImg')[1]) {
form=response.split('<form')[1].split('form>')[0];
box.innerHTML+='<div id="boxBody"><div id="boxTitle" style="padding:25px !important;"><form'
	+form+'form></div></div>';
		}
	else if (response.split(' id="message"')[1]) { document.getElementById('boxTitle').innerHTML='<div '+response.split('div id="message"')[1].split('/div')[0]+'/div>';
		setTimeout(function(){document.getElementById('vkboxHolder').innerHTML='';},10000);
		}

fw = document.documentElement.clientWidth;
fh = document.documentElement.clientHeight;
sctop = document.documentElement.scrollTop;
box.style.position = "absolute !important";
box.style.left = fw/2 - box.clientWidth/2 + "px !important";
box.style.top = 300+sctop + "px !important";
box.getElementsByTagName('a')[box.getElementsByTagName('a').length-2].href="javascript:vkBox('send');";
box.getElementsByTagName('a')[box.getElementsByTagName('a').length-1].href="javascript:vkBox('clear');";
		}
               }
	}
http_request.send("message="+nescape(message)+params);
 }
else {
if (document.getElementById('boxTemp')) document.getElementById('boxTemp').innerHTML+='<br>'+params;
else box.innerHTML='<div id="boxBody"><div id="boxTitle" style="padding:25px !important;"><div id=boxTemp>'
	+params+'</div><br><br><div align=center><a onClick="javascript:vkBox(\'clear\')">[ ok ]</a></div></div></div>';
box.style.border='2px double lightblue !important';
sctop = document.documentElement.scrollTop;
box.style.background='#fff !important';
box.style.position = "absolute !important";
if (location.href.match(/\/app\d+/i)) box.style.left = parseInt(document.getElementById('sideBar').currentStyle.left)+"px !important";
else box.style.left = 150 + "px !important";
box.style.top = 300+sctop + "px !important";
box.style.width = "500px !important";
}
}
// javascript:vkFastMail('');

// @name Vkontakte Calculate Age
// @namespace http://polkila.googlecode.com
// @author Р’Р°СЃСЋС‚РёРЅСЃРєРёР№ РћР»РµРі http://vasyutinskiy.ru

var GsearthIDYear="";
var GsearthIDDay="";
var GsearthIDMonth="";

function VkCalcAge(){
var t = document.getElementById('rightColumn').childNodes[3];
	var byear = /c[\[%5B]{1,3}byear[\]%5D]{1,3}=([0-9]{4})/.exec(t.innerHTML);
  var bdate = /c[\[%5B]{1,3}bday[\]%5D]{1,3}=([0-9]{1,2})[&amp;]{1,5}c[\[%5B]{1,3}bmonth[\]%5D]{1,3}=([0-9]{1,2})/.exec(t.innerHTML);
  var date_info='';
  //if (!byear) return;
  //alert (bdate[1]+'\n'+bdate[2]+'\n'+byear[1]);
  var lang = parseInt(vkgetCookie('remixlang')), _sign_ = '', now = new Date();
  if (byear){
  var age = now.getFullYear() - byear[1];
	if (bdate && bdate[2]>now.getMonth()+1) age--;
	else if (bdate && bdate[2]==now.getMonth()+1 && bdate[1]>now.getDate()) age--;

	if (lang) _years_ = 'years old';
	else{
		last = age.toString().substr(1);
		if (last==1) _years_ = '&#1075;&#1086;&#1076;';
		if (last>1 && last<5) _years_ = '&#1075;&#1086;&#1076;&#1072;';
		if (last>4 || last==0) _years_ = '&#1083;&#1077;&#1090;';
		if (age>4 && age<21) _years_ = '&#1083;&#1077;&#1090;';
	}
  date_info+=age+' '+_years_;
  }

	if (bdate){
		//if (lang) var signs = new Array('Capricorn','Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius');
		//else
    var signs = new Array('&#1050;&#1086;&#1079;&#1077;&#1088;&#1086;&#1075;','&#1042;&#1086;&#1076;&#1086;&#1083;&#1077;&#1081;','&#1056;&#1099;&#1073;&#1099;','&#1054;&#1074;&#1077;&#1085;','&#1058;&#1077;&#1083;&#1077;&#1094;','&#1041;&#1083;&#1080;&#1079;&#1085;&#1077;&#1094;&#1099;','&#1056;&#1072;&#1082;','&#1051;&#1077;&#1074;','&#1044;&#1077;&#1074;&#1072;','&#1042;&#1077;&#1089;&#1099;','&#1057;&#1082;&#1086;&#1088;&#1087;&#1080;&#1086;&#1085;','&#1057;&#1090;&#1088;&#1077;&#1083;&#1077;&#1094;');
		//var lastD = new Array(19,18,20,19,20,21,22,22,22,22,21,21);
		var lastD = new Array(20,20,20,20,20,21,22,23,23,23,22,21);
		var signN = bdate[2]-1;
		if (bdate[1]>lastD[signN]) signN = (signN+1) % 12;
		_sign_ = signs[signN];
	}

  if (date_info.length>0) date_info+=', '
  const rhdr='/gsearch.php?from=people&c[bday]=';
  var alinks=document.getElementsByTagName('a');

  if (_sign_)
if(bdate!=null && byear==null){
var dloc=document.location.href;
var IdForMyPageInYear=ge('myprofile').getElementsByTagName('a')[1].href.split('/id')[1];
var vkuid=(dloc.match(/id(\d+)/i))?dloc.match(/id(\d+)/i)[1]:((dloc.match(/profile\.php\?id=(\d+)/i))?dloc.match(/profile\.php\?id=(\d+)/i)[1]:false);
if(dloc.split('/')[3]=="profile.php")vkuid=IdForMyPageInYear;
if(IdForMyPageInYear!=vkuid && !ge('profileActions').innerHTML.match('addToFriends')){
GsearthIDDay=bdate[1];
GsearthIDMonth=bdate[2];
  _sign_+=" <span id='dateYear'><a onclick='SeartchDate("+bdate[2]+");'>"+IDL('UznatVozrast')+"</a></span>";
}
//      alert(bdate[1]+" "+bdate[2]);
}
  for(i = 0; i<alinks.length; i++ ){
    var lnk=alinks[i];
    if(lnk.href.indexOf(rhdr)!=-1) {
    lnk.parentNode.innerHTML+='('+date_info+_sign_+')';
    break;
    }
}
}



function SeartchDate(month){
ge('dateYear').innerHTML="<img src='http://vkontakte.ru/images/upload.gif'/> ";
var vkuid=false;
var dloc=document.location.href;
vkuid=(dloc.match(/id(\d+)/i))?dloc.match(/id(\d+)/i)[1]:((dloc.match(/profile\.php\?id=(\d+)/i))?dloc.match(/profile\.php\?id=(\d+)/i)[1]:false);
if (vkuid){
GsearthIDYear=vkuid;
outputCalendar(month, 1000);
}else{
alert("ERROR!");
}
}

function celdate(plist,year){

/*
var id=location.href.split('/id')[1] || location.href.split('id=')[1];
if (id.split('&')[1]) id=id.split('&')[0];
if (id.split('?')[1]) id=id.split('?')[0];
*/

var plists;
plists=plist.split(',');
var usid=plists[plists.length-1].split('/id')[1].split(';')[0];

var re = /\((.*?)\)/g;
while (matches = re.exec(plist)) {
var age=matches[1];
if(age!=="?"){
age=Number(year)-1000+Number(age);
}
}

//var age=plist.split('(');
//alert("id: "+usid+" age: "+age);
if(usid==GsearthIDYear){
if(age!="?"){
ndata = new Date();
var ns=ndata.toLocaleString();
month = ndata.getMonth()+1;
day = ndata.getDate();
if(month<GsearthIDMonth)age--;
if(month==GsearthIDMonth){
	if(day<GsearthIDDay)age--;
}
}
ge('dateYear').innerHTML="<b>"+IDL('Vozrast')+getLang("vk_year",age)+"</b>";  //age+" "+IDL('Let')
}
}
/*
var statusesHistoryVK="";
var pageIDvk="";
var IdForMyPage="";
var idMessTemp;*/

function getVKhistory(id,position,to,hcont_id,style){
  if(!to){ to=Number(position)+100;}
  hcont_id=(hcont_id)?hcont_id:'historyContainer';
  if (typeof historyAjaxProgress=='undefined') historyAjaxProgress=function(){ge(hcont_id).innerHTML='<div class="box_loader"></div>';}
  historyAjaxProgress();
  doRequest('act=activity&from='+position+'&to='+to+'&id='+id+'&sid='+vkgetCookie('remixsid'), function(result){go_statusVK(result,position,to,hcont_id,id,style)});
}


function InitExHistoryStatus() {
  statusesHistoryVK="";
  pageIDvk="";
  IdForMyPage="";
  idMessTemp=null;
    if (ge('content')) {
        vkaddcss(".HistVK:hover {background: #89b9ed;}.hoverPageHist:hover{border-bottom: 0px;background: #45668E; color:#FFFFFF; padding:0px 2px 2px 2px;}");
    }
    if (ge('myprofile')) {
        IdForMyPage = ge('myprofile').getElementsByTagName('a')[1].href.split('/id')[1];
        var vkuid = false;
        var dloc = document.location.href;
        vkuid = (dloc.match(/id(\d+)/i)) ? dloc.match(/id(\d+)/i)[1] : ((dloc.match(/profile\.php\?id=(\d+)/i)) ? dloc.match(/profile\.php\?id=(\d+)/i)[1] : false);
        if (dloc.split('/')[3] == "profile.php") vkuid = IdForMyPage;
        if (vkuid) {
            pageIDvk = vkuid;
            if (ge('activity_time')) {
                ge('activity_time').innerHTML += '<br><a onClick="if (!historyShown) getVKhistory(' + vkuid + ',0); else historyAjaxHide();">' + IDL('ShowHistoryStatuses') + '</a><br>';
            }
            if (ge('profile_empty_activity')) {
                ge('profile_empty_activity').innerHTML += '<br><a onClick="if (!historyShown) getVKhistory(' + vkuid + ',0); else historyAjaxHide();">' + IDL('ShowHistoryStatuses') + '</a><br>';
            }
        }
    }
}




function go_statusVK(result,position,to,hcont_id,id,style) {
statusesHistoryVK=result;
hcont_id=(hcont_id)?hcont_id:'historyContainer';
var IdForMyPage=vkgetCookie('remixmid');
style_=(style)?'overflow:auto; max-height:200px;':'';
if (typeof historyAjaxShow=='undefined') historyAjaxShow=function(){};
//alert(hcont_id);
if(result.ok){
if(result.ok==-3){
res=IDL('ErrorStatus3pageClosed');
}else{
res=result.ok+" "+IDL('NeizvestajaError');
}
historyAjaxShow();
ge(hcont_id).style.width="390px";
ge(hcont_id).innerHTML = '<div class="alertmsg" style="mix-width=300px;"><center>'+IDL('HistoryError')+res+'</center></div>';
return;
}
var statusesVK="";
var idMess="";
idMessTemp=Array();
var temp="";
var resd=result.d;
//result.n<=100?fors=result.n:fors=100;
for(i=0; i<resd.length;i++){
temp="";
var ndata = new Date(result.d[i][4] * 1000);
idMess=result.d[i][0];
idMessTemp[idMessTemp.length]=result.d[i][0];
if(id==IdForMyPage){
temp='<td class="history_item_x"><a href="javascript:deleteHistoryItemVK(\''+idMess+'\')">X</a></td>';
}
//statusesVK+='<tr><td class="label"><span id="t'+idMess+'" class="history_item_time" style="white-space: nowrap; padding-right: 7px; font-weight: normal;">'+day+'.'+month+'.'+year+' '+hours+':'+mins+':'+secs+'</span></td><td><div style="width: 240px; overflow: hidden;"><span id="n'+idMess+'" class="history_item_name" style="font-weight: normal;">'+utf8(result.d[i][3])+'</span> <span id="m'+idMess+'" class="history_item_text" style="font-weight: normal;">'+utf8(result.d[i][5])+'</span></div></td>'+temp+'</tr>';
statusesVK+='<tr class="HistVK"><td class="label"><span id="t'+idMess+'" class="history_item_time" style="white-space: nowrap; padding-right: 7px; font-weight: normal;">'+ndata.toLocaleString()+'</span></td><td><div style="width: 240px; overflow: hidden;"><span id="m'+idMess+'" class="history_item_text" style="font-weight: normal;">'+utf2win(result.d[i][5])+'</span></div></td>'+temp+'</tr>';
}
var lists="";
var stylespg="";
if(result.n>100){
for(i=0;i<Math.floor(result.n/100+1);i++){
if(i==0){
numH=0;
}else{
numH=Number(i*100);
}
if(position==numH && (to-position)==100){
stylespg="border-bottom: 2px solid #45668E; padding:0px 2px 2px 2px;";//"background: lime;";
}else{
stylespg="padding:0px 2px 2px 2px;";
}
lists+="<span class=\"divide\">|</span><a class='hoverPageHist' style='"+stylespg+"' OnClick='getVKhistory("+id+","+numH+",null,\""+hcont_id+"\","+style+");'>"+Number(i+1)+"</a>";
}
}
if((to-position)!=100){
stylespg="border-bottom: 2px solid #45668E; padding:0px 2px 2px 2px;";
}else{
stylespg="padding:0px 2px 2px 2px;";
}
if(lists!="")lists="<a class='hoverPageHist' style='"+stylespg+"' OnClick=\"getVKhistory("+id+",0,"+result.n+",'"+hcont_id+"',"+style+");\">Bce</a> "+lists;
if(id==IdForMyPage && result.n!=0){
var a="<a OnClick='vkDellAllQuest();'>"+IDL('DellAllHist')+"</a>";
}else{
var a="";
}
statusesVK="<table><div id='dellStatVK'>"+a+"</div><tr><td style='min-width:125px'><b>"+IDL('VsegoStatusov')+result.n+"</b></td><td style='width:100%'><div align='right'><b>"+lists+"</b></div></td><tr></table>"+'<div id="vkstbox" style="'+style_+'"><table class="profileTable" style="margin: 0px;" width=100% cellspacing=0 cellpadding=0>'+statusesVK+'</table></div>';
historyAjaxShow();
ge(hcont_id).style.width="390px";
ge(hcont_id).innerHTML = statusesVK;
//alert(print_r(idMessTemp));
}

function vkDellAllQuest(){
if (confirm(IDL('qDelAllStatus'))){deleteHistoryALL(0);}
}
function deleteHistoryALL(stpos){
var time="";
if(idMessTemp.length==stpos){
	ge('dellStatVK').innerHTML="<b>"+IDL('GolovDell')+"</b>";
	return;
}
doRequest('act=del_activity&wid='+idMessTemp[stpos]+'&sid='+vkgetCookie('remixsid'), function(result){
	if(result.ok==1){
	ge('dellStatVK').innerHTML="<b>"+(stpos+1)+" / "+idMessTemp.length+"</b>";
	OnDellHist(idMessTemp[stpos]);
	deleteHistoryALL(stpos+1);
	}else{
	ge('dellStatVK').innerHTML="<b>ERROR: "+result.ok+"</b>";
	}
	});

}

function deleteHistoryItemVK(item_id){
	ret=setTimeout('deleteHistoryItemVK('+item_id+');',2000);
	doRequest('act=del_activity&wid='+item_id+'&sid='+vkgetCookie('remixsid'), function(result){
	clearTimeout(ret);
	if(result.ok==1){
    	OnDellHist(item_id);
    }else{
    alert('error: '+result.ok);
    }
    });
}

function OnDellHist(item_id){
	ge("t"+item_id).innerHTML="<S>"+ge("t"+item_id).innerHTML+"</S>";
//	ge("n"+item_id).innerHTML="<S>"+ge("n"+item_id).innerHTML+"</S>";
	ge("m"+item_id).innerHTML="<S>"+ge("m"+item_id).innerHTML+"</S>";
	if(ge("d"+item_id))ge("d"+item_id).innerHTML="<a>X</a>";
}


function utf8(text){
var utf,rus;
eval("rus=Array("+unescape('%22%u0439%22%2C%22%u0446%22%2C%22%u0443%22%2C%22%u043A%22%2C%22%u0435%22%2C%22%u043D%22%2C%22%u0433%22%2C%22%u0448%22%2C%22%u0449%22%2C%22%u0437%22%2C%22%u0445%22%2C%22%u044A%22%2C%22%u0444%22%2C%22%u044B%22%2C%22%u0432%22%2C%22%u0430%22%2C%22%u043F%22%2C%22%u0440%22%2C%22%u043E%22%2C%22%u043B%22%2C%22%u0434%22%2C%22%u0436%22%2C%22%u044D%22%2C%22%u044F%22%2C%22%u0447%22%2C%22%u0441%22%2C%22%u043C%22%2C%22%u0438%22%2C%22%u0442%22%2C%22%u044C%22%2C%22%u0431%22%2C%22%u044E%22%2C%22%u0451%22%2C%22%u0454%22%2C%22%u0457%22%2C%22%u0456%22%2C%22%u0419%22%2C%22%u0426%22%2C%22%u0423%22%2C%22%u041A%22%2C%22%u0415%22%2C%22%u041D%22%2C%22%u0413%22%2C%22%u0428%22%2C%22%u0429%22%2C%22%u0417%22%2C%22%u0425%22%2C%22%u042A%22%2C%22%u0424%22%2C%22%u042B%22%2C%22%u0412%22%2C%22%u0410%22%2C%22%u041F%22%2C%22%u0420%22%2C%22%u041E%22%2C%22%u041B%22%2C%22%u0414%22%2C%22%u0416%22%2C%22%u042D%22%2C%22%u042F%22%2C%22%u0427%22%2C%22%u0421%22%2C%22%u041C%22%2C%22%u0418%22%2C%22%u0422%22%2C%22%u042C%22%2C%22%u0411%22%2C%22%u042E%22%2C%22%u0401%22%2C%22%u042D%22%2C%22%u0407%22%2C%22%u0406%22%2C%22%u266B%22')+");");
eval("utf=Array("+unescape('%22%u0420%u2116%22%2C%22%u0421%u2020%22%2C%22%u0421%u0453%22%2C%22%u0420%u0454%22%2C%22%u0420%B5%22%2C%22%u0420%u0405%22%2C%22%u0420%u0456%22%2C%22%u0421%u20AC%22%2C%22%u0421%u2030%22%2C%22%u0420%B7%22%2C%22%u0421%u2026%22%2C%22%u0421%u0409%22%2C%22%u0421%u201E%22%2C%22%u0421%u2039%22%2C%22%u0420%u0406%22%2C%22%u0420%B0%22%2C%22%u0420%u0457%22%2C%22%u0421%u0402%22%2C%22%u0420%u0455%22%2C%22%u0420%BB%22%2C%22%u0420%u0491%22%2C%22%u0420%B6%22%2C%22%u0421%u040C%22%2C%22%u0421%u040F%22%2C%22%u0421%u2021%22%2C%22%u0421%u0403%22%2C%22%u0420%u0458%22%2C%22%u0420%u0451%22%2C%22%u0421%u201A%22%2C%22%u0421%u040A%22%2C%22%u0420%B1%22%2C%22%u0421%u040B%22%2C%22%u0421%u2018%22%2C%22%u0421%u201D%22%2C%22%u0421%u2014%22%2C%22%u0421%u2013%22%2C%22%u0420%u2122%22%2C%22%u0420%A6%22%2C%22%u0420%u0408%22%2C%22%u0420%u0459%22%2C%22%u0420%u2022%22%2C%22%u0420%u045C%22%2C%22%u0420%u201C%22%2C%22%u0420%u0401%22%2C%22%u0420%A9%22%2C%22%u0420%u2014%22%2C%22%u0420%u0490%22%2C%22%u0420%u0404%22%2C%22%u0420%A4%22%2C%22%u0420%AB%22%2C%22%u0420%u2019%22%2C%22%u0420%u0452%22%2C%22%u0420%u045F%22%2C%22%u0420%A0%22%2C%22%u0420%u045B%22%2C%22%u0420%u203A%22%2C%22%u0420%u201D%22%2C%22%u0420%u2013%22%2C%22%u0420%AD%22%2C%22%u0420%u0407%22%2C%22%u0420%A7%22%2C%22%u0420%u040E%22%2C%22%u0420%u045A%22%2C%22%u0420%uFFFD%22%2C%22%u0420%u045E%22%2C%22%u0420%AC%22%2C%22%u0420%u2018%22%2C%22%u0420%AE%22%2C%22%u0420%u0403%22%2C%22%u0420%AD%22%2C%22%u0420%u2021%22%2C%22%u0420%u2020%22%2C%22%u0432%u2122%AB%22')+");");
    for (ir=0;ir<73;ir++){
		text=text.replace(new RegExp(utf[ir],'g'),rus[ir]);
	}
return text;
}

function utf2win(text){
var utf,rus;
  var utf_chrs="%22%u0420%u201A%22%2C%22%u0420%u0453%22%2C%22%u0432%u0402%u0459%22%2C%22%u0421%u201C%22%2C%22%u0432%u0402%u045B%22%2C%22%u0432%u0402%A6%22%2C%22%u0432%u0402%A0%22%2C%22%u0432%u0402%u040E%22%2C%22%u0432%u201A%AC%22%2C%22%u0432%u0402%B0%22%2C%22%u0420%u2030%22%2C%22%u0432%u0402%u2116%22%2C%22%u0420%u0409%22%2C%22%u0420%u040A%22%2C%22%u0420%u2039%22%2C%22%u0420%u040F%22%2C%22%u0421%u2019%22%2C%22%u0432%u0402%uFFFD%22%2C%22%u0432%u0402%u2122%22%2C%22%u0432%u0402%u045A%22%2C%22%u0432%u0402%u045C%22%2C%22%u0432%u0402%u045E%22%2C%22%u0432%u0402%u201C%22%2C%22%u0432%u0402%u201D%22%2C%22%u0432%u201E%u045E%22%2C%22%u0421%u2122%22%2C%22%u0432%u0402%u0454%22%2C%22%u0421%u0459%22%2C%22%u0421%u045A%22%2C%22%u0421%u203A%22%2C%22%u0421%u045F%22%2C%22%u0412%A0%22%2C%22%u0420%u040B%22%2C%22%u0421%u045B%22%2C%22%u0420%u20AC%22%2C%22%u0412%A4%22%2C%22%u0422%u0452%22%2C%22%u0412%A6%22%2C%22%u0412%A7%22%2C%22%u0420%u0403%22%2C%22%u0412%A9%22%2C%22%u0420%u201E%22%2C%22%u0412%AB%22%2C%22%u0412%AC%22%2C%22%u0412%AE%22%2C%22%u0420%u2021%22%2C%22%u0412%B0%22%2C%22%u0412%B1%22%2C%22%u0420%u2020%22%2C%22%u0421%u2013%22%2C%22%u0422%u2018%22%2C%22%u0412%B5%22%2C%22%u0412%B6%22%2C%22%u0412%B7%22%2C%22%u0421%u2018%22%2C%22%u0432%u201E%u2013%22%2C%22%u0421%u201D%22%2C%22%u0412%BB%22%2C%22%u0421%uFFFD%22%2C%22%u0420%u2026%22%2C%22%u0421%u2022%22%2C%22%u0421%u2014%22%2C%22%u0420%u0452%22%2C%22%u0420%u2018%22%2C%22%u0420%u2019%22%2C%22%u0420%u201C%22%2C%22%u0420%u201D%22%2C%22%u0420%u2022%22%2C%22%u0420%u2013%22%2C%22%u0420%u2014%22%2C%22%u0420%uFFFD%22%2C%22%u0420%u2122%22%2C%22%u0420%u0459%22%2C%22%u0420%u203A%22%2C%22%u0420%u045A%22%2C%22%u0420%u045C%22%2C%22%u0420%u045B%22%2C%22%u0420%u045F%22%2C%22%u0420%A0%22%2C%22%u0420%u040E%22%2C%22%u0420%u045E%22%2C%22%u0420%u0408%22%2C%22%u0420%A4%22%2C%22%u0420%u0490%22%2C%22%u0420%A6%22%2C%22%u0420%A7%22%2C%22%u0420%u0401%22%2C%22%u0420%A9%22%2C%22%u0420%u0404%22%2C%22%u0420%AB%22%2C%22%u0420%AC%22%2C%22%u0420%AD%22%2C%22%u0420%AE%22%2C%22%u0420%u0407%22%2C%22%u0420%B0%22%2C%22%u0420%B1%22%2C%22%u0420%u0406%22%2C%22%u0420%u0456%22%2C%22%u0420%u0491%22%2C%22%u0420%B5%22%2C%22%u0420%B6%22%2C%22%u0420%B7%22%2C%22%u0420%u0451%22%2C%22%u0420%u2116%22%2C%22%u0420%u0454%22%2C%22%u0420%BB%22%2C%22%u0420%u0458%22%2C%22%u0420%u0405%22%2C%22%u0420%u0455%22%2C%22%u0420%u0457%22%2C%22%u0421%u0402%22%2C%22%u0421%u0403%22%2C%22%u0421%u201A%22%2C%22%u0421%u0453%22%2C%22%u0421%u201E%22%2C%22%u0421%u2026%22%2C%22%u0421%u2020%22%2C%22%u0421%u2021%22%2C%22%u0421%u20AC%22%2C%22%u0421%u2030%22%2C%22%u0421%u0409%22%2C%22%u0421%u2039%22%2C%22%u0421%u040A%22%2C%22%u0421%u040C%22%2C%22%u0421%u040B%22%2C%22%u0421%u040F%22%2C%22%u0432%u2122%AB%22";
  var win_chrs="%22%u0402%22%2C%22%u0403%22%2C%22%u201A%22%2C%22%u0453%22%2C%22%u201E%22%2C%22%u2026%22%2C%22%u2020%22%2C%22%u2021%22%2C%22%u20AC%22%2C%22%u2030%22%2C%22%u0409%22%2C%22%u2039%22%2C%22%u040A%22%2C%22%u040C%22%2C%22%u040B%22%2C%22%u040F%22%2C%22%u0452%22%2C%22%u2018%22%2C%22%u2019%22%2C%22%u201C%22%2C%22%u201D%22%2C%22%u2022%22%2C%22%u2013%22%2C%22%u2014%22%2C%22%u2122%22%2C%22%u0459%22%2C%22%u203A%22%2C%22%u045A%22%2C%22%u045C%22%2C%22%u045B%22%2C%22%u045F%22%2C%22%A0%22%2C%22%u040E%22%2C%22%u045E%22%2C%22%u0408%22%2C%22%A4%22%2C%22%u0490%22%2C%22%A6%22%2C%22%A7%22%2C%22%u0401%22%2C%22%A9%22%2C%22%u0404%22%2C%22%AB%22%2C%22%AC%22%2C%22%AE%22%2C%22%u0407%22%2C%22%B0%22%2C%22%B1%22%2C%22%u0406%22%2C%22%u0456%22%2C%22%u0491%22%2C%22%B5%22%2C%22%B6%22%2C%22%B7%22%2C%22%u0451%22%2C%22%u2116%22%2C%22%u0454%22%2C%22%BB%22%2C%22%u0458%22%2C%22%u0405%22%2C%22%u0455%22%2C%22%u0457%22%2C%22%u0410%22%2C%22%u0411%22%2C%22%u0412%22%2C%22%u0413%22%2C%22%u0414%22%2C%22%u0415%22%2C%22%u0416%22%2C%22%u0417%22%2C%22%u0418%22%2C%22%u0419%22%2C%22%u041A%22%2C%22%u041B%22%2C%22%u041C%22%2C%22%u041D%22%2C%22%u041E%22%2C%22%u041F%22%2C%22%u0420%22%2C%22%u0421%22%2C%22%u0422%22%2C%22%u0423%22%2C%22%u0424%22%2C%22%u0425%22%2C%22%u0426%22%2C%22%u0427%22%2C%22%u0428%22%2C%22%u0429%22%2C%22%u042A%22%2C%22%u042B%22%2C%22%u042C%22%2C%22%u042D%22%2C%22%u042E%22%2C%22%u042F%22%2C%22%u0430%22%2C%22%u0431%22%2C%22%u0432%22%2C%22%u0433%22%2C%22%u0434%22%2C%22%u0435%22%2C%22%u0436%22%2C%22%u0437%22%2C%22%u0438%22%2C%22%u0439%22%2C%22%u043A%22%2C%22%u043B%22%2C%22%u043C%22%2C%22%u043D%22%2C%22%u043E%22%2C%22%u043F%22%2C%22%u0440%22%2C%22%u0441%22%2C%22%u0442%22%2C%22%u0443%22%2C%22%u0444%22%2C%22%u0445%22%2C%22%u0446%22%2C%22%u0447%22%2C%22%u0448%22%2C%22%u0449%22%2C%22%u044A%22%2C%22%u044B%22%2C%22%u044C%22%2C%22%u044D%22%2C%22%u044E%22%2C%22%u044F%22%2C%22%u266B%22";
  eval("rus=Array("+unescape(win_chrs)+");");
  eval("utf=Array("+unescape(utf_chrs)+");");
    for (var i=0;i<rus.length;i++){
		text=text.replace(new RegExp(utf[i],'g'),rus[i]);
	  }
  return text;
}

function print_r( array, return_val ) {
    var output = "", pad_char = " ", pad_val = 4;

    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if(cur_depth > 0)
            cur_depth++;

        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";

        if(obj instanceof Array || obj instanceof Object) {
            str += "Array\n" + base_pad + "(\n";
            for(var key in obj) {
                if(obj[key] instanceof Array || obj[key] instanceof Object) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else {
            str = obj.toString();
        };

        return str;
    };

    var repeat_char = function (len, char) {
        var str = "";
        for(var i=0; i < len; i++) { str += char; };
        return str;
    };

    output = formatArray(array, 0, pad_val, pad_char);
        return output;
}
