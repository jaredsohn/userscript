// ==UserScript==
// @name          Test1
// ==/UserScript==

<html>
<head>

<script type="text/javascript">
<!--
// Diese Funktion wandelt Komma in Punkt um
function replace(id) {


with(id) {

var oldvalue = value;

var newvalue = oldvalue.replace(/,/g,".");
value = newvalue;  
}
}
//-->
</script>

</head>


<script type="text/javascript">
<!--
// Diese Funktion erlaubt nur Ziffern und 4 Steuerelemente
function pruefe(event) {

var keycode;
if (window.event) {
keycode = window.event.keycode;
} else if (event) {
keycode = event.which;
} else {
return true;
}   
if (47 < keycode) {
if (keycode < 58) {
return true;
}
}
var keycodeascii = new Array(0,8,44,46);
while (keycodeascii.length > 0) {
if (keycode == keycodeascii.pop()) {                           
return true;
}
}
return false;
}
//-->
</script>

// Hier habe ich die Felder erstellt, in welchen in die Funktionen erfolgreich getestet habe
Bla: <input type="text" value="" name="hello" id="test1" size="30" onChange="replace(test1)" onkeypress="return pruefe(event)"/>
Bli : <input type="text" value="" name="hello" id="test2" size="30" onChange="replace(test2)" onkeypress="return pruefe(event)"/>
Blub: <input type="text" value="" name="hello" id="test3" size="30" onChange="replace(test3)" onkeypress="return pruefe(event)" />


</body>
</html>
