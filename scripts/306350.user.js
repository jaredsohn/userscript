// ==UserScript==
// @name        Bible Gateway - Common English Translations
// @description Reduces the drop-down to common english translations, with option to show all
// @namespace   http://userscripts.org/users/lorriman
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     http://www.biblegateway.com*
// @include     http://biblegateway.com*
// @match     http://www.biblegateway.com/*
// @match     http://biblegateway.com/*
// @version     1.2
// @grant       none
// ==/UserScript==



//alert('LOADED');
var validTranslations =
[
   
	
	"KJ21",//21st Century King James Version</option>
	"ASV",//American Standard Version</option>
//	"AMP",//Amplified Bible</option>
//	"CEB",//Common English Bible</option>
//	"CJB",//Complete Jewish Bible</option>
//	"CEV",//Contemporary English Version</option>
//	"DARBY",//Darby Translation</option>
	"DRA",//Douay-Rheims 1899 American Edition</option>
//	"ERV",//Easy-to-Read Version</option>
	"ESV",//English Standard Version</option>
	"ESVUK",//English Standard Version Anglicised</option>
//	"EXB",//Expanded Bible</option>
//	"GNV",//1599 Geneva Bible</option>
//	"GW",//GOD’S WORD Translation</option>
	"GNT",//Good News Translation</option>
//	"HCSB",//Holman Christian Standard Bible</option>
//	"PHILLIPS",//J.B. Phillips New Testament</option>
//	"JUB",//Jubilee Bible 2000</option>
	"KJV",//King James Version</option>
	"AKJV",//Authorized (King James) Version</option>
//	"LEB",//Lexham English Bible</option>
//	"TLB",//Living Bible</option>
//	"MSG",//The Message</option>
//	"MOUNCE",//Mounce Reverse-Interlinear New Testament</option>
//	"NOG",//Names of God Bible</option>
	"NASB",//New American Standard Bible</option>
//	"NCV",//New Century Version</option>
//	"NET",//New English Translation (NET Bible)</option>
//	"NIRV",//New International Reader&#039;s Version</option>
	"NIV",//New International Version</option>
	"NIVUK",//New International Version - UK</option>
	"NKJV",//="selected" >New King James Version</option>
//	"NLV",//New Life Version</option>
//	"NLT",//New Living Translation</option>
	"NRSV",//New Revised Standard Version</option>
	"NRSVA",//New Revised Standard Version, Anglicised</option>
	"NRSVACE",//New Revised Standard Version, Anglicised Catholic Edition</option>
	"NRSVCE",//New Revised Standard Version Catholic Edition</option>
//	"OJB",//Orthodox Jewish Bible</option>
	"RSV",//Revised Standard Version</option>
	"RSVCE",//Revised Standard Version Catholic Edition</option>
//	"VOICE",//The Voice</option>
//	"WEB",//World English Bible</option>
//	"WE",//Worldwide English (New Testament)</option>
	"WYC",//Wycliffe Bible</option>
	"YLT"//Young&#039;s Literal Translation</option>	
	
	
	
	
];
$("select.translation-dropdown > option").each(function (idx, el)
{	//alert('found');
    if ($.inArray($(el).val(), validTranslations) < 0)
        $(el).attr('style','display:none');
});

$('form#quick-search-form').append('<a id="showbibles_link" style="font-size:12px; color:#0000FF;} ">show all</a>');
$('#showbibles_link').click(function(){
	$("select.translation-dropdown > option").each(function (idx, el)
	{			
			$(el).removeAttr('style');
	});
});



