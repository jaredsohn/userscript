// ==UserScript==
// @name          R2RT
// @namespace     http://werebear.tistory.com/
// @description   Reply to ReTweet
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// @match         http://twitter.com/*
// @match         https://twitter.com/*
// @author        gjwlstjr
// @version       2.0.4
// ==/UserScript==

function init(arg1) {
    if (arg1 == undefined) {
        var myconfigmenu = document.createElement('li');
        var myonclick = "document.getElementById('r2rt_panel').style.visibility='visible'; return false;"
        myconfigmenu.innerHTML = '<a id="r2rt_settings_link" href="/#" onclick="' + myonclick + '"accesskey="^">R2RT settings</a>\n          ';
        var nextNode = document.getElementById("help_link").parentNode;
        nextNode.parentNode.insertBefore(myconfigmenu, nextNode);

        var cookies = document.cookie.match(/r2rt_style_old_style_rt=(\d);?/);
        var initvalue = 'value="0"'
        if (cookies && cookies[1] == 1) {
            initvalue = 'value="1" checked';
        }

        var mydiv = document.createElement('div');
        mydiv.id="r2rt_panel";
        mydiv.style.backgroundColor="lightblue";
        mydiv.style.visibility="hidden";
        mydiv.style.left="330px";
        mydiv.style.top="50px";
        mydiv.style.width="480px";
        mydiv.style.position="absolute";
        mydiv.style.zIndex="1";

        mydiv.innerHTML = '<h1>Reply to ReTweet Setting</h1>' +
            '<fieldset class="common-form standard-form r2rt_setting">' +
            '<table class="input-form" cellspacing="0">' +
            '<tbody>' +
            '<tr class="main">' +
            '<th>Old-style RT:</th>' +
            '<td>' +
            '<input id="rtrt_old_style_rt" name="user_r2rt_style" ' + initvalue + ' type="checkbox">' +
            '<label for="r2rt_old_style_rt">Convert new ReTweet to old-style RT</label>' +
            '</td></tr>' +
            '<tr>' +
            '<th></th>' +
            '<td>' +
            '<input value="Save" name="commit" id="r2rt_settings_save" class="btn btn-m" type="submit">' +
            //'<input value="Cancel" name="commit" id="r2rt_settings_cancel" class="btn btn-m" type="submit">' +
            '</td></tr></tbody></table></fieldset>';

        var nextNode = document.getElementById('notifications');
        nextNode.parentNode.insertBefore(mydiv, nextNode);
        document.getElementById('r2rt_settings_save').addEventListener('click', arguments.callee, true);
        //document.getElementById('r2rt_settings_cancel').addEventListener('click', arguments.callee, true);
    }
    else {
        // = config =
        if (document.getElementById('rtrt_old_style_rt').checked) {
            document.cookie="r2rt_style_old_style_rt=1";
        }
        else {
            document.cookie="r2rt_style_old_style_rt=0";
        }
        document.getElementById('r2rt_panel').style.visibility='hidden';
    }
}

function init_2cents(arg1) {
    if (arg1 == undefined) {
        var my_screen_name;
        var metas = document.getElementsByTagName('META');
        for (var i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('NAME') == 'session-user-screen_name') {
                my_screen_name = metas[i].getAttribute('CONTENT');
                break;
            }
        }
        var mydiv = document.createElement('FORM');
        mydiv.id = 'my2cents_templ';
        mydiv.action = '/#';
        mydiv.innerHTML = '<table border=0 width=100%><tr><td><h4>What do you think about that?</h4></td>' +
            '<td width=10%><h4>' +
            '<strong style="color: rgb(204, 204, 204);" name="charcounter" class="char-counter">???</strong>' +
            '</h4></td></table>' +
            '<textarea cols="30" rows="2" name="twocents"' +
                ' onkeyup="this.form.getElementsByTagName(\'STRONG\')[0].innerHTML=(140-this.value.length-this.form.pfix.value.length)"' +
                //' onfocus="document.title=\'focus\'" onblur="document.title=\'blur\'">' +
            '</textarea>' +
            '<label>' +
                '(@' + my_screen_name +
                '<select name="pfix" accesskey="&quot;" onchange="this.form.getElementsByTagName(\'STRONG\')[0].innerHTML=(140-this.form.twocents.value.length-this.value.length);">' +
                    '<option value="(@' + my_screen_name + '\'s 2¢)" selected="selected">&apos;s 2&cent;</option>' +
                    '<option value="(@' + my_screen_name + '생각)">생각</option>' +
                    '<option value="(@' + my_screen_name + '의견)">의견</option>' +
                '</select>)' +
            '</label><br/><center>' +
            '<input type=hidden name="statusid" value="">' +
            '<input type=button name="submit" value="Retweet">' +
            '<input type=button name="cancel" value="Cancel" onclick="this.form.parentNode.removeChild(this.form);">' +
            '</center>';
        mydiv.style.visibility = 'hidden';

        var nextNode = document.getElementById('notifications');
        nextNode.parentNode.insertBefore(mydiv, nextNode);
    }
    else {
        //alert(1);
        return(false);
    }
}

//if (unsafeWindow.$ && unsafeWindow.$.fn.isCharCounter) {
    init();
    init_2cents();
//}

window.setTimeout(function() {
    var timelines = document.getElementsByTagName('OL');
    var statusbox = document.getElementById('status');

//    var my2cents = document.getElementById('my2cents');
    function OCF(to,id) {
        return ' onclick="' +
                "{var T=document.getElementById('status');" +
                "T.value='@" + to + " '+T.value.replace(RegExp('@" + to + " ?','i'),'');" +
                "document.getElementById('in_reply_to_status_id').value='" + id + "';" +
                "document.getElementById('in_reply_to').value='" + to + "';" +
                "if(document.getElementById('status_update_box')){window.location='" + HRF(to,id) + "'}" +
                "var evt=T['blur'];" +
                "if(typeof(evt)=='function')evt();" +
                //T.focusEnd();
                "window.scroll(0,0);" +
                "}" + '"';
    }
    function HRF(to,id) {
        return '/?status=@' + to +
               '%20&amp;in_reply_to_status_id=' + id +
               '&amp;in_reply_to=' + to;
    }

    if (timelines) {
        var flag;
        var cookies = document.cookie.match(/r2rt_style_old_style_rt=(\d);?/);
        if (cookies && cookies[1] == 1) {
            flag = 1;
        }
        else {
            flag = 0;
        }

        for (var i = 0; i < timelines.length; i++) {
            if (timelines[i].className && / statuses /.test(' ' + timelines[i].className + ' ')) {
                var entries = timelines[i].childNodes;
                for (var j = 0; j < entries.length; j++) {
                    // RT+2¢
                    if (entries[j].className && entries[j].className.indexOf(' status') >= 0 && entries[j].className.indexOf(' mine ') == -1) {
                        var L2 = entries[j].innerHTML.match(/id="status_star_(\d+)"/);
                        var thespans = entries[j].getElementsByTagName('SPAN');
                        //for (var k = 0; k < thespans.length; k++) {
                        for (var k = thespans.length; k-- > 0; ) {
                            if (thespans[k].className && thespans[k].className.indexOf('rt2cents') >= 0)
                                break;
                            if (thespans[k].className && thespans[k].className == 'retweet-link') {
                                var rt2cents_li = document.createElement('LI');
                                var maonclick = 'var macents=document.getElementById(\'my2cents\');' +
                                    'if(macents==undefined){' +
                                        'macents=document.getElementById(\'my2cents_templ\').cloneNode(true);' +
                                        'macents.id=\'my2cents\';' +
                                    '}' +
                                    'macents.style.visibility=\'visible\';' +
                                    'macents.statusid.value=\'' + L2[1] + '\';';
                                //var L3 = entries[j].innerHTML.match(new RegExp('[&;]in_reply_to_status_id=' + L2[1] + '[&amp;]+in_reply_to=(\w+)'));
                                var L3 = new RegExp('[&;]in_reply_to_status_id=' + L2[1] + '[&amp;]+in_reply_to=(\\w+)').exec(entries[j].innerHTML);
                                if (L3) {
                                    maonclick += 'macents.twocents.value=\'@' + L3[1] + ' \';';
                                }
                                else {
                                    maonclick += 'macents.twocents.value=\'\';';
                                }
                                maonclick += 'macents.getElementsByTagName(\'STRONG\')[0].innerHTML=(140-macents.twocents.value.length-macents.pfix.value.length);';
                                if (thespans[k].parentNode.parentNode.parentNode.parentNode.tagName == 'LI') {
                                    maonclick += 'this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(macents,this.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);' +
                                        'return(false);';
                                }
                                else {
                                    maonclick += 'this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(macents,this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);' +
                                        'return(false);';
                                }
                                rt2cents_li.innerHTML = '<span class="rt2cents-link">' +
                                    '&nbsp;&nbsp;' +
                                    '<a title="retweet + 2¢" href="/#"' +
                                    ' onclick="' + maonclick + '">RT+2&cent;</a>' +
                                    '</span>\n';
                                thespans[k].parentNode.parentNode.appendChild(rt2cents_li);
                                break;
                            }
                        }
                    }
                    // R2RT (Reply to ReTweet)
                    if (entries[j].className && entries[j].className.indexOf(' share status') >= 0) {
//                    if (entries[j].className && entries[j].className.indexOf(' status') >= 0) {
                        var L = entries[j].id.match(/status_(\d+)/);
                        var spans = entries[j].childNodes;
                        var v_index;
                        var who;
                        var you;
                        var strong;
                        var E;
                        var icon;
                        for (var k = 0; k < spans.length; k++) {
                            if (flag == 1 &&
                                spans[k].className && spans[k].className == 'thumb vcard author' &&
                                spans[k].style.visibility != 'hidden') {
                                v_index = k;
                            }
                            else {
                                var RSBW;
                                if (spans[k].tagName == 'DIV') {
                                    for (var w = 0; w < spans[k].childNodes.length; w++) {
                                        RSBW = spans[k].childNodes[w];
                                        if (RSBW.className && RSBW.className == 'status-body') {
                                            break;
                                        }
                                    }
                                }
                                else if (spans[k].className && spans[k].className == 'status-body') {
                                    RSBW = spans[k];
                                } else {
                                    continue;
                                }
                                var bodies = RSBW.childNodes;
                                var R;
                                for (var l = 0; l < bodies.length; l++) {
                                    if (flag == 1 && bodies[l].tagName == 'SPAN' &&
                                        bodies[l].className && bodies[l].className == 'big-retweet-icon') {
                                        icon = bodies[l];
                                    }
                                    else if (flag == 1 && bodies[l].tagName == 'STRONG') {
                                        strong = bodies[l];
                                    }
                                    else if (bodies[l].tagName == 'SPAN' &&
                                        bodies[l].className && bodies[l].className == 'actions') {
                                        R = bodies[l].innerHTML.match(/id="status_star_(\d+)"/);
                                    }
                                    else if (bodies[l].tagName == 'SPAN'
                                        && bodies[l].className && bodies[l].className == 'entry-content') {
                                        E = bodies[l];
                                    }
                                    else if (bodies[l].tagName == 'SPAN'
                                        && bodies[l].className && bodies[l].className == 'meta entry-meta retweet-meta') {
                                        var rtmeta = bodies[l].innerHTML;
                                        who = rtmeta.match(/<a href="\/(\w+)" class="screen-name timestamp-title"/);
                                        you = rtmeta.match(/<a href="\/(\w+)" class="screen-name timestamp-title you"/);
                                    }
                                    else if (bodies[l].tagName == 'UL'
                                        && bodies[l].className && bodies[l].className == 'actions-hover') {
                                        var rtmeta = bodies[l].innerHTML;
                                        var M;

                                        if (rtmeta.match(/>… to /)) {
                                            // skip
                                        }
                                        else if (M=rtmeta.match(/id="share_(\d+)"/)) {
                                            var hrefurl;
                                            var onclickfunc;
                                            if (you) {
                                                if (statusbox) {
                                                    onclickfunc=OCF(you[1], M[1]);
                                                    hrefurl='/#';
                                                }
                                                else {
                                                    onclickfunc = '';
                                                    hrefurl = HRF(you[1], M[1]);
                                                }

                                                var RT = document.createElement('LI');
                                                RT.innerHTML = '<span class="reply2rt">' +
                                                         //'<span class="reply-icon icon"></span>' +
                                                         '&nbsp;' +
                                                         '<a href="' + hrefurl + '" title="reply to yourself"' + onclickfunc +
                                                         '>… to you</a></span>';
                                                bodies[l].insertBefore(RT, bodies[l].getElementsByTagName('LI')[0].nextSibling);
                                            }
                                            if (who) {
                                                if (statusbox) {
                                                    onclickfunc=OCF(who[1], L[1]);
                                                    hrefurl='/#';
                                                }
                                                else {
                                                    onclickfunc = '';
                                                    hrefurl = HRF(who[1], L[1]);
                                                }
                                                var RT = document.createElement('LI');
                                                RT.innerHTML = '<span class="reply2rt">' +
                                                         //'<span class="reply-icon icon"></span>' +
                                                         '&nbsp;' +
                                                         '<a href="' + hrefurl + '" title="reply to ' + who[1] + '"' + onclickfunc +
                                                         '">… to ' + who[1] + '</a></span>';
                                                bodies[l].insertBefore(RT, bodies[l].getElementsByTagName('LI')[0].nextSibling);
                                            }
                                            //bodies[l].innerHTML = rtmeta;
                                        }
                                        else if (R[1] != L[1]) {
                                            var hrefurl;
                                            var onclickfunc;
                                            if (who) {
                                                if (statusbox) {
                                                    onclickfunc=OCF(who[1], L[1]);
                                                    hrefurl='/#';
                                                }
                                                else {
                                                    onclickfunc = '';
                                                    hrefurl = HRF(who[1], L[1]);
                                                }
                                                var RT = document.createElement('LI');
                                                RT.innerHTML = '<span class="reply2rt">' +
                                                         //'<span class="reply-icon icon"></span>' +
                                                         '&nbsp;' +
                                                         '<a href="' + hrefurl + '" title="reply to ' + who[1] + '"' + onclickfunc +
                                                         '">… to ' + who[1] + '</a></span>';
                                                bodies[l].insertBefore(RT, bodies[l].getElementsByTagName('LI')[0].nextSibling);
                                            }
                                            else if (you) {
                                                if (statusbox) {
                                                    onclickfunc=OCF(you[1], L[1]);
                                                    hrefurl='/#';
                                                }
                                                else {
                                                    onclickfunc = '';
                                                    hrefurl = HRF(you[1], L[1]);
                                                }
                                                var RT = document.createElement('LI');
                                                RT.innerHTML = '<span class="reply2rt">' +
                                                          //'<span class="reply-icon icon"></span>' +
                                                         '&nbsp;' +
                                                          '<a href="' + hrefurl + '" title="reply to yourself"' + onclickfunc +
                                                          '>… to you</a></span>';
                                                bodies[l].insertBefore(RT, bodies[l].getElementsByTagName('LI')[0].nextSibling);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (flag == 1) {
                            // convert retweet to old-style look
                            if (icon) {
                                icon.parentNode.removeChild(icon);
                            }

                            if (strong && !strong.innerHTML.match(/ r2rt-done/)) {
                                if (who) {
                                    var authorurl = strong.innerHTML.replace(/screen-name/,'username');

                                    E.innerHTML = 'RT @' + authorurl + ': ' + E.innerHTML;
                                    if (v_index) {
                                        strong.innerHTML = '<a href="http://twitter.com/' + who[1] + '" class=tweet-url screen-name r2rt-done" title="' + who[1] + '">'
+ who[1] + '</a>';
                                        var pat = new RegExp('/' + who[1] + '$','i');
                                        var profiles = document.getElementsByTagName('A');
                                        if (profiles) {
                                            for (var k = 0; k < profiles.length; k++) {
                                                if (profiles[k].className == 'tweet-url profile-pic url' &&
                                                    profiles[k].href.match(pat)) {
                                                    var newvcard = document.createElement('span');
                                                    newvcard.className = 'thumb vcard retweeter';
                                                    var newPic=profiles[k].cloneNode(true);
                                                    var picExt=newPic.innerHTML.match(/_mini\.(([Pp][Nn][Gg])|([Jj][Pp][Ee]?[Gg])|([Gg][Ii][Ff]))"/);
                                                    if (picExt) {
                                                        newPic.innerHTML = newPic.innerHTML
                                                            .replace(/ align="absmiddle" /,' ')
                                                            .replace(/ height="24"/, ' height="48"')
                                                            .replace(/ width="24"/, ' width="48"')
                                                            .replace(/_mini\.(([Pp][Nn][Gg])|([Jj][Pp][Ee]?[Gg])|([Gg][Ii][Ff]))/,
                                                                    '_normal.' + picExt[1]);
                                                    }
                                                    //newPic.style.visibility = 'visible';
                                                    newvcard.style.visibility = 'visible';
                                                    newvcard.appendChild(newPic);

                                                    spans[v_index].style.visibility = 'hidden';
                                                    entries[j].insertBefore(newvcard, spans[v_index]);
                                                    break;
                                                }
                                            }
                                            if (k >= profiles.length) {
                                                var prot = /^(https?):/.exec(window.location);
                                                var newvcard = document.createElement('span');
                                                newvcard.className = 'thumb vcard retweeter';
                                                if (prot[1] == 'http') {
                                                    newvcard.innerHTML = '<a href="http://twitter.com/' + who[1] +
                                                        '" class="tweet-url profile-pic url">' +
                                                        '<img alt="' + who[1] + '" class="photo fn" src="http://a0.twimg.com/a/1258570280/images/loader.gif" height="48" width="48"></a>';
                                                }
                                                else {
                                                    newvcard.innerHTML = '<a href="http://twitter.com/' + who[1] +
                                                        '" class="tweet-url profile-pic url">' +
                                                        '<img alt="' + who[1] + '" class="photo fn" src="http://twivatar.org/' + who[1] + '" height="48" width="48"></a>';
                                                }
                                                spans[v_index].style.visibility = 'hidden';
                                                entries[j].insertBefore(newvcard, spans[v_index]);

                                                if (prot[1] == 'http') {
                                                    var req = new XMLHttpRequest();
                                                    req.overrideMimeType('text/xml');
                                                    req.onreadystatechange = function(){
                                                        if (req.readyState == 4) {
                                                            var pageUser = req.responseText.match(/<meta content="(\w+)" name="page-user-screen_name" \/>/);
                                                            var newPicUrl = req.responseText.match(/src="(http:\/\/\w+\.\w+\.\w+\/profile_images\/\d+\/.*?\.(([Pp][Nn][Gg])|([Jj][Pp][Ee]?[Gg])|([Gg][Ii][Ff])))"/);
                                                            if (newPicUrl) {
                                                                var normalPic = newPicUrl[1].replace(/\.\w+$/,'_normal.' + newPicUrl[2]);
                                                                var newPicHtml = '<a href="http://twitter.com/' + pageUser[1] +
                                                                    '" class="tweet-url profile-pic url">' +
                                                                    '<img alt="' + pageUser[1] +
                                                                    '" class="photo fn" src="' + normalPic +
                                                                    '" onerror="this.src=\'' + newPicUrl[1] + '\'" height="48" width="48"></a>';
                                                                    var pat2 = new RegExp('/' + pageUser[1] + '$','i');
                                                                var profiles2 = document.getElementsByTagName('A');
                                                                if (profiles2) {
                                                                    for (var k2 = 0; k2 < profiles2.length; k2++) {
                                                                        if (profiles2[k2].className == 'tweet-url profile-pic url' && profiles2[k2].href.match(pat2)) {
                                                                            var parent_vcards = profiles2[k2].parentNode;
                                                                            if (parent_vcards.tagName == 'SPAN' &&
                                                                                parent_vcards.className &&
                                                                                parent_vcards.className == 'thumb vcard retweeter') {
                                                                                parent_vcards.innerHTML = newPicHtml;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            else {
                                                                // no profile picture for this user!
                                                            }
                                                        }
                                                        else {
                                                            // still not ready
                                                        }
                                                    }
                                                    req.open('GET', '/account/profile_image/' + who[1] + '?hreflang=en', true);
                                                    req.send(null);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        // no thumb vcard
                                        strong.parentNode.removeChild(strong);
                                    }
                                }
                                else if (you) {
                                    if (strong && !strong.innerHTML.match(/ r2rt-done/)) {
                                        var authorurl = strong.innerHTML.replace(/screen-name/,'username');
                                        strong.innerHTML = '<a href="http://twitter.com/' + you[1] + '" class=tweet-url screen-name r2rt-done" title="' + you[1] + '">' + you[1] + '</a>';
                                        E.innerHTML = 'RT @' + authorurl + ': ' + E.innerHTML;
                                    }
                                    if (v_index) {
                                        myprofile = document.getElementById('profile').innerHTML.match(/src="(http:\/\/\w+\.\w+\.\w+\/profile_images\/\d+\/.*?\_normal.(([Pp][Nn][Gg])|([Jj][Pp][Ee]?[Gg])|([Gg][Ii][Ff])))"/);
                                        if (!myprofile) {
                                            myprofile = document.getElementById('profile').innerHTML.match(/src="(http:\/\/\w+\.\w+\.\w+\/\w+\/\d+\/images\/.*?\.(([Pp][Nn][Gg])|([Jj][Pp][Ee]?[Gg])|([Gg][Ii][Ff])))"/);
                                        }
                                        var newvcard = document.createElement('span');
                                        newvcard.className = 'thumb vcard retweeter';
                                        if (myprofile) {
                                            newvcard.innerHTML = '<a href="http://twitter.com/' + you[1] +
                                                '" class="tweet-url profile-pic url">' +
                                                '<img alt="' + you[1] + '" class="photo fn" src="' + myprofile[1] + '" height="48" width="48"></a>';
                                        }
                                        else {
                                            newvcard.innerHTML = '<a href="http://twitter.com/' + you[1] +
                                                '" class="tweet-url profile-pic url">' +
                                                '<img alt="' + you[1] + '" class="photo fn" src="http://a0.twimg.com/a/1258570280/images/loader.gif" height="48" width="48"></a>';
                                        }
                                        spans[v_index].style.visibility = 'hidden';
                                        entries[j].insertBefore(newvcard, spans[v_index]);
                                    }
                                    else if (strong) {
                                        strong.parentNode.removeChild(strong);
                                    }
                                }
                                else {
                                    //document.title = "?";
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    window.setTimeout(arguments.callee, 4000);
}, 1000);


window.setTimeout(function(arg2) {
    var my2form = document.getElementById('my2cents');

    if (arg2) {
        var inpTags = my2form.getElementsByTagName('INPUT');
        var stid4rt;
        for (var kk = 0; kk < inpTags.length; kk++) {
            if (inpTags[kk].name == 'statusid') {
                stid4rt = inpTags[kk].value;
                break;
            }
        }

        var params;
        inpTags = document.getElementsByTagName('INPUT');
        for (var k1 = 0; k1 < inpTags.length; k1++) {
            if (inpTags[k1].name == 'authenticity_token') {
                params = 'authenticity_token=' + inpTags[k1].value +
                         '&controller_name=TimelineController' +
                         '&action_name=home';
                break;
            }
        }
        //alert('before send');
        var req = new XMLHttpRequest();
        req.overrideMimeType('text/xml');
        req.onreadystatechange = function(){
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var respJSON = eval('('+req.responseText+')');
                    var shareid = respJSON.status_li.match(/id="share_(\d+)"/);

                    if (shareid) {
                        var my2text = my2form.getElementsByTagName('TEXTAREA')[0].value;
                        var my2sign = my2form.getElementsByTagName('SELECT')[0].value;
                        if (my2text.length+my2sign.length<140 && my2text.match(/\S$/)) {
                            my2text += ' ';
                        }
                        my2text += my2sign;

                        params += '&status=' + encodeURI(my2text) +
                            '&twttr=true&return_rendered_status=false' +
                            '&in_reply_to_status_id=' + shareid[1];

                        var innerReq = new XMLHttpRequest();
                        innerReq.overrideMimeType('text/xml');
                        innerReq.onreadystatechange = function(){
                            if (innerReq.readyState == 4) {
                                if (innerReq.status == 200) {
                                    // success
                                    window.location = '/';
                                }
                                else {
                                    alert('UPDATE(' + innerReq.status + '):' + innerReq.responseText);
                                }
                            }
                            else {
                                // still not ready
                            }
                        }
                        innerReq.open('POST', '/status/update', true);
                        innerReq.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        innerReq.setRequestHeader('Content-Type' ,'application/x-www-form-urlencoded; charset=UTF-8');
                        innerReq.send(params);
                    }
                }
                else {
                    alert('RETWEET(' + req.status + '):' + req.responseText);
                }
            }
            else {
                // still not ready
            }
        }

        req.open('POST', '/statuses/' + stid4rt + '/retweet', true);
        req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        req.setRequestHeader('Content-Type' ,'application/x-www-form-urlencoded; charset=UTF-8');

        req.send(params);

        //alert('sent');
        return(false);
    }
    else{

        if (my2form) {
            var inps2 = my2form.getElementsByTagName('INPUT');
            for (var k2 = 0; k2 < inps2.length; k2++) {
                if (inps2[k2].name == 'submit') {
                    var evt = inps2[k2]['click'];
                    if (evt && typeof(evt)=='function') {
                        inps2[k2].removeEventListener('click', evt, true);
                    }
                    inps2[k2].addEventListener('click', arguments.callee, true);
                    break;
                }
            }
        }
        window.setTimeout(arguments.callee, 2000, 0);
    }
}, 2000, 0);


