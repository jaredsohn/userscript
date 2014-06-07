// ==UserScript==
// @name           إعداد و تعريب : كابي فرح سكريبت أرشيف المنتدى
// @version	   0.1
// @author	   GaBI FaRaH           MaSTeR-OF-PuPPeTS
// @namespace      KSTM.Javascript.DS
// @description    سكريبت يسمح لك بنقل سريع للمواضيع و ارشفتها داخل منتدى القبيلة الداخلي
// @include	   http://*.tribalwars.ae/game.php?*&screen=forum
// @include	   http://*.tribalwars.ae/game.php?*&screen=forum&screenmode=view_forum&forum_id=*
// ==/UserScript==


var head = document.getElementsByTagName("head")[0];
var gamedata = JSON.parse(head.innerHTML.match(/var game_data = (\{.+\})\;/)[1]);
var villageID = gamedata.village.id;
var csrf = gamedata.csrf;
var selectName = "target_forum_id";
var threadId = "thread_ids";

// Wenn der Button gefunden wird, hat der User die benötigten Rechte
var button;
var inputs = document.getElementsByTagName("input")

for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].name == "move") {
        button = inputs[i];
        break;
    }
}


function getThreads() {
    var x = document.getElementsByTagName("input");
    var threads = new Array();
    var it = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i].name.indexOf(threadId) == 0) {
            threads[it] = x[i];
            it++;
        }
    }

    return threads;
}

function getSelectedThreads() {
    var x = getThreads();
    var threads = new Array();
    var it = 0;
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            threads[it] = x[i];
            it++;
        }
    }

    return threads;
}

function getTopicsName() {
    var topics = document.getElementsByClassName("forum");
    var topicsName = new Array(topics.length);

    for (var i = 0; i < topics.length; i++) {
        topicsName[i] = topics[i].getElementsByTagName("a")[0].innerHTML;
    }

    return topicsName;
}

function getTopicsID() {
    var topics = document.getElementsByClassName("forum");
    var topicsID = new Array(topics.length);

    for (var i = 0; i < topics.length; i++) {
        var link = topics[i].getElementsByTagName("a")[0].href;
        topicsID[i] = link.substr(link.lastIndexOf("=") + 1, link.length);
    }

    return topicsID;
}

function getSelectedTopicName() {
    return document.getElementsByClassName("forum selected")[0].getElementsByTagName("a")[0].innerHTML;
}

function getSelectedTopicID() {
    var link = document.getElementsByClassName("forum selected")[0].getElementsByTagName("a")[0].href;
    return link.substr(link.lastIndexOf("=") + 1, link.length);
}

function checkboxCheckedChanged() {
    var div = document.getElementById("threads_hidden");
    var selectedThreads = getSelectedThreads();

    div.innerHTML = "";
    for (var i = 0; i < selectedThreads.length; i++) {
        div.innerHTML += "<input type = 'hidden' name = '" + selectedThreads[i].name + "'>";
    }
}

function saveDefaultArchiv() {
    GM_setValue(getSelectedTopicID(), this[this.selectedIndex].innerHTML);
    initializeSelect();
}

function addMenuItems() {
    var topics = getTopicsName();
    var IDs = getTopicsID();
    var inputs = document.getElementsByTagName("input")


        var options = "";
        for (var i = 0; i < topics.length; i++) {
            if(topics[i] != getSelectedTopicName()) {
                options += "<option value='" + IDs[i] + "'>" + topics[i] + "</option>";
            }
        }

    var newForm = document.createElement("form");
    var action = "/game.php?village=" + villageID + "&screen=forum&screenmode=view_forum&forum_id=" + getSelectedTopicID() + "&action=mod&h=" + csrf + "&move_confirm=1&h=" + csrf;
    newForm.setAttribute('method', 'post');
    newForm.setAttribute('action', action);
    newForm.setAttribute('name', 'archive_form');
    newForm.innerHTML = "<div id='threads_hidden'></div> <select name = '" + selectName + "'>" + options + "</select><input type = 'submit' value = ' قم بالنقل إلى' /></form>";
    button.parentNode.insertBefore(newForm, button.nextSibling);   
}

function setFunctionality() {
    var selection = document.getElementsByName(selectName)[0];
    selection.addEventListener('change', saveDefaultArchiv, false);

    var threads = getThreads();

    for (var i = 0; i < threads.length; i++) {
        threads[i].addEventListener('click', checkboxCheckedChanged, false);
    }
}

function initializeSelect() {
    var selection = document.getElementsByName(selectName)[0];
    var option = GM_getValue(getSelectedTopicID());

    for (var i = 0; i < selection.options.length; i++) {
        if (selection.options[i].text == option) {
            selection.options[i].defaultSelected = true;
            selection.options[i].selected = true;
            break;
        }
    }
}

if(button) {
    //Überprüfen, ob ein Forum gelöscht wurde
    //Falls ja -> Das entsprechende Standardarchiv zu dem gelöschten Forum aus dem GM-Speicher entfernen
    var oldTopics = eval(GM_getValue('allTopics', []));
    var actualTopics = getTopicsID();
    if (oldTopics.length) {
        for (var i = 0; i < oldTopics.length; i++) {
            if (actualTopics.indexOf(oldTopics[i]) == -1) {
                GM_deleteValue(oldTopics[i]);
            }
        }
    }
    
    //Alle aktuellen Foren sichern
    GM_setValue('allTopics', uneval(getTopicsID()));

    addMenuItems();
    setFunctionality();
    initializeSelect();
}
