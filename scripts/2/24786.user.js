// ==UserScript==
// @name           GetNicovideoInfoCommand
// @namespace      http://d.hatena.ne.jp/Constellation/
// @description    get info on nicovideo / watch nicovideo on another page
// @include        http://www.nicovideo.jp/*
// @author         Constellation
// @version        1.0.0
// ==/UserScript==

function boot(ev){
if(ev) removeEventListener('GM_MinibufferLoaded', arguments.callee, false);

var CSS = <><![CDATA[
#gm_overlay {
background-color:black;
left:0pt;
position:absolute;
top:0pt;
width:100%;
z-index:1000;
opacity: 0.5;
}
#gm_player {
position: absolute;
text-align:center;
z-index:1500;
}
]]></>.toString();

let w = this.unsafeWindow;
if (/http:\/\/www\.nicovideo\.jp\/(ranking|search|tag)/.test(location.href))
  var info = RegExp.$1;
else
  return;

let watchmode = false;

let {$X, $N, addShortcutkey, addCommand, execute, status} = window.Minibuffer;

addStyle(CSS, 'gm_css');
let overlay = $N('div', {id : 'gm_overlay'});
overlay.setAttribute('style','display:none;');
document.body.appendChild(overlay);
var textX = {
  ranking : 'td//p[@class="font12"]',
  search : './/p[@class="font10"]',
  tag    : './/p[@class="font10"]',
  mylist : 'td//p[@class="font12"]'
};
var dataF = {
  'ranking' : function(nickname) '\u3000\u0075\u0070\u4E3B\uFF1A<strong>' + nickname + '</strong>',
  'search'  : function(nickname) '<br/>\u0075\u0070\u4E3B\uFF1A<strong>' + nickname + '</strong>'
};
dataF['mylist'] = dataF['ranking'];
dataF['tag'] = dataF['search'];
[
  {
    name : 'Nicovideo::GetUserName',
    command : function(stdin){
      try{
        stdin = zip(execute('pinned-or-current-node'), execute('pinned-or-current-link'));
      } catch(e){}
      stdin.forEach(function([node, {href:link}]){
        let text = $X(textX[info], node)[0];
        let match;
        if(match = link.match(/(\d+$)/)){
          var videoId = match[1];
        } else {
          return;
        }
        smileAPICallback({
          id : videoId,
          url : 'http://www.smilevideo.jp/view/',
          error : function(){status(videoId, 'Error' + videoId, 100)},
          callback : function({responseText}){
            let match;
            if(match = responseText.match(/<p class="TXT12"[^>]*><strong>(.*?)<\/strong>\u0020\u304c\u6295\u7a3f\u3057\u305f\u52d5\u753b/)) {
              let nickname = 'no name';
              nickname = decodeURIComponent(match[1]);
              text.innerHTML += dataF[info](nickname);
            }
            status(videoId, 'Loading...done', 100);
          },
        });
        status(videoId, 'Loading...');

      });
    },
  },
  {
    name : 'Nicovideo::WatchVideo',
    command : function(stdin){

      stdin.forEach(function(a){
        let link = a.href;
        let videoId = link.match(/[^\/]+$/)[0];
        let url = 'http://www.nicovideo.jp/thumb_watch/' + videoId;
        let height = getPageSize()[1];
        overlay.setAttribute('style','height:' + height + 'px;display:block;');
        let script = $N('script', {id : 'gm_script', src : url});
        let bak_write = w.document.write;
        w.document.write = function(html) {
          w.document.write = bak_write;
          let player = $N('div', {id : 'gm_player'});
          player.innerHTML = html;
          setCenter(player);
          document.body.appendChild(player);
          w.document.close();
        };
        document.body.appendChild(script);
      });
      watchmode = true;
    },
  }
].forEach(addCommand);
[
  {
    key: 'n',
    description: 'Nicovideo::WatchVideo',
    command: function(){
      if(!watchmode){
        let stdin = [];
        try{
          stdin = execute('current-link');
        } catch (e){}
        execute('Nicovideo::WatchVideo', stdin);
      } else {
        ['gm_player', 'gm_script'].forEach(remove);
        overlay.setAttribute('style','display:none;');
        watchmode = false;
      }
    }
  },
  {
    key: 'N',
    description: 'Nicovideo::GetUserName',
    command: function(){
      execute('Nicovideo::GetUserName | clear-pin');
    }
  }
].forEach(addShortcutkey);

// なんとなく関数化 ニコニコのAPIをぺしぺし叩つもりだったが何でもあり状態に。
function smileAPICallback(obj){
  var list = ['id', 'callback', 'error', 'url'], ok = true;
  list.forEach(function(i){
    if(!obj[i]) ok = false;
  });
  if(ok){
    var opt = {
      method: 'GET',
      url: obj.url + obj.id,
      onload: obj.callback,
      onerror: obj.error
    }
    window.setTimeout(GM_xmlhttpRequest, 0, opt);
  }
}

function addStyle(css,id){
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = 'data:text/css,' + escape(css);
	document.documentElement.childNodes[0].appendChild(link);
}

function remove(el){
  el = document.getElementById(el);
  el.parentNode.removeChild(el);
}
function zip(a1, a2){
  let len1 = a1.length, len2 = a2.length, len = (len1 > len2)? len2 : len1, ret = [];
  for(let i = 0; i < len; ++i) ret[i] = [a1[i], a2[i]];
  return ret;
}
function setCenter (elm){
  var pageSize = getPageSize();
  var elmTop = w.scrollY + (385 / 2);
  var elmLeft = (pageSize[0] - 485) / 2;
  elm.style.top = (elmTop < 0) ? "0px" : elmTop + "px";
  elm.style.left = (elmLeft < 0) ? "0px" : elmLeft + "px";
}

// 正直getPageSize作るのが一番時間がかかった。
function getPageSize(){
  var xScroll, yScroll, windowWidth, windowHeight;
  xScroll = w.innerWidth + w.scrollMaxX;
  yScroll = w.innerHeight + w.scrollMaxY;
  windowWidth = self.innerWidth;
  windowHeight = self.innerHeight;
  if(yScroll < windowHeight){
    pageHeight = windowHeight;
  } else {
    pageHeight = yScroll;
  }
  if(xScroll < windowWidth){
    pageWidth = windowWidth;
  } else {
    pageWidth = xScroll;
  }
  return [pageWidth, pageHeight];
}

function log() {if(console) console.log.apply(console, Array.slice(arguments));}

}

if(window.Minibuffer){
  boot();
} else {
  window.addEventListener('GM_MinibufferLoaded', boot, false);
}
