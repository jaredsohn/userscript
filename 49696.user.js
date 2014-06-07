// ==UserScript==
// @name           Check Pad Incremental Search
// @namespace      http://d.hatena.ne.jp/bannyan/
// @description    checkpad のタスクをキーワードで絞り込む
// @include        http://www.checkpad.jp/?mode=pjt&act=detail&id=*
// using [ simple version of $X   ] (c) id:os0x
//       [ update                 ] copied from LDR - Signal  (c) id:brazil
//       [ addAfter               ] copied from LDR Feed Info (c) kuy
// Cheers!!
// ==/UserScript==
// @version        0.0.2
// @history        [2008-05-21] 0.0.1 first version
// @history        [2008-05-21] 0.0.2 change input CSS as fixed

GM_addStyle(<><![CDATA[

    #grep {
        position              : fixed;
        top                   : 5px;
        right                 : 5px;
        -webkit-border-radius : 7px;
        -moz-border-radius    : 7px;
        color                 : #19425d;
        border                : 5px #dff24b solid;
        filter                : alpha(style=0, opacity=75);
        -moz-opacity          : 0.75;
    }

    #grep:hover {
        border-color : #3586c1;
    }

]]></>);

(function(w) {

    var CFG = {
        long_timeout  : 2500,
        short_timeout : 600
    };

    var CPIS = function() {};
    var $    = w.$;
    var functions = [
        'pjt_copy',
        'ms_edit_notyet',
        'ms_add',
        'ms_finish',
        'ms_unfinish',
        'ms_del_done',
        'ms_del_notyet'
    ];

    CPIS.prototype = {

        grep : function() {
            try {
                this.regex = new RegExp($('grep').value, "i");
                var notyet = $X("//div[@id='ms_box_notyet']//div[@class='citem_editable']");
                var done   = $X("//div[@id='ms_box_done']//div[@class='citem']");
                this._setStyle(notyet.concat(done));
            } catch(e) {
                /** 正規表現の文法エラーは無視する */
            }
        },

        _setStyle : function(elements) {
            var length = elements.length;
            for (var i = 0; i < length; i++) {
                var element = elements[i].childNodes[1];
                var text = (typeof element.textContent != "undefined") ? element.textContent : element.innerText;
                elements[i].parentNode.style.display = (text.match(this.regex)) ? "inline" : "none";
            }
        }

    }

    CPIS.init = function () {

        var cpis = new CPIS();

        w.document.body
            .appendChild(
                update(document.createElement('input'), {
                    'type': 'text',
                    'id'  : 'grep'
                })
            )
        .addEventListener('keyup', function() {
            cpis.grep();
        }, false);

        functions.forEach(function (fn) {
            addAfter(w, fn, function() {
                var timeout = (fn === 'ms_del_notyet') ? CFG.long_timeout : CFG.short_timeout;
                setTimeout(function() { return cpis.grep(); }, timeout);
            })
        });

    }

    CPIS.init();

    function update(obj, params) {
        if(obj.setAttribute){
            for(var key in params)
                obj.setAttribute(key, params[key]);
        } else {
            for(var key in params)
                obj[key] = params[key];
        }
        return obj;
    }

    function addAfter(target, name, after) {
        var original = target[name];
        target[name] = function() {
            var ret = original.apply(this, arguments);
            after.apply(this, arguments);
            return ret;
        }
    }

    function $X (exp, context) {
        context || (context = document);
        var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
            return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
                context.namespaceURI || document.documentElement.namespaceURI || "";
        });

        var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
            switch (result.resultType) {
                case XPathResult.STRING_TYPE : return result.stringValue;
                case XPathResult.NUMBER_TYPE : return result.numberValue;
                case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
                case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
                    // not ensure the order.
                    var ret = [], i = null;
                    while (i = result.iterateNext()) ret.push(i);
                    return ret;
            }
        return null;
    }

}) (this.unsafeWindow || this);
