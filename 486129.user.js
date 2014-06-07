// ==UserScript==
// @name           HWM_Forums_Filter
// @author         Рианти
// @description    Фильтрация нежелательных тем на форумах ГВД
// @homepage       http://userscripts.org/scripts/show/486129
// @version        1
// @include        http://www.heroeswm.ru/forum_thread.php*
// ==/UserScript==

var _GM_arr_key = 'HWM_Forums_Filter_Array';
var _GM_appearance_key = 'HWM_Forums_Filter_Appearance';
var _controls_marker1 = 'Mm';
var _controls_marker2 = 'Sc';

function appendOnTop(newEl) {
    document.body.appendChild(newEl);
    newEl.style.position = 'absolute';
    newEl.style.top = _appendTitleY + 'px';
    newEl.style.right = _appendTitleX + 'px';
}

function applyBlocks(fTable, stance){
    var rows = fTable.children, tId, rowsHidden = 0, check;
    var blockedThreads = loadBlockedArr(), rowStyle = 0;
    for(var i = 1; i < rows.length; i++){
        tId = rows[i].getElementsByTagName('a')[0].href.match(/tid=(\d+)/)[1];
        check = checkThread(blockedThreads, tId);
        appendControls(rows[i], tId, check);
        if(stance) {
            if (check) {
                rows[i].style.display = 'none';
                rowsHidden++;
            }
        }
        else{
            rows[i].style.display = '';
        }
        if(!stance || !check){
            if(rowStyle = (rowStyle + 1) % 2) rows[i].className = '';
            else rows[i].className = 'second';
        }
    }
    return rowsHidden;
}

function checkThread(blockedArr, tId){
    if(blockedArr.indexOf(tId) > -1) return 1;
    return 0;
}

function loadBlockedArr(){
    return JSON.parse(GM_getValue(_GM_arr_key, '[]'));
}

function saveBlockedArr(arr){
    GM_setValue(_GM_arr_key, JSON.stringify(arr));
}

function addBlockedThread(tId){
    var blockedArr = loadBlockedArr();
    blockedArr.push(tId);
    saveBlockedArr(blockedArr);
}

function removeBlockedThread(tId){
    var blockedArr = loadBlockedArr();
    delete blockedArr[blockedArr.indexOf(tId)];
    saveBlockedArr(blockedArr);
}

function appendControls(row, tId, stance){
    var span = document.createElement('span');
    span.className = _controls_marker2;
    if(stance){
        span.innerHTML = '<i style="cursor: pointer" title="Показывать">(-)</i> ';
        span.onclick = function(){removeBlockedThread(tId); applyAppearance()};
    }
    else{
        span.innerHTML = '<i style="cursor: pointer" title="Скрывать">(+)</i> ';
        span.onclick = function(){addBlockedThread(tId); applyAppearance()};
    }
    if(row.firstChild.firstChild.className == _controls_marker2) {
        row.firstChild.replaceChild(span, row.firstChild.firstChild);
    } else {
        row.firstChild.insertBefore(span, row.firstChild.firstChild);
    }
}

function enabledAppearance(){
    clearTitle();
    var threadsHidden = applyBlocks(_table, 1);
    var p = document.createElement('p');
    var small = document.createElement('small');
    p.innerHTML = 'Тем скрыто: ' + threadsHidden + ' ';
    p.id = _controls_marker1;
    small.innerHTML = '(показать)';
    small.style.cursor = 'pointer';
    small.onclick = function(){toggleAppearance(); disabledAppearance()};
    p.appendChild(small);
    appendOnTop(p);
}

function disabledAppearance(){
    clearTitle();
    applyBlocks(_table, 0);
    var p = document.createElement('p');
    var small = document.createElement('small');
    p.innerHTML = 'Показ всех тем ';
    p.id = _controls_marker1;
    small.innerHTML = '(скрыть)';
    small.style.cursor = 'pointer';
    small.onclick = function(){toggleAppearance(); enabledAppearance()};
    p.appendChild(small);
    appendOnTop(p);
}

function clearTitle(){
    var title = document.getElementById(_controls_marker1);
    if(title) document.body.removeChild(title);
}

function toggleAppearance(){
    GM_setValue(_GM_appearance_key, (getAppearance() + 1) % 2);
}

function getAppearance(){
    return parseInt(GM_getValue(_GM_appearance_key, 1));
}

function applyAppearance(){
    if(getAppearance()) enabledAppearance();
    else disabledAppearance();
}

var _table = document.querySelector('.table3  > tbody');
var rCell = _table.querySelector('tr:nth-child(1) > th:nth-child(5)');
var offsetY = 5;
var _appendTitleX = _table.getBoundingClientRect().left;
var _appendTitleY = _table.getBoundingClientRect().top - rCell.offsetHeight - offsetY;

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue = function (key, def) { return localStorage[key] || def; }
    this.GM_setValue = function (key, value) { return localStorage[key] = value; }
    this.GM_deleteValue = function (key) { return delete localStorage[key]; }
}

applyAppearance();