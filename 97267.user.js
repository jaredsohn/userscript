// ==UserScript==
// @name          Pimp My CAT
// @namespace     http://www.pimpmycat.nothing
// @description   The CAT Pimper
// @include       http://training.cat-europe.com/TrainingModeFrame.aspx
// @include       https://training.cat-europe.com/TrainingModeFrame.aspx
// @version       10.6
// @screenshot    http://k.min.us/ilyyO4.png
// @id            pimpmycat@ptntools
// @author        Axel Bock <mr.axel.bock@gmail.com>
// @require       http://code.jquery.com/jquery-1.6.min.js
// @require       http://pastebin.com/raw.php?i=ihV5JM52
// ==/UserScript==

//       ********************************************
//       ******* ALSO CHANGE MAIN VERSION HERE ******
//       ********************************************
pmc_version = "10.6";

//  setInterval() -> setTimeout() in 1 function


function getNotAnswered() {
    return $('tr:not(.hide-row) > td:nth-child(2) > img[src="images/spacer.gif"]', 
        window.frames[1].document).size();    
}

function getCorrectAnswered() {
    return $('tr:not(.hide-row) > td:nth-child(2) > img[src="images/frage_richtig.gif"]', 
        window.frames[1].document).size();    
}

function getWronglyAnswered() {
    return $('tr:not(.hide-row) > td:nth-child(2) > img[src="images/frage_falsch.gif"]', 
        window.frames[1].document).size();    
}

function getPinned() {
    return $('tr:not(.hide-row) > td:nth-child(3) > img[src="images/pin.gif"]', 
        window.frames[1].document).size();    
}

function updateStatBox() {
    var ans_ok = getCorrectAnswered();
    var ans_no = getWronglyAnswered();
    var ans_xx = getNotAnswered();
    var pinned = getPinned();
    var all_quest = (ans_ok + ans_no + ans_xx);
    var ans_quest = (ans_ok + ans_no);
    var perc = (ans_ok / ans_quest * 100).toFixed(2);
    if (ans_quest == 0) {
        perc = 0;
    }
    // the percentage color and the comment string :)
    var color = "#cccccc";
    var comment = 'Let\'s roll ...';
    if (perc == 100) {
        color = "#FFD700";
        if (ans_quest > 10) {
            comment = '<a target="new" style="color:#FFD700; font-weight: bold;" href="http://www.youtube.com/watch?v=BBRQ8XUJOeI">Shag-a-tastic, baby!!</a>';
        } else if (ans_quest > 7) {
            color = "#ccac00";
            comment = 'Yooou <span style="color:#ccac00;">get it </span>baby!!';
        }     else if (ans_quest > 4) {
            color = "#b29600";
            comment = 'You\'re <a target="new" style="color: #b29600;" href="http://www.youtube.com/watch?v=06kXXJUddHQ">on the roll</a> ...';
        }    else if (ans_quest > 1) {
            color = "#806c00";
            comment = "Keep it coming ...";
        } else if (ans_quest == 1) {
            color = "#665600";
            comment = '<a target="new" style="color: #665600;" href="http://www.youtube.com/watch?v=-8MjBU2sNK4">Great start! :)</a>';
        }
    } else if (perc >= 90) {
        comment = '<a target="new" href="http://www.youtube.com/watch?v=Ai813WFOtwQ">First class.</a>';
        color = "#32CD32";
    } else if (perc >= 80) {
        comment = '<b>you\'re <a target="new" style="color:#32CD32;" href="http://www.youtube.com/watch?v=lbbLT94L-T0">the one</a></span>!</b>';
        color = "#32CD32";
    } else if (perc >= 75) {
        color = "#FFB1A3"; 
        comment = 'Close, but failure.';
    } else if (perc > 50) {
        color = "#FF6347";
        comment = '<b><a href="http://www.youtube.com/watch?v=1G0aemJnlyU" target="new" style="color:#FF6347;">you suck</a>!!</b>';
    } else if ( ans_quest > 3){
        color = "red";
        comment = '<span style="color:red">Don\'t fly. Please.</span>';
    } else if ( ans_quest == 3){
        color = "red";
        comment = 'Really? Come on!';
    } else if ( ans_quest == 2){
        color = "red";
        comment = 'Bad day?';
    } else if ( ans_quest == 1){
        color = "red";
        comment = 'Ouch.';
    }
    // how many more good answers to be cool
    if (perc < 80 && ans_quest > 0) {
        var more = 4*ans_no - ans_ok;
        more = 
            '<br><span style="font-size:8pt;color:#cccccc;">'
            + '+<span style="color:#32CD32;">'
            + more.toFixed(0)
            + '</span> to be good.</span>';
    } else {
        var more = "";
    }
    // find out about display or question filters
    // display filters
    var wf1d = window.frames[1].document;
    var disp_filter = $('head', wf1d).attr('display_filter');
    if (! disp_filter || disp_filter == "0,0,0,0") {
        disp_filter = "";
    } else {
        disp_filter = "F";
    }
    // question filters ... easier ;)
    var qstn_filter = dfil_get_filter('set_filter') ? "Q" : "";
    // construct the box
    var innerHTML = '\
    <table style="color:#cccccc; font-size:8pt;" width="100%" border="0"><tr>\
        <td style="font-size:16pt;color:%COLOR" valign="center"><b>%PERCENT %</b>%MORE%</td>  \
        <td><b>%DISP_FILTER<br>%QSTN_FILTER</b></td>\
        <td align="right"><span style="color:#32CD32">%CORRECT</span> \
        + <span style="color:#FF6347">%WRONG</span>, %LEFT left\
        <br>\
        <span style="color:#fdcb68">%PINNED</span> marked\
        <br>\
        %COMMENT</td> \
      </tr>\
    </table>';
    innerHTML = innerHTML.
        replace("%COMMENT", comment).
        replace("%PERCENT", perc).
        replace("%COLOR", color).
        replace("%CORRECT", ans_ok).
        replace("%WRONG", ans_no).
        replace("%DISP_FILTER", disp_filter).
        replace("%QSTN_FILTER", qstn_filter).
        replace("%LEFT", ans_xx).
        replace("%PINNED", pinned).
        replace("%MORE%", more);
    var box = $('#pimpmyCAT', window.frames[0].document);
    if (! box.size()) {
        box = $('<div id="pimpmyCAT"></div>');
        $('body > :last-child', window.frames[0].document).after(box);
    }
    var hashString = 
        perc
        + '_' + ans_quest.toString() 
        + '_' + ans_ok.toString()
        + '_' + ans_xx.toString()
        + '_' + pinned.toString()
        + '_' + disp_filter
        + '_' + qstn_filter;
    if (! box.attr('hash') || box.attr('hash') != hashString) {
        box[0].innerHTML = '';
        box.attr('hash', hashString);
        box.html(innerHTML);
    }
}

function getQBox() {
    // this is soooo fucked up. the company behind this should be shot 
    // and burned and banned to hell for all eternity. 
    var idbox = $('form > div > div', window.frames[2].document);
    var retVal = false;
    idbox.each( function() {
       var bg_image = $(this).css('background-image');
       if (bg_image != null && bg_image.indexOf('kreis') > -1) {
           retVal = $(this);
           return false;
       }
    });
    return retVal;
}

// returns FALSE or the number in the question id box
function getQuestionNumber() {
    var retVal = getQBox();
    if (retVal) {
        retVal = parseInt(retVal.find('td').text());
    }
    return retVal;
}

function clickOn(target, doc) {
    var evt = doc.createEvent("MouseEvents");
    evt.initEvent('click', true, true);
    var rv = target.dispatchEvent(evt);
    if (!rv) {
        alert('clickOn() failed for some reason.');
    }
    return rv;
}

function goTo(target, framewin) {
    if (target) {
        $('html,body', framewin.document).animate(
            { scrollTop: $(target).offset().top-$(framewin).height()/2 }, 
            { duration: 'medium', easing: 'swing'});
    }
}

function clickNB(no) {
    var wf0d = window.frames[0].document;
    target = $('#Table1 td:nth-child(' + no + ')', wf0d)[0];
    clickOn(target, wf0d);
    return false;
}

function rgb2hex(rgbString) {
    var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!parts) { return rgbString; }
    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
    delete (parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return parts.join(''); // "rrggbb"
}

// you MUST MUST call filterNeighbors after, cause filterNeighbors
// checks for visibility ... 
function initNeighbors() {
    var wf1d = window.frames[1].document;
    var retval = [[], null, []];
    var indx = 0;
    var questions = $('table tr .bg', wf1d);
    questions.each( function(i) {
        if (indx == 0 && rgb2hex($(this).css('background-color')) == 'e2e2e2') {
            indx++;
            retval[indx] = [$(this)];
            indx++;
        } else {
            retval[indx].push($(this));
        }
    }); 
    return retval;
}

function get_matrix_for(element) {
    var v0 = 1;
    var v1 = element.find('img[src="images/pin.gif"]').size();
    var v2 = element.find('img[src="images/frage_richtig.gif"]').size();
    var v3 = element.find('img[src="images/frage_falsch.gif"]').size();
    if (v2+v3 > 0) {
        v0 = 0;
    }
    return [v0, v1, v2, v3];    
}

function keep_element(matrix, filter) {
    var applid = 0;
    var failed = 0;
    for (var k=0; k<4; k++) {
        if (filter[k]){
            applid ++;
            if (filter[k]-1 != matrix[k]) {
                failed++;
            }
        }
    } 
    // no applied filter means EVERYTHING passes :)
    return (applid == 0 || applid > failed);
}

// PARAM FILTER: 
// the parameter filter is an array of values of 0..2
// [new / marked / positive_ans / negative_ans]
// 0 == do not compare this value.
// 1 == DO NOT include those questions
// 2 == INCLUDE those questions
// the filter values are ORed. 
// example: get all NEGATIVE and MARKED questions: 
// [0, 2, 0, 2] 
// --> do NOT filter for new and positive (array 0 & 2)
// --> FILTER for MARKED==TRUE and NEGATIVE==TRUE (array 1 & 3)
// PARAM APPLY: 
// do not only filter, but APPLY the filter to visibility
// RETURNS: 
// returns a 3-array:
// all previous visible neigbors (according to filter)
// the current item
// all following neighbors (according to filter)
function filterNeighbors(set, filter, apply) {
    if (! filter) {
        filter = dfil_get_filter('display_filter');
        if (! filter) { filter = [0,0,0,0]; }
    }
    var qset = dfil_get_filter('set_filter');
    var invt = parseInt(dfil_get_var('invert_qset'));
    if (qset) { 
        qset = qset.map( function(n) { return n.toString(); });
    }
    var dbg=0;
    var retval = [[], [], []];
    var matrix, cur, positive;
    for (var i=0; i<set.length; i++) {
        for (var j=0; j<set[i].length; j++) {
            cur = set[i][j];
            matrix = get_matrix_for(cur);
            positive = keep_element(matrix, filter);
            if (qset) { 
                if (! invt) {
                    positive = positive && (qset.indexOf(cur.text().trim()) != -1);
                } else {
                    positive = positive && (qset.indexOf(cur.text().trim()) == -1);
                }
            } 
            if (apply) {
                if (positive) {
                    retval[i].push(cur);
                    cur.removeClass('hide-row');
                } else {
                    cur.addClass('hide-row');
                }
            } else if (positive && ! cur.hasClass('hide-row')) {
                retval[i].push(cur);
            }
        }
    }
    return retval; 
}

// if filter is omitted it is set to [0,0,0,0] automatically 
// fwd = true if forward.
function next_with_filter(fwd, filter) {
    var wf1d = window.frames[1].document;
    var set = initNeighbors();
    if (!filter) filter = [0, 0, 0, 0];
    set = filterNeighbors(set, filter);
    if (!fwd) {
        var tmp = set[0].reverse();
        set[0] = set[2].reverse();
        set[2] = tmp;
    }
    var target = null;
    if (set[2].length) {
        target = set[2].shift();
    } 
    else {
        if (set[0].length) target = set[0].shift(); 
    }
    if (target) {
        clickOn(target[0], wf1d);
        goTo(target, window.frames[1]);
    }
    return (target) ? true : false;
}

function current() {
    var wf1d = window.frames[1].document;
    var set = initNeighbors();
    target = set[1].shift();
    clickOn(target[0], wf1d);
    goTo(target, window.frames[1]);
    return false;
}

function key_nf(fwd, filter) {
    logDate('key_nf');
    if (!next_with_filter(fwd, filter)) { alert('no matching questions.'); }
    logDate('key_nf done');
    return false;
}

function key_enter(forward) {
    if (! next_with_filter(forward, [2,0,0,0]))
        next_with_filter(forward);
    return false;
}



// ==========================================================================
// Filter based on question properties (answered/new, marked, etc.)
// ==========================================================================

function dfil_get_var(varname) {
    var wf1d = window.frames[1].document;
    var variable = $('head', wf1d).attr(varname);
    return variable ? variable : false;
}

function dfil_save_var(varname, value) {
    $('head', window.frames[1].document).attr(varname, value);    
}

function dfil_get_filter(attr_name) {
    var wf1d = window.frames[1].document;
    var current_filter = $('head', wf1d).attr(attr_name);
    if (! current_filter) {
        return false;
    } else {
        current_filter = current_filter.split(",");
        current_filter = current_filter.map( function(n) { return parseInt(n); }); 
    }
    return current_filter;
}

function dfil_save_filter(filter_array, filter_name) {
    var wf1d = window.frames[1].document;
    if (! filter_name) { filter_name = 'display_filter'; }
    if (filter_array) {
        $('head', wf1d).attr(filter_name, filter_array.join(','));    
    } else {
        $('head', wf1d).removeAttr(filter_name);    
    }
}

function dfil_display_filter(f) {
    var wf2d = window.frames[2].document;
    var text = [
        "all <b>answered</b> questions", "all <b>new</b> questions",
        "all <b><u>un</u>marked</b>", "all <b>marked</b>",
        "everything <b><u>not</u> marked correct</b>", "everything <b>marked correct</b>", 
        "everything <b><u>not</u> marked incorrect</b>", "everything <b>marked incorrect</b>"];
    var display = '<p>Displaying all of the following:</p><ul>';
    var added = false;
    for (var i=0; i<4; i++) {
        if (f[i]) {
            display += "<li>"+text[2*i+f[i]-1]+"</li>";
            added = true;
        }
    }
    if (!added) 
        display += "display everything."; 
    display += "</ul>"
    // now display that :)
    var box = $('body > div#infobox', wf2d);
    if (box.size()) box.html(display);
    else {
        $('body', wf2d).
            prepend("<div id='infobox' class='infobox'>"+display+"</div>");
    }
    return false;
}

filter_wait = false;
function dfil_qjump_later(q, click) {
    if (filter_wait) {
        clearTimeout(filter_wait);
    }
    filter_wait = setTimeout(function() {
        filter_wait = false;
        goTo(q, window.frames[1]);
        if (click) {
            // remember: clickOn needs a DOM object!!
            clickOn(q[0], window.frames[1].document);
        }
    }, 350);
}

function dfil_apply_filter(f) {
    var wf1d = window.frames[1].document;
    dfil_save_filter(f);
    var n = initNeighbors();
    n = filterNeighbors(n, f, true);
    dfil_display_filter(f);
    // if the current question was filtered out - go to the next visible one.
    if (n[1].length) { 
        dfil_qjump_later(n[1][0]);
    } else {
        if (n[2].length) { 
            dfil_qjump_later(n[2][0], true);
        } else {
            dfil_qjump_later(n[0][0], true);
        }
    }
}

function dfil(item) {
    var f = dfil_get_filter('display_filter');
    if (!f) { f = [0,0,0,0]; }
    f[item] = ++f[item] % 3;
    dfil_apply_filter(f);
    return false;
}

function dfil_reapply() {
    var f = dfil_get_filter('display_filter');
    if (!f) { f = [0,0,0,0]; }
    dfil_apply_filter(f);
    return false;
}


// ==========================================================================
// common screen methods
// ==========================================================================

function screen_abort() {
    var wf2d = window.frames[2].document;
    if ($('.pmc_screen', wf2d).size()) {
        $('.pmc_screen', wf2d).remove();
        $('body', wf2d).children().each( function() {
            $(this).removeClass('hide-row'); 
        });
    }
    return false;
}

function screen_prepare() {
    var wf2d = window.frames[2].document;
    $('body', wf2d).children().each( function() {
        $(this).addClass('hide-row'); 
    });
}

function screen_check_already_there(idstr) {
    // if THIS screen is already there we will simply return "yes"
    if ($('#'+idstr, window.frames[2].document).size()) { return true; }
    // otherwise if another screen is there we will kill it
    if ($('.pmc_screen', window.frames[2].document).size()) {
        screen_abort();
    }
    return false;
}


// ==========================================================================
// Info screens
// ==========================================================================

function info_screen() {
    var wf2d = window.frames[2].document;
    if (screen_check_already_there('pmc_info_screen')) {
        return screen_abort();
    }
    screen_prepare();
    var ifr;
    ifr = $('<div style="text-align:center; margin-top:20px;">\
                <div id="dismiss">\
                <b style="color: #777">Press ESC or click here to dismiss.</b></div>\
                <object width="50%" height="220"></object>\
            </div>'); 
    $('body > :first-child', wf2d).before(ifr);
    ifr.attr('id', 'pmc_info_screen');
    ifr.addClass('pmc_screen');
    ifr.find('object').attr('data', 
        'http://training.cat-europe.com/ShowQuestionInfo.aspx');
    ifr.find('#dismiss').click(screen_abort);
    return false;
}

function visi_screen() {
    var wf2d = window.frames[2].document;
    var wf1d = window.frames[1].document;
    if (screen_check_already_there('pmc_einfo_screen')) {
        return false;
    }
    screen_prepare();
    var newhtml = '\
    <table class="pmc_screen pmc_input_table">\
        <tr><td colspan="2">\
            Currently <b>visible</b> questions are, depending on display and \
            question filters). Press ESC or click &quot;Close&quot; to dismiss.\
        </td></tr>\
        <tr><td colspan="2">\
            <textarea rows=10 cols=50 name="textarea" id="textarea" />\
        </td></tr>\
        <tr><td colspan="2">\
            Note that this is <b>not</b> necessarily the same as the \
            question set. The shift-1 ... shift-4 filters are applied here, \
            too.\
        </td></tr>\
        <tr><td colspan="2">\
        <input type="submit" id="dismiss" value="Close" />\
        </td></tr>\
    </table>';
    var ifr = $(newhtml);
    ifr.attr('id', 'pmc_einfo_screen');
    // now create the question list
    var qlist = $('table tr.bg:not(.hide-row)', wf1d);
    var text = "";
    qlist.each( function(i) {
        text += $(this).text().trim() + " ";
    });
    $('body > :first-child', wf2d).before(ifr);
    $('#textarea', ifr).val(text);
    $('#textarea', ifr).bind('keydown', 'esc', screen_abort);
    $('#dismiss', ifr).click(screen_abort);
    return false;
}


// ==========================================================================
// Set filter screen
// ==========================================================================

function set_form() {
    var wf2d = window.frames[2].document;
    if (screen_check_already_there('pmc_qset_table')) { return false; }
    screen_prepare();
    var newhtml = '\
    <table id="pmc_qset_table" class="pmc_screen pmc_input_table">\
    <form>\
        <tr><td colspan="2">\
            Enter the list of <b>question numbers you want to keep visible</b>. \
            Separate by SPACE or ENTER or any combination of those. You can disable \
            the filter and make everything visible again later by pressing \
            <span style="font-family: courier;">shift-6</span>.\
        </td></tr>\
        <tr><td colspan="2">\
            <textarea rows=10 cols=50 name="textarea" id="question_set" />\
        </td></tr>\
        <tr><td colspan="2">\
            <input type="checkbox" name="invert" id="invert_box"/>Invert\
            (hide questions entered here and leave others visible) \
        </td></tr>\
        <tr>\
            <td width="50%">\
                <input type="button" id="pmc_submit_set" value="Submit" />\
            </td>\
            <td width="50%">\
                <input type="button" id="pmc_abort_set" value="Abort" />\
            </td>\
        </tr>\
    </form>\
    </table>';
    $('body > :first-child', wf2d).before(newhtml);
    $('#question_set').focus();
    $('#pmc_submit_set', wf2d).click(set_form_submit);
    $('#pmc_abort_set', wf2d).click(screen_abort);
    $('#question_set', wf2d).bind('keydown', 'esc', screen_abort);
    $('#invert_box', wf2d).prop('checked', dfil_get_var('invert_qset')=='1');
    var set = dfil_get_filter('set_filter');
    if (set != false) { 
        $('#question_set', wf2d).val(set.join('\n'));
    }
    return false;
}

function set_form_submit() {
    var wf1d = window.frames[1].document;
    var wf2d = window.frames[2].document;
    var list = $('#question_set', wf2d).val();
    var invt = $('#invert_box', wf2d).prop('checked');
    var num = /\d+/;
    var splitter = /\s+/;
    list = list.split(splitter);
    list = list.filter( function(elem,indx,array) {
        return num.test(elem.trim());
    });
    // filter out double entries from the list so you can simply 
    // merge lists in the form ... 
    var list2 = [];
    for (var j=0; j<list.length; j++) {
        if (list2.indexOf(list[j]) == -1) {
            list2.push(list[j]);
        }
    }
    list = list2; 
    list2 = null; // garbage collection? ... hm. 
    // let's restore visibility for everything ;)
    screen_abort();
    // now we have the array of questions we want to see. 
    // now let's apply that stuff :)
    dfil_save_filter(list, 'set_filter');
    dfil_save_var('invert_qset', invt ? 1 : 0);
    dfil_reapply();
}

function set_reset() {
    dfil_save_filter(false, 'set_filter');
    dfil_save_var('invert_qset', 0);
    dfil_reapply();
    return false;
}


// ==========================================================================
// Goto screen
// ==========================================================================

function goto_screen() {
    var wf2d = window.frames[2].document;
    if (screen_check_already_there('pmc_goto')) { return false; }
    screen_prepare();
    var newhtml = '\
    <table width="50%" style="padding: 30px;" \
        id="pmc_goto" class="pmc_screen pmc_input_table">\
    <form>\
        <tr><td colspan="2" style="padding: 15px;">\
            Input the question number to jump to and press ENTER: \
        </td></tr>\
        <tr><td colspan="2" style="text-align: center; padding: 15px;">\
            <input type="text" size=5 name="qnumber" id="qnumber" />\
        </td></tr>\
        <tr>\
            <td width="50%" style="padding: 15px;">\
                <input type="submit" id="pmc_submit_set" value="Go to" />\
            </td>\
            <td width="50%" style="padding: 15px;">\
                <input type="button" id="pmc_abort_set" value="Abort" />\
            </td>\
        </tr>\
    </form>\
    </table>';
    $('body > :first-child', wf2d).before(newhtml);
    $('#pmc_submit_set', wf2d).click(goto_screen_submit);
    $('#pmc_abort_set', wf2d).click(screen_abort);
    var q = $('#qnumber', wf2d);
    q.bind('keydown', 'return', goto_screen_submit);
    q.bind('keydown', 'esc', screen_abort);
    return false;
}

function goto_screen_submit() {
    var wf1d = window.frames[1].document;
    var wf2d = window.frames[2].document;
    var qnumber = $('#qnumber', wf2d).val().trim();
    var qlist = [];
    $('table tr .bg', wf1d).each( function(i) {
        qlist.push($(this));
    }); 
    screen_abort();
    for (var i=0; i<qlist.length; i++) {
        var q = qlist[i];
        var qtext = q.text().trim();
        if (qtext == qnumber) {
            q.removeClass('hide-row');
            var filter_list = dfil_get_filter('set_filter');
            if (filter_list) {
                var found = false;
                for (var j=0; j<filter_list.length; j++) {
                    if (filter_list[j] == qtext)  {
                        found = true; 
                        break;
                    }
                }
                if (!found) {
                    filter_list.push(qtext);
                    dfil_save_filter(filter_list, 'set_filter');
                }
            }
            clickOn(q[0], wf1d);
            goTo(q, window.frames[1]);
            break;
        }
    }
    // SUBMIT methods MAY NOT RETURN FALSE!!!!
}


// ==========================================================================
// Help screen
// ==========================================================================

function help_screen() {
    // <tr><th>key</th><th>function</th></tr>\
    var wf2d = window.frames[2].document;
    if (screen_check_already_there('help_table')) { 
        return screen_abort();
    }
    screen_prepare();
    var newhtml = '\
    <table width="75%" id="help_table" class="pmc_screen" \
        style="margin-left: auto; margin-right: auto; padding:20px; ">\
        <tr>\
            <td colspan="2" style="text-align:center" id="dismiss">\
                <em><b style="color: #777">press ESC or click this text to dismiss help</b></em> \
            </td>\
        </tr>\
        <tr>\
            <td>Version</td>\
            <td>'+pmc_version+', \
            <a href="http://userscripts.org/scripts/show/97267" target="new" \
            >check for update</a></td>\
        </tr>\
        <tr>\
            <td>Questions</td>\
            <td>Axel &lt;justsomeoneoutthere@gmail.com&gt;</td>\
        </tr>\
        <tr><th colspan="2"><div style="align:center;">\
            Selecting answers\
        </div></th></tr> \
        <tr>\
            <td>1-4</td>\
            <td>directly select / unselect a question</td>\
        </tr>\
        <tr>\
            <td>0</td>\
            <td>unselect all questions</td>\
        </tr>\
        <tr>\
            <td>shift-left / shift-right</td>\
            <td>if there\'s an attachment, switch between attachment and the question itself</td>\
        </tr>\
        <tr>\
            <td>up / down</td>\
            <td>mark questions with keyboard</td>\
        </tr>\
        <tr>\
            <td>double-click on answer</td>\
            <td>same as marking it and pressing "n"</td>\
        </tr>\
        <tr><th colspan="2"><div style="align:center;">\
            Navigation & answering questions\
        </div></th></tr> \
        <tr>\
            <td><b style="color: red">input boxes</b></td>\
            <td>if your cursor is blinking within in input box, you can \
                <span style="color:red">use most of the single-key shortcuts,\
                but with the CTRL- modifier added.</span> \
                Example: <span style="color:red">&quot;s&quot;</span> \
                for <u>s</u>how solution \
                <span style="color:red">will become CTRL-s</span>. \
                ENTER will stay the same. Once the input box \
                is no longer active, the normal shortcuts will work again. \
            </td>\
        </tr>\
        <tr>\
            <td>ENTER</td>\
            <td>either go directly to next unanswered question, OR to next question if all are already answered</td>\
        </tr>\
        <tr>\
            <td>shift-ENTER</td>\
            <td>The same as ENTER, just backwards</td>\
        </tr>\
        <tr>\
            <td>g</td>\
            <td>go to question directly by number</td>\
        </tr>\
        <tr>\
            <td>s</td>\
            <td>show "solution"</td>\
        </tr>\
        <tr>\
            <td>m</td>\
            <td>"mark" question</td>\
        </tr>\
        <tr>\
            <td>f</td>\
            <td>"finish" session</td>\
        </tr>\
        <tr>\
            <td>n / p</td>\
            <td>go to next/previous question directly (without showing solution of answers)</td>\
        </tr>\
        <tr>\
            <td>+ / -</td>\
            <td>go to next/previous UNANSWERED question directly</td>\
        </tr>\
        <tr>\
            <td>b / B</td>\
            <td>go to previous / next <u>B</u>ADLY ;) \
                ANSWERED question.\
        </tr>\
        <tr>\
            <td>left / right</td>\
            <td>same as "left"/"right" buttons in navigation bar</td>\
        </tr>\
        <tr><th colspan="2"><div style="align:center;">\
            Filters & functions \
        </div></th></tr> \
        <tr>\
            <td>i</td>\
            <td>display question info</td>\
        </tr>\
        <tr>\
            <td>q</td>\
            <td>manually enter questions to be shown. \
            <span style="color:red;">cool stuff.</span></td>\
        </tr>\
        <tr>\
            <td>shift-1 - shift-4</td>\
            <td>set display filters (play with it!)</td>\
        </tr>\
        <tr>\
            <td>v</td>\
            <td>display visible questions. useful to copy/paste for later\
                use with &quot;q&quot;. this takes both the &quot;q&quot;\
                and the shift-1..shift-4 filters into account.</td>\
        </tr>\
        <tr>\
            <td>w / W</td>\
            <td>go to the question wiki to the page regarding the current \
                catalog subject. Just a registration\
                is required. The capital \'W\' opens the page directly in \
                edit mode. \
                <span style="color:red;">potentially very cool stuff.</span>\
            </td>\
        </tr>\
        <tr>\
            <td>shift-5</td>\
            <td>remove all display filters (the ones from shift-1 to shift-4)</td>\
        </tr>\
        <tr>\
            <td>shift-0</td>\
            <td>reapply current display & set filters</td>\
        </tr>\
        <tr>\
            <td>shift-6</td>\
            <td>remove the question set filter (the one you activate with \'q\')</td>\
        </tr>\
        <tr><th colspan="2"><div style="align:center;">\
            Well ... \
        </div></th></tr> \
        <tr>\
            <td style="vertical-align: middle;">\
                <form action="https://www.paypal.com/cgi-bin/webscr" style="margin: 0px;" method="post">\
                <input type="hidden" name="cmd" value="_s-xclick">\
                <input type="image" id="donatebutton" src="https://www.paypalobjects.com/WEBSCR-640-20110401-1/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online.">\
                <input type="hidden" name="hosted_button_id" value="57BWCFYLTLLAC">\
                <img alt="" border="0" src="https://www.paypalobjects.com/WEBSCR-640-20110401-1/de_DE/i/scr/pixel.gif" width="1" height="1">\
                </form>\
            </td>\
            <td>\
                <small>\
                The &quot;price&quot; for this little tool used to be a medium \
                sized latte macchiato. So if this tool helps you, please consider \
                donating one (2,50 EUR) if you really cannot get me in the flesh. \
                But I do prefer coffee in person, because this is more of a way to \
                let me know I have helped you, which makes me kind of happy. \
                </small>\
            </td>\
        </tr>\
    </table>';
    $('body > :first-child', wf2d).before(newhtml);
    $('#dismiss', wf2d).click(screen_abort);
    return false;
}


// ==========================================================================
// the ajax stuff for the question link :)
// ==========================================================================

function changeQboxLayout(qbox, color, qhtml) {
    qbox
        .attr('id', 'qbox')
        .addClass('qbox-class')
        .css('background-image', '')
        .css('cursor', 'pointer')
        .css('-moz-border-radius', '9px')
        .css('-webkit-border-radius', '9px')
        .css('border-radius', '9px')
        .css('border', '3px solid ' + color)
        .click(info_screen)
    .find('table')
        .css('height', '100%')
    .find('td')
        .html(qhtml);
}

function pimpAjax(qbox) {
    // now get the damn question id from that %&§/&! question id page
    // FIRST, find out whether we're working with HTTPS or HTTP
    // and use the same ... 
    var my_url = location.href;
    var my_url = my_url.substr(0, my_url.indexOf('://'))
        + '://training.cat-europe.com/ShowQuestionInfo.aspx';
    // SECOND, do the ajax call
    $.ajax(
        {
            url: my_url,
            cache: false,
            dataType: 'html', 
            success: function(data) {
                // kill all newline & CR in here, otherwise regexp search & 
                // replace will fail. bloody shit.
                data = data
                    .replace(/\n/g, "")
                    .replace(/\s/g, " ");
                // extract EVERYTHING INSIDE BODY as regexp
                // for jquery to be able to parse it.
                // bloody hellfire fucked up apeshit
                var body = $(data.match(/<body[^>]*>(.*)<\/body>/)[1]);
                var editor_id = body.find(
                    'table > tbody > '
                    + 'tr:nth-child(2) > td:nth-child(2)')
                    .text()
                    .trim();
                var url_base = 
                    body.find(
                    'table > tbody > '
                    + 'tr:nth-child(5) > td:nth-child(2)')
                    .text()
                    .trim();
                var url = url_base
                    .replace(/[^A-Za-z0-9]/g, "_")
                    .replace(/__/g, "_")
                    .replace(/_*$/, "");
                var color = '#76c276';
                var qnum = qbox.text().trim();
                var qhtml = qnum;
                if (editor_id != qnum) {
                    color = "orange";
                    qhtml = '<span style="color: #AAA">'
                        + qnum 
                        + '</span><br><small>('
                        + editor_id
                        + ')</small>';
                }
                $('head > title', document).html('CAT Q'+editor_id);
                changeQboxLayout(qbox, color, qhtml, url);
                // now add the "wiki-w"
                var after = $('<div id="wikiClickEnabled"\
                    alt="' + url_base + '"> \
                    <table width="100%" height="100%"> \
                        <tr><td>W</td></tr> \
                    </table></div>')
                    .attr('url', url)
                    .click(function() { goToWiki(); });
                qbox.after(after);
            }, 
            error: function() {
                changeQboxLayout(qbox, '#cc6363', qbox.text());
            }   
        }
    );
}

function goToWiki(edit) {
    var wf2d = window.frames[2].document;
    var target = $('#wikiClickEnabled', wf2d);
    var url_mid = ""; 
    if (edit) {
        url_mid = "page/edit/";
    }
    if (target.size()) {
        var url_end = target.attr('url');
        if (url_end != "") {
            open('http://lbastudentwiki.wikispaces.com/' + url_mid + url_end);
        }
    }
    return false;
}


// ==========================================================================
// Click on attachment tabs
// ==========================================================================

// test question: MET Q872
function attTab(offset) {
    var att_cur = $('.a_col_active', window.frames[2].document);
    if (att_cur.size()) {        
        var n_id = '#a_col' 
            + (parseInt(att_cur.attr('id').substr(5,6))+offset).toFixed(0);
        att_cur.removeClass('a_col_active');
    } else {
        var n_id = '#a_col1';
    }
    clickOn(
        $(n_id, window.frames[2].document)[0], 
        window.frames[2].document);
    $(n_id, window.frames[2].document).addClass('a_col_active');
    return false;
}


// ==========================================================================
// Keyboard navigation functions
// ==========================================================================

lastkeypress = 0;
function k()
{
    var c = new Date();
    if (c - lastkeypress < 25) { 
        logDate('Aborting keypress. Delta='+(c-lastkeypress).toString());
        return false; 
    }
    lastkeypress = c;
    return true;
}

function sel(num) {
    $('.q-answer[qpos="'+num.toString()+'"]', window.frames[2].document)
        .addClass('q-sel')
        .find(':input').prop('checked', true);
    return false;
}

function uns() {
    $('.q-answer', window.frames[2].document)
        .removeClass('q-sel')
        .find(':input')
        .attr('checked', false)
        .removeProp('checked');
    return false;
}

function advanceCursor(direction) {
    var q = $('.q-sel', window.frames[2].document);
    var a = $('.q-answer', window.frames[2].document);
    var t;
    if (q.size() == 0) {
        t = direction>0 ? 0 : a.size()-1;
    } else {
        t = parseInt(q.eq(0).attr('qpos')) + direction;
    }
    // now simply do it :)
    uns();
    return sel(t);
}

function scroll_current() {
    var n = initNeighbors();
    n = filterNeighbors(n);
    if (n[1].length) {
        goTo(n[1][0], window.frames[1]);
    }
    return false;
}


// ==========================================================================
// Keyboard shortcut initializations
// ==========================================================================

function logDate(logmessage) {
   GM_log(new Date().toLocaleFormat('%Y-%m-%d %H:%M.%S') + ": " + logmessage);
}

in_pimpKeyboardShortcuts = 0;
function pimpKeyboardShortcuts() {
    var wf2d = window.frames[2].document;
    // var it = [];
    // for (var i=0; i<window.frames.length; i++) it.push(window.frames[i].document);
    // // TODO is it really necessary to push the document itself? 
    // //it.push(document);
    // for (var i=0; i<it.length; i++) {
        // curr = it[i];
    if (in_pimpKeyboardShortcuts || 
        $('html', wf2d).hasClass('pimped-keyboard')) { return; }
    in_pimpKeyboardShortcuts = 1;
    logDate('pimpKeyboardShortcuts()');
    // navigation keys - n,p,+,-,r,return
    var ret = 'return';
    var srt = 'shift+return';
    var shb = 'shift+b';
    $(wf2d).bind('keydown', 'n', function() { return k() && key_nf(1); });
    $(wf2d).bind('keydown', 'p', function() { return k() && key_nf(0); });
    $(wf2d).bind('keydown', 'r', function() { return k() && current(); });
    $(wf2d).bind('keydown', ret, function() { return k() && key_enter(true); });
    $(wf2d).bind('keydown', srt, function() { return k() && key_enter(false); });
    $(wf2d).bind('keydown', '-', function() { return k() && key_nf(0, [2,0,0,0]); });
    $(wf2d).bind('keydown', '+', function() { return k() && key_nf(1, [2,0,0,0]); });
    $(wf2d).bind('keydown', 'b', function() { return k() && key_nf(0, [0,0,0,2]); });
    $(wf2d).bind('keydown', shb, function() { return k() && key_nf(1, [0,0,0,2]); });
    // up / down keyboard navigation
    $(wf2d).bind('keydown', 'down', function() { return k() && advanceCursor(1); });
    $(wf2d).bind('keydown', 'up', function() { return k() && advanceCursor(-1); });
    // ESC
    $(wf2d).bind('keydown', 'esc', function() { 
        return k() && !screen_abort() && uns(); 
    });
    // the keys 1-4 for the direct selection
    for (var j=0; j<4; j++) {
        // TODO DO NOT LIKE THIS
        let j_num = j;
        let j_key = (j+1).toString();
        $(wf2d).bind('keydown', j_key, function() { 
            return k() && !uns() && sel(j_num); 
        });
    }
    $(wf2d).bind('keydown', '0', function() { return k() && uns(); });
    // Go to wiki :)
    var shw = "shift+w";
    $(wf2d).bind('keydown', 'w', function() { return k() && goToWiki(); }); 
    $(wf2d).bind('keydown', shw, function() { return k() && goToWiki(1); }); 
    // filtering of answers - keys shift-1 .. shift-4, shift-0
    $(wf2d).bind('keydown', 'shift+1', function() { return k() && dfil(0); });
    $(wf2d).bind('keydown', 'shift+2', function() { return k() && dfil(1); });
    $(wf2d).bind('keydown', 'shift+3', function() { return k() && dfil(2); });
    $(wf2d).bind('keydown', 'shift+4', function() { return k() && dfil(3); });
    $(wf2d).bind('keydown', 'shift+5', function() { 
        dfil_apply_filter([0,0,0,0]); 
        return false;
    });
    $(wf2d).bind('keydown', 'shift+6', function() { return k() && set_reset(); });
    $(wf2d).bind('keydown', 'shift+0', function() { return k() && dfil_reapply(); });
    // the different screens - help, set filter, go to, info
    $(wf2d).bind('keydown', 'h', function() { return k() && help_screen(); });
    $(wf2d).bind('keydown', 'q', function() { return k() && set_form(); });
    $(wf2d).bind('keydown', 'g', function() { return k() && goto_screen(); });
    $(wf2d).bind('keydown', 'c', function() { return k() && scroll_current(); });
    $(wf2d).bind('keydown', 'i', function() { return k() && info_screen(); });
    $(wf2d).bind('keydown', 'v', function() { return k() && visi_screen(); });
    // nav bar mappers - left, right, m, s, f
    $(wf2d).bind('keydown', 'left',  function() { return k() && clickNB(1); });
    $(wf2d).bind('keydown', 'right', function() { return k() && clickNB(2); });
    $(wf2d).bind('keydown', 's',     function() { return k() && clickNB(3); });
    $(wf2d).bind('keydown', 'm',     function() { return k() && clickNB(4); });
    $(wf2d).bind('keydown', 'f',     function() { return k() && clickNB(9); });
    // attachment mappers
    $(wf2d).bind('keydown', "shift+left", function() { return k() && attTab(-1); });  
    $(wf2d).bind('keydown', "shift+right", function() { return k() && attTab(1); });  
    $('html', wf2d).addClass('pimped-keyboard');    
    in_pimpKeyboardShortcuts = 0;
}

function pimpInputBoxes(answers) {
    var ret = "return";
    var srt = "shift+return";
    var ctrlandl = 'ctrl+left';
    var ctrlandr = 'ctrl+right';
    answers.each( function(idx) {
        // make TAB work ...
        $(this).bind('keydown', 'tab', function() { 
            let let_idx = idx;
            if (let_idx == answers.length - 1) {
                answers[0].focus();
            } else {
                answers[let_idx + 1].focus();
            }
        });
        // bind nav stuff
        $(this).bind('keydown', ret, function() { return k() && key_enter(true); });
        $(this).bind('keydown', srt, function() { return k() && key_enter(false); });
        $(this).bind('keydown', 'ctrl+n', function() { return k() && key_nf(1); });
        $(this).bind('keydown', 'ctrl+p', function() { return k() && key_nf(0); });
        $(this).bind('keydown', 'ctrl+s', function() { return k() && clickNB(3); });
        $(this).bind('keydown', 'ctrl+m', function() { return k() && clickNB(4); });
        $(this).bind('keydown', 'ctrl-c', function() { return k() && scroll_current(); });
        $(this).bind('keydown', 'ctrl+f', function() { return k() && clickNB(9); });
        $(this).bind('keydown', ctrlandl, function() { return k() && clickNB(1); });
        $(this).bind('keydown', ctrlandr, function() { return k() && clickNB(2); });
        // screens & wiki
        $(this).bind('keydown', 'ctrl+h', function() { return k() && help_screen(); });
        $(this).bind('keydown', 'ctrl+g', function() { return k() && goto_screen(); });
        $(this).bind('keydown', 'ctrl+i', function() { return k() && info_screen(); });
        $(this).bind('keydown', 'ctrl+v', function() { return k() && visi_screen(); });
        $(this).bind('keydown', 'ctrl+q', function() { return k() && set_form(); });
        $(this).bind('keydown', 'ctrl+w', function() { return k() && goToWiki(); });
        // attachment convenience :)
        $(this).bind('keydown', "shift+right", function() { return k() && attTab(1); });  
        $(this).bind('keydown', "shift+left", function() { return k() && attTab(-1); });  
    });
}

function pimpCheckboxes(answers) {
    var wf2d = window.frames[2].document;
    // bubblesort
    var swapped = true;
    var order = []; 
    for (var i=0; i<answers.size(); i++) { order.push(i); }
    while (swapped) {
        swapped = false;
        for (i=0; i<answers.size()-1; i++) {
            t0 = parseInt(answers.eq(order[i  ]).css('top'));
            t1 = parseInt(answers.eq(order[i+1]).css('top'));
            if (t0>t1) {
                swapped = true;
                var tmp = order[i];
                order[i] = order[i+1];
                order[i+1] = tmp;
            }
        }
    }
    // now answers is sorted, the biggest element should be at the end
    // ONLY preparation of answers and mouse pimping here ... 
    for (var i=0; i<order.length; i++) {
        // FORMERLY see here: http://mzl.la/dIqEqA
        var current = answers.eq(order[i]);
        // add the question position here :)
        current
            .attr('qpos', i.toString())
            .addClass('q-answer');
        // now add the mouse highlights and clicks
        current.find('table table').click( function () {
            var newval = ! $(this).find(':input').attr('checked');
            var mypar = $(this).closest('.q-answer');
            // uncheck everything else
            $('.q-sel', window.frames[2].document).removeClass('q-sel');
            $('.q-answer :input', window.frames[2].document)
                .attr('checked', false)
                .removeProp('checked');
            // now check or uncheck :)
            if (newval) {
                mypar.addClass('q-sel');
            }
            mypar.find(':input').prop('checked', newval);
            return false;
        });
        current.find('table table').dblclick( function () {
            $('.q-sel', window.frames[2].document).removeClass('q-sel');
            $(this).addClass('q-sel');
            $(this).find(':input').attr('checked', true);
            key_enter(true);
            return false;
        });
        current.hover( function() {
            $(this).addClass('q-high');
        }, function () {
            $(this).removeClass('q-high');
        });
        // move "cursor" over pre-selected answer if present
        if (current.find(':input').prop('checked')) {
            current.addClass('q-sel');
        }
    }
}

function pimpAnswers() {
    var wf2d = window.frames[2].document;
    // get the real question id from the info terminal :)
    if (! $('html', wf2d).hasClass('id-present')) {
        qbox = getQBox();
        if (qbox) {
            logDate('pimpAnswers() - pimping AJAX');
            pimpAjax(qbox); 
            logDate('pimpAnswers() - pimping AJAX DONE');
            $('html', wf2d).addClass('id-present');
        }
    }
    // if we did that already - just exit.
    if ($('html', wf2d).hasClass('fully-question-pimped')) {
        return;
    }
    // we can't kill that calculator shit, cause then the annexes
    // won't work for *some* reason. This is the most incompetent
    // and fucked up pice of shit work I have ever seen. 
    // MAYBE this was the memory leak source
    $('#calculator', wf2d).find('input').remove();
    // now start.
    var answers = $('form input:checkbox', wf2d).closest('div');
    if (answers.size() == 4) {
        logDate('pimpAnswers() - pimping checkboxes');
        // just assume the answer number is 4 and perform a little bubblesort.
        pimpCheckboxes(answers);
        $('html', wf2d).addClass('fully-question-pimped');
    } else {
        answers = $('form div input:text', wf2d);
        if (answers.size()) {
            logDate('pimpAnswers() - pimping input boxes');
            pimpInputBoxes(answers);
            $('html', wf2d).addClass('fully-question-pimped');
        }
    }
}


// ==========================================================================
// Core functionality & style injection
// ==========================================================================

function checkInjectedStyles() {
    // style for the question's mouseover highlight
    var wf1d = window.frames[1].document;
    var wf2d = window.frames[2].document;
    var h;
    // first frame - hiding of questions
    h = $('head', wf1d);
    if (! h.hasClass('pimp_styles')) {
        logDate('inject styles wf1d');
        s = '\
            <style type="text/css"> \
                .hide-row { \
                    display: none; \
                } \
            </style>';
        $(s).appendTo(h);
        h.addClass('pimp_styles');
    }
    // second frame - styles for the questions (mouseover, keyboard select)
    h = $('head', wf2d);
    if (! h.hasClass('pimp_styles')) {
        logDate('inject styles wf2d');
        s1 = '\
            <style type="text/css"> \
                .infobox { \
                    position: absolute; \
                    display: block; \
                    bottom: 30px; \
                    margin-left: auto; \
                    margin-right: auto; \
                    z-index: 10000; \
                    font-family: verdana, sans \
                    } \
            </style>';
        s2 = '\
            <style type="text/css"> \
                .q-high { \
                    background-color: #cccccc; \
                    -moz-border-radius: 0.5em; \
                    -webkit-border-radius: 0.5em; \
                    border-radius: 0.5em; \
                    } \
                .q-sel { \
                    background-color: #8ee88e !important; \
                    -moz-border-radius: 0.5em; \
                    -webkit-border-radius: 0.5em; \
                    border-radius: 0.5em; \
                    } \
                </style>';
        s3 = '\
            <style type="text/css"> \
                .hide-row { \
                    display: none; \
                } \
            </style>';
        s4 = '\
            <style type="text/css"> \
                #help_table { \
                    font-family: verdana; \
                    font-size: 0.9em; \
                    border-spacing: 0px; \
                } \
            </style>';
        s5 = '\
            <style type="text/css"> \
                #help_table td, #help_table th { \
                    padding-top: 5px; \
                    padding-bottom: 5px; \
                    padding-right: 5px; \
                    border-bottom: 2px solid #aaaaaa; \
                    border-collapse: collapse; \
                } \
            </style>';
        s6 = '\
            <style type="text/css"> \
                #message_table { \
                    margin-left: auto; \
                    margin-right: auto; \
                    font-family: verdana; \
                    padding-top: 50px; \
                    padding-bottom: 5px; \
                } \
            </style>';
        s7 = '\
            <style type="text/css"> \
                .pmc_input_table { \
                    position: absolute; \
                    top: 75px; \
                    margin-left: 12.5%; \
                    font-family: verdana; \
                    padding: 15px; \
                    background-color: #ccc; \
                    border: 2px solid #666; \
                    width: 75%; \
                } \
            </style>';
        s75 = '\
            <style type="text/css"> \
                .pmc_input_table td { \
                    padding-top: 7px; \
                    padding-bottom: 7px; \
                } \
            </style>';
        s8 = '\
            <style type="text/css"> \
                #pmc_set_table td, #pmc_set_table th  { \
                    border-style: none; \
                    padding: 15px; \
                } \
            </style>';
        s9 = '\
            <style type="text/css"> \
                #wikiClickEnabled { \
                    -moz-border-radius: 15px; \
                    border-radius: 15px; \
                    background-color: 76c276; \
                    position: absolute; \
                    top: 90px; \
                    left: 21px; \
                    width: 30px; \
                    height: 30px; \
                    cursor: pointer; \
                } \
            </style>';
        s10 = '\
            <style type="text/css"> \
                #wikiClickEnabled td { \
                    font-family: Verdana; \
                    font-weight: bold; \
                    text-align: center; \
                    color: white; \
                    vertical-align: middle; \
                    align: center; \
                } \
            </style>';
        $(s1).appendTo(h);
        $(s2).appendTo(h);
        $(s3).appendTo(h);
        $(s4).appendTo(h);
        $(s5).appendTo(h);
        $(s6).appendTo(h);
        $(s7).appendTo(h);
        $(s75).appendTo(h);
        $(s8).appendTo(h);
        $(s9).appendTo(h);
        $(s10).appendTo(h);
        h.addClass('pimp_styles');
    }
    h = $('head', window.frames[0].document);
    if (! h.hasClass('pimp_styles')) {
        logDate('inject styles wf0d');
        s01 = '\
            <style type="text/css"> \
                #pimpmyCAT { \
                    font-family: Arial; \
                    color: #cccccc; \
                    font-size: 8pt; \
                    position: fixed; \
                    top: 2px; \
                    right: 5px; \
                    width: 250px; \
                    padding: 2px; \
                } \
            </style>';
        s02 = '\
            <style type="text/css"> \
                #pimpmyCAT table { \
                    color: #cccccc; \
                    font-size: 8pt; \
                    width: 100%; \
                    border: 0px; \
                    padding: 0px; \
                    margin: 0px; \
                } \
            </style>';
        $(s01).appendTo(h);
        $(s02).appendTo(h);
        h.addClass('pimp_styles');
    }  
}


// ==========================================================================
// THE MAGIC. THE PUMPING HEART.
// ==========================================================================

function update() {
    if (! perfUpdate) { return; }
    perfUpdate = false;
    withinLoop = true;
    try {    
        checkInjectedStyles();
        updateStatBox();        
        pimpAnswers();
        pimpKeyboardShortcuts();
    } catch (e) {
        alert('ERROR: '+e.message);
        logDate('ERROR: '+e.message);
    }
    withinLoop = false;
}

withinloop = false;
perfUpdate = true;
$(document).ready( function() {
    setInterval(update, 200);
    
    $(window.frames[1]).bind('DOMSubtreeModified', function() { 
        if (! withinLoop) { perfUpdate = true; }
        return false;
    });
});
