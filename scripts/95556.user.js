// ==UserScript==
// @name           Sankakucomplex Chan & Idol Improved Pagination
// @namespace      faleij
// @description    Sankakucomplex Chan & Idol Improved Pagination
// @include        http://*.sankakucomplex.com/post/*
// @include        http://*.sankakucomplex.com/
// @include        http://*.sankakucomplex.com/?tags=*
// @exclude        http://*.sankakucomplex.com/post/*/show/*
// @version        4.94
// @require        http://userscripts.org/scripts/source/174248.user.js?v=1.1
// ==/UserScript==
j$ = unsafeWindow.jQuery;
j$(unsafeWindow).unbind("scroll");
var moduleName = "Sankaku";
var prefix = moduleName + "#";
var eventBus = j$(unsafeWindow.document);
Events = {BASE_URL_RECEIVED: prefix + "baseUrlReceived",CHANGE_AUTO_ENABLED: prefix + "changeAutoEnabled",TOGGLE_AUTO_ENABLED: prefix + "toggleAutoEnabled",AUTO_ENABLED_CHANGED: prefix + "autoEnabledChanged",PAGE_LOADED: prefix + "pageLoaded"};

(function($, Events, exports) {
    var TOKEN_PAGINATION_SELECTOR = "paginationSelector";
    var TOKEN_CONTENT_CONTAINER_SELECTOR = "contentContainerSelector";
    var TOKEN_GET_PAGE_ID_FUNCTION = "getPageIDFunction";
    var TOKEN_SUPPRESS_LOADING_NEXT_PAGE_ON_STARTUP = "suppressLoadingNextPageOnStartup";
    var DEFAULT_PAGINATION_SELECTOR = "div#paginator.auto-page .pagination";
    var DEFAULT_CONTENT_CONTAINER_SELECTOR = ".content";
    var AUTO_ENABLED_COOKIE_NAME = "auto_page";
    var NEXT_PAGE_URL_ATTRIBUTE_NAME = "next-page-url";
    var CONTENT_PAGE_CLASS_NAME = "content-page";
    var CONTENT_PAGE_ID_PREFIX = "content-page-";
    var COOKIES_EXPIRES = 14;
    var FADE_IN_DURATION = 0;
    var FADE_IN_DELAY = 0;
    var paginationSelector = DEFAULT_PAGINATION_SELECTOR;
    var contentContainerSelector = DEFAULT_CONTENT_CONTAINER_SELECTOR;
    var autoEnabled = true;
    var getPageIDFunction = defaultGetPageIDFunction;
    var pagination = null;
    var contentContainer = null;
    var nextPageDataUrl = "";
    var isLoading = false;
    var triggerBuffer = 2000;
    var suppressLoadingNextPageOnStartup = false;
    var publicAPI = null;
    var loadingStrategyIndex = 0;
    var loadedImages = [];

    function initialize(options) {
        eventBus.unbind(Events.CHANGE_AUTO_ENABLED);
        eventBus.unbind(Events.TOGGLE_AUTO_ENABLED);

        parseOptions(options);
        findDomElements();
        if (!pagination || !contentContainer) {
            return;
        }
        findBaseURLFromAnchors();
        nextPageDataUrl = getNextPageDataUrl(pagination);
        if (!nextPageDataUrl) {
            return;
        }

        $(".content .thumb").each(function(){
            loadedImages.push(this.id);
        });

        addListeners();
        notifyAboutExistingPages();
        updateAutoEnabledOnStartup();
        tryLoadNextPage();
    }
    function parseOptions(options) {
        options = options || {};
        paginationSelector = options[TOKEN_PAGINATION_SELECTOR] || paginationSelector;
        contentContainerSelector = options[TOKEN_CONTENT_CONTAINER_SELECTOR] || contentContainerSelector;
        getPageIDFunction = options[TOKEN_GET_PAGE_ID_FUNCTION] || getPageIDFunction;
        suppressLoadingNextPageOnStartup = options[TOKEN_SUPPRESS_LOADING_NEXT_PAGE_ON_STARTUP] || suppressLoadingNextPageOnStartup;
    }
    function findDomElements() {
        pagination = $(paginationSelector);
        if (!pagination.length) {
            pagination = null;
        }
        contentContainer = $(contentContainerSelector);
        if (!contentContainer.length) {
            contentContainer = null;
        }
    }
    function findBaseURLFromAnchors() {
        var baseURL = "";
        var anchors = $("a", pagination);
        var count = anchors.length;
        var hrefValue;
        for (var i = 0; i < count; i++) {
            hrefValue = $(anchors[i]).attr("href");
            if (typeof hrefValue === "undefined" || hrefValue === "") {
                continue;
            }
            baseURL = hrefValue.replace(/\d+$/, "");
            break;
        }
        if (!baseURL) {
            return;
        }
        dispatchEvent(Events.BASE_URL_RECEIVED, [baseURL]);
    }
    function addListeners() {
        eventBus.bind(Events.CHANGE_AUTO_ENABLED, changeAutoEnabledHandler);
        eventBus.bind(Events.TOGGLE_AUTO_ENABLED, toggleAutoEnabledHandler);
    }
    function notifyAboutExistingPages() {
        var pages = $("." + CONTENT_PAGE_CLASS_NAME + ", [" + NEXT_PAGE_URL_ATTRIBUTE_NAME + "]", contentContainer);
        var count = pages.length;
        var page;
        var pageID;
        for (var i = 0; i < count; i++) {
            page = $(pages[i]);
            pageID = page.attr("id").replace(CONTENT_PAGE_ID_PREFIX, "");
            dispatchEvent(Events.PAGE_LOADED, [pageID, page]);
        }
    }
    function updateAutoEnabledOnStartup() {
        var value = getAutoEnabledFromCookies();
        if (!value) {
            suppressLoadingNextPageOnStartup = false;
        }
        changeAutoEnabled(value, true);
    }
    function changeAutoEnabled(value, forceChanging) {
        forceChanging = !!forceChanging;
        if (!forceChanging) {
            if (value == autoEnabled) {
                return;
            }
        }
        autoEnabled = value;
        saveAutoEnabledInCookies(autoEnabled);
        updateOnAutoEnabledChanged();
        dispatchEvent(Events.AUTO_ENABLED_CHANGED, [autoEnabled]);
    }
    function toggleAutoEnabled() {
        changeAutoEnabled(!autoEnabled, false);
    }
    function updateOnAutoEnabledChanged() {
        publicAPI.auto_enabled = autoEnabled;
        if (autoEnabled) {
            pagination.hide();
            $(window).bind("scroll", window_scrollHandler);
            tryLoadNextPage();
        } else {
            pagination.show();
            $(window).unbind("scroll", window_scrollHandler);
        }
    }
    function getAutoEnabledFromCookies() {
        if (window.location.href.indexOf("file:") > -1) {
            return true;
        }
        var value = $.cookie(AUTO_ENABLED_COOKIE_NAME);
        if (typeof value === "undefined") {
            return autoEnabled;
        }
        return value.toString() == "1" || value.toString() == "true";
    }
    function saveAutoEnabledInCookies(value) {
        var cookieValue = value ? "1" : "0";
        $.cookie(AUTO_ENABLED_COOKIE_NAME, cookieValue, {expires: COOKIES_EXPIRES,path: '/'});
    }
    function tryLoadNextPage() {
        if (isLoading || !autoEnabled) {
            return;
        }
        if (!isNearBottom()) {
            return;
        }
        if (suppressLoadingNextPageOnStartup) {
            suppressLoadingNextPageOnStartup = false;
            return;
        }
        loadNextPage();
    }
    function loadFirstPage() {
        if (!nextPageDataUrl) {
            return;
        }
        if (isLoading) {
            return;
        }
        isLoading = true;
        var dataType = window.location.href.indexOf("file:") > -1 ? "jsonp" : "html";
        var requestOptions = {url: getLoadingStrategyUrl("/post/index.content?page=1"),type: "get",dataType: dataType,success: ajax_successHandler,error: ajax_errorHandler};
        ajax(requestOptions);
    }
    function loadNextPage() {
        if (!nextPageDataUrl) {
            return;
        }
        if (isLoading) {
            return;
        }
        isLoading = true;
        var dataType = window.location.href.indexOf("file:") > -1 ? "jsonp" : "html";
        var requestOptions = {url: getLoadingStrategyUrl(nextPageDataUrl),type: "get",dataType: dataType,success: ajax_successHandler,error: ajax_errorHandler};
        ajax(requestOptions);
    }
    function ajax(requestOptions){
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: requestOptions.type || "get",
                url: requestOptions.url,
                onload: function(xhr){
                    if(xhr.statusText === "OK")
                        requestOptions.success(xhr);
                    else
                        requestOptions.error(xhr);
                },
                onerror: requestOptions.error
            });
        },0);
    }
    function getLoadingStrategyUrl(url){
        switch(loadingStrategyIndex){
            case 0: //google
                return "http://www.ig.gmodules.com/gadgets/proxy/refresh=3600&container=ig/http://"+document.location.host+(url[0]==="/"?"":"/")+url;
                break;
            /*case 1: //coral
             return "http://"+document.location.host+".nyud.net"+(url[0]==="/"?"":"/")+url;
             break;*/
            case 1: //local
                return url;
            default:
                console.error("unsupported loading strategy at index",loadingStrategyIndex,".","Resetting strategy index.");
                loadingStrategyIndex = 0;
                return url;
                break;
        }
    }
    function getNextPageDataUrl(element) {
        if (!element) {
            return "";
        }
        var url = element.attr(NEXT_PAGE_URL_ATTRIBUTE_NAME) || "";
        if (url == "") {
            return "";
        }
        if (url.indexOf("post/index.content") > -1) {
            return url;
        }
        var parts = url.split("?");
        parts[0] = "/post/index.content";
        return parts.join("?");
    }
    function processLoadedPageData(response) {
        var pageID = getPageIDFunction(nextPageDataUrl);
        var newPage = $(response);
        nextPageDataUrl = getNextPageDataUrl(newPage);
        newPage.children().removeClass('blacklisted');
        $(".thumb",newPage).each(function(){
            if(loadedImages.indexOf(this.id)!==-1){
                $(this).remove();
            }else{
                loadedImages.push(this.id);
            }
            var a = $("a",$(this));
            if(a.attr("href").indexOf("post")===-1 && document.location.pathname.indexOf("post")===-1){
                a.attr("href","post/" + a.attr("href"));
            }
        });
        newPage.attr("id", CONTENT_PAGE_ID_PREFIX + pageID).addClass(CONTENT_PAGE_CLASS_NAME);
        var previousPageElement = $("." + CONTENT_PAGE_CLASS_NAME + ":last", contentContainer);
        if (previousPageElement.length) {
            previousPageElement.after(newPage);
        } else {
            previousPageElement = $("[" + NEXT_PAGE_URL_ATTRIBUTE_NAME + "]:first", contentContainer);
            if (previousPageElement.length) {
                previousPageElement.after(newPage);
            } else {
                contentContainer.prepend(newPage);
            }
        }
        showNewPageItems(newPage);
        dispatchEvent(Events.PAGE_LOADED, [pageID, newPage]);
    }
    function showNewPageItems(newPage) {
        var children = newPage.children();
        var count = children.length;
        children.hide();
        children.each(function(index) {
            var child = $(this);
            if (index == count - 1) {
                setTimeout(function() {
                    child.fadeIn(FADE_IN_DURATION, lastChild_fadeInCompleteHandler);
                }, FADE_IN_DELAY * index);
            } else {
                setTimeout(function() {
                    child.fadeIn(FADE_IN_DURATION);
                }, FADE_IN_DELAY * index);
            }
        });
    }
    function onNewPageProcessingComplete() {
        tryLoadNextPage();
    }
    function dispatchEvent(eventName, params) {
        eventBus.trigger(eventName, params || []);
    }
    function isNearBottom() {
        var documentHeight = $(document).height();
        var windowHeight = $(unsafeWindow).height();
        var scrollTop = $(unsafeWindow).scrollTop();
        var distance_from_bottom = documentHeight - windowHeight - scrollTop;
        return distance_from_bottom < triggerBuffer;
    }
    function defaultGetPageIDFunction(url) {
        if (!url) {
            return "";
        }
        var regExp = /page=(\d+)/gi;
        var results = regExp.exec(url);
        if (results && results.length > 1) {
            return results[1];
        }
        return "";
    }
    function ajax_successHandler(xhr) {
        isLoading = false;
        processLoadedPageData(xhr.responseText);
        tryLoadNextPage();
    }
    function ajax_errorHandler(xhr) {
        var prevURL = getLoadingStrategyUrl(nextPageDataUrl);
        console.error("Ajax Error! using strategy",loadingStrategyIndex,"url:",getLoadingStrategyUrl(nextPageDataUrl),"xhr:",xhr);
        loadingStrategyIndex++;
        var dataType = window.location.href.indexOf("file:") > -1 ? "jsonp" : "html";
        var requestOptions = {url: getLoadingStrategyUrl(nextPageDataUrl),type: "get",dataType: dataType,success: ajax_successHandler,error: ajax_errorHandler};
        if(prevURL===requestOptions.url)
            setTimeout(function(){ajax(requestOptions);},6000);
        else
            ajax(requestOptions);
    }
    function window_scrollHandler() {
        tryLoadNextPage();
    }
    function changeAutoEnabledHandler(event, value) {
        changeAutoEnabled(value, false);
    }
    function toggleAutoEnabledHandler(event) {
        toggleAutoEnabled();
    }
    function lastChild_fadeInCompleteHandler() {
        onNewPageProcessingComplete();
    }
    publicAPI = {init: function(options) {
        initialize(options);
    },auto_enabled: autoEnabled};
    exports.Pagination = publicAPI;
    publicAPI.init({});
})(j$, unsafeWindow[moduleName].Events, unsafeWindow[moduleName]);
