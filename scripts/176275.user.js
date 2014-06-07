// ==UserScript==
// @name                Sexpcode support
// @namespace           http://userscripts.org/users/529203
// @description	        A Sexpcode to BBCode translator. You don't deserve this.
// @include		http://dis.4chan.org/*
// @run-at              document-end
// @version             1
// ==/UserScript==
function e(a) {
  throw a;
}
var aa = void 0, g = !0, k = null, l = !1;
function ba() {
  return function(a) {
    return a
  }
}
function n(a) {
  return function() {
    return this[a]
  }
}
function da(a) {
  return function() {
    return a
  }
}
var p, ea = this;
function fa(a, b) {
  var c = a.split("."), d = ea;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var f;c.length && (f = c.shift());) {
    !c.length && b !== aa ? d[f] = b : d = d[f] ? d[f] : d[f] = {}
  }
}
function q(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function ga(a) {
  return"string" == typeof a
}
var ha = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ia = 0;
function ja(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= 4294967296
  }
  return b
}
;function ka(a, b) {
  var c = Array.prototype.slice.call(arguments), d = c.shift();
  "undefined" == typeof d && e(Error("[goog.string.format] Template required"));
  return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, j, m, u, x, E) {
    if("%" == u) {
      return"%"
    }
    var G = c.shift();
    "undefined" == typeof G && e(Error("[goog.string.format] Not enough arguments"));
    arguments[0] = G;
    return ka.ga[u].apply(k, arguments)
  })
}
ka.ga = {};
ka.ga.s = function(a, b, c) {
  return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + Array(c - a.length + 1).join(" ") : Array(c - a.length + 1).join(" ") + a
};
ka.ga.f = function(a, b, c, d, f) {
  d = a.toString();
  isNaN(f) || "" == f || (d = a.toFixed(f));
  var h;
  h = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
  0 <= a && (d = h + d);
  if(isNaN(c) || d.length >= c) {
    return d
  }
  d = isNaN(f) ? Math.abs(a).toString() : Math.abs(a).toFixed(f);
  a = c - d.length - h.length;
  return d = 0 <= b.indexOf("-", 0) ? h + d + Array(a + 1).join(" ") : h + Array(a + 1).join(0 <= b.indexOf("0", 0) ? "0" : " ") + d
};
ka.ga.d = function(a, b, c, d, f, h, i, j) {
  return ka.ga.f(parseInt(a, 10), b, c, d, 0, h, i, j)
};
ka.ga.i = ka.ga.d;
ka.ga.u = ka.ga.d;
function ma(a, b) {
  a != k && this.append.apply(this, arguments)
}
ma.prototype.za = "";
ma.prototype.append = function(a, b, c) {
  this.za += a;
  if(b != k) {
    for(var d = 1;d < arguments.length;d++) {
      this.za += arguments[d]
    }
  }
  return this
};
ma.prototype.toString = n("za");
var na;
fa("cljs.core.set_print_fn_BANG_", ba());
function oa() {
  return pa(["\ufdd0:flush-on-newline", g, "\ufdd0:readably", g, "\ufdd0:meta", l, "\ufdd0:dup", l], g)
}
function r(a) {
  return a != k && a !== l
}
function s(a, b) {
  return a === b
}
function qa(a) {
  return a == k
}
function ra(a) {
  return r(a) ? l : g
}
function sa(a) {
  var b = ga(a);
  return b ? "\ufdd0" !== a.charAt(0) : b
}
function t(a, b) {
  return a[q(b == k ? k : b)] ? g : a._ ? g : l
}
function ta(a) {
  return a == k ? k : a.constructor
}
function v(a, b) {
  var c = ta(b), c = r(r(c) ? c.tb : c) ? c.Fb : q(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""))
}
var ua = {}, va = {};
function wa(a) {
  if(a ? a.G : a) {
    return a.G(a)
  }
  var b;
  var c = wa[q(a == k ? k : a)];
  c ? b = c : (c = wa._) ? b = c : e(v("ICounted.-count", a));
  return b.call(k, a)
}
function xa(a, b) {
  if(a ? a.D : a) {
    return a.D(a, b)
  }
  var c;
  var d = xa[q(a == k ? k : a)];
  d ? c = d : (d = xa._) ? c = d : e(v("ICollection.-conj", a));
  return c.call(k, a, b)
}
var ya = {}, w, Aa = k;
function Ba(a, b) {
  if(a ? a.S : a) {
    return a.S(a, b)
  }
  var c;
  var d = w[q(a == k ? k : a)];
  d ? c = d : (d = w._) ? c = d : e(v("IIndexed.-nth", a));
  return c.call(k, a, b)
}
function Ca(a, b, c) {
  if(a ? a.ba : a) {
    return a.ba(a, b, c)
  }
  var d;
  var f = w[q(a == k ? k : a)];
  f ? d = f : (f = w._) ? d = f : e(v("IIndexed.-nth", a));
  return d.call(k, a, b, c)
}
Aa = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Ba.call(this, a, b);
    case 3:
      return Ca.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Aa.a = Ba;
Aa.c = Ca;
w = Aa;
var Da = {};
function y(a) {
  if(a ? a.T : a) {
    return a.T(a)
  }
  var b;
  var c = y[q(a == k ? k : a)];
  c ? b = c : (c = y._) ? b = c : e(v("ISeq.-first", a));
  return b.call(k, a)
}
function z(a) {
  if(a ? a.U : a) {
    return a.U(a)
  }
  var b;
  var c = z[q(a == k ? k : a)];
  c ? b = c : (c = z._) ? b = c : e(v("ISeq.-rest", a));
  return b.call(k, a)
}
var Ea = {}, Fa, Ga = k;
function Ha(a, b) {
  if(a ? a.H : a) {
    return a.H(a, b)
  }
  var c;
  var d = Fa[q(a == k ? k : a)];
  d ? c = d : (d = Fa._) ? c = d : e(v("ILookup.-lookup", a));
  return c.call(k, a, b)
}
function Ia(a, b, c) {
  if(a ? a.v : a) {
    return a.v(a, b, c)
  }
  var d;
  var f = Fa[q(a == k ? k : a)];
  f ? d = f : (f = Fa._) ? d = f : e(v("ILookup.-lookup", a));
  return d.call(k, a, b, c)
}
Ga = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Ha.call(this, a, b);
    case 3:
      return Ia.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Ga.a = Ha;
Ga.c = Ia;
Fa = Ga;
function Ja(a, b) {
  if(a ? a.Ka : a) {
    return a.Ka(a, b)
  }
  var c;
  var d = Ja[q(a == k ? k : a)];
  d ? c = d : (d = Ja._) ? c = d : e(v("IAssociative.-contains-key?", a));
  return c.call(k, a, b)
}
function Ka(a, b, c) {
  if(a ? a.M : a) {
    return a.M(a, b, c)
  }
  var d;
  var f = Ka[q(a == k ? k : a)];
  f ? d = f : (f = Ka._) ? d = f : e(v("IAssociative.-assoc", a));
  return d.call(k, a, b, c)
}
var La = {};
function Ma(a, b) {
  if(a ? a.ea : a) {
    return a.ea(a, b)
  }
  var c;
  var d = Ma[q(a == k ? k : a)];
  d ? c = d : (d = Ma._) ? c = d : e(v("IMap.-dissoc", a));
  return c.call(k, a, b)
}
var Na = {};
function Oa(a) {
  if(a ? a.mb : a) {
    return a.mb(a)
  }
  var b;
  var c = Oa[q(a == k ? k : a)];
  c ? b = c : (c = Oa._) ? b = c : e(v("IMapEntry.-key", a));
  return b.call(k, a)
}
function Pa(a) {
  if(a ? a.nb : a) {
    return a.nb(a)
  }
  var b;
  var c = Pa[q(a == k ? k : a)];
  c ? b = c : (c = Pa._) ? b = c : e(v("IMapEntry.-val", a));
  return b.call(k, a)
}
var Qa = {}, Ra = {};
function Sa(a) {
  if(a ? a.yb : a) {
    return a.state
  }
  var b;
  var c = Sa[q(a == k ? k : a)];
  c ? b = c : (c = Sa._) ? b = c : e(v("IDeref.-deref", a));
  return b.call(k, a)
}
var Ta = {};
function Ua(a) {
  if(a ? a.I : a) {
    return a.I(a)
  }
  var b;
  var c = Ua[q(a == k ? k : a)];
  c ? b = c : (c = Ua._) ? b = c : e(v("IMeta.-meta", a));
  return b.call(k, a)
}
var Va = {};
function Wa(a, b) {
  if(a ? a.K : a) {
    return a.K(a, b)
  }
  var c;
  var d = Wa[q(a == k ? k : a)];
  d ? c = d : (d = Wa._) ? c = d : e(v("IWithMeta.-with-meta", a));
  return c.call(k, a, b)
}
var Xa = {}, Ya, $a = k;
function ab(a, b) {
  if(a ? a.Aa : a) {
    return a.Aa(a, b)
  }
  var c;
  var d = Ya[q(a == k ? k : a)];
  d ? c = d : (d = Ya._) ? c = d : e(v("IReduce.-reduce", a));
  return c.call(k, a, b)
}
function bb(a, b, c) {
  if(a ? a.Ba : a) {
    return a.Ba(a, b, c)
  }
  var d;
  var f = Ya[q(a == k ? k : a)];
  f ? d = f : (f = Ya._) ? d = f : e(v("IReduce.-reduce", a));
  return d.call(k, a, b, c)
}
$a = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return ab.call(this, a, b);
    case 3:
      return bb.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
$a.a = ab;
$a.c = bb;
Ya = $a;
function cb(a, b) {
  if(a ? a.B : a) {
    return a.B(a, b)
  }
  var c;
  var d = cb[q(a == k ? k : a)];
  d ? c = d : (d = cb._) ? c = d : e(v("IEquiv.-equiv", a));
  return c.call(k, a, b)
}
function db(a) {
  if(a ? a.C : a) {
    return a.C(a)
  }
  var b;
  var c = db[q(a == k ? k : a)];
  c ? b = c : (c = db._) ? b = c : e(v("IHash.-hash", a));
  return b.call(k, a)
}
function eb(a) {
  if(a ? a.J : a) {
    return a.J(a)
  }
  var b;
  var c = eb[q(a == k ? k : a)];
  c ? b = c : (c = eb._) ? b = c : e(v("ISeqable.-seq", a));
  return b.call(k, a)
}
var fb = {}, gb = {};
function hb(a) {
  if(a ? a.eb : a) {
    return a.eb(a)
  }
  var b;
  var c = hb[q(a == k ? k : a)];
  c ? b = c : (c = hb._) ? b = c : e(v("IReversible.-rseq", a));
  return b.call(k, a)
}
function A(a, b) {
  if(a ? a.sb : a) {
    return a.sb(0, b)
  }
  var c;
  var d = A[q(a == k ? k : a)];
  d ? c = d : (d = A._) ? c = d : e(v("IWriter.-write", a));
  return c.call(k, a, b)
}
function ib(a) {
  if(a ? a.Db : a) {
    return k
  }
  var b;
  var c = ib[q(a == k ? k : a)];
  c ? b = c : (c = ib._) ? b = c : e(v("IWriter.-flush", a));
  return b.call(k, a)
}
function jb(a, b, c) {
  if(a ? a.rb : a) {
    return a.rb(a, b, c)
  }
  var d;
  var f = jb[q(a == k ? k : a)];
  f ? d = f : (f = jb._) ? d = f : e(v("IWatchable.-notify-watches", a));
  return d.call(k, a, b, c)
}
function kb(a) {
  if(a ? a.ra : a) {
    return a.ra(a)
  }
  var b;
  var c = kb[q(a == k ? k : a)];
  c ? b = c : (c = kb._) ? b = c : e(v("IEditableCollection.-as-transient", a));
  return b.call(k, a)
}
function lb(a, b) {
  if(a ? a.ua : a) {
    return a.ua(a, b)
  }
  var c;
  var d = lb[q(a == k ? k : a)];
  d ? c = d : (d = lb._) ? c = d : e(v("ITransientCollection.-conj!", a));
  return c.call(k, a, b)
}
function mb(a) {
  if(a ? a.Ca : a) {
    return a.Ca(a)
  }
  var b;
  var c = mb[q(a == k ? k : a)];
  c ? b = c : (c = mb._) ? b = c : e(v("ITransientCollection.-persistent!", a));
  return b.call(k, a)
}
function nb(a, b, c) {
  if(a ? a.ta : a) {
    return a.ta(a, b, c)
  }
  var d;
  var f = nb[q(a == k ? k : a)];
  f ? d = f : (f = nb._) ? d = f : e(v("ITransientAssociative.-assoc!", a));
  return d.call(k, a, b, c)
}
function ob(a) {
  if(a ? a.jb : a) {
    return a.jb()
  }
  var b;
  var c = ob[q(a == k ? k : a)];
  c ? b = c : (c = ob._) ? b = c : e(v("IChunk.-drop-first", a));
  return b.call(k, a)
}
function pb(a) {
  if(a ? a.Qa : a) {
    return a.Qa(a)
  }
  var b;
  var c = pb[q(a == k ? k : a)];
  c ? b = c : (c = pb._) ? b = c : e(v("IChunkedSeq.-chunked-first", a));
  return b.call(k, a)
}
function qb(a) {
  if(a ? a.La : a) {
    return a.La(a)
  }
  var b;
  var c = qb[q(a == k ? k : a)];
  c ? b = c : (c = qb._) ? b = c : e(v("IChunkedSeq.-chunked-rest", a));
  return b.call(k, a)
}
function rb(a) {
  this.Kb = a;
  this.t = 0;
  this.j = 1073741824
}
rb.prototype.sb = function(a, b) {
  return this.Kb.append(b)
};
rb.prototype.Db = da(k);
function sb(a) {
  var b = new ma, c = new rb(b);
  a.F(a, c, oa());
  ib(c);
  return"" + B(b)
}
function C(a, b, c, d, f) {
  this.ya = a;
  this.name = b;
  this.oa = c;
  this.Ia = d;
  this.ub = f;
  this.t = 0;
  this.j = 2154168321
}
p = C.prototype;
p.F = function(a, b) {
  return A(b, this.oa)
};
p.qb = g;
p.C = function() {
  -1 === this.Ia && (this.Ia = tb.a ? tb.a(D.b ? D.b(this.ya) : D.call(k, this.ya), D.b ? D.b(this.name) : D.call(k, this.name)) : tb.call(k, D.b ? D.b(this.ya) : D.call(k, this.ya), D.b ? D.b(this.name) : D.call(k, this.name)));
  return this.Ia
};
p.K = function(a, b) {
  return new C(this.ya, this.name, this.oa, this.Ia, b)
};
p.I = n("ub");
var ub = k, ub = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Fa.c(b, this, k);
    case 3:
      return Fa.c(b, this, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
C.prototype.call = ub;
C.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
C.prototype.B = function(a, b) {
  return b instanceof C ? this.oa === b.oa : l
};
C.prototype.toString = n("oa");
function F(a) {
  if(a == k) {
    return k
  }
  var b;
  if(b = a) {
    b = (b = a.j & 8388608) ? b : a.Tb
  }
  if(b) {
    return a.J(a)
  }
  if(a instanceof Array || sa(a)) {
    return 0 === a.length ? k : new vb(a, 0)
  }
  if(t(Ea, a)) {
    return eb(a)
  }
  e(Error([B(a), B("is not ISeqable")].join("")))
}
function H(a) {
  if(a == k) {
    return k
  }
  var b;
  if(b = a) {
    b = (b = a.j & 64) ? b : a.fb
  }
  if(b) {
    return a.T(a)
  }
  a = F(a);
  return a == k ? k : y(a)
}
function I(a) {
  if(a != k) {
    var b;
    if(b = a) {
      b = (b = a.j & 64) ? b : a.fb
    }
    if(b) {
      return a.U(a)
    }
    a = F(a);
    return a != k ? z(a) : J
  }
  return J
}
function K(a) {
  if(a == k) {
    a = k
  }else {
    var b;
    if(b = a) {
      b = (b = a.j & 128) ? b : a.Rb
    }
    a = b ? a.na(a) : F(I(a))
  }
  return a
}
var L, wb = k;
function xb(a, b) {
  var c = a === b;
  return c ? c : cb(a, b)
}
function yb(a, b, c) {
  for(;;) {
    if(r(wb.a(a, b))) {
      if(K(c)) {
        a = b, b = H(c), c = K(c)
      }else {
        return wb.a(b, H(c))
      }
    }else {
      return l
    }
  }
}
function zb(a, b, c) {
  var d = k;
  2 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 2), 0));
  return yb.call(this, a, b, d)
}
zb.o = 2;
zb.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = I(a);
  return yb(b, c, a)
};
zb.g = yb;
wb = function(a, b, c) {
  switch(arguments.length) {
    case 1:
      return g;
    case 2:
      return xb.call(this, a, b);
    default:
      return zb.g(a, b, N(arguments, 2))
  }
  e(Error("Invalid arity: " + arguments.length))
};
wb.o = 2;
wb.k = zb.k;
wb.b = da(g);
wb.a = xb;
wb.g = zb.g;
L = wb;
db["null"] = da(0);
Qa["null"] = g;
va["null"] = g;
wa["null"] = da(0);
cb["null"] = function(a, b) {
  return b == k
};
Va["null"] = g;
Wa["null"] = da(k);
Ta["null"] = g;
Ua["null"] = da(k);
La["null"] = g;
Ma["null"] = da(k);
Date.prototype.B = function(a, b) {
  var c = b instanceof Date;
  return c ? a.toString() === b.toString() : c
};
db.number = function(a) {
  return Math.floor(a) % 2147483647
};
cb.number = function(a, b) {
  return a === b
};
db["boolean"] = function(a) {
  return a === g ? 1 : 0
};
Ta["function"] = g;
Ua["function"] = da(k);
ua["function"] = g;
db._ = function(a) {
  return a[ha] || (a[ha] = ++ia)
};
var Ab, Bb = k;
function Cb(a, b) {
  var c = wa(a);
  if(0 === c) {
    return b.z ? b.z() : b.call(k)
  }
  for(var d = w.a(a, 0), f = 1;;) {
    if(f < c) {
      d = b.a ? b.a(d, w.a(a, f)) : b.call(k, d, w.a(a, f)), f += 1
    }else {
      return d
    }
  }
}
function Db(a, b, c) {
  for(var d = wa(a), f = 0;;) {
    if(f < d) {
      c = b.a ? b.a(c, w.a(a, f)) : b.call(k, c, w.a(a, f)), f += 1
    }else {
      return c
    }
  }
}
function Eb(a, b, c, d) {
  for(var f = wa(a);;) {
    if(d < f) {
      c = b.a ? b.a(c, w.a(a, d)) : b.call(k, c, w.a(a, d)), d += 1
    }else {
      return c
    }
  }
}
Bb = function(a, b, c, d) {
  switch(arguments.length) {
    case 2:
      return Cb.call(this, a, b);
    case 3:
      return Db.call(this, a, b, c);
    case 4:
      return Eb.call(this, a, b, c, d)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Bb.a = Cb;
Bb.c = Db;
Bb.p = Eb;
Ab = Bb;
var Fb, Gb = k;
function Hb(a, b) {
  var c = a.length;
  if(0 === a.length) {
    return b.z ? b.z() : b.call(k)
  }
  for(var d = a[0], f = 1;;) {
    if(f < c) {
      d = b.a ? b.a(d, a[f]) : b.call(k, d, a[f]), f += 1
    }else {
      return d
    }
  }
}
function Ib(a, b, c) {
  for(var d = a.length, f = 0;;) {
    if(f < d) {
      c = b.a ? b.a(c, a[f]) : b.call(k, c, a[f]), f += 1
    }else {
      return c
    }
  }
}
function Jb(a, b, c, d) {
  for(var f = a.length;;) {
    if(d < f) {
      c = b.a ? b.a(c, a[d]) : b.call(k, c, a[d]), d += 1
    }else {
      return c
    }
  }
}
Gb = function(a, b, c, d) {
  switch(arguments.length) {
    case 2:
      return Hb.call(this, a, b);
    case 3:
      return Ib.call(this, a, b, c);
    case 4:
      return Jb.call(this, a, b, c, d)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Gb.a = Hb;
Gb.c = Ib;
Gb.p = Jb;
Fb = Gb;
function Kb(a) {
  if(a) {
    var b = a.j & 2, a = (b ? b : a.Ob) ? g : a.j ? l : t(va, a)
  }else {
    a = t(va, a)
  }
  return a
}
function Lb(a) {
  if(a) {
    var b = a.j & 16, a = (b ? b : a.lb) ? g : a.j ? l : t(ya, a)
  }else {
    a = t(ya, a)
  }
  return a
}
function vb(a, b) {
  this.e = a;
  this.r = b;
  this.t = 0;
  this.j = 166199550
}
p = vb.prototype;
p.C = function(a) {
  return Mb.b ? Mb.b(a) : Mb.call(k, a)
};
p.na = function() {
  return this.r + 1 < this.e.length ? new vb(this.e, this.r + 1) : k
};
p.D = function(a, b) {
  return O.a ? O.a(b, a) : O.call(k, b, a)
};
p.eb = function(a) {
  var b = a.G(a);
  return 0 < b ? new Nb(a, b - 1, k) : J
};
p.toString = function() {
  return sb(this)
};
p.Aa = function(a, b) {
  return Fb.p(this.e, b, this.e[this.r], this.r + 1)
};
p.Ba = function(a, b, c) {
  return Fb.p(this.e, b, c, this.r)
};
p.J = ba();
p.G = function() {
  return this.e.length - this.r
};
p.T = function() {
  return this.e[this.r]
};
p.U = function() {
  return this.r + 1 < this.e.length ? new vb(this.e, this.r + 1) : Ob.z ? Ob.z() : Ob.call(k)
};
p.B = function(a, b) {
  return Pb.a ? Pb.a(a, b) : Pb.call(k, a, b)
};
p.S = function(a, b) {
  var c = b + this.r;
  return c < this.e.length ? this.e[c] : k
};
p.ba = function(a, b, c) {
  a = b + this.r;
  return a < this.e.length ? this.e[a] : c
};
p.Q = function() {
  return J
};
var Qb, Rb = k;
function Sb(a) {
  return Rb.a(a, 0)
}
function Tb(a, b) {
  return b < a.length ? new vb(a, b) : k
}
Rb = function(a, b) {
  switch(arguments.length) {
    case 1:
      return Sb.call(this, a);
    case 2:
      return Tb.call(this, a, b)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Rb.b = Sb;
Rb.a = Tb;
Qb = Rb;
var N, Ub = k;
function Vb(a) {
  return Qb.a(a, 0)
}
function Wb(a, b) {
  return Qb.a(a, b)
}
Ub = function(a, b) {
  switch(arguments.length) {
    case 1:
      return Vb.call(this, a);
    case 2:
      return Wb.call(this, a, b)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Ub.b = Vb;
Ub.a = Wb;
N = Ub;
va.array = g;
wa.array = function(a) {
  return a.length
};
function Nb(a, b, c) {
  this.Pa = a;
  this.r = b;
  this.m = c;
  this.t = 0;
  this.j = 31850574
}
p = Nb.prototype;
p.C = function(a) {
  return Mb.b ? Mb.b(a) : Mb.call(k, a)
};
p.D = function(a, b) {
  return O.a ? O.a(b, a) : O.call(k, b, a)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.G = function() {
  return this.r + 1
};
p.T = function() {
  return w.a(this.Pa, this.r)
};
p.U = function() {
  return 0 < this.r ? new Nb(this.Pa, this.r - 1, k) : J
};
p.B = function(a, b) {
  return Pb.a ? Pb.a(a, b) : Pb.call(k, a, b)
};
p.K = function(a, b) {
  return new Nb(this.Pa, this.r, b)
};
p.I = n("m");
p.Q = function() {
  return P.a ? P.a(J, this.m) : P.call(k, J, this.m)
};
cb._ = function(a, b) {
  return a === b
};
var Xb, Yb = k;
function Zb(a, b) {
  return a != k ? xa(a, b) : Ob.b ? Ob.b(b) : Ob.call(k, b)
}
function $b(a, b, c) {
  for(;;) {
    if(r(c)) {
      a = Yb.a(a, b), b = H(c), c = K(c)
    }else {
      return Yb.a(a, b)
    }
  }
}
function ac(a, b, c) {
  var d = k;
  2 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 2), 0));
  return $b.call(this, a, b, d)
}
ac.o = 2;
ac.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = I(a);
  return $b(b, c, a)
};
ac.g = $b;
Yb = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Zb.call(this, a, b);
    default:
      return ac.g(a, b, N(arguments, 2))
  }
  e(Error("Invalid arity: " + arguments.length))
};
Yb.o = 2;
Yb.k = ac.k;
Yb.a = Zb;
Yb.g = ac.g;
Xb = Yb;
function R(a) {
  if(Kb(a)) {
    a = wa(a)
  }else {
    a: {
      for(var a = F(a), b = 0;;) {
        if(Kb(a)) {
          a = b + wa(a);
          break a
        }
        a = K(a);
        b += 1
      }
      a = aa
    }
  }
  return a
}
var bc, cc = k;
function dc(a, b) {
  for(;;) {
    a == k && e(Error("Index out of bounds"));
    if(0 === b) {
      if(F(a)) {
        return H(a)
      }
      e(Error("Index out of bounds"))
    }
    if(Lb(a)) {
      return w.a(a, b)
    }
    if(F(a)) {
      var c = K(a), d = b - 1, a = c, b = d
    }else {
      e(Error("Index out of bounds"))
    }
  }
}
function ec(a, b, c) {
  for(;;) {
    if(a == k) {
      return c
    }
    if(0 === b) {
      return F(a) ? H(a) : c
    }
    if(Lb(a)) {
      return w.c(a, b, c)
    }
    if(F(a)) {
      a = K(a), b -= 1
    }else {
      return c
    }
  }
}
cc = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return dc.call(this, a, b);
    case 3:
      return ec.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
cc.a = dc;
cc.c = ec;
bc = cc;
var S, fc = k;
function gc(a, b) {
  var c;
  if(a == k) {
    c = k
  }else {
    if(c = a) {
      c = (c = a.j & 16) ? c : a.lb
    }
    c = c ? a.S(a, Math.floor(b)) : a instanceof Array ? b < a.length ? a[b] : k : sa(a) ? b < a.length ? a[b] : k : bc.a(a, Math.floor(b))
  }
  return c
}
function hc(a, b, c) {
  if(a != k) {
    var d;
    if(d = a) {
      d = (d = a.j & 16) ? d : a.lb
    }
    a = d ? a.ba(a, Math.floor(b), c) : a instanceof Array ? b < a.length ? a[b] : c : sa(a) ? b < a.length ? a[b] : c : bc.c(a, Math.floor(b), c)
  }else {
    a = c
  }
  return a
}
fc = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return gc.call(this, a, b);
    case 3:
      return hc.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
fc.a = gc;
fc.c = hc;
S = fc;
var ic, jc = k;
function kc(a, b) {
  var c;
  if(a == k) {
    c = k
  }else {
    if(c = a) {
      c = (c = a.j & 256) ? c : a.zb
    }
    c = c ? a.H(a, b) : a instanceof Array ? b < a.length ? a[b] : k : sa(a) ? b < a.length ? a[b] : k : t(Ea, a) ? Fa.a(a, b) : k
  }
  return c
}
function lc(a, b, c) {
  if(a != k) {
    var d;
    if(d = a) {
      d = (d = a.j & 256) ? d : a.zb
    }
    a = d ? a.v(a, b, c) : a instanceof Array ? b < a.length ? a[b] : c : sa(a) ? b < a.length ? a[b] : c : t(Ea, a) ? Fa.c(a, b, c) : c
  }else {
    a = c
  }
  return a
}
jc = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return kc.call(this, a, b);
    case 3:
      return lc.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
jc.a = kc;
jc.c = lc;
ic = jc;
var mc, nc = k;
function oc(a, b, c) {
  return a != k ? Ka(a, b, c) : pc.a ? pc.a(b, c) : pc.call(k, b, c)
}
function qc(a, b, c, d) {
  for(;;) {
    if(a = nc.c(a, b, c), r(d)) {
      b = H(d), c = H(K(d)), d = K(K(d))
    }else {
      return a
    }
  }
}
function rc(a, b, c, d) {
  var f = k;
  3 < arguments.length && (f = N(Array.prototype.slice.call(arguments, 3), 0));
  return qc.call(this, a, b, c, f)
}
rc.o = 3;
rc.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = I(a);
  return qc(b, c, d, a)
};
rc.g = qc;
nc = function(a, b, c, d) {
  switch(arguments.length) {
    case 3:
      return oc.call(this, a, b, c);
    default:
      return rc.g(a, b, c, N(arguments, 3))
  }
  e(Error("Invalid arity: " + arguments.length))
};
nc.o = 3;
nc.k = rc.k;
nc.c = oc;
nc.g = rc.g;
mc = nc;
var sc, tc = k;
function uc(a, b, c) {
  for(;;) {
    if(a = tc.a(a, b), r(c)) {
      b = H(c), c = K(c)
    }else {
      return a
    }
  }
}
function vc(a, b, c) {
  var d = k;
  2 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 2), 0));
  return uc.call(this, a, b, d)
}
vc.o = 2;
vc.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = I(a);
  return uc(b, c, a)
};
vc.g = uc;
tc = function(a, b, c) {
  switch(arguments.length) {
    case 1:
      return a;
    case 2:
      return Ma(a, b);
    default:
      return vc.g(a, b, N(arguments, 2))
  }
  e(Error("Invalid arity: " + arguments.length))
};
tc.o = 2;
tc.k = vc.k;
tc.b = ba();
tc.a = function(a, b) {
  return Ma(a, b)
};
tc.g = vc.g;
sc = tc;
function wc(a) {
  var b = "function" == q(a);
  return b ? b : a ? r(r(k) ? k : a.vb) ? g : a.Yb ? l : t(ua, a) : t(ua, a)
}
var P = function xc(b, c) {
  var d;
  if(d = wc(b)) {
    d = b ? ((d = b.j & 262144) ? d : b.Xb) || (b.j ? 0 : t(Va, b)) : t(Va, b), d = !d
  }
  if(d) {
    if(aa === na) {
      na = {};
      na = function(b, c, d, f) {
        this.m = b;
        this.hb = c;
        this.Nb = d;
        this.Ib = f;
        this.t = 0;
        this.j = 393217
      };
      na.tb = g;
      na.Fb = "cljs.core/t3899";
      na.Eb = function(b) {
        return A(b, "cljs.core/t3899")
      };
      var f = function(b, c) {
        return T.a ? T.a(b.hb, c) : T.call(k, b.hb, c)
      };
      d = function(b, c) {
        var b = this, d = k;
        1 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 1), 0));
        return f.call(this, b, d)
      };
      d.o = 1;
      d.k = function(b) {
        var c = H(b), b = I(b);
        return f(c, b)
      };
      d.g = f;
      na.prototype.call = d;
      na.prototype.apply = function(b, c) {
        b = this;
        return b.call.apply(b, [b].concat(c.slice()))
      };
      na.prototype.vb = g;
      na.prototype.I = n("Ib");
      na.prototype.K = function(b, c) {
        return new na(this.m, this.hb, this.Nb, c)
      }
    }
    d = new na(c, b, xc, k);
    d = xc(d, c)
  }else {
    d = Wa(b, c)
  }
  return d
};
function yc(a) {
  var b;
  b = a ? ((b = a.j & 131072) ? b : a.Bb) || (a.j ? 0 : t(Ta, a)) : t(Ta, a);
  return b ? Ua(a) : k
}
var zc = {}, Ac = 0, D, Bc = k;
function Cc(a) {
  return Bc.a(a, g)
}
function Dc(a, b) {
  var c;
  ((c = ga(a)) ? b : c) ? (255 < Ac && (zc = {}, Ac = 0), c = zc[a], "number" !== typeof c && (c = ja(a), zc[a] = c, Ac += 1)) : c = db(a);
  return c
}
Bc = function(a, b) {
  switch(arguments.length) {
    case 1:
      return Cc.call(this, a);
    case 2:
      return Dc.call(this, a, b)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Bc.b = Cc;
Bc.a = Dc;
D = Bc;
function Ec(a) {
  var b = a == k;
  return b ? b : ra(F(a))
}
function Fc(a) {
  if(a) {
    var b = a.j & 16777216, a = (b ? b : a.Ub) ? g : a.j ? l : t(fb, a)
  }else {
    a = t(fb, a)
  }
  return a
}
function Gc(a) {
  if(a) {
    var b = a.j & 16384, a = (b ? b : a.Wb) ? g : a.j ? l : t(Ra, a)
  }else {
    a = t(Ra, a)
  }
  return a
}
function Hc(a) {
  var b = a instanceof Ic;
  return b ? b : a instanceof Jc
}
function Kc(a, b, c, d, f) {
  for(;0 !== f;) {
    c[d] = a[b], d += 1, f -= 1, b += 1
  }
}
var Lc = {};
function Mc(a) {
  var b = ga(a);
  return b ? "\ufdd0" === a.charAt(0) : b
}
function Nc(a, b) {
  return ic.c(a, b, Lc) === Lc ? l : g
}
function Oc(a, b) {
  if(a === b) {
    return 0
  }
  if(a == k) {
    return-1
  }
  if(b == k) {
    return 1
  }
  if(ta(a) === ta(b)) {
    var c;
    if(c = a) {
      c = (c = a.t & 2048) ? c : a.wb
    }
    return c ? a.xb(a, b) : a > b ? 1 : a < b ? -1 : 0
  }
  e(Error("compare on non-nil objects of different types"))
}
var Pc, Qc = k;
function Rc(a, b) {
  var c = R(a), d = R(b);
  return c < d ? -1 : c > d ? 1 : Qc.p(a, b, c, 0)
}
function Sc(a, b, c, d) {
  for(;;) {
    var f = Oc(S.a(a, d), S.a(b, d)), h = 0 === f;
    if(h ? d + 1 < c : h) {
      d += 1
    }else {
      return f
    }
  }
}
Qc = function(a, b, c, d) {
  switch(arguments.length) {
    case 2:
      return Rc.call(this, a, b);
    case 4:
      return Sc.call(this, a, b, c, d)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Qc.a = Rc;
Qc.p = Sc;
Pc = Qc;
var Tc, Uc = k;
function Vc(a, b) {
  var c = F(b);
  return c ? U.c ? U.c(a, H(c), K(c)) : U.call(k, a, H(c), K(c)) : a.z ? a.z() : a.call(k)
}
function Xc(a, b, c) {
  for(c = F(c);;) {
    if(c) {
      b = a.a ? a.a(b, H(c)) : a.call(k, b, H(c)), c = K(c)
    }else {
      return b
    }
  }
}
Uc = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Vc.call(this, a, b);
    case 3:
      return Xc.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Uc.a = Vc;
Uc.c = Xc;
Tc = Uc;
var U, Yc = k;
function Zc(a, b) {
  var c;
  if(c = b) {
    c = (c = b.j & 524288) ? c : b.Cb
  }
  return c ? b.Aa(b, a) : b instanceof Array ? Fb.a(b, a) : sa(b) ? Fb.a(b, a) : t(Xa, b) ? Ya.a(b, a) : Tc.a(a, b)
}
function $c(a, b, c) {
  var d;
  if(d = c) {
    d = (d = c.j & 524288) ? d : c.Cb
  }
  return d ? c.Ba(c, a, b) : c instanceof Array ? Fb.c(c, a, b) : sa(c) ? Fb.c(c, a, b) : t(Xa, c) ? Ya.c(c, a, b) : Tc.c(a, b, c)
}
Yc = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Zc.call(this, a, b);
    case 3:
      return $c.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Yc.a = Zc;
Yc.c = $c;
U = Yc;
function ad(a) {
  return 0 <= a ? Math.floor.b ? Math.floor.b(a) : Math.floor.call(k, a) : Math.ceil.b ? Math.ceil.b(a) : Math.ceil.call(k, a)
}
function bd(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
}
var cd, dd = k;
function ed(a) {
  return a == k ? "" : a.toString()
}
function fd(a, b) {
  return function(a, b) {
    for(;;) {
      if(r(b)) {
        var f = a.append(dd.b(H(b))), h = K(b), a = f, b = h
      }else {
        return dd.b(a)
      }
    }
  }.call(k, new ma(dd.b(a)), b)
}
function gd(a, b) {
  var c = k;
  1 < arguments.length && (c = N(Array.prototype.slice.call(arguments, 1), 0));
  return fd.call(this, a, c)
}
gd.o = 1;
gd.k = function(a) {
  var b = H(a), a = I(a);
  return fd(b, a)
};
gd.g = fd;
dd = function(a, b) {
  switch(arguments.length) {
    case 0:
      return"";
    case 1:
      return ed.call(this, a);
    default:
      return gd.g(a, N(arguments, 1))
  }
  e(Error("Invalid arity: " + arguments.length))
};
dd.o = 1;
dd.k = gd.k;
dd.z = da("");
dd.b = ed;
dd.g = gd.g;
cd = dd;
var B, hd = k;
function id(a) {
  return Mc(a) ? cd.g(":", N([a.substring(2, a.length)], 0)) : a == k ? "" : a.toString()
}
function jd(a, b) {
  return function(a, b) {
    for(;;) {
      if(r(b)) {
        var f = a.append(hd.b(H(b))), h = K(b), a = f, b = h
      }else {
        return cd.b(a)
      }
    }
  }.call(k, new ma(hd.b(a)), b)
}
function kd(a, b) {
  var c = k;
  1 < arguments.length && (c = N(Array.prototype.slice.call(arguments, 1), 0));
  return jd.call(this, a, c)
}
kd.o = 1;
kd.k = function(a) {
  var b = H(a), a = I(a);
  return jd(b, a)
};
kd.g = jd;
hd = function(a, b) {
  switch(arguments.length) {
    case 0:
      return"";
    case 1:
      return id.call(this, a);
    default:
      return kd.g(a, N(arguments, 1))
  }
  e(Error("Invalid arity: " + arguments.length))
};
hd.o = 1;
hd.k = kd.k;
hd.z = da("");
hd.b = id;
hd.g = kd.g;
B = hd;
var ld, md = k, md = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return a.substring(b);
    case 3:
      return a.substring(b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
md.a = function(a, b) {
  return a.substring(b)
};
md.c = function(a, b, c) {
  return a.substring(b, c)
};
ld = md;
function nd(a, b) {
  var c = od.a ? od.a(function(a) {
    var b = Mc(a);
    return(b ? b : a instanceof C) ? "" + B(a) : a
  }, b) : od.call(k, function(a) {
    var b = Mc(a);
    return(b ? b : a instanceof C) ? "" + B(a) : a
  }, b);
  return T.c ? T.c(ka, a, c) : T.call(k, ka, a, c)
}
function pd(a, b) {
  var c = k;
  1 < arguments.length && (c = N(Array.prototype.slice.call(arguments, 1), 0));
  return nd.call(this, a, c)
}
pd.o = 1;
pd.k = function(a) {
  var b = H(a), a = I(a);
  return nd(b, a)
};
pd.g = nd;
function Pb(a, b) {
  var c;
  if(Fc(b)) {
    a: {
      c = F(a);
      for(var d = F(b);;) {
        if(c == k) {
          c = d == k;
          break a
        }
        if(d != k && L.a(H(c), H(d))) {
          c = K(c), d = K(d)
        }else {
          c = l;
          break a
        }
      }
      c = aa
    }
  }else {
    c = k
  }
  return r(c) ? g : l
}
function tb(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
}
function Mb(a) {
  return U.c(function(a, c) {
    return tb(a, D.a(c, l))
  }, D.a(H(a), l), K(a))
}
function qd(a) {
  for(var b = 0, a = F(a);;) {
    if(a) {
      var c = H(a), b = (b + (D.b(rd.b ? rd.b(c) : rd.call(k, c)) ^ D.b(sd.b ? sd.b(c) : sd.call(k, c)))) % 4503599627370496, a = K(a)
    }else {
      return b
    }
  }
}
function td(a, b, c, d, f) {
  this.m = a;
  this.Da = b;
  this.ia = c;
  this.count = d;
  this.l = f;
  this.t = 0;
  this.j = 65413358
}
p = td.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.na = function() {
  return 1 === this.count ? k : this.ia
};
p.D = function(a, b) {
  return new td(this.m, b, a, this.count + 1, k)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.G = n("count");
p.T = n("Da");
p.U = function() {
  return 1 === this.count ? J : this.ia
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new td(b, this.Da, this.ia, this.count, this.l)
};
p.I = n("m");
p.Q = function() {
  return J
};
function ud(a) {
  this.m = a;
  this.t = 0;
  this.j = 65413326
}
p = ud.prototype;
p.C = da(0);
p.na = da(k);
p.D = function(a, b) {
  return new td(this.m, b, k, 1, k)
};
p.toString = function() {
  return sb(this)
};
p.J = da(k);
p.G = da(0);
p.T = da(k);
p.U = function() {
  return J
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new ud(b)
};
p.I = n("m");
p.Q = ba();
var J = new ud(k);
function vd(a) {
  var b;
  b = a ? ((b = a.j & 134217728) ? b : a.Sb) || (a.j ? 0 : t(gb, a)) : t(gb, a);
  return b ? hb(a) : U.c(Xb, J, a)
}
var Ob;
function wd(a) {
  var b;
  if(a instanceof vb) {
    b = a.e
  }else {
    a: {
      for(b = [];;) {
        if(a != k) {
          b.push(a.T(a)), a = a.na(a)
        }else {
          break a
        }
      }
      b = aa
    }
  }
  for(var a = b.length, c = J;;) {
    if(0 < a) {
      var d = a - 1, c = c.D(c, b[a - 1]), a = d
    }else {
      return c
    }
  }
}
function xd(a) {
  var b = k;
  0 < arguments.length && (b = N(Array.prototype.slice.call(arguments, 0), 0));
  return wd.call(this, b)
}
xd.o = 0;
xd.k = function(a) {
  a = F(a);
  return wd(a)
};
xd.g = wd;
Ob = xd;
function yd(a, b, c, d) {
  this.m = a;
  this.Da = b;
  this.ia = c;
  this.l = d;
  this.t = 0;
  this.j = 65405164
}
p = yd.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.na = function() {
  return this.ia == k ? k : eb(this.ia)
};
p.D = function(a, b) {
  return new yd(k, b, a, this.l)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.T = n("Da");
p.U = function() {
  return this.ia == k ? J : this.ia
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new yd(b, this.Da, this.ia, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(J, this.m)
};
function O(a, b) {
  var c = b == k;
  if(!c && (c = b)) {
    c = (c = b.j & 64) ? c : b.fb
  }
  return c ? new yd(k, a, b, k) : new yd(k, a, F(b), k)
}
va.string = g;
wa.string = function(a) {
  return a.length
};
db.string = function(a) {
  return ja(a)
};
function zd(a) {
  this.gb = a;
  this.t = 0;
  this.j = 1
}
var Ad = k, Ad = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      var d;
      d = a;
      d = this;
      if(b == k) {
        d = k
      }else {
        var f = b.ma;
        d = f == k ? Fa.c(b, d.gb, k) : f[d.gb]
      }
      return d;
    case 3:
      return b == k ? c : Fa.c(b, this.gb, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
zd.prototype.call = Ad;
zd.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
var Bd = k, Bd = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return ic.a(b, this.toString());
    case 3:
      return ic.c(b, this.toString(), c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
String.prototype.call = Bd;
String.prototype.apply = function(a, b) {
  return a.call.apply(a, [a].concat(b.slice()))
};
String.prototype.apply = function(a, b) {
  return 2 > b.length ? ic.a(b[0], a) : ic.c(b[0], a, b[1])
};
function Cd(a) {
  var b = a.x;
  if(a.ib) {
    return b
  }
  a.x = b.z ? b.z() : b.call(k);
  a.ib = g;
  return a.x
}
function Dd(a, b, c, d) {
  this.m = a;
  this.ib = b;
  this.x = c;
  this.l = d;
  this.t = 0;
  this.j = 31850700
}
p = Dd.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.na = function(a) {
  return eb(a.U(a))
};
p.D = function(a, b) {
  return O(b, a)
};
p.toString = function() {
  return sb(this)
};
p.J = function(a) {
  return F(Cd(a))
};
p.T = function(a) {
  return H(Cd(a))
};
p.U = function(a) {
  return I(Cd(a))
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new Dd(b, this.ib, this.x, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(J, this.m)
};
function Ed(a, b) {
  this.Oa = a;
  this.end = b;
  this.t = 0;
  this.j = 2
}
Ed.prototype.G = n("end");
Ed.prototype.add = function(a) {
  this.Oa[this.end] = a;
  return this.end += 1
};
Ed.prototype.ja = function() {
  var a = new Fd(this.Oa, 0, this.end);
  this.Oa = k;
  return a
};
function Fd(a, b, c) {
  this.e = a;
  this.L = b;
  this.end = c;
  this.t = 0;
  this.j = 524306
}
p = Fd.prototype;
p.Aa = function(a, b) {
  return Fb.p(this.e, b, this.e[this.L], this.L + 1)
};
p.Ba = function(a, b, c) {
  return Fb.p(this.e, b, c, this.L)
};
p.jb = function() {
  this.L === this.end && e(Error("-drop-first of empty chunk"));
  return new Fd(this.e, this.L + 1, this.end)
};
p.S = function(a, b) {
  return this.e[this.L + b]
};
p.ba = function(a, b, c) {
  return((a = 0 <= b) ? b < this.end - this.L : a) ? this.e[this.L + b] : c
};
p.G = function() {
  return this.end - this.L
};
var Gd, Hd = k;
function Id(a) {
  return new Fd(a, 0, a.length)
}
function Jd(a, b) {
  return new Fd(a, b, a.length)
}
function Kd(a, b, c) {
  return new Fd(a, b, c)
}
Hd = function(a, b, c) {
  switch(arguments.length) {
    case 1:
      return Id.call(this, a);
    case 2:
      return Jd.call(this, a, b);
    case 3:
      return Kd.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Hd.b = Id;
Hd.a = Jd;
Hd.c = Kd;
Gd = Hd;
function Ic(a, b, c, d) {
  this.ja = a;
  this.la = b;
  this.m = c;
  this.l = d;
  this.j = 31850604;
  this.t = 1536
}
p = Ic.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.D = function(a, b) {
  return O(b, a)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.T = function() {
  return w.a(this.ja, 0)
};
p.U = function() {
  return 1 < wa(this.ja) ? new Ic(ob(this.ja), this.la, this.m, k) : this.la == k ? J : this.la
};
p.kb = function() {
  return this.la == k ? k : this.la
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new Ic(this.ja, this.la, b, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(J, this.m)
};
p.Qa = n("ja");
p.La = function() {
  return this.la == k ? J : this.la
};
function Ld(a, b) {
  return 0 === wa(a) ? b : new Ic(a, b, k, k)
}
function Md(a) {
  for(var b = [];;) {
    if(F(a)) {
      b.push(H(a)), a = K(a)
    }else {
      return b
    }
  }
}
function Nd(a, b) {
  if(Kb(a)) {
    return R(a)
  }
  for(var c = a, d = b, f = 0;;) {
    var h;
    h = (h = 0 < d) ? F(c) : h;
    if(r(h)) {
      c = K(c), d -= 1, f += 1
    }else {
      return f
    }
  }
}
var Pd = function Od(b) {
  return b == k ? k : K(b) == k ? F(H(b)) : O(H(b), Od(K(b)))
}, Qd, Rd = k;
function Sd() {
  return new Dd(k, l, da(k), k)
}
function Td(a) {
  return new Dd(k, l, function() {
    return a
  }, k)
}
function Ud(a, b) {
  return new Dd(k, l, function() {
    var c = F(a);
    return c ? Hc(c) ? Ld(pb(c), Rd.a(qb(c), b)) : O(H(c), Rd.a(I(c), b)) : b
  }, k)
}
function Vd(a, b, c) {
  return function f(a, b) {
    return new Dd(k, l, function() {
      var c = F(a);
      return c ? Hc(c) ? Ld(pb(c), f(qb(c), b)) : O(H(c), f(I(c), b)) : r(b) ? f(H(b), K(b)) : k
    }, k)
  }(Rd.a(a, b), c)
}
function Wd(a, b, c) {
  var d = k;
  2 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 2), 0));
  return Vd.call(this, a, b, d)
}
Wd.o = 2;
Wd.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = I(a);
  return Vd(b, c, a)
};
Wd.g = Vd;
Rd = function(a, b, c) {
  switch(arguments.length) {
    case 0:
      return Sd.call(this);
    case 1:
      return Td.call(this, a);
    case 2:
      return Ud.call(this, a, b);
    default:
      return Wd.g(a, b, N(arguments, 2))
  }
  e(Error("Invalid arity: " + arguments.length))
};
Rd.o = 2;
Rd.k = Wd.k;
Rd.z = Sd;
Rd.b = Td;
Rd.a = Ud;
Rd.g = Wd.g;
Qd = Rd;
var Xd, Yd = k;
function Zd(a, b, c) {
  return O(a, O(b, c))
}
function $d(a, b, c, d) {
  return O(a, O(b, O(c, d)))
}
function ae(a, b, c, d, f) {
  return O(a, O(b, O(c, O(d, Pd(f)))))
}
function be(a, b, c, d, f) {
  var h = k;
  4 < arguments.length && (h = N(Array.prototype.slice.call(arguments, 4), 0));
  return ae.call(this, a, b, c, d, h)
}
be.o = 4;
be.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = K(a), f = H(a), a = I(a);
  return ae(b, c, d, f, a)
};
be.g = ae;
Yd = function(a, b, c, d, f) {
  switch(arguments.length) {
    case 1:
      return F(a);
    case 2:
      return O(a, b);
    case 3:
      return Zd.call(this, a, b, c);
    case 4:
      return $d.call(this, a, b, c, d);
    default:
      return be.g(a, b, c, d, N(arguments, 4))
  }
  e(Error("Invalid arity: " + arguments.length))
};
Yd.o = 4;
Yd.k = be.k;
Yd.b = function(a) {
  return F(a)
};
Yd.a = function(a, b) {
  return O(a, b)
};
Yd.c = Zd;
Yd.p = $d;
Yd.g = be.g;
Xd = Yd;
function ce(a, b, c) {
  var d = F(c);
  if(0 === b) {
    return a.z ? a.z() : a.call(k)
  }
  var c = y(d), f = z(d);
  if(1 === b) {
    return a.b ? a.b(c) : a.b ? a.b(c) : a.call(k, c)
  }
  var d = y(f), h = z(f);
  if(2 === b) {
    return a.a ? a.a(c, d) : a.a ? a.a(c, d) : a.call(k, c, d)
  }
  var f = y(h), i = z(h);
  if(3 === b) {
    return a.c ? a.c(c, d, f) : a.c ? a.c(c, d, f) : a.call(k, c, d, f)
  }
  var h = y(i), j = z(i);
  if(4 === b) {
    return a.p ? a.p(c, d, f, h) : a.p ? a.p(c, d, f, h) : a.call(k, c, d, f, h)
  }
  i = y(j);
  j = z(j);
  if(5 === b) {
    return a.N ? a.N(c, d, f, h, i) : a.N ? a.N(c, d, f, h, i) : a.call(k, c, d, f, h, i)
  }
  var a = y(j), m = z(j);
  if(6 === b) {
    return a.da ? a.da(c, d, f, h, i, a) : a.da ? a.da(c, d, f, h, i, a) : a.call(k, c, d, f, h, i, a)
  }
  var j = y(m), u = z(m);
  if(7 === b) {
    return a.sa ? a.sa(c, d, f, h, i, a, j) : a.sa ? a.sa(c, d, f, h, i, a, j) : a.call(k, c, d, f, h, i, a, j)
  }
  var m = y(u), x = z(u);
  if(8 === b) {
    return a.bb ? a.bb(c, d, f, h, i, a, j, m) : a.bb ? a.bb(c, d, f, h, i, a, j, m) : a.call(k, c, d, f, h, i, a, j, m)
  }
  var u = y(x), E = z(x);
  if(9 === b) {
    return a.cb ? a.cb(c, d, f, h, i, a, j, m, u) : a.cb ? a.cb(c, d, f, h, i, a, j, m, u) : a.call(k, c, d, f, h, i, a, j, m, u)
  }
  var x = y(E), G = z(E);
  if(10 === b) {
    return a.Ra ? a.Ra(c, d, f, h, i, a, j, m, u, x) : a.Ra ? a.Ra(c, d, f, h, i, a, j, m, u, x) : a.call(k, c, d, f, h, i, a, j, m, u, x)
  }
  var E = y(G), M = z(G);
  if(11 === b) {
    return a.Sa ? a.Sa(c, d, f, h, i, a, j, m, u, x, E) : a.Sa ? a.Sa(c, d, f, h, i, a, j, m, u, x, E) : a.call(k, c, d, f, h, i, a, j, m, u, x, E)
  }
  var G = y(M), Q = z(M);
  if(12 === b) {
    return a.Ta ? a.Ta(c, d, f, h, i, a, j, m, u, x, E, G) : a.Ta ? a.Ta(c, d, f, h, i, a, j, m, u, x, E, G) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G)
  }
  var M = y(Q), X = z(Q);
  if(13 === b) {
    return a.Ua ? a.Ua(c, d, f, h, i, a, j, m, u, x, E, G, M) : a.Ua ? a.Ua(c, d, f, h, i, a, j, m, u, x, E, G, M) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M)
  }
  var Q = y(X), ca = z(X);
  if(14 === b) {
    return a.Va ? a.Va(c, d, f, h, i, a, j, m, u, x, E, G, M, Q) : a.Va ? a.Va(c, d, f, h, i, a, j, m, u, x, E, G, M, Q) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q)
  }
  var X = y(ca), la = z(ca);
  if(15 === b) {
    return a.Wa ? a.Wa(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X) : a.Wa ? a.Wa(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X)
  }
  var ca = y(la), za = z(la);
  if(16 === b) {
    return a.Xa ? a.Xa(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca) : a.Xa ? a.Xa(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca)
  }
  var la = y(za), Za = z(za);
  if(17 === b) {
    return a.Ya ? a.Ya(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la) : a.Ya ? a.Ya(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la)
  }
  var za = y(Za), Wc = z(Za);
  if(18 === b) {
    return a.Za ? a.Za(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za) : a.Za ? a.Za(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za)
  }
  Za = y(Wc);
  Wc = z(Wc);
  if(19 === b) {
    return a.$a ? a.$a(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za, Za) : a.$a ? a.$a(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za, Za) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za, Za)
  }
  var se = y(Wc);
  z(Wc);
  if(20 === b) {
    return a.ab ? a.ab(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za, Za, se) : a.ab ? a.ab(c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za, Za, se) : a.call(k, c, d, f, h, i, a, j, m, u, x, E, G, M, Q, X, ca, la, za, Za, se)
  }
  e(Error("Only up to 20 arguments supported on functions"))
}
var T, de = k;
function ee(a, b) {
  var c = a.o;
  if(a.k) {
    var d = Nd(b, c + 1);
    return d <= c ? ce(a, d, b) : a.k(b)
  }
  return a.apply(a, Md(b))
}
function fe(a, b, c) {
  b = Xd.a(b, c);
  c = a.o;
  if(a.k) {
    var d = Nd(b, c + 1);
    return d <= c ? ce(a, d, b) : a.k(b)
  }
  return a.apply(a, Md(b))
}
function ge(a, b, c, d) {
  b = Xd.c(b, c, d);
  c = a.o;
  return a.k ? (d = Nd(b, c + 1), d <= c ? ce(a, d, b) : a.k(b)) : a.apply(a, Md(b))
}
function he(a, b, c, d, f) {
  b = Xd.p(b, c, d, f);
  c = a.o;
  return a.k ? (d = Nd(b, c + 1), d <= c ? ce(a, d, b) : a.k(b)) : a.apply(a, Md(b))
}
function ie(a, b, c, d, f, h) {
  b = O(b, O(c, O(d, O(f, Pd(h)))));
  c = a.o;
  return a.k ? (d = Nd(b, c + 1), d <= c ? ce(a, d, b) : a.k(b)) : a.apply(a, Md(b))
}
function je(a, b, c, d, f, h) {
  var i = k;
  5 < arguments.length && (i = N(Array.prototype.slice.call(arguments, 5), 0));
  return ie.call(this, a, b, c, d, f, i)
}
je.o = 5;
je.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = K(a), f = H(a), a = K(a), h = H(a), a = I(a);
  return ie(b, c, d, f, h, a)
};
je.g = ie;
de = function(a, b, c, d, f, h) {
  switch(arguments.length) {
    case 2:
      return ee.call(this, a, b);
    case 3:
      return fe.call(this, a, b, c);
    case 4:
      return ge.call(this, a, b, c, d);
    case 5:
      return he.call(this, a, b, c, d, f);
    default:
      return je.g(a, b, c, d, f, N(arguments, 5))
  }
  e(Error("Invalid arity: " + arguments.length))
};
de.o = 5;
de.k = je.k;
de.a = ee;
de.c = fe;
de.p = ge;
de.N = he;
de.g = je.g;
T = de;
var ke, le = k;
function me(a, b) {
  return!L.a(a, b)
}
function ne(a, b, c) {
  return ra(T.p(L, a, b, c))
}
function oe(a, b, c) {
  var d = k;
  2 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 2), 0));
  return ne.call(this, a, b, d)
}
oe.o = 2;
oe.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = I(a);
  return ne(b, c, a)
};
oe.g = ne;
le = function(a, b, c) {
  switch(arguments.length) {
    case 1:
      return l;
    case 2:
      return me.call(this, a, b);
    default:
      return oe.g(a, b, N(arguments, 2))
  }
  e(Error("Invalid arity: " + arguments.length))
};
le.o = 2;
le.k = oe.k;
le.b = da(l);
le.a = me;
le.g = oe.g;
ke = le;
function pe(a) {
  return F(a) ? a : k
}
function qe(a, b) {
  for(;;) {
    if(F(b) == k) {
      return g
    }
    if(r(a.b ? a.b(H(b)) : a.call(k, H(b)))) {
      var c = a, d = K(b), a = c, b = d
    }else {
      return l
    }
  }
}
function re(a) {
  return a
}
var te, ue = k;
function ve(a, b) {
  function c(a, b, c, f) {
    var u = k;
    3 < arguments.length && (u = N(Array.prototype.slice.call(arguments, 3), 0));
    return d.call(this, a, b, c, u)
  }
  function d(c, d, f, m) {
    return a.b ? a.b(T.N(b, c, d, f, m)) : a.call(k, T.N(b, c, d, f, m))
  }
  var f = k;
  c.o = 3;
  c.k = function(a) {
    var b = H(a), a = K(a), c = H(a), a = K(a), f = H(a), a = I(a);
    return d(b, c, f, a)
  };
  c.g = d;
  f = function(d, f, j, m) {
    switch(arguments.length) {
      case 0:
        return a.b ? a.b(b.z ? b.z() : b.call(k)) : a.call(k, b.z ? b.z() : b.call(k));
      case 1:
        return a.b ? a.b(b.b ? b.b(d) : b.call(k, d)) : a.call(k, b.b ? b.b(d) : b.call(k, d));
      case 2:
        return a.b ? a.b(b.a ? b.a(d, f) : b.call(k, d, f)) : a.call(k, b.a ? b.a(d, f) : b.call(k, d, f));
      case 3:
        return a.b ? a.b(b.c ? b.c(d, f, j) : b.call(k, d, f, j)) : a.call(k, b.c ? b.c(d, f, j) : b.call(k, d, f, j));
      default:
        return c.g(d, f, j, N(arguments, 3))
    }
    e(Error("Invalid arity: " + arguments.length))
  };
  f.o = 3;
  f.k = c.k;
  return f
}
function we(a, b, c) {
  function d(a, b, c, d) {
    var h = k;
    3 < arguments.length && (h = N(Array.prototype.slice.call(arguments, 3), 0));
    return f.call(this, a, b, c, h)
  }
  function f(d, f, h, u) {
    return a.b ? a.b(b.b ? b.b(T.N(c, d, f, h, u)) : b.call(k, T.N(c, d, f, h, u))) : a.call(k, b.b ? b.b(T.N(c, d, f, h, u)) : b.call(k, T.N(c, d, f, h, u)))
  }
  var h = k;
  d.o = 3;
  d.k = function(a) {
    var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = I(a);
    return f(b, c, d, a)
  };
  d.g = f;
  h = function(f, h, m, u) {
    switch(arguments.length) {
      case 0:
        return a.b ? a.b(b.b ? b.b(c.z ? c.z() : c.call(k)) : b.call(k, c.z ? c.z() : c.call(k))) : a.call(k, b.b ? b.b(c.z ? c.z() : c.call(k)) : b.call(k, c.z ? c.z() : c.call(k)));
      case 1:
        return a.b ? a.b(b.b ? b.b(c.b ? c.b(f) : c.call(k, f)) : b.call(k, c.b ? c.b(f) : c.call(k, f))) : a.call(k, b.b ? b.b(c.b ? c.b(f) : c.call(k, f)) : b.call(k, c.b ? c.b(f) : c.call(k, f)));
      case 2:
        return a.b ? a.b(b.b ? b.b(c.a ? c.a(f, h) : c.call(k, f, h)) : b.call(k, c.a ? c.a(f, h) : c.call(k, f, h))) : a.call(k, b.b ? b.b(c.a ? c.a(f, h) : c.call(k, f, h)) : b.call(k, c.a ? c.a(f, h) : c.call(k, f, h)));
      case 3:
        return a.b ? a.b(b.b ? b.b(c.c ? c.c(f, h, m) : c.call(k, f, h, m)) : b.call(k, c.c ? c.c(f, h, m) : c.call(k, f, h, m))) : a.call(k, b.b ? b.b(c.c ? c.c(f, h, m) : c.call(k, f, h, m)) : b.call(k, c.c ? c.c(f, h, m) : c.call(k, f, h, m)));
      default:
        return d.g(f, h, m, N(arguments, 3))
    }
    e(Error("Invalid arity: " + arguments.length))
  };
  h.o = 3;
  h.k = d.k;
  return h
}
function xe(a, b, c, d) {
  function f(a) {
    var b = k;
    0 < arguments.length && (b = N(Array.prototype.slice.call(arguments, 0), 0));
    return h.call(this, b)
  }
  function h(a) {
    for(var a = T.a(H(i), a), b = K(i);;) {
      if(b) {
        a = H(b).call(k, a), b = K(b)
      }else {
        return a
      }
    }
  }
  var i = vd(Xd.p(a, b, c, d));
  f.o = 0;
  f.k = function(a) {
    a = F(a);
    return h(a)
  };
  f.g = h;
  return f
}
function ye(a, b, c, d) {
  var f = k;
  3 < arguments.length && (f = N(Array.prototype.slice.call(arguments, 3), 0));
  return xe.call(this, a, b, c, f)
}
ye.o = 3;
ye.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = I(a);
  return xe(b, c, d, a)
};
ye.g = xe;
ue = function(a, b, c, d) {
  switch(arguments.length) {
    case 0:
      return re;
    case 1:
      return a;
    case 2:
      return ve.call(this, a, b);
    case 3:
      return we.call(this, a, b, c);
    default:
      return ye.g(a, b, c, N(arguments, 3))
  }
  e(Error("Invalid arity: " + arguments.length))
};
ue.o = 3;
ue.k = ye.k;
ue.z = function() {
  return re
};
ue.b = ba();
ue.a = ve;
ue.c = we;
ue.g = ye.g;
te = ue;
var od, ze = k;
function Ae(a, b) {
  return new Dd(k, l, function() {
    var c = F(b);
    if(c) {
      if(Hc(c)) {
        for(var d = pb(c), f = R(d), h = new Ed(Array(f), 0), i = 0;;) {
          if(i < f) {
            var j = a.b ? a.b(w.a(d, i)) : a.call(k, w.a(d, i));
            h.add(j);
            i += 1
          }else {
            break
          }
        }
        return Ld(h.ja(), ze.a(a, qb(c)))
      }
      return O(a.b ? a.b(H(c)) : a.call(k, H(c)), ze.a(a, I(c)))
    }
    return k
  }, k)
}
function Be(a, b, c) {
  return new Dd(k, l, function() {
    var d = F(b), f = F(c);
    return(d ? f : d) ? O(a.a ? a.a(H(d), H(f)) : a.call(k, H(d), H(f)), ze.c(a, I(d), I(f))) : k
  }, k)
}
function Ce(a, b, c, d) {
  return new Dd(k, l, function() {
    var f = F(b), h = F(c), i = F(d);
    return(f ? h ? i : h : f) ? O(a.c ? a.c(H(f), H(h), H(i)) : a.call(k, H(f), H(h), H(i)), ze.p(a, I(f), I(h), I(i))) : k
  }, k)
}
function De(a, b, c, d, f) {
  return ze.a(function(b) {
    return T.a(a, b)
  }, function i(a) {
    return new Dd(k, l, function() {
      var b = ze.a(F, a);
      return qe(re, b) ? O(ze.a(H, b), i(ze.a(I, b))) : k
    }, k)
  }(Xb.g(f, d, N([c, b], 0))))
}
function Ee(a, b, c, d, f) {
  var h = k;
  4 < arguments.length && (h = N(Array.prototype.slice.call(arguments, 4), 0));
  return De.call(this, a, b, c, d, h)
}
Ee.o = 4;
Ee.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = K(a), f = H(a), a = I(a);
  return De(b, c, d, f, a)
};
Ee.g = De;
ze = function(a, b, c, d, f) {
  switch(arguments.length) {
    case 2:
      return Ae.call(this, a, b);
    case 3:
      return Be.call(this, a, b, c);
    case 4:
      return Ce.call(this, a, b, c, d);
    default:
      return Ee.g(a, b, c, d, N(arguments, 4))
  }
  e(Error("Invalid arity: " + arguments.length))
};
ze.o = 4;
ze.k = Ee.k;
ze.a = Ae;
ze.c = Be;
ze.p = Ce;
ze.g = Ee.g;
od = ze;
var Ge = function Fe(b, c) {
  return new Dd(k, l, function() {
    if(0 < b) {
      var d = F(c);
      return d ? O(H(d), Fe(b - 1, I(d))) : k
    }
    return k
  }, k)
}, He, Ie = k;
function Je(a) {
  return new Dd(k, l, function() {
    return O(a, Ie.b(a))
  }, k)
}
function Ke(a, b) {
  return Ge(a, Ie.b(b))
}
Ie = function(a, b) {
  switch(arguments.length) {
    case 1:
      return Je.call(this, a);
    case 2:
      return Ke.call(this, a, b)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Ie.b = Je;
Ie.a = Ke;
He = Ie;
function Le(a) {
  return function c(a, f) {
    return new Dd(k, l, function() {
      var h = F(a);
      return h ? O(H(h), c(I(h), f)) : F(f) ? c(H(f), I(f)) : k
    }, k)
  }(k, a)
}
var Me, Ne = k;
function Oe(a, b) {
  return Le(od.a(a, b))
}
function Pe(a, b, c) {
  return Le(T.p(od, a, b, c))
}
function Qe(a, b, c) {
  var d = k;
  2 < arguments.length && (d = N(Array.prototype.slice.call(arguments, 2), 0));
  return Pe.call(this, a, b, d)
}
Qe.o = 2;
Qe.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = I(a);
  return Pe(b, c, a)
};
Qe.g = Pe;
Ne = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Oe.call(this, a, b);
    default:
      return Qe.g(a, b, N(arguments, 2))
  }
  e(Error("Invalid arity: " + arguments.length))
};
Ne.o = 2;
Ne.k = Qe.k;
Ne.a = Oe;
Ne.g = Qe.g;
Me = Ne;
var Se = function Re(b, c) {
  return new Dd(k, l, function() {
    var d = F(c);
    if(d) {
      if(Hc(d)) {
        for(var f = pb(d), h = R(f), i = new Ed(Array(h), 0), j = 0;;) {
          if(j < h) {
            if(r(b.b ? b.b(w.a(f, j)) : b.call(k, w.a(f, j)))) {
              var m = w.a(f, j);
              i.add(m)
            }
            j += 1
          }else {
            break
          }
        }
        return Ld(i.ja(), Re(b, qb(d)))
      }
      f = H(d);
      d = I(d);
      return r(b.b ? b.b(f) : b.call(k, f)) ? O(f, Re(b, d)) : Re(b, d)
    }
    return k
  }, k)
};
function Te(a, b) {
  var c;
  if(a != k) {
    if(c = a) {
      c = (c = a.t & 4) ? c : a.Pb
    }
    c ? (c = U.c(lb, kb(a), b), c = mb(c)) : c = U.c(xa, a, b)
  }else {
    c = U.c(Xb, J, b)
  }
  return c
}
function Ue(a, b) {
  this.w = a;
  this.e = b
}
function Ve(a) {
  a = a.h;
  return 32 > a ? 0 : a - 1 >>> 5 << 5
}
function We(a, b, c) {
  for(;;) {
    if(0 === b) {
      return c
    }
    var d = new Ue(a, Array(32));
    d.e[0] = c;
    c = d;
    b -= 5
  }
}
var Ye = function Xe(b, c, d, f) {
  var h = new Ue(d.w, d.e.slice()), i = b.h - 1 >>> c & 31;
  5 === c ? h.e[i] = f : (d = d.e[i], b = d != k ? Xe(b, c - 5, d, f) : We(k, c - 5, f), h.e[i] = b);
  return h
};
function Ze(a, b) {
  var c = 0 <= b;
  if(c ? b < a.h : c) {
    if(b >= Ve(a)) {
      return a.P
    }
    for(var c = a.root, d = a.shift;;) {
      if(0 < d) {
        var f = d - 5, c = c.e[b >>> d & 31], d = f
      }else {
        return c.e
      }
    }
  }else {
    e(Error([B("No item "), B(b), B(" in vector of length "), B(a.h)].join("")))
  }
}
var af = function $e(b, c, d, f, h) {
  var i = new Ue(d.w, d.e.slice());
  if(0 === c) {
    i.e[f & 31] = h
  }else {
    var j = f >>> c & 31, b = $e(b, c - 5, d.e[j], f, h);
    i.e[j] = b
  }
  return i
};
function bf(a, b, c, d, f, h) {
  this.m = a;
  this.h = b;
  this.shift = c;
  this.root = d;
  this.P = f;
  this.l = h;
  this.t = 4;
  this.j = 167668511
}
p = bf.prototype;
p.ra = function() {
  return new cf(this.h, this.shift, df.b ? df.b(this.root) : df.call(k, this.root), ef.b ? ef.b(this.P) : ef.call(k, this.P))
};
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.H = function(a, b) {
  return a.ba(a, b, k)
};
p.v = function(a, b, c) {
  return a.ba(a, b, c)
};
p.M = function(a, b, c) {
  var d = 0 <= b;
  if(d ? b < this.h : d) {
    return Ve(a) <= b ? (a = this.P.slice(), a[b & 31] = c, new bf(this.m, this.h, this.shift, this.root, a, k)) : new bf(this.m, this.h, this.shift, af(a, this.shift, this.root, b, c), this.P, k)
  }
  if(b === this.h) {
    return a.D(a, c)
  }
  e(Error([B("Index "), B(b), B(" out of bounds  [0,"), B(this.h), B("]")].join("")))
};
var ff = k, ff = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return this.H(this, b);
    case 3:
      return this.v(this, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = bf.prototype;
p.call = ff;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.D = function(a, b) {
  if(32 > this.h - Ve(a)) {
    var c = this.P.slice();
    c.push(b);
    return new bf(this.m, this.h + 1, this.shift, this.root, c, k)
  }
  var d = this.h >>> 5 > 1 << this.shift, c = d ? this.shift + 5 : this.shift;
  if(d) {
    d = new Ue(k, Array(32));
    d.e[0] = this.root;
    var f = We(k, this.shift, new Ue(k, this.P));
    d.e[1] = f
  }else {
    d = Ye(a, this.shift, this.root, new Ue(k, this.P))
  }
  return new bf(this.m, this.h + 1, c, d, [b], k)
};
p.eb = function(a) {
  return 0 < this.h ? new Nb(a, this.h - 1, k) : J
};
p.mb = function(a) {
  return a.S(a, 0)
};
p.nb = function(a) {
  return a.S(a, 1)
};
p.toString = function() {
  return sb(this)
};
p.Aa = function(a, b) {
  return Ab.a(a, b)
};
p.Ba = function(a, b, c) {
  return Ab.c(a, b, c)
};
p.J = function(a) {
  return 0 === this.h ? k : 32 > this.h ? N.b(this.P) : V.c ? V.c(a, 0, 0) : V.call(k, a, 0, 0)
};
p.G = n("h");
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new bf(b, this.h, this.shift, this.root, this.P, this.l)
};
p.I = n("m");
p.S = function(a, b) {
  return Ze(a, b)[b & 31]
};
p.ba = function(a, b, c) {
  var d = 0 <= b;
  return(d ? b < this.h : d) ? a.S(a, b) : c
};
p.Q = function() {
  return P(gf, this.m)
};
var hf = new Ue(k, Array(32)), gf = new bf(k, 0, 5, hf, [], 0);
function W(a) {
  var b = a.length;
  if(32 > b) {
    return new bf(k, b, 5, hf, a, k)
  }
  for(var c = a.slice(0, 32), d = 32, f = kb(new bf(k, 32, 5, hf, c, k));;) {
    if(d < b) {
      c = d + 1, f = lb(f, a[d]), d = c
    }else {
      return mb(f)
    }
  }
}
function jf(a) {
  return mb(U.c(lb, kb(gf), a))
}
function Y(a) {
  var b = k;
  0 < arguments.length && (b = N(Array.prototype.slice.call(arguments, 0), 0));
  return jf(b)
}
Y.o = 0;
Y.k = function(a) {
  a = F(a);
  return jf(a)
};
Y.g = function(a) {
  return jf(a)
};
function Jc(a, b, c, d, f, h) {
  this.X = a;
  this.W = b;
  this.r = c;
  this.L = d;
  this.m = f;
  this.l = h;
  this.j = 31719660;
  this.t = 1536
}
p = Jc.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.na = function(a) {
  return this.L + 1 < this.W.length ? (a = V.p ? V.p(this.X, this.W, this.r, this.L + 1) : V.call(k, this.X, this.W, this.r, this.L + 1), a == k ? k : a) : a.kb(a)
};
p.D = function(a, b) {
  return O(b, a)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.T = function() {
  return this.W[this.L]
};
p.U = function(a) {
  return this.L + 1 < this.W.length ? (a = V.p ? V.p(this.X, this.W, this.r, this.L + 1) : V.call(k, this.X, this.W, this.r, this.L + 1), a == k ? J : a) : a.La(a)
};
p.kb = function() {
  var a = this.W.length, a = this.r + a < wa(this.X) ? V.c ? V.c(this.X, this.r + a, 0) : V.call(k, this.X, this.r + a, 0) : k;
  return a == k ? k : a
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return V.N ? V.N(this.X, this.W, this.r, this.L, b) : V.call(k, this.X, this.W, this.r, this.L, b)
};
p.Q = function() {
  return P(gf, this.m)
};
p.Qa = function() {
  return Gd.a(this.W, this.L)
};
p.La = function() {
  var a = this.W.length, a = this.r + a < wa(this.X) ? V.c ? V.c(this.X, this.r + a, 0) : V.call(k, this.X, this.r + a, 0) : k;
  return a == k ? J : a
};
var V, kf = k;
function lf(a, b, c) {
  return new Jc(a, Ze(a, b), b, c, k, k)
}
function mf(a, b, c, d) {
  return new Jc(a, b, c, d, k, k)
}
function nf(a, b, c, d, f) {
  return new Jc(a, b, c, d, f, k)
}
kf = function(a, b, c, d, f) {
  switch(arguments.length) {
    case 3:
      return lf.call(this, a, b, c);
    case 4:
      return mf.call(this, a, b, c, d);
    case 5:
      return nf.call(this, a, b, c, d, f)
  }
  e(Error("Invalid arity: " + arguments.length))
};
kf.c = lf;
kf.p = mf;
kf.N = nf;
V = kf;
function df(a) {
  return new Ue({}, a.e.slice())
}
function ef(a) {
  var b = Array(32);
  Kc(a, 0, b, 0, a.length);
  return b
}
var pf = function of(b, c, d, f) {
  var d = b.root.w === d.w ? d : new Ue(b.root.w, d.e.slice()), h = b.h - 1 >>> c & 31;
  if(5 === c) {
    b = f
  }else {
    var i = d.e[h], b = i != k ? of(b, c - 5, i, f) : We(b.root.w, c - 5, f)
  }
  d.e[h] = b;
  return d
};
function cf(a, b, c, d) {
  this.h = a;
  this.shift = b;
  this.root = c;
  this.P = d;
  this.j = 275;
  this.t = 88
}
var qf = k, qf = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return this.H(this, b);
    case 3:
      return this.v(this, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = cf.prototype;
p.call = qf;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.H = function(a, b) {
  return a.ba(a, b, k)
};
p.v = function(a, b, c) {
  return a.ba(a, b, c)
};
p.S = function(a, b) {
  if(this.root.w) {
    return Ze(a, b)[b & 31]
  }
  e(Error("nth after persistent!"))
};
p.ba = function(a, b, c) {
  var d = 0 <= b;
  return(d ? b < this.h : d) ? a.S(a, b) : c
};
p.G = function() {
  if(this.root.w) {
    return this.h
  }
  e(Error("count after persistent!"))
};
p.ta = function(a, b, c) {
  var d;
  a: {
    if(a.root.w) {
      var f = 0 <= b;
      if(f ? b < a.h : f) {
        Ve(a) <= b ? a.P[b & 31] = c : (d = function i(d, f) {
          var u = a.root.w === f.w ? f : new Ue(a.root.w, f.e.slice());
          if(0 === d) {
            u.e[b & 31] = c
          }else {
            var x = b >>> d & 31, E = i(d - 5, u.e[x]);
            u.e[x] = E
          }
          return u
        }.call(k, a.shift, a.root), a.root = d);
        d = a;
        break a
      }
      if(b === a.h) {
        d = a.ua(a, c);
        break a
      }
      e(Error([B("Index "), B(b), B(" out of bounds for TransientVector of length"), B(a.h)].join("")))
    }
    e(Error("assoc! after persistent!"))
  }
  return d
};
p.ua = function(a, b) {
  if(this.root.w) {
    if(32 > this.h - Ve(a)) {
      this.P[this.h & 31] = b
    }else {
      var c = new Ue(this.root.w, this.P), d = Array(32);
      d[0] = b;
      this.P = d;
      if(this.h >>> 5 > 1 << this.shift) {
        var d = Array(32), f = this.shift + 5;
        d[0] = this.root;
        d[1] = We(this.root.w, this.shift, c);
        this.root = new Ue(this.root.w, d);
        this.shift = f
      }else {
        this.root = pf(a, this.shift, this.root, c)
      }
    }
    this.h += 1;
    return a
  }
  e(Error("conj! after persistent!"))
};
p.Ca = function(a) {
  if(this.root.w) {
    this.root.w = k;
    var a = this.h - Ve(a), b = Array(a);
    Kc(this.P, 0, b, 0, a);
    return new bf(k, this.h, this.shift, this.root, b, k)
  }
  e(Error("persistent! called twice"))
};
function rf() {
  this.t = 0;
  this.j = 2097152
}
rf.prototype.B = da(l);
var sf = new rf;
function tf(a, b) {
  var c;
  c = b == k ? 0 : b ? ((c = b.j & 1024) ? c : b.Qb) || (b.j ? 0 : t(La, b)) : t(La, b);
  c = c ? R(a) === R(b) ? qe(re, od.a(function(a) {
    return L.a(ic.c(b, H(a), sf), H(K(a)))
  }, a)) : k : k;
  return r(c) ? g : l
}
function uf(a, b) {
  for(var c = b.length, d = 0;;) {
    if(d < c) {
      if(a === b[d]) {
        return d
      }
      d += 1
    }else {
      return k
    }
  }
}
function vf(a, b) {
  var c = D.b(a), d = D.b(b);
  return c < d ? -1 : c > d ? 1 : 0
}
function wf(a, b, c) {
  for(var d = a.keys, f = d.length, h = a.ma, a = yc(a), i = 0, j = kb(xf);;) {
    if(i < f) {
      var m = d[i], i = i + 1, j = nb(j, m, h[m])
    }else {
      return d = P, b = nb(j, b, c), b = mb(b), d(b, a)
    }
  }
}
function yf(a, b) {
  for(var c = {}, d = b.length, f = 0;;) {
    if(f < d) {
      var h = b[f];
      c[h] = a[h];
      f += 1
    }else {
      break
    }
  }
  return c
}
function zf(a, b, c, d, f) {
  this.m = a;
  this.keys = b;
  this.ma = c;
  this.Ha = d;
  this.l = f;
  this.t = 4;
  this.j = 16123663
}
p = zf.prototype;
p.ra = function(a) {
  a = Te(pc.z ? pc.z() : pc.call(k), a);
  return kb(a)
};
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return((a = ga(b)) ? uf(b, this.keys) != k : a) ? this.ma[b] : c
};
p.M = function(a, b, c) {
  if(ga(b)) {
    var d = this.Ha > Af;
    if(d ? d : this.keys.length >= Af) {
      return wf(a, b, c)
    }
    if(uf(b, this.keys) != k) {
      return a = yf(this.ma, this.keys), a[b] = c, new zf(this.m, this.keys, a, this.Ha + 1, k)
    }
    a = yf(this.ma, this.keys);
    d = this.keys.slice();
    a[b] = c;
    d.push(b);
    return new zf(this.m, d, a, this.Ha + 1, k)
  }
  return wf(a, b, c)
};
p.Ka = function(a, b) {
  var c = ga(b);
  return(c ? uf(b, this.keys) != k : c) ? g : l
};
var Bf = k, Bf = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return this.H(this, b);
    case 3:
      return this.v(this, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = zf.prototype;
p.call = Bf;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.toString = function() {
  return sb(this)
};
p.J = function() {
  var a = this;
  return 0 < a.keys.length ? od.a(function(b) {
    return Y.g(N([b, a.ma[b]], 0))
  }, a.keys.sort(vf)) : k
};
p.G = function() {
  return this.keys.length
};
p.B = function(a, b) {
  return tf(a, b)
};
p.K = function(a, b) {
  return new zf(b, this.keys, this.ma, this.Ha, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(Cf, this.m)
};
p.ea = function(a, b) {
  var c = ga(b);
  if(c ? uf(b, this.keys) != k : c) {
    var c = this.keys.slice(), d = yf(this.ma, this.keys);
    c.splice(uf(b, c), 1);
    delete d[b];
    return new zf(this.m, c, d, this.Ha + 1, k)
  }
  return a
};
var Cf = new zf(k, [], {}, 0, 0), Af = 8;
function Df(a, b) {
  var c = a.e, d = ga(b);
  if(d ? d : "number" === typeof b) {
    a: {
      for(var d = c.length, f = 0;;) {
        if(d <= f) {
          c = -1;
          break a
        }
        if(b === c[f]) {
          c = f;
          break a
        }
        f += 2
      }
      c = aa
    }
  }else {
    if(b instanceof C) {
      a: {
        for(var d = c.length, f = b.oa, h = 0;;) {
          if(d <= h) {
            c = -1;
            break a
          }
          var i = c[h], j = i instanceof C;
          if(j ? f === i.oa : j) {
            c = h;
            break a
          }
          h += 2
        }
        c = aa
      }
    }else {
      if(b == k) {
        a: {
          d = c.length;
          for(f = 0;;) {
            if(d <= f) {
              c = -1;
              break a
            }
            if(c[f] == k) {
              c = f;
              break a
            }
            f += 2
          }
          c = aa
        }
      }else {
        a: {
          d = c.length;
          for(f = 0;;) {
            if(d <= f) {
              c = -1;
              break a
            }
            if(L.a(b, c[f])) {
              c = f;
              break a
            }
            f += 2
          }
          c = aa
        }
      }
    }
  }
  return c
}
function Ef(a, b, c, d) {
  this.m = a;
  this.h = b;
  this.e = c;
  this.l = d;
  this.t = 4;
  this.j = 16123663
}
p = Ef.prototype;
p.ra = function() {
  return new Ff({}, this.e.length, this.e.slice())
};
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  a = Df(a, b);
  return-1 === a ? c : this.e[a + 1]
};
p.M = function(a, b, c) {
  var d = Df(a, b);
  if(-1 === d) {
    if(this.h < Gf) {
      for(var d = a.e, a = d.length, f = Array(a + 2), h = 0;;) {
        if(h < a) {
          f[h] = d[h], h += 1
        }else {
          break
        }
      }
      f[a] = b;
      f[a + 1] = c;
      return new Ef(this.m, this.h + 1, f, k)
    }
    return Wa(Ka(Te(xf, a), b, c), this.m)
  }
  if(c === this.e[d + 1]) {
    return a
  }
  b = this.e.slice();
  b[d + 1] = c;
  return new Ef(this.m, this.h, b, k)
};
p.Ka = function(a, b) {
  return-1 !== Df(a, b)
};
var Hf = k, Hf = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return this.H(this, b);
    case 3:
      return this.v(this, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = Ef.prototype;
p.call = Hf;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.toString = function() {
  return sb(this)
};
p.J = function() {
  var a = this, b;
  if(0 < a.h) {
    var c = a.e.length;
    b = function f(b) {
      return new Dd(k, l, function() {
        return b < c ? O(W([a.e[b], a.e[b + 1]]), f(b + 2)) : k
      }, k)
    }(0)
  }else {
    b = k
  }
  return b
};
p.G = n("h");
p.B = function(a, b) {
  return tf(a, b)
};
p.K = function(a, b) {
  return new Ef(b, this.h, this.e, this.l)
};
p.I = n("m");
p.Q = function() {
  return Wa(If, this.m)
};
p.ea = function(a, b) {
  if(0 <= Df(a, b)) {
    var c = this.e.length, d = c - 2;
    if(0 === d) {
      return a.Q(a)
    }
    for(var d = Array(d), f = 0, h = 0;;) {
      if(f >= c) {
        return new Ef(this.m, this.h - 1, d, k)
      }
      L.a(b, this.e[f]) || (d[h] = this.e[f], d[h + 1] = this.e[f + 1], h += 2);
      f += 2
    }
  }else {
    return a
  }
};
var If = new Ef(k, 0, [], k), Gf = 8;
function pa(a, b) {
  var c = b ? a : a.slice();
  return new Ef(k, c.length / 2, c, k)
}
function Ff(a, b, c) {
  this.va = a;
  this.ha = b;
  this.e = c;
  this.t = 56;
  this.j = 258
}
p = Ff.prototype;
p.ta = function(a, b, c) {
  if(r(this.va)) {
    var d = Df(a, b);
    if(-1 === d) {
      if(this.ha + 2 <= 2 * Gf) {
        return this.ha += 2, this.e.push(b), this.e.push(c), a
      }
      a = Jf.a ? Jf.a(this.ha, this.e) : Jf.call(k, this.ha, this.e);
      return nb(a, b, c)
    }
    c !== this.e[d + 1] && (this.e[d + 1] = c);
    return a
  }
  e(Error("assoc! after persistent!"))
};
p.ua = function(a, b) {
  if(r(this.va)) {
    var c;
    c = b ? ((c = b.j & 2048) ? c : b.Ab) || (b.j ? 0 : t(Na, b)) : t(Na, b);
    if(c) {
      return a.ta(a, rd.b ? rd.b(b) : rd.call(k, b), sd.b ? sd.b(b) : sd.call(k, b))
    }
    c = F(b);
    for(var d = a;;) {
      var f = H(c);
      if(r(f)) {
        c = K(c), d = d.ta(d, rd.b ? rd.b(f) : rd.call(k, f), sd.b ? sd.b(f) : sd.call(k, f))
      }else {
        return d
      }
    }
  }else {
    e(Error("conj! after persistent!"))
  }
};
p.Ca = function() {
  if(r(this.va)) {
    return this.va = l, new Ef(k, ad((this.ha - this.ha % 2) / 2), this.e, k)
  }
  e(Error("persistent! called twice"))
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  if(r(this.va)) {
    return a = Df(a, b), -1 === a ? c : this.e[a + 1]
  }
  e(Error("lookup after persistent!"))
};
p.G = function() {
  if(r(this.va)) {
    return ad((this.ha - this.ha % 2) / 2)
  }
  e(Error("count after persistent!"))
};
function Jf(a, b) {
  for(var c = kb(Cf), d = 0;;) {
    if(d < a) {
      c = nb(c, b[d], b[d + 1]), d += 2
    }else {
      return c
    }
  }
}
function Kf() {
  this.ca = l
}
function Lf(a, b) {
  return ga(a) ? a === b : L.a(a, b)
}
var Mf, Nf = k;
function Of(a, b, c) {
  a = a.slice();
  a[b] = c;
  return a
}
function Pf(a, b, c, d, f) {
  a = a.slice();
  a[b] = c;
  a[d] = f;
  return a
}
Nf = function(a, b, c, d, f) {
  switch(arguments.length) {
    case 3:
      return Of.call(this, a, b, c);
    case 5:
      return Pf.call(this, a, b, c, d, f)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Nf.c = Of;
Nf.N = Pf;
Mf = Nf;
function Qf(a, b) {
  var c = Array(a.length - 2);
  Kc(a, 0, c, 0, 2 * b);
  Kc(a, 2 * (b + 1), c, 2 * b, c.length - 2 * b);
  return c
}
var Rf, Sf = k;
function Tf(a, b, c, d) {
  a = a.wa(b);
  a.e[c] = d;
  return a
}
function Uf(a, b, c, d, f, h) {
  a = a.wa(b);
  a.e[c] = d;
  a.e[f] = h;
  return a
}
Sf = function(a, b, c, d, f, h) {
  switch(arguments.length) {
    case 4:
      return Tf.call(this, a, b, c, d);
    case 6:
      return Uf.call(this, a, b, c, d, f, h)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Sf.p = Tf;
Sf.da = Uf;
Rf = Sf;
function Vf(a, b, c) {
  this.w = a;
  this.A = b;
  this.e = c
}
p = Vf.prototype;
p.Z = function(a, b, c, d, f, h) {
  var i = 1 << (c >>> b & 31), j = bd(this.A & i - 1);
  if(0 === (this.A & i)) {
    var m = bd(this.A);
    if(2 * m < this.e.length) {
      a = this.wa(a);
      b = a.e;
      h.ca = g;
      a: {
        c = 2 * (m - j);
        h = 2 * j + (c - 1);
        for(m = 2 * (j + 1) + (c - 1);;) {
          if(0 === c) {
            break a
          }
          b[m] = b[h];
          m -= 1;
          c -= 1;
          h -= 1
        }
      }
      b[2 * j] = d;
      b[2 * j + 1] = f;
      a.A |= i;
      return a
    }
    if(16 <= m) {
      j = Array(32);
      j[c >>> b & 31] = Wf.Z(a, b + 5, c, d, f, h);
      for(f = d = 0;;) {
        if(32 > d) {
          0 !== (this.A >>> d & 1) && (j[d] = this.e[f] != k ? Wf.Z(a, b + 5, D.b(this.e[f]), this.e[f], this.e[f + 1], h) : this.e[f + 1], f += 2), d += 1
        }else {
          break
        }
      }
      return new Xf(a, m + 1, j)
    }
    b = Array(2 * (m + 4));
    Kc(this.e, 0, b, 0, 2 * j);
    b[2 * j] = d;
    b[2 * j + 1] = f;
    Kc(this.e, 2 * j, b, 2 * (j + 1), 2 * (m - j));
    h.ca = g;
    a = this.wa(a);
    a.e = b;
    a.A |= i;
    return a
  }
  m = this.e[2 * j];
  i = this.e[2 * j + 1];
  if(m == k) {
    return m = i.Z(a, b + 5, c, d, f, h), m === i ? this : Rf.p(this, a, 2 * j + 1, m)
  }
  if(Lf(d, m)) {
    return f === i ? this : Rf.p(this, a, 2 * j + 1, f)
  }
  h.ca = g;
  return Rf.da(this, a, 2 * j, k, 2 * j + 1, Yf.sa ? Yf.sa(a, b + 5, m, i, c, d, f) : Yf.call(k, a, b + 5, m, i, c, d, f))
};
p.Ea = function() {
  return Zf.b ? Zf.b(this.e) : Zf.call(k, this.e)
};
p.wa = function(a) {
  if(a === this.w) {
    return this
  }
  var b = bd(this.A), c = Array(0 > b ? 4 : 2 * (b + 1));
  Kc(this.e, 0, c, 0, 2 * b);
  return new Vf(a, this.A, c)
};
p.Fa = function(a, b, c) {
  var d = 1 << (b >>> a & 31);
  if(0 === (this.A & d)) {
    return this
  }
  var f = bd(this.A & d - 1), h = this.e[2 * f], i = this.e[2 * f + 1];
  return h == k ? (a = i.Fa(a + 5, b, c), a === i ? this : a != k ? new Vf(k, this.A, Mf.c(this.e, 2 * f + 1, a)) : this.A === d ? k : new Vf(k, this.A ^ d, Qf(this.e, f))) : Lf(c, h) ? new Vf(k, this.A ^ d, Qf(this.e, f)) : this
};
p.Y = function(a, b, c, d, f) {
  var h = 1 << (b >>> a & 31), i = bd(this.A & h - 1);
  if(0 === (this.A & h)) {
    var j = bd(this.A);
    if(16 <= j) {
      i = Array(32);
      i[b >>> a & 31] = Wf.Y(a + 5, b, c, d, f);
      for(d = c = 0;;) {
        if(32 > c) {
          0 !== (this.A >>> c & 1) && (i[c] = this.e[d] != k ? Wf.Y(a + 5, D.b(this.e[d]), this.e[d], this.e[d + 1], f) : this.e[d + 1], d += 2), c += 1
        }else {
          break
        }
      }
      return new Xf(k, j + 1, i)
    }
    a = Array(2 * (j + 1));
    Kc(this.e, 0, a, 0, 2 * i);
    a[2 * i] = c;
    a[2 * i + 1] = d;
    Kc(this.e, 2 * i, a, 2 * (i + 1), 2 * (j - i));
    f.ca = g;
    return new Vf(k, this.A | h, a)
  }
  j = this.e[2 * i];
  h = this.e[2 * i + 1];
  if(j == k) {
    return j = h.Y(a + 5, b, c, d, f), j === h ? this : new Vf(k, this.A, Mf.c(this.e, 2 * i + 1, j))
  }
  if(Lf(c, j)) {
    return d === h ? this : new Vf(k, this.A, Mf.c(this.e, 2 * i + 1, d))
  }
  f.ca = g;
  return new Vf(k, this.A, Mf.N(this.e, 2 * i, k, 2 * i + 1, Yf.da ? Yf.da(a + 5, j, h, b, c, d) : Yf.call(k, a + 5, j, h, b, c, d)))
};
p.ka = function(a, b, c, d) {
  var f = 1 << (b >>> a & 31);
  if(0 === (this.A & f)) {
    return d
  }
  var h = bd(this.A & f - 1), f = this.e[2 * h], h = this.e[2 * h + 1];
  return f == k ? h.ka(a + 5, b, c, d) : Lf(c, f) ? h : d
};
var Wf = new Vf(k, 0, []);
function Xf(a, b, c) {
  this.w = a;
  this.h = b;
  this.e = c
}
p = Xf.prototype;
p.Z = function(a, b, c, d, f, h) {
  var i = c >>> b & 31, j = this.e[i];
  if(j == k) {
    return a = Rf.p(this, a, i, Wf.Z(a, b + 5, c, d, f, h)), a.h += 1, a
  }
  b = j.Z(a, b + 5, c, d, f, h);
  return b === j ? this : Rf.p(this, a, i, b)
};
p.Ea = function() {
  return $f.b ? $f.b(this.e) : $f.call(k, this.e)
};
p.wa = function(a) {
  return a === this.w ? this : new Xf(a, this.h, this.e.slice())
};
p.Fa = function(a, b, c) {
  var d = b >>> a & 31, f = this.e[d];
  if(f != k) {
    a = f.Fa(a + 5, b, c);
    if(a === f) {
      d = this
    }else {
      if(a == k) {
        if(8 >= this.h) {
          a: {
            for(var f = this.e, a = 2 * (this.h - 1), b = Array(a), c = 0, h = 1, i = 0;;) {
              if(c < a) {
                var j = c !== d;
                if(j ? f[c] != k : j) {
                  b[h] = f[c], h += 2, i |= 1 << c
                }
                c += 1
              }else {
                d = new Vf(k, i, b);
                break a
              }
            }
            d = aa
          }
        }else {
          d = new Xf(k, this.h - 1, Mf.c(this.e, d, a))
        }
      }else {
        d = new Xf(k, this.h, Mf.c(this.e, d, a))
      }
    }
    return d
  }
  return this
};
p.Y = function(a, b, c, d, f) {
  var h = b >>> a & 31, i = this.e[h];
  if(i == k) {
    return new Xf(k, this.h + 1, Mf.c(this.e, h, Wf.Y(a + 5, b, c, d, f)))
  }
  a = i.Y(a + 5, b, c, d, f);
  return a === i ? this : new Xf(k, this.h, Mf.c(this.e, h, a))
};
p.ka = function(a, b, c, d) {
  var f = this.e[b >>> a & 31];
  return f != k ? f.ka(a + 5, b, c, d) : d
};
function ag(a, b, c) {
  for(var b = 2 * b, d = 0;;) {
    if(d < b) {
      if(Lf(c, a[d])) {
        return d
      }
      d += 2
    }else {
      return-1
    }
  }
}
function bg(a, b, c, d) {
  this.w = a;
  this.fa = b;
  this.h = c;
  this.e = d
}
p = bg.prototype;
p.Z = function(a, b, c, d, f, h) {
  if(c === this.fa) {
    b = ag(this.e, this.h, d);
    if(-1 === b) {
      if(this.e.length > 2 * this.h) {
        return a = Rf.da(this, a, 2 * this.h, d, 2 * this.h + 1, f), h.ca = g, a.h += 1, a
      }
      c = this.e.length;
      b = Array(c + 2);
      Kc(this.e, 0, b, 0, c);
      b[c] = d;
      b[c + 1] = f;
      h.ca = g;
      h = this.h + 1;
      a === this.w ? (this.e = b, this.h = h, a = this) : a = new bg(this.w, this.fa, h, b);
      return a
    }
    return this.e[b + 1] === f ? this : Rf.p(this, a, b + 1, f)
  }
  return(new Vf(a, 1 << (this.fa >>> b & 31), [k, this, k, k])).Z(a, b, c, d, f, h)
};
p.Ea = function() {
  return Zf.b ? Zf.b(this.e) : Zf.call(k, this.e)
};
p.wa = function(a) {
  if(a === this.w) {
    return this
  }
  var b = Array(2 * (this.h + 1));
  Kc(this.e, 0, b, 0, 2 * this.h);
  return new bg(a, this.fa, this.h, b)
};
p.Fa = function(a, b, c) {
  a = ag(this.e, this.h, c);
  return-1 === a ? this : 1 === this.h ? k : new bg(k, this.fa, this.h - 1, Qf(this.e, ad((a - a % 2) / 2)))
};
p.Y = function(a, b, c, d, f) {
  return b === this.fa ? (a = ag(this.e, this.h, c), -1 === a ? (a = this.e.length, b = Array(a + 2), Kc(this.e, 0, b, 0, a), b[a] = c, b[a + 1] = d, f.ca = g, new bg(k, this.fa, this.h + 1, b)) : L.a(this.e[a], d) ? this : new bg(k, this.fa, this.h, Mf.c(this.e, a + 1, d))) : (new Vf(k, 1 << (this.fa >>> a & 31), [k, this])).Y(a, b, c, d, f)
};
p.ka = function(a, b, c, d) {
  a = ag(this.e, this.h, c);
  return 0 > a ? d : Lf(c, this.e[a]) ? this.e[a + 1] : d
};
var Yf, cg = k;
function dg(a, b, c, d, f, h) {
  var i = D.b(b);
  if(i === d) {
    return new bg(k, i, 2, [b, c, f, h])
  }
  var j = new Kf;
  return Wf.Y(a, i, b, c, j).Y(a, d, f, h, j)
}
function eg(a, b, c, d, f, h, i) {
  var j = D.b(c);
  if(j === f) {
    return new bg(k, j, 2, [c, d, h, i])
  }
  var m = new Kf;
  return Wf.Z(a, b, j, c, d, m).Z(a, b, f, h, i, m)
}
cg = function(a, b, c, d, f, h, i) {
  switch(arguments.length) {
    case 6:
      return dg.call(this, a, b, c, d, f, h);
    case 7:
      return eg.call(this, a, b, c, d, f, h, i)
  }
  e(Error("Invalid arity: " + arguments.length))
};
cg.da = dg;
cg.sa = eg;
Yf = cg;
function fg(a, b, c, d, f) {
  this.m = a;
  this.$ = b;
  this.r = c;
  this.aa = d;
  this.l = f;
  this.t = 0;
  this.j = 31850572
}
p = fg.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.D = function(a, b) {
  return O(b, a)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.T = function() {
  return this.aa == k ? W([this.$[this.r], this.$[this.r + 1]]) : H(this.aa)
};
p.U = function() {
  return this.aa == k ? Zf.c ? Zf.c(this.$, this.r + 2, k) : Zf.call(k, this.$, this.r + 2, k) : Zf.c ? Zf.c(this.$, this.r, K(this.aa)) : Zf.call(k, this.$, this.r, K(this.aa))
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new fg(b, this.$, this.r, this.aa, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(J, this.m)
};
var Zf, gg = k;
function hg(a) {
  return gg.c(a, 0, k)
}
function ig(a, b, c) {
  if(c == k) {
    for(c = a.length;;) {
      if(b < c) {
        if(a[b] != k) {
          return new fg(k, a, b, k, k)
        }
        var d = a[b + 1];
        if(r(d) && (d = d.Ea(), r(d))) {
          return new fg(k, a, b + 2, d, k)
        }
        b += 2
      }else {
        return k
      }
    }
  }else {
    return new fg(k, a, b, c, k)
  }
}
gg = function(a, b, c) {
  switch(arguments.length) {
    case 1:
      return hg.call(this, a);
    case 3:
      return ig.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
gg.b = hg;
gg.c = ig;
Zf = gg;
function jg(a, b, c, d, f) {
  this.m = a;
  this.$ = b;
  this.r = c;
  this.aa = d;
  this.l = f;
  this.t = 0;
  this.j = 31850572
}
p = jg.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = Mb(a)
};
p.D = function(a, b) {
  return O(b, a)
};
p.toString = function() {
  return sb(this)
};
p.J = ba();
p.T = function() {
  return H(this.aa)
};
p.U = function() {
  return $f.p ? $f.p(k, this.$, this.r, K(this.aa)) : $f.call(k, k, this.$, this.r, K(this.aa))
};
p.B = function(a, b) {
  return Pb(a, b)
};
p.K = function(a, b) {
  return new jg(b, this.$, this.r, this.aa, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(J, this.m)
};
var $f, kg = k;
function lg(a) {
  return kg.p(k, a, 0, k)
}
function mg(a, b, c, d) {
  if(d == k) {
    for(d = b.length;;) {
      if(c < d) {
        var f = b[c];
        if(r(f) && (f = f.Ea(), r(f))) {
          return new jg(a, b, c + 1, f, k)
        }
        c += 1
      }else {
        return k
      }
    }
  }else {
    return new jg(a, b, c, d, k)
  }
}
kg = function(a, b, c, d) {
  switch(arguments.length) {
    case 1:
      return lg.call(this, a);
    case 4:
      return mg.call(this, a, b, c, d)
  }
  e(Error("Invalid arity: " + arguments.length))
};
kg.b = lg;
kg.p = mg;
$f = kg;
function ng(a, b, c, d, f, h) {
  this.m = a;
  this.h = b;
  this.root = c;
  this.O = d;
  this.V = f;
  this.l = h;
  this.t = 4;
  this.j = 16123663
}
p = ng.prototype;
p.ra = function() {
  return new og({}, this.root, this.h, this.O, this.V)
};
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return b == k ? this.O ? this.V : c : this.root == k ? c : this.root.ka(0, D.b(b), b, c)
};
p.M = function(a, b, c) {
  if(b == k) {
    var d = this.O;
    return(d ? c === this.V : d) ? a : new ng(this.m, this.O ? this.h : this.h + 1, this.root, g, c, k)
  }
  d = new Kf;
  c = (this.root == k ? Wf : this.root).Y(0, D.b(b), b, c, d);
  return c === this.root ? a : new ng(this.m, d.ca ? this.h + 1 : this.h, c, this.O, this.V, k)
};
p.Ka = function(a, b) {
  return b == k ? this.O : this.root == k ? l : this.root.ka(0, D.b(b), b, Lc) !== Lc
};
var pg = k, pg = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return this.H(this, b);
    case 3:
      return this.v(this, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = ng.prototype;
p.call = pg;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.toString = function() {
  return sb(this)
};
p.J = function() {
  if(0 < this.h) {
    var a = this.root != k ? this.root.Ea() : k;
    return this.O ? O(W([k, this.V]), a) : a
  }
  return k
};
p.G = n("h");
p.B = function(a, b) {
  return tf(a, b)
};
p.K = function(a, b) {
  return new ng(b, this.h, this.root, this.O, this.V, this.l)
};
p.I = n("m");
p.Q = function() {
  return Wa(xf, this.m)
};
p.ea = function(a, b) {
  if(b == k) {
    return this.O ? new ng(this.m, this.h - 1, this.root, l, k, k) : a
  }
  if(this.root == k) {
    return a
  }
  var c = this.root.Fa(0, D.b(b), b);
  return c === this.root ? a : new ng(this.m, this.h - 1, c, this.O, this.V, k)
};
var xf = new ng(k, 0, k, l, k, 0);
function og(a, b, c, d, f) {
  this.w = a;
  this.root = b;
  this.count = c;
  this.O = d;
  this.V = f;
  this.t = 56;
  this.j = 258
}
p = og.prototype;
p.ta = function(a, b, c) {
  return qg(a, b, c)
};
p.ua = function(a, b) {
  var c;
  a: {
    if(a.w) {
      c = b ? ((c = b.j & 2048) ? c : b.Ab) || (b.j ? 0 : t(Na, b)) : t(Na, b);
      if(c) {
        c = qg(a, rd.b ? rd.b(b) : rd.call(k, b), sd.b ? sd.b(b) : sd.call(k, b));
        break a
      }
      c = F(b);
      for(var d = a;;) {
        var f = H(c);
        if(r(f)) {
          c = K(c), d = qg(d, rd.b ? rd.b(f) : rd.call(k, f), sd.b ? sd.b(f) : sd.call(k, f))
        }else {
          c = d;
          break a
        }
      }
    }else {
      e(Error("conj! after persistent"))
    }
    c = aa
  }
  return c
};
p.Ca = function(a) {
  var b;
  a.w ? (a.w = k, b = new ng(k, a.count, a.root, a.O, a.V, k)) : e(Error("persistent! called twice"));
  return b
};
p.H = function(a, b) {
  return b == k ? this.O ? this.V : k : this.root == k ? k : this.root.ka(0, D.b(b), b)
};
p.v = function(a, b, c) {
  return b == k ? this.O ? this.V : c : this.root == k ? c : this.root.ka(0, D.b(b), b, c)
};
p.G = function() {
  if(this.w) {
    return this.count
  }
  e(Error("count after persistent!"))
};
function qg(a, b, c) {
  if(a.w) {
    if(b == k) {
      a.V !== c && (a.V = c), a.O || (a.count += 1, a.O = g)
    }else {
      var d = new Kf, b = (a.root == k ? Wf : a.root).Z(a.w, 0, D.b(b), b, c, d);
      b !== a.root && (a.root = b);
      d.ca && (a.count += 1)
    }
    return a
  }
  e(Error("assoc! after persistent!"))
}
var pc;
function rg(a) {
  for(var b = F(a), c = kb(xf);;) {
    if(b) {
      var a = K(K(b)), d = H(b), b = H(K(b)), c = nb(c, d, b), b = a
    }else {
      return mb(c)
    }
  }
}
function sg(a) {
  var b = k;
  0 < arguments.length && (b = N(Array.prototype.slice.call(arguments, 0), 0));
  return rg.call(this, b)
}
sg.o = 0;
sg.k = function(a) {
  a = F(a);
  return rg(a)
};
sg.g = rg;
pc = sg;
function rd(a) {
  return Oa(a)
}
function sd(a) {
  return Pa(a)
}
function tg(a, b, c) {
  this.m = a;
  this.xa = b;
  this.l = c;
  this.t = 4;
  this.j = 15077647
}
tg.prototype.ra = function() {
  return new ug(kb(this.xa))
};
tg.prototype.C = function(a) {
  var b = this.l;
  if(b != k) {
    return b
  }
  a: {
    b = 0;
    for(a = F(a);;) {
      if(a) {
        var c = H(a), b = (b + D.b(c)) % 4503599627370496, a = K(a)
      }else {
        break a
      }
    }
    b = aa
  }
  return this.l = b
};
tg.prototype.H = function(a, b) {
  return a.v(a, b, k)
};
tg.prototype.v = function(a, b, c) {
  return r(Ja(this.xa, b)) ? b : c
};
var vg = k, vg = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return this.H(this, b);
    case 3:
      return this.v(this, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = tg.prototype;
p.call = vg;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.D = function(a, b) {
  return new tg(this.m, mc.c(this.xa, b, k), k)
};
p.toString = function() {
  return sb(this)
};
p.J = function() {
  return F(od.a(H, this.xa))
};
p.G = function() {
  return wa(this.xa)
};
p.B = function(a, b) {
  var c;
  c = b == k ? l : b ? ((c = b.j & 4096) ? c : b.Vb) ? g : b.j ? l : t(Qa, b) : t(Qa, b);
  return c ? (c = R(a) === R(b)) ? qe(function(b) {
    return Nc(a, b)
  }, b) : c : c
};
p.K = function(a, b) {
  return new tg(b, this.xa, this.l)
};
p.I = n("m");
p.Q = function() {
  return P(wg, this.m)
};
var wg = new tg(k, If, 0);
function xg(a) {
  var b = a.length;
  if(b / 2 <= Gf) {
    return new tg(k, pa.a ? pa.a(a, g) : pa.call(k, a, g), k)
  }
  for(var c = 0, d = kb(wg);;) {
    if(c < b) {
      var f = c + 2, d = lb(d, a[c]), c = f
    }else {
      return mb(d)
    }
  }
}
function ug(a) {
  this.qa = a;
  this.j = 259;
  this.t = 136
}
var yg = k, yg = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Fa.c(this.qa, b, Lc) === Lc ? k : b;
    case 3:
      return Fa.c(this.qa, b, Lc) === Lc ? c : b
  }
  e(Error("Invalid arity: " + arguments.length))
};
p = ug.prototype;
p.call = yg;
p.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return Fa.c(this.qa, b, Lc) === Lc ? c : b
};
p.G = function() {
  return R(this.qa)
};
p.ua = function(a, b) {
  this.qa = nb(this.qa, b, k);
  return a
};
p.Ca = function() {
  return new tg(k, mb(this.qa), k)
};
function zg(a) {
  if(a && r(r(k) ? k : a.qb)) {
    return a.name
  }
  if(sa(a)) {
    return a
  }
  if(Mc(a)) {
    var b = a.lastIndexOf("/", a.length - 2);
    return 0 > b ? ld.a(a, 2) : ld.a(a, b + 1)
  }
  e(Error([B("Doesn't support name: "), B(a)].join("")))
}
function Ag(a) {
  if(a && r(r(k) ? k : a.qb)) {
    return a.ya
  }
  if(Mc(a)) {
    var b = a.lastIndexOf("/", a.length - 2);
    return-1 < b ? ld.c(a, 2, b) : k
  }
  e(Error([B("Doesn't support namespace: "), B(a)].join("")))
}
function Bg(a, b) {
  var c = a.exec(b);
  return L.a(H(c), b) ? 1 === R(c) ? H(c) : jf(c) : k
}
function Cg(a, b) {
  var c = a.exec(b);
  return c == k ? k : 1 === R(c) ? H(c) : jf(c)
}
function Dg(a) {
  var b = Cg(/^(?:\(\?([idmsux]*)\))?(.*)/, a);
  S.c(b, 0, k);
  a = S.c(b, 1, k);
  b = S.c(b, 2, k);
  return RegExp(b, a)
}
function Z(a, b, c, d, f, h, i) {
  A(a, c);
  F(i) && (b.c ? b.c(H(i), a, h) : b.call(k, H(i), a, h));
  for(var c = F(K(i)), i = k, j = 0, m = 0;;) {
    if(m < j) {
      var u = i.S(i, m);
      A(a, d);
      b.c ? b.c(u, a, h) : b.call(k, u, a, h);
      m += 1
    }else {
      if(c = F(c)) {
        i = c, Hc(i) ? (c = pb(i), m = qb(i), i = c, j = R(c), c = m) : (c = H(i), A(a, d), b.c ? b.c(c, a, h) : b.call(k, c, a, h), c = K(i), i = k, j = 0), m = 0
      }else {
        break
      }
    }
  }
  return A(a, f)
}
function Eg(a, b) {
  for(var c = F(b), d = k, f = 0, h = 0;;) {
    if(h < f) {
      var i = d.S(d, h);
      A(a, i);
      h += 1
    }else {
      if(c = F(c)) {
        d = c, Hc(d) ? (c = pb(d), f = qb(d), d = c, i = R(c), c = f, f = i) : (i = H(d), A(a, i), c = K(d), d = k, f = 0), h = 0
      }else {
        return k
      }
    }
  }
}
function Fg(a, b) {
  var c = k;
  1 < arguments.length && (c = N(Array.prototype.slice.call(arguments, 1), 0));
  return Eg.call(this, a, c)
}
Fg.o = 1;
Fg.k = function(a) {
  var b = H(a), a = I(a);
  return Eg(b, a)
};
Fg.g = Eg;
var Gg = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"}, $ = function Hg(b, c, d) {
  if(b == k) {
    return A(c, "nil")
  }
  if(aa === b) {
    return A(c, "#<undefined>")
  }
  var f;
  f = ic.a(d, "\ufdd0:meta");
  r(f) && (f = b ? ((f = b.j & 131072) ? f : b.Bb) ? g : b.j ? l : t(Ta, b) : t(Ta, b), f = r(f) ? yc(b) : f);
  r(f) && (A(c, "^"), Hg(yc(b), c, d), A(c, " "));
  if(b == k) {
    return A(c, "nil")
  }
  if(b.tb) {
    return b.Eb(c)
  }
  if(f = b) {
    f = (f = b.j & 2147483648) ? f : b.R
  }
  return f ? b.F(b, c, d) : ((f = ta(b) === Boolean) ? f : "number" === typeof b) ? A(c, "" + B(b)) : b instanceof Array ? Z(c, Hg, "#<Array [", ", ", "]>", d, b) : ga(b) ? Mc(b) ? (A(c, ":"), d = Ag(b), r(d) && Fg.g(c, N(["" + B(d), "/"], 0)), A(c, zg(b))) : b instanceof C ? (d = Ag(b), r(d) && Fg.g(c, N(["" + B(d), "/"], 0)), A(c, zg(b))) : r((new zd("\ufdd0:readably")).call(k, d)) ? A(c, [B('"'), B(b.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(b) {
    return Gg[b]
  })), B('"')].join("")) : A(c, b) : wc(b) ? Fg.g(c, N(["#<", "" + B(b), ">"], 0)) : b instanceof Date ? (d = function(b, c) {
    for(var d = "" + B(b);;) {
      if(R(d) < c) {
        d = [B("0"), B(d)].join("")
      }else {
        return d
      }
    }
  }, Fg.g(c, N(['#inst "', "" + B(b.getUTCFullYear()), "-", d(b.getUTCMonth() + 1, 2), "-", d(b.getUTCDate(), 2), "T", d(b.getUTCHours(), 2), ":", d(b.getUTCMinutes(), 2), ":", d(b.getUTCSeconds(), 2), ".", d(b.getUTCMilliseconds(), 3), "-", '00:00"'], 0))) : r(b instanceof RegExp) ? Fg.g(c, N(['#"', b.source, '"'], 0)) : Fg.g(c, N(["#<", "" + B(b), ">"], 0))
};
function Ig(a) {
  var b = oa();
  if(Ec(a)) {
    b = ""
  }else {
    var c = B, d = new ma, f = new rb(d);
    a: {
      $(H(a), f, b);
      for(var a = F(K(a)), h = k, i = 0, j = 0;;) {
        if(j < i) {
          var m = h.S(h, j);
          A(f, " ");
          $(m, f, b);
          j += 1
        }else {
          if(a = F(a)) {
            h = a, Hc(h) ? (a = pb(h), i = qb(h), h = a, m = R(a), a = i, i = m) : (m = H(h), A(f, " "), $(m, f, b), a = K(h), h = k, i = 0), j = 0
          }else {
            break a
          }
        }
      }
    }
    ib(f);
    b = "" + c(d)
  }
  return b
}
function Jg(a) {
  var b = k;
  0 < arguments.length && (b = N(Array.prototype.slice.call(arguments, 0), 0));
  return Ig(b)
}
Jg.o = 0;
Jg.k = function(a) {
  a = F(a);
  return Ig(a)
};
Jg.g = function(a) {
  return Ig(a)
};
vb.prototype.R = g;
vb.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
Ic.prototype.R = g;
Ic.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
Ef.prototype.R = g;
Ef.prototype.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
Dd.prototype.R = g;
Dd.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
Nb.prototype.R = g;
Nb.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
fg.prototype.R = g;
fg.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
Jc.prototype.R = g;
Jc.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
ng.prototype.R = g;
ng.prototype.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
tg.prototype.R = g;
tg.prototype.F = function(a, b, c) {
  return Z(b, $, "#{", " ", "}", c, a)
};
bf.prototype.R = g;
bf.prototype.F = function(a, b, c) {
  return Z(b, $, "[", " ", "]", c, a)
};
td.prototype.R = g;
td.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
ud.prototype.R = g;
ud.prototype.F = function(a, b) {
  return A(b, "()")
};
yd.prototype.R = g;
yd.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
jg.prototype.R = g;
jg.prototype.F = function(a, b, c) {
  return Z(b, $, "(", " ", ")", c, a)
};
zf.prototype.R = g;
zf.prototype.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
bf.prototype.wb = g;
bf.prototype.xb = function(a, b) {
  return Pc.a(a, b)
};
function Kg(a, b, c, d) {
  this.state = a;
  this.m = b;
  this.Lb = c;
  this.Mb = d;
  this.j = 2153938944;
  this.t = 2
}
p = Kg.prototype;
p.C = function(a) {
  return a[ha] || (a[ha] = ++ia)
};
p.rb = function(a, b, c) {
  for(var d = F(this.Mb), f = k, h = 0, i = 0;;) {
    if(i < h) {
      var j = f.S(f, i), m = S.c(j, 0, k), j = S.c(j, 1, k);
      j.p ? j.p(m, a, b, c) : j.call(k, m, a, b, c);
      i += 1
    }else {
      if(d = F(d)) {
        Hc(d) ? (f = pb(d), d = qb(d), m = f, h = R(f), f = m) : (f = H(d), m = S.c(f, 0, k), j = S.c(f, 1, k), j.p ? j.p(m, a, b, c) : j.call(k, m, a, b, c), d = K(d), f = k, h = 0), i = 0
      }else {
        return k
      }
    }
  }
};
p.F = function(a, b, c) {
  A(b, "#<Atom: ");
  $(this.state, b, c);
  return A(b, ">")
};
p.I = n("m");
p.yb = n("state");
p.B = function(a, b) {
  return a === b
};
var Lg, Mg = k;
function Ng(a) {
  return new Kg(a, k, k, k)
}
function Og(a, b) {
  var c;
  c = b == k ? l : b ? ((c = b.j & 64) ? c : b.fb) ? g : b.j ? l : t(Da, b) : t(Da, b);
  var d = c ? T.a(pc, b) : b;
  c = ic.a(d, "\ufdd0:validator");
  d = ic.a(d, "\ufdd0:meta");
  return new Kg(a, d, c, k)
}
function Pg(a, b) {
  var c = k;
  1 < arguments.length && (c = N(Array.prototype.slice.call(arguments, 1), 0));
  return Og.call(this, a, c)
}
Pg.o = 1;
Pg.k = function(a) {
  var b = H(a), a = I(a);
  return Og(b, a)
};
Pg.g = Og;
Mg = function(a, b) {
  switch(arguments.length) {
    case 1:
      return Ng.call(this, a);
    default:
      return Pg.g(a, N(arguments, 1))
  }
  e(Error("Invalid arity: " + arguments.length))
};
Mg.o = 1;
Mg.k = Pg.k;
Mg.b = Ng;
Mg.g = Pg.g;
Lg = Mg;
function Qg(a, b) {
  var c = a.Lb;
  r(c) && !r(c.b ? c.b(b) : c.call(k, b)) && e(Error([B("Assert failed: "), B("Validator rejected reference state"), B("\n"), B(Jg.g(N([P(Ob(new C(k, "validate", "validate", 1233162959, k), new C(k, "new-value", "new-value", 972165309, k)), pc("\ufdd0:line", 6673, "\ufdd0:column", 13))], 0)))].join("")));
  c = a.state;
  a.state = b;
  jb(a, c, b);
  return b
}
var Rg, Sg = k;
function Tg(a, b) {
  return Qg(a, b.b ? b.b(a.state) : b.call(k, a.state))
}
function Ug(a, b, c) {
  return Qg(a, b.a ? b.a(a.state, c) : b.call(k, a.state, c))
}
function Vg(a, b, c, d) {
  return Qg(a, b.c ? b.c(a.state, c, d) : b.call(k, a.state, c, d))
}
function Wg(a, b, c, d, f) {
  return Qg(a, b.p ? b.p(a.state, c, d, f) : b.call(k, a.state, c, d, f))
}
function Xg(a, b, c, d, f, h) {
  return Qg(a, T.g(b, a.state, c, d, f, N([h], 0)))
}
function Yg(a, b, c, d, f, h) {
  var i = k;
  5 < arguments.length && (i = N(Array.prototype.slice.call(arguments, 5), 0));
  return Xg.call(this, a, b, c, d, f, i)
}
Yg.o = 5;
Yg.k = function(a) {
  var b = H(a), a = K(a), c = H(a), a = K(a), d = H(a), a = K(a), f = H(a), a = K(a), h = H(a), a = I(a);
  return Xg(b, c, d, f, h, a)
};
Yg.g = Xg;
Sg = function(a, b, c, d, f, h) {
  switch(arguments.length) {
    case 2:
      return Tg.call(this, a, b);
    case 3:
      return Ug.call(this, a, b, c);
    case 4:
      return Vg.call(this, a, b, c, d);
    case 5:
      return Wg.call(this, a, b, c, d, f);
    default:
      return Yg.g(a, b, c, d, f, N(arguments, 5))
  }
  e(Error("Invalid arity: " + arguments.length))
};
Sg.o = 5;
Sg.k = Yg.k;
Sg.a = Tg;
Sg.c = Ug;
Sg.p = Vg;
Sg.N = Wg;
Sg.g = Yg.g;
Rg = Sg;
function Zg() {
  var a = $g();
  return Sa(a)
}
var ah = k;
function $g() {
  ah == k && (ah = Lg.b(pa(["\ufdd0:parents", Cf, "\ufdd0:descendants", Cf, "\ufdd0:ancestors", Cf], g)));
  return ah
}
var bh, ch = k;
function dh(a, b) {
  return ch.c(Zg(), a, b)
}
function eh(a, b, c) {
  var d = L.a(b, c);
  if(!d && !(d = Nc((new zd("\ufdd0:ancestors")).call(k, a).call(k, b), c)) && (d = Gc(c))) {
    if(d = Gc(b)) {
      if(d = R(c) === R(b)) {
        for(var d = g, f = 0;;) {
          var h = ra(d);
          if(h ? h : f === R(c)) {
            return d
          }
          d = ch.c(a, b.b ? b.b(f) : b.call(k, f), c.b ? c.b(f) : c.call(k, f));
          f += 1
        }
      }else {
        return d
      }
    }else {
      return d
    }
  }else {
    return d
  }
}
ch = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return dh.call(this, a, b);
    case 3:
      return eh.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
ch.a = dh;
ch.c = eh;
bh = ch;
var fh, gh = k;
function hh(a) {
  return gh.a(Zg(), a)
}
function ih(a, b) {
  return pe(ic.a((new zd("\ufdd0:parents")).call(k, a), b))
}
gh = function(a, b) {
  switch(arguments.length) {
    case 1:
      return hh.call(this, a);
    case 2:
      return ih.call(this, a, b)
  }
  e(Error("Invalid arity: " + arguments.length))
};
gh.b = hh;
gh.a = ih;
fh = gh;
function jh(a, b, c, d) {
  Rg.a(a, function() {
    return Sa(b)
  });
  Rg.a(c, function() {
    return Sa(d)
  })
}
var lh = function kh(b, c, d) {
  var f = Sa(d).call(k, b), f = r(r(f) ? f.b ? f.b(c) : f.call(k, c) : f) ? g : k;
  if(r(f)) {
    return f
  }
  a: {
    for(f = fh.b(c);;) {
      if(0 < R(f)) {
        kh(b, H(f), d), f = I(f)
      }else {
        f = k;
        break a
      }
    }
    f = aa
  }
  if(r(f)) {
    return f
  }
  a: {
    for(b = fh.b(b);;) {
      if(0 < R(b)) {
        kh(H(b), c, d), b = I(b)
      }else {
        c = k;
        break a
      }
    }
    c = aa
  }
  return r(c) ? c : l
};
function mh(a, b, c) {
  c = lh(a, b, c);
  return r(c) ? c : bh.a(a, b)
}
var oh = function nh(b, c, d, f, h, i, j) {
  var m = U.c(function(f, i) {
    var j = S.c(i, 0, k);
    S.c(i, 1, k);
    if(bh.c(Sa(d), c, j)) {
      var m;
      m = (m = f == k) ? m : mh(j, H(f), h);
      m = r(m) ? i : f;
      r(mh(H(m), j, h)) || e(Error([B("Multiple methods in multimethod '"), B(b), B("' match dispatch value: "), B(c), B(" -> "), B(j), B(" and "), B(H(m)), B(", and neither is preferred")].join("")));
      return m
    }
    return f
  }, k, Sa(f));
  if(r(m)) {
    if(L.a(Sa(j), Sa(d))) {
      return Rg.p(i, mc, c, H(K(m))), H(K(m))
    }
    jh(i, f, j, d);
    return nh(b, c, d, f, h, i, j)
  }
  return k
};
function ph(a, b) {
  if(a ? a.pb : a) {
    return a.pb(0, b)
  }
  var c;
  var d = ph[q(a == k ? k : a)];
  d ? c = d : (d = ph._) ? c = d : e(v("IMultiFn.-get-method", a));
  return c.call(k, a, b)
}
function qh(a, b) {
  if(a ? a.ob : a) {
    return a.ob(a, b)
  }
  var c;
  var d = qh[q(a == k ? k : a)];
  d ? c = d : (d = qh._) ? c = d : e(v("IMultiFn.-dispatch", a));
  return c.call(k, a, b)
}
function rh(a, b, c, d, f, h, i, j) {
  this.name = a;
  this.Hb = b;
  this.Gb = c;
  this.Ma = d;
  this.Ga = f;
  this.Jb = h;
  this.Na = i;
  this.Ja = j;
  this.j = 4194304;
  this.t = 256
}
rh.prototype.C = function(a) {
  return a[ha] || (a[ha] = ++ia)
};
function sh(a, b) {
  var c = th;
  Rg.p(c.Ga, mc, a, b);
  jh(c.Na, c.Ga, c.Ja, c.Ma)
}
rh.prototype.pb = function(a, b) {
  L.a(Sa(this.Ja), Sa(this.Ma)) || jh(this.Na, this.Ga, this.Ja, this.Ma);
  var c = Sa(this.Na).call(k, b);
  if(r(c)) {
    return c
  }
  c = oh(this.name, b, this.Ma, this.Ga, this.Jb, this.Na, this.Ja);
  return r(c) ? c : Sa(this.Ga).call(k, this.Gb)
};
rh.prototype.ob = function(a, b) {
  var c = T.a(this.Hb, b), d = ph(a, c);
  r(d) || e(Error([B("No method in multimethod '"), B(zg), B("' for dispatch value: "), B(c)].join("")));
  return T.a(d, b)
};
function uh(a, b) {
  return qh(this, b)
}
function vh(a, b) {
  var c = k;
  1 < arguments.length && (c = N(Array.prototype.slice.call(arguments, 1), 0));
  return qh(this, c)
}
vh.o = 1;
vh.k = function(a) {
  H(a);
  a = I(a);
  return uh(0, a)
};
vh.g = uh;
rh.prototype.call = vh;
rh.prototype.apply = function(a, b) {
  return qh(this, b)
};
function wh(a, b, c, d) {
  this.pa = a;
  this.body = b;
  this.q = c;
  this.n = d;
  this.t = 0;
  this.j = 2229667594;
  2 < arguments.length ? (this.q = c, this.n = d) : this.n = this.q = k
}
p = wh.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return"\ufdd0:tag" === b ? this.pa : "\ufdd0:body" === b ? this.body : ic.c(this.n, b, c)
};
p.M = function(a, b, c) {
  return(s.a ? s.a("\ufdd0:tag", b) : s.call(k, "\ufdd0:tag", b)) ? new wh(c, this.body, this.q, this.n, k) : (s.a ? s.a("\ufdd0:body", b) : s.call(k, "\ufdd0:body", b)) ? new wh(this.pa, c, this.q, this.n, k) : new wh(this.pa, this.body, this.q, mc.c(this.n, b, c), k)
};
p.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "#sexpcode.types.Markup{", ", ", "}", c, Qd.a(W([Y.g(N(["\ufdd0:tag", this.pa], 0)), Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.J = function() {
  return F(Qd.a(W([Y.g(N(["\ufdd0:tag", this.pa], 0)), Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.G = function() {
  return 2 + R(this.n)
};
p.B = function(a, b) {
  var c;
  c = r(b) ? (c = a.constructor === b.constructor) ? tf(a, b) : c : b;
  return r(c) ? g : l
};
p.K = function(a, b) {
  return new wh(this.pa, this.body, b, this.n, this.l)
};
p.I = n("q");
p.ea = function(a, b) {
  return Nc(xg(["\ufdd0:body", k, "\ufdd0:tag", k]), b) ? sc.a(P(Te(Cf, a), this.q), b) : new wh(this.pa, this.body, this.q, pe(sc.a(this.n, b)), k)
};
function xh(a, b, c) {
  this.body = a;
  this.q = b;
  this.n = c;
  this.t = 0;
  this.j = 2229667594;
  1 < arguments.length ? (this.q = b, this.n = c) : this.n = this.q = k
}
p = xh.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return"\ufdd0:body" === b ? this.body : ic.c(this.n, b, c)
};
p.M = function(a, b, c) {
  return(s.a ? s.a("\ufdd0:body", b) : s.call(k, "\ufdd0:body", b)) ? new xh(c, this.q, this.n, k) : new xh(this.body, this.q, mc.c(this.n, b, c), k)
};
p.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "#sexpcode.types.Verbatim{", ", ", "}", c, Qd.a(W([Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.J = function() {
  return F(Qd.a(W([Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.G = function() {
  return 1 + R(this.n)
};
p.B = function(a, b) {
  var c;
  c = r(b) ? (c = a.constructor === b.constructor) ? tf(a, b) : c : b;
  return r(c) ? g : l
};
p.K = function(a, b) {
  return new xh(this.body, b, this.n, this.l)
};
p.I = n("q");
p.ea = function(a, b) {
  return Nc(xg(["\ufdd0:body", k]), b) ? sc.a(P(Te(Cf, a), this.q), b) : new xh(this.body, this.q, pe(sc.a(this.n, b)), k)
};
function yh(a, b, c) {
  this.body = a;
  this.q = b;
  this.n = c;
  this.t = 0;
  this.j = 2229667594;
  1 < arguments.length ? (this.q = b, this.n = c) : this.n = this.q = k
}
p = yh.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return"\ufdd0:body" === b ? this.body : ic.c(this.n, b, c)
};
p.M = function(a, b, c) {
  return(s.a ? s.a("\ufdd0:body", b) : s.call(k, "\ufdd0:body", b)) ? new yh(c, this.q, this.n, k) : new yh(this.body, this.q, mc.c(this.n, b, c), k)
};
p.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "#sexpcode.types.Quote{", ", ", "}", c, Qd.a(W([Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.J = function() {
  return F(Qd.a(W([Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.G = function() {
  return 1 + R(this.n)
};
p.B = function(a, b) {
  var c;
  c = r(b) ? (c = a.constructor === b.constructor) ? tf(a, b) : c : b;
  return r(c) ? g : l
};
p.K = function(a, b) {
  return new yh(this.body, b, this.n, this.l)
};
p.I = n("q");
p.ea = function(a, b) {
  return Nc(xg(["\ufdd0:body", k]), b) ? sc.a(P(Te(Cf, a), this.q), b) : new yh(this.body, this.q, pe(sc.a(this.n, b)), k)
};
function zh(a, b, c, d) {
  this.left = a;
  this.right = b;
  this.q = c;
  this.n = d;
  this.t = 0;
  this.j = 2229667594;
  2 < arguments.length ? (this.q = c, this.n = d) : this.n = this.q = k
}
p = zh.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return"\ufdd0:left" === b ? this.left : "\ufdd0:right" === b ? this.right : ic.c(this.n, b, c)
};
p.M = function(a, b, c) {
  return(s.a ? s.a("\ufdd0:left", b) : s.call(k, "\ufdd0:left", b)) ? new zh(c, this.right, this.q, this.n, k) : (s.a ? s.a("\ufdd0:right", b) : s.call(k, "\ufdd0:right", b)) ? new zh(this.left, c, this.q, this.n, k) : new zh(this.left, this.right, this.q, mc.c(this.n, b, c), k)
};
p.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "#sexpcode.types.Node{", ", ", "}", c, Qd.a(W([Y.g(N(["\ufdd0:left", this.left], 0)), Y.g(N(["\ufdd0:right", this.right], 0))]), this.n))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.J = function() {
  return F(Qd.a(W([Y.g(N(["\ufdd0:left", this.left], 0)), Y.g(N(["\ufdd0:right", this.right], 0))]), this.n))
};
p.G = function() {
  return 2 + R(this.n)
};
p.B = function(a, b) {
  var c;
  c = r(b) ? (c = a.constructor === b.constructor) ? tf(a, b) : c : b;
  return r(c) ? g : l
};
p.K = function(a, b) {
  return new zh(this.left, this.right, b, this.n, this.l)
};
p.I = n("q");
p.ea = function(a, b) {
  return Nc(xg(["\ufdd0:right", k, "\ufdd0:left", k]), b) ? sc.a(P(Te(Cf, a), this.q), b) : new zh(this.left, this.right, this.q, pe(sc.a(this.n, b)), k)
};
function Ah(a, b, c, d) {
  this.language = a;
  this.body = b;
  this.q = c;
  this.n = d;
  this.t = 0;
  this.j = 2229667594;
  2 < arguments.length ? (this.q = c, this.n = d) : this.n = this.q = k
}
p = Ah.prototype;
p.C = function(a) {
  var b = this.l;
  return b != k ? b : this.l = a = qd(a)
};
p.H = function(a, b) {
  return a.v(a, b, k)
};
p.v = function(a, b, c) {
  return"\ufdd0:language" === b ? this.language : "\ufdd0:body" === b ? this.body : ic.c(this.n, b, c)
};
p.M = function(a, b, c) {
  return(s.a ? s.a("\ufdd0:language", b) : s.call(k, "\ufdd0:language", b)) ? new Ah(c, this.body, this.q, this.n, k) : (s.a ? s.a("\ufdd0:body", b) : s.call(k, "\ufdd0:body", b)) ? new Ah(this.language, c, this.q, this.n, k) : new Ah(this.language, this.body, this.q, mc.c(this.n, b, c), k)
};
p.F = function(a, b, c) {
  return Z(b, function(a) {
    return Z(b, $, "", " ", "", c, a)
  }, "#sexpcode.types.Code{", ", ", "}", c, Qd.a(W([Y.g(N(["\ufdd0:language", this.language], 0)), Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.D = function(a, b) {
  return Gc(b) ? a.M(a, w.a(b, 0), w.a(b, 1)) : U.c(xa, a, b)
};
p.J = function() {
  return F(Qd.a(W([Y.g(N(["\ufdd0:language", this.language], 0)), Y.g(N(["\ufdd0:body", this.body], 0))]), this.n))
};
p.G = function() {
  return 2 + R(this.n)
};
p.B = function(a, b) {
  var c;
  c = r(b) ? (c = a.constructor === b.constructor) ? tf(a, b) : c : b;
  return r(c) ? g : l
};
p.K = function(a, b) {
  return new Ah(this.language, this.body, b, this.n, this.l)
};
p.I = n("q");
p.ea = function(a, b) {
  return Nc(xg(["\ufdd0:language", k, "\ufdd0:body", k]), b) ? sc.a(P(Te(Cf, a), this.q), b) : new Ah(this.language, this.body, this.q, pe(sc.a(this.n, b)), k)
};
var Bh, Ch = k;
function Dh(a, b) {
  return jf(("" + B(a)).split(b))
}
function Eh(a, b, c) {
  if(1 > c) {
    return jf(("" + B(a)).split(b))
  }
  for(var d = gf;;) {
    if(L.a(c, 1)) {
      return Xb.a(d, a)
    }
    var f = Cg(b, a);
    if(r(f)) {
      var h = f, f = a.indexOf(h), h = a.substring(f + R(h)), c = c - 1, d = Xb.a(d, a.substring(0, f)), a = h
    }else {
      return Xb.a(d, a)
    }
  }
}
Ch = function(a, b, c) {
  switch(arguments.length) {
    case 2:
      return Dh.call(this, a, b);
    case 3:
      return Eh.call(this, a, b, c)
  }
  e(Error("Invalid arity: " + arguments.length))
};
Ch.a = Dh;
Ch.c = Eh;
Bh = Ch;
var th, Fh = Lg.b(Cf), Gh = Lg.b(Cf), Hh = Lg.b(Cf), Ih = Lg.b(Cf), Jh = ic.c(Cf, "\ufdd0:hierarchy", $g());
th = new rh("evaluate", ta, "\ufdd0:default", Jh, Fh, Gh, Hh, Ih);
function Kh(a) {
  return Ec(a) ? "" : th.b ? th.b(a) : th.call(k, a)
}
sh(String, ba());
sh(wh, function(a) {
  return pd.g("[%s]%s[/%s]", N([(new zd("\ufdd0:tag")).call(k, a), Kh((new zd("\ufdd0:body")).call(k, a)), (new zd("\ufdd0:tag")).call(k, a)], 0))
});
sh(zh, function(a) {
  return[B(Kh((new zd("\ufdd0:left")).call(k, a))), B(Kh((new zd("\ufdd0:right")).call(k, a)))].join("")
});
sh(Ah, function(a) {
  return pd.g("[code]%s[/code]", N([(new zd("\ufdd0:body")).call(k, a)], 0))
});
sh(xh, function(a) {
  return(new zd("\ufdd0:body")).call(k, a)
});
function Lh(a) {
  var a = Bh.c(Kh(a), /\n/, 2), b = S.c(a, 0, k), c = S.c(a, 1, k);
  return 1 < R(a) ? [B(b), B("[o]\n"), B(c), B("[/o]")].join("") : b
}
sh(yh, function(a) {
  return[B("> "), B(Lh((new zd("\ufdd0:body")).call(k, a)))].join("")
});
function Mh(a, b) {
  var c = a.b ? a.b(b) : a.call(k, b), d = S.c(c, 0, k), c = S.c(c, 1, k);
  return ke.a(c, new C(k, "error", "error", -1543746623, k)) ? W([d, c]) : l
}
var Nh = xg([k, k, "{", k, "}", k]);
function Oh(a, b) {
  return new wh(b, a)
}
function Ph(a) {
  if(ra(Cg(/^\{\W.*\s(\s|.*)/, a))) {
    return W([a, new C(k, "error", "error", -1543746623, k)])
  }
  var b = Cg(/^\{(\W[^\s]*)/, a);
  S.c(b, 0, k);
  var b = S.c(b, 1, k), c = Bh.c(a, Dg(pd.g("\\{%s\\s", N([b], 0))), 2);
  S.c(c, 0, k);
  var c = S.c(c, 1, k), b = Bh.c(c, Dg(pd.g("\\s%s\\}", N([b], 0))), 2), c = S.c(b, 0, k), d = S.c(b, 1, k);
  return 1 < R(b) ? W([d, new xh(c)]) : W([a, new C(k, "error", "error", -1543746623, k)])
}
function Qh(a) {
  var b = Bg(/^\{code(\W\S*)\s+(\S+)\s((.|\s)*)/, a);
  S.c(b, 0, k);
  var c = S.c(b, 1, k), d = S.c(b, 2, k), b = S.c(b, 3, k);
  if(qe(te.a(ra, qa), W([c, d, b]))) {
    var c = Dg(pd.g("%s\\}", N([c], 0))), c = Bh.c(b, c, 2), b = S.c(c, 0, k), f = S.c(c, 1, k);
    return 1 < R(c) ? W([f, new Ah(d, b)]) : W([a, new C(k, "error", "error", -1543746623, k)])
  }
  return W([a, new C(k, "error", "error", -1543746623, k)])
}
function Rh(a) {
  var b = Bg(/\{quote\s((\s|.)*)/, a);
  if(r(b)) {
    S.c(b, 0, k);
    var b = S.c(b, 1, k), c = Sh.b ? Sh.b(b) : Sh.call(k, b), b = S.c(c, 0, k), c = S.c(c, 1, k), d = ke.a(c, new C(k, "error", "error", -1543746623, k));
    return(d ? L.a(H(b), "}") : d) ? W([ld.a(b, 1), new yh(c)]) : W([a, new C(k, "error", "error", -1543746623, k)])
  }
  return W([a, new C(k, "error", "error", -1543746623, k)])
}
function Th(a) {
  if(ra(Cg(/^\{\w(\s|.)*/, a))) {
    return W([a, new C(k, "error", "error", -1543746623, k)])
  }
  var b;
  b = Bh.c(a, /\s/, 2);
  var c = S.c(b, 0, k);
  b = S.c(b, 1, k);
  c = ld.a(c, 1);
  c = Bh.a(c, /\./);
  c = od.a(function(a) {
    var b = Cg(/(\w+)(?:\*|\^)(\d+)/, a);
    return r(b) ? (S.c(b, 0, k), a = S.c(b, 1, k), b = S.c(b, 2, k), He.a(parseInt(b), a)) : a
  }, c);
  c = Se(function(a) {
    return!Fc(a)
  }, I(function i(a) {
    return new Dd(k, l, function() {
      return O(a, r(Fc.b ? Fc.b(a) : Fc.call(k, a)) ? Me.a(i, F.b ? F.b(a) : F.call(k, a)) : k)
    }, k)
  }(c)));
  b = W([b, c]);
  c = S.c(b, 0, k);
  b = S.c(b, 1, k);
  var d = Sh.b ? Sh.b(c) : Sh.call(k, c), c = S.c(d, 0, k), d = S.c(d, 1, k), f = ke.a(d, new C(k, "error", "error", -1543746623, k));
  return(f ? L.a(H(c), "}") : f) ? W([ld.a(c, 1), U.c(Oh, d, vd(b))]) : W([a, new C(k, "error", "error", -1543746623, k)])
}
function Uh(a) {
  for(var b = "", c = new C(k, "base", "base", -1637515126, k);;) {
    var d = H(a), f = L, h = c;
    if(f.a ? f.a(new C(k, "base", "base", -1637515126, k), h) : f.call(k, new C(k, "base", "base", -1637515126, k), h)) {
      if(L.a(d, "\\")) {
        a = ld.a(a, 1), d = new C(k, "slash", "slash", -1531012298, k)
      }else {
        if(Nc(Nh, d)) {
          return W([a, b])
        }
        a = ld.a(a, 1);
        b = [B(b), B(d)].join("");
        d = new C(k, "base", "base", -1637515126, k)
      }
      c = d
    }else {
      (f.a ? f.a(new C(k, "slash", "slash", -1531012298, k), h) : f.call(k, new C(k, "slash", "slash", -1531012298, k), h)) ? (d = ((c = L.a(d, "{")) ? c : L.a(d, "}")) ? d : [B("\\"), B(d)].join(""), a = ld.a(a, 1), b = [B(b), B(d)].join(""), c = d = new C(k, "base", "base", -1637515126, k)) : e(Error([B("No matching clause: "), B(h)].join("")))
    }
  }
}
var Sh = function Vh(b) {
  if(Ec(b)) {
    return W(["", ""])
  }
  var c = function() {
    var c = Mh(Ph, b);
    if(r(c)) {
      return c
    }
    c = Mh(Qh, b);
    if(r(c)) {
      return c
    }
    c = Mh(Rh, b);
    if(r(c)) {
      return c
    }
    c = Mh(Th, b);
    return r(c) ? c : k
  }();
  if(r(c)) {
    var d = S.c(c, 0, k), c = S.c(c, 1, k), d = Mh(Vh, d);
    if(r(d)) {
      var f = d, d = S.c(f, 0, k), f = S.c(f, 1, k);
      return W([d, new zh(c, f)])
    }
    return W([b, new C(k, "error", "error", -1543746623, k)])
  }
  c = Uh.b ? Uh.b(b) : Uh.call(k, b);
  d = S.c(c, 0, k);
  c = S.c(c, 1, k);
  d = ke.a(c, "") ? W([d, c]) : l;
  return r(d) ? (c = d, d = S.c(c, 0, k), c = S.c(c, 1, k), f = Mh(Vh, d), r(f) ? (d = S.c(f, 0, k), f = S.c(f, 1, k), W([d, new zh(c, f)])) : W([d, c])) : r(Y.g(N([b, ""], 0))) ? Y.g(N([b, ""], 0)) : k
};
function Wh(a) {
  var b = document.createElement("tr"), c = document.createElement("button");
  c.setAttribute("type", "button");
  c.appendChild(document.createTextNode("Expand!"));
  var d = document.createElement("td");
  d.setAttribute("style", "text-align:right");
  d.appendChild(c);
  b.appendChild(document.createElement("td"));
  b.appendChild(document.createElement("td"));
  b.appendChild(document.createElement("td"));
  b.appendChild(document.createElement("td"));
  b.appendChild(d);
  var c = b.getElementsByTagName("button").item(0), f = a.getElementsByTagName("textarea").item(0), d = f.parentNode.parentNode.nextElementSibling;
  f.style.width = "100%";
  c.addEventListener("click", function() {
    var a = f.value, b;
    b = Sh(a);
    var c = S.c(b, 0, k);
    b = S.c(b, 1, k);
    b = Ec(c) ? W([Kh(b), new C(k, "success", "success", 787265980, k)]) : W([[B("Syntax error: "), B(c)].join(""), new C(k, "error", "error", -1543746623, k)]);
    c = S.c(b, 0, k);
    b = S.c(b, 1, k);
    return L.a(b, new C(k, "error", "error", -1543746623, k)) ? f.value = [B(a), B("\n"), B(c)].join("") : f.value = c
  });
  return a.lastChild.insertBefore(b, d)
}

var __horror__ = function() {
  var a;
  a: {
    a = function(a, b) {
      return a.item(b)
    };
    for(var b = document.getElementsByClassName("postform"), c = b.length, d = 0;;) {
      if(d < c) {
        Wh.b ? Wh.b(a.a ? a.a(b, d) : a.call(k, b, d)) : Wh.call(k, a.a ? a.a(b, d) : a.call(k, b, d)), d += 1
      }else {
        a = k;
        break a
      }
    }
    a = aa
  }
  return a
};

fa("sexpcode.userscript.take_over_BANG_", __horror__);
fa("sexpcode.core.bbcode_read", function(a) {
  var b = Sh(a), a = S.c(b, 0, k), b = S.c(b, 1, k);
  return Ec(a) ? Kh(b) : [B("Syntax error: "), B(a)].join("")
});

__horror__();
