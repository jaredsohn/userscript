
// ==UserScript==
// @name           reddit.com - PornNetwork Reason leaver.
// @namespace      v1
// @include        *.reddit.com/*
// ==/UserScript==

function main(){
	
	var pornRX	= /earthporn|villageporn|cityporn|spaceporn|waterporn|abandonedporn|animalporn|humanporn|botanicalporn|adrenalineporn|destructionporn|movieposterporn|albumartporn|machineporn|newsporn|geekporn|bookporn|mapporn|adporn|designporn|roomporn|militaryporn|historyporn|quotesporn|skyporn|fireporn|infrastructureporn|macroporn|instrumentporn|climbingporn/i,
		s		= 'This post was removed as ',
		reasons = {
			source:			localStorage.getItem('SFWreason-source')		|| s+'the image is hosted by an unapproved host.',
			resolution:		localStorage.getItem('SFWreason-resolution')	|| s+'you did not include the resolution.',
			context:		localStorage.getItem('SFWreason-context')		|| s+'you did not include appropriate context in the title.',
			collection:		localStorage.getItem('SFWreason-collection')	|| s+'it is a collection of images or videos.',
			repost:			localStorage.getItem('SFWreason-repost')		|| s+'the image or video has previously been submitted to the subreddit within the last three months, or is currently on the top 100 list.',
			interactive:	localStorage.getItem('SFWreason-interactive')	|| s+'the image is interactive.',
			broken:			localStorage.getItem('SFWreason-broken')		|| s+'the link is dead or was linked improperly.',
			inappropriate:	localStorage.getItem('SFWreason-inappropriate')	|| s+'it doesn\'t belong in this subreddit.',
			pandering:		localStorage.getItem('SFWreason-pandering')		|| s+'the title was begging for upvotes upvotes.',
			spam:			localStorage.getItem('SFWreason-spam')			|| s+'it is spam.'
		};

	var cloneable = $('<div class="remove-reason"><b>Reason:</b><ul><li><textarea placeholder="This post was removed because..." /></li><li><button type="button" disabled>save</button><button>cancel</button><span class="status error">saving....</span></li></ul><div>');

	// Build radio buttons
	var radios = [''];
	for( reason in reasons ){
		radios.push(' <input type="radio" name="reasons" id="'+reason+'"><label for="'+reason+'"> '+reason+'</label> ');
		if( radios.length/2%2 ) radios.splice( -1,0,'<li>' );
		else  radios.push('</li>')
	};

	cloneable.find('ul').prepend( radios.join('') );
	$('.remove-reason input').live('click', function(){
		$(this).parent().parent().find('textarea').text( reasons[this.id] );
		$(this).parent().parent().find('button').removeAttr('disabled');
	});
	$('.remove-reason textarea').live('change', function(){
		var	text = $(this).text(),
			type = $(this).parent().parent().find('li input:checked').attr('id');
		localStorage.setItem('SFWreason-'+type, reasons[type]=text );
	});
	
	$('.remove-reason button:contains("cancel")').live('click',function(){ $(this).parents('.remove-reason').remove() });
	
	$('.remove-reason button:contains("save")').live('click',function(){
		var	button	= $(this),
			reason	= button.parent().parent().find('textarea').text(),
			type	= button.parent().parent().find('li input:checked').attr('id'),
			thing	= button.thing(),
			author	= thing.find('.author:first').text(),
			title	= thing.find('a.title'),
			sr		= reddit.post_site || this.find('.subreddit').text();

		$(this).find('~.status').show();

		$.when( 
			$.post( '/api/submit',
				{
					title:'['+sr+'] ['+author+'] '+title.text()+'['+type+']',
					url:location.origin + title.attr('href'),
					sr:'moderationporn',
					kind:'link',
					uh:reddit.modhash
				}
			),
			$.post( '/api/comment',
				{ parent:thing.thing_id(),uh:reddit.modhash,text:reason },
				function(d){$.post('/api/distinguish/yes',{id:d.jquery[18][3][0][0].data.id, uh:reddit.modhash}) }
			)
		).done( function(){ button.find('~button').click() } );
	});
	
	$('form.remove-button a, .big-mod-buttons .negative').live('click', function(e){
		var sr = reddit.post_site || $(this).thing().find('a.subreddit').text();
		if( !sr || !sr.match(pornRX) || $(this).thing().hasClass('comment') ) return;
		$(this).parents('.remove-button').append( cloneable.clone() )
	});
};

// Add script to the main page scope
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );


// Add CSS
var css = document.createElement('style');
css.type = "text/css";
css.textContent = '\
	.remove-reason { padding:10px 15px;background-color: #FAFAFA;border: 1px solid #369;-moz-border-radius: 7px;-webkit-border-radius: 7px;border-radius: 7px;position:absolute;} \
	.remove-reason textarea { width:350px;height:50px;padding-top:5px } \
	.remove-reason .status{ display:none; } \
	.remove-reason li{ display:block!important;padding:0px!important } \
	.remove-reason label { width:150px;display:inline-block;text-transform:capitalize }';
document.head.appendChild( css );
