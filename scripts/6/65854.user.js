// ==UserScript==
// @name           Jappy Profilehangler
// @namespace      Jappy
// @version        2.5
// @description    Hangelt sich bei Jappy durch Profile und erzeugt dadurch Aktivitaet.
// @include        http://www.jappy.*/*
// @require        http://userscripts.org/scripts/source/75442.user.js
// @resource  meta http://userscripts.org/scripts/source/65854.meta.js?interval=7
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////////
/***************************************************************************************/
/*                                                                                     */
/* Upload (GMT + 1) Version  Neuigkeit                                                 */
/* YYYY-MM-DD HH:MM                                                                    */
/* 2010-01-07 06:45 1.0      Skript erstellt                                           */
/* 2010-01-13 21:30 1.1      Auswaehlbarkeit des Geschlechts der besuchten Profile     */
/* 2010-01-14 20:30 1.2      Checkbox zum Ausschalten des Skripts                      */
/* 2010-01-13 21:30 1.3      Auswaehlbarkeit des Maximalalter und Minimalalter         */
/*                           der besuchten Profile                                     */
/* 2010-03-22 18:30 1.4      Wenn kein entsprechendes Profil gefunden wird, wird nun   */
/*                           ein Profil aus der Online-Liste genommen.                 */
/* 2010-08-13 11:00 1.5      Mit dem neuen Jappy-Interface kompatibel gemacht.         */
/*                                                                                     */
/* 2010-08-13 14:30 2.0      Komplett neue Benutzeroberflaeche erstellt.               */
/* 2010-08-13 20:45 2.0a     Bug gefixt, der verhinderte aus der Onlineliste zu lesen. */
/* 2010-08-14 10:00 2.1      Autoupdater hinzugefuegt.                                 */
/* 2010-08-14 21:30 2.1a     Bug gefixt, der verhinderte Wartezeiten zu aendern.       */
/* 2010-08-15 08:45 2.2      Einfacher zu erreichen: Aktivierung, Werbeblocker         */
/* 2010-08-16 10:00 2.3      Skript merkt sich jetzt die letzten n Profile             */
/*                            + viele kleine Verbesserungen                            */
/* 2010-11-02 18:45 2.4      Update auf das neue Jappy-Interface                       */
/* 2010-11-06 09:00 2.4a     Bug gefixt, der verhinderte, das Mindestalter zu aendern  */
/* 2010-11-16 21:15 2.5      Update für geaendertes Jappy-Interface                    */
/*                                                                                     */
/***************************************************************************************/
/////////////////////////////////////////////////////////////////////////////////////////

var tbody;
var spanUseScript;

function createNodeWithTwoProperties(tag, caption, option1Name, option1Value, option2Name, option2Value)
{
  var temp = createNodeWithEventAndProperty(tag, caption, "", 0, option1Name, option1Value);
  temp.setAttribute(option2Name, option2Value);
  return temp;
}

function createNodeWithProperty(tag, caption, optionName, optionValue)
{
  return createNodeWithEventAndProperty(tag, caption, "", 0, optionName, optionValue);
}
 
function createNodeWithEventAndProperty(tag, caption, event, eventfunction, optionName, optionValue)
{
  var temp = createNodeWithEvent(tag, caption, event, eventfunction);
  temp.setAttribute(optionName, optionValue);
  return temp;
}

function createNodeWithEvent(tag, caption, event, eventfunction)
{
  var temp = createNode(tag, caption);
  if (event != "")
    temp.addEventListener(event, eventfunction, true);
  return temp;
}

function createNode(tag, caption)
{
  var temp = document.createElement(tag);
  if (tag != "input")
  {
    if (tag != "br")
      temp.innerHTML = caption;
  }
  else 
    temp.value = caption;
  return temp;
}

function randomize(min, max) 
{
  return min + parseInt(Math.random() * (max - min + 1));
}

function getRTime()
{
  return randomize(getValue("mintime"), getValue("maxtime"));
}

function options()
{
  var temp = document.getElementById("mx");
  temp.appendChild(createNodeWithProperty("a", " ", "href", "/settings/jpyscript"));
  temp.lastChild.appendChild(createNode("span", "Profilehangler-Optionen"));

  temp.appendChild(createNodeWithEvent("a", " ", "click", toggleUseScript));
  spanUseScript = temp.lastChild.appendChild(createNode("span", ""));
  showUseScript();
}

function toggleUseScript()
{
  GM_setValue("usescript", !getValue("usescript"));
  showUseScript();
}

function showUseScript()
{
  spanUseScript.innerHTML = "Profilehangler " + (getValue("usescript") ? "aktiv" : "inaktiv");
}

function blockAds()
{
  try
  {
    document.getElementById("no").removeChild(document.getElementById("noBanner"));
  }
  catch(err)
  {
  }
}

function showSettingsRoot()
{
  
  var table = document.getElementById("se").getElementsByTagName("table")[0].getElementsByTagName("tbody")[0];
  var tr = createNodeWithTwoProperties("tr", "", "onmouseover", "Jpy.css.hoverClass(this, 'bgY7')", "class", "line");

  table.insertBefore(tr, table.getElementsByTagName("tr")[17]);
  
  tr.appendChild(createNode("td", ""));
  tr.appendChild(createNode("td", ""));
  
  tr.childNodes[0].appendChild(createNodeWithTwoProperties("a", "Jappy Profilehangler", "class", "setting", "href", "/settings/jpyscript"));
  tr.childNodes[1].appendChild(createNodeWithProperty("span", getSummary(), "class", "coG2"));
}

function showSettingsScript()
{
  var optionsCount = 9;
  var table = document.getElementById("se").getElementsByTagName("table")[0];
  table.removeChild(table.getElementsByTagName("tbody")[0]);
  
  tbody = createNode("tbody", "");
  table.appendChild(tbody);

  for (var i = 0; i < optionsCount + 2; i++)
    tbody.appendChild(createNodeWithProperty("tr", "", "class", " "));
  
  tbody.childNodes[0].appendChild(createNodeWithTwoProperties("td", "Jappy Profilehangler", "class", "ti5 fs16 pt15", "colspan", "2"));

  for (var i = 1; i < optionsCount + 1; i++)
  {
    tbody.childNodes[i].appendChild(createNodeWithProperty("td", "", "width", "270"));
    tbody.childNodes[i].appendChild(createNodeWithProperty("td", "", "width", "330"));

    tbody.childNodes[i].childNodes[0].appendChild(createNodeWithProperty("div", "", "class", "pd5"));
  }
  
  tbody.childNodes[1].childNodes[0].childNodes[0].innerHTML = "Skriptstatus";
  tbody.childNodes[1].childNodes[1].appendChild(createNodeWithProperty("select", "", "class", "inW2 w320"));
  tbody.childNodes[1].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "aktiv", "value", "true"));
  tbody.childNodes[1].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "inaktiv", "value", "false"));
  tbody.childNodes[1].childNodes[1].childNodes[0].selectedIndex = !getValue("usescript");
  
  tbody.childNodes[2].childNodes[0].childNodes[0].innerHTML = "Geschlecht";
  tbody.childNodes[2].childNodes[1].appendChild(createNodeWithProperty("select", "", "class", "inW2 w320"));
  tbody.childNodes[2].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "maennlich", "value", "maennlich"));
  tbody.childNodes[2].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "weiblich", "value", "weiblich"));
  tbody.childNodes[2].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "egal", "value", "egal"));
  if (getValue("sex") == "maennlich")
    tbody.childNodes[2].childNodes[1].childNodes[0].selectedIndex = 0;
  else if (getValue("sex") == "weiblich")
    tbody.childNodes[2].childNodes[1].childNodes[0].selectedIndex = 1;
  else
    tbody.childNodes[2].childNodes[1].childNodes[0].selectedIndex = 2;
  
  tbody.childNodes[3].childNodes[0].childNodes[0].innerHTML = "Geschlecht nur bevorzugen (empfohlen)";
  tbody.childNodes[3].childNodes[1].appendChild(createNodeWithProperty("select", "", "class", "inW2 w320"));
  tbody.childNodes[3].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "aktiv", "value", "true"));
  tbody.childNodes[3].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "inaktiv", "value", "false"));
  tbody.childNodes[3].childNodes[1].childNodes[0].selectedIndex = !getValue("switchtoothersex");


  tbody.childNodes[4].childNodes[0].childNodes[0].innerHTML = "Mindestalter für besuchte Profile";
  tbody.childNodes[4].childNodes[1].appendChild(createNodeWithTwoProperties("input", getValue("minage"), "type", "text", "class", "inW2 w320"));

  tbody.childNodes[5].childNodes[0].childNodes[0].innerHTML = "Maximalalter für besuchte Profile";
  tbody.childNodes[5].childNodes[1].appendChild(createNodeWithTwoProperties("input", getValue("maxage"), "type", "text", "class", "inW2 w320"));

  tbody.childNodes[6].childNodes[0].childNodes[0].innerHTML = "Mindestwartezeit auf einem Profil in Millisekunden";
  tbody.childNodes[6].childNodes[1].appendChild(createNodeWithTwoProperties("input", getValue("mintime"), "type", "text", "class", "inW2 w320"));

  tbody.childNodes[7].childNodes[0].childNodes[0].innerHTML = "Maximalwartezeit auf einem Profil in Millisekunden";
  tbody.childNodes[7].childNodes[1].appendChild(createNodeWithTwoProperties("input", getValue("maxtime"), "type", "text", "class", "inW2 w320"));

  tbody.childNodes[8].childNodes[0].childNodes[0].innerHTML = "Speichere die letzten n Profile, n = ";
  tbody.childNodes[8].childNodes[1].appendChild(createNodeWithTwoProperties("input", getValue("countermax"), "type", "text", "class", "inW2 w320"));
  
  tbody.childNodes[9].childNodes[0].childNodes[0].innerHTML = "Werbeblocker";
  tbody.childNodes[9].childNodes[1].appendChild(createNodeWithProperty("select", "", "class", "inW2 w320"));
  tbody.childNodes[9].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "aktiv", "value", "true"));
  tbody.childNodes[9].childNodes[1].childNodes[0].appendChild(createNodeWithProperty("option", "inaktiv", "value", "false"));
  tbody.childNodes[9].childNodes[1].childNodes[0].selectedIndex = !getValue("blockads");
  
  tbody.childNodes[10].appendChild(createNodeWithProperty("td", "", "class", " "));
  tbody.childNodes[10].appendChild(createNodeWithProperty("td", "", "class", " "));
  tbody.childNodes[10].childNodes[1].appendChild(createNodeWithProperty("div", "", "class", "pd10"));
  tbody.childNodes[10].childNodes[1].childNodes[0].appendChild(createNodeWithTwoProperties("a", "Zurueck", "class", "inCo fs12 rb5", "href", "/settings"));
  tbody.childNodes[10].childNodes[1].childNodes[0].appendChild(createNodeWithEventAndProperty("button", "Speichern", "click", applySettings, "class", "inAc rb5 cp"));
}

function applySettings()
{
  GM_setValue("usescript", !tbody.childNodes[1].childNodes[1].childNodes[0].selectedIndex);
  
  if (tbody.childNodes[2].childNodes[1].childNodes[0].selectedIndex == 0)
    GM_setValue("sex", "maennlich");
  else if (tbody.childNodes[2].childNodes[1].childNodes[0].selectedIndex == 1)
    GM_setValue("sex", "weiblich");
  else
    GM_setValue("sex", "egal");
  
  GM_setValue("switchtoothersex", !tbody.childNodes[3].childNodes[1].childNodes[0].selectedIndex);
  
  if (parseInt(tbody.childNodes[4].childNodes[1].childNodes[0].value) >= 14 && parseInt(tbody.childNodes[4].childNodes[1].childNodes[0].value) <= 99)
    GM_setValue("minage", parseInt(tbody.childNodes[4].childNodes[1].childNodes[0].value));
  
  if (parseInt(tbody.childNodes[5].childNodes[1].childNodes[0].value) <= 99)
    if (parseInt(tbody.childNodes[5].childNodes[1].childNodes[0].value) >= getValue("minage"))
       GM_setValue("maxage", parseInt(tbody.childNodes[5].childNodes[1].childNodes[0].value));
     else
       GM_setValue("maxage", getValue("minage"));
  
  if (parseInt(tbody.childNodes[6].childNodes[1].childNodes[0].value) >= 0)
    GM_setValue("mintime", parseInt(tbody.childNodes[6].childNodes[1].childNodes[0].value));
  
  if (parseInt(tbody.childNodes[7].childNodes[1].childNodes[0].value) >= getValue("mintime"))
    GM_setValue("maxtime", parseInt(tbody.childNodes[7].childNodes[1].childNodes[0].value));
  else
    GM_setValue("maxtime", getValue("mintime"));

  if (parseInt(tbody.childNodes[8].childNodes[1].childNodes[0].value) >= 0 && parseInt(tbody.childNodes[8].childNodes[1].childNodes[0].value) <= 1000)
    setCounterMax(parseInt(tbody.childNodes[8].childNodes[1].childNodes[0].value));
  
  GM_setValue("blockads", !tbody.childNodes[9].childNodes[1].childNodes[0].selectedIndex);
    
  alert("Einstellungen gespeichert\n(" + getSummary() + ")");
}

function setCounterMax(newCounterMax)
{
  var curCounterMax = getValue("countermax");
  if (newCounterMax < curCounterMax)
    for (var i = newCounterMax; i < curCounterMax; i++)
      GM_deleteValue("previousname" + i);

  GM_setValue("countermax", newCounterMax);
}

function getSummary()
{
  var str = "";
  
  if (getValue("usescript"))
    str += "Aktiv, ";
  else 
    str += "Inaktiv, ";
  
  str += "Alter: " + getValue("minage") + "-" + getValue("maxage") + ", ";
  
  if (getValue("switchtoothersex"))
    str += "bevorzugt ";
  else
    str += "ausschliesslich ";
  
  str += getValue("sex") + ", ";
  str += "Zeit: " + getValue("mintime") / 1000 + "s-" + getValue("maxtime") / 1000 + "s, ";
  
  str += "n = " + getValue("countermax");
  
  if (getValue("blockads"))
    str += ", Werbeblocker";
  
  return str;
}

function checkName(name)
{
  for (var i = 0; i < getValue("countermax"); i++)
    if (getValue("previousname" + i) == name)
      return false;
  
  var counter = getValue("counter");
  counter++;
  counter %= getValue("countermax");
  GM_setValue("counter", counter);

  GM_setValue("previousname" + counter, name);
  return true;
}

function getValue(name)
{
  if (GM_getValue(name, "undefined") != "undefined")
    return GM_getValue(name);

  switch (name)
  {
    case "usescript": return true;
    case "blockads": return true;
    case "minage": return 14;
    case "maxage": return 99;
    case "mintime": return 5000;
    case "maxtime": return 15000;
    case "sex": return "egal";
    case "counter": return 0;
    case "countermax": return 25; 
    case "switchtoothersex": return true;
  }
  
  return "undefined";
}

function dotask()
{
  var ownProfile = document.getElementById("he").getElementsByTagName("a")[2].href;
  var search = document.getElementsByTagName("div");
  
  for (var i = 0; i < search.length; i++)
  {
    if  (search[i].className == "visitors")
    {
      var links = search[i].getElementsByTagName("a");
      for (var k = 0; k < 25; k++)
      {
        var found = links[randomize(0, links.length - 1)];
        if (found.className != "ni" && found.className != "no")
          continue;
        
        var profileString = found.innerHTML;
        var profileUrl = found.href;
        if (profileUrl != ownProfile)
        {
          if (((getValue("sex")[0] == 'e' || getValue("sex")[0] == profileString[0]) 
            && (parseInt(profileString[2] + profileString[3]) >= getValue("minage") && parseInt(profileString[2] + profileString[3]) <= getValue("maxage"))))
          {
            if (checkName(profileUrl))
            {
              window.setTimeout('window.location.href = \"' + profileUrl + '\"', getRTime());
              return;
            }
          }
        }
      }
      
      if (getValue("switchtoothersex"))
        for (var k = 0; k < 25; k++)
        {
          var found = links[randomize(0, links.length - 1)];
          if (found.className != "ni" && found.className != "no")
            continue;
          
          var profileString = found.innerHTML;
          var profileUrl = found.href;
          if (found.href != ownProfile)
          {
            if (parseInt(profileString[2] + profileString[3]) >= getValue("minage") && parseInt(profileString[2] + profileString[3]) <= getValue("maxage"))
            {
              if (checkName(profileUrl))
              {
                window.setTimeout('window.location.href = \"' + profileUrl + '\"', getRTime());
                return;
              }
            }
          }
        }
    }
  }
  
  var redirect = document.getElementById("OnlinelistBox").getElementsByTagName("a")[randomize(0, 14)];
  window.setTimeout('window.location.href = \"' + redirect.href + '\"', getRTime());
}
 
function main()
{
  options();

  if (getValue("blockads"))
    blockAds();
  
  var pathname = window.location.pathname;

  if (pathname.split("user").length == 2)
    if (pathname.split("/").length == 3)
      if (getValue("usescript"))
        dotask();
  
  if (pathname.split("/")[1] == "settings")
  {  
    if (pathname.split("/").length == 2)
      showSettingsRoot();
    if (pathname.split("/")[2] == "jpyscript")
      showSettingsScript();
  }  
}

main();
