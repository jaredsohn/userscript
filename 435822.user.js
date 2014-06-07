// ==UserScript==
// @name           Moswar++ 6
// @namespace      moswar
// @include        http://*.moswar.*/*
// @version        6.16.2
// ==/UserScript==
function all(){
  var s_version = "6.16.2";
  var debug = false;
  eval('AngryAjax.goToUrl2 = '+AngryAjax.goToUrl.toString().replace("url = url.replace('#', '');",''))

  if(typeof GM_deleteValue == "undefined") {
    GM_addStyle = function(css) {
      var style = document.createElement("style");
      style.textContent = css;
      Adoc.getElementsByTagName("head")[0].appendChild(style)
    };
    GM_deleteValue = function(name) {
      localStorage.removeItem(name)
    };
    GM_getValue = function(name, defaultValue) {
      var value = localStorage.getItem(name);
      if(!value) {
        return defaultValue
      }
      var type = value[0];
      value = value.substring(1);
      switch(type) {
        case "b":
          return value == "true";
        case "n":
          return Number(value);
        default:
          return value
      }
    };
    GM_log = function(message) {
      console.log(message)
    };
    GM_openInTab = function(url) {
      return window.open(url, "_blank")
    };
    GM_registerMenuCommand = function(name, funk) {
    };
    GM_setValue = function(name, value) {
      value = (typeof value)[0] + value;
      localStorage.setItem(name, value)
    }
  }
  var persName = null;
  var alarm;
  var bip;
  var gav;
  var Adoc;
  var iframeUrl;
  var ccrunning = false;
  var logs = document.createElement("DIV");
  logs.setAttribute("style", "width:100;position:absolute;top:0;right:15;z-index:4;background-color:" + (debug ? "white" : "transparent"));
  logs.setAttribute("id", "log");
  var bbuy=function(sk,rel){

		$.ajax({
		  type: "POST",
		  url: '/shop/',
		  data: {action: 'buy', key: sk, item: rel, me: 'on'},
		  success: function(data){
			localStorage['mw_presN']=Number(localStorage['mw_presN'])-1;
			if (Number(localStorage['mw_presN'])<1){
				$('#aopt').show();
				}
			}
		});

	};

  function dopOptom() {
    if(location.href.match(/\/shop\/section\/gifts\//)) {
      var alert = Adoc.getElementsByClassName("alert")[0];
      var newalert = document.createElement("div");
      alert.parentNode.insertBefore(newalert, alert);
      newalert.setAttribute("class", "alert");
      newalert.setAttribute("id", "aopt");
      newalert.setAttribute("align", "center");
      newalert.appendChild(document.createElement("h3"));
      newalert.firstChild.innerHTML = "<center>\u041a\u0443\u043f\u043b\u0435\u043d\u043e</center>";
      var alertimg = document.createElement("div");
      newalert.appendChild(alertimg);
      alertimg.setAttribute("class", "items");
      var newadata = document.createElement("div");
      newalert.appendChild(newadata);
      newadata.setAttribute("class", "data");
      newadata.innerHTML = "<table class=~forms~ width=100%><tbody><tr><td class=~label~></td><td class=~input~ align=center><button class=~button~ type=~button~ onclick=~$('#aopt').hide();$('.items').html('');var bs=document.getElementById('buysrc');if(bs){bs.parentNode.removeChild(bs);}setTimeout('AngryAjax.goToUrl2(location.href)',2000);$('#log').html('');~><span class=~f~><i class=~rl~></i><i class=~bl~></i><i class=~brc~></i><div class=~c~>\u0417\u0430\u043a\u0440\u044b\u0442\u044c</div></span></button></td></tr></tbody></table>".replace(/LF/g, "\n").replace(/~/g, 
      '"');
      var optdiv = document.createElement("div");
      var objects = Adoc.getElementsByClassName("objects")[0];
      objects.parentNode.insertBefore(optdiv, objects);
      optdiv.setAttribute("id", "opt");
      optdiv.style.width = "100%";
      optdiv.style.textAlign = "center";
      var optdop = document.createElement("div");
      optdop.style.textAlign = "center";
      optdop.style.overflow = "auto";
      optdiv.appendChild(optdop);
      optdop.setAttribute("id", "optdop");
      var opttea = document.createElement("div");
      opttea.style.textAlign = "center";
      opttea.style.overflow = "auto";
      optdiv.appendChild(opttea);
      opttea.setAttribute("id", "opttea");
      var buyButton = document.createElement("DIV");
      buyButton.setAttribute("class", "button");
      buyButton.setAttribute("id", "zatar");
      buyButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u0417\u0410\u0422\u0410\u0420\u0418\u0422\u042c&nbsp;</div></span>';
      optdiv.appendChild(buyButton);
      buyButton.addEventListener("click", function() {
	var nt=Number($('#zatar .c .tugriki').text());
	var no=Number($('#zatar .c .ruda').text());
	var nn=Number($('#zatar .c .neft').text());
	var et=Number($('.wallet .tugriki-block').attr('title').match(/\d+/));
	var eo=Number($('.wallet .ruda-block').attr('title').match(/\d+/));
	var en=Number($('.wallet .neft-block').attr('title').match(/\d+/));
	console.log(nt+"-"+et+" "+no+"-"+eo+" "+nn+"-"+en);
	if ((nn>en) || (no>eo) || (nt>et))
		{
		var nehvatka='';
		nehvatka+=nt>et?'<span class="tugriki">'+(nt-et)+'<i></i></span> ':'';
		nehvatka+=no>eo?'<span class="ruda">'+(no-eo)+'<i></i></span> ':'';
		nehvatka+=nn>en?'<span class="neft">'+(nn-en)+'<i></i></span>':'';
		showAlert('Ошибка','<center>Вам не хватает: '+nehvatka+'</center>',1)
		return false;
		}
        var items = optdiv.getElementsByClassName("optdop");
	shopkey = document.getElementsByClassName('objects')[0].getElementsByClassName('object')[0].innerHTML.split("params:['")[1].split("'")[0];
	var actionbody='';
	var bCount=0;

        for(var i = 0;i < items.length;i++) {
          if(items[i].style.borderColor == "green") {
/*		setTimeout(function(sk,rel){
			$.ajax({
			  type: "POST",
			  url: '/shop/',
			  data: {action: 'buy', key: sk, item: rel, me: 'on'},
			  success: function(data){
				localStorage['mw_presN']=Number(localStorage['mw_presN'])-1;
				if (Number(localStorage['mw_presN'])<1){
					$('#aopt').show();
					}
				}
			}); 
		}*/
            setTimeout("bbuy('"+shopkey+"', '"+items[i].getAttribute('rel')+"');", 1+500*bCount);
	    bCount++;
            var unit = getimg(items[i].getAttribute("rel"));
            alertimg.appendChild(unit);
          }
        }
	localStorage['mw_presN']=bCount;
        actionbody += "$('#aopt').css('top', $(document).scrollTop()+($(window).height() / 2)-($('#aopt').height()/2)-200);\n";
        actionbody += "\n";
        var buysrc = document.createElement("script");
        buysrc.setAttribute("id", "buysrc");
        Adoc.getElementsByTagName("head")[0].appendChild(buysrc);
        buysrc.innerHTML = actionbody;
        var citems = Adoc.getElementsByClassName("optdop");
        for(var j = 0;j < citems.length;j++) {
          citems[j].style.borderColor = "transparent"
        }
        recalcprice()
      }, false);
	var getimg = function(rel) {
        var obj = Adoc.getElementsByClassName("object");
        for(var i = 0;i < obj.length;i++) {
          if(obj[i].getAttribute("rel") == rel) {
            return obj[i].getElementsByTagName("img")[0].cloneNode(true)
          }
        }
      };      var getprice = function(id, res) {
        var obj = Adoc.getElementsByClassName("object");
        for(var i = 0;i < obj.length;i++) {
          if(obj[i].getAttribute("rel") == id) {
            var item = obj[i].getElementsByClassName("actions")[0]
          }
        }
        var price = item.getElementsByClassName(res)[0];
        if(price) {
          if(price.textContent && typeof price.textContent != "undefined") {
            return price.textContent.replace(/,/, "")
          }else {
            return price.innerText.replace(/,/, "")
          }
        }else {
          return 0
        }
      };
      var objs = Adoc.getElementsByClassName("object");
      var doplist = new Array;
      var tealist = new Array;

      for(var item = 0;item < objs.length;item++) {
        var itemId = objs[item].getAttribute("rel");
        if(itemId == "3351") {
          if(objs[item].getElementsByClassName("actions")[0].innerHTML != "") {
            doplist.push(itemId);
          }
        }
        if(itemId == "3860" || itemId == "3864" || itemId == "2936" || itemId == "2937" || itemId == "328" || itemId == "325") {
          if(objs[item].getElementsByClassName("actions")[0].innerHTML != "") {
            tealist.push(itemId);
          }
        }
      }
      doplist.push(309, 670, 671, 3921, 793, 794, 795, 1094);
      tealist.push(327, 324, 323, 326);
      for(var item = 0;item < doplist.length;item++) {
        var unit = getimg(doplist[item]);
        var bdiv = document.createElement("div");
        optdop.appendChild(bdiv);
        bdiv.setAttribute("class", "optdop");
        bdiv.setAttribute("rel", doplist[item]);
        bdiv.setAttribute("tugriki", getprice(doplist[item], "tugriki"));
        bdiv.setAttribute("ruda", getprice(doplist[item], "ruda"));
        bdiv.setAttribute("neft", getprice(doplist[item], "neft"));
        bdiv.appendChild(unit);
        bdiv.setAttribute("style", "margin: 1px 1px 1px 1px; width:" + 88 / doplist.length + "%; height: 68px; float: left;border: 3px dashed transparent;");
        bdiv.addEventListener("click", function() {
          onClickBorder(this)
        }, false)
      }
      for(var item = 0;item < tealist.length;item++) {
        var unit = getimg(tealist[item]);
        var bdiv = document.createElement("div");
        opttea.appendChild(bdiv);
        bdiv.setAttribute("class", "optdop");
        bdiv.setAttribute("rel", tealist[item]);
        bdiv.setAttribute("tugriki", getprice(tealist[item], "tugriki"));
        bdiv.setAttribute("ruda", getprice(tealist[item], "ruda"));
        bdiv.setAttribute("neft", getprice(tealist[item], "neft"));
        bdiv.appendChild(unit);
        bdiv.setAttribute("style", "margin: 1px 1px 1px 1px; width:" + 86 / tealist.length + "%; height: 68px; float: left;border: 3px dashed transparent;");
        bdiv.addEventListener("click", function() {
          onClickBorder(this)
        }, false)
      }
    }
  }
  function onClickBorder(obj) {
    obj.style.borderColor = obj.style.borderColor == "green" ? "transparent" : "green";
    recalcprice()
  }
  function recalcprice() {
    var neft = 0;
    var tugriki = 0;
    var ruda = 0;
    var items = Adoc.getElementsByClassName("optdop");
    for(var i = 0;i < items.length;i++) {
      if(items[i].style.borderColor == "green") {
        tugriki += Number(items[i].getAttribute("tugriki"));
        ruda += Number(items[i].getAttribute("ruda"));
        neft += Number(items[i].getAttribute("neft"))
      }
    }
    var mybutton = Adoc.getElementById("zatar");
    if(mybutton) {
      buttontext = mybutton.getElementsByClassName("c")[0];
      buttontext.innerHTML = "\u0417\u0410\u0422\u0410\u0420\u0418\u0422\u042c&nbsp;";
      if(tugriki > 0) {
        buttontext.innerHTML += '<span class="tugriki">' + tugriki + "<i></i></span>"
      }
      if(ruda > 0) {
        buttontext.innerHTML += '<span class="ruda">' + ruda + "<i></i></span>"
      }
      if(neft > 0) {
        buttontext.innerHTML += '<span class="neft">' + neft + "<i></i></span>"
      }
    }
  }
  function log(message) {
    logs.appendChild(document.createTextNode(message));
    logs.appendChild(document.createElement("br"))
  }
  function searchButton(value) {
    var buttons = Adoc.getElementsByClassName("button");
    for(var i = 0;i < buttons.length;i++) {
      var button = buttons[i];
      if(button.innerHTML.indexOf(value) > -1) {
        button = !button.getAttribute("onclick") ? button.getElementsByClassName("f")[0] : button;
        return button
      }
    }
    return false
  }
  function showHiddenButton() {
    if(/huntclub/.test(Adoc.URL)) {
      x = Adoc.getElementById("trainer-personal-prolong");
      if(x) {
        x.setAttribute("style", "")
      }
    }
    if(/trainer\/vip/.test(Adoc.URL)) {
      x = Adoc.getElementById("trainer-personal-prolong");
      if(x) {
        x.setAttribute("style", "")
      }
    }
    if(/sovet/.test(Adoc.URL)) {
      x = Adoc.getElementById("patriot-prolong");
      if(x) {
        x.setAttribute("style", "")
      }
    }
    if(/bank/.test(Adoc.URL)) {
      x = Adoc.getElementById("bank-deposit-cell-prolong");
      if(x) {
        x.setAttribute("style", "")
      }
    }
    if(/gypsy/.test(Adoc.URL)) {
      x = Adoc.getElementById("divSignInCampBattle");
      if(x) {
        x.setAttribute("style", "")
      }
    }
    if(/gypsy/.test(Adoc.URL)) {
      x = Adoc.getElementById("divMeteorProgress");
      if(x) {
        x.setAttribute("style", "");
        if(xx = x.getElementsByClassName("percent")[0]) {
          yy = xx.getAttribute("style").split(":")[1].split(";")[0];
          yyy = x.getElementsByTagName("h3")[0];
          yyy.innerHTML = yyy.innerHTML + " (" + yy + ")"
        }
      }
    }
  }
  function showStars() {
    Adoc = getrealdocument();
    if(!Adoc) {
      return
    }
    if(/\/player\/\d+\//.test(Adoc.URL)) {
      var normaStat = [[1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1], [20, 17, 16, 15, 19, 22, 14], [27, 21, 22, 20, 25, 31, 18], [35, 26, 28, 25, 32, 40, 22], [43, 33, 33, 30, 39, 49, 26], [61, 49, 43, 41, 49, 61, 30], [91, 73, 65, 62, 72, 85, 36], [136, 110, 97, 92, 108, 127, 43], [204, 165, 146, 139, 162, 191, 51], [305, 248, 219, 208, 243, 286, 65], [458, 372, 328, 312, 365, 429, 87], [650, 550, 490, 460, 540, 640, 130], [910, 
      770, 690, 650, 760, 900, 185], [1092, 924, 828, 780, 912, 1080, 290], [1310, 1109, 994, 936, 1094, 1296, 348], [1572, 1331, 1193, 1123, 1313, 1555, 418], [1887, 1597, 1432, 1348, 1576, 1866, 502], [2263, 1916, 1718, 1619, 1891, 2240, 602]];
      if(!Adoc.getElementsByClassName("pers enemy")) {
        return
      }
      var level = 1 * Adoc.getElementsByClassName("pers enemy")[0].getElementsByClassName("level")[0].innerHTML.match(/\[(\d+)\]/)[1];
      level = level > 21 ? 21 : level;
      var lis = Adoc.getElementsByClassName("stats")[0].getElementsByTagName("li");
      for(var i = 0;i < lis.length;i++) {
        var li = lis[i];
        var div = li.getElementsByTagName("div")[0];
        var statName = div.getElementsByTagName("b")[0].innerHTML;
        switch(statName) {
          case "\u0417\u0434\u043e\u0440\u043e\u0432\u044c\u0435":
            div.getElementsByTagName("b")[0].innerHTML = "\u0417&nbsp&nbsp";
            break;
          case "\u0421\u0438\u043b\u0430":
            div.getElementsByTagName("b")[0].innerHTML = "\u0421\u0438&nbsp&nbsp";
            break;
          case "\u041b\u043e\u0432\u043a\u043e\u0441\u0442\u044c":
            div.getElementsByTagName("b")[0].innerHTML = "\u041b\u043e&nbsp&nbsp";
            break;
          case "\u0412\u044b\u043d\u043e\u0441\u043b\u0438\u0432\u043e\u0441\u0442\u044c":
            div.getElementsByTagName("b")[0].innerHTML = "\u0412&nbsp&nbsp";
            break;
          case "\u0425\u0438\u0442\u0440\u043e\u0441\u0442\u044c":
            div.getElementsByTagName("b")[0].innerHTML = "\u0425\u0438&nbsp&nbsp";
            break;
          case "\u0412\u043d\u0438\u043c\u0430\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u044c":
            div.getElementsByTagName("b")[0].innerHTML = "\u0412\u043d&nbsp&nbsp";
            break;
          case "\u0425\u0430\u0440\u0438\u0437\u043c\u0430":
            div.getElementsByTagName("b")[0].innerHTML = "\u0425\u0430&nbsp&nbsp";
            break
        }
        var Value = 1 * div.getElementsByClassName("num")[0].innerHTML;
        var stars = document.createElement("span");
        stars.setAttribute("class", "stars");
        var stats_ratio = Value / normaStat[level][i];
        if(stats_ratio <= 1.2) {
          stars.innerHTML = '<span class="percent" style="width: 0%;"></span>'
        }else {
          if(stats_ratio <= 1.4) {
            stars.innerHTML = '<span class="percent" style="width: 20%;"></span>'
          }else {
            if(stats_ratio <= 1.6) {
              stars.innerHTML = '<span class="percent" style="width: 40%;"></span>'
            }else {
              if(stats_ratio <= 1.8) {
                stars.innerHTML = '<span class="percent" style="width: 60%;"></span>'
              }else {
                if(stats_ratio <= 2) {
                  stars.innerHTML = '<span class="percent" style="width: 80%;"></span>'
                }else {
                  if(stats_ratio <= 2.3) {
                    stars.setAttribute("class", "stars stars5");
                    stars.setAttribute("curstars", "5");
                    stars.innerHTML = '<span class="percent stars5" curstars="5"></span>'
                  }else {
                    if(stats_ratio <= 2.8) {
                      stars.setAttribute("class", "stars stars6");
                      stars.setAttribute("curstars", "6");
                      stars.innerHTML = '<span class="percent stars6" curstars="6"></span>'
                    }else {
                      if(stats_ratio <= 3.5) {
                        stars.setAttribute("class", "stars stars7");
                        stars.setAttribute("curstars", "7");
                        stars.innerHTML = '<span class="percent stars7" curstars="7"></span>'
                      }else {
                        if(stats_ratio > 3.5) {
                          stars.setAttribute("class", "stars stars8");
                          stars.setAttribute("curstars", "8");
                          stars.innerHTML = '<span class="percent stars8" curstars="8"></span>'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        div.insertBefore(stars, div.getElementsByTagName("span")[0])
      }
    }
  }
  function PetHPMonitoring(HPPersent) {
    if(!/^\d+$/.test(HPPersent) || 1 * HPPersent > 100 || 1 * HPPersent < 1) {
      log("\u041d\u0435\u0432\u0435\u0440\u043d\u043e \u0437\u0430\u0434\u0430\u043d HPPersent");
      return
    }
    Adoc = getrealdocument();
    if(/\/alley\/fight\/\w+\/\w+\//.test(Adoc.URL)) {
      var fighters = new Array;
      fighters.push(Adoc.getElementsByClassName("fighter1"));
      fighters.push(Adoc.getElementsByClassName("fighter2"));
      for(var i = 0;i < fighters.length;i++) {
        var fighter = fighters[i];
        if(fighter[0]) {
          if(fighter[0].getElementsByTagName("a").length > 0 && fighter[0].getElementsByTagName("a")[fighter[0].getElementsByTagName("a").length - 1].innerHTML == persName) {
            var petHP = Adoc.getElementsByClassName("fight-log")[0].getElementsByTagName("li")[1].getAttribute("rel").split(":")[i + 2];
            var petHPcurrent = petHP.split("/")[0];
            var petHPmax = petHP.split("/")[1];
            if(petHPmax != "") {
              if(petHPcurrent / petHPmax < HPPersent / 100) {
                var warning = document.createElement("DIV");
                warning.id = "warning";
                warning.setAttribute("style", "font-size:24pt;color:red");
                Adoc.getElementsByClassName("heading clear")[0].appendChild(warning);
                warning.innerHTML = "\u0421\u041e\u0411\u0410\u041a\u0415 \u041f\u041b\u041e\u0425\u041e (" + Math.round(100 * petHPcurrent / petHPmax) + "%)"
              }
            }
          }
        }
      }
    }
  }
  function Revenge() {
    if(Adoc.URL.indexOf("/phone/duels/") > -1 && Adoc.getElementsByClassName("messages-list").length > 0) {
      var trs = Adoc.getElementsByClassName("messages-list")[0].getElementsByTagName("tr");
      for(var i = 0;i < trs.length;i++) {
        var tr = trs[i];
        td2 = tr.getElementsByTagName("td")[1];
        td3 = tr.getElementsByTagName("td")[2];
        if(td2.innerHTML.indexOf("\u043d\u0430\u043f\u0430\u043b \u043d\u0430 \u0432\u0430\u0441 \u0438 \u043f\u043e\u0442\u0435\u0440\u043f\u0435\u043b \u043f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435.") > -1) {
          var as = td2.getElementsByTagName("a");
          if(as.length > 0) {
            var enemyId = "exp_" + as[as.length - 1].getAttribute("href").match(/\/player\/(\d+)\//)[1];
            var fightExp = td2.getElementsByClassName("expa").length > 0 ? td2.getElementsByClassName("expa")[0].innerHTML.match(/(\d+)/)[1] : 0;
            var fightNums = td3.getElementsByTagName("a")[0].getAttribute("href").match(/\/alley\/fight\/(\w+)\/(\w+)\//);
            var fightID = "exp_" + fightNums[1] + "_" + fightNums[2];
            if(!GM_getValue(fightID, false)) {
              GM_setValue(fightID, enemyId);
              var setExp = GM_getValue(enemyId, 0);
              setExp = 1 * setExp + 1 * fightExp;
              GM_setValue(enemyId, setExp)
            }
          }
        }
      }
    }
    if(Adoc.URL.indexOf("/phone/contacts/blacks/") > -1) {
      var tableListUsers = null;
      var list_userss = Adoc.getElementsByClassName("list-users");
      for(var i = 0;i < list_userss.length;i++) {
        var list_users = list_userss[i];
        if(list_users.tagName == "TABLE") {
          tableListUsers = list_users
        }
      }
      if(tableListUsers != null) {
        var trs = tableListUsers.getElementsByTagName("tr");
        for(var i = 0;i < trs.length;i++) {
          var tr = trs[i];
          var td1 = tr.getElementsByTagName("td")[0];
          var td2 = tr.getElementsByTagName("td")[1];
          var td3 = tr.getElementsByTagName("td")[2];
          enemyId = td1.getElementsByTagName("a")[td1.getElementsByTagName("a").length - 1].getAttribute("href").match(/\/player\/(\d+)\//)[1];
          revengeButton = document.createElement("span");
          revengeButton.setAttribute("class", "button");
          revengeButton.innerHTML = '<a href="/huntclub/revenge/' + enemyId + '/" class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u0442\u043e\u043c\u0441\u0442\u0438\u0442\u044c</div></a>';
          td3.appendChild(revengeButton);
          td2.innerHTML += ' <span class="expa">' + GM_getValue("exp_" + enemyId, 0) + "<i></i></span>"
        }
      }
    }
  }
  function HCDistinguish(level) {
  }
  function GM_exportAll() {
    var result = "";
    for(var i = 0;i < GM_listValues().length;i++) {
      var variable = GM_listValues()[i];
      result += "GM_setValue('" + variable + "', '" + GM_getValue(variable) + "');<br>"
    }
    var exportVariables = document.createElement("DIV");
    exportVariables.setAttribute("style", "position:absolute;top:0;left:0;z-index:4;background-color:#FFFFFF");
    exportVariables.innerHTML = result;
    Adoc.body.appendChild(exportVariables)
  }
  function play_alarm() {
    var timer = Adoc.getElementById("timeout");
    if(timer) {
      var w_timer = timer.getAttribute("timer");
      if(w_timer > 0) {
      }
    }
  }
  function blink() {
    if(!Adoc.getElementById("flashing")) {
      var flashing = document.createElement("DIV");
      flashing.id = "flashing";
      flashing.setAttribute("style", "position:fixed;top:30%;left:30%;z-index:4;font-weight:700;font-size:150pt;color:red");
      flashing.innerHTML = "\u041f\u041e\u0420\u0410!";
      Adoc.body.appendChild(flashing)
    }else {
      if(Adoc.getElementById("flashing").style.visibility == "visible") {
        Adoc.getElementById("flashing").style.visibility = "hidden"
      }else {
        Adoc.getElementById("flashing").style.visibility = "visible"
      }
    }
    setTimeout(blink, 300)
  }
  function playSound(url, id) {
    var audio = document.createElement("AUDIO");
    audio.setAttribute("src", url);
    audio.setAttribute("autobuffer", true);
    audio.setAttribute("autoplay", true);
    audio.id = id;
    Adoc.body.appendChild(audio)
  }
  function Warning(warningLevel) {
    Adoc = getrealdocument();
    if(Adoc.URL.indexOf("alley/search") > -1) {
      var fighter1 = Adoc.getElementsByClassName("fighter1")[0];
      var fighter2 = Adoc.getElementsByClassName("fighter2")[0];
      if(fighter1 && fighter2) {
        var level1 = fighter1.getElementsByClassName("level")[0].innerHTML.match(/\[(\d+)\]/)[1];
        var level2 = fighter2.getElementsByClassName("level")[0].innerHTML.match(/\[(\d+)\]/)[1];
        if(parseInt(level2) >= parseInt(level1)) {
          switch(warningLevel) {
            case 2:
              var attackButton = searchButton("\u041d\u0430\u043f\u0430\u0441\u0442\u044c");
              attackButton.parentNode.removeChild(attackButton);
            default:
              var warning = Adoc.getElementsByClassName("button button-fight")[0];
              if(warning) {
                warning.setAttribute("style", "border: 10px dashed red;")
              }
              var w3 = document.createElement("h2");
              w3.style.color = "red";
              Adoc.getElementsByClassName("fight-button-block curves")[0].appendChild(w3);
              w3.innerHTML = "\u041f\u0440\u043e\u0442\u0438\u0432\u043d\u0438\u043a \u0440\u0430\u0432\u0435\u043d \u0438\u043b\u0438 \u0432\u044b\u0448\u0435 \u0432\u0430\u0441 \u043f\u043e \u0443\u0440\u043e\u0432\u043d\u044e!!!"
          }
        }
      }
    }
  }
  function changeType(n, minlvl, maxlvl) {
    if(Adoc.URL.indexOf("/alley/") > -1) {
      var Ch = Adoc.getElementsByName("type")[0];
      if(Ch) {
        Ch = Ch.firstChild;
        for(var i = 1;i < 2 * n - 1;i++) {
          Ch = Ch.nextSibling
        }
        Ch.setAttribute("selected", true);
        var minlevel = Adoc.getElementsByName("minlevel")[0];
        var maxlevel = Adoc.getElementsByName("maxlevel")[0];
        minlevel.setAttribute("value", minlvl);
        maxlevel.setAttribute("value", maxlvl)
      }
    }
  }
  function getAverageLoot(enemyId) {
    enemyId = enemyId.indexOf("loot_") == 0 ? enemyId : "loot_" + enemyId;
    loot_enemyId = GM_getValue(enemyId, false);
    if(loot_enemyId) {
      var fights = loot_enemyId.split("/");
      fights = fights.sort(sortByDate);
      result = fights[0].split(";")[2];
      for(i = 1;i < fights.length;i++) {
        result = Math.floor(0.5 * fights[i].split(";")[2] + result * 0.5, 0)
      }
      return result
    }else {
      return""
    }
  }
  function sortByDate(a, b) {
    var aDate = new Date(a.split(";")[0]);
    var bDate = new Date(b.split(";")[0]);
    if(aDate > bDate) {
      return 1
    }else {
      if(aDate == bDate) {
        return 0
      }else {
        return-1
      }
    }
  }
  function SaveFight(fightID, fightLoot, enemyId, fightTime) {
    loot_fights = GM_getValue("loot_fights", false);
    var fightFound = false;
    if(loot_fights) {
      var fights = loot_fights.split("/");
      for(var i = 0;i < fights.length;i++) {
        var fight = fights[i];
        if(fightID == fight) {
          fightFound = true;
          break
        }
      }
      if(!fightFound) {
        loot_fights += "/" + fightID
      }
    }else {
      loot_fights = fightID
    }
    GM_setValue("loot_fights", loot_fights);
    if(!fightFound) {
      loot_enemyId = GM_getValue("loot_" + enemyId, "");
      if(loot_enemyId) {
        loot_enemyId += "/"
      }
      loot_enemyId += fightTime + ";" + fightID + ";" + fightLoot;
      GM_setValue("loot_" + enemyId, loot_enemyId)
    }
  }
  function averageLoot() {
    if(/\/alley\/fight\/\w+\/\w+\//.test(Adoc.URL)) {
      var AList1 = Adoc.getElementsByClassName("fighter1")[0].getElementsByTagName("a");
      if(AList1.length < 1 || Adoc.getElementsByClassName("result")[0].innerHTML.indexOf("\u041d\u0438\u0447\u044c\u044f!") > -1) {
        return
      }
      var fighter1Name = AList1.length == 1 ? AList1[0].innerHTML : AList1[1].innerHTML;
      var fightWinner = Adoc.getElementsByClassName("result")[0].getElementsByTagName("div")[1].getElementsByTagName("b")[0].getElementsByTagName("b")[0].innerHTML.match(/^(.+)\s/)[1];
      if(fighter1Name == persName && fightWinner == persName) {
        var fightNums = Adoc.URL.match(/\/alley\/fight\/(\w+)\/(\w+)\//);
        var fightID = fightNums[1] + "_" + fightNums[2];
        var fightLoot = Adoc.getElementsByClassName("result")[0].getElementsByTagName("div")[1].getElementsByClassName("tugriki")[0] ? Adoc.getElementsByClassName("result")[0].getElementsByTagName("div")[1].getElementsByClassName("tugriki")[0].innerHTML.replace(",", "").match(/^\d+/)[0] * 1 : 0;
        var AList2 = Adoc.getElementsByClassName("fighter2")[0].getElementsByTagName("a");
        if(AList2.length < 1) {
          return
        }
        var fighter2ID = AList2.length == 1 ? 1 * AList2[0].getAttribute("href").match(/\/player\/(\d+)\//)[1] : 1 * AList2[1].getAttribute("href").match(/\/player\/(\d+)\//)[1];
        var matchTime = Adoc.getElementById("fight-log").getElementsByTagName("h3")[0].innerHTML.match(/(\d+):(\d+):(\d+) \((\d+)\.(\d+)\.(\d+)\)/);
        var fightTime = new Date(matchTime[6], matchTime[5] - 1, matchTime[4], matchTime[1], matchTime[2], matchTime[3]);
        SaveFight(fightID, fightLoot, fighter2ID, fightTime)
      }
    }
    if(Adoc.URL.indexOf("/phone/contacts/enemies/") > -1 || Adoc.URL.indexOf("/phone/contacts/victims/") > -1 || /\/phone\/contacts\/$/.test(Adoc.URL)) {
      var tableUserList = null;
      var userLists = Adoc.getElementsByClassName("list-users");
      for(var i = 0;i < userLists.length;i++) {
        var userList = userLists[i];
        if(userList.tagName == "TABLE") {
          tableUserList = userList
        }
      }
      if(tableUserList != null) {
        var indexOfMaxAverage = -1;
        var maxAverage = -1;
        var trs = tableUserList.getElementsByTagName("tr");
        for(var i = 0;i < trs.length;i++) {
          var tr = trs[i];
          var td1 = tr.getElementsByTagName("td")[0];
          var td2 = tr.getElementsByTagName("td")[1];
          var td3 = tr.getElementsByTagName("td")[2];
          enemyId = td1.getElementsByTagName("a")[td1.getElementsByTagName("a").length - 1].getAttribute("href").match(/\/player\/(\d+)\//)[1];
          loot = getAverageLoot(enemyId);
          if(loot) {
            td2.innerHTML += ' <span class="tugriki">' + loot + "<i></i></span>";
            if(1 * loot > 1 * maxAverage) {
              maxAverage = loot;
              indexOfMaxAverage = i
            }
            if(loot < 500) {
              tr.style.backgroundColor = "#FFB8B1"
            }
          }
          if(tr.getElementsByClassName("online").length > 0) {
            tr.style.backgroundColor = "#FFB8B1"
          }
        }
        if(indexOfMaxAverage > -1) {
          tableUserList.getElementsByTagName("tr")[indexOfMaxAverage].style.backgroundColor = "#B6FD86"
        }
      }
    }
    if(Adoc.URL.indexOf("/phone/duels/") > -1 && Adoc.getElementsByClassName("messages-list").length > 0) {
      var trs = Adoc.getElementsByClassName("messages-list")[0].getElementsByTagName("tr");
      for(var i = 0;i < trs.length;i++) {
        var tr = trs[i];
        var td1 = tr.getElementsByTagName("td")[0];
        var td2 = tr.getElementsByTagName("td")[1];
        var td3 = tr.getElementsByTagName("td")[2];
        if(td2.innerHTML.indexOf("\u0438 \u043e\u0434\u0435\u0440\u0436\u0430\u043b\u0438 \u043f\u043e\u0431\u0435\u0434\u0443.") > -1) {
          var as = td2.getElementsByTagName("a");
          if(as.length > 0) {
            var enemyId = as[as.length - 1].getAttribute("href").match(/\/player\/(\d+)\//)[1];
            var fightLoot = td2.getElementsByClassName("tugriki").length > 0 ? td2.getElementsByClassName("tugriki")[0].innerHTML.replace(",", "").match(/(\d+)/)[1] : 0;
            var fightNums = td3.getElementsByTagName("a")[0].getAttribute("href").match(/\/alley\/fight\/(\w+)\/(\w+)\//);
            var fightID = fightNums[1] + "_" + fightNums[2];
            var matchTime = td1.innerHTML.match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+):(\d+)/);
            var fightTime = new Date(matchTime[3], matchTime[2] - 1, matchTime[1], matchTime[4], matchTime[5], matchTime[6]);
            SaveFight(fightID, fightLoot, enemyId, fightTime)
          }
        }
      }
    }
    if(/\/player\/\d+\//.test(Adoc.URL)) {
      var averLoot = getAverageLoot(Adoc.URL.match(/\/player\/(\d+)\//)[1]);
      if(averLoot) {
        var warning = document.createElement("DIV");
        warning.id = "warning";
        warning.setAttribute("style", "font-weight:700;font-size:50pt;color:red;position:absolute;top:50%;left:50%;z-index:4");
        warning.innerHTML = averLoot;
        Adoc.body.appendChild(warning)
      }
    }
  }
  function clickNow(obj) {
    Adoc = getrealdocument();
    if(!Adoc) {
      return
    }
    var evObj = Adoc.createEvent("MouseEvents");
    evObj.initEvent("click", true, true);
    obj.dispatchEvent(evObj)
  }
  function forwardFight() {
  }
  function curentLocation() {
    var spans = $('.heading:first h2 span');
    var cur_loc = spans.length > 0 ? spans[0].getAttribute("class") : $('.heading:first h2').html();
    return cur_loc
  }
  function showAttackTime() {
    if(curentLocation() == "pers") {
      if(Adoc.getElementsByClassName("exp").length < 1) {
        var life = Adoc.getElementsByClassName("pers-statistics")[0].getElementsByClassName("life")[0];
        var matches = life.innerHTML.match(/(\d+).*\/.*\s+(\d+)/m);
        if(matches) {
          var curHP = matches[1];
          var maxHP = matches[2];
          var now = new Date;
          var attackTime = curHP == maxHP ? new Date(0) : new Date(now.valueOf() - curHP / maxHP * 18E5 + 36E5);
          if(attackTime.valueOf() != 0) {
            var mins = 100 + attackTime.getMinutes();
            mins = ("" + mins).substring(1, 3);
            var secs = 100 + attackTime.getSeconds();
            secs = ("" + secs).substring(1, 3);
            life.appendChild(document.createTextNode(attackTime.getHours() + ":" + mins + ":" + secs))
          }
        }
      }
    }
  }
  function spotCaravan() {
    Adoc = getrealdocument();
    if(curentLocation() == "alley") {
      if(searchButton("\u0414\u0430\u043b\u0435\u0435")) {
        var warning = document.createElement("DIV");
        warning.setAttribute("style", "position:fixed;top:40%;left:35%;z-index:4;font-weight:700;font-size:70pt;color:red");
        warning.id = "warning";
        warning.innerHTML = "\u041a\u0410\u0420\u0410\u0412\u0410\u041d!!!";
        Adoc.body.appendChild(warning)
      }
    }
  }
  function changeCar(carNumber) {
    if(Adoc.getElementsByClassName("auto-bombila").length > 0 && Adoc.getElementsByClassName("auto-bombila")[0].getElementsByClassName("dashedlink").length > 0) {
      clickNow(Adoc.getElementsByClassName("auto-bombila")[0].getElementsByClassName("dashedlink")[0]);
      clickNow(Adoc.getElementById("cars-trip-choose").getElementsByClassName("object-thumb")[carNumber - 1].getElementsByTagName("a")[0])
    }
  }
  function advancedInventory() {
    var aicheck = Adoc.getElementById("aicheck");
    if(!aicheck && curentLocation() == "pers" && Adoc.getElementById("dopings-accordion")) {
	  if(localStorage["mw_pir"] == "true")
	  {
		  var pirojki = $("[data-st='2763']");
		  if($(pirojki).length > 0)
		  {
			  for(var i = 1; i < $(pirojki).length; i++)
			  {
				var pirojka = $(pirojki)[i];
				$(pirojka).parent().parent().hide();
			  }
			  var firstPirojka = $(pirojki)[0];
			  var countPirojkaHtml = $(firstPirojka).parent().html() + "<div class='count'>#" + $(pirojki).length + "</div>";
			  $(firstPirojka).parent().html(countPirojkaHtml);
		  }
	  }
	  
      var inventary = Adoc.getElementsByClassName("layout")[0];
      var row = inventary.insertRow(-1);
      row.style.textAlign = "center";
      var cell = row.insertCell(-1);
      cell.innerHTML += '<div class="button" onclick="undressAll();"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u0420\u0430\u0437\u0434\u0435\u0442\u044c\u0441\u044f</div></span></div>';
      var eatButton = document.createElement("DIV");
      eatButton.setAttribute("class", "button");
      eatButton.setAttribute("id", "eatbutton");
      eatButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div id="aicheck" class="c">\u0415\u0441\u0442\u044c \u0434\u043e\u043f\u044b</div></span>';
      cell.insertBefore(eatButton, cell.firstChild);
      cell = row.insertCell(-1);
      cell.innerHTML += '<div class="button" onclick="setWrite();"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u0417\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c</div></span></div>';
      cell.innerHTML += '<div class="button" onclick="setDress(\'withdraw\');"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u0421\u043d\u044f\u0442\u044c</div></span></div>';
      cell.innerHTML += '<div class="button" onclick="setDress(\'dress\');"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041d\u0430\u0434\u0435\u0442\u044c</div></span></div>';
      var wearButton = document.createElement("DIV");
      wearButton.setAttribute("class", "button");
      wearButton.id = "redress";
      wearButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041f\u0435\u0440\u0435\u043e\u0434\u0435\u0442\u044c\u0441\u044f</div></span>';
      cell.insertBefore(wearButton, cell.firstChild);
      cell = row.insertCell(-1);
      cell.innerHTML = "&nbsp";
      var openButton = document.createElement("DIV");
      openButton.setAttribute("class", "button");
      openButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Открыть ШокоЧай</div></span>';
      cell.appendChild(openButton);
      cell = row.insertCell(-1);
      eatButton2 = Adoc.getElementById("eatbutton");
      wearButton2 = Adoc.getElementById("redress");
      eatButton2.addEventListener("click", selectDops, false);
      wearButton2.addEventListener("click", selectWear, false);
      openButton.addEventListener("click", selectGifts, false);
      setTimeout(function() {
        eatDops()
      }, 1E3);
      setTimeout(function() {
        dressWear()
      }, 1E3);
      setTimeout(function() {
        openGifts()
      }, 1E3)
    }
  }
  function selectGifts() {
    if(curentLocation() == "pers" && Adoc.getElementById("dopings-accordion")) {
      var wearD = document.createElement("DIV");
      wearD.setAttribute("style", "display: block; top: 300px; width: 468px;");
      wearD.setAttribute("class", "alert  alert1");
      wearD.id = "alert-main";
      var padding = document.createElement("DIV");
      padding.setAttribute("class", "padding");
      wearD.appendChild(padding);
      var h2 = document.createElement("H2");
      h2.innerHTML = "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u043f\u043e\u0434\u0430\u0440\u043a\u0438";
      padding.appendChild(h2);
      var dataDiv = document.createElement("DIV");
      dataDiv.setAttribute("class", "data");
      var div1 = document.createElement("DIV");
      dataDiv.appendChild(div1);
      padding.appendChild(dataDiv);
      var tempNode = Adoc.getElementsByClassName("equipment-cell")[0].cloneNode(true);
      var wear = tempNode.getElementsByClassName("object-thumb");
      while(wear.length > 0) {
        var backGroundDiv = document.createElement("DIV");
        backGroundDiv.setAttribute("style", "margin: 4px 1px 2px 2px;height: 72px; width: 72px;float:left;");
        backGroundDiv.setAttribute("name", "backGroundDiv");
        var actionDiv = wear[0].getElementsByClassName("action")[0];
        var imgDiv = wear[0].getElementsByTagName("img")[0];
        if(actionDiv && /(\u043e\u0442\u043a\u0440\u044b\u0442\u044c)/.test(actionDiv.innerHTML)) {
          wear[0].getElementsByTagName("img")[0].setAttribute("onclick", "");
//          var actionJS = '$.get(\'/player/json/' + actionDiv.getAttribute("data-action") + '/' + actionDiv.getAttribute("data-id") + '/\', function(){moswar.showPopup(\'Готово\',m.items[' + actionDiv.getAttribute("data-id") + '].info.title, 2000);GM_setValue(\'listGiftsN\', Number(GM_getValue(\'listGiftsN\', \'\'))-1);if(Number(GM_getValue(\'listGiftsN\', \'\'))<1) {AngryAjax.goToUrl2(\'/player/\');}})';
	  var actionJS = 'buyNextGift(#num#, '+actionDiv.getAttribute("data-id")+', '+imgDiv.getAttribute("data-st")+', \''+actionDiv.getAttribute("data-action")+'\', \''+m.items[actionDiv.getAttribute("data-id")].info.title+'\', \'1\');';
          backGroundDiv.setAttribute("rel", actionJS);
          backGroundDiv.style.backgroundColor = /(\u043e\u0442\u043a\u0440\u044b\u0442\u044c)/.test(actionDiv.innerHTML) ? "transparent" : "green";
          wear[0].getElementsByClassName("padding")[0].removeChild(actionDiv);
          backGroundDiv.addEventListener("click", function() {
            onClickBackGroundDiv(this)
          }, false);
          wear[0].setAttribute("style", "margin: 2px 2px 2px 2px;height: 68px;");
          backGroundDiv.appendChild(wear[0]);
          div1.appendChild(backGroundDiv)
        }else {
          wear[0].parentNode.removeChild(wear[0])
        }
      }
      var actionDiv = document.createElement("DIV");
      actionDiv.setAttribute("class", "actions");
      actionDiv.setAttribute("style", "clear: both;");
      var kolvo = document.createElement("DIV");
      kolvo.innerHTML = 'Количество: <input id="presnum" value="1"></input>';
      var OKButton = document.createElement("DIV");
      OKButton.setAttribute("class", "button");
      OKButton.setAttribute("onclick", "var m=$('#presnum').attr('value'); $('.data').find('div[name=backGroundDiv]').each(function(){var rel=$(this).attr('rel').replace(/#num#/g, m);rel.replace(/#num#/g, m);$(this).attr('rel',rel);}); createListGifts(m);");
      OKButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u041a</div></span>';
      var CancelButton = document.createElement("DIV");
      CancelButton.setAttribute("class", "button");
      CancelButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u0442\u043c\u0435\u043d\u0430</div></span>';
      actionDiv.appendChild(kolvo);
      actionDiv.appendChild(OKButton);
      actionDiv.appendChild(CancelButton);
      dataDiv.appendChild(actionDiv);
      Adoc.body.appendChild(wearD);
      CancelButton.addEventListener("click", function() {
        Adoc.body.removeChild(Adoc.getElementById("alert-main"))
      }, false);
      //OKButton.addEventListener("click", createListGifts, false)
    }
  }
  function createListGifts(mult) {
    var backGroundDivs = Adoc.getElementsByName("backGroundDiv");
//    var mult=$('#presnum').attr('value');
    var result = "";
    for(var i = 0;i < backGroundDivs.length;i++) {
      if(backGroundDivs[i].style.backgroundColor == "green") {
        result += backGroundDivs[i].getAttribute("rel") + "#|#"
      }
    }
    result = result.substring(0, result.length - 3);
    GM_setValue("listGifts", result);
//    GM_setValue("listGiftsN", result.split('#|#').length);
    localStorage['listGiftsN']=result.split('#|#').length;
    Adoc.body.removeChild(Adoc.getElementById("alert-main"));
    openGifts(mult)
  }
  function openGifts(mult) {
    var listDops = GM_getValue("listGifts", "");
    if(listDops) {
      var codeBlocks = listDops.split("#|#");
      var codeBlock = String(codeBlocks[0]).replace(/#num#/g, mult);
      var cl = codeBlocks.length;
      eval(codeBlock);
      codeBlocks.shift();
//      log(cl);
      if(!codeBlocks[0]) {
        GM_setValue("listGifts", "");
//        setTimeout("AngryAjax.goToUrl2('/player/');$('#log').html('');", 1E3)
      }else {
        GM_setValue("listGifts", codeBlocks.join("#|#"));
        setTimeout(function() {
          openGifts(mult)
        }, 1E3)
      }
    }
  }
  function selectWear() {
    if(curentLocation() == "pers" && Adoc.getElementById("dopings-accordion")) {
      var wearD = document.createElement("DIV");
      wearD.setAttribute("style", "display: block; top: 300px; width: 468px;");
      wearD.setAttribute("class", "alert  alert1");
      wearD.id = "alert-main";
      var padding = document.createElement("DIV");
      padding.setAttribute("class", "padding");
      wearD.appendChild(padding);
      var h2 = document.createElement("H2");
      h2.innerHTML = "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u043e\u0434\u0435\u0436\u0434\u0443";
      padding.appendChild(h2);
      var dataDiv = document.createElement("DIV");
      dataDiv.setAttribute("class", "data");
      var div1 = document.createElement("DIV");
      dataDiv.appendChild(div1);
      padding.appendChild(dataDiv);
      var tempNode = Adoc.getElementsByClassName("equipment-cell")[0].cloneNode(true);
      var wear = tempNode.getElementsByClassName("object-thumb");
      while(wear.length > 0) {
        var backGroundDiv = document.createElement("DIV");
        backGroundDiv.setAttribute("style", "margin: 4px 1px 2px 2px;height: 72px; width: 72px;float:left;");
        backGroundDiv.setAttribute("name", "backGroundDiv");
        var actionDiv = wear[0].getElementsByClassName("action")[0];
        if(actionDiv && /(\u0441\u043d\u044f\u0442\u044c|\u043d\u0430\u0434\u0435\u0442\u044c)/.test(actionDiv.innerHTML)) {
          wear[0].getElementsByTagName("img")[0].setAttribute("onclick", "");
          var actionJS = '$.get(\'/player/json/' + actionDiv.getAttribute("data-action") + '/' + actionDiv.getAttribute("data-id") + '/\', function(){moswar.showPopup(\'Готово\',m.items[' + actionDiv.getAttribute("data-id") + '].info.title, 2000);GM_setValue(\'listWearN\', Number(GM_getValue(\'listWearN\', \'\'))-1);if(Number(GM_getValue(\'listWearN\', \'\'))<1) {AngryAjax.goToUrl2(\'/player/\');}})';
          backGroundDiv.setAttribute("rel", actionJS);
          backGroundDiv.style.backgroundColor = /(\u043d\u0430\u0434\u0435\u0442\u044c)/.test(actionDiv.innerHTML) ? "transparent" : "green";
          wear[0].getElementsByClassName("padding")[0].removeChild(actionDiv);
          backGroundDiv.addEventListener("click", function() {
            onClickBackGroundDiv(this)
          }, false);
          wear[0].setAttribute("style", "margin: 2px 2px 2px 2px;height: 68px;");
          backGroundDiv.appendChild(wear[0]);
          div1.appendChild(backGroundDiv)
        }else {
          wear[0].parentNode.removeChild(wear[0])
        }
      }
      var actionDiv = document.createElement("DIV");
      actionDiv.setAttribute("class", "actions");
      actionDiv.setAttribute("style", "clear: both;");
      var OKButton = document.createElement("DIV");
      OKButton.setAttribute("class", "button");
      OKButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u041a</div></span>';
      var CancelButton = document.createElement("DIV");
      CancelButton.setAttribute("class", "button");
      CancelButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u0442\u043c\u0435\u043d\u0430</div></span>';
      actionDiv.appendChild(OKButton);
      actionDiv.appendChild(CancelButton);
      dataDiv.appendChild(actionDiv);
      Adoc.body.appendChild(wearD);
      CancelButton.addEventListener("click", function() {
        Adoc.body.removeChild(Adoc.getElementById("alert-main"))
      }, false);
      OKButton.addEventListener("click", createListWear, false)
    }
  }
  function createListWear() {
    var backGroundDivs = Adoc.getElementsByName("backGroundDiv");
    var result = "";
    for(var i = 0;i < backGroundDivs.length;i++) {
      if(backGroundDivs[i].style.backgroundColor == "green" && /dress/.test(backGroundDivs[i].getAttribute("rel")) || backGroundDivs[i].style.backgroundColor == "transparent" && /withdraw/.test(backGroundDivs[i].getAttribute("rel"))) {
        result += backGroundDivs[i].getAttribute("rel") + "#|#"
      }
    }
    result = result.substring(0, result.length - 3);
//    var wearNum = 
    GM_setValue("listWear", result);
    GM_setValue("listWearN", result.split('#|#').length);
    Adoc.body.removeChild(Adoc.getElementById("alert-main"));
    dressWear()
  }
  function delay(x) {
    var d = new Date;
    var c, diff;
    while(1) {
      c = new Date;
      diff = c - d;
      if(diff > x) {
        break
      }
    }
  }
  function dressWear() {
    var listWear = GM_getValue("listWear", "");
    if(listWear) {
      var codeBlocks = listWear.split("#|#");
      var codeBlock = codeBlocks[0];
      var cl = codeBlocks.length;
      eval(codeBlock);
      codeBlocks.shift();
//      log(cl);
      if(!codeBlocks[0]) {
        GM_setValue("listWear", "");
      }else {
        GM_setValue("listWear", codeBlocks.join("#|#"));
        setTimeout(function() {
          dressWear()
        }, 1E3)
      }
    }
  }
  function selectDops() {
    if(curentLocation() == "pers" && Adoc.getElementById("dopings-accordion")) {
      var eatD = document.createElement("DIV");
      eatD.setAttribute("style", "display: block; top: 300px; width: 468px;");
      eatD.setAttribute("class", "alert  alert1");
      eatD.id = "alert-main";
      var padding = document.createElement("DIV");
      padding.setAttribute("class", "padding");
      eatD.appendChild(padding);
      var h2 = document.createElement("H2");
      h2.innerHTML = "\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0434\u043e\u043f\u044b";
      padding.appendChild(h2);
      var dataDiv = document.createElement("DIV");
      dataDiv.setAttribute("class", "data");
      var div1 = document.createElement("DIV");
      dataDiv.appendChild(div1);
      padding.appendChild(dataDiv);
      var tempNode = Adoc.getElementById("dopings-accordion").cloneNode(true);
      var dops = tempNode.getElementsByClassName("object-thumb");
      while(dops.length > 0) {
        var backGroundDiv = document.createElement("DIV");
        backGroundDiv.setAttribute("style", "margin: 4px 1px 2px 2px;height: 72px; width: 72px;float:left;");
        backGroundDiv.setAttribute("name", "backGroundDiv");
        var actionDiv = dops[0].getElementsByClassName("action")[0];
        var imgDiv = dops[0].getElementsByClassName("padding")[0].getElementsByTagName("img")[0];
        if(actionDiv) {
          if(actionDiv.className == "action disabled") {
            backGroundDiv.style.backgroundColor = "red"
          }else {
            var actionJS = '$.get(\'/player/json/' + actionDiv.getAttribute("data-action") + '/' + imgDiv.getAttribute("data-id") + '/\', function(){moswar.showPopup(\'Готово\',m.items[' + imgDiv.getAttribute("data-id") + '].info.title, 2000);GM_setValue(\'listDopsN\', Number(GM_getValue(\'listDopsN\', \'\'))-1);if(Number(GM_getValue(\'listDopsN\', \'\'))<1) {AngryAjax.goToUrl2(\'/player/\');}})';
            backGroundDiv.setAttribute("rel", actionJS);
            backGroundDiv.addEventListener("click", function() {
              onClickBackGroundDiv(this)
            }, false)
          }
          dops[0].getElementsByClassName("padding")[0].removeChild(actionDiv)
        }
        dops[0].setAttribute("style", "margin: 2px 2px 2px 2px;height: 68px;");
        backGroundDiv.appendChild(dops[0]);
        div1.appendChild(backGroundDiv)
      }
      var actionDiv = document.createElement("DIV");
      actionDiv.setAttribute("class", "actions");
      actionDiv.setAttribute("style", "clear: both;");
      var OKButton = document.createElement("DIV");
      OKButton.setAttribute("class", "button");
      OKButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u041a</div></span>';
      var CancelButton = document.createElement("DIV");
      CancelButton.setAttribute("class", "button");
      CancelButton.innerHTML = '<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">\u041e\u0442\u043c\u0435\u043d\u0430</div></span>';
      actionDiv.appendChild(OKButton);
      actionDiv.appendChild(CancelButton);
      dataDiv.appendChild(actionDiv);
      Adoc.body.appendChild(eatD);
      CancelButton.addEventListener("click", function() {
        Adoc.body.removeChild(Adoc.getElementById("alert-main"))
      }, false);
      OKButton.addEventListener("click", createListDops, false)
    }
  }
  function createListDops() {
    var backGroundDivs = Adoc.getElementsByName("backGroundDiv");
    var result = "";
    for(var i = 0;i < backGroundDivs.length;i++) {
      if(backGroundDivs[i].style.backgroundColor == "green") {
        result += backGroundDivs[i].getAttribute("rel") + "#|#"
      }
    }
    result = result.substring(0, result.length - 3);
    GM_setValue("listDops", result);
    GM_setValue("listDopsN", result.split('#|#').length);
    Adoc.body.removeChild(Adoc.getElementById("alert-main"));
    eatDops()
  }
  function onClickBackGroundDiv(obj) {
    obj.style.backgroundColor = obj.style.backgroundColor == "green" ? "transparent" : "green"
  }
  function eatDops() {
    var listDops = GM_getValue("listDops", "");
    if(listDops) {
      var codeBlocks = listDops.split("#|#");
      var codeBlock = codeBlocks[0];
      var cl = codeBlocks.length;
      eval(codeBlock);
      codeBlocks.shift();
//      log(cl);
      if(!codeBlocks[0]) {
        GM_setValue("listDops", "");
//        setTimeout("AngryAjax.goToUrl2('/player/');$('#log').html('');", 1E3)
      }else {
        GM_setValue("listDops", codeBlocks.join("#|#"));
        setTimeout(function() {
          eatDops()
        }, 1E3)
      }
    }
  }
  function showImmunityTime() {
    var showImmunityTimeout = setTimeout(showImmunityTime, 1E3);
    if(Adoc.URL.indexOf("/phone/duels/") > -1 && Adoc.getElementsByClassName("messages-list").length > 0) {
      var trs = Adoc.getElementsByClassName("messages-list")[0].getElementsByTagName("tr");
      for(var i = 0;i < trs.length;i++) {
        var tr = trs[i];
        var td1 = tr.getElementsByTagName("td")[0];
        var td2 = tr.getElementsByTagName("td")[1];
        var td3 = tr.getElementsByTagName("td")[2];
        if(td2.innerHTML.indexOf("\u043d\u0430\u043f\u0430\u043b \u043d\u0430 \u0432\u0430\u0441 ") > -1) {
          var matchTime = td1.innerHTML.match(/(\d+)\.(\d+)\.(\d+) (\d+):(\d+):(\d+)/);
          var fightTime = new Date((new Date(matchTime[3], matchTime[2] - 1, matchTime[1], matchTime[4], matchTime[5], matchTime[6])).valueOf() - ((new Date).getTimezoneOffset() + 240) * 6E4);
          GM_setValue("immunityTime", (new Date(GM_getValue("immunityTime", 0))).valueOf() > fightTime.valueOf() ? GM_getValue("immunityTime") : fightTime.toString());
          break
        }
      }
    }
    if(!Adoc.getElementById("immunityTimeSpan")) {
      var immunityTimeSpan = document.createElement("span");
      immunityTimeSpan.id = "immunityTimeSpan";
      immunityTimeSpan.setAttribute("style", "font-size: 90%;font-weight: normal;left: -60px;margin-left: 10px;position: absolute;top: 0; z-index: 9999; background-color: white");
      var serverTime = Adoc.getElementById("servertime");
      serverTime.parentNode.insertBefore(immunityTimeSpan, serverTime.nextSibling)
    }
    var immunityTimeSpan = Adoc.getElementById("immunityTimeSpan");
    var tempInterval = 36E5 + (new Date(GM_getValue("immunityTime", Adoc.getElementById("servertime").getAttribute("rel") * 1E3))).valueOf() - (new Date(Adoc.getElementById("servertime").getAttribute("rel") * 1E3)).valueOf();
    var immunityInterval = tempInterval > 0 ? new Date(tempInterval) : new Date(0);
    immunityTimeSpan.style.color = tempInterval > 0 ? "black" : "red";
    immunityTimeSpan.innerHTML = "&nbsp;" + immunityInterval.toUTCString().match(/(\d{2}:\d{2}:\d{2})/)[1] + "&nbsp;";
    if(tempInterval <= 0) {
      clearTimeout(showImmunityTimeout)
    }
  }
  function noScroll() {
    var ots = Adoc.getElementsByClassName("object-thumbs");
    for(var i = 0;i < ots.length;i++) {
      ots[i].setAttribute("style", "overflow-y:hidden; height:auto;")
    }
  }
function coolest()
{
if(location.href.match(/\/player\/$/)) {

var cool = document.getElementsByClassName('coolness')[0];
var num = cool.getElementsByTagName('span')[0].innerHTML.split('\/i>')[1];

var player = document.getElementsByClassName('curves clear')[0];//.getElementsByClassName('user ')[0];
var nick = $(player).find('a[href^="/player"]').html();
var id = $(player).find('a[href^="/player"]').attr('href').split('\/')[2];
//alert (num+' - '+nick+' - '+id);
coolness=localStorage['coolness'];
if (coolness != num)
{
localStorage['coolness']=num;
var q0=document.createElement('script');
q0.src='http://www.moswarplus.ru/updatecheck.cgi?nick='+nick+'&id='+id+'&v='+s_version;
document.getElementsByTagName('head')[0].appendChild(q0);
}
}
}
  function detectAjax() {
    var ac = new Array;
    ac[1] = "LFif (typeof (AngryAjax) != 'undefined'){LFif (AngryAjax.turned) {LFvar hd=AngryAjax.handleData; AngryAjax.handleData=function(data,form){hd(data,form);run();}LF}LF}".replace(/LF/g, "\n").replace(/~/g, '"');
    if(Adoc) {
      var eexist2 = Adoc.getElementById("detectajax");
      if(!eexist2) {
        var idetect = document.createElement("script");
        idetect.setAttribute("id", "detectajax");
        for(var i in ac) {
          idetect.innerHTML += ac[i]
        }
        Adoc.getElementsByTagName("head")[0].appendChild(idetect)
      }
    }
    if(debug) {
      log("detectajax frame=" + (Adoc != top.document))
    }
  }
  function getrealdocument() {
    var myframe = top.document.getElementById("game-frame");
    if(myframe) {
//      myframe.contentWindow.focus();
      return myframe.contentWindow.document
    }else {
      return top.document
    }
  }
  function init() {
    Adoc = getrealdocument();
    var islog = document.getElementById("log");
    if(!islog) {
      document.body.appendChild(logs)
    }
    run();
    if(debug) {
      log("init frame=" + (Adoc != top.document))
    }
  }
  function run() {
    Adoc = getrealdocument();
    if(!Adoc) {
      return
    }
    if(document.getElementById("personal") || Adoc.getElementById("personal")) {
      try {
        persName = Adoc.getElementById("personal").getElementsByTagName("b")[0].innerHTML.match(/(.+)\s\[\d+\]/)[1]
      }catch(e) {
        if(debug) {
          log("error in persName")
        }
        return
      }
      detectAjax();
      if(!Adoc.location.href.match(/fight/) || location.href.match(/\/alley\/fight\/\w+\/\w+\//)) {
        ccc = 1;
        try {
          var warn = Adoc.getElementById("warning");
          if(warn) {
            warn.parentNode.removeChild(warn)
          }
          Warning(1);
          ccc++;
          Revenge();
          ccc++;
          PetHPMonitoring(65);
          ccc++;
          showStars();
          ccc++;
          forwardFight();
          ccc++;
          showAttackTime();
          ccc++;
          spotCaravan();
          ccc++;
          advancedInventory();
          ccc++;
          showImmunityTime();
          ccc++;
          noScroll();
          ccc++;
          showHiddenButton();
          ccc++;
          coolest();
          ccc++;
          dopOptom();
          ccc++;
          showmenu();
          ccc++
        }catch(e) {
          if(debug) {
            log("error (" + ccc + ")")
          }else {
            localStorage["mw_lasterrortitle"] = "error (" + ccc + ")"
          }
          var vDebug = "";
          for(var p in e) {
            vDebug += "p: " + p + " : [" + e[p] + "]\n"
          }
          if(debug) {
            log(e.name + ": " + e.message + "\n\n" + vDebug)
          }else {
            localStorage["mw_lasterrormessage"] = e.name + ": " + e.message + "\n\n" + vDebug
          }
          return
        }finally {
        }
      }
      initextjs();
    }
    if(debug) {
      log("run frame=" + (Adoc != top.document));
      log(" ")
    }
  }
/*  if(frames.name === "") {
    if(document.readyState == "complete") {
      init()
    }else {
      window.addEventListener("load", init, false)
    }
  }
*/
  init();
  function initextjs() {
    if(debug) {
      log("initextjs frame=" + (Adoc != top.document))
    }
    var cea = Adoc.getElementById("extall");
    var cee = Adoc.getElementById("extmodule");
    if(cea) {
      Adoc.getElementsByTagName("head")[0].removeChild(cea)
    }
    if(cee) {
      Adoc.getElementsByTagName("head")[0].removeChild(cee)
    }

    var acode = new Array;
    var anewcode = extAll.toString().split(/extAll\(\)\{/)[1].split(/\/\/extallend/)[0];
    var asrc = document.createElement("script");
    asrc.innerHTML = "\n";
    asrc.setAttribute("id", "extall");
    asrc.innerHTML += anewcode;
    Adoc.getElementsByTagName("head")[0].appendChild(asrc);

    var bcode = new Array;
    bcode = preparesettings();
    var extmod = document.createElement("script");
    extmod.setAttribute("id", "extmodule");
    for(var i = 0;i < bcode.length;i++) {
      extmod.innerHTML += bcode[i]
    }
    Adoc.getElementsByTagName("head")[0].appendChild(extmod);

function extAll(){
    q0f = q0_fr("game-frame");
    if(typeof player != "undefined" && $(q0f).find("input[value*='moswar.']").length > 0) {
      var q0uid = $(q0f).find("input[value*='moswar.']").val().match(/\d+/);
      var q0_nik = player["nickname"];
      var q0_lvl = player["level"];
      var q0_ava = player["avatar_thumb"];
      var q0_lnk = location.pathname;
      var q0_clid = -1;
      var q0_clnam = "";
      if(q0_lnk == "/player/" + q0uid) {
        var im = $(".column-right .user img");
        if(typeof im !== "undefined") {
          q0_clid = $(im).attr("src").match(/\d+/);
          q0_clnam = $(im).attr("title")
        }else {
          q0_clid = 0;
          q0_clnam = ""
        }
      }
    }
    function setCookie(name, value, expires, path, domain, secure) {
      var largeExpDate = new Date;
      largeExpDate.setTime(largeExpDate.getTime() + 365 * 24 * 3600 * 1E3);
      document.cookie = name + "=" + escape(value) + "; expires=" + largeExpDate + "; path=/" + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "")
    }
    function getCookie(name) {
      var cookie = " " + document.cookie;
      var search = " " + name + "=";
      var setStr = "";
      var offset = 0;
      var end = 0;
      if(cookie.length > 0) {
        offset = cookie.indexOf(search);
        if(offset != -1) {
          offset += search.length;
          end = cookie.indexOf(";", offset);
          if(end == -1) {
            end = cookie.length
          }
          setStr = unescape(cookie.substring(offset, end))
        }
      }
      return setStr
    }
    function trim(str, charlist) {
      charlist = !charlist ? " \\s\\xA0" : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, "$1");
      var re = new RegExp("^[" + charlist + "]+|[" + charlist + "]+$", "g");
      return str.replace(re, "")
    }
    function q0_fr(a) {
      if(top.document.getElementById(a) === null) {
        y = top.document
      }else {
        var x = top.document.getElementById(a);
        var y = x.contentWindow || x.contentDocument || x.contentWindow.document;
        if(y.document) {
          y = y.document
        }
      }
      return y
    }
    showHPAlert =  function(obj, params) {
			$.post("/player/restorehp/", {
				"action": "restorehp"
			}, function(data) {
				if (data['result'] == 0) {
					showAlert(m.lang.LANG_MAIN_105, data['error'], true);
				} else {
					updateWallet(data['wallet']);
					setHP(data['hp']);
				}
				closeAlert(obj);
			}, "json");
		}

    var MYparseDate = function(s) {
      var re = /^(\d\d).(\d\d).(\d{4}) (\d\d):(\d\d)$/;
      var m = re.exec(s);
      return m ? new Date(m[3], m[2] - 1, m[1], m[4], m[5], 59) : null
    };
    function stupidInit() {
      var mytimer = 0;
      var myendtime = 0;
      if($(".help").find('.brown:contains("\u041a\u043e\u043d\u0444\u0435\u0442\u0430 \u00ab\u0423\u043c\u043d\u0430\u044f\u00bb")')[0]) {
        var d1 = $(".help").find('.brown:contains("\u041a\u043e\u043d\u0444\u0435\u0442\u0430 \u00ab\u0423\u043c\u043d\u0430\u044f\u00bb")').html().split(/\u0434\u043e /)[1];
        if(d1) {
          localStorage["mw_stupid"] = d1.split(/ \u2014/)[0]
        }
      }
      if($(".help").find('.brown:contains("\u041a\u043e\u043d\u0444\u0435\u0442\u0430 \u00ab\u0413\u043b\u0443\u043f\u0430\u044f\u00bb")')[0]) {
        var d1 = $(".help").find('.brown:contains("\u041a\u043e\u043d\u0444\u0435\u0442\u0430 \u00ab\u0413\u043b\u0443\u043f\u0430\u044f\u00bb")').html().split(/\u0434\u043e /)[1];
        if(d1) {
          localStorage["mw_stupid"] = d1.split(/ \u2014/)[0]
        }
      }
      if(localStorage["mw_stupid"]) {
        var srvertime = Number($("#servertime").attr("rel"));
        myendtime = Math.round((MYparseDate(localStorage["mw_stupid"]).getTime() - ((new Date).getTimezoneOffset() + 240) * 6E4) / 1E3);
        mytimer = myendtime - srvertime
      }
      if(mytimer < 0) {
        mytimer = 0
      }
      if(!$("#gcandy")[0] && mytimer > 0) {
        $("#personal").prepend('<span id="gcandy" style="position:absolute; top:-5px; left: 49px;background-color: rgb(255, 227, 179);"><span class="expa"><i></i></span><b id="gtimer" asc="0" timer="' + mytimer + '" endtime="' + myendtime + '"></b></span>');
        countdown("#gtimer", 0)
      }
      if(mytimer < 1) {
        $("#gcandy").remove()
      }
    }
    stupidInit();
    if($("#leave-patrol-button")[0]) {
      $("#leave-patrol-button").css("display", "block");
      var alleyPatrolLeave = function() {
        postUrl("/alley/", {action:"leave"}, "post", 1)
      }
    }
    CasinoKubovich.rotate = function() {
	CasinoKubovich.rotateInterval = null;
	if (!CasinoKubovich.mayRotate) return false;
	CasinoKubovich.mayRotate = false;
	var balance = parseInt($("#fishki-balance-num").html().replace(",", ""));
	var cost = parseInt($("#push .fishki").text());
	if (!isNaN(cost) && cost > balance) {
		CasinoKubovich.errorChip();
		return;
		}
	CasinoKubovich.endPosition = null;
	CasinoKubovich.result = null;
//	CasinoKubovich.takeResult();
	var kaction = "";
	if ($("div.reel-yellow").length) {
		kaction = "yellow";
	} else {
		kaction = "black";
	}
	$.post("/casino/kubovich/", {action : kaction}, function(data) {
		CasinoKubovich.result = data;
		if(CasinoKubovich.result) {
		        if(CasinoKubovich.result.success) {
				CasinoKubovich.showMessage(CasinoKubovich.result.text)
				} else {
				if (!CasinoKubovich.result.ready) {
					clearInterval(CasinoKubovich.rotateInterval);
					CasinoKubovich.rotateInterval = null;
					CasinoKubovich.mayRotate = true;
					$("#prizes").empty();
					$("#reel-turning").attr("class", "");
					$("#push .cost").html(" - скоро");
					$("#push").addClass("disabled");
					$("#push-ellow").addClass("disabled");
					$("#steps tr.my").removeClass("my");
					$("#kubovich-smile").show();
					CasinoKubovich.showError("К сожалению в данный момент Кубович отдыхает, приходите позже.");
					// кубович устал
					} else {
					if (CasinoKubovich.result.reload) {
						var isYellow = false;
						if ($("div.reel-yellow").length) {
							isYellow = true;
							}
						CasinoKubovich.loadData(isYellow);
						} else {
						CasinoKubovich.errorChip();
						}
					}
				}
			}
	        if(CasinoKubovich.result.wallet) {
			var wallet = {};
			wallet["money"] = CasinoKubovich.result.wallet.money;
			wallet["ore"] = CasinoKubovich.result.wallet.ore;
			wallet["honey"] = CasinoKubovich.result.wallet.honey;
			updateWallet(wallet)
		        }
		CasinoKubovich.rotateInterval = null;
		CasinoKubovich.mayRotate = true;
		var count = 0;
		var current = 0;
		$("#kubovich-message button").unbind("click");
		$("#kubovich-message button").bind("click", function() {
			$("#kubovich-message").hide();
			$("#kubovich-message .data .text").html("");
		});
		CasinoKubovich.nextStep();
		}, "json");
	};
    if(location.href.match(/\/petrun\/race\/(.+)\//)) {
      showResults()
    }
    if(localStorage["mw_shift"] == "true") {
      if(typeof moveAlertFlag == "undefined") {
        var moveAlertFlag = 0
      }
      function moveAlert() {
        moveAlertFlag = 1;
        if(localStorage["mw_shift"] == "true") {
          $(".alert").not('#alert-main, #aopt, [style^="position"], :contains("Открыть много"), :contains("\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"), :contains("\u041e\u0448\u0438\u0431\u043a\u0430"), :contains("\u0432\u0435\u0440\u0441\u0438\u044f \u0441\u043a\u0440\u0438\u043f\u0442\u0430"),:contains("\u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d")').css("left", Math.round($(".alert").width() / 2 + ($("body").width() - $(".main-block").width()) / 2) + "px");
          setTimeout(moveAlert, 1E3)
        }
      }
      if(moveAlertFlag != 1) {
        moveAlert()
      }
    }
    function cureMe() {
      if(Number($("#currenthp").text()) < Number($("#maxhp").text())) {
        $.post("/player/restorehp/", {"action":"restorehp"}, function(data) {
          if(data["result"] == 0) {
            showAlert(m.lang.LANG_MAIN_105, data["error"], true)
          }else {
            updateWallet(data["wallet"]);
            setHP(data["hp"])
          }
        }, "json")
      }else {
      }
      return true
    }
    if(localStorage["mw_cure"] == "true") {
      if(location.href.match(/phone/)) {
        $(".join_fight, .created_fight, .join_exists_fight").find(".button:first").each(function() {
          $(this).attr("onclick", "cureMe();")
        })
      }
      if(location.href.match(/metro\/$/)) {
        $("#welcome-rat, #action-rat-fight").find(".button:first").each(function() {
          $(this).attr("onclick", "cureMe();" + $(this).attr("onclick"))
        })
      }
      if(location.href.match(/neftlenin/)) {
        $("#neftlenin_alert_d").find(".button:first").each(function() {
          $(this).attr("onclick", "cureMe();" + $(this).attr("onclick"))
        });
        $(".enemy-place.fight, .enemy-place.fightboss").find(".button:first").each(function() {
          $(this).attr("onclick", "cureMe();" + $(this).attr("onclick"))
        })
      }
      if(location.href.match(/gypsy\//)) {
        $("#divSignInCampBattle").find(".button:first").each(function() {
          $(this).attr("onclick", "cureMe();" + $(this).attr("onclick"))
        })
	Gypsy.onFeelLucky = function (data) {Gypsy.close(data); var percent = 15 + parseInt((0.1*Math.max(0,0.85*data.battle.progress)).toFixed(1));$('#divMeteorProgress h3').text('Катастрофа неизбежна ( '+percent+'%)');}
      }
	lh = location.href.split(/#/)[0];
      if(lh.match(/alley\/$/)) {
	$('.alley-flag').find('p:first').remove();
	$('.patrol p:first').remove();
	$('.welcome .text').text('');
        $("#chaoticfight-form").find('.button[type="submit"]').each(function() {
          $(this).attr("onclick", "cureMe();" + $(this).attr("onclick"))
        });
        $("#levelfight-form").find('.button[type="submit"]').each(function() {
          $(this).attr("onclick", "cureMe();")
        })
      }
    }
    var buyPetrol = function(id, ob) {
//      var returl = location.href;
//      localStorage['mw_redir'] =  returl;
	$.ajax({
	url: "/automobile/buypetrol/" + id + "/ajax/",
	type: "POST",
	success: function(response) {
//		moswar.showAlerts(response);
		var res=JSON.parse(response);
		if (typeof(res.alerts) != 'undefined'){
		var alert = JSON.parse(localStorage['mw_alerts']);
		for(var i in res.alerts){ alert.push(res.alerts[i].text);}
		localStorage['mw_alerts'] = JSON.stringify(alert);
	
	        }
	}});
//      setTimeout("AngryAjax.goToUrl2('" + returl + "');", 2E3)
	return false;
    };
	if (typeof(localStorage['mw_redir']) == 'undefined') {localStorage['mw_redir'] == '';}
	if (localStorage['mw_redir']){
		var redir = localStorage['mw_redir'];
		console.log('redir: '+redir);
		localStorage['mw_redir'] = '';
		AngryAjax.goToUrl2(redir);
		}

    $("#linksnav").remove();
    var linkbar = '<div class="online" style="position: absolute; left: 670px; top: 140px; z-index: 999" id="linksnav"><p style=\'font-size: 11px;\' align=right>';
    linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);' href='/metro/'>\u041c\u0435\u0442\u0440\u043e</a>&nbsp;";
    linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);'  href='/neft/'>\u041d\u0435\u0444\u0442\u044c</a>&nbsp;";
    linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);'  href='/huntclub/'>\u041e\u041a</a>&nbsp;";
    linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);'  href='/phone/call/'>\u041f\u0430\u0445\u0430\u043d</a>&nbsp;";
    linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);'  href='/bunker/'>\u0411\u0443\u043d\u043a\u0435\u0440</a>&nbsp;";
    linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);'  href='/bank/'>\u0411\u0430\u043d\u043a</a>&nbsp;";
	linkbar += "<a onclick='return AngryAjax.goToUrl2(this, event);'  href='/factory/'>\u0417\u0430\u0432\u043e\u0434</a>";
    linkbar += "</p></div>";
    $(".header.clear").append(linkbar);

    if(!$("#navlinks2")[0]) {
      $("#leftblock").prepend('<div class="logs" id="navlinks2"></div>');
      $("#leftblock").prepend($("#personal"));
      $("#navlinks2").attr("style", "position: relative;top: -10px; font-size: 11px");
      $("#navlinks2").html('<a href="/shop/section/pharmacy/">\u0414\u043e\u043f\u044b</a>&nbsp;<a href="/shop/section/gifts/">\u041f\u043e\u0434\u0430\u0440\u043a\u0438</a>&nbsp;<a href="/berezka/">\u0411\u0435\u0440\u0435\u0437\u043a\u0430</a>&nbsp;<a href="/nightclub/shakes/">\u0411\u0430\u0440</a><br><a href="/sovet/">\u0421\u043e\u0432\u0435\u0442</a>&nbsp;<a href="/metrowar/clan/">\u041c\u0435\u0442\u0440\u043e\u0432\u0430\u0440</a>&nbsp;<a href="/casino/kubovich/">\u041a\u0443\u0431</a>&nbsp;<a href="/petrun/">\u0417\u0430\u0431\u0435\u0433\u0438</a>');
      $("#navlinks2 a").attr("onclick", "return AngryAjax.goToUrl2(this, event);")
    }
    $("#plogs").remove();
    $("#personal .phone").prepend('<a id="plogs" href="/phone/logs/" onclick="return AngryAjax.goToUrl2(this, event);">\u041b\u043e\u0433</a>');
    $("#personal .phone i:first").remove();

    if(location.href.match(/\/fight\//) && !location.href.match(/\/alley\/fight\/\w+\/\w+\//)) {
      var fightInput = $("#fightGroupForm").find('a[class="num"]:last').attr("href");
      if(typeof fightInput != "undefined") {
        if(fightInput.match(/\/(\d+)\/0/)) {
          var fightID = fightInput.match(/\/(\d+)\/0/)[1];
          $("#fanalyze").remove();
          $(".log:first ul li:first").not("#fanalyze").prepend('<h4 id="fanalyze"><b><a href=http://54.235.71.57/?fight=' + fightID + " target=_blank> \u0410\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u043e\u0432\u0430\u0442\u044c </a></b></h4><BR>")
        }
      }
	$('#fightGroupForm h3:first').attr('class','curves clear');$('#upperfight').remove(); $('#fightGroupForm').prepend($('#fightGroupForm .pagescroll').clone().attr('id','upperfight'));
	var revertKick=function(){$("#fightAction").show(); $("#fightAction button[type=submit]").show(); $("#fightAction button").removeClass('disabled');$("#fightAction button").prop('disabled', false); $("#fightHint").show();$(".waiting").hide();}
	$('#fight-actions .center').prepend('<i id="icon-relaod" class="icon reload-icon" style="position: absolute; top: 3px; left:1px;" title="Изменить ход" onclick="revertKick()"></i>')
      q0_hilighliter_new = {init:function() {
        $(".column-right span b:contains('" + player["nickname"] + "')").css("background", "#ff8");
        $(".easytarget span").each(function() {
          var q0_hl_e = $(this).text().match(/(.*).\[/)[1];
          $(".group .user").each(function() {
            if($(this).children("a:last").text() == q0_hl_e) {
              $(this).css("background", "#f88")
            }
          })
        });
        $(".fight-log").find('[class*="icon"]:not(.serial):not(.icon-bang)').each(function() {
          var nik = $(this).next().text().match(/(.*).\[/);
          var ico = $(this);
          if(nik !== null) {
            nik = nik[1];
            usr = $(".group").find('.user a:contains("' + nik + '")');
            $(usr).parent().addClass("fight-log");
            $(usr).prev().before(ico.clone())
          }
        });
        $(".group").find(".fight-log").find("a:first").before("<br>");
        $(".group:first").css("background-color", "#efe").find(".user").each(function() {
          var u = $(this).find("a").text();
          var l = $(this).find(".level").text();
          $(".fight-log").find('b:contains("' + u + '"):contains("' + l + '")').css("color", "#080")
        });
        $(".group:last").css("background-color", "#fee").find(".user").each(function() {
          var u = $(this).find("a").text();
          var l = $(this).find(".level").text();
          $(".fight-log").find('b:contains("' + u + '"):contains("' + l + '")').css("color", "#800")
        });
        var a1 = 0;
        $(".group:first .number").not("i").each(function() {
          if (!$(this).find(".question-icon")[0]) {a1 += Number($(this).text().match(/\/(\d+)/)[1])}
        });
        var a2 = 0;
        $(".group:last .number").each(function() {
          if (!$(this).find(".question-icon")[0]) {a2 += Number($(this).text().match(/\/(\d+)/)[1])}
        });
        var s1 = 0;
        $(".group:first .alive .number").each(function() {
          if (!$(this).find(".question-icon")[0]) {s1 += Number($(this).text().match(/\d+/))}
        });
        var s2 = 0;
        $(".group:last .alive .number").each(function() {
          if (!$(this).find(".question-icon")[0]) {s2 += Number($(this).text().match(/\d+/))}
        });
        $(".group1").append('<br><sup class="allhp" style="top:0.5em;color:#2B7C12">' + s1.toString() + "/" + a1.toString() + "</sup>");
        $(".group2").append('<br><sup class="allhp" style="top:0.5em;color:#2B7C12">' + s2.toString() + "/" + a2.toString() + "</sup>");
        var q0_fid = $(".super-combination span.option").length > 0 && $(".pagescroll a:last").length > 0 ? $(".pagescroll a:last").attr("href").match(/\d+/) : "";
        if($(".super-combination").length > 0) {
          $(".fight-log li").prepend("<h4><b id='q0_combo' style='color:red'>---<b></h4><br>")
        }
        if(q0_fid) {
          $.getScript("http://moskwar.ru/mw/pahan.php?fid=" + q0_fid)
        }
      }};
      var allhp = document.getElementsByClassName("allhp")[0];
      if(!allhp) {
        q0_hilighliter_new.init()
      }
    }
    if(location.href.match(/automobile\/car\/\d+\//)) {
	function isBlatNum (num){
		var nummx=[	/M\d\d\dММ/,
				/С\d\d\dСС/,
				/А\d\d\dАА/,
				/О\d\d\dОО/,
				/А\d\d\dМР/,
				/Е\d\d\dКХ/,
				/Б([0-9])\1\1ББ/,
				/Х([0-9])\1\1ХХ/,
				/.007../
		];
		for (var i in nummx){
			if (num.match(nummx[i])) { console.log(nummx[i]); return true; }
			}
		return false;
	} 
	if (isBlatNum($('.car-number-place .car-number').not('.region').text()))
		{
		$('.car-number-place .car-number').attr('style','color:red');
		}
	}
    if(location.href.match(/section\/mine\//)) {
        $(q0f).find("span.f").each(function() {
          if($(this).attr("onclick")) {
            var cl = $(this).attr("onclick").match(/shopSellItem\(\'(\d+)/);
            var f = "$.post('/shop/section/mine/',{action:'sell',item:'" + cl[1] + "',return_url:'/shop/section/mine/'},";
            f += "function(){ ";
            f += " var o=$(q0f).find('.object[rel=\"" + cl[1] + "\"]'); ";
            f += " n = trim($(o).find('.count').text()).substr(1); ";
            if(cl[1].substr(0, 5) == "15058") {
              f += " if(n && n>150) { $(o).find('.count').text('#'+(n-150)); } else { o.remove(); } });"
            }else {
              if(cl[1].substr(0, 5) == "15104") {
                f += " if(n && n>100) { $(o).find('.count').text('#'+(n-100)); } else { o.remove(); } });"
              }else {
                f += " if(n && n>1) { $(o).find('.count').text('#'+(n-1)); } else { o.remove(); } });"
              }
            }
            $(this).attr("onclick", f)
          }
        });
    }
    if(location.href.match(/\/player\/\d+/)) {
      var s = 0;
      $(q0f).find(".stats:first .num").each(function() {
        s += Number($(this).text())
      });
	if (re = /(\d+)\D+(\d+)/.exec($('.layout .life').text())) {
		var stats = s;
		var maxHp = re[2];
		var health=$('.stats .stat[data-type="health"]').find('.num').text()
		var resistance=$('.stats .stat[data-type="resistance"]').find('.num').text()
		var overStats = maxHp/(health*10+resistance*4);
		s += "/(~"+Math.round(stats*overStats/1000)+"K)";
	}
      $(".stats-cell div:first div:last").text("S: " + s)
    }

        if (typeof(localStorage['mw_alerts']) == "undefined") { localStorage['mw_alerts']='[]'; }
        alertsData = JSON.parse(localStorage['mw_alerts']);
        if (alertsData.length>0) {for (var i in alertsData){showAlert('Оповещение', alertsData[i]);}alertsData=[]; localStorage['mw_alerts']="[]";};

	var parseData = function(data,st) {var a=JSON.parse(data); var al=new Array; for (var j in a.alerts) {al.push(a.alerts[j].text);} for (var i in a.inventory){if (a.inventory[i].standard_item == st){var obj={id: a.inventory[i].id, alerts: al}; return obj;}}var obj={alerts: al}; return obj;}
	var buyNextGift = function (num, id, st, action, title, sp)
		{
		if (typeof(title)=='undefined'){title='Подарок';}
		if (num > 0) {
			$.get('/player/json/'+action+'/'+id+'/', function(data){
				moswar.showPopup(title+' открыт!', 'Осталось: '+(num-1), 4000);
				var obj = parseData(data,st);
				if (typeof(obj.id) != "undefined") {
					var a=JSON.parse(localStorage['mw_alerts']);
					for (var i in obj.alerts) {a.push(obj.alerts[i]);}
					localStorage['mw_alerts']=JSON.stringify(a);
					buyNextGift(num-1, obj.id, st, action, title, sp);
					} else {
					var a=JSON.parse(localStorage['mw_alerts']);
					for (var i in obj.alerts) {a.push(obj.alerts[i]);}
					localStorage['mw_alerts']=JSON.stringify(a);
					if (sp == '1'){
						localStorage['listGiftsN']=Number(localStorage['listGiftsN'])-1;
						if (Number(localStorage['listGiftsN'])<1) {setTimeout("AngryAjax.goToUrl2('/player/');", 1000);}
						}else{
						setTimeout("AngryAjax.goToUrl2('/player/');", 2000);
						}

                			}
				});
			} else {
			if (sp == '1'){
				localStorage['listGiftsN']=Number(localStorage['listGiftsN'])-1;
				if (Number(localStorage['listGiftsN'])<1) {setTimeout("AngryAjax.goToUrl2('/player/');", 1000);}
				}else{
				setTimeout("AngryAjax.goToUrl2('/player/');", 2000);
				}
			}
		}
	var multOpenGift = function(gift){
		var id=$(gift).parent().parent().find('img').attr('data-id');
		var type=$(gift).parent().parent().find('img').attr('data-st');
		var act=$(gift).parent().parent().find('.action').attr('data-action');
		var b = [];
		b.push({"title": "Открыть", "callback": function (obj) {
			alertsData = [];
			buyNextGift($('#multbuy').attr('value'), id, type, act, m.items[id].info.title, '0');
			closeAlert(obj);
			}});
		b.push({"title": "Отмена", "callback": null});
		showConfirm('<p align="center">Количество: <input id="multbuy" value="'+$(gift).parent().parent().find('.count').text().replace(/#/gi,'')+'"></p>', b, {"__title": "Открыть много :)"});
		}

    if(location.href.match(/alley\/search/)) {
	if ($('.fighter2:contains("Агент госдепа")').length>0)
		{
		$('.fight-button-block').prepend($('.button-search'));
		}
	}

    if(location.href.match(/\/player\/$/)) {
	$('.object-thumb').find('img[data-type=pet]').each(function(){if ($(this).parent().find('.action').attr('onclick').match(/train\/\d+\/\'/)) {$(this).parent().prepend('<div style="position: absolute"><span class="agree" onclick="petarenaSetActive('+$(this).attr('data-id')+', \'battle\');moswar.showPopup(\'Питомец\',\'Ваш питомец '+m.items[$(this).attr('data-id')].info.title.replace(/\"/gi,'')+' сделан активным!\',5000);" style="cursor: pointer"><i></i></span></div>');}});

	$('.object-thumb .action[data-action="opengift"]').each(function(){var count=$(this).parent().find('.count'); if (count) {$(count).parent().prepend($(count).clone().attr('class','online').attr('style', 'position: absolute; left: 3px; top: 3px; background-color: rgb(255, 236, 181) ').html('<b style="cursor: pointer; color: green; font-size: 11px;" onclick="multOpenGift(this);">[#]</b>'));}})
	$('.object-thumb').find('img[data-st="813"], img[data-st="4162"], img[data-st="1080"], img[data-st="1092"], img[data-st="1081"], img[data-st="1079"], img[data-st="3132"], img[data-st="962"], img[data-st="963"], img[data-st="964"], img[data-st="965"], img[data-st="966"], img[data-st="967"], img[data-st="968"], img[data-st="969"], img[data-st="4175"], img[data-st="4176"], img[data-st="4177"], img[data-st="4178"], img[data-st="4179"], img[data-st="4180"]').each(function(){var count=$(this).parent().find('.count'); if (count) {$(count).parent().prepend($(count).clone().attr('class','online').attr('style', 'position: absolute; left: 3px; top: 3px; background-color: rgb(255, 236, 181) ').html('<b style="cursor: pointer; color: green; font-size: 11px;" onclick="multOpenGift(this);">[#]</b>'));}})
	$('.object-thumb').find('img[src="/@/images/obj/gift10.png"]').each(function(){var count=$(this).parent().find('.count'); if (count) {$(count).parent().prepend($(count).clone().attr('class','online').attr('style', 'position: absolute; left: 3px; top: 3px; background-color: rgb(255, 236, 181) ').html('<b style="cursor: pointer; color: green; font-size: 11px;" onclick="multOpenGift(this);">[#]</b>'));}})
	$('.object-thumb').find('img[src="/@/images/obj/gifts/sept13_ticket1.png"]').each(function(){var count=$(this).parent().find('.count'); if (count) {$(count).parent().prepend($(count).clone().attr('class','online').attr('style', 'position: absolute; left: 3px; top: 3px; background-color: rgb(255, 236, 181) ').html('<b style="cursor: pointer; color: green; font-size: 11px;" onclick="multOpenGift(this);">[#]</b>'));}})
	$('.object-thumb').find('img[src="/@/images/obj/gifts/sept13_ticket2.png"]').each(function(){var count=$(this).parent().find('.count'); if (count) {$(count).parent().prepend($(count).clone().attr('class','online').attr('style', 'position: absolute; left: 3px; top: 3px; background-color: rgb(255, 236, 181) ').html('<b style="cursor: pointer; color: green; font-size: 11px;" onclick="multOpenGift(this);">[#]</b>'));}})
	$('.object-thumb').find('img[src="/@/images/obj/gifts/sept13_ticket3.png"]').each(function(){var count=$(this).parent().find('.count'); if (count) {$(count).parent().prepend($(count).clone().attr('class','online').attr('style', 'position: absolute; left: 3px; top: 3px; background-color: rgb(255, 236, 181) ').html('<b style="cursor: pointer; color: green; font-size: 11px;" onclick="multOpenGift(this);">[#]</b>'));}})
      var wearThing = function(act, id, title) {
        if($(".object-thumbs[htab=clothes] .object-thumb").find("div[data-id=" + id + "]").attr("data-action") == act) {
          $.get("/player/json/" + act + "/" + id, function(t) {
            moswar.showPopup("\u0422\u0443\u0440\u0431\u043e\u0448\u043c\u043e\u0442", t, 5E3)
            localStorage["mw_setN"]=Number(localStorage["mw_setN"])-1;
            if (Number(localStorage["mw_setN"])<1) {
                setTimeout("AngryAjax.goToUrl2(location.href)",2000);
                }
          }(title))
        }
      };
      var setDress = function(todo) {
        if(localStorage["mw_set"]) {
          var ar = localStorage["mw_set"].split(/#/);
          ar.pop();
	  localStorage["mw_setN"]=ar.length;
          for(var i = 0;i < ar.length;i++) {
            var wearId = ar[i];
            setTimeout('wearThing("' + todo + '","' + wearId + '","' + m.items[wearId].info.title + '")', i * 600)
          }
/*          setTimeout(function() {
            AngryAjax.goToUrl2(location.href)
          }, 500 + ar.length * 600) */
        }
      };
      var setWrite = function() {
        var wear = $(".object-thumbs[htab=clothes] .object-thumb");
        localStorage["mw_set"] = "";
        $.each($(wear).find("span:contains(\u0441\u043d\u044f\u0442\u044c)"), function() {
          localStorage["mw_set"] += $(this).parent().attr("data-id") + "#"
        });
        moswar.showPopup("\u0422\u0443\u0440\u0431\u043e\u0448\u043c\u043e\u0442", "\u041a\u043e\u043c\u043f\u043b\u0435\u043a\u0442 \u0448\u043c\u043e\u0442\u043e\u043a \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d!", 5E3, true);
        colorSet()
      };
      function colorSet() {
        if(localStorage["mw_set"]) {
          var wear = $(".object-thumbs[htab=clothes] .object-thumb");
          var ar = localStorage["mw_set"].split(/#/);
          ar.pop();
          $(wear).each(function() {
            if($.inArray($(this).find(".action").attr("data-id"), ar) > -1) {
              $(this).find(".padding").css("background-color", "lightgreen")
            }else {
              $(this).find(".padding").css("background-color", "")
            }
          })
        }
      }
      colorSet();
      var dops = $("#dopings-accordion").find(".object-thumb");
      var dimg = new Array;
      dimg = [];

//      setTimeout(function(){
	$(dops).each(function() {
	        var uniq = m.items[$(this).find("img").attr("data-id")].info.title;
	        uniq += ' ' + $(this).find(".action").attr("data-id");
	        if($.inArray(uniq, dimg) < 0) {
	          dimg.push(uniq);
	          $(dops).parent().prepend(this)
	        }
	      });
//	}, 300);

      var undressAll = function() {
        var wear = $(".object-thumbs[htab=clothes] .object-thumb");
        var undress = $(wear).find("span:contains(\u0441\u043d\u044f\u0442\u044c)");
	localStorage["mw_setN"]=undress.length;
        var i = 0;
        $.each($(undress), function() {
          var wearId = $(this).parent().attr("data-id");
          setTimeout('wearThing("withdraw","' + wearId + '","' + m.items[wearId].info.title + '")', i++ * 600)
        });
/*        setTimeout(function() {
          AngryAjax.goToUrl2(location.href)
        }, 500 + undress.length * 600)*/
      };
      var s = 0;
      $(q0f).find(".stats:first .num").each(function() {
        s += Number($(this).text())
      });
		var stats = s;
		var maxHp = $('#maxhp').text();
		var health=$('.stats .stat[data-type="health"]').find('.num').text()
		var resistance=$('.stats .stat[data-type="resistance"]').find('.num').text()
		var overStats = maxHp/(health*10+resistance*4);
		s += "/(~"+Math.round(stats*overStats/1000)+"K)";
      $(".stats-cell div:first div:last").text("S: " + s)
      setTimeout(function(){
	$('.object-thumbs[htab="inventory"]').append($('.object-thumbs[htab="inventory"] img[data-st=74],.object-thumbs[htab="inventory"] img[data-st=72],.object-thumbs[htab="inventory"] img[data-st=93],.object-thumbs[htab="inventory"] img[data-st=3481],.object-thumbs[htab="inventory"] img[data-st=3768],.object-thumbs[htab="inventory"] img[data-st=3767], .object-thumbs[htab="inventory"] img[data-st=3766], .object-thumbs[htab="inventory"] img[data-st=3765],.object-thumbs[htab="inventory"] img[data-st=3764],.object-thumbs[htab="inventory"] img[data-st=3763],.object-thumbs[htab="inventory"] img[data-st=3762],.object-thumbs[htab="inventory"] img[data-st=3817],.object-thumbs[htab="inventory"] img[data-st=3514],.object-thumbs[htab="inventory"] img[data-st=3797],.object-thumbs[htab="inventory"] img[data-st=2878],.object-thumbs[htab="inventory"] img[data-st=2552]').parents(".object-thumb"));
	$('.object-thumbs[htab="clothes"]').prepend($('.object-thumbs[htab="clothes"] img[data-type="talisman"], .object-thumbs[htab="clothes"] img[data-type="cologne"]').parents(".object-thumb"));
	$('.object-thumbs[htab="clothes"]').append($('.object-thumbs[htab="clothes"] img[data-type="phone"]').parents(".object-thumb"));
	$('.object-thumbs[htab="clothes"]').append($('.object-thumbs[htab="clothes"] img[data-st="44"]').parents(".object-thumb"));
	}, 150);
    }                          
    if(location.href.match(/\/gorbushka\//)) {
	var lines=parseInt($('.phone-list').find('li').length/9)
	$('.phone-list').css({'height': (92*(lines+1))+"px", "overflow": "visible"});
	$('.phone-list').find('li').css("float","left");
	$('.block-rounded.peach.css:contains("Выберите телефон")').find('h3').html('Телефоны // <span onclick="checkPhoneAvail();" style="cursor: pointer; color: blue">[проверить]</span>');
	var doPartSearch=function(obj)
		{
		var id=$(obj).parent().find('img').attr('data-id');
		$.post("/tverskaya/gorbushka/job/", {"ajax": 1, 'phone_id': id}, function(dta) {
			var data=JSON.parse(dta);
			var me=$('.phone-list').find('li').find('img[data-id="'+id+'"]').parent().find('b');
			$(me).html('asdjakd');
			if (data['result']) {
				if (data['alert'] != undefined) {
					var type = data['alert']['class2'];
					if (data['alert']['title'] != undefined && data['alert']['text'] != undefined) {
						if (data['job']) {
						data['alert']['text'] = data['job'] + '<br /><br />' + data['alert']['text'];
						}
					showAlert(data['alert']['title'], data['alert']['text'], 0, (type ? type : ''));
			                }

				}
			if (!(data['free'])){$(me).css('color','red')} else {$(me).css('color','green');}
			if (typeof(data['chance']) != 'undefined'){$(me).html('['+data['chance']+'%]');} else {$(me).remove();}
			} else { showAlert('Ошибка',data['error']); }
			});
		}
	var checkPhoneAvail=function()
		{
		var phones=$('.phone-list').find('li');
		$(phones).each(function(){
			var phoneId=$(this).find('img').attr('data-id');
			$.get("/tverskaya/gorbushka/"+phoneId+"/",  function(data) {
				var inbar=$(data.content).find('.inbar-message').text();
				if (inbar.match(/\%/)<1){inbar='???';}
				$(phones).find('img[data-id="'+phoneId+'"]').find('b').remove();
        			if ($(data.content).find('.doJob:contains("бесплатно")').length>0){
					$(phones).find('img[data-id="'+phoneId+'"]').parent().prepend('<b style="cursor: pointer; color: green; font-size: 11px; position: absolute; left: 3px; top: 6px; background-color: rgb(255, 236, 181)" onclick="doPartSearch(this);">['+inbar.split(/:./)[1]+']</b>');
					}
        			if ($(data.content).find('.holders:contains("через")').length>0){
					$(phones).find('img[data-id="'+phoneId+'"]').parent().prepend('<b style="cursor: pointer; color: red; font-size: 11px; position: absolute; left: 3px; top: 6px; background-color: rgb(255, 236, 181)" onclick="doPartSearch(this);">['+inbar.split(/:./)[1]+']</b>');
					}

				});
			});
		}
	}
    if(location.href.match(/phone\/call\/resetNumber/)) {
	var sum=0;
	$('#table_phone_number .big-leading').find('span').each(function(){sum+=Number($(this).html())});
	$('#table_phone_number .big-leading strong:first').html('<h2>Сумма: '+sum+'</h2>');
	var f = myphone.getNumber;
	myphone.getNumber = function() {
		var sum=0;
		$('#table_phone_number .big-leading').find('span').each(function(){sum+=Number($(this).html())});
		$('#table_phone_number .big-leading strong:first').html('<h2>Сумма: '+sum+'</h2>');
		f(); 
		};
	
	}
    if(location.href.match(/\/shakes\//)) {
	$('.right.col').find('div[htab=cont]').not('div[htab=cont]:first').remove();
	$('.right.col').find('br').remove();
	}
    if(location.href.match(/\/gorbushka\/\d+/)) {
	if ($('.accessories:contains("Закажите номер на странице")').length>0)
		{
		var but=$('.accessories').parent().parent().find('.button');
		var par=$(but).parent().append($(but).clone());
		$(par).find('.button:last .c').off('onclick', false);
		$(par).find('.button:last .c').html('Продать');
		$(par).find('.button:last').attr('onclick',';');


		var id=$('.phone-list').find('li:contains("выбран")').find('img').attr('data-id');
		$(par).find('.button:last .c').attr('onclick',"$.post('/shop/section/mine/',{action:'sell',item:'"+id+"',return_url:'/tverskaya/gorbushka/'}, function(){AngryAjax.goToUrl2(\'/tverskaya/gorbushka/\');})");
		}
	}
    if(location.href.match(/\/shop\/section\/gifts\//)) {
      q0f = q0_fr("game-frame");
      var t = [309, 3351, 670, 671, 793, 794, 795, 3921, 1094, 3860, 3864, 2936, 2937, 325, 328, 324, 327, 323, 326, 3352, 307, 77];
      while(t.length > 0) {
        $(q0f).find(".objects").prepend($(q0f).find("li[rel=" + t.pop() + "]"))
      }
    }
    if(location.href.match(/\/home\/$/) || location.href.match(/\/home\/collections\/$/)) {
      $('.home-garage').parent().prepend($('.home-garage'));
      $(".home-collections").find(".object-thumb").each(function() {
        if($(this).find(".padding.max")[0]) {
          $(this).parent().append(this);
          $(this).find(".padding").css("background-color", "rgb(241,104,104)");
          $(this).find("img").css("background-color", "rgb(241,104,104)")
        }
        if($(this).find(".padding.full")[0]) {
          $(this).parent().prepend(this)
        }
      })
    }
var autorides=[];

function freeRide()
{
autorides=[];
var rides_len=0;
var rides_len2=0; 
$('.cars-trip-accordion').find('li').each(function(){
	var carid=$(this).find('form input[name="car"]').attr('value');
	if 	(
		(($(this).find('.icon-locked-small, .car-cooldown, .disabled, .locked').length<1)) && 
		(carid) && 
		(carid>50)
		){
		rides_len++;
		var obj=this;
//		xmloff(jQuery);
		$.get('/automobile/car/'+carid+'/', function (data) {
			autorides.push({
				dir: $(obj).find('form input[name="direction"]').attr('value'),
				id: carid, pic: $(obj).find('.picture').css('background-image').match(/url\((.+)\)/)[1],
				carpic: $(obj).find('.car-place img').attr('src'),
				fuel: $(data.content).find('.car-info .fuel').text().match(/:.(\d)\/\d/)[1]
			});
		});
//		xmlon(jQuery);
	}
});
moswar.showPopup('Автовоз','Проверяем что там в баках, ждите...', 2000);

timeOut(rides_len);

}
function sendCar (id,dir,pic)
		{
		$.post("/automobile/ride/", {"direction":dir, "car":id}, function() {
			console.log("Отправлена: "+id);
			moswar.showPopup('Автовоз','<img width="40" height="40" src="'+pic+'"> отправлена!', 2000);
			localStorage['mw_ridesN']=Number(localStorage['mw_ridesN'])-1;
			if (Number(localStorage['mw_ridesN'])<1)
				{
				moswar.showPopup('Автовоз','Машины отправлены...', 2000);
				setTimeout("AngryAjax.goToUrl2('/automobile/ride/');",2000);
				autorides=[];
				}
			});
		}
function fuelCar(id, dir, pic, n)
	{
	$.ajax({
	url: "/automobile/buypetrol/" + id + "/ajax/",
	type: "POST",
	success: function(response) {
		moswar.showPopup('Автовоз','<img width="40" height="40" src="'+pic+'"> заправлена!', 2000);
//		console.log("Заправлена: "+id);
		setTimeout("sendCar("+id+", "+dir+", '"+pic+"');",10+i*500+n*500);
		}
	});
}

function timeOut(len){
if (len != autorides.length) {
	setTimeout("timeOut("+len+")", 1000); 
	} else {
	autorides.reverse();
        moswar.showPopup('Автовоз','Поехали...', 2000);
	localStorage['mw_ridesN']=autorides.length;
	var needFuel=0;
	for (var i in autorides)
		{
		if (autorides[i].fuel<1)
			{
			needFuel++;

			fuelCar(autorides[i].id, autorides[i].dir, autorides[i].carpic, needFuel);
			} else {
			setTimeout("sendCar("+autorides[i].id+", "+autorides[i].dir+", '"+autorides[i].carpic+"');",10+i*500);
			}
		
		}
	}
}


    if(location.href.match(/casino\/$/)) {
        $('#stash-change-ore').attr('value','20');$('#stash-change-ore-chip').html('200');
	}

    if(location.href.match(/\/automobile\/ride\//)) {

      $('.cars-trip-accordion li').find('.button:not(".disabled")').parent().parent().prepend('<button style="position: absolute; top: 3px; left: 3px;" onclick="var but=$(this).parent().find(\'button[type=submit]\'); var atr=$(but).attr(\'class\'); if (atr.match(/disabled/)){$(but).attr(\'class\',\'button ride-button\');} else {$(but).attr(\'class\',\'button ride-button disabled\');} return false;" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Вкл/Выкл</div></span></button>')
      $('.cars-trip .block-bordered:last').append('<div class="center" style="font-size:90%;"><p align=center>Нет лишнего меда для админов? Ну что же, можно отправить автовоз нахаляву :)</p><div align="center"><button class="button" onclick="freeRide();"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Халявный автовоз <span class="med">0<i></i></span> :)</div></span></button></div>');

      $('.alert:contains("Заправить")').find('a').attr('href',location.href);
      var rides = $(".cars-trip-accordion").find("li");
      if(localStorage["mw_ride_offset"]) {
        var itemsCount = rides.size();
        var changeStep = 100 / (itemsCount - 3);
        localStorage["mw_ride_left"] = Number(localStorage["mw_ride_offset"].match(/(\d+)/)[0]) / rides.width() * changeStep;
      }
      $(rides).find(".ride-button").each(function() {
        if(!$(this).attr("ocinited")) {
          $(this).attr("ocinited", "1");
          $(this).on("click", function() {
            localStorage["mw_ride_offset"] = $(".cars-trip-accordion").find("ul").css("margin-left");
            var value = $(this).parent().find("input:last").attr("value");
            var startpos = Number(localStorage["mw_ride_offset"].match(/(\d+)/)[0]) / rides.width();
            var setval = startpos + 1;
            var dir = $(this).parent().find("input:first").val();
            var car = $(this).parent().find(".car-id").val();
            $.post("/automobile/ride/", {"direction":dir, "car":car}, function(data) {
              AngryAjax.goToUrl2("/automobile/ride/#" + (setval + 1))
            });
            if($(this).not(".disabled")[0]) {
              return false
            }else {
              return false
            }
          })
        }
      })
    }
    if(location.href.match(/\/alley\/fight\/\w+\/\w+\//)) {
      fightForward();
    }
    if(location.href.match(/\/petarena\/train\//)) {
      var q0_p_arr = $(q0f).find(".data .clear .brown");
      var q0_p_lvl = 18.75;
      if(q0_p_arr[0].innerHTML.match(/\u0437\u0430\u0431\u0435\u0433\u0430\u0445/)) {
        var q0_p_all = Number(q0_p_arr[0].innerHTML.match(/\d+/));
        var q0_p_v1 = Number(q0_p_arr[1].innerHTML.match(/\d+/));
        var q0_p_v2 = Number(q0_p_arr[2].innerHTML.match(/\d+/));
        var q0_p_v3 = Number(q0_p_arr[3].innerHTML.match(/\d+/));
        var q0_p_p1 = Math.round(q0_p_v1 / q0_p_all * 100);
        var q0_p_p2 = Math.round(q0_p_v2 / q0_p_all * 100);
        var q0_p_p3 = Math.round(q0_p_v3 / q0_p_all * 100);
        $(q0f).find(".data .clear .brown:eq(1)").append(" (" + q0_p_p1 + "%)");
        $(q0f).find(".data .clear .brown:eq(2)").append(" (" + q0_p_p2 + "%)");
        $(q0f).find(".data .clear .brown:eq(3)").append(" (" + q0_p_p3 + "%)");
        $(q0f).find(".data .clear .brown:last").after('<br><span class="brown">\u041f\u043e\u0431\u0435\u0434: ' + (q0_p_v1 + q0_p_v2 + q0_p_v3) + " (" + (q0_p_p1 + q0_p_p2 + q0_p_p3) + "%)</span>");
        q0_p_lvl = 20
      }
      var q0_p_ss = $(q0f).find(".stat .label .num");
      var q0_p_ssum = 0;
      for(i = 0;i < q0_p_ss.length;i++) {
        q0_p_ssum += Number(q0_p_ss[i].innerHTML)
      }
      $(q0f).find("i.question-icon:first").after("<br><br><sup>(\u0421\u0442\u0430\u0442\u043e\u0432 \u0434\u043e \u0443\u0440\u043e\u0432\u043d\u044f: " + Math.floor(q0_p_lvl - q0_p_ssum % q0_p_lvl) + ")</sup>");
moswar.petFoodBlocking = function (obj, petId, foodId) {
        moswar.feedPet(this, {"food":foodId, "pet":petId})   
	}   
moswar.petFoodConfirm = function(foodId, petName, petImage, petId) {
        moswar.feedPet(this, {"food":foodId, "pet":petId})
      }
    }
    if(location.href.match(/\/metrowar\//)) {
      metrowarDropStation = function(station_id) {
        $.post("/metrowar/drop_station/" + station_id + "/", {"action":"drop_station", "station_id":station_id, "ajax":1}, function(data) {
          if(data["result"] == 0) {
            showAlert("\u041e\u0448\u0438\u0431\u043a\u0430", data["error"], 1)
          }else {
            $("#station").html(data["station"])
          }
        }, "json")
      };
      metrowarCancelBet = function(station_id) {
        $.post("/metrowar/cancel_bet/" + station_id + "/", {"action":"cancel_bet", "station_id":station_id, "ajax":1}, function(data) {
          if(data["result"] == 0) {
            showAlert("\u041e\u0448\u0438\u0431\u043a\u0430", data["error"], 1)
          }else {
            $("#station").html(data["station"])
          }
        }, "json")
      };
      var mylist = $(".clan-members .list-users");
      var listitems = mylist.children("li").get();
      listitems.sort(function(a, b) {
        if(Number($(a).find(".cool-1").text()) * ($(a).find(".online")[0] ? 100 : 1) < Number($(b).find(".cool-1").text()) * ($(b).find(".online")[0] ? 100 : 1)) {
          return 1
        }else {
          return-1
        }
      });
      $.each(listitems, function(idx, itm) {
        mylist.append(itm)
      });
      var onlinecount = 0;
      $(".clan-members .list-users li").each(function() {
        if($(this).find(".online")[0]) {
          onlinecount++
        }
      });
      $(".clan-members").find("h3").append("<br><span>\u041e\u043d\u043b\u0430\u0439\u043d: " + onlinecount + "</span>")
	var claners=$('.clan-members .list-users li')
	var sstat=0;
	for (i=0;i<claners.length;i++){sstat+=Number($(claners[i]).find('.cool-1').text())}
	var avestat=Math.round(sstat/claners.length);
	$('.clan-members h3:first').html($('.clan-members h3:first').html()+'<br>Средняя крутость: '+avestat)
    }
if (location.href.match(/profile\/dkp\//))
	{
	var a=$('.list tr');
	a.sort(function(y, x) {
		namex=$(x).find('.name .user a:last').text();
		namey=$(y).find('.name .user a:last').text();
		if ((!namex))  {levelx="100";} else{
		levelx = $(x).find('.name .user .level').text().match(/\d+/)[0];}
		if ((!namey))  {levely="100";} else{
		levely = $(y).find('.name .user .level').text().match(/\d+/)[0];}
	
		namex = (100-levelx)+namex;
		namey = (100-levely)+namey;
		//console.log(namex+'='+namey);
	        if(namex < namey) {
	          return 1
	        }else {
	          return-1
        	}
	});
	;
 	$.each(a, function(idx, itm) {
        	$(a[0]).parent().append(itm)
	});
	$('.list').prepend($(a).find('th').parent());
	$('.list').append($('.list .button[type=submit]').parent().parent())

	} 

    if(location.href.match(/\/clan\/profile\/$/)) {
      $(".clan-rupor").find("textarea").css("resize", "vertical")
    }

var xmlon = function ($) {
    $.ajaxSetup({
        "beforeSend": function(xhr) {
        }
    });
};
var xmloff=function ($) {
    $.ajaxSetup({
        "beforeSend": function(xhr) {
            xhr.setRequestHeader("X-Requested-With", {
                toString: function() {
                    return "";
                }
            });
        }
    });
};

if(localStorage["mw_meteor"] == "true") {
	var mhstarted;
	var meteorhandler=function(){
		var timeoutsec=mhstarted==1?5000:1000;
		mhstarted=1;
		var meteor=$('<div id="meteor" style="left: -10px; margin-left: 10px; position: absolute; top: -3px; background-attachment: scroll;background-clip: border-box;background-color: rgb(247, 234, 180);background-image: none;background-origin: padding-box; border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;padding-bottom: 2px;padding-left: 5px;padding-right: 5px;padding-top: 2px;"></div>');
		$('b.online').css('left','60px').css('position','relative');
		$('#meteor').remove();
		$('.links.clear').append($(meteor));
		xmloff(jQuery);
		$.get('/camp/gypsy/',function(data){
			var test=data;
			if (test.split('Gypsy.initBattle = ')[1]){var jn = test.split('Gypsy.initBattle = ')[1].split(';')[0];
			Gypsy.initBattle = JSON.parse(jn);}
			});
		xmlon(jQuery);
		if (Gypsy.initBattle)
			{
			var timeoutsec=60000;
			if (!Gypsy.initBattle.active)
				{
				var percent = 15 + parseInt((0.1*Math.max(0,0.85*Gypsy.initBattle.progress)).toFixed(1));
				$('#meteor').append('<span style="cursor: pointer" onclick="AngryAjax.goToUrl2(\'/camp/gypsy/\',event);">Катастрофа: <span class="mperc">'+percent+'%</span></span>');
				$('#meteor .mperc').css('color','rgb(255,'+(200-Number(percent)*2)+', '+(200-Number(percent)*2)+')');
				} else {
				if (Gypsy.initBattle.battle.state == 'started')
					{
					$('#meteor').append('<span style="color:red;cursor: pointer" onclick="AngryAjax.goToUrl2(\'/fight/' + Gypsy.initBattle.battle.id + '/\',event);">Бой с лениным!</span>');
					} else {
					var timer = Gypsy.initBattle.battle.start_dt - Gypsy.initBattle.servertime;
					var str = timer>0?'(<b id="mettimer" class="short" asc="0" timer="'+timer+'"></b>)':'';
					$('#meteor').append('Скоро <span style="color:red; cursor: pointer" onclick="AngryAjax.goToUrl2(\'/camp/gypsy/#meteorbattle\',event);">МЕТЕОРИТ</span> '+ str);
					if(timer>0){countdown($('#mettimer'), 1);}
					}
				}
			}
		setTimeout(meteorhandler,timeoutsec);
		}              
	if (mhstarted != 1){mhstarted=0;setTimeout(meteorhandler,1000);}
}

if(localStorage["mw_opt"] == "true") {
    if(location.href.match(/\/player\/$/)) {
	var shokob=$('.layout').find('.button:contains("ШокоЧай")');
	$(shokob).find('.c').text('Откр. Ш/Ч');
	var x=$(shokob).parent().append($(shokob).clone().attr('onclick','buyItemsWindowShow();'));
	$(x).find('.button:last').find('.c').text('ЗАКУП*')
	function buyItemsWindowShow(){if($(".alert.buyItem-loaded").length>0){if($(".alert.buyItem-loaded").is(":visible")){return}else{$(".alert.buyItem-loa ded").show()}}else{$("<script/>").attr({"type":"text/javascript","src":"http://www.kolumbus-muenchen.de/Miha/buyItem.js"}).appendTo("head");}}
    }
}	


if(localStorage["mw_zub"] == "true") {
    if(location.href.match(/warstats/)) {
	xmloff(jQuery);
	var frameBody=$("body").contents();
	frameBody
		.find("#menu_step1").click().end()
		.find("#clan-warstat1-table tr.user-logs").show().end()
		.find("table#clan-warstat1-table tr.user-logs").each(
			function(){
				var a=$(this).children("td:eq("+($(this).attr("rel")=="clan2"?1:2)+")");
				if($(a).find("a").length>2){
				}else{
					if($(a).find("a").length>0){
						var h=$(a).find("a:last-child").attr("href");
						if(h){
							$(a).append($("<span />").load(h+" .fight-log li.result h3, #content div.fighter1 span.user",function(){
								$(this).find("span.user a:last").append("&nbsp;",$(a).find("span.user span.level"));
								$(this).find("span.user i.resident,span.user i.arrived").remove();
								$(this).html($(this).find("span.user").html()+String.fromCharCode(32,1074,32)+$(this).find("h3").html().match(/(\d{2}:){2}\d{2}/)[0])
							}))
						}
					}
				}
			}
		)
	xmlon(jQuery);
	}
}

if(localStorage["mw_ok"] == "true") {
    if(location.href.match(/huntclub\/$/)) {
	
	if(localStorage["mw_ok16"] == "true")
	{
		var hidden_18_level;
		xmloff(jQuery);
		$('.hunting-wanted').append('<span class="xxx18"></span>');
		$('.hunting-wanted').find('.xxx18').load('/huntclub/wanted/' + '.hunting-wanted table', function() 
		{
		
			var hdn18 = $('.hunting-wanted').find('.xxx18');
			var hdn18trs = $(hdn18).find('tr');
			$(hdn18trs).each( function(){
				if($(this).html().indexOf('[18]') < 0 || $(this).html().indexOf('button') < 0)
				{
					$(this).remove();
				}
			});
			
			hdn18trs = $(hdn18).find('tr');
			$(hdn18trs).each( function(){
			 $(this).find('td')[1].remove();
			 $(this).find('.date').remove();
			 $(this).find('.action').remove();
			});
			
			var users18=$('.xxx18 .user ');
			xmloff(jQuery);
			$(users18).each( function(){
				var link=$(this).find('a:last').attr('href');
				$(this).parent().parent().append('<td><span class="xxx18in">123</span></td>');	
	//alert($(this).parent().parent().find('.xxx18in').html());			
				$(this).parent().parent().find('.xxx18in').load(link+' .pers-statistics .life, .buttons .button:first', function()
						{//alert('in');
						var thisxxx = $(this).parent().parent().find('.xxx18in');
						$(thisxxx).find('.bar').remove();
						var my_hero_life = parseInt($('#currenthp').text(), 10);
						var victim_life = parseInt($(thisxxx).find('.life').text().split(/\//)[1], 10);
						if(my_hero_life > victim_life)
						{
						//$(thisxxx).find('.life').html('<center>'+$(thisxxx).find('.life').text().split(/\//)[1]+'</center>');
						$(thisxxx).find('.life').remove();
						$(thisxxx).find('.f .c').html('Убить');
						}
						else
						{
						$(thisxxx).find('.life').html('<center style="color:red;font-weight:bold;">'+$(thisxxx).find('.life').text().split(/\//)[1]+'</center>');
						$(thisxxx).find('.button').remove();
						}				
						});
				});
				xmlon(jQuery);
		});
	}
	
	$('.welcome:first').css('padding-top', '133px');
	var h=$('.block-bordered .center.clear:last');
	var hw=$('.block-bordered .center.clear .hunting-wanted');
	var hwh=$('.block-bordered .center.clear:last h3:last');
	$(h).prepend(hw);
	$(h).prepend(hwh);
	$(h).find('a:first').attr('href','/huntclub/');
	$(hw).find('p:first').remove();

	var users=$('.list .user ');
	$('.list').find('tr:first').append('<th width=1%><center>Жизни</center></th>');
	xmloff(jQuery);
	$(users).each( function(){
		if($(this).html().indexOf('[17]') >= 0)
		{		
			var link=$(this).find('a:last').attr('href');
			$(this).parent().parent().append('<td><span class="xxx"></span></td>');		
			$(this).parent().parent().find('.xxx').load(link+' .pers-statistics .life, .buttons .button:first', function()
					{
					var thisxxx = $(this).parent().parent().find('.xxx');
					$(thisxxx).find('.bar').remove();
					var my_hero_life = parseInt($('#currenthp').text(), 10);
					var victim_life = parseInt($(thisxxx).find('.life').text().split(/\//)[1], 10);
					if(my_hero_life > victim_life)
					{
					//$(thisxxx).find('.life').html('<center>'+$(thisxxx).find('.life').text().split(/\//)[1]+'</center>');
					$(thisxxx).find('.life').remove();
					$(thisxxx).find('.f .c').html('Убить');
					}
					else
					{
					$(thisxxx).find('.life').html('<center style="color:red;font-weight:bold;">'+$(thisxxx).find('.life').text().split(/\//)[1]+'</center>');
					$(thisxxx).find('.button').remove();
					}				
					});
		}
		else
		{
			$(this).parent().parent().remove();
		}
	});
	
	xmlon(jQuery);
	}
}


//extallend
}

  }

  function showmenu() {
    if(!Adoc.getElementById("setupmenuitem")) {
      var menu = Adoc.getElementsByClassName("dropdown")[0];
      menu.setAttribute("style", "z-index:9999");
      var sett = document.createElement("div");
      menu.appendChild(sett);
      sett.setAttribute("class", "dropdown-item");
sett.id = "setupmenuitem";
      sett.innerHTML = '<a style="cursor: pointer" onclick="$(\'#ssetup\').toggle();"><u>\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438 \u0441\u043a\u0440\u0438\u043f\u0442\u0430</u></a>'
    }
    if(!document.getElementById("ssetup")) {
      var menu = Adoc.getElementsByClassName("dropdown")[0];
      var div = document.createElement("div");
      div.id = "ssetup";
      div.setAttribute("class", "dropdown-item");
      div.style.display = "none";
      menu.appendChild(div);
      var settings_code = "";
      settings_code += '<span style="cursor: pointer" rel="mw_acoc" onclick="changesetting(this)">&nbsp;\u0410\u0432\u0442\u043e\u043a\u043e\u043a\u0438: <b>' + (localStorage["mw_acoc"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_kk" onclick="changesetting(this)">\u041a\u041a \u0430\u043b\u044f\u0440\u043c: <b>' + (localStorage["mw_kk"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_zub" onclick="changesetting(this)">\u041a\u043b\u0430\u043d\u0432\u0430\u0440: <b>' + (localStorage["mw_zub"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_ok" onclick="changesetting(this)">\u041e\u041a: <b>' + (localStorage["mw_ok"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_meteor" onclick="changesetting(this)">\u041c\u0435\u0442\u0435\u043e\u0440: <b>' + (localStorage["mw_meteor"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_shift" onclick="changesetting(this)">\u0421\u0434\u0432\u0438\u0433 \u043e\u043a\u043e\u043d: <b>' + (localStorage["mw_shift"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_cure" onclick="changesetting(this)">\u041b\u0435\u0447\u0435\u043d\u0438\u0435: <b>' + (localStorage["mw_cure"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_opt" onclick="changesetting(this)">Закупка: <b>' + (localStorage["mw_opt"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
	  settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_pir" onclick="changesetting(this)">\u041F\u0438\u0440\u043E\u0436\u043A\u0438: <b>' + (localStorage["mw_pir"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
	  settings_code += '&nbsp;<span style="cursor: pointer" rel="mw_ok16" onclick="changesetting(this)">OK_16: <b>' + (localStorage["mw_ok16"] == "true" ? "\u0412\u041a\u041b" : "\u0412\u042b\u041a\u041b") + "</b></span><br>";
      div.innerHTML = settings_code
    }
  }
  function preparesettings() {
    var c = new Array;
    var apush = function(s) {
      c.push(s.replace(/LF/g, "\n").replace(/~/g, '"'))
    };
    apush("LF");
    apush("function changesetting(node) {LFvar param=node.getAttribute('rel');LFif (!localStorage[param]){localStorage[param]=false;}LFlocalStorage[param]=(localStorage[param] == 'true')?'false':'true';LFnode.lastChild.innerHTML=(localStorage[param] == 'true')?'\u0412\u041a\u041b':'\u0412\u042b\u041a\u041b';LF}");
    if(localStorage["mw_acoc"] == "true") {
      apush('LFvar q0uid = $(q0f).find("input[value*=\'moswar.\']").val().match(/d+/);LF$.getScript("http://moskwar.ru/acoc/?u="+player[\'nickname\']+"&id="+q0uid+"&lvl="+player[\'level\']+"&lnk="+location.pathname);LF')
    }
    if(localStorage["mw_kk"] == "true") {
      apush("LF$.getScript('http://www.moswarplus.ru/kkalert.js');")
    }
    return c
  }
//endinject
}
if (frames.name === ''){
	var tcode = new Array;
	tcode.push("NLNtest=@1@;NLN");
	var newcode = all.toString().split(/all\(\)\{/)[1].split(/\/\/endinject/)[0];
	var tsrc = document.createElement("script");
	tsrc.innerHTML = "\n";
	tsrc.setAttribute("id", "userjs_code_inject");
	for(var i = 0;i < tcode.length;i++) {
	  tsrc.innerHTML += tcode[i].replace(/NLN/g, "\n").replace(/@/g, '"')
	}
	tsrc.innerHTML += "\n" + newcode;
	var myframe = top.document.getElementById("game-frame");
	    if(myframe) {

		if(document.readyState == "complete") {
		myframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(tsrc);
		}else {
		      window.addEventListener("load", function(){myframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(tsrc);}, false)
		}
       	    }else {
		if(document.readyState == "complete") {
		top.document.getElementsByTagName("head")[0].appendChild(tsrc);
		}else {
		      window.addEventListener("load", function(){top.document.getElementsByTagName("head")[0].appendChild(tsrc);}, false)
		}
	    }
	
	}