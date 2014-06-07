// ==UserScript==
// @name        MusicBrainz: Copyable artist credits
// @namespace   http://userscripts.org/users/266906
// @version     2013-11-19
// @author      Michael Wiencek
// @include     *://musicbrainz.org/*
// @include     *://beta.musicbrainz.org/*
// @include     *://test.musicbrainz.org/*
// @match       *://musicbrainz.org/*
// @match       *://beta.musicbrainz.org/*
// @match       *://test.musicbrainz.org/*
// @exclude     *://musicbrainz.org/ws/*
// @exclude     *://beta.musicbrainz.org/ws/*
// @exclude     *://test.musicbrainz.org/ws/*
// ==/UserScript==
//**************************************************************************//

var scr = document.createElement("script");
scr.textContent = "$(" + copyableArtistCredits + ");";
document.body.appendChild(scr);

function copyableArtistCredits() {
    var singleAutocomplete = document.getElementById("entity-artist");

    if (!MB.Control.release_tracklist && !singleAutocomplete) {
        return;
    }

    var buttonHTML = '\
        <div class="buttons">\
          <button type="button" data-bind="click: copy">Copy artist credit</button>\
          <button type="button" data-bind="click: paste">Paste artist credit</button>\
        </div>\
    ';

    var trackButtonHTML = '\
        <tr>\
          <td colspan="4">\
            <div class="buttons">\
              <button type="button" data-bind="click: copy">Copy artist credit</button>\
              <button type="button" data-bind="click: paste">Paste artist credit</button>\
              <label>\
                <input type="checkbox" data-bind="checked: updateIdentical" />\
                Update all identical artists credits\
              </label>\
            </div>\
          </td>\
        </tr>\
    ';

    var viewModel = {

        copy: function (data) {
            var names = data.artistCredit.toJS();

            if (names.length === 0) {
                names.push({});
            }
            localStorage.copiedArtistCredit = JSON.stringify(names);
        },

        paste: function (data) {
            var names = JSON.parse(localStorage.copiedArtistCredit || "[{}]");
            data.artistCredit.setNames(names);
        },

        updateIdentical: ko.observable(false)
    };

    function getIdentical(ac) {
        var disc, tracks, track, otherAC, identical = [];

        for (var i = 0; disc = discs[i]; i++) {
            tracks = disc.tracks;

            for (var j = 0; track = tracks[j]; j++) {
                otherAC = track.artist_credit;

                if (_.isEqual(ac._previousJSON, otherAC._previousJSON)) {
                    identical.push(otherAC);
                }
            }
        }
        return identical;
    }

    function updateIdentical(json) {
        if (viewModel.updateIdentical.peek()) {
            var identical = getIdentical(this), otherAC;

            for (var i = 0; otherAC = identical[i]; i++) {
                if (otherAC !== this) {
                    ignoreChanges(otherAC);

                    otherAC.setNames(_.map(json, _.clone));
                    otherAC._previousJSON = json;

                    watchForChanges(otherAC);
                }
            }
        }
        this._previousJSON = json;
    }

    function watchForChanges(ac) {
        ac._previousJSON = ac.toJS();
        ac._jsonComputed = ko.computed({ read: ac.toJS, owner: ac }).extend({ throttle: 100 });
        ac._updateIdenticalSubscription = ac._jsonComputed.subscribe(updateIdentical, ac);
    }

    function ignoreChanges(ac) {
        ac._jsonComputed.dispose();
        ac._updateIdenticalSubscription.dispose();

        ac._jsonComputed = null;
        ac._updateIdenticalSubscription = null;
    }

    function makeTracksCopyable() {
        var disc, tracks, track, vm, ac;

        for (var i = 0; disc = discs[i]; i++) {
            tracks = disc.tracks;

            for (var j = 0; track = tracks[j]; j++) {
                if (!track._copyableAC) {
                    makeCopyable(track.$acrow.find("tbody"), trackButtonHTML, track.artist_credit);

                    watchForChanges(track.artist_credit);

                    track._copyableAC = true;
                }
            }
        }
    }

    function makeCopyable($container, html, ac) {
        var $newRow = $($.parseHTML(html)).filter("tr, div");

        $container.append($newRow);

        var vm = _.extend({ artistCredit: ac }, viewModel);

        ko.applyBindings(vm, $newRow[0]);
    }

    if (MB.Control.release_tracklist) {
        var discs = MB.Control.release_tracklist.discs;
        window.setInterval(makeTracksCopyable, 1000);

    } else if (singleAutocomplete) {
        makeCopyable($("div.artist-credit.bubble:eq(0)"), buttonHTML, ko.dataFor(singleAutocomplete));
    }
}
