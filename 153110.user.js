// ==UserScript==
// @name       RYM: Message Boards; Track Threads
// @version    0.52
// @include    http://rateyourmusic.com/boards*
// @include    http://rateyourmusic.com/board_new_message*
// @include    https://rateyourmusic.com/boards*
// @include    https://rateyourmusic.com/board_new_message*
// @copyright  2012+, AnniesBoobs
// @name       RYM: Message Boards; Track Threads
// ==/UserScript==
var $ = unsafeWindow.jQuery; 

var username = $('#navtop li:nth-child(6) a').html();
var threadsTracked = GM_getValue('threadsTracked');
if (threadsTracked == undefined){threadsTracked = ''}
function addThread(threadId) {
    var row = document.getElementById(threadId);
    var addButton = row.getElementsByTagName('a')[0];
    var threadTitle = row.getElementsByTagName('a')[1];
    if (threadsTracked.indexOf(threadId) >= 0) {
        addButton.innerHTML = '+';
        threadsTracked = threadsTracked.replace(threadId + ',', '');
        GM_deleteValue(threadId);
    } else {
        addButton.innerHTML = '-';
        threadsTracked = threadsTracked + threadId + ',';
        threadCount = row.getElementsByTagName('td')[3].innerHTML.replace(',','');
        GM_setValue(threadId, threadCount);
    }
    GM_setValue('threadsTracked', threadsTracked);
}
function updateCount(threadId){
    thread = document.getElementById(threadId);
    threadCount = thread.getElementsByTagName('td')[3].innerHTML.replace(',','');
    GM_setValue(threadId, threadCount);
}
var threadTemplate = 'http://rateyourmusic.com/board_message?message_id=';
if (document.URL.indexOf("/boards") > 0){
    var rows = document.getElementsByClassName('mbgen')[0].getElementsByTagName('tr');
    for (r = 1; r < rows.length; r++) {
        threadTitle = rows[r].getElementsByTagName('a')[0];
        if (threadTitle != undefined) {
            threadId = threadTitle.href.split('=')[1];
            rows[r].id = threadId;
            x = document.createElement('a');
            x.innerHTML = '+';
            x.setAttribute('href', 'javascript:void(0);');
            threadTitle.parentNode.insertBefore(x, threadTitle.parentNode.firstChild);
            if (threadsTracked.indexOf(threadId + ',') >= 0) {
                threadCount = GM_getValue(threadId);
                if (threadCount == undefined){
                    threadCount = rows[r].getElementsByTagName('td')[3].innerHTML.replace(',','');
                    GM_setValue(threadId, threadCount);
                }
                threadCountNew = parseInt(rows[r].getElementsByTagName('td')[3].innerHTML.replace(',',''));
                countDif = threadCountNew - parseInt(threadCount);
                if (countDif > 0 && rows[r].getElementsByTagName('td')[2].getElementsByTagName('a')[0].innerHTML != username){
                    count = document.createElement('a');
                    count.innerHTML = '+'+countDif;
                    count.href = threadTitle.href+'&start='+ (parseInt(threadCount)+1)+'&show=200';
                    threadTitle.parentNode.insertBefore(count, threadTitle.nextSibling);
                    threadTitle.parentNode.insertBefore(document.createTextNode('  '), threadTitle.nextSibling);
                    
                    y = document.createElement('b');
                    y.innerHTML = threadTitle.innerHTML;
                    threadTitle.innerHTML = '';
                    threadTitle.appendChild(y);
                    links = rows[r].getElementsByTagName('a');
                    for (i=1; i<links.length; i++){
                        links[i].addEventListener('click', (function (n) {
                            return function (e) {
                                updateCount(n);
                                this.removeEventListener('click',arguments.callee,false);
                            };
                        })(threadId), false);
                        links[i].addEventListener('contextmenu', (function (n) {
                            return function (e) {
                                updateCount(n);
                                this.removeEventListener('click',arguments.callee,false);
                            };
                        })(threadId), false);
                    }
                } else if (countDif < 0){updateCount(threadId)}
                    x.innerHTML = '-';
            }
            x.addEventListener('click', (function (n){return function (e){addThread(n)}})(threadId), false);
        }
    }
} else {
    threadId = document.URL.split('thread_id=')[1].split('&')[0];
    if (1 == 4 && threadsTracked.indexOf(threadId) < 0){
        $('input[value="Post Now >"]').bind('click', function(){
            $('input[value="Post Now >"]').get(0).click();
            threadsTracked = threadsTracked + threadId + ',';
            GM_setValue('threadsTracked', threadsTracked);
        }, false)
        
    }
}