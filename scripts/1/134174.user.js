// ==UserScript==
// @id             wololo.net-fe1e1fb2-f1eb-4cab-a0fd-4fee8eb9baac@xnx_test_title
// @name           title test
// @version        1.0
// @namespace      xnx_test_title
// @author         Xian Nox
// @description    
// @include        http://wololo.net/talk/*
// @run-at         document-end
// ==/UserScript==


var i = 0;
var id = 0;

function get_title(id) {
    if (id == 390)
        return "Nyx Avatar";
    if (id == 517)
        return "Princess Random";
    if (id == 1075)
        return "All-in-one Faker";
    if (id == 7326)
        return "Mahou pony";
    if (id == 8591)
        return "Banned";
    if (id == 966)
        return "Very Important Pony";
    if (id == 1400)
       return "l33t h4x0r";
    if (id == 8356)
       return "newb";
    if (id == 75)
       return "A Bear"
    if (id == 111)
       return "Usagi-mimi is best mimi"
    if (id == 4092)
       return "XxMLGxPR0_Sn1p3sxX"
    if (id == 442)
       return "a PROfessional"
    if (id == 5773)
       return "crazy dancing weirdo man"
    return -19;
}

if (window.location.href.indexOf("http://wololo.net/talk/memberlist.php?mode=viewprofile&u=") == 0) {
    id = window.location.href.substr(57);
    if (get_title(id) != -19) {
        var x = document.getElementsByTagName("dl");
        for (i = 0; i < x.length; i++) {
            if(x[i].innerHTML.indexOf("User avatar") != -1) {
                x[i].innerHTML += "<dd style=\"text-align: center;\">"+get_title(id)+"</dd>";
            }
        }
    }
}

if (window.location.href.indexOf("http://wololo.net/talk/viewtopic.php?") == 0) {
    var x = document.getElementsByTagName("dl");
    for (i = 0; i < x.length; i++) {
        if(x[i].innerHTML.indexOf("./memberlist.php?mode=viewprofile&amp;u=") != -1) {
            var split = x[i].innerHTML.indexOf("<dd>&nbsp;</dd>");
            var yav = x[i].innerHTML.substr(x[i].innerHTML.indexOf("./memberlist.php?mode=viewprofile&amp;u=") + 40);
            id = yav.substr(0, yav.indexOf('"'));
            if (get_title(id) != -19) {
                var t2 = x[i].innerHTML.substr(split);
                var t1 = x[i].innerHTML.substr(0, split);
                x[i].innerHTML = t1 + "<dd>"+get_title(id)+"</dd>" + t2;
            }
        }
    }
}
