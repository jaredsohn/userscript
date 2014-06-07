// ==UserScript==
// @name           Yet Another What.CD Bufferscript (Profile Only Mod)
// @namespace      what.cd
// @description    Buffer stuffer
// @include        http://*what.cd/user.php*
// @include        https://ssl.what.cd/user.php*
// ==/UserScript==

// Encapsulate the code in an anonymous function 
// so that we don't conflict with global scope
(function () { 
  var exps  = {k: 10, m: 20, g: 30, t: 40},
      pres  = {"0": "", "10": "k", "20": "M", "30": "G", "40": "T"};
  
  // Outputs the number of bytes a string such as
  // "100.2 GB" represents
  function toBytes(s) {
    s = /[0-9\.]+ .?B/.exec(s)[0]; // Strip out any extra information
    
    if (!/[ptgmk]/.test(s.toLowerCase())) {
      return +s.substr(0, s.length - 2);
    } else {
      var exp = exps[s.substr(-2, 1).toLowerCase()],
          bytes = +s.substr(0, s.length - 3) * Math.pow(2, exp);

      return bytes;
    }
  }
  
  // Formats bytes to a string such as "100.2 GB"
  function format(bytes) {
    var exp = 10 * Math.floor(Math.log(bytes) * Math.LOG2E / 10),
        pre = pres[exp];

    return Math.round(100 * bytes / Math.pow(2, exp)) / 100 + " " + pre + "B";
  }
  
  function doProfileBuffer() {    
    var ul, li, lis, up, down, ratio;
    
    ul    = document.getElementsByClassName("stats nobullet")[0];
    li    = document.createElement("li");
    lis   = ul.getElementsByTagName("li");
    
    if (lis.length < 3) { return; } // Too high paranoia level
    
    up    = toBytes(lis[2].innerHTML.substr(10));
    down  = toBytes(lis[3].innerHTML.substr(12));
    ratio = +lis[4].getElementsByTagName("span")[0].innerHTML;
        
    if (ratio < 1) {
      li.innerHTML = "Debt: " + format(down - up);
    } else {
      li.innerHTML = "Buffer: " + format(up - down);
    }
    
    ul.appendChild(li);
  }
  
  // Check if we're on profile page
  if (document.location.pathname == "/user.php") { 
    doProfileBuffer();
  }
}());