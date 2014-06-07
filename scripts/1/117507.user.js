// ==UserScript==
// @name	DH Plus test
// @version	0.4
// @author	Batis <hello@batur.info>
// @description	DH Plus, Donanımhaberde forumlardaki açılmış başlıklar arasında konuya girmeden konuyu açan kişinin mesajını görmeni sağlar. Böylece daha hızlı ve keyifli bir donanımhaber deneyimi yaşarsın.
// @copyright	2011+, Batis (http://userscripts.org/users/batis)
// @include        http://*.donanimhaber.com/forum*
// @include        http://*.donanimhaber.com/trends*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @require        http://www.kolayuc.com/lib/js/jquery.qtip.min.js
// ==/UserScript==

// Test eden kullanıcılar: Batis, OBERTAN

var currentVersion = "0.4";
var meta = "117507";
var link = document.createElement('LINK');
link.rel = 'stylesheet';
link.href = 'http://www.kolayuc.com/lib/css/dh/jquery.qtip.min.css';
link.type = 'text/css';
document.body.insertBefore(link, null);
function detectBrowser() {
    if (navigator.userAgent.match(/firefox/i))
        return "firefox";
    else if (navigator.userAgent.match(/chrome/i))
        return "chrome";
    else if (navigator.userAgent.match(/opera/i))
        return "opera";
    else
        return "unknown";
}
$(document).ready(function(){
    updateKontrol();
    function updateKontrol() {
        var browser = detectBrowser();
        if(browser!="opera")
        {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://userscripts.org/scripts/source/'+meta+'.meta.js',
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails) {
                    if(responseDetails.status == "200") {
                        url = "http://userscripts.org/scripts/source/'+meta+'.user.js";
                        theDiv = $('<div id="version"></div>').css({
                            "background": "#CCC",
                            "box-shadow": "1px 1px 3px rgba(0, 0, 0, 0.1)",
                            "display": "none",
                            "font": "13px/17px Helvetica,Arial,sans-serif",
                            "height": "20px",
                            "left": "0",
                            "padding": "4px",
                            "position": "fixed",
                            "top": "185px",
                            "width": "165px",
                            "z-index": "890"
                        });
                        theDiv.append('<a style="color:#FFF; display:block" href="'+url+'" target="_blank">DH Plus\'ın yenisi var! </a>').appendTo('body');
                        response = responseDetails.responseText;
                        var newVersion = parseFloat(response.split("@version")[1].split("@author")[0]);
                        if(newVersion != parseFloat(currentVersion)) {
                            theDiv.fadeIn("slow").click(function(){
                                $(this).fadeOut("slow");
                            });
                        }
                    }
                }
            });
        }
    }

    $('div#zip center table tbody tr td table tbody tr td table tbody tr').each(function(){
        titleLink = $(this).find('td:eq(1) span[class]:eq(0) a');
        if (titleLink.attr('href') != undefined){
            titleUrl = titleLink.attr('href');
            titleText = titleLink.text();
            console.log($(window).width());
            if ($(window).width()<1280)
            {
                width = 950;
                my = "top left";
                at = "bottom left";
            }
            else
            {
                width = 950;
                my = 'left top';
                at = 'right bottom';
            }
            $(this).find('td:eq(1) span[class]:eq(0) a').qtip({
                content: {
                    text: 'içerik yükleniyor...',
                    title: {
                        text: titleText,
                        button: true
                    },
                    ajax: {
                        url: titleUrl,
                        dataType: "html",
                        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-9",
                        success: function(data, status){
                            newData = $(data);
                            newData.find("div#divAdnetKeyword table:eq(0) img").each(function(){
                                $(this).css("max-width", "760px");
                            });
                            firstComment = newData.find('div#divAdnetKeyword table:eq(0)').clone().wrap('<div></div>').parent().html();
                            respondTopic = newData.find('img[title="Mesaja cevap at"]').parents('td.ultrasmall').find('a:eq(0)').clone().wrap('<div></div>').parent().html();
                            this.set('content.text',respondTopic+firstComment+respondTopic);
                        },
                        error: function(xhr, textStatus, errorThrown){
                            console.log('Error:' +textStatus+" "+errorThrown+" "+xhr);
                        }
                    }
                },
                show: {
                    event: 'mouseenter',
                    effect: function(offset) {
                        $(this).slideDown(100); // "this" refers to the tooltip
                    },
                    delay: 500,
                    solo: true // ... but show the tooltip when ready
                },
                hide: {
                    event: 'click unfocus'
                },
                events: {
                    render: function(event, api) {
                        $(window).bind('keydown', function(e) {
                            if(e.keyCode === 27) {
                                api.hide(e);
                            }
                        });
                    }
                },
                position: {
                    my: my,
                    at: at
                },
                style: {
                    classes: 'ui-tooltip-shadow ui-tooltip-light ui-tooltip-rounded',
                    width: width
                }
            });
        }
    });
});