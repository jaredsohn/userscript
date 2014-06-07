// ==UserScript==
// @name           Vrai notes:Mod
// @namespace      http://www.epitech.eu/intra/
// @include        http://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @include        https://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @include        http://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @include        https://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @include        http://www.epitech.eu/intra/index.php?section=all&page=notes&id=*
// @include        https://www.epitech.eu/intra/index.php?section=all&page=notes&id=*
// @match          http://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @match          https://www.epitech.eu/intra/index.php?section=etudiant&page=rapport&login=*
// @match          http://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @match          https://www.epitech.eu/intra/index.php?section=etudiant&page=notes&action=index_act*
// @match          http://www.epitech.eu/intra/index.php?section=all&page=notes&id=*
// @match          https://www.epitech.eu/intra/index.php?section=all&page=notes&id=*
// @author         Julien Di Marco - Lifely - (di-mar_j)
// @license        MIT
// @version        1.0.1
// @change-1.0.0   Debug, ajout date, cleaning..
// @change-1.0.1   Temporary version, reduce heavy load.
// @description    Mod of Vrai-Bareme From Salomon Brys (brys_s)
// ==/UserScript==

scriptVersion = "1.0.0";

// Trim
String.prototype.trim = function()
{
    return this.replace(/^\s+|\s+$/g, "");
}


// transforme un comment en HTML
function comment2HTML(str, complete)
{
    txt = "";
    comments = str.split("--####--");
    parts = comments[0].trim().split("-//-");

    if (!complete)
    {
	for (i = 0; i < parts.length; ++i)
	{
            part = parts[i].trim();
            title = /\[.+\]\:/.exec(part)[0];
            title = title.substr(1, title.length - 3);
            partCom = part.substr(title.length + 3);
            txt += "<p><b>" + title + "</b> :" + partCom + "</p>";
	}
    }

    txt += "<hr style='border: 0; background-color: Black; margin: 8px;' />";
    general = comments[1].trim();
    txt += "<p><b>General</b> : " + general.substr(9) + "</p>";
    txt += "<hr style='border: 0; background-color: Black; margin: 8px;' />";

    comment = comments[comments.length - 1];
    if (!complete)
    {
	for (i = 2; i < comments.length; ++i)
	{
            comment = comments[i].trim();
            login = /[^ ]+\:/i.exec(comment)[0];
            login = login.substr(0, login.length - 1);
            text = comment.substr(login.length + 1).trim().replace(/\/ (.+) \: ([-0-9]+) /giU, "").replace(/\/ ([0-9]{4})([0-9]{2})([0-9]{2}):([0-9]{2})([0-9]{2})([0-9]{2}) \/ ([a-z_]+)/gi, "");
	    txt += "<p><img src='photo.php?login=" + login + "' style='width:60px; float: left; padding: 1px 2px 0 0;' /><b>" + login + "</b> : " + text + "<br style='clear: both'></p>";
	}
    }
    // FinalNotes regex --> /\/ (.+) \: ([-0-9]+) /giU

    // SPECIFIQUE
    if (comment != "" && (info = comment.split(/\/ ([0-9]{4})([0-9]{2})([0-9]{2}):([0-9]{2})([0-9]{2})([0-9]{2}) \/ ([a-z_]+)/gi)))
    {
        //txt = txt.substr(0, txt.indexOf(end[0])) + txt.substr(txt.indexOf(end[0]) + end[0].length);
        //txt = txt.replace(/\\'/g, "'").replace(/\\"/g, '"');
        txt += "<p style='text-align: right; font-style: italic;'>Not&eacute; " +
	    "le " + info[3] + "." + info[2] + "." + info[1] + " a " + info[4] + ":" + info[5] + ":" + info[6]  +
	    " par : <b> <a href=\"/intra/index.php?section=etudiant&page=rapport&login=" + info[7] + "\" style=\"color:#333;\">" + info[7] + "</a></b></p>";
    }
    return txt;
}

tds = document.getElementsByTagName("td");
test = /section=all&page=notes&id=[0-9]+/gi.test(window.location);
for (i = 0; i < tds.length; ++i)
{
    td = tds[i];
    if (td.innerHTML.indexOf("--####--") != -1 && td.childNodes.length == 1)
        td.innerHTML = comment2HTML(td.innerHTML, test);
}
