// ==UserScript==
// @name           GLB AI Packages Enhancements
// @namespace      Bogleg
// @include        http://goallineblitz.com/game/team_package.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        2.1.1
// ==/UserScript==

var url = window.location.href;
var teamId = url.match(/team_id=(\d+)/)[1];
var pkgId = url.match(/edit=(\d+)/);
pkgId = pkgId ? parseInt(pkgId[1]) : 0;
var type = url.match(/type=([od])/);
type = type ? type[1] : '';
var pkgOutputUsage = {length: 0, data: {}};
var pkgNames = {};
var pkgLinks = {};

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
		$('#delete_checked').show();
		return;
	}
	$('#status_text').text('(Loading ' + loadWaiting + ' page' + (loadWaiting == 1 ? '' : 's') + '...)').show();
}

function updatePkgUsage() {
	hideShowing();
	$.each(pkgNames, function(pid) {
		$('#span_usagelink_' + pid).hide();
		var panel = '<div class="medium_head"><a href="' + pkgLinks[pid] + '">' + pkgNames[pid] + '</a></div>';
		var label = '';
		if (pkgOutputUsage.data[pid] != undefined && pkgOutputUsage.data[pid].length > 0) {
			label += pkgOutputUsage.data[pid].length + ' output' + ((pkgOutputUsage.data[pid].length == 1) ? '' : 's');
			panel += '<div class="medium_head">Outputs</div>';
			$.each(pkgOutputUsage.data[pid], function() {
				panel += ' - [' + this.bias + '%]: ' + this.name + '<br />';
			});
		}
		if (label.length == 0) return;
		$('#usage_panel_' + pid).html(panel);
		$('#link_usage_' + pid).text(label);
		$('#span_usagelink_' + pid).show();
	});
}

function loadOutputs(page) {
	loading(1);
	$.get('/game/team_' + page + '_ai.pl?team_id=' + teamId, function(data) {
		var inames = data.match(/name="i_input_name_(\d)_(\d+)" value="([^"]+)"/g);
		if (!inames) { // no access to this page
			loading(-1);
			return;
		}
		var onames = data.match(/name="o_output_name_(\d+)_(\d+)" value="([^"]+)"/g);
		var obias = data.match(/id="bias_(\d+)_(\d+)".+?value="(\d+)"/g);
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
			if ((s = opkgnames[i].match(/id="package_name_(\d+)_(\d+)">(.+)<\/span>/)) && s[3] != 'none') {
				var iNum = s[1];
				var oNum = s[2];
				var pkgName = s[3];
				if (s = opkgs[i].match(/id="package_id_(\d+)_(\d+)" value="([^"]*)"/)) {
					var pid = s[3];
					if (pkgOutputUsage.data[pid] == undefined) {
						pkgOutputUsage.data[pid] = [];
						pkgOutputUsage.length++;
					}
					pkgOutputUsage.data[pid].push( {bias: oBias, name: inputs[iNum].name + ' :: ' + oName + ' :: ' + pkgName} );
				}
			}
		});
		updatePkgUsage();
		loading(-1);
	});
}

// main

if ($('div.tactic_container div.medium_head:eq(0):contains(AI Packages)').length > 0) { // only work on the pkg index page

GM_deleteValue('pkg_links');
GM_deleteValue('pkg_names');

// sort & init
$('div.tactic_container table').each(function() {
	var rows = $(this).find('tr.alternating_color1,tr.alternating_color2').sort(function(a, b) {
		if ($(a).find('td:eq(0) a:eq(0):contains(+ Add New Package)').length > 0) {
			return -1;
		} else if ($(b).find('td:eq(0) a:eq(0):contains(+ Add New Package)').length > 0) {
			return 1;
		}
		return $(a).find('td:eq(0) a:eq(0)').text() < $(b).find('td:eq(0) a:eq(0)').text() ? -1 : 1;
	});
	$(this).append($(rows).each(function(i) {
		this.className = 'alternating_color' + ((i % 2) ? 2 : 1);
	}));
	// init
	$(this).find('tr:gt(1)').each(function() {
		var s = $(this).find('td:eq(0) a:eq(0)').attr('href').match(/\/game.+?edit=(\d+).*$/);
		var pid = s[1];
		pkgLinks[pid] = s[0];
		pkgNames[pid] = $(this).find('td:eq(0) a:eq(0)').text();
		$(this).find('td:eq(0)')
			.prepend('<input type="checkbox" id="check_pkg_' + pid + '" /> ')
			.append('<span id="span_usagelink_' + pid + '" style="display: none;"> [<a href="javascript:;" id="link_usage_' + pid + '">usage: 0</a>]</span>');
		$('body').append('<div class="content_container" id="usage_panel_' + pid + '" style="z-index: 9999; position: absolute; display: none; text-align: left; padding-left: 12px; padding-right: 12px; padding-bottom: 12px;"></div>');
		$('#link_usage_' + pid).hover(function() {
			hideShowing();
			showing = $('#usage_panel_' + this.id.match(/_(\d+)$/)[1]).css({
				'left': $(this).offset().left + $(this).width() + 5,
				'top': $(this).offset().top - 75,
			}).show().get();
		});
	});
});

GM_setValue('pkg_links_' + teamId, pkgLinks.toSource());
GM_setValue('pkg_names_' + teamId, pkgNames.toSource());

$('body').click(hideShowing);

var loadOutputButton = ' <button id="load_outputs">Load Outputs</button>';
var deleteButton = ' <button id="delete_checked">Delete Checked Pkgs</button>';
var statusSpan = ' <span id="status_text" style="display: none; color: #000000; font-size: 12px;"></span>';
$('div.tactic_container div:eq(0)').append(loadOutputButton).append(deleteButton).append(statusSpan);
$('#load_outputs').click(function() {
	pkgOutputUsage = {length: 0, data: {}};
	updatePkgUsage();
	loadOutputs('defense');
	loadOutputs('offense');
	$('#load_outputs').hide();
	$('#delete_checked').hide();
});
$('#delete_checked').click(function() {
	$('#load_outputs').hide();
	$('#delete_checked').hide();
	if (loadWaiting > 0) return;
	var toDelete = {};
	$('input[type=checkbox]:checked').each(function() {
		var s = this.id.match(/^check_pkg_(\d+)$/);
		if (!s) return;
		if (toDelete[ s[1] ] == undefined) {
			loading(1);
			toDelete[ s[1] ] = pkgLinks[ s[1] ].replace('edit=', 'delete=');
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
else if (pkgId) {

(function() {
	var tmp = GM_getValue('pkg_links_' + teamId, '{}');
	eval ('pkgLinks = ' + tmp);
	if (!pkgLinks) pkgLinks = {};
	tmp = GM_getValue('pkg_names_' + teamId, '{}');
	eval ('pkgNames = ' + tmp);
	if (!pkgNames) pkgNames = {};
	// narrow pkgNames down to only the type of pkg we're editing (offense vs. defense)
	var re = new RegExp('type=' + type);
	$.each(pkgLinks, function(pid) {
		if (!this.match(re)) delete pkgNames[pid];
	});
})();

$('div.play_options').css('height', 'auto');

$('#custom_plays').append($('#custom_plays div.custom_play').sort(function(a, b) {
	return $(a).text() < $(b).text() ? -1 : 1;
}));

var pct = 0;
$('#all_plays').append($('#all_plays div.package_play').sort(function(a, b) {
	return $(a).find('div.play_name').text() < $(b).find('div.play_name').text() ? -1 : 1;
})).find('input[name^=bias_]').each(function() { pct += parseInt(this.value); }).change(function() {
	pct = 0;
	$('#all_plays input[name^=bias_]').each(function() {
		pct += parseInt(this.value);
	});
	$('#total_percentage').text('Total: ' + pct + '%');
});
$('#package_name').after('<div id="total_percentage">Total: ' + pct + '%</div>');

if (type == 'd') {
	$('#all_plays div.package_play div.play_image:contains(Custom)').each(function() {
		var playId = parseInt($(this).find('img').attr('src').match(/thumbnail=(\d+)/)[1]);
		$(this).find('div.play_name').append(' (<a href="/game/team_create_defense.pl?team_id=' + teamId + '&play_id=' + playId + '">edit</a>)');
	});
}

$('input[type=submit]').parent().append(' &nbsp; <input type="button" value="Save As (overwrite!).. " id="save_as_pkg" style="font-size: 20px;" /><select id="save_as_pkg_id" name="save_as_pkg_id" />');

// sort the packages by name
var pids = [];
$.each(pkgNames, function(pid) { pids.push(pid); });

$.each(pids.sort(function(a, b) {
	return pkgNames[a] < pkgNames[b] ? -1 : 1;
}), function() {
	$('#save_as_pkg_id').append('<option value="' + this + '"' + (this == pkgId ? ' selected' : '') + '>' + pkgNames[this] + '</option>');
});
$('#save_as_pkg').click(function() {
	var priorPkgId = $('input[type=hidden][name=edit]').val();
	var newPkgId = $('#save_as_pkg_id option:selected').attr('value');
	$('#all_plays div.package_play').each(function(i) {
		var pkgPlayId = this.id.match(/play_(n?\d+)/)[1];
		this.id = 'play_n' + i;
		if (pkgPlayId == ('n' + i)) return;
		$(this).find('[name*=_' + pkgPlayId + ']').each(function() {
			$(this).attr('name', $(this).attr('name').replace('_' + pkgPlayId, '_n' + i));
		});
	});
	$('input[type=hidden][name=edit]').val(newPkgId);
	// reset pkg name at the top of the form if it hasn't already been changed
	var name = $('#package_name input[name=package_name]').val();
	if ((name == pkgNames[pkgId]) || (pkgId != priorPkgId && name == pkgNames[priorPkgId])) $('#package_name input[name=package_name]').val($('#save_as_pkg_id option:selected').val());
	$('form').attr('action', url.replace('edit=' + pkgId, 'edit=' + newPkgId));
	pkgNames[newPkgId] = $('#package_name input[name=package_name]').val();
	GM_setValue('pkg_names_' + teamId, pkgNames.toSource());
	$('input[type=submit]').click();
});

} // end if (specificPackage)
