// ==UserScript==
// @name           RapidShare Remote Upload Code By Wimax5giay
// @namespace      wimax5giay.rapidshare.remoteupload
// @description    Tune up RapidShare Remote Upload functionality 	
// @version        0.4
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?remotegets=1*
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?urls=&remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?urls=&remotegets=1*
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?remotegets=1*
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?urls=&remotegets=1
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?urls=&remotegets=1*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

// Auto refresh
$('input[value^="Refresh"]').after('<input type="button" value="Toggle auto refresh" id="autorefresh" />');
$('#autorefresh').click(function() {
	if (/autorefresh/.test(document.location)) {
		document.location.replace(document.location.href.replace('&autorefresh#list', ''));
	} else {
		document.location.replace(document.location.href + '&autorefresh#list');
	}
});

if (/autorefresh/.test(document.location)) {
	setTimeout(function() { document.location.reload(); }, 10000);
	$('input[value="Refresh page"]').attr('id', 'refresh');
	var seconds = 20;
	countdown();
}

// Get links after fetched - Pre acc only
if (is_pre() && $('.dtabelle tr td:contains("Upload to RapidShare finished.")')) {
	var all = [];
	$('.dtabelle th:contains("Status")').attr('width', 300).text('Status - Getting links...');
	$('.dtabelle').before('<div id="all-div" style="display:none"><h2>Fetched links</h2><textarea rows="10" cols="70" readonly="true" onclick="javascript:select()" id="all"></textarea><br /></div>');
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?export=1',
		onload: function(r) {
			var exported_links = r.responseText.split(/\n/);
			exported_links.pop();
			
			$.each($('.dtabelle tr td:contains("Upload to RapidShare finished.")'), function(i, file) {
				var original_link = $(file).prev().text();
				var true_rs_link = '';
				$.each(exported_links, function(j, rs_link) {
					var filename = get_filename(rs_link);
					if (original_link.replace(/%/g, '_').indexOf(filename) !== -1) {
						true_rs_link = rs_link;
						all.push(true_rs_link);
					}
				});
				$(file).html('<input type="text" readonly="true" value="' + true_rs_link + '" onclick="javascript:this.select()" style="width: 100%" />');
			});
			
			$('#autorefresh').after('<input type="button" value="Get all links" id="getall" />');
			$('#getall').click(function() {
				$('#all-div').show();
				$('#all').val(all.sort(function(a, b) {
					a = get_filename(a);
					b = get_filename(b);
					if (a > b) {
						return 1;
					} else if (a < b) {
						return -1;
					} else {
						return 0;
					}
				}).join("\n"));
			});
			$('.dtabelle th:contains("Status - Getting links...")').text('Status');
		}
	});
}

// Delete all completed
$('#autorefresh').after('<br /><input type="button" value="Delete all completed" class="purge" id="5" /><input type="button" value="Delete all nonexistence" class="purge" id="9" /><input type="button" value="Delete all oversized" class="purge" id="2" /><input type="button" value="Delete all blacklisted" class="purge" id="8" /><input type="button" value="Delete ALL" class="purge" id="2710" />');

$('.purge').click(function() {
	var status_to_purge = $(this).attr('id');
	$.each($('a[href^="javascript:loeschfragen"]'), function(i, file) {
		var id = $(file).attr('href').match(/javascript:loeschfragen\('([0-9]*)', '([0-9]*)'\);/)[1];
		var status = $(file).attr('href').match(/javascript:loeschfragen\('([0-9]*)', '([0-9]*)'\);/)[2];
		if (status == status_to_purge || status_to_purge == 2710) {
			$(file).html('Deleting...').removeAttr('href').attr('id', id);
			GM_xmlhttpRequest({
				method: 'POST',
				url: is_pre() ? 'https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?remotegets=1' : 'https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?remotegets=1',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: 'remotegets=1&killjobs=1&killjob-' + id + '=1',
				onload: function(r) {
					$('tr:has(a[id=' + id + '])').hide();
				}
			});
		}
	});
});

// Helper function
function is_pre() {
	retval = /premium/.test(document.location);
	return retval;
}

function countdown() {
	setTimeout(countdown, 1000);
	$('#autorefresh').val('Toggle auto refresh (' + seconds + ')');
	seconds = seconds - 1;
	if (seconds < 0) {
		seconds = 0;
	}
}

function get_filename(rapidshare_link) {
	return rapidshare_link.match(/http:\/\/rapidshare\.com\/files\/[0-9]*\/(.*)/)[1];
}