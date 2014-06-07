// ==UserScript==
// @name        Wanikani Self-Study
// @namespace   wkselfstudy
// @description Adds an option to add and review your own custom vocabulary
// @include     https://www.wanikani.com
// @include     https://www.wanikani.com/dashboard*
// @include     https://www.wanikani.com/community*
// @version     1.1.5
// @author      shudouken
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://raw.github.com/WaniKani/WanaKana/master/lib/wanakana.min.js
// @grant       GM_addStyle
// @downloadURL https://userscripts.org/scripts/source/381435.user.js
// @updateURL   https://userscripts.org/scripts/source/381435.meta.js
// ==/UserScript==

/*
 *  This script is licensed under the Creative Commons License
 *  "Attribution-NonCommercial 3.0 Unported"
 *  
 *  More information at:
 *  http://creativecommons.org/licenses/by-nc/3.0/
 */


/*
 *  Debugging
 */
var debugging = false;

scriptLog = debugging ? function (msg) {
    if (typeof msg === 'string') {
        unsafeWindow.console.log("WKSS: " + msg);
    }
    else {
        unsafeWindow.console.log(msg);
    }
} : function () {
};

/*
 *  Settings and constants
 */

///###############################################
// Config for window sizes in pixels

// add Window, standard 300 x 300
var addWindowHeight = 300;
var addWindowWidth = 300;

// export and import Window, standard 275 x 390
var exportImportWindowHeight = 275;
var exportImportWindowWidth = 390;

// edit Window, standard 380 x 800
var editWindowHeight = 380;
var editWindowWidth = 800;

// study(review) Window, standard 380 x 600
var studyWindowHeight = 380;
var studyWindowWidth = 600;

// result Window, standard 500 x 700
var resultWindowHeight = 500;
var resultWindowWidth = 700;

// padding from top, standard -150
var padding = -150;

///###############################################

var errorAllowance = 4; //every x letters, you can make one mistake when entering the meaning
var reviewlimit = 0; //limit your reviews to x items, 0 or negative number means unlimited
var mstohour = 3600000;

//srs 4h, 8h, 24h, 3d (guru), 1w, 2w (master), 1m (enlightened), 4m (burned)
var srslevels = [];
srslevels.push("Apprentice");
srslevels.push("Apprentice");
srslevels.push("Apprentice");
srslevels.push("Apprentice");
srslevels.push("Guru");
srslevels.push("Guru");
srslevels.push("Master");
srslevels.push("Enlightened");
srslevels.push("Burned");

var srsintervals = [];
srsintervals.push(0);
srsintervals.push(14400000);
srsintervals.push(28800000);
srsintervals.push(86400000);
srsintervals.push(259200000);
srsintervals.push(604800000);
srsintervals.push(1209600000);
srsintervals.push(2628000000);
srsintervals.push(10512000000);

/*
 *  JQuery fixes
 */
$("'[placeholder]'").focus(function () {
    var input = $(this);
    if (input.val() == input.attr("'placeholder'")) {
        input.val("''");
        input.removeClass("'placeholder'");
    }
}).blur(function () {
        var input = $(this);
        if (input.val() == "''" || input.val() == input.attr("'placeholder'")) {
            input.addClass("'placeholder'");
            input.val(input.attr("'placeholder'"));
        }
    }).blur();

$("'[placeholder]'").parents("'form'").submit(function () {
    $(this).find("'[placeholder]'").each(function () {
        var input = $(this);
        if (input.val() == input.attr("'placeholder'")) {
            input.val("''");
        }
    })
});

/*
 *  Auto Scroll Popup-Dialogs
 */
$(function () {

    var $sidebar = $(".WKSS"),
        $window = $(window),
        offset = $sidebar.offset(),
        topPadding = padding;

    $window.scroll(function () {
        if ($window.scrollTop() > offset.top) {
            $sidebar.stop().animate({
                marginTop: $window.scrollTop() - offset.top + topPadding
            });
        } else {
            $sidebar.stop().animate({
                marginTop: padding
            });
        }
    });

});

/*
 *  Add Item
 */
unsafeWindow.WKSS_add = function () {
    $("#add").show();
    //hide other windows
    $("#export").hide();
    $("#import").hide();
    $("#edit").hide();
    $("#selfstudy").hide();
}

$("body").append('                                                          \
    <div id="add" class="WKSS">                                               \
    <form id="addForm">                                                                    \
    <h1>Add a new Item</h1>                                                \
        <input type="text" id="addKanji" size="40" placeholder="Enter 漢字, ひらがな or カタカナ">                           \
        <input type="text" id="addReading" title="Leave empty to add vocabulary like する (to do)" placeholder="Enter reading">\
        <input type="text" id="addMeaning" placeholder="Enter meaning">\
         \
        <p id="addStatus">Ready to add..</p>                                        \
        <button id="AddItemBtn" type="button">Add new Item</button>  \
        <button id="AddCloseBtn" type="button">Close window</button>         \
    </form>                                                                   \
    </div>                                                                    \
');
$("#add").hide();

$("#AddItemBtn").click(function () {
    var kanji = $("#addKanji").val().toLowerCase();
    var reading = $("#addReading").val().toLowerCase().split(/[,、]+\s*/); //split at , or 、followed by 0 or any number of spaces
    var meaning = $("#addMeaning").val().toLowerCase().split(/[,、]+\s*/);
    var success = 0;
    var item = {};
    
    var meanlen = 0;
    for(var i = 0; i < meaning.length; i++) {
        meanlen += meaning[i].length;
    }
    
    if (kanji.length == 0 || meanlen == 0) {
        $("#addStatus").text("One or more required fields are empty!");
        if (kanji.length == 0) {
            $("#addKanji").addClass("error");
        }
        else {
            $("#addKanji").removeClass("error");
        }
        if (meanlen == 0) {
            $("#addMeaning").addClass("error");
        }
        else {
            $("#addMeaning").removeClass("error");
        }
    }
    else if (reading.length == 0) {
        $("#addStatus").text("Added without reading");

        item.kanji = kanji;
        item.reading = ""; //dummy reading
        item.meaning = meaning;

        success = 1;
    }
    else {

        item.kanji = kanji;
        item.reading = reading;
        item.meaning = meaning;

        success = 1;
    }

    if (success == 1) {
        $("#addKanji").removeClass("error");
        $("#addMeaning").removeClass("error");

        //if there are already user items, append to list and save, else make the list from scratch
        if (localStorage.getItem('User-Vocab')) {
            var list = JSON.parse(localStorage.getItem('User-Vocab'));
            if (! checkForDuplicates(list,item)) {
                list.push(item);
                localStorage.setItem('User-Vocab', JSON.stringify(list));
            }
            else {
                $("#addStatus").text("Duplicate Item detected!");
                $("#addKanji").addClass("error");
                return;
            }
        }
        else {
            var list = [];
            list.push(item);
            localStorage.setItem('User-Vocab', JSON.stringify(list));
        }
        
        var srsitem = {};
        srsitem.kanji = kanji;
        srsitem.level = 0;
        srsitem.date = Date.now();
        
        //same for srslist
        if (localStorage.getItem('User-SRS')) {
            var srslist = JSON.parse(localStorage.getItem('User-SRS'));
            srslist.push(srsitem);
            localStorage.setItem('User-SRS', JSON.stringify(srslist));
        }
        else {
            var srslist = [];
            srslist.push(srsitem);
            localStorage.setItem('User-SRS', JSON.stringify(srslist));
        }
        $("#addForm")[0].reset();
        document.getElementById('user-review').innerHTML = "Review (" + WKSS_getReviewCount() + ")";
        $("#addStatus").text("Added successfully");
    }
});

$("#AddCloseBtn").click(function () {
    $("#add").hide();
    $("#addForm")[0].reset();
    $("#addStatus").text('Ready to add..');
    $("#addKanji").removeClass("error");
    $("#addMeaning").removeClass("error");
});

function checkForDuplicates(list, item) {
    scriptLog("Check for dupes with:" + item.kanji);
    
    for(i = 0; i < list.length; i++) {
        if(list[i].kanji == item.kanji)
            return true;
    }
    
    return false;
}

/*
 *  Edit Items
 */
unsafeWindow.WKSS_edit = function () {
    generateEditOptions();
    $("#edit").show();
    //hide other windows
    $("#export").hide();
    $("#import").hide();
    $("#add").hide();
    $("#selfstudy").hide();
}

$("body").append('                                                          \
    <div id="edit" class="WKSS">                                               \
    <form id="editForm">                                                                    \
    <h1>Edit your Vocab</h1>                                                \
        <select id="editWindow" size="8"></select>\
        <input type="text" id="editItem" name="" size="40" placeholder="Select vocab, click edit, change and save!">\
         \
        <p id="editStatus">Ready to edit..</p>\
        <button id="EditEditBtn" type="button">Edit</button>\
        <button id="EditSaveBtn" type="button">Save</button>         \
        <button id="EditDeleteBtn" type="button" title="Delete selected item">Delete</button>         \
        <button id="EditDeleteAllBtn" type="button" title="本当にやるの？">Delete All</button>   \
        <button id="EditResetBtn" type="button" title="再生？">Reset Item</button>   \
        <button id="EditCloseBtn" type="button">Close window</button>         \
    </form>                                                                   \
    </div>                                                                    \
');
$("#edit").hide();

$("#EditEditBtn").click(function () {
    var select = document.getElementById("editWindow");
    var index = select.options[select.selectedIndex].value;

    var list = JSON.parse(localStorage.getItem('User-Vocab'));

    document.getElementById("editItem").value = JSON.stringify(list[index]);
    document.getElementById("editItem").name = index; //using name to save the index
    $("#editStatus").text('Loaded item to edit');
});

$("#EditSaveBtn").click(function () {
    if ($("#editItem").val().length != 0) {
        try {
            var select = document.getElementById("editWindow");
            var index = document.getElementById("editItem").name;
            var item = JSON.parse(document.getElementById("editItem").value.toLowerCase());

            var list = JSON.parse(localStorage.getItem('User-Vocab'));

            if ((!checkItem(item)) || (checkForDuplicates(list,item) && list[index].kanji != item.kanji)) {
                $("#editStatus").text('Invalid item or duplicate!');
                return;
            }
            
            var srslist = JSON.parse(localStorage.getItem('User-SRS'));

            list[index] = item;
            srslist[index].kanji = item.kanji;

            localStorage.setItem('User-Vocab', JSON.stringify(list));
            localStorage.setItem('User-SRS', JSON.stringify(srslist));
            generateEditOptions();
            $("#editStatus").text('Saved changes!');
            document.getElementById("editItem").value = "";
            document.getElementById("editItem").name = "";
        }
        catch (e) {
            $("#editStatus").text(e);
        }
    }
});

$("#EditDeleteBtn").click(function () {
    var select = document.getElementById("editWindow");
    var item = select.options[select.selectedIndex].value;

    var list = JSON.parse(localStorage.getItem('User-Vocab'));
    var srslist = JSON.parse(localStorage.getItem('User-SRS'));

    if (item > -1) {
        list.splice(item, 1);
        srslist.splice(item, 1);
    }
    if (list.length != 0) {
        localStorage.setItem('User-Vocab', JSON.stringify(list));
        localStorage.setItem('User-SRS', JSON.stringify(srslist));
    }
    else {
        localStorage.removeItem('User-Vocab');
        localStorage.removeItem('User-SRS');
    }

    generateEditOptions();
    document.getElementById("editItem").value = "";
    document.getElementById("editItem").name = "";
    document.getElementById('user-review').innerHTML = "Review (" + WKSS_getReviewCount() + ")";
    $("#editStatus").text('Item deleted!');
});

$("#EditDeleteAllBtn").click(function () {
    localStorage.removeItem('User-Vocab');
    localStorage.removeItem('User-SRS');
    generateEditOptions();
    document.getElementById("editItem").value = "";
    document.getElementById("editItem").name = "";
    document.getElementById('user-review').innerHTML = "Review (" + WKSS_getReviewCount() + ")";
    $("#editStatus").text('All items deleted!');
});

$("#EditResetBtn").click(function () {
    var select = document.getElementById("editWindow");
    var item = select.options[select.selectedIndex].value;

    var list = JSON.parse(localStorage.getItem('User-Vocab'));
    var srslist = JSON.parse(localStorage.getItem('User-SRS'));

    if (item > -1) {
        srslist[item].level = 0;
        srslist[item].date = Date.now();
        localStorage.setItem('User-SRS', JSON.stringify(srslist));
    }
    

    generateEditOptions();
    //document.getElementById("editItem").value = "";
    //document.getElementById("editItem").name = "";
    document.getElementById('user-review').innerHTML = "Review (" + WKSS_getReviewCount() + ")";
    $("#editStatus").text('Item resetted!');
});

$("#EditCloseBtn").click(function () {
    $("#edit").hide();
    $("#editForm")[0].reset();
    $("#editStatus").text('Ready to edit..');
});

function generateEditOptions() {
    select = document.getElementById('editWindow');

    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }

    if (localStorage.getItem('User-Vocab')) {

        var list = JSON.parse(localStorage.getItem('User-Vocab'));
        var srslist = JSON.parse(localStorage.getItem('User-SRS'));

        for (var i = 0; i < list.length; i++) {
            var opt = document.createElement('option');
            var dif = Date.now() - srslist[i].date;
            var hour = srsintervals[srslist[i].level];
            var review = "";
            
            if(srslist[i].level == 8) {
                review = "never";
            }
            else if(hour <= dif) {
                review = "now";
            }
            else if (~~((hour-dif)/mstohour)+1 == 1) {
                review = "in ~" + (~~((hour-dif)/(mstohour/60))+1) + "min";
            }
            else {
                var hours = (~~((hour-dif)/mstohour)+1);
                
                if(hours > 24) {
                    var days = ~~(hours/24)+1;
                    
                    if(days > 7) {
                        var weeks = ~~(days/7)+1;
                        
                        if(weeks > 4) {
                            var months = ~~(weeks/4)+1;
                            
                            review = "in ~" + months + "mon";
                        }
                        else {
                            review = "in ~" + weeks + "w";
                        }
                    }
                    else {
                        review = "in ~" + days + "d";
                    }
                    
                }
                else {
                    review = "in ~" + hours + "h";
                }
                
            }
            
            var text = list[i].kanji + " & " + list[i].reading + " & " + list[i].meaning + " (" + srslevels[srslist[i].level] + " - Review: " + review + ")";
            opt.value = i;
            opt.innerHTML = text;
            select.appendChild(opt);
        }
    }

}

/*
 *  Export
 */
unsafeWindow.WKSS_export = function () {
    $("#export").show();
    //hide other windows
    $("#add").hide();
    $("#import").hide();
    $("#edit").hide();
    $("#selfstudy").hide();
}

$("body").append('                                                          \
    <div id="export" class="WKSS">                                               \
    <form id="exportForm">                                                                    \
    <h1>Export Items</h1>                                                \
        <textarea cols="50" rows="18" id="exportArea" placeholder="Export your stuff! Sharing is caring ;)"></textarea>                           \
         \
        <p id="exportStatus">Ready to export..</p>                                        \
        <button id="ExportItemsBtn" type="button">Export Items</button>\
        <button id="ExportSelectAllBtn" type="button">Select All</button>\
        <button id="ExportCloseBtn" type="button">Close window</button>         \
    </form>                                                                   \
    </div>                                                                    \
');
$("#export").hide();


$("#ExportItemsBtn").click(function () {

    if (localStorage.getItem('User-Vocab')) {
        $("#exportForm")[0].reset();
        var list = JSON.parse(localStorage.getItem('User-Vocab'));
        $("#exportArea").text(JSON.stringify(list));
        $("#exportStatus").text("Copy this text and share it with others!");
    }
    else {
        $("#exportStatus").text("Nothing to export yet :(");
    }
});

$("#ExportSelectAllBtn").click(function () {
    if ($("#exportArea").val().length != 0) {
        select_all($("#exportArea"));
        $("#exportStatus").text("Don't forget to CTRL + C!");
    }
});

$("#ExportCloseBtn").click(function () {
    $("#export").hide();
    $("#exportForm")[0].reset();
    $("#exportArea").text("");
    $("#exportStatus").text('Ready to export..');
});

/*
 *  Import
 */
unsafeWindow.WKSS_import = function () {
    $("#import").show();
    //hide other windows
    $("#add").hide();
    $("#export").hide();
    $("#edit").hide();
    $("#selfstudy").hide();
}

$("body").append('                                                          \
    <div id="import" class="WKSS">                                               \
    <form id="importForm">                                                                    \
    <h1>Import Items</h1>                                                \
        <textarea cols="50" rows="18" id="importArea" placeholder="Paste your stuff and hit the import button! Use with caution!"></textarea>                           \
         \
        <p id="importStatus">Ready to import..</p>                                        \
        <button id="ImportItemsBtn" type="button">Import Items</button>\
        <button id="ImportCloseBtn" type="button">Close window</button>         \
    </form>                                                                   \
    </div>                                                                    \
');
$("#import").hide();


$("#ImportItemsBtn").click(function () {

    if ($("#importArea").val().length != 0) {
        try {
            var add = JSON.parse($("#importArea").val().toLowerCase());

            if (!checkAdd(add)) {
                $("#importStatus").text("No valid input (duplicates?)!");
                return;
            }

            if (localStorage.getItem('User-Vocab')) {
                var list = JSON.parse(localStorage.getItem('User-Vocab'));
                var srslist = JSON.parse(localStorage.getItem('User-SRS'));
                var newlist = list.concat(add);
                
                for(var i = 0; i < add.length; i++) {
                    var srsitem = {};
                    srsitem.kanji = add[i].kanji;
                    srsitem.level = 0;
                    srsitem.date = Date.now();
                    srslist.push(srsitem);
                }
                
                localStorage.setItem('User-Vocab', JSON.stringify(newlist));
                localStorage.setItem('User-SRS', JSON.stringify(srslist));
            }
            else {
                localStorage.setItem('User-Vocab', JSON.stringify(add));
                
                var srslist = [];
                
                for(var i = 0; i < add.length; i++) {
                    var srsitem = {};
                    srsitem.kanji = add[i].kanji;
                    srsitem.level = 0;
                    srsitem.date = Date.now();
                    srslist.push(srsitem);
                }
                
                localStorage.setItem('User-SRS', JSON.stringify(srslist));
            }

            $("#importStatus").text("Import successful!");
            document.getElementById('user-review').innerHTML = "Review (" + WKSS_getReviewCount() + ")";
            $("#importForm")[0].reset();
            $("#importArea").text("");

        }
        catch (e) {
            $("#importStatus").text("Parsing Error!");
            scriptLog(e);
        }

    }
    else {
        $("#importStatus").text("Nothing to import :( Please paste your stuff first");
    }
});

$("#ImportCloseBtn").click(function () {
    $("#import").hide();
    $("#importForm")[0].reset();
    $("#importArea").text("");
    $("#importStatus").text('Ready to import..');
});

/*
 *  Review Items
 */
unsafeWindow.WKSS_review = function () {
    if(WKSS_getReviewCount() != "0") {
        sessionStorage.clear();
        generateReviewList();
        $("#selfstudy").show();
        $("#rev-input").focus();
        startReview();
        //hide other windows
        $("#add").hide();
        $("#export").hide();
        $("#edit").hide();
        $("#import").hide();
    }
}

$("body").append('                                                          \
    <div id="selfstudy" class="WKSS">                                               \                                                                 \
       <h1>Review</h1>\
       <div id="wkss-kanji">\
          <span id="rev-kanji"></span>\
       </div><div id="wkss-type">\
          <span id="rev-type"></span><br />\
       </div><div id="wkss-solution">\
          <span id="rev-solution"></span>\
       </div><div id="wkss-input">\
          <input type="text" id="rev-input" size="40" placeholder="">\
       </div><span id="rev-index" style="display: none;"></span>\
       \
       <form id="audio-form">\
          <button id="AudioButton" type="button">Play audio</button>\
          <button id="MarkCorrectBtn" type="button">Mark Correct</button>\
          <button id="SelfstudyCloseBtn" type="button">Close window</button>\
       </form>\
       <div id="rev-audio" style="display:none;"></div>\
    </div>                                                                    \
');
$("#selfstudy").hide();

$("#SelfstudyCloseBtn").click(function () {
    $("#selfstudy").hide();
    $("#rev-input").val("");
});

$("#AudioButton").click(function () {
    OpenInNewTab(document.getElementById('rev-audio').innerHTML);
});

$("#MarkCorrectBtn").click(function () {
    correctanswer = true;
    $("#rev-input").removeClass("error");
    $("#rev-input").addClass("correct");
});

function OpenInNewTab(url )
{
  var win=window.open(url, '_blank');
  win.focus();
}

var hasaudio = false;

function playAudio() {
    
    var kanji = document.getElementById('rev-kanji').innerHTML;
    var kana = (document.getElementById('rev-solution').innerHTML.split(/[,、]+\s*/))[0];
    
    document.getElementById('rev-audio').innerHTML = "";
    document.getElementById('audio-form').action = "";
    
    if(! kanji.match(/[a-zA-Z]+/i) && ! kana.match(/[a-zA-Z]+/i)) {
        
        kanji = encodeURIComponent(kanji);
        kana = encodeURIComponent(kana);
        
        var newkanji = "";
        for(var i = 1; i < kanji.length; i = i+3) {
            newkanji = newkanji.concat(kanji[i-1]);
            newkanji = newkanji.concat('2');
            newkanji = newkanji.concat('5');
            newkanji = newkanji.concat(kanji[i]);
            newkanji = newkanji.concat(kanji[i+1]);
        }
        
        var newkana = "";
        for(var i = 1; i < kana.length; i = i+3) {
            newkana = newkana.concat(kana[i-1]);
            newkana = newkana.concat('2');
            newkana = newkana.concat('5');
            newkana = newkana.concat(kana[i]);
            newkana = newkana.concat(kana[i+1]);
        }
        
        var url = "http://www.csse.monash.edu.au/~jwb/audiock.swf?u=kana=" + newkana + "%26kanji=" + newkanji;
            
        scriptLog("Audio URL: " + url);
        
        document.getElementById('rev-audio').innerHTML = url;
        
        hasaudio = true;
        
    }
   
}


function generateReviewList() {

    if (localStorage.getItem('User-Vocab')) {
        var list = JSON.parse(localStorage.getItem('User-Vocab'));
        var srslist = JSON.parse(localStorage.getItem('User-SRS'));
        var review = [];
        var now = Date.now();
        var size = 0;
                      
        for(var i = 0; i < list.length; i++) {
            
            var dif = now - srslist[i].date;
            
        if((srsintervals[srslist[i].level] <= dif) && srslist[i].level < 8) {
            var item = {};
            item.kanji = list[i].kanji;

            if (list[i].reading != "") {
                var item2 = {};
                item2.kanji = list[i].kanji;
                item2.type = "Reading";
                item2.solution = list[i].reading;
                item2.index = i;
                review.push(item2);
            }

            item.type = "Meaning";
            item.solution = list[i].meaning;
            item.index = i;
            review.push(item);
            size++;
        }
         
        if (reviewlimit != 0 && reviewlimit > 0)
        {
            if(size == reviewlimit)
                break;
        }
            
        };

        review = shuffle(review);
        sessionStorage.setItem('User-Review', JSON.stringify(review));
    }
}

function startReview() {
    var list = JSON.parse(sessionStorage.getItem('User-Review'));
    nextReview(list[0]);
}

function nextReview(item) {

    document.getElementById('rev-kanji').innerHTML = item.kanji;
    //document.getElementById('rev-type').innerHTML = item.type;
    document.getElementById('rev-solution').innerHTML = item.solution;
    document.getElementById('rev-index').innerHTML = item.index;

    $("#rev-input").removeClass("error");
    $("#rev-input").removeClass("correct");
    $("#rev-input").val("");
    document.getElementById('MarkCorrectBtn').disabled = true;
    document.getElementById('AudioButton').disabled = true;
    hasaudio = false;

    //check for alphabet letters and decide to bind or unbind wanakana
    if (item.solution[0].match(/[a-zA-Z]+/i)) {
        wanakana.unbind(document.getElementById('rev-input'));
        $('#rev-input').attr('placeholder','Your response');
        document.getElementById('rev-type').innerHTML = "Meaning";
    }
    else {
        wanakana.bind(document.getElementById('rev-input'));
        $('#rev-input').attr('placeholder','答え');
        document.getElementById('rev-type').innerHTML = "Reading";
    }
    
    playAudio();
}

function storeSession(correct) {

    if (sessionStorage.getItem('User-Stats')) {
        var list = JSON.parse(sessionStorage.getItem('User-Stats'));
        for (var i = 0; i < list.length; i++) {
            if (list[i].correct == false) {
                if ((list[i].kanji.trim() === document.getElementById('rev-kanji').innerHTML.trim())
                    && (list[i].type.trim() === document.getElementById('rev-type').innerHTML.trim())) {
                    //do not log
                    return;
                }
            }
        }
        var stats = {};
        stats.kanji = document.getElementById('rev-kanji').innerHTML;
        stats.type = document.getElementById('rev-type').innerHTML;
        stats.correct = correct;
        
        updateSRS(correct);

        list.push(stats);
        sessionStorage.setItem('User-Stats', JSON.stringify(list));
    }
    else {
        var stats = {}
        var list = [];

        stats.kanji = document.getElementById('rev-kanji').innerHTML;
        stats.type = document.getElementById('rev-type').innerHTML;
        stats.correct = correct;

        updateSRS(correct);
        
        list.push(stats);
        sessionStorage.setItem('User-Stats', JSON.stringify(list));
    }

}

function showResults() {
    if (sessionStorage.getItem('User-Stats')) {
        var list = JSON.parse(sessionStorage.getItem('User-Stats'));

        for (var i = 0; i < list.length; i++) {

            if (list[i].correct == true) {
                if (list[i].type.trim() === "Meaning".trim())
                    document.getElementById("stats-m").innerHTML += "<span class=\"rev-correct\">" + list[i].kanji + "</span>";
                else
                    document.getElementById("stats-r").innerHTML += "<span class=\"rev-correct\">" + list[i].kanji + "</span>";
            }
            else {
                if (list[i].type.trim() === "Meaning".trim())
                    document.getElementById("stats-m").innerHTML += "<span class=\"rev-error\">" + list[i].kanji + "</span>";
                else
                    document.getElementById("stats-r").innerHTML += "<span class=\"rev-error\">" + list[i].kanji + "</span>";
            }

        }
    }
    sessionStorage.clear();
}

$("body").append('                                                          \
    <div id="resultwindow" class="WKSS">                                               \                                                                 \
       <div id="scroll-result">\
       <h1>Review Results</h1>\
       <h2>Reading</h2>\
       <div id="stats-r"></div>\
       <h2>Meaning</h2>\
       <div id="stats-m"></div>\
       </div>\
       <button id="ReviewresultsCloseBtn" type="button">Close window</button>\
    </div>                                                                    \
');
$("#resultwindow").hide();

$("#ReviewresultsCloseBtn").click(function () {
    $("#resultwindow").hide();
    document.getElementById("stats-r").innerHTML = "";
    document.getElementById("stats-m").innerHTML = "";
});

var keystate = true;
var correctanswer = false;

$("#rev-input").keyup(function (e) {
    if (e.keyCode == 13 && keystate == true) {

        if($("#rev-input").val().length == 0)
            return;
        
        //document.getElementById('rev-input').disabled = true;
        
        correctanswer = false;

        if (inputCorrect()) {
            correctanswer = true;
            $("#rev-input").addClass("correct");
            $("#rev-solution").addClass("info");
        }
        else {
            $("#rev-input").addClass("error");
            document.getElementById('MarkCorrectBtn').disabled = false;
            $("#rev-solution").addClass("info");
        }

        if(hasaudio)
        {
           document.getElementById('AudioButton').disabled = false;   
        }
        
        //playAudio();

        keystate = false;
    }
    else if (e.keyCode == 13 && keystate == false) {
        
        if (correctanswer) {
            var list = JSON.parse(sessionStorage.getItem('User-Review'));

            list.splice(0, 1);

            if (list.length != 0) {
                sessionStorage.setItem('User-Review', JSON.stringify(list));
            }
            else {
                sessionStorage.removeItem('User-Review');
            }
        }

        storeSession(correctanswer);
        
        if (sessionStorage.getItem('User-Review')) {

            setTimeout(function () {

                var list = JSON.parse(sessionStorage.getItem('User-Review'));
                list = shuffle(list);
                nextReview(list[0]);
                sessionStorage.setItem('User-Review', JSON.stringify(list));

                //document.getElementById('rev-input').disabled = false;
                $("#rev-solution").removeClass("info");
                $("#selfstudy").hide().fadeIn('fast');

            }, 1);
        }
        else {
            
            setTimeout(function () {
                
                $("#selfstudy").hide();
                //document.getElementById('rev-input').disabled = false;
                $("#rev-solution").removeClass("info");
                showResults();
                $("#resultwindow").show();
                
            }, 1);
        }
        keystate = true;
    }
});


function updateSRS(correct) {
    var srslist = JSON.parse(localStorage.getItem('User-SRS'));
    var list = JSON.parse(sessionStorage.getItem('User-Review'));
    var index = document.getElementById('rev-index').innerHTML;
    
    if(list && checkForDuplicates(list,srslist[index])) {
        scriptLog("Other item found, save status");
        
        if(sessionStorage.getItem(srslist[index].kanji)) {
            correct = correct && JSON.parse(sessionStorage.getItem(srslist[index].kanji));
        }
        
        sessionStorage.setItem(srslist[index].kanji, JSON.stringify(correct));
        return;
    }
    else if(sessionStorage.getItem(srslist[index].kanji)) {
        correct = correct && JSON.parse(sessionStorage.getItem(srslist[index].kanji));
        sessionStorage.removeItem(srslist[index].kanji);
    }
        
    
    var now = Date.now();
    
    if(correct == true) {
        srslist[index].level++;
    }
    else
    {
        if(srslist[index].level != 0)
            srslist[index].level--;
        
    }
    
    srslist[index].date = now;
    
    scriptLog("updateSRS - " + srslist[index].kanji + " - new level: " + srslist[index].level + " date: " + now);
    localStorage.setItem('User-SRS', JSON.stringify(srslist));
    document.getElementById('user-review').innerHTML = "Review (" + WKSS_getReviewCount() + ")";
}

function inputCorrect() {
    var input = $("#rev-input").val().toLowerCase();
    var solution = document.getElementById('rev-solution').innerHTML.split(/[,、]+\s*/);
    var correct = 0;
    var returnvalue = false;
    
    scriptLog("Input: " + input);
    
    // also allow entering of both solutions at once, if available
    if(solution.length == 2) {
        solution[2] = solution[0] + ", " + solution[1];
        solution[3] = solution[1] + ", " + solution[0];
    }
    
    for(var i = 0; i < solution.length; i++) {
        solution[i] = solution[i].toLowerCase();
        
        correct = 0;
        var threshold = ~~(solution[i].length / errorAllowance);
    
        if(document.getElementById('rev-type').innerHTML == "Reading") {
            threshold = 0;
        }
    
        scriptLog("Checking " + solution[i] + " with threshold: " + threshold);
        
        if (input.length <= solution[i].length) {

            if(input.length < (solution[i].length - threshold)) {
                returnvalue = returnvalue || false;
                scriptLog("false at if branch " + input.length + " < " + (solution[i].length - threshold));
            }
            else {
            
                var j = input.length;
                while (j--) {
                    if (input[j] == solution[i][j]) {
                        correct++;
                    }
                }

                if ((solution[i].length - threshold) <= correct) {
                    returnvalue = returnvalue || true;
                    scriptLog("true at if branch " + (solution[i].length - threshold) + " <= " + correct);
                }
            }
        }
        else {
        
            if(input.length > (solution[i].length + threshold)) {
                returnvalue = returnvalue || false;
                scriptLog("false at else branch " + input.length + " > " + (solution[i].length + threshold));
            }
            else {
            
                var j = solution[i].length;
                while (j--) {
                    if (input[j] == solution[i][j]) {   
                        correct++;
                    }
                }
            
                if ((solution[i].length - threshold) <= correct) {
                    returnvalue = returnvalue || true;
                    scriptLog("true at else branch " + (solution[i].length - threshold) + " <= " + correct);
                }
            }
        }
    }

    scriptLog("Returning " + returnvalue);
    return returnvalue;
}

/*
 *  Give back the current review count
 */
WKSS_getReviewCount = function () {
    var size = 0;
    if (localStorage.getItem('User-SRS')) {
        var srslist = JSON.parse(localStorage.getItem('User-SRS'));
        var now = Date.now();
        
        for(var i = 0; i < srslist.length; i++) {
            var dif = now - srslist[i].date;
            
            if((srsintervals[srslist[i].level] <= dif) && srslist[i].level < 8) {
                size++;
            }
        }
    }
    if (size > 42) {
        return "42+"; //hail the crabigator!
    }

    return size.toString();
}

/*
 *  Adds the Button
 */
function addUserVocabButton() {
    var nav = document.getElementsByClassName('nav');
    var review_count = WKSS_getReviewCount();

    if (nav) {
        nav[2].innerHTML = nav[2].innerHTML + "<li class=\"dropdown custom\"><a class=\"dropdown-toggle custom\" data-toggle=\"dropdown\" href=\"#\"><span lang=\"ja\">自習</span>Self-Study <i class=\"icon-chevron-down\"></i></a><ul class=\"dropdown-menu\"><li class=\"nav-header\">Customize</li><li><a id=\"click\" href=\"#\" onclick=\"WKSS_add();\">Add</a></li><li><a href=\"#\" onclick=\"WKSS_edit();\">Edit</a></li><li><a href=\"#\" onclick=\"WKSS_export();\">Export</a></li><li><a href=\"#\" onclick=\"WKSS_import();\">Import</a></li><li class=\"nav-header\">Learn</li><li><a id=\"user-review\" href=\"#\" onclick=\"WKSS_review();\">Review (" + review_count + ")</a></li></ul></li>";
    }
}

/*
 *  Prepares the script
 */
function scriptInit() {
    scriptLog("Initializing Wanikani UserVocab Script!");

    GM_addStyle(".custom .dropdown-menu {background-color: #DBA901 !important;}");
    GM_addStyle(".custom .dropdown-menu:after {border-bottom-color: #DBA901 !important;");
    GM_addStyle(".custom .dropdown-menu:before {border-bottom-color: #DBA901 !important;");
    GM_addStyle(".open .dropdown-toggle.custom {background-color: #FFC400 !important;}");
    GM_addStyle(".custom .dropdown-menu a:hover {background-color: #A67F00 !important;}");
    GM_addStyle(".custom:hover {color: #FFC400 !important;}");
    GM_addStyle(".custom:hover span {border-color: #FFC400 !important;}");
    GM_addStyle(".custom:focus {color: #FFC400 !important;}");
    GM_addStyle(".custom:focus span {border-color: #FFC400 !important;}");
    GM_addStyle(".open .custom span {border-color: #FFFFFF !important;}");
    GM_addStyle(".open .custom {color: #FFFFFF !important}");

    GM_addStyle("                                                 \
.WKSS {\
    background: #FFF;\
    padding: 20px 30px 20px 30px;\
    font: 12px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
    color: #888;\
    text-shadow: 1px 1px 1px #FFF;\
    border:1px solid #DDD;\
    border-radius: 5px;\
    -webkit-border-radius: 5px;\
    -moz-border-radius: 5px;\
    box-shadow: 10px 10px 5px #888888;\
}\
.WKSS h1 {\
    font: 25px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
    padding: 0px 0px 10px 40px;\
    display: block;\
    border-bottom: 1px solid #DADADA;\
    margin: -10px -30px 30px -30px;\
    color: #888;\
}\
.WKSS h1>span {\
    display: block;\
    font-size: 11px;\
}\
.WKSS label {\
    display: block;\
    margin: 0px 0px 5px;\
}\
.WKSS label>span {\
    float: left;\
    width: 80px;\
    text-align: right;\
    padding-right: 10px;\
    margin-top: 10px;\
    color: #333;\
    font-family: \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
    font-weight: bold;\
}\
.WKSS input[type=\"text\"], .WKSS input[type=\"email\"], .WKSS textarea{\
    border: 1px solid #CCC;\
    color: #888;\
    height: 20px;\
    margin-bottom: 16px;\
    margin-right: 6px;\
    margin-top: 2px;\
    outline: 0 none;\
    padding: 6px 12px;\
    width: 80%;\
    border-radius: 4px;\
    line-height: normal !important;\
    -webkit-border-radius: 4px;\
    -moz-border-radius: 4px;\
    font: normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
}\
.WKSS select {\
    border: 1px solid #CCC;\
    color: #888;\
    outline: 0 none;\
    padding: 6px 12px;\
    height: 160px !important;\
    width: 95%;\
    border-radius: 4px;\
    -webkit-border-radius: 4px;\
    -moz-border-radius: 4px;\
    font: normal 14px/14px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\
    background: #FFF url('down-arrow.png') no-repeat right;\
    background: #FFF url('down-arrow.png') no-repeat right);\
    appearance:none;\
    -webkit-appearance:none;\
    -moz-appearance: none;\
    text-indent: 0.01px;\
    text-overflow: '';\
}\
.WKSS textarea{\
    height:100px;\
}\
.WKSS button {\
    background: #FFF;\
    border: 1px solid #CCC;\
    padding: 10px 25px 10px 25px;\
    color: #333;\
    border-radius: 4px;\
}\
.WKSS button:disabled {\
    background: #EBEBEB;\
    border: 1px solid #CCC;\
    padding: 10px 25px 10px 25px;\
    color: #333;\
    border-radius: 4px;\
}\
.WKSS button:hover:enabled {\
    color: #333;\
    background-color: #EBEBEB;\
    border-color: #ADADAD;\
}                                                          \
.WKSS button:hover:disabled {\
cursor: default\
}                                                          \
.error {border-color:#F00 !important; color: #F00 !important;}\
.correct {border-color:#0F0 !important; color: #0F0 !important;}\
.info {border-color:#696969 !important; color: #696969 !important;}\
.rev-error {text-shadow:none; border: 1px solid #F00 !important;border-radius: 10px; background-color: #F00; padding:4px; margin:4px; color: #FFFFFF; font: normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\}\
.rev-correct {text-shadow:none; border: 1px solid #088A08 !important;border-radius: 10px; background-color: #088A08; padding:4px; margin:4px; color: #FFFFFF; font: normal 18px \"ヒラギノ角ゴ Pro W3\", \"Hiragino Kaku Gothic Pro\",Osaka, \"メイリオ\", Meiryo, \"ＭＳ Ｐゴシック\", \"MS PGothic\", sans-serif;\}\
");
    GM_addStyle("\
#add {\
position:absolute;\
    float:right;\
    top:50%;\
    left:50%;\
    width:" + addWindowWidth + "px;\
    height:" + addWindowHeight + "px; \
    margin-left:-" + addWindowWidth/2 + "px; \
    margin-top:-" + addWindowHeight/2 + "px; \
}\
                ");
    GM_addStyle("\
#export, #import {\
position:absolute;\
    float:right;\
    top:50%;\
    left:50%;\
    width:" + exportImportWindowWidth + "px;\
    height:" + exportImportWindowHeight + "px; \
    margin-left:-" + exportImportWindowWidth/2 + "px; \
    margin-top:-" + exportImportWindowHeight/2 + "px; \
}\
                ");
    GM_addStyle("\
#edit {\
position:absolute;\
    float:right;\
    top:50%;\
    left:50%;\
    width:" + editWindowWidth + "px;\
    height:" + editWindowHeight + "px; \
    margin-left:-" + editWindowWidth/2 + "px; \
    margin-top:-" + editWindowHeight/2 + "px; \
}\
                ");
    GM_addStyle("\
#selfstudy {\
position:absolute;\
    float:right;\
    top:50%;\
    left:50%;\
    width:" + studyWindowWidth + "px;\
    height:" + studyWindowHeight + "px; \
    margin-left:-" + studyWindowWidth/2 + "px; \
    margin-top:-" + studyWindowHeight/2 + "px; \
}\
                ");
    GM_addStyle("\
#resultwindow {\
position:absolute;\
    float:right;\
    top:50%;\
    left:50%;\
    width:" + resultWindowWidth + "px;\
    height:" + resultWindowHeight + "px; \
    margin-left:-" + resultWindowWidth/2 + "px; \
    margin-top:-" + resultWindowHeight/2 + "px; \
}\
#result-scroll {overflow-y:scroll;\
                width:" + (resultWindowWidth-50) + "px;\
                height:" + (resultWindowHeight-50) + "px; \
                margin-left:-" + (resultWindowWidth/2 -25) + "px; \
                margin-top:-" + (resultWindowHeight/2 -25) + "px; \
                position:absolute;\
                float:right;\
                top:50%;\
                left:50%;\
}\
");
    GM_addStyle("\
#SelfstudyCloseBtn {\
margin-top: 35px;\
left: 27%;\
position: relative;\
display: inline !important;\
-webkit-margin-before: 50px;\
}");
        GM_addStyle("\
#MarkCorrectBtn {\
margin-top: 35px;\
left: 17%;\
position: relative;\
display: inline !important;\
-webkit-margin-before: 50px;\
}");
        GM_addStyle("\
#AudioButton {\
margin-top: 35px;\
left: 7%;\
position: relative;\
display: inline !important;\
-webkit-margin-before: 50px;\
}");
    GM_addStyle("\
#ReviewresultsCloseBtn {\
top: 0%;\
left: 75%;\
position: relative;\
-webkit-margin-before: 50px;\
}");
    GM_addStyle("\
#wkss-kanji, #rev-kanji {\
text-align:center !important;\
font-size:50px !important;\
background-color: #9400D3 !important;\
color: #FFFFFF !important;\
border-radius: 10px     10px      0px           0px;\
}");
    GM_addStyle("\
#wkss-solution, #rev-solution {\
text-align: center !important;\
font-size:30px !important;\
color: #FFFFFF;\
padding: 2px;\
}");
    GM_addStyle("\
#wkss-type, #rev-type {\
text-align:center !important;\
font-size:24px !important;\
background-color: #696969 !important;\
color: #FFFFFF !important;\
border-radius: 0px     0px      10px           10px;\
}");
    GM_addStyle("\
#wkss-input, #rev-input {\
text-align:center !important;\
font-size:40px !important;\
height: 60px !important;\
line-height: normal !important;\
}");

    // Set up buttons
    try {
        if (typeof(Storage) !== "undefined") {
            addUserVocabButton();
        }
        else {
            alert("Wanikani Self-Study: Your browser does not support localStorage.. Sorry :(");
        }
    }
    catch (err) {
        logError(err);
    }
}

/*
 * Helper Functions/Variables
 */

function isEmpty(value) {
    return (typeof value === "undefined" || value === null);
}

function select_all(obj) {
    var text_val = eval(obj);
    text_val.focus();
    text_val.select();
}

function listEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;
    for (var i = arr1.length; i--;) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

function checkAdd(add) {
    if(localStorage.getItem('User-Vocab')) {    
        var list = JSON.parse(localStorage.getItem('User-Vocab'));
        for (var i = 0; i < add.length; i++) {
        if (!checkItem(add[i]) || checkForDuplicates(list,add[i]))
            return false;
        }
    }
    else {
        for (var i = 0; i < add.length; i++) {
        if (!checkItem(add[i]))
            return false;
        }
    }
    
    return true;
}

function checkItem(add) {
    if (isEmpty(add.kanji) || isEmpty(add.meaning) || isEmpty(add.reading))
        return false;
    
    if((!(Object.prototype.toString.call(add.meaning) === '[object Array]')) ||
       (!(Object.prototype.toString.call(add.reading) === '[object Array]')))
        return false;

    return true;
}

function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue
        , randomIndex
        ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Error handling
 * Can use 'error.stack', not cross-browser (though it should work on Firefox and Chrome)
 */
function logError(error) {
    var stackMessage = "";
    if ("stack" in error)
        stackMessage = "\n\tStack: " + error.stack;

    console.error("WKSS: Error: " + error.name + "\n\tMessage: " + error.message + stackMessage);
}

/*
 * Start the script
 */
scriptInit();