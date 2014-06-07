// ==UserScript==
// @name           KaraktersizSozluk
// @namespace      mea
// @description    Eksi sozluk'e Turkce Karakter Girisi Icin Eklemeler Yapan Script v0.24
// @version        0.24
// @include        http://sozluk.sourtimes.org/*
// @include        http://eksisozluk.com/*
// @include        http://www.eksisozluk.com/*
// ==/UserScript==


function i() {
  this.a = {};
  this.a[67] = "\u00e7";
  this.a[71] = "\u011f";
  this.a[73] = "\u0131";
  this.a[79] = "\u00f6";
  this.a[83] = "\u015f";
  this.a[85] = "\u00fc"
}
i.prototype = {g:function(a, b, f) {
  var d = a.scrollTop;
  a.focus();
  if(document.selection && !window.opera) {
    var g = document.selection.createRange();
    if(g.parentElement() == a) {
      g.text = b + g.text + f;
      g.select()
    }
  }else if(a.selectionStart || a.selectionStart == "0") {
    f = a.value;
    g = a.selectionEnd;
    var h = a.selectionStart;
    a.value = f.substring(0, h) + b + f.substring(g);
    a.setSelectionRange(h + 1, h + 1)
  }else a.value += b + f;
  a.scrollTop = d;
  return true
}, f:function(a) {
  if(confirm("B\u00fcy\u00fck harfleri T\u00fcrk\u00e7e kar\u015f\u0131l\u0131klar\u0131na \u00e7evirmek istiyor musunuz?"))if(a) {
    var b = a.value.replace(/C/g, this.a[67]);
    b = b.replace(/I/g, this.a[73]);
    b = b.replace(/G/g, this.a[71]);
    b = b.replace(/O/g, this.a[79]);
    b = b.replace(/S/g, this.a[83]);
    b = b.replace(/U/g, this.a[85]);
    a.value = b
  }
}, d:function(a, b) {
  var f = a.shiftKey, d = window.event ? (d = a.keyCode) : (d = a.which);
  if(f)if(this.a[d])if(this.g(b, this.a[d], "")) {
    a && a.preventDefault() && a.preventDefault();
    return false
  }
}, e:function(a, b) {
  var f = this;
  if(a && b) {
    var d = "charpanel" + a.id + "_" + b.id, g = document.getElementById(d);
    if(!g) {
      g = document.createElement("span");
      g.setAttribute("id", d);
      d = document.createElement("input");
      d.setAttribute("type", "button");
      d.setAttribute("value", "karakterleri \u00e7evir");
      d.setAttribute("class", "but");
      d.addEventListener("click", function() {
        f.f(b)
      }, false);
      g.appendChild(d);
      a.appendChild(g)
    }
  }
}, b:function(a, b) {
  var f = this;
  if(a && (a.tagName.toLowerCase() == "textarea" || a.tagName.toLowerCase() == "input" && a.type == "text")) {
    if(a.addEventListener)a.addEventListener("keypress", function(d) {
      return f.d(d, a)
    }, false);
    else a.attachEvent && a.attachEvent("onkeypress", f.d(e, a));
    b != false && this.e(a.parentNode, a)
  }
}};
window.c = new i;
window.c.b(document.getElementById("d"));
window.c.b(document.getElementById("t"), false);
window.c.b(document.getElementById("msg"));
window.c.b(document.getElementsByName("kw")[0], false);
window.c.b(document.getElementsByName("rt")[0], false);
