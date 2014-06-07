// ==UserScript==
// @name        Outlook.com - Hide Right Bar
// @namespace   discon-ns/
// @description Hides the right bar
// @include     https://*.mail.live.com/*
// @grant		none
// @version     2
// ==/UserScript==

function LockElement(console, elementFinder, elementHider, mutationActor)
{
	const tickInterval = 1000;

	//
	// Ticks until it finds the element, using "elementFinder".
	// When it does find it, it calls the callback with
	// the element.
	//
	function tickFinder(onFindCallback)
	{
		var element = elementFinder();
		if (element) {
			console.log("tickFinder", "Found it");
			onFindCallback(element);
		}
		else {
			console.log("tickFinder", "Didn't find it");
			setTimeout(tickFinder, tickInterval);
		}
	}

	//
	// The observer calls the "mutationActor" on each mutation
	// it does not recognize.
	//
	var observer = new MutationObserver(function(mutations) {
		mutations.forEach(function(mut) {

			if (mut.attributeName != "data-locked") {
				console.log("observer", "attribute changed", mut.attributeName);
				mutationActor(mut);
			}

		});
	});

	//
	// Called by tickFinder with the element.
	// Calls "elementHider" to hide the element,
	// and sets the observer up.
	//
	function onFind(element)
	{
		console.log("onFind", "hiding...");
		elementHider(element);
		console.log("onFind", "setting observer...");
		observer.disconnect();
		observer.observe(element, { attributes: true });
		console.log("onFind", "setting lock...");
		element.dataset.locked = "true";

		tickChecker();
	}

	//
	// This uses "elementFinder" to check whether the element
	// is still as we want it.
	// If not, it starts up tickFinder() again, which starts
	// the whole cycle.
	//
	function tickChecker()
	{
		var element = elementFinder();
		if (element && element.dataset.locked != "true") {
			console.log("tickChecker", "Element found but not locked!");
			tickFinder(onFind);
		}
		else {
			console.log("tickChecker", element ? "Element found, locked." : "Element not found.");
			setTimeout(tickChecker, tickInterval);
		}
	}

	//
	// Start the process
	//
	tickFinder(onFind);
}

if (window.top == window.self)
{
	var noconsole = { log: function() {} };

	LockElement(noconsole,
		function elementFinder()
		{
			return document.querySelector(".WithRightRail");
		},
		function elementHider(el)
		{
			el.classList.remove("WithRightRail");
		},
		function mutationAction(mut)
		{
			if (mut.attributeName == "class" && mut.target.classList.contains("WithRightRail"))
			{
				mut.target.classList.remove("WithRightRail");
			}
		}
	);

	LockElement(noconsole,
		function elementFinder()
		{
			return document.querySelector("#RightRailContainer");
		},
		function elementHider(el)
		{
			el.style.display = "none";
		},
		function mutationAction(mut)
		{
		}
	);

	LockElement(noconsole,
		function elementFinder()
		{
			return document.querySelector("#RadAd_Skyscraper");
		},
		function elementHider(el)
		{
			el.style.display = "none";
		},
		function mutationAction(mut)
		{
		}
	);
}
