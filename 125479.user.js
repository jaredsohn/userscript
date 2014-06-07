// ==UserScript==
// @name           Learn preposition usage
// @namespace      http://buildup-english.net/
// @include        *
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/ on /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;on &nbsp;</font><font color=\"red\">]</font>')
.replace(/ at /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;at &nbsp;</font><font color=\"red\">]</font>')
.replace(/ in /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;in &nbsp;</font><font color=\"red\">]</font>')
.replace(/ up /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;up &nbsp;</font><font color=\"red\">]</font>')
.replace(/ of /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;of &nbsp;</font><font color=\"red\">]</font>')
.replace(/ by /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;by &nbsp;</font><font color=\"red\">]</font>')
.replace(/ to /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;to &nbsp;</font><font color=\"red\">]</font>')
.replace(/ for /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> for &nbsp;</font><font color=\"red\">]</font>')
.replace(/ as /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> &nbsp;as &nbsp;</font><font color=\"red\">]</font>')
.replace(/ from /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> from </font><font color=\"red\">]</font>')
.replace(/ into /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> into </font><font color=\"red\">]</font>')
.replace(/ off /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> off &nbsp;</font><font color=\"red\">]</font>')
.replace(/ over /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> over </font><font color=\"red\">]</font>')
.replace(/ upon /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> upon </font><font color=\"red\">]</font>')
.replace(/ with /g, '<font color=\"red\">[</font><font color=\"white\" style=\"background-color:white\" face=\"Courier New\"> with </font><font color=\"red\">]</font>');