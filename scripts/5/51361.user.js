// ==UserScript==
// @name           Blogger Super Pre Notation
// @namespace      http://d.hatena.ne.jp/shunsuk/
// @description    Script to use super pre notation in Blogger
// @include        http://www.blogger.com/post-create.g?*
// @include        http://www.blogger.com/post-edit.g?*
// ==/UserScript==

function convertToPre() {
    var textarea = document.getElementById('textarea');
    var lines = textarea.value.split('\n');
    var text = '';
    var inPre = false;

    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        if (inPre) {
            if (line.match(/\|\|</) != null) {
                line = line.replace(/\|\|</, '</pre>');
                inPre = false;
            } else {
                line = line.replace('<', '&lt;');
                line = line.replace('>', '&gt;');
            }
        } else {
            if (line.match(/>\|(\w+)\|/) != null) {
                line = line.replace(/>\|(\w+)\|/, '<pre name="code" class="$1">');
                inPre = true;
            }
        }
        text += line + '\n';
    }

    textarea.value = text.substr(0, text.length - 1);
}

(function() {
    var postButtons = document.getElementById('postButtons');
    postButtons.innerHTML += '<a id="supre_pre" onclick="return false;" style="padding: 4px; background-color: navy; color: white; cursor: pointer; line-height: 24px">super pre</a>';
    var pre = document.getElementById('supre_pre');
    pre.addEventListener('click', convertToPre, false);
 })();
