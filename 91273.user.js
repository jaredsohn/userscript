// ==UserScript== 
// @name TribalUpdater    
// ==/UserScript==       

plugins.SnobBuildingSmithyResources = {
          'enhance_game' : function() {
          
       var TWR_resources = {0:"wood",1:"stone",2:"iron"};
       var TWR_res = {
          "wood":document.getElementById("wood").innerHTML,
          "stone":document.getElementById("stone").innerHTML,
          "iron":document.getElementById("iron").innerHTML
       };
       var TWR_resIncome = {
          "wood":document.getElementById("wood").title,
          "stone":document.getElementById("stone").title,
          "iron":document.getElementById("iron").title
       };
       var TWR_imgs = {
          "holz.png" : "wood",
          "lehm.png" : "stone",
          "eisen.png"      : "iron"
       };
       var TWR_imgsrc = {
          "wood" : "graphic/holz.png",
          "stone" : "graphic/lehm.png",
          "iron" : "graphic/eisen.png"
       };
       
       function formatTime(time) {
          time *= 3600;
          time =Math.floor(time/60);
       
          var min = Math.floor(time%60);
          if (min<10) min = "0"+min;
          var hour = Math.floor(time/60);
          return hour+":"+min ;//+":"+sec;
       };
          
       if(location.href.match( /screen=main/ )) {
          var prices = document.getElementsByTagName("img");
          for (var i=0; i<prices.length; i++ ) {
             if(prices[i].className == 'JS') continue;
             var price = prices[i];
             var src = price.src;
             src = src.substring(src.lastIndexOf('/')+1);
             var restype = TWR_imgs[src];
             if (!restype) continue;
             var par = price.parentNode;
             if (par.tagName!="TD") continue;
             var res = par.innerHTML;
             res = res.substring(res.lastIndexOf('>')+1);
             var dif = res - TWR_res[restype];
             if (dif<=0) {
                par.innerHTML += "<br><div style='color:green; font-size: 80%;'>&nbsp;+"+(-dif)+"</div>";
             } else if (dif < 1000) {
                var ft = formatTime(dif / TWR_resIncome[restype]);
                par.innerHTML += "<br><div style='color:red; font-size: 80%;'>&nbsp;-"+dif+"<br>("+ft+")</div>";
             } else {
                var ft = formatTime(dif / TWR_resIncome[restype]);
                par.innerHTML += "<br><div style='color:red; font-size: 80%;'>&nbsp;-"+dif+"<br>("+ft+")</div>";
             }
          }
       } else if (location.href.match( /screen=snob/ )) {
          var prices = document.getElementsByTagName("img");
          for (var i=0; i<prices.length; i++ ) {
             if(prices[i].className == 'JS') continue;
             var price = prices[i];
             var src = price.src;
             src = src.substring(src.lastIndexOf('/')+1);
             var restype = TWR_imgs[src];
             if (!restype) continue;
       
             var par = price.parentNode;
             if (par.tagName!="TD") continue;
       
             var res = price.nextSibling.data ;
             res = res * 1000;
             var dif = res - TWR_res[restype];
             if (dif<=0) {
                par.innerHTML += "<div style='color:green; font-size: 80%;'><img src='"+price.src+"'>&nbsp;+"+(-dif)+"</div>";
             } else {
                var ft = formatTime(dif / TWR_resIncome[restype]);
                par.innerHTML += "<div style='color:red; font-size: 80%;'><img src='"+price.src+"'>&nbsp;-"+dif+"&nbsp;("+ft+")</div>";
             }
          }
       } else if (location.href.match( /screen=smith/ )) {
          var prices = document.getElementsByTagName("img");
          for (var i=0; i<prices.length; i++ ) {
             if(prices[i].className == 'JS') continue;
             var price = prices[i];
             var src = price.src;
             src = src.substring(src.lastIndexOf('/')+1);
             var restype = TWR_imgs[src];
             if (restype!= "wood") continue;
             var par = price.parentNode;
             if (par.tagName!="TD") continue;
          //   var res = new Array(par.childNodes[7].nodeValue, par.childNodes[9].nodeValue, par.childNodes[11].nodeValue);
             var res = new Array(2);
             var parHT = par.innerHTML;
             var Wood = parHT.substr(parHT.indexOf('src="graphic/holz.png"'));
             res[0] = parseInt(Wood.substring(Wood.indexOf('>')+1,Wood.indexOf(' <img')));
             
             var Stone = parHT.substr(parHT.indexOf('src="graphic/lehm.png"'));
             res[1] = parseInt(Stone.substring(Stone.indexOf('>')+1,Stone.indexOf(' <img')));
             
             var Iron = parHT.substr(parHT.indexOf('src="graphic/eisen.png"'));
             res[2] = parseInt(Iron.substr(Iron.indexOf('>')+1));
          if(res[0]=="" || res[1]=="" || res[2]=="") continue;
             for(var a=0;a<=2;a++) {
                var resourceName = TWR_resources[a];
                dif = res[a] - TWR_res[resourceName];
                if (dif<=0) {
                   par.innerHTML += "<div style='color:green; font-size: 80%;'>&nbsp;+"+(-dif)+"</div>";
                } else if (dif < 1000) {
                   var ft = formatTime(dif / TWR_resIncome[resourceName]);
                   par.innerHTML += "<div style='color:red; font-size: 80%;'>&nbsp;-"+dif+"<br>("+ft+")</div>";
                } else {
                   var ft = formatTime(dif / TWR_resIncome[resourceName]);
                   par.innerHTML += "<div style='color:red; font-size: 80%;'>&nbsp;-"+dif+"<br>("+ft+")</div>";
                }
             }

          }
       };
          
          },
          'info' : {
             'mandatory' : false,
             'name' : "Enhance the Build, Smith and Academy resource listing",
             'desc' : "Shows how many resources left till building/nobel/smith can be upgradebuildings/make nobels/upgrade units/ and how much time till the resources are gathered",
             'version' : "Beta v0.9d",
             'dev' : "JelianSD"
          }
       }
