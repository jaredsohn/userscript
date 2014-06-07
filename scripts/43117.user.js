// ==UserScript==
// @name           Twitter friends name helper
// @namespace      http://phpz.org/
// @description    Auto complete friends name when you type '@' or username everywhere.
// @version        2.2.2
// @author         Seven Yu
// @require        http://gm.phpz.org/public/checkVersion.js
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

function addStyle()
{
// define css
GM_addStyle(<><![CDATA[
.ac_results {
	padding: 0px;
	border: 1px solid black;
	background-color: white;
	overflow: hidden;
	z-index: 99999;
}
.ac_results ul {
	width: 100%;
	list-style-position: outside;
	list-style: none;
	padding: 0;
	margin: 0;
}
.ac_results li {
	margin: 0px;
	padding: 3px 5px;
	cursor: default;
	display: block;
	font: menu;
	font-size: 16px;
	line-height: 24px;
	overflow: hidden;
    text-align: left;
}
.ac_loading {
	background: white url('indicator.gif') right center no-repeat;
}
.ac_odd {
	background-color: #eee;
}
.ac_over {
	background-color: #0A246A;
	color: white;
}
.vcard {
    height: 34px;
}
.icon_links {
    display: none;
	background-color: #eee;
    position: relative;
    top: -19px;
    text-align: center;
    font-size: 0;
}
.icon_links a {
    float: left;
	height: 14px;
	width: 14px;
	display: block;
	margin: 1px;
	padding: 0px;
	background-image: url("data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1C%00%00%00%0E%04%03%00%00%00%CE%3Da7%00%00%00%03sBIT%08%08%08%DB%E1O%E0%00%00%00*PLTE%FF%FF%FF%FF%FF%FF%F7%F7%F7%EE%EE%EE%E5%E5%E5%DD%DD%DD%D5%D5%D5%CC%CC%CC%C3%C3%C3%BB%BB%BB%B2%B2%B2%AA%AA%AA%A1%A1%A1fff%80%03%BB%ED%00%00%00%0EtRNS%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FFWJ%DB%14%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%16tEXtCreation%20Time%0002%2F26%2F09%AF5BQ%00%00%00%1CtEXtSoftware%00Adobe%20Fireworks%20CS4%06%B2%D3%A0%00%00%00%97IDAT%08%99U%CF!%12%830%10%85%E1w%01D%AFP_%85%C6a%23%91%D8%BA%E8%AAxL%0E%80%E0%02%CCp%82NoP%C1%94%24%1B%60%DE%5D%9A%CC%A4%A2%BF%D8o%DD%CE%02%CC%E1Gu%C9%AD%05%7C%AE%B9%5B%01%5B%5D%93u%B35%CC%C0%B5l%95S%09G%A7%E0%3BO%FA%DEwi%B0G%D0%3A%84%A0%C3%9DASC%8C%11%11%23%0F%8A%A1A%B4%96%1Cl%1C%18--%F6i%1F%C71%0D%A6m%C21%93%C7%BC%1CK%3A4%2F8%9F%B9W%01%D5%3B%B7%16%F0%FF%C2%171%A2v%05%B9%B4j%80%00%00%00%00IEND%AEB%60%82");
	background-repeat: no-repeat;
}
.icon_links .a_reply {
	background-position: 0px 0px;
}
.icon_links .a_direct {
	background-position: -14px 0px;
}
#side #following #following_list {
    height: 238px;
    padding: 5px 2px 5px 8px;
    overflow: auto;
}
#following_list span {
    padding: 0 1px 1px;
}
]]></>);
}

var $, jQuery;
var me_name, created = false;
var names = [], icons = '', page = 1;

loading();

function loading()
{
    unsafeWindow.jQuery ? init() : setTimeout(loading, 100);
}

function init()
{
    $ = jQuery = unsafeWindow.jQuery;
    if('profile,settings,'.indexOf(document.body.id) >= 0) return;
    addScriptRef("http://dev.jquery.com/view/trunk/plugins/autocomplete/jquery.autocomplete.js");
    waitForLoadLibs();
}

// user scripts
function waitForLoadLibs() {
    // libs loaded?
    if( typeof jQuery.Autocompleter != 'undefined' )
    {
        me_name = $.trim($('#me_name').text());
        if (me_name == '') return;
        // call api 
        runAjax();
        // bind event
        $('#fm_menu').click(function()
        {
            setTimeout(createFollowList, 1000);
        });
    } else {
        setTimeout( waitForLoadLibs, 100 );
    }
}

function runAjax()
{
    $.getJSON('/statuses/friends/' + me_name + '.json?page=' + page++, ajaxCallback);
}

function ajaxCallback(data)
{
    var screen_name, name;
    for(var user in data)
    {
        // push array
        screen_name = data[user].screen_name;
        name = data[user].name;
        names.push(screen_name);
        names.push('@' + screen_name);
        // create icons
        icons += '<span class="thumb vcard author">' + 
                 '<a href="http://twitter.com/' + screen_name + '" class="url">' + 
                 '<img alt="' + name + '" class="photo fn" width="32" height="32" ' +
                 'src="' + data[user].profile_image_url + '" /></a>' + 
                 '<div id="links_' + screen_name + '" class="icon_links">' +
                 '<a href="javascript:void 0;" class="a_reply" ref="' + screen_name + '" title="Reply to '+name+'">@</a>' + 
                 '<a href="javascript:void 0;" class="a_direct" ref="' + screen_name + '" title="Send '+name+' a direct message.">D</a>' +
                 '</div></span>';
    }

    data.length >= 1 ? runAjax() : createUI();
}

function createUI()
{
    createAutoComplete();
    createFollowList();
}

function createAutoComplete()
{
    $('#loader').hide();
    $("#status").autocomplete(names,
    {
        multiple: true,
        multipleSeparator: ' ',
        max: 0,
        delay: 400,
        width: 350,
        height: 300,
    }).css('background-color', '#E8F7FA');
}

function createFollowList()
{
    addStyle();
    if(created || $('#following_list').size() == 0) return;
    created = true;
    $('#following_list')
    .html(icons).find('.vcard')
    .hover(
        function(e)
        {
            $(this).find('div').show();
        }, 
        function()
        {
            $(this).find('div').hide();
        }
    )
    .find('a').click(function()
    {
        var addstr = '';
        switch($(this).text())
        {
            case '@':
                addstr = '@';
                break;
            case 'D':
                addstr = 'D ';
                break;
            default:
                return;
                break;
        }
        $('#status')
            .val(addstr + $(this).attr('ref') + ' ' + $('#status').val())
            .focus();
    });
}

function addScriptRef(url) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = url;
    document.getElementsByTagName("head")[0].appendChild(s);
}

var name = 'TwitterFriendsNameHelper', version = '222';
checkVersion(name, version);