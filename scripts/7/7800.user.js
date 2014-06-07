// Neopets - Lookup Fixmeup
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Lookup Fixmeup
// @namespace      http://userscripts.org/users/22349
// @description    V 1.02 - Links the trophy images on someone's lookup to the game page. Counts the game trophies. Allows you to remove the user style.
// @include        http://www.neopets.com/userlookup.phtml?user=*
// @include        http://neopets.com/userlookup.phtml?user=*
// @version        1.02
// @updated        2009.09.09 
// ==/UserScript==

GM_addStyle('.tsf {font-family:Verdana, Arial, Helvetica; font-size:10pt;} .tstop {border-top:1px solid rgb(0, 0, 0)} .tsbottom {border-bottom:1px solid rgb(0, 0, 0)} .tsleft {border-left:1px solid rgb(0, 0, 0)} .tsright {border-right:1px solid rgb(0, 0, 0)}');
trophyDiv = document.getElementById('usertrophies');
if (trophyDiv && !trophyDiv.textContent.match('Trophies: None')){
// fix for the footer sometimes overlapping the trophy table
  copyDiv = document.createElement('div');
  copyDiv.setAttribute('id', 'usertrophies');
  copyDiv.innerHTML = trophyDiv.innerHTML;
  trophyDiv.parentNode.insertBefore(copyDiv, trophyDiv.nextSibling);
  trophyDiv.parentNode.removeChild(trophyDiv);

  for (var x = 0, thisDiv; thisDiv = copyDiv.getElementsByTagName('div')[x]; x++){
    if (thisDiv.textContent == '- Game Trophies -'){
      thisDiv.addEventListener('click', function(){document.getElementById('trophystats').setAttribute('style', '');}, false);
      thisTable = thisDiv.nextSibling.nextSibling;

      var acount = 0, bcount = 0, ccount = 0, dcount = 0;
      var thisImg;
      for (var m = 0; m < thisTable.getElementsByTagName('img').length; m++) {
        thisImg = thisTable.getElementsByTagName('img')[m].src;
        if (thisImg.match('_1.gif')) {acount++}
        if (thisImg.match('_2.gif')) {bcount++}
        if (thisImg.match('_3.gif')) {ccount++}
        if (thisImg.match('_4.gif')) {dcount++}
      }
      var tcount = acount + bcount + ccount + dcount;
      countDiv = document.createElement('div');
      countDiv.setAttribute('id', 'trophystats');
      countDiv.setAttribute('align', 'center');
      countDiv.setAttribute('style', '');
      if (dcount == 0){d = new Array('3', '', '', '');}
      else {d = new Array('4', ' tsright', '<td class="tsf tstop" style="background-color: #FFFFFF; font-weight: bold; color: #1E90FF;" align="center" width="25%"> Runner-up </td>', '<td class="tsf" style="background-color: #EFEFEF; color: #000000;" align="center">'+ dcount +'</td>');}  
      countDiv.innerHTML = '<table class="tsf tstop tsleft tsright" border="0" cellpadding="2" cellspacing="0"><tbody><tr><td class="tsf" style="background-color: #FFE573; font-weight: bold; color: #000000;" colspan="'+d[0]+'" align="center">Trophy Stats</td></tr><tr><td class="tsf tstop tsright" style="background-color: #FFFFFF; font-weight: bold; color: #FFD700;" align="center" width="25%"> Gold </td><td class="tsf tstop tsright" style="background-color: #FFFFFF; font-weight: bold; color: #A9A9A9;" align="center" width="25%"> Silver </td><td class="tsf tstop'+d[1]+'" style="background-color: #FFFFFF; font-weight: bold; color: #A0522D;"  align="center" width="25%"> Bronze </td>'+d[2]+'</tr><tr><td class="tsf tsright" style="background-color: #EFEFEF; color: #000000;" align="center">'+acount+'</td><td class="tsf tsright" style="background-color: #EFEFEF; color: #000000;" align="center">'+bcount+'</td><td class="tsf'+d[1]+'" style="background-color: #EFEFEF; color: #000000;" align="center">'+ccount+'</td>'+d[3]+'</tr><tr><td class="tsf tstop tsbottom" style="background-color: #FFE573; font-weight: bold; color: #000000;" colspan="'+d[0]+'" align="center">Total: '+tcount+'</td></tr></tbody></table><br>';

      thisTable.parentNode.insertBefore(countDiv, thisTable);

      countDiv.addEventListener('dblclick', function(){this.setAttribute('style', 'display: none;');}, false);

      for (var y = 0, thisCell; thisCell = thisTable.getElementsByTagName('td')[y]; y++){
        if (thisCell.getAttribute('class') == 'trophy_cell medText'){
          thisBlock = thisCell.innerHTML;
          gamenum = thisBlock.match(/trophies\/(\d+)_/)[1];
          if (gamenum == '90'){thisBlock = '<a href="/games/neoquest.phtml?section=leaders">'+ thisBlock;}
          else if (gamenum == '115'){thisBlock = '<a href="/battledome/battledome.phtml">'+ thisBlock;}
          else if (gamenum == '222'){thisBlock = '<a href="/gallery.phtml">'+ thisBlock;}
          else if (gamenum == '348'){thisBlock = '<a href="/homespotlight.phtml">'+ thisBlock;}
          else if (gamenum == '373'){thisBlock = '<a href="/games/nq2/index.phtml?act=fastest">'+ thisBlock;}
          else if (gamenum == '467'){thisBlock = '<a href="/ul_spotlight.phtml">'+ thisBlock;}
          else if (gamenum == '469'){thisBlock = '<a href="/games/faeriecaves/faeriecavesspotlight.phtml">'+ thisBlock;}
          else if (gamenum == '479'){thisBlock = '<a href="/random_contest.phtml">'+ thisBlock;}
          else if (gamenum == '867'){thisBlock = '<a href="/video/index.phtml">'+ thisBlock;}
          else if (gamenum == '196' || gamenum == '341' || gamenum == '487'){thisBlock = '<a href="/gamescores.phtml?game_id='+ gamenum +'">'+ thisBlock;}     //tax trophies
          else if (gamenum == '448'){thisBlock = '<a href="/gamescores.phtml?game_id=448">'+ thisBlock;}     //slots big losers
          else {
            if (gamenum == '68'){gamenum = '67';}             //pyramid bonus
            else if (gamenum == '69'){gamenum = '70';}        //scarab 21 cumulative
            else if (gamenum == '77'){gamenum = '76';}        //solitaire bonus
            else if (gamenum == '84'){gamenum = '54';}        //neggsweeper cumulative
            else if (gamenum == '352'){gamenum = '351';}      //bilge dice streak
            thisBlock = '<a href="/games/play.phtml?game_id='+ gamenum +'">'+ thisBlock;
          }
          thisCell.innerHTML = thisBlock.replace('<br>', '</a><br>');
        }
      }
      break;
    }
  }
}
// If account is frozen, link username to show_user page
if (!document.getElementById('userinfo')){
  thisDiv = document.getElementById('content').getElementsByTagName('b')[0];
  thisDiv.innerHTML = thisDiv.innerHTML.replace(/User Lookup: (\w+)/, 'User Lookup: <a href=/show_user.phtml?user=$1>$1</a>');
}
// Add button to remove user style
if (document.getElementsByTagName('style')[2]){
  closeImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%AE%A2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%04gAMA%00%00%B1%8E%7C%FBQ%93%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%07)IDATx%DA%9CW%5Bl%13W%1A%FE%CE%CC8%BE%C4v%9C%D8%CE%05'%C4%80%A8%81%24P(d%B3%8A%D8%98E%91P%C9%03%0A%22%22%AFhE%DEh%91%22%B2%5D%B1E%A8%91h%97%AE6%DD*A%DDmD%C5K%B6%DD%A7%BD%09%91J(%5C%9Cp%5B%DCD%A5eQ%9A%E6%E2%A4%C1%8E%C9%C5%97x%3C3%E7%EC%03gR%DBq%81%DD%23%FD%0Fs4%E7%7C%FF%E5%FB%2F%87%E0%C5%8Bp%81%DF%EF%17b%B1%18I%A5RD%96e%D2%D1%D1!Y%2C%16%D2%D7%D7%97%06%00%93%C9%C4l6%1B%1B%1A%1A%A2%FC%2C%E3%92wI%2F%00%14%B8%88%3E%9F%CF%B0m%DB6%B3%CF%E7%B3%A4R)inn%8E%89%A2X%2CI%92h%B1X%E6jkkQ%5D%5D%CD%A6%A6%A6%E4G%8F%1E%ADF%22%11%15%80%06%80ra%F9%00%F2%ED%89%00D%B7%DBm%D8%BD%7B%B7%E5%F0%E1%C3%A5uuu%1B%EB%EA%EA%9A%8A%8A%8A~a0%18%1A2%0F%A8%AA%FAU%2C%16%BB%1F%0C%06%FF%D1%DB%DB%3Bv%EF%DE%BD%98%2C%CB%E9H%24%A2p%05%B4%5C%F0%5C%60%DDJ%83%D7%EB5%EE%DB%B7%CF~%E8%D0%A1%8Dmmm%A7%ADVk%2B%00D%22%F3%00%80%EF%BF%FF%8E%26%12%09%D4%D6%EE%14%00%C0%ED.%07%00%AC%AC%AC%7C%5E__%FF%8E%C5b%91'''%13%8B%8B%8Bi%00J%86%F5%EB%80uK%0B*%2B%2BM~%BF%BF%E4%D8%B1c%3BZZZ%FE%18%8D%86%ABe9%C5%3E%FE%F8wlb%E2%1B%22%08%2CKaMc%CC%E3%D9%C2%DE~%FB7d%D3%A6%ADDQ%94%D1%5B%B7n%7Dp%E6%CC%99%C0%F8%F8xlyyY%06%90%CE%B4%5C%CC%015%D8%EDv%F3%9E%3D%7BJ%DA%DB%DB%EBZ%5B%5B%BFXXx%EA%1C%18%F8%8C~%FA%E9Eai)B%08Y%1F%1EA%20%24%1E_%24_~%F97%A2%AA%A0%1B6x*jk%EB%8Ez%BD%DE%7F%DF%BE%7D%3B%AC(%8A*%CB2%CB%24%9C%0E%2Cr%A2%19%7D%3E_%F1%91%23G%5E%3Bq%E2Do4%1A.%E9%E9%B9%A0%8D%8E%DE%16%F1%0A%8B%10%82%C7%8F%BF%22w%EF%DE%A1%F5%F5%8Dd%E7%CE%5D%AD%92%24%DD%1C%19%19Y%88%C5bj%26%D1%F4t%91%00%18%5D.%97%BD%AD%ADmsww%F7%AFUU%3E%3C0%F0%19%0D%04%AE%0A%F8%3FVU%D56%DA%D5u%5E0%9B%AD%236%9B%EDW%00%9E%01%88%03%90%01h%82%EEf%BB%DD%5E%B0c%C7%8E%A2%FA%FA%FA%AD%C5%C5%C5%87%97%97%97%D6%81R%CA%98%A6%E5%CFMQ%B4%D0%CC%EF%99%99%C7%C2%93'%DFjV%AB%F5%E77n%DC8VYYi%03P%C0%BDK%F4%8BEUUMeee%CE%A6%A6%26%3F%00%5C%BA%F4%7B%E4%80%A2%AF%EF%0Br%E9%D2%E7%C4%E1%A8%C8%029u%EA%3C%FB%E8%A3%CB%82%D7%5B%93%B5%DF%D7w%91D%22%F3%A8%A9%A9%F1%87B!3%00%23%F7.%D1-%96%0C%06%83)%91HX%CB%CA%CAvE%22%F3%98%9A%FA%0F%C9!%10b%B1%15%B8%DD%E5%E8%EE%EE%11%1C%8E%0A%CA%18%C3%A9S%E7Yc%A3%9F%00%402%99%60%D9%F9%9D%10TU%85%D3%E9%F4%3B%1C%0E%07%00%13%07%16%D6%80M%26%93%C5%600%94%98%CD%E6%5D%D1%E8%02%15E%B2%8E%BD%5D%5D%1Dtb%E2%09%DC%EEr%7C%F2%C9_%84%FE%FE%7F%B1%C6F%3F%89D%E6%D1%DF%DFK%C3%E1%C9u%24%0C%04%86T%00%E8%E8%E8%D8e%B3%D9%8CY%C0V%ABUt%B9%5Cf%B7%DB%ED%E2%C5!%2Fa%04%81%0A%5D%5D%1DT%96e%00%80%CDf%23%00%D0%DF%DFK%83%C1%9ByI89%F9%1D%01%00%AF%D7%5BI)5f%C5%98R*%12B%0C%9A%A6%99%00%20%9D%96_%902%9A%10%8F%C7Y%F6%E5%E3%3F%F9%BF%A6i%9C%23%D4%98H%24D%0E%2C%08%CFc%93%24%E1p%18%E3%E3%E3%AB%00P%5D%BD9%EF%25%8C1tv%5E%60N%A7%93d%5E%FA%DE%7B%7F%10r%09%A7%AF%8A%8AJ%FA%5C%B9%C9%98%D9l%96%F4j%B9%E6%9E%C5%C5E-%14%0A%25%15E%89x%3C%95y%DD%D6%D9y%81%D5%D77%92Hd%1E%EF%BF%FF%5Bz%FCx%F3Z%CC%BB%BB%7B%84%82%02%FB%3A%F07%DE%F8%99%00%00%D7%AE%5D%9BSU5%AB)%E8%BD%93Z%2C%16uff%E6%F1%F3%FEZDs%EB%F1%A6M%5B%D6%88%14%0C%DE%14%04A%13t%C2%01%80%CFW%9B%93%82%84%95%96%96%89O%9F%3E%FDzlllIQ%94%ACZ-%020%8A%A2Xh%B7%DB%1D6%9B%CDq%F0%60%F3%1E%8F%A7%8A%8E%8C%5C%172%EB%F1%E0%E0U%3A8%F8O6%3B%FBD%F81%E6%8C%0C%0E%FE%9D%DD%B9%13%60%D3%D3%DFfy%AA%B9%F9%A8%B2%7F%FFAqhh%E8%DE%C0%C0%C0%03%00Q%001%00)%91%5B%5D%40)5%C5%E3q%CB%D8%D8%98x%FC%F8q%B7%D3%E9%DC%F0%E0%C1%03-%91X%12~%B4%40!%9A%26%E7m%12%A9T%3C'%EFM%F4%F4%E9%B3%12c%F8%C1%EF%F7%FFuuu5%94Q6%D3%027%5D%05%90%D24-%96L%26%A3%E7%CE%9D%BB%E7v%97%E3%DDw%3F%10%05%C1D%FF%D7%3A%ADi%60%1F~%F8'%B8%DD%E5%B8r%E5%CA%DDh4%1A%06%90%00%90%E2XT%CC%9C8(%A5%86t%3Am%0A%85Bbaa%E1JS%D3%81%EDMM%CD%24%10%B8Ee9A%5E%05T%10%8C%F4%E2%C5%3F%A3%AAj%930%3C%3C%7C%FF%E8%D1%A3%83%00B%00%C2%00%969%B8%22%E6%CEW%8C1)%95JI%81%40%80%16%16%16.%1D8%F0K_C%C3~%E2ry%94%D1%D1%87%04%A0y%15%A0%94%B07%DFlW%DEz%EB%1Di%C3%86%8Ddxx8%D8%D8%D8x%15%C04%80y%1E%DF%B5%EE%94%D5%16%01X%01%B8%00xDQ%AC%B6Z%AD%9B%DB%DB%DB%B7%9F%3D%7Bv%BB%C7%E3%D9%1A%89%CC%23%99L%D0%FB%F7G%E8%C3%87w%09%00%D4%D4%EC%A2%AF%BF%BEO(--%13%DD%EEr%3C%7B%F6l%EE%F2%E5%CBO%3A%3B%3B%EF%02%98%000%05%60%16%C0B.p%E6%20%60%02%60%E7%E0%15%A2(V%1A%8D%C6%AAd2%E9%E9%E9%E9y%AD%A5%A5%C5%B5e%CB%16_%3E%8B%A7%A7%A7'%AE_%BF%1E%3Dy%F2%E4%23EQB%00f%B8%8B%7F%E0%A0%2B%991%26%B9%A3%0F%07%B7%01(%01P%C6%A5%DCl6%97%AE%AE%AE%96%14%15%159%F6%EE%DD%EBnhh(%06%80%600%B8%3C%3A%3A%BA0%3B%3B%1B%E5%AC%0Ds%D7%3E%E5%F2LO!%3E%F4i%00X%DEa%2F%C3%EDE%00%8A%018%B9%22%0E%00VI%92%CC%00%24UU!I%92J)%5D%A5%94%C6%01%2Cq%A0(%80EN%26%DD%BDY%C3%DEO%8E%B7%5C%013%80B%EE%01%1BW%C6%C2%15%D3%5B%A0%C6%2FNr%90%18%97%04%80U%0E%F8%C2%F16%F7%15!q%D1%3D%A0K%81%DESuB%F3%B8%A5%B9%02r%86%85%AA%1E%D3%97%0D%F4%B9%FB%BA%12%99)G%F2%9C%D3%C7%D6%CC'K%26%D8%2B%3Da%F0%12e%5E%B6%D8%AB%FC%F4%DF%01%00(%BD'K-%D1%F0R%00%00%00%00IEND%AEB%60%82";
  noDiv = document.createElement('div');
  noDiv.innerHTML = '<img src="'+closeImg+'" height="30" width="30" style="cursor:pointer; position:fixed; top:10px; right:15px; z-index:9999999" title="Remove Style">';
  document.body.appendChild(noDiv);
  noDiv.addEventListener('click', function(){
    this.setAttribute('style', 'display: none;');
    allStyles = document.getElementsByTagName('style');
    for (var x = 1; x < allStyles.length - 1; x++){
      allStyles[x].innerHTML = '';
    }
    moreStyles = document.evaluate('//td[@class="content"]//*[@style]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var x = 0, thisStyle; thisStyle = moreStyles.snapshotItem(x); x++){
      if (thisStyle.id == 'userinfo'){break}
      thisStyle.removeAttribute('style');
    }
  }, false);
}