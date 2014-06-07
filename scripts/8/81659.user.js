// ==UserScript==
// @name           Ressources
// @version      
// @date           2010-17-07
// @namespace      
// @description    Management of tranfers, Empire view, Global resources view
// @include        http://uni*.ogame.*
// ==/UserScript==

function RefreshPlanet() {
  try {
    GMsetRefreshValue((PlanetSelect.length-1),AutoUpdateRest);
    if (PlanetSelectedIndex == (PlanetSelect.length-1)) {
      window.setTimeout('window.location.replace(\''+A_Planet[0].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
    else {
      window.setTimeout('window.location.replace(\''+A_Planet[(PlanetSelectedIndex+1)].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
  }
  catch(err) {
    ShowError(err, 'RefreshPlanet()');
  }
}
unsafeWindow.RefreshPlanet = RefreshPlanet;

function CalcRealTimeResources() {
  try {
    Counter = new Date();
    A_RealTimeResources = new Array(PlanetSelect.length+1);
    A_RealTimeResources[PlanetSelect.length] = new P_RealTimeResources();
    A_RealTimeResources[PlanetSelect.length].Metal = 0;
    A_RealTimeResources[PlanetSelect.length].Crystal = 0;
    A_RealTimeResources[PlanetSelect.length].Deuterium = 0;
    for (var k = 0; k < PlanetSelect.length; k++) {
      if ((A_Resources[k].Metal != undefined) && (A_Resources[k].Metal != '-')) {
        A_RealTimeResources[k] = new P_RealTimeResources();
        var Time = Math.round((Counter.getTime()-A_Resources[k].Update)/1000);
        A_RealTimeResources[k].Metal = Math.round(parseInt(A_Resources[k].Metal)+(Time*(A_Production[k].Metal/3600)));
        if (A_RealTimeResources[k].Metal > A_Production[k].MetalMax*1000) {
          if (parseInt(A_Resources[k].Metal) > A_Production[k].MetalMax*1000) {
            A_RealTimeResources[k].Metal = parseInt(A_Resources[k].Metal);
          }
          else {
            A_RealTimeResources[k].Metal = A_Production[k].MetalMax*1000;
          }
          if (A_Planet[k].Type == C_Planet) {
            document.getElementById('Metal'+k).style.textDecoration = 'blink';
          }
        }
        A_RealTimeResources[PlanetSelect.length].Metal = A_RealTimeResources[PlanetSelect.length].Metal+A_RealTimeResources[k].Metal;
        A_RealTimeResources[k].Crystal = Math.round(parseInt(A_Resources[k].Crystal)+(Time*(A_Production[k].Crystal/3600)));
        if (A_RealTimeResources[k].Crystal > A_Production[k].CrystalMax*1000) {
          if (parseInt(A_Resources[k].Crystal) > A_Production[k].CrystalMax*1000) {
            A_RealTimeResources[k].Crystal = parseInt(A_Resources[k].Crystal);
          }
          else {
            A_RealTimeResources[k].Crystal = A_Production[k].CrystalMax*1000;
          }
          if (A_Planet[k].Type == C_Planet) {
            document.getElementById('Crystal'+k).style.textDecoration = 'blink';
          }
        }
        A_RealTimeResources[PlanetSelect.length].Crystal = A_RealTimeResources[PlanetSelect.length].Crystal+A_RealTimeResources[k].Crystal;
        A_RealTimeResources[k].Deuterium = Math.round(parseInt(A_Resources[k].Deuterium)+(Time*(A_Production[k].Deuterium/3600)));
        if (A_RealTimeResources[k].Deuterium > A_Production[k].DeuteriumMax*1000) {
          if (parseInt(A_Resources[k].Deuterium) > A_Production[k].DeuteriumMax*1000) {
            A_RealTimeResources[k].Deuterium = parseInt(A_Resources[k].Deuterium);
          }
          else {
            A_RealTimeResources[k].Deuterium = A_Production[k].DeuteriumMax*1000;
          }
          if (A_Planet[k].Type == C_Planet) {
            document.getElementById('Deuterium'+k).style.textDecoration = 'blink';
          }
        }
        A_RealTimeResources[PlanetSelect.length].Deuterium = A_RealTimeResources[PlanetSelect.length].Deuterium+A_RealTimeResources[k].Deuterium
        if (document.getElementById('ResourcesDiv')) {
          var Table = document.getElementById('ResourcesDiv').getElementsByTagName('table')[0];
          if ((Table) && (RealTimeResources==true)) {
            document.getElementById('Metal'+k).innerHTML = FormatNb(A_RealTimeResources[k].Metal);
            document.getElementById('Crystal'+k).innerHTML = FormatNb(A_RealTimeResources[k].Crystal);
            document.getElementById('Deuterium'+k).innerHTML = FormatNb(A_RealTimeResources[k].Deuterium);
            var Color = PlanetTimeUpdate(k,false,true);
            Table.rows[1].cells[(k+1)].style.background = Color;
            Table.rows[2].cells[(k+1)].style.background = Color;
            Table.rows[3].cells[(k+1)].style.background = Color;
            Table.rows[4].cells[(k+1)].style.background = Color;
            if (ShowTimeUpdate == true) {
              document.getElementById('Update'+k).innerHTML = FormatTime(Time*1000);
              Table.rows[5].cells[(k+1)].style.background = Color;
            }
          }
        }
      }
    }
    if ((Table) && (ShowTotal==true) && (RealTimeResources == true)) {
      document.getElementById('MetalTotal').innerHTML = FormatNb(A_RealTimeResources[PlanetSelect.length].Metal);
      document.getElementById('CrystalTotal').innerHTML = FormatNb(A_RealTimeResources[PlanetSelect.length].Crystal);
      document.getElementById('DeuteriumTotal').innerHTML = FormatNb(A_RealTimeResources[PlanetSelect.length].Deuterium);
    }
    if (RealTimeResources == true) {
      window.setTimeout('CalcRealTimeResources()', RealTimeResourcesDelay*1000);
    }
  }
  catch(err) {
    ShowError(err, 'CalcRealTimeResources()');
  }
}
unsafeWindow.CalcRealTimeResources = CalcRealTimeResources;

if (RefreshPlanetRest > 0) {
  try {
    GMsetRefreshValue((RefreshPlanetRest-1),AutoUpdateRest);
    if (PlanetSelectedIndex == (PlanetSelect.length-1)) {
      window.setTimeout('window.location.replace(\''+A_Planet[0].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
    else {
      window.setTimeout('window.location.replace(\''+A_Planet[(PlanetSelectedIndex+1)].Url+'\')', ((UseRandomUpdateTime == true) ? Math.round(Math.random()*8000+2000) : 1000));
    }
  }
  catch(err) {
    ShowError(err, 'Refresh overview page of all planets');
  }
}

function ShowHideColumn(Id) {
  try {
    if (Id < PlanetSelect.length) {
      if (document.getElementById('Planet'+Id).style.display == 'none') {
        var Display = '';
        document.getElementById('ImgShowHide'+Id).src = C_ImgLeft;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Hide]+' '+A_Planet[Id].Name;
      }
      else {
        var Display = 'none';
        document.getElementById('ImgShowHide'+Id).src = C_ImgRight;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Show]+' '+A_Planet[Id].Name;
      }
      document.getElementById('Planet'+Id).style.display = Display;
      document.getElementById('Metal'+Id).style.display = Display;
      document.getElementById('Crystal'+Id).style.display = Display;
      document.getElementById('Deuterium'+Id).style.display = Display;
      document.getElementById('Energy'+Id).style.display = Display;
      if (ShowTimeUpdate == true) {
        document.getElementById('Update'+Id).style.display = Display;
      }
    }
    // Colonne total
    else if ((Id == PlanetSelect.length)&& (document.getElementById('Total'))) {
      if (document.getElementById('Total').style.display == 'none') {
        var Display = '';
        document.getElementById('ImgShowHide'+Id).src = C_ImgLeft;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Hide]+' '+A_Language[C_Total];
      }
      else {
        var Display = 'none';
        document.getElementById('ImgShowHide'+Id).src = C_ImgRight;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Show]+' '+A_Language[C_Total];
      }
      document.getElementById('Total').style.display = Display;
      document.getElementById('MetalTotal').style.display = Display;
      document.getElementById('CrystalTotal').style.display = Display;
      document.getElementById('DeuteriumTotal').style.display = Display;
    }
    // Colonne antimatiere
    else if (document.getElementById('DarkMatterTitle')) {
      if (document.getElementById('DarkMatterTitle').style.display == 'none') {
        var Display = '';
        document.getElementById('ImgShowHide'+Id).src = C_ImgLeft;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Hide]+' '+A_Language[C_DarkMatter];
      }
      else {
        var Display = 'none';
        document.getElementById('ImgShowHide'+Id).src = C_ImgRight;
        if (AddToolTip == true) document.getElementById('ImgShowHide'+Id).title = A_Language[C_Show]+' '+A_Language[C_DarkMatter];
      }
      document.getElementById('DarkMatterTitle').style.display = Display;
      document.getElementById('DarkMatterValue').style.display = Display;
    }
    // Memorisation
    var Value = ''; 
    for (j = 0; j < PlanetSelect.length; j++) {
      Value += document.getElementById('Planet'+j).style.display+';|';
    }
    Value += ((document.getElementById('Total'))?document.getElementById('Total').style.display:'')+';|'+
    ((document.getElementById('DarkMatterTitle'))?document.getElementById('DarkMatterTitle').style.display+';':';');
    GMsetValue('OT_'+Account+'_ShowHideColumn', Value);
  }
  catch(err) {
    ShowError(err, 'ShowHideColumn('+Id+')');
  }
}
unsafeWindow.ShowHideColumn = ShowHideColumn;

// Affichage du tableau de ressources en entete
if (((ShowHeaderResourcesTable == true) || ((ForceDisplayHeaderResourcesTableWithEmpire == true) && (OgameEmpire == true))) && (OgamePage != 'galaxy') && (HeaderDiv)) {
  
  try {
    //Initialisation des variables
    var ResourcesDiv = document.createElement('div');
    ResourcesDiv.setAttribute('id','ResourcesDiv');
    var PlanetTd = '';
    var MetalTd = '';
    var CrystalTd = '';
    var DeuteriumTd = '';
    var EnergieTd = '';
    var TimeUpdateTd = '';
    var TimeUpdate = '';
    var MetalTotal = 0;
    var CrystalTotal = 0;
    var DeuteriumTotal = 0;
    var Coordinates = '';
    
    if (RealTimeResources == true) {
      window.setTimeout('CalcRealTimeResources()', 1000);
    }
    
    // Generation des donnees du tableau
    for (var i = 0; i < PlanetSelect.length; i++) {
      
      // Creation de l'entete du tableau d'apercu du stock et du tableau de resultat du calcul
      Coordinates = '['+A_Planet[i].Galaxy+':'+A_Planet[i].System+':'+A_Planet[i].Planet+']';
      
      if (i == PlanetSelectedIndex) {
        PlanetTd += '<th align="center" id="PlanetSelected"><div id="Planet'+i+'" style="display:'+A_ShowHideColomn[i]+'"><a style="cursor:pointer" onclick="GMsetRefreshValue('+OgameEmpire+','+RefreshPlanetRest+','+AutoUpdateRest+');SaveTransfer();window.location.replace(\''+A_Planet[i].Url+'\');" '+((AddToolTip == true)?'title="'+Coordinates+'"':'')+'>'+((ShowPlanetName == true)?A_Planet[i].Name:'')+(((ShowPlanetName == true) && (ShowCoordinates == true))?'<br>':'')+((ShowCoordinates == true)?Coordinates:'')+'</a></div></th>\n'+
        '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+i+')"><img id="ImgShowHide'+i+'" src="'+((A_ShowHideColomn[i] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'"':'')+'></td>\n';
      }
      else {
        PlanetTd += '<td class="c" align="center"><div id="Planet'+i+'" style="display:'+A_ShowHideColomn[i]+'"><a style="cursor:pointer" onclick="'+((OgameEmpire==true)?'GMsetValue(\'OT_OgameEmpire\','+OgameEmpire+');':'')+'SaveTransfer();window.location.replace(\''+A_Planet[i].Url+'\');" '+((AddToolTip == true)?'title="'+Coordinates+'"':'')+'>'+((ShowPlanetName == true)?A_Planet[i].Name:'')+(((ShowPlanetName == true) && (ShowCoordinates == true))?'<br>':'')+((ShowCoordinates == true)?Coordinates:'')+'</a></div></td>\n'+
        '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+i+')"><img id="ImgShowHide'+i+'" src="'+((A_ShowHideColomn[i] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[i] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Planet[i].Name+'"':'')+'></td>\n';
      }
      
      // Generation des lignes de ressources et d'energie du tableau (si des donnees memorisees sont trouvees sinon on affiche rien)
      if (A_Resources[i].Metal) {
        TimeUpdate = PlanetTimeUpdate(i, false);
        MetalTotal = MetalTotal + ((A_Resources[i].Metal!='-')?parseInt(A_Resources[i].Metal):0);
        CrystalTotal = CrystalTotal + ((A_Resources[i].Crystal!='-')?parseInt(A_Resources[i].Crystal):0);
        DeuteriumTotal = DeuteriumTotal + ((A_Resources[i].Deuterium!='-')?parseInt(A_Resources[i].Deuterium):0);
        MetalTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 0, A_Planet[i].Type)+'"><div id="Metal'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatNb(A_Resources[i].Metal)+'</div></td>\n';
        CrystalTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 1, A_Planet[i].Type)+'"><div id="Crystal'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatNb(A_Resources[i].Crystal)+'</div></td>\n';
        DeuteriumTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 2, A_Planet[i].Type)+'"><div id="Deuterium'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatNb(A_Resources[i].Deuterium)+'</div></td>\n';
        EnergieTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+ResourcesOver(i, 3, A_Planet[i].Type)+'"><div id="Energy'+i+'" style="display:'+A_ShowHideColomn[i]+'">\n';
        EnergieTd += (A_Resources[i].FreeEnergy != '') ? FormatNb(A_Resources[i].FreeEnergy)+'/'+FormatNb(A_Resources[i].TotalEnergy) : '';
        EnergieTd += '</div></td>\n';
        if (ShowTimeUpdate == true) {
          TimeUpdateTd += '<td colspan="2" style="width:5px !important" align="right" class="'+TimeUpdate+'"><div id="Update'+i+'" style="display:'+A_ShowHideColomn[i]+'">'+FormatTime(PlanetTimeUpdate(i, true))+'</div></td>\n';
        }
      }
      else {
        MetalTd += '<td align="right" class="Time10" colspan="2"><div id="Metal'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        CrystalTd += '<td align="right" class="Time10" colspan="2"><div id="Crystal'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        DeuteriumTd += '<td align="right" class="Time10" colspan="2"><div id="Deuterium'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        EnergieTd += '<td align="right" class="Time10" colspan="2"><div id="Energy'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        if (ShowTimeUpdate == true) {
          TimeUpdateTd += '<td align="right" class="Time10" colspan="2"><div id="Update'+i+'" style="display:'+A_ShowHideColomn[i]+'"></div></td>\n';
        }
      }
    }
    
    // Creation du tableau
    ResourcesDiv.innerHTML = '<table id="planetResources">\n'+
    // Bouton precedent, mise a jour, suivant 
    '<tr><td class="c"><div style="display:inline !important;"><input style="width:19px!important;height:16px!important;margin-right:1px;border:none!important;background:transparent !important" type="image" src="'+C_ImgPrevious+'" name="previous" '+((AddToolTip == true)?'title="'+A_Language[C_PreviousPlanet]+'"':'')+' onclick="window.location.replace(\''+A_Planet[((PlanetSelectedIndex == 0) ? (PlanetSelect.length-1) : (PlanetSelectedIndex-1))].Url+'\');">'+
    (((AutoUpdateRest == 0) && (RefreshPlanetRest > 0)) ? '<input type="image" src="'+C_ImgStop+'" style="width:16px!important;height:16px!important;margin-left:1px;margin-right:1px;border:none!important;background:transparent !important" name="refresh" '+((AddToolTip == true)?'title="'+A_Language[C_UpdateStopInformations]+'" onclick="StopUpdate();"':'')+'>' : '<input style="width:11px!important;height:16px!important;margin-left:1px;margin-right:1px;border:none!important;background:transparent !important" type="image" src="'+C_ImgPlay+'" name="refresh" '+((AddToolTip == true)?'title="'+A_Language[C_UpdatePages]+'"':'')+' onclick="RefreshPlanet();">')+
    '<input style="width:19px!important;height:16px!important;margin-left:1px;border:none!important;background:transparent !important" type="image" src="'+C_ImgNext+'" name="next" '+((AddToolTip == true)?'title="'+A_Language[C_NextPlanet]+'"':'')+' onclick="window.location.replace(\''+A_Planet[((PlanetSelectedIndex == (PlanetSelect.length-1)) ? 0 : (PlanetSelectedIndex+1))].Url+'\');"></div></td>\n'+
    // Liste des planetes
    PlanetTd+
    // Total
    ((ShowTotal == true) ? '<td class="c" style="font-weight:bold; text-decoration:none;" align="center"><div id="Total" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+A_Language[C_Total]+'</div></td>\n'+
    '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+PlanetSelect.length+')"><img id="ImgShowHide'+PlanetSelect.length+'" src="'+((A_ShowHideColomn[PlanetSelect.length] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[PlanetSelect.length] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_Total]+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[PlanetSelect.length] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_Total]+'"':'')+'></td>\n' : '')+
    // Antimatiere
    ((ShowDarkMatter == true) ? '<td class="c" align="center" style="font-weight:bold; padding-left:3px; padding-right:3px;"><div id="DarkMatterTitle" style="display:'+A_ShowHideColomn[(PlanetSelect.length+1)]+'">'+A_Language[C_DarkMatter]+'</div></td>\n'+
    '<td class="c" style="width:7px! important;cursor:pointer" onclick="javascript:ShowHideColumn('+(PlanetSelect.length+1)+')"><img id="ImgShowHide'+(PlanetSelect.length+1)+'" src="'+((A_ShowHideColomn[(PlanetSelect.length+1)] == 'none;')?C_ImgRight:C_ImgLeft)+'" alt="'+((A_ShowHideColomn[(PlanetSelect.length+1)] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_DarkMatter]+'" '+((AddToolTip == true)?'title="'+((A_ShowHideColomn[(PlanetSelect.length+1)] == 'none;')?A_Language[C_Show]:A_Language[C_Hide])+' '+A_Language[C_DarkMatter]+'"':'')+'></td>\n' : '')+
    '</tr>'+
    // Ressources
    '<tr><th style="font-weight:bold">'+A_Language[C_Metal]+'</th>\n'+MetalTd+((ShowTotal == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="MetalTotal" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+FormatNb(MetalTotal)+'</div></th>' : '')+((ShowDarkMatter == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="DarkMatterValue" style="display:'+A_ShowHideColomn[(PlanetSelect.length+1)]+'">'+FormatNb(DarkMatter)+'</div></th>' : '')+'</tr>\n'+
    '<tr><th style="font-weight:bold">'+A_Language[C_Crystal]+'</th>\n'+CrystalTd+((ShowTotal == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="CrystalTotal" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+FormatNb(CrystalTotal)+'</div></th>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n'+
    '<tr><th style="font-weight:bold">'+A_Language[C_Deuterium]+'</th>\n'+DeuteriumTd+((ShowTotal == true) ? '<th style="font-weight:bold" colspan="2" style="width:5px !important"><div id="DeuteriumTotal" style="display:'+A_ShowHideColomn[PlanetSelect.length]+'">'+FormatNb(DeuteriumTotal)+'</div></th>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n'+
    '<tr><th style="font-weight:bold">'+A_Language[C_Energy]+'</th>\n'+EnergieTd+((ShowTotal == true) ? '<td colspan="2"></td>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n'+
    ((ShowTimeUpdate == true) ? '<tr><th style="font-weight:bold">'+String(A_Language[C_Update]).replace(/([ ])/g,'&nbsp;')+'</th>\n'+TimeUpdateTd+((ShowTotal == true) ? '<td colspan="2"></td>' : '')+((ShowDarkMatter == true) ? '<td colspan="2"></td>' : '')+'</tr>\n' : '')+
    '</table>';
    
    // Affichage du tableau
    document.getElementsByTagName('body')[0].appendChild(ResourcesDiv);
  }
  catch(err) {
    ShowError(err, 'Resources table');
  }
}
// Ajoute la ligne total au tableau de ressources par defaut
if (AddResourcesTotal == true) {
  try {
    var MetalTotal = 0;
    var CrystalTotal = 0;
    var DeuteriumTotal = 0;
    for (var i = 0; i < PlanetSelect.length; i++) {
      if (A_Resources[i].Metal) {
        MetalTotal = MetalTotal + parseInt(A_Resources[i].Metal);
        CrystalTotal = CrystalTotal + parseInt(A_Resources[i].Crystal);
        DeuteriumTotal = DeuteriumTotal + parseInt(A_Resources[i].Deuterium);
      }
    }
    if (HeaderDiv) {
      var TotalTr = document.createElement('tr');
      TotalTr.setAttribute('class','header');
      var MetalTotalTd = document.createElement('td');
      MetalTotalTd.setAttribute('class','header');
      MetalTotalTd.setAttribute('width','90');
      MetalTotalTd.setAttribute('align','center');
      MetalTotalTd.textContent = FormatNb(MetalTotal);
      TotalTr.appendChild(MetalTotalTd);
      var CrystalTotalTd = document.createElement('td');
      CrystalTotalTd.setAttribute('class','header');
      CrystalTotalTd.setAttribute('width','90');
      CrystalTotalTd.setAttribute('align','center');
      CrystalTotalTd.textContent = FormatNb(CrystalTotal);
      TotalTr.appendChild(CrystalTotalTd);
      var DeuteriumTotalTd = document.createElement('td');
      DeuteriumTotalTd.setAttribute('class','header');
      DeuteriumTotalTd.setAttribute('width','90');
      DeuteriumTotalTd.setAttribute('align','center');
      DeuteriumTotalTd.textContent = FormatNb(DeuteriumTotal);
      TotalTr.appendChild(DeuteriumTotalTd);
      var NullTd = document.createElement('td');
      NullTd.setAttribute('style','background:none');
      NullTd.setAttribute('colspan','2');
      TotalTr.appendChild(NullTd);
      document.getElementById('resources').appendChild(TotalTr);
    }
  }
  catch(err) {
    ShowError(err, 'Add total to default resources table');
  }
}
