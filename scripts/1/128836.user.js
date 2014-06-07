// ==UserScript==
// @name           UCHelper
// @namespace      uf_fortytwo
// @description    Powerizes UniCreatures!
// @include        http://unicreatures.com*
// @include        http://www.unicreatures.com*
// @author         FortyTwo
// @reldate        25th May 2011
// @version        0.9
// ==/UserScript==
//wrap script in an anonymous function just cuz we can
(function(){
/*
 * PREPARE EVERYTHING
 */
//starting variables
//$_GET array, just like PHP, woo
var $_GET = [];

//userscript functions
var us ={
  init: function(){
    //log function
    this.log = function(msg){
      if(typeof msg == 'object') msg = msg.join(',');
      console.log(msg);
    };
    //storage types
    //tyvm non-real-gm-supporting-browsers
    if(typeof GM_deleteValue == 'function'){
      this.set = function(key, val){ return GM_setValue(key, val); };
      this.del = function(key){ return GM_deleteValue(key); };
      this.get = function(key){ return GM_getValue(key); };
      this.addStyle = function(styling){ GM_addStyle(styling); return this;}
    }
    //we aren't ff. :(
    else{
      this.set = function(key, val){
        val = (typeof val)[0] + val;
        localStorage.setItem(key, val);
      }
      this.del = function(key){
        localStorage.removeItem(key);
      }
      this.get = function(key, defaultValue){
        var value = localStorage.getItem(key);
        if (!value) return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
      }
      this.addStyle = function(styling){
        //check 42 stylesheet exists, if not, create it
        var ss;
        if(!f2.$('#UCH_style')){
          var new_ss = document.createElement('style');
          new_ss.type = 'text/css';
          new_ss.id = 'UCH_style';
          document.head.appendChild(new_ss);
          ss = new_ss;
        }
        else ss = f2.$('#UCH_style');
        ss.innerHTML += styling;
        return this;
      }
    }
  }
};

//functions
//call f2.init() to prepare everything
var f2 ={
  init: function(){
    //get params
    var s = location.search.substring(1, location.search.length), v = s.split('&');
    if(v.length > 1){
      for(i = 0; i < v.length; ++i){
        var var_info = v[i].split('=');
        $_GET[var_info[0]] = var_info[1];
      }
    }
    else{
      var q = location.search.substring(location.search.lastIndexOf('?')+1, location.search.length), v = q.split('=');
      $_GET[v[0]] = v[1];
    }
  },
  //returns the string after the last forward-slash
  fileName: function(str){
    return str.substring(str.lastIndexOf('/')+1, str.length-4);
  },
  //reverse of this.fileName(str), basically
  safe: function(comp){
    return comp.replace(' ', '_').toLowerCase();
  },
  unsafe: function(str){
    return str.replace('_', ' ');
  },
  //xpath
  $x: function(str){
    return document.evaluate(str, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  },
  //helper function for getelementbyid
  $: function(el){
     return document.getElementById(el.substring(1, el.length));
  },
  //formats a number
  numberFormat: function(val){
    var pos, r = "";
    val += '';
    val = val.split(",").join(""); // remove existing commas if present.
    var dot=val.indexOf("."); // locate decmal
    if(dot<0)dot=val.length; // use end if no decimal
      for(pos=dot-3;pos>=1;pos-=3) // put commas in
        r=","+val.substr(pos,3)+r;
        r=val.substring(0,pos+3)+r; // put start of string on
        dot=val.indexOf("."); // check for decimal
        if(dot>0)r+=val.substring(dot);// put fraction part on
    return r;
  },

  arraySpit: function(array, key_delim, sep_delim){
    var str = '';
    for(i in array){
      str += i+key_delim+array[i]+sep_delim;
    }
    return str.substring(0, str.length-1);
  },

  numberOf: function(what, str){
    var c = 0;
    for(i = 0; i < what.length; ++i){
      for(j = 0; j < str.length; ++j){
        if(str.charAt(j) == what[i]) ++c;
      }
    }
    return c;
  }
};

//unicreatures functions
var uc ={
  userID: null,

  getUserId: function(){
    //have we already got the user id?
    if(this.userID !== null)  return this.userID;
    //we needa find our uc id
    var cookies = document.cookie.split('; ');
    for(i = 0; i < cookies.length; ++i){
      var info = cookies[i].split('=');
      //found it?
      if(info[0] === 'unicreatureid'){
        this.userID = parseInt(info[1]);
        return this.userID;
      }
    }
  }
};
//function lib for components handling
var components ={
  values: [],
  //determines if the user has synched their values
  isSynched: false,
  //prepare from cookie
  prepare: function(){
    if(!us.get('comp_count')) return;
      var comp_str = us.get('comp_count'), counts = comp_str.split(',');
      for(j = 0; j < counts.length; ++j){
        //get name and value
        var values = counts[j].split(':');
        if(this.type(values[0]) === 'item'){
          var itemBits = values[1].split('|');
          this.values[values[0]] = [];
          this.values[values[0]]['useID'] = parseInt(itemBits[0]);
          this.values[values[0]]['value'] = parseInt(itemBits[1]);
        }
        else this.values[values[0]] = parseInt(values[1]);
      }
      this.isSynched = true;
  },
  //saves the new values
  save: function(){
    var str = '';
    for(i in this.values){
      if(this.type(i) === 'item'){
        this.values[i] = (this.values[i]['useID']+'|'+this.values[i]['value']);
//        GM_log(this.values[i]);
      }
    }
    us.set('comp_count', f2.arraySpit(this.values, ':', ','));
  },
  increment: function(comp, n){
    n = parseInt(n);
    if(this.type(comp) === 'item') this.values[comp]['value'] += n;
    else this.values[comp] += n;
  },
  decrement: function(comp, n){
    n = parseInt(n);
    if(this.type(comp) === 'item') this.values[comp]['value'] -= n;
    else this.values[comp] -= n;
  },
  isValid: function(comp){
    return this.type(f2.safe(comp)) !== false;
  },
  //return the type of thing something is
  type: function(comp){
  //  comp = this.codeName(comp);
    if(inventory.components[f2.safe(comp)] !== undefined){
      return 'component';
    }
    else if(inventory.items[f2.safe(comp)] !== undefined){
      return 'item';
    }
    else return false;
  },
  //add a new component type, or overwrite an existing
  //one
  add: function(args){
    type = f2.safe(args.type);
    if(this.type(type) === 'item'){
      this.values[type] = [];
      this.values[type]['value'] = args.val;
      if(args.useID){
        this.values[type]['useID'] = args.useID;
      }
    }
    else{
      this.values[type] = parseInt(args.val);
    }
  },
  //retrieve the number of component
  get: function(type){
    type = f2.safe(type);
    return (this.type(type) === 'item' ? (this.values[type] !== undefined ? this.values[type]['value'] : false) : this.values[type]);
  },
  //returns the code-specific name of something
  //only really used with items
  codeName: function(type){
    if(this.get(type) !== false)  return type;
    for(i in inventory.items){
      if(inventory.items[i].label === i) return i;
    }
  }
};

us.init(); f2.init();

//settings
var settings ={
  totalPowers: true,
  componentCount: true,
  campfireHelper: true,
  warnBasket: true,
  filterArea: true,
  creatureWikiLink: true,
  minifyProfile: true,
  extendedView: true,
  //this option requires componentCount to be enabled!!!
  quickArena: true,
  extendedTraining: true,
  inventoryReorder: {
    enabled: true,
    //order by the image file, you can skip them from the order and the script
    //will put them at the end of the order
    order: ['ninja_gift', 'mystery_box', 'jasper_box', 'metal_detector', 'stamp_shift', 'stamp_era3', 'genx_female', 'genx_male', 'potion_pink', 'potion_yellow', 'potion_blue', 'potion_green', 'potion_normalize', 'potion_noble', 'potion_exalted', 'bottle_cryo', 'defrost_torch', 'scroll_words', 'watch_warp', 'training_basket', 'component_bag', 'picon', 'training_manual', 'training_manual2']
  },
  quickMenu: {
    enabled: true,
    //add/remove quickmenu links here
    links: {
      Inventory: 'inventory.php?id='+uc.getUserId(),
      Wild: 'areas.php?wild='+uc.getUserId(),
      Alerts: 'alerts.php',
      Accomplishments: 'accomplishments.php'
    }
  },
  shortcuts: {
    enabled: true,
    //add/remove shortcuts
    //shortcut: page
    i: 'inventory.php',
   // c: 'social.php',
    f: 'friend_list.php',
    a: 'accomplishments.php'
  }
};

var inventory ={
  components: {
    auraglass: 1, heartwater: 1, lifepowder: 1, timeshard: 1, treescent: 1, skypollen: 1, watervine: 1, whiteroot: 1,
    meadowgem: 1, moonruby: 1, riverstone: 1, bluemaple: 1, echoberry: 1, seamelon: 1, sunnyseed: 1,
    astralune: 1, starweave: 1, essentia: 1, ancientberry: 1, tree_dew: 1, tree_gemstone: 1, tree_seeds: 1,
    tree_spiritstone: 1, wood: 1, stone: 1, supplies: 1, metal: 1
  },
  items: {
    potion_noble: {label: 'Elixir of Nobility', displayOnPets: true},
    potion_normalize: {label: 'Normalize Potion', displayOnPets: true},
    potion_exalted: {label: 'Elixir of Exaltation', displayOnPets: true},
    potion_pink: {label: 'Vigor Potion'},
    potion_yellow: {label: 'Vitality Potion'},
    potion_blue: {label: 'Refresh Potion'},
    potion_green: {label: 'Moxie Potion'},
    mystery_box: {label: 'Mystery Box'},
    picon: {label: 'Professional Scroll'},
    bottle_cryo: {label: 'Cryogenic Freeze Spray', displayOnPets: true},
    defrost_torch: {label: 'Defrost Torch', displayOnPets: true},
    watch_warp: {label: 'Time Warp Watch', displayOnPets: true},
    scroll_words: {label: 'Story Parchment', displayOnPets: true},
    genx_male: {label: 'Male Gen-X', displayOnPets: true},
    genx_female: {label: 'Female Gen-X', displayOnPets: true},
    component_bag: {label: 'Component Bag'}
  }
};

//rewrite all UC www. links to the no-- www. version
/*var links = f2.$x('//a[starts-with(@href, "http://www.unicreatures.com/")]');
for(i = 0; i < links.snapshotLength; ++i){
  var item = links.snapshotItem(i);
  item.href = 'http://'+item.href.substring(11, item.href.length);
}*/

//fix menu styles, fixes the fucked up thing where the links
//list overlaps the bottom links, allows an infinite number
//of additional links, fucks up the flarius games link tho
us.addStyle('#menu {background-repeat: repeat-y; height: auto;} #left{height: 40em;}');



var ready = false;
window.addEventListener('click',
function(e){
  if(!ready && e.target){
    e.preventDefault;
    return false;
  }
}, false);

/*
 * QUICK MENU
 */
if(settings.quickMenu.enabled){
  //find menu
  var menu = f2.$x('//div[@id="menu"]/ul'), menu = menu.snapshotItem(0);
  //create css
  us.addStyle('.hov ul {display: none;} .hov:hover > ul {display: block; position:absolute; z-index:9999; background-color:#e3dbb6; padding: 0em 1.5em !important; margin-left:200px !important; width:10em !important; border: 1px solid #000; margin-top:-1.7em;} .hov > ul > li{border-bottom: none !important; text-align:left !important;}');
  //create element
  var li = document.createElement('li');
  var content = '';
  li.setAttribute('class', 'hov');
  //create the innerhtml
  content += ''+
  '<a href="#" id="UCH_quick_links_a">Quick Links &raquo;</a><ul>';
  for(i in settings.quickMenu.links){
    content += '<li><a href="'+settings.quickMenu.links[i]+'">'+i+'</a></li>';
  }
  content += '</ul>';
  li.innerHTML = content;
  //add to menu
  menu.insertBefore(li, menu.firstChild);
}





/*
 * WARN BASKET
 */
if(settings.warnBasket){
  var date = new Date(), curdate = [date.getMonth(), date.getDay(), date.getHours()], notvis = false;
  if(window.location.pathname === '/trainer.php'){
    us.set('basketlady', curdate.join(','));
  }
  if(us.get('basketlady')){
    var lastvis = us.get('basketlady').split(',');
    for(i = 0; i < lastvis.length; ++i){
      var d = parseInt(lastvis[i]);
      if(d < curdate[i]){
        notvis = true;
        break;
      }
    }
  }
  //check if lastvis was below this hour
  if(!us.get('basketlady') || notvis){
    //get link element
    var chut = f2.$x("//div[@id='menu']/ul/li/a[@href='trainer.php']"), chut = chut.snapshotItem(0);
    //change link colour to red
    chut.style.color = 'red';
    chut.title += 'You\'ve not visited the caretaker hut this hour! Come see the basket hag!';
  }
}








/*
 * CREATURE'S WIKI LINK
 */
if(settings.creatureWikiLink && location.pathname === '/view.php'){
  var infoRow = f2.$x('/html/body/div/div[2]/div/div[2]/div/table/tbody/tr[2]/td');
  var insertIn = infoRow.snapshotItem(1), info = infoRow.snapshotItem(0);
  infoRow = infoRow.snapshotItem(0);
  var fam = info.innerHTML.match(/Creature Family: (.+?)<br>/);
  var stage = info.innerHTML.match(/Creature Name: (.+)/);
  //insert html
  insertIn.innerHTML += '<br /><strong><a href="http://wiki.unicreatures.com/index.php?title='+fam[1]+'#'+stage[1]+'">Wiki About This Creature</a></strong>';
}






/*
 * TOTAL POWERS
 */
if(settings.totalPowers && (location.pathname === '/train.php' || location.pathname === '/view.php')){
  //find powers cell
  var powersCell = f2.$x('//table[tbody/tr[td[@align="right"] and td[2][@align="left"]]]');
  //check we found something
  if(powersCell.snapshotItem(0)){
    powersCell = powersCell.snapshotItem(0).rows[1].cells[0];
    //match only digits from the powers cell
    //find all digits
    var powersTypes = powersCell.innerHTML.match(/([0-9]+)/gi, powersCell.innerHTML), n = 0;
    //add up all powers
    for (i = 0; i < powersTypes.length; ++i){
      n += parseInt(powersTypes[i]);
    }
    powersCell.children[0].innerHTML = "Powers("+n+"/272):";
  }
}






/*
 * EXTENDED TRAINING
 */
if(settings.extendedTraining && location.pathname === '/train.php'){
  var tb = f2.$x('/html/body/div/div[2]/div/div[2]/div/table/tbody/tr'), cellOfImg = tb.snapshotItem(0);
  //id of pet
  var id = $_GET['id'], td1 = cellOfImg.cells[0], td2 = cellOfImg.cells[1];
  //add "Go To Profile" link to the second row
  var profLink = document.createElement('td');
  profLink.innerHTML = '<hr /><a style="color:purple;font-weight:bold;" href="view.php?id='+id+'">Go To Profile</a>';
  profLink.style.textAlign = 'center';
  tb.snapshotItem(1).insertBefore(profLink, tb.snapshotItem(1).cells[0]);
  td1.innerHTML += '<br />';
  td2.lastChild.innerHTML += '<br /><strong>Warning: clicking the x2 or whatever links will cost more energy, but will get you through training faster.';
  //check they're doing an action and key
  var info = td1.childNodes[0].href.match(/train.php\?id=[0-9]+&act=(.+)&key=(.+)/);
  if(info){
    //function to call when a user clicks da x* links
    //it handles stuffs
    var key = info[2], act = info[1];
    var i = 0;
    var clickz = function(){
      var n = parseInt(this.innerHTML.substring(1, this.id.length))-1;
     // alert(n);
      var url = 'http://'+location.hostname+'/train.php?id='+id+'&key='+key+'&act='+act;
      //make request for n times
      //loop:
      for(i = 0; i < n; ++i){
        GM_xmlhttpRequest({
          method: 'HEAD',
          url: url
        });
      }
      //redir the user
      location.href = url;
    };
    //add x* links
    for(i = 2; i < 6; ++i){
      var newAnchor = document.createElement('a');
      newAnchor.href = '#';
      newAnchor.id = 'UCH_train_'+i;
      newAnchor.innerHTML += 'x'+i;
      td1.appendChild(newAnchor);
      td1.innerHTML += '&nbsp;&nbsp;&nbsp;';
    }
    //for some reason we have to do it this way <.<
    f2.$('#UCH_train_5').addEventListener('click', clickz, true);
    f2.$('#UCH_train_4').addEventListener('click', clickz, true);
    f2.$('#UCH_train_3').addEventListener('click', clickz, true);
    f2.$('#UCH_train_2').addEventListener('click', clickz, true);
    //highlight table row that contains the link of the cur action
    var tOpt = f2.$x('/html/body/div/div[2]/div/div[2]/div/table[3]/tbody/tr[td/a[contains(@href, "act='+act+'")]]'), tOpt = tOpt.snapshotItem(0);
    tOpt.style.backgroundColor = 'lightgreen';
  }
}








/*
 * FILTER AREA
 */
if(settings.filterArea && location.pathname === '/areas.php'){
  var sim = f2.$x('//p[@class="simplenotice"]'), sim = sim.snapshotItem(0);
  sim.innerHTML += '<form method="GET">Filter: <input type="text" name="UCH_area_filter" id="UCH_area_filter" /><input type="submit" id="UCH_filter_area_submit"  value="Filter" /></form>';
  //create a new table for our results
  var nTable = document.createElement('table');
  var table = f2.$x('/html/body/div/div[2]/div/div[2]/div/table[2]'), table = table.snapshotItem(0);
  table.parentNode.insertBefore(nTable, table.nextSibling);
  f2.$('#UCH_filter_area_submit').addEventListener('click',
  function(e){
    e.preventDefault();
    e.stopPropagation();
    var table = f2.$x('/html/body/div/div[2]/div/div[2]/div/table[2]'), table = table.snapshotItem(0);
    var nTable = f2.$x('/html/body/div/div[2]/div/div[2]/div/table[3]'), nTable = nTable.snapshotItem(0);
    if(f2.$('#UCH_area_filter').value !== ''){
      var results = f2.$x('/html/body/div/div[2]/div/div[2]/div/table[2]/tbody/tr/td[a/img[contains(@src, "'+f2.$('#UCH_area_filter').value.toLowerCase()+'")]]');
      //hide the real table
      table.style.display = 'none';
      var resultContent = '';
      for(i = 0, j = 0; i < results.snapshotLength; ++i){
        var item = results.snapshotItem(i);
        if(j === 0) resultContent += '<tr>';
        resultContent += '<td align="center" width="110" valign="bottom">'+item.innerHTML+'</td>';
        if(j === 4){
          j = 0;
          resultContent += '</tr>';
        }
        else ++j;
      }
      nTable.innerHTML = '<tbody>'+resultContent+'</tbody>';
    }
    else{
      table.style.display = '';
      nTable.style.display = 'none';
    }
  }, false);
}








/*
 * CAMPFIRE HELPER
 */
if(settings.campfireHelper && location.pathname === '/social.php'){
  function newsubmit(e){
    var f = (e ? e.target : this), msg = f.elements[0], str = '';
    for(i = 0; i < msg.value.length; ++i){
      //check what i is
      switch(msg.value.charAt(i)){
        case '>': str += '&gt;'; break;
        case '<': str += '&lt;'; break;
        default: str += msg.value.charAt(i); break;
      }
    }
    msg.value = str;
  }
  //find the form
  var form = f2.$x('//form[textarea[@name="message"]]'), form = form.snapshotItem(0);
  //give an id to the textarea
  form.elements[0].setAttribute('id', 'UCH_cf_txtarea');
  //insert char count element
  form.innerHTML += '<strong id="UCH_charcount" style="color:green">0/255</strong><br /><i>&lt; and &gt; take up 4 characters</li>';
  //we have to add onto the submit event of the form
  form.addEventListener('submit', newsubmit, false);
  window.addEventListener('submit', newsubmit, false);

  //add event listener to textarea's keyup event, and our checkmsg function
  f2.$('#UCH_cf_txtarea').addEventListener('keyup',
  function(e){
    //we wanna make sure the value is defined before we 
    //continue, FF puts .value as undefined while the key is pressed
    if(this.value != 'undefined'){
      var n = this.value.length;
      //count speshul < and >
      var add = f2.numberOf(['<', '>'], this.value);
      if(add > 0) n += (add * 3);
      //set charcount style colour based on if the user has
      //GONE OVER DA LIMIT
      f2.$('#UCH_charcount').style.color = (n > 255 ? 'red' : 'green');
      f2.$('#UCH_charcount').innerHTML = n+'/255';
    }
  }, false);
}










/*
 * INVENTORY REORDER
 */
if(settings.inventoryReorder.enabled && location.pathname === '/inventory.php'){
  var table = f2.$x('/html/body/div/div[2]/div/div[2]/div/div/table'), table = table.snapshotItem(0), order = [];
  //add items to our real order array, this is also how the positions are
  //determined ;p, unspecified items are added to the end of this array
  //in the while loop as it checks the images, simples *click*
  for(i = 0; i < settings.inventoryReorder.order.length; ++i){
    order[settings.inventoryReorder.order[i]] = 0;
  }

  //delete the 'list of equipment' row
  table.deleteRow(0);
  //keep looping until we hit the "list of Components" cell, then
  //we break out
  outerloop:
  while(true){
    var row = table.rows[0];
    for(c = 0; c < row.cells.length; ++c){
      var cell = row.cells[c];
      if(cell.innerHTML.indexOf('<strong>List of Components</strong>') > -1){
        //we only break if we've hit the end of inventory items list
        break outerloop;
      }
      if(cell.childNodes[0].tagName === 'A') var image = cell.childNodes[0].childNodes[0].src;
      else image = cell.childNodes[0].src;
      var rl_img = image.substring(image.lastIndexOf('/')+1, image.length-4);
      //if the item wasn't specified, this'll actually append it to our order =)
      //FORWARDS-COMPATABILITY FTW
      order[rl_img] = cell.innerHTML;
    }
    //remove the row, this'll help us later
    table.deleteRow(0);
  }

  var content = '', n = 0;
  //replace the inventory table content with our new content
  for(i in order){
    if(order[i] !== 0){
      if(n === 0) content += '<tr>';
      content += '<td height="80" align="center" valign="bottom">'+order[i]+'</td>';
      if(n === 3){
        n = 0;
        content += '</tr>';
      }
      else  ++n;
    }
  }
  //insert new content
  table.tBodies[0].innerHTML = '<tr><td align="center" colspan="4"><strong>List of Equipment</strong></td></tr>'+content+table.tBodies[0].innerHTML;
}









/*
 * KEYBOARD SHORTCUTS
 */
if(settings.shortcuts.enabled){
  window.addEventListener('keydown',
  function(e){
    var t = e ? e.target : this;
    //don't wanna redirect if they're typing in a textarea
    if(t.tagName === 'TEXTAREA')  return;
    if(e.ctrlKey){
      var c = String.fromCharCode(e.keyCode).toLowerCase();
      if(settings.shortcuts[c]){
        window.location.href = settings.shortcuts[c];
      }
    }
  }, true);

  //display shortcut info in title of links
  var links = f2.$x('//a');
  for(i = 0; i < links.length; ++i){
    var link = links[i], href = link.href;
    var page = href.substring(href.lastIndexOf('/')+1, href.indexOf('.php')+4);
    for(j in settings['shortcuts']){
      if(settings.shortcuts[j] === page){
        link.title += ' (ctrl+'+j+')';
        break;
      }
    }
  }
}








/*
 * MINIFY PROFILE
 */
if(settings.minifyProfile && location.pathname === '/profile.php'){
  var areas = f2.$x('//a[starts-with(@href, "areas.php")][img]');
  for(i = 0; i < areas.snapshotLength; ++i){
    var item = areas.snapshotItem(i), img = item.childNodes[0];
    img.style.width = '80px';
    img.style.height = '80px';
  }
}






/*
 * COMPONENT COUNT
 */

//ffs, the code for this is HUGE
if(settings.componentCount){
  //prepare our components
  components.prepare();
  if(location.pathname === '/inventory.php' && $_GET['id']){
    //check inventory id is the same as our login id
    //synchronize when inventory is visited
    if($_GET['id'] == uc.getUserId()){
      //get comps
      var comps = f2.$x('//img[contains(@src, "images/components") or contains(@src, "images/items")]');
      for(i = 0; i < comps.snapshotLength; ++i){
        var item = comps.snapshotItem(i), name = f2.fileName(item.src);
        if(!components.isValid(name)) continue;
        var cell = (components.type(name) === 'component' ? item.parentNode : item.parentNode.parentNode), inc = 1;
        if(cell.innerHTML.indexOf('(') != -1){
          inc = cell.innerHTML.substring(cell.innerHTML.lastIndexOf('(')+1, cell.innerHTML.length-1);
        }
        if(components.type(name) === 'component'){
          components.add({type: name, val: inc});
        }
        else if(components.type(name) === 'item'){
          var link = cell.childNodes[0];
          var useid = link.href.match(/use_item.php\?id=([0-9]+)/);
          components.add({type: name, val: inc, useID: useid[1]});
        }
      }
    }
  }
  if(components.isSynched){
    //var images = f2.$x('//img[contains(@src, "components")');
    //this script works on multiple pages, we have to execute different
    //code for each one :(
   switch(location.pathname){
      case '/view.php':
        //are we spending?
        if($_GET['c'] !== undefined){
          //what are we spending, we can get this info by getting
          //the table cell at the index of c
          var spent = f2.$x('//table/tbody/tr/td['+$_GET['c']+']/a[contains(@href, "&c=")]'), spent = spent.snapshotItem(0);
          //success?
          //and if yeah, decrement
          if(spent) components.decrement(f2.fileName(spent.firstChild.src), ($_GET['q'] !== undefined ? $_GET['q'] : 1));
        }
        //check if creature belongs to logged in user
        var userLink = f2.$x('/html/body/div/div[2]/div/div[2]/div/table/tbody/tr/td[2]/a'), userLink = userLink.snapshotItem(0);
        if(userLink.href.match(/.php\?id=([0-9]+)/)[1] == uc.getUserId()){
          var insertIn = f2.$x('/html/body/div/div[2]/div/div[2]/div'), insertIn = insertIn.snapshotItem(0);
          var insertContent = insertContentLabels = '';
          for(i in inventory.items){
            var item = inventory.items[i];
            //check we have a type of this and can display on pet
            if(!item.displayOnPets || !components.get(i)) continue;
            insertContent += '<td style="vertical-align:bottom;text-align:center;width:80px"><a onclick="if(!confirm(\'Do ya rly wanna use dis?\')) return false;" href="used_item.php?id='+components.values[i].useID+'&use='+$_GET['id']+'"><img src="images/items/'+i+'.png" /></a></td>';
            insertContentLabels += '<td style="vertical-align:top;text-align:center">'+inventory.items[i].label+' <strong>('+f2.numberFormat(components.get(i))+'x)</strong></td>';
          }
          insertIn.innerHTML += '<div id="UCH_view_potions_header" style="font-weight:bold; text-align:center; padding:10px 0px; border-bottom:2px solid grey;">Use some powahs on this UniCreature</div><br><table id="UCH_view_potions"><tbody><tr>'+insertContent+'</tr><tr>'+insertContentLabels+'</tr></tbody></table>';
        }
      break;
      case '/interact.php':
      case '/explore.php':
        //what did we get?
        var gain = f2.$x('//div[img[contains(@src, "images/components") or contains(@src, "images/items")]]');
        for(i = 0; i < gain.snapshotLength; ++i){
          var comp = gain.snapshotItem(i), name = f2.fileName(comp.firstChild.src);
          if(!components.isValid(name)) continue;
          var b_tag = comp.lastChild;
          components.increment(name, 1);
          b_tag.innerHTML += ' ('+f2.numberFormat(components.get(name))+'x)';
        }
      break;
      //@_@
      //with 42's rad js skills, this actually works on any show= type :P
      case '/transmute.php':
        //we need to override the forms and use GM's set value functions
        //to get appropriate data to work with
        var transmute_func = function(e){
          var t = e ? e.target : this;
          //set our info
          us.set('t_id', parseInt(t.elements[0].value));
          us.set('t_quantity', parseInt(t.elements[1].value));
        }
        window.addEventListener('submit', transmute_func, true);
        //find all rows with a transmute hidden input
        var t_rows = f2.$x('//table/tbody/tr[td/form[input[@name="transmute"]]]');
        for(i = 0; i < t_rows.snapshotLength; ++i){
          var row = t_rows.snapshotItem(i), form = row.cells[2].childNodes[1];
          //add submit listener to form
          form.addEventListener('submit', transmute_func, true);
          //are we buying? check persistant data
          if(us.get('t_id') && us.get('t_quantity')){
            var t_id = parseInt(us.get('t_id')), t_q = parseInt(us.get('t_quantity'));
            var trans = form.elements[0];
            //check the transmute id matches the current form's transmute i
            if(t_id != trans.value) continue;
            //what did we purchase?
            var bought = f2.$x('/html/body/div/div[2]/div/div[2]/div/p/img'), bought = bought.snapshotItem(0);
            //rare component?
            if(bought){
              var name = f2.fileName(bought.src);
              if(components.isValid(name)){
                components.increment(name, 1 * t_q);
                bought.parentNode.innerHTML += (' <strong>('+f2.numberFormat(components.get(name))+'x)</strong>');
              }
            }
            var spent = row.cells[1].firstChild.rows[0].cells;
            //common components
            for(j = 0; j < spent.length; ++j){
              var comp = f2.fileName(spent[j].firstChild.src);
              if(!components.isValid(comp)) continue;
              var dec = spent[j].innerHTML.substring(spent[j].innerHTML.lastIndexOf('(')+1, spent[j].innerHTML.length-1).split(' / ');
              dec = parseInt(dec[1]);
              components.decrement(comp, dec * t_q);
            }
            //delete persistant data
            us.del('t_id');
            us.del('t_quantity');
          }
        }
        break;
        case '/tech_missions.php':
          //we needa override the link
          //create our own function
          var override = function(e){
            //only do this if they've not got a mission in progress
            if(f2.$('id_time')){
              if(parseInt(f2.$('id_time').value) > 0){
                //can't do this yet
                return;
              }
            }
            //var rewardTags = f2.$x('//tr/td[6]/font
            var row = this.parentNode.parentNode;
            var mission_name = row.cells[0].childNodes[0].innerHTML;
            mission_name = mission_name.substring(0, mission_name.length-1);
            var rewardsrow = row.nextSibling.nextSibling.cells[5];
            var rewardsTags = rewardsrow.childNodes, rewards = [];
            for(i = 0; i < rewardsTags.length; ++i){
              if(rewardsTags[i].tagName !== 'FONT') continue;
              var reward = rewardsTags[i].innerHTML.split(' ');
              if(!components.isValid(reward[2])) continue;
              if(components.type(reward[2]) === 'item') reward[2] = components.codeName(reward[2]);
              rewards[reward[2].toLowerCase()] = reward[1];
            }
            us.set('mission_give', f2.arraySpit(rewards, ':', ','));
            us.set('mission', mission_name);
          }
          var links = f2.$x('//table/tbody/tr/td/a[contains(@href, "tech_do_mission.php")]');
          for(i = 0; i < links.snapshotLength; ++i){
            var link =  links.snapshotItem(i);
            link.addEventListener('click', override, true);
          }
        break;
        case '/tech_do_mission.php':
          var contents = document.getElementsByClassName('content'), content = contents[0], give = [];
          if(us.get('mission') && us.get('mission_give')){
            //get cookie values
            var comps = us.get('mission_give').split(','), str = '';
            var mission_name = us.get('mission');
            if(content.innerHTML.indexOf(mission_name) > 0){
              for(i = 0; i < comps.length; ++i){
                var infos = comps[i].split(':');
                components.increment(infos[0], infos[1]);
                str += '<li><img src="./images/components/'+infos[0]+'.png" /> +'+infos[1]+'<strong> '+infos[0]+' ('+f2.numberFormat(components.get(infos[0]))+'x)</strong></li>';
              }
              content.innerHTML += '<br />You\'ve gained:<br /><br /><ul>'+str+'</ul>';
              //remove cookies
              us.del('mission');
              us.del('mission_give');
            }
          }
        break;
        //this'll be consistant across all arena games with the
        //way it's designed =)
        case '/arena_volleyball.php':
        case '/arena_capture.php':
        case '/arena_bobsledding.php':
        case '/arena_soccer.php':
          //find the table
          var gain = f2.$x('//td[img[contains(@src, "images/components")]]');
          for(i = 0; i < gain.snapshotLength; ++i){
            var item = gain.snapshotItem(i);
            var name = f2.fileName(item.firstChild.src);
            if(!components.isValid(name)) continue;
            //find numbers
            var match = item.innerHTML.match(/([0-9]+)/);
            if(!match){
              match = [];
              match[1] = '1';
            }
            //increment comp count
            components.increment(name, match[1]);
            //display count
            item.innerHTML += ' <strong>('+f2.numberFormat(components.get(name))+')</strong>';
          }
          var addLinkTo = f2.$x('//td[contains(text(), "Return to the Arena")]');
          if(settings.quickArena && addLinkTo.snapshotItem(0)){
            addLinkTo = addLinkTo.snapshotItem(0);
            //what game we playing?
            var game = f2.fileName(location.pathname);
            game = game.substring(6, game.length);
            //add link to page
            addLinkTo.innerHTML = '<a href="http://www.unicreatures.com/arena_choose.php?game='+game+'">Start A New Game</a><br />'+addLinkTo.innerHTML;
          }
        break;
        case '/harvest_reward.php':
          var content = f2.$x('/html/body/div/div[2]/div/div[2]/div/div'), content = content.snapshotItem(0);
          var add = content.innerHTML.split('<br>');
          for(i = 3; i < add.length; ++i){
            var info = add[i].split(' ');
            if(components.isValid(info[2])){
              components.increment(info[2], info[1]);
              add[i] = '<img src="images/components/'+info[2].toLowerCase()+'.png" />'+add[i]+' <strong>('+f2.numberFormat(components.get(info[2].toLowerCase()))+')</strong>';
            }
          }
          content.innerHTML = add.join('<br>');
        break;
        case '/use_item.php':
          var gain = f2.$x('//strong[contains(text(), "There was")]'), gain = gain.snapshotItem(0);
          //potions g, b, y, p
          //mystery box
          if(gain){
            var q = parseInt(gain.innerHTML.substring(10, 11));
            var name = gain.innerHTML.substring(12, gain.innerHTML.lastIndexOf(' '));
            if(components.isValid(name)){
              components.increment(name, q);
              gain.innerHTML += '<span id="UCH_mb_quant" style="color: green">('+f2.numberFormat(components.get(name))+')</span>';
            }
          }
          //potions g, b, y, p
          var pot = f2.$x('/html/body/div/div[2]/div/div[2]/div/div/img'), pot = pot.snapshotItem(0);
          if(pot){
            var potType = f2.fileName(pot.src);
            //decrease by one woohoo
            components.decrement(potType, 1);
            pot.parentNode.innerHTML += ' <strong>('+components.get(potType)+'x)</strong>';
          }
        break;
        case '/arena.php':
          if(!$_GET['game']) break;
          var addToEl = f2.$x('/html/body/div/div[2]/div/div[2]/div/div[2]'), addToEl = addToEl.snapshotItem(0);
          //check appropriate potions
          us.addStyle('#UCH_arena_quick_pots > tbody > tr > td{text-align:center; padding: 0px 20px}');
          addToEl.innerHTML += '<table id="UCH_arena_quick_pots"><tbody><tr><th id="UCH_arena_quick_pots_alert" colspan="2"></th></tr><tr></tr><tr></tr></tbody></table>';
          var t = f2.$('#UCH_arena_quick_pots');
          var checkAlert = function(){
            if(!f2.$('#UCH_arena_quick_pots_alert').innerHTML){
              f2.$('#UCH_arena_quick_pots_alert').innerHTML = '<strong>Your energy is recharging, use a potion?</strong>';
            }
          };
          //display moxies
          if(components.get('potion_green')){
            checkAlert();
            var cell = t.rows[1].insertCell(0);
            cell.innerHTML = '<a href="use_item.php?id='+components.values['potion_green'].useID+'"><img src="images/items/potion_green.png" /></a>';
            var label = t.rows[2].insertCell(0);
            label.innerHTML += inventory.items['potion_green'].label+' <strong>('+components.get('potion_green')+'x)</strong>';;
          }
          //display refresh potions
          if(components.get('potion_blue')){
            checkAlert();
            var cell = t.rows[1].insertCell(0);
            cell.innerHTML = '<a href="use_item.php?id='+components.values['potion_blue'].useID+'"><img src="images/items/potion_blue.png" /></a>';
            var label = t.rows[2].insertCell(0);
            label.innerHTML += inventory.items['potion_blue'].label+' <strong>('+components.get('potion_blue')+'x)</strong>';
          }
        break;
    }
  }
  else{
    var info = document.createElement('div');
    info.innerHTML = "Hello there! You have fortytwo's UniCreatures component count script enabled, but have not set your information cookies! Go to <a href='inventory.php?id="+uc.getUserId()+"'>your inventory</a>, the script will update automatically.";
    info.setAttribute('style', 'background-color: #ffc0cb; color: red; font-weight: bold; text-align:center; padding:1em;margin-bottom:0.3em;');
    document.getElementById('container').insertBefore(info, document.getElementById('header'));
  }
  components.save();
}
ready = true;
})();