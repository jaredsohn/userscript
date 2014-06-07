// ==UserScript==
// @author         Andreas Jung (sd-daken.deviantart.com)
// @name           deviantART: Pie Chart Polls
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Displays the polls on deviantart.com as pie charts (circle graphs) instead of bar charts.
// @include        http://*.deviantart.com/*poll/*
// ==/UserScript==

//------------------------------------------------------------------------------------------------
//Contents:
//-MochiKit
//-PlotKit
//-deviantART related code
//------------------------------------------------------------------------------------------------

/***
MochiKit
See <http://mochikit.com/> for documentation, downloads, license, etc.
(c) 2005 Bob Ippolito.  All rights Reserved.
***/

if (typeof(dojo) != 'undefined') {
    dojo.provide("MochiKit.Base");
}

if (typeof(MochiKit) == 'undefined') {
    MochiKit = {};
}
if (typeof(MochiKit.Base) == 'undefined') {
    MochiKit.Base = {};
}

MochiKit.Base.VERSION = "1.4";
MochiKit.Base.NAME = "MochiKit.Base";
MochiKit.Base.update = function (self, obj/*, ... */) {
    if (self === null) {
        self = {};
    }
    for (var i = 1; i < arguments.length; i++) {
        var o = arguments[i];
        if (typeof(o) != 'undefined' && o !== null) {
            for (var k in o) {
                self[k] = o[k];
            }
        }
    }
    return self;
};

MochiKit.Base.update(MochiKit.Base, {
    __repr__: function () {
        return "[" + this.NAME + " " + this.VERSION + "]";
    },

    toString: function () {
        return this.__repr__();
    },
    camelize: function (selector) {
        var arr = selector.split('-');
        var cc = arr[0];
        for (var i = 1; i < arr.length; i++) {
            cc += arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
        }
        return cc;
    },
    clone: function (obj) {
        var me = arguments.callee;
        if (arguments.length == 1) {
            me.prototype = obj;
            return new me();
        }
    },
    extend: function (self, obj, /* optional */skip) {        
        if (!skip) {
            skip = 0;
        }
        if (obj) {
            var l = obj.length;
            if (typeof(l) != 'number' /* !isArrayLike(obj) */) {
                if (typeof(MochiKit.Iter) != "undefined") {
                    obj = MochiKit.Iter.list(obj);
                    l = obj.length;
                } else {
                    throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
                }
            }
            if (!self) {
                self = [];
            }
            for (var i = skip; i < l; i++) {
                self.push(obj[i]);
            }
        }
        return self;
    },
    updatetree: function (self, obj/*, ...*/) {
        if (self === null) {
            self = {};
        }
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (typeof(o) != 'undefined' && o !== null) {
                for (var k in o) {
                    var v = o[k];
                    if (typeof(self[k]) == 'object' && typeof(v) == 'object') {
                        arguments.callee(self[k], v);
                    } else {
                        self[k] = v;
                    }
                }
            }
        }
        return self;
    },
    keys: function (obj) {
        var rval = [];
        for (var prop in obj) {
            rval.push(prop);
        }
        return rval;
    },
    items: function (obj) {
        var rval = [];
        var e;
        for (var prop in obj) {
            var v;
            try {
                v = obj[prop];
            } catch (e) {
                continue;
            }
            rval.push([prop, v]);
        }
        return rval;
    },
    operator: {
        ceq: function (a, b) { return MochiKit.Base.compare(a, b) === 0; },
        cne: function (a, b) { return MochiKit.Base.compare(a, b) !== 0; },
        cgt: function (a, b) { return MochiKit.Base.compare(a, b) == 1; },
        cge: function (a, b) { return MochiKit.Base.compare(a, b) != -1; },
        clt: function (a, b) { return MochiKit.Base.compare(a, b) == -1; },
        cle: function (a, b) { return MochiKit.Base.compare(a, b) != 1; },
    },
    forwardCall: function (func) {
        return function () {
            return this[func].apply(this, arguments);
        };
    },
    itemgetter: function (func) {
        return function (arg) {
            return arg[func];
        };
    },
    typeMatcher: function (/* typ */) {
        var types = {};
        for (var i = 0; i < arguments.length; i++) {
            var typ = arguments[i];
            types[typ] = typ;
        }
        return function () { 
            for (var i = 0; i < arguments.length; i++) {
                if (!(typeof(arguments[i]) in types)) {
                    return false;
                }
            }
            return true;
        };
    },
    isUndefinedOrNull: function (/* ... */) {
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            if (!(typeof(o) == 'undefined' || o === null)) {
                return false;
            }
        }
        return true;
    },
    isArrayLike: function () {
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            var typ = typeof(o);
            if (
                (typ != 'object' && !(typ == 'function' && typeof(o.item) == 'function')) ||
                o === null ||
                typeof(o.length) != 'number' ||
                o.nodeType === 3
            ) {
                return false;
            }
        }
        return true;
    },
    xmap: function (fn/*, obj... */) {
        if (fn === null) {
            return MochiKit.Base.extend(null, arguments, 1);
        }
        var rval = [];
        for (var i = 1; i < arguments.length; i++) {
            rval.push(fn(arguments[i]));
        }
        return rval;
    },
    map: function (fn, lst/*, lst... */) {
        var m = MochiKit.Base;
        var itr = MochiKit.Iter;
        var isArrayLike = m.isArrayLike;
        if (arguments.length <= 2) {
            if (!isArrayLike(lst)) {
                if (itr) {
                    lst = itr.list(lst);
                    if (fn === null) {
                        return lst;
                    }
                } else {
                    throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
                }
            }
            if (fn === null) {
                return m.extend(null, lst);
            }
            var rval = [];
            for (var i = 0; i < lst.length; i++) {
                rval.push(fn(lst[i]));
            }
            return rval;
        } else {
            if (fn === null) {
                fn = Array;
            }
            var length = null;
            for (i = 1; i < arguments.length; i++) {
                if (!isArrayLike(arguments[i])) {
                    if (itr) {
                        return itr.list(itr.imap.apply(null, arguments));
                    } else {
                        throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
                    }
                }
                var l = arguments[i].length;
                if (length === null || length > l) {
                    length = l;
                }
            }
            rval = [];
            for (i = 0; i < length; i++) {
                var args = [];
                for (var j = 1; j < arguments.length; j++) {
                    args.push(arguments[j][i]);
                }
                rval.push(fn.apply(this, args));
            }
            return rval;
        }
    },
    bind: function (func, self/* args... */) {
        if (typeof(func) == "string") {
            func = self[func];
        }
        var im_func = func.im_func;
        var im_preargs = func.im_preargs;
        var im_self = func.im_self;
        var m = MochiKit.Base;
        if (typeof(func) == "function" && typeof(func.apply) == "undefined") {
            func = m._wrapDumbFunction(func);
        }
        if (typeof(im_func) != 'function') {
            im_func = func;
        }
        if (typeof(self) != 'undefined') {
            im_self = self;
        }
        if (typeof(im_preargs) == 'undefined') {
            im_preargs = [];
        } else  {
            im_preargs = im_preargs.slice();
        }
        m.extend(im_preargs, arguments, 2);
        var newfunc = function () {
            var args = arguments;
            var me = arguments.callee;
            if (me.im_preargs.length > 0) {
                args = m.concat(me.im_preargs, args);
            }
            var self = me.im_self;
            if (!self) {
                self = this;
            }
            return me.im_func.apply(self, args);
        };
        newfunc.im_self = im_self;
        newfunc.im_func = im_func;
        newfunc.im_preargs = im_preargs;
        return newfunc;
    },
    registerComparator: function (name, check, comparator, /* optional */ override) {
        MochiKit.Base.comparatorRegistry.register(name, check, comparator, override);
    },

    _primitives: {'boolean': true, 'string': true, 'number': true},

    compare: function (a, b) {
        if (a == b) {
            return 0;
        }
        var aIsNull = (typeof(a) == 'undefined' || a === null);
        var bIsNull = (typeof(b) == 'undefined' || b === null);
        if (aIsNull && bIsNull) {
            return 0;
        } else if (aIsNull) {
            return -1;
        } else if (bIsNull) {
            return 1;
        }
        var m = MochiKit.Base;
        var prim = m._primitives;
        if (!(typeof(a) in prim && typeof(b) in prim)) {
            try {
                return m.comparatorRegistry.match(a, b);
            } catch (e) {
                if (e != m.NotFound) {
                    throw e;
                }
            }
        }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
        var repr = m.repr;
        throw new TypeError(repr(a) + " and " + repr(b) + " can not be compared");
    },
    registerRepr: function (name, check, wrap, /* optional */override) {
        MochiKit.Base.reprRegistry.register(name, check, wrap, override);
    },
    reprArrayLike: function (o) {
        var m = MochiKit.Base;
        return "[" + m.map(m.repr, o).join(", ") + "]";
    },
    arrayEqual: function (self, arr) {
        if (self.length != arr.length) {
            return false;
        }
        return (MochiKit.Base.compare(self, arr) === 0);
    },
    concat: function (/* lst... */) {
        var rval = [];
        var extend = MochiKit.Base.extend;
        for (var i = 0; i < arguments.length; i++) {
            extend(rval, arguments[i]);
        }
        return rval;
    },
    partial: function (func) {
        var m = MochiKit.Base;
        return m.bind.apply(this, m.extend([func, undefined], arguments, 1));
    },
    listMinMax: function (which, lst) {
        if (lst.length === 0) {
            return null;
        }
        var cur = lst[0];
        var compare = MochiKit.Base.compare;
        for (var i = 1; i < lst.length; i++) {
            var o = lst[i];
            if (compare(o, cur) == which) {
                cur = o;
            }
        }
        return cur;
    },
    nameFunctions: function (namespace) {
        var base = namespace.NAME;
        if (typeof(base) == 'undefined') {
            base = '';
        } else {
            base = base + '.';
        }
        for (var name in namespace) {
            var o = namespace[name];
            if (typeof(o) == 'function' && typeof(o.NAME) == 'undefined') {
                try {
                    o.NAME = base + name;
                } catch (e) {
                }
            }
        }
    },
});
MochiKit.Base.AdapterRegistry = function () {
    this.pairs = [];
};

MochiKit.Base.AdapterRegistry.prototype = {
    register: function (name, check, wrap, /* optional */ override) {
        if (override) {
            this.pairs.unshift([name, check, wrap]);
        } else {
            this.pairs.push([name, check, wrap]);
        }
    },
    match: function (/* ... */) {
        for (var i = 0; i < this.pairs.length; i++) {
            var pair = this.pairs[i];
            if (pair[1].apply(this, arguments)) {
                return pair[2].apply(this, arguments);
            }
        }
        throw MochiKit.Base.NotFound;
    },
    unregister: function (name) {
        for (var i = 0; i < this.pairs.length; i++) {
            var pair = this.pairs[i];
            if (pair[0] == name) {
                this.pairs.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};


MochiKit.Base.EXPORT = [
    "camelize",
    "clone",
    "extend",
    "updatetree",
    "keys",
    "items",
    "operator",
    "forwardCall",
    "itemgetter",
    "typeMatcher",
    "isUndefinedOrNull",
    "isNotEmpty",
    "isArrayLike",
    "xmap",
    "map",
    "bind",
    "bindMethods",
    "registerComparator",
    "compare",
    "registerRepr",
    "repr",
    "arrayEqual",
    "concat",
    "partial",
    "listMinMax"
];

MochiKit.Base.EXPORT_OK = [
    "nameFunctions",
    "comparatorRegistry",
    "reprRegistry",
    "jsonRegistry",
    "compareDateLike",
    "compareArrayLike",
    "reprArrayLike",
    "reprString",
    "reprNumber"
];

MochiKit.Base._exportSymbols = function (globals, module) {
    if (typeof(MochiKit.__export__) == "undefined") {
        MochiKit.__export__ = (MochiKit.__compat__  ||
            (typeof(JSAN) == 'undefined' && typeof(dojo) == 'undefined')
        );
    }
    if (!MochiKit.__export__) {
        return;
    }
    var all = module.EXPORT_TAGS[":all"];
    for (var i = 0; i < all.length; i++) {
        globals[all[i]] = module[all[i]];
    }
};

MochiKit.Base.__new__ = function () {
    var m = this;
    m.noop = m.operator.identity;
    m.forward = m.forwardCall;
    m.find = m.findValue;

    if (typeof(encodeURIComponent) != "undefined") {
        m.urlEncode = function (unencoded) {
            return encodeURIComponent(unencoded).replace(/\'/g, '%27');
        };
    } else {
        m.urlEncode = function (unencoded) {
            return escape(unencoded
                ).replace(/\+/g, '%2B'
                ).replace(/\"/g,'%22'
                ).rval.replace(/\'/g, '%27');
        };
    }
    m.listMax = m.partial(m.listMinMax, 1);
    m.listMin = m.partial(m.listMinMax, -1);
    m.comparatorRegistry = new m.AdapterRegistry();
    m.registerComparator("dateLike", m.isDateLike, m.compareDateLike);
    m.registerComparator("arrayLike", m.isArrayLike, m.compareArrayLike);

    var all = m.concat(m.EXPORT, m.EXPORT_OK);
    m.EXPORT_TAGS = {
        ":common": m.concat(m.EXPORT_OK),
        ":all": all
    };

    m.nameFunctions(this);

};

MochiKit.Base.__new__();

if (MochiKit.__export__) {
    compare = MochiKit.Base.compare;
}

MochiKit.Base._exportSymbols(this, MochiKit.Base);
            
if (typeof(MochiKit.Iter) == 'undefined') {
    MochiKit.Iter = {};
}           
        
MochiKit.Iter.NAME = "MochiKit.Iter";
MochiKit.Iter.VERSION = "1.4";
MochiKit.Base.update(MochiKit.Iter, {
    __repr__: function () {
        return "[" + this.NAME + " " + this.VERSION + "]";
    },
    toString: function () {
        return this.__repr__();
    },
    registerIteratorFactory: function (name, check, iterfactory, /* optional */ override) {
        MochiKit.Iter.iteratorRegistry.register(name, check, iterfactory, override);
    },
    iter: function (iterable, /* optional */ sentinel) {
        var self = MochiKit.Iter;
        if (arguments.length == 2) {
            return self.takewhile(
                function (a) { return a != sentinel; },
                iterable
            );
        }
        if (typeof(iterable.next) == 'function') {
            return iterable;
        } else if (typeof(iterable.iter) == 'function') {
            return iterable.iter();
        }

        try {
            return self.iteratorRegistry.match(iterable);
        } catch (e) {
            var m = MochiKit.Base;
            if (e == m.NotFound) {
                e = new TypeError(typeof(iterable) + ": " + m.repr(iterable) + " is not iterable");
            }
            throw e;
        }
    },
    count: function (n) {
        if (!n) {
            n = 0;
        }
        var m = MochiKit.Base;
        return {
            repr: function () { return "count(" + n + ")"; },
            toString: m.forwardCall("repr"),
            next: m.counter(n)
        };
    },
    cycle: function (p) {
        var self = MochiKit.Iter;
        var m = MochiKit.Base;
        var lst = [];
        var iterator = self.iter(p);
        return {
            repr: function () { return "cycle(...)"; },
            toString: m.forwardCall("repr"),
            next: function () {
                try {
                    var rval = iterator.next();
                    lst.push(rval);
                    return rval;
                } catch (e) {
                    if (e != self.StopIteration) {
                        throw e;
                    }
                    if (lst.length === 0) {
                        this.next = function () {
                            throw self.StopIteration;
                        };
                    } else {
                        var i = -1;
                        this.next = function () {
                            i = (i + 1) % lst.length;
                            return lst[i];
                        };
                    }
                    return this.next();
                }
            }
        };
    },
    repeat: function (elem, /* optional */n) {
        var m = MochiKit.Base;
        if (typeof(n) == 'undefined') {
            return {
                repr: function () {
                    return "repeat(" + m.repr(elem) + ")";
                },
                toString: m.forwardCall("repr"),
                next: function () {
                    return elem;
                }
            };
        }
        return {
            repr: function () {
                return "repeat(" + m.repr(elem) + ", " + n + ")";
            },
            toString: m.forwardCall("repr"),
            next: function () {
                if (n <= 0) {
                    throw MochiKit.Iter.StopIteration;
                }
                n -= 1;
                return elem;
            }
        };
    },
    next: function (iterator) {
        return iterator.next();
    },
    imap: function (fun, p, q/*, ...*/) {
        var m = MochiKit.Base;
        var self = MochiKit.Iter;
        var iterables = m.map(self.iter, m.extend(null, arguments, 1));
        var map = m.map;
        var next = self.next;
        return {
            repr: function () { return "imap(...)"; },
            toString: m.forwardCall("repr"),
            next: function () {
                return fun.apply(this, map(next, iterables));
            }
        };
    },
    applymap: function (fun, seq, self) {
        seq = MochiKit.Iter.iter(seq);
        var m = MochiKit.Base;
        return {
            repr: function () { return "applymap(...)"; },
            toString: m.forwardCall("repr"),
            next: function () {
                return fun.apply(self, seq.next());
            }
        };
    },
    list: function (iterable) {
        var m = MochiKit.Base;
        if (typeof(iterable.slice) == 'function') {
            return iterable.slice();
        } else if (m.isArrayLike(iterable)) {
            return m.concat(iterable);
        }

        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        var rval = [];
        try {
            while (true) {
                rval.push(iterable.next());
            }
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
            return rval;
        }
        return undefined;
    },
    sum: function (iterable, start/* = 0 */) {
        if (typeof(start) == "undefined" || start === null) {
            start = 0;
        }
        var x = start;
        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        try {
            while (true) {
                x += iterable.next();
            }
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
        }
        return x;
    },
    arrayLikeIter: function (iterable) {
        var i = 0;
        return {
            repr: function () { return "arrayLikeIter(...)"; },
            toString: MochiKit.Base.forwardCall("repr"),
            next: function () {
                if (i >= iterable.length) {
                    throw MochiKit.Iter.StopIteration;
                }
                return iterable[i++];
            }
        };
    }

});


MochiKit.Iter.EXPORT_OK = [
    "iteratorRegistry",
    "arrayLikeIter",
    "hasIterateNext",
    "iterateNextIter",
];

MochiKit.Iter.EXPORT = [
    "iter",
    "count",
    "cycle",
    "repeat",
    "next",
    "imap",
    "applymap",
    "list",
    "sum"
];

MochiKit.Iter.__new__ = function () {
    var m = MochiKit.Base;
    if (typeof(StopIteration) != "undefined") {
        this.StopIteration = StopIteration;
    } else {
        this.StopIteration = new m.NamedError("StopIteration");
    }
    this.iteratorRegistry = new m.AdapterRegistry();
    this.registerIteratorFactory(
        "arrayLike",
        m.isArrayLike,
        this.arrayLikeIter
    );

    this.registerIteratorFactory(
        "iterateNext",
        this.hasIterateNext,
        this.iterateNextIter
    );

    this.EXPORT_TAGS = {
        ":common": this.EXPORT,
        ":all": m.concat(this.EXPORT, this.EXPORT_OK)
    };

    m.nameFunctions(this);
        
};

MochiKit.Iter.__new__();

if (MochiKit.__export__) {
    reduce = MochiKit.Iter.reduce;
}

MochiKit.Base._exportSymbols(this, MochiKit.Iter);

if (typeof(MochiKit.Format) == 'undefined') {
    MochiKit.Format = {};
}

MochiKit.Format.NAME = "MochiKit.Format";
MochiKit.Format.VERSION = "1.4";
MochiKit.Format.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.Format.toString = function () {
    return this.__repr__();
};

MochiKit.Format._numberFormatter = function (placeholder, header, footer, locale, isPercent, precision, leadingZeros, separatorAt, trailingZeros) {
    return function (num) {
        num = parseFloat(num);
        if (typeof(num) == "undefined" || num === null || isNaN(num)) {
            return placeholder;
        }
        var curheader = header;
        var curfooter = footer;
        if (num < 0) {
            num = -num;
        } else {
            curheader = curheader.replace(/-/, "");
        }
        var me = arguments.callee;
        var fmt = MochiKit.Format.formatLocale(locale);
        if (isPercent) {
            num = num * 100.0;
            curfooter = fmt.percent + curfooter;
        }
        num = MochiKit.Format.roundToFixed(num, precision);
        var parts = num.split(/\./);
        var whole = parts[0];
        var frac = (parts.length == 1) ? "" : parts[1];
        var res = "";
        while (whole.length < leadingZeros) {
            whole = "0" + whole;
        }
        if (separatorAt) {
            while (whole.length > separatorAt) {
                var i = whole.length - separatorAt;
                res = fmt.separator + whole.substring(i, whole.length) + res;
                whole = whole.substring(0, i);
            }
        }
        res = whole + res;
        if (precision > 0) {
            while (frac.length < trailingZeros) {
                frac = frac + "0";
            }
            res = res + fmt.decimal + frac;
        }
        return curheader + res + curfooter;
    };
};
MochiKit.Format.numberFormatter = function (pattern, placeholder/* = "" */, locale/* = "default" */) {
    if (typeof(placeholder) == "undefined") {
        placeholder = "";
    }
    var match = pattern.match(/((?:[0#]+,)?[0#]+)(?:\.([0#]+))?(%)?/);
    if (!match) {
        throw TypeError("Invalid pattern");
    }
    var header = pattern.substr(0, match.index);
    var footer = pattern.substr(match.index + match[0].length);
    if (header.search(/-/) == -1) {
        header = header + "-";
    }
    var whole = match[1];
    var frac = (typeof(match[2]) == "string" && match[2] != "") ? match[2] : "";
    var isPercent = (typeof(match[3]) == "string" && match[3] != "");
    var tmp = whole.split(/,/);
    var separatorAt;
    if (typeof(locale) == "undefined") {
        locale = "default";
    }
    if (tmp.length == 1) {
        separatorAt = null;
    } else {
        separatorAt = tmp[1].length;
    }
    var leadingZeros = whole.length - whole.replace(/0/g, "").length;
    var trailingZeros = frac.length - frac.replace(/0/g, "").length;
    var precision = frac.length;
    var rval = MochiKit.Format._numberFormatter(
        placeholder, header, footer, locale, isPercent, precision,
        leadingZeros, separatorAt, trailingZeros
    );
    var m = MochiKit.Base;
    if (m) {
        var fn = arguments.callee;
        var args = m.concat(arguments);
        rval.repr = function () {
            return [
                self.NAME,
                "(",
                map(m.repr, args).join(", "),
                ")"
            ].join("");
        };
    }
    return rval;
};
MochiKit.Format.formatLocale = function (locale) {
    if (typeof(locale) == "undefined" || locale === null) {
        locale = "default";
    }
    if (typeof(locale) == "string") {
        var rval = MochiKit.Format.LOCALE[locale];
        if (typeof(rval) == "string") {
            rval = arguments.callee(rval);
            MochiKit.Format.LOCALE[locale] = rval;
        }
        return rval;
    } else {
        return locale;
    }
};
MochiKit.Format.truncToFixed = function (aNumber, precision) {
    aNumber = Math.floor(aNumber * Math.pow(10, precision));
    var res = (aNumber * Math.pow(10, -precision)).toFixed(precision);
    if (res.charAt(0) == ".") {
        res = "0" + res;
    }
    return res;
};
MochiKit.Format.roundToFixed = function (aNumber, precision) {
    return MochiKit.Format.truncToFixed(
        aNumber + 0.5 * Math.pow(10, -precision),
        precision
    );
};


MochiKit.Format.EXPORT = [
    "truncToFixed",
    "roundToFixed",
    "numberFormatter",
    "formatLocale"
];

MochiKit.Format.LOCALE = {
    en_US: {separator: ",", decimal: ".", percent: "%"},
    de_DE: {separator: ".", decimal: ",", percent: "%"},
    fr_FR: {separator: " ", decimal: ",", percent: "%"},
    "default": "en_US"
};

MochiKit.Format.EXPORT_OK = [];
MochiKit.Format.EXPORT_TAGS = {
    ':all': MochiKit.Format.EXPORT,
    ':common': MochiKit.Format.EXPORT
};

MochiKit.Format.__new__ = function () {
    var base = this.NAME + ".";
    var k, v, o;
    for (k in this.LOCALE) {
        o = this.LOCALE[k];
        if (typeof(o) == "object") {
            o.repr = function () { return this.NAME; };
            o.NAME = base + "LOCALE." + k;
        }
    }
    for (k in this) {
        o = this[k];
        if (typeof(o) == 'function' && typeof(o.NAME) == 'undefined') {
            try {
                o.NAME = base + k;
            } catch (e) {
                // pass
            }
        }
    }
};

MochiKit.Format.__new__();

if (typeof(MochiKit.Base) != "undefined") {
    MochiKit.Base._exportSymbols(this, MochiKit.Format);
} else {
    (function (globals, module) {
        if ((typeof(JSAN) == 'undefined' && typeof(dojo) == 'undefined')
            || (MochiKit.__export__ === false)) {
            var all = module.EXPORT_TAGS[":all"];
            for (var i = 0; i < all.length; i++) {
                globals[all[i]] = module[all[i]]; 
            }
        }   
    })(this, MochiKit.Format);  
}
if (typeof(MochiKit.DOM) == 'undefined') {
    MochiKit.DOM = {};
}

MochiKit.DOM.NAME = "MochiKit.DOM";
MochiKit.DOM.VERSION = "1.4";
MochiKit.DOM.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.DOM.toString = function () {
    return this.__repr__();
};

MochiKit.DOM.EXPORT = [
    "coerceToDOM",
    "updateNodeAttributes",
    "appendChildNodes",
    "DIV",
    "getElement"
];

MochiKit.DOM.EXPORT_OK = [
    "domConverters"
];

MochiKit.DOM.DEPRECATED = [
    ['computedStyle', 'MochiKit.Style.computedStyle', '1.4'],
    ['elementDimensions', 'MochiKit.Style.getElementDimensions', '1.4'],
    ['elementPosition', 'MochiKit.Style.getElementPosition', '1.4'],
    ['hideElement', 'MochiKit.Style.hideElement', '1.4'],
    ['setElementDimensions', 'MochiKit.Style.setElementDimensions', '1.4'],
    ['setElementPosition', 'MochiKit.Style.setElementPosition', '1.4'],
    ['setDisplayForElement', 'MochiKit.Style.setDisplayForElement', '1.4'],
    ['setOpacity', 'MochiKit.Style.setOpacity', '1.4'],
    ['showElement', 'MochiKit.Style.showElement', '1.4'],
    ['Coordinates', 'MochiKit.Style.Coordinates', '1.4'], // FIXME: broken
    ['Dimensions', 'MochiKit.Style.Dimensions', '1.4'] // FIXME: broken
];
MochiKit.DOM.getViewportDimensions = new Function('' + 
    'if (!MochiKit["Style"]) {' + 
    '    throw new Error("This function has been deprecated and depends on MochiKit.Style.");' + 
    '}' + 
    'return MochiKit.Style.getViewportDimensions.apply(this, arguments);');

MochiKit.Base.update(MochiKit.DOM, {

    coerceToDOM: function (node, ctx) {
        var m = MochiKit.Base;
        var im = MochiKit.Iter;
        var self = MochiKit.DOM;
        if (im) {
            var iter = im.iter;
            var repeat = im.repeat;
            var map = m.map;
        }
        var domConverters = self.domConverters;
        var coerceToDOM = arguments.callee;
        var NotFound = m.NotFound;
        while (true) {
            if (typeof(node) == 'undefined' || node === null) {
                return null;
            }
            if (typeof(node.nodeType) != 'undefined' && node.nodeType > 0) {
                return node;
            }
            if (typeof(node) == 'number' || typeof(node) == 'boolean') {
                node = node.toString();
            }
            if (typeof(node) == 'string') {
                return self._document.createTextNode(node);
            }
            if (typeof(node.__dom__) == 'function') {
                node = node.__dom__(ctx);
                continue;
            }
            if (typeof(node.dom) == 'function') {
                node = node.dom(ctx);
                continue;
            }
            if (typeof(node) == 'function') {
                node = node.apply(ctx, [ctx]);
                continue;
            }

            if (im) {
                var iterNodes = null;
                try {
                    iterNodes = iter(node);
                } catch (e) {
                }
                if (iterNodes) {
                    return map(coerceToDOM, iterNodes, repeat(ctx));
                }
            }

            try {
                node = domConverters.match(node, ctx);
                continue;
            } catch (e) {
                if (e != NotFound) {
                    throw e;
                }
            }

            return self._document.createTextNode(node.toString());
        }
        return undefined;
    },
        

    updateNodeAttributes: function (node, attrs) {
        var elem = node;
        var self = MochiKit.DOM;
        if (typeof(node) == 'string') {
            elem = self.getElement(node);
        }
        if (attrs) {
            var updatetree = MochiKit.Base.updatetree;
            if (self.attributeArray.compliant) {
                for (var k in attrs) {
                    var v = attrs[k];
                    if (typeof(v) == 'object' && typeof(elem[k]) == 'object') {
                        updatetree(elem[k], v);
                    } else if (k.substring(0, 2) == "on") {
                        if (typeof(v) == "string") {
                            v = new Function(v);
                        }
                        elem[k] = v;
                    } else {
                        elem.setAttribute(k, v);
                    }
                }
            } else {
                var renames = self.attributeArray.renames;
                for (k in attrs) {
                    v = attrs[k];
                    var renamed = renames[k];
                    if (k == "style" && typeof(v) == "string") {
                        elem.style.cssText = v;
                    } else if (typeof(renamed) == "string") {
                        elem[renamed] = v;
                    } else if (typeof(elem[k]) == 'object'
                            && typeof(v) == 'object') {
                        updatetree(elem[k], v);
                    } else if (k.substring(0, 2) == "on") {
                        if (typeof(v) == "string") {
                            v = new Function(v);
                        }
                        elem[k] = v;
                    } else {
                        elem.setAttribute(k, v);
                    }
                }
            }
        }
        return elem;
    },

    appendChildNodes: function (node/*, nodes...*/) {
        var elem = node;
        var self = MochiKit.DOM;
        if (typeof(node) == 'string') {
            elem = self.getElement(node);
        }
        var nodeStack = [
            self.coerceToDOM(
                MochiKit.Base.extend(null, arguments, 1),
                elem
            )
        ];
        var concat = MochiKit.Base.concat;
        while (nodeStack.length) {
            var n = nodeStack.shift();
            if (typeof(n) == 'undefined' || n === null) {
                // pass
            } else if (typeof(n.nodeType) == 'number') {
                elem.appendChild(n);
            } else {
                nodeStack = concat(n, nodeStack);
            }
        }
        return elem;
    },
    createDOM: function (name, attrs/*, nodes... */) {
        var elem;
        var self = MochiKit.DOM;
        var m = MochiKit.Base;
        if (typeof(attrs) == "string" || typeof(attrs) == "number") {
            var args = m.extend([name, null], arguments, 1);
            return arguments.callee.apply(this, args);
        }
        if (typeof(name) == 'string') {
            if (attrs && !self.attributeArray.compliant) {
                var contents = "";
                if ('name' in attrs) {
                    contents += ' name="' + self.escapeHTML(attrs.name) + '"';
                }
                if (name == 'input' && 'type' in attrs) {
                    contents += ' type="' + self.escapeHTML(attrs.type) + '"';
                }
                if (contents) {
                    name = "<" + name + contents + ">";
                }
            }
            elem = self._document.createElement(name);
        } else {
            elem = name;
        }
        if (attrs) {
            self.updateNodeAttributes(elem, attrs);
        }
        if (arguments.length <= 2) {
            return elem;
        } else {
            var args = m.extend([elem], arguments, 2);
            return self.appendChildNodes.apply(this, args);
        }
    },
    createDOMFunc: function (/* tag, attrs, *nodes */) {
        var m = MochiKit.Base;
        return m.partial.apply(
            this,
            m.extend([MochiKit.DOM.createDOM], arguments)
        );
    },
    getElement: function (id) {
        var self = MochiKit.DOM;
        if (arguments.length == 1) {
            return ((typeof(id) == "string") ?
                self._document.getElementById(id) : id);
        } else {
            return MochiKit.Base.map(self.getElement, arguments);
        }
    },

    _newCallStack: function (path, once) {
        var rval = function () {
            var callStack = arguments.callee.callStack;
            for (var i = 0; i < callStack.length; i++) {
                if (callStack[i].apply(this, arguments) === false) {
                    break;
                }
            }
            if (once) {
                try {
                    this[path] = null;
                } catch (e) {
                }
            }
        };
        rval.callStack = [];
        return rval;
    },
    __new__: function (win) {

        var m = MochiKit.Base;
        if (typeof(document) != "undefined") {
            this._document = document;
        } else if (MochiKit.MockDOM) {
            this._document = MochiKit.MockDOM.document;
        }
        this._window = win;

        this.domConverters = new m.AdapterRegistry(); 
        
        var __tmpElement = this._document.createElement("span");
        var attributeArray;
        if (__tmpElement && __tmpElement.attributes &&
                __tmpElement.attributes.length > 0) {
            var filter = m.filter;
            attributeArray = function (node) {
                return filter(attributeArray.ignoreAttrFilter, node.attributes);
            };
            attributeArray.ignoreAttr = {};
            var attrs = __tmpElement.attributes;
            var ignoreAttr = attributeArray.ignoreAttr;
            for (var i = 0; i < attrs.length; i++) {
                var a = attrs[i];
                ignoreAttr[a.name] = a.value;
            }
            attributeArray.ignoreAttrFilter = function (a) {
                return (attributeArray.ignoreAttr[a.name] != a.value);
            };
            attributeArray.compliant = false;
            attributeArray.renames = {
                "class": "className",
                "checked": "defaultChecked",
                "usemap": "useMap",
                "for": "htmlFor",
                "readonly": "readOnly"
            };
        } else {
            attributeArray = function (node) {
                return node.attributes;
            };
            attributeArray.compliant = true;
            attributeArray.renames = {};
        }
        this.attributeArray = attributeArray;

        var _deprecated = function(fromModule, arr) {
            var modules = arr[1].split('.');
            var str = '';
            var obj = {};
            
            str += 'if (!MochiKit.' + modules[1] + ') { throw new Error("';
            str += 'This function has been deprecated and depends on MochiKit.';
            str += modules[1] + '.");}';
            str += 'return MochiKit.' + modules[1] + '.' + arr[0];
            str += '.apply(this, arguments);';
            
            obj[modules[2]] = new Function(str);
            MochiKit.Base.update(MochiKit[fromModule], obj);
        }
        for (var i; i < MochiKit.DOM.DEPRECATED.length; i++) {
            _deprecated('DOM', MochiKit.DOM.DEPRECATED[i]);
        }

        var createDOMFunc = this.createDOMFunc;
        this.DIV = createDOMFunc("div");
        this.$ = this.getElement;

        this.EXPORT_TAGS = {
            ":common": this.EXPORT,
            ":all": m.concat(this.EXPORT, this.EXPORT_OK)
        };

        m.nameFunctions(this);

    }
});


MochiKit.DOM.__new__(((typeof(window) == "undefined") ? this : window));

if (MochiKit.__export__) {
    withWindow = MochiKit.DOM.withWindow;
    withDocument = MochiKit.DOM.withDocument;
}

MochiKit.Base._exportSymbols(this, MochiKit.DOM);

if (typeof(MochiKit.Color) == "undefined") {
    MochiKit.Color = {};
}

MochiKit.Color.NAME = "MochiKit.Color";
MochiKit.Color.VERSION = "1.4";

MochiKit.Color.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

MochiKit.Color.toString = function () {
    return this.__repr__();
};
MochiKit.Color.Color = function (red, green, blue, alpha) {
    if (typeof(alpha) == 'undefined' || alpha === null) {
        alpha = 1.0;
    }
    this.rgb = {
        r: red,
        g: green,
        b: blue,
        a: alpha
    };
};
MochiKit.Color.Color.prototype = {

    __class__: MochiKit.Color.Color,
    colorWithAlpha: function (alpha) {
        var rgb = this.rgb;
        var m = MochiKit.Color;
        return m.Color.fromRGB(rgb.r, rgb.g, rgb.b, alpha);
    },
    darkerColorWithLevel: function (level) {
        var hsl  = this.asHSL();
        hsl.l = Math.max(hsl.l - level, 0);
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    },
    lighterColorWithLevel: function (level) {
        var hsl  = this.asHSL();
        hsl.l = Math.min(hsl.l + level, 1);
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    },
    toRGBString: function () {
        var c = this.rgb;
        var ccc = MochiKit.Color.clampColorComponent;
        var rval = this._rgbString;
        if (!rval) {
            var mid = (
                ccc(c.r, 255).toFixed(0)
                + "," + ccc(c.g, 255).toFixed(0)
                + "," + ccc(c.b, 255).toFixed(0)
            );
            if (c.a != 1) {
                rval = "rgba(" + mid + "," + c.a + ")";
            } else {
                rval = "rgb(" + mid + ")";
            }
            this._rgbString = rval;
        }
        return rval;
    },
    toHexString: function () {
        var m = MochiKit.Color;
        var c = this.rgb;
        var ccc = MochiKit.Color.clampColorComponent;
        var rval = this._hexString;
        if (!rval) {
            rval = ("#" + 
                m.toColorPart(ccc(c.r, 255)) +
                m.toColorPart(ccc(c.g, 255)) +
                m.toColorPart(ccc(c.b, 255))
            );
            this._hexString = rval;
        }
        return rval;
    },
    asHSV: function () {
        var hsv = this.hsv;
        var c = this.rgb;
        if (typeof(hsv) == 'undefined' || hsv === null) {
            hsv = MochiKit.Color.rgbToHSV(this.rgb);
            this.hsv = hsv;
        }
        return MochiKit.Base.clone(hsv);
    },
    asHSL: function () {
        var hsl = this.hsl;
        var c = this.rgb;
        if (typeof(hsl) == 'undefined' || hsl === null) {
            hsl = MochiKit.Color.rgbToHSL(this.rgb);
            this.hsl = hsl;
        }
        return MochiKit.Base.clone(hsl);
    },
};
MochiKit.Base.update(MochiKit.Color.Color, {
    fromRGB: function (red, green, blue, alpha) {
        // designated initializer
        var Color = MochiKit.Color.Color;
        if (arguments.length == 1) {
            var rgb = red;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;
            if (typeof(rgb.a) == 'undefined') {
                alpha = undefined;
            } else {
                alpha = rgb.a;
            }
        }
        return new Color(red, green, blue, alpha);
    },
    fromHSL: function (hue, saturation, lightness, alpha) {
        var m = MochiKit.Color;
        return m.Color.fromRGB(m.hslToRGB.apply(m, arguments));
    },
    fromHSV: function (hue, saturation, value, alpha) {
        var m = MochiKit.Color;
        return m.Color.fromRGB(m.hsvToRGB.apply(m, arguments));
    },
    fromHexString: function (hexCode) {
        if (hexCode.charAt(0) == '#') {
            hexCode = hexCode.substring(1);
        }
        var components = [];
        var i, hex;
        if (hexCode.length == 3) {
            for (i = 0; i < 3; i++) {
                hex = hexCode.substr(i, 1);
                components.push(parseInt(hex + hex, 16) / 255.0);
            }
        } else {
            for (i = 0; i < 6; i += 2) {
                hex = hexCode.substr(i, 2);
                components.push(parseInt(hex, 16) / 255.0);
            }
        }
        var Color = MochiKit.Color.Color;
        return Color.fromRGB.apply(Color, components);
    },
        

    _fromColorString: function (pre, method, scales, colorCode) {
        if (colorCode.indexOf(pre) === 0) {
            colorCode = colorCode.substring(colorCode.indexOf("(", 3) + 1, colorCode.length - 1);
        } 
        var colorChunks = colorCode.split(/\s*,\s*/);
        var colorFloats = [];
        for (var i = 0; i < colorChunks.length; i++) {
            var c = colorChunks[i];
            var val;
            var three = c.substring(c.length - 3);
            if (c.charAt(c.length - 1) == '%') {
                val = 0.01 * parseFloat(c.substring(0, c.length - 1));
            } else if (three == "deg") {
                val = parseFloat(c) / 360.0;
            } else if (three == "rad") {
                val = parseFloat(c) / (Math.PI * 2);
            } else {
                val = scales[i] * parseFloat(c);
            }
            colorFloats.push(val);
        }
        return this[method].apply(this, colorFloats);
    }
});
MochiKit.Base.update(MochiKit.Color, {
    clampColorComponent: function (v, scale) {
        v *= scale;
        if (v < 0) {
            return 0;
        } else if (v > scale) {
            return scale;
        } else {
            return v;
        }
    },

    _hslValue: function (n1, n2, hue) {
        if (hue > 6.0) {
            hue -= 6.0;
        } else if (hue < 0.0) {
            hue += 6.0;
        }
        var val;
        if (hue < 1.0) {
            val = n1 + (n2 - n1) * hue;
        } else if (hue < 3.0) {
            val = n2;
        } else if (hue < 4.0) {
            val = n1 + (n2 - n1) * (4.0 - hue);
        } else {
            val = n1;
        }
        return val;
    },
    hsvToRGB: function (hue, saturation, value, alpha) {
        if (arguments.length == 1) {
            var hsv = hue;
            hue = hsv.h;
            saturation = hsv.s;
            value = hsv.v;
            alpha = hsv.a;
        }
        var red;
        var green;
        var blue;
        if (saturation === 0) {
            red = 0;
            green = 0;
            blue = 0;
        } else {
            var i = Math.floor(hue * 6);
            var f = (hue * 6) - i;
            var p = value * (1 - saturation);
            var q = value * (1 - (saturation * f));
            var t = value * (1 - (saturation * (1 - f)));
            switch (i) {
                case 1: red = q; green = value; blue = p; break;
                case 2: red = p; green = value; blue = t; break;
                case 3: red = p; green = q; blue = value; break;
                case 4: red = t; green = p; blue = value; break;
                case 5: red = value; green = p; blue = q; break;
                case 6: // fall through
                case 0: red = value; green = t; blue = p; break;
            }
        }
        return {
            r: red,
            g: green,
            b: blue,
            a: alpha
        };
    },

    hslToRGB: function (hue, saturation, lightness, alpha) {
        if (arguments.length == 1) {
            var hsl = hue;
            hue = hsl.h;
            saturation = hsl.s;
            lightness = hsl.l;
            alpha = hsl.a;
        }
        var red;
        var green;
        var blue;
        if (saturation === 0) {
            red = lightness;
            green = lightness;
            blue = lightness;
        } else {
            var m2;
            if (lightness <= 0.5) {
                m2 = lightness * (1.0 + saturation);
            } else {
                m2 = lightness + saturation - (lightness * saturation);
            }
            var m1 = (2.0 * lightness) - m2;
            var f = MochiKit.Color._hslValue;
            var h6 = hue * 6.0;
            red = f(m1, m2, h6 + 2);
            green = f(m1, m2, h6);
            blue = f(m1, m2, h6 - 2);
        }
        return {
            r: red,
            g: green,
            b: blue,
            a: alpha
        };
    },
    rgbToHSV: function (red, green, blue, alpha) {
        if (arguments.length == 1) {
            var rgb = red;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;
            alpha = rgb.a;
        }
        var max = Math.max(Math.max(red, green), blue);
        var min = Math.min(Math.min(red, green), blue);
        var hue;
        var saturation;
        var value = max;
        if (min == max) {
            hue = 0;
            saturation = 0;
        } else {
            var delta = (max - min);
            saturation = delta / max;

            if (red == max) {
                hue = (green - blue) / delta;
            } else if (green == max) {
                hue = 2 + ((blue - red) / delta);
            } else {
                hue = 4 + ((red - green) / delta);
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        return {
            h: hue,
            s: saturation,
            v: value,
            a: alpha
        };
    },
    rgbToHSL: function (red, green, blue, alpha) {
        if (arguments.length == 1) {
            var rgb = red;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;
            alpha = rgb.a;
        }
        var max = Math.max(red, Math.max(green, blue));
        var min = Math.min(red, Math.min(green, blue));
        var hue;
        var saturation;
        var lightness = (max + min) / 2.0;
        var delta = max - min;
        if (delta === 0) {
            hue = 0;
            saturation = 0;
        } else {
            if (lightness <= 0.5) {
                saturation = delta / (max + min);
            } else {
                saturation = delta / (2 - max - min);
            }
            if (red == max) {
                hue = (green - blue) / delta;
            } else if (green == max) {
                hue = 2 + ((blue - red) / delta);
            } else {
                hue = 4 + ((red - green) / delta);
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
            
        }
        return {
            h: hue,
            s: saturation,
            l: lightness,
            a: alpha
        };
    },
    toColorPart: function (num) {
        num = Math.round(num);
        var digits = num.toString(16);
        if (num < 16) {
            return '0' + digits;
        }
        return digits;
    },

    __new__: function () {
        var m = MochiKit.Base;
        this.Color.fromRGBString = m.bind(
            this.Color._fromColorString, this.Color, "rgb", "fromRGB",
            [1.0/255.0, 1.0/255.0, 1.0/255.0, 1]
        );
        this.Color.fromHSLString = m.bind(
            this.Color._fromColorString, this.Color, "hsl", "fromHSL",
            [1.0/360.0, 0.01, 0.01, 1]
        );
        
        var third = 1.0 / 3.0;
        var colors = {
            black: [0, 0, 0],
            darkGray: [third, third, third],
            gray: [0.5, 0.5, 0.5],
            transparent: [0, 0, 0, 0],
            white: [1, 1, 1],
        };

        var makeColor = function (name, r, g, b, a) {
            var rval = this.fromRGB(r, g, b, a);
            this[name] = function () { return rval; };
            return rval;
        };

        for (var k in colors) {
            var name = k + "Color";
            var bindArgs = m.concat(
                [makeColor, this.Color, name],
                colors[k]
            );
            this.Color[name] = m.bind.apply(null, bindArgs);
        }

        var isColor = function () {
            for (var i = 0; i < arguments.length; i++) {
                if (!(arguments[i] instanceof Color)) {
                    return false;
                }
            }
            return true;
        };

        var compareColor = function (a, b) {
            return a.compareRGB(b);
        };

        m.nameFunctions(this);

        m.registerComparator(this.Color.NAME, isColor, compareColor);
            
        this.EXPORT_TAGS = {
            ":common": this.EXPORT,
            ":all": m.concat(this.EXPORT, this.EXPORT_OK)
        };

    }
});

MochiKit.Color.EXPORT = [
    "Color"
];

MochiKit.Color.EXPORT_OK = [
    "rgbToHSL",
    "hslToRGB",
    "rgbToHSV",
    "hsvToRGB"
];

MochiKit.Color.__new__();

MochiKit.Base._exportSymbols(this, MochiKit.Color);

MochiKit.Color.Color._namedColors = {};

//------------------------------------------------------------------------------------------------
/*
    PlotKit
    =======
    PlotKit is a collection of Javascript classes that allows
    you to quickly visualise data using different types of charts.
    For license/info/documentation: http://www.liquidx.net/plotkit/

    Copyright
    ---------
    Copyright 2005,2006 (c) Alastair Tse <alastair^liquidx.net>
    For use under the BSD license. <http://www.liquidx.net/plotkit>
*/
MochiKit.Base.update(MochiKit.Color.Color.prototype, {
    asFillColor: function() {
        return this.lighterColorWithLevel(0.3);
    },
        
    asStrokeColor: function() {
        return this.darkerColorWithLevel(0.1);
    },

    asPointColor: function() {
        return this.lighterColorWithLevel(0.1);
    }
});
if (typeof(PlotKit) == 'undefined') {
    PlotKit = {};
}

PlotKit.NAME = "PlotKit";
PlotKit.VERSION = "0.8";
PlotKit.__repr__ = function() {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

PlotKit.toString = function() {
    return this.__repr__();
}
if (typeof(PlotKit.Base) == 'undefined') {
    PlotKit.Base = {};
}

PlotKit.Base.NAME = 'PlotKit.Base';
PlotKit.Base.VERSION = PlotKit.VERSION;

PlotKit.Base.__repr__ = function() {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

PlotKit.Base.toString = function() {
    return this.__repr__();
}

MochiKit.Base.update(PlotKit.Base, {
    roundInterval: function(range, intervals, precision) {
        // We want to make the interval look regular,
        var trunc = MochiKit.Format.roundToFixed;
        var sep = range/intervals;
        return parseFloat(trunc(sep, precision));
    },

    collapse: function(lst) {
        var m = MochiKit.Base;
        var biggerList = new Array();
        for (var i = 0; i < lst.length; i++) {
            biggerList = m.concat(biggerList, lst[i]);
        }
        return biggerList;
    },   

    palette: function(baseColor, fromLevel, toLevel, increment) {
        var isNil = MochiKit.Base.isUndefinedOrNull;
        var fractions = new Array();
        if (isNil(increment))
            increment = 0.1;
        if (isNil(toLevel))
            toLevel = 0.4;
        if (isNil(fromLevel))
            fromLevel = -0.2;

        var level = fromLevel;
        while (level <= toLevel) {
            fractions.push(level);
            level += increment;
        }
            
        var makeColor = function(color, fraction) {
            return color.lighterColorWithLevel(fraction);
        };
        return MochiKit.Base.map(partial(makeColor, baseColor), fractions);
    }
});    

PlotKit.Base.baseColors = function () {
   return [MochiKit.Color.Color.fromHexString("#FF530A")];
};

PlotKit.Base.officeBaseStyle = {
    "axisLabelColor": MochiKit.Color.Color.fromHexString('#464847')
};    

MochiKit.Base.update(PlotKit.Base,{
    officeBlue: function() {
        var r = {
        "colorScheme": PlotKit.Base.palette(PlotKit.Base.baseColors()[0])
        };
        MochiKit.Base.update(r, PlotKit.Base.officeBaseStyle);
        return r;
    }
});

PlotKit.Base.EXPORT = [
   "collapse",
   "officeBaseStyle",
   "officeBlue",
   "roundInterval",
];

PlotKit.Base.EXPORT_OK = [];

PlotKit.Base.__new__ = function() {
    var m = MochiKit.Base;
    
    m.nameFunctions(this);
    
    this.EXPORT_TAGS = {
        ":common": this.EXPORT,
        ":all": m.concat(this.EXPORT, this.EXPORT_OK)
    };
};

PlotKit.Base.__new__();
MochiKit.Base._exportSymbols(this, PlotKit.Base);

if (typeof(PlotKit.Layout) == 'undefined') {
    PlotKit.Layout = {};
}

PlotKit.Layout.NAME = "PlotKit.Layout";
PlotKit.Layout.VERSION = PlotKit.VERSION;

PlotKit.Layout.__repr__ = function() {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

PlotKit.Layout.toString = function() {
    return this.__repr__();
}

PlotKit.Layout.valid_styles = ["bar", "line", "pie", "point"];

PlotKit.Layout = function(style, options) {
    
    this.options = {};

    this.style = style; 
    MochiKit.Base.update(this.options, options ? options : {});

    if (!MochiKit.Base.isUndefinedOrNull(this.options.xAxis)) {
        this.minxval = this.options.xAxis[0];
        this.maxxval = this.options.xAxis[1];
        this.xscale = this.maxxval - this.minxval; 
    }
    else {
        this.minxval = 0;
        this.maxxval = null;
        this.xscale = null; // val -> pos factor (eg, xval * xscale = xpos)
    }

    this.slices = new Array(); // array of slices to draw for pie charts
    this.xticks = new Array();

    // internal states
    this.datasets = new Array();
    this.minxdelta = 0;
    this.xrange = 1;

    this.hitTestCache = {x2maxy: null};
    
};

PlotKit.Layout.prototype.addDataset = function(setname, set_xy) {
    this.datasets[setname] = set_xy;
};

PlotKit.Layout.prototype.removeDataset = function(setname, set_xy) {
    this.datasets[setname] = null;
};

PlotKit.Layout.prototype.evaluate = function() {
    this._evaluateLimits();
    this._evaluateScales();
    if (this.style == "pie") {
        this._evaluatePieCharts();
        this._evaluatePieTicks();
    }
};
PlotKit.Layout.prototype.hitTest = function(x, y) {

    var f = MochiKit.Format.twoDigitFloat;

    if (this.style == "pie") {
        var dist = Math.sqrt((y-0.5)*(y-0.5) + (x-0.5)*(x-0.5));
        if (dist > this.options.pieRadius)
            return null;

        var angle = Math.atan2(y - 0.5, x - 0.5) - Math.PI/2;
        for (var i = 0; i < this.slices.length; i++) {
            var slice = this.slices[i];
            if (slice.startAngle < angle && slice.endAngle >= angle)
                return slice;
        }
    }
    return null;
};

PlotKit.Layout.prototype.rectForX = function(x) {
    return null;
};

PlotKit.Layout.prototype.angleRangeForX = function(x) {
    return null;
};

PlotKit.Layout.prototype._evaluateLimits = function() {
    // take all values from all datasets and find max and min
    var map = MochiKit.Base.map;
    var items = MochiKit.Base.items;
    var itemgetter = MochiKit.Base.itemgetter;
    var collapse = PlotKit.Base.collapse;
    var listMin = MochiKit.Base.listMin;
    var listMax = MochiKit.Base.listMax;
    var isNil = MochiKit.Base.isUndefinedOrNull;

    var all = collapse(map(itemgetter(1), items(this.datasets)));

    if (isNil(this.options.xAxis)) {
        if (this.options.xOriginIsZero)
            this.minxval = 0;
        else
            this.minxval = listMin(map(parseFloat, map(itemgetter(0), all)));
    }
    this.maxxval = listMax(map(parseFloat, map(itemgetter(0), all)));
};

PlotKit.Layout.prototype._evaluateScales = function() {
    var isNil = MochiKit.Base.isUndefinedOrNull;

    this.xrange = this.maxxval - this.minxval;
    if (this.xrange == 0)
        this.xscale = 1.0;
    else
        this.xscale = 1/this.xrange;
};

PlotKit.Layout.prototype._uniqueXValues = function() {
    var collapse = PlotKit.Base.collapse;
    var map = MochiKit.Base.map;
    var uniq = PlotKit.Base.uniq;
    var getter = MochiKit.Base.itemgetter;

    var xvalues = map(parseFloat, map(getter(0), collapse(map(getter(1), items(this.datasets)))));
    xvalues.sort(MochiKit.Base.compare);
    return uniq(xvalues);
};

PlotKit.Layout.prototype._evaluatePieCharts = function() {
    var items = MochiKit.Base.items;
    var sum = MochiKit.Iter.sum;
    var getter = MochiKit.Base.itemgetter;

    var setCount = keys(this.datasets).length;

    var dataset = items(this.datasets)[0][1];
    var total = sum(map(getter(1), dataset));

    this.slices = new Array();
    var currentAngle = 0.0;
    for (var i = 0; i < dataset.length; i++) {
        var fraction = dataset[i][1] / total;
		var startAngle = currentAngle * Math.PI * 2;
		var endAngle = (currentAngle + fraction) * Math.PI * 2;
			
        var slice = {fraction: fraction,
                     xval: dataset[i][0],
                     yval: dataset[i][1],
                     startAngle: startAngle,
                     endAngle: endAngle
        };
        this.slices.push(slice);
        currentAngle += fraction;
    }
};

PlotKit.Layout.prototype._evaluateLineTicksForXAxis = function() {
    var isNil = MochiKit.Base.isUndefinedOrNull;
    
    if (this.options.xTicks) {

        this.xticks = new Array();
        var makeTicks = function(tick) {
            var label = tick.label;
            if (isNil(label))
                label = tick.v.toString();
            var pos = this.xscale * (tick.v - this.minxval);
            this.xticks.push([pos, label]);
        };
        MochiKit.Iter.forEach(this.options.xTicks, bind(makeTicks, this));
    }
    else if (this.options.xNumberOfTicks) {
        var xvalues = this._uniqueXValues();
        var roughSeparation = this.xrange / this.options.xNumberOfTicks;
        var tickCount = 0;

        this.xticks = new Array();
        for (var i = 0; i <= xvalues.length; i++) {
            if (xvalues[i] >= (tickCount) * roughSeparation) {
                var pos = this.xscale * (xvalues[i] - this.minxval);
                if ((pos > 1.0) || (pos < 0.0))
                    return;
                this.xticks.push([pos, xvalues[i]]);
                tickCount++;
            }
            if (tickCount > this.options.xNumberOfTicks)
                break;
        }
    }
};


PlotKit.Layout.prototype._evaluateLineTicks = function() {
    this._evaluateLineTicksForXAxis();
};

PlotKit.Layout.prototype._evaluateBarTicks = function() {
    this._evaluateLineTicks();
    var centerInBar = function(tick) {
        return [tick[0] + (this.minxdelta * this.xscale)/2, tick[1]];
    };
    this.xticks = MochiKit.Base.map(bind(centerInBar, this), this.xticks);
};

PlotKit.Layout.prototype._evaluatePieTicks = function() {
    var isNil = MochiKit.Base.isUndefinedOrNull;
	var formatter = MochiKit.Format.numberFormatter("#%");

    this.xticks = new Array();
	if (this.options.xTicks) {
		var lookup = new Array();
		for (var i = 0; i < this.slices.length; i++) {
			lookup[this.slices[i].xval] = this.slices[i];
		}
		
		for (var i =0; i < this.options.xTicks.length; i++) {
			var tick = this.options.xTicks[i];
			var slice = lookup[tick.v]; 
            var label = tick.label;
			if (slice) {
                if (isNil(label))
                    label = tick.v.toString();
				label += " (" + formatter(slice.fraction) + ")";
				this.xticks.push([tick.v, label]);
			}
		}
	}
	else {
		for (var i =0; i < this.slices.length; i++) {
			var slice = this.slices[i];
			var label = slice.xval + " (" + formatter(slice.fraction) + ")";
			this.xticks.push([slice.xval, label]);
		}
	}
};

if (typeof(PlotKit.CanvasRenderer) == 'undefined') {
    PlotKit.CanvasRenderer = {};
}

PlotKit.CanvasRenderer.NAME = "PlotKit.CanvasRenderer";
PlotKit.CanvasRenderer.VERSION = PlotKit.VERSION;

PlotKit.CanvasRenderer.__repr__ = function() {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

PlotKit.CanvasRenderer.toString = function() {
    return this.__repr__();
}

PlotKit.CanvasRenderer = function(element, layout, options) {
    if (arguments.length  > 0)
        this.__init__(element, layout, options);
};

PlotKit.CanvasRenderer.prototype.__init__ = function(element, layout, options) {
    var isNil = MochiKit.Base.isUndefinedOrNull;
    var Color = MochiKit.Color.Color;
    
    this.options = {};
    MochiKit.Base.update(this.options, options ? options : {});

    this.element_id = element.id ? element.id : element;


    this.layout = layout;
    this.style = layout.style;
    this.element = MochiKit.DOM.getElement(this.element_id);
    this.container = this.element.parentNode;
    this.height = this.element.height;
    this.width = this.element.width;
    this.xlabels = new Array();
    this.isFirstRender = true;

    this.area = {
        x: this.options.padding.left,
        y: this.options.padding.top,
        w: this.width - this.options.padding.left - this.options.padding.right,
        h: this.height - this.options.padding.top - this.options.padding.bottom
    };

    MochiKit.DOM.updateNodeAttributes(this.container, 
    {"style":{ "position": "relative", "width": this.width + "px"}});
};

PlotKit.CanvasRenderer.prototype.render = function() {
    if (this.options.drawBackground)
        this._renderBackground();

    if (this.style == "pie") {
        this._renderPieChart();
		this._renderPieAxis();
	}
};

PlotKit.CanvasRenderer.prototype._renderPieChart = function() {
    var context = this.element.getContext("2d");
    var colorCount = this.options.colorScheme.length;
    var slices = this.layout.slices;

    var centerx = this.area.x + this.area.w * 0.5;
    var centery = this.area.y + this.area.h * 0.5;
    var radius = Math.min(this.area.w * this.options.pieRadius, 
                          this.area.h * this.options.pieRadius);

    for (var i = 0; i < slices.length; i++) {
        var color = this.options.colorScheme[i%colorCount];
        context.save();
        context.fillStyle = color.toRGBString();

        var makePath = function() {
            context.beginPath();
            context.moveTo(centerx, centery);
            context.arc(centerx, centery, radius, 
                        slices[i].startAngle - Math.PI/2,
                        slices[i].endAngle - Math.PI/2,
                        false);
            context.lineTo(centerx, centery);
            context.closePath();
        };

        if (Math.abs(slices[i].startAngle - slices[i].endAngle) > 0.001) {
            if (this.options.shouldFill) {
                makePath();
                context.fill();
            }
            
            if (this.options.shouldStroke) {
                makePath();
                context.lineWidth = this.options.strokeWidth;
                if (this.options.strokeColor)
                    context.strokeStyle = this.options.strokeColor.toRGBString();
                else if (this.options.strokeColorTransform)
                    context.strokeStyle = color[this.options.strokeColorTransform]().toRGBString();
                context.stroke();
            }
        }
        context.restore();
    }
};

PlotKit.CanvasRenderer.prototype._renderBarAxis = function() {
	this._renderAxis();
}

PlotKit.CanvasRenderer.prototype._renderLineAxis = function() {
	this._renderAxis();
};


PlotKit.CanvasRenderer.prototype._renderAxis = function() {
    if (!this.options.drawXAxis && !this.options.drawYAxis)
        return;

    var context = this.element.getContext("2d");

    var labelStyle = {"style":
         {"position": "absolute",
          "fontSize": this.options.axisLabelFontSize + "px",
          "zIndex": 10,
          "color": this.options.axisLabelColor.toRGBString(),
          "width": this.options.axisLabelWidth + "px",
          "overflow": "hidden"
         }
    };

    context.save();
    context.strokeStyle = this.options.axisLineColor.toRGBString();
    context.lineWidth = this.options.axisLineWidth;


    if (this.options.drawYAxis) {
        if (this.layout.yticks) {
            var drawTick = function(tick) {
                var x = this.area.x;
                var y = this.area.y + tick[0] * this.area.h;
                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(x - this.options.axisTickSize, y);
                context.closePath();
                context.stroke();

                var label = DIV(labelStyle, tick[1]);
                label.style.top = (y - this.options.axisLabelFontSize) + "px";
                label.style.left = (x - this.options.padding.left - this.options.axisTickSize) + "px";
                label.style.textAlign = "right";
                label.style.width = (this.options.padding.left - this.options.axisTickSize * 2) + "px";
                MochiKit.DOM.appendChildNodes(this.container, label);
                this.ylabels.push(label);
            };
            
            MochiKit.Iter.forEach(this.layout.yticks, bind(drawTick, this));
        }

        context.beginPath();
        context.moveTo(this.area.x, this.area.y);
        context.lineTo(this.area.x, this.area.y + this.area.h);
        context.closePath();
        context.stroke();
    }

    context.restore();

};

PlotKit.CanvasRenderer.prototype._renderPieAxis = function() {
    if (!this.options.drawXAxis)
        return;

	if (this.layout.xticks) {
		var lookup = new Array();
		for (var i = 0; i < this.layout.slices.length; i++) {
			lookup[this.layout.slices[i].xval] = this.layout.slices[i];
		}
		
		var centerx = this.area.x + this.area.w * 0.5;
	    var centery = this.area.y + this.area.h * 0.5;
	    var radius = Math.min(this.area.w * this.options.pieRadius,
	                          this.area.h * this.options.pieRadius);
		var labelWidth = this.options.axisLabelWidth;
		
		for (var i = 0; i < this.layout.xticks.length; i++) {
			var slice = lookup[this.layout.xticks[i][0]];
			if (MochiKit.Base.isUndefinedOrNull(slice))
				continue;
				
				
			var angle = (slice.startAngle + slice.endAngle)/2;
			var normalisedAngle = angle;
			if (normalisedAngle > Math.PI * 2)
				normalisedAngle = normalisedAngle - Math.PI * 2;
			else if (normalisedAngle < 0)
				normalisedAngle = normalisedAngle + Math.PI * 2;
				
			var labelx = centerx + Math.sin(normalisedAngle) * (radius + 10);
	        var labely = centery - Math.cos(normalisedAngle) * (radius + 10);

			var attrib = {"position": "absolute",
	                      "zIndex": 11,
	                      "width": labelWidth + "px",
	                      "fontSize": this.options.axisLabelFontSize + "px",
	                      "overflow": "hidden",
						  "color": this.options.axisLabelColor.toHexString()
						};

			if (normalisedAngle <= Math.PI * 0.5) {
	            attrib["textAlign"] = "left";
	            attrib["verticalAlign"] = "top";
	            attrib["left"] = labelx + "px";
	            attrib["top"] = (labely - this.options.axisLabelFontSize) + "px";
	        }
	        else if ((normalisedAngle > Math.PI * 0.5) && (normalisedAngle <= Math.PI)) {
	            attrib["textAlign"] = "left";
	            attrib["verticalAlign"] = "bottom";     
	            attrib["left"] = labelx + "px";
	            attrib["top"] = labely + "px";

	        }
	        else if ((normalisedAngle > Math.PI) && (normalisedAngle <= Math.PI*1.5)) {
	            attrib["textAlign"] = "right";
	            attrib["verticalAlign"] = "bottom"; 
	            attrib["left"] = (labelx  - labelWidth) + "px";
	            attrib["top"] = labely + "px";
	        }
	        else {
	            attrib["textAlign"] = "right";
	            attrib["verticalAlign"] = "bottom";  
	            attrib["left"] = (labelx  - labelWidth) + "px";
	            attrib["top"] = (labely - this.options.axisLabelFontSize) + "px";
	        }
	            //Add_Labels
			//var label = DIV({'style': attrib}, this.layout.xticks[i][1]);
                  var label = document.createElement('div');
                  var style = 'position:'+attrib.position+';z-index:'+attrib.zIndex+';width:'+attrib.width+';left:'+attrib.left;
                  style += ';font-size:'+attrib.fontSize+';overflow:'+attrib.overflow+';color:'+attrib.color;
                  style += ';top:'+attrib.top+';text-align:'+attrib.textAlign+';vertical-align:'+attrib.verticalAlign+';';
                  label.setAttribute('style', style);
                  label.innerHTML = this.layout.xticks[i][1];
			this.xlabels.push(label);
			MochiKit.DOM.appendChildNodes(this.container, label);
	  }
		
	}
};

PlotKit.CanvasRenderer.prototype._renderBackground = function() {
    var context = this.element.getContext("2d");
    context.save();
    context.fillStyle = this.options.backgroundColor.toRGBString();
    context.fillRect(0, 0, this.width, this.height);
    context.restore();
};

PlotKit.CanvasRenderer.prototype.clear = function() {
    var context = this.element.getContext("2d");
    context.clearRect(0, 0, this.width, this.height);

    
    for (var i = 0; i < this.xlabels.length; i++) {
        MochiKit.DOM.removeElement(this.xlabels[i]);
    }        
    this.xlabels = new Array();    
};

PlotKit.CanvasRenderer.prototype._resolveObject = function(e) {
    var x = (e.mouse().page.x - PlotKit.Base.findPosX(this.element) - this.area.x) / this.area.w;
    var y = (e.mouse().page.y - PlotKit.Base.findPosY(this.element) - this.area.y) / this.area.h;
    var isHit = this.layout.hitTest(x, y);
    if (isHit)
        return isHit;
    return null;
};

PlotKit.CanvasRenderer.prototype._createEventObject = function(layoutObj, e) {
    if (layoutObj == null) {
        return null;
    }

    e.chart = layoutObj
    return e;
};



PlotKit.CanvasRenderer.isSupported = function(canvasName) {
    var canvas = null;
    try {
        if (MochiKit.Base.isUndefinedOrNull(canvasName)) 
            canvas = MochiKit.DOM.CANVAS({});
        else
            canvas = MochiKit.DOM.getElement(canvasName);
        var context = canvas.getContext("2d");
    }
    catch (e) {
        var ie = navigator.appVersion.match(/MSIE (\d\.\d)/);
        var opera = (navigator.userAgent.toLowerCase().indexOf("opera") != -1);
        if ((!ie) || (ie[1] < 6) || (opera))
            return false;
        return true;
    }
    return true;
};
if (typeof(PlotKit.SweetCanvasRenderer) == 'undefined') {
    PlotKit.SweetCanvasRenderer = {};
}

PlotKit.SweetCanvasRenderer = function(element, layout, options) {
    if (arguments.length > 0) {
        this.__init__(element, layout, options);
    }
};

PlotKit.SweetCanvasRenderer.NAME = "PlotKit.SweetCanvasRenderer";
PlotKit.SweetCanvasRenderer.VERSION = PlotKit.VERSION;

PlotKit.SweetCanvasRenderer.__repr__ = function() {
    return "[" + this.NAME + " " + this.VERSION + "]";
};

PlotKit.SweetCanvasRenderer.toString = function() {
    return this.__repr__();
};
PlotKit.SweetCanvasRenderer.prototype = new PlotKit.CanvasRenderer();
PlotKit.SweetCanvasRenderer.prototype.constructor = PlotKit.SweetCanvasRenderer;
PlotKit.SweetCanvasRenderer.__super__ = PlotKit.CanvasRenderer.prototype;
PlotKit.SweetCanvasRenderer.prototype.__init__ = function(el, layout, opts) { 
    var moreOpts = PlotKit.Base.officeBlue();
    MochiKit.Base.update(moreOpts, opts);
    PlotKit.SweetCanvasRenderer.__super__.__init__.call(this, el, layout, moreOpts);
};
PlotKit.SweetCanvasRenderer.prototype._renderBarChart = function() {
    var bind = MochiKit.Base.bind;
    var shadowColor = Color.blackColor().colorWithAlpha(0.1).toRGBString();

    var prepareFakeShadow = function(context, x, y, w, h) {
        context.fillStyle = shadowColor;
        context.fillRect(x-2, y-2, w+4, h+2); 
        context.fillStyle = shadowColor;
        context.fillRect(x-1, y-1, w+2, h+1); 
    };

    var colorCount = this.options.colorScheme.length;
    var colorScheme =  this.options.colorScheme;
    var setNames = MochiKit.Base.keys(this.layout.datasets);
    var setCount = setNames.length;

    var chooseColor = function(name) {
        for (var i = 0; i < setCount; i++) {
            if (name == setNames[i])
                return colorScheme[i%colorCount];
        }
        return colorScheme[0];
    };

    var drawRect = function(context, bar) {
        var x = this.area.w * bar.x + this.area.x;
        var y = this.area.h * bar.y + this.area.y;
        var w = this.area.w * bar.w;
        var h = this.area.h * bar.h;

        if ((w < 1) || (h < 1))
            return;        

        context.save();

        context.shadowBlur = 5.0;
        context.shadowColor = Color.fromHexString("#888888").toRGBString();

        prepareFakeShadow(context, x, y, w, h);

        context.fillStyle = chooseColor(bar.name).toRGBString();
        context.fillRect(x, y, w, h);

        context.shadowBlur = 0;
        context.strokeStyle = Color.whiteColor().toRGBString();
        context.lineWidth = 2.0;

        context.strokeRect(x, y, w, h);                

        context.restore();

    };
    this._renderBarChartWrap(this.layout.bars, bind(drawRect, this));
};


PlotKit.CanvasRenderer.prototype._renderPieChart = function() {
    var context = this.element.getContext("2d");

    var colorCount = this.options.colorScheme.length;
    var slices = this.layout.slices;

    var centerx = this.area.x + this.area.w * 0.5;
    var centery = this.area.y + this.area.h * 0.5;
    var radius = Math.min(this.area.w * this.options.pieRadius, 
                          this.area.h * this.options.pieRadius);

    if (this.isIE) {
        centerx = parseInt(centerx);
        centery = parseInt(centery);
        radius = parseInt(radius);
    }
        context.save();
        var shadowColor = Color.blackColor().colorWithAlpha(0.2);
        context.fillStyle = shadowColor.toRGBString();
        context.shadowBlur = 5.0;
        context.shadowColor = Color.fromHexString("#888888").toRGBString();
        context.translate(1, 1);
        context.beginPath();
        context.moveTo(centerx, centery);
        context.arc(centerx, centery, radius + 2, 0, Math.PI*2, false);
        context.closePath();
        context.fill();
        context.restore();

    context.save();
    context.strokeStyle = Color.whiteColor().toRGBString();
    context.lineWidth = 2.0;    
    for (var i = 0; i < slices.length; i++) {
        var color = this.options.colorScheme[i%colorCount];
        context.fillStyle = color.toRGBString();

        var makePath = function() {
            context.beginPath();
            context.moveTo(centerx, centery);
            context.arc(centerx, centery, radius, 
                        slices[i].startAngle - Math.PI/2,
                        slices[i].endAngle - Math.PI/2,
                        false);
            context.lineTo(centerx, centery);
            context.closePath();
        };

        if (Math.abs(slices[i].startAngle - slices[i].endAngle) > 0.0001) {
            makePath();
            context.fill();
            makePath();
            context.stroke();
        }
    }
    context.restore();
};

PlotKit.SweetCanvasRenderer.prototype._renderBackground = function() {
    var context = this.element.getContext("2d");
   
    if (this.layout.style == "bar" || this.layout.style == "line") {
        context.save();
        context.fillStyle = this.options.backgroundColor.toRGBString();
        context.fillRect(this.area.x, this.area.y, this.area.w, this.area.h);
        context.strokeStyle = Color.whiteColor().toRGBString();
        context.lineWidth = 1.0;
        for (var i = 0; i < this.layout.yticks.length; i++) {
            var y = this.layout.yticks[i][0] * this.area.h + this.area.y;
            var x = this.area.x;
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x + this.area.w, y);
            context.closePath();
            context.stroke();
        }
        context.restore();
    }
    else {
        PlotKit.SweetCanvasRenderer.__super__._renderBackground.call(this);
    }
};

//------------------------------------------------------------------------------------------------

// The following code is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

//---Get the polldiv---
divs = document.getElementsByTagName('div');

polldivs = new Array();
for ( i = 0; i < divs.length; i++ ) {
   if ( divs[i].getAttribute('class') ) {
      if ( divs[i].getAttribute('class').indexOf('gr-genericbox') != -1 ) {
         polldivs[polldivs.length] = divs[i];
      }
   }
}

polldiv = polldivs[0];
polltablecell = polldiv.getElementsByTagName('td')[0];


//---PiegraphOptions-Function---
function setPieGraphOptions() {
   //---Get the votes and options---
   polltext = polltablecell.textContent;
   pollvotes = polltext.match(/\d*,?\d+\s+deviants/g)
   //alert(pollvotes);

   for ( i = 0; i < pollvotes.length; i++) {
      pollvotes[i] = parseInt(pollvotes[i].replace(",","").match(/\d+/));
   }
   
   //alert(pollvotes);
   
   polloptionelements = polltablecell.getElementsByTagName('strong');
   polloptions = new Array();

   for ( i = 0; i < polloptionelements.length; i++) {
      polloptions[i] = polloptionelements[i].innerHTML + " [" + pollvotes[i] + " deviants]";
   }

//DEBUG:
//document.getElementsByTagName('body')[0].appendChild(document.createTextNode(pollvotes + "\n" + polloptions));

   //---Create div+canvas for the piegraph---
   polltablecell.innerHTML = "";
   newCell = polltablecell;
   newdiv = newCell.appendChild(document.createElement('div'));
   newdiv.setAttribute('style', 'margin-left: 50px;');
   newcanvas = newdiv.appendChild(document.createElement('canvas'));
   newcanvas.setAttribute('height','300px');
   newcanvas.setAttribute('width','300px');
   newcanvas.setAttribute('id','piegraph');

   //---Format the votes and options---
   votesArray = new Array();
   for ( i = 0; i < pollvotes.length; i++) {
      votesArray[i] = new Array(i, pollvotes[i]);
   }

   optionsArray = new Array();
   for ( i = 0; i < polloptions.length; i++) {
      optionsArray[i] = {v: i, label: polloptions[i]};
   }

//DEBUG:
//document.getElementsByTagName('body')[0].appendChild(document.createTextNode(votesArray + "\n" + optionsArray));

   chartColors = new Array('#FF530A');

   if (chartColors.length < 2) {
      chartColors = PlotKit.Base.palette(MochiKit.Color.Color.fromHexString(chartColors[0]));
   }
   else {
      for ( i = 0; i < chartColors.length; i++ ) {
         chartColors[i] = MochiKit.Color.Color.fromHexString(chartColors[i]);
      }
   }

   //---Options for the piegraph---
   options = {
      "colorScheme": chartColors, 
      "xTicks": optionsArray,
      "drawYAxis": false,
      "pieRadius": 0.5,
      "xTickPrecision": 1,
      "xOriginIsZero": true,
      "xNumberOfTicks": 2,
      "drawBackground": false,
      "shouldFill": true,
      "shouldStroke": true,
      "drawXAxis": true,
      "padding": {left: 30, right: 30, top: 15, bottom: 15},
      "strokeWidth": 0.5,
      "axisLineWidth": 0.5,
      "axisLabelFont": "Arial",
      "axisLabelFontSize": 9,
      "axisLabelWidth": 200,
      "enableEvents": true,
   };
}

//---Set the options---
try {
   setPieGraphOptions();
}
catch (e) {
   possibleVoteButton = polltablecell.getElementsByTagName('input');
   for ( i = 0; i < possibleVoteButton.length; i++ ) {
      if ( possibleVoteButton[i].getAttribute('class') == 'ibutton' ) { voteButton = possibleVoteButton[i]; }
   }
   voteButton.addEventListener('click', function(){window.setTimeout(function(){setPieGraphOptions();drawPieGraph()}, 4000)}, false);
}

//---Piegraph-Function---
function drawPieGraph() {
   var layout = new PlotKit.Layout("pie", options);
   layout.addDataset("sqrt", votesArray);
   layout.evaluate();
   var canvas = MochiKit.DOM.getElement("piegraph");
   var plotter = new PlotKit.SweetCanvasRenderer(canvas, layout, options);
   plotter.render();
}

//---Draw the piegraph
try {
   drawPieGraph();
}
catch (e) {
   //probably: options not set yet...
}