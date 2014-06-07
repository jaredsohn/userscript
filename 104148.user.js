// ==UserScript==
// @name           MusicBrainz : Link work to recordings
// @version        2012.12.30.1
// @namespace      http://userscripts.org/users/22504
// @description    MusicBrainz : Batch linking a work to recordings
// @include        http://*musicbrainz.org/work/*
// @include        https://*musicbrainz.org/work/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// ==/UserScript==

// @include        http://*musicbrainz.org/artist/*/recordings*

// PARAMETERS

PERFORMANCE_RELATIONSHIP_ATTRIBUTES = [ "cover", "live", "instrumental", "partial" ];

// Work page
MIN_LUCENE_SCORE = 50;
MAX_MATCHES_LIMIT = 50;

// Artist recordings page
MAX_RESULTS_LIMIT = 100;
WS_REQUEST_DELAY = 900;
MAX_RECORDINGS = 500;

var ajaxQueue = [];
var work;

$(document).ready(function() {

	// Inject additionall CSS
	$("head").append('<style type="text/css">#perfs-recordings tr:hover { background-color: #ffeea8; }</style>');

	// Processing queue mechanism
	var processAjaxQueue = function(){
	  if (ajaxQueue.length > 0) {
		$("#spinner").show();
		
		var requestItem = ajaxQueue[0];
		ajaxQueue.shift();
		var postAction = "http://"+document.location.host+"/edit/relationship/create?type0=recording&type1=work"
            + "&entity0="+requestItem.recording.mbid+"&entity1="+requestItem.work.mbid;
		var postParameters = {
			"ar.link_type_id": 278,
			"ar.edit_note": "",
			"ar.as_auto_editor": 1
		};
        $.each(PERFORMANCE_RELATIONSHIP_ATTRIBUTES, function(index, attr) {
            postParameters["ar.attrs."+attr] = (requestItem.attributes[attr] ? 1 : 0);
        });
        
		$.post(postAction, 
			postParameters,
            function() { requestItem.success(requestItem); },
			function() { mylog("AR creation failed"); }
		);

	  }
	}
	setInterval(function(){
	  processAjaxQueue();
	}, 800);

    if (window.location.href.match("musicbrainz.org/work")) {
    
        // Only display this feature on Overview and Relationships tabs
        var re = new RegExp("musicbrainz\.org\/work\/(.{36})(|/relationships|#relate_to)$","i");
        if (!window.location.href.match(re)) { return; }

        
        // Insert "Relate to performance recordings" link
        var $link = $("<li><a href='#'>Relate to performance recordings</a></li>");
        $("#sidebar li:contains('Relate to URL')").after($link);
        
        $link.click(function(e) {
            e.preventDefault();

            if ($('#perfs-recordings').length > 0) return;
            
            setupWorkPageUI();
            searchRecordings();

        }); // $link.click(function(e) {
    } else if (window.location.href.match(/musicbrainz\.org\/artist\/(.{36})\/recordings/)) {
    
        setupRecordingsUI();
    
    }

}); // $(document).ready(function() {

///////////////////////////////////////////////////////////////////
// For work page (mb.org/work/MBID)
///////////////////////////////////////////////////////////////////
function setupWorkPageUI() {

    var previousArtistValue = localStorage["artist-recording"] ? localStorage["artist-recording"] : "";

    $("#content").append("<h2>Candidates performance recordings"
        + "<span style='float: right;'><small>"
        
        // Artist autocomplete field
        + "<label>Artist:</label>&nbsp;"
        + '<span class="artist autocomplete">'
        + '<img src="http://musicbrainz.org/static/images/icons/search.png" class="search" />'
        + ' <input type="text" style="width: 170px;" class="name" value="'+previousArtistValue+'">'
        + ' <input type="hidden" class="gid" />'
        + ' <input type="hidden" class="id" />'
        + '</span>'
        
        + "&nbsp;<button name='refresh' id='search-recordings'>Refresh</button>"
        + "</small></span>"
        + "</h2>"
        );

    // Save artist input
    $('span.artist.autocomplete input.name').change(function() {
        localStorage["artist-recording"] = $(this).val() ? $(this).val() : "";
    });
        
    // Hack: swith JQuery to MB's one, and save GreaseMonkey one
    var GM_JQuery = $;
    $ = unsafeWindow.$;
    unsafeWindow.MB.Control.EntityAutocomplete ({ inputs: $('span.artist.autocomplete') });
    // Back to GreaseMonkey's JQuery
    $ = GM_JQuery;
        
    $('#search-recordings').click(function() {
        searchRecordings();
    });
    
    var html = "<table class='tbl' ><thead><tr>" +
            "<th style='width: 1em'><input type='checkbox'></th>";
    $.each(PERFORMANCE_RELATIONSHIP_ATTRIBUTES, function(index, attr) {
        var attr_title = (attr == "instrumental" ? "instr." : attr);
        html +=  "<th style='width: 2em'>"+attr_title+"</th>";
    });            
    html += "<th>Name</th>" + 
            "<th>Artist</th>" +
            "<th>Release types</th>" +
            "<th style='width: 2em'>Score</th>" + 
        "</tr> </thead>" +
        "<tbody id='perfs-recordings' />" +
        "</table>";
    $("#content").append(html);
    $("#content").append("<br /><span class='buttons'><img style='display: none;' src='/static/images/icons/loading.gif' id='spinner'/><button type='submit' id='submit-perfs-ars'>Create relationships</button></span>");

    work = new Object();
    work.mbid = $("div.workheader h1 a").attr("href").match("musicbrainz.org/work/(.{36})")[1];
    work.title = $("div.workheader h1 a").text();

    // Recordings already linked to work
    work.recordings = new Object();
    $("#content h2:contains('Relationships') ~ table.details tr")
        .filter(function() { return $(this).find("th").text().match(/recordings/); })
        .find("a").each(function() {
        var $link = $(this);
        if ($link.attr("href").match("musicbrainz\.org\/recording\/(.{36})$")) {
            var mbid = $link.attr("href").match("musicbrainz\.org\/recording\/(.{36})$")[1];
            if (work.recordings.hasOwnProperty(mbid)) return true;
            work.recordings[mbid] = $link.text();
        }
    });
    
    $("#submit-perfs-ars").click(function() {
           
        $("#perfs-recordings tr").each(function(index) {
            var $tr = $(this);
            
            // Skip non selected recording or table header
            if (!$tr.find("input.selected").attr('checked')) return true;
        
            var recording = new Object();
            recording.mbid = $(this).find("a.recording").attr("href").match("musicbrainz\.org\/recording\/(.{36})$")[1];
            
            var attributes = {};
            $.each(PERFORMANCE_RELATIONSHIP_ATTRIBUTES, function(index, attr) {
                attributes[attr] = $tr.find("input.attrs."+attr).attr('checked');
            });
            
            ajaxQueue.push( {
                work: { mbid: work.mbid }, 
                recording: { mbid: recording.mbid }, 
                attributes: attributes,
                success: function(data) { 
                    mylog("AR created"); 
                    $("#spinner").hide();
                    if (ajaxQueue.length == 0) {
                        setInterval(function(){
                            unsafeWindow.window.location.reload();
                        }, 800);
                    }
                }
            } );
            
        });
    
    }); // $("#submit-perfs-ars").click(function() {

}

function searchRecordings() {

    var luceneQuery = "recording:(" + luceneEscape(work.title) + ")^4";

    // Artist MBID?
    if ($('span.artist.autocomplete input.gid').val() != "") {
        var artistLuceneQuery = "arid:" + $('span.artist.autocomplete input.gid').val();
        luceneQuery += " AND " + artistLuceneQuery;
    } else if ($('span.artist.autocomplete input.name').val() != "") {
        var artistLuceneQuery = "artist:(" + luceneEscape($('span.artist.autocomplete input.name').val()) + ")";
        luceneQuery += " AND " + artistLuceneQuery;
    }
    mylog("Lucene query: "+luceneQuery);
    var searchURL = "http://search.musicbrainz.org/ws/2/recording/?query=" + encodeURIComponent(luceneQuery) 
        + "&fmt=json" + "&limit="+MAX_MATCHES_LIMIT;
    
    $.getJSON(searchURL, function(data) {

        $("#perfs-recordings").empty();       
        var recordings = data["recording-list"].recording;
        $.each(recordings, function(index, recording) {
            if (recording.score < MIN_LUCENE_SCORE) { return false; }

            var striked = false;
            if (work.recordings.hasOwnProperty(recording.id)) return true; //striked = true;

            // Release-group types
            var releasetypes = {};
            $.each(recording["release-list"].release, function(i, release) {
                if(release.hasOwnProperty('release-group') && release["release-group"] && release["release-group"].hasOwnProperty('type')) {
                    releasetypes[release["release-group"].type] = 1;
                }
            });
            releasetypes = Object.keys(releasetypes).sort();

            var $tr = $("<tr />");
            if (index % 2 == 1) $tr.addClass("ev");
            $("#perfs-recordings").append($tr);
            $tr.append("<td><input class='selected' type='checkbox' value='" + recording.id + "'" 
                + (striked?" disabled='disabled'":"") + " name='link'></td>");
            $.each(PERFORMANCE_RELATIONSHIP_ATTRIBUTES, function(index, attr) {
                $tr.append("<td><center><input class='attrs "+attr+"' type='checkbox' name='link'></center></td>");
            });
            $tr.append("<td><a class='recording' href='http://"+ document.location.host +"/recording/" + recording.id + "'>" 
                + (striked?"<s>":"") + recording.title + (striked?"</s>":"") + "</a>"
                + (recording.hasOwnProperty("disambiguation") ? " <span class='comment'>(" + recording.disambiguation + ")</span>" : "")
                + "</td>");
            $tr.append("<td>" + artistcredit2HTML(recording["artist-credit"]) + "</td>");
            $tr.append("<td>" + releasetypes.join(", ") + "</td>");
            $tr.append("<td>" + recording.score + "</td>");
            
            $tr.find("input.attrs").change(function() {
                if ($(this).attr('checked')) {
                    $(this).parents("tr").find("input.selected").attr("checked", true);
                }
            });

        });
    });		


}

function luceneEscape(text) {
	var newtext = text.replace(/[-[\]{}()*+?~:\\^!"]/g, "\\$&");
	return newtext.replace("&&", "\&&").replace("||", "\||");
}

function artistcredit2HTML(artistcredit) {
    var html = "";
    $.each(artistcredit["name-credit"], function(index, namecredit) {
        html += "<a href='http://"+ document.location.host +"/artist/" + namecredit.artist.id + "'>" + 
                (namecredit.hasOwnProperty("name") ? namecredit.name : namecredit.artist.name) + "</a>";
        if (!namecredit.hasOwnProperty("name") && namecredit.artist.hasOwnProperty("disambiguation")) { 
            html += " <span class='comment'>(" + namecredit.artist.disambiguation + ")</span>"
        }
        if (namecredit.hasOwnProperty("joinphrase")) html += namecredit.joinphrase;
    });
    return html;
}

///////////////////////////////////////////////////////////////////
// For artist recordings page (mb.org/artist/MBID/recordings)
///////////////////////////////////////////////////////////////////

function setupRecordingsUI() {

    // Abort if there are no recordings
    if($("table.tbl tr[class!='subh']").length == 0) return;
    
    var mbidRE = /(artist|label|release|release-group|recording|work)\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/;

    // Determine target column
	var columnindex = 0;
	$("table.tbl thead th").each(function(index, th) {
        if ($(th).text() == "Rating") {
            columnindex = index - 1;
            return false;
        }
	});

    // Set MBID to row in tables to get easiest fastest access
	$("table.tbl tr[class!='subh']").each(function() {
		var $tr = $(this);

		$tr.children("th:eq("+columnindex+")").after("<th>Work(s)</th>");
		$tr.children("td:eq("+columnindex+")").after("<td class='works'></td>");
		
		$tr.find("a").each(function() {
			var href = $(this).attr("href");
			if (m = href.match(mbidRE)) {
				$tr.attr("id", m[2]);
				return false;
			}
		});
	}); 

    var html = 'Relate checked recordings to work '
        // Work autocomplete field
        + '<span class="work autocomplete">'
        + '<img src="http://musicbrainz.org/static/images/icons/search.png" class="search" />'
        + ' <input type="text" style="width: 170px;" class="name" />'
        + ' <input type="hidden" class="gid" />'
        + ' <input type="hidden" class="id" />'
        + '</span>'
        + '&nbsp;with the following attributes:';
    $.each(PERFORMANCE_RELATIONSHIP_ATTRIBUTES, function(index, attr) {
        html += '<label><input type="checkbox" class="attrs '+attr+'">&nbsp;'+attr+'</label>';
        if (index > 0) html += "&nbsp;";
    });
    html += '&nbsp;<button id="link-rec-work">Create</button>';

    $('#content h2').after(html);
    
    // Setup work autocomplete
    // Hack: swith JQuery to MB's one, and save GreaseMonkey one
    var GM_JQuery = $;
    $ = unsafeWindow.$;
    unsafeWindow.MB.Control.EntityAutocomplete ({ inputs: $('span.work.autocomplete') });
    // Back to GreaseMonkey's JQuery
    $ = GM_JQuery;

    // Setup Create link action
    $('#link-rec-work').click(function() {
    
        if ($('span.work.autocomplete input.gid').val() == "") return;
            
        $("#content table.tbl tbody tr").each(function(index) {
            var $tr = $(this);
            // Skip non selected recording or table header
            // or recording already linked to a work
            if (!$tr.find("input:checkbox").attr('checked') || $tr.find("td.works a").length > 0) {
                return true;
            }
            
            var attributes = {};
            $.each(PERFORMANCE_RELATIONSHIP_ATTRIBUTES, function(index, attr) {
                attributes[attr] = $("input.attrs."+attr).attr('checked');
            });
            ajaxQueue.push( {
                work: { mbid: $('span.work.autocomplete input.gid').val(), name: $('span.work.autocomplete input.name').val() }, 
                recording: { mbid: $tr.attr("id") }, 
                attributes: attributes,
                success: function(data) { 
                    mylog("AR created"); 
                    var $tr = $('#'+data.recording.mbid);
                    $tr.find("input:checkbox").attr('checked', false);
                    $tr.find("td").css("background-color", "");
                    $tr.find("td.works").append('<a href="http://'+document.location.host+'/work/'+data.work.mbid+'">'+data.work.name+'</a>');
                    $("#spinner").hide();
                } 
            });
            
        });
    
    });
    retrieveWorksForArtist();

}

function retrieveWorksForArtist(offset) {
    if(!offset) offset = 0;
    
    var m = window.location.href.match("\/artist/(.{36})\/recordings");
    var artistMBID = m[1];

    // Call the MB webservice
	var url = 'http://' + document.location.host + '/ws/2/recording?artist=' + artistMBID + '&inc=work-rels&limit='+MAX_RESULTS_LIMIT+'&offset='+offset;
	mylog('wsurl: ' + url);

	$.get(url, function(data, textStatus, jqXHR) {

        // Parse each child
		$(data).find("recording").each(function() {
            var recordingMBID = $(this).attr('id');
            var works = [];

            $(this).find("relation[type='recording'] work").each(function() {
                var work = {
                    mbid: $(this).attr('id'),
                    name: $(this).find('title').text(),
                    iswc: $(this).find('iswc').text()
                };
                works.push(work);
            });

            var workLinks = [];
            $.each(works, function(index, work) {
                workLinks.push( '<a href="http://'+document.location.host+'/work/'+work.mbid+'">'+work.name+'</a>' );
            });

            $('#'+recordingMBID + ' td.works').append(workLinks.join(', '));

        });

        var newOffset = offset+MAX_RESULTS_LIMIT;
        var totalCount = $(data).find('recording-list').attr('count');
        if (newOffset <= totalCount && totalCount <= MAX_RECORDINGS) {
            setTimeout(function() { retrieveWorksForArtist(newOffset) }, WS_REQUEST_DELAY);
        }

    });

}

///////////////////////////////////////////////////////////////////
// Commons functions
///////////////////////////////////////////////////////////////////

function mylog(obj) {
    var DEBUG = true;
    if (DEBUG && unsafeWindow.console) {
        unsafeWindow.console.log(obj);
    }
}
