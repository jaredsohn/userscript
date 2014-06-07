// ==UserScript==
// @id             www.linux.org.ru-2ch-style@scriptish
// @name           LOR 2ch-style
// @version    0.1
// @author         
// @description    enter something useful
// @match      http://www.linux.org.ru/*
// @match      https://www.linux.org.ru/*
// @namespace http://www.linux.org.ru/*
// @namespace https://www.linux.org.ru/*
// @include http://www.linux.org.ru/*
// @include https://www.linux.org.ru/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.js
// @run-at         document-end
// ==/UserScript==

(function () {

//
// Settings
//
var timeoutOnShow = 500;
var timeoutOnHide = 300;
//


var locationurl = $(location).attr("href").replace(/#.*$/, "");

var locatTimer = null;

var response = null;

var cleanTimer = function (){
    if (locatTimer){
        clearTimeout(locatTimer);
        locatTimer = null;
    }
};

var processMouseOut = function (msg){
    cleanTimer();
    locatTimer = setTimeout(function(){    
        locatTimer = null;
        $('.2ch_popup').remove(); 
    }, timeoutOnHide);
};

var processTimerOnShow = function (msg){
    cleanTimer();
    locatTimer = setTimeout(function(){    
        locatTimer = null;
        msg(); 
    }, timeoutOnShow);
};

var getMsgById = function (msgId){
    return $("#comment-" + msgId);
};

var getMsgIdByLink = function(element) {
    var msgId = null;
    var href = $(element).prop("href");
    var t = href.match(/comment-(\d+)/);
    if(t != null)
    {
        var msgId = t[1];
        if(msgId != null && msgId.length > 0)
        {
            return msgId;
        }
    }
        
    t = href.match(/.*[\?\&]?cid=(\d+).*/);
    if(t != null)
    {
        msgId = t[1];
    }
    return msgId;
};

var processLink = function (lnk, elem){
    msg = lnk.parents('article');
    showPopup(msg, elem);
};

var showPopup = function (msg, elem) {
    var msg_title = msg.find('.title');
    var msg_body = msg.find('.msg_body.message-w-userpic');
    var popup = null;
    if(msg_title.length > 0 && msg_body.length > 0)
    {
        popup = $('<div class="2ch_popup">' + '<div class="msg_title">' + msg_title.html()  + '</div>' + '<div class="msg_body">' + msg_body.html()   + '</div>' + '</div>');
    }
    else
    {
        popup = $('<div class="2ch_popup">' + msg.html() + '</div>');
    }
    popup.find('.hideon-phone').parent().remove();
    popup.find('div.msg_title > a').each(function (idx,elem){$(elem).mouseover(function(){processTimerOnShow(function(){processMouseOver(elem);});});})
                                                                    .mouseout(function(){cleanTimer();}).click(function(){cleanTimer();});
    popup.find('div.answers > a').each(function (idx,elem){$(elem).mouseover(function(){processTimerOnShow(function(){showPopup(getMsgById(getMsgIdByLink(elem)), elem);});});})
                                                                  .mouseout(function(){cleanTimer();}).click(function(){cleanTimer();});
    popup.mouseenter(function(){cleanTimer();}).mouseleave(function(){processMouseOut();});

    cleanTimer();
    
    $('body').remove('.2ch_popup');
               
    $(popup).css('z-index', '9999')
            .css('position', 'absolute')
            .css('top', ($(elem).offset().top+$(elem).height()+5)+'px')
            .css('left', ($(elem).offset().left+20)+'px')
            .css('background-color','#101010')
            .css('width', '600px')
            .css('border-radius', '5px')
            .css('border-width', '1px')
            .css('border-style', 'solid')
            .css('border-color','#face8d')
            .css('padding', '5px')
            .attr('rel', $(elem).attr('href'));
    $('body').append(popup);
};
        
var findLinks = function (msg, elem){
    return $(msg).find('a').filter(function(){return ($(this).text() === "Ссылка" && $(this).attr('href') == $(elem).attr('href')); });
};
        
var processMouseOver = function (elem){
    var links = findLinks($('#comments'), elem);
    if(links.length > 0)
    {
        processLink(links, elem);
        return false;
    }
    console.log('not found');
    if($('.2ch_popup').length > 0 && $('.2ch_popup').attr('rel') == $(elem).attr('href'))
        return false;
    if(response != null)
    {
        links = findLinks(response,elem);
        if(links.length > 0)
        {
            processLink(links, elem);
            return false;
        }
    }
    showPopup($('<div>loading</div>'), elem);
    $.ajax({type: "GET", url: $(elem).attr('href')}).done(function(msg){response = $(msg);processLink(findLinks(msg,elem), elem);})
};
    

var processLinkComments = function (elem, msgId){
    $(elem).mouseover(function(){processTimerOnShow(function(){showPopup(getMsgById(msgId), elem);});})
           .mouseout(function(){processMouseOut();});
};
    
        
var processTitle = function (element) {
    $(element).mouseover(function(){processTimerOnShow(function(){processMouseOver(element);});})
              .mouseout(function(){processMouseOut();}).click(function(){cleanTimer();});
    var msg = element.parents('article');
    var msgId = msg.prop("id").match(/comment-(\d+)/)[1];
    var nick = $("a[itemprop='creator']", msg).text();
    if (nick == null || nick == "")
        nick = "anonymous";
					
    $("#comment-" + getMsgIdByLink(element)).each(function() {
        var href = locationurl + "#comment-" + msgId;
        var link = $("<a href='" + href + "'>" + nick + "</a>");
        processLinkComments(link, msgId);

        var container = $(".msg_body", $(this));
        var answersClass = "answers";
        var answers = $("." + answersClass, container);
        if (!answers.length) {
            answers = $("<div class='" + answersClass + "'>Ответы: </div>");
            answers.css("font-size", "smaller");
            container.append(answers);
        }
        if (answers.children().length) {
            answers.append(", ");
        }
        answers.append(link);
    });
};

$('div.title > a').each(function (idx,elem){processTitle($(elem));});

}());