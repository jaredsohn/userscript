// ==UserScript==
// @id             www.cnbeta.com-79281592-b6da-4527-922e-1f3380883b6f@simon
// @name           #from_ancient_cb_out_comment
// @version        1.0
// @namespace      simon
// @author         Simon Chan
// @description    Share commnet of cnBeta to Google+
// @include        http://www.cnbeta.com/articles/*
// @match          http://www.cnbeta.com/articles/*
// @run-at         document-end
// ==/UserScript==
for (var formatText = "", GplusPost = function (n, t) { GM_xmlhttpRequest({ method: "GET", url: "https://plus.google.com/", onload: function (i) { var r; if (i.responseText.match(/AObGSA.*:\d+/)) { r = encodeURIComponent(RegExp.lastMatch), i.responseText.match(/oid=\"(\d+)\"/); var e = RegExp.$1, f = { aclEntries: [{ scope: { scopeType: "anyone", name: "anyone", id: "anyone", me: !0, requiresKey: !1 }, role: 20 }, { scope: { scopeType: "anyone", name: "anyone", id: "anyone", me: !0, requiresKey: !1 }, role: 60 }] }, u = [n, "oz:" + e + "." + (+new Date).toString(16) + ".0", t, null, null, null, "[]", null, JSON.stringify(f), !0, [], !1, !1, null, [], !1, !1]; GM_xmlhttpRequest({ method: "POST", url: "https://plus.google.com/_/sharebox/post/?spam=20&rt=j", headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }, data: "spar=" + encodeURIComponent(JSON.stringify(u)) + "&at=" + r }) } } }) }, comments = document.getElementsByClassName("mark"), menuitem, i = 0; i < comments.length; i++) menuitem = document.createElement("a"), menuitem.innerHTML = "Share to Google+", menuitem.onclick = function (n) { GplusPost("#\u81ea\u53e4cb\u51fa\u8bc4\u8bba\n" + n.target.parentNode.parentNode.previousElementSibling.innerHTML.replace(/\s+\n\s+/, "") + "\n\n" + document.title + "\n" + document.URL) }, comments[i].appendChild(menuitem)