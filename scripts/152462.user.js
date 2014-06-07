// ==UserScript==
// @name           LoU Dungeons Riding+
// @namespace      JR_LoU_DR
// @description    Además lee reportes y los pasa al correo
// @author         Original de Janko Radusinovic, OzGoober
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.0
// @require http://sizzlemctwizzle.com/updater.php?id=132554&uso
// ==/UserScript==

(function() {
        try {
                // -- outer shell, ttt_script
                var ttt_script = function() {
                        try {
                                // -- inner shell, ttt_script
                                function ttt_main() {
                                        try {

/*********************************************/
   qx.core.Init.getApplication().getCityInfoPage();
   var gLouInfo = new qx.ui.form.Button("Obtener Reportes");
   gLouInfo.set({appearance: "button-text-small", toolTipText: "Reportes"});
   gLouInfo.addListener("click", function(){gLouReport();}, gLouInfo);
   qx.core.Init.getApplication().cityInfoPage.add(gLouInfo, {top: 3, right: 60});

function gLouReport()
{
      var gMail=""; var gCx=""; var gCy=""; var gCn=""; // contenedores
      var gPl=qx.core.Init.getApplication().cityInfoPage.playerLabel.getValue();
      var gCxy = qx.core.Init.getApplication().cityDetailView.city.get_Coordinates();
      var gCtx=gCxy&0xFFFF; gCx+=gCtx; if(gCtx<100) gCx="0"+gCtx; // cord. xy
      var gCty=gCxy>>16; gCy+=gCty; if(gCty<100) gCy="0"+gCty; gCn=gCy[0]+gCx[0];
      var gPara=null; // se usará mas adelante
      var gCC=null; // se usará mas adelante
      var gAsunto=gPl+" c"+gCn+" ("+gCx+":"+gCy+")"; // se prepara el asunto del correo.
      var gInfo = qx.core.Init.getApplication().cityInfoPage.headerData.getRowData(0);
      for(var gTable=0; gInfo!=null; gTable++)
      {
          for(var gChar=0; gInfo.s[gChar]!=null; gChar++)
          {
              if (gInfo.s[gChar]=="'" && gInfo.s[gChar+1]=="/" && gInfo.s[gChar+2]==">")
             {
                  gChar +=3;
                  while(gInfo.s[gChar]!=null)
                 {
                       if(gInfo.s[gChar]=="<") break;
                       gMail += gInfo.s[gChar];
                       gChar++;
                  }
                  break;
             }
          }
           gInfo = qx.core.Init.getApplication().cityInfoPage.headerData.getRowData(gTable);
           gMail += "\n";
      }
      qx.core.Init.getApplication().switchOverlay();
      qx.core.Init.getApplication().showSendMail(gPara,gCC,null,null,null,0);
      qx.core.Init.getApplication().sendMail.message.setValue(gMail);
      qx.core.Init.getApplication().sendMail.subject.setValue(gAsunto);
}
/*********************************************/
                                                const bossKill = [50, 300, 2000, 4000, 10000, 15000, 20000, 30000, 45000, 60000];
                                                const dungeonKill = [32, 100, 200, 1500, 3000, 5685, 11728, 19821, 36000, 44138];

                                                // TODO
                                                // 1. Capacidad de Saqueo
                                                // 2. Sugerir otras tropas
                                                // 3. Progreso de la mazmorra

                                                var l = qx.locale.Manager.getInstance().getLocale();
                                                if(l != "en" || l != "es")
                                                        l = "es";
                                                const tr = {
                                                        "en" : {
                                                                "weak" : "Weakness",
                                                        },
                                                        "es" : {
                                                                "weak" : "Debilidad",
                                                        },
                                                }

                                                var a = qx.core.Init.getApplication();
                                                var r = webfrontend.res.Main.getInstance();

                                                const nameC = a.tr("tnf:name:").charAt(0);
                                                const typeC = a.tr("tnf:type:").charAt(0);
                                                const levelT = a.tr("tnf:level:");

                                                //<table cellspacing="0"><tr><td width="75">Name:</td><td>Dragon</td></tr><tr><td>Since:</td><td>Yesterday 22:04:43</td></tr><tr><td>Level:</td><td>7</td></tr>
                                                //<table cellspacing="0"><tr><td width="75">Type:</td><td>Mountain Dungeon</td></tr><tr><td>Since:</td><td>31.07. 01:15:18</td></tr><tr><td>Level:</td><td>9</td></tr><tr><td>Progress:</td><td>94%</td></tr>

                                                const sHdr = '<table cellspacing="0"><tr><td width="75">';
                                                const sRow = "</td><td>";
                                                const pId = sHdr.length;
                                                const pRow = sRow.length;
                                                const weakT = tr[l]["weak"] + ':' ;
                                                const zergT = r.units["6"].dn+ sRow;

                                                // "Name" or "Type", Boss or Dungeon
                                                // Desc offset
                                                const pBName = pId + pRow + a.tr("tnf:name:").length;
                                                const pDName = pId + pRow + a.tr("tnf:type:").length;
                                                // Level offset
                                                const pLevel = pRow + a.tr("tnf:level:").length;

                                                // Bosque                Dragon                Caballeria                Madera
                                                // Montaña                Hidra                Infanteria        Hierro
                                                // Colina                        Moloch                Magia                Piedra
                                                // Mar                        Pulpo                Artilleria         Comida

                                                var cavT = r.attackTypes["2"].dn;
                                                var infT = r.attackTypes["1"].dn;
                                                var magT = r.attackTypes["4"].dn;
                                                var artT = r.attackTypes["3"].dn;

                                                var dragC = r.dungeons["6"].dn.charAt(0);
                                                var hydrC = r.dungeons["8"].dn.charAt(0);
                                                var moloC = r.dungeons["7"].dn.charAt(0);
                                                var octyC = r.dungeons["12"].dn.charAt(0);

                                                var forstC = r.dungeons["5"].dn.charAt(0);
                                                var mountC = r.dungeons["4"].dn.charAt(0);
                                                var hillC = r.dungeons["3"].dn.charAt(0);
                                                var seaC = r.dungeons["2"].dn.charAt(0);

                                                function getBossWeakness(name) {
                                                        if(name == dragC)
                                                                return cavT;
                                                        else if(name == hydrC)
                                                                return infT;
                                                        else if(name == moloC)
                                                                return magT;
                                                        else if(name == octyC)
                                                                return artT;
                                                        else
                                                                return "";
                                                }

                                                function getDungeonWeakness(name) {
                                                        if(name == forstC)
                                                                return cavT;
                                                        else if(name == mountC)
                                                                return infT;
                                                        else if(name == hillC)
                                                                return magT;
                                                        else if(name == seaC)
                                                                return artT;
                                                        else
                                                                return "";
                                                }

                                                function toolTipAppear() {
                                                        try {
                                                                var tip = a.worldViewToolTip;
                                                                var mode = tip.getMode();
                                                                if(mode == 'c' || mode == 'd') {
                                                                        // if(tip.contextObject)
                                                                } else {
                                                                        var text = tip.getLabel();
                                                                        if(text != null || text.length > pId) {
                                                                                var type = text.charAt(pId);
                                                                                if(type == nameC) { // Name:
                                                                                        //Boss
                                                                                        var weak = getBossWeakness(text.charAt(pBName));
                                                                                        var lPos = text.indexOf(levelT, pBName) + pLevel;
                                                                                        var level = text.charAt(lPos);
                                                                                        if(level == '1') {
                                                                                                if(text.charAt(lPos + 1) == '0')
                                                                                                        level = '10';
                                                                                        }
                                                                                        var zergs = webfrontend.gui.Util.formatNumbers(bossKill[ parseInt(level) - 1]);
                                                                                        var sb = new qx.util.StringBuilder(2048);
                                                                                        sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td>", zergT, zergs, "</td></tr></table>");
                                                                                        tip.setLabel(sb.get());

                                                                                } else if(type == typeC) { // Type:
                                                                                        //Dungeon
                                                                                        

                                                                                        var weak = getDungeonWeakness(text.charAt(pDName));
                                                                                        var weakFB='' ;var weakFE='' ;   if (forstC==text.charAt(pDName)) {weakFB='<b>';weakFE='</b>';}
                                                                                        var weakMB='' ;var weakME='' ;   if (mountC==text.charAt(pDName)) {weakMB='<b>';weakME='</b>';}
                                                                                        var weakHB='' ;var weakHE='' ;   if (hillC ==text.charAt(pDName)) {weakHB='<b>';weakHE='</b>';}

                                                                                        var lPos = text.indexOf(levelT, pDName) + pLevel;
                                                                                        var level = text.charAt(lPos);
                                                                                        if(level == '1') {
                                                                                                if(text.charAt(lPos + 1) == '0')
                                                                                                        level = '10';
                                                                                        }



                                                                                        var   progress ="";
                                                                                        for (i=35;i<50;i++){
                                                                                             if (text.charAt(lPos+i )>= '0') {
                                                                                              if (text.charAt(lPos+i )<= '9') {
                                                                                               progress = progress +text.charAt(lPos+i );
                                                                                             }
                                                                                             }

                                                                                        }



                                                                                            
                                                                                        var multiplier=   (1.00+progress/50.00);
                                                                                        
                                                                                        var mRec=multiplier + (3-multiplier)/4;
                                                                                        
                                                                                        var q10 =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier));
                                                                                        var q5  =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier*2));
                                                                                        var q15 =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier/1.5));
                                                                                        var q20 =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier/2));
                                                                                        var q1000 =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier/100));
                                                                                        var q1500 =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier/150));
                                                                                        var q3000 =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*multiplier/300));

                                                                                        var q10Max =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3));
                                                                                        var q5Max  =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3*2));
                                                                                        var q15Max =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3/1.5));
                                                                                        var q20Max =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3/2));
                                                                                        var q1000Max =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3/100));
                                                                                        var q1500Max =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3/150));
                                                                                        var q3000Max =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*3/300));

                                                                                        var q10Rec =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec));
                                                                                        var q5Rec  =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec*2));
                                                                                        var q15Rec =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec/1.5));
                                                                                        var q20Rec =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec/2));
                                                                                        var q1000Rec =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec/100));
                                                                                        var q1500Rec =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec/150));
                                                                                        var q3000Rec =webfrontend.gui.Util.formatNumbers(Math.round(dungeonKill[ parseInt(level) - 1]*mRec/300));

                                                                                        var lRanger     =  weakMB+r.units["3"].dn+weakME;
                                                                                        var lRGZG     =  weakMB+'Z+G, R+G'+weakME;
                                                                                        var lGuardian   =  weakMB+r.units["4"].dn+weakME;
                                                                                        var lTemplar    =  weakMB+r.units["5"].dn+weakME;
                                                                                        var lBerseker   =  weakMB+r.units["6"].dn+weakME;
                                                                                        var lMage       =  weakHB+r.units["7"].dn+weakHE;
                                                                                        var lCrossbowman=  weakFB+r.units["9"].dn+weakFE;
                                                                                        var lPaladin    =  weakFB+r.units["10"].dn+weakFE;
                                                                                        var lKnight     =  weakFB+r.units["11"].dn+weakFE;
                                                                                        var lWarlock    =  weakHB+r.units["12"].dn+weakHE;
                                                                                        var lFrigate    =  r.units["15"].dn;
                                                                                        var lSloop      =  r.units["16"].dn;
                                                                                        var lWarGaleon  =  r.units["17"].dn;
                                                                                        
                                                                                        var Units5=      ('<NOBR>'+lMage+'</NOBR>').replace(" ","&nbsp");
                                                                                        var Units10=     ('<NOBR>'+lBerseker+','+lRanger+','+lTemplar+','+lWarlock+'</NOBR>').replace(" ","&nbsp");
                                                                                        var Units15=     ('<NOBR>'+lCrossbowman+','+lKnight+','+lRGZG+'</NOBR>').replace(" ","&nbsp");
                                                                                        var Units20=     ('<NOBR>'+lPaladin +','+ lGuardian+'</NOBR>').replace(" ","&nbsp");
                                                                                        var Units1000=     ('<NOBR>'+lFrigate+'</NOBR>').replace(" ","&nbsp");
                                                                                        var Units1500=     ('<NOBR>'+lSloop+'</NOBR>').replace(" ","&nbsp");
                                                                                        var Units3000=     ('<NOBR>'+lWarGaleon+'</NOBR>').replace(" ","&nbsp");




                                                                                        var sb = new qx.util.StringBuilder(4048);
                                                                                        if (seaC ==text.charAt(pDName)) {
                                                                                           sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td><table border=0 color=red><tr><td aling=left>Units**:</td><td>Minimum</td><td>Recomended</td><td>&nbsp;&nbsp;&nbsp;Maximum</td></tr><tr><td>", Units1000,'</td><td align=right>',q1000 , '</td><td align=right>',q1000Rec , '</td><td align=right>',q1000Max , '</td></tr><tr><td>', Units1500,'</td><td align=right>', q1500, '</td><td align=right>', q1500Rec, '</td><td align=right>', q1500Max, '</td></tr><tr><td>', Units3000,'</td><td align=right>', q3000, '</td><td align=right>', q3000Rec, '</td><td align=right>', q3000Max, '</td></tr></table>');
                                                                                         }
                                                                                         else{
                                                                                         sb.add(text, sHdr, weakT, weak, "</td></tr><tr><td><table border=0 color=red><tr><td aling=left>Units*:</td><td>Minimum</td><td>Recomended</td><td>&nbsp;&nbsp;&nbsp;Maximum</td></tr><tr><td>", Units10,'</td><td align=right>',q10 , '</td><td align=right>',q10Rec , '</td><td align=right>',q10Max , '</td></tr><tr><td>', Units15,'</td><td align=right>', q15, '</td><td align=right>', q15Rec, '</td><td align=right>', q15Max, '</td></tr><tr><td>', Units20,'</td><td align=right>', q20, '</td><td align=right>', q20Rec, '</td><td align=right>', q20Max, '</td></tr><tr><td>', Units5,'</td><td align=right>',q5 , '</td><td align=right>',q5Rec , '</td><td align=right>',q5Max , '</td></tr></table></td></tr></table>');
                                                                                         }
                                                                                        tip.setLabel(sb.get());
                                                                                }
                                                                        }
                                                                }

                                                        } catch (e) {
                                                                console.error(e);
                                                        }
                                                }

                                                a.worldViewToolTip.addListener("appear", toolTipAppear, this);

                                        } catch (e) {
                                                console.error(e);
                                        }

                                } // -- inner shell, ttt_script

                                // -- inject inner shell
                                const checktime = 1000;
                                function checkLoULoading() {
                                        window.setTimeout(checkLoUReady, checktime);
                                }

                                function checkLoUReady() {
                                        try {
                                                if( typeof qx === "undefined") {
                                                        console.log("wait Qx");
                                                        checkLoULoading();
                                                        return;
                                                }
                                                var loadingScreen = document.getElementById("loadingscreen");
                                                if(loadingScreen) {
                                                        if(loadingScreen.style.display == "block") {
                                                                console.log("wait load");
                                                                checkLoULoading();
                                                                return;
                                                        }
                                                }
                                                var isReady = false;
                                                var a = qx.core.Init.getApplication();
                                                var p = webfrontend.data.Player.getInstance();
                                                var r = webfrontend.res.Main.getInstance();
                                                if(a && p && r)
                                                        if(a.worldView)
                                                                isReady = true;
                                                if(isReady) {
                                                        console.log("checkLoUReady done!");
                                                        ttt_main();
                                                } else {
                                                        console.log("wait app");
                                                        checkLoULoading();
                                                        return;
                                                }
                                        } catch (e) {
                                                console.error(e);
                                        }
                                };

                                console.log("LoU ToolTip Tweak");
                                checkLoULoading();
                                // -- inject inner shell

                        } catch (e) {
                                console.error(e);
                        }
                } // -- outer shell, ttt_script
                // -- inject outer shell
                var script = document.createElement("script");
                script.innerHTML = "(" + ttt_script.toString() + ")();";
                script.type = "text/javascript";
                document.getElementsByTagName("head")[0].appendChild(script);
                // -- inject outer shell
        } catch (e) {
                console.error(e);
        }
})();