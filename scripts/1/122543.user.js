// ==UserScript==
// @name           nico_com_manage
// @description    ニコニコミュニティのページに管理補助機能を追加します。
// @version        0.0.7
// @namespace      http://twitter.com/foldrr
// @include        http://com.nicovideo.jp/community/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://raw.github.com/cho45/jsdeferred/master/jsdeferred.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==
(function(){
    Deferred.define();
    
    // ログインID。
    var loginId = getLoginId();
    
    // コミュニティID。
    var co = getCommunityId(location.href);
    
    // コミュニティメンバーリスト。
    var members = [];
    
    // 退会者のリスト。
    // なぜ退会者を保存する必要があるのか？
    // 退会者を発見したらユーザーが望むまで表示し続けた方が使い勝手がいいと思われるため。
    // 前回との差分だけだと再表示しただけで退会者がリストから非表示になってしまう。
    var leaved = [];
    
    // コミュニティを取得。
    next(function(){
        // コミュニティ
        return getCommunity(co, function(c){
            // 自分がオーナーではないコミュの場合は処理中止。
            if(loginId != c.ownerId){
                return false;
            }
            
            addForm();
        });
    }).
    
    // コミュニティメンバーリストを取得。
    next(function(){
        return getMembers(co, function(ms){
            // debug("ms = " + ms.length);
            members = ms;
        });
    }).
    
    // 退会メンバーを取得。
    next(function(){
        return next(function(){
            // 過去のメンバーリストを取得。
            var prevMembers = JSON.parse(GM_getValue(co + ".prevMembers")) || [];
            
            // 退会者を取得。
            leaved = JSON.parse(GM_getValue(co + ".leavedMembers")) || [];

            // 「すべての退会者を削除」の処理で間違えて {} を突っ込んでしまっていた時のバグ対策。
            leaved = (leaved instanceof Array) ? leaved : [];
            
            for(var p = 0, plen = prevMembers.length; p < plen; p++){
                // 前回のメンバーリストで現在のメンバーリストを検索。
                for(var m = 0, mlen = members.length; m < mlen; m++){
                    if(prevMembers[p].id == members[m].id){
                        break;
                    }
                }
                
                // 現在のメンバーリストから見つからない、つまり退会者。
                if(m == mlen){
                    // 退会者として未登録の場合のみ追加。
                    for(var i = 0, n = leaved.length; i < n; i++){
                        if(prevMembers[p].id == leaved[i].id){
                            break;
                        }
                    }
                    if(i == n){
                        leaved.push(prevMembers[p]);
                    }
                }
            }

            // DEBUG:
            // alert("prevMembers = " + prevMembers.length);
            // alert("members = " + members.length);
            // alert("leaved = " + leaved.length);

            // 過去のメンバーリストを保存。
            GM_setValue(co + ".prevMembers", JSON.stringify(members));
            
            // 退会者リストを保存。
            GM_setValue(co + ".leavedMembers", JSON.stringify(leaved));
            
            // 退会者リストをリフレッシュ。
            var list = $("#nicoComMemberHistoryList");
            if(0 < leaved.length){
                $("#nicoComMemberHistory").slideDown("slow");
                
                for(var i = 0, n = leaved.length; i < n; i++){
                    var li = 
                        <li>
                            <a target="_blank" href="http://www.nicovideo.jp/user/%id" style="text-decoration:none">
                                <img src="%iconUrl" style="width:48px; height:48px"/>
                                <b>%name</b>
                            </a>さん
                            <input class="nicoComRemoveButton" type="button" memberId="%id" memberName="%name" value="リストから消去" />
                        </li>;
                        
                    li = li.toString();
                    li = li.replace(/%id/g, leaved[i].id);
                    li = li.replace(/%iconUrl/g, leaved[i].iconUrl);
                    li = li.replace(/%name/g, leaved[i].name);
                    
                    list.append(li);
                }
                
                $(".nicoComRemoveAllButton").click(function(){
                    if(! confirm("本当にすべての退会者を消去していいですか？")){
                        return;
                    }

                    GM_setValue(co + ".leavedMembers", "[]");

                    $(this).parent().fadeOut();
                });

                $(".nicoComRemoveButton").click(function(){
                    if(! confirm("本当に " + $(this).attr("memberName") + " さんをリストから消去していいですか？")){
                        return;
                    }
                    
                    console.log(leaved.length);
                    var id = $(this).attr("memberId");
                    leaved = $.grep(leaved, function(value, index){
                        return id != value.id;
                    });
                    console.log(leaved.length);
                    GM_setValue(co + ".leavedMembers", JSON.stringify(leaved));
                    
                    $(this).parent().fadeOut();
                });
            }
        });
    }).
    
    // 処理終了。
    next(function(){
        return next(function(){
            $("#message").text("準備完了しました。");
            $("#message").delay(2000).slideUp("slow");
            
            console.log("main: end.");
        });
    });
    
    // 画面項目追加
    function addForm(){
        console.log("addForm: start.");
        
        var nicoComManageHtml = 
            <div id="nicoComManage" style="border: 3px solid #377; margin-bottom:10px">
                <h2 style="color:#FFF; background-color:#377; padding:5px 10px">コミュニティヘルパー</h2>
                <div style="padding:10px">
                    <div id="message" style="display:none; margin-bottom:20px"></div>
                    <div id="nicoComMemberHistory" style="display:none">
                        <input class="nicoComRemoveAllButton" type="button" value="すべての退会者をリストから消去"
                            style="margin-bottom:10px" />
                        <h3>退会者リスト</h3>
                        <ul id="nicoComMemberHistoryList" style="padding-left:20px; list-style-type:none">
                        </ul>
                    </div>
                </div>
            </div>
            
        // コミュメニューの下に表示する場合:
        $("#site-body").prepend(nicoComManageHtml.toString());
        
        // 下記は放送中だった場合に上手くいかないのでやめた。
        // 左側に表示する場合:
        // $(".l").prepend(nicoComManageHtml.toString());
    }
    
    // ログインIDを取得する。
    function getLoginId(){
        var userSession = $.cookie("user_session");
        var loginId = userSession.split("_")[2];
        return loginId;
    }
    
    // コミュニティIDを取得する。
    function getCommunityId(url){
        var s = url.split("/");
        return s[s.length - 1];
    }
    
    // 指定したコミュニティを取得する。
    // callback = function(community:Object)
    function getCommunity(id, callback){
        // console.log("getCommunity(): start");
        
        var url = "http://com.nicovideo.jp/community/" + id;
        return request("GET", url,
            null,
            function(xhr){
                var s = xhr.responseText;
                
                var name = find(s, '<h1 style="border:solid #FFF; border-width:2px 0; margin:4px; padding:4px 0;">', '</h1>');
                
                var tags = find(s, '登録タグ：</td>', '</tr>');
                tags = tags.split("<strong>").slice(1);
                for(var i = 0, n = tags.length; i < n; i++){
                    tags[i] = find(tags[i], "", "<");
                }
                
                var owner = find(s, 'オーナー', '</a>')
                var ownerId = find(owner, 'user/', '"');
                var ownerName = find(owner, '<strong>', '</strong>');
                
                return callback && callback({
                    id: id,
                    url: url,
                    name: name,
                    tags: tags,
                    ownerId: ownerId,
                    ownerName: ownerName
                });
            }
        );
    }
    
    // コミュニティメンバー数を取得する。
    // callback = function(count:int)
    function getMemberCount(co, callback){
        return request("GET", "http://com.nicovideo.jp/member/" + co,
            null,
            function(xhr){
                var s = xhr.responseText;
                s = s.substring(s.indexOf("<strong>") + "<strong>".length, s.indexOf("</strong>"));
                if(! s.match(/^\d+$/)){
                    return false;
                }
                return callback(s);
            }
        );
    }
    
    // コミュニティメンバーリストを取得する。
    // callback = function(members:array)
    function getMembers(co, callback){
        var deferred = new Deferred();
        
        var memberCount = 0;
        var members = [];
        
        // コミュニティメンバー数を取得する。
        return next(function(){
            return getMemberCount(co, function(c){
                memberCount = c;
            });
        }).
        
        // コミュニティメンバーリストを取得する。
        next(function(){
            $("#message").text("準備中です。");
            $("#message").slideDown();
            
            // メンバーページのページ数を取得。
            var pageSize = 35;  // 1ページ最大35人。
            var pageCount = Math.ceil(memberCount / pageSize);
            
            // ページ数分処理を繰り返す。
            return loop(pageCount, function(p){
                return request("GET", "http://com.nicovideo.jp/member/" + co + "?page=" + (p + 1),
                    null,
                    function(xhr){
                        var s = xhr.responseText;
                        var ss = s.split('thumb"><a href="http://www.nicovideo.jp/user/').slice(1);
                        for(var i = 0, n = ss.length; i < n; i++){
                            var id = find(ss[i], '', '"');
                            
                            // アイコン未設定の人はユーザーIDからアイコンURLを計算できない。
                            // そのためスクレイピングする。
                            var iconUrl = find(ss[i], 'src="', '"');
                            
                            var name = find(ss[i], '<p', '</a');
                            name = name.substring(name.lastIndexOf('>') + 1);
                            // debug("name = " + name);
                            members.push({
                                id: id,
                                iconUrl: iconUrl,
                                name: name
                            });
                        }
                    }
                );
            }).
            next(function(){
                (callback(members) !== false) ? deferred.call() : deferred.fail();
            });
        });
        
        return deferred;
    }
    
    // Deferred化したXHR関数。
    function request(method, url, data, onload){
        var deferred = new Deferred();
        GM_xmlhttpRequest({
            'method': method,
            'url': url,
            'data': data,
            'onload': function(xhr){
                // コールバックがfalseを返した場合は失敗と見なす。
                (onload(xhr) !== false) ? deferred.call(xhr) : deferred.fail(xhr);
            }
        });
        return deferred;
    }
    
    // 文字列を抽出する。（スクレイピング用）
    function find(s, starts, ends){
        var i = s.indexOf(starts) + starts.length;
        return s.substring(i, i + s.substring(i).indexOf(ends)); 
    }
    
    // 日付文字列を取得する。
    function getDate(date){
        return date.getFullYear() + "/" +
            ("00" + (date.getMonth() + 1)).substring(1) + "/" + 
            ("00" + date.getDay()).substring(1);
    }

    // デバッグ用。
    function debug(x){
        console.debug(x);
    }
})();
