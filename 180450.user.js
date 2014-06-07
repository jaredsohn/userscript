// ==UserScript==
// @name		Tsetsee
// @include	http://tv.univision.mn/24/watch
// @grant    none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
$("div[class='grid_11 now-playing roboto']").html("<select id='suvag'> \
                    <option value='mnb'>MNB</option> \
                    <option value='mnb_2' selected='selected'>MNB2</option> \
                    <option value='edu'>Education</option> \
                    <option value='ubs'>UBS</option> \
                    <option value='mn25'>TV25</option> \
                    <option value='ntv'>ntv</option> \
                    <option value='tv5'>TV5</option> \
                    <option value='eagle'>Eagle</option> \
                    <option value='sbn'>SBN</option> \
                    <option value='shuud'>Shuud</option> \
                    <option value='tv9'>TV9</option> \
                    <option value='sportbox'>SportBox</option> \
                    <option value='etv'>ETV</option> \
                    <option value='mongolhd'>Mongol TV</option> \
                    <option value='royal'>Royal</option> \
                    <option value='mnc'>MNC</option> \
                    <option value='ehoron'>Эх Орон</option> \
                    <option value='bloomberg'>Bloomberg</option> \
                    <option value='parliament'>Parliament</option> \
                 </select>");
$("#suvag").change(function() {
    var suvag = $("#suvag option:selected").val();
    var t = $("script:contains('jwplayer')").text();
    eval(t.replace(t.substring(t.indexOf("smil:")+5, t.indexOf(".smil")), suvag));
});
