// ==UserScript==
// @name           JVForum_Plus!
// @namespace      
// @description    Ajoute du BBCode et affiche les videos YouTube et Dailymotion dans les forums de jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function jv_com_YoutubeBBcodeVideoHtml(link) {
  return '<object><embed src="http://www.youtube.com/v/'+link+'&hl=fr&fs=1&rel=0&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';
}

function jv_com_HDYoutubeBBcodeVideoHtml(link) {
  return '<object><embed src="http://www.youtube.com/v/'+link+'&ap=%2526fmt%3D18&hl=fr&fs=1&rel=0&" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></embed></object>';
}

function jv_com_DailymotionBBcodeVideoHtml(link) {
  return '<object><embed src="http://www.dailymotion.com/swf/'+link+'&colors=background:47C7E6;glow:8EB6ED;foreground:212121;&related=0" type="application/x-shockwave-flash" width="420" height="226" allowFullScreen="true" allowScriptAccess="always"></embed></object>';
}

function jv_com_BIGDailymotionBBcodeVideoHtml(link) {
  return '<object><embed src="http://www.dailymotion.com/swf/'+link+'&colors=background:47C7E6;glow:8EB6ED;foreground:212121;&related=0" type="application/x-shockwave-flash" width="520" height="368" allowFullScreen="true" allowScriptAccess="always"></embed></object>';
}

function jv_com_BBcodeStrong(link) {
  return '<div style="font-weight: bold;">'+link+'</div>';
}

function jv_com_BBcodeItalic(link) {
  return '<div style="font-style: italic;">'+link+'</div>';
}

function jv_com_BBcodeSoulign(link) {
  return '<div style="text-decoration: underline;">'+link+'</div>';
}

function jv_com_BBcodeBlue(link) {
  return '<div style="color: blue;">'+link+'</div>';
}

function jv_com_BBcodeRed(link) {
  return '<div style="color: red;">'+link+'</div>';
}

function jv_com_BBcodeGreen(link) {
  return '<div style="color: green;">'+link+'</div>';
}

function jv_com_BBcodeQuote(link) {
  return '<p style="background-color: #80B2F7; color: #0A77B8; font-weight: bold;"> Citation: <br /></p><div style="background-color: #80B2F7; color: #141414;">'+link+'</div>';
}



function spoil(cont, num) {
  return '<a style="cursor: pointer;" onclick="document.getElementById(\'hello'+num+'\').style.display=(document.getElementById(\'hello'+num+'\').style.display==\'none\')? \'block\' : \'none\';" >Afficher/Cacher le Spoiler</a><div style="display:none;border-style: solid; border-width: thin; background-color: white" id="hello'+num+'">'+cont+'</div>';
}

function jvc_fontColor(color, link) {
  return '<div style="color: '+color+';">'+link+'</div>';
}




function noelshackimg(link) {
  return '<style>.image1 {width:px;height:px;}</style><div id="image1"><img src="http://www.noelshack.com/uploads/'+link+'"</div>';
}


function tinypicimg(link) {
  return '<style>.image2 {width:px;height:px;}</style><div id="image2"><img src="http://i36.tinypic.com/'+link+'"</div>';
}



function blink(link) {
  return '<div style="text-decoration:blink;">'+link+'</div>';
}

function backcolor(link) {
  return '<span style="background-color:black; color:#93BEEA;">'+link+'</span>';
}

function smiley(link) {
  return '<style>.image3 {width:px;height:px;}</style><div id="image3"><img src="http://image.jeuxvideo.com/smileys/'+link+'"</div>';
}


function jv_com_replaceBBcode() {
  if( document.getElementById('col1') ) {
    var lis = document.getElementById('col1').getElementsByTagName("li");
    var c   = lis.length;
    for(var u=0; u<c; u++) {
      if(lis[u]) {
        if( lis[u].className == 'post') {
          lis[u].innerHTML = (lis[u].innerHTML).replace(/\[video\](.+)\[\/video\]/g, jv_com_YoutubeBBcodeVideoHtml('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[yt\](.+)\[\/yt\]/g, jv_com_YoutubeBBcodeVideoHtml('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[hd\](.+)\[\/hd\]/g, jv_com_HDYoutubeBBcodeVideoHtml('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[daily\](.+)\[\/daily\]/g, jv_com_DailymotionBBcodeVideoHtml('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[DAILY\](.+)\[\/DAILY\]/g, jv_com_BIGDailymotionBBcodeVideoHtml('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[b\](.+)\[\/b\]/g, jv_com_BBcodeStrong('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[i\](.+)\[\/i\]/g, jv_com_BBcodeItalic('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[u\](.+)\[\/u\]/g, jv_com_BBcodeSoulign('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[blue\](.+)\[\/blue\]/g, jv_com_BBcodeBlue('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[green\](.+)\[\/green\]/g, jv_com_BBcodeGreen('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[red\](.+)\[\/red\]/g, jv_com_BBcodeRed('$1'));
  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[quote\](.+)\[\/quote\]/g, jv_com_BBcodeQuote('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[s\](.+)\[\/s\]/g, spoil('$1'.toString(), u));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[font color="?(.+)"?\](.+)\[\/font\]/g, jvc_fontColor('$1'.toString(), '$2'.toString()));

		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[ns\](.+)\[\/ns\]/g, noelshackimg('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[tp\](.+)\[\/tp\]/g, tinypicimg('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[bk\](.+)\[\/bk\]/g, blink('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[bc\](.+)\[\/bc\]/g, backcolor('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[sl\](.+)\[\/sl\]/g, smiley('$1'));



        }
      }
    }
  }
}
jv_com_replaceBBcode();