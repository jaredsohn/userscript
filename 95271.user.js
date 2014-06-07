// ==UserScript==
// @name        Hide LearnedLeague Archive Answers
// @namespace   http://plutor.org/
// @description Hides the answers in the archives of the LearnedLeague
// @include     http://www.learnedleague.com/*
// ==/UserScript==

function hide_answers() {
	var tds = document.evaluate(
		'//td[@class=\'BxQA\']/p/b | ' +                          // ll47
        '//*[@class=\'ind-boxATbl\']//span[@class=\'red\'] | ' +  // ll37
        '//*[@class=\'ind-boxATbl\']//td[@class=\'ind-Ans\']',    // ll30
        document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
	);

	for (var i = 0; i < tds.snapshotLength; i++) {
		var td = tds.snapshotItem(i);
		if (
			 td.childNodes &&
			(td.childNodes.length > 0) &&
			(td.childNodes.item(0).nodeType == 3)
		) {
			var top = td.childNodes.item(0);
			var answer = top.data;

			var newLink = document.createElement("span");
			newLink.setAttribute("title", answer);
            newLink.setAttribute("style", "border-bottom: dotted 1px green; background: #eee");
			var linkText = document.createTextNode("[Hover to reveal answer]");
			newLink.appendChild(linkText);

            td.replaceChild(newLink, top);
		}
	}
};

function listen_for_answers() {
    var rdiv = document.getElementById('resultsdivcontainer');
    if (rdiv != undefined)
        rdiv.addEventListener(
            'DOMSubtreeModified',
            function() {
                var target = Event.target;
                hide_answers()
            },
            false
        );
}

hide_answers();
listen_for_answers();

