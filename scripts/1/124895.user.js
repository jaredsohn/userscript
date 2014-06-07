// ==UserScript==
// @name           Automatic Facebook
// @namespace      automatic_facebook
// @description    Like status dan like comment dengan 1x klik, wall bomber, expanding comment, refresh, confirm/unconfirm all request!
// @include        htt*://www.facebook.com/*
// @icon          
// @version        2.2
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude    htt*://www.facebook.com/advertising/*
// @exclude    htt*://www.facebook.com/ads/*
// @exclude    htt*://www.facebook.com/sharer/*

// ==/UserScript==


// ==============
// ==Show/Hide==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like1');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.opacity= 0.90;
 div.style.bottom = "+220px";
 div.style.right = "+7px";
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #94a3c4";
 div.style.padding = "2px";
 
 
 div2 = document.createElement("div");
 div2.setAttribute('id','spoiler');
 div2.style.position = "fixed";
 div2.style.opacity= 0.90;
 div2.style.bottom = "+220px";
 div2.style.right = "+7px";
 div2.style.backgroundColor = "#eceff5";
 div2.style.border = "1px solid #555";
 div2.style.padding = "2px";
 div2.innerHTML = "<div><center><a style='color: #FF0000;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&raquo; Hide &laquo;</a></center></div>"
 
 body.appendChild(div);
 body.appendChild(div2);
 
 unsafeWindow.spoiler = function() {
  var i;
 for(i=1;i<=20;i++) {
  var x=document.getElementById('like'+i);
  if (x.style.display=="none") {
  x.style.display="block";
  div2.innerHTML = "<center><a style='color: #FF0000;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&raquo; Hide &laquo;</a></center>"
  }
  else {
   x.style.display="none";
   div2.innerHTML = "<center><a style='color: #229A07;' onclick='spoiler()' title='Klik Untuk Menampilkan Widget'>&laquo; Show &raquo;</a></center>"
  }
 }
 };
}
// ==============





// ==============
// ==Expand Older comments==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.bottom = "+174px";
 div.style.right = "+7px";
 div.style.opacity= 0.90;
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #0753AF";
 div.style.padding = "2px";
 div.innerHTML = "<a href=\"JavaScript:AutoExpand()\">Expand Comments</a>"
 
 body.appendChild(div);
 
 unsafeWindow.AutoExpand = function() {
 
  buttons = document.getElementsByTagName("input");
  for(i = 0; i < buttons.length; i++) {
   myClass = buttons[i].getAttribute("class");
   if(myClass != null && myClass.indexOf("") >= 0)
    if(buttons[i].getAttribute("name") == "view_all[1]")
     buttons[i].click();
  }
  
 };
}
// ==============





// ==============
// ==Like all statuses==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.bottom = "+151px";
 div.style.right = "+7px";
 div.style.opacity= 0.90;
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #0753AF";
 div.style.padding = "2px";
 div.innerHTML = "<img src='http://rahmadnet.net78.net/likedislike/like.jpeg' width='12' height='11' align='absmiddle' /><a href=\"javascript:AutoLike()\"> Like All Statuses</a>"
 
 body.appendChild(div);
 
 unsafeWindow.AutoLike = function() {
 
  buttons = document.getElementsByTagName("button");
  for(i = 0; i < buttons.length; i++) {
   myClass = buttons[i].getAttribute("class");
   if(myClass != null && myClass.indexOf("like_link") >= 0)
    if(buttons[i].getAttribute("name") == "like")
     buttons[i].click();
  }
  
 };
}
// ==============





// ==============
// ==Unlike all statuses==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like4');
 div.style.position = "fixed";
 div.style.bottom = "+130px";
 div.style.right = "+7px";
 div.style.opacity= 0.90;
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #0753AF";
 div.style.padding = "2px";
 div.innerHTML = "<img src='http://rahmadnet.net78.net/likedislike/dislike.jpeg' width='12' height='11' align='absmiddle' /><a href=\"JavaScript:AutoUnLike()\">Unlike All Statuses</a>"
 
 body.appendChild(div);
 
 unsafeWindow.AutoUnLike = function() {
 
  buttons = document.getElementsByTagName("button");
  for(i = 0; i < buttons.length; i++) {
   myClass = buttons[i].getAttribute("class");
   if(myClass != null && myClass.indexOf("like_link") >= 0)
    if(buttons[i].getAttribute("name") == "unlike")
     buttons[i].click();
  
  }
  
 };
}
// ==============





// ==============
// ==Wall bomber==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like5');
 div.style.position = "fixed";
 div.style.bottom = "+107px";
 div.style.right = "+7px";
 div.style.opacity= 0.90;
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #0753AF";
 div.style.padding = "2px";
 div.innerHTML = "<a href=\"JavaScript:FloodWal()\"> Wall Attack </a>"
 
 body.appendChild(div);
 
 unsafeWindow.FloodWal = function() {
 
  var a = document.body.innerHTML;var Num=prompt("","Masukkan Jumlah Pesan Yang Akan Dikirim");var msg=prompt("","Masukkan Isi Pesan Anda");formx=a.match(/name="post_form_id" value="([\d\w]+)"/)[1];dts=a.match(/name="fb_dtsg" value="([^"]+)"/)[1];composerid=a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];target=a.match(/name="targetid" value="([^"]+)"/)[1];pst="post_form_id="+formx+"&fb_dtsg="+dts+"&xhpc_composerid="+composerid+"&xhpc_targetid="+target+"&xhpc_context=home&xhpc_fbx=1&xhpc_message_text="+encodeURIComponent(msg)+"&xhpc_message="+encodeURIComponent(msg)+"&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";i=0;while(i < Num){with(newx = new XMLHttpRequest()) open("POST", "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),send(pst);i += 1;void(0);}
 };
}
// ==============





// ==Like all comments==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like6');
 div.style.position = "fixed";
 div.style.bottom = "+84px";
 div.style.right = "+7px";
 div.style.opacity= 0.90;
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #0753AF";
 div.style.padding = "2px";
 div.innerHTML = "<img src='http://rahmadnet.net78.net/likedislike/like.jpeg' width='12' height='11' align='absmiddle' /><a href=\"JavaScript:AutoLikeComments()\"> Like All Comments</a>"
 
 body.appendChild(div);
 
 unsafeWindow.AutoLikeComments = function() {
 
  buttons = document.getElementsByTagName("button");
  for(i = 0; i < buttons.length; i++) {
   myClass = buttons[i].getAttribute("class");
   if(myClass != null && myClass.indexOf("") >= 0)
    if(buttons[i].getAttribute("title") == "Like this comment")
     buttons[i].click();   
               
  }
  
 };
}
// ==============





// ==============
// ==Unlike all comments==
body = document.body;
if(body != null) {
 div = document.createElement("div");
 div.setAttribute('id','like7');
 div.style.position = "fixed";
 div.style.bottom = "+63px";
 div.style.right = "+7px";
 div.style.opacity= 0.90;
 div.style.backgroundColor = "#eceff5";
 div.style.border = "1px solid #0753AF";
 div.style.padding = "2px";
 div.innerHTML = "<img src='http://rahmadnet.net78.net/likedislike/dislike.jpeg' width='12' height='11' align='absmiddle' /><a href=\"JavaScript:AutoUnLikeComments()\"> Unlike All Comments</a>"
 
 body.appendChild(div);
 
 unsafeWindow.AutoUnLikeComments = function() {
 
  buttons = document.getElementsByTagName("button");
  for(i = 0; i < buttons.length; i++) {
   myClass = buttons[i].getAttribute("class");
   if(myClass != null && myClass.indexOf("") >= 0)
    if(buttons[i].getAttribute("title") == "Unlike this comment")
     buttons[i].click();
  }
  
 };
}
// ==============


// ==UserScript==
// @name           facebook.com - Reply button
// @version        1.8
// @description    Add a reply button to comments
// @namespace      Kub4jz.cz
// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://www.facebook.com/*

// @exclude        htt*://*.facebook.com/login.php
// @exclude        htt*://*.facebook.com/sharer*
// @exclude        htt*://*.facebook.com/ajax/*
// @exclude        htt*://*.facebook.com/plugins/*
// @exclude        htt*://*.facebook.com/ai.php*

// @exclude        htt*://apps.facebook.com/*
// @exclude        htt*://*.facebook.com/apps/*
// ==/UserScript==

(function(d){

    var DEBUG = false;


    var script = {
        id: 49378,
        version: '1.8'
    }


    var gm_class = ' gm_reply_button';

    var button_text;
    var last_insert;


    var text = {
        en: 'Reply',
        cs: 'Reagovat'
    }


    function log(text)
    {
        if (DEBUG === true && typeof GM_log === 'function' && text !== '') {
            GM_log(text);
        }
        return false;
    }


    function getButtonText()
    {
        // get lang
        var lang = d.getElementsByTagName('html')[0].getAttribute('lang');

        return text[lang] ? text[lang] : text.en;
    }


//     function simulateKeyEvent(keyCodeArg, element)
//     {
//         var evt = document.createEvent("KeyboardEvent");
//                   evt.initKeyEvent ("keypress", true, true, window,
//                   0, 0, 0, 0,
//                   keyCodeArg, 0);
//
//         element.dispatchEvent(evt);
//
//         return false;
//     }


    /**
     * insert name to textarea
     */
    function insertName(evt)
    {
        evt.preventDefault();

        try {
            var parent = evt.target.parentNode.parentNode;

            var link = parent.getElementsByClassName('actorName')[0],
                string = link.textContent;

            var name = [];
                name = string.split(' ');
            var first_name = name[0];

            insert_text = '@' + first_name + ': ';

            var commentsWrapper = parent.parentNode;

            var i = 0;
            while (i < 10 && commentsWrapper.tagName !== 'ul' && commentsWrapper.className.indexOf('uiList uiUfi') == -1) {
                commentsWrapper = commentsWrapper.parentNode;
                i++;
            }

            var textarea = commentsWrapper.getElementsByTagName('textarea')[0];
                textarea.focus();


            if (textarea.value == '') last_insert = null;


            if (string != last_insert) {
                var pretext  = textarea.value.substring(0, textarea.selectionStart),
                    posttext = textarea.value.substring(textarea.selectionEnd, textarea.value.length);

                textarea.value = pretext + insert_text + posttext;

//                 simulateKeyEvent(39, textarea);

                last_insert = string;
            }
        } catch (e) {
            log(e);
        }

        return false;
    }


    /**
     * Add reply buttons to comments
     */
    function addButtons(parentNode)
    {
        try {
            parentNode = parentNode||d;

            var divs = parentNode.getElementsByClassName('commentActions');
            var div;

            for (i = 0; i <= divs.length-1; i++) {
                div = divs[i];

                if (div.className.indexOf(gm_class) >= 0) {
                    if (!!(button = div.getElementsByClassName('replyButton')[0])) {
                        button.addEventListener('click', insertName, false);
                    }

                    continue;
                }

                div.className += gm_class;

                // create & add reply button
                var button = d.createElement('a');
                    button.setAttribute('class', 'replyButton');
                    button.innerHTML = button_text;

                    button.addEventListener('click', insertName, false);

                // add separator
                div.innerHTML += ' · ';

                div.insertBefore(button, null);
            }
        } catch (e) {
            log(e);
        }

        return false;
    }



    function afterDomNodeInserted(e)
    {
        var target = e.target;

        if (target.nodeName == 'LI') {
            addButtons(target);
        }

        return false;
    }


    /* Start Script */
    if (!!(content = d.getElementById('content'))) {

        button_text = getButtonText();
        addButtons();

        setTimeout(function() {
            content.addEventListener(
                'DOMNodeInserted',
                afterDomNodeInserted,
                false
            );
        }, 2000);
    }


    /* AutoUpdater */
    if (typeof autoUpdate == 'function') {
        autoUpdate (script.id, script.version);
    }

})(document);