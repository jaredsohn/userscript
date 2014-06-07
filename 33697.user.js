// ==UserScript==
// @name           movapic On twitter
// @namespace      http://twitter.g.hatena.ne.jp/natu_n/
// @include        http*://twitter.com/*
// ==/UserScript==

(
function(){
    var re = new RegExp("");
        re.compile("http:\/\/movapic\.com\/pic\/(\\w{27})");
    var contents, content, link;
    if (contents = getElementsByClassName(document.body,
                                         'entry(?:_|[-])content') || null) {
        for (var i=0, j=contents.length; i<j; i++) {
            content = contents[i];
            if (link = content.getElementsByTagName('a')[0] || null) {
                if (result = re.exec(link.getAttribute("href")) || null) {

                    var df  = document.createDocumentFragment();
                    var lk  = document.createElement('a');
                        lk.setAttribute('href',  result[0]);
                    var img = document.createElement("img");
                    img.setAttribute('src', 'http://image.movapic.com/pic/s_'
                                          + result[1]
                                          + '.jpeg' );
                    lk.appendChild(img);
                    df.appendChild(document.createElement('br'));
                    df.appendChild(lk);
                    df.appendChild(document.createElement('br'));
                    content.removeChild(link);
                    content.parentNode.appendChild(df);
                }
            }
        }
    }

function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0, j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

})();

