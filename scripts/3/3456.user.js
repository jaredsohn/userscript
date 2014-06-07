// ==UserScript==
// @name            StumbleUpon Tag Toplist
// @version	        0.4
// @namespace       http://www.jonasjohn.de/
// @description     Adds a little button to each StumbleUpon profile which allows you to see some advanced statistics about the tags (sort alphabetically or by tag count).
// @include         http://*.stumbleupon.com/
// @license         Modified BSD license (URL: http://www.jonasjohn.de/lab/swe/stt_license.txt)
// ==/UserScript==

(function(){

    // Thanks to michaelmike for his ideas and sending me his extensions for STT!
    // ( visit him: http://michaelmike.stumbleupon.com/ )

    function stt_init(){
        
        // build the "Show tag toplist" button:
        var get_url_btn = stt_mk_button('stt_btn', 'Show tag toplist');
        
        if (document.getElementById('changetag').options[0].selected) {
            
            // find the right position for the button:
            var xpath = "//td[@class='lightbg']/span[@class='mini']";
            var result = document.evaluate ( xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
            
            for ( var i = 0; i < result.snapshotLength; i++ ) {
                if (result.snapshotItem(i).innerHTML.indexOf('Joined') != -1 ){
                    result.snapshotItem(i).parentNode.innerHTML += '<br/><br/>' + get_url_btn;
                }
            }
            
        }
        else {
            // this idea is from michaelmike:
            // I made the code a little bit shorter ;-)
            document.getElementById('loading').parentNode.innerHTML += "&nbsp;" + get_url_btn;
        }
        
        // find last sorting method:
        var last_method = GM_getValue('stt_sort_by', 'tc');
        
        // add the function to the button:
        if (last_method == 'tc'){
            document.getElementById('stt_btn').addEventListener('click', stt_sort_by_tag_count, false);
        }
        else {
            document.getElementById('stt_btn').addEventListener('click', stt_sort_by_abc, false);
        }
    }
    

    function stt_mk_button(id, title){
    
        // you can customize the button style here:
        var style = 'border:1px solid; border-color:#FC9 #630 #330 #F96; padding:1px 4px 1px 4px;' + 
                     'font:bold 10px verdana,sans-serif;color:#FFF;background:#F60;' + 
                     'text-decoration:none; margin: 0px;';
        
        return ' <a id="'+id+'" href="javascript:void(0)" style="'+style+'">'+title+'</a>';
    }
    
    function stt_get_tags_array(method){
    
        // get the select box which contains all tags:
        var tags_select_box = document.getElementById('changetag');

        var reached_tags = 0;
        var pos = 0;
        
        var tags_array = new Array();
        
        for (var x = 0; x < tags_select_box.options.length; x++){
        
            var cur_item = tags_select_box.options[x].value;
        
            // start adding tags after we reached this spacer thing:
            if (cur_item == '-----------'){
                reached_tags = 1;
            }
            else if (reached_tags == 1){
            
                // yeah! start feeding the array with tags:
            
                var tag_line = cur_item.replace(/.([0-9]+)$/, '||$1').split('||');
                
                if (method == 'tc'){
                    // sort by tag count
                    
                    var num = tag_line[1]; var numkey = num;
                    var r = 10 - numkey.length;
                    for (var y=0; y < r; y++){ numkey = "0" + numkey; }
                    
                    // entries look like: "0000000010||10||tagname-here"
                    // so the javascript sort() function works correctly
                    
                    tags_array[pos] = numkey + '||' + num + '||' + tag_line[0];
                
                }
                else {
                    // sort by abc
                    
                    // entries look like: "tagname-here||10||tagname-here"
                    // so the javascript sort() function works correctly
                    
                    var num = tag_line[1];
                    
                    tags_array[pos] = tag_line[0] + '||' + num + '||' + tag_line[0];
                    
                }
                
                pos++;
                reached_tags = 1;
            }
            
        }
        
        return tags_array;
    
    }
    
    function stt_sort_by_abc(){
    
        // save last sorting method:
        GM_setValue('stt_sort_by', 'abc');
    
        tags_array = stt_get_tags_array('abc');
        
        // sort and reverse array:
        tags_array.sort();
        //tags_array.reverse();
        
        stt_show_stats(tags_array, 'abc');
    }
    
    function stt_sort_by_tag_count(){
        
        // save last sorting method:
        GM_setValue('stt_sort_by', 'tc');
        
        tags_array = stt_get_tags_array('tc');
        
        // sort and reverse array:
        tags_array.sort();
        tags_array.reverse();
        
        stt_show_stats(tags_array, 'tc');
    }
    
    function stt_show_stats(tags_array, method){
    
        /*
        ** Todo:
        ** - check for errors + error handling
        */
    
        // extract the stumbleupon username:
        var su_username = document.location.href.replace(/http:\/\/(.*?)\.stumbleupon.com\//, "$1");
        
        // calculate the number of tags displayed in one column
        var tag_number = tags_array.length;
        var r = tag_number % 3;
        var per_column = (tag_number-r) / 3;
        
        
        // build table header
        var stat_table = '<br/><table border="0" width="99%">';
        stat_table += '<tr><td colspan="3" class="darkbg" style="padding: 5px">';
        stat_table += '<span style="font-size:140%;font-weight:bold">';
        stat_table += 'Tag toplist <span style="font-size:80%; font-style: italic;">';
        stat_table += '-- an unofficial <a href="http://userscripts.org/scripts/show/3456">greasemonkey script</a> (v0.4)</span>';
        stat_table += '</span></td></tr>';
    
        // contains tag_list table 
        var tag_list = "";
    
        var tag_counter = 0;
        
        // max length - used to calculate prefix zeros
        var maxlen = String(tag_number);
            maxlen = maxlen.length;
        
        var tags_overall = 0;
        
        // statistics:
        var longest_tag = '';
        var shorttest_tag = '-----------------------------';
        
        
        // loop trough every tag and add it to the
        // table:
        
        var cur_char = '';
        
        for (var m=0; m < tags_array.length; m++){
            
            // split line
            var tag_item = tags_array[m].split('||');
            
            if (tag_counter == 0){
                tag_list += "<td width=30% valign=top>";
            }
            
            // prefix position numbers:
            var pos = String(m+1);
            var r = maxlen - pos.length;
            for (var p=0; p < r; p++){ pos = "0" + pos; }

            // remove zeros:
            var tag_count = tag_item[1].replace(/^[0]+/, '');
            var tagname = tag_item[2];
            
            
            if (method == 'abc'){
                if (tagname.match(/^[0-9]/)) {
                    // catch all numbers:
                    if (cur_char != '0-9'){
                        cur_char = '0-9';
                        tag_list += "<br><div style='font-size:120%; font-weight: bold; border-bottom: 1px solid #ccc; width: 90%;'>" + cur_char + "</div>";
                    }    
                }
                else {
                    if (cur_char != tagname.substr(0,1).toUpperCase()){
                        cur_char = tagname.substr(0,1).toUpperCase();
                        tag_list += "<br><div style='font-size:120%; font-weight: bold; border-bottom: 1px solid #ccc; width: 90%;'>" + cur_char + "</div>";
                    }
                }
    
            }
            
            tag_list += "<span style='font-size:90%'>" + pos + ".</span> ";
            tag_list += "<a href='http://"+su_username+".stumbleupon.com/tag/" + tagname + "/'>" + tagname + "</a>";
            tag_list += " <span style='font-size:80%'>("+tag_count+")</span><br>";
            
            if (tagname.length > longest_tag.length){ longest_tag = tagname; }
            if (tagname.length < shorttest_tag.length){ shorttest_tag = tagname; }
            
            tags_overall += parseInt(tag_count);
            
            // if the tag_counter is more than the calculated
            // per_column value --> start a new column
            if (tag_counter >= per_column){
                tag_list += "</td>";
                tag_counter = 0;
            }
            else { tag_counter++; }
            
        }
        
        // add tag summary: (ah... i love such statistics...)
        
        stat_table += "<tr><td colspan=3 class=darkbg style='padding: 5px'><b>Statistics: </b><br>";
        stat_table += "Tag count: " + tags_array.length + " - ";
        stat_table += "Tags used overall: " + tags_overall;
        stat_table += "<br>Longest tag: " + longest_tag + " ("+longest_tag.length+")";
        stat_table += " - shortest tag: " + shorttest_tag + " ("+shorttest_tag.length+")<br><br>";
        stat_table += stt_mk_button('btn_sort_tag_count', 'Sort by tag count') + "&nbsp;";
        stat_table += stt_mk_button('btn_sort_abc', 'Sort alphabetically');
        stat_table += "</td></tr>";
        stat_table += "<tr>"+tag_list+"</tr>";
        stat_table += "</table><div style='margin-top: 5px; font-size: 80%; text-align: right;'>";
        stat_table += "-- script made by <a href='http://hxseven.stumbleupon.com/'>hxseven</a>.</div><br>";
    
        // update page content:
        var element = document.getElementById('displayurls'); 
        element.innerHTML = stat_table; 
        
        // update the number of results
        document.getElementById('numresults').innerHTML = "0-" + tags_array.length;
 
        // disable next + prev buttons 
        // -- we dont have an use for them here
        document.getElementById('greynext').style.display='';
        document.getElementById('next').style.display = 'none';
        document.getElementById('greynext2').style.display='';
        document.getElementById('next2').style.display = 'none';
    
        // add the function to the button:
        document.getElementById('btn_sort_tag_count').addEventListener('click', stt_sort_by_tag_count, false);
        document.getElementById('btn_sort_abc').addEventListener('click', stt_sort_by_abc, false);
        
    }

    stt_init();
  
}) ();


