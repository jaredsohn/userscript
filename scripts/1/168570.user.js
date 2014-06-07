// ==UserScript==
// @name            Kraski FM
// @version         1.1.0.3
// @domain          anon.fm
// @match           http://anon.fm/*
// @match           http://anon.fm:8000/*
// @domain          userscripts.org
// @match           http://userscripts.org/scripts/show/168570
// @icon            http://s3.amazonaws.com/uso_ss/icon/168570/thumb.png
// @downloadURL     http://userscripts.org/scripts/source/168570.user.js
// @homepage        http://userscripts.org/scripts/show/168570
// @description     Добавляет краски в вашу жизнь!
// ==/UserScript==

var kraskiFM = new function() {

var currentVersion = '1.1.0.3'; // CHANGE IT IN HEADER TOO!!!
var isUserScript = true;
var doc = null;
var isMainPageInitialized = false;
var isInfoPageInitialized = false;
var isPodcastsPageInitialized = false;
var kraskiPage = isUserScript ? 'news.html' : 'newdes.html';
var splashNow = "";
var splashDJ = "";
var title = ["Рефлексивное","Аутичное","Чистое","Дискретность мышления","Когнитивное",
    "Картавое", "На самом интересном месте", "Интровертное", "На семи семплах", "Рекурсивное",
    "Утренний израиль", "Поехавших людей", "DDoS", "Ночные гадости", "Кокаинум", "Омич", "Анонимус",
    "Упоротый школьник", "Школонимус", "Уже не торт", "Говно", "Хуита", "Чан", "Радио", "Веобу", "Патлота",
    "Пиздолизное", "Жополизное", "Неймфажеское", "Анонимус такой анонимный", "Хуесосное", "Джазфажное",
    "Электронное", "Тёпло-ламповое", "Брутально-бессердечное", "Популярное", "Как бы", "Шароварное",
    "Вячеславное", "Файтдапавное", "Проект любимого человека", "MPD", "Прыщеблядское", "Вендоблядское", "Радонеж",
    "Фейл", "Вин", "Уныние", "Чёткая волна", "Гей-кружок", "Быдло", "Ебаный стыд", "бубубубу", "Успешное",
    "Хуже пидараса", "Разрывное", "Деревня", "Кто ты", "Огни Большого Бваны", "Unspecified description",
    "Неуловимое", "Butthurt.fm", "Сарафанное", "Фимоз", "Аматорное", "Раковые шейки", "Тирачевское", "Понтовое",
    "Озабоченное", "Интерпрайз", "FreeBSD", "LOVE :*", "Настоящее", "Которое не хочется выключать",
    "Segmentation fault", "Сыктывкарская Правда. Мы доставляем", "Ночные гадости", "ВЫКЛЮЧИЛ"];
var sched = [];
var chatHistory = "|";
var newsHistory = [];
var kookaUniq = {};
var kookaPosts = [];
var noticeGetFlags = 0; // 1 - js, 2 - html
var notices = [
  "Здесь будут видны объявления, появляющиеся на главной странице радио. Вы сможете перейти на неё и увидеть подробности.",
  null
];
var options= {
  'themeIndex': 0,
  'playSounds': 0,
  'hiddenNotices': '',
  'highStream': 0
};
var theme;
var isLightTheme = false;
var logoImage;
var logoNames = [0,1,2,3,4,8,9,12,13,14,15,16,17,21,22,23,24,25,26,29,30];
var logoIndex;
var logoCanvas;
var preloadAudio = {};

var urlRegex=/\b((?:bitcoin:|callto:|skype:|magnet:|xmpp:|[a-z][a-z\-\.]{1,15}:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;

var safeJavaScriptRegex=/([\[\]\{\}\:\s,0-9]|"([^"\\]|\\.)*")*/;
var urlPrefixRegex=/bitcoin:|callto:|skype:|magnet:|xmpp:|[a-z][a-z\-\.]{1,15}:\/\//i;
var cp1251 = 
  "ЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—˜™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬-®Ї°±Ііґµ¶·ё№є»јЅѕї" +
  "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя";
var cp1252 = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";

var shiftJis = [
  // firstByte, secondByteFrom, secondByteTo, unicode
  [0, 161, 223, 65377], // ｡｢｣､･ｦ..ﾝﾞﾟ
  [129, 65, 126, "、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×"],
  [130, 79, 88, 65296], // ０..９
  [130, 96, 121, 65313], // Ａ..Ｚ
  [130, 129, 154, 65345], // ａ..ｚ
  [130, 159, 241, 12353], // ぁ..ん
  [131, 64, 126, 12449], // ァ..ミ
  [131, 128, 150, 12512] // ム..ヶ
];

String.prototype.trim = String.prototype.trim || function() {
  return this.replace(/^\s+|\s+$/g, '');
};

function getDefaultHtmlHeader(title) {
  return '<html><head>\
  <meta http-equiv="X-UA-Compatible">\
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
  '<title>' + title + '</title>' +
  '<link rel="stylesheet" type="text/css" href="/info.css">\
  <link rel="stylesheet" type="text/css" href="/photon.css">\
  </head><body>';
}

function setContent(container, content) {
  if (container.childNodes.length > 0)
    container.replaceChild(content, container.firstChild);
  else
    container.appendChild(content);
}

function addLinkToTop() {
  var a = '<a style="position:fixed;left:0;top:0;padding:8px 32px;background-color:#CCC;font-size:16px;'
    + 'text-decoration:none;visibility:hidden" id="linkToTop" href="#top">&#x25b2; Наверх</a>';
  document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend', a);
  window.onscroll = function() {
    var style = document.getElementById('linkToTop').style;
    style.visibility = window.pageYOffset > 100 ? 'visible' : 'hidden';
    style.opacity = Math.min(window.pageYOffset / 1000, 0.9);
  }
}

var canAudioDict = null;

function canAudio(type) {
  if (canAudioDict === null) {
    canAudioDict = {"ogg":false, "mpeg":false};
    var a = document.createElement('audio');
    if (a && a.canPlayType) {
      for (var t in canAudioDict)
        if (a.canPlayType('audio/' + t + ';').replace(/no/, ''))
          canAudioDict[t] = true;
    }
  }
  return canAudioDict[type];
}

function canOgg() {
  return canAudio('ogg');
}

function canMp3() {
  return canAudio('mpeg');
}

function playAudio(s, type) {
  if (!canAudio(type))
    return;
  var a = preloadAudio[s];
  if (!a) {
    a = document.createElement('audio');
    a.volume = 0.15;
    a.preload = 'auto';
    a.src = s;
    preloadAudio[s] = a;
  }
  a.play();
}

function playOgg(s) {
  playAudio(s + '.ogg', 'ogg');
}

function playerInit() {

  this.playerAudio = null;
  this.playerVolume = 8;
  this.playerVolumeActive = false;
  this.playerFailoverTimer = null;
  this.playerRestartTimer = null;
  this.playerLastTime = 0;

  function makeUnselectable(node) {
    if (node.nodeType == 1)
      node.setAttribute("unselectable", "on");
    var child = node.firstChild;
    while (child) {
      makeUnselectable(child);
      child = child.nextSibling;
    }
  }

  this.playerGetBars = function() { 
    var count = 12;
    var height = 13;
    var content = document.createElement("div");
    for (i = 0; i < count; i++) {
      barHeight = 13;
      barTop = height - barHeight;
      if (barTop <= 0)
        barTop=0;
      var color;
      if (i == 0 || i == count - 1)
        color = theme['$playerPanelBack$'];
      else if (i > playerVolume)
        color = theme['$playerLight$'];
      else
        color = theme['$playerDark$'];
      var div = document.createElement('div');
      div.style.backgroundColor = color;
      div.style.height = barHeight;
      div.style.marginTop = barTop;
      div.className = 'playerVolumeBar';
      div.volumeToSet = i;
      div.player = this;
      div.onclick = function(e) {
        playerVolumeChanged(e.target);
      }
      div.onmousemove = function(e) {
        if (playerVolumeActive)
          playerVolumeChanged(e.target);
      }
      content.appendChild(div);
    }
    makeUnselectable(content);
    return content;
  }

  this.playerVolumeChanged = function(bar) {
    playerVolume = Math.max(0, Math.min(10, bar.volumeToSet));
    if (playerAudio != null)
      playerAudio.volume = playerVolume / 10;
    setContent(
      document.getElementById("playerVolume"),
      playerGetBars(playerVolume));
  }

  this.playerPlay = function() {

    if (playerAudio != null)
      return;

    link = 'http://anon.fm:8000/radio';
    if (options['highStream'] == 0)
      link += '-low';
    if (!canMp3())
      link += '.ogg';
    link +=  '?' + Math.random();

    playerAudio = document.createElement('audio');
    playerAudio.volume = playerVolume / 10;
    playerAudio.src = link;
    playerLastTime = 0;

    playerFailoverTimer = setInterval(function() {
      if (!playerAudio)
        return;
      var time = playerAudio.currentTime;
      if (time > playerLastTime && time < 30 * 60)
        playerLastTime = time;
      else
        playerRestart();
    }, 5000); 
    
    playerAudio.addEventListener("suspend", function() {
      if (playerRestartTimer != null)
        clearTimeout(playerRestartTimer);
      playerRestartTimer = setTimeout(playerRestart, 3000);
    }, false);

    playerAudio.play();
  }

  this.playerStop = function() {
    var a = playerAudio;
    playerAudio = null;
    if (playerFailoverTimer) {
      clearInterval(playerFailoverTimer)
      playerFailoverTimer = null;
    }
    if (playerRestartTimer) {
      clearTimeout(playerRestartTimer);
      playerRestartTimer = null;
    }
    if (a) {
      a.pause();
      a.src = '';
    }
  }

  this.playerRestart = function() {
    if (playerAudio) {
      playerStop();
      playerPlay();
    }
  }

  if (!canMp3() && !canOgg())
    return;

  document.addEventListener("mousedown", function() { playerVolumeActive = true; }, false);
  document.addEventListener("mouseup", function() { playerVolumeActive = false; }, false);
  
  var container = document.getElementById("playerPanel2");
  var div = document.createElement('div');
  div.className = 'playerPlay';
  div.innerHTML = '▶';
  div.style.marginLeft = 4;
  div.unselectable = 'on';
  div.onclick = playerPlay;
  container.appendChild(div);
  
  div = document.createElement('div');
  div.className = 'playerStop';
  div.innerHTML = '■';
  div.style.marginLeft = 8;
  div.unselectable = 'on';
  div.onclick = playerStop;
  container.appendChild(div);

  div = document.createElement('div');
  div.id = 'playerVolume';
  div.appendChild(playerGetBars());
  container.appendChild(div);
  
  makeUnselectable(container.parentNode);

  return playerRestart;
}

this.showNotices = function() {
  hiddenNotices = options['hiddenNotices'].split('|');
  var newHashes = [];
  var content = document.createElement("div");
 
  for (var i in notices) {
    var notice = notices[i];
    if (!notice)
      continue;
    var hash = '' + adler32(notice);
    newHashes.push(hash);
    if (hiddenNotices.indexOf(hash) < 0) {
      var div = document.createElement('div');
      div.className = 'notice';
      var a = document.createElement('a');
      a.className = 'noticeclose';
      a.href = '#'
      a.noticeHash = hash;
      a.innerHTML = ' x ';
      a.onclick = function(e) {
        return kraskiFM.closeNotice(e.target.noticeHash);
      }
      div.appendChild(a);
      a = document.createElement('a');
      a.href = '/info.html';
      a.target = '_blank';
      a.innerHTML = notice;
      div.appendChild(a);
      content.appendChild(div);
    }
  }
  var updateOptions = false;
  var i = 1;
  while (i < hiddenNotices.length) {
    if (newHashes.indexOf(hiddenNotices[i]) < 0) {
      hiddenNotices.splice(i, 1);
      updateOptions = true;
    }
    else
      i++;
  }
  if (updateOptions)
    setOption('hiddenNotices', hiddenNotices.join('|'));
  setContent(document.getElementById("notices"), content);    
}

this.closeNotice = function(hash) {
  setOption('hiddenNotices', options['hiddenNotices'] + '|' + hash);
  kraskiFM.showNotices();
  return false;
}


function getMainHtml() {
  return '<html>\
<head>\
<meta http-equiv="X-UA-Compatible">\
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\
<link rel="stylesheet" type="text/css" href="/info.css">\
<style>\
html, body {\
  font-family: "Trebuchet MS", "Trebuchet", "tahoma", sans-serif;\
  background-color: #444 !important;\
  color: $bodyFore$ !important;\
}\
h3 {\
  font-family: sans-serif;\
  font-size: 11.7px;\
}\
a {\
  color:#996793;\
  text-decoration:none;\
}\
a:hover {\
  color:#0066FF;\
  text-decoration:none;\
}\
#mainTable {\
  position:absolute;\
  left:0;\
  right:0;\
  margin:0px;\
  width:100%;\
  height:auto;\
  border-collapse:collapse;\
  table-layout:fixed;\
  border-right: solid 1px #444;\
}\
.topCell {\
}\
.bottomCell {\
  padding: 0 10px;\
}\
.tilecontent { \
  word-wrap: break-word;\
}\
#playerPanel {\
  background-color:$playerPanelBack$;\
  color:$topPanelFore$;\
  font-weight: bold\
}\
#playerPanel * {\
  color:$topPanelFore$;\
}\
#playerPanel a:hover {\
  color:$topPanelHoverFore$;\
  font-weight: bold;\
}\
#headerPanel, #footerPanel {\
  height:32px;\
  background-color:#444;\
  color:#D8D8D8;\
}\
#headerPanel a, #footerPanel a, #headerPanel select, #footerPanel select {\
  background-color:#444;\
  color:#D8D8D8;\
}\
#headerPanel a:hover, #footerPanel a:hover {\
  color:#FFF;\
}\
#headerPanel td, #footerPanel td {\
  text-align:center;\
}\
#linksPanel {\
  background-color:$linksPanelBack$;\
  color:$topPanelFore$;\
  font-weight:bold;\
}\
#linksPanel * {\
  color:$topPanelFore$;\
  font-weight: bold;\
}\
#linksPanel a:hover {\
  color:$topPanelHoverFore$;\
}\
#linksPanel a {\
  line-height:25px;\
}\
#linksPanel h1 {\
  color:$linksPanelH1$;\
  min-height:24px;\
}\
.linksLeft {\
  float:left;\
  text-align:right;\
}\
.linksRight {\
  float:left;\
  text-align:left;\
}\
.linksLeft, .linksRight {\
  width:50%;\
  margin-bottom:15px;\
}\
.linksLeft a {\
  padding-right:15px;\
}\
.linksRight a {\
  padding-left:15px;\
}\
#linksTable {\
  text-align:center;\
  line-height:200%;\
  width:100%;\
  height:580px;\
  min-height:580px;\
  table-layout:fixed;\
}\
#shedPanel {\
  background-color:$shedPanelBack$;\
  color:$shedPanelFore$;\
}\
#shedPanel * {\
  color:$shedPanelFore$;\
  line-height: 100%;\
}\
#shedPanel h1 {\
  color:$shedPanelH1$;\
}\
#shedPanel a:hover {\
  color:$shedPanelHover$;\
}\
#shed{\
  margin: 0 !important;\
  padding: 0 !important;\
}\
.shedTable {\
  width:100%;\
  height:500px;\
  min-height:500px;\
  table-layout:fixed\
}\
.shedTable td {\
  padding: 5px 5px;\
  text-align:center;\
}\
.shedInfoLeft, .shedInfoCenter, .shedInfoRight {\
  font-size:12px;\
  color:$shedInfoFore$ !important;\
  margin:0;\
  overflow:hidden;\
  word-wrap: break-word;\
  padding-bottom: 0px !important;\
}\
.shedInfoLeft {\
  text-align:left !important;\
}\
.shedInfoCenter {\
  text-align:center !important;\
  padding: 2px 0px 0px 0px !important;\
}\
.shedInfoRight {\
  text-align:right !important;\
}\
#kookaPanel {\
  background-color:$kookaPanelBack$;\
}\
#radiochanPanel {\
  background-color:$radiochanPanelBack$;\
}\
#radiochanPanel, #kookaPanel {\
  border-right: solid 8px #444;\
}\
#linksPanel, #playerPanel {\
  border-right: solid 8px #444;\
}\
#radiochanPanel, #kookaPanel, #newsPanel {\
  border-top: solid 8px #444;\
}\
#linksPanel, #radiochanPanel {\
  border-left: solid 4px #444;\
}\
#newsPanel {\
  background-color:$newsPanelBack$;\
}\
#newsfeed p {\
color: $newsFeedFore$ !important;\
}\
#splashPanel {\
  background-color:#EEE;\
}\
#bhd, #rate {\
  text-align:center;\
}\
#slides, #shed, .ballon {\
  border: inherit !important;\
  border-radius: inherit !important;\
  margin: inherit !important;\
  background-color: inherit !important;\
}\
#kookareque, #newsfeed {\
  background-color: inherit !important;\
  border:  inherit !important;\
  border-radius: inherit !important;\
  overflow: hidden !important;\
  padding: inherit !important;\
}\
#kookareque p, #newsfeed p {\
  border-bottom: 1px solid #888;\
  background: none !important;\
  border-radius: 0 !important;\
}\
#kookareque img {\
  border-radius: 0px !important;\
}\
.dj, .user_id{\
  font-weight:normal !important;\
  font-size:80% !important;\
}\
.dj{\
  color:#888 !important;\
}\
.user_id{\
  color:#78B !important;\
}\
.timestamp {\
  font-size: 80%;\
  color: #78B !important;\
}\
#newsfeed, .notice {\
  font-family: "Verdana", sans-serif !important; \
  font-size: 11px;\
}\
#radiochan .somemsg{\
  padding: 5px 0;\
  font-size:14px;\
  border-bottom: 1px solid #888888;\
}\
#counter{background:black;padding:5px;float:left;}\
#counter img{background:#D8D8D8;border:0px;}\
.hurtbox{padding:3px}\
.disabled{display:none;}\
#bh{padding:0px 0px;margin:10px auto;display:block;width:350px;overflow:hidden; background:#fff;}\
#bhd .holder{display:inline-block;}\
#age{color:white;font-size:15px;float:right;background:#c00;margin:0px 0px 0px 20px;padding:2px;}\
#shed{margin:5px auto;width:100%;}\
#shed table{border-collapse:collapse;width:100%;}\
#shed span{display:block;color:#bbb;font-size:70%;white-space: nowrap;}\
#shed .now{background:#800;color:white;}\
#shed .old{color:#888;}\
#shed .new{color:#800;}\
#radiochan{\
  overflow-y:hidden;\
}\
#radiochan .msgtime{color:#888;}\
#radiochan .somemsg_id{color:#467ea6;font-weight:bold;}\
#down{overflow:auto;}\
#downstat{height:110px;overflow:auto;}\
#downstat tr{font-size:11px;}\
.notice {\
  margin:0 0 4px 0;\
  padding:8px;\
}\
.notice, .notice * {\
  color:#222 !important;\
  background-color:#EEB;\
}\
.noticeclose {\
  font-size:14px;\
  font-weight: bold;\
  display:inline-block;\
  float:right;\
  margin:-8px -8px 10px 10px\
}\
#playerVolume {\
  height:20px;\
  width:100px;\
  display:inline-block;\
}\
#playerVolume div {\
  height:40px;\
  display:inline-block;\
}\
.playerPlay, .playerStop {\
  border: 1px solid $playerDark$;\
  float:left;\
  width:24px;\
  height:18px;\
  line-height:18px;\
  font-family:"Courier New";\
  text-align: center;\
  vertical-align: middle;\
  $vendorPrefix$user-select: none;\
  user-select: none;\
  cursor:default;\
}\
.playerPlay, .playerStop:active {\
  background-color:$playerDark$;\
  color:$playerLight$ !important;\
  font-size:18px;\
}\
.playerStop, .playerPlay:active {\
  background-color:$playerLight$;\
  color:$playerDark$ !important;\
  font-size:20px;\
}\
.playerStop:hover, .playerPlay:hover {\
  border-color:$playerBorder$;\
}\
.playerVolumeBar {\
  border-width: 3px 1px 4px 0px;\
  border-color: $playerPanelBack$;\
  border-style: solid;\
  display:inline-block;\
  width:7px;\
  cursor:default;\
}\
.playerElement {\
  display:inline-block;\
  $vendorPrefix$user-select: none;\
  user-select: none;\
}\
.disabledLink, .disabledLink:hover {\
  color:$disabledLink$ !important;\
  cursor:default;\
}\
</style>\
</head>\
<body>\
<div id="notices" style="margin:0 0 0 auto; max-width:50%"></div>\
<table id="mainTable">\
<tr id="headerPanel">\
<td width=25%>\
  <a name="top"/>\
  <a id="toBottomLink" href="#bottom" name="#bottom">В конец страницы</a>\
</td>\
<td width=50%>\
  Тема:\
  <select id="themeSelector" style="border:0;font-family: \'Trebuchet MS\', \'Trebuchet\', \'tahoma\', serif;font-size: 16px">\
  </select>\
  <label style="padding-left:20px" id="highStreamLabel" for="highStreamCheck" title="Лушее качество воспроизведения, но больший трафик и возможные разрывы">Качество: </label>\
  <input type="checkbox" id="highStreamCheck" unchecked>\
  <label style="padding-left:20px" id="messageSoundLabel" for="messageSoundCheck">Звуки сообщений: </label>\
  <input type="checkbox" id="messageSoundCheck" unchecked>\
</td>\
<td width=25%>\
  <div title="Показать все существующие обявления, которые были скрыты" style="float:left">\
  <a id="showNoticesLink" href="/info.html" target="_blank">Показать все объявления<a></div>\
  <div id="clock" title="Текущее московское время" style="float:right;margin-right:15px"></div>\
</td>\
</tr>\
<tr style="height:600px;min-height:600px">\
  <td class="topCell" id="linksPanel" style="vertical-align:top;word-wrap:break-word;text-align:center">\
    <div>\
      <h1>Обратная связь</h1>\
      <div class="linksLeft">\
        <a href="http://0chan.hk/_fm/" target="_blank">Борда</a><br>\
        <a href="/contact.html" target="_blank">Контакты</a><br>\
      </div>\
      <div class="linksRight">\
        <a href="/donate.html" target="_blank">Донаты</a><br>\
        <a href="https://kraskifm.userecho.com/" target="_blank">Предложения</a><br>\
        <a href="http://anonvoice.anon.fm/" target="_blank">Голос анона</a><br>\
      </div>\
      <h1>В интернетах</h1>\
      <div class="linksLeft">\
        <a href="http://anon-fm.rpod.ru/" target="_blank">Подкасты</a><br>\
        <a href="http://wiki.belchan.org/index.php?title=Wiki.anon.fm" target="_blank">Склад знаний</a><br>\
      </div>\
      <div class="linksRight">\
        <a href="https://twitter.com/anon_fm" target="_blank">Твиттор</a><br>\
        <a href="http://vk.com/anonfm" target="_blank">Вкон&shy;тактик</a><br>\
        <a href="http://anonfm.psto.net/" target="_blank">Пс(т)ач</a><br>\
      </div>\
      <h1>Разное</h1>\
      <div class="linksLeft">\
        <a href="/gallery/" target="_blank">Картинки</a><br>\
        <a href="/quotes.html" target="_blank">Цитатник</a><br>\
      </div>\
      <div class="linksRight">\
        <a href="/board/" target="_blank">Текстаба</a><br>\
        <a id="scriptLink" href="http://userscripts.org/scripts/show/168570" target="_blank">Юзер&shy;скрипт</a><br>\
      </div>\
    </div>\
  </td>\
  <td class="topCell" width=50% id="playerPanel" style="vertical-align:top">\
    <div style="position:absolute;top:170px;height:400px;left:25%;right:25%">\
      <a id="splashRef" target="_blank" href="/geomap.jpg">\
        <img id="splash" style="position:absolute;top:0;bottom:0;left:0;right:0;max-width:95%;max-height:100%;margin:auto;background-color:#EEE" src="/geomap.jpg" />\
      </a>\
    </div>\
    <center>\
    <div style="padding-top:8px;margin-top:8px">\
      <a class="playerElement" href="." target="_blank" title="Перейти к старой версии" style="font-size:200%;margin-right:0px">anon.fm</a>\
      <div class="playerElement" id="playerPanel2">\
      </div>\
      <a class="playerElement" title="Скачать плейлист" href="radio.m3u" target="_blank" style="font-size:smaller;margin-left:24px;font-weight:normal;text-decoration:underline;">M3U</a>\
    </div>\
    </center>\
    <center>\
      <a id="songInfoLink" href="?songInfo" title="Кликнте для просмотра информации о треке" target="_blank">\
        <img id="playnow" src="http://anon.fm/radioanon.png" width="350" height="38"/>\
      </a>\
    </center>\
    <center>\
      <div unselectable="on" style="margin-top:8px">\
        <a href="/logs/" title="Логи вещания" target="_blank">Логи</a>\
        &nbsp;|&nbsp;\
        <a href="?podcasts" title="Записи эфиров" target="_blank">Записи</a>\
        &nbsp;|&nbsp;\
        <a id="videoLink" href="#" target="" title="Доступно только во время видеотрансляций">Видео</a>\
        &nbsp;|&nbsp;\
        <a id="skypeLink" href="#" target="" title="Доступно только во время конференций">Позвонить</a>\
      </div>\
    </center>\
    <div style="margin:0;padding:0;position:absolute;top:590px;width:50%">\
    <center>\
      <div style="">\
          <div title="Баттхерт в диджейке" id="bhd" style="display:inline-block">??</div> /\
          <div title="Успешность трека (по результатам голосования)" id="rate" style="display:inline-block">??</div>\
          &nbsp;|&nbsp;\
          <a id="rateLink" href="?rate" target="_blank">Проголосовать</a>\
          &nbsp;|&nbsp;\
          <a id="feedbackLink" href="/feedback/" target="_blank">Написать диджею</a>\
          &nbsp;|&nbsp;\
        <a id="refreshLink" href="$kraskiPage$" title="Обновить (без перезагрузки страницы)">&#x21BB;</a>\
      </div>\
    </center>\
    </div>\
  </td>\
  <td class="topCell" id="shedPanel" width=25% style="vertical-align:top">\
      <div id="shed"></div>\
  </td>\
</tr>\
<tr>\
  <td class="bottomCell" id="radiochanPanel" width=25% style="vertical-align:top;word-wrap:break-word">\
    <div class="tilecontent">\
      <h1>Конфомразь</h1>\
      <div id="radiochan"></div>\
      <h3>Адрес конфы:<br><a href="xmpp:radiochan@conference.jabber.ru?message" target="_blank">radiochan@conference.jabber.ru</a></h3>\
    </div>\
  </td>\
  <td class="bottomCell" id="kookaPanel" width=50% style="vertical-align:top">\
    <div class="tilecontent">\
      <h1>Кукареканье со стороны диджейки</h1>\
      <div id="kookareque"></div>\
    </div>\
  </td>\
  <td class="bottomCell" id="newsPanel" width=25% style="vertical-align:top">\
    <div class="tilecontent">\
      <h1 style="align:left;width:auto">В интернетах</h1>\
      <div id="newsfeed"></div>\
      <h3>История новостей:<br><a href="xmpp:newsanon@conference.jabber.ru?message" target="_blank">newsanon@conference.jabber.ru</a></h3>\
    </div>\
  </td>\
</tr>\
<tr id="footerPanel">\
<td>\
  <a name="bottom"/>\
  <a id="toTopLink" href="#top">В начало страницы</a>\
</td>\
<td>\
  Другие версии: &nbsp; \
  <a href="/">Классическая</a>,\
  <a href="/mobile/" target="_top">Мобильная</a>,\
  <a href="/index-inv.html" target="_top">1-сентябрьская</a>,\
  <a href="/index-vk.html" target="_top">1-апрельская</a>\
</td>\
<td style="background: $vendorPrefix$linear-gradient(left, #444 0%, #000 25%)">\
  <div style="float:right" id="counter"><img src="/counter.php" border="0"></div>\
</td>\
</tr>\
</table>\
<div id="oldDesignLink" style="visibility:collapse;position:absolute;top:0;left:0;height:20px;width:200px;background:seashell;color:black;">\
<a href="/index-frames.html">Вернуть прежний дизайн</a>\
</div>\
</body>\
</html>';
}

function getRateForm() {
  return getDefaultHtmlHeader('Проголосовать') +
'<center>\
<form action="/board/dopost.php" method="post" enctype="multipart/form-data" style="margin-top:50px">\
  <input type="hidden" name="action" value="rate"/>\
  Оценить текущий трек или диджея:\
  <input type="submit" name="v" value="+"/>\
  <input type="submit" name="v" value="-"/>\
  <div id="captcha">\
    <img src="/captcha.php?'+(new Date().getTime())+'" onclick="this.src+=String.fromCharCode(Math.floor(Math.random()*26+65))">\
    <input type="text" name="captcha">\
  </div>\
</form>\
</center>\
</body>';
}

function encodeHtml(str) {
  var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
  };
  return str.replace(/[&<>]/g, function(tag) {
    return tagsToReplace[tag] || tag;  
  });
}

function decodeCp1251Char(code) {
  if (code < 32 || code > 255)
    return '';
  if (code >= 128)
    return cp1251[code - 128];
  return String.fromCharCode(code);
}

function decodeCp1252Char(code) {
  if (code < 32 || code > 255)
    return '';
  if (code >= 128 && code < 160)
    return cp1252[code - 128];
  return String.fromCharCode(code);
}

function decodeShiftJisChar(prefix, code) {
  for (var i = 0; i < shiftJis.length; i++) {
    map = shiftJis[i]; // [firstByte, secondByteFrom, secondByteTo, unicode]
    if (map[0] > prefix)
      break;
    if (map[0] == prefix && code >= map[1] && code <= map[2]) {
      var uni = map[3];
      if (typeof uni == 'string')
        return uni[code - map[1]];
      return String.fromCharCode(uni + code - map[1]);
    }
  }
  return null;
}

function encodeCp1251(text) {
  var data = [];
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code < 128)
      data.push(code);
    else {
      code = cp1251.indexOf(text[i]);
      data.push(code >= 0 ? code + 128 : 63);
    }
  }
  return data;
}

function encodeCp1252(text) {
  var data = [];
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code < 128 || code >= 160 && code < 256)
      data.push(code);
    else {
      code = cp1252.indexOf(text[i]);
      data.push(code >= 0 ? code + 128 : 63);
    }
  }
  return data;
}

function encodeLatin1(text) {
  var data = [];
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    if (code < 256)
      data.push(code);
    else
      data.push(63);
  }
  return data;
}

function decodeCp1251(codes) {
  var result = '';
  for (var i = 0; i < codes.length; i++)
    result += decodeCp1251Char(codes[i]);
  return result.trim();
}

function decodeCp1252(codes) {
  var result = '';
  for (var i = 0; i < codes.length; i++)
    result += decodeCp1252Char(codes[i]);
  return result.trim();
}

function decodeUtf8(codes) {
  var result = '';
  for (var i = 0; i < codes.length; i++) {
    result += '%' + ('0' + codes[i].toString(16)).slice(-2);
  }
  try {    
    return decodeURIComponent(result).trim();
  }
  catch (e) {
    return null;
  }
}

function decodeShiftJis(codes) {
  var result = '';
  var prefix = -1;
  for (var i = 0; i < codes.length; i++) {
     var code = codes[i];
     if (prefix < 0) {
       if (code >= 129 && code <= 159 || code >= 224 && code <= 239) {
         prefix = code;
       }
       else if (code < 128) {
         if (code >= 32)
           result += String.fromCharCode(code);
       }
       else
         prefix = 0;
     }
     else if (prefix >= 0) {
       var c = decodeShiftJisChar(prefix, code);
       result += (c != null ? c : '?');
       prefix = -1;
     }
  }
  return result.trim();
}

function smartDecode(codes) {
  
  function getScore(text, isUni) {
    if (text == null)
      return -1000000000;
    var preText = '?' + text + '?';
    var engText = preText.replace(/[^A-Za-z]/g, ' ');
    var res = 0;
    for (var i = 1; i < preText.length - 1; i++) {
      var code = preText.charCodeAt(i);
      if (code >= 32 && code < 127) { // Latin
        if (code != 63) // '?'
          res++;
      }
      else if (code >= 192 && code < 256) { // Latin+
        if (engText[i - 1] != ' ' || engText[i + 1] != ' ')
          res++;
      }
      else if (code >= 1040 && code < 1104) { // Cyrillic
        if (engText[i - 1] == ' ' && engText[i + 1] == ' ')
          res++;
      }
      else if (code >= 12288 && code < 12544) // Kana
        res++;
      else if (!isUni) {
        if (code >= 19968 && code < 40960 || // Kanji
          code >= 65280 && code < 65510 || // Romaji
          code >= 65408 && code < 65438) { // Narrow kana
        }
        else if ("ЁЇЄЎёїєў‐–—".indexOf(preText[i]) < 0)
          res--;
      }
    }
    return res;
  }

  var uniText = decodeUtf8(codes);
  var texts = [
    uniText,
    decodeCp1251(codes),
    decodeCp1252(codes),
    decodeShiftJis(codes)
  ];

  if (uniText != null) {
    codes = encodeCp1252(uniText);
    texts.push(decodeCp1251(codes));
    texts.push(decodeShiftJis(codes));
    codes = encodeCp1251(uniText);
    texts.push(decodeCp1252(codes));
    texts.push(decodeShiftJis(codes));
  }

  var order = [];
  var scores = [];
  for (var i in texts) {
    order.push(i);
    scores.push(getScore(texts[i], i == 0 && uniText != null));
  }
  order = order.sort(function (a, b) {
    var res = scores[b] - scores[a];
    return res != 0 ? res : a - b;
  });
  var res = [];
  for (var i in order) {
    var text = texts[order[i]];
    if (text != null)
      res.push(text);
  }
  return res;
}

function decodeHtml(str) {
  var tagsToReplace = {
    '&amp;' : '&',
    '&lt;' : '<',
    '&gt;' : '>'
  };
  return str.replace(/[&<>]/g, function(tag) {
    return tagsToReplace[tag] || tag;  
  });
}

function encodeURIComponentEx(s) {
  return encodeURIComponent(s).replace(/\'/g, "%27");
}


function formatTime(s) {
  var h = Math.floor(s / 3600);
  var m = Math.floor((s % 3600) / 60);
  var s = s % 60;
  return (h > 0 ? h + ":" : "") + zeros(m, 2) + ":" + zeros(s, 2);
}

function formatFileSize(kbytes) {
  if (kbytes && !isNaN(kbytes) && kbytes >= 1024)
    return Math.round(kbytes / 1024) + ' mb';
  return Math.round(kbytes) + ' kb';
}

function getVendorPrefix() {
  var styles = window.getComputedStyle(document.documentElement, '');
  var a = Array.prototype.slice
    .call(styles)
    .join('') 
    .match(/-(moz|webkit|ms|khtml)-/);
  if (a)
    return '-' + a[1] + '-';
  if (styles.OLink === '')
    return '-o-';
  return '';
}

function resolveColor(color) {
  if(color === 'transparent')
    color = '#FFF';
  var r,g,b;
  var hex_color_pcre = new RegExp("^#[0-9a-f]{3}([0-9a-f]{3})?$",'gi');
  var rgb_color_pcre = new RegExp("rgb\\(\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*,\\s*((?:[0-2]?[0-9])?[0-9])\\s*\\)$",'gi');
  var rgb_percent_color_pcre = new RegExp("rgb\\(\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*,\\s*((?:[0-1]?[0-9])?[0-9])%\\s*\\)$",'gi');
  if(color.match(hex_color_pcre)) {
    if(color.length == 4){
      r  = color.charAt(1)+""+color.charAt(1);
      g  = color.charAt(2)+""+color.charAt(2);
      b  = color.charAt(3)+""+color.charAt(3);
    }
    else{
      r  = color.charAt(1)+""+color.charAt(2);
      g  = color.charAt(3)+""+color.charAt(4);
      b  = color.charAt(5)+""+color.charAt(6);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }
  else if(color.match(rgb_color_pcre)){
    r = RegExp.$1;
    g = RegExp.$2;
    b = RegExp.$3;
  }
  else if(color.match(rgb_percent_color_pcre)){
    r = parseInt((RegExp.$1)*2.55);
    g = parseInt((RegExp.$2)*2.55);
    b = parseInt((RegExp.$3)*2.55);
  }
  else
    return null;
  return [r, g, b];
}

function adler32(s){
  var a = 1;
  var b = 0;
  for(var q in s)
    a+=s.charCodeAt(q);b+=a;
  return Math.abs(((b % 65521) << 16) | (a % 65521));
}

function loadOptions() {
  var pairs = document.cookie.split("; ");
  for(var q in pairs){
    var vals= pairs[q].split("=", 2);
    var key = vals[0];
    var value = vals[1];
    var oldValue = options[key];
    if (typeof(oldValue) == 'number')
      value = parseFloat(value);
    options[key] = value;
  }
}

function setOption(key, value){
  document.cookie = key + "=" + value +
    ";path=/; expires=" + (new Date(2147483548000).toGMTString());
  options[key]=value;
}

function getStandardTime(aTime) {
  if (aTime == null)
    aTime = new Date();
  return new Date(aTime.getTime() + 4 * 60 * 60 * 1000);
}

function zeros(v, n) {
  var s = "00000000000" + v;
  return (s.substr(s.length - n));
}

function utcDateToStr(d) {
  return d.getUTCDate() + "." + zeros(d.getUTCMonth() + 1, 2) + "." + zeros(d.getUTCFullYear(), 4);
}

function utcTimeToStr(d) {
  return zeros(d.getUTCHours(), 2) + ":" + zeros(d.getUTCMinutes(), 2);
}

loadOptions();

function getLink(name, url, reopenWindow) {
  var result = '<a href="' + url + '"';
  if (reopenWindow) {
    result += 'target="_blank" onclick="window.close();window.open(\''+ 
      url.replace(/\'/g, "%27") + '\');return false;"';
  }
  result += '>' + name + '</a>'
  return result;
}

function getSearchLinks(searchText, reopenWindow) {
  var i = searchText.indexOf('http://');
  if (i >= 0)
    return getLink('Перейти по ссылке', searchText.substring(i), reopenWindow);
  searchText = encodeURIComponent(searchText);
  return getLink('Google,', 'http://www.google.com/search?safe=off&q=' + searchText, reopenWindow) +
    ' ' + getLink('Yandex,', 'http://ya.ru/yandsearch?text=' + searchText, reopenWindow) +
    ' ' + getLink('VK', 'http://vk.com/audio?q=' + searchText, reopenWindow);
}

function mouseEventFire(el, etype) {
  var evObj = document.createEvent('MouseEvent');
  evObj.initEvent(etype, true, true);
  el.dispatchEvent(evObj);
}

var filterContent = function(s) { return s; };

{
  var date = new Date();
  var month = date.getMonth();
  var day = date.getUTCDate();
  var hours = date.getUTCHours();
  if (month == 7 && (day == 23 && hours >= 21 || day == 24 && hours < 21)) {
    filterContent = function(s) {
      return s.replace(/и/g, 'i').replace(/И/g, 'I').replace(/ы/g, 'и').replace(/Ы/g, 'И').
        replace(/е/g, 'є').replace(/Е/g, 'Є').replace(/ё/g, 'йо').replace(/Ё/g, 'Йо').
        replace(/е/g, 'є').replace(/Е/g, 'Є').replace(/ъ/g, "'").replace(/Ъ/g, "'");
    }
  }
}

function Poller(source, target, timeout, prefix, force) {
  this.state = "";
  var caller = this; // да, это костыль
  this.poll = function () {
    var req = new XMLHttpRequest();
    req.open("GET", source + (force ? "?" + Math.random() : ""), true);
    req.onreadystatechange = function () {
      var r = req;
      if (r.readyState == 4 && r.status == 200 && (force == 1 || caller.state != r.responseText)) {
        caller.state = req.responseText;
        var response = filterContent(r.responseText);
        if (response != null) {
          var newHtml = null;
          if (typeof (prefix) == "string")
            newHtml = prefix + response
          else {
            if (source.indexOf(".js") > 0) {
              var m = response.match(safeJavaScriptRegex);
              if (m != null && m[0].length == response.length)
                response = eval("(" + response + ")");
              else
                response = null;
            }
            if (response != null)
              newHtml = prefix(response);
          }
          if (newHtml != null && target != null) {
            var element = document.getElementById(target);
            if (element != null)
              element.innerHTML = newHtml;
          }
        }
      }
    }
    req.send(null);
  };
  if (timeout > 0)
    setInterval(this.poll, timeout);
  this.poll();
}

function binaryPoll(source, force, func) {
  var req = new XMLHttpRequest();
  req.open('GET', source + (force ? "?" + Math.random() : ""), true);
  // responseType "arraybuffer" and charset "iso-8859-1" do not work in all browsers
  req.overrideMimeType('text/plain; charset=windows-1252');
  req.onload = function(e) { 
    if (this.status == 200)
      func(encodeCp1252(req.response));
  }
  req.send(null);
}

function callInit(initFunc) {
  if (document.readyState === "complete")
    initFunc();
  else {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', initFunc, false);
      window.addEventListener('load', initFunc, false);
    }
    else if (window.attachEvent)
      window.attachEvent('onload', initFunc, false);    
  }
}

function infoPageInit() {
  if (isInfoPageInitialized)
    return;
  isInfoPageInitialized = true;
  if (doc.getElementById('kraski') == null) {
    var div = doc.getElementById('opvi');
    if (div != null) {
      var a = doc.createElement('a');
      a.href="/" + kraskiPage;
      a.id="kraski";
      a.innerHTML="Мир в красках!";
      a.target="_top";
      div.appendChild(a);
    }
  }
}

function findElement(elementType, elementClass) {
  elements = document.getElementsByTagName(elementType);
  if (elements.length) {
    for (var i in elements) {
      if(elementClass == null || (' ' + elements[i].className + ' ').indexOf(' ' + elementClass + ' ') >= 0)
        return elements[i];
    }
  }
  return null;
}

this.initScript = function() {

var isKraskiPage = document.URL.indexOf('/' + kraskiPage) >= 0;
var contentFrame = null;
if (document.URL == 'http://anon.fm/')
  contentFrame = window.frames["CONTENT"];
else if (document.URL == 'http://anon.fm/menu.html' && parent != null)
  contentFrame = parent.window.frames["CONTENT"];
if (contentFrame != null)
  doc = contentFrame.document;
else if (document.URL == 'http://anon.fm/info.html')
  doc = document;
if (doc != null)
  callInit(infoPageInit);
else if (document.URL.indexOf('anon.fm:8000') >= 0) {
  var elems = document.getElementsByTagName('td');
  if (elems.length) {
    var song = '';
    var listeners = 0;
    var text = '';
    for (var i in elems) {
      var newText = elems[i].innerHTML;
      if (text == 'Current Song:') {
        if (song == '')
          song = newText;
        newText = '';
      }
      else if (text == 'Current Listeners:')
        listeners += parseInt(newText);
      text = newText;      
    }
    var div = '<p><div style="display:inline-block;min-width:190px">';
    var div2 = '<div style="display:inline;font-weight:bold;word-wrap:break-word">';
    var songInfo = div + 'Слушателей и ботов:</div>' +
      div2 + listeners +'</div><p>' +
      div + 'Аудиодорожка:</div>' +
      div2 + song + '</div><p>' +
      div + 'Найти:</div>' +
      div2 + getSearchLinks(decodeHtml(song), false) + '</div><p>';
    var headerDiv = findElement('div', 'header');
    if (headerDiv != null)
      headerDiv.innerHTML += songInfo;
    else {
      var div = document.createElement('div');
      div.innerHTML = songInfo;
      var firstDiv = findElement('div', null);
      if (firstDiv != null)
        document.body.insertBefore(div, firstDiv);
      else
        document.body.insertBefore(div, document.body.firstChild);
    }
  }
}
else if (isKraskiPage && document.URL.indexOf('?podcasts') >= 0) {
  document.getElementsByTagName('html')[0].innerHTML = '';
  function updatePodcasts(n) {

    var sUnit = 1;
    var mUnit = 60;
    var hUnit = 60 * mUnit;
    var DUnit = 24 * hUnit;
    var YUnit = 365.25 * DUnit;
    var MUnit = YUnit / 12;
  
    var units = [
      [ YUnit, "лет", "год", "года" ],
      [ MUnit, "месяцев", "месяц", "месяца" ],
      [ DUnit, "дней", "день", "дня" ],
      [ hUnit, "часов", "час", "часа" ],
      [ mUnit, "минут", "минуту", "минуты" ],
      [ sUnit, "секунд", "секунду", "секунды" ]
    ];
  
    function getUnitIndex(t) {
      if (t >= 5 && t <= 20)
        return 1;
      t %= 10;
      if (t == 1)
        return 2;
      if (t >= 2 && t <= 4)
        return 3;
      return 1;
    }
  
    function getTimeSpan(t) {
      if (t < 15)
        return "только что";
      for (i in units) {
        var unit = units[i];
        var tt = t / unit[0];
        if (tt >= 1) {
          tt = Math.round(tt);
          return tt + ' ' + unit[getUnitIndex(tt % 100)] + ' назад';
        }
      }
    }

    function encodeCyrillic(str) {
      var res = '';
      for (var i in str) {
        var ch = str.charCodeAt(i);
        if (ch < 128 || ch == 39)
          res += str.charAt(i);
        else
          res += encodeURIComponent(encodeURIComponent(str.charAt(i)));
      }
      return res;
    }

    function play(e, getPlayer) {
      if (typeof window.lastPlayerAnchor == 'undefined')
        window.lastPlayerAnchor = null;
      var playerAnchor = e.target;
      var playerHTML = '';
      if (window.lastPlayerAnchor != null)
        window.lastPlayerAnchor.innerHTML = '&#x25B6;';
      if (window.lastPlayerAnchor == playerAnchor)
        window.lastPlayerAnchor = null;
      else {
        var row = playerAnchor.parentNode.parentNode;
        var anchor = row.childNodes[0].childNodes[0];
        var link = anchor.href;
        var title = 'Запись от ' + row.childNodes[2].innerHTML;
        if (anchor.childNodes.length > 0)
          title += ': ' + decodeHtml(anchor.childNodes[0].innerHTML).replace(',', '¸');
        playerAnchor.innerHTML = '&#x25A0;';
        playerHTML = getPlayer(title, link);
        window.lastPlayerAnchor = playerAnchor;
      }
      document.getElementById("playerDiv").innerHTML = playerHTML;
      return false;
    }

    function playViaFlash(e) { return play(e, function(title, file) {
      return '<div style="background-color:#CCC">' +
      '<object type="application/x-shockwave-flash" data="/records/player.swf" ' +
      'style="width:498px;height:24px;margin:7px">' +
      '<param name="movie" value="records/player.swf">' +
      '<param name="FlashVars" value="initialvolume=100&autostart=yes&loop=no&' +
      'titles=' + encodeURIComponentEx(title) +
      '&soundFile=' + encodeURIComponentEx(file) + '">' +
      '<param name="wmode" value="transparent">' +
      '<param name="quality" value="high"></object></div>';
    })}
    
    function playViaWMP(e) { return play(e, function(title, file) {
      return '<embed type="application/x-mplayer2" ShowControls="1" ShowStatusBar="1" ShowDisplay="1" autostart="1" volume ' +
      'width="512" height="80" src="' + encodeCyrillic(file) + '" />'
    })}
    
    function playViaVLC(e) { return play(e, function(title, file) {
      return '<embed type="application/x-vlc-plugin" autoplay="yes" loop="no" volume="100" ShowControls="1" ' +
      'width="512" height="64" src="' + encodeCyrillic(file) + '" />'
    })}

    function playViaQuickTime(e) { return play(e, function(title, file) {
      return '<div style="background-color:#CCC">' +
      '<embed type="video/quicktime" bgColor="#cccccc" volume="100" autoplay="true" cache="false"' +
      'style="width:498px;height:38px;margin:0px 7px" src="' + encodeCyrillic(file) + '" /></div>';
    })}
    
    function playViaHTML5(e) { return play(e, function(title, file) {
      return '<audio controls autoplay style="width:512">' +
      '<source src="' + encodeCyrillic(file) + '" type="audio/mpeg">' +
      '</audio>'
    })}

    var playMP3 = null;
    var playOther = null;
    var players = [
      [playViaWMP, 'windows media player', true],
      [playViaFlash, 'flash', false],
      [playViaVLC, 'vlc', true],
      [playViaQuickTime, 'quicktime', true]
    ];
    if (navigator.plugins) {
      priorityMP3 = 9;
      priorityOther = 9;
      for (i in navigator.plugins) {
        name = ('' + navigator.plugins[i].name).toLowerCase();
        for (j in players) {
          var player = players[j];
          if (name.indexOf(player[1]) >= 0) {
            if (j < priorityMP3) {
              priorityMP3 = j;
              playMP3 = player[0];
            }
            if (j < priorityOther && player[2]) {
              priorityOther = j;
              playOther = player[0];
            }
          }
        }
      }
    }
    if (!playMP3) {
      var a = document.createElement('audio');
      if (a && a.canPlayType && a.canPlayType('audio/mpeg;').replace(/no/, ''))
        playMP3 = playViaHTML5;
    }
    
    var r = '';
    var links = '<a name="#top"></a><br><br><br>';
    for(var q in n) {
      var m = n[q][3];
      if (!m.length)
        continue;
      r += '<a name="category' + q + '"></a><h1>' + n[q][2] + '</h1>';
      links += '<a href="#category'+ q +'">' + n[q][2] + '</a><br>'
      r += '<table><tr><th>Запись</th><th></th><th>Время (МСК)</th><th>Длительность</th><th>Размер</th></tr>';
      for(w in m) {
        var bg = w % 2 == 0 ? "eee" : "f7f7f7";
        var link = m[w][0];
        var size = m[w][1];
        var recordDate = getStandardTime(new Date(m[w][2] * 1000));
        var timeSpan = getTimeSpan(new Date().getTime() / 1000 - m[w][2]);
        var length = m[w][3];
        var name = m[w][4];

        var size = formatFileSize(parseInt(size));

        var playerLink = '';
        if (link.indexOf(".mp3") > 0 && playMP3)
          playerLink = 'playerMP3';
        else if (playOther)
          playerLink = 'playerOther';
        if (playerLink != '')
          playerLink = '<a style="font-size:24px;display:block;width:50px;text-align:center" ' +
            'href="#" class="' + playerLink + '">&#x25B6;</a>';

        r += "<tr style='height:30px;background:#" + bg +
          "'><td><a href='/records" + link +
          "'><b>" + name +
          "</b> " + timeSpan +
          '</td>'+ '<td>' +
          playerLink +
          '</td><td style="padding:0 20px">' + utcDateToStr(recordDate) + ' ' + utcTimeToStr(recordDate) +
          '</td><td>' + formatTime(length) +
          '</td><td>' + size + '</td></tr>\n';
      }
      r+= '</table>';
    }
    links += '<a href="/records/">Архив...</a>'

    document.getElementsByTagName('html')[0].innerHTML =
      getDefaultHtmlHeader("Записи") +
      '<div style="position:fixed;right:0;top:0" id="playerDiv"></div>' +
      '<center>' + links +
      '<br><br><div style="max-width:600px">Для прослушивания записей на сайте могут быть использованы следующие плагины: ' +
      '<a href="http://get.adobe.com/flashplayer/" target="_blank">Flash</a> (только MP3), ' +
      '<a href="http://www.videolan.org/vlc/" target="_blank">VLC</a>, ' +
      '<a href="http://www.apple.com/quicktime/download/" target="_blank">QuickTime</a> или ' +
      '<a href="http://www.interoperabilitybridges.com/windows-media-player-firefox-plugin-download" target="_blank">Windows Media Player</a><br>Чтобы сохранить файл в заданное место, кликните правой кнопкой по названию.</div><br>' +
      r + '</center></body></html>';
    function initPodcastsPage() {
      if (isPodcastsPageInitialized)
        return;
      isPodcastsPageInitialized = true;
      var playerAnchors = document.getElementsByClassName('playerMP3')
      for (var i in playerAnchors)
        playerAnchors[i].onclick = playMP3;
      playerAnchors = document.getElementsByClassName('playerOther')
      for (var i in playerAnchors)
        playerAnchors[i].onclick = playOther;
      addLinkToTop();
    }
    callInit(initPodcastsPage);
  }
  new Poller("/podcasts.js","podcasts",0,updatePodcasts,0);
}
else if (isKraskiPage && document.URL.indexOf('?rate') >= 0) {
  document.getElementsByTagName('html')[0].innerHTML = getRateForm();
}
else if (isKraskiPage && document.URL.indexOf('?songInfo') >= 0 || document.URL.indexOf('anon.fm/song') >= 0) {
  document.getElementsByTagName('html')[0].innerHTML = '';
  
  binaryPoll("/state.txt", true, function(data) {
    //alert(data.join(','));
    var time = null;
    var isLive = null;
    var isRec = null;
    var artist = null;
    var albumArtist = null;
    var composer = null;
    var title = null;
    var album = null;
    var name = null;

    var paramName = null;
    var start = 0;
    var end = 0;
    var dataStr = '';
    while (end < data.length) {
      dataStr += data[end] + ',';
      if (data[end] == 10) {
        var slice = data.slice(start, end);
        start = end + 1;
        if (paramName == null)
          paramName = decodeCp1252(slice);
        else {
          switch (paramName.toLowerCase()) {
          case 'time':
            try {
              time = parseInt(decodeCp1252(slice));
            }
            catch (e) { }            
            break;
          case 'islive':
            isLive = decodeCp1252(slice);
            break;
          case 'isrec':
            isRec = decodeCp1252(slice);
            break;            
          case 'artist':
            artist = smartDecode(slice);
            break;            
          case 'albumartist':
            albumArtist = smartDecode(slice);
            break;
          case 'composer':
            composer = smartDecode(slice);
            break;
          case 'title':
            title = smartDecode(slice)[0];
            break;
          case 'album':
            album = smartDecode(slice)[0];
            break;
          case 'name':
            name = smartDecode(slice)[0];
            break;
          }
          paramName = null;
        }
      }
      end++;
    }

    if (artist == null)
      artist = albumArtist != null ? albumArtist : composer;

    if (title != null) {
      if (artist == null) {
        var dashIndex = title.search(/\s[-‐–—]\s/);
        if (dashIndex > 0) {
          var newTitle = title.substring(dashIndex + 3).trim();
          artist = [ title.substring(0, dashIndex).trim() ];
          title = newTitle;
        }
      }
      else {
        for (var i in artist) {
          if (title.indexOf(artist[i] + ' ') == 0) {
            title = title.substring(artist[i].length).replace(/[-‐–—\s]*/, '');
            break;
          }
        }
      }
    }

    var filename = null;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/song', false);
    xhr.setRequestHeader("Range", "bytes=0-0");
    xhr.setRequestHeader("Pragma", "no-cache");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send();
    filename = xhr.getResponseHeader("Content-Disposition");
    filesize = xhr.getResponseHeader("Content-Range");
    xhr.abort();

    if (filename) {
      var a = filename.indexOf('"');
      if (a >= 0) {
        var b = filename.lastIndexOf('"');
        if (b < 0)
          b = filename.length;
        filename = decodeUtf8(encodeLatin1(filename.substring(a + 1, b)));
        if (filesize) {
          var c = filesize.indexOf('/');
          if (c >= 0) {
            filesize = parseInt(filesize.substring(c + 1));
            if (isNaN(filesize))
              filesize = null;
            else
              filesize = formatFileSize(filesize / 1024);
          }
        }
      }
    }

    var div = '<div style="display:inline-block;min-width:120px';
    var recDiv = div + ';margin:0 10px 0 10px;color:#d40">';
    div += ';margin:0 0 0 20px">';
    var divA = '<div style="display:inline;word-wrap:break-word';
    var divB = divA + ';font-weight:bold">';
    divA += '">';
    
    var html = getDefaultHtmlHeader('Информация о треке') +
      '<div style="margin:10px 0px 0px 5px;word-wrap:break-word">';
    if (artist != null)      
      html += div + 'Исполнитель:</div>' + divB + encodeHtml(artist[0]) + '</div><p>';
    if (title != null)      
      html += div + 'Название:</div>' + divB + encodeHtml(title) + '</div><p>';
    if (album != null)      
      html += div + 'Альбом:</div>' + divB + encodeHtml(album) + '</div><p>';      
    if (time != null)
      html += div + 'Длительность:</div>' + divB + encodeHtml(formatTime(time)) + '</div><p>';
    if (isLive == 1) {
      var recStr = isRec == 1 ? 'Запись эфира' : 'Прямой эфир';
      name = (name != null ? encodeHtml(name) : 'Radio Anonymous');
      html += recDiv + '●' + recStr + ':</div>' + divB + name + '</div><p>';
    }

    if (filename != null) {
      html += div + 'Файл:</div>' + divA + '<a href="/song?' +
        Math.random() + '">' + encodeHtml(filename) + '</a>';
      if (filesize != null)
        html += ' (' + filesize + ')';
      html += '</div><p>';
    }

    var fullTitle = [];
    if (artist != null)
      fullTitle.push(artist[0]);
    if (title != null)
      fullTitle.push(title);
    if (fullTitle.length == 0 && filename != null) {
      var dotIndex = filename.indexOf('.');    
      if (filename.indexOf('tube-') == 0 && dotIndex > 0)
        fullTitle.push('youtube ' + filename.substring(5, dotIndex));
      else
        fullTitle.push('"' + filename + '"');
    }
    if (fullTitle.length > 0) {
      fullTitle = fullTitle.join(" — ");
      html += div + 'Найти:</div>' + divA + getSearchLinks(fullTitle, true) + '</div>';
    }

    html += '<p>' + div + '<a href="?songInfo" onclick="window.location.reload(true);return false;">' +
      '<b>&#x21BB;</b> Обновить</a></div>';

    html += '<p><small>' + getLink('Статусная страница', 'http://anon.fm:8000', true) + 
      ' обновляется оперативнее, но, благодаря инновационной защите ' +
      'от дидоса, ваш плеер скорее всего временно отвалится после её открытия.</small>'
      '</div></body></html>';
    document.getElementsByTagName('html')[0].innerHTML = html;
  });
}
else if (isKraskiPage) {
  document.getElementsByTagName('html')[0].innerHTML = '';
  var themes = [
    {
    'name': 'красочная',
    '$bodyFore$': '#333',
    '$linksPanelBack$': '#5573B9',
    '$linksPanelH1$': '#BED',
    '$playerPanelBack$': '#996793',
    '$radiochanPanelBack$': '#D5DCEA',
    '$kookaPanelBack$': '#F5E9F4',
    '$newsPanelBack$': '#C9EFCE',
    '$newsFeedFore$': '#354',
    '$topPanelFore$': '#DDD',
    '$topPanelHoverFore$': '#FFF',
    '$shedPanelBack$': '#288837',
    '$shedPanelAltBack$': '#22732E',
    '$shedPanelSelectedBack$': '#C06512',
    '$shedPanelFore$': '#FFF',
    '$shedInfoFore$' : '#CEC',
    '$shedPanelH1$': '#BDB',
    '$shedPanelHover$': '#BFB',
    '$playerDark$': '#DDD',
    '$playerLight$': '#A7A',
    '$playerBorder$': '#B8B',
    '$disabledLink$': '#A7A'
    },
    {
    'name': 'светлая',
    '$bodyFore$': '#111',
    '$linksPanelBack$': '#EEE',
    '$linksPanelH1$': '#888',
    '$playerPanelBack$': '#EEE',
    '$radiochanPanelBack$': '#EEE',
    '$kookaPanelBack$': '#EEE',
    '$newsPanelBack$': '#EEE',
    '$newsFeedFore$': '#333',
    '$topPanelFore$': '#996793',
    '$topPanelHoverFore$': '#06F',
    '$shedPanelBack$': '#EEE',
    '$shedPanelAltBack$': '#DDD',
    '$shedPanelSelectedBack$': '#ECE',
    '$shedPanelFore$': '#111',
    '$shedInfoFore$' : '#888',
    '$shedPanelH1$': '#888',
    '$shedPanelHover$': '#06F',
    '$playerDark$': '#969',
    '$playerLight$': '#DCD',
    '$playerBorder$': '#CBC',
    '$disabledLink$': '#CCC'
    },
    {
    'name': 'тёмная',
    '$bodyFore$': '#EEE',
    '$linksPanelBack$': '#222',
    '$linksPanelH1$': '#849D88',
    '$playerPanelBack$': '#222',
    '$radiochanPanelBack$': '#222',
    '$kookaPanelBack$': '#222',
    '$newsPanelBack$': '#222',
    '$newsFeedFore$': '#CCC',
    '$topPanelFore$': '#B9B',
    '$topPanelHoverFore$': '#06F',
    '$shedPanelBack$': '#222',
    '$shedPanelAltBack$': '#333',
    '$shedPanelSelectedBack$': '#996793',
    '$shedPanelFore$': '#FFF',
    '$shedInfoFore$' : '#ACA',
    '$shedPanelH1$': '#849D88',
    '$shedPanelHover$': '#ADF',
    '$playerDark$': '#B9B',
    '$playerLight$': '#444',
    '$playerBorder$': '#555',
    '$disabledLink$': '#333'
    },
  ];
 
  var themeIndex = options['themeIndex'];
  isLightTheme = themeIndex == 1;
  theme = themes[themeIndex];
  theme['$vendorPrefix$'] = getVendorPrefix();
  theme['$kraskiPage$'] = kraskiPage;

  var mainHtml = getMainHtml().replace(/\$[A-Z_][0-9A-Z_]*\$/ig, function(tag) {
    return theme[tag] || tag;  
  });
  
  document.getElementsByTagName('html')[0].innerHTML = filterContent(mainHtml);

   function mainPageInit() {
 
      if (isMainPageInitialized)
        return;
      isMainPageInitialized = true;

      function getElementPosition(element)
      {
        if(typeof( element.offsetParent ) == "undefined")
          return [element.x, element.y];
        var posX = 0;
        var posY = 0;
        while (element)
        {
          posX += element.offsetLeft;
          posY += element.offsetTop;
          element = element.offsetParent
        }
        return [posX, posY];
      }

      function getCoordinates(img, e)
      {
        var posX = 0;
        var posY = 0;
        var imgPos = getElementPosition(img);
        if (!e)
          var e = window.event;
        if (e.pageX && e.pageY)
        {
          posX = e.pageX;
          posY = e.pageY;
        }
        else if (e.clientX && e.clientY)
        {
          posX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
          posY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
        }
        return [posX - imgPos[0], posY - imgPos[1]]
      }
      
      function openVideo() {
        document.getElementById('videoHolder').innerHTML = '<embed src="RTMPVideoPlayer.swf" width=640 height=480>';
      }

      function insertSplash(url) {
        var sImg = document.getElementById('splash');
        if (sImg == undefined) {
          sImg = document.createElement("IMG");
          sImg.id = "splash";
          var hold = document.getElementById('infoban');
          hold.insertBefore(sImg, hold.firstChild);
        }
        if (splashNow != url) {
          splashNow = url;
          if (!url)
            url = "/geomap.jpg";
          document.getElementById('splashRef').href = url;
          if (sImg.src != url)
            sImg.src = url;
        }
      }

      function updateInfo(info) {

        function setLink(link, url) {
          link = document.getElementById(link);
          if (url) {
            link.className = "";
            link.href = url;
            link.target = "_blank";
          }
          else {
            link.className = "disabledLink";
            link.href = "javascript:void(0)";
            link.target = "";        
          }        
        }
      
        splash = info["splash"];
        if (splashDJ != splash) {
          splashDJ = splash;
          insertSplash(splash);
        }
        setLink('videoLink', info["video"]);
        setLink('skypeLink', info["call"]);

        var sn = noticeGetFlags == 2;
        noticeGetFlags |= 1;
        var notice = info["ann"];
        if (notice != notices[1]) {
          notices[1] = notice;
          sn = noticeGetFlags == 3;
        }
        if (sn)
          kraskiFM.showNotices(); 
      }

      function refreshPlayNow() {
        document.getElementById('playnow').src = "radioanon.png?" + new Date().getTime();
      }

      function getColorRange(r1, g1, b1, r2, g2, b2, p) {
        var r = Math.round((r2 - r1) * p + r1);
        var g = Math.round((g2 - g1) * p + g1);
        var b = Math.round((b2 - b1) * p + b1);
        return ("rgb(" + r + "," + g + "," + b + ")");
      }

      logoCanvas = document.createElement("canvas");
      if (logoCanvas && logoCanvas.getContext) {
        logoCanvas.width = 200;
        logoCanvas.height = 200;
        var linksPanel = document.getElementById('linksPanel');
        linksPanel.appendChild(logoCanvas);
        logoImage = new Image();
        logoImage.onload = function () {
          canvas = document.createElement("canvas");
          canvas.width = logoCanvas.width;
          canvas.height = logoCanvas.height;
          var context = canvas.getContext('2d');
          if (context && context.getImageData && context.putImageData && context.drawImage) {
            context.drawImage(logoImage, 0, 0, canvas.width, canvas.height);
            var imgd = context.getImageData(0, 0, canvas.width, canvas.height);
            var pix = imgd.data;
           
            function safeColor(c) {
              if (c < 0)
                return 0;
              if (c > 255)
                return 255;
              return c;
            }
            
            var dr, dg, db;
            for (var i = 0, n = pix.length; i < n; i += 4) {
              var r = pix[i];
              var g= pix[i + 1];
              var b = pix[i + 2];
              if (!isLightTheme) {
                r = 255 - r;
                g = 255 - g;
                b = 255 - b;
              }
              if (i == 0) {
                var backColor = resolveColor(theme['$linksPanelBack$']);
                dr = backColor[0] - r;
                dg = backColor[1] - g;
                db = backColor[2] - b;
              }
              pix[i] = safeColor(r + dr);
              pix[i + 1] = safeColor(g + dg);
              pix[i + 2] = safeColor(b + db);
            }
            context = logoCanvas.getContext('2d');
            context.putImageData(imgd, 0, 0);
          }
        }
      }              

      function refreshAll(periodically) {
        var factor = 0;
        if (periodically) {
          factor = 1000;
          setInterval(refreshPlayNow, 10 * factor);
          setInterval(updateClock, 10 * factor);
        }
        refreshPlayNow();
        refreshTitle();
        updateClock();
        updateLogo();
        new Poller("/news.html", null, 60 * factor, updateNews, 0);
        new Poller("/answers.js", null, 10 * factor, updateKooka, 0);
        new Poller("/shed.js", "shed", 10 * factor, updateSched, 0);
        //new Poller("/splash.txt", null, 2.5 * factor, djSplash, 0);
        new Poller("/info.js", null, 2.5 * factor, updateInfo, 0);
        new Poller("/inra.js", null, 20 * factor, updateChat, 0);
        new Poller("/rate.js","rate", 15 * factor, updateRate, 0);
        new Poller("/bh.html", "bhd", 30 * factor, updateButthurt, 0);
        new Poller("/info.html", null, 300 * periodically, updateNotices, 0);
      }

      refreshAll(true);
      
      this.playerRestart = playerInit();

      document.getElementById("refreshLink").onclick = function() {
        refreshAll(false);        
        return false;
      }
      document.getElementById("feedbackLink").onclick = function() {
        window.open("/feedback/","winfeedback","top=300,left=400,width=560,height=235,toolbar=no");
        return false;
      }
      document.getElementById("songInfoLink").onclick = function() {
        window.open("/" + kraskiPage + "?songInfo","winSongInfo","top=200,left=400,width=640,height=400,toolbar=no");
        return false;
      }
      document.getElementById("rateLink").onclick = function() {
        window.open("/" + kraskiPage + "?rate","winrate","top=300,left=400,width=560,height=235,toolbar=no");
        return false;
      }
      document.getElementById("toTopLink").onclick = function() {
        window.scrollTo(0, 0);
        return false;
      }
      document.getElementById("toBottomLink").onclick = function() {
        window.scrollTo(0, document.body.scrollHeight);
        return false;
      }
      document.getElementById("showNoticesLink").onclick = function() {
        if (options['hiddenNotices'] != '') {
          setOption('hiddenNotices', '');
          kraskiFM.showNotices();
        }
        return false;
      }
      
      var themeSelector = document.getElementById("themeSelector");
      for (var i in themes)
        themeSelector.options.add(new Option(themes[i]['name'], i));
      themeSelector.selectedIndex = options['themeIndex'];
      themeSelector.onchange = function() {
        setOption('themeIndex', themeSelector.selectedIndex);
        window.location.reload(false);
      }

      var soundCheck = document.getElementById("messageSoundCheck");
      if (canOgg()) {
        soundCheck.checked = options['playSounds'] == 1;
        soundCheck.onchange = function() {
          setOption('playSounds', soundCheck.checked ? 1 : 0);
          if (soundCheck.checked)
            playOgg("newmessage");
        }
      }
      else {
        soundLabel = document.getElementById("messageSoundLabel");
        soundLabel.style.display = 'none';
        soundCheck.style.display = 'none';
      }
      
      var highStreamCheck = document.getElementById("highStreamCheck");
      highStreamCheck.checked = options['highStream'] == 1;
      highStreamCheck.onchange = function() {
        setOption('highStream', highStreamCheck.checked ? 1 : 0);
        playerRestart();
      }

      if (!isUserScript) {
        document.getElementById('oldDesignLink').style.visibility = 'visible';
        var scriptLink = document.getElementById('scriptLink');
        scriptLink.href = '/newdes-about.txt';
        scriptLink.innerHTML = 'О&nbsp;дизайне';
      }
      var m3uLink = document.getElementById("m3uLink");
      document.getElementById("splash").onclick = function(e) {
        var img = document.getElementById("splash");
        if (img.src.indexOf('geomap.jpg') < 0)
          return true;
        var coordinates = getCoordinates(img, e)
        posX = (coordinates[0] * 600 / img.width) + 2;
        posY = (coordinates[1] * 400 / img.height) - 1;
        var ss = Math.atan(Math.exp((200 - posY) / 90)) * 360 / Math.PI - 90;
        var dd = (posX - 300) / 560 * 360;
        window.open("https://maps.google.com/maps?ll=" + ss + "," + dd + "&z=7");
        return false
      }
      
      function updateRate(v) {
        return getHurtBox(v, true, true);
      }

      function updateButthurt(v) {
        var end = v.lastIndexOf("%</span></b>");
        if (end >= 0) {
          var beg = v.lastIndexOf(">", end);
          if (beg >= 0) {
            try {
              v = parseInt(v.substring(beg + 1, end));
            }
            catch (e) {
              return v;
            }
          }
        }
        return getHurtBox(v, false, false);
      }
      
      function getHurtBox(v, invertColors, normalizeValue) {
        var c = (v - 50) * 2;
        if (normalizeValue)
          v = c;
        c = getHurtColor(invertColors ? -c : c);
        return ("<b><span class='hurtbox' style='color:"
            + c
            + "'>" + (v > 0 && normalizeValue ? "+" : "") + (Math.round(v * 100) / 100)
            + '%</span></b>');
      }
      
      function updateClock() {
        var d = getStandardTime(null);
        var h = d.getUTCHours();
        var m = d.getUTCMinutes();
        document.getElementById("clock").innerHTML = (h < 10 ? "0" + h : h) + ":" + (m < 10 ?
          "0" + m : m) + " (МСК)";
        document.getElementById("shed").innerHTML = updateSched();
      }
      
      function updateLogo() {
        if (typeof(logoImage) != 'undefined') {
          var oldIndex = logoIndex;
          do {
            logoIndex = Math.floor(Math.random() * logoNames.length);
          }
          while (logoIndex == oldIndex);
          logoImage.src = '/imgs/logos/' + logoNames[logoIndex] + '.png';
        }
      }

      function refreshTitle() {
        top.document.title = "Радио «" + title[Math.floor(Math.random() * title.length)] + "»";
      }

      // butthurt value [-100..100]
      function getHurtColor(val) {
        var r = 0, g = 0, b = 0;
        var v = val / 2 + 50;
        if (v < 0) {
          b = 255;
          v = Math.abs(v);
        }
        if (v < 50) {
          g = 255;
          r = v * 5;
        }
        else {
          g = 255 - (v - 50) * 5;
          r = 255;
        }
        var min = 180;
        var max = 255;
        if (isLightTheme) { // light theme
          var min = 0;
          var max = 160;
        }
        var mul = (max - min) / 255;
        r = Math.floor(r * mul) + min;
        g = Math.floor(g * mul) + min;
        b = Math.floor(b * mul) + min;
        return('rgb(' + r + ',' + g + ',' + b + ')');
      }

      function updateSched(n) {
        if (n)
          sched = n;
        var now = Math.floor(new Date().getTime() / 1000);
        var r = filterContent('<h1>Расписание</h1><table class="shedTable">');
        var i = -1;
        var backColor = theme['$shedPanelAltBack$'];
        var altBackColor = theme['$shedPanelBack$'];
        var selectedBackColor = theme['$shedPanelSelectedBack$'];
        for (var q in sched) {
          var line = sched[q];
          if (line[1] <= now)
            continue;          
          i++;
          var beginTime = new Date(line[0] * 1000);
          var endTime = new Date(line[1] * 1000);
          var dj = line[2];
          var name = line[3];
          var bg = i % 2 == 0 ? altBackColor : backColor;
          if (line[0] <= now && line[1] > now)
            bg = selectedBackColor;
          beginTime = getStandardTime(beginTime);
          endTime = getStandardTime(endTime);
          r += '<tr style="background:' + bg + '">' +
            '<td class="shedInfoLeft">' + utcDateToStr(beginTime) + '</td>' +
            '<td class="shedInfoCenter">' + dj + '</td>' +
            '<td class="shedInfoRight">' + utcTimeToStr(beginTime) + '...' + utcTimeToStr(endTime) + '</td>' +
            '</tr><tr style="background:' + bg + '">' +
            '<td colspan=3>' + name + '</td>' +
            '</tr>\n';
        }
        r += "</table>";
        return (r + '<a style="display:block;float:right;margin:10px" href="shed-all.html" target="_blank">' +
          filterContent('Архив</a>'));
      }

      function updateChat(x) {
        var radioch = document.getElementById("radiochan");
        var n = "";
        x.reverse();
        for (var q in x) {
          var h = x[q].join("-");
          if (chatHistory.indexOf(h) < 0) {
            var date = new Date(x[q][0] * 1000 + 180000);
            date = getStandardTime(date);
            var time =
              zeros(date.getUTCHours(), 2) + ":" +
              zeros(date.getUTCMinutes(), 2) + ":" +
              zeros(date.getUTCSeconds(), 2);
            n += '<div class="somemsg"><span class="msgtime">(' + time + ')</span> <span class="somemsg_id">' + x[q][1] +
              '</span>: <span class="msgtext">' + x[q][2] + '</div></div>';
            chatHistory += h;
          }
        }
        if (n.length > 0) {
          radioch.innerHTML = n + radioch.innerHTML;
          radioch.scrollTop = 999999;
        }
      }

      function updateNotices(x) {

        x = x.replace(/(<script[^>]*>[\s\S]*?<\/script>)|(<!--[\s\S]*?-->)/ig, '');
        notices.length = 2;
        
        var m = x.match(/<div[^>]*class="ballon"[^>]*>/ig);
        if (m != null) {
          for (var i in m) {
            
            var k = x.indexOf(m[i]) + m[i].length;
            var inTag = false;
            var openDivs = 1;
            var s = '';
            for (; k < x.length - 10; k++) {
              if (inTag) {
                if (x[k] == '>')
                  inTag = false;
              }
              else if (x[k] == '<') {
                inTag = true;
                if (x[k + 1] != '/')
                  s += ' ';
                if (x.substring(k + 1, k + 4).toLowerCase() == 'div')
                  openDivs++;
                else if (x.substring(k + 1, k + 5).toLowerCase() == '/div') {
                  if (!(--openDivs))
                    break;
                }
              }
              else
                s += x[k];
            }
            
            var notice = s.replace(/\s+/ig, ' ').trim();
            notices.push(notice);
            x = x.substring(k) + 1;
          }
        }
        
        noticeGetFlags |= 2;
        if (noticeGetFlags == 3)
          kraskiFM.showNotices();
      }
      
      function updateNews(x) {
        x = x.split('<p>')
        var newHtml = '';
        for (var i in x) {
          var line = x[i];
          if (line.length > 0 && newsHistory.indexOf(line) < 0) {
            newsHistory.push(line);
            newHtml += '<p>' + line;
          }
        }
        if (newHtml.length > 0) {
          var newsDiv = document.getElementById("newsfeed");
          newsDiv.innerHTML = newHtml + newsDiv.innerHTML;
        }
      }

      function urlify2(text) {
        return text.replace(urlRegex, function(url) {
          var prefixMatch = urlPrefixRegex.exec(url);
          return '<a href="' + (prefixMatch != null && prefixMatch.index == 0 ? url : 'http://' + url) + '" target="_blank">' + url + '</a>';
        });
      }
      
      function urlify(text) {
        var len = text.length;
        if (len == 0)
          return text;
        var res = "";
        var i = 0;
        while (i < len) {
          var beg = text.indexOf("<a", i);
          var end = text.indexOf("/a>", i);
          if (beg >= 0 && end >= 0) {
            res += urlify2(text.substring(i, beg)) + text.substring(beg, end + 3);
            i = end + 3;
          }
          else {
            res += urlify2(text.substring(i, len));
            break;
          }
        }
        return res;
      }

      function updateKooka(b) {
        var isUpdate = false;
        var wasEmpty = kookaPosts.length == 0;
        for (var q = b.length - 1; q >= 0; q--) {
          var line = b[q];
          var uniq = line[3];
          if (typeof (kookaUniq[uniq]) == "undefined") {
            kookaPosts.push(renderKooka(line[0], line[1], urlify(line[2]), line[3], line[4], urlify(line[5])));
            kookaUniq[uniq] = 1;
            isUpdate = true;
          }
        }
        if (isUpdate) {
          printKooka();
          if (!wasEmpty && options['playSounds'] == 1)
            playOgg("newmessage");
        }
      }

      function printKooka() {
          var rr = [].concat(kookaPosts);
          rr.reverse();
          document.getElementById("kookareque").innerHTML = rr.join("");
      }

      function renderKooka(type, hash, quote, time, who, text) {
        var n = time.indexOf('>');
        var m = time.lastIndexOf('.')
        if (n >= 0 && m >= n)
          time = time.substring(0, n + 1) + ' в ' + time.substring(n + 1, m) + '</span>';
        else
          time = ' в ' + time;
        var divisor = '" style="margin-right:8px">: </span>';
        var userDivisor = '<span class="user_id' + divisor;
        var djDivisor = '<span class="dj' + divisor;
        var djname = '<span class="dj">Диджей</span>';
        var body = "";
        if (hash != "!") {
          body = '<p><span class="user_id">' + hash + '</span>' + time + userDivisor +
            '<span class="userpost">' + quote + '</span><br>' + djname + djDivisor;
        }
        else {
          body = '<p>' + djname + time + djDivisor;
        }
        body += text + '</p>';
        return body;
      }

   }

  mainPageInit();
}
else if (document.URL.indexOf('http://userscripts.org/scripts/show/168570') == 0) {

  function verToNum(s) {
    var mul = 0x1000000;
    var res = 0;
    var parts = s.split('.');
    for (var i in parts) {
      res += parts[i] * mul;
      mul /= 256;
    }
    return res;
  }
  var elems = document.getElementsByTagName('div');
  if (elems.length) {
    var versionRegex=/\d+\.\d+\.\d+\.\d+/;
    for (var i in elems) {
      if((' ' + elems[i].className + ' ').indexOf(' script_summary ') >= 0) {
        var versionMatch = versionRegex.exec(elems[i].innerHTML);
        if (versionMatch != null) {
          var a;
          var a2 = null;
          if (verToNum(versionMatch[0]) > verToNum(currentVersion)) {
            a = document.createElement('a');
            a.innerHTML = 'Вы используете версию ' + currentVersion + '. Обновите скрипт!';
            a.href = 'http://userscripts.org/scripts/source/168570.user.js';
            a.style.color = 'red';
            a.style.textDecoration = 'none';
            a2 = document.createElement('a');
            a2.innerHTML = ' Что нового?';
            a2.href = '#footer';
            a2.style.textDecoration = 'none';
            var hElems = document.getElementsByTagName('h1');
            if (hElems.length) {
              for (var hElem in hElems) {
                if (hElems[hElem].innerHTML.indexOf('История версий') >= 0) {
                  hElems[hElem].id = 'history';
                  a2.href = '#history';
                  break;
                }
              }
            }
          }
          else {
            a = document.createElement('div');
            a.innerHTML = 'Вы используете последнюю версию скрипта.';
          }
          a.style.fontWeight = 'bold';
          elems[i].appendChild(a);
          if (a2 != null)
            elems[i].appendChild(a2);
          elems[i].appendChild(document.createElement('p'));
          break;
        }
      }
    }
    addLinkToTop();
  }
}

} // var initScript

} // var kraskiFM

kraskiFM.initScript();