// ==UserScript==
// @name           TroLLIdentifier
// @namespace      shaldengeki
// @description    Labels posts according to the likelihood that they are bad posts.
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        http://archives.endoftheinter.net/showmessages.php*
// @version        1.0
// ==/UserScript==

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

function onloadHandler(response) {
	//alert user that report has been submitted, and give them the proper reponse.
	trollProbability = response.responseText;
	trollProbabilitySpan = document.createElement("span");
	trollProbabilitySpan.innerHTML = " | P(Troll): " + trollProbability + "%";
	this.e.appendChild(trollProbabilitySpan);
	if (trollProbability > 50) {
		this.e.nextSibling.getElementsByClassName("message")[0].style.opacity=(1.55-trollProbability/100);
	}
}

function processPosts() {
	var divs=document.getElementsByClassName('message-top');
	for (var i=0; i<divs.length; i++) {
		if (!divs[i].hasAttribute("trollidentifier")) {
			divs[i].setAttribute("trollidentifier", 1);
			var asi=divs[i].getElementsByTagName("a");
			if (asi[2]) {
				//get message text.
				var userName = asi[0].innerHTML;
				var messageText = divs[i].nextSibling.getElementsByClassName('message')[0].innerHTML.split("\n").map(function(line) { return line.trim() }).filter(function(line) { return line != "" }).join("");
				//request a percentage for this post.
				GM_xmlhttpRequest({
					method: 'POST',
					data: "username="+encodeURIComponent(userName)+"&text=" + encodeURIComponent(messageText), 
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					url: 'http://llanim.us/troLLreporter/getTextTrollProbability.php', 
					onload: onloadHandler.bind( { e:divs[i] } )
				});
			}
		}
	}
}

processPosts();
document.addEventListener("DOMNodeInserted", processPosts, false);