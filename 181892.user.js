// ==UserScript==
// @name           IgnoreList
// @namespace      klavogonki
// @include        http://klavogonki.ru/g*
// @author         Fenex
// @version        3.1.0
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==

function exe() {
	angular.module('ignorelist', [])
	.directive('ngIgnoreList', function() {
		return {
			restrict: 'A',
			scope: {
				list: '='
			},
			link: function (scope, element, attrs) {
				var count = 0;
				
				function check2hide(c) {
					var ps = element.children('p');
					var start = count;
					count = c;
					for(var i=start; i<c; i++) {
						var user_elem = ps[i].getElementsByClassName('username')[0];
						if(!user_elem)
							continue;
						var user_id = parseInt(user_elem.getElementsByTagName('span')[0].getAttribute('data-user'
						));
						if(scope.list.indexOf(user_id) != -1)
							ps[i].hide();
					}
				}
				
				function checkP() {
					var c = element.children('p').length;
					if(c!=count) {
						check2hide(c);
					}						
				}
				
				/*scope.$watch(function(){
					return element.children('p').length;
				}, function(oldValue, newValue) {
					console.log([oldValue, newValue]);
				});*/
				
				setInterval(checkP, 10);
				
			}
		};
	})
	.controller('ignoreListCtrl', function($scope){
		$scope.list = [];
		if(localStorage['ignoreList']) {
			try {
				$scope.list = JSON.parse(localStorage['ignoreList']);
			} catch (e) {
				$scope.list = [];
			}
		}
		
		$scope.$watch('list', function(newValue, oldValue) {
			localStorage['ignoreList'] = JSON.stringify(newValue);
		})
		
		$scope.openWin = function() {
			var a = prompt('Введите через запятую ID пользователей для добавления в чёрный список:', $scope.list);
			if(typeof a == 'object')
				return;
				
			a = a.split(',');
			for(var i=0; i<a.length; i++)
				a[i] = parseInt(a[i]);
			$scope.list = a;
		}
	});
	angular.bootstrap(document.getElementById('chat-content'), ['ignorelist']);
}

function try_inject_ignoreList() {
	try {
		if(angular) {
			exe();
			return;
		}
	} catch(e) {}
	setTimeout(try_inject_ignoreList, 100);
}

(function() {
	var m_c = document.getElementById('chat-content').getElementsByClassName('messages-content');

	for(var i=0; i<m_c.length; i++) {
		m_c[i].getElementsByTagName('div')[0].setAttribute('ng:ignore:list', '');
		m_c[i].getElementsByTagName('div')[0].setAttribute('list', 'list');
	}

	var mm = document.getElementById('chat-content').getElementsByClassName('messages');
	for(var i=0; i<mm.length; i++) {
		var th = mm[i].getElementsByTagName('th')[0];
		var td = document.createElement('td');
		td.innerHTML = '<img style="cursor:pointer;" src="http://klavogonki.ru/img/exclamation.gif" title="Чёрный список" ng:click="openWin()" />';
			
		th.parentNode.insertBefore(td, th.nextSimbling);
	}

	document.getElementById('chat-content').setAttribute('ng:controller', 'ignoreListCtrl');

	var s = document.createElement('script');
	s.innerHTML = exe + try_inject_ignoreList + '\r\ntry_inject_ignoreList()';
	document.body.appendChild(s);		

})();