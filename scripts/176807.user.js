// ==UserScript==
// @name        百度网盘助手
// @author      有一份田
// @description 显示百度网盘文件的直接链接,突破大文件需要使用电脑管家的限制
// @namespace   http://userscripts.org/scripts/show/176807
// @updateURL   https://userscripts.org/scripts/source/176807.meta.js
// @downloadURL https://userscripts.org/scripts/source/176807.user.js
// @icon        http://img.duoluohua.com/appimg/script_dupanlink_icon_48.png
// @license     GPL version 3
// @encoding    utf-8
// @date        26/08/2013
// @modified    09/05/2014
// @include     http://pan.baidu.com/*
// @include     http://yun.baidu.com/*
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// @version     2.4.1
// ==/UserScript==



/*
 * === 说明 ===
 *@作者:有一份田
 *@官网:http://www.duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *
 *
 * */





var VERSION = '2.4.1';
var APPNAME = '\u767e\u5ea6\u7f51\u76d8\u52a9\u624b';
var t = new Date().getTime();

(function() {
    //window=unsafeWindow;
    //document=unsafeWindow.document;
    $ = unsafeWindow.$;
    disk = unsafeWindow.disk;
    FileUtils = unsafeWindow.FileUtils;
    Page = unsafeWindow.Page;
    Utilities = unsafeWindow.Utilities;
    var isShareManagerMode = Page.inViewMode(Page.VIEW_SHARE_PROPERTY_OWN),
    isOther = Page.inViewMode(Page.VIEW_PROPERTY_OTHER),downProxy = disk.util.DownloadProxy,
    shareData = disk.util.ViewShareUtils || null,iframe = '',httpHwnd = null,index = 0,
    msg = [
        '\u54b1\u80fd\u4e0d\u4e8c\u4e48,\u4e00\u4e2a\u6587\u4ef6\u90fd\u4e0d\u9009\u4f60\u8ba9\u6211\u548b\u4e2a\u529e...', //0
        '\u5c3c\u739b\u4e00\u4e2a\u6587\u4ef6\u90fd\u4e0d\u9009\u4f60\u4e0b\u4e2a\u6bdb\u7ebf\u554a...', //1
        '\u4f60TM\u77e5\u9053\u4f60\u9009\u4e86<b>100</b>\u591a\u4e2a\u6587\u4ef6\u5417?\u60f3\u7d2f\u6b7b\u6211\u554a...', //2
        '<b>\u8bf7\u6c42\u5df2\u53d1\u9001</b>\uff0c\u670d\u52a1\u5668\u6b63\u5728\u4e3a\u60a8\u51c6\u5907\u6570\u636e...', //3
        '<b>\u8be5\u9875\u9762</b>\u4e0d\u652f\u6301\u6587\u4ef6\u5939\u548c\u591a\u6587\u4ef6\u7684<font color="red"><b>\u94fe\u63a5\u590d\u5236\u548c\u67e5\u770b</b></font>\uff01', //4
        '<font color="red">\u8bf7\u6c42\u8d85\u65f6\u4e86...</font>', //5
        '<font color="red">\u8bf7\u6c42\u51fa\u9519\u4e86...</font>', //6
        '<font color="red">\u8fd4\u56de\u6570\u636e\u65e0\u6cd5\u76f4\u89c6...</font>', //7
        '\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801', //8
        '\u9a8c\u8bc1\u7801\u8f93\u5165\u9519\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165', //9
        '<b>\u94fe\u63a5\u5df2\u590d\u5236\u5230\u526a\u5207\u677f\uff01</b>', //10
        '\u672a\u77e5\u9519\u8bef\uff0cerrno:',//11
        ''
        ],
    helperMenuBtns=(function() {
        var panHelperBtnArr = $.merge($('.icon-download').parent('a'), $('.icon-btn-download').parent('li')),
        menuTitleArr=['\u76f4\u63a5\u4e0b\u8f7d','\u590d\u5236\u94fe\u63a5','\u67e5\u770b\u94fe\u63a5'],html='';
        html+='<div id="panHelperMenu" style="display:none;position:fixed;float:left;z-index:999999;"><ul class="pull-down-menu" style="display:block;margin:0px;padding:0px;left:0px;top:0px;list-style:none;">';
        for(var i=0;i<menuTitleArr.length;i++){
            html+='<li><a href="javascript:;" class="panHelperMenuList" type="'+i+'"><b>'+menuTitleArr[i]+'</b></a></li>';
        }
        html+='<li style="display:none;"><a href="' + getApiUrl('getnewversion', 1) + '" target="_blank"><img id="updateimg" title="\u6709\u4e00\u4efd\u7530" style="border:none;"/></a></li></ul></div>';
        $('<div>').html(html).appendTo(document.body);
        for (var i = 0; i < panHelperBtnArr.length; i++) {
            var item = panHelperBtnArr[i];
            createPanHelperBtn(item);
        }
        function createPanHelperBtn(btn) {
            var o=$('<div class="b-list-item haspulldown panHelperBtn" style="display:inline-block;">').html('<em style="height:10px;width:10px;background:url(&quot;/res/static/images/btn_icon.gif&quot;) no-repeat scroll -45px -120px transparent; display:inline-block;position:absolute;margin-left:82px;margin-top:12px;"></em><a class="icon-btn-download" style="width:63px;padding-left:34px;padding-right:0px;" href="javascript:;" title="' + APPNAME + '">\u7f51\u76d8\u52a9\u624b</a>')[0];
            btn.parentNode.insertBefore(o, btn.nextSibling);
            return o;
        }
        var helperBtn = $('.panHelperBtn'),helperMenu = $('#panHelperMenu'),helperMenuBtns=helperMenu.find('a.panHelperMenuList'),
        menuFun = function() {
            helperDownload($(this).attr('type') || 0);
            helperMenu.hide();
        };
        helperMenu.find('a').css('text-align', 'center');
        helperMenuBtns.click(menuFun);
        helperBtn.click(menuFun).mouseenter(function() {
            $(this).addClass('b-img-over');
            helperMenu.children('ul').css('width', $(this).children('a').outerWidth() - 3);
            helperMenu.css('top', $(this).offset().top + $(this).height() + parseInt($(this).css('paddingTop')) - $(document).scrollTop());
            helperMenu.css('left', $(this).offset().left + parseInt($(this).css('paddingLeft'))).show();
        }).mouseleave(function() {
            $(this).removeClass('b-img-over');
            helperMenu.hide();
        });
        $(document).scroll(function() {
            helperMenu.hide();
        });
        helperMenu.mouseenter(function() {
            $(this).show();
        }).mouseleave(function() {
            $(this).hide();
        });
        return helperMenuBtns;
    })();
    checkUpdate();
    function helperDownload(type) {
        if(!iframe) {
            downProxy._warmupHTML();
            iframe = $('#pcsdownloadiframe')[0]
        }
        var items = [];
        iframe.src = 'javascript:;';
        if(shareData) {
            items.push(JSON.parse(shareData.viewShareData));
        } else {
            items = FileUtils.getListViewCheckedItems();
        }
        var len = items.length;
        if(!len) {
            index = 1 == index ? 0 : 1;
            return myAlert(msg[index]);
        }else if (len > 100) {
            return myAlert(msg[2]);
        }
        if(1 == len) {
            var url = items[0].dlink;
            if(isUrl(url)) {
                if(2 == type) {
                    showHelperDialog(type, items, {"errno": 0,"dlink": url});
                }else if(1 == type){
                    copyText(url);
                } else {
                    myAlert(msg[3],1);
                    iframe.src = url;
                }
            }else{
                getDownloadInfo(type, items);
            }
        }else {
            getDownloadInfo(type, items);
        }
        downloadCounter(items);
    }
    function downloadCounter(C) { //C:items,B:isOneFile
        if (!isOther) {return;}
        var F = FileUtils.share_uk || disk.util.ViewShareUtils.uk,
        D = FileUtils.share_id,A = [],B = (1 == C.length && 0 == C[0].isdir),
        G = shareData ? disk.util.ViewShareUtils.albumId: '';
        for (var _ in C) {
            if (C.hasOwnProperty(_)) {
                var E = {
                    fid: C[_].fs_id,
                    category: C[_].category
                };
                A.push(E);
            }
        }
        G && B && $.post(disk.api.RestAPI.PCLOUD_ALBUM_DOWNLOAD_COUNTER, {
            uk: F,
            album_id: G,
            fs_id: C[_].fs_id
        });
        !G && $.post(disk.api.RestAPI.MIS_COUNTER, {
            uk: F,
            filelist: JSON.stringify(A),
            sid: D,
            ctime: FileUtils.share_ctime,
            "public": FileUtils.share_public_type
        });
        !G && B && $.get(disk.api.RestAPI.SHARE_COUNTER, {
            type: 1,
            shareid: D,
            uk: F,
            sign: FileUtils.share_sign,
            timestamp: FileUtils.share_timestamp,            
            t: new Date().getTime(),
            _: Math.random()
        });
    }
    function myAlert(msg, type) {
        try {
            var o=Utilities.useToast({
                toastMode: type ? disk.ui.Toast.MODE_SUCCESS : disk.ui.Toast.MODE_CAUTION,
                msg: msg,
                sticky: false,
                position: disk.ui.Panel.TOP
            });
            $(o._mUI.pane).css({"z-index":999999});
        } catch(err) {
            if (!type) alert(msg);
        }
    }
    function copyText(text){
        GM_setClipboard(text);
        myAlert(msg[10],1);
    }
    function getDownloadName(items) {
        if (items.length > 1 || 1 == items[0]['isdir']) {
            downProxy.prototype.setPackName(FileUtils.parseDirFromPath(items[0]['path']), !items[0]['isdir']);
            return downProxy.prototype._mPackName;
        }
        return items[0]['server_filename'];
    }
    function getDownloadInfo(type, items, vcode) {
        if(!vcode) {showHelperDialog(helperMenuBtns.length+1, items);}
        var url = '',data = '',fidlist = '',fids = [];
        for (var i = 0; i < items.length; i++) {
            fids.push(items[i]['fs_id']);
        }
        fidlist = '[' + fids.join(',') + ']';
        if(isOther){
            url = disk.api.RestAPI.SHARE_GET_DLINK + '&uk=' + FileUtils.share_uk + '&shareid=' + FileUtils.share_id + '&timestamp=' + FileUtils.share_timestamp + '&sign=' + FileUtils.share_sign + '&fid_list=' + fidlist;
            data = 'shareid=' + FileUtils.share_id + '&uk=' + FileUtils.share_uk + '&fid_list=' + fidlist + (vcode ? vcode: '');
        }else{
            url = disk.api.RestAPI.DOWN_GET_DLINK;
            data={
                sign: FileUtils.base64Encode(FileUtils.sign2(FileUtils.sign3, FileUtils.sign1)),
                timestamp: FileUtils.timestamp,
                fidlist: fidlist,
                type: (items.length >1 || items[0]['isdir']) ? "batch" : "dlink"
            };
        }
        httpHwnd = $.post(url, data,
                function(o) {
                    var dlink = typeof o.dlink =='object' ? o.dlink[0]['dlink'] : o.dlink;
                    if (0 === o.errno) {
                        dlink = dlink + '&zipname=' + encodeURIComponent(getDownloadName(items));
                        o.dlink = dlink;
                        if (shareData) {
                            var obj = JSON.parse(shareData.viewShareData);
                            obj.dlink = dlink;
                            shareData.viewShareData = JSON.stringify(obj);
                        }
                        if (1 == items.length) {
                            items[0]['dlink'] = dlink;
                        }
                    }
                    showHelperDialog(type, items, o, vcode);
                });
    }
    function showHelperDialog(type, items, opt, vcode) {
        var canvas = disk.Context.canvas || new disk.ui.Canvas(),
        _ = document.helperdialog || createHelperDialog(),isVisible = _.isVisible(),status=0;
        disk.Context.canvas = canvas;
        _.canvas = canvas;
        _.type = type;
        _.items = items;
        if (type < helperMenuBtns.length) {
            if (0 === opt.errno) {
                status=1;
                if(type < 2) {
                    _.canvas.setVisible(false);
                    _.setVisible(false);
                    if(0 == type){
                        iframe.src = opt.dlink;
                        myAlert(msg[3],1);
                    } else {
                        copyText(opt.dlink);
                    }
                    return;
                }
                _.sharefilename.innerHTML = getDownloadName(items);
                _.sharedlink.value = opt.dlink;
                _.dlink = opt.dlink;
                _.downloadbtn.href= opt.dlink;
                _.focusobj = _.sharedlink;
            } else if(-19 ==opt.errno) {
                status=2;
                _.vcodeimg.src = opt.img;
                _.vcodeimgsrc = opt.img;
                _.vcodevalue = opt.vcode;
                _.vcodetip.innerHTML = vcode ? msg[9] : '';
                _.vcodeinput.value = '';
                _.focusobj = _.vcodeinput;
            } else {
                _.canvas.setVisible(false);
                _.setVisible(false);
                return myAlert(disk.util.shareErrorMessage[opt.errno] || (msg[11] + opt.errno));
            }
        }
        _.loading.style.display = 0==status ? '' : 'none';
        _.showdlink.style.display = 1==status ? '' : 'none';
        _.showvcode.style.display = 2==status ? '' : 'none';
        _.copytext.style.display = 1==status ? '' : 'none';
        if (!isVisible) {
            _.canvas.setVisible(true);
            _.setVisible(true);
        }
        _.setGravity(disk.ui.Panel.CENTER);
        _.focusobj.focus();
    }
    function createHelperDialog() {
        var html = '<div class="dlg-hd b-rlv"title="\u6709\u4e00\u4efd\u7530"><span title="\u5173\u95ed"id="helperdialogclose"class="dlg-cnr dlg-cnr-r"></span><h3><a href="'+getApiUrl('getnewversion',1)+'"target="_blank"style="color:#000;">'+APPNAME+'&nbsp;' + VERSION + '</a><a href="javascript:;"title="\u70b9\u6b64\u590d\u5236"id="copytext"style="float:right;margin-right:240px;display:none;">\u70b9\u6b64\u590d\u5236</a></h3></div><div class="download-mgr-dialog-msg center"id="helperloading"><b>\u6570\u636e\u8d76\u6765\u4e2d...</b></div><div id="showvcode"style="text-align:center;display:none;"><div class="dlg-bd download-verify"style="text-align:center;margin-top:25px;"><div class="verify-body">\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801\uff1a<input type="text"maxlength="4"class="input-code vcode"><img width="100"height="30"src=""alt="\u9a8c\u8bc1\u7801\u83b7\u53d6\u4e2d"class="img-code"><a class="underline"href="javascript:;">\u6362\u4e00\u5f20</a></div><div class="verify-error"style="text-align:left;margin-left:84px;"></div></div><br><div><div class="alert-dialog-commands clearfix"><a href="javascript:;"class="sbtn okay postvcode"><b>\u786e\u5b9a</b></a><a href="javascript:;"class="dbtn cancel"><b>\u5173\u95ed</b></a></div></div></div><div id="showdlink"style="text-align:center;display:none;"><div class="dlg-bd download-verify"><div style="padding:5px 0px;"><b><span id="sharefilename"></span></b></div><input type="text"name="sharedlink"id="sharedlink"class="input-code"maxlength="1024"value=""style="width:500px;border:1px solid #7FADDC;padding:3px;height:24px;"></div><br><div><div class="alert-dialog-commands clearfix"><a href="javascript:;"class="sbtn okay postdownload"><b>\u76f4\u63a5\u4e0b\u8f7d</b></a><a href="javascript:;"class="dbtn cancel"><b>\u5173\u95ed</b></a></div></div></div>',
        o=$('<div class="b-panel download-mgr-dialog helperdialog" style="width:550px;">').html(html).appendTo(document.body);
        o[0].pane = o[0];
        var _ = new disk.ui.Panel(o[0]),vcodeimg = o.find('img')[0],vcodeinput = o.find('.vcode')[0],
        sharedlink = o.find('#sharedlink')[0],vcodetip = o.find('.verify-error')[0],
        copytext= o.find('#copytext')[0],postdownloadBtn=o.find('.postdownload')[0],
        dialogClose = function() {
            vcodeinput.value = '';
            vcodetip.innerHTML = '';
            vcodeimg.src = '';
            _.canvas.setVisible(false);
            _.setVisible(false);
            if (httpHwnd) {httpHwnd.abort();}
        },
        postvcode = function() {
            if (httpHwnd) {httpHwnd.abort();}
            var v = vcodeinput.value,len = v.length,max = msg.length - 1,i = max,
            vcode = '&input=' + v + '&vcode=' + _.vcodevalue;
            i = 0 == len ? 8 : (len < 4 ? 9 : i);
            vcodetip.innerHTML = msg[i];
            if (i != max) {return vcodeinput.focus();}
            getDownloadInfo(_.type, _.items, vcode);
        },
        postdownload = function(e) {
            if(!e){iframe.src = _.dlink;}
            dialogClose();
            myAlert(msg[3],1);
        };
        _._mUI.pane = o[0];
        _.loading = o.find('#helperloading')[0];
        _.showvcode = o.find('#showvcode')[0];
        _.showdlink = o.find('#showdlink')[0];
        _.copytext= copytext;
        _.downloadbtn=postdownloadBtn;
        _.vcodeinput = vcodeinput;
        _.sharedlink = sharedlink;
        _.sharefilename = o.find('#sharefilename')[0];
        _.vcodeimg = vcodeimg;
        _.vcodetip = vcodetip;
        _.vcodeimgsrc = '';
        _.vcodevalue = '';
        _.focusobj = sharedlink;
        $(copytext).click(function(){
            copyText(_.dlink);
            this.blur();
        });
        $(vcodeimg).siblings('a').click(function() {
            vcodeimg.src = _.vcodeimgsrc + '&' + new Date().getTime();
        });
        vcodeinput.onkeydown = function(e) {
            if (13 == e.keyCode) {postvcode();}
        };
        o.find('.postvcode').click(postvcode);
        $(postdownloadBtn).click(postdownload);
        $('#sharedlink').focusin(function() {
            this.style.boxShadow = '0 0 3px #7FADDC';
            this.select();
        }).focusout(function() {
            this.style.boxShadow = '';
        }).mouseover(function() {
            this.select();
            this.focus();
        }).keydown(function(e) {
            if (13 == e.keyCode) {postdownload();}
        });
        $(window).bind("resize",
                function() {
                    _.setGravity(disk.ui.Panel.CENTER);
        });
        o.find('#helperdialogclose').click(dialogClose);
        o.find('.dbtn').click(dialogClose);
        _.setVisible(false);
        document.helperdialog = _;
        return _;
    }
})();
function isUrl(url) {
    return /^(http|https):\/\/([\w-]+(:[\w-]+)?@)?[\w-]+(\.[\w-]+)+(:[\d]+)?([#\/\?][^\s<>;"\']*)?$/.test(url);
}
function checkUpdate() {
    var js = 'var upinfo=document.getElementById("updateimg");';
    js += 'upinfo.src="' + getApiUrl('checkupdate', 1) + '";';
    js += 'upinfo.onload=function(){';
    js += 'upinfo.parentNode.parentNode.style.display="";';
    js += '}';
    loadJs(js);
}
function getApiUrl(action, type) {
    return 'http://app.duoluohua.com/update?action=' + action + '&system=script&appname=dupanlink&apppot=scriptjs&frompot=dupan&type=' + type + '&version=' + VERSION + '&t=' + t;
}
function loadJs(js) {
    var oHead = document.getElementsByTagName('HEAD')[0],
    oScript = document.createElement('script');
    oScript.type = 'text/javascript';
    oScript.text = js;
    oHead.appendChild(oScript);
}
function googleAnalytics() {
    var js = "var _gaq = _gaq || [];";
    js += "_gaq.push(['_setAccount', 'UA-43859764-1']);";
    js += "_gaq.push(['_trackPageview']);";
    js += "function googleAnalytics(){";
    js += "	var ga = document.createElement('script');ga.type = 'text/javascript';";
    js += "	ga.async = true;ga.src = 'https://ssl.google-analytics.com/ga.js';";
    js += "	var s = document.getElementsByTagName('script')[0];";
    js += "	s.parentNode.insertBefore(ga, s)";
    js += "}";
    js += "googleAnalytics();";
    js += "_gaq.push(['_trackEvent','dupanlink_script',String('" + VERSION + "')]);";
    loadJs(js);
}
googleAnalytics();



