// ==UserScript== 
// @name          Supreme Reign of Fire
// @namespace     http://www.haven'tfuckingdecidedyet.co.uk/ur/a/retard.
// @description   SROF official website
// @include       http://www.kingsofchaos.com/alliances.php?id=2559
// ==/UserScript==
alert( 'Welcome to Supreme Reign of Fire, Courage, Loyalty and Honor');
var newBody = 
'<html>' +
'<head>' +
'<table width="10%" border="2" bordercolor="yellow">' +
'<tbody>' +
'<tr>' +
'<td valign="top" width="25%">' +
'<a href="http://www.kingsofchaos.com/alliances.php?id=2559">' +
'<input type="submit" name="Home" id="Home" value="Home">' +
'<span class="GramE">' +
'<b>' + 
'</span>' +
'</a>' +
'<b>' +
'</td>' +
'</tr>' + 
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://wss.eamped.com/">' +
'<label>' +
'<input type="submit" name="Forum" id="Forum" value="Forum">' +
'</label>' +
'</a>' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/base.php">' +
'<input type="submit" name="Command Center" id="Command Center" value="Command Center">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/battlefield.php">' +
'<input type="submit" name="Attack" id="Attack" value="Attack">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/armory.php">' +
'<input type="submit" name="Armory" id="Armory" value="Armory">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/train.php">' +
'<input type="submit" name="Training" id="Training" value="Training">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/intel.php">' +
'<input type="submit" name="Intelligence" id="Intelligence" value="Intelligence">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/recruit.php?">' +
'<input type="submit" name="Recruit" id="Recruit" value="Recruit">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/mercs.php">' +
'<input type="submit" name="Mercenaries" id="Mercenaries" value="Mercenaries">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/buddylist.php">' +
'<input type="submit" name="Buddy List" id="Buddy List" value="Buddy List">' +
'</td>' +
'</tr>' +
'<tr>' +
'<td valign="top" width="25%" height="28">' +
'<a href="http://www.kingsofchaos.com/logout.php">' +
'<input type="submit" name="Logout" id="Logout" value="Logout">' +
'</td>' +
'</tr>' +
'</tbody>' +
'</table>' +
'<center>' +
'<title>Supreme Reign of Fire</title>' +
'<p>At the moment this is a beta script, but soon i think i can create a full website via Greasemonkey.</p>' +
'<p>Below are Two very good clickers click "download" to download them:</p>' +
'<p></p>' +
'<a href="http://shane.aeru.org/recruiters/download/ClickFeast.zip">' +
'<input type="submit" name="Download ClickFeast" id="Download ClickFeast" value="Download ClickFeast">' +
'</a>' +
'<p></p>' +
'<p></p>' +
'<a href="http://shane.aeru.org/recruiters/download/WR.zip">' +
'<input type="submit" name="Download WildRecruiter" id="Download WildRecruiter" value="Download WildRecruiter">' +
'</a>' + 
'<p></p>' +
'<p>Click here to Install the amazing "Yet Another Recruiter" by zupzupsoup:</p>' +
'<p></p>' + 
'<a href="http://koc.ithildin.com/scripts/yar.xpi">' +
'<input type="submit" name="Install YetAnotherRecruiter" id="Install YetAnotherRecruiter" value="Install YetAnotherRecruiter">' + 
'</a>' +
'<p></p>' +
'<table width="100%" class="table_lines" border="0" cellspacing="0" cellspacing="0">' +
'<tbody>' +
'<tr>' +
'<th colspan="5">Buy Weapons!!</th>' +
'</tr>' +
'<tr>' +
'<th class="subh" align="left">Attack Weapons!!</th>' +
'<th class="subh" align="right">Strength</th>' +
'<th class="subh" align="right">Price</th>' +
'<th class="subh">Buy</th>' +
'</tr>' + 
'<tr>' +
'<td>Blackpowder Missile</td>' +
'<td align="right">12000</td>' +
'<td align="right">850,000 Gold</td>' +
'<td align="center">' +
'<input type="text" name="buy_weapon[70]" value="0" size="3">' +
'</td>' +
'</tr>' +
'<tr>' +
'<th class="subh" align="left">Defense Weapons!!</th>' +
'<th class="subh" align="right">Strength</th>' +
'<th class="subh" align="right">Price</th>' +
'<th class="subh">Buy</th>' +
'</tr>' +
'<tr>' +
'<td>Invisibilty Sheild</td>' +
'<td align="right">10000</td>' +
'<td align="right">750,000 Gold</td>' +
'<td align="center">' +
'<input type="text" name="buy_weapon[71]" value="0" size="3">' +
'</td>' +
'</tr>' +
'<tr>' +
'<th colspan="5">Buy Tools</th>' +
'</tr>' +
'<th class="subh" align="left">Spy Tools</th>' +
'<th class="subh" align="right">Strength</th>' +
'<th class="subh" align="right">Price</th>' +
'<th class="subh">Buy</th>' +
'</tr>' +
'<tr>' +
'<tr>' +
'<td>Nunchaku</td>' +
'<td align="right">100</td>' +
'<td align="right">500,000 Gold</td>' +
'<td align="center">' +
'<input type="text" name="buy_weapon[75]" value="0" size="3">' +
'</td>' +
'</tr>' +
'<tr>' +
'<th class="subh" align="left">Sentry Tools</th>' +
'<th class="subh" align="right">Strength</th>' +
'<th class="subh" align="right">Price</th>' +
'<th class="subh">Buy</th>' +
'</tr>' +
'<tr>' +
'<td>Lookout Tower</td>' +
'<td align="right">60</td>' +
'<td align="right">500,000 Gold</td>' +
'<td align="center">' +
'<input name="buybut" type="submit" value="Buy Weapons">' + 
'</td>' +
'</tr>' +
'<tr>' +
'<td colspan="5" align="center">' +
'<input type="submit" name="Buy" id="Buy" value="Buy">' +
'</td>' +
'</tr>' +
'</tbody>' +
'</table>' +
'</center>' +
'</head>' +
'</body>' +
'</html>';
window.addEventListener(
    'load', 
    function() { document.body.innerHTML = newBody; },
    true); 
window.addEventListener(
    'click', 
    function() { document.buyform.buybut.value='Buying..'; document.buyform.buybut.disabled=true; document.buyform.submit(); },
    true); 