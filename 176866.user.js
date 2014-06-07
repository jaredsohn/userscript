// ==UserScript==
// @name           MusicBrainz: Recording-release info & merge helper
// @version        2013-08-30
// @author         th1rtyf0ur
// @license        GPL
// @namespace  http://userscripts.org/scripts/176866
// @include        *://musicbrainz.org/artist/*/recordings*
// @include        *://*.musicbrainz.org/artist/*/recordings*
// @include        *://musicbrainz.org/recording/*
// @include        *://*.musicbrainz.org/recording/*
// @include        *://musicbrainz.org/work/*
// @include        *://*.musicbrainz.org/work/*
// @match          *://musicbrainz.org/artist/*/recordings
// @match          *://*.musicbrainz.org/artist/*/recordings
// @match          *://musicbrainz.org/recording/*
// @match          *://*.musicbrainz.org/recording/*
// @match          *://musicbrainz.org/work/*
// @match          *://*.musicbrainz.org/work/*
// @run-at         document-end
// ==/UserScript==

var scr1 = document.createElement("script");
scr1.textContent = "(" + recinfo_merge_helper + ")();";
document.body.appendChild(scr1);

function recinfo_merge_helper() {
    if (!window.location.href.match(/^https?:\/\/([^.]+\.)?musicbrainz\.org\/((?:recording|work)\/.*|artist\/.*\/recordings(\?.*)?)$/) || !$("li.account").length)
        return;

    var mrtype = (window.location.href.match(/\/artist\/.*\/recordings/)) ? "artistrec" : 
        (window.location.href.match(/\/recording\/merge$/)) ? "recmerge" : 
        (window.location.href.match(/\/(open_)?edits$/)) ? "recedits" : "recwork";

    var MBID_REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
        PENDING_EDITS = [];

    function loader() {
        return $('<img src="/static/images/icons/loading.gif"/>');
    }
    function toMMSS(sec_num) {
        sec_num = parseInt(sec_num,10) / 1000; // passed ms
        var minutes = Math.floor(sec_num / 60),
            seconds = Math.floor(sec_num - (minutes * 60)),
            time;

        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        time    = minutes+':'+seconds;
        return time;
    }

    function RequestManager(default_rate) {
        this.queue = [];
        this.last = 0;
        this.active = false;
        this.next = function() {
            if (this.queue.length == 0) {
                this.active = false;
                return;
            }
            var foo = this.queue.shift(),
                request = foo[0],
                timeout = foo[1];
            request();
            this.last = new Date().getTime();
            if (this.queue.length > 0) {
                setTimeout(function(foo) {foo.next();}, timeout, this);
            } else {
                this.active = false;
            }
        };
        this.push = function(req, timeout) {
            this.queue.push([req, timeout || default_rate]);
            if (!this.active)
                this.start_queue();
        };

        this.unshift = function(req, timeout) {
            this.queue.unshift([req, timeout || default_rate]);
            if (!this.active)
                this.start_queue();
        };

        this.start_queue = function() {
            if (this.active) return;
            this.active = true;
            var now = new Date().getTime();
            if (now - this.last >= default_rate) {
                this.next();
            } else {
                setTimeout(function(foo) {foo.next();},
                    default_rate - now + this.last, this);
            }
        };
    }
    var requests = new RequestManager(911); // MB supports ~11 requests / 10 seconds, i.e. 1/~909.0909ms

    function bubble() {
        return $('<div></div>')
            .css({"margin": "0",
                  "padding": "0",
                  "vertical-align": "baseline",
                  "border": "1px solid #999",
                  "background": "#F0F0F0",
                  "-moz-border-radius": "5px",
                  "-webkit-border-radius": "5px",
                  "border-radius": "5px"});
    }
    function arrowspan() {
        return $("<span></span>")
            .addClass("ri-arrows")
            .append("\u25b6")
            .css("cursor", "pointer")
            .click(function() {
                if ( $(this).text() == "\u25bc" ) { // down arrow (now shown)
                    $(this).siblings(".ri-expander").hide();
                    $(this).text( "\u25b6" ); // change to right arrow
                } else { // now hidden/right
                    $(this).siblings(".ri-expander").show();
                    $(this).text( "\u25bc" ); // change to down arrow
                }
            });
    }
    function expander() {
        return $("<span></span>")
            .addClass("ri-expander")
            .css({"cursor": "pointer",
                "color": "#999",
                "display": "block",
                "clear": "both"
            })
            .append(
                $('<input type="checkbox" title="toggle all in block"/>all')
                .click(function() {
                    var $x = $(this);
                    $x.toggle();
                    $x.closest("th").next("td").find('input:checkbox').prop("checked", $x.prop("checked") );
                })
            )
            .hide();
    }

    function createInput(type, name, value) {
        var input = (type == "textarea") ? 
            $('<textarea></textarea>').append(value) :
            $('<input/>').attr('type', type).attr('value', value);
        input.attr("name", name).css({"font-size": ".8em"});
        if (type == "text") {
            input.focus(function() {
                this.select();
            }, false);
        }
        return input;
    }

    function recInfoSideBlock(show) {
        var flip = (show) ? 1 : 0;
        var frg = $("<div></div>").append(
            $('<h2>Recording info/merge tools</h2>')
        );
        var $RIMHdiv = $("<div></div>").attr("id", RIMHid).css("display", show?"block":"none").append(
            $("<label></label>").append(
                $('<input type="checkbox"/>').click(function() {
                    if (this.checked) {
                        $("span.ri-arrows:contains('\u25b6')").click(); // right arrow
                        $("span#mreaspan").text(" Collapse all");
                    } else {
                        $("span.ri-arrows:contains('\u25bc')").click(); // down arrow
                        $("span#mreaspan").text(" Expand all");
                    }
                })
            ).append(
                $('<span id="mreaspan"></span>').append(" Expand all")
            )
        );
        frg.append($RIMHdiv);
        return frg.get()[0];
    }

    var $container = bubble()
            .addClass("ri-container")
            .hide(),
        ENTITIES = {},
        $tspan = $('<div>total: </div>')
            .css({"margin": "0",
                  "width": "auto",
                  "height": "auto !important",
                  "max-width": "100%",
                  "text-align": "center",
                  "vertical-align": "middle",
                  "float": "right",
                  "background": "#ccd",
                  "display": "block",
            });

    if (mrtype == 'artistrec' || mrtype == 'recmerge' || mrtype == 'recedits') {    // artist recording page, or 'merge' confirmation page
        var $e = (mrtype=='recedits') ? $("table.details.merge-recordings table.tbl tbody tr")
            : $("table.tbl tbody tr");
        $e.each(function() {
            var $mainrow = $(this),
                rec_eid;
            if (mrtype=='artistrec') {
                rec_eid = $mainrow.children("td").eq(0).children("input:checkbox").val();
            } else if (mrtype=='recmerge') {
                rec_eid = $mainrow.children("td").eq(0).children("input:radio").val();
            }
            var cell = (mrtype=='recedits') ? 0 : 1; // which td has recording link
            var rec_mbid = $mainrow.children("td").eq(cell).find("a[href*='/recording/']")[0].href.match(MBID_REGEX)[0];
//            console.log("Entity ID found: "+rec_eid+" / "+rec_mbid);
            var $tr = $('<tr></tr>')
                .addClass("ri-container")
                .attr("mbid",rec_mbid)
                .css({
                    "border-bottom": "1px solid #999",
                    "vertical-align": "top",
                })
                .hide();
            if (mrtype!='recedits') { $tr.append($('<td></td>')); }
            $mainrow.after($tr);
            var total_cols = $mainrow.children("td").length;
            var colspan = (mrtype=='recedits') ? total_cols - 1 : total_cols - 2;
            var $td = $('<td colspan="'+colspan+'"></td>')
                .append(loader())
                .data({
                    "loading": false,
                    "loaded": false,
                    "mbid": rec_mbid
                });
            var $td2 = $('<td></td>').css({"padding":"0", "background":"#ccd"});
            $tr.append($td, $td2);
            $mainrow.children("td").eq(cell).prepend(
                arrowspan()
                    .click(function() {
                        $("tr[mbid='"+rec_mbid+"']").toggle();
                        loadRecReleases($td, $td2, rec_mbid);
                    })
            );
        });
    } else {    // recording or work page
        $.each($("table.details tr").children("th").filter(":contains('recordings:')"), function(i, th) {
            var $th = $(th);
            var type = $th.text().replace(/ /g, "-").replace(/:/,"");
            var tdiv="div.ri-container."+type,
                texp="div.ri-expander."+type;
            $th.prepend(arrowspan()
                .addClass(type)
                .click(function() {
                    $(tdiv).toggle(0, function() {
                        var $me = $(this);
                        if ($me.data("loading")) {
                            return;
                        }
                        var mbid = $me.data("mbid");
                        // only old /ws/js api can return entity_id (int) req'd by merge
                        requests.push(function() {
                            $.get("/ws/js/entity/" + mbid, function(data) {
                                $me.data("id", data.id);
                                $me.prepend(createInput('checkbox','add-to-merge',data.id));
//                              console.log("mbid:"+mbid+" has entity_id "+data.id);
                            });
                        });
                        loadRecReleases($me, $me, mbid);
                    });
                })
            );
            $th.append(expander()
                .addClass(type)
            );
            $th.next("td").children("span:not([style='float: right'],.comment)").each(function() {
                var $s1 = $(this),
                    a1 = $s1.find("a[href*='/recording/']")[0],
                    rec_mbid = a1.href.match(MBID_REGEX)[0],
                    rec_title = a1.textContent;
                $s1.nextUntil("br").after($container.clone()
                    .addClass(type)
                    .data({
                        "loaded": false,
                        "loading": false,
                        "mbid": rec_mbid,
                        "title": rec_title,
                    }).append(loader())
                );
            });
        });

        $('div#content').wrap($('<form action="/recording/merge_queue" method="post" id="mr"></form>'));
        $("table.details").last().append(
            $('<tr></tr>').append(
                $('<td colspan="2" align="center"></td>').append(
                    $('<input type="button" id="mrbutton" value="Add selected recordings for merging"/>')
                        .css({"padding": "5px",
                            "size": "1em",
                            "color": "#333",
                            "font-weight": "bold",
                        })
                        .click(function() {
                            var ser = $("input:checkbox[name='add-to-merge']").serialize();
//                          console.log("adding to merge queue: "+ ser);
                            $("form#mr").submit();
                        })
                        .hide()
                )
            )
        );
    }

    var sidebar = $("#sidebar").get()[0];
    if (!sidebar) {
        sidebar = $("<div>").attr("id","sidebar").css({"font-size":"80%"});
        $("div#page").removeAttr("class").prepend(sidebar);
    }
    var RIMHid = "RIMHuserjs34";
    $(sidebar).prepend(recInfoSideBlock(true));
//    var h2s = sidebar.children("h2")[0];
//    h2s.insertBefore(recInfoSideBlock(true), h2s[0]);

    function loadRecReleases(titobj, totobj, mbid) {
        if (titobj.data("loading")) {
            return;
        }
        titobj.data("loading", true);
        $(":button#mrbutton").show();
        requests.push(function() {
            $.get("/ws/2/recording/" + mbid + "?inc=releases&fmt=json", function(data) {
                titobj.children("img").remove(); // clear loading.gif
                var len = data["length"];
                len = ( $("th:contains('Length')").not(".treleases").length || len == null) ? '' : '(' + toMMSS(len) + ') '; 
                titobj.data("loaded", true)
                    .append('<span style="color: #666;vertical-align: baseline;size:80%">'+len+'appears on: </span>');
//              console.log("DATA: "+JSON.stringify(data));
//              console.log("releases: "+data.releases);
                var THASH = {},
                    TITLES = [];
                for (var rel in data.releases) {
                    var title = data.releases[rel]["title"];
                    // append status to release title if not official (i.e. Bootleg) so counts are separate
                    if (data.releases[rel]["status"] && data.releases[rel]["status"] != "Official") {
                        title += " ["+data.releases[rel]["status"].toLowerCase()+"]";
                    }
                    if (typeof THASH[title] === 'undefined') { 
                        THASH[title] = 0;
                        TITLES.push(title);
                    }
                    THASH[title]++;
//                  console.log("Got rel "+rel+"/"+title);
                }
                TITLES.sort();
                var tsep = "";
                var tot = 0;
                for (var i in TITLES) {
                    var t = TITLES[i];
                    titobj.append(tsep + t);
                    var tc = THASH[t];
//                  console.log("Title "+t+" has "+tc+ " release(s)");
                    if (tc > 1) { titobj.append(" ("+tc+")"); }
                    tsep = "; ";
                    tot += tc;
                }
                totobj.prepend( $tspan.clone().css({"height": totobj.innerHeight()}).append(tot) );   // prepend so float works right
            });
        });
    }
}
// vim: set et: