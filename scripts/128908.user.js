// ==UserScript==



// @name           FarmList Manager

// @namespace      Buyaas

// @version        1.4.1

// @description    Travian Auto FarmList Manager

// @include        http://*.travian.*/build.php?*tt=99*

// @include        http://*.travian.*/login.php

// @include        http://*.travian.*/dorf3.php*

// ==/UserScript==





var Troops = {};

Troops.Name = [

			[	"Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris",

				"Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"],

			[	"Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", 

				"Ram", "Catapult", "Chief", "Settler", "Hero"],

			[	"Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider"] ,

];



Troops.Speed = [

		[6,5,6,16,14,10,4,3,5,4,16],

		[7,7,6,9,10,9,4,3,4,5,10],

		[7,6,17,19,16,13,4,3,5,5,10],

];





var Config = {};



Config.DMin = 10;

Config.DMax = 15;



Config.Save = function(ListID){

  GM_setValue(dataIndex+"_Interval_"+ListID,Doc.Element("int_"+ListID).value);
  GM_setValue(dataIndex+"_Pause_"+ListID,Doc.Element("p_"+ListID).value);
  Log.Info("Config Changed : " + ListID);
  window.location.href = crtPage;

};



Config.Board = function(){

  ctnt = Doc.Element("content");

  BTable = Doc.New("table", [["cellpadding",5], ["cellspacing",1],["style","margin-top: 10px;"],["class",""]]);

  BTable.innerHTML = "<thead><tr><th>Name</th><th>LastSent</th><th>NextSent</th><th>InterVal</th><th>State</th><th></th></tr></thead>";

  aLists = GM_getValue(dataIndex + "_all","");

  if(aLists.length > 0){

    BTableBody = Doc.New("tbody");

    BTable.appendChild(BTableBody);

    for (var i = 0 ; i < aLists.split("$").length ; i++){

      ListID = aLists.split("$")[i];

      tr = Doc.New("tr",[['class','hover']]);

      tdName = Doc.New("td",[['class','vil fc'],['style','font-size:9px;']]);

      tdName.innerHTML = GM_getValue(dataIndex+"_Name_"+ListID,"");

      tdLast = Doc.New("td",[['style','font-size:9px;']]);

      tdLast.innerHTML =  GM_getValue(dataIndex+"_LastSent_"+ListID,"");

      tdNext = Doc.New("td",[['style','font-size:9px;']]);

      tdNext.innerHTML =  GM_getValue(dataIndex+"_NextSent_"+ListID,"");

      iInterval = GM_getValue(dataIndex+"_Interval_"+ListID,"10-20");



      tdInterval = Doc.New("td");

      tdInp = Doc.New("input",[['type','text'],['class','text'],['size',6],['id','int_'+ListID],['value',iInterval]]);

      tdInterval.appendChild(tdInp);

      is_paused = GM_getValue(dataIndex+"_Pause_"+ListID,"0");

      tdPause = Doc.New("td");

      tdSel = Doc.New("select",[['id','p_'+ListID]]);

      tdPause.appendChild(tdSel);

      tdOp0 = Doc.New("option",[['value',0]]);

      tdOp0.innerHTML = 0;

      tdOp1 = Doc.New("option",[['value',1]]);

      tdOp1.innerHTML = 1;

      if (is_paused == "0"){

        tdOp0.selected = true;

      }else{

        tdOp1.selected = true;

      }

      tdSel.appendChild(tdOp0);

      tdSel.appendChild(tdOp1);

      tdBut = Doc.New("td");

      saveImg = Doc.New("img",[['src',Images.Save],['width','16px'],['height','16px'],["id",ListID]]);

      saveImg.addEventListener("click",function(){Config.Save(this.id)},false);

      tdBut.appendChild(saveImg);

      tr.appendChild(tdName);

      tr.appendChild(tdLast);

      tr.appendChild(tdNext);

      tr.appendChild(tdInterval);

      tr.appendChild(tdPause);

      tr.appendChild(tdBut);

      BTableBody.appendChild(tr);

    }

  }

  ctnt.appendChild(BTable);

};





var Images = {

	Pause : 'data:image/gif;base64,R0lGODlhFwAXAMZQAFVXU1ZYVFdZVVdZVlhaVllbV1lbWFtdWV9gXmJlYGNlY2VmYmVmY2VnZGdpZm1va8vLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2djb1Nra2tvb29zc3N3d3dve2d7e3t7g29/h3OHh4eHj3+Lk3+Lk4OTk5OPl4OPl4eTl4uXl5eTm4uXm4uXm4+Xn4+bn4+fn5+jo6Ofp5ujp5ujq5+rq6urr6Ovs6ezs7O7u7e7u7u/w7vj5+Pn5+Pr6+fr7+vv7+/v8+/z8+/z8/Pz9/P39/P39/f3+/f7+/v///v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAH/oBQgoOEhYaHiImKi4yNUECQHhCTlB5AGpSUIIOQQBIIAKEABhBAEAOiAAkUnJATAkmDD6URBIQLFa1AFbApKkKzQBMETioqRgsWuha9vw8RQBTExkYMGLoYsCsrwBJAFsTb1Rm6GQRLNDNDDxVAF8Q0MUcMGroaBEw6OEQPFkDmTkh8SMKAgy4O+F6cKPLgApANxE6YINhBlwd8NVwYeZABSAcCT2S0UMLAgy4QBJr0yIHkgQYgF6HwwMGEwSZBQHwACVHASZAeSR5sAIISyo8eTBqE4AQDiIiesjrstDWowQhOIoCUUBCga4ADIZwW8BrAQQlOlliMEMFWxAgWKUDUtnULgxOKTnjz6uW0A1KIECX66s3byseOG4htKF5sA/GNHTodMQoEADs=',



	Resume : 'data:image/gif;base64,R0lGODlhFwAXAOeHAFlbVllbV1lcV1pcV1pcWFpdWFtdWFtdWlteW15gXV9gXmBgXmBhX2JjX2JlYWRlY2VnZGdpZWlpZ21ubG9wbnJzcXJ0cnN0cXN1cnR2cnZ2dXt8en+AfoSEg4SFhIqKiY2OjZCQjo6RjZCRj5SUk5mZmZubmpydm6SkpKurq6ysrK2trbCwr7CwsLCyrrCzsLe4t7y8vL2+u7+/v77AvsHBwcrKysvLy83Nzc7Ozs/Pz87QztDQ0NHR0dLS0tTU1NbW1tbX1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3uDg4OHh4eLi4uPj4+Pk4+Tl4+Xl5eXm4+bm5ufn5+jo6Ofp5Ofp5enp6ejq5unq5+rq6unr5+vr6+ns5+rs6Ovs6ezs7Ovt6uzt6uzt7O3t7ezu6uzu6+7u7u7v7O7w7e/w7e/w7u/x7vDx7vDx7/Hy7/Hy8PLz8vP08fP08vT08/T18/X19fX29PX29fb39ff39/f49vf49/j5+Pr6+vr7+vv8+/z8+/z8/Pz9/P39/P39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAI/gDPHBpIsKDBg4fOKDwDpEeThRAjChwI8QaIFD+mSIxIsGKABBZiDNGyUWHHhTcE8HFxwIONI2Q2nlSY8tCfOCIWmMixROLMMzWxwBEUBYOEFj2gQPwZFMuWOoJ2NNAwAwiVkkAFHMKCJcuWMHv8vEDw4UYRLhtxEDgURkyZt2Xc/KEzwgEKHUok8libZg2bv2nKbFkD6EkGCjUk+ihwqIuXx1yxWKlShxANACwk/jBw6IsZNGr+qqlTyAmFCzWYSBTC982cO3n4DLITIsIKJGglElnbRg6ePoUKwVBQwsjViGAUFlmL5k0fQ0EedPChdGN1I7wDjdlQocaS5CWPQCjEfkjPCQgqklzBGpPI+AEyGJAoIgUrxJ5njEzgoOO7fYgk5WdEEgH+BxEYWlCh4BQMNjiFglRoAZ5JCFWIUEAAOw==',



	Map : 'data:image/gif;base64,R0lGODlhFwAXAOf/AM0AAGg5RjdHYjhIYzNJeqQ3PkVQZ684OZVBUVRVU1VWVFNXWlZXVXhOaVlbWHpUaH1Tbl5gXXpWb5hQWk9jhVpigKtRUU5njk9oj2VmZFlohVVpi1Nskz1yrlptkE9xl1FwnUd0q0F2sllymWlwhG9xbotodVpzmoxpdkV5tXN1cld5n6VobFl6oFp7olx6p1t8o0qAtmh7klx9pF58qXJ5jV1+pXZ7fmZ9mkyCuHp8eWt+lU+Eu1KGvX+Bfqh3d1qIuYKEgXeGmGiJsF+MvoWHhIOHloKJkW2NqH+LmG2OtmWSxIOPnKaKiWmWyXiUtqeLipCSj4yUm36Ws3uXuoqVonKZxoeWqZSWk32Zu36avX+bvnedyoCcv4GdwIadunmfzZGcqZidn5udmYmgvn2j0Yqhv4uiwJ6gnaKfo32mzYyjwZ+hno2kwo6lw6KkoZCnxbSho5mou4qr1KOoq6aopamnq4Wv1qKrs5Wty7mmqKmrqJqtxoiy2pevzZ+uwautqqiusKautqSwvqKxxZuy0K6wrZG22Ku0vLK0sZy4z5W526C31qu2xLG2uK63v6W40ba4tae607e5tqi71Ky7zqm81Z+/3LC8ypvA4rq8ua++0qy/2Li+wJ7D5bTAza3B2rHB1LnByb7BvabG47DE3cHDv7zEzLbG2cDFyKnJ5rTH4L7Gz7fH2rjI3MXHw6/L48bIxcDJ0cfJxq3N68jKx73M4MnLyMPM1MbMzsrMycHN28TN1bHR78bO1r/P4snO0MzOy7bS6cfP18rP0cTQ3svQ0rTU8c/RzsbS4MrS28jU4tDV183W3tXX1MzY5sDb88rZ7dLa4tXa3Nja1s/b6sLe9tLe7Nne4dDg9Mvj9d7g3c7i+9/h3tTj+ODi39fj8dvk7NXl+eHk4ODl6OXn5Nnp/ePo693p9+Tp7Ofp5tvr/+jq59/r+enr6Obs7t7u/+Lu/ePv/urv8u3v6+Tx//Dy7+7z9vHz8PP18vb49Pj69/r8+ff9//z/+/7//CwAAAAAFwAXAAAI/gDpCRxIsKBBgoEIKFxIYEeLhzuqEDsoMKFCCjbgtHp2bVmoNTaYUKSXcMOZas+Y8XMkjNSqX11wTDOY0AMfabtO4cIU7ZctbMaStcGhB6FCM+GU/Rsmr523Yqdk3bO3LIuJogKNEHjxrN+/TuDq1UOX7Zy+f/vIoZrBYmAFAm7u/XsUT57ddb4QVXr0Tl0zLxOwErgQKh0ib/ESxzOnNJ2sT+yYFUJgQSABDskuwbJmbl28ddX+if5HLhUeThIq0yMA4hkmVcegcfOmzdfof/kEdSrVAoBlF78IffK1qVcvWpy8iqaXS4glCL7pkcBA6Q62f/MUecq06MwXXPjG8xH74AdBdBIUyBwa3a9RnzlquMgp50yKkiwFogeqMaOVKH6iDVIGGFYsMYUztSQhCQwAHDCQETJkwQgw9NhzhRNLENEDErFM4sYTJgDww0CB2HHCGZtMEwYQPfAQQwohOPJHFg8AAABWAqVBxwhUcPJEDimI0EEIQ0DyRAM2xlEQNaPUoQENWfhxxClJ5JEFgzY24U5B7iCjyRs3GCDAAmIsMEAANqaJVTCJYBFECREwkMCc3XTzSgJp5gkFPdsEE8kedQCiySts+DDOLGxk4AMapiRShyGvOMPnLXtEoUMGDigw5yhjFDFnAgpEoAIWkegSEAA7',



	Save : 'data:image/png;base64,R0lGODlhFwAXAMZbAAAAAExCJlRUVGtXNnBbOY9ZAm1tbW5ubnR0dHV1dXd3d3l5eXt7e35+fpt+UYOEgp+BVJ+CVKCCVqKFVaKFVqOFVYiKhaSHV42OjJKSkpSUlJycnMSgAJ+fn6CgoKOjo8ifZMuhZaenp6mpqaqqqs6maKysrK2trc+qacKris2rb9Ksas+tcbGxsbKysre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMPDw8TExMXFxcnJycrKysvLy8zMzNHR0dPT09TU1PTVl9nZ2dvb29zc3N/f3+Hh4fTivO3lxOXl5e3mxebm5u7oxufn5+jo6O7qxunp6e/rx+rq6uvr6+zs7O3t7e7u7vPz8/39/f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAAFwAXAAAH/oBYglgchIaFiIaDi4RbHI6Qj5KOjIMcSRxDmZuanYVYV4sYCxwMpacHHKkGHAgWBQWLFkUjMyMyHjIjOLkfNSIKBVEssYIWWVJST1RSzMrKTzQFUysSxVgWWlbb3N1WQtMrF9fYW9s/6OnoL8IoDuTl3t1BwiUR8PFW6usFTiXjFipZMCePnhMVFAp4CMho4Ll07JiEmFBAiAuGsghyq1JACQgIFYV0wDjIob4fPhIQSFGhAAwbNTaQNKbRipQCAQYUOHHCRAwNM62YRKkDQAEBDW7cANIjgwUri5aYtFKFirMmyag0IWFhSShBRqbK29jCgpEqoLAQCeiirdu3PG8tEEErCMkDC3jz6t37AAlUQVSOBOGxY0eOw4hzFOYR5AgVRlaoQJn8pLLlJ5OhUPkraIvnz6BDi/YcCAA7',



	VillageFrom : 'data:image/gif;base64,R0lGODlhFwAXAOeCAKQAAJwICIQiIdwlJdwmJt4mJuAmJuInJ3tMSlVXU+U5OTRlpIhaWGVnY+xGRpldW/FMTEp2rvBRUXJ1enV1dW52gXV2dvJVVXF4gXV4e3V4fHd4enZ5fHZ5ffNbW511c/JeXn6Ae3+BfICCfV+Gt/NjY/NkZPRmZoSFgoSGgYqIZYWHgomIcIaIg4iJfoeJhPRsbIiKhY+QjfR1daONi3eYwnmZw8CKiqqRkZeZlJiZlpmalpmal5ubmq2YmJ6enq6bm5+gnqGgnqefnaGhoaKioqKjoaOjoqOjo6SkpMShoaqqqqysrK+vr7GztrOzs7i5uMm1tbq6ubq7vLi8wbm9wb29vb+/vsS+vsLCwcLCwsbBwc3Nzc7OztLS0tzQ0NPT09TU1NbW1tfX19jX19jY2Nra2tvb29vc29zc3N3d3d7e3d7e3uLe3uDg4OLi4uPj4+Tk5OXl5ebm5ufn5+np6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/j4+Pn5+f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFwAXAAAI/gD1CBxIsKBBQYIMEiQDAMAWhQgVCsQCYMYMAGQOJlRI0aJFjAUjGuyowOKBixkHiiTY0QEEkydBClw5saKECxcrGoiZkmZHDyAuImBQsQBPPSt9VDRh4uIDFD1uVCTAc2VFGCcufpABJYsUJRUHxBRJp2KJizSCXFmzRs2YKAFmDLgoUk3Fi0OOmLHDt04dOl/i0t1od4YAIUbKzKHDeE6cOHDaxAWwEggANAkyZ/67oQOFDhb+AMBBM4GeBCFEjBgxRw4HGxRqaPCT4E7pPAlS6F4R500GEhQiTOiTAM9KO8UTtGihgsUbNxgWUFhQgU8COSLvuKmd4MULFyLcawRyQmVKlSR7EoAhKyYB8hjwY7AJVASJfSRqEnghGyYBnwY56LADD38YBEgCaUTEhR1saObggw7aEZEbedQBxxldWLEEET8QQQQTTTyhRRdv3IFUQm7okUceeNhRhxyQwTHHYnTYkYdKggQEADs=',



	AttackMode : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAAhpJREFUKFM1kd1Lk3EUxx/pQijqD/C+29qFBt7kosILQzFKijBKqSwpp6IVlClWhgjzLV2aMTOn5dRe1AUuc2K+ZeJcMVm2R1eTfC2VMt3z+31amh84FwfO93w55xui/Oezb1E39mVJv3NHqHFuOaBIQpRd27cpSyvr6bvDQrsj94SNbs0qvSPf9K0On1ppm8HUtcobt8ZLp0bR6zXyrXPU2HxqvW1cvyGY+PpD12CfVAtfzJHTJrnVruGZFTj9gqxWQUYzXKlborhFVe2DkzqltMltuFw9RZpVcvGZ5FKTpMQRoLBL43ywT26EpHpJQsk02Q9cBqWmw0tM8QIJZsHZRklKs6DHq2EbF5x5KklskJx8Iomv+kOO2Y2Sfn+UqNI1IsokR2ol51oCeOYFrhnJaavgeAPE10HsI8mx2yMoqSUfCDeusrcc9lXDqX+CBYFnUZDZKTgRvCH6seTgQ0Fc3hBKabObiHvfCa+SHAhaZ9g1Jn9KppYlhYOC5A7Yb5ZEli2TWRl0uGnqNxzOd6I3B4ixQn6/wL8imf0NtW5J2ls4ZBFE3XGTdNdhUN67/LobpkE1tnicxPZ1cgcEw9Man+Y1LB7Jtd4AR01eUo19amPHR91GFpZXY/rs8j41umA4+Bk/OY4VjMO/uGqbJc7o5ELROzWvomczuC26h7y6lAK74XrVAAm59mB1klXRx3PHBJY21+bmIH8BLUeFBNafPYwAAAAASUVORK5CYII=',

	

};







var Doc = {



	New : function(tt,attrs){

		newElement = document.createElement(tt);

		if (attrs !== undefined) {

		  for(var xi = 0; xi < attrs.length; xi++) {

		  	newElement.setAttribute(attrs[xi][0], attrs[xi][1]);

		  }

	  }

  	return newElement;

	}, 



	Element : function(eid){

		return document.getElementById(eid);	

	},



	xy2id : function (x, y) {

		 return (((400-parseInt(y))*801)+(parseInt(x)+401));

	},

	id2xy : function(vid) {

    arrXY = [];

	  var x = (vid % 801) - 401;

    var y = 400 - (vid - 401 - x) / 801;

	  arrXY[0] = x;

	  arrXY[1] = y;

	  return arrXY;

	},



	Tab : function(url){

		form = this.New('form',[['action', url],['target','_blank'],['method','get']]);

		form.appendChild(this.New('input',[['type','submit'],['value','build']]));

		document.body.appendChild(form);

		form.submit();

	},



  Login : function(){

		LoginReq = document.getElementsByClassName("innerLoginBox");

		if (LoginReq && LoginReq.length > 0){

      LoginForm = LoginReq[0].getElementsByTagName("form")[0];

			LoginData = "";

			LoginForm.setAttribute('target', '_blank');

      document.getElementsByName("password")[0].value = "1689";

			LoginForm.submit();



			setInterval(function(){

			  window.location = "/build.php?gid=16&tt=99";

			},10000);

		}

  },

  Safe : function(){

    safer = GM_getValue(dataIndex+"_safe",'');

    if (safer == ''){

      GM_setValue(dataIndex+"_safe",Time.getCurrTime());

      Doc.Tab("dorf3.php");

			setInterval(function(){

			  window.location = "/build.php?gid=16&tt=99";

			},1000);

    }else{

      safe_sec = Time.toSec(safer);

      cur_sec = Time.toSec(Time.getCurrTime());

      if ((cur_sec - safe_sec) > 1800){

         GM_setValue(dataIndex+"_safe",Time.getCurrTime());

         Doc.Tab("dorf3.php");

			   setInterval(function(){

			      window.location = "/build.php?gid=16&tt=99";

			   },1000);

      }

    }

  }

};



var Time = {



	Sync : function(x,y,x1,y1,last_sent,farm_id,trps,interval){

		dist = this.getDistance(x,y,x1,y1);

		slow = 20;

		for (var i = 1 ; i <= 11 ; i++ ){

			tid = "f"+farm_id+"_t"+i;

			if (parseInt(trps.split("|")[i-1]) > 0){

				if (slow > Troops.Speed[Race][i-1]){

					slow = Troops.Speed[Race][i-1];

				}

			} 

		}

		mtime = this.getTTime(dist,slow);

		lsec = this.toSec(last_sent);

		crT = this.getCurrTime();

		nsec = this.toSec(crT);

		msec = this.toSec('0000-00-00 '+mtime);

		msec = parseInt((msec * 2)/interval);

		mode = 'def1';

		dsec = nsec - lsec;

		tm = parseInt(lsec) + parseInt(msec) - parseInt(nsec);

		if ( tm < 0 ){ tm = 0; }

		if (dsec > msec) {

			dsec = msec;

		}

		return [mtime,this.toHour(tm+lsec),mode,tm,msec,dsec];

	}, 



	getDistance: function(sx1, sy1, sx2, sy2){

		var x1 = parseInt(sx1);

		var y1 = parseInt(sy1);

		var x2 = parseInt(sx2);

		var y2 = parseInt(sy2);



		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));

		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));

		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));



		return dist;

	},



	getTTime : function(qDist,theSlow){

		var aTime = Math.round(qDist * 3600000 / theSlow);

		//aTime += 10;

		hh=Math.floor(aTime/3600000);

		if(hh<10){hh="0"+hh;}

		mm=Math.floor((aTime-hh*3600000)/60000);

		if(mm<10){mm="0"+mm;}

		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);

		if(ss<10){ss="0"+ss;}

		return hh+":"+mm+":"+ss;

	},



	toSec : function(dt){



		// 2009-10-10 12:00:00

		d = dt.split(" ");

		dds = d[1].split(":");

		hhs = d[0].split("-");

		s = parseInt(dds[2]) + parseInt((dds[1]) * 60) + parseInt((dds[0]) * 3600);

		//alert(parseInt(dds[0]) + "s = " +s);

		s1 = parseInt(hhs[2]) * 86400  + parseInt(hhs[1]) * 2592000;

		return parseInt(s) + parseInt(s1);

	},



	toHour : function(sc){



		sc = parseInt(sc);

		m = Math.floor(sc/2592000);

		sc = Math.floor(sc%2592000);



		d = Math.floor(sc/86400);

		sc = Math.floor(sc%86400);



		h = Math.floor(sc/3600);

		sc = Math.floor(sc%3600);



		mm = Math.floor(sc/60);

		sc = Math.floor(sc%60);



		if (m<10){m = "0"+m;}

		if (d<10){d = "0"+d;}

		if (h<10){h = "0"+h;}

		if (mm<10){mm = "0"+mm;}

		if (sc<10){sc = "0"+sc;}

		res =  "2012-"+m+"-"+d+" " +h+":"+mm+":"+sc;

		return res;



	},



	getCurrTime : function(){

		crTime = new Date();

		year = crTime.getFullYear();

		month = parseInt(crTime.getMonth()+1);

   	day = crTime.getDate();

		hour = (crTime.getHours() );

    minute = crTime.getMinutes();

    second = crTime.getSeconds();



		if (month < 10) {month = "0" + month;}

		if (day < 10) {day = "0" + day;} 

		if (hour < 10) {hour = "0" + hour;} 

		if (minute < 10)  {minute = "0" + minute;} 

		if (second < 10) {second = "0" + second;}



		res =  year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; 

		return res;

	},



};





var Farm = {};



Farm.Send = function(ListIndex){

  raidList = Doc.Element(ListIndex);



  ListRows = raidList.getElementsByClassName("slotRow");

  AtLeastChecked = false;

  for (var i = 0 ; i < ListRows.length ; i++){

    ListRow = ListRows[i];

    RowCheck = ListRow.getElementsByTagName("input")[0];

    RowDistance = parseInt(ListRow.getElementsByClassName("distance")[0].innerHTML);

    RowLastCont = ListRow.getElementsByClassName("lastRaid")[0];

    if (RowLastCont.getElementsByTagName("img") && RowLastCont.getElementsByTagName("img").length > 0){

      RowLast = RowLastCont.getElementsByTagName("img")[0].className; 

      if (RowLast.split(" ")[1] == "iReport1"){

        RowCheck.checked = true;

        AtLeastChecked = true;

      }

    }else{

      RowCheck.checked = true;

      AtLeastChecked = true;

    }

  }



  if (AtLeastChecked == true){

    currTime = Time.getCurrTime();

    GM_setValue(dataIndex+"_LastSent_"+ListIndex,currTime);



    CalcNextSent = GM_getValue(dataIndex+"_Interval_"+ListIndex,"10-20");

    dDif = parseInt(CalcNextSent.split("-")[1]) - parseInt(CalcNextSent.split("-")[0])



     //dDif = Config.DMax - Config.DMin;

    dMin = parseInt(CalcNextSent.split("-")[0]);



    dDif *= 60;

    dMin *= 60;



    rNum = Math.ceil(dMin + (Math.random() * dDif));



    GM_setValue(dataIndex+"_NextSent_"+ListIndex,Time.toHour(rNum + Time.toSec(currTime)));

    GM_setValue(dataIndex + "_safe", Time.getCurrTime());

    Log.Info("Sent: " + ListIndex);

    raidList.getElementsByTagName("form")[0].submit();



  }else{

     currTime = Time.getCurrTime();

     GM_setValue(dataIndex+"_LastSent_"+ListIndex,currTime);



     CalcNextSent = GM_getValue(dataIndex+"_Interval_"+ListIndex,"10-20");

     //alert(CalcNextSent);

     dDif = parseInt(CalcNextSent.split("-")[1]) - parseInt(CalcNextSent.split("-")[0])



     //dDif = Config.DMax - Config.DMin;

     dMin = parseInt(CalcNextSent.split("-")[0]);



     dDif *= 60;

     dMin *= 60;



     rNum = Math.ceil(dMin + (Math.random() * dDif));

     GM_setValue(dataIndex + "_safe", Time.getCurrTime());

     GM_setValue(dataIndex+"_NextSent_"+ListIndex,Time.toHour(rNum + Time.toSec(currTime)));

     Log.Info("Nothing Found: " + ListIndex);

  }

};



Farm.Toggle = function(lid){

  window.location.href = "javascript:void(Travian.Game.RaidList.toggleList("+lid+"));";

};



Farm.IDS = [];

Farm.NextSents = [];

Farm.Timer = false;

Farm.Init = function(){

  FarmIDstr = "";

  ToMinID = -1;

  ToMinVal = 99999999;

  RL = Doc.Element("raidList");

  ListEntries = RL.getElementsByClassName("listEntry");

  if (ListEntries && ListEntries.length > 0){

    for (var i = 0; i < ListEntries.length ; i++){

      ShouldDelay = 0;

      ListEntry = ListEntries[i];



      ListIndex = ListEntry.id;

      NextSent = GM_getValue(dataIndex + "_NextSent_"+ListIndex,"");

      LastSent = GM_getValue(dataIndex + "_LastSent_"+ListIndex,"");



      if (NextSent == ""){

        NextSent = Time.getCurrTime();

      }

      if (Time.toSec(NextSent) < ToMinVal){

        HasPaused = GM_getValue(dataIndex + "_Pause_" + ListIndex, "1");

        if (HasPaused == "0"){

          ToMinID = i;

          ToMinVal = Time.toSec(NextSent);

        }

      }

      Farm.IDS[i] = ListIndex;

      Farm.NextSents[i] = NextSent;

      //GM_setValue(dataIndex + "_Pause_" + ListIndex, "0");

      fName = ListEntry.getElementsByClassName("listTitleText")[0].innerHTML;

      GM_setValue(dataIndex + "_Name_" + ListIndex,fName);

      FarmIDstr += (ListIndex + "$");

      NameData = "<font color='red'>"+LastSent+"</font> / ";

      NameData += "<font color='green'>"+NextSent+"</font>";

     

      ListTitleText = ListEntry.getElementsByClassName("listTitleText")[0];

      ListTitleText.innerHTML += NameData;

    }

  }

  GM_setValue(dataIndex + "_all",FarmIDstr);

  if (ToMinID >= 0){

    Farm.Timer = setInterval(function(){Farm.Observe(ToMinID);},1000);

  }

};



Farm.StateToggle = function(ListIndex){

  HasPaused = GM_getValue(dataIndex + "_Pause_" + ListIndex, "1");

  if (HasPaused == "0"){

    GM_setValue(dataIndex + "_Pause_" + ListIndex, "1");

  }else{

    GM_setValue(dataIndex + "_Pause_" + ListIndex, "0");

  }

	window.location = "/build.php?gid=16&tt=99";

};





Farm.Toggling = 0;

Farm.Observe = function(ListID){

  ListIndex = Farm.IDS[ListID];

  NextSent = Time.toSec(Farm.NextSents[ListID]);

  CurrTime = Time.toSec(Time.getCurrTime());

  if (CurrTime >= NextSent){

    ListEntry = Doc.Element(ListIndex);

    InfoBox = ListEntry.getElementsByClassName("troopSelection");

    if (InfoBox && InfoBox.length > 0){

      Farm.Send(ListIndex);

      clearInterval(Farm.Timer);

    }else{

      if (Farm.Toggling == 0){

        Farm.Toggle(ListIndex.substr(4));

        Farm.Toggling = 1;

      }

    }

  }

};



var Log = {};


Log.Info = function(msg){

		var strLog = decodeURIComponent(GM_getValue(dataIndex+"_log",false));
		if (strLog != 'false' && strLog.length > 1 && strLog.length < 20000 ) {
			strLog += ("\n[" + Time.getCurrTime() + "] - ["+ msg + " ] ");		
		}else{
		    strLog = ("\n[" + Time.getCurrTime() + "] - ["+ msg + " ] ");	
		}
		GM_setValue(dataIndex+"_log",encodeURIComponent(strLog));
};

Log.Show = function(){

	    logTable = Doc.New('ul');
		var strLog = decodeURIComponent(GM_getValue(dataIndex+"_log",false));
		aLogs = strLog.split("\n");
		for (var j = 0 ; j < aLogs.length ; j++){
           td = Doc.New("li");
            td.innerHTML = "<div class='name' style='font-size:7px;'>" + aLogs[j] + "</div>";
		   logTable.appendChild(td);   
		} 

		td = Doc.New("li");
        clearButton = Doc.New("button");
		clearButton.addEventListener('click',function(){Log.Clear()},false);
		clearButton.innerHTML = "Clear Log"
		td.appendChild(clearButton);
		logTable.appendChild(td);
		side_info = Doc.Element("sidebarBoxVillagelist").getElementsByClassName("innerBox content")[0];
		side_info.appendChild(logTable);
};

Log.Clear = function(){
	GM_setValue(dataIndex+"_log",'');
};

function getUserId(){
		navi = Doc.Element("sidebarBoxHero");
		navi_p = navi.getElementsByClassName("playerName")[0];
		//profile_link = navi_p.getElementsByTagName("a")[0];
		return navi_p.lastChild;
};



var crtPage = window.location.href;

Doc.Login();

if (crtPage.match(/login.php/)){
  Doc.Login();
} else if (crtPage.match(/dorf3.php/)){
  var user_id = getUserId();
  var dataIndex = window.location.hostname.split(".")[0]+"_"+user_id+"_farms";
  setInterval(function(){Doc.Safe()},60000);
  Config.Board();
  Log.Show();
} else {
  var user_id = getUserId();
  var dataIndex = window.location.hostname.split(".")[0]+"_"+user_id+"_farms";
  Farm.Init();
}