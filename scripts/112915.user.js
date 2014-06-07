// ==UserScript==
// @name           ALU: Operations Quick Commerce Menu
// @namespace      http://www.crewstopia.com
// @description    A Living Universe: Adds a buy/sell quickbar to the Ship Operations panel.
// @include        http://www.alivinguniverse.com/ShipOperation.asp*
// ==/UserScript==

//window.alert('alu_operations_quickbar');

//http://www.alivinguniverse.com/ProcessCreateAd.asp?ItemType=34&Quantity=MAX&Price=210&Error=Continue&Operation=Buy&BuySell=B&EntityID=19841&EntityName=Cygnus+W&CategoryFilter=8&InsertBefore=0


var elemInstructions = document.getElementsByTagName('h2')[0].parentNode;
elemInstructions.removeChild(elemInstructions.childNodes[2]);

var newScript = document.createElement('script');
newScript.innerHTML =
"function updateQuickCommerce() \n" +
"{ \n" +
//"   window.alert('updateQuickCommerce()'); \n" +
"   var operation = document.getElementById('quickCommerceOperation').value; \n" +
//"window.alert(operation); \n" +
"   var itemType = parseInt(document.getElementById('quickCommerceItemType').value); \n" +
"   var elemPrice = document.getElementById('quickCommercePrice'); \n" +
//"window.alert(elemPrice); \n" +
"   var price = 0; \n" +
"   switch (itemType) \n" +
"   { \n" +
"      case 2: // Fuel \n" +
"         price = (operation == 'Buy' ? 5 : 25); break; \n" +
"      case 34: // Cobalt \n" +
"         price = (operation == 'Buy' ? 210 : 230); break; \n" +
"      case 37: // Gold \n" +
"         price = (operation == 'Buy' ? 2400 : 2500); break; \n" +
"      case 7: // Iron \n" +
"         price = (operation == 'Buy' ? 150 : 180); break; \n" +
"      case 33: // Nickel \n" +
"         price = (operation == 'Buy' ? 245 : 265); break; \n" +
"      case 35: // Titanium \n" +
"         price = (operation == 'Buy' ? 1400 : 1475); break; \n" +
"      case 36: // Uranium \n" +
"         price = (operation == 'Buy' ? 2450 : 2550); break; \n" +
"      case 28: // CobaltOre \n" +
"         price = (operation == 'Buy' ? 40 : 50); break; \n" +
"      case 31: // GoldOre \n" +
"         price = (operation == 'Buy' ? 205 : 225); break; \n" +
"      case 6: // IronOre \n" +
"         price = (operation == 'Buy' ? 55 : 65); break; \n" +
"      case 27: // NickelOre \n" +
"         price = (operation == 'Buy' ? 60 : 70); break; \n" +
"      case 29: // TitaniumOre \n" +
"         price = (operation == 'Buy' ? 240 : 255); break; \n" +
"      case 30: // UraniumOre \n" +
"         price = (operation == 'Buy' ? 125 : 145); break; \n" +
"      case 73: // Advanced Combat Computer \n" +
"         price = (operation == 'Buy' ? 14000 : 0); break; \n" +
"      case 72: // Basic Combat Computer \n" +
"         price = (operation == 'Buy' ? 4500 : 0); break; \n" +
"      case 115: // Bend Coil \n" +
"         price = (operation == 'Buy' ? 27000 : 0); break; \n" +
"      case 20: // Bend-1 \n" +
"         price = (operation == 'Buy' ? 110000 : 115000); break; \n" +
"      case 45: // Bio Scanner \n" +
"         price = (operation == 'Buy' ? 6000 : 0); break; \n" +
"      case 65: // Cargo Robot \n" +
"         price = (operation == 'Buy' ? 200 : 0); break; \n" +
"      case 43: // Class One Bio Computer \n" +
"         price = (operation == 'Buy' ? 3000 : 0); break; \n" +
"      case 86: // Class Three Duo-Bio Brain \n" +
"         price = (operation == 'Buy' ? 7500 : 7800); break; \n" +
"      case 85: // Class Two Bio Computer \n" +
"         price = (operation == 'Buy' ? 5700 : 0); break; \n" +
"      case 84: // Construction Robot \n" +
"         price = (operation == 'Buy' ? 25000 : 0); break; \n" +
"      case 46: // Dark Matter Scanner \n" +
"         price = (operation == 'Buy' ? 44000 : 0); break; \n" +
"      case 68: // Double Turret \n" +
"         price = (operation == 'Buy' ? 140000 : 0); break; \n" +
"      case 108: // Field Generator \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 10: // Homing Missile \n" +
"         price = (operation == 'Buy' ? 2500 : 0); break; \n" +
"      case 38: // Homing Sensor \n" +
"         price = (operation == 'Buy' ? 350 : 0); break; \n" +
"      case 114: // Industrial Robot \n" +
"         price = (operation == 'Buy' ? 150000 : 155000); break; \n" +
"      case 82: // Ion Cannon \n" +
"         price = (operation == 'Buy' ? 60000 : 65000); break; \n" +
"      case 130: // Jammer \n" +
"         price = (operation == 'Buy' ? 22000 : 23000); break; \n" +
"      case 8: // Laser \n" +
"         price = (operation == 'Buy' ? 100000 : 0); break; \n" +
"      case 111: // Laser Tube \n" +
"         price = (operation == 'Buy' ? 27000 : 0); break; \n" +
"      case 11: // Long Range Sensors \n" +
"         price = (operation == 'Buy' ? 27000 : 0); break; \n" +
"      case 134: // Marketing Computer \n" +
"         price = (operation == 'Buy' ? 20000 : 0); break; \n" +
"      case 83: // Mass Plasma Driver \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 106: // Message Beacon \n" +
"         price = (operation == 'Buy' ? 13500 : 0); break; \n" +
"      case 70: // Mine Sensor \n" +
"         price = (operation == 'Buy' ? 4900 : 0); break; \n" +
"      case 44: // Mineral Scanner \n" +
"         price = (operation == 'Buy' ? 675 : 750); break; \n" +
"      case 18: // Mining Scoop \n" +
"         price = (operation == 'Buy' ? 3200 : 0); break; \n" +
"      case 9: // Missile Launcher \n" +
"         price = (operation == 'Buy' ? 20000 : 25000); break; \n" +
"      case 26: // Planetary Scanner \n" +
"         price = (operation == 'Buy' ? 0 : 11000); break; \n" +
"      case 39: // Probe \n" +
"         price = (operation == 'Buy' ? 15200 : 0); break; \n" +
"      case 104: // Probe Sensor Array \n" +
"         price = (operation == 'Buy' ? 6800 : 6900); break; \n" +
"      case 67: // Repair Robot \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 12: // Short Range Sensors \n" +
"         price = (operation == 'Buy' ? 14000 : 14500); break; \n" +
"      case 69: // Space Mine \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 94: // Spare Parts \n" +
"         price = (operation == 'Buy' ? 750 : 0); break; \n" +
"      case 40: // Torpedo Engine \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 41: // Torpedo Hull \n" +
"         price = (operation == 'Buy' ? 350 : 0); break; \n" +
"      case 32: // Tractor Beam \n" +
"         price = (operation == 'Buy' ? 12500 : 0); break; \n" +
"      case 19: // Turret \n" +
"         price = (operation == 'Buy' ? 90000 : 0); break; \n" +
"      case 42: // Uranium Warhead \n" +
"         price = (operation == 'Buy' ? 300 : 400); break; \n" +
"      case 96: // Base Construction Droid \n" +
"         price = (operation == 'Buy' ? 500000 : 0); break; \n" +
"      case 103: // Base Hull \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 5: // Bend-2 \n" +
"         price = (operation == 'Buy' ? 160000 : 0); break; \n" +
"      case 49: // Bend-3 \n" +
"         price = (operation == 'Buy' ? 375000 : 0); break; \n" +
"      case 50: // Bend-4 \n" +
"         price = (operation == 'Buy' ? 550000 : 0); break; \n" +
"      case 51: // Bend-5 \n" +
"         price = (operation == 'Buy' ? 1000000 : 0); break; \n" +
"      case 52: // Bend-6 \n" +
"         price = (operation == 'Buy' ? 1500000 : 0); break; \n" +
"      case 53: // Bend-7 \n" +
"         price = (operation == 'Buy' ? 2100000 : 0); break; \n" +
"      case 54: // Bend-8 \n" +
"         price = (operation == 'Buy' ? 3200000 : 0); break; \n" +
"      case 55: // Bend-9 \n" +
"         price = (operation == 'Buy' ? 5000000 : 0); break; \n" +
"      case 56: // Bend-10 \n" +
"         price = (operation == 'Buy' ? 6500000 : 0); break; \n" +
"      case 23: // Bend Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 116: // Bend Factory Droid \n" +
"         price = (operation == 'Buy' ? 2450000 : 0); break; \n" +
"      case 133: // Blue Flag \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 107: // BuildPhase \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 92: // Computer Plant \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 112: // Computer Plant Droid \n" +
"         price = (operation == 'Buy' ? 975000 : 0); break; \n" +
"      case 88: // Construction Yard \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 118: // Construction Yard Droid \n" +
"         price = (operation == 'Buy' ? 3250000 : 0); break; \n" +
"      case 3: // Credit \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 22: // Engine Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 117: // Engine Factory Droid \n" +
"         price = (operation == 'Buy' ? 1800000 : 0); break; \n" +
"      case 21: // Equipment Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 110: // Equipment Factory Droid \n" +
"         price = (operation == 'Buy' ? 895000 : 0); break; \n" +
"      case 135: // foozlewazer \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 24: // Fuel Refinery \n" +
"         price = (operation == 'Buy' ? 285000 : 0); break; \n" +
"      case 132: // Green Flag \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 1: // Hull \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 90: // Ion Cannon Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 121: // Ion Cannon Factory Droid \n" +
"         price = (operation == 'Buy' ? 2750000 : 0); break; \n" +
"      case 80: // Laser Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 98: // Laser Factory Droid \n" +
"         price = (operation == 'Buy' ? 2500000 : 0); break; \n" +
"      case 125: // Launch Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 124: // Launch Factory Droid \n" +
"         price = (operation == 'Buy' ? 3250000 : 0); break; \n" +
"      case 13: // Missile Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 99: // Missile Factory Droid \n" +
"         price = (operation == 'Buy' ? 4750000 : 0); break; \n" +
"      case 25: // Ore Mine \n" +
"         price = (operation == 'Buy' ? 72000 : 0); break; \n" +
"      case 66: // Ore Smelter \n" +
"         price = (operation == 'Buy' ? 77500 : 0); break; \n" +
"      case 105: // Probe Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 113: // Probe Factory Droid \n" +
"         price = (operation == 'Buy' ? 1200000 : 0); break; \n" +
"      case 131: // Red Flag \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 87: // Robot Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 100: // Robot Factory Droid \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 93: // Sensor Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 101: // Sensor Factory Droid \n" +
"         price = (operation == 'Buy' ? 850000 : 0); break; \n" +
"      case 74: // Shipyard Class-1 \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 75: // Shipyard Class-2 \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 76: // Shipyard Class-3 \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 78: // Shipyard Class-4 \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 79: // Shipyard Class-5 \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 97: // Shipyard Droid \n" +
"         price = (operation == 'Buy' ? 850000 : 0); break; \n" +
"      case 126: // Shipyard-2 Droid \n" +
"         price = (operation == 'Buy' ? 1500000 : 0); break; \n" +
"      case 127: // Shipyard-3 Droid \n" +
"         price = (operation == 'Buy' ? 2800000 : 0); break; \n" +
"      case 128: // Shipyard-4 Droid \n" +
"         price = (operation == 'Buy' ? 3500000 : 0); break; \n" +
"      case 129: // Shipyard-5 Droid \n" +
"         price = (operation == 'Buy' ? 4750000 : 0); break; \n" +
"      case 109: // Spare Factory Droid \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 95: // Spares Factory \n" +
"         price = (operation == 'Buy' ? 685000 : 0); break; \n" +
"      case 4: // SubLight-1 \n" +
"         price = (operation == 'Buy' ? 95000 : 0); break; \n" +
"      case 57: // SubLight-2 \n" +
"         price = (operation == 'Buy' ? 160000 : 0); break; \n" +
"      case 58: // SubLight-3 \n" +
"         price = (operation == 'Buy' ? 245000 : 0); break; \n" +
"      case 59: // SubLight-4 \n" +
"         price = (operation == 'Buy' ? 505000 : 0); break; \n" +
"      case 60: // SubLight-5 \n" +
"         price = (operation == 'Buy' ? 960000 : 0); break; \n" +
"      case 61: // SubLight-6 \n" +
"         price = (operation == 'Buy' ? 1720000 : 0); break; \n" +
"      case 62: // SubLight-7 \n" +
"         price = (operation == 'Buy' ? 2700000 : 0); break; \n" +
"      case 63: // SubLight-8 \n" +
"         price = (operation == 'Buy' ? 4540000 : 0); break; \n" +
"      case 14: // Turret Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 122: // Turret Factory Droid \n" +
"         price = (operation == 'Buy' ? 1800000 : 0); break; \n" +
"      case 0: // Unknown \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 89: // Warhead Factory \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"      case 123: // Warhead Factory Droid \n" +
"         price = (operation == 'Buy' ? 2000000 : 0); break; \n" +
"      case 81: // WorkUnits \n" +
"         price = (operation == 'Buy' ? 0 : 0); break; \n" +
"   default: window.alert('Unrecognized item type ' + itemType); \n" +
"   } \n" +
"   elemPrice.value = price; \n" +
"} \n";
elemInstructions.appendChild(newScript);

var newDiv = document.createElement('div');
newDiv.setAttribute('id', 'quickCommerce');
elemInstructions.appendChild(newDiv);

var shipName = document.getElementsByTagName('font')[0].innerHTML.replace(' ', '+');
if (shipName == null) window.alert('ERROR: shipName not found');
//window.alert('shipName = ' + shipName);

var entityId;
for (var ii = 0; ii < document.getElementsByTagName('input').length; ii++)
{
   var input = document.getElementsByTagName('input')[ii];
   if (input.getAttribute('name') == 'EntityID')
   {
      entityId = input.value;
      break;
   }
}
if (entityId == null) window.alert('ERROR: entityID not found');
//window.alert('entityId = ' + entityId);

newDiv.innerHTML =
   "<h3 align='center'>Quick Buy/Sell</h3> " +
   "<form name='quickCommerce' action='ProcessCreateAd.asp' method='GET'> " +
   "   <select name='Operation' id='quickCommerceOperation' onChange='updateQuickCommerce()'> " +
   "      <option value='Buy'>Buy</option> " +
   "      <option value='Sell'>Sell</option> " +
   "   </select> " +
   "   <select name='Itemtype' id='quickCommerceItemType' onChange='updateQuickCommerce()'> " +
   "      <option value='2'>Fuel</option> " +
   "      <option value='34'>Cobalt</option> " +
   "      <option value='37'>Gold</option> " +
   "      <option value='7'>Iron</option> " +
   "      <option value='33'>Nickel</option> " +
   "      <option value='35'>Titanium</option> " +
   "      <option value='36'>Uranium</option> " +
   "      <option value='28'>CobaltOre</option> " +
   "      <option value='31'>GoldOre</option> " +
   "      <option value='6'>IronOre</option> " +
   "      <option value='27'>NickelOre</option> " +
   "      <option value='29'>TitaniumOre</option> " +
   "      <option value='30'>UraniumOre</option> " +
   "      <option value='73'>Advanced Combat Computer</option> " +
   "      <option value='72'>Basic Combat Computer</option> " +
   "      <option value='115'>Bend Coil</option> " +
   "      <option value='20'>Bend-1</option> " +
   "      <option value='45'>Bio Scanner</option> " +
   "      <option value='65'>Cargo Robot</option> " +
   "      <option value='43'>Class One Bio Computer</option> " +
   "      <option value='86'>Class Three Duo-Bio Brain</option> " +
   "      <option value='85'>Class Two Bio Computer</option> " +
   "      <option value='84'>Construction Robot</option> " +
   "      <option value='46'>Dark Matter Scanner</option> " +
   "      <option value='68'>Double Turret</option> " +
   "      <option value='108'>Field Generator</option> " +
   "      <option value='10'>Homing Missile</option> " +
   "      <option value='38'>Homing Sensor</option> " +
   "      <option value='114'>Industrial Robot</option> " +
   "      <option value='82'>Ion Cannon</option> " +
   "      <option value='130'>Jammer</option> " +
   "      <option value='8'>Laser</option> " +
   "      <option value='111'>Laser Tube</option> " +
   "      <option value='11'>Long Range Sensors</option> " +
   "      <option value='134'>Marketing Computer</option> " +
   "      <option value='83'>Mass Plasma Driver</option> " +
   "      <option value='106'>Message Beacon</option> " +
   "      <option value='70'>Mine Sensor</option> " +
   "      <option value='44'>Mineral Scanner</option> " +
   "      <option value='18'>Mining Scoop</option> " +
   "      <option value='9'>Missile Launcher</option> " +
   "      <option value='26'>Planetary Scanner</option> " +
   "      <option value='39'>Probe</option> " +
   "      <option value='104'>Probe Sensor Array</option> " +
   "      <option value='67'>Repair Robot</option> " +
   "      <option value='12'>Short Range Sensors</option> " +
   "      <option value='69'>Space Mine</option> " +
   "      <option value='94'>Spare Parts</option> " +
   "      <option value='40'>Torpedo Engine</option> " +
   "      <option value='41'>Torpedo Hull</option> " +
   "      <option value='32'>Tractor Beam</option> " +
   "      <option value='19'>Turret</option> " +
   "      <option value='42'>Uranium Warhead</option> " +
   "      <!-- " +
   "      <option value='96'>Base Construction Droid</option> " +
   "      <option value='103'>Base Hull</option> " +
   "      <option value='5'>Bend-2</option> " +
   "      <option value='49'>Bend-3</option> " +
   "      <option value='50'>Bend-4</option> " +
   "      <option value='51'>Bend-5</option> " +
   "      <option value='52'>Bend-6</option> " +
   "      <option value='53'>Bend-7</option> " +
   "      <option value='54'>Bend-8</option> " +
   "      <option value='55'>Bend-9</option> " +
   "      <option value='56'>Bend-10</option> " +
   "      <option value='23'>Bend Factory</option> " +
   "      <option value='116'>Bend Factory Droid</option> " +
   "      <option value='133'>Blue Flag</option> " +
   "      <option value='107'>BuildPhase</option> " +
   "      <option value='92'>Computer Plant</option> " +
   "      <option value='112'>Computer Plant Droid</option> " +
   "      <option value='88'>Construction Yard</option> " +
   "      <option value='118'>Construction Yard Droid</option> " +
   "      <option value='3'>Credit</option> " +
   "      <option value='22'>Engine Factory</option> " +
   "      <option value='117'>Engine Factory Droid</option> " +
   "      <option value='21'>Equipment Factory</option> " +
   "      <option value='110'>Equipment Factory Droid</option> " +
   "      <option value='135'>foozlewazer</option> " +
   "      <option value='24'>Fuel Refinery</option> " +
   "      <option value='132'>Green Flag</option> " +
   "      <option value='1'>Hull</option> " +
   "      <option value='90'>Ion Cannon Factory</option> " +
   "      <option value='121'>Ion Cannon Factory Droid</option> " +
   "      <option value='80'>Laser Factory</option> " +
   "      <option value='98'>Laser Factory Droid</option> " +
   "      <option value='125'>Launch Factory</option> " +
   "      <option value='124'>Launch Factory Droid</option> " +
   "      <option value='13'>Missile Factory</option> " +
   "      <option value='99'>Missile Factory Droid</option> " +
   "      <option value='25'>Ore Mine</option> " +
   "      <option value='66'>Ore Smelter</option> " +
   "      <option value='105'>Probe Factory</option> " +
   "      <option value='113'>Probe Factory Droid</option> " +
   "      <option value='131'>Red Flag</option> " +
   "      <option value='87'>Robot Factory</option> " +
   "      <option value='100'>Robot Factory Droid</option> " +
   "      <option value='93'>Sensor Factory</option> " +
   "      <option value='101'>Sensor Factory Droid</option> " +
   "      <option value='74'>Shipyard Class-1</option> " +
   "      <option value='75'>Shipyard Class-2</option> " +
   "      <option value='76'>Shipyard Class-3</option> " +
   "      <option value='78'>Shipyard Class-4</option> " +
   "      <option value='79'>Shipyard Class-5</option> " +
   "      <option value='97'>Shipyard Droid</option> " +
   "      <option value='126'>Shipyard-2 Droid</option> " +
   "      <option value='127'>Shipyard-3 Droid</option> " +
   "      <option value='128'>Shipyard-4 Droid</option> " +
   "      <option value='129'>Shipyard-5 Droid</option> " +
   "      <option value='109'>Spare Factory Droid</option> " +
   "      <option value='95'>Spares Factory</option> " +
   "      <option value='4'>SubLight-1</option> " +
   "      <option value='57'>SubLight-2</option> " +
   "      <option value='58'>SubLight-3</option> " +
   "      <option value='59'>SubLight-4</option> " +
   "      <option value='60'>SubLight-5</option> " +
   "      <option value='61'>SubLight-6</option> " +
   "      <option value='62'>SubLight-7</option> " +
   "      <option value='63'>SubLight-8</option> " +
   "      <option value='14'>Turret Factory</option> " +
   "      <option value='122'>Turret Factory Droid</option> " +
   "      <option value='0'>Unknown</option> " +
   "      <option value='89'>Warhead Factory</option> " +
   "      <option value='123'>Warhead Factory Droid</option> " +
   "      <option value='81'>WorkUnits</option> " +
   "      --> " +
   "   </select><br/> " +
   "   Qty: <input type='text' name='Quantity' id='quickCommerceQuantity' value='MAX' size='6'/> " +
   "   @ <input type='text' name='Price' id='quickCommercePrice' value='0' size='6'/><br/> " +
   "   On Error: <select name='Error'> " +
   "      <option value='Continue'>Continue</option> " +
   "      <option value='Wait'>Wait</option> " +
   "   </select> " +
   "   <input type='hidden' name='BuySell' value='B'/> " +
   "   <input type='hidden' name='EntityID' value='" + entityId + "'/> " +
   "   <input type='hidden' name='EntityName' value = '" + shipName + "'/> " +
   "   Insert Before: <input type='text' name='InsertBefore' value='0' size='6'/><br/> " +
   "   <input type='submit' value='Submit, worm!'/> " +
   "</form>";

//var quickCommerce = document.createElement('a');
//quickCommerce.href = '#';
//quickCommerce.innerHTML = '-#-';
//quickCommerce.setAttribute('onClick', 'javascript:updateQuickCommerceUrl()');
//newDiv.appendChild(quickCommerce);

//var newForm = document.createElement('form');
//newForm.setAttribute('name', 'quickCommerce');
//newForm.setAttribute('action', 'ProcessCreateAd.asp';
//newForm.setAttribute('method', 'GET');
//elemInstructions.appendChild(newForm);

//var inputBuySell = document.createElement('select');
//inputBuySell.setAttribute('name', 'Operation');
//newForm.appendChild(inputBuySell);

//var inputBuySell = document.createElement('input');
//inputBuySell.setAttribute('type', 'select');
//inputBuySell.setAttribute('value', 'Append');
//inputBuySell.setAttribute('onChange', 'document.getElementsByName("Action")[0].value = this.checked ? "Append" : ""');
//elmParent.appendChild(inputBuySell);

//window.alert('blah ' + elemInstructions.nodeValue);
