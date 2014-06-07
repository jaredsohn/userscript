// ==UserScript==
// @name           Gondal (Allsround-Skript)
// @author         heinrich5991
// @version        3.1b
// @description    Macht das Leben in Gondal auf allen Servern einfacher.
// @description    Mit dem Skript kann man automatisch Dienste, Quests und Kaempfe machen.                                   
// @include        http://*.gondal*.de/*
// ==/UserScript==

/////////////////////////////////////////////////////////////////////////////////////////
/***************************************************************************************/
/*                                                                                     */
/* Upload (GMT + 1) Version  Neuigkeit                                                 */
/* YYYY-MM-DD HH:MM                                                                    */
/* 2009-07-21 11:00 1.0      Skript erstellt                                           */
/* 2009-07-21 13:45 1.0a     Quests mit Kaempfen sind jetzt auch supportet             */
/* 2009-07-22 21:00 1.0b     Kleiner Bug mit Diensten fuer Erfahrung gefixt            */
/* 2009-07-22 21:20 1.1      Benutzername, Passwort und Kampfgegner muessen nicht      */
/*                           mehr im Skript angegeben werden, sie werden abgefragt.    */
/*                                                                                     */
/* 2009-07-29 19:15 2.0      neue Version, jetzt kann man komplexere Befehle geben,    */
/*                           und sie in die Warteschleife integrieren. Ausserdem kann  */
/*                           man Quests machen, ohne Machtkristalle auszugeben.        */
/* 2009-07-30  7:30 2.0a     Quelltext bereinigt                                       */
/* 2009-07-30  8:15 2.0b     kleiner Bug mit Questoptionen gefixt                      */
/* 2009-07-30  8:20 2.0c     noch ein kleiner Bug mit Questoptionen gefixt             */
/* 2009-07-30  8:30 2.0d     Bug bei der Ausfuehrung von Quests gefixt                 */
/* 2009-08-01 13:45 2.0e     grosser Bug bei Quests behoben: Questanzahl wurde nicht   */
/*                           heruntergezaehlt.                                         */
/* 2009-08-02  9:00 2.0f     Bug bei Kaempfen behoben: falscher Redirect               */
/* 2009-08-02 13:10 2.0g     Skript wird nur noch auf bestimmten Seiten ausgefuehrt.   */
/* 2009-08-03  7:35 2.1      Updatefunktion hinzugefuegt; Quelltext bereinigt          */
/* 2009-08-03  7:35 2.1a     Umlaute entfernt                                          */
/*                                                                                     */
/* 2009-08-20  6:45 3.0      Jetzt sind auch die anderen Server im Script inbehalten.  */
/* 2009-08-21 17:15 3.0a     Bug entfernt (Loeschen von Befehlen war nicht moeglich)   */
/*                           und noch einen kleinen Bug mit Diensten gefixt            */
/* 2009-09-03 20:00 3.0b     Bug mit der Anzeige der Optionen entfernt und die         */
/*                           fehlerhafte Updatefunktion entfernt.                      */
/* 2009-12-05 12:45 3.1      Alchemisten- und Allianzen-Bug behoben.                   */
/* 2009-12-06 10:45 3.1a     Kleinen Bug mit der Bankseite entfernt.                   */
/* 2009-12-06 11:00 3.1b     Bug, der die Ausführung von Befehlen verhinderte behoben. */
/*                                                                                     */
/***************************************************************************************/
/////////////////////////////////////////////////////////////////////////////////////////

var ver = "3.1b";

var div;
var optionDiv;
var select;
var serviceType;
var stdServiceType;

var inputUserName;
var inputUserPassword;
var inputStdOpponent;
var inputStdQuestNumber;
var inputStdServiceType;

var inputFightOpponent;
var inputServiceType;
var inputQuestNumber;
var inputCommandRepeat;

function getValue(string)
{
  return GM_getValue(getServer() + string);
}

function setValue(string, value)
{
  GM_setValue(getServer() + string, value);
}

function issetValue(string)
{
  return (GM_getValue(getServer() + string, "FKFJEeJIOOAJDLJ") != "FKFJEeJIOOAJDLJ");
}

function deleteValue(string)
{
  GM_deleteValue(getServer() + string);
}

function splitReplace(string, ch, number, text)
{
  var temp = string.split(ch);
  var tempstring = "";
  for (var i = 0; i < temp.length; i++)
  {
    if (i == number)
      tempstring += text;
    else 
      tempstring += temp[i];
    if (i < temp.length - 1)
      tempstring += ch;
  }
  return tempstring;
}

function theVoid()
{
}

function randomize(from, to) 
{
  return from + parseInt(Math.random() * (to - from + 1), 10);
}

function getRTime()
{
  return randomize(500, 5000);
}

function getServer()
{
  if (window.location.host == "www.gondal.de")
    return "w1.gondal.de_";
  return window.location.host + "_";
} 

function getLRTime()
{
  return randomize(5000, 60000);
}

function pageRedirect(redir_to, time) 
{
  window.setTimeout('window.location.pathname = \"' + redir_to + '\"', time);
}

function getNumberOfCommands()
{
  return getValue("commands");
}

function setNumberOfCommands(number)
{
  setValue("commands", number);
}

function getCommand(number)
{
  if (number > getNumberOfCommands() || number < 0)
    return "none";
  return getValue("command" + String(number));
}

function shiftCommand()
{
  return deleteCommand(0);
}

function deleteCommand(number)
{
  if (getNumberOfCommands() <= number)
    return "none";
  var temp = getCommand(number);
  for (var i = number; i < getNumberOfCommands() - 1; i++)
    setCommand(i, getCommand(i + 1));
  deleteValue("command" + String(getNumberOfCommands() - 1));
  setNumberOfCommands(getNumberOfCommands() - 1);
  return temp;
}

function translate(str)
{
  switch (str)
  {
    case "fight":   return "Kampf";
    case "service": return "Dienst";
    case "quest":   return "Quest";
    case "none":    return "nichts";
    case "ep":      return "Erfahrungspunkte";
    case "gold":    return "Gold";
    default:        return "Nicht uebersetzbar (" + str + ")";
  }
}

function getNextCommand()
{
  if (getValue("commands") >= 1)
  {
    if (getCommand(0).split("/")[1] == String(0))
    {
      shiftCommand();
      return getNextCommand();
    }
    return getCommand(0);
  }
  return "none";
}

function setNextCommand(command)
{
  if (getValue("commands") >= 1)
    setCommand(0, command);
}

function pushCommand(newCommand)
{
  setValue("command" + String(getNumberOfCommands()), newCommand)
  setNumberOfCommands(getNumberOfCommands() + 1);
}

function setCommand(number, command)
{
  if (getValue("commands") > number)
    setValue("command" + String(number), command);
}

function runCommand(command)
{
  var page = window.location.pathname;
  var end = false;
  var tempCommand;
  switch (command.split("/")[0])
  {
    case "fight":
      if (page.split("/")[1] != "fights")
      {
        pageRedirect("/fights/start", getRTime());
        return;
      }
      
      switch(page.split("/")[2])
      {
        case "start":
          if (document.getElementsByName("data[Character][name]")[0].value == command.split("/")[2]) 
            pageRedirect(document.getElementById("search").getElementsByTagName("a")[1].pathname, getRTime());
          else
          {            
            document.getElementsByName("data[Character][name]")[0].value = command.split("/")[2];
            window.setTimeout('document.getElementsByTagName("form")[1].submit()', getRTime());
          }
          break;
      
        case "fight":
          var temp = document.getElementById("fighttostats").getElementsByTagName("a")[0].href.split("/");
          pageRedirect("/" + temp[3] + "/" + temp[4] + "/" + temp[5], getRTime());
          break;
          
        case "results":  
          pageRedirect("/fights/start", getRTime());
          if (parseInt(command.split("/")[1]) > 0)
            end = true;
          break;
          
        case "waitLp":
          pageRedirect("/fights/start", getRTime());
          break;

        case "waitFight":
          pageRedirect("/fights/start", getLRTime());
          break;
        
        default:
          pageRedirect("/fights/start", getRTime());
          break;
      }
      break;
      
    case "service":
      if (page.split("/")[1] != "services")
      {
        pageRedirect("/services/index", getRTime());
        return;
      }
      
      switch (page.split("/")[1])
      {
        case "index":
          if (page == "/services/index/" + command.split("/")[2])
            window.setTimeout('document.getElementsByTagName("form")[0].submit()', getRTime());
          else
            pageRedirect("/services/index/" + command.split("/")[2])
          break;
          
        case "serve":
          pageRedirect("/services/serve", getLRTime());
          break;
          
        case "finish":
          pageRedirect("/services/index", getRTime());
          if (parseInt(command.split("/")[1]) > 0)
            end = true;
          break;
          
        default:
          pageRedirect("/services/index/" + command.split("/")[2], getRTime());
          break;
      }
    case "quest":
      if (page.split("/")[1] != "quests")
      {
        pageRedirect("/quests/start", getRTime());
        return;
      }
    
      switch (page.split("/")[2])
      {
        case "start":
          var sstr = document.getElementsByTagName("script")[12].innerHTML;
          var tempcounter = -3;
          var temp1 = "";
          var temp2 = "";
          var questNumber = 0;
          for (var i = 0; i < 1000; i++, tempcounter--)
          {
            if (sstr[i] == "{")
              tempcounter = 11;
            if (tempcounter >= -2 && tempcounter <= 0)
            {
              if (sstr[i] == ",")
              {
                tempcounter = -3;
                if (questNumber == 0)
                {
                  questNumber = 1;
                  continue;
                }
                break;
              }
              else
                if (questNumber == 0)
                  temp1 += sstr[i];
                else 
                  temp2 += sstr[i];
            }
          }
          if (parseInt(command.split("/")[2]) == 0)
            pageRedirect("/quests/start/" + temp1, getRTime());
          else 
            pageRedirect("/quests/start/" + temp2, getRTime());
          break;
          
        case "doQuest":
          pageRedirect("/quests/doQuest", getLRTime());
          break;
          
        case "fight":
          pageRedirect(document.getElementsByTagName("div")[26].innerHTML.split("\'")[1], getRTime());
          break;
          
        case "finish":
          if (parseInt(command.split("/")[1]) > 0)
            end = true;
        case "endText":
        case "results":
        case "waitLp":
        default:
          pageRedirect("/quests/start", getRTime());
          break;
      }

    case "none":
      break;
  }

  if (end)
    tempCommand = splitReplace(command, "/", 1, String(parseInt(command.split("/")[1]) - 1))

  return tempCommand;
}

function createNodeWithProperty(parent, tag, caption, optionName, optionValue)
{
  return createNodeWithEventAndProperty(parent, tag, caption, "", 0, optionName, optionValue);
}
 
function createNodeWithEventAndProperty(parent, tag, caption, event, eventfunction, optionName, optionValue)
{
  var temp = createNodeWithEvent(parent, tag, caption, event, eventfunction);
  temp.setAttribute(optionName, optionValue);
  return temp;
}

function createNodeWithEvent(parent, tag, caption, event, eventfunction)
{
  var temp = createNode(parent, tag, caption);
  if (event != "")
    temp.addEventListener(event, eventfunction, true);
  return temp;
}

function createNode(parent, tag, caption)
{
  var temp = document.createElement(tag);
  parent.appendChild(temp);
  if (tag != "input")
  {
    if (tag != "br")
      temp.innerHTML = caption;
  }
  else 
    temp.value = caption;
  return temp;
}

///////////////////////////////////////////////

function chooseService() 
{
  if (window.confirm("Dienst fuer Gold (OK) oder fuer Erfahrungspunkte (Abbrechen)"))
    setValue("service", "gold");
  else
    setValue("service", "ep");
}

function chooseQuestNumber()
{
  if (window.confirm("Quest 1 (OK) oder Quest 2 (Abbrechen)"))
    setValue("quest", 0);
  else
    setValue("quest", 1);
}

function chooseUserName()
{
  setValue("username", prompt("Bitte den Benutzernamen fuer Gondal angeben", 
                                 getValue("username")));
}

function chooseUserPassword()
{
  setValue("userpassword", prompt("Bitte das Passwort fuer Gondal angeben", 
                                     getValue("userpassword")));
}

function chooseOpponent()
{
  setValue("opponent", prompt("Bitte den anzugreifenden Gegner angeben (\"Waehlen Sie Bitte einen Charakter\" ist ein Gegner fuer Ferono)", 
                                 getValue("opponent"))); 
}

function changeOptions()
{
  setValue("username", inputUserName.value);
  setValue("userpassword", inputUserPassword.value);
  setValue("opponent", inputStdOpponent.value);
  switch (inputStdQuestNumber.value)
  {
    case "1":
    case "2":
      setValue("quest", parseInt(inputStdQuestNumber.value) - 1);
      break;
  }
  setValue("service", stdServiceType);
  alert(     "Aktueller Benutzername: \""       + getValue("username")
       + "\"\nAktuelles Passwort: \""           + getValue("userpassword")
       + "\"\nAktueller Standardgegner: \""     + getValue("opponent")
       + "\"\nAktuelle Standardquestnummer: "   + String(getValue("quest") + 1)
       + "  \nAktueller Standarddiensttyp: \""  + translate(getValue("service"))
       + "\"");
}

function changeSelect()
{
  var command = getCommand(select.selectedIndex);
  
  optionDiv.innerHTML = "";

  switch (command.split("/")[0])
  {
    case "fight":
    case "service":
    case "quest":
      createNode(optionDiv, "label", "Wiederholungen verbleibend (-1 ist unendlich): ");
      inputCommandRepeat = createNodeWithProperty(optionDiv, "input", command.split("/")[1], 
                                                  "style", "width: 100px");
      createNode(optionDiv, "br", "");
      break;
      
    case "none":
    default:
      break;
  }

  switch (command.split("/")[0])
  {
    case "fight":
      createNode(optionDiv, "label", "Gegner: ");
      inputFightOpponent = createNodeWithProperty(optionDiv, "input", 
                                                  command.split("/")[2], "style", "width: 250px");
      break;
      
    case "service":
      createNode(optionDiv, "label", "Diensttyp: ");
      inputServiceType = createNodeWithEvent(optionDiv, "input", translate(command.split("/")[2]), 
                                             "focus", changeServiceType);
      serviceType = command.split("/")[2];
      break;
      
    case "quest":
      createNode(optionDiv, "label", "Questnummer (1 oder 2): ");
      inputQuestNumber = createNodeWithProperty(optionDiv, "input", String(parseInt(getCommand(
                                                select.selectedIndex).split("/")[2]) + 1),
                                                "style", "width: 20px");
      break;
    
    case "none":
    default:
      break;
  }  

  createNode(optionDiv, "br", "");
  createNode(optionDiv, "br", "");
  
  if (getNumberOfCommands() > 0)
    createNodeWithEvent(optionDiv, "button", "Befehl loeschen", "click", purgeCommand);
  
  switch (command.split("/")[0])
  {
    case "fight":
    case "service":
    case "quest":
      createNodeWithEvent(optionDiv, "button", "Übernehmen", "click", changeCommandOptions);
      break;
      
    case "none":
    default:
      break;
  }

}

function changeServiceType()
{
  if (window.confirm("Dienst fuer Gold (OK) oder fuer Erfahrungspunkte (Abbrechen)?"))
    serviceType = "gold";
  else
    serviceType = "ep";
  
  inputServiceType.value = translate(serviceType);
  inputServiceType.blur();
}

function changeStdServiceType()
{
  if (window.confirm("Standardmaessig Dienst fuer Gold (OK) oder fuer Erfahrungspunkte (Abbrechen)?"))
    stdServiceType = "gold";
  else
    stdServiceType = "ep";
  
  inputStdServiceType.value = translate(stdServiceType);
  inputStdServiceType.blur();
}

function changeCommandOptions()
{
  var command = getCommand(select.selectedIndex).split("/")[0];
  var result = command + "/" + inputCommandRepeat.value + "/";
  var resultToUser = "Wiederholungen: " + inputCommandRepeat.value + "\n"
  switch (command)
  {
    case "fight":
      result += inputFightOpponent.value;
      resultToUser += "Gegner: \"";
      resultToUser += inputFightOpponent.value;
      resultToUser += "\"";
      break;
      
    case "quest":
      if (inputQuestNumber.value == "1" || inputQuestNumber.value == "2")
        result += String(parseInt(inputQuestNumber.value) - 1);
      else 
        result += getCommand(select.selectedIndex).split("/")[1];
      resultToUser += "Questnummer: ";
      resultToUser += String(parseInt(result.split("/")[2]) + 1);
      break;
      
    case "service":
      resultToUser += ("Gegner: \"" + inputFightOpponent.value + "\"");
      result += serviceType;
      resultToUser += "Diensttyp: ";
      resultToUser += translate(serviceType);
  }
  
  setCommand(select.selectedIndex, result);  
  alert(resultToUser);
}

function newCommand()
{
  var commandType;
  while (commandType != "fight" && commandType != "quest" && commandType != "service" && commandType != "none" && commandType != "")
    commandType = prompt("Waehlen Sie bitte den Typ fuer den neuen Befehl (fight = Kampf, quest = Quest, service = Dienst)", "none");
  
  if (commandType == "none" || commandType == "")
    return;
  
  var result = commandType + "/-1/";
  switch (commandType)
  {
    case "fight":
      result += getValue("opponent");
      break;
    
    case "quest":
      result += String(getValue("quest"));
      break;
      
    case "service":
      result += getValue("service");
      break;
  }
  pushCommand(result);
  div.innerHTML = "";
  options();
}

function purgeCommand()
{
  deleteCommand(select.selectedIndex);
  div.innerHTML = "";
  options();
}

function login()
{
  document.getElementsByName("data[Signup][name]")[0].value = getValue("username");
  document.getElementsByName("data[Signup][pass]")[0].value = getValue("userpassword");
  window.setTimeout('document.getElementsByTagName("form")[0].submit()', getRTime());
}

function options()
{
  div = createNode(document.getElementsByTagName("div")[10], "div", "");

  createNode(div, "label", "Benutzername: ");
  inputUserName = createNode(div, "input", getValue("username"));
  
  createNode(div, "label", " Passwort: ");
  inputUserPassword = createNodeWithProperty(div, "input", getValue("userpassword"), "type", "password");
  
  createNode(div, "br", "");
  
  createNode(div, "label", "Standardgegner: ");
  inputStdOpponent = createNodeWithProperty(div, "input", getValue("opponent"), "style", "width: 250px");
  
  createNode(div, "label", " Standardquestnummer (1 oder 2): ");
  inputStdQuestNumber = createNodeWithProperty(div, "input", String(getValue("quest") + 1), "style", "width: 10px");

  createNode(div, "label", " Standarddiensttyp: ")
  inputStdServiceType = createNodeWithEvent(div, "input", translate(getValue("service")), 
                                            "focus", changeStdServiceType);
  stdServiceType = getValue("service");
  
  createNode(div, "br", "");
  createNode(div, "br", "");
  
  createNodeWithEvent(div, "button", "Übernehmen", "click", changeOptions);

  createNode(div, "br", "");
  createNode(div, "br", "");
  createNode(div, "br", "");
  createNode(div, "br", "");
  
  var form = createNode(div, "form", "");
  
  createNodeWithEvent(form, "button", "Neuer Befehl", "click", newCommand);

  createNode(form, "br", "");
  
  createNode(form, "label", "Naechste Aktionen:");
  createNode(form, "br", "");
  
  select = createNodeWithEventAndProperty(form, "select", "", "change", changeSelect, "size", "6"); 

  for (var i = 0; i < ((getNumberOfCommands() > 0) ? getNumberOfCommands() : 1); i++)
  {
    var newOption = document.createElement("option");
    newOption.innerHTML = translate(getCommand(i).split("/")[0]);
    select.appendChild(newOption);
  }
  
  optionDiv = document.createElement("div");
  div.appendChild(optionDiv);
  
  createNode(div, "br", "");


  createNode(div, "br", "");
  createNode(div, "br", "");
  createNode(div, "br", "");
  createNode(div, "br", "");
}

function main()
{
  GM_setValue("ver", ver);

  if (!issetValue("username"))
    chooseUserName();
  
  if (!issetValue("userpassword"))
    chooseUserPassword();
  
  if (!issetValue("opponent"))
    chooseOpponent();
  
  if (!issetValue("service")) 
    chooseService();
  
  if (!issetValue("quest"))
    chooseQuestNumber(); 
   
  if (!issetValue("commands"))
    setValue("commands", 0);
  
  switch (window.location.pathname)
  {
    case "/":
      pageRedirect("/signups/login", getRTime());
      break;
      
    case "/signups/login":
      login();
      break;
    
    case "/characters/index":
      options();
      break;
     
    default:
      switch (window.location.pathname.split("/")[1])
      {
          
        case "fights":
        case "quests":
        case "services":
          setNextCommand(runCommand(getNextCommand()));
          getNextCommand();
          break;

        case "characters":
        case "guilds":
        case "items":
        case "placeOfHonour":
        case "pns":
        case "rides":
        case "settings":
        case "taverne":
        case "signups":
        case "allies":
        case "bank":
        case "alchemist":
        default:
          break;
      }
      break;
  }
}


main();
