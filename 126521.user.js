// ==UserScript==
// @name           Moko Download Initializer
// @namespace      MKDI
// @include        http://*.moko.cc/*
// @require		   http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.1.min.js
// ==/UserScript==

var EXPORTED_SYMBOLS = [ "MKDI"];

var MKDI = {
    username:'',
    isInPostsList:(function () {
        var url = document.URL;
        var posts_ptn1 = /moko\.cc\/post\/[0-9|A-z]+\/new\/\d+\.html$/ig;
        //posts list in time order
        var posts_ptn2 = /moko\.cc\/post\/[0-9|A-z]+\/list\.html$/ig;
        //posts list in default order
        return posts_ptn1.test(url) || posts_ptn2.test(url);
    })(),
    isInPost:(function () {
        var post_ptn = /moko\.cc\/post\/\d+\.html$/ig;
        return post_ptn.test(document.URL);
    })(),
    appearance:{
        // click the sort order according to created time
        sortByTime:function () {
            if (!MKDI.isInPostsList || (location.href.indexOf('/new/') != -1))
                return;
            $(".content.post-sort a[href*='/new/']")[0].click();
        },
        gotoGalleriesList:function () {
            if (document.URL.match(/moko\.cc\/[0-9|A-z]+\/*$/))
                $('#a_post')[0].click();
        },
        more_links:function () {
            return $('p[id^="showAll"].more:visible a').add('p[id^="showAll_0"].more:visible a');
        },
        // display more
        display_more_galleries:function () {
            if (!MKDI.isInPostsList) return;
            this.more_links().trigger('click');
        },
        // display lazy load images
        display_lazy_images:function () {
            if (!MKDI.isInPost) return;
            $('p.picBox img').each(function (index, img) {
                if (!img.src) img.src = img.getAttribute('src2');
            });
        },
        // hide comments
        toggleComments:function (on) {
            if (!MKDI.isInPost)    return;
            var target = $('div.comment');
            on ? target.show() : target.hide();
            target = $('div#divnotShowComment');
            on ? target.show() : target.hide();
        },
        // hide slides
        toggleSlides:function (on) {
            var target = $('div.moko-slider');
            on ? target.show() : target.hide();
        },
        toggleBanner:function(on) {
            var banner = $('img[src*="banner"]').parent();
            on ? banner.show() : banner.hide();
        },
        toggleFooter:function (on) {
            var target = $('footer');
            on ? target.show() : target.hide();
        },
        customInfobar:function (on) {
            var show = $('div.container.wBC ul.nav li#post a');
            var logout = $('nav.moko-nav ul#logout_title').children();
            var author = $('div.hUser div.info h1.name a:first').wrap('<li />');
            var city = $('div.hUser div.info h2.merit span').wrap('<li />');
            var subscription = $('div.hUser p.operation span').wrap('<li />');
            var infoBar = show.add(logout).add(author).add(city).add(subscription).wrap('<ul class="nav" />').wrap('<nav class="moko-nav" />');
            infoBar.insertBefore('nav.moko-nav');
            $('nav.moko-nav').hide();
            $('div.hUser').hide();
            $('div.container.wBC ul.nav').hide();
        },
        tuneContainerWidth:function () {
            if (!MKDI.isInPostsList)    return;
            $('div.container').width(window.innerWidth * 0.91);
        },
        enlargeCover:function () {
            if (!MKDI.isInPostsList)    return;
            if (MKDI.appearance.more_links().length) {
                window.setTimeout('MKDI.appearance.enlargeCover()', 200);
                return;
            }
            $("div.show.small").removeClass("small");
        },
        changeTitle:function () {
            var title = 'mk';
            if (MKDI.isInPost) title = 'mki|' + MKDI.username + $("div.content div.sTitle p.count a.sImg").text();
            if (MKDI.isInPostsList) title = 'mkg|' + MKDI.username + $('div.container ul.nav li#post a#a_post').text().match(/\(\d+\)/)[0];
            document.title = title;
        },
        insertDeleteButton: function () {
            if (!MKDI.isInPost) return;
            var style = $('<style type="text/css"> \
                .picBox a.delete{ display:none; background-color: #333333; text-align:center; font-size:60px; font-weight:800; height:80px; width: 80px; } \
                .picBox:hover a.delete{ display: inline-block; position:absolute; z-index:2; right: 0; opacity: 0.6; cursor: pointer; } \
            </style>');
            style.appendTo($('head'));
            var button =$('<a onclick="$(this).parent().remove()" class="delete wC">X</a>');
            button.appendTo('p.picBox');
        },
        change:function () {
            this.gotoGalleriesList();
            //this.sortByTime();
            this.display_more_galleries();
            this.display_lazy_images();
            this.tuneContainerWidth();
            this.changeTitle();
            this.toggleBanner();
            this.toggleFooter();
            this.toggleComments();
            this.toggleSlides();
            $('nav a.logo').hide();
            this.enlargeCover();
            this.insertDeleteButton();
        }
    },
    Gallery:function (box) {
        this.$box = $(box);
        this.piclength = Number($('h6 a', box).text());
        this.$img = $('div.coverBox img', box);
        this.title = this.$img.attr('title');
        this.url = $('div.coverBox a.coverBg', box).prop('href');
        this.$statusbar = $('div.coverBox p.count', box);
        this.rate = Number(this.$statusbar.find('a.sGl.gC').text());

        // insert checkbox
        this.$statusbar.prepend('<input type="checkbox" class="sPl gC" style="float:right" />');
        this.$checkbox = this.$statusbar.find(':checkbox');
        this.$checkbox.prop('value', this.url);
        this.postId = this.url.match(/\/post\/(\d+)\.html/i)[1];
        this.$checkbox.prop('id', 'md_' + this.postId);

        this.doCheck = function (isCheck) {
            this.$checkbox.prop('checked', isCheck);
        };
        this.isChecked = function () {
            return this.$checkbox.length ? this.$checkbox.attr('checked') : false;
        };
        this.doCheck(MKDI.galleries.hotRate <= this.rate);
    },
    galleries:{
        $collection:$(),
        collect:function () {
            if (!MKDI.isInPostsList)    return;
            $("div.show").each(function (index, box) {
                if (!$(':checkbox', box).length) {
                    MKDI.galleries.$collection.push(new MKDI.Gallery(box));
                }
            });
        },
        sort:function (list, left, right) {
            var i = left;
            var j = right;
            var middle = list[left].rate;
            while (i <= j) {
                while ((list[i].rate > middle) && (i < right)) i++;
                while ((list[j].rate < middle) && (j > left)) j--;
                if (i <= j) {
                    var temp = list[i];
                    list[i] = list[j];
                    list[j] = temp;
                    i++;
                    j--;
                }
            }
            if (left < j) MKDI.galleries.sort(list, left, j);
            if (right > i) MKDI.galleries.sort(list, i, right);
        },
        hotRate:20,
        checkoutHot:function (rate) {
            if (rate) MKDI.galleries.hotRate = rate;
            var count = 0;
            MKDI.galleries.$collection.each(function (index, gallery) {
                var isCheck = (gallery.rate >= MKDI.galleries.hotRate);
                gallery.doCheck(isCheck);
                if (isCheck) count++;
            });
        },
        tuneHotRate:function (e) {
            if (!e.ctrlKey || (e.keyCode != 38 && e.keyCode != 40))    return;
            if (e.keyCode == 38) MKDI.galleries.hotRate++;
            if (e.keyCode == 40) MKDI.galleries.hotRate--;
            MKDI.galleries.checkoutHot();
        },
        applySort:function () {
            if (MKDI.isInPostsList && location.href.indexOf('/new/') != -1)
                return;
            $("div.content.post-sort ~ *").hide();
            var container = $("div.content.post-sort").parent();
            MKDI.galleries.$collection.each(function (i, box) {
                box.$box.css("margin-left", 3).appendTo(container);
            })
        },
        init:function (rate) {
            if (!MKDI.isInPostsList)    return;
            if (MKDI.appearance.more_links().length) {
                window.setTimeout('MKDI.galleries.init(' + rate + ')', 200);
                return;
            }
            this.collect();
            this.sort(MKDI.galleries.$collection, 0, MKDI.galleries.$collection.length - 1);
            this.checkoutHot(rate);
            this.applySort();
            document.body.addEventListener('keypress', MKDI.galleries.tuneHotRate, false);
            $('p[id^="showAll"].more a').ajaxComplete(function () {
                MKDI.appearance.enlargeSmallGalleries();
                MKDI.galleries.collect()
            })
        }
    },
    init:function (rate) {
        if (MKDI.isInPost || MKDI.isInPostsList)
            MKDI.username = $('h2.website').text().replace('www.moko.cc/', '');
        MKDI.appearance.change();
        MKDI.galleries.init(rate);
        return MKDI;
    }
};

unsafeWindow.MKDI = MKDI.init(2);