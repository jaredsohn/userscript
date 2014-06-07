// ==UserScript==
// @name                TCExpressCrimes
// @version             20080921.2
// @author              hexkid
// @description         Add Express Crimes
// @namespace           http://hexkid.info/GM/
// @include             http://torncity.com/*
// @include             http://www.torncity.com/*
// @include             http://torn.com/*
// @include             http://www.torn.com/*
// ==/UserScript==
// Updated by MathewS

var showNerve2  = readGMValue('cfg', 'showNerve2', '0');
var showNerve3  = readGMValue('cfg', 'showNerve3', '0');
var showNerve4  = readGMValue('cfg', 'showNerve4', '0');
var showNerve5  = readGMValue('cfg', 'showNerve5', '0');
var showNerve6  = readGMValue('cfg', 'showNerve6', '0');
var showNerve7  = readGMValue('cfg', 'showNerve7', '0');
var showNerve8  = readGMValue('cfg', 'showNerve8', '0');
var showNerve9  = readGMValue('cfg', 'showNerve9', '0');
var showNerve10 = readGMValue('cfg', 'showNerve10', '0');
var showNerve11 = readGMValue('cfg', 'showNerve11', '0');
var showNerve12 = readGMValue('cfg', 'showNerve12', '0');
var showNerve13 = readGMValue('cfg', 'showNerve13', '0');
var showNerve14 = readGMValue('cfg', 'showNerve14', '0');
var showNerve15 = readGMValue('cfg', 'showNerve15', '0');
var showNerve16 = readGMValue('cfg', 'showNerve16', '0');
var showNerve17 = readGMValue('cfg', 'showNerve17', '0');
var showNerve18 = readGMValue('cfg', 'showNerve18', '0');

// add express crime form
if (document.location.href.match(/\/(crimes\.php|validating4\.php\?linknum=\d)$/)) {
  FORMs = document.getElementsByTagName('form');
  if (FORMs && (FORMs.length) == 1 && (FORMs[0].getAttribute('action') == 'docrime.php')) {
    expressCrimes();
  }
}

/*************************************************************************************************/

function nerve2HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-2</span> Nerve -- Search for cash</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp21">Search the train station</label></td><td><input type="radio" name="crime" value="searchtrainstation" id="exp21"></td><td rowspan="6"><input type="submit" onclick="document.crimef.action=\'docrime2.php\'" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp22">Search under the old bridge</label></td><td><input type="radio" name="crime" value="searchbridge" id="exp22"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp23">Search the bins</label></td><td><input type="radio" name="crime" value="searchbins" id="exp23"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp24">Search the water fountain</label></td><td><input type="radio" name="crime" value="searchfountain" id="exp24"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp25">Search the dumpsters</label></td><td><input type="radio" name="crime" value="searchdumpster" id="exp25"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp26">Search movie theater</label></td><td><input type="radio" name="crime" value="searchmovie" id="exp26"></td></tr>\
';
}
function nerve3HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-3</span> Nerve -- Sell copied media</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp31">Rock CDs</label></td><td><input type="radio" name="crime" value="cdrock" id="exp31"></td><td rowspan="10"><input type="submit" onclick="document.crimef.action=\'docrime2.php\'" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp32">Heavy Metal CDs</label></td><td><input type="radio" name="crime" value="cdheavymetal" id="exp32"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp33">Pop CDs</label></td><td><input type="radio" name="crime" value="cdpop" id="exp33"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp34">Rap CDs</label></td><td><input type="radio" name="crime" value="cdrap" id="exp34"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp35">Reggae CDs</label></td><td><input type="radio" name="crime" value="cdreggae" id="exp35"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp36">Horror DVDs</label></td><td><input type="radio" name="crime" value="dvdhorror" id="exp36"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp37">Action DVDs</label></td><td><input type="radio" name="crime" value="dvdaction" id="exp37"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp38">Romance DVDs</label></td><td><input type="radio" name="crime" value="dvdromance" id="exp38"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp39">Sci Fi DVDs</label></td><td><input type="radio" name="crime" value="dvdsci" id="exp39"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp3a">Thriller DVDs</label></td><td><input type="radio" name="crime" value="dvdthriller" id="exp3a"></td></tr>\
';
}
function nerve4HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-4</span> Nerve -- Shoplift</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp41">Sweet shop : A few chocolate bars</label></td><td><input type="radio" name="crime" value="chocolatebars" id="exp41"></td><td rowspan="12"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp42">Sweet shop : A few bags of bonbons</label></td><td><input type="radio" name="crime" value="bonbons" id="exp42"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp43">Sweet shop : A box of extra strong mints</label></td><td><input type="radio" name="crime" value="extrastrongmints" id="exp43"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp44">Market stall : Music stall</label></td><td><input type="radio" name="crime" value="musicstall" id="exp44"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp45">Market stall : Electronics stall</label></td><td><input type="radio" name="crime" value="electronicsstall" id="exp45"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp46">Market stall : Computer stall</label></td><td><input type="radio" name="crime" value="computerstall" id="exp46"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp47">Clothes shop : Tank top</label></td><td><input type="radio" name="crime" value="tanktop" id="exp47"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp48">Clothes shop : Trainers</label></td><td><input type="radio" name="crime" value="trainers" id="exp48"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp49">Clothes shop : Jacket</label></td><td><input type="radio" name="crime" value="jacket" id="exp49"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp4a">Jewellery shop : Watch</label></td><td><input type="radio" name="crime" value="watch" id="exp4a"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp4b">Jewellery shop : Necklace</label></td><td><input type="radio" name="crime" value="necklace" id="exp4b"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp4c">Jewellery shop : Ring</label></td><td><input type="radio" name="crime" value="ring" id="exp4c"></td></tr>\
';
}
function nerve5HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-5</span> Nerve -- Pickpocket someone</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp51">Hobo</label></td><td><input type="radio" name="crime" value="hobo" id="exp51"></td><td rowspan="6"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp52">Kid</label></td><td><input type="radio" name="crime" value="kid" id="exp52"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp53">Old woman</label></td><td><input type="radio" name="crime" value="oldwoman" id="exp53"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp54">Businessman</label></td><td><input type="radio" name="crime" value="businessman" id="exp54"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp55">Lawyer</label></td><td><input type="radio" name="crime" value="lawyer" id="exp55"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp56">Mug the Loan Shark</label></td><td><input type="radio" name="crime" value="tim" id="exp56"></td></tr>\
';
}
function nerve6HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-6</span> Nerve -- Larceny</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp61">Apartment</label></td><td><input type="radio" name="crime" value="apartment" id="exp61"></td><td rowspan="5"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp62">Detached house</label></td><td><input type="radio" name="crime" value="house" id="exp62"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp63">Mansion</label></td><td><input type="radio" name="crime" value="mansion" id="exp63"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp64">Cars</label></td><td><input type="radio" name="crime" value="cartheft" id="exp64"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp65">Office</label></td><td><input type="radio" name="crime" value="office" id="exp65"></td></tr>\
';
}
function nerve7HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-7</span> Nerve -- Armed Robberies</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp71">Swift robbery</label></td><td><input type="radio" name="crime" value="swiftrobbery" id="exp71"></td><td rowspan="8"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp72">Thorough robbery</label></td><td><input type="radio" name="crime" value="thoroughrobbery" id="exp72"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp73">Swift Convenience</label></td><td><input type="radio" name="crime" value="swiftconvenient" id="exp73"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp74">Thorough Convenience</label></td><td><input type="radio" name="crime" value="thoroughconvenient" id="exp74"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp75">Swift Bank</label></td><td><input type="radio" name="crime" value="swiftbank" id="exp75"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp76">Thorough Bank</label></td><td><input type="radio" name="crime" value="thoroughbank" id="exp76"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp77">Swift Armored Car</label></td><td><input type="radio" name="crime" value="swiftcar" id="exp77"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp78">Thorough Armored Car</label></td><td><input type="radio" name="crime" value="thoroughcar" id="exp78"></td></tr>\
';
}
function nerve8HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-8</span> Nerve -- Transport drugs for a local dealer</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp81">Transport Cannabis</label></td><td><input type="radio" name="crime" value="cannabis" id="exp81"></td><td rowspan="6"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp82">Transport Amphetamines</label></td><td><input type="radio" name="crime" value="amphetamines" id="exp82"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp83">Transport Cocaine</label></td><td><input type="radio" name="crime" value="cocaine" id="exp83"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp84">Sell Pills</label></td><td><input type="radio" name="crime" value="drugspills" id="exp84"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp85">Sell Cannabis</label></td><td><input type="radio" name="crime" value="drugscanabis" id="exp85"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp86">Sell Cocaine</label></td><td><input type="radio" name="crime" value="drugscocaine" id="exp86"></td></tr>\
';
}
function nerve9HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-9</span> Nerve -- Plant a computer virus</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp91">Simple virus</label></td><td><input type="radio" name="crime" value="simplevirus" id="exp91"></td><td rowspan="5"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp92">Polymorphic virus</label></td><td><input type="radio" name="crime" value="polymorphicvirus" id="exp92"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp93">Tunneling Virus</label></td><td><input type="radio" name="crime" value="tunnelingvirus" id="exp93"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp94">Armored Virus</label></td><td><input type="radio" name="crime" value="armoredvirus" id="exp94"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp95">Stealth virus</label></td><td><input type="radio" name="crime" value="stealthvirus" id="exp95"></td></tr>\
';
}
function nerve10HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-10</span> Nerve -- Assassination</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp101">Assassinate a target</label></td><td><input type="radio" name="crime" value="assasination" id="exp101"></td><td rowspan="4"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp102">Drive by Shooting</label></td><td><input type="radio" name="crime" value="driveby" id="exp102"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp103">Car Bomb</label></td><td><input type="radio" name="crime" value="carbomb" id="exp103"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp104">Mob Boss</label></td><td><input type="radio" name="crime" value="murdermobboss" id="exp104"></td></tr>\
';
}
function nerve11HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-11</span> Nerve -- Arson</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp111">Home</label></td><td><input type="radio" name="crime" value="home" id="exp111"></td><td rowspan="7"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp112">Car Lot</label></td><td><input type="radio" name="crime" value="Carlot" id="exp112"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp113">Office Building</label></td><td><input type="radio" name="crime" value="OfficeBuilding" id="exp113"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp114">Apartment Building</label></td><td><input type="radio" name="crime" value="aptbuilding" id="exp114"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp115">Warehouse</label></td><td><input type="radio" name="crime" value="warehouse" id="exp115"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp116">Motel</label></td><td><input type="radio" name="crime" value="motel" id="exp116"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp117">Government Building</label></td><td><input type="radio" name="crime" value="govbuilding" id="exp117"></td></tr>\
';
}
function nerve12HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-12</span> Nerve -- Grand Theft Auto</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp121">Steal a parked car</label></td><td><input type="radio" name="crime" value="parkedcar" id="exp121"></td><td rowspan="3"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp122">Hijack a car</label></td><td><input type="radio" name="crime" value="movingcar" id="exp122"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp123">Steal car from showroom</label></td><td><input type="radio" name="crime" value="carshop" id="exp123"></td></tr>\
';
}
function nerve13HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-13</span> Nerve -- Pawn Shop</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp131">Side Door</label></td><td><input type="radio" name="crime" value="pawnshop" id="exp131"></td><td rowspan="2"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp132">Rear Door</label></td><td><input type="radio" name="crime" value="pawnshopcash" id="exp132"></td></tr>\
';
}
function nerve14HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-14</span> Nerve -- Counterfeiting</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp141">Money</label></td><td><input type="radio" name="crime" value="makemoney2" id="exp141"></td><td rowspan="3"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp142">Casino Tokens</label></td><td><input type="radio" name="crime" value="maketokens2" id="exp142"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp143">Credit Card</label></td><td><input type="radio" name="crime" value="makecard" id="exp143"></td></tr>\
';
}
function nerve15HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-15</span> Nerve -- Kidnapping</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp151">Kid</label></td><td><input type="radio" name="crime" value="napkid" id="exp151"></td><td rowspan="4"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp152">Women</label></td><td><input type="radio" name="crime" value="napwomen" id="exp152"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp153">Undercover Cop</label></td><td><input type="radio" name="crime" value="napcop" id="exp153"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp154">Mayor</label></td><td><input type="radio" name="crime" value="napmayor" id="exp154"></td></tr>\
';
}
function nerve16HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-16</span> Nerve -- Arms Trafficking</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp161">Explosives</label></td><td><input type="radio" name="crime" value="trafficbomb" id="exp161"></td><td rowspan="2"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp162">Firearms</label></td><td><input type="radio" name="crime" value="trafficarms" id="exp162"></td></tr>\
';
}
function nerve17HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-17</span> Nerve -- Bombings</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp171">Bomb a factory</label></td><td><input type="radio" name="crime" value="bombfactory" id="exp171"></td><td rowspan="2"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp172">Bomb a government building</label></td><td><input type="radio" name="crime" value="bombbuilding" id="exp172"></td></tr>\
';
}
function nerve18HTML(c) {
  return '\
<tr bgcolor="' + c + '"><td colspan="3" align="center" style="font-weight: bold"><span style="color: red">-18</span> Nerve -- Hacking</td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp181">Hack into a Bank Mainframe</label></td><td><input type="radio" name="crime" value="hackbank" id="exp181"></td><td rowspan="2"><input type="submit" name="docrime" value="Ok"></td></tr>\
<tr bgcolor="' + c + '"><td style="border: thin dotted black"><label for="exp182">Hack the F.B.I Mainframe</label></td><td><input type="radio" name="crime" value="hackfbi" id="exp182"></td></tr>\
';
}

function expressCrimes() {
  var fxchkb = function(x) {
    setGMValue('cfg', x.target.id, x.target.checked?'1':'0');
  };
  // get current nerve bar length

  if (document.body.innerHTML.match(/Nerve:\s+<font color="#000066">\s+\d+\/\d+\s+<\/font>/)) {
    var nerveArray = document.body.innerHTML.match(/Nerve:\s+<font color="#000066">\s+(\d+)\/(?:\d+)\s+<\/font>/);
    //alert(nerveArray);
    if (nerveArray && (nerveArray.length == 2)) {
      var currentNerve = 1 * nerveArray[1];
      // replace standard crimes form with the express crimes form
      var ColourCount = 0;
      var ColourArray = ['#dfdfdf', '#cccccc'];
      var newForm = document.createElement('form');
      newForm.setAttribute('name', 'crimef');
      newForm.setAttribute('method', 'post');
      newForm.setAttribute('action', 'docrime4.php');
      var newHTML = '[<a href="crimes.php?">Original crime page</a>]<br><br><table>';
      if ((currentNerve >= 2)  && (showNerve2  == '1')) newHTML += nerve2HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 3)  && (showNerve3  == '1')) newHTML += nerve3HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 4)  && (showNerve4  == '1')) newHTML += nerve4HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 5)  && (showNerve5  == '1')) newHTML += nerve5HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 6)  && (showNerve6  == '1')) newHTML += nerve6HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 7)  && (showNerve7  == '1')) newHTML += nerve7HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 8)  && (showNerve8  == '1')) newHTML += nerve8HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 9)  && (showNerve9  == '1')) newHTML += nerve9HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 10) && (showNerve10 == '1')) newHTML += nerve10HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 11) && (showNerve11 == '1')) newHTML += nerve11HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 12) && (showNerve12 == '1')) newHTML += nerve12HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 13) && (showNerve13 == '1')) newHTML += nerve13HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 14) && (showNerve14 == '1')) newHTML += nerve14HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 15) && (showNerve15 == '1')) newHTML += nerve15HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 16) && (showNerve16 == '1')) newHTML += nerve16HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 17) && (showNerve17 == '1')) newHTML += nerve17HTML(ColourArray[ColourCount++ % 2]);
      if ((currentNerve >= 18) && (showNerve18 == '1')) newHTML += nerve18HTML(ColourArray[ColourCount++ % 2]);
      newHTML += '</table>';
      newForm.innerHTML = newHTML;
      if (ColourCount > 0) {
        
        //FORMs[0].parentNode.appendChild(newForm);
        FORMs[0].style.display = 'none';
        FORMs[0].parentNode.insertBefore(newForm, FORMs[0]);

      } else {
        FORMs[0].parentNode.insertBefore(document.createTextNode('You do not have enough nerve for express crimes.'), FORMs[0]);
        FORMs[0].parentNode.insertBefore(document.createElement('br'), FORMs[0]);
        FORMs[0].parentNode.insertBefore(document.createElement('br'), FORMs[0]);
        //FORMs[0].parentNode.appendChild(document.createTextNode('You do not have enough nerve for express crimes.'));
        //FORMs[0].parentNode.appendChild(document.createElement('br'));
        //FORMs[0].parentNode.appendChild(document.createElement('br'));
        FORMs[0].style.display = 'none';
      }
      var nerveSelection = document.createElement('form');
      nerveSelection.appendChild(document.createTextNode('Select nerve for \'Express\' crimes:'));
      nerveTable = document.createElement('table');
      nerveTable.setAttribute('border', '1');
      nerveSelection.appendChild(nerveTable);
      nerveRow = document.createElement('tr');
      nerveTable.appendChild(nerveRow);
      for (var j=2; j<19; ++j) {
        var nerveCell = document.createElement('td');
	nerveRow.appendChild(nerveCell);
	var nerveLabel = document.createElement('label');
	nerveCell.appendChild(nerveLabel);
	var nerveInput = document.createElement('input');
	nerveInput.type = 'checkbox';
	nerveInput.id = 'showNerve' + j.toString();
	nerveLabel.appendChild(nerveInput);
	nerveLabel.appendChild(document.createTextNode(' ' + j.toString()));
      }
      //FORMs[0].parentNode.insertBefore(nerveSelection, FORMs[0]);
      FORMs[0].parentNode.appendChild(nerveSelection);

      // showNerve2
      elem = document.getElementById('showNerve2');
      if (showNerve2 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve3
      elem = document.getElementById('showNerve3');
      if (showNerve3 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve4
      elem = document.getElementById('showNerve4');
      if (showNerve4 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve5
      elem = document.getElementById('showNerve5');
      if (showNerve5 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve6
      elem = document.getElementById('showNerve6');
      if (showNerve6 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve7
      elem = document.getElementById('showNerve7');
      if (showNerve7 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve8
      elem = document.getElementById('showNerve8');
      if (showNerve8 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve9
      elem = document.getElementById('showNerve9');
      if (showNerve9 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve10
      elem = document.getElementById('showNerve10');
      if (showNerve10 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve11
      elem = document.getElementById('showNerve11');
      if (showNerve11 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve12
      elem = document.getElementById('showNerve12');
      if (showNerve12 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve13
      elem = document.getElementById('showNerve13');
      if (showNerve13 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve14
      elem = document.getElementById('showNerve14');
      if (showNerve14 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve15
      elem = document.getElementById('showNerve15');
      if (showNerve15 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve16
      elem = document.getElementById('showNerve16');
      if (showNerve16 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve17
      elem = document.getElementById('showNerve17');
      if (showNerve17 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
      // showNerve18
      elem = document.getElementById('showNerve18');
      if (showNerve18 == '1') elem.setAttribute('checked', 'checked');
      elem.addEventListener('click', fxchkb, true);
    }
  }
}

function readGMValue(suffix, name, defaultValue) {
  var realname = suffix;
  if (realname != '') realname += '-';
  realname += name;
  var cfgVariable = GM_getValue(realname);
  if (cfgVariable == null) {
    cfgVariable = defaultValue;
    GM_setValue(realname, cfgVariable);
  }
  return cfgVariable;
}

function setGMValue(suffix, name, value) {
  var realname = suffix;
  if (realname != '') realname += '-';
  realname += name;
  GM_setValue(realname, value);
}