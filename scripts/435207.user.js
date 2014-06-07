// ==UserScript==
// @name        MTurk HIT DataBase Testing
// @namespace   localhost
// @description Extended ability to search HITs you have worked on and other useful //tools (CSV export/import, requester notes, requester block, //pending/projectedearnings)
// @include     https://www.mturk.com/mturk/searchbar*
// @include     https://www.mturk.com/mturk/findhits*
// @include     https://www.mturk.com/mturk/viewhits*
// @include     https://www.mturk.com/mturk/viewsearchbar*
// @include     https://www.mturk.com/mturk/sortsearchbar*
// @include     https://www.mturk.com/mturk/sorthits*
// @include     https://www.mturk.com/mturk/dashboard
// @include     https://www.mturk.com/mturk/preview?*
// @version     1.5.6
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require     http://code.highcharts.com/highcharts.js
// @require     https://raw.githubusercontent.com/eligrey/FileSaver.js/master/FileSaver.js
// @downloadURL https://userscripts.org/scripts/source/149548.user.js
// @updateURL   https://userscripts.org/scripts/source/149548.user.js
// ==/UserScript==

//
// 2012-10-03 0.9.7: This is rewrite of MTurk Extended HIT Search (http://userscripts.org/scripts/show/146277)
//                   with some extra features (and some missing for now: search by date).
//                   It now uses IndexedDB (http://en.wikipedia.org/wiki/Indexed_Database_API)
//
// 2012-10-04 0.9.8: Improved use of indexes, check Pending Payment HITs
//            0.9.9: Minor improvements
//
// 2012-10-04 0.10:  Added date options
//
// 2012-10-07 0.11:  Requester notes, bug fixes
//            0.12:  CSV export
//
// 2012-10-09 0.13: "Block" requesters or specific HITs
//
// 2012-10-10 0.14: Requester Overview, shows summary of all requesters in DB
//
// 2012-10-11 0.15: Blocked HITs are always on bottom of the page
//
// 2012-10-14 0.16: Requester Overview improvements
//
// 2012-10-17 0.17: Bug fixes and error checks
//
// 2012-10-18 0.18: Import HIT data from MTurk Extended HIT Search script
//
// 2012-10-21 0.19: Moved main interface to dashboard, show pending earnings on dashboard,
//                  summary of all requesters with pending HITs.
//
// 2012-10-23 0.20: Added Turkopticon (https://turkopticon.differenceengines.com/) links to overview pages
//            0.21: Fixed overview pages reward to include only 'Paid' and 'Approved - Pending Payment' HITs.
//
// 2012-10-28 0.22: Limited Auto Update.
//            0.23: Minor improvements
//
// 2012-10-30 0.24: Projected earnings for today
//
// 2012-11-02 0.25: Smarter Auto Update
//
// 2012-11-03 0.26: GUI update
//
// 2012-11-05 0.30: Extra non-amazonian script monkeys
//
// 2012-11-06 0.31: Projected earnings progress bar
//
// 2012-11-08 0.32: Minor GUI fixes to look better on Chrome. Looks like it now works on stable Chrome!
//
// 2012-11-13 0.33: Time limits now work with Requester Overview
//
// 2012-11-15 0.34: Bug/compatibility fixes
//
// 2012-11-18 0.40: Daily Overview, update database to use YYYY-MM-DD date format.
//
// 2012-11-22 0.41: R and T button on HIT preview page. Auto-Approval time.
//
// 2012-11-30 0.42: Changes on MTurk pages. Status page in now on one page!
//
// 2012-12-02 1.0: Added @downloadURL and @updateURL
//
// 2012-12-06 1.1: Requester details.
//                 Try to fetch few extra days at first update (not showing on status page).
//
// 2012-12-11 1.2: Import HITs from previously exported CSV-files.
//                 Removed Extended HIT Search import.
//
// 2012-12-13 1.3: Fix CSV-import to put empty string instead if undefined if feedback is empty.
//
// 2012-12-14 1.4: Rewritten database update more properly.
//
// 2012-12-16 1.5: Fixed broken Auto Update (forgot to check that on pervious update).
//
// 2013-08-20 1.5.5:Firefox 23 Compatibility Issues. Removed New Windows and replaced with a Faux Frame.
//					ReplacedTurkopticon Links with https versions
//
// 2013-11-06 1.5.6:Firefox 25 Compatibility Issues. Database transaction modes weren't working with defined variables.

FauxFrameobj = document.createElement('div');
FauxFrameobj.style.display = 'none'; 
FauxFrameobj.style.position = 'fixed';
FauxFrameobj.style.top = '10%';
FauxFrameobj.style.left = '10%';
FauxFrameobj.style.height = '80%';
FauxFrameobj.style.width = '80%';
FauxFrameobj.style.overflow = 'scroll';
FauxFrameobj.style.padding = '10px';
FauxFrameobj.style.backgroundColor = '#7fb4cf'; 
FauxFrameobj.name = "FauxFrame";
FauxFrameobj.ID = "FauxFrame";
FauxFrameobj.innerHTML = "";
body = document.getElementsByTagName('body')[0];
body.appendChild(FauxFrameobj);

var DAYS_TO_FETCH = [];
var DAYS_TO_FETCH_CHECK;

var HITStorage = {};
var indexedDB = window.indexedDB || window.webkitIndexedDB ||
                window.mozIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.mozIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.mozIDBKeyRange;

var IDBKeyRange = window.IDBKeyRange;

HITStorage.indexedDB = {};
HITStorage.indexedDB = {};
HITStorage.indexedDB.db = null;

HITStorage.indexedDB.onerror = function(e) {
  console.log(e);
};
var v = 4;

HITStorage.indexedDB.create = function() {

  var request = indexedDB.open("HITDB", v);

  request.onupgradeneeded = function (e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var new_empty_db = false;

    if(!db.objectStoreNames.contains("HIT")) {
      var store = db.createObjectStore("HIT", { keyPath: "hitId" });

      store.createIndex("date", "date", { unique: false });
      store.createIndex("requesterName", "requesterName", { unique: false });
      store.createIndex("title", "title", { unique: false });
      store.createIndex("reward", "reward", { unique: false });
      store.createIndex("status", "status", { unique: false });
      store.createIndex("requesterId", "requesterId", { unique: false });

      new_empty_db = true;
      
      // At first update try to get few extra days that do not show on status page
      localStorage['HITDB TRY_EXTRA_DAYS'] = 'YES';
    }
    if(!db.objectStoreNames.contains("STATS")) {
      var store = db.createObjectStore("STATS", { keyPath: "date" });
    }
    if(!db.objectStoreNames.contains("NOTES")) {
      var store = db.createObjectStore("NOTES", { keyPath: "requesterId" });
    }
    if(!db.objectStoreNames.contains("BLOCKS")) {
      var store = db.createObjectStore("BLOCKS", { keyPath: "id", autoIncrement: true });

      store.createIndex("requesterId", "requesterId", { unique: false });
    }

    if (new_empty_db == false)
    {
      alert("HIT DataBase date format must be upgraded (MMDDYYYY => YYYY-MM-DD)\n" +
            "Please don't close or reload this page until it's done.\n" + 
            "Press OK to start. This shouldn't take long. (few minutes max)" +
            "Sorry for the inconvenience.");
      HITStorage.update_date_format(true);
    }
    db.close();
    //alert("DataBase upgraded to version " + v + '!');
  }

  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    db.close();
  };

  request.onerror = HITStorage.indexedDB.onerror;
}

HITStorage.indexedDB.addHIT = function(hitData) {
  // Temporary extra check
  if (hitData.date.indexOf('-') < 0)
  {
    alert('Wrong date format in addHIT()!');
    return;  
  }  
  
var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
	HITStorage.indexedDB.db = e.target.result;
	  var db = HITStorage.indexedDB.db;
	  var trans = db.transaction(["HIT"], "readwrite");
	  var store = trans.objectStore("HIT");

	  var request = store.put(hitData);

	  request.onsuccess = function(e) {
  		db.close();
	  };

	  request.onerror = function(e) {
      console.log("Error Adding: ", e);
	  };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.importHITs = function(hitData) {
  var hits = hitData.length;
  var label = document.getElementById('status_label');
  
  var request = indexedDB.open("HITDB", v);
  	request.onsuccess = function(e) {
  HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readwrite");
    var store = trans.objectStore("HIT");

    putNextHIT();

    function putNextHIT()
    {
      if (hitData.length > 0)
      {
        store.put(hitData.pop()).onsuccess = putNextHIT;
        label.innerHTML = progress_bar(((hits-hitData.length)/hits*50), 50, '¦', '¦', '#7fb448', 'grey') + ' (' + hitData.length + ')';
      }
      else
      {
        HITStorage.enable_inputs();
        HITStorage.update_status_label('Import done', 'green');
        db.close();
      }
    }
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.addHITs = function(hitData, day_to_fetch, days_to_update) {
  var hits = hitData.length;
  if (day_to_fetch)
    var label = document.getElementById('status_label');
  
  var request = indexedDB.open("HITDB", v);
  	request.onsuccess = function(e) {
  HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readwrite");
    var store = trans.objectStore("HIT");

    putNextHIT();

    function putNextHIT()
    {
      if (hitData.length > 0)
      {
        store.put(hitData.pop()).onsuccess = putNextHIT;
        if (day_to_fetch)
          label.innerHTML = 'Saving ' + day_to_fetch.date + ': ' + progress_bar(((hits-hitData.length)/hits*40), 40, '¦', '¦', '#7fb448', 'grey');
      }
      else
      {
        // move to next day
        if (day_to_fetch)
        {
          HITStorage.indexedDB.updateHITstats(day_to_fetch);
          setTimeout(function() { HITStorage.do_update(days_to_update); }, 2000);
          HITStorage.update_status_label('Please wait: script monkeys are taking naps ??', 'red');
        }
        db.close();
      }
    }
	};
	request.onerror = HITStorage.indexedDB.onerror;
};


HITStorage.indexedDB.updateHITstats = function(date)
{
  // Temporary extra check
  if (date.date.indexOf('-') < 0)
  {
    alert('Wrong date format in updateHITstats()!');
    return;
  }
  
  var request = indexedDB.open("HITDB", v);
  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["STATS"], "readwrite");
    var store = trans.objectStore("STATS");

    var request = store.put(date);

    request.onsuccess = function(e) {
      db.close();
    };

    request.onerror = function(e) {
      console.log("Error Adding: ", e);
    };
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.prepare_update_and_check_pending_payments = function()
{
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
		var trans = db.transaction(["HIT"], "readonly");
		var store = trans.objectStore("HIT");
    var index = store.index('status');
    var range = IDBKeyRange.only('Approved&nbsp;- Pending&nbsp;Payment');

    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor && DAYS_TO_FETCH.length > 0)
      {
        for (var i=0; i<DAYS_TO_FETCH.length; i++)
        {
          if ( cursor.value.date == DAYS_TO_FETCH[i].date && cursor.value.reward>0 )
          {
            DAYS_TO_FETCH[i].pending_payments = true;
          }
        }
        cursor.continue();
      }
      else
      {
        if (DAYS_TO_FETCH.length>0) {
          db.close();
          HITStorage.update_status_label('Please wait: script monkeys are planning to fetch relevant status pages', 'red');
          setTimeout(function() { HITStorage.prepare_update(); }, 100);
        }
        else
        {
          db.close();
          HITStorage.update_done();
        }
      }
    };
  }
};

// check that number of hits in DB matches what is available
HITStorage.check_update = function()
{
  var request = indexedDB.open("HITDB", v);
	 request.onsuccess = function(e) {
	   HITStorage.update_status_label('Please wait: checking database', 'red');
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    var index = store.index('date');
    var range = IDBKeyRange.bound(DAYS_TO_FETCH_CHECK[DAYS_TO_FETCH_CHECK.length-1].date, DAYS_TO_FETCH_CHECK[0].date, false, false);

    index.count(range).onsuccess = function(event) {
      var count = event.target.result;
      var submitted_hits = 0;
      
      for (var i=0; i<DAYS_TO_FETCH_CHECK.length; i++)
      {
        submitted_hits += DAYS_TO_FETCH_CHECK[i].submitted;
      }

      if (submitted_hits == count)
      {
        db.close();        
        HITStorage.update_done();
      }
      else
      {
        if (confirm("?? ERROR! Number of HITs in DataBase does not match number of HITs available! (" + count + " != " + submitted_hits + ")\n"
                   + "Would you like to refetch all status pages now?"))
        {
          db.close();        
          DAYS_TO_FETCH = DAYS_TO_FETCH_CHECK.slice(0);
          HITStorage.update_status_label('Please wait: new script monkeys are fetching relevant status pages', 'red');
          setTimeout(function() { HITStorage.do_update(DAYS_TO_FETCH.length); }, 100);
        }
        else
        {
          db.close();        
          HITStorage.update_done();
        }
      }
    };
  }
};

HITStorage.prepare_update = function()
{
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
		var trans = db.transaction(["STATS"], "readonly");
		var store = trans.objectStore("STATS");
    var range = IDBKeyRange.bound(DAYS_TO_FETCH[DAYS_TO_FETCH.length-1].date, DAYS_TO_FETCH[0].date, false, false);

    store.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor && DAYS_TO_FETCH.length > 0)
      {
        for (var i=0; i<DAYS_TO_FETCH.length; i++)
        {
          if ( cursor.value.date == DAYS_TO_FETCH[i].date
                && cursor.value.submitted == DAYS_TO_FETCH[i].submitted
                && cursor.value.approved == DAYS_TO_FETCH[i].approved
                && cursor.value.rejected == DAYS_TO_FETCH[i].rejected
                && cursor.value.pending == DAYS_TO_FETCH[i].pending)
          {
            // This day is already in DB and stats match => no need to fetch
            // unless there are 'Approved - Pending Payment' HITs
            if (DAYS_TO_FETCH[i].pending_payments === undefined || DAYS_TO_FETCH[i].pending_payments == false)
              DAYS_TO_FETCH.splice(i,1);
          }
        }
        cursor.continue();
      }
      else
      {
        if (DAYS_TO_FETCH.length>0) {
          db.close();
          setTimeout(function() { HITStorage.do_update(DAYS_TO_FETCH.length); }, 100);
        }
        else
        {
          db.close();
          HITStorage.update_done();
        }
      }
    };
  }
};

HITStorage.indexedDB.term_matches_HIT = function(term, hit)
{
  var keys = ['date', 'requesterName', 'title', 'feedback', 'hitId', 'requesterId'];
  for (var k in keys)
  {
    if (hit[keys[k]] != null && hit[keys[k]].match(term))
    {
      return true;
    }
  }
  return false;
}

HITStorage.indexedDB.term_matches_HIT = function(term, hit)
{
  var keys = ['date', 'requesterName', 'title', 'feedback', 'hitId', 'requesterId'];
  var re = new RegExp(escapeRegExp(term),"ig");
  for (var k in keys)
  {
    //for testing
    console.log(hit[keys[k]]+" "+escapeRegExp(term));
    if (hit[keys[k]] != null && re.test(hit[keys[k]].trim()))
    {
      return true;
    }
  }
  return false;
}

function hit_sort_func()
{
  return function(a,b) {
    if (a.date == b.date) {
      if (a.requesterName < b.requesterName)
        return -1;
      if (a.requesterName > b.requesterName)
        return 1;
      if (a.title < b.title)
        return -1;
      if (a.title > b.title)
        return 1;
      if (a.status < b.status)
        return -1;
      if (a.status > b.status)
        return 1;
    }
    if (a.date > b.date)
      return 1;
    if (a.date < b.date)
      return -1;
  };
}

HITStorage.indexedDB.getHITs = function(options) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    
    var req;
    var results = [];
    var index;
    var range;

    if (options.from_date || options.to_date)
    {
      if (options.from_date != '' || options.to_date != '')
      {
        index = store.index('date');
        if (options.from_date == options.to_date)
        {
          range = IDBKeyRange.only(options.from_date);
        }
        else if (options.from_date != '' && options.to_date != '')
        {
          range = IDBKeyRange.bound(options.from_date, options.to_date, false, false);
        }
        else if (options.from_date == '' && options.to_date != '')
        {
          range = IDBKeyRange.upperBound(options.to_date, false);
        }
        else
        {
          range = IDBKeyRange.lowerBound(options.from_date, false);
        }
        req = index.openCursor(range);
      }
    }
    else if (options.index && options.index != '')
    {
      index = store.index(options.index);
      range = IDBKeyRange.only(options.term);
      req = index.openCursor(range);
    }
    else if (options.status == 'Rejected' || options.status == 'Pending Approval' 
              || options.status == 'Approved' || options.status == 'Paid')
    {
      var s = (options.status == 'Approved')? 'Approved&nbsp;- Pending&nbsp;Payment' : options.status;
      options.index = 'status';
      index = store.index(options.index);
      range = IDBKeyRange.only(s);
      req = index.openCursor(range);
    }
    else
    {
      req = store.openCursor();
    }
    
    req.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        if (HITStorage.indexedDB.matchHIT(cursor.value, options))
          results.push(cursor.value);

        cursor.continue();
      }
      else {
        results.sort(hit_sort_func());

        if (options.export_csv && options.export_csv == true)
          HITStorage.export_csv(results);
        else
          HITStorage.show_results(results);
        
        if (options.donut == '---')
          document.getElementById('container').style.display = 'none';
        else if (options.donut != '')
          HITStorage.prepare_donut(results, options.donut);
      }
      db.close();
    };
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

//
// Show summary of all requesters
//
HITStorage.indexedDB.requesterOverview = function(options) {



  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {

    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;

      var trans = db.transaction(["HIT"], "readonly");

    var store = trans.objectStore("HIT");
    var index;
    var req;
    

    // [ requesterId, requesterName, sum(hits), sum(rewards), rejected, pending ]
    var results = [];
    var tmp_results = {};
    if (options.from_date || options.to_date)
    {
      if (options.from_date != '' || options.to_date != '')
      {
        index = store.index('date');
        if (options.from_date == options.to_date)
        {
          range = IDBKeyRange.only(options.from_date);
        }
        else if (options.from_date != '' && options.to_date != '')
        {
          range = IDBKeyRange.bound(options.from_date, options.to_date, false, false);
        }
        else if (options.from_date == '' && options.to_date != '')
        {
          range = IDBKeyRange.upperBound(options.to_date, false);
        }
        else
        {
          range = IDBKeyRange.lowerBound(options.from_date, false);
        }
        req = index.openCursor(range);
      }
      req.onsuccess = function(event) {
                      HITStorage.update_status_label('req.onsuccess', 'red');
        var cursor = event.target.result;
        if (cursor) {
          var hit = cursor.value;
          var rejected = (hit.status == 'Rejected') ? 1 : 0;
          var pending = (hit.status.match(/Approved|Paid|Rejected/) == null) ? 1 : 0;
          var reward = (pending>0 || rejected>0 )? 0: hit.reward;
  
          if (tmp_results[hit.requesterId] === undefined)
          {
            tmp_results[hit.requesterId] = [];
            tmp_results[hit.requesterId][0] = hit.requesterId;
            tmp_results[hit.requesterId][1] = hit.requesterName;
            tmp_results[hit.requesterId][2] = 1;
            tmp_results[hit.requesterId][3] = reward;
            tmp_results[hit.requesterId][4] = rejected;
            tmp_results[hit.requesterId][5] = pending;
          }
          else
          {
            tmp_results[hit.requesterId][1] = hit.requesterName;
            tmp_results[hit.requesterId][2] += 1;
            tmp_results[hit.requesterId][3] += reward;
            tmp_results[hit.requesterId][4] += rejected;
            tmp_results[hit.requesterId][5] += pending;
          }
          cursor.continue();
        }
        else {
          for (var key in tmp_results) {
            results.push(tmp_results[key]);
          }
          // sort by total reward
          results.sort(function(a,b) { return b[3]-a[3]; });
          if (options.export_csv == true)
            HITStorage.show_requester_overview_csv(results);
          else        
            HITStorage.show_requester_overview(results, '(' + options.from_date + '–' + options.to_date + ')');
          HITStorage.update_status_label('Script monkeys are ready', 'green');
          setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);
          HITStorage.enable_inputs();
        }
        db.close();
      };
    }
    else {
      index = store.index('requesterId');
      req = index.openCursor();
      req.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
          var hit = cursor.value;
          var rejected = (hit.status == 'Rejected') ? 1 : 0;
          var pending = (hit.status.match(/Approved|Paid|Rejected/) == null) ? 1 : 0;
          var reward = (pending>0 || rejected>0 )? 0: hit.reward;
          if (results.length == 0)
          {
            results.push([hit.requesterId, hit.requesterName, 1, reward, rejected, pending]);
          }
          else if (results[0][0] == hit.requesterId)
          {
            results[0][2] += 1;
            results[0][3] += reward;
            results[0][4] += rejected;
            results[0][5] += pending;
          }
          else
          {
            results.unshift([hit.requesterId, hit.requesterName, 1, reward, rejected, pending]);
          }
          cursor.continue();
        }
        else {
          // sort by total reward
          results.sort(function(a,b) { return b[3]-a[3]; });
          if (options.export_csv == true)
            HITStorage.show_requester_overview_csv(results);
          else        
            HITStorage.show_requester_overview(results);
          HITStorage.update_status_label('Script monkeys are ready', 'green');
          setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);
          HITStorage.enable_inputs();
        }
        db.close();
      };
    }
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

//
// Show summary of one requester
//
HITStorage.indexedDB.showRequester = function(requesterId) {
  var request = indexedDB.open("HITDB", v);
  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    var index;
    var results = [];

    index = store.index('requesterId');
    var range = IDBKeyRange.only(requesterId);
    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      }
      else {
        results.sort(function(a,b)
          {
            if (a.date > b.date)
              return -1;
            if (a.date < b.date)
              return 1;
            return 0;
          });
        HITStorage.show_requester(results);
        HITStorage.update_status_label('Script monkeys are ready', 'green');
        setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);
        HITStorage.enable_inputs();
      }
      db.close();
    };
  };
  request.onerror = HITStorage.indexedDB.onerror;
};


// Show summary of pending HITs
HITStorage.indexedDB.pendingOverview = function(options) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    var index;
    var req;
    
    // [ requesterId, requesterName, sum(pendings), sum(rewards) ]
    var results = [];
    var tmp_results = {};

    index = store.index('status');
    range = IDBKeyRange.only('Pending Approval');
    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var hit = cursor.value;
        if (tmp_results[hit.requesterId] === undefined)
        {
          tmp_results[hit.requesterId] = [];
          tmp_results[hit.requesterId][0] = hit.requesterId;
          tmp_results[hit.requesterId][1] = hit.requesterName;
          tmp_results[hit.requesterId][2] = 1;
          tmp_results[hit.requesterId][3] = hit.reward;
        }
        else
        {
          tmp_results[hit.requesterId][1] = hit.requesterName;
          tmp_results[hit.requesterId][2] += 1;
          tmp_results[hit.requesterId][3] += hit.reward;
        }
        cursor.continue();
      }
      else {
        for (var key in tmp_results) {
          results.push(tmp_results[key]);
        }
        // sort by pending hits
        results.sort(function(a,b) { return b[2]-a[2]; });
        if (options.export_csv == true)
          HITStorage.show_pending_overview_csv(results);
        else        
          HITStorage.show_pending_overview(results);
        HITStorage.update_status_label('Script monkeys are ready', 'green');
        setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);
        HITStorage.enable_inputs();
      }
      db.close();
    };
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

// Show summary of daily stats
HITStorage.indexedDB.statusOverview = function(options) {
  var request = indexedDB.open("HITDB", v);
  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["STATS"], "readonly");
    var store = trans.objectStore("STATS");
    var req;
    
    var results = [];

    if (options.from_date || options.to_date)
    {
      if (options.from_date != '' || options.to_date != '')
      {
        if (options.from_date == options.to_date)
        {
          range = IDBKeyRange.only(options.from_date);
        }
        else if (options.from_date != '' && options.to_date != '')
        {
          range = IDBKeyRange.bound(options.from_date, options.to_date, false, false);
        }
        else if (options.from_date == '' && options.to_date != '')
        {
          range = IDBKeyRange.upperBound(options.to_date, false);
        }
        else
        {
          range = IDBKeyRange.lowerBound(options.from_date, false);
        }
        req = store.openCursor(range);
      }
    }
    else
    {
      req = store.openCursor();
    }
    req.onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        if (cursor.value.submitted > 0)
          results.push(cursor.value);
        cursor.continue();
      }
      else {
        if (options.export_csv == true)
          HITStorage.show_status_overview_csv(results);
        else        
          HITStorage.show_status_overview(results, '(' + options.from_date + '–' + options.to_date + ')');
        HITStorage.update_status_label('Script monkeys are ready', 'green');
        setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);
        HITStorage.enable_inputs();
      }
      db.close();
    };
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.getHIT = function(id) {
var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
	  var trans = db.transaction(["HIT"], "readonly");
	  var store = trans.objectStore("HIT");

	  var request = store.get(id);

	  request.onsuccess = function(e) {
			db.close();
			showDetails(e.target.result.note);
	  };

	  request.onerror = function(e) {
			console.log("Error Getting: ", e);
	  };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.addNote = function(id, note) {
var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
	HITStorage.indexedDB.db = e.target.result;
	  var db = HITStorage.indexedDB.db;
	  var trans = db.transaction(["NOTES"], "readwrite");
	  var store = trans.objectStore("NOTES");
    var request;

    if (note == '')
  	  request = store.delete(id);
  	else
  	  request = store.put({requesterId: id, note: note});

	  request.onsuccess = function(e) {
  		db.close();
	  };

	  request.onerror = function(e) {
      console.log("Error Adding: ", e);
	  };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.blockHITS = function(requesterId, title, hitElement, titleElement) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
		
    if (!db.objectStoreNames.contains("BLOCKS"))
    {
      db.close();
      return;
    }
		var trans = db.transaction(["BLOCKS"], "readonly");
		var store = trans.objectStore("BLOCKS");
    var index = store.index("requesterId");
    var range = IDBKeyRange.only(requesterId);
    
    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor && cursor.value.re)
      {
        if (cursor.value.re.test(title))
        {
          hitElement.style.display = 'none';
          titleElement.addEventListener("click", unblock_func(requesterId, title));
          
          titleElement.style.fontSize = 'small';          
          
          // move blocked hits to the bottom
          var table = hitElement.parentNode.parentNode.parentNode.parentNode.parentNode;
          var hit = hitElement.parentNode.parentNode.parentNode.parentNode;
          table.removeChild(hit);
          table.appendChild(hit);
        }
        cursor.continue();
      }
      else
      {
        db.close();
      }
    };
 	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.addBlock = function(requesterId, re) {
var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
	HITStorage.indexedDB.db = e.target.result;
	  var db = HITStorage.indexedDB.db;
	  var trans = db.transaction(["BLOCKS"], "readwrite");
	  var store = trans.objectStore("BLOCKS");
    var request;

    request = store.put({requesterId: requesterId, re: re});

	  request.onsuccess = function(e) {
  		db.close();
	  };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

// Removes all blocks for requesterId, where RE matches this HIT title
HITStorage.indexedDB.removeBlocks = function(requesterId, title) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
    if (!db.objectStoreNames.contains("BLOCKS"))
    {
      db.close();
      return;
    }
		var trans = db.transaction(["BLOCKS"], "readwrite");
		var store = trans.objectStore("BLOCKS");
		var index = store.index("requesterId");
    var range = IDBKeyRange.only(requesterId);

    index.openCursor(range).onsuccess = function(event)
    {
      var cursor = event.target.result;
      if (cursor)
      {
        if (cursor.value.re.test(title))
          store.delete(cursor.value.id);
        db.close();
      }
    };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.updateNoteButton = function(id, label) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
		
    if (!db.objectStoreNames.contains("NOTES"))
    {
      label.title = 'Update HIT database on statusdetail page to use this feature';
      db.close();
      return;
    }
		var trans = db.transaction(["NOTES"], "readonly");
		var store = trans.objectStore("NOTES");

    store.get(id).onsuccess = function(event)
    {
      if (event.target.result === undefined)
      {
        label.textContent = '';
      }
      else
      {
        var note = event.target.result.note;
        label.textContent = note;
        label.style.border = '1px dotted';
        if (note.indexOf('!') >= 0)
          label.style.color = 'red';
        else
          label.style.color = 'black';
      }
      db.close();
    };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};


HITStorage.indexedDB.colorRequesterButton = function(id, button) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
    if (!db.objectStoreNames.contains("HIT"))
    {
      button.title = 'Update HIT database on statusdetail page to use this feature';
      db.close();
      return;
    }
		var trans = db.transaction(["HIT"], "readonly");
		var store = trans.objectStore("HIT");

		var index = store.index("requesterId");
    index.get(id).onsuccess = function(event)
    {
      if (event.target.result === undefined)
      {
        button.style.backgroundColor = 'pink';
      }
      else
      {
        button.style.backgroundColor = 'lightgreen';
        button.style.fontWeight = 'bold';
      }
      db.close();
    };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.colorTitleButton = function(title, button) {
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
		HITStorage.indexedDB.db = e.target.result;
		var db = HITStorage.indexedDB.db;
    if (!db.objectStoreNames.contains("HIT"))
    {
      button.title = 'Update HIT database on statusdetail page to use this feature';
      db.close();
      return;
    }
		var trans = db.transaction(["HIT"], "readonly");
		var store = trans.objectStore("HIT");

		var index = store.index("title");
    index.get(title).onsuccess = function(event)
    {
      if (event.target.result === undefined)
      {
        button.style.backgroundColor = 'pink';
      }
      else
      {
        button.style.backgroundColor = 'lightgreen';
        button.style.fontWeight = 'bold';
      }
      
      db.close();
    };
	};
	request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.deleteDB = function () {
  var deleteRequest = indexedDB.deleteDatabase("HITDB");
  deleteRequest.onsuccess = function (e)
  {
    alert("deleted");
  }
  deleteRequest.onblocked = function (e)
  {
    alert("blocked");
  }
  deleteRequest.onerror = HITStorage.indexedDB.onerror;
}

HITStorage.indexedDB.get_pending_approvals = function() {
  var element = document.getElementById('pending_earnings_value');
  var header_element = document.getElementById('pending_earnings_header');
  if (element == null)
    return;  
  
  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    
    var result = 0;
    var index;
    var range;

    index = store.index('status');
    range = IDBKeyRange.only('Pending Approval');
    
    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        result += cursor.value.reward;
        cursor.continue();
      }
      else {
        element.textContent = '$' + result.toFixed(2);
        if (header_element != null)
          header_element.textContent = 'Pending earnings (HITDB updated: ' + localStorage['HITDB UPDATED']+ ')';
      }
      db.close();
    };
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.get_pending_payments = function() {
  var element = document.getElementById('pending_earnings_value');
  if (element == null)
    return;  

  var request = indexedDB.open("HITDB", v);
	request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    
    var result = 0;
    var index;
    var range;

    index = store.index('status');
    range = IDBKeyRange.only('Approved&nbsp;- Pending&nbsp;Payment');
    
    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        result += cursor.value.reward;
        cursor.continue();
      }
      else {
        element.title = 'Approved - Pending Payment: $' + result.toFixed(2);
      }
    }
    db.close();
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

HITStorage.indexedDB.get_todays_projected_earnings = function(date) {
  var element = document.getElementById('projected_earnings_value');
  if (element == null)
    return;  

  var request = indexedDB.open("HITDB", v);
  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
    var db = HITStorage.indexedDB.db;
    var trans = db.transaction(["HIT"], "readonly");
    var store = trans.objectStore("HIT");
    
    var result = 0;
    var rejected = 0;
    var index;
    var range;

    index = store.index('date');
    range = IDBKeyRange.only(date);
    
    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        if (cursor.value.status == 'Rejected')
          rejected += cursor.value.reward;
        else
          result += cursor.value.reward;
        cursor.continue();
      }
      else {
        element.textContent = '$' + result.toFixed(2);
        element.title = '$' + rejected.toFixed(2) + ' rejected';
        
        if (localStorage['TODAYS TARGET'] !== undefined)
        {
          var target = parseFloat(localStorage['TODAYS TARGET']).toFixed(2);
          var my_target = document.getElementById('my_target');
          
          var progress = Math.floor(result/target*40);
          if (progress > 40)
            progress = 40;
          my_target.innerHTML = progress_bar(progress, 40, '¦', '¦', '#7fb448', 'grey') + '&nbsp;' +
            ((result>target)? '+' : '') + (result-target).toFixed(2);
          my_target.style.fontSize = '9px';
        }
      }
    }
    db.close();
  };
  request.onerror = HITStorage.indexedDB.onerror;
};

// Update database date format from MMDDYYYY to YYYY-MM-DD
// Shouldn't break anything even if used on already updated db
HITStorage.update_date_format = function(verbose)
{
  var request = indexedDB.open("HITDB", v);
  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
  		 var db = HITStorage.indexedDB.db;
		  var trans = db.transaction(["HIT"], "readwrite");
		  var store = trans.objectStore("HIT");
    
    store.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor)
      {
        if (cursor.value.date.indexOf('-') < 0)
        {
          var i = cursor.value;
          i.date = convert_date(i.date);
          i.requesterName = i.requesterName.trim(); 
          i.title = i.title.trim();
          cursor.update(i);
        }
        cursor.continue();
      }
      else
      {
        db.close();
        HITStorage.update_stats_date_format(verbose);
      }
    };
  }
}
  
HITStorage.update_stats_date_format = function(verbose)
{
  var request = indexedDB.open("HITDB", v);
  request.onsuccess = function(e) {
    HITStorage.indexedDB.db = e.target.result;
  		 var db = HITStorage.indexedDB.db;
		  var trans = db.transaction(["STATS"], "readwrite");
		  var store = trans.objectStore("STATS");

    store.openCursor().onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor)
      {
        if (cursor.value.date.indexOf('-') < 0)
        {
          var i = cursor.value;
          i.date = convert_date(i.date);
          cursor.delete();
          store.put(i);
        }
        cursor.continue();
      }
      else
      {
        // DB should be fully updated
        db.close();
        if (verbose == true)
          alert('Date conversion done.');
      }
    };
  }
};

/* ------------------------------------------------------------- */

HITStorage.prepare_donut = function (donutData, type)
{
  if (type == '---')
    return;
  var countHits = true;
  if (type.match('REWARDS'))
    countHits = false;

  var tmpData = {};
  var topRequesters = [];
  var topHits = [];
  var sum = 0;

  for (var i=0; i < donutData.length; i++) {
    var requesterName = donutData[i].requesterName.trim() + " (" + donutData[i].requesterId + ")";
    var hitTitle = donutData[i].title;
    var hitReward = donutData[i].reward;
    sum += (countHits) ? 1 : hitReward;

    if (tmpData[requesterName]) {
      tmpData[requesterName]['HITS'] += (countHits) ? 1 : hitReward;
    }
    else {
      tmpData[requesterName] = {};
      tmpData[requesterName]['HITS'] = (countHits) ? 1 : hitReward;
    }
    if (tmpData[requesterName][hitTitle])
      tmpData[requesterName][hitTitle] += (countHits) ? 1 : hitReward;
    else
      tmpData[requesterName][hitTitle] = (countHits) ? 1 : hitReward;

  }

  for (var key in tmpData) {
    topRequesters.push({name: key, y: tmpData[key]['HITS']});
  }
  topRequesters.sort(function(a,b){return b.y-a.y});

  var colors = Highcharts.getOptions().colors;

  for (var i=0; i<topRequesters.length; i++) {
    var tmpHits = [];
    topRequesters[i].color = colors[i];
    for (var key2 in tmpData[topRequesters[i].name]) {
      if (key2 != 'HITS') {
        tmpHits.push({name: key2, y: tmpData[topRequesters[i].name][key2], color: colors[i]});
      }
    }
    tmpHits.sort(function(a,b){return b.y-a.y});
    for (var j=0; j<tmpHits.length ; j++) {
      var brightness = 0.2 - (j / tmpHits.length) / 5;
      tmpHits[j].color = Highcharts.Color(colors[i]).brighten(brightness).get();
    }
    topHits = topHits.concat(tmpHits);
  }

  document.getElementById('container').style.display = 'block';


  chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'pie'
            },
            title: {
                text: 'Requesters and HITs matching your latest search'
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    dataLabels: { enabled: true}
                }
            },
            tooltip: {
                    animation: false,
        	    valuePrefix: (countHits)? '' : '$',
        	    valueSuffix: (countHits)? ' HITs' : '',
                    valueDecimals: (countHits)? 0 : 2,
                    pointFormat: (countHits)? '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> (of all ' + sum + ' HITs)<br/>' :
                                              '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> (of all $' + sum.toFixed(2) + ')<br/>'
            },
            series: [{
                name: 'Requesters',
                data: topRequesters,
                size: '60%',
                dataLabels: {
                    formatter: function() {
                        if (countHits) {
                          return this.y/sum >= 0.20 ? this.point.name: null;
                        }
                        else {
                          return this.y/sum >= 0.20 ? this.point.name : null;
                        }
                    },
                    color: 'black',
                    distance: -10
                }
            }, {
                name: 'HITs',
                data: topHits,
                innerSize: '60%',
                dataLabels: {
                    formatter: function() {
                        if (countHits) {
                          return this.y/sum > 0.05 ? this.point.name : null;
                        }
                        else {
                          return this.y/sum > 0.05 ? this.point.name : null;
                        }
                    },
                    color: 'black',
                }
            }]
  });
}

// Stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
HITStorage.getHTTPObject = function()  
{ 
   if (typeof XMLHttpRequest != 'undefined')
   { 
      return new XMLHttpRequest();
   }
   try
   { 
      return new ActiveXObject("Msxml2.XMLHTTP");
   } 
   catch (e) 
   { 
      try
      { 
         return new ActiveXObject("Microsoft.XMLHTTP"); 
      } 
      catch (e) {} 
   } 
   return false;
}

// Stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
// date format MMDDYYYY!
HITStorage.process_page = function(link, date, hitData)
{
   var page = HITStorage.getHTTPObject();
   page.open("GET", link, false);
   page.send(null);
   return HITStorage.parse_data(page.responseText, date, hitData);
}

// Partly stolen from Today's Projected Earnings (http://userscripts.org/scripts/show/95331)
// date format MMDDYYYY!
HITStorage.parse_data = function(page_text, date, hitData)
{
   var index  = 0;
   var index2 = 0;
   var page_html = document.createElement('div');
   page_html.innerHTML = page_text;

   var requesters = page_html.getElementsByClassName('statusdetailRequesterColumnValue');
   var titles = page_html.getElementsByClassName('statusdetailTitleColumnValue');
   var amounts = page_html.getElementsByClassName('statusdetailAmountColumnValue');
   var statuses = page_html.getElementsByClassName('statusdetailStatusColumnValue');
   var feedbacks = page_html.getElementsByClassName('statusdetailRequesterFeedbackColumnValue');

   var requesterName;
   var hitTitle;
   var hitReward;
   var hitStatus;
   var requesterId;
   var hitId;

   for(var k = 0; k < amounts.length; k++)
   {
      requesterName = requesters[k].textContent;
      requesterLink = requesters[k].childNodes[1].href;
      hitTitle      = titles[k].textContent;
      index = amounts[k].innerHTML.indexOf('$');
      hitReward     = parseFloat(amounts[k].innerHTML.substring(index+1));
      hitStatus     = statuses[k].innerHTML;
      hitFeedback   = feedbacks[k].textContent;

 
      index = requesterLink.search("requesterId=");
      requesterId = requesterLink.substring(index+12, requesterLink.lastIndexOf('&'));
      hitId = requesterLink.substring(81, index-1);

      var hit = {
        hitId         : hitId,
        date          : convert_date(date),
        requesterName : requesterName.trim(),
        requesterLink : requesterLink.trim(),
        title         : hitTitle.trim(),
        reward        : hitReward,
        status        : hitStatus,
        feedback      : hitFeedback.trim(),
        requesterId   : requesterId
      };

      //HITStorage.indexedDB.addHIT(hitData);
      hitData.push(hit);
   }

   return amounts.length;
}

// Returns available days (YYYY-MM-DD) 
HITStorage.getAllAvailableDays = function(try_extra_days)
{
  var days = [];
  
  var page = HITStorage.getHTTPObject();
  page.open("GET", 'https://www.mturk.com/mturk/status', false);
  page.send(null);
   
  var page_html = document.createElement('div');
  page_html.innerHTML = page.responseText;

  var dateElements = page_html.getElementsByClassName('statusDateColumnValue');
  var submittedElements = page_html.getElementsByClassName('statusSubmittedColumnValue');
  var approvedElements = page_html.getElementsByClassName('statusApprovedColumnValue');
  var rejectedElements = page_html.getElementsByClassName('statusRejectedColumnValue');
  var pendingElements = page_html.getElementsByClassName('statusPendingColumnValue');
  var earningsElements = page_html.getElementsByClassName('statusEarningsColumnValue');

  for (var i=0; i<dateElements.length; i++)
  {
    var date = dateElements[i].childNodes[1].href.substr(53);
    date = convert_date(date);
      
    days.push( { date: date,
                 submitted: parseInt(submittedElements[i].textContent),
                 approved : parseInt(approvedElements[i].textContent),
                 rejected : parseInt(rejectedElements[i].textContent),
                 pending  : parseInt(pendingElements[i].textContent),
                 earnings : parseFloat(earningsElements[i].textContent.slice(1)) });
  }

  if (try_extra_days > 0)
  {
    var date = days[days.length-1].date;
    var d = new Date();
    d.setFullYear(parseInt(date.substr(0,4)), parseInt(date.substr(5,2))-1, parseInt(date.substr(8,2)));
    
    for (var i=0; i<try_extra_days; i++)
    {      
      d.setDate(d.getDate()-1);
      var month = '0' + (d.getMonth() + 1);
      var day = '0' + d.getDate();
      if (month.length > 2)
        month = month.substr(1);
      if (day.length > 2)
        day = day.substr(1);
      date = '' + d.getFullYear() + '-' + month + '-' + day;
      
      days.push( { date: date,
                   submitted: -1,
                   approved : -1,
                   rejected : -1,
                   pending  : -1,
                   earnings : -1 } );
    }
  }

  return days;
}

HITStorage.getLatestHITs = function()
{
  if (localStorage['HITDB AUTO UPDATE'] === undefined || localStorage['HITDB AUTO UPDATE'] == 'OFF')
    return;  
  
  if (localStorage['HITDB TIMESTAMP'] !== undefined)
  {
    if (new Date().getTime() < new Date(parseInt(localStorage['HITDB TIMESTAMP'])).getTime() + 90000)
    {
      return;
    }
  }
  localStorage['HITDB TIMESTAMP'] = new Date().getTime();
  
  var auto_button = document.getElementById('auto_button');
  var page = HITStorage.getHTTPObject();
  page.open("GET", 'https://www.mturk.com/mturk/status', false);
  page.send(null);
  auto_button.textContent += ' +';
   
  var page_html = document.createElement('div');
  page_html.innerHTML = page.responseText;

  var dateElements = page_html.getElementsByClassName('statusDateColumnValue');
  var submittedElements = page_html.getElementsByClassName('statusSubmittedColumnValue');
  var approvedElements = page_html.getElementsByClassName('statusApprovedColumnValue');
  var rejectedElements = page_html.getElementsByClassName('statusRejectedColumnValue');
  var pendingElements = page_html.getElementsByClassName('statusPendingColumnValue');
  var earningsElements = page_html.getElementsByClassName('statusEarningsColumnValue');

  if (dateElements[0].childNodes[1].textContent.trim() != 'Today')
    return;

  var url = dateElements[0].childNodes[1].href;
  var date = url.substr(53); // keep MMDDYYYY
  var submitted = parseInt(submittedElements[0].textContent);
  //var approved = parseInt(approvedElements[0].textContent);
  //var rejected = parseInt(rejectedElements[0].textContent);
  //var pending  = parseInt(pendingElements[0].textContent);
  //var earnings = parseFloat(earningsElements[0].textContent.slice(1));
  var pages_done = null;
  if (localStorage['HITDB AUTOUPDATE PAGES'] !== undefined)
  {
    pages_done = JSON.parse(localStorage['HITDB AUTOUPDATE PAGES']);
  }
  if (pages_done == null || pages_done.date != date)
    pages_done = {date: date};

  var new_hits = 0;
  var page = 1 + Math.floor(submitted/25);
  page = (page<1) ? 1 : page;

  var hitData = [];  
  if (submitted != pages_done.submitted)
  {
    url = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + page + "&encodedDate=" + date;
    HITStorage.process_page(url, date, hitData);
    new_hits += submitted - pages_done.submitted;
    pages_done.submitted = submitted;
    localStorage['HITDB AUTOUPDATE PAGES'] = JSON.stringify(pages_done);
    auto_button.textContent += '+';
  }

  if (page > 1)
  {
    extra_page = page-1;
    
    while (extra_page >= 1)
    {
      if (pages_done[extra_page] != true)
      {
        url = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + extra_page + "&encodedDate=" + date;
        if (HITStorage.process_page(url, date, hitData) == 25)
        {
          pages_done[extra_page] = true;
          localStorage['HITDB AUTOUPDATE PAGES'] = JSON.stringify(pages_done);
          auto_button.textContent += '+';
        }
        break;
      }
      extra_page -= 1;
    }    
  }
  HITStorage.indexedDB.addHITs(hitData);
}

// Gets status details for given date (MMDDYYYY)
// Collects all HITs for given date to hitData array
HITStorage.getHITData = function(day_to_fetch, hitData, page, days_to_update)
{
  var dataDate = convert_iso_date(day_to_fetch.date);
  page = page || 1;
  detailed_status_page_link = "https://www.mturk.com/mturk/statusdetail?sortType=All&pageNumber=" + page + "&encodedDate=" + dataDate;            

  if (HITStorage.process_page(detailed_status_page_link, dataDate, hitData) == 0)
  {
    if (day_to_fetch.submitted == -1 || hitData.length == day_to_fetch.submitted)
    {
      setTimeout(function(){ HITStorage.indexedDB.addHITs(hitData, day_to_fetch, days_to_update); }, 1000);
    }
    else
    {
      alert("There was an error while fetching HITs for date: " + day_to_fetch.date + ".\n" +
            "Script monkeys expected " + day_to_fetch.submitted + " bananas, but got " + hitData.length + "! ??");
      HITStorage.update_done();
    }
  }
  else
  {
    HITStorage.update_status_label('Please wait: script monkeys are fetching status pages (' +
                                   day_to_fetch.date + ', page ' + page + ')', 'red');
    setTimeout(function(){ HITStorage.getHITData(day_to_fetch, hitData, page+1, days_to_update); }, 1000);
  }  
}

HITStorage.formatTime = function(msec)
{
    if (isNaN(msec))
      return "-";
    var seconds = Math.floor(msec / 1000) % 60;
    var minutes = Math.floor((msec / 1000) / 60) % 60;
    var hours = Math.floor(((msec / 1000) / 60) / 60) % 24;
    var days = Math.floor(((msec / 1000) / 60) / 60 / 24);

    if (hours > 0)
      seconds = "";
    else
      seconds = "" + seconds + "s";
    minutes == 0 ? minutes = "" : minutes = "" + minutes + "m ";
    hours == 0   ? hours = "" : hours = "" + hours + "h ";

    if (days > 0)
      return '' + days + ' day' + ((days>1)? 's' : ' ') + hours;
    return hours + minutes + seconds;
}

HITStorage.update_status_label = function(new_status, color)
{
  var label = document.getElementById('status_label');
  label.innerHTML = new_status;
  label.style.color = color || 'black';
}

// validate input field dates
// Accept YYYY-MM-DD
HITStorage.validate_date = function(input)
{
  date = input.value;  

  if (date.match(/^[01]\d\/[0123]\d\/20\d\d$/) != null)
  {
    var d = date.split('\/');
    date = d[2] + '-' + d[0] + '-' + d[1];
    input.value = date;
  }

  if (date.match(/^$|^20\d\d\-[01]\d\-[0123]\d$/) != null)
  {
    input.style.backgroundColor = 'white';
    return true;
  }
  input.style.backgroundColor = 'pink';
  return false;
}

HITStorage.validate_dates = function()
{
  from = document.getElementById('from_date');
  to = document.getElementById('to_date');  

  if (HITStorage.validate_date(from) && HITStorage.validate_date(to))
  {
    if (from.value > to.value && to.value != '')
    {
      alert('Invalid date!');
      return false;
    }
    
    return true;
  }
  alert('Invalid date!');
  return false;
}

HITStorage.start_search = function()
{
  if (HITStorage.validate_dates() == false)
    return;

  HITStorage.update_status_label('Using local HIT database', 'green');
  
  var options = {};
  options.term = document.getElementById('search_term').value;
  options.status = document.getElementById('status_select').value;
  options.donut = document.getElementById('donut_select').value;
  options.from_date = document.getElementById('from_date').value;
  options.to_date = document.getElementById('to_date').value;
  options.export_csv = document.getElementById('export_csv').checked;

  HITStorage.disable_inputs();
  setTimeout(function(){ HITStorage.do_search(options); }, 500);
}

HITStorage.disable_inputs = function()
{
  document.getElementById('delete_button').disabled = true;
  document.getElementById('search_button').disabled = true;
  document.getElementById('update_button').disabled = true;
  document.getElementById('overview_button').disabled = true;
  document.getElementById('import_button').disabled = true;
  document.getElementById('pending_button').disabled = true;
  document.getElementById('status_button').disabled = true;
  document.getElementById('from_date').disabled = true;
  document.getElementById('to_date').disabled = true;
  document.getElementById('search_term').disabled = true;
  document.getElementById('status_select').disabled = true;
  document.getElementById('donut_select').disabled = true;
}

HITStorage.enable_inputs = function()
{
  document.getElementById('delete_button').disabled = false;
  document.getElementById('search_button').disabled = false;
  document.getElementById('update_button').disabled = false;
  document.getElementById('overview_button').disabled = false;
  document.getElementById('import_button').disabled = false;
  document.getElementById('pending_button').disabled = false;
  document.getElementById('status_button').disabled = false;
  document.getElementById('from_date').disabled = false;
  document.getElementById('to_date').disabled = false;
  document.getElementById('search_term').disabled = false;
  document.getElementById('status_select').disabled = false;
  document.getElementById('donut_select').disabled = false;
}


HITStorage.do_search = function(options)
{
  HITStorage.indexedDB.getHITs(options);

  setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 3000);

  HITStorage.enable_inputs();
}

HITStorage.show_results = function(results)
{
  
  FauxFrameobj.innerHTML = "";
FauxFrameobj.style.display = 'block'; 

var html = "";
html += "<div id=\"closebutton\" align=\"right\"></div>";
html += "<h1>HITs matching your search:</h1>\n";
html += '<table style="border: 1px solid black;border-collapse:collapse;width:90%;margin-left:auto;margin-right:auto;">\n';
html += '<tr style="background-color:lightgrey"><th>Date</th><th>Requester</th><th>HIT Title</th><th>Reward</th><th>Status</th><th>Feedback</th></tr>\n';

  var odd = true;
  var sum = 0;
  var sum_rejected = 0;
  var sum_approved = 0;
  var sum_pending = 0;
    
  
  var new_day = false;

  for (var i=0; i<results.length; i++) {
    odd = !odd;
    sum += results[i].reward;
    if (results[i].status == 'Rejected')
      sum_rejected += results[i].reward;
    else if (results[i].status == 'Pending Approval')
      sum_pending += results[i].reward;
    else
      sum_approved += results[i].reward;

    if (i>0 && (results[i-1].date != results[i].date))
      new_day = true;
    else
      new_day = false;
    html += HITStorage.format_hit_line(results[i], odd, HITStorage.status_color(results[i].status), new_day );
  }

  html += '<tr style="background-color:lightgrey"><th></th><th></th><th></th><th>$' + sum.toFixed(2) + '</th><th></th><th></th></tr>\n';
 html += "</table>";
  html += "<p>Found " + results.length + " matching HITs. $" + sum_approved.toFixed(2) + " approved, " +
                                 "$" + sum_rejected.toFixed(2) + " rejected and $" + sum_pending.toFixed(2) + " pending.</p>";

FauxFrameobj.innerHTML = html;

  //close button
  var Close_button = document.createElement('button');
Close_button.setAttribute('id', "close_button");
var CloseDiv =document.getElementById('closebutton');
CloseDiv.appendChild(Close_button);

  Close_button.title = "Close Faux Frame";
  Close_button.textContent = "Close Frame";
  Close_button.style.color = 'black';
  Close_button.style.margin = '5px 5px 5px 5x';
  Close_button.addEventListener("click", HITStorage.CloseFaux , false);
  //close button

}

HITStorage.status_color = function(status)
{
  var color = "green";

  if (status.match("Pending Approval"))
    color = "orange";
  else if (status.match("Rejected"))
    color = "red";

  return color;
}

HITStorage.format_hit_line = function(hit, odd, status_color, new_day)
{
  var line = '<tr style="background-color:';
  if (odd)
    line += '#f1f3eb;';
  else
    line += 'white;';
  line += ' valign=top;';
  if (new_day)
    line += ' border: 0px dotted #000000; border-width: 2px 0px 0px 0px">';
  else
    line += '">';

  line += '<td>' + hit.date + '</td>';
  if (hit.requesterLink != null)
    line += '<td style="width:165px"><a href="' + hit.requesterLink + '" title="Contact this Requester">' + hit.requesterName + '</a></td>';
  else
    line += '<td style="width:165px">' + hit.requesterName + '</td>';
  line += '<td style="width:213px">' + hit.title + '</td>';
  line += '<td style="width:45px">$' + hit.reward.toFixed(2) + '</td>';
  line += '<td style="color:' + status_color + '; width:55px">' + hit.status + '</td>';
  line += '<td><div style="width:225px; overflow:hidden">' + hit.feedback + '</div></td>';
  line += '</tr>\n';
  return line;
}

HITStorage.show_pending_overview = function(results)
{
FauxFrameobj.innerHTML = "";

FauxFrameobj.style.display = 'block'; 

var html = "";
html += "<div id=\"closebutton\" align=\"right\"></div>";
html +="<h1>Summary of Pending HITs</h1>\n";
  html +='<table style="border: 1px solid black;border-collapse:collapse;width:90%;margin-left:auto;margin-right:auto;">\n';
  html +='<tr style="background-color:lightgrey"><th>requesterId</th><th>Requester</th><th></th><th>Pending</th><th>Rewards</th>\n';

  // 'requesterId,requesterName,pending,reward';
  var odd = false;
  var sum = 0;
  var pending = 0;

  for (var i=0; i<results.length; i++) {
    odd = !odd;
    sum += results[i][3];
    pending += results[i][2];
    html +=HITStorage.format_pending_line(results[i], odd, i);
  }

  html +='<tr style="background-color:lightgrey"><th>' + results.length + ' different requesterIds</th><th></th><th></th><th style="text-align: right">' + pending + 

'</th><th style="text-align: right">$' + sum.toFixed(2) + '</th>\n';
  html +="</table>";

  FauxFrameobj.innerHTML = html;
  
  for (var i=0; i<results.length; i++)
  {
    document.getElementById('id-' + i).addEventListener("click", search_func(results[i][0], 'requesterId'), false);
    document.getElementById('id2-' + i).addEventListener("click", show_requester_func(results[i][0]) , false);
  }
  
  //close button
  var Close_button = document.createElement('button');
Close_button.setAttribute('id', "close_button");
var CloseDiv =document.getElementById('closebutton');
CloseDiv.appendChild(Close_button);

  Close_button.title = "Close Faux Frame";
  Close_button.textContent = "Close Frame";
  Close_button.style.color = 'black';
  Close_button.style.margin = '5px 5px 5px 5x';
  Close_button.addEventListener("click", HITStorage.CloseFaux , false);
  //close button
}

HITStorage.CloseFaux = function(){
 FauxFrameobj.innerHTML = "";
 FauxFrameobj.style.display = 'none'; 
}

HITStorage.show_status_overview = function(results, date)
{
FauxFrameobj.innerHTML = "";
FauxFrameobj.style.display = 'block'; 

var html = "";
html += "<div id=\"closebutton\" align=\"right\"></div>";
  if (date)
    html +="<h1>Daily HIT stats</h1>\n";
  else
    html +="<h1>Daily HIT stats (' + date + ')</h1>\n";
  html +='<table style="border: 1px solid black;border-collapse:collapse;width:90%;margin-left:auto;margin-right:auto;">\n';
  html +='<tr style="background-color:lightgrey"><th>Date</th><th>Submitted</th><th>Approved</th><th>Rejected</th><th>Pending</th><th>Earnings</th>\n';

  var odd = false;
  var sum = 0;
  var submitted = 0;
  var approved = 0;
  var rejected = 0;
  var pending = 0;
  var new_month = false;  

  for (var i=results.length-1; i>=0; i--) {
    odd = !odd;
    sum += results[i].earnings;
    submitted += results[i].submitted;
    approved += results[i].approved;
    rejected += results[i].rejected;
    pending += results[i].pending;
    if (i<results.length-1)
      new_month = (results[i].date.substr(0,7) != results[i+1].date.substr(0,7));
     html += HITStorage.format_status_line(results[i], odd, new_month);
  }

  html +='<tr style="background-color:lightgrey"><th>' + results.length + ' days</th><th style="text-align: left">' + submitted +
                               '</th><th style="text-align: left">' + approved +
                               '</th><th style="text-align: left">' + rejected +
                               '</th><th style="text-align: left">' + pending +
                               '</th><th style="text-align: left">$' + sum.toFixed(2) + '</th>\n';
  html +="</table>";
  
  FauxFrameobj.innerHTML = html;
  for (var i=0; i<results.length; i++)
  document.getElementById(results[i].date).addEventListener("click", search_func('', 'date', results[i].date, results[i].date), false);

  //close button
  var Close_button = document.createElement('button');
Close_button.setAttribute('id', "close_button");
var CloseDiv =document.getElementById('closebutton');
CloseDiv.appendChild(Close_button);

  Close_button.title = "Close Faux Frame";
  Close_button.textContent = "Close Frame";
  Close_button.style.color = 'black';
  Close_button.style.margin = '5px 5px 5px 5x';
  Close_button.addEventListener("click", HITStorage.CloseFaux , false);
  //close button

}

HITStorage.show_requester_overview = function(results, date)
{
  FauxFrameobj.innerHTML = "";

FauxFrameobj.style.display = 'block'; 

var html = "";
html += "<div id=\"closebutton\" align=\"right\"></div>";
 if (date)
    html += "<h1>Requester Overview " + date + "</h1>\n";
  else
    html += "<h1>Requester Overview</h1>\n";
  html += '<table style="border: 1px solid black;border-collapse:collapse;width:90%;margin-left:auto;margin-right:auto;">\n';
  html += '<tr style="background-color:lightgrey"><th>requesterId</th><th>Requester</th><th></th><th>HITs</th><th>Pending</th><th>Rewards</th><th colspan="2">Rejected</th></tr>\n';

  // 'requesterId,requesterName,hits,pending,reward,rejected';
  var odd = false;
  var sum = 0;
  var hits = 0;
  var rejected = 0;
  var pending = 0;
  var new_day = false;
  var top = true;
  var dot_line;

  for (var i=0; i<results.length; i++) {
    odd = !odd;
    sum += results[i][3];
    hits += results[i][2];
    rejected += results[i][4];
    pending += results[i][5];
    dot_line = false;
    if (i==10)
    {
      dot_line = true;
      top = false;
    }
    if (i>10 && results[i][3] == 0 && results[i-1][3] != 0)
      dot_line = true;
    
    html += HITStorage.format_overview_line(results[i], odd, dot_line, top, i);
  }

  html += '<tr style="background-color:lightgrey"><th>' + results.length + ' different requesterIds</th>' +
                                '<th></th><th></th><th style="text-align: right">' + hits + '<th style="text-align: right">' + pending +
                                '</th><th style="text-align: right">$' + sum.toFixed(2) + '</th><th style="text-align: right">' + rejected + '</th>' +
                                '<th style="text-align: right">' +
                                (rejected/hits*100).toFixed(2) + '%</th></tr>\n';
  html += "</table>";
  html += "<p>Reward includes all 'Paid' and 'Approved - Pending Payment' HITs. " +
                                "Reward does not include any bonuses.</p>";

  FauxFrameobj.innerHTML = html;
  
  for (var i=0; i<results.length; i++)
  {
    document.getElementById('id-' + i).addEventListener("click", search_func(results[i][0], 'requesterId'), false);
    document.getElementById('id2-' + i).addEventListener("click", show_requester_func(results[i][0]) , false);
  }
  

  
    //close button
  var Close_button = document.createElement('button');
Close_button.setAttribute('id', "close_button");
var CloseDiv =document.getElementById('closebutton');
CloseDiv.appendChild(Close_button);

  Close_button.title = "Close Faux Frame";
  Close_button.textContent = "Close Frame";
  Close_button.style.color = 'black';
  Close_button.style.margin = '5px 5px 5px 5x';
  Close_button.addEventListener("click", HITStorage.CloseFaux , false);
  //close button
}

HITStorage.show_requester = function(results)
{
   FauxFrameobj.innerHTML = "";

FauxFrameobj.style.display = 'block'; 

var html = "";
html += "<div id=\"closebutton\" align=\"right\"></div>";
html +='<h1>' + results[0].requesterName + ' (' + results[0].requesterId + ')</h1>\n';

  html +='You have submitted ' + results.length + ' HITs for this requester. Earliest ' + results[results.length-1].date +
                               ', latest ' + results[0].date;

 html +='<p><a href="https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' + results[0].requesterId + '">' +
                               'Search HITs created by this requester</a></p>';


 html +='<p><a href="https://turkopticon.differenceengines.com/' + results[0].requesterId + '">' +
                               'See reviews about this requester on Turkopticon</a> or ';
 '<a href="' + TO_report_link(results[0].requesterId,results[0].requesterName) + '">' +
                               'review this requester on Turkopticon</a></p>';

  var reward = 0;
  var hits = 0;
  var sum = 0;
  var rejected = 0;
  var approved = 0;
  var pending  = 0;
  var all_rejected = 0;
  var all_approved = 0;
  var all_pending  = 0;

  html +='<table style="border: 1px solid black;border-collapse:collapse;margin-left:10px;margin-right:auto;">\n';
  html +='<tr style="background-color:lightgrey"><th>Month' + 
                               '</th><th>Submitted' +
                               '</th><th>Approved' +
                               '</th><th>Rejected' +
                               '</th><th>Pending' +
                               '</th><th>Earnings</th></tr>\n';

  for (var i=0; i<results.length; i++) {
    hits++;
    if (results[i].status == 'Rejected')
    {
      all_rejected++;
      rejected++;
    }
    else if (results[i].status == 'Pending Approval')
    {
      all_pending++;
      pending++;
    }
    else
    {
      all_approved++;
      approved++;
      sum += results[i].reward;
      reward += results[i].reward;
    }
    
    if (i==results.length-1 || (i<results.length-1 && (results[i].date.substr(0,7) != results[i+1].date.substr(0,7))))
    {
      html +='<tr><td style="text-align: right">' + results[i].date.substr(0,7) +
                                   '</td><td style="text-align: right">' + hits +
                                   '</td><td style="text-align: right">' + approved +
                                   '</td><td style="text-align: right">' + rejected +
                                   '</td><td style="text-align: right">' + pending +
                                   '</td><td style="text-align: right">$' + reward.toFixed(2) + '</td></tr>\n';
      reward = 0;
      hits = 0;
      approved = 0;
      rejected = 0;
      pending = 0;
    }
  }
  html +='<tr style="background-color:lightgrey"><th>' + 
                               '</th><th style="text-align: right">' + results.length +
                               '</th><th style="text-align: right">' + all_approved +
                               '</th><th style="text-align: right">' + all_rejected +
                               '</th><th style="text-align: right">' + all_pending +
                               '</th><th style="text-align: right">$' + sum.toFixed(2) + '</th></tr>\n';
  html +='</table>';

  html +='<p>Rewards do not include any bonuses</p>';

    FauxFrameobj.innerHTML = html;
	
	  //close button
  var Close_button = document.createElement('button');
Close_button.setAttribute('id', "close_button");
var CloseDiv =document.getElementById('closebutton');
CloseDiv.appendChild(Close_button);

  Close_button.title = "Close Faux Frame";
  Close_button.textContent = "Close Frame";
  Close_button.style.color = 'black';
  Close_button.style.margin = '5px 5px 5px 5x';
  Close_button.addEventListener("click", HITStorage.CloseFaux , false);
  //close button
  
  //find this
  
	
}

function TO_report_link(requesterId, requesterName)
{
  return 'https://turkopticon.differenceengines.com/report?requester[amzn_id]=' + requesterId +
          '&requester[amzn_name]=' + encodeURI(requesterName.trim());
}

HITStorage.format_overview_line = function(req, odd, dot_line, top, i)
{
  var color;
  if (top)
    color = (odd)? 'ffffe0;' : '#eee8aa;';
  else
    color = (odd)? 'white;' : '#f1f3eb;';
  var line = '<tr style="background-color:' + color;
  if (dot_line)
    line += ' border: 0px dotted #000000; border-width: 2px 0px 0px 0px';
  line += '">';
  line += '<td><button type="button" title="Show all HITs" style="height: 16px;font-size: 8px; padding: 0px;" id="id-' +
           i + '">&gt;&gt;</button>' +
           '<button type="button" title="Show details about requester" style="height: 16px;font-size: 8px; padding: 0px;" id="id2-' +
           i + '">+</button> ' + req[0].trim() +
           '</td>';
  line += '<td><a title="Requesters Turkopticon page" target="_blank" href="https://turkopticon.differenceengines.com/' + req[0].trim() + '">[TO]</a> ';
  line += req[1].trim() + '</td>';
  line += '<td style="width: 50px"><a title="Report requester to Turkopticon" target="_blank" href="' + TO_report_link(req[0], req[1]) + '">[report]</a></td>';
  line += '<td style="text-align: right">' + req[2] + '</td>';
  line += '<td style="text-align: right">' + req[5] + '</td>';
  line += '<td style="text-align: right">$' + req[3].toFixed(2) + '</td>';
  var p = (req[4]/req[2]*100).toFixed(1);
  var pc = (p>0)? 'red' : 'green'; 
  line += '<td style="text-align: right; color:' + pc + ';">' + req[4] + '</td>';
  line += '<td style="text-align: right; color:' + pc + ';">' + p + '%</td>';
  line += '</tr>\n';
  return line;
}

HITStorage.format_pending_line = function(req, odd, i)
{
  var color = (odd)? 'white;' : '#f1f3eb;';
  var line = '<tr style="background-color:' + color;
  line += '">';
  line += '<td style="white-space: nowrap; width: 150px; margin-right: 10px;"><button type="button" title="Show all HITs" style="height: 16px;font-size: 8px; padding: 0px;" id="id-' +
           i + '">&gt;&gt;&gt;</button>' +
           '<button type="button" title="Show details about requester" style="height: 16px;font-size: 8px; padding: 0px;" id="id2-' +
           i + '">+</button> ' + req[0].trim() + '</td>';
  line += '<td><a title="Requesters Turkopticon page" target="_blank" href="https://turkopticon.differenceengines.com/' + req[0].trim() + '">[TO]</a> ';
  line += req[1].trim() + '</td>';
  line += '<td style="width: 50px"><a title="Report requester to Turkopticon" target="_blank" href="' + TO_report_link(req[0], req[1]) + '">[report]</a></td>';
  line += '<td style="text-align: right">' + req[2] + '</td>';
  line += '<td style="text-align: right">$' + req[3].toFixed(2) + '</td>';
  line += '</tr>\n';
  return line;
}

HITStorage.format_status_line = function(d, odd, new_month)
{
  var color = (odd)? 'white;' : '#f1f3eb;';
  var line = '<tr style="background-color:' + color;
  if (new_month)
    line += ' border: 0px dotted #000000; border-width: 2px 0px 0px 0px">';
  else
    line += '">';
  line += '<td><button type="button" title="Show all HITs" style="height: 16px;font-size: 8px; padding: 0px;" id="' +
           d.date + '">&gt;&gt;&gt;</button> ' + d.date + '</td>';
  line += '<td>' + d.submitted + '</td>';
  line += '<td>' + d.approved + '</td>';
  line += '<td>' + d.rejected + '</td>';
  line += '<td>' + d.pending + '</td>';
  line += '<td>$' + d.earnings.toFixed(2) + '</td>';
  line += '</tr>\n';
  return line;
}

HITStorage.show_pending_overview_csv = function(results)
{
  var csvData = [];
  csvData.push(["requesterId","requesterName","pending","reward","\n"]);
  for (var i=0; i<results.length; i++) {
    csvData.push(HITStorage.format_pending_line_csv(results[i]));
  }
  var blob = new Blob(csvData, {type: "text/csv;charset=utf-8"});
  saveAs(blob, "pending_overview.csv");
}

HITStorage.format_pending_line_csv = function(req)
{
  var line = [];
  line.push(req[0].trim());
  line.push('"' + req[1].trim() + '"');
  line.push(req[2]);
  line.push(req[3].toFixed(2));
  line.push('\n');
  return line;
}


HITStorage.show_requester_overview_csv = function(results)
{
  var csvData = [];
  csvData.push(['requesterId','requesterName','hits','reward','rejected','pending','\n']);
  for (var i=0; i<results.length; i++) {
    csvData.push(HITStorage.format_overview_line_csv(results[i]));
  }
  var blob = new Blob(csvData, {type: "text/csv;charset=utf-8"});
  saveAs(blob, "requester_overview.csv");
}

HITStorage.format_overview_line_csv = function(req)
{
  var line = [];
  line.push(req[0].trim());
  line.push('"' + req[1].trim() + '"');
  line.push(req[2]);
  line.push(req[3].toFixed(2));
  line.push(req[4]);
  line.push(req[5]);
  line.push('\n');
  return line;
}

HITStorage.show_status_overview_csv = function(results)
{
  var csvData = [];
  csvData.push(['Date','Submitted','Approved','Rejected','Pending','Earnings','\n']);
  for (var i=results.length-1; i>=0; i--) {
    csvData.push(HITStorage.format_status_line_csv(results[i]));
  }
  var blob = new Blob(csvData, {type: "text/csv;charset=utf-8"});
  //location.href='data:text/csv;charset=utf8,' + encodeURIComponent(csvData);
  saveAs(blob, "status_overview.csv");
}

HITStorage.format_status_line_csv = function(d)
{
  var line = [];
  line.push('"' + d.date + '"');
  line.push(d.submitted);
  line.push(d.approved);
  line.push(d.rejected);
  line.push(d.pending);
  line.push(d.earnings.toFixed(2));
  line.push('\n');
  return line;
}

HITStorage.export_csv = function(results)
{
  var csvData = [];
  csvData.push(['hitId','date','requesterName','requesterId','title','reward','status','feedback','\n']);
  for (var i=0; i<results.length; i++) {
    csvData.push(HITStorage.format_csv_line(results[i]));
  }
  var blob = new Blob(csvData, {type: "text/csv;charset=utf-8"});
  //location.href='data:text/csv;charset=utf8,' + encodeURIComponent(csvData);
  saveAs(blob, "hit_database.csv");
}

HITStorage.format_csv_line = function(hit)
{
  var line = [];
  line.push('"' + hit.hitId.trim() + '"');
  line.push('"' + hit.date.trim() + '"');
  line.push('"' + hit.requesterName.trim() + '"');
  line.push('"' + hit.requesterId.trim() + '"');
  line.push('"' + hit.title.trim() + '"');
  line.push(hit.reward.toFixed(2));
  line.push('"' + hit.status.trim().replace(/\&nbsp;/g,' ') + '"');
  line.push('"' + hit.feedback.trim() + '"');
  line.push('\n');
  return line;
}

HITStorage.do_update = function(days_to_update)
{
  if (DAYS_TO_FETCH.length<1)
  {
    HITStorage.check_update();
    return;
  }
  HITStorage.update_status_label('Please wait: ' + progress_bar(days_to_update-DAYS_TO_FETCH.length, days_to_update) +
                                 ' (' + (days_to_update-DAYS_TO_FETCH.length) + '/' + days_to_update + ')', 'red');
  
  var hits = [];
  setTimeout(function(){ HITStorage.getHITData( DAYS_TO_FETCH.shift(), hits, 1, days_to_update); }, 2000);
}

HITStorage.update_done = function()
{
  HITStorage.update_status_label('Script monkeys have updated your local database', 'green');
  setTimeout( function() { HITStorage.update_status_label("Search powered by non-amazonian script monkeys"); }, 5000);

  HITStorage.enable_inputs();

  localStorage['HITDB UPDATED'] = new Date().toString();

  var e = document.getElementById('user_activities.date_column_header.tooltip').parentNode.parentNode.childNodes[2].childNodes[1].childNodes[1];
  if (e != null && e.textContent.trim() == 'Today') {
    var today = e.href.slice(-8);
    today = convert_date(today);
    HITStorage.indexedDB.get_todays_projected_earnings(today);
  }
  HITStorage.indexedDB.get_pending_approvals();
  HITStorage.indexedDB.get_pending_payments();
}


HITStorage.update_database = function()
{
  HITStorage.disable_inputs();

  if (localStorage['HITDB TRY_EXTRA_DAYS'] == 'YES') {
    DAYS_TO_FETCH = HITStorage.getAllAvailableDays(20);
    delete localStorage['HITDB TRY_EXTRA_DAYS'];
  }
  else
  {
    DAYS_TO_FETCH = HITStorage.getAllAvailableDays();
  }
  DAYS_TO_FETCH_CHECK = DAYS_TO_FETCH.slice(0);

  // remove extra days from checklist
  for (var i=0; i<DAYS_TO_FETCH_CHECK.length; i++)
  {
    if (DAYS_TO_FETCH_CHECK[i].submitted == -1) {
      DAYS_TO_FETCH_CHECK = DAYS_TO_FETCH_CHECK.slice(0,i);
      break;
    }
  }
  

  HITStorage.update_status_label('Please wait: script monkeys are preparing to start working', 'red');
  setTimeout(function(){ HITStorage.prepare_update_and_check_pending_payments(); }, 100);  
}

HITStorage.show_overview = function()
{
  if (HITStorage.validate_dates() == false)
    return;
  var options = {};
  options.term = document.getElementById('search_term').value;
  options.status = document.getElementById('status_select').value;
  options.donut = document.getElementById('donut_select').value;
  options.from_date = document.getElementById('from_date').value;
  options.to_date = document.getElementById('to_date').value;
  options.export_csv = document.getElementById('export_csv').checked;

  HITStorage.update_status_label('Please wait: script monkeys are picking bananas 1', 'red');
  HITStorage.disable_inputs();
  HITStorage.indexedDB.requesterOverview(options);
  HITStorage.update_status_label('Please wait: script monkeys are picking bananas 2', 'red');
}

HITStorage.show_pendings = function()
{
  var options = {};
  options.term = document.getElementById('search_term').value;
  options.status = document.getElementById('status_select').value;
  options.donut = document.getElementById('donut_select').value;
  options.from_date = document.getElementById('from_date').value;
  options.to_date = document.getElementById('to_date').value;
  options.export_csv = document.getElementById('export_csv').checked;

  HITStorage.update_status_label('Please wait: script monkeys are picking bananas 1', 'red');
  HITStorage.disable_inputs();
  HITStorage.indexedDB.pendingOverview(options);
  HITStorage.update_status_label('Please wait: script monkeys are picking bananas 1', 'red');
}

HITStorage.show_status = function()
{
  if (HITStorage.validate_dates() == false)
    return;
  var options = {};
  options.term = document.getElementById('search_term').value;
  options.status = document.getElementById('status_select').value;
  options.donut = document.getElementById('donut_select').value;
  options.from_date = document.getElementById('from_date').value;
  options.to_date = document.getElementById('to_date').value;
  options.export_csv = document.getElementById('export_csv').checked;

  HITStorage.update_status_label('Please wait: script monkeys are picking bananas 1', 'red');
  HITStorage.disable_inputs();
  HITStorage.indexedDB.statusOverview(options);
  HITStorage.update_status_label('Please wait: script monkeys are picking bananas 2', 'red');
}

var IMPORT_DIALOG = null;

function import_dialog()
{
  if (IMPORT_DIALOG == null)
  {
    IMPORT_DIALOG = document.createElement('div');
    IMPORT_DIALOG.style.display = 'block';

    IMPORT_DIALOG.style.position = 'fixed';
    IMPORT_DIALOG.style.width = '600px';
    //IMPORT_DIALOG.style.height = '400px';
    IMPORT_DIALOG.style.height = '90%';
    IMPORT_DIALOG.style.left = '50%';
    IMPORT_DIALOG.style.right = '50%';
    IMPORT_DIALOG.style.margin = '-300px 0px 0px -300px';
    //IMPORT_DIALOG.style.top = '400px';
    IMPORT_DIALOG.style.bottom = '10px';
    IMPORT_DIALOG.style.padding = '10px';
    IMPORT_DIALOG.style.border = '2px';
    IMPORT_DIALOG.style.textAlign = 'center';
    IMPORT_DIALOG.style.verticalAlign = 'middle';
    IMPORT_DIALOG.style.borderStyle = 'solid';
    IMPORT_DIALOG.style.borderColor = 'black';
    IMPORT_DIALOG.style.backgroundColor = 'white';
    IMPORT_DIALOG.style.color = 'black';
    IMPORT_DIALOG.style.zIndex = '100';

    var table = document.createElement('table');
    var input = document.createElement('textarea');
    var input2 = document.createElement('input');
    var label = document.createElement('label');
    var label2 = document.createElement('label');

    label.textContent = 'Paste CSV-file in the textarea below.';
    label2.textContent = 'CVS separator: ';
    input.style.width = '100%';
    input.style.height = '90%';

    input2.maxLength = '1';
    input2.size = '1';
    input2.defaultValue = ',';

    var import_button = document.createElement('button');
    import_button.textContent = 'Import HITs';
    import_button.addEventListener("click", import_dialog_close_func(true, input, input2), false);
    import_button.style.margin = '5px';
    var cancel_button = document.createElement('button');
    cancel_button.textContent = 'Cancel';
    cancel_button.addEventListener("click", import_dialog_close_func(false, input, input2), false);
    cancel_button.style.margin = '5px';

    IMPORT_DIALOG.appendChild(label);
    IMPORT_DIALOG.appendChild(document.createElement('br'));
    IMPORT_DIALOG.appendChild(label2);
    IMPORT_DIALOG.appendChild(input2);
    IMPORT_DIALOG.appendChild(document.createElement('br'));
    IMPORT_DIALOG.appendChild(input);
    IMPORT_DIALOG.appendChild(document.createElement('br'));
    IMPORT_DIALOG.appendChild(cancel_button);
    IMPORT_DIALOG.appendChild(import_button);
    document.body.appendChild(IMPORT_DIALOG);
  }
  else
  {
    IMPORT_DIALOG.style.display = 'block';
  }
}


/*
 * CSVToArray() function is taken from:
 *
 * 	Blog Entry:
 * 	Ask Ben: Parsing CSV Strings With Javascript Exec() Regular Expression Command
 *	
 *	 Author:
 *	 Ben Nadel / Kinky Solutions
 *	
 *	 Link:
 *	 http://www.bennadel.com/index.cfm?event=blog.view&id=1504
 *	
 *	 Date Posted:
 *	 Feb 19, 2009 at 10:03 AM
 */
	// This will parse a delimited string into an array of
	// arrays. The default delimiter is the comma, but this
	// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ) {
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = (strDelimiter || ",");
 
		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			(
				// Delimiters.
				"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
 
				// Quoted fields.
				"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
 
				// Standard fields.
				"([^\"\\" + strDelimiter + "\\r\\n]*))"
			),
			"gi"
			);
 
		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];
 
		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;
 
 
		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while (arrMatches = objPattern.exec( strData )){
 
			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[ 1 ];
 
			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				(strMatchedDelimiter != strDelimiter)
				){
 
				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push( [] );
 
			}
 
 
			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[ 2 ]){
 
				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				var strMatchedValue = arrMatches[ 2 ].replace(
					new RegExp( "\"\"", "g" ),
					"\""
					);
 
			} else {
 
				// We found a non-quoted value.
				var strMatchedValue = arrMatches[ 3 ];
 
			}
 
 
			// Now that we have our value string, let's add
			// it to the data array.
			arrData[ arrData.length - 1 ].push( strMatchedValue );
		}
 
		// Return the parsed data.
		return( arrData );
}

function import_dialog_close_func(save, input, separator)
{
  return function()
  {
    if (save == true)
    {
      
      var lines = [];
      var hits = [];
	  var dates = [];

      if (input.value.length > 0)
        lines = CSVToArray(input.value, separator.value);

      var errors = 0;
      for (var i = 0; i<lines.length; i++)
      {
        var error = false;
        try {
          if (lines[i][0] == null || lines[i][0] == 'hitId')
            continue;

          if(lines[i][6] == 'Approved - Pending Payment')
            lines[i][6] = 'Approved&nbsp;- Pending&nbsp;Payment';        
        
          if (lines[i].length != 8)
            error = true;
        
          var hit = {
                hitId         : lines[i][0],
                date          : convert_date(lines[i][1]),
                requesterName : lines[i][2],
                requesterLink : "https://www.mturk.com/mturk/contact?subject=Regarding+Amazon+Mechanical+Turk+HIT+"+lines[i][0]+"&requesterId="+lines[i][3]+"&requesterName="+lines[i][2].replace(" ","+"), 
                requesterId   : lines[i][3],
                title         : lines[i][4],
                reward        : parseFloat(lines[i][5]),
                status        : lines[i][6],
                feedback      : lines[i][7] || "" // If no feedback, put empty string
          };
		  var status = {
                date          : hit.date,
                approved      : (hit.status != "Rejected" ? 1 : 0),
                earnings      : (hit.status != "Rejected" ? hit.reward : 0),
                pending       : (hit.status != "Pending" ? 0 : 1),
                rejected      : (hit.status == "Rejected" ? 1 : 0),
                submitted     : 1
          };
        } catch(err) { error = true; }

        if (error == false){
          hits.push(hit);
//Implementation of status stuff. First I see if the object exists in my "dates" array,
          var index = lookup(hit.date, "date", dates);
          if (index != -1){
//if it does, add each value except date to update it. The values will either be 1 or 0, so just += should give the proper values (and it does based on testing
            for (var key in dates[index]){
              if (key != "date")
                dates[index][key] += status[key];
            }
          }
          else
            dates.push(status); //if the date doesn't exist in the array, add it as an initial object
        }
        else
          errors++;
      }
      if (hits.length < 1)
      {
        alert('No HITs found!');
        return;
      }
      else if (confirm('Found ' + hits.length + ' HITs' + (errors>0? ' and ' + errors + (errors==1? ' error' : ' errors') : '') + 
                  '.\nDo not reload this page until import is ready.\n' +
                  'Press Ok to start.') == true)
      {
        HITStorage.disable_inputs();
        HITStorage.update_status_label('Please wait: importing HITs', 'red');
        IMPORT_DIALOG.style.display = 'none';
        input.value = '';
        HITStorage.indexedDB.importHITs(hits);
		for (var i = 0; i < dates.length; i++){ 
            HITStorage.indexedDB.updateHITstats(dates[i]);
        }
        return;
      }
      else { return; }
    }
    
    IMPORT_DIALOG.style.display = 'none';
    input.value = '';
  };
}

function get_requester_id(s) {
  var idx = 12 + s.search('requesterId=');
  return s.substr(idx);
}

function show_requester_func(requesterId)
{
  return function()
  {
    HITStorage.indexedDB.showRequester(requesterId);
  };  
}

function search_func(key, index, d1, d2)
{
  d1 = d1 || '';
  d2 = d2 || d1;
  return function()
  {
    HITStorage.indexedDB.getHITs({term: key, index: index, status: '---', from_date: d1, to_date: d2, donut: '', this_day: ''});
  };   
}

function visible_func(element, visible)
{
  return function()
  {
    element.style.visibility = (visible)? 'visible' : 'hidden';
  };   
}

function delete_func()
{
  return function()
  {
    if (confirm('This will remove your local HIT DataBase!\nContinue?'))
    {
      HITStorage.indexedDB.deleteDB();
    }
  };   
}

function import_func()
{
  return function()
  {
    import_dialog();
  };   
}

function note_func(id, label)
{
  return function()
  {
    note = prompt('Note for requesterId \'' + id + '\':', label.textContent);
    
    if (note == null)
    {
      return;  
    }    
    
    HITStorage.indexedDB.addNote(id, note);
    label.textContent = note;
    
    label.style.border = '1px dotted';
    if (note.indexOf('!') >= 0)
      label.style.color = 'red';
    else
      label.style.color = 'black'; 
  };   
}

function block_func(requesterId, title, hitElement)
{
  return function()
  {
    re = prompt('Block HITs from requesterId \'' + requesterId + '\' matching:\n' +
                '(default matches only exactly same HIT title, leave empty to match all HITS)', '^'
                 + title.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1") + '$');
    
    if (re == null)
    {
      return;  
    }
    re = new RegExp(re);

    if (!re.test(title)) {
      if (confirm("Your regular expression does not match current HIT title.\nSave it anyway?") == false)
        return;
    }

    HITStorage.indexedDB.addBlock(requesterId, re);
  };   
}

function unblock_func(requesterId, title)
{
  return function()
  {
    var unblock = confirm('Unblocking removes all blocks that match this HITs title and requesterId.');
    if (unblock == true)
    {
      HITStorage.indexedDB.removeBlocks(requesterId, title);
    }
  };  
}

function auto_update_func()
{
  return function()
  {
    var button = document.getElementById('auto_button');    
    
    if (localStorage['HITDB AUTO UPDATE'] === undefined)
    {
      alert('Enable Hit DataBase Auto Update\nWhen enabled, script will fetch last ' +
            'statusdetail pages and add them to database when this page is reloaded ' +
            'and at least two minutes have passed from last update. You still need to ' +
            'do full update from dashboard every now and then.');
      button.textContent = 'Auto Update is ON';
      button.style.color = 'green';
      localStorage['HITDB AUTO UPDATE'] = 'ON';
    }
    else if (localStorage['HITDB AUTO UPDATE'] == 'ON')
    {
      button.textContent = 'Auto Update is OFF';
      button.style.color = 'red';
      localStorage['HITDB AUTO UPDATE'] = 'OFF';
    }
    else
    {
      button.textContent = 'Auto Update is ON';
      button.style.color = 'green';
      localStorage['HITDB AUTO UPDATE'] = 'ON';
    }
  };   
}

function set_target_func(date)
{
  return function()
  {
    var target = localStorage['TODAYS TARGET'];
    if (target === undefined)
      target = '';
    else
      target = parseFloat(localStorage['TODAYS TARGET']).toFixed(2);
    target = prompt('Set your target:', target);
    
    if (target == null)
      return;    
    target = parseFloat(target);
    
    localStorage['TODAYS TARGET'] = target.toFixed(2);
    if (date != null)
      HITStorage.indexedDB.get_todays_projected_earnings(date);
  };   
}

function random_face()
{
  var faces = ['??','??','??','??','??','??','??','??','??','??','??','??','??','??','??','??'];
  var n = Math.floor((Math.random()*faces.length));
  return '<span style="color: black; font-weight: normal;" title="Featured non-amazonian script ' + ((n>11) ? '... kitten?': 'monkey') + '">' + faces[n] + '</span>';
}

function progress_bar(done, max, full, empty, c1, c2)
{
  max = (max<1)? 1 : max;  
  done = (done<0)? 0 : done;  
  done = (done>max)? max : done;  
  
  var bar = '<span style="color: ' + (c1||'green') + '">';
  for (var i=0; i<done; i++)
  {
    bar += full || '¦';
  }
  bar += '</span><span style="color: ' + (c2||'black') + '">';
  for (var i=done; i<max; i++)
  {
    bar += empty || '?';
  }
  bar += '</span>';
  return bar;
}

// convert date to more practical form (MMDDYYYY => YYYY-MM-DD)
function convert_date(date)
{
  if (date.indexOf('-') > 0)
    return date;
  var day   = date.substr(2,2);
  var month = date.substr(0,2);
  var year  = date.substr(4,4);
  return (year + '-' + month + '-' + day);
}

// convert date from YYYY-MM-DD to MMDDYYYY if it isn't already
function convert_iso_date(date)
{
  if (date.indexOf('-') < 0)
    return date;
  var t = date.split('-');
  return t[1] + t[2] + t[0];
}

// Format date for display YYYY-MM-DD, DD/MM/YYYY or DD.MM.YYYY
function display_date(date, format)
{
  if (format === undefined || format == null)
    return date;

  var d = date.split('-');
  
  if (format == 'little')
  {
    return d[2] + '.' + d[1] + '.' + d[0];
  }
  if (format == 'middle')
  {
    return d[1] + '/' + d[2] + '/' + d[0];
  }
}

HITStorage.indexedDB.create();

// Backup plan
//HITStorage.update_date_format(true);

if (document.location.href.match('https://www.mturk.com/mturk/dashboard'))
{  
  var footer = document.getElementsByClassName('footer_separator')[0];
  if (footer == null)
    return;
 
  var extra_table = document.createElement('table');
  extra_table.width = '700';
  extra_table.style.boder = '1px solid black';
  extra_table.align = 'center';
  extra_table.cellSpacing = '0px';
  extra_table.cellPadding = '0px';
  var row1 = document.createElement('tr');
  var row2 = document.createElement('tr');
  var td1 = document.createElement('td');
  var content_td = document.createElement('td');
  var whatsthis = document.createElement('a');

  row1.style.height = '25px';
  td1.setAttribute('class', 'white_text_14_bold');
  td1.style.backgroundColor = '#7fb448';//'#7fb4cf';
  td1.style.paddingLeft = '10px';
  td1.innerHTML = 'HIT DataBase' + random_face() + ' ';
  content_td.setAttribute('class', 'container-content');  
  
  whatsthis.href = 'http://userscripts.org/scripts/show/149548';
  whatsthis.setAttribute('class', 'whatis');
  whatsthis.textContent = '(What\'s this?)';
  
  extra_table.appendChild(row1);
  row1.appendChild(td1);
  td1.appendChild(whatsthis);
  extra_table.appendChild(row2);
  row2.appendChild(content_td);
  footer.parentNode.insertBefore(extra_table, footer);  
 
  var my_bar = document.createElement('div');
  var search_button = document.createElement('button');
  var status_select = document.createElement('select');
  var label = document.createElement('label');
  var label2 = document.createElement('label');
  var input = document.createElement('input');
  var donut_select = document.createElement('select');
  var csv_label = document.createElement('label');
  var csv = document.createElement('input');

  var update_button = document.createElement('button');
  var delete_button = document.createElement('button');
  var pending_button = document.createElement('button');
  var overview_button = document.createElement('button');
  var import_button = document.createElement('button');
  var status_button = document.createElement('button');
  
  var from_input = document.createElement('input');
  var to_input = document.createElement('input');
  var date_label1 = document.createElement('label');
  var date_label2 = document.createElement('label');
  date_label1.textContent = 'from date ';
  date_label2.textContent = ' to ';
  from_input.setAttribute('id', "from_date");
  to_input.setAttribute('id', "to_date");
  to_input.setAttribute('maxlength', "10");
  from_input.setAttribute('maxlength', "10");
  to_input.setAttribute('size', "10");
  from_input.setAttribute('size', "10");
  from_input.title = 'Date format YYYY-MM-DD\nOr leave empty.';
  to_input.title = 'Date format YYYY-MM-DD\nOr leave empty.';

  var donut_options = [];
  donut_options[0] = document.createElement("option");
  donut_options[1] = document.createElement("option");
  donut_options[2] = document.createElement("option");
  donut_options[0].text = "---";
  donut_options[1].text = "Donut Chart HITS";
  donut_options[2].text = "Donut Chart REWARDS";
  donut_options[0].value = "---";
  donut_options[1].value = "HITS";
  donut_options[2].value = "REWARDS";

  var status_options = [];
  status_options[0] = document.createElement("option");
  status_options[1] = document.createElement("option");
  status_options[2] = document.createElement("option");
  status_options[3] = document.createElement("option");
  status_options[4] = document.createElement("option");
  status_options[5] = document.createElement("option");
  status_options[0].text = "Pending Approval";
  status_options[0].style.color = "orange"; 
  status_options[1].text = "Rejected";
  status_options[1].style.color = "red"; 
  status_options[2].text = "Approved - Pending Payment";
  status_options[2].style.color = "green"; 
  status_options[3].text = "Paid";
  status_options[3].style.color = "green"; 
  status_options[4].text = "Paid AND Approved";
  status_options[4].style.color = "green"; 
  status_options[5].text = "ALL";
  status_options[0].value = "Pending Approval";
  status_options[1].value = "Rejected";
  status_options[2].value = "Approved";
  status_options[3].value = "Paid";
  status_options[4].value = "Paid|Approved";
  status_options[5].value = "---";

  search_button.setAttribute('id', "search_button");
  input.setAttribute('id', "search_term");
  status_select.setAttribute('id', "status_select");
  label.setAttribute('id', "status_label");
  donut_select.setAttribute('id', "donut_select");
  delete_button.setAttribute('id', "delete_button");
  update_button.setAttribute('id', "update_button");
  overview_button.setAttribute('id', "overview_button");
  import_button.setAttribute('id', "import_button");
  pending_button.setAttribute('id', "pending_button");
  status_button.setAttribute('id', "status_button");

  my_bar.style.marginLeft = 'auto';
  my_bar.style.marginRight = 'auto';
  my_bar.style.textAlign = 'center';
  label.style.marginLeft = 'auto';
  label.style.marginRight = 'auto';
  label.style.textAlign = 'center';
  
  var donut = document.createElement('div');
  donut.setAttribute('id', "container");
  donut.style.display = 'none';

  content_td.appendChild(my_bar);
  my_bar.appendChild(delete_button);
  my_bar.appendChild(import_button);
  my_bar.appendChild(update_button);
  my_bar.appendChild(document.createElement("br"));
  my_bar.appendChild(pending_button);
  my_bar.appendChild(overview_button);
  my_bar.appendChild(status_button);
  my_bar.appendChild(document.createElement("br"));
  my_bar.appendChild(donut_select);
  my_bar.appendChild(status_select);
  my_bar.appendChild(label2);
  my_bar.appendChild(input);
  my_bar.appendChild(search_button);
  my_bar.appendChild(document.createElement("br"));
  my_bar.appendChild(date_label1);
  my_bar.appendChild(from_input);
  my_bar.appendChild(date_label2);
  my_bar.appendChild(to_input);
  my_bar.appendChild(csv_label);
  my_bar.appendChild(csv);
  my_bar.appendChild(document.createElement("br"));  
  my_bar.appendChild(label);
  my_bar.appendChild(document.createElement("br"));  
  (footer.parentNode).insertBefore(donut, footer);

  my_bar.style.textAlign = "float";
  search_button.textContent = "Search";
  search_button.title = "Search from local HIT database\nYou can set time limits and export as CSV-file";
  label2.textContent = " HITs matching: ";
  input.value = "";

  label.textContent = "Search powered by non-amazonian script monkeys";

  for (var i=0; i<status_options.length; i++)
    status_select.options.add(status_options[i]);
  for (var i=0; i<donut_options.length; i++)
    donut_select.options.add(donut_options[i]);

  update_button.title = "Fetch status pages and copy HITs to local indexed database.\nFirst time may take several minutes!";
  update_button.textContent = "Update database";
  update_button.style.color = 'green';
  update_button.style.margin = '5px 5px 5px 5x';
  delete_button.textContent = "Delete database";
  delete_button.style.color = 'red';
  delete_button.style.margin = '5px 5px 5px 5px';
  delete_button.title = "Delete Local DataBase!";
  import_button.textContent = "Import";
  import_button.style.margin = '5px 5px 5px 5px';
  import_button.title = "Import HIT data from exported CSV-file";
  overview_button.textContent = "Requester Overview";
  overview_button.style.margin = '0px 5px 5px 5px';
  overview_button.title = "Summary of all requesters you have worked for\nYou can set time limit and export as CSV-file";
  pending_button.textContent = "Pending Overview";
  pending_button.style.margin = '0px 5px 5px 5px';
  pending_button.title = "Summary of all pending HITs\nYou can export as CSV-file";
  status_button.textContent = "Daily Overview";
  status_button.style.margin = '0px 5px 5px 5px';
  status_button.title = "Summary of each day you have worked on MTurk\nYou can set time limit and export as CSV-file";

  pending_button.addEventListener("click", HITStorage.show_pendings, false);
  overview_button.addEventListener("click", HITStorage.show_overview, false);
  search_button.addEventListener("click", HITStorage.start_search, false);
  update_button.addEventListener("click", HITStorage.update_database, false);
  delete_button.addEventListener("click", delete_func(), false);
  import_button.addEventListener("click", import_func(), false);
  status_button.addEventListener("click", HITStorage.show_status, false);
  
  csv_label.textContent = 'export CSV';
  csv_label.title = 'Export results as comma-separated values';
  csv_label.style.verticalAlign = 'middle';
  csv_label.style.marginLeft = '50px';
  csv.title = 'Export results as comma-separated values';
  csv.setAttribute('type', 'checkbox');
  csv.setAttribute('id', 'export_csv');
  csv.style.verticalAlign = 'middle';

  from_input.value = '';
  to_input.value = '';

  var table = document.getElementById('lnk_show_earnings_details');
  if (table != null)
  {
    table = table.parentNode.parentNode.parentNode.parentNode;
    var pending_tr = document.createElement('tr');
    var pending_td1 = document.createElement('td');
    var pending_td2 = document.createElement('td');
    var today_tr = document.createElement('tr');
    var today_td1 = document.createElement('td');
    var today_td2 = document.createElement('td');
  
    pending_tr.setAttribute('class', 'even');
    pending_td1.setAttribute('class', 'metrics-table-first-value');
    pending_td1.setAttribute('id', 'pending_earnings_header');
    pending_td2.setAttribute('id', 'pending_earnings_value');
    today_tr.setAttribute('class', 'odd');
    today_td1.setAttribute('class', 'metrics-table-first-value');
    today_td1.setAttribute('id', 'projected_earnings_header');
    today_td2.setAttribute('id', 'projected_earnings_value');

    pending_tr.appendChild(pending_td1);
    pending_tr.appendChild(pending_td2);
    today_tr.appendChild(today_td1);
    today_tr.appendChild(today_td2);
    table.appendChild(pending_tr);
    table.appendChild(today_tr);

    pending_td1.style.borderTop = '1px dotted darkgrey';
    pending_td2.style.borderTop = '1px dotted darkgrey';
    today_td1.style.borderBottom = '1px dotted darkgrey';
    today_td2.style.borderBottom = '1px dotted darkgrey';

    today_td1.title = 'This value can be inaccurate if HITDB has not been updated recently';
    pending_td1.title = 'This value can be inaccurate if HITDB has not been updated recently';

    if (localStorage['HITDB UPDATED'] === undefined)
      pending_td1.textContent = 'Pending earnings';
    else
      pending_td1.textContent = 'Pending earnings (HITDB updated: ' + localStorage['HITDB UPDATED'] + ')'; 
    today_td1.innerHTML = 'Projected earnings for today &nbsp;&nbsp;';
    today_td2.textContent = '$-.--';
    pending_td2.textContent = '$-.--';
  

    var e = document.getElementById('user_activities.date_column_header.tooltip').parentNode.parentNode.childNodes[2].childNodes[1].childNodes[1];
    var today = null;
    if (e != null && e.textContent.trim() == 'Today') {
      today = convert_date(e.href.slice(-8));
      HITStorage.indexedDB.get_todays_projected_earnings(today);
    }
    HITStorage.indexedDB.get_pending_approvals();
    HITStorage.indexedDB.get_pending_payments();

    var target = document.createElement('span');
    target.setAttribute('id', 'my_target');
    target.textContent = 'click here to set your target';
    target.style.fontSize = 'small';
    target.style.color = 'blue';
    today_td1.appendChild(target);
    target.addEventListener("click", set_target_func(today), false);
  }
}
else if (document.location.href.match('https://www.mturk.com/mturk/preview'))
{
  var table = document.getElementById('requester.tooltip');
  if (table == null)
    return;
  table = table.parentNode.parentNode.parentNode;
  var title = table.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('div')[0].textContent.trim();
  
  var extra_row = document.createElement('tr');
  var td_1 = document.createElement('td');
  var td_2 = document.createElement('td');

  var requesterId = document.getElementsByName('requesterId')[0].value;
  var auto_approve = parseInt(document.getElementsByName('hitAutoAppDelayInSeconds')[0].value);

  var buttons = [];
  var b = ['Requester', 'HIT Title'];
  for (var i=0; i<b.length; i++)
  {
    buttons[i] = document.createElement('button');
    buttons[i].textContent = b[i];
    buttons[i].id = b[i] + 'Button' + i;
    buttons[i].style.fontSize = '10px';
    buttons[i].style.height = '18px';
    buttons[i].style.width = '80px';
    buttons[i].style.border = '1px solid';
    buttons[i].style.paddingLeft = '3px';
    buttons[i].style.paddingRight = '3px';
    buttons[i].style.backgroundColor = 'lightgrey';
    buttons[i].setAttribute('form', 'NOThitForm');
    td_1.appendChild(buttons[i]);
  }
  buttons[0].title = 'Search requester ' + requesterId + ' from HIT database';
  buttons[1].title = 'Search title \'' + title + '\' from HIT database';

  HITStorage.indexedDB.colorRequesterButton(requesterId, buttons[0]);
  HITStorage.indexedDB.colorTitleButton(title, buttons[1]);
  buttons[0].addEventListener("click", search_func(requesterId, 'requesterId'), false);
  buttons[1].addEventListener("click", search_func(title, 'title'), false);

  td_2.innerHTML = '<span class="capsule_field_title">Auto-Approval:</span>&nbsp&nbsp' + HITStorage.formatTime(auto_approve*1000) + '';
  td_1.colSpan = '3';
  td_2.colSpan = '8';

  extra_row.appendChild(td_1);
  extra_row.appendChild(td_2);
  table.appendChild(extra_row);
}
else
{
  for (var item=0; item<10; item++) {
    var tooltip = document.getElementById('requester.tooltip--' + item);
    if (tooltip == null)
      break; // no need to continue
    var titleElement = document.getElementById('capsule' + item + '-0');
    var emptySpace = tooltip.parentNode.parentNode.parentNode.parentNode.parentNode;
    
    var hitItem = tooltip.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;//.parentNode;

    var requesterLabel = tooltip.parentNode;
    var requesterId = tooltip.parentNode.parentNode.getElementsByTagName('a');
    var title = titleElement.textContent.trim();

    requesterId = get_requester_id(requesterId[1].href);
  
    var buttons = [];
    var row = document.createElement('tr');
    var div = document.createElement('div');
    emptySpace.appendChild(row);
    row.appendChild(div);

    /* Turkopticon link next to requester name */
    //to_link = document.createElement('a');
    //to_link.textContent = ' TO ';
    //to_link.href = 'https://turkopticon.differenceengines.com/' + requesterId;
    //to_link.target = '_blank';
    //to_link.title = requesterId + ' on Turkopticon';
    //tooltip.parentNode.parentNode.appendChild(to_link);
    /*-----------------------------------------*/
    
    HITStorage.indexedDB.blockHITS(requesterId, title, hitItem, titleElement);
          
    var b = ['R', 'T', 'N', 'B'];
    for (var i=0; i<b.length; i++)
    {
      buttons[i] = document.createElement('button');
      buttons[i].textContent = b[i];
      buttons[i].id = b[i] + 'Button' + i;
      buttons[i].style.height = '18px';
      buttons[i].style.fontSize = '10px';
      buttons[i].style.border = '1px solid';
      buttons[i].style.paddingLeft = '3px';
      buttons[i].style.paddingRight = '3px';
      buttons[i].style.backgroundColor = 'lightgrey';
      div.appendChild(buttons[i]);
    }
    buttons[0].title = 'Search requester ' + requesterId + ' from HIT database';
    buttons[1].title = 'Search title \'' + title + '\' from HIT database';
    buttons[2].title = 'Add a requester note';
    buttons[3].title = '"Block" requester';

    var notelabel = document.createElement('label');
    notelabel.textContent = '';
    notelabel.id = b[i] + 'notelabel' + item;
    notelabel.style.height = '18px';
    notelabel.style.fontSize = '10px';
    notelabel.style.marginLeft = '10px';
    notelabel.style.padding = '1px';
    notelabel.style.backgroundColor = 'transparent';
    HITStorage.indexedDB.updateNoteButton(requesterId, notelabel);
    div.appendChild(notelabel);

    HITStorage.indexedDB.colorRequesterButton(requesterId, buttons[0]);
    HITStorage.indexedDB.colorTitleButton(title, buttons[1]);
    buttons[0].addEventListener("click", search_func(requesterId, 'requesterId'), false);
    buttons[1].addEventListener("click", search_func(title, 'title'), false);
    buttons[2].addEventListener("click", note_func(requesterId, notelabel), false);
    buttons[3].addEventListener("click", block_func(requesterId, title, hitItem), false);

    div.style.margin = "0px";
    
    buttons[2].style.visibility = "hidden"; // "visible"
    buttons[2].parentNode.addEventListener("mouseover", visible_func(buttons[2], true), false);
    buttons[2].parentNode.addEventListener("mouseout", visible_func(buttons[2], false), false);
    buttons[2].addEventListener("mouseout", visible_func(buttons[2], false), false);
    buttons[3].style.visibility = "hidden"; // "visible"
    buttons[3].parentNode.addEventListener("mouseover", visible_func(buttons[3], true), false);
    buttons[3].parentNode.addEventListener("mouseout", visible_func(buttons[3], false), false);
    buttons[3].addEventListener("mouseout", visible_func(buttons[3], false), false);
  }

  var auto_button = document.createElement('button');
  auto_button.setAttribute('id', 'auto_button');
  auto_button.title = 'HIT DataBase Auto Update\nAutomagically update newest HITs to database when reloading this page';

  if (localStorage['HITDB AUTO UPDATE'] === undefined)
  {
    auto_button.textContent = 'Auto update ?';
    auto_button.style.color = 'red';
  }
  else if (localStorage['HITDB AUTO UPDATE'] == 'ON')
  {
    auto_button.textContent = 'Auto Update is ON';
    auto_button.style.color = 'green';
  }
  else
  {
    auto_button.textContent = 'Auto Update is OFF';
    auto_button.style.color = 'red';
  }
  
  var element = document.body.childNodes[13].childNodes[3].childNodes[1].childNodes[0].childNodes[5];
  element.insertBefore(auto_button, element.firstChild);
  auto_button.addEventListener("click", auto_update_func(), false);
 
  setTimeout(HITStorage.getLatestHITs, 100);
}
