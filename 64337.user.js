// ==UserScript==
// @name           GLB Off. Playbook Enhancements
// @namespace      Bogleg
// @include        http://goallineblitz.com/game/team_offensive_playbook.pl?team_id=*&playbook_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        1.0.1
// ==/UserScript==

var teamId = window.location.href.match(/team_id=(\d+)/)[1];
var outputUsage = {length: 0, data: {}};
var pkgUsage = {length: 0, data: {}};
var pkgOutputUsage = {length: 0, data: {}};
var playNames = {};
var tabClickSetup = false;

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
		$('#load_status').hide();
		$('#load_outputs').text('Reload Outputs').show();
		$('#load_packages').text('Reload Outputs & Packages').show();
		return;
	}
	$('#load_status').text('(Loading ' + loadWaiting + ' page' + (loadWaiting == 1 ? '' : 's') + '...)').show();
}

function updatePlayUsage() {
	hideShowing();
	$('div#selected_plays,div#available_plays').find('div.play').each(function() {
		var pid = $(this).find('img').attr('src').match(/\/plays\/(\d+)\./)[1];
		if ($('#play_usage_' + pid).length == 0) {
			$('body').append('<div class="content_container" id="play_usage_' + pid
				+ '" style="z-index: 9999; position: absolute; display: none; text-align: left; padding-left: 12px; padding-right: 12px; padding-bottom: 12px;"></div>');
		}
		if ($('#span_play_usage_' + pid).length == 0) {
			$(this).append('<span id="span_play_usage_' + pid + '" style="display: none; font-size: 12px; font-weight: normal;"> [<a href="javascript:;" id="link_play_usage_' + pid + '"></a>]</span>')
				.find('#link_play_usage_' + pid).hover(function() {
					hideShowing();
					showing = $('#play_usage_' + this.id.match(/_(\d+)$/)[1]).css({
						'left': $(this).offset().left + $(this).width() + 5,
						'top': $(this).offset().top - 75,
					}).show().get();
				});
		}
		var label = '';
		var sep = '';
		if (playNames[pid] == undefined) {
			$.each(unsafeWindow.plays[unsafeWindow.selectedSection], function() {
				playNames[this.id] = this.name + ' (' + this.formation + ')';
			});
		}
		var panel = '<div class="medium_head">' + playNames[pid] + '</div>';
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
		$('#link_play_usage_' + pid).text(label);
		$('#span_play_usage_' + pid).show();
	});
}

function loadOutputs() {
	loading(1);
	$.get('/game/team_offense_ai.pl?team_id=' + teamId, function(data) {
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
			if (s = oplays[i].match(/id="specific_play_name_(\d+)_(\d+)".+?\/images\/plays\/(\d+)/)) {
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
		$('div.tactic_container table:eq(0) tr:gt(0):not(:last)', data).find('td:eq(0) a:eq(0)').each(function() {
			var curPkgName = $(this).text();
			var curPkgHref = this.href;
			var curPkgId = this.href.match(/edit=(\d+)/)[1];
			loading(1);
			$.get(this.href, function(data) {
				var playIds = data.match(/id="play_image_\d+" src="\/images\/plays\/(\d+)\.gif/g);
				var bias = data.match(/name="bias_\d+" value="(\d+)"/g);
				$.each(playIds, function(i) {
					var s = this.match(/id="play_image_\d+" src="\/images\/plays\/(\d+)\.gif/);
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

$('body').click(hideShowing);

var loadOutputButton = ' <button id="load_outputs">Load Offense Outputs</button>';
var loadPkgButton = ' <button id="load_packages">Load Outputs &amp; Packages</button>';
var loadStatus = ' <span id="load_status" style="display: none; color: #000000; font-size: 12px;"></span>';
$('div.tactic_container div:eq(0)').append(loadOutputButton).append(loadPkgButton).append(loadStatus);
$('#load_outputs').click(function() {
	outputUsage = {length: 0, data: {}};
	updatePlayUsage();
	loadOutputs();
	$('#load_outputs').hide();
	if (tabClickSetup != true) {
		$('div.play_tab,div#selected_plays,div#available_plays').click(updatePlayUsage);
		tabClickSetup = true;
	}
});
$('#load_packages').click(function() {
	outputUsage = {length: 0, data: {}};
	pkgUsage = {length: 0, data: {}};
	updatePlayUsage();
	loadOutputs();
	loadPackages();
	$('#load_outputs').hide();
	$('#load_packages').hide();
	if (tabClickSetup != true) {
		$('div.play_tab,div#selected_plays,div#available_plays').click(updatePlayUsage);
		tabClickSetup = true;
	}
});
