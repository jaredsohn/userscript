// ==UserScript==
        // @name           spyReportPower
        // @namespace      no
        // @description    aha
        // @include        http://www.nukezone.nu/clan.asp?Action=SpyReports&X=*
        // ==/UserScript==

        
        if (document.location.href.search('Action=SpyReports&X=') != - 1)
{
   var tabelaCurent =
   {
      rl : 4000, ms : 10000, cc : 1800, s : 700, a : 600, w : 900, b : 650, tl : 350, sam : 400, mt : 550, mgt : 425, ams : 1700
   }

   var tabelaCladiri =
   {
      rl :
      {
         min : 0, max : 49
      }
      , ms :
      {
         min : 0, max : 49
      }
      , cc :
      {
         min : 0, max : 49
      }
      , s :
      {
         min : 0, max : 49
      }
      , a :
      {
         min : 0, max : 49
      }
      , w :
      {
         min : 0, max : 49
      }
      , b :
      {
         min : 0, max : 49
      }
      , tl :
      {
         min : 0, max : 49
      }
      , sam :
      {
         min : 0, max : 49
      }
      , mt :
      {
         min : 0, max : 49
      }
      , mgt :
      {
         min : 0, max : 49
      }
      , ams :
      {
         min : 0, max : 49
      }
      , pp :
      {
         min : 0, max : 49
      }
      , app :
      {
         min : 0, max : 49
      }
   }


   var tds = document.getElementsByTagName("td");
   var makeMinMax4Buildings = function(bSize)
   {
      var bRet =
      {
         min : 0, max : 49
      }
      if (bSize.indexOf("(0-49)") != - 1)
      {
         bRet.min = 0;
         bRet.max = 49;
      }
      else if (bSize.indexOf("(50-124)") != - 1)
      {
         bRet.min = 50;
         bRet.max = 124;
      }
      else if (bSize.indexOf("(125-249)") != - 1)
      {
         bRet.min = 125;
         bRet.max = 249;

      }
      else if (bSize.indexOf("(250-499)") != - 1)
      {
         bRet.min = 250;
         bRet.max = 499;

      }
      else if (bSize.indexOf("(500-999)") != - 1)
      {
         bRet.min = 500;
         bRet.max = 999;

      }
      else if (bSize.indexOf("(1,000-2,499)") != - 1)
      {
         bRet.min = 1000;
         bRet.max = 2499;

      }
      else if (bSize.indexOf("(2,500-4,999)") != - 1)
      {
         bRet.min = 2500;
         bRet.max = 4999;

      }
      else if (bSize.indexOf("(5,000-?)") != - 1)
      {
         bRet.min = 5000;
         bRet.max = 10000;
      }
      else
      {
         throw "Spy sat report...";
      }
      return bRet;
   }


   for ( var i = 0; i < tds.length; i ++ )
   {
      var atd = tds[i];
      try
      {
         if (atd.innerHTML == "<b>Research Labs:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.rl = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Missile Silos:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.ms = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Command Centres:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.cc = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Shipyard:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.s = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Airfield:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.a = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>War Factories:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.w = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Barracks:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.b = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Power Plants:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.pp = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Advanced Power Plants:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.app = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Torpedo Launchers:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.tl = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>SAM Sites:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.sam = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Missile Turrets:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.mt = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Machinegun Turrets:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.mgt = makeMinMax4Buildings(bSize);
         }
         else if (atd.innerHTML == "<b>Anti-Missile Systems:</b>")
         {
            var bSize = tds[i + 1].innerHTML;
            tabelaCladiri.ams = makeMinMax4Buildings(bSize);
         }
      }
      catch(er)
      {
      }
   }

   var minPower =   tabelaCurent.rl * tabelaCladiri.rl.min + tabelaCurent.ms * tabelaCladiri.ms.min + tabelaCurent.cc * tabelaCladiri.cc.min + tabelaCurent.s * tabelaCladiri.s.min + tabelaCurent.a * tabelaCladiri.a.min + tabelaCurent.w * tabelaCladiri.w.min + tabelaCurent.b * tabelaCladiri.b.min + tabelaCurent.tl * tabelaCladiri.tl.min + tabelaCurent.sam * tabelaCladiri.sam.min + tabelaCurent.mt * tabelaCladiri.mt.min + tabelaCurent.mgt * tabelaCladiri.mgt.min + tabelaCurent.ams * tabelaCladiri.ams.min;

   var maxPower =   tabelaCurent.rl * tabelaCladiri.rl.max + tabelaCurent.ms * tabelaCladiri.ms.max + tabelaCurent.cc * tabelaCladiri.cc.max + tabelaCurent.s * tabelaCladiri.s.max + tabelaCurent.a * tabelaCladiri.a.max + tabelaCurent.w * tabelaCladiri.w.max + tabelaCurent.b * tabelaCladiri.b.max + tabelaCurent.tl * tabelaCladiri.tl.max + tabelaCurent.sam * tabelaCladiri.sam.max + tabelaCurent.mt * tabelaCladiri.mt.max + tabelaCurent.mgt * tabelaCladiri.mgt.max + tabelaCurent.ams * tabelaCladiri.ams.max;

   var minProd = tabelaCladiri.pp.min * 3000 + tabelaCladiri.app.min * 15000;
   var maxProd = tabelaCladiri.pp.max * 3000 + tabelaCladiri.app.max * 15000;

   var minUsage = (maxProd - minPower) * 100 / maxProd;
   var maxUsage = (minProd - maxPower) * 100 / minProd;

   var med = ((maxProd - maxPower) * 100 / maxProd + (minProd - minPower) * 100 / minProd ) / 2;
   
   console.log("min power: " + minPower + "; max power:" + maxPower);
   console.log("min power produced: " + minProd + "; max power produced:" + maxProd);
   console.log("min usage: " + (100 - minUsage).toFixed(1));
   console.log("max usage: " + (100 - maxUsage).toFixed(1));

   var printStuff = document.createElement('p');
   var txtStuff = "Max power usage: " + ((100 - maxUsage).toFixed(1)) + "% &nbsp;";
   txtStuff += "Min power usage: " + ((100 - minUsage).toFixed(1)) + "%<br>";
   txtStuff +="<b>Aproximare power usage: " + ((100 - med).toFixed(1)) + "%</b><br>";
   printStuff.innerHTML = txtStuff;
   var trs = document.getElementsByTagName("table");
   for (var ii = 0; ii < trs.length; ii ++ )
   {
      var tru = trs[ii];
      if (tru.innerHTML.search('Buildings') != - 1 && tru.innerHTML.search("<table>") == - 1)
      {
         tru.parentNode.insertBefore(printStuff, tru.nextSibling);
      }
   }
}