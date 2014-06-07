// ==UserScript==
// @name           Fake-NOT
// @namespace      http://www.cudi.pl/
// @description    Usuwa komentarze zawierajace slowo 'fake' w serwisie Wykop.pl
// @include        http://www.wykop.pl/link/*/*.html
// @include        http://wykop.pl/link/*/*.html
// ==/UserScript==

(function() {
    var pattern = /^(.*)(f+a+k+e|f+@+k+e|f+a+k+3|f+@+\|<e|f+@+\|<3|f+\*k+e|f+a+\*e)(.*)$/im;
    var result = document.evaluate("//li[starts-with(@class, 'comment_level')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < result.snapshotLength; i++) {
        var comment = result.snapshotItem(i);
        var text = document.evaluate("div[@class='comment_body']", comment, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent;
        
        if (pattern.test(text)) {
            comment.style.display = 'none';
            
            if (comment.className == 'comment_level1') {
                while (comment.nextSibling.nextSibling.className == 'comment_level2') {
                    comment = comment.nextSibling.nextSibling;
                    
                    comment.style.display = 'none';
                }
            }
        }
    }
})();