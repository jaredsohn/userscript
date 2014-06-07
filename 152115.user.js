// ==UserScript==
// @name       Soulless Bot Updates
// @namespace  http://pokemonsoulless.com
// @version    0.1
// @description  Auto battle and Auto find at the game pokemon soulless
// @match      http://*pokemonsoulless.org/map.php?map=1*
// @match      http://*pokemonsoulless.org/map.php?map=2*
// @match      http://*pokemonsoulless.org/map.php?map=3*
// @match      http://*pokemonsoulless.org/map.php?map=4*
// @match      http://*pokemonsoulless.org/read_pm.php?id=121*
// @match      http://*pokemonsoulless.org/profile.php?id=89*
// @copyright  2012+, ~TUT~
// ==/UserScript==
var container = document.createElement('div');
container.textContent = 'Hello Soulless members! This bot is being brought to you from T.U.T. (TheUltimateTrainer) I am doing this because one amazing programmer inspired me. His name, Well....I cant tell you his real name. But his Soulless name is Asdd. He is a really cool  dude and he inspired me alot. So I will be bringin you this. It may fail, lol, as this is my first project. But I will not take all the credit like some people, I will not say names, But like Asdd did most of the work. I am being taught ny Asdd and he is helping me with this so be sure to thank him! He is a great guy and a amazing friend. I and most of soulless to you Asdd, We <3 you!!!!! Anyways, Rules: Must ask permission to distrabute this to out of soulless people. Thats it! Have fun soulless! This will most likley become a news bar for you for the bot. If you prefer Imacros instead, PM me. I have a good script for that too! Have a fun time My fello Soulless Members!!! ~TUT~'
container.style.background = 'red';
document.body.insertBefore(container, document.body.firstChild);
