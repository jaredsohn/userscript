// ==UserScript==
// @name          threadic helper
// @namespace     threadic.net
// @author        Hasegawa Sayuri
// @version       2010-07-20
// @include       http://threadic.com/*/read.cgi/*
// @include       https://threadic.com/*/read.cgi/*
// @include       http://*.threadic.com/*/read.cgi/*
// @include       https://*.threadic.com/*/read.cgi/*
// ==/UserScript==
//
// threadic helper
// Copyright (c) 2010 Hasegawa Sayuri
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function(){

var VERSION = '2010-07-20';

function tocolor(id, min, max) {
    if (id == 'ID:???') { // special case: administrator
        return 'rgb(' + min + ',' + min + ',' + min + ')';
    }

    var hash = 7777777, len = id.length;
    for (var i = 0; i < len; ++i) {
        hash = ((hash * 31) ^ id.charCodeAt(i)) & 0xffffff;
    }
    var mag = (max - min) / 255;
    return 'rgb(' + ((min + (hash & 255) * mag) | 0) + ',' +
                    ((min + ((hash >> 8) & 255) * mag) | 0) + ',' +
                    ((min + (hash >> 16) * mag) | 0) + ')';
}

function foreach(arr, iter) {
    for (var i = 0, len = arr.length; i < len; ++i) iter(arr[i], i);
}

function foreachtags(n, name, iter) {
    foreach(n.getElementsByTagName(name), iter);
}

function istagname(n, name) {
    return (n.nodeType == n.ELEMENT_NODE &&
            n.tagName.toLowerCase() == name.toLowerCase());
}

function clearchildren(n) {
    while (n.lastChild) n.removeChild(n.lastChild);
};

function flatten(n) {
    var result = [];
    var flatten_ = function(n) {
        if (istagname(n, 'br')) {
            result.push(' \n');
        } else if (n.data) {
            result.push(n.data);
        } else if (n.childNodes) {
            for (var i = 0; n.childNodes[i]; ++i) flatten_(n.childNodes[i]);
        }
    }
    flatten_(n);
    return result.join('').replace(/\s+$/, '');
}

function serializeform(form, target) {
    var serialized = [];

    foreachtags(form, 'input', function(input) {
        if (input.disabled || !input.name) return;
        switch (input.type.toLowerCase()) {
        case 'reset': case 'button': return;
        case 'chechbox': case 'radio': if (!input.checked) return;
        case 'submit': /*case 'image':*/ if (target != input) return;
        case 'image': return; // TODO for now
        }
        serialized.push(encodeURIComponent(input.name) + '=' +
                        encodeURIComponent(input.value));
    });

    //foreachtags(form, 'select', function(select) { /* TODO for now */ });

    foreachtags(form, 'textarea', function(textarea) {
        if (textarea.disabled || !textarea.name) return;
        serialized.push(encodeURIComponent(textarea.name) + '=' +
                        encodeURIComponent(textarea.value));
    });

    return serialized.join('&');
}

//////////////////////////////////////////////////////////////////////////////
// throbber

var Throbber = {
    initialize: function() {
        var div = document.createElement('div');
        div.setAttribute('style', 'right:0;bottom:0;opacity:0.67;margin:2px;padding:2px;' +
                         'font:7pt Verdana;color:white;background:blue;position:fixed;');
        div.innerHTML = '<a href="http://userscripts.org/scripts/show/66113" target="_blank"' +
                        ' style="color:white;text-decoration:none;background:none;">' +
                        '<strong>threadic helper</strong> ' + VERSION + '</a>';
        document.body.appendChild(div);

        this.div = div;
        this.nremotes = 0;
    },

    onLoad: function() {
        this.div.style.backgroundColor = 'black';
    },

    onError: function(e) {
        //alert(e);
        var message = e.toString();
        if (e.fileName && e.lineNumber) {
            message += ' (' + e.fileName + ':' + e.lineNumber + ')';
        }
        this.div.style.backgroundColor = 'red';
        this.div.title = message;
    },

    onRemoteBegin: function() {
        if (this.nremotes++ == 0) {
            this.div.style.backgroundColor = 'blue';
        }
    },

    onRemoteEnd: function() {
        if (--this.nremotes == 0) {
            this.div.style.backgroundColor = 'black';
        }
    }
};

////////////////////////////////////////////////////////////////////////////////
// Animater

var Animater = function(target) {
    this.target = target;
    this.period = 10; // ms
    this.interval = null;
};

Animater.prototype.start = function(delay, duration) {
    var _this = this;

    if (this.interval) this.stop(); // stop any running interval
    this.target.style.opacity = 1.0;

    this.lasttime = new Date().getTime();
    this.endtime = this.lasttime + delay + duration;
    this.factor = 1.0 / duration;
    this.interval = setInterval(function() { _this.onTick(); }, this.period);
};

Animater.prototype.stop = function() {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
};

Animater.prototype.onTick = function() {
    var curtime = new Date().getTime();
    if (curtime < this.lasttime) {
        // the clock goes backward: rare case, but it may cause infinite loop!
        curtime = this.lasttime + this.period;
    }
    if (curtime < this.endtime) {
        this.target.style.opacity = Math.min(1.0, (this.endtime - curtime) * this.factor);
        this.lasttime = curtime;
    } else {
        clearInterval(this.interval);
        this.onFinish(this.target);
    }
};

Animater.prototype.onFinish = function(target) {
    target.style.display = 'none';
    target.style.opacity = 1.0;
};

//////////////////////////////////////////////////////////////////////////////

var Thread = function(dl) {
    var form = null, threadlinks = {};
    foreachtags(dl.parentNode, 'form', function(frm) {
        if (frm.method.toLowerCase() == 'post') form = frm;
    });
    foreachtags(form || dl.parentNode, 'blockquote', function(bq) {
        foreachtags(bq, 'a', function(a) {
            var text = flatten(a);
            // XXX for now...
            if (text == '전부 읽기') threadlinks.all = a;
            else if (text == '최신 50') threadlinks.latest = a;
            else if (text == '1-100') threadlinks.first = a;
            else if (text == '새로고침') threadlinks.reload = a;
        });
    });

    this.root = dl;
    this.form = form;
    this.threadlinks = threadlinks;
    this.selfurl = location.href.replace(/#.*$/, '');
    this.baseurl = (threadlinks.all ? threadlinks.all.href.replace(/\/*$/, '/') : null);
    this.idprefix = 'thr' + Thread.nthreads++;
    if (this.idprefix == 'thr0') this.idprefix = '';

    this.responses = {};
    this.links = {};
    this.separators = {};
    this.lastnum = 0;
};

Thread.nthreads = 0;

Thread.prototype.readResponse = function(dt) {
    var dthtml = dt.innerHTML;
    //if (dthtml.match(/^\s*[^\d].*ID:\s*$/)) alert('삭제된 거십니다.');
    var m = dthtml.match(/^([0-9]+) .* (ID:\S+|HOST:\S+)\s*$/);
    var dd = dt.nextSibling;
    if (!m || !dd || !istagname(dd, 'dd')) return null;
    return {num: parseInt(m[1]), dt: dt, dd: dd, id: m[2], contents: flatten(dd)};
};

Thread.prototype.ajax = function(url, data, onsuccess, onerror) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status == 200) {
            // since content-type is text/html, we cannot use responseXML!
            if (onsuccess) {
                var remoteroot = document.createElement('div');
                remoteroot.innerHTML = this.responseText;
                onsuccess(remoteroot);
            }
        } else {
            if (onerror) onerror(this);
        }
        Throbber.onRemoteEnd();
    };

    req.open(data ? 'POST' : 'GET', url, true);
    if (data) req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.send(data);

    Throbber.onRemoteBegin();
};

Thread.prototype.loadRemote = function(url, onload) {
    var _this = this;
    this.ajax(url, null, function(remoteroot) {
        var newres = {}, lastnum = 0;
        foreachtags(remoteroot, 'dt', function(dt) {
            var res = _this.readResponse(dt);
            if (res == null) return;
            newres[res.num] = res;
            if (_this.lastnum < res.num) _this.lastnum = res.num;
        });

        var lastdd = null;
        for (i = 1; i <= 1000; ++i) { // TODO optimize?
            if (newres[i]) {
                if (_this.responses[i]) {
                    _this.root.replaceChild(newres[i].dt, _this.responses[i].dt);
                    _this.root.replaceChild(newres[i].dd, _this.responses[i].dd);
                    lastdd = newres[i].dd;
                } else if (lastdd) {
                    _this.root.insertBefore(newres[i].dd, lastdd.nextSibling);
                    _this.root.insertBefore(newres[i].dt, lastdd.nextSibling);
                } else {
                    _this.root.insertBefore(newres[i].dd, _this.root.firstChild);
                    _this.root.insertBefore(newres[i].dt, _this.root.firstChild);
                }
                _this.responses[i] = newres[i];
                _this.injectResponse(newres[i]);
                foreach(_this.links[i] || [], function(args) {
                    _this.updateLink.apply(_this, args);
                });
            }
            if (_this.responses[i]) lastdd = _this.responses[i].dd;
        }

        if (onload) onload();
    }, function() {
        alert('스레를 읽는데 실패했슈. 다시 해 보슈.');
    });
};

Thread.prototype.addSeparator = function(min, max) { // max is inclusive
    var _this = this;

    var sep = document.createElement('dd');
    sep.setAttribute('style', 'margin:0;');
    var anchor = (min != max ? min + '-' + max : min);
    sep.innerHTML = '<table width=100%><tr><td width=50%><hr/></td>' +
        '<td style=white-space:nowrap><a href=#>&gt;&gt;' + anchor + '</a></td>' +
        '<td width=50%><hr/></td></tr></table>';

    this.root.insertBefore(sep, this.responses[max+1].dt);
    this.separators[min] = {min: min, max: max, separator: sep};
    foreachtags(sep, 'a', function(a) {
        if (_this.baseurl) a.href = _this.baseurl + anchor;
        _this.injectLinkRes(a, min, max);
    });
};

Thread.prototype.removeSeparator = function(min, max) {
    for (var imin in this.separators) {
        var imax = this.separators[imin].max;
        var omin = (min > imin ? min : imin);
        var omax = (max < imax ? max : imax);
        if (omin <= omax) { // two regions overlap somehow
            var sep = this.separators[imin].separator;
            sep.parentNode.removeChild(sep);
            delete this.separators[imin];
            if (imin < omin) this.addSeparator(imin, omin-1);
            if (omax < imax) this.addSeparator(omax+1, imax);
        }
    }
};

Thread.prototype.injectResponse = function(res) {
    var _this = this;
    var dtcolor = tocolor(res.id, 64, 160), ddcolor = tocolor(res.id, 208, 232);
    var linkcolor = tocolor(res.id, 160, 224);

    res.dt.id = this.idprefix + 'res' + res.num;
    res.dt.style.backgroundColor = dtcolor;
    res.dt.style.color = 'white';
    if (res.num == 1) res.dt.style.marginTop = '1em';
    foreachtags(res.dt, 'font', function(span) {
        // do not alter "red star", a sign for administrators only
        if (istagname(span.childNodes[0], 'b')) span.style.color = 'white';
    });
    foreachtags(res.dt, 'a', function(a) { a.style.color = linkcolor; });

    res.dd.style.backgroundColor = ddcolor;
    foreachtags(res.dd, 'a', function(a) { _this.injectLink(res, a); });
};

Thread.prototype.injectLinkRes = function(a, min, max) {
    var _this = this;
    a.addEventListener('click', function(e) {
        var loadedall = true;
        for (var i = min; i <= max; ++i) {
            if (!_this.responses[i]) {
                loadedall = false;
                break;
            }
        }

        var inpageurl = _this.selfurl + '#' + _this.idprefix + 'res' + min;
        if (loadedall) {
            location.href = inpageurl;
        } else {
            _this.loadRemote(this.href, function() {
                _this.removeSeparator(min, max);
                location.href = inpageurl;
            });
        }

        e.preventDefault();
    }, false);
};

Thread.prototype.injectLink = function(res, a) {
    var _this = this;

    var m = flatten(a).match(/^>>([0-9]+)(-([0-9]+)?)?$/);
    if (m) {
        var num = parseInt(m[1]);
        var maxnum = (m[2] ? (m[3] ? parseInt(m[3]) : 0) : num);

        // skip non-sense anchor like >>9999999 or >>335-123.
        if (num >= 1 && num <= 1000 && (!m[3] || (maxnum >= num && maxnum <= 1000))) {
            maxnum = maxnum || 1000;
            for (var i = num; i <= maxnum; ++i) {
                if (!this.links[i]) this.links[i] = [];
                this.links[i].push([a, num, maxnum]);
            }
            this.injectLinkRes(a, num, maxnum);
            this.updateLink(a, num, maxnum);
            return;
        }
    }

    if (a.href.match(/^(?:.*\/redirect\.cgi\/|http:\/\/)image\.threadic\.com\//)) {
        var url = a.href.replace(/^.*\/redirect\.cgi\//, 'http://');
        a.addEventListener('click', function(url) { return function(e) {
            _this.updateImage(a.parentNode, url);
            e.preventDefault();
        }}(url), false);
        return;
    }

    m = a.href.match(/\/read\.cgi\/[^\/]+\/Cushion\/(.*)$/);
    if (m) {
        var url = m[1];
        a.href = '/redirect.cgi/' + escape(url.replace(/^http:\/\//, ''));
        a.addEventListener('click', function(url) { return function(e) {
            if (!confirm('다음 사이트로 이동할까요? 이동시 모든 책임은 ' +
                         '이용자에게 있습니다.\n' + url)) {
                e.preventDefault();
            }
        }}(url), false);
        return;
    }

    if (istagname(a.parentNode, 'font')) { // self-reference
        a.addEventListener('click', function(e) {
            _this.loadRemote(this.href);
            e.preventDefault();
        }, false);
        return;
    }
};

Thread.prototype.injectForm = function(form, placeholder) {
    var _this = this;

    if (!placeholder) {
        placeholder = document.createElement('div');
        if (form.nextSibling) {
            form.parentNode.insertBefore(placeholder, form.nextSibling);
        } else {
            form.parentNode.appendChild(placeholder);
        }

        // set up the animater for fade out effect.
        this.formanimater = new Animater(placeholder);
        this.formanimater.onFinish = function(placeholder) {
            clearchildren(placeholder);
            placeholder.style.opacity = 1.0;
        };
    }

    form.addEventListener('submit', function(e) {
        _this.ajax(form.action, serializeform(form, e.target), function(remoteroot) {
            var secform = null;
            foreachtags(remoteroot, 'form', function(frm) { secform = frm; });
            if (secform) { // captcha or confirm form
                // fix the action url (as the message page has different base)
                var action = secform.getAttribute('action');
                if (!action.match(/\/\/|^\//)) {
                    secform.setAttribute('action',
                        form.action.replace(/\/[^\/]*$/, '/') + action);
                }

                _this.formanimater.stop();
                clearchildren(placeholder);
                placeholder.appendChild(secform);
                _this.injectForm(secform, placeholder);
            } else { // message
                // clear "some" form elements (do not use reset methdo!)
                foreachtags(_this.form, 'textarea', function(textarea) { textarea.value = ''; });

                placeholder.innerHTML = remoteroot.innerHTML;
                _this.updateLatest();
                _this.formanimater.start(2000, 1000);
            }
        }, function(req) {
            alert('레스를 올리는데 실패했슈. 다시 해 보슈.');
        });
        e.preventDefault();
    }, false);
};

Thread.prototype.updateLink = function(a, num, maxnum) {
    if (num == maxnum) {
        var res = this.responses[num];
        if (res) a.title = res.contents.substring(0, 100);
    }
};

Thread.prototype.updateImage = function(dd, href) {
    var _this = this;

    // find the id of corresponding dt (for various uses)
    var dt = dd.previousSibling, dtid = null;
    if (dt && istagname(dt, 'dt') && dt.id) dtid = dt.id;

    var imgframe = dd.lastChild;
    if (!(imgframe && istagname(imgframe, 'div') && imgframe.className == 'imgframe')) {
        var lastnewline = dd.innerHTML.match(/<br[^>]*>\s*<br[^>]*>\s*$/);
        imgframe = document.createElement('div');
        imgframe.className = 'imgframe';
        imgframe.setAttribute('style', // adaptive spacing
                'padding:0 1em 1em 1em;' + (lastnewline ? '' : 'margin-top:1em'));
        dd.appendChild(imgframe);
        if (dtid) imgframe.id = dtid + '-imgframe';
    }

    if (href) {
        imgframe.innerHTML = '<a href="' + href + '" target=_blank>' +
            '<img alt="이미지를 읽고 있습니다..." src="' + href + '" ' +
            'style="border:1px solid black;max-width:600px" /></a>';
        imgframe.childNodes[0].addEventListener('click', function(e) {
            // ...so one can view the original image with ctrl/shift-click (or so)
            if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
            _this.updateImage(dd);
            e.preventDefault();
        }, false);
        if (imgframe.id) location.href = this.selfurl + '#' + imgframe.id;
    } else {
        dd.removeChild(imgframe);
        if (dtid) location.href = this.selfurl + '#' + dtid;
    }
};

Thread.prototype.updateLatest = function() {
    var _this = this;
    var nextnum = this.lastnum + 1;
    this.loadRemote(this.baseurl + nextnum + '-', function() {
        location.href = _this.selfurl + '#' + _this.idprefix + 'res' + nextnum;
    });
}

Thread.prototype.stripBE = function(dl) {
    // be.js and this script cannot be used together. (be.js is hardly useful anyway)
    // try to disable be.js. this is possible because greasemonkey script is
    // invoked on DOMContentLoaded event, and has similar priority than load event.
    dl.className += ' ';

    // if the above solution didn't work, try to reload the entire thread so
    // every event listener by be.js is removed. also clean up the styles.
    var addform = null;
    foreachtags(dl.parentNode, 'form', function(form) {
        if (form.action == 'javascript:void 0;') addform = form;
    });
    if (addform) {
        addform.parentNode.removeChild(addform);
        foreachtags(dl, 'dt', function(dt) {
            dt.title = '';
            foreachtags(dt, 'small', function(small) {
                if (small.style.color != 'gray') return;
                small.parentNode.replaceChild(small.childNodes[0], small);
            });
        });
        dl.innerHTML = dl.innerHTML + '<!-- -->'; // so update the DOM
    }
}

Thread.prototype.process = function() {
    var _this = this;
    this.stripBE(this.root);

    var lastnum = 0;
    foreachtags(this.root, 'dt', function(dt) {
        var res = _this.readResponse(dt);
        if (res == null) return;
        _this.responses[res.num] = res;
        _this.injectResponse(res);
        if (lastnum + 1 != res.num) {
            _this.addSeparator(lastnum + 1, res.num - 1);
        }
        lastnum = res.num;
    });
    this.lastnum = lastnum;

    if (this.form) this.injectForm(this.form);

    if (this.threadlinks.reload) {
        this.threadlinks.reload.addEventListener('click', function(e) {
            _this.updateLatest();
            e.preventDefault();
        }, false);
    }
};

//////////////////////////////////////////////////////////////////////////////

var dls = document.getElementsByTagName('dl');
if (dls.length) {
    Throbber.initialize();
    try {
        foreach(dls, function(dl) {
            var thread = new Thread(dl);
            thread.process();
        });
        Throbber.onLoad();
    } catch (e) {
        Throbber.onError(e);
    }
}

}());

// vim: ts=4 sw=4 sts=4 et