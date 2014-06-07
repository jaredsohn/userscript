// ==UserScript==
// @name           Reddit - Top Comments Preview
// @namespace      http://userscripts.org/scripts/show/126494
// @author         Erik Wannebo (rewritten by gavin19)
// @description    Preview to the top comments on Reddit
// @include        http://*.reddit.com/*
// @exclude        http://*.reddit.com/*/comments/*
// @include        https://*.reddit.com/*
// @exclude        https://*.reddit.com/*/comments/*
// @version        1.46
// ==/UserScript==
(function () {
    'use strict';
    var topCP = {
        opts: {
            /* Number of comments to display. Default is 3 */
            topComments: 3,
            /* click or hover. Do you want to hover the link to trigger it, or click? */
            eventType: 'click'
        },
        addTopLinks: function () {
            var i, len, link, articleID, tmp,
                a = document.querySelectorAll('.linklisting .comments:not(.empty)');
            if (a.length) {
                for (i = 0, len = a.length; i < len; i += 1) {
                    if (!a[i].parentNode.querySelector('.toplink') && /[0-9]/.test(a[i])) {
                        articleID = a[i].getAttribute('href');
                        articleID = articleID.substring(articleID.indexOf('/comments/') + 10, articleID.indexOf('/comments/') + 16);
                        link = document.createElement('a');
                        link.className = 'toplink';
                        tmp = "java";
                        link.href = tmp + 'script:;';
                        link.setAttribute('id', 'toplink' + articleID);
                        link.setAttribute('style', 'color:orangered;text-decoration:none;');
                        link.textContent = ' top';
                        a[i].parentNode.parentNode.querySelector('.first').insertBefore(link, null);
                        topCP.addListener(link, articleID);
                    }
                }
            }
        },
        addListener: function (link, id) {
            link.addEventListener(topCP.opts.eventType, function () {
                topCP.retrieveTopComments(this, id);
            });
        },
        retrieveTopComments: function (ele, articleID) {
            var pre, url, xhr, thisPre;
            topCP.kill_preview = function () { this.parentNode.removeChild(this); }
            ele = ele.parentNode.parentNode;
            if (!document.querySelector('#preview' + articleID)) {
                pre = document.createElement('div');
                pre.setAttribute('id', 'preview' + articleID);
                pre.classList.add('loading');
                pre.addEventListener('click', topCP.kill_preview);
                ele.querySelector('.first').insertBefore(pre, null);
                url = 'http://www.reddit.com/comments/' + articleID + '/.json?limit=' + (topCP.opts.topComments + 5) + '&sort=top';
                xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        topCP.onloadJSON(xhr);
                    }
                };
                xhr.send(null);
            } else {
                thisPre = document.querySelector('#preview' + articleID);
                thisPre.parentNode.parentNode.style.marginBottom = '';
                thisPre.parentNode.removeChild(thisPre);
            }
        },
        onloadJSON: function (response) {
            var i, len, content, ups, downs, contentDiv, article, author, permalink,
                newHTML = '',
                comments = JSON.parse(response.responseText),
                commentsLength = comments[1].data.children.length,
                articleID = comments[0].data.children[0].data.id,
                threadLink = comments[0].data.children[0].data.permalink;
            len = topCP.opts.topComments < commentsLength ? topCP.opts.topComments : commentsLength;
            for (i = 0; i < len; i += 1) {
                content = comments[1].data.children[i].data.body_html;
                if (content) {
                    contentDiv = document.createElement('div');
                    contentDiv.innerHTML = content;
                    content = contentDiv.firstChild.textContent;
                    author = comments[1].data.children[i].data.author;
                    ups = comments[1].data.children[i].data.ups;
                    downs = comments[1].data.children[i].data.downs;
                    permalink = threadLink + comments[1].data.children[i].data.id;
                    newHTML += (i > 0 ? '<hr>' : '');
                    newHTML += '<a class="authorLink" target="_blank" href="/u/' + author;
                    newHTML += '">' + author + '</a>&nbsp;&nbsp;';
                    newHTML += '(+' + ups + '|-' + downs + ')';
                    newHTML += '<a href="' + permalink + '" target="_blank" class="perma">permalink</a>';
                    newHTML += '<br />' + content;
                }
            }
            article = document.querySelector('#preview' + articleID);
            article.classList.remove('loading');
            article.innerHTML = newHTML;
            article.parentNode.parentNode.style.marginBottom = (article.offsetHeight + 5) + 'px';
            article.removeEventListener('click', topCP.kill_preview);
        },
        addStyle: function () {
            var style,
                sheet = '';
            sheet += "div[id^=preview]{font-size:normal;box-sizing:border-box;-moz-box-sizing:border-box;background:rgba(245,245,250,.9);border-radius:5px;border:1px solid #000;box-shadow:1px 1px 1px #000;white-space:normal;padding:5px;position:absolute;margin-top: 2px;}";
            sheet += ".loading:before{content:\"Loading...\";}div[id^=preview] .md{border:1px solid #000;box-shadow:1px 1px 1px #000;background:rgba(225,226,227,.9);box-sizing:border-box;-moz-box-sizing:border-box;margin:3px;padding:2px 8px;}";
            sheet += "div[id^=preview] .authorLink,div[id^=preview] .md a{font-weight:bold;text-decoration:underline;color:#369!important;}";
            sheet += ".listing-page .linklisting .buttons li { vertical-align: top; }";
            sheet += ".perma { float: right; }";
            style = document.createElement('style');
            style.type = 'text/css';
            style.textContent = sheet;
            document.querySelector('head').appendChild(style);
        },
        init: function () {
            document.body.addEventListener('DOMNodeInserted', function (e) {
                if ((e.target.tagName === 'DIV') && (e.target.getAttribute('id') && e.target.getAttribute('id').indexOf('siteTable') !== -1)) {
                    topCP.addTopLinks();
                }
            }, true);
            topCP.addStyle();
            topCP.addTopLinks();
        }
    };
    if (document.body) {
        setTimeout(function () {
            topCP.init();
        }, 300);
    } else {
        window.addEventListener('load', function () {
            topCP.init();
        }, false);
    }
}());