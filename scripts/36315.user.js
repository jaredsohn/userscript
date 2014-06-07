// ==UserScript==
// @name           OnionPlurk
// @namespace      neofreko.com
// @include        http://www.plurk.com/user/*
// @include        http://www.plurk.com/p/*
// ==/UserScript==


/*
http://alexking.org/blog/2003/06/02/inserting-at-the-cursor-using-javascript
*/
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

var putOnionFunc = function() {
    GM_log('put me onion!' + this.src);
    var plurkTextBox = document.evaluate('//*[@id="input_big"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    insertAtCursor(plurkTextBox.snapshotItem(0), this.src);
}

var goOnion = function () {
    GM_log('looking up emoButtonPlaceHolder');
    // create own table, insert button after the original smilies
    var emoButtonPlaceHolder = document.evaluate('/html/body/div[3]/div/form/div[2]/table/tbody/tr/td[3]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    
    if (emoButtonPlaceHolder.snapshotLength == 0) {
        GM_log('No onion for you since I can;t foudn the placeholder');
    }
    
    GM_log('creating onion button');
    var onionButton = document.createElement('img');
    onionButton.setAttribute('class', 'emoticon_selecter_img');
    onionButton.setAttribute('src', 'http://www.rendymaulana.com/onion/th_--1.gif');
    
    GM_log('attaching onclick event');
    // attach on-click handler
    onionButtonOnClick = function() {
        GM_log('gimme my onion!' + onionTable.style.visibility);
        if (onionTable.style.visibility == 'hidden')
            onionTable.style.visibility = 'visible';
        else
            onionTable.style.visibility = 'hidden';
        GM_log('here is your onion: ' + onionTable.style.visibility);
    }
    onionButton.addEventListener("click", onionButtonOnClick, false);
    
    
    var onionSmileys = [
"th_--1.gif",
"th_--2.gif",
"th_--3.gif",
"th_-.gif",
"th_-55.gif",
"th_-66.gif",
"th_-M.gif",
"th_-byebye.gif",
"th_-oh.gif",
"th_-sorry.gif",
"th_001_.gif",
"th_002_.gif",
"th_003_.gif",
"th_004_.gif",
"th_005_.gif",
"th_006_.gif",
"th_007_.gif",
"th_008_.gif",
"th_009_.gif",
"th_010_.gif",
"th_011_.gif",
"th_012_a.gif",
"th_012_b.gif",
"th_013_a.gif",
"th_013_b.gif",
"th_014_.gif",
"th_015_orz.gif",
"th_016_.gif",
"th_017_.gif",
"th_018_.gif",
"th_019_.gif",
"th_020_bingo.gif",
"th_021_.gif",
"th_022_a.gif",
"th_022_b.gif",
"th_023_.gif",
"th_024_.gif",
"th_025_.gif",
"th_026_.gif",
"th_027_.gif",
"th_028_.gif",
"th_029_.gif",
"th_030_.gif",
"th_031_.gif",
"th_032_.gif",
"th_033_.gif",
"th_034_.gif",
"th_035_.gif",
"th_036_omg.gif",
"th_037_.gif",
"th_038_jolin.gif",
"th_039_.gif",
"th_040_.gif",
"th_041_.gif",
"th_042_.gif",
"th_043_.gif",
"th_044_.gif",
"th_045_.gif",
"th_046_.gif",
"th_047_.gif",
"th_048_.gif",
"th_049_.gif",
"th_04a30356-1.gif",
"th_04a30356.gif",
"th_050_.gif",
"th_051_.gif",
"th_052_.gif",
"th_053_XD.gif",
"th_054_.gif",
"th_055_.gif",
"th_056_.gif",
"th_057_.gif",
"th_058_.gif",
"th_059_.gif",
"th_060_.gif",
"th_061_.gif",
"th_062_.gif",
"th_063_.gif",
"th_064_.gif",
"th_065_.gif",
"th_066_Hi.gif",
"th_067_.gif",
"th_068_.gif",
"th_069_.gif",
"th_070_goodjob.gif",
"th_071_.gif",
"th_072_.gif",
"th_073_.gif",
"th_074_.gif",
"th_075_.gif",
"th_076_.gif",
"th_077_.gif",
"th_078_.gif",
"th_079_.gif",
"th_080_.gif",
"th_081_.gif",
"th_082_-1.gif",
"th_082_.gif",
"th_083_.gif",
"th_084_.gif",
"th_085_.gif",
"th_086_.gif",
"th_086_64color.gif",
"th_087_.gif",
"th_088_.gif",
"th_089_01.gif",
"th_089_02.gif",
"th_090_.gif",
"th_091_-1.gif",
"th_091_-2.gif",
"th_091_-3.gif",
"th_091_.gif",
"th_091_QQ.gif",
"th_092_.gif",
"th_093.gif",
"th_094.gif",
"th_094_01.gif",
"th_094_02.gif",
"th_094_04.gif",
"th_095_.gif",
"th_096_K.gif",
"th_097_01.gif",
"th_097_02.gif",
"th_097_03.gif",
"th_097_04.gif",
"th_098_.gif",
"th_099_.gif",
"th_0fca5bf1.gif",
"th_100_.gif",
"th_101_.gif",
"th_102_.gif",
"th_103_.gif",
"th_104_.gif",
"th_47_72879_5dd664294d59b53.gif",
"th_47_72879_68456d7e65be728.gif",
"th_47_72879_c24e31b3d853853.gif",
"th_47_72879_c702e4e2080edf1.gif",
"th_47_80838_324da2cd10ebbf5.gif",
"th_4d040fb7-1.gif",
"th_4d040fb7.gif",
"th_4d20a135.gif",
"th_618c0a3d-1.jpg",
"th_62.gif",
"th_63307.gif",
"th_682353.gif",
"th_7c00a009.gif",
"th_81c98291.gif",
"th_84e7fc51.gif",
"th_91869fa3-1.gif",
"th_91869fa3.gif",
"th_983c6e40.gif",
"th_9ebd997e.gif",
"th_A066.gif",
"th_A071.gif",
"th_GoodJob.gif",
"th_IMGhttpi239photobucketcomalbumsff31.gif",
"th_XD.gif",
"th__1625.gif",
"th_a02dd9bd.gif",
"th_a2179c6d.gif",
"th_a2510c3f.gif",
"th_aac6cae1.gif",
"th_bye_YFxaTPWNGU2f_dZxjVnZpnBc3.gif",
"th_c54866bf.gif",
"th_d0bddca5.gif",
"th_d4e4b46b.gif",
"th_df4a652f.gif",
"th_e0765523.gif",
"th_e1d2495b.gif",
"th_e3c031b9.gif",
"th_e40b6771.gif",
"th_fe0db98b.gif",
"th_icon002.gif",
"th_icon004.gif",
"th_icon006.gif",
"th_jolin.gif",
"th_untitled.jpg",
"th_untitled3.jpg",
"th_untitled4.jpg"
    ];
    
    var onionTable = document.createElement('table');
    onionTable.style.visibility = 'hidden';
    onionTable.style.position = 'absolute';
    onionTable.style.top = '514px';
    onionTable.style.left = '489px';
    onionTable.style.zIndex = 200;
    //visibility: visible; top: 514px; left: 789px;
    
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        if (i % 10 == 0) {
            var tr = document.createElement('tr');
            onionTable.appendChild(tr);
        }
        
        td = document.createElement('td');
        img = document.createElement('img');
        img.setAttribute('src', 'http://www.rendymaulana.com/onion/' + onionSmileys[i]);
        img.style.width = '40px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
        td.appendChild(img);
        tr.appendChild(td);
        i++;
    }
    
    GM_log('append onionTable');
    //put table on place
    document.body.appendChild(onionTable);
    
    GM_log('append the button');
    // put button on place
    emoButtonPlaceHolder.snapshotItem(0).appendChild(onionButton);
}

//let's defer goOnion until the node we required is ready

var ICanHazOnion = function () {
    GM_log('I can haz onion?');
    var smileyTable = document.evaluate('//*[@id="emoticon_selecter"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    if (smileyTable.snapshotLength > 0) {
        GM_log('Yes, you can haz onions');
        goOnion();
    } else
        GM_log('No, you can haz any onion');
}

// add menu item to mnually enable onionButton
GM_registerMenuCommand('I can haz Onion please?', goOnion);

setTimeout(ICanHazOnion, 10000);