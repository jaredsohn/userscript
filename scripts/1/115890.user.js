// ==UserScript==
// @name           Wegwerkenfilter
// @namespace      vries.de.jasper
// @description    Toon alleen werken aan de opgegeven wegen
// @include        http://www.touringmobilis.be/nl/trafficworks.html
// ==/UserScript==

function doFilter(filter){
  var ps = document.querySelectorAll("#mainContent .content2nd dd p.title");
  fs = filter.split(/,\s*/);
  for (var i = 0, p; p = ps[i]; i++){
    p.parentNode.previousElementSibling.className = "wwfHide";
    for (var j = 0, f; f = fs[j]; j++){
      if (p.innerHTML.indexOf(f) > -1) {
        p.parentNode.previousElementSibling.className = "wwfShow";
        break;
      }
    }
  }
}

var content = document.querySelector("#mainContent .content2nd");
if (content) {
  var form = document.createElement("form");
  
  var input = document.createElement("input");
  input.value = GM_getValue("wegwerkenfilterDefault", "E19, E17, R1, E34, E313");
  input.size = 60;
  form.appendChild(input);
  
  var button = document.createElement("button");
  button.type = "button";
  button.appendChild(document.createTextNode("filter"));
  button.addEventListener("click", function(){
    GM_setValue("wegwerkenfilterDefault", input.value);
    doFilter(input.value);
  }, false);  
  form.appendChild(button);
  
  content.insertBefore(form, content.firstChildElement);
  
  GM_addStyle("dt.wwfHide, dt.wwfHide + dd { display: none; }");
}
else {
  alert("Wegwerkenfilter kon de content-div niet vinden");
}
