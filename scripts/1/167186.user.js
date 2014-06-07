// ==UserScript==
// @name        LoU Incoming
// @description Adds extra information to Lord of Ultima attack panel
// @namespace   MousePak
// @include     http://prodgame*.lordofultima.com/*/index.aspx*
// @version     1.0.1
// @require     http://sizzlemctwizzle.com/updater.php?id=167186&days=7
// @grant       none
// ==/UserScript==
(function () {
  function b(a) {
    window.console && "function" == typeof console.log && console.log("LoUIncoming: " + a)
  }
  function c() {
    b("Injecting script");
    var c = document.createElement("script"),
      d = "" + a;
    window.opera !== void 0 && (d = d.replace(/</g, "<")), c.innerHTML = "(" + d + ")();", c.type = "text/javascript", document.getElementsByTagName("head")[0].appendChild(c)
  }
  var a = function () {
    function b(a) {
      window.console && "function" == typeof console.log && console.log("LoUIncoming: " + a)
    }
    function c() {
      for (var a = [webfrontend.config.Config.getInstance().getChat(), qx.core.Init.getApplication().chat], c = a.length, d = !0; c--;) a[c] || (b("dependency missing [" + c + "]"), d = !1);
      return b("checkDependencies result[" + d + "]"), d
    }
    var d = function () {
      qx.Class.define("LoUIncoming.Main", {
        type: "singleton",
        extend: qx.core.Object,
        members: {
          app: null,
          continents: null,
          runonce: null,
          timecheck: 0,
          alliance_faith: null,
          initialize: function () {
            this.continents = [], this.app = qx.core.Init.getApplication(), this.tweakEXT()
          },
          AlliancePoll: function () {
            b("Alliance faith poll");
            var a = webfrontend.net.UpdateManager.getInstance(),
              c = new qx.util.StringBuilder(2048);
            c.add('{"session":"', a.getInstanceGuid(), '","start":0,"end":49,"continent":-1,"sort":7,"ascending":true,"type":2}'), a.requestCounter++;
            var d = new qx.io.remote.Request(a.getUpdateService() + "/Service.svc/ajaxEndpoint/AllianceGetRange", "POST", "application/json");
            d.setProhibitCaching(!1), d.setRequestHeader("Content-Type", "application/json"), d.setData(c.get()), d.setTimeout(1e4), d.addListener("completed", function (a) {
              alliance_faith = a.$$user_content
            }), d.send(), LoUIncoming.Main.prototype.timecheck = new Date, LoUIncoming.Main.prototype.timecheck = LoUIncoming.Main.prototype.timecheck.getTime()
          },
          tweakEXT: function () {
            this.toolTip(), this.chat = webfrontend.data.Chat.getInstance(), webfrontend.gui.Alliance.Overviews.IncomingAttacksPage.prototype.__iO = this.incomingAttacksPage_iO, webfrontend.gui.Alliance.Overviews.IncomingAttacksPage.prototype.__sq = this.incomingAttacksPageTooltip
          },
          toolTip: function () {
            LoUIncoming.Tooltip.getInstance().init()
          },
          incomingAttacksPage_iO: function () {
            if (this.__rM.length > 0) {
              var a = new Date,
                b = a.getTime();
              b - LoUIncoming.Main.prototype.timecheck > 6e4 && LoUIncoming.Main.prototype.AlliancePoll(), -1 != this.__rH && b - 6e4 * this.__rI > this.__rH && 0 == this.__rK && 1 == this.__rL && (this.__rK = !0)
            }
          },
          incomingAttacksPageTooltip: function (a, b) {
            var d = this.__rO.getRowData(b),
              e = d.command,
              f = e.m,
              g = e.ms,
              h = "tnf:is moongate_tt ao",
              i = webfrontend.gui.Alliance.Overviews.IncomingAttacksPage.cols,
              j = "",
              k = j,
              l = "<br/>",
              m = "tnf:latest return time: %1 tt ao",
              n = "<b>",
              o = "</b>";
            switch (a) {
            case i.icon:
              f === !0 && (k = this.tr(h), 0 !== g && (k += l + this.tr(m, n + webfrontend.Util.getDateTimeString(webfrontend.data.ServerTime.getInstance().getStepTime(g)) + o)));
              break;
            case i.type:
              k = d.type;
              break;
            case i.defender:
              k = d.defPlayer;
              break;
            case i.target:
            case i.coordinates:
              k = LoUIncoming.Tooltip._buildExtraCityTooltip(e.tc, !0, e.c, e.es, e.ds, e.t, e.m, d.sourceAlliance);
              break;
            case i.arrives:
              k = d.time;
              break;
            case i.attacker:
              k = d.sourcePlayer;
              break;
            case i.alliance:
              k = d.sourceAlliance;
              break;
            case i.source:
              k = LoUIncoming.Tooltip._buildExtraCityTooltip(e.c, !1, e.tc, e.es, e.ds, e.t, e.m, d.sourceAlliance);
              break;
            case i.spotted:
              k = d.spotted;
              break;
            case i.ts_attacker:
              k = d.ts_attacker;
              break;
            case i.ts_defender:
              k = d.ts_defender;
              break;
            case i.claim:
              k = d.claim
            }
            return k += j, a !== i.icon && a !== i.source && a !== i.target && a !== i.coordinates && (k = qx.lang.String.stripTags(k)), k === j ? null : k
          }
        }
      });
      var d = '<table cellspacing="0"><tr><td colspan="2">',
        j = "<tr><td>",
        p = '</td><td style="white-space: nowrap;">',
        r = "</td></tr>",
        t = "</table>",
        jb = "&nbsp;";
      qx.Class.define("LoUIncoming.Provider", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function () {
          this.base(arguments), this.requestCounter = 0, this.waitForResponse = !1, this.timeoutCounter = 0, this.lastPoll = 0, this.Data = {}, this.Requests = []
        },
        members: {
          Data: null,
          getContiData: function (a) {
            return this.Data[a] !== void 0 ? this.Data[a] : null
          }
        }
      }), qx.Class.define("LoUIncoming.Tooltip", {
        type: "singleton",
        extend: qx.core.Object,
        construct: function () {
          this.base(arguments)
        },
        members: {
          init: function () {}
        },
        statics: {
          _buildExtraCityTooltip: function (a, b, c, e, f, g, h, i) {
            this.serverTime = webfrontend.data.ServerTime.getInstance();
            var k = new qx.util.StringBuilder,
              l = LoUIncoming.Provider.getInstance(),
              m = webfrontend.data.Server.getInstance(),
              n = webfrontend.gui.Util;
            n.formatCoordinates(65535 & a, a >> 16), bc = m.getContinentFromCoords(65535 & a, a >> 16), bc2 = m.getContinentFromCoords(65535 & c, c >> 16);
            var q = bc == bc2 && 0 == h;
            bD2 = l.getContiData(bc), k.add(d), k.add(r, j), pre = k.get();
            var s = [0, 1, 3, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50];
            cp = 0, op = 0, sp = 0;
            for (var u = 0; alliance_faith.length > u; u++) {
              var v = alliance_faith[u];
              i.indexOf(">" + v.n + "<") > 1 && (cp = Math.ceil(.5 * (v.cp > 100 ? 100 : v.cp)), op = Math.ceil(.5 * (v.op > 100 ? 100 : v.op)), sp = Math.ceil(.5 * (v.sp > 100 ? 100 : v.sp)))
            }
            var w = n.formatCoordinates(65535 & a, a >> 16).split(":"),
              x = n.formatCoordinates(65535 & c, c >> 16).split(":"),
              y = w.length > 1 && x.length > 1 ? Math.sqrt(Math.pow(w[0] - x[0], 2) + Math.pow(w[1] - x[1], 2)) : 0;
            y = 0 == y ? 1 : y;
            var z = (this.serverTime.getStepTime(e) - this.serverTime.getStepTime(f)) / y;
            Math.round(z / 864e5), Math.round(z % 864e5 / 36e5), Math.round(z % 864e5 % 36e5 / 6e4);
            var D = Math.ceil(z / 1e3);
            try {
              InSc = Math.round(10 * Math.round(100 * (8 / (D / 60) - 1)) / 10), InCa = Math.round(10 * Math.round(100 * (10 / (D / 60) - 1)) / 10), InIn = Math.round(10 * Math.round(100 * (20 / (D / 60) - 1)) / 10), InSi = Math.round(10 * Math.round(100 * (30 / (D / 60) - 1)) / 10), InBa = Math.round(10 * Math.round(100 * (40 / (D / 60) - 1)) / 10), InSc2 = InSc - cp, InCa2 = InCa - cp, InIn2 = InIn - cp, InSi2 = InSi - op, InBa2 = InBa - sp
            } catch (E) {
              console.error(E)
            }
            return 5 == g ? k.add(d + "Suggested " + (q ? "Land: " : "<b>Water</b>:") + p + jb + jb + "Castle under siege" + r) : h ? k.add(d + "Suggested " + "<b>Moongate:</b>, not implimented yet." + r) : q ? k.add(d + "Suggested " + "Land: " + p + jb + jb + (s.indexOf(InBa2) > 0 && InBa >= 0 && 200 >= InBa ? "<b>*" : "") + "Baron: " + (InBa >= 0 && 200 >= InBa ? InBa + "%" : "<del>" + InBa + "%</del>") + (s.indexOf(InBa2) > 0 && InBa >= 0 && 200 >= InBa ? "</b>" : "") + jb + jb + (s.indexOf(InSi2) > 0 && InSi >= 0 && 200 >= InSi ? "<b>*" : "") + "Siege: " + (InSi >= 0 && 200 >= InSi ? InSi + "%" : "<del>" + InSi + "%</del>") + (s.indexOf(InSi2) > 0 && InSi >= 0 && 200 >= InSi ? "</b>" : "") + jb + jb + (s.indexOf(InIn2) > 0 && InIn >= 0 && 200 >= InIn ? "<b>*" : "") + "Infantry: " + (InIn >= 0 && 200 >= InIn ? InIn + "%" : "<del>" + InIn + "%</del>") + (s.indexOf(InIn2) > 0 && InIn >= 0 && 200 >= InIn ? "</b>" : "") + jb + jb + (s.indexOf(InCa2) > 0 && InCa >= 0 && 200 >= InCa ? "<b>*" : "") + "Cav: " + (InCa >= 0 && 200 >= InCa ? InCa + "%" : "<del>" + InCa + "%</del>") + (s.indexOf(InCa2) > 0 && InCa >= 0 && 200 >= InCa ? "</b>" : "") + jb + jb + (s.indexOf(InSc2) > 0 && InSc >= 0 && 200 >= InSc ? "<b>*" : "") + "Scout: " + (InSc >= 0 && 200 >= InSc ? InSc + "%" : "<del>" + InSc + "%</del>") + (s.indexOf(InSc2) > 0 && InSc >= 0 && 200 >= InSc ? "</b>" : "") + r) : k.add(d + "Suggested " + "<b>Water:</b>, unable to determine navy attack types." + r), k.add(r, t), k.get()
          }
        }
      }), GPL = "This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.\n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A EXTRTICULAR PURPOSE.  See the GNU General Public License for more details.\n\nYou should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/."
    }, e = function () {
        "undefined" == typeof qx ? window.setTimeout(e, 1e3) : c() ? e.initialized || (e.initialized = !0, d(), LoUIncoming.Main.getInstance().initialize()) : window.setTimeout(e, 2e3)
      };
    window.setTimeout(e, 1e3)
  };
  /lordofultima\.com/i.test(document.domain) && c()
})();