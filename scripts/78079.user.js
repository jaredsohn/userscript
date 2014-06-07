// Geburtstageanzeiger für mods.de
//
// Das Skript zeigt eine kleine Leiste mit allen Leuten an, die am aktuellen Tag
// Geburtstag haben. Mit einem klick auf "Internetfreunde" (links neben dem
// "Suchen"-Link) werden alle Geburtstage aus der Freundesliste ausgelesen.
// Dieses ist einmal innerhalb von einer Stunde möglich. Zusätzlich hat man
// die Möglichkeit weitere Geburtstage oder andere wiederkehrende Ereignisse
// durch editieren des Skriptes hinzufügen oder zu entfernen.
// Dazu siehe die Beispiele bei "dates:".
//
// (c) 2010 by cms
//
// ==UserScript==
// @name           mods.de - Geburtstage
// @namespace      userscripts.org/users/cms
// @author         cms
// @version        1.7.0
// @description    Zeigt eine Leiste mit Geburtstagen oberhalb der Lesezeichen an
// @include        http://forum.mods.de/bb/
// @include        http://forum.mods.de/bb/index.php*
// ==/UserScript==


// Die Monate beginnen bei der getMonth-Methode unpraktischerweise bei 0.
function m(monat)
{
    return monat - 1;
}

var Birthday = 
{
    dates:
    [

        // new Date(jahr, m(monat), tag)
        // Für ein tägliches Ereignis: new Date() (also ohne Parameter)
        // Für ein monatliches Ereignis: new Date(jahr, new Date().getMonth(), tag)

        // Wenn man ein neues Ereignis hinzufügen möchte, muss man nur die entsprechende
        // Beispielzeile kopieren und "BeispielXYZ" mit "NameDesEreignisses" ersetzen
        // und das Datum entsprechend anpassen. Mehrere Ereignisse müssen mit Komma
        // getrennt werden.
        // Der Eintrag 'uid' wird dafür verwendet, einen Link zu erstellen, der das
        // Profil des entsprechenden Users öffnet. Wenn man einen Eintrag erstellt,
        // der keinen Mods.de-User darstellt, kann man die uid einfach weglassen.

        //{ "name": "Beispieltaeglich", "birthday": new Date() },
        //{ "name": "Beispielmonatlich", "birthday": new Date(1337, new Date().getMonth(), 23) },
        //{ "name": "Beispielmodsdeuser", "uid": 123456 , "birthday": new Date(1337, m(7), 15) }

    ],

    init: function ()
    {
        var butzbacher, bookmarks, geburtstage, lesezeichen;

        butzbacher = this.todaysBirthdays();

        if (butzbacher.length > 0)
        {
            geburtstage = document.createElement("div");

            geburtstage.setAttribute("class", "padded bookmarklist color1");
            geburtstage.style.marginBottom = "16px";
            geburtstage.style.color = "#CCC";

            butzbacher = butzbacher.map(
                function (t)
                {
                    if (t.uid)
                    {
                        return '<a href=javascript:void(0) onclick="openProfile('+t.uid+')">'+t.name+'</a>';
                    }
                    else
                    {
                        return t.name;
                    }
                });

            geburtstage.innerHTML = butzbacher.join(", ");

            bookmarks = document.evaluate(
                "//div[@class='padded bookmarklist color1']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

            lesezeichen = bookmarks.snapshotItem(0);
            lesezeichen.parentNode.insertBefore(geburtstage, lesezeichen);
        }
    },

    todaysBirthdays: function ()
    {
        var arr, today;

        arr   = [];
        today = new Date();

        FriendsBirthdays.restoreBirthdays().forEach(
            function (t)
            {
                var date = new Date(t.birthday);
                var tmp  = {};

                if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth())
                {
                    tmp.name = t.name;
                    tmp.uid  = t.uid;
                    arr.push(tmp);
                }
            });

        this.dates.forEach(
            function (t)
            {
                var tmp = {};

                if (t.birthday.getDate() === today.getDate() && t.birthday.getMonth() === today.getMonth())
                {
                    tmp.name = t.name;

                    if (t.uid)
                        tmp.uid  = t.uid;

                    arr.push(tmp);
                }
            });

        return arr;
    }
};

var FriendsBirthdays =
{
    // tage, stunden, minuten, sekunden, millisekunden
    checkInterval: 1 * 1 * 60 * 60 * 1000,
    daten:         [],
    parsedData:    [0, 0],
    birthdays:     [],

    init: function ()
    {
        this.createFriendsButton();
    },

    parseBirthdays: function (uid)
    {
        this.showWorkingDialog();

        uid.forEach(function (t)
        {
            GM_xmlhttpRequest(
            {
                method: "GET",
                url: "http://my.mods.de/" + t,
                onload: function (response)
                {
                    var ergebnisGeburtstag, ergebnisName, neuedaten;

                    neuedaten          = {};
                    ergebnisGeburtstag = /Geburtstag:<\/td> <td class='attrv'>(\d{1,2})\. (\S{3,9}) (\d{0,4}).*?</.exec(response.responseText);

                    if (ergebnisGeburtstag)
                    {
                        ergebnisName       = /<title>mods.de Profil: (.+?)<\/title>/.exec(response.responseText);
                        neuedaten.name     = ergebnisName[1];
                        neuedaten.uid      = t;
                        neuedaten.birthday = new Date(ergebnisGeburtstag[3], FriendsBirthdays.months[ergebnisGeburtstag[2]], ergebnisGeburtstag[1]);
                        FriendsBirthdays.birthdays.push(neuedaten);
                    }

                    FriendsBirthdays.parsingFinished();
                }
            });
        });
    },

    parseUIDs: function ()
    {
        GM_xmlhttpRequest(
        {
            method: "GET",
            url: "http://my.mods.de/p/buddies.php",
            onload: function (response)
            {
                var ergebnis, UIDs, reg;

                UIDs = [];
                reg  = /buddydel\((\d+),/g;

                while (ergebnis = reg.exec(response.responseText))
                {
                    UIDs.push(ergebnis[1]);
                }

                FriendsBirthdays.parsedData[0] = UIDs.length;

                FriendsBirthdays.parseBirthdays(UIDs);

                FriendsBirthdays.setLastCheck();
            }
        });
    },

    getLastCheck: function ()
    {
        return new Date(parseInt(GM_getValue("lastCheck", 0), 10));
    },

    setLastCheck: function ()
    {
        if (this.nextCheckAllowed())
        {
            GM_setValue("lastCheck", new Date().getTime().toString());
        }
    },

    nextCheckAllowed: function ()
    {
        return (new Date().getTime() - this.getLastCheck().getTime()) > this.checkInterval;
    },

    timeUntilNextCheckIsAllowed: function ()
    {
        // checkInterval minus die seit dem letzten Check vergangene Zeit geteilt durch Millisekunden und Sekunden = 
        // Zeit in minuten
        return Math.floor((this.checkInterval - (new Date().getTime() - this.getLastCheck().getTime())) / 1000 / 60);
    },

    setBirthdays: function ()
    {
        GM_setValue("geburtstage", JSON.stringify(this.birthdays));
    },

    restoreBirthdays: function ()
    {
        return JSON.parse(GM_getValue("geburtstage", "[]"));
    },

    months:
    {
        "Januar"    : 0,
        "Februar"   : 1,
        "M&auml;rz" : 2,
        "März"      : 2,
        "April"     : 3,
        "Mai"       : 4,
        "Juni"      : 5,
        "Juli"      : 6,
        "August"    : 7,
        "September" : 8,
        "Oktober"   : 9,
        "November"  : 10,
        "Dezember"  : 11
    },

    check: function ()
    {
        if (this.nextCheckAllowed())
        {
            this.parseUIDs();
        }
        else
        {
            alert("Du musst leider noch " + this.timeUntilNextCheckIsAllowed() + " Minuten warten. \/o\\");
        }
    },

    parsingFinished: function ()
    {
        this.parsedData[1]++;

        document.getElementById("load").style.width = (Math.floor( 100 / (this.parsedData[0] / this.parsedData[1]) ) * 2) + "px";

        if (this.parsedData[0] === this.parsedData[1])
        {
            this.setBirthdays();
            this.hideWorkingDialog();
            alert("Freundesliste ausgelesen.");
        }
    },

    showWorkingDialog: function ()
    {
        var workingDialog, load, leiste, separator;

        leiste = document.getElementById("internetfreunde");

        separator = document.createElement("span");
        separator.setAttribute("class", "separator");
        separator.setAttribute("id", "workingdialogsep");
        separator.appendChild(document.createTextNode(" | "));

        workingDialog = document.createElement("div");
        workingDialog.setAttribute("id", "workingdialog");
        workingDialog.style.position = "relative";
        workingDialog.style.display = "inline-block";
        workingDialog.style.width = "200px";
        workingDialog.style.height = "1em";
        workingDialog.style.margin = "0";
        workingDialog.style.padding = "0";
        workingDialog.style.verticalAlign = "middle";
        workingDialog.style.backgroundColor = "#CCC";

        load = document.createElement("div");
        load.setAttribute("id", "load");
        load.style.position= "absolute";
        load.style.display = "inline-block";
        load.style.width = "1px";
        load.style.height = "1em";
        load.style.margin = "0";
        load.style.padding = "0";
        load.style.top = "0";
        load.style.left = "0";
        load.style.backgroundColor = "green";
        load.innerHTML = "&nbsp;";

        workingDialog.appendChild(load);

        leiste.parentNode.insertBefore(workingDialog, leiste);
        leiste.parentNode.insertBefore(separator, leiste);
    },

    hideWorkingDialog: function ()
    {
        document.getElementById("workingdialog").style.display = "none";
        document.getElementById("workingdialogsep").style.display = "none";
    },

    createFriendsButton: function ()
    {
        var button, leiste, separator;

        leiste = document.evaluate(
            "//a[@href='search.php']",
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);

        separator = document.createElement("span");
        separator.setAttribute("class", "separator");
        separator.appendChild(document.createTextNode(" | "));

        button = document.createElement("a");
        button.href = "javascript:void(0);";
        button.setAttribute("id", "internetfreunde");
        button.addEventListener("click", function (event) { FriendsBirthdays.check(); }, false);
        button.appendChild(document.createTextNode("Internetfreunde"));

        leiste = leiste.snapshotItem(0);
        leiste.parentNode.insertBefore(button, leiste);
        leiste.parentNode.insertBefore(separator, leiste);
    }
};

Birthday.init();
FriendsBirthdays.init();