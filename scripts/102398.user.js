// ==UserScript==
// @name           Pubmed Citation Rearange
// @namespace      mailto:jakovATgmxDOTat
// @description    Rearange the Author, Title and Citation so it can be directly copied for citing according to Vancouver guidelines
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        http://www.ncbi.nlm.nih.gov/pubmed*
// ==/UserScript==

$(document).ready(function(){
	auth_list =	$('div.abstract p.auth_list').text();
	journal = $('div.abstract p.citation a').text();
	citation =	$('div.abstract p.citation').text();
	title =		$('div.abstract h1.title').text();
	pmid = 		$('div.abstract span.pmid').text();
	
	auth_list = (auth_list!="" ? auth_list : $('div.abstract .auths').text());
	citation = (citation!="" ? citation : $('div.abstract .cit').text());
	journal = (journal!="" ? journal : $('div.abstract .cit a').text());
	title = (title!="" ? title : $('div.abstract h1').text());
	pmid = (pmid!="" ? pmid : $('div.abstract .rprtid').text());
	
	pmid = pmid.split(' [')[0];
	
	rearange  = $('<span>'+ auth_list+ ' '+ title+ ' <i>'+ journal+ '</i>'+ citation.substr(journal.length)+ ' PubMed '+ pmid+ '</span><br/>');
	rearange.css({'color':'grey'});
	
	filename = $('<span>'+ auth_list.split(',')[0]+ ', '+ title.replace(':', '+').replace('?', '')+ ' ('+ journal+ ' '+ citation.substr(journal.length+1, 4)+ ') ['+ pmid.substr(6).replace(' ', '')+ '].pdf</span>');;
	filename.css({'color':'grey'});
	
	link = $('<a href="http://www.ncbi.nlm.nih.gov/pubmed?holding=iatmzuwlib_fft&myncbishare=MedUniWien&term='+ pmid.substr(6).replace(' ', '')+ '">pubmed:'+ pmid.substr(6).replace(' ', '')+ '</a>');
	link.css({'color':'grey'});
	
	shortcite = $('<span>('+ auth_list.split(',')[0].split(' ')[0]+ ' '+ (auth_list.split(',')[1] ? '<i>et al.</i> ':' ')+ citation.substr(journal.length+1, 4)+')</span>');
	shortcite.css({'color':'grey'});
	
	$('div.abstract').prepend(rearange);
	$('div.abstract').append(filename);
	$('div.abstract').append('<p></p>');
	$('div.abstract').append(shortcite);
	
	////////////
	
	style = $('<style></style>');
	$('head').append(style);
	toggler = $('<a href="#" id="highlight_toggler">Highlighting off</a><br/><br/>');
	$('div.abstract').prepend(toggler);
	
	toggler.toggle(
		function () {
			style.html('.highlight{background-color:transparent !important;}');
			$(this).html('Highlighting on');
		},
		function () {
			style.html('');
			$(this).html('Highlighting off');
		}
	);
});