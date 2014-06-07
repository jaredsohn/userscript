// ==UserScript==
// @name           Google Reader Checker
// @namespace      http://ajnasz.hu/blog/20070404/google-reader-checker-greasemonkey
// @description    Shows, if you have any unreaded feed on your google reader
// @include        *
// @exclude        *reader.google.com/*
// @exclude        *google.com/reader/*
// ==/UserScript==

const GRIMAGE = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D7%04%04%068%0EM%A7Z%EE%00%00%02%7BIDAT8%CB%7D%93%BDOSQ%18%C6%7F%A7%B4%BD%B7%10%FAAi%C1%C8%00L~l%40%9A%881%1AC%97%8E%86%88%C1%C9DC489%18%13%FF%00%077%13%5DLH%1CLH%D8ta%F1%23%22%9A%A6%A9%81%08V%E4%A3%12%1A%8Bmi%7Bm%CB%BD%B7%1F%C7%A1%B6%051%3E%D39'%E7y%F2%3E%CF%FB%BE%02%60%E6YD%16%0AY%FE%87%DB%B7%82%E2_%EFb%E6YD%FA%FD%C7%09%8C%F4%D0%ED%AD%FF%D9%DC%D2%C9%FD%B2%A1%EBUt%A3%86%5E%CA%F1ii%85%FBw%C7%8E%88X%01z%8F%F9%D8N%D4%D0%B42N%A7%C2%E0%80J%3A%23%09G%2BP%CB%A1%15%04%B9%EC%1E%B3s%11y%90%3C1%3E%22%AC%00%B9%7C%19%5D%17%24w%05%60%02%10%18%B2%13%0A*%2C%86%BB%80%3D%A4p12t%BAI%FE%91%D4%98%9D%8BH%0B%80%A6%19MB(%A8%60%9A%3A%0B%1F5%D2%19%C9h%C0%8EYq%E0q%B718%A0%02%90LY%10mnJ%A5%3F%16%ECv%95%B5%8D2%8F%1E%BF%04%A0T%AA%E2%F6t%F1~a%8F%7D%BD%82%EA%F0%22d%9E%EB7%9F%F3%F4%C9%24%A0%93LYZ%19%A8%AA%E4%F5%9B%05N%9E%3A%CB%D8%05%3F%DD%5EA%3A%23%D14%83%D8z%2B%B7%82%F6%B9)%92L%99%B4%B7%83%05%C0%ED%B2%01%E0%F7%BBX%DB(%13%5D%AE%0208%A0%12%0A*%B8%5D%02%D3%D4)%1A'%9Ab%BD%BE%1A%A9%8C%A8W%E0%EE%2C%D3%C8%E2%7B%DE%0A%94%F9%B2f%C5%E3%AA%879%1A%B0%F3%EA%5D%8Dl%BEz%A8%85%3E%AF%C4R%DC%17%2C%AF%1A%00d%F3V%CE%9Fi%E3%DAd%07W%C7%15%00%5E%CC%97Hg%24%17%CF%A98%94BsN%1A%81Z%A6%A7%86E%22%B1%D1T%8D%AD%0B%16%C3%26%9B%5B%3A%A1%A0B%8F%CFJ8j6-6%90%CE%D4G%C2%020%3D5%2C%00%3C%AE%0A%9Bq%83%E8%92%CE%DB%0FU%D2%19I(%A8%B0%9B%AA%90%CEH%FA%FB%40U%05%F1%1D%08Gv%5B%02%0D%F8%7D%0E%A6o8%B9r%A9%93b%B1%DA%B4V%2CV%D14%03%A7SA%D7%25%E9%9F%2B%14%0A%89%D6%24%FE%8D%C6N4J%F5x%14%E2%3B%92%FE%3E%03U%15L%8C%8F%88C%BB%D0%C0%D7%F52%B9%BC%84Z%96%8E%8ENVc%26%AB%B1%BA%FFl%16%B6%E3%DF%8En%E3%C1%CB%9D%7B%F3%B2%5C%EF(6%1B%1C%3C%03%08%99%E7%E1%83%CB%878%BF%01%D9%F8%15%F6tj%8A.%00%00%00%00IEND%AEB%60%82"
  GM_addStyle(
  '#GoogleReaderChecker'
  +'{'
  +'  position: fixed;'
  +'  bottom: 0;'
  +'  font-size: 14px;'
  +'  font-family: sans-serif;'
  +'  font-weight: bold;'
  +'  padding: 0 2px 4px;'
  +'  text-align: center;'
  +'  right: 20px;'
  +'  border-top: 2px solid #C3D9FF;'
  +'  border-left: 2px solid #C3D9FF;'
  +'  border-right: 2px solid #C3D9FF;'
  +'  color: #1635CC;'
  +'  background: #fff;'
  +'  width: 50px;'
  +'  height: 15px;'
  +'  opacity: 0.4;'
  +'}'
  +'#GoogleReaderChecker:hover'
  +'{'
  +'  opacity: 1;'
  +'}'
  +'#GoogleReaderChecker img'
  +'{'
  +'  float:left;'
  +'  margin-top:2px;'
  +'  border:0;'
  +'}'
  +'#GoogleReaderChecker a'
  +'{'
  +'  color: #1635CC;'
  +'  text-decoration: none;' 
  +'}'
  +'#GoogleReaderChecker a:hover'
  +'{'
  +'  text-decoration: none;' 
  +'}'

);

getReadlist = function() {
  GM_xmlhttpRequest({
    method: 'get',
    url: "http://www.google.com/reader/api/0/unread-count?all=true&output=json&client=gm",
    onload: function(r) {
      var unr = countUnread(r);
      if(unr > 0)
      {
        showCounter(unr);
      }
      else
      {
        hideCounter();
      }
    },
    onerror: function(e)
    {
      hideCounter();
    }
  });
};

countUnread = function(r)
{
  var data = eval('('+r.responseText+')'), unrcount = 0;
  if(data) {
    uc = data.unreadcounts;
    for(var i=0; i<uc.length; i++) {
      if(uc[i].id.match('^feed')) {
        unrcount += uc[i].count;
      }
    }
  }
  return unrcount;
};

createGRChecker = function()
{
  hideCounter();
  if(!document.getElementById('GoogleReaderChecker'))
  {
      if(window.parent != window)
    {
      return false;
    }
    var grch = document.createElement('div');
    grch.id = 'GoogleReaderChecker';
    document.body.appendChild(grch);
  }
  return true;
};

showCounter = function(count)
{
  if(!createGRChecker()) { return false; }
  var link = document.createElement('a');
  var img = new Image();
  var linkcont = document.createTextNode(count);
  link.href = 'http://reader.google.com';
  img.src = GRIMAGE;
  link.appendChild(img);
  link.appendChild(linkcont);
  document.getElementById('GoogleReaderChecker').appendChild(link);
}

hideCounter = function()
{
  if(document.getElementById('GoogleReaderChecker'))
  {
    document.body.removeChild(document.getElementById('GoogleReaderChecker'));
  }
}

getReadlist();
window.setInterval(getReadlist, 60000);
