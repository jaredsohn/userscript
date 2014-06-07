// ==UserScript==
// @name        lol
// @namespace   berichten anders
// @description smilies voor forum grepolis
// @include     http://*.grepolis.com/game*
// @include     http://*.grepolis.com/forum*
// @include     http://*.grepolis.*/start/redirect*
// @version     1
// @icon        http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/bat.gif
// @grant       none
// ==/UserScript==

var worldID=/:\/\/([^./]+)/.exec(window.location.href)[1];
var langID = worldID.substr(0,2);
var URLs;
var i=0;
var currentLocation =  document.location.href;

if (currentLocation.indexOf('http://'+langID+'.grepolis.com/start/redirect?url=h')!=-1)
{
i=1;
var newLocation = currentLocation.replace('http://'+langID+'.grepolis.com/start/redirect?url=h','h');
newLocation = unescape(newLocation);
document.location.href = newLocation;
};
$(document).ajaxComplete(function (e, xhr, opt) {
	var url = opt.url.split("?");
	var action = url[0].substr(5) + "/" + url[1].split(/&/)[1].substr(7);
    switch (action) {
        case "/alliance_forum/forum": case "/message/new": case "/message/forward": case "/message/view": case "/player_memo/load_memo_content":{addSmileyBox(action);};
    }	
});
var smileyArray =  { "smilies": {}, "goden": {}, "troepen": {}, "steden": {}, "andere":{} };

// Smileys: Smilies
smileyArray.smilies = [ 
    "Emotions%202.0/anger", "Emotions%202.0/cool", "Emotions%202.0/cry", "Emotions%202.0/fire", "Emotions%202.0/grimace", "Emotions%202.0/love", "Emotions%202.0/miao", "Emotions%202.0/prettiness", "Emotions%202.0/question", "Emotions%202.0/shout", "Emotions%202.0/slobber", "Emotions%202.0/sweat", "Emotions%202.0/vomit", "Emotions%202.0/startle", "Emotions%202.0/spook", "Emotions%202.0/surprise", "Emotions%202.0/thirst", "Emotions%202.0/smile", "Emotions%202.0/burn",
	"Aqua%20Smiles/Ate%20someting%20bad", "Aqua%20Smiles/Feel%20sick", "Aqua%20Smiles/To%20sulk", "Aqua%20Smiles/To%20sulk", "Aqua%20Smiles/Dead", "Aqua%20Smiles/He%20he", "Aqua%20Smiles/You%20like%20my%20teeths", "Aqua%20Smiles/Happy", "Aqua%20Smiles/Sad"
];
// Smileys: Goden
smileyArray.goden = [
    "s/9/9b/Zeus_mini.png", "s/9/9f/Zeus1.png", "s/0/06/Zeus2.png", "s/1/1f/Zeus3.png", "s/0/08/Zeus4.png", "s/c/c6/Minotaurus_90x90.jpg", "s/6/61/Manticore_90x90.jpg",
	"s/4/44/Poseidon_mini.png", "s/5/51/Poseidon1.png", "s/1/15/Poseidon2.png", "s/9/94/Poseidon3.png", "s/9/94/Poseidon4.png", "s/8/88/Cycloop_90x90.jpg", "s/0/02/Hydra_90x90.jpg",
	"s/a/a1/Hera_mini.png", "s/c/c7/Hera1.png", "s/3/3d/Hera2.png", "s/4/40/Hera3.png", "s/0/09/Hera4.png", "s/b/b0/Harpie_90x90.jpg", "s/0/0f/Medusa_90x90.jpg",
	"s/d/d8/Athene_mini.png", "s/c/c9/Athene1.png", "s/e/e2/Athene2.png", "s/c/c1/Athene3.png", "s/9/9c/Athene4.png", "s/6/6e/Centaur_90x90.jpg", "s/3/3d/Pegasus_90x90.jpg",
	"s/6/64/Hades.png", "s/d/d4/Hades1_gd.png", "s/2/22/Hades_gd.png", "s/4/4c/Hades3_gd.png", "s/2/24/Onzichtbaar.png", "s/d/d2/Cerberus_90x90.jpg", "s/9/99/Erinys_90x90.jpg",
	"s/1/19/Artemis_mini.png", "s/4/48/Artemis_gd.png", "s/6/65/Artemis2_gd.png", "s/2/22/Artemis3_gd.png", "s/b/b7/Artemis4_gd.png", "s/4/4e/Griffioen_90x90.jpg", "s/0/05/Calydonisch_Zwijn_90x90.jpg"
];
// Smileys: Troepen
smileyArray.troepen = [
    "/a/a8/Militie", "/c/cd/Zwaardvechter",  "/e/e9/Slingeraar", "/d/d9/Boogschutter", "/c/c1/Hopliet",  "/f/f2/Ruiter", "/1/15/Strijdwagen", "/5/56/Katapult",
    "/c/c9/Transportboot", "/8/88/Bireem", "/e/ed/Vuurschip",  "/8/86/Brander",  "/1/19/Snelle_transportboot", "/8/87/Trireem", "/7/78/Kolonisatieschip", "s/e/e8/Godsgezant_90x90.jpg"
];
// Smileys: Steden
smileyArray.steden = [ 
    "img27.imageshack.us/img27/8104/y876", "img542.imageshack.us/img542/7963/2v7m", "img854.imageshack.us/img854/6526/j0v1", "img202.imageshack.us/img202/2892/ggai", "img545.imageshack.us/img545/6201/6857", "img822.imageshack.us/img822/7889/081e",
	"img19.imageshack.us/img19/9734/r2un", "img822.imageshack.us/img822/4622/sbrr", "img7.imageshack.us/img7/2913/htz5", "img35.imageshack.us/img35/9414/gs7z", "img7.imageshack.us/img7/6467/yvxw", "img844.imageshack.us/img844/4674/d0u9", "img690.imageshack.us/img690/3489/sfho"
];
// Smileys: Andere
smileyArray.andere = [ 
    "s/d/d1/Hout.png", "s/d/db/Steen.png", "s/d/dc/Zilver.png", "s/f/fd/Bevolking.png", "s/f/fc/Gunst.png", "smilies/onderzoek", "smilies/verdediging", "smilies/aanval", 
	"s/e/e5/Oprichter_alliantie.png", "s/0/09/Leider_alliantie.png", "s/b/b7/Recruter.png", "s/a/a5/Diplomatie_alliantie.png", "s/7/72/Forummod_alliantie.png", "s/6/6d/Rondschrijven_alliantie.png", "s/0/00/Intern_alliantie.png",  "s/e/e3/ReservatieTool.png",
    "s/a/ac/Actief.png", "s/7/77/Inactief_dagen.png", "s/9/98/Inactief_week.png", "s/2/2f/Vakantie_modes.png",  "smilies/bol_bruin", "smilies/bol_groen", "smilies/bol_paar", "smilies/bol_blauw", "smilies/bol_roos",  "forum_stats", "s/a/ac/Tijdsduur.png", "s/4/46/Toolbox.png", "s/2/22/OtList.png" ,"s/b/b5/OtAttack.png", "s/3/3a/OtForum.png",
	"s/a/a2/Piramides_icon.png", "s/f/f9/Vuurtoren_icon.png", "s/3/39/Kolos_icon.png", "s/2/23/Tuinen_icon.png", "s/a/a8/TempelArtemis_icon.png", "s/6/66/Mausoleum_icon.png", "s/e/e5/Overwinnaar.png"
];

for(var e in smileyArray){
    if(smileyArray.hasOwnProperty(e)) {
		for(var f in smileyArray[e]) {
                if(smileyArray[e][f].substring(0,1) == "/" ) {
                    smileyArray[e][f] = "http://wiki.nl.grepolis.com/images" + smileyArray[e][f] + "_40x40.png";
                }else if(smileyArray[e][f].substring(0,2) == "s/" ) {
                    smileyArray[e][f] = "http://wiki.nl.grepolis.com/image" + smileyArray[e][f] + "";
				 }else if(smileyArray[e][f].substring(0,2) == "sm" ) {
				    smileyArray[e][f] = "http://forum.nl.grepolis.com/images/" + smileyArray[e][f] + ".png";
				 }else if(smileyArray[e][f].substring(0,5) == "forum" ) {
                    smileyArray[e][f] = "http://forum.nl.grepolis.com/grepolis/statusicon/" + smileyArray[e][f] + ".png";
				 }else if(smileyArray[e][f].substring(0,3) == "img" ) {
                    smileyArray[e][f] = "http://" + smileyArray[e][f] + ".png";					
                }else {
                    smileyArray[e][f] = "http://www.veryicon.com/icon/32/Emoticon/" + smileyArray[e][f] + ".png";//http://www.veryicon.com/icon/32/Emoticon/Emotions%202.0/cool.png
                }
            }
        }
	}

var id = 0;
function addSmiley(type, textareaId, bbcodeBarId){
    if($(bbcodeBarId + " .smiley_box_cont").get(0)) {$(bbcodeBarId + " .smiley_box_cont").get(0).innerHTML='';}
    for(var e in smileyArray[type]){
        if(smileyArray[type].hasOwnProperty(e)) {
            $("<img id='smiley"+id+"' src=" + smileyArray[type][e] + " style='margin:3px;max-height:35px;'>").appendTo(bbcodeBarId + " .smiley_box_cont");
            $("#smiley"+id).css('cursor','pointer');
            $("#smiley"+id).click(function(){
            $(bbcodeBarId + " .smiley_button").get(0).click();
                var textarea = $(textareaId).get(0);
                var text = $(textarea).val();
                $(textarea).val(text.substring(0, $(textarea).get(0).selectionStart) + "[img]"+ $(this).get(0).src + "[/img]" + text.substring($(textarea).get(0).selectionEnd));
            });
            id++;
        }
    }
}

function addSmileyBox(e){
        var textareaId = "", bbcodeBarId = "";
        
        switch (e) {
            case "/alliance_forum/forum": 
                textareaId = "#forum_post_textarea";
                bbcodeBarId = "#forum";
                break;
            case "/message/forward":
                textareaId = "#message_message";
                bbcodeBarId = "#message_bbcodes";
                break;
            case "/message/new":
                textareaId = "#message_new_message";
                bbcodeBarId = "#message_bbcodes";
                break;
            case "/message/view":
                textareaId = "#message_reply_message";
                bbcodeBarId = "#message_bbcodes";
                break;
            case "/player_memo/load_memo_content":
                textareaId = "#memo_text_area";
                bbcodeBarId = "#memo_edit";
                break;   
        }
        if($(bbcodeBarId + ' #emots_popup_7').get(0) || $(bbcodeBarId + ' #emots_popup_15').get(0)){
            $(bbcodeBarId + " .bb_button_wrapper").get(0).lastChild.style.display = "none";
        }
        $('<img class="smiley_button" src="http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/bat.gif">').appendTo(bbcodeBarId + ' .bb_button_wrapper').mousePopup(new unsafeWindow.MousePopup("Emoticons"));
        $('<div class="smiley_box">\
            <div class="bbcode_box middle_center"><div class="bbcode_box middle_right"></div><div class="bbcode_box middle_left"></div>\
            <div class="bbcode_box top_left"></div><div class="bbcode_box top_right"></div><div class="bbcode_box top_center"></div>\
            <div class="bbcode_box bottom_center"></div><div class="bbcode_box bottom_right"></div><div class="bbcode_box bottom_left"></div>\
            <div align="center" style="width:100%;">\
            <a class="group" name="smilies" href="">Smilies </a>\
            <a class="group" name="troepen" href=""> Troepen </a>\
            <a class="group" name="goden" href=""> Goden </a>\
            <a class="group" name="steden" href=""> Steden </a>\
            <a class="group" name="andere" href=""> Andere </a>\
            </div>\
            <hr class="smiley_hr">\
            <div class="smiley_box_cont"style="height:130px;overflow-y:scroll;"></div>\
			<hr class="smiley_hr">\
		</div>').appendTo(bbcodeBarId + ' .bb_button_wrapper');
        
        $('.smiley_button').css({
            cursor: 'pointer',
            marginTop:'3px'
        });
        $('.smiley_box').css({
            zIndex: '5000', 
            position: 'absolute', 
            top: '30px', 
            left: '440px',             
			width: '320px',
            display: 'none'
        });	
        $('.smiley_link').css({
            color: '#160347',
            fontSize: '0.6em'
        });
        $('.smiley_hr').css({
            margin:	'3px 0px 0px 0px',
            color: '#2d0a89',
            border:	'1px solid'
        });
        
        $(bbcodeBarId + ' .group').css({
            color: '#2d0a89'
        });
        $(bbcodeBarId + ' .group[name="smilies"]').css({
            color: '#160347'
        });
        $(bbcodeBarId + ' .group').click(function(){
            $('.group').each(function(){
                $(this).get(0).style.color = '#160347'; 
            });
            $(this).get(0).style.color = '#510b83';
            addSmiley($(this).get(0).name, textareaId, bbcodeBarId);
        });
        addSmiley("smilies", textareaId, bbcodeBarId);
        $(bbcodeBarId + " .smiley_button").toggle(
    function(){
    $(bbcodeBarId + " .smiley_box").get(0).style.display = "block";   
        }, 
		function(){
		$(bbcodeBarId + " .smiley_box").get(0).style.display = "none";  
        }
    );
};