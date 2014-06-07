// Ikariam Chat V.1.01
// version 1.01
// Copyright (c) 2009, www.ikariam.forumm.biz
//
// ==UserScript==
// @name          Ikariam Chat V.1.01
// @namespace     http://ikariam.org/
// @description   İkariam Sohbet :) ( www.ikariam.forumm.biz)
// @include       http://s*.ikariam.*/*
// @version       1.01
// ==/UserScript==

// Get the server info for multi-server 
var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

// Get the chat URL from the saved info, otherwise use the default ikariam info
var chaturl = GM_getValue(domain + "." + server + ".chaturl", 0);
if (chaturl == '') {
  chaturl = "http://ikariam.forumm.biz/chatbox/chatbox.forum";
}

// Get the nickname if possible, otherwise the saved nickname
var nickname;
if (document.getElementById('options_userData')) {
  if (document.getElementById('options_userData').getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('input')[0]) {
    var nickElement = document.getElementById('options_userData').getElementsByTagName('table')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('input')[0];
    if (nickElement != null) {
      nickname = nickElement.value;
      GM_setValue(domain + "." + server + ".nick",nickname);
    }
    else {
      nickname = GM_getValue(domain + "." + server + ".nick", 0);
    }
  }
  else {
    nickname = GM_getValue(domain + "." + server + ".nick", 0);
  }
}
else {
  nickname = GM_getValue(domain + "." + server + ".nick", 0);
}
if (nickname) {
  nickname = nickname.replace(/\s+/gi, '');
}
else {
  nickname = '';
}

// Generate the link
var link = chaturl;
if (nickname != '') {
  link =  chaturl + '&nick=' + nickname + '&alt=' + nickname + '_';
}

// Add another link to the navigation bar (chat link)
var navigationLinks = document.getElementById('GF_toolbar').getElementsByTagName('ul')[0].getElementsByTagName('li')[5];
if (navigationLinks) {
  var spanelement = document.createElement("span");
  spanelement.class = 'textLabel';
  spanelement.appendChild(document.createTextNode("Sohbet"));

  var aelement = document.createElement("a");
	    aelement.href = link;
	    aelement.title = '';
	    aelement.target = '_blank';
	    aelement.appendChild(spanelement);
  
  var chatlink = document.createElement("li");
  chatlink.class = 'chat';
  chatlink.appendChild(aelement);

  navigationLinks.parentNode.insertBefore(chatlink, navigationLinks.nextSibling);
}

// Add the chat link to the alliance page
var textTableRow, textTablecolumn1, textTablecolumn2, aelement;
var memberElement;
if (document.getElementById('allyinfo') != null) {
    memberElement = document.getElementById('allyinfo').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5];
    textTableRow = document.createElement('tr');

    textTablecolumn1 = document.createElement('td');
    textTablecolumn1.appendChild(document.createTextNode("Sohbet İçin :"));
    textTableRow.appendChild(textTablecolumn1);
    
    aelement = document.createElement("a");
    aelement.href = link;
    aelement.title = 'Chat!';
    aelement.target = '_blank';
    aelement.appendChild(document.createTextNode("Tıklayın"));
    
    textTablecolumn2 = document.createElement('td');
    textTablecolumn2.appendChild(aelement);
    textTableRow.appendChild(textTablecolumn2);
}
else {
  if (document.getElementById('embassy') != null) {
    memberElement = document.getElementById('mainview').getElementsByTagName('div')[1].getElementsByTagName('div')[0].getElementsByTagName('table')[0].getElementsByTagName('tr')[0];

    textTableRow = document.createElement('tr');

    textTablecolumn1 = document.createElement('td');
    textTablecolumn1.class = 'desc';
    textTablecolumn1.title = 'Chat';
    textTablecolumn1.appendChild(document.createTextNode("Chat:"));
    textTableRow.appendChild(textTablecolumn1);
    
    aelement = document.createElement("a");
    aelement.href = link;
    aelement.title = 'Chat';
    aelement.target = '_blank';
    aelement.appendChild(document.createTextNode("Chat"));
    
    textTablecolumn2 = document.createElement('td');
    textTablecolumn2.appendChild(aelement);
    textTablecolumn2.title = 'Chat!';
    textTableRow.appendChild(textTablecolumn2);
  }
}
if (memberElement) {
    memberElement.parentNode.insertBefore(textTableRow, memberElement.nextSibbling);
}

// Add the chat url part to the options.
var page = document.getElementsByTagName('body')[0].id;
if (page == 'options') {
var HTMLtext = '<div class="contentBox01h">' +
                    '<h3 class="header">Sohbet Link Ayarları</h3>' +
                    '<p>Sohbet Adresini Buraya Ekleyebilirsiniz..</p>' +
                    '<div class="content">' +
                        '<table cellpadding="0" cellspacing="0"><tbody>' +
                            '<tr>' +
                                '<th>Sohbet Url</th>' +
                                '<td><input class="textfield" id="chaturl_url" name="chaturl_url" size="30" value="' + chaturl + '" type="text"></td>' +
                            '</tr>' +
                        '</tbody></table>' +
                        '<div class="centerButton">' + 
                            '<input id="show_chatlinks_savesettings" onclick="saveChatlinkSettings()" value="Kaydet" class="button" type="button">' + 
                       '</div>' +
                    '</div>' + 
                    '<div class="footer"></div>' +
                '</div>';

    var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
    document.getElementById("mainview").insertBefore(settingsDialog, document.getElementById("vacationMode"));
    
    unsafeWindow.saveChatlinkSettings = function() {
      var newURL = document.getElementById("chaturl_url").value;
      window.setTimeout(GM_setValue, 0, domain + "." + server + ".chaturl", newURL);
        window.location.replace(window.location);
    };
}