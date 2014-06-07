// ==UserScript==
// @name		DDO Forums Linkifier
// @namespace	        http://forums.ddo.com
// @description	        DDO Forums Linkifier
// @version		0.6
// @include		http://forums.ddo.com
// @include		http://forums.ddo.com/
// @include		http://forums.ddo.com/index.php
// @include		http://forums.ddo.com/showthread.php?*
// @include		http://forums.ddo.com/forumdisplay.php?*
// @include		http://forums.ddo.com/search.php?searchid=*
// @include		http://forums.ddo.com/newthread.php?do=newthread&f=*
// ==/UserScript==

var lookup = [
	['Melees', 22, 2, [ ['Monk','Monk01'], ['Paladin','Paladin01'], ['Fighter', 'FIghter01'], ['Barbarian', 'Barbarian01'] ] ],
	['Specialists', 23, 2, [ ['Rogue','Rogue01'], ['Ranger','Ranger01'], ['Bard', 'Bard01'], ['Artificer', 'Artificer'] ] ],
	['Spell casters', 29, 2, [ ['Wizard','Wizard01'], ['Sorcerer','Sorcerer01'], ['Favored Soul', 'FavSoul01'], ['Cleric', 'Cleric01'] ] ],
	['Races', 31, 1, [ ['Warforged','Warforged01'], ['Human','Human01'], ['Half-orc','Halforc01'], ['Halfling','Halfling01'], ['Half-elf','Halfelf01'], ['Elf','Elf01'], ['Dwarf','Dwarf01'], ['Drow','Drow01'] ] ]
];

var tab = '\u00A0\u00A0\u00A0\u00A0'
var Search_URL_base = 'http://forums.ddo.com/search.php?do=process&nocache=1&prefixchoice[]='

function doXPath(q, base) {
    if(base == null) {
        base = document;
    }
	return document.evaluate(q, base, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getMainDiv(forum, name) {
	var divs = doXPath("//div[a[@href='forumdisplay.php?f="+forum+"']='"+name+"']");
	return divs.snapshotItem(0);
}

function getForumLink(forum, name, code) {
	var newA = document.createElement('a');
	newA.href = "http://forums.ddo.com/forumdisplay.php?f=" + forum;
    if(code) { newA.href = newA.href + "&prefixid=" + code; }
	newA.appendChild(document.createTextNode(name));
	return newA;
}

function getSearchLink(name, code) {
	var newA = document.createElement('a');
	newA.href = URL_base + code;
	newA.appendChild(document.createTextNode(name));
	return newA;
}

function iterateLookup(perGroup, perItem) {
    for (var i in lookup) {
        var group = lookup[i];
        var forum = group[1];
        var div = getMainDiv(forum,group[0]);
        if (perGroup != null && perGroup != undefined) { perGroup(group); }
        for (var c in group[3]) {
            var cls = group[3][c];
            if (perItem != null && perItem != undefined) { if (perItem(group, cls) == 1) { return; } }
        }
    }
}

function getInfo(name) {
    var ret;
    iterateLookup(
            null,
            function (group, cls) {
				if (cls[0] == name) {
                    ret = group.slice(0,3).concat(cls);
                    return 1;
                }
            }
        );
    return ret;
}

function insertMainLink(oldDiv, indent, forum, name, code) {
	var newDiv = document.createElement('div');
	newDiv.className = "smallfont alt2"
	newDiv.setAttribute("style","border: none; padding-bottom: 2px;");
	newDiv.setAttribute("onmouseover","this.className='smallfont alt1'");
	newDiv.setAttribute("onmouseout","this.className='smallfont alt2'");
	for(var x=0; x < indent; x++)
		newDiv.appendChild(document.createTextNode(tab));
	var newA = getForumLink(forum, name, code);
	newDiv.appendChild(newA);
	oldDiv.parentNode.insertBefore(newDiv, oldDiv.nextSibling);
}
function insertNavLink(oldSpan, forum, name, code) {
	var newSpan = document.createElement('span');
	newSpan.className = "navbar";
	newSpan.appendChild(document.createTextNode(" > "));
	var newA = getForumLink(forum, name, code);
	newSpan.appendChild(newA);
	oldSpan.parentNode.insertBefore(newSpan, oldSpan.nextSibling);
    return newSpan;
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var reg = document.URL.match(/http:\/\/forums.ddo.com(\/(\w+)\.php(\?(.*))?)?/);

var page = reg[2];
var query = reg[4];

if (reg[1] == null || reg[1] == undefined) {
    page = "index";
}

if (page == "showthread") {
    try {
        var metaTitle = trim(doXPath("//head/meta[@name='keywords']").snapshotItem(0).getAttribute("content").split(", ddo,dungeons,dragons")[0]);

        var title = trim(doXPath("//td[@class='navbar']/strong").snapshotItem(0).firstChild.nodeValue);
    } catch(err) {}

    var prefix;
    if (metaTitle != null && title != null && trim(title.substr(title.length - metaTitle.length, metaTitle.length)) == metaTitle) {
        prefix = trim(title.substr(0, title.length - metaTitle.length));
    }
    var forumSpan = doXPath("//td[@width='100%']/span[@class='navbar' and position() = last()][a]").snapshotItem(0);

    iterateLookup(
            null,
            function (group, cls) {
                if (prefix != null && forumSpan != null) {
                    forumName = trim(forumSpan.firstChild.nextSibling.firstChild.nodeValue);
                    if (forumName == group[0]) {
                        if (prefix == cls[0]) {
                            insertNavLink(forumSpan, group[1], cls[0], cls[1]);
                        }
                    }
                }
            }
        );
}

if (page == "index") {

    var forum, div;
    iterateLookup(
            function (group) {
                forum = group[1];
                div = getMainDiv(forum,group[0]);
            },
            function (group, cls) {
                if (div != null) {
                    insertMainLink(div, group[2], forum, cls[0], cls[1]);
                }
            }
        );
}

var found = 0;
if (page == "forumdisplay" || page == "newthread") {

    reg = query.match(/(?:&|^)f=(\d+)(?:&|$)/);
    try { var qforum = reg[1]; } catch(err) {}

    reg = query.match(/(?:&|^)prefixid=(\w+)(?:&|$)/);
    try { var prefix = reg[1]; } catch(err) {}
    if (prefix) {
        var forumSpan = doXPath("//td[@width='100%']/span[@class='navbar' and position() = last()][a]").snapshotItem(0);
        var titleElem = doXPath("//td[@colspan=3 and @class='navbar']/strong/text()").snapshotItem(0);
        iterateLookup(
                null,
                function (group, cls) {
                    if (forumSpan != null) {
                        if (prefix == cls[1] && qforum == group[1]) {
                            if(page == "forumdisplay") {
                                insertNavLink(forumSpan, qforum, group[0], null);
                                titleElem.nodeValue = cls[0];
                            } else {
                                insertNavLink(forumSpan, qforum, cls[0], cls[1]);
                            }
                            found = 1;
                            return 1;
                        }
                    }
                }
            );
        if (found) {
            if (page == "newthread") {
                try { var selectPrefix = document.getElementsByName("prefixid")[0]; } catch(err) {}
                if (selectPrefix) {
                    selectPrefix.value = prefix;
                }
            }

            if (page == "forumdisplay") {
                var newThreadElems = doXPath("//a[@href='newthread.php?do=newthread&f=" + qforum + "']");

                for (var i = 0; i < newThreadElems.snapshotLength; i++) {
                    var cur = newThreadElems.snapshotItem(i);
                    cur.href = cur.href + "&prefixid=" + prefix;
                }
            }
        }
    }
}


if (page == "search" || (page == "forumdisplay" && prefix && prefix != "")) {

    var threadElems = doXPath("//table[@id='threadslist']/tbody/tr[td/img]");

    for (var i = 0; i < threadElems.snapshotLength; i++) {
        var row = threadElems.snapshotItem(i);
        //alert(row.innerHTML);
        try {
            var titleLink = doXPath("td/div/a[last()]", row).snapshotItem(0);

            var row_prefix = trim(titleLink.previousSibling.nodeValue);
            var forumLink = doXPath("td[last()]/a", row).snapshotItem(0);
        } catch(err) {}
        if (row_prefix != "" && (forumLink || (prefix && found))) {
            var info = getInfo(row_prefix);
            if (info != null && info != undefined) {
                var code = info[4];
                var forum = info[1];
                if (forumLink) {
                    forumLink.parentNode.appendChild(document.createTextNode(" > "));
                    var newA = getForumLink(forum, row_prefix, code);
                    forumLink.parentNode.appendChild(newA);
                }
                var prefixNode = titleLink.previousSibling;
                prefixNode.nodeValue = " ";
            }
        }
    }

}
