// ==UserScript==
// @id             baidupan@ywzhaiqi@gmail.com
// @name           BaiduPanDownloadHelper Mk2
// @version        1.7.1
// @namespace
// @author         ywzhaiqi@gmail.com
// @description    批量导出百度盘的下载链接（百度盘的打包不能断点续传且速度慢）
// @grant          GM_setClipboard
// @grant          GM_openInTab
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @homepageURL    http://userscripts.org/scripts/show/171837
// @updateURL      http://userscripts.org/scripts/source/171837.meta.js
// @downloadURL    https://userscripts.org/scripts/source/171837.user.js
// @include        http://pan.baidu.com/share/link*
// @include        https://pan.baidu.com/share/link*
// @run-at         document-end
// ==/UserScript==

// 参考 BaiduPanMD5Button http://userscripts.org/scripts/show/156906
// 目前只能获取当前文件夹下的所有文件

(function(){
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject)
    Sys.ie = ua.match(/msie ([\d.]+)/)[1]
else if (document.getBoxObjectFor)
    Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]
else if (window.MessageEvent && !document.getBoxObjectFor)
    Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]
else if (window.opera)
    Sys.opera = ua.match(/opera.([\d.]+)/)[1]
else if (window.openDatabase)
    Sys.safari = ua.match(/version\/([\d.]+)/)[1];

var debug = true;

var $ = unsafeWindow.jQuery,
    xbug = debug ? console.debug : function(){};

if(typeof $ == "undefined"){
    return;
}

GM_addStyle('\
    #mDownload-container{\
        position: fixed;\
        z-index: 3;\
        top: 40%;\
        left: 40%;\
        background: white;\
        padding: 20px;\
    }\
    #mDownload-links{\
        margin-top: 10px;\
        color: red;\
    }\
    #mDownload-close-button{\
        margin-right: 10px;\
    }\
');

var UIL = {
    topdir: unsafeWindow.server_filename,

    // listURL 的前面部分
    listPrURL: "http://pan.baidu.com/share/list?channel=chunlei&clienttype=0&web=1&page=1&shareid=" +
            url_query('shareid') + "&uk=" + url_query("uk"),  // shareid=146642&uk=2214641459
    $file_action_buttons: $('#file_action_buttons'),  // 要添加按钮的位置
    allData: [],  // 所有的数据
    urlCache: null,
    curPath: "",  // 当前路径的缓存
    getDirCache: [],  // 获取dir的缓存
    isContainDir: false,  // 是否包括文件夹下
    doActionFunc: function(){},  // 要做的动作

    init: function(){

        if(this.$file_action_buttons.length === 0) { return; }

        // UIL.displayProcessbar();

        // 添加导出按钮
        this.addButton("导出链接", "仅包含本层的文件", function(){
            UIL.isContainDir = false;
            UIL.doActionFunc = UIL.showPanel;
            UIL.export_or_copy();
        });

        this.addButton("导出全部链接", "包含本层的文件和文件夹下的所有文件）", function(){
            UIL.isContainDir = true;
            UIL.doActionFunc = UIL.showPanel;
            UIL.export_or_copy();
        });

        if(typeof GM_setClipboard != "undefined"){
            this.addButton("复制链接", "仅包含本层的文件", function(){
                UIL.isContainDir = false;
                UIL.doActionFunc = UIL.copyDlinks;
                UIL.export_or_copy();
            });

            this.addButton("复制全部链接", "包含本层的文件和文件夹下的所有文件）", function(){
                UIL.isContainDir = true;
                UIL.doActionFunc = UIL.copyDlinks;
                UIL.export_or_copy();
            });
        }
    },

    processNoPathPage: function(){
        var a = document.body.innerHTML.match(/\[\{\\\"fs_id\\\".+\}\]/);

        var b = a[0].split("\\\\");
        var c = b[0].replace(/\\/g,"");
        for(i = 1; i < b.length; i++)
        {
            c += ("\\" + b[i].replace(/\\/g,""));
        }
        c = "{\"list\":" + c + "}";

        var JSONobj = JSON.parse(c);

        this.allData = JSONobj['list'];
    },

    addButton: function(name, title, clickFunc){
        $('<a class="bbtn" style="padding-left:10px" title="' + title + '"><b>' + name + '</b></a>')
            .appendTo(UIL.$file_action_buttons)
            // [0].onclick = clickFunc;
            [0].addEventListener("click", clickFunc, false)
    },

    export_or_copy: function(){

        // UIL.processbar.style.display = "block";
        // setTimeout(function(){
        //      UIL.processbar.style.display = "none";
        // }, 1000);

        // 当前路径随时在变
        var path = UIL.getCurPath();
        if(path){  // has path page
            if(path == UIL.curPath){
               UIL.doActionFunc();
           }else{
                UIL.allData = [];
                UIL.getList(path);
           }
        }else{  // no path page分2种：一种没文件夹，另一种有文件夹的最顶层。
            this.processNoPathPage();
            if(UIL.isContainDir){
                for (var i = UIL.allData.length - 1; i >= 0; i--) {
                    if(UIL.allData[i].isdir == '1'){
                        UIL.getDirCache.push(UIL.allData[i].path);
                    }
                };
                UIL.getDirList();
            }else{
                UIL.doActionFunc();
            }
        }
    },

    // 得到当前path，随时在变
    getCurPath: function(){
        var url_match = document.URL.match(/#dir\/path=(.*)/);
        if(url_match){
            return url_match[1];
        }
    },

    getList: function(path){
        var url = UIL.listPrURL + "&dir=" + UIL.encodePath(path);
        console.log("GM_xmlhttpRequest: " + url);

        setTimeout(function(){  // 延时操作
            GM_xmlhttpRequest({
                method: 'GET',
                // synchronous: false,
                url: url,
                onload: function(response){
                    var JSONObj = JSON.parse(response.responseText);
                    if(JSONObj.errno == 0){
                        UIL.processJSON(JSONObj);
                    }else{
                        console.log("获取json数据错误: " + path);
                    }
                }
            });
        }, 500);

    },

    encodePath: function(path){
        if(/[\/\s]/.test(path)){
            return encodeURIComponent(path);
        }else{
            return path;
        }
    },

    // 处理接收到的数据
    processJSON: function(JSONObj){
        // 展开数据
        $.each(JSONObj.list, function(i, item){
            if(item.isdir == 1){  // 文件夹
                if(UIL.isContainDir){
                    UIL.getDirCache.push(item.path);
                }
            }else{
                // dlink md5 path server_filename server_mtime
                UIL.allData.push(item);
            }
        });

        UIL.getDirList();
    },

    getDirList: function(){
        // 判断是继续获取还是显示结果
        var nextPath = UIL.getDirCache.pop();
        if(nextPath){
            UIL.getList(nextPath);
        }else{  // 全部获取完成
            UIL.doActionFunc();
            UIL.curPath = UIL.getCurPath();
        }
    },

    showPanel: function(){
        if(UIL.panel){
            UIL.panel.style.display = "block";
        }else{
            var dataHtml = UIL.getLinkPage();

            var container = document.createElement("div");
            container.id = "mDownload-container";

            var links_div = document.createElement("div");
            links_div.id = "mDownload-links";
            links_div.innerHTML = dataHtml;

            var closeButton = document.createElement("button");
            closeButton.id = "mDownload-close-button";
            closeButton.innerHTML = "关闭";
            closeButton.onclick = function(){
                container.style.display = "none";
            };

            var linkPageButton = document.createElement("button");
            linkPageButton.id = "mDownload-export-button";
            linkPageButton.innerHTML = "导出";
            linkPageButton.onclick = function(){
                GM_openInTab('data:text/html;charset=utf-8,' + encodeURIComponent(dataHtml));
                container.style.display = "none";
            };

            container.appendChild(closeButton);
            container.appendChild(linkPageButton);
            container.appendChild(links_div);
            document.body.appendChild(container);

            UIL.panel = container;
        }

    },

    getLinkPage: function(){
        var $content = $('<div id="main"></div>');

        $.each(UIL.allData, function (i, item) {
            if(!this.dlink) return;

            $('<a class="dlinks"></a>')
                .attr('href', this.dlink)
                .html(this.server_filename)
                .appendTo($content);

            $content.append('</br>');
        });
        return $content.html();
    },

    // 复制全部下载链接到剪贴板
    copyDlinks: function(){
        var dlinks = [];
        $.each(UIL.allData, function(){
            if(!this.dlink) return;
            dlinks.push(this.dlink);
        });

        var lineseperator;
        if (Sys.firfox) 
            lineseperator = '\n';
        else if (Sys.chrome) 
            lineseperator = '\r';
        var data = dlinks.join(lineseperator);

        if(typeof GM_setClipboard != "undefined"){
            GM_setClipboard(data, 'text');
            alert('已经复制 ' + dlinks.length +'条下载链接到剪贴板。');
        }else{

        }
    },

    displayProcessbar: function(){
        var o = this.processbar = document.createElement('div');
        o.setAttribute("id", "mProcessbar");
        o.setAttribute('style', ' z-index:3;position:fixed;top:40%;left:25%;right:25%;height:50px;border:1px solid;background:orange;padding:20px;text-align:center;display:none');
        document.body.appendChild(o);
        o.innerHTML = "正在获取中，请等待.....";
    }
};

if(debug) unsafeWindow.UIL = UIL;

UIL.init();

function url_query( query ) {
    query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var expr = "[\\?&]"+query+"=([^&#]*)";
    var regex = new RegExp( expr );
    var results = regex.exec( window.location.href );
    if ( results !== null ) {
        return results[1];
    } else {
        return false;
    }
}

})();