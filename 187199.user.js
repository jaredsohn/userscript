// ==UserScript==
// @name        Castle Age Random Gift Sender
// @namespace   CARGS
// @description Randomly send gifts to army members
// @include     https://web3.castleagegame.com/castle_ws/*
// @require     http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version     0.2
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// ==/UserScript==

var CAid = [], CAname = [], text;
var display = false;
var keepGoing= true;
var this_url_temp = window.location.href;
var this_url = "https://web3.castleagegame.com/castle_ws/";
var ca_panel_ = "#app_body_container";


function findPage(){
    $.get('https://web3.castleagegame.com/castle_ws/army_members_gift_popup.php?giftSelection=2052', function(data,status){
        text = data;
        CAid = [];
        CAname = [];
        fillMembers();
    });
}

function fillMembers(){
    if(text.indexOf("popup_member=")!=-1){
        var tex = text.substring(text.indexOf("popup_member=") + 13);//before CA id
        var cID = tex.substring(0,tex.indexOf("'")); //CA id
        CAid.push(cID);
        var t = tex.substring(tex.indexOf("=" + cID + "\">") + cID.length + 3);//before CA name
        var cName = t.substring(0,t.indexOf("</label>"));//CA name
        CAname.push(cName); 
        text = t;
        fillMembers();
    }
    else {
        for(var i = 0; i < CAid.length; i++){
            var num = Math.floor((Math.random()*CAid.length)+1);
            var tempName = CAname[num];
            CAname[num] = CAname[i];
            CAname[i] = tempName;
            
            var tempID = CAid[num];
            CAid[num] = CAid[i];
            CAid[i] = tempID;
        }
        showit();
    }
}


function showit() {
    var ca_gift = get_sub_panel('ca_gift'),
        selectGift = $("<select></select>"),
        inputID    = $("<input type=\"number\" id=\"userFreq\" min=\"1\" max=\"20\" step=\"1\" value=\"1\" size=\"2\" maxlength=\"2\">"),
        buttonSub  = $("<button>Send</button>"),
        gifts      = [
					'Alperon Gift!',
					'Corrupted Gift!',
					'Magamapede Gift!',
					'Darkness Gift!',
					'Mystery Slime Gift!',
					'Soulstone Gift!',
					'Legacy Meph Gift!',
					'Legacy Malekus Gift!',
					'Limited Lione Set!',
					'Limited Garlan Relic!',
					'Mystery Artifact!',
					'Dragon Scroll Gift!',
					'Dragon Statue Gift!',
					'Mystery Beast Gift!',
					'Mystery Air Gift!',
					'Mystery Lava Gift!',
					'Mystery Crest Piece!',
					'Volcanic Egg!',
					'Mystery Ice Artifact!',
					'Mystery Earth!',
					'Mystery Shield Gift!',
					'Mystery Amulet!',
					'Mystery Symbol Gift!',
					'Mystery Staff Gift!',
					'Mystery Item!',
					'Mystery Tome!',
					'Mystery Relic!',
					'Mystery Robe Gift!',
					'Mystery Gift!',
					'Limited Cid Gift!',
					'Mystery Faerie Gift!',
					'Mystery Shield Gift!',
					'Mystery Blade Gift!',
					'Bloodblade Shard!',
					'Mystery Life Gift!',
					'Great Fiery Gift!',
					'Mystery Shadow Gift!',
					'Mystery Heirloom!',
					'Serpent Egg!',
					'Mystical Dagger Gift!',
					'Mystery Locket Gift!',
					'Mystery Relic!',
					'Mystery Axe Gift!',
					'Mystery Shield Gift!',
					'Mystery Plate Gift!',
					'Dragon Egg!',
					'Cid Saber Shard!',
					'Mystery Dagger Gift!',
					'Crimson Dagger Gift!',
					'Mystery Light Relic!',
					'Limited Dragan Gift!',
					'Mystery Cloak Gift!',
 		             ],
 		giftID     = [
 					'2052',
					'2051',
					'2050',
					'2049',
					'2048',
					'2047',
					'2046',
					'2045',
					'2044',
					'2043',
					'2042',
					'2041',
					'2040',
					'2039',
					'2038',
					'2037',
					'2036',
					'2035',
					'2034',
					'2033',
					'2032',
					'2031',
					'2030',
					'2029',
					'2028',
					'2027',
					'2026',
					'2025',
					'2024',
					'2023',
					'2022',
					'2021',
					'2020',
					'2019',
					'2018',
					'2017',
					'2016',
					'2015',
					'2014',
					'2013',
					'2012',
					'2011',
					'2010',
					'2009',
					'2008',
					'2007',
					'2006',
					'2005',
					'2004',
					'2003',
					'2002',
					'2001',
 		             ];

    $.each(gifts, function(idx) {
        selectGift.append("<option value='" + giftID[idx] + "'>" + this + "</option");
    });

    buttonSub.click(function() {
        var freqs = parseInt(document.getElementById("userFreq").value);
        if(freqs>0 && freqs<21){
            var linkFront = "https://web3.castleagegame.com/castle_ws/gift.php?";
            var names = "You sent gifts to:\n ";
            linkFront += "selected_army%5B%5D=" + CAid[0];
            names += CAname[0] + "\n ";
            for(var i = 1; i < freqs; i++){
                linkFront += "&selected_army%5B%5D=" + CAid[i];
                names += CAname[i] + "\n ";  
            }
            linkFront += "&action=send_non_facebook_gift&giftSelection="+$(":selected", selectGift).attr("value");
            display = true;
            ca_gift.html("Gathering friends and gifts..");
            sendit(linkFront,names);
            
        } else{
            alert("Send 1 to 20 random friends");
        }  
        
    });

    ca_gift.html("Choose the gift to send:<br/>");
    ca_gift.append(selectGift, inputID, buttonSub);

}

function sendit(link,name){
    $.post(link, function(data,status){
        if(/You have sent gifts/.test(data)) {
            if(display)
                get_sub_panel('ca_gift').text("You sent gifts.");
            alert(name);
            remove_sub_panel('ca_gift');
        }
        else{
            alert("Sending gifts error");
            remove_sub_panel('ca_gift');
        }
    });
}

//Create Panel
function get_panel() {
    var ca_panel = $("#ca_gift_panel");
    if(!ca_panel.size()) {
        ca_panel = $("<div id='ca_gift_panel'></div>").css({
            position : 'fixed',
            top      : '25px',
            left     : '5px',
            padding  : '5px',
            border   : 'solid 1px black',
            background : 'white'
        });
        ca_panel.appendTo(ca_panel_);
    }
    return ca_panel;
}

//Remove Panel
function remove_panel() {
    var ca_panel = get_panel();
    if(!ca_panel.children().size())
        ca_panel.remove();
}

//Create inner Panel
function get_sub_panel(id) {
    var ca_sub_panel = $("#" + id);
    if(!ca_sub_panel.size()) {
        ca_sub_panel = $("<div id='"+id+"'>Loading....</div>").css({
            height   : '60px',
            width    : '420px',
            padding  : '5px',
            border   : 'solid 1px black',
            background : 'white'
        });
        get_panel().append(ca_sub_panel);
    }
    return ca_sub_panel;
}

//Remove Inner Panel
function remove_sub_panel(id) {
    var ca_sub_panel = get_sub_panel(id);
    ca_sub_panel.remove();
    remove_panel();
}


GM_registerMenuCommand('Send Gift Randomly', findPage);
GM_registerMenuCommand('CARGS - Check for update', update_Check );

//Updation of script
function checkUpdate( num, currentVersion ) {
    GM_xmlhttpRequest({
        method : 'GET',
        url    : 'http://userscripts.org/scripts/source/' + num + '.meta.js',
        onload : function( response ) {
            var remoteVersion = response.responseText.match(/^\/\/\s\@version\s+(\d+\.\d+)/m)[1];
            if( currentVersion < remoteVersion ) {
                if( confirm( 'There is a newer version available.' + '\nClick OK to update' ) ) {
                    setTimeout( function() { unsafeWindow.location.href = 'http://userscripts.org/scripts/source/' + num + '.user.js'; }, 3000 );
                }
            }
            else {
                alert('No Updates for CARGS');
            }
    }
    });
}


function update_Check() {
    checkUpdate(187199, GM_info.script.version);
}