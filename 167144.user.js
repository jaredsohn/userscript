// ==UserScript==
// @name        yahoodiff
// @namespace   yahoodiff
// @description Merchandise diff on service plus of Yahoo! TW
// @include     http://tw.serviceplus.yahoo.com/*
// @version     1
// ==/UserScript==

function addYUI(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://yui.yahooapis.com/3.10.0/build/yui/yui-min.js");
  script.addEventListener('load', function() {
    main();
  }, false);
  document.body.appendChild(script);
}
 
// load YUI and execute the main function
addYUI();

var cid = "";
var ctitle = "";
var cvalue ="";
function main(){

	YUI().use("node", "event", "overlay", "uploader", "json-parse", "panel", "dd-plugin", "dd-constrain", "gallery-datatable-paginator", "gallery-paginator-view", 
          "handlebars", "io", "dump", "datatype-date", "node-event-simulate", "calendar", "datatable", "datasource-local", "history", function (Y) {

		var buttons =  "<div style='position:absolute;z-index:5;background:#000;color:white;padding:1em;width:12em;text-align:left'>" 
				 + "<ul><li><input type='button' id='check' value='將此頁加入觀察清單' /></li></ul>"
				 + "<ul><li><input type='button' id='visit' value='顯示差異' /></li></ul>"
				 + "<div id='stitle' style='font-size:1.4em'></div><div id='diff' style='margin-left:0.8em'></div></div>";
				 //<li><a href='http://tw.serviceplus.yahoo.com/item/detail/000006183641'>婚紗攝影.自助婚紗.新娘秘書.婚禮攝影 5studio婚紗攝影工作室</a><span> [X]</span>
		var diffDefault =  "<ul id='difflist' style='list-style-type:square'></li>"
				 + "<li></li>"
				 + "<li></li></ul>";

		 Y.one("body").prepend(buttons);
		 Y.one("#diff").appendChild(diffDefault);
		 //Y.log(Y.one("input[name='cat_id']").get("value"));
		 cid = Y.one("input[name='cat_id']").get("value");

		 //Y.log(Y.all(".itemhd a span").item(3).getHTML());
		 ctitle = Y.all(".itemhd a span").item(3).getHTML();

		 //Y.log(Y.one(".rthd h2").getHTML());
		 cvalue = Y.one(".rthd h2").getHTML();

		 Y.one("#stitle").setHTML(ctitle);
		 
		var check = document.getElementById('check');
		if(check) check.addEventListener('click',function(){
			save_compare_data(ctitle, cid, cvalue);
			var data = load_compare_data(ctitle);
			for(x in data){
				//Y.log(data[x]);

				Y.one("#difflist").appendChild("<li>" + data[x] + "<span> [X]</span></li>");
			}
		},false);

		Y.one("body").addClass("yui-skin-sam");
		var visit = document.getElementById('visit');
		if(visit) visit.addEventListener('click',function(){
			    var queryPrice = new Y.Panel({
		        contentBox: "",
		        headerContent: "Diff",
		        bodyContent: "",
		        width: "500px",
		        height: "450px",
		        zIndex: 5,
		        modal: true,
		        visible: false,
		        centered: true,
		        render: true,
		        hideOn: [
		            { eventName: 'key', keyCode: 'esc', node: Y.one('doc') },
		            { eventName: 'clickoutside' }
		        ]
		    });
		},false);

		//Y.log(load_compare_data(ctitle));
		var data = load_compare_data(ctitle);
			for(x in data){
				//Y.log(data[x]);
				
				Y.one("#difflist").appendChild("<li>" + data[x] + "<span class='sdelete'> [X]</span></li>");
			}
		Y.all(".sdelete").on("click", function(){
			alert("delete");
			//Y.log(33);
		})
	});

}

function save_compare_data($category, $id, $value){
    $category_data = window.localStorage[$category];
    $category_data_map = {}
    try {
        $category_data_map = JSON.parse($category_data);
    } catch (e) {
        $category_data_map = {};
       }
    $category_data_map[$id] = $value;
    try {
        $category_input_json = JSON.stringify($category_data_map);
        window.localStorage[$category] = $category_input_json;
    } catch (e) {}
}

function clear_compare_data($category){
    window.localStorage[$category] = {};
}

function load_compare_data($category){
    $category_data_json = window.localStorage[$category];
    try {
        $category_data = JSON.parse($category_data_json);
        return $category_data;
    } catch (e) {
        return {};
    }
}

function sample(){
	$sample_input = {};
	$sample_input['id'] = '000000123456';
	$sample_input['name'] = 'hello car';
	$sample_json = JSON.stringify($sample_input);
	save_compare_data('攝影服務', '000000123456', $sample_json);
	save_compare_data('攝影服務', '000000222222', $sample_json);
	$sample_output = load_compare_data('攝影服務');

	console.debug($sample_output);

}

function main2(){

	YUI().use('node', 'event', 'io', function (Y) {
	    //console.log(Y.one(".results").getHTML());
	    
	    if (Y.one(".resultcaption") !== null) {

		    //Y.one(".resultcaption").appendChild('<div class="col4">結束22時間</div>');
		    //Y.all(".results li").appendChild('<div class="col4">ss</div>');
		    //Y.all(".results .col3").insert('<div class="col4">myyy</div>', "after");
		    //Y.one(".resultcaption .col3").insert('<div class="col4">myyy title</div>', "after");

		    //Y.all(".col5").setStyle("width", "40px");
		    Y.all("#ycmysrresult").setStyle("width", "2200px");
		    Y.one("body").setStyle("overflow", "auto");
			//Y.log(Y.one(".results .col2 p a").getHTML());
			Y.log(Y.one(".results .col2 p a").get("href"));

	        var service = Y.all(".results .col2 p a").getAttribute("href"),
	            config = {
	                timeout: 10000,
	                method: 'GET',
	                on: {
	                    success: function(x, o) {
	                        try {
	                            var response = o.responseText;
	                            var el = document.createElement('div');
								el.innerHTML = response;
								var tbody = el.getElementsByTagName('tbody');
								
								for (var j = 0, len = tbody.length; j < len - 1; j++) {
									var td = tbody[j].getElementsByTagName('td');
									var length = td.length;

	    							//Y.log(Y.all(".results .col3").size());
									for (var i = 0; i < length; i++) {
										Y.log(td[i]);
										var current = i % 2;
										if (current == 0)
			    							Y.one(".resultcaption .col3").insert('<div class="col4">' + td[i].innerHTML + '</div>', "after");
			    						else 
			    							Y.all(".results .col3").item(current).insert('<div class="col4">' + td[i].innerHTML + '</div>', "after");
									  	//Y.log(td[i].innerHTML);
									}


								}
							
	                            //Y.log( Y.XML.parse(response));
	                            //Y.log(x);
	                            //Y.log(Y.one(doc).one("itemAttrs"));
	                            //Y.log(response);
	                            //Y.log(Y.one(response));
	                            /*
	                            <ul id="itemAttrs">
<li><table cellpadding="0" cellspacing="0"><tbody><tr>
<td class="title">店面資訊</td><td >無店面</td>
<td class="title">刊登者身份</td><td >服務提供者</td>
<td class="title">店面名稱</td><td >=SuperTAXI=氣球工作室</td>
<td class="title">平日服務時間</td><td class="last">11:00~22:00電話接聽</td>
</tr></tbody></table></li>
<li><table cellpadding="0" cellspacing="0"><tbody><tr>
<td class="title">假日服務時間</td><td >預制時間彈性</td>
<td class="title">公休日</td><td >限量接單.額滿為止</td>
<td class="title">接受付款方式</td><td >其它(詳見內容說明或電洽)</td>
<td class="title">是否接受預約</td><td class="last">是</td>
</tr></tbody></table></li>
</ul>
*/
	                        } catch (e) {
	                            Y.log("JSON Parse failed!");
	                            return;
	                        }

	                    },
	                    failure: function(x, o) {
	                        //alert("Async call failed!");
	                        console.log("fail");
	                    }
	                } //end on
	            }; //end config

	        Y.io(service, config);

	    }		
	});

}



