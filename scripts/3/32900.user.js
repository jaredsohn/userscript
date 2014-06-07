// ==UserScript==
// @name           Twelve Sands - Map
// @namespace     http://userscripts.org/scripts/show/32900
// @include        http://www.twelvesands.com/*
// @exclude        http://www.twelvesands.com/*chat*
// @exclude        http://www.twelvesands.com/artifact*
// @exclude        http://www.twelvesands.com/select*
// @version       2.1
// ==/UserScript==

var menumap = document.createElement("div");
menumap.innerHTML = '<div align="left" class="menumap">' +
'<div>' +
'	<a href="">Map</a>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=75">City Hall</a>' +
'	<div>' +
'		<a target="main_frame" href="talk.php?t=16" class="npc">(NPC) Councillor Simon Horvath.</a>' +
'	</div>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=56">Initiate`s Corridors</a>' +
'<br>' +
'	<div>' +
'		<a target="main_frame" href="main.php?z=58" class="store">(S) The Armour House.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=57" class="store">(S) The Weapon House.</a>' +
'	</div>' +
'</div>' +
'<div><a target="main_frame" href="main.php?z=50">The Capital Barracks</a>' +
'<br>' +
'	<div><a target="main_frame" href="talk.php?t=6" class="npc">(NPC) Major Eva Vorosbor.</a>' +
'<br>' +
'	<a target="main_frame" href="talk.php?t=9" class="npc">(NPC) Captain Tobias Rendsworth.</a>' +
'<br>' +
'	<a target="main_frame" href="talk.php?t=11" class="npc">(NPC) Councillor Harper.</a>' +
'<br>' +
'	<a target="main_frame" href="talk.php?t=69" class="store">(S) The Undeath Wards</a>' +
'	<font size="-2"> (lvl 5 req.)</font>' +
'<br>' +
'	<a target="main_frame" href="main.php?z=85" class="combat">(C) Training Fields.</a>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=29">The Market District</a>' +
'	<div>' +
'		<a target="main_frame" href="main.php?z=33" class="store">(S) Arcanery and Enchanted Goods.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=32" class="store">(S) Bidwell`s Eatery.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=66" class="store">(S) Capital City Rewards Hall.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=11" class="store">(S) House of Defense.</a>' +
'<br>' +
'	<a target="main_frame" href="main.php?z=2" class="store">(S) Thog`s Weapons.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=36" class="store">(S) Trade Goods and Services.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=3" class="store">(S) Turagon`s Trinkets.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=39" class="store">(S) The Capital Casino</a>' +
'		<font size="-2"> (lvl 4 req.)</font>' +
'<br>' +
'		<i class="inaccessable">Veteran`s Market</i>' +
'		<font size="-2"> (lvl 8 req.)</font>' +
'	</div>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=37">Tranquility Park</a>' +
'	<div>' +
'		<a target="main_frame" href="talk.php?t=5" class="npc">(NPC) Ragged Chester.</a>' +
'<br>' +
'	<a target="main_frame" href="main.php?z=38" class="fishing">(F) The Tranquil Pond.</a>' +
'	</div>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=94" class="store">(S) The Great Treasury.</a><br>' +
'	<a target="main_frame" href="main.php?z=45" class="store">(S) Badges and Awards.</a><br>' +
'	<a target="main_frame" href="main.php?z=7">Capital City Infirmary</a>' +
'	<div>' +
'		<a target="main_frame" href="talk.php?t=18" class="npc">(NPC) Doctor Gaspar.</a>' +
'<br>' +
'		<a target="main_frame" href="talk.php?t=19" class="npc">(NPC) Nurse Domotor.</a>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=7&amp;a=1">Pay for healing (2 gold per health).</a>' +
'	</div>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=13">Hall of Records.</a><br>' +
'	<a target="main_frame" href="main.php?z=44" class="store">(S) The Auction House.</a>' +
'	<font size="-2"> (lvl 3 req.)</font>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=9">The Grand Academy</a>' +
'	<div>' +
'		<a target="main_frame" href="talk.php?t=2" class="npc">(NPC) Vitor Loreguarder.</a>' +
'	</div>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=4">The Peaceful Meadows</a>' +
'	<div>' +
'		<a target="main_frame" href="talk.php?t=1" class="npc">(NPC) Karo Lightforge.</a>' +
'	</div>' +
'	<div>' +
'		<a target="main_frame" href="main.php?z=22">Green River</a>' +
'		<font size="-2"> (lvl 3 req.)</font>' +
'<br>' +
'		<div>' +
'			<a target="main_frame" href="talk.php?t=25" class="npc">(NPC) Katalin, the Jewelcrafter.</a>' +
'<br>' +
'			<a target="main_frame" href="main.php?z=93" class="store">(S) Katalin`s Goods</a>' +
'			<font size="-2"> (lvl 3 req.)</font>' +
'<br>' +
'			<a target="main_frame" href="main.php?z=87">Álmok Crypts</a>' +
'			<font size="-2"> (lvl 6 req.)</font>' +
'			<div>' +
'				<a href="talk.php?t=21" class="npc">(NPC) Zsuzsa, the Collector</a>' +
'<br>' +
'				<a href="main.php?z=90" class="store">(S) Zsuzsa`s Cart</a>' +
'				<font size="-2"> (lvl 6 req.)</font>' +
'<br>' +
'				<a href="main.php?z=88" class="combat">Álmok Crypts Chapel</a>' +
'				<font size="-2"> (lvl 6 req.)</font>' +
'<br>' +
'				<i class="inaccessable">Álmok Crypts Burial Vaults</i>' +
'				<font size="-2"> (lvl 9 req.)</font>' +
'<br>' +
'				<i class="inaccessable">Álmok Crypts Stables</i>' +
'				<font size="-2"> (lvl 12 req.)</font>' +
'			</div>' +
'			<a target="main_frame" href="main.php?z=23">Green Pond</a>' +
'			<font size="-2"> (lvl 5 req.)</font>' +
'			<div>' +
'				<a href="main.php?z=34" class="combat">(C) Enchanted Nook</a>' +
'				<font size="-2"> (lvl 7 req.)</font>' +
'<br>' +
'				<i class="inaccessable">Base of the Green Waterfall</i>' +
'				<font size="-2">(level 8 required)</font>' +
'			</div>' +
'			<a target="main_frame" href="main.php?z=14">Omor`s Forest (Western Edge)</a>' +
'			<font size="-2"> (lvl 4 req.)</font>' +
'			<div>' +
'				<a target="main_frame" href="main.php?z=17" class="combat">(C) Deteriorated Forest Trail</a>' +
'				<font size="-2"> (lvl 4 req.)</font>' +
'<br>' +
'				<a target="main_frame" href="main.php?z=16" class="combat">(C) Abandoned Copper Fields</a>' +
'				<font size="-2"> (lvl 5 req.)</font>' +
'<br>' +
'				<a target="main_frame" href="main.php?z=15" class="combat">(C) Cavernous Bear Cave</a>' +
'				<font size="-2"> (lvl 5 req.)</font>' +
'<br>' +
'				<a target="main_frame" href="main.php?z=86" class="combat">(C) Abandoned Copper Depths</a>' +
'				<font size="-2"> (lvl 6 req.)</font>' +
'<br>' +
'				<a target="main_frame" href="main.php?z=61" class="mine">(M) Abandoned Mine Entrance</a>' +
'				<font size="-2"> (lvl 6 req.)</font>' +
'<br>' +
'				<i class="inaccessable">Omor`s Defense</i>' +
'				<font size="-2"> (lvl 8 req.)</font>' +
'			</div>' +
'		</div>' +
'		<div>' +
'			<a target="main_frame" href="main.php?z=43">The Undying Timepiece</a>' +
'			<font size="-2"> (lvl 4 req.)</font>' +
'<br>' +
'			<div><a target="main_frame" href="main.php?z=46" class="combat">(C) The Undying Timepiece (Morning)</a>' +
'			<font size="-2"> (lvl 4 req.)</font>' +
'<br>' +
'			<a target="main_frame" href="main.php?z=47" class="combat">(C) The Undying Timepiece (Mid-Day)</a>' +
'			<font size="-2"> (lvl 6 req.)</font>' +
'<br>' +
'			<i class="inaccessable">The Undying Timepiece (Evening)</i>' +
'			<font size="-2"> (lvl 8 req.)</font>' +
'<br>' +
'			<i class="inaccessable">The Undying Timepiece (Night)</i>' +
'			<font size="-2"> (lvl 10 req.)</font>' +
'<br>' +
'			<i class="inaccessable">The Undying Pools</i>' +
'			<font size="-2"> (lvl 8 req.)</font>' +
'		</div>' +
'	</div>' +
'	<div>' +
'		<a target="main_frame" href="main.php?z=41" class="combat">(C) The Green River Shorelines</a>' +
'		<font size="-2"> (lvl 5 req.)</font>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=30" class="combat">(C) The Misted Shores</a>' +
'		<font size="-2"> (lvl 3 req.)</font>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=59" class="fishing">(F) Shallow Emerald Ponds</a>' +
'		<font size="-2"> (lvl 5 req.)</font>' +
'<br>' +
'		<a target="main_frame" href="main.php?z=92" class="combat">(D) Emerald Caves</a>' +
'		<font size="-2"> (lvl 3 req.)</font>' +
'<br>' +
'		<i class="inaccessable">The Descending Coves</i>' +
'		<font size="-2"> (lvl 9 req.)</font>' +
'	</div>' +
'</div>' +
'<div>' +
'	<a target="main_frame" href="main.php?z=21">The Wild Meadows</a>' +
'	<font size="-2"> (lvl 3 req.)</font>' +
'<br>' +
'	<div>' +
'		<a target="main_frame" href="main.php?z=55" class="combat">(C) Savage Plains</a>' +
'		<font size="-2"> (lvl 3 req.)</font>' +
'		<div>' +
'			<a target="main_frame" href="main.php?z=8" class="combat">(C) Disorganized Kobold Camp</a>' +
'		</div>' +
'		<div>' +
'			<a target="main_frame" href="main.php?z=10" class="combat">(C) Abandoned Farmhouse</a>' +
'			<font size="-2"> (lvl 2 req.)</font>' +
'		</div>' +
'		<div>' +
'			<a target="main_frame" href="main.php?z=12" class="combat">(C) Fortified Iron Hand Rebel Camp</a>' +
'			<font size="-2"> (lvl 3 req.)</font>' +
'		</div>' +
'	</div>' +
'	<div>' +
'		<a target="main_frame" href="main.php?z=20">The Bustling Farmlands</a>' +
'		<font size="-2"> (lvl 2 req.)</font>' +
'<br>' +
'		<div>' +
'			<a target="main_frame" href="talk.php?t=17" class="npc">(NPC) Bartal, the Hunter.</a>' +
'		</div>' +
'		<div>' +
'			<a target="main_frame" href="main.php?z=25">Merchant`s Line</a>' +
'			<font size="-2"> (lvl 2 req.)</font>' +
'<br>' +
'			<div>' +
'				<a target="main_frame" href="main.php?z=26">The Vile Meadows</a>' +
'				<font size="-2"> (lvl 7 req.)</font>' +
'				<div>' +
'					<a href="main.php?z=64" class="combat">(C) The Vile Swamplands (Entrance)</a>' +
'					<font size="-2"> (lvl 7 req.)</font>' +
'<br>' +
'					<i class="inaccessable">The Vile Swamplands (Depths)</i>' +
'					<font size="-2">(level 8 required)</font>' +
'<br>' +
'					<i class="inaccessable">The Vile Swamplands (Heart)</i>' +
'					<font size="-2">(level 9 required)</font>' +
'<br>' +
'					<i class="inaccessable">The Vile Undermines</i>' +
'					<font size="-2">(level 9 required)</font>' +
'				</div>' +
'			</div>' +
'		</div>' +
'		<div>' +
'			<a target="main_frame" href="main.php?z=54" class="combat">(C) The Boar Fields</a>' +
'			<font size="-2"> (lvl 2 req.)</font>' +
'		</div>' +
'	</div>' +
'</div></div></div>';
document.body.insertBefore(menumap, document.body.firstChild);

