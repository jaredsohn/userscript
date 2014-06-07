// ==UserScript==
// @name           MusicBrainz Advanced Release view
// @version        2013.01.30.1
// @namespace      http://userscripts.org/users/22504
// @description    MusicBrainz : Show standardized recordings and works on release page
// @include        http://*musicbrainz.org/release/*
// @exclude        http://*musicbrainz.org/release/*/*
// @include        https://*musicbrainz.org/release/*
// @exclude        https://*musicbrainz.org/release/*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

// Preferences
DISPLAY_STANDARDIZED_RECORDING = true;
DISPLAY_ISRCS = true;
DISPLAY_WORKS = false;

$(document).ready(function(){

	// Add MBID as ids for tr
	var recordingMBIDre = new RegExp(".*\/recording\/(.{36})","i");
	$("table.tbl tbody tr").each(function(){
        if ( $(this).hasClass("subh") ) { return true; }
		var recordingMBID = $(this).find("td:eq(1) a:eq(0)").attr("href").match(recordingMBIDre)[1];
        if ($('#'+recordingMBID).length == 0) {
            $(this).attr("id", recordingMBID);
        }
	});	

    // Construct Release info
	var release = new Object();
	var re = new RegExp("musicbrainz\.org\/release/(.{36})", "i");
    if (m = window.location.href.match(re)) { release.mbid = m[1]; } 
	else { return; }

	// Get Release info from WS/2
	release.recordings = new Array();
    var wsurl = "/ws/2/release/" + release.mbid + "?inc=artist-credits+artist-rels"
		+ "+recordings+recording-level-rels+isrcs"
		+ "+work-rels+work-level-rels";
	mylog(wsurl);
	$.get(wsurl, function(data, textStatus, jqXHR) {

		// Parse recordings
		$(data).find("recording").each(function() {
		    var $xml_recording = $(this);
			
			var recording = new Object();
			recording.mbid = $xml_recording.attr("id");
			recording.title = $xml_recording.children("title").text();
			recording.comment = $xml_recording.children("disambiguation").length == 0 ? "" : $xml_recording.children("disambiguation").text();
			recording.length = $xml_recording.children("length").length == 0 ? "" : $xml_recording.children("length").text();
            recording.isrcs = [];
            $xml_recording.find("isrc").each(function(index, isrc) {
                recording.isrcs.push( $(isrc).attr("id") );
            });
			
			recording.artist_credits = new Array();
			$xml_recording.children("artist-credit").children("name-credit").each(function() {
				var $name_credit = $(this);
				var acn = new Object();
				acn.artist_name = $name_credit.find("artist name").length == 0 ? "" : $name_credit.find("artist name").text();
				acn.artist_id = $name_credit.find("artist").attr("id");
				acn.name = $name_credit.children("name").length == 0 ? "" : $name_credit.children("name").text();
				acn.joinphrase = $name_credit.attr("joinphrase") !== undefined ? $name_credit.attr("joinphrase") : "";
				recording.artist_credits.push(acn);
			});
					
			// Parse linked works
			recording.works = new Array();
			$xml_recording.children("relation-list[target-type='work']").children("relation").each(function() {
				$relation = $(this);
				if ($relation.attr("type") != "performance" || $relation.children("work").length == 0) return true;
				var $work = $relation.children("work");
				var work = {
					mbid: $work.attr("id"),
					title: $work.children("title").text()
				}
				if ($work.children("iswc").length > 0) { work.iswc = $work.children("iswc").text(); }
				recording.works.push(work); 
			});
			
			release.recordings.push(recording);
			
        });
		
		// Now use data we've collected 
		displayReleaseInfo(release);

	});
	
});	

function displayReleaseInfo(release) {
	mylog(release);
	if (DISPLAY_STANDARDIZED_RECORDING) {
		$.each(release.recordings, function(index, recording) {
			// Title 
			$("#"+recording.mbid).find("td:eq(1) a:eq(0) span").html(recording.title);
			// Comment
			if (recording.comment != "") {
				$("#"+recording.mbid).find("td:eq(1) a:eq(0)").after(' <span class="comment">(' + recording.comment + ')</span>');
			}
			// Length
			$("#"+recording.mbid).find("td:last span").html(durationToText(recording.length));
			// Artist credit
			// ... TODO ...
		});
	}
	
	if (DISPLAY_ISRCS) {
        // Header
        $("table.tbl thead th:eq(1)").after("<th> ISRC </th>");
        // New Column
        $("table.tbl tbody tr").each(function(){
            if ( $(this).hasClass("subh") ) {
                $(this).find("td:eq(1)").attr("colspan", $(this).find("td:eq(1)").attr("colspan")+1);
                return true;
            }
            $(this).find("td:eq(1)").after("<td class='isrc'>&nbsp;</td>");
        });	
        
        $.each(release.recordings, function(index, recording) {
            if (recording.isrcs.length == 0) return true;
            
            var isrcsLinks = jQuery.map(recording.isrcs, function(isrc, i){
                return ("<a href='/isrc/" + isrc + "'>" + isrc + "</a>");
            });
            $("#"+recording.mbid).find('td.isrc').html("<small>" + isrcsLinks.join(", ") + "</small>")
        });

	}

	if (DISPLAY_WORKS) {
		var nbcols = $("table.tbl thead th").length;
		$.each(release.recordings, function(index, recording) {
		
			if (recording.works.length == 0) {
				$("#"+recording.mbid).find("td:eq(1)").prepend("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
				return true;
			}

			$("#"+recording.mbid).find("td:eq(1)").prepend("&nbsp;&nbsp;");			
			var $button = $("<img src='http://classic.musicbrainz.org/images/plus.gif' />");
			$("#"+recording.mbid).find("td:eq(1)").prepend($button);

			var work = recording.works[0];
			var $infotr = $("<tr style='display: none;'><td colspan='" + (nbcols) + "'><small>"
				+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	Work(s): &nbsp;&nbsp;"
				//+ "<span class='work-info'>" 
					+ "<a href='/work/" + work.mbid + "'>" + work.title + "</a>"
				//+ "</span>"
				+ "</small></td></tr>"
			);
			$("#"+recording.mbid).after($infotr);
			
			$button.click(function(e) {
				if ($(this).attr("src") == 'http://classic.musicbrainz.org/images/plus.gif') {
					$(this).attr("src", "http://classic.musicbrainz.org/images/minus.gif");
				} else {
					$(this).attr("src", "http://classic.musicbrainz.org/images/plus.gif");
				}
				$(this).parents("tr").next().toggle();

			});
		});
		
	}

}

function mylog(text) {
    if (unsafeWindow.console) {
        unsafeWindow.console.log(text);
    }
}

function artistcredit2HTML(artistcredit) {
    var html = "";
    $.each(artistcredit["name-credit"], function(index, namecredit) {
        html += "<a href='/artist/" + namecredit.artist.id + "'>" + 
                (namecredit.hasOwnProperty("name") ? namecredit.name : namecredit.artist.name) + "</a>";
        if (!namecredit.hasOwnProperty("name") && namecredit.artist.hasOwnProperty("disambiguation")) { 
            html += " <span class='comment'>(" + namecredit.artist.disambiguation + ")</span>"
        }
        if (namecredit.hasOwnProperty("joinphrase")) html += namecredit.joinphrase;
    });
    return html;
}

function durationToText(duration) {
    duration = Math.round(duration/1000);
    var seconds = duration  % 60;
    var minutes = (duration - seconds) / 60;
    var text = minutes + ":" + (seconds < 10 ? "0"+seconds : seconds);
    return text;
}