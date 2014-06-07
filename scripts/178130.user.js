// ==UserScript==
// @name        MusicBrainz: Batch-add composer/etc. relationships, batch-edit work type/lang
// @version     2013-09-19
// @author      th1rtyf0ur
// @include     http://musicbrainz.org/artist/*/works*
// @include     http://beta.musicbrainz.org/artist/*/works*
// @include     http://test.musicbrainz.org/artist/*/works*
// @match       http://musicbrainz.org/artist/*/works*
// @match       http://beta.musicbrainz.org/artist/*/works*
// @match       http://test.musicbrainz.org/artist/*/works*
// @include     https://musicbrainz.org/artist/*/works*
// @include     https://beta.musicbrainz.org/artist/*/works*
// @include     https://test.musicbrainz.org/artist/*/works*
// @match       https://musicbrainz.org/artist/*/works*
// @match       https://beta.musicbrainz.org/artist/*/works*
// @match       https://test.musicbrainz.org/artist/*/works*
// @description Create various relationships between an artist and the selected works or "part of" relationships between a main work and selected works from an artist's works list, and batch edit work type/lyrics language. Based on kovacsur's "Batch-add composer/lyricist/librettist/arranger/orchestrator/part-of relationships" userscript, which was based on bitmap's 'Batch-add "performance of" relationships' userscript.
// ==/UserScript==
//**************************************************************************//

if (document.getElementsByClassName("account").length) {
    var scr = document.createElement("script");
    scr.textContent = "(" + batch_artist_to_work_rels + ")();";
    document.body.appendChild(scr);
}

function batch_artist_to_work_rels() {

    var 
        // artist-work ar.link_type_id values
        LTI_PUBLISHER    = 161,
        LTI_ORCHESTRATOR = 164,
        LTI_LYRICIST     = 165,
        LTI_WRITER       = 167,
        LTI_COMPOSER     = 168,
        LTI_LIBRETTIST   = 169,
        LTI_ARRANGER     = 293,

        // work-work ar.link_type_id values
        LTI_HAS_PART     = 281,

        ROLES = {};

    ROLES[LTI_PUBLISHER]    = {"name": "publishing"     , "description": "Indicates the publisher of the checked works"},
    ROLES[LTI_ORCHESTRATOR] = {"name": "orchestrator"   , "description": "The artist orchestrated the checked musical works"},
    ROLES[LTI_LYRICIST]     = {"name": "lyricist"       , "description": "The artist wrote the lyrics of the checked works"},
    ROLES[LTI_WRITER]       = {"name": "writer"         , "description": "The artist wrote the music and/or the words for the checked works. Use only if no more specific information is available"},
    ROLES[LTI_COMPOSER]     = {"name": "composer"       , "description": "The artist composed the music of the checked works"},
    ROLES[LTI_LIBRETTIST]   = {"name": "librettist"     , "description": "The artist wrote the libretto for the checked works"},
    ROLES[LTI_ARRANGER]     = {"name": "arranger"       , "description": "The artist arranged the tune into into a form suitable for performance for the checked works"};

    var MBID_REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
        ws_requests = new RequestManager(1000),
        edit_requests = new RequestManager(1200);


    var $works = $("table.tbl > tbody > tr");
    if ($works.length == 0)
        return;

    // http://www.json.org/js.html
    var JSON;if(!JSON){JSON={}}(function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()

    emulate_GM_functions(); //emulate some GreaseMonkey API functions in Opera/Chrome
    
    // Styling for "part of: " ARs in the list
    $("<style type=\"text/css\">table.tbl td { vertical-align: top } dl.ars, dl.ars dd, dl.ars dt {padding: 0; margin: 0; font-size: 11px; } dl.ars { margin-left: 2em; } dl.ars dd { margin: 0.2em 0; } dl.ars dt {margin-right: 0.5em; clear: left; float: left; color: #555;}</style>").appendTo("head");

    // Add UI elements to manage composer/lyricist ARs
    var
        $container = $('<div></div>')
        .append(
            $('<h3>Relate checked works to...</h3>')
            .css({"margin-top": "0"})
            .append($('<button id="bwtar-toggleadvanced"></button>').click(toggle_advanced).css({"float":"right"})),
            $("<div></div>")
            .append(
                $('<div id="bwtar-artistdiv" style="float:left; width:50%"></div>')
                .append(
                    'Artist (URL/MBID):<br />',
                    entity_lookup($('<input type="text" title="Paste the MusicBrainz ID of an artist in this field (or a URL containing an MBID)" id="bwtar-artist" style="width:70%"/>'), "artist"),
                    $("<button>Go</button>").click(relate_selected_works_to_artist),
                    '<div id="bwtar-roles"></div>',
                    $('<div id="bwtar-dates" class="bwtar-advanced"></div>').append(
                        $('<label>Start date: </label>').append(date_field($('<input type="text" class="bwtar-date" id="bwtar-date-from" />'))),
                        $('<label>End date: </label>').append(date_field($('<input type="text" class="bwtar-date" id="bwtar-date-to" />')))
                    )
                ),
                $('<div id="bwtar-workdiv" class="bwtar-advanced" style="float: left; width:50%"></div>')
                .append(
                    'Work (URL/MBID):<br />',
                    entity_lookup($('<input type="text" title="Paste the MusicBrainz ID of a work in this field (or a URL containing an MBID)" id="bwtar-main-work" style="width:70%"/>'), "work"),
                    $("<button>Go</button>").click(relate_selected_works_to_main_work),
                    $('<p>The checked works are parts of this work.</p>')
                        .css({"margin":"0","font-size":".9em"}),
					'Type: <select id="34worktype"></select><br/>',
					'Lyrics lang: <select id="34lyricslang"></select><br/>',
					$("<button>Go</button>").click(edit_selected_works_type_lyrics)
                )
            ),
            $('<div style="clear:left; padding-top:.5em"></div>')
            .append(
                'Edit note:<br />',
                '<input type="text" style="width:100%" title="This edit note will be added to all edits made by the userscript" id="bwtar-edit-note"/>'
            )
        );

	work_selectors();
    $artistdiv = $container.find('#bwtar-roles');
    add_role($artistdiv, LTI_COMPOSER);
    add_role($artistdiv, LTI_LYRICIST);
    add_role($artistdiv, LTI_PUBLISHER, true);
    $artistdiv.append('<br />');
    add_role($artistdiv, LTI_ARRANGER, true);
    add_role($artistdiv, LTI_ORCHESTRATOR, true);
    add_role($artistdiv, LTI_LIBRETTIST, true);
    add_role($artistdiv, LTI_WRITER, true);

    $container.find('input.bwtar-role').change(clear_checkbox_error_state);
    $container.find('label').css({'cursor':'pointer','display':'inline-block','margin':'0', 'padding':'0', 'margin-right':'.5em', 'display':'inline-block'});
    $container.find('input.bwtar-date').css({'width':'6em'}).attr("title","Enter a date in YYYY-MM-DD format. This date will be applied to all ARs.");
    $container.find('input#bwtar-role-librettist, input#bwtar-role-lyricist').addClass('bwtar-role-radio').change(radio_lyricist_librettist);
    $container.find('input#bwtar-role-writer').change(writer_change);
    $container.find('input#bwtar-role-composer, input#bwtar-role-lyricist, input#bwtar-role-librettist').addClass('bwtar-role-writer-specific').change(writer_specific_change);

    $container.css({"width": "auto", "margin": ".25em", "padding": ".75em", "background": "#F2F2F2", "border": "1px #999 solid"}).insertAfter($("#content h2").last());
    $container.find("table").find("td").css("width", "auto");
    $container.children("tbody").children("tr").children("td")
        .css({"padding": "0.5em", "vertical-align": "top"});

    // Style buttons

    function style_buttons($buttons) {
        return $buttons.css({
            "color": "#565656",
            "background-color": "#FFFFFF",
            "border": "1px solid #D0D0D0",
            "border-top": "1px solid #EAEAEA",
            "border-left": "1px solid #EAEAEA"});
    }
    style_buttons($container.find("button"));

    var advanced_mode = GM_getValue('bwtar.advanced', false);
    advanced_state_change();
    
    function add_role($node, role_id, is_advanced) {
        var role = ROLES[role_id];
        $node.append(
            $('<label class="bwtar-role"></label>')
                .attr('id', 'bwtar-role-' + role["name"] + '-label')
                .attr('for', 'bwtar-role-' + role["name"])
                .attr('title', role["description"])
                .append(
                    $('<input name="bwtar-role" class="bwtar-role" type="checkbox"></input>')
                        .attr('value', role["name"])
                        .attr('id', 'bwtar-role-' + role["name"])
                        .css({'margin':'0', 'padding':'0', 'margin-right':'.25em', 'vertical-align':'middle'})
                        .data({"link_type_id": role_id}),
                    $('<span></span>')
                        .css({'vertical-align':'middle'})
                        .text(role["name"])
                )
        );
        if (is_advanced)
            $node.find("#bwtar-role-" + role["name"] + "-label").addClass("bwtar-advanced");
    }

    function toggle_advanced() {
        advanced_mode = !advanced_mode;
        advanced_state_change();
    }
    
    function advanced_state_change() {
        if (advanced_mode) {
            $("#bwtar-toggleadvanced").text("Switch to simple mode");
            $("#bwtar-artistdiv").css({"width":"50%"});
            $(".bwtar-advanced").show();
        } else {
            $("#bwtar-toggleadvanced").text("Switch to advanced mode");
            $(".bwtar-advanced input").attr("checked", false);
            $(".bwtar-advanced .bwtar-date").val("").trigger("input");
            $(".bwtar-advanced").hide();
            $("#bwtar-artistdiv").css({"width":"100%"});
        }
        GM_setValue('bwtar.advanced', advanced_mode);
    }

    function clear_checkbox_error_state() {
        $("label.bwtar-role").css("background", "");
    }
    
    function radio_lyricist_librettist() {
        if (this.checked) {
            $('input.bwtar-role-radio').attr('checked', false);
            this.checked = true;
        }
    }

    function writer_change() {
        if (this.checked) {
            $('input.bwtar-role-writer-specific').attr('checked', false);
        }
    }

    function writer_specific_change() {
        if (this.checked) {
            $('input#bwtar-role-writer').attr('checked', false);
        }
    }

    // Support shift key range-selection

    (function shift_selection() {
        var last_checkbox = null, last_checkbox_state = false;

        $works.find("input[name=add-to-merge]").click(function(event) {
            if (last_checkbox && event.shiftKey) {
                var this_row = $(this).parents("tr")[0],
                    last_row = $(last_checkbox).parents("tr")[0];

                if (last_row != this_row) {
                    var $current = $(last_row),
                        forward = $(this_row).index() > $current.index();

                    while (true) {
                        if (forward) {
                            $current = $current.next();
                        } else {
                            $current = $current.prev();
                        }

                        $current.find("input[name=add-to-merge]")
                            .attr("checked", last_checkbox_state);

                        if ($current[0] == this_row)
                            break;
                    }
                }
            }
            last_checkbox = this;
            last_checkbox_state = this.checked;
        });
    })();

    // Edit creation

    function relate_selected_works_to_artist() {
        var $input = $("input#bwtar-artist"),
            edit_note = $("input#bwtar-edit-note").val(),
            $artist_roles = $("input.bwtar-role:checked"),
            num_roles = $artist_roles.length;
            $button = $(this);

        function callback() {
            $button.attr("disabled", false).css("color", "#565656");
            $("input.bwtar-role").attr("disabled", false);
        }

        if ($input.data("selected")) {
            if (num_roles > 0) {
                $button.attr("disabled", true).css("color", "#EAEAEA");
                $("input.bwtar-role").attr("disabled", true);

                var mbid = $input.data("mbid"), 
                    name = $input.data("name"),
                    $rows = checked_works(),
                    total = $rows.length;

                if (total == 0) {
                    if (callback)
                        callback();
                    return;
                }

                for (var i = 0; i < total; i++) {
                    for (var j = 0; j < num_roles; j++) {
                        if ((j == num_roles - 1) && ( i== total - 1)) {
                            var _callback = callback;
                        } else {
                            var _callback = false;
                        }
                        relate_to_artist($($rows[i]), mbid, name, $($artist_roles[j]).data("link_type_id"), edit_note, _callback);
                    }
                }
            } else {
                $("label.bwtar-role").css("background", "#ffaaaa");
            }
        } else {
            $input.css("background", "#ffaaaa");
        }
    }

    function relate_selected_works_to_main_work() {
        var $input = $("input#bwtar-main-work"),
            edit_note = $("input#bwtar-edit-note").val(),
            $button = $(this);

        function callback() {
            $button.attr("disabled", false).css("color", "#565656");
        }

        if ($input.data("selected")) {
            $button.attr("disabled", true).css("color", "#EAEAEA");

            var mbid = $input.data("mbid"), 
                name = $input.data("name"),
                $rows = checked_works(),
                total = $rows.length;

            if (total == 0) {
                if (callback)
                    callback();
                return;
            }

            for (var i = 0; i < total; i++) {
                if (i == total - 1) {
                    var _callback = callback;
                } else {
                    var _callback = false;
                }
                relate_to_main_work($($rows[i]), mbid, name, edit_note, _callback);
            }
        } else {
            $input.css("background", "#ffaaaa");
        }
    }

    function add_artist_link($row, artist_mbid, artist_name, link_type_id) {
        var writers_list = $($row.children("td")[2]).children("ul")[0],
            role = ROLES[link_type_id]["name"];
        $(writers_list).append($('<li></li>').append($("<a></a>")
            .attr("href", "/artist/" + artist_mbid)
            .text(artist_name),
            " (" + role + ")"));
    }
    function add_type_lang($row, type, lang) {
		$($row.children("td")[5]).html(type);
		$($row.children("td")[6]).html('<abbr title="'+lang+'">'+lang.substring(0,3).toLowerCase()+'</abbr>');
	}

    function add_main_work_link($row, main_work_mbid, main_work_name) {
        var title_cell = $row.children("td")[1];

        $(title_cell)
        .append(
            $('<div class="ars"></div>')
            .append(
                $('<dl class="ars"></dl>')
                .append(
                    $("<dt>part of:</dt>"),
                    $("<dd></dd>")
                    .append(
                       $("<a></a>")
                       .attr("href", "/work/" + main_work_mbid)
                       .text(main_work_name)
                    )
                )
            )
        );
    }

    function relate_to_artist($row, artist_mbid, artist_name, link_type_id, edit_note, callback) {
        var work_mbid = $($($row.children("td")[1]).find("a")[0]).attr("href").match(MBID_REGEX)[0];

        var data = {
            "ar.as_auto_editor": "1",
            "ar.link_type_id": link_type_id,
            "type1": "work",
            "entity1": work_mbid,
            "type0": "artist",
            "entity0": artist_mbid,
            "ar.edit_note": edit_note
        };
        
        var f = $("#bwtar-date-from"), t = $("#bwtar-date-to");
        
        if (f.data("selected")) {
            data["ar.period.begin_date.year"] = f.data("year");
            if (f.data("month") != "") data["ar.period.begin_date.month"] = f.data("month");
            if (f.data("day")   != "") data["ar.period.begin_date.day"]   = f.data("day");
        }

        if (t.data("selected")) {
            data["ar.period.end_date.year"] = t.data("year");
            if (t.data("month") != "") data["ar.period.end_date.month"] = t.data("month");
            if (t.data("day")   != "") data["ar.period.end_date.day"]   = t.data("day");
        }

        var url = "/edit/relationship/create?type1=work&entity1=" + work_mbid + "&type0=artist&entity0=" + artist_mbid;
        function post_edit() {
            $.post(url, data, function() {
                add_artist_link($row, artist_mbid, artist_name, link_type_id);

                if (callback)
                    callback();
            }).error(function() {
                edit_requests.unshift(post_edit);
            });
        }
        edit_requests.push(post_edit);
    }

    function relate_to_main_work($row, main_work_mbid, main_work_name, edit_note, callback) {
        var work_mbid = $($($row.children("td")[1]).find("a")[0]).attr("href").match(MBID_REGEX)[0];

        var data = {
            "ar.as_auto_editor": "1",
            "ar.link_type_id": LTI_HAS_PART, //e0 has part e1
            "type0": "work",
            "entity0": main_work_mbid,
            "type1": "work",
            "entity1": work_mbid,
            "ar.direction": 0,
            "ar.edit_note": edit_note
        };
        
        var url = "/edit/relationship/create?type1=work&entity1=" + work_mbid + "&type0=work&entity0=" + main_work_mbid;
        function post_edit() {
            $.post(url, data, function() {
                add_main_work_link($row, main_work_mbid, main_work_name);

                if (callback)
                    callback();
            }).error(function() {
                edit_requests.unshift(post_edit);
            });
        }
        edit_requests.push(post_edit);
    }

    function checked_works() {
        return $works
            .filter(function() {return $(this).find("input[name=add-to-merge]:checked").length;});
    }

    function entity_lookup($input, entity) {
        $input.bind("input", function() {
            if (!$(this).data("selected") || ($(this).data("name") != this.value)) {
                var match = this.value.match(MBID_REGEX);
                $(this).data("selected", false);
                if (match) {
                    var mbid = match[0];
                    ws_requests.unshift(function() {
                        $.get("/ws/2/" + entity + "/" + mbid, function(data, textStatus, jqXHR) {
                            if (jqXHR.status != "200") {
                                $input.css("background", "#ffaaaa");
                                return;
                            }
                            var $doc = $(data.documentElement),
                                value = ($doc.find("title")[0] || $doc.find("name")[0]).textContent;
                            $input.val(value)
                                .data({"selected": true, "mbid": mbid, "name": value})
                                .css("background", "#bbffbb");
                        }).error(function() {
                            $input.css("background", "#ffaaaa");
                        });
                    });
                } else {
                    $input.css("background", "#ffaaaa");
                }
            }
        }).data("selected", false);

        return $input;
    }

	function work_selectors() {
		var firstwork = $("table.tbl a[href*='/work/']").eq(0).attr("href");
//		console.log("First work link: " + firstwork);
		ws_requests.unshift(function() {
			$.get(firstwork + '/edit', function(data, textStatus, jqXHR) {
				if (jqXHR.status != "200") {
					type_sel.css("background", "#ffaaaa");
					lang_sel.css("background", "#ffaaaa");
					return;
				}
//				var $doc = $(data.documentElement);
				var $doc = $($.parseHTML(data));
				var types = $doc.find("select[id='id-edit-work.type_id']").children().filter("option");
				var langs = $doc.find("select[id='id-edit-work.language_id']").children();
				$("#34worktype").html(types);
				$("#34lyricslang").html(langs);
				// option marked 'selected' somehow doesn't get selected when putting them in here
				$("#34worktype option[selected=selected]").prop("selected", true);
				$("#34lyricslang option[selected=selected]").prop("selected", true);
//				console.log($("#34worktype option:selected").val());
			});
		});
	}

	function edit_selected_works_type_lyrics() {
		var $type = $("#34worktype option:selected").val(),
			$lang = $("#34lyricslang option:selected").val(),
			edit_note = $("input#bwtar-edit-note").val(),
			$button = $(this);

        function callback() {
            $button.attr("disabled", false).css("color", "#565656");
        }
		if (($type || $lang) && edit_note) {
			$button.attr("disabled", true).css("color", "#EAEAEA");
			var $rows = checked_works(),
				total = $rows.length;
            if (total == 0) {
                if (callback)
                    callback();
                return;
            }
            for (var i = 0; i < total; i++) {
                if (i == total - 1) {
                    var _callback = callback;
                } else {
                    var _callback = false;
                }
                set_type_lang($($rows[i]), $type, $lang, edit_note, _callback);
            }
        } else {
            $button.css("background", "#ffaaaa");
		}
	}

	function set_type_lang($row, type, lang, edit_note, callback) {
        var work_mbid = $($($row.children("td")[1]).find("a")[0]).attr("href").match(MBID_REGEX)[0],
			work_name = $($($row.children("td")[1]).find("a bdi")[0]).text(),
			work_comment = $($row.children("td")[1]).find("span.comment bdi").text(),
			type_name = $("#34worktype option[value="+type+"]").text(),
			lang_name = $("#34lyricslang option[value="+lang+"]").text();

		var data = {
			"edit-work.type_id"	: type,
			"edit-work.language_id"	: lang,
			"edit-work.edit_note" : edit_note,
			"edit-work.comment" : work_comment,
			"edit-work.name": work_name,
		};

		$row.find("td.iswc ul li").each(function(i) {
			data["edit-work.iswcs."+i] = $(this).text();
		});

        var url = "/work/" + work_mbid + "/edit";
//		console.log("Going to post to "+url+"\ndata: " + JSON.stringify(data)+" / "+type_name+"/"+lang_name);
        function post_edit() {
            $.post(url, data, function() {
                add_type_lang($row, type_name, lang_name);
                if (callback)
                    callback();
            }).error(function() {
                edit_requests.unshift(post_edit);
            });
        }
        edit_requests.push(post_edit);
	}

    function RequestManager(rate) {
        this.queue = [];
        this.last = 0;

        this.next = function() {
            var request = this.queue.shift();
            if (request) {
                request();
                this.last = new Date().getTime();
                if (this.queue.length > 0) {
                    setTimeout(function(foo) {foo.next();}, rate, this);
                }
            }
        }

        this.push = function(req) {
            this.queue.push(req);
            if (this.queue.length == 1)
                this.start_queue();
        }

        this.unshift = function(req) {
            this.queue.unshift(req);
            if (this.queue.length == 1)
                this.start_queue();
        }

        this.start_queue = function() {
            var now = new Date().getTime();
            if (now - this.last >= rate) {
                this.next();
            } else {
                setTimeout(function(foo) {foo.next();},
                    rate - now + this.last, this);
            }
        }
    }

    function date_field($input) {
        // accepts dates in YYYY-MM-DD (ISO 8601) format, does basic validation to exclude invalid month/day pairs
        var DATE_REGEX = /([0-9]{4})([/\-. ]+(?:(0?2)([/\-. ]+([12][0-9]|0?[1-9]))?|(0?[469]|11)([/\-. ]+(30|[12][0-9]|0?[1-9]))?|(0?[13578]|1[02])([/\-. ]+(3[01]|[12][0-9]|0?[1-9]))?))?\.?$/;
        $input.bind("input", function() {
            $(this).data("selected", false);
            var v = $.trim(this.value);
            if (v == "") {
                $input.css("background", "");
            } else { 
                var match = v.match(DATE_REGEX);
                if (match) {
                    var year = match[1],
                        month = match[3]?match[3]:(match[6]?match[6]:(match[ 9]?match[ 9]:"")),
                        day   = match[5]?match[5]:(match[8]?match[8]:(match[11]?match[11]:""));
                    
                    // check for February 29 in non-leap year
                    if ((month == 2) && (day == 29) && (new Date(year,1,29).getDate() != 29)) {                   
                        $input.css("background", "#ffaaaa");
                    } else {
                        $input.val(year + (month != "" ? "-" + month + (day != "" ? "-" + day : "") : "")).data({
                            selected: true,
                            year: year,
                            month: month,
                            day: day
                        }).css("background", "#bbffbb");
                    }
                } else {
                    $input.css("background", "#ffaaaa");
                }
            }
        }).data("selected", false);

        return $input;
    }

    function emulate_GM_functions() {
        if (typeof GM_deleteValue == "undefined") {
            if (localStorage_OK()) { // use localStorage
                GM_getValue = function (name, defaultValue) {var value = localStorage[name]; return value == null ? defaultValue : JSON.parse(value);};
                GM_setValue = function (name, value) {localStorage[name] = JSON.stringify(value);};
            } else { // fallback to cookies
                GM_getValue = function (name, defaultValue) {var value = readCookie(name); return value == null ? defaultValue : JSON.parse(value);};
                GM_setValue = function (name, value) {createCookie(name, JSON.stringify(value));};
            }
        }
    }

    function localStorage_OK() {
        var test = "localStorage-test";
        try {
            localStorage.setItem(test, test);
            var val_match = (localStorage.getItem(test) == test);
            localStorage.removeItem(test);            
            return val_match;
        } catch(e) {
            return false;
        }
    }

    // createCookie and readCookie from http://www.quirksmode.org/js/cookies.html
    
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
