// ==UserScript==
// @id             www.tinami.com-tweak@scriptish
// @name           TINAMI - Tweak
// @version        1.2
// @namespace      
// @author         http://www.tinami.com/profile/178919
// @description    Some little adjustments.
// @include        http://www.tinami.com/*
// @run-at         document-end
// ==/UserScript==

var styles = {
    "TINAMI": [
        ""
    ],
    "profile/178919": [
        "body { background: #839496; }",
        "div#deteil #deteil_table td { background: #93A1A1; }",
        "#view .nv_body { background: #657B83; }"
    ]
};

var myStyle = styles["profile/178919"];


var queries = {
    "detailed": {
        "output": "dt"
    },
    "detailed, except novel": {
        "output": "dt",
        "type[]": [1, 2, 3, 5]
    }
};

var myQuery = queries["detailed, except novel"];


//---- Constructor ----

var elmAttrs = function (obj) {
    var that = {};
    var setAll;

    setAll = function (elm) {
        var name;
        for (name in obj) {
            if (obj.hasOwnProperty(name)) {
                elm.setAttribute(name, obj[name]);
            }
        }
        return elm;
    };
    that.setAll = setAll;

    return that;
};


var elmWrapper = function (elmName) {
    var that = {};
    var _content, make;

    _content = function (sth) {
        if (typeof (sth) === "string") {
            return document.createTextNode(sth);
        }
        else {
            return sth;
        }
    };

    make = function (sth, obj) {
        var attrs, elm;
        attrs = elmAttrs(obj) || elmAttrs({});
        elm = document.createElement(elmName);
        elm = attrs.setAll(elm);
        elm.appendChild(_content(sth));
        return elm;
    };
    that.make = make;

    return that;
};


var tinamiQuery = function (obj) {
    var that = {};
    var _encode, _encodeAll, toString;

    _encode = function (field, value) {
        return encodeURIComponent(field) + "=" + encodeURIComponent(value);
    };

    _encodeAll = function (obj) {
        var ret, name;
        ret = [];
        for (name in obj) {
            if (obj[name] instanceof Array) {
                obj[name].forEach(
                    function (x) {ret.push(_encode(name, x));}
                );
            }
            else {
                ret.push(_encode(name, obj[name]));
            }
        }
        return ret;
    };

    toString = function () {
        return _encodeAll(obj).join("&");
    };
    that.toString = toString;

    return that;
};


var appender = function (spec, obj) {
    var that = {};
    var obj, name, append;
    obj = obj || {};

    for (name in obj) {
        spec[name] = obj[name];
    }

    append = function () {
        spec.proc(spec.container(), spec.item());
    };
    that.append = append;

    return that;
};


//---- Object ----

var userStyle = {
    recipe: [],
    apply: function () {
        this.recipe.forEach(
            function (x) {GM_addStyle(x);}
        );
    }
};


var tinamiPage = {
    url: function () {
        return window.location.href;
    },

    title: function () {
        var begin;
        begin = "TINAMI - ".length;
        return document.title.slice(begin);
    }
};


//-- topPage --
var topPage = Object.create(tinamiPage);


//isHere :: () -> Bool
topPage.isHere = function () {
    return (this.url() === "http://www.tinami.com/");
};


//-- creatorProfilePage --
var creatorProfilePage = Object.create(tinamiPage);


//isHere :: () -> Bool
creatorProfilePage.isHere = function () {
    return (this.creatorId() !== null);
};


//creatorId :: () -> String/null
creatorProfilePage.creatorId = function () {
    var re, result;
    re = /http:\/\/www\.tinami\.com\/creator\/profile\/(\d+)/;
    result = re.exec(this.url());
    return (result === null) ? null : result[1];
};


//jobStickers :: () -> [DOM element]
creatorProfilePage.jobStickers = function () {
    var ret, nodesSnap, i;
    ret = [];
    nodesSnap = document.evaluate(
        "//div[@class='cre_name']/p[2]/img",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (i = 0; i < nodesSnap.snapshotLength; i++) {
        ret.push(nodesSnap.snapshotItem(i));
    }

    return ret;
};


//-- viewPage --
var viewPage = Object.create(tinamiPage);


//isHere :: () -> Bool
viewPage.isHere = function () {
    var re;
    re = /http:\/\/www\.tinami\.com\/view\/\d+/;
    return re.test(this.url());
};


//author :: () -> String
viewPage.author = function () {
    return fstNode("//div[@class='prof']//strong").textContent;
};


//timestamp :: () -> String
viewPage.timestamp = function () {
    var elms, begin, end;
    elms = document.getElementsByClassName("view_info");
    begin = "_".length;
    end = "_yyyy-mm-dd hh:mm:ss".length;
    return elms.item(0).textContent.slice(begin, end);
    //String, Not Date object.
};


//typeIcon :: () -> URL String
viewPage.typeIcon = function () {
    return fstNode("//div[@class='viewdata']/p/img[1]").src;
};


//hasThisIcon :: URL String -> Bool
viewPage.hasThisIcon = function (path) {
    return (this.typeIcon() === path);
};


//-- novelPage --
var novelPage = Object.create(viewPage);


//isHere :: () -> Bool
novelPage.isHere = function () {
    var path;
    path = "http://www.tinami.com/img/job/view/nv.gif";
    return (viewPage.isHere() && this.hasThisIcon(path));
};


//rawText :: () -> [String]
novelPage.rawText = function () {
    var ret, nodesSnap, i;
    ret = [];
    nodesSnap = document.evaluate(
        "//div[@class='nv_body']/p",
        document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (i = 0 ; i < nodesSnap.snapshotLength; i++) {
        ret.push(nodesSnap.snapshotItem(i).textContent);
    }

    return ret;
};


//copyContent :: () -> String
novelPage.copyContent = function () {
    var ary;
    ary = strArray();
    ary.push(this.url());
    ary.push(this.title());
    ary.push(this.author() + "さん");
    ary.push(this.timestamp());
    ary.push("----------");
    ary.push(this.rawText());
    return ary.join();
};


var strArray = function () {
    var that = {};
    var _ary, push, join;

    _ary = [];

    _join = function (ary) {
    };

    push = function (x) {
        _ary.push(x);
    };
    that.push = push;

    join = function () {
        var ret;
        ret = _ary.reduce(
            function (prev, x) {return prev.concat(x);},
            []
        );
        return ret.join("\n");
    };
    that.join = join 

    return that;
};


//---- Function ----

//jobTypeNumberFrom :: URL String -> Int
var jobTypeNumberFrom = function (url) {
    var re, result, sign;
    re = /http:\/\/www\.tinami\.com\/img\/job\/(\w+)\.gif/;
    result = re.exec(url);
    sign = (result === null) ? null : result[1];
    switch (sign) {
    case "il":
        return 1;
    case "ma":
        return 2;
    case "mo":
        return 3;
    case "nv":
        return 4;
    case "cp":
        return 5;
    default:
        throw new Error("no match.");
    }
};


//fstNode :: XPath String -> DOM element
var fstNode = function (xpath) {
    var node;
    node = document.evaluate(xpath,
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return node.singleNodeValue;
};


//---- Main ----

userStyle.recipe = myStyle;
userStyle.apply();


if (topPage.isHere()) {
    //console.log("topPage");

    var spec = {
        container: function () {
            return document.getElementById(spec.id);
        },
        item: function () {
            var li, a;
            li = elmWrapper("li");
            a = elmWrapper("a");
            return li.make(a.make(spec.content, spec.attrs));
        },
        proc: function (container, item) {
            container.insertBefore(item, container.lastChild);
        }
    };

    appender(spec, {
            id: "tab-container",
            content: "@おあつらえ",
            attrs: {
                "href": "/search/list?" + tinamiQuery(myQuery).toString()
            }
        }).append();

    appender(spec, {
            id: "tab-container-2",
            content: "@公開コレクション",
            attrs: {
                "href": "/collection/public/all"
            }
        }).append();

    return;
}


if (creatorProfilePage.isHere()) {
    //console.log("creatorProfilePage");

    creatorProfilePage.jobStickers().forEach(
        function (x) {
            var spec = {
                container: function () {
                    return x;
                },
                item: function () {
                    var a, img;
                    a = elmWrapper("a");
                    img = elmWrapper("img");
                    return a.make(img.make("", spec.imgAttrs), spec.attrs);
                },
                proc: function (container, item) {
                    container.parentNode.replaceChild(item, container);
                }
            };

            var q = tinamiQuery({
                    "prof_id": creatorProfilePage.creatorId(),
                    "type[]": jobTypeNumberFrom(x.src)
                });

            appender(spec, {
                    imgAttrs: {
                        "alt": x.alt,
                        "src": x.src,
                        "title": "作品一覧を表示する" 
                    },
                    attrs: {
                        "href": "/search/list?" + q.toString()
                    }
                }).append();
        });

    var spec = {
        container: function () {
            return fstNode(spec.xpath);
        },
        item: function () {
            var elm;
            elm = elmWrapper("a");
            return elm.make(spec.content, spec.attrs);
        },
        proc: function (container, item) {
            container.insertBefore(item, container.lastChild);
        }
    };

    var q = tinamiQuery({
            "prof_id": creatorProfilePage.creatorId(),
            "output": "dt"
        });

    appender(spec, {
            xpath: "//div[@class='section']//p[@class='more']",
            content: "（詳細表示）",
            attrs: {
                href: "/search/list?" + q.toString()
            }
        }).append();

    return;
}


if (novelPage.isHere()) {
    //console.log("novelPage");

    var spec = {
        container: function () {
            return document.getElementById(spec.id);
        },
        item: function () {
            var elm;
            elm = elmWrapper("textarea");
            return elm.make(spec.content, spec.attrs);
        },
        proc: function (container, item) {
            container.parentNode.insertBefore(item, container.nextSibling);
        }
    };

    appender(spec, {
            id: "view",
            content: novelPage.copyContent(),
            attrs: {
                cols: 100,
                rows: 4
            }
        }).append();

    return;
}

