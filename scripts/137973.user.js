// ==UserScript==
// @name       HF Trash/Sent Clearer
// @version    0.1
// @match      *hackforums.net/private.php*
// @copyright  2012+, KyleBoyer
// ==/UserScript==
var postkey = document.getElementsByName("my_post_key")[0].value;
GM_xmlhttpRequest({
     method: "POST",
     url: "http://www.hackforums.net/private.php",
     data: "my_post_key=" + postkey + "&keepunread=0&action=do_empty&submit=Delete&empty[2]=1&empty[4]=1",
     headers: {
          "Content-Type": "application/x-www-form-urlencoded"
     }
});