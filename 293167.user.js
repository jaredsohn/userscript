// ==UserScript==
// @name        LFMC
// @namespace   http://barrenfrozenwasteland.com
// @include     http://www.lovefilm.com/*
// @include     https://www.lovefilm.com/*
// @include	https://www.amazon.co.uk/ap/signin?openid.assoc_handle=lovefilm*
// @match     http://www.lovefilm.com/*
// @match     https://www.lovefilm.com/*
// @match	https://www.amazon.co.uk/ap/signin?openid.assoc_handle=lovefilm*
// @version     1.1
// @grant       GM_addStyle
// @grant    GM_getResourceText
// @require http://yui.yahooapis.com/combo?3.14.1/yui-base/yui-base-min.js&3.14.1/oop/oop-min.js&3.14.1/event-custom-base/event-custom-base-min.js&3.14.1/features/features-min.js&3.14.1/dom-core/dom-core-min.js&3.14.1/dom-base/dom-base-min.js&3.14.1/selector-native/selector-native-min.js&3.14.1/selector/selector-min.js&3.14.1/node-core/node-core-min.js&3.14.1/color-base/color-base-min.js&3.14.1/dom-style/dom-style-min.js&3.14.1/node-base/node-base-min.js&3.14.1/event-base/event-base-min.js&3.14.1/event-delegate/event-delegate-min.js&3.14.1/node-event-delegate/node-event-delegate-min.js&3.14.1/pluginhost-base/pluginhost-base-min.js&3.14.1/pluginhost-config/pluginhost-config-min.js&3.14.1/node-pluginhost/node-pluginhost-min.js&3.14.1/dom-screen/dom-screen-min.js&3.14.1/node-screen/node-screen-min.js&3.14.1/node-style/node-style-min.js&3.14.1/attribute-core/attribute-core-min.js&3.14.1/event-custom-complex/event-custom-complex-min.js&3.14.1/attribute-observable/attribute-observable-min.js
// @require http://yui.yahooapis.com/combo?3.14.1/attribute-extras/attribute-extras-min.js&3.14.1/attribute-base/attribute-base-min.js&3.14.1/attribute-complex/attribute-complex-min.js&3.14.1/base-core/base-core-min.js&3.14.1/base-observable/base-observable-min.js&3.14.1/base-base/base-base-min.js&3.14.1/base-pluginhost/base-pluginhost-min.js&3.14.1/classnamemanager/classnamemanager-min.js&3.14.1/event-synthetic/event-synthetic-min.js&3.14.1/event-focus/event-focus-min.js&3.14.1/widget-base/widget-base-min.js&3.14.1/widget-htmlparser/widget-htmlparser-min.js&3.14.1/widget-skin/widget-skin-min.js&3.14.1/widget-uievents/widget-uievents-min.js&3.14.1/arraylist/arraylist-min.js&3.14.1/base-build/base-build-min.js&3.14.1/widget-parent/widget-parent-min.js&3.14.1/widget-child/widget-child-min.js&3.14.1/tabview-base/tabview-base-min.js&3.14.1/plugin/plugin-min.js&3.14.1/event-simulate/event-simulate-min.js&3.14.1/async-queue/async-queue-min.js&3.14.1/gesture-simulate/gesture-simulate-min.js
// @require http://yui.yahooapis.com/combo?3.14.1/node-event-simulate/node-event-simulate-min.js&3.14.1/event-key/event-key-min.js&3.14.1/node-focusmanager/node-focusmanager-min.js&3.14.1/tabview/tabview-min.js&3.14.1/array-extras/array-extras-min.js&3.14.1/history-base/history-base-min.js&3.14.1/yui-later/yui-later-min.js&3.14.1/history-html5/history-html5-min.js&3.14.1/history-hash/history-hash-min.js&3.14.1/history-hash-ie/history-hash-ie-min.js&3.14.1/router/router-min.js&3.14.1/pjax-base/pjax-base-min.js&3.14.1/querystring-stringify-simple/querystring-stringify-simple-min.js&3.14.1/io-base/io-base-min.js&3.14.1/pjax-content/pjax-content-min.js&3.14.1/pjax/pjax-min.js&3.14.1/querystring-parse/querystring-parse-min.js&3.14.1/querystring-stringify/querystring-stringify-min.js
// @resource yuiskin http://yui.yahooapis.com/combo?3.14.1/widget-base/assets/skins/sam/widget-base.css&3.14.1/tabview/assets/skins/sam/tabview.css&3.14.1/cssbutton/cssbutton-min.css
// ==/UserScript==


YUI().use('node', 'tabview', 'querystring', 'pjax', function(Y) {
    var LFI = {
        mainmenu: {},
        links: {},
        usernav: {},
        searchform: {},
        filterlists:{},
        maincontent: {},
        glowsection: {},
        pjax: {},
	scrolling: null,
	scrollDiv: null,

        init: function() {
	    this.login();
            this.mainmenu = Y.one('.main-navigation.primary-navigation');
            this.links = this.mainmenu.all('li');
	    this.forceRedirect();
	    this.body = Y.one('body');
            this.usernav = Y.one('#lf-widget-1');
            this.searchform = Y.one('.site-search');
            this.filterlists = Y.one('#lf-widget-3');
            this.maincontent = Y.one('#main-content');
            this.glowsection = Y.one('.section.glow');
	    this.watchlistsection = Y.one('.section.watchlist');
	    this.playerreview = Y.one('#player-review');
	    this.crumb = Y.one('.crumb');
            this.addStyles();
            this.fixLayout();
            this.forceSearch();

	    // Work out which page we're on and apply appropriate interface
	    if (this.glowsection) {
		if (this.glowsection.hasClass('overview')) {
		    this.initOverview();
		} else if (this.glowsection.hasClass('listview')) {
		    this.forceGridview();
		} else if (this.glowsection.hasClass('gridview')) {
		    this.initGridview();
		}
	    } else if (this.watchlistsection) {
		this.initWatchlist();
	    } else if (this.playerreview) {
		this.initPlayer();
	    }

        },

	/**
	 * If not logged in, redirect to login form
	 */
	login: function() {
	    var signinlink = Y.one(document.evaluate('//a[text()="Sign in"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0));
	    if (signinlink) {
		var loginamazon = Y.one('#login-amazon');
		if (loginamazon) {
		    window.location.href = loginamazon.one('a').getAttribute('href');
		} else {
		    window.location.href = signinlink.getAttribute('href');
		}
	    }	
	},

        /**
         * Force the site to the Instant section
         */
        forceRedirect: function() {
            var links = this.links;
	    this.links.each(function(link) {
		if (link.hasClass('current')) {
		    var linktext = link.get('textContent');
		    if (!linktext.contains('LOVEFiLM Instant') && !linktext.contains('Collections')) {
			links.shift();
			instantlink = links.shift();
			window.location.href = instantlink.one('a').getAttribute('href');
		    }
		}
	    });
        },

        /**
         * Add YUI skin and custom CSS
         */
        addStyles: function() {
            GM_addStyle(GM_getResourceText('yuiskin'));
            var style = 'div.search-category-wrapper, #lf-widget-1, #lf-main-navigation, .page-footer, .list_grid_view, .itemsperpage, .lf-paginator {display:none;}';
            style += '.page {width:98%}';
            style += 'form.site-search, #lf-search-keywords-1, form.site-search .btn {height:auto}';
            style += '#lf-search-keywords-1, form.site-search .btn {font-size: 3em}';
            style += 'body {font-size: 1.5em}';
            style += 'a.watchlist-length {float:right; font-size: 3em; margin-left: 1em; margin-right: -4em; line-height: 1em; padding: 0.2em;}';
	    style += '#backbutton {font-size: 3em; position: absolute;right: 1em;}';
	    style += '.utility-bar div.type-filter {float:none;}';
	    style += '.grid-view li {height: auto;}';
	    style += '.gridview div.crumb {color: black; display: inline;}';
	    style += '.pagination .crumb a, .pagination .crumb span {background-color: transparent; border: none; outline: none; padding: 0;}';
	    style += '.pagination * {font-size: 1.2em;}';
	    style += '.pagination {padding: .1em .2em;}';
	    style += '#moreliketab .compact_info_snb {float:left;}';;
	    style += '.playertab {height: 32em; overflow-y: scroll;overflow-x:hidden;}';
	    style += '#product-summary a.remove-from-watchlist, #product-summary .yui3-button {font-size: 2em; line-height: 1em;}';
	    style += '.title_children li a, .title_children li span, #moreeptab .left_col li, #moreeptab .left_col li .n_season {font-size: 1.5em;}';
	    style += 'div.season div.list_episodes {width: 420px;}';
	    style += '.scrollover {height: 2em; width: inherit; position: absolute; display: block;}';
	    style += '.scrollover.up {top: 4.2em; cursor: n-resize;}';
	    style += '.scrollover.down {top: 34.8em; cursor: s-resize;}';
	    style += '.yui3-tab-panel > div {padding-top: 2em; padding-bottom: 2em;}';
	    style += '.yui3-tab-label.yui3-tab-content {font-size: 2em; line-height: .7em}';
            GM_addStyle(style);
            Y.one('body').addClass('yui3-skin-sam');
        },

        /*
         * Force search to be limited to instant
         */
        forceSearch: function() {
            var searchmode = this.searchform.one('#lf-search-categories');
            searchmode.all('option').each(function(o) {
                if (o.get('label') === "Instant") {
                    o.set('selected', 'selected');
                }
            });
        },

        /*
         * Global changes to the layout
         */
        fixLayout: function() {
	    if (!this.playerreview) {
		Y.one('.page-left-nav').remove(false);
	    }
            Y.one('.lf-main-navigation').remove(false);
            this.maincontent.removeClass('span-10');
            var watchlist = Y.one('a.watchlist-length');
	    watchlist.addClass('yui3-button');
            watchlist.remove(false);
            Y.one('.search-bar').prepend(watchlist);
	    backbutton =  this.body.create('<input type="button" id="backbutton" value="↩" />');
	    backbutton.on('click', function() {history.go(-1);});
	    Y.one('.page-header').append(backbutton);
        },

        initOverview: function() {
                var tabcontainer = this.maincontent.create('<ul></ul>');
                this.glowsection.all('.shelf').each(function(shelf) {
                    var name = shelf.getAttribute('data-widget_name');
                    var id = 'ov-'+name.toLowerCase().replace(/ /g, '_');
                    var title = shelf.one('h2').get('textContent');
                    shelf.setAttribute('id', id);
                    var tab = tabcontainer.create('<li><a href="#'+id+'">'+title+'</a></li>');
                    tabcontainer.appendChild(tab);
                });
		this.crumb.remove();
                this.maincontent.prepend(tabcontainer);
                var tabview = new Y.TabView({
                    srcNode: '#main-content'
                });
                tabview.render();
        },

        forceGridview: function() {
            if (window.location.href.contains("v=l")) {
                var newloc = window.location.href.replace("v=l", "v=g");
                window.location.href = newloc;
            } else {
                window.location.href += "&v=g";
            }
        },

        initGridview: function() {
	    var collectionsbanner = this.glowsection.one('.collections');
    	    if (collectionsbanner) {
	    	collectionsbanner.remove();
	    }
	    var ytlinks = this.glowsection.all('a[href*="youtube.com"]');
	    if (ytlinks.size()) {
		ytlinks.remove();
	    }
	    var boxtitle = this.glowsection.all('.box_title');
	    if (boxtitle) {
		boxtitle.remove();
	    }
	    this.glowsection.all('.pagination').pop().remove();
	    this.crumb.remove(false);
	    this.glowsection.one('.pagination').prepend(this.crumb);

            var rows = this.glowsection.all('.row');
            var firstrow = Y.one('.first_row');
            rows.each(function(row) {
                if (row !== firstrow) {
                    row.all('.compact_info_snb').each(function(item) {
                        item.remove(false);
                        if (item.hasClass('first')) {
                            item.removeClass('first');
                        }
                        firstrow.append(item);
                    });
                }
            });
        },

	initWatchlist: function() {
	    var typefilter = Y.one('.type-filter');
	    typefilter.remove(false);
	    Y.one('.primary-wrap .utility-bar').prepend(typefilter);
	    this.watchlistsection.one('.ft').remove();
	},

	initPlayer: function() {
	    tabhtml = '<div id="yui-tabcontainer" class="span-8"><ul id="yui-tabs">';
	    tabhtml += '<li><a href="#infotab">Info</a></li>';
	    tabhtml += '<li><a href="#moreeptab">More Episodes</a></li>';
	    tabhtml += '<li><a href="#moreliketab">More Like This</a></li>';
	    tabhtml += '<li><a href="#reviewstab">Reviews</a></li>';
	    tabhtml += '</ul><div id="yui-tabcontents">';
	    tabhtml += '<div id="infotab" class="playertab"></div>';
	    tabhtml += '<div id="moreeptab" class="playertab"></div>';
	    tabhtml += '<div id="moreliketab" class="playertab"></div>';
	    tabhtml += '<div id="reviewstab" class="playertab"></div>';
	    tabhtml += '</div></div>';
	    tabcontainer = this.body.create(tabhtml);

	    var info = Y.one('#product-summary');
	    var moreep = Y.one('#main-content .section.season');
	    var reviews = Y.one('#main_tabs');
	    var morelike = Y.all('.page-related .section').pop();

	    var syn = info.one('.synopsis');
	    var syntext = this.body.create(syn.getHTML());
	    syntext.addClass('lfmc-synopsis');
	    info.insertBefore(syntext, syn);
	    syn.remove();

	    info.remove(false);
	    tabcontainer.one('#infotab').append(info);
	    moreep.remove(false);
	    tabcontainer.one('#moreeptab').append(moreep);
	    reviews.remove(false);
	    tabcontainer.one('#reviewstab').append(reviews);
	    morelike.remove(false);
	    tabcontainer.one('#moreliketab').append(morelike);
	    Y.one('.product-wrapper').append(tabcontainer);
	    this.maincontent.remove();
	    Y.one('.page-related').remove();

	    morelikemask = morelike.one('.mask');
	    morelikeinfos = morelike.all('.compact_info_snb');
	    if (morelikeinfos.size()) {
		morelikeinfos.each(function(item) {
		    item.remove(false);
		    if (item.hasClass('first')) {
			item.removeClass('first');
		    }
		    morelikemask.append(item);
		});
		morelike.one('.wrapper').remove();
	    }

	    var scrollDown = this.body.create('<a class="scrollover down"></a>');
	    scrollDown.on('mouseover', function(e) {
		this.startScrollDown();
	    }, this);
	    scrollDown.on('mouseout', function(e) {
		this.stopScroll();
	    }, this);
	    tabcontainer.append(scrollDown);

	    var scrollUp = this.body.create('<a class="scrollover up"></a>');
	    scrollUp.on('mouseover', function(e) {
		this.startScrollUp();
	    }, this);
	    scrollUp.on('mouseout', function(e) {
		this.stopScroll();
	    }, this);
	    tabcontainer.prepend(scrollUp);

	    Y.all('#title-breadcrumb a').addClass('yui3-button');

	    var tabview = new Y.TabView({
		srcNode: '#yui-tabcontainer'
	    });
	    tabview.render();

	},

	startScrollDown: function() {
	    this.scrollDiv = Y.one('#yui-tabcontents .yui3-tab-panel-selected');
	    this.scrolling = setInterval(function() {
		if (LFI.scrollDiv) {
		    LFI.scrollDiv.set("scrollTop", LFI.scrollDiv.get("scrollTop")+1);
		}
	    }, 10);
	},

	startScrollUp: function() {
	    this.scrollDiv = Y.one('#yui-tabcontents .yui3-tab-panel-selected');
	    this.scrolling = setInterval(function() {
		if (LFI.scrollDiv) {
		    LFI.scrollDiv.set("scrollTop", LFI.scrollDiv.get("scrollTop")-1);
		}
	    }, 10);
	},

	stopScroll: function() {
	    clearInterval(this.scrolling);
	    this.scrollDiv = null;
	}

    }

    LFI.init();

});

