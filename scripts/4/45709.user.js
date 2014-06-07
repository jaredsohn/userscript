// ==UserScript==
// @name           Finn.no Easy Access Search
// @namespace      dabear
// @description    Tilby en søkemulighet blant de aller fleste av finn sine produkter. Scriptet legger til et menyitem "Javascript produktsøk" som bringer opp søkeboksen. Du kan også trykke tastene a,s,d samtidig for å bringe opp det samme søkevinduet.
// @include        http://www.finn.no/*
// @match          http://www.finn.no/*
// @version        0.6.0.1
// ==/UserScript==

//
//
// Changelog
// 0.6.0.1:
// -Search saving fix for browser not natively supporting GM_(set|get)Value
//
// 0.6:
// -Some speed improvements.
// -Code cleanup.
// -Some more comments in the source.
// -Make logging optional.
// -Google Chrome User Scipts support. See http://lifehacker.com/5180010/enable-user-scripts-in-google-chrome .
//  Create a file inside the "User Scripts" directory called easy-access-search.user.js and paste the contents of
//  this script inside it. Make sure you save the file with UTF-8 encoding.
// -Opera User Scripts support. Paste this into a file you place in a folder called "User Scripts",
//  go to www.finn.no frontpage (important, must be frontpage!) in opera.
//  Right click, choose properties and the tab scripting,
//  where you will find a textbox to insert the folder where you saved the user script to.
//
// 0.5.5.1:
// -Restored functional prepackages and lastminute section.
// -Visually indicate hoverstate over x-button in search dialog.
// -Restored an option in education section.
// -Fix multipleKeyDowns internal function, will now work correctly with other keys, if configured to do so.
// -Changelog included in source.
//
// 0.5.0.1:
// -Strings updated.
// -Some functionality marked as buggy.
//
// 0.5:
// -Forgot to add version number.
//
// First Version 2009-04-03 00:12:13:
// -initial upload
//
//
(function(){
  
var shouldLog = true;


var log;
//logs to the respective browsers error console if shoudlLog == true
if (shouldLog) {
  if (typeof console != "undefined") {
    log =function(note) {
        console.log(note);
    };
  } else if (window.opera && window.opera.postError) {
    log = function(note) {
      window.opera.postError(note);
    };
  } else {
    log = function(note){
      alert("No logging functionality available, using default `alert'-function! \n" + note);
    };
  }
  
} else {
  log = function(){};
}


//for opera and chrome
//https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Global_Objects:Array:forEach
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fun ) {
    var len = this.length >>> 0;
    if (typeof fun != "function") {
      throw new TypeError();
    }

    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
      if (i in this) {
        fun.call(thisp, this[i], i, this);
      }
    }
  };
}

// thanks to http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "; expires=" + date.toGMTString();
  } else {
    var expires = "";
  }

  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    
    for (var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1,c.length);
      }
      if (c.indexOf(nameEQ) == 0) {
        return c.substring(nameEQ.length,c.length);
      }
    }
    
    return null;
}

function eraseCookie(name) {
  createCookie(name,"",-1);
}

if (typeof GM_setValue == "undefined") {
  function GM_setValue(key, val) {
    createCookie("___gm_cookie_" + key, encodeURIComponent(val), 365*20);
  }
}

if (typeof GM_getValue == "undefined") {
  function GM_getValue(key) {
    return decodeURIComponent(readCookie("___gm_cookie_" + key) || "");
  }
}


if (!Object.prototype.toSource) {
  Object.prototype.toSource = Object.prototype.toString;
}


/**
 * CategoriesMaintainer
 * @param productsHash    Takes a hash of names of products which again contains a hash of level, the producthash (and an optional catName)
 * @param selectItem      This is the subcategory select item. This item should not be altered in any way after invokation of this constructor
 * @param mainSelectItem  The select item containing the main categories of products
 */
function CategoriesMaintainer(productsHash, selectItem, mainSelectItem, keywordField){

  this.categories = {};
  this.productsHash = productsHash;
  this.selectItem = selectItem;
  this.mainSelectItem = mainSelectItem;
  this.keywordField = keywordField;
  cachedParams  = [];
  
  var self = this;
  
  addChangeListener(selectItem, onSelectChange);
  addChangeListener(mainSelectItem, onMainSelectChange);
  
  function destroyCachedParams() {
    cachedParams.forEach(function(el){
      try {
        log("removing element " + el.name + " with val: " + el.value);
        el.parentNode.removeChild(el);
        
      } catch(err){
        log("Not removing element. error: " + err);
      }
    });
    cachedParams = [];
  }
  
  function buildCachedParams(url, where) {
    
    log("building params");
    var params = getParams(url);
    log("params built from url " + url + ", are: " + params.toSource());
    var i=0;
    for ( var k in params) {
      if (!params.hasOwnProperty(k)) {
        continue;
      }
      
      i++;
      var v = params[k];
      var el = document.createElement("input");
      el.className="___gm_extra_parameter";
      el.type = "hidden";
      el.name = k;
      el.value = v;
      
      log("\tparam " + k + " with val: " + v + " built")
      
      cachedParams.push(el);
      (where || document.body).appendChild(el);
    }
    log(i +" extra params built");

    
  }
  
   
  //sub category is changed
  function onSelectChange() {
    //this points to html element, not categoriesmaintainer constructor
    var selectedOption = this.options[this.selectedIndex];
    var method = selectedOption.getAttribute("method") || "nomethod!!";
    
    this.form.method = method;
    this.form.action = this.value;
    
    
    // for some reason, finn isn't always using "keyword" as the input name that contains the search
    // also needs to be updated for external urls.
    var keyword = selectedOption.getAttribute("keyword");
    self.keywordField.name = keyword || "keyword";
    
    //restore previous session state
    var selectedMainIndex = self.mainSelectItem.selectedIndex;
    var subindex = this.selectedIndex;
    destroyCachedParams();
    
    if (method == "get") {
      // When using get, parameters added in the url of the form action, are ignored
      // Add those extra parameters from the url, into the form as hidden inputs
      buildCachedParams(this.value, this.form);
    }
    log(selectedMainIndex + "_SubCategoryIndex set to: " + subindex);
    GM_setValue(selectedMainIndex + "_SubCategoryIndex", subindex);
    
  }
  
  function addChangeListener(item, fn) {
    
    item.addEventListener("change", fn, false);
    //fx doesn't trigger onchange when keyboard is used
    item.addEventListener("keyup", fn, false);
    
  }
  
  function onMainSelectChange() {
    //this points to html element, not categoriesmaintainer constructor
    log("changing subselection to:: " + this.value);
    self.changeCategory(this.value);
    
    //change subcategoryindex to last selected value
    var subCategoryLastSelectedIndex = GM_getValue(this.selectedIndex + "_SubCategoryIndex", 0);
    self.selectItem.selectedIndex = subCategoryLastSelectedIndex;
    onSelectChange.call(self.selectItem);
    
    log("mainCategoryLastSelectedIndex set to " + this.selectedIndex + "(" + this.value + ")" );
    GM_setValue("mainCategoryLastSelectedIndex", this.selectedIndex);
  }
  //this is the first initialization, make sure form has something in each field
  this.initialize = function() {
  
      
    
    if (!selectItem.form.action.length || !selectItem.form.action.method) {
      //onchange.call(selectItem);
      //what main index was last selected? (from previous page view or session), default to first.
      var mainSelectLastIndex = GM_getValue("mainCategoryLastSelectedIndex", 0);
      this.mainSelectItem.selectedIndex = mainSelectLastIndex;
      log("mainSelectItemLastSelected has been set to " + mainSelectLastIndex + "(" + ")" );
      onMainSelectChange.call(this.mainSelectItem);
    }
  };
  this.createCategory = function(categoryName) {
    log("trying to create subcategory from name `" + categoryName + "'");
    var boats = this.productsHash[categoryName].productHash;
    log("this.productsHash[categoryName].productHash is" + this.productsHash[categoryName].productHash.toSource().substr(0,30)+"..");
    if (!boats) {
      throw new Error("category " + categoryName + " not found in productshash");
    }
    var clone = this.selectItem.cloneNode(false);
    addChangeListener(clone, onSelectChange);
    
    var propCount = 0;
    for (var name in boats) {
      if (!boats.hasOwnProperty(name)) {
        continue;
      }
      propCount++;
      
      var productCategory = boats[name];
      var categoryLabel =  productCategory.desc || name;
      
      var optGroup = document.createElement("optgroup");
      optGroup.label = categoryLabel;
      /*
       productCategory[sub] = desc | forSale:
       
       desc: "Brukte båter",
       forSale:{
        keyword:"test",
        desc: "Brukte båter til salgs",
        url: "/finn/boat/used/result",
        method:"get"
       }
    },
      
      */
      var keyword = productCategory.keyword || "";
      for (var sub in productCategory) {
        
        if (!productCategory.hasOwnProperty(sub) || typeof productCategory[sub] == "string") {
          continue;
        }
    //    productCategory[sub].url | method
        var option = document.createElement("option");
        option.value = productCategory[sub].url;
        option.textContent = productCategory[sub].desc || sub;
        option.setAttribute("method", productCategory[sub].method || "eyhh!");
        
        var realKeyword = productCategory[sub].keyword || keyword;
        if (realKeyword ) {
          option.setAttribute("keyword", realKeyword );
        }
        
        //option.addEventListener("change", function(){ alert("changed")}, true);
        optGroup.appendChild(option);
        
        
      }
      
      clone.appendChild(optGroup);
  
  
    }//endfor
    
    this.replaceSelect(clone);
    this.categories[categoryName] = { selectItem: clone};
    log("creating this.categories[" + categoryName +"] with a selectitem");
    //if no properties have been added, the result will be an empty select in the document. this is considered failure
    return propCount > 0;
  };//endfunc
  
  this.replaceSelect = function(newElm) {
    this.selectItem.parentNode.replaceChild( newElm, this.selectItem);
    this.selectItem = newElm;
  };
  
  this.changeCategory = function(categoryName){
    //log("t")
    //lookup name in this.categories
    var cat = this.categories[categoryName];
    if (cat && (this.selectItem == cat.selectItem)  ) {
      log("Doing nothing! category was same as is in the document!");
      return false;
    } else {
      try {
        //log("trying to use cached selectItem? selectItem is: " + cat.selectItem); 
        if (cat && cat.selectItem) {
          log("using cached selectItem!");
          this.replaceSelect(cat.selectItem);
          
        } else if (!this.createCategory(categoryName)) {
          log("creating the category " + categoryName + " might have failed. No items seems to have been added to the select item");
          return false;
        }
        return true;
      } catch(e) {
        log("could not create create category, no template available? Error: " + e);
        return false;
      }

      }
  };

  
  this.initialize();
}

//end CategoriesMaintainer constructor

function getParams(url) {
  var params = {};
  var qm = url.indexOf("?");
  if (url && qm == -1) {
     return params;
  }
  url = url.substr(qm);

  //thanks to http://www.bennadel.com/blog/695-Ask-Ben-Getting-Query-String-Values-In-JavaScript.htm
  url.replace(new RegExp( "([^?=&]+)(=([^&]*))?", "g" ), function( $0, $1, $2, $3 ) {
    params[ $1 ] = $3;
  });
  return params;
}




function createSearchBox() {
  
  var xImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9gFERYGGE9ha3oAAAFfSURBVBjTBcHLahNhGIDh9/sPM+OkmKRNJFKiVnugMVBqKW7UlYVegAtvwZW34j14D90JupDairS4kOIBjMRQtYVkKkb/mfyfzyMr4E8xnRJ9rGhPoQmCoIUgny3y/CpxKKlzXVNVT3KkW4PXXvRIRGIZ6U/hwW+hKI17ZusxPl1G7u8I35cs4VEipo52d6ykXaUWVDemqk3XQO5uG6ltpbF3LGwdKOO/jvxeqj9bgXn+Sf4nsm36RlfXvUrnEtVuxuCwZGXd86vlmHZyytsJ9Ay3TEso6okWc5bhi0B+x/PuY4ksGIYNw7e618k8euEmlpczww2v/Nj0jB5e5svelHYmBKeEmdC4sHywbYdpKtevCUU/Y+A949WMM5RYVNSOSubez9iz594VMcbxRFgcQXoKcRBJjgMLbyuy/ZJXb7AH4lPTdBqTNZGljtWbVxLaBjgLcj5S+Xqi8VNQE/4DwQmN67EZdgMAAAAASUVORK5CYII=";
  
  var formContainer = document.createElement("div");
  // no rounded corners for opera :)
  formContainer.style.cssText = "display:none;width:600px;z-index:10050;background: #FFFFFF;border: 4px solid #CCCCCC;text-align: center;margin: 5px;padding: 10px;-moz-border-radius: 15px;-webkit-border-radius: 15px; position:fixed; left:50%; top:50%;margin-left:-300px;margin-top:-38px";
  formContainer.id = "___gm_searchbox";
  
  var form = document.createElement("form");
  form.addEventListener("submit", function() {
    GM_setValue("lastSearch", search.value);  
  }, false);
  
  var closeButton = document.createElement("img");
  closeButton.style.cssText = "text-align: right;position: relative; left: 285px;top:-6px";
  closeButton.src = xImageUrl;
  closeButton.addEventListener("click", function() {
    toggleSearchDisplay(false);
    
  }, false );
  
  closeButton.addEventListener("mouseover", function() {
    closeButton.style.opacity = "0.65";
    
  }, false );
  closeButton.addEventListener("mouseout", function() {
    closeButton.style.opacity = "1";
    
  }, false );
  
  
  form.appendChild(closeButton);
  
  var label = document.createElement("div");
  label.innerHTML = '<label for="___gm_keyword">Skriv inn søkeord, velg hovedkategori og subkategori!</label>';
  form.appendChild(label);
  
  var search = document.createElement("input");
  search.className = "textfield";
  search.type="text";
  search.name = "keyword";
  search.id = "___gm_keyword";
  search.value = GM_getValue("lastSearch", "");
  form.appendChild(search);
  
 
  
  var submit = document.createElement("input");
  submit.type ="submit";
  submit.className = "button";
  submit.value="søk";
  
  
  //
  // Create main dropdown menu with values from the products hash
  //
  var mainSelection = document.createElement("select");
  mainSelection.id ="___gm_maincat";
  var optGroup = document.createElement("optgroup");
  optGroup.label = "Velg hovedkategori";
  for (var catName in products){
    if (!products.hasOwnProperty(catName)) {
      continue;
    }
    var input = document.createElement("option");
    input.value = products[catName].catName|| catName;
    
    //allow different keyword for each main category
    //input.setAttribute("keyword", products[catName].keyWord || "keyword" )
    
    
    input.textContent = products[catName].label || catName;
    optGroup.appendChild(input);
    
  }
  mainSelection.appendChild(optGroup);
  
  
  
  //
  // Manipulating this element directly will not be safe after categoriesmaintainer constructor.
  //
  var subSelection = document.createElement("select");
  
  
  form.appendChild(mainSelection);
  form.appendChild(subSelection);
  form.appendChild(submit);
  
  
  
  var subCategories = new CategoriesMaintainer(products, subSelection, mainSelection, search);
  

  formContainer.appendChild(form);
  return formContainer;
}

//end createSearchBox

function getDocumentHeight(){
  return Math.max(document.documentElement.scrollHeight,document.documentElement.offsetHeight);
}

function getElementHeight(elm){
  return parseFloat(getComputedStyle(elm,null).height) || 0;
}

/**
 * multipleKeyDowns
 * provides a method of calling a callback when all keys in `keys' have been pressed simultaneously
 * Adapted from my earlier project here: http://stud.aitel.hist.no/~biberg/test/js/userscripts/hardwareno_sidebar_helper.user.js
 * @param keys            Array of keys that have to be pressed for fn to be called. Ex: ["a", "s", "d"]
 * @param fn             The callback that will be called
 */
function multipleKeyDowns(keys, fn) {
  //var delays = {a:[], s:[], d:[]};
  var delays = {};
  
  function deleyedReset(key) {
    if (!delays[key]) {
      delays[key] = [];
    }  
      
    delays[key].push(window.setTimeout(function() { 
      keys[key] = 0;
    }, 200));
  }

  var keysObj={};
  keys.forEach(function(key) {
    keysObj[key] = 0;
    delays[key] = [];

    
  });
  // keyObj is now similar to{a:0,s:0,d:0}
  // seems like keydown is triggered multiple times while key is pressed. hmmm. Doesn't matter.
  document.addEventListener("keydown", function(ev) {
    var pressed = String.fromCharCode(ev.which).toLowerCase();
    var target = ev.target;
    var tag = target.tagName.toLowerCase();
    // do not handle keypress when user is typing
    if (target.form || tag == "input" || tag == "textarea") {
      return;
    }
    //
    if (keys.indexOf(pressed) != -1) {
      keysObj[pressed] = 1;
      var sum = 0;
      //for each(var val in keysObj) {
      for (var k in keysObj) {
        if (!keysObj.hasOwnProperty(k)) {
          continue;
        }
        sum += keysObj[k];
      }
      

      // all three are pressed within a certain amount of time
      if (sum == keys.length) {
        // remove remaining timeouts
        //for each(var timeouts in delays) {
        for (var k in delays) {
          if ( !delays.hasOwnProperty(k)) {
            continue;
          }
          var timeouts = delays[k];
          timeouts.forEach(function(id) {
            clearTimeout(id);
          })
        }
        delays = {};
        
        fn();
        log("alle tre nede!");
        return;
      }
      
      deleyedReset(pressed);
      
      
    }
    
  }, false);
  
  document.addEventListener("keyup", function(ev){
    var pressed = String.fromCharCode(ev.which).toLowerCase();
    var target = ev.target;
    var tag = target.tagName.toLowerCase()
    // do not handle keypress when user is typing
    if (target.form || tag == "input" || tag == "textarea") {  
      return;
    }
    //
    // When a key is unpressed, set their status to 0 in the keysObj
    //
    if (keys.indexOf(pressed) != -1) {
      keysObj[pressed] = 0;
    }

  }, false);
}
//end multipleKeyDowns

function toggleSearchDisplay(visible) {
  if (!searchContainer) {
      searchContainer = createSearchBox();
      
      document.body.appendChild(searchContainer);
      
  }
  
  if (visible) {

    searchContainer.style.display = "block";
    shadow.show();
  } else {
    searchContainer.style.display = "none";
    shadow.disable();
  }
}

//end toggleSearchDisplay

function searchIsVisible() {
  return searchContainer && searchContainer.style.display == "block";
}

//end searchIsVisible

//
// Adopted from my earlier project here: http://stud.aitel.hist.no/~biberg/test/js/modals/popup.html
//
var shadow = { 
  element: document.createElement("div"), 
   
  init: function() {
    shadow.element.id= "___gm_shadow";
    shadow.element.style.cssText ='background-color: black; z-index:10040; color:black; width: 100%; height: 100%; position: absolute; left:0;top:0; opacity: 0.94';
  },
   
  show: function() {
     shadow.element.style.height = getDocumentHeight() + "px";
     document.body.appendChild(shadow.element);
  },
   
  disable: function(){
    try {
      document.body.removeChild(shadow.element);
    }catch(e){}
     
   
  },
   
  set visibile(hideIt) {
      shadow.element.style.display= (hideIt === false) ? "none" : "block";

  },
   
  get visibile(){
    return shadow.element.style.display == "block" && shadow.element.parentNode;
   
  }
   

}
//end shadow    



var boats = {
  used:{
    desc: "Brukte båter",
    forSale:{
      desc: "Brukte båter til salgs",
      url: "/finn/boat/used/result",
      method:"get"
    },
    wanted:{
      desc: "Brukte båter ønskes kjøpt",
      url: "/finn/boat/used/wanted/result",
      method:"get"
      
    }
  
  },
  "new":{
    desc: "Nye båter",
    forSale:{
      desc: "Båter til salgs",
      url: "/finn/boat/new/result",
      method: "post"
    }
  },
  motorsAndParts:{
    desc: "Båtmotorer og deler",
    motorsForSale:{
      desc: "Båtmotorer til salgs",
      url:  "/finn/boat/motor/result",
      method:"post"
    },
    motorPartsForSale:{
      desc:"Motordeler til salgs",
      url: "/finn/boat/parts/result",
      method: "post"
    },
    wanted:{
      desc:"Båtmotor ønskes kjøpt",
      url: "/finn/boat/parts/motor/wanted/result",
      method:"get"
    }
  },
  rentable:{
    desc:"Leiemarkedet",
    hirable:{
      desc: "Båt leies bort",
      url: "/finn/boat/rent/result",
      method: "post"
    },
    wanted:{
      desc: "Båt ønskes leid",
      url: "/finn/boat/rent/wanted/result",
      method: "get"
      
    }
  },
  docks:{
    desc: "Båtplass og oppslag",
    offered:{
      desc:"Båtplass tilbys",
      url: "/finn/boat/dock/result",
      method: "get"
    },
    wanted:{
      desc: "Båtplass ønskes",
      url: "/finn/boat/dock/wanted/result",
      method: "get"
    }
  }
  

};

//end boats
var cars = {
  all:{
    desc:"Alle biler",
    forSale:{
      desc:"Alle biler til salgs",
      url:"/finn/car/used/result",
      method:"post"
    }
    
  },
  construction:{
    desc:"Bygg og anlegg",
    forSale:{
      desc: "Anleggskjøretøy til salgs",
      url: "/finn/car/agri/result",
      method: "post"
    }
  },
  camping:{
    desc:"Campingliv",
    forSale: {
      desc:"Campingvogner og bobiler til salgs",
      url: "/finn/car/caravan/result",
      method: "post"
    }
  },
  trucksAnBusses: {
    desc:"Lastebil og buss",
    forSale:{
      desc: "Lastebil og buss til salgs",
      url: "/finn/car/truck/result",
      method: "post"
    }
  }
  
};
//end cars
var mc = {
  used: {
    desc:"Brukte MC",
    forSale:{
      desc: "Brukt MC til salgs",
      url:"/finn/mc/used/result",
      method:"post"
    }
  },
  unused: {
    desc: "Ny MC",
    forSale:{
      desc:"Nye MC",
      url: "/finn/mc/new/result",
      method: "post"
    }
  },
  atv: {
    desc:"ATV",
    forSale:{
      desc:"ATV til salgs",
      url: "/finn/mc/atv/result",
      method: "post"
    }
  },
  scootersAndMopeds:{
    desc: "Scootere og mopeder",
    forSale:{
      desc:"Scootere og mopeder til salgs",
      url: "/finn/mc/scooter/result",
      method: "post"
    }
  },
  snowScooters: {
    desc: "Snøscooter",
    forSale:{
      desc:"Snøscooter til sags",
      url:"/finn/mc/snowmobile/result",
      method:"post"
    }
  }
};
  
//end mc

var travel = {
  all: {
    desc:"Alle reiser",
    forSale:{
      desc: "Søk på alle reisemål",
      url:"/finn/travel/destination/search/",
      method:"get",
      keyword:"location"
    }
  },
  packages: {
    desc:"Søk i pakkereiser",
    allPackages:{
      desc: "Søk i alle pakkereisene samtidig",
      url: "/finn/travel/prepackage/result",
      method:"get"
    },
    spain:{
      desc: "Pakkereise Spania",
      url: "/finn/travel/prepackage/result?areaId=-134",
      method: "get"
    },
    greece: {
      desc: "Pakkereise Hellas",
      url: "/finn/travel/prepackage/result?areaId=-22",
      method: "get"
    },
    turkey:{
      desc: "Pakkereise Tyrkia",
      url: "/finn/travel/prepackage/result?areaId=-53",
      method: "get"
    },
    bulgaria:{
      desc: "Pakkereise Bulgaria",
      url: "/finn/travel/prepackage/result?areaId=-119",
      method: "get"
    },
    cypros:{
      desc: "Pakkereise Kypros",
      url: "/finn/travel/prepackage/result?areaId=-14",
      method: "get"
    },
    egypt:{
      desc: "Pakkereise Egypt",
      url: "/finn/travel/prepackage/result?areaId=-62",
      method: "get"
    },
    thailand:{
      desc: "Pakkereise Thailand",
      url: "/finn/travel/prepackage/result?areaId=-117",
      method: "get"
    },
    croatia:{
      desc: "Pakkereise Kroatia",
      url: "/finn/travel/prepackage/result?areaId=-128",
      method: "get"
    }
    
  },
  
  lastminute:{
    desc: "Søk i restplasser",
    allLastMinute:{
      desc: "Søk i alle restplasser samtidig",
      url: "/finn/travel/lastminute/result?",
      method: "get"
    },
    greece: {
      desc: "Restplass Hellas",
      url: "/finn/travel/lastminute/result?areaId=-22",
      method: "get"
    },
    turkey:{
      desc: "Restplass Tyrkia",
      url: "/finn/travel/lastminute/result?areaId=-53",
      method: "get"
    },
    tunisia:{
      desc: "Restplass Tunisia",
      url: "/finn/travel/lastminute/result?areaId=-52",
      method: "get"
    },
    spain:{
      desc: "Restplass Spania",
      url: "/finn/travel/lastminute/result?areaId=-134",
      method: "get"
    },
    portugal:{
      desc: "Restplass Tyrkia",
      url: "/finn/travel/lastminute/result?areaId=-132",
      method: "get"
    },
    cypros:{
      desc: "Restplass Tyrkia",
      url: "/finn/travel/lastminute/result?areaId=-14",
      method: "get"
    },
    bulgaria:{
      desc: "Restplass Tyrkia",
      url: "/finn/travel/lastminute/result?areaId=-119",
      method: "get"
    },
    egypt:{
      desc: "Restplass Egypt",
      url: "/finn/travel/lastminute/result?areaId=-62",
      method: "get"
    }
    
    
  }
  
};

//end travel

var work = {
  all:{
    desc: "Alle stillinger",
    work: {
      desc: "Søk i alle stillinger",
      url: "/finn/job/fulltime/result",
      method: "post"
    }
  },
  parttime:{
    desc: "Deltidsjobb",
    parttime:{
      desc: "Deltidsjobb",
      url: "/finn/job/parttime/result",
      method: "get"
    }
  },
  management:{
    desc: "Lederstillinger",
    management: {
      desc: "Lederstillinger",
      url: "/finn/job/management/result",
      method: "get"
    }
  },
  education: {
    desc: "Utdanning",
     courses:{
      desc: "Kurs og etterutdanning",
      url: "http://www.kursguiden.no/index.php?sv=sok&submit_forside=lol&partnerid=12",
      method:"get",
      keyword: "sok"
    },
    studies:{
      desc: "Studier",
      url: "http://utdanning.no/finn.no/?type=&new_search=true&sortering=&finn_utdanning=S%C3%B8k",
      method:"get",
      keyword: "q"
    }

  }
};
//end work

var realestate = {
  used: {
    desc: "Boliger til salgs",
    forSale:{
      desc: "Bolig til salgs",
      url: "/finn/realestate/homes/result",
      method: "post"
    }
  },
  leisure: {
    desc: "Fritidsboliger",
    forSale:{
      desc: "Fritidsboliger til salgs",
      url: "/finn/realestate/leisure/sale/result",
      method: "post"
    },
    plots:{
      desc: "Fritidstomter til salgs",
      url: "/finn/realestate/leisure/plots/result",
      method: "post"
    },
    rentable:{
      desc: "Fritidsleiligheter til leie",
      url: "/finn/realestate/leisure/rent/result",
      method: "post"
    }
    
  },
  abroad:{
    desc: "Boliger i utlandet",
    forSale: {
      desc: "Boliger til salgs",
      url: "/finn/realestate/abroad/homes/result",
      method: "post"
    },
    rentable: {
      desc: "Boliger til utleie",
      url: "/finn/realestate/abroad/lettings/result",
      method: "post"
    }
  },
  lettings: {
    desc: "Leiemarkedet",
    rentable: {
      desc: "Til leie",
      url: "/finn/realestate/lettings/result",
      method: "post"
    },
    wanted:{
      desc: "Ønskes leid",
      url: "/finn/realestate/lettings/wanted/result",
      method: "post"
    }
  },
  plots: {
    desc: "Tomter",
    forSale:{
      desc: "Tomter til salgs",
      url: "/finn/realestate/plots/result",
      method: "post"
    }
  }
  
  
};

//end realestate

var maps = {
  all: {
    desc:"Sesam-søk",
    forSale:{  
      desc: "Søk på sesam",
      url:"http://kart.sesam.no/",
      method:"get",
      keyword: "q"
    }
  }
};

//end maps

// for testing, remove some, see what happens!
// catName is optional
var products = {
  boats: { label: "Båter", productHash: boats, catName: "boats"},
  cars: { label: "Biler", productHash: cars, catName: "cars"},
  mc: { label: "MC", productHash: mc, catName: "mc"},
  travel: { label: "Reise", productHash: travel, catName: "travel"},
  work: { label: "Jobb og utdanning", productHash: work, catName: "work"},
  realestate:{ label: "Boliger og tomter", productHash: realestate, catName: "realestate"},
  maps: { label: "Kart", productHash: maps, catName: "maps"}
};


shadow.init();
var searchContainer = null;


var profileLinks = document.getElementById("myprofile_links");
var mySearches = profileLinks.lastChild.previousSibling;
mySearches.textContent = "Lagrede søk";

var productSearch = mySearches.cloneNode(false);
//productSearch.textContent = "Javascript produktsøk";
productSearch.innerHTML = "Javascript produktsøk";
productSearch.addEventListener("click", function(ev) {
  ev.preventDefault();
  toggleSearchDisplay(true);
}, false);



profileLinks.appendChild(productSearch);

multipleKeyDowns(["a", "s", "d"], function() {
  var visible = searchIsVisible();
  
  toggleSearchDisplay(!visible);
  
});





})()
