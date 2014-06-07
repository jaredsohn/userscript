// -----------------------------------------------------------------
//
// drei.to - Hoster Filter
// V. 0.05
// Date: 2010-06-22
//
// -----------------------------------------------------------------
//
// This script filters results of a search by it's file hosters.
//
// -----------------------------------------------------------------
// ==UserScript==
// @name           drei.to - Hoster-Filter
// @description    filters search results by file hosters
// @namespace      drei.to - Hoster-Filter
// @include        http://drei.to/?action=search&*
// @include        http://*.drei.to/?action=search&*
// ==/UserScript==


Array.prototype.______array='______array';var JSON={org:'http://www.JSON.org',copyright:'(c)2005 JSON.org',license:'http://www.crockford.com/JSON/license.html',stringify:function(arg){var c,i,l,s='',v;switch(typeof arg){case'object':if(arg){if(arg.______array=='______array'){for(i=0;i<arg.length;++i){v=this.stringify(arg[i]);if(s){s+=','}s+=v}return'['+s+']'}else if(typeof arg.toString!='undefined'){for(i in arg){v=arg[i];if(typeof v!='undefined'&&typeof v!='function'){v=this.stringify(v);if(s){s+=','}s+=this.stringify(i)+':'+v}}return'{'+s+'}'}}return'null';case'number':return isFinite(arg)?String(arg):'null';case'string':l=arg.length;s='"';for(i=0;i<l;i+=1){c=arg.charAt(i);if(c>=' '){if(c=='\\'||c=='"'){s+='\\'}s+=c}else{switch(c){case'\b':s+='\\b';break;case'\f':s+='\\f';break;case'\n':s+='\\n';break;case'\r':s+='\\r';break;case'\t':s+='\\t';break;default:c=c.charCodeAt();s+='\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16)}}}return s+'"';case'boolean':return String(arg);default:return'null'}},parse:function(text){var at=0;var ch=' ';function error(m){throw{name:'JSONError',message:m,at:at-1,text:text}}function next(){ch=text.charAt(at);at+=1;return ch}function white(){while(ch!==''&&ch<=' '){next()}}function str(){var i,s='',t,u;if(ch=='"'){outer:while(next()){if(ch=='"'){next();return s}else if(ch=='\\'){switch(next()){case'b':s+='\b';break;case'f':s+='\f';break;case'n':s+='\n';break;case'r':s+='\r';break;case't':s+='\t';break;case'u':u=0;for(i=0;i<4;i+=1){t=parseInt(next(),16);if(!isFinite(t)){break outer}u=u*16+t}s+=String.fromCharCode(u);break;default:s+=ch}}else{s+=ch}}}error("Bad string")}function arr(){var a=[];if(ch=='['){next();white();if(ch==']'){next();return a}while(ch){a.push(val());white();if(ch==']'){next();return a}else if(ch!=','){break}next();white()}}error("Bad array")}function obj(){var k,o={};if(ch=='{'){next();white();if(ch=='}'){next();return o}while(ch){k=str();white();if(ch!=':'){break}next();o[k]=val();white();if(ch=='}'){next();return o}else if(ch!=','){break}next();white()}}error("Bad object")}function num(){var n='',v;if(ch=='-'){n='-';next()}while(ch>='0'&&ch<='9'){n+=ch;next()}if(ch=='.'){n+='.';while(next()&&ch>='0'&&ch<='9'){n+=ch}}if(ch=='e'||ch=='E'){n+='e';next();if(ch=='-'||ch=='+'){n+=ch;next()}while(ch>='0'&&ch<='9'){n+=ch;next()}}v=+n;if(!isFinite(v)){error("Bad number")}else{return v}}function word(){switch(ch){case't':if(next()=='r'&&next()=='u'&&next()=='e'){next();return true}break;case'f':if(next()=='a'&&next()=='l'&&next()=='s'&&next()=='e'){next();return false}break;case'n':if(next()=='u'&&next()=='l'&&next()=='l'){next();return null}break}error("Syntax error")}function val(){white();switch(ch){case'{':return obj();case'[':return arr();case'"':return str();case'-':return num();default:return ch>='0'&&ch<='9'?num():word()}}return val()}};Number.prototype.toMoney=function(){if(arguments.length==2){var thD=arguments[0],flD=arguments[1]}else{var thD='.',flD=','}var reply='',tmpNum;tmpNum=Math.round(this*100)/100;reply=tmpNum.toFixed(2).toString();fullNum=reply.substring(0,reply.indexOf('.'));flNum=reply.substring(reply.indexOf('.')+1,reply.length);reply='';while(fullNum.length>3){reply=thD+fullNum.substring(fullNum.length-3,fullNum.length)+reply;fullNum=fullNum.substring(0,fullNum.length-3)}reply=fullNum+reply+flD+flNum;return reply};

Array.prototype.inArray = function(needle) {
  for(var i = 0; i < this.length; i++) {
    if(this[i] === needle) return true;
  }
  return false;
}

Array.prototype.oneMatches = function(cmpArray) {
  for(var i = 0; i < cmpArray.length; i++) {
    if(this.inArray(cmpArray[i])) return true;
  }
  return false;
}

String.prototype.trim = function() {
  return this.replace (/^\s+/, '').replace (/\s+$/, '');
}

function g(elem) {
  return document.getElementById(elem);
}

function gt(elem, base) {
  base = base || document;
  return base.getElementsByTagName(elem);
}

function gn(elem) {
  return document.getElementsByName(elem);
}

/************************************************************
***                                                       ***
*** drei.to specific functions are summed up within the   ***
*** major function "SearchModify"                         ***
***                                                       ***
************************************************************/


function SearchModify() {

  // entry class
  function entry(elem, hosters) {
    this.elem = elem;
    this.hosters = hosters;
    
  }
  
  // private variables including debug
  var allEntries;
  var allHosters;
  var debug = false;
  
  // called by filter form submit
  function filterFormSubmit(event) {
    // prevent form from being submitted
    event.stopPropagation();
    event.preventDefault();
    filterEntries();
    return false;
  }

  // actually filters entries, called by init and filterFormSubmit
  function filterEntries() {
    _log("filterEntries");
    try {
      var allowHosters = new Array();
      var blockHosters = new Array();
    
      var filterForm = g("filterForm");
      for(var i = 0; i < filterForm.elements.length; i++) {
        if(filterForm.elements[i].name == "hoster") {
          if(filterForm.elements[i].checked) {
            allowHosters.push(filterForm.elements[i].value);
          } else {
            blockHosters.push(filterForm.elements[i].value);
          }
        }
      }
     _log("filterEntries - allowHosters: " + allowHosters);
     _log("filterEntries - blockHosters: " + blockHosters);
     
     // the filtering
     allEntries.forEach(function(curEntry) {
       if(curEntry.hosters.oneMatches(allowHosters))
       {
         _log("filterEntries - filter - show: " + curEntry.hosters.toString() + " <-> " + allowHosters.toString());
         curEntry.elem.style.display = "block";
       }
       else
       {
         _log("filterEntries - filter - hide: " + curEntry.hosters.toString() + " <-> " + allowHosters.toString());
         curEntry.elem.style.display = "none";
       }
     });
     var oldHosters = JSON.parse(GM_getValue("filteredHosters", "[]"));
     var newHosters = new Array();
     for(var i = 0; i < oldHosters.length; i++) {
       if(!blockHosters.inArray(oldHosters[i])) newHosters.push(oldHosters[i]);
     }
     delete oldHosters;
     allowHosters.forEach(function(actHoster) {
       if(!newHosters.inArray(actHoster)) newHosters.push(actHoster);
     });
     GM_setValue("filteredHosters", JSON.stringify(newHosters));
  } finally {
  }
    _log("filterEntries done");
  }
  
  function getSplitter(hosters) {
    // helper function to find the used delimiter between hosters
    splitters = new Array(" &amp; ", " &amp;amp; ", "&amp;amp;", " & ", "&amp;", " @ ", " @", "@", "#", " / ", " /", "/", " | ", " |", "|", " + ", "+", "; ", ";", ", ", ",", " und ", " ");
    var i;
    for(i = 0; i < splitters.length; i++) {
      if(hosters.indexOf(splitters[i]) > -1) return splitters[i];
    }
    
    // none found
    return "";
  }

  function addFilterBox() {
    // adds the filter box to the page
    
    // get all tooltips
    _log("addFilterBox");
    tooltips = document.evaluate("//div[contains(@id,'tooltip_entry_')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    _log("addFilterBox - found " + tooltips.snapshotLength + " tooltips");
    var i, n;
    var splitter;
    var actTooltip;
    var tbody, trows, hoster, hosters;
    for(i = 0; i < tooltips.snapshotLength; i++) {
      actTooltip = tooltips.snapshotItem(i);
      try {
        tbody = actTooltip.getElementsByTagName('tbody')[0];
        trows = tbody.getElementsByTagName('tr');
        hoster = "";
        for(n = 0; n < trows.length; n++) {
          if(trows[n].getElementsByTagName('th')[0].innerHTML == "@") {
            hoster = trows[n].getElementsByTagName('td')[0].innerHTML;
            break;
          }
        }
        if(hoster.length == 0)
          continue;
        
        splitter = getSplitter(hoster);
        
        if(splitter.length == 0) {
          hosters = new Array(hoster);
        } else {
          hosters = hoster.split(splitter);
        }
        
        var tmphosters = hosters;
        hosters = new Array();
        for(n = 0; n < tmphosters.length; n++) {
          tmphosters[n] = tmphosters[n].trim().toLowerCase();
          if(tmphosters[n].length > 0)
            hosters.push(tmphosters[n]);
        }
        delete tmphosters;
        
        _log("addFilterBox - Hosters: " + hosters);
        
        // each entry gets will be linked in that array to be hidable afterwards
        allEntries.push(new entry(tooltips.snapshotItem(i).parentNode.parentNode, hosters));
        
        hosters.forEach(function(actHoster) {
          if(!allHosters.inArray(actHoster)) allHosters.push(actHoster);
        });
      } finally {
      }
    }
    
    // reuse of firstload.de ad box
    filteredHosters = JSON.parse(GM_getValue("filteredHosters", "[]"));
    if(filteredHosters.length == 0)
      filteredHosters = allHosters;
    
    try {
      var filterbox = document.evaluate("//div[@class='box']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
      var newCont = "";
      newCont += "Found hosters:<br/><form id=\"filterForm\" name=\"filterForm\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
      allHosters.forEach(function(actHoster) {
        newCont += "<tr><td><input type=\"checkbox\" name=\"hoster\" value=\"" + actHoster + "\"";
        if(filteredHosters.inArray(actHoster))
          newCont += " checked=\"checked\"";
        newCont += "> " + actHoster + "</td></tr>\n";
      });
      newCont += "</table><input type=\"submit\" value=\"Filter einstellen\"></form>";
      filterbox.innerHTML = "<div align=\"center\">" + newCont + "</div>";
      
      var filterForm = document.getElementById("filterForm");
      filterForm.addEventListener('submit', filterFormSubmit, true);
    } finally {
    }
    
    _log("addFilterBox done");
  }
  
  function _log(toAdd) {
    if(debug) GM_log(toAdd);
  }

  function init() {
    // Load settings
    _log("Init");
    allEntries = new Array();
    allHosters = new Array();
    addFilterBox();
    filterEntries();
    _log("Init done");
  }
  
  init();

}

// window.addEventListener('load', SearchModify, true);
SearchModify();