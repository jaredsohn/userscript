// ==UserScript==
// @name	   Grooveshark Timer
// @namespace  http://jesdisciple.blogspot.com/
// @version	0.2
// @description  pauses or plays Grooveshark after a specified timeout
// @match	  http://*grooveshark.com/*
// @copyright  2013+, Jesdisciple
// ==/UserScript==

(function ()
{
	"use strict";
	
	var div, input, timeout, timeoutList;
	
	timeout = timeoutFn();
	timeoutList = timeoutListFn();
	
	window.addEventListener('load', function (evt)
	{
		var header, form, submit, list, closeButton;
		
		div = document.createElement('div');
		div.style.backgroundColor = '#ffffff';
		div.style.cssFloat = 'left';
		div.style.width = '130px';
		div.style.margin = 0;
		div.style.padding = 0;
		
		form = document.createElement('form');
		form.style.height = '45px';
		form.style.margin = 0;
		form.style.padding = 0;
		div.appendChild(form);
		
		input = document.createElement('input');
		input.style.display = 'block';
		input.style.width = '100%';
		input.style.height = '50%';
		input.style.margin = 0;
		input.style.padding = 0;
		input.type = 'number';
		input.step = 'any';
		form.appendChild(input);
		
		submit = document.createElement('input');
		submit.style.display = 'block';
		submit.style.width = '100%';
		submit.style.height = '50%';
		submit.style.margin = 0;
		submit.style.padding = 0;
		submit.type = 'submit';
		submit.value = 'Wait';
		form.appendChild(submit);
		
		list = timeoutList();
		div.appendChild(list.timeDisplays);
		
		header = document.getElementById('header-right');
		header.insertBefore(div, header.firstChild);
		
		form.addEventListener('submit', onsubmit);
		
		hoverToggle(div, list.timeDisplays);
		
		function onsubmit(evt)
		{
			console.log('submit');
			
			list.add(timeout(togglePlay, input.valueAsNumber));
			
			input.value = '';
			
			function togglePlay()
			{
				simulateClick(document.getElementById('play-pause'));
			}
			
			evt.preventDefault();
		  
			return false;
		}
		
		function hoverToggle(trigger, target)
		{
			var display;
			
			display = target.style.display;
			
			trigger.addEventListener('mouseover', on);
			trigger.addEventListener('mouseout', off);
			
			off();
			
			function on()
			{
				target.style.display = display;
			}
			
			function off()
			{
				target.style.display = 'none';
			}
		}
	});
	
	window.addEventListener('keypress', function (evt)
	{
		console.log('keypress');
		
		if(evt.which === 84)
		{
			input.focus();
		}
	});
  
	function simulateClick(target)
	{
	  var event;
		
		event = new MouseEvent('click', {
			'view': window,
			'bubbles': true,
			'cancelable': true
	  });
	  return target.dispatchEvent(event);
	}
	
	function timeoutFn()
	{
		var itemTemplate;
		
		itemTemplate = document.createElement('li');
		itemTemplate.style.border = '1px solid black';
		itemTemplate.style.display = 'table-row';
		
		timeDisplay = document.createElement('span');
		timeDisplay.style.border = '1px solid black';
		timeDisplay.style.display = 'table-cell';
		itemTemplate.appendChild(timeDisplay);
		
		closeButton = document.createElement('a');
		closeButton.style.textAlign = 'center';
		closeButton.style.border = '1px solid black';
		closeButton.style.display = 'table-cell';
		closeButton.setAttribute('href', '');
		closeButton.innerText = 'X';
		itemTemplate.appendChild(closeButton);
		
		return timeout;
		
		function timeout(callback, minutes)
		{
			var that, ms, closeButton, element, timeDisplay, timestamp;
			
			ms = minutes * 60 * 1000;
			
			element = itemTemplate.cloneNode(true);
			
			timeDisplay = element.childNodes[0];
			timestamp = Date.now() + ms;
			
			closeButton = element.childNodes[1];
			closeButton.addEventListener('click', function (evt)
			{
				console.log('click');
				
				that.container.remove(that);
				evt.preventDefault();
				return false;
			});
			
			that =
			{
				callback: callback,
				timestamp: timestamp,
				element: element,
				timeDisplay: timeDisplay,
				
				update: update,
			};
			
			that.update();
			
			return that;
		}
		
		function update()
		{
			var date;
			
			date = new Date(this.timestamp - Date.now());
			
			this.timeDisplay.innerText = date.getUTCHours()
																 + ":" + date.getUTCMinutes()
																 + ":" + date.getUTCSeconds();
		}
	}
	
	function timeoutListFn()
	{
		var timeDisplays, interval;
		
		timeDisplays = document.createElement('ol');
		timeDisplays.style.backgroundColor = '#ffffff';
		timeDisplays.style.width = '100%';
		timeDisplays.style.margin = 0;
		timeDisplays.style.padding = 0;
		timeDisplays.style.display = 'table';
		
		return timeoutList;
		
		function timeoutList()
		{
			var interval, that;
			
			interval = window.setInterval(function (){ update.call(that); }, 1000);
			
			that =
			{
				pairs: [],
				timeDisplays: timeDisplays.cloneNode(true),
				
				add: add,
				remove: remove,
				find: find,
				foreach: foreach,
				fits: fits,
			};
			
			return that;
		}
		
		function update()
		{
			var i, next;
			
			i = 0;
			next = this.pairs[i];
			
			while(i < this.pairs.length && next.timestamp <= Date.now())
			{
				this.remove(next);
				next.callback();
				next = this.pairs[i];
			}
			
			this.foreach(function (i, timeout)
			{
				timeout.update();
			});
		}
		
		function add(item)
		{
			var i, item;
			
			item.container = this;
			
			for(i = 0; i < this.pairs.length; ++i)
			{
				if(this.fits(i, item))
				{
					this.timeDisplays.insertBefore(item.element, this.pairs[i].element);
					
					this.pairs.splice(i, 0, item);
					
					return;
				}
			}
			
			this.pairs.push(item);
			
			this.timeDisplays.appendChild(item.element);
		}
		
		function remove(item)
		{
			var index;
			
			index = this.find(item);
			
			if(index != -1)
			{
				this.timeDisplays.removeChild(this.pairs[index].element);
				
				this.pairs.splice(index, 1);
			}
		}
		
		function find(item)
		{
			var start = 0;
			var end = this.pairs.length;
			
			var key = item.timestamp;
			
			var cursor;
			
			var current;
			
			while(true)
			{
				// Try the middle of where it might be.
				cursor = Math.floor((end - start) / 2 + start);
				
				// What's in the middle?
				current = this.pairs[cursor].timestamp;
				
				// Adjust "where it might be."
				if(key < current)
				{
					end = cursor;
				}
				else if(key > current)
				{
					start = cursor;
				}
				else // Found it!
				{
					return cursor;
				}
			}
			
			return -1;
		}
		
		function foreach(f)
		{
			for(var i = 0; i < this.pairs.length; ++i)
			{
				f(i, this.pairs[i]);
			}
		}
		
		function fits(index, item)
		{
			var before = index === 0 ? null : this.pairs[index - 1].timestamp;
			var after = this.pairs[index].timestamp;
			
			return (before === null || before <= item.timestamp) && item.timestamp < after;
		}

	}
})();