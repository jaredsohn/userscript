// ==UserScript==

// @name           Delete Multiple Subscriptions

// @namespace      http://afunamatata.com/greasemonkey/

// @description    Reload the page only after deleting all subscriptions, not after each deletion

// @include        http://www.livejournal.com/manage/settings/?cat=notifications*

// @include http://www.dreamwidth.org/manage/settings/?cat=notifications*

// @tags           livejournal, dreamwidth

// ==/UserScript==



function markForDeletion(event)

{

    str = this.href.substr(deletebutton.getAttribute("original_url_length"));

    if(this.getAttribute("toDelete")=="true")

    {

        // delete

        myvar.splice(myvar.indexOf(str),1);

        this.style.border = 'none';

    }

    else

    {

        // don't delete

        myvar.push(str);

        this.style.border='1px solid red';

        

    }

    this.setAttribute("toDelete", this.getAttribute("toDelete") == "true" ? "false" : "true");

    var href = "http://"+document.location.hostname+document.location.pathname+"?cat=notifications&"+myvar.join("&");

    deletebutton.setAttribute("delete_vars", href);

    deletebutton.setAttribute("title", href);

    event.preventDefault();

    event.stopPropagation();

}



myvar = new Array();

xpath = document.evaluate("//img[contains(@src,'img/portal/btn_del.gif')]/parent::*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(i = 0; i < xpath.snapshotLength; ++i) { 

    a = xpath.snapshotItem(i);

    a.setAttribute("toDelete", "false");

    a.addEventListener('click', markForDeletion,false);

}



var container = document.getElementById("settings_save");



deletebutton = document.createElement("button");

deletebutton.addEventListener( "click", function(event) { 
    event.preventDefault();
    event.stopPropagation();
    document.location = this.getAttribute("delete_vars");

}, false);

deletebutton.innerHTML= "Delete";

deletebutton.setAttribute("delete_vars", "http://"+document.location.hostname+document.location.pathname+"/?cat=notifications");
deletebutton.setAttribute("original_url_length", ("http://"+document.location.hostname+document.location.pathname+"/?cat=notifications").length);

deletebutton.setAttribute("class", "deletebutton");

container.appendChild(deletebutton);



GM_addStyle("a.deletebutton { text-decoration:none; text-align: center; padding: 1px 5px; \n\
background-color: #eee; border: 2px solid gray; border-top-color: white; border-left-color: white; color: black;}");
