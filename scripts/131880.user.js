(function ()
{
	var fileMETA=new Array();
// ==UserScript==
// @name Another Rapidshare Links Checker
	fileMETA["name"] =        'Another Rapidshare Links Checker';
// @description                Automatically checks links from more that 50 file hosts, the script is checking the links in bulk when ever possible, that means maximum speed and low bandwidth.
	fileMETA["description"] = 'Automatically checks links from more that 50 file hosts, the script is checking the links in bulk when ever possible, that means maximum speed and low bandwidth.';
// @details                    When the check was made in bulk the script can check hundreds of links in a split of a second (300 links in 0.1 - 0.3 sec and 900 links in 0.5 sec on my ADSL connection). When the check was not made in bulk the speed is low and the use of bandwidth is increased because for each link check the script is downloading the checked page in the background.
	fileMETA["details"] =     'When the check was made in bulk the script can check hundreds of links in a split of a second (300 links in 0.1 - 0.3 sec and 900 links in 0.5 sec on my ADSL connection). When the check was not made in bulk the speed is low and the use of bandwidth is increased because for each link check the script is downloading the checked page in the background.';
// @namespace              http://userscripts.org/scripts/show/9467
// @include                http://*
// @include                file://*
// @version                20120222
	fileMETA["version"]=  '20120222';
// @license                GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
	fileMETA["license"] = 'GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)';
// @author		           hosts (http://userscripts.org/users/hosts)
	fileMETA["author"] =  'Dogrator (http://userscripts.org/users/hosts)';
// @contributor                ale5000 (http://userscripts.org/users/ale5000) Graviton (http://userscripts.org/users/183712)
	fileMETA["contributor"] = 'ale5000 (http://userscripts.org/users/ale5000) | Graviton (http://userscripts.org/users/183712)';

// ==/UserScript==
 
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
	function check_version(version) { var script_url = "http://userscripts.org/scripts/source/9467.meta.js";
		GM_xmlhttpRequest({ method:"GET",url:script_url,
			onload:function(result) { 	var newversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(result.responseText)[1];
			if (null == newversion){ alert('There was an error in the update function of the "'+fileMETA["name"]+'" userscript.\nGo to '+script_url+' to download the latest version.\nThis message will appear again in 10 days'); }
			if(newversion==version){ return; }else{ var answer = confirm('A different version of the "'+fileMETA["name"]+'" userscript for Greasemonkey is available.\nYour version: '+version+'\nNew version: '+newversion+'\nUpdate: '+fileMETA["update"]+'\nDo you want to update now? Check for update will be done again in 10 days');
					 if (answer){	GM_openInTab("http://userscripts.org/scripts/show/9467"); } 
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
		if (googleregexreader.test(location.href)) {
			var links = document.evaluate("id('entries')/div[last()-1]/div/div/div/div[1]/div[4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (links.snapshotItem(0)) {
				node = links.snapshotItem(0);
				var reg = new RegExp("<b>");
				if (reg.test(node.innerHTML)) node.innerHTML = node.innerHTML.replace(/<[\/]{0,1}(B|b)[^><]*>/g, "");
			}
		}
		var googleregex = new RegExp("(^http://blogsearch.*|^http://.*google.*)(.*rapidshare.*|.*megaupload.*|.*megarotic.*|.*megaporn.*|.*filefactory.*|.*netload.*|.*fileserve.*)"); 
		if (googleregex.test(location.href)) {
			var links = document.evaluate("id('res')/div[2]|id('ires')|/html/body/div[7]/div[2]|/html/body/div[6]/div[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (links.snapshotItem(0)) {
				link = links.snapshotItem(0);
				var regex = new RegExp("rapidshare");
				var regexff = new RegExp("filefactory");
				var regexmu = new RegExp("(?:(?:megaupload.com)|(?:megarotic.com)|(?:megaporn.com))");
				if (regex.test(link.innerHTML) || regexff.test(link.innerHTML) || regexmu.test(link.innerHTML)) {
					link.innerHTML = link.innerHTML.replace(/<b>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<\/b>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<em>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<\/em>/gi, '');
					link.innerHTML = link.innerHTML.replace(/<wbr>/gi, '');
				}
			}
		}
		var detectLinksRegEx ='';
		if (Check_filefactory_dot_com_links) detectLinksRegEx += '(?:\\:\/\/www\\.filefactory\\.com\/file\/..*?[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!])|';
		if (Check_filejungle_dot_com_links) detectLinksRegEx += '(?:\\:\/\/(?:|www\.)filejungle\\.com\/f\/..*?[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!])|';
		if (Check_rapidshare_dot_com_links) detectLinksRegEx +='(?:\\:\/\/(?:|rs\\w*\\.|www\\.)rapidshare\\.com\/files\/[\\d]*\/.*?\\..*?[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!])|';
		if (Check_uploading_dot_com_links) detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)uploading\\.com\/(?:\\w\\w\/|)files\/(?:\\w*)\/(?:\\S*))|";
		if (Check_hotfile_dot_com_links) detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)hotfile\\.com\/dl\\d*(?:\/|)\\w*(?:\/|)\\w*(?:\/|)\\S*)|";
		if (Check_wupload_dot_com_links) detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)wupload\\.com\/file\\d*\\S*)|";
		if (Check_uploadstation_dot_com_links) detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)uploadstation\\.com\/file.*?\\S*)|";
		if (Check_netload_dot_in_links) detectLinksRegEx += '(?:\\:\/\/(?:|www\\.)netload\\.in\/datei\\w*(?:\/|))[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!]|';
		if (Check_fileserve_dot_com_links) detectLinksRegEx += '(?:\\:\/\/(?:|www\\.)fileserve\\.com\/file\/\\w*(?:|/\\w*)(?:\/|))[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!]|';
		if (Check_megaupload_dot_com_links) detectLinksRegEx += "(?:\\:\/\/www\\.megaupload\\.com\/(?:|..\/)\\?d=.{8})|";
		if (Check_megarotic_dot_com_links) detectLinksRegEx += "(?:\\:\/\/www\\.megarotic\\.com\/(?:|..\/)\\?d=.{8})|";
		if (Check_megaporn_dot_com_links) detectLinksRegEx += "(?:\\:\/\/www\\.megaporn\\.com\/(?:|..\/)\\?d=.{8})|";
		
		detectLinksRegEx = detectLinksRegEx.replace(/\|$/,'');
		if (Check_rapidshare_dot_com_links || Check_filefactory_dot_com_links || Check_filejungle_dot_com_links || Check_megaupload_dot_com_links || Check_megarotic_dot_com_links || Check_megaporn_dot_com_links || Check_megavideo_dot_com_links || Check_netload_dot_in_links || Check_fileserve_dot_com_links || Check_hotfile_dot_com_links || Check_wupload_dot_com_links || Check_uploadstation_dot_com_links || Check_uploading_dot_com_links){
			detectLinksRegEx = "\b(?:|http\\:\/\/www\\.anonym\\.to\/\\?)(?:h\\w\\wp|http|https|hxxp|h p|h.ttp|h\\*\\*p)("+detectLinksRegEx+")";
 }else{
			detectLinksRegEx = "\b("+detectLinksRegEx+")";	
		}
		detectLinksRegEx = detectLinksRegEx.replace(/\/g,'\\b');
		urlRegex = new RegExp(detectLinksRegEx,"gi");
		var notallowedParents = ['a', 'head', 'iframe', 'script', 'style', 'title', 'option', 'textarea'];
		var xpath = "//text()[not(ancestor::" + notallowedParents.join(" or ancestor::") + ")]";
		var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
			if ((urlRegex.test(cand.nodeValue)) && (!cand.nodeValue.match(/\d(\.\.\.)\d/)) && (!cand.nodeValue.match(/killcode/))) {
				cand.nodeValue = cand.nodeValue.replace(/h\w\wp:\/\/|hxxp:\/\/|h p:\/\/|h.ttp:\/\/|h\*\*p:\/\//gi, 'http://');
				var span = document.createElement("span");
				span.id = 'rslinkfy';
				var source = cand.nodeValue;
				cand.parentNode.replaceChild(span, cand);
				urlRegex.lastIndex = 0;
				for (var match = null, lastLastIndex = 0;
				(match = urlRegex.exec(source));) {
					span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
					var a = document.createElement("a");
					hreflink = match[0];
					hreflink = hreflink.replace(/	*$/g,'');
					a.setAttribute("href", hreflink);
					a.appendChild(document.createTextNode(hreflink));
					span.appendChild(a);
					lastLastIndex = urlRegex.lastIndex; 
				}
				span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
				span.normalize();
			}
		}
		var links = document.getElementsByTagName('a');
		
		var numberofrslinks = 0;
		var numberoffflinks = 0;
		var numberoffjlinks = 0;
		var numberofmulinks = 0;
		var numberofnllinks = 0;
		var numberoffslinks = 0;
		var numberofhflinks = 0;	
		var numberofwulinks = 0;	
		var numberofustationlinks = 0;
 var numberofuplinks = 0;
		if (Check_rapidshare_dot_com_links){
			var myrapidshareRegExp0 = /http(?:s|)\:\/\/(?:|rs\w*\.|www\.|)rapidshare\.com\/files\/\d{4,}\/.*?\..*?/; 
			var myrapidshareRegExp1 = /^.*?http(?:s|):\/\/(?:|rs\w*\.|www\.|)rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
			var myrapidshareRegExp2 = /^.*?http(?:s|)%3A%2F%2F(?:|rs\w*\.|www\.|)rapidshare\.com%2Ffiles%2F\d{4,}%2F.*?\..*?/;			
		}
		if (Check_filefactory_dot_com_links){
			var myfilefactoryRegExp = /http\:\/\/www\.filefactory\.com\/file\/[\w]{6}(\/|)/;	
		} 
		if (Check_filejungle_dot_com_links){
			var myfilejungleRegExp = /http\:\/\/(?:|www\.)filejungle\.com\/f\/\w*/;
		}		
		if (Check_megaupload_dot_com_links){
			var mymegauploadRegExp0 = /http\:\/\/www\.megaupload\.com\/(?:|..\/)\?d=.{8}(\/|)/;
		} 
		if (Check_megarotic_dot_com_links){
			var mymegauploadRegExp1 = /http\:\/\/www\.megarotic\.com\/(?:|..\/)\?d=.{8}(\/|)/;
		}
		if (Check_megaporn_dot_com_links){
			var mymegauploadRegExp2 = /http\:\/\/www\.megaporn\.com\/(?:|..\/)\?d=.{8}(\/|)/;	
		} 
		if (Check_netload_dot_in_links){
			var mynetloadinRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)netload\.in(?:\/|%2F)datei\w*(?:\/|%2F|).*?/;	
		} 
		if (Check_fileserve_dot_com_links){
			var myfileservecomRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)fileserve\.com\/file\/.*/;	
		} 
		if (Check_hotfile_dot_com_links){
			var myhotfilecomRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)hotfile\.com\/dl\/\w*/;	
		}			 		
		if (Check_wupload_dot_com_links){
			var mywuploadcomRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)wupload\.com\/file\//;	
		} 			 		
		if (Check_uploadstation_dot_com_links){
			var myustationcomRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)uploadstation\.com\/file\//;	
		} 
		if (Check_uploading_dot_com_links){
			var myuploadifilRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)uploading\.com\/(?:\w\w\/|)files\/(?:\w*)\//;	
		}	
		var checkedlinksRegExpid = /(imdb_link|alive_link|adead_link|unava_link)/;
		var all = [];
		var allff = [];
		var allfj = [];
		var allnl = [];
		var allfs = [];
		var allmu = [];
 var allhf = [];
 var allwu = [];
 var allustation = [];
 var alldf = [];
		var allup = [];
		muid = 0;
		function fixurl(urll,site){
			urll = urll.replace('^.*?http:\/\/'+site, 'http://'+site, "gi"); 
			urll = urll.replace('^.*?http%3A%2F%2F'+site, 'http://'+site, "gi"); 
			urll = urll.replace('^.*?http:\/\/(?:|rs\w*\.)'+site, 'http://'+site, "gi"); 
			urll = urll.replace('^.*?http%3A%2F%2F(?:|rs\w*\.)'+site, 'http://'+site, "gi"); 
			urll = urll.replace(/\?killcode=[\d]*/gi, '');
			urll = urll.replace(/%2F/gi, '/');
			urll = urll.replace(/%3A/gi, ':');
			urll = urll.replace(/^.*http:\/\//g, "http://");
					
			if (site=='uploadstation'){
				urll = urll.replace(/(http:\/\/www.uploadstation.com\/file\/)(.*?)\/(.*?)$/g, "$1$2");
				}
			return urll; 	
		}
		for (var i = 0; i <links.length; i++)
		{	
			if ((links[i].href.search(myrapidshareRegExp0) != -1) || (links[i].href.search(myrapidshareRegExp1) != -1) || (links[i].href.search(myrapidshareRegExp2) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;
				numberofrslinks++;
				urll = fixurl(urll,'rapidshare');
				var myString = '' + numberofrslinks + '';
				if ( (myString.search(/\d00/) != -1) || (myString.search(/\d50/) != -1) || (myString.search(/50/) != -1)){
					all.push('xxxczxczxcsasdasdasdx4234');
				}
				all.push(urll);
			}
			if ((links[i].href.search(myfilefactoryRegExp) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;
				numberoffflinks++;
				urll = fixurl(urll,'filefactory');
				var myString = '' + numberoffflinks + '';
				if (myString.search(/\d00/) != -1) {
					allff.push('xxxczxczxcsasdasdasdx4234');
				}
				allff.push(urll);
			}
			if ((links[i].href.search(myfilejungleRegExp) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;
				numberoffjlinks++;
				urll = fixurl(urll,'filejungle');
				var myString = '' + numberoffjlinks + '';
				if (myString.search(/\d00/) != -1) {
					allfj.push('xxxczxczxcsasdasdasdx4234');
				}
				allfj.push(urll);
			}			
			
 
			if ((links[i].href.search(myuploadifilRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofuplinks++;
				urll = fixurl(urll,'uploading');
				var myString = '' + numberofuplinks + '';
				if (myString.search(/50/) != -1) {
					allup.push('xxxczxczxcsasdasdasdx4234');
				}
				allup.push(urll);
			}							
			if ((links[i].href.search(myhotfilecomRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofhflinks++;
				urll = fixurl(urll,'hotfile');
				var myString = '' + numberofhflinks + '';
				if (myString.search(/\d00/) != -1) {
					allhf.push('xxxczxczxcsasdasdasdx4234');
				}
				allhf.push(urll);
			}							
			if ((links[i].href.search(mywuploadcomRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofwulinks++;
				urll = fixurl(urll,'wupload');
				var myString = '' + numberofwulinks + '';
				if (myString.search(/\d00/) != -1) {
					allwu.push('xxxczxczxcsasdasdasdx4234');
				}
				allwu.push(urll);
			}	
			if ((links[i].href.search(myustationcomRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofustationlinks++;
				urll = fixurl(urll,'uploadstation');
				var myString = '' + numberofustationlinks + '';
				if (myString.search(/\d00/) != -1) {
					allustation.push('xxxczxczxcsasdasdasdx4234');
				}
				allustation.push(urll);
			}					
			if ((links[i].href.search(mynetloadinRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;
				numberofnllinks++;
				urll = fixurl(urll,'netload');
				var myString = '' + numberofnllinks + '';
				if (myString.search(/\d00/) != -1) {
					allnl.push('xxxczxczxcsasdasdasdx4234');
				}
				allnl.push(urll);
			}			
			if ((links[i].href.search(myfileservecomRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;				
				urll = urll.replace(/((www.|)fileserve\.com\/file\/\w*)(\/.*)/g, "$1");
				numberoffslinks++;
				urll = fixurl(urll,'fileserve');
				var myString = '' + numberoffslinks + '';
				if (myString.search(/\d00/) != -1) {
					allfs.push('xxxczxczxcsasdasdasdx4234');
				}
				allfs.push(urll);
			}			
			if ((links[i].href.search(mymegauploadRegExp0) != -1) || (links[i].href.search(mymegauploadRegExp1) != -1) || (links[i].href.search(mymegauploadRegExp2) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofmulinks++;
				urll = urll.replace(/^.*?http:\/\/www\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
				urll = urll.replace(/^.*?http%3A%2F%2Fwww\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				urll = urll.replace(/%3F/gi, '?');
				urll = urll.replace(/%3D/gi, '=');
				muid++;
				var myString = '' + numberofmulinks + '';
				allmu.push(urll);
			}
		}
		all = all.join();
		all = all.replace(/,/gi, '\n');
		var all = all.split("xxxczxczxcsasdasdasdx4234");
		
		allff = allff.join();
		allff = allff.replace(/,/gi, '\n');
		var allff = allff.split("xxxczxczxcsasdasdasdx4234");
		
		allfj = allfj.join();
		allfj = allfj.replace(/,/gi, '\n');
		var allfj = allfj.split("xxxczxczxcsasdasdasdx4234");
				
		allnl = allnl.join();
		allnl = allnl.replace(/,/gi, '\n');
		var allnl = allnl.split("xxxczxczxcsasdasdasdx4234");	
		
		allfs = allfs.join();
		allfs = allfs.replace(/,/gi, '\n');
		var allfs = allfs.split("xxxczxczxcsasdasdasdx4234");
		
						
		
		allup = allup.join();
		allup = allup.replace(/,/gi, '%0A');
		var allup = allup.split("xxxczxczxcsasdasdasdx4234");	
				
		allhf = allhf.join();
		allhf = allhf.replace(/,/gi, '\n');
		var allhf = allhf.split("xxxczxczxcsasdasdasdx4234");	
		
		allwu = allwu.join();
		allwu = allwu.replace(/,/gi, '\n');
		var allwu = allwu.split("xxxczxczxcsasdasdasdx4234");	
		
		allustation = allustation.join();
		allustation = allustation.replace(/,/gi, '\n');
		var allustation = allustation.split("xxxczxczxcsasdasdasdx4234");
					
		allmu = allmu.join();
		allmu = allmu.replace(/,/gi, '&');
		var allmu = allmu.split("xxxczxczxcsasdasdasdx4234");
		
		if (((numberofrslinks > 0) || (numberofhflinks > 0) || (numberofwulinks > 0) || (numberofustationlinks > 0)|| (numberofuplinks > 0) || (numberoffflinks > 0) || (numberoffjlinks > 0) || (numberofnllinks > 0) || (numberoffslinks > 0) || (numberofmulinks > 0)) && !(document.getElementsByTagName('RSLC')[0])) {
			add_RSLC_style();
		}
		if (numberofrslinks > 0) { 
			getlinkschecked(all); 
		}
		if (numberoffflinks > 0) {
			getfflinkschecked(allff);
		}
		if (numberoffjlinks > 0) {
			getfjlinkschecked(allfj);
		}
		if (numberofnllinks > 0) {
			getnllinkschecked(allnl);
		}
		if (numberoffslinks > 0) {
			getfslinkschecked(allfs);
		}
		if (numberofuplinks > 0) {
			getuplinkschecked(allup);
		}					
		if (numberofhflinks > 0) {
			gethflinkschecked(allhf);
		}					
		if (numberofwulinks > 0) {
			getwulinkschecked(allwu);
		}					
		if (numberofustationlinks > 0) {
			getustationlinkschecked(allustation);
		}			
		if (numberofmulinks > 0) {
			getmulinkschecked(allmu);
		}
		function getlinkschecked(all)
		{
				for (var i = all.length - 1; i >= 0; i--)
				{
					LinksTodo = all[i].split("\n");
					if (LinksTodo.length < 1) {
						return false;
					}
					var fileids = "";
					var filenames = "";
					for (x in LinksTodo) {
						var eintrag = LinksTodo[x];
						var logregex = /files\/(\d{5,10})\/(\S*)/;
						var teile = logregex.exec(eintrag);
						if ( (null != teile) && (null != teile[1]) && (null != teile[2]) && (teile[1]!='') && (teile[2]!='') ){
							fileids += "," + teile[1];
							filenames += "," + teile[2];
						}
					}
					fileids = fileids.substr(1);
					filenames = filenames.substr(1);
					var apirapidshareurl = "https://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles&files=" + encodeURI(fileids) + "&filenames=" + encodeURI(filenames)+"&cbf=RSAPIDispatcher&cbid=3";
					GM_xmlhttpRequest(
					{
						method: "get",
						url: apirapidshareurl,
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Content-type': 'text/html'
						},
						onload: function(result)
						{
							res = result.responseText;
							res = res.replace(/\\n/g, "\n");
							livelink = res.match(/(FileID|\d{5,}),(Filename|.*?),(Size|\d{2,}),(?:ServerID|\w*),(Status|1|3|5),(?:ShortHost|\w*),(?:MD5|\w*)/g);
							notfound = res.match(/(FileID|\d{5,}),(Filename|.*?),(Size|\d{1,}),(?:ServerID|\w*),(Status|0|4),(?:ShortHost|\w*),(?:MD5|\w*)/g);							
				
							if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /(FileID|\d{5,}),(Filename|.*?),(Size|\d{1,}),(?:ServerID|\w*),(Status|0|4),(?:ShortHost|\w*),(?:MD5|\w*)/;
									var matchArrayrs = string.match(regex);
									fotfoundlinks.push(matchArrayrs[1]);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
							}
							if (livelink) {
								var livelinklinks = new Array();
								var livelinklinksplus = new Array();
								for (var i = livelink.length - 1; i >= 0; i--) {
									var string = livelink[i];
									var regex2 = /(FileID|\d{5,}),(Filename|.*?),(Size|\d{2,}),(?:ServerID|\w*),(Status|1|3|5),(?:ShortHost|\w*),(?:MD5|\w*)/;
									matchArraylive = string.match(regex2);								
									livelinklinks.push(matchArraylive[1]);
									livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
								}
									
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								}
							}
							if ((!notfound) && (livelink) && Send_the_urls_of_the_pages_you_are_checking_in_the_open_database) {
								if (document.title == '') {
									documentotitle = 'no title';
								} else {
									documentotitle = document.title.replace(/rapidshare/, '');
								}
								address = encodeURIComponent(all);
								address = address.replace(/http%3A%2F%2Frapidshare.com%2Ffiles%2F/g, "f6kg4w");
								data = 'title=' + documentotitle + '&original_URL=' + encodeURIComponent(document.URL) + '&password=' + password + '&username=' + username + '&info=' + document.lastModified + '&submit=Enter+information';
								site = 'http://hosts.890m.com/add_to_database.php';
									GM_xmlhttpRequest(
									{
										method: "POST",
										url: site,
										headers: {
											'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
											'Content-type': 'application/x-www-form-urlencoded'
										},
										data: data,
										onload: function(result) {
										}
									});
							}
						}
					});		
				}
		}
		function getfflinkschecked(all)
		{
			for (var i = all.length - 1; i >= 0; i--) {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: 'http://www.filefactory.com/tools/link_checker.php',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type': 'application/x-www-form-urlencoded'
					},
					data: 'func=links&links=' + all[i],
					onload: function(result)
					{
						res = result.responseText.replace(/\t*/g, '');
						res = res.replace(/\r\n/g, ''); 
						
						livelink = res.match(/<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(?:.*?)<\/div>\n<\/td>\n<td>(?:.*?)<\/td>/g);
						notfound = res.match(/<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/g);
						if (notfound) {
							var fotfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/;
								matchArrayff = string.match(regex);
								matchArrayff[1] = "http://www.filefactory.com/file/" + matchArrayff[1];
								fotfoundlinks.push(matchArrayff[1]);
							}
							if (fotfoundlinks) {
								DiplayTheDeletedLinks(fotfoundlinks);
							}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(.*?)<\/div>\n<\/td>\n<td>(.*?)<\/td>/;
								matchArraylive = string.match(regex2);
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							}
						}
					}
				});
			}
		}
		function getfjlinkschecked(all)
		{
			for (var i = all.length - 1; i >= 0; i--) {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: 'http://filejungle.com/check_links.php',
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Content-type': 'application/x-www-form-urlencoded'
					},
					data: 'urls=' + encodeURIComponent(all[i]),
					onload: function(result)
					{
						res = result.responseText.replace(/\t*/g, '');
						res = res.replace(/\r\n/g, ''); 
						res = res.replace(/\n/g, ''); 
						res = res.replace(/ {2,}/g, " ");
						livelink = res.match(/http:\/\/(?:|www\.)filejungle\.com\/f\/(id|.*?)\/.*?<\/a><\/div> <div class="col2">(name|.*?)<\/div> <div class="col3">(sie|.*?)<\/div> <div class="col4"><span class="icon approved">/g);
						notfound = res.match(/http:\/\/(?:|www\.)filejungle\.com\/f\/(id|\S*?)\/\S*?<\/a><\/div> <div class="col2">--<\/div> <div class="col3">--<\/div> <div class="col4"><span class="icon declined">/g);
	
						if (notfound) {
							var fotfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /http:\/\/(?:|www\.)filejungle\.com\/f\/(id|\S*?)\/\S*?<\/a><\/div> <div class="col2">--<\/div> <div class="col3">--<\/div> <div class="col4"><span class="icon declined">/;
								matchArrayff = string.match(regex);
								fotfoundlinks.push(matchArrayff[1]);
							}
							if (fotfoundlinks) {
								DiplayTheDeletedLinks(fotfoundlinks);
							}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /http:\/\/(?:|www\.)filejungle\.com\/f\/(id|.*?)\/.*?<\/a><\/div> <div class="col2">(name|.*?)<\/div> <div class="col3">(sie|.*?)<\/div> <div class="col4"><span class="icon approved">/;
								matchArraylive = string.match(regex2);
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							}
						}
					}
				});
			}
		}
		function getuplinkschecked(allup,times) {
			if(times){times++;}
			else 
				times = 1;
			for (var i = 0; i < allup.length; i++){ 
				var alluptopost = allup[i];
 alluptopost = alluptopost.replace(/\:/g,'%3A');
				var dataup = "urls="+alluptopost;
				var foo = new Date;
				var unixtime_ms = foo.getTime();
				var unixtime = parseInt(unixtime_ms / 1000);			
				var randomnumber=(unixtime*123);
				var upurl = 'http://uploading.com/files/checker/?JsHttpRequest='+randomnumber+'-xml';
								
				GM_xmlhttpRequest(
				{
					method: "post",
					url: upurl,
					headers: {
						"Content-type": "application/x-www-form-urlencoded"
					},
					data: dataup, 
					onload: function(result)
					{							
						res = result.responseText;	
								
						if (res.match(randomnumber))
						{
							res = res.replace(/\\n/g,'').replace(/\\t/g,'').replace(/\\/g,'');
							
										
						 notfound = res.match(/<tr><td class="tleft"><a href="http:\/\/uploading\.com\/files\S*?\/" style="color: #696361;\" target=\"_blank\">(http:\/\/uploading\.com\/files\S*?)\/<\/a><\/td><td>(?:u0394u03b9u03b1u03b3u03c1u03acu03c6u03b7u03bau03b5|Deleted|Gelöscht|Supprimé|Deletado|Quitado|Slettet|Verwijderd|Διαγράφηκε|Tiedosto|Eliminato|Vymazán|Vymazaný|Usunięty|Удален|Silindi|削除済み|已删除)/gi); 
							livelink = res.match(/target="_blank">(http:\/\/uploading\.com\/files\S*?)\/<\/a><\/td><td>(?:u0395u03bdu03b5u03c1u03b3u03ccu03c2|Active|Aktiv|Actif|Ativar|Activo|Actief|Ενεργός|Aktiivinen|Attivo|Aktivní|Aktívny|Aktywny|Активный|Etkin|アクティブ|活跃)<\/td><td>(size|\d.*? .*?)<\/td>/gi); 
							if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									 var regex = /<tr><td class="tleft"><a href="http:\/\/uploading\.com\/files\S*?\/" style="color: #696361;\" target=\"_blank\">http:\/\/uploading\.com\/files(\S*?)\/<\/a><\/td><td>(?:u0394u03b9u03b1u03b3u03c1u03acu03c6u03b7u03bau03b5|Deleted|Gelöscht|Supprimé|Deletado|Quitado|Slettet|Verwijderd|Διαγράφηκε|Tiedosto|Eliminato|Vymazán|Vymazaný|Usunięty|Удален|Silindi|削除済み|已删除)/;
									matchArrayff = string.match(regex);
									matchArrayfflink = matchArrayff[1];
									var matchArrayfflink = matchArrayfflink.replace(/^\/(.*?)\/(.*?$)/,'$1');									
									fotfoundlinks.push(matchArrayfflink);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
							}
							if (livelink) {
								var livelinklinks = new Array();
								var livelinklinksplus = new Array();
								for (var i = livelink.length - 1; i >= 0; i--) {
									var string = livelink[i];
									var regex2 = /target="_blank">http:\/\/uploading\.com\/files(\S*)\/<\/a><\/td><td>(?:u0395u03bdu03b5u03c1u03b3u03ccu03c2|active|Active|Aktiv|Actif|Ativar|Activo|Actief|Ενεργός|Aktiivinen|Attivo|Aktivní|Aktívny|Aktywny|Активный|Etkin|アクティブ|活跃)<\/td><td>(size|\d.*? .*?)<\/td>/;
									matchArraylive = string.match(regex2);
									var hffilename1 = matchArraylive[1].replace(/^\/(.*?)\/(.*?$)/i,'$2');
									livelinklinks.push(matchArraylive[1]);									
									livelinklinksplus.push('+%%+id=' + hffilename1 + '+%%+size=' + matchArraylive[2] + '+%%+name=' + hffilename1 + '+%%+##');
								}
								if (livelinklinksplus) {									
									DiplayTheMULiveLinks(livelinklinksplus);
								}
							} 
									
						}
						else
						{
							if(times == 10)return;
							window.setTimeout(function()
							{
								getuplinkschecked(allup,times);
							},1000);	
						}
					}
				});
			}
		}
 
		function gethflinkschecked(allhf)
		{
			for (var i = allhf.length - 1; i >= 0; i--)
			{
				datashf = allhf[i];
				GM_xmlhttpRequest(
				{
					method: "post",
					url: 'http://api.hotfile.com/?action=checklinks',
					headers: {
						"Content-type": "application/x-www-form-urlencoded"
					},
					data: "links="+encodeURIComponent(datashf)+"&fields=id,status,size,name", 
					onload: function(result)
					{
						res = result.responseText;
						notfound = res.match(/(\d{4,}),0,.*?,(.*?)(?:\n|$)/g); 
						livelink = res.match(/(\d{4,}),1,(\d{2,}),(.*?)(?:\n|$)/g); 
						
						if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<td>(http\:\/\/hotfile\.com\/dl\/.*?)\/.*?<\/td><td>N\/A<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: red\;\">Non\-existent<\/span>/;
									var regex = /(\d{4,}),0,.*?,(.*?)(?:\n|$)/;
									matchArrayff = string.match(regex);
									matchArrayfflink = matchArrayff[1];
									fotfoundlinks.push(matchArrayfflink);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /(\d{4,}),(1),(\d{2,}),(.*?)(?:\n|$)/;
								matchArraylive = string.match(regex2);
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[4] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							} 
						}
					}
				});
			}
		}
 		
		function getwulinkschecked(allhf)
		{
			for (var i = allhf.length - 1; i >= 0; i--)
			{
				datashf = allhf[i];
				var data = "redirect=&links="+encodeURIComponent(datashf)+"&controls%5Bsubmit%5D=";
				data = data.replace(/%0A/g, "%0D%0A");
				
				GM_xmlhttpRequest(
				{
					method: "post",
					url: 'http://www.wupload.com/link-checker',
					headers: {
						"Content-type": "application/x-www-form-urlencoded"
					},
					data: data, 
					onload: function(result)
					{
						res = result.responseText;
						res = res.replace(/\r\n/g,'');
						res = res.replace(/\n/g,'');
						res = res.replace(/\t/g,'');
						res = res.replace(/> *</g,'><');
						notfound = res.match(/<tr class="failed"><td class="source"><span>(http:\/\/(?:|www\.)wupload.com\/file\/.*?)(?:|\/.*?)<\/span><\/td><td class="fileName"><span>-<\/span>/g); 
						livelink = res.match(/<tr class="success"><td class="source"><span>(http:\/\/(?:|www\.)wupload.com\/file\/.*?)(?:|\/.*?)<\/span><\/td><td class="fileName"><span>(.*?)<\/span> .(.*?).<\/td>/g);
						if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<tr class="failed"><td class="source"><span>(http:\/\/(?:|www\.)wupload.com\/file\/.*?)(?:|\/.*?)<\/span><\/td><td class="fileName"><span>-<\/span>/; 
						 matchArrayff = string.match(regex);
									matchArrayfflink = matchArrayff[1];
									fotfoundlinks.push(matchArrayfflink);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /<tr class="success"><td class="source"><span>(http:\/\/(?:|www\.)wupload.com\/file\/.*?)(?:|\/.*?)<\/span><\/td><td class="fileName"><span>(.*?)<\/span> .(.*?).<\/td>/;
								matchArraylive = string.match(regex2);
								var hffilename1 = matchArraylive[2].replace(/.*\/(.*?$)/,'$1');
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + hffilename1 + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							} 
						}
					}
				});
			}
		}
 		
		function getustationlinkschecked(allhf)
		{
			for (var i = allhf.length - 1; i >= 0; i--)
			{
				datashf = allhf[i];
				
				GM_xmlhttpRequest(
				{
					method: "post",
					url: 'http://www.uploadstation.com/check-links.php',
					headers: {
						"Content-type": "application/x-www-form-urlencoded"
					},
					data: "urls="+encodeURIComponent(datashf), 
					onload: function(result)
					{
						res = result.responseText;
						res = res.replace(/\r\n/g,'');
						res = res.replace(/\n/g,'');
						res = res.replace(/\t/g,'');
						res = res.replace(/> *</g,'><');
						
						notfound = res.match(/<div class="col col1">(http:\/\/www.uploadstation.com\/file\/.*?)<\/div><div class="col col2">--<\/div>/g); 
						livelink = res.match(/<div class="col col1">(http:\/\/www.uploadstation.com\/file\/.*?)<\/div><div class="col col2">(.*?)<\/div><div class="col col3">(.*?)<\/div><div class="col col4">Available<\/div>/g);
						if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<div class="col col1">(http:\/\/www.uploadstation.com\/file\/.*?)<\/div><div class="col col2">--<\/div>/; 
						 matchArrayff = string.match(regex);
									matchArrayfflink = matchArrayff[1];
									fotfoundlinks.push(matchArrayfflink);
								}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /<div class="col col1">(http:\/\/www.uploadstation.com\/file\/.*?)<\/div><div class="col col2">(.*?)<\/div><div class="col col3">(.*?)<\/div><div class="col col4">Available<\/div>/;
								matchArraylive = string.match(regex2);
								var hffilename1 = matchArraylive[2].replace(/.*\/(.*?$)/,'$1');
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + hffilename1 + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							} 
						}
					}
				});
			}
		}
		
	 function getnllinkschecked(all)
		{
			for (var i = all.length - 1; i >= 0; i--)
			{
				alltobeids = all[i].replace(/\n/g,'');
				fileids = alltobeids.match(/\/datei(\w*)/g);
				fileids = fileids.join('').replace(/\/datei/g,';');
				fileids = fileids.replace(/^;/,'auth=Cf5Td0g4FDsxWsRHSKyeiKIjomw0Jicy&file_id=');
				fileids = fileids.replace(/$/,'&bz=1');
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: "http://api.netload.in/info.php",
					data: fileids,
					headers: {
					"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(result)
					{
						res = result.responseText;
						livelink = res.match(/(nfileid|.*?);(nfilename|.*?);(size|.*?);online/g); 
						notfound = res.match(/(nfileid|.*?);(nfilename|.*?);(size|.*?);offline/g); 
						if (notfound) {
							var fotfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /(nfileid|.*?);(nfilename|.*?);(size|.*?);offline/;
								
								matchArrayff = string.match(regex);
								matchArrayfflink = "http://netload.in/datei" + matchArrayff[1];
								fotfoundlinks.push(matchArrayfflink);
							}
							if (fotfoundlinks) {
								DiplayTheDeletedLinks(fotfoundlinks);
							}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /(nfileid|.*?);(nfilename|.*?);(size|.*?);online/;
								matchArraylive = string.match(regex2);
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							} 
						}
					}					 
				});
			}
		}
	 function getfslinkschecked(all)
		{
			for (var i = all.length - 1; i >= 0; i--)
			{
				files = all[i].replace(/\n,\n/g,'\n');
				files = all[i].replace(/\r\n,/g, "");
				data = 'submit=Check+Urls&urls=' + files;
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: "http://www.fileserve.com/link-checker.php",
					data: data,
					headers: {
					"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(result)
					{
						
						res = result.responseText;
						res = res.replace(/<\/td>\s{9}/g, "");
						res = res.replace(/\s{21}<td>/g, "<td>");
						livelink = res.match(/http:\/\/(?:|www.)fileserve.com\/file\/(id|.*?)<td>(name|.*)<td>(size|\d.*?)<td>Available/g);
						notfound = res.match(/http:\/\/(?:|www.)fileserve.com\/file\/(id|.*?)<td>--<td>--/g); 
						if (notfound) {
							var fotfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /http:\/\/(?:|www.)fileserve.com\/file\/(id|\w*)(?:|\/.*?)<td>--<td>--/; 
								matchArrayff = string.match(regex);
								matchArrayfflink = matchArrayff[1];
								fotfoundlinks.push(matchArrayfflink);
							}
							if (fotfoundlinks) {
								DiplayTheDeletedLinks(fotfoundlinks);
							}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								
								var regex2 = /http:\/\/(?:|www.)fileserve.com\/file\/(id|.*?)<td>(name|.*)<td>(size|\d.*?)<td>Available/;
								matchArraylive = string.match(regex2);
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							} 
						}
					}					 
				});
			}
		}
		
								
	 
			
								
			
	 function getnllinkschecked2(all)
		{
			for (var i = all.length - 1; i >= 0; i--) {
				GM_xmlhttpRequest(
				{
					method: "POST",
					url: "http://api.netload.in/index.php\?id=2",
					data: "links="+escape(all[i])+"&send=Absenden",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(result)
					{
						res = result.responseText;		 
						res = res.replace(/\r\n/g, ''); 
						res = res.replace(/\n/g, ' '); 
						res = res.replace(/<\/textarea>/g, ' </textarea>');
						livelink = res.match(/<h3 style="color: green;">Online<\/h3><textarea style="width: 100%; height: 150px;" name="links">(.*?) <\/textarea> /g); 
						notfound = res.match(/<h3 style="color: red;">Offline<\/h3><textarea style="width: 100%; height: 150px;" name="links">(.*?) <\/textarea>/g); 
						if (livelink) {
							livelink = livelink.join("");
							livelink = livelink.match(/http:\/\/.*? /g); 
						}
						if (notfound) {
							notfound = notfound.join("");
							notfound = notfound.match(/http:\/\/.*? /g); 
						}
						if (notfound) {
							var fotfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /(http:\/\/.*?) /; 
								matchArrayff = string.match(regex);
								fotfoundlinks.push(matchArrayff[1]);
							}
							if (fotfoundlinks) {
								DiplayTheDeletedLinks(fotfoundlinks);
							}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex2 = /(http:\/\/.*?) /;
								matchArraylive = string.match(regex2);
								livelinklinks.push(matchArraylive[1]);
								livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							}
						}
					}
				});
			}
		}
		function getmulinkschecked(allmu)
		{
			for (var i = allmu.length - 1; i >= 0; i--) {
				datas = allmu[i];
				GM_xmlhttpRequest(
				{
					method: "post",
					url: 'http://megaupload.com/mgr_linkch' + 'eck.php',
					headers: {
						"Content-type": "text/html"
					},
					data: datas,
					onload: function(result)
					{
						res = result.responseText;
						res = res.replace(/\d=www.megaupload.com&\d=www.megaporn.com/, '');
						var recieved = new Array();
						recieved = res.split('&id');
						var pagelinks = new Array();
						pagelinks = datas.split('id');
						var alltogethernow = new Array();
						for (var y = recieved.length - 1; y >= 0; y--) {
							pagelinks[y] = 'file' + pagelinks[y];
							alltogethernow.push(pagelinks[y] + '=' + recieved[y]);
						}
						alltogethernowstr = alltogethernow.join('+');
						livelink = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=0&s=(\d*)&d=\d&n=(.*?)\+/g);
						notfound = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=1/g);
						tempanav = alltogethernowstr.match(/file\d{1,}=(........)(?:&|)=\d{1,}=3/g);
						if (notfound) {
							var fotfoundlinks = new Array();
							for (var i = notfound.length - 1; i >= 0; i--) {
								var string = notfound[i];
								var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=1/;
								matchArray = string.match(regex);
								fotfoundlinks.push(matchArray[1]);
							}
							if (fotfoundlinks) {
								DiplayTheDeletedLinks(fotfoundlinks);
							}
						}
						if (tempanav) {
							var tempanavlinklinks = new Array();
							for (var i = tempanav.length - 1; i >= 0; i--) {
								var string = tempanav[i];
								var regex = /file\d{1,}=(........)(?:|&)=\d{1,}=3/;
								matchArray = string.match(regex);
								tempanavlinklinks.push(matchArray[1]);
							}
							if (tempanavlinklinks) {
								DiplayTheTempAvailableLinks(tempanavlinklinks);
							}
						}
						if (livelink) {
							var livelinklinks = new Array();
							var livelinklinksplus = new Array();
							for (var i = livelink.length - 1; i >= 0; i--) {
								var string = livelink[i];
								var regex = /file\d{1,}=(........)(?:&|)=\d{1,}=0&s=(\d*)&d=\d&n=(.*?)\+/;
								matchArray = string.match(regex);
								livelinklinks.push(matchArray[1]);
								livelinklinksplus.push('+%%+id=' + matchArray[1] + '+%%+size=' + matchArray[2] + '+%%+name=' + matchArray[3] + '+%%+##');
							}
							if (livelinklinksplus) {
								DiplayTheMULiveLinks(livelinklinksplus);
							} 
						}
					}
				});
			}
		}
 function DiplayTheDeletedLinks(fotfoundlinks)
		{
			var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') + "\')]";
			var allLinks, thisLink;
			allLinks = document.evaluate(xpathoffotfoundlinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allLinks.snapshotLength; i++)
			{
				
				var thisLink = allLinks.snapshotItem(i);
				if (Show_black_background_in_dead_links) {
					thisLink.style.backgroundColor = 'Black';
					thisLink.style.color = 'Azure';
				}
				if (Show_line_through_in_dead_links) {
					thisLink.style.textDecoration = 'line-through';
				}
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
					thisLink.id = 'adead_link';
				}
				if (No_live_links) {	
					delinkify(allLinks.snapshotItem(i), thisLink.id);
				}
				if ( (thisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) ) {
					thisLink.href = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
					thisLink.textContent = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
				}
				if (Convert_links_to_full_address_links) {	
					Convert_links_to_full_address_links_function(allLinks.snapshotItem(i), thisLink.id);
				}
			}
		}
		function DiplayTheMULiveLinks(livelinklinksplus)
		{
			var mylivelinklinksplusString = new String(livelinklinksplus);
			var livelinklinksplussplited = new Array();
			livelinklinksplussplited = mylivelinklinksplusString.split('##');
			for(var i = 0; i < (livelinklinksplussplited.length - 1); i++)
			{
				var matchArrayidmu = new Array();
				var regexid = /\+%%\+id=(.*?)\+%%\+/;
				matchArrayidmu = livelinklinksplussplited[i].match(regexid);
				var regexsizenumber = /\+%%\+size=(\d{1,})\+%%\+/;
				var regexsize = /\+%%\+size=(.*?)\+%%\+/;
				if (livelinklinksplussplited[i].match(regexsizenumber)) {
					var matchArraysize = livelinklinksplussplited[i].match(regexsizenumber);
					var size = matchArraysize[1];
					var size2 = (parseFloat(size) / 1048576);
					var mbsize = (Math.round(size2*100) / 100) + ' MB' + ' (' + size + ' bytes)';
				} else if (livelinklinksplussplited[i].match(regexsize)) {
					var matchArraysize = livelinklinksplussplited[i].match(regexsize);
					var mbsize = matchArraysize[1];
				} else {
					var mbsize = 'unknown';
				}
				var regexname = /\+%%\+name=(.*?)\+%%\+/;
				var matchArrayname = livelinklinksplussplited[i].match(regexname);
				var xpathofalivelinklinks = "//a[contains(@href,\'" + matchArrayidmu[1] + "\')]";
				var muallLinks, muthisLink;
				muallLinks = document.evaluate(xpathofalivelinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var y = 0; y < muallLinks.snapshotLength; y++)
				{
					var muthisLink = muallLinks.snapshotItem(y);
					if (! (muthisLink.href.match(/(google|search%3Fq%3D|search\?q=)/)))
					{
 					muthisLink.id = 'alive_link';
						if (Show_info_in_tooltip){
							var instead_of_title = "Name: " + matchArrayname[1] + "<br/>Size: " + mbsize;
							muthisLink.setAttribute("dll_info", instead_of_title);
							muthisLink.addEventListener("mouseover", create_window, false);
							muthisLink.addEventListener("mouseout", function() { kill_window(); }, false);
							muthisLink.addEventListener("mousemove", function(event) { locate(event); }, true);
						}else{
							muthisLink.title = "Name: " + matchArrayname[1] + "\r\n Size: " + mbsize;	
						}
						if ( (muthisLink.href.match(/rapidshare.*?html$/)) && (Remove_html_from_rapidshare_urls) ) {
							muthisLink.href = muthisLink.href.replace(/\.html$/,'');
							muthisLink.textContent = muthisLink.href.replace(/\.html$/,'');
						}
						if ( (muthisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) ) {
							muthisLink.href = muthisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
							muthisLink.textContent = muthisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
						}
						if (muthisLink.href.match(/rapidsshares\.com/)) {
							muthisLink.href = muthisLink.href.replace(/rapidsshares\.com/,'rapidshare.com');
							muthisLink.textContent = muthisLink.href.replace(/rapidsshares\.com/,'rapidshare.com');
						}					 						
					}
					if (No_live_links) {
						delinkify(muallLinks.snapshotItem(y), muthisLink.id);
					}
					if (Convert_links_to_full_address_links) {	
					 Convert_links_to_full_address_links_function(muallLinks.snapshotItem(y), muthisLink.id);
				 }
				}
			}
		}
		function DiplayTheLiveLinks(livelinklinks)
		{
			var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') + "\')]";
			var allliveLinks, thisLink;
			
			allliveLinks = document.evaluate(xpathoflivelinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			rslivexpath = xpathoflivelinklinks;
			for (var i = 0; i < allliveLinks.snapshotLength; i++)
			{
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/)))
				{
					thisLink.id = 'alive_link'; 
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
				if (Convert_links_to_full_address_links) {
					Convert_links_to_full_address_links_function(allliveLinks.snapshotItem(i), thisLink.id);
				}
				if ( (thisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) ) {
					thisLink.href = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
					thisLink.textContent = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
				}
			}
		}
		
		Array.prototype.exists = function(search)
		{
			for (var i = 0; i < this.length; i++)
				if (this[i] == search)
					return true;
			return false;
		}
		
	 function DiplayTheTempAvailableLinks(tempanavlinklinks)
		{
			var xpathoftempanavlinklinks = "//a[contains(@href,\'" + tempanavlinklinks.join('\') or contains(@href,\'') + "\')]";
			var allliveLinks, thisLink;
			allliveLinks = document.evaluate(xpathoftempanavlinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allliveLinks.snapshotLength; i++)
			{
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
					thisLink.id = 'unava_link';
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
				if (Convert_links_to_full_address_links) {	
					Convert_links_to_full_address_links_function(allliveLinks.snapshotItem(i), thisLink.id);
				}
				if ( (thisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) ) {
							thisLink.href = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
							thisLink.textContent = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
				}								
			}
		}
		
		var numberoflinks=0;
		numberoflinks = numberofrslinks + numberoffflinks + numberoffjlinks + numberofnllinks + numberoffslinks + numberofuplinks + numberofhflinks + numberofwulinks + numberofustationlinks + numberofmulinks;
		
		if (Display_page_stats)
		{
			var now = new Date(); 
			var lasttime = now.getTime();
			
			var runningtime = lasttime - firsttime;
			if (numberoflinks > 0) {
				GM_log('Total number of links: ' + 
				numberoflinks + '\r\nPage title: ' + document.title + 
				'\r\nrapidshare.com links : ' + numberofrslinks + 
				'\r\nfilefactory.com links : ' + numberoffflinks + 
				'\r\filejungle.com links : ' + numberoffjlinks + 
				'\r\nnetload.in links : ' + numberofnllinks + 
				'\r\nfileserve links : ' + numberoffslinks + 
				'\r\nuploading.com links : ' + numberofuplinks + 
				'\r\nhotfile.com links : ' + numberofhflinks + 
				'\r\nmegaupload.com megaporn.com megarotic.com links : ' + numberofmulinks + 
				'\r\nRapidshare Links Checker\r\nTime to complete checking in seconds: ' + (runningtime / 1000) + 
				'\r\nTime to complete checking in milliseconds: ' + runningtime + 
				'\r\nLocation: ' + document.location);
			}
		}
		
		return numberoflinks;
	}
	function Check_The_Links_In_This_Page()
	{
		numberoflinks = check(Send_the_urls_of_the_pages_you_are_checking_in_the_open_database,Show_black_background_in_dead_links,Show_line_through_in_dead_links,Remove_html_from_rapidshare_urls,Add_html_to_urls,No_live_links,Keyboard_functions,Convert_links_to_full_address_links,Show_info_in_tooltip,Display_page_stats,Destyling_google_cache,firsttime);
		return numberoflinks;
	}
	if(Autocheck_links_on_page_load)
	{
		check_all_links();
 }	
	function check_all_links()
	{
		var numberoflinks = 0;
		var nroftotallinkscheckednonbulk = 0;
		var start_time = microtime(true);
		numberoflinks = Check_The_Links_In_This_Page();
		nroftotallinkscheckednonbulk = start();	
		var end_time = microtime(true);
		var numberoftotallinks = numberoflinks + nroftotallinkscheckednonbulk;
		time_to_complete = Math.round((end_time-start_time)*1000)/1000;
		faster_link_checker_debug(numberoftotallinks,time_to_complete);
	}
	function microtime (get_as_float) {	var now = new Date().getTime() / 1000; var s = parseInt(now, 10); return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s; }
	
	function faster_link_checker_debug(tn,end_time,start_time){
		if (tn>0){			
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: "http://torrentproject.com/link_checker/?tn="+tn+"&time_to_complete="+time_to_complete+"&url="+document.URL,
				headers: { 'User-agent': 'Greasemonkey/'+fileMETA["name"]+' ('+fileMETA["version"]+')', },		
			});
		}
	}
	
	
 function PreKeyCheck(ev)
	{
		var keycode;
		if (window.event) keycode = window.event.keyCode;
		else if (ev) keycode = ev.which;
		if (keycode == first_key_keycode){ 
		 document.addEventListener('keydown', KeyCheck, false);
		}
 }
	function KeyCheck(ev)
	{
		var keycode;
		if (window.event) keycode = window.event.keyCode;
		else if (ev) keycode = ev.which;
		if (keycode == configuration_keycode){
		 configuration(); 
		 document.removeEventListener('keydown', KeyCheck, false);
		 document.addEventListener('keydown', PreKeyCheck, false); 
		}
		if (keycode == makeTheCheckedLinksToFullURl_keycode){
			makeTheCheckedLinksToFullURl();
		 document.removeEventListener('keydown', KeyCheck, false);
		 document.addEventListener('keydown', PreKeyCheck, false); 
		}
		if (keycode == check_all_links_keycode){
			check_all_links();
		 document.removeEventListener('keydown', KeyCheck, false);
		 document.addEventListener('keydown', PreKeyCheck, false); 
		}
	}
	if(Add_menu_commands)
	{
		if (Keyboard_functions){
			document.addEventListener('keydown', PreKeyCheck, false); 
			GM_registerMenuCommand("[Rapidshare Links Checker] Check The Links In This Page ("+first_key_keycodename+"+"+String.fromCharCode(check_all_links_keycode)+")", check_all_links);
			GM_registerMenuCommand("[Rapidshare Links Checker] Configuration ("+first_key_keycodename+"+"+String.fromCharCode(configuration_keycode)+")", configuration);
			GM_registerMenuCommand("[Rapidshare Links Checker] Make The Links To Full Urls ("+first_key_keycodename+"+"+String.fromCharCode(makeTheCheckedLinksToFullURl_keycode)+")", makeTheCheckedLinksToFullURl);
			GM_registerMenuCommand("[Rapidshare Links Checker] Search Engine", SearchEngine);
		}else{ 
			GM_registerMenuCommand("[Rapidshare Links Checker] Check The Links In This Page", check_all_links);
			GM_registerMenuCommand("[Rapidshare Links Checker] Configuration", configuration);
			GM_registerMenuCommand("[Rapidshare Links Checker] Make The Links To Full Urls", makeTheCheckedLinksToFullURl);	
			GM_registerMenuCommand("[Rapidshare Links Checker] Search Engine", SearchEngine);	
		}
	}
	function closeConfigurationBox()
	{
		configurationBox = document.getElementById('hideshow');
		configurationBox.parentNode.removeChild(configurationBox);
	}
	function configuration()
	{
		if (document.getElementById('hideshow'))
		{
			closeConfigurationBox();
			return;
		}
		var configcss = '\
			#imghideshow {\
				border: none;\
			}\
			#plusimage{\
				display:inline;\
			}\
			#hideshow {\
				position: fixed;\
				width: 100%;\
				height: 100%;\
				top: 0;\
				left: 0;\
				font-size:12px;\
				z-index:211;\
				text-align:left;\
			}\
			#fade {\
				background: #000;\
				position: fixed;\
				width: 100%;\
				height: 100%;\
				opacity: .80;\
				-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";\
				left: 0;\
				z-index: 10;\
			}\
			.popup_block {\
				font-family:verdana;\
				color:black;\
				background: #ddd;\
				padding: 10px 20px;\
				border: 10px solid #fff;\
				float: left;\
				width: 731px;\
				position: absolute;\
				top: 2%;\
				left: 40%;\
				margin: 0 0 0 -292px;\
				-moz-border-radius: 10px;\
				border-radius: 10px;\
				z-index: 100;\
			}\
			.popup_block .popup {\
				float: left;\
				width: 100%;\
				background: #fff;\
				margin: 10px 0;\
				padding: 0px 0 0px;\
				border-left: 1px solid #bbb;\
				border-top: 1px solid #bbb;\
				border-right: 1px solid #bbb;\
			}\
			.h3hideshow{\
				margin: 1px 0 0px;\
				padding: 1px 10px;\
				border-bottom: 1px solid #bbb;\
				font-size: 1.5em;\
				font-weight: normal;\
				cursor:pointer;\
				background:#DDDDDD none repeat scroll 0 0;\
			}\
			.h3hideshow:hover{\
				background:#C0BEBE none repeat scroll 0 0;\
			}\
			#h3hideshowtitle{\
				margin: 2px 0 0px;\
				padding: 7px 10px;\
				border-bottom: 1px solid #bbb;\
				font-size: 2.3em;\
				font-weight: normal;\
			}\
			.popup a {\
				color: darkblue;\
				text-decoration: none;\
			}\
			.popup p {\
				padding: 1px 10px;\
				margin: 0px 0;\
				font-family:verdana,geneva,lucida,"lucida grande",arial,helvetica,sans-serif;\
				font-size:10pt;\
				font-size-adjust:none;\
				font-stretch:normal;\
				font-style:normal;\
				font-variant:normal;\
				font-weight:normal;\
				line-height:normal;\
			}\
			.sites {\
				padding: 1px 10px;\
				margin: 0px 0;display:inline-block;width:17em;\
			}\
			.popup img.cntrl {\
				position: absolute;\
				right: -20px;\
				top: -20px;\
			}\
			.h3hideshowcontent {\
				max-height:294px;\
				overflow:auto;\
				display: none;\
				padding: 10px 10px;\
			}\
			#specinfo{\
				font-size:14px;\
			}\
		';
		GM_addStyle(configcss);
		function makecheckbox(id)
		{
			checkbo_x = "<input_type='checkbox'_class_='checkboxconfig'_value='"+id+"'_name='"+id+"'_id='"+id+"'/>";
			return checkbo_x;
		}
		var configurationinnerHTML = '\
			<div id="fade"></div>\
			<div class="popup_block">\
				<div class="popup">\
					<a href="#" onclick="javascript:return false;"><img id="imghideshow" title="Close" class="cntrl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAY1SURBVHjapFZbbFRVFN0zd6Yz08dMoUNf9EGxUItJK62I4AOJEYiQoqE+0OgHCiqG+PgQozH6ofyIJiYEMRqNJpggHySlrRM+hCAtajAUaGgEi9BBSilMO0PnfWeOa597bjt9AEVvsubOPWefs/br7H0sQgj6P4/FYrk9+WkSuoAHgCrgLvV9DLgMdID02rQZmfAmaAJaxS2edDr9s67rL7EB/9XCUuALoEl+pZJEvTAo8A9s6iVKxojKYWheAWxuIMr2GGKp1KHh4eF3vF4vW59me6ZD2Ajsle6LXify7SI68iNROIgtIKtpBvQEB5DI7iC6Zw3Rmi1EM0vlBsFg8OX8/PxvWQdFKm5E2KhiQ9R9iOjL17E6QFRUhAGQpFNjklYrhhT6YbndTtT8LtGjG+T0lStXNhcVFTGpnkE8jpAT4hdgNvm+Ivr+AyIHtM+Fu3Ss0RUZO8pqqos/NiDLblgcQO48/CzRpk/l9KlTp56oq6s7gL8JkzST0AespN9/Itq2Hu7xQnsbRFOcWSBKT50FVpMUHrBD/iKsXb+V6KmtFI/H/3Q6nZzdEZPU1PVFSXbtEoltz0Nzm2HRqleIvjsLa/9CoiSnBs99cwaym4lCYSRSHr4/REg64SBHTX9//2fqGNmVevJ5jn/0Xe+Rhd2SBVdGkInr3hizZI8fOibGg8fM5/EthgIJwxPJ7a/Jd05Ozn14uQEHGRGXsVtOIwHS2nbDlTOIYlHoMoUL9w0Q/GSA/0/KeXglFmEWsp/uIjp9FAbnzWttbV3H3ECWFWdnubTuSBulQ9AwDs2jcSPGby6evGn7sIGJzwuzDUViMekdAZ0jrXvlVGVl5RK8ctlKq6ZpHFSKdBzCwSVjQRILAzh3508TPe29dbl6ZibiB/lrQeWBGFmykGe/dcjpwsLCeuVWpw1ZWskFWO/rM45ZNGWkPXt0ZIR/iJbigHfeoOYuU9UsbmbtWI2x+i+acWSt8yShCiaJVFwq50zeZrsYmapAgz/KFCmzo2gqhk7WJ8SDCY+bomF2qdI2E3/cpKPwXKYs1qdAlozwnjlSJBaLcbVxyqRBlT8rB+fUkJuzGotEXB1TRvc02hfLKHk9btT6BCyPzJ0rpwcGBoLqHGpWVIMjsmLVPkTZhXgbMacUW3pGTB2z+4HA5fHjkE3EDELeYyaSJjx/qZzq6uq6pKJrsR4/flwSeh98mIbmVpET7khBU20qw+4GEbda1ndZyaTpLDLWOtnSchdZVj4pxw8fPuzPLOD2SCSylxvpr9u3C1GDylkClAM73xrrsnfiu4JErMCAqAIW0Nj8DsiWktBnGXJdr24QiURCTuXm5n4MnmZWmQm1EydOPMITg4ODom/VEiHKsGgOyQ14sSQvJhF2j8eoYhXGvPzGmqF7K0V3d7ckQ5XhHHkbeAyoNU9ODpqmvEp0dHSIQEOVsRhWjGSTuOq4OQJOMpQEWXS+RxzYs0cgGSUhCvgO7L+Jg6DKqLyHOGpra0tYgAV9Pp/oX1wnBLunXlnrgVXYfEAzEMzCmFsRLSIpG6opFa27d4twOCzJWlpa2Lr3lTsXAiUmIRcAN1z6Awuy7zs7O8WxjRtFvDDH2JhJG4ClCo1AtUGq59tEz9q1UlGTrK2t7QL2/ATYKJsDUTUwQzZgVAKrSrI89K+dxcXFzbiJUR/K3cmTJ2nWwYNUcfQoeS+cJcdwQGZeIjuHAmV30KWGBjq/YgUtWLiQqquryWazUXt7u3/16tX7IIYbF50D+vjWwUXGJLQYlxZZDdx+v//zsrKyZtnX0ONwcAnWUygUQhtMSELeGK2HCgoKqKSkhNDZ5fj+/fvPNTU1teDvBQW/IuMWEx29g6rkYSv5zlfu8Xgae3p6fGKaD1z4N0i/xtqPALR/WgssAuawK1XNto7eaZSVVhVPl6ruM9Baiuvr6+fBzRUul2sWxPKQWA5Yqg0NDekIwfXe3t4h3EfZ10PAVWXRIMBj16VlRvFLj7smTiB1qArPxPnKcrdqpE5VG0lVEC6EYdUIgsp9ITXGc0mzaU26CGeQampTp7I4W8GlXK/R2MUxoTaOZMAk0jNv4VNe9RXpRGK7IrIrD2QS6mrzpCKfSDRK8q8AAwCF/L1ktjcKFAAAAABJRU5ErkJggg%3D%3D"/></a>\
					<div id="h3hideshowtitle">Rapidshare Links Checker UserJS Configuration</div>\
					<div id="h3hideshow1" class="h3hideshow">Select Sites to Check</div><div class="h3hideshowcontent">\
						<p id="specinfo">The following sites are checked in bulk, you <b>don\'t need to disable auto-download</b> if you are a premium member</p>\
						<div class="sites"><span id="Check_rapidshare_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_filefactory_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_fileserve_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_filejungle_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_megaupload_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_megarotic_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_megaporn_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_megavideo_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_netload_dot_in_links"></div></span> \
						<div class="sites"><span id="Check_hotfile_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_wupload_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_uploadstation_dot_com_links"></div></span> \
						<div class="sites"><span id="Check_uploading_dot_com_links"></div></span>\
						<br/><hr/>\
						<p id="specinfo">The following sites are not checked in bulk, you <b>need to disable auto-download</b> if you are a premium member otherwise the checked links <b style="padding: 1px 4px 3px; background: red none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: white; -moz-border-radius: 6px; border-radius: 6px;">will be downloaded in the background !!!</b></p>\
						<div class="sites"><span id="Check_2shared_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_badongo_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_bitroad_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_bitshare_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_depositfiles_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_cramit_dot_in_links"></div></span>\
						<div class="sites"><span id="Check_crocko_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_enigmashare_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_extabit_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_filepost_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_gigasize_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_duckload_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_filesend_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_files_dot_to_links"></div></span>\
						<div class="sites"><span id="Check_files_dot_mail_dot_ru_links"></div></span>\
						<div class="sites"><span id="Check_freakshare_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_freakshare_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_getthebit_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_gigapeta_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_good_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_jumbofiles_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_ifile_dot_it_links"></div></span>\
						<div class="sites"><span id="Check_imdb_dot_com_rate"></div></span>\
						<div class="sites"><span id="Check_keepfile_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_letitbit_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_link_dash_protector_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_load_dot_to_links"></div></span>\
						<div class="sites"><span id="Check_mediafire_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_megaftp_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_megashares_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_narod_dot_ru_links"></div></span>\
						<div class="sites"><span id="Check_oron_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_quickupload_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_rapidshare_dot_de_links"></div></span>\
						<div class="sites"><span id="Check_rayfile_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_sendspace_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_save_dot_am_links"></div></span>\
						<div class="sites"><span id="Check_sharingmatrix_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_share_dash_rapid_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_shareflare_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_sharejunky_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_solidfile_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_storage_dot_to_links"></div></span>\
						<div class="sites"><span id="Check_turbobit_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_turboshare_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_turboupload_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_up_dash_file_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_uploadbox_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_uploadcell_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_uploaded_dot_to_links"></div></span>\
						<div class="sites"><span id="Check_usaupload_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_veehd_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_vip_dash_file_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_yourfilehost_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_x7_dot_to_links"></div></span>\
						<div class="sites"><span id="Check_ziddu_dot_com_links"></div></span>\
						<div class="sites"><span id="Check_zshare_dot_net_links"></div></span>\
						<div class="sites"><span id="Check_addyour_dot_own_links"></div></span>\
					</div>\
					<div class="h3hideshow">Settings - Links Styling</div><div class="h3hideshowcontent">\
						<p><span id="No_live_links"></span> </p>\
						<p><span id="Keyboard_functions"></span> </p>\
						<p><span id="Convert_links_to_full_address_links"></span> </p>\
						<p><span id="Show_info_in_tooltip"></span> </p>\
						<p><span id="Destyling_google_cache"></span></p>\
						<p><span id="Show_black_background_in_dead_links"></span></p>\
						<p><span id="Show_line_through_in_dead_links"></span></p>\
						<p><span id="Display_page_stats"></span> </p>\
						<p><span id="Autocheck_links_on_page_load"></span> </p>\
						<p><span id="Remove_html_from_rapidshare_urls"></span></p>\
						<p><span id="Add_html_to_urls"></span></p>\
					</div>\
					<!--div class="h3hideshow">Rapidshare Links Database</div><div class="h3hideshowcontent">\
						<p> The rapidshare database (<a href="http://hosts.890m.com">http://hosts.890m.com</a>) is a part of this userscript,\
						the Rapidshare Links Checker userscript has the ability to sent only the urls of\
						the pages when all the rapidshare links are alive, no cookies or other private\
						informations are sent to the database, and you are able to erase the data you send.</p>\
						<p><span id="Send_the_urls_of_the_pages_you_are_checking_in_the_open_database"></p>\
					</div-->\
					<div class="h3hideshow">About</div><div class="h3hideshowcontent">\
						<p>'+fileMETA["name"] + ' version: ' + fileMETA["version"]+'</p>\
						<br />\
						<p>' + fileMETA["description"]+'</p>\
						<p>' + fileMETA["details"]+'</p>\
						<br />\
						<p>Author: <br/>' + fileMETA["author"]+'</p>\
						<p>Contributors: <br/>' + fileMETA["contributor"]+'</p>\
						<br />\
						<p>License: <br/>'+fileMETA["license"] + '</p>\
					</div>\
					<div class="h3hideshow">Help The Author</div><div class="h3hideshowcontent">\
						<p><hr/>Write a <a target="_blank" href="http://userscripts.org/scripts/reviews/9467">review</a>\
						<br><hr/><a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6790067">Donate through PayPal\
						<br><img src="https://www.paypal.com/en_US/i/logo/paypal_logo.gif"/></a>\
						<br><hr/><a href="http://www.wupload.com/referral/premium/310413" target="_blank">Get a <b>wupload.com</b> premium account with this link <img src="http://www.wupload.com/images/banners/banner_468x60_1.gif" width="468" height="60" border="0" alt="Wupload, ultimate file hosting." /></a>\
						<br><hr/><a href="http://www.fileserve.com/signup.php?reff=vtv-MxJCaMU~" target="_blank">Get a <b>fileserve.com</b> premium account with this link <img src="http://www.fileserve.com/images/banner_468x60_A.jpg" border="0" alt="FileServe"/></a>\
					</div>\
				</div>\
			</div>\
		';
		var divhideshow = document.createElement("div");
		divhideshow.id = "hideshow";
		divhideshow.setAttribute('style', 'visibility: visible;');
		divhideshow.innerHTML = configurationinnerHTML;
		document.body.appendChild(divhideshow);
		var imgClose=document.getElementById("imghideshow");
		imgClose.addEventListener("click", closeConfigurationBox, false);
		
		function closeallothersmallconfigs(evt)
		{
			var notthisone = evt.target || evt.srcElement;
			for (var i=0;i<document.getElementsByTagName('div').length;i++)
			{
				if (document.getElementsByTagName('div')[i].className == 'h3hideshow')
				{
					if (notthisone == document.getElementsByTagName('div')[i])
						;
					else
					{
						document.getElementsByTagName('div')[i].nextSibling.style.display = "none";
						document.getElementsByTagName('div')[i].addEventListener("click", opensmallconfigs, false);	
					}
				}
			}		
		}
 function closesmallconfigs(e)
		{
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			target.removeEventListener("click", closesmallconfigs, false);
			target.nextSibling.style.display = "none";
			target.addEventListener("click", opensmallconfigs, false);
		}
 function opensmallconfigs(e)
		{
			var evt = e || window.event;
			var target = evt.target || evt.srcElement;
			target.removeEventListener("click", opensmallconfigs, false);
			target.nextSibling.style.display = "block";
			closeallothersmallconfigs(evt);
			target.addEventListener("click", closesmallconfigs, false);
		}
		function changeConfiguration(e)
		{
			if (e.target.tagName == 'INPUT')
			{
				if(eval(e.target.id)){
					GM_setValue(e.target.id, false);
					var result= 'disabled';
				}else{
					GM_setValue(e.target.id, true);
					var result= 'enabled';
				}
				set_variables();
			}
		}
		var existingobject = divhideshow.getElementsByTagName("span");
		
		for (var i = existingobject.length - 1; i >= 0; i--)
		{
			if (eval(existingobject[i].id)){
				var addition = "checked='checked'";
			}else{
				var addition = "";
			};
			existingobject[i].innerHTML = "<input type='checkbox' class='checkboxconfig' "+addition+"' name='"+existingobject[i].id+"' id='"+existingobject[i].id+"'/>"+existingobject[i].id.replace(/__/g,' ').replace(/_/g,' ');
			existingobject[i].innerHTML = existingobject[i].innerHTML.replace(/Remove html /,'Remove .html ').replace(/ dot /g,'.').replace(/ dash /g,'-').replace(/(Check .*?) links$/g,'$1').replace(/Add html /,'Add .html ');
			
			document.getElementById(existingobject[i].id).addEventListener("click", changeConfiguration, false);
		}
 document.getElementById('Keyboard_functions').innerHTML +='<br/>'+first_key_keycodename+'+'+String.fromCharCode(configuration_keycode)+'=Configuration <br/>'+first_key_keycodename+'+'+String.fromCharCode(makeTheCheckedLinksToFullURl_keycode)+'=Convert links to full address links <br/>'+first_key_keycodename+'+'+String.fromCharCode(check_all_links_keycode)+'=Check all the links (for ajax sites)';
		for (var i=0;i<document.getElementsByTagName('div').length;i++)
		{
			if (document.getElementsByTagName('div')[i].className == 'h3hideshow'){
				var h3hideshowelement = document.getElementsByTagName('div')[i];
				h3hideshowelement.addEventListener("click", opensmallconfigs, false);
			}
		}
		var fake_event = new Object();
		fake_event.target = document.getElementById('h3hideshow1');
		opensmallconfigs(fake_event);
	}
	function makeTheCheckedLinksToFullURl()
	{
		var alive_links = document.getElementsByTagName('a');	
		for (var i = 0; i < alive_links.length; i++)
		{
			if (alive_links[i].id == 'alive_link')
			{
				alive_links[i].innerHTML = alive_links[i].href; 
			}
		}
	}
	function SearchEngine()
	{
		searchengine = 'http://torrentproject.com/userscripts/rapidshare_links_checker_new/search/';		
		if (getSelText()!=""){
			what_to_search = encodeURIComponent(getSelText());
			GM_openInTab(searchengine+'?search='+what_to_search);		
			}else{
			GM_openInTab(searchengine);		
			}
	}
	function getSelText()
	{
		var txt = '';
		 if (window.getSelection){
			txt = window.getSelection();
			}
		else if (document.getSelection){
			txt = document.getSelection();
				}
		else if (document.selection){
			txt = document.selection.createRange().text;
			}		
		return txt;
	}
	
	function start()
	{
		
		Show_info_in_tooltip = GM_getValue("Show_info_in_tooltip", false);
		No_live_links = GM_getValue("No_live_links", false);
		Add_html_to_urls = GM_getValue("Add_html_to_urls", false);
		Keyboard_functions = GM_getValue("Keyboard_functions", true);
		Convert_links_to_full_address_links = GM_getValue("Convert_links_to_full_address_links", false);
		var http_file_hosts = new Array();
		var replace_co_cc_vault_links = '0';
		if(Check_addyour_dot_own_links){ 
		var addyour_own= new Array(6)
		 addyour_own[0]='(?:www.|)nameofthesite\.com\/'; 
		 addyour_own[1]='replace this with text that exists in the page if the file is alive'; 
		 addyour_own[2]='replace this with text that exists in the page if the file is dead'; 
		 addyour_own[3]='optional replace this with text that exists in the server has no download slots or the file temporarily unavailable or server error'; 
		 addyour_own[4]="//a[contains(@href,'nameofthesite.com')]";
		 addyour_own[5]='optional--'; 
		 addyour_own[6]=' (\\d.*?)'; 
		 http_file_hosts.push(addyour_own);
		}	
		if(Check_jumbofiles_dot_com_links){ 
		var jumbofiles_com= new Array(6)
		 jumbofiles_com[0]='(?:www.|)jumbofiles\.com\/(?:\w*)'; 
		 jumbofiles_com[1]='<small>'; 
		 jumbofiles_com[2]='<TD>&nbsp;<\/TD>'; 
		 jumbofiles_com[3]='optional--'; 
		 jumbofiles_com[4]="//a[contains(@href,'jumbofiles.com/')]";
		 jumbofiles_com[5]='optional--'; 
		 jumbofiles_com[6]='&nbsp; <small>\\((\\d.*?)\\)</small>'; 
		 http_file_hosts.push(jumbofiles_com);
		}			
		if(Check_load_dot_to_links){ 
		var load_to= new Array(6)
		 load_to[0]='(?:www.|)load\.to\/'; 
		 load_to[1]='"download_table_left">Size'; 
		 load_to[2]='Can\'t find file'; 
		 load_to[3]='optional--'; 
		 load_to[4]="//a[contains(@href,'load.to')]";
		 load_to[5]='optional--'; 
		 load_to[6]='<div class="download_table_right">(\\d.*?)</div>'; 
		 http_file_hosts.push(load_to);
		}		
		if(Check_crocko_dot_com_links){
		var crocko_com= new Array(6) 
		 crocko_com[0]="(?:w..\.|)crocko.com"; 
		 crocko_com[1]='Download: '; 
		 crocko_com[2]='(File not found|file is deleted)|(Sorry,)'; 
		 crocko_com[3]='optional--'; 
		 crocko_com[4]="//a[contains(@href,'crocko.com/')]"; 
		 crocko_com[5]='Download:(?: ){2,}<strong>(.*?)</strong>';
		 crocko_com[6]='<span class="inner">(\\d.*?)</span>';
		http_file_hosts.push(crocko_com);
		}
		if(Check_mediafire_dot_com_links){
		var mediafire_com= new Array(6) 
		 mediafire_com[0]="(?:www.|)mediafire.com/(?:download.php|file\/|\\?)"; 
		 mediafire_com[1]='(?:Authentication Required)|(?:Authorize Download)|(?:Download)'; 
		 mediafire_com[2]='(?:no longer stored)|(?:Invalid or Deleted File)'; 
		 mediafire_com[3]='optional--'; 
		 mediafire_com[4]="//a[contains(@href,'www.mediafire.com/')]"; 
		
		
		 mediafire_com[5]="oFileSharePopup\\.ald\\('.*?','(.*?)','"; 
		 mediafire_com[6]="','(\\d.*?)','',";
		http_file_hosts.push(mediafire_com);
		}
		if(Check_files_dot_to_links){
		var files_to= new Array(6)
		 files_to[0]="(?:www\.|)files\.to\/get\/(\\d*)\/";
		 files_to[1]='You requested the following'; 
		 files_to[2]='requested file couldn'; 
		 files_to[3]='optional--';
		 files_to[4]="//a[contains(@href,'files.to/')]"; 
		 files_to[5]='optional--';
		 files_to[6]='<p>Size: (\\d.*?)</p>';
		 http_file_hosts.push(files_to);
		}		
		if(Check_freakshare_dot_net_links){
		var freakshare_net= new Array(6)
		 freakshare_net[0]="(?:www\.|)freakshare\.net\/files\/";
		 freakshare_net[1]='box_heading'; 
		 freakshare_net[2]='<div class="box" style'; 
		 freakshare_net[3]='optional--';
		 freakshare_net[4]="//a[contains(@href,'freakshare.net/') and contains(@href,'files')]"; 
		 freakshare_net[5]='box_heading" style="text-align:center;">(.*?) - '; 
		 freakshare_net[6]=' - (\\d.*?)<\/h1>';
		 http_file_hosts.push(freakshare_net);
		}		
		if(Check_freakshare_dot_com_links){
		var freakshare_net= new Array(6)
		 freakshare_net[0]="(?:www\.|)freakshare\.com\/files\/";
		 freakshare_net[1]='box_heading'; 
		 freakshare_net[2]='<div class="box" style'; 
		 freakshare_net[3]='optional--';
		 freakshare_net[4]="//a[contains(@href,'freakshare.com/') and contains(@href,'files')]"; 
		 freakshare_net[5]='box_heading" style="text-align:center;">(.*?) - '; 
		 freakshare_net[6]=' - (\\d.*?)<\/h1>';
		 http_file_hosts.push(freakshare_net);
		}	
		if(Check_files_dot_mail_dot_ru_links){ 
		var files_mail_ru= new Array(6) 
											
		 files_mail_ru[0]='(?:files.|)mail\.ru/(?:\\w*)'; 
		 files_mail_ru[1]='fileList'; 
		 files_mail_ru[2]='errorMessage'; 
		 files_mail_ru[3]='optional--'; 
		 files_mail_ru[4]="//a[contains(@href,'files.mail.ru')]"; 
		 files_mail_ru[5]='optional--';
		 files_mail_ru[6]='<td>(\\d.*?)</td>';
		 http_file_hosts.push(files_mail_ru);
		}	
		if(Check_megashares_dot_com_links){
		var megashares_com= new Array(6)
		 megashares_com[0]="(?:www\.|d\\d\\d\.|)megashares\.com/(?:dl|\\?d)";
		 megashares_com[1]='Filesize'; 
		 megashares_com[2]='(?:Could not download file)|(?:Invalid link)|(?:Link is invalid)'; 
		 megashares_com[3]='optional--';
		 megashares_com[4]="//a[contains(@href,'megashares.com/')]"; 
		 megashares_com[5]='optional--';
		 megashares_com[6]='Filesize:<\/span><\/strong> (.*?)<br \/>';
		 http_file_hosts.push(megashares_com);
		}
		if(Check_narod_dot_ru_links){ 
		var narod_ru= new Array(6) 
		 narod_ru[0]='narod\.ru\/disk\/'; 
		 narod_ru[1]='b-submit'; 
		 narod_ru[2]='b-download-virus-note'; 
		 narod_ru[3]='Внутренняя ошибка сервиса'; 
		 narod_ru[4]="//a[contains(@href,'narod.ru')]"; 
		 narod_ru[5]='optional--';
		 narod_ru[6]='<dd class="size">(\\d.*?)</dd>';
		 http_file_hosts.push(narod_ru);
		}	
		if(Check_rapidshare_dot_de_links){ 
		var rapidshare_de= new Array(6)
		 rapidshare_de[0]="rapidshare.de\/files";
		 rapidshare_de[1]='Choose download-type'; 
		 rapidshare_de[2]='ERROR'; 
		 rapidshare_de[3]='optional--';
		 rapidshare_de[4]="//a[contains(@href,'rapidshare.de/files/')]"; 
		 rapidshare_de[5]='optional--';
		 rapidshare_de[6]='</strong> \((.*?)\)</h1>';
		 http_file_hosts.push(rapidshare_de);
		}
		if(Check_rayfile_dot_com_links){
		var rayfile_com= new Array(6)
		 rayfile_com[0]="rayfile.com\/";
		 rayfile_com[1]='FILEtitleTXT'; 
		 rayfile_com[2]='blueRow'; 
		 rayfile_com[3]='optional--';
		 rayfile_com[4]="//a[contains(@href,'rayfile.com/') and contains(@href,'files')]"; 
		 rayfile_com[5]='optional--';
		 rayfile_com[6]='nD_fileinfo2.*?ndFileinfo_list.*?&nbsp;(\\d.*?)<\/div>';
		 http_file_hosts.push(rayfile_com);
		}		
		if(Check_yourfilehost_dot_com_links){ 
		var yourfilehost_com= new Array(6)
		 yourfilehost_com[0]='(?:www.|)yourfilehost\.com\/media\.php(?:.*?)cat=(?:.*?)&file=(?:.*?\.\w*)';
		 yourfilehost_com[1]='(Uploaded .y:)|(15 QUALITY SITES)'; 
		 yourfilehost_com[2]='Error: File not found!'; 
		 yourfilehost_com[3]='optional--'; 
		 yourfilehost_com[4]="//a[contains(@href,'yourfilehost.com') and contains(@href,'cat') and contains(@href,'file')]"; 
		 yourfilehost_com[5]='optional--';
		 yourfilehost_com[6]='</strong> \((.*?)\)</h1>';
		 http_file_hosts.push(yourfilehost_com);
		}
		if(Check_usaupload_dot_net_links){ 
		var usaupload_net= new Array(6)
		 usaupload_net[0]='(?:www.|)usaupload\.net\/d\/(?:\w*)';
		 usaupload_net[1]='<strong>File size:</strong>'; 
		 usaupload_net[2]='(?:is not available)|(?:404)'; 
		 usaupload_net[3]='optional--'; 
		 usaupload_net[4]="//a[contains(@href,'usaupload.net/d/')]"; 
		 usaupload_net[5]='optional--';
		 usaupload_net[6]='<strong>File size:</strong> (\\d.*?)<br />';
		 http_file_hosts.push(usaupload_net);
		}
		if(Check_sendspace_dot_com_links){ 
		var sendspace_com= new Array(6)
		 sendspace_com[0]='(?:www.|)sendspace\.com\/file\/(?:\w*)';
		 sendspace_com[1]='<b>Size:'; 
		 sendspace_com[2]='the file you requested is not available.'; 
		 sendspace_com[3]='optional--'; 
		 sendspace_com[4]="//a[contains(@href,'sendspace.com') and contains(@href,'file')]"; 
		 sendspace_com[5]='optional--';
		 sendspace_com[6]='<b>Size:</b> (\\d.*?) 	 <br>';
		 http_file_hosts.push(sendspace_com);
		}
		if(Check_save_dot_am_links){ 
		var save_am= new Array(6)
		 save_am[0]='(?:www.|)save\.am\/files\/(?:\w*)';
		 save_am[1]='Download file'; 
		 save_am[2]='Error.'; 
		 save_am[3]='optional--'; 
		 save_am[4]="//a[contains(@href,'save.am') and contains(@href,'files')]"; 
		 save_am[5]='optional--';
		 save_am[6]='Download file .*?\((\\d.*?)\)<\/h1>';
		 http_file_hosts.push(save_am);
		}
		if(Check_duckload_dot_com_links){ 
		var duckload_com= new Array(6) 
		 duckload_com[0]='(|www\.)duckload\.com\/d';
		 duckload_com[1]='Choose your Download Type'; 
		 duckload_com[2]='alert_box'; 
		 duckload_com[3]='optional--'; 
		 duckload_com[4]="//a[contains(@href,'duckload.com')]"; 
		 duckload_com[5]='optional--';
		 duckload_com[6]=' \\((\d.*?)\\) Down';
		 http_file_hosts.push(duckload_com);
		}
		if(Check_filepost_dot_com_links){ 
		var filepost_com= new Array(6)
		 filepost_com[0]='(?:www.|)filepost\.com';
		 filepost_com[1]='Size:'; 
		 filepost_com[2]='(No such file)|(File not found)'; 
		 filepost_com[3]='optional--'; 
		 filepost_com[4]="//a[contains(@href,'filepost.com')]"; 
		 filepost_com[5]='<h1>(.*?)<\/h1>';
		 filepost_com[6]='Size:</span> (\\d.*?)<';
		 http_file_hosts.push(filepost_com);
		}				
		if(Check_gigasize_dot_com_links){ 
		var gigasize_com= new Array(6)
		 gigasize_com[0]='(?:www.|)gigasize\.com';
		 gigasize_com[1]='download_button'; 
		 gigasize_com[2]='(downloadError)|(Download error)'; 
		 gigasize_com[3]='optional--'; 
		 gigasize_com[4]="//a[contains(@href,'gigasize.com')]"; 
		 gigasize_com[5]='<h1>(.*?)<\/h1>';
		 gigasize_com[6]='<p>Size: <span>(\\d.*?)<'; 
		 http_file_hosts.push(gigasize_com);
		}			 
		if(Check_bitshare_dot_com_links){ 
		var bitshare_com= new Array(6) 
		 bitshare_com[0]='bitshare\.com\/.*?'; 
		 bitshare_com[1]='select your download type'; 
		 bitshare_com[2]='We are sorry'; 
		 bitshare_com[3]='optional--'; 
		 bitshare_com[4]="//a[contains(@href,'bitshare.com')]"; 
		 bitshare_com[5]='<title>Download (.*?) - BitShare.com';
		 bitshare_com[6]=' - (\\d.*?)</h1>';
		 http_file_hosts.push(bitshare_com);
		}				 
		if(Check_cramit_dot_in_links){ 
		var cramit_in= new Array(6) 
		 cramit_in[0]='cramit\.in\/(?:.*?)'; 
		 cramit_in[1]='Download File'; 
		 cramit_in[2]='File Not Found'; 
		 cramit_in[3]='optional--'; 
		 cramit_in[4]="//a[contains(@href,'cramit.in')]"; 
		 cramit_in[5]='optional--';
		 cramit_in[6]='</font></a> \\((\\d.*?)\\)</font>';
		 http_file_hosts.push(cramit_in);
		}		 
		if(Check_bitroad_dot_net_links){ 
		var bitroad_net= new Array(6) 
		 bitroad_net[0]='bitroad\.net\/download\/(?:.*?)/(?:.*?)\.html'; 
		 bitroad_net[1]='btn_2'; 
		 bitroad_net[2]='not found'; 
		 bitroad_net[3]='optional--'; 
		 bitroad_net[4]="//a[contains(@href,'bitroad.net') and contains(@href,'download')]"; 
		 bitroad_net[5]='hidden" name="name" value="(.*?)"';
		 bitroad_net[6]=' \\[ (\\d.*?) \\]</h1>';
		 http_file_hosts.push(bitroad_net);
		}		 
		if(Check_depositfiles_dot_com_links){ 
		var depositfiles_com= new Array(6) 
		 depositfiles_com[0]='depositfiles\.com\/(?:\\w\\w\/|)files\/\\w+';
		 depositfiles_com[1]='file=abuse_copyr&'; 
		 depositfiles_com[2]='Such file does not exist'; 
		 depositfiles_com[3]='dsdlhkhsgdsgdhskjhgd'; 
		 depositfiles_com[4]="//a[contains(@href,'depositfiles') and contains(@href,'files')]";
		 depositfiles_com[5]='name: <b title="(.*?)">';
		 depositfiles_com[6]=': <b>(\\d.*?)</b>';
		 http_file_hosts.push(depositfiles_com);
		}
		if(Check_oron_dot_com_links){ 
		var oron_com= new Array(6)
		 oron_com[0]='(?:www.|)oron\.com\/';
		
		 oron_com[1]='f_arial f_14px';
		
		 oron_com[2]='<center>';
		 oron_com[3]='XXX page is temporarily unavailable'; 
		 oron_com[4]="//a[contains(@href,'oron.com')]"; 
		 oron_com[5]='fname" value="(.*?)"';
		 oron_com[6]=': (\\d.*?)<br>';
		 http_file_hosts.push(oron_com);
		}
		if(Check_quickupload_dot_net_links){ 
		var quickupload_net= new Array(6)
										 
		 quickupload_net[0]='(?:www.|)quickupload\.net\/';
		 quickupload_net[1]='You have requested'; 
		 quickupload_net[2]='File Not Found'; 
		 quickupload_net[3]='optional--'; 
		 quickupload_net[4]="//a[contains(@href,'quickupload.net')]"; 
		 quickupload_net[5]='optional--';
		 quickupload_net[6]='</font> \\((\\d.*?)\\)</font>';
		 http_file_hosts.push(quickupload_net);
		}		
		if(Check_good_dot_com_links){ 
		var good_com= new Array(6)
		 good_com[0]='(?:www.|)good\.net\/(?:_|dl)';
		 good_com[1]='Free Download'; 
		 good_com[2]='Not Found'; 
		 good_com[3]='Forbidden'; 
		 good_com[4]="//a[contains(@href,'good.net')]"; 
		 good_com[5]='optional--';
		 good_com[6]='<span id="humansize">(\\d.*?)</span>';
		 http_file_hosts.push(good_com);
		}
		if(Check_2shared_dot_com_links){ 
		var twoshared_com= new Array(6)
		 twoshared_com[0]='(?:www.|)2shared\.com\/(?:(?:file)|(?:video))\/(?:\w*)';
		 twoshared_com[1]='File size'; 
		 twoshared_com[2]='(File not found)|(is not valid)'; 
		 twoshared_com[3]='optional--'; 
		 twoshared_com[4]="//a[contains(@href,'2shared.com/file/') or contains (@href,'2shared.com/video/')]"; 		 
		 twoshared_com[5]='optional--'; 
		 twoshared_com[6]=' (\\d.*?) &nbsp; &nbsp;';
		 http_file_hosts.push(twoshared_com);
		}	
		if(Check_uploadcell_dot_com_links){ 
		var uploadcell_com= new Array(6)
		 uploadcell_com[0]='(?:www.|)uploadcell\.com\/(?:\\w*)';
		 uploadcell_com[1]='You have requested'; 
		 uploadcell_com[2]='File Not Found'; 
		 uploadcell_com[3]='optional--'; 
		 uploadcell_com[4]="//a[contains(@href,'uploadcell.com/')]"; 
		 uploadcell_com[5]='optional--'; 
		 uploadcell_com[6]='</font> \\((\\d.*?)\\)</font>';
		 http_file_hosts.push(uploadcell_com);
		}		
		if(Check_ziddu_dot_com_links){ 
		var ziddu_com= new Array(6)
		 ziddu_com[0]='(?:www.|)ziddu\.com\/download\/(?:\\d*)\/(?:\\w*)';
		 ziddu_com[1]='(?:File Size|fichier)'; 
		 ziddu_com[2]='(?:errortracking)|(?:may be deleted)'; 
		 ziddu_com[3]='optional--'; 
		 ziddu_com[4]="//a[contains(@href,'ziddu.com/download/')]"; 
		 ziddu_com[5]='optional--'; 
		 ziddu_com[6]=' <td height=.*?<span class=".*?">(\\d.*?) </span></td>';
		 http_file_hosts.push(ziddu_com);
		}			
		if(Check_turboupload_dot_com_links){ 
		var turboupload_com= new Array(6) 
		 turboupload_com[0]='(?:www.|)turboupload\.com\/(?:\\w*)';
		 turboupload_com[1]='You have requested'; 
		 turboupload_com[2]='File Not Found'; 
		 turboupload_com[3]='optional--'; 
		 turboupload_com[4]="//a[contains(@href,'turboupload.com')]"; 
		 turboupload_com[5]='optional--'; 
		 turboupload_com[6]='</font> \\((\\d.*?)\\)</font>';
		 http_file_hosts.push(turboupload_com);
		}		
		if(Check_badongo_dot_com_links){ 
		var badongo_com= new Array(6)
		 badongo_com[0]='(?:www.|)badongo\.com\/(?:vid|cfile|file)\/(?:\w*)';
		 badongo_com[1]='Direct Link'; 
		 badongo_com[2]='(?:File not found|been deleted|Been Deactivated|been removed)'; 
		 badongo_com[3]='temporary unavailable'; 
		 badongo_com[4]="//a[contains(@href,'badongo.com')]"; 
		 badongo_com[5]='optional--'; 
		 badongo_com[6]='Filesize : (\\d.*?)</div>';
		 http_file_hosts.push(badongo_com);
		}
		if(Check_sharingmatrix_dot_com_links){ 
		var sharingmatrix_com= new Array(6)
		 sharingmatrix_com[0]='(?:www.|)sharingmatrix\.com\/file\/'; 
		 sharingmatrix_com[1]='File Download'; 
		 sharingmatrix_com[2]='(Error\.)|(File not found)|(has been deleted)'; 
		 sharingmatrix_com[3]='optional--'; 
		 sharingmatrix_com[4]="//a[contains(@href,'sharingmatrix.com') and contains(@href,'file')]"; 
		 sharingmatrix_com[5]='optional--'; 
		 sharingmatrix_com[6]='<span class="size">(\\d.*?)</span>';
		
		 http_file_hosts.push(sharingmatrix_com);
		}
		if(Check_uploadbox_dot_com_links){ 
		var uploadbox_com= new Array(6)
		 uploadbox_com[0]='uploadbox.com/(?:.{1,3}\/|)files/(?:\w*)'; 
		 uploadbox_com[1]='Free Download'; 
		 uploadbox_com[2]='(not_found)|(File deleted from service)'; 
		 uploadbox_com[3]='optional--'; 
		 uploadbox_com[4]="//a[contains(@href,'uploadbox.com') and contains(@href,'files')]"; 
		 uploadbox_com[5]='optional--'; 
		 uploadbox_com[6]='Size:<\/span> (\\d.*?) <span>';
		 http_file_hosts.push(uploadbox_com);
		}
		if(Check_up_dash_file_dot_com_links){ 
		var up_dash_file_com= new Array(6)
		 up_dash_file_com[0]='up-file.com/download/(?:\w*)'; 
		 up_dash_file_com[1]='Download the file'; 
		 up_dash_file_com[2]='is not found'; 
		 up_dash_file_com[3]='optional--'; 
		 up_dash_file_com[4]="//a[contains(@href,'up-file.com') and contains(@href,'download')]"; 
		 up_dash_file_com[5]='optional--'; 
		 up_dash_file_com[6]='size::</span> (.*?)</h1>';
		 http_file_hosts.push(up_dash_file_com);
		}
		
		if(Check_share_dash_rapid_dot_com_links){ 
		var share_dash_rapid_com= new Array(6)
		 share_dash_rapid_com[0]='share-rapid.com/stahuj/(?:\w*)'; 
		 share_dash_rapid_com[1]='Velikost'; 
		 share_dash_rapid_com[2]='Not Found'; 
		 share_dash_rapid_com[3]='optional--'; 
		 share_dash_rapid_com[4]="//a[contains(@href,'share-rapid.com')]"; 
		 share_dash_rapid_com[5]='optional--'; 
		 share_dash_rapid_com[6]='	(\\d.*?)</strong></td>';
		 http_file_hosts.push(share_dash_rapid_com);
		}
		if(Check_gigapeta_dot_com_links){ 
		var gigapeta_com= new Array(6)
		 gigapeta_com[0]='(?:www.|)gigapeta.com/dl/'; 
		 gigapeta_com[1]='(Размер|Download file)'; 
		 gigapeta_com[2]='(404|удален|has been deleted)'; 
		 gigapeta_com[3]='optional--'; 
		 gigapeta_com[4]="//a[contains(@href,'gigapeta.com') and contains(@href,'dl')]"; 
		 gigapeta_com[5]='>--> (.*)\\n'; 
		 gigapeta_com[6]='(\\d.*? \\S{2}) \\W*<\/td>';
		 http_file_hosts.push(gigapeta_com);
		}				
		if(Check_getthebit_dot_com_links){ 
		var getthebit_com= new Array(6)
		 getthebit_com[0]='(?:www.|)getthebit.com/f/(?:\w*)'; 
		 getthebit_com[1]='Вы выбрали файл'; 
		 getthebit_com[2]='не найден'; 
		 getthebit_com[3]='optional--'; 
		 getthebit_com[4]="//a[contains(@href,'getthebit.com')]"; 
		 getthebit_com[5]='optional--'; 
		 getthebit_com[6]='&nbsp;\\(<b>(.*?)</b>\\)';
		 http_file_hosts.push(getthebit_com);
		}
				
		if(Check_veehd_dot_com_links){
		var veehd_com= new Array(6)
		 veehd_com[0]='veehd\.com\/video\/(?:.*?)'; 
		 veehd_com[1]='(No sound)|(Download video)';
		 veehd_com[2]='Featured Videos';
		 veehd_com[3]='optional--'; 
		 veehd_com[4]="//a[contains(@href,'veehd.com') and contains(@href,'video')]"; 
		 veehd_com[5]='optional--'; 
		 veehd_com[6]='Size of file: <span>(\\d.*?)</span>';
		 http_file_hosts.push(veehd_com);
		}
				
		if(Check_vip_dash_file_dot_com_links){
		var vip_file_com= new Array(6)
		
		 vip_file_com[0]='vip-file\.com\/download.*?\/(?:.*?)/(?:.*?)\.html'; 
		
		 vip_file_com[1]='File:';
		
		 vip_file_com[2]='File not found';
		 vip_file_com[3]='optional--'; 
		 vip_file_com[4]="//a[contains(@href,'vip-file.com') and contains(@href,'download')]"; 
		 vip_file_com[5]='<span>(\\d.*?)</span>'; 
		
		 vip_file_com[6]=' .<span>(\\d.*?)</span>\]';
		 http_file_hosts.push(vip_file_com);
		}
		if(Check_keepfile_dot_com_links){
		var keepfile_com= new Array(6)
		 keepfile_com[0]='(?:www.|)keepfile\.com\/'; 
		 keepfile_com[1]='Download File'; 
		 keepfile_com[2]='No such file'; 
		 keepfile_com[3]='optional--'; 
		 keepfile_com[4]="//a[contains(@href,'keepfile.com')]"; 
		 keepfile_com[5]='fname" value="(.*?)"'; 
		 keepfile_com[6]='\\((\\d.*?)\\)';
		 http_file_hosts.push(keepfile_com);
		}
		if(Check_letitbit_dot_net_links){
		var letitbit_net= new Array(6)
		 letitbit_net[0]='letitbit\.net\/download\/'; 
		 letitbit_net[1]='File:'; 
		 letitbit_net[2]='(?:style7)|(?:404)'; 
		 letitbit_net[3]='optional--'; 
		 letitbit_net[4]="//a[contains(@href,'letitbit.net') and contains(@href,'download')]"; 
		 letitbit_net[5]='File: <span>(.*?)</span>'; 
		 letitbit_net[6]='<span>(\\d.*?)</span>';
		 http_file_hosts.push(letitbit_net);
		}
		if(Check_x7_dot_to_links){ 
		var x7_to= new Array(6)
		 x7_to[0]='(?:www.|)x7\.to\/(?:\w*)'; 
		 x7_to[1]='content="Download: '; 
		 x7_to[2]='File not found'; 
		 x7_to[3]='optional--'; 
		 x7_to[4]="//a[contains(@href,'x7.to/')]"; 
		 x7_to[5]='optional--'; 
		 x7_to[6]='Download.*? \\((\\d*.*?)\\) at x7.to Filehosting.';
		 http_file_hosts.push(x7_to);
		}			
		if(Check_zshare_dot_net_links){ 
		var zshare_net= new Array(6)
		 zshare_net[0]='(?:www.|)zshare\.net\/(?:(?:download)|(?:video)|(?:audio))\/(?:\w*)'; 
		 zshare_net[1]='(/images/download.gif)|(?:Video Size)'; 
		 zshare_net[2]='404'; 
		 zshare_net[3]='optional--'; 
		
		
		 zshare_net[4]="//a[contains(@href,'zshare.net/')]"; 
		 zshare_net[5]='(?:align="left">(.*?)<\/font>)|(?:Description. <font color=..666666.>(.*?)<\/font>)'; 
		 zshare_net[6]='(?:Size: <font color="#666666">(\\d.*?)</font></td>)|(?:Video Size: <font color="#666666">(\\d.*?)<\/font>)';
		 http_file_hosts.push(zshare_net);
		}				
		 
		if(Check_uploaded_dot_to_links){ 
		var uploaded_to= new Array(6)
									 
		 uploaded_to[0]='(?:uploaded\.to\/(?:.id|file))|(?:ul\.to\/)'; 
		 uploaded_to[1]='(?:"inputActive")|(?:Download file)'; 
		 uploaded_to[2]='(?:"box_red")|(?:Page not found)'; 
		 uploaded_to[3]='optional--'; 
		 uploaded_to[4]="//a[contains(@href,'uploaded.to/') or contains(@href,'ul.to/')]"; 
		 uploaded_to[5]='<title>(.*?)\\('; 
		 uploaded_to[6]=':11px;">(\\d*.*?)</small>';
		 http_file_hosts.push(uploaded_to);
		}
		
		if(Check_filesend_dot_net_links){
		var filesend_net= new Array(6) 
		 filesend_net[0]='(?:www.|)filesend\.net\/download'; 
		 filesend_net[1]='buttdl'; 
		 filesend_net[2]='File removed'; 
		 filesend_net[3]='Error'; 
		 filesend_net[4]="//a[contains(@href,'filesend.net') and contains(@href,'download') and contains(@href,'f=')]"; 
		 filesend_net[5]='optional--'; 
		 filesend_net[6]='File Size:</strong>\\n\\n(\\d*.*?)\\n</td></tr>';
		 http_file_hosts.push(filesend_net);
		}		
		if(Check_enigmashare_dot_com_links){
		var enigmashare_com= new Array(6) 
		 enigmashare_com[0]='(?:www.|)enigmashare\.com\/\w*'; 
		 enigmashare_com[1]='tbl12'; 
		 enigmashare_com[2]='width:500px;text-align:left'; 
		 enigmashare_com[3]='optional--'; 
		 enigmashare_com[4]="//a[contains(@href,'enigmashare.com/')]"; 
		 enigmashare_com[5]='optional--'; 
		 enigmashare_com[6]='</font> \\((\\d*.*?)\\)<\/font>';
		 http_file_hosts.push(enigmashare_com);
		}
				
		if(Check_extabit_dot_com_links){
		var extabit_com= new Array(6)
		 extabit_com[0]='(?:www.|)extabit\.com\/file'; 
		 extabit_com[1]='Download file'; 
		 extabit_com[2]='File not found'; 
		 extabit_com[3]='optional--'; 
		 extabit_com[4]="//a[contains(@href,'extabit.com/file')]"; 
		 extabit_com[5]='<title>(.*?) download Extabit.com'; 
		 extabit_com[6]='<td class="col-fileinfo">(\\d*.*?)<';
		 http_file_hosts.push(extabit_com);
		}
		
		if(Check_ifile_dot_it_links){
		var ifile_it= new Array(6) 
		 ifile_it[0]='ifile\.it\/'; 
		 ifile_it[1]='(Request Download Ticket)|(in order to download)'; 
		 ifile_it[2]='(file removed)|(file expired)|(no such file)|(page not found)'; 
		 ifile_it[3]='optional--'; 
		 ifile_it[4]="//a[contains(@href,'ifile.it')]"; 
		 ifile_it[5]='optional--'; 
		 ifile_it[6]='&nbsp;\\n\\t\\t(\\d.*?)	</span>';
		 http_file_hosts.push(ifile_it);
		}
		if(Check_solidfile_dot_com_links){		
		var solidfile_com= new Array(6)
		 solidfile_com[0]='(|www\.)solidfile\.com\/'; 
		 solidfile_com[1]='Download File'; 
		 solidfile_com[2]='No such file'; 
		 solidfile_com[3]='optional--'; 
		 solidfile_com[4]="//a[contains(@href,'solidfile.com')]"; 
		 solidfile_com[5]='optional--'; 
		 solidfile_com[6]='<\/font> \\((\\d.*?)\\)<\/font>';
		 http_file_hosts.push(solidfile_com);
		}	
		if(Check_shareflare_dot_net_links){		
		var shareflare_net= new Array(6)
		 shareflare_net[0]='(|www\.)shareflare\.net\/download\/'; 
		 shareflare_net[1]='File: '; 
		 shareflare_net[2]='File not found'; 
		 shareflare_net[3]='optional--'; 
		 shareflare_net[4]="//a[contains(@href,'shareflare.net') and contains(@href,'download')]"; 
		
		 shareflare_net[5]='File: <span>(.*?)<\/span>'; 
		
		 shareflare_net[6]='\\[<span>(\\d.*?)<\/span>\\]<\/h1>';
		 http_file_hosts.push(shareflare_net);
		}		
		if(Check_sharejunky_dot_com_links){		
		var sharejunky_com= new Array(6)
		 sharejunky_com[0]='(|www\.)sharejunky\.com\/(?:.*?)'; 
		 sharejunky_com[1]='Preparing'; 
		 sharejunky_com[2]='was deleted'; 
		 sharejunky_com[3]='optional--'; 
		 sharejunky_com[4]="//a[contains(@href,'sharejunky.com')]"; 
		 sharejunky_com[5]='optional--'; 
		 sharejunky_com[6]='<small>\\((\\d.*?)\\)<\/small>';
		 http_file_hosts.push(sharejunky_com);
		}		
		if(Check_storage_dot_to_links){		
		var storage_to= new Array(6)
		 storage_to[0]='(|www\.)storage\.to\/get\/'; 
		 storage_to[1]='Downloading:'; 
		 storage_to[2]='File not found'; 
		 storage_to[3]='premium account'; 
		 storage_to[4]="//a[contains(@href,'storage.to') and contains(@href,'get')]"; 
		 storage_to[5]='optional--'; 
		 storage_to[6]='>\\((\\d.*?)\\)<\/span>';
		 http_file_hosts.push(storage_to);
		}
		if(Check_megaftp_dot_com_links){
		var megaftp_com= new Array(6)
		 megaftp_com[0]='(?:(?:|www\.)MegaFTP\.com\/)|(?:(?:|www\.)megaftp\.com\/)'; 
		 megaftp_com[1]='Click here to continue to your download'; 
		 megaftp_com[2]='(Not Found)|(has been removed)'; 
		 megaftp_com[3]='optional--'; 
		 megaftp_com[4]="//a[contains(@href,'MegaFTP') or contains(@href,'megaftp')]"; 
		 megaftp_com[5]='optional--'; 
		 megaftp_com[6]='>\\((\\d.*?)\\)<\/span>';
		 http_file_hosts.push(megaftp_com);
		}
		if(Check_turbobit_dot_net_links){
		var turbobit_net= new Array(6)
		 turbobit_net[0]='(turbobit|zharabit)\.net\/'; 
		 turbobit_net[1]='(Download file:)|(Размер файла)|( Free downloading )|(Download file)'; 
		 turbobit_net[2]='(Файл не найден)|(File not found)'; 
		 turbobit_net[3]='optional--'; 
		 turbobit_net[4]="//a[contains(@href,'turbobit') or contains(@href,'zharabit')]"; 
		 turbobit_net[5]='Download (.*?). Free download without'; 
		 turbobit_net[6]='File size:<\/b> (\\d.*?)<\/div>';
		 http_file_hosts.push(turbobit_net);
		}	
		if(Check_turboshare_dot_com_links){
		var turboshare_com= new Array(6)
		 turboshare_com[0]='turboshare\.com\/files'; 
		 turboshare_com[1]='You have requested'; 
		 turboshare_com[2]='File Not Found'; 
		 turboshare_com[3]='optional--'; 
		 turboshare_com[4]="//a[contains(@href,'turboshare.com') and contains(@href,'files')]"; 
		 turboshare_com[5]='optional--'; 
		 turboshare_com[6]='<\/font> \\((\\d.*?)\\)<\/font>';
		 http_file_hosts.push(turboshare_com);
		}
		if(Check_link_dash_protector_dot_com_links){		
		var link_protector_com= new Array(6) 
		 link_protector_com[0]='link-protector\.com\/(?:\d*)';
		 link_protector_com[1]='This link is'; 
		 link_protector_com[2]='from automatic stealing'; 
		 link_protector_com[3]='optional--'; 
		 link_protector_com[4]="//a[contains(@href,'link-protector.com')]"; 
		 link_protector_com[5]='optional--';
		 link_protector_com[6]='</strong> \((.*?)\)</h1>';
		 http_file_hosts.push(link_protector_com);
		}			 
		var co_cc_vault= new Array(6) 
		 co_cc_vault[0]='(?:(?:defensive-pro\.org)|(?:.*?/(?:(?:vault)|(?:backup))/.*?))/downloads/'; 
		 co_cc_vault[1]='<input type="hidden" name="link" value="(.*)(?:|)'; 
		 co_cc_vault[2] = '( *$| "|>)'; 
		 co_cc_vault[3]='optional--'; 
		 co_cc_vault[4]="//a[contains(@href,'vault') or contains(@href,'downloads')]"; 
		 co_cc_vault[5]='optional--'; 
		 co_cc_vault[6]='&nbsp;\\n.\\((.*?)\\)\\n&nbsp;';
		 co_cc_vault[7]='1';		 
		var uploading_com= new Array(6) 
		 uploading_com[0]='uploading\.com\/files'; 
		 uploading_com[1]='ico_download_file'; 
		 uploading_com[2]='FILE REMOVED BECAUSE'; 
		 uploading_com[3]='optional--'; 
		 uploading_com[4]="//a[contains(@href,'uploading.com') and contains(@href,'files')]"; 
		 uploading_com[5]='optional--'; 
		 uploading_com[6]='File size: (.*?)<br />'; 
		var hotfile_com= new Array(6) 
		 hotfile_com[0]='hotfile\.com\/dl'; 
		 hotfile_com[1]='<td>Downloading <b>'; 
		 hotfile_com[2]='is deleted by the'; 
		 hotfile_com[3]='optional--'; 
		 hotfile_com[4]="//a[contains(@href,'hotfile.com') and contains(@href,'dl')]"; 
		 hotfile_com[5]='optional--'; 
		 hotfile_com[6]='<span class="size">\\| (\\d.*?)</span>';
		var rapidshare_com= new Array(6) 
		 rapidshare_com[0]='(|www\.)rapidshare\.com\/files'; 
		 rapidshare_com[1]='File Name'; 
		 rapidshare_com[2]='error'; 
		 rapidshare_com[3]='optional--'; 
		 rapidshare_com[4]="//a[contains(@href,'rapidshare')]"; 
		 rapidshare_com[5]='optional--'; 
		 rapidshare_com[6]='^(.*?)$';
		var netload_in= new Array(6)
		 netload_in[0]="(?:www.|)netload.in/date"; 
		 netload_in[1]='dl_first_tacho.gif'; 
		 netload_in[2]='Please contact the'; 
		 netload_in[3]='optional--'; 
		 netload_in[4]="//a[contains(@href,'netload.in') and contains(@href,'date')]"; 
		 netload_in[5]='optional--'; 
		 netload_in[6]='<span style="color: #8d8d8d;">, (.*?)</span></div>';
		var megaupload_com = new Array(6) 
		 megaupload_com[0]='(|www\.)megaupload\.com'; 
		 megaupload_com[1]='Filename:'; 
		 megaupload_com[2]='Unfortunately, the link you have clicked'; 
		 megaupload_com[3]='optional--'; 
		 megaupload_com[4]="//a[contains(@href,'megaupload')]"; 
		 megaupload_com[5]='optional--'; 
		 megaupload_com[6]='font-size:13px;">(\d.*?)<\/font>';
		var filefactory_com = new Array(6) 
		 filefactory_com[0]='(|www\.)filefactory\.com'; 
		 filefactory_com[1]='file uploaded'; 
		 filefactory_com[2]='no longer available'; 
		 filefactory_com[3]='optional--'; 
		 filefactory_com[4]="//a[contains(@href,'filefactory')]"; 
		 filefactory_com[5]='optional--'; 
		 filefactory_com[6]='<span>(\d.*?) file uploaded .*ago.<\/span>';
		
 if (Show_info_in_tooltip){
		 if(Check_imdb_dot_com_rate){
			var imdb_com= new Array(6) 
			 imdb_com[0]='(?:|www\.)imdb\.com\/title\/tt\\d{6,8}'; 
			 imdb_com[1]='html_watch_now'; 
			 imdb_com[2]='optional--'; 
			 imdb_com[3]='optional--'; 
			 imdb_com[4]="//a[contains(@href,'/title/tt') and not (contains(@href, 'googleusercontent')) and not (contains(@href, 'plot')) and not (contains(@href, '#')) and not (contains(@href, 'awards')) and not (contains(@href, 'alternateversions')) and not (contains(@href, 'awards')) and not (contains(@href, 'board')) and not (contains(@href, 'business')) and not (contains(@href, 'companycredits')) and not (contains(@href, 'crazycredits')) and not (contains(@href, 'criticreviews')) and not (contains(@href, 'externalreviews')) and not (contains(@href, 'faq')) and not (contains(@href, 'fullcredits')) and not (contains(@href, 'goofs')) and not (contains(@href, 'keywords')) and not (contains(@href, 'literature')) and not (contains(@href, 'locations')) and not (contains(@href, 'mediaindex')) and not (contains(@href, 'miscsites')) and not (contains(@href, 'movieconnections')) and not (contains(@href, 'news')) and not (contains(@href, 'newsgroupreviews')) and not (contains(@href, 'officialsites')) and not (contains(@href, 'parentalguide')) and not (contains(@href, 'photosites')) and not (contains(@href, 'posters')) and not (contains(@href, 'quotes')) and not (contains(@href, 'ratings')) and not (contains(@href, 'recommendations')) and not (contains(@href, 'releaseinfo')) and not (contains(@href, 'reviews')) and not (contains(@href, 'soundsites')) and not (contains(@href, 'soundtrack')) and not (contains(@href, 'synopsis')) and not (contains(@href, 'taglines')) and not (contains(@href, 'technical')) and not (contains(@href, 'trivia')) and not (contains(@href, 'tvschedule')) and not (contains(@href, 'videogallery')) and not (contains(@href, 'videosites')) ]"; 
			 imdb_com[5]='html_title_info":"(.*?)","num_watching_modes';
			 imdb_com[6]='\\|imdb\\|(.*?)\\|';
			 http_file_hosts.push(imdb_com);
			}	
	 	}else{
			if(Check_imdb_dot_com_rate){
			var imdb_com= new Array(6) 
			 imdb_com[0]='(?:|www\.)imdb\.com\/title\/tt\\d{6,8}'; 
			 imdb_com[1]='(?:starbar-meta)|(?:rating-stars)'; 
			 imdb_com[2]='optional--'; 
			 imdb_com[3]='optional--'; 
			
			 imdb_com[4]="//a[contains(@href,'/title/tt') and not (contains(@href, 'googleusercontent')) and not (contains(@href, 'plot')) and not (contains(@href, '#')) and not (contains(@href, 'awards')) and not (contains(@href, 'alternateversions')) and not (contains(@href, 'awards')) and not (contains(@href, 'board')) and not (contains(@href, 'business')) and not (contains(@href, 'companycredits')) and not (contains(@href, 'crazycredits')) and not (contains(@href, 'criticreviews')) and not (contains(@href, 'externalreviews')) and not (contains(@href, 'faq')) and not (contains(@href, 'fullcredits')) and not (contains(@href, 'goofs')) and not (contains(@href, 'keywords')) and not (contains(@href, 'literature')) and not (contains(@href, 'locations')) and not (contains(@href, 'mediaindex')) and not (contains(@href, 'miscsites')) and not (contains(@href, 'movieconnections')) and not (contains(@href, 'news')) and not (contains(@href, 'newsgroupreviews')) and not (contains(@href, 'officialsites')) and not (contains(@href, 'parentalguide')) and not (contains(@href, 'photosites')) and not (contains(@href, 'posters')) and not (contains(@href, 'quotes')) and not (contains(@href, 'ratings')) and not (contains(@href, 'recommendations')) and not (contains(@href, 'releaseinfo')) and not (contains(@href, 'reviews')) and not (contains(@href, 'soundsites')) and not (contains(@href, 'soundtrack')) and not (contains(@href, 'synopsis')) and not (contains(@href, 'taglines')) and not (contains(@href, 'technical')) and not (contains(@href, 'trivia')) and not (contains(@href, 'tvschedule')) and not (contains(@href, 'videogallery')) and not (contains(@href, 'videosites')) ]"; 
			 imdb_com[5]='title="(\\d.*?) IMDb users have given an average vote of (?:\\d.*?)"';
			 imdb_com[6]='title="(?:\\d.*?) IMDb users have given an average vote of (\\d.*?)"';
			 http_file_hosts.push(imdb_com);
			}	
		}
		var http_file_hosts_all = [imdb_com,netload_in,crocko_com,mediafire_com,megashares_com,narod_ru,rapidshare_de,veehd_com,vip_file_com,yourfilehost_com,sendspace_com,gigasize_com,filepost_com,duckload_com,link_protector_com,bitshare_com,cramit_in,bitroad_net,uploadbox_com,keepfile_com,letitbit_net,x7_to,zshare_net,uploaded_to,filesend_net,ifile_it,solidfile_com,shareflare_net,sharejunky_com,storage_to,megaftp_com,co_cc_vault,sharingmatrix_com,rapidshare_com,megaupload_com,filefactory_com];
		var totalxpath='';
		var totalourls='';
		for (var x=0;x<http_file_hosts.length;x++)
		{
			totalxpath = totalxpath + http_file_hosts[x][4] + '|';
			totalourls = totalourls + http_file_hosts[x][0] + '|';
		}
		totalxpath = totalxpath.replace(/\|$/g, "");
		totalourls = totalourls.replace(/\|$/g, "");
		
		linkify(totalourls);	
		if(!totalxpath)return;
		var reallianksxpath = totalxpath.replace(/\|\/\/a\[contains\(@href,'\/title\/tt'\).*$/, "");
		
		totalxpath = totalxpath+"|//a[not(contains(@href, 'download.torrent'))]";
		
		var lianks = document.evaluate(totalxpath, document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);
		var reallianks = document.evaluate(reallianksxpath, document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);
		
		if (lianks.snapshotLength == 0){
			return lianks.snapshotLength;
			}
		if (lianks.snapshotLength > 0)
		{
			add_RSLC_style();
			if ( lianks.snapshotLength > 200 ){ checktill = "200"; } else{ checktill = lianks.snapshotLength; }
		 nroftotallinkscheckednonbulk = reallianks.snapshotLength;
			for (var y = 0; y < checktill; y++)
			{
				var link = lianks.snapshotItem(y);	
				if(y>0){
					var ym = y-1; 
 	var prevlink = lianks.snapshotItem(ym);	
					}else{
					var prevlink = '';	
						} 
				if ( link.href.match(/(megaftp)|(bigandfree)/i))
				{
					link.href = link.href.toLowerCase();
					link.href = link.href.replace(/\&.*/,'');
				}
				
				for (var i=0; i<http_file_hosts.length; i++)
				{ 
					if ( (link.href.match(http_file_hosts[i][0])) && (!(link.href.match(/google\./))) && (!(link.href.match(/cache:/))) && (!(link.href.match(/translate/))) && (!(link.id.match(/(imdb_link)|(alive_link)|(adead_link)|(NDSTUSERROR)/))) )
					{
								
												
						var URL = link.href.replace(/http:\/\/.*?(?:\?|=)http:\/\//,'http://'); 
						 URL = URL.replace(/^.*url=http/g, "http"); 
						var name = http_file_hosts[i][0];
						var file_is_alive = http_file_hosts[i][1];
						var file_is_dead = http_file_hosts[i][2]; 
						var no_dd_slots_temp_unavail_servererror = http_file_hosts[i][3];
						var whattoreplace = http_file_hosts[i][4];
						var more_info = http_file_hosts[i][5];
						var size = http_file_hosts[i][6];
						var url2decode = http_file_hosts[i][7];
 
						if (url2decode == 1){
							decurl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , more_info, size , http_file_hosts_all,replace_co_cc_vault_links);
						}else{						
							geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , more_info, size);
						}
					}
			 }
			}
		}
		function decurl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,more_info, size,http_file_hosts_all,replace_co_cc_vault_links)
		{
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: URL,
				headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
				onload: function(responseDetails)
				{
					var reallinkreg = file_is_alive;
					var reallinkcorrection = file_is_dead;	
					var reallink = responseDetails.responseText.match(reallinkreg)[1];
					reallink = reallink.replace( new RegExp( reallinkcorrection, "g" ), "" ); 
					
					addRealLinksNextToCodedOnes(URL,reallink,replace_co_cc_vault_links);
				}
			});		
		}
		
		function addRealLinksNextToCodedOnes(URL,reallink,replace_co_cc_vault_links)
		{
			var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";	
			var allliveLinks, thisLink;
			allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allliveLinks.snapshotLength; i++)
			{
				var thisLink = allliveLinks.snapshotItem(i);
				if (replace_co_cc_vault_links == '1')
				{
					thisLink.href = reallink;		 
					thisLink.innerHTML = reallink;
				}
				else
				{
					if (thisLink.id != 'checked')
					{
						thisLink.id = 'checked';
						div = document.createElement('div');
						div.innerHTML = '<a href="'+reallink+'">'+reallink+'</a>';
						thisLink.parentNode.insertBefore(div,thisLink);
					}
				}
				for (var i=0; i<http_file_hosts_all.length; i++)
				{
					
					if ( (reallink.match(http_file_hosts_all[i][0])) && (!(reallink.match(/google\./))) && (!(reallink.match(/cache:/))) && (!(reallink.match(/translate/))) )
					{
						var URL = reallink.replace(/http:\/\/.*?\?http:\/\//,'http://'); 	
						var name = http_file_hosts_all[i][0];
						var file_is_alive = http_file_hosts_all[i][1];
						var file_is_dead = http_file_hosts_all[i][2]; 
						var no_dd_slots_temp_unavail_servererror = http_file_hosts_all[i][3];
						var whattoreplace = http_file_hosts_all[i][4];
						var more_info = http_file_hosts_all[i][5];
						var size = http_file_hosts_all[i][6];
						var url2decode = http_file_hosts_all[i][7];			 
						geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , more_info, size); 			 
					}	
				}	 
			}
		}
		
		function geturl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace, more_info, size)
		{	
			
							if ( (Show_info_in_tooltip) && ( URL.match(/imdb\.\w*\/title\/tt/i)) )
							{
								URL = URL.toLowerCase();
								URL = URL.replace(/www./,'');
								URL = URL.replace(/(?:\w*\.|)imdb\.\w*\/title\/tt/,'www.imdb.com/widget/hover/_ajax/get_hover_info?list_class=WATCHLIST&movies_showing_nearby=none&tconst=tt');
								URL = URL.replace(/\/$/,'');								
							}
										
			
			GM_xmlhttpRequest(
			{
				method: 'GET',
				url: URL,
				headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
				onload: function(responseDetails)
				{
					if (responseDetails.status == 403 || responseDetails.status == 404 )
					{
						DiplayTheNDSTUSERROR(URL);
					}		
					var alivelink = responseDetails.responseText.match(file_is_alive);
					var deadylink = responseDetails.responseText.match(file_is_dead);
					var tosviolat = responseDetails.responseText.match(more_info);
					var noddslotstempunavailservererror = responseDetails.responseText.match(no_dd_slots_temp_unavail_servererror);
					if (deadylink && (deadylink != null))
					{
						DiplayTheDeletedLinks(URL);
					}
					else if (alivelink && (alivelink != null))
					{
						if (responseDetails.responseText.match(more_info))
						{	
							var more_infoX = responseDetails.responseText.match(more_info)[1]; 
							var more_infoX2 = responseDetails.responseText.match(more_info)[2];
							if (more_infoX2)
							{
								more_infoX = more_infoX2;
							}	
						}
						else
						{
							var more_infoX = 'unknown';
						}
						if (responseDetails.responseText.match(size) != null)
						{
							var fileSize = responseDetails.responseText.match(size)[1];
							var fileSize2 = responseDetails.responseText.match(size)[2];
							if (fileSize2)
							{
								fileSize = fileSize2;
							}
							fileSize = fileSize.replace(/&nbsp;/,' ');
						}
						else
						{
							fileSize = "unknown";
						}
						
						DiplayTheLiveLinks(URL,fileSize,more_infoX,whattoreplace);	
					}
					else if (noddslotstempunavailservererror && (noddslotstempunavailservererror != null))
					{
						DiplayTheNDSTUSERROR(URL);	
					}
				}
			});
		}
		function DiplayTheLiveLinks(URL,fileSize,more_info,whattoreplace)
		{	
	
					
			if (URL.match(/imdb.com\/title\/tt\d{6,8}(?:$|\/$)/)){
				var URL = URL.replace(/http:\/\/(www\.|)imdb\.com/,'');	
				var URL = URL.replace(/.*?\/title\//,'/title/');	
				URL = URL.replace(/$/,'/');	
				URL = URL.replace(/\/\/www\./,'//');
				URL = URL.replace(/\/\/$/,'/');
				URL = URL.replace(/\/$/,'');
				}			
			
			if (URL.match(/list_class=WATCHLIST/)){
				var URL = URL.replace(/http:\/\/(www\.|)imdb\.\w*/,'');	
				more_info = more_info.replace(/\\n/g, "");
				more_info = more_info.replace(/\\/g, "");
				more_info = more_info.replace(/<a onclick=.*?<\/a>/, "");
				more_info = more_info.replace(/<span class="rating-bg">.*?10<\/span><\/a><\/span>/, "<b>Rating:</b> ");
				more_info = more_info.replace(/<span class="rating-cancel">.*?<\/span>&nbsp;/, "");
				more_info = more_info.replace(/<a>Remove from Watchlist<\/a>/, "");
				more_info = more_info.replace(/<\/span>t<\/div>/, "</span></div>");
				more_info = more_info.replace(/height="15">/, 'height="15"> &nbsp;');
				more_info = more_info.replace(/http:\/\/i.media-imdb.com\/images\/\w*\/certificates\//, "http://www.imdb.com/images/certificates/");
				more_info = more_info.replace(/<img width=".*?" alt="(.*?)" src="http:\/\/.*?height=".*?">/, "<span style='border: 2px solid gray;border-radius: 4px 4px 4px 4px;color: gray;font-weight: bold;padding: 0 4px; font-family: serif;'>$1</span>");
				more_info = more_info.replace(/class="ho-title"/, "class='ho-title' style='font-size: 14px;'");
 more_info = more_info.replace(/<div class="delete-from-watchlist">.*?<\/div>/, "");
 more_info = more_info.replace(/onclick="\(new Image\(\)\).*?"/, "style='text-shadow: 0pt 1px 5px rgba(0, 0, 0, 0.5); color: black;'");
				more_info = more_info.replace(/ rating-list/, "");
				more_info = more_info.replace(/rating-rating/, "");
				URL = URL.replace(/\/widget\/hover\/_ajax\/get_hover_info.list_class.WATCHLIST.movies_showing_nearby=none.tconst.tt/,'/title/tt');
				URL = URL.replace(/$/,'/');	
				URL = URL.replace(/\/\/www\./,'//');
				URL = URL.replace(/\/\/$/,'/');
				URL = URL.replace(/\/$/,'');				
				}	
			whattoreplace = whattoreplace.replace(/^\/\/a\[/g, " and ");
 if (whattoreplace.match(/ or /)){
				whattoreplace = whattoreplace.replace(/ and /g, " and ( ");
				whattoreplace = whattoreplace.replace(/]$/g, " )]");
				}
			var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')"+whattoreplace;
			var allliveLinks, thisLink;
			allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
			for (var i = 0; i < allliveLinks.snapshotLength; i++)
			{
				
				var thisLink = allliveLinks.snapshotItem(i);
				if (thisLink.innerHTML.match(/User Rating/)) return;
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=|plotsummary|trivia|synopsis|title\/tt)/))) thisLink.id = 'alive_link'; 
			
				if ( (Show_info_in_tooltip==false) && (thisLink.href.match(/(title\/tt)/)) && (thisLink.parentNode.id != 'imdb_link') && (thisLink.firstChild.tagName != 'IMG') && (thisLink.childNodes[0].tagName != 'IMG') )
				{			
					var padding_left = fileSize.replace(/\/10/,'').replace(/\./,'');							
					
					if (isNaN(padding_left))
					{
						padding_left = '0';
						fileSize = "no&nbsp;votes";
					}								
					var imdbdiv1= document.createElement("div");
					imdbdiv1.id = 'imdb_link';	
					imdbdiv1.setAttribute("style", "display:inline-table;");
													
					var imdbdiv2= document.createElement("div");
					imdbdiv2.id = 'imdb_link';
					stars_full="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAALCAYAAAB8vqNrAAAAAXNSR0IArs4c6QAAAAZiS0dEACcAcwDv7KBhiwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHg0iBNWQeD8AAAKzSURBVFjD7dZPSBRRAMfx78zOjq77tjU1lVYNozTQoE4eAq1DSEiUecygslvdC+0gVB7tFEaH8iAEdYq6lJQkYUVBoYl5SE0z8V+7szvuzro7Mx1EXY21oDUP7bu8efDj83sz7/AGEsboy6XZtkWxbYssgDZ+HQm5DNsWu5Llkpk3/mPzT79nYrecGC6tATsgSohTh8mOJN1LOb9wEaEKk8MA9kbZdaa0CSZbaLIJppTskAAIUwucxIEAaE4mL7CdKKdxUAXQstFu/4HZsoVm8ya8e2JOsW0hTfdRXlCJjzheohwlisoCx+x5UYjGbCTMnKuC2YleRLGPMvLJJUwFMfZhMGlPi3qcTC2MM+fOZZ4iAmkzdaajtXWRiQG1JDzH5QyTA06JPGRiQA5Qjkm+ZPHNkadPnW9QXaEQdbEATW4HPkkiEwkLKMVmj2IiSyr9bNPjaTNFppN+WZJgzs9YQOPZyBgFQQ0FA4UIBSyyiMSwLDEJMDJOSAvydmaWL2PjlNgGcQwEUXIxmZRlhqQi3UibKTSLdUPpbIPqRv0HcKunUzRkufBKMrLHjRqN8rH7nePJ8XOa0dsF1Y16HHjz4p5wR6LUej0EPTEUp0podFJ+vLsmOPThEQx+TpupNJWzCTeUquL0a6hxk+l4Dj7DwJOdaboAo7pxNedUcVsWyvcZ7Owofo+bbVrAcgMcPLH2Pkybf28qy8GeTrHftJgNRxgJ6XSHDY7keCmv3IsP8K/k7gqvZbEzZjPo1+jTF/jq9VJfVMgh4H3iJtNmasyVQ5IsygaGab94TX8FUCDE/addnAmGUBPLHTJ5WpD515/kC20dwTGA7jviuRXn1Pq/yrSZIrOjBW5fXVtw/dLa9cObS/P63JWmtesH7avPm2F2tGxsLmd/Zy53b5W5nF2fS2b+BDdYZDigaPAjAAAAAElFTkSuQmCC";
					stars_emtpy="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAALCAYAAAB8vqNrAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHg8LJKk8E3IAAANQSURBVFjD7dVfaJZlGMfx7+9+3ummog2nFkzKRaaEyMhQ+nNgf487CU8yXbKsA0EisSg6y4OVzAoZI93mUQcdBBFJ/2xQJxXlgYSECjNNhTV7jVq+vu/162CL5uv2Pg9ZELTr8OHic1/XfV/PfcM0MTTQu2RooHcuOTE00Ns0NNC7jAIxa/59M9V/GDy4d6nxeuMbGoGDB/fOtb3KeG3e4rPm9Zlpmvx1wD1CLTnrLwA/ILSqwDDNmtdhaujQ64rK5XalrA2YD2wEFgJfAiewy8ZlpawctSvNSVk70kLgFmADaBQ8DIw5oqykSyo1/Tpr/nNmemLzDtvRHFF91I6HsVuBGnA7cD+wQbBoy9adVWzC1dWO2mM41oDPg38G7gU2SqwGKjOYZwqYa8HHwRcLmBkwXND8DHyqgHkROAosK2AK3FKw91rBOqc1J647x3nsrx21VtuHsQeAJqCKOAOMTqTVxgkft+PHcMzH7gcGgS+An0Cnt3Q9W6kzS7b7sfuAkRzzLPYHwKcT3oxmq+0h7MPA5zlmG/Yw8P7kRDcyP8F+G/gqx1w62XtfAfM97H3AtznmIuw3JvfzKlNT774D/Xt6lLJ3RTolab1xNWqVD5/sfqFSl9cp9JxSthkpCe0K1w51bdt1uv4+PdC/50Wl7E2RkqQO49aoVYZnMDuVso+QykId4drYDGaPUrZPpFFJjxufa1DnU0pZD9JcoU3h2lsNzP0inZN0q/GKnN67JnvfnWO+KtJFSc8Yn2hgPqSU7UdqEto51Sxd9UBBCcc8yxtxErgiaQ5QqctrRmR2bBc6adSCo3m611CwGMcjlkdw2gr+OMdcKbTEaBzHbzOYJRw7LB/BaV2O2WpHt9APRvMa1FnCscnyME4d4Ms5dd4tdKWAucPyUZxWg882MO+0Y43QTfVmmnKaK4AydqcjLthxo2G5VGqrO/X5hsXYIzh+sQM7LGV3TDNJf5o3O6Jix/c55m042u0o23FXjjla0BzB8Z0dJ+34PcesOaLFjmUFzOV2LChglh0xVrDOlXaM15t//UmmPVx9Z9v2l44B9D2/+8icjtYHjZvqTn2R7UvVuPJa99MvX5hY6JVvgPuuGaVrzaP/gnnkf2POxn83/gBJYybdaTz0sAAAAABJRU5ErkJggg==";
					
					imdbdiv2.setAttribute("style", "width:"+padding_left+"px; background:url("+stars_full+") no-repeat scroll 0 2px transparent");
					var imdbdiv3= document.createElement("div");
					imdbdiv3.id = 'imdb_link';
					imdbdiv3.innerHTML = '&nbsp;';
					imdbdiv3.setAttribute("style", "text-align:right; width:103px; background:url("+stars_emtpy+") no-repeat scroll 0 2px transparent; font-weight:bold; color:white; font-size:10px;");
					
					var imdba= document.createElement("a");
					imdba.id = 'imdb_link';
					
					var imdblink = thisLink.href;
					imdba.href = imdblink.replace(/www\./,'');
					imdba.innerHTML = thisLink.innerHTML;					
 more_info = more_info.replace(/name: /g,''); 
						more_info = more_info.replace(/\n/g,'');
						more_info = more_info.replace(/ {1,}/g,' ');
											
					if (!(imdba.innerHTML.match(/'rate'/)) ){
						imdba.innerHTML = imdba.innerHTML+'&nbsp;[rate:'+fileSize+'] '+more_info+' votes';
					}
					imdbdiv1.appendChild(imdba);
					imdbdiv2.appendChild(imdbdiv3);	
					imdbdiv1.appendChild(imdbdiv2);
					
					thisLink.parentNode.replaceChild(imdbdiv1, thisLink);	
				}
				else if ( (Show_info_in_tooltip) && (thisLink.href.match(/(title\/tt)/)) && (thisLink.parentNode.id != 'imdb_link') && (thisLink.firstChild.tagName != 'IMG') )
				{
				
				if (thisLink.childNodes[1]){
				 if (thisLink.childNodes[1].id == 'imdb_link') {
					 return;
					 }
				}
				
				thisLink.href = thisLink.href.replace(/\/widget\/hover\/_ajax\/get_hover_info.list_class.WATCHLIST.movies_showing_nearby=none.tconst.tt/,'/title/tt');
				thisLink.href = thisLink.href.replace(/$/,'/');	
				thisLink.href = thisLink.href.replace(/\/\/www\./,'//');				
				thisLink.href = thisLink.href.replace(/\/\/$/,'/');	
				
					var padding_left = fileSize.replace(/\/10/,'').replace(/\./,'');							
					
					if (isNaN(padding_left))
					{
						padding_left = '0';
						fileSize = "no&nbsp;votes";
					}								
					var imdbdiv1= document.createElement("div");
					imdbdiv1.id = 'imdb_link';	
					imdbdiv1.setAttribute("style", "display:inline-table;");
													
					var imdbdiv2= document.createElement("div");
					imdbdiv2.id = 'imdb_link';
					stars_full="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAALCAYAAAB8vqNrAAAAAXNSR0IArs4c6QAAAAZiS0dEACcAcwDv7KBhiwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHg0iBNWQeD8AAAKzSURBVFjD7dZPSBRRAMfx78zOjq77tjU1lVYNozTQoE4eAq1DSEiUecygslvdC+0gVB7tFEaH8iAEdYq6lJQkYUVBoYl5SE0z8V+7szvuzro7Mx1EXY21oDUP7bu8efDj83sz7/AGEsboy6XZtkWxbYssgDZ+HQm5DNsWu5Llkpk3/mPzT79nYrecGC6tATsgSohTh8mOJN1LOb9wEaEKk8MA9kbZdaa0CSZbaLIJppTskAAIUwucxIEAaE4mL7CdKKdxUAXQstFu/4HZsoVm8ya8e2JOsW0hTfdRXlCJjzheohwlisoCx+x5UYjGbCTMnKuC2YleRLGPMvLJJUwFMfZhMGlPi3qcTC2MM+fOZZ4iAmkzdaajtXWRiQG1JDzH5QyTA06JPGRiQA5Qjkm+ZPHNkadPnW9QXaEQdbEATW4HPkkiEwkLKMVmj2IiSyr9bNPjaTNFppN+WZJgzs9YQOPZyBgFQQ0FA4UIBSyyiMSwLDEJMDJOSAvydmaWL2PjlNgGcQwEUXIxmZRlhqQi3UibKTSLdUPpbIPqRv0HcKunUzRkufBKMrLHjRqN8rH7nePJ8XOa0dsF1Y16HHjz4p5wR6LUej0EPTEUp0podFJ+vLsmOPThEQx+TpupNJWzCTeUquL0a6hxk+l4Dj7DwJOdaboAo7pxNedUcVsWyvcZ7Owofo+bbVrAcgMcPLH2Pkybf28qy8GeTrHftJgNRxgJ6XSHDY7keCmv3IsP8K/k7gqvZbEzZjPo1+jTF/jq9VJfVMgh4H3iJtNmasyVQ5IsygaGab94TX8FUCDE/addnAmGUBPLHTJ5WpD515/kC20dwTGA7jviuRXn1Pq/yrSZIrOjBW5fXVtw/dLa9cObS/P63JWmtesH7avPm2F2tGxsLmd/Zy53b5W5nF2fS2b+BDdYZDigaPAjAAAAAElFTkSuQmCC";
					stars_emtpy="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGkAAAALCAYAAAB8vqNrAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oHHg8LJKk8E3IAAANQSURBVFjD7dVfaJZlGMfx7+9+3ummog2nFkzKRaaEyMhQ+nNgf487CU8yXbKsA0EisSg6y4OVzAoZI93mUQcdBBFJ/2xQJxXlgYSECjNNhTV7jVq+vu/162CL5uv2Pg9ZELTr8OHic1/XfV/PfcM0MTTQu2RooHcuOTE00Ns0NNC7jAIxa/59M9V/GDy4d6nxeuMbGoGDB/fOtb3KeG3e4rPm9Zlpmvx1wD1CLTnrLwA/ILSqwDDNmtdhaujQ64rK5XalrA2YD2wEFgJfAiewy8ZlpawctSvNSVk70kLgFmADaBQ8DIw5oqykSyo1/Tpr/nNmemLzDtvRHFF91I6HsVuBGnA7cD+wQbBoy9adVWzC1dWO2mM41oDPg38G7gU2SqwGKjOYZwqYa8HHwRcLmBkwXND8DHyqgHkROAosK2AK3FKw91rBOqc1J647x3nsrx21VtuHsQeAJqCKOAOMTqTVxgkft+PHcMzH7gcGgS+An0Cnt3Q9W6kzS7b7sfuAkRzzLPYHwKcT3oxmq+0h7MPA5zlmG/Yw8P7kRDcyP8F+G/gqx1w62XtfAfM97H3AtznmIuw3JvfzKlNT774D/Xt6lLJ3RTolab1xNWqVD5/sfqFSl9cp9JxSthkpCe0K1w51bdt1uv4+PdC/50Wl7E2RkqQO49aoVYZnMDuVso+QykId4drYDGaPUrZPpFFJjxufa1DnU0pZD9JcoU3h2lsNzP0inZN0q/GKnN67JnvfnWO+KtJFSc8Yn2hgPqSU7UdqEto51Sxd9UBBCcc8yxtxErgiaQ5QqctrRmR2bBc6adSCo3m611CwGMcjlkdw2gr+OMdcKbTEaBzHbzOYJRw7LB/BaV2O2WpHt9APRvMa1FnCscnyME4d4Ms5dd4tdKWAucPyUZxWg882MO+0Y43QTfVmmnKaK4AydqcjLthxo2G5VGqrO/X5hsXYIzh+sQM7LGV3TDNJf5o3O6Jix/c55m042u0o23FXjjla0BzB8Z0dJ+34PcesOaLFjmUFzOV2LChglh0xVrDOlXaM15t//UmmPVx9Z9v2l44B9D2/+8icjtYHjZvqTn2R7UvVuPJa99MvX5hY6JVvgPuuGaVrzaP/gnnkf2POxn83/gBJYybdaTz0sAAAAABJRU5ErkJggg==";
					
					imdbdiv2.setAttribute("style", "width:"+padding_left+"px; background:url("+stars_full+") no-repeat scroll 0 2px transparent");
					var imdbdiv3= document.createElement("div");
					imdbdiv3.id = 'imdb_link';
					imdbdiv3.innerHTML = '&nbsp;';
					imdbdiv3.setAttribute("style", "text-align:right; width:103px; background:url("+stars_emtpy+") no-repeat scroll 0 2px transparent; font-weight:bold; color:white; font-size:10px;");
					
					var imdba= document.createElement("a");
					imdba.id = 'imdb_link';
					
					var imdblink = thisLink.href;
					imdba.href = imdblink.replace(/www\./,'');
					imdba.innerHTML = thisLink.innerHTML;					
 more_info = more_info.replace(/name: /g,''); 
						more_info = more_info.replace(/\n/g,'');
						more_info = more_info.replace(/ {1,}/g,' ');
											
					if (!(imdba.innerHTML.match(/'rate'/)) ){
						imdba.innerHTML = '&nbsp;[rate:'+fileSize+']';
					}
					imdbdiv1.appendChild(imdba);
					imdbdiv2.appendChild(imdbdiv3);	
					imdbdiv1.appendChild(imdbdiv2);
					thisLink.id = 'imdb_link';
					thisLink.appendChild(imdbdiv1);	
					instead_of_title = imdbdiv1;
					
					if (!(more_info) || (more_info == null) || (more_info =='unknown')){
						more_info='';
						}else{ 
						more_info= more_info+" \n ";
					}
					var instead_of_title = more_info;
					if (instead_of_title){
						thisLink.title = instead_of_title;
					}					
				}
			
				else
				{
					if (!(more_info) || (more_info == null) || (more_info =='unknown')){
						more_info='';
						}else{ 
		
 
						
						more_info= "name: " +more_info+" \n ";
						more_info = more_info.replace(/(name: ){1,}/g,'name: '); 
					}
					
					var instead_of_title = more_info+"size: " + sizetoMBKB(fileSize);
					
					if (instead_of_title){
						thisLink.title = instead_of_title;
					}
				} 
	 
				if (Show_info_in_tooltip)
				{
					if (instead_of_title){
						instead_of_title = instead_of_title.replace(/\n/g, "<br>");
						thisLink.setAttribute("dll_info", instead_of_title);
						thisLink.setAttribute("title", "");
						thisLink.addEventListener("mouseover", create_window, false);
						thisLink.addEventListener("mouseout", function() { kill_window(); }, false);
						thisLink.addEventListener("mousemove", function(event) { locate(event); }, true);
					}
				}
				if (No_live_links)
				{
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}	
				if ( (thisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) )
				{
					thisLink.href = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
					thisLink.textContent = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
				}
				if (Convert_links_to_full_address_links)
				{
					if (!(thisLink.href.match(/imdb\./))){
						Convert_links_to_full_address_links_function(allliveLinks.snapshotItem(i), thisLink.id);
					}
				}
			}
		}
		function DiplayTheDeletedLinks(URL)
		{
			var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
			
			var allLinks, thisLink;
			allLinks = document.evaluate( xpathoffotfoundlinks,
			document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var i = 0; i < allLinks.snapshotLength; i++)
			{
				var thisLink = allLinks.snapshotItem(i);
				thisLink.id = 'adead_link';
				if (No_live_links)
				{	
				 delinkify(allLinks.snapshotItem(i), thisLink.id);
				}
				if (Convert_links_to_full_address_links)
				{	
				 Convert_links_to_full_address_links_function(allLinks.snapshotItem(i), thisLink.id);
				}
				if ( (thisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) )
				{
					thisLink.href = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
					thisLink.textContent = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
				}					
			}
		}
		function DiplayTheNDSTUSERROR(URL)
		{
			var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
			var allLinks, thisLink;
			allLinks = document.evaluate( xpathoffotfoundlinks,
			document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			
			for (var i = 0; i < allLinks.snapshotLength; i++)
			{
				var thisLink = allLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/)))
				{
					thisLink.id = 'unava_link';
					if (No_live_links)
					{	
						delinkify(allLinks.snapshotItem(i), thisLink.id);
					}
					if (Convert_links_to_full_address_links)
					{	
						Convert_links_to_full_address_links_function(allLinks.snapshotItem(i), thisLink.id);
					}				
					if ( (thisLink.href.match(/.*?\.(avi|zip|rar|r\d\d)$/)) && (Add_html_to_urls) )
					{
						thisLink.href = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
						thisLink.textContent = thisLink.href.replace(/(.*?)\.(.*?)$/g, "$1.$2.html");
					}									
				}
			}
		}
		function sizetoMBKB(size){
				if (size.match(/^\d{2,}$/)) {
					return bytesToSize(size, 2);
				} else {
					return size;	
				}	
			}	
		function bytesToSize(bytes, precision)
		{ 
			var kilobyte = 1024;
			var megabyte = kilobyte * 1024;
			var gigabyte = megabyte * 1024;
			var terabyte = gigabyte * 1024;
		 
			if ((bytes >= 0) && (bytes < kilobyte)) {
				return bytes + ' B';
		 
			} else if ((bytes >= kilobyte) && (bytes < megabyte)) {
				return (bytes / kilobyte).toFixed(precision) + ' KB';
		 
			} else if ((bytes >= megabyte) && (bytes < gigabyte)) {
				return (bytes / megabyte).toFixed(precision) + ' MB';
		 
			} else if ((bytes >= gigabyte) && (bytes < terabyte)) {
				return (bytes / gigabyte).toFixed(precision) + ' GB';
		 
			} else if (bytes >= terabyte) {
				return (bytes / terabyte).toFixed(precision) + ' TB';
		 
			} else {
				return bytes + ' B';
			}
		}
		function linkify(totalourls)
		{
			var regexy = "http(?:s|):\/\/("+ totalourls +")[\\w\\-.+$!*\\/(),~%?:@#&=\\\\]*";
			var regex = new RegExp(regexy,"ig");
			var altText, tekst, muligtLink;
			var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea' ];//tags, hvor det der stAΞ’Β¥r inden i ikke skal vAΞ’Β¦re links
			var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";
			altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i=0;i<altText.snapshotLength;i++)
			{	
				tekst = altText.snapshotItem(i);
				if (i>0){
				var im = i-1;
				prevgtLink = altText.snapshotItem(im).nodevalue;
				}else{
				prevgtLink = '';	
					}
				
				muligtLink = tekst.nodeValue;
				
 if ( (muligtLink != prevgtLink) & (prevgtLink != 'undefined') & (prevgtLink != '') ){
 	
 if(muligtLink.match(regex)){	
					var span = document.createElement('span');	
					var lastLastIndex = 0;
					regex.lastIndex = 0;
					for(myArray = null; myArray = regex.exec(muligtLink); )
					{
						var link = myArray[0];					
						span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index)));
						var href = link;			
						var prefix = '';
						if(href.length > 7)
						{
							prefix = href.substring(0,7);
						}
						if ( (prefix.toLowerCase() != 'http://') && (prefix.toLowerCase() != 'https:/') )
						{
							href = 'http://' + href;
						}			
						var a = document.createElement('a');
						a.setAttribute('href', href);
						
						a.appendChild(document.createTextNode(link));
						span.appendChild(a);
						lastLastIndex = regex.lastIndex;
					}
					span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex)));
					
					tekst.parentNode.replaceChild(span, tekst);
				}
			 }
			}
		}
			
	return nroftotallinkscheckednonbulk;
	}
})();