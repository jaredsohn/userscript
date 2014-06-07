// ==UserScript==
// @name           Darkwarez Charger
// @namespace      http://www.darkwarez.pl
// @include        *darkwarez.pl/forum/*
// @author		   Denis WrĂłbel <mrWodoo> and Mateusz <Torrox>
// ==/UserScript==


//Konfiguracja
var EnableFastEdit = true; //Odblokowac szybka edycje
var SelectiveQuote = true; //Odblokowac cytowanie selektywne?
var InstantPmCheck = true; //Oblokowac sprawdzanie czy mamy pw w czasie rzeczywistym?
var InstantPmCheckInterval = 15 * 1000; //W milisekundach
var NewIcons = true;
var NewLogo = 'http://zejmanboats.pl/pixel/dark1.jpg';

//
var Sid = '';
var Location = '';
var FindAction = '';
var Username = '';
var Posts = new Array();
var DonePages = 0;
var ActiveAuthorSeek = false;
var Version = 0.46;
var SettingsOpened = false;

//Ikony
var Icons = new Array();
Icons['info'] = 'http://dl.dropbox.com/u/58430247/info.png';
Icons['prosby'] = 'http://dl.dropbox.com/u/58430247/prosby.png';
Icons['problemy'] = 'http://dl.dropbox.com/u/58430247/problemy.png';
Icons['poradniki'] = 'http://dl.dropbox.com/u/58430247/poradniki.png';
Icons['gry'] = 'http://dl.dropbox.com/u/58430247/gry.png';
Icons['filmy'] = 'http://dl.dropbox.com/u/58430247/filmy.png';
Icons['muzyka'] = 'http://dl.dropbox.com/u/58430247/muzyka.png';
Icons['programy'] = 'http://dl.dropbox.com/u/58430247/programy.png';
Icons['xxx'] = 'http://dl.dropbox.com/u/58430247/xxx.png';
Icons['inne'] = 'http://dl.dropbox.com/u/58430247/inne.png';
Icons['vip'] = 'http://dl.dropbox.com/u/58430247/vip.png';
Icons['super'] = 'http://dl.dropbox.com/u/58430247/svip.png';
Icons['games'] = 'http://dl.dropbox.com/u/58430247/games%20corner.png';
Icons['movies'] = 'http://dl.dropbox.com/u/58430247/movies%20corner.png';
Icons['music'] = 'http://dl.dropbox.com/u/58430247/music%20corner.png';
Icons['webmastering'] = 'http://dl.dropbox.com/u/58430247/webmaster.png';
Icons['sport'] = 'http://dl.dropbox.com/u/58430247/sport.png';
Icons['humor'] = 'http://dl.dropbox.com/u/58430247/humor.png';
Icons['grafika'] = 'http://dl.dropbox.com/u/58430247/grafika.png';
Icons['hardware'] = 'http://dl.dropbox.com/u/58430247/hardware.png';
Icons['offtopic'] = 'http://dl.dropbox.com/u/58430247/offtopic.png';
Icons['uwagi'] = 'http://dl.dropbox.com/u/58430247/uwagi2.png';
Icons['smietnik'] = 'http://dl.dropbox.com/u/58430247/smietnik.png';


/**
 * Dodajemy jQuery
 *
 */
var $;
(
	function()
	{
		if( typeof unsafeWindow.jQuery == 'undefined' )
		{
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement( 'script' );
    
            GM_JQ.src = 'http://code.jquery.com/jquery-1.7.1.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore( GM_JQ, GM_Head.firstChild );
        }
		
		GM_wait();

	}
)();

function GM_wait()
{
	if( typeof unsafeWindow.jQuery == 'undefined' )
	{
		window.setTimeout(GM_wait, 100);
	}
	else
	{
		$ = unsafeWindow.jQuery.noConflict(true);
		startCharger();
	}
}

function setPseudoCookie( Name, Value )
{
	GM_setValue( Version + '_' + Name, Value );
}

function getPseudoCookie( Name )
{
	return GM_getValue( Version + '_' + Name );
}

//Kod naszego skryptu umieszczony musi byc w tej funkcji
function startCharger()
{
	//Czy to jest pierwsze uruchomienie skryptu?
	if( typeof getPseudoCookie( 'dwcharger_first_run' ) == 'undefined' )
	{
		alert( 'Witaj! To jest twoje pierwsze uruchomienie forum z skryptem Darkwarez Charger w tle. Wszelkie problemy proszÄ zgĹaszaÄ w stosownym temacie :)' );
		alert( 'Znane bĹÄdy wersji ' + Version + '\n* szybka edycja nie dziaĹa poprawnie gdy edytujemy pierwszy post w temacie\n* problemy z szybka edycja' );
		setPseudoCookie( 'dwcharger_first_run', false );
		
		setPseudoCookie( 'fastedit', true );
		setPseudoCookie( 'selective_quote', true );
		setPseudoCookie( 'instant_pm', true );
		setPseudoCookie( 'new_icons', true );
		setPseudoCookie( 'new_logo', 'http://zejmanboats.pl/pixel/dark1.jpg' );
	}
	
	for( icon in Icons )
	{
		new Image().src = Icons[ icon ];
	}
	
	//Username = getPseudoCookie( 'dwcharger_username' );
	SelectiveQuote = getPseudoCookie( 'selective_quote' );
	InstantPmCheck = getPseudoCookie( 'instant_pm' );
	NewIcons = getPseudoCookie( 'new_icons' );
	NewLogo = getPseudoCookie( 'new_logo' );
	
	if( typeof NewLogo == 'undefined' )
	{
		NewLogo = '';
	}
	
	Location = window.location.href;
	Sid = $( 'a[href*="sid"]' ).attr( 'href' ).split( '=' )[2];
	
	EnableFastEdit = getPseudoCookie( 'fastedit' );
	
	var findAction = Location.split( '/' );
	
	FindAction = findAction[ findAction.length - 1 ];
	
	var Forum = findAction[ findAction.length - 2 ];
	
	$( 'div.mainmenu > a:last' ).after( ' <span id="dwcharger_settings_elem"><img alt="pelne wersje gier" src="templates/bLock/images/cellpic.gif"> <a class="mainmenu" href="' + location.href + '#" id="dwcharger_settings">DW Charger</a></span>' );
	
	$( '#dwcharger_settings' ).click( function() { openSettings(); } );
	
	//Nowe logo
	if( NewLogo.length > 0 )
	{
		$( 'img[vspace="1"]:eq(0)' ).attr( 'src', NewLogo );
	}
	//
	
	instantPmCheck();
	
	if( location.href == 'http://darkwarez.pl/forum/' )
	{
		newIcons();
	}
	else if( (new RegExp( /([0-9]{1,16})\-([a-zA-Z0-9_\.\-]{1,255})\.html/ ).exec( FindAction ) ) || (new RegExp( /post\-([0-9]{1,16})\.html/ ).exec( FindAction ) ) ) //Sprawdzamy czy jestesmy w temacie
	{
		//Jestesmy w temacie
		inTopicFastEdit();
		inTopicSearchByAuthor( Forum );
		codeOneClickSelect();
		//inTopicSelectiveQuote();
	}
	else if( FindAction == 'chat.php' )
	{
		setTimeout( function()
		{
			var OnlineUsers = $( '#online_list > div' );
			
			OnlineUsers.each( function( x, y ) { $( this ).click( function() { $( '#chatbarText' ).val( '@' + $( this ).attr( 'id' ) + ', ' ); $( '#chatbarText' ).focus(); return false; } ); } );
		}, 3000 );
	}
}

function newIcons()
{
	if( !NewIcons || FindAction != '' ) return;
	
	var Forums = $( 'table.forumline:eq(0) > tbody > tr[style*="background-color"]' );
	
	Forums.each( function( x, y )
	{
		var ForumName = $( y ).find( 'a' ).html();
		ForumName = ForumName.split( ' ' )[0].toLowerCase();
		
		$( y ).find( 'img:eq(0)' ).attr( 'src', Icons[ ForumName ] );
		$( y ).find( 'img:eq(0)' ).attr( 'width', '50px' ); 
		$( y ).find( 'img:eq(0)' ).attr( 'height', '50px' ); 
		$( y ).mouseover( function() { return false; } );
	});
}

function openSettings()			
{
	if( SettingsOpened ) return false;
	
	SettingsOpened = true;
	
	$( '#dwcharger_settings_elem' ).append( '<div id="settings" style="display: none;width: 50%;margin: auto;margin-top: 20px;background-color: #232323;border: 1px black solid;padding: 5px;text-align: left;"><h1>Ustawienia DW Charger\'a</h1><div id="dwcharger_settings_form"></div></div>' );
	$( '#settings' ).fadeIn( 'slow' );
	
	//Szybka edycja
	var FastEditNo = ( EnableFastEdit == false ) ? 'checked="checked"' : '';
	var FastEditYes = ( EnableFastEdit ) ? 'checked="checked"' : '';
	
	$( '#dwcharger_settings_form' ).append( '<div><b>Szybka edycja wĹÄczona</b>: Tak <input type="radio" name="fastedit" id="fastedit_yes" ' + FastEditYes + ' /> / Nie <input type="radio" name="fastedit" id="fastedit_no" ' + FastEditNo + ' /></div>' );
	$( '#fastedit_yes' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'fastedit', true ); }, 1 );
	});
	$( '#fastedit_no' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'fastedit', false ); }, 1 );
	});
	////////////////////
	
	//Cytowanie selektywne
	var SelectiveQuoteNo = ( SelectiveQuote == false ) ? 'checked="checked"' : '';
	var SelectiveQuoteYes = ( SelectiveQuote ) ? 'checked="checked"' : '';
	
	$( '#dwcharger_settings_form' ).append( '<div><b>Cytowanie selektywne wĹÄczone</b>: Tak <input type="radio" name="selective_quote" id="selective_quote_yes" ' + SelectiveQuoteYes + ' /> / Nie <input type="radio" name="selective_quote" id="selective_quote_no" ' + SelectiveQuoteNo + ' /></div>' );
	$( '#selective_quote_yes' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'selective_quote', true ); }, 1 );
	});
	$( '#selective_quote_no' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'selective_quote', false ); }, 1 );
	});
	////////////////////


	//Szybka odpowiedz by slawo123
// ==UserScript==
// @name           Szybka odpowiedź na dole tematow
// @description    Skrypt umieszcza pole tekstowe oraz emotikony na dole kazdego tematu
// @namespace      http://darkwarez.pl
// @include        *darkwarez.pl/forum*
// @licence        Beerware
// @version        14/01/2011
// ==/UserScript==

	var elements = document.getElementsByName('search_topic');
	var topicid = elements[0].value;

	var elements = document.getElementsByTagName("td");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].className == "catBottom") {var targetd = elements[i].parentNode;break;}
	}
	
	var elements = document.getElementsByTagName("img");
	for(i=0;i<elements.length;i++)
	{
		if(elements[i].alt == "Odpowiedz do tematu") {var open = 1;break;}
	}

	var elements = document.getElementsByTagName("a");
	for(i=0;i<elements.length;i++)
	{
		if(/logout/.test(elements[i].href) ) {arr = elements[i].href.split(/sid=/);sid=arr[1];break;}
	}

	if(topicid && targetd && sid && open)
	{
		var td = document.createElement("td");
		td.setAttribute("colspan","2");
		td.setAttribute("style","padding:0");
		td.className = "row2";
		td.innerHTML = '<form action="posting.php" method="post" name="post" style="margin-bottom:0"><table width="100%" cellspacing="1" cellpadding="3" border="0"><th colspan="2">Szybka odpowiedź</th><tr><td width="150" id="emotki" align="center"><table width="100" cellspacing="0" cellpadding="5" border="0"><tbody><tr align="center"> <td class="gensmall" colspan="4"><b>Emotikony</b></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :D \';txtarea.focus();" name="emotka"><img border="0" title="" alt="" src="images/smiles/big_smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :) \';txtarea.focus();" name="emotka"><img border="0" title="Smile" alt="Smile" src="images/smiles/smile.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :( \';txtarea.focus();" name="emotka"><img border="0" title="Sad" alt="Sad" src="images/smiles/sad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :o \';txtarea.focus();" name="emotka"><img border="0" title="Surprised" alt="Surprised" src="images/smiles/yikes.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' 8) \';txtarea.focus();" name="emotka"><img border="0" title="Cool" alt="Cool" src="images/smiles/cool.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :lol: \';txtarea.focus();" name="emotka"><img border="0" title="Laughing" alt="Laughing" src="images/smiles/lol.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :x \';txtarea.focus();" name="emotka"><img border="0" title="Mad" alt="Mad" src="images/smiles/mad.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :P \';txtarea.focus();" name="emotka"><img border="0" title="Razz" alt="Razz" src="images/smiles/tongue.png"/></a></td></tr><tr valign="middle" align="center"> <td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :oops: \';txtarea.focus();" name="emotka"><img border="0" title="Embarassed" alt="Embarassed" src="images/smiles/icon_redface.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :cry: \';txtarea.focus();" name="emotka"><img border="0" title="Crying or Very sad" alt="Crying or Very sad" src="images/smiles/icon_cry.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :evil: \';txtarea.focus();" name="emotka"><img border="0" title="Evil or Very Mad" alt="Evil or Very Mad" src="images/smiles/icon_evil.gif"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :twisted: \';txtarea.focus();" name="emotka"><img border="0" title="Twisted Evil" alt="Twisted Evil" src="images/smiles/icon_twisted.gif"/></a></td></tr><tr valign="middle" align="center"><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :roll: \';txtarea.focus();" name="emotka"><img border="0" title="Rolling Eyes" alt="Rolling Eyes" src="images/smiles/roll.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :wink: \';txtarea.focus();" name="emotka"><img border="0" title="Wink" alt="Wink" src="images/smiles/wink.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :| \';txtarea.focus();" name="emotka"><img border="0" title="Neutral" alt="Neutral" src="images/smiles/neutral.png"/></a></td><td><a href="javascript:txtarea = document.post.message;txtarea.value  += \' :mrgreen: \';txtarea.focus();" name="emotka"><img border="0" title="Mr. Green" alt="Mr. Green" src="images/smiles/icon_mrgreen.gif"/</a></td></tr></tbody></table></td><td id="poletxt"><textarea class="post" tabindex="3" style="width: 100%;background-color:#0c0c0c;" wrap="virtual" rows="10" name="message" id="message"/></textarea></td></tr><tr><td style="padding:0"></td><td style="padding:0" id="opcje"><table width="100%"><tr><td><input type="checkbox" name="disable_bbcode"/> <span class="gen">Wyłącz BBCode</span> <input type="checkbox" name="disable_smilies"/> <span class="gen">Wyłącz Uśmieszki</span> <input type="checkbox" checked="checked" name="attach_sig"/> <span class="gen">Dodaj podpis</span></td><td align="right"><input type="hidden" name="mode" value="reply" /><input type="hidden" name="sid" value="'+sid+'" /><input type="hidden" name="t" value="'+topicid+'" /><input type="submit" accesskey="s" tabindex="5" name="post" class="mainoption" value="Wyślij" id="post" /></td></tr></table></td></tr></table></form>';
		var tr = document.createElement("tr");
		tr.appendChild(td);
		targetd.parentNode.insertBefore(tr, targetd.nextSibling);
	}
	////////////////////

	//Usuniecie listy on-line

// ==UserScript==
// @name           Online List Cleaner 2.0
// @namespace      http://darkwarez.pl
// @include        http://darkwarez.pl/forum/
// @include        http://darkwarez.pl/forum
// @include        http://darkwarez.pl/forum/index.php
// @licence        Beerware
// @version        10/01/2011
// ==/UserScript==

 	var rangi = new Array();
	rangi["rgb(255, 204, 102)"] = "Admin";
	rangi["rgb(20, 116, 38)"] = "Smod";
	rangi["rgb(153, 153, 0)"] = "Mod";
	rangi["rgb(169, 126, 152)"] = "Uplinker";
	rangi["rgb(198, 186, 198)"] = "Uploader";
	
	var ekipa = new Array();
	var out = new Array();
	
	elements = document.getElementsByTagName('span');
	for(var i in elements)
	{
		if(elements[i].className == 'gensmall' && /to forum:/.test(elements[i].innerHTML))
		{
			var onlineObj = elements[i];
			var usersOnline = onlineObj.getElementsByTagName('a');
			for(i=0;i<usersOnline.length;i++){if(rangi[usersOnline[i].style.color]) {ekipa[i] = new Array(usersOnline[i],rangi[usersOnline[i].style.color]);}}
			
			var io = 0;
			for(var r in rangi)
			{
				for(var ii in ekipa){if(ekipa[ii][1]==rangi[r]) out[io] = ekipa[ii][0];io++;}
			}
			
			var next = onlineObj.firstChild.nextSibling; var pre = next.nodeValue;
			next = next.nextSibling; pre += '<b>'+next.innerHTML+'</b>';
			next = next.nextSibling; pre += next.nodeValue;
			next = next.nextSibling; 
			next = next.nextSibling; pre += '<br />'+next.nodeValue;
			next = next.nextSibling; pre += '<b>'+next.innerHTML+'</b>';
			next = next.nextSibling; pre += next.nodeValue+'<br />Ekipa online: ';
			
			onlineObj.innerHTML = pre;
			for(var iii in out){onlineObj.appendChild(out[iii]); if(iii < out.length-1) {var odstep = document.createTextNode(', ');onlineObj.appendChild(odstep);}}
			break;
		}
	} 
	////////////////////	

	//Sprawdzanie czy mamy pw w czasie rzeczywistym
	var InstantPmNo = ( InstantPmCheck == false ) ? 'checked="checked"' : '';
	var InstantPmYes = ( InstantPmCheck ) ? 'checked="checked"' : '';
	
	$( '#dwcharger_settings_form' ).append( '<div><b>Sprawdzanie nowego pw</b>: Tak <input type="radio" name="instant_pm" id="instant_pm_yes" ' + InstantPmYes + ' /> / Nie <input type="radio" name="instant_pm" id="instant_pm_no" ' + InstantPmNo + ' /></div>' );
	$( '#instant_pm_yes' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'instant_pm', true ); }, 1 );
	});
	$( '#instant_pm_no' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'instant_pm', false ); }, 1 );
	});
	////////////////////
	
	//Nowe Logo
	$( '#dwcharger_settings_form' ).append( '<div><b>Nowe logo</b>: <input type="text" id="new_logo" size="50" value="' + NewLogo + '" /> <input type="button" id="set_logo" value="ZmieĹ" /></div>' );
	$( '#set_logo' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'new_logo', $( '#new_logo' ).val() ); }, 1 );
	});
	////////////////////
	
	//Nowe ikony
	var NewIconsNo = ( NewIcons == false ) ? 'checked="checked"' : '';
	var NewIconsYes = ( NewIcons ) ? 'checked="checked"' : '';
	
	$( '#dwcharger_settings_form' ).append( '<div><b>Nowe ikony dziaĹĂłw</b>: Tak <input type="radio" name="new_icons" id="new_icons_yes" ' + NewIconsYes + ' /> / Nie <input type="radio" name="new_icons" id="new_icons_no" ' + NewIconsNo + ' /></div>' );
	$( '#new_icons_yes' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'new_icons', true ); }, 1 );
	});
	$( '#new_icons_no' ).click( function()
	{
		setTimeout( function() { setPseudoCookie( 'new_icons', false ); }, 1 );
	});
	////////////////////
	return false;
}

function codeOneClickSelect()
{
	var CodeBlocks = $( 'td.code' );
	
	CodeBlocks.each( function( x, y )
	{
		$( this ).attr( 'id', 'code' + x );
		$( this ).parent().parent().find( 'tr:eq(0) > td:eq(0)' ).append( ' <span><small><a style="font-size: 11px;" href="#" id="select_code' + x + '">[zaznacz]</a></small></span>' );
		
		$( '#select_code' + x ).click( function()
		{
			var selection = window.getSelection();            
			var range = document.createRange();
			range.selectNodeContents( document.getElementById( 'code' + x ) );
			selection.removeAllRanges();
			selection.addRange( range );
			
			return false;
		} );
	});
}

function inTopicFastEdit()
{
	if( EnableFastEdit )
	{
		$( 'a[href*="editpost"]' ).each( function( i, value )
		{
			var PostId = $( this ).attr( 'href' ).match( 'p\=([0-9]{0,16})' )[1];
			var Parent = $( this ).parent();
			
			$( this ).click( function()
			{
				$.ajax({
					url: "http://darkwarez.pl/forum/posting.php?mode=editpost&p=" + PostId,
					type: 'GET',
					dataType: 'text',
					contentType: "application/x-www-form-urlencoded; charset=iso-8859-2",
		            beforeSend : function( xhr )
		            {
		            	//Polskie znaki to twĂłr szatana!
		                xhr.overrideMimeType('text/html; charset=iso-8859-2');
		            },
					success: function( responseMessage ) {
						
						//Sprawdzamy, czy moĹźemy edytowaÄ ten post
						//Minal czas
						var CantEdit = new RegExp( 'swoje posty tylko przez ([0-9]{0,5}) godziny' ).exec( responseMessage );
						
						if( CantEdit )
						{
							alert( 'Przepraszamy, ale moĹźesz edytowaÄ swoje posty tylko przez ' + CantEdit[1] + ' godziny! Wykup dodatkowe poziomy konta lub zakup rangÄ Vip/Svip aby zwiÄkszyÄ swĂłj czas edycji.' );
							
							return false;
						}
						
						//Nie nasz post :)
						var CantEdit = false;
						var CantEdit = new RegExp( 'jedynie swoje posty' ).exec( responseMessage );
	
						if( CantEdit )
						{
							alert( 'Przepraszamy, ale moĹźesz edytowaÄ jedynie swoje posty!' );
							
							return false;
						}
						
						//Post nie istnieje...
						var CantEdit = false;
						var CantEdit = new RegExp( 'nie istnieje' ).exec( responseMessage );
	
						if( CantEdit )
						{
							alert( 'Przepraszamy, ale taki post nie istnieje' );
							
							return false;
						}
						
						var TimeToGo = parseInt( /var num \= ([0-9]{0,3})\;/.exec( responseMessage )[1] );
						var Message = $( responseMessage ).find( 'textarea' ).html();
						
						Parent.append( '<div id="fastedit_box" style="width: 20%;height: 45%;position: absolute;background-color: #222222;font-size: 12px;padding: 8px;padding-bottom: 0px;border: 1px black solid;-moz-border-radius: 6px;"><div style="float: left;"><b>Nowa treĹÄ</b></div><div style="float: right;"><a href="#" id="close_editbox">[zamknij]</a></div><br /><form action="posting.php" method="POST"><textarea style="color: white;background-color: #121212;width: 100%;height: 93%;" name="message">' + Message + '</textarea><br /><input id="editp" class="post" type="submit" value="WyĹlij!" name="post" /><input type="hidden" name="attach_sig" value="1" /><input type="hidden" value="editpost" name="mode"><input type="hidden" value="' + Sid + '" name="sid"><input type="hidden" value="'+ PostId +'" name="p"></form></div>' );
						$( '#close_editbox' ).click( function() { $( '#fastedit_box' ).remove(); return false; } );
						
						if( TimeToGo > 0 )
						{
							$( '#editp' ).val( 'Odczekaj ' + TimeToGo + ' sekund.' );
							setInterval( (function() { if( TimeToGo > 0 ) { $( '#editp' ).val( 'Odczekaj ' + TimeToGo + ' sekund' ); TimeToGo--; } else if( TimeToGo == 0 ) { $( '#editp' ).val( 'WyĹlij!' ); } }), 1000 );
						}
					},   
				});
				
				return false;
			});
		});
	}
}

function inTopicSearchByAuthor( Forum )
{
	if( Forum == 'gry' || Forum == 'filmy' || Forum == 'seriale-tv-rip' || Forum == 'anime-bajki' || Forum == 'konsole' || Forum == 'programy' )
	{
		var Pages = $( 'span.nav:eq(2)' ).find( 'a' );
		var TopicId = parseInt( FindAction.split( '-' )[0] );
		
		
		if( Pages[ Pages.length - 1 ].innerHTML == 'NastÄpny' )
		{
			var PagesNum = parseInt( Pages[ Pages.length - 2 ].innerHTML );
		}
		else
		{
			var PagesNum = parseInt( Pages[ Pages.length - 1 ].innerHTML );
		}
		
		if( PagesNum )
		{
			var PropablyMorePages = $( 'span.nav:eq(2)' ).find( 'b' ).html();
			
			if( parseInt( PropablyMorePages ) > parseInt( PagesNum ) )
			{
				PagesNum = parseInt( PropablyMorePages );
			}
		}
		
		$( 'select[name="search_keywords"]' ).parent().append( '<span id="seek_by_author_element"><small><font color="#444444">&nbsp;Szukaj postĂłw autora:&nbsp;</font></small> <input class="post" id="search_author" /> <small><font color="#444444">Od <select id="start_from" class="post"></select> strony</font></small> <input type="button" id="submit_seek_by_author" value="UwolniÄ krakena!" class="post" /></span><span id="search_progress"></span>' );
		
		for( var i = 1; i <= PagesNum; i++ )
		{
			$( '#start_from' ).append( '<option value="' + i + '">' + i + '</option>' );
		}
		
		$( '#submit_seek_by_author' ).click( function()
		{
			var Start = parseInt( $( '#start_from' ).val() );
			var Author = $( '#search_author' ).val();
			
			if( Author.length >= 3 && Start < PagesNum )
			{
				ActiveAuthorSeek = true;
				seekPostsByAuthor( Forum, TopicId, Author, PagesNum, Start, Start );
			}
		});
	}
}

function seekPostsByAuthor( Forum, TopicId, Author, PagesNum, Seek, StartFrom )
{
	if( Seek > PagesNum )
	{
		$( '#search_progress' ).html( '<small><font color="#444444">ZakoĹczono szukanie! Znaleziono ' + Posts.length + ' postĂłw.</font></small> <div id="search_author_result" style="display: none;position: absolute;background-color: #232323;border: 1px black solid;width: 600px;padding: 5px;font-size: 12px;margin-top: 10px;"><div style="float: left;"><h1>Wyniki wyszukiwania wd. autora ' +  htmlspecialchars( Author ) + '</h1></div><div style="float: right;"><a href="#" id="close_search_results">zamknij</a></div><div style="clear: both;"></div><div id="found_posts"></div></div>' );
		ActiveAuthorSeek = false;
		
		
		if( Posts.length )
		{
			Posts = Posts.reverse();
			
			$( '#search_author_result' ).css( 'display', 'block' );
			
			for( i in Posts )
			{
				$( '#found_posts' ).html( $( '#found_posts' ).html() + '<div><a href="http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '">http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '</a></div>' );
			}
		}
		
		$( '#close_search_results' ).click( function() { $( '#search_author_result' ).css( 'display', 'none' ); return false; } );
		
		return;
	}
	
	if( !ActiveAuthorSeek )
	{
		return;
	}
	
	$.ajax({
		url: "http://darkwarez.pl/forum/" + Forum + "/" + TopicId + '-xaxa-' + Seek + '.html',
		type: 'GET',
		dataType: 'text',
		contentType: "application/x-www-form-urlencoded; charset=iso-8859-2",
		error: function( xhr, textStatus, thrownError )
		{
			alert( 'AJAX Problem -> ' . thrownError );
		},
		beforeSend : function( xhr )
		{
			//Polskie znaki to twĂłr szatana!
			xhr.overrideMimeType('text/html; charset=iso-8859-2');
		},
		success: function( responseMessage ) {
			
			var SeekPosts = new RegExp( '<span class\=\"name\"\>\<a name\=\"([0-9]{1,16})\"\>\<\/a\>\<b\>\<a href\=\"profil\-([0-9]{1,16})\.html\" class\=\"genmed\"\>\<span(.*?)\>'+ Author +'\<\/span\>\<\/a\>\<\/b\>\<\/span\>', 'g' ).exec( responseMessage );
			
			if( SeekPosts )
			{
				Posts.push( parseInt( SeekPosts[1] ) );
			}
			
			DonePages++;
			var Progress = ( DonePages / ( PagesNum - StartFrom ) ) * 100;
			
			if( ActiveAuthorSeek )
			{
				$( '#seek_by_author_element' ).css( 'display', 'none' );
				$( '#search_progress' ).html( '<small><font color="#444444">PostÄp szukania wd. autora: ' + parseInt( Progress ) + '% <a href="' + window.location.href + '" id="cancel_author_search">anuluj</a></span>' );
			}
			
			$( '#cancel_author_search' ).click( function()
			{
				$( '#search_progress' ).html( '<small><font color="#444444">ZakoĹczono szukanie! Znaleziono ' + Posts.length + ' postĂłw.</font></small> <div id="search_author_result" style="display: none;position: absolute;background-color: #232323;border: 1px black solid;width: 600px;padding: 5px;font-size: 12px;margin-top: 10px;"><div style="float: left;"><h1>Wyniki wyszukiwania wd. autora ' +  htmlspecialchars( Author ) + '</h1></div><div style="float: right;"><a href="#" id="close_search_results">zamknij</a></div><div style="clear: both;"></div><div id="found_posts"></div></div>' );
				ActiveAuthorSeek = false;
				
				
				if( Posts.length )
				{
					Posts = Posts.reverse();
					
					$( '#search_author_result' ).css( 'display', 'block' );
					
					for( i in Posts )
					{
						$( '#found_posts' ).html( $( '#found_posts' ).html() + '<div><a href="http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '">http://darkwarez.pl/forum/post-' + Posts[ i ] + '.html#' + Posts[ i ] + '</a></div>' );
					}
				}
				
				$( '#close_search_results' ).click( function() { $( '#search_author_result' ).css( 'display', 'none' ); return false; } );
				
				return false;
			});
			
			
			//Kolejna strona
			seekPostsByAuthor( Forum, TopicId, Author, PagesNum, Seek + 1, StartFrom );
		}
	});
}

function instantPmCheck()
{
	if( !InstantPmCheck ) return;
	
	setInterval( function()
	{
		$.ajax({
			url: 'http://darkwarez.pl/forum/',
			type: 'GET',
			dataType: 'text',
			contentType: "application/x-www-form-urlencoded; charset=iso-8859-2",
            beforeSend : function( xhr )
            {
            	//Polskie znaki to twĂłr szatana!
                xhr.overrideMimeType('text/html; charset=iso-8859-2');
            },
			success: function( responseMessage ) {
				var Find = new RegExp( /Masz ([0-9]{1,5}) (.*) wiadomoĹ/ ).exec( responseMessage );
				
				if( Find[1] > 0 )
				{
					if( Find[1] == 1 )
						$( 'a[href*="privmsg.php"]:eq(0)' ).html( '<font color="red">Masz ' + Find[1] + ' nowÄ wiadomoĹÄ</font>' );
					else
						$( 'a[href*="privmsg.php":eq(0)]' ).html( '<font color="red">Masz ' + Find[1] + ' nowych wiadomoĹci</font>' );
				}
				else
				{
					$( 'a[href*="privmsg.php"]:eq(0)' ).html( '<font>Nie masz nowych wiadomoĹci</font>' );
				}
			} })
				
	}, InstantPmCheckInterval );
}

function inTopicSelectiveQuote()
{
	if( !SelectiveQuote ) return false;
	
	$( 'a[href*="quote"]' ).click( function()
	{
        var SelectionArea = $( this ).parent().parent().parent().find( 'tr:eq(2)' ).find( 'td[style="row2"]:eq(0)').find('span:eq(0)'); 


        var Selection = window.getSelection();
        if( Selection.containsNode(SelectionArea.get(0), true) )
        {
        	/*if( Selection.rangeCount )
        	{            
        		var Container = document.createElement('div' );
        		for( var i = 0, len = Selection.rangeCount; i < len; ++i )
        		{
        			Container.appendChild( Selection.getRangeAt( i ).cloneContents() );
        		}
        	}
        	
        	Selection = Container.innerHTML;*/
    		return false;
        }
	});
}

function htmlspecialchars(string)
{
	return $('<span>').text(string).html();
}