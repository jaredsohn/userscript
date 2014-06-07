// ==UserScript==
// @name        Forum Add-on
// @namespace   Consciousness [1365950] - Onions @ irc.torn.com:6667
// @description Additions to the forum that are well needed.
// @include     *.torn.com/forums.php*
// @include     *.torn.com/min_list*
// @version     1
// @require 	http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant 		none
// ==/UserScript==
var forum, id, start, fst, x, num = 0, ms = '&#8211;', ps = '+';
if (location.href.match(/\/forums.php/)) {
	function getParameterByName(name)
	{
	  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	  var regexS = "[\\?&]" + name + "=([^&#]*)";
	  var regex = new RegExp(regexS);
	  var results = regex.exec(window.location.search);
	  if(results == null)
		return "";
	  else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	forum = getParameterByName('forumID');
	id = getParameterByName('ID');
	start = getParameterByName('start');

	if ((forum.length>0) && (id.length>0)) {
		$('table[width="85%"]').each(function () { 
		if (!fst) {
				$(this).find('tbody>tr').each(function () {
					if (x) {
						if (!$(this).text().match(/^Super secret reinforced spam barrier/i)) $(this).attr('postnum',num);
						else {
							num++;
							$(this).find('td>a').prepend('<span style="color:white;font-weight:bold;cursor:pointer;" num_editer="true" num_edit="'+num+'">['+ms+']</span>');
						}
					}
					x = true;
				});
				fst = true;
			}
		});
	}
	function toggle_comment(x) {
		if (x.html()=="["+ps+"]") {
			$('*[postnum="'+x.attr('num_edit')+'"]').show();
			x.html("["+ms+"]");
		}
		else {
			$('*[postnum="'+x.attr('num_edit')+'"]').hide();
			x.html("["+ps+"]");
		}
	}
	function getId(number) {
		return $('*[postnum='+number+']:first>td:first>a:first').attr('href').replace('profiles.php?XID=','');
	}
	$('span[num_editer="true"]').mouseover(function () { $(this).css('background-color','#336699')}).mouseout(function () { $(this).css('background-color','#000000')});
	$('span[num_editer="true"]').click(function() { toggle_comment($(this)) });
	$('a:contains("Search Forum")').after('] [<a href="min_list" min_list="true" style="cursor:pointer;">Auto-minimise List</a>');
	$('a[min_list="true"]').mouseover(function () { $(this).css('text-decoration','underline');}).mouseout(function () { $(this).css('text-decoration','none');});
	for (i = 1; i<=num; i++) {
		if (localStorage.getItem('auto_min'+getId(i))==1) toggle_comment($('span[num_editer="true"][num_edit='+i+']'));
	}
}
else {
	$('html').html('');
	$('body').append('<b>Auto-minimise List</b><br>');
	$('head').append('<Title>Auto-min List</title>');
	for (i=0; i<localStorage.length; i++) {
		if (localStorage.key(i).match(/^auto_min/)) $('body').append('['+localStorage.key(i).replace('auto_min','')+'] <span del_min_type="true" del_min="'+localStorage.key(i).replace('auto_min','')+'" style="color:red;cursor:pointer;">[-]</span><br>');
	}
	$('body').append('Auto-min an ID: <form id="automin"><input type="text"><input type="submit" value="Add"></form>');
	$('#automin').submit(function () {
		if (!localStorage.getItem('auto_min'+$(this).find('input[type="text"]').val())) {
			localStorage.setItem('auto_min'+$(this).find('input[type="text"]').val(),1);
			$('body>b').after('<br>['+$(this).find('input[type="text"]').val()+'] <span del_min_type="true" del_min="'+$(this).find('input[type="text"]').val()+'" style="color:red;cursor:pointer;">[-]</span>');
		}
		$(this).find('input[type="text"]').val('');
		return false;
	});
	$('span[del_min_type="true"]').live("mouseover",function () { $(this).css('text-decoration','underline');}).live("mouseout",function () { $(this).css('text-decoration','none')})
	.live("click",function() {
		localStorage.removeItem("auto_min"+$(this).attr('del_min'));
		location.reload();
	});
}