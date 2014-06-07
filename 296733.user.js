// ==UserScript==
// @name         liako chat color
// @version      1.00
// @match        http://www.prisonplanet.gr/chat-radio
// @match        http://www.prisonplanet.gr/disqus.html
// ==/UserScript==
if (window.top != window.self) 
    return;
var s = document.createElement('script');
s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
s.setAttribute('type', 'text/javascript');
document.getElementsByTagName('head')[0].appendChild(s);


setTimeout(function () {
    link = window.location.href;
    if (link == "http://www.prisonplanet.gr/chat-radio") {
        loadColor_a();
        var color = getColor();
        $("#rightcolumn").find('iframe').contents().find('iframe').css("background-color", color);
        $("#rightcolumn").find('iframe')[0].addEventListener('load', function () {
            color = getColor();
            setTimeout(function () {
                $("#rightcolumn").find('iframe').contents().find('iframe').css("background-color", color);
                loadColor_a();
            }, 1500)

        }, false)
    } else {
        loadColor_b();
        var color = getColor();
        $('iframe').css("background-color", color);
        $('iframe')[0].addEventListener('load', function () {
            color = getColor();
            setTimeout(function () {
                $("#rightcolumn").find('iframe').contents().find('iframe').css("background-color", color);
                loadColor_b();
            }, 1500)

        }, false)
    }

}, 2000)



function loadColor_a() {

    $("#rightcolumn").find('iframe').contents().find('a').mousedown(function (e) {
        if (e.button == 2) {
            var color = prompt('SET LIAKOCHAT COLOR:.......,more colors at http://www.w3schools.com/cssref/css_colors.asp');
            $("#rightcolumn").find('iframe').contents().find('iframe').css("background-color", color);
            setColor(color);
            return false;
        }
        return true;
    });
}

function loadColor_b() {
    $('a').mousedown(function (e) {
        if (e.button == 2) {
            var color = prompt('SET LIAKOCHAT COLOR:.......,more colors at http://www.w3schools.com/cssref/css_colors.asp');
            $('iframe').css("background-color", color);
            setColor(color);
            return false;
        }
        return true;
    });
}


function setColor(color) {
    localStorage.setItem('chatcolor', color);
}

function getColor() {
    color = localStorage.getItem('chatcolor');
    return color;
}