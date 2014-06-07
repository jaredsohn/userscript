// ==UserScript==
// @name       Spserpuhov highlighter
// @namespace  http://userscripts.org/scripts/show/136857
// @version    1.8.2
// @updateURL      https://userscripts.org/scripts/source/136857.meta.js
// @downloadURL    https://userscripts.org/scripts/source/136857.user.js
// @description  plugin for SP module on bbforum
// @match      http://spserpuhov.ru/*
// @copyright  2012+, Pavel Tyrsa
// @require  https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  http://tablesorter.ru/jquery.tablesorter.js
// @run-at document-end
// ==/UserScript==
//scan prototype for array to find equal objects
Array.prototype.scan = function() {
    for (var values = [], counts = [], zakazes = [], i = 0, length = this.length-1; i < length; i++) {
        //alert(this+'^'+length+'^'+i);
        var k = this[i].split(": ");
        var j = values.indexOf(k[0].replace(/(\D)/gm,""));                                //not forget remove all nondigits
        //alert(k[0]+'|'+k[1]);
        if (j < 0) {                                                                      //if not exist this "values" - add in  "values" and "counts"
            values.push(k[0].replace(/(\D)/gm,""));                                       //not forget remove all nondigits
            counts.push(1);
            (k[1]!=undefined)?(zakazes.push(1)):(zakazes.push(0));
        } else {counts[j]++;
                if(k[1]!=undefined){zakazes[j]++};}                                       //if exist part 2 of "k" add +1 in "zakazes"
        //alert("values="+values+" counts="+counts+" zakazes="+zakazes);
    }
    for (var sizes_to_mark = [], count_of_sizes_to_mark = [], count_of_zakazes=[], i = 0, length = values.length; i < length; i++) {
        var d = counts[i]-zakazes[i];
        //alert("d("+d+") = counts[i]("+counts[i]+") - zakazes[i]("+zakazes[i]+")");
        if (d <= 2 && d > 0){                                                            //how mutch free positions is there //alert(values[i]+':'+zakazes[i]+' from '+counts[i]);
            sizes_to_mark.push(values[i]); //$(this).addClass("marked_item");
            count_of_sizes_to_mark.push(counts[i]);
            count_of_zakazes.push(zakazes[i]);
            //alert(values[i]);
        }
    }
    var sizes = [sizes_to_mark,count_of_sizes_to_mark,count_of_zakazes]
        return [sizes];
};
//add custom widget for tablesorter
$.tablesorter.addWidget({ 
    // give the widget a id 
    id: "zebraGroup", 
    // format is called when the on init and when a sorting has finished 
    format: function(table) { 
        // add class for first row
        table.tBodies[0].rows[0].classList.remove('odd');//not forget about remove another class
        table.tBodies[0].rows[0].classList.add('even');
		//$("tbody tr:nth-child(1)").addClass("even");
        // loop all tr elements and insert a copy of the "headers" 
        //alert('test');
        for(var j='even',i=1; i < table.tBodies[0].rows.length; i++) { 
            
            //alert(table.tBodies[0].rows[i].cells.length);
            if(table.tBodies[0].rows[i].cells[1].innerHTML+table.tBodies[0].rows[i].cells[3].innerHTML != table.tBodies[0].rows[i-1].cells[1].innerHTML+table.tBodies[0].rows[i-1].cells[3].innerHTML) {
                if(j=='even'){j='odd';}else{j='even';}//not use substr, use regexp
            }
            //alert(table.tBodies[0].rows[i].cells[1].innerHTML.substr(-10,6)+table.tBodies[0].rows[i].cells[3].innerHTML+" ?= "+table.tBodies[0].rows[i-1].cells[1].innerHTML.substr(-10,6)+table.tBodies[0].rows[i-1].cells[3].innerHTML); 
            table.tBodies[0].rows[i].classList.remove('odd');//not forget about remove another class
            table.tBodies[0].rows[i].classList.remove('even');
			table.tBodies[0].rows[i].classList.add(j);
            //re = /(< \d+(\.\d)*)/i;
            //alert(table.tBodies[0].rows[i].cells[1].innerHTML.match(re));
			//$("tbody tr:nth-child(" + (i+1) + ")").addClass(j);
        } 
    } 
}); 
//add custom styles
GM_addStyle
    (
        '.Tablesorter {                                                                      \
font-family:arial;                                                               \
background-color: #CDCDCD;                                                       \
margin:10px 0pt 15px;                                                            \
font-size: 8pt;                                                                  \
text-align: left;                                                                \
}                                                                                    \
.Tablesorter thead tr th, .Tablesorter tfoot tr th {                                 \
background-color: #e6EEEE;                                                       \
border: 1px solid #FFF;                                                          \
font-size: 8pt;                                                                  \
padding: 4px 19px 0px 4px;                                                       \
}                                                                                    \
.Tablesorter thead tr .header {                                                      \
background-image: url(http://tablesorter.ru/themes/blue/bg.gif);                 \
background-repeat: no-repeat;                                                    \
background-position: center right;                                               \
cursor: pointer;                                                                 \
}                                                                                    \
.Tablesorter tbody td {                                                              \
color: #3D3D3D;                                                                  \
padding: 4px;                                                                    \
background-color: #CADCEB;                                                       \
vertical-align: top;                                                             \
}                                                                                    \
.Tablesorter tbody tr.odd td {                                                       \
background-color:#F0F0F6;                                                        \
}                                                                                    \
.Tablesorter thead tr .headerSortUp {                                                \
background-image: url(http://tablesorter.ru/themes/blue/asc.gif);                \
}                                                                                    \
.Tablesorter thead tr .headerSortDown {                                              \
background-image: url(http://tablesorter.ru/themes/blue/desc.gif);               \
}                                                                                    \
.Tablesorter thead tr .headerSortDown, .Tablesorter thead tr .headerSortUp {         \
background-color: #8dbdd8;                                                           \
}                                                                                    \
#custom_menu_button {         \
background-color: red;         \
top: 100px;         \
color: white;         \
font-size: 16px;         \
left: 3px;         \
padding: 4px;         \
position: fixed;         \
cursor: pointer;                                                                  \
}                                       \
#cust_menu_body {         \
overflow-y: scroll;\
display: none;\
background-color: rgb(238, 238, 238);\
top: 100px; color: rgb(51, 51, 51);\
font-size: 12px;\
left: 25px;\
padding: 5px;\
position: fixed;\
border: 1px solid rgb(255, 0, 0);\
height: 200px;\
width: 200px;\
}                                       \
#cust_menu_back_button {background-color:#ff0000;color: white;font-size: 16px;cursor:pointer;position:fixed;padding-top:5px;padding-left:5px;\
}'                                                                                 
    );

//add script insertion func
function contentEval(source) {
    // Check for function input.
    if ('function' == typeof source) {
        // Execute this function with no arguments, by adding parentheses.
        // One set around the function, required for valid syntax, and a
        // second empty set calls the surrounded function.
        source = '(' + source + ')();'
            }
    // Create a script node holding this  source code.
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.
    document.body.appendChild(script);
    //document.body.removeChild(script);
}

//add function for open file and process
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    
    if (!files.length) {
        alert('Please select a file!');
        return;
    }
    var f = files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = function(evt){
        //alert(f.name); //filename
        lines = evt.target.result.split(/\r\n|\r|\n/);
        lines.forEach(fillCatalog);
        document.getElementById('list').textContent = lines[0]; //content of file
    }
        // Read in the image file as a data URL.
        reader.readAsText(f);
    
    
};
 //add function for filling catalog
                function fillCatalog(element, index, array){
                    var newItem=element.split(/^/);
                    contentEval( function() {add_item()});
                };

//main
//check page status
if ('interactive' == document.readyState) {
} else {
    alert("Перезагрузите страницу (document.readyState: " + document.readyState+")");
}

//check redystate event
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        //if we in catalog pages
        ///add extra button adding free_purchase in catalog after document in complete status
        
        //// add menu div
        if(window.location.href.indexOf("catalog_edit.php?catalog_id") > -1) {
            // script for insertion in page scope
            contentEval( function() {
                //window.curent_catalogItemID= function(){id=null;i=0;for(c in items){if(i==page-1){id=items[c].id};i++};return id;};
                window.fill_catalog = function(new_item_obj){
                    var curent_catalogItemID=null;var i=0;for(c in items){if(i==page-1){curent_catalogItemID=items[c].id};i++};
                    if (curent_catalogItemID != null){
                        document.getElementById('edit_name_'+curent_catalogItemID).value = new_item_obj.nam;
                        change_item(curent_catalogItemID);
                        document.getElementById('edit_price_'+curent_catalogItemID).value = new_item_obj.sum;
                        change_item(curent_catalogItemID);
                        document.getElementById('sp_load_photo').value = new_item_obj.uri;
                        spshka.photo.load(curent_catalogItemID);
                    }else{alert("ID модели каталога не удалось определить. Попробуйте перезагрузить страницу.")}
                };
                //add function for open\close filling catalog custom menu 
                cust_menu_open_close=function(){
                    var menu_direction=document.getElementById("custom_menu_button");
                    if (menu_direction.innerHTML == "\u00bb"){
                        document.getElementById("cust_menu_body").style.display="block";
                        menu_direction.innerHTML="\u00ab"}
                    else{
                        document.getElementById("cust_menu_body").style.display="none";
                        menu_direction.innerHTML="\u00bb"}};
                
               
                
            } );
            //adding div menu content
            $('#page-body').children('#page-body').after('<div id="custom_menu"><div id="custom_menu_button" onclick="cust_menu_open_close();">\u00bb</div><div id="cust_menu_body"><input type="file" id="files" name="files[]" multiple /><output id="list"></output></div>');
            //add event on input button
                document.getElementById('files').addEventListener('change', handleFileSelect, false);
                
            
            
            //add copy to catalog button
            var delbtn=$('div#sp_new_2').children('div[title="Полностью удалить некорректный заказ из базы данных"]');
            delbtn.css({'width':'70px','float':'left'}).each(
                function(){
                    var id=$(this).attr('onclick');
                    var re=/\((\d*)/ig;
                    id=re.exec(id);
                    //alert(id[1]);
                    var input_val=$('input[id~="edit"]');
                    
                    $(this).after('<div id="copy" style="font-size: 10px; color: #ff0000; padding-top: 5px; padding-bottom: 10px; cursor: pointer; width: 300px;" onclick=\'fill_catalog(spshka.items.new_items['+id[1]+']);\'>\u041a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c</div>');
                }
            );
            
            
            
        }else if(window.location.href.indexOf("viewtopic.php") > -1){
            //if we in topics pages
            
            //start highlight purchasess
            $(".content").find("p:contains(\"Размер: \")").addClass("tovar_rows").each(     //for every articul - brake on array of packets
                function(){
                    if($(this).text().indexOf("\*") == -1){
                        //alert("!"+$(this).text()+"!");
                        //alert(this);
                        var row = $(this).text().replace(/(\r\n|\n|\r|\t)/gm,"").split(/Размер: /);
                        
                        row.shift();
                        //alert(row);
                        
                        for (var i = 0; i < row.length; i++){
                            //var razmer_row = row[i].split("; ");
                            var sizes = row[i].split("; ").scan();
                            for (var m = 0; m < sizes[0][0].length; m++){
                                //alert("sizeS = "+sizes[0][0]);
                                
                                var size_to_mark = sizes[0][0][m];
                                var count_size_to_mark = sizes[0][1][m];
                                var zakazes = sizes[0][2][m];
                                var start=(zakazes)+count_size_to_mark*i;
                                var end = count_size_to_mark+count_size_to_mark*i;
                                
                                //alert("size = "+size_to_mark+"("+count_size_to_mark+"|"+zakazes+")");
                                
                                //alert(i+" row is about"+razmer_row.length);
                                $(this).find("font:contains("+size_to_mark+")").slice(start,end).css({'text-decoration':'underline','color':'red','font-weight':'bolder','font-size':'1.2em'});
                                //    $(this).children("font:nth-child(5)").css("text-decoration","underline");
                                // $("font").slice(5,7).css("color", "red");
                            }
                        }
                    }
                    
                });
            //mark header
            $(".content table tr:first-child td:contains(\"Очередность\")").parent('tr').parent('tbody').parent("table").addClass("Tablesorter").prepend('<thead></thead>').children('thead').prepend($('.Tablesorter tbody tr:first')).children('tr').children('td').replaceWith(function(i, html) {
                return '<th>' + html + '</th>';
            });
            //add tablesorter
            $(".Tablesorter").tablesorter({sortList:[[1,0],[3,0],[5,0]],widgets: ['zebraGroup']});		//use tablesorter plugin for table
            
        }    
        
        
    }
}