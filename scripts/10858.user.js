// ==UserScript==
// @name           TMT New Files Skin Prefix Fix
// @namespace      Hi
// @description    Allows posting of new threads in the new files section with any forum skin.
// @include        http://www.modtheater.com/forum/newthread.php?*f=65*
// @include        http://modtheater.com/forum/newthread.php?*f=65*
// ==/UserScript==

	//Initialise a couple of vars
	var documenttables;
	var thistable;
	
	//Find any <table> elements w/ a class attribute
	documenttables = document.evaluate("//table[@class]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	{
		//loop through any found instances
		for (var i = 0; i < documenttables.snapshotLength; i++) 
		{
			thistable = documenttables.snapshotItem(i);

			//check if the table is the right one to modify.
			if(thistable.getAttribute("class") == "fieldset")
			{
				//Change the table.
				thistable.innerHTML = '<tr><td class="smallfont">Prefix:</td><td class="smallfont" colspan="2">Title:</td></tr><tr><td><select name="threadprefix"><option value=""></option><option value="MOH:AA" >MOH:AA</option><option value="MOH:SH" >MOH:SH</option><option value="MOH:BT" >MOH:BT</option><option value="MOH:PA" >MOH:PA</option><option value="MOH:A" >MOH:A</option><option value="COD" >COD</option><option value="COD2" >COD2</option><option value="BF1942" >BF1942</option><option value="BFV" >BFV</option><option value="BF2" >BF2</option>  <option value="HL2" >HL2</option><option value="RTCW" >RTCW</option></select>&nbsp;</td>  <td><input type="text" class="bginput" name="subject" value="" size="40" maxlength="85" tabindex="1" /></td><td>&nbsp;&nbsp;</td><td><img id="display_posticon" src="clear.gif" alt="" /></td></tr>';
				//Done
			}
		}
	}