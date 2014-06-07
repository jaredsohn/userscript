// ==UserScript==
// @name           nico_com_search
// @namespace      http://twitter.com/foldrr
// @description    ニコニコ動画マイページにニコニコミュニティ検索機能を追加します。
// @include        http://www.nicovideo.jp/my/community*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        https://raw.github.com/cho45/jsdeferred/master/jsdeferred.js
// @require        https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==
(function(){
    // コミュニティアイコン取得失敗時のリトライまでのタイムアウト時間(ミリ秒)
    // ※0以下でリトライなし。
    var timeoutToGetCommunityIcon = 500;

    // ログインID
    var loginId = getLoginId();
    
    /*
    setValue("communities", "");
    setValue("lastUpdated", "");
    return;
    /**/
    
    // 参加中のコミュニティ一覧。
    var communities = [];
    
    // JSDeferredを準備する。
    Deferred.define();
    
    // Arrayを拡張する。
    Array.prototype.subtract = function(items, equals){
        var diff = [];
        
        $.each(this, function(i, a){
            var found = false;
            $.each(items, function(j, b){
                if(equals(a, b)){
                    found = true;
                    return false;
                }
            });
            if(! found){
                diff.push(a);
            }
        });
        
        return diff;
    };
    
    // メイン処理。
    (function(){
        addForm();
        
        var json = getValue("communities");
        json = !!json ? json : "[]";
        communities = JSON.parse(json);
        
        if(0 < communities.length){
            $("#nicoComSearchBody").slideDown();
        }
        
        reload();

        $("#nicoComSearchKeyword").focus();
    })();
    
    // 画面項目を追加する。
	function addForm(){
        // メインフォーム。
        var html =
            <div id="nicoComSearch" style="border:3px solid #95B9DE; margin-bottom:20px">
                <div id="nicoComSearchHeader" style="color:#666; background-color:#D8E5F3; margin:0px; padding:5px 10px">
                    <h3>
                        コミュニティ検索
                        <span id="nicoComSearchHeaderButtons">
                            <input id="nicoComSearchCacheReload" type="button" value="キャッシュ再読み込み" />
                        </span>
                    </h3>
                </div>
                <div style="padding:10px 20px 10px; background-color:#FFF">
                    <div id="nicoComSearchBody" style="display:none;">
                        <input id="nicoComSearchKeyword" type="text" size="40" /> 
                        <input id="nicoComSearchClear" type="button" value="クリア" />
                    </div>
                    <div id="nicoComSearchInfo" style="margin-top:10px; color:#888">
                        <div id="nicoComSearchMessage">
                            検索準備中です。
                        </div>
                        <div id="nicoComSearchProgress" style="display:none;">
                        </div>
                    </div>
                    <ul id="nicoComSearchResult" style="margin:0px; padding:0px"></ul>
                </div>
            </div>
        $("#mypageContents").prepend(html.toString());
        
        // キャッシュ再読み込みボタン
        $("#nicoComSearchCacheReload").click(function(){
            $("#nicoComSearchReload").hide();
            $("#nicoComSearchBody").slideUp();
            
            communities = [];
            refresh($("#nicoComSearchResult"), []);

            next(reload()).
            next(function(){
                $("#nicoComSearchReload").slideDown();
                
                var keyword = $("#nicoComSearchKeyword").val();
                var results = search($.trim(keyword), communities);
                refresh($("#nicoComSearchResult"), results);
            });
        });
        
        // 検索キーワード入力欄
        $("#nicoComSearchKeyword").keyup(function(){
            var keyword = $(this).val();
            var results = search($.trim(keyword), communities);
            refresh($("#nicoComSearchResult"), results);
        });
        
        // クリアボタン
        $("#nicoComSearchClear").click(function(){
            $("#nicoComSearchKeyword").val("").focus();
            refresh($("#nicoComSearchResult"), []);
        });
    }
    
    // コミュニティ情報を再読み込みする。
    function reload(){
        $("#nicoComSearchHeaderButtons").slideUp();
        $("#nicoComSearchProgress").text("").slideDown();
        $("#nicoComSearchInfo").slideDown();
        
        var newCommunities = [];  // 参加中のコミュニティ。
        var newCommunitiesHash = {};  // 参加中のコミュニティのハッシュ。
        
        var added = [];  // 新たに参加したコミュニティ。
        var deleted = [];  // 退会したコミュニティ。
        
        // 参加中のコミュニティIDを取得する。
        return next(function(){
            return getJoinedCommunities(function(c){
                newCommunities.push(c);
                newCommunitiesHash[c.id] = c;
            });
        }).
        
        // 前回との差分を取得。
        next(function(){
            // 前回との差分から新たに参加したコミュニティを取得。
            added = newCommunities.subtract(communities, function(a, b){
                return a.id == b.id;
            });
            
            // 前回との差分から退会したコミュニティを取得。
            deleted = communities.subtract(newCommunities, function(a, b){
                return a.id == b.id;
            });
        }).
        
        // 新たに参加したコミュニティを追加。
        next(function(){
            var i = 1;
            return getCommunities(added, function(c){
                communities.push(c);
                $("#nicoComSearchProgress").text(
                    "[" + i++ + " / " + added.length + "] " + c.id + ":" + c.title);
            }).
            next(function(){
                setValue("communities", JSON.stringify(communities));
            });
        }).
        
        // 退会したコミュニティを削除。
        next(function(){
            communities = communities.subtract(deleted, function(a, b){
                return a.id == b.id;
            });
            setValue("communities", JSON.stringify(communities));
        }).
        
        // 検索フォームを表示。
        next(function(){
            $("#nicoComSearchHeaderButtons").slideDown();
            $("#nicoComSearchBody").slideDown();
            $("#nicoComSearchInfo").slideUp();
        }).
        
        // 更新されたコミュニティを反映。
        next(function(){
            var lastUpdated = new Date(getValue("lastUpdated"));
            lastUpdated = lastUpdated ? new Date(lastUpdated) : null;
            
            for(var id in newCommunitiesHash){
                var c = newCommunitiesHash[id];
                if(lastUpdated <= c.updated){
                    for(var i = 0, n = communities.length; i < n; i++){
                        if(communities[i].id == id){
                            getCommunity(null, id, function(c){
                                communities[i] = c;
                            });
                            break;
                        }
                    }
                }
            }
            
            var now = new Date();
            now = new Date(now.getFullYear(), now.getMonth(), now.getDate(),
                now.getHours(), now.getMinutes());
            setValue("lastUpdated", now.toString());
        });
    }
    
    // コミュニティ一覧を最新の状態に更新する。
    function refresh(target, results){
        target.empty();
        
        var divs = [];
        for(var i = 0, n = results.length; i < n; i++){
            var html = 
                <li style="clear:both; border-top:1px dashed #95B9DE; margin:10px 0px 10px; padding-top:10px">
                    <div class="userThumb" style="float:left; width:48px; height:48px">
                        <a target="_blank" href="http://com.nicovideo.jp/community/%id">
                            <img src="http://icon.nimg.jp/community/%id.jpg" style="width:48px; height:48px; border:1px white solid"/>
                        </a>
                    </div>
                    <div style="float:left; width:510px; padding-left:20px">
                        <a target="_blank" href="http://com.nicovideo.jp/community/%id">%title</a><br/>
                        タグ：%tags<br/>
                        オーナー：<a href="http://www.nicovideo.jp/user/%ownerId">%ownerName</a>
                    </div>
                    <div style="float:none; clear:both"></div>
                </li>
            
            html = html.toString();
            html = html.replace(/%id/g, results[i].id);
            html = html.replace(/%title/g, results[i].title);
            html = html.replace(/%tags/g, results[i].tags.join(" "));
            html = html.replace(/%ownerId/g, results[i].ownerId);
            html = html.replace(/%ownerName/g, results[i].ownerName);
            
            divs.push(html);
        }
        
        target.append(divs.join(""));
        
        // コミュニティのアイコン（サムネイル）の読み込みに失敗する場合がある。
        // 失敗したらリトライする。
        if(0 < timeoutToGetCommunityIcon){
            $("#nicoComSearch img").error(function(){
                var self = this;
                setTimeout(function(){
                    var _src = self.src;
                    self.src = null;
                    self.src = _src.split("?")[0];
                }, timeoutToGetCommunityIcon);
            });
        }
    }
    
    // キーワードから参加しているコミュニティを検索する。
    function search(keyword, communities){
        var founds = [];
        
        if(keyword == ""){
            return [];
        }
        
        var keywords = hira2kata(zen2han(keyword)).split(" ");
        
        // キーワード配列から正規表現の配列を取得する。
        var rs = getRegexes(keywords);
        
        // 検索する。
        for(var i = 0, n = communities.length; i < n; i++){
            var c = communities[i];
            
            // 検索条件: コミュニティ名
            var title = hira2kata(zen2han(c.title));
            
            // 検索条件: タグ
            var tags = hira2kata(zen2han(c.tags.join(" ")));
            
            // 検索条件: オーナー名
            var ownerName = hira2kata(zen2han(c.ownerName));
            
            // 検索条件: プロフィール
            var profile = hira2kata(zen2han(c.profile));
            
            var whole = [title, tags, ownerName, profile].join(" ");
            if(match_all(whole, rs)){
                // 見つかったら重み付けをする。
                var f = JSON.parse(JSON.stringify(c));
                
                f.rank = 0;
                f.rank += match_or(ownerName, rs) * 100;
                f.rank += match_or(title, rs) * 50;
                f.rank += match_or(tags, rs) * 20;
                
                founds.push(f);
            }
        }
        
        founds = founds.sort(function(a, b){
            return b.rank - a.rank;
        });
        
        return founds;
    }
    
    // キーワード配列から正規表現配列を取得する。
    function getRegexes(keywords){
        var rs = [];
        for(var i = 0, n = keywords.length; i < n; i++){
            rs.push(new RegExp(keywords[i], "ig"));
        }
        return rs;
    }
    
    // 正規表現配列に全て一致するか調べる。
    function match_all(s, regexes){
        for(var i = 0, n = regexes.length; i < n; i++){
            if(! s.match(regexes[i])){
                return false;
            }
        }
        
        return true;
    }
    
    // 正規表現配列のどれかに一致するか調べる。
    function match_or(s, regexes){
        var hits = 0;
        for(var i = 0, n = regexes.length; i < n; i++){
            var m = s.match(regexes[i]);
            if(m){
                return true;
            }
        }
        
        return false;
    }
    
    // ログインIDを取得する。
    function getLoginId(){
        var userSession = $.cookie("user_session");
        var loginId = userSession.split("_")[2];
        return loginId;
    }
    
    // 参加しているコミュニティ数を取得する。
    // callback = function(communityCount:Number)
    function getCommunityCount(callback){
        return request(null,
            "GET", "http://com.nicovideo.jp/community",
            null,
            function(xhr){
                var s = xhr.responseText;
                
                var count = find(s, '<div class="pagelink">', '件中');
                count = find(count, '<strong>', '</strong');
                
                return callback(count);
            }
        );
    }
    
    // 参加しているコミュニティIDリストを取得する。
    // callback = function(community:Object)
    function getJoinedCommunities(callback){
        var communityCount = 0;
        
        // コミュニティ数を取得。
        return getCommunityCount(function(c){
            communityCount = c;
            if(c == 0){
                return false;
            }
        }).
        
        // コミュニティIDのリストを取得。
        next(function(){
            var pageSize = 30;
            var pageCount = Math.ceil(communityCount / pageSize);
            var WAIT = 0.2;
            
            return loop(pageCount, function(p){
                return request(null,
                    "GET", "http://com.nicovideo.jp/community?page=" + (1 + p),
                    null,
                    function(xhr){
                        debug("p = " + p);
                        var s = xhr.responseText;
                        s = find(s, '<div class="com_frm_line size_l">', '<!--// com_frm_line //-->');
                        
                        var divs = s.split('<div').slice(1);
                        for(var i = 0, n = divs.length; i < n; i++){
                            // コミュニティID。
                            var id = find(divs[i], '<a href="/community/', '"');
                            
                            // コミュニティ名。
                            var title = find(divs[i], 'class="community">', '</a>');
                            
                            // コミュニティ更新日付。
                            var u = find(divs[i], 'date">', ' 更新</p>');
                            var m = u.match(/([0-9]{4})年([0-9]{2})月([0-9]{2})日 ([0-9]{2}):([0-9]{2})/);
                            var updated = new Date(m[1], parseInt(m[2]) - 1, m[3], m[4], m[5]);
                            
                            callback && callback({
                                id: id,
                                title: title,
                                updated: updated
                            });
                        }
                    }
                ).wait(WAIT);
            });
        });
    }
    
    // 指定したコミュニティのリストを取得する。
    // callback = function(community:Object)
    function getCommunities(communities, callback){
        var WAIT = 2.5;
        return loop(communities.length, function(i){
            return getCommunity(null, communities[i].id, function(c){
                callback && callback(c);
            }).
            wait(WAIT);
        });
    }
    
    // 指定したコミュニティを取得する。
    // callback = function(community:Object)
    function getCommunity(d, id, callback){
        // ニコ動が混雑中の場合を想定して取得完了までDeferredする。
        var d = d || new Deferred();
        var url = "http://com.nicovideo.jp/community/" + id;
        debug(url);
        
        return request(null,
            "GET", url,
            null,
            function(xhr){
                var s = xhr.responseText;
                // debug(s);
                
                // 混雑中か判定
                var h1 = find(s, '<h1>', '</h1>');
                debug("h1 = " + h1);
                if(h1 == "混雑中です"){
                    getCommunity(d, id, callback);
                    return false;
                }
                
                // タイトル
                // var title = find(s, '<h1 style="border:solid #FFF; border-width:2px 0; margin:4px; padding:4px 0;">', '</h1>');
                var title = find(s, '<h1 id="community_name">', '</h1>');
                debug("title = " + title);

                // アイコン
                var iconUrl = "http://icon.nimg.jp/community/" + id + ".jpg";
                // debug("iconUrl = " + iconUrl);
                
                // タグ
                var tags = find(s, '登録タグ：</td>', '</tr>');
                tags = tags.split("<strong>").slice(1);
                // debug("tags.length = " + tags.length);
                for(var i = 0, n = tags.length; i < n; i++){
                    tags[i] = find(tags[i], "", "<");
                }
                
                // オーナー
                var owner = find(s, 'オーナー', '</a>')
                var ownerId = find(owner, 'user/', '"');
                var ownerName = find(owner, '<strong>', '</strong>');
                
                // プロフィール
                var profile = find(s, '<div class="cnt2" style="overflow:hidden; word-break: break-all;">', '</div>');
                profile = profile.trim();
                debug("profile.length = " + profile.length);
                profile = profile.length == 0 ? "" : $(profile).text();  // 空の場合に $() に渡すと落ちる。

                callback && callback({
                    id: id,
                    title: title,
                    url: url,
                    iconUrl: iconUrl,
                    tags: tags,
                    ownerId: ownerId,
                    ownerName: ownerName,
                    profile: profile
                });
                
                var start = new Date().getTime();
                var curr = new Date().getTime();
                while(curr < start + 2000){
                    curr = new Date().getTime();
                }
            }
        );
    }
    
    // ブラウザからデータを取得する。
    function getValue(k){
        return GM_getValue(loginId + "." + k);
    }
    
    // ブラウザにデータを保存する。
    function setValue(k, v){
        GM_setValue(loginId + "." + k, v);
    }
    
    // Deferred化したXHR関数。
    // callback = function(xhr:Object);
    function request(d, method, url, data, callback){
        d = d || new Deferred();
        
        GM_xmlhttpRequest({
            'method': method,
            'url': url,
            'data': data,
            'onload': function(xhr){
                return callback && (callback(xhr) !== false) && d.call();
            }
        });
        
        return d;
    }
    
    // 文字列を抽出する。（スクレイピング用）
    function find(s, starts, ends){
        var i = s.indexOf(starts);
        if(i < 0){
            return "";
        }
        i += starts.length;
        return s.substring(i, i + s.substring(i).indexOf(ends)); 
    }
    
    // ひらがなからカタカナに変換する。
    function hira2kata(s){
        s = s.replace(/う゛/gm, "ヴ");
        
        var ret = [];
        for(var i = 0, n = s.length; i < n; i++){
            var c = s.charCodeAt(i);
            ret[i] = (0x3041 <= c && c <= 0x3096) ? c + 0x0060 : c;
        }
        
        return String.fromCharCode.apply(null, ret);
    }
    
    // 全角から半角へ変換する。
    function zen2han(s){
        var zen = '＿１２３４５６７８９０ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ＠－．，：';
        var han = '_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@-.,:';
        
        for(i = 0, n = zen.length; i < n; i++){
            var re = new RegExp(zen[i], "gm");
            s = s.replace(re, han[i]);
        }
        
        return s;
    }
    
    // デバッグ用。
    function debug(x){
        console.debug(x);
    }
})();
