// ==UserScript==
// @name        HF Enhancement Suite
// @namespace   http://www.sublyme.net
// @description This userscript defines general enhancement tweaks that apply to the entire HackForums site.
// @include     *awardforums.com/*
// @version     0.25
// @updateURL   http://userscripts.org/scripts/source/170172.user.js
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @require     http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require     http://userscripts.org/scripts/source/107941.user.js
// ==/UserScript==

// CM_config settings
GM_config.init('AF Enhancement Suite by Processor',{
    /*'accstatus':{
        'label':'What is your account status?',
        'type':'select',
        'options' : {
            "notupgraded" : "Not Upgraded",
            "VIP" : "VIP",
                    },
        'default': 'notupgraded',
        'section':['','General']
    },*/
    'recvNotices':{
        'label':'Recieve important AFES notices?',
        'type':'checkbox',
        'default': true,
        'section':['','General']
    },
    'ratingInfo':{
        'label':'Show detailed thread rating info?',
        'type':'checkbox',
        'default':true,
        'section':['','Forum']
    },
    'quickPM':{
        'label':'Enable Quick PM?',
        'type':'checkbox',
        'default':true,
        'section':['','Private Messaging']
    },
    'trackingLink':{
        'label':'Enable links in message tracking? (VIP only)',
        'type':'checkbox',
        'default':false
    },
    'pmDeny':{
        'label':'Enable quick denying on PM notices? (VIP only)',
        'type':'checkbox',
        'default': false
    },
    'prettyPM':{
        'label':'Enable pretty PMs? (Warning: buggy feature)',
        'type':'checkbox',
        'default':false
    },
    'profileCiting':{
        'label':'Enable profile citing?',
        'type':'checkbox',
        'default':true,
        'section':['','Profile']
    },
    'usertagging':{
        'label':'Enable user tagging?',
        'type':'checkbox',
        'default':true
    },
    'staffOnline':{
        'label':'Enable checking online status of staff and moderators?',
        'type':'checkbox',
        'default':true,
        'section':['','Staff/Mod']
    },
    'showStaffLink':{
        'label':'Display "Show Staff" link?',
        'type': 'checkbox',
        'default':true,
        'section':['','Quick Links']
    },
    'showModLink':{
        'label':'Display "Show Mods" link?',
        'type':'checkbox',
        'default':true
    },
    'showGroupLink':{
        'label':'Display "Show Groups" link?',
        'type':'checkbox',
        'default':true
    },
    'showBuddyLink':{
        'label':'Display "Buddy List" link?',
        'type':'checkbox',
        'default':false
    },
    'showAwardList':{
        'label':'Display "Award List" link?',
        'type':'checkbox',
        'default':false
    },
    'showSubscribed':{
        'label':'Display "Subscribed Threads" link?',
        'type':'checkbox',
        'default':true
    },
    'lastLink':{
        'label':'Add last post links to search pages?',
        'type':'checkbox',
        'default':true,
        'section':['','Other']
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
    },
        'default':'none',
        'section':['','Fun']
    }
});

var defaultusertags = {
    '956054':'AFES Developer',
};

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
    'border-radius: 5px;',
    'border: 1px solid black;',
    'padding: 1px 4px 1px 4px;',
    'background-color:#C19CBC;',
    'color:#000000;',
    '}'
    ].join('');

// AFES code

function injectCSS(){
    GM_addStyle(emyNotice);
    GM_addStyle(leftUnReadBubble);
    GM_addStyle(leftReadBubble);
    GM_addStyle(rightUnReadBubble);
    GM_addStyle(rightReadBubble);
    GM_addStyle(fixedTable);
    GM_addStyle(tagBubble);
}
    
function replaceAll(str, find, replace) {
    /* I didn't write this, but it's damn useful */
  return str.replace(new RegExp(find, 'g'), replace);
}
    
function trimString (str) {
    /* Also didn't write this, but it's very useful and so elegant! */
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
    
function uberPMDeny(){
    try{
        var pmNotice, firstPart, secondPart, pmid, denyURL;
        pmNotice = document.getElementsByClassName('pm_alert')[0].innerHTML;
        pmNotice = pmNotice.split('\n');
        firstPart = pmNotice[1];
        secondPart = pmNotice[2];
        pmid = secondPart.split('pmid=')[1].split('" style')[0];
        denyURL = "http://www.hackforums.net/private.php?action=read&pmid="+pmid+"&denyreceipt=1";
        secondPart = secondPart.split('</div>')[0]+"&nbsp;&nbsp;<small><i><a href="+denyURL+">[deny receipt]</a></i></small></div>";
        document.getElementsByClassName('pm_alert')[0].innerHTML = firstPart + "\n" + secondPart;
    }catch(err){
    }
}

function showSettings(){
    GM_log("[AFES] Opening settings window...");
    GM_config.open();
}

function addSpecialLinks(){
    
    var bodyList, buddyIndex, i, currDir, elementLink, specialLinks = [];
    
    if(document.URL.indexOf("misc.php?action=buddypopup") != -1){
        return;
    }
    
    if(GM_config.get('showSubscribed', true)){
        specialLinks.push('<a href="/usercp.php?action=subscriptions">Subscribed Threads</a>');
    }
    if(GM_config.get('showBuddyLink', true)){
        // Fucking hell, why does this shit hate me so much. Adding temp fix till I can come up with a permanent solution.
        //specialLinks.push('<a href="#" onclick="MyBB.popupWindow(\"http://www.hackforums.net/misc.php?action=buddypopup\", \"buddyList\", 350, 350);">Open Buddy List</a>');
        //specialLinks.push('<a href="#" onclick="javascript:void window.open(\'http://www.hackforums.net/misc.php?action=buddypopup\',\'13\',\'width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0\');return false;">Buddy List</a>');
		//specialLinks.push('<a href="#" id="buddy">Buddy List</a>');
        specialLinks.push('<a href="/misc.php?action=buddypopup" target=”_new”>Buddy List</a>');
    }
    if(GM_config.get('showStaffLink', true)){
        specialLinks.push('<a href="/showstaff.php">Show Staff</a>');
    }
    if(GM_config.get('showGroupLink', true)){
        specialLinks.push('<a href="/showgroups.php">Show Groups</a>');
    }
    if(GM_config.get('showAwardList', false)){
        specialLinks.push('<a href="/myawards.php">Award List</a>');
    }
    
    specialLinks.push('<a title="" href="javascript:void(0);" id="settings">AFES Settings</a>');
    
    specialLinks = specialLinks.join(" | ");
    bodyList = document.getElementById('panel').innerHTML.split('\n');//document.body.innerHTML.split('\n');
    for(i = 0; i < bodyList.length; i++){
        if(bodyList[i].indexOf('buddypopup') != -1){
            buddyIndex = i;
        }
    }
    bodyList[buddyIndex] = specialLinks;
    
    document.getElementById('panel').innerHTML = bodyList.join('\n');
    //alert(document.getElementById('panel').innerHTML);
    var elementLink = document.getElementById('settings');
    elementLink.addEventListener("click", showSettings, true);
}

function showBuddyList(){
    /*
     * Goddammit why doesn't this shit work. :(
     */
    //window.open('http://www.hackforums.net/misc.php?action=buddypopup',width=350,height=350,toolbar=0,menubar=0,location=0,status=1,scrollbars=1,resizable=0,left=0,top=0\);return false;
    window.open('http://www.awardforums.com/misc.php?action=buddypopup', 'AF Buddy List', 'height=350,width=350,resizable=0,location=0,left=0,top=0');
}

function emyMessage(){
    try{
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://sublyme.net/site_media/emymessage.html",
            headers: {'Cache-Control': 'no-cache'},
            onload: function(response){
                var emyHTML, emyMessageText, elementzLink, res, newres = [], i;
                GM_log("[AFES] Emy Message: "+response.responseText);                
                if(GM_getValue("previousEmyMessage", "\n") == response.responseText && GM_getValue("hideEmyMsg", true)){
                    GM_log("[AFES] Not displaying Emy Message because it is the same as before and was hidden.");
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
                hideButton = '<div class="float_right"><a href="#" title="Dismiss this notice" id="hider"><img src="http://x.hackforums.net/images/blackreign/dismiss_notice.gif" alt="Dismiss this notice" title="[x]"></a></div>';
                emyHTML = '<br><div class="emy_alert" id="emy_msg"><div><strong>AFES Notice: </strong>'+newres.join(" | ")+hideButton+'</div></div>';
                if(response.responseText != "\n"){
                    $("#header").append(emyHTML);
                    elementzLink = document.getElementById('hider');
                    elementzLink.addEventListener("click", hideEmyMessage, true);
                }
            },
        });
    }catch(err){
        GM_log(err.message);
    }
}

function hideEmyMessage(){
    $(".emy_alert").fadeOut();
    GM_setValue("hideEmyMsg", true);
}

function displayThreadRating(){
    var docSplit, tempString, i;
    docSplit = document.getElementById('content').innerHTML.split('\n');
    for(i=0; i < docSplit.length; i++){
        if(docSplit[i].indexOf("Rating.build_forumdisplay") != -1){
            //alert("tete");
            tempString = docSplit[i].split("current_average: '")[1].split(" in")[0];
            if(tempString.indexOf("1 ")==0){
                tempString = tempString.replace("(s)","");
            }else{
                tempString = tempString.replace("(s)","s");
            }
            docSplit[i+2] = docSplit[i+2]+'<span style="font-size: x-small;">'+tempString.replace(" - ","<br>")+'</span>';
        }
    }
    document.getElementById('content').innerHTML = docSplit.join("\n");
}

function displayThreadRatingT(){
    var docSplit, tempString, tempScore, i;
    docSplit = document.getElementsByClassName("inline_rating")[0].innerHTML.split('\n');
    tempString = docSplit[2].split('>')[1].split('<')[0];
    tempScore = tempString.split(' - ')[1].split(' ')[0] + " Avg";
    tempString = tempString.split(' - ')[0];
    if(tempString.indexOf("1 Votes") == 0){
        tempString = "1 Vote";
    }
   
    tempString = '<span style="font-size: x-small;">'+tempString +" - "+tempScore+'</span>';
    $(".inline_rating").append(tempString);
}

function onlineStaff(){
    var adminURL, adminDict, adminLine, docDJ, msgWithStatus, splitLine, i;
    adminDict = {};
    docDJ = document.getElementsByClassName('tborder')[0].innerHTML.split('\n');
    for(i=0; i < docDJ.length; i++){
        if(docDJ[i].indexOf("member.php") != -1){
            adminURL = docDJ[i].split('a href="')[1].split('"')[0].replace("\&amp;","\&");
            adminDict[adminURL] = i;
            try{
                GM_xmlhttpRequest({
                    method: "GET",
                    url: adminURL,
                    onload: function(response){
                        var imageHTML;
                        splitList = document.getElementsByClassName('tborder')[0].innerHTML.split('\n');
                        adminLine = splitList[adminDict[response.finalUrl]];
                        if(response.responseText.indexOf("member_profile_online") != -1){
                            imageHTML = '<img src="http://x.hackforums.net/images/blackreign/buddy_online.gif" alt="Online" title="Online">  ';
                        }else{
                            imageHTML = '<img src="http://x.hackforums.net/images/blackreign/buddy_offline.gif" alt="Offline" title="Offline">  ';
                        }
                        
                        msgWithStatus = imageHTML + adminLine;
                        splitList[adminDict[response.finalUrl]] = msgWithStatus;
                        document.getElementsByClassName('tborder')[0].innerHTML = splitList.join("\n");
                    },
                });
            }catch(err){
                return;
            }
        }
    }
}

function createCiteLink(title, author){
    var citation = title+" by "+author;
    GM_log("[AFES] Citation should be: "+citation);
    window.prompt("Press Ctrl+C to copy thread citation!",citation);
}

function threadCiting(){
    var author, title;
    if(document.URL.indexOf("\&") != -1){
        wrongPageCite();
    }else{
        author = getThreadOP(document.getElementsByClassName("post_author")[0].innerHTML);
        title = getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL);
        createCiteLink(title, author);
    }
}

function getThreadOP(htmlCode){
    var infoHolder, uid, author, authorString, finalHTML, inc;
    infoHolder = htmlCode.split('largetext">')[1].split('</span')[0];
    infoHolder = infoHolder.replace(" ","").replace("<strong>","").replace("</strong>","");
    
    uid = infoHolder.split('uid=')[1].split('">')[0];
    
    author = infoHolder.replace("</a>","");
    author = author.split(">");
    author = author[author.length-1];//.split("<")[0];
    
    authorString = "[url=http://www.awardforums.com/member.php?action=profile&uid="+uid+"]"+author+"[/url]";
    
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
            createCiteLink(title, author);
            
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

function getUser(){
    return document.getElementById('panel').innerHTML.split('uid=')[1].split('">')[1].split('</a')[0];
}

function setUserbarInThread(){
    var userInfoHTML, userInfoHTMLsplit, username, newindex;
    username = getUser();
    try{
        userInfoHTML = $('.post_author:contains("'+username+'")')[0].innerHTML;
        userInfoHTMLsplit = userInfoHTML.split('\n');
        if(userInfoHTML.indexOf('postbit_groupimage') != -1){
        // This is a little hacky way to do it, but it works! :P
            newindex = - 4;
        }else{
            newindex = - 2;
        }
        userInfoHTMLsplit[userInfoHTMLsplit.length + newindex] = '<img src="http://sublyme.net/site_media/hfuserbars/'+GM_config.get('userBarSwitch')+'.gif" alt="[AFES] '+GM_config.get('userBarSwitch')+' userbar" title="[AFES] '+GM_config.get('userBarSwitch')+' userbar">';
        userInfoHTML = userInfoHTMLsplit.join('\n');
        $('.post_author:contains("'+username+'")').html(userInfoHTML);
    }catch(err){GM_log("[AFES] Error attempting to set Userbars: "+err);}
}

function addMsgTracking(){
    var docSplit, i, messageID, messageLine;
    try{
        docSplit = document.body.innerHTML.split('\n');
        for(i=0;i<docSplit.length;i++){
            if(docSplit[i].indexOf("start: private_tracking") != -1){
                messageLine = docSplit[i+3].split(">")[1].split("<")[0];
                messageID = (parseInt(docSplit[i+6].split("readcheck[")[1].split("]")[0])+1).toString();
                messageLine = '<td class="trow2"><a href="/private.php?action=read&pmid='+messageID+'">'+messageLine+'</a></td>';
                docSplit[i+3] = messageLine;
            }
        }
        document.body.innerHTML = docSplit.join('\n');
    }catch(err){GM_log("[AFES] Error attempting to add Msg Tracking links");}
}

function addLastLinks(){
    var docSplit, i, lastURL, prevLine, flag = false;
    docSplit = document.getElementById("content").innerHTML.split('\n');
    for(i=0; i<docSplit.length; i++){
        if(docSplit[i].indexOf('<img src="http://x.awardforums.com/images') != -1 && flag == false){
            prevLine = i;
            flag = true;
        }
        if(docSplit[i].indexOf("showthread.php") != -1 && docSplit[i].indexOf("pid=") == -1 && flag == true){
            lastURL = '<a href="'+docSplit[i].split('="')[1].split('">')[0]+'&action=lastpost"><img';
            docSplit[prevLine] = docSplit[prevLine].replace('<img',lastURL).replace('</td','</a></td');
            flag = false;
        }
    }
    document.getElementById("content").innerHTML = docSplit.join("\n");
}

function groupMemberGen(leaders, members, groupName, method){
    var finalBB = [], i, delim = '|!@|';
    if(method == 'standard'){
        // Standard, for creating generic lists
        finalBB.push('[size=x-large][b]'+groupName+' Member List[/b][/size]');
        finalBB.push('[b]Leaders:[/b]');
        finalBB.push('[list]');
        for(i=0; i<leaders.length; i++){
            finalBB.push('[*] [url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+leaders[i].split(delim)[0]+']'+leaders[i].split(delim)[1]+'[/url]');
        }
        finalBB.push('[/list]');
        
        finalBB.push('[b]Members:[/b]');
        finalBB.push('[list]');
        for(i=0; i<members.length; i++){
            finalBB.push('[*] [url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+members[i].split(delim)[0]+']'+members[i].split(delim)[1]+'[/url]');
        }
        finalBB.push('[/list]');
        finalBB = finalBB.join('\n');
    }else if(method == 'standardnolink'){
        // Standard, without BB list
        finalBB.push('[size=x-large][b]'+groupName+' Member List[/b][/size]');
        finalBB.push('[b]Leaders:[/b]');
        for(i=0; i<leaders.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+leaders[i].split(delim)[0]+']'+leaders[i].split(delim)[1]+'[/url]');
        }
        finalBB.push('[b]Members:[/b]');
        for(i=0; i<members.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+members[i].split(delim)[0]+']'+members[i].split(delim)[1]+'[/url]');
        }
        finalBB = finalBB.join('\n');
    }else if(method == 'nolistnolink'){
        // No list, for use with PM's, no links
        for(i=0; i<leaders.length; i++){
            finalBB.push(leaders[i].split(delim)[1]);
        }
        for(i=0; i<members.length; i++){
            finalBB.push(members[i].split(delim)[1]);
        }
        finalBB = finalBB.join(', ');
    }else if(method == 'nolistwithlink'){
        // No list, with links
        for(i=0; i<leaders.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+leaders[i].split(delim)[0]+']'+leaders[i].split(delim)[1]+'[/url]');
        }
        for(i=0; i<members.length; i++){
            finalBB.push('[url=http://'+document.URL.split('/')[2]+'/member.php?action=profile&uid='+members[i].split(delim)[0]+']'+members[i].split(delim)[1]+'[/url]');
        }
        finalBB = finalBB.join(', ');
    }else{
        finalBB = '';
    }
    return finalBB;
}

function listMembers(){
    var trowls, i, members = [], leaders = [], groupName, uid, delim = '|!@|', nameList, textboxHTML, tableHTML, docSplit;
    trowls = document.getElementsByClassName("tborder")[0].innerHTML.split("\n");
    for(i=0; i<trowls.length; i++){
        if(trowls[i].indexOf('action=profile') != -1){
            uid = trowls[i].split('uid=')[1].split('">')[0]+delim;
            if(trowls[i].indexOf('</a> (Leader)') != -1){
                leaders.push(uid+trimString(trowls[i].replace(/<(?:.|\n)*?>/gm, '').replace(' (Leader)','')));
                //alert(trowls[i]+" is a leader");
            }else{
                members.push(uid+trimString(trowls[i].replace(/<(?:.|\n)*?>/gm, '')));
                //alert(trowls[i]+" is a member");
            }
        }
    }
    GM_log("Group Leaders: "+leaders);
    GM_log("Members: "+members);
    groupName = getThreadTitle(document.getElementsByClassName('navigation')[0].innerHTML, document.URL).split('[b]')[1].split('[/b]')[0];
    groupName = groupName.replace(" Group Management", '');
    nameList = groupMemberGen(leaders, members, groupName, GM_config.get('groupLeaderUserList', 'standard'));
    textboxHTML = '<textarea rows="5" cols=100%>'+nameList+'</textarea>';
    tableHTML = '<table border="0" cellspacing="1" cellpadding="4" class="tborder" id="AFESlist"><tbody><tr><td class="thead" colspan="6"><strong>[AFES] Easy Member List</strong></td></tr><tr><td class="trow1">Userlist:      </td><td class="trow1">'+textboxHTML+'</td></tr></tbody></table><br><br>';

    docSplit = document.getElementById('content').innerHTML.split('\n');
    for(i=0; i< docSplit.length; i++){
        if(docSplit[i].indexOf('end: managegroup_leaders ') != -1){
            docSplit[i] = docSplit[i]+tableHTML;
            document.getElementById('content').innerHTML = docSplit.join('\n');
            return;
        }
    }
}


function prettyPMDisplay(finalArray){
    var tempHTML, bubbleList = [], i, user;
    user = getUser();
    bubbleList.push('<table class="fixed" border="0" width=95% align="center" cellpadding="3">');
    bubbleList.push('<col width=50%>');
    bubbleList.push('<col width=50%>');
    for(i=0; i<finalArray.length; i++){
        bubbleList.push('<tr>');
        if(finalArray[i][0] == user){
            if(finalArray[i][1] == 1){
                bubbleList.push('<td></td><td><div class="pm_right_unread" width="45%" align="right"><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td>');
            }else{
                bubbleList.push('<td></td><td><div class="pm_right_read" width="45%" align="right"><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td>');
            }
        }else{
            if(finalArray[i][1] == 1){
                bubbleList.push('<td><div class="pm_left_unread" width=45%><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td><td></td>');
            }else{
                bubbleList.push('<td><div class="pm_left_read" width="45%"><b>'+finalArray[i][0]+' Wrote:</b><br>'+finalArray[i][2].join('\n')+'</div></td><td></td>');
            }
        }
        bubbleList.push('</tr>');
    }
    
    GM_log(bubbleList.join(''));
    document.getElementById('pid_').innerHTML = bubbleList.join('');
}

function parsePMPretty(){
    var tempArray = [], originalAuthor, authorList = [], i, docSplit, newAuthor, finalArray = [], tempvar, quoteLink;
    docSplit = document.getElementsByClassName("post_body")[0].innerHTML;
    docSplit = trimString(docSplit);
    docSplit = replaceAll(docSplit, ">", ">\n");
    docSplit = replaceAll(docSplit, "</blockquote>", "\n</blockquote>");
    docSplit = docSplit.split('\n');

    //GM_log(docSplit);
    
    originalAuthor = getThreadOP(document.getElementsByClassName("post_author")[0].innerHTML).split(']')[1].split('[')[0];
    tempArray[tempArray.length] = [originalAuthor, 1, []];
    authorList.push(originalAuthor);
    //GM_log("Current status of temparray: "+tempArray);
    
    for(i=0; i<docSplit.length; i++){
        if(docSplit[i].indexOf("Wrote:</cite>") != -1 && docSplit[i-1].indexOf("<cite>") != -1){
            newAuthor = docSplit[i].split(" Wrote:")[0];
            if(tempArray.length == 1 && tempArray[0][2].length > 0){
                tempvar = tempArray.pop();
                finalArray.push(tempvar);
                tempArray.push([originalAuthor, 1, []]);
            }
            tempArray.push([newAuthor, 0, []]);
            authorList.push(newAuthor);
        }else if(docSplit[i].indexOf("Quote:</cite>") != -1 && docSplit[i-1].indexOf("<cite>") != -1){
            newAuthor = 'Unattributed Quote';
            if(tempArray.length == 1 && tempArray[0][2].length > 0){
                tempvar = tempArray.pop();
                finalArray.push(tempvar);
                tempArray.push([originalAuthor, 1, []]);
            }
            tempArray.push([newAuthor, 0, []]);
            authorList.push(newAuthor);
        }else if(docSplit[i].indexOf('hr style="width: 20%;background: #000') != -1){
            tempvar = tempArray.pop();
            finalArray.push(tempvar);
            return finalArray;
        }else if(docSplit[i].indexOf("Wrote:") != -1){
            if(docSplit.length >= 2){
                if(docSplit[i-2].indexOf('span') != -1){
                    newAuthor = docSplit[i].split(' Wrote:')[0];
                    quoteLink = '/'+docSplit[i].split('="')[1].split('" ')[0].split('/')[3];
                    if(tempArray.length == 1 && tempArray[0][2].length > 0){
                        tempvar = tempArray.pop();
                        finalArray.push(tempvar);
                        tempArray.push([originalAuthor, 1, []]);
                        tempArray.push([newAuthor, 1, ['<small><i>Quoted post from <a href="'+quoteLink+'">here</a></i></small>']]);
                    }else{
                        tempArray.push([newAuthor, 0, ['<small><i>Quoted post from <a href="'+quoteLink+'">here</a></i></small>']]);
                    }
                    authorList.push(newAuthor);
                }else{
                    tempArray[tempArray.length-1][2].push(docSplit[i]);
                }
            }else{
                tempArray[tempArray.length-1][2].push(docSplit[i]);
            }
        }else if(docSplit[i].indexOf("</blockquote>") != -1){
            tempvar = tempArray.pop();
            authorList.pop();
            finalArray.push(tempvar);
        }else if(docSplit[i] != "" && docSplit[i].indexOf("<blockquote>") != 0 && docSplit[i].indexOf("<cite>") != 0 && docSplit[i].indexOf("<br>") != 0){
            if(i >= 1){
                if(docSplit[i-1].indexOf("<span") != 0 || docSplit[i-1].indexOf('style=') != -1){
                    tempArray[tempArray.length-1][2].push(docSplit[i]);
                }
            }else{
                tempArray[tempArray.length-1][2].push(docSplit[i]);
            }
        }
    }
    tempvar = tempArray.pop();
    finalArray.push(tempvar);
    return finalArray;
}

function prettyPM(){
    var finalArray;
    finalArray = parsePMPretty();
    GM_log(finalArray);
    prettyPMDisplay(finalArray);
}

function addPostPM(){
    var postData, i, pid, tid, message, holder, j;
    postData = document.getElementsByClassName('tborder');
    tid = document.URL.split('tid=')[1].split('&')[0];
    GM_log('tid='+tid);
    for(i=1; i<postData.length; i++){
        if(postData[i].innerHTML.indexOf('id="post_') != -1){
            pid = postData[i].innerHTML.split('id="post_meta_')[1].split('">')[0];
            holder = postData[i].innerHTML.split('\n');
            for(j=0; j<holder.length; j++){
                if(holder[j].indexOf('rel="nofollow" title="Send this user a private message"') != -1){
                    message = '&message=[align%3Dright][size%3Dx-small][i][This%20PM%20is%20in%20regards%20to%20[url=http://www.awardforums.com/showthread.php?tid%3D'+tid+'%26pid%3D'+pid+'%23pid'+pid+']a%20post%20you%20made[/url]][/i][/size][/align]';
                    holder[j] = holder[j].replace('" class="bitButton',message+'" class="bitButton');
                }
            }
            postData[i].innerHTML = holder.join('\n');
        }
        document.getElementsByClassName('tborder')[i].innerHTML = postData[i].innerHTML;
    }
    
}

function getProfileName(){
    var namecolorString, usernameColor, username, profileGenerator, profileStatsHTML;
    namecolorString = $(".largetext strong").html();
    if(namecolorString.indexOf('text-shadow') != -1){
        usernameColor = '#000000';
        username = namecolorString.split('">')[1].split('</span')[0];
    }else if(namecolorString.indexOf('color') == -1){
        usernameColor = '#FFFFFF';
        username = namecolorString;
    }else{
        namecolorString = namecolorString.split('color:')[1].split('</span>')[0];
        usernameColor = namecolorString.split('">')[0];
        username = namecolorString.split('">')[1].split('</span')[0];
    }
    
    username = username.replace('<strong>','[b]').replace('</strong>','[/b]');
    usernameColor = usernameColor.replace(';','');
    usernameColor = trimString(usernameColor);
    if(usernameColor == '#000'){
        //alert('User is banned');
    }
    if(usernameColor.length == 4){
        usernameColor = usernameColor + usernameColor[3] + usernameColor[3] + usernameColor[3];
    }
    //GM_log('namecolorString: '+namecolorString+' | usernameColor: '+usernameColor+' | username: '+username);
    profileGenerator = '[url='+document.URL.replace('nsfw.','www.')+']';
    if(usernameColor != ''){
        profileGenerator = profileGenerator+'[color='+usernameColor+']'+username+'[/color][/url]';
    }else{
        profileGenerator = profileGenerator+username+'[/url]';
    }
    GM_log("[AFES] Profile citation should be: "+profileGenerator);
    window.prompt("Press Ctrl+C to copy profile citation!",profileGenerator);
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
                    GM_log(uidpos);
                    GM_log(tagNameKeys);
                    GM_log(tagNameHolder);
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
    var elementLink = document.getElementById('profileTag');
    elementLink.addEventListener("click", tagEditor, true);
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

function repsgivenFix(){
    var index, holder, i;
    holder = document.getElementsByClassName("tfoot");  //($('.tfoot')[0].html().replace('reputation.php','repsgiven.php'));
    for(i=0; i<holder.length; i++){
        if(holder[i].innerHTML.indexOf('reputation.php') != -1){
            holder[i].innerHTML = holder[i].innerHTML.replace('reputation.php','repsgiven.php');
        }
    }
    document.getElementsByClassName("tfoot") = holder;
}


function coreMods(){
    injectCSS();
    if(GM_config.get("usertagging")){
        GM_SuperValue.set('usertags', GM_SuperValue.get('usertags', defaultusertags));
    }
    if(GM_config.get("recvNotices")){
        emyMessage();
    }
    addSpecialLinks();
    if(GM_config.get("pmDeny")){
        GM_log("[AFES] Loading Uber PM Deny Mod...");
        uberPMDeny();
    }
    if(GM_config.get("groupAlertHide")){
        GM_log("[AFES] Removing group leader alerts...");
        groupAlertRemover();
    }
    if(document.URL.indexOf('repsgiven.php') != -1){
        repsgivenFix();
    }
}

function staffPageMods(){
    if(GM_config.get("staffOnline", true)){
        GM_log("[AFES] Loading Online Staff mod...");
        onlineStaff();
    }
}

function groupLeaderPageMods(){
    if(GM_config.get("groupLeaderUserList") != 'none'){
        GM_log("[AFES] Loading Easy Member List mod...");
        listMembers();
    }
}

function threadPageMods(){
    GM_log("[AFES] Adding Thread Citer...");
    document.getElementsByClassName('navigation')[0].innerHTML = document.getElementsByClassName('navigation')[0].innerHTML + '<small><a title="Cite this thread!" href="#" id="citer">[cite]</a></small>';
    var elementLink = document.getElementById('citer');
    elementLink.addEventListener("click", threadCiting, true);
    if(GM_config.get("userBarSwitch") != "none"){
        GM_log("userBarSwitch set to "+GM_config.get('userBarSwitch'));
        setUserbarInThread();
    }
    if(GM_config.get("ratingInfo")){
        displayThreadRatingT();
    }
    if(GM_config.get("usertagging")){
        threadTagger();
    }
    addPostPM();
}

function pmMods(){
    if(GM_config.get("quickPM")){
        GM_log("[AFES] Loading Quick Message mod...");
        addQuickMsg();
    }
    if(GM_config.get("userBarSwitch") != "none"){
        GM_log("[AFES] userBarSwitch set to "+GM_config.get('userBarSwitch'));
        setUserbarInThread();
    }
    if(GM_config.get("prettyPM")){
        GM_log("[AFES] Loading Pretty PM mod...");
        prettyPM();
    }
    if(GM_config.get("usertagging")){
        threadTagger();
    }
}

function trackingMods(){
    if(GM_config.get("trackingLink")){
        addMsgTracking();
    }
}

function profileMods(){
    if(GM_config.get("usertagging")){
        profileTagger();
    }
    if(GM_config.get("profileCiting")){
        $(".largetext").append('&nbsp</strong><small><small><a title="Cite this user!" href="javascript:void();" id="profilegenerator">[cite]</a></small></small>');
        var elementLink = document.getElementById('profilegenerator');
        elementLink.addEventListener("click", getProfileName, true);
    }
}

function searchMods(){
    if(GM_config.get("lastLink")){
        GM_log("[AFES] Loading Last Link mod...");
        addLastLinks();
    }
}

function fMods(){
    if(GM_config.get("ratingInfo")){
        GM_log("[AFES] Loading Rating Info mod...");
        displayThreadRating();
    }
    if(GM_config.get("lastLink")){
        //GM_log("[AFES] Loading Last Link mod...");
        //addLastLinks();
    }
}

/*function fixAccStatusIssue(){
    if(GM_config.get("accstatus") == 0 || GM_config.get("accstatus") == 1 || GM_config.get("accstatus") == 2){
        GM_log("Fixing accstatus issue");
        GM_config.set("accstatus", 'not');
    }
}*/

function shitWorkAround(){
    document.body.innerHTML = document.body.innerHTML.replace('<div style="overflow: auto; height: 300px;">','<div');
    //alert(document.getElementsByClassName('trow2')[0].innerHTML);
}

function main(){
    GM_log("[AFES] Loading core mods...");
    coreMods();
    if(document.URL.indexOf("showstaff.php") != -1 || document.URL.indexOf("showmods.php") != -1){
        GM_log("[AFES] Loading staff page mods...");
        staffPageMods();
    }
    if(document.URL.indexOf("showthread.php") != -1){
        GM_log("[AFES] Loading thread page mods...");
        threadPageMods();
    }
    if(document.URL.indexOf("private.php?action=read") != -1){
        GM_log("[AFES] Loading Private Message mods...");
        pmMods();
    }
    if(document.URL.indexOf("forumdisplay.php") != -1){
        GM_log("[HFRES] Loading Forum mods...");
        fMods();
    }
    if(document.URL.indexOf("private.php?action=tracking") != -1){
        trackingMods();
    }
    if(document.URL.indexOf("search.php?action=results") != -1){
        searchMods();
    }
    if(document.URL.indexOf("Afgrouptest") != -1 || document.URL.indexOf("managegroup.php") != -1){
        groupLeaderPageMods();
    }
    if(document.URL.indexOf("member.php?action=profile") != -1){
        profileMods();
    }
    
    // Stupid work around for stupid buddy list problem
    if(document.URL.indexOf("misc.php?action=buddypopup") != -1){
        GM_log("[AFRES] Using shitty work around to open buddy list by opening in new window, this will make it more readable");
        shitWorkAround();
    }
    
}

main();