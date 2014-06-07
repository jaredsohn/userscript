// ==UserScript==
// @name           UserGroups
// @description    you can create group and add your friends there -> invite all friends in your groups in game.
// @namespace      klavogonki
// @include        http://klavogonki.ru/g*
// @include        http://klavogonki.ru/profile/*
// @author         Fenex
// @version        1.0.5
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==

//IMPORTANT! Use framework AngularJS.

function exe() {

	function getIndexByChildId(array, id, mode) {
		for(var i=0; i<array.length; i++) {
			if(array[i].id == id) {
				if(mode=="object")
					return array[i];
				return i;
			}
		}
		
		return false;
	}

	angular.module('userjsusergroups', [])
	.directive('remattr', function($document) {
		return function(scope, element, attr) {
			scope.$watch(attr.href, function(value) {
				var a = attr.remattr.split(' ');
				for(var i=0; i<a.length; i++) {
					if(attr[a[i]]=="" || attr[a[i]] == 'false')
						element[0].removeAttribute(a[i]);
				}
			});
		}
	})
	.filter('listmember', function() { // filter for view objects of members
		return function(input, uppercase) {
			var out = "";
			for(var i=0; i<input.length; i++) {
				out += input[i].name;
				if(i<input.length-1)
					out += ', ';
			}
			// conditional based on optional argument
			//if (uppercase) {
			//	out = out.toUpperCase();
			//}
			return out;
		}
	})
	.controller('userjsUserInviteController', function($scope) { //controller for invite members of groups (include in game)
		$scope.users = userlist_invite;
		$scope.groups = [];
		
		if(localStorage['userjs_usergroups']) {
			$scope.groups = JSON.parse(localStorage['userjs_usergroups']);
			//console.log($scope.groups);
		}
		
		$scope.check = function(id) {
			var users_id = [];
			var index = getIndexByChildId($scope.groups, id, 'index');
			var members = $scope.groups[index].members;
			for(var i=0; i<members.length; i++) {
				users_id.push(members[i].id);
			}
			for(i=0; i<$scope.users.length; i++)
				if(users_id.indexOf($scope.users[i].id.toString())!=-1)
					if(!$('invite-chk-'+$scope.users[i].id).disabled)
						$('invite-chk-'+$scope.users[i].id).checked = true;
		}
		
	})
	.controller('userjsUsergroupsController', function($scope) { //controller for edit groups (include in profile)
		var users = [];
		$scope.active = {
			group: false,
			friend: false,
			user: false
		};
		
		$scope.groups = [];
		$scope.member = [];
		$scope.users = [];
		
		/*setInterval(function(){
			console.log($scope.active.group)
		}, 1000)*/
		
		if(localStorage['userjs_usergroups']) {
			$scope.groups = JSON.parse(localStorage['userjs_usergroups']);
			if($scope.groups && $scope.groups.length > 0)
				$scope.active.group = $scope.groups[0].id;
		}
		
		function existsGroupId(id) {
			for(var i=0; i<$scope.groups.length; i++)
				if($scope.groups[i].id == id)
					return false;
			return true;
		}
		
		function getAllFriends() {
			var users = document.querySelectorAll('.friends-list')[1].getElementsByTagName('a');
			var a = [];
			for(var i=0; i<users.length; i++) {
				a.push({name:users[i].innerHTML, id:users[i].href.match(/[\d]+/)[0]});
			}
			return a;
		}
		
		$scope.users = users = getAllFriends();
		if($scope.users && $scope.users.length > 0)
			$scope.active.user = $scope.users[0].id;
		
		$scope.addGroup = function() {
			var group_name;
			var random;
						
			group_name = prompt("Name of group:", "group_name");
			if(!group_name)
				return;
			for(var i=0; i<100; i++) { //try to set random id for new group
				random = Math.round(Math.random()*1000);
				if(existsGroupId(random))
					break;
				
				if(i==99)
					return false;
			}
			
			$scope.groups.push({name: group_name, id: random, members: []});
			saveData();
		}
		
		$scope.delGroup = function() {
			if(!confirm('Are you sure?'))
				return;
			var id = $scope.active.group;
			$scope.active.group = false;
			
			for(var i=0; i<$scope.groups.length; i++) {
				//console.log($scope.groups[i].id +' == '+ id);
				if($scope.groups[i].id == id) {
					$scope.groups.splice(i, 1);
					break;
				}
			}
			saveData();
		}
		
		function saveData() {
			var g = $scope.groups;
			for(var i=0; i<g.length; i++)
				delete g[i]['$$hashKey'];
			localStorage['userjs_usergroups'] = JSON.stringify(g);
		}
		
		$scope.moveUser = function(mode) {
			if(!$scope.active.group)
				return;
			
			var group_index = getIndexByChildId($scope.groups, $scope.active.group, 'index');
			//console.log(group_index);
			if(group_index.toString()=='false')
				return false;

			switch(mode) {
				case -1:
					if(!$scope.active.user)
						return;
					var user_index = getIndexByChildId($scope.users, $scope.active.user, 'index');
					//console.log(user_index);
					if(user_index.toString()=='false')
						return false;
					$scope.groups[group_index].members.push($scope.users[user_index]);
					$scope.users.splice(user_index, 1);
		
					break;
				case 1:
					if(!$scope.active.member)
						return;
					var member_index = getIndexByChildId($scope.members, $scope.active.member, 'index');
					//console.log(member_index);
					if(member_index.toString()=='false')
						return false;
					$scope.users.push($scope.members[member_index]);
					$scope.members.splice(member_index, 1);
					$scope.changeGroup();
					
					break;
			}
			
			saveData();
		}
	
		$scope.changeGroup = function() {
			var index = getIndexByChildId($scope.groups, $scope.active.group, 'index');
			if(index.toString()=='false')
				return false;
			
			$scope.members = $scope.groups[index].members;
			var u = users;
			$scope.users = [];
			
			for(var i=0; i<u.length; i++) {
				var flag = true;
				
				for(var j=0; j<$scope.members.length; j++) {
					if(u[i].id==$scope.members[j].id) {
						flag = false;
						break;
					}
				}
				if(flag)
					$scope.users.push(u[i]);
			}
		}
		
		$scope.resetData = function() {
			if(!confirm('This operation DELETE ALL groups. Are you sure?'))
				return;
			$scope.groups = [];
			$scope.member = [];
			$scope.users = getAllFriends();
			delete localStorage.userjs_usergroups;
		}
	});
	angular.bootstrap(document.getElementById('userjsusergroups') || document.getElementById('invite'), ['userjsusergroups']);

}

if(document.querySelectorAll('.name a')[0].href.match(/[\d]+/)[0] == location.href.match(/[\d]+/)[0] && /klavogonki\.ru\/profile\/[\d]+($|\/$|\/?\?)/.test(location.href)) {
/*******************************START PROFILE SCRIPT*****************************/

var dl = document.createElement('dl');
dl.setAttribute('ng-app', 'userjsusergroups');
dl.setAttribute('ng-controller', 'userjsUsergroupsController');
dl.id = "userjsusergroups";
dl.innerHTML = '<dt style="cursor:pointer;" title="Открыть редактор групп" ng-init="groupbox = false;" ng-click="groupbox = !groupbox;">Группы:</dt><dd>\
<ul class="friends-list"><li ng-repeat="group in groups">\
<a remattr="href" style="cursor:pointer;text-decoration:underline;" title="{{group.members|listmember}}">{{group.name}}<a>\
</li>\
<div id="groupbox" ng-show="groupbox">\
<table>\
<tr><td>Group</td><td>Members</td><td></td><td>Friends</td></tr>\
<td><select ng-change="changeGroup()" ng-model="active.group" id="select_group" size="10">\
	<option ng-repeat="group in groups" value="{{group.id}}">{{group.name}}</option>\
</select></td>\
<td><select ng-model="active.member" id="select_friend" size="10">\
	<option ng-repeat="member in members" value="{{member.id}}">{{member.name}}</option>\
</select></td>\
<td><a remattr="href" ng-click="moveUser(-1)"><<</a><br /><a remattr="href" ng-click="moveUser(1)">>></a></td>\
<td><select ng-model="active.user" id="select_user" size="10">\
	<option ng-repeat="user in users" value="{{user.id}}">{{user.name}}</option></select>\
</td></tr>\
</table>\
<input type="button" ng-click="addGroup()" value="Add" />\
<input type="button" ng-click="delGroup()" value="Del" /><input type="button" ng-click="resetData()" value="Reset" />\
</div>\
</ul>\
</dd>';

document.querySelectorAll('.friends-list')[0].parentNode.parentNode.parentNode.insertBefore(dl, document.querySelectorAll('.friends-list')[0].parentNode.parentNode);

var s = document.createElement('script');
s.innerHTML = exe + 'exe();';
document.body.appendChild(s);

s = document.createElement('style');
s.innerHTML = '#groupbox{cursor:pointer;position:absolute;background-color:white;border:2px solid black;border-radius:5px;}#groupbox select{font-size:10px;width:100px;}';
document.body.appendChild(s);

/*******************************END PROFILE SCRIPT*****************************/
} else if(/klavogonki\.ru\/g\/?\?/.test(location.href)) {
/********************************START GAME SCRIPT*****************************/
var users = [];
var div = '\
<table><tbody>\
<tr ng-repeat="user in users">\
	<td width="20" align="center">\
		<input ng-disabled="user.enable" type="checkbox" class="invite-chk" id="invite-chk-{{user.id}}">\
	</td>\
	<td>\
		<a target="_blank" href="/profile/{{user.id}}/" style="padding-left: 20px; background: transparent url(\'http://img.klavogonki.ru/avatars/{{user.id}}.gif\') no-repeat 0% 0%">{{user.login}}</a>\
	</td>\
	<td align="right">\
		<img id="invite-img-ok-{{user.id}}" src="/img/ok.gif" style="display:none">\
		<img id="invite-img-loading-{{user.id}}" src="/img/small_loading.gif" style="display:none">\
	</td>\
</tr>\
</tbody></table>';

var div2 = document.createElement('div');
div2.innerHTML = '\
<strong>Группы:</strong>\
<div ng-repeat="group in groups">\
	<a remattr="href" style="cursor:pointer;border-bottom:1px dashed;" ng-click="check(group.id);" title="{{group.members|listmember}}">{{group.name}}</a>\
</div>';

var invite_block = document.getElementById('invite');
invite_block.setAttribute('ng-app', 'userjsusergroups');
invite_block.setAttribute('ng-controller', 'userjsUserInviteController');

document.getElementById('friends-list').parentNode.insertBefore(div2, document.getElementById('friends-list').nextSimbling);

function pushUser(id, login, avatar, enable) {
	users.push({
		id: id,
		login: login,
		avatar: avatar,
		enable: enable
	});
	//console.log(users[users.length-1]);
	return;
}

var online_users = document.querySelectorAll("#friends-list a");
for(var i=0; i<online_users.length; i++) {
	var id = parseInt(online_users[i].href.match(/[\d]+/)[0]);
	var login = online_users[i].innerHTML;
	var enable = false;
	if(!document.getElementById('invite-chk-'+id))
		enable = true;
	pushUser(id, login, false, enable);
}

document.getElementById('friends-list').innerHTML = div;
document.getElementById('select-all').setAttribute('remattr', 'href');
document.getElementById('select-all').setAttribute('onclick', "$$('#friends-list input').each(function(el){if(!el.disabled){el.checked=true;}});");
var a = document.createElement('a');
a.innerHTML = "Снять со всех";
a.setAttribute('style', 'cursor:pointer;margin-left:5px;margin-right:5px;border-bottom: 1px dashed;');
a.setAttribute('onclick', "$$('#friends-list input').each(function(el){el.checked=false;});");
a.setAttribute('remattr', 'href');
document.getElementById('select-all').parentNode.insertBefore(a, document.getElementById('select-all'));

function inviteFriends() {
	var list = new Array();
	$$('#invite .invite-chk:checked').each(function(el)
	{
		var m = el.id.match(/invite-chk-(\d+)/);
		$('invite-img-loading-'+m[1]).show();
		$('invite-img-ok-'+m[1]).hide();
		game.invited_list.push(m[1]);
		list.push(m[1]);
	});
	if(list.length)
	{
		new Ajax.Request('/g/'+game.id+'.invite', {
			parameters: {				
				users: list.join(',')
			}});
	}
}

var json_users = JSON.stringify(users);
var s = document.createElement('script');
s.innerHTML = exe + inviteFriends + '\r\nvar userlist_invite = '+json_users+';\r\nexe()';
document.body.appendChild(s);
}
/********************************END GAME SCRIPT*****************************/