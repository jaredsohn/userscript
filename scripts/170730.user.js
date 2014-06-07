// ==UserScript==
// @name           FDUPT Send PTP
// @author         kemege (chaoskmg@gmail.com)
// @namespace      kemege
// @version        0.2
// @description    Send PTP to members that have replied in a certain post.
// @include        http://pt.vm.fudan.edu.cn/index.php?topic*
// @include        http://127.0.0.1/hg/*
// @include        http://10.107.200.225/index.php?topic*
// @grant          none
// ==/UserScript==
function sendptp() {
	var url = 'http://{host}/index.php?action=profile;area=exchange;save'.replace('{host}',window.location.host);
	var msg = '';
	var count = 0;
	$.each($('tr.item'), function() {
		var data = {
			'recipient_to[]': $(this).children(".member_id").html(),
			'amount': $(this).children(".ptp_cell").children(".ptp").val(),
			'ps': $(this).children(".message_cell").children(".message").val(),
			'name': $(this).children(".name").html(),
			'gift': 'Send Gift'
		};
		if (parseInt(data['amount'])>0) {
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				async: false,
				success: function() {
				msg += '<tr><td>{name}</td><td>请求已提交，似乎发送成功了。</td></tr>'.replace('{name}',data['name']);
				}
			})
			.fail(function() {
				msg += '<tr><td>{name}</td><td>请求提交失败，大概没发出去的样子。</td></tr>'.replace('{name}',data['name']);
			});
			count++;
		}
	});
	
	if (count>0) {
		
		$('#dialog_msg').html('<table>{tbody}<tr><td colspan="2">请查看您的PTP是否减少来确定发送的结果。</td></tr></table>'.replace('{tbody}',msg));
		$('#dialog_msg').dialog({ 
			autoOpen: true,
			modal: true,
			width: '30em',
			buttons: {
				"确定": function() { $(this).dialog("close"); }
			}
		});
	};
	$('#dialog_ptp').dialog('close');
}

function loadByPost() {
	var posters = new Array;
	var posters_tags=$('.poster');
	var regexid = /(?:u=)\d+/;
	$.each(posters_tags, function() {
		var username = this.children[0].children[1].innerHTML;
		var userlink = this.children[0].children[1].href;
		var member_id = regexid.exec(userlink)[0].substring(2);
		var avatar = $(this).children('ul').children('.avatar').children().attr('src');
		if (avatar==null)
			avatar = 'http://pt.vm.fudan.edu.cn/avatars/default_avatar.png';
		posters.push({'id': username, 'link': userlink, 'avatar': avatar, 'member_id':member_id});
	});

	$('<div id="dialog_ptp" title="Send PTP"></div><div id="dialog_msg" title="Send PTP"></div>').insertAfter('#quickreplybox');
	var tablecontent = '';
	for (p in posters) {
		tablecontent += pattern_line.replace(/(?:\{)(\w+)(?:\})/g, function(a, b, c, d){
			return posters[p][b];
		});
	}
	tablecontent += '<tr><td colspan="2">所有人</td><td><input type="text" class="message_all" size="30"/></td><td><input type="text" class="ptp_all" size="5"/></td></tr>';
	return pattern.replace('{0}',tablecontent);;
}

function loadByID() {
	var posters = new Array;
	var posters_tags=$('.poster');
	var regexid = /(?:u=)\d+/;
	var memberlist = [];
	$.each(posters_tags, function() {
		var username = this.children[0].children[1].innerHTML;
		var userlink = this.children[0].children[1].href;
		var member_id = parseInt(regexid.exec(userlink)[0].substring(2));
		var avatar = $(this).children('ul').children('.avatar').children().attr('src');
		if (avatar==null)
			avatar = 'http://pt.vm.fudan.edu.cn/avatars/default_avatar.png';
		posters[member_id] = {'id': username, 'link': userlink, 'avatar': avatar, 'member_id':member_id};
		if (memberlist.indexOf(member_id)<0) {
			memberlist.push(member_id);
		}
	});
	$('<div id="dialog_ptp" title="Send PTP"></div><div id="dialog_msg" title="Send PTP"></div>').insertAfter('#quickreplybox');
	var tablecontent = '';
	for (m in memberlist) {
		tablecontent += pattern_line.replace(/(?:\{)(\w+)(?:\})/g, function(a, b, c, d){
			return posters[memberlist[m]][b];
		});
	}
	tablecontent += '<tr><td colspan="2">所有人</td><td><input type="text" class="message_all" size="30"/></td><td><input type="text" class="ptp_all" size="5"/></td></tr>';
	return pattern.replace('{0}',tablecontent);
}

function openPTPDialog() {
	var header = header_id;
	var content;
	// if ($('input#Post').attr('checked')) {
	content = loadByID();
	// } else {
	// 	content = loadByPost();
	// };
	$('#dialog_ptp').html(header+content);
	var dialog = $('#dialog_ptp').dialog({
		show: {
			effect: 'slide',
			duration: 1000
		},
		hide: {
			effect: 'fade',
			duration: 1000
		},
		modal: true,
		width: '40em',
		buttons: {
			"确定": confirmSend,
			"取消": function() { 
				$(this).dialog("close");
			}
		},
		beforeClose: function() { 
			$(this).html('');
		}
	});
	$('#btnok').button();
	$('#btncancel').button();
	$('#select_type').buttonset();
	$(document).delegate('input#ID','click', function () {
		var header = header_id;
		content = loadByID();
		dialog.html(header+content);
		$('#select_type').buttonset();
	});
	$(document).delegate('input#Post','click', function () {
		var header = header_post;
		content = loadByPost();
		dialog.html(header+content);
		$('#select_type').buttonset();
	});
	$(document).delegate('.message_all', 'input', function(e) {
		$('.message').val($(this).val());
	});
	$(document).delegate('.ptp_all', 'input', function(e) {
		var value = parseInt($(this).val());
		if (isNaN(value)) {value = 0};
		$(this).val(value);
		$('.ptp').val(value);
		var ptp_total = 0;
		$.each($('.ptp'), function() {
			ptp_total += parseInt($(this).val());
		});
		$('.ptp_total').html(ptp_total);
	});
	$(document).delegate('.ptp', 'input', function(e) {
		var value = parseInt($(this).val());
		if (isNaN(value)) {value = 0};
		$(this).val(value);
		var ptp_total = 0;
		$.each($('.ptp'), function() {
			ptp_total += parseInt($(this).val());
		});
		$('.ptp_total').html(ptp_total);
	});
};

function confirmSend() {
	data = {
		'ptp': $('.ptp_total').html(),
		'num': 0,
		'list': []
	};
	$.each($('tr.item'), function() {
		if (parseInt($(this).children(".ptp_cell").children(".ptp").val())>0) {
			data['num']+=1;
			data['list'].push($(this).children(".name").html());
		};
	});
	data['liststr'] = data['list'].join(', ');
	$('#dialog_msg').html('<p>您确定要把共计 {ptp} PTP发送给如下{num}人吗？</p><p>{liststr}</p>'.replace(/(?:\{)(\w+)(?:\})/g, function(a, b, c, d){
			return data[b];
		}));
	$('#dialog_msg').dialog({ 
		autoOpen: true,
		modal: true,
		width: '30em',
		buttons: {
			"确定": sendptp,
			"返回": function() {
				$(this).dialog("close");
			}
		}
	});
}
var dialog;
var header_id = '<center><div id="select_type"><input type="radio" value="ID" id="ID"/><label for="ID">按ID散分</label><input type="radio" value="Post" id="Post" checked="checked"/><label for="Post">按楼层散分</label></div>';
var header_post = '<center><div id="select_type"><input type="radio" value="ID" id="ID" checked="checked"/><label for="ID">按ID散分</label><input type="radio" value="Post" id="Post"/><label for="Post">按楼层散分</label></div>';
var pattern = '<form><table><thead><td colspan="2">用户名</td><td>附言</td><td>PTP</td></thead>{0}<tfoot><td colspan="2">总计</td><td></td><td class="ptp_total">0</td></tfoot></table></form></center>';
var pattern_line = '<tr class="item"><td><img src="{avatar}" width="16" height="16"/></td><td class="name"><a href="{link}">{id}</a></td><td class="message_cell"><input type="text" class="message" size="30"/></td><td class="ptp_cell"><input type="text" class="ptp" size="5" value="0"/></td><td class="member_id" style="display:none">{member_id}</td></tr>';
	
$('.buttonlist.align_right').children('ul').prepend($('<li><a class="open_ptp" href="javascript:void(0);"><span>Give PTP</span></a></li>'));;
$('.open_ptp').click(openPTPDialog);
