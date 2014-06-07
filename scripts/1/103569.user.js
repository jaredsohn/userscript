// ==UserScript==
// @name          PMC subject readability
// @namespace     http://pmc_mc.fca09
// @description   Make main screen subject selector usable.
// @include       http://training.cat-europe.com/MainPage.aspx
// @include       https://training.cat-europe.com/MainPage.aspx
// @version       2.1
// @id            pimpmycat_main@ptntools
// @author        Axel Bock <axel.bock.mail@gmail.com>
// @require       http://code.jquery.com/jquery-1.6.min.js
// ==/UserScript==



checker = 0;

replacements = {   
    "FCA09" : [ 
        ["ETEC",    "ETEC"], 
        ["AL",      "AIR LAW"], 
        ["PP",      "PPLANT"], 
        ["AFS",     "AIRFRAME AND SYSTEMS"], 
        ["INSTR",   "INST"], 
        ["M&amp;B", "M+B"], 
        ["PERF",    "PERF"], 
        ["FPLN",    "FPL"], 
        ["PSYC",    "HPL - PSYC"], 
        ["2-PHYS",  "HPL - PHYS"], 
        ["MET",     "MET"], 
        ["GNAV",    "GNAV"], 
        ["RNAV",    "RNAV"], 
        ["OPS",     "OPS"], 
        ["AERO",    "POF"], 
    ], 
    "FCA11" : [ 
        ["8114", "Principles of flight (8114)"], 
        ["114",  "Air law (114)"], 
        ["214",  "Instruments / Airframe (214)"], 
        ["314",  "M+B / Performance / Flight planning (314)"], 
        ["414",  "Human performance &amp; limitations (414)"], 
        ["514",  "Meteorology (514)"], 
        ["614",  "General + radio navigation (614)"], 
        ["714",  "Operations (714)"], 
        ["914",  "(Communications (914))"], 
    ],
};

function submitCourse() {
    GM_setValue('PTN_course', $('#pmcselect', window.frames[0].document).val());
    location.reload();
}

function clearSettings() {
    GM_setValue('PTN_course', false);
    location.reload();
}

function changeDropDown() {
    var wf0d = window.frames[0].document;
    var dd = $('#cbKatalog option', wf0d);
    if (! dd.size() || dd.hasClass('pimped')) { return; }
    dd.addClass('pimped');
    if (! GM_getValue('PTN_course')) {
        var h = '<td style="padding:5px;font-family:arial;font-size:8pt">select your course:<br>'+
                '<select id="pmcselect">%OPTIONS%</select>'+
                '<span style="background-color: #ccc; color:white;'+
                'border-radius:3px;padding:3px;" id="pmcsub">OK</span></td>';
        var opts = "";
        for (var s in replacements) {
            opts += "<option>"+s+"</option>";
        }
        h = h.replace("%OPTIONS%", opts);
        dd.closest('td').before(h);
        $('#pmcsub', wf0d).click(submitCourse);
    } else {
        var replacement = replacements[GM_getValue('PTN_course')];
        dd.each( function() {
            for (var i=0; i<replacement.length; i++) {
                var ih = $(this).html();
                if (ih.indexOf(replacement[i][0]) > -1) {
                    $(this).html(replacement[i][1]);
                    break;
                }
            }
        });
        var x = '<span style="background-color:red; color:white;'+
        'border-radius:3px;padding:1px;font-family:arial;font-size:6pt;" id="pmcclear">x</span>';
        dd.closest('td')
            .find(':first')
            .before(x);
        $('#pmcclear', wf0d).click(clearSettings);
    }
}


$(document).ready( function() {
    checker = setInterval(changeDropDown, 100)
});    

