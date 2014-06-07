// ==UserScript==
// @name           Khanwars march mod by Viacheslav Nefedov
// @namespace      http://www.nefedov.net
// @description    Attack mod for Khanwars 3.0
// @include        http*://*utopiakingdoms.com*
// @include        http*://*khanwars.com*
// @include        http*://*guerrakhan.com*
// @include        http*://*lesseigneurs.fr*
// @include        http*://*khanwars.com.pt*
// @include        http*://*khanwars.es*
// @include        http*://*khanwars.cl*
// @include        http*://*deche.vn*
// @include        http*://*khanwars.ro*
// @include        http*://*khanwars.pl*
// @include        http*://*hansavaslari.com*
// @include        http*://*khanwars.it*
// @include        http*://*zarenkriege.de*
// @include        http*://*hanovete.com*
// @include        http*://*khanratnik.com*
// @include        http*://*draugas.lt*
// @include        http*://*khanwars.nl*
// @include        http*://*khanwars.no*
// @include        http*://*khanwars.se*
// @include        http*://*pravyteli.com*
// @include        http*://*khanwars.hu*
// @include        http*://*khanwars.ae*
// @include        http*://*khanwars.jp*
// @include        http*://*khanwars.ir*
// @include        http*://*lordwars.co.il*
// @include        http*://*pravyteli.com*
// @include        http*://*khanwars.sk*
// @version        0.1
// ==/UserScript==

if (window.location.href.indexOf('/pohod.php') < 0) return;

var Protocol = window.location.protocol + "//";
var Host = Protocol + window.location.host;

var World = /(\d+)\s*—/i.exec(document.title);
World ? World = World[1] : World = "0";
//var UserName = document.getElementById("user").value;
var UserName = document.getElementsByClassName("username")[0].innerHTML;
var SavedHost = /[^.]+?\.(.+)$/i.exec(window.location.hostname);
SavedHost = (SavedHost ? SavedHost[1] : "") + "_" + World;
var SavePrefix = SavedHost + "_" + UserName;

var UKMode = (Host.indexOf("utopiakingdoms.com") > -1);

function Translate(s) {
	return s;
}

// Main block
var MarchesFilter = document.getElementsByClassName("marchesFilter").length;
if (MarchesFilter > 0) {
	showMarchInfo(); //corrects march table: shows resourses inline, adds link to target castle and shows 'x' instead of return text
} else {
	processSecondPage();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//      corrects march table: shows resourses inline, adds link to target castle and shows 'x' instead of return text           

function showMarchInfo() {
  var SelNodes = document.evaluate(
    "//a[contains(@href, 'javascript:alert')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  
  var Search = CleanSearch(
    CleanSearch(window.location.search, "attackx", ""), "attacky", ""
  );
  Search = CleanSearch(CleanSearch(Search, "motivated", ""), "sent", "");  
  
  var Form = document.forms.namedItem("form1").elements;
  var Target = Form.namedItem("attackx").value + ":" +
    Form.namedItem("attacky").value;  

  for (var N = 0; N < SelNodes.snapshotLength; N++) {
    StrClean = SelNodes.snapshotItem(N).getAttribute("href");

	var LinkNode = SelNodes.snapshotItem(N).
        parentNode.previousElementSibling;
		
	var OriginalLink = LinkNode.firstElementChild;
	var ClassName = OriginalLink.className;
	LinkNode.firstElementChild.className = '';
	
	var Match = /(\d+)[\s:,;](\d+)/i.exec(LinkNode.innerHTML);
    if (Search == "?") Search = "";
	
    LinkNode.innerHTML =
        "<span class='" + ClassName + "'><a href='" + Host + "/pohod.php?attackx=" +
        Match[1] + "&attacky=" + Match[2] +
        (Search ? "&" + Search.slice(1) : "") + "'>&clubs;</a>" +
        " <a href='" + Host + "/map.php?setx=" +
        Match[1] + "&sety=" + Match[2] + "'>&rarr;</a>" +
        LinkNode.innerHTML +
        (
          new RegExp(Target, "i").test(LinkNode.innerHTML)
            ? "*"
            : ""
        ) + "</span>";

    SelNodes.snapshotItem(N).innerHTML = "<small>" +
		StrClean.replace(/[^\.,\\\d]+/gi,'').replace(/\\/gi,'/').replace(/,\d+/gi,'k') +
		"</small>";
			
	var ReturnLink = LinkNode.nextElementSibling.nextElementSibling.
						nextElementSibling.nextElementSibling.getElementsByTagName('a')[0];
	if (ReturnLink) ReturnLink.innerHTML = 'x';
  } 
	
	if (LinkNode) {
		var ReturnHead = LinkNode.parentNode.parentNode.
				parentNode.firstElementChild.firstElementChild.lastElementChild;
		ReturnHead.innerHTML = 'x';
	}
}

function CleanSearch(Search, Remove, Add) {
  var PatRemove = new RegExp("(\\?|&)" + Remove + "=[^&]+", "i");
  var NewSearch = Search.replace(PatRemove, "");
  if (NewSearch) NewSearch = "?" + NewSearch.slice(1);
  if (NewSearch != "?" && NewSearch != "" && Add) NewSearch += "&";
  NewSearch += (NewSearch == "" ? "?" : "") + Add;
  return NewSearch;
}

///////////////////////
// Donor

// parse arbitrary page, use in callback
function GetDoc(URL, Callback) {
  var Rest = [];
  for (var N = 2; N < arguments.length; N++) {
    Rest.push(arguments[N]);
  }
  GM_xmlhttpRequest({
    method: "GET",
    url: URL,
    onload: function (responseDetails) {
      var Doc = document.implementation.createDocument("", "", null),
          HTML = document.createElement("html"),
          Head = document.createElement("head"),
          Body = document.createElement("body");
      Head.innerHTML = /<\s*head[^>]*>((?:.|\s)+?)<\s*\/head\s*>/mi.
        exec(responseDetails.responseText)[1];
      Body.innerHTML = /<\s*body[^>]*>((?:.|\s)+?)<\s*\/body\s*>/mi.
        exec(responseDetails.responseText)[1];
      Doc.appendChild(HTML);
      HTML.appendChild(Head);
      HTML.appendChild(Body);
      eval("Callback(Doc" + (Rest.length ? "," : "") + Rest.join(",") + ");");
    }
  });
}

// convert form name to unit ID ("uxx")
function FormToID(FormName) {
  var ID = /units\[(\d+)\]/i.exec(FormName);
  return (ID ? "u" + ID[1] : "");
}

/******************************************************************************/
// redir coords on success

var PageMatch = new RegExp(Host + "/pohod\\.php?.*sent=1", "i").
  test(window.location);
if (PageMatch && window.name) {
  var X = GM_getValue(window.name + "X");
  var Y = GM_getValue(window.name + "Y");
  var Form = document.forms.namedItem("form1");
  Form.elements.namedItem("attackx").value = X;
  Form.elements.namedItem("attacky").value = Y;
  Form.action = "pohod.php?attackx=" + X + "&attacky=" + Y;
  GM_deleteValue(window.name); GM_deleteValue(window.name + "Formation");
  GM_deleteValue(window.name + "FormationNum");
  GM_deleteValue(window.name + "X"); GM_deleteValue(window.name + "Y");
  window.name = "";
}

/******************************************************************************/
// march page 1
// display march cargo inline; link coords directly to reattack; display
// city name instead of coords; fix paging search params
// encumbrance/speed/etc on march page

function QuickGo(Event) {
  function SelectMarchType(Value) {
    var Found = false;
    for (var N = 0; N < MarchType.options.length; N++) {
      if (MarchType.options[N].value == Value) {
        Found = true;
        MarchType.selectedIndex = N;
      }
    }
    if (! Found) {
      alert(Translate("Could not find that march type."));
      return false;
    } else {
      return true;
    }
  }
  if (! window.name) {
    window.name = "QuickGo" + new Date().getTime();
  }
  var SubmitButton = document.evaluate(
    "//input[@type='submit']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  document.forms.namedItem("form1").
    removeEventListener("submit", RetainManualFormation, true);
  var MarchType = document.evaluate(
    "//form[@name='form1']/descendant::*[@id='type']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var PatNum = /^(.+)(\d+)$/i;
  var ID = PatNum.exec(Event.target.getAttribute("id").slice(3));
  GM_setValue(window.name, Number(ID[2]));
  var Formation = document.getElementById("GM_Formation");
  var FormationNum = Formation.options[Formation.selectedIndex].value;
  Formation = Formation.options[Formation.selectedIndex].innerHTML;
  var Form = document.forms.namedItem("form1").elements;
  GM_setValue(window.name + "Formation", Formation);
  GM_setValue(window.name + "FormationNum", FormationNum);
  GM_setValue(
    window.name + "X", Form.namedItem("attackx").value
  );
  GM_setValue(
    window.name + "Y", Form.namedItem("attacky").value
  );
  var Success;
  switch (ID[1]) {
    case "QAtt":
    case "Attack": Success = SelectMarchType("3"); break;
    case "QScav":
    case "Scavenge": Success = SelectMarchType("5"); break;
    case "QTransfer":
    case "Transfer": Success = SelectMarchType("8"); break;
    case "Spy":
      var QWNode = document.forms.namedItem("form1").elements.
        namedItem(UKMode ? "u9": "units[9]");
      var Temp = Number(QWNode.value);
      SetAll(false); QWNode.value = String(Math.max(Temp, 1));
      Success = SelectMarchType("7");
      break;
    case "QSupport":
    case "Support": Success = SelectMarchType("2"); break;
	case "Patrol": 
		if (Number(document.getElementById("sum_cargo").innerHTML.replace(',','')) == 0) {
			SetAll(true);
		}
		Success = SelectMarchType("4"); 
		break;
  }
  if (Success) SubmitButton.click();
}

// update march info on change
function UpdateMarchNums(Event) {
  return; //Ned - commented
  Target = [
    document.evaluate(
      "//input[@name='attackx']", document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.value,
    document.evaluate(
      "//input[@name='attacky']", document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null
    ).singleNodeValue.value
  ];
  var MapData = GM_getValue(
    SavedHost + "_MapData_" + String(Target[0]) + "_" + String(Target[1]),
    ""
  );
  var CastleName = "";
  MapData ? CastleName = eval(MapData)[4] || "" : CastleName = "";
  document.getElementById("GM_CastleLabel").innerHTML =
    " <a href='" + Host + "/map.php?setx=" +
        Target[0] + "&sety=" + Target[1] + "'>&rarr;</a> " + CastleName;

  var Pop = NonMysticPop = Encumbrance = Speed = Damage = Mystic =
    DamageBonus = Temp = 0;
  var Form = document.forms.namedItem("form1");
  Form.action = "pohod.php?attackx=" + Target[0] + "&attacky=" + Target[1];
  for (var N = 0; N < Form.elements.length; N++) {
    DamageBonus = 0;
    if (UKMode) {
      var UnitID = Form[N].name;
    } else {
      var UnitID = FormToID(Form[N].name);
    }
    if (UnitID in Units) {
      var Marched = Number(Form[N].value);
      if (UnitID in ArcherList) {
        DamageBonus += ArcherLevels[ArcherLevel];
      }
      if (UnitID in MysticList) {
        DamageBonus += MysticLevels[MysticLevel];
      }
      if (UnitID in UnitUpgrades) {
        DamageBonus +=
          UnitUpgrades[UnitID][0] * UnitUpgrades[UnitID][1];
      }
      Temp = Math.floor(
        Marched * (1 + DamageBonus / 100) *
        Units[UnitID]["building"] * Units[UnitID]["wallcrasher"]
      );
      Damage += Temp;
      if (UnitID in MysticList) Mystic += Temp;
      Encumbrance += Marched * Units[UnitID]["carry"];
      Pop += Marched * Units[UnitID]["pop"];
      NonMysticPop += Marched * Units[UnitID]["pop"] * ! (UnitID in MysticList);
      if (Marched > 0) {
        Speed = Math.max(
          Speed,
          Math.round(
            Units[UnitID]["speed"] / (1 + ScoutLevels[ScoutLevel] / 100)
          )
        );
      }
    }
  }
  var Node = document.getElementById("pop_span");
  Node.innerHTML = String(Pop);
  //Node = document.getElementById("GM_Non-Mystics");
  //Node.innerHTML = String(NonMysticPop);
  Node = document.getElementById("GM_Encumbrance");
  Node.innerHTML = String(Encumbrance);
  Node = document.getElementById("GM_Speed");
  if (Speed) {
    Node.innerHTML = MarchTime(Dist(Target), Speed, "&nbsp;", false, false, true);
  } else {
    Node.innerHTML = MarchTime(0, Speed, "&nbsp;", false, false, false);
  }
  Node = document.getElementById("GM_Damage");
  Node.innerHTML = String(Damage);
  Node = document.getElementById("GM_Mystics");
  Node.innerHTML = String(Mystic);
  Node = document.getElementById("GM_Castles");
  Node.innerHTML = CalcCastleDists(Target)[0];
}

function HandleTransfer(Event) {
  var Type = Event.target.id.slice(3);
  var SubmitButton = document.evaluate(
    "//input[@type='submit']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  switch (Type) {
    case ("CastleSelect"):
      var CanTransfer = document.evaluate(
        "//form[@name='form1']/descendant::*[@id='type']/option[@value='8']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      if (CanTransfer) CanTransfer.selected = true;
      var Match = /(\d+):(\d+)/i.exec(
        Event.target.options[Event.target.selectedIndex].value
      );
      var Node = document.evaluate(
        "//input[@name='attackx']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      Node.focus(); Node.value = Match[1]; Node.blur();
      Node = document.evaluate(
        "//input[@name='attacky']", document, null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null
      ).singleNodeValue;
      Node.focus(); Node.value = Match[2]; Node.blur();
      break;
  }
  document.getElementById("GM_CastleSelect").selectedIndex = 0;
}

function CreateCancelTimer(Event) {
  var CancelMarchIntervals = {};

  // update cancel timers for activated marches
  function UpdateCancelTime(ID, OneWay, Arrives) {
    Arrives = Arrives.getHours() * 3600 + Arrives.getMinutes() * 60 +
      Arrives.getSeconds();
    var Now = document.getElementById("theClock").innerHTML;
    if (Now) {
      Now = Now.split(":");
      Now = Number(Now[0]) * 3600 + Number(Now[1]) * 60 + Number(Now[2]);
      if (Arrives < Now) Arrives += 86400;
    } else {
      Now = NaN;
    }
    var DeltaTime = (Arrives - Now) % 86400;
    var CancelTime = Number((DeltaTime > 0) * (OneWay - DeltaTime));
    var TimeLeft = Number((DeltaTime > 0) * DeltaTime);
    if (DeltaTime > 0 && DeltaTime < 36000) {
      document.getElementById(ID).innerHTML = HMS(CancelTime) + "<br />" +
        HMS(TimeLeft);
    } else {
      document.getElementById(ID).innerHTML = "--<br />--";
      window.clearInterval(CancelMarchIntervals[ID]);
      delete CancelMarchIntervals[ID];
    }
  }

  var Node = document.evaluate(
    "ancestor::td[1]/preceding-sibling::td[1]/descendant::a",
    Event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  var ID = /posted_id=(\d+)/i.exec(Node.href)[1];

  function UpdateCancelTimeCallback(Doc) {
    var NewNode = document.getElementById("GM_March" + ID);
    if (! NewNode) {
      var Nodes = Doc.evaluate(
            "//ns:div[@class='textformbox'][1]/ns:div[@class='row']" +
              "[position()=4 or position()=5]/ns:div[2]",
            Doc, nsResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
          ),
          Arrives = LocalTime(Nodes.snapshotItem(0).innerHTML),
          Returns = LocalTime(Nodes.snapshotItem(1).innerHTML);
      NewNode = document.createElement("div");
      NewNode.id = "GM_March" + ID; NewNode.innerHTML = "";
      NewNode.setAttribute("style", "font-size: 80%;");
      Event.target.parentNode.appendChild(NewNode);
      var OneWay = (Returns.getTime() - Arrives.getTime()) / 1000;
      UpdateCancelTime("GM_March" + ID, OneWay, Arrives);
      var IntervalID = window.setInterval(
        UpdateCancelTime, 1000, "GM_March" + ID, OneWay, Arrives
      );
      CancelMarchIntervals["GM_March" + ID] = IntervalID;
    }
  }
  GetDoc(Node.href, UpdateCancelTimeCallback);
}

var PageMatch = new RegExp(Host + "/pohod\\.php", "i").test(window.location);
var MarchesFilter = document.getElementsByClassName("marchesFilter").length;
if (PageMatch && MarchesFilter) {
  // clear any previous instructions
  if (window.name) {
    GM_deleteValue(window.name); GM_deleteValue(window.name + "Formation");
    GM_deleteValue(window.name + "FormationNum");
    GM_deleteValue(window.name + "X"); GM_deleteValue(window.name + "Y");
    window.name = "";
  }
  //window.addEventListener("keypress", PasteCoords, true);
  var TimerColumn = document.evaluate(
    "//*[@class='box'][1]/table[1]/thead[1]/tr[1]/td[2]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  if (TimerColumn) TimerColumn.setAttribute("style", "width: 7em");
  var Timers = document.evaluate(
    "//div[starts-with(@id, 'bxx')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Timers.snapshotLength; N++) {
    Timers.snapshotItem(N).setAttribute("style", "text-decoration: underline;");
    Timers.snapshotItem(N).parentNode.
      addEventListener("click", CreateCancelTimer, true);
  }
  
  // collect castle coordinate information
  var Castles = document.evaluate(
    "//select[@name='filter']/option", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  if (Castles.snapshotLength) {
    var PatCastle = /(.+)\s+?\((\d+):(\d+)\)/i;
    var CastleArray = [];
    for (var N = 0; N < Castles.snapshotLength; N++) {
      var Match = PatCastle.exec(Castles.snapshotItem(N).innerHTML);
      if (Match) {
        Match.push(Castles.snapshotItem(N).value);
        CastleArray.push(Match);
      }
    }
    GM_setValue(SavePrefix + "Castles", uneval(CastleArray));
    PlayerCastles = eval(CastleArray.toSource());
  }

  var TargetX = document.evaluate(
    "//input[@name='attackx']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.value;
  var TargetY = document.evaluate(
    "//input[@name='attacky']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.value;

  // fix paging links
  var Paging = document.evaluate(
    "//p[@class='paging']", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var SearchOrig = window.location.search;
  var Search;
  if (Paging.snapshotLength) {
    var Links = document.evaluate(
      "descendant::a", Paging.snapshotItem(0), null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
    );
    Search = CleanSearch(
      CleanSearch(
        CleanSearch(SearchOrig, "page", ""), "attackx", ""
      ),
      "attacky",
      "attackx=" + TargetX + "&attacky=" + TargetY
    );
    for (var N = 0; N < Links.snapshotLength; N++) {
      Links.snapshotItem(N).href += (Search ? "&" + Search.slice(1) : "");
    }
    Paging.snapshotItem(1).innerHTML = Paging.snapshotItem(0).innerHTML;
  }
  
  // fix sorting links
  var Sorting = document.evaluate(
    "//table/thead/tr/td/a[contains(@href, 'sort=')]", document, null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  Search = CleanSearch(
    CleanSearch(
      CleanSearch(
        CleanSearch(CleanSearch(SearchOrig, "sort", ""), "sort_type", ""),
        "filter",
        ""
      ),
      "attackx",
      ""
    ),
    "attacky",
    "attackx=" + TargetX + "&attacky=" + TargetY
  );
  for (var N = 0; N < Sorting.snapshotLength; N++) {
    Sorting.snapshotItem(N).href += (Search ? "&" + Search.slice(1) : "");
  }

  // fix filter function to retain headers
  var Node = document.evaluate(
    "//select[@name='filter']/option", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Node.parentNode.addEventListener(
    "change",
    function (Event) {
      var SearchOrig = window.location.search;
      SearchOrig = CleanSearch(
        CleanSearch(
          CleanSearch(CleanSearch(SearchOrig, "filter", ""), "page", ""),
          "attackx",
          ""
        ),
        "attacky",
        "attackx=" + TargetX + "&attacky=" + TargetY
      );
      SearchOrig =
        CleanSearch(CleanSearch(SearchOrig, "sent", ""), "motivated", "");
      window.location.href = window.location.pathname +
        SearchOrig + (SearchOrig != "" ? "&" : "?") +
        "filter=" + Event.target.options[Event.target.selectedIndex].value;
    },
    true
  );
  
  // display town name instead of coords
  var Nodes = document.evaluate(
    "//img[contains(@src,'march_back.gif') or contains(@src,'march_forward.gif')]/ancestor::tr[1]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatCoords = /(\d+):(\d+)/i;
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    var Node = Nodes.snapshotItem(N).childNodes[5];
    var Coords = PatCoords.exec(Node.innerHTML).slice(1);
    var TempName =
      eval(GM_getValue(SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1], ""))
        ||
      "";
    if (TempName) TempName = TempName[4];
    if (TempName) {
      Node.innerHTML = Node.innerHTML.replace(
        new RegExp("\\s*" + Coords[0] + ":" + Coords[1] + "\\s*", "i"),
        "<span style='font-size: 80%' title='" + Coords[0] +
          ":" + Coords[1] + "'>" + TempName + "</span>"
      );
    }
    Node = Nodes.snapshotItem(N).childNodes[7];
    Coords = PatCoords.exec(Node.innerHTML).slice(1);
    TempName =
      eval(GM_getValue(SavedHost + "_MapData_" + Coords[0] + "_" + Coords[1], ""))
        ||
      "";
    if (TempName) TempName = TempName[4];
    if (TempName) {
      Node.innerHTML = Node.innerHTML.replace(
        new RegExp("\\s*" + Coords[0] + ":" + Coords[1] + "\\s*", "i"),
        "<span style='font-size: 80%' title='" + Coords[0] + ":" + Coords[1] +
          "'>" + TempName + "</span>"
      );
    }
  }
  var Form = document.forms.namedItem("form1");

  // find number of troops available in particular form
  function FindNum(Form) {
    return /<strong>(\d+)<\/strong>/i.exec(
      Form.parentNode.previousSibling.previousSibling.innerHTML.replace(/,/g,'')
    )[1];
  }

  // update single unit
  function SetupMax(Event) {
    var Match = /GM_Unit_(.*?)_(\d+)/i.exec(Event.target.getAttribute("class"));
    var ID = Match[1]; var Value = Match[2];
    SetMaximum(ID, Value);
  }
  function SetMaximum(ID, Value) {
    var Form = document.forms.namedItem("form1");
    var Item = Form.elements.
      namedItem(UKMode ? ID : "units[" + ID.slice(1) + "]");
    Item.focus();
    Item.value = Value;
    Item.blur();
  }

  // update all units on/off
  function SetupSetAll(Event) {
    if (Event.target.id == "GM_All") {
      SetAll(true);
    } else {
      SetAll(false);
    }
  }
  function SetAll(On) {
    var Form = document.forms.namedItem("form1"), UnitID;
    for (var N = 0; N < Form.elements.length; N++) {
      UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
      if (/^u\d+$/i.test(UnitID)) {
        if (On) {
          SetMaximum(UnitID, FindNum(Form[N]));
        } else {
          SetMaximum(UnitID, "0");
        }
      }
    }
  }

  // single infantry
  function SingleInfantry() {
    var Form = document.forms.namedItem("form1"), UnitID;
    for (var N = 0; N < Form.elements.length; N++) {
      UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
      if (/^u(1|2|3|4)$/i.test(UnitID)) {
        var Available = Number(FindNum(Form[N]));
        SetMaximum(UnitID, Available ? "1" : "0");
      }
    }
  }

  // +/- 1
  function ChangeOne(Event) {
    var Delta;
    Event.target.innerHTML.slice(0, 1) == "+" ? Delta = 1 : Delta = -1;
    var ActualTarget = Event.target.parentNode.parentNode.previousSibling;
    ActualTarget.focus();
    ActualTarget.value = String(Number(ActualTarget.value) + Delta);
    ActualTarget.blur();
  }

  // paste copied army
  function PasteArmyMarch(Event) {
    var ArmyArray = eval(GM_getValue(SavePrefix + "_CopyArmy", ""));
    if (ArmyArray) {
      var Form = document.forms.namedItem("form1").elements;
      var NotEnough = false, UnitID, ArmyCount;
      for (var N = 1; N < ArmyArray.length; N++) {
        UKMode ? UnitID = "u" + String(N) : UnitID = "units[" + String(N) + "]";
        ArmyCount = ArmyArray[N] || 0;
        var TextBox = Form.namedItem(UnitID);
        if (TextBox) {
          var Available = Number(FindNum(TextBox));
          if (Available < ArmyCount) NotEnough = true;
          TextBox.value = String(Math.min(ArmyCount, Available));
        } else if (ArmyCount) {
          NotEnough = true;
        }
      }
      if (NotEnough)
        alert(Translate("Warning: not enough troops to paste all."));
    }
  }

  // invert army selection
  function PasteArmyInvert(Event) {
    var UnitID;
    for (var N = 0; N < Form.elements.length; N++) {
      UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
      if (UnitID in Units) {
        var Available = Number(FindNum(Form[N]));
        var Used = Number(Form[N].value);
        if (Used > 0) Form[N].value = String(Available - Used);
      }
    }
  }
  
  // move some forms around
  var InsertionPoint, Node;
  var AllNone = document.evaluate(
    "//div[@class='formbox']/div[position()=1]",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  AllNone.innerHTML = "<div class='right'>" +
    "<a href='javascript:void(0)' id='GM_All'>" + Translate("All") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_None'>" + Translate("None") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_Infantry'>" + Translate("Single Infantry") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_Paste'>" + Translate("Paste") + "</a> / " +
    "<a href='javascript:void(0)' id='GM_Invert'>" + Translate("Invert") + "</a>";
  document.getElementById("GM_All").
    addEventListener("click", SetupSetAll, true)
  document.getElementById("GM_None").
    addEventListener("click", SetupSetAll, true)
  document.getElementById("GM_Infantry").
    addEventListener("click", SingleInfantry, true)
  document.getElementById("GM_Paste").
    addEventListener("click", PasteArmyMarch, true)
  document.getElementById("GM_Invert").
    addEventListener("click", PasteArmyInvert, true)

  var MarchType = document.evaluate(
    "//form[@name='form1']/descendant::*[@id='type']",
    document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue.parentNode.parentNode;
  var Submit = MarchType.nextSibling.nextSibling;
  
  function RetainManualFormation(Event) {
    window.name = "QuickGo" + new Date().getTime();
    var Formation = document.getElementById("GM_Formation");
    var FormationNum = Formation.options[Formation.selectedIndex].value;
    Formation = Formation.options[Formation.selectedIndex].innerHTML;
    GM_setValue(window.name, -1);
    GM_setValue(window.name + "Formation", Formation);
    GM_setValue(window.name + "FormationNum", FormationNum);
    GM_setValue(window.name + "X", TargetX);
    GM_setValue(window.name + "Y", TargetY);
    Form.removeEventListener("submit", RetainManualFormation, true);
  }
  Form.addEventListener("submit", RetainManualFormation, true);
 
  [
    ["Attack", "3"], ["Spy", "7"], ["Transfer", "8"], ["Support", "2"],
    ["Scavenge", "5"], ["Patrol", "4"]
  ].forEach(
    function (Option) {
      var NewNode = document.createElement("input");
      var Exists = document.evaluate(
        "//form[@name='form1']/descendant::*[@id='type']/option[@value='" +
          Option[1] + "']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null 
      ).singleNodeValue;
      if (Exists) {
        NewNode.value = Exists.innerHTML
        NewNode.type = "button";
        NewNode.id = "GM_" + Option[0] + "0";
        NewNode.addEventListener("click", QuickGo, true);
        Submit.appendChild(document.createElement("br"));
        Submit.appendChild(NewNode);
      }
    }
  );
  
  var Table = document.getElementById("units_to_send");
  Table.parentNode.setAttribute("style", "margin: 0; padding: 0;");
  var NewTable = document.createElement("table");
  NewTable.setAttribute("width", "100%");
  NewTable.innerHTML = "<tr><td valign='top' id='GM_Tab1'></td>" +
    "<td valign='top' align='right' width='225px'>" +
    "<span id='GM_Tab2'></span></td></tr>";
  Table.parentNode.insertBefore(NewTable, Table);

  var Formations = GM_getValue(SavePrefix + "Formations", "");
  Formations ? Formations = eval(Formations) : Formations = [[Translate("Default"), "0"]];
  var FormationNode = document.createElement("div");
  var TempText = "";
  Formations.forEach(
    function (Option) {
      TempText += "<option value='" + Option[1] + "'>" +
        Option[0] + "</option>";
    }
  );
  
  FormationNode.innerHTML = Translate("Formation") +
    ":<br /><select id='GM_Formation'>" + TempText + "</select>";

  InsertionPoint = document.getElementById("GM_Tab1");
  InsertionPoint.appendChild(AllNone);
  InsertionPoint.appendChild(Table);
  InsertionPoint = document.getElementById("GM_Tab2");
  InsertionPoint.appendChild(MarchType);
  MarchType.parentNode.insertBefore(FormationNode, MarchType.nextSibling);

  var FormationNode = document.getElementById("GM_Formation");
  FormationNode.style.color = "red";
  FormationNode.style.textDecoration = "blink";
  var SelNodes = FormationNode.options;
  var Found = false;
  var DefaultAttack = '';
  for (var N = 0; N < SelNodes.length; N++) {
    if (SelNodes[N].innerHTML == DefaultAttack) {
      SelNodes[N].selected = true; Found = true; break;
    }
  }
  /*
  if (! Found && DefaultAttack)
    alert(Translate("Default attack formation not found."));*/
  InsertionPoint.appendChild(Submit);
  var PopNode = document.getElementById("pop_span");
  //PopNode.innerHTML = String(Pop);
  PopNode = PopNode.parentNode.parentNode;
  InsertionPoint.appendChild(PopNode);
  /*
  if (! UKMode) {
    CargoNode = document.getElementById("sum_cargo");
    CargoNode.parentNode.parentNode.parentNode.removeChild(CargoNode.parentNode.parentNode);
  }
  */

  [
    "Speed", "Damage", "Mystics", "Encumbrance", "Non-Mystics", "Castles"
  ].forEach(
    function (Option) {
      var NewNode = document.createElement("div");
      NewNode.setAttribute("class", "row");
      NewNode.innerHTML = "<div class='left'><label" +
        (Option == "Speed" ? " id='GM_SpeedLabel'" : "") +
        ">" + Translate(Option) + ":</label></div>" +
        (Option == "Speed"
          ? "<table style='text-align: right'>" +
            "<tr><td style='margin: 0; padding: 0;'>"
          : "") +
        "<div " + (Option == "Speed" ? "style='font-size: 75%;'" : "") +
        "class=\"right\" id=\"GM_" + Option + "\"></div>" +
        (Option == "Speed"
          ? "</td><td style='margin: 0; padding: 0; font-size: 75%;' " +
            "id='GM_QuickControls'></td></tr></table>"
          : "");
      if (Option != "Castles") {
        PopNode.parentNode.insertBefore(NewNode, PopNode.parentNode.lastChild);
      } else {
        NewNode.innerHTML = "<div style='margin: 5px; padding: 5px'>" +
          NewNode.innerHTML + "</div>";
        NewTable.parentNode.appendChild(NewNode);
      }
    }
  );
   
  var QuickNode = document.createElement("div");
  QuickNode.setAttribute("class", "row");
  QuickNode.innerHTML = "<label>" + Translate("Quick Roads") +
    ": </label><input id='" +
    "GM_QuickRoads' type='checkbox' />";
  InsertionPoint = document.getElementById("GM_SpeedLabel");
  InsertionPoint.parentNode.
    insertBefore(QuickNode, InsertionPoint);
  document.getElementById("GM_QuickRoads").
    addEventListener("change", UpdateMarchNums, true);

  Node = document.evaluate(
    "//input[@name='attackx']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Node.type = "text"; Node.size = 4;
  Node.addEventListener("blur", UpdateMarchNums, true);
  Node.addEventListener(
    "change",
    function () {document.getElementById("GM_QuickRoads").checked = false;},
    "true"
  );
  Form.action = "pohod.php?attackx=" + Node.value;
  Node = document.evaluate(
    "//input[@name='attacky']", document, null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  Node.type = "text"; Node.size = 4;
  Node.addEventListener("blur", UpdateMarchNums, true);
  Form.action += "&attacky=" + Node.value;
 
  var CastleSelection = document.createElement("select");
  CastleSelection.innerHTML += "<option value=''></option>";
  for (var N = 0; N < PlayerCastles.length; N++) {
    CastleSelection.innerHTML += "<option value='" + PlayerCastles[N][2] + ":" +
      PlayerCastles[N][3] + "'>" + PlayerCastles[N][0] + "</option>";
  }
 
  CastleSelection.id = "GM_CastleSelect";
  CastleSelection.addEventListener("change", HandleTransfer, true);
  Node.parentNode.insertBefore(CastleSelection, Node.nextSibling);
  var CastleLabel = document.createElement("span");
  CastleLabel.id = "GM_CastleLabel";
  CastleLabel.style.color = "white";
  Node.parentNode.insertBefore(CastleLabel, CastleSelection.nextSibling);
  UpdateMarchNums();
  window.setInterval(UpdateMarchNums, 1000);
  
  var SpeedBRs = document.evaluate(
    "descendant::br", document.getElementById("GM_Speed"), null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatFirst = /\(\d+-\d+\)$/i;
  for (var N = 0; N < SpeedBRs.snapshotLength; N++) {
    if (PatFirst.test(SpeedBRs.snapshotItem(N).previousSibling.textContent)) {
      [
        ["QAtt", "A"], ["QScav", "S"], ["QTransfer", "T"]
      ].forEach(
        function (Option) {
          var Transfers = document.evaluate(
            "//form[@name='form1']/descendant::*[@id='type']/option[@value='8']",
            document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null 
          ).singleNodeValue;
          if (Option[1] != "T" || Transfers) {
            var Key = document.createElement("span");
            Key.innerHTML = "&nbsp;<a href='javascript:void(0);' id='GM_" +
              Option[0] + String(N) + ">" + Translate(Option[1]) + "</a>";
            Key.addEventListener("click", QuickGo, true);
            document.getElementById("GM_QuickControls").appendChild(Key);
          }
        }
      );
    }
    document.getElementById("GM_QuickControls").
      appendChild(document.createElement("br"));
  }
   
/* 
  var UnitID;
  for (var N = 0; N < Form.elements.length; N++) {
    UKMode ? UnitID = Form[N].name : UnitID = FormToID(Form[N].name);
    if (UnitID in Units) {
      // tweak handler to update encumbrance and speed as well as pop
      Form[N].addEventListener("blur", UpdateMarchNums, true);
      // additional % links
      var Num = FindNum(Form[N]);
      var NewLinks = document.createElement("span");
      NewLinks.innerHTML =
        " <span style='font-size: 75%'>" +
        "<a href='javascript:void(0);' class='GM_Unit_ChangeOne'>-1</a>" +
        " <a href='javascript:void(0);' class='GM_Unit_ChangeOne'>+1</a>" +
        " <a class='GM_Unit_" + UnitID + "_0' href='javascript:void(0);'" +
        ">0%</a>" +
        " <a class='GM_Unit_" + UnitID + "_" + String(Math.floor(Num / 3)) +
        "' href='javascript:void(0);'>33%</a>" +
        " <a class='GM_Unit_" + UnitID + "_" + String(Math.floor(Num / 2)) +
        "' href='javascript:void(0);'>50%</a>" +
        " <a class='GM_Unit_" + UnitID + "_" + String(Num) +
        "' href='javascript:void(0);'>100%</a>";
      var CurrSib = Form[N].nextSibling;
      // remove existing text nodes--too hard to find insertion point
      while (CurrSib != null) {
        Form[N].parentNode.removeChild(CurrSib);
        CurrSib = Form[N].nextSibling;
      }
      Form[N].parentNode.insertBefore(NewLinks, Form[N].nextSibling);
    }
  }
  */
  
  var Nodes = document.evaluate(
    "//a[starts-with(@class, 'GM_Unit_')]",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    var Node = Nodes.snapshotItem(N);
    if (Node.getAttribute("class") == "GM_Unit_ChangeOne") {
      Node.addEventListener("click", ChangeOne, true);
    } else {
      Node.addEventListener("click", SetupMax, true);
    }
  }
}

/******************************************************************************/
// march page 2--default attack formation, moving oft-used controls to top

function InitMarchUpdate2(Event) {
  function CalcMarch2Time(Event) {
    OneWay = document.getElementById(UKMode ? "z" : "timeDirection").innerHTML;
    if (OneWay == "-") {OneWay = 0;} else {OneWay = ToSeconds(OneWay);}

    var NameNode = document.getElementById("GM_CastleName");
    var NewNode = document.getElementById("GM_Timing");
    var ServerArriveNode = document.getElementById("GM_ServerArrive");
    var ServerTime = document.getElementById("theClock").innerHTML;
    if (ServerTime == "") ServerTime = "00:00:00";
    var TargetDistance = Dist(
      [
        document.getElementById(UKMode ? "att_x" : "targetX").value,
        document.getElementById(UKMode ? "att_y" : "targetY").value
      ],
      [Home[0], Home[1]],
      true
    );  
    var BaseSpeed = OrigOneWay / 60 / TargetDistance / SpeedMod;
    var EffSpeed = StripDecimals(Round(OneWay / 60 / TargetDistance, 0.01), 2);
    var SpeedNode = document.getElementById("pohodCargo").
      parentNode.previousSibling.previousSibling.getElementsByTagName("div")[1];
    SpeedNode.innerHTML = SpeedNode.innerHTML.split(" ")[0] + " (" +
      Translate("Effective Speed") + " " + EffSpeed + ")";
    var LocalArrive = new Date();
    LocalArrive.setSeconds(LocalArrive.getSeconds() + OneWay);
    var LocalReturn = new Date();
    LocalReturn.setSeconds(LocalReturn.getSeconds() + 2 * OneWay);
    ServerArriveNode.innerHTML = Translate("Server Arrival") + ": " +
      HMS((ToSeconds(ServerTime) + OneWay) % 86400) + "<br />" +
      Translate("Server Return") + ": " +
      HMS((ToSeconds(ServerTime) + 2 * OneWay) % 86400) + "<br />" +
      Translate("Local Arrival") + ": " +
      DateFormat(LocalArrive) + "<br />" + Translate("Local Return") + ": " +
      DateFormat(LocalReturn);
    var Speed = SpeedNode.innerHTML.split(" ")[0];
    var Now = new Date();
    NewNode.innerHTML = "<div class='left'>" + Translate("Timing (no coins)") +
      ":</div><div class='right'>" +
      MarchTime(TargetDistance, BaseSpeed, null, null, true, false, Speed) + "</div>";
    GetCastleName(
      [
        0, document.getElementById(UKMode ? "att_x" : "targetX").value,
        document.getElementById(UKMode ? "att_y" : "targetY").value
      ],
      "GM_CastleName"
    );
  }

  var OrigOneWay, SpeedFrac, SpeedMotivation, SpeedMod;
  var TempNode = document.getElementById("motiv" + (! UKMode ? "_speed" : ""));
  if (TempNode) TempNode.addEventListener("change", CalcMarch2Time, true);
  document.getElementById(UKMode ? "ppp" : "speed").
    addEventListener("change", CalcMarch2Time, true);

  if (Event) {
    OrigOneWay =
      document.getElementById(UKMode ? "z" : "timeDirection").innerHTML;
    if (OrigOneWay == "-") {
      OrigOneWay = 0;
    } else {
      OrigOneWay = ToSeconds(OrigOneWay);
    }
    SpeedFrac =
      document.getElementById(UKMode ? "ppp" : "speed").selectedIndex / 10;
    document.getElementById(UKMode ? "ppp" : "speed").
      addEventListener("change", CalcMarch2Time, true);
    SpeedMotivation = document.getElementById("motiv" + (! UKMode ? "_speed" : ""));
    if (SpeedMotivation)
      SpeedMotivation.addEventListener("change", CalcMarch2Time, true);
    SpeedMotivation
      ? SpeedMotivation =
          1 - Number(SpeedMotivation.options[SpeedMotivation.selectedIndex].value) /
            100
      : SpeedMotivation = 1;
  } else {
    OneWay = 0; SpeedFrac = 0; SpeedMotivation = 1; 
  }
  SpeedMod = (1 + SpeedFrac) * SpeedMotivation;
  if (March2IntervalID) window.clearInterval(March2IntervalID);
  CalcMarch2Time();
  March2IntervalID = window.setInterval(CalcMarch2Time, 1000);
}

function processSecondPage() {
  var Options = document.getElementById("army_orders").options;
  var Formations = [];
  for (var N = 0; N < Options.length; N++) {
    Formations.push([Options[N].innerHTML, Options[N].value]);
  }
  GM_setValue(SavePrefix + "Formations", uneval(Formations));

  var DefaultSpeed = -1;
  var DefaultFormation = "", DefaultFormationNum = "0";
  if (window.name) {
    DefaultSpeed = GM_getValue(window.name, -1);
    DefaultFormation = GM_getValue(window.name + "Formation");
    DefaultFormationNum = GM_getValue(window.name + "FormationNum");
  }
  var SelNodes = document.evaluate(
    "//select[@id='army_orders']/option",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Found = false;
  for (var N = 0; N < SelNodes.snapshotLength; N++) {
    if (SelNodes.snapshotItem(N).innerHTML == DefaultFormation) {
      SelNodes.snapshotItem(N).selected = true; Found = true; break;
    }
  }
  var Options = document.getElementById(UKMode ? "ppp" : "speed").options;
  var ButtonNode = document.evaluate(
    "//div[@class='buttonrow']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  ButtonNode = ButtonNode.snapshotItem(1);
  /*
  Formation.style.color = "red";
  Formation.style.textDecoration = "blink";
  */
  var Node = document.getElementById(UKMode ? "z" : "timeDirection"),
      NewNode, NameNode, ServerArriveNode;

  var March2IntervalID;
  Node.addEventListener("DOMNodeInserted", InitMarchUpdate2, true);
  document.getElementById(UKMode ? "att_x" : "targetX").
    addEventListener("keypress", InitMarchUpdate2, true);
  document.getElementById(UKMode ? "att_y" : "targetY").
    addEventListener("keypress", InitMarchUpdate2, true);
  NewNode = document.createElement("div");
  NewNode.setAttribute("id", "GM_Timing");
  NewNode.setAttribute("class", "row");

  Node.parentNode.parentNode.parentNode.
    insertBefore(NewNode, Node.parentNode.parentNode.nextSibling);
  NameNode = document.createElement("span");
  NameNode.id = "GM_CastleName";
  Node = document.getElementById(UKMode ? "att_y" : "targetY").parentNode;
  Node.insertBefore(NameNode, Node.lastChild);
  ServerArriveNode = document.createElement("span");
  ServerArriveNode.id = "GM_ServerArrive";
  /*
  document.getElementById(UKMode ? "z" : "timeDirection").
    parentNode.appendChild(ServerArriveNode);
  var TempoNode = document.getElementById(UKMode ? "ppp" : "speed").
    parentNode.parentNode;
  var FormationNode =
    SelNodes.snapshotItem(0).parentNode.parentNode.parentNode;
  for (var N = 0; N < Options.length; N++) {
    Options[N].innerHTML = String(N) + " (" + String(100 - 10 * N) + "%)";
  }
  var InsertionPoint = document.getElementById(UKMode ? "ppp" : "speed").
    parentNode.parentNode.parentNode;
	alert('1');
  InsertionPoint.insertBefore(FormationNode, InsertionPoint.firstElementChild);
  alert('2');
  InsertionPoint.insertBefore(TempoNode, InsertionPoint.firstElementChild);
  alert('3'):
  InsertionPoint.insertBefore(ButtonNode, InsertionPoint.firstElementChild);
  alert('4');
*/
  if (DefaultSpeed != -1) {
    Options.selectedIndex = DefaultSpeed;
    if (! Found && window.name && DefaultFormationNum != "0") {
      alert(Translate("Default attack formation not found."));
    } else {
      unsafeWindow.sendMarches();
    }
  }  
}

/******************************************************************************/
// calculate times for march in progress; copy army to "clipboard"

function CalcCancelTime(Arrives, OneWay, ArrivesNode) {
  var Now = new Date();
  var CancelTime = Math.ceil(
    (Now.getTime() < Arrives.getTime()) *
    (OneWay - (Arrives.getTime() - Now.getTime())) / 1000
  );
  var Node = document.getElementById("GM_CancelNode");
  if (! Node) {
    ArrivesNode.nextSibling.innerHTML += "<br /><span id='GM_CancelNode></span>";
    Node = document.getElementById("GM_CancelNode");
  }
  Node.innerHTML = "(" + Translate("Cancel") + ": ";
  if (CancelTime) {
    Node.innerHTML += HMS(CancelTime) + ")";
  } else {
    Node.innerHTML += "-- )";
  }
}

var PageMatch = new RegExp(
  Host + "/info\\.php\\?what=pohod&posted_id=\\d+$", "i"
).test(window.location);
if (PageMatch) {
  var PatCoords = /(\d+):(\d+)/i;
  var Nodes = document.evaluate(
    "//div[@class='left']",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var Node;
  var Now = new Date();
  for (var N = 0; N < Nodes.snapshotLength; N++) {
    Node = Nodes.snapshotItem(N);
    switch (N) {
      case (3):
        var Arrives = LocalTime(Node.nextSibling.innerHTML);
        var ArrivesNode = Node;
        break;
      case (4):
        var Returns = LocalTime(Node.nextSibling.innerHTML); break;
      case (5):
        var Gold = Number(Node.nextSibling.innerHTML); break;
      case (6):
        var Iron = Number(Node.nextSibling.innerHTML); break;
      case (7):
        var Wood = Number(Node.nextSibling.innerHTML); break;
      case (8):
        var Food = Number(Node.nextSibling.innerHTML); break;
      case (10):
        var Cargo = Number(Node.nextSibling.innerHTML);
        var CargoNode = Node;
        break;
      case (1):
        var From = PatCoords.exec(Node.nextSibling.innerHTML).slice(1);
        var Temp =
          eval(GM_getValue(SavedHost + "_MapData_" + From[0] + "_" + From[1], ""));
        Temp ? Temp = Temp[4] : Temp = "";
        Node.nextSibling.innerHTML += " " + Temp;
        break;
      case (2):
        var To = PatCoords.exec(Node.nextSibling.innerHTML).slice(1);
        var Temp =
          eval(GM_getValue(SavedHost + "_MapData_" + To[0] + "_" + To[1], ""));
        Temp ? Temp = Temp[4] : Temp = "";
        Node.nextSibling.innerHTML += " " + Temp;
        break;
    }
  }

  var Distance = Dist(From, To, true);
  var OneWay = Returns.getTime() - Arrives.getTime();
  var EffSpeed = OneWay / (60000) / Distance;
  CalcCancelTime(Arrives, OneWay, ArrivesNode);
  window.setInterval(CalcCancelTime, 1000, Arrives, OneWay, ArrivesNode);

  OneWay = HMS(OneWay / 1000);
  var NewNode = document.createElement("div");
  NewNode.innerHTML =
    "<div class='row'>" +
    "<div class='left'>&rarr;</div><div class='right'>" +
    StripDecimals(Distance, 2) + " (" + Translate("Effective Speed") + " " +
    StripDecimals(EffSpeed, 2) + ")</div></div>" +
    "<div class='row'><div class='left'>" + Translate("One-Way") +
    ":</div><div class='right'>" + OneWay + "</div></div>";
  ArrivesNode.parentNode.insertBefore(NewNode, ArrivesNode);
  var PercentFull = Round(100 * (Gold + Iron + Wood + Food) / Cargo, 1);
  CargoNode.nextSibling.innerHTML += " (" + String(PercentFull) + "%)";

  // copy army
  Node = document.evaluate(
    "descendant::div[@class='textformbox'][position()=last()]/div",
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
  var PatUnit = new RegExp(
    "<div class=\"left\">(.*?)(?:</p>)?</div>[\\s\\S]*?" +
      "<div class=\"right\">(\\d+)</div>",
    "i"
  );
  var ArmyArray = new Array(UnitMaxID + 1);
  for (var N = 0; N < Node.snapshotLength; N++) {
    var Match = PatUnit.exec(Node.snapshotItem(N).innerHTML);
    ArmyArray[Number(UnitNameToID[Match[1]].slice(1))] = Match[2];
  }
  var CopyButton = document.createElement("input");
  CopyButton.type = "button"; CopyButton.value = Translate("Copy");
  CopyButton.addEventListener(
    "click",
    function () {
      GM_setValue(SavePrefix + "_CopyArmy", uneval(ArmyArray));
    },
    true
  );
  var InsertionPoint = document.getElementsByTagName("h2");
  InsertionPoint = InsertionPoint[InsertionPoint.length - 1];
  InsertionPoint.parentNode.
    insertBefore(CopyButton, InsertionPoint.nextSibling);
}
