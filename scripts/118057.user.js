// JavaScript Document
// ==UserScript==
// @name			Ikariam Answer Alliance
// @autor			Benzouye
// @license			GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @description		Reply to alliance in Ikariam Diplomacy Advisor
// @include			http://s*.ikariam.*/index.php*
// @require			http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require			http://ikariamscriptresources.googlecode.com/svn/tags/Latest/IkariamHostDetection.js
// @exclude			http://board.ikariam.*/*
// @exclude			http://support*.ikariam.*/*
// @version			1.7.0
// ==/UserScript==

// Changelog
// 1.7.0 : Add link to ally members list + translation
// 1.6.0 : Bug reply on special messages (friends, cultural, etc.)
// 1.5.0 : Ajout du remplacement du texte de la chatbox
// 1.4.0 : Bug reply on special messages (friends, cultural, etc.)
// 1.3.0 : Correction for Null treatment
// 1.2.0 : Correction to maintain displaying after answer
// 1.1.0 : Add table for multi-servers
// 1.0.0 : Original version


/*************************************************************************************
	Complete the following table with datas from all played server,
		using the example below :
	
			tabAlly['sX'] = ['xxxx','http://forum.com'];
	
	sX is the number of your server
	xxxx is your ally id
	http://forum.com is your ally forum url
/*************************************************************************************/

var tabAlly = new Array();

/* 	Alpha	*/	tabAlly['s1'] = ['',''];
/* 	Beta	*/	tabAlly['s2'] = ['',''];
/* 	Gamma	*/	tabAlly['s3'] = ['',''];
/* 	Delta	*/	tabAlly['s4'] = ['',''];
/* 	Epsilon	*/	tabAlly['s5'] = ['',''];
/* 	Zeta	*/	tabAlly['s6'] = ['2126','http://praetorians-zeta.monalliance.net/'];
/* 	Eta		*/	tabAlly['s7'] = ['',''];
/* 	Theta	*/	tabAlly['s8'] = ['',''];
/* 	Iota	*/	tabAlly['s9'] = ['',''];
/* 	Kappa	*/	tabAlly['s10'] = ['',''];
/* 	Lambda	*/	tabAlly['s11'] = ['',''];
/* 	My		*/	tabAlly['s12'] = ['',''];
/* 	Ny		*/	tabAlly['s13'] = ['',''];
/* 	Xi		*/	tabAlly['s14'] = ['',''];
/* 	Omikron	*/	tabAlly['s15'] = ['',''];
/* 	Pi		*/	tabAlly['s16'] = ['',''];
/* 	Rho		*/	tabAlly['s17'] = ['24','http://anpe.rho.xooit.fr/index.php'];

/********************************************
*				TRANSLATIONS				*
********************************************/

var translation = new Array();

translation['fr'] = [
			'ChatBox',
			'Message Ally', 'Envoyer un message à tous vos alliés',
			'Membres Ally', 'Voir la liste de vos alliés',
			'Forum Ally', 'Aller sur le forum de l\'alliance',
			'Forum Officiel', 'Aller sur le forum officiel',
			'Ikariam World', 'Aller sur Ikariam World',
			'Wiki Ikariam', 'Aller sur le Wiki Ikariam (Anglais)',
			'Tr. à l\'alliance', 'Transmettre ce message à tous vos alliés' ];
translation['en'] = [
			'ChatBox',
			'Ally Message', 'Send a message to your ally',
			'Members', 'Go to your Ally members list',
			'Ally Forum', 'Go to your Ally forum',
			'Official Forum', 'Go to Ikariam Official Forum',
			'Ikariam World', 'Go to Ikariam World',
			'Ikariam Wiki', 'Go to Ikariam Wiki',
			'Fw. to Ally', 'Forward this message to your ally' ];
translation['us'] = [
			'ChatBox',
			'Ally Message', 'Send a message to your ally',
			'Members', 'Go to your Ally members list',
			'Ally Forum', 'Go to your Ally forum',
			'Official Forum', 'Go to Ikariam Official Forum',
			'Ikariam World', 'Go to Ikariam World',
			'Ikariam Wiki', 'Go to Ikariam Wiki',
			'Fw. to Ally', 'Forward this message to your ally' ];

/********************************************
*				SIMPLE CODE					*
********************************************/

// Ikariam played server
serveur = getServerWorld();
servNum = serveur.substr(1,2);
langue = getServerDomain();

// ChatBox title modification
texte = $('#GF_toolbar ul li.chat a span').html( translation[langue][0] );

// Ally id and forum extraction
var idAlliance = tabAlly[serveur][0];
var pageExterne = tabAlly[serveur][1];

// Ally message
if ( idAlliance != '' )
{
	$('#diplomacyDescription').append('<a class="button"  title="' + translation[langue][2] + '" style="margin-right: 10px;" href="?view=sendIKMessage&msgType=51&allyId=' + idAlliance + '">' + translation[langue][1] + '</a>');
};

// Ally members list
$('#diplomacyDescription').append('<a class="button" title="' + translation[langue][4] + '" style="margin-right: 10px;" href="?view=diplomacyAdvisorAlly&listAllyMembers=1">' + translation[langue][3] + '</a>');

// Ally forum
if ( pageExterne != '')
{
	$('#diplomacyDescription').append('<a class="button" title="' + translation[langue][6] + '" style="margin-right: 10px;" target="_blank" href="' + pageExterne + '">' + translation[langue][5] + '</a>');
};

// Ikariam official forum
$('#diplomacyDescription').append('<a class="button" title="' + translation[langue][8] + '" style="margin-right: 10px;" target="_blank" href="http://board.' + langue +'.ikariam.com/index.php?page=Index">' + translation[langue][7] + '</a>');

// IkariamWorld link
$('#diplomacyDescription').append('<a class="button" title="' + translation[langue][10] + '" style="margin-right: 10px;" target="_blank" href="http://fr.ika-world.com/search.php?view=suche_deluxe&land='+ langue +'&welt='+ servNum +'">' + translation[langue][9] + '</a>');

// Wiki Ikariam link
$('#diplomacyDescription').append('<a class="button" title="' + translation[langue][12] + '" style="margin-right: 10px;" target="_blank" href="http://ikariam.wikia.com/wiki/">' + translation[langue][11] + '</a>');

// Answer to alliance link for all messages
if ( idAlliance != '' )
{
	var lien = '';
	var spliter = '';
	var lng = '';
	var reply = '';
	var testspliter = '';

	$('.reply').each(function()
	{
		console.log ( this );
		
		lien = $(this).find('.button:eq(0)');
		spliter = lien.attr('href').split('&');
		lng = spliter.length;

		//Looking for replyto= or id=
		for ( var i = 0; i < lng; i++ )
		{
			if ( (spliter[i].indexOf ( 'replyTo', 0 ))!= -1 )
			{
				reply = spliter[i];
			}
			if ( (spliter[i].indexOf ( 'id', 0 ))!= -1 )
			{
				reply = spliter[i].replace('id', 'replyTo');
			}
		};
		lien.parent().append('<a class="button" href="?view=sendIKMessage&msgType=51&allyId=' + idAlliance + '&' + reply + '">Tr. à l\'Alliance</a>');
	});
};
