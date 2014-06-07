// ==UserScript==
// @name           1000forShinies
// @namespace      Test?
// @description    Pokemon Vortex.
// @include        http://*tpmrpg.net/*
// ==/UserScript==
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<script type="text/javascript" language="javascript" src="http://static.pokemonvortex.org/js/functions.js"></script>
<script type="text/javascript" language="javascript" src="http://static.pokemonvortex.org/js/menu.js"></script>
<script type="text/javascript" language="javascript" src="http://static.pokemonvortex.org/js/suggest.js"></script>
<link rel="stylesheet" type="text/css" href="http://static.pokemonvortex.org/css/blue/global.css" media="screen" /><link rel="stylesheet" type="text/css" href="http://static.pokemonvortex.org/css/blue/game.css" media="screen" /><!--[if lt IE 7]>
<script type="text/javascript" language="javascript" src="http://static.pokemonvortex.org/js/ie6-.js"></script>
<link rel="stylesheet" type="text/css" href="http://static.pokemonvortex.org/css/ie6-.css" media="screen" />
<![endif]-->
<!--[if gte IE 7]>
<script type="text/javascript" language="javascript" src="http://static.pokemonvortex.org/js/ie7+.js"></script>
<link rel="stylesheet" type="text/css" href="http://static.pokemonvortex.org/css/ie7+.css" media="screen" />
<![endif]-->
<noscript><link rel="stylesheet" type="text/css" href="http://static.pokemonvortex.org/css/noscript.css" media="all" /></noscript>
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-23359162-1']);
_gaq.push(['_setDomainName', '.pokemonvortex.org']);
_gaq.push(['_trackPageview']);
(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
<title>Vortex Battle Arena v1.8 - Buy Pokemon</title>
</head>
<body>
<div id="alert"></div><div id="menuBox"></div>
<div id="container">
<div id="header">
<div id="headerAd"><iframe src="adv.php" width="728" height="90" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe></div>
<div id="title"><h1><a href="index.php"><em>PokemonVortex.com</em></a></h1></div><ul id="nav"><li><a href="map_select.php" id="mapsTab" class="deselected"><em>Maps</em></a></li><li><a href="battle_select.php" id="battleTab" class="deselected"><em>Battle</em></a></li><li><a href="your_account.php" id="yourAccountTab" class="deselected"><em>Your Account</em></a></li><li><a href="community.php" id="communityTab" class="deselected"><em>Communtiy</em></a></li></ul><ul id="logout"><li><a href="logout.php">Logout</a></li></ul>
</div>
<div id="contentContainer">
<div id="sidebar">
<div id="sidebarContainer"><div id="sidebarLoading"></div><div id="sidebarContent"></div></div>
<ul id="sidebarTabs">
<li><a href="pokedex.php" id="pokedexTab" class="deselected"><em>Pok&eacute;Dex</em></a></li>
<li><a href="members.php" id="membersTab" class="deselected"><em>Members</em></a></li>
<li><a href="options.php" id="optionsTab" class="deselected"><em>Options</em></a></li>
</ul>
</div>
<div id="content">
<div id="notification" style="visibility: hidden;"></div><div id="loading"></div>
<div id="scroll"><div id="suggestResults"></div><div id="showDetails"></div><div id="errorBox"></div>
<div style="float: right;"><iframe id="skyscraperAd" src="adv.php?type=h" allowtransparency="true" scrolling="no" width="160" height="600" frameborder="0" marginwidth="0" marginheight="0"></iframe></div>
<div id="scrollContent">
<div id="ajax">
<h2>Purchase a Pokemon</h2>
</div>
</center>
<br>
<form method="POST" action="buy_pokemon_1.php" onsubmit="return disableSubmitButton(this)">
<center>
<strong>Money:</strong> <img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle"> 11,159,930<br />
<br>
<center><h3>Please choose a Pokemon to buy.</h3></center>
<a href="/buy_pokemon.php?type=normal">Normal Pok&eacute;mon</a><br />
<a href="#">Shiny Pok&eacute;mon</a><br />
<a href="/buy_pokemon.php?type=ancient">Ancient Pok&eacute;mon</a><br />
<a href="/buy_pokemon.php?type=mystic">Mystic Pok&eacute;mon</a><br />
<a href="/buy_pokemon.php?type=dark">Dark Pok&eacute;mon</a><br />
<table style="text-align: center; float: center;"><br/>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Bulbasaur.gif"><br/>Shiny Bulbasaur<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Bulbasaur" checked="checked"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Charmander.gif"><br/>Shiny Charmander<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Charmander"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Squirtle.gif"><br/>Shiny Squirtle<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Squirtle"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Chikorita.gif"><br/>Shiny Chikorita<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Chikorita"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Cyndaquil.gif"><br/>Shiny Cyndaquil<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Cyndaquil"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Totodile.gif"><br/>Shiny Totodile<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Totodile"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Treecko.gif"><br/>Shiny Treecko<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Treecko"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Torchic.gif"><br/>Shiny Torchic<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Torchic"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Mudkip.gif"><br/>Shiny Mudkip<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Mudkip"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Turtwig.gif"><br/>Shiny Turtwig<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Turtwig"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Chimchar.gif"><br/>Shiny Chimchar<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Chimchar"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Piplup.gif"><br/>Shiny Piplup<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Piplup"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Snivy.gif"><br/>Shiny Snivy<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Snivy"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Tepig.gif"><br/>Shiny Tepig<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Tepig"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Oshawott.gif"><br/>Shiny Oshawott<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Oshawott"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Eevee.gif"><br/>Shiny Eevee<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Eevee"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Zekrom.gif"><br/>Shiny Zekrom<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000,000<br/><input type="radio" name="bpokemon" value="Shiny Zekrom"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Reshiram.gif"><br/>Shiny Reshiram<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000,000<br/><input type="radio" name="bpokemon" value="Shiny Reshiram"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Bug).gif"><br/>Shiny Arceus (Bug)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Bug)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Dark).gif"><br/>Shiny Arceus (Dark)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Dark)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Dragon).gif"><br/>Shiny Arceus (Dragon)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Dragon)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Electric).gif"><br/>Shiny Arceus (Electric)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Electric)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Fighting).gif"><br/>Shiny Arceus (Fighting)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Fighting)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Fire).gif"><br/>Shiny Arceus (Fire)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Fire)"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Flying).gif"><br/>Shiny Arceus (Flying)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Flying)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Ghost).gif"><br/>Shiny Arceus (Ghost)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Ghost)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Grass).gif"><br/>Shiny Arceus (Grass)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Grass)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Ground).gif"><br/>Shiny Arceus (Ground)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Ground)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Ice).gif"><br/>Shiny Arceus (Ice)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Ice)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Poison).gif"><br/>Shiny Arceus (Poison)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Poison)"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Psychic).gif"><br/>Shiny Arceus (Psychic)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Psychic)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Rock).gif"><br/>Shiny Arceus (Rock)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Rock)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Steel).gif"><br/>Shiny Arceus (Steel)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Steel)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Unknown).gif"><br/>Shiny Arceus (Unknown)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Unknown)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Arceus (Water).gif"><br/>Shiny Arceus (Water)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Arceus (Water)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Mewtwo (Armor).gif"><br/>Shiny Mewtwo (Armor)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Mewtwo (Armor)"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Deoxys (Attack).gif"><br/>Shiny Deoxys (Attack)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Deoxys (Attack)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Deoxys (Defense).gif"><br/>Shiny Deoxys (Defense)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Deoxys (Defense)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Deoxys (Speed).gif"><br/>Shiny Deoxys (Speed)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Deoxys (Speed)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Genesect (Aqua).gif"><br/>Shiny Genesect (Aqua)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Genesect (Aqua)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Genesect (Blaze).gif"><br/>Shiny Genesect (Blaze)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Genesect (Blaze)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Genesect (Ice).gif"><br/>Shiny Genesect (Ice)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Genesect (Ice)"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Genesect (Lightning).gif"><br/>Shiny Genesect (Lightning)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Genesect (Lightning)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Giratina (Origin).gif"><br/>Shiny Giratina (Origin)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Giratina (Origin)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Giratina (Sky).gif"><br/>Shiny Giratina (Sky)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Giratina (Sky)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Celebi (Eternal).gif"><br/>Shiny Celebi (Eternal)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Celebi (Eternal)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Meloetta (Aria).gif"><br/>Shiny Meloetta (Aria)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Meloetta (Aria)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Meloetta (Pirouette).gif"><br/>Shiny Meloetta (Pirouette)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Meloetta (Pirouette)"/></td>
</tr>
<tr>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Rotom (Cut).gif"><br/>Shiny Rotom (Cut)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Rotom (Cut)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Rotom (Frost).gif"><br/>Shiny Rotom (Frost)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Rotom (Frost)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Rotom (Heat).gif"><br/>Shiny Rotom (Heat)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Rotom (Heat)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Rotom (Spin).gif"><br/>Shiny Rotom (Spin)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Rotom (Spin)"/></td>
<td><img src="http://static.pokemonvortex.org/images/pokemon/Shiny Rotom (Wash).gif"><br/>Shiny Rotom (Wash)<br/><img src="http://static.pokemonvortex.org/images/misc/pmoney.gif" align="absmiddle">1,000<br/><input type="radio" name="bpokemon" value="Shiny Rotom (Wash)"/></td>
</tr>
</table><br/>
<input type="submit" value="Buy!"></form>
</center>
<div id="copy">&copy;2008-2012 <a href="http://www.pokemonvortex.org/">Vortex Battle Arena</a>. This site is not affiliated with Nintendo, The Pok&eacute;mon Company, Creatures, or GameFreak<br /><a href="contactus.php">Contact Us</a> | <a href="about.php">About Us / FAQ</a> | <a href="privacy.php">Privacy Policy &amp; Terms of Service</a> | <a href="legal.php">Legal Info</a> | <a href="credits.php">Credits</a></div></div></div>
</div>
</div>
</div>
</body>
<script type="text/javascript" language="javascript" src="http://static.pokemonvortex.org/js/gameInit.js"></script>
// ==/UserScript==