// ==UserScript==

// @name           Sparta Chrome/Firefox Extension
// @namespace      categoryfilter
// @description    Village splitter for Sparta's slaves
// @version		   2013.3.6
// @include        http://www.cnsparta.com/forums/
// ==/UserScript==

<form>
<select name="menu">
<option value="http://www.cnsparta.com/forums/">Home Forum</option>
<option value="http://www.cybernations.net/nation_drill_display.asp?Nation_ID=">Your Nation</option>
<option value="http://www.cybernations.net/nation_war_information.asp?Nation_ID=">Your Wars</option>
<option value="http://www.cnsparta.com/forums/index.php?showtopic=30">Guide Central</option>
</select>
<input type="button" onClick="location=this.form.menu.options[this.form.menu.selectedIndex].value;" value="GO">
</form>
