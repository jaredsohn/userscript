// ==UserScript==
// @name       Maphack
// ==/UserScript==

window.setInterval("wMasterBallHack();", 1000);
window.setInterval("FarmBotMain();", 2000);
window.setInterval("CheckFoundPokemon();", 1000);

function wMasterBallHack()
{
if (MasterBallHack == true)
{
document.getElementById('item2').value = 'Master Ball';
document.getElementById('item2').style.backgroundColor = 'red';
}
}

function FarmBotMain()
{
if (BotFarming != true)
return;

if (AreaFarming == "Land")
AjaxMove(13,3, 1);

if (AreaFarming == "CaveWater")
AjaxMove(4, 22, 2);

if (AreaFarming == "GrassWater")
AjaxMove(16, 24, 4);
}

function CheckFoundPokemon()
{
if (BotFarming != true)
return;

var GetDiv = document.getElementById('pkmnappearomega');
var FoundPokemon = GetDiv.textContent || GetDiv.innerText;
var pText = FoundPokemon;

if (LookForSpecific == true)
{
if (pText.search(Specific) != -1)
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('Your specific search setting was found!');
}
}
}

if ((OnlyLegendaries != false) && (LookForShinyPokemon == true) && (pText.search('Shiny') != -1))
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('A Shiny Pokemon Was Found');
}
}

if ((OnlyLegendaries != false) && (LookForAncientPokemon == true) && (pText.search('Ancient') != -1))
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('An Ancient Pokemon Was Found');
}
}

if ((OnlyLegendaries != false) && (LookForMysticPokemon == true) && (pText.search('Mystic') != -1))
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('A Mystic Pokemon Was Found');
}
}

if ((OnlyLegendaries != false) && (LookForDarkPokemon == true) && (pText.search('Dark') != -1))
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('A Dark Pokemon Was Found');
}
}

if ((OnlyLegendaries == false) && (LookForShinyPokemon == true) && (pText.search('Shiny') != -1))
{
if (pText.search('Articuno') != -1 || pText.search('Zapdos') != -1 || pText.search('Moltres') != -1 || pText.search('Mew') != -1 || pText.search('Mewtwo') != -1 || pText.search('Ho-oh') != -1 || pText.search('Lugia') != -1 || pText.search('Latios') != -1 || pText.search('Latias') != -1 || pText.search('Jirachi') != -1 || pText.search('Rayquaza') != -1 || pText.search('Groudon') != -1 || pText.search('Kyogre') != -1 || pText.search('Deoxys') != -1 || pText.search('Regirock') != -1 || pText.search('Regice') != -1 || pText.search('Registeel') != -1 || pText.search('Regigigas') != -1 || pText.search('Phione') != -1 || pText.search('Manaphy') != -1 || pText.search('Celebi') != -1 || pText.search('Raikou') != -1 || pText.search('Suicune') != -1 || pText.search('Entei') != -1 || pText.search('Palkia') != -1 || pText.search('Dialga') != -1 || pText.search('Shaymin') != -1 || pText.search('Darkrai') != -1 || pText.search('Darkrown') != -1 || pText.search('Mesprit') != -1 || pText.search('Uxie') != -1 || pText.search('Azelf') != -1 || pText.search('Keldeo') != -1 || pText.search('Zekrom') != -1 || pText.search('Reshiram') != -1 || pText.search('Rotom') != -1 || pText.search('Victini') != -1 || pText.search('Cobalion') != -1 || pText.search('Cresselia') != -1 || pText.search('Heatran') != -1 || pText.search('Arceus') != -1 || pText.search('Terrakion') != -1 || pText.search('Virizion') != -1 || pText.search('Tornadus') != -1 || pText.search('Landorus') != -1 || pText.search('Thundurus') != -1 || pText.search('Meloetta') != -1 || pText.search('Genesect') != -1)
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('A Shiny Legendary Was Found');
}
}
}

if ((OnlyLegendaries == false) && (LookForAncientPokemon == true) && (pText.search('Ancient') != -1))
{
if (pText.search('Articuno') != -1 || pText.search('Zapdos') != -1 || pText.search('Moltres') != -1 || pText.search('Mew') != -1 || pText.search('Mewtwo') != -1 || pText.search('Ho-oh') != -1 || pText.search('Lugia') != -1 || pText.search('Latios') != -1 || pText.search('Latias') != -1 || pText.search('Jirachi') != -1 || pText.search('Rayquaza') != -1 || pText.search('Groudon') != -1 || pText.search('Kyogre') != -1 || pText.search('Deoxys') != -1 || pText.search('Regirock') != -1 || pText.search('Regice') != -1 || pText.search('Registeel') != -1 || pText.search('Regigigas') != -1 || pText.search('Phione') != -1 || pText.search('Manaphy') != -1 || pText.search('Celebi') != -1 || pText.search('Raikou') != -1 || pText.search('Suicune') != -1 || pText.search('Entei') != -1 || pText.search('Palkia') != -1 || pText.search('Dialga') != -1 || pText.search('Shaymin') != -1 || pText.search('Darkrai') != -1 || pText.search('Darkrown') != -1 || pText.search('Mesprit') != -1 || pText.search('Uxie') != -1 || pText.search('Azelf') != -1 || pText.search('Keldeo') != -1 || pText.search('Zekrom') != -1 || pText.search('Reshiram') != -1 || pText.search('Rotom') != -1 || pText.search('Victini') != -1 || pText.search('Cobalion') != -1 || pText.search('Cresselia') != -1 || pText.search('Heatran') != -1 || pText.search('Arceus') != -1 || pText.search('Terrakion') != -1 || pText.search('Virizion') != -1 || pText.search('Tornadus') != -1 || pText.search('Landorus') != -1 || pText.search('Thundurus') != -1 || pText.search('Meloetta') != -1 || pText.search('Genesect') != -1)
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('An Ancient Legendary Was Found');
}
}
}

if ((OnlyLegendaries == false) && (LookForMysticPokemon == true) && (pText.search('Mystic') != -1))
{
if (pText.search('Articuno') != -1 || pText.search('Zapdos') != -1 || pText.search('Moltres') != -1 || pText.search('Mew') != -1 || pText.search('Mewtwo') != -1 || pText.search('Ho-oh') != -1 || pText.search('Lugia') != -1 || pText.search('Latios') != -1 || pText.search('Latias') != -1 || pText.search('Jirachi') != -1 || pText.search('Rayquaza') != -1 || pText.search('Groudon') != -1 || pText.search('Kyogre') != -1 || pText.search('Deoxys') != -1 || pText.search('Regirock') != -1 || pText.search('Regice') != -1 || pText.search('Registeel') != -1 || pText.search('Regigigas') != -1 || pText.search('Phione') != -1 || pText.search('Manaphy') != -1 || pText.search('Celebi') != -1 || pText.search('Raikou') != -1 || pText.search('Suicune') != -1 || pText.search('Entei') != -1 || pText.search('Palkia') != -1 || pText.search('Dialga') != -1 || pText.search('Shaymin') != -1 || pText.search('Darkrai') != -1 || pText.search('Darkrown') != -1 || pText.search('Mesprit') != -1 || pText.search('Uxie') != -1 || pText.search('Azelf') != -1 || pText.search('Keldeo') != -1 || pText.search('Zekrom') != -1 || pText.search('Reshiram') != -1 || pText.search('Rotom') != -1 || pText.search('Victini') != -1 || pText.search('Cobalion') != -1 || pText.search('Cresselia') != -1 || pText.search('Heatran') != -1 || pText.search('Arceus') != -1 || pText.search('Terrakion') != -1 || pText.search('Virizion') != -1 || pText.search('Tornadus') != -1 || pText.search('Landorus') != -1 || pText.search('Thundurus') != -1 || pText.search('Meloetta') != -1 || pText.search('Genesect') != -1)
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('A Mystic Legendary Was Found');
}
}
}

if ((OnlyLegendaries == false) && (LookForDarkPokemon == true) && (pText.search('Dark') != -1))
{
if (pText.search('Articuno') != -1 || pText.search('Zapdos') != -1 || pText.search('Moltres') != -1 || pText.search('Mew') != -1 || pText.search('Mewtwo') != -1 || pText.search('Ho-oh') != -1 || pText.search('Lugia') != -1 || pText.search('Latios') != -1 || pText.search('Latias') != -1 || pText.search('Jirachi') != -1 || pText.search('Rayquaza') != -1 || pText.search('Groudon') != -1 || pText.search('Kyogre') != -1 || pText.search('Deoxys') != -1 || pText.search('Regirock') != -1 || pText.search('Regice') != -1 || pText.search('Registeel') != -1 || pText.search('Regigigas') != -1 || pText.search('Phione') != -1 || pText.search('Manaphy') != -1 || pText.search('Celebi') != -1 || pText.search('Raikou') != -1 || pText.search('Suicune') != -1 || pText.search('Entei') != -1 || pText.search('Palkia') != -1 || pText.search('Dialga') != -1 || pText.search('Shaymin') != -1 || pText.search('Darkrai') != -1 || pText.search('Darkrown') != -1 || pText.search('Mesprit') != -1 || pText.search('Uxie') != -1 || pText.search('Azelf') != -1 || pText.search('Keldeo') != -1 || pText.search('Zekrom') != -1 || pText.search('Reshiram') != -1 || pText.search('Rotom') != -1 || pText.search('Victini') != -1 || pText.search('Cobalion') != -1 || pText.search('Cresselia') != -1 || pText.search('Heatran') != -1 || pText.search('Arceus') != -1 || pText.search('Terrakion') != -1 || pText.search('Virizion') != -1 || pText.search('Tornadus') != -1 || pText.search('Landorus') != -1 || pText.search('Thundurus') != -1 || pText.search('Meloetta') != -1 || pText.search('Genesect') != -1)
{
BotFarming = true;
if (DoPopupWhenPokemonIsFound == true)
{
alert('A Dark Legendary Was Found');
}
}
}
}
// ==UserScript==