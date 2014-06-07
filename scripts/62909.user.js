// ==UserScript==
// @name Fix HootSuite
// @namespace http://civic.xrea.jp/
// @description Auto select user account. Enable to Post by 'SHIFT+ENTER'. Auto append textbox(for hashtags).
// @include http://hootsuite.com/*
// @include https://hootsuite.com/*
// @match http://hootsuite.com/*
// @match https://hootsuite.com/*
//
// ==/UserScript==
(function(){
 
 var fixfunc=function(){
        var APP_NAME = "Fix HootSuite(2.4.07)"
        /* ======================================== */
        /* User Settings.                           */
        /* ======================================== */
        /*
         * Message fontsize.
         * Set message font size. default is 12px.
         * メッセージフォントサイズ。既定値は12px
         */
        window.__fs_message = "12px";
        /*
         * Hide Headertools.
         * If you want to header tools(column operation), set to true.
         * Header toolsの非表示。
         */
        window.__hide_headertool = true;

        /**
         * Auto hide message box.
         * Auto hide message box, after you posted.
         * 送信後にメッセージボックスを最小化する
         */
        window.__auto_hide_msgbox = false;

        /**
         * Quick Hashtags
         * Set hashtag string (space sepalate). Quick Hashtags function.
         * クイックハッシュタグで使用する登録ハッシュタグ。スペース区切り
         */
        window.__quickhashtags = "#fixhootsuite";

        /**
         * Minimum column size
         * Minimum column width (It increase viewable columns)
         * 最小カラム幅の指定。この値を小さくすると表示可能なカラム数が増やせます。
         */
        window.__min_column_size = 150;
        /**
         * Inline insert Photo service(twitpic, HatenaPhotoLife, movapic, ow.ly)
         * 画像のインライン展開(twitpic, hatenaフォトライフ, 携帯百景, ow.ly(Hootsuite))
         */
        window.__inline_image = true;
        window.__inline_image_size = 100;

        
        /**
         * Hide new counter
         * 新着通知バッジを非表示にする
         */
        window.__hide_newcounter = true;

        /**
         * insert dot(.) when multi reply.
         * 複数replyの時にドット(.)を挿入する
         */
        window.__insert_dot_multireply = false;

        /**
         * fix username lowercase. 
         * ユーザー名を大文字小文字を区別する
         */
        window.__fix_username_case = true;


        /* ======================================== */
        var expand_config = {
            "twitpic":{
                reg: /twitpic\.com\/([A-z0-9]+)/gi,
                handler: function(r1){
                    if (r1=="photos")return null;
                    return ['http://twitpic.com/'+r1, 'http://twitpic.com/show/thumb/'+r1];
                }
            },
            "hatena":{ 
                reg: /(f\.hatena\.ne\.jp\/(([^\/])[^\/]+)\/(([0-9]{8})[0-9]+))/gi, 
                handler: function(r1, r2, r3, r4, r5){ 
                    return ['http://'+r1, 'http://img.f.hatena.ne.jp/images/fotolife/'+r3+'/'+r2+'/'+r5+'/'+r4+'_120.jpg'];
                } 
            },
            "movapic":{ 
                reg: /movapic\.com\/pic\/([\d\w]+)/gi, 
                handler: function(r1){
                    return ['http://movapic.com/pic/'+r1, 'http://image.movapic.com/pic/s_'+r1+'.jpeg']
                }
            },  
            "yfrog":{
                reg: /yfrog.com\/([\d\w]+)/gi,
                handler: function(r1){
                    return ['http://yfrog.com/'+r1, 'http://yfrog.com/'+r1+'.th.jpg'];
                }
            },
            "owly":{ 
                reg: /ow.ly\/i\/([\d\w]+)/gi, 
                handler: function(r1){
                    return ['http://ow.ly/i/'+r1, 'http://static.ow.ly/photos/thumb/'+r1+'.jpg']
                }
            },
            "youtube":{
                reg: /(youtu\.be\/|www\.youtube\.com\/watch\?v\=)([\d\-\w]+)/gi,
                handler: function(r1, r2){
                    return ['http://youtu.be/'+r2, 'http://i.ytimg.com/vi/'+r2+"/hqdefault.jpg"];
                }
            },
            "nico2":{
                reg: /www\.nicovideo\.jp\/watch\/([a-z]*?)([\d]+)\??/gi,
                handler: function(r1, r2){
                    return ['http://www.nicovideo.jp/watch/'+r1+r2, 'http://tn-skr.smilevideo.jp/smile?i='+r2];
                }
            },
            "img.ly":{
                reg: /img.ly\/([\d\w]+)/gi,
                handler: function(r1){
                    return ['http://img.ly/'+r1, 'http://img.ly/show/thumb/'+r1];
                }
            },
            "plixi":{
                reg: /plixi.com\/p\/([\d]+)/gi,
                handler: function(r1){
                    return ['http://plixi.com/p/'+r1, 'http://api.plixi.com/api/tpapi.svc/json/imagefromurl?size=thumbnail&url=http://plixi.com/p/'+r1];
                }
            },
            "lockerz":{
                reg: /lockerz\.com\/s\/([\d]+)/gi,
                handler: function(r1){
                    return ['http://lockerz.com/s/'+r1, 'http://api.plixi.com/api/tpapi.svc/json/imagefromurl?size=thumbnail&url=http://plixi.com/p/'+r1];
                }
            },
            "instagr.am": {
                reg: /instagr\.am\/p\/([\-_\d\w]+)/gi,
                handler: function(r1){
                    return ['http://instagr.am/p/'+r1, 'http://instagr.am/p/'+r1+'/media/?size=t'];
                }

            }
            ,"seiga.nicovideo":{
                reg: /seiga\.nicovideo\.jp\/seiga\/im([\d\w]+)/gi,
                handler: function(r1){
                    return ['http://seiga.nicovideo.jp/seiga/im'+r1, 'http://lohas.nicoseiga.jp/thumb/'+r1 +'q'];
                }
            }
            ,"twitvideo":{
                reg: /twitvideo\.jp\/([\d\w_]+)/gi,
                handler: function(r1){
                    return ['http://twitvideo.jp/'+r1, 'http://twitvideo.jp/img/thumb/'+r1];
                }
            }
            ,"miil.me":{
                reg: /miil\.me\/p\/([a-zA-Z0-9]+)/gi,
                handler: function(r1){
                    return ['http://miil.me/p/'+r1, 'http://miil.me/p/'+r1 + ".jpeg?size=142"];
                }
            }
            ,"twipple":{
                reg: /p\.twipple\.jp\/([\d\w_]+)/gi,
                handler: function(r1){
                    return ['http://p.twipple.jp/'+r1, 'http://p.twipple.jp/show/thumb/'+r1];
                }

            }
        };
        setInterval(function(){
            if ($(".messageComposeBox").hasClass("collapsed")){
                $("#qhmenu").hide();
            }
            addExTools();
        }, 5000);

        //追加機能配置
        var addExTools=function(){
            //クイックハッシュタグの設定関数
            (function(){
                var hashtags_str = window.__quickhashtags;
                var cont = $("#qhcont");
                if (cont.length == 0){
                    cont = $(document.createElement("a")).text("[Hash]").attr("id", "qhcont").addClass("linkbtn").appendTo(".selectProfiles");
                    cont.click(function(evt){
                        var btn=$(this);
                        var menu=$("#qhmenu")
                        if (menu.length == 0){
                            menu = $(document.createElement("div"))
                            .attr("id", "qhmenu")
                            .appendTo("body");
                        }
                        menu.css({"top":btn.offset().top, "left": btn.offset().left + btn.width() + 3})
                        if (menu.css("display") == "none"){
                            var arr=window.__quickhashtags.split(" ");
                            menu.empty();
                            menu.append($(document.createElement("a")).addClass("closebtn").click(function(){
                                menu.slideUp("fast");
                            }));
                            for (var i=0;i < arr.length; i++){
                                var hashtag=arr[i];
                                var btn=$(document.createElement("span"))
                                    .addClass("qhitem")
                                    .text(hashtag)
                                    .click(function(){    
                                        var h=$(this).text();
                                        var msgbox=$(".messageBoxMessage");
                                        var s=msgbox.val();
                                        if (s.indexOf(h) == -1){
                                            msgbox.val(s + " " + h);
                                        }
                                        msgbox.focus();
                                    });
                                menu.append(" ");
                                menu.append(btn);
                            }
                            menu.slideDown("fast");
                        } else {
                            menu.slideUp("fast");
                        }
                    });
                }
            })();
            if (location.href.indexOf('/network/hootlet?') != -1){
                return;
            }

            var htagbox=document.createElement("a");
            if ($("#autoappend").length == 0){
                htagbox.id="autoappend";
                htagbox.innerHTML='[Auto]';
                $(htagbox).addClass("linkbtn");
                $(".selectProfiles").append(htagbox);
            }

            if ($("#showTools").length == 0){
                var toolsLink=document.createElement("a");
                var title=window.__hide_headertool?"[Header]":"[Header]";
                toolsLink.id="showTools";
                toolsLink.innerHTML=title;
                $(toolsLink).addClass("linkbtn");
                $(".selectProfiles").append(toolsLink);
            }

        }
        $("#showTools").live("click", function(){
            window.__hide_headertool = !window.__hide_headertool;
            var display=window.__hide_headertool?"none":"block";
            var title=window.__hide_headertool?"[Header]":"[Header]";
            $("#streamTabInfo").css("display", display);
            $("#showTools").text(title);
            window.updateStreamsHeight();
        });

        //autoappend実装関数
        window.__autoAddFunc=function(){
            var msgbox=$(".messageBoxMessage");
            var s=msgbox.val();
            var l;
            if (window.__autoAppendStr.length > 0){
                if (s.indexOf(window.__autoAppendStr) == -1){
                    msgbox.val(s + " " + window.__autoAppendStr);
                }
                l = msgbox.val().length - window.__autoAppendStr.length - 1;
            } else {
                l = msgbox.val().length;
            }
            msgbox.focus();
            msgbox.get(0).setSelectionRange(l, l);
        }
        addExTools();
        //tweetboxでのハンドラ
        $(".messageBoxMessage").live("keydown", function(e){
            var msgbox=$(".messageBoxMessage");
            if (e.ctrlKey && e.shiftKey && 49 <= e.keyCode && e.keyCode <= 57){
                var idx=e.keyCode-49;
                var arr=__quickhashtags.split(" ");
                var h=arr[idx];
                var s=msgbox.val();
                if (s.indexOf(h) == -1){
                    msgbox.val(s + " " + h);
                }
                e.preventDefault();
            }
        });
        //高さの調整、標準のupdateStreamsHeight関数を置き換え
        var __f1=window.updateStreamsHeight;
        window.updateStreamsHeight=function(){
            __f1();    //標準の処理
            //headerToolsを消した分の高さを追加
            var top=0;
            if ($("#streamTabInfo").css('display') == 'none'){
                top -= 28;
            }
            if ($("#dashboardTabs").css("display") == "none"){
                top -= 25;
            }
            var sc = $("#streamsContainer")
            if (top != 0){
                sc.css("top", 53+top);
            } else {
                sc.css("top", "");
            }
        };
        //ステータス更新時の関数置き換え
        var f2=hs.statusObj.update;
        hs.statusObj.update=function(message, type, isAutoHide, hideTimeout) {
            //標準の処理
            f2.call(hs.statusObj, message, type, isAutoHide, hideTimeout);
            if (message==translation._('Message posted')){
                if (window.__autoAppendStr.length > 0){
                    $(".messageBoxMessage").val($(".messageBoxMessage").val() + " " + window.__autoAppendStr);
                }
                addExTools();
            }
        }
        //リプライ時などの新規Tweet作成時の関数置き換え
        var __newActionTweet=newActionTweet;
        newActionTweet = function(a,b,c,d,e,f,g,h,i,j){
            __newActionTweet(a,b,c,d,e,f,g,h,i,j);
            window.__autoAddFunc();
        }
        //quickサーチを置き換えてreloadボタンの追加
        var __f4=quickSearch;
        quickSearch=function(a){
            __f4(a);
            var reload=document.createElement("button");
            reload.id="reload";
            reload.innerHTML="Reload";
            $("#ui-dialog-title-quickSearchPopup").append(reload);
            $(reload).css("margin-left", "10px");
            $(reload).click(function(){
                quickSearch(a);
            });
        }
        //autoappend設定
        window.__autoAppendStr="";
        $("#autoappend").live("click", function(e){
            var appendstr = prompt("Set auto append string.(Set empty, if you want clear)", window.__autoAppendStr);
            if (appendstr!=null){
                window.__autoAppendStr=appendstr;
                __autoAddFunc();
            }
        });
        //Conversationのコメントから、ダブルクリックでReplyできるようにする
        $(".comment").live("dblclick", function(){
            //クリックした次の要素のinput属性から、IDを取得
            var tid=$(this).next().find("input").val();
            if(!tid){
                //最下層の要素は、Conversationの親メッセージのreplyと同様
                tid=$(this).parents(".message").find("input[name='originalTweetId']").val();
            }
            //screenName
            var uid=$(this).find("a:first").attr("title");
            //Replyのための@～追加
            newActionTweet(null, '@'+uid+" ", tid, uid);
        ;});
        //ホットキー
        $(document).bind('keydown', function(e){
            if(e.keyCode==113){    //f2
                newActionTweet();
            }else if(e.keyCode==115){//f4
                //tab reload;
                refreshTab();
            }else if (e.keyCode==118){    //F7
                var target=$("span.messageOptions");
                if (target.hasClass("shiftOptionMenu")){
                    target.removeClass("shiftOptionMenu");
                } else {
                    target.addClass("shiftOptionMenu");
                }
            }else if(e.keyCode==27){
                (function () {
                    var d = $("#messageBoxContainer ._messageBox");
                    var h = d.find("._imageCheckboxes");
                    d.removeClass("expanded").addClass("collapsed");
                    d.find(".selectProfiles").height(d.find("._messageArea").outerHeight(true) + "px");
                    h.height("auto");
                    d.prev("._scheduledBanner").removeClass("active inactive").addClass("inactive");
                    hs.bubblePopup.close();
                    messageBox.urlParameters.hide();
                    d.find("._messageContainer").scrollTop(0);
                    //messageBox.scrapeLink.clear()
                })();
            }
        });

        //Shift+Replyで複数@を実装
        var __replyHandler = function (e) {
            var doOriginal = true;
            var d = this;
            var m = hs.currentMessageDivId;

            var B = $(d);
            var url = $("#"+m).find("a.postTime").attr("href");
            var swapRetweet = false;
            var msgbox=$(".messageBoxMessage");
            var prevtext=""
            var firstInReplyToId=""
            var firstInReplyToUsername=""

            //オリジナル処理前
            if (B.hasClass("_reply")){
                //ユーザー名Fix
                if (__fix_username_case){
                    var anch=$("#"+hs.currentMessageDivId).find("._username").eq(0);
                    var title = anch.text();
                    if (title==""){
                        title = $("#"+hs.currentMessageDivId).find(".networkName").eq(0).text();
                    }
                    anch.attr("title", title);
                }
                if (e.shiftKey){//shiftkey押しながら
                    //reply
                    prevtext = msgbox.val().replace(/^ *\./, "");
                    prevtext = prevtext.replace(/ #[^ ]+/g, "");
                    if (prevtext!=""){
                        if (__insert_dot_multireply){
                            firstInReplyToId = "";
                        } else {
                            //in_reply_toを保存
                            firstInReplyToId = $("#messageBoxForm input[name='message[inReplyToId]']").val();
                        }
                    }
                    firstInReplyToUsername = $("#messageBoxForm input[name='message[inReplyToUsername]']").val();

                }

            } else if (B.hasClass("_retweet")){
                if (e.shiftKey){//shiftkey押しながら
                    //retweetの切り替え
                    swapRetweet = true;
                    hs.prefs.isNewRetweet = !hs.prefs.isNewRetweet;
                }
            }
            //オリジナル処理
            if (doOriginal){
                stream.box.messageOptionsButtonHandler(this, hs.currentMessageDivId);
            }

            //オリジナル処理後
            if (B.hasClass("_reply")){
                if (e.shiftKey){//shiftkey押しながら
                    if (prevtext!=""){
                        msgbox.val((__insert_dot_multireply ? "." : "") + prevtext + msgbox.val());
                        var l;
                        if (window.__autoAppendStr!=""){
                            l = msgbox.val().length - window.__autoAppendStr.length - 1;
                        } else {
                            l = msgbox.val().length;
                        }
                        setTimeout(function(){
                            msgbox.get(0).setSelectionRange(l, l);
                        }, 10);
                        if (__insert_dot_multireply){
                            $("#messageBoxForm input[name='message[inReplyToId]']").val("");
                            $("#messageBoxForm input[name='message[inReplyToUsername]']").val("");
                        } else {
                            if (firstInReplyToId!=""){
                                $("#messageBoxForm input[name='message[inReplyToId]']").val(firstInReplyToId);
                                $("#messageBoxForm input[name='message[inReplyToUsername]']").val(firstInReplyToUsername);
                            }
                        }
                    }
                }
            } else if (B.hasClass("_retweet")){
                if (hs.prefs.isNewRetweet){
                    setTimeout(function(){
                        var offset =$("#bubblePopPane").offset();
                        if (!offset &&offset.left < 0){
                            $("#bubblePopPane").css("left", 0);
                        }
                    }, 100);
                } else {
                    //非公式RTの時はカーソルを前に
                    msgbox.val(" " + msgbox.val().replace(/\(t\.co expand by fixhootsuite.*?\)/g, ""));
                    setTimeout(function(){
                        msgbox.get(0).setSelectionRange(0, 0);
                    }, 10);
                }
            }
            if (swapRetweet){
                //元に戻す
                hs.prefs.isNewRetweet = !hs.prefs.isNewRetweet;
            }
            return false;
        } //__replyHandler;

        //元々のコンテキストメニューイベントハンドラを削除
        setTimeout(function(){
            var __showRetweetPopup = stream.twitter.showRetweetPopup;
            stream.twitter.showRetweetPopup = function(p1, p2, p3, p4, p5){
                __showRetweetPopup(p1, p2, p3, p4, function(){
                    p5();
                    var msgbox=$(".messageBoxMessage");
                    msgbox.val(" " + msgbox.val().replace(/\(t\.co expand by fixhootsuite.*?\)/g, ""));
                    setTimeout(function(){
                        msgbox.get(0).setSelectionRange(0, 0);
                    }, 10);
                });
            }

            $("body").undelegate("._box ._options a", "click");
            $("#quickSearchPopup ._options a").die("click");
            $("body").delegate("._box ._options a", "click", __replyHandler);
            $("#quickSearchPopup ._options a").live("click", __replyHandler);

        }, 2000);

        //画像展開
        var domInsertedHandler = function(evt){
            $("a._previewLink", $(evt.target)).each(function(){
                var atag = $(this);
                var href= atag.attr("href");
                for(defname in expand_config){
                    var def = expand_config[defname];
                    if (href.match(def.reg)){
                        var ret = def.handler(RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5);
                        if (!ret) continue;
                        atag.parent().append(
                            $(document.createElement("div")).addClass("fhs_image_container").append(
                                $(document.createElement("a")).attr({"href":ret[0],"target":"_blank"}).append(
                                    $(document.createElement("img")).attr("src", ret[1]).addClass('fhs_img_'+defname)
                                )
                            )
                        );
                    }
                }
            });
        }
        if (__inline_image){
            document.addEventListener('DOMNodeInserted', domInsertedHandler, false);
        }

        var style=document.createElement("style");
        style.type="text/css";
        document.getElementsByTagName("head")[0].appendChild(style);
        var css = style.sheet;
        css.insertRule("a.linkbtn {cursor: pointer; font-size: 8pt;}", css.cssRules.length);
        css.insertRule("#qhmenu {position: absolute; display: none;border: 1px solid #606060; padding: 5px;z-index: 10000; width: 300px; background-color: #f0f0f0;font-size: 8pt;color: green;}", css.cssRules.length);
        css.insertRule("#qhmenu span{cursor: pointer;margin:3px;}", css.cssRules.length);
        css.insertRule("#qhmenu .closebtn{cursor: pointer; float:right; margin: 1px; height: 13px; width: 13px; background-image: url(http://hootsuite.s3.amazonaws.com/7-204/images/maps/close-sm-w.gif); background-position: 13px}", css.cssRules.length);
        css.insertRule("div.fhs_image_container{text-align:center}", css.cssRules.length);
        css.insertRule("span.shiftOptionMenu{margin-top: 20px}", css.cssRules.length);
        css.insertRule("div.autoselectConfirm{margin: 15px; color: white; }", css.cssRules.length);
        css.insertRule("div.selectProfiles{width: 450px;}", css.cssRules.length);

        if (__fs_message){
            css.insertRule(".message .messageContent {font-size: "+__fs_message+";} ", css.cssRules.length);
        }
        if (__hide_headertool){
            css.insertRule("#streamTabInfo{display: none}", css.cssRules.length);
        }
        if (__hide_newcounter){
            css.insertRule(".stream .header .streamName .new{display: none !important}", css.cssRules.length);
        }
        var size=__inline_image_size;
        css.insertRule("div.fhs_image_container img{height: "+size+ "px;}", css.cssRules.length);

        hs.c.minColumnSize=__min_column_size;
     };
    //cssの読みこみ要素追加
    var rules = [
        "#showTools, #hideFooter, #sBtn, #reload, #autoappend{cursor:pointer; font-size: x-small; margin: 2px;}",
    ];
    var style=document.createElement("style");
    style.type="text/css";
    document.getElementsByTagName("head")[0].appendChild(style);
    var css = style.sheet;
    for (var i=0;i<rules.length;i++){
        css.insertRule(rules[i], css.cssRules.length);
    }

    var script=document.createElement("script");
    script.type="text/javascript";
    script.innerHTML="$(document).ready("+fixfunc.toString()+")";
    document.body.appendChild(script);
})();
