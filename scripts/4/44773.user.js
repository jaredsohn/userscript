// ==UserScript==
// @name           amazon_cross_meter
// @namespace      http://web.zgo.jp/
// @include        http://www.amazon.co.jp/*
// @description    Amazonの書籍ページに読書メーターの感想を表示
// @resource css   https://raw.github.com/azu/amazon_cross_meter/master/amazon_cross_meter.css
// ==/UserScript==
(function(){
    /* config */

    var defalutView = true;// レビューエリアの表示/非表示
    var defalutURL = true;// ジャンルがよく分からないときの場合、trueなら読書メーター、falseならゲームメーター
    var insertPoint = document.getElementById("handleBuy");//上の方に表示
    //var insertPoint = document.getElementById("customerReviews");//カスタマーレビューの位置に表示    

    /* end config */

    var GAMEMETER = "http://gamemeter.net";
    var BOOKMETER = "http://book.akahoshitakuya.com";
    var appear = "display:block;"
    var hidden = "display:none;"
    var contentView = defalutView;

    var XPath = {
        cache : null,
        reset : function(){
            this.cache = {__proto__ : null};
        },
        get : function(context, expr, type){
            var x = new XPathEvaluator();
            var cache = this.cache, evaluator;
            if (expr in cache){
                evaluator = cache[expr];
            }else{
                evaluator = cache[expr] = x.createExpression(expr, null);
            }
            return evaluator.evaluate(context, type, null);
        },
        has : function(context, expr){
            return this.get(context, expr, XPathResult.BOOLEAN_TYPE).booleanValue;
        },
        first : function(context, expr){
            return this.get(context, expr, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
        },
        last : function(context, expr){
            var all = this.get(context, expr, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
            return all.snapshotItem(all.snapshotLength - 1) || null;
        },
        all : function(context, expr){
            var all = this.get(context, expr, XPathResult.ORDERED_NODE_ITERAATE_TYPE);
            var ret = [];
            for (var i; (i = all.iterateNext()) !== null;){
                ret.push(i);
            }
            return ret;
        }
    };
    XPath.reset();

    function createHTMLDocument(aText){
        var xsl = (new DOMParser()).parseFromString(["<?xml version='1.0'?>",
            "<stylesheet version='1.0' xmlns='http://www.w3.org/1999/XSL/Transform'>", "<output method='html' />",
            "</stylesheet>"].join("\n"), "text/xml");
        var xsltp = new XSLTProcessor();
        xsltp.importStylesheet(xsl);
        var doc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));
        var range = doc.createRange();
        doc.appendChild(doc.createElement("html"));
        range.selectNodeContents(doc.documentElement);
        doc.documentElement.appendChild(range.createContextualFragment(aText));
        return doc;
    }

    function toggleButtonEventLiner(){
        var toggleArea = document.getElementById("meter_review_main");
        if (contentView){//ボタンが内容が表示されてる時
            contentView = false;
            toggleArea.setAttribute("style", hidden);
        }else{
            contentView = true;
            toggleArea.setAttribute("style", appear);
        }
    }

    /* ジャンルID取得 */
    function getGenreID(){
        if (XPath.has(document, 'id("navSubnavRowTR")//td[@class="navSubItem"]/a[starts-with(text(),"機種") or starts-with(text(),"ジャンル")]')){
            var nodeTag = XPath.first(document, 'id("navSubnavRowTR")//td[@class="navSubItem"]/a[starts-with(text(),"機種") or starts-with(text(),"ジャンル")]')
            if (nodeTag.getAttributeNode('href').value.match(/node=([^&\"]+)/)){
                return RegExp.$1;
            }
        }else{
            return null
        }
    }

    requestCrossreview = function(){
        var asin = document.getElementById("ASIN");
        if (!asin){
            return;
        }
        asin = asin.value;
        var genreID = getGenreID();
        ////console.log(genreID);
        genreID = parseInt(genreID, 10);
        //アマゾン(Amazon.co.jp)のブラウズノード(Browse Node)一覧 [ http://aws.pheelo.info/browse-node/ ]
        var XHRURL;
        var XHRURL_method;
        if (genreID == 465610 || genreID == 52231011){//本&洋書
            XHRURL = BOOKMETER;
            XHRURL_method = XHRURL + "/b/";
        }else if (genreID == 637872 || genreID == 637642){
            XHRURL = GAMEMETER;
            XHRURL_method = XHRURL + "/g/";
        }else{
            if (defalutURL){//読書メーター
                XHRURL = BOOKMETER;
                XHRURL_method = XHRURL + "/b/";
            }else{
                XHRURL = GAMEMETER;
                XHRURL_method = XHRURL + "/g/";
            }
        }

        var opt = {
            method : "get",
            headers : {
                'User-Agent' : 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-type' : 'application/x-www-form-urlencoded'
            },
            url : XHRURL_method + asin,
            onload : function(detail){
                var res = createHTMLDocument(detail.responseText);
                var reviewArea = res.getElementsByClassName("log_list_detail");
                var reviewAreaNum = reviewArea.length;
                //邪魔な要素を隠す
                if (reviewAreaNum > 0){
                    for (var i = 0; i < reviewAreaNum; i++){
                        var parentNode = reviewArea[i].parentNode;
                        var aTags = parentNode.getElementsByTagName("a");
                        var tmp;
                        for (var j = 0, l = aTags.length; j < l; j++){
                            tmp = aTags[j].href;
                            tmp = XHRURL + tmp;
                            aTags[j].href = tmp;
                        }
                        var imgTags = parentNode.getElementsByTagName("img");
                        for (var j = 0, l = imgTags.length; j < l; j++){
                            imgTags[j].setAttribute("style", "border: 0px!important;");
                        }
                        var spanTags = parentNode.getElementsByTagName("span");
                        for (var j = 0, l = spanTags.length; j < l; j++){
                            spanTags[j].setAttribute("style", "display:none;");
                        }
                        var divTags = parentNode.getElementsByTagName("div");
                        for (var j = 0, l = divTags.length; j < l; j++){
                            divTags[j].removeAttribute("style");
                        }
                        var log_lists = parentNode.getElementsByClassName("log_list_info");
                        for (var j = 0, len = log_lists.length; j < len; j++){
                            var log_list = log_lists[j];
                            log_list.parentNode.removeChild(log_list);
                        }
                        var textAreas = parentNode.getElementsByClassName("res_post_area");
                        for (var j = 0, len = textAreas.length; j < len; j++){
                            var textArea = textAreas[j];
                            textArea.parentNode.removeChild(textArea);
                        }
                    }
                }
                //console.log(res);
                var divTag = document.createElement("div");
                divTag.id = "meter_review";
                var divTagMain = document.createElement("div");
                divTagMain.id = "meter_review_main";
                var toggleButton = '<div class="meter_review_button" id ="toggleButton">' +
                        '    <span id="meter_review__value">感想はありません</span>' +
                        '</div>';
                divTag.innerHTML = toggleButton +
                        '<a href ="' + XHRURL_method + asin + '">' +
                        '<img src="' + XHRURL + '/image/favicon.ico" style="border: 0px;padding: 5px 0 5px 0;" /></a><br style="clear:both;" />';

                var divReviewContent = document.createElement("div");
                divReviewContent.id = "meter_content";
                if (reviewAreaNum > 0){
                    if (defalutView){
                        contentView = true;
                        divTagMain.setAttribute("style", appear);
                    }else{
                        contentView = false;
                        divTagMain.setAttribute("style", hidden);
                    }
                    for (var i = 0; i < reviewAreaNum; i++){
                        var tmpObj = reviewArea[i].parentNode.cloneNode(true);
                        divReviewContent.appendChild(tmpObj);
                    }
                }else{
                    contentView = false;
                    divTagMain.setAttribute("style", hidden);
                }


                divTagMain.appendChild(divReviewContent);
                divTag.appendChild(divTagMain);
                insertPoint.insertBefore(divTag, insertPoint.firstChild);

                var button = document.getElementById("toggleButton");
                if (reviewAreaNum > 0){
                    button.getElementsByTagName("span")[0].innerHTML = reviewAreaNum + "件の感想"
                }
                button.addEventListener("click", toggleButtonEventLiner, false);
            },
            onerror : function(detail){
                console.log(detail);
            }

        };
        //console.log("test");
        GM_xmlhttpRequest(opt);
    };
    GM_addStyle(GM_getResourceText("css"));
    requestCrossreview();

})();
