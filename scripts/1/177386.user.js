// ==UserScript==
// @name         The-West Quest book mod
// @version      0.1
// @description  Quest book mod, allows you to switch between quest intro and completion texts
// @author       Bluep
// @namespace    http://bluep.de/qbmod
// @include	 http://*.the-west.*/game.php*
// ==/UserScript==

/**
 * Quest book mod
 * 
 * @version 0.1
 * Initial version, works in Chrome and FF with TW 2.04 and 2.05
 * 
 */


var QBmod = function() {
    function init(waitCounter) {
	waitCounter = waitCounter || 0;
	if (waitCounter < 20) {
	    waitCounter = waitCounter + 1;
	    if (typeof jQuery === "undefined" || typeof window.QuestWindowView === "undefined" || typeof window.QuestWindowView.showSolvedQuest === "undefined") {
		window.setTimeout(function () { init(waitCounter); }, 500);
	    } else {
		inject(jQuery);
	    }
	}
    };
    function inject($) {
	QuestWindowView._showSolvedQuest = QuestWindowView.showSolvedQuest;					// backup original
	QuestWindowView.showSolvedQuest = function(quest) {
	    QuestWindowView._showSolvedQuest(quest);								// call original
	    var $endtext = $("div.window-quest_solved div.quest_description_container span:last").hide();	// identify completion text & hide it
	    var $introtext = $("<span><br>"+quest.description+"</span>");					// create intro text & add it
	    $endtext.parent().append($introtext);
	    var $swbutton = $('<a href="#">Switch texts</a>').click(function(){$endtext.toggle();$introtext.toggle();});	// create switch link & add it
	    $("div.window-quest_solved div.solved_text_container").append($swbutton);
	}
    };
    return {
    	init: init
    }
};

function loadQBmodScript() {
	var qbms = document.getElementById("qbms");
	if (!qbms) {
		qbms = document.createElement("SCRIPT");
		qbms.setAttribute("id", "qbms");
		qbms.innerHTML = "var QBmod = (" + QBmod.toString() + "());QBmod.init();";
		document.getElementsByTagName("body")[0].appendChild(qbms);
	}
}

if (location.href.indexOf(".the-west.") !== -1 && location.href.indexOf("game.php") !== -1) {
	loadQBmodScript();
}