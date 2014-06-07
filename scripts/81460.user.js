// ==UserScript==
// @name           twilog_store_search_words
// @version        1.1.1
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Store search words on Twilog. / Twilogのサイドバーに検索ワードを保存出来るようにします。
// @include        http://twilog.org/*
// ==/UserScript==
(function () {
    var storageKey = 'twilog_store_search_words';
    var storedData = window.localStorage.getItem(storageKey);
    var searchWords = storedData ? storedData.split(',') : [];
    var createLinkNode = function (word) {
        var a = document.createElement('a');
        a.href = 'http://twilog.org/tweets.cgi?id=' + id + '&word=' + word;
        a.appendChild(document.createTextNode(decodeURIComponent(word)));
        var li = document.createElement('li');
        var icon = imgX.cloneNode(true);
        icon.addEventListener('click', function (e) {
            var idx = searchWords.indexOf(e.target.nextElementSibling.href.split('=').pop());
            searchWords.splice(idx, 1);
            window.localStorage.setItem(storageKey, searchWords.join(','));
            var targetLi = e.target.parentNode;
            targetLi.parentNode.removeChild(targetLi);
            if (addLi && word == pageWord) {
                addLi.style.display = 'block';
            }
        }, false);
        li.appendChild(icon);
        li.appendChild(a);
        return li;
    }
    var imgX = document.createElement('img');
    imgX.src = 'data:image/gif;base64,'+
      'R0lGODlhDAAMAPcAAPxubPz+/AAAAAAAAL4AAB0AAAAAAAAAACQAACAAAAAAAAAAAAAAAAAAABYA'+
      'AAAAAAgAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAUAAAAAAAAAAEAAAOcAABMAAAAAAOkAAOUA'+
      'AIEAAHwAAAAAAAAAAAEAAAAAAFYAAAAAAAAAAAAAAEgAAOYAABMAAAAAAG4AAAAAAAAAAAAAAGgA'+
      'AOcAABMAAAAAACAAAOkAAJQAAHwAAGAAAAAAAJUAAHwAAP8AAP8AAP8AAP8AAF0AAAAAAJUAAHwA'+
      'AIUAAOcAAIEAAHwAAAAAAAAAABYAAAAAAGAAAAMAAAAAAAAAAAAAAK8AABoAAAAAAEAAAE4AABYA'+
      'AAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAMAAAAAAAAAAAAAAAAAAAP8AAP8AAP8AAP8AAP8AAP8A'+
      'AP8AAP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYAAAAAABoAAH0AnwAAgAAAfHgA'+
      'AOcAABMAAAAAAJ8AAOsAAIEAAHwAAEsAB+MAAIEAAHwAAGAAANoAAFAAAAAAAEAAAE4AMAEAFwAA'+
      'AGwAAAAAAAAAAAAAALQaAOZ9ABMAAAAAADSQAADoAAATAMAAAAi1APwrABODAAB8ACAACOkAn5QA'+
      'gHwAfGAA/wAA/5UA/3wA//8AAP8An/8AgP8AfF0AKwABAJUAAHwAAOoZK/QsAICDAHx8AAC0hADo'+
      '7hYTEwAAAAD0/wAr/wCD/wB8/0AAAE4AABYAAAAAAAAYvAEA6QAAEwAAAABkBgBknQCDTAB8APcA'+
      'nPQA6YAAE3wAAKC4d+jpcBMTTwAAAECd0E5k6RaDEwB8AABEZACNZABPgwAAfABgewCY6wBPEwAA'+
      'AAAA0wAB/wAA/wAAfwC0UADo6wATEwAAAAAAAAABAAAAAAAAAAC4ZABkZACDgwB8fAABAAAAAAAA'+
      'AAAAAAAAGgAAfQAwAAAAAAAAWAAANAAAFwAAAAAAgQAARQAASAAAACH5BAEAAAEALAAAAAAMAAwA'+
      'BwgwAAMIHEhwIAAABQMcFHgQocGFDCE2LNhwYsKKCSNCpFjR4UOHFhVuFAnS48OMCQMCADs=';
    imgX.style.margin = '0px 10px 0px 5px';
    var ul = document.createElement('ul');
    ul.className = 'list-side';
    var searchForm = document.forms[2];
    searchForm.parentNode.insertBefore(ul, searchForm.nextElementSibling);
    var id = searchForm[0].value;
    if (!location.href.indexOf('http://twilog.org/tweets.cgi?')) {
        var params = location.href.split('?')[1].split('&').map(function (e) { return e.split('='); });
        for (var i = 0; i < params.length; i++) {
            if (params[i][0] == 'word') {
                var pageWord = params[i][1];
                var imgA = document.createElement('img');
                imgA.src = 'data:image/gif;base64,'+
                  'R0lGODlhDAAMAPcAAHy2fPz+/AAXlAAAfL7gYB0nBAAXlQAAfCR9ACAEBgDknAB3fAAMSQDoQBYT'+
                  'lQAAfAjgPAAnQAAXlQAAfADgCAInAgAXAAAAAACQKAfn7AATEwAAAOQvAOYMABPkAAB3AOkATuUA'+
                  'AIEAAHwAAAAMPADoQAETlQAAfFYBCAAAAgAAAAAAAOycPOXn7BMTEwAAAG6zAACRAADjAAB3AAzg'+
                  'nufn6RMTEwAAACCsPOnnQJQTlXwAfGDoJwCQAJXjAHx3AP/gAv/nAP8TAP8AAF10TgDpAJUTUHwA'+
                  'AIXAmOfnfIETFnwAAAAQTACj7BbjEwB3AGB0JwPpAAATAAAAAEiwmBP0fBvYFgB3AEi8AE7rABYT'+
                  'AAAAAACgTgDrAAATCAAAAn7PRQBGAADrAMB3AAAMJwDoAAATAAAAQ/8ATv8AAP8AAP8AAP+oAP9G'+
                  'AP/rAP93AAAAAwAAAAAAAAAAAAAg1gBi6QDfEwB3AAAEAADvABYTAAAAAKLgAJgnnwAXgAAAfBwQ'+
                  'AOcAABMAAAAAAJ+YAOsqAIEXAHwAAEsYB+MAAIEAAHwAAGAAANoAAFAAAAAAAEiwAE4qMAEXFwAA'+
                  'AGwAAAD1AADYAAB3AFiiAOaYABMAAAAAADQ0AADoAAATAMAAAKy1APsrABODAAB8ACAACOkAn5QA'+
                  'gHwAfGAA/wAA/5UA/3wA//8AAP8An/8AgP8AfF0AJAABAJUAAHwAAOoZJPQsAICDAHx8AABYKADo'+
                  '7hYTEwAAAAD0/wAr/wCD/wB8/0gAAE4AABYAAAAAAAAYYAEA6QAAEwAAAABkBgBknQCDTAB8APcA'+
                  'QPQA6YAAE3wAAERcd+jpcBMTTwAAAEiddE5k6RaDEwB8AEhEZOeNZBNPgwAAfMtgGGaY6+NPE3cA'+
                  'ALAA2i4B/xcA/wAAf1hY9Ofo6hMTEwAAAOEAAAEBAOQAAHcAALC4ZC5kZBeDgwB8fLABAC4AABcA'+
                  'AAAAAHwAoucAmBMwAAAAAE4AmAIANOQAF3cAAAEMgQDpRQATSAAAACH5BAEAAAEALAAAAAAMAAwA'+
                  'BwgtAAMIHEiwoEAAAAwSRKhwIMOGAR4uTBiR4kOECRlidIixY8GOEieG/EgRosGAADs=';
                imgA.style.marginRight = '5px';
                var a = document.createElement('a');
                a.href = './';
                a.style.marginLeft = '5px';
                a.appendChild(imgA);
                a.appendChild(document.createTextNode('この検索ワードを保存'));
                a.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (searchWords.indexOf(pageWord) == -1) {
                        searchWords.unshift(pageWord);
                        window.localStorage.setItem(storageKey, searchWords.join(','));
                        ul.insertBefore(createLinkNode(pageWord), ul.firstChild);
                        e.target.parentNode.style.display = 'none';
                    }
                }, false);
                var addLi = document.createElement('li');
                if (searchWords.indexOf(pageWord) != -1) {
                    addLi.style.display = 'none';
                }
                addLi.appendChild(a);
                ul.appendChild(addLi);
                break;
            }
        }
    }
    for (var i = 0; i < searchWords.length; i++) {
        ul.appendChild(createLinkNode(searchWords[i]));
    }
})();
