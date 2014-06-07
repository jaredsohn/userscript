// ==UserScript==
// @name       LF Trash Clearer
// @version    1.0
// @include       *.leakforums.org/private.php*
// @copyright  2012+, Sexuality
// ==/UserScript==
var postkey = document.getElementsByName("my_post_key")[0].value;
GM_xmlhttpRequest({
     method: "POST",
     url: "http://www.leakforums.org/private.php",
     data: "my_post_key=" + postkey + "&keepunread=0&action=do_empty&submit=Delete&empty[2]=0&empty[4]=1",
     headers: {
          "Content-Type": "application/x-www-form-urlencoded"
     }
});