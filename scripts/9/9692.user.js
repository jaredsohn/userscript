// ==UserScript==
// @name           Google Air Skin Comic Sans
// @namespace      http://userscripts.org
// @description    A skin for Google
// @homepage       http://hebbet.blogspot.com
// @include        http://www.google.com/calendar/*
// @include        https://www.google.com/calendar/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.com/reader/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// @include        http*://*.google.*/*
// @include        http*://groups.google.*/*
// @include        http*://spreadsheets.google.com/*
// @include        http*://docs.google.com/*
// @exclude        http*://docs.google.com/View?*
// @exclude        http*://spreadsheets.google.com/ar*
// @exclude        http*://spreadsheets.google.com/fm*
// @exclude        http*://docs.google.com/Misc*
// @exclude        http*://spreadsheets.google.com/pub*

// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); * { font-family: comic sans ms !important; } /* buttons */ button { font-size: 13px !important } /* search bar, actions menus */ form#s input, div.tbc select, div.tbc button, div.cd button, div.chc button, div.chc select, td#st_compose button { margin-bottom: 0px !important; } /* Refresh link */ span#rfr { font-size: 13px !important; } /* selection menus */ div.tbc { font-size: 13px !important; } /* contacts sidebar */ div#nav div.nl span#comp { font-size: 13px !important; } /* compose message sidebar: list item (current) */ div#nav table.cv tr.an td b.lk { font-size: 15px !important; font-weight: normal !important; text-decoration: none !important; display: block !important; padding: 4px 0 4px 0 !important; } /* folders sidebar: list item (current) */ div#nds table.cv tr.an td b.lk { font-size: 15px !important; font-weight: normal !important; text-decoration: none !important; display: block !important; padding: 6px 0 6px 0 !important; } /* folders sidebar: list item */ div#nds div.nl { font-size: 13px !important; margin-left: 10px !important; padding-left: 6px !important; padding-top: 3px !important; padding-bottom: 3px !important; } /* folders sidebar: list item (hover) */ div#nds div.nl:hover { background-color: #e3ebfe !important; } /* invite a friend sidebar */ div#nvi { display: none !important; } /* labels appearing in the subject line */ table.tlc span.ct {color: red !important; font-size: 8pt !important; font-weight: bold !important} /* messages */ table.tlc tr td { font-size: 13px !important; padding-top: 3px !important; padding-bottom: 3px !important; } /* cursor */ #ar { margin-top: 2px !important; } /* messages (unread) */ table.tlc tr.ur td { font-size: 13px !important; } /* messages (unread - snippet) */ table.tlc tr.ur td span.p { font-size: 13px !important} /* block (all width active) */ div#nav table.cv tr.an td b[id], div#nds span.lk { display: block !important; } /* remove underline */ div#nds span.lk, div#nds b.lk { text-decoration: none !important; } /*round corners*/ div#nds div.nl { -moz-border-radius-topleft: 4px !important; -moz-border-radius-bottomleft: 4px !important; } /* selected round corners */ div#nav table.cv b.rnd { background-color: transparent !important; } div#nav table.cv { -moz-border-radius-topleft: 5px !important; -moz-border-radius-bottomleft: 5px !important; } div#nav table.cv td:first-child { -moz-border-radius-topleft: 5px !important; -moz-border-radius-bottomleft: 5px !important; } /* border lines */ div#nds div.nl:first-child { border-top: 1px solid #C3D9FF !important; } div#nds div.nl { border-bottom: 1px solid #C3D9FF !important; } div#nds div.nl { border-left: 1px solid #C3D9FF !important; } /*selected border lines*/ div#nds table.cv:first-child { border-top: 1px solid #C3D9FF !important; } div#nds table.cv { border-bottom: 1px solid #C3D9FF !important; } div#nds table.cv { border-left: 1px solid #C3D9FF !important; } /* bk */ div#nds div.nl { background-color: #FFFFFF !important; } /* selected: remove not(tr.an) and resize tr.an to compensate*/ div#nds table.cv tr.an { height: 15px !important; } div#nds table.cv tr:not([class='an']) td { display: none !important; } /* compose and contacts */ div#nav > div.nl { border-top: 1px solid #C3D9FF !important; border-bottom: 1px solid #C3D9FF !important; border-left: 1px solid #C3D9FF !important; -moz-border-radius-topleft: 5px !important; -moz-border-radius-bottomleft: 5px !important; background: white !important; padding-top: 3px !important; padding-bottom: 3px !important; } div#nav > div.nl:hover { background: #e3ebfe !important; } /* selected border lines */ div#nav > table.cv { border-top: 1px solid #C3D9FF !important; border-bottom: 1px solid #C3D9FF !important; border-left: 1px solid #C3D9FF !important; } div#nav > div.nl span#cont, div#nav > div.nl span#comp { display: block !important; text-decoration: none !important; } div#nav > table.cv tr.an b.lk { text-decoration: none !important; }  /* remove left round so that the tab 'compose mail' will connect to div#co' */ div#co > div#tct > table > tbody > tr > td > b.rnd > b.rnd1, div#co > div#tct > table > tbody > tr > td > b.rnd > b.rnd2, div#co > table > tbody > tr > td > b.rnd > b.rnd1, div#co > table > tbody > tr > td > b.rnd > b.rnd2 { margin-left: 0px !important; } .lk { font-weight: normal !important; } /* labels box labels sidebar: header */ div#nvl td.s { padding: 6px 0px 6px 0px !important; font-size: 15px !important; } div#nb_0 { margin-top: 10px !important; margin-bottom: 1.5em !important; } /* label box color div#nb_0 div.nb, div#prf_l, div#nvl b.rnd b.rnd1, div#nvl b.rnd b.rnd2 { background-color: rgb(0, 217, 255) !important; } */ /* item color */ div#nb_0 table.nc div.lk[id^=\"sc\"] { background-color: #FFFFFF !important; border-top:1px solid transparent; border-bottom: thin solid #EFEFEF !important; text-decoration: none !important; padding: 2px 1px 3px 3px !important; } /* item over color */ div#nb_0 table.nc div.lk[id^=\"sc\"]:hover { background-color: rgb(226,250,234) !important; } /* remove edit label link */ div#prf_l { display: none !important; } /* remove table extra border */ div#nb_0 table.nc { border-spacing: 0px !important; padding-right: 4px !important; } div#nb_0 table.nc tr, div#nb_0 table.nc td { padding: 0 !important; } /* spam not bold */ #ds_spam b { font-weight: lighter !important; }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}