// ==UserScript==
// @name          Syndicate-Xchange
// @description	  Add Guild specific data and functionality to YG.
// @author        Robert Lynch
// @namespace     http://www.agilepro.com/syxyg
// @include       http://ffxiv.yg.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require 	  http://sizzlemctwizzle.com/updater.php?id=90100&days=1
// ==/UserScript==

//this is the main syx object.  It is mostly here for a cheap for of namespacing but could be expanded to a more robust app object
//script init function is below the object
var syx = {
	modCss:function()
	{
		//move the body down and add our custom CSS file to header
		$('body').css({'margin-top':'20px'});
		$('head').append('<link rel="stylesheet" type="text/css" href="http://ffxiv.syndicate-x.com/assets/css/yg.css">'+"\n");
	},
	//sets most of the live and click listeners that will allow us to trigger actions based on the added syx functionality.
	applyActions:function(){
		//deals with all those have this / not have this or make or need buttons we create via live to keep it short
		$('.syxAction').live('click',function(e){
			e.preventDefault();
			$(this).css({background:'#0f0'});
			syx.setHaveNeed($(this).attr('data-yg-id'),$(this).attr('data-type'),$(this).attr('data-val'));
		});

		//the notes boxes and rating options for admins are handled here.
		$('textarea.syxNotes, select.syxRate').live('change',function()
		{
			var $this = $(this);
			ajaxOptions = {
				url:'http://ffxiv.syndicate-x.com/search/details/',
				data:'item='+$this.attr('data-item')+'&type='+$this.attr('data-type')+'&state='+$this.val(),
				success: function(data)
				{
					$('div.'+$this.attr('data-type')+'_status').html('<p class="tempStatus">Change Accepted</p>');
					echo('returned: '+data);
				}
			}
			xssPost(ajaxOptions);
		});
		//the login box action.
		$('#syxLoginButton').click(function(){
			//sends the login info and...
			ajaxOptions = {
				url:'http://ffxiv.syndicate-x.com/login/',
				data:$('#syxLogin form').serialize(),
				success: function(data)
				{
					//...hides the dialogue on success.
					$('#syxLogin').fadeOut();
					syx.addSyxFunctionality();
				}
			}
			//run the above ajax config
			xssPost(ajaxOptions);

		});

	},
	//called by the have/need button actions set earlier and sends the request to the database.
	setHaveNeed:function(item,type,state)
	{
		echo(type+','+state);
		//set user's disposition to an item
		ajaxOptions = {
			url:'http://ffxiv.syndicate-x.com/search/set/',
			data:'item='+item+'&type='+type+'&state='+state,
			success: function(data)
			{
				echo('sent: '+data);
			}
		}
		xssPost(ajaxOptions);
	},
	//if logged-in this will fire off at the end of init.
	addSyxFunctionality:function(){
		echo('functionality loading');

		//start item table modifications


		//add the custom syx column headers to the item table if there is one.  also make them size auto
		$('#itemList #itemList_headTitle').append('<td class="HeadCol">Actions</td>');
		$('.HeadCol').css('width','auto');

		syx.drawTableFunctions();
		
		$('.HeadCol, .paginationLinks a').click(function(){
			setTimeout(function(){
				$('.syx').remove();
				syx.drawTableFunctions();
			},500);
		});
		
		
		
		//end item table modifications

		//single item page additions
		//this is a better check.  should do something like this above too.
		//check that the url is that of a single item
		if(window.location.pathname.indexOf('item') >= 0){
			echo('indexOf: '+window.location.pathname.indexOf('item'));
			//get the ID of the item displayed from the get string (regex is better you lazy ass.  fix this.)
			var id2 = window.location.search.split('=')[1].split('#')[0];
			//if the "tooltip" table is there...
			if($('table.yg_ffxiv_item_tooltip').length > 0){
				//..request the syx additional details...
				xssGet({
					url:'http://ffxiv.syndicate-x.com/yg/detail/'+id2+'/',
					success:function(data)
					{
						//...and add it after the tooltip.
						$('table.yg_ffxiv_item_tooltip').after(data);
					}
				});
			}
		}
		//end single item


		//the dropdown bar function
		syx.$bar = $('#syxBar');
		syx.$bar.hover(function(){
			syx.timers.barHover = setTimeout(function(){syx.$bar.animate({height:'400px'},500)},250);
		},function(){
			clearTimeout(syx.timers.barHover);
			$(this).animate({height:'15px'},500);
		});

		//used to counf the click of the galka
		var clickCount = 0;
		//this is what happens when the user clicks the links in the bar.  mostly just loads content in via ajax.
		syx.$bar.find('.syxView').click(function()
		{
			var view = $(this).attr('data-view');



			syx.$bar.find('.syxContent').css('display','none');
			xssGet({
				url:syx.base+'yg/'+view+'/',
				success:function(data)
				{
					syx.$bar.find('.syxContent').html(data).fadeIn();

					//E. egg
					if(view == 'danceDanceGalka')
					{
						echo(view+clickCount);
						clickCount++;
						if(clickCount == 2)
						{
							syx.$bar.find('.syxContent').append("<br/>You already got to see the dancing galka.  Don't be greedy. \n <br/>\n <br/> ... \n <br/>\n <br/> well ok... I'll loop it for you, but don;t you dare ask again.");
							syx.$bar.find('.syxContent img').attr('src','http://ffxiv.syndicate-x.com/assets/img/galkaforever.gif');
							return;
						}
						else if(clickCount > 2)
						{
							$('body').css('background','none').html('<h1>Bow to Dima Jex!  You dare anger the mighty Galka?!  Now he has taken your DOM!</h1>');
							$('html').css('background',"url('http://ffxiv.syndicate-x.com/assets/img/galkaforever.gif') repeat top center");
							return;
						}
					}

				}
			});


		});


	},
	drawTableFunctions:function()
	{
		$('#itemList tr').each(function(){
			var $this = $(this);
			//ensure that the Col0 exists and that we are not doing more than 20 requests.
			if($this.find('td.Col0').length > 0)
			{
				
				//split the ID of the item off from the anchor tag (replace with proper regex when bored)
				var id = $this.find('td.Col0 a').attr('href').split('=')[1].split('.')[0];
				//request the item info for this ID
				var html = '<td class="syx syxActions Col5"><button class="syxAction" data-yg-id="'+id+'" data-type="need" data-val="true" data-role="button" value="I NEED this">Need+</button>'+
					'<button class="syxAction" data-yg-id="'+id+'" data-type="need" data-val="false" data-role="button" value="I DON'+"'"+'T NEED this">Need-</button><br>'+
					'<button class="syxAction" data-yg-id="'+id+'" data-type="have" data-val="true" data-role="button" value="I HAVE this">Have+</button>'+
					'<button class="syxAction" data-yg-id="'+id+'" data-type="have" data-val="false" data-role="button" value="I DON'+"'"+'T HAVE this">Have-</button><br>'+
					'<button class="syxAction" data-yg-id="'+id+'" data-type="make" data-val="true" data-role="button" value="I CAN MAKE/PROCURE this">Make+</button>'+
					'<button class="syxAction" data-yg-id="'+id+'" data-type="make" data-val="false" data-role="button" value="I CAN'+"'"+'T PROCURE this">Make-</button><br></td>';
				$this.append(html);
			}
		});
	},
	//called whenever ajax helpers determine the user is not logged in anymore / ever
	//displays login prompt
	loginModal: function(){
		echo('please log in');
		$('#syxLogin').fadeIn();
	},
	$bar: null, // a common cached selector.  why only this one?  I'm lazy.
	timers:{}, // an object for storing timers and intervals
	base:'http://ffxiv.syndicate-x.com/', // hahahahahahahaha.  an afterthought used in one place.  more later.
	syxTableNum:0
};// end syx object


//GM Ajax helpers - mostly unifies the "not logged in" error handling and make the ajax options object look more like jQuery's
//one get, one post

//currently does not support any data passed in GET. use POST for that.
function xssGet(ajax){
	echo('xxsGet');
	ajax.method = "GET";
	ajax.onload = function(response)
	{
		if(response.responseText == 'nologin')
		{
			syx.loginModal();
			return;
		}
		echo(response);
		ajax.success(response.responseText);
	};
	GM_xmlhttpRequest(ajax);
}

//post data should be serialized ahead of time al la get string without the "?"
function xssPost(ajax){
	echo('xxsPost');
	ajax.method = "POST";
	ajax.headers = { "Content-Type": "application/x-www-form-urlencoded" }
	ajax.onload = function(response)
	{
		if(response.responseText == 'nologin')
		{
			syx.loginModal();
			return;
		}
		ajax.success(response.responseText);
	};
	GM_xmlhttpRequest(ajax);
}


var rowCount = 0;
function syxTable(num)
{
	if(num != syx.syxTableNum)
	{
		return;
	}
	
	echo('syxtable: '+rowCount);
	if($('#itemList tr').length <= rowCount || rowCount > 8)
	{
		return;
	}
	
	$this = $('#itemList tr').eq(rowCount);
	
	if($this.find('.syxRating').length){
		rowCount++;
		syxTable(num);
	}
	
	
	else
	{
		rowCount++;
		syxTable(num);
	}

}


//debugging help ftw!
function echo(msg)
{
	try
	{
		console.log(msg);
	}
	catch(err)
	{
		//alert(msg);
	}
}

//keep alive
setInterval(function(){ xssGet({url:syx.base+'ping/'+Math.floor(Math.random()*11)+'/',success:function(data){}}); },60000);




// This is the init function it is called to kick off all this madness.  It is down here becuase GM seemed to be doing something funky with it's concept of document.ready
(function(){
	var versionNum = '0.2.4';
	echo('ver. '+versionNum);
	
	//call the modCss function to shift some YG elements around
	syx.modCss();
	//our first ajax call will load the dom elements needed to add the syx interface overlays.
	xssGet({
			url:'http://ffxiv.syndicate-x.com/yg/load/',
			success:function(data)
			{
				//insert the returned html to the end of the body,
				$('body').append(data);
				$('#syxVersionNum').html('ver. '+versionNum);
				syx.applyActions();
				//this is kinda like a test for if we are logged in.  This code is crap.
				echo('test login');
				//note that the addSyxFunctionality method is called if successful
				xssGet({url:'http://ffxiv.syndicate-x.com/yg/',success:function(){syx.addSyxFunctionality()}});
			}
		});
})();

