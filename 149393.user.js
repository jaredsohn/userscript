// ==UserScript==
// @name       Xhamster
// @namespace  http://localhost/
// @version    0.1
// @description  A little ajaxy frontend to xHamster. I made it for my laptop so its not that great on big screens yet. I'll add a fluid layout and clean up all the horrible hacks in next version. Comment if you like/hate/cant get it to work.
// @match      http://xhamster.com/movies/*
// @copyright  2012+, You
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js 
// ==/UserScript==

// Url to fetch the category listing from.
var categoryUrl = 'http://xhamster.com/menuAjax.php?act=channels';

// Extract Search BOX
var search = $('form[name="searchForm"]');

// Extract Player
var player = $('#player').remove();

// Extract Related Video Links
var related = $("#relatives_videos > table > tbody > tr > td > a").remove();

// Holds the last sprite node to use for video preview
var lastSprite = null;

// New Body
$('body').html("<div id='search'></div> <div id='player_container'></div> <div id='related'></div><div><ol id='categories'></ol></div>");

// Style up some shit
$("#related").attr('style', 'position: absolute; top: 23px; right:133px; width:350px; height:640px; overflow: auto;');
$("#categories").attr("style", "position: absolute; top: 20px; right:6px; width:120px; list-style: none; padding: 0px; overflow: auto; height: 640px;");
$("#search").attr("style", "position: absolute; top: 0; right:0; width:300px; z-index: 10;");
$("#player_container").attr("style", "position: absolute; top: 0; left:0; width:870px;");
player.attr("width","870px");
player.attr("height","670px");

// Add the player and the seatch back.
$("#search").html(search);
$("#player_container").html(player);

function fetchCategories(){
    $.ajax({
        url: categoryUrl,
        type: 'GET',
        success: function(data) {
            var cleaned = data.replace("$('# .sub').html('", "");
            var cleaned2 = cleaned.replace("'></a>'); $('# a').hover(channelHoverIn,channelHoverOut);", "");
            var cleaned3 = cleaned.replace(/'/g, '"');
            var cleaned4 = cleaned.replace(/\\/g, '');
            var dom = $(cleaned4);
            dom.find('img').remove();
            dom.find('a').each(function(index){
                $("#categories").append($("<li></li>").html(this));
            });
        }
    });
}

function fetchCategoryPage(_categoryUrl){
    $.ajax({
        url: _categoryUrl,
        type: 'GET',
        success: function(data) {
            var dom = $(data);
            addRelated( dom.filter('ts#videotitile > table > a') );
        }
    });
}

function addPlayer(_targetScript){
    var src = "function Bar(){} Bar.prototype.embedSWF = function(){}; swfobject = new Bar();" + _targetScript.text || _targetScript.textContent || _targetScript.innerHTML;
    $.globalEval(src);
    $("#player_container").html("<div id='player'></div>");
    flashvars.autostart = false;
    unsafeWindow.swfobject.embedSWF('http://us-st.xhamster.com/xhplayer2.swf', 'player', '855','665', '8.0.0', false, flashvars, params, attributes);
}

function addRelated(_related){
    $("#related").html("<table><tr> <td id='left'></td> <td id='right'></td> </tr></table>");
    _related.each(function(index){
        if (index % 2 == 0){
            $("#left").append(this);
        }
        else{
            $("#right").append(this);
        }
    });
}

$("body").on('click', "#related a", function(e){
    e.preventDefault();
    //lastSprite = $(this).filter('.hSprite').attr('sprite');
    console.log($(this).find('.hSprite').attr('sprite'));
    console.log(lastSprite);
    
    $.ajax({
    url: this.href,
    type: 'GET',
    success: function(data) {
        var dom = $(data);
        var next_related =  dom.find("#relatives_videos > table > tbody > tr > td > a");
        var scripts = dom.filter('script').not('[src]');
        addPlayer(scripts[1]);
        addRelated(next_related);
    }});
});

$("body").on('click', "#categories a", function(e){
    e.preventDefault(); 
    $.ajax({
    url: this.href,
    type: 'GET',
    success: function(data) {
        var dom = $(data);
        var items =  dom.find('.hRotator');
        console.log(dom);
        console.log(items);
        addRelated(items);
    }});
});


$("body").on('mouseover', "#player", function(e){
    console.log("in player");
});


addRelated(related);
fetchCategories();

