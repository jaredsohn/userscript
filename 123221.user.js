// ==UserScript==
// @name       Imagearn.com Viewer
// @namespace  buzz
// @version    0.1
// @description  Fits image to screen, removes ads and other stuff, adds slideshow and keyboard shortcuts
// @include    http://imagearn.com/image.php*
// @copyright  2012+, buzz
// @licence    GPLv2
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {

    console.log("imagearn enhanced running...");

    $imagearnSwitchImg = function(dir) {
        var n = $('a[title=View ' + dir + ' image]');
        if (n.length > 0) {
            var arg = '';
            if ($("#slideshow-switch").is(':checked'))
                arg = '#s' + $("#slideshow-delay").val();
            window.location = n.attr('href') + arg;
        }
        }
        
        function enableSlideshow() {
            timer = setTimeout("$imagearnSwitchImg('next');", $("#slideshow-delay").val() * 1000);
            $("#slideshow-switch").attr("checked", "checked");
        }
    function disableSlideshow() {
        clearTimeout(timer);
        $("#slideshow-switch").removeAttr("checked");
    }
    
    // remove unneccessary stuff/adjust layout
    $("#header, #top-banner, div.side").remove();
    $("object#picBanner").parent().remove();
    $("div#image").css("width", "auto");
    $("h3.page-title").css('margin', '0').css('text-align', 'center').children().css('font-size', '16px')
        .css('color', '#444444').css('letter-spacing', '0')
        .wrap('<a href="#" id="galTitle" />').prepend('Gallery:&nbsp;').parent().click(function() {
            window.location = $('.box-heading a').attr('href');
        });
    
    function resizeImg() {
        var maxwidth = $(window).width();
        var maxheight = $(window).height() - 20;
        $("img#img").css('max-width', maxwidth+'px').css('max-height', maxheight+'px');
        $("div.content, div.content div.main").css('width', maxwidth+'px');
    }
    $(window).resize(resizeImg);
    resizeImg();
    
    // shortcuts
    $("html").keypress(function(e) {
        switch (e.charCode) {
            case 32:  // space
            case 110: // n
                $imagearnSwitchImg('next');
                return false;
                break;
            case 112: // p
                $imagearnSwitchImg('previous');
                break;
            case 115: // s
                if ($("#slideshow-switch").is(":checked"))
                    disableSlideshow();
                else
                    enableSlideshow();
                break;
         }
    });
    
    // add controls
    var timer;
    $("div#image").append(
        '<div id="slideshow-control" style="position: absolute; left: 10px; top: 28px; background-color: #ddd; opacity: 0.8;' +
        ' padding: 8px; text-align: right; width: 120px; box-shadow: 1px 1px 6px #bbb;">' +
        '<label class="left" for="slideshow-switch">Slideshow</label><input id="slideshow-switch" style="margin-left: 4px;" type="checkbox" /><br />' +
        '<label class="left" style="clear: left;" for="slideshow-delay">Delay</label>' +
        '<input id="slideshow-delay" type="text" value="4" maxlength="2" style="margin-left: 4px; width: 18px;" /><br />' +
        '<div class="left" style="clear: both;">Keys:</div><br />' +
        '<div class="left" style="clear: both;"><tt>Space</tt>/<tt>n</tt></div>Next img<br />' +
            '<div class="left" style="clear: both;"><tt>p</tt></div>Prev img<br />' +
        '<div class="left" style="clear: both;"><tt>s</tt></div>Toggle slideshow' +
        '</div>');
    // checkbox listener
    $("#slideshow-switch").change(function() {
        if ($(this).is(':checked'))
            enableSlideshow();
        else
            disableSlideshow();
    });
    // read delay from url
    delay = window.location.hash.substr(2);
    if (delay.search(/^[0-9]+$/) == 0) {
        if (delay > 0 && delay < 9999) {
            $("#slideshow-delay").val(delay);
            $("#slideshow-switch").attr('checked', true);
            enableSlideshow();
        } else {
            $("#slideshow-switch").attr('checked', false);
        }
    }
}

// load jQuery and execute the main function
addJQuery(main);
