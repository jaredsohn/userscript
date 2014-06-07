// ==UserScript==
// @name        KongSS + Chatango
// @description Adds the Chatango chat to Sacred Seasons on Kongregate.
// @include     http://www.kongregate.com/games/jamieyg3/sacred-seasons-mmorpg*
// @author        BreakIt
// @version       1
// @date          30.05.2012
// ==/UserScript==

//So, this code could probably have been done a lot better. But whatever, it works. And yeah, I'm bad with JS.
//It just simply moves the game to the left, then adds the chatango app to the right of the game.

m = document.getElementById('maingame')
m.style.cssFloat="left";

f = document.getElementById('floating_game_holder')
c = document.createElement('div');
c.setAttribute('style', 'float: left; left; margin-top: 58px;');
f.appendChild(c);

o = document.createElement('object');
o.setAttribute('width','250');
o.setAttribute('height','580');
o.setAttribute('id','obj_1338377724582');
c.appendChild(o);

p1 = document.createElement('param');
p1.setAttribute('name','movie');
p1.setAttribute('value','http://sacredseasons1.chatango.com/group');
o.appendChild(p1);

p2 = document.createElement('param');
p2.setAttribute('name','wmode');
p2.setAttribute('value','transparent');
o.appendChild(p2);

p3 = document.createElement('param');
p3.setAttribute('name','AllowScriptAccess');
p3.setAttribute('VALUE','always');
o.appendChild(p3);

p4 = document.createElement('param');
p4.setAttribute('name','AllowNetworking');
p4.setAttribute('VALUE','all');
o.appendChild(p4);

p5 = document.createElement('param');
p5.setAttribute('name','AllowFullScreen');
p5.setAttribute('VALUE','true');
o.appendChild(p5);

p6 = document.createElement('param');
p6.setAttribute('name','flashvars');
p6.setAttribute('VALUE','cid=1338377724582&b=60&f=50&l=999999&q=999999&r=72&s=1&v=0&w=0');
o.appendChild(p6);

e = document.createElement('embed');
e.id = 'emb_1338377724582';
e.setAttribute('src','http://sacredseasons1.chatango.com/group');
e.setAttribute('width','250');
e.setAttribute('height','580');
e.setAttribute('wmode','transparent');
e.setAttribute('allowScriptAccess','always');
e.setAttribute('allowNetworking','all');
e.setAttribute('type','application/x-shockwave-flash');
e.setAttribute('allowFullScreen','true');
e.setAttribute('flashvars','cid=1338377724582&b=60&f=50&l=999999&q=999999&r=72&s=1&v=0&w=0');
o.appendChild(e);