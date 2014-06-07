// ==UserScript==
// @id             cc98_id_alias
// @name           cc98 id alias
// @version        0.4.0
// @namespace      soda@cc98.org
// @author         soda <sodazju@gmail.com>
// @description    给98增加类新浪微博的ID备注功能
// @include        http://www.cc98.org/dispbbs.asp*
// @require        http://libs.baidu.com/jquery/2.0.3/jquery.min.js
// @run-at         document-end
// ==/UserScript==

// cc98 JavaScript SDK，已去掉不需要的部分

// Chrome 没有sendAsBinary函数，这里是一个实现
if (!XMLHttpRequest.prototype.sendAsBinary) {
    XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
        function byteValue(x) {
            return x.charCodeAt(0) & 0xff;
        }
        var ords = Array.prototype.map.call(datastr, byteValue);
        var ui8a = new Uint8Array(ords);
        this.send(ui8a);
    };
}

// 辅助函数
// parseQS, toQS, parseURL, unescapeHTML, ajax, addStyles
var _lib = {

    // parse the url get parameters
    parseQS: function(url) {
        url = url.toLowerCase().split('#')[0];  // remove the hash part
        var t = url.indexOf('?');
        var params;

        var hash = {};
        if (t >= 0) {
            params = url.substring(t+1).split('&');
        } else {    // plain query string without '?' (e.g. in cookies)
            params = url.split('&');
        }
        for (var i = 0; i < params.length; ++i) {
            var val = params[i].split('=');
            hash[decodeURIComponent(val[0])] = decodeURIComponent(val[1]);
        }
        return hash;
    },

    toQS: function(obj) {
        var ret = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if ('' === obj[key]) { continue; }
                ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
            }
        }
        return ret.join('&');
    },

    parseURL: function(url) {
        // from JavaScript: The Good Parts
        var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        var arr = parse_url.exec(url);
        var result = {};
        result['url'] = arr[0];
        result['scheme'] = arr[1];
        result['slash'] = arr[2];
        result['host'] = arr[3];
        result['port'] = arr[4];
        result['path'] = arr[5];
        result['query'] = arr[6];
        result['hash'] = arr[7];
        return result;
    },

    // 将转义后的html转回来
    unescapeHTML: function(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    },

    ajax: function(opts) {
        opts = {
            type: opts.type || 'GET',
            url: opts.url || '',
            data: opts.data || null,
            contentType: opts.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
            success: opts.success || function() {},
            async: opts.async || (opts.async === undefined)
        };

        var xhr = new XMLHttpRequest();

        xhr.open(opts.type, opts.url, opts.async);
        xhr.setRequestHeader('Content-type', opts.contentType);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                opts.success(xhr.responseText);
            }
        };
        if (opts.contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
            xhr.send(_lib.toQS(opts.data));
        } else {
            xhr.sendAsBinary(opts.data);
        }
    },

    // 添加CSS
    addStyles: function(css) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        head.appendChild(style);
    }
};

// 98相关的函数接口
// getPostContent, parseTopicPage, postCount, pageCount, formatURL, currentPage
var _cc98 = function() {

    var that = {};

    // 各种常量
    var POST_COUNT_RE = /本主题贴数\s*<b>(\d+)<\/b>/ig;

    // 以下三个没有考虑被删除的帖子，因为在当前页解析的时候DisplayDel()和正常的发帖时间之类的会一起出现，导致匹配会乱掉
    // 因此引起的发米机发米楼层可能不精确的问题也没办法了……
    var NAME_RE = /(?:name="\d+">| middle;">&nbsp;)\s*<span style="color:\s*\#\w{6}\s*;"><b>([^<]+)<\/b><\/span>/g;
    var ANNOUNCEID_RE = /<a name="(\d{2,})">/g; // 注意网页上<a name="1">之类的标签是作为#1的anchor出现的，所以此处限定至少要两个数字
    var POST_TIME_RE = /<\/a>\s*([^AP]*[AP]M)\s*<\/td>/g;

    // 获取页面中的用户列表，回帖时间回帖ID
    // @return {Array}  每个数组元素都有username, annouceid, posttime三个属性
    that.parseTopicPage = function(htmlText) {
        if (!htmlText) { htmlText = document.body.innerHTML; }
        var postList = [];
        
        var nameArr = htmlText.match(NAME_RE);
        nameArr.forEach(function(name) {
            var post = {};
            post['username'] = name.replace(NAME_RE, '$1');
            postList.push(post);
        });

        var idArr = htmlText.match(ANNOUNCEID_RE);
        // 考虑到心灵没有announceid，所以idArr可能为空
        if (idArr) {
            idArr.forEach(function(id, index) {
                postList[index]['announceid'] = id.replace(ANNOUNCEID_RE, '$1');
            });
        }

        var timeArr = htmlText.match(POST_TIME_RE);
        if (timeArr) {
            timeArr.forEach(function(t, index) {
                postList[index]['posttime'] = t.replace(POST_TIME_RE, '$1');
            });
        }

        return postList;
    };

    that.postCount = function(htmlText) {
        if (!htmlText) { htmlText = document.body.innerHTML; }
        return parseInt(htmlText.match(POST_COUNT_RE)[0].replace(POST_COUNT_RE, '$1'), 10);
    };

    that.pageCount = function(htmlText) {
        return Math.ceil(_cc98.postCount(htmlText) / 10);
    };

    // 格式化网址，去除无用的参数并转为相对链接
    // @param {string}  url 要格式化的网址
    // @param {boolean} maxPageFix 是否修正url中star参数的值，使其不超过当前最后页的实际值
    that.formatURL = function(url, maxPageFix) {
        var urlObj = _lib.parseURL(url);

        // 不在www.cc98.org域名下
        if (urlObj['host'] !== 'www.cc98.org') {
            return url;
        }

        // http://www.cc98.org/
        if (!urlObj['path']) {
            return '/';
        }

        var params = _lib.parseQS(urlObj['query']);
        var hash = urlObj['hash'] ? ('#' + urlObj['hash']) : '';

        // 不是dispbbs.asp开头的链接，只去掉空的get参数，转为相对链接，不做其他处理
        if (urlObj['path'] === 'dispbbs,asp') {
            return '/' + urlObj['path'] + '?' + _lib.toQS(params) + hash;
        }

        // 如果不是在追踪页面，就去掉replyid
        if (!params['trace']) {
            params['replyid'] = '';
        }
        params['page'] = '';    // 去掉page

        // 
        if (params['star'] && maxPageFix && parseInt(params['star'], 10) > _cc98.pageCount()) {
            params['star'] = _cc98.pageCount();
        }

        params['star'] = (params['star'] && params['star'] !== '1') ? params['star'] : '';    // star=1时去掉
        return '/' + urlObj['path'] + '?' + _lib.toQS(params) + hash;
    };

    that.currentPage = function() {
        return parseInt(/<span title="跳转到第\s*(\d+)\s*页/ig.exec(document.body.innerHTML)[1], 10);
    };

    return that;
}();

jq = jQuery.noConflict();   // 防止与98默认jQuery版本的冲突

(function($) {

$(function() {
    var Aliases = function() {
        var that = {};
        var dict = JSON.parse(localStorage.getItem('aliases')) || {};

        var flush = function() {
            localStorage.setItem('aliases', JSON.stringify(dict));
        };
        that.flush = flush;

        that.get = function(name) {
            return dict[name];
        };

        that.set = function(name, alias) {
            dict[name] = alias;
            flush();
        };

        that.remove = function(name) {
            delete dict[name];
            flush();
        };

        return that;
    };
    var aliases = Aliases();

    function today() {
        var d = new Date();
        // 考虑到98服务器时间有延迟，所以延迟2分钟更新日期
        if (d.getHours() === 0 && d.getMinutes() <= 2) {
            d.setDate(d.getDate() - 1);
        }
        return (d.getFullYear()) +  ('0' + (d.getMonth() + 1)).slice(-2) + ('0' + d.getDate()).slice(-2);
    }

    var XinlinRecords = function() {
        var that = {};
        var records = JSON.parse(localStorage.getItem('xinlin-records')) || [];

        var flush = function() {
            var n = [], o = {};
            for (var i = 0; i !== records.length; ++i) {
                if (records[i]['name'] && !o[records[i]['name']]) {
                    o[records[i]['name']] = true;
                    n.push(records[i]);
                }
            }
            records = n;
            localStorage.setItem('xinlin-records', JSON.stringify(records))
        };
        that.flush = flush;

        var add = function(url, index, name, alias) {
            records.push({
                'url': url,
                'index': index,
                'name': name,
                'last-update': today()
            });
            aliases.set(name, alias);
            flush();
        };
        that.add = add;

        var remove = function(name) {
            for (var i = 0; i !== records.length; ++i) {
                if (records[i]['name'] === name) {
                    records.splice(i, 1);
                    break;
                }
            }
            aliases.remove(name);
            flush();
        };
        that.remove = remove;

        var modify = function(url, index, name, alias) {
            remove(name);
            if (!alias) {
                return;
            }
            add(url, index, name, alias);
            flush();
        };
        that.modify = modify;

        var update = function(callback) {
            for (var i = 0; i !== records.length; ++i) {
                if (records[i]['last-update'] === today()) { continue; }
                _lib.ajax({
                    'url': records[i]['url'],
                    'success': function(i) {
                        return function(htmlText) {
                            if (htmlText.indexOf('帖子主题') < 0) { return; }   // 避免出现500、404等错误
                            var postList = _cc98.parseTopicPage(htmlText);

                            var oldName = records[i]['name'];
                            var alias = aliases.get(oldName); // 暂存备注
                            var index = records[i]['index'];
                            var newName = postList[index] ? postList[index]['username'] : undefined;

                            records[i]['name'] = newName;
                            records[i]['last-update'] = today();
                            aliases.remove(oldName);
                            if (newName) {
                                aliases.set(newName, alias);
                            }
                            flush();
                        }
                    }(i)
                });
            }
            flush();
        };
        that.update = update;

        return that;
    }
    var xinlin = XinlinRecords();


    function show() {
        var user = $('img[src="pic/reply.gif"]').parent().parent().parent().parent().parent().parent().prev();
        var idNodes;
        if (_lib.parseQS(location.search)['boardid'] !== '182') {
            idNodes = user.find('b').parent().parent();
        } else {
            idNodes = user.find('b').parent();
        }

        idNodes.each(function(index, ele) {
            var node = $(this);

            var edit_btn = $('<a class="id-alias" href="javascript:void(0);">[备注]</a>');
            node.after(edit_btn);

            edit_btn.hide();
            user.eq(index).hover(function() {
                edit_btn.show();
            }, function() {
                edit_btn.hide();
            });

            edit_btn.click(function(e) { editAlias(username, index); });

            var namenode = node.find('b');
            var username = namenode.text().trim();
            var alias = aliases.get(username);
            if (alias) {
                namenode.text(alias);
            }

        });

        _lib.addStyles('.id-alias { display: inline-block; margin-left: 2px; font-size: 10px }');
    }

    function editAlias(username, index) {
        var url = _cc98.formatURL(location.href, true);
        var newAlias = prompt('请输入备注名（更新备注后须刷新才能看到）', aliases.get(username) || '');
        var isXinlin = (_lib.parseQS(location.search)['boardid'] === '182');

        if (newAlias === null) { return; }  // 按了取消

        if (newAlias === '') {
            if (isXinlin) {
                xinlin.remove(username);
            } else {
                aliases.remove(username);
            }
        } else {
            if (isXinlin) {
                xinlin.modify(url, index, username, newAlias);
            } else {
                aliases.set(username, newAlias);
            }
        }
    }

    xinlin.update();
    show();

});

})(jq);