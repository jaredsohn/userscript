// ==UserScript==
// @name          Userscripts.org old script revisions navbar
// @namespace     http://github.com/johan/
// @description   Adds a past revisions navbar for the us.o source code view
// @include       http://userscripts.org/scripts/review/*
// ==/UserScript==

// get site jQuery
var $ = (typeof unsafeWindow == "undefined" ? window : unsafeWindow).$;

var id = location.pathname.split("/").pop();
$.getJSON('/api/v0/script.js', { id: id }, show_rev_bar);

function show_rev_bar(json) {
  var v = json.script.versions, revs = [], dates = [], links, i;

  for (i in v) {
    revs.push(i);
    dates.push(new Date(v[i] * 1e3));
  }
  revs.sort();
  dates.sort();

  links = [source(revs[0], dates[0])];
  for (i = 1; i < revs.length; i++) {
    var rev = revs[i], date = dates[i];
    links.push(
      diff(rev, i),
      source(rev, date, i)
    );
  }

  var header = $("p.notice").append(document.createElement("br"));
  header.append.apply(header, links);
}

function A() {
  var a = document.createElement("a");
  a.style.margin = "0 5px";
  return a;
}

function source(rev, date, no) {
  var a = A();
  a.href = "/scripts/version/"+ id +"/"+ rev +".user.js";;
  a.title = format_date(date);
  a.textContent = (no || 0) + 1;
  return a;
}

function diff(rev, no) {
  var a = A();
  a.href = "/scripts/diff/"+ id +"/"+ rev +"/";
  a.title = "changes between v"+ no +" and v"+ (no+1);
  a.style.textDecoration = "none";
  a.textContent = "Δ";
  return a;
}

function zeropad(num) {
  return ((num < 10) ? '0' : '') + num;
}

function format_date(date) {
  return date.getFullYear() +
    "-" + zeropad(date.getMonth() + 1) +
    "-" + zeropad(date.getDate()) +
    "T" + zeropad(date.getHours()) +
    ":" + zeropad(date.getMinutes()) +
    ":" + zeropad(date.getSeconds());
}
