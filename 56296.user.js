// ==UserScript==
// @name           I Am Listening
// @description    Automatically clicks the are you still listening popup that appears when listening to Sirius.
// @namespace      http://www.sirius.com/player/listen
// @include        http://www.sirius.com/player/listen/*
// ==/UserScript==

window.setTimeout(IAmListening, unsafeWindow.stillListeningTimeout + 5000);

function IAmListening()
{
	unsafeWindow.userIsListening();
	window.setTimeout(IAmListening, unsafeWindow.stillListeningTimeout + 5000);
}

unsafeWindow.processCaptionChange = function(param)
{

}
