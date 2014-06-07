// ==UserScript==
// @name           Tarsnap Account Activity
// @namespace      http://timmorgan.org/userscripts/tarsnap_account_activity.user.js
// @include        https://www.tarsnap.com/manage.cgi?address=*
// ==/UserScript==

by_machine_view = document.body.innerHTML.indexOf('usage by machine') > -1;
verbose_view = document.body.innerHTML.indexOf('account activity (verbose)') > -1;

function get_byte_values(value_type) {
  var bandwidth = {};
  var trs = document.getElementsByTagName('tr');
  
  for(var i=0; i<trs.length; i++) {
    var tds = trs[i].getElementsByTagName('td');
    var date = tds[by_machine_view ? 0 : 1].innerHTML;
    var byte_col, type_col, machine;
    if(by_machine_view) {
      byte_col = 2;
      type_col = 1;
      machine = document.body.innerHTML.match(/by machine <tt>(.+?)<\/tt>/)[1];
    } else if (verbose_view) {
      byte_col = 4;
      type_col = 3;
      machine = tds[2].innerHTML;
    } else {
      byte_col = 3;
      type_col = 2;
      machine = 'all';
    }
    if(date.match(/\d/)) {
      var bytes = parseInt(tds[byte_col].innerHTML);
      if(tds[type_col].innerHTML.indexOf(value_type) > -1) {
        bandwidth[machine] = bandwidth[machine] || {}
        bandwidth[machine][date] = bandwidth[machine][date] || 0.0
        bandwidth[machine][date] += bytes;
      }
    }
  }
  return bandwidth;
}

function get_bandwidth() {
  return get_byte_values('bandwidth');
}

function get_usage() {
  return get_byte_values('storage');
}

function build_line_chart_url(hash_of_data, title) {
  var labels = [];
  var data = [];
  var machines = [];
  var max = 0;
  for(var m in hash_of_data) {
    machines.push(m);
  }
  labels.sort();
  for(var m=0; m<machines.length; m++) {
    for(var d in hash_of_data[machines[m]]) {
      if(!in_array(labels, d)) labels.push(d)
    }
  }
  labels.sort();
  for(var m=0; m<machines.length; m++) {
    for(var d=0; d<labels.length; d++) {
      var bytes = hash_of_data[machines[m]][labels[d]];
      if(bytes > max) max = bytes;
      data[m] = data[m] || [];
      data[m].push(bytes || 0);
    }
  }
  var datasets = [];
  for(var m=0; m<machines.length; m++) {
    datasets.push(data[m].join(','));
  }
  var data_string = datasets.join('|');
  for(var i=0; i<labels.length; i++) {
    labels[i] = labels[i].replace(/^\d+\-\d+\-/, '');
  }
  return "http://chart.apis.google.com/chart?cht=lc&chd=t:" + data_string + "&chds=0," + max + "&chs=700x400&chxt=x,y,y&chxl=0:|" + labels.join('|') + "|2:|MB&chxr=1,0," + (max/1024/1024).toFixed(0) + "&chxs=0,cccccc,,,,cccccc|1,cccccc,,,,eeeeee&chxtc=0,5|1,-700&chtt=" + title + '&chco=FF0000,00FF00,0000FF,00CCCC,CCC000,CC6600,FF00CC,9900FF&chdl=' + machines.join('|');
}

function in_array(arr, item) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == item) {
      return true;
    }
  }
  return false;
}

if(document.getElementsByTagName('table').length > 0) {
  var table = document.getElementsByTagName('table')[0];
  
  bandwidth = get_bandwidth();
  var img = document.createElement('img');
  img.setAttribute('src', build_line_chart_url(bandwidth, 'Bandwidth'));
  img.style.display = 'block';
  img.style.margin = '20px';
  table.parentNode.insertBefore(img, table);

  usage = get_usage();
  var img = document.createElement('img');
  img.setAttribute('src', build_line_chart_url(usage, 'Storage'));
  img.style.display = 'block';
  img.style.margin = '20px';
  table.parentNode.insertBefore(img, table);
}
