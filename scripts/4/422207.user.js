// ==UserScript==
// @name PageMailList
// @namespace InGame
// @author Ladoria
// @date 21/03/2014
// @version 1.6
// @description Paging the mail list
// @license WTF Public License; http://en.wikipedia.org/wiki/WTF_Public_License
// @include http://www.dreadcast.net/Main
// @compat Chrome
// ==/UserScript==

var actualPage = 0;
var messageCount = $('#liste_messages .message').size();

// Params [FR]
var messagePerPage = 10; // [Nombre de messages à afficher par page]
var refreshTime = 2000; // [En millisecondes, le temps à vérifier l'arrivée de nouveau message après demande utilisateur]
var reloadAttemptInterval = 100; //[En millisecondes, l'interval entre les vérifications]

var nbReloadAttempt = Math.ceil(refreshTime / reloadAttemptInterval);

$('#liste_messages .content').css('height',((messagePerPage * 40 + 7)) +'px'); // maths are sweet
$('#liste_messages .content').css('overflow-y', 'hidden');
$('<div id="pageDisplayChat"><div class="firstPage btnTxt"><span>1</span></div><div class="previousPage btnTxt"><span><</span></div><div class="actualPage btnTxt"><span>1</span></div><div class="nextPage btnTxt"><span>></span></div><div class="lastPage btnTxt"><span></span></div><div class="btnTxt btnPageNumber"><input class="pageNumber" type="text" value="1"></div><div class="nextMessages btnTxt">+ ( <span class="messageCount"></span> )</div></div>').insertAfter($('#liste_messages .content')); // damn ugly

// Styles
$('#pageDisplayChat .btnTxt').css('margin', '2px 2px 2px 2px');
$('#pageDisplayChat .btnTxt').css('padding', '4px 5px 0px 5px');
$('#pageDisplayChat span').css('font-weight', 'bold');
$('#pageDisplayChat .actualPage').css('min-width', '17px');
$('#pageDisplayChat .lastPage').css('min-width', '17px');
$('#pageDisplayChat .btnPageNumber').css('padding', '0px 5px 4px 5px');
$('#pageDisplayChat .pageNumber').css('width', '15px');
$('#pageDisplayChat .pageNumber').css('margin-bottom', '4px');
$('#pageDisplayChat .nextMessages').css('min-width', '38px');
$('#pageDisplayChat .nextMessages').css('float', 'right');

// Build the paging system
function loadPage() {
	messageCount = $('#liste_messages .message').size();
	$('#pageDisplayChat .messageCount').html(messageCount);
	
	inferiorLimit = messagePerPage * actualPage;
	superiorLimit = inferiorLimit + messagePerPage;
	
	// show messages in the actual page, hide others
	$('#liste_messages .message').each( function() {
		if ($(this).attr('data-numero') >= inferiorLimit && $(this).attr('data-numero') < superiorLimit) {
			$(this).show();
		}
		else {
			$(this).hide();
		}
	});
	
	refreshPageAccessors();
}

// Refresh page accessors...
function refreshPageAccessors() {
	$('#pageDisplayChat .actualPage span').html(actualPage + 1);
		
	$('#pageDisplayChat .lastPage span').html((Math.ceil($('#liste_messages .message').size() / messagePerPage)));
}

// Event handler
// refresh
$('#pageDisplayChat .actualPage').click( function() {
	loadPage();
});

$('#pageDisplayChat .previousPage').click( function() {
	if(actualPage > 0) {
		actualPage--;
		loadPage();
	}
});

$('#pageDisplayChat .nextPage').click( function() {
	if(actualPage < ($('#liste_messages .message').size() / messagePerPage) - 1) 
	{
		actualPage++;
		loadPage();
	}
});

$('#pageDisplayChat .firstPage').click( function() {
	actualPage = 0;
	loadPage();
});

$('#pageDisplayChat .lastPage').click( function() {
	actualPage = Math.ceil($('#liste_messages .message').size() / messagePerPage) - 1;
	loadPage();
});

$('#pageDisplayChat .nextMessages').click( function() {
	nav.getMessagerie().loadFolderContent();
	
	delayedLoad(0);
});

$('.folder').click(function () {
	actualPage = 0;
	
	// to execute normaly after the folder loading :/
	setTimeout(function() { loadPage(); },300);
});

$("#pageDisplayChat .pageNumber").keyup( function(e) {
	if(e.keyCode == 13) {
		actualPage = ($("#pageDisplayChat .pageNumber").val() >= 0) ? ($("#pageDisplayChat .pageNumber").val() - 1) : 0;
		loadPage();
	}
});

function delayedLoad(attemptLeft) {
	if (attemptLeft < nbReloadAttempt)
		if (messageCount == $('#liste_messages .message').size())
			setTimeout( function() { delayedLoad(attemptLeft + 1); }, reloadAttemptInterval);
		else
			loadPage();
}

loadPage();