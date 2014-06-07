// ==UserScript==
// @name           GLB Custom D Plays Enhancements
// @namespace      Bogleg
// @include        http://goallineblitz.com/game/team_create_defense.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/1052.user.js
// @version        1.3.0
// ==/UserScript==

var teamId = window.location.href.match(/team_id=(\d+)/)[1];
var outputUsage = {length: 0, data: {}};
var pkgUsage = {length: 0, data: {}};
var pkgOutputUsage = {length: 0, data: {}};
var playNames = {};
var playRows = {};

var showing = 0;
function hideShowing() {
	if (showing) {
		$(showing).hide();
		showing = 0;
	}
}

var loadWaiting = 0;
function loading(howmany) {
	loadWaiting += howmany;
	if (loadWaiting <= 0) {
		loadWaiting = 0;
		$('#status_text').hide();
		$('#load_outputs').text('Reload Outputs').show();
		$('#load_packages').text('Reload Outputs & Packages').show();
		$('#delete_checked_plays').show();
		return;
	}
	$('#status_text').text('(Loading ' + loadWaiting + ' page' + (loadWaiting == 1 ? '' : 's') + '...)').show();
}

function updatePlayUsage() {
	hideShowing();
	$.each(playRows, function(pid) {
		var label = '';
		var sep = '';
		$.each(playRows[pid], function() {
			$('#span_play_usage_' + this + '_' + pid).hide();
		});
		var panel = '<div class="medium_head"><a href="/game/team_create_defense.pl?team_id=' + teamId + '&play_id=' + pid + '">' + playNames[pid] + '</a></div>'
		+ '<a href="/game/team_create_defense.pl?team_id=' + teamId + '&play_id=' + pid + '"><img src="/game/team_create_defense.pl?team_id=' + teamId + '&thumbnail=' + pid + '"></a>';
		if (outputUsage.data[pid] != undefined && outputUsage.data[pid].length > 0) {
			label += outputUsage.data[pid].length + ' output' + ((outputUsage.data[pid].length == 1) ? '' : 's');
			sep = ' / ';
			panel += '<div class="medium_head">Outputs</div>';
			$.each(outputUsage.data[pid], function() {
				panel += '[' + this.bias + '%]: ' + this.name + '<br />';
			});
		}
		if (pkgUsage.data[pid] != undefined && pkgUsage.data[pid].length > 0) {
			label += sep + pkgUsage.data[pid].length + ' pkg' + ((pkgUsage.data[pid].length == 1) ? '' : 's');
			panel += '<div class="medium_head">Packages</div>';
			$.each(pkgUsage.data[pid], function() {
				panel += '[' + this.bias + '%] <a href="' + this.href + '">' + this.name + '</a><br />';
				if (pkgOutputUsage.data[this.id] != undefined && pkgOutputUsage.data[this.id].length > 0) {
					$.each(pkgOutputUsage.data[this.id], function() {
						panel += ' - [' + this.bias + '%]: ' + this.name + '<br />';
					});
				}
			});
		}
		if (label.length == 0) return;
		$('#play_usage_' + pid).html(panel);
		$.each(playRows[pid], function() {
			$('#link_play_usage_' + this + '_' + pid).text(label);
			$('#span_play_usage_' + this + '_' + pid).show();
		});
	});
}

function loadOutputs() {
	loading(1);
	$.get('/game/team_defense_ai.pl?team_id=' + teamId, function(data) {
		var inames = data.match(/name="i_input_name_(\d)_(\d+)" value="([^"]+)"/g);
		var onames = data.match(/name="o_output_name_(\d+)_(\d+)" value="([^"]+)"/g);
		var obias = data.match(/id="bias_(\d+)_(\d+)".+?value="(\d+)"/g);
		var oplays = data.match(/id="specific_play_name_(\d+)_(\d+)".+?<\/span>/g);
		var opkgnames = data.match(/id="package_name_(\d+)_(\d+)">(.+)<\/span>/g);
		var opkgs = data.match(/id="package_id_(\d+)_(\d+)" value="([^"]*)"/g);
		var inputs = {};
		$.each(inames, function() {
			var s = this.match(/name="i_input_name_(\d)_(\d+)" value="([^"]+)"/);
			var q = s[1];
			var iNum = s[2];
			var iName = s[3];
			inputs[iNum] = {q: q, name: 'Q' + q + ': ' + iName};
		});
		$.each(onames, function(i) {
			var s = this.match(/name="o_output_name_(\d+)_(\d+)" value="([^"]+)"/);
			var iNum = s[1];
			var oNum = s[2];
			var oName = s[3];
			var oBias = obias[i].match(/id="bias_(\d+)_(\d+)".+?value="(\d+)"/)[3];
			var pid = 0;
			if (s = oplays[i].match(/id="specific_play_name_(\d+)_(\d+)".+?thumbnail=(\d+)/)) {
				pid = s[3];
				if (outputUsage.data[pid] == undefined) {
					outputUsage.data[pid] = [];
					outputUsage.length++;
				}
				outputUsage.data[pid].push( {bias: oBias, name: inputs[iNum].name + ' :: ' + oName} );
			}
			if ((s = opkgnames[i].match(/id="package_name_(\d+)_(\d+)">(.+)<\/span>/)) && s[3] != 'none') {
				var iNum = s[1];
				var oNum = s[2];
				var pkgName = s[3];
				if (s = opkgs[i].match(/id="package_id_(\d+)_(\d+)" value="([^"]*)"/)) {
					pid = s[3];
					if (pkgOutputUsage.data[pid] == undefined) {
						pkgOutputUsage.data[pid] = [];
						pkgOutputUsage.length++;
					}
					pkgOutputUsage.data[pid].push( {bias: oBias, name: inputs[iNum].name + ' :: ' + oName + ' :: ' + pkgName, href: '/game/team_package.pl?team_id=' + teamId + '&type=d&edit=' + pid} );
				}
			}
		});
		updatePlayUsage();
		loading(-1);
	});
}

function loadPackages() {
	loading(1);
	$.get('/game/team_package.pl?team_id=' + teamId, function(data) {
		$('div.tactic_container table:eq(1) tr:gt(0):not(:last)', data).find('td:first a:first').each(function() {
			var curPkgName = $(this).text();
			var curPkgHref = this.href;
			var curPkgId = this.href.match(/edit=(\d+)/)[1];
			loading(1);
			$.get(this.href, function(data) {
				var playIds = data.match(/id="play_image_\d+" src="[^"]+?thumbnail=(\d+)"/g);
				var bias = data.match(/name="bias_\d+" value="(\d+)"/g);
				if (!playIds) {
					loading(-1);
					return;
				}
				$.each(playIds, function(i) {
					var s = this.match(/id="play_image_\d+" src="[^"]+?thumbnail=(\d+)"/);
					var pid = s[1];
					var pbias = 0;
					if (s = bias[i].match(/name="bias_\d+" value="(\d+)"/)) {
						pbias = s[1];
					}
					if (pkgUsage.data[pid] == undefined) {
						pkgUsage.data[pid] = [];
						pkgUsage.length++;
					}
					pkgUsage.data[pid].push( {id: curPkgId, name: curPkgName, href: curPkgHref, bias: pbias} );
				});
				updatePlayUsage();
				loading(-1);
			});
		});
		loading(-1);
	});
}

// main

if ($('div.tactic_container:contains(Current Custom Defensive Plays)').length > 0) { // only work on the play index page

// sort
$('div.tactic_container table').each(function() {
	var rows = $(this).find('tr.alternating_color1,tr.alternating_color2').sort(function(a, b) {
		return $(a).find('td:first a:first').text() < $(b).find('td:first a:first').text() ? -1 :
			$(a).find('td:first a:first').text() > $(b).find('td:first a:first').text() ? 1 : 0;
	});
	$(this).append($(rows).each(function(i) {
		this.className = 'alternating_color' + ((i % 2) ? 2 : 1);
	}));
});

// init
$('tr.alternating_color1,tr.alternating_color2').each(function(rowNum) {
	var pid = $(this).find('td:first a:first').attr('href').match(/play_id=(\d+)/)[1];
	if (playRows[pid] == undefined) {
		playRows[pid] = [];
		playNames[pid] = $(this).find('td:first a:first').text();
	}
	playRows[pid].push(rowNum);
	$(this).find('td:first')
		.prepend('<input type="checkbox" id="check_play_' + rowNum + '_' + pid + '" /> ')
		.append('<span id="span_play_usage_' + rowNum + '_' + pid + '" style="display: none;"> [<a href="javascript:;" id="link_play_usage_' + rowNum + '_' + pid + '">usage: 0</a>]</span>');
	$('body').append('<div class="content_container" id="play_usage_' + pid + '" style="z-index: 9999; position: absolute; display: none; text-align: left; padding-left: 12px; padding-right: 12px; padding-bottom: 12px;"></div>');
	$('#link_play_usage_' + rowNum + '_' + pid).hover(function() {
		hideShowing();
		showing = $('#play_usage_' + this.id.match(/_(\d+)$/)[1]).css({
			'left': $(this).offset().left + $(this).width() + 5,
			'top': $(this).offset().top - 75,
		}).show().get();
	});
});

$('body').click(hideShowing);

var loadOutputButton = ' <button id="load_outputs">Load Defense Outputs</button>';
var loadPkgButton = ' <button id="load_packages">Load Defense &amp; Packages</button>';
var deleteButton = ' <button id="delete_checked_plays">Delete Checked Plays</button>';
var statusSpan = ' <span id="status_text" style="display: none; color: #000000; font-size: 12px;"></span>';
$('div.tactic_container div:first').append(loadOutputButton).append(loadPkgButton).append(deleteButton).append(statusSpan);
$('#load_outputs').click(function() {
	outputUsage = {length: 0, data: {}};
	pkgOutputUsage = {length: 0, data: {}};
	updatePlayUsage();
	loadOutputs();
	$('#load_outputs').hide();
});
$('#load_packages').click(function() {
	outputUsage = {length: 0, data: {}};
	pkgOutputUsage = {length: 0, data: {}};
	pkgUsage = {length: 0, data: {}};
	updatePlayUsage();
	loadOutputs();
	loadPackages();
	$('#load_outputs').hide();
	$('#load_packages').hide();
});
$('#delete_checked_plays').click(function() {
	$('#delete_checked_plays').hide();
	if (loadWaiting > 0) return;
	var toDelete = {};
	$('input[type=checkbox]:checked').each(function() {
		var s = this.id.match(/^check_play_\d+_(\d+)$/);
		if (!s) return;
		if (toDelete[ s[1] ] == undefined) {
			loading(1);
			toDelete[ s[1] ] = '/game/team_create_defense.pl?team_id=' + teamId + '&delete=' + s[1];
		}
	});
	$.each(toDelete, function() {
		$.get(this, function(data) {
			loading(-1);
			if (loadWaiting == 0) window.location.reload();
		});
	});
});

} // end if (isIndex)
