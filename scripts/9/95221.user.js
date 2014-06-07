// ==UserScript==
// @name           Naruto manga
// @namespace      www.mangable.com/Naruto
// @version        0.1
// @description    easy access to reading naruto online
// @include        www.mangable.com/Naruto
// ==/UserScript==

<html>
<head>
<script type="text/javascript">
<!--
function confirmation() {
	var answer = confirm("Read Naruto")
	if (answer){
		alert("Bye bye!")
		window.location = "http://www.mangable.com/Naruto";
	}
	else{
		alert("Thanks for sticking around!")
	}
}
//-->
</script>
</head>
<body>
<form>
<input type="button" onclick="confirmation()" value="Leave Tizag.com">
</form>
</body>
</html>