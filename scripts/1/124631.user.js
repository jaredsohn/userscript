// ==UserScript==
// @name			Test
// @namespace      Fabien
// @description    Test
// @include        http://*ogame.*
// ==/UserScript==

function FixActionIcons()
{
  try {
        // The following "if" is not really necessary but with it this script will work for Opera too
        if (document.location.href.indexOf ("/game/index.php?page=galaxy") == -1)
          return;

        if (! set_Fix_Action_Icons) return;

        if (DEBUG_MODE > 0) GM_log('FixActionIcons: ' + strPaginaActual);

        var isIE;
        var planetRelocationPrice = 240000;
        var now = new Date ();
        var monthDay = now.getDate ();
        var year = now.getYear ();
        if (year < 2000)
          year += 1900;
        if ((year == 2010) && (now.getMonth () == 11) && (monthDay >= 20) && (monthDay <= 22))
          planetRelocationPrice = 160000;
        else if ((year == 2011) && (now.getMonth () == 7) && (monthDay >= 25) && (monthDay <= 26))
          planetRelocationPrice = 180000;
        var envelope = document.getElementById ("message_alert_box");
        if (envelope == null)
          envelope = document.getElementById ("message_alert_box_default");
        envelope.style.position = "absolute";
        envelope.style.left = "2px";
        envelope.style.top = "-60px";
        var element = document.getElementById ("inhalt");
        element.appendChild (envelope);
        envelope = document.getElementById ("attack_alert");
        envelope.style.position = "absolute";
        envelope.style.left = "600px";
        envelope.style.top = "0px";
        element.appendChild (envelope);
        var $;
        try
        {
          $ = unsafeWindow.$;
        }
        catch (e)
        {
          $ = window.$;
        }
        $ ("#galaxyContent").ajaxSuccess (function (e, xhr, settings)
        {
          if (settings.url.indexOf ("page=galaxyContent") < 0)
            return;
          if (document.getElementById ("fleetstatus") == null)
            return;

          if (parseInt (document.getElementById ("resources_darkmatter").textContent.replace (/\D+/g, "")) < planetRelocationPrice)
          {
            var myAs = document.getElementsByClassName ("planetMoveIcons");
            for (var i = 0; i < myAs.length; i++)
            {
              var theA = myAs [i];
              if (theA.className.indexOf ("planetMoveDefault") >= 0)
              {
                theA.removeAttribute ("onclick");
                theA.title = "|" + document.getElementById ("darkmatter_box").title.split (/:/) [0] + " < " + addDots (planetRelocationPrice);
                theA.className = "planetMoveIcons planetMoveInactive tipsStandard";
                theA.href = document.location.href.replace ("galaxy", "premium") + "&openDetail=1";
              }
            }
          }
          //var allRows = document.getElementsByClassName ("row");
          var allRows = document.querySelectorAll (".row");
          var ccords, galaxy, system, planet, anchors, a0, activity, moonUls, curPlanetCoords;
          //coords = document.getElementsByClassName ("planet-koords");
          coords = document.querySelectorAll (".planet-koords");
          if (coords.length == 1)
            curPlanetCoords = coords [0].textContent;
          else
          {
            for (var i = 0; i < coords.length; i++)
              if (coords [i].parentNode.className.indexOf (" active ") != -1)
              {
                curPlanetCoords = coords [i].textContent;
                break;
              }
          }
          for (var row = 0; row < allRows.length; row++)
          {
            var tds = allRows [row].getElementsByTagName ("td");
            var isNoob = false;
            var onVacation = false;
            activity = "";
            for (var td = 0; td < tds.length; td++)
            {
              var theClass = tds [td].className;
              if ((theClass.indexOf ("noob") >= 0) || (theClass.indexOf ("strong") >= 0))
              {
                isNoob = true;
                //anchors = tds [2].getElementsByTagName ("ul") [1].getElementsByTagName ("a");
                anchors = allRows [row].querySelectorAll (".microplanet") [0].getElementsByTagName ("ul") [1].getElementsByTagName ("a");
                for (var anchor = 0; anchor < anchors.length; anchor++)
                {
                  a0 = anchors [anchor];
                  if (a0.href.indexOf ("missileattacklayer") >= 0)
                    a0.parentNode.removeChild (a0);
                }
                moonUls = tds [4].getElementsByTagName ("ul");
                if (moonUls.length > 1)
                {
                  anchors = moonUls [1].getElementsByTagName ("a");
                  for (var anchor = 0; anchor < anchors.length; anchor++)
                  {
                    a0 = anchors [anchor];
                    if (a0.href.indexOf ("missileattacklayer") >= 0)
                      a0.parentNode.removeChild (a0);
                  }
                }
              }
              if (theClass.indexOf ("vacation") >= 0)
              {
                onVacation = true;
                //var myUl = tds [2].getElementsByTagName ("ul") [1];
                var myUl = allRows [row].querySelectorAll (".microplanet") [0].getElementsByTagName ("ul") [1];
                while (myUl.childNodes.length > 0)
                  myUl.removeChild (myUl.firstChild);
                moonUls = tds [4].getElementsByTagName ("ul");
                if (moonUls.length > 1)
                {
                  myUl = moonUls [1];
                  while (myUl.childNodes.length > 0)
                    myUl.removeChild (myUl.firstChild);
                }
              }

              if (theClass.indexOf ("alaxy microplanet") >= 0)
              {
                var uls = tds [td].getElementsByTagName ("ul");
                if (uls.length > 1)
                  if (uls [1].className == "ListLinks");
                  {
                    var lis = uls [1].getElementsByTagName ("li");
                    if (lis.length > 0)
                      if (lis [0].textContent.indexOf (":") >= 0)
                        if (lis [0].getElementsByTagName ("img").length > 0)
                          activity = "*";
                        else
                          activity = lis [0].textContent.match (/\d+/) [0];
                  }
                var spans = tds [td].getElementsByTagName ("span");
                for (var span = 0; span < spans.length; span++)
                {
                  if (spans [span].getAttribute ("id") == "pos-planet")
                  {
                    coords = spans [span].innerHTML.split (/[\[:\]]/);
                    galaxy = coords [1];
                    system = coords [2];
                    planet = coords [3];
                    if ("[" + galaxy + ":" + system + ":" + planet + "]" == curPlanetCoords)
                      activity = "*";
                    break;
                  }
                  if ((activity == "") && (spans [span].className == "spacing") && (spans [span].parentNode.tagName.toLowerCase () != "h4"))
                  {
                    if (spans [span].parentNode.childNodes.length > 2)
                      activity = "*";
                    else
                    {
                      activity = spans [span].nextSibling.textContent;
                      if (activity.length > 1)
                        activity = activity.match (/\d+/) [0];
                      else
                        activity = "";
                    }
                  }
                }
              }
              else if (theClass == "planetname")
              {
                if ((activity.length > 0) && (tds [td].textContent.indexOf ("(") < 0))
                {
                  var mySpan = document.createElement ("span");
                  mySpan.className = "undermark";
                  mySpan.appendChild (document.createTextNode (activity));
                  tds [td].textContent += "(";
                  tds [td].appendChild (mySpan);
                  tds [td].appendChild (document.createTextNode (")"));
                }
              }
              else if (theClass == "action")
              {
                anchors = tds [td].getElementsByTagName ("a");
                if (anchors.length <= 0)
                  continue;
                a0 = anchors [0];
                if (a0.innerHTML.length <= 0)
                  continue;
                var myA;
                if ((a0.getAttribute ("href") == "#") || (a0.getAttribute ("href") == "javascript:void(0);"))
                {
                  var onClick = a0.getAttribute ("onclick");
                  if (onClick)
                  {
                    var params = onClick.split (/\D+/);
                    var targetGalaxy = params [2];
                    var numProbes = params [6];
                    var activePlanets = document.querySelectorAll ("a.planetlink");
                    var activePlanet = activePlanets [0];
                    if (activePlanets.length > 1)
                      for (var i = 0; i < activePlanets.length; i++)
                      {
                        activePlanet = activePlanets [i];
                        if (activePlanet.className.indexOf ("active") >= 0)
                          break;
                      }
                    var coords = activePlanet.querySelector ("span.planet-koords").textContent.split (/\D+/);
                    var currentGalaxy = coords [1];
                    var galaxyDistance = Math.abs (targetGalaxy - currentGalaxy);
                    if ((galaxyDistance > 2) || ((galaxyDistance == 2) && (numProbes <= 1)))
                    {
                      a0.firstElementChild.style.display = "none";
                      a0.removeAttribute ("href");
                      a0.removeAttribute ("title");
                      a0.removeAttribute ("class");
                      a0.removeAttribute ("onclick");
                    }
                  }
                }
                if (((a0.getAttribute ("href") != "#") &&
                     (a0.getAttribute ("href") != null) &&
                     (a0.getAttribute ("href") != "javascript:void(0);") &&
                     (a0.firstElementChild != null) &&
                     (a0.firstElementChild.style.display != "none")) ||
                    (a0.href.indexOf ("page=writemessage") > -1))
                {
                  myA = document.createElement ("a");
                  if (! (isNoob || onVacation))
                  {
                    myA.href = "javascript:void(0);";
                    myA.setAttribute ("onclick", "sendShips (6, " + galaxy + ", " + system + ", " + planet + ", 1); return false;");
                    var myImg = document.createElement ("img");
                    myImg.setAttribute ("width", "16");
                    myImg.setAttribute ("height", "16");
                    myImg.setAttribute ("src", "data:image/gif;base64," +
                      "R0lGODlhEAAQAJEDAP///1x2i2+JnQAAACH5BAEAAAMALAAAAAAQABAAAAIrXI6Zpu0P4wMUyFohxs4G+h1eIAhAaVboiZor67YlvMrtRtv6zvf84EMNCgA7");
                    myA.appendChild (myImg);
                  }
                  a0.parentNode.insertBefore (myA, a0);
                }
                if (isNoob || onVacation)
                  for (var anchor = 0; anchor < anchors.length; anchor++)
                  {
                    a0 = anchors [anchor];
                    if (a0.innerHTML.length <= 0)
                      continue;
                    if (a0.href.indexOf ("missileattacklayer") >= 0)
                      a0.style.display = "none";
                    else if ((a0.getAttribute ("href") == "#") || (a0.getAttribute ("href") == "javascript:void(0);"))
                    {
                      a0.firstElementChild.style.display = "none";
                      a0.removeAttribute ("href");
                      a0.removeAttribute ("title");
                      a0.removeAttribute ("class");
                      a0.removeAttribute ("onclick");
                    }
                  }
              }
            }
          }
        });

   } catch(e) {
         if (DEBUG_MODE != 0) GM_log('FixActionIcons [ERROR]: <' + e + '> ' + strPaginaActual);
   }
}
