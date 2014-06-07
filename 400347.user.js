// ==UserScript==
// @name       bare
// @namespace  http://ysmood.org
// @version    0.4
// @require    http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @description  Baidu auto reimburse expenses.
// @match      http://erp.baidu.com:8000/*
// @copyright  Feb 2014, ys
// ==/UserScript==

/*
Format, use any space to seperate the values.

	-- data -- time -- cost --
	 2014.1.1  22:11    22
	 2014.1.4  21:30    43

Remarks
	Don't input the title "-- data -- time -- cost --",
	you only need to input something like "2014.1.1  22:11  22".
 */
var $btn_run, $btn_toggle, $msg_box, $time, $txt, input, time_id, txt;

time_id = $('label:contains("上车时间")').attr('for');

$time = $('#' + time_id);

if ($time.length === 0) {
  return;
}

input = function(txt) {
  var arr, cost, date, left_lines, line, lines, time;
  lines = txt.split(/\n+/);
  line = lines[0];
  left_lines = lines.slice(1);
  if (line) {
    arr = line.trim().split(/\s+/);
    date = arr[0];
    time = arr[1];
    cost = arr[2];
    $('#ExpTypeChoice').val('10097');
    $('#StartDate').val(date);
    $('#DetailDailyRate').val(cost);
    $('#DetailReceiptAmount').val(cost);
    $('#Justification').val('上车时间:' + time);
    $time.val(time);
    $('#DuplicateButton_uixr').click();
  }
  if (lines.length > 1) {
    txt = lines.slice(1).join('\n');
    return localStorage.setItem('bare_list', txt);
  } else {
    return localStorage.removeItem('bare_list');
  }
};

txt = localStorage.getItem('bare_list');

if (txt) {
  input(txt);
} else {
  $msg_box = $('\n<div>\n	<textarea style=\'font-family:"Lucida Console", Monaco, monospace\' cols="60" rows="20"></textarea>\n	<br>\n	<button class=\'run\'>Peace ~</button>\n	<button class=\'toggle\'>Toggle</button>\n</div>\n').css({
    position: 'fixed',
    bottom: 20,
    right: 20,
    background: 'rgba(0,0,0,0.5)',
    padding: '5px',
    'border-radius': '3px'
  });
  $('body').append($msg_box);
  $btn_toggle = $msg_box.find('.toggle');
  $btn_run = $msg_box.find('.run');
  $txt = $msg_box.find('textarea');
  $txt.attr('placeholder', '-- data -- time -- cost --                                                      2014.1.1   22:11    22');
  $btn_toggle.click(function() {
    return $txt.toggle();
  });
  $btn_run.click(function() {
    txt = $txt.val();
    return input(txt);
  });
}


/*
###
Format, use any space to seperate the values.

	-- data -- time -- cost --
	 2014.1.1  22:11    22
	 2014.1.4  21:30    43

Remarks
	Don't input the title "-- data -- time -- cost --",
	you only need to input something like "2014.1.1  22:11  22".

###

time_id = $('label:contains("上车时间")').attr('for')
$time = $('#' + time_id)
if $time.length == 0
	return

input = (txt) ->
	lines = txt.split /\n+/
	line = lines[0]
	left_lines = lines.slice(1)

	if line
		arr = line.trim().split /\s+/
		date = arr[0]
		time = arr[1]
		cost = arr[2]

		$('#ExpTypeChoice').val '10097'
		$('#StartDate').val date
		$('#DetailDailyRate').val cost
		$('#DetailReceiptAmount').val cost
		$('#Justification').val '上车时间:' + time
		$time.val time

		$('#DuplicateButton_uixr').click()

	if lines.length > 1
		txt = lines.slice(1).join('\n')
		localStorage.setItem 'bare_list', txt
	else
		localStorage.removeItem 'bare_list'

txt = localStorage.getItem 'bare_list'

if txt
	input txt
else
	$msg_box = $('''

	<div>
		<textarea style='font-family:"Lucida Console", Monaco, monospace' cols="60" rows="20"></textarea>
		<br>
		<button class='run'>Peace ~</button>
		<button class='toggle'>Toggle</button>
	</div>

	''').css {
		position: 'fixed'
		bottom: 20
		right: 20
		background: 'rgba(0,0,0,0.5)'
		padding: '5px'
		'border-radius': '3px'
	}
	$('body').append $msg_box

	$btn_toggle = $msg_box.find('.toggle')
	$btn_run = $msg_box.find('.run')
	$txt = $msg_box.find('textarea')
	$txt.attr 'placeholder', '''
		-- data -- time -- cost --                                                    
		2014.1.1   22:11    22
	'''

	$btn_toggle.click ->
		$txt.toggle()

	$btn_run.click ->
		txt = $txt.val()
		input txt
*/