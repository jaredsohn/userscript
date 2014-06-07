// ==UserScript==
// @id             		 changeSearchEngine
// @name           	搜索引擎切换
// @version        		1.0
// @namespace       com.landry
// @author         		landry668@vip.qq.com
// @description    	搜索引擎切换，可在百度、google中互相切换，另外的bing、搜狗、搜搜、有道，不常用没有更新
// @include        		http://www.baidu.com*
// @include        		http://www.google.com*
// @run-at         		document-end
// ==/UserScript==

//通用工具类
var util = {
    //创建select对象
    createSelectOptions : function() {

        objICOs = new Array(7);
        objICOs[1] = "http://p13.freep.cn/p.aspx?u=v20_p13_photo_1205030004542381_0.png";
        objICOs[2] = "http://p13.freep.cn/p.aspx?u=v20_p13_photo_1205030005365007_0.png";
        objICOs[3] = "http://p13.freep.cn/p.aspx?u=v20_p13_photo_1205030005126996_0.png";
        objICOs[4] = "http://p13.freep.cn/p.aspx?u=v20_p13_photo_1205031441278608_0.png";
        objICOs[5] = "http://p13.freep.cn/p.aspx?u=v20_p13_photo_1205030006279469_0.png";
        objICOs[6] = "http://p13.freep.cn/p.aspx?u=v20_p13_photo_1205030006502681_0.png";

        //options列表
        var objOptions = new Array('选择搜索引擎', '百度', '谷歌', 'Bing', 'Sogou', '搜搜', '有道');
        //options值
        var objValues = new Array(7);
        objValues[0] = "javascript:void()";
        objValues[1] = "http://www.baidu.com/s?tn=myie2dg&ch=2&ie=utf-8&wd=";
        objValues[2] = "http://www.google.com.hk/search?q=";
        objValues[3] = "http://cn.bing.com/search?form=QBLH&filt=all&q=";
        objValues[4] = "http://www.sogou.com/web?query=";
        objValues[5] = "http://www.soso.com/q?w=";
        objValues[6] = "http://www.youdao.com/search?q=";

        //创建select对象
        var objSelect = document.createElement("select");
        var objOptGroup = document.createElement("optgroup");
        objOptGroup.label = objOptions[0];
        objOptGroup.className = "optGroup";
        objSelect.appendChild(objOptGroup);

        //添加option
        for(var i = 1, j = 0; i < 7; i++, j++) {
            var newOpt = new Option(objOptions[i], objValues[i]);
            newOpt.className = "ico" + j;
            objSelect.add(newOpt);

            var img = document.createElement("img");
            img.width = 16;
            img.height = 16;
            img.src = objICOs[i];
            var optText = newOpt.childNodes[0];
            optText.parentNode.insertBefore(img, optText);
        }
        objSelect.options.selectedIndex = -1;
        objSelect.className = "mySelect";
        objSelect.addEventListener("change", function(event) {
            var keyWord;
            if(util.getHostname().name == "baidu") {
                var target = event.target;
                var sel = document.getElementsByTagName("select")[0];
                var index = target == sel ? 0 : 1
                var kw = document.getElementsByName("wd")[index];
                keyWord = kw.value;
            }
            else if(util.getHostname().name == "google") {
                var kw = document.getElementById("lst-ib");
                keyWord = kw.value;
            }
            window.location.href = this.options[this.options.selectedIndex].value + "" + encodeURI(keyWord);
        }, false);

        return objSelect;
    },
    //添加CSS样式的方法
    addGlobalStyle : function(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if(!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    },
    //XPath查询
    xpath : function(query) {
        return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    },

    //得到主机名
    getHostname : function() {
        var url = window.location.host;
        if(url.indexOf("www.baidu.com") == 0) {
            return {
                id : 1,
                name : 'baidu'
            };
        }
        else if(url.indexOf("www.google.com.hk") == 0) {
            return {
                id : 2,
                name : "google"
            };
        }
        else if(url.indexOf("cn.bing.com") == 0) {
            return {
                id : 3,
                name : "bing"
            };
        }
        else if(url.indexOf("www.sogou.com") == 0) {
            return {
                id : 4,
                name : "sogou"
            };
        }
        else if(url.indexOf("www.soso.com") == 0) {
            return {
                id : 5,
                name : "soso"
            };
        }
        else if(url.indexOf("www.youdao.com") == 0) {
            return {
                id : 6,
                name : "youdao"
            };
        }
    }

}// end util
//=======================================================

var baidu = {
    ////去除百度按钮原来的样式
    deleteBaiduWrapp : function() {
        util.addGlobalStyle("span.s_btn_wr {background:#ffffff; !important}");
        util.addGlobalStyle("input.s_btn {background:#ffffff; !important}");
    },
    //设置select样式
    initSelectStyle : function() {
        util.addGlobalStyle("select.mySelect{border-radius: 3px 3px 3px 3px; cursor: pointer;!important}");    	
        util.addGlobalStyle("select {outline: medium none; width:120px;height:32px;font-size:14px;font-family:微软雅黑;vertical-align:middle;border:1px solid #999999;!important}")
        util.addGlobalStyle("select .optGroup {vertical-align:middle;height:22px;line-height:22px;font-size:14px;font-family:微软雅黑; !important}");
        util.addGlobalStyle("select option {vertical-align:middle;height:25px;line-height:25px;padding-left:2px;padding-top:2px; !important}");
        util.addGlobalStyle("select option img{padding-right:5px; padding-bottom:-2px;vertical-align:middle !important}");
    },
    addBaiduSearch : function() {

        //www.baidu.com，只有一个关键字输入框
        //http://www.baidu.com/s?wd=xxxxxx; ，两个关键字输入框
        if(window.location.hostname == "www.baidu.com") {
            //去除原来的样式
            this.deleteBaiduWrapp();

            var submitArray = util.xpath("//input[@type='submit']");
            var length = submitArray.snapshotLength;

            var first = submitArray.snapshotItem(0);
            var select1 = util.createSelectOptions();
            first.parentNode.replaceChild(select1, first);
            if(length == 2) {
                var second = submitArray.snapshotItem(1);
                var select2 = util.createSelectOptions();
                second.parentNode.replaceChild(select2, second);
            }
            //添加百度的select样式
            util.addGlobalStyle("span.tools{display:none; !important}");
            //推荐
            util.addGlobalStyle("span.s_help {margin-left:80px;}");
            //设置select样式
            this.initSelectStyle();
        }

    }

}
//========================================================
var google = {
    //设置select样式
    initSelectStyle : function() {
        util.addGlobalStyle("select {font-family:微软雅黑;padding: 0pt; margin: 0pt; height: 29px; width: 120px; outline: medium none; !important}")
        util.addGlobalStyle("select .optGroup {vertical-align:middle;height:22px;line-height:22px;font-size:14px; !important}");
        util.addGlobalStyle("select option {vertical-align:middle;height:25px;line-height:25px;padding-left:2px;padding-top:2px; !important}");
        util.addGlobalStyle("select option img{padding-right:5px; padding-bottom:-2px;vertical-align:middle !important}");
    },
    addGoogleSearch : function() {

        if(window.location.host == "www.google.com.hk") {
            this.initSelectStyle();
            var newSelectObj = util.createSelectOptions();
            var submit;
            var fullName = window.location.href;
            if(fullName.indexOf("?q=") != -1 || fullName.indexOf("&q=") != -1) {
                //有参数
                var buttonArray1 = util.xpath("//*[@name='btnG']");
                submit = buttonArray1.snapshotItem(0);
                util.addGlobalStyle(".lsb {background:none;border:none; !important}");
                util.addGlobalStyle(".sbico {background:#ffffff;display:none;!important}");
                util.addGlobalStyle("#sblsbb {background:#ffffff; !important}");
                submit.parentNode.innerHTML = "";

                var sblsbb = document.getElementById("sblsbb");
                submit = sblsbb;
            }
            else {
                //没有参数
                //传统页面  btnK
                var buttonArray2;
                if(window.location.href.indexOf("&source=iglk") == -1) {
                    buttonArray2 = util.xpath("//*[@name='btnK']");
                }
                else {//igoogle btnG
                    buttonArray2 = util.xpath("//*[@name='btnG']");
                }
                submit = buttonArray2.snapshotItem(0);
            }
            submit.parentNode.replaceChild(newSelectObj, submit);
        }

    }

}
//========================================================
function replaceAllSearch() {
    baidu.addBaiduSearch();
    google.addGoogleSearch();
}

replaceAllSearch();
