// ==UserScript==
// @name          Flickr Group List Search
// @description	  Allows restriction of the "add to group" list by search terms
// @namespace     http://www.erik-rasmussen.com/blog/2008/06/07/flickr-group-list-search/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// By Erik Rasmussen (erikwordpressplugins AT gmail)
// ==/UserScript==

(function()
{
	// from prototype.js
	var GroupSearch =
	{
		ids:
		{
			sendToGroup:'photo_gne_button_send_to_group',
			searchBox: 'flickrGroupListSearch',
			dialogList:'sendToGroupDialogListDiv',
			dialogHeader: 'sendToGroupDialogHeaderDiv'
		},
		messages:
		{
			search: 'Search...',
			showAll: 'Show All'
		},

		init: function()
		{
			var sendToGroup = document.getElementById(GroupSearch.ids.sendToGroup);
			if (sendToGroup)
			{
				sendToGroup.addEventListener('blur', function()
				{
					GroupSearch.listen(GroupSearch.ids.dialogList, GroupSearch.showSearch, 0.5);
				}, false);
			}
		},

		listen: function(id, handler, interval)
		{
			GroupSearch.repeater = window.setInterval(function()
			{
				var element = document.getElementById(id);
				if (element && element.firstChild)
				{
					window.clearInterval(GroupSearch.repeater);
					handler(element);
				}
			}, interval);
		},

		showSearch: function(list)
		{
			GroupSearch.map = {};
			for (var i = 0; i < list.childNodes.length; i++)
			{
				var div = list.childNodes[i];
				//                 table      tbody      tr         2nd td        span
				var nameSpan = div.firstChild.firstChild.firstChild.childNodes[1].firstChild;
				var name;
				if (nameSpan.nodeName.toLowerCase() == 'span')
					name = nameSpan.innerHTML;
				else
					name = nameSpan.textContent;
				if (name)
					GroupSearch.map[name.toLowerCase()] = div;
			}
			var box = document.getElementById(GroupSearch.ids.searchBox);
			if (!box)
				box = GroupSearch.makeSearchBox();
			document.getElementById(GroupSearch.ids.dialogHeader).appendChild(box);
			GroupSearch.input.focus();
		},

		makeSearchBox: function()
		{
			// make box
			var box = document.createElement('div');
			box.id = GroupSearch.ids.searchBox;
			box.style.borderTop = '1px solid rgb(221, 221, 221)';
			box.style.paddingTop = '5px';

			// make input
			var input = document.createElement('input');
			GroupSearch.input = input;
			box.appendChild(input);
			input.style.width = '150px';
			if (GroupSearch.terms)
			{
				input.style.color = 'black';
				input.value = GroupSearch.terms;
			}
			else
			{
				input.style.color = 'gray';
				input.value = GroupSearch.messages.search;
			}
			input.addEventListener('focus', function()
			{
				if (input.value == GroupSearch.messages.search)
				{
					input.value = '';
					input.style.color = 'black';
				}
			}, false);
			var inputBlur = function()
			{
				if (input.value == '' || input.value == GroupSearch.messages.search)
				{
					input.value = GroupSearch.messages.search;
					input.style.color = 'gray';
				}
			};
			input.addEventListener('blur', inputBlur, false);
			input.addEventListener('keyup', function()
			{
				if (input.value && input.value != GroupSearch.messages.search)
				{
					if (GroupSearch.timeout)
						window.clearTimeout(GroupSearch.timeout);
					GroupSearch.timeout = window.setTimeout(function()
					{
						GroupSearch.terms = input.value;
						GroupSearch.restrict();
					}, 500);
				}
			}, false);

			// make clear button
			var clear = document.createElement('a');
			clear.href = '#';
			clear.setAttribute('onclick', 'return false;');
			clear.style.marginLeft = '10px';
			clear.addEventListener('click', function()
			{
				input.value = '';
				inputBlur();
				GroupSearch.terms = null;
				GroupSearch.restrict();
				return false;
			}, false);
			clear.appendChild(document.createTextNode(GroupSearch.messages.showAll));
			box.appendChild(clear);
			return box;
		},

		restrict: function()
		{
			if (GroupSearch.terms)
			{
				var terms = GroupSearch.terms.toLowerCase().split(' ');
				for (var key in GroupSearch.map)
				{
					var match = false;
					for (var i in terms)
					{
						if (terms[i] && key.indexOf(terms[i]) >= 0)
						{
							match = true;
							break;
						}
					}
					if (match)
						GroupSearch.map[key].style.display = '';
					else
						GroupSearch.map[key].style.display = 'none';
				}
			}
			else
			{
				// show all
				for (var showKey in GroupSearch.map)
					GroupSearch.map[showKey].style.display = '';
			}
		}
	};
	GroupSearch.init();
})();