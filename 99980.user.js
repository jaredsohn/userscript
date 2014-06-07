// ==UserScript==
// @name best unframer
// @author relax
// ==/UserScript==
javascript:(function (){
    function JSONscriptRequest(fullUrl) {
        this.fullUrl = fullUrl;
        this.noCacheIE = '&noCacheIE=' + (new Date()).getTime();
        this.headLoc = document.getElementsByTagName("head").item(0);
        this.scriptId = 'YJscriptId' + JSONscriptRequest.scriptCounter++;
    }
    JSONscriptRequest.scriptCounter = 1;
    JSONscriptRequest.prototype.buildScriptTag = function () {
        this.scriptObj = document.createElement("script");
        this.scriptObj.setAttribute("type", "text/javascript");
        this.scriptObj.setAttribute("src", this.fullUrl + this.noCacheIE);
        this.scriptObj.setAttribute("id", this.scriptId);
    };
    JSONscriptRequest.prototype.removeScriptTag = function () { this.headLoc.removeChild(this.scriptObj); };
    JSONscriptRequest.prototype.addScriptTag = function () { this.headLoc.appendChild(this.scriptObj); };

	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Christopher(?) for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
		//hack to kill the resizer calls
		iframeResizePipe = function() {};

//        console.log(typeof quick_heal);
        if (typeof quick_heal !== "function") {
            var healing_obj = function quick_heal() {
                var xw_city = /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1];
                var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
                var personid = userid.substr(2);
                var tmpkey = /tmp=([0-9a-f]+)/.exec(document.body.innerHTML)[1];
                var cbkey = userid+parseInt(new Date().getTime().toString().substring(0, 10));
                var params = { 'ajax': 1,
                                'liteload': 1,
                                'xw_client_id' : 8,
                                'sf_xw_user_id': userid,
                                'sf_xw_sig': local_xw_sig
                    };
                $.ajax({type: "POST",
                    data: params,
                    dataType: "json",
                    url: "http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=hospital&xw_action=heal&xw_city="+xw_city+"&tmp="+tmpkey+"&cb="+cbkey+'&xw_person'+personid+'&xcity=1',
                    success: function (msg_rtn){
                        console.log(msg_rtn);
                        if (/You cannot heal/.test(msg_rtn.hospital_message)) {
                            try {
                                document.getElementsByClassName('heal_link')[1].innerHTML = 'Retrying in 5';
                                setTimeout(quick_heal,5000);
                            }
                            catch (zerr) {}
                            return;
                        }
                        else {
                            try {
                                document.getElementById('user_health').innerHTML = parseInt(msg_rtn.user_fields.user_health);
                            }
                            catch (fberr) {
                                setTimeout(quick_heal,5000);
                                return;
                            }
                            document.getElementsByClassName('heal_link')[1].innerHTML = 'Quick Heal!';
                        }
                    }
                });
            }

            // mostly stolen from Martin & Pete's Property Collector
            var banking_obj = function quick_bank() {
                var amount = parseInt(document.getElementById('user_cash_nyc').innerHTML.replace(/(\$|,)/g,''));
                var xw_city = /mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)[1];
                var userid = /sf_xw_user_id=([a-z]\|[0-9]+)/.exec(document.body.innerHTML)[1];
                var personid = userid.substr(2);
                var url = '';
                switch (parseInt(xw_city)) {
                    case 5:
                        url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=propertyV2&xw_action=doaction&doaction=ActionBankDeposit&building_type=6';
                        break;
                    default:
                        url = 'http://facebook.mafiawars.com/mwfb/remote/html_server.php?xw_controller=bank&xw_action=deposit_all';
                        break;
                }
                var cbkey = userid+parseInt(new Date().getTime().toString().substring(0, 10));
                var params = {
                    'ajax': 1,
                    'sf_xw_user_id': userid,
                    'sf_xw_sig': local_xw_sig,
                    'liteload': 1,
                    'cb': cbkey,
                    'xw_client_id': 8,
                    'skip_req_frame': 1,
                    'amount': amount,
                    'city': xw_city,
                    'xw_city': xw_city,
                    'xw_person': personid
                };
                $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "json",
                    data: params,
                    success: function (msg_rtn) {
                        try {
                            var cashes = document.getElementsByClassName('cur_cash');
//                            console.log(msg_rtn.user_fields.user_cash);
                            for (i=0;i<cashes.length;i++) {
//                                console.log(cashes[i].innerHTML);
                                cashes[i].innerHTML = cashes[i].innerHTML.replace(/[0-9,]+/,msg_rtn.user_fields.user_cash);
//                                console.log(cashes[i].innerHTML);
                            }
                        }
                        catch (fberr) {}
                    }
                });
            }

            var headLoc = document.getElementsByTagName("head").item(0);
            var scriptObj = document.createElement("script");
            scriptObj.setAttribute("type", "text/javascript");
            scriptObj.text = healing_obj + banking_obj;
            headLoc.appendChild(scriptObj);

            var old_html = document.getElementsByClassName('heal_link')[0].innerHTML;
            var new_link = "quick_heal(); return false;";
            document.getElementsByClassName('heal_link')[0].innerHTML = old_html.replace(/onclick="[^"]+"/,'onclick="'+new_link+'"');
            document.getElementsByClassName('heal_link')[1].innerHTML = 'Quick Heal!';

            var banks = document.getElementsByClassName('bank_deposit');
            new_link = "quick_bank(); return false;";
            for (i=0;i<banks.length;i++) {
                if (/^\(<a /.test(banks[i].innerHTML)) {
                    old_html = banks[i].innerHTML;
    //                console.log('old code = '+old_html);
                    banks[i].innerHTML = old_html.replace(/onclick="[^"]+"/,'onclick="'+new_link+'"').replace(/>.*?</,'>Quick Bank!<');
    //                console.log('new code = '+banks[i].innerHTML);
                }
            }
        }
	}
})()