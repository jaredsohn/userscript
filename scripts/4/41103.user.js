// ==UserScript==
// @name           tabundle states
// @namespace      http://relucks.org/
// @description    A userscript for tabundle.
// @include        file://*
// ==/UserScript==
//
// auther: swdyh http://d.hatena.ne.jp/swdyh/
// version: 0.0.1 2009-01-24T08:23:18+09:00
// license: The MIT License
//
(function() {
    var routes = [{ id: 'tabundle_index', func: indexPage },
                  { id: 'tabundle_list', func: listPage }]
    for each (var i in routes) {
        if (document.getElementById(i['id'])) {
            var states = ['normal', 'important', 'trivial']
            var urls = new GM_Store('urls')
            var counts = new GM_Store('counts')
            addStyle()
            i['func']()
            break
        }
    }
    return

    function indexPage() {
        var list = $X('id("tabundle_index")/li')
        list.forEach(function(i) {
            var url = $X('.//a', i)[0].href
            if (url) {
                var c = counts.get(url.split('/').slice(-1)[0])
                if (c) {
                    i.appendChild(createCounter(c, states))
                }
            }
        })
    }

    function listPage() {
        var list = $X('id("tabundle_list")/li')
        list.forEach(function(i) {
            var url = $X('.//a', i)[0].href
            if (urls.get(url)) {
                i.className = urls.get(url)
            }
        })
        display_count(list)
        var click = function(event) {
            var t = event.target
            if (t.tagName == 'LI') {
                var state = states.indexOf(t.className)
                state = state == -1 ? 0 : state
                state = (state + 1) % states.length
                t.className = states[state]
                var url = $X('.//a', t)[0].href
                urls.set(url, states[state])
            }
            setTimeout(display_count, 0, list)
        }
        window.addEventListener('click', click, false)
    }

    function display_count(list) {
        var c = {}
        list.forEach(function(i) {
            var k = i.className || 'normal'
            c[k] = c[k] ? c[k] + 1 : 1
        })
        var fileName = location.href.split('/').slice(-1)[0]
        counts.set(fileName, c)
        var counter = createCounter(c, states)
        var tl = document.getElementById('tabundle_list')
        for each(var i in tl.parentNode.childNodes) {
            if (i.className == 'counter') {
                i.parentNode.removeChild(i)
                break
            }
        }
        tl.parentNode.insertBefore(counter, tl)
    }

    function createCounter(count, states) {
        default xml namespace = "http://www.w3.org/1999/xhtml"
        var counter = <span class="counter"></span>
        states.forEach(function(i) {
            counter.appendChild(<span class={'count ' + i}>{count[i] || 0}</span>)
        })
        return document.importNode(new DOMParser().parseFromString(counter.toXMLString(), "application/xml").documentElement, true)
    }

    function addStyle() {
        GM_addStyle(<><![CDATA[

li.trivial {
  opacity: 0.2;
  background-color: ddd;
}
li.important {
  background-color: #ff9;
}
li.normal {
  background-color: #fff;
}

.counter {
  margin: 0 0 0 10px;
}
.counter > span {
  padding: 3px 5px;
  margin: 0 0 0 5px;
  color: #fff;
}
.counter > span.trivial {
  background-color: ccc;
}
.counter > span.important {
  background-color: #ff9;
  color: #999;
}
.counter > span.normal {
  background-color: #0af;
}
]]></>)
    }

    // wrap GM_setValue and GM_getValue
    function GM_Store(key) {
        this.key = key
        this.value = eval(GM_getValue(key)) || {}
        this.get = function(k) {
            return this.value[k]
        }
        this.set = function(k, v) {
            this.value[k] = v
            GM_setValue(this.key, uneval(this.value))
            return v
        }
    }

    // http://gist.github.com/3242
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
})()
