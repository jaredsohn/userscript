// ==UserScript==
// @name       GDUT library helper
// @namespace  http://library.gdut.edu.cn
// @version    0.2.0
// @description  Show the available books amount in GDUT library.
// @match      http://book.douban.com/*
// @copyright  2012-2013, Link, hbc
// @require http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.3.min.js
// @require http://isbn.jpn.org/js/isbn.js
// @require http://isbn.jpn.org/js/isbn-groups.js
// ==/UserScript==
// @grant GM_xmlhttpRequest

var helper = {
    pages: {
        subject: {},
        subject_search: {}
    },
    
    url: 'http://222.200.98.171:81/',
    utils: {},
    tmpl: {},
    parser: {},
    kick: {}
};

/* utils */

// isbn converter
helper.utils.convertISBN = function(isbn, length) {
    var result = [ ];
    isbn = ISBN.parse(isbn);
    if(length === 10) {
        result.push(isbn.asIsbn10(true));
    }
    else if(length === 13) {
        result.push(isbn.asIsbn13(true));
    }
    return result;
};

// Origin code from Bean vine: userscripts.org/scripts/review/49911
helper.utils.gb2312 = function(keyword) {
    var dfd = $.Deferred();

    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://www.baidu.com/s?ie=utf-8&wd=' +
                encodeURIComponent(keyword),
        overrideMimeType: 'text/xml; charset=gb2312',
        onload: function(resp) {
            if (resp.status < 200 || resp.status > 300) {
                return;
            }
            var keywordGB = String(
                resp.responseText.match(/word=[^'"&]+['"&]/i))
                                 .replace(/word=|['"&]/ig,'');
            /* in gb2312 now */
            dfd.resolve(keywordGB);
        },
        onerror: function() {
            return;
        }
    });

    return dfd.promise();
};

// example: {{ name }}
helper.utils.tmpl = function(str, data) {
    var re = /\{\{([\w ]+)\}\}/, ret = str;
    var r;

    while ((r = re.exec(ret)) !== null) {
        ret = ret.replace(r[0], data[r[1].trim()]);
    }

    return ret;
};

helper.utils.query_factory = function(type, meta, cmp) {
    return function(value) {
        var dfd = new $.Deferred();
        var query_url = helper.tmpl.query_url(type, value);

        GM_xmlhttpRequest({
            method: 'GET',
            url: query_url,
            onload: function(resp) {
                var result = helper.parser.results(resp.responseText,
                                                   query_url, meta,
                                                   cmp);
                if (result.foundc) {
                    dfd.resolve(result);
                } else {
                    dfd.reject(result);
                }
            }
        });

        return dfd.promise();
    };
};

/* templating */

helper.tmpl.query_url = function(type, value) {
    return helper.utils.tmpl(
        helper.url + 'searchresult.aspx?dp=50&{{ type }}={{ value }}',
        {type: type, value: value}
    );
};

helper.tmpl.library_book_url= function(ctrlno) {
    return helper.url + 'bookinfo.aspx?ctrlno=' + ctrlno;
};

/* parser */

helper.parser.result = function(buffer) {
    var c = $(buffer).children();
    if (c.length < 9) {
        return null;
    }

    return {
        name: $(c[1]).text().trim(),
        ctrlno: $('input', c[0]).attr('value').trim(),
        author: $(c[2]).text().trim(),
        publisher: $(c[3]).text().trim(),
        total: parseInt($(c[6]).text().trim(), 10),
        remains: parseInt($(c[7]).text().trim(), 10)
    };
};

helper.parser.results = function(buffer, url, meta, cmp) {
    var ret = {
        remains: 0,
        total: 0,
        foundc: 0,
        url: url,
    };

    var not_found = $('#searchnotfound', buffer);
    if (not_found.length === 0) {
        /* found the books */
        var r, i;
        var results = $('tbody tr', buffer);
        ret.foundc = $('#ctl00_ContentPlaceHolder1_countlbl', buffer).html();
        ret.foundc = parseInt(ret.foundc, 10);
        for (i = 0;i < results.length;i ++) {
            r = helper.parser.result(results[i]);
            if (r !== null && cmp(r, meta)) {
                ret.url = helper.tmpl.library_book_url(r.ctrlno);
                ret.remains += r.remains;
                ret.total += r.total;
                break;
            }
        }
    }

    return ret;
};

/* pages */

// /subject/xxx
helper.pages.subject = function() {
    var book_meta = function() {
        var publisher = /出版社: (.*)/.exec($('#info').text());
        if (publisher !== null) {
            publisher = publisher[1].trim();
        }
        var isbn = /ISBN: (.*)/.exec($('#info').text());
        if (isbn !== null) {
            isbn = isbn[1].trim();
        }

        return {
            title: $('#wrapper h1 span').text(),
            publisher: publisher,
            isbn10: helper.utils.convertISBN(isbn, 10),
            isbn13: helper.utils.convertISBN(isbn, 13)
        };
    };

    var inject = function(result) {
        var t = function(buffer) {
            return helper.utils.tmpl(
                '<span class="pl">GDUT:</span> {{ content }}<br />',
                 {content: buffer}
            );
        };
        var l = function(url, content) {
            return helper.utils.tmpl(
                '&nbsp;<a target="_blank" href={{url}}>{{content}}</a>',
                {url: url, content: content}
            );
        };


        var info = $('#info');
        var tmpl;

        if (result.foundc <= 0) {
            tmpl = t(l(result.url, '没有找到哦'));
        } else {
            if (result.total === 0 && result.remains === 0) {
                tmpl = t(l(result.url, '找到 ' + result.foundc + ' 本类似的'));
            } else {
                tmpl = t(l(result.url, '还剩 ' + result.remains + ' 本'));
            }
        }
        info.append(tmpl);
    };

    var publisher_cmp = function(result, meta) {
        return (result.publisher === meta.publisher);
    };

    var book = book_meta();

    var query_title = function() {
        var dfd = new $.Deferred();

        var fn = helper.utils.query_factory('title_f', book, publisher_cmp);
        helper.utils.gb2312(book.title).then(function(gb2312_title) {
            fn(gb2312_title).then(inject).fail(dfd.reject);
        }).fail(dfd.reject);

        return dfd.promise();
    };
    var query_isbn = function() {
        var dfd = new $.Deferred();

        var fn = helper.utils.query_factory('isbn_f', book, publisher_cmp);
        fn(book.isbn13).fail(function() {
            fn(book.isbn10).then(inject).fail(dfd.reject);
        }).then(inject);

        return dfd.promise();
    };

    query_isbn().fail(function() {
        query_title().fail(inject);
    });
};

// /subject_search
helper.pages.subject_search = function() {
    var query_word = function() {
        return $('#inp-query').attr('value');
    };

    var inject = function(result) {
        var s = function(desc) {
            return helper.utils.tmpl(
                '<div class="mb20"><div class="hd">' +
                    '<h2>在广工图书馆&nbsp;·&nbsp;·&nbsp;·</h2>' +
                '</div>' +
                '<div class="bd"><p class="pl">{{desc}}</p></div>',
                {desc: desc}
            );
        };
        
        var l = function(url, content) {
            return helper.utils.tmpl(
                '&nbsp;<a target="_blank" href={{url}}>{{content}}</a>',
                {url: url, content: content}
            );
        };

        var r = $('#content .aside .mb20');
        var tmpl;

        if (result.foundc <= 0) {
            tmpl = s('没有找到哦');
        } else {
            tmpl = s(l(result.url, '找到 ' + result.foundc + ' 本类似的'));
        }
        $(tmpl).insertBefore(r);
 
    };

    var cmp = function(a, b) {return false;};

    var query_anywords = function() {
        var dfd = new $.Deferred();

        var fn = helper.utils.query_factory('anywords', null, cmp);
        helper.utils.gb2312(query_word()).then(function(name) {
            fn(name).then(inject).fail(dfd.reject);
        }).fail(dfd.reject);

        return dfd.promise();
    };

    query_anywords().fail(inject);
};


/* main */

helper.kick = function() {
    var type = /com\/([\w]+)\/*/.exec(document.URL);
    type = (type !== null) ? (type[1].trim()) : ('index');

    /* dispatch */
    if (type === 'subject') {
        helper.pages.subject();
    } else if (type === 'subject_search') {
        helper.pages.subject_search();
    } else {
        console.log(type);
    }
};

helper.kick();
