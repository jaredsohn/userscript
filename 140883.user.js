(function ()
{
	var fileMETA=new Array();

// ==UserScript==
// @name		Rapidshare Links Checker
// Last Edited		December 2013

// @include             http://*
// @include             file://*
// @exclude        	http://rapidshare.com/*
// @exclude        	http://rapidshare.de/*
// @exclude        	http://*.rapidshare.com/*
// @exclude        	http://*.rapidshare.de/*
// @exclude        	http://www.filefactory.com/*
// @exclude        	http://filefactory.com/*
// @exclude        	http://www.megaupload.com/*
// @exclude        	http://megaupload.com/*
// @exclude        	http://www.megarotic.com/*
// @exclude        	http://megarotic.com/*
// @exclude        	http://www.megaporn.com/*
// @exclude        	http://megaporn.com/*
// @exclude        	http://www.megavideo.com/*
// @exclude        	http://megavideo.com/*
// @exclude        	http://www.netload.in/*
// @exclude        	http://netload.in/*
// @exclude        	http://www.hotfile.com/*
// @exclude        	http://hotfile.com/*
// @exclude        	http://www.depositfiles.com/*
// @exclude        	http://depositfiles.com/*
// @exclude        	http://www.uploading.com/*
// @exclude        	http://uploading.com/*
// @exclude        	http://*mediafire.com/*
// @exclude        	http://*megashares.com/*
// @exclude        	http://*rapidshare.de/*
// @exclude        	http://*netload.in/*
// @exclude        	http://*crocko.com/*
// @exclude        	http://*vip-file.com/*
// @exclude        	http://*yourfilehost.com*
// @exclude        	http://*sendspace.com*
// @exclude        	http://*letitbit.net*
// @exclude        	http://*zshare.net*
// @exclude        	http://*uploadbox.com*
// @exclude        	http://*vip-file.com*
// @exclude        	http://*bitroad.net*
// @exclude        	http://*link-protector.com*
// @exclude        	http://*duckload.com*
// @exclude        	http://*filepost.com*
// @exclude        	http://*x7.to*
// @exclude        	http://*turbobit.net/*
// @exclude        	*xml_dump.php*
// @exclude        	*phpMyAdmin*
// @exclude        	*deleterecord.php*
// @exclude        	http://www.google.com/reader/view/*cgi.4chan.org*
// @exclude        	http://*extabit.com*
// @exclude        	http://*shareflare.net*
// @exclude        	http://*solidfile.com*
// @exclude        	http://*gigapeta.com*
// @exclude        	http://*rayfile.com*
// @exclude        	http://rlc.hostei.com/rlc_server_side*
// @exclude        	http://*turboshare.com*
// @exclude        	http://*freakshare.net*
// @exclude        	http://*freakshare.com*
// @exclude        	http://*fileserve.com*
// @exclude        	http://*narod.ru/disk/*
// @exclude        	http://*files.mail.ru*
// @exclude        	http://*enigmashare.com*
// @exclude        	http://*filesonic.com*
// @exclude        	http://bitshare.com*
// @exclude        	http://cramit.in*
// @exclude        	http://sharejunky.in*
// @exclude        	http://veehd.com*
// @exclude        	http://keepfile.com*
// @exclude        	http://www.usershare.com*
// @exclude        	http://oron.com*
// @exclude        	http://www.imdb.com/list/*
// @exclude        	http://filejungle.com*
// @exclude        	http://www.wupload.com*
// @exclude        	http://wupload.com*
// @exclude        	http://*imdb*plotsummary
// ==/UserScript==

/*
This script was modified in December 2013.
While the original version is I do not know anymore who the creator.
I'm Sorry...!
*/
 
fileMETA["update"] = 'fixed hotfile.com, extabit.com, shareflare.net removed filesonic';
 

if (window.top.location!=document.URL){
 return;
 }
	var check_all_links_key = "C";
	var makeTheCheckedLinksToFullURl_key = "X";
	var configuration_key = "Z";
	var first_key_keycode = '9';
	var first_key_keycodename = 'TAB';
	var check_all_links_keycode = check_all_links_key.charCodeAt(0);
	var makeTheCheckedLinksToFullURl_keycode = makeTheCheckedLinksToFullURl_key.charCodeAt(0);
	var configuration_keycode = configuration_key.charCodeAt(0);
	if (!window.console) {
	 window.console = {};
	 function fn() { GM_log(arguments); };
	 ['log', 'debug', 'info', 'warn', 'error', 'assert', 'dir', 'dirxml', 'group', 'groupEnd',
	 'time', 'timeEnd', 'count', 'trace', 'profile', 'profileEnd'].forEach(function(name) {
		window.console[name] = fn;
	 });
	}
	 
	
	
	function getdays(date){
		Year = ((date.getYear() + 1900)*365); var daday = (date.getMonth() + 1); if(daday<10) {daday = "0" + daday;} 	daday = (daday*30); daret = Year+daday+date.getDate(); return daret; 
		}	
	function check_update(version){
		var today = new Date( );
		day = parseInt( getdays (today) );		
		if ( (typeof GM_getValue("day") == "undefined") || ( ( (day - GM_getValue("day")) ) < 0) || ( ( (day - GM_getValue("day")) ) > 10)){ 
			check_version(version);	 
			GM_setValue("day",day);	
			} 
		}
			
	var version = fileMETA["version"];	 
	if (navigator.appName == 'Netscape'){
	check_update(version);
	}
	function check_version(version) { var script_url = "http://userscripts.org/scripts/source/140883.meta.js";
		GM_xmlhttpRequest({ method:"GET",url:script_url,
			onload:function(result) { 	var newversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(result.responseText)[1];
			if (null == newversion){ alert('There was an error in the update function of the "'+fileMETA["name"]+'" userscript.\nGo to '+script_url+' to download the latest version.\nThis message will appear again in 10 days'); }
			if(newversion==version){ return; }else{ var answer = confirm('A different version of the "'+fileMETA["name"]+'" userscript for Greasemonkey is available.\nYour version: '+version+'\nNew version: '+newversion+'\nUpdate: '+fileMETA["update"]+'\nDo you want to update now? Check for update will be done again in 10 days');
					 if (answer){	GM_openInTab("http://userscripts.org/scripts/show/140883"); } 
				}
			 }
			});
	}	 
	 
	 
	function locate(event){
		var posx, posy;
		var d = find_window();
		posx = event.clientX + window.pageXOffset;
		posy = event.clientY + window.pageYOffset;
		d.style.top = (posy - 28) + "px";
		d.style.left = (posx + 7) + "px";
	}
	function find_window(){
		return document.getElementById("link_tt");
	}	
	function create_window(event){
		var bg_color = "#EAEAEA";
		var border_color = "#D5D5D5";
		var font_color = "#000000";
		var font_face = "Verdana,sans-serif";
		var font_size = "11px";		
		var tt_div = document.createElement("div");
			tt_div.setAttribute("id", "link_tt");
			tt_div.setAttribute("style", "background:" + bg_color + "; box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);padding: 6px 6px 6px 6px; -moz-border-radius:4px; border-radius:4px; opacity:0.9; border:1px solid " + border_color + "; color:" + font_color + ";font-family:" + font_face + ";font-size:" + font_size + ";position:absolute;z-index:1000; max-width: 400px;");
		var tt_url = document.createElement("div");
			tt_url.innerHTML = event.currentTarget.getAttribute('dll_info');
			tt_div.appendChild(tt_url);
		document.body.appendChild(tt_div);
	}		
	function kill_window(){
		if (find_window()) find_window().parentNode.removeChild(find_window());
	}		
		
			
	function delinkify(the_link, the_id) {
				var xpathofalive_link_id = "//a[contains(@href,'" + the_link + "')]";		
				var allliveLinks_id, thisLink_id;		
				allliveLinks_id = document.evaluate(xpathofalive_link_id, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
				for (var i = 0; i < allliveLinks_id.snapshotLength; i++) {
					var thisLink_id = allliveLinks_id.snapshotItem(i);
					var span = document.createElement("span");
					span.id = the_id;
					span.innerHTML = thisLink_id.href;
					thisLink_id.parentNode.insertBefore(span, thisLink_id);
					thisLink_id.parentNode.removeChild(thisLink_id);
				}
	}
	function Convert_links_to_full_address_links_function(the_link, the_id) {
		 if ( (!location.href.match(/google/)) || ( !(the_link.href.match(/googleusercontent/) ) ) ){
			 var xpathofalive_link_id = "//a[contains(@href,\'"+the_link+"\') and not (contains(@href, 'google'))]";				 
				var allliveLinks_id, thisLink_id;		
				allliveLinks_id = document.evaluate(xpathofalive_link_id, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
				for (var i = 0; i < allliveLinks_id.snapshotLength; i++) {
					var thisLink_id = allliveLinks_id.snapshotItem(i);
					thisLink_id.innerHTML = thisLink_id;
				}
			}
	}
	function add_RSLC_style(){
		if (!(document.getElementsByTagName('RSLC')[0])){
			var meta_not_to_add_more_style = document.createElement("RSLC");
			meta_not_to_add_more_style.setAttribute('content', 'rapidshare_links_checker');
			meta_not_to_add_more_style.setAttribute('name', 'description');
			document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);
			alive_link_png = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY' + 'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy' + 'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs' + 'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp' + 'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY' + 'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ' + 'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1' + '46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH' + 'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc' + '04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
			adead_link_png = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC' + 'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk' + 'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE' + '+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29' + 'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM' + '8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N' + 'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR' + 'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
			NDSTUSEROR_png = 'data:image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVy' + 'UaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqP' + 'aUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5N' + 'q9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1h' + 'oQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdG' + 'cvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5' + 'SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';
			loading_img = 'data:image/gif;base64,' + 'R0lGODlhDQANAMZfADuHMTyMMz6SM0uQPkySQFGVSFSXTEaeN1OaSVOaSk+gQlWfTlSjS1apRVWsOlqtR2K3SWG6Qm+2WWm8T3O4' + 'XGfASXe5YW/BVXm9Y2zFTm7EY3jBZ4a8dnHGWHPGWHDGZIHAboe+eIHBboXAb3PIWYXBcHbIXXPIaHfHaoPDcYnBenzHb3jKX4fE' + 'c3fKbHvJbn7IcHzLcH3LcH3McZHFfYjJd47Hf5bGhpDJgIXNeZXIgobOfJPKgZbKhJfKhInPfYrRforRf5jMipPPhJjOiJbRipfS' + 'h5XTiJjTiJbUi5zSj5rTjZvWkJzWkZ3WkafVnKHYla/bprbgrb3es7zitb/itsfnwcvmxMzmxdHszdju1PT68/b79fj89/z9+///' + '////////////////////////////////////////////////////////////////////////////////////////////////////' + '/////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBZAB/ACwAAAAADQANAAAHd4B/goOEhYIZLCYeEYZ/' + 'JEhOSU1DEIUdUEEzLjI/Sg+DFUZAJx8aKFJFNgeCHkwxOzkrVFxVRAyCF0cvWVpWW1cpPAuCE0swUV1eWCIYPgmCDjg1G09TIBIl' + 'IQGDDUItGBQWIzcEhQoqPTQ6HAONAggGBQCN9IKBACH5BAFkAH8ALAAAAAANAA0AAAdjgH+Cg4SFghksJh4Rhn8kSE5JTUMQhR1Q' + 'QTOaP0oPgxVGQJqjRjYHgh5MMaOaMUQMghdHq6wzPAuCE0u0ozE+CYIOODW1RiEBgw1CLTHNMTcEhQoqPTQ6HAONAggGBQCN4IKB' + 'ADs=';
			GM_addStyle("#alive_link_checked, #alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
			GM_addStyle("#adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
			GM_addStyle("#unava_link {background:transparent url(" + NDSTUSEROR_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
			GM_addStyle(".loading {background:transparent url(" + loading_img + ") no-repeat scroll 100% 50% !important;padding-right:15px;}");
		}
	}
 
	
	if ( location.href.match(/http:\/\/torrentproject.com\/userscripts\/rapidshare_links_checker_new\/search\//))
	{
		if (GM_getValue("SharedHttpFiles")){
			var what_SharedHttpFiles_do_you_want_to_search_for = GM_getValue("SharedHttpFiles");
		}else{
			var what_SharedHttpFiles_do_you_want_to_search_for = "rap";
			GM_setValue("SharedHttpFiles", "rap");
		}
			
		var what_SharedHttpFiles = what_SharedHttpFiles_do_you_want_to_search_for;
		
		var SharedHttpFilesSelect = "<div class='SharedHttpFiles "+what_SharedHttpFiles+"' style='font-size:80%;'><SELECT NAME='gourl' id=SharedHttpFilesId>"+
		"<option value='all'>all shared"+
		"<option value='all2'>all shared 2"+
		"<option value='singlelink'>single link"+
		"<option value='singlelink2'>single link 2"+
		"<option value='rapidshare'>rapidshare"+
		"<option value='rapidshare2'>rapidshare 2"+
		"<option value='megaupload'>megaupload"+
		"<option value='megaupload2'>megaupload 2"+
		"<option value='filefactory'>filefactory"+
		"<option value='ed2k'>ed2k"+
		"<option value='watch_online'>watch online"+
		"<option value='uploaded.to'>uploaded.to"+
		"<option value='badongo.com'>badongo.com"+
		"<option value='depositfiles.com'>depositfiles.com"+
		"<option value='megashares'>megashares.com"+
		"<option value='binfile.org'>binfile.org"+
		"<option value='bluehost.to'>bluehost.to"+
		"<option value='ftp2share.com'>ftp2share"+
		"<option value='mytempdir'>mytempdir"+
		"<option value='jabello.com'>jabello.com"+
		"<option value='media.filecabi.net'>media.filecabi.net"+
		"<option value='primeupload.com'>primeupload.com"+
		"<option value='rsprotect.com'>rsprotect.com"+
		"<option value='sprintshare.com'>sprintshare.com"+
		"<option value='up.9q9q.net'>up.9q9q.net"+
		"<option value='zupload.com'>zupload.com"+
		"<option value='4filehosting.com'>4filehosting.com"+
		"<option value='4shared.com'>4shared.com"+
		"<option value='4shared.com'>4shared.com"+
		"<option value='allyoucanupload.webshots.com'>allyoucanupload.webshots.com"+
		"<option value='arabsoftware.net'>arabsoftware.net"+
		"<option value='arbup.org'>arbup.org"+
		"<option value='archive.org'>archive.org"+
		"<option value='bitshare.com'>bitshare.com"+
		"<option value='cramit.in'>cramit.in"+
		"<option value='bravoshare.com'>bravoshare.com"+
		"<option value='datapickup.com'>datapickup.com"+
		"<option value='datenklo.net'>datenklo.ne"+
		"<option value='divshare.com'>divshare.com"+
		"<option value='f-forge.com'>f-forge.com"+
		"<option value='fileblob.com'>fileblob.com"+
		"<option value='filecabi.net'>filecabi.net"+
		"<option value='filedepartment.com'>filedepartment.com"+
		"<option value='filedepartment.com'>filedepartment.com"+
		"<option value='fileflyer.com'>fileflyer.com"+
		"<option value='filehd.com'>filehd.com"+
		"<option value='filehd.com'>filehd.com"+
		"<option value='fileho.com'>fileho.com"+
		"<option value='filehostia.com'>filehostia.com"+
		"<option value='filelodge.com'>filelodge.com"+
		"<option value='filesend.net'>filesend.net"+
		"<option value='filesupload.com'>filesupload.com"+
		"<option value='filesupload.com'>filesupload.com"+
		"<option value='fileupyours.com'>fileupyours.com"+
		"<option value='fyad.org'>fyad.org"+
		"<option value='gigashare.com'>gigashare.com"+
		"<option value='glintfiles.net'>glintfiles.net"+
		"<option value='axifile'>axifile.com"+
		"<option value='cocoshare'>cocoshare.cc"+
		"<option value='crocko'>crocko.com"+
		"<option value='filefront'>filefront.com"+
		"<option value='flyupload'>flyupload.com"+
		"<option value='ftpz.us'>ftpz.us"+
		"<option value='gigasize'>gigasize.com"+
		"<option value='mediafire'>mediafire.com"+
		"<option value='MegaShare'>MegaShare.com"+
		"<option value='putfile'>putfile.com"+
		"<option value='ripway'>ripway.com"+
		"<option value='rogepost'>rogepost.com"+
		"<option value='sendmefile'>sendmefile.com"+
		"<option value='speedyshare'>speedyshare.com"+
		"<option value='uploading'>uploading"+
		"<option value='uploadyourfiles'>uploadyourfiles"+
		"<option value='urlcash'>urlcash"+
		"<option value='webfile'>webfile"+
		"<option value='yourfilehost'>yourfilehost"+
		"<option value='zippyvideos'>zippyvideos"+
		"<option value='come2store'>come2store.com"+
		"<option value='35mb'>35mb"+
		"<option value='file2you'>file2you.net"+
		"<option value='yousendit'>yousendit.com"+
		"<option value='uploadr'>uploadr"+
		"<option value='slil.ru'>slil.ru"+
		"<option value='sharejunky.com'>sharejunky.com"+	
		"<option value='bigupload'>bigupload.com"+
		"<option value='sendspace'>sendspace.com"+
		"<option value='hyperupload.com'>hyperupload.com"+
		"<option value='icefile.com'>icefile.com"+
		"<option value='icefile.net'>icefile.net"+
		"<option value='icefile.org'>icefile.org"+
		"<option value='illhostit.com'>illhostit.com"+
		"<option value='keepmyfile.com'>keepmyfile.com"+
		"<option value='live-share.com'>live-share.com"+
		"<option value='live-share.com'>live-share.com"+
		"<option value='looler.com'>looler.com"+
		"<option value='maxishare.net'>maxishare.ne"+
		"<option value='megadownload.net'>megadownload.net"+
		"<option value='megadownload.net'>megadownload.net"+
		"<option value='megafileupload.com'>megafileupload.com"+
		"<option value='megaupload.com'>megaupload.com"+
		"<option value='mfile3.com'>mfile3.com"+
		"<option value='miniuploads.com'>miniuploads.com"+
		"<option value='misterupload.com'>misterupload.com"+
		"<option value='mooload.com'>mooload.com"+
		"<option value='myfilestash.com'>myfilestash.com"+
		"<option value='oxyshare.com'>oxyshare.com"+
		"<option value='perushare.com'>perushare.com"+
		"<option value='pushfile.net'>pushfile.net"+
		"<option value='quickdump.com'>quickdump.com"+
		"<option value='quicksharing.com'>quicksharing.com"+
		"<option value='rapidfile.net'>rapidfile.net"+
		"<option value='rapidshare.de'>rapidshare.de"+
		"<option value='savefile.com'>savefile.com"+
		"<option value='savefile.info'>savefile.info"+
		"<option value='scambia.com'>scambia.com"+
		"<option value='share-online.biz'>share-online.biz"+
		"<option value='sharebigfile.com'>sharebigfile.com"+
		"<option value='sharingmatrix.com'>sharingmatrix.com"+
		"<option value='spread-it.com'>spread-it.com"+
		"<option value='storeandserve.com'>storeandserve.com"+
		"<option value='supasic.com'>supasic.com"+
		"<option value='thefilebucket.com'>thefilebucket.com"+
		"<option value='thefilebucket.com'>thefilebucket.com"+
		"<option value='transferbigfiles.com'>transferbigfiles.com"+
		"<option value='turboupload.com'>turboupload.com"+
		"<option value='ultrashare.de'>ultrashare.de"+
		"<option value='up-x.info'>up-x.info"+
		"<option value='up.li.ru'>up.li.ru"+
		"<option value='up.spbland.ru'>up.spbland.ru"+
		"<option value='upitus.com'>upitus.com"+
		"<option value='upload.pk'>upload.pk"+
		"<option value='upload02.uploadpk.com'>upload02.uploadpk.com"+
		"<option value='upload2.net'>upload2.net"+
		"<option value='upload2.net'>upload2.net"+
		"<option value='uploadcomet.com'>uploadcomet.com"+
		"<option value='uploadhut.com'>uploadhut.com"+
		"<option value='uploadpalace.com'>uploadpalace.com"+
		"<option value='uploadpalace.com'>uploadpalace.com"+
		"<option value='uploadsend.com'>uploadsend.com"+
		"<option value='uppit.com'>uppit.com"+
		"<option value='us.archive.org'>us.archive.org"+
		"<option value='ushareit.com'>ushareit.com"+
		"<option value='verzend.be'>verzend.be"+
		"<option value='vietsharing.us'>vietsharing.us"+
		"<option value='veehd.com'>veehd.com"+
		"<option value='viprasys.com'>viprasys.com"+
		"<option value='w-n-n.com'>w-n-n.com"+
		"<option value='webfilehost.com'>webfilehost.com"+
		"<option value='wtfhost.com'>wtfhost.com"+
		"<option value='wtfhost.com'>wtfhost.com"+
		"<option value='yofreespace.com'>yofreespace.com"+
		"<option value='youploadit.com'>youploadit.com"+
		"<option value='yousendit.com'>yousendit.com"+
		"<option value='zshare'>zshare.net/download"+
		"<option value='keepfile.com'>keepfile.com/download"+
		"</SELECT></div>";
		GM_addStyle('select#SharedHttpFilesId{border:2px solid black;background:none repeat scroll 0 0 white;color:black;cursor:pointer;font-family:Times New Roman;font-size:24px;position:relative;width:227px; }');
		GM_addStyle('select#SharedHttpFilesId > option{border:thin none;padding:0px 3px;width:200px;background:PaleGoldenrod none repeat scroll 0%;margin:1px;}');
		GM_addStyle('div.s {font-size:11px;margin:0 8px 4px;width:650px;}');
		GM_addStyle('#search_term { border:2px solid black;font-family:Times New Roman;font-size:25px;margin-bottom:5px;padding:3px;width:367px;}');
		GM_addStyle('div#search_input{ width: 700px ; margin-left: auto ; margin-right: auto ;text-align:center; }');
		GM_addStyle('img#search{cursor:pointer;}');
		
		var divsearch = document.createElement("div");
		divsearch.id = 'search_input';
		divsearch.innerHTML ='<input type="text" maxlength="128" value="" name="search_query" class="search-term" id="search_term">';
		divsearch.innerHTML +="<b class='ch5' style='width: 151px;' >"+SharedHttpFilesSelect+"</b> <img border='0' id='search' class='control' src='http://i25.tinypic.com/waghhe.png' usemap='#MapSharedHttpFiles'> ";
		
		var main = document.getElementById('tn15content');		
		main.parentNode.insertBefore(divsearch, main);	
		var divresults = document.createElement("div");
		divresults.id = 'tn15torrentz';
		divresults.innerHTML = '<div id="logging"></div>';
 GM_addStyle('div#logging{-moz-border-radius:10px 10px 10px 10px;border-radius:10px 10px 10px 10px;border:0 solid #D3CECB;font-size:13px;margin-bottom:10px;max-height:10em;overflow-x:auto;padding-left:8px;padding-top:8px;width:81%;}');		
		var main = document.getElementById('tn15content');		
		main.parentNode.insertBefore(divresults, main);	
		
		document.getElementById('SharedHttpFilesId').value = GM_getValue("SharedHttpFiles");
		function maximizefuncarea(evn){	
			var wheretosearchURL = GM_getValue("SharedHttpFiles");
			search_term = document.getElementById('search_term').value;
			SharedHttpFilesValue = document.getElementById('SharedHttpFilesId').value;
			GM_setValue("SharedHttpFiles", SharedHttpFilesValue);
			openRapidshare(search_term);
		}
		
		document.getElementById('search').addEventListener("click", maximizefuncarea, false);
		
		
		function wheretosearch(){
			if (GM_getValue("SharedHttpFiles")){
				var what_SharedHttpFiles_do_you_want_to_search_for = GM_getValue("SharedHttpFiles");
			}else{
				var what_SharedHttpFiles_do_you_want_to_search_for = "rap";
				GM_setValue("SharedHttpFiles", "rap");
			}
		}
		function openRapidshare(){
			var wheretosearchURL = wheretosearch();
			if ( (whatsite == 'megaupload2') || (whatsite == 'rapidshare2') || (whatsite == 'all2') || (whatsite == 'singlelink2')){
				googlesearchurl =	"http://www.google.com/search?q=intitle:\""+search_term+"\" +\""+search_term+"\""+wheretosearchURL+"&num=100&hl=en&lr=&btnG=Search";
			}else if (whatsite == 'watch_online'){
				googlesearchurl =	"http://www.google.com/search?q=intitle:\""+search_term+"\" +\""+search_term+"\"+megavideo+OR+\"watch+online\"+-trailer+-jamespot+-weebly+-lovefilm+-removed&num=100&hl=en&lr=&btnG=Search";
			}else{
				googlesearchurl =	"http://www.google.com/search?q="+search_term+"+"+wheretosearchURL+"+&num=100&hl=en&lr=&btnG=Search";
			}
			var where = "Rapidshare";
			var rightpositionprs = 3;
			TheQueryIsCommingFrom = "openRapidshare";
			GetAndShowMeTheRapidshare(googlesearchurl,where,rightpositionprs,TheQueryIsCommingFrom);
		}
		function GetAndShowMeTheRapidshare(googlesearchurl,where,rightpositionprs,TheQueryIsCommingFrom)
		{
			document.getElementById('logging').innerHTML = "log:<br/>searching using this url:<a href='"+googlesearchurl+"'>this google query</a>";
			GM_addStyle('img#PleaseWaitForRapidshare{ display: block; padding:0px 70px 3px;}');
			GM_xmlhttpRequest(
			{
				method:'GET',
				url: googlesearchurl,
				headers: {'User-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',},
				onload:function(responseDetails)
				{
					var googleresponse = responseDetails.responseText;			
					var foundresults = document.getElementById('tn15content');
					googleresponse = googleresponse.replace(/\n/g,'');					
					googleresponse = googleresponse.replace(/.*?<\/head>/i, "");					
					googleresponse = googleresponse.replace(/<style>.*?<\/style>/ig,'');
					googleresponse = googleresponse.replace(/^.*?<div id="res">/,'<div id="res">');					
					googleresponse = googleresponse.replace(/<p id="mfr".*?$/ig,''); 
					googleresponse = googleresponse.replace(/<div id="foot".*?$/i, "");					
					googleresponse = googleresponse.replace(/ - <a href="\/search.*?>Similar<\/a>/g,'');
					googleresponse = googleresponse.replace(/<blockquote style="margin-bottom:0">/g,'');
					googleresponse = googleresponse.replace(/<.blockquote>/g,'');
					googleresponse = googleresponse.replace(/<i>In order to show you.*?<\/i>/, "");
					googleresponse = googleresponse.replace(/<b>/g,"");
					googleresponse = googleresponse.replace(/<\/b>/g,"");
															
					GM_addStyle('input.lst{font-size:12px;height:15px;vertical-align:middle;width:64%;}');
					GM_addStyle('input#i{ font-size:13px; font-weight:bolder;background-image:url(/images/tn15/messageboard_header_bgd.gif);background-position:center top;background-repeat:repeat-x;}');
					GM_addStyle('input#show_more{margin:-1px 7px 0;}');
					GM_addStyle('div#logging{-moz-border-radius:10px 10px 10px 10px;border-radius:10px 10px 10px 10px;border:1px solid #D3CECB;font-size:13px;margin-bottom:10px;max-height:10em;height:10em;overflow-x:auto;padding-left:8px;padding-top:8px;width:81%;margin-left: 64px;margin-bottom: 15px;}');
 GM_addStyle('li.g{background: -moz-linear-gradient(center bottom , #E8E8E8 0%, #F2F2F1 50%) repeat scroll 0 0 #EDECEB; border: 1px solid #D3CECB; border-radius: 10px 10px 10px 10px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4); display: inline-block; margin-bottom: 15px; position: relative; width: 97%;}');
					GM_addStyle('a.l{color:#003399;font-size:14px}');
					GM_addStyle('h3.r{margin:0 8px 4px;margin-top:4px !important;font-size: 13px;}');
					GM_addStyle('div.s{margin:0 8px 4px;font-size: 11px;}');
					GM_addStyle('ol{margin:0;-moz-padding-start: 1px;}');	
					GM_addStyle('div#tn15content{margin-left: 64px;margin-right: 64px;max-width: 812px;position: relative;}');	
					GM_addStyle('img#PleaseWaitForRapidshare{ display: none;}');							
 
					GM_addStyle('cite{color:#136CB2}');
					
GM_addStyle('a { color: #136CB2; text-decoration: none;}');
					analyseResults(googleresponse,where);	 
					
		
					window.setTimeout(function() {	check_all_links() },4000);
					window.setTimeout(function() {	check_all_links() },10000);
					window.setTimeout(function() {	check_all_links() },25000);
					
					if ( (googleresponse.match(/<li class="g">/)) && (!(googleresponse.match(/Try fewer keywords/))) ){
						
						var top =document.getElementById('tn15torrentz').offsetTop+20;
						 
						foundresults.innerHTML	= '<div id="'+where+'ResultsRHere" style="">'+
						googleresponse+
						'Results obtained with <a href='+googlesearchurl+'>this query</a></div>';
						GM_addStyle('div#exper_search{ background:#FAFAFA none repeat scroll 0 0;border:1px solid #999999;margin-bottom:4px;margin-top:4px;padding-bottom:4px;padding-top:4px;text-align:center;width:auto;}');
						return;
					}
					else if(googleresponse.match(/automated queries/))
					{
						googleresponse = googleresponse.replace(/src="\/sorry\//ig,'src="http://google.com/sorry/');	
						googleresponse = googleresponse.replace(/action="Captcha"/ig,'action="http://google.com/sorry/Captcha"');	
						googleresponse = googleresponse.replace(/<form /,'<form target="_blank" ');
						alert('google is blocking the results \nenter the capcha or delete your cookies from google' );
						var top =document.getElementById('tn15torrentz').offsetTop+20;
						foundresults.innerHTML	+= '<div id="'+where+'ResultsRHere" style="border: #F8F4D1 1px dashed; font-size:8pt;font-weight:bold;font-family:arial,sans-serif;background-color:#F3EEAD;margin: 5px; padding: 5px; overflow-x: hidden; overflow-y: auto; -moz-border-radius: 10px; border-radius: 10px; position: absolute; right: '+rightpositionprs+'%; top: '+top+'px; width: 45%; opacity: 0.95; z-index: 100; height: auto; font-size: 8pt; font-weight: bold; font-family: arial,sans-serif; background-color: rgb(243, 238, 173);">'+googleresponse+'Error 404 obtained with <a href='+googlesearchurl+'>this query</a> </div>';
						return;
					}
					else
					{
					 if (TheQueryIsCommingFrom == "openOtherhosts"){
							newgooglesearchurl =	"http://www.google.com/search?hl=en&q=%22"+moviename+"%22+%22interchangeable+links%22+OR+%22megaupload+com+d%22+OR+%22mediafire.com%2F%5C%5C%3F%22+OR+%22uploaded+to+id%22+OR+%22megashares.com%22+OR+%22rapidshare.de%5C%2Ffiles%22+OR+%22depositfiles%5C.com%22+OR+%22netload%5C%5C.in%22+OR+%22filefactory.com/file/%22&num=100&btnG=Search";
						}
						if (TheQueryIsCommingFrom == "openRapidshare"){
							newgooglesearchurl =	"http://www.google.com/search?hl=en&q=%22"+moviename+"%22+%22rapidshare+com+files%22&num=100&btnG=Search";
						}
					}
					
					
				}
			});	
			
			
		}
		
		function get_url_analize_and_show_them(linko,linktitle,where)
		{
			GM_xmlhttpRequest(
			{
				method:'GET',
				url:linko,
				headers: {'User-agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',},
				onload:function(responseDetails)
				{
					indyvidualpages = responseDetails.responseText;
					indyvidualpages = indyvidualpages.replace(/(<a.*?>).*?(<\/a.*?>)/g,"$1$2");
	
					var rapregexpArray = ["http://rapidshare.com/files/\\d{5koma}/",
											"ed2k://",
											"http://www.megaupload.com/\\?d=\\w",
											"http://www.sharevirus.com",
											"http://www.sharethefiles.com",
											"http://www.divxplanet.com",
											"http://netload.in",
											"http://www.filefactory.com",
											"http://rapidshare.de",
											"http://d\\d{1koma}.megashares.com",
											"http://uploaded.to",
											"http://mediafire.com",
											"http://sharedzilla.com",
											"http://www.adrive.com",
											"http://www.badongo.com",
											"http://www.flyupload.com",
											"http://www.sharing.ru",
											"http://depositfiles.com/files/",
											"http://www.sendspace.com",
											"http://mihd.net",
											"http://letitbit.net/download",
											"http://friendlyfiles.net",
											"http://www.storage.to/get/",
											"http://uploading.com/files/",
											"http://up-file.com",
											"http://hotfile.com/dl/"];
				
					var rapregexp = '((?:'+rapregexpArray.toString().replace(/,/g,".*?)|(?:").replace(/\./g, "\\.").replace(/\//g, "\\/").replace(/\\.\*\?/ig, ".*?").replace(/koma/ig, ",")+'.*?))(?:\\<\|\\)\|\\"|\\\'| |\\r|\\n|http:\\/\\/)';
				
					var rapregexp = new RegExp(rapregexp , "gi");
				
					var myArray = [];
				
					while (raplinksmatch = rapregexp.exec( indyvidualpages )){
						if(!(raplinksmatch[1].match(/\.\.\./))){
						
							if ( myArray.length==0) {
								myArray.push(raplinksmatch[1]);
								}else{
							if ((myArray[myArray.length-2] != raplinksmatch[1])){
							 myArray.push(raplinksmatch[1]);
								}			
							}
						}
					}
					myArray.sort;
					
					var dalinks1 = myArray.join('<br/>');
					var dalinks1 = myArray.join("</div><div id='foundlink'>");
					dalinks1 = "<div id='foundlink'>"+dalinks1;
					
					if ( dalinks1.match(/ed2k/) )
					{
						dalinks = dalinks1.slice(0,1980);
						dalinks = dalinks + '...';		
						dalinks = dalinks.replace(/(ed2k:\/\/.*?)\|(\d{3,})\|(\w{32})\|/g,"$2 Bytes <a href=http://ed2k.shortypower.dyndns.org/?hash=$3>ed2k-stats</a> <a href=$1|$2|$3>ed2k link</a> ");
					}else{
						dalinks = dalinks1.slice(0,1980);
						dalinks = dalinks + '...';		
					}
					
					if (myArray.length>0){
						analised = '<hr>Number of links : ' +myArray.length+'<br> from :<a href='+linko+'>' + linktitle + '</a><br>links:<br>'+ dalinks;	
						var therigthfoundlink = document.evaluate('//a[contains(@href, "'+linko+'") and not (contains(@href, "related")) and not (contains(@href, "cache"))]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
						for (var i = 0; i < therigthfoundlink.snapshotLength; i++) {
							node = therigthfoundlink.snapshotItem(i);
							var span = document.createElement('div');
							span.setAttribute('id', 'additional_info');
							span.setAttribute('class', 'comment');
							span.innerHTML += '<span id="nr_of_links">' +myArray.length +' links detected in '+linko+'</span>'+
											 '<div id="final_links">'+ dalinks+'</div>';
							node.parentNode.appendChild(span); 
							document.getElementById('logging').innerHTML += "</br>analyzing url:<a href='"+linko+"'> "+linktitle+"</a> "+myArray.length+' links detected';
						}
					}else{
						document.getElementById('logging').innerHTML += "</br>analyzing url:<a href='"+linko+"'>"+linktitle+"</a> "+myArray.length+' links detected';
					}
				}
			});
		}
		function analyseResults(toanalyse,where)
		{
			
					
			toanalyse = toanalyse.replace(/title=\".*?\" /g,'');	
			var toanalyse_array=toanalyse.split("<li class=\"g\">");
			GM_addStyle('span#nr_of_links{color:#6F3822;font-size:11px;padding:0 19px;}');
			GM_addStyle('div#final_links{font-family:Verdana;color:black;font-size:11px;margin:0 13px 4px;padding:0 14px;font-weight:normal;}');
			GM_addStyle('#hand {cursor:help;}');	
		
			var x = 0;
			for (var i = 0; i < toanalyse_array.length; i++)
			{
				toanalyse_array[i] = toanalyse_array[i].replace(/\. DVDRip /,' ');	
				toanalyse_array[i] = toanalyse_array[i].replace(/\&nbsp\;/g,'');
				var myregexp = /<a href="(.*?)" .*?>(.*?)<\/a><\/h3>/;
				var match = myregexp.exec(toanalyse_array[i]);
				if (match != null) {
					linko = match[1];
					linko = linko.replace(/\/interstitial\?url=/g,'');	 
					linktitle = match[2];	
					if (x < 25){
						get_url_analize_and_show_them(linko,linktitle,where); 		
					}
					x++;
				}
			}
		}
		function wheretosearch()
		{
			if (GM_getValue("SharedHttpFiles")){
				var what_SharedHttpFiles_do_you_want_to_search_for = GM_getValue("SharedHttpFiles");
			}else{
				var what_SharedHttpFiles_do_you_want_to_search_for = "rap";
				GM_setValue("SharedHttpFiles", "rap");
			};
			whatsite = GM_getValue("SharedHttpFiles");
				
			var mySharedHttpFilesArrayIs = {
			"all" 						 : '"rapidshare.com/files"||"megaupload.com/?d"||"letitbit.net"||"badongo.com/file/"||"depositfiles.com/"||"vip-file.com/download"||"filefactory.com/file"||"storage.to/get"||"hotfile.com/dl"||"netload.in/date"',
			"all2" 						 : '"rapidshare.com/files"||"megaupload.com/?d"||"letitbit.net"||"badongo.com/file/"||"depositfiles.com/"||"vip-file.com/download"||"filefactory.com/file"||"storage.to/get"||"hotfile.com/dl"||"netload.in/date"',
			"singlelink" 				 : '"single link" OR "one link download" "fileserve.com/file/"||"turbobit.net/"||"megaupload.com/?d"||"letitbit.net"||"quickupload.net/"||"depositfiles.com/"||"vip-file.com/download"||"gettyfile.ru"||"filestab.com"||"cramit.in"||"netload.in/date"||"gigasize.com"||"sharejunky.com"||"2shared.com"',
			"singlelink2" 				 : '"single link" OR "one link download" "fileserve.com/file/"||"turbobit.net/"||"megaupload.com/?d"||"letitbit.net"||"quickupload.net/"||"depositfiles.com/"||"vip-file.com/download"||"gettyfile.ru"||"filestab.com"||"cramit.in"||"netload.in/date"||"gigasize.com"||"sharejunky.com"||"2shared.com"',
			"rapidshare" : "%22rapidshare.com/files/%22",
			"rapidshare2" : "%22rapidshare.com/files/%22",
			"megaupload" : "%22megaupload.com/?d=%22",
			"megaupload2" : "%22megaupload.com/?d=%22",
			"filefactory" : "%22filefactory.com/file/%22", 
			"ed2k" : "\"ed2k%3a%2f%2f*\"+OR+site%3asharevirus.com+OR+site%3asharethefiles.com+OR+site%3aforum.divxplanet.com",
			"uploaded.to" : "%22uploaded.to/.id=%22",
			"watch_online" : "watch_online",
			"badongo.com" : "%22badongo.com/file/%22",
			"depositfiles.com" : "%22depositfiles.com/files/%22",
			"megashares" : "%22http:// * megashares.com%22",
			"binfile.org" : "%22binfile.org/download%22",
			"bluehost.to" : "%22bluehost.to/dl=%22",
			"ftp2share.com" : "%22ftp2share.com/file%22",
			"mytempdir" : "%22http:// * mytempdir.com/%22",
			"jabello.com" : "%22jabello.com/download * id=%22",
			"media.filecabi.net" : "%22media.filecabi.net/upload%22",
			"primeupload.com" : "%22primeupload.com/file/%22",
			"rsprotect.com" : "%22rsprotect.com/rc%22",
			"sprintshare.com" : "%22sprintshare.com/en/file/%22",
			"up.9q9q.net" : "%22up.9q9q.net/up/%22",
			"zupload.com" : "%22zupload.com/download * file=%22",
			"4filehosting.com" : "%224filehosting.com/file/%22",
			"4shared.com" : "%224shared.com/dir/%22",
			"4shared.com" : "%224shared.com/file/%22",
			"allyoucanupload.webshots.com" : "%22allyoucanupload.webshots.com/v/%22",
			"arabsoftware.net" : "%22arabsoftware.net/uploads/%22",
			"arbup.org" : "%22arbup.org/v/%22",
			"archive.org" : "%22archive.org/download/%22",
			"bitshare.com" : "%22bitshare.com/files%22",
			"cramit.in" 	 : "%22cramit.in%22",
			"bravoshare.com" : "%22bravoshare.com/download%22",
			"datapickup.com" : "%22datapickup.com/d%22",
			"datenklo.net" : "%22datenklo.net/dl-%22",
			"divshare.com" : "%22divshare.com/download/%22",
			"f-forge.com" : "%22f-forge.com/?d=%22",
			"fileblob.com" : "%22fileblob.com/download%22",
			"filecabi.net" : "%22filecabi.net/video%22",
			"filedepartment.com" : "%22filedepartment.com/freeshare%22",
			"filedepartment.com" : "%22filedepartment.com/totalshare%22",
			"fileflyer.com" : "%22fileflyer.com/view/%22",
			"filehd.com" : "%22filehd.com/1/%22",
			"filehd.com" : "%22filehd.com/download%22",
			"fileho.com" : "%22fileho.com/download3/%22",
			"filehostia.com" : "%22filehostia.com/show%22",
			"filelodge.com" : "%22filelodge.com/files/%22",
			"filesend.net" : "%22filesend.net/download%22",
			"filesupload.com" : "%22filesupload.com/showlink%22",
			"filesupload.com" : "%22filesupload.com/userfiles/%22",
			"fileupyours.com" : "%22fileupyours.com/files%22",
			"fyad.org" : "%22fyad.org/%22",
			"gigashare.com" : "%22gigashare.com/files/%22",
			"glintfiles.net" : "%22glintfiles.net/get%22",
			"axifile" : "%22http:// * axifile.com/%22",
			"cocoshare" : "%22http:// * cocoshare.cc%22",
			"crocko"	 : "%22http:// * crocko.com/%22",
			"filefront" : "%22http:// * filefront.com%22",
			"flyupload" : "%22http:// * flyupload.com%22",
			"ftpz.us" : "%22http:// * ftpz.us/%22",
			"gigasize" : "%22http:// * gigasize.com/get%22",
			"mediafire" : "%22http:// * mediafire.com/%22",
			"MegaShare" : "%22http:// * MegaShare.com/%22",
			"putfile" : "%22http:// * putfile.com/%22",
			"ripway" : "%22http:// * ripway.com/%22",
			"rogepost" : "%22http:// * rogepost.com/%22",
			"sendmefile" : "%22http:// * sendmefile.com/%22",
			"speedyshare" : "%22http:// * speedyshare.com/%22",
			"uploading" : "%22http:// * uploading.com%22",
			"uploadyourfiles" : "%22http:// * uploadyourfiles.de/%22",
			"urlcash" : "%22http:// * urlcash.net%22",
			"webfile" : "%22http:// * webfile.ru/%22",
			"yourfilehost" : "%22http:// * yourfilehost.com/%22",
			"zippyvideos" : "%22http:// * zippyvideos.com/%22",
			"come2store" : "%22http://download * come2store.com/%22",
			"35mb" : "%22http://download.35mb.com/%22",
			"file2you" : "%22http://download.file2you.net/%22",
			"yousendit" : "%22http://download.yousendit.com/%22",
			"uploadr" : "%22http://file.uploadr.com/%22",
			"slil.ru" : "%22http://slil.ru/%22",
			"sharejunky.com" : "%22http://sharejunky.com/%22",
			"bigupload" : "%22http://www.bigupload.com/d=%22",
			"sendspace" : "%22http://www.sendspace.com/file/%22",
			"hyperupload.com" : "%22hyperupload.com/download%22",
			"icefile.com" : "%22icefile.com/index%22",
			"icefile.net" : "%22icefile.net/index%22",
			"icefile.org" : "%22icefile.org/index%22",
			"illhostit.com" : "%22illhostit.com/files/%22",
			"keepmyfile.com" : "%22keepmyfile.com/download/%22",
			"live-share.com" : "%22live-share.com/d/%22",
			"live-share.com" : "%22live-share.com/files/%22",
			"looler.com" : "%22looler.com/file/%22",
			"maxishare.net" : "%22maxishare.net/en/file/%22",
			"megadownload.net" : "%22megadownload.net/download%22",
			"megadownload.net" : "%22megadownload.net/file%22",
			"megafileupload.com" : "%22megafileupload.com/en/file%22",
			"megaupload.com" : "%22megaupload.com/?d=%22",
			"mfile3.com" : "%22mfile3.com/download%22",
			"miniuploads.com" : "%22miniuploads.com/download * id=%22",
			"misterupload.com" : "%22misterupload.com/?d=%22",
			"mooload.com" : "%22mooload.com/file * file=files%22",
			"myfilestash.com" : "%22myfilestash.com/userfiles%22",
			"oxyshare.com" : "%22oxyshare.com/get/%22",
			"perushare.com" : "%22perushare.com/index%22",
			"pushfile.net" : "%22pushfile.net/get%22",
			"quickdump.com" : "%22quickdump.com/files%22",
			"quicksharing.com" : "%22quicksharing.com/v/%22",
			"rapidfile.net" : "%22rapidfile.net/.d=%22",
			"rapidshare.de" : "%22rapidshare.de/files/%22",
			"savefile.com" : "%22savefile.com/files/%22",
			"savefile.info" : "%22savefile.info/file/%22",
			"scambia.com" : "%22scambia.com/download%22",
			"share-online.biz" : "%22share-online.biz/dl/%22",
			"sharebigfile.com" : "%22sharebigfile.com/file/%22",
			"sharingmatrix.com" : "%22sharingmatrix.com/file/%22",
			"spread-it.com" : "%22spread-it.com/dl%22",
			"storeandserve.com" : "%22storeandserve.com/download/%22",
			"supasic.com" : "%22supasic.com/download%22",
			"thefilebucket.com" : "%22thefilebucket.com/files%22",
			"thefilebucket.com" : "%22thefilebucket.com/userfiles%22",
			"transferbigfiles.com" : "%22transferbigfiles.com/Get.aspx%22",
			"turboupload.com" : "%22turboupload.com/d/%22",
			"ultrashare.de" : "%22ultrashare.de/f/%22",
			"up-x.info" : "%22up-x.info/serv01%22",
			"up.li.ru" : "%22up.li.ru/?id=%22",
			"up.spbland.ru" : "%22up.spbland.ru/files/%22",
			"upitus.com" : "%22upitus.com/download%22",
			"upload.pk" : "%22upload.pk/freeupload/%22",
			"upload02.uploadpk.com" : "%22upload02.uploadpk.com/file/%22",
			"upload2.net" : "%22upload2.net/download2/%22",
			"upload2.net" : "%22upload2.net/page/%22",
			"uploadcomet.com" : "%22uploadcomet.com/download%22",
			"uploadhut.com" : "%22uploadhut.com/upload%22", 
			"uploadpalace.com" : "%22uploadpalace.com/download/%22",
			"uploadpalace.com" : "%22uploadpalace.com/en/file/%22",
			"uploadsend.com" : "%22uploadsend.com/d%22",
			"uppit.com" : "%22uppit.com/dl%22",
			"us.archive.org" : "%22us.archive.org%22",
			"ushareit.com" : "%22ushareit.com/view%22",
			"verzend.be" : "%22verzend.be/v/%22",
			"vietsharing.us" : "%22vietsharing.us/?d=%22",
			"veehd.com" 	 : "%22veehd.com/video/%22",
			"viprasys.com" : "%22viprasys.com/host/%22",
			"w-n-n.com" : "%22w-n-n.com/up%22",
			"webfilehost.com" : "%22webfilehost.com/index%22",
			"wtfhost.com" : "%22wtfhost.com/files%22",
			"wtfhost.com" : "%22wtfhost.com/userfiles%22",
			"yofreespace.com" : "%22yofreespace.com/download%22",
			"youploadit.com" : "%22youploadit.com/file/%22",
			"yousendit.com" : "%22yousendit.com/d.aspx?id=%22",
			"keepfile.com" : "%keepfile.com/%22",
			"zshare" : "%22zshare.net/download/%22"};
			return mySharedHttpFilesArrayIs[whatsite];
		}
	
		var myregexp = new RegExp("(?:\\?|#)search=(.*)");
		var match = myregexp.exec(window.location);
		if (match != null && match.length > 1) {
			search = match[1];
			search = search.replace(/\+/g,' ');
			search = search.replace(/\&.*?$/g,' ')
			document.getElementById('search_term').value = unescape(search);
			maximizefuncarea();
		}	
	
	}
	
	var Add_menu_commands = true;
	var Send_the_urls_of_the_pages_you_are_checking_in_the_open_database, Show_black_background_in_dead_links, Show_line_through_in_dead_links;
	var Remove_html_from_rapidshare_urls, Add_html_to_urls, No_live_links, Keyboard_functions, Convert_links_to_full_address_links, Show_info_in_tooltip, Display_page_stats, Destyling_google_cache, Autocheck_links_on_page_load, Check_rapidshare_dot_com_links, Check_filefactory_dot_com_links, Check_filejungle_dot_com_links, Check_megaupload_dot_com_links, Check_megarotic_dot_com_links, Check_megaporn_dot_com_links, Check_megavideo_dot_com_links, Check_netload_dot_in_links, Check_fileserve_dot_com_links, Check_hotfile_dot_com_links, Check_wupload_dot_com_links, Check_uploadstation_dot_com_links, Check_uploading_dot_com_links;
	function set_variables()
	{
		Send_the_urls_of_the_pages_you_are_checking_in_the_open_database = GM_getValue("Send_the_urls_of_the_pages_you_are_checking_in_the_open_database", false);
		Show_black_background_in_dead_links = GM_getValue("Show_black_background_in_dead_links", false);
		Show_line_through_in_dead_links = GM_getValue("Show_line_through_in_dead_links", true);
		Remove_html_from_rapidshare_urls = GM_getValue("Remove_html_from_rapidshare_urls", false);
		Add_html_to_urls = GM_getValue("Add_html_to_urls", false);
		No_live_links = GM_getValue("No_live_links", false);
		Keyboard_functions = GM_getValue("Keyboard_functions", true);
		Convert_links_to_full_address_links = GM_getValue("Convert_links_to_full_address_links", false);
		Show_info_in_tooltip = GM_getValue("Show_info_in_tooltip", true);
		Display_page_stats = GM_getValue("Display_page_stats", false);
		Destyling_google_cache = GM_getValue("Destyling_google_cache", true);
		Autocheck_links_on_page_load = GM_getValue("Autocheck_links_on_page_load", true);
		Check_rapidshare_dot_com_links = GM_getValue("Check_rapidshare_dot_com_links", true);
		Check_filefactory_dot_com_links = GM_getValue("Check_filefactory_dot_com_links", true);
		Check_filejungle_dot_com_links = GM_getValue("Check_filejungle_dot_com_links", true);
		Check_megaupload_dot_com_links = GM_getValue("Check_megaupload_dot_com_links", true);
		Check_megarotic_dot_com_links = GM_getValue("Check_megarotic_dot_com_links", true);
		Check_megaporn_dot_com_links = GM_getValue("Check_megaporn_dot_com_links", true);
		Check_megavideo_dot_com_links = GM_getValue("Check_megavideo_dot_com_links", true);
		Check_netload_dot_in_links = GM_getValue("Check_netload_dot_in_links", true);		
		Check_fileserve_dot_com_links = GM_getValue("Check_fileserve_dot_com_links", true);
		Check_narod_dot_ru_links = GM_getValue("Check_narod_dot_ru_links", false);
		Check_hotfile_dot_com_links = GM_getValue("Check_hotfile_dot_com_links", true);
		Check_wupload_dot_com_links = GM_getValue("Check_wupload_dot_com_links", true);
		Check_uploadstation_dot_com_links = GM_getValue("Check_uploadstation_dot_com_links", true);
		Check_depositfiles_dot_com_links = GM_getValue("Check_depositfiles_dot_com_links", true);
		Check_uploading_dot_com_links = GM_getValue("Check_uploading_dot_com_links", true);
		Check_keepfile_dot_com_links = GM_getValue("Check_keepfile_dot_com_links", true);
		Check_letitbit_dot_net_links = GM_getValue("Check_letitbit_dot_net_links", true);	
		Check_mediafire_dot_com_links = GM_getValue("Check_mediafire_dot_com_links", false);		
		Check_vip_dash_file_dot_com_links = GM_getValue("Check_vip_dash_file_dot_com_links", false);
		Check_veehd_dot_com_links = GM_getValue("Check_veehd_dot_com_links", false);
		Check_uploadbox_dot_com_links = GM_getValue("Check_uploadbox_dot_com_links", true);
		Check_uploadcell_dot_com_links = GM_getValue("Check_uploadcell_dot_com_links", false);
		Check_up_dash_file_dot_com_links = GM_getValue("Check_up_dash_file_dot_com_links", false);
		Check_getthebit_dot_com_links = GM_getValue("Check_getthebit_dot_com_links", false);
		Check_gigapeta_dot_com_links = GM_getValue("Check_gigapeta_dot_com_links", false);
		Check_rayfile_dot_com_links = GM_getValue("Check_rayfile_dot_com_links", false);		
		Check_good_dot_com_links = GM_getValue("Check_good_dot_com_links", false);
		Check_jumbofiles_dot_com_links = GM_getValue("Check_jumbofiles_dot_com_links", false);
		Check_bitroad_dot_net_links = GM_getValue("Check_bitroad_dot_net_links", false);
		Check_bitshare_dot_com_links = GM_getValue("Check_bitshare_dot_com_links", false);
		Check_cramit_dot_in_links = GM_getValue("Check_cramit_dot_in_links", false);
		Check_2shared_dot_com_links = GM_getValue("Check_2shared_dot_com_links", false);
		Check_badongo_dot_com_links = GM_getValue("Check_badongo_dot_com_links", true);
		Check_duckload_dot_com_links = GM_getValue("Check_duckload_dot_com_links", false);
		Check_filepost_dot_com_links = GM_getValue("Check_filepost_dot_com_links", false);
		Check_gigasize_dot_com_links = GM_getValue("Check_gigasize_dot_com_links", false); 
		Check_sendspace_dot_com_links = GM_getValue("Check_sendspace_dot_com_links", false);
		Check_save_dot_am_links = GM_getValue("Check_save_dot_am_links", false);
		Check_sharingmatrix_dot_com_links = GM_getValue("Check_sharingmatrix_dot_com_links", false);
		Check_share_dash_rapid_dot_com_links = GM_getValue("Check_share_dash_rapid_dot_com_links", false);
		Check_yourfilehost_dot_com_links = GM_getValue("Check_yourfilehost_dot_com_links", false);
		Check_ziddu_dot_com_links = GM_getValue("Check_ziddu_dot_com_links", false);
		Check_rapidshare_dot_de_links = GM_getValue("Check_rapidshare_dot_de_links", false);
		Check_crocko_dot_com_links = GM_getValue("Check_crocko_dot_com_links", false);
		Check_enigmashare_dot_com_links = GM_getValue("Check_enigmashare_dot_com_links", false);	
		Check_extabit_dot_com_links = GM_getValue("Check_extabit_dot_com_links", false);		
		Check_megashares_dot_com_links = GM_getValue("Check_megashares_dot_com_links", false);
		Check_oron_dot_com_links = GM_getValue("Check_oron_dot_com_links", false);
		Check_quickupload_dot_net_links = GM_getValue("Check_quickupload_dot_net_links", false);
		Check_x7_dot_to_links = GM_getValue("Check_x7_dot_to_links", false);
		Check_zshare_dot_net_links = GM_getValue("Check_zshare_dot_net_links", false);
		Check_uploaded_dot_to_links = GM_getValue("Check_uploaded_dot_to_links", true);
		Check_usaupload_dot_net_links = GM_getValue("Check_usaupload_dot_net_links", false);
		Check_filesend_dot_net_links = GM_getValue("Check_filesend_dot_net_links", false);	
		Check_files_dot_to_links = GM_getValue("Check_files_dot_to_links", false);	
		Check_freakshare_dot_net_links = GM_getValue("Check_freakshare_dot_net_links", false);
		Check_freakshare_dot_com_links = GM_getValue("Check_freakshare_dot_com_links", false);
		Check_files_dot_mail_dot_ru_links = GM_getValue("Check_files_dot_mail_dot_ru_links", false);
		Check_ifile_dot_it_links = GM_getValue("Check_ifile_dot_it_links", false);
		Check_shareflare_dot_net_links = GM_getValue("Check_shareflare_dot_net_links", true);
		Check_sharejunky_dot_com_links = GM_getValue("Check_sharejunky_dot_com_links", false);
		Check_solidfile_dot_com_links = GM_getValue("Check_solidfile_dot_com_links", false);
		Check_storage_dot_to_links = GM_getValue("Check_storage_dot_to_links", true);
		Check_turbobit_dot_net_links = GM_getValue("Check_turbobit_dot_net_links", true);
		Check_turboshare_dot_com_links = GM_getValue("Check_turboshare_dot_com_links", false);
		Check_turboupload_dot_com_links = GM_getValue("Check_turboupload_dot_com_links", false);
		Check_megaftp_dot_com_links = GM_getValue("Check_megaftp_dot_com_links", false);
		Check_imdb_dot_com_rate = GM_getValue("Check_imdb_dot_com_rate", true);		
		Check_load_dot_to_links = GM_getValue("Check_load_dot_to_links", true);	
		Check_link_dash_protector_dot_com_links = GM_getValue("Check_link_dash_protector_dot_com_links", false);
		Check_addyour_dot_own_links = GM_getValue("Check_addyour_dot_own_links", false);
	}
	set_variables();
	if (Display_page_stats) {
		var now = new Date();
		var firsttime = now.getTime();
	}
	function check(Send_the_urls_of_the_pages_you_are_checking_in_the_open_database,
		Show_black_background_in_dead_links,
		Show_line_through_in_dead_links,
		Remove_html_from_rapidshare_urls,
		Add_html_to_urls,
		No_live_links,
		Keyboard_functions,
		Convert_links_to_full_address_links,
		Show_info_in_tooltip,
		Display_page_stats,
		Destyling_google_cache,
	 firsttime)
	{
		
		const username = 'type_here_your_username';
		const password = 'type_here_your_password';
		if (Destyling_google_cache && (location.href.search(/q=cache.*?(rapidshare|megaupload|megarotic|megaporn|filefactory|netload|fileserve)/) != -1)) {
			var mybody = document.getElementsByTagName('body');
			if (mybody[0].innerHTML.search(/rapidshare|megaupload|megarotic|megaporn|filefactory|netload|fileserve/) != -1) {
				mybody[0].innerHTML = mybody[0].innerHTML.replace(/<b style.*?>/gi, '');
			}
		}
		var googleregexreader = new RegExp(/google\..*\/reader\/(.*blogsearch\.google.*|.*rapidshare.*)/);
		if (googleregexreader.