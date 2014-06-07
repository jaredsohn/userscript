// ==UserScript==
// @name        aerofiles-fix
// @namespace   http://www.aerofiles.com
// @description Extract image files and show them on the right of text for aircraft company pages (specifically pages under http://www.aerofiles.com/aircraft.html) .
// @include     http://www.aerofiles.com/_*
// @version     1.0
// ==/UserScript==

var script = document.createElement('script');
script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

// When jQuery is loaded
script.addEventListener('load', function(){ 
	$ = unsafeWindow['jQuery'];
	$.noConflict();
	
	// Insert our own style
	var style_block = $('<style type="text/css"></style>');
	style_rules =
		  "#imcolumn { width: 300px; float: right; padding-top: 200px;}"
		+ ".frame { border: 1px solid gray; background-color: #b3bfdf; "
		+ "         margin: 0; padding: 5px; float: right; position: absolute; width: 200px }"
		+ ".subframe { text-align: center; width: 190px; }"
		+ ".caption { text-align: center; font-size: 9pt }"
		+ ".im { padding: 1px; border: 1px solid gray; }"
		+ ".imdimensions { font-size: 9pt; font-style: italic; text-align: right; width: 190px }"
		+ ".odd { margin-left:  70px; }"
		+ ".even { margin-left:-170px; }"
	style_block.append(style_rules);
	$('body').before(style_block);
	
	$('body').prepend("<div id='newcontainer'></div>");
	$('#newcontainer').html($('#newcontainer').next().html());
	$('#newcontainer').next().html('');
	
	// Insert right-side column
	$('body').prepend("<div id='imcolumn' style=''></div>");
	$('#imcolumn').append('<div id="afdebug"></div>');
	
	// PASS 1: fetch details from all anchors
	var imreg = /.+\.(jpg|jpeg|gif|png)/;
	var alist = Array();
	var aindex = 0;
	// For each anchor
	$('a').each(function() {
		var afname = $(this).attr('href');
		$(this).addClass('anch_im');
		$(this).attr('id', 'anch_im_' + aindex);
		if (imreg.test(afname)) {
			var atitle1 = $(this).text();	  
			var atitle2 = $(this).next().text();
			var atop = parseInt($(this).offset().top);
			alist[aindex] = Array(atop, afname, atitle1, atitle2, aindex);
			++aindex;
		}
	});
	
	// PASS 2: group anchors by their vetical distance
	var agroups = Array();
	var agindex = 0, agcount = 0;
	for (var i=0; i<alist.length; ++i) {
		var arec = alist[i];
		var atop = arec[0];
		if (i == 0) {
			agroups[agindex] = Array();
			agroups[agindex][agcount++] = arec;
		}
		else {
			if (atop - alist[i - 1][0] > 100) {
				++agindex;
				agcount = 0;
				agroups[agindex] = Array();
				agroups[agindex][agcount++] = arec;
			}
			else {
				agroups[agindex][agcount++] = arec;
			}
		}
	} // end of pass 2
	
	// PASS 3: render picture groups
	for (var i=0; i<agroups.length; ++i) {
		var newframe = $("<div class='frame' style='top: " + agroups[i][0][0] + "'></div>");
		newframe.attr('id', 'gfr_' + i);
		newframe.addClass((i % 2) ? 'odd' : 'even');
		for (var j=0; j<agroups[i].length; ++j) {		
			// deal with inner frames and left-side anchors
			var pframe = $("<div class='subframe'></div>");
			pframe.attr('id', 'gfr_sub_' + agroups[i][j][4]);
			
			$('#anch_im_' + agroups[i][j][4]).attr('rel', 'gfr_sub_' + agroups[i][j][4]);
			
			var pim = $("<img class='im'></img>");
			pim.attr('id', 'gim_' + agroups[i][j][4]);
			pim.attr('src', agroups[i][j][1]);
			pim.load( function () {
				// Resize
				var oldwid = this.width, oldhgt = this.height;
				var newwid, newhgt, rsbase = 160;
				if (this.width > this.height) {
					newwid = rsbase;
					newhgt = parseInt( oldhgt * rsbase / oldwid );
				}
				else {
					newhgt = rsbase;
					newwid = parseInt( oldwid * rsbase / oldhgt );
				}
				// Insert size captions
				$(this).attr('width', newwid); $(this).attr('height', newhgt);
				$(this).attr('oldwid', oldwid); $(this).attr('oldhgt', oldhgt);
				$(this).attr('newwid', newwid); $(this).attr('newhgt', newhgt);
				
				$(this).next().after(
					  '<div class="imdimensions">' + oldwid + 'x' + oldhgt 
					+ ' (' + newwid + 'x' + newhgt + ')'
					+ '</div>'
				);
				
				// Hover zoom
				$(this).hover(
					function() {
						$(this).attr('width', oldwid);
						$(this).attr('height', oldhgt);
						if ($(this).parent().parent().parent().hasClass('even')) {
							$(this).css('margin-left', '' + ((newwid - oldwid) / 2) + 'px' );
						}
						else if ($(this).parent().parent().parent().hasClass('odd')) {
							$(this).css('margin-left', '' + (rsbase - oldwid) + 'px' );
						}
					}
					, function () {
						$(this).attr('width', newwid);
						$(this).attr('height', newhgt);
						$(this).css('margin-left', '0px');
					}
				);
			}); // end of pim.load event handler
			
			var pcaption = $("<div class='caption'>"
				+ "<b>" + agroups[i][j][2] + "</b> " + agroups[i][j][3] + "</div>");
			var plink = $("<a/>");
			plink.attr('href', agroups[i][j][1]);
			plink.attr('target', '_blank');
			plink.append(pim);
			pframe.append(plink).append(pcaption);
			newframe.append(pframe);
		}
		
		// Raise to top on hover
		newframe.hover(
			  function() {
				$(this).css('z-index', 8192);
				$(this).css('background-color', '#efbfb3');
			}
			, function() {
				$(this).css('z-index', 0);
				$(this).css('background-color', '#b3bfdf');
			}
		);
		$('#imcolumn').append(newframe);
	} // End of pass 3
	
	$('.anch_im').hover(
		  function() {
			var imid = '#gim_' + $(this).attr('id').substr(8);
			$(imid).attr('width', $(imid).attr('oldwid'));
			$(imid).attr('height', $(imid).attr('oldhgt'));
			if ($(imid).parent().parent().parent().hasClass('even')) {
				$(imid).css('margin-left', ((parseInt($(imid).attr('newwid')) - parseInt($(imid).attr('oldwid'))) / 2) + 'px' );
			}
			else if ($(imid).parent().parent().parent().hasClass('odd')) {
				$(imid).css('margin-left', '' + (160 - parseInt($(imid).attr('oldwid'))) + 'px' );
			}
			$(imid).parent().parent().parent().css('z-index', 8192);
			
		}
		, function() {
			var imid = '#gim_' + $(this).attr('id').substr(8);
			$(imid).attr('width', $(imid).attr('newwid'));
			$(imid).attr('height', $(imid).attr('newhgt'));
			$(imid).css('margin-left', '0px');
			$(imid).parent().parent().parent().css('z-index', 0);
		}
	);
	
}, false);