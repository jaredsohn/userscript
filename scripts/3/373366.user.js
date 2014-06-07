// ==UserScript==
// @name       Let's be Gazillion for a day!
// @version    0.2
// @description  Gives you the Gazillion theme for your profile and posts. (Only visible by you in this version)
// @updateURL   https://userscripts.org/scripts/source/373366.meta.js
// @downloadURL https://userscripts.org/scripts/source/373366.user.js
// @include      *forums.marvelheroes.com/*
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2013+, Spedwards
// ==/UserScript==

var rank = "Gazillion";
var rank2 = "Staff";
var username = "Spedwards";
var avatar = "gazillion2"; // Other options are "gazillion1", "gazillion2" or "gazillion3";
var title = "";

/* DO NOT EDIT BELOW HERE. */

var origin = document.location.origin;
var path = document.location.pathname;
var href = document.location.href;
jQuery.fn.exists = function(){return this.length>0;}

$(document).ready( function(){
    if(contains(path,username) || contains($('h1.H').text(),username)){
        $('body.Dashboard.Profile').addClass('Rank-Staff');
        $('span.User-Title').text(rank).after('<span class="Bullet">·</span>');
        $('span.Rank').addClass('Rank-Staff').attr('title',rank2).text(rank2);
        if(avatar != "default"){
            var av = "https://c3409409.ssl.cf0.rackcdn.com/marvelheroes.vanillaforums.com/avatars/nmarvel-" + avatar + ".png";
            $('img.ProfilePhoto[alt='+username+']').attr('src',av);
        }
    }else if(contains(path,"discussion")){
        if(avatar != "default"){
            var av = "https://c3409409.ssl.cf0.rackcdn.com/marvelheroes.vanillaforums.com/avatars/nmarvel-" + avatar + ".png";
            $('img.ProfilePhoto[alt='+username+']').attr('src',av);
        }
        if(title != ""){
            if( $('tr.Item.Mine span.MItem.AuthorTitle').exists() ){
                $('tr.Item.Mine span.MItem.AuthorTitle').text(title);
            }else{
                $('tr.Item.Mine span.MItem.AuthorLocation').before('<span class="MItem AuthorTitle">' + title + '</span>');
            }
        }else{
            if( $('tr.Item.Mine span.MItem.AuthorTitle').exists() ){
                $('tr.Item.Mine span.MItem.AuthorTitle').text(rank);
            }else{
                $('tr.Item.Mine span.MItem.AuthorLocation').before('<span class="MItem AuthorTitle">' + rank + '</span>');
            }
        }
        $('tr.Item.Mine').addClass('Rank-Staff');
        $('tr.Item.Mine span.Rank.MItem').addClass('Rank-Staff').attr('title',rank2).text(rank2);
    }
        
});

function contains(elem,str){
    if(elem.indexOf(str) != -1){
        return true;
    }else{
        return false;
    }
}