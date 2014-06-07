// ==UserScript==
// @name            Tieba.Traitor
// @description     A helper library for manipulating something before posting
// @namespace       me@itianda.com
// @include         http://tieba.baidu.com/*
// @version         1.1.4
// @grant           none
// @updateURL       https://userscripts.org/scripts/source/180331.meta.js
// @downloadURL     https://userscripts.org/scripts/source/180331.user.js
// ==/UserScript==


(function(undefined) {
    window.__traitor__ = $.extend(window.__traitor__ || {}, new function() {
        var _this = this;
        var traitor = function() {return window.__traitor__ || this};
        traitor().actions = traitor().actions || $.Callbacks();
        setTimeout(function() {
            $(document).ajaxSend(function(event, jqXHR, ajaxOptions) {
                if(ajaxOptions.type.toLowerCase() != 'post') {
                    return;
                }
                if(typeof ajaxOptions.url != 'string' || typeof ajaxOptions.data != 'string') {
                    return;
                }
                var data = {};
                $.each(ajaxOptions.data.replace(/\+/g, ' ').split('&'), function(i, e) {
                    var kv = $.map(e.split('='), decodeURIComponent);
                    var k = $.trim(kv[0]), v = $.trim(kv[1]);
                    data[k] = v;
                });
                var post_type;
                var url = $.trim(ajaxOptions.url.toLowerCase());
                if(url.indexOf('/f/commit/post/add') != -1) {
                    if(data.hasOwnProperty('repostid')) {
                        post_type = 'repost';
                    } else {
                        post_type = 'reply';
                    }
                } else if(url.indexOf('/f/commit/thread/add') != -1) {
                    post_type = 'topic';
                }
                if(post_type !== undefined) {
                    var environment = {
                        post_type: function() {
                            return post_type;
                        },
                        data: $.extend(true, {}, data),
                        raw_data: function() {
                            return data;
                        },
                        title: function() {
                            if(arguments.length) {
                                this.data.title = arguments[0];
                            }
                            return this.data.title;
                        },
                        content: function() {
                            if(arguments.length) {
                                this.data.content = arguments[0];
                            }
                            return this.data.content;
                        },
                        kw: function() {
                            if(arguments.length) {
                                this.data.kw = arguments[0];
                            }
                            return this.data.kw;
                        },
                        fid: function() {
                            if(arguments.length) {
                                this.data.fid = parseInt(arguments[0], 10);
                            }
                            return parseInt(this.data.fid, 10);
                        },
                        tid: function() {
                            if(arguments.length) {
                                this.data.tid = parseInt(arguments[0], 10);
                            }
                            return parseInt(this.data.tid, 10);
                        }
                    };
                    traitor().actions.fire(environment);
                    ajaxOptions.data = $.param(environment.data);
                }
            });
        },
        0);
    });
}).apply(window);