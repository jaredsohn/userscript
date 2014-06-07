// ==UserScript==
// @name        MusicBrainz: Relate to MBID
// @namespace   http://userscripts.org/users/266906
// @version     2011-12-27
// @author      Michael Wiencek
// @include     http://musicbrainz.org/*
// @include     http://beta.musicbrainz.org/*
// @include     http://test.musicbrainz.org/*
// ==/UserScript==
//**************************************************************************//

var scr = document.createElement("script");
scr.textContent = "(" + relate_to_mbid + ")();";
document.body.appendChild(scr);

function relate_to_mbid() {
    var $relate = $("div.relate-to");
    if ($relate.length == 0)
        return;

    var $link = $("a[href=#relate_to]"),
        $select = $relate.find("select:first"),
        $span = $relate.find("span.autocomplete"),
        $input = $span.find("input.name"),
        $gid = $span.find("input.gid"),
        MBID_REGEX = /(?:.*musicbrainz\.org\/([a-z\-]+)\/)?([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*/;

    $link.bind("click", function() {
        setTimeout(function() {
            $input.focus().select();
        }, 1);
    });

    $input.bind("input", function(event) {
        var match = this.value.match(MBID_REGEX);
        if (match == null)
            return;

        event.preventDefault();
        $input.blur();
        $("ul.ui-autocomplete").trigger("close");

        var type = $relate.find("option:selected").val(),
            entity = match[1] || type,
            mbid = match[2];

        var url = "/ws/2/" + entity + "/" + mbid;

        $.get(url, function(xml) {
            if (entity != type) {
                $select.val(entity).trigger("change");
            }
            var namename = "title";
            if (entity == "artist" || entity == "label") namename = "name";

            var name = $(xml).find(entity).children(namename).text(),
                item = {name: name, gid: mbid};

            $gid.val(mbid);
            $input.val(name)
                  .blur()
                  .removeClass("error")
                  .addClass("lookup-performed")
                  .data("lookup-result", item)
                  .trigger("lookup-performed", item);
            $("ul.ui-autocomplete").trigger("close");
        });
    });
}
