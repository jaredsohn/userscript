// ==UserScript==
// @name           SUCCESS
// @namespace      http://twitter.com/foooomio
// @version        1.0.3
// @description    滋賀大学キャンパス教育支援システム（SUCCESS）のお知らせ欄に未読管理機能を付加します。
// @include        https://success.shiga-u.ac.jp/Portal/StudentApp/Top.aspx
// ==/UserScript==

var REGDATE = /\d{2}\/\d{2}\/\d{2}\s\d{2}:\d{2}/;

function createArticle(nodes) {
  var date = nodes.innerHTML.match(REGDATE)[0];
  
  if(keys[date] == "read")
    return;
  
  if(keys[date] == undefined) {
    keys[date] = "unread";
    localStorage.setItem(date, "unread");
  }
  
  nodes.getElementsByTagName("dd")[0].innerHTML+='<font color="red" size="-1">new</font>';
  nodes.className = "unread";
  
  var a = nodes.getElementsByTagName("a");
  for (var i = 0, max = a.length; i < max; i++) {
    a[i].addEventListener('mousedown', function() {
      localStorage.setItem(date, "read");
    }, false);
  }
}


function main() {
  var box = document.getElementsByClassName("box")[1];
  
  if (box.id == "unread")
    return;
  box.id = "unread";
  
  var wrapper = document.createElement("span");
  while(box.childNodes[4].tagName !== "BR") {
    wrapper.appendChild(box.childNodes[4]);
  }
  box.insertBefore(wrapper, box.childNodes[4]);
  
  var spans = box.getElementsByTagName("span");
  for (var i = 1, max = spans.length; i < max; i++) {
    if (!spans[i].innerHTML.match(/\S/)||(spans[i].innerHTML == "…"))
      continue;

    createArticle(spans[i]);
  }
  
  box.getElementsByTagName("dd")[0].getElementsByTagName("span")[0].innerHTML += ''
    + '<a href="javascript:allRead();">すべて既読</a> / '
    + '<a href="javascript:resetRead();">リセット</a><br>';
  
}


function init() {
  document.head.innerHTML += ''
    + '<style id="unread_css">'
    + 'dl#unread span dd {margin-right: 5px; padding-right: 3px; padding-left: 3px; background: #eee;}'+'\n'
    + 'dl#unread span dd:first-child {padding-top: 5px; border-radius: 5px 5px 0px 0px;}'+'\n'
    + 'dl#unread span dd:last-child {padding-bottom: 5px; border-radius: 0px 0px 5px 5px;}'+'\n'
    + 'dl#unread span.unread dd {background-color: #ffcbca;}'+'\n'
    + '</style>';

  var script = document.createElement("script");
  script.id = "unread_script";
  script.innerHTML = ''
    + 'function allRead() {'
    + '  if (confirm("すべて既読にします。")) {'
    + '    for(var i in localStorage){'
    + '      if(localStorage.hasOwnProperty(i) && '+REGDATE+'.test(i)){'
    + '        localStorage.setItem(i, "read");'
    + '      }'
    + '    }'
    + '    location.reload();'
    + '  }'
    + '}'
    + 'function resetRead() {'
    + '  if (confirm("未読情報をリセットします。")) {'
    + '    for(var i in localStorage){'
    + '      if(localStorage.hasOwnProperty(i) && '+REGDATE+'.test(i)){'
    + '        localStorage.removeItem(i);'
    + '      }'
    + '    }'
    + '    location.reload();'
    + '  }'
    + '}';
  document.head.appendChild(script);
}


var keys = function(storage) {
  var index = [], i;
  for(i in storage){
    if(storage.hasOwnProperty(i)){
      index[i] = storage.getItem(i);
    }
  }
  return index;
}(localStorage);


document.addEventListener("DOMNodeInserted", handler, false);
function handler() {
  document.removeEventListener("DOMNodeInserted", handler, false);
  
  setTimeout(function() {
    main();
    
    document.addEventListener("DOMNodeInserted", handler,false);
  }, 10);
}

init();
