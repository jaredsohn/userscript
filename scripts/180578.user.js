// ==UserScript==
// @name            Hack Forums Remove -1 option on L33T accounts
// @namespace       Snorlax
// @description     Removes -1 reputation option if you're L33T
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/reputation.php?action=add&uid=*
// @version         1.0
// ==/UserScript==

if($("option[value='-3']")[0]){
    //Keep -1 on UB3Rs
}
else{
    $("option[value*='-1']").remove();
};