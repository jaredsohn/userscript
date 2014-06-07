// ==UserScript==
// @name           Jumbo Price Filter
// @version        2
// @namespace      http://ellab.org/
// @description    Add filters in hardware price list in jumbo-computer.com
// @include        http://jumbo-computer.com/pricelist.asp
// @include        http://www.jumbo-computer.com/pricelist.asp
// ==/UserScript==

/*
Author: Angus http://angusdev.mysinablog.com/
              http://angusdev.blogspot.com/
Date:   2009-11-26

Version history:
2    26-Nov-2009    Add support of 2HD, 3HD, CHD, HDC and NAS
                    Add speed filter for CDR and DVD
                    Fix the bug that will treat 40G, 37.2GB as brand name
1    02-May-2008    Initial release
*/

(function(){

var dataset = new Array();
var FILTERS = [
  {id:'brand',     name:'Brand'      },
  {id:'cardtype',  name:'Card Type'  },
  {id:'device',    name:'Device'     },
  {id:'interface', name:'Interface'  },
  {id:'size',      name:'Size',      sort:sortFloat },
  {id:'vgachip',   name:'Modal'      },
  {id:'speed',     name:'Speed',     sort:sortFloat },
  {id:'capacity',  name:'Capacity',  sort:sortMemory }
];
// init the set
for (var i=0;i<FILTERS.length;i++) {
  FILTERS[i].set = new Array();
}

function sortFloat(a, b) {
  return parseFloat(a, 10) - parseFloat(b, 10);
}

function sortMemory(a, b) {
  if (a.match(/[M|G|T]B$/) && b.match(/[M|G|T]B$/)) {
    var na = parseInt(a, 10);
    var nb = parseInt(b, 10);
    if (a.match(/MB$/)) na *= 1024;
    if (a.match(/GB$/)) na *= 1024 * 1024;
    if (a.match(/TB$/)) na *= 1024 * 1024 * 1024;
    if (b.match(/MB$/)) nb *= 1024;
    if (b.match(/GB$/)) nb *= 1024 * 1024;
    if (b.match(/TB$/)) nb *= 1024 * 1024 * 1024;

    return na - nb;
  }
  else {
    return a - b;
  }
}

// emulate the javascript array as a Set
function addSet(set, value) {
  for (var i=0;i<set.length;i++) {
    if (set[i] == value) return;
  }
  set.push(value);
}

function onChangeFilter(e) {
  var matched = new Array();
  for (var i=0;i<dataset.length;i++) {
    matched.push(true);
  }

  for (var i=0;i<FILTERS.length;i++) {
    var id = FILTERS[i].id;
    var opt = document.getElementById('gm-select-' + id);
    if (opt) {
      var value = opt.value;
      if (value) {
        for (var j=0;j<dataset.length;j++) {
          if (matched[j]) {
            var attrvalue = eval('dataset[' + j + '].attr.' + id);
            if (value != attrvalue) {
              matched[j] = false;
            }
          }
        }
      }
    }
  }

  for (var i=0;i<dataset.length;i++) {
    dataset[i].container.style.display = (matched[i]?'':'none');
  }
}

function buildSelect(id, name, set) {
  var opt = document.createElement('select');
  opt.setAttribute('id', 'gm-select-' + id);
  opt.addEventListener('change', onChangeFilter, 0);

  // add a blank
  opt.options.add(new Option('--- ' + name + ' ---', ''));
  for (var i=0;i<set.length;i++) {
    opt.options.add(new Option(set[i], set[i]));
  }

  return opt;
}

function getAttribute(type, name) {
  var attr = {};

  var category = name.match(/^\[([^\]]+)\]/);
  if (category) category = category[1];

  // replace the starting [*]
  name = name.replace(/^\[[^\]]+\]\s*/, '');

  if (type == 'VGA') {
    var vgachip = name.match(/^[^\d]+\s+([a-zA-z]+\d{3,4})\s*/);
    if (!vgachip) vgachip = name.match(/^[^\d]+\s+(\d{3,4}[a-zA-z]+)\s*/);
    if (vgachip) attr.vgachip = vgachip[1];
  }

  if (type == 'RAM' || type == 'HDD' || type == '2HD' || type == '3HD' || type == 'CHD' || type == 'MAS' || type == 'NAS') {
    var capacity = name.match(/([\d\.]+[M|G|T]B)/);
    if (capacity) {
      capacity = capacity[1];
      // check at least 128MB
      if ((!capacity.match(/MB$/) || parseInt(capacity, 10) >= 128)) {
        // remove the .0
        attr.capacity = capacity.replace(/\.0+([^\d])/, '$1');
      }
    }
  }

  if (type == 'MIS') {
    // Micro Storage starts with [Card Type]
    if (category) {
      attr.cardtype =
         category=='CF'?'CF - Compact Flash':
        (category=='F'?'F - Flash Memory':
        (category=='MMCM'?'MMCM - MultiMediaCard Mobile':
        (category=='MS'?'MS - Memory Stick':
        (category=='SD'?'SD - Secure Digital':
        (category=='TF'?'TF - TransFlash':
        (category=='XD'?'XD - Extreme Digital':
         category
        ))))));
    }
  }

  if (type == 'RAM') {
    // Some RAM starts with [Device]
    attr.device =
       category=='NB'?'Notebook':
      (category=='PR'?'Printer':
      (category?category:'Desktop'
      ));
  }

  if (type == 'HDD') {
    // Some HDD starts with [Device]
    attr.device =
       category=='NB'?'Notebook':
      (category=='S'?'SCSI':
      (category=='FC'?'Fibre Channel':
      (category?category:'Desktop'
      )));
  }

  if (type == 'MIS') {
    var capacity = name.match(/([\d]+[M|G|T]B?)/);
    if (capacity) {
      attr.capacity = capacity[1];
      if (!attr.capacity.match(/B$/)) attr.capacity += 'B';
    }
  }

  if (type == 'HDD' || type == 'MAS') {
    var pattern = ['USB(\\s*\\d\\.\\d)?', 'SCSI', 'IEEE', 'IDE', 'S?ATA', 'SAS'];
    for (var i=0;i<pattern.length;i++) {
      var interface = name.match(' (' + pattern[i] + ')');
      if (interface) {
        attr.interface = interface[1];
        if (attr.interface == 'SAS') attr.interface = 'Serial Attached SCSI';
      }
    }
  }

  var brand = name.match(/^([^\s]*)\s/);
  if (brand) {
    brand = brand[1];
    // some memory use size at the beginning of the product name
    if (!brand.match(/^[\d\.]+[M|G|T]B?$/)) {
      attr.brand = brand;
    }
  }

  if (type != '2HD' && type != '3HD' && type != 'CHD') {
    var size = name.match(/(\d*\.?\d*")/);
    if (size) {
      attr.size = size[1];
      if (type == 'LCD') {
        attr.size = attr.size.replace(/\.\d+([^\d])/, '$1');
      }
    }
  }

  if (type == 'CDR' || type == 'DVD') {
    var speed = name.match(/\s(\d+X)\s/);
    if (speed) {
      attr.speed = speed[1];
    }
  }

  return attr;
}

var opt = document.evaluate("//form[@name='frmPriceList']//select[@name='ProductTypeCode']//option[@selected]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var type = opt?opt.value:'';

// build the product list to "dataset"
var productTable = document.getElementById('Table8');
for (var i=1;i<productTable.rows.length;i++) {
  var containertr = productTable.rows[i];
  var table = containertr.getElementsByTagName('table')[0];
  var tr = table.rows[0];
  if (tr.cells.length <= 1) continue;
  var name = tr.cells[0].textContent;

  // Extract attributes from the product name
  var attr = getAttribute(type, name);
  for (var j=0;j<FILTERS.length;j++) {
    var val = eval('attr.' + FILTERS[j].id);
    if (val) addSet(FILTERS[j].set, val);
  }

  dataset.push({container:containertr, tr:tr, name:name, attr:attr});
}

if (dataset.length == 0) return;

var tr = document.getElementById('Table6').insertRow(document.getElementById('Table6').rows.length);
tr.insertCell(0);
var td = tr.insertCell(1);
for (var i=0;i<FILTERS.length;i++) {
  if (FILTERS[i].set.length) {
    if (FILTERS[i].sort) {
      FILTERS[i].set.sort(FILTERS[i].sort);
    }
    else {
      FILTERS[i].set.sort();
    }

    td.appendChild(buildSelect(FILTERS[i].id, FILTERS[i].name, FILTERS[i].set));
  }
}
td.width = '100%';
document.getElementById('Table4').rows[0].cells[0].getElementsByTagName('img')[0].height = '124';
document.getElementById('Table4').rows[0].cells[2].getElementsByTagName('img')[0].height = '124';

})();