// ==UserScript==
// @name GT_script
// @author FireSwarm
// @version 1.7
// @description icon for GT
// @unwrap
// @run-at document-end
// @include http://www.heroeswm.ru/*
// @match http://www.heroeswm.ru/*
// @grant       none
// ==/UserScript==

(function(){

    var find_in;
    
    var gt_1 = localStorage["gt_1"];
    var gt_2 = localStorage["gt_2"];
    var gt_2mk = localStorage["gt_2mk"];
    var gt_3 = localStorage["gt_3"];
    var gt_3mk = localStorage["gt_3mk"];
    var gt_3kbo = localStorage["gt_3kbo"];
    var wait_time = localStorage["gt_wait_time"];

    if (location.hostname !== "www.heroeswm.ru"
        || window.location.toString() == "http://www.heroeswm.ru"
        || window.location.toString() == "http://www.heroeswm.ru/")
        return;

    if (window.location.toString().indexOf("warlog.php") > 0
        || window.location.toString().indexOf("war.php") > 0
        || window.location.toString().indexOf("battlechat.php") > 0
        || (window.location.toString().indexOf("map.php") > 0 && document.body.innerHTML.indexOf("Во время пути Вам доступны") > 0)
       )
        return;

    var s_time = document.querySelector("td * a[href='http://radio.heroeswm.ru/player.php']").parentNode.innerHTML;

    if (window.location.toString() == "http://www.heroeswm.ru/pvp_guild.php") {
        find_in = document;
        button_visible();
    } else {
       if (gt_1 + gt_2 + gt_2mk + gt_3 + gt_3mk + gt_3kbo == 0)
          return;
       
       if (localStorage["gt_update_time"] == null) {
            localStorage["gt_update_time"] = 0;
       }

       if ((new Date()).getTime() - localStorage["gt_update_time"] > wait_time) {
           
          if (s_time.substring(s_time.indexOf(":") + 1, s_time.indexOf(",")) < 3)
             return;
           
          var request=new XMLHttpRequest();
    
          request.open("GET", "http://www.heroeswm.ru/pvp_guild.php", false);
          request.overrideMimeType("text/plain;charset=windows-1251");
          request.send(null);
       
          var impl = document.implementation;

          find_in = impl.createHTMLDocument("find_in");
          find_in.write(request.responseText);
       }
    }

    var count = 0;

    if (window.location.toString() !== "http://www.heroeswm.ru/pvp_guild.php" && (new Date()).getTime() - localStorage["gt_update_time"] < wait_time) {
        count = localStorage["gt_visible"];
        //alert("localStorage: " + ((new Date()).getTime() - localStorage["gt_update_time"]));
    } else {
    
        //alert("page: " + ((new Date()).getTime() - localStorage["gt_update_time"]));

       localStorage["gt_wait_time"] = (15 * 60000) - (s_time.substring(s_time.indexOf(":") + 1, s_time.indexOf(",")) % 15) * 60000;
        
       localStorage["gt_update_time"] = (new Date()).getTime();
        
       if (gt_1 > 0 && find_in.querySelector("td * a[href='pvp_guild.php?s1=1&s2=0']").innerHTML > 0) {
          count++;
       }
    
       if (gt_2 > 0 && find_in.querySelector("td * a[href='pvp_guild.php?s1=2&s2=0']").innerHTML > 0) {
          count++;
       }
    
       if (gt_2mk > 0 && find_in.querySelector("td * a[href='pvp_guild.php?s1=2&s2=1']").innerHTML > 0) {
          count++;
       }
    
       if (gt_3 > 0 && find_in.querySelector("td * a[href='pvp_guild.php?s1=3&s2=0']").innerHTML > 0) {
          count++;
       }
    
       if (gt_3mk > 0 && find_in.querySelector("td * a[href='pvp_guild.php?s1=3&s2=1']").innerHTML > 0) {
          count++;
       }
    
       if (gt_3kbo > 0 && find_in.querySelector("td * a[href='pvp_guild.php?s1=3&s2=2']").innerHTML > 0) {
          count++;
       }
    }
    
    localStorage["gt_visible"] = count;
    
    if (count > 0) {
        var insert_place = document.querySelector("li * a[href='bselect.php']").parentNode.parentNode;
	    var button = document.createElement('li');
	    button.innerHTML = "<td><div><a href=\"pvp_guild.php\"title=\"Кто-то в ГТ!\" alt=\"Кто-то в ГТ!\" style=\"color: red\">T</a></div></td>";
	    insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
    } else {
        localStorage["gt_wait_time"] = 30000;
    }

    function button_visible() {
        
        if (localStorage["gt_3kbo"] == 1) {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_3kbo\"] = 0;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Выключить 3х3 KBO\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        } else {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_3kbo\"] = 1;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Включить 3х3 KBO\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
        if (localStorage["gt_3mk"] == 1) {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_3mk\"] = 0;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Выключить 3х3 MK\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        } else {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_3mk\"] = 1;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Включить 3х3 MK\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
        if (localStorage["gt_3"] == 1) {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_3\"] = 0;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Выключить 3х3\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        } else {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_3\"] = 1;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Включить 3х3\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
        if (localStorage["gt_2mk"] == 1) {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_2mk\"] = 0;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Выключить 2х2 MK\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        } else {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_2mk\"] = 1;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Включить 2х2 MK\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
        if (localStorage["gt_2"] == 1) {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_2\"] = 0;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Выключить 2х2\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        } else {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_2\"] = 1;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Включить 2х2\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
        if (localStorage["gt_1"] == 1) {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_1\"] = 0;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Выключить 1х1\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        } else {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<input style=\"width: 200\" type='button' onclick='localStorage[\"gt_1\"] = 1;localStorage[\"gt_visible\"] = 0;localStorage[\"gt_wait_time\"] = 0;'  value=\"Включить 1х1\"/>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
        
        {
           var insert_place = document.querySelector("center * a[href='pvp_guild.php']");
	       var button = document.createElement('form');
           button.innerHTML = "<br>";
	       insert_place.parentNode.insertBefore(button, insert_place.nextSibling);
        }
    }
    
}

)();
