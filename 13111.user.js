// ==UserScript==
// @name           mjplus3
// @include        http://www.mahjongcraving.com/*
// @description    highlight mahjong candidate tiles 
// ==/UserScript==

// Quizzy=Hosomichi Version 3a (2007-10-20)
// - Highlight active tiles (2-3 times faster than v2)
// - Undo available
// - Press SHIFT and move the mouse over a tile to get same-tiles highlighted

var F,W,T,A;


if (typeof(unsafeWindow) != "undefined")
{
	F = unsafeWindow.frames.gameboard;
	W = unsafeWindow;
}
else
{
	F = window.frames.gameboard;
	W = window;
}

A = W.document.getElementsByTagName('a')[0];


var IDT,IDI;
var highlighted;
var undo;
var shift = false;
var lasttile = null;

function hosomichi()
{
	var i;

	highlighted = new Array();
	undo = new Array();
	IDT = new Array();
	IDI = new Array();

	for (i=0 ; i<=532 ; i++)
	{
		IDT[i] = F.document.getElementById('tile'+i);
		IDI[i] = F.document.getElementById('tileimg'+i);
	}


	tile_zero  = function (id)  { return (F.tileset.charAt(id*2-2) == '0'); }
	tile_zero0 = function (id)  { return (F.tileset.charAt(id*2) == '0'); }

	tile_data = function (id)  { return (F.tileset.charAt(id*2-2) + F.tileset.charAt(id*2-1)); }

	tile_value = function (id) { return (F.tileset.charAt(id*2-2)); }

	tile_suit = function (id)  { return (F.tileset.charAt(id*2-1)); }

	activetile = function (i)
		 {
			  var ok;

			  i--;

			  if (i == 45+1 || i == 60+1) ok = (tile_zero0(i+1) || tile_zero0(45));
			  else if (i == 45+12 || i == 60+12) ok = (tile_zero0(i-1) || tile_zero0(60+13));
			  else if (i == 60+13) ok = (tile_zero0(i+1) || tile_zero0(45+12) && tile_zero0(60+12));
			  else if (i == 3*120+45+6 || i == 3*120+45+7 || i == 3*120+60+6 || i == 3*120+60+7) ok = tile_zero0(4*120+45+6);
			  else
			  {
				  ok = (i >= 4*120 || (tile_zero0(i-1) || tile_zero0(i+1)) && tile_zero0(i+120));
			  }
			  return (ok);
		 }


	highlightile = function (id, is_noatile) 
		 {
			  if(id>0) if (IDI[id])
						  {
								IDI[id].style.backgroundImage = "url('images/tileset_highlight.gif')";
								if ( ! is_noatile) F.atile = id;
						  }
		 }


	unhighlightile = function (id, is_noatile) 
		 {
			  if(id>0) if (IDI[id])
						  {
								IDI[id].style.backgroundImage = "url('images/tileset1.gif')";
								if ( ! is_noatile) F.atile = 0;
						  }
		 }

	F.hint = function () {}

	high_active  = function (undo, selected)
		 {
			  if (undo)
			  {
					var x;
					while ((x = highlighted.pop())) unhighlightile (x, 1);
					return;
			  }

			  var kinds = new Object();
			  var o,i,k;

			  if (selected)
			  {
				  selected = tile_data(selected) - 0;
				  if ((selected % 10) == 6) selected = 99;
			  }

			  for(i=1 ; i<=532 ; i++) if ((k = tile_data(i) - 0))
			  {
					if ((k % 10) == 6) k = 99;
					if (!selected || selected == k)
						if ((o = IDT[i]))
							if (o.visibility != 'hidden')
								if (activetile(i))
								{
									if ( ! kinds[k]) kinds[k] = new Array();
									kinds[k].push(i);
								}
			  }

			  for (o in kinds) 
				  if ((k = kinds[o].length) >= 2)
					  for (i=0 ; i<k ; i++)
					  {
							highlightile(kinds[o][i], 1); 
							highlighted.push(kinds[o][i]);
					  }
		 }


	
	hidetile = function (id)
		 {
			  IDT[id].style.visibility = 'hidden';
			  undo.push(id + ":" + tile_data(id));
			  F.tileset = F.tileset.substr(0,id*2-2)+"00"+F.tileset.substr(id*2);
		 }


	unhidetile = function (id, what)
		 {
			  F.tileset = F.tileset.substr(0,id*2-2)+what+F.tileset.substr(id*2);
			  IDT[id].style.visibility = 'visible';
		 }

	undo_html = function()
	{
		 return ('<br />' + (undo.length>1 ? '<a href="javascript:undo_one();"><span style="border:1px solid #22f;color:#22f;background-color:ee2;font-weight:bold;padding:0 2px 0 2px">undo</span></a>'
					 :'<i>undo</i>'));
	}

	W.undo_one = function ()
		 {
			  if (undo.length > 1)
			  {
					high_active (1);
					var a = undo.pop().split(":");
					var b = undo.pop().split(":");
					unhidetile(a[0], a[1]);
					unhidetile(b[0], b[1]);
					high_active (0);
					if (undo.length < 2)
						document.getElementById('movecount').innerHTML = "Clicks: "+F.moves+undo_html();
			  }
		 }


	F.tileclick = function (id) 
		 {
			  high_active ( 1 );

			  F.document.getElementById('message').style.visibility = 'hidden';

			  F.startgame();

			  F.iid = 0;
			  F.moves++;

			  if (F.atile == id) unhighlightile(id);
			  else if(activetile(id)) 
			  {
				  if(F.atile) 
				  {
					  if(F.pair(id,F.atile)) 
					  {
						  hidetile(id);
						  hidetile(F.atile);
						  unhighlightile(id);

						  F.checkgame();
					  }
					  else unhighlightile(F.atile);
				  }
				  else highlightile(id);
			  }
			  else unhighlightile(F.atile);

			  document.getElementById('movecount').innerHTML = "Clicks: "+F.moves+undo_html();

			  high_active (0, F.atile);

			  A.focus();
		 }


	F.restart = function () 
		 {
			  high_active (1);

			  undo = new Array();

			  F.bnomoves = F.started = F.finished = F.moves = F.checked = 0;
			  F.hid1 = F.hid2 = F.iid = F.min = F.sec = F.g =	F.t = 0;
			  F.timerId = F.kg = F.ks = F.counter = F.csec = 0;
			  F.kd = "";

			  var i;

			  document.getElementById('movecount').innerHTML = "Clicks: 0"+undo_html();
			  document.getElementById('playtime').innerHTML = "Time: 0:00";

			  for(i=1;i<=15*8*6;i++)
				  if (IDT[i])
				  {
					  IDT[i].style.visibility = 'visible';
					  unhighlightile(i);
				  }

			  F.tileset = F.ntileset;
			  F.atile = 0;

			  high_active (0);
		 }

	var td = document.getElementById('movecount');
	td.innerHTML += undo_html();



	var kinds = new Object();

	var o,ii;

	for (ii=1 ; ii<=532 ; ii++) 
		if ((o = IDT[ii]))
		{
			var k = tile_data(ii);
			if ((k % 10) == 6) k = 99;

			if ( ! kinds[k]) kinds[k] = new Array();
			kinds[k].push(ii);

			highlighted[ii] = 0;

			o.onmouseover = function(e) 
				 {
					  if (shift && !F.atile)
					  {
							var id  = this.id.substr(4);
							var i,k = tile_data(id);
							if ((k % 10) == 6) k = 99;

							for (i=0 ; i<kinds[k].length ; i++) 
								if (IDT[kinds[k][i]].style.visibility != 'hidden')
								{
									highlightile(kinds[k][i],1); 
									highlighted.push(kinds[k][i]);
								}
					  }
					  lasttile = this;
				 }
			o.onmouseout  = function(e)
				 { 
					  lasttile = null;
					  if (shift && !F.atile)
					  {
							var x;
							while ((x = highlighted.pop())) unhighlightile(x,1);
					  }
				 }
		}


	key_pressed = function (e)
	{
		e = e || window.event;  
		if (e.keyCode != 16 || F.atile) return (true);
		high_active(1);
		shift = true;
		if (lasttile) lasttile.onmouseover();
		return (true);
	} 

	key_released = function (e)
	{
		e = e || window.event;  
		if (e.keyCode != 16 || F.atile) return (true);
		shift = false;
		high_active(1);
		high_active(0);
		return (true);
	} 

	W.document.onkeydown = key_pressed;
	W.document.onkeyup = key_released;
	A.focus();


	high_active(0);
}


if (F) F.addEventListener('load',
								  function() { hosomichi(); },
								  true);

