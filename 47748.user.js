// ==UserScript==
// @name           Vampire Wars Combat Heat Map
// @namespace      taocode
// @description    Highlights Skill Ranking and Clan Size in progressive colors to help spot the next best victim.
// @include        http://apps.facebook.com/vampiresgame/fight.php*
// ==/UserScript==

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = '; expires='+date.toGMTString();
    }
    else var expires = '';
    document.cookie = name+'='+value+expires+'; path=/';
}

function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

CLAN_SIZE = 'vampire_wars_clan_size';
REMOVE_FRESH_MEAT = 'vampire_wars_remove_fresh_meat';
SORT_BY = 'vampire_wars_sort_by';
//eraseCookie(COOKIE_NAME);
var clan_size = readCookie(CLAN_SIZE);
var remove_fm = readCookie(REMOVE_FRESH_MEAT) == 'y';
var sort_by = readCookie(SORT_BY);

function setCookies() {
    while (! clan_size || clan_size < 1 || clan_size > 501) {
        clan_size = parseInt(prompt('What is Your Clan Size?\n(A number between 1-501)'));
        createCookie(CLAN_SIZE,clan_size,1000);
    }
    remove_fm = confirm('Remove Fresh Meat Too?');
    createCookie(REMOVE_FRESH_MEAT,remove_fm ? 'y' : 'n',1000);
    sort_by = confirm("Sort By Skill Ranking?\nChoose Cancel to Sort By Clan Size.");
    sort_by = sort_by ? 'sr' : 'cs';
    createCookie(SORT_BY, sort_by, 1000);
}

function sortRowByClanSize(a,b) {
   csa = parseInt(a.cells[2].innerHTML);
   csb = parseInt(b.cells[2].innerHTML);
   if (isNaN(csa) || isNaN(csb)) return -1;
   if (csa == csb) {
        sra = parseInt(a.cells[1].innerHTML.replace(',',''));
        srb = parseInt(b.cells[1].innerHTML.replace(',',''));
        if (isNaN(sra) || isNaN(srb)) return -1;
        return sra - srb;
   }
   return csa - csb;
}

function sortRowBySkillRanking(a,b) {
    sra = parseInt(a.cells[1].innerHTML.replace(',',''));
    srb = parseInt(b.cells[1].innerHTML.replace(',',''));
    if (isNaN(sra) || isNaN(srb)) return -1;
    if (sra == srb) {
        csa = parseInt(a.cells[2].innerHTML);
        csb = parseInt(b.cells[2].innerHTML);
        if (isNaN(csa) || isNaN(csb)) return -1;
        return csa - csb;
    }
    return sra - srb;
}

// begin the begin
if (! clan_size) setCookies();

// find the fight table
var ftable, tables = document.getElementsByTagName('table');
for (var i = 0; i < tables.length; i++) {
    if (tables[i].className && tables[i].className.indexOf('fight_table') >= 0)
        ftable = tables[i];
}
el = ftable.rows[0].cells[0];
el.innerHTML = '<div style="float:right;"><a href="#" onclick="document.cookie = \''+CLAN_SIZE+'=; expires=-1; path=/\'; history.go(0);" title="Your Clan Size is used to colorize the Combat Heat Map. Click to Change it!">Your Clan Size: '+clan_size+'</a> <a href="http://taocode.com/hacking/vw-combat-heat-map" target="_blank" style="color:#00CC00" title="Click for More Information about Vampire Wars Combat Heat Map">(?)</a></div>' + el.innerHTML;

sorted_rows = new Array();
orig_rows = ftable.rows;
orig_num_rows = orig_rows.length;
for (var i = 1; i < orig_num_rows; i++) {
    // only add to the sorting rows if it's good
    if (! remove_fm || parseInt(orig_rows[i].cells[2].innerHTML))
        sorted_rows.push(orig_rows[i]);
}

for (var i = 1; i < orig_num_rows; i++) {
    ftable.deleteRow(1);
}

if (sort_by == 'sr') sorted_rows.sort(sortRowBySkillRanking);
else sorted_rows.sort(sortRowByClanSize);


// To sort by ascending order use this line and comment out the next
//for (var i = sorted_rows.length - 1; i > -1; i--) {
for (var i = 0; i < sorted_rows.length; i++) {
    cr = sorted_rows[i];
    nr = ftable.insertRow(1);
    nr.innerHTML = cr.innerHTML;
}

// extract skill tops and bottoms
var skill_top = 0, skill_bottom = 999999999;
for (var r = 1; r < sorted_rows.length; r++) {
    var tcells = sorted_rows[r].cells;
    var i_skill = parseInt(tcells[1].innerHTML.replace(',',''));
    if (i_skill > skill_top) skill_top = i_skill;
    if (i_skill < skill_bottom) skill_bottom = i_skill;
}

// colorize based on the theory of relativity...
for (var i = 1; i < ftable.rows.length; i++) {
    row = ftable.rows[i];
    el_skill = row.cells[1];
    el_size = row.cells[2];
    el_action = row.cells[3];
    f_skill = parseFloat(el_skill.innerHTML.replace(',',''));
    f_size = parseFloat(el_size.innerHTML);
    rel_skill = parseFloat(f_skill - skill_bottom) / parseFloat(skill_top - skill_bottom);
    c_skill = parseInt(rel_skill * 255);
    b = c_skill;
    el_skill.style.backgroundColor = 'rgb(0,0,'+ b +')';
    
    size_delta = parseFloat(f_size - clan_size);
    rel_size = 1 - ( Math.abs(size_delta) / parseFloat(clan_size) );
    c_size = parseInt(rel_size * 255);
    var r = 0, g = 0;
    if (size_delta > 0) r = c_size;
    else g = c_size;
    el_size.style.backgroundColor = 'rgb('+r+','+g+',0)';
    el_action.style.backgroundColor = 'rgb('+r+','+g+','+b+')';
}