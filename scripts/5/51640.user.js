// ==UserScript==
// @name           FUMBBL Launcher
// @description    Adds more proxy servers to the Game Launcher list
// @include        http://fumbbl.com/FUMBBL.php?page=bblaunch*
// ==/UserScript==

//Add your additional proxy servers here...
addProxy("G Force", "fumbbl.nasmyth.co.uk:2008")
addProxy("Arturos", "82.43.120.29:8084")
addProxy("McCloud1", "mccloud.game-host.org:8081")
addProxy("McCloud2", "mccloud.game-host.org:8082")
addProxy("McCloud3", "mccloud.game-host.org:8083")
addProxy("Laviak1", "laviak.ath.cx:8081")
addProxy("Laviak2", "laviak.ath.cx:8082")
addProxy("Laviak3", "laviak.ath.cx:8083")
addProxy("Laviak4", "laviak.ath.cx:8084")
addProxy("FBB", "fbb.servegame.com:8085")

function addProxy(Name, Address)
{
  addOption("proxy", Name+" ("+Address+")", Address);
}

function addOption(Sel, Text, Value)
{
  var opt = document.createElement("option");

  // Add an Option object to Drop Down/List Box
  document.getElementsByName(Sel)[0].options.add(opt);

  // Assign text and value to Option object
  opt.text = Text;
  opt.value = Value;
}