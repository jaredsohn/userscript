// ==UserScript==
// @name           Nico search filter
// @namespace      http://efcl.info/
// @include        http://www.nicovideo.jp/tag/*
// @include        http://www.nicovideo.jp/search/*
// @include        http://www.nicovideo.jp/myvideo/*
// @require http://gist.github.com/raw/310354/b2adc95e35f53cfb8162490b938639ab66db5ea9/GM_config.js
// ==/UserScript==

GM_config.init('Configuration for search filter',{
    alpha:    { label: '透明度:', type: 'int' , default: '0.5' },
    reg:    { section: ['NGフィルタ'] , label: '', type: 'textarea', cols:60 , rows:15, default: '東方(ボーカル|ヴォーカル)\n東方.*?Vocal' },
},  "#config_header {font-size:16pt !important;} .config_var {margin-left:20% !important;} #header {margin-bottom:30px !important;} .indent40 {margin-left:20% !important;}" , // to add your CSS - replace this with configStyle
    {
});


GM_registerMenuCommand('Nico search filter',GM_config.open);
var filter = qw(GM_config.get("reg")); // デフォルト値が入る
var alpha = GM_config.get("alpha");

var _doc = document;
var btnText = ['非表示','希薄化','強調'];

var btnID = 'NicoShowHideBtn';
var showhide = GM_getValue('favmode', 1);
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

    
    function insertNickname(doc) {
        // 動画番号とそのブロックの相対位置を取得
        var numTags = XPath.all(doc , '//table[@summary="videos"]//a[@class="vinfo_title"]');
            for(var i=0,len=numTags.length; i<len; i++) {
                (function(){// スコープに注意
                    var cell = numTags[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    var mTitle = numTags[i].title;
                    var mURL = numTags[i].href.slice(numTags[i].href.lastIndexOf("/") + 1 , numTags[i].href.length);
                    var mDisc = XPath.first(numTags[i].parentNode.parentNode , './p[@class="font12"]')
                    GM_xmlhttpRequest({
                        method: 'GET',
                        headers: { 'User-Agent': 'Mozilla/5.0 Greasemonkey' },
                        url: 'http://ext.nicovideo.jp/api/getthumbinfo/' + mURL,
                        onload: function(res){
                            var disc;
                            var flag = false;
                            // XML から DOMへと変換
                            var resDOM = XMLparse(res.responseText);
                                // 説明文の取得
                            disc = resDOM.querySelector("description").textContent;
                            //console.log(disc);
                            for(var m=0,fl=filter.length; m<fl ; ++m){
                                var re = new RegExp(filter[m], "i");
                                if(re.test(disc)){
                                    setCheck(cell);
                                    flag = true;
                                    break;
                                }else if(re.test(mTitle)){
                                    setCheck(cell);
                                    flag = true;
                                    break;
                                }
                            }
                            if(!flag){
                                mDisc.innerHTML = disc;
                            }
                        },
                        onerror: function(res){ GM_log(res.status + ':' + res.statusText); }
                    });
                })();
            }
    }
    function setCheck(entry){
        if(entry.className.indexOf("chkFaventry") == -1){
                entry.className += ' chkFaventry';
        }
    }
    function setBtn(){
        var body = _doc.body;
        var df = _doc.createDocumentFragment();
        GM_addStyle(
            '#'+btnID+'{position:fixed;overflow:auto;bottom:0;left:0;background:#FFFFFF url(/img/bg.png) repeat-x scroll 0 0;-moz-border-radius:0 8px 0 0;display:block;width:7em;color:#FFF;text-decoration:none;cursor:pointer;padding:5px 8px;opacity:0.8;z-index:10000;}'+
            '#'+btnID+':link,'+'#'+btnID+':visited,'+'#'+btnID+':hover{color:#eee;text-decoration:none;}'+
            '#'+btnID+' > span{margin-left:5px;color:red;}'
        );
        var div = c('div');
        div.id =btnID;
        var btn = c('a');
        btn.textContent = btnText[showhide];
        btn.addEventListener('click',chengeShowHide,false);
        var btn2 = c('span');
        btn2.textContent = '設定';
        btn2.addEventListener('click',GM_config.open ,false);
        div.appendChild(btn);
        div.appendChild(btn2);
        df.appendChild(div);
        body.appendChild(df);
        addCss(showhide);
    }

    function chengeShowHide(){
        if(showhide == 2){
            showhide=0;
        }else if(showhide == 1){
            ++showhide;
        }else{
             ++showhide;
        }
        addCss(showhide);
        GM_setValue('favmode', showhide);
        e(btnID).firstChild.firstChild.nodeValue = btnText[showhide];
    }
    function addCss(num){

        if(num == 1){       // translucent
            GM_addStyle('.chkFaventry{display: block; opacity :'+alpha+'; -moz-opacity:'+alpha+';}');
        }else if(num == 2){ // accent
            GM_addStyle('.chkFaventry{display: block; opacity: 1;-moz-opacity: 1;background-color: #ffffdd; border:3px solid #ff4f16;}');
        }else{          // hide
            GM_addStyle('.chkFaventry{display: none; background-color: #fff; border:0;}}');
        }

    }
    function XMLparse(res) {
      var parser = new DOMParser();
      if(res == '')
          return null;
      return parser.parseFromString(res, 'text/xml');
    }
    function c(tag_name){
        return _doc.createElement(tag_name);
    }
    function e(id){
        return _doc.getElementById(id);
    }

    function unescapeHTML(str) {
        return stripTags(str).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
    }
    function stripTags(str) {
        return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    }
    function qw(words) {
        var a = String(words).split("\n");
        if (a.length > 0 && a[0] == "")
            a.unshift();
        if (a[a.length - 1] == "")
            a.pop();
        return a;
    }
    // 3.6 false http://github.com/hatena/hatena-bookmark-xul/blob/master/chrome/content/common/05-HTMLDocumentCreator.js
    // fix http://nanto.asablo.jp/blog/2010/01/24/4836539
    function createDocumentFromString(source) {
      var XHTML_NS = 'http://www.w3.org/1999/xhtml';
      var doctype = document.implementation.createDocumentType('html',
        '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd');
      var doc = document.implementation.createDocument(XHTML_NS, 'html', doctype);
      var range = document.createRange();
      range.selectNodeContents(document.documentElement);
      var content = doc.adoptNode(range.createContextualFragment(source));
      doc.documentElement.appendChild(content);
      return doc;
    }
/* init */
    setBtn();
    insertNickname(document);
    if(window.AutoPagerize) {
        boot();
    }else{
        window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
    }

    function boot(){
        window.AutoPagerize.addFilter(function(docs){
            docs.forEach(insertNickname);
        });
    }
