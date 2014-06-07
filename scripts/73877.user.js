// ==UserScript==
// @name          Libron
// @namespace     http://libron.net
// @description	  Amazon のページから最寄りの図書館の蔵書を検索
// @author        Junya Ishihara(http://champierre.com)
// @include       http://www.amazon.*
// @license       MIT License(http://en.wikipedia.org/wiki/MIT_License)
// @version       3.0.5
// @updateURL     https://userscripts.org/scripts/source/73877.meta.js
// @downloadURL   https://userscripts.org/scripts/source/73877.user.js
// ==/UserScript==

var libron = libron ? libron : new Object();
libron.version = "3.0.5";

// http://ja.wikipedia.org/wiki/都道府県 の並び順
libron.prefectures = ["北海道",
  "青森県","岩手県","宮城県","秋田県","山形県","福島県",
	"茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
	"新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県",
	"三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県",
	"鳥取県","島根県","岡山県","広島県","山口県",
	"徳島県","香川県","愛媛県","高知県",
	"福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県",
	"沖縄県"];

libron.logo = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAAC0AAAAUCAMAAAAusUTNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ'+
    'bWFnZVJlYWR5ccllPAAAAYBQTFRFdHJu49/WjouGFBMTzcnB2tfObmxoWllWtbKraGZiwb637erj'+
    'hIJ+ZWRgp6SeXl1ZDAwLl5SPHBwbj42JxcO9ubaxYF5bAgICcG5rraulYmFd1dHJRkVDQkA+ZGJf'+
    'gX97pKKcJiYkkY6JLi4sXFtYNDMxLCsp6eXc6+jg6ebd6OTb7Onh7OjhKSgn7Oni6+ffRENAUlBN'+
    '7uvk7eni6uffsa6n6OTc6ubdnpyVPDs5IyMh4NzT6+fgnJmTqaagVVNQ2NTMxcG6ysa/V1ZSmZaQ'+
    'U1JPz8zET05L5ODY5eHY6OXcamhlbWtnSEdFx8S83dnR19TNfnx539zUfnt36ufh5+Td5uPciYeD'+
    'dnVweHZxNzY1y8jBSkhGm5iTIB8enpuW0s/G7uvlpKGb3tvUk5GLlJKM5uLbOTg24N3W4d7XrKmi'+
    'uLWu3drTMTAug4F8vLmzhYN/i4mDop+ZeXhze3l0JCQi5OHZ4t/Yw7+47urkOjo4Pz47hIJ96eXd'+
    '6ube6OTb4C1nnAAAAIB0Uk5T////////////////////////////////////////////////////'+
    '////////////////////////////////////////////////////////////////////////////'+
    '/////////////////////////////////////////wA4BUtnAAAB30lEQVR42rST13PaQBDGBULG'+
    'mEAE2DqIDQ6mnLqsQu8lbuCS3p3E6Z1Up93tv26JJC+Z8dh+yD7tffObvW/39hg4SzD/md45A/3Q'+
    '1ACflq7WUcGQTl27wf9Q6O9DL32y79zSH3oYL55M1y6prpPFSAhW4okB+wq4q53bWmcXfP48y6ZL'+
    'ANWCN4yh5tGrHt2PoHOkut+EwUyvhm5V+uhgbSmgKAsFNIzWEJqDgPlF9OjzoiQDpGO0fQ+6xVkK'+
    '6zHo17lsSlFFh8uxXxt8McsB5HWPFpoefeEBLqV/1flQAwS/v7A2ixYdXAZoobuQfbFd8wEzrW1u'+
    'eR0IMShp8+prPgIdc8B32yg17ayNXsJ++FBb3/xMPfq5z1ODEyi9xRgyY9lc4dgZjtcanp4cKcC+'+
    'MXq8OXbpzTqKhz6Muz8jlRYfbEWXD8lqUn+Kvn1E2Wog8C54zdlFF0X5CRq5TnbuJ/zCzcd7k8SN'+
    'xERYntfFjU+Xr1Mhe+V9JncnkworJDpJqQTnkzYjEzFsWWHFEHVVtK3vikNIU1fpxqiwp1iPLFus'+
    'YKrqBibPFhRGxqRCKSWYSIRME3nLTbFkHGwzc6pBsewiroolhx6731gSbXv6EH9DLpeP/w1l9ybp'+
    'n1U+EmAAVC9EkhaYTkMAAAAASUVORK5CYII=';

libron.okIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWRE'+
    'IYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n'+
    '7MVMEiN64AsPD8/n83uucQDi/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+b'+
    'Sss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D'+
    '40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA'+
    '5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP'+
    '5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU'+
    '/rH5HW3PLsEwUYy+YCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo'+
    '+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG+UAa7Ct3'+
    'UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7'+
    'nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXO'+
    'IvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag'+
    '5YUFKl6Yrciw0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==';

libron.ngIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLpZNraxpBFIb3a0ggISmmNISW'+
    'XmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg'+
    '/I/GDw3DCo8HCkZl/RlgGA0e3Yfv7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkU'+
    'QTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVl'+
    'babTgWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDu'+
    'sPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5ebqzszil7DggeF/DX1nB'+
    'N82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQo'+
    'wFUbpufr1ct4ZoHg+Dg067zduTmEbq4yi/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbU'+
    'FPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4'+
    'g/2e3b8AAAAASUVORK5CYII=';

libron.loadingIcon = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh'+
    '/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklr'+
    'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAA'+
    'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
    'KhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
    'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
    'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzII'+
    'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAA'+
    'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
    'ibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
    'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
    'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

libron.calilIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEBg4oF3uKapIAAACRSURBVDjL'+
    'nVPbDcAgCDyJMziEC9URXaju0C5hPxoMUXzy40UOOFBMzhkAENL7g0WL3hkAoJNgGUMMonc71UsS'+
    '0hwrwWxWI4T0NkTtrsxgVmWkjmQFPhnXCiSnSSArcBs9+RKb6362X0GqoBlJa2c4gxrP/KUF5ZN0'+
    'sbQmwWgemjK7SuzOgLfqxKJ3huRqnqzzBwE6Xrqxh9tpAAAAAElFTkSuQmCC';

// カーリル(http://calil.jp)APIキー
libron.appkey = "73ec9cd9e4b62b65b9549dc173750e9c";
libron.siteUrl = "http://libron.net/liburls/show?url=";

libron.libraries = {};
libron.libraryNames = {};

libron.createElement = function(tagName, attributes, content) {
  var dom = document.createElement(tagName);
  for (var key in attributes) {
    dom.setAttribute(key, attributes[key]);
  }
  if (content) {
    dom.textContent = content;
  }
  return dom;
}

if (isGreasemonkey()) {
  main();
} else { //こっちの場合はラッパーと一緒に読み込まれているのでonReadyGMイベントを受け取ってから初期化
  function onReadyGM(){
    main();
  }
}

/*
 * メイン
 */

function main() {
  if (isSafariExtension()) {
    safari.self.addEventListener("message", getResponse, false);
  }
  
  libron.selectedSystemId = GM_getValue("selectedSystemId") ? decodeURIComponent(GM_getValue("selectedSystemId")) : 'Tokyo_Pref';
  libron.selectedSystemName = GM_getValue("selectedSystemName") ? decodeURIComponent(GM_getValue("selectedSystemName")) : '東京都立図書館';
  libron.selectedPrefecture =　GM_getValue("selectedPrefecture")　? decodeURIComponent(GM_getValue("selectedPrefecture")) : '東京都';
  libron.univChecked = (GM_getValue("univChecked") === "true") ? true : false;
  libron.systemNames = {};

  var href = document.location.href;

  if (parent != self) {
    return;
  }

  addStyle();
  addSelectBox();

  if (isBookList(href)) {
    addLibraryLinksToBookList();
    
    document.addEventListener("DOMSubtreeModified", function(event){
      if (event.target.id == "rightResultsATF") {
        setTimeout(addLibraryLinksToBookList, 1000);
      }
    });
  } else if (isbnOfBookPage(href)) {
    addLibraryLinksToBookPage(isbnOfBookPage(href));
  } else if (isWishList(href)) {
    addLibraryLinksToWishList();
  } else if (isbnOfMobileBookPage(href)) {
    addLibraryLinksToMobileBookPage(isbnOfMobileBookPage(href));
  }
  return;
}

/*
 * 書籍リストページ or 書籍単体ページ or ほしい物リスト 判定用
 */

function isBookList(href) {
  if ((href.indexOf('/s?') != -1) || (href.indexOf('/s/') != -1) || (href.indexOf('/gp/search') != -1)) {
    return true;
  }
  // if (href.indexOf('/exec/') != -1) {
  //   return true;
  // }
  // 新着ニューリリース http://www.amazon.co.jp/gp/new-releases/books/ref=sv_b_2
  if (href.indexOf('/gp/new-releases/') != -1) {
    return true;
  }
  return false;
}

function isbnOfBookPage(href) {
  var matched = href.match(/\/(dp|ASIN|product)\/([\dX]{10})/);
  if (matched && matched[2]) {
    return matched[2];
  }
  return false;
}

function isWishList(href) {
  if (href.indexOf("/wishlist") != -1) {
    return true;
  }
  return false;
}

function isbnOfMobileBookPage(href) {
  var matched = href.match(/\/gp\/aw\/d\/([\dX]{10})/);
  if (matched && matched[1]) {
    return matched[1];
  }
  return false;
}

/*
 * CSS定義
 */

function addStyle() {
  var style = "\
div#libron_select{\
  border:1px solid #cbc6bd;\
  background:#e8e4db;\
  -moz-border-radius:5px;\
  -webkit-border-radius:5px;\
  font-size:14px;\
  padding:7px;\
}\
div#libron_select img{\
  vertical-align:-5px;\
}\
div#libron_select span#title{\
  font-weight:bold;\
  color:#e47911;\
}\
div#libron_select_box{\
  display:none;\
}\
div#libron_select_box select,button{\
  margin-left:10px;\
}\
div#libron_select_box a{\
  margin-left:3px;\
}\
div#libron_select_box #loading-message{\
  margin-left:10px;\
  color:#e47911;\
  padding-right:70px;\
}\
.libron_left{\
  float:left;\
}\
.libron_right{\
  float:right;\
}\
.libron_gray{\
  color:#666666;\
}\
.libron_clear{\
  clear:both;\
}\
div.libron_link_div{\
  display:table;\
  width:300px;\
  padding:7px;\
  border:1px solid #cbc6bd;\
  background:#e8e4db;\
  -moz-border-radius:5px;\
  -webkit-border-radius:5px;\
  font-size:12px;\
  margin-bottom:10px;\
}\
div.libron_link_div div{\
  padding:0 !important;\
  margin:0 !important;\
}\
div.libron_link_div div.calil_link{\
  margin-top:5px !important;\
}\
div.libron_link_div img{\
  vertical-align:middle;\
}\
";
  var head = document.getElementsByTagName('head')[0];
  var element = head.appendChild(window.document.createElement('style'));
  element.type = "text/css";
  element.textContent = style;
}

/*
 * ページ上部に図書館選択ボックスを表示
 */

function addSelectBox() {
  var div = libron.createElement("div", {id: "libron_select"}, null);
  var titleDiv = libron.createElement("div", {class: "libron_left"});
  var titleSpan = libron.createElement("span", {id: "title"}, " ver." + libron.version);
  var logoImg = libron.createElement("img", {src: libron.logo}, null);
  var infoDiv = libron.createElement("div", {id: "libron_info", class: "libron_right"});
  var currentLibrary = libron.createElement("span", {class: "libron_gray"}, "[" + libron.selectedPrefecture + "]" + libron.selectedSystemName + "で検索 ");
  var showLink = libron.createElement("a", {href: "javascript:void(0);"}, "変更");
  showLink.addEventListener("click", showSelectBox, false);

  titleDiv.appendChild(logoImg);
  titleDiv.appendChild(titleSpan);

  infoDiv.appendChild(currentLibrary);
  infoDiv.appendChild(showLink);
  
  var univCheckBox = document.createElement("input");
  univCheckBox.type = "checkbox";
  univCheckBox.id = "univ";
  univCheckBox.checked = libron.univChecked;

  var univCheckBoxLabel = libron.createElement("label", {for: "univ", class: "libron_gray"}, "大学図書館も表示");
  
  univCheckBox.addEventListener("change", function(){
    selectBoxDiv.replaceChild(loadingMessage, selectBoxDiv.childNodes[3]);
    libron.univChecked = univCheckBox.checked;
    updateLibrarySelectBox(selectBoxDiv, prefectureSelect.value, libron.univChecked);
  }, false);
  
  var prefectureSelect = libron.createElement("select", {id: "prefecture_select"}, null);

  for (var i in libron.prefectures) {    
    var option = document.createElement('option');
    option.value = libron.prefectures[i];
    option.textContent = libron.prefectures[i];
    if (libron.prefectures[i] == libron.selectedPrefecture) {
      option.selected = true;
    }
    prefectureSelect.appendChild(option);
  }
  
  var loadingMessage = libron.createElement("span", {id: "loading-message"}, "データ取得中...");
  var btn = libron.createElement("button", null, "保存");
  var hideLink = libron.createElement("a", {href: "javascript:void(0);"}, "キャンセル");
  hideLink.addEventListener("click", hideSelectBox, false);
  var selectBoxDiv = libron.createElement("div", {id: "libron_select_box", class: "libron_right"}, null);

  selectBoxDiv.appendChild(univCheckBox);
  selectBoxDiv.appendChild(univCheckBoxLabel);
  selectBoxDiv.appendChild(prefectureSelect);
  selectBoxDiv.appendChild(loadingMessage);
  selectBoxDiv.appendChild(btn);
  selectBoxDiv.appendChild(hideLink);
  
  updateLibrarySelectBox(selectBoxDiv, libron.selectedPrefecture, libron.univChecked);

  prefectureSelect.addEventListener("change", function(){
    selectBoxDiv.replaceChild(loadingMessage, selectBoxDiv.childNodes[3]);
    libron.selectedPrefecture = prefectureSelect.value;
    updateLibrarySelectBox(selectBoxDiv, prefectureSelect.value, libron.univChecked);
  }, false);

  var clearDiv = libron.createElement("div", {class: "libron_clear"}, null);

  div.appendChild(titleDiv);
  div.appendChild(infoDiv);
  div.appendChild(selectBoxDiv);
  div.appendChild(clearDiv);

  document.body.insertBefore(div, document.body.childNodes[0]);
  
  btn.addEventListener("click", function(){
    var options = {
      'prefecture': prefectureSelect.value,
      'systemid': selectBoxDiv.childNodes[3].value,
      'systemname': libron.systemNames[selectBoxDiv.childNodes[3].value],
      'univChecked': univCheckBox.checked
    };
    saveSelection(options);    
    window.location.reload();
  }, false);
}

/*
 * 図書館選択ボックス関連
 */

function showSelectBox() {
  document.getElementById('libron_info').style.display = 'none';
  document.getElementById('libron_select_box').style.display = 'block';
  return false;
}

function hideSelectBox() {
  document.getElementById('libron_info').style.display = 'block';
  document.getElementById('libron_select_box').style.display = 'none';
  return false;
}

function createLibraryNames(prefecture, libraries, cities) {
  var smallMediumLibrariesObject = {};
  var smallMediumLibraries = [];
  var largeLibraries = [];
  var univLibraries = [];
  var otherLibraries = [];
    
  for (var i in libraries[prefecture]) {
    var library = libraries[prefecture][i];  
    var data = {'systemid':library.systemid, 'systemname':library.systemname};    
    
    if ((library.category == "SMALL") || (library.category == "MEDIUM")) {
      if (smallMediumLibrariesObject[library.systemname]) {
        smallMediumLibrariesObject[library.systemname].push(data);
      } else {
        smallMediumLibrariesObject[library.systemname] = [data];
      }      
    } else if (library.category == "LARGE") {
      largeLibraries.push(data);
    } else if (library.category == "UNIV") {
      univLibraries.push(data);
    } else {
      otherLibraries.push(data);
    }
  }
 
  var kanas = ['あ','か','さ','た','な','は','ま','や','ら','わ']; 
  for (var i in kanas) {
    var kana = kanas[i];
    if (cities[kana]) {
      for (var j in cities[kana]){
        city_name = cities[kana][j];
        if (smallMediumLibrariesObject[prefecture + city_name]) {
          smallMediumLibraries = smallMediumLibraries.concat(smallMediumLibrariesObject[prefecture + city_name]);
        }
      }
    }
  }

  var libraryNamesArray = [];

  for (var i in smallMediumLibraries) {
    var smallMediumLibrary = smallMediumLibraries[i];
    if (libron.systemNames[smallMediumLibrary.systemid]) {
      continue;
    }
    smallMediumLibrary['group'] = '図書館(地域)';
    libraryNamesArray.push(smallMediumLibrary);
    libron.systemNames[smallMediumLibrary.systemid] = smallMediumLibrary.systemname;
  }

  for (var i in largeLibraries) {
    var largeLibrary = largeLibraries[i];
    if (libron.systemNames[largeLibrary.systemid]) {
      continue;
    }
    largeLibrary['group'] = '図書館(広域)';
    libraryNamesArray.push(largeLibrary);
    libron.systemNames[largeLibrary.systemid] = largeLibrary.systemname;
  }
  
  for (var i in univLibraries) {
    var univLibrary = univLibraries[i];
    if (libron.systemNames[univLibrary.systemid]) {
      continue;
    }
    univLibrary['group'] = '図書館(大学)';
    libraryNamesArray.push(univLibrary);
    libron.systemNames[univLibrary.systemid] = univLibrary.systemname;
  }

  for (var i in otherLibraries) {
    var otherLibrary = otherLibraries[i];
    if (libron.systemNames[otherLibrary.systemid]) {
      continue;
    }
    otherLibrary['group'] = '移動・その他';
    libraryNamesArray.push(otherLibrary);
    libron.systemNames[otherLibrary.systemid] = otherLibrary.systemname;
  }
  return libraryNamesArray;
}

function updateLibrarySelectBox(selectBoxDiv, prefecture, univ) {
  if (!univ) univ = false;
  if (libron.libraryNames[prefecture]) {
    selectBoxDiv.replaceChild(createLibrarySelectBox(libron.libraryNames[prefecture], univ), selectBoxDiv.childNodes[3]);
  } else {
    var url = "http://api.calil.jp/library?appkey=" + encodeURIComponent(libron.appkey) + "&pref=" + encodeURIComponent(prefecture) + "&format=json";
  	
  	if (isSafariExtension()) {
  	  safari.self.tab.dispatchMessage("retrieveLibraryInfo", [url, prefecture, univ]);
  	} else {
      GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response){
          GM_xmlhttpRequest({
            method: "GET",
            url: "http://calil.jp/city_list",
            onload: function(city_list_response) {
              var city_list_match = city_list_response.responseText.match(/^loadcity\((.*)\);$/);
              var cities = JSON.parse(city_list_match[1]);
              var match = response.responseText.match(/^callback\((.*)\);$/);
              libron.libraries[prefecture] = JSON.parse(match[1]);
              libron.libraryNames[prefecture] = createLibraryNames(prefecture, libron.libraries, cities[prefecture]);
              selectBoxDiv.replaceChild(createLibrarySelectBox(libron.libraryNames[prefecture], univ), selectBoxDiv.childNodes[3]);
            }
          });
        }
      });
  	}
  }
}

function createLibrarySelectBox(libraryNames, univ) {
  var select = document.createElement("select");
  var groups;
  if (univ) {
    groups = ['図書館(地域)', '図書館(広域)', '図書館(大学)', '移動・その他'];
  } else {
    groups = ['図書館(地域)', '図書館(広域)', '移動・その他'];
  }
  
  var optGroups = {};
  for (var i in groups) {
    optGroups[groups[i]] = document.createElement('optgroup');
    optGroups[groups[i]].label = groups[i];
  }

  for (var i in libraryNames) {
    var option = document.createElement('option');
    option.value = libraryNames[i]['systemid'];
    option.textContent = libraryNames[i]['systemname'];
    
    if (libraryNames[i]['systemid'] == libron.selectedSystemId) {
      option.selected = true;
    }
    
    if (optGroups[libraryNames[i]['group']]) {
      optGroups[libraryNames[i]['group']].appendChild(option);
    }
  }
  for (var i in groups) {
    if (optGroups[groups[i]].childNodes.length > 0) {
      select.appendChild(optGroups[groups[i]]);
    }
  }
  return select;
}

function saveSelection(options){
  GM_setValue("selectedPrefecture", encodeURIComponent(options.prefecture));
  GM_setValue("selectedSystemId", encodeURIComponent(options.systemid));
  GM_setValue("selectedSystemName", encodeURIComponent(options.systemname));
  GM_setValue("univChecked", options.univChecked === true ? "true" : "false");
}

/*
 * Amazonの各ページに応じて、図書館リンクを表示
 */

function addLibraryLinksToBookList(){
  var objects = document.getElementsByTagName('h3');
  var isbns = [];
  var target_objects = [];

  outerloop:
  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    for (var j = 0; j < object.parentNode.childNodes.length; j++) {
       if ((object.parentNode.childNodes[j].className == 'libron_link_div') || (object.parentNode.childNodes[j].className == 'libron_loading_icon_div')){
         continue outerloop;
       }
    }
    
    if ((object.className.indexOf("productTitle") != -1) || (object.className.indexOf("title") != -1) || (object.className.indexOf("fixed-line") != -1)){
      var link = object.getElementsByTagName('a')[0];
      if (link) {
        var matched = link.href.match(/\/dp\/([\dX]{10})\/ref/);
        if (matched && matched[1]) {
          var isbn = matched[1];
          isbns.push(encodeURIComponent(isbn));
          target_objects.push(object);
        }
      }
    }
  }
  
  if (isbns.length > 0) {
    var url = "http://api.calil.jp/check?appkey=" + encodeURIComponent(libron.appkey) + "&isbn=" + isbns.join(',') + "&systemid=" + encodeURIComponent(libron.selectedSystemId) + "&format=json";
    addLoadingIcon(url, target_objects, isbns);
  }
}

function addLibraryLinksToBookPage(isbn){
  var btAsinTitleDiv = parent.document.getElementById('btAsinTitle');
  if (btAsinTitleDiv) {
  　 var div = btAsinTitleDiv.parentNode;
  　　var url = "http://api.calil.jp/check?appkey=" + encodeURIComponent(libron.appkey) + "&isbn=" + encodeURIComponent(isbn) + "&systemid=" + encodeURIComponent(libron.selectedSystemId) + "&format=json";
    addLoadingIcon(url, [div], [isbn]);
  }
}

function addLibraryLinksToWishList(){
  var isbns = [];
  var target_objects = [];
  var objects = parent.document.evaluate("//span[contains(@class, 'productTitle')]", parent.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < objects.snapshotLength; i++) {
    var object = objects.snapshotItem(i);
    var link = object.getElementsByTagName('a')[0];
    if (link) {
      var matched = link.href.match(/\/dp\/([\dX]{10})\/ref/);
      if (matched && matched[1]) {
        var isbn = matched[1];
        isbns.push(encodeURIComponent(isbn));
        target_objects.push(object);
      }
    }
  }
  
  if (isbns.length > 0) {
    var url = "http://api.calil.jp/check?appkey=" + encodeURIComponent(libron.appkey) + "&isbn=" + isbns.join(',') + "&systemid=" + encodeURIComponent(libron.selectedSystemId) + "&format=json";
    addLoadingIcon(url, target_objects, isbns);
  }  
}

function addLibraryLinksToMobileBookPage(isbn){
  var hrs = parent.document.getElementsByTagName('hr');
  if (hrs.length > 0) {
  　var hr = hrs[0];
  　var url = "http://api.calil.jp/check?appkey=" + encodeURIComponent(libron.appkey) + "&isbn=" + encodeURIComponent(isbn) + "&systemid=" + libron.selectedSystemId + "&format=json";
    addLoadingIcon(url, [hr], [isbn]);
  }
}

function addLoadingIcon(url, objects, isbns) {

  // callback function
  var checkLibrary = isSafariExtension() ?
  function(url){
    safari.self.tab.dispatchMessage("checkLibrary", [url, libron.appkey]);
  }
  : 
  function(url) {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: function(response){
        var match = response.responseText.match(/^callback\((.*)\);$/);
        var json = JSON.parse(match[1]);
        var cont = json["continue"];
        if (cont == 0) {        
          replaceWithLibraryLink(json);           
        } else {
          //途中なので再度検索をおこなう
          var session = json["session"];
          if (session.length > 0) {
            var new_url = "http://api.calil.jp/check?appkey=" + encodeURIComponent(libron.appkey) + "&session=" + encodeURIComponent(session) + "&format=json";
            setTimeout(function(){
              checkLibrary(new_url);
            }, 2000);
          }
        }
      }
    });
  };

  for (var i = 0; i < objects.length; i++) {
    var object = objects[i];
    var div = libron.createElement("div", {class: "libron_link_div", "data-isbn": isbns[i]}, null);
    var searchingSpan = libron.createElement("span", {class: "libron_gray"}, "図書館を検索中 ");
    var loadingIconImg = libron.createElement("img", {src: libron.loadingIcon}, null);
    div.appendChild(searchingSpan);
    div.appendChild(loadingIconImg);
    object.parentNode.insertBefore(div, object.nextSibling);
  }
  checkLibrary(url);
}

function replaceWithLibraryLink(json){
  var divs = document.getElementsByClassName('libron_link_div');
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var isbn = div.getAttribute("data-isbn");
    var status = json["books"][isbn][libron.selectedSystemId]["status"];
    var libkey;
    var calil_library_links = [];
    var libLink;

    var calilLink = libron.createElement("div", {class: "calil_link"}, null);
    var raquo = document.createTextNode("» ");
    var calilLinkAnchor = libron.createElement("a", {href: "http://calil.jp/book/" + isbn, target:"_blank"}, "他の図書館で検索する(カーリル)");
    var space = document.createTextNode(" ");
    var calilIconImg = libron.createElement("img", {src: libron.calilIcon}, null);
    calilLink.appendChild(raquo);
    calilLink.appendChild(calilLinkAnchor);
    calilLink.appendChild(space);
    calilLink.appendChild(calilIconImg);

    if (div.hasChildNodes()) {
      while(div.childNodes.length >= 1) {
        div.removeChild(div.firstChild);
      }
    }

    if (status && status == "Error") {
      libLink = document.createElement("div");
      var ngIconImg = libron.createElement("img", {src: libron.ngIcon}, null);
      var errorMsg = document.createTextNode("エラーが発生しました ");
      libLink.appendChild(errorMsg);
      libLink.appendChild(ngIconImg);
      div.appendChild(libLink);
      div.appendChild(calilLink);
    } else {
      libkey = json["books"][isbn][libron.selectedSystemId]["libkey"];
      for (var key in libkey) {
        var calil_library_link = libron.createElement("a", {href: "http://calil.jp/library/search?s=" + encodeURIComponent(libron.selectedSystemId) + "&k=" + encodeURIComponent(key), target: "_blank"}, key + "(" + libkey[key] + ")");
        calil_library_links.push(calil_library_link);
      }
      if (calil_library_links.length > 0) {
        var reserveurl = libron.siteUrl + encodeURIComponent(json["books"][isbn][libron.selectedSystemId]["reserveurl"]) + "&asin=" + encodeURIComponent(isbn);
        if (reserveurl) {
          libLink = document.createElement("div");
          var raquo = document.createTextNode("» ");
          var reserveUrlAnchor = libron.createElement("a", {"href":reserveurl, "target":"_blank"}, libron.selectedSystemName + "で予約する");
          var space = document.createTextNode(" ");
          var okIconImg = libron.createElement("img", {src: libron.okIcon}, null);
          libLink.appendChild(raquo);
          libLink.appendChild(reserveUrlAnchor);
          libLink.appendChild(space);
          libLink.appendChild(okIconImg);
          div.appendChild(libLink);
        } else {
          libLink = libron.createElement("div", {class: "libron_gray"}, null);
          var okMsg = document.createTextNode(libron.selectedSystemName + "に蔵書あり ");
          var okIconImg = libron.createElement("img", {src: libron.okIcon}, null);
          var space = document.createTextNode(" ");
          libLink.appendChild(okMsg);
          libLink.appendChild(okIconImg);
          libLink.appendChild(space);
          for (var i = 0; i < calil_library_links.length; i++) {
            libLink.appendChild(calil_library_links[i]);
            if (i !== calil_library_links.length - 1) {
              var hyphen = document.createTextNode(" - ");
              libLink.appendChild(hyphen);
            }
          }
          div.appendChild(libLink);
        }
      } else {
        libLink = libron.createElement("div", {class: "libron_gray"}, null);
        var notFoundMsg = document.createTextNode(libron.selectedSystemName + "には見つかりません ");
        var ngIconImg = libron.createElement("img", {src: libron.ngIcon}, null);
        libLink.appendChild(notFoundMsg);
        libLink.appendChild(ngIconImg);
        div.appendChild(libLink);
        div.appendChild(calilLink);
      }
    }
  }
}

// *Safari Extension Specific*
function GM_setValue(key, value) {
  localStorage.setItem(key, value);
}

// *Safari Extension Specific*
function GM_getValue(key) {
  return localStorage.getItem(key);
}

// *Safari Extension Specific*
function getResponse(theMessageEvent) {
  if (theMessageEvent.name === "libraryInfoResponse") {
    var responseText = (theMessageEvent.message)[0];
    var cityListResponseText = (theMessageEvent.message)[1];
    var prefecture = (theMessageEvent.message)[2];
    var univ = (theMessageEvent.message)[3];
    var city_list_match = cityListResponseText.match(/^loadcity\((.*)\);$/);
    var cities = JSON.parse(city_list_match[1]);
    var match = responseText.match(/^callback\((.*)\);$/);
        
    libron.libraries[prefecture] = JSON.parse(match[1]);
    libron.libraryNames[prefecture] = createLibraryNames(prefecture, libron.libraries, cities[prefecture]);
    
    var selectBoxDiv = document.getElementById("libron_select_box");
    if (selectBoxDiv) {
      selectBoxDiv.replaceChild(createLibrarySelectBox(libron.libraryNames[prefecture], univ), selectBoxDiv.childNodes[3]);
    }
  } else if (theMessageEvent.name === "checkLibraryResponse") {
    var responseText = (theMessageEvent.message)[0];
    var match = responseText.match(/^callback\((.*)\);$/);
    var json = JSON.parse(match[1]);    
    replaceWithLibraryLink(json);
  }
}

function isGreasemonkey() {
  return (typeof isChromeExtension == "undefined");
}

function isSafariExtension() {
  return (typeof safari == 'object') && (typeof safari.extension == 'object');
}
