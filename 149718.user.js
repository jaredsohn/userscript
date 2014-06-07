// ==UserScript==
// @name		MusicBrainz: Import from Naxos
// @description		Import releases from Naxos
// @version		2012-10-07
// @author		bog.gob
// @namespace		http://userscripts.org/users/487783
//
// @include		http://naxos.com/catalogue/*
// @include		http://naxos.com/catalogue/item.asp
// @include		http://www.naxos.com/catalogue/item.asp
// @include		http://www.naxos.com/catalogue/*
// @include		www.naxos.com/catalogue/*
// @include		file:///C:/temp/a.html


// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.js
//
// ==/UserScript==



//****************************************************************************************************************************************************//

var top_level_func = function() {
	function contentEval(source) {
	  // Check for function input.
	  if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	  }

	  // Create a script node holding this  source code.
	  var script = document.createElement('script');
	  script.setAttribute("type", "application/javascript");
	  script.textContent = source;

	  // Insert the script node into the page, so it will run, and immediately
	  // remove it to clean up.
	  document.body.appendChild(script);
	  document.body.removeChild(script);
	}

	var html = (function() {
	  var ELEMENT = this.Node?Node.ELEMENT_NODE:1,
			 TEXT = this.Node?Node.TEXT_NODE:   3;
	  return function html(el, outer) {
		var i = 0, j = el.childNodes, k = outer?"<" + (m = el.nodeName.toLowerCase()) + attr(el) + ">":"",
			l = j.length, m, n;
		while(i !== l) switch((n = j[i++]).nodeType) {
		  case ELEMENT: k += html(n, true); break;
		  case TEXT:    k += n.nodeValue;
		} return k + (outer?"</" + m + ">":"");
	  }; function attr(el) {
		var i = 0, j = el.attributes, k = new Array(l = j.length), l, m;
		while(i !== l) k[i] = (m = j[i++].nodeName) + "=\"" + el.getAttribute(m) + "\"";
		return (l?" ":"") + k.join(" ");
	  }
	})();

	function addJQuery(url, callback) {
	  var script = document.createElement("script");
	  if (url) {
		script.setAttribute("src", url);
	  }
	  script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	  }, false);
	  document.body.appendChild(script);
	}

	var  getUrlVars = function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	var artist_sort_order = function(artists) {
		return $.map(
			artists, 
			function (artist) {
				return $.map(
					artist.split(",").reverse(),
					function (s) {return s.trim();}
				).join(" ");
			}
		);
	}


	function text_node_to_text(node, includeWhitespaceNodes, strip) {
		var textNodes = [], whitespace = /^\s*$/;

		function getTextNodes(node) {
			if (node.nodeType == 3) {
				if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
					var zz= node.nodeValue;
					if (strip) {
						zz= zz.trim();
					}
					textNodes.push(zz);
				}
			} else {
				for (var i = 0, len = node.childNodes.length; i < len; ++i) {
					getTextNodes(node.childNodes[i]);
				}
			}
		}

		getTextNodes(node);
		return textNodes;
	}

	var iterate = function(obj) {
		var keys = [];

		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				 keys.push([key,obj[key]]);
			}
		}
		return keys;
	}

	var list_to_map = function (elems) {
		var out = new Object();
		$.each(elems, function(idx, elem) {
			if (elem[0] in out) {
				out[elem[0]].push(elem[1]);
			} else {
				out[elem[0]] = [elem[1]];
			}
		});
		return out;
	}
	var getKeys = function(obj){
	   var keys = [];
	   for(var key in obj){
			if (key === 'length' || !obj.hasOwnProperty(key)) continue;
			keys.push(key);
	   }
	   return keys;
	}
	
	String.prototype.format = function() {
			var formatted = this;
			for (var i = 0; i < arguments.length; i++) {
				var regexp = new RegExp('\\{'+i+'\\}', 'gi');
				formatted = formatted.replace(regexp, arguments[i]);
			}
			return formatted;
		};	
		
	var array_to_map = function(array)	{
		var out = new Object;
		$.each(array, function() {
			out[this[0]] = this[1];
		});
		return out;
	}
	
	function popup_window(title, src) {
		newwindow2=window.open('','name','height=800,width=500');
		var tmp = newwindow2.document;
		tmp.write('<html><head><title>{0}</title></head><body>'.format(title));		
		tmp.write(src);
		tmp.write('</body></html>');
		tmp.close();
	}
	
	var native_jscript_exec = function(scr) {
		window.location.href = "javascript:(" + scr + ")()";
	}
	
	var native_jscript_execs = function (source) {
	  // Check for function input.
	  if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	  }

	  // Create a script node holding this  source code.
	  var script = document.createElement('script');
	  script.setAttribute("type", "application/javascript");
	  script.textContent = source;

	  // Insert the script node into the page, so it will run, and immediately
	  // remove it to clean up.
	  document.body.appendChild(script);
	  document.body.removeChild(script);
	}	
//****************************************************************************************************************************************************//

	var naxos_headers = function(source) {
		var y = new Object();
		$.each($(source).find("td.style5 > p"), function() {
			
			var z = text_node_to_text(this, false).join(' ').trim().replace( /\n/, '' ).split(":"); 
			if (z.length == 2) {
				y[z[0].trim()] = z[1].trim().split(" ; "); 
			}
		});	  
		console.log(y);
		if (y.hasOwnProperty('Composer(s)')) {
			y['Composer(s)']	= artist_sort_order(y['Composer(s)']);
		} else {
			y['Composer(s)']	= []
		}
		
		if (y.hasOwnProperty('Artist(s)')) {
			y['Artist(s)']		= artist_sort_order(y['Artist(s)']);
		} else {
			y['Artist(s)']		= []
		}
		
		console.log(y);
		return y;
	}

		

	var naxos_works = function(source) {
		var works = new Array();
		$(source).find("div.works").each(function(idx, para) {
			var work = new Object();
			work["work"]		= text_node_to_text(para, false).join(' ').trim().replace( /\n/, '' );
			work["composers"]	= $(para).prevAll('p.composers').eq(0).find('a').map(function () {return artist_sort_order(text_node_to_text(this, true))}).get();
			work["performers"]	= $(para).next('div.performers').find('td:has(>a)').map(
									function () {
										var xx = text_node_to_text(this, true);
										if (xx.length == 1) {
											xx.push("");
										} else {
											xx[1] = xx[1].replace(',',"").trim();
										}
										xx[0] = artist_sort_order(new Array(xx[0]))[0];									
										return new Array(xx);
									}
								).get();
			work["tracks"]	= $(para).next('div.performers').nextUntil('div', 'table').map(function () {
				var disk	= $(this).prevAll('p.discnumber').eq(0).map(function () {return text_node_to_text(this, true).join(' ').replace(/^[^0-9]*([0-9]+)[^0-9]*$/g, '$1').trim()}).get();
				if (disk.length == 0) disk = "1"
				var tracks	= $(this).find('td').find('td').map(function () {return text_node_to_text(this,false,true)}).get();
				tracks.unshift(disk);
				return [tracks];
			}).get();
			console.log(work);
			console.log("################################");

			works.push(work);
		});	  
		return works;
	}

	var  naxos_scrape_fn = function(source, url) {
		console.log('#############');
		naxos_scrape = new Object();
		naxos_scrape["url"]		= url;
		naxos_scrape['headers']	= naxos_headers(source);		
		console.log(naxos_scrape);
		console.log('$$$1');
		naxos_scrape['title']	= $(source).find("h1.cdtitle").eq(0).text().trim();		
		console.log(naxos_scrape);
		console.log('$$$2');
		naxos_scrape['works']	= naxos_works(source);
		console.log(naxos_scrape);
		console.log('$$$3');
		return naxos_scrape;
	}

	var naxos_relationships = function (scrape) {
		var out = new Object();
		$.each(scrape['works'], function(idx, work) {
			$.each(work['tracks'], function(idx, track) {	
				$.each(work["performers"], function(idx, perf) {	
					console.log(track);
					var tk = track[0] + "." + parseInt(track[1] + '0',10);
					console.log(tk);
					
					if (perf in out) {
						out[perf].push(tk);
					} else {
						out[perf] = [tk];
					}
				});
			});		
		});
		return out;
	}

	//////////////////////////////////////////////////////////////////////////////
	function naxos_ar_popup(scrape) {
		console.log('!!!');
		var out = '<table border="1"> <tr><th>Artist</th><th>Type</th><th>Tracks</th></tr>' +  $.map( 
			iterate(naxos_relationships(scrape)),
			function(pairs) {
				console.log(pairs);
				var	perf	= pairs[0].split(',')[0];
				var	instr	= pairs[0].split(',')[1];
				var	tracks	= pairs[1].join(', ');
				console.log('%&&&&&&&&&&&&');
				return [
					"<tr>", 
					'<td valign="top">{0}</td>'.format(perf),
					'<td valign="top">{0}</td>'.format(instr),
					'<td valign="top">{0}</td>'.format(tracks)
				];
				
			}
		).join("\n");	
		
		console.log(out);
		popup_window("Naxos Artist Relationships", out);
	}

	function naxos_top() {
		window.add_field = add_field = function  (name, value) {
			var field = document.createElement("input");
			field.type = "hidden";
			field.name = name;
			field.value = value;
			console.log(new Array(name, value));
			myform.appendChild(field);
		}
		

		var myform = document.createElement("form");
		myform.method="post";
		myform.action = "http://musicbrainz.org/release/add";
		myform.acceptCharset = "UTF-8";
		mysubmit = document.createElement("input");
		mysubmit.type = "submit";
		mysubmit.value = "Add to MusicBrainz";
		myform.appendChild(mysubmit);

		var div = document.createElement("div");
		div.style.top = 0;
		div.style.right = 0;
		div.style.padding = '10px';
		
		console.log('Naxos Page');	  
		var script = document.createElement('script');
		script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.js";
		document.getElementsByTagName('body')[0].appendChild(script);	
		naxos_scrape = naxos_scrape_fn(document, window.location.href);
		console.log(naxos_scrape);	  
		musicbrainz_add_recording(naxos_scrape);
		
		var buttonnode= document.createElement('input');
		buttonnode.setAttribute('type','button');
		buttonnode.setAttribute('name','Aggregate Artist Info for ARs');
		buttonnode.setAttribute('value','Aggregate Artist Info for ARs');
		buttonnode.onclick = function () {naxos_ar_popup(naxos_scrape);};		
		
		
		div.appendChild(myform);
		div.appendChild(buttonnode);
		//console.log(html(myform));
		$("td.style5").append(div); 
		
		
		return 1;
	};
	
	
	
	//////////////////////////////////////////////////////////////////////////////
	
	var  musicbrainz_add_recording = function(scape)  {
		add_field("edit_note", 					"Imported by ''MusicBrainz_Import_from_Naxos''\nhttp://userscripts.org/scripts/show/149718\n\nfrom: " + scape["url"]);
		add_field("name", 						scape['title']);
		add_field("labels.0.name", 				scape['headers']['Label'][0]);
		add_field("barcode", 					scape['headers']['Barcode'][0]);
		add_field('labels.0.catalog_number',	scape['headers']['Catalogue No'][0]);
		if (scape['headers'].hasOwnProperty('Physical Release')) {
			add_field("date.year", 					scape['headers']['Physical Release'][0].split('/')[1]);
			add_field("date.month", 				scape['headers']['Physical Release'][0].split('/')[0]);
		}
		
		add_field("language_id", 				"120");
		add_field("script_id", 					"28");
		add_field("status_id", 					"1");
		add_field("primary_type_id", 			"1");
		add_field("packaging_id", 				"1");
		

		var albumartists = scape["headers"]["Composer(s)"].concat(scape["headers"]["Artist(s)"]);
		console.log("####");
		console.log(scape["headers"]["Composer(s)"]);
		console.log(scape["headers"]["Artist(s)"]);
		console.log(albumartists);
		if ( albumartists.length  > 9) {
			add_field("artist_credit.names.%d.artist.name".replace('%d', 0), "Various Artists");
		} else {
			for (var idx =0 ; idx < albumartists.length ; idx++) {
				add_field("artist_credit.names.%d.artist.name".replace('%d', idx), albumartists[idx]);
				
				if (idx + 1 < albumartists.length) {
					if (idx + 1 == scape["headers"]["Composer(s)"].length) {
						add_field("artist_credit.names.%d.join_phrase".replace('%d', idx), "; ");
					}
					else {
						add_field("artist_credit.names.%d.join_phrase".replace('%d', idx), ", ");
					}
				}
			}
		}
		
		console.log("^^^^^^");
		disks = {};
		$.each(scape['works'],  function(idx,work) {
			$.each(work["tracks"],  function(idx,track) {

				
				var diskid	= parseInt(track[0],10)-1;
				var trkid	= parseInt(track[1] + '0',10)-1;
				disks[diskid] = '1';
				var label = "mediums.%1.track.%2.%%s".replace('%1', diskid).replace('%2', trkid);

				console.log("%%%%%%%%%");
				console.log(track);
				console.log([diskid, trkid]);
				
				var name;
				if (work["work"] == track[2]) {
					name = track[2];
				} else {
					name = work["work"] + ": " + track[1];
				}
				
				add_field(label.replace("%%s", 'name'), name );
				add_field(label.replace("%%s", 'length'), track[3]);
				
				if (work["composers"] != albumartists) {
					for (var perf = 0 ; perf < work["composers"].length ; perf++) {
						add_field(label.replace("%%s", 'artist_credit.names.%d.name'.replace('%d', perf)), work["composers"] [perf]);
						if (perf  + 1 < work["composers"].length) {
							add_field(label.replace("%%s", 'artist_credit.names.%d.join_phrase'.replace('%d', perf)), ' & ');
						}
					}
				}
			});	
		});
		console.log(disks);
		console.log(iterate(disks));
		$.each( 
			iterate(disks),
			function(idx, pairs) {
				console.log(pairs);
				add_field("mediums.%d.format_id".replace('%d', pairs[0]), pairs[1]);
			}
		);
						
		
		
		
	}
	
	
	
	
	
	
	var mb_add_ars = function(url, relationships, release_mbid) {
		console.log($("table.tbl"));
		$("table.tbl").after(
			$('<div class="mb_add_ars"></div>').append(
				$("<label></label>").append(
					$('<input type="checkbox"/>').change(function() {
						$("img.mb_add_ars_loading").remove();
						$("div.mb_add_ars").after($('<img class ="mb_add_ars_loading" src="/static/images/icons/loading.gif"/>'));
						console.log(url);
						if (this.checked) {
							console.log("!!!")
							rel = GM_xmlhttpRequest({
								method: "GET",
								url: url,
								headers: {
									"User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
									"Accept": "text/xml"            // If not specified, browser defaults will be used.
								},
								onload : function(response) {
									var $ac = $([
											'<span class="artist autocomplete">',
											'<img class="search" src="/static/images/icons/search.png"/>',
											'<input type="text" class="name"/>',
											'<input type="hidden" class="id"/>',
											'<input type="hidden" class="gid"/>',
											'</span>'
										].join('')
									);
									console.log("!!!!!!!!!!!!!");
									$("img.mb_add_ars_loading").remove();
									$("div.mb_add_ars").after(
										$('<table class="mb_add_ars_rels" border="1">').append(
											$("<tr>").append( 
												$("<th>").text("Artist"), $("<th>").text("Type"), $("<th>").text("Recordings")
											),
											$.map(
												relationships(response.responseText), 
												function(pairs) {
													var	perf	= pairs[0].split(',')[0];
													var	instr	= pairs[0].split(',')[1];
													var	tracks	= pairs[1].join(', ');
													console.log('%&&&&&&&&&&&&');
													console.log(pairs);
													var $artist_rel = $('<td>');	
													//mb_ar_artist_form($artist_rel, release_mbid, '89ad4ac3-39f7-470e-963a-56509c546377',mb_ar_artist_tracks_filtered(pairs[1])); 
													return $("<tr>").append(
														$('<td valign="top">').append(function() {
															var a = $ac.clone();
															a.children("input.name").val(perf);
															return a;
														}()),
														$('<td valign="top">').append(instr),
														$('<td valign="top">').append(tracks),
														$artist_rel
													);
												}
											)
										), 
									
										$(
											[
												'<table>',
													'<tr><td><label for="id-ar.edit_note" id="label-id-ar.edit_note">Edit note:</label></td></tr>',
													'<tr><td><textarea class="edit-note" cols="80" id="id-ar.edit_note" name="ar.edit_note" rows="5"></textarea></td></tr>',
													'<tr><td><button type="submit" class="submit positive">Enter edits</button></td></tr>',
												'</table>'
											].join('')
										)
									
									);
									
									
									//Update Artist Span with binings (has to be done in native namespace for MB to work)
									native_jscript_exec( function() {
										$('table.mb_add_ars_rels').find('span.autocomplete').each(function () {
											MB.Control.EntityAutocomplete({inputs: $(this)});	
										});
									});
									
								}
							});	

						} else {
							$("div.mb_add_ars").remove();
						}
					}),
					" View Relationships"
				)
			)
		);			
	}
	
	var top = function() {
		console.log(window.location.href.match(/naxos.com\/catalogue\/item.asp\?item_code=/));
		if (window.location.href.match(/naxos.com\/catalogue\/item.asp\?item_code=/)) {
			naxos_top(); 
		} 
		if (window.location.href.match(/file:\/\/\//)) {
			naxos_top(); 
		} 
		
		if (0) {
			var release_mbids	= window.location.pathname.match(/\/release\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/);
			console.log("@@@");
			if (release_mbids) {
				release_mbid = release_mbids[1];
				console.log(release_mbid);
				
				var 
					label		= $('a[rel="mo:label"]').text().trim(),
					catalog		= $('span[property="mo:catalogue_number"]').text().trim()
				
				console.log(label);
				console.log(catalog);

				if ($("li.account").length && label == "Naxos" && catalog) {
					var url = 'http://www.naxos.com/catalogue/item.asp?item_code='+catalog;
					mb_add_ars(url, function(data){return iterate(naxos_relationships(naxos_scrape_fn(data,url)));}, release_mbid);
				}
			}
		 
		 }
	}
	console.log('$$$$1');
	
	top();
}


console.log('@@@');
top_level_func();
