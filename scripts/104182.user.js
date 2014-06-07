// ==UserScript==
// @name           OGame Redesign: Sending Enabled
// @namespace      Vesselin
// @author         Vesselin Bontchev
// @version        1.00
// @date           2011-05-29
// @description    Allows the switching to the second and third fleet dispatch page even if no fleet slots are available
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ('/game/index.php?page=fleet1') == -1)
		return;
	var unsafe = window;
	try
	{
		unsafe = unsafeWindow
	}
	catch (e)
	{
	}
	unsafe.sendingEnabled = true;
}
)();
