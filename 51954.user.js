// ==UserScript==
// @name           extractAll
// @version        1.02
// @author         livinskull
// @namespace      http://userscripts.org/users/livinskull
// @description    Adds 'Extract all' to dotMoar File page ;)
// @include        http://www.forumwarz.com/characters/me
// @include		   http://forumwarz.com/characters/me
// ==/UserScript==

var debug = false;
var doltcounter = 0;
var abort = false;
var file_ids = new Array();
var auth_token = '';
var counter = 0;
var Element = unsafeWindow['Element'];
var Effect = unsafeWindow['Effect'];
$ = unsafeWindow['window'].$;

unsafeWindow.document.getElementById('_moar_files_tab').watch('className', switchedTab);


function switchedTab(prop, oldval, newval) {
	
	if (prop == 'className'  && newval == 'current') {	//switched to .moar tab
			if (document.getElementById('extract_all_link') == null) {
				var moarTable = document.getElementById("moar_files").getElementsByTagName("table")[0];
			
				if (moarTable) {
					if (debug) 
						GM_log('we are on moar files tab');
					moarHeader = moarTable.getElementsByTagName("tr")[0];
					moarHeader.cells[0].innerHTML += "&nbsp;&nbsp;<a href=\"#\" id=\"extract_all_link\">Extract All</a>";
					document.getElementById('extract_all_link').addEventListener("click", extractAllDotMoarFiles, true);
				}
			}
	} 
	
	return newval;
}

function extract(iId) {
	if (debug)
		GM_log('extracting file ' + iId);
		
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://www.forumwarz.com/characters/assemble_file/" + iId,
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: 'authenticity_token=' + encodeURIComponent(auth_token),
		onload: function (resp) {
			if (debug)
				GM_log('Reply: ' + resp.status);
			if (resp.status == 200) {
				
				if (debug)
					GM_log(resp.responseText);
				var nr_arr = resp.responseText.match(/same file again\\n([0-9]+)\\nmore\\ntime/i);
				var id_arr = resp.responseText.match(/Element\.update\(\"extract_moar_type_([0-9]+)\", \"\"\);/i);
			
				if (id_arr) {
					counter++;
					if (nr_arr) {
						//add file_id nr times to file_ids
						if (debug)
							GM_log('file ' + id_arr[1] + ' exists ' + nr_arr[1] + ' more times');

						extract(id_arr[1]);						
					}
					
					// update page
					Element.update("pieces_moar_type_"+id_arr[1], "");
					Element.update("show_moar_type_"+id_arr[1], "<b>extracted!</b>");
					Element.update("extract_moar_type_"+id_arr[1], "");
					Element.update("bar_moar_type_"+id_arr[1], "");
					Element.update($("extract_all_link"), "Extracted: " + counter + "<br />" );
						
				} else {	// inventory probably full
					Element.update($("extract_all_link"), "Extracted: " + counter + "&nbsp;&nbsp;<span style=\"color:red\">Aborted, inventory is full</span>" );
					abort = true;
				}
				
			} else if (resp.status == 500) {
				fail = true;
			}
		}
	});
}

function extractAllDotMoarFiles() {
	GM_xmlhttpRequest({
        method:"GET",
        url:"http://www.forumwarz.com/characters/moar",
        onload:function(response) {
            if(response.status == 200){
				// find all 'extract'links
				var moarFiles = response.responseText.match(/\\u003Ctd id=\'extract_moar_type_([0-9]+)\'\\u003E\\n.{100,300}extract\\u003C\/a\\u003E\\u003C\/b\\u003E\\n\s*\\u003C\/td\\u003E\\n/gi);
				
				number = 0;
				if (moarFiles != null)
					number = moarFiles.length;
				
				if(number > 0){
					if (debug)
						GM_log('Found ' + number + ' links');
					
					// fetch authencity token; its the same for ALL links
					var authmatch = moarFiles[0].match(/authenticity_token=\' \+ encodeURIComponent\(\'([A-Za-z0-9\/=+]+)\'\)}\);/);
					auth_token = authmatch[1];
					
					if (debug)
						GM_log('Auth-token: ' + auth_token);
					
					// parse moarFiles to fetch all ids; add em to file_ids
					for (i=0; i<moarFiles.length; i++) {
						var id = moarFiles[i].match(/id=\'extract_moar_type_([0-9]+)\'\\u003E\\n/);
						file_ids.push(id[1]);
					}
					
					//now extract all of file_ids
					while (file_ids.length && !abort) {
						if (debug)
							GM_log('File-ids: ' + file_ids);
						
						//for each link call it && check if moar to extract
						extract(file_ids.shift());
					}

				
				} else {
					// if nothing to extract
					
					switch (doltcounter) {
						case 0:	Element.update($("extract_all_link"), "There is nothing to extract"); break;
						case 1: Element.update($("extract_all_link"), "There is still nothing to extract, moron"); break;
						case 2: Element.update($("extract_all_link"), "You're disabled, right?"); break;
						default: Element.update($("extract_all_link"), "Stop clicking me, dammit!"); break;
					}
					doltcounter++;
						
					Effect.Shake($("extract_all_link"), { distance: 2, duration: 0.5});
				}
            }
        }
    });
}


