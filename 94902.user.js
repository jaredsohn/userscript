// ==UserScript==
// @id             highlight-important-people
// @name           What.CD: Highlight Important People
// @namespace      hateradio)))
// @author         hateradio
// @version        1.85
// @description    Highlight posts by VIPs, Mods, Alpha and Delta Teamates, Devs, Admins, and SysOps.
// @homepage       http://userscripts.org/scripts/show/94902
// @updateURL      http://userscripts.org/scripts/source/94902.meta.js
// @include        http*://*what.cd/forums.php*
// @license        Creative Commons
// @updated        May 21 2012
// @since          Jan 17 2011
// @grant          none
// ==/UserScript==

var highlight = {
	xpt : document.evaluate("//tr[contains(@class, 'colhead_dark')]//strong//text()[contains(.,'(')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null),
	snd : function(){ return document.querySelectorAll('table:not(.important_user) .secondary_class') },
	tab : document.querySelectorAll('table.forum_post'),
	reg : /\b(?:VIP|Legend|Moderator|Support|Team|Developer|Administrator|SysOp)\b/,
	txt : 'table.important_user {box-shadow: 0 0 3px 1px magenta !important;}',
	sty : document.createElement('style'),
	nit : function(){
		this.css();
		this.col();
		this.col2();
	},
	css : function(){
		this.sty.type = 'text/css';
		this.sty.textContent = this.txt;
		document.getElementsByTagName('head')[0].appendChild(this.sty);
	},
	col : function(){
		var i = this.xpt.snapshotLength, t;
		while(i--){
			t = this.xpt.snapshotItem(i);
			if(this.reg.test(t.textContent)){
				this.tab[i].className += ' important_user';
			}
		}
	},
	col2 : function(){
		var p = this.snd(), i = p.length;
		while(i--){
			p[i].parentNode.parentNode.parentNode.parentNode.parentNode.className += ' important_user';
		}
	}
};

highlight.nit();