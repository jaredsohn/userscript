// ==UserScript==
// @name       ニコニコ動画:GINZA 動画再生ページ 再生数を動画右に表示
// @version    0.1
// @description  HAC
// @match      http://www.nicovideo.jp/watch/*
// ==/UserScript==

var d = document,
    $ = function(id) { return d.getElementById(id); },
    $x = function(xp) { return d.evaluate(xp, d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };

function addStyle(styles, id) {
    var elm, text, head;
    elm = document.createElement('style');
    elm.type = 'text/css';
    if (id) { elm.id = id; }
    
    text = styles.toString();
    text = document.createTextNode(text);
    elm.appendChild(text);
    head = document.getElementsByTagName('head');
    head = head[0];
    head.appendChild(elm);
    return elm;
}

var css　= (function() {/*
#playerTabVideoStats {
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid black;
  border-bottom: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  height: 52px;
  overflow: hidden;
  width: 100%;
}
body.setting_panel #playerTabVideoStats {
  display: none;
}
#playerTabVideoStats li {
  display: block;
  padding: 0 4px;
  margin: 0;
  border: 0;
  border-bottom: 1px solid black;
  font-size: 90%;
  line-height: 16px;
  background: linear-gradient(to bottom ,#393939, #111111, #111111, #464646);
  color: white;
  text-align: left;
}
#playerTabVideoStats li span {
  display: block;
  float: right;
  font-weight: bold;
}
body:not(.videoExplorer):not(.setting_panel):not(.full_with_browser) #playerTabContainer {
  top: 56px !important;
}
*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\{\*/g, '/*').replace(/\*\}/g, '*/');
addStyle(css);

document.body.className += ' videoStats_rightColumn';

var targetNode = $x('id("topVideoInfo")//*[@class="videoStats"]');
targetNode.id = 'playerTabVideoStats';
targetNode.className = '';
$('playerTabWrapper').insertBefore(targetNode,$('playerTabContainer'));
