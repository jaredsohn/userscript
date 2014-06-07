// ==UserScript==
// @name           Multi Manga Preloader
// @namespace      127.0.0.1
// @include        http://www.otakuworks.com/*/*/*/*/read/*
// @include        http://www.mangafox.com/*/*/*/*/
// @include        http://www.mangafox.com/*/*/*/*/*
// @include        http://manga.animea.net/*
// @include        http://www.mangareader.net/*/*
// ==/UserScript==
//////////////
// settings //
//////////////
var docq, dochist, docforwardhist;
var settings = {};
var otakuworks_com = {
    pagesToPreload: new Setting(3),
    indicatorParent: new Setting(document.body, function () {
        return myGetElementById("filelist");
    }),
    nextPageURL: new Setting("", function (doc) {
        var el = myGetElementById("filelist", doc);
        return el.getElementsByTagName("a")[0];
    }),
    imageEl: new Setting("", function (doc) {
        var el = myGetElementById("filelist", doc);
        return el.getElementsByTagName("a")[0].childNodes[0];
    }),
    processedNextDoc: new Setting("", function (doc) {
        return doc;
    })
};
var mangafox_com = {
    pagesToPreload: new Setting(4),
    indicatorParent: new Setting(document.body, function () {
        return myGetElementById("viewer");
    }),
    nextPageURL: new Setting("", function (doc) {
        var current_page, total_pages, current_chapter, current_chapter_index, dochtml;
        if (doc == null) {
            doc = document;
        }
        if (doc.body == undefined) {
            dochtml = doc.innerHTML;
        } else {
            dochtml = doc.body.innerHTML;
        }

        current_page = parseInt(dochtml.substring(dochtml.indexOf("var current_page=") + 17, dochtml.indexOf(";", dochtml.indexOf("var current_page="))));
        total_pages = parseInt(dochtml.substring(dochtml.indexOf("var total_pages=") + 16, dochtml.indexOf(";", dochtml.indexOf("var total_pages="))));
        current_chapter = dochtml.substring(dochtml.indexOf("var current_chapter='") + 21, dochtml.indexOf("';", dochtml.indexOf("var current_chapter=")));

        for (var ii = 0; ii < unsafeWindow.chapter_list.length; ii++) {
            if (unsafeWindow.chapter_list[ii][1] == current_chapter) current_chapter_index = ii;
        }

        myGetElementById('top_chapter_list', doc).value = current_chapter;
        myGetElementById('bottom_chapter_list', doc).value = current_chapter;

        if (current_page >= total_pages) {
            return "http://" + document.location.hostname + unsafeWindow.series_url + "/" + unsafeWindow.chapter_list[current_chapter_index + 1][1] + "/1.html"
        } else {
            return "http://" + document.location.hostname + unsafeWindow.series_url + "/" + current_chapter + "/" + (current_page + 1) + ".html";
        }
    }),
    imageEl: new Setting("", function (doc) {
        var el = myGetElementById("viewer", doc);
        return el.getElementsByTagName("img")[0];
    }),
    processedNextDoc: new Setting("", function (doc) {
        var current_page, total_pages, current_chapter, current_chapter_index, dochtml;
        if (doc == null) {
            doc = document;
        }
        if (doc.body == undefined) {
            dochtml = doc.innerHTML;
        } else {
            dochtml = doc.body.innerHTML;
        }

        current_page = parseInt(dochtml.substring(dochtml.indexOf("var current_page=") + 17, dochtml.indexOf(";", dochtml.indexOf("var current_page="))));
        total_pages = parseInt(dochtml.substring(dochtml.indexOf("var total_pages=") + 16, dochtml.indexOf(";", dochtml.indexOf("var total_pages="))));
        current_chapter = dochtml.substring(dochtml.indexOf("var current_chapter='") + 21, dochtml.indexOf("';", dochtml.indexOf("var current_chapter=")));

        var topchaplistel = myGetElementById('top_chapter_list', doc);
        var botchaplistel = myGetElementById('bottom_chapter_list', doc);

        for (var i = 0; i < unsafeWindow.chapter_list.length; i++) {
            if (unsafeWindow.chapter_list[i][1] == current_chapter) {
                topchaplistel.options[i] = new Option(unsafeWindow.chapter_list[i][0], unsafeWindow.chapter_list[i][1], true, true);
                botchaplistel.options[i] = new Option(unsafeWindow.chapter_list[i][0], unsafeWindow.chapter_list[i][1], true, true);
            } else {
                topchaplistel.options[i] = new Option(unsafeWindow.chapter_list[i][0], unsafeWindow.chapter_list[i][1]);
                botchaplistel.options[i] = new Option(unsafeWindow.chapter_list[i][0], unsafeWindow.chapter_list[i][1]);
            }
        }
        topchaplistel.value = current_chapter;
        botchaplistel.value = current_chapter;
        return doc;
    })
};
var manga_animea_net = {
    pagesToPreload: new Setting(4),
    indicatorParent: new Setting(document.body, function () {
        return getElementsByClass("container")[0];
    }),
    nextPageURL: new Setting("", function (doc) {
        return getElementsByClass("imagelink", doc)[0].href;
    }),
    imageEl: new Setting("", function (doc) {
        doc = doc == null ? document : doc;
        return doc.getElementsByTagName("img")[0];
    }),
    processedNextDoc: new Setting("", function (doc) {
        return doc;
    })
};
var mangareader_net = {
    pagesToPreload: new Setting(4),
    indicatorParent: new Setting(document.body, function () {
        return myGetElementById("imgholder");
    }),
    nextPageURL: new Setting("", function (doc) {
        return myGetElementById("imgholder", doc).getElementsByTagName("a")[0].href;
    }),
    imageEl: new Setting("", function (doc) {
        doc = doc == null ? document : doc;
        return myGetElementById("imgholder", doc).getElementsByTagName("img")[0];
    }),
    processedNextDoc: new Setting("", function (doc) {
        var menuel = myGetElementById("chapterMenu", doc);
        if (menuel == undefined) return doc;
        menuel.innerHTML = myGetElementById("chapterMenu", document).innerHTML;
        if (doc.body == undefined) {
            dochtml = doc.innerHTML;
        } else {
            dochtml = doc.body.innerHTML;
        }
        var current_chapter = dochtml.substring(dochtml.indexOf("document['chapterno'] = ") + 24, dochtml.indexOf(";", dochtml.indexOf("document['chapterno'] = ")));
        for (var ii = 0; ii < menuel.options.length; ii++) {
            if (menuel.options[ii].value.indexOf(current_chapter) != -1) {
                menuel.options[ii].selected = true;
                menuel.options[ii].defaultSelected = true;
            }
        }


        if (myGetElementById("zoomer", doc) != undefined) {

            var imgwidth = parseInt(dochtml.substring(dochtml.indexOf("document['imgwidth'] = ") + 23, dochtml.indexOf(";", dochtml.indexOf("document['imgwidth'] = "))));
            var imgheight = parseInt(dochtml.substring(dochtml.indexOf("document['imgheight'] = ") + 24, dochtml.indexOf(";", dochtml.indexOf("document['imgheight']"))));
            var imgheightaspect = parseInt(dochtml.substring(dochtml.indexOf("document['imgheightaspect'] = ") + 30, dochtml.indexOf("';", dochtml.indexOf("document['imgheightaspect'] = "))));


            if (myGetElementById("zoomer", doc).innerHTML == "- Smaller Image") {
                myGetElementById("imgholder", doc).style.width = "800px";
                myGetElementById("img", doc).width = 800;
                myGetElementById("img", doc).height = imgheightaspect;
                myGetElementById("zoomer", doc).innerHTML = "+ Larger Image";
            } else {
                myGetElementById("imgholder", doc).style.width = imgwidth + "px";
                myGetElementById("img", doc).width = imgwidth;
                myGetElementById("img", doc).height = imgheight;
                myGetElementById("zoomer", doc).innerHTML = "- Smaller Image";
            }
        }

        return doc;
    })
};

checkHash();

function Setting(initValue, getter) {
    this.value = initValue;
    this.get = getter == null ?
    function () {
        return this.value;
    } : getter;
    this.set = function (newValue) {
        this.value = newValue;
    };
}

function DocumentQueue(inmaxsize) {
    this.arr = [];
    this.add = function (doc) {
        if (this.arr.length < settings.pagesToPreload.get()) {
            this.arr.unshift(doc);
        }
    };
    this.load = function () {
        if (this.arr.length > 0) {
            var doctoload = this.arr.pop();
            var currdoc = document.createElement("div");
            currdoc.innerHTML = document.documentElement.innerHTML;
            currdoc.url = document.location.hash;
            dochist.add(currdoc);
            document.documentElement.innerHTML = doctoload.innerHTML;
            document.location.hash = doctoload.url;
            return true;
        } else {
            return false;
        }
    };
    this.preload = function () {
        if (this.arr.length > 0) {
            preload(settings.nextPageURL.get(this.arr[0]));
        } else {
            preload(settings.nextPageURL.get());
        }
    };
}

function DocumentStack(inmaxsize) {
    this.arr = [];
    this.maxsize = inmaxsize;
    this.add = function (doc) {
        if (this.arr.length >= this.maxsize) {
            this.arr.shift();
        }
        this.arr.push(doc);
    };
    this.load = function () {
        if (this.arr.length > 0) {
            var doctoload = this.arr.pop();
            document.documentElement.innerHTML = doctoload.innerHTML;
            document.location.hash = doctoload.url;
            return true;
        } else {
            return false;
        }
    };
    this.preload = function () {
        if (this.arr.length > 0) {
            console.log(this.arr[0].url);
            preload(settings.nextPageURL.get(this.arr[0]));
        } else {
            preload(settings.nextPageURL.get());
        }
    };
}

function checkHash() {
    var h = document.location.hash;
    console.log(h);
    if (h.indexOf(document.location.hostname) != -1) {
        document.location.href = h.substring(1, h.length);
    }
}

function initSettings() {
    var whereami = document.location.hostname;
    eval("settings = " + whereami.replace("www.", "").replace(/\./g, "_") + ";");
}

function initGlobals() {
    docq = new DocumentQueue(settings.pagesToPreload.get());
    dochist = new DocumentStack(100);
    docforwardhist = new DocumentStack(100);
}

window.addEventListener("load", function (e) {
    initSettings();
    initGlobals();
    initIndicator();
    preload(settings.nextPageURL.get());
}, false);
window.addEventListener("keypress", function (e) {
    if (e.charCode == 54 || e.charCode == 100) {
        nextPage();
    } else if (e.charCode == 52 || e.charCode == 97) {
        prevPage();
    } else if (e.charCode == 56 || e.charCode == 119) {
        window.scrollTo(window.scrollX, window.scrollY - 25);
    } else if (e.charCode == 53 || e.charCode == 50 || e.charCode == 115) {
        window.scrollTo(window.scrollX, window.scrollY + 25);
    }
}, false);

var initIndicator = function () {
    var imageWidth = settings.imageEl.get().width;
    var pagesToPreload = settings.pagesToPreload.get();
    var html = "<div id='indicator' style='margin:auto;margin-bottom:2px;width:";
    html += imageWidth / pagesToPreload * docq.arr.length;
    html += "px;height:1px;background-color:red;'></div>";
    settings.indicatorParent.get().innerHTML = html + settings.indicatorParent.get().innerHTML;
};

var updateIndicator = function () {
    var imageWidth = settings.imageEl.get().width;
    var pagesToPreload = settings.pagesToPreload.get();
    myGetElementById("indicator").style.width = imageWidth / pagesToPreload * docq.arr.length + "px";
    if (Math.abs(imageWidth / pagesToPreload * docq.arr.length - imageWidth) < imageWidth / pagesToPreload) {
        myGetElementById("indicator").style.backgroundColor = "yellow";
    }
};

function preload(nextpageurl) {
    var http = new XMLHttpRequest();
    http.open("GET", nextpageurl, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            var nextdoc = document.createElement("div");
            nextdoc.innerHTML = http.responseText;
            nextdoc.url = nextpageurl; // store the url of this document in the object in case we need it
            try {
                // grab the image and preload it, work with the indicator
                docq.add(settings.processedNextDoc.get(nextdoc));

                var imgurl = settings.imageEl.get(nextdoc).src;
                var imgobj = new Image();
                imgobj.addEventListener("load", updateIndicator, false);
                imgobj.src = imgurl;

                if (docq.arr.length < settings.pagesToPreload.get()) {
                    preload(settings.nextPageURL.get(nextdoc));
                }
            } catch (e) {
                //alert(e);
            }
        }
    };
    http.send(null);
}

function nextPage() {
    if (docforwardhist.arr.length == 0) {
        var wasfull = docq.arr.length >= settings.pagesToPreload.get();
        if (docq.load()) {
            initIndicator();
            window.scrollTo(0, 0);
            if (wasfull) {
                docq.preload();
            }
        }
    } else {
        var currdoc = document.createElement("div");
        currdoc.innerHTML = document.documentElement.innerHTML;
        currdoc.url = document.location.hash;
        dochist.add(currdoc);
        docforwardhist.load();
        window.scrollTo(0, 0);
    }
}

function prevPage() {

    if (dochist.arr.length > 0) {
        var currdoc = document.createElement("div");
        currdoc.innerHTML = document.documentElement.innerHTML;
        currdoc.url = document.location.hash;
        docforwardhist.add(currdoc);
        dochist.load();
    }
}

function getElementsByClass(inClass, doc) {
    if (doc == null) {
        doc = document;
    }
    var els = doc.getElementsByTagName("*");
    var result = [];
    var ii;
    for (ii = 0; ii < els.length; ii++) {
        if (els[ii].className == inClass) {
            result.push(els[ii]);
        }
    }

    return result;
}

myGetElementById = function (inId, doc) {
    if (doc == null) {
        doc = document;
    }
    var els = doc.getElementsByTagName("*");
    var result = [];
    var ii;
    for (ii = 0; ii < els.length; ii++) {
        if (els[ii].id == inId) {
            result.push(els[ii]);
        }
    }

    return result[0];
};