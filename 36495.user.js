// ==UserScript==
// @name           No_JVForum_Plus!
// @namespace      
// @description    Retire les balises de JVForum_Plus!
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function jv_com_YoutubeBBcodeVideoHtml(link) {
  return '<div>http://fr.youtube.com/watch?v='+link+'></div>';
}

function jv_com_HDYoutubeBBcodeVideoHtml(link) {
  return '<div>http://fr.youtube.com/watch?v='+link+'&fmt=18></div>';
}

function jv_com_DailymotionBBcodeVideoHtml(link) {
  return '<div>http://www.dailymotion.com/video/'+link+'</div>';
}

function jv_com_BIGDailymotionBBcodeVideoHtml(link) {
  return '<div>http://www.dailymotion.com/video/'+link+'</div>';
}

function jv_com_BBcodeStrong(link) {
  return '<div>'+link+'</div>';
}

function jv_com_BBcodeItalic(link) {
  return '<div>'+link+'</div>';
}

function jv_com_BBcodeSoulign(link) {
  return '<div>'+link+'</div>';
}

function jv_com_BBcodeBlue(link) {
  return '<div>'+link+'</div>';
}

function jv_com_BBcodeRed(link) {
  return '<div>'+link+'</div>';
}

function jv_com_BBcodeGreen(link) {
  return '<div>'+link+'</div>';
}

function jv_com_BBcodeQuote(link) {
  return '<div>'+link+'</div>';
}

function spoil(cont, num) {
  return '<div>spoiler disabled</div>';
}

function jvc_fontColor(color, link) {
  return '<div>'+link+'</div>';
}

function jv_com_replaceBBcode() {
  if( document.getElementById('col1') ) {
    var lis = document.getElementById('col1').getElementsByTagName("li");
    var c   = lis.length;
    for(var u=0; u<c; u++) {
      if(lis[u]) {
        if( lis[u].className == 'post') {
          lis[u].innerHTML = (lis[u].innerHTML).replace(/\[video\](.+)\[\/video\]/g, jv_com_YoutubeBBcodeVideoHtml('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[youtube\](.+)\[\/youtube\]/g, jv_com_YoutubeBBcodeVideoHtml('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[hd\](.+)\[\/hd\]/g, jv_com_HDYoutubeBBcodeVideoHtml('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[daily\](.+)\[\/daily\]/g, jv_com_DailymotionBBcodeVideoHtml('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[DAILY\](.+)\[\/DAILY\]/g, jv_com_BIGDailymotionBBcodeVideoHtml('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[b\](.+)\[\/b\]/g, jv_com_BBcodeStrong('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[i\](.+)\[\/i\]/g, jv_com_BBcodeItalic('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[u\](.+)\[\/u\]/g, jv_com_BBcodeSoulign('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[blue\](.+)\[\/blue\]/g, jv_com_BBcodeBlue('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[red\](.+)\[\/red\]/g, jv_com_BBcodeRed('$1'));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[green\](.+)\[\/green\]/g, jv_com_BBcodeGreen('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[quote\](.+)\[\/quote\]/g, jv_com_BBcodeQuote('$1'));
		  
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[spoiler\](.+)\[\/spoiler\]/g, spoil('$1'.toString(), u));
		  lis[u].innerHTML = (lis[u].innerHTML).replace(/\[font color="?(.+)"?\](.+)\[\/font\]/g, jvc_fontColor('$1'.toString(), '$2'.toString()));
        }
      }
    }
  }
}
jv_com_replaceBBcode();