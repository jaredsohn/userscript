// Copyright (C) 2007 Peter Murray-Rust, Nick Day
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CrystalEye GreaseMonkey
// @namespace     http://wwmm.ch.cam.ac.uk/crystaleye/
// @description   Adds links from crystallographic articles to CrystalEye summary pages.
// @include       http://pubs*.acs.org/*
// @include       http://pubs.rsc.org/*
// @include       http://journals.iucr.org/*
// @include       http://www.csj.jp/journals/chem-lett/cl-cont/*
// @include       http://www.sciencedirect.com/*
// @exclude	  http://wwmm.ch.cam.ac.uk/crystaleye/*
// ==/UserScript==
//
// CHANGELOG
//
// 2007-07-20: Violently hacked BlueObelisk greasemonkey script to create CrystalEyeMonkey - PMR
// 2007-08-13: Removed redundant artifacts from original BO script - NED
// 2007-08-14: Turned the CrystalEye logo into an encoded stringso that no image need be downloaded for each doi found - NED
// 2007-09-01: Removed unused overlib artifact - NED
// 2007-09-04: Added page includes so that the script is now active for Chemistry Letters and Elsevier journals - NED
//

var IDLIST="crystaleye_ID_list";
var doiHash = new Array();

main();

function main() {
  var d = new Date();
  var curr_date = d.getDate();
  var DOI_list="";
  GM_log("START");
  var cb_stored_date= GM_getValue("crystaleye_data_date", 0);
  // Check for new DOIs only once per day
  get_DOI_list("http://wwmm.ch.cam.ac.uk/crystaleye/doi/doilist.txt", IDLIST);
  GM_setValue("crystaleye_data_date", curr_date);

  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('*');
  //For every node in the document
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (!thisTextarea.firstChild){continue;}
    //For every child of this node check for the presence of a DOI
    for (var k =0;k< thisTextarea.childNodes.length;k++ )
    {
      var reg = /(10\.[0-9]+\/[a-z0-9\.\-\+\/\(\)]+)/i;
      var text = thisTextarea.childNodes[k].nodeValue;
      var ar = reg.exec(text);
      var doi_found=RegExp.$1;
      if (ar && doi_found){
        //when a DOI is found, check if it is listed in crystalEye
        if (doiHash[doi_found]) {
            insert_links(doi_found, thisTextarea);
        }
      }
    }
  }
}

// finds doi list on myurl and builds hashed lists
function get_DOI_list(myurl, variablename){
  GM_xmlhttpRequest({
    method: 'GET',
    url: myurl,
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
      'Accept': 'application/xml,text/html',
    },
    onload: function(responseDetails) {
      var response_status=responseDetails.status;
      var response_text=null;
      if (response_status==200){
        response_text=responseDetails.responseText;
        GM_setValue(variablename, response_text);
      }
      else GM_log("Response not ok!");
    },
  });
  var zz = GM_getValue(variablename);
  // form is <doi>=<url>\n<doi>=<url>\n<doi>=<url>\n...
  var lines = zz.split("\n");
  //GM_log("total CrystalEye URLs: "+lines.length);
  for (line in lines) {
    var aa = lines[line].split("=");
    var doiBits = aa[0].split("\:");
    // some journals have DOI prefix - strip
    var doi = (doiBits[0] == "doi:") ? doiBits[1] : doiBits[0];
    var urlList = doiHash[doi];
    if (urlList == null) {
      urlList = new Array();
      doiHash[doi] = urlList;
    }
    var length = urlList.length;
    urlList[length] = aa[1];
  }
  var length = 0;
  for (doi in doiHash) {
    length++;
  }
  //GM_log("Unique DOIs in crystalEye: "+length);
}

function insert_links(doi, textarea) {
 //GM_log("DOI: "+doi);
  
  var div = document.createElement("div");
  div.setAttribute("style","text-align:center;width: 80px;height:100%;margin:0;margin-left:10px;padding:0;display:inline;");
  textarea.parentNode.insertBefore(div, textarea.nextSibling);
    
  var imgDiv = document.createElement("div");
  imgDiv.setAttribute("style","display:inline;");
  div.appendChild(imgDiv);
  img = document.createElement("img");
  imgDiv.appendChild(img);
  img.setAttribute("alt","CrystalEye logo");
  // the crystaleye image encoded so we don't have to download anything to display it
  img.setAttribute("src","data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%3C%00%00%00%23%08%06%00%00%00%C8%7Ci%3C%00%00%00%04sBIT%08%08%08%08%7C%08d%88%00%00%00%09pHYs%00%00%01%84%00%00%01%84%01%97%1E%7C%A6%00%00%00%19tEXtSoftware%00www.inkscape.org%9B%EE%3C%1A%00%00%0BgIDATh%81%BD%9A%7BT%D5%D7%95%C7%3F%FBw%9F%3CE%1E%E2%5B%7C%A2%D6%D7X%23%98%A0%A0%24%DA%A9ib%D62mt%C5%AA%A3%1D%DBq%8DYq%92%8Cc%E3H%B2TR%AB%19%3BH%97%D1%A9%895%ADK%13%5D%96%A4%18%10Q%93%D8%D4DMM%5D%C6WQ*%8A%F2%10%E1%02%97%CB%7D%EC%F9%E3%DEP%84%AB%F7%AA%B4%DF%B5%EE%3F%E7%B1%CF%F7%CB9g%9F%BD%F7%0FQU%FE%D1%10%91%E9%C0-U%3D%F1%8F%5E%DB%E8j%83%22b%17%91%A5%22%22%F7%186%17x%FC.%F33DdSW%F3%FA%06%5D.%18p%03%FF%09%CCx%C0%F9%DF%05Z%BA%8E%CE%9D%90%07%3D%D2%22%12%0FD%A9%EA%D5%20%7D%3F%052T%F5%9FE%C4%04%0C%15%C3%3C.%BA%C7%E0%E1%96%88%B8x%97%E3%E6%40%11%B3%D7l%8F%B9-%86%E9%82%E3%C6%B9%3Fx%5C%8D%E7U%B5RD%3E%07V%A8ji%07%9B%F9%40%81%AA%16%3D%10%E1%00%CC%0F1%F7E%60%12%1D%8E%A6%88%D8%01%07%22%8F%DAc%92.%1B%26k%3F%C3d!%B6%CF(%B1%C5%24%19%26%B3%8D%E8%A4%C1%18f%2B%22%26%9C%B7%2Bh%8D%ED%A1%DEZ'fk%84%CFl%8Fq%98-%11%CF%8A%88%038%A1%AA*%22c%80%EF%03%3F%7D%08%BE~~%0F%B1%C3Q%C0%D7%F8%8F%EF%3E%E0%05%60%3E%C8%08%11!u%C6%2B%BE%F8%94%89%A6%B8~c%89J%18%08%F7%BC%D2%A0%3E%0FM5Wh%B8%F15%95%A7%3F%A0%E2%D4%FB%1E%B7%B3%5E%10%F9R%7D%DEf%E0CU%FD%F9%03%91m%CF%3B%1C%C1%22bVUO%90%F6g%80%05%C0tD%AC1%C9%A9%AD%83%A7%FC%D8%3E0c%11f%5B%F4C%11%F3%F9%3C%5C*%CD%A3%EC%E8%16%8F%A3%EA%A2%09%B4%05x%15%F8%85%AAz%DBq%98%0D%0CR%D5%F5%E1%D8%0D)XDz%01%1F%03%DFQ%D5%BF%B4k%9F%0El%07z'%0D%9DR7y%D9G%F1%26k%C4%FD%2B%0B%03%1Eg%03%7F%D8%FA%FD%E6%9Bg%8B%ED%A07%81%E5%C0n%A0%3Fp%0AxNU%0F%86c%2B%DC%1D%5E%8B%FF%0E%3D%0A%F4%03%DE%00%A6%18f%ABs%CA%B2%8F4)uj%F7%07%D4r_%B8y%F6%A0%E7%D3%FC%EF%B5%FA%3C.7p%15%B0%00%7BU5%EC%BB%DDI%B0%88%88vh%0C%BC%A9%EF%03%7D%80%11%C0%9F%AD%91%DDS%BE%9B%7B%A5%A7%C5%1Ek%BA%1F%D2%1EW%13.G%15%11q%BD1%CC%B6%FB%99%0A%40K%C3M%8Ar%BE%E5hm%AA-%02%B2%F1%9F%BEE%AAZ%DB%81%B3%A1%AA%BE%8E%F3%8D%0E%83z%02%A7Ddp%87qY%C0d%E0O%C0%EB%86%D9%3A%F2%F1WO%25%87%2B%B6%EE%AF%A78%FD%DEr%3E%FA%EF%E1%14%E5%8C%A4%DF%F5%3C%86U%AE%E7%F7%FF5%80%8FV%8F%A0%EC%93m%04%E1%16%14%F6%D8d%B2%96%97%C6%18f%DB%93%C0O%00'pZD%A6%B6%D31%24%A0%A3%93%23%09%B6%C3%1B%80%D9%C0dU%BD*%22%2F%02%AB%81%25%C0%1F%119%3F%F5%E5O%DC%89%83%1F%0B%E9%95%7C%9EVN%FCz%11%95g%0Aim%BA%85%88%90%9F%9F%CF%EC%D9%B3%89%8F%8Fg%CD%9A5%E4%E4%E4%60%B6Ec%8DN%60%EC%EC%0D%F4%1D%3F%3B%2C%E1WO%EC%D6%2F%DEYP%EFu%B7%F4%02~%00%FC%2F%90%0Fl%01%0E%039%AA%BA%B3%E3%BCN%91%96%AA%BE%04%14%03%EF%89%C8o%81%7F%C3%1FD%EC%06%5E%E89rF%7D8b%9Bk%CB9%B8%E6%9F%A88%F5%3E%ADM%B70%0C%83m%DB%B6%91%9D%9DMzz%3A.%97%8B%25K%96%B0n%DD%3A%3C%AEF%9Ak%CB9%F1%EB%C5%9C%2F%0A%CB%D9%D2o%C2%0F%24%2695%DA%1A%D9%7D%A9%AA%EE%00%BE%8D%3F%268%0E%EC%08%26%16%C0%10%91%60%C1%C7z%20%16%88%01%26%A8%EA%19%11%89%15%C3%BCd%D4%AC%B5%3DB%91%F1y%DD%1C%DD%F48%0D%95g%F1%BA%5B0%99L%BC%F3%CE%3BL%9A4%89%CC%CCL%CA%CA%CA8p%E0%00%3Bv%EC%60%EE%DC%B9l%DC%B8%11%00%B7%B3%9EsE%EB%B9~%BA%20%2C%D1%23%BF%97c%06V%05%9E%CDK%C0c%C0%0E%60%B9%88Lk%3FVD%22D%A4%8F%01l%12%91%9F%B5%EB%18%06%1C%03%F6%00O%A9j%7D%A0kq%7C%CA%23%DE%EE%FD%C7%87%24r%BE%E8g%B4%D4%DF%00%C0l6%F3%EE%BB%EF2f%CC%18%B2%B2%B2%B8q%C3%DF%5EPP%40FF%06S%A6La%D6%ACY%E4%E5%E5!%22%B46%D5rb%E7b%1A%AB.%85%5C%A7%CF%D8%A7%B1w%EB%15%13%19%3F%60%3E%80%AA%BAUu%05%F0%23%60%BF%88%3C%1D%D0%14%03%1C%00%5E1%80%D7%81%E9%22%F2%96%88%A4%00%25%40%9E%AA%E6%B4%F7%D6%26K%C4%BC!YKcB%91hi%B8%C9%A5%C3%F9x%5C%8DX%2C%16v%EF%DE%CD%D0%A1C%996m%1A%D5%D5%D5m%E3%0A%0B%0B%998q%22N%A7%93%CC%CCLf%CC%98%C1%96-%5B%10%11%5C%8Ej%FEr%F4%97!%05%23B%EFqO%1B%D6%C8%B8%B9%ED%9BU%F5%3D%FC%F7z%A7%88%FC%18(%05%CA%81%E5%86%AAV%E1%F7%C2C%80%23%C0%1EU%5Ds%A7%5D1%7C%5E%F7%C8%EE)%13Br%B8~%BA%00Wc56%9B%8D%BD%7B%F7%D2%BBwo%B2%B3%B3%B9u%EB%D6%1D%E3jjj8~%FC83g%CE%A4%A2%A2%82%CC%CCL%26O%9E%CC%F6%ED%DB1%0C%83%EB_%7D%10Z0%900h%12%AE%C6%9AN%C7NU%0F%00O%E2%BF%9EU%C0%02U%F5~%E3%B4%0C%20%11(%098%AD%8E%18f%98%CC%12%D3cXH%02%0D%D7%CF%60%B3Z%D8%BF%7F%3F%DD%BAu%E3%89'%9E%A0%BE%BE%3E%E8%D8%82%82%02%9Ez%EA)%00*%2B%2B%C9%CA%CAb%C2%84%09%EC%DC%B9%13%F5%B4%D0T%7B%25%E4z%DD%FB%8F%C7Y%7F%3DND%829%E0%8F%81i%C0D%60%25%8090%F0C%E0%02%FE%A7'%18%E2%CC%F6X%0F%22%96P%04%1C7%2FPRR%C2%E0%C1%83y%FB%ED%B7%99%3F%7F%3E%D5%D5%D5w%FCjjj%F0z%BD%14%14%14%B0z%F5j%86%0F%1FN%8F%1E%3D%E8%D7%AF%1F%FB%F7%EFg%E9%D2%A5%BC%BE%AA%96%0F%AF%5D%25*!%E5%9E%EBY%EC%B1%E0%BFyv%A09%88%E8%13%22%92%09%1C%14%11%CC%40%24%D0%0Bx%A1%7DP%DE%09%EA%BBw%BA%13%40K%C3%0D._%BE%CC%A8Q%A3%180%60%00%A9%A9%A9%24%25%25%B5%FD%BAw%EF%8E%88PWW%87%DB%ED%26**%8A%93'OR%5E%5E%CE%B5k%D7p8%1CX%2C%16%9A%9A%5B%88%8C%EF%1Fr%BDv%F1%7BD0%C1%01%94%E1%CF%EC%22%CC%AA%DA%18(%A9%FC%5ED%26%AB%EA%85%20%13%3C%3E%AF%3B%2C%C1%3D%86g3%EF%87%3Fd%DD%DA%B5%3C%FF%FC%F3dggs%F1%E2%C5%BF%114%99HHH%2011%91%9E%3D%7BRXXH%DF%BE%7D%A9%AB%ABc%F4%E8%D1%94%94%94%B0a%C3%06%D6%FFb%1B3s_%0C%B9%5Ek%F3m%7F%EA%A9%EA%0C%D6%1F%F0%D0%BF%C3%9F%FB%AF7%00T%F5%9B(%A5DD%82%FDY%CF%BB%5B%1A%AC%AE%C6%9A%90%04%06%A4%CF%C3%16%9D%C8%CA%95%2B%D9%BE%7D%3BG%8F%1Ee%C4%88%11m%FD%5E%AF%97%AA%AA*%CE%9E%3D%CB%84%09%13(..%A6%AE%AE%8E%F1%E3%C7s%F8%F0a6m%DA%C4k%AF%BD%86%98%2C%88%11%BA%3E%E1%B8q%0E%7BL%B2SU%3B%EDn%A0*s%08%7F%F89CU%1B%DA.%BA%AA%BE%0E%EC%0D%88Nn%3FQU%1DfkdE%5D%F9%C9%90%04%E2%FA%8EmK%0Arrr%C8%CB%CB%E3%C8%91%23%8C%193%A6%D3%D89s%E6%B0k%D7.%D2%D2%D28t%E8%10%EB%D6%AD%2377%17%8B%3D%96o%3D%99%13r-%80%FA%8A%AF%B0F'%FC5%88%D8o%D2%DAK%C0%2C%0D%9C%80%8E%9Em9%F0)P%2C%22%89%ED%3B%BC%1EW%E9%8D3%85%EEpH%8C%9E%B5%0Ek%A4%3Fc%CC%CD%CDe%FD%FA%F5%94%96%962~%FC%DF%5E%8F%E1%C3%873l%D80%AA%AB%AB)..f%D5%AAU%BC%F9%E6%9B%00D%26%A6%90%F2%E8%82%B0%04_%3D%B9%07%5BT%C2%87%1D%C4%0E%0C%E8%F8%04x%5EU%DBx%DF!8%10h%FC%088%09%9C%14%91%B6%87W%BD%9E%B7%CA%3E%FD%3F%AF%D7%1D%BA%A08%20%7D%1E%83%A6%2C%F1%7BP%60%E3%C6%8D%E4%E4%E4PRRBZZ%1A%00%CF%3D%F7%1C%9F%7F%FE9%FB%F6%ED%E3%E5%97_f%F3%E6%CD%00%D8b%92H%5B%184%0C%EE%84%A6%DA%2B%D4%96%7D%E6%AB%BE%F8%F1%BAvb'%05%C4%EEV%D5%9FtL%11%83%BD%5D%5EU%FD%17%FC%0Fv%A9%88%2C%0E%B4%7F%E6%F3%B4%5E%BC%7C%ECWw%F3%84w%60%F43%B9%24%8F%9C%DE%B6%D3%9B7of%C5%8A%15%14%15%15%91%91%91%C1%E2%C5%8BIOOg%D9%B2el%DD%BA%15%C3d!%3Ai0Y%FFq%84n%7D%3B%1F%FF%608_%FCs%EC1%C9%87U%F5%96%88%18%22%F2*p%10X%AB%AA%2B%83%CD%B9g%C5CD%1E%C3%9F%F8%7F%00%FC%3B0%D5d%B1%EF%9D%99%5B%1Ei%8B%09%99C%00Pu%EE%10%A7~%BB%94%96%86%1B%B8%9D%F5%2CX%B0%80%FC%FC%7C%ECv%3B%0B%17.%E47%BB%F6%60%89%88%23~%E0D%D2%17%EF%C2d%8D%0C%CB%EE%ED%8A%D3%94%BE%91%EE%F1%BA%5B%86%02%5E%E0%5D%20%01%98%AB%AA_%DDUS%185%AD%DE%01%D1f%E0Y%60u%E2%90%C7%A6M%7D%E9%93%01%A1*%91%EDq%ED%CB%7DT%FE%B9%90%A6%9A2%FA%24X%89%8F%8B%E6l%85%8B%FE%8F%CC!y%E4tl%D1%89%A1%8D%04%E0q5r(7%CD%D9%5Cwu%A3%A7%C5q%1A%D8%0A%EC%02%5E%D2%BB%3COmz%C2%ACiY%81M%C0%7C%60%2B%22O%F6%7FdND%DA%A2%DF%F4%09%9Be%17%C1%E7u%F3%F1%A6%E9%AE%BA%2B_%FC%D1%D3%DAT%86%3F%5E%5E%A4%AAa%05%DF%F7U%97%0E8%B17%80o%8B%88%AF%F7%D8Y%B7%D3%FFu%F7%20%C3%142%E2%EC%12%B46%D5r%2C%7FV%D3%AD%2B%C7%1D%3E%AF%3B%0A(%02%96%A9je%B86%1E%A8%10%2F%22O%00%1B%81TKd%5C%D3%B4W%8Eu%8B%ED5%F2%EF%F1%9D%AA%0D%95g%0A%F9%EC%ADg%DD%DE%D6f%F0%07%13%2BU%F5%CB%FB%B5%F30_%1E%04%98%03%E4%81%C4%C5%F5%1F%D78%EE%D9%FF%89M%1A%96%F9%40%F6%EE%86KG6s%EE%40%AE%C7y%FB%BA%098%07%2CT%D5%E3%0Fj%EF%81%05%B7%19%F0%97%88%5E%01%96%01%C9%89C2%1A%86d-%8D%ED5z%26f%7B%C8zAg%A8r%AB%FC%0B%AE%9D%DA%C7%D5%93%7B%3C%CD%B5%E5%A2%E8iTW%3E%EC%874%E8%02%C1w%18%13I%05%9E1Y%23%E7y%DD%CE%11Q%09)%AD%F1%03%D3lq%FD%C6%D1%AD%CFh%AC%11q%18f%1B%86%C5%86%C9lCUi%AA%B9Lc%D5%05%1C7%2F%D2Xu%81%DBW%FF%E4s%B78%DC%F6%D8%E4%23%CE%BA%8A%7C%9F%D7%5D%AC%AA%AE.%E3%F8%F7%FA%0F%80%40h%3A%26*qP%96a2%3F%EAniHU%AF'FQ%9Bz%DD%86%CF%EB1D%0C%9F%BD%5BO%87%25%22%EE%BA%C9l%3B%E7%F5%B4%9Cl%A8%FC%FA%98%B7%B5%F9x%FBp%B0%2B%F1%FF%C1I%B6%DC%A5%25%B9%DE%00%00%00%00IEND%AEB%60%82");
  img.setAttribute("style","margin:0;margin-right:5px;padding:0;");
  
  var paraDiv = document.createElement("div");
  paraDiv.setAttribute("style","display:inline;");
  div.appendChild(paraDiv);
  var urlList = doiHash[doi];
  var para = document.createElement("span");
  paraDiv.appendChild(para);
  for (url in urlList) {
    newanchor = document.createElement("a");
    newanchor.setAttribute("href", urlList[url]);
    newanchor.setAttribute("target","_blank");
    var urlInt = url;
    urlInt++;
    text = document.createTextNode("["+urlInt+"]");
    newanchor.appendChild(text);
    para.appendChild(newanchor);
  }
}