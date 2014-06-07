// ==UserScript==
// @name       Epistemonikos Download All
// @namespace  http://crebp.net.au
// @version    1.0
// @description  Script to automatically save all results in a Epistemonikos search to an RIS file.
// @include    http://www.epistemonikos.org/en/search?*
// @include    http://epistemonikos.org/en/search?*
// @grant      none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// @require    http://raw.github.com/eligrey/FileSaver.js/master/FileSaver.js
// @require    http://medialize.github.io/URI.js/src/URI.min.js
// @copyright  2014+, Matt Carter <m@ttcarter.com>
// @downloadURL https://raw2.github.com/CREBP/GreaseMonkey/master/Epistemonikos%20Download%20All.js
// @updateURL https://raw2.github.com/CREBP/GreaseMonkey/master/Epistemonikos%20Download%20All.js
// ==/UserScript==
$(function() {
    console.log('SDL', $('#selected_documents_link'))
    $('#selected_documents_link > p').css('margin-bottom', '10px');
	$('<a title="Download all references" class="btn btn-primary btn-sm pull-right" href="#"><i class="glyphicon glyphicon-download-alt"></i> Download All</a>')
		.appendTo($('#selected_documents_link > p'))
		.after(' ')
		.on('click', function() {
			if ($.downloadAll && $.downloadAll.refs) { // Already done the work
				$.downloadAll.generateOutput();
				return;
			}

			$('#modal-da-progress').remove();
			$('body').append('<div id="modal-da-progress" class="modal">' +
				'<div class="modal-dialog"><div class="modal-content">' +
					'<div class="modal-header">' +
						'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
						'<h3>Processing references...</h3>' +
					'</div>' +
					'<div class="modal-body">' +
						'<div class="progress progress-striped active">' +
							'<div id="modal-da-progress-bar" class="progress-bar"  role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>' +
						'</div>' +
						'<p id="modal-da-progress-text" class="text-center">Preparing...</p>' +
					'</div>' +
					'<div class="modal-footer">' +
						'<a href="#" class="btn btn-danger" data-dismiss="modal">Cancel</a>' +
					'</div>' +
				'</div></div>' +
			'</div>');

			$.downloadAll = {
				pageLink: $('.pagination .next').attr('href').replace(/p=([0-9]+)/, 'p=0'),
				pageCurrent: 0,
				pageCount: $('.pagination > li > a').not('.next').last().text(),
				refs: [],
				pageDownload: function() {
					$.ajax({
						url: $.downloadAll.pageLink.replace(/p=([0-9]+)/, 'p=' + $.downloadAll.pageCurrent),
						dataType: 'html',
						error: function(err,txt) {
							alert('An error has occured: ' + txt);
							$('#modal-da-progress').hide();
						},
						success: function(data) {
							if (!$.downloadAll) // Cancelled?
								return;
							$('#modal-da-progress-bar').css('width', parseInt(($.downloadAll.pageCurrent / $.downloadAll.pageCount) * 100) + '%');
							$('#modal-da-progress-text').text('Processing page ' + $.downloadAll.pageCurrent + ' of ' + $.downloadAll.pageCount);
							$(data).find('.result').each(function() {
								var me = $(this);
								$.downloadAll.refs.push({
									url: 'http://www.epistemonikos.org/' + me.find('h3 > a').attr('href'),
									title: me.find('h3 > a').text(),
									authors: me.find('.result-metadata > .authors .author').map(function() { return $(this).text() }),
                                    journal: me.find('.result-metadata > #journal > span').last().text(),
									version: me.find('.result-metadata > #year > span').last().text()
								});
							});
							if (++$.downloadAll.pageCurrent > $.downloadAll.pageCount) {
								$('#modal-da-progress-bar').css('width', '100%');
								$('#modal-da-progress-text').text('Compiling results');
								setTimeout(function() {
									$('#modal-da-progress').hide();
								}, 2000);
							
								$.downloadAll.generateOutput();
							} else {
								$.downloadAll.pageDownload();
							}
						}
					});
				},
				cancel: function() {
					$.downloadAll = null;
                    $('#modal-da-progress').hide();
				},
				translateVersion: function(str) {
					var months = {'January':1,'February':2,'March':3,'April':4,'May':5,'June':6,'July':7,'August':8,'September':9,'October':10,'November':11,'December':12};
					var matches = /^([A-Z][a-z]+) ([0-9]+)$/.exec(str);
					if (matches)
						return matches[2] + '/' + months[matches[1]] + '//';
					
					matches = /^([0-9]+)$/.exec(str);
					if (matches)
						return matches[1] + '///';

					return '';
				},
				generateOutput: function() {
					var out = [];
					for (var x = 0; x < $.downloadAll.refs.length; x++) {
                        var info =  "TY  - ELEC\n";
                        for (var a = 0; a < $.downloadAll.refs[x].authors.length; a++)
							info += "AU  - " + $.downloadAll.refs[x].authors[a] + "\n";
                        info +=
							"PY  - " + $.downloadAll.translateVersion($.downloadAll.refs[x].version) + "\n" +
							"TI  - " + $.downloadAll.refs[x].title + "\n" +
                            "JO  - " + $.downloadAll.refs[x].journal + "\n" +
							"DO  - " + $.downloadAll.refs[x].url + "\n" +
							"ER  - \n";
						out.push(info);
					}
					var blob = new Blob(out, {type: "text/plain;charset=utf-8"});
					saveAs(blob, "Epistemonikos.ris");
				}
			};

			$('#modal-da-progress')
				.on('hide.bs.modal', $.downloadAll.cancel)
            	.on('click', '[data-dismiss="modal"]', $.downloadAll.cancel)
				.show();
			$.downloadAll.pageDownload(); // Start everything
		});
});
