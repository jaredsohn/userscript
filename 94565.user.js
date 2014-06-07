// ==UserScript==
// @name           IMDb Updates
// @namespace      http://localhost/
// @include        http://*.imdb.com/updates
// @include        http://imdb.com/updates
// ==/UserScript==



// If the primary button says "Continue", this is a new updates page
// Put a "Correct All" link on the top of the Cast and Crew section
b = document.getElementsByClassName("primary")[0];
if (b.value.substr(0,8) == "Continue") {
  h = document.getElementsByTagName("h2")[0];
  if (h.innerHTML == "Cast and Crew ") {
    a = document.createElement("a");
    a.innerHTML = "Correct All";
    a.setAttribute("href", "javascript:f=document.f;for(i=0;i<29;i++){f.getElementsByTagName('select')[i].selectedIndex=1;};void(0);");
    h.parentNode.appendChild(a);
  }
}



// Automatically tick all cast order warning messages
input = document.getElementsByTagName("input");
for (x = 0; x < input.length; x ++) {
  if (input[x].type == "checkbox") {
    if (input[x].name.indexOf("error.cast_order_123.ignore") >= 0) {
      input[x].checked = true;
    } else if (input[x].name.indexOf("error.cast_order_existing_unordered") >= 0) {
      input[x].checked = true;
    }
  }
}



// Loop through SELECT elements ending in ".choose" or ".choose_more"
numberList = ["1","2","3","4","5","10","15","20","25","30","35","40","45","50","60","70","80","90","100","120","140","160","180","200","220","240","260","280","300"];
select = document.getElementsByTagName("select");
for (x = 0; x < select.length; x ++) {
  if ((select[x].name.substr(-7).toLowerCase() == ".choose") || (select[x].name.substr(-12).toLowerCase() == ".choose_more")) {

    // Find last numeric option
    option = select[x].childNodes;
    for (y = option.length - 1; y >= 0; y --) {
      if (option[y].tagName) {
        if (option[y].tagName.toLowerCase() == "option") {
          if (!(isNaN(parseFloat(option[y].value)))) {

            // If the option is selected, find it in the master list
            if (option[y].selected) {
              for (z = 0; z < numberList.length - 1; z ++) {
                if (option[y].value == numberList[z]) {

                  // Create a new option
                  newOption = document.createElement("option");
                  newOption.setAttribute("value", numberList[z + 1]);
                  newOption.innerHTML = option[y].innerHTML.replace(numberList[z], numberList[z + 1]);
                  select[x].insertBefore(newOption, option[y].nextSibling);
                }
              }
            }

            // Quit loop
            y = -1;

          }
        }
      }
    }
  }
}
