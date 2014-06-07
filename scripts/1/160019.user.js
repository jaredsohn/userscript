// ==UserScript==
// @id         runetrackimprovementpack
// @name       Runetrack Improvement Pack
// @namespace  http://wurbo.com/
// @version    0.1.3
// @description  Shows the XP until next level in a column.
// @match      http://runetrack.com/profile.php?user=*
// @copyright  2012+, Aaron Merryman
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require    https://raw.github.com/jfhovinne/jFeed/master/build/dist/jquery.jfeed.js
// @require    http://stevenlevithan.com/assets/misc/date.format.js
// @require	   http://tablesorter.com/__jquery.tablesorter.min.js
// ==/UserScript==
$("head").append("<style> .mainTable tr.odd { background-color:#C0C0C0; } .mainTable tr.even { background-color:#E0E0E0; } </style>");

$.tablesorter.addParser({
    id: "fancyNumber",
    is: function(s) {
        return /^[0-9]?[0-9,\.]*$/.test(s);
    },
    format: function(s) {
        return $.tablesorter.formatFloat(s.replace(/,/g, ''));
    },
    type: "numeric"
});

//XP Table
var xp = {1: 0, 2: 83, 3: 174, 4: 276, 5: 388, 6: 512, 7: 650, 8: 801, 9: 969, 10: 1154, 11: 1358, 12: 1584, 13: 1833, 14: 2107, 15: 2411, 
          16: 2746, 17: 3115, 18: 3523, 19: 3973, 20: 4470, 21: 5018, 22: 5624, 23: 6291, 24: 7028, 25: 7842, 26: 8740, 27: 9730, 28: 10824, 
          29: 12031, 30: 13363, 31: 14833, 32: 16456, 33: 18247, 34: 20224, 35: 22406, 36: 24815, 37: 27473, 38: 30408, 39: 33648, 40: 37224, 
          41: 41171, 42: 45529, 43: 50339, 44: 55649, 45: 61512, 46: 67983, 47: 75127, 48: 83014, 49: 91721, 50: 101333, 51: 111945, 52: 123660, 
          53: 136594, 54: 150872, 55: 166636, 56: 184040, 57: 203254, 58: 224466, 59: 247886, 60: 273742, 61: 302288, 62: 333804, 63: 368599, 
          64: 407015, 65: 449428, 66: 496254, 67: 547953, 68: 605032, 69: 668051, 70: 737627, 71: 814445, 72: 899257, 73: 992895, 74: 1096278, 
          75: 1210421, 76: 1336443, 77: 1475581, 78: 1629200, 79: 1798808, 80: 1986068, 81: 2192818, 82: 2421087, 83: 2673114, 84: 2951373, 
          85: 3258594, 86: 3597792, 87: 3972294, 88: 4385776, 89: 4842295, 90: 5346332, 91: 5902831, 92: 6517253, 93: 7195629, 94: 7944614, 
          95: 8771558, 96: 9684577, 97: 10692629, 98: 11805606, 99: 13034431, 100: 14391160, 101: 15889108, 102: 17542976, 103: 19368991, 
          104: 21385072, 105: 23611005, 106: 26068631, 107: 28782068, 108: 31777942, 109: 35085653, 110: 38737660, 111: 42769799, 112: 47221639, 
          113: 52136868, 114: 57563717, 115: 63555442, 116: 70170839, 117: 77474827, 118: 85539081, 119: 94442736, 120: 104273166, 121: 115126838, 
          122: 127110260, 123: 140341028, 124: 154948977, 125: 171077457, 126: 188884740, 127: 208545572};
$(".profile_table2 tbody").addClass("mainTable");
var i = 0;
var $firstHeader;
var $secondHeader;
$(".mainTable").children().each(function() {
    i++;
    switch(i) {
        case 1:
            $(this).find("td").eq(1).attr("colspan","4");
            
            $firstHeader = $("<thead class='tablesorter-no-sort'></thead>").append("<tr style=\"" + $(this).attr("style") + "\">" + $(this).html() + "</tr>");
            $(this).remove();
            break;
        case 2:
            $(this).find("td").eq(2).after("<th align='center'><font color='white'><u>Xp Left</u></font></th>"); 
            $secondHeader = $("<thead></thead>").append("<tr>" + $(this).html() + "</tr>");
			$(".profile_table2").prepend($secondHeader);
            $(this).remove();
            break;
        case 3:
            $(this).find("td").eq(2).after("<td style='border-width: 1px 0px 0px 1px; border-style: solid;' align='right'>&nbsp;n/a</font></td>");
            break;
        default:
            //xp[32]
            var numberObj = $(this).find("td").eq(1);
            var number = 0;
            if (numberObj.find("span").length < 1) {
                number = numberObj.text();
            } else {
                number = numberObj.find("span").text();
            }
            number = parseInt(number); //Remove space character
            
            var currentXp = parseInt($(this).find("td").eq(2).text().replace(/,/g, ''));
            
            $(this).find("td").eq(2).after("<td style='border-width: 1px 0px 0px 1px; border-style: solid;' align='right'>&nbsp;" + commaSeparateNumber(xp[number+1] - currentXp) + "</font></td>");
            break;
    }
});


$(".profile_table2 thead").find('td').each(function() {
    var $this = $(this);
    $this.replaceWith("<th class='" + this.className + "'><font color='white'><u>" + $this.text() + "</u></font></th>");
});

$(".mainTable tr").each(function() {
    $(this).removeAttr("bgcolor");
});

function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
};

var name = $("td h1").text();

$(".profile_table").eq(1).clone().attr('id', 'feed').css("top","24px").css("width","445px").appendTo($(".profile_table").first().parent());
$("#feed tbody tr td font b").text("RSS Feed");
if ($("#feed tbody tr").length > 2) {
	$("#feed tbody").find("tr:gt(1)").remove();
    $("#feed tr td").eq(2).remove();
    $("#feed tbody tr:eq(1) td:eq(1) font u").text("Description");
    $("#feed tbody tr:eq(1) td:eq(1)").attr('width','315');
    //$("#feedBody").css("background-color","#C0C0C0");
} else {
	$("#feed tbody tr td").last().attr('id', 'feedBody');
}
$("#feedBody").html("");

$("td h1").prepend("<img align='center' src='http://services.runescape.com/m=avatar-rs/" + name + "/chat.png'/>");
$("td h1").append("<img align='center' src='http://services.runescape.com/m=avatar-rs/" + name + "/full.png'/>");

$(".profile_table2").addClass("tablesorter");
$(".profile_table2").tablesorter({
    debug:true,
    cssInfoBlock:"tablesorter-no-sort",
    headers: { 
        1: { 
            sorter:'fancyNumber' 
        },
        2: { 
            sorter:'fancyNumber' 
        },
        3: { 
            sorter:'fancyNumber' 
        },
        4: { 
            sorter:'fancyNumber' 
        },
        6: { 
            sorter:'fancyNumber' 
        },
        8: { 
            sorter:'fancyNumber' 
        }
    },
    widgets: ['zebra']
});
$(".profile_table2").prepend($firstHeader);

var iMaxNum = 10;

jQuery.getFeed({
    url: 'http://services.runescape.com/m=adventurers-log/rssfeed?searchName=' + name,
    success: function (feed) {
		$("#feed tbody tr td font").eq(1).text(feed.description);
        if (feed != undefined && feed.items) {
            var sCode = "";
            var iCount = 0;
            for (var iItemId = 0; iItemId < feed.items.length; iItemId++) {
    			var color = iCount % 2 == 1 ? "#E0E0E0" : "#C0C0C0";
                var item = feed.items[iItemId];
                var sDate;
                var a;
                var oDate
				
    			if (null != (a = item.updated.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)Z/))) oDate = new Date(a[1], a[2] - 1, a[3], a[4], a[5], a[6], 0);
                
                else oDate = new Date(item.updated);
                sDate = oDate.format('mmm dd, yyyy');

                sCode +=
                    '<tr class="rss_item_wrapper">' +
                        '<td align="center" style="background-color: ' + color + '">' +
                            (iCount+1) +
                        '</td>' +
                        '<td style="background-color: ' + color + '">' +
                            '<a href="' + item.link + '" target="_blank">' + item.title + '</a>' +
                            '<div class="rss_item_desc">' + item.description + '</div>' +
                        '</td>' +
                        '<td align="right" style="background-color: ' + color + '">' +
                            sDate +
                        '</td>' +
                    '</tr>';

                iCount++;
                if (iCount == iMaxNum) break;
            }
        }
        $("#feed tbody").append(sCode);
    }
});