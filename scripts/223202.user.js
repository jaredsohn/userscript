// ==UserScript==
// @name        Ajaxchat Mod
// @namespace   http://userscripts.org/users/545752
// @description Adds window features for handling whispers.  Requires AjaxChat Mod and Jquery UI
// @include     http://www.filipinosexstories.com/chat*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     2.5
// @grant       unsafeWindow
// ==/UserScript==
window.addEventListener("load", function(){
setTimeout(init,5000);
}, false);
function attachdblclick()
{
    $("span.user").css("cursor","pointer");
    $("span.user").dblclick(function(){
        var nm = $(this).html();
        addtab(escape(nm),"whisper"+nm);
    });
}
function whisperbox(cwith)
{
    if ($("#whisper"+cwith).length)
    {
    }
    else {
    $("#chattabs").after('<div id="whisper'+cwith+'" class="whisperbox" style="border-style: solid;  border-color:#105289; border-width: 1px; background-color: #FFFFFF; display: none;  left: 20px;   position: absolute; right:205px; top:70px; bottom:96px">...with '+cwith+'</div>');
    }
    
}

function addtab(userid,title, targetid)
{
    if ($("#tab"+userid).length)
    {
        $("#tab"+userid+" a.tabname").click();
    }
    else {
    $("#chattabs").append('<span class="chattab" id="tab'+userid+'"><a class="tabname" href="#">'+title+'</a></span>' );
    if (title != 'Main') $("#tab"+userid).append(' <a href="#" class="closewhisper"><img src="img/delete.png" /></a>');
    $("#tab"+userid+" a.tabname").click(function(){
        activatetab(targetid,userid);
        
    });
    $("#tab"+userid+" a.closewhisper").click(function(){
        closewhisper(userid);
        $("#"+targetid).hide();
    });
    $(".chattab").css("border","1px solid #CCCCCC");
    $(".chattab").css("padding","5px");
    
    }
    whisperbox(userid);
}
function closewhisper(cwith)
{
    $("#tab"+cwith).remove();
    $(".chattab a.tabname").click();
}
function activatetab(tabid,el)
{
    activetab = el;
    $(".chattab").removeClass('activetab');
    $("#tab" + el).addClass('activetab');
    $("#tab" + el).removeClass('newmessage');
    $(".whisperbox").hide();
    $("#"+tabid).show();
     $("#"+tabid).scrollTop($("#"+tabid)[0].scrollHeight);
}
var activetab = 0;
var usermatrix = new Array();
var pmtabclass = new Array();

function hooks()
{
var d = unsafeWindow;
var oldhou =  d.ajaxChat.handleOnlineUsers;
d.ajaxChat.customCommandPrivMsg= function(text) {
        var textParts = text.split(' ');
        if (textParts[0] == '/privmsgto')
            {
                var privMsgText = textParts.slice(2).join(' ');
            }
        else var privMsgText = textParts.slice(1).join(' ');
        privMsgText = this.replaceBBCode(privMsgText);
        privMsgText = this.replaceHyperLinks(privMsgText);
        privMsgText = this.replaceEmoticons(privMsgText);
        privMsgText = this.breakLongWords(privMsgText);
        privMsgText = this.replaceCustomText(privMsgText);
        return privMsgText;
    };
d.ajaxChat.customMessageString = function(dateObject, userID, userName, userRole, messageID, messageText, channelID, ip) {
    var rowClass = pmtabclass["whisper"+userID];
    var userClass = this.getRoleClass(userRole);

	var colon;
    if(messageText.indexOf('/action') == 0 || messageText.indexOf('/me') == 0 || messageText.indexOf('/privaction') == 0) {
        userClass += ' action';
        colon = ' ';
    } else {
        colon = ': ';
    }

    var dateTime = this.settings['dateFormat'] ? '<span class="dateTime">'
        + this.formatDate(this.settings['dateFormat'], dateObject) + '</span> ' : '';

	var userMsgColor = '#000';
	if (userName.indexOf('|f') > 0) {
		var userMsgColor = '#800080';
	}
	else if (userName.indexOf('|m') > 0) {
		var userMsgColor = '#00f';
	}
	else if (userName.indexOf('|l') > 0 || userName.indexOf('|g') > 0 || userName.indexOf('|b') > 0 || userName.indexOf('|t') > 0) {
		var userMsgColor = '#696969';
	}

    return	'<div id="'
        + this.getMessageDocumentID(messageID)
        + '" class="'
        + rowClass
        + '">'
        + this.getDeletionLink(messageID, userID, userRole, channelID)
        + this.getProfilePicture(userID)
        + '<p style="margin-top: 0; margin-bottom: 3px;">'
        + dateTime
        + '<br />'
        + '<span style="vertical-align: top;" class="'
        + userClass
        + '"'
        + this.getChatListUserNameTitle(userID, userName, userRole, ip)
        + ' dir="'
        + this.baseDirection
        + '" onclick="ajaxChat.insertText(this.firstChild.nodeValue);">'
        + this.getParseUserName(userName)
        + '</span>'
        + '<span style="vertical-align: top;">' + colon + '</span>'
	    + '<span style="color: ' + userMsgColor + ';">'
        + this.customCommandPrivMsg(messageText)
	    + '</span>'
        + '</p>'
        + '</div>';
        
};
d.ajaxChat.updateChatlistView = function() {
        if(this.dom['chatList'].childNodes && this.settings['maxMessages']) {
            while(this.dom['chatList'].childNodes.length > this.settings['maxMessages']) {
                this.dom['chatList'].removeChild(this.dom['chatList'].firstChild);
            }
        }

        if(this.settings['autoScroll']) {
            this.dom['chatList'].scrollTop = this.dom['chatList'].scrollHeight;
        }
    };
d.ajaxChat.addMessageToChatList= function(dateObject, userID, userName, userRole, messageID, messageText, channelID, ip) {
        // Prevent adding the same message twice:
        if(this.getMessageNode(messageID)) {
            return;
        }
        if(!this.onNewMessage(dateObject, userID, userName, userRole, messageID, messageText, channelID, ip)) {
            return;
        }
        var targetuid = userID;
        if(messageText.indexOf('/privmsgto') == 0)
        {
            var mt = messageText.split(" ");
            var umt = mt[1];
            var targetuid = usermatrix[umt];
        }
        if(messageText.indexOf('/privmsg') == 0)
        {
            var targetwindow = 'whisper'+targetuid;
            
            pmtabclass[targetwindow] = pmtabclass[targetwindow] == 'rowEven' ? 'rowOdd' : 'rowEven';
            var pmsg = this.customMessageString(dateObject, userID, userName, userRole, messageID, messageText, channelID, ip);
            console.log(pmsg);
            if ($("#"+targetwindow).length)
            {
            $("#"+targetwindow).append(pmsg);
            
            }
            else {
                var lname = usermatrix[targetuid];
                var ls = lname.split("|");
                targettitle = ls[0];
                addtab(targetuid,targettitle,targetwindow);
                $("#"+targetwindow).append(pmsg);
                }
            if (targetuid != activetab) {
                $("#tab"+targetuid).addClass("newmessage");
            }
           if(this.settings['autoScroll']) $("#"+targetwindow).scrollTop($("#"+targetwindow)[0].scrollHeight);
        }
        //console.log(targetwindow);
        this.DOMbufferRowClass = this.DOMbufferRowClass == 'rowEven' ? 'rowOdd' : 'rowEven';
        this.DOMbuffer = this.DOMbuffer +
            this.getChatListMessageString(
                dateObject, userID, userName, userRole, messageID, messageText, channelID, ip
            );
        if(!this.DOMbuffering){
            this.updateDOM('chatList', this.DOMbuffer);
            this.DOMbuffer = "";
        }
        
    };
d.ajaxChat.sendMessage = function(text) {
        
        text = text ? text : this.dom['inputField'].value;
        if(!text) {
            return;
        }
        if (activetab != 0)
        {
            text = '/msg '+usermatrix[activetab]+' '+text;
        }
        text = this.parseInputMessage(text);
        if(text) {
            clearTimeout(this.timer);
            var message = 	'lastID='
                + this.lastID
                + '&text='
                + this.encodeText(text);
            this.makeRequest(this.ajaxURL,'POST',message);
        }
        this.dom['inputField'].value = '';
        this.dom['inputField'].focus();
        this.updateMessageLengthCounter();
    };
d.ajaxChat.handleOnlineUsers = function(userNodes) {
        if(userNodes.length) {
            var index,userID,userName,userRole;
            var onlineUsers = new Array();
            for(var i=0; i<userNodes.length; i++) {
                
                userID = userNodes[i].getAttribute('userID');
                userName = userNodes[i].firstChild ? userNodes[i].firstChild.nodeValue : '';
                userRole = userNodes[i].getAttribute('userRole');
                usermatrix[userID] = userName;
                usermatrix[userName] = userID;
                onlineUsers.push(userID);
                index = this.arraySearch(userID, this.usersList);
                if(index === false) {
                    this.addUserToOnlineList(
                        userID,
                        userName,
                        userRole
                    );
                    if ($("#entex").prop('checked') == true) entered(userName);
                    resort();
                } else if(this.userNamesList[index] != userName) {
                    this.removeUserFromOnlineList(userID, index);
                    this.addUserToOnlineList(
                        userID,
                        userName,
                        userRole
                    );
                    resort();
                }
            
            }
            // Clear the offline users from the online users list:
            for(var i=0; i<this.usersList.length; i++) {
                if(!this.inArray(onlineUsers, this.usersList[i])) {
                    this.removeUserFromOnlineList(this.usersList[i], i);
                    
                }
            }
            this.setOnlineListRowClasses();
            users_monitor(onlineUsers.length);
            if ($("#entex").prop('checked') == true) {
                $(".modnotice").show();
                }
            else {
                $(".modnotice").hide();
                
            }
        }
        //console.log("test");
        //attachdblclick();
        $("#onlineList div a.user").off("dblclick");
        $("#onlineList div a.user").dblclick(function(){
               var nm = $(this).html();
               var piid = $(this).parent()[0].id;
               var nuid = getidfromparent(piid);
          addtab(nuid,escape(nm),"whisper"+nuid);
          activatetab("whisper"+nuid,nuid);
       });
    };
}
function getidfromparent(stp)
{
    var stret = stp.split("_");
    return stret[2];
}
function addstyles()
{
    $("head").append('<style>.chattab {border: 1px solid #000;padding: 5px;margin-right: 2px;cursor:pointer}'
            + ' .chattab.newmessage a {color: green !important}'
            + ' .whisperbox {overflow: auto !important}'
            + ' .chattab.activetab a {color: #105289 !important;font-weight: bold;}</style>');
        
}
function entered(n)
{
    if(n)
    {
   var mess = thedate() + " " + n + " Entered the room";
   $("#chatList").append("<div class=\"modnotice\"><i>"+mess+"</i></div>"); 
    $("#chatList").scrollTop($("#chatList")[0].scrollHeight);
   }
}
function leftroom(n)
{
    if (n)
    {
    var mess = thedate() + " " +n + " Left the room";
    $("#chatList").append("<div class=\"modnotice\"><i>"+mess+"</i></div>");
    }
}
function resort()
{
  $("#onlineList > div").tsort('img',{attr:'title'},'a.user');
}
function users_monitor(ol)
    {
            $("#onlineuserscount").html(ol);
    }
function thedate()
{
var currentdate = new Date(); 
var datetime = currentdate.getFullYear() + "-" 
                + (currentdate.getMonth()+1)  + "-"
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":" 
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();
return datetime;
}
function init()
{

 addstyles();
    var ol = $("#onlineList div").length;
    
    var olc = $("#onlineListContainer h3");
    olc_html = olc.html();
    olc.html(olc_html + '(<span id="onlineuserscount">'+ol+'</span>)');
    var opt =  $("#channelContainer");
    opt.append("<input type=\"checkbox\" id=\"entex\" name=\"entex\" value=\"entex\" checked=\"checked\" /> Exit/Entry Messages");
    $("#chatList").addClass("whisperbox");
    
    $(".whisperbox").css("top","70px");
    $("#channelContainer").after('<div id="chattabs" style="left: 20px; position: absolute; right:205px; top:43px; height:27px"></div>');
    addtab('0','Main','chatList');
    
    $("#tab0").addClass('activetab');
    attachdblclick();
    hooks();
}

/*! TinySort 1.5.6
* Copyright (c) 2008-2013 Ron Valstar http://tinysort.sjeiti.com/
* License:
*     MIT: http://www.opensource.org/licenses/mit-license.php
*     GPL: http://www.gnu.org/licenses/gpl.html
*/
!function(a,b){"use strict";function c(a){return a&&a.toLowerCase?a.toLowerCase():a}function d(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]==b)return!e;return e}var e=!1,f=null,g=parseFloat,h=Math.min,i=/(-?\d+\.?\d*)$/g,j=/(\d+\.?\d*)$/g,k=[],l=[],m=function(a){return"string"==typeof a},n=function(a,b){for(var c,d=a.length,e=d;e--;)c=d-e-1,b(a[c],c)},o=Array.prototype.indexOf||function(a){var b=this.length,c=Number(arguments[1])||0;for(c=0>c?Math.ceil(c):Math.floor(c),0>c&&(c+=b);b>c;c++)if(c in this&&this[c]===a)return c;return-1};a.tinysort={id:"TinySort",version:"1.5.6",copyright:"Copyright (c) 2008-2013 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licensed:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},plugin:function(){var a=function(a,b){k.push(a),l.push(b)};return a.indexOf=o,a}(),defaults:{order:"asc",attr:f,data:f,useVal:e,place:"start",returns:e,cases:e,forceStrings:e,ignoreDashes:e,sortFunction:f}},a.fn.extend({tinysort:function(){var p,q,r,s,t=this,u=[],v=[],w=[],x=[],y=0,z=[],A=[],B=function(a){n(k,function(b){b.call(b,a)})},C=function(a,b){return"string"==typeof b&&(a.cases||(b=c(b)),b=b.replace(/^\s*(.*?)\s*$/i,"$1")),b},D=function(a,b){var c=0;for(0!==y&&(y=0);0===c&&s>y;){var d=x[y],f=d.oSettings,h=f.ignoreDashes?j:i;if(B(f),f.sortFunction)c=f.sortFunction(a,b);else if("rand"==f.order)c=Math.random()<.5?1:-1;else{var k=e,o=C(f,a.s[y]),p=C(f,b.s[y]);if(!f.forceStrings){var q=m(o)?o&&o.match(h):e,r=m(p)?p&&p.match(h):e;if(q&&r){var t=o.substr(0,o.length-q[0].length),u=p.substr(0,p.length-r[0].length);t==u&&(k=!e,o=g(q[0]),p=g(r[0]))}}c=d.iAsc*(p>o?-1:o>p?1:0)}n(l,function(a){c=a.call(a,k,o,p,c)}),0===c&&y++}return c};for(p=0,r=arguments.length;r>p;p++){var E=arguments[p];m(E)?z.push(E)-1>A.length&&(A.length=z.length-1):A.push(E)>z.length&&(z.length=A.length)}for(z.length>A.length&&(A.length=z.length),s=z.length,0===s&&(s=z.length=1,A.push({})),p=0,r=s;r>p;p++){var F=z[p],G=a.extend({},a.tinysort.defaults,A[p]),H=!(!F||""===F),I=H&&":"===F[0];x.push({sFind:F,oSettings:G,bFind:H,bAttr:!(G.attr===f||""===G.attr),bData:G.data!==f,bFilter:I,$Filter:I?t.filter(F):t,fnSort:G.sortFunction,iAsc:"asc"==G.order?1:-1})}return t.each(function(c,d){var e,f=a(d),g=f.parent().get(0),h=[];for(q=0;s>q;q++){var i=x[q],j=i.bFind?i.bFilter?i.$Filter.filter(d):f.find(i.sFind):f;h.push(i.bData?j.data(i.oSettings.data):i.bAttr?j.attr(i.oSettings.attr):i.oSettings.useVal?j.val():j.text()),e===b&&(e=j)}var k=o.call(w,g);0>k&&(k=w.push(g)-1,v[k]={s:[],n:[]}),e.length>0?v[k].s.push({s:h,e:f,n:c}):v[k].n.push({e:f,n:c})}),n(v,function(a){a.s.sort(D)}),n(v,function(a){var b=a.s,c=a.n,f=b.length,g=c.length,i=f+g,j=[],k=i,l=[0,0];switch(G.place){case"first":n(b,function(a){k=h(k,a.n)});break;case"org":n(b,function(a){j.push(a.n)});break;case"end":k=g;break;default:k=0}for(p=0;i>p;p++){var m=d(j,p)?!e:p>=k&&k+f>p,o=m?0:1,q=(m?b:c)[l[o]].e;q.parent().append(q),(m||!G.returns)&&u.push(q.get(0)),l[o]++}}),t.length=0,Array.prototype.push.apply(t,u),t}}),a.fn.TinySort=a.fn.Tinysort=a.fn.tsort=a.fn.tinysort}(jQuery);


