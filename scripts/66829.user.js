// ==UserScript==
// @name           SnapABug
// @description    Adds a tab to add a bug
// @namespace      http://userscripts.org/users/127937
// @include        http://www.pivotaltracker.com/dashboard
// ==/UserScript==

<script type="text/javascript">
document.write(unescape("%3Cscript src='" + ((document.location.protocol=="https:")?"https:":"http:") + "//snapabug.appspot.com/snapabug.js' type='text/javascript'%3E%3C/script%3E"));</script><script type="text/javascript">
SnapABug.addButton('b3b4a16f-cae6-45f6-a307-b4624ea6d4f3',"0","55%");
</script>