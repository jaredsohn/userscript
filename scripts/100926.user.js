// ==UserScript==
// @name          pixiv slideshow
// @namespace     http://d.hatena.ne.jp/AOI-CAT
// @description	  view new arraival faved user, bookmarked, ranking in slideshow.
// @version       0.4
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @include       http://www.pixiv.net/bookmark_new_illust.php*
// @include       http://www.pixiv.net/bookmark.php*
// ==/UserScript==
(function(w, d, $){
	// ローディングアイコン
	var loading_icon_data = 'data:image/gif;base64,'+
	    'R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4'+
	    'bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklr'+
	    'E2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAA'+
	    'EAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUk'+
	    'KhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9'+
	    'HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYum'+
	    'CYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzII'+
	    'unInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAF'+
	    'ACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJ'+
	    'ibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFG'+
	    'xTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdce'+
	    'CAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

    $(document).ready(function(){
        document.addEventListener(
            "loadNext",
            function() {
                var bimg = document.getElementById("bimg");
                if (bimg) bimg.parentNode.removeChild(bimg);
            },
            false
        );

        var Pixiv = {
            base: 'http://www.pixiv.net/',
            illustPage: location.href.match(/[a-z_]+\.php/)[0],
            rest: location.href.match(/rest=([a-z]+)/),
            mode: location.href.match(/mode=([a-z0-9]+)/),
            btn_selector: "",
            works_selector: ""
        };
        if (Pixiv.rest) { Pixiv.rest = Pixiv.rest[0]; }
        switch(Pixiv.illustPage){
            case "bookmark.php":
                  Pixiv.btn_selector = "div.extaraNaviAlso ul";
                  Pixiv.works_selector = 'div.display_works.linkStyleWorks ul li > a[href*="member_illust.php"]';
                  Pixiv.param = function(page) { return { p: page, rest: Pixiv.rest }; };
                  break;
            case "bookmark_new_illust.php":
                  Pixiv.btn_selector = 'div.new_works:first ul';
                  Pixiv.works_selector = '#search-result ul li > a';
                  Pixiv.param = function(page) { return { p: page }; };
                  break;
        }

        var aWorks = $(Pixiv.works_selector);
        GM_log(aWorks);
        var SS = {
            page: 1,
            works: Array.prototype.slice.apply(aWorks),
            idWorks: 0,
            getNextPage: function(page) {
                var self = this;
                if (page === NaN || page == undefined) {
                    self.page++;
                    page = self.page;
                }
                $.get(
                    Pixiv.base + Pixiv.illustPage,
                    Pixiv.param(page),
                    function(data){
                        var obj = $(Pixiv.works_selector, $(data))
                        obj = Array.prototype.slice.apply(obj);
                        for (var i=0; i < obj.length; i++) {
                            self.works.push(obj[i]);
                        }
                        GM_log(self.works);
                    })
            },
            loadNextWork: function(id) {
                var self = this;
                if (id === NaN || id === undefined) {
                    self.idWorks++;
                    id = self.idWorks;
                }
                if (id < 0) { id = self.idWorks - 1; self.idWorks--; }
                if (id < 0) { id = 0; self.idWorks = 0; }
                self.loadContent({type: "id", value: id});
            },
            loadContent: function(id) {
                var self = this;
                var link;
                if (id.type == "id") {
                    var id = id.value;
                    var links = self.works;
                    link = $(links[id]).attr('href');
                    self.updateSidebar(links, id);
                    if (self.works.length -8 < id) { self.getNextPage(); }
                } else {
                    link = id.value;
                }
                $('#psWork')
                    .empty()
                    .load(
                        Pixiv.base + link + 
                        " div.contents-east:first"
                    , function(){
                        $('#psWork div.contents-east:first')
                            .css({
                                marginLeft: "auto",
                                marginRight: "auto"
                            })
                        .find("div.centeredNavi ul li a")
                        .click(function(evt){
                            evt.preventDefault();
                            self.loadContent({type:"url",value:$(this).attr("href")});
                        })
                        .end()
                        .find("div.works_display:first a")
                        .click(function(evt){
                            var illustid = $(this).attr("href").match(/(\d+)/)[0];
                            click2enlarge(illustid, evt);
                        });
                    }
                );
                var ev = document.createEvent("Event");
                ev.initEvent("loadNext", false, true);
                document.dispatchEvent(ev);
            },
            updateSidebar: function(aryWorks, id) {
                var self = this;
                $("#psProf").empty()
                	.load(Pixiv.base + $(aryWorks[id]).attr("href") + " div.profile_area");
                var ul = $('#psSide ul')
                        .empty()
                        .css({
                            marginLeft: "auto",
                            marginRight: "auto",
                            display: "none"
                        });
                var idMax = id + 7;
                if (idMax > aryWorks.length) idMax = aryWorks.length;
                for (var i=id+1; i < idMax; i++) {
                    $('<li />')
                        .css({
                            marginTop: "5px",
                            textAlign: "center"
                        })
                        .attr('id', 'work_'+i)
                        .append(
                            $(aryWorks[i]).clone()
                                .click(function(event){
                                    event.preventDefault();
                                    var id =
                                        event.currentTarget.parentNode.id.match(/(\d+)$/)[1];
                                    self.idWorks = id;
                                    self.loadContent({type:"id",value:parseInt(id)});
                                })
                                .find("img")
                                .css({
                                    display:"block",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                })
                            .end()
                        )
                        .appendTo(ul);
                }
                ul.fadeIn();
            }
        };

        // slideshow layer
        var divSlideBackground = $('<div />')
            .attr("id", "psSlideBack")
            .css({
                width: "100%",
                height: "100%",
                backgroundColor: "#888",
                opacity: 0.5,
                position: "fixed",
                top: "0px",
                left: "0px",
                zIndex: 1,
                display: "none"
            });
       divSlideBackground.appendTo($('body'));

       // slideshow
       var divSlide = $('<div />')
           .attr('id', 'psSlide')
           .css({
                width: "970px",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: "#FFF",
                position: "absolute",
                top: "0px",
                zIndex: 2,
                display: "none"
           });

       // pager
       $('<div />')
           .attr('class', 'pager_top')
           .css({marginBottom: "20px"})
       .append($('<div />')
           .attr('class', 'pages')
           .append($('<ol />')
               .append($('<li></li>')
                   .append($('<a class="button" href="#">≪ 前へ</a>')
                       .click(function(){ SS.loadNextWork(-1); })
                    )
               )
               .append($('<li></li>')
                   .append($('<a class="button" href="#">閉じる</a>')
                       .click(function(){
                           $('#psSlide').fadeOut("fast", function(){
                               $('#psSlideBack').slideUp("normal");
                           });
                       })
                    )
               )
               .append($('<li></li>')
                   .append($('<a class="button" href="#">次へ ≫</a>')
                       .click(function(){ SS.loadNextWork(); })
                    )
               )
           )
        )
       .appendTo(divSlide);

       // cotent area sidebar
       var divSidebar = $('<div />')
           .attr('id', 'psSide')
           .css({
               width: "184px",
               height: "100%",
               float: "left"
           });
       // profile area
       $("<div />").attr("id", "psProf").prependTo(divSidebar)
       // thumb list
       $('<ul />').appendTo(divSidebar);
       divSidebar.appendTo(divSlide);

       // cotent area
       $('<div />')
           .attr('id', 'psWork')
           .css({
               width: "784px",
               float: "left"
           })
           .appendTo(divSlide);
       
       divSlide.appendTo($('body'));

        $('<li><a href="#">スライドショウ</a></li>')
            .click(function(){
                $('#psSlideBack').slideDown("fast", function(){
                    $('#psSlide').fadeIn("fast", function() {
                        SS.loadNextWork(SS.idWorks);
                    });
                });
            })
            .appendTo($(Pixiv.btn_selector));
    });
    


	function click2enlarge (illustid, evt) {
        var is_manga = xpath('//div[@class="works_display"]/a').snapshotItem(0).getAttribute('href').match(/manga/);
        if (!is_manga) {
            evt.preventDefault();
            // 一回表示したらdisplayプロパティの切り替えで対応する
            var bimg;
            if ( bimg = document.getElementById("bimg")) {
                bimg.style.display = (bimg.style.display == "none") ? "" : "none";
            } else {
                var mimg = xpath('//div[@class="works_display"]/a/img').snapshotItem(0);
                var mimg_x = mimg.offsetLeft - 5;
                var mimg_y = mimg.offsetTop - 5;
                var mimg_w = mimg.offsetWidth;
                var mimg_h = mimg.offsetHeight;
                var bimg_url = mimg.src.replace(/_m(\.((jpg)|(jpeg)|(gif)|(png)))/, "$1");

                var loading_icon = document.createElement('img');
                loading_icon.src = loading_icon_data;
                loading_icon.id = 'licon';
                with(loading_icon.style) {
                    position = "absolute";
                    top = mimg_y + 5 + (mimg_h/2) + "px";
                    left = mimg_x + 5 + (mimg_w/2) + "px";
                    zIndex = 3;
                }
                document.body.appendChild(loading_icon);

                var b_img = document.createElement('img');
                b_img.id = "bimg";
                b_img.src = bimg_url;
                with (b_img.style) {
                    position = "absolute";
                    top = mimg_y + "px";
                    left = mimg_x + "px";
                    border = "5px ridge #B7B7B7";
                    display = "none"; 
                    zIndex = 3;
                }
                bimg = document.body.appendChild(b_img);
                bimg.addEventListener(
                    "load",
                    function () {
                        var licon = document.getElementById("licon");
                        licon.parentNode.removeChild(licon);
                        var bimg = document.getElementById("bimg");
                        var div_img = 
                          xpath('//div[@class="works_display"]').snapshotItem(0);
                        var windowSize = document.documentElement.clientWidth - 5;
                        var bimg_x = 0;
                        // 表示されていないとwidthが取得できないので変更
                        bimg.style.display = "";
                        // medium画像の中心に合わせる
                        bimg_x = div_img.offsetLeft +
                            ((div_img.offsetWidth - bimg.offsetWidth) / 2);
                        // 画像がウィンドウより大きい場合は画面左から配置
                        // ウィンドウに収まるときで、medium画像の中心に配置すると
                        // 画像ウィンドウの右へはみ出る場合は画面の中央に配置する
                        if (bimg.offsetWidth > windowSize) {
                            bimg_x = 0;
                        } else if ((bimg_x + bimg.offsetWidth) > windowSize) {
                            bimg_x = 
                                (windowSize - bimg.offsetWidth)/ 2;
                        }
                        bimg.style.left = bimg_x + "px";
                    },
                    false
                );
                bimg.addEventListener(
                    "click",
                    function() {
                        bimg.style.display = "none";
                    },
                    false
                )
            }
        }
	}

	//XPath
	function xpath(query) {
		return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

})(this.window, this.document, this.jQuery);
