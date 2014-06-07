// ==UserScript==
// @name					Tank
// @namespace			http://www.thenewgroup.com/gmscripts
// @description		Destroy your least favorite website with this tank!
// @include				*
// @copyright			2010+, The New Group (http://theNewGroup.com)
// @author				Kory Paulsen
// @licence				GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version				0.2.4
// ==/UserScript==

// Jarett's update checker (http://userscripts.org/scripts/review/20145)
var SUC_script_num = 66802; // Basecamp Writeboard Sorting UserScripts script id
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

var Tank = function()
{
	var delay = 50;

	var tank = document.createElement('canvas');
	tank.degrees = 0;
	tank.speed = 8;
	tank.imgWidth = 80;
	tank.imgHeight = 80;
	tank.canvSize = Math.round(Math.sqrt(tank.imgWidth*tank.imgWidth+tank.imgHeight*tank.imgHeight)); //square canvas as wide as hypotenuse for complete rotation
	tank.height = tank.canvSize;
	tank.width = tank.canvSize;
	tank.x = Math.floor(window.innerWidth / 2);
	tank.y = Math.floor(window.innerHeight / 2);
	tank.left = tank.x-Math.floor(tank.canvSize/2);
	tank.top = tank.y-Math.floor(tank.canvSize/2);
	tank.setAttribute('style', 'position:absolute; top:'+tank.top+'px; left:'+tank.left+'px; width:'+tank.canvSize+'px; height:'+tank.canvSize+'px; z-index:998;');
	tank.className = 'GM_Tank_aTank';
	document.body.appendChild(tank);

	var tankCtx = tank.getContext('2d');
	tank.img = new Image();
	tank.img.src = 'data:image/png;base64,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';
	tank.img.addEventListener('load', drawTank, true);

	function drawTank()
	{
		tankCtx.drawImage(tank.img, (tank.canvSize-tank.imgWidth)/2, (tank.canvSize-tank.imgHeight)/2);
	}

	var turret = document.createElement('canvas');
	turret.degrees = 0;
	turret.speed = 8;
	turret.imgWidth = tank.imgWidth;
	turret.imgHeight = tank.imgHeight;
	turret.canvSize = Math.round(Math.sqrt(turret.imgWidth*turret.imgWidth+turret.imgHeight*turret.imgHeight)); //square canvas as wide as hypotenuse for complete rotation
	turret.height = turret.canvSize;
	turret.width = turret.canvSize;
	turret.x = tank.x;
	turret.y = tank.y;
	turret.left = turret.x-Math.floor(turret.canvSize/2);
	turret.top = turret.y-Math.floor(turret.canvSize/2);
	turret.setAttribute('style', 'position:absolute; top:'+turret.top+'px; left:'+turret.left+'px; width:'+turret.canvSize+'px; height:'+turret.canvSize+'px; z-index:999;');
	turret.className = 'GM_Tank_aTurret';
	document.body.appendChild(turret);

	var turretCtx = turret.getContext('2d');
	turret.img = new Image();
	turret.img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAa5JREFUeNrs3UGKglAYwPGnzS3CRYu8QB2hRSujSxR4I7tE5KpFR9ALKCgt2neB0XnfA2Fm8BXMLOZr+P9Bkp6Lxy9DjQcFxphJ3/fvRmHL5bKX16IoAo3zC4JgElg8oxVvUZZuv1ws9CJqBbSf7peJ2XmqBAyN4rIsc5vmVAO+QgACCCCAABKAAAIIIAEIIIAAEoAAAgggAQgggAASgAACCCABCCCAANJob1omcjgc3Ot+vx9dsDisF8yyzK0T3O12nIHfG/DiOO7SNDX3+91tsi/vPQL+q9SsUB3OsPV6bbbb7egxx+PRnM9nt69lxaqqM1DOss1m4x2Xsfl8rmpBvCpACxTa/JO1Y0mSTAD0NJ1Onx4TRRG3Mb+acBgC6Ot2uz095nq9AujrdDp1Nu+4jOV5zkXEV1VVoUV8BGzqulZ1EVHzJCJPGHKTLPd5TdN0q9UqnM1mbqxtW3O5XDoB/vw0AqAHUaDsNvpt0YSn6knkVePXGAABBBBAAhBAAAEkAAEEEEACEEAAASQAAQQQQAIQQAABJAABBBBAAhBAAP8hoPylAww/S+w+BBgAR3eGqc0+EFMAAAAASUVORK5CYII=';
	turret.img.addEventListener('load', drawTurret, true);

	function drawTurret()
	{
		turretCtx.drawImage(turret.img, (turret.canvSize-turret.imgWidth)/2, (turret.canvSize-turret.imgHeight)/2);
	}

	var mouseObj = turret;
	var keybdObj = tank;

	function rotate(canvas, deg){
		ctx = canvas.getContext('2d');
		rad = deg*Math.PI/180
		ctx.clearRect(0,0,canvas.canvSize,canvas.canvSize);
		ctx.save();
		ctx.translate(canvas.canvSize/2,canvas.canvSize/2);
		try{
		ctx.rotate(rad);
		}catch(e){}
		ctx.drawImage(canvas.img, -canvas.imgWidth/2, -canvas.imgHeight/2, canvas.imgWidth, canvas.imgHeight);
		ctx.restore();
	}

	function followMouse(e)
	{
		if (!myTank) {
			document.removeEventListener('mousemove', followMouse, true);
			return false;
		}
		mouseX = e.pageX;
		mouseY = e.pageY;
		offX = (mouseX-mouseObj.x);
		if (offX == 0) offX = 0.01;
		offY = -1*(mouseY-mouseObj.y);
		deg = 90 - (180/Math.PI) * Math.atan( offY/offX );
		if (offX < 0)
			deg += 180;
		mouseObj.degrees = deg;
		rotate( mouseObj, deg );
	}

	function move(forward)
	{
		maxX = document.body.clientWidth - 15;
		minX = tank.imgWidth/2;

		maxY = document.body.clientHeight - 15;
		minY = tank.imgHeight/2;

		deg = tank.degrees;

		mX = Math.round( tank.speed * Math.sin( deg*Math.PI/180 ) );
		if (!forward) mX *= -1;
		turret.x = tank.x += mX; if (tank.x > maxX) tank.x = maxX; else if (tank.x < minX) tank.x = minX;
		turret.left = tank.left = tank.x-Math.floor(tank.canvSize/2);
		turret.style.left = tank.style.left = tank.left + 'px';

		mY = Math.round( tank.speed * Math.cos( deg*Math.PI/180 ) );
		if (!forward) mY *= -1;
		turret.y = tank.y -= mY; if (tank.y > maxY) tank.y = maxY; else if (tank.y < minY) tank.y = minY;
		turret.top = tank.top = tank.y-Math.floor(tank.canvSize/2);
		turret.style.top = tank.style.top = tank.top + 'px';
	}

	function turn(mvLeft)
	{
		if ( mvLeft )
		{
			keybdObj.degrees -= keybdObj.speed; if ( keybdObj.degrees < 0 ) keybdObj.degrees += 360;
		}
		else
		{
			keybdObj.degrees += keybdObj.speed; if ( keybdObj.degrees > 360 ) keybdObj.degrees -= 360;
		}
		rotate( keybdObj, keybdObj.degrees );
	}

	function forward() { move(true); }
	function backward() { move(false); }

	function left() { turn(true); }
	function right() { turn(false); }

	function doKey(e)
	{
		if (!myTank) {
			document.removeEventListener('keydown', doKey, true);
			return false;
		}
		switch( e.which )
		{
			case 87: // 'w' up
				if(tank.go==undefined)
					tank.go = setInterval(forward, delay);
				break;
			case 83: // 's' down
				if(tank.go==undefined)
					tank.go = setInterval(backward, delay);
				break;
			case 65: // 'a' left
				if(turret.go==undefined)
					turret.go = setInterval(left, delay);
				break;
			case 68: // 'd' right
				if(turret.go==undefined)
					turret.go = setInterval(right, delay);
				break;
		}
	}

	function stop(e)
	{
		if (!myTank) {
			document.removeEventListener('keyup', stop, true);
			return false;
		}
		switch( e.which )
		{
			case 87: // 'w' up
				clearInterval(tank.go);
				tank.go=undefined;
				break;
			case 83: // 's' down
				clearInterval(tank.go);
				tank.go=undefined;
				break;
			case 65: // 'a' left
				clearInterval(turret.go);
				turret.go=undefined;
				break;
			case 68: // 'd' right
				clearInterval(turret.go);
				turret.go=undefined;
				break;
		}
	}

	var cannon = function(x, y, deg, dist)
	{
		var x = x;
		var y = y;
		var degrees = deg;
		var distance = dist;

		var speed = 16;
		this.imgWidth = 80;
		this.imgHeight = 80;
		var canvSize = Math.round(Math.sqrt(this.imgWidth*this.imgWidth+this.imgHeight*this.imgHeight)); //square canvas as wide as hypotenuse for complete rotation
		var left = x-Math.floor(this.canvSize/2);
		var top = y-Math.floor(this.canvSize/2);

		var minX = this.imgWidth/2;
		var minY = this.imgHeight/2;
		var maxX = document.body.clientWidth - 15;
		var maxY = document.body.clientHeight - 15;

		var canvas = document.createElement('canvas');
		canvas.height = canvSize;
		canvas.width = canvSize;
		canvas.setAttribute('style', 'position:absolute; top:'+top+'px; left:'+left+'px; width:'+canvSize+'px; height:'+canvSize+'px; z-index:997;');
		canvas.className = 'GM_Tank_aCannon';
		document.body.appendChild(canvas);

		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.fillStyle   = '#999';
		ctx.strokeStyle = '#666';
		ctx.arc(canvSize/2,canvSize/2,2,0,Math.PI*2,true);
		ctx.fill();
		ctx.stroke();

		var flying = setInterval( fly, delay );

		function fly()
		{
			var bExp = false;
			distance -= speed;
			if ( distance < 0 )
			{
				speed += distance;
			  explode();
			}

			var mX = Math.round( speed * Math.sin( degrees*Math.PI/180 ) );
			x += mX;
			left = x-Math.floor(canvSize/2);
			canvas.style.left = left + 'px';

			var mY = Math.round( speed * Math.cos( degrees*Math.PI/180 ) );
			y -= mY;
			top = y-Math.floor(canvSize/2);
			canvas.style.top = top + 'px';

			if (x > maxX || x < minX || y > maxY || y < minY) explode();
		}
		function explode()
		{
			clearInterval(flying);
			ctx.beginPath();
			ctx.fillStyle   = '#000';
			ctx.strokeStyle = '#111';
			ctx.moveTo(Math.floor(Math.random()*11),Math.floor(Math.random()*11));		// topLeft
			ctx.lineTo(canvSize*.33+Math.floor(Math.random()*11)-5,Math.floor(Math.random()*31));		// topMid
			ctx.lineTo(canvSize*.66+Math.floor(Math.random()*11)-5,Math.floor(Math.random()*31));		// topMid
			ctx.lineTo(canvSize-Math.floor(Math.random()*11),Math.floor(Math.random()*11));		// topRight
			ctx.lineTo(canvSize-Math.floor(Math.random()*31),canvSize*.33+Math.floor(Math.random()*11)-5);		// midRight
			ctx.lineTo(canvSize-Math.floor(Math.random()*31),canvSize*.66+Math.floor(Math.random()*11)-5);		// midRight
			ctx.lineTo(canvSize-Math.floor(Math.random()*11),canvSize-Math.floor(Math.random()*11));		// bottomRight
			ctx.lineTo(canvSize*.66+Math.floor(Math.random()*11)-5,canvSize-Math.floor(Math.random()*31));		// bottomMid
			ctx.lineTo(canvSize*.33+Math.floor(Math.random()*11)-5,canvSize-Math.floor(Math.random()*31));		// bottomMid
			ctx.lineTo(Math.floor(Math.random()*11),canvSize-Math.floor(Math.random()*11));		// bottomLeft
			ctx.lineTo(Math.floor(Math.random()*31),canvSize*.66+Math.floor(Math.random()*11)-5);		// midRight
			ctx.lineTo(Math.floor(Math.random()*31),canvSize*.33+Math.floor(Math.random()*11)-5);		// midRight
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}
	}

	function fire(e)
	{
		if (!myTank) {
			document.removeEventListener('click', fire, true);
			return false;
		}
		mouseX = e.pageX;
		mouseY = e.pageY;
		offX = (mouseX-turret.x);
		offY = -1*(mouseY-turret.y);
		distance = Math.round(Math.sqrt(offX*offX+offY*offY));
		var boom = new cannon( turret.x, turret.y, turret.degrees, distance );
	}

	document.addEventListener('mousemove', followMouse, true);
	document.addEventListener('keydown', doKey, true);
	document.addEventListener('keyup', stop, true);
	document.addEventListener('click', fire, true);
}

var TankMenu = function()
{
	var menuDiv = document.createElement('div');
	menuDiv.setAttribute('style', 'position:absolute; top:0px; right:0px; height:16px; z-index:1000; cursor:pointer; margin-top:2px;');
	var menuIcon = document.createElement('canvas');
	menuIcon.setAttribute('height', '16');
	menuIcon.setAttribute('width', '16');
	menuDiv.appendChild(menuIcon);
	document.body.appendChild(menuDiv);

	var menuIconCtx = menuIcon.getContext('2d');
	var menuIconImg = new Image();
	menuIconImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjRJREFUeNp0UzmrWkEUPl535bmveUU0WgiigihYioWPV1nnF6YQtJE0VqKNWigWWogYhWvEuGvE3cw35IKPmwxc7sxZvjnfd84o6O/K5XINrVYbuFwuPweDwXun0/n9+fX1K3wjUfwWCAQMkUikyGK+nM/nSbFYjMCnkADS6fTeZDIZWQB5PJ61Wq2+9/t9HXzBYPB4v9+F2WxmWS6XxHz7Uqn0Ap9KAjCbzSe73W5kQMSCLYIg0PF45L54PG643W4EW7fbpclkcpbyBGmzWq3I6/USAvHN53PCbbCLoghQYqWTzWaj/X5PMoDNZsP/SqWS1us1VSoVejwe/NxoNGg8HpNKpeLgAJYB6HQ6UigUdL1eeQKoWK1WMhqNlM1mqdfrcUqgodfr5QAOh4Mg4HQ6JafTyZORcDqdSKPRUCgUIiYi34OqDAC8UB4C/H4/5fN5zhdfoVDg4NAAtCS6H7oA3pLSoIIz6EgCwwYfxITAMgBoAMEOhwMtFgtKJpNUr9e5D3vQwe0AMhgMcgBogOVyuajdblMmk6FoNMqTcGutVqNEIsFpPGugetYAweAai8WoWq1SOBzmVbGJJLfbTWxSucj/1ADG7XZLrVaL95tNH6eCktkoY7y5Jv/VAL3FxKFduBVUkISFJAjM3gAHRadkAD6fTwNxwJGBrYfD4Z2eFqMnMCEto9GI2MtUl8vljwDsGf9gpX9iifNms/nGArfPAEyDl1Qq9Z0NmWe32/2S7H8EGACamSyS1N8W9gAAAABJRU5ErkJggg==';
	menuIconImg.addEventListener('load', drawMenuIcon, true);
	function drawMenuIcon() { menuIconCtx.drawImage(menuIconImg, 0, 0); }

	menuIcon.addEventListener('click', newTank, true);
}

var menu = new TankMenu();

var myTank;
function newTank() {
	if (!myTank)
		myTank = new Tank();
	else
	{
		// remove holes
		var rmCannons = document.evaluate("//*[@class='GM_Tank_aCannon']",
		  document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = rmCannons.snapshotLength - 1; i >= 0; i--)
		{
			var elm = rmCannons.snapshotItem(i);
			document.body.removeChild( elm );
		}
		var rmTank = document.evaluate("//*[@class='GM_Tank_aTank']",
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		document.body.removeChild( rmTank );
		var rmTurret = document.evaluate("//*[@class='GM_Tank_aTurret']",
			document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		document.body.removeChild( rmTurret );
		myTank = null;
	}
}
