/*
	@name: 
	@author: Kevin Lucich
	@version: 1.1.0
	Creation: 2014-01-02
	Last review: 2014-01-02
*/


// ==UserScript==
// @name			Organizing Travian's Messages
// @description		Organizes the Travian's Messages in sections: MC, SPAM, OTHER
// @version			1.1.0
// @include			http://*.travian.*/nachrichten.php*
// @include			http://*.travian.*/dorf*.php*
// @include			http://*.travian.*/build.php*
// @require			http://code.jquery.com/jquery-2.0.3.min.js
// @require			https://dl.dropboxusercontent.com/s/10axweh4hq7v0tx/KUtils.js
// @require			https://dl.dropboxusercontent.com/s/xf3bl4cuu164a14/JSKDB.js
// @grant			none
// ==/UserScript==

///////////////////////////

this.$ = this.jQuery = jQuery.noConflict(true);

///////////////////////////
///////////////////////////
///////////////////////////

var TravianKMessages = {

	'getMessages': function( page ){

		page = (typeof page !== 'undefined' && page.constructor == Number) ? page : 1;

		if( page == 1 ){
			jQuery('#overview').empty();
		}

		var last_page = parseInt((new RegExp(/page=([\d]*)/).exec( jQuery('.administration > .paginator > .last').attr('href') ))[1]);

		jQuery('<span>').load( 'nachrichten.php?t=0&o=0&page='+ page +' #overview', function( html ) {
			var $messages = jQuery(html).find('#overview tr').not(':first-child');
			//  Delete the header
			jQuery('#overview').append( $messages );

			//  i order the list when last page is loaded
			if( page < last_page ){
				TravianKMessages.getMessages( ++page );
			}else{
				TravianKMessages.sortListMessages();
				$('.administration > .paginator').remove();
			}
		});
	},

	'sortListMessages': function(){

		var $overview = $('#overview');

		var sections = {
			'ALTRO': []
		};
		var RegexRows = TravianDB.select('sections');
		//  Default
		if( KUtils.objSize( RegexRows ) == 0 ){
			var __defatuls = [
				{
					'label': 'SPAM',
					'match': 'spam'
				},
				{
					'label': 'MC',
					'match': 'MC'
				}
			];
			TravianDB.insertData('sections',__defatuls);
			RegexRows = TravianDB.select('sections');
		}

		var $TravianTableHeader = $overview.find('tr').first().clone();
		$overview.find('tr').first().remove();

		$overview.find('tr').each(function(){
			var $tr = $(this);
			for( r in RegexRows ){
				var rowDB = RegexRows[r];
				var reg = rowDB.match;
				if( $tr.find('.subject').text().match(new RegExp(reg)) ){
					if( typeof sections[ rowDB.label ] === 'undefined' )
						sections[ rowDB.label ] = [];
					(sections[ rowDB.label ]).push( $tr.clone() );
					return;
				}
			}
			//  Else, insert into "ALTRO"
			(sections['ALTRO']).push( $tr.clone() );
		});

		$overview.find('tr').remove();

		for( label in sections ){

			var section = sections[label];
			var MD5_label = KUtils.MD5( label );

			var $anchor = jQuery('<div>')
							.append('<span style="float: left;"><a class="sorting asc" href="#"><img alt="ordina" src="img/x.gif"></a>&nbsp;&nbsp;'+ label +': ( '+ section.length +' )</span>')
							.append('<span style="float: right;"><button onclick="TravianKMessages.cancelAllMessagesInSection(this);"> CANCELLA MESSAGGI SEZIONE </button></span>');

			$anchor.on('click',function(){
				$(this).find('a').toggleClass('desc');
				$('.tr_'+ $(this).parent().attr('data-md5row') ).toggle();
				return false;
			});

			var getTD = function( html, classes ){
				html = (typeof html !== 'undefined') ? html : '';
				classes = (typeof classes !== 'undefined') ? classes : '';
				return $('<td data-md5row="'+ MD5_label +'" colspan="4" style="text-align: left;">').addClass( classes ).append( html );			
			};
			var getTR = function( html, classes ){
				html = (typeof html !== 'undefined') ? html : '';
				classes = (typeof classes !== 'undefined') ? classes : '';
				return $('<tr class="'+ classes +'">').append( html );			
			};

			//  Header of section
			$overview
				.append( getTR(getTD('&nbsp;')) )
				.append( getTR(getTD($anchor,'header_'+MD5_label)) );

			if( section.length )
				$overview.append( $TravianTableHeader.clone().addClass('tr_'+MD5_label) );
			else
				$overview.append( $('<tr class="tr_'+ MD5_label +'"><td colspan="4" style="text-align: left;"><i>Nessun messaggio da visualizzare</i></td></tr>') );

			for( var s=0; s<section.length; s++ ){
				$overview.append( (section[s]).addClass('tr_'+MD5_label) );
			}
		}
	},

	'cancelAllMessagesInSection': function(buttonClicked){
		var $buttonClicked = $(buttonClicked);
		var md5row = $buttonClicked.parents('td[data-md5row]').attr('data-md5row');
		$('.tr_'+ md5row +' input:checkbox').prop('checked',true);
		if( confirm('Confermi di voler cancellare i messaggi dalla sezione "'+  +'"?') ){
			$('#delmsg').click();
		}
	},

	'deleteSection': function( key ){
		TravianDB.deleteData('sections', key );
		TravianKMessages.showManagerSections();
	},

	'saveSections': function(){
		TravianDB.truncate('sections');
		var data = [];

		$('#manager_sections tr').each(function(){
			var $tr = $(this);
			var obj = {};
			$tr.find('input').each(function(){
				obj[ $(this).attr('data-info') ] = $(this).val();
			});
			data.push(obj);
		});
		TravianDB.insertData('sections', data );

		TravianKMessages.showManagerSections();
	},

	'showManagerSections': function(){
		var labels = [];
		var sections = jQuery.map( TravianDB.select('sections'), function(item){ return [item]; });
		for( var i in sections[0] )
			if( (sections[0]).hasOwnProperty(i) )
				labels.push( i );

		var $table = jQuery('<table id="manager_sections">').append('<tr>');
		$table.find('tr').append( jQuery('<td>').html('') );
		for( var i in labels ){
			if( (labels).hasOwnProperty(i) )
				$table.find('tr').append( jQuery('<td>').html( labels[i] ) );
		}

		var $tr = null;
		for( var s=0; s<sections.length; s++ ){
			var $tr = jQuery('<tr>');

			$tr.append( jQuery('<td>').html('<img src="img/x.gif" style="background: url(http://ts5.travian.it/gpack/travian_Travian_TerrorBot_Deploy/img/a/delete.gif) no-repeat; height: 12px; width: 7px; cursor: pointer;" onclick="TravianKMessages.deleteSection(\''+ sections[s]['match'] +'\')" />') );

			for( var i in labels ){
				if( (labels).hasOwnProperty(i) )
					$tr.append( jQuery('<td>').html('<input type="text" data-info="'+ labels[i] +'" value="'+ sections[s][ labels[i] ] +'">') );
			}
			$table.append( $tr );
		}

		//	for add new row
		var $tr = jQuery('<tr>');
		$tr.append( jQuery('<td>').html('') );
		for( var i in labels ){
			if( (labels).hasOwnProperty(i) )
				$tr.append( jQuery('<td>').html('<input type="text" data-info="'+ labels[i] +'" value="">') );
		}
		$table.append( $tr );

		var $tr = jQuery('<tr>');
		$tr.append( jQuery('<td colspan="3">').html('<div style="text-align: center; border: 1px dashed red; width: 10%; margin: auto; cursor: pointer;" onclick="TravianKMessages.saveSections();"> SALVA </div>') );
		$table.append( $tr );

		jQuery('#content > form').empty().html( $table );
	}
};

var TravianKBuilder = {

	'vars': {
		'templates': {}
	},

	'addBuild': function(){
	    var $clone = $('#content .titleInHeader').clone();
		TravianDB.insertData( 'tail_construction', [{
			'hash': KUtils.MD5( $clone.text() + getParams().id ),
			'level': $clone.find('span').text().trim().replace(/[a-zA-Z ]*/,''),
			'name': $clone.find('span').remove().end().text().trim(),
			'link': (location.origin +'/dorf2.php?a='+ getParams().id +'&c=a0f296'),
			'resources': (function(){
				var resources = {};
				var $resources = $('#contract .resources');	//	Last is "consumazione del grano"
				$resources.not( $resources.last() ).each(function(){
					var id_resource = $(this).attr('class').split(' ')[1].substr(1,1);
					resources['l'+1] = $(this).text();
				});

				return resources;
			})()
		}]);
		TravianKBuilder.createConstructionBox();
	},

	'deleteBuild': function( id_build ){
		TravianDB.deleteData( 'tail_construction', id_build );
		TravianKBuilder.createConstructionBox();
	},

	'createConstructionBox': function(){

		var constructions = TravianDB.select( 'tail_construction' );
		var $ul = $('<ul>');
		for( c in constructions ){
			var construction = constructions[c];
			var img_delete = '<img src="img/x.gif" style="background: url(http://ts5.travian.it/gpack/travian_Travian_TerrorBot_Deploy/img/a/delete.gif) no-repeat; height: 12px; width: 7px; margin-right: 0.5rem; cursor: pointer;" onclick="TravianKBuilder.deleteBuild(\''+ construction.hash +'\')" /> ';
			$ul.append( $('<li>').attr('data-id_row',c).html( img_delete +'<div>'+ construction.name +' (lvl '+ construction.level +')</div>' ) );
		}

		if( $('#TravianKBuilderContent').length )
			$('#TravianKBuilderContent > ul').html( $ul.html() );
		else{
			$('#sidebarAfterContent > .clear').before( TravianKBuilder.vars.templates.tableOfConstructions );
			$('#TravianKBuilderContent').append( $ul );
		}
	},

	'loopControlBuilder': function(){

		console.info('[TravianKBuilder] loopControlBuilder invoked! ');
		setTimeout( TravianKBuilder.loopControlBuilder, 5000 );

		var construction = TravianDB.selectFirst('tail_construction');
		console.log( construction );

		for(var i=1; i<5; i++ ){
			if( construction.resources['l'+ i] > $('#l'+ i).text() ){
				return;
			}
		}

		//	Redirect for start to build
		location.href = construction.link;
	}

};

localStorage.clear();

var TravianDB = new JSKDB(false);
window.TravianKMessages = TravianKMessages;
window.TravianKBuilder = TravianKBuilder;

var getParams = function(){
	var params = {};
	var _params = ((location.href).split('?')[1]).split('&');
	var len = _params.length;
	for( var p=0; p<len; p++ ){
		var pieces = (_params[p]).split('=');
		params[ pieces[0] ] = pieces[1];
	}
	return params;
};

$(function(){

	$('<div id="loadingTravianKManager">')
		.html('Caricamento TravianKManager in conrso...')
		.css({
			'color': '#FFF',
			'background': '#000',
			'position': 'fixed',
			'right': '0',
			'bottom': '0'
		})
		.appendTo('body');

	TravianDB.createDatabase('TravianKMessages');
	TravianDB.use('TravianKMessages');
	TravianDB.createTable('sections',['label','match'], 'match');
	TravianDB.createTable('tail_construction', ['hash','name','link','level','resources'], 'hash' );

	//  Loading templates		
	jQuery.get( 'https://dl.dropbox.com/s/mywk2ihww7i9b4g/templates.html', function( templates ){

		var $templates = $(templates).find('div[data-role="template"]');

		$templates.each(function(){
			TravianKBuilder.vars.templates[ $(this).attr('id') ] = $(this);
		});

		TravianKBuilder.createConstructionBox();

        if( location.pathname == '/build.php' ){
			var $button = (TravianKBuilder.vars.templates['putInTail']).clone();
			$('#contract .contractLink').append( $button );
        }

        $('#loadingTravianKManager').remove();

        //	Loop per verificare se le costruzioni in coda 
//        TravianKBuilder.loopControlBuilder();
	});

	///////////////////////////

	$('#overview').before('<div style="float: right;"><button onclick="TravianKMessages.getMessages(); return false;"> MOSTRA <strong>TUTTI</strong> I MESSAGGI </button></div>');

	var $tab = jQuery('#content .contentNavi > div.container.normal').first().clone();
	$tab.find('a').attr({
		'id': '',
		'href': '#',
		'onclick': "TravianKMessages.showManagerSections();"
	}).html('Sections of Messages');
	
	jQuery('#content .contentNavi > .clear').before( $tab );


	TravianKMessages.sortListMessages();
});
