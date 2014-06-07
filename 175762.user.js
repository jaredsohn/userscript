// ==UserScript==
// @name        reenable quickreply
// @namespace   tweakers.net/reenable quickreply
// @include     http://gathering.tweakers.net/forum/list_messages/1536353
// @include     http://gathering.tweakers.net/forum/list_messages/1536353/*
// @version     1
// @grant       none
// ==/UserScript==
if (document.getElementById("quickreply_form") === null) {
    var ses='invalid';
    var cpars = document.cookie.split("TnetID=");
    if (cpars.length == 2) ses=cpars.pop().split(";").shift();
    var topic='unknown';
    var ws = document.getElementById("whereSelect");
    for (var i in ws.options) {
       if (ws.options[i].value=='topic') topic=ws.options[i].getAttribute("data-topicid")
    }
    document.getElementsByClassName("forum_actions")[0].insertAdjacentHTML("beforebegin",'<h3 class="bar" id="reageer">Quickreply</h3><form onsubmit="return this.preview||checknewmessageform(this)" id="quickreply_form" class="form1 altmsg1" method="post" action="http://gathering.tweakers.net/forum"><fieldset><legend>Quickreply</legend><dl><dt><label id="messageBoxLabel" for="messageBox">Quickreply</label></dt><dd><textarea id="messageBox" cols="60" rows="6" name="data[content]"></textarea></dd></dl><div class="formsubmit"><input type="hidden" value="'+ses+'" name="data[reactid]"><input type="hidden" value="insert_message" name="action"><input type="hidden" value="' + topic +'" name="data[topicid]"><input type="hidden" value="0" name="data[offset]"><input type="hidden" value="send" name="data[type]"><input type="submit" accesskey="s" value="Plaats reactie" class="fancyButton"> &nbsp; <input type="submit" accesskey="p" onclick="this.form.preview=true" name="data[preview]" value="Bekijk reactie" class="textButton"></div></fieldset></form>');
}