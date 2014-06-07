/*
	Wenn du das Script istallieren wolltest, aber nun dashier siehst
	fehlt dir wahrscheinlich das richtige Add-on!
	Im Firefox siehst du hierdrüber eine Meldung, inder du das Script istallierst.
*/

// ==UserScript==
// @name	Jappy V3
// @description	fuer alle die die neue Version Jappy V4 nicht moegen
// @author	PaulOffTheWall
// @include	http://www.jappy.*
// @version	4.0
// ==/UserScript==

//ohne externe Scripte (Ausnahme:jq.js)
//last update: 08.01.2012

function addscript(src,text){
var head=document.getElementsByTagName('head')[0] || document.documentElement,
as=document.createElement('script');as.type='text/javascript';
if(text!=""){as.innerHTML=text;}
else{as.src='//testsever.pytalhost.de/'+src}
head.insertBefore(as, head.firstChild);
}addscript('jq.js','');

// JS-Teil - Veränderungen des Seiteninhaltes

jpyV3='letsgo=(function(){'+
'$(\'#fo .mid a:first\').after(\'<a href="/com/648687/presentation" class="fade">+ JappyV3 + features v4.0 by -We_aRe-oNe-</a>\');'+
'if(typeof User!=\'undefined\'){username=User.nickname;lh=location.href.split(\'/\');'+
'cnew=(function(tab,id){e=$(\'#nv\'+tab+\' .newEntries\').text();if(e!=""){return \'<span id="\'+id+\'" class="newEntries">\'+e+\'</span>\';}else{return e;}});'+
'$(\'.logo a\').html(\'<div style="float:right;margin:40px 0;width:16px;height:16px;overflow:hidden;" id="nvOverview">\'+cnew(\'Overview\')+\'</div>\');'+
'$(\'#contactsOnline\').before(\'<div class="friendsOnline"><div id="rtasks"><a href="/mailbox" id="nvMailbox">\'+cnew(\'Mailbox\',\'nvMailboxCounter\')+\'Meine Mailbox</a><a href="/user/\'+username+\'/guestbook" id="nvGuestbook">\'+cnew(\'Guestbook\')+\'Mein Gästebuch</a><a href="#" onclick="new MessageStream().compose(null);return false">Mail verfassen</a><a href="/myjappy/bookmarks">Favoriten</a></div>\'+'+
'\'<br><div style="margin-left:32px;"><a href="/friends" style="color:#333">Freunde online</a> <font style="color:#cccccc">(<span id="onlinezahl">0</span>)</font></div></div>\').css("margin-left","-178px");'+
'$(\'.tabs\').html(\'\');$(\'.tabs\').before(\'<div class="tabs2"><a href="/" class="add t0">Übersicht</a><a href="/user/\'+username+\'" class="add t1">Profil</a><a href="/search" class="add t2">Suche</a><a href="/friends" class="add t3">Kontakte</a><a href="/infos/navigationAll" id="nvAddTab" class="add" onclick="HeadNavigation.tabs.addTab();return false"><span class="icMenueHide" style="display:none">&nbsp;</span>Mehr</a></div>\');'+
'$(\'#he .search\').before(\'<div style="float:right;padding:9px"><a href="/password?logout=1&h=\'+User.hash+\'"><span class="icLogout">&nbsp;</span></a></div>\');'+
'$(\'#nvStatus\').before(\'<a href="/settings" class="link"><span class="icEditPale">&nbsp;</span>Einstellungen</a>\');'+
'$(\'#nvCredits\').before(\'<a href="/myjappy/rank/" class="link"><span style="background:url(http://s1.jappy.tv/i/r/\'+User.rank+\'.gif) no-repeat;padding-left:18px;margin-left:7px">&nbsp;</span>Rang</a>\');'+
'$(\'#nvUsername a\')[0].href=\'/user/\'+User.nickname;$(\'#nvUsername\')[0].onclick=(function(){location.href=\'/user/\'+User.nickname});'+
'if(lh[3]==\'user\'){'+
'if($(\'#prWelcome\').text()!=""){'+
'p=\'/user/\'+lh[4];'+
'var prNs=\'\';prN=$(\'#prNavi a\');var t1=t2=t3=t4=\'\',t1i=t2i=t3i=t4i=\'Keine Info\';'+
'for(i=0;i<prN.length;i++){if(prN[i].className.indexOf(\'disabled\')<0){prNs+=prN[i].innerHTML;}}'+
'if(prNs.indexOf(\'Foto\')!=-1){t1=\'t1\';e=$(\'#prGalleryPreview .heading a\').text();if(e!=""){t1i=e.split(\'(\')[1].split(\')\')[0];}}'+
'if(prNs.indexOf(\'stebuch\')!=-1){t2=\'t2\'}'+
'if(prNs.indexOf(\'Flirt\')!=-1){t4=\'t4\';t4i=$(\'.right .infos dd a[href$="/flirten"]\').html().trim();}'+
'if($(\'.right .sites\').text()!=""){t3=\'t3\';t3i=$(\'.right a[href*="/ms/"]\')[0].title;if(t3i==""){t3i="-";}}if(t3i.length>19){t3i=t3i.substring(0,16)+\'...\';}'+
'$(\'#prWelcome\').after(\'<div id="prT"><div><a class="\'+t1+\'" href="\'+p+\'/gallery/0"><b>Fotos</b></a><a class="\'+t2+\'" href="\'+p+\'/gb"><b>Gästebuch</b></a><a class="\'+t3+\'" href="\'+p+\'/ms"><b>Meine Seite</b></a><a class="\'+t4+\'" href="\'+p+\'/flirten"><b>Flirten</b></a></div>\'+\'<div class="i"><span><p>\'+t1i+\'</p></span><span><p>\'+t2i+\'</p></span><span><p>\'+t3i+\'</p></span><span><p>\'+t4i+\'</p></span></div></div>\');'+
'}'+
'if($(\'#giftsMore a\').text()!=""){'+
'hisId=$(\'#giftsMore a\')[0].onclick.toString().split(\'(\')[2].split(\',\')[0];'+
'adress="/backend/gift/giftViewStartPage.php?action=preview&profileOwnerId="+hisId;'+
'callback=(function(d){d=d.data;gifs=\'\';for(i=d.length;i>-1;i--){gifN=\'\';if(d[i]){if(d[i].senderNickname){gifN=\'von \'+d[i].senderNickname;}gifs+=\'<div class="gsN"><img src="http://s1.jappy.tv/i/g/\'+d[i].icon+\'" alt="\'+gifN+\'" title="\'+gifN+\'"></div>\';}}$(\'#prGiftsList\').html(gifs);$(\'#giftsMore\').remove();});'+
'$.ajax({url:adress, type:"GET", dataType:\'json\', success:callback});	 '+
'}'+
'}'+
'$(\'#onlinezahl\').text($(\'#contactsOnline .plain\').length);'+
'}'+
'});'+
'function wait(){'+
'if(typeof jQuery==\'undefined\'){window.setTimeout(wait, 100);}'+
'else{letsgo();}'+
'}'+
'wait();';
addscript('',jpyV3);

// CSS-Teil - Veränderungen im Seitendesign

tab=4;l=location.href.split('/')[3];
if(l==""){tab=0}if(l=="user"){tab=1}if(l=="search"){tab=2}if(l=="friends"){tab=3}
GM_addStyle(".tabs2 a.t"+tab+"{color:black !important;font-weight:bold}"+
"body{background: #BCBCBB url(http://dl.dropbox.com/u/74062185/jpybguod7v.png) repeat-x;}.jpywide .double{width:819px;}"+
"#he{background:#efefef url(http://dl.dropbox.com/u/74062185/jyptopbgnrffx.png);width:1000px !important;margin-left:-2px}"+
".jpy{background:#EFEFEF;}#he,.jpy{border:1px solid #CFCFCF;border-width:0 1px;}.jpywide .double .right{width:190px !important}"+
".jpywide #he.frame, .jpywide .jpy{width:998px !important;}.jpywide #umg{width:180px !important;}.jpywide #umg .location,.jpywide #umg .realname{width:70px}"+
".site,#content{background:none}.friendsonline{background:white;margin-top:10px;padding:0 !important}"+
".jpywide .right .usersuggest .entry{width:180px !important}.usersuggest .entry .plain{width:auto}"+
"#pr,.wide,#usResults,#ga,#co,#bs,#alDateList,.mailboxStream,#pbCommentFrame,.stream,.msInfo{background:white}"+
"#he .top a.link{border:none !important}#content{min-height:800px}#fo{margin-top:0px;!important}#fo .center{width:955px;background:#F8F8F8;margin:0 1px 50px 0}"+
".search{margin:35px -35px 0 0}#nvUsername{margin-right:-140px}#nvUsername .more{display:none}"+
"#he .top a.link:hover{background:#EBEBEB !important}#he .top div.username{background:none !important;border:none !important}"+
"#sp .spadmr, #noBanner, .skyscraper, #ad8, #ad2Frame,#ad3,#ad10B{display:none;}#no{height:auto !important;padding:8px 0 0 0;}"+
".logo a{width:164px;height:60px;background:url(http://dl.dropbox.com/u/74062185/new.gif);display:block}"+
".logo img{display:none}#contactsonline .entry a.picture,#ad3B,#ad4{display:none}"+
".heframe{background:none;border:none}#contactsonline .entry a.plain{float:right;height:15px;width:140px}"+
"#contactsonline .entry{height:15px;overflow:hidden}#contactsonline .entry .status{width:24px;padding:0}"+
"#contactsOnline{margin-top:126px;}#rtasks{background:#3A8AC9;padding:5px 0}"+
"#rtasks a{color:#e7e7e7;display:block;padding:2px 0 2px 32px;}#rtasks a:hover{background:#3980be;color:#FFFFFF;}"+
".tabs{height:0px !important}.tabs2 a:hover{color:black;background:#E1E1E1}"+
".tabs2 a.add{display:block;float:left;color:#417BC4;text-decoration:none;padding:9px 13px 9px 10px;font-size:12px;border-right:1px solid #E7E7E7;border-bottom:1px solid #EFEFEF;}"+
".mailboxStream .content{background:none!important}.mailboxStream div.entry:hover{background:#FFFEE0}"+
"#contactsonline .newentries{background:url(http://dl.dropbox.com/u/74062185/icM7.gif) no-repeat;padding-left:17px;background-position:-1100px -50px;border:none;color:#FFFDC5 !important}"+
"#rtasks .newEntries{background:url(http://dl.dropbox.com/u/74062185/icM7.gif) no-repeat;border:none;padding-left:20px;margin-left:-20px;font-weight:bold}"+
"#nvGuestbook .newEntries{background-position:0 -100px;}#nvMailbox .newEntries{background-position:0 -50px;}"+
".addTab .switch{display:none}#nvAddTab.add{border:none}#nvAddTab.activated{background:#CCC;border:1px solid #BBB;border-left:1px solid #A3A3A3;color:#000}"+
"#prT a{background:url(http://dl.dropbox.com/u/74062185/bgG2.gif) repeat-x 0 -850px;}"+
"#prT a,#prT .i span{width:110px;height:28px;display:inline-block;text-align:center;margin-left:10px;border-radius:3px;color:#999;border:1px solid #CCCCCC}"+
"#prT .i span{border-top-width:0px;margin-top:-2px}#prT b,#prT p{margin-top:6px;display:block}"+
"#prT a.t1{background-position:0 -880px;color:#FFF;}#prT a.t2{background-position:0 -910px;color:#000;} "+
"#prT a.t4{background-position:0 -970px;color:#FFF;}#prT a.t3{background-position:0 -940px;color:#000;} #prT{padding:50px 10px}"+
"#prNavi a.inactive:hover{background:#D8D8D8 !important; border-color:#D8D8D8 !important;color:#333 !important}"+
"#fo .links{width:auto !important;}");
