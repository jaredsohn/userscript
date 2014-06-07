// ==UserScript==
// @name        Runtastic mass exporter
// @namespace   http://www.barszcz.info/
// @description Export all your workouts from Runtastic
// @include     http://www.runtastic.com/en/users/*
// @version     1.0.1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

jQuery.noConflict(true);
jQuery(document).ready(function($) {

	if ($('#calendar_overview_js').length) {
		var $cal = $('#calendar_overview_js'),
			$button = $('<a class="bttn export" href="#">Export This Workouts</a>'),

			downloadURL = function downloadURL(url, index) {
				var hiddenIFrameID = 'hiddenDownloader' + index,
				iframe = document.getElementById(hiddenIFrameID);
				if (iframe === null) {
					iframe = document.createElement('iframe');
					iframe.id = hiddenIFrameID;
					iframe.style.display = 'none';
					document.body.appendChild(iframe);
				}
				iframe.src = url;
			};

		$('head').append(
			'<style type="text/css">'
			+ '.bttn.export { background: #C55620; }'
			+ '.bttn.export:hover { background: #AD4D1E; }'
			+'</style>');

		$cal.parent().next().css({position: 'relative'}).append($button.css({position: 'absolute', left: -80, top: 0}));

		$button.click(
			function(e) {
				e.preventDefault();
				var $links = $cal.find('tbody td.type a'),
					$overlay = $('<div class="facebox_overlayBG" id="facebox_overlay" style="display: none; opacity: 0.5;"></div>'),
					$modal = $('#facebox'),
					linkIndex = 0,
					exportInterval;

				if (!$links.length) {
					alert("There are no workouts to download.");
					return;
				}

				$('body').append($overlay);
				if (!$modal.length) {
					$modal = $('<div id="facebox"><div class="popup"><div class="content"></div></div></div>');
					$('body').append($modal);
				}

				var content = '<h1>Export Workouts</h1>'
					+ '<p>There are <strong>' + $links.length + '</strong> sessions to be downloaded.</p>'
					+ '<p>Choose one of the file formats in which you want to download your data:</p><ul style="clear: both; overflow: hidden; position: relative; top: -1.5em;">'
					+ '<li style="float: left; margin-right: 20px;"><label><input type="radio" name="filetype" value="gpx" checked="checked"/>GPX</label></li>'
					+ '<li style="float: left; margin-right: 20px;"><label><input type="radio" name="filetype" value="tcx" />TCX</label></li>'
					+ '<li style="float: left;"><label><input type="radio" name="filetype" value="kml" />KML</label></li></ul>'
					+ '<p><strong>Important notice: </strong> before starting export, configure your browser to automatically save files of type chosen above (gpx, tcx or kml).<br />You can do this by going to <a href="' + $($links[0]).attr('href') + '" target="_blank">this link</a>, then click on "Download", then on "Export as .... file".<br />When your browser asks you what to do, select "Save file" and check "Remember for this type of files"<br />(texts in your browser may be slightly different but they should mean the same).<br />If your browser is configured properly you can start exporting your data.</p>'
					+ '<p style="font-size: 10px; margin:-1em 0 2em"><strong>Script source code and license:</strong> source of this script can be viewed on <a href="https://github.com/barszczmm/greasemonkey-scripts/tree/master/runtastic">GitHub</a>, script is released under <a href="http://opensource.org/licenses/mit-license.php">MIT license</a>.</p>'
					+ '<a href="#" class="bttn export start-export">Export</a><a href="#" class="bttn export stop-export" style="display:none;">Stop</a><div id="export_results" style="margin-top: 1em;"></div>';

				$modal.find('.popup .content').html(content);
				$modal.css({display: 'block', visibility: 'hidden'});
				$modal.css({position: 'fixed',
							top: 30,
							left: $(window).width() / 2 - $modal.outerWidth() / 2,
							width: $modal.outerWidth(),
							display: 'none',
							visibility: 'visible'
							});
				$modal.fadeIn();
				$overlay.fadeIn();
				$modal.find('.stop-export').click(
					function () {
						clearInterval(exportInterval);
						$modal.find('#export_results').append('<p style="margin-top: 1em;"><strong>Stopped</strong></p>');
						$(this).hide().prev().show();
					}
				);
				$modal.find('.start-export').click(
					function() {
						e.preventDefault();
						$(this).hide().next().show();
						$modal.find('#export_results').html('');
						var filetype = $modal.find('[name=filetype]:checked').val();

						exportInterval = setInterval(
							function() {
								if (linkIndex >= $links.length) {
									clearInterval(exportInterval);
									$modal.find('#export_results').append('<p style="margin-top: 1em;"><strong>Finished</strong></p>');
									$modal.find('.stop-export').hide();
									return;
								}
								downloadURL('http://www.runtastic.com' + $($links[linkIndex]).attr('href') + '.' + filetype, linkIndex);
								linkIndex ++;
								$modal.find('#export_results').append('<span> ' + linkIndex + ' </span>');
							},
							2000
						);
					}
				);
			}
		);

	}

});