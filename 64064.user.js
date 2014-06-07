// ==UserScript==
// @name			From forum to friend
// @namespace	        Yang9
// @description		Add friend from forum
// @require			http://code.jquery.com/jquery-latest.js
// @include			http://www.facebook.com/*
// @version			0.0.2
// ==/UserScript==

var _imgAdd = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAAABGdBTUEAANjr9RwUqgAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AAADQElEQVR42mSTy2tcZRjGf9/5vjMzZ87MZGYymWQSG6Wxpk0gqSTVVF0IVaQFF0YQSq0Fuyiif4B/gLiybkQ34sqFihvBuggFMRovDbZCeotWbZuYhEwy98zMybl8n4tZqPjAu3su8PC84vSxFP+GNpByDMX+4Wfy7vpb2b7sdDKV86VKrtjB3Vf9wLsThj5CCADE/ww0pJLGPj4RfVppWvMdr8vIUJYDB8epNjK3bl6/cbLV2l6zLAWAJYD/nIC0W/hAWGL+1Ok3eHDiJKt3avz2612U8ie0cd7uMXtQSeuf9AjwASFEyxcj4cGpp9WRx+b5anCE61cuE6xt0A203NhVSNkTyuhRh03XYi1lEdkwagzNdnXRSR948YnZqWLMNoxPP87YkaOsLC/frFTrr4dBZzdmK5QUqPvpnpMB1iIYLA1xKjPs/VXr1HW3BlEdbJdCCqLI/iPj6NWOPEr80BnsuECmJx2kAWnAwmJVd0jkMgwM5a+quv/86FA6Q7jH94u/bHRC+Zqdnd3So2fxNVhK0asSA8IAlpNUscxnW7dM2k47PyzPrRWK/kg8qXn/8uH62OTItfVyIPOFKMIEPVn+3CB2bB8l63jV7MdzM8dfTqdcGuvKe2H8gjg2MxqXEhoNbb68dLveqLXXnaR5LzTtTywZtRVIECn6Ev3YUpdmzl7DEg7fXHw4UUrnaO1YyESEikXi3CvTuXzOzb17celDr7s3hI4uydRsJm5psRjtqwv57MChsad2Ul0vzu0rFivby3z95xcMFwscLk0iMPhBiONqlpbuD7quaimnpGxlyyefPVMByrRDQ9NrMXW+QRD9zsJHgnU9S6HvJcqNHe7dK7NdruI4sUdqu/o5VQ13jNkXbO3uM5yHalPTDfcQviIAKsUQP9A06wFb5SatvX1sO0YirpSJ6YQYPu8qrxZfMJHI2TJhnXhzcxrH8N07pU1vo79mecWtQnfOT8tiEOpQGG0wRuP7Ecbwo5JahMl0cCLwBIFvFgquZOABzbdWu9Jf6p/q/jxOFIvwo5BIRxhjMBjC0BCGurcDI8AojQjRP32eDBJJ7LijK/GHboDUiKvzyJgFopduDISi93h/DwCBlnQWovsJogAAAABJRU5ErkJggg%3D%3D";
var _imgAddAll = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABL2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarY69SsNQHEfPbUXBIYgEN+HiIC7ix9YxaUsRHGoUSbI1yaWKNrncXD86+RI+hIOLo6BvUHEQnHwEN0EcHBwiZHAQwTOd/xn+/KCx4nX8bmMORrk1Qc+XYRTLmUemaQLAIC211+9vA+RFrvjB+zMC4GnV6/hd/sZsqo0FPoHNTJUpiHUgO7PagrgE3ORIWxBXgGv2gjaIO8AZVj4BnKTyF8AxYRSDeAXcYRjF0ABwk8pdwLXq3AK0Cz02h8MDKzdarZb0siJRcndcWjUq5VaeFkYXZmBVBlT7qt2e1sdKBj2f/yWMYlnZ2w4CEAuTutWkJ+b0W4V4+P2uf4zvwQtg6rZu+x9wvQaLzbotL8H8BdzoL/HAUD36i+bmAAAABGdBTUEAANjr9RwUqgAAACBjSFJNAAB6JQAAgIMAAPQlAACE0QAAbV8AAOhsAAA8iwAAG1iD5wd4AAADUUlEQVR42myTXWhbZRyHf//3vOecJCdtaj5Gk7apm+K66aqb2tFNcBeKExxoh5syvdmVeOEHCDIG88bhrt0EQcQhG5PpvHSi4LywbrGjRWs70tiPpGmSJj3paZK2OV/v60XFKey5/z1Xz4+uvKMDABQGrLZYyrS8L5MJZTjU0dMqlOnmQCr/EsCkLwCNSxABjod/UUaGOKQEpADTuH9G8q4TxXJb5SqMVDo98HtWHVKZdVlXAZVvjXxxV8ArpgQACCFCAY2eU2OP4dCBffjh6/PYcJcgZPBhqynRZRDuBZ8rhQAAruv63clE8+13X0P0/t1Ipnfg24ufwfPMwrZugq4hISWaRGj/T3Ds2MsAAEZk38kuZEavXx8+MiKw64E4enp7xeLsyheailOOJ48y4Vqqrp4lohtS/iOYYS8CTCKoCTEwmPm0mJt4HY1KTC7/hVq5NJmKmaW1pv95uCOIQMcu1Mz8I13G+hMgVgQA5cDTr8L2JJZXXdzOxzeMznj3QnZ8/+1sHdTz7ClhTTzeaulPBWODGHnvIlrLk+Fs1uS66nzv+QTOFYAxmaxVml4x3/6lgEj/B2fOwoOCC+dHL+xRUvyV4/uQSO+FqgfQlXoUJG/tdhwCQGC2LZL5hbVguWpVtx8sP7T9YEHPzEzAWW/i+eG64bl1nWlx6BqApQxapRwadiAtQYqmEvh6Q/DC/Ob03kMBXJq9DA8uOuf78c0bX2F0/BoWZ2cxdutXvBA9gvz8JMZuZuC4hpKrtPxMToIxfWNNUT3dcTyEI4STp6MAJLRwEIOH34Jv9GFqrgxfuBCBDtwxQ7mZlfbJK+MJ9uMfEvwn5UPF7HUxbQKN9TZWN12IqIVnPtkPpy4RrXWjygy4KqHacPDzfLh/ww5dc9vWVU2TH/FFlJhvcAwd30SIBGqbAntOAKaj4rePVSxPVVCvRlCeK2F0LIfs9KSmqjxORG/6vt/HVdFUVrLRwo1zuh1J4MGj76/SpdP31Zpr3BE24NrWd4vFppyaWcKfuRIACdd1GQAioike00Q1sNPq923sNDqN6eQ2kN3g+b4dzScVq40sALGVOjxvKz+iu7/gQgIBw4PLGV8pcufquQhzHBaEzyD/0zwRge7xp78HALGTiD6d9EZSAAAAAElFTkSuQmCC";
var _imgLoading = "data:application/octet-stream;base64,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%3D";
var _imgClose = "data:image/gif;base64,R0lGODlhEAAQAOYAAK4IC9yhpeZlYsg3Ov///9wPFtGUl+hOUOfO0NAeIfR9e+9KM+gkJvJ0ZcQKDfK3vPWTe+JMSLUkKew4KeIqIPnY2vNkYswmKfBgXuyrr7wOEPNiSc8OEewwJ/aLdehoZeYbIvN5Zuo5J6cUGcUWGsY0OuhYW/QhKPFQPOessPFYQco0OfbKzuooIvittPJYX/WDcO5tZ9Sbnve7wNYiIO4/LuIdFu8iJPabg/Rza7cYHvWOesAQFeYvHPrb38wYGuxVV/HN0MQnLfUzLu6zuPeEa+4pKOmtssQTGfI8MPdra/JoVbUQEPBqZfUqKvVLN/FiaMUZIdYiJtYUFdYqJdqVm+kgIu/Q0/R6a+9aW/dKMeZja/XAxb0ZGek1IPVTO+1jZeq0uPdzY/myufzY3Ms5PN8XFeRRUu0hJvmzusEiJvbR1O0mJOglG/rh4/c6MfJsWNkqJtgVGP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAHMALAAAAAAQABAAAAfrgHMKOYSFhoQKgjs4OzA4EJCRkB4KMY8WL1iMO5xAGB4QTU0eGGNkUA2QMFkuaRgwMTEwQC4EFWANDVkzBD4mDbEeMCZctiYHxW5gowICMB5YZw8ELMVrJqNYAh9YcBs1UxkEBERSIhtLIQIRKgtfPQlE4xkcXk8LKBFx7j0XQQQpwhA48mPCgho0qDyhIOQKQAck/qUgMSEJjTgUdDgMgKSNDTUICFTR0EGKlA5IZBjQ0GLIEDMSEMjgwSZBgiFGNAAwwtPIEDkjNNxw8qMMAydWrJxAwxTNiQIgToBYMWcAiatIsmrVWmJOIAA7";
var _imgUpdate = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNqkU8lPE1EY/6ad6dAOSwttLcUolIrAASPVWEncIulBjVESl+jZg4l/ggdvnkz06EU8FA9iNMaIYvRgmhASUw2NQJQuLBZZOixtp515s/k9iojRxIOT/ObNm2/9fQtjmib8z8PS14n+pft4hP4ijyNuIzhEEYOJhq4TTdNAU9VfDnRdj4Fphi5F/CFFqWTEsgw8eTcP54837hbXiSebk8nsQlkydJhA8fefESz0hd6i6HV4YGg2ziAlqaCCIutAI6nEYATO6gv6HLvPHPZ02lgzgsECvzlQFcUPhtZzOuwN5ZYkqKoCIIqKxgQG32YKo+OL1VJZCa6KcmvkgHs/A/pF0zCcSGczA0L6mr18ML9SwtRNePRyKm5D1pqiACrF57Lrb17FZsqySgLikhTc5ea70OaIjnXYqAFRlJ6GaraeRk1kxBTeRx8+m6jkiE4sFuYjMvMlpnLdHf7ane4aVkGdYyh9UaEgy21WC+PQTANSmeU1XdNuYPS7iHi5WITC6hrNciidWeZRpwl1A2hzELGVgVTWjLyqmRvfRgmpcFwU+xFFCrTFMSmfj1pZVpA0s5YDg+oJW20ksvxhuSDX6gzLe9yCkp3LncLIQxzPw+Z8UIR9vjqnKBtgBbWENl+3d+H97DdxUgQu7WppwlqRozg03TJmgjI42dcTwjPs7mxtRR2Yy4oreB+hsooDQmLTX2YSVU4hmbUK6UBv2F6zwxXBWoQwVUiVGNh3oTeULFvAEOyQHJ9Oos1TOo0bDpDnmlwsPY4PDn9y1NlT83xd0jwULjZePleDxYN1Kw9jBSu46h0wFn0eJ5JEo88XX9+q1KAwcAUs3va0svds+fODUqezLSBAS7NN8ftMOkwGDoXdYsKCAdBx/Wooca+fmk1qixNRhm4jwzD0B62qh7G7GsDTLkC1n2NI3gBv1zVo2NP2x5qJU5PGyJ2b2x3YEA6EHcH8Y4vpxmm0fD8EGADFhK0+biwMlwAAAABJRU5ErkJggg%3D%3D";
var _appVersion = '0.0.2';
var _allPost = 0;

if (GM_getValue("myID") == undefined || GM_getValue("myID") == '') {
	_getMyID();
}

if (GM_getValue("usrGroups") == undefined || GM_getValue("usrGroups") == '') {
	GM_deleteValue("usrGroups");
	_getGroups();
}

function _getGroups(){
	var _usrGroup = "";
	GM_xmlhttpRequest({ url:"http://www.facebook.com/friends/?ref=tn", method:'get',
		onload: function(resp){
			$(".UIFilterList_ItemLink",resp.responseText).each(function(){
				var _param4 = $(this)
				var _param3 = _param4.attr("href");
				if(_param3=='#')
				{
					return true
				}
				var _param2 = _param3.split('=');
				var _param1 = _param2[1]
				var _param = _param1.split("_");

				if(_param[0] == 'flp') _usrGroup += _param[1]+":"+$(this).attr('title')+",";
			});
			GM_setValue("usrGroups",_usrGroup);
			GM_setValue("setGroups",_usrGroup.split(',')[0]);			
		}
	});
}


function _getMyID(){
	var _link = $('[accesskey="2"]').attr("href");
	GM_xmlhttpRequest({ url:_link, method:'get',
		onload: function(resp){
			var _myID = $("#profileimage > a",resp.responseText).eq(0).attr("href").split("id=")[1];
			if(_myID){
				GM_setValue("myID",_myID);
			}
		}
	});
}

function _setSettings(){
	if (GM_getValue("usrGroups") != undefined){
		var _tmp = GM_getValue("usrGroups");
		_tmp = _tmp.split(',');
		for(var i=0; i < _tmp.length-1; i++){
			var _selected = "";
			if (GM_getValue("setGroups") == _tmp[i]) _selected = "selected"
			$('#userSelect').append('<option value="'+_tmp[i].split(":")[0]+'"' + _selected + '>'+_tmp[i].split(":")[1]+'</option>');
		}
	}
	if (GM_getValue("setMsg") != undefined) $('#txtMessage').val(GM_getValue("setMsg"));
}

function _AddFriend(_param){
	eval("var _param="+_param);
	GM_xmlhttpRequest({ url:"http://www.facebook.com/addfriend.php?id="+_param.id, method:'get',
		onload: function(resp){
			var _postFormID = $('#post_form_id',resp.responseText).val();
			var _myID = GM_getValue("myID");
			if (GM_getValue("setMsg") != undefined) var _msg = GM_getValue("setMsg");
			if (GM_getValue("setGroups") != undefined) var _group = GM_getValue("setGroups");
			var _data='__a=1&fb_dtsg=ybLx2&flids[0]='+_group+'&message='+_msg+'&post_form_id='+ _postFormID +'&post_form_id_source=AsyncRequest&profile_id='+ _param.id +'&pymk_page=&pymk_score=-1&pymk_source=&source=friend_suggestion&submit=1&user='+_myID;
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://www.facebook.com/ajax/profile/connect.php",
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				data:_data,
				onload: function(postResp){
					_allPost = _allPost - 1;
					var _invite = /Request sent/.exec(postResp.responseText.toString());
					$('.addToFriend_'+_param.id+'_loading').remove();
					if(!_invite) $("#log").append("<div style='color:#FF0000; padding-left:5px' class='log_line'> Already in friends: <b><a style='color:#FF0000;' href='http://www.facebook.com/profile.php?id="+ _param.id +"' target='_blank'>" + _param.name + "</a></b>.</div>");
					else $("#log").append("<div style='color:#CCCCCC; padding-left:5px' class='log_line'> Invited: <b><a style='color:#CCCCCC;' href='http://www.facebook.com/profile.php?id="+ _param.id +"' target='_blank'>" + _param.name + "</a></b>.</div>");
					if(_allPost == 0) {
						$("#log").append("<div style='color:#CCCCCC; padding-left:5px' class='log_line'><br>Done.</div>");
						$('.class_loading').css('display','none');
					}
				}
			});
		}
	});	
}
function _imageToUser(){
	$('.author_post').each(function(){
		var _userID = $(this).attr('href').split('=')[1];
		var _userName = $(this).html();
		$('&nbsp;<img src="' + _imgAdd + '" class="addToFriend" param="{\'id\':\''+ _userID +'\',\'name\':\''+ _userName.replace(/'/g,"") +'\'}" style="cursor:pointer">&nbsp;').insertAfter($(this));
	});
}


function _addAll(){
	_allPost = $('.author_post').length;
	var count = 0
	var intervalId = setInterval(function(){
		var _userID = $('.author_post').eq(count).attr('href').split('=')[1];
		var _userName = $('.author_post').eq(count).html();
		var _param = '{\'id\':\''+ _userID +'\',\'name\':\''+ _userName.replace(/'/g,"") +'\'}';
		_AddFriend(_param);
		count++
		if (count > $('.author_post').length)
		{
			clearInterval(intervalId);
			return true
		}
		},0)
	
}

function _cMenu(){
	var _html = '<div id="log" style="position:absolute; width:250px; top:100px; background:black;" class="pop_container_advanced">'
+ '<div style="color:#3f0; font-size:18px; height:17px; padding-left:15px; font-weight:bold; font-style:italic; font-family:verdana;">Menu<img align="right" class="close_popup" style="cursor:pointer;" src="'+ _imgClose +'"></div>'
+'<hr width="90%" style="color:#FF9900" align="center">'
+ '<div style="color:#CCCCCC; padding-left:5px; cursor:pointer; margin-bottom:3px;" class="showImg"><img src='+ _imgAdd +'>Show add icon to username</div>'
+ '<div style="color:#CCCCCC; padding-left:5px; cursor:pointer; margin-bottom:3px;" class="addAll"><img src='+_imgAddAll +'>Add all post autor to friends<img title="Please wait..." style="display:none;" align="right" class="class_loading" src="'+ _imgLoading +'"></div>'
+ '<fieldset><legend style="color:#FFFFFF">Settings:</legend>'
+ '<div style="color:#CCCCCC; padding-left:10px"> Add friend to group: <br><select style="background:#000000; color:#F00;" id="userSelect"></select> <!--<input type="button" style="background:#000000; font-family: verdana; cursor:pointer; color:#FFFFFF; border:solid 2px #00ff00" value="Update groups"/>--></div><div style="color:#CCCCCC; padding:4px 0 0 10px;"> Message: <input type="text" id="txtMessage" size="30" value=""/>   </div>'
+ '<div style="cursor:pointer; color:#CCCCCC; text-align:center;" id="_update"><img src="' + _imgUpdate + '">Update Groups</div>'
+ '<div align="center" style="padding:2px 0 0 0;"><input type="button" style="background:#000000; cursor:pointer; color:#FFFFFF; border:solid 2px #00ff00; font-family: verdana;" id="save" value="Save"/></div>'
+ '</fieldset></fieldset>'
	
+ '<div style="color:#3f0; font-size:18px; height:17px; padding-left:15px; font-weight:bold; font-style:italic; font-family:verdana;">Log\'s</div>'
+ '<hr width="90%" style="color:#FF9900" align="center">'
+ '</div>'
	$(_html).insertBefore('#fb_menubar');
	_imageToUser();
	_setSettings();
}

$(document).ready(function(){
	var _link = document.location.href;
	if(_link.indexOf("/topic.php") != -1)
	{
		_cMenu();
		$('.addAll').click(function(){
			$('.log_line').remove();
			$('.class_loading').css('display','block');
			_addAll();
		});	
		$('.addToFriend').click(function(){
			eval("var _param="+$(this).attr('param'));
			$('&nbsp;<img src="' + _imgLoading + '" class="addToFriend_'+ _param.id +'_loading">&nbsp;').insertAfter($(this));
			_AddFriend($(this).attr('param'));
		});
		$('.showImg').click(function(){
			_imageToUser();
		});
		$('.close_popup').click(function(){
			$('#log').css('display','none')
		});
		$('#save').click(function(){
			GM_setValue("setGroups",$('#userSelect option:selected').attr("value")+":"+$('#userSelect option:selected').html());
			GM_setValue("setMsg",$('#txtMessage').val());
			$('#settings').css('display','none');
			alert("Settings saved!")
		});
		$('#_update').click(function(){
			$(this).append('<img id="upLoading" src="' + _imgLoading + '">');
			_getGroups();
			setTimeout(function(){document.location = document.location.href},1500)
		});

	}
});