// ==UserScript==
// @name           Nico MylistComments
// @namespace      http://efcl.info/
// @description    ニコニコ動画再生ページからマイリストコメントを参照する
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
const mylistcomment_counter = unsafeWindow.so.variables.mylistcomment_counter;
if(mylistcomment_counter == 0) return;
var XPath = {
    cache: null,
    reset: function () {
        this.cache = {__proto__: null};
    },
    get: function (context, expr, type) {
        var x = new XPathEvaluator();
        var cache = this.cache, evaluator;
        if (expr in cache) {
            evaluator = cache[expr];
        } else {
            evaluator = cache[expr] = x.createExpression(expr, null);
        }
        return evaluator.evaluate(context, type, null);
    },
    has: function (context, expr) {
        return this.get(context, expr, XPathResult.BOOLEAN_TYPE).booleanValue;
    },
    first: function (context, expr) {
        return this.get(context, expr, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    },
    last: function (context, expr) {
        var all = this.get(context, expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
        return all.snapshotItem(all.snapshotLength - 1) || null;
    },
    all: function (context, expr) {
        var all = this.get(context, expr, XPathResult.ORDERED_NODE_ITERAATE_TYPE);
        var ret = [];
        for (var i; (i = all.iterateNext()) !== null;) {
            ret.push(i);
        }
        return ret;
    }
};
XPath.reset();
// マイリストコメントの要素
var insPnt = XPath.first(document ,"id('des_2')/table[1]//p[last()]");
var clickTag = document.createElement("input");
clickTag.type = "submit";
clickTag.value = "表示する";
clickTag.setAttribute("class","submit");
clickTag.addEventListener("click",function(){
    var doc = document,isplay;
    var frameObj = doc.getElementsByName("comment_frame")[0];
    if(!frameObj){
        makeFrame(gotFrame, "comment_frame");
    }else{
        toggle();
    }
    function toggle(){
        isplay = frameObj.style.display;
        if(isplay === "none"){
            frameObj.style.display = "block";
        }else{
            frameObj.style.display = "none";    
        }
    }
},false);
insPnt.appendChild(clickTag);

function gotFrame(iframe, win, doc) {
    iframe.height = "350";
    iframe.width  = "600";
    iframe.style.position = "fixed";
    iframe.style.bottom = iframe.style.left = "0";

    getMylistcomments(function(res) {
        doc.body.innerHTML += res.join("\n")
    });
    function getMylistcomments(callback) {
        var itemId = document.getElementsByName("thread_id")[0].value;
        GM_xmlhttpRequest({
            method: 'GET',
            url: "http://www.nicovideo.jp/api/mylistcomment/list?item_type=0&item_id=" + itemId,
            headers: {
                'User-Agent': 'Mozilla/5.0 Greasemonkey; Nico MylistComments'
            },
            onload: function(res) {
                var jsObject = JSON.parse(res.responseText);
                var l = jsObject.mylistcomment.length;
                var result = [],desc;
                if (jsObject.status == "ok" && l > 0) {
                    for (var i = 0; i < l; i++) {
                        desc = jsObject.mylistcomment[i].description;
                        // 生放送からの登録を取り除く
                        if(/生放送.*?から登録/.test(desc)) continue;
                        if(i%2 == 0){
                            result.push('<p style="background-color:#cce5ff;margin:1px 0 1px;">'+desc +'</span>')
                        }else{
                            result.push('<p style="background-color:#fff;margin:1px 0 1px;">'+desc +'</span>')
                        }
                    }
                    callback(result)
                }
            }
        });
    }
}
// Creates a new iframe and attaches it to the DOM, waits for it to load, tests
// that we did not hit https://bugzilla.mozilla.org/show_bug.cgi?id=295813 nor
// https://bugzilla.mozilla.org/show_bug.cgi?id=388714 (and retries otherwise),
// to finally call the provided done callback, passing the iframe, its window
// and document. (The optional name parameter, if provided, will be used to name
// the iframe in window.frames, or be created as "pane-1" onwards, otherwise.)
/*
    var cacllback = function(iframe, win, doc){
        
    }
    makeFrame(cacllback);
    makeFrame(cacllback , "frameName");
    makeFrame(cacllback , "frameName" , true);// debug mode
*/
    
function makeFrame(callback/*(iframeTag, window, document)*/, name, debug) {
    function testInvasion() {
        iframe.removeEventListener("load", done, true);
        var message = ((new Date) - load.start) + "ms passed, ";
        try { // probe for security violation error, in case mozilla struck a bug
            var url = unsafeWindow.frames[framename].location.href;
            message += url == "about:blank" ? "but we got the right document." : "and we incorrectly loaded " + url;
            if (debug) console.log(message);
            done();
        }
        catch(e) {
            if (console && console.error && console.trace) {
                console.error(e);
                console.trace();
            }
            if (debug) console.log(message + "and our iframe was invaded. Trying again!");
            document.body.removeChild(iframe);
            makeFrame(callback, name);
        }
    }
    function done() {
        clearTimeout(load.timeout);
        if (debug) console.log("IFrame %x load event after %d ms", framename, (new Date) - load.start);
        var win = unsafeWindow.frames[framename];
        var doc = iframe.contentWindow.document;
        // 苦し紛れのエスケープ
        var esframeName = "'"+framename+"'";
        // 自分自身のiframeを閉じるボタン
        var xImg = doc.createElement("img");
        xImg.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAATElEQVQoka2RSQ4AIAgD+f+jp96M0aq49AgdUiB0qZCkONQ/EBAwDOrrU7A1uZqN2hodtNwRqNdz0VOg62+jzuDUcVzkf+/I6h28UQHjW25Gob5AIAAAAABJRU5ErkJggg=="
        xImg.setAttribute("onclick", "parent.document.getElementsByName("+esframeName+")[0].style.display='none';");
        xImg.setAttribute("style","background-color:red;border:3px;position:fixed;top:0px;right:0px");
        doc.body.appendChild(xImg);
        callback(iframe, win, doc);
    }
    var iframe = document.createElement("iframe");
    var framename = iframe.name = typeof name != "undefined" ? name : ("pane" + (makeFrame.id = (makeFrame.id || 0) - 1));
    iframe.setAttribute("style", "overflow:auto; " + "z-index:18999; border:0; margin:0; padding:0; " + "top:auto; right:auto; bottom:auto; left:auto;background-color:#fff");
    iframe.src = "about:blank";
    iframe.addEventListener("load", done, true);
    var frames = makeFrame.data || {};
    var load = frames[framename] || {
        start: new Date,
        sleepFor: 400
    };
    load.timeout = setTimeout(testInvasion, load.sleepFor);
    load.sleepFor *= 1.5;
    frames[framename] = load;
    makeFrame.data = frames;
    document.body.appendChild(iframe);
}
