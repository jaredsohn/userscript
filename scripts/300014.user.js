// ==UserScript==
// @name          TIL Snitch
// @namespace     http://skid.pro/
// @version       1.0.2
// @description   Yeah that's right, you're a little snitch.
// @match         http://reddit.com/r/todayilearned/*
// @match         http://*.reddit.com/r/todayilearned/*
// @match         https://reddit.com/r/todayilearned/*
// @match         https://*.reddit.com/r/todayilearned/*
// @include       http://reddit.com/r/todayilearned/*
// @include       http://*.reddit.com/r/todayilearned/*
// @include       https://reddit.com/r/todayilearned/*
// @include       https://*.reddit.com/r/todayilearned/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @updateURL     http://userscripts.org/scripts/source/300014.meta.js
// @downloadURL   http://userscripts.org/scripts/source/300014.user.js
// @run-at        document-end
// ==/UserScript==

var rules = $('h1:contains("Posting rules")').next();
var color = rules.css('background-color');

rules.find('> li').each(function(index) {
	var obj = $(this);
	obj.attr('name', 'rule-' + (index + 1));
	obj.draggable({ revert: "invalid", helper: 'clone',
		start: function(e, ui)
		{
			obj.css('visibility', 'hidden');
            $(ui.helper).css('width', obj.width());
            $(ui.helper).css('height', obj.height());
            $(ui.helper).css('background-color', color);
		},
		stop: function(e, ui)
		{
			obj.css('visibility', 'visible');
		}
	});
});

$(".thing.link .entry").each(function( index ) {
	$(this).droppable({
		accept: "li",
        tolerance: "pointer",
		drop: function( event, ui ) {
			var post = $(this).find("a.comments").attr("href");
			var rulenum = ui.draggable.attr("name").split("-")[1];
			var numeral = romanize(rulenum);
			
			var message = encodeURIComponent("**Offending post:** " + post + "\n\n**Rule violation**: " + numeral + " ^((" + rulenum + ")^)");
			
			document.location = "http://www.reddit.com/message/compose?to=%2Fr%2Ftodayilearned&subject=Rule%20" + numeral + "%20Violation&message=" + message;
		}
    });
});

function romanize(num) {
    if (!+num)
        return false;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
               "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
               "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}