// ==UserScript==
// @name       PubMed Health Download All
// @namespace  http://crebp.net.au
// @version    1.0
// @description  Script to automatically save all results in a PubMed Health search to an RIS file.
// @include    http://www.ncbi.nlm.nih.gov/pubmedhealth/*
// @include    https://www.ncbi.nlm.nih.gov/pubmedhealth/*
// @grant      none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// @require    http://raw.github.com/eligrey/FileSaver.js/master/FileSaver.js
// @require    http://medialize.github.io/URI.js/src/URI.min.js
// @require    http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js
// @copyright  2014+, Matt Carter <m@ttcarter.com>
// @downloadURL https://raw2.github.com/CREBP/GreaseMonkey/master/PubMed%20Health%20Download%20All.js
// @updateURL https://raw2.github.com/CREBP/GreaseMonkey/master/PubMed%20Health%20Download%20All.js
// ==/UserScript==
$(function() {
	$('body')
		.prepend('<link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" type="text/css"/>')
	.css('font-size', '10px');

	if (window.location.href.substr(0, 8) == 'https://') // Switch to http:// version
		window.location.href = window.location.href.replace('https://', 'http://');

	$('a[data-value_id]').on('click', function() { // Fix the stupid inline link filter thats used on the site
		var myURI = URI(window.location)
			.setSearch('filters', $(this).data('value_id'));
		window.location.replace(myURI.toString());
	});

	$('<a title="Download all references" class="active page_link" href="#">Download All</a>')
		.prependTo($('.pagination'))
		.after(' ')
		.on('click', function() {
			if ($.downloadAll && $.downloadAll.refs) { // Already done the work
				$.downloadAll.generateOutput();
				return;
			}

			$('#modal-da-progress').remove();
			$('body').append('<div id="modal-da-progress" class="modal fade">' +
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
				pageLink: $('.page_link.next').attr('href').replace(/page=([0-9]+)/, 'page=1'),
				pageCurrent: 1,
				pageCount: $('.pagination .page_link:last').attr('page'),
				refs: [],
				pageDownload: function() {
					$.ajax({
						url: $.downloadAll.pageLink.replace(/page=([0-9]+)/, 'page=' + $.downloadAll.pageCurrent),
						dataType: 'html',
						error: function(err,txt) {
							alert('An error has occured: ' + txt);
							$('#modal-da-progress').modal('hide');
						},
						success: function(data) {
							if (!$.downloadAll) // Cancelled?
								return;
							$('#modal-da-progress-bar').css('width', parseInt(($.downloadAll.pageCurrent / $.downloadAll.pageCount) * 100) + '%');
							$('#modal-da-progress-text').text('Processing page ' + $.downloadAll.pageCurrent + ' of ' + $.downloadAll.pageCount);
							$(data).find('.rprt > .rslt').each(function() {
								var me = $(this);
								$.downloadAll.refs.push({
									url: 'http://www.ncbi.nlm.nih.gov/' + me.find('.title > a').attr('href'),
									title: me.find('.title > a').text(),
									author: me.find('.supp > .details').text(),
									version: me.find('.rprtid').text()
								});
							});
							if (++$.downloadAll.pageCurrent > $.downloadAll.pageCount) {
								$('#modal-da-progress-bar').css('width', '100%');
								$('#modal-da-progress-text').text('Compiling results');
								setTimeout(function() {
									$('#modal-da-progress').modal('hide');
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
				},
				translateVersion: function(str) {
					var months = {'January':1,'February':2,'March':3,'April':4,'May':5,'June':6,'July':7,'August':8,'September':9,'October':10,'November':11,'December':12};
					var matches = /^Version: ([A-Z][a-z]+) ([0-9]+)$/.exec(str);
					if (matches)
						return matches[2] + '/' + months[matches[1]] + '//';
					
					matches = /^Version: ([0-9]+)$/.exec(str);
					if (matches)
						return matches[1] + '///';

					return '';
				},
				generateOutput: function() {
					var out = [];
					for (var x = 0; x < $.downloadAll.refs.length; x++) {
						out.push(
							"TY  - ELEC\n" +
							"AU  - " + $.downloadAll.refs[x].author + "\n" +
							"PY  - " + $.downloadAll.translateVersion($.downloadAll.refs[x].version) + "\n" +
							"TI  - " + $.downloadAll.refs[x].title + "\n" +
							"DO  - " + $.downloadAll.refs[x].url + "\n" +
							"ER  - \n"
						);
					}
					var blob = new Blob(out, {type: "text/plain;charset=utf-8"});
					saveAs(blob, "PubMed Health.ris");
				}
			};

			$('#modal-da-progress')
				.on('hide.bs.modal', $.downloadAll.cancel)
				.modal('show');
			$.downloadAll.pageDownload(); // Start everything
		});
});
