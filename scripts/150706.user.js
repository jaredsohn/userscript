// ==UserScript==
// @name           Fix ii/wakachan sidebar links
// @include        http://*iichan.net/side_left.html
// @include        http://*wakachan.org/front/english.html
// ==/UserScript==

var i;

// change URLs to use current hosts
var a;
var aTags = document.getElementsByTagName("a");
for (i = 0; i < aTags.length; i++) {
    a = aTags[i];
    a.href = a.href.replace("ib.rotbrc.com", "boards.rotbrc.com");
    a.href = a.href.replace("iiichan.net/boards", "shanachan.org");
    a.href = a.href.replace("shanachan.konosutekinabasho.net", "shanachan.org");
    a.href = a.href.replace("fetish.iiichan.net", "shanachan.org/fetish");
    // put /music/ back the way it was
    a.href = a.href.replace("shanachan.org/music", "iiichan.net/boards/music");
}

// hide dead boards
// iichan sidebar uses nested <ul>/<li> tags
// loop backwards to process inner tags first
var li;
var liTags = document.getElementsByTagName("li");
for (i = liTags.length - 1; i > 0; i--) {
    li = liTags[i];
    if (/Bijin/.test(li.innerHTML) ||
        /Doodles/.test(li.innerHTML) ||
        /Het. Romance/.test(li.innerHTML) ||
        /Oekaki/.test(li.innerHTML) ||
        /Open ?Canvas/.test(li.innerHTML) ||
        /Paranormal/.test(li.innerHTML) ||
        /Sakura/.test(li.innerHTML) ||
        /Sexy Men/.test(li.innerHTML) ||
        /Sleep/.test(li.innerHTML) ||
        /Tabletop Games/.test(li.innerHTML) ||
        /Tears/.test(li.innerHTML) ||
        /Technology/.test(li.innerHTML) ||
        /Uncensored/.test(li.innerHTML) ||
        /sw/.test(li.innerHTML) ||
        /senti/.test(li.innerHTML) ||
        /pantsu/.test(li.innerHTML) ||
        /cry/.test(li.innerHTML) ||
        /mugen/.test(li.innerHTML) ||
        /rag/.test(li.innerHTML) ||
        /sakura/.test(li.innerHTML) ||
        /miku/.test(li.innerHTML) ||
        /ghost/.test(li.innerHTML) ||
        /doujin/.test(li.innerHTML) ||
        /slpl/.test(li.innerHTML) ||
        /t-h/.test(li.innerHTML) ||
        /tmh/.test(li.innerHTML) ||
        /unc/.test(li.innerHTML) ||
        /neko/.test(li.innerHTML) ||
        /kemonomimi/.test(li.innerHTML) ||
        /sleepy/.test(li.innerHTML) ||
        /hr/.test(li.innerHTML) ||
        /tech/.test(li.innerHTML) ||
        /sm/.test(li.innerHTML) ||
        /negi/.test(li.innerHTML) ||
       ) {
        li.parentNode.removeChild(li);
    }
}

// hide empty categories
var ul;
if (ul = document.getElementById("oekaki")) {
    ul.parentNode.removeChild(ul);
}
if (ul = document.getElementById("yourart")) {
    ul.parentNode.removeChild(ul);
}

var h3;
var h3Tags = document.getElementsByTagName("h3");
for (i = 0; i < h3Tags.length; i++) {
    h3 = h3Tags[i];
    if (/Personal Art/.test(h3.innerHTML) ||
        /Your Art/.test(h3.innerHTML)
       ) {
        h3.parentNode.removeChild(h3);
    }
}