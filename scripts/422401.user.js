// ==UserScript==
// @name                MangaFox noImage BugFix
// @namespace	        http://www.oreilly.com/catalog/greasemonkeyhacks/
// @description	        Bug Fix
// @include		http://mangafox.me/manga/*
// @exclude		http://oreilly.com/*
// @exclude		http://www.oreilly.com/*
// @version     1.3
// ==/UserScript==

(function(){  
    function getMangaImageChapterPage() { 
        var mfMetaTagImage = document.getElementsByTagName('meta'); 

        for (i = 0; i < mfMetaTagImage.length ; i++) { 
            if (mfMetaTagImage[i].getAttribute("property") == "og:image") { 
                return mfMetaTagImage[i].getAttribute("content"); 
            } 
        } 
        return false;
    } 

    function getMetaMangaChapterTitle() { 
        var mfMetaTagChapter = document.getElementsByTagName('meta'); 

        for (i = 0; i < mfMetaTagChapter.length ; i++) { 
            if (mfMetaTagChapter[i].getAttribute("property") == "og:description") { 
                return mfMetaTagChapter[i].getAttribute("content"); 
            } 
        } 
        return false;
    } 
    if (document.getElementById("image") === null) {
        var mfMetaImage         = getMangaImageChapterPage().replace("thumbnails/mini.", "compressed/");
        var mfImageOryginal     = mfMetaImage.replace("l.mfcdn.net","z.mfcdn.net");
        var mfImageError        = mfMetaImage;
        var mfViewer            = document.getElementById("viewer");
        var mfMangaChapterTitle = getMetaMangaChapterTitle();
        
        var mfImageLink         = document.createElement("a");
            mfImageLink.setAttribute("href",'#');
            mfImageLink.setAttribute("onclick",'return enlarge()');
        
        var mfImage       = document.createElement("img");
            mfImage.setAttribute("id",'image');
            mfImage.setAttribute("src",mfImageOryginal);
            mfImage.setAttribute("onerror",mfImageError);
            mfImage.setAttribute("width", '728');
            mfImage.setAttribute("alt", mfMangaChapterTitle+' at MangaFox.me');
        mfImageLink.appendChild(mfImage);
        mfViewer.insertBefore(mfImageLink,mfViewer.firstChild);
    }
})();