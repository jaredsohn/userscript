{
  // ==UserScript==
  // @name           What.CD :: Analyze This!
  // @namespace      http://www.what.cd
  // @description    Analyzes the stats of the current page table without interacting with server. Only if you userId is the one you are browsing
  // @include        http*://*what.cd/torrents.php?*type=uploaded&userid=*
  // @version        0.3
  // ==/UserScript==

    (function() {

        // Parametrize from this line... 0 == no stats

        TOPSNATCHED = 5; // I want to see Top 5 Snatches
        TOPUPLOADED = 5; // I want to see Top 5 Uploaded
        TOPLEECHED  = 5; // I want to see Top 5 Leeched
        TOPYEARS    = 5; // I want to see Top 5 uploaded years
        TOPARTISTS  = 5; // I want to see Top 5 uploaded artists

        // To this line.

        var zeroSnatches    = 0;
        var zeroSeeders     = 0;
        var zeroLeechers    = 0;

        var mainTable;

        // normal array to manage 50 rows
        var rowsCollection = [];

        // associative arrays to manage number of ocurrences on every artist and year
        artists = {};
        years   = {};

        clicked = 0;

        /* var definitions and getElementByClassName functions borrowed from What.CD :: Post History Catch Up
            All Credits go to carlosr on What CD

        */
        var whatcd_base_url = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];
        var target = document.getElementById('userinfo_username').getElementsByTagName('li');
        var userId = target[0].innerHTML.match(/[0-9]{1,}/);

        function getElementByClassName(theClass) {
        var allTags = document.getElementsByTagName("*");
        for ( i = 0; i < allTags.length; i++ ) {
          if ( allTags[i].className == theClass) {
            return allTags[i];
          }
        }
      }


        /*
            Various sorting functions
            Update: we must take up thousands separator
        */

        function sortSnatched(a,b){

            return b.snatches.replace(",","") - a.snatches.replace(",","");

        }

        function sortUploaded(a,b){

            return b.seeders.replace(",","") - a.seeders.replace(",","");

        }

        function sortLeeched(a,b){

             return b.leechers.replace(",","") - a.leechers.replace(",","");

        }


      function assocSort (A) {

      B = [];

        for (i in A) {
            B.push({v: i, c: A[i]});
        }
        B.sort(function (x, y) {return y.c - x.c;});

      return B;
       }

      /*
        javascript object to store table data on members.
        */
      function tableRow(artist, title, year, size, snatches, seeders, leechers, number ) {
        this.artist    = artist;
        this.title     = title;
        this.year      = year;
        this.size      = size;
        this.snatches  = snatches;
        this.seeders   = seeders;
        this.leechers  = leechers;
        this.number    = number;

      }
      /*
      Function to fill tables on main stats
      */

        function fillTable(category, results) {

            table = document.getElementById(category);

            if (table != null && table.style.display != "none"){

               for (result = 0; result < results.length; result++) {

                    auxTable = document.getElementsByTagName("table")[7]; // Yes, we have inserted 5 tables ;)
                    auxBody  = auxTable.getElementsByTagName("tbody")[0];
                    tdContent = auxBody.getElementsByTagName("tr")[results[result].number].cells[1].innerHTML;

                        switch (category)
                        {
                            case "topSnatched":
                               content = "<tr><td class=\"nobr\" style=\"text-align: left\">" + tdContent +"</td><td >" + results[result].snatches + "</td></tr>";
                            break;
                            case "topUploaded":
                               content = "<tr><td class=\"nobr\" style=\"text-align: left\">" + tdContent +"</td><td >" + results[result].seeders + "</td></tr>";
                            break;
                            case "topLeeched":
                                content = "<tr><td class=\"nobr\" style=\"text-align: left\">" + tdContent +"</td><td >" + results[result].leechers + "</td></tr>";
                            break;

                        }
                    table.innerHTML += content;
                }

            }

        }
      /*
      Function to fill tables on artists/years stats
      */

        function fillGroupedTable(category, results, num) {

            table = document.getElementById(category);
            content = "";
          //alert(results.toSource());
            if (table != null && table.style.display != "none"){

                for (key in results) {
                   if (key < num)
              content += content = "<tr><td class=\"nobr\" style=\"text-align: left\">" + results[key].v + "</td><td >" + results[key].c + "</td></tr>";
                }

            }
             table.innerHTML += content;
        }


        /*
        Function to create table based on prefilled rowsCollection
        */
        function makeSortedStat(category, size) {

        if (rowsCollection != null && rowsCollection.length > 0){

            if (size > 0) {

                results = {};

                switch (category)
                {
                    case "topSnatched":
                        results = rowsCollection.sort(sortSnatched).slice(0,TOPSNATCHED);
                        fillTable(category, results);
                    break;
                    case "topUploaded":
                        results = rowsCollection.sort(sortUploaded).slice(0,TOPUPLOADED);
                        fillTable(category, results);
                    break;
                    case "topLeeched":
                        results = rowsCollection.sort(sortLeeched).slice(0,TOPLEECHED);
                        fillTable(category, results);
                    break;
                    case "topYears":
                        results =assocSort(years);
                        fillGroupedTable(category, results, TOPYEARS);

                    break;
                    case "topArtists":
                        results = assocSort(artists);
                        fillGroupedTable(category, results,TOPARTISTS);
                    break;
                }
            } else { // No stats? table is hidden
                document.getElementById(category).style.display = "none";
                }
            }
        }
        /*
        Function to analyze each row and fill rowsCollection
        */
        function analyzeRow(theRow, num){
            // cell 0 contains category, skipped by now
             rawHTML = theRow.cells[1].innerHTML;

            // Brute force regex matching the TD content
            matcher = /(<a href="artist.php\?id=.+">.+<\/a>) - (<a href="torrents.php\?id=.+">.+<\/a>).+\[(\d\d\d\d)\]/;
            matched =  rawHTML.match(matcher);
            artist  = RegExp.$1;
            title   = RegExp.$2;
            year    = RegExp.$3;

            if (artists[artist] == undefined || artists[artist] == null || artists[artist] == "")
                artists[artist] = 1;
             else
                artists[artist]++;

            if(year == null || year== "")
                year = "Unknown";

            if (years[year] == undefined || years[year] == null || years[year] == "")
                years[year] = 1;
             else
                years[year]++;

            // TODO: Analyze other info from the infoNode using a more complex Matcher perhaps ?

            size = theRow.cells[3].textContent;

            snatches =  theRow.cells[4].textContent;

            if (snatches == "0")
                zeroSnatches++;

            seeders = theRow.cells[5].textContent;
            if (seeders == "0")
               zeroSeeders++;

            leechers = theRow.cells[6].textContent;
            if (leechers == "0")
               zeroLeechers++;

            tr = new tableRow(artist, title, year, size, snatches, seeders, leechers, num) ;

            return tr;

    }

        /*
        Main analysis function
        */
        function analyze(){

            if (clicked == 0) {
                // We analyze the  3rd table on the page (no id or class... so guessing)
                    clicked = 1;
                    mainTable = document.getElementsByTagName("table")[2];
                if(mainTable != null && rowsCollection != null && rowsCollection.length == 0){ // failsafe check
                  analyzeBody = mainTable.getElementsByTagName("tbody")[0];
                  if (analyzeBody !== null){ // again, failsafe check
                       rows = analyzeBody.getElementsByTagName("tr");
                     if (rows != null){ // keep safe, my friend
                        for (rowNum = 1; rowNum < rows.length; rowNum++){ // first row (0) is header, so, skipped
                          row = rows[rowNum];
                          analyzedRow = analyzeRow(row, rowNum);

                                    if(analyzedRow != null)
                                        rowsCollection[rowsCollection.length] = analyzedRow;
                        }
                                // We create new content on DOM
                                getElementByClassName('linkbox').innerHTML += "<div id=\"analysis\" style=\"display: none\"><table class=\"analyzed\" id=\"topSnatched\"><tr class=\"colhead\"><td  >Top Snatched</td><td>Times</td></tr></table><table class=\"analyzed\" id=\"topUploaded\"><tr class=\"colhead\"><td >Top Uploaded</td><td>Times</td></tr></table><table class=\"analyzed\" id=\"topLeeched\"><tr class=\"colhead\"><td >Top Leeched</td><td>Times</td></tr></table><div class=\"statsContainer\"<table class=\"analyzedhalf1\" id=\"topYears\"><tr class=\"colhead\"><td>Years </td><td>Times</td></tr></table><table class=\"analyzedhalf2\" id=\"topArtists\"><tr class=\"colhead\"><td>Artists</td><td>Times</td></tr></table></div><p style=\"clear: both\">Snatched 0 times: " + zeroSnatches + " | Not Seeding: " + zeroSeeders + " | No Leechers now: " + zeroLeechers + "</p></div>";

                                // Analysis of the data
                                makeSortedStat("topSnatched", TOPSNATCHED);
                                makeSortedStat("topUploaded", TOPUPLOADED);
                                makeSortedStat("topLeeched", TOPLEECHED);
                                makeSortedStat("topYears", TOPYEARS);
                                makeSortedStat("topArtists", TOPARTISTS);

                                // Finally, we make the analysis visible.
                                document.getElementById('analysis').style.display = "block";
                                // and hide the raw table
                                mainTable.style.display = "none";

                                document.getElementById('analyze').innerHTML = "Full Table";
                                document.getElementById('analyze').addEventListener('click', analyze, false);
                      }

                    }
                }
                    else {
                            mainTable = document.getElementsByTagName("table")[7]; // Yes, we have inserted 5 tables ;)
                            clicked = 1;
                            document.getElementById('analysis').style.display = "block";

                            mainTable.style.display = "none";

                            document.getElementById('analyze').innerHTML = "Full Table";
                            document.getElementById('analyze').addEventListener('click', analyze, false);
                    }
                }
                else {

                    mainTable = document.getElementsByTagName("table")[7]; // Yes, we have inserted 5 tables ;)
                    document.getElementById('analyze').textContent = "Analyze This!";
                    document.getElementById('analyze').addEventListener('click', analyze, false);
                    document.getElementById('analysis').style.display = "none";
                    mainTable.style.display = "block";
                    clicked = 0;
                }
        }

        // Main function begins here

      if (document.URL.indexOf("userid=" + userId) > -1) { // Are you watching your own uploads? Great! You can analyze!

          GM_addStyle("table.analyzed { clear: both; width: 75%!important; margin: 1em auto;} table.analyzedhalf1{float: left; width: 30%!important; margin: 1em} table.analyzedhalf2{float: right; width: 30%!important; margin: 1em} .statsContainer {clear: both; width: 75%!important; margin: 1em auto;}");

            getElementByClassName('linkbox').innerHTML += "&nbsp;&nbsp;&nbsp;<a href=\"#\" id=\"analyze\" class=\"beta\" onClick=\"analyze()\">Analyze this!</a>";
            analyze_link = document.getElementById('analyze');
            analyze_link.addEventListener('click', analyze, false);
      }
      /* Script Update Checker from: http://userscripts.org/scripts/show/20145 */
  var SUC_script_num = 70655; // Change this to the number given to the script by userscripts.org (check the address bar)
  try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
  /* Script Update Checker from: http://userscripts.org/scripts/show/20145 */

    })();}
