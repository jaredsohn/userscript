// ==UserScript==
// @name dontLikeEveryShit
// @namespace NormanSzigeti
// @include http*://*vicckiraly.com/*
// @include http*://*mokazona.com/*
// @include http*://*csakegyperc.com/*
// @include http*://*lajkgate.eu/*
// @include http*://*hirma.hu/*
// @include http*://*ezjo.in/*
// @include http*://*napikep.com/*
// ==/UserScript==

// ================================= //
// vicckiraly.com + napikep.com resz //
// ================================= //

try {
	var element = document.getElementById("PostLikeBox");
	element.parentNode.removeChild(element);

} catch(e) { 
	// nothing to do...
}

try {
	var element = document.getElementById("LikedPost");
	element.setAttribute("style",""); 

} catch(e) {
	// nothing to do...
}

// ============== //
// like2unlock JS // 
// ============== //

try {
	var allElements = document.getElementsByTagName('script');
	for (var i = 0; i < allElements.length; i++) {
    
		if (allElements[i].getAttribute('src')) {
			if (allElements[i].getAttribute('src').indexOf("like2unlock") > -1) {

				allElements[i].parentNode.removeChild(allElements[i]);
				console.log("like2unlock shit removed");
			}
		}
	}

} catch(e) { 
	// nothing to do...
}

setTimeout(function() {
	try {
		var els = document.getElementsByClassName("ui-locker-content");
		Array.prototype.forEach.call(els, function(element) {
			element.setAttribute("style",""); 
		});

	} catch(e) { 
		// nothing to do...
	}
}, 500);

// ============================= //
// mokazona.com other shits resz // 
// ============================= //

setTimeout(function() {
	try {
		var element = document.getElementById("like");
		element.parentNode.removeChild(element);

	} catch(e) { 
		// nothing to do...
	}

	try {
		var element = document.getElementById("likeText");
		element.parentNode.removeChild(element);

	} catch(e) { 
		// nothing to do...
	}
}, 500);

// ============================ //
// lajkgate.eu other shits resz // 
// ============================ //

setTimeout(function() {
	try {

		var els = document.getElementsByClassName("ui-locker-facebook-message");
		Array.prototype.forEach.call(els, function(element) {
			element.parentNode.removeChild(element);
		});

	} catch(e) { 
		// nothing to do...
	}

	try {
		var element = document.getElementById("slider1");
		element.parentNode.removeChild(element);

	} catch(e) { 
		// nothing to do...
	}
}, 500);

// ==================== //
// csakegyperc.com resz // 
// ==================== //

try {
	var element = document.getElementById("post_like_container");
	element.parentNode.removeChild(element);

} catch(e) { 
	// nothing to do...
}

try {
	var els = document.getElementsByClassName("hidden_container");
	Array.prototype.forEach.call(els, function(element) {
		element.setAttribute("class",""); 
	});

} catch(e) { 
	// nothing to do...
}

// ==================== //
// === ezjo.in resz === // 
// ==================== //

try {
	var els = document.getElementsByClassName("article");
	Array.prototype.forEach.call(els, function(element) {
		
		var els2 = element.getElementsByTagName('table');
		Array.prototype.forEach.call(els2, function(element2) {

			element2.parentNode.removeChild(element2);
		});
	});

} catch(e) { 
	// nothing to do...
}

try {
	var els = document.getElementsByClassName("fbjlike-content");
	Array.prototype.forEach.call(els, function(element) {
		element.setAttribute("style",""); 
	});

} catch(e) { 
	// nothing to do...
}


// ============================= //
// virallocker (serverside) rész // 
// ============================= //

try {
	var count = 0;
	var els = document.getElementsByClassName("virallocker-box");
	Array.prototype.forEach.call(els, function(element) {
		element.parentNode.removeChild(element);
		count++;
	});

	if (count > 0) {
		var allElements = document.getElementsByTagName('script');
		var viralID = "";

		for (var i = 0; i < allElements.length; i++) {
			var text = allElements[i].textContent || allElements[i].innerText;
			if (typeof(text) == "undefined") continue;

			var indx = text.indexOf('myID: "');
			if (indx > -1) {
				indx+=7;

				var indx2 = text.indexOf('"',indx+1);
				if (indx2 > -1) {
					viralID = text.substring(indx,indx2);
				}
			}
		}

		if (viralID.length > 0) {
			var data = { action: "virallocker", myID: viralID};
			jQuery.post("viral-lock.class.php", data, function(response) {
				if (virallocker_use) location.reload();					
			});
		}
	}

} catch(e) { 
	console.log(e);
	// nothing to do...
}




