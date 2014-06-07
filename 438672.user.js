// ==UserScript==
// @name       Facebook For Minimalists
// @namespace  http://www.facebook.com/andyleelifestyle
// @version    0.8.2
// @description  Facebook for Minimalists.  Still in beta.
// @include /https?://(www\.)?facebook\.com(/.?)+
// @copyright  2014+, Andy Lee
// @require http://code.jquery.com/jquery-latest.js
// @require http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js
// @resource http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css
// @resource http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css
// ==/UserScript==

$(document).ready(function() {
    var adjustHomepage = function () {
        $('.userContentWrapper').each(function (i,e) {
        	$(e).children('div').last().css({'margin':'0 auto', 'width':'50%'});
        });
        if ($(".hasLeftCol").length > 0) {
            $("#leftCol").hide();
            $("#rightCol").hide();
                $("#content").css('margin-left', '-180px');
                if ($("#menuNavItem").length === 0) {
                	var $menuNavItem = $("<div>").addClass('navItem tinyman').attr('id','menuNavItem');
                        $menuNavItem.append($('<a href="#" class="btn btn-info" style="color:white" data-toggle="popover" data-title="Menu" data-placement="left"><i class="fa fa-anchor"></i>#ffm</a>').popover({
                        trigger: 'manual',
                        animate: true,
                        html: true,
                        placement: 'bottom',
                        template: $('#leftCol').css({'background-color':'white', 'margin-top':'16px', 'margin-left':'-50px', 'overflow-y':'scroll', 'overflow-x':'hidden', 'height':'350px'}).addClass('popover jewelFlyout fbJewelFlyout uiToggleFlyout').on('mouseover', function () {$(this).mouseleave(function() {$(this).hide(); });})
                        }).click(function(e) {
                            e.preventDefault() ;
                        }).mouseenter(function(e) {
                            $(this).popover('show');
                        }));
                }
            	if ($("#menuNavItem").length === 0) {
    	            $("#pageNav").prepend($menuNavItem);
                } else {
                    adjustContentAreaWidth();
                    $("#menuNavItem").show();
                }
				if ($("#event_left_navigation").children().length > 0) {
		            $("#menuNavItem").hide();
		            $("#event_left_navigation").hide();
        		}
        } else {
            $("#content").css('margin-left', '0px');
            $("#menuNavItem").hide();
            $("#rightCol").show();
        }
    };

    var adjustContentAreaWidth = function () {
        var idealWidth = 0;
        if (window.innerWidth >= 1225) {
            idealWidth = 400 + 500 / (1225/window.innerWidth);
        } else if ((window.innerWidth < 1225) && (window.innerWidth > 980)) {
            idealWidth = 1000 - 500 * (1 - window.innerWidth/1224);
        } else {
            idealWidth = window.innerWidth - 20;
        }
        idealWidth = Math.max(idealWidth, 550);
        $('#contentArea').css('width', idealWidth + 'px');
        $('#headerArea').css('width', idealWidth + 'px');
    };

    window.onresize = adjustContentAreaWidth;
    adjustContentAreaWidth();

    $('#content').bind('DOMSubtreeModified', function() {
        adjustHomepage();
    });
});