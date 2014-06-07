// ==UserScript==
// @name           Travian: Show Bounty info
// @version        1.0.6
// @author         danmana
// @namespace      http://userscripts.org/users/103443
// @description    Shows the total/max bounty and losses.
// @include        http://s*.travian*/berichte.php*
// @include        http://s*.travian*/nachrichten.php*
// @include        http://s*.travian.*/build.php*
// @include        http://s*.travian.*/a2b.php*
// ==/UserScript==

// Thanks to Jinnie (http://userscripts.org/users/103897) 
// for improving the script to show bounty info also in the rally point list.

//TODO: add more functions (show info for defender as well)
//TODO: add an option panel to enable/disable functions


/**
 * An associative array holding patterns.
 * @type {Array}
 */
var PATTERN = new Array();
PATTERN['bounty_table'] = '//table[tbody/tr/td/div/@class="res"]';
PATTERN['bounty_inner'] = 'tbody/tr/td/div[@class="res"]';
PATTERN['sent_troops'] = 'tbody[@class="units"]/tr[2]/td/text()';
PATTERN['lost_troops'] = 'tbody[@class="units"]/tr[3]/td/text()';
PATTERN['attacker_img'] = 'tbody[@class="units"]/tr/td/img';
PATTERN['select_all'] = '//table[@id="overview"]/tfoot/tr[1]/th[1]';
PATTERN['all_checkboxes'] = '//table[@id="overview"]/tbody/tr/td/input[@type="checkbox"]';

/**
 * Training cost for each unit (4),
 * load capacity (1),
 * attack power (1),
 * defense power infantry (1),
 * defense power cavalry (1),
 * speed (1),
 * crop consumption(1)
 * @type {Array}
 */
var troop_stats = [[//Romans
[120, 100, 150, 30, 50, 40, 35, 50, 6, 1],//Legionnaire
 [100, 130, 160, 70, 20, 30, 65, 35, 5, 1],//Praetorian
 [150, 160, 210, 80, 50, 70, 40, 25, 7, 1],//Imperian
 [140, 160, 20, 40, 0, 0, 20, 10, 16, 2],//Equites legati
 [550, 440, 320, 100, 100, 120, 65, 50, 14, 3],//Equites imperatoris
 [550, 640, 800, 180, 70, 180, 80, 105, 10, 4],//Equites cesaris
 [900, 360, 500, 70, 0, 60, 30, 75, 4, 3],//Battering ram
 [950, 1350, 600, 90, 0, 75, 60, 10, 3, 6],//Fire catapult
 [30750, 27200, 45000, 37500, 0, 50, 40, 30, 4, 5],//Senator
 [5800, 5300, 7200, 5500, 3000, 0, 80, 80, 5, 1]//Settler
], [//Teutons
[95, 75, 40, 40, 60, 40, 20, 5, 7, 1],//Club swinger
 [145, 70, 85, 40, 40, 10, 35, 60, 7, 1],//Spearman
 [130, 120, 170, 70, 50, 60, 30, 30, 6, 1],//Axeman
 [160, 100, 50, 50, 0, 0, 10, 5, 9, 1],//Scout
 [370, 270, 290, 75, 110, 55, 100, 40, 10, 2],//Paladin
 [450, 515, 480, 80, 80, 150, 50, 75, 9, 3],//Teutonic knight
 [1000, 300, 350, 70, 0, 65, 30, 80, 4, 3],//Ram
 [900, 1200, 600, 60, 0, 50, 60, 10, 3, 6],//Catapult
 [35500, 26600, 25000, 27200, 0, 40, 60, 40, 4, 4],//Chief
 [7200, 5500, 5800, 6500, 3000, 10, 80, 80, 5, 1]//Settler
], [//Gauls
[100, 130, 55, 30, 35, 15, 40, 50, 7, 1],//Phalanx
 [140, 150, 185, 60, 45, 65, 35, 20, 6, 1],//Swordsman
 [170, 150, 20, 40, 0, 0, 20, 10, 17, 2],//Pathfinder
 [350, 450, 230, 60, 75, 90, 25, 40, 19, 2],//Theutates thunder
 [360, 330, 280, 120, 35, 45, 115, 55, 16, 2],//Druidrider
 [500, 620, 675, 170, 65, 140, 50, 165, 13, 3],//Haeduan
 [950, 555, 330, 75, 0, 50, 30, 105, 4, 3],//Ram
 [960, 1450, 630, 90, 0, 70, 45, 10, 3, 6],//Trebuchet
 [30750, 45400, 31000, 37500, 0, 40, 50, 50, 5, 4],//Chieftain
 [5500, 7000, 5300, 4900, 3000, 0, 80, 80, 5, 1]//Settler
]];

/**
 * Set this true if any errors are encountered.
 * @type {Boolean}
 */
var ERROR = false;
/**
 * Set this true to see more details about the errors encountered.
 * @type {Boolean}
 */
var DEBUG = false;

window.addEventListener('load', show_info, false);

/**
 * The main function.
 */
function show_info(){
    ERROR = false;
    if (((document.location.href.match('berichte.php')) || (document.location.href.match('nachrichten.php'))) && (!document.location.href.match('id='))) {
        //one of the overview pages
        show_select_all();
    }
    else if (document.location.href.match('berichte.php\\?id=')) {
        var attackerTable = getPatternResult(PATTERN['bounty_table']);
        if (attackerTable != null) {
            show_bounties(attackerTable);
            show_losses(attackerTable.snapshotItem(0));
        }
    }
    else if (document.location.href.match('build.php')) {
        var infoTables = getPatternResult(PATTERN['bounty_table']);
        if (infoTables != null) {
            show_bounties(infoTables);
        }
    }
    else if (document.location.href.match('a2b.php')) {
        show_troop_capacity();
        
    }
    
    if (ERROR) 
        alert('Errors encountered while running the script.' +
        ((typeof GM_log == 'function') ? '\nSee JavaScript Console for more messages.' : '') +
        (DEBUG ? '' : '\nSet DEBUG = true to view more more details.'));
}

function show_troop_capacity(){
    var table = document.getElementById('troops');
    var lastTd = getPatternResult('tbody/tr/td', table);
    lastTd = lastTd.snapshotItem(lastTd.snapshotLength - 1);
    var bounty_img = document.createElement('img');
    bounty_img.setAttribute('src', 'data:image/gif;base64,R0lGODlhDwAQAOZ/AKqlmopuQKyMVpqETFdGI3psSqaXe6ySVczJwpWKcqSdjuLf2aWKWWdQLJqUhYRxQ3tjQLy3qtnTzk09IlpVRod9aP38+mFLLMLBtJ2FW/f38qmOXKWKVpd7RpuOaaKGVN7c1vTz7m5bMpODXHdfN////o12QqqPWqOFRaeNV5d9TotzRYtxQmhVLoBnP62PWJl6Sop1Rf7+/f39/aKhmqiGVI9xRaSHUph+TZGAZJyFYWFTP21WOqiLXY9ySuzp5J+MVJF4SZR5SOLh3Z2AVGVOJ722pfHu525iNrCkiLSvoLe3sk1EKcS7ZVlKNF9XPpF0SH59aczIv/n595GCaXdqMW9qUIVpPGFSNI99Tp6LWnJaK2tVMmpfPquKWNTLxMvGuKSRWKuPXefm4u/s6aGLUqSPUDsvGISBb3ttQIJnN7iuYYBsN5iQe4lrPIVwTZF+TIuAXPPz8/b19WJUKKCCUaKMYpmBULCTW5mAVJ2HU2NFJpp8SVZBIZ1+TP///yH5BAEAAH8ALAAAAAAPABAAAAfsgH+CfyFSVkoIDksyQwgWglMRCR5rdDwXbRFoURh/cxUtF2xNdHsuTxVgITQlDg0rKy5VSA8EFAoSMnIyCXYnLCoHYSJnFBgzg0cjQFkiDDEEE1gAMoMWcVVpLSQtRS4kfQDIfwsjbA8PJBB5KgFbBAB/GgZ3dRspH0QMHTZXF0wavmjhAwPPCwEfOJgI4uaCk3kfYLDgIOBFihQDBqjpU0GGDj81fEDhIEaMECE4uEwA8ScDCgE9OJwQw4BFBhc7FghKYubGhwMvDpSBk6YLS0FkPOgxUcfLgBgFHIwZJOiHkRwQ3lBRoJPqn0AAOw==');
    bounty_img.style.paddingRight = '5px';
    bounty_img.setAttribute('title','Capacity');
    var bounty_info = document.createElement('input');
    bounty_info.id = 'bounty_info';
    bounty_info.setAttribute('type', 'text');
    bounty_info.setAttribute('class', 'text disabled');
    bounty_info.setAttribute('readonly', 'readonly');
    bounty_info.setAttribute('style', 'grow:true;');
    bounty_info.value = getTroopCapacity(table);
    var refresh_function = function(){
        bounty_info.value = getTroopCapacity(table);
        if (bounty_info.value.length > 4) 
            bounty_info.style.width = bounty_info.value.length * 7.5 + 'px';
        else 
            bounty_info.style.width = '30px';
        //bounty_info.value = parseInt(bounty_info.value)/1000 + 'K';//maybe better?
    };
    var input_fields = getPatternResult('tbody/tr/td/input[@name]', table);
    for (var i = 0; i < input_fields.snapshotLength; i++) 
        input_fields.snapshotItem(i).addEventListener('keyup', refresh_function, false);
    var links = getPatternResult('tbody/tr/td/a[@onclick]', table);
    for (var i = 0; i < links.snapshotLength; i++) 
        links.snapshotItem(i).addEventListener('click', refresh_function, false);
    var bounty_refresh = document.createElement('a');
    bounty_refresh.innerHTML = '(R)';
    bounty_refresh.setAttribute('href', '#');
    bounty_refresh.style.paddingLeft = '3px';
    bounty_refresh.addEventListener('click', refresh_function, false);
    lastTd.appendChild(bounty_img);
    lastTd.appendChild(bounty_info);
    lastTd.appendChild(bounty_refresh);
}

function getTroopCapacity(table){
    var attackerRace = getAttackerRaceIndex(table, 'tbody/tr[1]/td[1]/img');
    var input_fields = getPatternResult('tbody/tr/td/input[@name]', table);
    var sum = 0;
    for (var i = 0; i < input_fields.snapshotLength; i++) {
        var input = input_fields.snapshotItem(i);
        var count = parseInt(input.value);
        var unitIndex = parseInt(input.getAttribute('name').substring(1)) - 1;
        if ((!isNaN(count)) && (!isNaN(unitIndex))) 
            sum += count * troop_stats[attackerRace][unitIndex][4];
    }
    return sum;
}

/**
 * Show a 'Select All' checkbox on the reports/messages pages.
 */
function show_select_all(){
    var th = getPatternResult(PATTERN['select_all']).snapshotItem(0);
    if (th == null) 
        return;
    th.innerHTML = '<input type="checkbox"/>';
    th.setAttribute('title', 'Select All');
    th.firstChild.setAttribute('onclick', '');//apparently Opera does not add event listeners unless there is already an onclick attribute
    th.firstChild.addEventListener('click', function(){
        var checkboxes = getPatternResult(PATTERN['all_checkboxes']);
        for (var i = 0; i < checkboxes.snapshotLength; i++) 
            checkboxes.snapshotItem(i).checked = this.checked;
    }, true);
}

/**
 * Show the total/max bounty for the attacks.
 * @param {XPathResult} infoTables A list containing tables for which to show bounty info.
 */
function show_bounties(infoTables){
    for (var i = 0; i < infoTables.snapshotLength; i++) {
        var bountyTable = infoTables.snapshotItem(i);
        var bounty_total = getTotalBounty(bountyTable);
        var bounty_max = getMaximumBounty(bountyTable);
        var bounty_total_div = document.createElement('div');
        bounty_total_div.style.cssFloat = 'right';
        bounty_total_div.style.width = 'auto';
        bounty_total_div.id = 'bounty_info' + i;
        bounty_total_div.style.color = (bounty_total < bounty_max) ? 'green' : 'red';
        bounty_total_div.innerHTML = 'bounty: ' + bounty_total + '/' + bounty_max;
        var bountyDiv = getPatternResult(PATTERN['bounty_inner'], bountyTable).snapshotItem(0);
        bountyDiv.parentNode.appendChild(bounty_total_div);
    }
}


/**
 * Show the amount of resources the troops lost cost.
 * @param {Node} table The table that contains the troops info.
 */
function show_losses(table){
    var bountyDiv = getPatternResult(PATTERN['bounty_inner'], table).snapshotItem(0);
    if (bountyDiv == null) 
        return;
    var images = bountyDiv.getElementsByTagName('img');
    if ((images == null) || (images.length < 4)) {
        error('Could not get the resource images from the resource div.');
        return;
    }
    var bounty = getResourcesStolen(table);
    var lost = getResourcesLost(table);
    
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    var td = document.createElement('td');
    var div = document.createElement('div');
    var losses = [document.createElement('span'), document.createElement('span'), document.createElement('span'), document.createElement('span')];
    
    tr.id = 'losses_info';
    th.innerHTML = 'Losses';
    td.colSpan = '11';
    div.style.cssFloat = 'left';
    
    for (var i = 0; i < 4; i++) {
        div.appendChild(images[i].cloneNode(true));
        losses[i].innerHTML = lost[i] + ((i < 3) ? ' | ' : '');
        losses[i].style.color = (lost[i] > bounty[i]) ? 'red' : ((lost[i] > bounty[i] / 2) ? 'orange' : 'green');
        div.appendChild(losses[i]);
    }
    
    td.appendChild(div);
    tr.appendChild(th);
    tr.appendChild(td);
    bountyDiv.parentNode.parentNode.parentNode.appendChild(tr);
}

/**
 * @return {Number} The total amount of resources stolen.
 * @param {Node} table The table that contains the bounty info.
 */
function getTotalBounty(table){
    var stolen = getResourcesStolen(table);
    var total = 0;
    for (var i = 0; i < stolen.length; i++) 
        total += stolen[i];
    return total;
}

/**
 * @return {Number} The maximum bounty the remaining living troops could have carried back.
 * @param {Node} table The table that contains the bounty info.
 */
function getMaximumBounty(table){
    var attackerRace = getAttackerRaceIndex(table);
    if (attackerRace < 0) 
        return NaN;
    var sent = getTroopsSent(table);
    var lost = getTroopsLost(table);
    var total = 0;
    for (var i = 0; i < 10; i++) 
        total += (sent[i] - lost[i]) * troop_stats[attackerRace][i][4];
    return total;
}

/**
 * @return {Array} An array of 10 numbers representing the troops the attacker sent.
 * @param {Node} table The table that contains the troops info.
 */
function getTroopsSent(table){
    var sent = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var troops = getPatternResult(PATTERN['sent_troops'], table);
    if ((troops != null) && (troops.snapshotLength >= 10)) {
        for (var i = 0; i < 10; i++) 
            sent[i] = parseInt(troops.snapshotItem(i).data);
    }
    return sent;
}

/**
 * @return {Array} An array of 10 numbers representing the troops the attacker lost.
 * @param {Node} table The table that contains the troops info.
 */
function getTroopsLost(table){
    var lost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var troops = getPatternResult(PATTERN['lost_troops'], table);
    if ((troops != null) && (troops.snapshotLength >= 10)) {
        for (var i = 0; i < 10; i++) 
            lost[i] = parseInt(troops.snapshotItem(i).data);
    }
    return lost;
}

/**
 * @return {Array} An array of 4 numbers representing the resources stolen by the attacker.
 * @param {Node} table The table that contains the bounty info.
 */
function getResourcesStolen(table){
    var stolen = new Array(4);
    var bounty = getPatternResult(PATTERN['bounty_inner'] + '/text()', table);
    if ((bounty != null) && (bounty.snapshotLength == 4)) {
        for (var i = 0; i < 4; i++) 
            stolen[i] = parseInt(bounty.snapshotItem(i).data);
    }
    return stolen;
}

/**
 * @return {Array} An array of 4 numbers representing the resources lost by the attacker.
 * @param {Node} table The table that contains the troops info.
 */
function getResourcesLost(table){
    var lost = new Array(4);
    var casualties = getTroopsLost(table);
    var attackerRace = getAttackerRaceIndex(table);
    if (attackerRace >= 0) {
        lost = [0, 0, 0, 0];
        for (var i = 0; i < 10; i++) {
            lost[0] += casualties[i] * troop_stats[attackerRace][i][0];
            lost[1] += casualties[i] * troop_stats[attackerRace][i][1];
            lost[2] += casualties[i] * troop_stats[attackerRace][i][2];
            lost[3] += casualties[i] * troop_stats[attackerRace][i][3];
        }
    }
    return lost;
}

/**
 * Detection based on the first image in the attacker table.
 * @param {Node} table The table that contains the troops info.
 * @return {Number} 0 = Romans, 1 = Teutons, 2 = Gauls
 */
function getAttackerRaceIndex(table, pattern){
    var race = -1;
    var image;
    if (isUndefined(pattern)) 
        image = getPatternResult(PATTERN['attacker_img'], table).snapshotItem(0);
    else 
        image = getPatternResult(pattern, table).snapshotItem(0);
    var imageName = null;
    if ((image != null) && ((imageName = image.className) != null)) {
        imageName = imageName.replace('unit u', '');
        race = (parseInt(imageName) - 1) / 10;
    }
    if (race < 0) 
        error('Could not determine attacker race.');
    return race;
}

/**
 * @param {String} pattern The pattern to search for.
 * @param {Node} context The context in which to evaluate the XPath expression.
 * @return {XPathResult} The result of the search.
 */
function getPatternResult(pattern, context){
    if (isUndefined(context)) 
        context = document;
    return document.evaluate(pattern, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

/**
 * Displays the error message if DEBUG is set to true.
 * Uses GM_log where available or alerts otherwise.
 * @param {String} message The error message to display.
 * @see DEBUG
 * @see ERROR
 */
function error(message){
    if (DEBUG) 
        if (typeof GM_log == 'function') 
            GM_log(message);//greasemonkey specific function
        else 
            alert(message);
    ERROR = true;
}

/**
 * @param {Object} x
 * @return {Boolean} true if the parameter is undefined.
 */
function isUndefined(x){
    return x == null && x !== null;
}
