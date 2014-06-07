// ==UserScript==
// @name           eESM+
// @namespace      http://diveintomark.org/projects/greasemonkey/ 
// @description    eESM enhancer 
// @include        https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=ViewChangeBean&ChangeId=*
// @include        https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=ChangeListBean*
// @include        https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=SpecificNumberFilterBean*
// @include        https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=BlankBean*
// @include        https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=CustomFilterBean&src=*
// ==/UserScript==

/*
Todo:


Known bugs:
1. not working in saved/held tickets - some fields are not available (partially solved)
2. bug v custom query se snazi vytahnout cisla changi zobrazi text radiobuttonu

*/
GM_log('eESM modificator! - starting');

//support functions
function getXCoord(el) {
	x = 0;
	while(el){
		x += el.offsetLeft;
		el = el.offsetParent;
	}
	return x;
}
function getYCoord(el) {
	y = 0;
	while(el){
		y += el.offsetTop;
		el = el.offsetParent;
	}
	return y;
}
function Loaded() {
alert('Loaded');
}

GM_log(document.location.href);

if(document.location.href.match(/ViewChangeBean/)) {
// Change details page - add some important info at top of the page

// 1  change number
// 5  record status
// 6  approval status
// 10 change abstract
// 11 required date
// 14 scheduled date
// 24 assignee
// 27 assignee name
// 56 change description
// 78 installation instructions

GM_log('href.match(/ViewChangeBean/)');

//*/xxx  Statistical module 
    allTDs = document.getElementsByTagName('td');
    changeno = allTDs[1].childNodes[1].nodeValue;
    cvs_line = allTDs[1].childNodes[1].nodeValue; // change number
    cvs_line = cvs_line + ';' + allTDs[2].childNodes[1].nodeValue; //change category
    cvs_line = cvs_line + ';' + allTDs[26].childNodes[1].nodeValue; //change category
    cvs_line = cvs_line + ';' + allTDs[5].childNodes[1].nodeValue; //record status    
    cvs_line = cvs_line + ';' + allTDs[6].childNodes[1].nodeValue; //approval status
    
    //DATES
    cvs_line = cvs_line + ';' + allTDs[8].childNodes[1].nodeValue.replace(/ /g,';').replace(/,/,''); //created date MM;DD;HHMMSS;AM|PM
    // There could be no shedule date 
    if ( allTDs[14].childNodes[1] )
      cvs_line = cvs_line + ';' + allTDs[14].childNodes[1].nodeValue.replace(/ /g,';').replace(/,/,''); //scheduled date MM;DD;HHMMSS;AM|PM
    else
      cvs_line =  cvs_line + ';;;;;';
    // There could be no required date 
    if ( allTDs[11].childNodes[1] )
      cvs_line = cvs_line + ';' + allTDs[11].childNodes[1].nodeValue.replace(/ /g,';').replace(/,/,''); //required date MM;DD;HHMMSS;AM|PM
    else
      cvs_line =  cvs_line + ';;;;;';      
    
    
    // There is completition code only for closed changes
    if ( allTDs[9].childNodes[1] ) 
      cvs_line = cvs_line + ';' + allTDs[9].childNodes[1].nodeValue; //completition code
    else
      cvs_line =  cvs_line + ';';
    // There could be assignee (but not always)
    if ( allTDs[24].childNodes[1] )          
      cvs_line = cvs_line + ';' + allTDs[24].childNodes[1].nodeValue + ' ('+allTDs[27].childNodes[4].nodeValue+' '+allTDs[27].childNodes[1].nodeValue+')'; //assignee ID + name
    else
      cvs_line =  cvs_line + ';';

    // FINALY ADD INFO TO THE PARENT PAGE
    // If there exist change summary in parent frame, add info
    if ( top.frames[2] )    
      if ( top.frames[2].document.getElementById('sum'+changeno) )
        top.frames[2].document.getElementById('sum'+changeno).innerHTML = cvs_line;
 //*/   
  
// if page is loaded as [i]frame
if (self != top) {
  // if page is loaded as iframe, there will be frame named 'frameNavbar'
  if (top.frames[1].name == 'frameNavbar') {    
    GM_log('in iframe');
    var allTDs, txtreplace;
    allTDs = document.getElementsByTagName('td');
    
    // [Block] Colorize approval status
    apStatus = allTDs[6].childNodes[1].nodeValue;
    if ( apStatus == 'Approved' ) {
      apCol = '<b>Approval status:</b> <em style="display:inline; background-color:#00ff00;"> Approved </em>';
      }
    else
    if ( apStatus == 'Pending' ) {
      apCol = '<b>Approval status:</b> <em style="display:inline; background-color:#008eff;"> Pending </em>';
      }
    else {
      apCol = '<b>Approval status:</b> <em style="display:inline; background-color:#ff0000;"> Rejected </em>';    
      }
      
    // [Block] Colorize scheduled and required date/time
    var one_day=1000*60*60*24;
    var today = new Date();
        
    if ( allTDs[14].childNodes[1] ) {
      var shDate = new Date(allTDs[14].childNodes[1].nodeValue);         
      if (Math.ceil((today.getTime()-shDate.getTime())/(one_day)) > 0) {
        // it's over shedule date
        shCol = '<b>Scheduled Date/Time:</b> <em style="display:inline; background-color:yellow;"> '+allTDs[14].childNodes[1].nodeValue+' </em>';
        }
      else {
        // date is in future
        shCol = allTDs[14].innerHTML;
        }
      }
    else {
      shCol = allTDs[14].innerHTML;  
      }
      
    // [Block] Colorize scheduled and required date/time
    var rqDate = new Date(allTDs[11].childNodes[1].nodeValue);
    var chStat =  allTDs[5].childNodes[1].nodeValue; 
    var overdue = Math.ceil((today.getTime()-rqDate.getTime())/(one_day));
    if ( ( overdue > 0) & (chStat == 'Open') ) {
      // it's over shedule date
      rqCol = '<b>Required Date/Time:</b> <em style="display:inline; background-color:red;"> '+allTDs[11].childNodes[1].nodeValue+' ('+overdue+' day(s) overdue!) </em>';
      }
    else {
      // date is in future
      rqCol = allTDs[11].innerHTML;
      }
      
    // [Block] Assignee name
    asName = ' ('+allTDs[27].childNodes[4].nodeValue+' '+allTDs[27].childNodes[1].nodeValue+')';
    asCol = allTDs[24].innerHTML + asName;
    
 // Change summarization update on main page
 /*/xxx   
    changeno = allTDs[1].childNodes[1].nodeValue;
    if ( top.frames[2].document.getElementById('sum'+changeno) )
    top.frames[2].document.getElementById('sum'+changeno).innerHTML = changeno+'	 '+shCol+'	 '+asCol;
 //*/   

    // [Block] Replace page content with compiled info
   document.body.innerHTML = '<p>'+allTDs[1].innerHTML+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
      allTDs[5].innerHTML+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
      apCol+'<br />'+
      shCol+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
      rqCol+'<br />'+
      asCol+'<br />'+
      allTDs[40].innerHTML+'<br />'+
      allTDs[10].innerHTML+'<br />'+                  
      allTDs[56].innerHTML+'<br />-<br />'+
      allTDs[78].innerHTML+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>';
   
    }
  // if page is loaded by clicking open button
  else {
    // normal behaviour aka page loaded by clicking open button
    var allTDs, txtreplace;
    allTDs = document.getElementsByTagName('td');
    txtreplace = allTDs[1].innerHTML;
    allTDs[1].innerHTML = txtreplace+
          "<br />\n"+allTDs[5].innerHTML+
          "<br />\n"+allTDs[6].innerHTML+
          "<br />\n"+allTDs[10].innerHTML+
          "<br />\n"+allTDs[14].innerHTML+
          "<br />\n"+allTDs[24].innerHTML+
          "<br />\n"+allTDs[27].innerHTML;
          
//    changeno = allTDs[1].childNodes[1].nodeValue;
//    if ( top.frames[2].document.getElementById('sum'+changeno) )
//    top.frames[2].document.getElementById('sum'+changeno).innerHTML = changeno+'	 '+shCol+'	 '+asCol;
   }
   
   }
else {
    // page open by clicking link (see below)
//  var logo = document.createElement('img');
//  logo.src = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%02%00%00d%00d%00%00%FF%EC%00%11Ducky%00%01%00%04%00%00%00P%00%00%FF%EE%00%0EAdobe%00d%C0%00%00%00%01%FF%DB%00%84%00%02%02%02%02%02%02%02%02%02%02%03%02%02%02%03%04%03%02%02%03%04%05%04%04%04%04%04%05%06%05%05%05%05%05%05%06%06%07%07%08%07%07%06%09%09%0A%0A%09%09%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%01%03%03%03%05%04%05%09%06%06%09%0D%0B%09%0B%0D%0F%0E%0E%0E%0E%0F%0F%0C%0C%0C%0C%0C%0F%0F%0C%0C%0C%0C%0C%0C%0F%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%FF%C0%00%11%08%00d%00d%03%01%11%00%02%11%01%03%11%01%FF%C4%00%C6%00%00%02%02%02%03%01%00%00%00%00%00%00%00%00%00%00%00%08%06%07%05%09%01%03%04%02%01%01%00%01%05%01%01%00%00%00%00%00%00%00%00%00%00%00%06%01%02%04%05%07%08%03%10%00%01%03%02%03%03%06%06%0F%02%08%0F%00%00%00%00%01%02%03%04%05%06%00%11%12!%07%081%22%13%14%15%16A%B5%C6%18%88IQa2Bb%23%D4%96%A6%17w8Xh%19%81)q%91%A1%823C%24%09%B1%C1Rr%C2Scs%834%84%94f(H%11%00%01%02%03%04%06%07%05%06%04%07%00%00%00%00%00%01%00%02%11%03%04!1%12%05AQa%A1%22%06q%81%B12b%13%07%91%C1%D1%23%24%E1BR%82%92%14%F0r%B2%08%F1%D23c%15%16%17%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%D8o%0C%9C2p%DB_%E1%B7%87%CA%EDw%87%CD%DA%D6%ABu%AD%DA%DAs%EB%15%89%F6%9D%1EL%A9r%A4%D1%E2%BA%FB%EF%BE%ECU-%C7%1CZ%8A%96%B5%12TI%24%E7%82%2B%C3%CD%3B%85%8F%C3N%EA%BEf%D0%FEG%82%23%CD%3B%85%8F%C3N%EA%BEf%D0%FEG%82%23%CD%3B%85%8F%C3N%EA%BEf%D0%FEG%82%2F%15C%86%0E%12)%10%E4Tj%BC%3Cn%8A%99O%8A%9Dr%A7K%B4%A8%2C%B2%DA%7D%95%B8%B8%81)%1F%C2pU%00%93%01z%5C%AA%F2%3F%BB%B2%9A%F3%8CB%DC.%EEnE4%B5!oR7yL%7D%82Rr%3A%1F%5C%16%DAX%F6%0A%14A%C6%0C%CC%CA%9EY%81x%8E%CB%7B%14%A6%8B%923%9A%C6%87%CB%A6~%13%A5%D0g%F5%10W%5D2g%F7vNZQ%3Bp%3B%BD%B7%82%88%1D5Ow4%E4439s%9Df%03%C8%40%F6%D4%A01Iy%9D4%C3%00%F1%D7gj%BA%B3%91%B3%AAV%E2%7D3%C8%1F%86%0F%DC%D2N%E4%C5Q%F8i%E1%02%E1%A7%B1V%A0%F0%FD%B9%FA%D5.H%CE%3DB%0D%A7%40%90%CA%C7%C1q%B8%AAI%FE%3Cg%03%1BB%8A%B9%A5%84%B5%C2%04h7%AC%A7%9Aw%0B%1F%86%9D%D5%7C%CD%A1%FC%8F%15V%A3%CD%3B%85%8F%C3N%EA%BEf%D0%FEG%82%23%CD%3B%85%8F%C3N%EA%BEf%D0%FEG%82%23%CD%3B%85%8F%C3N%EA%BEf%D0%FEG%82%24%7F%CD%EBp_%A9'q~%A3%F7%7F%DC%9F6%AE%DD%EEwvi%5D%95%DA%BD%F0%EA%BD%7F%A9un%87%ACt%3F%15%D2%E8%D7%A3%9B%9E%9D%98%22x8N%FB%ACp%D3%F6Uf%F8%8E%1E%08%AF%FC%11%18%22%F2%CE%9B%12%9B%0AeF%7C%84D%83%01%87%24%CC%94%E1%C9%0D%B4%D2J%D6%B5%1F%00JA'%04%84V%9C7%BD%BD%8A%BE%F9.G%AA%F3%1Dy%8BJ%23%84Z%16%CB%84%A5%A6X%04%E8%94%FB%5C%8A%90%F0%E7%12%AC%F4%02%10%9C%B2QT%2F4%CC%9DP%F2%C6%9E%01%BFo%C1zw%91y.NQN%D9%F3%9A%0DK%C4I%23%FD0~%E3u%1F%C4o%8D%97*%C7%97%97%1Au%D0%D1%C9%82)U%8F%7C%DD%7B%B5%AE7p%D9u%23O%95%D2%25u*Z%C90*(%1C%ADLdlV%60%E4%1CNN%23%95*%E5%07%3E%8B0%99L%EB%0C%5B%A4%7F%17(%A73%F2%7D%16%7B(%89%8D%0D%9B%F7f%01%C4%0E%DF%C4%DD%87%AA%05m%DFu%7B%CB%A2o%5E%CF%85u%D1%9B%5C5-j%8BX%A3%BER_%835%AC%BAX%EE%14%EC9f%14%95%0D%8AAJ%87.%26%F2'%B6s%03%DBq%5EZ%CDr%B9%F9eK%E9%A7%88%3D%A7%A8%8D%0E%1B%08%B4%2B%1B%1Fe%AFF%08%8C%11%20%1E%B4%DFE_-%F0D%C0p%9D%F7X%E1%A7%EC%AA%CD%F1%1C%3C%11_%F8%220ED%F156D%1D%C4o!%D8%AB-%B8%FD9%B8n(r%F43%245%19%E1%FB%5BqC%18%D5%AE-%90%F2%3F%09%EC%5B%CEY%92%D9%D9%A53%1Fq%9A%C8%FE%A0%B5%1CyN9%E2%F6!F%08%8C%11%18%22%60%F8f%DEC%7B%BC%DEK0%AA%B5%24%40%B5%2F%84%26%9DW%5C%85%040%CC%E4%02%60IR%95%90I*%CD%82I%C8%EBN~%E4c%7F%91U%E0%98e%13c%AE%E9%FBW%25%F5%5B%97%C5M%23k%A5%B7%8EU%8E%86%99gI%FEW%7B%01%2Bl%98%96%AF%3C%A3%04F%08%90%0FZo%A2%AF%96%F8%22%608N%FB%ACp%D3%F6Uf%F8%8E%1E%08%AF%FC%11%18%22%AF%F7%ABj.%F8%DD%B5%EFi%B2%90%A9u%BA%3C%A8%F4%FC%FC%12%BA2%A8%E7o%B0%EARqd%D6y%8C-%3AA%0B*%86%A9%D4%95%12%E7%B6%F69%AE%FD%24%15%A5FV%B7%1BB%DDeq%9E%23'%E2%BA%0A%5Ci%C4%9C%96%DA%D2v%85!%40%A4%83%C8F9%CC%C6%168%B5%D7%85%EC%FAZ%99u2%99%3AY%8B%5E%03%81%D8DB%9AX%B65Wx%15%A7%E9T%F9H%A6A%A72%89%15%BA%CB%8D%97K%08uE-6%D3Y%A4-%D7%0AT%40Q%09HIQ%CFbN%F3%23%C9N%60%E2%5C%60%C6%DF%AC%EC%0B%98z%A1%EA%5B9BD%B6J%60%99S68ZO%0BZ%3E%FB%A1i%11%B0%01y%8D%B6%2B%CAo%0D%94S%15%02%91y%D6%E2%D4%9BG9%F9%E9%8B.3%CB%CB%95%C6%5Be%85%24%1F%F6kN%5E%DE%25%F3yN%89%CD%83q4%EB%8Cw%15%E7%AA%0F_y%92L%FCs%BC%A9%AC%8D%AC%2C%C3f%A0%E6%DA%3A%E2%96%9A%ED6%A3kT%EA%D4k%85%81%0A%A1E9%CB(%25L%BA%C9N%B6%E40%A2%01Sn'jNY%E7%9AH%D4%93%88%16c%96%CC%A2%9F%E5%3A%D3%A0%EB%1A%17%AB%B9%3F%9C%A8%F9%97%2C%15%F28%40%88%7B%5D%7C%B74E%C0%EC%02%D0t%8BU%B9G%E1%FE%EF%AD%D2%18%9DT%AB%D3-%E5%D4%18%0E%22%87%22%2B%B3%5DKn%A70%99*K%AC%A1*%20%E4%A4%A4%2F.L%CE%25%14%FC%9CK%01%992%0E%D4%04%60%B8nq%FD%C6%B2%5DK%99GF%26I%04%8CO~%12%F1%AC4%03%00tD%9D%A1%3E%7C9%D4k%14%ABF.%ED%AE%D9%7Dn%E6%B4%9AuP%E6%A5%C5%3A%C4%BAJ%E48%22)%87%17%93%87%A0AK%2BJ%D2%14%92%13%CA%92%95%1D%AF%ED%26S5%ACy%C4a~%B5%CF%1F%9E%D2g%13%E6%D4SK%F2%9A%5D%1F.%FC%11%D0%08%BCF0%F6%263%16%AB%91%82%24%03%D6%9B%E8%AB%E5%BE%08%98%0E%13%BE%EB%1C4%FD%95Y%BE%23%87%82%2B%FF%00%04F%08%8C%11j%17%88%FBQ%BBC%7C%F7%5Ch%E8%0DA%B9%90%C5%CB%01%BC%F9%3A%F1%5Br%B2%FF%00%A9e%C5%7F%3B%10%EC%F6F%09%F8%C5%CE%1B%C5%FE%E5%E9%2FJ%B3_%DDefC%8F%14%97C%F2%3B%89%BB%F1%0E%A5%82%DC%95%BBfV7%87%12u%7D%87%15u%DBZ%AB%16%04%84%CBy%84t%8B%8C%E4%3A%82%14%CBkKo%94%B2%A4(%25%C4%ABH%D4%A4%F2%2B%12.O%9C%C71%F2%CFx%1CC%A0%88%1E%C5%C8%3F%B8%9C%BA%A6UM%3DkDd%CCg%94%E3%08%C1%CCq%7Bz1%07%1E%98%14%F2bn%BC%C6%92%5E!_bu%FC%98%B4%F2%D9%9DK%A0Ffz%89%CD%3Dar%1E%90%C3ne%9F%22%14%09%F0%E9X%C4%13%9B*%1A%CA%99%24Z%5Bi%E8%88%80%DC%BDS%E8%1EQ%3E%AB%25%CC%9A%E2%5B*y%F2%DA%7CX%1C%D78tbh%EAL%16%E5%E2%D8%F1%AC%84%F7%01%12%A3%D2%A6%D4%E6%D4j%D4%E9%D2%DE%97*%1DRs%9D%3C%C6%1DT%85%ADi%D2%B5f%94%E7%A7NJNaY%99%8D%1C%F9S%A5%09%92%8CZm%F8%8E%A5%E7%1Eb%CA%EBr%BA%E7%D2V%B7%0C%D9pi%B2%00%81%DDsu%B5%C2%D0U%F3%BBv%17%3Bx%AEI%60%E6%CD%B7B%7D%9A%8A%D2%7D%CB%D57%E3%AD%86%95%ED%F4qT%BC%BC%00%A4%FB%E1%8C%5C%C9%C3%85%ABu%CA2%5C%3C%C9%9A%0C%00%ED)%92%C6%ADM%11%82%24%03%D6%9B%E8%AB%E5%BE%08%98%0E%13%BE%EB%1C4%FD%95Y%BE%23%87%82%2B%FF%00%04F%08%8C%11k%EB%8D%EA%5Cv%EA%9B%B0%AF!%A4%89O%B3V%A5%C8%7C%0Er%9B%1DZCi'%C2%12R%BC%BF%CE8%D0s%03%23)%AE%D4%7BG%D8%BA%EF%A3%F5%05%B5%F3%E5ht%B8%FE%97%0F%F3%24iR%1F%84%A6%AA1%1C%92%C4%EAc%82T%090%8E%99-%3C%DEzT%CA%B3%1C%ED%A4e%C8A%20%E6%09%18%8DR%D4L%910%3E%5B%A0%E1%A7%F8%D0%BBvw%94%D2f%B4s)j%E5%F9%92%9C-n%9D%84jp%D0E%A0%A9%8B%3CFo%5D%F8J%A7CH%917ABj%F3(F%1B%C9'%91J%5B%CE%B7%1C%A8%7B)eC%E0%1CK%3F%ED%95!%B0!%91%D7i%DC%17%02%FF%00%C0%F2i%93%F1K%99S%82%3D%C2%1A%D1%0D%5Ec%80%3E%C0J%88j%7D%E7%1F%971%F7%25%D4'%3A%A95)%AF%2C%B8%EB%F2%1C%DA%E3%8BY%00%A8%93%ED%0D%99%00%00%00b%25SP%FA%89%86c%CC%5Ct%AE%FF%00%93%E5%14%B9M%24%BAJV%06K%60%80h%DFm%E4%93i%26%D2%BE%99%95Z%A6%AAL%9Bn%E2%A9Z%959-%A5%B7*t%B7%8BKZPsJ%5DG%B8q%23%D8P%CC%7B%D21%91E%99%D4Q%93%E58%80o%1A%3F%C5j9%9B%92%B2%9EbkEt%96%BD%CD%EE%BA%E7%0D%98%84%09n%B6%C6%1Dke%FC%1C%5C%F4%CA%AE%EC%1D%A0%B91%C9W%AD%0A%A3)%FB%D9r%0A%96%EB%EFT%1Fu%F6%25%25%D7%14%A5%BA%DA%9A%C9%B4%A9D%94%E8-%FB%C1%89%85%05_%EEe%07%17%12%ED1%BE%2B%CD%FC%DB%90%1C%970%7C%81)%B2%E5%9Be%86%C7%06%0B%B8cm%FD%E8%DB%1Dw%A6%DF%19%AA2%8C%11%20%1E%B4%DFE_-%F0D%C0p%9D%F7X%E1%A7%EC%AA%CD%F1%1C%3C%11_%F8%220D%60%89%10%E3%81%C0!n%B9%AF%0A%AA55%E7%E1%E6%C5%40%FF%00K%1A%3C%FC%FC%81%FC%C3%B0%AE%A7%E9%13c%9BL%3F%EC%BB%FA%98%90%7CC%D7%A3W%92%A15%AAt%19u%07%D0%E2%D8%84%D2%9Ey-'R%F4%20f%A2%06%CC%F2%1Bqs%1A%5C%40%0B%E5%3Ep%93-%CFu%C0D%AE%C7%E4%B3%1D--%D7%02P%F3%AD%B2%D2%80%24%15%BA%A0%94%0D%9E%C9%23%00%D2U%CF%98%D6%00I%BC%81%D6l%0B%87e2%CB%F1%23%B8Hvj%96%98%E3%2C%C1Sh.(%13%E0%E6%82p%0D%24%13%A9Q%D3Z%D75%A6%F7F%1DB%3D%8A%DE%E1%CBxmZ%1B%E4%A3%3C%EB%8A%8DN%9F0%DA%B7%18%24i%D1QCn%C3u%5E%00%04%82%CE%D3%EEB%97%ED%E3u%92%CE%F2%A7%06%93c%C6%FD%1F%05%CC%BDM%CB%C6a%96%3Ek%1B%C7L%F0N%BC%0E%03%17T%0B%5D%F9V%E4q0%5EpF%08%90%0FZo%A2%AF%96%F8%22%608N%FB%ACp%D3%F6Uf%F8%8E%1E%08%AF%FC%11%18%220E%AEN3%AE%9Auf%B7aP%E9%C9zA%A0H%AC%26%A3Q%09%02%2FY%0DDJ%A3%B6%B2sZ%DB%0B%1A%F2%1ARN%92uf%91%1E%CF%E64%CB%0D%8D%B1%F7%15%D6%3D%1F%81%CC%E7k%12%BB%5C%D4%99%E2(%BD%10%B0%B7%23%C8%8Fn%D7%9Es%DC%22%9D'%3F%DA%D2%80%FES%8F%AC%91%17%B7%A5afN%C3K4%F8Ob%C1%DE%EE%BB%0E%DAe%0C%BA%A6f%26T%1E%AA%A4%FB%ADq%DCK%EA%FD%81-(%9Fk%3C%7D)%84_%B2%DF%82%C3%CE%9Ee%D2%F0%98%3A-%87KHwcOR%CE%D4%B6%D6-%E6%D26%87%E5%3AG%B0%84FZ%09%FE7%121%F3gu%DD%5D%AB2%A6%D9%D2%86%D7%1E%AC%24%7B%C2%C3Au%81Y%BE%1Au%F3%0D%D5I%8A%A6%A4%2F6%C0J%20G!%C6%D6r%04%B6%A3%99%C8%F3vg%96c%1FS%8D%8D%96%F1%B6%07h%2B%02Q%A7%A8%9FWL%F2%098q7%C0%E6%01%1E%8E%F5%BB%16%F9wq%5C%9Fsn%FA%C7%B8%AA%8D)%9A%9Dr%83N%9FPii%D2C%F2%236%E3%99%A7%C1%CEQ%D9%8E%80%C3%16%82t%85%E4%1A%89b%5C%D7%B0%18%86%B8%80u%C0%C2%3Dji%8B%97%C5%20%1E%B4%DFE_-%F0D%C0p%9D%F7X%E1%A7%EC%AA%CD%F1%1C%3C%11_%F8%220EV%5D%7B%C0q%99O%DB%96sl%D4%EB%ED%12%DDR%A8%E7%3A%05'4%E6%0C%82%92%0B%AF%7F%92%C2%0E%AF%0A%CBi%C9G%16%A6%A9%B2E%B6%9DK%E36p%97%D2%97%0D%E8n%A0%DE%1B%BA%8Fn%D1%E6%04%DC%F6%DESm%BA%C4%B4%25j~%60%04%C8L%80%0A%01%EB%BA%97%AC%82%00Z%82%FD%EE%23%B3!4%9F2%E2mY%5C%BD%CCuY%1Dh%AB%A7%81t%08!%D1%C2%E0t%3A%16%ED%D8BB%DD%B6%EE%D8%ED%B6%FA)%08%AC%C6V%B4%BA%E4%07%03r%19%5Bj)%5BoD%92%5BRV%85%02%95%25%2BY%04%11%8AM%C8_%08%CBpp%F6%7D%8B%B1%E4%FE%BD%E5%93%5D%E5%E6%12_!%E2%C2G%CCf%E88%0F%CAT%5E%B4%C3r%60N%A5%D6%20%D4%A9%ADMel%BCdB%92%D6%90%B1%90!e%BD%19%83%B4m%C6%0F%FC%7DL%A7G%01%B3%AF%B1O%A5%F3%FF%00-%E6R%8B%19%5D*%0E%10%B5%D8%0F%B1%F0Q%B7%CB%156d%1A%C5Y%A7%E4%3B%1Dpa%A2%13%0F)%0D%AEFH.h%C9JS%8E%1C%80%1E%01%CD%1C%A4%93ig%020Ku%FA%B7%2F%A5G3e%0Ec%9DQ%5D%23%BA%40%83%DB%01%1B%DD%08%92I%DC%2C%D6T%D2%D5%B1.%7B%BE%F6%B6%CDQ3%A8%11%D4%CC%F6%93Wj%9A%F3%D1%D9a1%D4%FB%CE%3B%05o7)%D4%ADM6%0A%9BI-%81%98%0B%DA1%9F'*v%12%26%F04%E90%8Ctu%5E%A0%B9%CF%AB9l%B9%CCu%1C%D6%CF%9C%DB%20%D0%E6%CA%C0%7B%F1%7B%AFq!%B8%60%08%10%D2%B6%C1%B9m%C6%D8%96%A5%8C%CCiNR%B7%92%BA%DDG%B7%DF%AF%C8%88%CB%D1U%25L%B5%1D%0A%86%DB%85%E0%DA%5Bm%94%A4%1DED%82I%CC%E4%24T%94%AD%A7%94%18-%17%AE%5B%9F%E7%F3%B3%8A%D7%D5%BC%60.%00A%A4%C04%5C%23%A7n%B4%C6%80%00%00%0C%80%D8%00%C6R%D1.pD%80z%D3%7D%15%7C%B7%C1%13%01%C2w%DDc%86%9F%B2%AB7%C4p%F0E%7F%E0%8A%8C%AF%DE%F3n%D7%5E%A5%D9%D3%D7%02%DCa%D7%18%AB%5EQ%CAzIKl%949%1E%96%A3%A8d%95%82%97%24e%92H)k5%E6%B4k%EA%EBD%BE%16%F7%BB%16%2C%FA%8C%16%0B%D6%3A%05%3E%15*%1B0)%D1Q%0E%1B%1A%BA6%1B%1B3Q*Z%94NeJR%89R%94%A2J%89%24%92q%A3s%8B%8CM%EB%5EI6%95%EC%C5%15%12%EF%BD%BB%02%B4%CA%E4%DE%D6%1D%3A4%E9%8E(%BDx%DBkS%8D%AAb%10%9C%8C%C8e%A4%2F%FBJ%40%01i)%3D*F%CF%8CH%D5%B1%A2%AC%F2%F8%1Dv%8D%9Fb%C0%AE%A1m%40%C4%2Cp%DF%B1P%B1%AE%3A%83%8C3(%5Bs_%8E%FAB%D8%95M%93%12SK%07%C2%92%A7%99V_%C2%90%7D%ACo%14e%D2%400%8D%BBA%0B%C3%5B%A8%D6%AA%F0%D9%8B%06%D8%AA%97%116%14%85u%C7bGoDy-%BC%BEwYY%CF%24%1C%B6%60%AB-%8Ci%89p%B8%EB%D5%D0%AE%8D%C8%D3%AB%B5%3B%D6%B5p%D5Y%89%0E%05%B9LL%1A%7CH%CE-%F7%04%DA%92%D2%EB%A5%C7%94%96%D2J%18a%19%04%A7gI%CAs%C6%AB3%99%60gZ%DE%E4%F2%9A%18%E7%88%DAa%ECLR%A5Tlu%D4.ki%1A%E1%A0%3B%3E%E7%B5J%88br%10%92%E3%CFF%1C%8C%CB%C8f%08%C9.%9Ek%9BHq8%D4%95%8E%96C%5Dk%7B%14%82D%F2%CB%0D%CA%F6%B5%AE%8A5%E5B%A7%DCT%09%5Dj%9BQo%5BJRT%DB%8D%A8l%5BN%B6%A0%14%DB%88%3B%14%95%0C%C1%C6%F4%10DB%D9%03%15%20%C5Q%20%1E%B4%DFE_-%F0D%C0p%9D%F7X%E1%A7%EC%AA%CD%F1%1C%3C%11w%5D%97%0B%B7%B4%B9%96%F5*Ij%CD%A7%BA%A8%D7%05E%95%10%BA%AC%86%C9%0E%C1e%C4%91%A5%86%C8%D2%FA%C6%D5%AB6%93%90%0Ec%5B%5BY%83%81%B7%F6%2CJ%89%F8xE%EA%0B%3A%9El%F7%1C%AE%DB%D0%D5%D8%9B%0D%C7kD%40%0D%86%86%C5N%84%CArJ%1Di%3B%5Cm%03'P6%0E%90'V%9C%1CV%1B%D6%0CcaSv%5EfK%2C%C8%8E%F2%24G%90%DA%5D%8E%FBgR%16%DA%C0RV%929A%070qb%B5v%60%88%E4%DA6%11%C9%82*N%FA%DDZ%A7I%97q%D9%BD%14J%D4%8C%DD%AA%5B%EE%A85%0A%A2%E7)q*%C8%88%F2%15%C8W%96%85%FF%00X3%E7%8C%FAZ%D3%2B%85%D6%B7%B1%60%D6P2%A0F%E7k%F8%AA%09%F9%AA%8C%B91%1E%83%25%9A%D4U%B6%C2%ED%D7%9B-M2%5EPC%2C%06%CF)ud%25%0AI(W(Q%1Bq%BA%13X%5B%88%1B%14q%D4s%5B0K%22%D3%EC%E9M%C5%85j%AA%CF%B6%A2R%A4%3C%995G%96%B9%B5%D9h%00%25%C9%B2%08S%BA%3E%03%60%06%D1%F0%12%9CG'%CE3%5E%5C%A5%B2e6S%03%1BpR%D7%98%12Yz1%DA%24%B6%B6%88%3F%0D%25%3F%E3%C7%C5%7D%143w%15wm%9Au%93q4%E0E%16%BDM%A5S%AE%F8%A7%DC%87z%16%E3E%A8%83%98%01hXKN%9F%7C%D9%04%FF%00D1%B4%A2%A8%C30%CB7%13b%CC%A7%9B%07a7%26%BF%1B%95%9E%90%0FZo%A2%AF%96%F8%22%B17)%5E%93C%E0%D3%86%E4S%94%A4%D6%AB%DB%B1%B2i%145%20f%5B%91.%87%10%17%CF%B4%C3ao%1Fi%07%1F)%D3%04%B6%17jVL~%06%92%A7P%A1E%A6%C3%89N%82%D8f%14%06Q%1E%23C%DE%B6%DABS%FBr%1BO%84%E2.I%26%25j%09%8A%F5%02A%04%1C%889%83%82%A2%87%5B(%14%99%D5%DBU%24%F5Z%5B%8DO%A1%A1%5E%F2%05%40%ADA%94%FC%16_m%D4'%D8F%81%E0%C5%CE%B6%05%5Cm%B5L1j%B5%18%22%E8%95*%2C%18%B2gN%92%D48P%DAS%D2%E5%BC%A0%86%DAm%035-j%3B%00%03%94%E0%AA%A1%14%FASwMz%9B%7CVi-%B2%9A%23n%B7a%B1%25%A0%25%B2%D4%94%84%BD5%EDCSky%3C%D6%DB%CF%98%8D%AA%E7%AC%84%5E%5D%84a%1AoU6X%A7%D8%B1Z%BB%19%D8%EBG%D8Z%7F%C3%82*%E2%C3%89%16%AF%BBj%3D6%A0%D7O%06d)Pe3%99%05L%87%DE%60%80F%D0t%8D%84rb%F7%92%1D%10%AEq%81%8A%607wZ%95V%B7Q%1A%A6%F1%91%5B%B7%DF%5D*%B2%FA%B9%5Dv8Im%F3%FE%FD%956%EF%F3%B2%F0bI%22o%9A%C0%E5%B6%96%FCm%05'~%B4%DFE_-%F1%F6W%A5Wv%1F%A8%2F%D5%0F%0C%3D%81%E6%FB%DC%FF%00%AB%CAW%D5%B7i%F7%AF%AD%F5%1E%C6%85%D5%BBS%A1%F8%AE%BB%D4%F3%CF%A1%F8%BF%E9%B2%D9%A7%18u%D80q%C6%11%D1%0Fz%F8Ta%C3%C5%18lV%87%EF%26%FC%B4%FD1%C6%A7%E9%BC%7B%96%17%CA%F1nG%EF%26%FC%B4%FD1%C3%E9%BC%7B%93%E5x%B7(%E9%FDE%FB%E0%DE%5En%1D%AB%D8K%E94%F7%BB%AB%F5%5E%B6%8D%1A%FD%F7I%AFV%8F%06%9D~%1C%B1w%D3%E1%FB%D7%ECU%F9P%D3%B9H%BFy7%E5%A7%E9%8E-%FAo%1E%E5O%95%E2%DC%8F%DEM%F9i%FAc%87%D3x%F7'%CA%F1nP%DB%8F%F5%10%ED%8B%7F%BC%1En%7D%93%AF%FB'K%DE%CE%C8%ED%1Dc%AB%F5%BF%EB%3A_%F5%3D'%C4%EA%E4%F8%DD%18%BD%BF%B7%81%86-%D1U%1EV%DD%CAf%7FR%7C%CE~mY%E7%B7%3E%F8%E7%9E%2C%FAo%1E%E5O%95%E2%DC%B8%FD%E4%DF%96%9F%A68%7D7%8Fr%7C%AF%16%E5%F6%DF%EAO%D2%23O%9BF%ADC%2C%FB%E3%96y%E1%F4%DE%3D%C9%F2%BC%5B%94B%C5%FDD%BB%A5G%EC_7%3E%CB%CAOU%EB%BD%EE%E9%FF%00%E6%9E%D7%AF%A3%E6%FB%BDYe%E0%CB%17%3F%F6%F1%B7%16%E5WyQ%D3%B9L%EC%FF%00%D4%AB%BD%F7%17a%F9%B4v%87f%40%ED%EE%9B%BE%3DS%DD%BF%D5s%D3%CE%E9%F4j%CF-%9D%1E%9C%FD%EE6T80%9C%11%84t%C3%DC%B2%E9%B0%C0%E1%8C6%AAO%FF%00~%BC%FE%BF%F9%FF%00%EB%B7%CD%FF%00%FF%00)%EE%AFu%7B%D3%FF%00%7B%DA%1Dw%FE%0FC%F0%F1%9C%B2%17%FF%D9";
//  document.body.insertBefore(logo, document.body.firstChild);

  }          
}
else
if ( (document.location.href.match(/ChangeListBean/)) || (document.location.href.match(/BlankBean&src=displaylists/)) || (document.location.href.match(/SpecificNumberFilterBean/)) || (document.location.href.match(/CustomFilterBean/)) ) {
// Change list page - 
  GM_log('href.match(/ChangeListBean/ | /BlankBean&src=displaylists/ | /SpecificNumberFilterBean/ | /CustomFilterBean/');
  //replace change number with a link to the change detail page
  var allRadios, thisRadio;
  allRadios = document.evaluate(
    "//input[@type='radio']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  // go through the changes
  for (var i = 0; i < allRadios.snapshotLength; i++) {
    thisRadio = allRadios.snapshotItem(i);
    // create link object and replace text with it
    var changeno = thisRadio.nextSibling.nodeValue;
    var changenr = document.createElement('strong');
    changenr.innerHTML = '<a target="_blank" href="https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=ViewChangeBean&ChangeId='+
                          thisRadio.value+
                          '&invokedFrom=" '+
                          "onmouseover=\"document.getElementById('hint"+changeno+"').style.visibility = 'visible';\" "+                          
                          "onmouseout=\"document.getElementById('hint"+changeno+"').style.visibility = 'hidden';\" "+ 
                          '>'+changeno+'</a>';                
    // onmouseover="document.getElementById('hiF{changeno}.style.visibility = "";') 
    // onmouseout='document.getElementById('hiF{changeno}.style.visibility = "hidden")'"
    thisRadio.parentNode.replaceChild(changenr,thisRadio.nextSibling);
    //hintbox  
    var infobox = document.createElement('div');
    infobox.id = 'hint'+changeno;
    infobox.style.background = '#d0d0ff';
    infobox.style.border = 'solid black 1px';
    infobox.style.padding = '0px';
    infobox.style.position = 'absolute';
    infobox.style.left = (getXCoord(changenr)+changenr.offsetWidth+5)+'px';
    infobox.style.top = (getYCoord(changenr)+changenr.offsetHeight+5)+'px';
    infobox.style.width = '85%';
    infobox.style.height = '50%';
    infobox.id = 'hint'+changeno;
    infobox.style.visibility = 'hidden'; 
    //helper frame
    var hiFrame = document.createElement('iframe');
    hiFrame.id = 'hiF'+changeno;
    hiFrame.style.width = '100%';
    hiFrame.style.height = '100%';
    hiFrame.style.padding = '0px';
    hiFrame.style.border = '0px';
    
    //hiFrame.onload = function() {alert('loaded');}
    //document.body.appendChild(hiFrame);
    thisRadio.parentNode.insertBefore(infobox, thisRadio.nextSibling);
    infobox.insertBefore(hiFrame,null);
    document.getElementById('hiF'+changeno).src = 'https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=ViewChangeBean&ChangeId='+changeno;
    
    }
   //
   // !!! tady je misto kde se musi pokracovat
   //   if (document.location.href.match(/CustomFilterBean/)
   // tzn. pokud si na prvni strance vytvor seznam vsech changi
   // ev. pokud si na /BlankBean&src=displaylists/ tak to udelej taky pro zrovna otevrene change
   
//**** Get all the change from the form element and for each use ggg fucntion   
   function ggg (a) {
    GM_log('ggg('+a+')');
    var chSum=document.createElement("div");
    chSum.id = 'sum'+a;
    //chSum.style.border = '1px';
    chSum.style.border.color = 'black';
    
    var inFrame = document.createElement('iframe');
    inFrame.id = 'inF'+a;
    inFrame.style.width = '100%';
    inFrame.style.height = '1px';
    inFrame.style.padding = '0px';
    inFrame.style.border = '1px';
    inFrame.style.border.color = 'black';
// if frame is not visible it's not fetched => gmscript is not runned    
//    inFrame.style.display = 'none';
    
    /*
    onmouseover=\"document.getElementById('hint"+changeno+"').style.visibility = 'visible';\" "+                          
                          "onmouseout=\"document.getElementById('hint"+changeno+"').style.visibility = 'hidden';\" "+ 
    */
    // header
    var chngAsText=document.createTextNode(a);
    
    //chSum.innerHTML = '<a onClick="javascript:document.getElementById(\'inF'+a+'\').style.visibility=\'hidden\';" >'+a+'</a>';
    chSum.innerHTML = '<a onClick="if (document.getElementById(\'inF'+a+'\').style.display==\'none\'){ document.getElementById(\'inF'+a+'\').style.display = \'\'; } else { document.getElementById(\'inF'+a+'\').style.display = \'none\'; }" >'+a+'</a>';
    
    /*
    x=document.getElementById(inF+a); if (document.getElementById(inF+a).style.display=='none'){ x.style.visibility = ''; } else { x.style.visibility = 'hidden'; }
    
    */
//    chSum.appendChild(chngAsText);
         
                          
    document.body.appendChild(chSum);
    // frame
    document.body.appendChild(inFrame);
    document.getElementById('inF'+a).src = 'https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=ViewChangeBean&ChangeId='+a;
    
   }
   
//**** Get all the change from the form element and for each use ggg fucntion 
   chngList = document.evaluate(
    "//input[@name='changeidlist']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for (var i = 0; i < chngList.snapshotLength; i++) {
    thisList = chngList.snapshotItem(i);
    var chgArr = new Array();
    var chgArS = thisList.value;
    chgArr = chgArS.split(',');
    chgArr.forEach(ggg);        
    } 
  
  }
else
if ( document.location.href.match(/CustomFilterBean/)  ) {
  GM_log('href.match(/CustomFilterBean/)');
// upravit query predvyplnit udaje
// tohle uz je v predchozim iffu, checknout zda je to tam treba......
  window.alert("WTF!");
}
else {
  GM_log('href.match(/???/)');
  //window.alert(document.location.href);
}

// Change list page - 

//https://129.39.234.13/managenowen.war/servlet/com.sdtc.wsi.MainServlet?Command=WorkGroupNavbarBean