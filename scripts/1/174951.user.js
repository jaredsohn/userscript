// ==UserScript==
// @name			SF.net Files - Download from Master server
// @namespace		sf-download-master-server
// @include			http://sourceforge.net/p/*/files/*/download*
// @include			https://sourceforge.net/p/*/files/*/download*
// @include			http://sourceforge.net/projects/*/files/*/download*
// @include			https://sourceforge.net/projects/*/files/*/download*
// @include			http://sourceforge.net/settings/mirror_choices?*
// @include			https://sourceforge.net/settings/mirror_choices?*
// @datecreated		2013-08-03
// @lastupdated		2013-08-29
// @version			1.3
// @author			Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		This userscript will add link to download from SourceForge Master Server for the SF.net Files.
// ==/UserScript==

if (/mirror_choices/i.test(window.location.href)) {
	var my_submitbtn_js='$(\'#mirrors-container input[type="submit"]\').fadeIn("slow");';
	addScript(document.body, my_submitbtn_js, '');
	return true;
}

/*
* Translate
* from;
* http://sourceforge.net/projects/filezilla/files/FileZilla_Client/3.7.1.1/FileZilla_3.7.1.1_win32.zip/download
* to;
* http://master.dl.sourceforge.net/project/filezilla/FileZilla_Client/3.7.1.1/FileZilla_3.7.1.1_win32.zip
* Regex;
* http(?:s?)://sourceforge\.net/(?:p|projects)/([^\\/:*?"<>|\r\n]+)/files/([^\\:*?"<>|\r\n]+)/download(?:[^\r\n]*)
* http://master.dl.sourceforge.net/project/$1/$2
*/

var myregexp1 = /http(?:s?):\/\/sourceforge\.net\/(?:p|projects)\/([^\\\/:*?"<>|\r\n]+)\/files\/([^\\:*?"<>|\r\n]+)\/download/i;
var myregexp2 = /http(?:s?):\/\/sourceforge\.net\/(?:p|projects)\/([^\\\/:*?"<>|\r\n]+)\/files\/([^\\:*?"<>|\r\n]+)\/download(?:[^\r\n]*)/ig;
var myregexp3 = /dl\.sourceforge\.net\//i;
var myregexp4 = /project\/[^\/]+\/([^\\:*?"<>|\r\n]+)$/i;

var match = window.location.href.match(myregexp1);
if (match != null) {
	// matched text: match[0]
	// match start: match.index
	// capturing group n: match[n]
	var projectname=match[1];
	var filename=match[2];
	var filename_short=filename.replace(/[^\/]*\//ig, "");
} else {
	// Match attempt failed
	alert("failed to find projectname and filename from the window location!");
}

if (match != null) { // we probably know projectname and filename. add change mirror link..
	var mirror_html="<p id='my_mirror_downloads'> or try another "
+"            <a id='mirror_choiceUrl' href='/settings/mirror_choices?projectname="+projectname+"&amp;filename="+filename+"'"
+"               title='A mirror is an exact copy of a download available in multiple locations around the world.  Select the one closest to your location.'"
+" rel='nofollow'>        mirror</a>.</p>";
	var my_mirror_js='$( "#starting a.direct-download[href*=\'partner\']" ).parents( "#starting" ).append( "'+mirror_html+'" );';
	addScript(document.body, my_mirror_js, '');
}

var master_dl_link = window.location.href.replace(myregexp2, "http://master.dl.sourceforge.net/project/$1/$2");

var my_custom_js='$( "#starting" ).append( "<p>Alternatively, you can <a id=\'master_finalUrl\' href=\\"'+master_dl_link+'\\">download from SourceForge.net Master Download Server</a></p>" );';
addScript(document.body, my_custom_js, '');

if (match != null) { // we probably know projectname and filename. add direct link to a mirror..
	GM_xmlhttpRequest({
		headers: {
			"User-Agent": "Wget/1.9.1"
		},
		url: window.location.href,
		method: "HEAD",
		onload: function(response) {
			//alert("success\n"+response.finalUrl); // for debugging
			//if (myregexp3.test(response.finalUrl)) { 
			if ( (response.finalUrl.indexOf(filename_short) > -1) || (filename_short=='latest') ) {
				// Successful match, it should be a valid direct link to a mirror
				//var my_mirror_directlink_js='$( "#starting a.direct-download[href*=\'partner\']" ).attr(\'href\', "'+response.finalUrl+'" );';
				var mirror_dl_html='Don\'t want to try crapware? Please use this <a id=\'mirror_finalUrl\' href=\''+response.finalUrl+'\'>direct download link</a>, ';
				var my_mirror_directlink_js='$( "#my_mirror_downloads" ).prepend( "'+mirror_dl_html+'" );';
				addScript(document.body, my_mirror_directlink_js, '');
				if (filename_short=='latest') {
					var match = myregexp4.exec(response.finalUrl);
					if (match != null) {
						result = match[1];
						replaceFilename(result);
					}
				}
			}
		}
	});
}

/*
################################################
#   INTERNAL USERSCRIPT FUNCTIONS
################################################
*/

// Function : addScript()
// Source: http://userscripts.org/groups/51

function addScript(body, js, link) {
	if (!body){
		var body = document.body; 
	}
	script = document.createElement('script');
    if (!body) return;
    script.type = 'text/javascript';
	if ( (js=='') && (link!='') ){
		script.src = link;
	} else {
		script.textContent = js;
	}
    body.appendChild(script);
	//return script;
}

function replaceFilename(filename) {
	var my_replace_filename_js = 'jQuery(\'#master_finalUrl, #mirror_choiceUrl\').each(function(){' + "\r\n"
+ '    this.href = this.href.replace(/latest$/i, \''+filename+'\');' + "\r\n"
+ '});';
	addScript(document.body, my_replace_filename_js, '');
}