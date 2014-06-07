// ==UserScript==
// @name           Forum-Parser
// @namespace      Voor TW
// @include        http://nl*.tribalwars.nl/staemme.php?village=*&screen=report&mode=*&view=*
// @author         Crazy Monk
// ==/UserScript==

var i = document.getElementsByClassName('center')[0].innerHTML

var i = i.replace(/title="Speervechter" alt=""/g, 'title="Speervechter" alt=":speer:"');

var i = i.replace(/title="Zwaardvechter" alt=""/g, 'title="Zwaardvechter" alt=":zwaard:"');

var i = i.replace(/title="Bijlstrijder" alt=""/g, 'title="Bijlstrijder" alt=":bijl:"');

var i = i.replace(/title="Boogschutter" alt=""/g, 'title="Boogschutter" alt=":boog:"');

var i = i.replace(/title="Verkenner" alt=""/g, 'title="Verkenner" alt=":verkenner:"');

var i = i.replace(/title="Bijlstrijder" alt=""/g, 'title="Bijlstrijder" alt=":licht:"');

var i = i.replace(/title="Zware cavalerier" alt=""/g, 'title="Zware cavalerie" alt=":zwaar:"');

var i = i.replace(/title="Bereden boogschutter" alt=""/g, 'title="Bereden boogschutter" alt=":bboog:"');

var i = i.replace(/title="Ridder" alt=""/g, 'title="Ridder" alt=":ridder:"');

var i = i.replace(/title="Ram" alt=""/g, 'title="Ram" alt=":ram:"');

var i = i.replace(/title="Katapult" alt=""/g, 'title="Katapult" alt=":catapult:"');

var i = i.replace(/title="Edelman" alt=""/g, 'title="Edelman" alt=":edelman:"');

document.getElementsByClassName('center')[0].innerHTML = i

var i = document.getElementsByClassName('center')[3].innerHTML;

var i = i.replace(/title="Speervechter" alt=""/g, 'title="Speervechter" alt=":speer:"');

var i = i.replace(/title="Zwaardvechter" alt=""/g, 'title="Zwaardvechter" alt=":zwaard:"');

var i = i.replace(/title="Bijlstrijder" alt=""/g, 'title="Bijlstrijder" alt=":bijl:"');

var i = i.replace(/title="Boogschutter" alt=""/g, 'title="Boogschutter" alt=":boog:"');

var i = i.replace(/title="Verkenner" alt=""/g, 'title="Verkenner" alt=":verkenner:"');

var i = i.replace(/title="Bijlstrijder" alt=""/g, 'title="Bijlstrijder" alt=":licht:"');

var i = i.replace(/title="Zware cavalerier" alt=""/g, 'title="Zware cavalerie" alt=":zwaar:"');

var i = i.replace(/title="Bereden boogschutter" alt=""/g, 'title="Bereden boogschutter" alt=":bboog:"');

var i = i.replace(/title="Ridder" alt=""/g, 'title="Ridder" alt=":ridder:"');

var i = i.replace(/title="Ram" alt=""/g, 'title="Ram" alt=":ram:"');

var i = i.replace(/title="Katapult" alt=""/g, 'title="Katapult" alt=":catapult:"');

var i = i.replace(/title="Edelman" alt=""/g, 'title="Edelman" alt=":edelman:"');

document.getElementsByClassName('center')[3].innerHTML = i;