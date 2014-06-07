// ==UserScript==
// @name           CMS auto clean
// @namespace      CMS
// @description    auto clean files(js/css/html/images) when uploaded
// @include        http://cms5.sohu.com/*
// ==/UserScript==
(function(window,undefined){

    var $ = window['jQuery'];
    var _e = function(s){
        window['console'].info(s);
    };

    var user = GM_getValue('user') || '';
    var pwd = GM_getValue('pwd') || '';

    //$('body').append();
    _e('cms');
    var initConfig = function(){
        var configTab = $('#tabs-3>ul');
        if(configTab.length){
            configTab.append(['<li><a href="javascript:;" onclick="setTimeout(_gmConfigUser,0)"><span>配置账号</span></a></li>'].join(''));
            window['_gmConfigUser'] = function(){
                if($('#_gmWinBox').length){
                    $('#_gmWinBox').show();
                }
                else{
                    $('body').append([
                        '<style>#_gmWinBox{position:absolute;left:50%;top:50%;width:400px;'
                            ,'height:100px;padding: 15px 0 0 0;margin: -50px 0 0 -200px;background:#666;color:#fff;}'
                        ,'#_gmWinBox center{padding: 4px;}'
                        ,'#_gmWinBox input{width:180px;height: 20px;border:1px solid #000;}'
                        ,'#_gmWinBox button{cursor:pointer;width: 50px;height:20px;}'
                        ,'</style>'
                        ,'<div id="_gmWinBox">'
                        ,'<center>user:&nbsp;<input id="_gmUser" type="text" value="',user ,'" /></center>'
                        ,'<center>pwd:&nbsp;&nbsp;<input id="_gmPwd" type="password" value="',pwd,'" /></center>'
                        ,'<button onclick="setTimeout(_gmSaveUser,0)">Save</button>&nbsp;&nbsp;&nbsp;'
                        ,'<button onclick="_gmCloseConfig();">Close</button>'
                    ,'</div>'].join(''));
                    var inputs = $('#_gmWinBox input');
                    inputs.keydown(function(e){
                        var key = e.keyCode;
                        if(key == 13){
                            var next = $(this.parentNode).next('center');
                            if(next.length){
                                next.children('input').focus();
                            }
                            else{
                                setTimeout(window['_gmSaveUser'],0);
                            }
                        }
                    });
                }
            };
            window['_gmSaveUser'] = function(){
                var userTxt = $('#_gmUser');
                var pwdTxt = $('#_gmPwd');

                GM_setValue('user',$.trim(userTxt.val()));
                GM_setValue('pwd',pwdTxt.val());

                user = GM_getValue('user') || '';
                pwd = GM_getValue('pwd') || '';

                $('#_gmWinBox').hide();
            };
            window['_gmCloseConfig'] = function(){
                $('#_gmWinBox').hide();
            };
        }
    };
    initConfig();
    var pageUrl = window.location.href;
    if(pageUrl.indexOf('upload.action?method=reupload') > -1){
        _e('in uploaded page');
        window['_gmCleanUrl'] = function(link){
            var url = '';
            var tmpId = '';
            if(typeof link != 'object'){
                link = $('#'+link)[0];
            }
            if(!link){
                return;
            }
            url = $(link).text();
            if(!url){
                return;
            }

            /*
             *_e([user,pwd]);
             *_e(link);
             */

            if(!link.id){
                //比起处理闭包的稳定性,我宁可使用这个...
                tmpId = new Date().getTime() + parseInt(Math.random()*100);
                link.id = tmpId;
                $(link).parent().append(['<span id="tips',tmpId,'" style="padding-left:20px;"></span>'].join(''));
            }
            else{
                link.style.color='red';
                $('#tips'+link.id).html('loading.....');
            }

            setTimeout(function(){
                GM_xmlhttpRequest({
                    method: "POST",
                    url: "http://192.168.105.144:8089",
                    data : ['url=',url,'&tmpId=',link.id,'&user=',user,'&pwd=',pwd].join(''),
                    onload: function(res) {
                        var data = res.responseText;
                        data = new Function('return '+data);
                        data = data();
                        _e(data);
                        var tips = $('#tips'+link.id);
                        if(data.urls){
                            link.style.color='green';
                            //tips.html(['<span style="color:green;">done</span>'
                            ////,'<button onclick="setTimeout(function(){_gmCleanUrl(',link.id,')},5)">Redo</button>'
                            //].join(''));
                        }
                        else if(data.SERVER == 401){
                            tips.html('用户名密码错误');
                        }
                        else{
                            //tips.html(['<button onclick="setTimeout(function(){_gmCleanUrl(',link.id,')},5)">failed! retry</button>'].join(''));
                        }
                    },
                    onerror: function(res) {
                        _e(res);
                        //tips.html(['<button onclick="setTimeout(function(){_gmCleanUrl(',link.id,')},5)">failed! retry</button>'].join(''));
                    }
                });
            },0);
        };

        window['_gmGetUploadedFiles'] = function(){
            var links = $('div.content div.cont>p>a');
            $('div.content>div.title').html('<div class="tt">打包上传</div><button onclick="setTimeout(_gmGetUploadedFiles,0);">Redo All</button>');
            //var files = [];
            for(var i=0;i<links.length;++i){
                window['_gmCleanUrl'](links[i]);
            }
        };
        window['_gmGetUploadedFiles']();
    }
})(unsafeWindow);