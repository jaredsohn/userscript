

// ==UserScript==
// @name vkclose
// @description просмотр закрытых страниц Vkontakte
// @include       *vkontakte.ru*
// @include       *vkadre.ru*
// @include       *vk.com*
// ==/UserScript==
//
// (c) All Rights Reserved. VkOpt.
//
function vkClosed(m) {
if (m==1) {	pageMenu='';
//blackList
pageMenu +='<a href=# onClick="javascript:vkClosed();">- '+IDL("vkLinks")+'</a>';
return pageMenu;
} else if (location.href.split('/fave.')[1]) { if (getSet(35)=='y') {
var names=getElementsByClass('name');
 for (i=0; i<names.length; i++) names[i].innerHTML=
  names[i].innerHTML+'<br>[ <a href="mail.php?act=write&to='+names[i].getElementsByTagName('a')[0].href.split('id')[1]+'" target="_blank"> @ </a>'+
  ' <a href="javascript:vkFave('+names[i].getElementsByTagName('a')[0].href.split('id')[1]+',0);"> X </a> ]';
}if (getSet(40)=='y') vkFaved();
} else if (getSet(34)=='y') {
if (location.href.split('/search.php?id=')[1]) {
var id=location.href.split('/search.php?id=')[1];
if (id.split('&')[1]) id=id.split('&')[0];
temp=
'<tr><td colspan="4"><div align="center">[ '+
'<a href="photos.php?act=user&id='+id+'">'+IDL("clPhW")+'</a> | '+
'<a href="video.php?act=tagview&id='+id+'">'+IDL("clViW")+'</a> | '+
'<a href="photos.php?id='+id+'">'+IDL("clPh")+'</a> | '+
'<a href="video.php?id='+id+'">'+IDL("clVi")+'</a> | '+
'<a href="questions.php?mid='+id+'">'+IDL("clQu")+'</a> ]<br>'+
'[ <a href="apps.php?mid='+id+'">'+IDL("clAp")+'</a> | '+
'<a href="events.php?id='+id+'">'+IDL("clEv")+'</a> | '+
'<a href="notes.php?id='+id+'">'+IDL("clNo")+'</a> | '+
'<a href="gifts.php?id='+id+'">'+IDL("clGi")+'</a> | '+
'<a href="rate.php?act=vote&id='+id+'">'+IDL("clRa")+'</a> | '+
'<a href="javascript:IDpostMatch('+id+',1);">'+IDL("clMa")+'</a> | '+
'<a href="javascript:vkFave('+id+');">'+IDL("clFav")+'</a> ]<br>';
//if (getSet(32)=='y') temp+= '[ <a id="adm'+id+'" href="admin.php?act=report&id='+id+'">please_wait</a> ]';
temp+='</div></td></tr>';
document.getElementById('searchResults').getElementsByTagName('table')[0].innerHTML+=temp;
//if (getSet(32)=='y') document.getElementById('adm'+id).outerHTML=testReport(id);
}

else if (location.href.split('/search.')[1]) {
var i=0;
table=document.getElementById('searchResults').getElementsByTagName('table');
while(table[i]) {
id='';
if (table[i].getElementsByTagName('div')[table[i].getElementsByTagName('div').length-1].id.split('fBox')[1])
  id=table[i].getElementsByTagName('div')[table[i].getElementsByTagName('div').length-1].id.split('fBox')[1];
else if (table[i].getElementsByTagName('a')[0].href.split('id=')[1])
  id=table[i].getElementsByTagName('a')[0].href.split('id=')[1];
else if (table[i].getElementsByTagName('ul')[0].getElementsByTagName('a')[0].href.split('to=')[1])
  id=table[i].getElementsByTagName('ul')[0].getElementsByTagName('a')[0].href.split('to=')[1];
temp=
'<tr><td colspan="4"><div align="center">[ '+
'<a href="photos.php?act=user&id='+id+'">'+IDL("clPhW")+'</a> | '+
'<a href="video.php?act=tagview&id='+id+'">'+IDL("clViW")+'</a> | '+
'<a href="photos.php?id='+id+'">'+IDL("clPh")+'</a> | '+
'<a href="video.php?id='+id+'">'+IDL("clVi")+'</a> | '+
'<a href="app545941_'+id+'">'+IDL("clAu")+'</a> | '+   // audio.php?id=
'<a href="groups.php?id='+id+'">'+IDL("clGr")+'</a> | '+
'<a href="questions.php?mid='+id+'">'+IDL("clQu")+'</a> ]<br>'+
'[ <a href="apps.php?mid='+id+'">'+IDL("clAp")+'</a> | '+
'<a href="events.php?id='+id+'">'+IDL("clEv")+'</a> | '+
'<a href="notes.php?id='+id+'">'+IDL("clNo")+'</a> | '+
'<a href="wall.php?id='+id+'">'+IDL("clWa")+'</a> | '+
'<a href="gifts.php?id='+id+'">'+IDL("clGi")+'</a> | '+
'<a href="rate.php?act=vote&id='+id+'">'+IDL("clRa")+'</a> | '+
'<a href="javascript:IDpostMatch('+id+',1);">'+IDL("clMa")+'</a> | '+
'<a href="javascript:vkFave('+id+');">'+IDL("clFav")+'</a> ]<br>';
//if (getSet(32)=='y') temp+= '[ <a id="adm'+id+'" href="admin.php?act=report&id='+id+'">please_wait</a> ]';
temp+='</div></td></tr>';
table[i].innerHTML+=temp;
i++;
}
}

else if (location.href.split('/friend.')[1]) {
{
var i=0;
table=document.getElementById('friendsCont').getElementsByTagName('table');
while(table[i]) {
if (table[i].getElementsByTagName('div')[1].id.split('info')[1]) {
  id=table[i].getElementsByTagName('div')[1].id.split('info')[1];
// <div id="fBox6425951"></div>
temp=
'<tr><td colspan="4"><div align="center">[ '+
'<a href="photos.php?act=user&id='+id+'">'+IDL("clPhW")+'</a> | '+
'<a href="video.php?act=tagview&id='+id+'">'+IDL("clViW")+'</a> | '+
'<a href="photos.php?id='+id+'">'+IDL("clPh")+'</a> | '+
'<a href="video.php?id='+id+'">'+IDL("clVi")+'</a> | '+
'<a href="app545941_'+id+'">'+IDL("clAu")+'</a> | '+
'<a href="groups.php?id='+id+'">'+IDL("clGr")+'</a> | '+
'<a href="questions.php?mid='+id+'">'+IDL("clQu")+'</a> ]<br>'+
'[ <a href="apps.php?mid='+id+'">'+IDL("clAp")+'</a> | '+
'<a href="events.php?id='+id+'">'+IDL("clEv")+'</a> | '+
'<a href="notes.php?id='+id+'">'+IDL("clNo")+'</a> | '+
'<a href="wall.php?id='+id+'">'+IDL("clWa")+'</a> | '+
'<a href="gifts.php?id='+id+'">'+IDL("clGi")+'</a> | '+
'<a href="rate.php?act=vote&id='+id+'">'+IDL("clRa")+'</a> | '+
'<a href="javascript:IDpostMatch('+id+',1);">'+IDL("clMa")+'</a> | '+
'<a href="javascript:vkFave('+id+');">'+IDL("clFav")+'</a> ]<br>';
temp+='</div></td></tr>';
table[i].innerHTML+=temp;
}
else if (table[i].getElementsByTagName('div')[1].getElementsByTagName('a')[0].href.split('id=')[1]) {
  id=table[i].getElementsByTagName('div')[1].getElementsByTagName('a')[0].href.split('id=')[1]
temp=
'<tr><td colspan="4"><div align="center">[ '+
'<a href="photos.php?act=user&id='+id+'">'+IDL("clPhW")+'</a> | '+
'<a href="video.php?act=tagview&id='+id+'">'+IDL("clViW")+'</a> | '+
'<a href="photos.php?id='+id+'">'+IDL("clPh")+'</a> | '+
'<a href="video.php?id='+id+'">'+IDL("clVi")+'</a> | '+
'<a href="app545941_'+id+'">'+IDL("clAu")+'</a> | '+
'<a href="groups.php?id='+id+'">'+IDL("clGr")+'</a> | '+
'<a href="questions.php?mid='+id+'">'+IDL("clQu")+'</a> ]<br>'+
'[ <a href="apps.php?mid='+id+'">'+IDL("clAp")+'</a> | '+
'<a href="events.php?id='+id+'">'+IDL("clEv")+'</a> | '+
'<a href="notes.php?id='+id+'">'+IDL("clNo")+'</a> | '+
'<a href="wall.php?id='+id+'">'+IDL("clWa")+'</a> | '+
'<a href="gifts.php?id='+id+'">'+IDL("clGi")+'</a> | '+
'<a href="rate.php?act=vote&id='+id+'">'+IDL("clRa")+'</a> | '+
'<a href="javascript:IDpostMatch('+id+',1);">'+IDL("clMa")+'</a> | '+
'<a href="javascript:vkFave('+id+');">'+IDL("clFav")+'</a> ]<br>';
temp+='</div></td></tr>';
table[i].innerHTML+=temp;
}
i++;
}
}
}
else if (location.href.match('/id') || location.href.match('/profile.')){
 if (document.getElementById('userProfile').innerText.match(IDL('deleteduser')) || !document.getElementById('mid')
      || (getElementsByClass('alertmsg')[0] && getElementsByClass('alertmsg')[0].innerHTML.match('addToFriends'))
      || (getElementsByClass('alertmsg')[0] && getElementsByClass('alertmsg')[0].innerHTML.match(decodeURI('%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B8%D0%BB'))))
	{
id=location.href.split('/id')[1] || location.href.split('id=')[1];
if (id.split('&')[1]) id=id.split('&')[0];
if (id.split('?')[1]) id=id.split('?')[0];
temp=
'<div align="center">[ '+
'<a href="photos.php?act=user&id='+id+'">'+IDL("clPhW")+'</a> | '+
'<a href="video.php?act=tagview&id='+id+'">'+IDL("clViW")+'</a> | '+
'<a href="photos.php?id='+id+'">'+IDL("clPh")+'</a> | '+
'<a href="video.php?id='+id+'">'+IDL("clVi")+'</a> ]<br> '+
'[ <a href="app545941_'+id+'">'+IDL("clAu")+'</a> | '+
'<a href="groups.php?id='+id+'">'+IDL("clGr")+'</a> | '+
'<a href="questions.php?mid='+id+'">'+IDL("clQu")+'</a> | '+
'<a href="apps.php?mid='+id+'">'+IDL("clAp")+'</a>  ]<br> '+
'[ <a href="events.php?id='+id+'">'+IDL("clEv")+'</a> | '+
'<a href="notes.php?id='+id+'">'+IDL("clNo")+'</a> | '+
'<a href="wall.php?id='+id+'">'+IDL("clWa")+'</a> | '+
'<a href="gifts.php?id='+id+'">'+IDL("clGi")+'</a> ]<br> '+
'[ <a href="rate.php?act=vote&id='+id+'">'+IDL("clRa")+'</a> | '+
'<a href="javascript:IDpostMatch('+id+',1);">'+IDL("clMa")+'</a> | '+
'<a href="javascript:vkFave('+id+');">'+IDL("clFav")+'</a> ]<br>';
temp+='</div>';
document.getElementById('userProfile').innerHTML+=temp;}}
}}

function vkFaved(x) {
fav_ava_style="height: 50px; display: inline-block; overflow: hidden;";
    if (!x) {
        s = document.createElement('script');
        s.id = 'temp';
        s.src = "http://userapi.com/data?act=faved&from=0&to=10000&sid=" + vkgetCookie('remixsid') + "&back=faved=eval";
        s.onload = 'vkFaved(1)';
        document.getElementsByTagName('body')[0].appendChild(s);
    } else {
        favedn = faved.n;
        var to = 5;
        f1 = new Array();
        f2 = new Array();
        f1l = 0;
        f2l = 0;
        for (i = 0; i < favedn; i++) {
            if (faved.d[i][3] == 1) {
                f1[f1l] = faved.d[i];
                f1l++;
            } else if (faved.d[i][3] == 0) {
                f2[f2l] = faved.d[i];
                f2l++;
            } else alert('o_O figase..');
        };
        if (f1.length + f2.length != favedn) alert('O_o figase...'); //online
        whofaved = '<div class="flexOpen" id="Information2"><div class="bOpen"><div class="flexHeader clearFix"><div><h2>' + IDL('whofavedonline') + ' [ ' + f1.length + ' ]</h2></div></div></div><div class="c"><div class="flexBox clearFix"><table height="100%" cellspacing="0" class="people_table"><tbody>';
        for (i = 0; i < f1.length; i++) {
            favedid = f1[i][0];
            favedfname = f1[i][1].split(' ')[0];
            favedsname = f1[i][1].split(' ')[1];
            favedava = (f1[i][2] != '0') ? f1[i][2] : 'http://vkontakte.ru/images/question_c.gif';
            favedon = f1[i][3];
            whofaved += ((i == 0 || i % to == 0) ? '<tr>' : '') + '<td align=center><br><table height="100%" width=65px style="overflow: hidden;"><tbody><tr><td height="100%" class="image"><div align=center><a href="/id' + favedid + '"><div style="'+fav_ava_style+'"><img width="50px" alt="" src="' + favedava + '"/></div></a></div></td></tr>' + '<tr><td><a href="/id' + favedid + '">' + favedfname + '<br><small>' + favedsname + '</small></a></td></tr></tbody></table></td>' + ((i > 0 && (i + 1) % to == 0) ? '</tr>' : '');
        }
        whofaved += '</tbody></table></div></div></div>';
        ge('leftColumn').innerHTML += '<br>' + whofaved; //offline
        whofaved = '<div class="flexOpen" id="Information3"><div class="bOpen"><div class="flexHeader clearFix"><div><h2>' + IDL('whofavedofline') + ' [ ' + f2.length + ' ]</h2></div></div></div><div class="c"><div class="flexBox clearFix"><table height="100%" cellspacing="0" class="people_table"><tbody>';
        for (i = 0; i < f2.length; i++) {
            favedid = f2[i][0];
            favedfname = f2[i][1].split(' ')[0];
            favedsname = f2[i][1].split(' ')[1];
            favedava = f2[i][2];
            favedava = (favedava.length < 3) ? '/images/question_c.gif' : favedava;
            favedon = f2[i][3];
            whofaved += ((i == 0 || i % to == 0) ? '<tr>' : '') + '<td align=center><br><table height="100%" width=65px style="overflow: hidden;"><tbody><tr><td height="100%" class="image"><div align=center><a href="/id' + favedid + '"><div style="'+fav_ava_style+'"><img width="50px" alt="" src="' + favedava + '"/></div></a></div></td></tr>' + '<tr><td><a href="/id' + favedid + '">' + favedfname + '<br><small>' + favedsname + '</small></a></td></tr></tbody></table></td>' + ((i > 0 && (i + 1) % to == 0) ? '</tr>' : '');
        }
        whofaved += '</tbody></table></div></div></div>';
        ge('leftColumn').innerHTML += '<br>' + whofaved;
    }
    onChangeContent();
}

function vkFave(id,add) {if (id=='list') {
for (i=0; td=document.getElementById('leftColumn').getElementsByTagName('td')[i]; i++) {
if (td.className=='name') td.innerHTML+='<br><a href="javascript:vkFave('+td.getElementsByTagName('a')[0].href.split('id')[1]+',0);">[ delFav ]</a>';
}}else if (id=='faveres') {if (faveres.ok==1) alert(faveres.id+' added');
else if (faveres.ok==0) alert(faveres.id+' deleted');}
else if (id) {
if (!add||add==1) temp='add_fave';if (add==0) temp='del_fave';
s=document.createElement('script');s.id='tempfav';s.src="http://userapi.com/data?act="+temp+"&id="+id+"&sid="+vkgetCookie('remixsid')+"&back=faveres=eval";s.onload='vkFave("faveres")';
document.getElementsByTagName('body')[0].appendChild(s);}}

function IDpostMatch(id,dec) {
var http_request = false;http_request = new XMLHttpRequest();if (http_request.overrideMimeType)
{       }if (!http_request) {alert('XMLHTTPError'); return false;return http_request;}
http_request.open("POST", "/matches.php", false);
http_request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
http_request.setRequestHeader("Content-Transfer-Encoding", "binary");
http_request.send('act=a_sent&to_id='+id+'&dec='+dec);
http_request.onDone = alert(http_request.responseText);
}

function testReport(id) {
var http_request = false;
http_request = new XMLHttpRequest();
if (http_request.overrideMimeType)
{       }
if (!http_request) {alert('XMLHTTPError'); return false;return http_request;}
http_request.open("GET", "/id"+id, false);
http_request.send("");
response=http_request.responseText;
if (response.match('profileActions')) {
var btn=response.split('id="profileActions"')[1].split('percent')[0].replace(/<\/a>/gi,'</a>').split('</a>').reverse()[1];
if (btn.match('admin.php')) return btn.replace(/<\/div>/gi,'')+'</a>';
else return 'no_report';
}
else return '<a href="admin.php?act=report&id='+id+'">closed_page</a>';
}
