// ==UserScript==
// @name           HuochePiao
// @namespace      www.zoopigzoo.com
// @description    HuochePiao
// @include        http://www.12306.cn/*
// ==/UserScript==

function you(str) {
	if(str == "--" || str.indexOf("darkgray") != -1) {
		return false;
	} else {
		return true;
	}
}

function TryAndFind()
{
  GM_xmlhttpRequest({
     method: "GET",
     url: "https://dynamic.12306.cn/otsweb/order/querySingleAction.do?method=queryLeftTicket&orderRequest.train_date=2012-01-19&orderRequest.from_station_telecode=BXP&orderRequest.to_station_telecode=HKN&orderRequest.train_no=&trainPassType=QB&trainClass=D%23Z%23T%23K%23&includeStudent=00&seatTypeAndNum=&orderRequest.start_time_str=00%3A00--24%3A00",
     onload: function(xhr) {
			var response = xhr.responseText;
			//unsafeWindow.console.log(response);
			var myArray = response.match(/([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),<input type='button' class='([^ ]*?)'([^>]*?)>/g)
			if ( myArray != null) {
				for ( i = 0; i < myArray.length; i++ ) {
					var curr = myArray[i];
					var currM = myArray[i].match(/([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),([^,]*?),<input type='button' class='([^ ]*?)'/)
					if(currM != null) {
						var cls = currM[12];
						var sw = currM[1];  //shanwu
						var td = currM[2];  //tedeng
						var yd = currM[3];  //yideng
						var ed = currM[4];  //erdeng
						var gj = currM[5];  //gaoji
						var rw = currM[6];  //ruanwo
						var yw = currM[7];  //yingwo
						var rz = currM[8];  //ruanzuo
						var yz = currM[9];  //yingzuo
						var wz = currM[10]; //wuzuo
						var qt = currM[11]; //qita
						unsafeWindow.console.log(i + ":" + "wz(" + wz + ")yz(" + yz + ")yw(" + yw + ")rz(" + rz + ")rw(" + rw +")");
						if(cls == "yuding_u") {
							unsafeWindow.console.log(myArray[i]);
							var click = myArray[i].match(/onclick=javascript:(.*?) /)
							if(you(yz) || you(yw) || you(rz) || you(rw)|| you(yd) || you(ed)) {
								if(click) {
									var scriptstr = click[1];
									var chehao = scriptstr.match(/'([^#]*?)#([^#]*?)#([^#]*?)#([^#]*?)#/);
									if(chehao) {
										alert(chehao[1] + ":" + chehao[4]);
									} else {
										alert(scriptstr);
									}
								} else {
									alert("!!!!!!!!");
									return;
								}
								
							} else {
								if(click) {
									var scriptstr = click[1];
									unsafeWindow.console.log("Get ITTTTTTTTTT:" + scriptstr);
								} else {
									unsafeWindow.console.log("Get ITTTTTTTTTT:");
								}
							}
						}
						
					}
				}
				iterFind();
			}else {
				unsafeWindow.console.log("request submit: not find!");
				iterFind();
			}
    }
  });
}

function iterFind()
{
   setTimeout(TryAndFind,10000);
}

iterFind();

