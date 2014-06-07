// ==UserScript==
// @name           Path Of Exile Forum Enhancer - Color Blind
// @namespace      ignarsoll-poe-forum-enhancer-color-blind
// @description    A userscript for a troll free forum experience
// @version        0.1
// @author         ignarsoll
// @include        http://www.pathofexile.com/forum/view-thread/*
// @include        http://www.pathofexile.com/forum/view-forum/*
// @include        http*://www.pathofexile.com/account/view-profile/*
// @copyright      2013+, ignarsoll
// ==/UserScript==

require(["main"], function() {
		
	function createOptionsMenu() {

		var block_list = localStorage["poe_block_list"].split("|");
		var green_list = localStorage["poe_green_list"].split("|");

		var str = '<div id="ignarsoll-poe-forum-enhancer-div"><hr style="border: 0;height: 1px; background-image: -webkit-linear-gradient(left, rgba(94,79,69,0), rgba(94,79,69,0.75), rgba(94,79,69,0));background-image:    -moz-linear-gradient(left, rgba(94,79,69,0), rgba(94,79,69,0.75), rgba(94,79,69,0)); background-image:     -ms-linear-gradient(left, rgba(94,79,69,0), rgba(94,79,69,0.75), rgba(94,79,69,0)); background-image:      -o-linear-gradient(left, rgba(94,79,69,0), rgba(94,79,69,0.75), rgba(94,79,69,0)); "><div class="l-pad"><h2>PoE Forum Enhancer Settings</h2><br><table><tr><td style="width:425px"><h3>Block List</h3><ul>';

		for (var i = 0; i < block_list.length; i++) {
			str += '<li><a href="#" onclick="removeFromBlockList(\'' + block_list[i] + '\'); reRenderOptionsMenu(); return false;" style="position:absolute;right:20px;font-weight:bold;text-decoration:none; color:red;">&times;</a><a href="http://www.pathofexile.com/account/view-profile/' + block_list[i] + '">' + block_list[i] + '</a></li>';
		};

		str += '<li><a href="#" onclick="addToBlockList($(\'#block_list_entry\').val()); reRenderOptionsMenu(); return false;" style="position:absolute;right:20px;font-weight:bold;text-decoration:none; color:green;">+</a><input style="margin-top:5px;background-color:black;border:1px solid rgb(57,57,57);color: rgb(190, 182, 152);" id="block_list_entry" type="text" name="block_list_entry" value=""></li>';

		str += '</ul></td><td><h3>Green List</h3><ul>';

		for (var i = 0; i < green_list.length; i++) {
			str += '<li><a href="#" onclick="removeFromGreenList(\'' + green_list[i] + '\'); reRenderOptionsMenu(); return false;" style="position:absolute;right:20px;font-weight:bold;text-decoration:none; color:red;">&times;</a><a href="http://www.pathofexile.com/account/view-profile/' + green_list[i] + '">' + green_list[i] + '</a></li>';
		};

		str += '<li><a href="#" onclick="addToGreenList($(\'#green_list_entry\').val()); reRenderOptionsMenu(); return false;" style="position:absolute;right:20px;font-weight:bold;text-decoration:none; color:green;">+</a><input style="margin-top:5px;background-color:black;border:1px solid rgb(57,57,57);color: rgb(190, 182, 152);" id="green_list_entry" type="text" name="green_list_entry" value=""></li>';

		str += '</ul></td>';

		str += '</tr></table></div></div>';

		return str;

	}

	function createStorageArray(arr) {

		str="";

		for (var i = 0; i < arr.length; i++) {

			str += arr[i] + "|";

		};

		return str.substring(0, str.length - 1);

	}

	function isInArray(val,arr) {
		for (var i=0; i<arr.length; i++)
		if (arr[i] == val)
		return true;
		return false;
	}

	function addToBlockList(name) {

		temp_arr = localStorage['poe_block_list'].split("|");

		if(!isInArray(name,temp_arr)) {

			temp_arr.push(name);

			localStorage['poe_block_list'] = createStorageArray(temp_arr);

		}

	}

	function addToGreenList(name) {

		temp_arr = localStorage['poe_green_list'].split("|");

		if(!isInArray(name,temp_arr)) {

			temp_arr.push(name);

			localStorage['poe_green_list'] = createStorageArray(temp_arr);

		}

	}
	
	function removeFromArray(element,arr) {
		for (var i = 0; i < arr.length; i++) {

			if(arr[i] == element) {

				arr.splice(i, 1);

			}

		};
	}

	function removeFromGreenList(name) {

		temp_arr = localStorage['poe_green_list'].split("|");

		removeFromArray(name,temp_arr);

		localStorage['poe_green_list'] = createStorageArray(temp_arr);

	}

	function removeFromBlockList(name) {

		temp_arr = localStorage['poe_block_list'].split("|");

		removeFromArray(name,temp_arr);

		localStorage['poe_block_list'] = createStorageArray(temp_arr);

	}

	function reRenderOptionsMenu() {

		$('#ignarsoll-poe-forum-enhancer-div').remove();

		$('.v-l-pad').append(createOptionsMenu());

	}

	var script = document.createElement('script');
	script.appendChild(document.createTextNode( reRenderOptionsMenu + removeFromBlockList + removeFromGreenList + removeFromArray + addToGreenList + addToBlockList + isInArray + createStorageArray + createOptionsMenu));
	(document.body || document.head || document.documentElement).appendChild(script);
	
	if(localStorage["poe_block_list"] === undefined ){
		var block_list = new Array("solwitch");
		localStorage["poe_block_list"] = createStorageArray(block_list);
	}

	if(localStorage["poe_green_list"] === undefined ){
		var green_list = new Array("ignarsoll");
		localStorage["poe_green_list"] = createStorageArray(green_list);
	}

	var block_list = localStorage["poe_block_list"].split("|");
	var green_list = localStorage["poe_green_list"].split("|");

	if(location.pathname.substring(0,19) == "/forum/view-thread/"){

		$( "tr" ).each(function( index ) {

			if(isInArray($(this).find('.post_by_account').find('a[class!="twitch"]')[0].textContent,green_list)) {

				$(this).css("outline","1px solid blue");

			}
			else if(isInArray($(this).find('.post_by_account').find('a[class!="twitch"]')[0].textContent,block_list)) {

				$(this).remove();
				//$(this).css("opacity","0.10");

			}

		});

		$( "blockquote" ).each(function( index ) {

			if(isInArray($(this).find('.profile-link').find('a[class!="twitch"]')[0].textContent,block_list)) {

				$(this).css("opacity","0.10");
				
			}

		});

	}
	else if(location.pathname.substring(0,18) == "/forum/view-forum/") {
		
		$( "tr[class!=heading]" ).each(function( index ) {

			if(isInArray($(this).find('div[class=postBy]').find('.post_by_account').find('a[class!="twitch"]')[0].textContent,green_list)) {

				$(this).css("outline","1px solid blue");

			}
			else if(isInArray($(this).find('div[class=postBy]').find('.post_by_account').find('a[class!="twitch"]')[0].textContent,block_list)) {

				$(this).css("opacity","0.10");

			}

		});
		
	}
	else if(location.pathname.substring(0,22) == "/account/view-profile/") {

		if ( $(document).find('.loggedInStatus').find('.profile-link').find('a[class!="twitch"]')[0].textContent == $(document).find('h3[class=profile-name]').text()) {
			$('.v-l-pad').append(createOptionsMenu());
			console.log('Your Account!');
		}
		else {
			console.log('Not Your Account!');
		}

	}

});