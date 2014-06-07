// ==UserScript==
// @name           p2.2ch.net ReplaceStr
// @namespace      http://userscripts.org/users/59930/
// @description    ReplaceStr.txt もどき
// @include        http://p2.2ch.net/p2/read.php?*
// ==/UserScript==

var REGEXP = {
  // 草刈り
  '[wWｗＷ]{2,}(?![\\w%&\\--/=])' : '<font color="gray">w</font>',
  // 連続改行を二つに
  '<br/>(?:[ 　]*<br/>){3,}' : '<br/><br/><br/>',
  // Afxc 直リン
  '(Sc[_\\sの]*(\\d{5,}))' : '<a href="http://www1.axfc.net/uploader/Sc/so/$2">$1</a> | <a href="http://www1.axfc.net/uploader/Sc/">Sc TOP</a>',
  '(He[_\\sの]*(\\d{6,}))' : '<a href="http://www1.axfc.net/uploader/He/so/$2">$1</a> | <a href="http://www1.axfc.net/uploader/He/">He TOP</a>',
  '(Ne[_\\sの]*(\\d{5,}))' : '<a href="http://www1.axfc.net/uploader/Ne/so/$2">$1</a> | <a href="http://www1.axfc.net/uploader/Ne/">Ne TOP</a>',
  '(H[_\\sの]*(\\d{5,}))' : '<a href="http://www1.axfc.net/uploader/H/so/$2">$1</a> | <a href="http://www1.axfc.net/uploader/H/">H TOP</a>',
  // かりもふ直リン
  '(mofu1[_\\sの]*(\\d{4}))' : '<a href="http://karimofu.org/dlp/mofu1_$2.zip.php">$1</a> | <a href="http://karimofu.org/">TOP</a>',
  '(mofu2[_\\sの]*(\\d{4}))' : '<a href="http://karimofu.cc/dlp/mofu2_$2.zip.php">$1</a> | <a href="http://karimofu.cc/">TOP</a>',
  '(mofu3[_\\sの]*(\\d{4}))' : '<a href="http://karimofu.be/dlp/mofu3_$2.zip.php">$1</a> | <a href="http://karimofu.be/">TOP</a>',
  '(mofu4[_\\sの]*(\\d{4}))' : '<a href="http://karimofu.tk/dlp/mofu4_$2.zip.php">$1</a> | <a href="http://karimofu.tk/">TOP</a>',
  '(mofu5[_\\sの]*(\\d{4}))' : '<a href="http://karimofu.ws/dlp/mofu5_$2.zip.php">$1</a> | <a href="http://karimofu.ws/">TOP</a>',
  '(mofu6[_\\sの]*(\\d{4}))' : '<a href="http://karimofu.nu/dlp/mofu6_$2.zip.php">$1</a> | <a href="http://karimofu.nu/">TOP</a>'
};

if(GM_getValue('userRegExp')) {
  var data = eval(GM_getValue('userRegExp'));
  for(var s in data) {
    REGEXP[s] = data[s];
  }
}

var res =  document.evaluate('//dd[not(@id)]', document, null, 7, null);
var length = res.snapshotLength;
for (var i = 0; i < length; i++) {
  for (var j in REGEXP) {
    str = new RegExp(j, 'gi');
    if (str.test(res.snapshotItem(i).innerHTML)) {
      res.snapshotItem(i).innerHTML = res.snapshotItem(i).innerHTML.replace(str, REGEXP[j]);
    }
  }
}

// UI
function optionDialog () {

  if (document.getElementById('_p2regex-conf')) {
    document.getElementById('_p2regex-conf').style.display = 'block';
    document.getElementById('_p2regex-mask').style.display = 'block';
    return;
  }

  var opt = document.createElement('div');
  opt.id = '_p2regex-conf';

  var mask = document.createElement('div');
  mask.id = '_p2regex-mask';

  document.body.appendChild(opt);
  document.body.appendChild(mask);

  GM_addStyle(<><![CDATA[
                     #_p2regex-conf {
                         -moz-outline: 3px solid #336699;
                         -moz-outline-radius: 5px;
                       background-color: #fff;
                       bottom: 10%;
                       display: block;
                       height: 80%;
                       left: 20%;
                       margin: auto;
                       padding: 2em;
                       position: fixed;
                       top: 5%;
                       width: 60%;
                       z-index: 20;
                     }

                     #_p2regex-conf input[type="text"],
                     #_p2regex-conf textarea {
                       width: 80%;
                     }

                     #_p2regex-mask {
                       background-color: #000;
                       height: 100%;
                       left: 0;
                       margin: 0;
                       opacity: 0.5;
                       position: fixed;
                       top: 0;
                       width: 100%;
                       z-index: 10;
                     }
                   ]]></>);

  opt.innerHTML = '<dl><dt>置換対象文字列 (\\ は \\\\ とエスケープして下さい)</dt><dd><input id="_replace-str" type="text" /></dd>' +
    '<br /><dt>置換後文字列</dt><dd><input id="_str" type="text" /></dd>' +
    '<br /><dt>追加された正規表現</dt><dd><textarea id="_view-reg"></textarea></dd></dl>' +
    '<input id="_add-button" type="button" value="正規表現を追加" title="入力した正規表現を追加します" />' +
    '<input id="_apply-button" type="button" value="適用" title="追加した正規表現を適用します" />' +
    '<input id="_delete-button" type="button" value="全ての正規表現を削除" title="定義した正規表現を全て削除します">' +
    '<input id="_close-button" type="button" value="閉じる" />';

  if (!tmpreg) var tmpreg = {};

  document.getElementById('_add-button').addEventListener(
    'click',
    function () {
      var repi = document.getElementById('_replace-str');
      var stri = document.getElementById('_str');
      var vreg = document.getElementById('_view-reg');
      if (repi.value == '' || stri.value == '') {
        alert('両方に正規表現を入力して下さい');
        return;
      }
      tmpreg[repi.value] = stri.value;
      vreg.value += repi.value + '→' + stri.value + '\n';
      repi.value = '';
      stri.value = '';
    }, false);

  document.getElementById('_apply-button').addEventListener(
    'click',
    function () {
      if (tmpreg.toSource() == '({})') {
        alert('追加する正規表現がありません');
        return;
        }
      var data;
      GM_getValue('userRegExp')? data = eval(GM_getValue('userRegExp')) : data = {};
        for (var s in tmpreg) {
          data[s] = tmpreg[s];
        }
        GM_setValue('userRegExp', data.toSource());
    }, false);

  document.getElementById('_delete-button').addEventListener(
    'click',
    function () {
      if (confirm('定義した正規表現を全て削除します')) GM_setValue('userRegExp', '');
    }
    , false);

  document.getElementById('_close-button').addEventListener(
    'click',
    function () {
      document.getElementById('_p2regex-conf').style.display='none';
      document.getElementById('_p2regex-mask').style.display='none';
    }
    , false);
}

GM_registerMenuCommand('p2.2ch.net replaceStr - 正規表現を追加', optionDialog);
