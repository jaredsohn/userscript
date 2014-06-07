// ==UserScript==
// @name			IRC Webchat module
// @namespace		Origin
// @description		add link, IRC Webchat module
// @version			1.0.0
// @include			http://*.ogame.*/game/index.php?page=*
// @exclude			http://*.ogame.*ajax*
// @exclude			http://*.ogame.*eventList*
// @author			TrickMaster
// ==/UserScript==

var pseudo = document.getElementsByName('ogame-player-name')[0].content;

function removeElement(divNum) {
  var d = document.getElementById('menuTable');
  var olddiv = document.getElementById(divNum);
  d.removeChild(olddiv);
}
var FireFox = navigator.userAgent.indexOf("Firefox") > -1 || navigator.userAgent.indexOf("Iceweasel") > -1;

// Google Chrome
if(!FireFox ){
   GM_getValue = function(key, defaultValue) {
   var retValue = localStorage.getItem(key);
      if (!retValue) {
         retValue = defaultValue;
      }
      return retValue;
   }

   GM_setValue = function(key, value) {
      localStorage.setItem(key, value);
   }

   GM_deleteValue = function(key) {
      localStorage.removeItem(key);
   }
}

var server = GM_getValue("server","irc.friend-chat.jp");	//IRC SeverName(etc:ogame.dip.jp)
var charset = GM_getValue("charset","iso-2022-jp");			//UTF-8 or iso-2022-jp or etc(http://wiki.mibbit.com/index.php/Character_Sets)
var nick = GM_getValue("nick",pseudo);						//OGame Player Name
var channel = GM_getValue("channel","samurai_org");			//channel name samurai_org

function returnlink( channel, nick, server, charset){
return 'http://widget.mibbit.com/?server='+server+'&charset='+charset+'&nick='+nick+'&channel=%23'+channel;

//'http://www.onlinegamesnet.net/javaChat.php?action=chat&client=webirc&join='+channel+'&nick='+nick;
}
var linkirc = returnlink(channel, nick, server, charset);

var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML +='<li class="menubutton_table"><span class="menu_icon" id="idopt" style="color:grey"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAdCAYAAADGgB7AAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwQAADsEBuJFr7QAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAADLUlEQVRYR+WWT0gUURzH1TDdddddt1Jrq11KiXbRbP3LqhtuS3vobmVRZIeSAomgpEum0slC6Bh0C4ooiKCgOogdPHToElamsP7dLCshAvNP3+b31jeM044782Y9tfBl3s57v998fn/mvcnMUPw8pT4sLy4qb6VlvCE7O2Ps01CmkDNPyV5s95auiyhgt3c3DIORIYfasWuPKTiyV4t8E1jhtp3G4MiAjMkhOTCTObJXi/sWBtOCqqkNojHUhPDBKKLRw6sUboogFDqAmpo6VFRU/BOUsgJCYMmgAoEAIpFDaD5yAmfPtePylU509dyS1XOjD9e7b6Ljajebb24+Lq2PorKyalVruL0l7L8gWMKYKxhswNFjJ9HZ1Yv7D1/g9eB7vPsQx0jsu6zR8Tlp/ANDwzMYGBzCvQfPcE1a39JyCnV1QeYrUdYSJiEwJVRDQwjtFzvw6Ek/PsbmMPV1CRMzC5iaXdLUxJdFNjcsrX/8dADnL1xCfX3jClyawFrPtOFl/1vE4vOITc+vCaSGJZvxzwt4/uoNTre2obx8nwRnppSexNtYVlaO3r47GJ38xcAoE2pxmGRzdC8W/42RsZ/ou30X1dW1cnsIldItgZETAiOo+Lc/SaF4yQhOC4ytkcpPfoLBRhlOCIyMCIq2A/7ASeotgYwpbcgf+S1ye4w3f06ulRmpwZQPmJ5dliFTlVINRn1GYBtzLcZ2fukMI4N1zRh/htHzkoHxHqOI091jpsB41lI1eKpSqt9KBZRYKcmB3+9nb5MSbq2NVc8+ljYwOnqUDawHTGvn51CZWVmsXYR6jGdMCUWQJJGzUpUpcTAqI0ERCB3cZr4uNKDEMkYgSihyvj9QBa3vsXA4AvX3mM/n45nRuhqqJnNCYCTKHGmNqM3MGQfTAlE0LgNS/zcYgH6wlaOCHxlmsqHHVj+Y1ZYPi80OS54dfJxjzQOTdI4mk54scTsK3CL5slhshps/w+Z0we5wIS+/ADZHAbsqZbU7IcvmkALgyl89XllH4AlfTln6U6Va6SrcCpJzc7GkIjg3FcpyuLaAi+7TOHFNMWa+io1nSjiK/9XwLyTTz2vODs4XAAAAAElFTkSuQmCC" height="29" width="38" /></span>'
              +'<a class="menubutton " href="'+linkirc+'" accesskey="" target="_blank" id="hrefirc"><span class="textlabel">IRC Webchat</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);
   
var idopt = document.getElementById("idopt");

idopt.addEventListener("click",
function(event){
   var inputtext = document.createElement('div');
   inputtext.id = "inputdiv";
   inputtext.innerHTML += '<li class="menubutton_table"><a class="menubutton " href="#" ><span class="textlabel">channel :</span></a></li>';
   inputtext.innerHTML += '<li class="menubutton_table"><input align="center" type="text" id="inputchannel" style="text-align:center;background-color: rgb(255, 255, 255);width:128px;" value="'+channel+'"></li>';
   inputtext.innerHTML += '<li class="menubutton_table"><a class="menubutton " href="#" ><span class="textlabel"><span class="textlabel">Nick :</span></a></li>';
   inputtext.innerHTML += '<li class="menubutton_table"><input type="text" id="inputnick" style="text-align:center;background-color: rgb(255, 255, 255);width:128px;" value="'+nick+'"><span class="menu_icon" id="idimg"><img src="../cdn/img/layout/check.gif" height="15" width="20" /></span></li>';
   document.getElementById('menuTable').appendChild(inputtext);
   
   var idimg = document.getElementById("idimg");
   idimg.addEventListener("click",
   function(event){
      channel = document.getElementById("inputchannel").value;
      nick = document.getElementById("inputnick").value;
     
	  document.getElementById("hrefirc").href = returnlink(channel, nick, server, charset);
     
      GM_setValue("channel", channel);
      GM_setValue("nick", nick);
      GM_setValue("charset", charset);
      GM_setValue("server", server);
     
      removeElement("inputdiv");
     
   }, true);
   
}, true);
