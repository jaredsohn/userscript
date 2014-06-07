// {{{ === License and metadata ===  
// Douban Offline
// A Greasemonkey script allows you to use douban offline and backup your collections
// version 0.4
// Copyright (c) 2008 Wu Yuntao <http://blog.luliban.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Douban Offline
// @namespace       http://blog.luliban.com/
// @description     A Greasemonkey script allows you to use douban offline and backup your collections
// @include         http://www.douban.com/*
// @include         http://otho.douban.com/*
// @require         http://www.douban.com/js/jquery5685.js
// ==/UserScript==
//
// }}}

/* {{{ === Global variables ===  
 */
// Constants
const host = location.protocol + '//' + location.host;
const href = location.href;
const doubanTypeDict = {
    all: { id: 'all', name: '全部',
           regex: /^$/
    },
    subject: { id: 'subject', name: '条目',
               regex: /^http:\/\/www\.douban\.com\/subject\/.*/
    },
    group: { id: 'group', name: '小组',
             regex: /^http:\/\/www\.douban\.com\/group\/.*/
    },
    people: { id: 'people', name: '用户',
              regex: /^http:\/\/www\.douban\.com\/people\/.*/
    },
    note: { id: 'note', name: '日记',
            regex: /^http:\/\/www\.douban\.com\/note\/.*/
    },
    photo: { id: 'photo', name: '相册',
            regex: /^http:\/\/www\.douban\.com\/photos\/.*/
    },
    review: { id: 'review', name: '评论',
              regex: /^http:\/\/www\.douban\.com\/review\/.*/
    },
    doumail: { id: 'doumail', name: '豆邮',
            regex: /^http:\/\/www\.douban\.com\/doumail\/.*/
    }
};

const doubanOfflineStyle =
    "#douban-offline-status { margin: 0 20px 3px; border: 1px solid #d5f5d5; border-width: 0 2px 2px; -moz-border-radius-bottomright: 8px; -moz-border-radius-bottomleft: 8px; } " +
    "#douban-offline-status h2 { padding: 2px 20px; margin: 0; border-bottom: 2px solid #eef9eb; }" +
    "#douban-offline-type-list { text-align: left; display: block; float: left; width: 5%; margin: 5px 0 30px 15px; }" +
    "#douban-offline-type-list .current { font-weight: bold; }" +
    "#douban-offline-link-table { display: block; float: right; width: 92%; margin: 3px; }" +
    "#douban-offline-link-table th { font-weight: bold; text-align: center; background: #eef9eb }" +
    "#douban-offline-link-table th.id { width: 4%; }" +
    "#douban-offline-link-table th.title { width: 50%; }" +
    "#douban-offline-link-table th.url { width: 32%; }" +
    "#douban-offline-link-table th.type { width: 8%; }" +
    "#douban-offline-link-table th.delete { width: 4%; }" +
    "#douban-offline-link-table td.id { width: 4%; text-align: left; }" +
    "#douban-offline-link-table td.title { width: 50%; overflow-x: hidden; }" +
    "#douban-offline-link-table td.url { width: 32%; overflow-x: hidden; }" +
    "#douban-offline-link-table td.type { width: 8%; text-align: center; }" +
    "#douban-offline-link-table td.delete { width: 4%; text-align: center; }" +
    "#douban-offline-status span.button { cursor: pointer; color: #336699; text-decoration: underline; }" +
    "#douban-offline-capture, #douban-toggle-offline { display: block; float: right; margin: 3px; }" +
    "#douban-offline-paginator { float: right; margin: 5px; }" +
    "#douban-offline-paginator a { text-decorator: none; background: #fefffe; border: solid 1px #d5f5d5; color: #006600; }" +
    "#douban-offline-paginator a:hover { background: #d5f5d5; color: #006600; }" +
    "#douban-offline-paginator a, #douban-offline-paginator span { display: block; float: left; padding: 2px 5px; margin-right: 5px; margin-bottom: 3px; }" +
    "#douban-offline-paginator .current { font-weight: bold; background: #d5f5d5; color: #006600; border: solid 1px #d5f5d5; }" +
    "#douban-offline-paginator .prev { -moz-border-radius-bottomleft: 8px; -moz-border-radius-topleft: 8px; padding-left: 10px; }" +
    "#douban-offline-paginator .next { -moz-border-radius-bottomright: 8px; -moz-border-radius-topright: 8px; padding-right: 10px; }" +
    "#douban-offline-paginator .current.prev, #douban-offline-paginator .current.next { color: #ccc; background: #fefffe; border-color: #eeeeee; }" +
    ""
;

// Gears
var server = null;
var store = null;
var db = null;
var workerPoll = null;

// Browser
var bean = unsafeWindow.bean || { createCommand: function() {} };
var console = unsafeWindow.console || { log: function() {} };
/* }}} */

/* {{{ === Database ===  
 * TODO connect
 * TODO select
 * TODO where
 * TODO query
 * TODO insert
 * TODO update
 * TODO delete
 */
function SQL() {
}
$.extend(SQL.prototype, {
    createTable: function(name, fields) {
        var param = $.map(fields, function(n, i) {
            return n.name + ' ' + n.model;
        });
        param = param.join(', ');
        var sql = 'CREATE TABLE IF NOT EXISTS ' + name + ' (' + param + ')';
        return sql;
    }
});
// Singleton
$.sql = new SQL();

/* Offline databse
 */
function OfflineDatabase() {
    this.db = null;
    this.dbName = 'douban_offline';
    this.tableName = 'DoubanOffline';
    this.tableFields = [
        { name: 'Title',            model: 'VARCHAR(255)' },
        { name: 'URL',              model: 'VARCHAR(255)' },
        { name: 'Type',             model: 'VARCHAR(255)' },
        { name: 'TransactionID',    model: 'INT'          }
    ]
    this.init();
}
$.extend(OfflineDatabase.prototype, {
    /* Get or create the database
     */
    init: function() {
        try {
            this.db = unsafeWindow.google.gears.factory.create('beta.database');
            if (this.db) {
                var sql = $.sql.createTable(this.tableName, this.tableFields);
                this.db.open(this.dbName);
                this.db.execute(sql);
            }
        } catch(e) {
            console.log("Problem in initializing database: " + e.message);
        }
    },

    get: function(url) {
        try {
            var rs = this.db.execute('SELECT TransactionID, URL ' +
                                     'FROM ' + this.tableName +
                                     ' WHERE URL = ?',
                                     [url]);
            if (rs.isValidRow() && rs.field(0) != null) {
                return rs.field(0);
            } else {
                return false;
            }
        } catch(e) {
            console.log('Failed to query from database');
        } finally {
            rs.close();
        }
    },

    getByType: function(type, start, limit) {
        var results = []
        var start = start || 0;
        // TODO chuck away this ugly hack
        var limit = limit || 1000;
        try {
            if (type == 'all') {
                var rs = this.db.execute('SELECT * ' +
                                         'FROM ' + this.tableName +
                                         ' ORDER BY TransactionID DESC ' +
                                         'LIMIT ? ' +
                                         'OFFSET ?',
                                         [limit, start]);
            } else {
                var rs = this.db.execute('SELECT * ' +
                                         'FROM ' + this.tableName +
                                         ' WHERE Type = ? ' +
                                         'ORDER BY TransactionID DESC ' +
                                         'LIMIT ? ' +
                                         'OFFSET ?',
                                         [type, limit, start]);
            }
            while (rs.isValidRow()) {
                var result = { title: rs.field(0),
                               url: rs.field(1),
                               type: rs.field(2),
                               id: rs.field(3) };
                // console.log(result);
                results.push(result);
                rs.next();
            }
        } finally {
            rs.close();
        }
        return results;
    },

    /* Insert or update URL to database
     */
    save: function(title, url) {
        var id = this.get(url);
        if (id) {
            this.update(id, title);
        } else {
            this.insert(title, url);
        }
    },

    /* Insert offline URL to database
     */
    insert: function(title, url) {
        var maxId = 0;
        var rowId = null;
        var type = getType(url);
        try {
            var rs = this.db.execute('SELECT MAX(TransactionID) ' +
                                     'FROM ' + this.tableName);
            if (rs.isValidRow() && rs.field(0) != null) {
                maxId = rs.field(0);
            }
        } finally {
            rs.close()
        }
        maxId++;

        console.log("<[" + type + "] " + title + ": \"" + url +
                    "\"> saved in transaction ID: " + maxId);
        var rs = this.db.execute('INSERT INTO ' + this.tableName +
                                 ' VALUES (?, ?, ?, ?)',
                                 [title, url, type, maxId]);
        try {
            rs = this.db.execute('SELECT MAX(rowid) FROM ' + this.tableName);
            if (rs.isValidRow()) {
                rowId = rs.field(0);
            }
        } finally {
            rs.close();
        }
        return rowId;
    },

    update: function(title, url) {
        var rowId = null;
        try {
            var rs = this.db.execute('SELECT TransactionID, URL ' +
                                     'FROM ' + this.tableName +
                                     ' WHERE URL = ?',
                                     [url]);
            if (rs.isValidRow()) {
                rowId = rs.field(0);
                try {
                    var ss = this.db.execute('UPDATE DoubanOffline ' +
                                             'SET Title = ? ' +
                                             'WHERE TransactionID = ?',
                                             [title, rowId]);
                    return rowId;
                } catch(e) {
                    console.log('Failed to update record in Database');
                } finally {
                    ss.close();
                }
            }
        } finally {
            rs.close();
        }
    },

    delete: function(id) {
        // delete from store
        try {
            var rs = this.db.execute('SELECT TransactionID, URL FROM DoubanOffline WHERE TransactionID = ?', [id]);
            while (rs.isValidRow()) {
                store.remove(rs.field(1));
                rs.next();
            }
        } catch(e) {
            console.log('Failed to delete from the store, ID: ' + id);
        } finally {
            rs.close();
        }
        // delete from database
        try {
            var ss = this.db.execute('DELETE FROM DoubanOffline WHERE TransactionID = ?', [id]);
            console.log('Resource deleted, ID:' + id);
        } catch(e) {
            console.log('Failed to delete from the database, ID: ' + id);
        } finally {
            ss.close();
        }
    },
});

/* }}} */

/* {{{ === Store ===  
 */
function OfflineStore() {
    this.server = null;
    this.store = null;
    this.init();
}
$.extend(OfflineStore.prototype, {

    init: function() {
        try {
            this.server = unsafeWindow.google.gears.factory.create('beta.localserver');
            this.store = this.server.createStore('douban_offline');
        } catch(e) {
            console.log("Problem in initializing store: " + e.message);
        }
    },

    enable: function() {
        try {
            this.store.enabled = true;
        } catch(e) {
            console.log('Failed to enable store');
        }
    },

    disable: function() {
        try {
            this.store.enabled = false;
        } catch(e) {
            console.log('Failed to disable store');
        }
    },

    isCaptured: function(url) {
        return this.store.isCaptured(url);
    },

    isOffline: function() {
        return this.store.enabled == true;
    },

    capture: function(url) {
        try {
            this.store.capture(url, function(url, success, captureId) {
                console.log("URL: " + url + ", " + ( success ? "" : "not " ) +
                            "captured by ID " + captureId)
            });
        } catch(e) {
            console.log("Cannot find store: " + e.message);
        }
    },

    capturePage: function(title, url, force) {
        if (this.isCaptured(url) && force != true) {
            // is captured
            console.log("URL: " + url + " is already captured");
        } else {
            var urls = getLinks();
            db.save(title, url);
            initDoubanFrame(urls.doubanUrls);
            initOthoFrame(urls.othoUrls);
        }
    },

    remove: function(url) {
        this.store.remove(url);
    },
});

/* }}} */

/* {{{ === Initialization ===  
 * ``initOffline`` for most pages
 * ``initControl`` for the control iframe
 * ``initDoubanGears`` for the download iframe for www.douban.com
 * ``initOthoGears`` for the download iframe for otho.douban.com
 * ``initGears`` used by ``initDoubanGears`` and ``initOthoGears``
 */
function initOffline() {
    window.$G = new initGears();
    createOfflineStatus();
    addOfflineButton();
    if (!store.server) {
        triggerAllowDoubanDialog();
    } else {
        // disableStore();
        console.log('Douban offline initialized');
    }
}

function initControl() {
    var url = location.href.match(/(.*)#douban_offline_control$/)[1];
    window.$G = new initGears();
    if (!store.server) {
        triggerAllowDoubanDialog();
    } else {
        console.log("Start capturing page. URL: " + url);
        store.capturePage(document.title, url);
    }
    console.log('Douban control initialized');
}

function initDoubanGears() {
    window.$G = new initGears();
    if (!store.server) {
        triggerAllowDoubanDialog();
    } else {
        console.log('Douban gears initialized');
        var doubanUrls = location.href.split('#')[1];
        var urls = doubanUrls.split('|');
        store.capture(urls);
    }
}

function initOthoGears() {
    window.$G = new initGears();
    if (!store.server) {
        triggerAllowOthoDialog();
    } else {
        console.log('Otho gears initialized');
        var othoUrls = location.href.split('#')[1];
        var urls = othoUrls.split("|");
        store.capture(urls);
    }
}

function initGears() {
    if (!unsafeWindow.google) unsafeWindow.google = {};
    if (!unsafeWindow.google.gears) {
        try {
            unsafeWindow.google.gears = {};
            unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
            // unsafeWindow.google.gears = { factory: new GearsFactory() };
        } catch(e) {
            alert("Problem in initializing Gears. Please make sure you've installed Gears: " + e.message)
        }
    }
    try {
        store = new OfflineStore();
        db = new OfflineDatabase();
    } catch(e) {
        console.log("Problem in initializing database: " + e.message);
    }
    return unsafeWindow.google.gears;
}

/* }}} */

/* {{{ === Page check ===  
 * ``isControl`` for the control iframe
 * ``isDoubanGears`` for the download iframe for www.douban.com
 * ``isOthoGears`` for the download iframe for otho.douban.com
 */
/* Check if the current frame is control
 */
function isControl(url) {
    return /www\.douban\.com.*#douban_offline_control$/.test(url);
}

/* Check if the current page is www.douban.com origin
 */
function isDouban(url) {
    return /www\.douban\.com.*#douban_offline_download$/.test(url);
}

function isOtho(url) {
    return /otho\.douban\.com.*#douban_offline_download$/.test(url);
}
/* }}} */

/* {{{ === Permission dialog trigger ===  
 * ``triggerAllowDoubanDialog`` is called if the user hasn't allowed
 * www.douban.com to use Gears
 * ``triggerAllowOthoDialog`` is called if the user hasn't allowed
 * otho.douban.com to use Gears
 */
function triggerAllowDoubanDialog() {
    window.addEventListener("load", function() {
        $G.factory.create('beta.localserver', '1.0');
        location.href = location.href;
        return false;
    }, true);
}

function triggerAllowOthoDialog() {
    window.addEventListener("load", function() {
        $G.factory.create('beta.localserver', '1.0');
        return false;
    }, true);
}
/* }}} */

/* {{{ === Iframe initialization ===  
/* ``initControlFrame`` initializes iframe for control downloads
/* ``initDoubanFrame`` initializes iframe for downloads on www.douban.com
/* ``initOthoFrame`` initializes iframe for downloads on otho.douban.com
 * ``initFrame`` used by ``initDoubanFrame`` and ``initOthoFrame``
 */
function initControlFrame(doubanUrl) {
    return initFrame('offline-control', doubanUrl);
}

function initDoubanFrame(downloadUrls) {
    return initFrame('douban-offline', 'http://www.douban.com/douban_offline/',
                     downloadUrls);
}

function initOthoFrame(downloadUrls) {
    return initFrame('otho-offline', 'http://otho.douban.com/douban_offline/',
                     downloadUrls);
}

function initFrame(frameId, frameUrl, downloadUrls) {
    if (downloadUrls && typeof downloadUrls != 'string')
        downloadUrls = downloadUrls.join('|');
    var iFrame = $('#' + frameId);
    if (!iFrame.length) {
        iFrame = $('<iframe></iframe>');
        iFrame.attr('id', frameId).attr('name', frameId)
              .css({ 'display': 'none' }).appendTo($('body'));
    }
    var src = frameUrl + ( downloadUrls ? '#' + downloadUrls + '#douban_offline_download' : '' );
    iFrame.attr('src', src);
    // console.log(iFrame.attr('src'));
    return iFrame;
}

/* }}} */

/* {{{ === Link parser ===  
 */
var cssImageUrls = [
    '/pics/discover.jpg',
    '/pics/topicbar.gif',
    '/pics/headnavbot.gif',
    '/pics/headnavback.gif',
    '/pics/search.gif',
    '/pics/graybutt.gif',
    '/pics/redbutt.gif',
    '/pics/zbar.gif',
    '/pics/wztab.gif',
    '/pics/ibox.gif',
    '/pics/tablev.gif',
    '/pics/tableh.gif',
    '/pics/quotel.gif',
    '/pics/quoter.gif',
    '/pics/listdot.gif',
    '/pics/stars.gif',
    '/pics/arrowright.gif',
    '/pics/topicgrey.gif',
    '/pics/albumback.gif',
    '/pics/albumback_s.gif',
    '/pics/video_overlay.png',
    '/pics/feed1.png',
    '/pics/collect_back.png'
];
for (var i = 0, len = cssImageUrls.length; i < len; i++) {
    cssImageUrls[i] = 'http://www.douban.com' + cssImageUrls[i];
}

function getLinks() {
    var doubanUrls = [ location.href ];
    var othoUrls = [];

    doubanUrls = doubanUrls.concat(cssImageUrls, getStyleLinks(), getScriptLinks());
    $.each(getImageLinks(), function() {
        if (/www\.douban\.com/.test(this)) doubanUrls.push(this.toString());
        else othoUrls.push(this.toString());
    });
    return { 'doubanUrls': doubanUrls, 'othoUrls': othoUrls }
}

function getImageLinks() {
    // const faviconUrl = 'http://lotho.douban.com/favicon.ico';
    const reFullPath = /^http:\/\/otho\.douban\.com\/.*/;
    const reAbsolutePath = /^\/.*\.(jpg|gif|png)$/;

    var imgTags = $('img');
    var imgUrls = [];

    $.each(imgTags, function() {
        var imgSrc = $(this).attr('src');
        if (reFullPath.test(imgSrc)) {
            push(imgSrc, imgUrls);
        } else if (reAbsolutePath.test(imgSrc)) {
            push(host + imgSrc, imgUrls);
        }
    });
    // imgUrls = imgUrls.join('|');
    return imgUrls;
}

/* Creates an array of all CSS file URLs on the page that will be captured
 */
function getStyleLinks() {
    const reAbsolutePath = /^\/.*\.css$/;

    var cssTags = $('link[rel="stylesheet"]');
    var cssUrls = [];

    $.each(cssTags, function() {
        var cssHref = $(this).attr('href');
        if (reAbsolutePath.test(cssHref)) {
            push(host + cssHref, cssUrls);
        }
    });
    // cssUrls = cssUrls.join('|');
    return cssUrls;
}

/* Creates an array of all Javascript file URLs on the page that will be captured
 */
function getScriptLinks() {
    const reAbsolutePath = /^\/.*\.js$/;

    var jsTags = $('script[src]');
    var jsUrls = [];

    $.each(jsTags, function() {
        var jsSrc = $(this).attr('src');
        if (reAbsolutePath.test(jsSrc)) {
            push(host + jsSrc, jsUrls);
        }
    });
    // jsUrls = jsUrls.join('|');
    return jsUrls;
}
/* }}} */

/* {{{ === User interface ===  
 */
// TODO set itemsPerPage by user
var itemsPerPage = 10;

function addOfflineButton() {
    var button = $('<a id="douban-offline-button">离线</a>');
    button.css({ 'cursor': 'pointer' });
    button.click(function() {
        toggleOfflineStatus();
        return false;
    });
    $('#status a:last').after(button);
}

function toggleOfflineStatus() {
    var offlineStatus = $('#douban-offline-status');
    offlineStatus.slideToggle('normal');
}

function hideOfflineStatus() {
    $('#douban-offline-status').slideUp('normal');
}

function createOfflineStatus() {
    var style = $('<style type="text/css"></style');
    var wrapper = $('<div id="douban-offline-status"></div>');
    var title = $('<h2>豆瓣离线</h2>');
    var insideWrapper = $('<div></div>');
    var clearWrapper = $('<div class="clear"></div>');
    var captureButton = new drawCaptureButton();
    var toggleOfflineButton = new drawToggleOfflineButton();
    var typeListWrapper = new drawTypeList();
    var linkTableWrapper = new drawLinkTable('all');
    var paginatorWrapper = new drawPaginator('all');

    insideWrapper.append(typeListWrapper).append(linkTableWrapper)
                 .append('<div class="clear"></div>').append(paginatorWrapper)
                 .append('<div class="clear"></div>');
    wrapper.append(captureButton).append(toggleOfflineButton)
           .append(title).append(insideWrapper)
           .insertAfter($('#status')).hide();
    style.html(doubanOfflineStyle).insertBefore(wrapper);
}

function drawToggleOfflineButton() {
    var button = $('<span id="douban-toggle-offline" class="button"></span>');
    if (store.isOffline()) {
        button.html('在线浏览');
    } else {
        button.html('离线浏览');
    }
    button.click(function() {
        store.isOffline() ? store.disable() : store.enable();
        location.href = location.href;
    });
    return button;
}

function drawCaptureButton() {
    var force = store.isCaptured(location.href.toString());
    var button = $('<span id="douban-offline-capture" class="button"></span>');
    if (force) button.html('更新此页面');
    else button.html('收藏此页面');
    button.click(function() {
        store.capturePage(document.title, location.href.toString(), force);
    });
    return button
}

function drawTypeList() {
    var list = $('<ul id="douban-offline-type-list"></ul>');
    $.each(doubanTypeDict, function() {
        var type = this.id;
        var item = $('<li></li>');
        var link = $('<span></span>');
        link.attr('id', 'douban-offline-type-' + type)
            .attr('class', 'button ' + (type == 'all' ? 'current' : ''))
            .html(this.name);
        link.click(function() {
            drawLinkTable(type, 0);
            drawPaginator(type, 0);
            $('#douban-offline-type-list span.current').removeClass('current');
            $(this).addClass('current');
        });
        item.append(link).appendTo(list);
    });
    return list;
}

function drawLinkTable(type, currentPage) {
    var start = currentPage * itemsPerPage;
    var results = db.getByType(type, start, itemsPerPage);
    var table = $('#douban-offline-link-table');
    if (!table.length) {
        var table = $('<table id="douban-offline-link-table"><tbody></tbody></table>');
        table.append($('<tr><th class="id">ID</th><th class="title">标题</th><th class="url">链接</th><th class="type">类别</th><th class="delete">删除</th></tr>'));
    }
    table.find('tr:gt(0)').remove();
    $.each(results, function() {
        var itemId = this.id;
        var itemType = this.type;
        var item = $('<tr id="douban-offline-link-' + itemId + '"></tr>');
        item.append('<td class="id">' + itemId + '</td>')
            .append('<td class="title">' + this.title + '</td>')
            .append('<td class="url"><a href="' + this.url + '">' + this.url + '</a></td>')
            .append('<td class="type">' + doubanTypeDict[itemType].name + '</td>')
            .append('<td class="delete"><span class="button douban-offline-delete">删除</span></td>')
            .attr('id', 'douban-offline-' + itemId)
            .attr('class', 'douban-offline-link')
            .appendTo(table);

        var deleteButton = item.find('span.douban-offline-delete');
        deleteButton.click(function() {
            db.delete(itemId);
            drawLinkTable(type);
        });
    });
    table.find('tr:even').css({ 'background': '#f4fff1' });
    return table;
}

function drawPaginator(type, currentPage, itemsPerPage) {
    totalItems = db.getByType(type).length;
    var paginator = $('#douban-offline-paginator');
    if (!paginator.length) {
        var paginator = $('<div></div>');
        paginator.attr('id', 'douban-offline-paginator');
    }
    var paginatorClick = function(pageId) {
        drawLinkTable(type, pageId)
        return false;
    };
    $(paginator).pagination(totalItems, {
        currentPage: currentPage,
        items_per_page: itemsPerPage,
        num_display_entries: 8,
        num_edge_entries: 2,
        prev_text: "前一页",
        next_text: "后一页",
        link_to: "#page-__id__",
        // prev_show_always: false,
        // next_show_always: false,
        callback: paginatorClick
    });
    return paginator;
}
/* }}} */

/* {{{ === General functions ===  
 */
function getType(url) {
    var type = 'all'
    $.each(doubanTypeDict, function() {
        if (this.regex.test(url)) type = this.id;
    });
    return type;
}

function push(item, array) {
    if ($.inArray(item, array) == -1) array.push(item);
}
/* }}} */

/* {{{ === Douban helper command ===  
 */
bean.createCommand({
    scope: true,
    name : 'write',
    shortcut : 'w',
    description : '收藏离线页面',
    hideConsoleAfterExecute : false,
    execute : function () {
        store.capturePage(document.title, location.href.toString(), true);
    }
});
/* }}} */

/* {{{ === Main entry ===  
 */
$(function() {
    var url = location.href;
    if (isControl(url)) initControl();
    else if (isDouban(url)) initDoubanGears();
    else if (isOtho(url)) initOthoGears();
    else initOffline();
    tests();
});
/* }}} */

/* {{{ === Tests ===  
 */
function tests() {
}
/* }}} */

/* {{{ === jQuery pagination plugin ===  
 * This jQuery plugin is not under GPLv3 license.
 *
 * This jQuery plugin displays pagination links inside the selected elements.
 *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.1
 * @param {int} maxentries Number of entries to paginate
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
(function($) {
$.fn.pagination = function(maxentries, opts){
    opts = $.extend({
        items_per_page:10,
        num_display_entries:10,
        current_page:0,
        num_edge_entries:0,
        link_to:"#",
        prev_text:"Prev",
        next_text:"Next",
        ellipse_text:"...",
        prev_show_always:true,
        next_show_always:true,
        callback:function(){return false;}
    },opts||{});

    return this.each(function() {
        /**
         * Calculate the maximum number of pages
         */
        function numPages() {
            return Math.ceil(maxentries/opts.items_per_page);
        }

        /**
         * Calculate start and end point of pagination links depending on 
         * current_page and num_display_entries.
         * @return {Array}
         */
        function getInterval()  {
            var ne_half = Math.ceil(opts.num_display_entries/2);
            var np = numPages();
            var upper_limit = np-opts.num_display_entries;
            var start = current_page>ne_half?Math.max(Math.min(current_page-ne_half, upper_limit), 0):0;
            var end = current_page>ne_half?Math.min(current_page+ne_half, np):Math.min(opts.num_display_entries, np);
            return [start,end];
        }

        /**
         * This is the event handling function for the pagination links.
         * @param {int} page_id The new page number
         */
        function pageSelected(page_id, evt){
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(page_id, panel);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation();
                }
                else {
                    evt.cancelBubble = true;
                }
            }
            return continuePropagation;
        }

        /**
         * This function inserts the pagination links into the container element
         */
        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            // This helper function returns a handler function that calls pageSelected with the right page_id
            var getClickHandler = function(page_id) {
                return function(evt){ return pageSelected(page_id,evt); }
            }
            // Helper function for generating a single link (or a span tag if it'S the current page)
            var appendItem = function(page_id, appendopts){
                page_id = page_id<0?0:(page_id<np?page_id:np-1); // Normalize page id to sane value
                appendopts = $.extend({text:page_id+1, classes:""}, appendopts||{});
                if(page_id == current_page){
                    var lnk = $("<span class='current'>"+(appendopts.text)+"</span>");
                }
                else
                {
                    var lnk = $("<a>"+(appendopts.text)+"</a>")
                        .bind("click", getClickHandler(page_id))
                        .attr('href', opts.link_to.replace(/__id__/,page_id));
                }
                if(appendopts.classes){lnk.addClass(appendopts.classes);}
                panel.append(lnk);
            }
            // Generate "Previous"-Link
            if(opts.prev_text && (current_page > 0 || opts.prev_show_always)){
                appendItem(current_page-1,{text:opts.prev_text, classes:"prev"});
            }
            // Generate starting points
            if (interval[0] > 0 && opts.num_edge_entries > 0)
            {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for(var i=0; i<end; i++) {
                    appendItem(i);
                }
                if(opts.num_edge_entries < interval[0] && opts.ellipse_text)
                {
                    $("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
                }
            }
            // Generate interval links
            for(var i=interval[0]; i<interval[1]; i++) {
                appendItem(i);
            }
            // Generate ending points
            if (interval[1] < np && opts.num_edge_entries > 0)
            {
                if(np-opts.num_edge_entries > interval[1]&& opts.ellipse_text)
                {
                    $("<span>"+opts.ellipse_text+"</span>").appendTo(panel);
                }
                var begin = Math.max(np-opts.num_edge_entries, interval[1]);
                for(var i=begin; i<np; i++) {
                    appendItem(i);
                }

            }
            // Generate "Next"-Link
            if(opts.next_text && (current_page < np-1 || opts.next_show_always)){
                appendItem(current_page+1,{text:opts.next_text, classes:"next"});
            }
        }

        // Extract current_page from options
        var current_page = opts.current_page;
        // Create a sane value for maxentries and items_per_page
        maxentries = (!maxentries || maxentries < 0)?1:maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0)?1:opts.items_per_page;
        // Store DOM element for easy access from all inner functions
        var panel = $(this);
        // Attach control functions to the DOM element 
        this.selectPage = function(page_id){ pageSelected(page_id);}
        this.prevPage = function(){
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true;
            }
            else {
                return false;
            }
        }
        this.nextPage = function(){
            if(current_page < numPages()-1) {
                pageSelected(current_page+1);
                return true;
            }
            else {
                return false;
            }
        }
        // When all initialisation is done, draw the links
        drawLinks();
    });
}
})(jQuery);
/* }}} */

// vim: set foldmethod=marker
