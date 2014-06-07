// ==UserScript==
// @name       UZ Luckybooker's script
// @version    0.2
// @description  gimme all your money, put your hands in the air
// @match      http://booking.uz.gov.ua/*
// @required   http://
// @copyright  2013+, bareg
// ==/UserScript==

// audio file to play when tickets are found

var audio    = document.createElement('audio');
audio.id     = 'mp3';
audio.loop   = true;
audio.paused = true;
audio.src    = 'http://cs2-1v4.vk.me/p4/4928b1dfc2ad28.mp3?/%CC%E5%EB%EE%E4%E8%FF%20%E8%E7%20%F0%E5%EA%EB%E0%EC%FB%20%CC%D2%D1%20-%20world%20on%20mine.mp3';

document.body.appendChild(audio);

function playStopAudio(){
    if(document.getElementById('mp3').paused == true){
    	document.getElementById('mp3').play(); 
    }
    else{
    	document.getElementById('mp3').pause();
    }
}

// autosearch button in new paragraph tag

var autosearchButton   = document.createElement('input');
autosearchButton.type  = 'button';
autosearchButton.id    = 'asBtn';
autosearchButton.value = 'Автопошук';

var playPauseButton   = document.createElement('input');
playPauseButton.type  = 'button';
playPauseButton.id    = 'ppBtn';
playPauseButton.value = '♫';

var clearGMcacheButton   = document.createElement('input');
clearGMcacheButton.type  = 'button';
clearGMcacheButton.id    = 'cGMcBtn';
clearGMcacheButton.value = 'Clear GM data';

var searchButton = document.getElementsByName('search')[0];

var newPar        = document.createElement('p');
newPar.innerHTML += autosearchButton.outerHTML;
newPar.innerHTML += playPauseButton.outerHTML;
newPar.innerHTML += clearGMcacheButton.outerHTML;

searchButton.parentElement.appendChild(newPar);

// checks for result, must be > 0

function checkTickets(){
    debugger;
	var result = document.getElementsByClassName('vToolsDataTableRow2');
    if(result.length > 0){
        GM_setValue('autosearch',false);
    	playStopAudio();
    }
    else{
    	unsafeWindow.goRefresh();
        main();
    }
}

// main logic

function main(){
    if(GM_getValue('autosearch',null) == true){
        setTimeout(function(){checkTickets();},30000);
    }
}

main();

// autosearch button actions

function goAutosearch(){
	GM_setValue('autosearch',true);
    checkTickets();
}

var asBtn = document.getElementById('asBtn');
asBtn.addEventListener('click',goAutosearch,false);

// music button action

var ppBtn = document.getElementById('ppBtn');
ppBtn.addEventListener('click',playStopAudio,false);

// clear gm data button action

var cGMcBtn = document.getElementById('cGMcBtn');
cGMcBtn.addEventListener('click',function(){GM_setValue('autosearch',null);},false);

// test
function test()
{
alert('Test Ok');
}

function goRefresh(){ 
    document.getElementsByName('search')[0].click();
}

var refScript = document.createElement('script');
refScript.innerHTML = goRefresh;
document.body.appendChild(refScript);