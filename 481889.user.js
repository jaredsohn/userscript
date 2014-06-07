// ==UserScript==
// @name        mTurkList Hourly
// @homepage    http://www.mTurkList.com
// @author      KS
// @description Displays mTurkList requester hourly pay in the mturk.com search
// @include     https://www.mturk.com/mturk/searchbar*
// @include     https://www.mturk.com/mturk/findhits*
// @include     https://www.mturk.com/mturk/viewhits*
// @include     https://www.mturk.com/mturk/viewsearchbar*
// @include     https://www.mturk.com/mturk/sortsearchbar*
// @include     https://www.mturk.com/mturk/sorthits*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       metadata
// @grant       GM_xmlhttpRequest
// @version     2.0
// ==/UserScript==



(function ()
{
    var G_HIT_URL = 'http://www.mTurkList.com/hit.php';
    var G_QUERY_URL = 'http://www.mTurkList.com/api/script_get_hourly.php';

    
    var HITS = [
    ];
    var HIT;

    
    function get_requester_id(s) {
        var idx = 12 + s.search('requesterId=');
        return s.substr(idx);
    }


    // Find missing (private) groupId's
    var groupIdMissing = [];
    for (var i = 0; i < 10; i++) {
        res = document.getElementById('private_hit.view_a_HIT_in_group.tooltip--' + i);
        if(res != null)  {
           groupIdMissing.push(i);
        }    
        else  {
           groupIdMissing.push(-1);
        }
        //alert(groupIdMissing[i]);
    }

    // Find all groupIds
    var groupID=[];
    var spans = document.getElementsByTagName('span');
    var found1 = 'groupId=';
    var found2 = '"';
    var count = 0;
    for (var i = 0; i < spans.length; ++i) {
        // There won't be a groupId for this one...
        if(groupIdMissing[count] == count)  {
           groupID.push('');
           count++;
           continue;
        }
        var html = spans[i].innerHTML;
        var found = html.search(found1);
        if(found != -1)  {
            var str1 = found1.length+found; // startpos
            found_str = html.substr(str1);
            var str2 = found_str.search(found2);          //endpos         
            groupID.push(found_str.substr(0,str2));
            count++;
        }
        
    }
 

 
    // Aquire form data

 var HIT_arr = [];
 var reqs = [];
 var groupIds = [];
 
    for (var item = 0; item < groupID.length; item++) {
         var hit_data = {
        };
    
        if(groupIdMissing[item] == item)  {
           continue;
        }

        var tooltip = document.getElementById('requester.tooltip--' + item);
		if (tooltip == null)
        	break;

        var titleElement = document.getElementById('capsule' + item + '-0');


        hit_data.title = titleElement.textContent.trim();
        hit_data.titleElement = titleElement;
        hit_data.groupId = groupID[item];
		groupIds[item] = hit_data.groupId;
		
		// Req id
		var requesterId = tooltip.parentNode.parentNode.getElementsByTagName('a');
		for (var i = 0; i < requesterId.length; i++)
		{
			if (requesterId[i].href.match(/requesterId=/))
			{
				hit_data.requesterId = get_requester_id(requesterId[i].href);
                reqs[item] = hit_data.requesterId;
				hit_data.requester = requesterId[i].textContent.trim();
			}
		}

       HIT_arr[item] = hit_data;
    }
    
	
    // query requesters
    var query_url = G_QUERY_URL;
    query_url = query_url.concat('?ids=');

    reqs.forEach(function(entry) {
        query_url = query_url.concat(entry,',');
    });


    function makeXhrQuery(url) {
        GM_xmlhttpRequest({
            method: 'GET',
            timeout: 3000,
            url: url,
            onload: function (results) {
                //alert(results.responseText);
                var obj = $.parseJSON(results.responseText);
                for (var item = 0; item < groupID.length; item++) {
                    if(groupIdMissing[item] == item)  {
                       continue;
                    }
                    // BUTTON
                    var hitURL = G_HIT_URL;
                    hitURL = hitURL.concat('?id=',groupID[item]);
                    a = document.createElement('a');
                    a.setAttribute('href', hitURL);
                    a.setAttribute('target', '_blank');
                    var hrly_txt = '';
                    var reqid = HIT_arr[item].requesterId;
                    if(reqid)  {
                       var reqObj = obj[reqid];
                        if(reqObj)  {
                          var fHourly = parseFloat(reqObj.hourly).toFixed(2);
                          hrly_txt = '';
                          hrly_txt = hrly_txt.concat('Typical Pay: $',fHourly.toString(),'/hr');
                        }
                    }
                    if(hrly_txt != '') {
                        var linkText = document.createTextNode(hrly_txt);
                        a.appendChild(linkText);
                        //button.title = G_TOOLTIP;
                        //button.style.height = '18px';
                        //button.style.width = '89px';
                        a.style.fontSize = '11px';
                        a.style.textDecorations = 'none';
                        a.style.border = '1px solid';
                        a.style.padding = '0px';
                        //a.style.backgroundColor = 'transparent';
                        HIT_arr[item].titleElement.parentNode.appendChild(a);
                    }
                }
            }
    
        });
    }
  //  alert(query_url);

    makeXhrQuery(query_url);

}) ();
