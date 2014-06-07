// ==UserScript==
// @name         fetlife_all_members
// @namespace    bewam.free.fr
// @include      http*://fetlife.com/*
// @version      1.8.1.20140423
// @updateURL    http://userscripts.org/scripts/source/153262.user.js
// @grant       none
// @run-at		document-end
// ==/UserScript==
/*-----------------------------------*/	
const DEBUG = false;
function debug() {
	if (DEBUG && console) {
		console.log.apply(this, arguments);
	}
}
/*-----------------------------------*/
(function ($){

// 	debug('----> '+(typeof $))
	

const STRING_USERS = 'div.user_in_list',
		STRING_VAF = 'viewAllForm',
		ARRAY_GENDER = ['M','F','CD/TV','MtF','FtM','TG','GF','GQ','IS','B','FEM'],
		ARRAY_GENDER_LABEL = ['Male','Female','CD/TV','Trans-MtF','Trans-FtM','Transgender','Gender Fluid','Genderqueer','Intersex','Butch','Femme'],
		ARRAY_ROLE = ['Dom','Domme','Switch','sub','Master','Mistress','slave','pet','kajira','kajirus','Top','Bottom','Sadist','Masochist','Sadomasochist','Ageplayer','Daddy','babygirl','brat','Primal','Fetishist','Kinkster','Hedonist','Vanilla','Unsure'],
		ARRAY_ROLE_LABEL = ARRAY_ROLE,
		ARRAY_INTO_STATUS = ['is into', 'is curious about'],
		ARRAY_INTO_ACTIVITY = ['giving', 'receiving', 'watching', 'wearing', 'watching others wear', 'everything to do with it']
;



var next = '';
/* balance columns */
var altPos = 0,
	currentCount = 0
;
var members = [], // user html storage
	/** NOTE mCache = ARRAY( { i: { [0]'name':'', [1]'age':XX, [2]'gender':WW, [3]'role':'', [4]'location':'', [5]url:'', [6]"hasAvatar":boolean } }) */
	mCache = [],
	listContainers = [] // columns where lists appear
;
var userRegExp = new RegExp('([0-9]{2})('+ARRAY_GENDER.join('|')+')? ('+ARRAY_ROLE.join('|')+')?','i');

/** modified, value, default value*/
var filters = {
	'NameContains': [false,'',''],
	'AgeMin': [false,'',''],
	'AgeMax': [false,'',''],
	'Gender': [false, [], []],
	'Role': [false, [], []],
	'LocContains': [false,'',''],
	'IntoStatus': [false,'',''],
	'IntoActivity': [false,'','']
// has_avatar: @see function
}
var ajaxLocked = false,
	scriptLaunched = false,
	 is_fetishes_page = /^\/fetishes/.test(unsafeWindow.location.pathname)
;
/*-----------------------------------*/
function init()
{
	var nextPage = $('a.next_page');

	var pageUsers = $(STRING_USERS);
	
	/** a next_page link and a list of members are on current page ? go on */
	if( nextPage.length > 0 && pageUsers.length > 0 )
	{
		setContainers(pageUsers)
		debug("listContainers: "+listContainers);

		drawBlock();

		setNext(nextPage);
		$('#'+STRING_VAF+'ButtonGo').click(function()
		{
			if(!scriptLaunched)
			{
				$('#'+STRING_VAF+'ShowCount').html("loading ...")
				updateFilters();
				debug(filters);
				lookPage();
				lookAhead();
				scriptLaunched=true;
			}
		});
	}
};

function drawBlock(){

		var options_gender = '',
			options_role = '',
			options_into_activity = '',
			options_into_status = ''
		;
		$.each(ARRAY_GENDER, function(i,v){options_gender+='<option value="'+v+'" >'+ARRAY_GENDER_LABEL[i]+'</option>'});
		$.each(ARRAY_ROLE, function(i,v){options_role+='<option value="'+v+'" >'+ARRAY_ROLE_LABEL[i]+'</option>'});
		$.each(ARRAY_INTO_ACTIVITY, function(i,v){options_into_activity+='<option value="'+v+'" >'+ARRAY_INTO_ACTIVITY[i]+'</option>'});
		$.each(ARRAY_INTO_STATUS, function(i,v){options_into_status+='<option value="'+v+'" >'+ARRAY_INTO_STATUS[i]+'</option>'});
		
		var BLOCK = '<div id="'+STRING_VAF+'Container" style="position:fixed;top:100px;z-index:1000000;background-color:rgba(255, 255, 255, 0.4);color:black !important;padding:5px;vertical-align:middle;"> \
				<center><u>view all members</u></center>\
				<u>filters</u> <br />\
					name &nbsp;&nbsp;&nbsp;&nbsp;\
						<input id="'+STRING_VAF+'NameContains" type="text" class="filter"></input> <br />\
					location \
						<input id="'+STRING_VAF+'LocContains" type="text" class="filter" ></input> <br />\
					\
					age <br />\
						min: <input id="'+STRING_VAF+'AgeMin" type="text" class="filter" size="2"></input>\
						&nbsp;&nbsp;&nbsp;&nbsp; \
						max: <input id="'+STRING_VAF+'AgeMax" type="text" class="filter" size="2"></input> <br />\
					\
					gender &nbsp;&nbsp;\
						<select id="'+STRING_VAF+'Gender" class="filter" name="gender" multiple="multiple" size="3">\
							<option value="" selected="selected">none specified</option>\
							'+options_gender+
						'</select> <br />\
					\
					Role &nbsp;&nbsp;&nbsp;&nbsp;\
						<select id="'+STRING_VAF+'Role" class="filter" name="role" multiple="multiple" size="5">\
							<option value="" selected="selected">none specified</option>\
							'+options_role+
						'</select>'
		;
		if(is_fetishes_page)
		{
			BLOCK += '<br />\
						Into &nbsp;\
						<select id="'+STRING_VAF+'IntoStatus"  multiple="multiple" size="3">\
							<option value="" selected="selected">All</option>\
							'+options_into_status+
						'</select>\
						<select id="'+STRING_VAF+'IntoActivity" multiple="multiple" size="3">\
							<option value="" selected="selected">All</option>\
							'+options_into_activity+
						'</select>\
					'
			;
		}
		BLOCK +=	'<br />\
					<input type="checkbox" id="'+STRING_VAF+'HasAvatar"><label>\
					only with avatar\
					</label></input>\
				<center>\
				<span id="'+STRING_VAF+'Buttons" style="display:inline;">\
					<input id="'+STRING_VAF+'ButtonGo" type="button" value="view&nbsp;all"></input>\
				</span> <br />\
				<span id="'+STRING_VAF+'ShowCount">\
				</span> \
				</center>\
			</div>';
		
		
        $('body').prepend(BLOCK);
}
function updateFilters()
{
	$('#'+STRING_VAF+'Container').find('select, input[type=text]').each(function(){
		

		var name = $(this).attr('id').replace(STRING_VAF,'')
debug(name)
		if( typeof filters[name][2] != 'string')
		{
			var options = $(this).find('option:selected');
			
			filters[name][0] = false;
			filters[name][1] = [];
			$(options).each( function()
			{
					filters[name][0] = true;
					filters[name][1].push($(this).val());
			});
			if(filters[name][1].length == 1 && filters[name][1][0] == "" )
				filters[name][0] = false;
		}
		else
			if(filters[name][2] != $(this).val())
			{
				filters[name][0] = true;
				filters[name][1] = $(this).val();
			}
			else
			{
				filters[name][0] = false;
				filters[name][1] = filters[name][2];
			}
	});
};
/** due to recursive function*/
function seekingEnded()
{
	debug("total members: "+ members.length);
	showReFilter();
	showCount();
}
/*-----------------------------------*/
function setContainers(pageUsers){
	var parent;
	$(pageUsers).each(function(){
		parent = $(this).parent().get(0);
// 		debug("parent: "+$(parent).attr("class"))

		if($.inArray(parent, listContainers) == -1)
			listContainers.push(parent);
	});
}
function setNext(anchor)
{
	next = ( anchor.length > 0 )? 'https://fetlife.com' + anchor.attr('href'):'';
}
/*-----------------------------------*/
function filter(n)
{
	return (
		filter_role(n)
		&& filter_name(n)
		&& filter_location(n)
		&& filter_has_avatar(n)
		&& filter_gender(n)
		&& filter_role(n)
		&& filter_age_min(n)
		&& filter_age_max(n)
		&& filter_intoStatus(n)
		&& filter_intoActivity(n)
	);
}
function filter_has_avatar(n){
	if($('#'+STRING_VAF+'HasAvatar').attr('checked') && ! mCache[n][6] )
		return false;
	return true;
}
function filter_name(n)
{
	if(filters['NameContains'][0])
		if( mCache[n][0].toLowerCase().indexOf(filters['NameContains'][1].toLowerCase()) < 0 )
			return false;
	return true;
}
/** TODO age */
function filter_age_min(n)
{
	if(filters['AgeMin'][0])
		if( mCache[n][1] <= parseInt(filters['AgeMin'][1]) )
			return false;
	return true;
}
function filter_age_max(n)
{
	if(filters['AgeMax'][0])
		if( mCache[n][1] >= parseInt(filters['AgeMax'][1]) )
			return false;
	return true;
}
function filter_role(n)
{
	if(filters['Role'][0])
		if($.inArray(mCache[n][3], filters['Role'][1]) < 0)
			return false;
	return true;
}
function filter_gender(n)
{
	if(filters['Gender'][0])
		if($.inArray(mCache[n][2], filters['Gender'][1]) < 0)
			return false;
	return true;
}
function filter_location(n)
{
	if(filters['LocContains'][0])
		if( mCache[n][4].toLowerCase().indexOf(filters['LocContains'][1].toLowerCase()) < 0 )
			return false;
	return true;
}
function filter_intoStatus(n)
{
	
	if(filters['IntoStatus'][0])
		if($.inArray(mCache[n][7], filters['IntoStatus'][1]) < 0)
			return false;
	return true;
}
function filter_intoActivity(n)
{
	if(filters['IntoActivity'][0])
		if($.inArray(mCache[n][8], filters['IntoActivity'][1]) < 0)
			return false;
	return true;
}
/*-----------------------------------*/
function lookPage()
{
	var currentUsers = $(STRING_USERS);
	var index = 0
	currentUsers.each(function()
	{
		index = storeUser(this);
		$(this).remove();
		show(index);
	});
}
function lookAhead ()
{
	if( next != '' || ! next.match(/\s*/) )
	{
		debug("next: "+next)
		if(! ajaxLocked){
			ajaxLocked = true;
			$.ajax({
				url: next,
				dataType: 'html',
				useCache: false,
				success: function(data)
				{
					setNext($(data).find('a.next_page'));
					$(data).find(STRING_USERS).each(function(){show(storeUser(this))});
					ajaxLocked = false;
 					lookAhead();
				}
			});
		}
		showCount()
	}
	else
	{
		/*seeking END (current and other pages), now all users are stored in members array*/
		seekingEnded()
	}
}
/*-----------------------------------*/

function showCount(){
	$('#'+STRING_VAF+'ShowCount').html("members: "+currentCount+" of "+members.length)
}
function show(n)
{
	if(filter(n))
	{
		$(listContainers[altPos]).append(members[n]);
		currentCount++;
		altPos = ( altPos == (listContainers.length -1) )? 0 : (altPos+1);
	}
}
/*-----------------------------------*/
function storeUser(user){
    var i = (members.push(user) - 1);
	var M = []; /* match: [whole, age (not null), gender, role ] */
	var firstSpan = $(user).find('div:eq(1) span:first');
	var into, regInto;

	mCache[i] = ['',0,'','','','',false,'', ''];


	/* name */
	mCache[i][0] = firstSpan.text();
	/** profile url */
	mCache[i][5] = firstSpan.find('a:first').attr('href');

	/** hasAvatar */
	mCache[i][6] = ( $(user).find('div:first a:first img').attr('src').indexOf('/images/avatar_missing') == -1 );

	M = $(user).find('div span:nth-child(2)').text().match(userRegExp);
// 	debug("match: "+(M[1]||"")+", "+(M[2]||"")+", "+(M[3]||""));
	/* age */
	mCache[i][1] = M[1];
	/* gender */
	mCache[i][2] = M[2];
	/* role */
	mCache[i][3] = M[3];
	
	/* location*/
	mCache[i][4] = $(user).find('div:eq(1) em').text()||'';
	
	/* into */
	if(is_fetishes_page)
	{
		M = []; /* match: ["into status", "rest aka into activity" ] */
		into = $(user).find('div:eq(1) span:eq(2)').text()||'';
		regInto = new RegExp('^('+ARRAY_INTO_STATUS.join('|')+') ?(.*$)?');
		
		M = into.match(regInto);
		if(M)
		{
			mCache[i][7] = M[1]||'';
			mCache[i][8] = M[2]||'';
		}
		debug("mCache[i][7] = "+mCache[i][7]+"  &&  mCache[i][8] = "+mCache[i][8])
	}
	return i;
}
/*-----------------------------------*/
function showReFilter()
{
	$('#'+STRING_VAF+'Buttons').append(
		'<input id="'+STRING_VAF+'ButtonReFilter" type="button" value="filter&nbsp;again"></input>'
	)
	$('#'+STRING_VAF+'ButtonGo').remove();
	$('#'+STRING_VAF+'ButtonReFilter').click(function()
	{
		altPos = 0, currentCount = 0;
		window.scrollTo(0,0);
		updateFilters();
		debug(filters);
		$(STRING_USERS).remove();
		for(var i = 0; i < members.length; i++){
			show(i)
		}
		showCount();
	});
}
var count=0;

if(typeof $ == 'function')
	init();
else
{ setTimeout( 5000, function(){ if(typeof $ != 'function') alert('fetlife is modified, script '+ GM_info.script.name +'can\'t run please contact the author OR visit http://'+GM_info.script.namespace+'.')});}
/*-----------------------------------*/
})(unsafeWindow.jQuery)


