// ==UserScript==
// @name        NicoMenUse
// @namespace   http://www.atomer.sakura.ne.jp/
// @description ニコニコ動画のヘッダーメニューの拡張
// @include     http://www.nicovideo.jp/*
// @version     0.2
// ==/UserScript==
(function() {
    var nicomenu = {
        VIDEO_RANKING: {
            admin: '<ul>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/hourly/all">毎時</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/daily/all">デイリー</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/weekly/all">週間</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/monthly/all">月間</a></li>' +
                       '<li><a href="http://www.nicovideo.jp/ranking/fav/total/all">合計</a></li>' +
                   '</ul>'
        },
        
        insertRankingMenu: function() {
            var info = this._getPage();
            info && this.insert(info.target);
        },
        
        insert: function(nav) {
            var li = nav.parentNode.parentNode;
			
			nav.appendChild(document.createTextNode("▼"));
            
			var wrap = document.createElement("div");
			wrap.id = "nicomenuse_top";
            wrap.setAttribute("style", "display:none;");
            wrap.innerHTML = this.VIDEO_RANKING.admin;
            li.insertBefore(wrap, nav.parentNode.nextSibling);
            
            function open() {
                wrap.style.display = "block";
                wrap.setAttribute("data-nicohdHover", "2");
            }
            function close(s) {
                wrap.style.display = "none";
                wrap.removeAttribute("data-nicohdHover");
            }
            
            li.addEventListener("mouseover", open, false);
            li.addEventListener("mouseout", close, false);
            
            wrap.addEventListener("mouseover", open, false);
            wrap.addEventListener("mouseout", close, false);
        },
        
        _getPage: function() {
            var nav = document.querySelector("#menu-ranking span");
            if (nav) {
                return {
                    page: "top",
                    target: nav
                };
            }
			nav = document.querySelector("[href=uni_ranking] span");
            if (nav) {
                return {
                    page: "admin",
                    target: nav
                };
            }
            return false;
        }
    };
    
    nicomenu.insertRankingMenu();
})();