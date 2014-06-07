// ==UserScript==
// @name        0day.kiev.ua filter
// @version     1.3
// @date        12.03.2011
// @author      ki0 <ki0@ua.fm>
// @download	http://userscripts.org/scripts/source/97678.user.js
// @include     http://0day.kiev.ua/*
// @include     http://www.0day.kiev.ua/*
// ==/UserScript==

const_name = "topicid";
topic_name = "topic_id=";
news_name = "news_id=";
pagenum = "pagenum=";

function updateCheckboxes(id) {
    var checked = (getFilter(id) != 0);
    var checks = document.getElementsByName(const_name + id);
    for (var i = 0; i < checks.length; i++)
        checks[i].checked = checked;
}

function getFilter(id) {
    if (typeof (localStorage) == 'undefined') {
        alert('Your browser does not support HTML5 localStorage. Try upgrading.');
    }
    var filterVal = localStorage.getItem(id);
    if (filterVal == null)
        filterVal = 1;
    return filterVal;
}

function modifyFilter(e) {
    var id = e.target.name.substr(const_name.length);
    localStorage.setItem(id, 1 - getFilter(id));
    filter();
    updateCheckboxes(id);
}

function filter() {
    if (document.location.href.indexOf(news_name) != -1)
        return;

    if (document.location.href.indexOf(topic_name) != -1)
        return

    var releases = document.getElementsByClassName("ipdl_title");
    for (var i = 0; i < releases.length; i++) {
        var pos1 = releases[i].innerHTML.indexOf("topic_id=");
        if (pos1 != -1) {
            var pos2 = releases[i].innerHTML.indexOf("\"", pos1);
            pos1 += topic_name.length;
            id = releases[i].innerHTML.substr(pos1, pos2 - pos1);
            if (getFilter(id) == 0) {
                releases[i].parentNode.parentNode.children[1].style.display = "none";
                var link = releases[i].parentNode.parentNode.children[0].getElementsByTagName("a")[0];
                link.addEventListener('click', function (e) {
                    if (e.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display != "") {
                        e.target.parentNode.parentNode.parentNode.parentNode.children[1].style.display = "";
                        e.preventDefault();
                    }
                }, true);
            }
            else {
                releases[i].parentNode.parentNode.children[1].style.display = "";
            }
        }
    }
}

function addCheckboxes() {
    var sections = document.getElementsByTagName("a");
    for (var i = 0; i < sections.length; i++) {
        var pos1 = sections[i].href.indexOf(topic_name);
        if ((pos1 != -1) && (sections[i].href.indexOf(pagenum) == -1)) {
            var pos2 = sections[i].href.indexOf("&", pos1);
            pos1 += topic_name.length;
            var id = 0;
            if (pos2 != -1)
                id = sections[i].href.substr(pos1, pos2 - pos1);
            else
                id = sections[i].href.substr(pos1);

            var check = document.createElement("input");
            check.setAttribute("type", "checkbox");
            check.addEventListener("click", modifyFilter, true);
            check.setAttribute("name", const_name + id);
            if (getFilter(id) == 0)
                check.checked = false;
            else
                check.checked = true;
            sections[i].parentNode.insertBefore(check, sections[i]);
        }
    }

    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        if (tables[i].width == 150) {
            tables[i].width = 160;
        }
    }
}

function load(e) {
    addCheckboxes();

    filter();
}

window.addEventListener('load', load, false);
