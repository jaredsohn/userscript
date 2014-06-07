// ==UserScript==
// @name        imgur - favorite users and avatars (nin)
// @namespace   http://userscripts.org/users/521912
// @description Lets you favourite users on Imgur.com
// @author              ninmonkey

// @match      http://*.imgur.com/*
// @version     0.2.7
// @date                2014-03-04
// @grant       none
// @run-at              document-end
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

/*
Note:
    It requires a tiny sleep, since imgur modifies the dom after
    document.ready , a delay 250ms seems to work good.

*/

var use_gui = true;

var favs = new Array("moonkey", "ninmonkey", 'chemistrydoc'
    , 'Ayham111', 'AntSantarelli', 'tiroler', 'ashcz'
    , 'lapsus', 'PeanutBuddha', 'Creatingusernamesgivesmeanxiety'
    , 'Nobodyn0se', 'Enidaj', 'DurdenTyler'
    , "BARTELS",  "MyNameIsJeanValjean",  "kcloud",  "StinkFist893",  "raoulduke25",  "TheFeralCat",  "ShamrockFury",  "Commentnado",  "MakingUpAUsernameIsTerrifying",  "0xnonSENSE",  "PeanutBuddha",  "vorduul",  "SweetBabyJesus",  "SexySloth",  "McTrick",  "BananaHammockRepublic",  "creatingusernamesgivesmeanxiety",  "DanceComander",  "DishonestAbe",  "Enidaj",  "overloadedcoffee (great OC)",  "MisterPants (great OC)",  "YellowSnowman",  "DrZZoidberg",  "Freestuyl",  "seanjohn (great OC)",  "ScientistSalarian",  "Moonkey",  "Cambric",  "VodkaGummyBears",  "napsmear (great OC)",  "spacemosphere",  "idonotthinkmyusernamemeanswhatyouthinkitmeans",  "CanadaFuckYeahSorryAboutTheLanguage",  "ItalianStallions",  "YourAuthorityIsNotRecognizedInFortKickass",  "LordPuffington",  "Rayzl",  "turdsandwitch",  "HolliePocket",  "iampoorandmycatishuge", "utopiaa", "Rezol");

favs = favs.map(function(value) {
    return value.toLowerCase();
}).sort();

console.log(favs);
function sleep(millis, callback){
    setTimeout(function(){
        callback();
    }, millis);
}

function nameInFavs(n) {
    n = n.toLowerCase();
    if(favs.indexOf(n) != -1) {
        return true;
    }

    return false;
}

// style entire(visible) tree
function styleFriends() {
    $("a[href*='/user']").each(function(){
        if( nameInFavs($(this).text()) ) {
            console.log( $(this).text() );

            var $parent = $(this).parent().parent();
            var $username = $(this);

            $parent
                .css("font-family", "calibri")
                .css("color", "#85BF25")
                .css("font-size", "170%");

            $username.css("color", "#a0fcfc")
                .css("color", "orange")
                .css("font-size", "150%");
        }
    });
}

function makeExpanderCallback() {
    //clicking divs, or 'expand all' , trigger parsing.
    $("a.expand").on("click", styleFriends);
    $(".usertext.textbox").on("click", styleFriends);

}

function insertGui() {

}

function styleOnlyChildren(root) {
    //todo: don't reparse whole tree, unless 'epand all is clicked'
    // Otherwise, only do it on this, and lower
    logger.log("styling children of " + root.text());
}
$(document).ready(function(){
    sleep(250, styleFriends);
    $("#expand-comments").on("click", styleFriends);

    // need delay, since `+` doesn't exist at document.ready.
    sleep(2250, makeExpanderCallback);

    if(use_gui) {
        insertGui();
    }
});