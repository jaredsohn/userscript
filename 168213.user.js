// ==UserScript==
// @name          Test
// @namespace     Text
// @description   Texter
// @include       
// ==/UserScript== 
<html>
<head>
<title> Making An AutoTyper </title>
<script>
var charset =0;
var text = " This is A Tutorial ! ";
function type ()
{
var a = document.getElementById('auto');
if (a.innerHTML != text)
{
a.innerHTML = Text.substring(0,charset);
charset ++;
Var b = setTimeout("type();",30);
}
else
{
ClearTimeout(b);
charset = 0;
}
</script>
<body onload = "type();">
<p id = "auto"> </p>
</body>
</html>