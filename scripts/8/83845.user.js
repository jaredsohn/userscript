// ==UserScript==
// @name           OGame Redesign: Direct Colonization
// @description    Removes the annoying prompt when trying to colonize without available planet slots.
// @namespace      Vesselin
// @version        1.01
// @date           2012-06-02
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=fleet3") == -1)
		return;
	var myScript = document.createElement ("script");
	myScript.setAttribute ("type", "text/javascript");
	myScript.setAttribute ("language", "javascript");
	myScript.text =
		"function trySubmit ()\n" +
		"{\n" +
			"\tif (validated)\n" +
			"\t{\n" +
				'\t\t$ ("#metal").val (getValue ($ ("#metal").val ()));\n' +
				'\t\t$ ("#crystal").val (getValue ($ ("#crystal").val ()));\n' +
				'\t\t$ ("#deuterium").val (getValue ($ ("#deuterium").val ()));\n' +
				"\t\tdocument.sendForm.submit ();\n" +
			"\t}\n" +
		"}";
	document.body.appendChild (myScript);
}
) ();
