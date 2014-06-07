// ==UserScript==
// @name        MusicBrainz: Guess feat. credits
// @description Adds buttons to guess feat. credits in the release editor.
// @namespace   http://userscripts.org/users/266906
// @author      Michael Wiencek <mwtuea@gmail.com>
// @version     2014-02-18
// @license     GPL
// @include     *://musicbrainz.org/release/*/edit*
// @include     *://musicbrainz.org/release/add*
// @include     *://*.musicbrainz.org/release/*/edit*
// @include     *://*.musicbrainz.org/release/add*
// @match       *://musicbrainz.org/release/*/edit*
// @match       *://musicbrainz.org/release/add*
// @match       *://*.musicbrainz.org/release/*/edit*
// @match       *://*.musicbrainz.org/release/add*
// ==/UserScript==

var scr = document.createElement("script");
scr.textContent = "(" + guessFeatCredits + ")();";
document.body.appendChild(scr);

function guessFeatCredits() {

    var featRegex = /(.+?)\(?(?:feat\.|featuring |ft\.)([^\(\)]+)\)?(.*)/i;

    $("head").append("\
    <style>\
        table.medium.tbl td.icon {\
            width: 56px !important;\
            text-align: left !important;\
        }\
        button.guesscase-feat {\
            margin-left: 3px;\
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEU\
gAAABAAAAAQCAYAAAAf8/9hAAAA9UlEQVR42p2TQQqDMBBFcwSP4A28iHu9h3sP4F6v48JVd+JCKL\
RQ0F3Blra2osZpfmCKtGLVgUnImP/8GRIRRdEpDMPLllTao1DDnTYGIALD94dhGKht2yWA8xTglWU\
ZxXF867puPcB1XSmEIGSapuR53iqAFtd1rRdlWWrQYoDjOD0EpmmSbdtkGAaN138BVVVpgfqzhIsk\
SYgdsas5wIDuQ4AZURTF5whcwyylnHbAAN6Q5/kOxxgDEE3TTAKealM1BnATIeBaEATk+/4yBwg0E\
DV2YlmWrs1dpJ/o+37VTfwL4hvKgMfWx6Qe4hWAA0gbc/8GE9hYh1Usjx0AAAAASUVORK5CYII=);\
        }\
    </style>");

    $("body").on("click", "button.guesscase-feat", function (event) {
        parseFeatCredit(ko.dataFor($(event.target).parents("tr.track")[0]));
    });

    function checkTrack(track) {
        var $icons = $("td.icon", "#" + track.elementID);

        if ($icons.children(".guesscase-feat").length === 0) {
            $("<button>")
                .attr("type", "button")
                .addClass("icon guesscase-feat")
                .insertAfter($icons.find("button.guesscase-track"));
        }
    }

    function checkMedium(medium) {
        if (medium.loaded()) _(medium.tracks()).each(checkTrack);
    }

    var addedButton = false;

    MB.releaseEditor.utils.withRelease(function (release) {
        if (!addedButton) {
            addedButton = true;

            // Firefox ew
            _.delay(function () {
                $("<button>Guess feat. credits</button>")
                    .attr("type", "button")
                    .css({ float: "right", clear: "both", marginTop: "7px" })
                    .on("click", parseAllFeatCredits)
                    .appendTo("fieldset.guesscase .buttons");
            }, 100);
        }
        _(release.mediums()).each(checkMedium);
    });

    function parseAllFeatCredits() {
        _(MB.releaseEditor.rootField.release().mediums())
            .invoke("tracks").flatten().each(parseFeatCredit);
    }

    function parseFeatCredit(track) {
        var name = track.name.peek();
        var match = name.match(featRegex);

        if (!match) return;

        var newName = _.str.trim(match[1]);
        var artist = _.str.trim(match[2]);

        var eti = _.str.trim(match[3]);
        if (eti) newName += " " + eti;

        track.name(newName);

        var newCredits = track.artistCredit.toJSON();
        _.last(newCredits).joinPhrase = " feat. ";

        // look for collaborations
        var collabs = artist.split(/(,? (?:&|and|et) |, | vs\. )/);

        for (var i = 0, len = collabs.length; i < len; i += 2) {
            newCredits.push({ name: collabs[i], joinPhrase: collabs[i + 1] || "" });
        }

        track.artistCredit.setNames(newCredits);
    }
}
