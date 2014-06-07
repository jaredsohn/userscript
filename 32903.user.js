// ==UserScript==
// @name           Twelve Sands - Link to supply stores in recipe pages
// @namespace    http://userscripts.org/scripts/show/32903
// @include        http://www.twelvesands.com/recipe*
// @include       http://www.twelvesands.com/main.php?z=36*
// @include       http://www.twelvesands.com/main.php?z=38*
// @include       http://www.twelvesands.com/main.php?z=2*
// @include       http://www.twelvesands.com/main.php?z=32*
// @include       http://www.twelvesands.com/main.php?z=59*
// @version       2.0
// ==/UserScript==
var menu4cooking = document.createElement("div");
menu4cooking.innerHTML = '<font size="-2">' +
'<b>Stores:</b>' +
'(<a href="main.php?z=36" title="Trade Goods and Services - Bag of Flour, Baker`s Yeast  Packet, Explosive Powder, Hot Spices, Mild Spices, Restorative Papyrus Tonic, Sharpening Stone, Simple Cloth, Simple Fishing Rod, Small Bag of Salt, Small Glass Vial, Soup Stock Spices, Basic Mining Pick">Trade Goods and Services</a>) ' +
'(<a href="main.php?z=2" title="Thog`s Weapons - Brass Knuckles, Crude Battle Axe, Ornamental Dagger, Rusted Dagger, Worn Hand Axe, 	Rusted Throwing Knife, Apprentice`s Dagger, Curved Dagger">Thog`s Weapons</a>) ' +
'(<a href="main.php?z=32" title="Bidwell`s Eatery - Fresh Loaf of Bread, Fresh Slice of Bread, Pat of Butter">Bidwell`s Eatery</a>)' +
'<br>' +
'<b>Fishing:<b>' +
'(<a href="main.php?z=38" title="Fishing - Pale Mudsnapper, Yellow Slimescale">The Tranquil Pond</a>) ' +
'(<a href="main.php?z=59" title="Fishing - Green Hagfish, Green Lamprey, Pasty Smallfish, Glowscale Mackerel, Glowscale Albacore.">Shallow Emerald Ponds</a>) ' +
'<br>' +
'<b>Mining:<b>' +
'(<a href="main.php?z=61">Abandoned Mine Entrance</a> ' +
'<br>' +
'<b>Combat:<b>' +
'(<a href="main.php?z=30" title="Bats">The Misted Shores</a>)' +
'(<a href="main.php?z=17" title="Frosted Whitecap">Deteriorated Forest Trail</a>)' +
'</font><br clear="all"><br>';
document.body.insertBefore(menu4cooking, document.body.firstChild);