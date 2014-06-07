// ==UserScript==
// @name            Hack Forums Delete PM on send
// @namespace       Snorlax
// @description     Delete previous PM after you've replied to the current
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/private.php*
// @grant			GM_xmlhttpRequest
// @version         1.0
// ==/UserScript==

$("input[name*='smilies']").parent("label").html('<label><input type="checkbox" class="checkbox" name="options[disablesmilies]" value="1" tabindex="6"><strong>Delete PM:</strong> remove the original private message</label>');

$("input[name='submit']").click(function(){
    if($("input[name*='smilies']").is(':checked')){
        pmid = $("input[name='pmid']").val();
        postKey = document.getElementsByTagName('head')[0].innerHTML.split('my_post_key = "')[1].split('";')[0];
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.hackforums.net/private.php?action=delete&pmid="+pmid+"&my_post_key="+postKey,
        });
    }
});