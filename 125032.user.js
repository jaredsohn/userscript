// ==UserScript==
// @name           FDDB-Tools - Pimp my FDDB ;)
// @namespace      http://www.fddb.info
// @description    Tools für FDDB-User
// @include        http://fddb.info/*
// @include        http://www.fddb.info/*
// @include        http://*.fddb.info/*
// @version $Revision: 0.98 $
// @date    $Date: 2012/02/13 10:30:00 $
// @author DaGu <muckimaus@gmx.net>
// @icon data:image/jpg;base64,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
// ==/UserScript==

var thisversion = 0.98;
var sHighlightColor = '#92cbeb';
var imgs = [];
imgs[0]  = 'data:image/gif;base64,R0lGODlhEAAQAJEDAP8DA/////8HBwAAACH5BAEAAAMALAAAAAAQABAAQAIqnI85EMDvXou0VoWzNiyINkmQRTrbiZbWMoEBGLXdLMrS68DAolLonykAADs=';
imgs[1]  = 'data:image/jpg;base64,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';
imgs[2] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAAQABAAAAgxAAMIHEiwoMGDCBMqXCgQgMOHDhM+HAhAYkSGEwNUtAhRYcaNCDMuFMnxIsOTKFEGBAA7';
imgs[3] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAAQABAAAAg2AAMIHEiwoMGDCBMeBMCQocCGCB0GkBjxIQCFDSlG1Lhx4kWMFjF+5DgQokWSClOqXMlyYEAAADs=';
imgs[4] = 'data:image/gif;base64,R0lGODlhEAAQAKL/AP///8DAwH9/fwAAAAD/AAAAAAAAAAAAACH5BAEAAAQALAAAAAAQABAAAAMmSLrc/m/IQSaNt2YnV4efBolKyGVmE6aMJBAC21pjfVqTre+8kgAAO5CQAAA7';
imgs[5] = 'data:image/gif;base64,R0lGODlhEAAQAPcAAAAAcxAQexAQhCEhhCEhjCkpjDExjDk5lEJCnEpKnFpapWNjrXt7vYSEvZyczu/v9/f3/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAABEALAAAAAAQABAAAAhaACMIHEiwoMGDCBMoXLjQoAEAAAYoeAggQIKCECEqeMAAogGDGQFs7Ajgo8EBGjl6RChApMqSCCMUGLkSoQGaMG3iNHnw5kueDnfGXNDggQMECBbEXMrUYEAAADs=';
imgs[6] = 'data:image/gif;base64,R0lGODlhEAAQAOZjAMrf9ABf/2um4WSi/wBeyZK+/4i4/8Tc82Si4Gum/4m4/8rf9RJp/wBjy427/wBd/wBb/2aj/zqJ2JS/6gBc/wBT/xBrzUCN/4i46oa36GWi/6XJ61KV/xJt/wBU/5jB6vT4/RJw/0aQ/0aL9xJx0CN802Wj4Ahr/3Oo+0mN9gxq9KPI7cje9G6o4Wyn4QBhyHat/2ej4EKI+AVo/wdq/5jB/3Gp/z2H/0GN2UiP/4K0/3Cp/0OK9/b5/hJszgBe/4e3/wRk/wdp9QBk8yN8/8Pb8yp//2ql4QBk/wBgyM3h9RJtz4K1/wBk8oa2/4W2/wBmzRBwzw1q/3ar/MXc826o/0WP/2Wj/wBW/2yn/wBg/2ml4Q1qzip/1Iy6/5nC/wBnzhJo/xJozf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGMALAAAAAAQABAAAAe2gGOCgzAhDGGIiB1Eg4MRNBFXA5MDRlKNglNBX5g2YZhjICMBQI0JYUoAqqoLKT86pmFRDQQESVBNAQaYpxYSEx8ZKg8Kg167VWFiR4IcFLuCBQEBNVkMYjFjFxVMgwVaMjxIJzNiJmNPEDnRAUMLPSgaO2IIgg5YVgoPQmBUjfSDHEDwIALDiwP/6g1ycmPMBgIIB4nZAmrMCoiNuHQRwFGAixYCcDQo0qjEEjEoU4rxQYJFo0AAOw==';
imgs[7] = 'data:image/gif;base64,R0lGODlhEAAQAOewAAAHAAALAFIqA1QrAl8qAGAsAGMtAGMuAFgyBxhFJmc0AGU1AGw0AG00AGo1AW41AWw2AXQ0AGw4AnM4AHI5AHQ5AHA6BX06AHE+CHE+CXI+B20/DXo9AHs9AHs+AHc/A389ACJUMX0+AIE9AH8+AIA/AG9EEnpCB3ZDDIlBAIZCAHlFDX5BLohDAI1DAI5DAIxEAIdGB5FGAJFHAIVGNIJHNJRHAIVLDoFJM4hLC4lLCoRMEHZQGZRKAIlMDYFOFZVLAIhKNplLAJlPBHtWH4xPOY5TPptVC55XC5BcHp5aEJRhJJhlJWpyQqRmH5hpLqtnH3hyUl59RqpsI5pzNa5vJaJ0NoF7VaB6O6p1UYWEYaZ8VYSHVqx/VbKAO69/VouMXYWTV8KMQ8SPSMKQSb6VVcCWVMOWU7+ZV8CbWZulb8mcWMeeWsKhcc+gWKmofcqgbqKrfLSmfsylYsWmdM2mY8endM+paNOrZ9Wsf8KzedWxb9izcdqzbNK0ftq4eOG8edu9gdHBg+G/e8vEjOLBftTDmebCjeXEgebEg9zHj+fGgObGhunIgerIhezKjOrMiOzMhOvOiu7Ohu3NlPDPj+7Qje7Qj/DPlOvRkOjRm+7RjujSnfLSkfLSk/LUjfHUl/PWj/XVlvPWlvTWlvPXlfbWo/zZmvbaqP/eofvfqv/fov/gof/go//jqv3mt////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAP8ALAAAAAAQABAAAAjlAP8JHEjwX4mCCP/1UCECRMKBQoB4oNABRouEMmzM4DBhhIwUJBC6QFLlyIshYtxMSfEvwsALSvpAAgRlzKhNi5z4WMKgQpIYZCxVSvUIEyhPl9bkSJMBBRodeDoJCqOJkBQ9ov6coGJiA5YPd06pCQEmToImqxj94IFgABEMfFhxAaDlTYArrUqdWSBQABNHpBRFMfRKDidKcBrdGOglUZZDrlShMpWnyJdIOwYymdSFRRAaRmrg2CKJTYOBD8x8CmSnDR0/mULNWXGAIAQrdQYhKrSnzBMHBRASUGBBgwYJBgoGBAA7';
imgs[8] = 'data:image/gif;base64,R0lGODlhLAAmAIQVAP////8AAMwAAJmZmczMzP8zM5kAAP/MzDMzM/+ZmWZmZv9mZgAAAJlmZpkzM2YzM2YAAMxmZswzMzMAAMyZmQsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCyH5BAEKAB8ALAAAAAAsACYAAAX+4CeOZFkmQXCYbOu6aBq8dG0WcrDY/Bvnq55wdMjJCsPkwihLJHtF2fL45B1wqcNvV3URGAwEYZkAAHCJQRjRNSEGh4G4YAYcFnICRaFokxhFCQpwdXZvBQUEbH4iAygFcoVmgCkEBIwiP1+SijEFQX4/KgySAwqimFgpAGKFA3A5XF2iZW+Fg2dAXVEpdAB8DQ4OeXY5SFVLiCp2DRICzwEFEWYJygFOSYEEAwRmDQbP0CkDZtsEiE8FeAgKDJYOBvHyAgER2+zuBdg91V/dcgPihaMXAJwaAnEQFAFl49ogUwQUIIAATkA8GQbeQBy0QFYNMr/eiHkgr6JAAQ21JBLDwdBFlEQIyiF4QDGcjGcSZb60geWAGJUSIQzMkTHiG44p9rXY8mvQG5JDb6Z0CkcVDVXryjGAajPHg5gA/GGFkeNXNzMDJlQcGK4VWke6TPCKJsnbSbYCyEmae6zElCx1AQS8G07CWUm0SsxdENgu4byNARgroWpZYwLwShpwEBlA4kw5ynTeBs9BA72dKwcx1pnT4daLP/xlQru2bdtXbuvebXtBZd7AdS+oFry4bSQhAAA7';

var smilies = [];
smilies[0] = [':D','data:image/gif;base64,R0lGODlhDwAPALMAAAAAAP///4uYp52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///yH5BAEAAA8ALAAAAAAPAA8AQARa8EkJap0UgRA294AAPEBTmgyAGMAwUoNrhSIGOI3DLMpKvIDFbFipAVgdTjL0ss0wzl3vcJncTDdGolJwkRi4Rk676ooACpASdKZ+1h8joVBZ05okmmBffUQAADs='];
smilies[1] = [':O','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVtoCSKQFmOpMIsi1kexSAAEvDYtwMoCFDQpIKQMJAJZigA5AFxNBg8AxDQcCybzygBCUAgEoBE4gAwApMuFNoJBZ9rywjTseDBaADrTUl/FWYADFUOOiVjBjKGCosuZWY1BgeSJkZIIyVHmSciIQA7'];
smilies[2] = ['8-)','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVqoCSKQFmOpMIsLKMkyFEMAiABT1Q+zlLKNlJhSBjQBDUUAPKAOBouhCEIaDhM2BIhCUAgAInwYQBABpVYFPrpSpxGy1yzp4gVbNnSNQ9gWEtQCiUGNCUJCoiIMGNHeAYHB1lISXBlkzVnIQA7'];
smilies[3] = [';(','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVtoCSKQFmOpMIsrIkcwSAAEvBE5eMs5VHQpILQJCgCSZAHxNFgKBAGIKDhSC6bTwNhVkMgEqaSjIuqhcujEtMJPtaSEeXu6aMBqjb54gkozAAMVA5rCgkwMiUJCothAANjdgYHB41FZCQAlkZHIQA7'];
smilies[4] = ['8o','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIsLKMkyFEMAiABT6A/zqIHBRupQDQJjkIS5AFxNFwIgxDQcPycjB+hdkMgEgnTgMZF3UxJcwn7Oo0Aywizp4gFbw5IABBo+vgFNQAMVQ5sCQcGNCUJCo4KJgdjSDcGB5cAQWRlJABHn24SIQA7'];
smilies[5] = [':]','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIAy8IoCXIAgwBIwGM+zmIWN1JhSBjUBDYUAPKAOBovhCEIaDiYTqhCSkgCEIiEOHEwIoNKExqFAzxfidNo+Yg0e9sDEHd9+J0LeQU2AAwNbm8wMzUlCQoKaiZHNwAGB5cGQ0dJcwBIn3ISIQA7'];
smilies[6] = [':(','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AQAV0YCSKQFmOpMIsLKMkyFEMAhABD/48zqIggIKNVCgSBjRBDQWA5BwNBgBhGAIaDkgJKgUYCMspMEE+DADKIdOkRt0A3Ndp1Mw9ID0FQGaDO0t4CyUyNQAMWA5xCQcGNCUJCpFsAEhpNwYHmQZFSUt0aEppaiEAOw=='];
smilies[7] = ['=)','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVzoCSKQFmOpMIAy8IoCXIAgwBIwBM9ubMAssKNVCgSBjWBDQWAPCCOxgthGAIaDicguqISlkAEIEE+DADKIdOkRuG2Uthp1NQ1fcCDEJd98KA/QTYADFgOVy8ABwY1JQkKAAqSMWZoYAYHM2xKS3SWnHMSIQA7'];
smilies[8] = ['X(','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsi1kexSAAEvBE5QO0AEyThSBhIBPMUACIztFgABCGH6DhUEKYDAWUcHwCEuDEgQg4omqu86iEVSROa2VkCdD6alVd0sGDzQAMVA5tYgYyJQkKCnVuCAcARTQABgeVBkFFZiRlRkZwEiEAOw=='];
smilies[9] = [':)','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsLKMkyFEMAiABT1Q+zlLKNlJhSBjQBDUUAPKAOBouhCEIaDiYTqhCSkgCEAhAYnwYAJBBpSmNugGersRptMw1e1vg7fooOX0AMjUADFYOcC8HBjQlCQoACpEwZWdeBgcHa5VJdJtoaSEAOw=='];
smilies[10] = [':P','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzG5/kTlCS////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAPAA8AQAVzICWKQFmOpMIAy8IoCXIAgwBQwBOVj7OUh8KNVCiaBMghCfKAOBovhGEIaDiYTqhCSrDhEIgEQDKR0JIokkmZLj1fYjaAGWn6tsEb4PooOX8AQTYADFYObzAHBjUlCQoKayY1XgAGBzMSmQBIXiMlnElKIQA7'];
smilies[11] = [';)','data:image/gif;base64,R0lGODlhDwAPAMQAAAAAAP///4uYp5Whrpums52otJ6ptaOtuaSuuqSuuqmyvay1wK+4wrC5w7K7xLe/yLnByrzEzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAAPAA8AQAVxoCSKQFmOpMIsLKMkyFEMAiABD/7kSynbpIKQMKAJaigA5AFxNFwIAxDQcCybT0WUgAQgEICE+DAAHIFJExp1AzhdidNI+YgwHQvt72bNlfA+BTUADFUOby8HBjQlCQoACpEwZGZdBgcHapVIc5tnaCEAOw=='];
smilies[12] = [':-D',smilies[0][1]];
smilies[13] = [':-)',smilies[9][1]];
smilies[14] = [';-)',smilies[11][1]];
smilies[15] = ['(:',smilies[9][1]];
smilies[16] = ['):',smilies[6][1]];

var FDDBT_Settings_Keys = [['fddbt_markextlinks','1'],['fddbt_userlinks','1'],['fddbt_shortenlinktext','1'],['fddbt_showskaldeman','1'],['fddbt_diatchart','1'],['fddbt_diatchartstrokecolor',''],['fddbt_diatchartstrokewidth','1.5'],['fddbt_diatchartfillcolor','none'],['fddbt_diatchartdatapoints','1'],['fddbt_guformhelper','1'],['fddbt_pinnwandformats','1'],['fddbt_addtomorrow','1'],['fddbt_archivsearch','1'],['fddbt_autoupdate','1'],['fddbt_autoupdateintervall',-1],['fddbt_easylogout','0'],['fddbt_linkuserprofile','1'],['fddbt_username',''],['fddbt_includeimages','1'],['fddbt_thumbsize','75'],['fddbt_enlargeimages','1'],['fddbt_linkimages','1'],['fddbt_replacesmilies','1'],['fddbt_newversion','0']];
var FDDBT_USERSettings = [];

for ( var setkeyvalue in FDDBT_Settings_Keys )
{
  var sKey = FDDBT_Settings_Keys[setkeyvalue][0] + '=';
  var sValue = '';
  
  if ( document.cookie && document.cookie.indexOf(sKey) > -1 )
  {
	sValue = document.cookie.substr(document.cookie.indexOf(sKey)+sKey.length);
	
	if ( sValue.indexOf(';') > -1 )
	{
	  sValue = sValue.substr(0,sValue.indexOf(';'));
	}
  }
  
  if ( sValue == '' && FDDBT_Settings_Keys[setkeyvalue][1] != null )
  {  
    sValue = FDDBT_Settings_Keys[setkeyvalue][1];
  }
  
  FDDBT_USERSettings[FDDBT_Settings_Keys[setkeyvalue][0]] = sValue;
}

var urls = [];
urls[0]  = 'http://userscripts.org/scripts/show/125032';
urls[1]  = 'https://userscripts.org/scripts/source/125032.meta.js';
urls[2]  = 'http://fddb.info/db/i18n/profile20/?lang=de';

var tags   = [];
tags['b']  = [imgs[2],'Fettschrift','<b>','</b>'];
tags['i']  = [imgs[3],'Kursivschrift','<i>','</i>'];
tags['u']  = [imgs[4],'Unterstrichen','<u>','</u>'];
tags['br'] = [imgs[5],'Zeilenumbruch','<br/>',''];

var sDomain = window.location.href.split('/')[2];

window.rep_smilies = function (value,index)
{
  var text = value;
  
  for (var i = index; i < smilies.length; i++)
  {
    var smiley = smilies[i][0];
    smiley = smiley.replace(/([\\\[\](){}.+*?^$|-])/g,'\\$1');
    var expression = new RegExp(smiley,'i');
    var pos = value.search(expression);
    
    if (pos != -1)
    {
      var part1 = value.substring(0,pos);
      var part2 = value.substring(pos+smilies[i][0].length,value.length);
      text = rep_smilies(part1,i) + ' <img src="'+smilies[i][1]+'" alt="'+smilies[i][0]+'" border="0" /> ' + rep_smilies(part2,i);
      break;
    }
  }
  return text;
}

window.checkExternalLink = function (anode)
{
  if ( anode.hasAttribute('href') )
  {
    if( anode.getAttribute('href').indexOf('http') == 0 && anode.getAttribute('href').indexOf('fddb.') == -1 )
    {
      var sTitle = '';
      var sStyle = '';

      if ( anode.hasAttribute('title') )
      {
        sTitle = anode.getAttribute('title');
      }

      if ( anode.hasAttribute('style') )
      {
        sStyle = anode.getAttribute('style');
      }

      if ( anode.firstChild.nodeName == '#text')
      {
        sStyle += 'background-image: url(' + imgs[6] + ');background-repeat:no-repeat;background-position: 0 0;padding-left:20px;min-height:16px;';
        anode.setAttribute('style',sStyle);
      }

      sTitle += '[externer Link';

      if ( !anode.hasAttribute('target') || anode.getAttribute('target') == '_blank' )
      {
        anode.setAttribute('target','_blank');
        sTitle += ' in neuem Fenster/Tab';
      }

      sTitle += ']';
      anode.setAttribute('title',sTitle);
    }
  }
}
window.setLinks = function (thenode)
{
  var node = thenode.cloneNode(true);

  if ( node.getElementsByTagName('a').length > 0 || node.getElementsByTagName('img').length > 0 )
  {
    var nodes = node.getElementsByTagName('a');
    
    for ( var i = nodes.length-1; i >= 0; i-- )
    {
      nodes[i].parentNode.removeChild(nodes[i]);
    }

    nodes = node.getElementsByTagName('img');

    for ( var i = nodes.length-1; i >= 0; i-- )
    {
      nodes[i].parentNode.removeChild(nodes[i]);
    }
  }
  
  var sInnerHTML = stripHTMLTags(node.innerHTML.replace(/<br>/gi,'\n'));
  var sOutput = '';
  var d = sInnerHTML.match(/(https?:\/\/[^\s*\\[\]\(\)]+)|(www\.[[a-z0-9\-]+\.]+[a-z]{2,6}[^\s*)\(\)]+)/gi);
  sInnerHTML = thenode.innerHTML;
  
  if ( d )
  {
    for ( var di = 0; di < d.length; di++ )
    {
      if ( !d[di].match(/\s+/) )
      {
        var tmpnode = document.createElement('div');
        
        if ( d[di].match(/\.(jpe?g|png|gif)$/) && FDDBT_USERSettings['fddbt_includeimages'] == '1' )
        {
          var newimg = document.createElement('img');
          var sSrc = ( !d[di].match(/^https?:\/\//) ? 'http://' : '' ) + d[di];
          newimg.setAttribute('src',sSrc);
          newimg.setAttribute('style','border:0;width:' + FDDBT_USERSettings['fddbt_thumbsize'] + 'px;');
          
          if ( FDDBT_USERSettings['fddbt_enlargeimages'] == '1' )
          {
            newimg.setAttribute('onmouseover','this.setAttribute(\'style\',\'border:1px outset #808080;position:absolute;\');');
            newimg.setAttribute('onmouseout','this.setAttribute(\'style\',\'border:0;width:' + FDDBT_USERSettings['fddbt_thumbsize'] + 'px;\');');
          }

          if ( FDDBT_USERSettings['fddbt_linkimages'] == '1' )
          {
            var newa = document.createElement('a');
            newa.setAttribute('href',sSrc);
            newa.setAttribute('target','_blank');
            newa.setAttribute('title','Bild in neuem Fenster/Tab laden');
            newa.appendChild(newimg);
            tmpnode.appendChild(newa);
          }
          else
          {
            tmpnode.appendChild(newimg);
          }
        }
        else
        {
          var newa = document.createElement('a');
          newa.setAttribute('href',( !d[di].match(/^https?:\/\//) ? 'http://' : '' ) + d[di]);
          var sLinkText = d[di].replace(/https?:\/\//g,'');
          
          if ( FDDBT_USERSettings['fddbt_shortenlinktext'] == '1' )
          {
            var asLinkText = sLinkText.split('/');
            sLinkText = asLinkText[0];
          }
          newa.innerHTML = sLinkText;
          tmpnode.appendChild(newa);
          checkExternalLink(newa);
        }
        
        sOutput += sInnerHTML.substr(0,sInnerHTML.indexOf(d[di])) + tmpnode.innerHTML;
        sInnerHTML = sInnerHTML.substr(sInnerHTML.indexOf(d[di])+d[di].length);
      }
    }
    if ( sInnerHTML.length > 0 )
    {
      sOutput += sInnerHTML;
    }
    thenode.innerHTML = sOutput;
  }
}
window.stripHTMLTags = function (str)
{
  return ( null != str && str.length > 0 ? str.replace(/<[^>]*>/g,'').replace(/&nbps;/g,'') : '');
}
window.date2int = function (dDate)
{
  return parseInt(dDate.getFullYear() + (dDate.getMonth() < 10 ? '0' : '') + dDate.getMonth() + (dDate.getDate() < 10 ? '0' : '') + dDate.getDate());
}
window.getMonthFromString = function (str)
{
  var iMonth = 2;
  if ( str.indexOf('Jan') > -1){iMonth = 0;}
  else if ( str.indexOf('Feb') > -1 ){iMonth = 1;}
  else if ( str.indexOf('Apr') > -1 ){iMonth = 3;}
  else if ( str.indexOf('Mai') > -1 ){iMonth = 4;}
  else if ( str.indexOf('Jun') > -1 ){iMonth = 5;}
  else if ( str.indexOf('Jul') > -1 ){iMonth = 6;}
  else if ( str.indexOf('Aug') > -1 ){iMonth = 7;}
  else if ( str.indexOf('Sep') > -1 ){iMonth = 8;}
  else if ( str.indexOf('Okt') > -1 ){iMonth = 9;}
  else if ( str.indexOf('Nov') > -1 ){iMonth = 10;}
  else if ( str.indexOf('Dez') > -1 ){iMonth = 11;}
  return iMonth;
}
window.parseDate = function (sDate)
{
  var tmpdate = new Date();
  var iMonth = getMonthFromString(sDate);
  var iDay = 1;
  var iYear = tmpdate.getFullYear();
  var sYear = iYear;
  var asDate = sDate.split(' ');

  for (var i = 0; i < asDate.length; i++ )
  {
    if (asDate[i].match(/[0-9]{1,2}\./))
    {
      sDay = asDate[i].replace(/\./,'');
      iDay = parseInt(sDay);
    }
    if (asDate[i].match(/[0-9]{4}/))
    {
      sYear = asDate[i];
      iYear = parseInt(sYear);
    }
  }
  tmpdate.setDate(iDay);
  tmpdate.setMonth(iMonth);
  tmpdate.setYear(iYear);
  return tmpdate;
}
window.postrenderpage = function()
{
  var htmlheadnode = document.getElementsByTagName('head')[0];
  var scriptnode = document.createElement('script');
  scriptnode.setAttribute('type','text/javascript');
  scriptnode.innerHTML = 'var fddbt_query = null;\n\nfunction fddbt_getQuery ()\n{\n  var query = null;\n\n  if ( window.XMLHttpRequest )\n  {\n    query = new XMLHttpRequest();\n  }\n  else if (window.ActiveXObject)\n  {\n    try\n    {\n      query = new ActiveXObject(\'Msxml2.XMLHTTP\');\n    }\n    catch (ex)\n    {\n      try\n      {\n        query = new ActiveXObject(\'Microsoft.XMLHTTP\');\n      }\n      catch (ex){}\n    }\n  }\n\n  return query;\n}';
  htmlheadnode.appendChild(scriptnode);
  var standardcontentnode;
  var divnodes = document.getElementsByTagName('div');
  for ( var i = 0; i < divnodes.length; i++ )
  {
    if ( divnodes[i].hasAttribute('class') && divnodes[i].getAttribute('class') == 'standardcontent' )
    {
      standardcontentnode = divnodes[i];
      break;
    }
  }

  var dExpire = new Date();
  dExpire.setYear(dExpire.getFullYear()+1);
  var FDDBT_Userconfigs = [];
  FDDBT_Userconfigs['fddbt_autoupdateintervall'] = [
          ['zu Anfang jeder Sitzung',-1],
          ['einmal t&auml;glich',1],
          ['jede Woche',7],
          ['alle 14 Tage',14],
          ['monatlich',30]
  ];
  FDDBT_Userconfigs['fddbt_thumbsize'] = [
         ['16 Pixeln',16],
         ['30 Pixeln',30],
         ['50 Pixeln',50],
         ['75 Pixeln',75],
         ['100 Pixeln',100]
  ];
  var sConfigStr = [];

  for ( var sConfigKey in FDDBT_Userconfigs )
  {
    sConfigStr[sConfigKey] = '<select onchange="var sCookie=\'domain=' + sDomain + ';path=/;expires=' + dExpire.toGMTString() + '\';document.cookie=\'' + sConfigKey + '=\'+this.options[this.selectedIndex].value+\';\'+sCookie;">';

    for ( var i = 0; i < FDDBT_Userconfigs[sConfigKey].length; i++ )
    {
      sConfigStr[sConfigKey] += '<option ' + (FDDBT_USERSettings[sConfigKey] == FDDBT_Userconfigs[sConfigKey][i][1] ? 'selected="selected" ' : '') + 'value="' + FDDBT_Userconfigs[sConfigKey][i][1] + '">' + FDDBT_Userconfigs[sConfigKey][i][0] + '</option>';
    }

    sConfigStr[sConfigKey] += '</select>';
  }

var sSmilies = '<div id="fddbt_smilies" style="visibility:hidden;position:absolute;"><div style="width:350px;margin:0;padding:2px;border:1px outset #c0c0c0;background-color:#e0e0e0;">';

  for (var i = 0; i < smilies.length; i++ )
  {
    sSmilies += '<div style="width:75px;border:0;margin:5px;float:left;"><span style="float:left;width:35px;margin:5px;">' + smilies[i][0] + '</span><img src="' + smilies[i][1] + '" /><div style="clear:left;"></div></div>';
  }

  sSmilies += '<div style="clear:left;"></div></div></div>';

  var sLogoutStyle = document.getElementById('fddbt_logoutlink').getAttribute('style');

  var FDDBT_Form_Fields = [
        ['Update',
        ['fddbt_autoupdate','Automatisch ' + sConfigStr['fddbt_autoupdateintervall'] + ' nach Skript-Updates der FDDB-Tools suchen und &uuml;ber neuere Version informieren.']
        ],
        ['<span lagn="en">Easy Logout</span>',
        ['fddbt_easylogout','Einfacheres <a style="cursor:help;font-weight:bold;" title="Der Link zum Abmelden von der Webseite wird hervorgehoben." onmouseover="document.getElementById(\'fddbt_logoutlink\').setAttribute(\'style\',\'position:absolute;z-index:101;padding:0.25em;background-color:#ffffff;border:2px solid #bf0000;font-size:1.5em;color:#bf0000;\');" onmouseout="document.getElementById(\'fddbt_logoutlink\').setAttribute(\'style\',\'' + sLogoutStyle + '\');">Abmelden</a> von FDDB (ohne Zwischenseite) erlauben.']
        ],
        ['Verlinkungen',
          ['fddbt_markextlinks','Externe Links im gesamten Webauftritt von FDDB markieren.'],
          ['fddbt_userlinks','<acronym lang="en" title="Uniform Resource Locator">URLs</acronym>, beginnend mit <code>http://</code>, <code>https://</code> oder <acronym lang="en" title="World Wide Web"><code>www</code></acronym>, die von Benutzern in <b>Fragen</b>, <b>Gruppenthemen</b> und auf der <b>Pinnwand</b> eines Benutzers gepostet werden, sollen verlinkt werden.'],
          ['fddbt_shortenlinktext','<u>Wenn Verlinkung aktiviert ist:</u> Linktext auf Domainnamen verk&uuml;rzen.'],
          ['fddbt_includeimages','Bilder sollen direkt mit einer Breite von ' + sConfigStr['fddbt_thumbsize'] + ' eingebunden werden.'],
          ['fddbt_enlargeimages','<u>Bei Bildeinbindung:</u> Beim &Uuml;berfahren mit dem Mauszeiger soll das Bild in Originalgr&ouml;&szlig;e aus der Position hergehoben werden.'],
          ['fddbt_linkimages','<u>Bei Bildeinbindung:</u> Bild soll verlinkt und in neuem Fenster/Tab geöffnet werden.'],
          ['fddbt_replacesmilies','Textsmilies in <b>Fragen</b>, <b>Gruppenthemen</b> und auf der <b>Pinnwand</b> durch <a onclick="return false;" style="text-decoration:underline;font-weight:bold;" onmouseover="document.getElementById(\'fddbt_smilies\').setAttribute(\'style\',\'visibility:visible;position:absolute;\');" onmouseout="document.getElementById(\'fddbt_smilies\').setAttribute(\'style\',\'visibility:hidden;position:absolute;\');" title="Diese Textsmilies werden ersetzt.">' + sSmilies + 'Bilder</a> ersetzen.']
        ],
        ['Tagebuch, Listen, Lebensmitteldatenbank',
          ['fddbt_showskaldeman','In der Detail&uuml;bersicht die Skaldeman-Ratio berechnen und als weitere Spalte in der Tabelle einf&uuml;gen.'],
          ['fddbt_addtomorrow','Portionen und Mahlzeiten f&uuml;r <b>morgen</b> hinzuf&uuml;gen erm&ouml;glichen.'],
        ],
        ['Di&auml;tbericht',
          ['fddbt_diatchart','Linienfarbe und -breite selbst festlegen, Füllfarbe bestimmen und Datenpunkte anzeigen <abbr title="beziehungsweise">bzw.</abbr> ausblenden.']
        ],
        ['Pinnwand',
          ['fddbt_pinnwandformats','Einfache Textformatierungen (<b>fett</b>, <i>kursiv</i>, <u>unterstrichen</u>, Zeilenumbruch) vornehmen und anzeigen. Wenn dieses Feature deaktiviert ist, werden die Tags entsprechend entfernt.'],
        ],
        ['Benutzerprofil',
        ['fddbt_guformhelper','Bei der manuellen Eingabe des Tagesdedarfs Formular zur Berechnung von Grundumsatz, <acronym lang="en" title="Physical Activity Level">PAL</acronym> und Tagesbedarf anzeigen.'],
		['fddbt_linkuserprofile','Verlinkung auf das &ouml;ffentliche Benutzerprofil in die Navigation einf&uuml;gen. Nutzername: ' + ( FDDBT_USERSettings['fddbt_username'] != '' ? '<b>' + FDDBT_USERSettings['fddbt_username'] + '</b>' : '<i>(noch) nicht bekannt</i>') ]
        ],
        ['Neue Fragen',
          ['fddbt_archivsearch','Automatisch das Archiv durchsuchen und fragen, ob m&ouml;gliche Ergebnisse angezeigt werden sollen.']
        ]
      ];
  var fddbtconfignode = document.createElement('div');
  fddbtconfignode.setAttribute('style','position:absolute;visibility:hidden;');
  fddbtconfignode.setAttribute('id','fddbt_configform');
  
  var sReportBugForm = '<div id="fddbt_reportbugform" style="position:absolute;visibility:hidden;"><div style="margin: 4% 15%;width:70%;border-width: 1px 3px 3px 1px;border-style:outset;border-color:#c0c0c0;background-color:#e0e0e0;padding:0em 0em;1.3em 0em"><h2 style="text-align:right;background-color:#fff;border-top:1px solid #c0c0c0;border-bottom:1px solid #c0c0c0;height:25px;color:#bf0000;font-size:25px;margin:1.3em 0 0 0;padding:0 50px 0 0;"><img src="' + imgs[8] + '" border="0" style="margin:-0.3em 20px 0 20px;" align="right" />Fehler melden</h2><div style="margin:1em;"><p>Du hast einen Fehler gefunden und m&ouml;chtest ihn melden?</p><p>Dann f&uuml;ll einfach das folgende Formular aus und beschreibe den Fehler so gut und genau wie m&ouml;glich. Nur so kann die Welt vielleicht noch erfolgreich gerettet werden. <img src=' + smilies[0][1] + ' border="0" /></p><div style="border-width: 1px 0px;border-style:solid;border-color:#c0c0c0;margin:0.5em 0em;padding: 0.5em 0em;"><p>  <label style="float:left;width:10em;cursor:pointer;font-weight:bold;" for="fddbt_brname">Name</label>  <input type="text" id="fddbt_brname" size="40" value="' + ( FDDBT_USERSettings['fddbt_username'] != null ? FDDBT_USERSettings['fddbt_username'] : '' ) + '" name="Name" />  <span style="clear:left;"></span></p><p>  <label style="float:left;width:10em;cursor:pointer;font-weight:bold;" for="fddbt_bremail">E-Mail</label>  <input type="text" size="40" value="" id="fddbt_bremail" name="E-Mail" />  <span style="clear:left;"></span></p><p>  <label style="float:left;width:10em;cursor:pointer;font-weight:bold;" for="fddbt_brsubject">Betreff</label>  <input type="text" size="40" value="" id="fddbt_brsubject" name="Betreff" />  <span style="clear:left;"></span></p><p>  <label style="float:left;width:10em;cursor:pointer;font-weight:bold;" for="fddbt_brmessage">Nachricht</label>  <textarea rows="10" cols="40" id="fddbt_brmessage" name="Nachricht"></textarea>  <span style="clear:left;"></span></p><h3 style="border-bottom:1px solid #c0c0c0;">Zusatzinfos</h3>  <table style="width:100%;font-size:70%;" id="fddbt_brdata">  <colgroup>    <col width="10%"/>	<col width="90%"/>  </colgroup>  <tbody>  <tr>    <td><b>Version</b></td>	<td>' + thisversion + '</td>  <tr>  <tr>    <td valign="top"><b>Browser</b></td>	<td>' + navigator.userAgent + '</td>  <tr>  <tr>    <td valign="top"><b>Adresse</b></td>	<td>' + window.location.href + '</td>  <tr>    <tr>    <td><b>Cookies</b></td>	<td>' + ( navigator.cookieEnabled ? '' : 'nicht ') + 'erlaubt</td>  <tr>' + ( document.cookie && ( ccnt = document.cookie.match(/\s*(fddbt_[a-z0-9]+=[^;\s]+);?\s*/gi) ) ? '<tr><td valign="top"><b>Cookie-Daten</b></td><td><code>' + ccnt.join(' ') + '</code></td></tr>' : '' ) + '  </tbody>  </table></div><p style="text-align:center;">  <input type="submit" value="Senden" onclick="if (document.getElementById(\'fddbt_brmessage\').value.match(/^\s*$/) ){alert(\'Bitte gib einen Nachrichtentext ein.\');document.getElementById(\'fddbt_brmessage\').setAttribute(\'style\',\'border: 2px solid #bf0000;\');document.getElementById(\'fddbt_brmessage\').focus();}else{document.getElementById(\'fddbt_brmessage\').value=\'\';document.getElementById(\'fddbt_brsubject\').value=\'\';document.getElementById(\'fddbt_brmessage\').setAttribute(\'style\',\'\');var inputnodes = document.getElementById(\'fddbt_reportbugform\').getElementsByTagName(\'input\');var sGETData = \'\';for (var i = 0; i < inputnodes.length; i++ ){sGETData += ( inputnodes[i].hasAttribute(\'id\') ? \'&\' + encodeURIComponent(inputnodes[i].getAttribute(\'id\')) + \'=\' + encodeURIComponent(inputnodes[i].value) : \'\' );}sGETData += \'&\' + encodeURIComponent(document.getElementById(\'fddbt_brmessage\').getAttribute(\'id\')) + \'=\' + encodeURIComponent(document.getElementById(\'fddbt_brmessage\').value);sGETData += \'&fddbt_brdata=\' + encodeURIComponent(document.getElementById(\'fddbt_brdata\').innerHTML.replace(/<\\/tr>/gi,\'\\n\').replace(/<[^>]*>/g,\'\'));fddbt_query = fddbt_getQuery();var sUrl = \'http://web0.1501-3.1st-housing.de/fddbtbugreport/?\' + sGETData;fddbt_query.open(\'GET\', sUrl, true);fddbt_query.setRequestHeader(\'Content-Type\', \'text/plain;charset=UTF-8\');fddbt_query.onreadystatechange = function (){if ( this.readyState == 4 ){document.getElementById(\'fddbt_reportbugform\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');alert(\'Vielen Dank! Deine Fehlermeldung wurde verschickt.\');}};fddbt_query.send(null);}return false;"/>   <input type="submit" value="Abbrechen" onclick="document.getElementById(\'fddbt_reportbugform\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');document.getElementById(\'fddbt_brmessage\').value=\'\';document.getElementById(\'fddbt_brsubject\').value=\'\';document.getElementById(\'fddbt_brmessage\').setAttribute(\'style\',\'\');return false;"/></p></div></div></div>';

  var sConfigform = '<form onsubmit="return false;"><div style="margin: 2% 20%;width:60%;border-width: 1px 3px 3px 1px;border-style:outset;border-color:#2669AC;background-color:#92CBEB;padding:0em;"><div style="width:100%;margin: 1.1em 0 0 0;height:25px;padding: 1px;"><a href="" title="Fehler melden" onclick="document.getElementById(\'fddbt_reportbugform\').setAttribute(\'style\',\'position:fixed;visibility:visible;z-index:102;width:100%;height:100%;left:0px;top:0px;background-color: rgba(0, 0, 0, 0.5);\');return false;"><img src="' + imgs[8] + '" border="0" style="position:absolute;margin:-7px 4px 0px 4px;" align="left" /></a><img src="' + imgs[7] + '" border="0" align="right" style="margin:4px 10px;" /><h2 style="text-align:right;background-color:#2669AC;border-top:1px solid #ffffff;border-bottom:1px solid #ffffff;background-image:url(' + imgs[1]+ ');background-repeat:no-repeat;background-position:100% 100%;height:25px;color:#ffffff;font-size:25px;margin:0;padding:0 80px 0 0;">FDDB-Tools <span style="color:#92CBEB;font-weight:bold;">&gt;&gt;</span> Benutzereinstellungen</h2></div><p style="text-align:right;background-color:#e0e0e0;border-top:1px solid #2669AC;border-bottom:1px outset #2669AC;padding: 0.5em; margin: 1em 0em;"><input type="submit" onclick="document.getElementById(\'fddbt_configform\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');return false;" value="Schlie&szlig;en" /></p>' + sReportBugForm + '<div style="margin: 1em;padding: 1em;background-color: rgba(222, 222, 222, 0.7);border:1px inset #92CBEB;"><p>Die einzelnen Features der FDDB-Tools kannst Du ein- und wieder abstellen. Diese Einstellungen werden vom Browser als Cookies dauerthaft gespeichert. Daf&uuml;r m&uuml;ssen aber Cookies erlaubt sein.</p></div><div style="height:35em;overflow:auto;">';

  for ( var i = 0; i < FDDBT_Form_Fields.length; i++ )
  {
    sConfigform += '<div style="margin: 1em;padding: 0em 1em;background-color: rgba(222, 222, 222, 0.7);border:1px inset #92CBEB;"><h3 style="border-bottom: 1px outset #2669AC;">' + FDDBT_Form_Fields[i][0] + '</h3><table cellpadding="5" cellspacing="0"><colgroup><col width="1.5em;"/><col/></colgroup>';

    for (var j = 1; j < FDDBT_Form_Fields[i].length; j++ )
    {
          var sLabel = '<label for="f_' + FDDBT_Form_Fields[i][j][0] + '" style="cursor:pointer;">' + FDDBT_Form_Fields[i][j][1] + '</label>';

          if ( sLabel.indexOf('<select') > -1 )
          {
        sLabel = sLabel.replace(/<select/g,'</label><select');
                sLabel = sLabel.replace(/<\/select>/g,'</select><label for="f_' + FDDBT_Form_Fields[i][j][0] + '" style="cursor:pointer;">');
          }
          if ( sLabel.indexOf('<input') > -1 )
          {
        sLabel = sLabel.replace(/<input/g,'</label><input');
                sLabel = sLabel.replace(/<\/input>/g,'</input><label for="f_' + FDDBT_Form_Fields[i][j][0] + '" style="cursor:pointer;">');
          }
      sConfigform += '<tr onmouseover="this.setAttribute(\'style\',\'background-color:rgba(38,105,172,0.4);border:1px outset #ffffff;\');" onmouseout="this.setAttribute(\'style\',\'\');"><td align="center"><input onchange="var sCookie=\'domain=' + sDomain + ';path=/;expires=' + dExpire.toGMTString() + '\';document.cookie= \'' + FDDBT_Form_Fields[i][j][0] + '=\'+(document.getElementById(\'f_' + FDDBT_Form_Fields[i][j][0] + '\').checked == true ? \'1\' : \'0\')+\';\'+sCookie;" type="checkbox"' + (FDDBT_USERSettings[FDDBT_Form_Fields[i][j][0]] == '1' ? 'checked="checked"' : '' ) + ' id="f_' + FDDBT_Form_Fields[i][j][0]+ '" /></td><td style="text-align:justify;">' + sLabel + '</td></tr>';
    }

    sConfigform += '</table></div>';
  }

  sConfigform += '</div><p style="text-align:right;background-color:#e0e0e0;border-top:1px solid #2669AC;border-bottom:1px outset #2669AC;padding: 0.5em; margin: 1em 0em;"><input type="submit" onclick="document.getElementById(\'fddbt_configform\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');return false;" value="Schlie&szlig;en" /></p></div></form>';

  fddbtconfignode.innerHTML = sConfigform;

  var headnode = document.getElementById('fddb-header');
  var infodiv = document.createElement('div');
  infodiv.setAttribute('style','position:absolute;top:5px;left:25%;');
  var infonode = document.createElement('div');
  infonode.setAttribute('id','fddbtoolsinfo');
  infonode.setAttribute('style','background-image:url(' + imgs[1]+ ');background-repeat:no-repeat;background-position:100% 8px;border:1px outset #2669AC;font-color:#fff;background-color:#2669AC;width:120px;padding:2px;height:30px;display:block;');
  infonode.innerHTML = '<div style="color:#fff;float:left;width:55%;"><small><i>pimped by <strong>FDDB-Tools</strong></small></div><div style="float:left;width:20px;height:20px;"><a href="" onclick="document.getElementById(\'fddbt_configform\').setAttribute(\'style\',\'position:fixed;visibility:visible;z-index:99;width:100%;height:100%;left:0px;top:0px;background-color: rgba(0, 0, 0, 0.5);\');return false;" title="Benutzereinstellungen anzeigen/bearbeiten"><img src="' + imgs[7] + '" border="0" /></a></div><div style="float:left;width:21px;height:21px;padding-top:3px;float:left;text-align:center;border:0px;" id="updateinfo"></div><span style="clear:left;"></span>';
  infodiv.appendChild(infonode);
  headnode.appendChild(infodiv);
  headnode.appendChild(fddbtconfignode);

  if ( FDDBT_USERSettings['fddbt_autoupdate'] == '1' && !( document.cookie && ( document.cookie.indexOf('fddbt_lastupdatechecked=1') > -1 || document.cookie.indexOf('fddbt_newversion=1') > -1 ) ) )
  {
    GM_xmlhttpRequest(
    {
      method: 'GET',
      url: urls[1],
      headers: {Accept: 'text/plain'},
      onload: function(data)
      {
	var sNextUpdateCheck = '';
		
        if ( parseInt(FDDBT_USERSettings['fddbt_autoupdateintervall']) >= 0 )
	{
          var dNextUpdateCheck = new Date();
          dNextUpdateCheck.setDate(dNextUpdateCheck.getDate()+parseInt(FDDBT_USERSettings['fddbt_autoupdateintervall']));
          sNextUpdateCheck = dNextUpdateCheck.toGMTString();
        }
		
        document.cookie = 'fddbt_lastupdatechecked=1;domain=' + sDomain + ';path=/;expires=' + sNextUpdateCheck;

        var d = data.responseText.match(/\$Revision: (.+)\$/);
        if ( d && parseFloat(d[1]) > thisversion )
        {
          document.cookie = 'fddbt_newversion=1;domain=' + sDomain + ';path=/;expires=' + sNextUpdateCheck;
        }
        else
        {
          document.cookie = 'fddbt_newversion=0;domain=' + sDomain + ';path=/;expires=' + sNextUpdateCheck;
        }
        d = data.responseText.match(/@uso:installs *([0-9]+)/);

        if ( d && parseInt(d[1]) % 100 == 0)
        {
          var newspan = document.createElement('p');
          newspan.setAttribute('style','color:#800000;font-size:0.8em;');
          newspan.innerHTML = '<i><b>' + d[1] + ' Mal</b> installiert</i>';
          infodiv.appendChild(newspan);
        }
      }
    });
  }

  if ( document.cookie && document.cookie.indexOf('fddbt_newversion=1') > -1 )
  {
    document.getElementById('updateinfo').innerHTML = '<a href="' + urls[0] + '" target="_blank" title="Neue Skriptversion vorhanden!"><img src="' + imgs[0] + '" border="0"/></a>';
  }
  
  if ( FDDBT_USERSettings['fddbt_linkuserprofile'] == '1' && FDDBT_USERSettings['fddbt_username'] != '' )
  {
    var divnodes = document.getElementsByTagName('div');
	var bActive = ( window.location.href.indexOf('/' + FDDBT_USERSettings['fddbt_username'].toLowerCase().trim() + '/') > -1 ? true : false );
	var sProfilelink = 'db/de/leute/' + FDDBT_USERSettings['fddbt_username'].toLowerCase().trim() + '/index.html';
	var sClassToken = ( bActive ? 'sel' : 'non' );
	
	for ( var i = 0; i < divnodes.length; i++ )
	{
	  if ( divnodes[i].hasAttribute('class') && divnodes[i].getAttribute('class') == 'navigation' )
	  {
	    var newnav = document.createElement('div');
		newnav.setAttribute('class','n09-' + sClassToken + '-out');
		newnav.innerHTML = '<div onclick="window.location.href=\'' + sProfilelink + '\';" class="n09-' + sClassToken + '-in"><a href="' + sProfilelink + '" title="Eigenes Profil, Nutzername: ' + FDDBT_USERSettings['fddbt_username'] + '">Mein Profil</a></div>';
		
		if ( bActive == true )
		{
		  for ( var j = i; j < divnodes.length; j++ )
	      { 
	        if ( divnodes[j].hasAttribute('class') && divnodes[j].getAttribute('class') == 'n09-sel-out' )
	        {
			  divnodes[j].setAttribute('class','n09-non-out');
			  divnodes[j].firstChild.setAttribute('class','n09-non-in');
			  
			  for ( var k = j+1; k < divnodes.length; k++ )
	          {
			    if ( divnodes[k].hasAttribute('class') && divnodes[k].getAttribute('class') == 'subnaviright' )
	            {
				  var tablenode = standardcontentnode.getElementsByTagName('table')[0];
				  var anodes = tablenode.getElementsByTagName('a');
				  var sInnerHTML = '';
				  
				  for ( var l = 0; l < anodes.length; l++ )
				  {
				    if ( window.location.href.indexOf(anodes[l].getAttribute('href')) > -1 )
					{
					  anodes[l].setAttribute('class','naviselect');
					}
					else
					{
					  anodes[l].setAttribute('class','');
					  anodes[l].setAttribute('style','');
					}
					
					if ( anodes[l].nextSibling != null )
					{
					  anodes[l].nextSibling.setAttribute('style', anodes[l].nextSibling.getAttribute('style')+';color:#ffffff');
					}
					
				    sInnerHTML += ( l > 0 ? ' | ' : '' ) + anodes[l].parentNode.innerHTML;
				  }
			      divnodes[k].innerHTML = '<span style="font-size:80%;color:#ffffff;">' + sInnerHTML + '</span>';
		              tablenode.parentNode.nextSibling.setAttribute('style','');
			      tablenode.parentNode.removeChild(tablenode);
                              divnodes[k-1].setAttribute('style',divnodes[k-1].getAttribute('style') + ';font-size:80%;');
			      break;
		        }
			  }
			  break;
		    }
		  }
		}
		
		divnodes[i].insertBefore(newnav,divnodes[i].firstChild);		
		break;
	  }
	}
  }
  
  if ( window.location.href.indexOf('profile20') > -1 && window.location.href.indexOf('action=changeusername') > -1 )
  {
    var formnode   = standardcontentnode.getElementsByTagName('form')[0];
    var sFormId    = 'fddbt_form';
    var inputnodes = standardcontentnode.getElementsByTagName('input');
    var sInputIds  = ['fddbt_inputfield','fddbt_inputbutton'];

	if ( formnode.hasAttribute('id') )
    {
      sFormId = formnode.getAttribute('id');
    }
    else
    {
      formnode.setAttribute('id',sFormId);
    }
	
    for ( var i = 0; i < sInputIds.length; i++ )
    {
      if ( inputnodes[i].hasAttribute('id') )
      {
        sInputIds[i] = inputnodes[i].getAttribute('id');
      }
      else
      {
        inputnodes[i].setAttribute('id',sInputIds[i]);
      }
    }
	
	var sTdId = 'fddbt_hint';
	var tdnode = formnode.getElementsByTagName('td')[2];
	
	if ( tdnode.hasAttribute('id') )
    {
      sTdId = tdnode.getAttribute('id');
    }
    else
    {
      tdnode.setAttribute('id',sTdId);
    }
	
	inputnodes[1].setAttribute('onclick','document.getElementById(\'' + sInputIds[0] + '\').value = document.getElementById(\'' + sInputIds[0] + '\').value.trim();if ( !document.getElementById(\'' + sInputIds[0] + '\').value.match(/[a-zA-Z0-9]{3,}/) ){document.getElementById(\'' + sTdId + '\').setAttribute(\'style\',\'color:#bf0000;font-weight:bold;\');document.getElementById(\'' + sInputIds[0] + '\').focus();}else{/*var dExpire = new Date();dExpire.setYear(dExpire.getFullYear()+1);document.cookie = \'fddbt_username=\' + document.getElementById(\'' + sInputIds[0] + '\').value + \';domain=' + sDomain + ';path=/;expires=\' + dExpire.toGMTString();*/document.getElementById(' + sFormId + ').submit();}return false;');
  }
  else if ( window.location.href.match(/fragen\/index\.html?/i) && FDDBT_USERSettings['fddbt_archivsearch'] == '1' )
  {
    var formnode   = standardcontentnode.getElementsByTagName('form')[0];
    var sFormId    = 'fddbt_form';
    var inputnodes = formnode.getElementsByTagName('input');
    var sInputIds  = ['fddbt_inputfield','fddbt_inputbutton'];

    if ( formnode.hasAttribute('id') )
    {
      sFormId = formnode.getAttribute('id');
    }
    else
    {
      formnode.setAttribute('id',sFormId);
    }

    for ( var i = 0; i < sInputIds.length; i++ )
    {
      if ( inputnodes[i].hasAttribute('id') )
      {
        sInputIds[i] = inputnodes[i].getAttribute('id');
      }
      else
      {
        inputnodes[i].setAttribute('id',sInputIds[i]);
      }
    }

    var newdiv = document.createElement('div');
    newdiv.setAttribute('id','fddbt_hint');
    newdiv.setAttribute('class','standardcontent');
    newdiv.setAttribute('style','position:absolute;visibility:hidden;');
    newdiv.innerHTML = '<div style="background-color:#e0e0e0;border: 2px outset rgb(210, 209, 204); padding: 0em 1em 0.25em 1em;"><h3 style="border-bottom: 1px solid rgb(210, 209, 204);">Hinweis</h3><p style="margin: 0.5em 0em;font-weight:bold;">Deine Frage gibt es wohl schon in &auml;hnlicher Form im <a href="http://fddb.info/db/de/fragen/archiv.html">Archiv</a>.</p><h4>Was m&ouml;chtest du machen?</h4><p><a id="fddbt_archivlink" href="">Suchergebnisse im Archiv anzeigen.</a></p><p><a href="" onclick="document.getElementById(\'' + sFormId + '\').submit();return false;">Meine Frage jetzt stellen!</a></p></div>';
    inputnodes[0].parentNode.appendChild(newdiv);
    inputnodes[1].setAttribute('onclick','if (document.getElementById(\'' + sInputIds[0] + '\').value == \'Stelle jetzt eine neue Frage!\' || document.getElementById(\'' + sInputIds[0] + '\').value == \'\'){alert(\'Bitte formuliere erst Deine Frage oder gib Stichworte ein!\');    document.getElementById(\'' + sInputIds[0] + '\').focus();}else{fddbt_query = fddbt_getQuery();var sGETData = document.getElementById(\'' + sInputIds[0] + '\').value;var sUrl = \'http://'+sDomain+'/db/de/fragen/archiv.html?search=\' + encodeURIComponent(sGETData) + \'&cat=question-de\';fddbt_query.open(\'GET\', sUrl, true);fddbt_query.setRequestHeader(\'Content-Type\', \'text/plain;charset=UTF-8\');fddbt_query.onreadystatechange = function (){if( this.readyState == 4 ){if( this.responseText && this.responseText.indexOf(\'Keine Fragen gefunden.\') == -1 ){document.getElementById(\'fddbt_archivlink\').setAttribute(\'href\',sUrl);document.getElementById(\'fddbt_hint\').setAttribute(\'style\',\'position:absolute;visibility:visible;display:block;width:50%;\');}else{document.getElementById(\'' + sFormId + '\').submit();}}};fddbt_query.send(null);}return false;');
  }
  else if ( window.location.href.match(/fragen\/([^\/]+\/)+index\.html?/) || window.location.href.match(/gruppen\/([^\/]+)\/index\.html?/) )
  {
    var pnodes = standardcontentnode.getElementsByTagName('p');

    for ( var i = 0; i < pnodes.length; i++ )
    {
      if ( FDDBT_USERSettings['fddbt_replacesmilies'] == '1' )
      {
        var sInnerHTML = pnodes[i].innerHTML;
        pnodes[i].innerHTML = rep_smilies(sInnerHTML,0);
      }
      
      if ( FDDBT_USERSettings['fddbt_userlinks'] == '1' )
      {
        setLinks(pnodes[i]);
      }
    }
  }
  else if ( window.location.href.indexOf('profile20') > -1 && window.location.href.indexOf('action=changedv') > -1 && FDDBT_USERSettings['fddbt_guformhelper'] == '1' )
  {
    var formnode  = standardcontentnode.getElementsByTagName('form')[0];
    var trnodes   = formnode.getElementsByTagName('tr');
    var tdnodes   = trnodes[1].getElementsByTagName('td');
    var inputnode = tdnodes[1].getElementsByTagName('input')[0];
    var selectnode = tdnodes[1].getElementsByTagName('select')[0];
    var sInputId  = 'fddbt_myDailyConsumption';
    var sSelectId  = 'fddbt_myDailyConsumptionUnit';

    trnodes[0].getElementsByTagName('td')[0].getElementsByTagName('input')[0].setAttribute('onchange','if(this.checked==true){document.getElementById(\'fddbt_gutb\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');document.getElementById(\'fddbt_palform0\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');}');

    var radionode = tdnodes[0].getElementsByTagName('input')[0];
    radionode.setAttribute('id','fddbt_modemanuel');
    radionode.setAttribute('onchange','if(this.checked==true){document.getElementById(\'fddbt_gutb\').setAttribute(\'style\',\'position:static;visibility:visible;\');if( document.getElementById(\'fddbt_palmode0\').checked==true){document.getElementById(\'fddbt_palform0\').setAttribute(\'style\', \'position:static;visibility:visible;\');document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');}else{document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:static;visibility:visible;\');document.getElementById(\'fddbt_palform0\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');}}');

    if ( inputnode.hasAttribute('id') )
    {
      sInputId = inputnode.getAttribute('id');
    }
    else
    {
      inputnode.setAttribute('id',sInputId);
    }

    if ( selectnode.hasAttribute('id') )
    {
      sSelectId = selectnode.getAttribute('id');
    }
    else
    {
      selectnode.setAttribute('id',sSelectId);
    }

    var newtr = document.createElement('tr');
    var newtd = document.createElement('td');
    newtr.appendChild(newtd);
    newtd = document.createElement('td');
    newtd.setAttribute('style','border: 1px solid #c0c0c0;padding:1em;');
    newtr.appendChild(newtd);
    newtd.innerHTML = '<div style="visibility:hidden;" id="fddbt_gutb"><h4>Grundumsatz &amp; Tagesbedarf</h4><div><h5 style="border:1px solid #c0c0c0;padding:0.25em 0.5em;">Berechnungsmodell</h5><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><input style="width:3em;" checked="checked" type="radio" name="gumode" id="fddbt_gumode0" value="0" /><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_gumode0"><a href="http://de.wikipedia.org/wiki/Harris-Benedict-Formel#Harris-Benedict-Formel" title="externer Link zu Wikipedia-Artikel, &ouml;ffnet in neuem Fenster/Tab" target="_blank">Harris-Benedict-Formel</a></label></p><div style="clear: left;"></div><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><input style="width:3em;" type="radio" name="gumode" id="fddbt_gumode1"  value="1" /><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_gumode1"><a href="http://de.wikipedia.org/wiki/Harris-Benedict-Formel#Mifflin-St.Jeor-Formel" title="externer Link zu Wikipedia-Artikel, &ouml;ffnet in neuem Fenster/Tab" target="_blank">Mifflin-St.Jeor-Formel</a></label></p><div style="clear: left;"></div></div><div><h5 style="border:1px solid #c0c0c0;padding:0.25em 0.5em;">Grunddaten</h5><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_sex">Geschlecht</label><select id="fddbt_sex" size="2"><option value="0" selected="selected">Frau</option><option value="1">Mann</option></select></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_age">Alter</label><input style="width:3em;" type="text"  value="30" id="fddbt_age" />&nbsp;Jahre</p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_weight">Gewicht</label><input style="width:3em;" type="text"  value="56.6" id="fddbt_weight" />&nbsp;<abbr title="Kilogramm">kg</abbr></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_height">Gr&ouml;&szlig;e</label><input style="width:3em;" type="text"  value="176" id="fddbt_height" />&nbsp;<abbr title="Centimeter">cm</abbr></p><div id="fddbt_palerg"></div><div style="clear: left;"></div></div><div><h4>T&auml;gliche Aktivit&auml;ten</h4><div><h5 style="border:1px solid #c0c0c0;padding:0.25em 0.5em;">Eingabemodus</h5><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><input style="width:3em;" type="radio" name="palmode" id="fddbt_palmode0" checked="checked" onchange="if(this.checked==true){document.getElementById(\'fddbt_palform0\').setAttribute(\'style\',\'position:static;visibility:visible;\');document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');}" value="0" /><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_palmode0" onclick="document.getElementById(\'fddbt_palmode0\').checked=true;document.getElementById(\'fddbt_palform0\').setAttribute(\'style\',\'position:static;visibility:visible;\');document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');">einfach</label></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><input style="width:3em;" type="radio" name="palmode" id="fddbt_palmode1" onchange="if(this.checked==true){document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:static;visibility:visible;\');document.getElementById(\'fddbt_palform0\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');}" value="1" /><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_palmode1" onclick="document.getElementById(\'fddbt_palmode1\').checked=true;document.getElementById(\'fddbt_palform1\').setAttribute(\'style\',\'position:static;visibility:visible;\');document.getElementById(\'fddbt_palform0\').setAttribute(\'style\',\'position:absolute;visibility:hidden;\');">komplex</label></p><div style="clear: left;"></div></div><div id="fddbt_palform0"><div><h5 style="border:1px solid #c0c0c0;padding:0.25em 0.5em;"><label style="cursor:pointer;" for="fddbt_pal0"><acronym lang="en" title="Physical Activity Level">PAL</acronym>-Faktor</label></h5><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><input style="width:3em;" type="hidden" id="fddbt_pal" value="1.45" /><select id="fddbt_pal0" size="5" onchange="document.getElementById(\'fddbt_pal\').value=this.options[this.selectedIndex].value;"><option value="1.2" title="z.B. alte, gebrechliche Menschen">nur sitzend oder liegend</option><option value="1.45" title="z.B. Schreibtischt&auml;tigkeit" selected="selected">fast ausschlie&szlig;lich sitzend, wenig Freizeitaktivit&auml;ten</option><option title="z.B. Kraftfahrer, Studenten, Laboranten" value="1.67">&uuml;berwiegend sitzend mit stehenden/gehenden T&auml;tigkeiten</option><option title="z.B. Verk&auml;ufer/innen, Kellner, Handwerker, Hausfrauen" value="1.89">&uuml;berwiegend stehende/gehende T&auml;tigkeiten</option><option title="z.B. Bergleute, Landwirte, Waldarbeiter, Hochleistungssportler" value="2.2">k&ouml;rperlich anstrengende berufliche T&auml;tigkeiten</option></select></p></div></div><div id="fddbt_palform1"><div><h5 style="border:1px solid #c0c0c0;padding:0.25em 0.5em;"><acronym lang="en" title="Physical Activity Level">PAL</acronym>-Verteilung</h5><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_pal1-0">Ruhe/Schlaf</label><input style="width:3em;" type="text"  id="fddbt_pal1-0" value="7" /><select id="fddbt_pal1-0u" size="1"  ><option value="60" selected="selected">Std.</option><option value="1">Min.</option></select></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_pal1-1">leicht</label><input style="width:3em;" type="text"  id="fddbt_pal1-1" value="3" /><select id="fddbt_pal1-1u" size="1"><option value="60" selected="selected">Std.</option><option value="1">Min.</option></select></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_pal1-2">normal</label><input style="width:3em;" type="text"  id="fddbt_pal1-2" value="5" /><select id="fddbt_pal1-2u" size="1"><option value="60" selected="selected">Std.</option><option value="1">Min.</option></select></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_pal1-3">mittel</label><input style="width:3em;" type="text"  id="fddbt_pal1-3" value="8" /><select id="fddbt_pal1-3u" size="1"><option value="60" selected="selected">Std.</option><option value="1">Min.</option></select></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_pal1-4">schwer</label><input style="width:3em;" type="text" id="fddbt_pal1-4" value="1" /><select id="fddbt_pal1-4u" size="1"><option value="60" selected="selected">Std.</option><option value="1">Min.</option></select></p><p style="background-color:transparent;" onmouseover="this.setAttribute(\'style\',\'cursor:pointer;background-color:' + sHighlightColor + ';\');" onmouseout="this.setAttribute(\'style\',\'background-color:transparent;\');"><label style="float:left;cursor:pointer;display: block;width:15em;" for="fddbt_pal1-5">sehr schwer</label><input style="width:3em;" type="text" id="fddbt_pal1-5" value="0" /><select id="fddbt_pal1-5u" size="1"><option value="60" selected="selected">Std.</option><option value="1">Min.</option></select></p><p class="floatleft p100" id="fddbt_palmsg"></p><div style="clear: left;"></div></div></div></div><p style="text-align:right;margin:1em;"><input type="submit" id="fddbt_calcbutton" style="font-weight:bold;" onclick="return false;" value="Berechnen" /></p></div>';
    trnodes[1].parentNode.appendChild(newtr);

    if ( document.getElementById('fddbt_modemanuel').checked == true )
    {
      document.getElementById('fddbt_gutb').setAttribute('style','position:static;visibility:visible;');

      if ( document.getElementById('fddbt_palmode0').checked == true )
      {
        document.getElementById('fddbt_palform0').setAttribute('style', 'position:static;visibility:visible;');
        document.getElementById('fddbt_palform1').setAttribute('style','position:absolute;visibility:hidden;');
      }
      else
      {
        document.getElementById('fddbt_palform1').setAttribute('style', 'position:static;visibility:visible;');
        document.getElementById('fddbt_palform0').setAttribute('style','position:absolute;visibility:hidden;');
      }
    }
    else
    {
      document.getElementById('fddbt_gutb').setAttribute('style','position:absolute;visibility:hidden;');
      document.getElementById('fddbt_palform0').setAttribute('style','position:absolute;visibility:hidden;');
      document.getElementById('fddbt_palform1').setAttribute('style','position:absolute;visibility:hidden;');
    }

    document.getElementById('fddbt_calcbutton').setAttribute('onclick','var berror=false;var A, W, H, dBMI, value;A = parseFloat(document.getElementById(\'fddbt_age\').value.replace(/,/g,"."));W = parseFloat(document.getElementById(\'fddbt_weight\').value.replace(/,/g,"."));H = parseInt(document.getElementById(\'fddbt_height\').value.replace(/,/g,""));dBMI = Math.round((W/Math.pow(H/100,2))*10)/10;if ( document.getElementById(\'fddbt_gumode0\').checked == true ){if ( dBMI < 30 ){if ( document.getElementById(\'fddbt_sex\').options[1].selected ){value = Math.round(66.5+13.5*W+5.0*H-6.8*A);}else{value = Math.round(655+9.6*W+1.8*H-4.7*A);}}else{if ( document.getElementById(\'fddbt_sex\').options[1].selected ){value = Math.round(3.4*W+15.3*H-6.8*A-961);}else{value = Math.round(2.4*W+9.0*H-4.7*A-65);}}}else{value = Math.round(10.4*W+6.25*H-5.0*A);if ( document.getElementById(\'fddbt_sex\').options[1].selected ){value += 5;}else{value -= 161;}}if (document.getElementById(\'fddbt_palmode1\').checked == true){var sum = 24 * 60;var pal_value = 0.0;for ( var i = 0; i < 6; i++ ){if ( document.getElementById(\'fddbt_pal1-\'+i).value == \'\' ){document.getElementById(\'fddbt_pal1-\'+i).value = 0;}pal_value += parseFloat(document.getElementById(\'fddbt_pal1-\'+i).value) * parseFloat(document.getElementById(\'fddbt_pal1-\'+i+\'u\').options[document.getElementById(\'fddbt_pal1-\'+i+\'u\').selectedIndex].value);}if ( pal_value != sum ){var msgtxt = \'<span style="color:#bf0000;">Du mu&szlig;t in Summe auf 24 Stunden kommen.\';var difftxt = (Math.abs(sum-pal_value)%60 == 0 ? (Math.abs(sum-pal_value)/60) + \' Stunde\' + (Math.abs(sum-pal_value) > 60 ? \'n\' : \'\') : Math.abs(sum-pal_value) + \' Minute\' + (Math.abs(sum-pal_value) > 1 ? \'n\' : \'\'));berror=true;if(pal_value<sum){msgtxt += \' <strong>Es fehlen noch \' + difftxt + \'.</strong>\';}else{msgtxt += \' <strong>Du hast jetzt \' + difftxt + \' zuviel.</strong>\';}msgtxt += \'</span>\';document.getElementById(\'fddbt_palmsg\').innerHTML = msgtxt;if(berror){return false;}}var f = [1,1.2,1.45,1.67,1.89,2.2];pal_value = 0.0;for ( var i = 0; i < 6; i++ ){pal_value += parseFloat(document.getElementById(\'fddbt_pal1-\'+i).value) * parseFloat(document.getElementById(\'fddbt_pal1-\'+i+\'u\').options[document.getElementById(\'fddbt_pal1-\'+i+\'u\').selectedIndex].value) * f[i];}pal_value /= sum;pal_value = Math.round(pal_value*100)/100;var palindex = 0;for ( var i = 0; i < document.getElementById(\'fddbt_pal0\').options.length; i++ ){if ( parseFloat(document.getElementById(\'fddbt_pal0\').options[i].value)+0.15 > pal_value && parseFloat(document.getElementById(\'fddbt_pal0\').options[i].value)-0.15 <= pal_value ){palindex = i;}}document.getElementById(\'fddbt_pal0\').options[palindex].selected = true;document.getElementById(\'fddbt_pal\').value = pal_value;document.getElementById(\'fddbt_palmsg\').innerHTML = \'Dein <acronym lang="en" title="Physical Activity Level">PAL</acronym>-Faktor ist <strong>\' + pal_value + \'.</strong><br/>Dies entspricht: <strong>\' + document.getElementById(\'fddbt_pal0\').options[palindex].text + \'</strong>\';}var iTB = Math.round(value*document.getElementById(\'fddbt_pal\').value);var iTB80 = Math.round(0.8*value*document.getElementById(\'fddbt_pal\').value);var str = \'\';document.getElementById(\'fddbt_palerg\').innerHTML = \'<h4>Ergebnis</h4><p><span style="font-weight:bold;width:15em;float:left;">Dein <acronym lang="en" title="Body Mass Index">BMI</acronym></span><span>\' + dBMI + \'</span></p><p><span style="font-weight:bold;width:15em;float:left;">Dein Grundumsatz</span><span>\' + value + \' <abbr title="Kilokalorien pro Tag">kCal/Tag</abbr></span></p><p><span style="width:15em;float:left;font-weight:bold;">Dein Tagesbedarf</span><span>\' + iTB + \' <abbr title="Kilokalorien pro Tag">kCal/Tag</abbr></span></p><p><span style="width:15em;float:left;font-weight:bold;">- davon 80%</span><span>\' + iTB80 + \' <abbr title="Kilokalorien pro Tag">kCal/Tag</abbr></span></p>\';document.getElementById(\'' + sSelectId + '\').options[1].selected=true;document.getElementById(\'' + sInputId + '\').value=iTB;return false;');

    if ( GM_getValue )
    {
      document.getElementById('fddbt_sex').options[parseInt(GM_getValue('fddbt_sex', 0))%document.getElementById('fddbt_sex').options.length].selected = true;
      document.getElementById('fddbt_age').value    = GM_getValue('fddbt_age', 30);
      document.getElementById('fddbt_weight').value = GM_getValue('fddbt_weight', 69.5);
      document.getElementById('fddbt_height').value = GM_getValue('fddbt_height', 170);
    }
    }
    else if ( window.location.href.match(/leute\/[^\/]+\/index\.html?$/i) )
    {
      var divnodes = standardcontentnode.getElementsByTagName('div');

      for ( var i = 0; i < divnodes.length; i++ )
      {
        var imgnodes = divnodes[i].getElementsByTagName('img');
        
        if ( imgnodes.length == 1 &&  imgnodes[0].getAttribute('src').indexOf('comment.gif') )
        {
          if ( FDDBT_USERSettings['fddbt_replacesmilies'] == '1' )
          {
            var sInnerHTML = divnodes[i].innerHTML;
            divnodes[i].innerHTML = rep_smilies(sInnerHTML,0);
          }
          
          if ( divnodes[i].innerHTML.indexOf("[") > -1 && ( divnodes[i].innerHTML.indexOf("[/") > -1 || divnodes[i].innerHTML.indexOf("/]") > -1 ) )
          {
            var sInnerHTML = divnodes[i].innerHTML;

            for ( var tag in tags )
            {
              while ( sInnerHTML.indexOf('[' + tag + ']') > -1 )
                sInnerHTML = sInnerHTML.replace('[' + tag + ']', ( FDDBT_USERSettings['fddbt_pinnwandformats'] == '1' ? tags[tag][2] : '' ));
              while ( sInnerHTML.indexOf('[/' + tag + ']') > -1 )
                sInnerHTML = sInnerHTML.replace('[/' + tag + ']', ( FDDBT_USERSettings['fddbt_pinnwandformats'] == '1' ? tags[tag][3] : '' ));
            }
 
            divnodes[i].innerHTML = sInnerHTML;
          }

          if ( FDDBT_USERSettings['fddbt_userlinks'] == '1' )
          {
            setLinks(divnodes[i]);
          }
        }
      }

      var textareanode = standardcontentnode.getElementsByTagName('textarea')[0];

      if ( null != textareanode && FDDBT_USERSettings['fddbt_pinnwandformats'] == '1' )
      {
        textareanode.setAttribute('id','pinnwandarea');
        var formatnode = document.createElement('div');
        formatnode.setAttribute('style','height:25px;width:100%;background-color:#e0e0e0;border:1px outset;padding:2px;display:block;');
        sInnerHTML = '<script type="text/javascript">\n<!--\nfunction fddbt_insert(id,aTag, eTag) {\nvar input = document.getElementById(id);\ninput.focus();\nif(typeof document.selection != \'undefined\') {\nvar range = document.selection.createRange();\nvar insText = range.text;\nrange.text = aTag + insText + eTag;\nrange = document.selection.createRange();\nif (insText.length == 0) {\nrange.move(\'character\', -eTag.length);\n} else {\nrange.moveStart(\'character\', aTag.length + insText.length + eTag.length);\n}\nrange.select();\n}\nelse if(typeof input.selectionStart != \'undefined\')\n{\nvar start = input.selectionStart;\nvar end = input.selectionEnd;\nvar insText = input.value.substring(start, end);\ninput.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);\nvar pos;\nif (insText.length == 0) {\npos = start + aTag.length;\n} else {\npos = start + aTag.length + insText.length + eTag.length;\n}\ninput.selectionStart = pos;\ninput.selectionEnd = pos;\n}\n}\n//-->\n</script>';

        for ( var tag in tags )
        {
          sInnerHTML += '<span style="margin:0px 2px;padding:1px;width:18px;height:18px;border: 1px outset;float:left;"><a href="" onclick="fddbt_insert(\'pinnwandarea\',\'[' + tag + ']\',\'' + ( tags[tag][3] != '' ? '[/' + tag + ']' : '') + '\');return false;" title="' + tags[tag][1] + '"><img border="0" src="' + tags[tag][0] + '"/></a></span>';
        }
		
		sInnerHTML += '<span style="margin:0px 2px;padding:1px;width:18px;height:18px;border: 1px outset;float:left;"><a href="" onclick="document.getElementById(\'fddbt_smilieinput\').style.visibility = ( document.getElementById(\'fddbt_smilieinput\').style.visibility == \'hidden\' ? \'visible\' : \'hidden\');return false;" title="Smilies einf&uuml;gen"><img border="0" src="' + smilies[0][1] + '"/></a><div id="fddbt_smilieinput" style="visibility:hidden;position:absolute;width: 150px;display:block;border:1px outset #c0c0c0;background-color:#e0e0e0;padding:2px;">';
		
		for ( var i = 0; i < smilies.length; i++ )
		{
                  sInnerHTML += '<a href="" onclick="fddbt_insert(\'pinnwandarea\',\'\',\' ' + smilies[i][0] + ' \');document.getElementById(\'fddbt_smilieinput\').style.visibility=\'hidden\';return false;" style="float:left;width:25px;height:25px;"><img src="' + smilies[i][1] + '" border="0" /></a>';
		}
		
        sInnerHTML += '<span style="clear:left;"></span></div></span><span style="clear:left;"></span>';

        formatnode.innerHTML = sInnerHTML;
        textareanode.parentNode.insertBefore(formatnode,textareanode);
      }
    }
    else if ( window.location.href.indexOf('addtonotepad') > -1 && FDDBT_USERSettings['fddbt_addtomorrow'] == '1' )
    {
      var h1node = document.getElementsByTagName('h1')[1];
      var dTomorrow = new Date();
      var sDayOfWeek = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
      var sMonthName = ['Januar','Februar','M&auml;rz','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
      dTomorrow.setDate(dTomorrow.getDate()+1);
      sTomorrow = (dTomorrow.getDate() > 10 ? '0' : '') + dTomorrow.getDate() + '.'
      + (dTomorrow.getMonth()+1 > 10 ? '0' : '') + (dTomorrow.getMonth()+1) + '.'
      + dTomorrow.getFullYear();
      var sLangTomorrow = sDayOfWeek[dTomorrow.getDay()] + ', ' + dTomorrow.getDate() + '. ' + sMonthName[dTomorrow.getMonth()];
      var sHref = window.location.href + '#';
      var sInnerHTML = '<table cellspacing="0" cellpadding="0" border="0" style="margin: 2px 0px;"><tbody><tr><td width="24"><input type="radio" checked="" id="day_tomorrow" value="" name="day" onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();"></td><td><label for="day_tomorrow"><span style="font-size: 18px;">Morgen</span></label>&nbsp;<label for="day_tomorrow"><span style="color: rgb(153, 153, 153);">' + sLangTomorrow + '</span></label><p style="font-size: 12px; margin-top: 2px;"><a onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'day_tomorrow\').checked = true;document.getElementById(\'servingtime\').value = \'6:00\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();" href="' + sHref + '">Frühstück</a>, <a onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'day_tomorrow\').checked = true;document.getElementById(\'servingtime\').value = \'10:00\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();" href="' + sHref + '">Zwischenmahlzeit 1</a>, <a onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'day_tomorrow\').checked = true;document.getElementById(\'servingtime\').value = \'12:00\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();" href="' + sHref + '">Mittagessen</a>, <a onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'day_tomorrow\').checked = true;document.getElementById(\'servingtime\').value = \'14:00\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();" href="' + sHref + '">Zwischenmahlzeit 2</a>, <a onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'day_tomorrow\').checked = true;document.getElementById(\'servingtime\').value = \'18:00\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();" href="' + sHref + '">Abendbrot</a>, <a onclick="document.getElementById(\'nicedatehelper\').value=\'' + sLangTomorrow + '\';document.getElementById(\'day_tomorrow\').checked = true;document.getElementById(\'servingtime\').value = \'22:00\';document.getElementById(\'xusedatehelper\').value=\'' + sTomorrow + '\';helper_refresh();" href="' + sHref + '">Zwischenmahlzeit 3</a></p></td></tr></tbody></table>';
      var newdiv = document.createElement("div");
      newdiv.setAttribute('onclick','document.getElementById(\'day_tomorrow\').checked = true;');
      newdiv.setAttribute('style','padding: 1px 4px;');
      newdiv.setAttribute('class','standardblock-darkercolor');
      newdiv.innerHTML = sInnerHTML;
      h1node.parentNode.insertBefore(newdiv,h1node.nextSibling);
    }
    else if ( window.location.href.indexOf('notepad') > -1 && window.location.href.indexOf('fddbt_export_tb') > -1 )
    {
      var tdnodes = document.getElementsByTagName('td');
      var aTBData = [];
      var dLastDate = null;
      var iLastDate = 0;

      for ( var i = 0; i < tdnodes.length; i++ )
      {
        if ( tdnodes[i].hasAttribute('class') )
        {
          if ( tdnodes[i].getAttribute('class') == 'notepaddate' )
          {
            var sInnerHTML = stripHTMLTags(tdnodes[i].innerHTML);
            dLastDate = parseDate(sInnerHTML);
            iLastDate = date2int(dLastDate);
          }
          else if ( tdnodes[i].getAttribute('class') == 'notepaddatedown' )
          {
            var sInnerHTML = stripHTMLTags(tdnodes[i].innerHTML.replace(/<br\/?>/,'\n'));
            var asData = sInnerHTML.match(/([0-9]{1,}) ?kcal/g);
            var aiData = [0,0,0,0,0];

            for ( var i = 0; i < asData.length; i++ )
            {
              aiData[i] = parseInt(asData[i].replace(/[^0-9]/g,''));
            }
            aiData[3] = aiData[1]+aiData[2];
            aiData[4] = Math.round((aiData[0]/aiData[3])*100);
            aTBData[aTBData.length] = iLastDate + ';' + aiData.join(';');
          }
        }
      }

      var sStr = '';

      for ( var i = 0; i < aTBData.length; i++ )
      {
        sStr += '<div style="float:left;"><h1>' + i + '</h1><table><tr><td>' + aTBData[i].replace(/;/g,'</td><td>')+ '</td></tr></table></div>';
      }
      document.getElementsByTagName('body')[0].innerHTML = sStr;
    }
    else if ( ( window.location.href.indexOf('lebensmittel') > -1 || window.location.href.indexOf('listen') > -1 || window.location.href.indexOf('mylists') > -1 ) && FDDBT_USERSettings['fddbt_addtomorrow'] == '1' )
    {
      var divnodes = document.getElementsByTagName('div');

      for (var i = 0; i < divnodes.length; i++)
      {
        if ( null != divnodes[i].getAttribute('id') && divnodes[i].getAttribute('id').indexOf('serving') > -1 )
        {
          var pnodes = divnodes[i].getElementsByTagName('p');
          var newp1 = pnodes[1].cloneNode(true);
          newp1.innerHTML = 'Morgen';
          divnodes[i].insertBefore(newp1,pnodes[1]);
          var newp2 = pnodes[3].cloneNode(true);
          var sInnerHTML = newp2.innerHTML;
          sInnerHTML = sInnerHTML.replace(/\[\'now\'\]\.value=/g,'[\'now\'].value=24*60*60+');
          newp2.innerHTML = sInnerHTML;
          divnodes[i].insertBefore(newp2,pnodes[2]);
        }
      }
    }
    else if ( ( window.location.href.indexOf('myday20') > -1 || window.location.href.indexOf('listdetails') > -1 ) && FDDBT_USERSettings['fddbt_showskaldeman'] == '1' )
    {
      var tablenodes = document.getElementsByTagName('table');

      for (var j = 0; j < tablenodes.length; j++ )
      {
        if (tablenodes[j].getAttribute('class') == 'myday-table-std')
        {
          var trnodes = tablenodes[j].getElementsByTagName('tr');

          for (var i = 0; i < trnodes.length; i++ )
          {
            var newtd;

            if ( i == 0 )
            {
              newtd = document.createElement("th");
              newtd.setAttribute('style',trnodes[i].lastChild.getAttribute('style'));
              newtd.innerHTML = '<span title="LCHF-Ratio: Fett in Gramm : (Kohlenhydrate + Proteine) in Gramm)">Skaldeman</span>';
            }
            else
            {
              newtd = document.createElement("td");
              newtd.setAttribute('class',trnodes[i].lastChild.getAttribute('class'));
              var f = parseFloat(trnodes[i].childNodes[3].firstChild.innerHTML.replace(/g/,"").trim().replace(/,/,"."));
              var k = parseFloat(trnodes[i].childNodes[4].firstChild.innerHTML.replace(/g/,"").trim().replace(/,/,"."));
              var p = parseFloat(trnodes[i].childNodes[5].firstChild.innerHTML.replace(/g/,"").trim().replace(/,/,"."));
              var sk = 0.000;
              var sColor = '#bf0000';
              var sAlign = 'right';
              var sWeight = 'normal';

              if ( i == trnodes.length-1 || null != trnodes[i].lastChild.firstChild && trnodes[i].lastChild.firstChild.hasAttribute('style') )
              {
                sAlign = 'center';
                sWeight = 'bold';
              }

              if (k + p > 0)
              {
                sk = Math.round((f/(k+p))*1000)/1000;
              }

              if ( sk >= 1.2 )
              {
                sColor = '#00bf00';
              }
              else if ( sk >= 1.0 || sk == 0.0 )
              {
                sColor = '#0000bf';
              }

              newtd.setAttribute('style','text-align:' + sAlign + ';font-weight:' + sWeight + ';color:' + sColor);
              newtd.innerHTML = (sk == 0 ? '0,000' : (''+sk).replace(/\./,","));

              while ( newtd.innerHTML.length < 5 )
              {
                newtd.innerHTML += '0';
              }
            }

            trnodes[i].appendChild(newtd);
          }

          var newdiv = document.createElement('div');
          newdiv.innerHTML = '<div style="border-width: 1px 0px 0px; margin: 4px 0px; border-color: rgb(210, 209, 204); border-style: solid;"></div><p><span style="font-size:16px;font-weight:bold;">Skaldeman-Ratio</span></p><p>Der Skaldeman ist nichts anderes als der Wert, der sich aus der Berechnung des Verh&auml;ltnisses von Fett zur Summe aus KH und Protein ergibt, nach den Erkenntnissen von Sten Sture Skaldeman.</p><p id="fddbt_skaldeman-less" style="text-align:right;"><a href="" onclick="document.getElementById(\'fddbt_skaldeman-less\').setAttribute(\'style\',\'visibility:hidden;position:absolute;\');document.getElementById(\'fddbt_skaldeman-more\').setAttribute(\'style\',\'visibility:visible;position:static;\');return false;">mehr Infos</a></p><div id="fddbt_skaldeman-more" style="visibility:hidden;position:absolute;"><p>Der Hintergrund ist der, dass gerade in Phasen, in denen man abnehmen m&ouml;chte, der Fettanteil in Gramm h&ouml;her sein sollte, als die Summe der enthaltenen Kohlenhydrate und des enthaltenen Proteins.</p><p><span style="font-size:14px;font-weight:bold;">Berechnet wird der Skaldeman so</span></p><p><span style="font-weight:bold;">Fett in Gramm : (KH + Protein) in Gramm</span><br/>Habe ich nun mehr Gramm Fett als die Summe von KH und Protein, ergibt sich zwangsl&auml;ufig ein Wert &uuml;ber 1.</p><table style="width:100%;"><tr><td style="width:50%;"><span style="font-size:14px;font-weight:bold;">Positives Beispiel:</td><td style="width:50%;"><span style="font-size:14px;font-weight:bold;">Negatives Beispiel:</td></tr><tr><td>88g Fett : (6g KH + 58g Protein)</td><td>45g Fett : (4g KH + 58g Protein)</td></tr><tr><td>Ergibt 88 : 64 einen Skaldeman von 1,375.</td><td>Ergibt 45 : 52 einen Skaldeman von 0,865.</td></tr></table><p><span style="font-weight:bold;">Ein Wert ab 1,2 (oder höher) gilt als optimal.</span></p><p>Oder ganz einfach ausgedrückt: Jede einzelne Mahlzeit sollte mehr Fett in Gramm beinhalten als die Summe von Kohlenhydraten und Protein in Gramm.</p><p>Was oft &uuml;bersehen wird: Der Anteil Fett sollte pro Mahlzeit stimmen, nicht nur in der Tagesbilanz! Oft sieht man in Tagespl&auml;nen, dass zwar in der Summe aller Mahlzeiten der Fettanteil hoch genug ist, sprich der Skaldeman stimmt. Schaut man aber die einzelnen Mahlzeiten an, dann sind unter Umst&auml;nden von drei Mahlzeiten eine in Ordnung, bei den beiden anderen stimmt das Verh&auml;ltnis jedoch nicht. Dies sollte nicht passieren.</p><p><span style="font-weight:bold;">Der Fettanteil sollte in jeder einzelnen Mahlzeit stimmen.</span></p><p><span style="font-size:14px;font-weight:bold;">Was das Abnehmen angeht, gilt eine einfache Faustregel:</span></p><p>Liegt der Skaldeman pro Mahlzeit bei 1,2 oder h&ouml;her, nimmt man ab. <br/>Liegt er darunter, nimmt man nicht ab oder sogar zu (bei Werten unter 1,0).<br/>Allerdings sollte man beachten, dass der Skaldeman alleine noch nicht über Abnahme oder nicht Abnahme entscheidet!</p><p style="text-align:right;"><a href="" onclick="document.getElementById(\'fddbt_skaldeman-more\').setAttribute(\'style\',\'visibility:hidden;position:absolute;\');document.getElementById(\'fddbt_skaldeman-less\').setAttribute(\'style\',\'text-align:right;visibility:visible;position:static;\');return false;">weniger Infos</a></p></div>';
          if ( window.location.href.indexOf('myday20') > -1 )
          {
            tablenodes[j-1].parentNode.appendChild(newdiv);
          }
          else
          {
            tablenodes[j].parentNode.insertBefore(newdiv,tablenodes[j]);
          }
          break;
        }
      }
    }
    else if ( window.location.href.indexOf('mydata') > -1 && window.location.href.indexOf('action=') == -1 && FDDBT_USERSettings['fddbt_diatchart'] == '1' )
    {

      var pathnodes = document.getElementsByTagName('path');

      if ( null != pathnodes && pathnodes.length > 0 )
      {
        for ( var i = pathnodes.length-1; i >= 0; i-- )
        {
          if ( null != pathnodes[i] && pathnodes[i].hasAttribute('stroke') )
          {
            pathnodes[i].setAttribute('id','fddbt_linenode');
            break;
          }
        }
      }

      var tablenode = standardcontentnode.getElementsByTagName('table')[1];
      var newtr = document.createElement('tr');

      var asLineColors = [];
      asLineColors[document.getElementById('fddbt_linenode').getAttribute('stroke')] = 'Standard';
      asLineColors['#000080'] = 'Dunkelblau';
      asLineColors['#0000ff'] = 'Blau';
      asLineColors['#c0e0ff'] = 'Hellblau';
      asLineColors['#008000'] = 'Dunkelgr&uuml;n';
      asLineColors['#00ff00'] = 'Hellgr&uuml;n';
      asLineColors['#800000'] = 'Dunkelrot';
      asLineColors['#ff0000'] = 'Rot';
      asLineColors['#ffc0e0'] = 'Rosarot';
      asLineColors['#ff8000'] = 'Orange';
      asLineColors['#ffff00'] = 'Gelb';
      asLineColors['#000000'] = 'Schwarz';
      asLineColors['#808080'] = 'Dunkelgrau';
      asLineColors['#c0c0c0'] = 'Hellgrau';
      asLineColors['none']    = 'keine';

      var newtd = document.createElement('td');
      newtd.innerHTML = '<span style="font-size: 14px; margin-left: 4px;">Linienfarbe:</span>';
      newtr.appendChild(newtd);

      newtd = document.createElement('td');

      var sInnerHTML = '<form onsubmit="return false;"><select style="font-size: 14px;" onchange="var dExpire = new Date();dExpire.setYear(dExpire.getFullYear()+1);document.cookie = \'fddbt_diatchartstrokecolor=\' + this.options[this.selectedIndex].value + \';domain=' + sDomain + ';path=/;expires=\' + dExpire.toGMTString();document.getElementById(\'fddbt_linenode\').setAttribute(\'stroke\',this.options[this.selectedIndex].value);">';

      for ( var sColor in asLineColors )
      {
        sInnerHTML += '<option value="' + sColor + '" ' + ( (FDDBT_USERSettings['fddbt_diatchartstrokecolor'] == '' && asLineColors[sColor] == 'Standard') || (FDDBT_USERSettings['fddbt_diatchartstrokecolor'] == sColor) ? 'selected="selected" ' : '' ) + 'style="background-color:#ffffff;font-size:14px;color:' + sColor + ';font-weight:bold;">' + asLineColors[sColor] + '</option>';
      }

      sInnerHTML += '</select></form></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';

      newtd.innerHTML = sInnerHTML;
      newtr.appendChild(newtd);

      if ( FDDBT_USERSettings['fddbt_diatchartstrokecolor'] != '' )
      {
        document.getElementById('fddbt_linenode').setAttribute('stroke',FDDBT_USERSettings['fddbt_diatchartstrokecolor']);
      }

      newtd = document.createElement('td');
      newtr.appendChild(newtd);

      newtd = document.createElement('td');
      newtd.innerHTML = '<span style="font-size: 14px;">Linienbreite:</span>';
      newtr.appendChild(newtd);

      newtd = document.createElement('td');
      sInnerHTML = '<form onsubmit="return false;"><select style="font-size: 14px;" onchange="var dExpire = new Date();dExpire.setYear(dExpire.getFullYear()+1);document.cookie = \'fddbt_diatchartstrokewidth=\' + this.options[this.selectedIndex].value + \';domain=' + sDomain + ';path=/;expires=\' + dExpire.toGMTString();if (document.getElementById(\'fddbt_linenode\').hasAttribute(\'style\') && document.getElementById(\'fddbt_linenode\').getAttribute(\'style\').indexOf(\'stroke-width:\') > -1 ){var sStyle=document.getElementById(\'fddbt_linenode\').getAttribute(\'style\').replace(/stroke-width:[^;]+;?/gi,\'\');document.getElementById(\'fddbt_linenode\').setAttribute(\'style\',sStyle+\'stroke-width: \'+this.options[this.selectedIndex].value+\';\');}if(document.getElementById(\'fddbt_linenode\').hasAttribute(\'stroke-width\')){document.getElementById(\'fddbt_linenode\').setAttribute(\'stroke-width\',this.options[this.selectedIndex].value);}">';

      var asLineWidths = [];
      asLineWidths['3'] = 'sehr dick';
      asLineWidths['2.5'] = 'dick';
      asLineWidths['2'] = 'mittel';
      asLineWidths['1.5'] = 'd&uuml;nn';
      asLineWidths['1'] = 'sehr d&uuml;nn';
      asLineWidths['0.5'] = 'extrem d&uuml;nn';
      asLineWidths['0'] = 'keine';

      for ( var sWidth in asLineWidths )
      {
        sInnerHTML += '<option value="' + sWidth + '" ' + (sWidth == FDDBT_USERSettings['fddbt_diatchartstrokewidth'] ? 'selected="selected" ' : '') + 'style="border-bottom: ' + sWidth + 'px solid #000000;font-size:14px;">' + asLineWidths[sWidth] + '</option>';
      }

      sInnerHTML += '</select></form></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';

      newtd.innerHTML = sInnerHTML;
      newtr.appendChild(newtd);

      if ( document.getElementById('fddbt_linenode').hasAttribute('style') && document.getElementById('fddbt_linenode').getAttribute('style').indexOf('stroke-width:') > -1 )
      {
        var sStyle=document.getElementById('fddbt_linenode').getAttribute('style').replace(/stroke-width:[^;]+;?/gi,'');
        document.getElementById('fddbt_linenode').setAttribute('style',sStyle+'stroke-width: '+FDDBT_USERSettings['fddbt_diatchartstrokewidth']+';');
      }
      if(document.getElementById('fddbt_linenode').hasAttribute('stroke-width'))
      {
        document.getElementById('fddbt_linenode').setAttribute('stroke-width',FDDBT_USERSettings['fddbt_diatchartstrokewidth']);
      }

      newtd = document.createElement('td');
      newtr.appendChild(newtd);

      newtd = document.createElement('td');
      newtd.innerHTML = '<input type="checkbox" onclick="var dExpire = new Date();dExpire.setYear(dExpire.getFullYear()+1);document.cookie = \'fddbt_diatchartdatapoints=\' + (this.checked==false? \'0\':\'1\') + \';domain=' + sDomain + ';path=/;expires=\' + dExpire.toGMTString();var circlenodes = document.getElementsByTagName(\'circle\');if ( null != circlenodes && circlenodes.length > 0 ){for ( var i = circlenodes.length-1; i >= 0; i-- ){circlenodes[i].setAttribute(\'r\',(this.checked==false?\'0\' : \'3\' ));}}this.parentNode.nextSibling.setAttribute(\'style\',\'font-weight:\'+(this.checked==false? \'normal\':\'bold\'));"' +  ( FDDBT_USERSettings['fddbt_diatchartdatapoints'] == '1' ? ' checked="checked"' : '') + '/>';
      newtr.appendChild(newtd);

      if ( FDDBT_USERSettings['fddbt_diatchartdatapoints'] == '0' )
      {
        var circlenodes = document.getElementsByTagName('circle');
        
        if ( null != circlenodes && circlenodes.length > 0 )
        {
          for ( var i = circlenodes.length-1; i >= 0; i-- )
          {
            circlenodes[i].setAttribute('r','0');
          }
        }
      }

      newtd = document.createElement('td');
      newtd.innerHTML = 'Datenpunkte';
      newtd.setAttribute('style','font-weight:' + ( FDDBT_USERSettings['fddbt_diatchartdatapoints'] == '0' ? 'normal' : 'bold'));
      newtr.appendChild(newtd);

      tablenode.appendChild(newtr);

      newtr = document.createElement('tr');

      newtd = document.createElement('td');
      newtd.innerHTML = '<span style="font-size: 14px; margin-left: 4px;">F&uuml;llfarbe:</span>';
      newtr.appendChild(newtd);

      newtd = document.createElement('td');

      var sInnerHTML = '<form onsubmit="return false;"><select style="font-size: 14px;" onchange="var dExpire = new Date();dExpire.setYear(dExpire.getFullYear()+1);document.cookie = \'fddbt_diatchartfillcolor=\' + this.options[this.selectedIndex].value + \';domain=' + sDomain + ';path=/;expires=\' + dExpire.toGMTString();document.getElementById(\'fddbt_linenode\').setAttribute(\'fill\',this.options[this.selectedIndex].value);document.getElementById(\'fddbt_linenode\').setAttribute(\'d\',(this.options[this.selectedIndex].value != \'none\' ? (!document.getElementById(\'fddbt_linenode\').getAttribute(\'d\').match(/Z$/) ? document.getElementById(\'fddbt_linenode\').getAttribute(\'d\')+\'Z\' : document.getElementById(\'fddbt_linenode\').getAttribute(\'d\') ) : document.getElementById(\'fddbt_linenode\').getAttribute(\'d\').replace(/Z$/,\'\') ));">';

      for ( var sColor in asLineColors )
      {
        sInnerHTML += '<option value="' + sColor + '" ' + ( sColor == FDDBT_USERSettings['fddbt_diatchartfillcolor'] ? 'selected="selected" ' : '' ) + 'style="background-color:#ffffff;font-size:14px;color:' + sColor + ';font-weight:bold;">' + asLineColors[sColor] + '</option>';
      }

      sInnerHTML += '</select></form></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>';

      newtd.innerHTML = sInnerHTML;
      newtr.appendChild(newtd);

      if ( FDDBT_USERSettings['fddbt_diatchartfillcolor'] != 'none' )
      {
        document.getElementById('fddbt_linenode').setAttribute('fill',FDDBT_USERSettings['fddbt_diatchartfillcolor']);
        document.getElementById('fddbt_linenode').setAttribute('d',document.getElementById('fddbt_linenode').getAttribute('d')+'Z');
      }

      tablenode.appendChild(newtr);
    }
  }

if ( FDDBT_USERSettings['fddbt_markextlinks'] == '1' || FDDBT_USERSettings['fddbt_easylogout'] == '1' )
{
  var anodes = document.getElementsByTagName('a');

  for ( var i = 0; i < anodes.length; i++ )
  {
    if ( FDDBT_USERSettings['fddbt_markextlinks'] == '1' ) checkExternalLink(anodes[i]);
  }

  for ( var i = 0; i < anodes.length; i++ )
  {
    if ( anodes[i].innerHTML == 'Abmelden' )
    {
      anodes[i].setAttribute('id','fddbt_logoutlink');
      break;
    }
  }

  if ( FDDBT_USERSettings['fddbt_easylogout'] == '1' )
  {
    document.getElementById('fddbt_logoutlink').setAttribute('style',anodes[i].getAttribute('style') + 'background-color:#ffffff;padding: 1px 2px;border:1px solid #bf0000;color:#bf0000;');
    document.getElementById('fddbt_logoutlink').setAttribute('href',anodes[i].getAttribute('href') + '&action=logout');
  }
}

if ( ( window.location.href.indexOf('profile20') > -1 && window.location.href.indexOf('action=changedv') > -1 && FDDBT_USERSettings['fddbt_guformhelper'] == '1' ) || ( document.cookie && document.cookie.indexOf('fddbt_username=') == -1 ) )
{
  GM_xmlhttpRequest(
  {
    method: 'GET',
    url: urls[2],
    headers: {Accept: 'text/plain'},
    onload: function(data)
    {
      var tmpdoc = document.createElement('html');
      tmpdoc.innerHTML = data.responseText;
      var tablenode = tmpdoc.getElementsByTagName('table');

      if ( FDDBT_USERSettings['fddbt_linkuserprofile'] == '1' )
      {
        var tdnode = tablenode[4].getElementsByTagName('tr')[5].getElementsByTagName('td')[1];
        var d = stripHTMLTags(tdnode.innerHTML).match(/Nutzername:\s*(.+)/);
        var dExpire = new Date();
        dExpire.setYear(dExpire.getFullYear()+1);
        document.cookie = 'fddbt_username=' + d[1] + ';domain=' + sDomain + ';path=/;expires=' + dExpire.toGMTString();
      }

      if ( document.cookie && document.cookie.indexOf('fddbt_username=') == -1 )
      {
        var tdnode = tablenode[4].getElementsByTagName('td')[1];
        var sInnerHTML = stripHTMLTags(tdnode.innerHTML.replace(/\<br\/?>/g,'\n'));
        var aData = sInnerHTML.split('\n');

        for ( var i = 0; i < aData.length; i++ )
        {
          if ( aData[i].indexOf('Geschlecht:') > -1 )
          {
            GM_setValue('fddbt_sex', ( aData[i].indexOf('Weiblich') > -1 ? 0 : 1) );
          }
          else if ( aData[i].indexOf('Körpergrösse:') > -1 )
          {
            GM_setValue('fddbt_height', aData[i].replace(/[^0-9]/g,''));
          }
          else if ( aData[i].indexOf('Gewicht:') > -1 )
          {
            GM_setValue('fddbt_weight', aData[i].replace(/[^0-9\.,]/g,''));
          }
          else if ( aData[i].indexOf('Geburtstag:') > -1 )
          {
            var tmpdate = new Date();
            var asDate = aData[i].split(': ')[1].replace(/\./g,'').split(' ');
            tmpdate.setYear(tmpdate.getFullYear()-parseInt(asDate[2]));
            var iMonth = getMonthFromString(asDate[1]);
            tmpdate.setMonth(tmpdate.getMonth()-iMonth);
            tmpdate.setDate(tmpdate.getDate()-parseInt(asDate[0]));
            var iAge = tmpdate.getYear();
            GM_setValue('fddbt_age', iAge);
          }
        }
      }
      postrenderpage();
    }
  });
}
else
{
  postrenderpage();
}