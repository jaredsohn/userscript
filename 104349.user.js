// ==UserScript==
// @name        MusicBrainz: View recording/work/release relationships on release pages
// @namespace   http://userscripts.org/users/266906
// @version     2012-10-09
// @author      Michael Wiencek
// @include     *://musicbrainz.org/release/*
// @include     *://beta.musicbrainz.org/release/*
// @include     *://test.musicbrainz.org/release/*
// @match       *://musicbrainz.org/release/*
// @match       *://beta.musicbrainz.org/release/*
// @match       *://test.musicbrainz.org/release/*
// ==/UserScript==
//**************************************************************************//

var scr = document.createElement("script");
scr.textContent = "(" + relationships + ")();";
document.body.appendChild(scr);

function relationships() {

    var RELEASE_MBID = window.location.pathname.match(/\/release\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);
    if (RELEASE_MBID == null) {
        return;
    }
    RELEASE_MBID = RELEASE_MBID[1];

    // Set these to false to remove them from the UI!
    var SHOW_CREDITS_AT_BOTTOM_CHECKBOX = true,
        ORGANIZE_BY_ENTITY_BUTTON = true,
        INLINE_LYRICS_ICONS = true,
        SHOW_ISWCS = true;

    if (!Object.keys) Object.keys = function(o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on non-object');
        var ret = [], p;
        for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
        return ret;
    };

    var ENTITIES = {},
        RELATIONSHIPS = {},
        track_strings = [],
        MBID_REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
        LYRICS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAARUlEQVR42mNggIJl07v/NxSl4cQMuABI8tOHt1gxzFC8GkGKYBim8eb5g7g147MRhvFqRLYR3fZRG0m1kVDKAWGQGph6AM0hS7dSDzUGAAAAAElFTkSuQmCC",
        viewmode = readCookie("trackrelsview"),
        bottommode = readCookie("trackrelsbtm"),
        $bottom = $("<div></div>").appendTo("#content"),
        RELATION_TYPES = {
            "parts": "part of",
            "secondhandsongs": "SecondHandSongs",
            "songfacts": "Songfacts",
            "allmusic": "Allmusic",
            "wikipedia": "Wikipedia"
        };

    var colspan = parseInt($("tr.subh").eq(0).children("td").eq(1).attr("colspan"));
    $("tr.subh").children("td:nth-child(2)").attr("colspan", colspan + 1);
    delete colspan;
    var $track_tds = $("tr[typeof=mo\\:Track]").children("td:nth-child(2)")
        .after('<td class="url-icons"></td>');

    var title_col = $("span[property=dct\\:title\\ rdfs\\:label]:eq(0)").parent().index();
    $("th:eq(" + title_col + ")").attr("colspan", "2");
    delete title_col;

    $track_tds.children("br").remove();

    if (SHOW_CREDITS_AT_BOTTOM_CHECKBOX) {
        $("#hide-credits").parent().html(
            $('<label></label>').append(
                $('<input type="checkbox"/>').click(function() {
                    if (viewmode == "inline") {
                        $("div.ars").hide();
                        viewmode = "bottom";
                        createCookie("trackrelsview", "bottom", 1000);
                    } else if (viewmode == "bottom") {
                        $("div.ars").show();
                        viewmode = "inline";
                        createCookie("trackrelsview", "inline", 1000);
                    }
                    showBottomRelationships();
                }).attr("checked", viewmode == "bottom"),
                " Show credits at bottom"));
    } else {
        $("#hide-credits").parent().remove();
    }

    $("div.ars").css("margin-bottom", "0.3em");
    $("dl.ars").css({"margin-left": "1em", "line-height": "1.1em"});
    $("dl.ars dd").css("margin", "0");
    $("dl.ars dt").css("clear", "none");

    bottommode == null && (bottommode = "relationship");

    if (viewmode == null) {
        viewmode = "inline";
        createCookie("trackrelsview", viewmode, 1000);
    } else if (viewmode == "bottom") {
        $("div.ars").hide();
    }

    if (viewmode == "inline") {
        $("div.ars").show();
    }

    var $no_release_rels = $("h2.relationships + p");

    requestRelationships();

    function showBottomRelationships() {
        $("table.details").remove();
        $bottom.children().remove();

        var relationship_mode = bottommode == "relationship",
            release_level_only = viewmode == "inline";

        function addItemLink($container, data) {
            var parts = data.split("\n"),
                item = parts[0],
                date = parts[1],
                info_link = parts[2],
                edit_link = parts[3],
                remove_link = parts[4],
                mp = parts[5] == "true";

            if (relationship_mode) {
                var entity = ENTITIES[item],
                    $link = $(entity.link)
                        .css("white-space", "nowrap")
                        .appendTo($container);
                mp && $link.filter("a").wrap('<span class="mp"></span>');
                info_link && $container.append(
                    $('<span style="font-size: 0.9em">&#160;[</span>').append(
                        $("<a></a>").attr("href", info_link).text("info"), "]"));
            } else {
                mp && (item = '<span class="mp">' + item + '</span>');
                $container.append(item);
            }

            if (date) {
                var $elem = $("<span></span>")
                    .css({"color": "#555", "font-size": "0.9em"})
                    .html("(" + date.replace(/ /g, "&#160;") + ")");
                $container.append("&#160;", $elem);
            }

            if (edit_link && remove_link) {
                $container.append("&#160;",
                    $('<span style="font-size: 0.9em">[</span>').append(
                        $("<a></a>").attr("href", edit_link).text("edit"),
                        "&#160;|&#160;",
                        $("<a></a>").attr("href", remove_link).text("remove"), "]"));
            }
        }

        var entity_types = ["artist", "recording", "work", "release", "release-group", "url"],
            table_count = 0,
            no_release_rels = true;

        for (var i = 0; i < entity_types.length; i++) {
            var entity_type = entity_types[i],
                relationships = RELATIONSHIPS[entity_type];

            if (!relationships) continue;

            var $table = $("<table></table>"),
                relationships = relationship_mode ? relationships["type"] : relationships["entity"],
                sections = Object.keys(relationships).sort();

            for (var j = 0; j < sections.length; j++) {
                var section = sections[j],
                    rels = relationships[section],
                    release_items = [],
                    tracks_by_item = {},
                    items_by_tracks = {};

                var $hcell = $("<th></th>").css("text-align", "right"),
                    $tcell = $("<td></td>"),
                    $trow = $("<tr></tr>").append($hcell, $tcell);

                entity_type == "url" && $hcell.css({"min-width": undefined, "white-space": "nowrap"});
                if (relationship_mode) {
                    $hcell.append(section);
                } else {
                    var entity = ENTITIES[section],
                        $link = $(entity.link).css("white-space", "nowrap");
                    $hcell.append($link);
                    entity.info_link && $hcell.append("&#160;[", $("<a></a>").attr("href", entity.info_link).text("info"), "]");
                }
                $hcell.append(":");

                $.each(rels, function(i, rel) {
                    var item = [(relationship_mode ? rel.target.mbid : rel.name),
                                 rel.date || "",
                                 rel.target.info_link || "",
                                 rel.edit_link || "",
                                 rel.remove_link || "",
                                 rel.mp || ""].join("\n");

                    if (rel.entity.type == "release") {
                        release_items.push(item);
                        return;
                    }
                    if (release_level_only) return;

                    item in tracks_by_item
                        ? (tracks_by_item[item].indexOf(rel.track) == -1 && tracks_by_item[item].push(rel.track))
                        : tracks_by_item[item] = [rel.track];
                });

                if (release_level_only && release_items.length == 0) {
                    continue;
                }

                $.each(tracks_by_item, function(item, tracks) {
                    var str = trackNumbersToString(tracks);
                    str in items_by_tracks
                        ? items_by_tracks[str].push(item)
                        : items_by_tracks[str] = [item];
                });

                var delimeter = entity_type == "url" ? "<br>" : ", ",
                    track_keys = Object.keys(items_by_tracks);

                $.each(track_keys, function(i, tracks) {
                    var items = items_by_tracks[tracks],
                        nums = tracks_by_item[items[0]];
                    tracks = tracks.replace(/-/g, "&#8211;");

                    $.each(items, function(i, item) {
                        addItemLink($tcell, item);
                        (i < items.length - 1) && $tcell.append(delimeter);
                    });

                    $tcell.append("\u00A0");
                    var $track_span = $("<span></span>")
                        .addClass("small")
                        .css({"font-style": "normal", "white-space": "nowrap", "cursor": "default"})
                        .html("(" + tracks + ")")
                        .appendTo($tcell);

                    $track_span
                        .bind("mouseover", (function(nums, $track_span, color) {
                            return function() {highlightTracks(nums, $track_span, color);};
                        })(nums, $track_span, "LemonChiffon"))
                        .bind("mouseout", (function(nums, $track_span, color) {
                            return function() {highlightTracks(nums, $track_span, color);};
                        })(nums, $track_span, ""));

                    (i < track_keys.length - 1 || release_items.length > 0) && $tcell.append(delimeter);
                });

                $.each(release_items, function(i, release_item) {
                    addItemLink($tcell, release_item);
                    (i < release_items.length - 1) && $tcell.append(delimeter);
                });

                $table.append($trow);
            }

            // Table layout courtesy of kepstin
            if ($table.children().length > 0) {
                no_release_rels = false;
                $no_release_rels.hide();
                table_count += 1;
                if (table_count == 1) {
                    var $h2 = $("h2.relationships");
                    if ($h2.length == 0) $h2 = $("<h2>Relationships</h2>");
                    $h2.css({"display": "inline-block", "margin-right": "0.5em"});
                    $bottom.append($("<div></div>").append($h2, ORGANIZE_BY_ENTITY_BUTTON ? (
                        $("<button></button>")
                            .css({
                                "color": "#565656",
                                "background-color": "#F0F0F0",
                                "border": "1px solid #D0D0D0",
                                "border-top": "1px solid #EAEAEA",
                                "border-left": "1px solid #EAEAEA",
                                "padding": "1px",
                                "margin": "4px"
                            })
                            .text(bottommode == "relationship" ? "Organize by entity" : "Organize by relationship")
                            .click(function() {
                                $(this).text("Organize by " + bottommode);
                                bottommode = bottommode == "relationship" ? "entity" : "relationship";
                                createCookie("trackrelsbtm", bottommode, 1000);
                                showBottomRelationships();
                            })
                    ) : null));
                }
                $table.addClass("details")
                    .css({"margin-top": "1.5em", "width": "100%"})
                    .appendTo($bottom);
            }
        }

        no_release_rels && $no_release_rels.show();
    }

    function highlightTracks(nums, $track_span, color) {
        $track_span.css("background-color", color);
        for (var i = 0; i < nums.length; i++) {
            $track_tds.eq(nums[i] - 1)
                .find("a[rel=mo\\:publication_of]")
                .css("background-color", color);
        }
    }

    var WORK_RELS = {}, PERFORMANCE_DATES = {};

    function requestRelationships() {
        var url = "/ws/2/release/" + RELEASE_MBID + "?inc=recordings+recording-level-rels+work-level-rels+label-rels+url-rels+work-rels";

        $.get(url, function(data) {
            var $doc = $(data),
                $recordings = $doc.find("recording"),
                $release = $doc.find("release"),
                total_discs = parseInt($release.children("medium-list").attr("count")),
                current_disc = total_discs > 1 ? 1 : "",
                current_track = 1;

            $.each($recordings, function(i, rec) {
                var $rec = $(rec),
                    mbid = $rec.attr("id"),
                    disc = parseInt($rec.parents("medium").children("position").text());
                if (current_disc && disc > current_disc) {
                    current_disc++;
                    current_track = 1;
                }
                track_strings[i] = (current_disc && (current_disc.toString() + ".")) + current_track.toString();
                current_track++;

                if (mbid in ENTITIES) return;

                var title = $rec.children("title").text(),
                    entity = new Entity(title, mbid, "recording", "", "", null),
                    $work_rels = $rec.children("relation-list[target-type=work]").children("relation");

                $.each($work_rels, function(j, work_rel) {
                    var $work_rel = $(work_rel),
                        $work = $work_rel.children("work"),
                        work_id = $work.attr("id"),
                        work = parseEntity($work, work_id, "work"),
                        $rel_lists = $work.children("relation-list[target-type=work],relation-list[target-type=url]");
                    var begin = $work_rel.children("begin").text(),
                        end = $work_rel.children("end").text(),
                        date = "";
                    if (begin && !end) date = begin + " – present";
                    else if (!begin && end) date = "until " + end;
                    else if (begin && end) date = begin == end ? begin : begin + " – " + end;
                    PERFORMANCE_DATES[mbid + work_id] = date;
                    $.each($rel_lists, function(k, list) {
                        parseRelationList(list, work, i + 1);
                    });
                });
            });

            parseServerRelationships();
            showBottomRelationships();
        });
    }

    function parseRelationList(node, entity, track) {
        var $node = $(node),
            $relations = $node.children("relation"),
            target_type = $node.attr("target-type");

        $.each($relations, function(i, rel) {
            parseRelation(rel, target_type, entity, track);
        });
    }

    var WORK_URL_COLUMN = false;

    function parseRelation(node, target_type, entity, track) {
        var $rel = $(node),
            rel_type = $rel.attr("type").toLowerCase(),
            target = $rel.children("target").text();

        if (INLINE_LYRICS_ICONS && track && rel_type == "lyrics") {
            $track_tds.eq(track - 1).next("td.url-icons").append(
                $("<a></a>")
                    .attr("href", target)
                    .append($("<img/>")
                        .attr({"src": LYRICS_ICON, "alt": "Lyrics"})));
            return;
        }

        var attrs = [],
            $target_entity = $rel.children(target_type),
            end_date = $rel.children("end").text(),
            direction = $rel.children("direction").text(),
            date = $rel.children("begin").text() + (end_date ? " – " + end_date : "");

        $.each($rel.children("attribute-list").children("attribute"), function(i, attr) {
            attrs.push($(attr).text().toLowerCase());
        });

        rel_type = RELATION_TYPES[rel_type] || rel_type;
        rel_type == "other version" && (
            direction == "backward"
            ? (rel_type = "original version")
            : (rel_type = "later version"));
        target = parseEntity($target_entity, target, target_type);
        var rel = new Relationship(attrs, rel_type, entity, target, date, track);

        if (entity.type == "work") {
            var key = $track_tds.eq(track - 1).find("a[rel=mo\\:publication_of]")
                .attr("href").match(MBID_REGEX)[0] + entity.mbid;
            WORK_RELS[key]
                ? WORK_RELS[key].push(rel)
                : WORK_RELS[key] = [rel];
        }
    }

    function parseEntity($node, target, type) {
        if (target in ENTITIES) {
            return ENTITIES[target];
        }
        // Unlike entities which have MBIDs, the <target>
        // node just contains the URL.
        var name = (type == "url" ? target : $node.children("title").text() || $node.children("name").text()),
            comment = $node.children("disambiguation").text(),
            iswc = SHOW_ISWCS ? $node.children("iswc").text() : "";
        entity = new Entity(name, target, type, comment, iswc, null);
        return entity;
    }

    function trackNumbersToString(list) {
        var total = list.length;
        if (total == 0) return null;
        list.sort(function(a, b) {return a - b;});
        var last = list[0],
            str = track_strings[last - 1];

        for (var i = 1; i < total; i++) {
            var current = parseInt(list[i]);
            if (current - last == 1) {
                if (str.slice(-1) != "-") str += "-";
                if (i == total - 1) str += track_strings[current - 1];
            } else {
                if (str.slice(-1) == "-") str += track_strings[last - 1];
                str += ", " + track_strings[current - 1];
            }
            last = current;
        }
        return str;
    }

    function Entity(name, mbid, type, comment, iswc, $link) {
        this.name = name;
        this.mbid = mbid;
        this.type = type;
        this.comment = comment;
        this.iswc = iswc;
        ENTITIES[mbid] = this;

        if ($link) {
            this.link = $link.clone().appendTo("<div></div>").parent().html();
        } else {
            this.link = (
                '<a href="' +
                (type == "url" ? name : "/" + type + "/" + mbid) +
                '">' +
                (type == "url" ? decodeURIComponent(name) : name) +
                '</a>');
        }
        comment && (this.link += ' <span class="comment" style="font-weight:normal">(' + comment + ')</span>');
        iswc && (this.link += ' <span style="color:#555;font-size:0.9em">(' + iswc + ')</span>');
    }

    function Relationship(attrs, type, entity, target, date, track) {
        attrs = attrs.join(" ");
        this.name = (attrs ? attrs + " " : "") + type;
        this.entity = entity;
        this.target = target;
        this.date = date || PERFORMANCE_DATES[entity.mbid + target.mbid] || "";
        this.track = track;

        var by_type = this.name,
            by_entity = this.target.mbid,
            section;

        (section = RELATIONSHIPS[target.type]) || (section = RELATIONSHIPS[target.type] = {"type": {}, "entity": {}});
        section["type"][by_type] || (section["type"][by_type] = []);
        section["type"][by_type].push(this);

        section["entity"][by_entity] || (section["entity"][by_entity] = []);
        section["entity"][by_entity].push(this);
    }

    function parseServerRelationships() {
        var entity_regex = /\/(artist|recording|work|release|release-group)\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/,
            date_regex = /\(([0-9]{4}(?:-[0-9]{2}(?:-[0-9]{2})?)?(?: – [0-9]{4}(?:-[0-9]{2}(?:-[0-9]{2})?)?)?)\)/;

        function splitRelName(text) {
            if (text.match(/ vocals$/)) {
                var result = [],
                    parts = text.split(/(?: and |, )/),
                    attrs = parts[0].match(/^(?:additional |guest |solo )*/)[0];
                parts[0] = parts[0].slice(attrs.length);
                parts.push(parts.pop().slice(0, -7));
                $.each(parts, function(i, vocal) {
                    var pre = $.trim(attrs + vocal);
                    result.push((pre ? pre + " " : "") + "vocals");
                });
                return result;
            }
            var parts = text.split(" and ");
            if (parts.length == 1) return parts;
            var parts2 = parts[0].split(/, (?!acoustic upright bass)/);
            parts2.length > 1 ? parts2.push(parts.pop()) : parts2 = parts;
            var attrs = parts2[0].match(/^(?:additional |guest |solo )*/)[0];
            parts2[0] = parts2[0].slice(attrs.length);
            var result = [];
            $.each(parts2, function(i, part) {
                result.push(attrs + $.trim(part));
            });
            return result;
        }

        function parseEntityRels(entity, $rels, track) {
            $.each($rels, function(i, dt) {
                var $dt = $(dt),
                    rel_names = splitRelName($dt.text().slice(0, -1)),
                    $dd = $dt.next("dd"),
                    $links = $dd.find("span.mp a").add($dd.children("a"));

                for (var k = 0; k < $links.length; k++) {
                    var $link = $links.eq(k),
                        name = $link.text(),
                        match = $link.attr("href").match(entity_regex),
                        type = match ? match[1] : "url",
                        mbid = match ? match[2] : $link.attr("href"),
                        target = ENTITIES[mbid];

                    var $next = $link.next("a"),
                        info_link = null, mp = $link.parent().is("span.mp");
                    if ($next.text() == "info" && $next.attr("href").match(/\/url\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/)) {
                        info_link = $next.attr("href");
                        k++;
                    }

                    if (target === undefined) {
                        target = new Entity(name, mbid, type, $link.next("span.comment").text().slice(1, -1), "", $link);
                        info_link && (target.info_link = info_link);
                    }
                    $.each(rel_names, function(i, rel_name) {
                        var rel = new Relationship([], rel_name, entity, target, "", track);
                        rel.mp = mp;
                    });

                    if (type == "work") {
                        var $work_ars = $dd.children("dl.ars"),
                            $work_dts = $work_ars.children("dt"),
                            key = entity.mbid + target.mbid;
                        $work_dts.length > 0 && parseEntityRels(target, $work_dts, track);

                        var date = PERFORMANCE_DATES[key];
                        target.iswc && $link.after("&#160;", $("<span></span>").css({"color": "#555", "font-size": "0.9em"}).text("(" + target.iswc + ")"));
                        date && $link.after("&#160;", $("<span></span>").css({"color": "#555", "font-size": "0.9em"}).text("(" + date + ")"));

                        var rels = WORK_RELS[key];
                        if (!rels) return;
                        var rels_by_name = {};

                        $.each(rels, function(i, rel) {
                            rels_by_name[rel.name]
                                ? rels_by_name[rel.name].push(rel)
                                : rels_by_name[rel.name] = [rel];
                        });

                        $.each(rels_by_name, function(rel_name, rels) {
                            $work_ars.append("<dt>" + rel_name + ":</dt>");
                            var $dd = $("<dd></dd>").css("margin", "0").appendTo($work_ars);

                            $.each(rels, function(i, rel) {
                                var $link = $(rel.target.link);
                                $dd.append($link);
                                rel.date && $dd.append("&#160;",
                                    $("<span></span>")
                                        .css({"color": "#555", "font-size": "0.9em"})
                                        .html("(" + rel.date + ")"));
                                rel.mp && $link.filter("a").wrap('<span class="mp"></span>');
                                (i < rels.length - 1) && $dd.append(", ");
                            });
                        });
                    }
                }
            });
        }

        $.each($track_tds, function(i, track_td) {
            var $track_td = $(track_td),
                mbid = $track_td.find("a[rel=mo\\:publication_of]")[0].href.match(MBID_REGEX)[0],
                $rels = $track_td.find("div.ars").children("dl.ars").children("dt");
            parseEntityRels(ENTITIES[mbid], $rels, i + 1);
        });

        var release_entity = new Entity("", RELEASE_MBID, "release", "", "", null);

        $.each($("table.details").find("th"), function(i, th) {
            var $th = $(th),
                rel_names = splitRelName($th.text().slice(0, -1)),
                $span = $th.next("td").children("span");

            $.each($span, function(i, span) {
                var $span = $(span),
                    $link = $span.find("span.mp a").add($span.children("a")),
                    date = $span.text().match(date_regex) || "",
                    comment = $span.children("span.comment").text().slice(1, -1);
                date && (date = date[1]);

                var name = $link[0].textContent,
                    match = $link[0].href.match(entity_regex),
                    type = match ? match[1] : "url",
                    target = match ? match[2] : $link[0].href;

                target = ENTITIES[target] || new Entity(name, target, type, comment, "", $link.eq(0));
                var mp = $link.eq(0).parent().is("span.mp");

                var $edit_links = $span.children("span").last().children("a"),
                    remove_link = $edit_links.eq(0).attr("href"),
                    edit_link = $edit_links.eq(1).attr("href");
                target.info_link = $link.eq(1).attr("href");

                $.each(rel_names, function(i, rel_name) {
                    var rel = new Relationship([], rel_name, release_entity, target, date, null);
                    rel.remove_link = remove_link;
                    rel.edit_link = edit_link;
                    rel.mp = mp;
                });
            });
        });
    }

    // createCookie and readCookie:
    // from http://www.quirksmode.org/js/cookies.html

    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}
