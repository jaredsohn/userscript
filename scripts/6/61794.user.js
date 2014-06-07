(function () {

// ==UserScript==
// @name          usoCheckup - DOMNotify Theme
// @namespace     http://userscripts.org/users/37004
// @description   DOM Notifications instead of JavaScript confirm/alert boxes
// @copyright     2009+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.2.4
// @icon https://secure.gravatar.com/avatar/e615596ec6d7191ab628a1f0cec0006d?r=PG&s=48&default=identicon
//
// @exclude *
//
// @grant GM_addStyle
//
// ==/UserScript==

  if (typeof usoCheckup != "undefined") {
    /*
        Define a custom alert widget
    */


    usoCheckup.widgets("alert", function(details) {
      var remoteVersion = parseInt(usoCheckup.lastValueOf("version", details.remoteMeta["uso"]));
      var localVersion = parseInt(usoCheckup.lastValueOf("version", usoCheckup.localMeta["uso"]));

      if (remoteVersion > localVersion) {
        if (details.mismatched || details.unlisted)
          DOMNotify(
              usoCheckup.lastValueOf("name", usoCheckup.localMeta),
              usoCheckup.strings("updateAvailable") + " "
                  + ((usoCheckup.localMeta["version"]) ? usoCheckup.lastValueOf("version", usoCheckup.localMeta) + ' ': '')
                  + "(" + localVersion
                  + ") \u0394 "
                  + ((details.remoteMeta["version"]) ? usoCheckup.lastValueOf("version", details.remoteMeta) + ' ': '')
                  +  "(" + remoteVersion + ")",
              "show",
              details
          );
        else
          DOMNotify(
              usoCheckup.lastValueOf("name", usoCheckup.localMeta),
              usoCheckup.strings("updateAvailable") + " "
                  + ((usoCheckup.localMeta["version"]) ? usoCheckup.lastValueOf("version", usoCheckup.localMeta) + ' ': '')
                  + "(" + localVersion
                  + ") \u0394 "
                  + ((details.remoteMeta["version"]) ? usoCheckup.lastValueOf("version", details.remoteMeta) + ' ': '')
                  +  "(" + remoteVersion + ")",
              "default",
              details
          );
      }
      else if (details.forced)
        DOMNotify(
            usoCheckup.lastValueOf("name", usoCheckup.localMeta),
            usoCheckup.strings("updateUnavailable")
        );
    });

    /*
        Define a custom query widget
    */

    usoCheckup.widgets("query", function() {
      GM_registerMenuCommand(
        usoCheckup.lastValueOf("name", usoCheckup.localMeta) + ": " + usoCheckup.strings("queryWidget"),
        function() {
          usoCheckup.request(true);
        }
      );
    });

    /*
        Define a custom toggle widget
    */

    usoCheckup.widgets("toggle", function() {
      GM_registerMenuCommand(
        usoCheckup.lastValueOf("name", usoCheckup.localMeta) + ": " + usoCheckup.strings("toggleWidget"),
        function() {
          if (usoCheckup.enabled === true) {
            usoCheckup.enabled = false;
            DOMNotify(
                usoCheckup.lastValueOf("name", usoCheckup.localMeta),
                usoCheckup.strings("updaterOff")
            );
          }
          else {
            usoCheckup.enabled = true
            DOMNotify(
                usoCheckup.lastValueOf("name", usoCheckup.localMeta),
                usoCheckup.strings("updaterOn")
            );
          }
        }
      );
    });

    /*
        Define helper functions
    */

    function addClass(thisNode, thisValue) { // TODO: Decide on classList.add at some point (Compatible w FF3.6+)
      var c = thisNode.getAttribute("class");
      var re = new RegExp("\\b" + thisValue + "\\b");
      if (!c)
        thisNode.setAttribute("class", thisValue);
      else if (!c.match(re))
        thisNode.setAttribute("class", c + " " + thisValue);
    }

    function DOMNotify(message, delta, method, details) {

      GM_addStyle(
        [
          "div#usoc {",
            "position: fixed;",
            "border-radius: 0;",
            "top: 0;",
            "left: 0;",
            "width: 100%;",
            "z-index: 99999999;",
            "font: normal normal 14px sans-serif;",
            "margin: 0 !important;",
            "padding: 0;",
            "border: 0;",
          "}",

          "img.usocIcon {",
            "vertical-align: middle;",
            "margin: 2px 2px 3px 4px;",
            "cursor: pointer;",
            "width: 16px;",
            "height: 16px;",
          "}",

          "img.usocIcon-def,",
          "img.usocIcon-nix,",
          "img.usocIcon-win,",
          "img.usocIcon-aero",
          "{",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAl2cEFnAAAAEAAAABAAXMatwwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAXlJREFUKJGtkUtqwlAYhW820JET16GTzmzX4BIcFLGjWDfgo9LiDoSK2h0odSQYm0GNhiYKlfoATTRioyK+EEtuT0klVapOevn5udx85+T89xLyX8vtdjebTUrpaZRhGI/HUyqVJpPJfD4PBoMnBCzLlsvl0WgEerPZ2O32Y95+v79SqYCezWbT6dRmsx3zDgQCkiSZNHq9XjcM4yDtcrlCoVAsFlsul6AFQeA4LplMHpw7nU7H4/FUKoUkhUIB9qvVKpPJQH9Qk8/nc7kceqPRCIfD4/F4vV5DgOkTiQQm3Bc4HA6e5xEGn7vdrqqqyLZYLAaDgSiKfwiwnE6noijVarXX65k3q2kaQloEvd+tO+aRPf8YDnVdx131+/1WRxW8OP8BCI1aZdwSGiHvr7wsy/DGT1qqLvq+z80CsyNA8dHLmixls1k8SFvRZJ+FmrUvePGSYvEZryG/tWrXhG69DTMCBEbUMsDmM0Kers4e2IvOzTbkrzzoX7B9MxkRyNJ+AAAAAElFTkSuQmCC) no-repeat 0 0;",
          "}",

          "img.usocIcon-osx {",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAANxJREFUKJGtkiEOhDAQRbkEjlP0BFyCE+Bwdcg6HCfAcQIcrq4Oh8Stq1uHY1/aBJJlYBH7xaTJvN/5U0iSf6koimVZtm17RJdlOU3TO8gY84PWWkN776HXdc2y7CmN0jS9o+u6nuc50lTOdzvked40Tdu2xIBmjrW27/tLD72u66hcD8r1OIdhoF564MZxpPKgTItLIw5cJBiUUs45wtB+BZFtTygPwQNHnkjH7akHYU7iZX0QXJxTVdXeFQxMZ4JICwZ2hWb1mOqLFgz8RezN18BwpuVIeHTQuYU+NXoxbhsi0IgAAAAASUVORK5CYII=) no-repeat 0 0;",
          "}",

          "img.usocHome {",
            "vertical-align: middle;",
            "margin: 2px 2px 3px 2px;",
            "cursor: pointer;",
            "width: 16px;",
            "height: 16px;",
          "}",

          "img.usocHome-nix {",
            "background: transparent url(moz-icon://stock/gtk-home?size=16) no-repeat 0 0;",
          "}",
          "img.usocHome-osx {",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAQAAABHeoekAAAAAXNSR0IArs4c6QAAAMpJREFUGFdtkEEOgjAURKcYQVx4Dc/j0rD2cJKQcAA8hW5dg4kbE0nQAt8B26aN5iVkOjPl84neCBASOFEPD6lQ8el7XqGTEmdSUv0pPCRHjQ2pkfPkChoTtRzxRIoFSamOdL7JXGj4csEKCiNRVMJBjZjCVQoskQAMBzJSJXQKJixc5IQ1YhfbSkz3hItEWxyQ+as6MiZbRK26k87dtnSY/FaZLfRsauyI1d4W2sx/4aZu6mW+IygMwS3/FBSGH63tr97P0/c/uscHUsfWT1fion8AAAAASUVORK5CYII=) no-repeat 0 0;",
          "}",
          "img.usocHome-win {",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAAAAXNSR0IArs4c6QAAA3NJREFUOE9lU3tM01cYvU4xztfM5j8aZ4wJysyyBTC1QbOJj0h8D5QtzG1/LJmiMVp8hZiaVGuUmLWIiMYHIEFKkfGQsvFQGZmPgRoiAtotbSOtjCK1UFAo0u/sfldiCN7ky7nf+c45v3vb30+IUesfyyKF62T1tiZ9wPu27PmfOIoj4xjFCL9ujP69Zc+PeLd/0bhhPONJIcZ31K285L29Bozcj56P9b0l8sIVbpPV3bheneiKVkx8fjM2r6c5AQOuH8HIPfNiRLdtjF88yZmvMDdaiL62rSooK1yEeWq/uuxv2oig+yeEun4ZZuSeeZ6zjvXsG50jKr4TItD6jQq6lSymeKpiCl4+WItB1/cYdMRTf8tKYuSeeZ6zjvXsY79a9QeE6H8SP473NbvElPZKTaGvYTUGHFvR9ziWfPcT6GXbMYXcM89z1rGefeznHBF0JY4ETZj27HpUUffd5Xht34hAUwz9V/c1+VyVNDAMMHLPPM9Zx3r2iVE54s6RqTNcpV9Yu/5aiv62OPTej6aOGzHkc9poEMCQLEbumec561jPPvaroIfmmbOc1xaWe+s18lor4L/3echTvYQ67GXUD1BQhryWxcg98zxnHevZx37OEY/PzY51lUSgp0GLwL2FIffvi8ljL0evNLe2NtO19BRYTDpYTXvR0vKImPc8LSfWBf7+LNTTqAX7OUc0GKfP+LdgQba75FN4KiLhtl+nziF1CvxhOQPz5o9RrY/F6fiZqLJmKr5THtNtr6Dntii4S+aC/Y0yR10VBSKs4uSXBltZLtql2jsM8ktTZdF5Kt6/DMN301F3YhNqS7PJJ/muEKi9D7Bmm1CUOs8AvH3vhCmnRr3Rc5P8EVmljpCz9w28QUK3NNVI869b5sCiWwoObbpjo07Jv5APc/iDMKTfCIlJF9T3dPBw5kRhyLylUr/dmae9WPaIPIMEeSqSD0Z9ZS4dXTUBxrjJ2BcjUFWeQ/xnyN9N6oC0DBtFRe7Qsn/H7qwwoc/4U4UlJl/VnLU+pBbvKzgDQ3gWktf8TYatn4W0xHDsX/4RivLPUzsBzr431NwRwNFTpRQdtUvD/uRDhePEPkPJJG4OpFVr9OZaOn72JowZtTgm67DRQroUM/bozEjRmXBIfwWpxmKkGgpxUJ+P7bvPUdIPp1TYz9vPfPg/+3mQvvflC3AAAAAASUVORK5CYII=) no-repeat 0 0;",
            "width: 19px;",
          "}",
          "img.usocHome-aero {",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAAXNSR0IArs4c6QAAAu9JREFUOI19k91LU3EYxxdddFERBXUR3Qj9B14lXQhhL6YEIoVzNKUoTTPT3RzdMmXqBjqVmUTLN8RwpKFOc740Z67NMzXXXkznLNOpUxsM57R8eZ7OMxwskw58x7Pv8/1+zvltHB6PuxAxqNAcurj53KhrU0CiOcznHez9D3KSdQXyMuvcGySayfsv7BDIqc+zAXFuw4IvpXoOSTSTR7vDOodBThu/rhc8fvXdL1DMYEqVC0g0k0c7yvzTPQgZtvsK06qd63dkk8iXT0KS3BEUzeTRjjKHwva/nNVbvNL7ZXZ/wnMLxovHIUn6BQYsXiTRTB7tKENZ6hw82pm+0RWFsHQC4xkzXhOZ4FaeGbrYVW6FQKKZvOvcjjLC4nHsZT0K6oYgEW06dzm/gN26kWPAK5lDEJtjgE6TJwQJXUGPdpShLP8Zu9U26C4nBq9/ZFkYnzOEMRmDGP1wAOKy9dDNeoKAmZUAGOxeNNh/onN5I+h1mz1ImegHAxCToUPqEoNnc/muCsQG9pLwPd7M0mGHaSl493Xu416JCS6nayEqvQdSZWbw7x+TMnHZgxiV0oOC/GGWGHS04wueQGKqWG+tbHHgJmdwEFj072JygQHy31lRov2GifIJcHMeB8MtTvK6UUzO1VqXvduJxAj9Tif6DTP16g9OXNtFXN3hQIE9TJEaIbHMjI+aXFj0xgmLm7vo+Y3o5QovmwZR3aKrp274v3ZUrbEqm3uncGUPcQ0QVnYQ70pZOJ+kw4jbrfi0RA3Bm3DhNU4vGnVYU6NRUjccdKy5fUJVp7HhD+65538BzgV2kV9oxIuCPryQ0IaxT1qD3gL3RPPbiBWqPlQqO1XUDQcdedtjkxVV67Cy8RNWNgyDolYPGZJ2SM5uAX62GtLyO6BE2Q2lVRoorujALFEtql5rZdT9612bW/RFfhyZFfXrHJLeATvT229lLBNOZtrhYqZs08zYiJXRdJkZTecI09lulGi1YyKnaykyxPgDM7zMXGcSz74AAAAASUVORK5CYII=) no-repeat 0 0;",
          "}",
          "img.usocHome-def {",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oBHgY7AMroD38AAAKrSURBVCiRfZJrTNJRGMb50PrcatWXPnT50nKtT9lszqxMN53mbW55m1hqcwW6vKSGSEQXyktewVuSiCKQgVdsOcJbhoQSiUOqTbGla7WaS0M9T/8/S9Slne13ztl53+c577kwGNs0aceoOCTtCYzWWWO92nCMsT/xLGMf07up23QGwI5/BNNfvrvnQ6aPxdF5ckTzNEup9zWIzZXBn9UIzwQx6p6PUHrs3m5jxtzXnxxmgQLsyv7VBv0suE/frB4IEDgbdZ+WM0X9TlHrIG2wyy14KNEzMoraXXMq4JdV0onLD7Qo7rSTazVGItRMEa5kBGKtHUlCLalWDtMGe+j8MZuD6t5Pu80ibkg6mIJ2lHZNEVatEWwKVs0ocqRm3G2zIY7fTspkeqzlLyz+Xi89u7hDGcdVoVBtXUkVjZCUimFytZLmNUkqH0Ja3Sh4UgMJTpdAZ7C1bDq3rOutKq5ACX6LCckVg4gt1JGEEj3FqzUQV6hDVoMB6ZV6xHIU1OvMqFxi5Quz6kRUEUKzm1duy8dIuKAXl4QvtySCit1TmolPcu2KZ0wpNDqLijE64cCzPsui75UqsEUDCOF1k3B+Dwm/o90IqDU6BrZ4ED6JVc7W3vF5w8QM6JvfSVdyPKrYklLah4A8NQnkaCjaNwIa/zw1kh73wZtZ5aB0ezfdw9GwR+PxQi18M5U4n63aEp8MBaIEXSSeI8eSc7l8k4FHZJE1jKfGKZaMeLGbyem0ZuK1DmhOXm9C4K02ROe20H8h3y3+7JiWB7NqEZSvxvmbSuKXo3Jx4e9IAZpz2UoEczXkYlo9puwfFC6xY/5HqHVyEkeCBL8ORpQRj5hK/I/DkWU4FMhfMJktmPu2EOYysdrsCkXnAETSblTLesgWYA0qh8g7+vFuwuaq4A91HwO1MvJwcQAAAABJRU5ErkJggg==) no-repeat 0 0;",
          "}",

          "img.usocTopic {",
            "vertical-align: middle;",
            "cursor: pointer;",
            "margin: 2px 2px 3px 0;",
          "}",

          "img.usocTopic-nix,",
          "img.usocTopic-osx,",
          "img.usocTopic-win,",
          "img.usocTopic-aero,",
          "img.usocTopic-def",
          "{",
            "background: transparent url(data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEAAAEALAAAAAAQABAAAAIgjI+py+1vgJxy0QsUpkoGEADBpGzTYkKBpBpAC8fyUgAAOw==) no-repeat 0 0;",
            "width: 16px;",
            "height: 16px;",
            "margin-right: 5px;",
            "background-color: #0c0;",
            "-moz-border-radius: 3px;",
            "border-radius: 3px;",
          "}",

          "img.usocTopic-osx {",
            "background-color: #000;",
          "}",

          "input.usocButton {",
            "float: right;",
            "vertical-align: middle;",
            "margin: -2px 5px;",
            "font: normal normal 12px sans-serif;",
          "}",

          "input.usocButton-click {",
            "color: #a9a9a9;",
          "}",

          "img.usocClose {",
            "float: right;",
            "vertical-align: middle;",
            "margin: 2px 1px;",
            "cursor: pointer;",
          "}",

          "img.usocClose-nix,",
          "img.usocClose-osx,",
          "img.usocClose-win,",
          "img.usocClose-aero,",
          "img.usocClose-def",
          "{",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAASdJREFUOMvNk79OwzAQxvOgSWwnpiNsSRviNP8a2qIsbDwDDCAKElWpgCIYeAKGShQxYr/C9VzI0IpUESwdvPj8/e6+72QDAIz/HGO3AIRZBeXk0+G0vfmQEMvTNeaSvBaAwvnl6BxEHCjq2HF1Tx1TBMKXF1dn4O7Rt20TeFo8vruGJBMrSCXW4DDqSMbJ/tYMmGtFWS9W908TKAaZilNRiRXldrtRiGilOyz76gEht5MRJLlQ6L3TeAsIEMdlX86epzCe3kA3CSV1Tb8RwOG2yItEvrzOYFgWEu2sLASh9ytk3T+GGKeRfMTOvaNUIQxDtMXhT4jfEHpQC+At9qE9664Y2NoaMcQvDUHoe/0EDjl1W2yBXYPNUW1q+libY+1kh//CX84SDD3ELbsLGMYAAAAASUVORK5CYII=) no-repeat 0 0;",
            "width: 16px;",
            "height: 16px;",
          "}",

          "img.usocCloseall {",
            "float: right;",
            "vertical-align: middle;",
            "margin: 1px 3px;",
            "cursor: pointer;",
          "}",

          "img.usocCloseall-nix,",
          "img.usocCloseall-osx,",
          "img.usocCloseall-win,",
          "img.usocCloseall-aero,",
          "img.usocCloseall-def",
          "{",
            "background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAV5JREFUOI2lks1OwkAUhfug0E5/ZKm7FioDLT8VMd248xl0oRFNJEhUjC58AhckYlw68wrjuf0xNS1IdHEySe+c7957pppSStsk5hhqkzaat4Fvc6lyih8Aw6wnFy2HfZ85wDDSmmkbxbMMgCJ8+IC5yQNfY5YO1RIA5FIN5oG9w8oA6ggtLyZnCmYJc0DmTNznnji/PFUwv5rO+glcMk9vr1TY5zkkMRO43WkJmHdzYylE066TOv1hIO8eZyo67Mugx3OzZI7e/PUVslW643gk7wG5mU1UOOASu7eYXat8pYJZzwH8KB6JxdNcTefXqhu2Bcye33a1Kkg6PjJIATofRKF4flmocRwJrJOsAHMBwqoBkBv0OuIBnYcHPQkYQtT5fhZiCmF71KgEcBom6Z12pq4ILEhCyp4RIX4SBOY3+j/KE1gG6cRumCtc8IsXdFYjeagtUTteG+Jf9W/AFyNMZkOV6oyPAAAAAElFTkSuQmCC) no-repeat 0 0;",
            "width: 16px;",
            "height: 16px;",
          "}",

          "div.usocMessage {",
            "background-color: #ff9;",
            "background-image: -moz-linear-gradient(top, #ffd, #ff9, #dd8);",
            "padding: 4px 2px;",
            "border-bottom: 1px black solid;",
            "font-weight: bold;",
            "width: 100%;",
            "border-radius: 0;",
            "margin: 0 !important;",
          "}",

          "div.usocMessage span {",
            "font-weight: normal;",
            "margin-left: 0.5em;",
          "}",

          "div.usocMessage-osx {",
            "background-color: #ddd;",
            "background-image: -moz-linear-gradient(top, #999 1%, #ddd 25%, #ddd);",
            "font-weight: bold;",
          "}",

          "div.usocMessage-osx span {",
            "font-weight: normal;",
            "margin-left: 0.5em;",
          "}"

        ].join("\n")
      );

      var bodyNodes = document.getElementsByTagName("body");

      if (bodyNodes.length == 1) {
        var thisNode = bodyNodes[0];

        var usocNode = document.getElementById("usoc") || document.createElement("div");
        usocNode.id = "usoc";
        usocNode.setAttribute("style", "text-align: left;");
        thisNode.insertBefore(usocNode, thisNode.firstChild);

          var containerNode = document.createElement("div");
          addClass(containerNode, "usocMessage");

            var clear = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

            var iconNode = document.createElement("img");
            addClass(iconNode, "usocIcon");
            iconNode.alt = iconNode.title = usoCheckup.updaterMeta["name"];
            iconNode.src = clear;
            containerNode.appendChild(iconNode);

            var homeNode = document.createElement("img");
            addClass(homeNode, "usocHome");
            homeNode.alt = homeNode.title = usoCheckup.strings("showConfirm");
            homeNode.src = clear;

            containerNode.appendChild(homeNode);

            if (usoCheckup.updateUrl["topic"] != "") {
              var topicNode = document.createElement("img");
              addClass(topicNode, "usocTopic");
              topicNode.alt = topicNode.title = usoCheckup.strings("topicConfirm");
              topicNode.src = clear;

              containerNode.appendChild(topicNode);
            }

            var closeallNode = document.createElement("img");
            addClass(closeallNode, "usocCloseall");
            closeallNode.alt = closeallNode.title = usoCheckup.strings("closeAllMessages");
            closeallNode.src = clear;

            containerNode.appendChild(closeallNode);

            var closeNode = document.createElement("img");
            addClass(closeNode, "usocClose");
            closeNode.alt = closeNode.title = usoCheckup.strings("closeMessage");
            closeNode.src = clear;

            containerNode.appendChild(closeNode);

            if (method) {
              var buttonNode = document.createElement("input");
              addClass(buttonNode, "usocButton");
              buttonNode.type = "button";

              if (method == "show")
                buttonNode.value = usoCheckup.strings("showConfirm");
              else
                buttonNode.value = usoCheckup.strings( ((usoCheckup.updateUrl["default"] == "update") ? "install" : usoCheckup.updateUrl["default"]) + "Confirm");

              containerNode.appendChild(buttonNode);
            }

            var textNode = document.createTextNode(message);
            containerNode.appendChild(textNode);

            var spanNode = document.createElement("span");
            spanNode.textContent = delta;
            containerNode.appendChild(spanNode);

            if (usoCheckup.updateUrl["topic"] != "")
              addClass(topicNode, "usocTopic-def");

            if (window.navigator.platform.match(/Linux/i)) {
              addClass(iconNode, "usocIcon-nix");
              addClass(homeNode, "usocHome-nix");
            }
            else if (window.navigator.platform.match(/Win32/i)) {
              addClass(iconNode, "usocIcon-nix");

              if (window.navigator.oscpu.match(/6\.1/i))
                addClass(homeNode, "usocHome-aero");
              else
                addClass(homeNode, "usocHome-win");
            }
            else if (window.navigator.platform.match(/(?:Mac|iPhone)/i)) {
              addClass(containerNode, "usocMessage-osx");
              addClass(iconNode, "usocIcon-osx");
              addClass(homeNode, "usocHome-osx");
              addClass(topicNode, "usocTopic-osx");
            }
            else {
              addClass(containerNode, "usocMessage-def");
              addClass(iconNode, "usocIcon-def");
              addClass(homeNode, "usocHome-def");
              addClass(topicNode, "usocTopic-def");
            }
            addClass(closeallNode, "usocCloseall-def");
            addClass(closeNode, "usocClose-def");


          usocNode.appendChild(containerNode);

          iconNode.addEventListener("click", function() {
            usoCheckup.openUrl("http://userscripts.org/guides/24", true);
          }, false);

          homeNode.addEventListener("click", function() {
            usoCheckup.openUrl(usoCheckup.updateUrl["show"], true);
          }, false);

          if (usoCheckup.updateUrl["topic"] != "")
            topicNode.addEventListener("click", function() {
              usoCheckup.openUrl(usoCheckup.updateUrl["topic"], true);
            }, false);

          closeallNode.addEventListener("click", function() {
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
          }, false);

          closeNode.addEventListener("click", function() {
            this.parentNode.parentNode.removeChild(this.parentNode);
          }, false);

          if (method == "show")
            buttonNode.addEventListener("click", function() {
              addClass(this, "usocButton-click");
              this.title = this.value;
              usoCheckup.openUrl(usoCheckup.updateUrl["show"]);
            }, false);
          else
            switch (usoCheckup.updateUrl["default"]) {
              case "update":
                buttonNode.addEventListener("click", function() {
                  addClass(this, "usocButton-click");
                  this.title = this.value;
                  var remoteVersion = parseInt(usoCheckup.lastValueOf("version", details.remoteMeta["uso"]));
                  usoCheckup.openUrl(usoCheckup.updateUrl["install"].replace(/\/source\/(\d+)\.user\.js$/, "/version/$1/" + remoteVersion + ".user.js"));
                }, false);
                break;
              default:
                buttonNode.addEventListener("click", function() {
                  addClass(this, "usocButton-click");
                  this.title = this.value;
                  usoCheckup.openUrl(usoCheckup.updateUrl[usoCheckup.updateUrl["default"]]);
                }, false);
                break;
            }
      }
    };
  }
})();
