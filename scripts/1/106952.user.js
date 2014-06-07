// ==UserScript==
// @name			eBox
// @namespace		http://idansmith.com/ebox
// @author			Idan Mitrofanov (IdanSmith)
// @description		entertainment box for facebook spend time use
// @documentation	http://idansmith.com/ebox/docs.txt
// @license			creative commons attribution-noncommercial-sharealike 3.0 unported license.
// @version			0.2
// @include			*://www.facebook.com/*
// @match			*://www.facebook.com/*
// @exclude			*://www.facebook.com/ai.php* 
// ==/UserScript==
	
function load_eBox(client) {
	var script = document.createElement("script");
		script.setAttribute("src", "http://idansmith.com/ebox/ebox.script.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
				script.textContent = "(" + client.toString() + ")();";
			document.body.appendChild(script);
		}, false);
	document.body.appendChild(script);
}

function client_eBox() {
	var lab_logo = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAH0AAABHCAMAAAAdv7jcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAA'+
			'AMBQTFRFbJsjssqMvNGbjbFTXZAMw9alfKU6gqpDcZ4p/f79nLtq9vrx+fv20uC88fXpqcR9ZZYakLRZts2R5+7a+/z52+bJ'+
			'1uPBhqxKpsJ5zd616PDd4evSyNqtdqIxYJMR3ejN7vTmq8aBeaM2mbpmosB1lbZgaJgd6vHgrsiG0N+47PLiia5O9Pju2uXH'+
			'8vfs5O3WoL5xxtipl7hjY5QU4+zUy9yyZJUWdKAu+/36YpQTr8mI7PPj3+rQytuwW48J////l3zcjwAAAEB0Uk5T////////'+
			'////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAb/SURBVHja'+
			'vFnpeqowEI2KIKKIWMVapWoV61KttlVcCu//VpdkskFF215sfonky0kmM2fODCj88Zh95Nrl+nxePhSrjUr4PwP9bHon53hB'+
			'bKh542/Q+7YanBnupnV79P6ry/AUr6f1PEVsYNe8LfqCYntPn6e+T/7Sze4TYvuxb4k+JTBo1NITL1oaxZ8vb4VeKZP7HZx1'+
			'8PsewKPVbdBN4myFScpro0Av37gF+mSHD95Nn6C3Ab5+A/QOvvK3avqEZuFzA/C5zNEX+OTWS7pPRHZ3KkPw/GbG6L6Dzf6Y'+
			'vjns87WwAcFfyBh9hBc9pF85Cbhoc2B7ZZYp+gs+k6qnvrcxZin6sYLD17JEv8Ox7KYH8mSPIdv4J7COd5ch+gGv+Jr+/pVA'+
			'NvnUIKhmh25YeMH0o5uE+7fkYpqAns8OPYfXc9LfDyRHvwP0dmboPhESF0gOopymN+sXfHcJfYqXe/NT3x/huCd42pGHYWbo'+
			'T1cMnyd4Fo3HXrboPrHlIH1CHRI7ffJ+wXYX0B/JctP03W3JhOdQ9rpRVuhg2HTJ0opF+CyQXfD/0Ymg2ae/p1l9AU/FjNmG'+
			'cOe198GOPoHAQXpW6KXLPqzDtW9omndlJ8gA3bsccI0YtYKTKP3M0JXLEdQFdBAeS4i3cXbqYnvZ8jUoo+4EMQWlxbmJD8XF'+
			'b+/dSn09J6ZWQdMTO+0fzum+DfeNq+jHaa6cb8BvVQ6oFLeA5F8EYVM8R0maMKC/qsqrLfMdGd0cQZ4KHFMQ6cPlFNOr3S9t'+
			'Au7mUzMVSXzGIJLmitZgb56VYC3QjcGW16RjrtmC+xTN9ZSoo4dJEWJM7Se15DGd39nRimcp5OqEo0/lroAleP68XJgkKnml'+
			'nUjElZwl3uJcMWYPdS5MPH7v5OqQfewKAtPJfrbnqrN7K3FyJW52PU9qXmW40Ri6xqcecY6I4JQiQydW7h0ZXbelmDpTHq3c'+
			'rx0MObnpRN17xQq4Bynu9RebbjmqDpYIEhKgP5MDL1hqUUCu9AkI+iJu9OG5BoooOXzir/UljxxKmFTzD+Ea2izisB0CBddq'+
			'M1euCcrnA+lTQNZF+0Rh6e2OJJyCLonyk7yeYrSYY2N0o8StTXxDZaeFF14jgY5LO0DthRPRzSnpEgmqFXmNEvD/EeZOIxGm'+
			'+QydBI+FveuD/BJojwSklKjOuo6zHnOuafFABfX7QAz5Lgps/LybSmk42o/XZ1xXDZh+m2G/2MplcJHs1vqqqiF6P0IZXiNO'+
			'oSpBnFuBGdRHViDg8cmZlhD2PvKRCvYQN958q4Kjzj/obfitHI4YE25wKQKGxC9LtbFaljZWsPp8oTPLnOcnCuUAHbuqm1SR'+
			'7zRQPeep1t5ob8DaH7J8Nlj0G6zC0GKpJHLBTWHTwQ4JF7+rcPQac2zMfdaZtuPnLh5aPa7p2nGFF0RWefiiLSeszhSZi58Q'+
			'+cBKBtkFOptT9OpI2oBy4Ku04kJD0dlGVvES3+NqbxOPYQRsDiboTdJ7R9W1XavlP5oz7AB9clt80UcacmDmaMiNPVWWPHYQ'+
			'q8kR7FvDjln4dsMtH/OdcMl93hTux7Yd4yuIL5WjQxDgs7S/r4YL8eubBEzeNrkR5KrATIhBl3sdy9Pb9ffFIMjnLe+SvHB5'+
			'2w0ScgxHlNDFfZrGGRZyqCP/pMvaTQhYuAh3we5V8WWqoTmLd7gknY4o+XE/qdja8Rq6E/N4dhF1liylCLuP8d4zjxvq3gjy'+
			'jst2OxnKy54f74lKvfLGabcYryWxpV1+GJxKx7GWLjrIGSKsRtN317yvnOgPwRKeLzyAmpI0t3kL72Th1h9lDvgX0d2SHKjX'+
			'ot25p2udW9Kks/hdLSxBISY1LYnod5xcEQvjjkdcYEBn2PiMiJE0GqzLmCrcj2u3/pxQm3W5adFjyX5gOzgytuws/RIk0tme'+
			'fcsZ2e+M59nYXy3AOyTc9sdYWy3wzFhLgX+vYsv5eFuOLmfZyBQoNL1LqjxWkBm8guIqrjJSRKYXTE4H4s6/wk8kIftCFaIo'+
			'v5tz9rQdXGqz1gKrvaSxvqMTH3si89DtPL8J1WfKlDCk5loU2O2ciKrMj4f7YK8eFhcJDh9yW0MSyfoDOPhbTPv0R05JCdxd'+
			'WbbjAL2KLJKf49CyF7ya0M2rLN8TFsUu5ldHJWrAr1Hi9xPL3SWej8ZPvgbiWEYcvaTtRDWjmeFvx0++wy7HX2sIpfDrj7A/'+
			'RF9pSWyvPQvDG6B3vnyF8g+0bqARajnt7v99fU9FPyiBuo6tfaJhul+Hi8ZDx/TDDAa60Anc14vUoTq2Qwu20kOY4UCXhBvu'+
			'Cg2arTaPNeVpEf4Buj8/UyMr9UYY/gV6aJSHShx7NzqF4R+hY2pt5l8LKlJcNJyP853wBuOfAAMAI//lU84eukYAAAAASUVO'+
			'RK5CYII=',
	
		lab_theme = ''+
			'* {margin: 0; padding: 0;}'+
			'#onoff {cursor: pointer}'+
			'#onoff.current {background-color: #6D86B7;}'+
			'#eBox {background-color: #fff; border: 1px solid #1d4088; min-height: 350px; height: 400px; max-height: 600px; position: absolute; left: 0; top: 0; min-width: 350px; width: 400px; max-width: 800px; visibility: hidden; z-index: 99;}'+
			'#eBox > * {background-color: #fff; border: 1px solid #1d4088; display: block; font-size: 14px; position: relative}'+
			'#eBox > .query {height: 6%; float: left; line-height: 1em; margin: 1%; padding: 0 .5%; width: 89%; z-index: 4}'+
			'#eBox > .content {background: #fff url('+ lab_logo +') 50% 50% no-repeat; height: 90%; margin: 1% auto 0; width: 98%; z-index: 2;}'+
			'#eBox > .button {background-color: #627aad; height: 6%; width: 6%;}'+
			'#eBox > .button.move {cursor: move; float: left; margin: 1% 0; z-index: 4}'+
			'#eBox > .button.resize {border: 0; bottom: 0; position: absolute; right: 0; z-index: 1;}'+
			'#eBox > .button.resize:hover,'+
			'#eBox > .button.resize.current {cursor: se-resize; z-index: 4}',
		
		lab_template = ''+
			'<a id="onoff" class="topNavLink">eBox</a>'+
			'<div id="eBox">'+
				'<input class="query" type="text" />'+
				'<span class="button move"></span>'+
				'<iframe class="content"></iframe>'+
				'<span class="button resize"></span>'+
			'</div>'; 
	
	return eBox.client({
		theme: lab_theme,
		template: lab_template,
		ux: {
			'#onoff': {
				click: eBox.onOFF },
			'#eBox .query': {
				keyup: function (e) {eBox.query(e, this.value)}},
			'#eBox .move': {                                                                
				dblclick: function (e) {eBox.query(e, eBox.dom('#eBox .query').self.value)},
				mousedown: eBox.move.drag,
				mouseup: eBox.move.stop },
			'#eBox .resize': {  
				mousedown: eBox.move.resize,
				mouseup: eBox.move.stop }
		},
		ver: '0.2'
	});   
}

load_eBox(client_eBox);