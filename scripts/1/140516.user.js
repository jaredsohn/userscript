// ==UserScript==
// @name            herBs
// @description     To access Solar
// @include         *
// ==/UserScript==

<script type="text/javascript">
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
</script>
