// ==UserScript==
// @grant		none
// @icon		https://www.mydealz.de/wp-content/uploads/2012/05/favicon.ico
// @name        HUKD Toolkit
// @namespace   lolnickname
// @include		/^https?:\/\/www\.mydealz\.de/
// @include		http://hukd.mydealz.de*
// @include		https://hukd.mydealz.de*

// @updateURL   https://userscripts.org/scripts/source/172684.meta.js
// @downloadURL	https://userscripts.org/scripts/source/172684.user.js
// @version     0.1.6.2
// ==/UserScript==

// ========================== //
//     Einstellungen Start    //
// ========================== //
// Zitate unter bestehendem Text in der Kommentarbox einfuegen
// true ist HUKD Standard 
var tOFU = false;

// Nach dem Klick auf Zitieren zur Kommentarbox rutschen?
// false setzen wenn du mehrere User zitieren willst ohne immer wieder hoch zu scrollen
// true ist HUKD Standard 
var quoteFocus = true;

// ========================== //
//     Einstellungen Ende     //
// ========================== //

var dealPattern = /^https?:\/\/hukd\.mydealz\.de.+\/.+-\d+(?:\?page=\d+)?(?:#.+)?$/m;
var msgPattern = /^https?:\/\/hukd\.mydealz\.de\/profile\/.+\/messages(\/(?:outbox|inbox)(?:\?page=\d+)?)?$/m
var pnPattern = /^https?:\/\/hukd\.mydealz\.de\/profile\/.+\/messages\/compose-mail\?.+$/m
var homePattern = /^https?:\/\/www\.mydealz\.de/m
var gesuchePattern = /^https?:\/\/hukd\.mydealz\.de(:?\/.+)?\/gesuche\/.+/m
var diversesPattern = /^https?:\/\/hukd\.mydealz\.de(:?\/.+)?\/diverses\/.+/m
var kleinAnzeigenPattern = /^https?:\/\/hukd\.mydealz\.de(:?\/.+)?\/kleinanzeigen\/.+/m

if (urlPathCheck(/^https:\/\/www\.mydealz\.de/m))
{
	for (var i = 0; i < document.getElementsByTagName('link').length; i++)
	{
		document.getElementsByTagName('link')[i].href = document.getElementsByTagName('link')[i].href.replace(/^http:\/\//, "https://");
	}

	var scriptTags = document.getElementsByTagName('script');
	var l = scriptTags.length;
	var head = document.getElementsByTagName("head")[0];
	var srcUrl = new Array();
	for (var i = 0; i < l; i++)
	{
		if (scriptTags[i].src)
		{
			srcUrl[i] = scriptTags[i].src.replace(/^http:\/\//, "https://");
			scriptTags[i].src = '';
		}
	}
	
	for (var i = 0; i < l; i++)
	{
		if(srcUrl[i])
		{
			var element = document.createElement("script");
			element.src = srcUrl[i];
			element.type = "text/javascript";
			head.appendChild(element);
		}
	}
	window.setTimeout(startUp, 1500);
} else {startUp();}

function startUp() {
if(!$(".visitor-name")[0]) {
	try { 
		removeTopBar(); siteNav(); 
		if (urlPathCheck(homePattern)) {$(".siteNav-lnk")[1].href = "http://hukd.mydealz.de/all/deals/new";
										$(".siteNav-lnk")[2].href = "http://hukd.mydealz.de/all/gutscheine/new";
										$(".siteNav-lnk")[3].href = "http://hukd.mydealz.de/all/freebies/new";}
		if (!urlPathCheck(homePattern)) {userMenu();}
		if (urlPathCheck(dealPattern)) {quoteEvent(); replaceQuoteButtons(); commentLink(); pnLink();}
		if (urlPathCheck(msgPattern)) {msgPageDeleteButton();}
		if (urlPathCheck(pnPattern)) {pnAddSubject();}
		noErrorOccurred();
	} catch (e) {anErrorOccurred();}
} else {
	if (window.location != 'https://hukd.mydealz.de/login') {
		alert('Bitte einloggen.');
		window.location = 'https://hukd.mydealz.de/login';
	}
}
}



function userMenu()
{
	$(".account-arrow")[0].style.display = 'none';
	$(".account-menu-item")[0].style.display = 'none';
	$(".account-menu-item")[1].style.display = 'none';
	
	var img = $(".account-avatar")[0];
	img.alt = 'Posteingang';
	var aLink = createElement('a', null, null, null);
	aLink.href = 'http://hukd.mydealz.de/profile/' + retrieveUserName() + '/messages';
	aLink.appendChild(img);
	$(".account")[0].appendChild(aLink);
	aLink = createElement('a', null, 'account-user', null);
	aLink.href = 'http://hukd.mydealz.de/profile/' + retrieveUserName();
	aLink.appendChild($(".account-user")[0]);
	$(".account")[0].appendChild(aLink);
	addGlobalStyle('.account-user:hover, .account-user:link, .account-user:visited, .account-user:focus, .account-user:active {text-decoration: none;}')
	addGlobalStyle('.account:hover {background-color: transparent;}');
}

function siteNav()
{
	var gesuche = createElement('li', null, 'siteNav-it', null);
	var aLink = createElement('a', null, 'siteNav-lnk', 'Gesuche');
	aLink.href = 'http://hukd.mydealz.de/all/gesuche/new';
	if (urlPathCheck(gesuchePattern)) {aLink.className = 'siteNav-lnk siteNav-lnk--a';}
	gesuche.appendChild(aLink);
	$(".siteNav")[0].insertBefore(gesuche, $(".siteNav-it")[4]);
	
	var diverses = createElement('li', null, 'siteNav-it', null);
	var aLink = createElement('a', null, 'siteNav-lnk', 'Diverses');
	aLink.href = 'http://hukd.mydealz.de/all/diverses/new';
	if (urlPathCheck(diversesPattern)) {aLink.className = 'siteNav-lnk siteNav-lnk--a';}
	diverses.appendChild(aLink);
	$(".siteNav")[0].insertBefore(diverses, $(".siteNav-it")[5]);

	var kleinAnzeigen = createElement('li', null, 'siteNav-it', null);
	var aLink = createElement('a', null, 'siteNav-lnk', 'Kleinanzeigen');
	aLink.href = 'http://hukd.mydealz.de/all/kleinanzeigen/new';
	if (urlPathCheck(kleinAnzeigenPattern)) {aLink.className = 'siteNav-lnk siteNav-lnk--a';}
	kleinAnzeigen.appendChild(aLink);
	$(".siteNav")[0].insertBefore(kleinAnzeigen, $(".siteNav-it")[6]);
	addGlobalStyle('.siteNav-lnk{padding: 0.7em 1.15em;}');
	$(".siteNav-it--m")[0].style.display = 'none';
	$(".siteNav-it")[7].style.display = 'none';	
}
function removeTopBar()
{
	addGlobalStyle('.topBar{display: none;}');
}


function quoteEvent()
{
    $(".structure-comments").on("click",".newQuote",function(d)
    {
        d.preventDefault();
        var f=this.id;f=f.replace("quote","");
        var e=$(".module-form-listing-comment .input-textarea-comment textarea");
        if(e.length>0)
        {
            data=$(this).parents(".module-listing-comment:first").find(".comment-holder").bbCode();
            /* Zeilenwechsel entfernen */
            data = data.replace(/(\r\n|\n|\r)/gm," ");
            /* mehrfache Leerzeichen */
            data = data.replace(/\s+/g," ");
            /* einzelne Leerzeichen nach BBCode */
            data = data.replace(/quote(=([a-zA-Z0-9]+)?)?\]\s/g,"quote$1]");           
            /* einzelne Leerzeichen vor BBCode */
            data = data.replace(/\s\[(\/)?quote/g,"[$1quote");
            /* Leerzeichen am Ende des Strings */
            data = data.replace(/\s$/,"");
            data = maxQuotes(data);
            if (tOFU)
            {
                /* Text oben Fullquote unten */
                e.val(($(".module-form-listing-comment .input-textarea-comment textarea").val().length>0?$(".module-form-listing-comment .input-textarea-comment textarea").val():"")+"[quote="+$("#un"+f).text()+"]"+data+"[/quote]");
            } else {
                /* Text unten Fullquote oben */
                e.val("[quote="+$("#un"+f).text()+"]"+data+"[/quote]"+($(".module-form-listing-comment .input-textarea-comment textarea").val().length>0?$(".module-form-listing-comment .input-textarea-comment textarea").val():""));
            }
        if (quoteFocus)
        {
            /* Focus & Url auf Kommentarbox */
            document.location.hash="#post-comment";
            e.focus();
        }
        }
    });
}

function replaceQuoteButtons()
{
    var quoteButton = document.getElementsByClassName('call-comment-reply');
    var a = document.getElementsByClassName('right');
    for (var i = 0; i < quoteButton.length; i++)
    {
        quoteButton[i].style.display = 'none';
        var qId = quoteButton[i].id;
        quoteButton[i].id = '';
        if (!a[i].getElementsByClassName('call-comment-edit')[0])
        {
            a[i].appendChild(createElement('a', qId, 'newQuote', 'Zitieren'));
        } else {
            /* Eigenzitat */
	        var partentElem = a[i].getElementsByClassName('separator')[1];
	        partentElem.parentNode.insertBefore(createElement('a', qId, 'newQuote', 'Zitieren'), partentElem);
	}
    }
}

function noErrorOccurred()
{
    document.getElementsByClassName('account-user')[0].style.borderBottom = '1px dotted lime';
}
function anErrorOccurred()
{
    document.getElementsByClassName('account-user')[0].style.borderBottom = '1px dotted red';
}

function urlPathCheck(testString)
{
    var url = window.location.protocol + "//" + window.location.hostname + window.location.pathname + window.location.search + window.location.hash;
        if(url.match(testString))
        {
            return true;
        } else {
            return false;
        }
}

function commentLink()
{
    var comment = document.getElementsByClassName('module-listing-comment');
    for (i = 0; i < comment.length; i++)
    {
        var partentElem = comment[i].getElementsByClassName('right')[0];
        var commentLink = createElement('a', 'link' + comment[i].id, '', 'Direktlink');
        commentLink.href = 'http://' + window.location.hostname + window.location.pathname + '?page=' + retrievePageNumber() +'#post' + comment[i].id;
        var separator = createElement('span', '', 'separator', '|');
        partentElem.appendChild(separator);
        partentElem.appendChild(commentLink);
    }
}

/* by BAERnado modified by lolnickname */
function pnLink()
{
    var pnImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAAXNSR0IArs4c6QAAAj1QTFRFJl6vJl6v////////Jl6vJl6vJl6vJl6v////Jl6v////Jl6v////////////Jl6vJl6vJl6vJl6vJl6vJl6v////Jl6vJl6vJl6vJl6vmJiY////Jl6v////Jl6v////////////Jl6vJl6vJl6v////////////Jl6vJl6v////Jl6vJl6vJl6v////Jl6v////////Jl6v////Jl6v////////////Jl6v////////Jl6vJl6vJl6v////////////Jl6vJl6vJl6v////////5xEK////Jl6v////////////////////////Jl6v////////////////////////////////////////////////Jl6vJl6v////////////////Jl6v////Jl6v////Jl6v////////////////////////////Jl6vJl6v////////mJiYmJiYmJiY5xEKmJiYmJiYmJiY5xEK5xEKmJiYJl6v5xEKmJiY5xEKmJiYmJiYmJiY5xEK5xEK5xEKmJiY5xEKmJiYmJiY5xEKJl6vmJiY5xEK5xEK5xEKmJiY5xEK5xEK5xEKLl6sJl6vVHy8wM/my9fq8vX6lq3VsMLgO2ixvMvkYobCfZvLiaXQxtPp/f3+mJiY5xEKorjb0Nvs1d/vRG61SHK22eHt3uby5ev17fH4OGWw4unzW4G7mbLecJHGd5fJ9Pf7h6LP5+32S3O5t8jiw9Hn+Pn8ZYjCjqjS6e72+vz+mdpiNQAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QcGCzgPfkpoFgAAADpJREFUGNOdjkEOADAIwsr/P725LRmGmxwMNEaBmdRUoKEdkaNKyNAJ6KPrMS/ZDm/YnWbiV/TJziMtW48Al9aBD4oAAAAASUVORK5CYII=';
    addGlobalStyle('.tIco--pn{display:inline-block;*display:inline;*zoom:1;height:0;overflow:hidden;vertical-align:middle;background-image:url(' + pnImage + ');position:relative;top:-0.6em;margin-bottom:-1em;*top:-11px;*margin-bottom:-20px;margin-right:.4em;padding-top:16px; width: 16px}');
    addGlobalStyle('.oList-it {margin-right: 0.3903em;}');
    addGlobalStyle('.tIco--fb, .pFooter-lnk--fb:before, .tIco--tw, .pFooter-lnk--tw:before, .tIco--gp, .pFooter-lnk--gp:before, .tIco--rss, .pFooter-lnk--rss:before, .subNav-cm-lnk--rss:before, .tIco--pl, .pFooter-br-lb:after, .tIco--set, .subNav-cm-lnk--set:before, .activity-pn-opt-trg:before, .tIco--re, .tIco--reW, .tIco--co, .tIco--coW, .tIco--ln, .tIco--dB, .tIco--dG, .tIco--dR, .tIco--sc, .tIco--sp, .tIco--ex, .tIco--ed, .tIco--lo, .tIco--bl, .activity-pn-ct-ico {margin-right: 0.3em;}');
    var author = $(".thread-author")[0].textContent;
    var topic  = $(".thread-tl")[0].textContent;
    var pnLink = createElement('li', null, 'oList-it', null);
    pnLink.innerHTML = '<a href="http://hukd.mydealz.de/profile/' + retrieveUserName() + '/messages/compose-mail?to=' + encodeURIComponent(author) + '&subject=' + encodeURIComponent(topic) + '"><span class=" tIco--pn"></span>PN</a>';
    $(".oList")[0].appendChild(pnLink);
    /* Umbruch */
    //$(".oList")[0].insertBefore(createElement('br', null, null, null), $(".oList-it")[2].nextSibling);
}

function pnAddSubject()
{
    document.getElementById('subject').value = decodeURIComponent(getParam('subject'));
}


function retrievePageNumber()
{
    if (document.getElementsByClassName('module-pagination')[0]) 
    {
        return document.getElementsByClassName('module-pagination')[0].getElementsByClassName('selected')[0].textContent;
    } else {
        return 1;
    }
}

function retrieveUserName()
{
    return document.getElementsByClassName('account-user')[0].textContent;
}

function msgPageDeleteButton()
{
    $('.pull-right').append('<span id="delete-this-page" class="active" style="background:none repeat scroll 0px 0px rgb(251, 211, 210); color: rgb(214, 24, 20); border-radius: 4px 4px 4px 4px; cursor: pointer; padding: 4px 8px;margin-left:3px;"><span class="icon" style="background:url('+"'" + '/images/delete-icon.png' + "'" +') repeat scroll -34px 23px transparent; display:inline-block; height:16px; vertical-align:middle; width:16px;"></span>Seite loeschen</span>');
    $('#delete-this-page').on('click', deleteMsgPage);
}

function deleteMsgPage()
{
	var msgCheckBox = document.getElementsByClassName("select-message");
	for (i = 0; i < msgCheckBox.length; i++)
	{
		msgCheckBox[i].firstChild.checked = true;
	}
	deleteSelectedMail();
}

function deleteSelectedMail()
{
	var ids = getSelectedValues();
	var uri = $(this).data('url');
	if(confirm('Gesamte Seite loeschen?'))
	{
		$.ajax({
			url: 'https://hukd.mydealz.de/profile/' + retrieveUserName() + '/messages/delete-mail?action=ajax',
			type: 'post',
			data: {'mail_ref' : ids, 'delete_multiple': 1},
			success: function(response){$('#delete-selected-messages.active').removeClass('active');
			$.each(ids, function(i, id)
				{$('#msg-'+ id).hide('slow');
			});
		},
		error: function(){
			alert('Fehler, versuche es erneut.');
		}
		});
	}
}


/* by BAERnado */
function getParam(paramName)
{
    var params = location.search.substr(location.search.indexOf("?")+1);
    var paramVal = "";
    params = params.split("&");
    /* split param and value into individual pieces */
    for (var i = 0; i < params.length; i++)
    {
        temp = params[i].split("=");
        if ( [temp[0]] == paramName ) { paramVal = temp[1]; }
    }
    return paramVal;
}

/* by BAERnado */
function addGlobalStyle(css)
{
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function createElement(elemType, elemId, elemClass, elemText)
{
    var elmNewContent = document.createElement(elemType);
	if (elemId) {
	    elmNewContent.id = elemId;
	}
	if (elemClass) {
	    elmNewContent.className = elemClass;
	}
	if (elemText) {
    	elmNewContent.appendChild(document.createTextNode(elemText));
	}
    return elmNewContent;
}

function maxQuotes(quoteContent)
{
	var quoteStartPattern = /\[quote=([0-9a-zA-Z_]+)?\]/g
	var quoteEndPattern = /\[\/quote\]/g
	var quoteStarts = quoteContent.match(quoteStartPattern);
	var quoteEnds = quoteContent.match(quoteEndPattern);
	var quoteStartCount = 0;
	var quoteEndCount = 0;

	if (quoteStarts && quoteEnds)
	{
		quoteStartCount = quoteStarts.length;
		quoteEndCount = quoteEnds.length;
	}

  	if (quoteStartCount != quoteEndCount)
  	{
    	alert("BBCodes fuer Zitate nicht eindeutig.");
    	return quoteContent;
  	}

  	/* maximale Ebenen  */
  	/* mit 0 beginnend */
  	var maxQuoteLevel = 1;
  	if (quoteStartCount <= maxQuoteLevel)
  	{
	  	return quoteContent;
  	}
  	
  	var startPos = new Array();
  	var endPos = new Array();  	
  	for (var i = 0; i < quoteStartCount;  i++)
  	{
		startPos[i] = quoteContent.indexOf(quoteStarts[i], startPos[i-1] + 1);
		endPos[i] = quoteContent.indexOf(quoteEnds[i], endPos[i-1] + 1);
	}
	
 
 	var multiQuote = false;
  	
	for (var i = 0; i < quoteStartCount;  i++)
	{
		for (var j = 0; j < quoteStartCount;  j++) 
		{
			if (startPos[i] >= endPos[j])
			{
			  // not supported yet

			  multiQuote = true;
		  
			  break;
			}
		}
		if (multiQuote) 
		{
			break;
		};
	}
	if (multiQuote)
	{	
		return quoteContent;
	} else {
		var reducedQuote = '';
		var levelDiff =  Math.abs(maxQuoteLevel - quoteStartCount);
		contentToDiscard = quoteContent.substring(startPos[maxQuoteLevel], endPos[levelDiff - 1] + quoteEnds[levelDiff - 1].length);
		reducedQuote += quoteContent.replace(contentToDiscard, ' ');
		return reducedQuote;
	}
	
}
