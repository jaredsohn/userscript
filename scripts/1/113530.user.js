// ==UserScript==
// @name           Köpőlégy
// @namespace      archelf.ph
// @description    Egyértelmű :)
// ==/UserScript==

/*
 
Köpőlégy helyettesítő script :)

Versions:
0.1     Initial release
0.1.1   Small pic bugfix (no small fly though)
0.1.2   Copy/paste bugfix
0.2     SmallPic Forum & PM
0.3     Generic format change
0.3.1   TROLLOLOLOLO bugfix
0.3.2   Site restriction to 5 Ph! pages
0.3.3   Threesome  O.o + non-existent blog link bugfix
0.3.4   Budy
0.3.5   arc/face bugfix
0.3.6   TH + present for newbees
0.3.7a  Vakegérke incl

*/

function main(usernick, newnick, usernamefix, usertitle, blogtitle, curplace, newpic, newsmallpic) {
    //Links
    var header = document.getElementsByTagName("a");
    for (var x = 0; x < header.length; x++) {
        var it = header[x].innerHTML;
        if (it.indexOf(usernick) > -1) {
            header[x].innerHTML = it.replace(usernick, newnick);

            //SmallPic - Forum
            var spic = header[x].getElementsByTagName("img");
            for (var y = 0; y < spic.length; y++) {
                if (spic[y].src.indexOf("small") > -1) {
                    spic[y].src = newsmallpic;
                }
            }


            //PM
            if (header[x].href.indexOf("privat/" + usernamefix) > -1) {
                spic = header[x].parentNode.parentNode.getElementsByTagName("img");
                for (var y = 0; y < spic.length; y++) {
                    if (spic[y].src.indexOf("small") > -1) {
                        spic[y].src = newsmallpic;
                    }
                }
            }
        }
        //Logout Page picture
        if ((header[x].href.indexOf("/blog/" + usernamefix) > -1) && (it.indexOf("<img") > -1)) {
            header[x].innerHTML = "<img src=\"" + newpic + "\" alt=\"\" />";
        }

    }
    //Forum
    header = document.getElementsByTagName("div");
    for (var x = 0; x < header.length; x++) {
        if (header[x].className == "arc" || header[x].className == "face") {

            if (header[x].innerHTML.indexOf(usernick) > 0) {
                var blogExist = "";
                if (header[x].innerHTML.indexOf("/blog/") > 0) {
                    blogExist = "<br>(<a href=\"http://logout.hu/blog/" + usernamefix + "/\">" + blogtitle + "</a>)";
                }
                header[x].innerHTML = "<img src=\"" + newpic + "\" alt=\"\"><br><b>" + newnick + "</b><br>(" + usertitle + ")" + blogExist;
            }
        }
    }

    //UserPage
    header = document.getElementsByTagName("td");

    for (var x = 0; x < header.length; x++) {
        if ((header[x].className == "arc" || header[x].className == "face") && (header[x].innerHTML.indexOf(usernick) > 0)) {
            header[x].innerHTML = "<img src=\"" + newpic + "\" alt=\"" + newnick + "\" />";
            var input = header[x].parentNode.getElementsByTagName("div");
            input[0].innerHTML = "<h1>" + newnick + "</h1><span>(" + curplace + ")</span>";
        }
    }

    //SmallPic
    header = document.getElementsByTagName("img");
    for (var x = 0; x < header.length; x++) {
        if (header[x].title == usernick) {
            header[x].src = newsmallpic;
        }
    }

    //Title
    if (document.title.indexOf(usernick) > -1) {
        document.title = document.title.replace(usernick, newnick);

        header = document.getElementsByTagName("img");
        for (var x = 0; x < header.length; x++) {
            if (header[x].parentNode.className != "arc" && header[x].src.indexOf("faces/small") > -1) {
                header[x].src = "";
            }
        }
    }
}

function mass(newnick, usertitle, sign, newpic, newsmallpic) {
    //Forum
    var header = document.getElementsByTagName("div");
    var messages;
    for (var x = 0; x < header.length; x++) {
        if (header[x].className == "msgblk") {
            messages = header[x];
            break;
        }
    }
    for (var x = 0; x < header.length; x++) {
        if (header[x].className == "arc" || header[x].className == "face") {
            header[x].innerHTML = "<img src=\"" + newpic + "\" alt=\"\"><br><b>" + newnick + "</b><br>(" + usertitle + ")";
        }
    }

    var hs = messages.getElementsByTagName("h4");
    for (var x = 0; x < hs.length; x++) {
        if (hs[x].innerHTML.indexOf("#") > -1) {
            var atag = hs[x].getElementsByTagName("a"); ;
            atag[1].innerHTML = newnick;
            //alert(atag.length);
            if (atag.length > 2) {
                atag[2].innerHTML = newnick;
            }
        }
    }
    hs = messages.getElementsByTagName("p");
    for (var x = 0; x < hs.length; x++) {
        if (hs[x].className == "sign") {
            hs[x].innerHTML = "<i>" + sign + "</i>";
        }
    }
}

function URLCheck() {
    var url = document.URL;
    var sites = Array(
        "http://prohardver.hu",
        "http://itcafe.hu",
        "http://logout.hu",
        "http://mobilarena.hu",
        "http://gamepod.hu");

    for (var x = 0; x < sites.length; x++) {
        if (url.indexOf(sites[x]) == 0) {
            return true;
        }
    }
    return false;
}

if (document.URL.indexOf("http://logout.hu/bejegyzes/ptech/ebben_a_topicban_ujonckent_viselkedunk/") == 0) {
    mass(
        "Igazi Újonc",
        "egysejtű",
        "Igen, mi mind egyéniségek vagyunk!",
        "/dl/upc/2011-09/2751_papucs.png",
        "/dl/upc/2011-09/2751_papucs_small.png");

}
else if (URLCheck()) {
    main(
        "Sandrew",
        "Köpőlégy",
        "sandrew",
        "beköpős",
        "BEKÖPŐ blog",
        "Modker",
        "/dl/upc/2011-09/2751_kopolegy.png",
        "/dl/upc/2011-09/2751_kopolegy_small.png");

    main(
        "Zohan",
        "Trollface",
        "zohan",
        "anti-Sandrew",
        "TROLLOLOLOLO",
        "Sandrew-t kergeti",
        "/dl/upc/2011-09/2751_trollfacedevil.png",
        "/dl/upc/2011-09/2751_trollfacedevil_small.png");

    main(
        "Kassadin",
        "Mr. Russia",
        "kassadin",
        "őstroll",
        "ÉNEKES blog",
        "Trololo lollolo lollolo lo",
        "/dl/upc/2011-09/2751_trollolo.png",
        "/dl/upc/2011-09/2751_trollolo_small.png");

    main(
        "EmberXY",
        "Bud Spencer",
        "emberxy",
        "bunyós",
        "",
        "Csakapuffinaderőt!",
        "/dl/upc/2011-09/209474_bud.gif",
        "/dl/upc/2011-09/209474_bud1.gif");

    main(
        "DJ WOKKY",
        "Terence Hill",
        "dj_wokky",
        "ügynök",
        "CIA központ",
        "A játék az nem játék ;)",
        "/dl/upc/2011-09/74475_terence1.gif",
        "/dl/upc/2011-09/74475_terence2.gif");
    
	main(
        "Vakegérke",
        "Vakegérke",
        "vakegerke",
        "öreg motoros",
        "Csakazértis BLOG!",
        "Öregember nem vénember.",
        "/dl/upc/2012-06/74981_vakegr.gif",
        "/dl/upc/2012-06/2751_74981_vakegr_sm.gif");
}