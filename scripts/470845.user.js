// ==UserScript==
// @name       Guild List in SC Beta Chat
// @description	Work in progress for showing Guild Tags
// @namespace  http://www.elfindreams.com
// @version    1.4.2
// @include		https://robertsspaceindustries.com/community/rsi-chat
// @include		https://robertsspaceindustries.com/community/rsi-chat/popout
// @include             https://robertsspaceindustries.com/orgs/*/chat
// @include             https://robertsspaceindustries.com/orgs/*/chat/popout
// ==/UserScript==

GuildList = {};

function getGuildList(user) {
	$.get ("https://robertsspaceindustries.com/citizens/" + user, function ( data ) { 
	  	if(data.match(/ href="\/orgs\/([^"]+)"/)) {
			GuildList[user]=data.match(/ href="\/orgs\/([^"]+)"/)[1]; 
		} else {
			GuildList[user]="none";
		}
    if(!$("#record-"+user).length) {
    	UserRecord = data.replace(/(\r\n|\n|\r)/gm,"").match(/<div class="content-section">(.*)<\/div> *<div class="bottom-section">/)[1];
    	UserRecordTitle = data.match(/UEE CITIZEN RECORD #[0-9]+/);
  		$("body").append ('<div id="record-'+user+'" class="account-profile"><h2>'+UserRecordTitle+'</h2><div class="content-section">'+UserRecord+'</div></div>');  	      
    }
	});
}

OldCandyUpdate = Candy.View.Pane.Roster.update;
Candy.View.Pane.Roster.update=function(roomJid,user,action,currentUser){
	OldCandyUpdate(roomJid,user,action,currentUser);
	getGuildList(user.getNick());
};


$(Candy).on('candy:view.message.before-show', function(evt, args) {
	if ( GuildList[args.name] == null || GuildList[args.name] == "none" ) { getGuildList(args.name); }
	if (GuildList[args.name] == null) {
		args.message = '<a target="_blank" href="https://forums.robertsspaceindustries.com/messages/add/' + args.name + '">&#x2709;</a> [...] ' + args.message;
	} else {
		args.message = '<a target="_blank" href="https://forums.robertsspaceindustries.com/messages/add/' + args.name + '">&#x2709;</a> [<a target="_blank" href="/orgs/' + GuildList[args.name] + '">' + GuildList[args.name] + "</a>] " + args.message;
	}
});

$(Candy).on('candy:view.message.after-show', setPopper);

// Thanks to http://www.sundoginteractive.com/sunblog/posts/jquery-hover-box 
function setPopper() {
    var moveLeft = 0;
    var moveDown = 0;
    $('a.name.label').hover(function(e) {
   
        var target = '#record-' + ($(this).text());
         
        $(target).show();
        moveLeft = $(this).outerWidth();
        moveDown = ($(target).outerHeight() / 2);
    }, function() {
        var target = '#record-' + ($(this).text());
        $(target).hide();
    });
 
    $('a.name.label').mousemove(function(e) {
        var target = '#record-' + ($(this).text());
         
        leftD = e.pageX + parseInt(moveLeft);
        maxRight = leftD + $(target).outerWidth();
        windowLeft = $(window).width() - 40;
        windowRight = 0;
        maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);
         
        if(maxRight > windowLeft && maxLeft > windowRight)
        {
            leftD = maxLeft;
        }
     
        topD = e.pageY - parseInt(moveDown);
        maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
        windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
        maxTop = topD;
        windowTop = parseInt($(document).scrollTop());
        if(maxBottom > windowBottom)
        {
            topD = windowBottom - $(target).outerHeight() - 20;
        } else if(maxTop < windowTop){
            topD = windowTop + 20;
        }
     
        $(target).css('top', topD).css('left', leftD);
     
     
    });
} 

$(function (){setPopper();});

GM_addStyle ('.account-profile {display: none; position: absolute; z-index: 99999; width: 1050px; padding: 10px; background: #EEEFEB; color: #000000; border: 1px solid #4D4F53; margin: 0px; -webkit-box-shadow: 0px 0px 5px 0px rgba(164, 164, 164, 1); box-shadow: 0px 0px 5px 0px rgba(164, 164, 164, 1); }');
GM_addStyle ('.account-profile h2 {background-color: #4D4F53; color:  #E3E5DD; font-size: 14px; display: block; width: 100%; margin: -10px 0px 8px -10px; padding: 5px 10px; }');
