// ==UserScript==
// @name           fortunate-one
// @namespace      http://userscripts.org/users/133663
// @description    Add silly /b/ fortunes to posts with #fortune in the email field.
// @include        http://boards.4chan.org/jp/*
// ==/UserScript==
// Shamelessly copied from http://userscripts.org/scripts/show/37172

var fortune = new Array();
fortune[0] = '<font color=#f51c6a><b>Your fortune: Reply hazy, try again</b></font><br /><br />';
fortune[1] = '<font color=#43fd3b><b>Your fortune: Good news will come to you by mail</b></font><br /><br />';
fortune[2] = '<font color=#d302a7><b>Your fortune: Godly Luck</b></font><br /><br />';
fortune[3] = '<font color=#6023f8><b>Your fortune: Outlook good</b></font><br /><br />';
fortune[4] = '<font color=#16f174><b>Your fortune: ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!!</b></font><br /><br />';
fortune[5] = '<font color=#fd4d32><b>Your fortune: Excellent Luck</b></font><br /><br />';
fortune[6] = '<font color=#0893e1><b>Your fortune: You will meet a dark handsome stranger</b></font><br /><br />';
fortune[7] = '<font color=#9d05da><b>Your fortune: Very Bad Luck</b></font><br /><br />';
fortune[8] = '<font color=#bac200><b>Your fortune: Average Luck</b></font><br /><br />';
fortune[9] = '<font color=#2a56fb><b>Your fortune: Better not tell you now</b></font><br /><br />';
fortune[10] = '<font color=#7fec11><b>Your fortune: Bad Luck</b></font><br /><br />';

var tables = document.getElementsByTagName('table');
var len = tables.length;
for(var i=0;i<len;i++){
	if(/<a href="mailto:#fortune" class="linkmail">/.test(tables[i].innerHTML)){
		var blocks = tables[i].getElementsByTagName('blockquote');
		blocks[0].innerHTML = fortune[(blocks[0].parentNode.id%11)]+ blocks[0].innerHTML;
	}
}