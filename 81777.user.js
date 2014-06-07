// togetterhelper.user.js
// version: beta 0.2.1
// ==UserScript==
// @name           TogetterHelper
// @namespace      togetterhelper.me.tamaki
// @description    Togetter（togetter.com）でまとめるつぶやきを集めるのを助けます．
// @include        http://twitter.com/*
// @include        http://search.twitter.com/*
// @include        http://togetter.com/*
// ==/UserScript==

(function() {
    var rules = {};
    rules.twitter = {};
    rules.twitter.status = /^(https?):\/\/twitter.com\/([\w|_]+)\/(statuses|status)\/([0-9]+)?(.*)$/i;
    rules.twitter.list   = /^(https?):\/\/twitter.com\/((.+)?)$/i;
    rules.twitter.search = /^(https?):\/\/search.twitter.com\/search\?(.+)$/i;

    rules.togetter = {};
    rules.togetter.edit = /^(https?):\/\/togetter.com\/create(.*?)$/i;

    console.log("http://twitter.com/#list/tamakiii/favorit".match(rules.twitter.list));

    var PREF = 'togetter-helper-js-';
    var DB = document.body;
    GM_addStyle(<><![CDATA[ .togetter-helper-js-default-action-button { display: inline-block; } .togetter-helper-js-default-action-button a { text-decoration: none; } ]]></>);
    GM_addStyle(<><![CDATA[ .togetter-helper-js-action-button { display: block; margin-top: 1px;} .togetter-helper-js-action-button a { display: block; width: 15px; height: 15px; background-image: url("http://s.twimg.com/a/1278960292/images/sprite-icons.png"); background-position: -80px 0; background-repeat: no-repeat;} .togetter-helper-js-action-button a:hover, .togetter-helper-js-action-button a:focus, .togetter-helper-js-action-button.togetter-helper-js-already-in-list a { background-position: -96px 0; outline:none;} #togetter-helper-js-dialog { background-image: url("http://s.twimg.com/a/1278960292/images/arr-inline-form.gif"); background-position: center top; background-repeat: no-repeat; padding-top: 7px; position: absolute; z-index:100;} .togetter-helper-js-dialog-inner { -moz-border-radius: 6px 6px 6px 6px; -moz-box-shadow: 0 2px 4px #ABABAB; background-color: #FFFFFF; border: 4px solid #C7C7C7; text-align: left;} .togetter-helper-js-btn { font-size: 13px; font-weight: bold; -moz-border-radius: 4px 4px 4px 4px; background: url("http://s.twimg.com/a/1278960292/images/buttons/bg-btn.gif") repeat-x scroll 0 0 #DDDDDD; border-color: #DDDDDD #DDDDDD #CCCCCC; border-style:solid; border-width:1px; color: #333333; cursor: pointer; font: 11px/14px "Lucida Grande",sans-serif; margin: 0; overflow: visible; padding: 4px 8px 5px; margin: 12px 10px; text-shadow:1px 1px 0 #FFFFFF; font-weight: bold;} .togetter-helper-js-btn:focus, .togetter-helper-js-btn:hover { background-position:0 -5px; cursor:pointer; outline: 0;} .togetter-helper-js-close { background-image: url("http://s.twimg.com/a/1278960292/images/retweet/retweet-x.png"); background-repeat: no-repeat; cursor: pointer; display: inline-block; height: 10px; margin: 8px 10px; width: 10px;} .togetter-helper-js-blue-btn { -moz-border-radius:4px 4px 4px 4px; background:url("http://s.twimg.com/a/1278960292/images/bg-btn-blue.png") repeat-x scroll 0 0 #3399dd !important; border:1px solid #3399DD; color:#FFFFFF; font-size:11px; font-weight:bold; margin: 12px 10px 8px 10px; padding:4px 10px 5px 10px; text-shadow:0 -1px 0 #3399DD; font:bold 11px "Lucida Grande",Arial,Sans-serif; line-height:20px !important;} .togetter-helper-js-blue-btn:focus, .togetter-helper-js-blue-btn:hover { } #togetter-helper-js-dialog select { margin: 12px 0 8px 10px; width: 155px; height: 27px; font-size: 1.23em;} #togetter-helper-js-dialog .togetter-helper-js-btn { margin-bottom: 8px;} #togetter-helper-js-dialog .togetter-helper-js-blue-btn { margin-top: 0; margin-bottom: 5px; width: 180px;} #togetter-helper-js-dialog .togetter-helper-js-close { margin: 8px 0 8px 6px; margin-bottom: 8px; width: 10px;} #togetter-helper-js-dialog.togetter-helper-js-new-collection-dialog { background-position: 300px top;} #togetter-helper-js-dialog.togetter-helper-js-new-collection-dialog input.togetter-helper-js-collection-name { margin: 10px 10px; font-size: 1.13em; width: 250px; height: 21px;} #togetter-helper-js-dialog.togetter-helper-js-new-collection-dialog button.togetter-helper-js-blue-btn { width: 75px; margin: 10px 8px 10px 0;} #togetter-helper-js-dialog.togetter-helper-js-new-collection-dialog p.togetter-helper-js-caption { display: inline-block; margin: 10px 8px 0 12px; padding-bottom: -12px; color: #444; font-size: 1.03em; font-weight: bold;} #togetter-helper-js-dialog.togetter-helper-js-new-collection-dialog span.togetter-helper-js-close { margin: 12px 14px 0 6px; float: right;} #togetter-helper-js-dialog.togetter-helper-js-new-collection-dialog p.togetter-helper-js-message { margin: 2px 13px 0 13px; padding-bottom: -12px; color: #e5361e;} #togetter-helper-js-dialog.togetter-helper-js-action-dialog p.togetter-helper-js-message { display: inlien; padding: 0 0 7px 13px; color: #e5361e; width: 220px; } ]]></>);

    var Store = {}; 
    function call(C, A) {
        return (typeof(C) == 'function') ? C(A) : false;
    }
    function generateDefaultActionButton(C, moi) {
        if (Store.defaultActionButton) {
            return Store.defaultActionButton;
        }

        var button = document.createElement('div');
        button.className = PREF + 'action-button';

        var link = document.createElement('a');
        link.innerHTML = '&nbsp;';
        link.href = '##';

        button.appendChild(link);

        var A = {};
        A.button = button;
        A.link   = link;

        call(C, A);

        if (moi) {
            button.addEventListener('click', function() {
                moi.onClickActionButton();
            }, false);
        }

        return button;
    }

    function generateDefaultDialog(C) {
        if (Store.generateDefaultDialog) {
            return Store.defaultDialog;
        }

        var dialog = document.createElement('div');
        dialog.id = PREF + 'dialog';

        var inner = document.createElement('div');
        inner.className = PREF + 'dialog-inner';

        dialog.appendChild(inner);

        var A = {};
        A.dialog = dialog;
        A.inner = inner;

        call(C, A);

        return dialog;
    }

    function generateDefaultActionDialog(callback, moi) {
        var select = document.createElement('select');
        select.className = PREF + 'select';
        select.name = 'collection';

        var collections = getCollectionKeys();
        var lastSelectedIndex = getValue('lastSelectedIndex');
        for (var key in collections) {
            var option = document.createElement('option');
            option.value = option.innerHTML = collections[key];

            if (lastSelectedIndex == key) {
                option.selected = true
            }

            select.appendChild(option);
        }

        select.addEventListener('change', function() {
            console.log(select.selectedIndex);
            setValue('lastSelectedIndex', select.selectedIndex);
        }, false);

        var addButton = document.createElement('button');
        addButton.className = PREF + 'blue-btn';
        addButton.value = addButton.innerHTML = 'Add This To Collection';

        var newButton = document.createElement('button');
        newButton.className = PREF + 'btn';
        newButton.value = newButton.innerHTML = 'New';
        
        var close = document.createElement('span');
        close.className = PREF + 'close';
        close.innerHTML = '&nbsp;';

        var message = document.createElement('p');
        message.className = PREF + 'message';

        var dialog = generateDefaultDialog(function(A) {
            A.dialog.className = PREF + 'action-dialog';

            A.inner.appendChild(select);
            A.inner.appendChild(newButton);
            A.inner.appendChild(document.createElement('br'));
            A.inner.appendChild(addButton);
            A.inner.appendChild(close);
            A.inner.appendChild(message);
            A.dialog.appendChild(A.inner);

            A.select = select;
            A.options = collections;
            A.addButton = addButton;
            A.newButton = newButton;
            A.closeButton = close;
            A.message = message;

            call(callback, A);

            if (moi) {
                close.addEventListener('click', function() {
                    moi.onClickCloseActionDialog();
                }, false);
                newButton.addEventListener('click', function() {
                    moi.onClickCreateCollectionButton();
                }, false);
                addButton.addEventListener('click', function() {
                    moi.onClickAddTweetButton();
                }, false);
            }
        });

        return dialog;
    }

    function generateDefaultCreateCollectionDialog(cb, moi) {
        var caption = document.createElement('p');
            caption.className = PREF + 'caption';
            caption.innerHTML = 'Create new Collection';

        var message = document.createElement('p');
            message.className = PREF + 'message';

        var close = document.createElement('span');
            close.className = PREF + 'close';
            close.innerHTML = '&nbsp;';

        var br = document.createElement('br');
            br.style.clear = 'both';

        var input = document.createElement('input');
            input.className = PREF + 'collection-name';
            input.value = '';

        var submit = document.createElement('button');
            submit.className = PREF + 'blue-btn';
            submit.value = submit.innerHTML = 'Create';

        var dialog = generateDefaultDialog(function(C) {
            C.dialog.className = PREF + 'new-collection-dialog';

            C.inner.appendChild(caption);
            C.inner.appendChild(close);
            C.inner.appendChild(message);
            C.inner.appendChild(input);
            C.inner.appendChild(submit);

            C.caption = caption;
            C.input   = input;
            C.submit  = submit;
            C.message = message;
            C.closeButton = close;

            call(cb, C);

            if (moi) {
                close.addEventListener('click', function() {
                    moi.onClickCloseCreateCollectionDialog();
                }, false);

                C.submit.addEventListener('click', function() {
                    var collectionKeys = getCollectionKeys();

                    if (collectionKeys.indexOf(input.value) >= 0) {
                        message.innerHTML = 'Collection of the same name already exists';
                    } else if (!input.value.match(/^[\w|\ |_|\-|@|#|&|!|?]+$/)) {
                        message.innerHTML = 'Collection name not valid(ALLOWED: atoZ,_-@#&!?)';
                    } else {
                        message.innerHTML = '';
                        DB.removeChild(C.dialog);
                        moi.onFinishingCreatingCollection();
                    }
                }, false);

            }
        });
       
        return dialog;
    }

    var monthNames = "jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec";
    var dayNames   = 'sun,mon,tue,wed,thu,fri,sat';

    function toTogetterDateFormat(dateString) {
        var reg = /^(\w{3}) (\w{3}) (\d{1,2}) (\d{1,4}) (\d{1,2}):(\d{1,2}):(\d{1,2}) GMT\+(\d{4}) \((\w+)\)$/i;
        if (m = dateString.match(reg)) {
            var month = (month = monthNames.indexOf(m[2].toLowerCase())/4+1) < 10 ? '0' + month : month;
            return m[4]+'-'+month+'-'+m[3]+' '+m[5]+':'+m[6]+':'+m[7];
        }

        var reg = /^(\w{3}) (\w{3}) (\d{1,2}) (\d{2}):(\d{2}):(\d{2}) \+(\d{4}) (\d{4})$/i;
        if (m = dateString.match(reg)) {
            var month = (month = monthNames.indexOf(m[2].toLowerCase())/4+1) < 10 ? '0' + month : month;
            return m[8]+'-'+month+'-'+m[3]+' '+m[4]+':'+m[5]+':'+m[6];
        }

        return NaN;
    }

    function generateTogetterActionItem(data) {
        var item = document.createElement('li');
        item.className = 'action_item';
        item.id = data.id;

        var box = document.createElement('div');
        box.className = 'list_box';
        box.id = data.id + '-' + (new Date).getTime();

            var listLeftWrap = document.createElement('div');
            listLeftWrap.className = 'list_left_wrap';

                var listImgWrap = document.createElement('div');
                listImgWrap.className = 'list_img_wrap';

                    var listImg = document.createElement('img');
                    listImg.src = data.user.profile_image_url;

                listImgWrap.appendChild(listImg);
            listLeftWrap.appendChild(listImgWrap);

            var listBody = document.createElement('div');
            listBody.className = 'list_body';

                var tweet = document.createElement('div');
                tweet.className = 'tweet';

                var text = data.text;
                text = text.replace(/(https?:\/\/[^ ]+)|(https?:\/\/[.]+)$/g,"<a>$1</a>");
                text = text.replace(/@([a-zA-Z0-9_]+)/g, "<a onclick=\"set_input(\"@$1\")\">@$1</a>");
                text = text.replace(/#([a-zA-Z0-9_]+)/g, "<a onclick=\"set_input(\"#$1\")\">#$1</a>");
                tweet.innerHTML = text;

                var status = document.createElement('div');
                status.className = 'status';

                    var date = document.createElement('span');
                    date.className = 'date';
                    date.innerHTML = toTogetterDateFormat(data.created_at);

                    var user = document.createElement('a');
                    user.className = 'user';
                    user.innerHTML = data.user.screen_name;
                    user.setAttribute('onclick', "set_input('" + data.user.screen_name + "')");

                    var del = document.createElement('a');
                    del.className = 'del';
                    del.innerHTML = '<img src="/img/batu.gif">';
                    del.setAttribute('onclick', 'del(' + data.id + ')');
                    console.log(data);

                status.appendChild(date);
                status.appendChild(user);
                status.appendChild(del);
            listBody.appendChild(tweet);
            listBody.appendChild(status);
        box.appendChild(listLeftWrap);
        box.appendChild(listBody);

        item.appendChild(box);

        return item;
    }

    function onFinishingCreatingCollection(A, B, C) {
        B.options.push(C.input.value);
        B.select.innerHTML = '';

        for (var key in B.options) {
            var option = document.createElement('option');
            option.value = option.innerHTML = B.options[key];
            B.select.appendChild(option);
        }

        option.selected = true;
        setCollection(C.input.value, '');

        B.message.innerHTML = 'done.';
    }

    function addTweet(select, uri) {
        if (typeof select == 'object' && select.tagName == 'SELECT') {
            var collectionName = select[select.selectedIndex].value;
        } else {
            var collectionName = select;
        }

        var collection = getCollection(collectionName);

        if (!uri.match(/(https?):\/\/twitter.com\/([\w|_]+?)\/(status|statuses)\/(\w+)/i)) {
            return error('Failed to get status ID');
        } else if (collection.indexOf(uri) != -1) {
            return error('this status_id have already been registerd');
        }

        collection.push(uri);
        setCollection(collectionName, collection);

        return true;
    }

    function error(errorMessage) {
        alert(errorMessage);
    }

    function getTweetFromTwitterByStatusUri(statusUri, callbackOnLoad, callbackOnError) {
        var reg = /^(https?):\/\/twitter.com\/([\w|_]+)?\/(status|statuses)\/([0-9]+)?(.*)$/i;
        if (matches = statusUri.match(reg)) {
            getTweetFromTwitterByStatusId(matches[4], callbackOnLoad, callbackOnError);
        }
    }

    function getTweetFromTwitterByStatusId(statusId, callbackOnLoad, callbackonError) {
        var uri = 'http://api.twitter.com/1/statuses/show/' + statusId + '.json';
        var userAgent = navigator.userAgent;

        GM_xmlhttpRequest({
            method: 'GET',
            url:    uri,
            headers: {
                'User-agent': userAgent + ' Greasemonkey',                
                'Accept': 'application/json',
            },
            onload: function(response) {
                if (typeof(callbackOnLoad) == 'function') {
                    callbackOnLoad(eval('(' + response.responseText + ')'), response);
                }
            },
            onError: function(response) {
                if (typeof(callbackOnError) == 'function') {
                    callbackOnError(eval('(' + response.responseText + ')'), response);
                }
            },
        });
    }

    function makeQueryString(vars) {
        var res = [];

        for (var key in vars) {
            res.push(key + '=' + vars[key]);
        }

        return res.join('&');
    } 

    function togetterApi(type, data, callback) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: '/api/' + type + '?' + makeQueryString(data),
            headers: {
                'User-agent': navigator.userAgent, 
                'Accept': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'http://togetter.com/create',
                // 'Cookie': '__utma=114886914.885048949.1271443277.1279474878.1279477313.84; __utmz=114886914.1279372637.77.37.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=VJ_JP; request=Y4brGjZmD2Dg1Gt4ETUuUmMImNHfcAvieAQL8noad_YXNHpFmCLIDUEb3vFq5BEazq3CWOrByJaqvSUEc9; access=AzdmAOhVBS70CsDYFe92IdIuKRJvv6pXFhUYSNEVD-25907331_ImZPwEIDvOXjojCYnFj97EiK6bX1Bncp3PpvHOeDhq; id=13370952_837118fc4e7af6710d992adb5e9674db; __utmb=114886914.30.10.1279477313; __utmc=114886914'
            },
            onload: function(response) {
                callback(response);
            },
        });
    }

    function setCollection(K, V) {
        var values = eval(GM_getValue('collectionList'));

        if (values == undefined) {
            values = new Object();
        }

        values[K] = V;
        GM_setValue('collectionList', values.toSource());
    }

    function getCollection(key) {
        var values = eval(GM_getValue('collectionList'));

        if (!values || !values[key]) {
            return new Array();
        } else {
            return eval(values[key]);
        }
    }

    function getCollectionKeys() {
        var values = eval(GM_getValue('collectionList'));
        var keyList = new Array();

        for (var key in values) {
            keyList.push(key);
        }

        return keyList;
    }
    function getValue(key) {
        return GM_getValue(key);
    }
    function setValue(key, value) {
        GM_setValue(key, value);
    }

    function getElementPosition(object, offsetLeft, offsetTop) {
        var origin = object;
        var left = offsetLeft ? offsetLeft : 0;
        var top  = offsetTop  ? offsetTop  : 0;

        if (object.offsetParent) {
            left += object.offsetLeft;
            top  += object.offsetTop;

            while (object = object.offsetParent) {
                left += (object.offsetLeft - object.scrollLeft + object.clientLeft);
                top  += (object.offsetTop  - object.scrollTop  + object.clientTop);
            }
        }

        var result = {};
        result.left   = left;
        result.top    = top;
        result.width  = origin.offsetWidth;
        result.height = origin.offsetHeight;

        return result;
    }

    function isOnThisDialog(dialog, E) {
        var pos = getElementPosition(dialog);
        var x = pos.left, y = pos.top;
        var w = pos.width, h = pos.height;
        var mx = E.pageX, my = E.pageY;

        if (E.layerX < 0 || E.layerY < 0) {
            return true;
        }

        return (mx<x||my<y||mx>x+w||my>y+h) ? false : true;
    }

    function initTogetterHelper() {
        var collectionList = eval(GM_getValue('collectionList'));

        if (collectionList == undefined) {
            initializeCollections();
        }        
    }

    function initializeCollections() {
        GM_setValue('collectionList', {list:'[]'}.toSource());
    }

    function dumpCollections() {
        console.log(GM_getValue('collectionList'));
    }


    var uri = location.href;

    if (uri.match(rules.twitter.status)) {
        var action = {
            start: function() {
                var moi = this;
                document.getElementsByClassName('actions')[0].appendChild(
                    generateDefaultActionButton(function(A) {
                        moi.A = A;
                    }, moi)
                );
            },

            onClickActionButton: function() {
                if (!this.B) {
                    var moi = this;
                    var position = getElementPosition(this.A.button);
                    var dialog = DB.appendChild(generateDefaultActionDialog(function(B) { moi.B = B; }, moi));
                    dialog.style.top  = (position.top + 20) + 'px';
                    dialog.style.left = (position.left - dialog.offsetWidth/2 + 7.5) + 'px';
                    this.B.addButton.focus();
                }
            },

            onClickCloseActionDialog: function() {
                DB.removeChild(this.B.dialog);
                this.B = null;
            },

            onClickCreateCollectionButton: function() {
                if (!this.C) {
                    var moi = this;
                    var position = getElementPosition(this.B.newButton);
                    var dialog = DB.appendChild(generateDefaultCreateCollectionDialog(function(C) { moi.C = C; }, moi));
                    dialog.style.top  = (position.top + 32) + 'px';
                    dialog.style.left = (position.left - dialog.offsetWidth/2 - 104) + 'px';
                }
            },

            onClickCloseCreateCollectionDialog: function() {
                DB.removeChild(this.C.dialog);
                this.C = null;
            },

            onFinishingCreatingCollection: function() {
                onFinishingCreatingCollection(this.A, this.B, this.C);
            },

            onClickAddTweetButton: function() {
                addTweet(this.B.select, DB.getElementsByClassName('entry-date')[0].href);
            }
        }
    } else if (uri.match(rules.twitter.list)) {
        var action = {
            start: function() {
                var timeline = document.getElementById('timeline').getElementsByClassName('hentry status');
                var moi = this;

                for (var key in timeline) {
                    if (typeof timeline[key] == 'object') {
                        var target = timeline[key].getElementsByClassName('actions')[0];
                        target.appendChild(generateDefaultActionButton(function(A) {
                            A.button.addEventListener('click', function() {
                                moi.onClickActionButton(A);
                            }, false);
                        }));
                    }
                }
            },

            onClickActionButton: function(A) {
                if (this.B) {
                    this.onClickCloseActionDialog();
                }

                var moi = this;
                var position = getElementPosition(A.button);
                var dialog = DB.appendChild(generateDefaultActionDialog(function(B) {
                                 moi.B = B;
                                 moi.B.A = A;
                             }, moi));
                dialog.style.top  = (position.top  + 20) + 'px';
                dialog.style.left = (position.left - dialog.offsetWidth/2 + 7.5) + 'px';
                this.B.addButton.focus();
            },

            onClickCloseActionDialog: function() {
                DB.removeChild(this.B.dialog);
                this.B = null;
            },

            onClickCreateCollectionButton: function() {
                if (this.C) {
                    this.onClickCloseCreateCollectionDialog();
                }

                var moi = this;
                var position = getElementPosition(this.B.newButton);
                var dialog = DB.appendChild(generateDefaultCreateCollectionDialog(function(C) { moi.C = C; }, moi));
                dialog.style.top  = (position.top + 32) + 'px';
                dialog.style.left = (position.left - dialog.offsetWidth/2 - 104) + 'px';
            },

            onClickCloseCreateCollectionDialog: function() {
                DB.removeChild(this.C.dialog);
                this.C = null;
            },
    
            onFinishingCreatingCollection: function() {
                onFinishingCreatingCollection(this.A, this.B, this.C);
            },

            onClickAddTweetButton: function() {
                var target = this.B.A.button.parentNode.parentNode.parentNode.getElementsByClassName('entry-date')[0];
                if (addTweet(this.B.select, target.href)) {
                    this.B.message.innerHTML = 'done.';
                    var moi = this;
                    setTimeout(function() {
                        moi.onClickCloseActionDialog();
                    }, 500);
                }
            }
        };
    } else if (uri.match(rules.twitter.search)) {
        console.log('search.twitter');
        var action = {
            start: function() {
                GM_addStyle(<><![CDATA[ .togetter-helper-js-action-button { display: inline-block; } .togetter-helper-js-action-button a { text-decoration: none; } ]]></>);

                var results = document.getElementById('results').getElementsByClassName('result');
                var moi = this;

                for (var key in results) {
                    if (typeof results[key] == 'object') {
                        var target = results[key].getElementsByClassName('info')[0];
                        target.appendChild(generateDefaultActionButton(function(A) {
                            A.button.addEventListener('click', function() {
                                moi.onClickActionButton(A);
                            }, false);
                        }));
                    }
                }
            },

            onClickActionButton: function(A) {
                if (this.B) { this.onClickCloseActionDialog(); }

                var moi = this;
                var position = getElementPosition(A.button);
                var dialog = DB.appendChild(generateDefaultActionDialog(function(B) {
                                 moi.B = B;
                                 moi.B.A = A;
                             }, moi));
                dialog.style.top  = (position.top  + 20) + 'px';
                dialog.style.left = (position.left - dialog.offsetWidth/2 + 7.5) + 'px';
                this.B.addButton.focus();
            },

            onClickCloseActionDialog: function() {
                DB.removeChild(this.B.dialog);
                this.B = null;
            },

            onClickCreateCollectionButton: function() {
                if (this.C) {
                    this.onClickCloseCreateCollectionDialog();
                }

                var moi = this;
                var position = getElementPosition(this.B.newButton);
                var dialog = DB.appendChild(generateDefaultCreateCollectionDialog(function(C) { moi.C = C; }, moi));
                dialog.style.top  = (position.top + 32) + 'px';
                dialog.style.left = (position.left - dialog.offsetWidth/2 - 104) + 'px';
            },

            onClickCloseCreateCollectionDialog: function() {
                DB.removeChild(this.C.dialog);
                this.C = null;
            },

            onClickCloseCreateCollectionDialog: function() {
                DB.removeChild(this.C.dialog);
                this.C = null;
            },
    
            onFinishingCreatingCollection: function() {
                onFinishingCreatingCollection(this.A, this.B, this.C);
            },

            onClickAddTweetButton: function() {
                var target = this.B.A.button.parentNode.getElementsByClassName('lit')[0];
                if (addTweet(this.B.select, target.href)) {
                    this.B.message.innerHTML = 'done.';
                    var moi = this;
                    setTimeout(function() {
                        moi.onClickCloseActionDialog();
                    }, 500);
                }
            }
        };

    } else if (uri.match(rules.togetter.edit)) {
        var action = {
            start: function() {
                var moi = this;
                var target = document.getElementsByClassName('action_box')[0]
                                     .getElementsByClassName('right')[0];

                var field = document.createElement('div');
                field.className = PREF + 'field';

                var select = document.createElement('select');
                var collections = getCollectionKeys();
                var lastSelectedIndex = getValue('lastSelectedIndex');
                for (var key in collections) {
                    var option = document.createElement('option');
                    option.value = option.innerHTML = collections[key];

                    select.appendChild(option);
                }

                var button = document.createElement('button');
                button.value = button.innerHTML = 'insert tweets';

                field.appendChild(select);
                field.appendChild(button);
                target.appendChild(field);

                this.A = {};
                this.A.select = select;
                this.A.button = button;

                this.A.button.addEventListener('click', function() {
                    moi.onClickInsertTweetsButton();
                }, false);
            },

            onClickInsertTweetsButton: function(A) {
                var collectionName = this.A.select.options[this.A.select.selectedIndex].value;
                var collection = getCollection(collectionName);

                if (collection) {
                    var choices = document.getElementById('choices');

                    for (var k in collection) {
                        console.log(collection[k]);
                        togetterApi('getStatus', {url:collection[k]}, function(response) {
                            choices.innerHTML += (response.responseText);
                        });
                    }
                }
            },
        };
    }
   

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

    var x = GM_registerMenuCommand('TogetterHelper - initialize collections', initializeCollections);
    GM_registerMenuCommand('TogetterHelper - dump collections', dumpCollections);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
    
    initTogetterHelper();

    if (action) { action.start(); }

})();
