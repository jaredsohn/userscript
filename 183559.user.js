// ==UserScript==
// @name           bilisound
// @author         DickyT
// @namespace      http://userscripts.org/scripts/show/183559
// @description    Convert video on blilbili.tv to mp3 online
// @icon           http://www.bilibili.tv/favicon.ico
// @include        http://www.bilibili.tv/video/av*
// @updateURL      https://userscripts.org/scripts/source/183559.meta.js
// @downloadURL    https://userscripts.org/scripts/source/183559.user.js
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @version        0.5
// ==/UserScript==
if (localStorage.bilisound != 'checked')
{
  localStorage.bilisound = 'checked'
  if(confirm("新版bilisound插件已经整合到bilibili助手插件中, Chrome内核用户可以选择升级.是否升级?"))
  {
        window.location.assign("https://chrome.google.com/webstore/detail/%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E5%8A%A9%E6%89%8B/kpbnombpnpcffllnianjibmpadjolanh?hl=zh-CN")
  }
}
script = document.createElement("script")
script.innerHTML = jumptomp3;
document.body.appendChild(script)
function jumptomp3()
{
  var patt = /av[0-9]*/g
  var match = patt.exec(document.location.href)
  window.open('http://bilisound.com/'+match[0])
}
document.getElementsByClassName('sf')[0].style.width='230px'
document.getElementsByClassName('sf')[0].innerHTML = '<img src="http://cdn.idickyt.com/imaidlink/sharing/13848424192339.png" onclick="jumptomp3()" style="margin-left:10px">' + document.getElementsByClassName('sf')[0].innerHTML
if (localStorage.freebilibili != 'checked')
{
  localStorage.freebilibili = 'checked'
  if(confirm('Free Bilibili b站全能播放器替换工具, 点击确定下载'))
  {
        window.location.assign('http://userscripts.org/scripts/show/485808')
  }
}