// ==UserScript==
// @name           PropertyChimp
// @include        http://www.houseprices.co.uk/e.php?*
// @include        http://www.rightmove.co.uk/property-for-sale/*

// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100); }
  else { 
    $ = unsafeWindow.jQuery; chimp(); 
  }
}
GM_wait();

function chimp()
{
	var host = window.location.hostname;
	if (host == 'www.houseprices.co.uk') houseprices();
	if (host == 'www.rightmove.co.uk') rightmove();
}

function rightmove() {
	var searchLocation = $('#searchResultsInput').val();
	$('.displayaddress').each(function() {
		var split = $(this).html().split(',');
		var hpQuery = split[0];
		if (isNum(split[0]) && split.length > 0) hpQuery += "," + split[1];
		hpQuery += ", " + searchLocation;
		$(this).parent().after(' &raquo;<a href="' + zooplaAddressUrl(hpQuery) + '" style="color: #3350AC; background-color:#FFFFCC; text-decoration: underline">zoopla</a>');
		$(this).parent().after('<br />&raquo;<a href="' + hpAddressUrl(hpQuery) + '" style="color: #3350AC; background-color:#FFFFCC; text-decoration: underline">houseprices</a>');
	});
}

function houseprices() {
	$('head').append('<style type="text/css"> td.chimp { background-color: #ffffdd; } </style>');
	var $t = $('table').first();
	$t.find('tr').first().append('<th>Change</th>');
	$t.find('tr').has('td').each(function() {
		var $row = $(this);
		$row.append('<td class="chimp"><a class="fetch" href="#">Fetch</a></td>');
		
	});
	$('a.fetch').mouseover(function() {
		var $a = $(this);
		var $row = $a.closest('tr');
		var $adclone = $row.find('td').eq(1).clone();
		$adclone.children().remove();
		var addr = $adclone.text();
		$a.hide().after("Wait");
		$a.parent().load(hpAddressUrl(addr) + " table:eq(0) tr", function() {
			var $data = $(this);
			$data.find('tr').has('th').remove();
			$data.find('td:nth-child(2)').remove();
			$(this).find("tr").each(function() {
				var $drow = $(this);
				var p2 = $drow.children().eq(1).html().replace(/[^.0-9]/g, "");
				var p1 = $drow.next().children().eq(1).html();
				if (p1 != null) {
					p1 = p1.replace(/[^.0-9]/g, "");
					var change = ((p2 / p1) - 1.0) * 100;
					var roundChange = change.toFixed(1);
					var d2 = parseDate($drow.children().eq(0).html());
					var d1 = parseDate($drow.next().children().eq(0).html());
					var years = (d2 - d1) / (365*24*60*60*1000);
					var anChange = (Math.pow(change / 100 + 1, 1 / years) - 1.0) * 100;
					var title = roundChange + "% change over " + (years * 12).toFixed(0) + " months";
					if (years != 0) title += " (" + anChange.toFixed(1) + "% annual)";
					$drow.append("<td><span><abbr title='" + title + "'>" + roundChange + "%</abbr></span></td>");
					if(change > 0) $drow.children().eq(2).css("background-color", "#c4ed64");
					if(change < 0) $drow.children().eq(2).css("background-color", "#f04f31");
				}
			});
		});
	});
}

function parseDate(d) {
	var split = d.split('/');
	return new Date(split[2], split[1] - 1, split[0]);
}

function hpAddressUrl(s) {                            
    return "http://www.houseprices.co.uk/e.php?q=" + urlencode(s) + "&n=10";
}

function zooplaAddressUrl(s) {                            
    return "http://www.zoopla.co.uk/search/?q=" + urlencode(s);
}

function urlencode(s) {                            
    return encodeURIComponent(s).replace(/%20/g, '+');
}

function liText($el) {
	return $el.replaceWith('<li>' + $el.text() + '</li>');
}

function moveInner($source, $target)
{
	$target.append($source.html() + '<br />');
	$source.remove();
}

function isNum(value) { 
    var intRegex = /^\d+$/;
	return intRegex.test(value);
}