// ==UserScript==
// @name           MusicBrainz & DBPedia integration
// @version        2012-01-03_01
// @namespace      http://userscripts.org/users/22504
// @include        http://*musicbrainz.org/artist/*
// @include        http://*musicbrainz.org/release-group/*
// @include        http://*musicbrainz.org/label/*
// @include        http://*musicbrainz.org/work/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

// Preferences
var PREFERED_LANGUAGE = 'en';
var DEFAULT_LANGUAGE = 'en';

// Script
var SUC_script_num = 104963; // Change this to the number given to the script by userscripts.org (check the address bar)

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var endpoint = "http://dbpedia.org/sparql";
var jsonFormat = "application/sparql-results+jsonp"; // or "application%2Fsparql-results%2Bjsonp"
var query;

$(document).ready(function(){

    // Only display this feature on Overview and Edit tabs
    var re = new RegExp("musicbrainz\.org\/(artist|release-group|label|work)\/(.{36})(|/edit)$","i");
    if (!window.location.href.match(re)) { return; }

    var m = window.location.href.match(re);
    var mbid = m[2];
	
	// Use cache if it has the info
	if (sessionStorage.getItem('dbpedia-'+mbid)) {
    	handleDBPediaData(JSON.parse(sessionStorage.getItem('dbpedia-'+mbid)));
		return;
	}

	// Skip if there's no Wikipedia link
	if ($('#sidebar li.wikipedia a:first').length == 0) return;
	
	// Otherwise query DBPedia
	var wikiurl;
    // Favor english wikipedia page, otherwise pick first link
    $('#sidebar li.wikipedia a:first').each(function(index, link) {
        if (index == 0 || $(link).attr('href').match(/en\.wikipedia\.org/))
             wikiurl = $(link).attr('href');
    });
	var key = wikiurl.replace(/http:\/\/.{2}\.wikipedia\.org\/wiki\//, '');
	key = encodeURIComponent(key).replace("(",'%28').replace(")",'%29').replace("#",'%23');
    var wikiresource = 'http://dbpedia.org/resource/' + key;

	query = "PREFIX dbpedia:<http://dbpedia.org/ontology/> "
		+ "PREFIX dbpprop:<http://dbpedia.org/property/> "
		+ "PREFIX foaf: <http://xmlns.com/foaf/0.1/> "
		+ "SELECT ?abstract, ?birthDate, ?deathDate, ?activeYearsStartYear, ?activeYearsEndYear, ?thumbnail "
		+ " WHERE { "
		+	" <" + wikiresource + "> dbpedia:abstract  ?abstract . " 
		+ 	" OPTIONAL { <" + wikiresource + "> dbpedia:birthDate ?birthDate } . "
		+ 	" OPTIONAL { <" + wikiresource + "> dbpedia:deathDate ?deathDate } . "
		+ 	" OPTIONAL { <" + wikiresource + "> dbpedia:thumbnail ?thumbnail } . "
		+ 	" OPTIONAL { <" + wikiresource + "> dbpedia:activeYearsStartYear ?activeYearsStartYear } . "
		+ 	" OPTIONAL { <" + wikiresource + "> dbpedia:activeYearsEndYear ?activeYearsEndYear } . "
		//+ 	" dbpprop:birthName ?birthName; "
		//+ 	" rdf:type ?type . "
		+ 	" FILTER ( langMatches(lang(?abstract), '" + PREFERED_LANGUAGE + "') " 
		+		" || langMatches(lang(?abstract), '" + DEFAULT_LANGUAGE + "') ) "
		+ "}";
	//mylog(query);
   
    var privilegiedJQuery = unsafeWindow ? unsafeWindow.$ : $;
	privilegiedJQuery.getJSON(endpoint + '?query=' + query,
		function(data, textStatus) {
			mylog(data);
			var dbpinfo = {};

			// Abstract
			var abstracts = new Object();				
			$.each(data.results.bindings, function(index, binding) {
				abstracts[ binding.abstract["xml:lang"] ] = binding.abstract.value;
			});

			if (abstracts.hasOwnProperty(PREFERED_LANGUAGE.toLowerCase())) {
				dbpinfo.abstract = abstracts[PREFERED_LANGUAGE.toLowerCase()];
			} else if (abstracts.hasOwnProperty(DEFAULT_LANGUAGE.toLowerCase())) {
				dbpinfo.abstract = abstracts[DEFAULT_LANGUAGE.toLowerCase()];
			}

            // Other properties
            var otherproperties = [ "birthDate", "deathDate", "thumbnail" ];
            $.each(otherproperties, function(index, property) {
                if (data.results.bindings.length > 0 && 
                    data.results.bindings[0].hasOwnProperty(property)) {
                     dbpinfo[property] = data.results.bindings[0][property].value;
                }
            });
            sessionStorage.setItem('dbpedia-'+mbid, JSON.stringify(dbpinfo));
			
			handleDBPediaData(dbpinfo);
		}
	);

});

function handleDBPediaData(dbpinfo) {
	var re = new RegExp("(artist|release-group|label|work)\/(.{36})\/edit$","i");
	// Edit mode
    if (window.location.href.match(re)) { 
		editmode(dbpinfo);
	// View mode
	} else {
		displayAbstract(dbpinfo);
		displayThumbnail(dbpinfo);
	}
}

function displayAbstract(dbpinfo) {
    var abstract = dbpinfo.hasOwnProperty('abstract') ? dbpinfo.abstract : "No abstract found.";
	$('#content div.tabs').after('<h2>Wikipedia abstract</h2><div class="annotation">' + abstract + '</div>');
}

function displayThumbnail(dbpinfo) {
    if (!dbpinfo.hasOwnProperty('thumbnail')) return;
	$('#sidebar h2:first').before('<img src="'+dbpinfo.thumbnail+'" />');
}

function editmode(dbpinfo) {
	var $div = $('<div class="row no-label buttons"><button class="submit positive" type="submit">Retrieve information from DBPedia</button></div>');
	$('#content fieldset:first').after($div);
	$div.find('button').click(function(e) {
		e.preventDefault();
		// Begin and end dates (for artist)
		var datetypes = { begin: 'birthDate', end: 'deathDate' };
		$.each(datetypes, function (datetype, dpbkey) {
			if (dbpinfo.hasOwnProperty(dpbkey)) {
				var tmp = dbpinfo[dpbkey].split('-');
				var dbpdate = { year: tmp[0], month: tmp[1], day: tmp[2] };
				$.each(['year', 'month', 'day'], function(index, datepart) {
					if ($('#id-edit-artist\\.'+datetype+'_date\\.' + datepart).val() == ""
						&& dbpdate[datepart] != "00") {
						mylog("setting " + datepart + " from dbp");
						$('#id-edit-artist\\.'+datetype+'_date\\.' + datepart).val(dbpdate[datepart]);
					}
				});
			}
		});

	});
}

function mylog(text) {
    if (unsafeWindow.console) {
        unsafeWindow.console.log(text);
    }
}
