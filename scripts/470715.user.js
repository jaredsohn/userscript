// ==UserScript==
// @name       BAT Statistics generator
// @namespace  http://hirito.eu/
// @version    0.1
// @description  You can't hide now.
// @match      *://osu.ppy.sh/forum/posting.php?*
// @copyright  2014+, Marcin
// ==/UserScript==
var $ = unsafeWindow.jQuery;
var subforum_id = getUrlVars()['f'];
var topic_id = getUrlVars()['t'];
var posting_icon = 0;
var user_id = $(".content-infoline > div > b > a").attr("href").split("/")[2];
var button_html = "<a href='#' class='btn green uberdupermodpost'><i class='icon-ok-sign'> </i><strong> Post modding</strong> </a>";
var topic_name = $("#wrapcentre > #pageheader > .breadcrumbs > a:nth-child(4)").text();
var forum_name = $("#wrapcentre > #pageheader > .breadcrumbs > a:nth-child(3)").text();
var user_name = $(".content-infoline > div:first > b > a").text();
var post_id_before = $("#postform > .tablebg:last > tbody > tr:nth-child(2) > .row1:nth-child(1) > div > .tablebg > tbody > .row1:nth-child(3) > td > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > span > a").attr("href");
post_id_before = getFromUrlVars(post_id_before)['p'];

if (subforum_id == 10 || subforum_id == 6 || subforum_id == 19)
	$("#postform > .centrep:last > a:nth-child(2)").before(button_html);
$(".uberdupermodpost").click(onPostSubmitted);

function onPostSubmitted(){
    posting_icon = $("input:radio[name=icon]:checked").val();
    if (posting_icon == undefined)
        posting_icon = 0;
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://charts.hiroto.eu/bss/posting",
        data: "user_id=" + user_id
        + "&user_name=" + encodeURIComponent(user_name)
        + "&subforum_id=" + subforum_id
        + "&subforum_name=" + encodeURIComponent(forum_name)
        + "&topic_id=" + topic_id
        + "&topic_name=" + encodeURIComponent(topic_name)
        + "&post_id_before=" + post_id_before
        + "&icon_id=" + posting_icon,
        headers:{
         	"Content-Type": "application/x-www-form-urlencoded"
        },
        onload: function(response){
            if (response.status == 200)
            {
         		unsafeWindow.submitForm("post");
            }
            else
            {
                console.debug(response.status);
                console.debug(response);
            }
                
        }
    });
    //$.post("http://charts.hiroto.eu/bss/posting", dataToPost);
}

function getUrlVars() {
	var map = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
}
function getFromUrlVars(link){
    var map = {};
	var parts = link.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		map[key] = value;
	});
	return map;
    
}