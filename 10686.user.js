// ==UserScript==
// @name      Get Rid of Returns
// @version    1.0
// ==/UserScript==

<HEAD>

<SCRIPT LANGUAGE="JavaScript">
<!-- Original:  Ascii King (chicorama@usa.net) -->
<!-- Web Site:  http://www.geocities.com/enchantedforest/2120 -->

<!-- This script and many more are available free online at -->
<!-- The JavaScript Source!! http://javascript.internet.com -->

<!-- Begin
function ConvertBR(input) {
// Converts carriage returns 
// to <BR> for display in HTML

var output = "";
for (var i = 0; i < input.length; i++) {
if ((input.charCodeAt(i) == 13) && (input.charCodeAt(i + 1) == 10)) {
i++;
output += "<BR>";
} else {
output += input.charAt(i);
   }
}
return output;
}
//  End -->
</script>
</HEAD>

<BODY>

<center>
<form>
<textarea name=message rows=8 cols=50>You may type a message here

Make sure to press the [Enter] key a few times.

That way you will be able to see the 

conversion function in action.
</textarea>
<p>
<input type=button value="Convert Returns" onClick="this.form.output.value = ConvertBR(this.form.message.value);">
<p>
Output:  <input type=text name=output size=50>
<p>
</form>
</center>

<p><center>
<font face="arial, helvetica" size="-2">Free JavaScripts provided<br>
by <a href="http://javascriptsource.com">The JavaScript Source</a></font>
</center><p>

<!-- Script Size:  1.41 KB -->