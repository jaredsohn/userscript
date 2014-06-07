// ==UserScript==
// @name           RuneScape Forum Local Time
// @version        0.4
// @namespace      http://www.runescape.com
// @description    Changes RuneScape forum times to the local time zone. The new local times are enclosed in parementhesis for clear indication.
// @include        http://services.runescape.com/m=forum/*
// ==/UserScript==

function formatDate (formatString, formatDate) {
  // the original version of this formatDate function came from http://snippets.dzone.com/posts/show/5925
  // heavily tweaked by Ryu_Zwei
  
  if (!(formatDate instanceof Date)) formatDate = new Date();

  var months = [
    "Jan","Feb","Mar",
    "Apr","May","Jun",
    "Jul","Aug","Sep",
    "Oct","Nov","Dec"];

  var yyyy = formatDate.getFullYear();
  var yy = yyyy % 100;
  
  var m = formatDate.getMonth();
  var mm = m < 10 ? "0" + m : m;
  var mmm = months[m];

  var d = formatDate.getDate();
  var dd = d < 10 ? "0" + d : d;

  var h = formatDate.getHours();
  var hh = h < 10 ? "0" + h : h;
  
  var n = formatDate.getMinutes();
  var nn = n < 10 ? "0" + n : n;
  
  var s = formatDate.getSeconds();
  var ss = s < 10 ? "0" + s : s;

  // the original function had a bug whereas the month may be Sep, and s would later be replaced by the seconds
  // or the m in Mar would become the minutes. fixed simply by enclosing replacement parameters with []
  return formatString.
    replace("[yyyy]", yyyy).
    replace("[yy]", yy).
    replace("[mmm]", mmm).
    replace("[mm]", mm).
    replace("[m]", m).
    replace("[dd]", dd).
    replace("[d]", d).
    replace("[hh]", hh).
    replace("[h]", h).
    replace("[nn]", nn).
    replace("[n]", n).
    replace("[ss]", ss).
    replace("[s]", s);
};

// used to create an array from an iterable object
Array.prototype.pushEach = function(pArray){
  for (var i=0,l=pArray.length; i<l; i++){
    Array.prototype.push.call(this, pArray[i]);
  }
  return this;
}

// filter an array based on the result of a function
Array.prototype.filter = function(testFunc) {
  var x = [];
  for (var i=0,l=this.length; i<l; i++){
    if (testFunc.call(this, this[i])) {
      x.push(this[i]);
    }
  }
  return x;
}

// for the given array of elements, attempt to localize all times
function fixTimeElements(className, filterFunction){
  // get DOMElements with a matching class
  var elements = document.getElementsByClassName(className);
  
  // if there is a filter function, apply it
  if (filterFunction != undefined) {
    elements = new Array().pushEach(elements).filter(filterFunction);
  }

  // process each element
  for (var i=0, l = elements.length; i<l; i++) {
    var element = elements[i];
    var parts = element.innerHTML.split('\n<br>');
    
    // save the original datetime so we can swap it out
    var origDateString = parts[0].replace("\n",'');
    
    //do the replacement
    localizeDateTime(element, origDateString);

    // post times may have a last-updated date that needs to be fixed as well
    if (className == 'msgtime') {
      if (parts[1] != undefined) {
        // get down to just the datetime string
        var editString = parts[1].replace('Last edited on ','').replace("\n",'')
	
	// take everything before "by USERNAME"
        editString = editString.split(" by")[0];

        //do the replacement
        localizeDateTime(element, editString);
      }
    }
  }
}

function localizeDateTime(element, originalDateTimeString){
  // take out the hyphens and the Date class can parse it
  var tempDate = new Date(originalDateTimeString.replace(/-/g,' '));
  
  // do a little timezone translation
  var newDateString = formatDate("([dd]-[mmm]-[yyyy]&nbsp;[hh]:[nn]:[ss])",
    new Date(tempDate.setMinutes(tempDate.getMinutes() - new Date().getTimezoneOffset()))
  );
  
  //swamp out the string for the new one
  element.innerHTML = element.innerHTML.replace(originalDateTimeString, newDateString);
}



// times on posts in threads
fixTimeElements('msgtime');
// "last updated" time in thread list
fixTimeElements('updated');
// last post times on forum groups
fixTimeElements('t',
  function(o){
    if (o.parentNode == undefined) return false;
    var parentClass = o.parentNode.className;
    return parentClass.indexOf('r') != -1 && parentClass.indexOf('u') != -1;
  }
);