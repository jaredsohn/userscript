// ==UserScript==
// @name           Hatebu Hotentry Filter
// @author         favril
// @namespace      http://d.hatena.ne.jp/favril/
// @description    ホットエントリの既読・ブクマ済みなどをフィルタリングするスクリプト
// @version        0.1.0
// @include        http://b.hatena.ne.jp/hotentry*
// ==/UserScript==

(function(){
    var user = unsafeWindow.Hatena.Bookmark.user;
    
    var delList = GM_getValue('delList');
    if (!delList) delList = '';

    var entries = document.evaluate('//div[@class="entry-body"]', document, null, 7, null);
    entryloop: for (var i=0; i<entries.snapshotLength; i++) {
        var entry = entries.snapshotItem(i);
        var a     = document.evaluate('h3/a', entry, null, 7, null).snapshotItem(0);
        
        // insert delete button
        var inpos   = entry.getElementsByTagName('ul')[0];
        var delBtn  = document.createElement('a');
        delBtn.href = 'javascript:;';
        delBtn.name = a.href;
        delBtn.addEventListener('click', function() {
            this.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
            if (delList.indexOf(this.name) == -1) {
                delList += ' ' + this.name;
                GM_setValue('delList', delList);
            }
        }, false);
        delBtn.style.marginLeft = '5px';
        delBtn.innerHTML = 'hide entry';
        var li = document.createElement('li');
        li.appendChild(delBtn);
        inpos.appendChild(li);
        
        // visited entry
        var color = getComputedStyle(a, '').color;
        if (color == 'rgb(136, 51, 136)') {
            entry.parentNode.style.display = 'none';
            continue;
        }

        // uninterested entry
        if (delList.indexOf(a.href) != -1) {
            entry.parentNode.style.display = 'none';
            continue;
        }

        // bookmarked entry
        if (user) {
            var img = document.evaluate('ul/li[@class="favorite"]/img', entry, null, 7, null);
            for (var j=0; j<img.snapshotLength; j++) {
                if (img.snapshotItem(j).alt == user.name) {
                    entry.parentNode.style.display = 'none';
                    continue entryloop;
                }
            }
        }
    }
})();
