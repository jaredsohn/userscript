// ==UserScript==
// @name           AllmySnow
// @namespace      http://www.allmystery.de/*
// @description    Schneeflocken auf Allmystery
// @include        http://www.allmystery.de/*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////
// SnowFlakes-Script (c) 2011, Dominik Scholz / go4u.de Webdesign
////////////////////////////////////////////////////////////////////////

var snowflakes = {

	///////////////////////////// configuration ////////////////////////////
	
	// amout of flakes
	_amount: 30,
	// random colors
	_color: ['#AAAACC', '#DDDDFF', '#CCCCDD', '#F3F3F3', '#F0FFFF'],
	// random fonts
	_type: ['Arial Black', 'Arial Narrow', 'Times', 'Comic Sans MS'],
	// char used for flake
	_flakeChar: '*',
	// speed of flakes
	_speed: .2,
	// minimum flake font size
	_minSize: 8,
	// maximum flake font size
	_maxSize: 22,
	// horizontal drift
	_drift: 15,
	// zIndex of flakes
	_zIndex: 20000,

	
	
	///////////////////////////// private vars /////////////////////////////
	
	_flakes: [],
	_bodyWidth: 0,
	_bodyHeight: 0,
	_range: null,
	_count: 0,
	_timeout: 20,
	_lastInterval: 0,
	_eventHandlerResize: window.onresize,
	_eventHandlerLoad: window.onload,

	

	////////////////////////////// functions ///////////////////////////////

	// start snow
	start: function()
	{
		if (this._eventHandlerLoad != null) this._eventHandlerLoad();
		
		// calculate range
		this._range = this._maxSize - this._minSize;

		// init window size
		this._windowSize();

		// add new flakes
		while (this._amount > this._flakes.length)
			this._createFlake(this._flakes.length);

		// start to move snow
		this._lastInterval = this._time();
		window.setInterval(function() { snowflakes._move(); }, this._timeout);
	},
	
	
	// get current time
	_time: function()
	{
		return +new Date();
	},
	

	// return a random number bewtween 0 and range
	_random: function(range)
	{
		return Math.floor(Math.random() * range);
	},
	
	
	// creates a new snowflake
	_createFlake: function(i)
	{
		// select body tag
		var insertBody = document.getElementsByTagName('body')[0];

		// create span child for flake
		var f = document.createElement('div');
		f.id                 = 'flake' + i;
		f.style.position     = 'absolute';
		f.style.left         = '0px';
		f.style.top          = '-' + this._maxSize + 'px';
		f.style.color        = this._color[this._random(this._color.length - 1)];
		f.style.family       = this._type[this._random(this._type.length - 1)];
		f.style.fontSize     = (this._random(this._range) + this._minSize) + 'px';
		f.style.zIndex       = this._zIndex;
		f.innerHTML          = this._flakeChar;
		insertBody.appendChild(f);

		// create array element
		this._flakes[i] = {
			x: this._random(this._bodyWidth - this._drift - this._maxSize - 3) + this._drift + 1,
			y: -this._maxSize - this._random(this._bodyHeight),
			size: this._random(this._range) + this._minSize,
			count: this._random(10000)
		};
	},
	

	// restart an existing snow flake
	_restartFlake: function(i)
	{
		this._flakes[i] = {
			x: this._random(this._bodyWidth - this._drift - this._maxSize - 3) + this._drift + 1,
			y: -this._maxSize,
			size: this._random(this._range) + this._minSize,
			count: this._random(10000)
		};
	},

	
	// move existing flakes
	_move: function()
	{
		// calculate movement factor
		var dif = this._time() - this._lastInterval;
		this._lastInterval = this._time();
		var f = dif * this._speed;
		
		this._count += f / 80;
		
		for (var i = 0; i < this._flakes.length; i++)
		{
			var flake = this._flakes[i];
			flake.y += f * this._speed * this._maxSize / flake.size;
			
			// restart existing flake
			if (flake.y + flake.size >= this._bodyHeight)
			{
				this._restartFlake(i);
				continue;
			}
			
			var flakeDiv = document.getElementById('flake' + i);
			flakeDiv.style.left = Math.floor(flake.x + Math.sin(flake.count + this._count) * this._drift) + 'px';
			flakeDiv.style.top  = Math.floor(flake.y) + 'px';
		}
	},
	

	// calculate new positions for all flakes
	_windowSize: function()
	{
		// save old width
		var oldWidth = this._bodyWidth;

		// get new width and height
		this._bodyWidth = this._getWindowWidth() - this._maxSize;
		this._bodyHeight = this._getWindowHeight() - this._maxSize;
		
		// calculate correction ratio
		var ratio = this._bodyWidth / oldWidth;
			
		// for all flakes
		for (var i = 0; i < this._flakes.length; i++)
		{
			var flake = this._flakes[i];

			// do width correction
			flake.x *= ratio;
			
			// restart existing flake
			if ((flake.y + flake.size) >= this._bodyHeight)
				this._restartFlake(i);
		}
	},

	
	// get window width
	_getWindowWidth: function()
	{
		var w = Math.max(self.innerWidth || 0, window.innerWidth || 0);
		
		if (document.documentElement)
			w = Math.max(w, document.documentElement.clientWidth || 0);
		if (document.body)
		{
			w = Math.max(w, document.body.clientWidth || 0);
			w = Math.max(w, document.body.scrollWidth || 0);
			w = Math.max(w, document.body.offsetWidth || 0);
		}
		
		return w;
	},

	
	// get window height
	_getWindowHeight: function()
	{
		var h = Math.max(self.innerHeight || 0, window.innerHeight || 0);
		
		if (document.documentElement)
			h = Math.max(h, document.documentElement.clientHeight || 0);
		if (document.body)
		{
			h = Math.max(h, document.body.clientHeight || 0);
			h = Math.max(h, document.body.scrollHeight || 0);
			h = Math.max(h, document.body.offsetHeight || 0);
		}
		
		return h;
	},
	

	// handle resize event
	resize: function()
	{
		if (this._eventHandlerResize != null)
			this._eventHandlerResize();
		this._windowSize();
	}

};


// register window resize event
window.onresize = function() { snowflakes.resize(); }
window.onload = function() { snowflakes.start(); }