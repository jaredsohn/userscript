// ==UserScript==
// @id             AltPagerize
// @name           AltPagerize
// @description    an alternative AutoPagerize
// @author         chrono-meter@gmx.net
// @website        http://userscripts.org/scripts/show/97081
// @updateURL      http://userscripts.org/scripts/source/97081.user.js
// @namespace      chrono-meter@gmx.net
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.2.2; improve AutoPagerize compatibility
// @version        1.2.1; fix pageInfo handling
// @version        1.2.0; add message notification
// @version        1.1.0; fix to detect scroll position, fix to add page, add page information
// @version        1.2.2
// @date           2011-09-06
// @license        MIT License
// @include        http://*
// @include        https://*
// @exclude        https://mail.google.com/*
// @exclude        http://b.hatena.ne.jp/*
// @original       http://userscripts.org/scripts/show/8551
// ==/UserScript==
({ // jQuery error will occur this line.
/*
TODO: http://wedata.net/databases/AutoPagerize/items.json
*/
    noticeTimeout: 30,
    rules: [
        //{ //template
        //    title: 'title of rule',
        //    url: RegExp object || string, //required
        //    init: function(pager){
        //        // on init handler, no return value
        //    },
        //    onRequest: function(doc, paramaters){
        //        // on xhr request handler, no return value
        //        // paramaters is argument of GM_xmlhttpRequest()
        //    },
        //    onResponse: function(doc){
        //        // on xhr response handler, no return value
        //        // post example
        //        parameters.method = 'POST';
        //        parameters.headers = {
        //            'Content-Type': 'application/x-www-form-urlencoded',
        //            };
        //        parameters.data =
        //            $(document.querySelector('#theForm')).serialize();
        //    },
        //    nextLink: function(doc) || css-selector string, //required
        //    pageElement: function(doc) || css-selector string, //required
        //    insertBefore: function(doc) || css-selector string,
        //    interval: 1000, // xhr delay time in milli seconds
        //    pageInfo: function(doc, url){
        //        // create page information for user
        //        return Node; // page information node
        //        // or
        //        return 'title string';
        //    },
        //    style: <><![CDATA[
        //        /* extra styles */
        //    ]]></>,
        //},
        {
            title: 'pixiv',
            url: /^http:\/\/www\.pixiv\.net\/(search|tags|member_illust|bookmark)\.php(?!.*\billust_id=)/,
            nextLink: 'a[rel="next"]',
            pageElement: '.autopagerize_page_element, .display_works > ul',
            init: function(pager){
                document.addEventListener('GM_AutoPagerizeNextPageLoaded', function(e){
                    unsafeWindow.pixiv.scrollView.add('.ui-scroll-view', e.target);
                }, false);
            },
        },
        {
            title: 'kakaku.com specsearch',
            url: /^http:\/\/kakaku\.com\/specsearch\//,
            init: function(pager){
                var e = document.querySelectorAll('.paging > span > strong')[1];
                this.page = parseInt(e.textContent) + 1;
            },
            nextLink: function(doc){
                return location.href;
            },
            pageElement: '#spec_result table.tblBorderGray02',
            onRequest: function(doc, parameters){
                var e = document.querySelector('form[name="specForm"]');
                document.querySelector('input[name="Page"]').value = this.page;
                parameters.method = 'POST';
                parameters.headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    };
                parameters.data = $(e).serialize();
            },
            onResponse: function(doc){
                this.page++;
            },
        },
        {
            title: 'microformat',
            url: '',
            nextLink:     'a[rel="next"], link[rel="next"]',
            insertBefore: '.autopagerize_insert_before',
            pageElement:  '.autopagerize_page_element',
        },
    ],
    init: function(){ let self = this;
        self.currentDocument = document;

        self.rule = {};
        for each (var i in self.rules){
            if ((i.url instanceof RegExp && i.url.test(location.href))
                || location.href.indexOf(i.url) >= 0)
            {
                self.rule = i; //TODO: copy obj
                break;
            }
        }

        GM_log('matched ' + (self.rule.title || self.rule.url));
        if (self.rule.init)
            self.rule.init.apply(self.rule, [self]);
        if (!self.evalRule('pageElement', document))
            return;

        // add style
        if (self.rule.style){
            var e = document.createElementNS(
                'http://www.w3.org/1999/xhtml', 'style');
            e.setAttribute('type', 'text/css');
            e.textContent = self.rule.style;
            document.body.appendChild(e);
        }

        self.insertPointElement = self.evalRule('pageElement', document);
        var e = $(self.insertPointElement);
        var scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight);
        self.bottomLine = scrollHeight - (e.offset().top + e.height());
        window.addEventListener('scroll', function(e){
            self.onScroll(e);
        }, false)
        self.onScroll(null);
        GM_log('finished initialization');
    },
    onScroll: function(e){ let self = this;
        var scrollHeight = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight);
        var remain = scrollHeight - window.innerHeight - window.scrollY;
        //GM_log(remain + ' <= ' + self.bottomLine);
        if (remain <= self.bottomLine)
              self.loadNextPage();
    },
    evalRule: function(name, doc){ let self = this;
        //TODO: 'css:expression', 'xpath:expression'
        var expr = self.rule[name];
        var result = undefined;
        if (typeof(expr) == 'function'){
            result = expr.apply(self.rule, [doc]);
        } else {
            result = doc.querySelector(expr);
        }
        GM_log(name + ' -> ' + result + ' @ ' + doc);
        return result;
    },
    loadNextPage: function(){ let self = this;
        setTimeout(function(){
            self.loadNextPageDelayed();
        }, self.rule.interval || 0);
    },
    loadNextPageDelayed: function(){ let self = this;
        if (self.fired) return;
        self.fired = true;

        var url = self.evalRule('nextLink', self.currentDocument);
        if (typeof(url) != 'string' && url){
            url = url.getAttribute('href') || url.getAttribute('action')
               || url.value;
        }
        if (!url) return;

        var parameters = {
            method: 'GET',
            url: url,
            onload: function(e){
                self.fired = false;
                self.notice();

                // GM_safeHTMLParser() works incomplete with partial url.
                self.currentDocument =
                    self.createHTMLDocumentByString(e.responseText);

                var pageElement =
                    self.evalRule('pageElement', self.currentDocument);
                self.appendPage(e.finalUrl, pageElement.cloneNode(true));
                if (self.rule.onResponse)
                    self.rule.onResponse(self.currentDocument);
                var ev = document.createEvent('Event');
                ev.initEvent('GM_AutoPagerizeNextPageLoaded', true, false);
                document.dispatchEvent(ev);
            },
            onerror: function(e){
                self.notice('load error(' + e.status + ') ' + url);
                if (Math.floor(e.status / 100) == 5){
                    setTimeout(GM_xmlhttpRequest, self.rule.interval || 0,
                               parameters);
                } else {
                    self.fired = false;
                }
            },
        };
        if (self.rule.onRequest)
            self.rule.onRequest(self.currentDocument, parameters);
        self.notice('loading ' + parameters.url);
        GM_xmlhttpRequest(parameters);
    },
    appendPage: function(url, pageElement){ let self = this;
        //TODO: table hack
        let containerElement = self.insertPointElement.parentNode;
        function appendNode(node){
            var insertPoint;
            if (self.rule.insertBefore)
                insertPoint = self.evalRule('insertBefore', document);
            if (!insertPoint)
                insertPoint = self.insertPointElement.nextSibling;
            self.insertPointElement =
                containerElement.insertBefore(node, insertPoint);
        }

        if (!self.currentPage)
            self.currentPage = 0;
        self.currentPage++;

        //<hr class="autopagerize_page_separator"/>
        var e = document.createElementNS('http://www.w3.org/1999/xhtml', 'hr');
        e.classList.add('autopagerize_page_separator');
        appendNode(e);

        var pageInfo = (typeof(self.rule.pageInfo) != 'undefined')
                     ? self.rule.pageInfo(self.currentDocument, url)
                     : '';
        if (typeof(pageInfo) != 'string'){
            appendNode(pageInfo);
        } else {
            //<p class="autopagerize_page_info"><a class="autopagerize_link" href="URL">N</a></p>
            //TODO: <a/> doesn't use http POST.
            var e =
                document.createElementNS('http://www.w3.org/1999/xhtml', 'p');
            e.classList.add('autopagerize_page_info');
            a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            a.classList.add('autopagerize_link');
            a.setAttribute('href', url);
            a.textContent = pageInfo || (self.currentPage + 1);
            e.appendChild(a);
            appendNode(e);
        }

        appendNode(pageElement);

        // compatible with AutoPagerize
        var ev = document.createEvent('MutationEvent');
        ev.initMutationEvent('AutoPagerize_DOMNodeInserted', true, false,
                             self.insertPointElement.parentNode, null,
                             url, null, null);
        pageElement.dispatchEvent(ev);
    },
    notice: function(message){ let self = this;
        // create status domnode
        if (!self.status){
            self.status = document.createElement('div');
            self.status.id = 'altpagerize_status';
            self.status.setAttribute('style', <><![CDATA[
                width: 100%;
                height: 1.5em;
                position: fixed;
                bottom: 0px;
                text-align: center;
                color: white;
                background: gray;
                opacity: 0.7;
            ]]></>);
            self.status.style.display = 'none';
            document.body.appendChild(self.status);
        }

        self.status.textContent = message || '';
        self.status.style.display = (message) ? '' : 'none';

        if (self.noticeTimeoutID) clearTimeout(self.noticeTimeoutID);
        if (message){
            self.noticeTimeoutID = setTimeout(function(){
                self.status.style.display = 'none';
            }, self.noticeTimeout * 1000);
        }
    },
    // from autopagerize.user.js
    createHTMLDocumentByString: function(str){
        function strip_html_tag(str) {
            var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/);
            if (chunks.length >= 3) {
                chunks.splice(0, 2);
            }
            str = chunks.join('');
            chunks = str.split(/(<\/html[ \t\r\n]*>)/);
            if (chunks.length >= 3) {
                chunks.splice(chunks.length - 2);
            }
            return chunks.join('');
        }
        var html = strip_html_tag(str);
        var htmlDoc;
        htmlDoc = document.cloneNode(false);
        htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false));

        var range = document.createRange();
        range.setStartAfter(document.body);
        var fragment = range.createContextualFragment(html);
        fragment = htmlDoc.adoptNode(fragment);
        htmlDoc.documentElement.appendChild(fragment);
        return htmlDoc;
    },
}).init();