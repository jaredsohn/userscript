// ==UserScript==
// @name           Musicbrainz NGS UI enhancements
// @description    Musicbrainz Various NGS UI enhancements
// @version        2013.09.09.1
// @icon           http://wiki.musicbrainz.org/-/images/3/3d/Musicbrainz_logo.png
// @namespace      http://userscripts.org/users/22504
// @include        http*://*musicbrainz.org/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require        https://raw.github.com/murdos/mbediting.js/master/mbediting.js
// ==/UserScript==

function addJQuery(callback) {var script = document.createElement("script");script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js");script.addEventListener('load', function() {var script = document.createElement("script");script.textContent = "(" + callback.toString() + ")();";document.body.appendChild(script);}, false);document.body.appendChild(script);}addJQuery(main);

function main() {
    jQuery.noConflict(); 
    (function ($) {

    // -------------- Start of script ------------------------
    
    function mylog(obj) {
        var DEBUG = true;
        if (DEBUG && typeof console != 'undefined') {
            console.log(obj);
        }
    }

    // Highlight table rows
    $('table.tbl tbody tr').hover(
        function () {
            $(this).children('td').each(function(){
                var backgroundColor = $(this).css("backgroundColor");
                if (backgroundColor != 'rgb(255, 255, 0)')
                    $(this).css("backgroundColor", "#ffeea8");
            });
        },
        function () {
            $(this).children('td').each(function(){
                var backgroundColor = $(this).css("backgroundColor");
                if (backgroundColor != 'rgb(255, 255, 0)')
                    $(this).css("backgroundColor", "");
            });
        }
    );
    
    // Change colours when voting
    re = new RegExp("\/(artist|release-group|release|recording|work|label|search|user)(\/.*)?\/edits","i");
    if (window.location.href.match(re)) {
        var colors = {
            '1':  '#CCFFCC',   // Yes
            '0':  'pink',         // No
            '-1': 'lightyellow',  // Abstain
            '-2': ''              // No vote
        };
        
        function setColor(el) {
            var $div = $(el).hasClass('edit-actions') ? $(el) : $(el).parents('.edit-actions');
            $div.find('input:checked').each(function(index, input) {
                $div.css('background-color', colors[input.value]);
            });
        }

        $('.edit-actions').each(function() {
            // set up event handler
            $(this).find('input').change(function(ev) { setColor(ev.target); });
            // initialize colors
            setColor(this);
        });
    }
    
	// Temporary fix for http://tickets.musicbrainz.org/browse/MBS-750
    re = new RegExp("musicbrainz\.org\/release\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})","i");
    if (window.location.href.match(re)) {
		if ( $("tr.subh").length == 1 ) {
		    var text = $.trim($("tr.subh:eq(0)").text());
		    if (text.match(/ 1$/)) {
                $("tr.subh:eq(0) a").text(text.replace(/ 1$/, ''));
            }
		}
	}

	// Temporary fix for http://tickets.musicbrainz.org/browse/MBS-1943
    re = new RegExp("musicbrainz\.org\/(artist|release-group|release|recording|work|label)\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})","i");
    if (window.location.href.match(re)) {
        $("#sidebar h2:contains('Rating')").before($("#sidebar h2:contains('External links')"));
        var pageHasRGLinks = $("#sidebar h2:contains('Release group external links')").length > 0;
        $("#sidebar h2:contains('Rating')").before(
            $("#sidebar h2:contains('External links')").nextAll("ul.external_links").filter( function() {
                return !pageHasRGLinks || $(this).nextAll("h2:contains('Release group external links')").length > 0;
        }));
        $("#sidebar h2:contains('Rating')").before($("#sidebar h2:contains('Release group external links')"));
        $("#sidebar h2:contains('Rating')").before($("#sidebar h2:contains('Release group external links')").nextAll("ul.external_links"));
	}
	
    // Remove the affiliate section
    re = new RegExp("musicbrainz\.org\/(artist|release-group|release|recording|work|label)\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})","i");
    if (window.location.href.match(re)) {
        $('#sidebar-affiliates').remove();
    }
    
    // Batch merge -> open in a new tab/windows
    var re = new RegExp("musicbrainz\.org\/artist\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/(recordings|releases|works)","i");
    if (window.location.href.match(re)) {
        $("form").filter(function() {
            return $(this).attr("action").match("merge_queue");
        }).attr("target", "_blank");
    }	

    // "Ajax" approve links
    var re = new RegExp("musicbrainz\.org/.*/(open_)?edits","i");
    if (window.location.href.match(re)) {
        $("div.edit-actions a[href*='approve']").each(function(index, link) {
            $(link).click(function(e) {
                e.preventDefault();
                var url = $(link).attr('href');
                edit_id = url.match(/\/edit\/(\d+)\/approve/)[1];
                url = url.substr(0, url.indexOf("?url="));
                $(link).before('<img style="vertical-align:middle;" src="/static/images/icons/loading.gif" id="spinner-'+edit_id+'"/>');
                var callback = $.proxy(function() { $('#spinner-'+this.edit_id).remove(); $(this.link).parents('div.edit-actions').find('div.voteopts').remove(); $(this.link).remove(); }, {edit_id: edit_id, link: link});
                if (MB.Editing) {
                    MB.Editing.approveEdit(edit_id, callback);
                } else {
                    $.get(url, callback);
                }
            });
        });
    }

    // Modify link to edits: remove " - <Edit type>" from the link "Edit XXXX - <Edit type>"
    var re = new RegExp("musicbrainz\.org/.*/(open_)?edits","i");
    if (window.location.href.match(re)) {
        $("div.edit-description ~ h2").each(function() {
            var parts = $(this).find("a").text().split(" - ");
            $(this).find("a").text(parts[0]);
            $(this).append(" - " + parts[1]);
        });
    }

    // Add direct to cover art tab for Add cover art edits 
    var re = new RegExp("musicbrainz\.org/(.*/(open_)?edits|edit\/\d+)","i");
    if (window.location.href.match(re)) {
        $("div.edit-description ~ h2:contains('cover art')").each(function() {
			$editdetails = $(this).parents('.edit-header').siblings('.edit-details');
			mbid = $editdetails.find("a[href*='musicbrainz.org/release/']").attr('href').match(/\/release\/(.{36})/)[1];
			$editdetails.find('tbody td.edit-cover-art').after("<tr><th span='2'><a href='/release/"+mbid+"/cover-art'>See all artworks for this release</a></th></tr>");
        });
    }
	
    // Embed Youtube videos
    re = new RegExp("musicbrainz\.org\/recording\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$","i");
    if (window.location.href.match(re)) {
        var $youtube_link = $('#sidebar li.youtube a');
        if ($youtube_link.length > 0) {
            var youtube_id = $youtube_link.attr("href").match(/http:\/\/www\.youtube\.com\/watch\?v=(.*)/)[1];
            $("table.details").width("60%");
            $("h2:contains('Relationships')").after('<iframe width="360" height="275" frameborder="0" style="float: right;" src="https://www.youtube.com/embed/'+ youtube_id +'?rel=0" allowfullscreen=""></iframe>');
        }
    }

	// When attaching CDTOC, autoselect artist when there's only one result
    re = new RegExp("musicbrainz\.org\/cdtoc\/attach.*&filter-artist.query=.*","i");
    if (window.location.href.match(re)) {
		$artists = $('ul.radio-list li');
        if ($artists.length == 1) {
			$artists.find('input:radio').attr('checked', true);
        }
    }
	

    // Highlight Year in ISRCs codes
    re = new RegExp("musicbrainz\.org\/artist\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/recordings","i");
    if (window.location.href.match(re)) {
        var isrcColNo; // = ($("#content table.tbl thead th:eq(2)").text() == "Artist") ? 3 : 2;
        $("#content table.tbl thead th").each(function(index, th) {
            if ($(th).text() == "ISRCs") isrcColNo = index;
        });
        $("#content table.tbl tbody tr").each(function() {
            var $td = $(this).find("td:eq("+isrcColNo+")");
            var reg = new RegExp("([A-Z]{2}[A-Z0-9]{3}[0-9]{7})");
            var isrcs = $td.text().trim().split("\n<br>\n");
            var newHTML = "";
            $.each(isrcs, function(index, isrc) {
                isrc = isrc.trim();
                newHTML += isrc.substring(0,5) + "<b>" + isrc.substring(5,7) + "</b>" + isrc.substring(7);
                if (index !=  isrcs.length-1) { newHTML += "<br>" };
            });
            $td.html(newHTML);
        });
    }	
	
	// Discogs link rollover
	//re = new RegExp("musicbrainz\.org\/(artist|label|release-group|release)\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\/relationships","i");
	re = new RegExp("musicbrainz\.org\/release\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\/relationships","i");
	if (window.location.href.match(re)) {
        // TODO...
	}
	
    // -------------- End of script ------------------------

}(jQuery));
}

