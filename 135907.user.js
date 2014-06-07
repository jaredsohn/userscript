// ==UserScript==
// @name Friendlistomatic
// @copyright 2012 - Brandon Venery
// @version 0.1.0.1 (Beta)~Johny5
// @description Facebook MafiaWars Tools.
// ==/UserScript==
(function(){
	//Author: Brandon Venery
	//Bits of code picked to and from Spockholm scripts (thanks yall!) 
var ids = [],found = false,list,members = [],queue = [],friends = [],friends_object = {},not_friends = [],access_token,tag = "flist",permstype,lists = [],flrun = true;
var name; 
var permschecked = false;
var html = '<div id="'+tag+'_main" style="border:solid white 1px;padding:3px;margin-bottom:5px;min-height:100px;background-image:url(http://resdogs.us/images/nsegstamp.jpg);background-repeat: no-repeat;background-size: 100px;background-position: left top;">'+
'<a href="#" id="'+tag+'_close" class="sexy_button_new red short" style="float:right;"><span><span>Close</span></span></a>'+
'<a href="#" id="'+tag+'_perms" class="sexy_button_new white short" style="float:left;"><span><span>Permissions</span></span></a>'+
'<h2 style="text-align:center;">Friendlist-O-Matic</h2>'+
'<div id="'+tag+'_status" style="margin-left:auto;margin-right:auto;text-align:center;">Status: <span></span></div><br/>'+
'<div id="'+tag+'_listlink" style="margin-left:auto;margin-right:auto;text-align:center;"></div>'+
'<div id="'+tag+'_config" style="display:none;text-align:center;">'+
'<span>Current Friend Lists: <select id="'+tag+'_friendlist" ></select>or </span>'+
'<a href="javascript:void(0)" id="'+tag+'_newlist">Create new Friend list</a>'+
'<span style="display:none;" id="'+tag+'_newlistname">New Friend List Name: <input type="text" id="'+tag+'_list"></span><br/><a href="#" id="'+tag+'_fetchlist" class="sexy_button_new orange short"><span><span>Fetch Friendlist</span></span></a></div>'+
'<div id="'+tag+'_buttonrow" style="display:none;text-align:center;">'+
	'<textarea id="'+tag+'_addlist" rows="5" cols="40" style="display:none;" class="customlist"></textarea><br />'+
	'<a href="javascript:void(0);"  id="'+tag+'_customlist" class="customlist sexy_button_new short green" list-type="custom" style="display:none;"><span><span>Load Custom List</span></span></a>'+
	'<a href="javascript:void(0);"  class="'+tag+'_listsload sexy_button_new short green" list-type="mafia"><span><span>Load Mafia</span></span></a>'+
	'<a href="javascript:void(0);"  class="'+tag+'_listsload sexy_button_new short green" list-type="family"><span><span>Load Family</span></span></a>'+
	'<a href="javascript:void(0);"  class="'+tag+'_listsload sexy_button_new short green" list-type="custom"><span><span>Use Custom List</span></span></a>'+
'<div id="'+tag+'_nonfriend"></div><br/>'+
'<div id="'+tag+'_added" style="margin-left:auto;margin-right:auto;text-align:center;"></div>'+
'</div>';

	if($('#'+tag+'_div').length > 0){
		$('#'+tag+'_div').html(html);
	}
	else{
		$('#content_row').prepend('<div id="'+tag+'_div">'+html+'</div>');
	}
	function added(e){
		if($('#'+tag+'_addhead').size() == 0){
			$('#'+tag+'_added').prepend('<h2 id="'+tag+'_addhead">Added</h2>');
		}
		$('#'+tag+'_added').append('<span>'+e+'<br/></span>');
		if($('#'+tag+'_added > span').size() > 10){
			$('#'+tag+'_added > span:first').remove();
		}
	}
	function permscheck(){
	FB.getLoginStatus(function(response){
		$('#'+tag+'_status span:first').text('Checking Permissions......');
		if (Util.isset(response.authResponse)) {
			access_token = response.authResponse.accessToken; 
			permstype = "scope";
			FB.api('/me', 'get', {fields: 'permissions'},function(permissions){
				//console.log(permissions);
				if(!permissions.permissions.data[0].manage_friendlists || !permissions.permissions.data[0].read_friendlists) {
					$('#'+tag+'_perms').removeClass('white').addClass('red').effect("pulsate", { times:5 }, 500);
					$('#'+tag+'_status span:first').text('Lacking Permissions! Allow permissions to continue');
				}
				else{
					$('#'+tag+'_perms').removeClass('white').addClass('green').effect("explode");
					starter();
				}
			});
		}	
		else{
			if(confirm('Facebook Session is Dead, Shall I reload MW?')){
				window.location.href = '//facebook.mafiawars.zynga.com/mwfb/index.php?skip_req_frame=1&mwcom=1';
			}
			else{
				return;
			}
		}
	});	
	}
	permscheck();



	function find_element(search,array,property) {
	if(Util.isset(property)){
		for (var x in array) {
			if (search == array[x][property]) {
				return true;
			}
		}
		return false;
	}
	else{
		for (var x in array) {
			if (search == array[x]) {
				return array[x];
			}
		}
		return false;
	}
	}

	function include(arr,obj) {
		return (arr.indexOf(obj) != -1);
	}
	function convertarr(arr){
		var output = '<h2 style="text-decoration:underline;text-align:center;cursor:pointer;" id="'+tag+'_nf_toggle">Non-Friends</h2><div id="'+tag+'_nfriends" style="margin-left:auto;margin-right:auto;text-align:center;">';
		if(arr.length > 0){
			for(var x = 0; x<arr.length; x++){
			
				output += '<span id="'+arr[x].fbid+'"><a href="http://www.facebook.com/profile.php?id='+arr[x].fbid+'" target=new">'+arr[x].fbname+'</a> <a href="#" class="xfriend">(Click to add)</a></span><br/>';
			}
		}
		else{
			output += '<span>You\'re not missing any friends!</span>';
		}
		output += '</div>';
		return output;
	}
	function starter(){
		$('#'+tag+'_status span:first').text('Gathering Friendlists.....');
		FB.api(User.trackId+'/friendlists', function (msg) {
			if(Util.isset(msg.data)){
				for(var i=0;i<msg.data.length;i++){
					if(msg.data[i].list_type == 'user_created'){
						lists.push({'name':msg.data[i].name,'id':msg.data[i].id});
						$('#'+tag+'_friendlist').append('<option value="'+msg.data[i].id+'">'+msg.data[i].name+'</option>');
					}
				}
				if(lists.length < 1){
					$('#'+tag+'_newlist').trigger('click');
				}
				$('#'+tag+'_config').show();
			}
		});
		$('#'+tag+'_status span:first').text('Select a list or type a name of one to create....');
	}
	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		var preurl = '//facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}	

	function listcheck(n,id){
		if(find_element(id,lists,'id') && id !== undefined){
			if(Util.isset(id) && id !== undefined){
				list = id;
				$('#'+tag+'_listlink').html('Link to your List: <a href="http://www.facebook.com/lists/'+list+'" target="new" class="good">http://www.facebook.com/lists/'+list+'</a>');
			}
			else{
				list = find_element(n,lists,'name').id;
				$('#'+tag+'_listlink').html('Link to your List: <a href="http://www.facebook.com/lists/'+list+'" target="new" class="good">http://www.facebook.com/lists/'+list+'</a>');
			}
			$('#'+tag+'_status span:first').text('Select a method to load...');
			$('#'+tag+'_buttonrow').show();
		}
		else if(find_element(n,lists,'name')){	
			if(Util.isset(id) && id !== undefined){
				list = id;
				$('#'+tag+'_listlink').html('Link to your List: <a href="http://www.facebook.com/lists/'+list+'" target="new" class="good">http://www.facebook.com/lists/'+list+'</a>');
			}
			else{
				list = find_element(n,lists,'name').id;
				$('#'+tag+'_listlink').html('Link to your List: <a href="http://www.facebook.com/lists/'+list+'" target="new" class="good">http://www.facebook.com/lists/'+list+'</a>');
			}
			$('#'+tag+'_status span:first').text('Select a method to load...');
			$('#'+tag+'_buttonrow').show();
		}
		else{
			$('#'+tag+'_status span:first').text('Creating Friendlist....');
			$.ajax({
				type: "GET",
				url: 'https://graph.facebook.com/me/friendlists',
				data: {
					'permissions':'manage_friendlists',
					'access_token':access_token,
					'method':'POST',
					'name':n
				},
				cache: false,
				dataType: "jsonp",
				crossDomain: true,
				success: function(response){
					if(response.id){
						list = response.id;
						$('#'+tag+'_listlink').html('Link to your new List: <a href="http://www.facebook.com/lists/'+list+'" target="new" class="good">http://www.facebook.com/lists/'+list+'</a>');
						$('#'+tag+'_status span:first').text('Select a method to load...');
						$('#'+tag+'_buttonrow').show();
					}
					else{
						alert("Failed to create list, permissions maybe?");
					}
				},
				error: function(err){
					//console.log(err);
				}
			});
		}
	}
	
	function retrieveIDS(type){
		$('#'+tag+'_status span:first').text('Gathering Member Ids.....Please Wait');
		//this where we'll either load a red tag, entire mafia, or custom list 
		//push those ids into the "ids" array
		//then call get_fb_friends 
		switch (type){
			case 'mafia':
				$('#'+tag+'_status span:first').text('Loading Mafia Members.....');
				request('xw_controller=gift&xw_action=view',function(resp){
					$('#'+tag+'_status span:first').text('Parsing Mafia Members...');
					var	$page = $('<div>'+resp+'</div>');
					var $m = $page.find('#mfs_list').find('div');
					$m.each(function(){
						var id = $(this).attr('id').substr(10);
						var name = $(this).text();
						ids[ids.length] = {'fbid':id,'fbname':name};
					});
					get_fb_friends();		
				},$.noop);
				break;
			case 'family':
				$('#'+tag+'_status span:first').text('Loading Family Members.....');
				request('xw_controller=clan&xw_action=view&tab=3',function(resp){
					$('#'+tag+'_status span:first').text('Parsing Family Members...');
					var	$page = $('<div>'+resp+'</div>');
					var $m = $page.find('.level_up');
					$m.each(function(){
						var row = $(this).find('tr').find('td:last').find('img');
						var name = $(this).parent().find('.name_n_rank:first').text();
						var m,id = null; 
						//regexp borrowed from link profile
						if (m=/([0-9]+)_(\d+)\_?q?\.jpg/.exec(row.attr('src'))){						
							id = m[1];
						}
						if(id){
							//ok so not really a FB name, shoot me
							ids[ids.length] = {'fbid':id,'fbname':name};
						}
					});
					get_fb_friends();	
				},$.noop);
				break;
			case 'custom':
				$('#'+tag+'_status span:first').text('Input your list of manual FBIDs.....');
				$('.customlist').show();
				$('#'+tag+'_customlist').click(function(){
					$('.customlist').hide();
					$('#'+tag+'_status span:first').text('Parsing Manual List...');
					$('#'+tag+'_addlist').val($('#'+tag+'_addlist').val().replace(/[^0-9,\n\s]/g,'').split(/[,\n\s]/).join('\n'));
					var f = $('#'+tag+'_addlist').val().split(/[\n]/);
					for(var i = 0;i<f.length;i++){
						//just use the ID vs the name
						ids[ids.length] = {'fbid':f[i],'fbname':f[i]};
					}
					get_fb_friends();
				});
				break;
			default:
				alert('Unknown list, Copy the following text \n Type: '+type);
		}
	}
	function createlist(){
		$('#'+tag+'_status span:first').text('Creating Lists.......');
	
		for(var i=0;i<ids.length;i++){
			if(ids[i].fbid == User.trackId) continue;
			if(!find_element(ids[i].fbid,friends)){
				not_friends.push(ids[i]);
				ids.splice(i,1);
			}
		};
		$('#'+tag+'_nonfriend').html(convertarr(not_friends));
		$('#'+tag+'_nf_toggle').click(function(){
			$('#'+tag+'_nfriends').toggle();
		});
		$('.xfriend').unbind('click').bind('click',function(){
			FB.ui({
				method: 'friends.add',
				id: $(this).parent().attr('id')
			});
			$(this).unbind('click').text('(Clicked)');
			
		});
		FB.api(list+'/members',function(response){
			for(var i=0;i<response.data.length;i++){
						members[members.length] = response.data[i];
			}
			for(var i=0;i<ids.length;i++){
				if(ids[i].fbid == User.trackId) continue;
				if(!find_element(ids[i].fbid,members,'id')){
					queue.push(ids[i]);
				}
			}
			addmembers();
		});
	}
	function addmembers(){
		$('#'+tag+'_status span:first').text('Adding friends to list....'+queue.length+' friends left to add');
		var id = queue.shift();
		if(id != undefined && flrun === true){
			$.ajax({
				type: "GET",
				url: 'https://graph.facebook.com/'+list+'/members/'+id.fbid,
				data: {
					'permissions':'manage_friendlists',
					'access_token':access_token,
					'method':'POST',
				},
				cache: false,
				dataType: "jsonp",
				crossDomain: true,
				success: function(response){
					if(response){
						added('Added: '+id.fbname);
						addmembers();
					}
				},
				error: function(err){
				
				}
			});
		}
		else{
			flrun = false;
			$('#'+tag+'_status span:first').text('All Done');
		}
	}
	//Taken from Spockholm's Family Friends
	function get_fb_friends() {
		$('#'+tag+'_status span:first').text('Checking Friends.........');
		FB.api('/me/friends?access_token=' +access_token,function(response){
			//console.log(response);
			for (x in response.data) {
				friends.push(response.data[x].id);
				friends_object[response.data[x].id] = {"id":response.data[x].id, "name": response.data[x].name};
			}
			createlist();
		});
	}; 
	$('#'+tag+'_perms').click(function() {
		FB.login(function(response){
			if(!permschecked){
				permschecked = true;
				permscheck();
			}
			else{
				$('#'+tag+'_status span:first').text('Failed to allow Permissions!!!');
			}
		},
			{scope:'manage_friendlists,read_friendlists'});
	});
	$('#'+tag+'_fetchlist').click(function(){
		$('#'+tag+'_config').hide();
		if($('#'+tag+'_list').val() != ''){
			listcheck($('#'+tag+'_list').val());
		}
		else{
			listcheck($('#'+tag+'_friendlist:selected').text(),$('#'+tag+'_friendlist').val())
		}
	});
	$('.'+tag+'_listsload').click(function(){
		$('.'+tag+'_listsload').hide();
		retrieveIDS($(this).attr('list-type'));
	});
	$('#'+tag+'_close').click(function(){
		$('#'+tag+'_div').remove();
		flrun = false;
	});
	
	$('#'+tag+'_newlist').click(function(){
		$(this).hide();
		$('#'+tag+'_newlistname').show();
		$('#'+tag+'_friendlist').parent().hide();
	});
	//testing to add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0)
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-32104266-1");
		pageTracker._trackPageview();
		pageTracker._trackPageview("Scripts/friendlistomatic"); 
	} catch(err) {}
	//end analytics
})();