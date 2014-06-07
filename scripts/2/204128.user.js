// ==UserScript==
// @name Tiberium Alliances URL Bug Fix
// @description Simple solution to the ancient URL bug that EA has been unable or unwilling to fix.
// @namespace URL_Bug_Fix
// @include https://prodgame*.alliances.commandandconquer.com/*/index.aspx*
// @version 1.1
// @updateURL https://userscripts.org/scripts/source/204128.meta.js
// @downloadURL https://userscripts.org/scripts/source/204128.user.js
// ==/UserScript==
(function () {
	var URL_Bug_Fix_main = function () {
		console.log('URL_Bug_Fix loaded');
		function CreateURL_Bug_Fix() {
			var bW = "#0d77bb",
			bV = "tnf:[base]xxx:yyy[/base]",
			bU = '</div>',
			bT = ' onClick="webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(parseInt(\'$1\', 10), parseInt(\'$2\', 10));">$1:$2</a>',
			bS = "tnf:link to base profile",
			bR = "[/u]",
			bQ = "[/stadt]",
			bP = "[/i]",
			bO = '<a href=#',
			bN = "tnf: [quote=playername]quoted text[/quote]",
			bv = ":<br /><br /><table cellspacing=\"10\"><tr><td>[b]",
			bu = '$1[coords]$2:$3[/coords]',
			bt = "ie",
			bs = "[base]",
			br = "tnf: [url]http://...[/url]",
			bq = "[coords]",
			bp = "webfrontend.gui.util.BBCode",
			bo = "tnf:quote",
			bn = "[quote]",
			bm = ' style="cursor: pointer; color: ',
			ce = "<u>U</u>",
			cf = "tnf: displays quoted text",
			cc = "tnf:link to player profile",
			cd = "[i]",
			ca = "[/alliance]",
			cb = "[s]",
			bX = '\uffff',
			bY = "tnf:[player]playername[/player]",
			cg = "<u>$1</u>",
			ch = "</b></td></tr><tr><td>[i]",
			bG = "tnf:player",
			bF = '"',
			bI = "tnf:bold text",
			bH = "tnf:link",
			bK = "[/allianz]",
			bJ = "[alliance]",
			bM = '$1[report]$2:$3[/report]',
			bL = "firefox",
			bE = "tnf:italic text",
			bD = ' onClick="webfrontend.gui.util.BBCode.openCityProfile(parseInt(\'$1\', 10), parseInt(\'$2\', 10));">$1:$2</a>',
			a = "[/url]",
			b = "tnf: displays quoted text with player name",
			c = ' onClick="webfrontend.gui.util.BBCode.openCityProfile($1, $2);">$1:$2</a>',
			d = "tnf:coordinate",
			f = "[/player]",
			g = "tnf:[coords]xxx:yyy:optional text[/coords]",
			h = "<b>B</b>",
			i = '<a onClick="webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(parseInt(',
			j = "[url]",
			k = '<div style="border-style:solid; border-width:1px; padding-left:3px; margin-bottom:0px; text-align:center;"><strong>$1 ',
			cl = "tnf:strike through text",
			ck = "<hr />",
			cj = "tnf:link to alliance profile",
			ci = "[/i]</td><td><i>",
			cp = "<b>$1</b>",
			co = "[player]",
			cn = "[/quote]",
			cm = "tnf:bbcode base",
			cr = "[/s]</td><td><strike>",
			cq = '<a onClick="webfrontend.gui.info.BaseInfoWindow.getInstance().openWithBaseId(',
			L = "[/b]",
			M = ':</strong></div><div style="border-style:solid; border-width:1px; padding-left:5px; padding-right:5px; margin-top:-1px;"><i>$2</i></div>',
			J = "[/s]",
			K = "<br />",
			P = "<wbr/>",
			Q = ', 10));" style="cursor: pointer; color: ',
			N = '$1[report]$2[/report]',
			O = "[u]",
			H = "<strike>$1</strike>",
			I = "</i></td></tr><tr><td>[u]",
			s = "</table>",
			r = "[/coords]",
			u = "<em>$1</em>",
			t = "tnf: [quote]quoted text[/quote]",
			o = ', 10), parseInt(',
			n = "<i>I</i>&nbsp;",
			q = '<div style="border-style:solid; border-width:1px; padding-left:5px; padding-right:5px;"><i>$1</i></div>',
			p = "tnf:link to region coordinate",
			m = "[/b]</td><td><b>",
			l = "</u></td></tr><tr><td>[s]",
			V = "tnf:[alliance]alliancename[/alliance]",
			W = "[stadt]",
			X = ' onClick="webfrontend.gui.UtilView.centerCoordinatesOnRegionViewWindow(parseInt(\'$1\', 10), parseInt(\'$2\', 10));">$3</a>',
			Y = "[b]",
			R = ' onClick="webfrontend.gui.util.BBCode.openLinkFromInnerHtml(this);">$1</a>',
			S = "tnf:said",
			T = "[/base]",
			U = '\n',
			ba = "tnf:alliance",
			bb = "tnf:the following bb-codes are supported",
			E = "</strike></td></tr><tr><td>[hr]</td><td><hr /></td></tr>",
			D = "tnf:underlined text",
			C = "[/u]</td><td><u>",
			B = "tnf: opens external link",
			A = "<strike>S</strike>",
			z = '<div style="word-wrap: break-word;">',
			w = "[allianz]",
			v = "browser.name",
			G = '<a onClick="webfrontend.gui.util.BBCode.openAllianceProfile(\'',
			F = '\', ',
			bc = '\');" style="cursor: pointer; color: ',
			bd = "KeyboardEvent",
			be = "de",
			bf = "keypress",
			bg = "",
			bh = "tnf:bb-codes",
			bi = '<a onClick="webfrontend.gui.util.BBCode.openPlayerProfile(\'',
			bj = ');" style="cursor: pointer; color: ',
			bk = '$1',
			bl = '<a ',
			bz = '">',
			by = '</a>',
			bx = "<tr><td>",
			bw = "</td><td>",
			bC = "</td></tr>",
			bB = "input",
			bA = "execute";
			qx.Class.define(bp, {
				statics : {
					clrLink : bW,
					stringIsVisible : function (cs) {
						return qx.lang.String.clean(qx.lang.String.stripTags(webfrontend.gui.util.BBCode.convertBBCode(cs))).length != 0;
					},
					insertBBCode : function (ct, cu, cv) {
						var cz = ct.getValue();
						cz = cz ? cz : bg;
						if (qx.core.Environment.get(v) === bt) {
							ct.setValue(cz + cu + cv);
							ct.focus();
						} else {
							var cx = ct.getTextSelectionStart();
							var cD = ct.getTextSelectionEnd();
							var cw = ct.getTextSelection();
							var cC = cz.substr(0, cx);
							var cA = cz.substr(cD, cz.length);
							var cE;
							if (cw != null && cw.length > 0) {
								ct.setValue(cC + cu + cw + cv + cA);
								ct.clearTextSelection();
								cz = ct.getValue();
								cE = cz.length;
							} else {
								ct.setValue(cC + cu + cv + cA);
								cE = cC.length + cu.length;
							};
							ct.setTextSelection(cE, cE);
							ct.focus();
							if (qx.core.Environment.get(v) === bL) {
								var cB = ct.getContentElement().getDomElement();
								var cy = document.createEvent(bd);
								cy.initKeyEvent(bf, true, true, null, false, false, false, false, 0, 32);
								cB.dispatchEvent(cy);
								cy = document.createEvent(bd);
								cy.initKeyEvent(bf, true, true, null, false, false, false, false, 8, 0);
								cB.dispatchEvent(cy);
							};
						};
					},
					convertBBCode : function (cF, cG, cH) {
						var cI = qx.core.Init.getApplication();
						var cJ = bg;
						cH = cH || webfrontend.gui.util.BBCode.clrLink;
						if (cH != null)
							cJ = bm + cH + bF;
						cF = qx.bom.String.escape(cF);
						if (!cG) {
							cF = cF.replace(/(\[hr\])/gi, ck);
							cF = cF.replace(/(\[wb\])/gi, P);
						};
						cF = cF.replace(/\n/g, bX);
						cF = cF.replace(/\[b\](.*?)\[\/b\]/gi, cp);
						cF = cF.replace(/\[i\](.*?)\[\/i\]/gi, u);
						cF = cF.replace(/\[u\](.*?)\[\/u\]/gi, cg);
						cF = cF.replace(/\[s\](.*?)\[\/s\]/gi, H);
						cF = cF.replace(/\[coords\]([0-9]*[0-9])\:([0-9]*[0-9])\[\/coords\]/gi, bl + cJ + bT);
						cF = cF.replace(/\[coords\]([0-9]*[0-9])\:([0-9]*[0-9])\:(.*?)\[\/coords\]/gi, bl + cJ + X);
						cF = cF.replace(/\[player\](.*?)\[\/player\]/gi, webfrontend.gui.util.BBCode.createPlayerLinkText(bk));
						cF = cF.replace(/\[base\]([0-9]*[0-9])\:([0-9]*[0-9])\[\/base\]/gi, bl + cJ + bD);
						cF = cF.replace(/\[alliance\](.*?)\[\/alliance\]/gi, webfrontend.gui.util.BBCode.createAllianceLinkText(bk));
						cF = cF.replace(/\[spieler\](.*?)\[\/spieler\]/gi, webfrontend.gui.util.BBCode.createPlayerLinkText(bk));
						cF = cF.replace(/\[stadt\]([0-9]*[0-9])\:([0-9]*[0-9])\[\/stadt\]/gi, bl + cJ + c);
						cF = cF.replace(/\[allianz\](.*?)\[\/allianz\]/gi, webfrontend.gui.util.BBCode.createAllianceLinkText(bk));
						cF = cF.replace(/\[url\](.*?)\[\/url\]/gi, bO + cJ + R);
						if (!cG) {
							while (cF != (cF = cF.replace(/\[quote\](?!.*\[quote\])(.*?)\[\/quote\]/gi, q)));
							while (cF != (cF = cF.replace(/\[quote=([A-Za-z0-9]*?)\](?![.*\[quote=[A-Za-z0-9]*?\]])(.*?)\[\/quote\]/gi, k + cI.tr(S) + M)));
						};
						cF = cF.replace(/\uffff/g, U);
						if (!cG) {
							cF = cF.replace(/(\r|\n)/gi, K);
						};
						return cF;
					},
					generateBBCode : function (cK) {
						if (!cK)
							return cK;
						cK = cK.replace(/(^|[^\]])(\b\d\d\d+)\:(\d\d\d+(?![\w\:]))(?=[^\[]|$)/gi, bu);
						cK = cK.replace(/(^|[^\]])(\b[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4})\:(\w+\b)(?=[^\[]|$)/gi, bM);
						cK = cK.replace(/(^|[^\]])(\b[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}-[A-HJ-NP-Z2-9]{4}\b)(?=[^\[]|$)/gi, N);
						return cK;
					},
					getBBCodeHBox : function (cL, cM, cN) {
						var cS = qx.core.Init.getApplication();
						var cP = new qx.ui.container.Composite(new qx.ui.layout.HBox());
						var cO = new qx.ui.container.Composite(new qx.ui.layout.Flow());
						if (cN != null)
							cO.setWidth(cN);
						cP.add(cO);
						var dc = new webfrontend.ui.SoundButton(h).set({
								minHeight : 1,
								rich : true
							});
						dc.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, Y, L);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(dc);
						var cW = new webfrontend.ui.SoundButton(n).set({
								rich : true
							});
						cW.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, cd, bP);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(cW);
						var cR = new webfrontend.ui.SoundButton(ce).set({
								rich : true
							});
						cR.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, O, bR);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(cR);
						var cT = new webfrontend.ui.SoundButton(A).set({
								rich : true
							});
						cT.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, cb, J);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(cT);
						var cU = new webfrontend.ui.SoundButton(cS.tr(bG)).set({
								rich : true
							});
						cU.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, co, f);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(cU);
						var db = new webfrontend.ui.SoundButton(cS.tr(ba)).set({
								rich : true
							});
						db.addListener(bA, function (e) {
							if (qx.locale.Manager.getInstance().getLocale() == be)
								webfrontend.gui.util.BBCode.insertBBCode(cL, w, bK);
							else
								webfrontend.gui.util.BBCode.insertBBCode(cL, bJ, ca);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(db);
						var cQ = new webfrontend.ui.SoundButton(cS.tr(cm)).set({
								rich : true
							});
						cQ.addListener(bA, function (e) {
							if (qx.locale.Manager.getInstance().getLocale() == be)
								webfrontend.gui.util.BBCode.insertBBCode(cL, W, bQ);
							else
								webfrontend.gui.util.BBCode.insertBBCode(cL, bs, T);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(new qx.ui.core.Spacer());
						cO.add(cQ);
						var da = new webfrontend.ui.SoundButton(cS.tr(d)).set({
								rich : true
							});
						da.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, bq, r);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(new qx.ui.core.Spacer());
						cO.add(da);
						var cY = new webfrontend.ui.SoundButton(cS.tr(bH)).set({
								rich : true
							});
						cY.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, j, a);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(cY);
						var cV = new webfrontend.ui.SoundButton(cS.tr(bo)).set({
								rich : true
							});
						cV.addListener(bA, function (e) {
							webfrontend.gui.util.BBCode.insertBBCode(cL, bn, cn);
							cL.fireDataEvent(bB);
						}, cM);
						cO.add(cV);
						var cX = new webfrontend.ui.SoundButton(cS.tr(bh)).set({
								width : 90,
								allowGrowY : false
							});
						cP.add(new qx.ui.core.Spacer(), {
							flex : 1
						});
						cP.add(cX);
						cX.addListener(bA, function (e) {
							var dj = cS.tr(bI);
							var dr = cS.tr(bE);
							var dd = cS.tr(D);
							var dv = cS.tr(cl);
							var dn = cS.tr(bY);
							var dp = cS.tr(cc);
							var df = cS.tr(bV);
							var dg = cS.tr(bS);
							var dh = cS.tr(g);
							var de = cS.tr(p);
							var dt = cS.tr(V);
							var di = cS.tr(cj);
							var du = cS.tr(br);
							var dq = cS.tr(B);
							var dk = cS.tr(t);
							var dl = cS.tr(cf);
							var ds = cS.tr(bN);
							var dm = cS.tr(b);
							if (!cS.bbcodeWndOpen) {
								cX.setEnabled(false);
								webfrontend.gui.MessageBox.messageBox({
									title : cS.tr(bh),
									text : cS.tr(bb) + bv + dj + m + dj + ch + dr + ci + dr + I + dd + C + dd + l + dv + cr + dv + E + bx + dn + bw + dp + bC + bx + df + bw + dg + bC + bx + dt + bw + di + bC + bx + dh + bw + de + bC + bx + du + bw + dq + bC + bx + dk + bw + dl + bC + bx + ds + bw + dm + bC + s,
									textRich : true,
									modal : false,
									buttons : 1,
									showClose : true,
									resizable : true,
									scrollable : true,
									minWidth : 460,
									minHeight : 400,
									height : 500,
									executeClose : function (e) {
										cX.setEnabled(true);
										cS.bbcodeWndOpen = false;
									}
								});
								cS.bbcodeWndOpen = true;
							};
						});
						return cP;
					},
					createPlayerLinkText : function (dw, dx) {
						if (dx > 0)
							return bi + dw + F + dx + bj + webfrontend.gui.util.BBCode.clrLink + bz + dw + by;
						else
							return bi + dw + bc + webfrontend.gui.util.BBCode.clrLink + bz + dw + by;
					},
					createAllianceLinkText : function (dy, dz) {
						if (dz > 0)
							return G + dy + F + dz + bj + webfrontend.gui.util.BBCode.clrLink + bz + dy + by;
						else
							return G + dy + bc + webfrontend.gui.util.BBCode.clrLink + bz + dy + by;
					},
					createBaseLinkText : function (dA, dB) {
						return cq + dB + bj + webfrontend.gui.util.BBCode.clrLink + bz + dA + by;
					},
					createCoordsLinkText : function (dC, x, y) {
						return i + x + o + y + Q + webfrontend.gui.util.BBCode.clrLink + bz + dC + by;
					},
					openPlayerProfile : function (dD) {
						webfrontend.gui.info.PlayerInfoWindow.getInstance().openWithPlayerName(dD);
					},
					openCityProfile : function (x, y) {
						var dE = y << 16 | x;
						webfrontend.gui.info.BaseInfoWindow.getInstance().openWithBaseCoordsId(dE);
					},
					openAllianceProfile : function (dF) {
						webfrontend.gui.info.AllianceInfoWindow.getInstance().openWithAllianceNameOrAbbreviation(dF);
					},
					openLinkFromInnerHtml : function (dG) {
						dG = dG.innerHTML;
						dG = dG.replace(/amp;/g, "");
						webfrontend.gui.Util.openLink(dG);
					},
					formatIngameText : function (dH, dI) {
						if (dI)
							return webfrontend.gui.util.BBCode.convertBBCode(webfrontend.gui.util.BBCode.generateBBCode(phe.cnc.Util.convertSpecialChars(dH)));
						else
							return z + webfrontend.gui.util.BBCode.convertBBCode(webfrontend.gui.util.BBCode.generateBBCode(phe.cnc.Util.convertSpecialChars(dH))) + bU;
					}
				}
			});
		}

		function URL_Bug_Fix_checkIfLoaded() {
			try {
				if (typeof qx !== 'undefined' && typeof qx.locale !== 'undefined' && typeof qx.locale.Manager !== 'undefined' && typeof webfrontend.gui.util.BBCode !== 'undefined') {
					qx.Class.undefine("webfrontend.gui.util.BBCode");
					CreateURL_Bug_Fix();
				} else {
					window.setTimeout(URL_Bug_Fix_checkIfLoaded, 1000);
				}
			} catch (e) {
				console.log("URL_Bug_Fix_checkIfLoaded: ", e);
			}
		}

		if (/commandandconquer\.com/i.test(document.domain)) {
			window.setTimeout(URL_Bug_Fix_checkIfLoaded, 1000);
		}
	};

	try {
		var URL_Bug_Fix = document.createElement("script");
		URL_Bug_Fix.innerHTML = "(" + URL_Bug_Fix_main.toString() + ")();";
		URL_Bug_Fix.type = "text/javascript";
		if (/commandandconquer\.com/i.test(document.domain)) {
			document.getElementsByTagName("head")[0].appendChild(URL_Bug_Fix);
		}
	} catch (e) {
		console.log("URL_Bug_Fix: init error: ", e);
	}

})();