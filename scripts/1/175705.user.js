// ==UserScript==
// @name        CC Enhancement Suite
// @author      Xanii
// @namespace   http://www.codecommunity.net/member.php?action=profile&uid=47
// @description An even better CodeCommunity Experience!
// @include     *codecommunity.net/*
// @version     0.2
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_info
// @require     http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     http://sublyme.net/site_media/userscripts/GM_SuperValues.user.js
// ==/UserScript==

//Some of this, but not most, was blatantly stolen and modified from Emylbus's script without permission because I was lazy.  Plox forgive me.
GM_config.init('CodeCommunity Enhancer - v'+GM_info.script.version,{
    /*'citeStyle':{
        'label':'Choose your Thread Citing format:',
        'type':'select',
        'options': {
            'standard':'Title by User',
            'withdash': 'Title - User',
            'title': 'Title',
        },
        'default':'standard',
        'section':['','Forum']
    },*/
    'hideLiveStream':{
        'label':'Hide LiveStream Display?',
        'type':'checkbox',
        'default':false
    },
    'usertagging':{
        'label':'Enable user tagging?',
        'type':'checkbox',
        'default':true
    },
    'showReputation':{
        'label':'Display "My Reputation" link?',
        'type':'checkbox',
        'default':true
    },
    'groupLeaderUserList':{
        'label':'Easy member list: ',
        'type':'select',
        'options':{
            'none':'None',
            'standard':'Standard with BB List',
            'standardnolink':'Standard without BB List',
            'nolistwithlink':'Comma Deliminated with Links',
            'nolistnolink': 'Comma Deliminated without Links',
        },
        'default':'standard',
        'section':['','Group Leader']
    },
    'groupAlertHide':{
        'label':'Hide group join requests?',
        'type':'checkbox',
        'default':false,
    }
});

// CSS to inject:

var emyNotice = [
    ".emy_alert {",
    "background: #333333;",
    "border-top: 1px solid #F4D639;",
    "border-bottom: 1px solid #F4D639;",
    "text-align: center;",
    "padding: 5px 20px;",
    "font-size: 11px;",
    "margin-bottom: 15px;}",
].join("");
    
    var leftUnReadBubble = [
    '.pm_left_unread {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#E3A3A3;',
    'color:#000000;',
    'float:left;',
    '}'
].join('');

var leftReadBubble = [
    '.pm_left_read {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#AAA3A3;',
    'color:#333333;',
    'float:left;',
    '}'
].join('');

var rightUnReadBubble = [
    '.pm_right_unread {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#A3E3A3;',
    'color:#000000;',
    'text-align:right;',
    'float:right;',
    '}'
].join('');

var rightReadBubble = [
    '.pm_right_read {',
    'border-radius: 5px;',
    'border: 1px solid black;',
    'width: 98%;',
    'padding:5px 5px 5px 5px;',
    'background-color:#A3AAA3;',
    'color:#333333;',
    'text-align:right;',
    'float:right;',
    '}'
].join('');

var fixedTable = [
    'table.fixed { table-layout:fixed; }',
    'table.fixed td { overflow: hidden; }',
].join('');
    
    var tagBubble = [
    '.tag_bubble {',
    'border-radius: 3px;',
    'border: 1px solid black;',
    'padding: 0px 4px 0px 4px;',
    'background-color:#29BFFF;',
    'color:#000000;',
    '}'
].join('');

var banBubble = [
    '.ban_bubble {',
    'border-radius: 3px;',
    'border: 1px solid black;',
    'padding: 0px 4px 0px 4px;',
    'margin-top: 5px;',
    'background-color:#E01B1B;',
    'color:#000000 !important;',
    '}',
    '.ban_bubble a:link{',
    'color:#000000;',
    '}'
].join('');

// CCE code

function injectCSS(){
    GM_addStyle(emyNotice);
    GM_addStyle(leftUnReadBubble);
    GM_addStyle(leftReadBubble);
    GM_addStyle(rightUnReadBubble);
    GM_addStyle(rightReadBubble);
    GM_addStyle(fixedTable);
    GM_addStyle(tagBubble);
    GM_addStyle(banBubble);
}

var defaultusertags = {
    '47':'CCE Developer',
};

var ver, uid, bar, repurl;

function replaceAll(str, find, replace) {
    /* I didn't write this, but it's damn useful */
    return str.replace(new RegExp(find, 'g'), replace);
}

function trimString (str) {
    /* Also didn't write this, but it's very useful and so elegant! */
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function getUser(){
    return document.getElementById('panel').innerHTML.split('uid=')[1].split('">')[0];
}

function setPanel(){
    uid = getUser();
    if(GM_config.get('showReputation', true)){
        repurl = "User CP</strong></a> — <a href='http://www.codecommunity.net/reputation.php?uid=" +uid+ "'>My Reputation</a>";
    }else{
        repurl = "User CP</strong></a> — <a title='CCE Settings' href='javascript:void(0);' id='settings'>CCE Settings</a>";
    }
    
    $("#settings").live("click", function(){ showSettings(); }); 
    $("#panel").append("<div style='float: right;'><a title='Group Display' href='http://www.codecommunity.net/usergroups.php'>Group Display</a> — <a title='CCE Settings' href='javascript:void(0);' id='settings'>CCE Settings</a> — Currently Using CCE V. " +GM_info.script.version+"</div>");
    $("#panel").replaceWith('<div id="panel">' + document.getElementById("panel").innerHTML.replace("User CP</strong></a>", repurl) + '</div>');
}

function setLiveBox(){
    
    $("#livestream").replaceWith('');
    //$("#content").prepend("ls activated");
    
}

function showSettings(){
    
    GM_config.open();
    
}

function threadTagger(){
    var i, authorPosts, apHolder, tagNameHolder, tagNameKeys, uid, uidpos;
    authorPosts = document.getElementsByClassName('post_author');
    tagNameHolder = GM_SuperValue.get('usertags');
    tagNameKeys = Object.keys(tagNameHolder);
    
    for(i=0; i<authorPosts.length; i++){
        if(authorPosts[i].innerHTML.indexOf('uid=') != -1){
            uid = authorPosts[i].innerHTML.split('uid=')[1].split('">')[0];
            uidpos = tagNameKeys.indexOf(uid);
            if(uidpos != -1){
                if(tagNameHolder[uid] != ''){
                    apHolder = authorPosts[i].innerHTML.split('\n');
                    apHolder[3] = apHolder[3].replace('<br>','<span class="tag_bubble" >'+tagNameHolder[uid]+'</span><br>');
                    document.getElementsByClassName('post_author')[i].innerHTML = apHolder.join('\n');
                }
            }
        }
    }
}

function profileTagger(){
    var tag, uid, tagNameHolder;
    uid = document.URL.split('uid=')[1];
    tagNameHolder = GM_SuperValue.get('usertags');
    if(Object.keys(tagNameHolder).indexOf(uid) != -1 && tagNameHolder[uid] != ''){
        tag = tagNameHolder[uid];
    }else{
        tag = '<small><small><i>Click to add tag</i></small></small>';
    }
    $('.largetext').append('&nbsp&nbsp</strong><span class="tag_bubble" style="font-style:normal;" id="profileTag"><small>'+tag+'</small></span><strong> ');
    $("#profileTag").live("click", function(){ tagEditor(); }); 
    //var elementLink = document.getElementById('profileTag');
    //elementLink.addEventListener("click", tagEditor, true);
}

function tagEditor(){
    var newTag, tagNameHolder, uid;
    uid = document.URL.split('uid=')[1];
    tagNameHolder = GM_SuperValue.get('usertags');
    if(Object.keys(tagNameHolder).indexOf(uid) != -1){
        newTag = tagNameHolder[uid];
    }else{
        newTag = '';
    }
    newTag = prompt('Enter tag for user: ',newTag);
    if(newTag == null){
        return;
    }
    if(newTag != ''){
        tagNameHolder[uid] = newTag;
        GM_SuperValue.set('usertags', tagNameHolder);
    }
    if(newTag == '' || newTag == null || !newTag){
        tagNameHolder[uid] = '';
        GM_SuperValue.set('usertags', tagNameHolder);
    }
}

function threadPageMods(){
    GM_log("[HFES] Adding Thread Citer...");
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this thread!" href="#" id="citer">[cite]</a></small>';
    $("#citer").live("click", function(){ threadCiting(); }); 
    //var elementLink = document.getElementById('citer');
    //elementLink.addEventListener("click", threadCiting, true);
    if(GM_config.get("userBarSwitch") != "none"){
        GM_log("[HFES] userBarSwitch set to "+GM_config.get('userBarSwitch'));
        setUserbarInThread();
    }
    if(GM_config.get("ratingInfo")){
        GM_log("[HFES] Loading Detailed Raiting Mod...");
        displayThreadRatingT();
    }
    if(GM_config.get("usertagging")){
        GM_log("[HFES] Loading User Tagging in Thread Mod...");
        threadTagger();
    }
    if(GM_config.get("pmfrompost")){
        GM_log("[HFES] Loading PM from Post mod...");
        addPostPM();
    }
    if(GM_config.get("multiquote")){
        addMultiQuoteButtons();
    }
}

function replyMods(){
    if(GM_config.get("multiquote")){
        addMultiToReply();
    }
}

function pmMods(){
    if(GM_config.get("quickPM")){
        GM_log("[HFES] Loading Quick Message mod...");
        addQuickMsg();
    }
    if(GM_config.get("userBarSwitch") != "none"){
        GM_log("[HFES] userBarSwitch set to "+GM_config.get('userBarSwitch'));
        setUserbarInThread();
    }
    if(GM_config.get("prettyPM")){
        GM_log("[HFES] Loading Pretty PM mod...");
        prettyPM();
    }
    if(GM_config.get("usertagging")){
        GM_log("[HFES] Loading User Tagging in PM Mod...");
        threadTagger();
    }
}

function trackingMods(){
    if(GM_config.get("trackingLink")){
        GM_log("[HFES] Loading Links for PM Tracking Page...");
        addMsgTracking();
    }
}

function profileMods(){
    if(GM_config.get("usertagging")){
        profileTagger();
    }
    if(GM_config.get("profileCiting")){
        $(".largetext").append('&nbsp</strong><small><small><a title="Cite this user!" href="javascript:void();" id="profilegenerator">[cite]</a></small></small>');
        $("#profilegenerator").live("click", function(){ getProfileName(); }); 
        //var elementLink = document.getElementById('profilegenerator');
        //elementLink.addEventListener("click", getProfileName, true);
    }
}

function searchMods(){
    if(GM_config.get("lastLink")){
        GM_log("[HFES] Loading Last Link mod...");
        addLastLinks();
    }
}

function fMods(){
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this forum!" href="#" id="fciter">[cite]</a></small>';
    $("#fciter").live("click", function(){ forumCiting(); }); 
    //var elementLink = document.getElementById('fciter');
    //elementLink.addEventListener("click", forumCiting, true);
    
    addfavlink();
    
    if(GM_config.get("ratingInfo")){
        GM_log("[HFES] Loading Rating Info mod...");
        displayThreadRating();
    }
    if(GM_config.get("lastLink")){
        //GM_log("[HFES] Loading Last Link mod...");
        //addLastLinks();
    }
}

function emyMessage(){
    //$("#content").prepend("It is: ");
    try{
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://my-x-api.tk/cce.html",
            onload: function(response){
                var emyHTML, emyMessageText, elementzLink, res, newres = [], i;
                //GM_log("[HFES] Emy Message: "+response.responseText);
                //$("#content").prepend("It is: "+response.responseText +GM_getValue("previousEmyMessage", "\n"));                
                if(GM_getValue("previousEmyMessage", "\n") == response.responseText && GM_getValue("hideEmyMsg", true)){
                    GM_log("[HFES] Not displaying Emy Message because it is the same as before and was hidden.");
                    return;
                }
                res = response.responseText.split('\n');
                for(i=0; i < res.length-1; i++){
                    if(res[i].indexOf("<") != 0 && res[i] != "\n"){
                        newres.push(res[i]);
                    }
                }
                GM_setValue("previousEmyMessage", response.responseText);
                GM_setValue("hideEmyMsg", false);
                //$("#content").prepend('<br><div class="pm_alert" id="pm_notice"> <div class="float_right"><a title="Dismiss this notice" onclick="return MyBB.dismissPMNotice()"><img src="images/Coding/dismiss_notice.gif" alt="Dismiss this notice" title="[x]"></a></div> <div><strong>Welcome to CodeCommunity Enhancer, coded by <a href="http://www.codecommunity.net/member.php?action=profile&amp;uid=47">Xanii</a></strong>!</div> </div>');
                
                hideButton = '<div class="float_right"><a href="#" title="Dismiss this notice" id="hider"><img src="http://www.codecommunity.net/images/Coding/dismiss_notice.gif" alt="Dismiss this notice" title="[x]"></a></div>';
                emyHTML = '<br><div class="pm_alert" id="my_notice"><div><strong>CCE Notice: </strong>'+newres.join(" | ")+hideButton+'</div></div>';
                if(response.responseText != "\n"){
                    $("#content").prepend(emyHTML);
                    elementzLink = document.getElementById('hider');
                    elementzLink.addEventListener("click", hideEmyMessage, true);
                }
            },
        });
    }catch(err){
        $("#content").prepend(err.message);
    }
}

function hideEmyMessage(){
    $("#my_notice").fadeOut();
    GM_setValue("hideEmyMsg", true);
}

function main(){
    
    setPanel();
    injectCSS();
    emyMessage();
    if(GM_config.get('hideLiveStream', true)){
        setLiveBox();
    }
    if(document.URL.indexOf("hfgrouptest") != -1 || document.URL.indexOf("managegroup.php") != -1){
        groupLeaderPageMods();
    }
    if(document.URL.indexOf("forumdisplay.php") != -1){
        GM_log("[HFRES] Loading Forum mods...");
        fMods();
    }
    if(document.URL.indexOf("member.php?action=profile") != -1){
        profileMods();
    }
    if(document.URL.indexOf("newreply.php?tid=") != -1){
        replyMods();
    }
    if(document.URL.indexOf("showthread.php") != -1){
        threadTagger();
        showBan();
    }
    if(document.URL.indexOf("private.php?action=read") != -1){
        GM_log("[HFES] Loading Private Message mods...");
        pmMods();
    }
    //showSettings();
    
}

function showBan(){
    
    var modq = $("#panel");
    if (modq.text().indexOf("Mod CP") !== -1) {
        
        var banLink = "http://www.codecommunity.net/modcp.php?action=banuser&uid=";
        var editLink = "http://www.codecommunity.net/modcp.php?action=editprofile&uid=";
        
        var i, authorPosts, apHolder, tagNameHolder, tagNameKeys, uid, uidpos;
        authorPosts = document.getElementsByClassName('post_author');
        tagNameHolder = GM_SuperValue.get('usertags');
        tagNameKeys = Object.keys(tagNameHolder);
        
        for(i=0; i<authorPosts.length; i++){
            if(authorPosts[i].innerHTML.indexOf('uid=') != -1){
                uid = authorPosts[i].innerHTML.split('uid=')[1].split('">')[0];
                uidpos = tagNameKeys.indexOf(uid);
                
                
                apHolder = authorPosts[i].innerHTML.split('\n');
                apHolder[3] = apHolder[3].replace('<br>','<br><a href="' + banLink + uid + '"<span class="ban_bubble" >Ban User</span></a> - <a href="' + editLink + uid + '"<span class="ban_bubble" >Edit User</span></a><br>');
                document.getElementsByClassName('post_author')[i].innerHTML = apHolder.join('\n');
                
                
            }
        }
    }
}

function createCiteLink(citation){
    window.prompt("Press Ctrl+C to copy thread citation!", citation); // Get rid of
}

function threadCiting(){
    var author, title;
    if(GM_config.get('citeStyle') == 'title'){
        title = getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL);
        createCiteLink(title);
        return;
    }
    if(document.URL.indexOf("\&") != -1){
        wrongPageCite();
    }else{
        if(GM_config.get('citeStyle') == 'standard'){
            author = getThreadOP(document.getElementsByClassName("post_author")[0].innerHTML);
            title = getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL);
            createCiteLink(title+" by "+author);
        }else{
            author = getThreadOP(document.getElementsByClassName("post_author")[0].innerHTML);
            title = getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL);
            createCiteLink(title+" - "+author);
        }
    }
}

function forumCiting(){
    window.prompt("Press Ctrl+C to copy forum citation!", getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL));
}

function getThreadOP(htmlCode){
    var infoHolder, uid, author, authorString, finalHTML, inc;
    infoHolder = htmlCode.split('largetext">')[1].split('</span')[0];
    infoHolder = infoHolder.replace(" ","").replace("<strong>","").replace("</strong>","");
    
    uid = infoHolder.split('uid=')[1].split('">')[0];
    
    author = infoHolder.replace("</a>","");
    author = author.split(">");
    author = author[author.length-1];//.split("<")[0];
    
    authorString = "[url=http://www.codecommunity.net/member.php?action=profile&uid="+uid+"]"+author+"[/url]";
    
    return authorString;
}

function getThreadTitle(htmlCode, aurl){
    var navArray, threadTitle, threadString, i;
    navArray = htmlCode.split('\n');
    for(i = 0; i < navArray.length; i++){
        if(navArray[i].indexOf('class="active"') != -1)
        {
            threadTitle = navArray[i].split('class="active">')[1].split('</span>')[0].replace('&nbsp;',' ');
            threadString = "[url="+aurl+"][b]"+threadTitle+"[/b][/url]";
            return threadString;
        }
    }
}

function wrongPageCite(){
    var realURL, author, title, finalHTML;
    realURL = document.URL.split("\&")[0];
    GM_xmlhttpRequest({
        method: "GET",
        url: realURL,
        onload: function(response){
            author = getThreadOP(response.responseText);
            title = getThreadTitle(response.responseText, realURL);
            if(GM_config.get('citeStyle') == 'standard'){
                createCiteLink(title+' by '+author);
            }else{
                createCiteLink(title+' - '+author);
            }
            
        },
    });
}

function groupAlertRemover(){
    $(".pm_alert:contains('pending group membership join request')").hide();
}

function getPMOP(htmlCode){
    var infoHolder, uid, author, authorString, finalHTML, inc;
    infoHolder = htmlCode.split('largetext">')[1].split('</span')[0];
    infoHolder = infoHolder.replace(" ","").replace("<strong>","").replace("</strong>","");    
    uid = infoHolder.split('uid=')[1].split('">')[0];
    
    author = infoHolder.replace("</a>","");
    author = author.split(">");
    author = author[author.length-1];//.split("<")[0];
    
    return author;
}

function addQuickMsg(){
    var msgBox, formButton, finalHtml, postKey, recipient, subject, messageToSend, pmid, postBody;
    postKey = document.getElementsByTagName('head')[0].innerHTML.split('my_post_key = "')[1].split('";')[0];
    /*msgBox = [
        '<div align="center">',
        '<textarea style="width: 66%; align:"center"; padding: 4px; margin: 0;" rows="8" cols="80" name="messagez" id="messagez" tabindex="1">',
        '</textarea></div>'].join('');*/
    recipient = getPMOP(document.getElementsByClassName("post_author")[0].innerHTML);
    subject = document.getElementsByClassName("thead")[1].innerHTML.split('>')[1].split('<')[0];
    if(subject.indexOf("Re:") != 0){
        subject = "Re: "+subject;
    }
    pmid = document.URL.split("pmid=")[1];
    
    postBody = document.getElementsByClassName("post_body")[0].innerHTML;
    
    postBody = replaceAll(postBody, "<blockquote><cite>", "[quote='");
    postBody = replaceAll(postBody, " Wrote:</cite>", "']\n");
    postBody = replaceAll(postBody, "</blockquote>", "[/quote]");
    postBody = replaceAll(postBody, "<code>","[code]\n");
    postBody = replaceAll(postBody, "</code>", "\n[/code]\n");
    postBody = postBody.replace(/<(?:.|\n)*?>/gm, '');
    postBody = trimString(postBody);
    postBody = "[quote='"+recipient+"']\n"+postBody+"[/quote]";
    
    finalHtml = [
        '<div align="center"; background: #000;>',
        '<form action="private.php" method="POST">',
        '<textarea style="width: 75%; align:"center"; padding: 4px; margin: 0;" rows="10" cols="80" name="message" id="message" tabindex="1">'+postBody+'</textarea><br>',
        '<input type="hidden" name="action" value="do_send" />',
        '<input type="hidden" name="my_post_key" value="'+postKey+'" />',
        '<input type="hidden" name="to" id="to" value="'+recipient+'" />',
        '<input type="hidden" name="pmid" value="'+pmid+'" />',
        '<input type="hidden" name="do" value="reply" />',
        '<input type="hidden" name="subject" value="'+subject+'" />',
        '<input type="hidden" name="options[readreceipt]" value="1" />',
        '<input type="hidden" name="options[savecopy]" value="1" />',
        '<input type="submit" class="bitButton" name="submit" value="Send Quick Reply" tabindex="9" accesskey="s" title="Quick reply with the above box" />',
        '  <a href="private.php?action=send&pmid='+pmid+'&do=reply" class="bitButton" rel="nofollow" title="Open full reply mode">Full Reply Mode</a>',
        '  <a href="private.php?action=send&pmid='+pmid+'&do=forward" class="bitButton" rel="nofollow" title="Forward the message to someone">Forward Message</a>',
        '  <a href="private.php?action=delete&pmid='+pmid+'&my_post_key='+postKey+'" class="bitButton" rel="nofollow" onclick="return confirm(\'Are you sure that you want to delete this PM?\');" title="Delete this message">Delete Message</a>',
        '</form>',
        '</div>'].join('');
    
    //$(".post_buttons").replaceWith(sendButton);
    $(".author_buttons").hide();
    $(".post_management_buttons").replaceWith(finalHtml);
    
}

main();