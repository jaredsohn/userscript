var fileMETA = parseHeaders(<><![CDATA[
// ==UserScript==
// @name          Link Check by USUALIVE
// @description    Comprueba automáticamente los vínculos de más de 50 archivo de hosts como rapidshare.com, megaupload.com, hotfile.com, filefactory.com y otros directamente desde la página que está visitando. 
// @details       Cuando el control se hizo en la mayor parte de la secuencia de comandos puede comprobar cientos de enlaces en una fracción de segundo (300 enlaces en 0,1 a 0,3 seg y 900 enlaces en 0,5 segundos en mi conexión ADSL). Cuando el cheque no fue hecho en la mayor velocidad es baja y el uso de ancho de banda es mayor porque para cada enlace ver el guión es la descarga de la página marcada en el fondo.
// @namespace      http://userscripts.org/scripts/show/9467
// @include        http://*
// @include        file:///*
// @version        20091220
// @license        GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @author		   hosts (http://userscripts.org/users/hosts)
// @contributor    ale5000 (http://userscripts.org/users/ale5000)
// @exclude        http://rapidshare.com/*
// @exclude        http://rapidshare.de/*
// @exclude        http://*.rapidshare.com/*
// @exclude        http://*.rapidshare.de/*
// @exclude        http://www.filefactory.com/*
// @exclude        http://filefactory.com/*
// @exclude        http://www.megaupload.com/*
// @exclude        http://megaupload.com/*
// @exclude        http://www.megarotic.com/*
// @exclude        http://megarotic.com/*
// @exclude        http://www.megaporn.com/*
// @exclude        http://megaporn.com/*
// @exclude        http://www.megavideo.com/*
// @exclude        http://megavideo.com/*
// @exclude        http://www.netload.in/*
// @exclude        http://netload.in/*
// @exclude        http://www.hotfile.com/*
// @exclude        http://hotfile.com/*
// @exclude        http://www.depositfiles.com/*
// @exclude        http://depositfiles.com/*
// @exclude        http://www.uploading.com/*
// @exclude        http://uploading.com/*
// @exclude        http://*mediafire.com/*
// @exclude        http://*megashares.com/*
// @exclude        http://*rapidshare.de/*
// @exclude        http://*netload.in/*
// @exclude        http://*easy-share.com/*
// @exclude        http://*vip-file.com/*
// @exclude        http://*yourfilehost.com*
// @exclude        http://*sendspace.com*
// @exclude        http://*letitbit.net*
// @exclude        http://*zshare.net*
// @exclude        http://*uploadbox.com*
// @exclude        http://*filenavi.com*
// @exclude        http://*vip-file.com*
// @exclude        http://*bitroad.net*
// @exclude        http://*link-protector.com*
// @exclude        http://*filebase.to*
// @exclude        http://*duckload.com*
// @exclude        http://*fileop.com*
// @exclude        *xml_dump.php*
// @exclude        *phpMyAdmin*
// @exclude        *deleterecord.php*
// @exclude        http://www.google.com/reader/view/*cgi.4chan.org*
// @usoscript      9467
// ==/UserScript==
]]></>.toString());

// Version History http://files-search.com/userscripts/rapidshare_links_checker/version_history.html
// Previous Versions http://userscripts.org/scripts/versions/9467

/*-------------*\
|     About     |
\*-------------*/

// Esta sript está comprobando los enlaces para archivos alojados en rapidshare.com y filefactory.com

/*-----------------------------------------*\
|    About The Database hosts.890m.com      |
\*-----------------------------------------*/
/*

 The rapidshare database (http://hosts.890m.com) is a part of this userscript,
 the Rapidshare Links Checker userscript has the ability to sent only the urls of
 the pages when all the rapidshare links are alive, no cookies or other private
 informations are sent to the database, and you are able to erase the data you send.

*/
//var GM_Debug = 1;
//if(!GM_Debug) {
//var GM_log = function(){};  
//}else{
//if(unsafeWindow.console){
//var GM_log = unsafeWindow.console.log;
//} 	
//}

function parseHeaders(metadataBlock) {
  var headers = {};
  var line, name, prefix, header, key, value;
  var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
    for each (line in lines) {
      [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);

      switch (name) {
        case "licence":
          name = "license";
          break;
      }

      [key, prefix] = name.split(/:/).reverse();

      if (prefix) {
        if (!headers[prefix]) 
          headers[prefix] = new Object;
        header = headers[prefix];
      } else
        header = headers;

      if (header[key] && !(header[key] instanceof Array))
        header[key] = new Array(header[key]);

      if (header[key] instanceof Array)
        header[key].push(value);
      else
        header[key] = value;
    }
    headers["licence"] = headers["license"];
  return headers;
}
//update functions start
function getdays(date){    	Year = ((date.getYear() + 1900)*365);  var daday = (date.getMonth() + 1);  if(daday<10) {daday = "0" + daday;} 	daday  = (daday*30); daret = Year+daday+date.getDate(); return daret; }
	version = fileMETA["version"];
function check_update(version){  var today = new Date( ); day = parseInt( getdays (today) );   if ( (typeof GM_getValue("day") == "undefined") || ( ( (day - GM_getValue("day")) ) < 0) || ( ( (day - GM_getValue("day")) ) > 10)){ check_version(version);	  GM_setValue("day",day);	} }	 
function check_version(version) { var script_url = "http://userscripts.org/scripts/source/9467.meta.js";
	GM_xmlhttpRequest({ method:"GET",url:script_url,
		onload:function(result) { 	var newversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(result.responseText)[1];
		if (null == newversion){ alert('There was an error in the update function of the "IMDB Pirated Version" userscript.\nGo to '+script_url+' to download the latest version.\nThis message will appear again in 10 days'); }
		if(newversion==version){  return; }else{ var answer = confirm('A different version of the "IMDB Pirated Version" userscript for Greasemonkey is available.\nYour version = '+version+'\nNew version = '+newversion+'\nDo you want to update now? Check for update will be done again in 10 days');
    			  if (answer){	GM_openInTab("http://userscripts.org/scripts/source/9467.user.js");  } 
		    }
          }
		});
}	 
//update functions end

		/* info tooltip functions start*/ 
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
			var font_face = "tahoma";
			var font_size = "11px";		
			var tt_div = document.createElement("div");
				tt_div.setAttribute("id", "link_tt");
				tt_div.setAttribute("style", "background:" + bg_color + ";-moz-border-radius:4px; opacity:0.86; border:1px solid " + border_color + ";padding:2px;color:" + font_color + ";font-family:" + font_face + ";font-size:" + font_size + ";position:absolute;z-index:1000;");
			var tt_url = document.createElement("div");
				tt_url.innerHTML = event.currentTarget.getAttribute('dll_info');
				tt_div.appendChild(tt_url);
			document.body.appendChild(tt_div);
		}		
		function kill_window(){
			if (find_window()) find_window().parentNode.removeChild(find_window());
		}		
		/* info tooltip functions end*/	

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

function add_RSLC_style(){
	if (!(document.getElementsByTagName('RSLC')[0])){
		var meta_not_to_add_more_style = document.createElement("RSLC");
		meta_not_to_add_more_style.setAttribute('content', 'rapidshare_links_checker');
		meta_not_to_add_more_style.setAttribute('name', 'description');
		document.getElementsByTagName('head')[0].appendChild(meta_not_to_add_more_style);
		alive_link_png = 'data:image/png;base64,' + // http://i28.tinypic.com/dq5emx.png http://hosts1.atspace.com/accept.png
		'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQY36Sc4vgAAAlRJREFUeNpV0r9PE3EABfD3veu1lJYr15ZCoBHBqJBAMEbjL0hY' + 'FAkyOAmJMUYd/Q+cXF1wYPQPILppYkKIRARiMDGoaAKimBaKHMWDXnu93venE0Tf9Ib3tg/BP7m3NGgwxtKcM4vy' + 'IKSk4BBqnwux9/LGKjvckcNy9/1Akgk2ZJHMWNyw+qWUMSGZ51R2FzbdX1NSyOnZWznn6HRn8UqSCv6gLdz58GSs' + 'L2voURJIirAWhh+U1fLO4tbKztdJIvHsw/1NR7/97pJBOR9tDXc+6rMGsg4vkd3AhkMdVJgLounkdKLHdL1S13Zp' + 'dyMzbK5pnNF0I0mNn4r3Ze3AJrZvo0zL8KkPyil6rTOgipFzrRezLXVt4zWKtBbwWjIeTgyEQlHiUhepcBpNkSaY' + 'ehxX20Yw2HYd3VYP6iNRYhrpAeojGfJqvs7rRIyKGpSUGOm4iYgWwX7wB72ps/hWXMZCbgaNkUYQrseUr3SNB0JQ' + 'Rj0DBnSlYWN/DcfNEzifuYzVvS94vf4cVeoiBB2ScY8IiBBnytk7KM5XG8qj9SRClrbnUKNVZKLNWMjPwKkWkYk1' + '46BSUbZrz0PC0ZuHzaBYLokq9S90p3pMJRnJl35gtfgZQnAko0lY4WY1+2lu63s+N0EE+agXXrkydc3czjtF7noH' + 'XccSx82mWIY0hBpgRVMIalK9WX67tfJzfZJo5EVuouAdieh4kk3KQA21J1rGmuoy/UToMSG5t+vaC5u/7Smikenc' + '04LzHyMAaH+cNcBVGgyWClSIgHAA+2DYy00Wjuz9Bce5MucW9xnuAAAAAElFTkSuQmCC';
		adead_link_png = 'data:image/png;base64,' + //http://i27.tinypic.com/t96wq8.png http://hosts1.atspace.com/dead.png
		'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AMJCQkjdGXwDAAAAcpJREFUeNptkj9PFHEQhp/ZBcIhxyKHYgNCYUxogE0OpdDGxsQC' + 'Y6e5ggS1Mn4Ce621u7MCYqOdX4DkSLTBqwyNiQmJBiJiDjmWP/ub1+IAMXGqmTx5M5nJY5wpwRiQHPfoL2rG8PVk' + 'sDOBlKRYZWgwxcwkIQlc0o+fDe3sPu6E1dOQIGWg/yUT4zOUBiLtHYAHFBy6YvRrW+Hzl4/e/P2kAJ8iwRhJscrE' + '+AzDwxG3Z2E/oO9bKMvhzj104aLZ1dFr9PZUWzDWASQMDaYqDZjdvAWzd2HkMlpcJKpUsMlJdHiI3i1Ffr4v9d29' + 'pEMnt7UyfOkNNjKKTU8Tl8tghq+sEGqvUZwjZA5EAiShPIetLXxhASSIY3An1Gr4xkabq70iar9OkOeoWCSqVMAM' + '8hzMiObnIUnQ0RFyR0DkgNylzhh7cB+bmsLrdQ7n5gj1OlG5TPxoHro7kUsC4mdQUB5u0NdziW/r5q2M/PkLfG2N' + 'sLwMkRHevyVkWQib26t+FJYMIIOUvt5XdmXkunXEke/sQchRCNDdRfAQ8vXND97af1qCxqkRLUj9XKFq/cUUMMmR' + 'QHKFZquh7OBhCRr/aATQ/I97foxKZ9z7A9QA5voyr3dtAAAAAElFTkSuQmCC';
		NDSTUSEROR_png = 'data:image/png;base64,' + // or temporary anavailable
		'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAAL' + 'EwEAmpwYAAAAB3RJTUUH2AQJDBgxYO68rwAAAZNJREFUeNptkr9LW1EcxT/3GhOTKIG8QTpm8B8IIoJTFkFwsXVy' + 'UaxFJHYoFzJYUVFHn4sKtoidCoKtIigWOtQOhRKowaFzJwcF0VeJ+fFe7nUwP57R7/S9nO+595z7PQJfGUgAsWqP' + 'aUBOC/yrHQI+QjKTXc7GQq4EhP+uKzdUcbtnelvhDzXQQHL2bCkbxhOA5GmZ24LUC73zPWE4lQYSmexynaCmjh5N' + 'q9FdANER1uL9j7nfeUhIIFaVJNXEPrguKvPzgfD2G0iBGt8DkPG4CGiIyapZAWBvDUEoBOfnqPQxaANxC3v7Ze1h' + 'oQFpmsTbGwMQicLNNeTz2HaKYuO/4DnTauwLeC6i8wW4ZdSbA9rw/GtB6kaPmjyESATKZVZWUxAMQqnI9MTXOqdG' + 'cvRFoSw8o+0Pg1DxsD+PcFcJYH8aphSNsr71CkAH/17danAEQAGSa98zv7x4W9AIpGkRzap18cKU3vUv9lmQq6N5' + 'SH7cSZ8Uuqx205SI1rPL/6/HN1MW5GiKC84z2at6dixf9u4B/PqUtJuX27QAAAAASUVORK5CYII=';
		loading_img = 'data:image/gif;base64,' + 'R0lGODlhDQANAMZfADuHMTyMMz6SM0uQPkySQFGVSFSXTEaeN1OaSVOaSk+gQlWfTlSjS1apRVWsOlqtR2K3SWG6Qm+2WWm8T3O4' + 'XGfASXe5YW/BVXm9Y2zFTm7EY3jBZ4a8dnHGWHPGWHDGZIHAboe+eIHBboXAb3PIWYXBcHbIXXPIaHfHaoPDcYnBenzHb3jKX4fE' + 'c3fKbHvJbn7IcHzLcH3LcH3McZHFfYjJd47Hf5bGhpDJgIXNeZXIgobOfJPKgZbKhJfKhInPfYrRforRf5jMipPPhJjOiJbRipfS' + 'h5XTiJjTiJbUi5zSj5rTjZvWkJzWkZ3WkafVnKHYla/bprbgrb3es7zitb/itsfnwcvmxMzmxdHszdju1PT68/b79fj89/z9+///' + '////////////////////////////////////////////////////////////////////////////////////////////////////' + '/////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBZAB/ACwAAAAADQANAAAHd4B/goOEhYIZLCYeEYZ/' + 'JEhOSU1DEIUdUEEzLjI/Sg+DFUZAJx8aKFJFNgeCHkwxOzkrVFxVRAyCF0cvWVpWW1cpPAuCE0swUV1eWCIYPgmCDjg1G09TIBIl' + 'IQGDDUItGBQWIzcEhQoqPTQ6HAONAggGBQCN9IKBACH5BAFkAH8ALAAAAAANAA0AAAdjgH+Cg4SFghksJh4Rhn8kSE5JTUMQhR1Q' + 'QTOaP0oPgxVGQJqjRjYHgh5MMaOaMUQMghdHq6wzPAuCE0u0ozE+CYIOODW1RiEBgw1CLTHNMTcEhQoqPTQ6HAONAggGBQCN4IKB' + 'ADs=';
		GM_addStyle("#alive_link_checked, #alive_link {background:transparent url(" + alive_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
		GM_addStyle("#adead_link {background:transparent url(" + adead_link_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
		GM_addStyle("#unava_link {background:transparent url(" + NDSTUSEROR_png + ") no-repeat scroll 100% 50%;padding-right:15px;}");
		GM_addStyle(".loading {background:transparent url(" + loading_img + ") no-repeat scroll 100% 50% !important;padding-right:15px;}");
	}
}

	  
(function ()
{
	var Add_menu_commands = true;
	var Send_the_urls_of_the_pages_you_are_checking_in_the_open_database, Show_black_background_in_dead_links, Show_line_through_in_dead_links;
	var Remove_html_from_rapidshare_urls, No_live_links, Show_info_in_tooltip, Display_page_stats, Destyling_google_cache, Autocheck_links_on_page_load, Check_rapidshare_dot_com_links, Check_filefactory_dot_com_links, Check_megaupload_dot_com_links, Check_megarotic_dot_com_links, Check_megaporn_dot_com_links, Check_megavideo_dot_com_links, Check_netload_dot_in_links, Check_hotfile_dot_com_links, Check_depositfiles_dot_com_links, Check_uploading_dot_com_links;


	function set_variables() {
		Send_the_urls_of_the_pages_you_are_checking_in_the_open_database = GM_getValue("Send_the_urls_of_the_pages_you_are_checking_in_the_open_database", false);
		Show_black_background_in_dead_links = GM_getValue("Show_black_background_in_dead_links", false);
		Show_line_through_in_dead_links = GM_getValue("Show_line_through_in_dead_links", true);
		Remove_html_from_rapidshare_urls = GM_getValue("Remove_html_from_rapidshare_urls", false);
		No_live_links = GM_getValue("No_live_links", false);
		Show_info_in_tooltip = GM_getValue("Show_info_in_tooltip", false);
		Display_page_stats = GM_getValue("Display_page_stats", false);
		Destyling_google_cache = GM_getValue("Destyling_google_cache", true);
		Autocheck_links_on_page_load = GM_getValue("Autocheck_links_on_page_load", true);
		Check_rapidshare_dot_com_links = GM_getValue("Check_rapidshare_dot_com_links", true);
		Check_filefactory_dot_com_links = GM_getValue("Check_filefactory_dot_com_links", true);
		Check_megaupload_dot_com_links = GM_getValue("Check_megaupload_dot_com_links", true);
		Check_megarotic_dot_com_links = GM_getValue("Check_megarotic_dot_com_links", true);
		Check_megaporn_dot_com_links = GM_getValue("Check_megaporn_dot_com_links", true);
		Check_megavideo_dot_com_links = GM_getValue("Check_megavideo_dot_com_links", true);
		Check_netload_dot_in_links = GM_getValue("Check_netload_dot_in_links", true);
		Check_hotfile_dot_com_links = GM_getValue("Check_hotfile_dot_com_links", true);
		Check_depositfiles_dot_com_links = GM_getValue("Check_depositfiles_dot_com_links", true);
		Check_uploading_dot_com_links = GM_getValue("Check_uploading_dot_com_links", true);
		Check_letitbit_dot_net_links = GM_getValue("Check_letitbit_dot_net_links", false);	
		Check_mediafire_dot_com_links = GM_getValue("Check_mediafire_dot_com_links", false);		
		Check_vip_dash_file_dot_com_links = GM_getValue("Check_vip_dash_file_dot_com_links", false);
		Check_uploadbox_dot_com_links = GM_getValue("Check_uploadbox_dot_com_links", false);
		Check_uploadcell_dot_com_links = GM_getValue("Check_uploadcell_dot_com_links", false);
		Check_up_dash_file_dot_com_links = GM_getValue("Check_up_dash_file_dot_com_links", false);
		Check_getthebit_dot_com_links = GM_getValue("Check_getthebit_dot_com_links", false);
		Check_good_dot_com_links = GM_getValue("Check_good_dot_com_links", false);
		Check_jumbofiles_dot_com_links = GM_getValue("Check_jumbofiles_dot_com_links", false);
		Check_filenavi_dot_com_links = GM_getValue("Check_filenavi_dot_com_links", false);
		Check_bitroad_dot_net_links = GM_getValue("Check_bitroad_dot_net_links", false);
		Check_2shared_dot_com_links = GM_getValue("Check_2shared_dot_com_links", false);
		Check_badongo_dot_com_links = GM_getValue("Check_badongo_dot_com_links", false);
		Check_bigandfree_dot_com_links = GM_getValue("Check_bigandfree_dot_com_links", false);
		Check_duckload_dot_com_links = GM_getValue("Check_duckload_dot_com_links", false);
		Check_filebase_dot_to_links = GM_getValue("Check_filebase_dot_to_links", false);
		Check_fileop_dot_com_links = GM_getValue("Check_fileop_dot_com_links", false);
		Check_gigasize_dot_com_links = GM_getValue("Check_gigasize_dot_com_links", false);
		Check_filebox_dot_com_links = GM_getValue("Check_filebox_dot_com_links", false); 
		Check_sendspace_dot_com_links = GM_getValue("Check_sendspace_dot_com_links", false);
		Check_sharingmatrix_dot_com_links = GM_getValue("Check_sharingmatrix_dot_com_links", false);
		Check_share_dash_rapid_dot_com_links = GM_getValue("Check_share_dash_rapid_dot_com_links", false);
		Check_yourfilehost_dot_com_links = GM_getValue("Check_yourfilehost_dot_com_links", false);
		Check_ziddu_dot_com_links = GM_getValue("Check_ziddu_dot_com_links", false);
		Check_rapidshare_dot_de_links = GM_getValue("Check_rapidshare_dot_de_links", false);
		Check_easy_dash_share_dot_com_links = GM_getValue("Check_easy_dash_share_dot_com_links", false);
		Check_ezyfile_dot_net_links = GM_getValue("Check_ezyfile_dot_net_links", false);
		Check_egoshare_dot_com_links = GM_getValue("Check_egoshare_dot_com_links", false);		
		Check_megashares_dot_com_links = GM_getValue("Check_megashares_dot_com_links", false);
		Check_oron_dot_com_links = GM_getValue("Check_oron_dot_com_links", false);
		Check_quickupload_dot_net_links = GM_getValue("Check_quickupload_dot_net_links", false);
		Check_zshare_dot_net_links = GM_getValue("Check_zshare_dot_net_links", false);
		Check_uploaded_dot_to_links = GM_getValue("Check_uploaded_dot_to_links", false);
		Check_usaupload_dot_net_links = GM_getValue("Check_usaupload_dot_net_links", false);
		Check_filesend_dot_net_links = GM_getValue("Check_filesend_dot_net_links", false);	
		Check_files_dot_to_links = GM_getValue("Check_files_dot_to_links", false);		
		Check_ifile_dot_it_links = GM_getValue("Check_ifile_dot_it_links", false);
		Check_storage_dot_to_links = GM_getValue("Check_storage_dot_to_links", false);
		Check_superfastfile_dot_com_links = GM_getValue("Check_superfastfile_dot_com_links", false);
		Check_turbobit_dot_net_links = GM_getValue("Check_turbobit_dot_net_links", false);
		Check_turboupload_dot_com_links = GM_getValue("Check_turboupload_dot_com_links", false);
		Check_megaftp_dot_com_links = GM_getValue("Check_megaftp_dot_com_links", false);	
		Check_load_dot_to_links = GM_getValue("Check_load_dot_to_links", false);	
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
		No_live_links,
		Show_info_in_tooltip,
		Display_page_stats,
		Destyling_google_cache,
	    firsttime) {

		// No personal info are transmited 
		// The database can be accessed here:
		// http://hosts.890m.com 
		// No need to set a username and password anymore
		
		const username = 'type_here_your_username';
		const password = 'type_here_your_password';

		// Destyling_google_cache start
		if (Destyling_google_cache && (location.href.search(/q=cache.*?(rapidshare|megaupload|megarotic|megaporn|filefactory|netload)/) != -1)) {
			var mybody = document.getElementsByTagName('body');
			if (mybody[0].innerHTML.search(/rapidshare|megaupload|megarotic|megaporn|filefactory|netload/) != -1) {
				mybody[0].innerHTML = mybody[0].innerHTML.replace(/<b style.*?>/gi, '');
			}
		}
		// Destyling_google_cache end

		//////google de-bold 
		//it's removing bold (<b> tags) from the results of google if you are serching for rapidshare files directly from google 
		//I couldn't find more elegant or faster way. google de-bold costs 1 second for a 100 results google page	
		// for google reader blogsearch debold start 
		var googleregexreader = new RegExp(/google\..*\/reader\/(.*blogsearch\.google.*|.*rapidshare.*)/);
		if (googleregexreader.test(location.href)) {
			var links = document.evaluate("id('entries')/div[last()-1]/div/div/div/div[1]/div[4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (links.snapshotItem(0)) {
				node = links.snapshotItem(0);
				var reg = new RegExp("<b>");
				if (reg.test(node.innerHTML)) node.innerHTML = node.innerHTML.replace(/<[\/]{0,1}(B|b)[^><]*>/g, "");
			}
		}
		// for google reader blogsearch debold end
		//e.g. http://www.google.com/reader/view/#stream/feed%2Fhttp%3A%2F%2Fblogsearch.google.com%2Fblogsearch_feeds%3Fhl%3Den%26q%3DGod%2Bon%2BTrial%2BDVDRip%2B(rapidshare.%2B%257C%2Bmegaupload.%2B%257C%2Bsharebee.%2B%257C%2Bmediafire.%2B%257C%2Bslil.%2B%257C%2Bsendspace.%2B%257C%2Bturboupload.%2B%257C%2Bspeedshare.%2B%257C%2Bdepositfiles.)%26ie%3Dutf-8%26num%3D10
		//     http://www.google.com/reader/view/#stream/user%*%2Flabel%2Frapidshare  	
		//var googleregex = new RegExp(/(.*blogsearch.*|.*google.*)(.*rapidshare.*|.*megaupload.*|.*megarotic.*|.*filefactory.*)/);	
		var googleregex = new RegExp("(^http://blogsearch.*|^http://.*google.*)(.*rapidshare.*|.*megaupload.*|.*megarotic.*|.*megaporn.*|.*filefactory.*|.*netload.*)"); 

		if (googleregex.test(location.href)) {
			var links = document.evaluate("id('res')/div[1]|/html/body/div[6]/div[2]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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
					link.innerHTML = link.innerHTML.replace(/<wbr>/gi, ''); // to show better the rapidshare links
					//createTextNode(link.firstChild.nodeValue); // it's faster without a loop
				}
			}
		} /////google de-bold end

		var detectLinksRegEx ='';
		if (Check_filefactory_dot_com_links) detectLinksRegEx += '(?:\\:\/\/www\\.filefactory\\.com\/file\/..*?[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!])|';
		if (Check_rapidshare_dot_com_links)  detectLinksRegEx +='(?:\\:\/\/(?:|rs\\w*\\.)rapidshare\\.com\/files\/[\\d]*\/.*?\\..*?[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!])|';
		if (Check_depositfiles_dot_com_links)  detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)depositfiles\\.com\/(?:\\w\\w\/|)files\/(?:\\w*))|";
		if (Check_uploading_dot_com_links)  detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)uploading\\.com\/(?:\\w\\w\/|)files\/(?:\\w*)\/(?:\\S*))|";
		if (Check_hotfile_dot_com_links)  detectLinksRegEx += "(?:\\:\/\/(?:|www\\.)hotfile\\.com\/dl\\d*(?:\/|)\\w*(?:\/|)\\w*(?:\/|)\\S*)|";
		//if (Check_netload_dot_in_links)  detectLinksRegEx += '(?:\\:\/\/(?:|www\\.)netload\\.in\/datei\\w*(?:\/|))[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!]|';
		if (Check_netload_dot_in_links)  detectLinksRegEx += '(?:\\:\/\/(?:|www\\.)netload\\.in\/datei\\w*(?:\/|))[^"\\s\\<\\>]*[^.,;\'">\\:\\s\\<\\>\\)\\]\\!]|';
		if (Check_megaupload_dot_com_links)  detectLinksRegEx += "(?:\\:\/\/www\\.megaupload\\.com\/(?:|..\/)\\?d=.{8})|";
		if (Check_megarotic_dot_com_links)  detectLinksRegEx += "(?:\\:\/\/www\\.megarotic\\.com\/(?:|..\/)\\?d=.{8})|";
		if (Check_megaporn_dot_com_links)  detectLinksRegEx += "(?:\\:\/\/www\\.megaporn\\.com\/(?:|..\/)\\?d=.{8})|";
		
		 detectLinksRegEx = detectLinksRegEx.replace(/\|$/,'');
		
		if (Check_rapidshare_dot_com_links || Check_filefactory_dot_com_links || Check_megaupload_dot_com_links || Check_megarotic_dot_com_links || Check_megaporn_dot_com_links || Check_megavideo_dot_com_links || Check_netload_dot_in_links || Check_hotfile_dot_com_links || Check_depositfiles_dot_com_links || Check_uploading_dot_com_links){
		 detectLinksRegEx = "\b(?:|http\\:\/\/www\\.anonym\\.to\/\\?)(?:h\\w\\wp|http|hxxp|h  p|h.ttp|h\\*\\*p)("+detectLinksRegEx+")";
        }else{
		 detectLinksRegEx = "\b("+detectLinksRegEx+")";	
		}
		
		 detectLinksRegEx = detectLinksRegEx.replace(/\/g,'\\b');

		 urlRegex = new RegExp(detectLinksRegEx,"gi");
        
		//const urlRegexOLD = /\b(?:|http\:\/\/www\.anonym\.to\/\?)(?:h\w\wp|http|hxxp|h  p|h.ttp|h\*\*p)((?:\:\/\/www\.filefactory\.com\/file\/..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/(?:|rs\w*\.)rapidshare\.com\/files\/[\d]*\/.*?\..*?[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])|(?:\:\/\/(?:|www\.)depositfiles\.com\/(?:\\w\\w\/|)files\/(?:\w*))|(?:\:\/\/(?:|www\.)hotfile\.com\/dl\w*(?:\/|).*\..*)|(?:\:\/\/(?:|www\.)netload\.in\/datei\w*(?:\/|).*\..*)|(?:\:\/\/www\.megaupload\.com\/(?:|..\/)\?d=.{8})|(?:\:\/\/www\.megarotic\.com\/(?:|..\/)\?d=.{8})|(?:\:\/\/www\.megaporn\.com\/(?:|..\/)\?d=.{8}))/ig;
				
		var notallowedParents = ['a', 'head', 'iframe', 'script', 'style', 'title', 'option', 'textarea'];
		var xpath = "//text()[not(ancestor::" + notallowedParents.join(" or ancestor::") + ")]"; // props Garthex 
		var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {
			if ((urlRegex.test(cand.nodeValue)) && (!cand.nodeValue.match(/\d(\.\.\.)\d/)) && (!cand.nodeValue.match(/killcode/))) {
				cand.nodeValue = cand.nodeValue.replace(/h\w\wp:\/\/|hxxp:\/\/|h  p:\/\/|h.ttp:\/\/|h\*\*p:\/\//gi, 'http://');
				var span = document.createElement("span");
				span.id = 'rslinkfy';
				var source = cand.nodeValue;
				cand.parentNode.replaceChild(span, cand);
				urlRegex.lastIndex = 0;
				for (var match = null, lastLastIndex = 0;
				(match = urlRegex.exec(source));) { 
					//if (!(match[0].match(/â€¦/)))        
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
		var numberofmulinks = 0;
		var numberofnllinks = 0;
		var numberofhflinks = 0;
		var numberofdflinks = 0;
        var numberofuplinks = 0;
		 
	if (Check_rapidshare_dot_com_links){
		var myrapidshareRegExp0 = /http\:\/\/(?:|rs\w*\.)rapidshare\.com\/files\/\d{4,}\/.*?\..*?/; 
		var myrapidshareRegExp1 = /^.*?http:\/\/(?:|rs\w*\.)rapidshare\.com\/files\/\d{4,}\/.*?\..*?/;
		var myrapidshareRegExp2 = /^.*?http%3A%2F%2F(?:|rs\w*\.)rapidshare\.com%2Ffiles%2F\d{4,}%2F.*?\..*?/;			
		}
	if (Check_filefactory_dot_com_links){
		var myfilefactoryRegExp = /http\:\/\/www\.filefactory\.com\/file\/[\w]{6}(\/|)/;	
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
		var mynetloadinRegExp0  = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)netload\.in(?:\/|%2F)datei\w*(?:\/|%2F|).*?/;	
			}			 		
	if (Check_hotfile_dot_com_links){
		var myhotfilecomRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)hotfile\.com\/dl\/\w*/;	
			} 
	if (Check_depositfiles_dot_com_links){
		var mydepositfilRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)depositfiles\.com\/(?:\w\w\/|)files\/(?:\w*)/;	
			}
	if (Check_uploading_dot_com_links){
		var myuploadifilRegExp0 = /http(?:\:|%3A)(?:\/|%2F)(?:\/|%2F)(?:|www\.)uploading\.com\/(?:\w\w\/|)files\/(?:\w*)\//;	
			}	
				
		var checkedlinksRegExpid = /(alive_link|adead_link|unava_link)/;

		var all = [];
		var allff = [];
		var allnl = [];
		var allmu = [];
        var allhf = [];
        var alldf = [];
		var allup = [];
		
		muid = 0;
		//for (var i = links.length - 1; i >= 0; i--) {
		for (var i = 0; i <links.length; i++) {	
			if ((links[i].href.search(myrapidshareRegExp0) != -1) || (links[i].href.search(myrapidshareRegExp1) != -1) || (links[i].href.search(myrapidshareRegExp2) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) {
				var urll = links[i].href;
				numberofrslinks++;
				urll = urll.replace(/^.*?http:\/\/rapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/^.*?http%3A%2F%2Frapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/^.*?http:\/\/(?:|rs\w*\.)rapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/^.*?http%3A%2F%2F(?:|rs\w*\.)rapidshare/gi, 'http://rapidshare');
				urll = urll.replace(/\?killcode=[\d]*/gi, '');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':'); 
				//if (i == 100 || i == 200 || i == 300 || i == 400 || i == 500 || i == 600 || i == 700 || i == 800 || i == 900 || i == 1000 || i == 1100 || i == 1200 || i == 1300 || i == 1400 || i == 1500 || i == 1600 || i == 1700 || i == 1800 || i == 1900 || i == 2000 || i == 2100 || i == 2200 || i == 2300){ // well this is about 2500 links  i don't think memory can handle more (even this is too much)
				//all.push('xxxczxczxcsasdasdasdx4234');
				//}
				var myString = '' + numberofrslinks + '';
				if ( (myString.search(/\d00/) != -1) || (myString.search(/\d50/) != -1) || (myString.search(/50/) != -1)){
					all.push('xxxczxczxcsasdasdasdx4234');
				}
				all.push(urll);
			}
			// filefactory
			if ((links[i].href.search(myfilefactoryRegExp) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { //if (links[i].href.search(myfilefactoryRegExp) != -1) {
				var urll = links[i].href;
				numberoffflinks++;
				urll = urll.replace(/^.*?http:\/\/www\.filefactory/gi, 'http://www.filefactory');
				urll = urll.replace(/^.*?http%3A%2F%2Fwww\.filefactory/gi, 'http://www.filefacory');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				var myString = '' + numberoffflinks + '';
				if (myString.search(/\d00/) != -1) {
					allff.push('xxxczxczxcsasdasdasdx4234');
				}
				allff.push(urll);
			}
			// depositfiles  
			if ((links[i].href.search(mydepositfilRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofdflinks++;
				urll = urll.replace(/^.*?http:\/\/depositfiles/gi, 'http://depositfiles');
				urll = urll.replace(/^.*?http%3A%2F%depositfiles/gi, 'http://depositfiles');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				var myString = '' + numberofdflinks + '';
				if (myString.search(/\d00/) != -1) {
					alldf.push('xxxczxczxcsasdasdasdx4234');
				}
				alldf.push(urll);
			}
			// uploading.com 
			if ((links[i].href.search(myuploadifilRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofuplinks++;
				urll = urll.replace(/^.*?http:\/\/uploading/gi, 'http://uploading');
				urll = urll.replace(/^.*?http%3A%2F%uploading/gi, 'http://uploading');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				var myString = '' + numberofuplinks + '';
				if (myString.search(/\d00/) != -1) {
					allup.push('xxxczxczxcsasdasdasdx4234');
				}
				allup.push(urll);
			}							
			// hotfile  
			if ((links[i].href.search(myhotfilecomRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { 
				var urll = links[i].href;
				numberofhflinks++;
				urll = urll.replace(/^.*?http:\/\/hotfile/gi, 'http://hotfile');
				urll = urll.replace(/^.*?http%3A%2F%hotfile/gi, 'http://hotfile');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				var myString = '' + numberofhflinks + '';
				if (myString.search(/\d00/) != -1) {
					allhf.push('xxxczxczxcsasdasdasdx4234');
				}
				allhf.push(urll);
			}			
			// netload
			if ((links[i].href.search(mynetloadinRegExp0) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { //if (links[i].href.search(myfilefactoryRegExp) != -1) {
				var urll = links[i].href;
				numberofnllinks++;
				urll = urll.replace(/^.*?http:\/\/netload/gi, 'http://netload');
				urll = urll.replace(/^.*?http%3A%2F%2Fnetload/gi, 'http://netload');
				urll = urll.replace(/%2F/gi, '/');
				urll = urll.replace(/%3A/gi, ':');
				var myString = '' + numberofnllinks + '';
				if (myString.search(/\d00/) != -1) {
					allnl.push('xxxczxczxcsasdasdasdx4234');
				}
				allnl.push(urll);
			}
			// megaupload 
			if ((links[i].href.search(mymegauploadRegExp0) != -1) || (links[i].href.search(mymegauploadRegExp1) != -1) || (links[i].href.search(mymegauploadRegExp2) != -1) && (!(links[i].id.match(checkedlinksRegExpid)))) { //if (links[i].href.search(mymegauploadRegExp) != -1) {
				var urll = links[i].href;
					numberofmulinks++;
					urll = urll.replace(/^.*?http:\/\/www\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
					urll = urll.replace(/^.*?http%3A%2F%2Fwww\.(?:megaupload|megarotic|megaporn)\.com\/(?:|..\/)\?d=/gi, 'id' + muid + '=');
					urll = urll.replace(/%2F/gi, '/');
					urll = urll.replace(/%3A/gi, ':');
					urll = urll.replace(/%3F/gi, '?');
					urll = urll.replace(/%3D/gi, '=');
					muid++;
				var myString = '' + numberofmulinks + ''; //if (myString.search(/\&id99/) != -1) //mporei mexri 99 apotelesmata tin fora
					allmu.push(urll);
			}
		}
		all = all.join();
		all = all.replace(/,/gi, '\n');
		var all = all.split("xxxczxczxcsasdasdasdx4234");
		
		allff = allff.join();
		allff = allff.replace(/,/gi, '\n');
		var allff = allff.split("xxxczxczxcsasdasdasdx4234");
		
		allnl = allnl.join();
		allnl = allnl.replace(/,/gi, '\n');
		var allnl = allnl.split("xxxczxczxcsasdasdasdx4234");	
		
		alldf = alldf.join();
		alldf = alldf.replace(/,/gi, '\n');
		var alldf = alldf.split("xxxczxczxcsasdasdasdx4234");	
		
		allup = allup.join();
		allup = allup.replace(/,/gi, '%0A');
		var allup = allup.split("xxxczxczxcsasdasdasdx4234");	
				
		allhf = allhf.join();
		allhf = allhf.replace(/,/gi, '\n');
		var allhf = allhf.split("xxxczxczxcsasdasdasdx4234");	
					
		allmu = allmu.join();
		allmu = allmu.replace(/,/gi, '&');
		var allmu = allmu.split("xxxczxczxcsasdasdasdx4234");
		
		if (((numberofrslinks > 0) || (numberofhflinks > 0) || (numberofdflinks > 0) || (numberofuplinks > 0) || (numberoffflinks > 0) || (numberofnllinks > 0)|| (numberofmulinks > 0)) && !(document.getElementsByTagName('RSLC')[0])) {
			add_RSLC_style();
		}
		if (numberofrslinks > 0) { 
			getlinkschecked(all); 
		}
		if (numberoffflinks > 0) {
			getfflinkschecked(allff);
		}
		if (numberofnllinks > 0) {
			getnllinkschecked(allnl);
		}
		if (numberofdflinks > 0) {
			getdflinkschecked(alldf);
		}
		if (numberofuplinks > 0) {
			getuplinkschecked(allup);
		}					
		if (numberofhflinks > 0) {
			gethflinkschecked(allhf);
		}		
		if (numberofmulinks > 0) {
			getmulinkschecked(allmu);
		}
		function getlinkschecked(all) {
			//window.setTimeout(function() {
					for (var i = all.length - 1; i >= 0; i--) {

						LinksTodo = all[i].split("\n");

						if (LinksTodo.length < 1) {
							return false;
						}

						var fileids = "";
						var filenames = "";

						for (x in LinksTodo) {
							var eintrag = LinksTodo[x];
							var logregex = /files\/(\d{7,9})\/(\S*)/;
							var teile = logregex.exec(eintrag);
							if ( (null != teile) && (null != teile[1]) && (null != teile[2]) && (teile[1]!='') && (teile[2]!='') ){
								fileids += "," + teile[1];
								filenames += "," + teile[2];
							}
						}
						fileids = fileids.substr(1);
						filenames = filenames.substr(1);
						var apirapidshareurl = "http://api.rapidshare.com/cgi-bin/rsapi.cgi?sub=checkfiles_v1&files=" + encodeURI(fileids) + "&filenames=" + encodeURI(filenames)+"&incmd5=1";
						GM_xmlhttpRequest({
							method: "get",
							url: apirapidshareurl,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Content-type': 'text/html'
							},
							onload: function(result) {
								res = result.responseText;
								notfound = res.match(/(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(0|4|5),(Shorthost|.*?),(md5|0|\w{32})/g);
								livelink = res.match(/(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(1|2|6),(Shorthost|.*?),(md5|0|\w{32})/g);

								if (notfound) {
									var fotfoundlinks = new Array();
									for (var i = notfound.length - 1; i >= 0; i--) {
										var string = notfound[i];
										var regex = /(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(0|4|5),(Shorthost|.*?),(md5|0|\w{32})/;
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
										var regex2 = /(fileid|\d{7,9}),(filename|.*?),(size|\d*),(ServerID|\d*),(1|2|6),(Shorthost|.*?),(md5|0|\w{32})/;
										matchArraylive = string.match(regex2);								
										livelinklinks.push(matchArraylive[1]);
										livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[3] + '+%%+name=' + matchArraylive[2] + '+%%+##');
									}
										
									if (livelinklinksplus) {
										DiplayTheMULiveLinks(livelinklinksplus);
									}
								}
						// senting links to database start		
                        if ((!notfound) && (livelink) && Send_the_urls_of_the_pages_you_are_checking_in_the_open_database) { // if on the page are only alinve links 
                        
                            if (document.title == '') {
                                documentotitle = 'no title';
                            } else {
                                documentotitle = document.title.replace(/rapidshare/, '');
                            } // fixing an empty title
                            address = encodeURIComponent(all);
                            address = address.replace(/http%3A%2F%2Frapidshare.com%2Ffiles%2F/g, "f6kg4w"); // f6kg4w doesn't exist in google so is very rare word this is a kind of encoding so the message transfered will be smaller
                            data = 'title=' + documentotitle + '&original_URL=' + encodeURIComponent(document.URL) + '&password=' + password + '&username=' + username + '&info=' + document.lastModified + '&submit=Enter+information';
                            site = 'http://hosts.890m.com/add_to_database.php'; //site = 'http://localhost/ftp.hosts.890m.com/public_html/add_to_database_from_userscript.php';
                            //window.setTimeout(function() {
                                GM_xmlhttpRequest({
                                    method: "POST",
                                    url: site,
                                    headers: {
                                        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                                        'Content-type': 'application/x-www-form-urlencoded'
                                    },
                                    data: data,
                                    onload: function(result) { 
                                    	//GM_log("data = "+data);
                                        //GM_log("site to send = "+site);
                                        //GM_log("result.responseText = "+result.responseText);
                                        //res=result.responseText;
                                    }
                                });
                            //},1);
                        }								
						// senting links to database end							
							}
						});		
					}
				//}, 1);
		} //---
		function getfflinkschecked(all) {
			//window.setTimeout(function() { // can check 10000 Bites of links so all.join('\n').length <= 10000
				for (var i = all.length - 1; i >= 0; i--) { //_log('all.join.length '+all.join('\n').length);               
					GM_xmlhttpRequest({
						method: "POST",
						url: 'http://www.filefactory.com/tools/link_checker.php',
						headers: {
							'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
							'Content-type': 'application/x-www-form-urlencoded'
						},
						//data:'links='+encodeURIComponent(all[i]),  // or all.join('\n') is good also
						data: 'func=links&links=' + all[i],
						// or all.join('\n') is good also
						onload: function(result) {
							res = result.responseText.replace(/\t*/g, '');
							res = res.replace(/\r\n/g, ''); 
							
							livelink = res.match(/<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(?:.*?)<\/div>\n<\/td>\n<td>(?:.*?)<\/td>/g); //livelink = res.match(/<tr valign='top' style='color:green;'><td>(?:.*?)<\/td><td style="text-align:right;">(?:.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/g);
							notfound = res.match(/<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/g); //notfound = res.match(/<td>File &quot;(?:.*?)&quot; does not exist<\/td><td style=\"text-align:right;\">0 B<\/td><td style=\"text-align:right;\">Invalid/g);
							if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/; //var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
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
									var regex2 = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(.*?)<\/div>\n<\/td>\n<td>(.*?)<\/td>/; //var regex2 = /<tr valign='top' style='color:green;'><td>(.*?)<\/td><td style="text-align:right;">(.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/;
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
			//},1);
		}
		
		function getuplinkschecked2(allup){
			
              dataup = 'urls=http%3A//uploading.com/files/upload/';
        GM_xmlhttpRequest({
						method: "post",
						url: 'http://uploading.com/files/checker/',
						headers: {
							"Content-type": "application/x-www-form-urlencoded"
						},
						data: dataup,  
						onload: function(result) {
						res = result.responseText;
						
							}});
			
			}
		
		function getuplinkschecked(allup,times) {
			if(times){times++;}else{
				times = 1;
				}
			//window.setTimeout(function() {
			for (var i = 0; i < allup.length; i++) { 
				var alluptopost = allup[i];
                    alluptopost = alluptopost.replace(/\:/g,'%3A');
				var dataup =  "urls="+alluptopost;
				var foo = new Date; // Generic JS date object
				var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
				var unixtime = parseInt(unixtime_ms / 1000);				
				//var randomnumber=Math.floor(Math.random()*155266371596);
				var randomnumber=(unixtime*123);
				var upurl = 'http://uploading.com/files/checker/?JsHttpRequest='+randomnumber+'-xml';
        GM_xmlhttpRequest({
						method: "post",
						url: upurl,
						headers: {
							"Content-type": "application/x-www-form-urlencoded"
						},
						data: dataup,  
						onload: function(result) {							
						res = result.responseText;						
						if (res.match(randomnumber)){
						  res = res.replace(/\\n/g,'').replace(/\\t/g,'').replace(/\\/g,'');
                          notfound = res.match(/<tr><td class="tleft"><a href="http:\/\/uploading\.com\/files\S*?\/" style="color: #696361;\" target=\"_blank\">(http:\/\/uploading\.com\/files\S*?)\/<\/a><\/td><td>Deleted/g); 
					      livelink = res.match(/target="_blank">(http:\/\/uploading\.com\/files\S*?)\/<\/a><\/td><td>Active<\/td><td>(size|\d.*? .*?)<\/td>/g); 
			                if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<tr><td class="tleft"><a href="http:\/\/uploading\.com\/files\S*?\/" style="color: #696361;\" target=\"_blank\">http:\/\/uploading\.com\/files(\S*?)\/<\/a><\/td><td>Deleted/;
									matchArrayff = string.match(regex);
									matchArrayfflink =  matchArrayff[1];
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
									var regex2 = /target="_blank">http:\/\/uploading\.com\/files(\S*)\/<\/a><\/td><td>Active<\/td><td>(size|\d.*? .*?)<\/td>/;
									matchArraylive = string.match(regex2);
									var hffilename1 = matchArraylive[1].replace(/^\/(?:.*?)\/(.*?$)/,'$1');
									livelinklinks.push(matchArraylive[1]);
									livelinklinksplus.push('+%%+id=' + hffilename1 + '+%%+size=' + matchArraylive[2] + '+%%+name=' + hffilename1 + '+%%+##');
								}
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								} 
							}            
			  						
							    }else{
								if(times == 10)return;
								window.setTimeout(function() {
							    getuplinkschecked(allup,times);
								},1000);	
								}
						}
											  
					});
			  }
			//},1);
		}			
		function getdflinkschecked(alldf) {
			//window.setTimeout(function() {
			for (var i = 0; i < alldf.length; i++) { 
				var alldftopost = alldf[i];
				var datadf =  "links="+encodeURIComponent(alldftopost)+"&i="+i;
        GM_xmlhttpRequest({
						method: "post",
						url: 'http://depositfiles.com/en/links_checker.php',
						headers: {
							"Content-type": "application/x-www-form-urlencoded"
						},
						data: datadf,  
						onload: function(result) {
						res = result.responseText;
          var dfres = eval('(' + res + ')');          
          if(dfres.links_deleted.length!=0){
          	var notfound=true;          	
          	}else{
          	var notfound=false;	
          		}
          if(dfres.links_existed.length!=0){          	
          	var livelink=true;
          	}else{
          	var livelink=false;	
          		}
                if (notfound) {
								var fotfoundlinks = new Array();
								for(i in dfres.links_deleted){
								fotfoundlinks.push(dfres.links_deleted[i].id_str);	
									}
								if (fotfoundlinks) {
									DiplayTheDeletedLinks(fotfoundlinks);
								}
							}
							if (livelink) {
								var livelinklinksplus = new Array();
								for(i in dfres.links_existed){
									livelinklinksplus.push('+%%+id=' + dfres.links_existed[i].id_str + '+%%+size=' + dfres.links_existed[i].size + '+%%+name=' + dfres.links_existed[i].filename + '+%%+##');							
									}
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								} 
							}
						}
											  
					});
			  }
			//},1);
		}		
		function gethflinkschecked(allhf) {
			//window.setTimeout(function() {
			for (var i = allhf.length - 1; i >= 0; i--) { 
				datashf = allhf[i];
				
        GM_xmlhttpRequest({
						method: "post",
						url: 'http://hotfile.com/checkfiles.html',
						headers: {
							"Content-type": "application/x-www-form-urlencoded"
						},
						data: "files="+encodeURIComponent(datashf)+"&but=+Check+Urls+",  
						onload: function(result) {
							res = result.responseText;
							res = res.replace(/\r\n/g,'');
							res = res.replace(/\n/g,'');
							res = res.replace(/\t/g,'');

					notfound = res.match(/<td>(http\:\/\/hotfile\.com\/dl\/.*?)<\/td><td>N\/A<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: red\;\">Non\-existent<\/span>/g); 
					livelink = res.match(/<td><a href=\"(http\:\/\/hotfile\.com\/dl\/.*?)\">(?:http:\/\/hotfile\.com\/dl\/.*?)<\/a><\/td><td>(size|.*?)<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: green\">Existent<\/span>/g); 
              if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									var regex = /<td>(http\:\/\/hotfile\.com\/dl\/.*?)\/.*?<\/td><td>N\/A<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: red\;\">Non\-existent<\/span>/; //var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
									matchArrayff = string.match(regex);
									matchArrayfflink =  matchArrayff[1];
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
									var regex2 = /<td><a href=\"(http\:\/\/hotfile\.com\/dl\/.*?)\/(.*?)\">(?:http:\/\/hotfile\.com\/dl\/.*?)\/(.*?)<\/a><\/td><td>(size|.*?)<\/td><td style=\"paddding-left\: 15px\;\" nowrap><span style=\"color\: green\">Existent<\/span>/;
									matchArraylive = string.match(regex2);
									var hffilename1 = matchArraylive[2].replace(/.*\/(.*?$)/,'$1');
									livelinklinks.push(matchArraylive[1]);
									livelinklinksplus.push('+%%+id=' + matchArraylive[1] + '+%%+size=' + matchArraylive[4] + '+%%+name=' + hffilename1 + '+%%+##');
								}
								if (livelinklinksplus) {
									DiplayTheMULiveLinks(livelinklinksplus);
								} 
							}
						}
											  
					});
				
			}
			//},	1);
		}				
	function getnllinkschecked(all) {
	  //window.setTimeout(function() { 
      for (var i = all.length - 1; i >= 0; i--) {
          alltobeids = all[i].replace(/\n/g,'');
		  fileids =  alltobeids.match(/\/datei(\w*)/g);
		  fileids = fileids.join('').replace(/\/datei/g,';');
          fileids = fileids.replace(/^;/,'auth=Cf5Td0g4FDsxWsRHSKyeiKIjomw0Jicy&file_id=');
          fileids = fileids.replace(/$/,'&bz=1');
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "http://api.netload.in/info.php",
					  data: fileids,
					  headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  onload: function(result){
						res = result.responseText;
						livelink = res.match(/(nfileid|.*?);(nfilename|.*?);(size|.*?);online/g); 
						notfound = res.match(/(nfileid|.*?);(nfilename|.*?);(size|.*?);offline/g); 
                            if (notfound) {
								var fotfoundlinks = new Array();
								for (var i = notfound.length - 1; i >= 0; i--) {
									var string = notfound[i];
									//var regex = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)<\/div>\n<\/li>/; //var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
									var regex = /(nfileid|.*?);(nfilename|.*?);(size|.*?);offline/; //var regex = /<td>File &quot;(.*?)&quot; does not exist<\/td><td style="text-align:right;">0 B<\/td><td style="text-align:right;">Invalid/;
									
									matchArrayff = string.match(regex);
									//matchArrayff[1] = "http://www.filefactory.com/file/" + matchArrayff[1];
									//matchArrayfflink = "http://netload.in/datei" + matchArrayff[1]+"/"+matchArrayff[2];
									matchArrayfflink = "http://netload.in/datei" + matchArrayff[1];
									//http://netload.in/dateied02441bf67c190f32bebeb13ced173d/Stardust.R5.LINE.XViD-mVs.part15.rar.htm
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
									//var regex2 = /<div class="metadata">http:\/\/www.filefactory.com\/file\/(.*?)\/n\/(.*?)<\/div>\n<\/td>\n<td>(.*?)<\/td>/; //var regex2 = /<tr valign='top' style='color:green;'><td>(.*?)<\/td><td style="text-align:right;">(.*?)<\/td><td style="text-align:right;">Valid<\/td><td style="text-align:right;"><a href="http:\/\/www.filefactory.com\/file\/(.*?)\/n\/.*?" title="Go to the file download page">View Page/;
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
			//},1);
		}			
	  function getnllinkschecked2(all) {
			//window.setTimeout(function() { 
       for (var i = all.length - 1; i >= 0; i--) { //_log('all.join.length '+all.join('\n').length);  
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "http://api.netload.in/index.php\?id=2",
					  data: "links="+escape(all[i])+"&send=Absenden",
					  headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					  },
					  onload: function(result) {				
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
			//},1);
		}	
		function getmulinkschecked(allmu) {
			for (var i = allmu.length - 1; i >= 0; i--) { // can check 10000 Bites of links so all.join('\n').length <= 10000
				datas = allmu[i];
				//window.setTimeout(function() {
					GM_xmlhttpRequest({
						method: "post",
						url: 'http://megaupload.com/mgr_linkch' + 'eck.php',
						headers: {
							"Content-type": "text/html"
						},
						data: datas,
						onload: function(result) {
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
								} //if (livelinklinks){
								//DiplayTheLiveLinks(livelinklinks);
								//}
							}
						}
					});
				//},1);
			}
		}
		
		function DiplayTheDeletedLinks(fotfoundlinks) {
			var xpathoffotfoundlinks = "//a[contains(@href,\'" + fotfoundlinks.join('\') or contains(@href,\'') + "\')]";
			var allLinks, thisLink;
			allLinks = document.evaluate(xpathoffotfoundlinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allLinks.snapshotLength; i++) {
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
			} // another way slower 
			// var links = document.getElementsByTagName('a');
			//  for (var i = links.length - 1; i >= 0; i--) {
			// 	 if ( (links[i].href.indexOf("rapidshare.de/files/") != -1) || (links[i].href.indexOf("rapidshare.com/files/") != -1) || (links = fotfoundlinks)) {	
			//   
			// 
			//      for (var k = 0; k < fotfoundlinks.length; k++){
			//     	if (links[i] == fotfoundlinks[k]){
			//     	links[i].appendChild(document.createTextNode(' NOT FOUND'));
			//    		// OR 
			//    		links[i].style.fontStyle = 'italic';
			//    		                                 }
			//                                    }
			//    	                        }
			//                      }
		}
		function DiplayTheMULiveLinks(livelinklinksplus) {
			var mylivelinklinksplusString = new String(livelinklinksplus);
			var livelinklinksplussplited = new Array();
			livelinklinksplussplited = mylivelinklinksplusString.split('##');
			for (var i = 0; i < (livelinklinksplussplited.length - 1); i++) {
				var matchArrayidmu = new Array();
				var regexid = /\+%%\+id=(.*?)\+%%\+/;
				matchArrayidmu = livelinklinksplussplited[i].match(regexid);
				var regexsizenumber = /\+%%\+size=(\d{1,})\+%%\+/;
				var regexsize = /\+%%\+size=(.*?)\+%%\+/;
				if (livelinklinksplussplited[i].match(regexsizenumber)) {
					var matchArraysize = livelinklinksplussplited[i].match(regexsizenumber);
					var size = matchArraysize[1];
					var size2 = (parseFloat(size) / 1048576); // 1024 * 1024 = 1048576                                                                                                                                                                             get more script from the original author of this script from http://userscripts.org/users/18004/scripts , copy-paste lamers are stupid
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
				for (var y = 0; y < muallLinks.snapshotLength; y++) {
					var muthisLink = muallLinks.snapshotItem(y);
					if (! (muthisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
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
					}
					if (No_live_links) {
						delinkify(muallLinks.snapshotItem(y), muthisLink.id);
					}
				}
			}
		}	
		function DiplayTheLiveLinks(livelinklinks) {
			var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') + "\')]"; //var xpathoflivelinklinks = "//a[contains(@href,\'" + livelinklinks.join('\') or contains(@href,\'') +"\') and not(contains(@href,'google'))]";
			var allliveLinks, thisLink;
			
			allliveLinks = document.evaluate(xpathoflivelinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			   rslivexpath = xpathoflivelinklinks;
							 
			for (var i = 0; i < allliveLinks.snapshotLength; i++) {
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) // {
				{
					thisLink.id = 'alive_link'; 
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
			}
		}
		
		Array.prototype.exists = function(search) {
			for (var i = 0; i < this.length; i++)
				if (this[i] == search)
					return true;
			return false;
		}
		
		function DiplayTheTempAvailableLinks(tempanavlinklinks) {
			var xpathoftempanavlinklinks = "//a[contains(@href,\'" + tempanavlinklinks.join('\') or contains(@href,\'') + "\')]";
			var allliveLinks, thisLink;
			allliveLinks = document.evaluate(xpathoftempanavlinklinks, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allliveLinks.snapshotLength; i++) {
				var thisLink = allliveLinks.snapshotItem(i);
				if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
					thisLink.id = 'unava_link';
				}
				if (No_live_links) {
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}
			}
		}
		

	
		
		if (Display_page_stats) {
			var now = new Date(); 
			var lasttime = now.getTime();
			var numberoflinks = numberofrslinks + numberoffflinks + numberofnllinks + numberofdflinks + numberofuplinks + numberofhflinks + numberofmulinks
			var runningtime = lasttime - firsttime;
			if (numberoflinks > 0) {
				GM_log('Total number of links: ' + 
				numberoflinks + '\r\nPage title: ' + document.title + 
				'\r\nrapidshare.com links : ' + numberofrslinks + 
				'\r\nfilefactory.com links : ' + numberoffflinks + 
				'\r\nnetload.in links : ' + numberofnllinks + 
				'\r\ndepositfiles.com links : ' + numberofdflinks + 
				'\r\nuploading.com links : ' + numberofuplinks + 
				'\r\nhotfile.com links : ' + numberofhflinks + 
				'\r\nmegaupload.com megaporn.com megarotic.com links : ' + numberofmulinks + 
				'\r\nRapidshare Links Checker\r\nTime to complete checking in seconds: ' + (runningtime / 1000) + 
				'\r\nTime to complete checking in milliseconds: ' + runningtime + 
				'\r\nLocation: ' + document.location);
			}
		}
	}

	function Check_The_Links_In_This_Page(){
		check(Send_the_urls_of_the_pages_you_are_checking_in_the_open_database,Show_black_background_in_dead_links,Show_line_through_in_dead_links,Remove_html_from_rapidshare_urls,No_live_links,Show_info_in_tooltip,Display_page_stats,Destyling_google_cache,firsttime);
	}
	if(Autocheck_links_on_page_load) Check_The_Links_In_This_Page();
	
		
	function check_all_links(){
	  Check_The_Links_In_This_Page();
	  start();
    }

    if(Add_menu_commands) GM_registerMenuCommand("[Rapidshare Links Checker] Check The Links In This Page", check_all_links, "w", "shift alt", "q");


	function closeConfigurationBox(){
		configurationBox = document.getElementById('hideshow');
		configurationBox.parentNode.removeChild(configurationBox);
	}

	function configuration(){
		var  configcss = '\
		#h3hideshowtitle{\
		 font-size: 2em;\
		}\
		#h3hideshow{\
		 font-size: 1.5em;\
		}\
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
		 color:black;\
		 background: #ddd;\
		 padding: 10px 20px;\
		 border: 10px solid #fff;\
		 float: left;\
		 width: 728px;\
		 position: absolute;\
		 top: 2%;\
		 left: 40%;\
		 margin: 0 0 0 -292px;\
		 -moz-border-radius:10px;\
		 z-index: 100;\
		\
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
		#h3hideshow{\
		 margin: 1px 0 0px;\
		 padding: 1px 10px;\
		 border-bottom: 1px solid #bbb;\
		 font-size: 1.5em;\
		 font-weight: normal;\
		 cursor:pointer;\
		 background:#DDDDDD none repeat scroll 0 0;\
		}\
		#h3hideshow:hover{\
		background:#C0BEBE none repeat scroll 0 0;\
		}\
		#h3hideshowtitle{\
		 margin: 8px 0 0px;\
		 padding: 1px 10px;\
		 border-bottom: 1px solid #bbb;\
		 font-size: 2.5em;\
		 font-weight: normal;\
		}\
		.popup a {\
		 color:DarkSkyBlue;\
		 text-decoration:none;\
		}\
		.popup p {\
		 padding: 1px 10px;\
		 margin: 0px 0;\
		 -x-system-font:none;\
		 font-family:verdana,geneva,lucida,"lucida grande",arial,helvetica,sans-serif;\
		 font-size:10pt;\
		 font-size-adjust:none;\
		 font-stretch:normal;\
		 font-style:normal;\
		 font-variant:normal;\
		 font-weight:normal;\
		 line-height:normal;\
		}\
		#sites {\
		 padding: 1px 10px;\
		 margin: 0px 0;display:inline-block;width:17em;\
		}\
		.popup img.cntrl {\
		 position: absolute;\
		 right: -20px;\
		 top: -20px;\
		}\
		#h3hideshowcontent {\
		max-height:279px;\
overflow:auto;\
		 display: none;\
		 padding: 10px 10px;\
		}\
		#specinfo{\
		font-size:14px;\
		}\
		';

		GM_addStyle(configcss);

		function makecheckbox(id) {
			checkbo_x = "<input_type='checkbox'_class_='checkboxconfig'_value='"+id+"'_name='"+id+"'_id='"+id+"'/>"; //false
			return checkbo_x;
		}

		//close image and css taken from = http://www.sohtanaka.com/web-design/examples/css-popup    icon_close.png;
		var  configurationinnerHTML = '\
		  <div id="fade"></div>\
		  <div class="popup_block">\
			<div class="popup">\
				<a href="#"><img id="imghideshow" title="Close" class="cntrl" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAY1SURBVHjapFZbbFRVFN0zd6Yz08dMoUNf9EGxUItJK62I4AOJEYiQoqE+0OgHCiqG+PgQozH6ofyIJiYEMRqNJpggHySlrRM+hCAtajAUaGgEi9BBSilMO0PnfWeOa597bjt9AEVvsubOPWefs/br7H0sQgj6P4/FYrk9+WkSuoAHgCrgLvV9DLgMdID02rQZmfAmaAJaxS2edDr9s67rL7EB/9XCUuALoEl+pZJEvTAo8A9s6iVKxojKYWheAWxuIMr2GGKp1KHh4eF3vF4vW59me6ZD2Ajsle6LXify7SI68iNROIgtIKtpBvQEB5DI7iC6Zw3Rmi1EM0vlBsFg8OX8/PxvWQdFKm5E2KhiQ9R9iOjL17E6QFRUhAGQpFNjklYrhhT6YbndTtT8LtGjG+T0lStXNhcVFTGpnkE8jpAT4hdgNvm+Ivr+AyIHtM+Fu3Ss0RUZO8pqqos/NiDLblgcQO48/CzRpk/l9KlTp56oq6s7gL8JkzST0AespN9/Itq2Hu7xQnsbRFOcWSBKT50FVpMUHrBD/iKsXb+V6KmtFI/H/3Q6nZzdEZPU1PVFSXbtEoltz0Nzm2HRqleIvjsLa/9CoiSnBs99cwaym4lCYSRSHr4/REg64SBHTX9//2fqGNmVevJ5jn/0Xe+Rhd2SBVdGkInr3hizZI8fOibGg8fM5/EthgIJwxPJ7a/Jd05Ozn14uQEHGRGXsVtOIwHS2nbDlTOIYlHoMoUL9w0Q/GSA/0/KeXglFmEWsp/uIjp9FAbnzWttbV3H3ECWFWdnubTuSBulQ9AwDs2jcSPGby6evGn7sIGJzwuzDUViMekdAZ0jrXvlVGVl5RK8ctlKq6ZpHFSKdBzCwSVjQRILAzh3508TPe29dbl6ZibiB/lrQeWBGFmykGe/dcjpwsLCeuVWpw1ZWskFWO/rM45ZNGWkPXt0ZIR/iJbigHfeoOYuU9UsbmbtWI2x+i+acWSt8yShCiaJVFwq50zeZrsYmapAgz/KFCmzo2gqhk7WJ8SDCY+bomF2qdI2E3/cpKPwXKYs1qdAlozwnjlSJBaLcbVxyqRBlT8rB+fUkJuzGotEXB1TRvc02hfLKHk9btT6BCyPzJ0rpwcGBoLqHGpWVIMjsmLVPkTZhXgbMacUW3pGTB2z+4HA5fHjkE3EDELeYyaSJjx/qZzq6uq6pKJrsR4/flwSeh98mIbmVpET7khBU20qw+4GEbda1ndZyaTpLDLWOtnSchdZVj4pxw8fPuzPLOD2SCSylxvpr9u3C1GDylkClAM73xrrsnfiu4JErMCAqAIW0Nj8DsiWktBnGXJdr24QiURCTuXm5n4MnmZWmQm1EydOPMITg4ODom/VEiHKsGgOyQ14sSQvJhF2j8eoYhXGvPzGmqF7K0V3d7ckQ5XhHHkbeAyoNU9ODpqmvEp0dHSIQEOVsRhWjGSTuOq4OQJOMpQEWXS+RxzYs0cgGSUhCvgO7L+Jg6DKqLyHOGpra0tYgAV9Pp/oX1wnBLunXlnrgVXYfEAzEMzCmFsRLSIpG6opFa27d4twOCzJWlpa2Lr3lTsXAiUmIRcAN1z6Awuy7zs7O8WxjRtFvDDH2JhJG4ClCo1AtUGq59tEz9q1UlGTrK2t7QL2/ATYKJsDUTUwQzZgVAKrSrI89K+dxcXFzbiJUR/K3cmTJ2nWwYNUcfQoeS+cJcdwQGZeIjuHAmV30KWGBjq/YgUtWLiQqquryWazUXt7u3/16tX7IIYbF50D+vjWwUXGJLQYlxZZDdx+v//zsrKyZtnX0ONwcAnWUygUQhtMSELeGK2HCgoKqKSkhNDZ5fj+/fvPNTU1teDvBQW/IuMWEx29g6rkYSv5zlfu8Xgae3p6fGKaD1z4N0i/xtqPALR/WgssAuawK1XNto7eaZSVVhVPl6ruM9Baiuvr6+fBzRUul2sWxPKQWA5Yqg0NDekIwfXe3t4h3EfZ10PAVWXRIMBj16VlRvFLj7smTiB1qArPxPnKcrdqpE5VG0lVEC6EYdUIgsp9ITXGc0mzaU26CGeQampTp7I4W8GlXK/R2MUxoTaOZMAk0jNv4VNe9RXpRGK7IrIrD2QS6mrzpCKfSDRK8q8AAwCF/L1ktjcKFAAAAABJRU5ErkJggg%3D%3D"/></a>\
			<div id="h3hideshowtitle">Rapidshare Links Checker UserJS Configuration</div>\
			<div id="h3hideshow">Select Sites to Check</div><div id="h3hideshowcontent">\
				<p id="specinfo">The following sites are checked in bulk, you <b>don\'t need to disable auto-download</b> if you are a premium member</p>\
				<div id="sites"><span id="Check_rapidshare_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_filefactory_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_megaupload_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_megarotic_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_megaporn_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_megavideo_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_netload_dot_in_links"></div></span> \
				<div id="sites"><span id="Check_hotfile_dot_com_links"></div></span> \
				<div id="sites"><span id="Check_depositfiles_dot_com_links"></div></span>\
				<div id="sites"><span id="Check_uploading_dot_com_links"></div></span> <br/><hr/>\
				<p id="specinfo">The following sites are not checked in bulk, you <b>need to disable auto-download</b> if you are a premium member otherwise the checked links <b style="padding: 1px 4px 3px; background: red none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; color: white; -moz-border-radius-topleft: 6px; -moz-border-radius-topright: 6px; -moz-border-radius-bottomright: 6px; -moz-border-radius-bottomleft: 6px;">will be downloaded in the background !!!</b></p>\
<div id="sites"><span id="Check_2shared_dot_com_links"></div></span>\
<div id="sites"><span id="Check_badongo_dot_com_links"></div></span>\
<div id="sites"><span id="Check_bigandfree_dot_com_links"></div></span>\
<div id="sites"><span id="Check_bitroad_dot_net_links"></div></span>\
<div id="sites"><span id="Check_easy_dash_share_dot_com_links"></div></span>\
<div id="sites"><span id="Check_ezyfile_dot_net_links"></div></span>\
<div id="sites"><span id="Check_egoshare_dot_com_links"></div></span>\
<div id="sites"><span id="Check_filebase_dot_to_links"></div></span>\
<div id="sites"><span id="Check_fileop_dot_com_links"></div></span>\
<div id="sites"><span id="Check_gigasize_dot_com_links"></div></span>\
<div id="sites"><span id="Check_duckload_dot_com_links"></div></span>\
<div id="sites"><span id="Check_filebox_dot_com_links"></div></span>\
<div id="sites"><span id="Check_filenavi_dot_com_links"></div></span>\
<div id="sites"><span id="Check_filesend_dot_net_links"></div></span>\
<div id="sites"><span id="Check_files_dot_to_links"></div></span>\
<div id="sites"><span id="Check_getthebit_dot_com_links"></div></span>\
<div id="sites"><span id="Check_good_dot_com_links"></div></span>\
<div id="sites"><span id="Check_jumbofiles_dot_com_links"></div></span>\
<div id="sites"><span id="Check_ifile_dot_it_links"></div></span>\
<div id="sites"><span id="Check_letitbit_dot_net_links"></div></span>\
<div id="sites"><span id="Check_link_dash_protector_dot_com_links"></div></span>\
<div id="sites"><span id="Check_load_dot_to_links"></div></span>\
<div id="sites"><span id="Check_mediafire_dot_com_links"></div></span>\
<div id="sites"><span id="Check_megaftp_dot_com_links"></div></span>\
<div id="sites"><span id="Check_megashares_dot_com_links"></div></span>\
<div id="sites"><span id="Check_oron_dot_com_links"></div></span>\
<div id="sites"><span id="Check_quickupload_dot_net_links"></div></span>\
<div id="sites"><span id="Check_rapidshare_dot_de_links"></div></span>\
<div id="sites"><span id="Check_sendspace_dot_com_links"></div></span>\
<div id="sites"><span id="Check_sharingmatrix_dot_com_links"></div></span>\
<div id="sites"><span id="Check_share_dash_rapid_dot_com_links"></div></span>\
<div id="sites"><span id="Check_storage_dot_to_links"></div></span>\
<div id="sites"><span id="Check_superfastfile_dot_com_links"></div></span>\
<div id="sites"><span id="Check_turbobit_dot_net_links"></div></span>\
<div id="sites"><span id="Check_turboupload_dot_com_links"></div></span>\
<div id="sites"><span id="Check_up_dash_file_dot_com_links"></div></span>\
<div id="sites"><span id="Check_uploadbox_dot_com_links"></div></span>\
<div id="sites"><span id="Check_uploadcell_dot_com_links"></div></span>\
<div id="sites"><span id="Check_uploaded_dot_to_links"></div></span>\
<div id="sites"><span id="Check_usaupload_dot_net_links"></div></span>\
<div id="sites"><span id="Check_vip_dash_file_dot_com_links"></div></span>\
<div id="sites"><span id="Check_yourfilehost_dot_com_links"></div></span>\
<div id="sites"><span id="Check_ziddu_dot_com_links"></div></span>\
<div id="sites"><span id="Check_zshare_dot_net_links"></div></span>\
<div id="sites"><span id="Check_addyour_dot_own_links"></div></span>\
</div>\
			<div id="h3hideshow">Settings - Links Styling</div><div id="h3hideshowcontent">\
				<p><span id="No_live_links"></span> </p>\
				<p><span id="Show_info_in_tooltip"></span> </p>\
				<p><span id="Destyling_google_cache"></span></p>\
				<p><span id="Show_black_background_in_dead_links"></span></p>\
				<p><span id="Show_line_through_in_dead_links"></span></p>\
				<p><span id="Display_page_stats"></span> </p>\
				<p><span id="Autocheck_links_on_page_load"></span> </p>\
				<p><span id="Remove_html_from_rapidshare_urls"></span></p></div>\
			<div id="h3hideshow">Rapidshare Links Database</div><div id="h3hideshowcontent">\
				<p> The rapidshare database (<a href="http://hosts.890m.com">http://hosts.890m.com</a>) is a part of this userscript,\
		 the Rapidshare Links Checker userscript has the ability to sent only the urls of\
		 the pages when all the rapidshare links are alive, no cookies or other private\
		 informations are sent to the database, and you are able to erase the data you send.</p>\
				<p><span id="Send_the_urls_of_the_pages_you_are_checking_in_the_open_database"></p></div>\
			<div id="h3hideshow">About</div><div id="h3hideshowcontent">\
			    <p>'+fileMETA["name"] + ' version: ' + fileMETA["version"]+'</p>\
				<br />\
				<p>' + fileMETA["description"]+'</p>\
				<p>' + fileMETA["details"]+'</p>\
				<br />\
				<p>Author: ' + fileMETA["author"]+'</p>\
				<p>Contributor: ' + fileMETA["contributor"]+'</p>\
				<br />\
				<p>License: '+fileMETA["license"] + '</p>\
				</div>\
				\
			</div>\
		</div>\
		\
		\
		';

		var divhideshow = document.createElement("div");
		divhideshow.id = "hideshow";
		divhideshow.setAttribute('style', 'visibility: visible;');
		divhideshow.innerHTML = configurationinnerHTML;
		document.body.appendChild(divhideshow);

		var imgClose=document.getElementById("imghideshow");

		imgClose.addEventListener("click", closeConfigurationBox, false);
		
		function closeallothersmallconfigs(e){
			notthisone = e.target;
				for (var i=0;i<document.getElementsByTagName('div').length;i++)
				{
					if (document.getElementsByTagName('div')[i].id == 'h3hideshow'){
						if (notthisone == document.getElementsByTagName('div')[i]){
							//console.log('found');
							//console.log(notthisone);
							}else{
							document.getElementsByTagName('div')[i].nextSibling.setAttribute('style','display:none');
							document.getElementsByTagName('div')[i].addEventListener("click", opensmallconfigs, false);	
							}
					}
				}		
		    }
			
        function closesmallconfigs(e){
			var that = e.target.nextSibling;
			that.setAttribute('style','display:none');
			e.target.removeEventListener("click", closesmallconfigs, false);
			e.target.addEventListener("click", opensmallconfigs, false);
			}
			
        function opensmallconfigs(e){
			if(!e.target){e.target = e};
			var that = e.target.nextSibling;
			that.setAttribute('style','display:block');		
			e.target.removeEventListener("click", opensmallconfigs, false);
			e.target.addEventListener("click", closesmallconfigs, false);
			closeallothersmallconfigs(e);
			}

		function changeConfiguration(e){
			if (e.target.tagName == 'INPUT'){
				if(eval(e.target.id)){
					GM_setValue(e.target.id, false);
					var result= 'disabled';
				}else{
					GM_setValue(e.target.id, true);
					var result= 'enabled';
				}
				set_variables();
				//alert(e.target.id.replace(/^Check_/,'Automatic check for ').replace(/_/g,' ').replace(/ dot /g,'.').replace(/ dash /g,'-') + ' is ' + result + '.');
			}
		}

		var existingobject = divhideshow.getElementsByTagName("span");
		
		for (var i = existingobject.length - 1; i >= 0; i--) {
			if (eval(existingobject[i].id)){
				var addition = "checked='checked'";
				}else{
				var addition = "";
				};
					
			existingobject[i].innerHTML =  "<input type='checkbox' class='checkboxconfig' "+addition+"' name='"+existingobject[i].id+"' id='"+existingobject[i].id+"'/>"+existingobject[i].id.replace(/__/g,' ').replace(/_/g,' ');
			existingobject[i].innerHTML = existingobject[i].innerHTML.replace(/Remove html /,'Remove .html ').replace(/ dot /g,'.').replace(/ dash /g,'-').replace(/(Check .*?) links$/g,'$1');
			document.getElementById(existingobject[i].id).addEventListener("click", changeConfiguration, false);

		}
	

		for (var i=0;i<document.getElementsByTagName('div').length;i++)
		{
			if (document.getElementsByTagName('div')[i].id == 'h3hideshow'){
				var h3hideshowelement = document.getElementsByTagName('div')[i];
				h3hideshowelement.addEventListener("click", opensmallconfigs, false);
			}
		}
		
		firstelementtoopen = document.getElementById('h3hideshow');
		opensmallconfigs(firstelementtoopen);

	
	}
	
//configuration();

	if(Add_menu_commands) GM_registerMenuCommand("[Rapidshare Links Checker] Configuration", configuration, null, null, "R");

	function makeTheCheckedLinksToFullURl(){
		var alive_links = document.getElementsByTagName('a');	
		  for (var i = 0; i < alive_links.length; i++) {
			   if (alive_links[i].id == 'alive_link'){
				alive_links[i].innerHTML = alive_links[i].href; 
				}
		  }
	}

	if(Add_menu_commands) GM_registerMenuCommand("[Rapidshare Links Checker] Make The Links To Full Urls", makeTheCheckedLinksToFullURl, "w", "control alt", "w");

})();





function start(){
Show_info_in_tooltip = GM_getValue("Show_info_in_tooltip", false);	

No_live_links = GM_getValue("No_live_links", false);
		var http_file_hosts = new Array();
			

		// OPTIONS
		var replace_co_cc_vault_links = '0'; // '0' or '1' ?
		
		if(Check_addyour_dot_own_links){ 
		var addyour_own= new Array(6)  //http://www.nameofthesite.com/example
		 addyour_own[0]='(?:www.|)nameofthesite\.com\/';       //name and search string in link to get description
		 addyour_own[1]='replace this with text that exists in the page if the file is alive';                              // file_is_alive
		 addyour_own[2]='replace this with text that exists in the page if the file is dead';                            // file_is_dead
		 addyour_own[3]='optional replace this with text that exists in the server has no download slots or the file temporarily unavailable or server error';                 // no download slots or temporarily unavailable or servererror
		 addyour_own[4]="//a[contains(@href,'nameofthesite.com')]";  //xpath of the link
		 addyour_own[5]='optional--'; 
		 addyour_own[6]=' (\\d.*?)';   // size this is a regular expression to find the size of the file \\d means digit 
		 http_file_hosts.push(addyour_own);
		}	
		if(Check_jumbofiles_dot_com_links){ 
		var jumbofiles_com= new Array(6)  //http://jumbofiles.com/szwgli5gr1dv
		 jumbofiles_com[0]='(?:www.|)jumbofiles\.com\/(?:\w*)';       //name and search string in link to get description
		 jumbofiles_com[1]='down_direct';                              // file_is_alive
		 jumbofiles_com[2]='File Not Found';                            // file_is_dead
		 jumbofiles_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 jumbofiles_com[4]="//a[contains(@href,'jumbofiles.com/')]";  //xpath of the link
		 jumbofiles_com[5]='optional--'; 
		 jumbofiles_com[6]='&nbsp; <small>\\((\\d.*?)\\)</small>';   // size this is a regular expression to find the size of the file \\d means digit 
		 http_file_hosts.push(jumbofiles_com);
		}			
		if(Check_load_dot_to_links){ 
		var load_to= new Array(6)  //http://www.load.to/wcp9popmDX/WWE.Hell.In.a.Cell.2009.SDTV.WS.XviD-FWG-WRESTLiNGCONCEPTS.COM.part1.rar
		 load_to[0]='(?:www.|)load\.to\/';       //name and search string in link to get description
		 load_to[1]='"download_table_left">Size';                              // file_is_alive
		 load_to[2]='Can\'t find file';                            // file_is_dead
		 load_to[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 load_to[4]="//a[contains(@href,'load.to')]";  //xpath of the link
		 load_to[5]='optional--'; 
		 load_to[6]='<div class="download_table_right">(\\d.*?)</div>';   // size this is a regular expression to find the size of the file \\d means digit 
		 http_file_hosts.push(load_to);
		}		
		if(Check_easy_dash_share_dot_com_links){
		var easy_share_com= new Array(6)                       //http://w14.easy-share.com/10888291.html
		 easy_share_com[0]="(?:w..\.|)easy-share.com";                   //name and search string in link to get description
		 easy_share_com[1]='dwait';                            // file_is_alive
		 easy_share_com[2]='File not found';                   // file_is_dead
		 easy_share_com[3]='optional--';             // no download slots or temporarily unavailable or servererror                  
		 easy_share_com[4]="//a[contains(@href,'easy-share.com/')]"; 
		 easy_share_com[5]='file is deleted';                  // tos violation
		 easy_share_com[6]=' \\((.*?)\\)</p>';   // size
		http_file_hosts.push(easy_share_com);
		}

		if(Check_mediafire_dot_com_links){
		var mediafire_com= new Array(6)                         //http://www.mediafire.com/?6egyjzxdfkx http://www.mediafire.com/?m5jyontdvwx
		 mediafire_com[0]="(?:www.|)mediafire.com/(?:download.php|\\?)";                  //name and search string in link to get description
		 mediafire_com[1]='You requested';                      // file_is_alive
		 mediafire_com[2]='no longer stored';                   // file_is_dead
		 mediafire_com[3]='optional--';                  // no download slots or temporarily unavailable or servererror                  
		 mediafire_com[4]="//a[contains(@href,'www.mediafire.com/')]"; 
		 mediafire_com[5]='tos_aup_violation';                  // tos violation
		 mediafire_com[6]=' \\((.*?)\\)</div> </div> <div>';   // size
		http_file_hosts.push(mediafire_com);
		}
		if(Check_files_dot_to_links){
		var files_to= new Array(6) //http://www.files.to/get/400120/lioil1on9p
		 files_to[0]="(?:www\.|)files\.to\/get\/(\\d*)\/"; //name and search string in link to get description
		 files_to[1]='You requested the following';    // file_is_alive
		 files_to[2]='requested file couldn';                   // file_is_dead
		 files_to[3]='optional--';  // no download slots or temporarily unavailable or servererror
		 files_to[4]="//a[contains(@href,'files.to/')]"; 
		 files_to[5]='optional--'; //tos violation
		 files_to[6]='<p>Size: (\\d.*?)</p>';   // size
		 http_file_hosts.push(files_to);
		}
		if(Check_ezyfile_dot_net_links){ //http://ezyfile.net/1hdm93x675kj/SELENA_GOMEZ.mkv.html
		var ezyfile_net= new Array(6)
		 ezyfile_net[0]="ezyfile.net\/(?:\\w*)\/(?:\\w*)"; //name and search string in link to get description
		 ezyfile_net[1]='method_free';    // file_is_alive
		 ezyfile_net[2]='No such file';                   // file_is_dead
		 ezyfile_net[3]='optional--';  // no download slots or temporarily unavailable or servererror
		 ezyfile_net[4]="//a[contains(@href,'ezyfile.net/')]"; 
		 ezyfile_net[5]='optional--'; //tos violation
		 ezyfile_net[6]='</font> \\((\\d.*?)\\)</font>';   // size
		 http_file_hosts.push(ezyfile_net);
		}		
		if(Check_megashares_dot_com_links){
		var megashares_com= new Array(6) //http://d01.megashares.com/?d01=e5e7882 megashares.com ?d01 516,000 google results   //megashares_com[0]="d\\d\\d.megashares.com";
		 megashares_com[0]="(?:www\.|d\\d\\d\.|)megashares\.com/(?:dl|\\?d)"; //name and search string in link to get description
		 megashares_com[1]='Filename';    // file_is_alive
		 megashares_com[2]='Megashares Link Information';                   // file_is_dead
		 megashares_com[3]='optional--';  // no download slots or temporarily unavailable or servererror
		 megashares_com[4]="//a[contains(@href,'megashares.com/')]"; 
		 megashares_com[5]='optional--'; //tos violation
		 megashares_com[6]='size: (.*?)</dt>';   // size
		 http_file_hosts.push(megashares_com);
		}

		if(Check_rapidshare_dot_de_links){ 
		var rapidshare_de= new Array(6)
		 rapidshare_de[0]="rapidshare.de\/files"; //name and search string in link to get description
		 rapidshare_de[1]='Choose download-type';    // file_is_alive
		 rapidshare_de[2]='alert';                   // file_is_dead
		 rapidshare_de[3]='optional--';  // no download slots or temporarily unavailable or servererror
		 rapidshare_de[4]="//a[contains(@href,'rapidshare.de/files/')]"; 
		 rapidshare_de[5]='optional--'; //tos violation
		 rapidshare_de[6]='</strong> \((.*?)\)</h1>';   // size
		 http_file_hosts.push(rapidshare_de);
		}

		if(Check_yourfilehost_dot_com_links){  
		var yourfilehost_com= new Array(6)
		 yourfilehost_com[0]='(?:www.|)yourfilehost\.com\/media\.php(?:.*?)cat=(?:.*?)&file=(?:.*?\.\w*)'; //name and search string in link to get description
		 yourfilehost_com[1]='Uploaded by:';                                    // file_is_alive
		 yourfilehost_com[2]='Error: File not found!';                            // file_is_dead
		 yourfilehost_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 yourfilehost_com[4]="//a[contains(@href,'yourfilehost.com') and contains(@href,'cat') and contains(@href,'file')]";  
		 yourfilehost_com[5]='optional--';
		 yourfilehost_com[6]='</strong> \((.*?)\)</h1>';   // size
		 http_file_hosts.push(yourfilehost_com);
		}

		if(Check_usaupload_dot_net_links){ 
		var usaupload_net= new Array(6) //http://www.usaupload.net/d/2x59l7w8cnc
		 usaupload_net[0]='(?:www.|)usaupload\.net\/d\/(?:\w*)'; //name and search string in link to get description
		 usaupload_net[1]='<strong>File size:</strong>';                                    // file_is_alive
		 usaupload_net[2]='is not available';                            // file_is_dead
		 usaupload_net[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 usaupload_net[4]="//a[contains(@href,'usaupload.net/d/')]";  
		 usaupload_net[5]='optional--';
		 usaupload_net[6]='<strong>File size:</strong> (\\d.*?)<br />';   // size
		 http_file_hosts.push(usaupload_net);
		}
		if(Check_sendspace_dot_com_links){ 
		var sendspace_com= new Array(6) //http://www.sendspace.com/file/rcfrhu
		 sendspace_com[0]='(?:www.|)sendspace\.com\/file\/(?:\w*)'; //name and search string in link to get description
		 sendspace_com[1]='<b>Size:';                                    // file_is_alive
		 sendspace_com[2]='the file you requested is not available.';                            // file_is_dead
		 sendspace_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 sendspace_com[4]="//a[contains(@href,'sendspace.com') and contains(@href,'file')]";  
		 sendspace_com[5]='optional--';
		 sendspace_com[6]='<b>Size:</b> (\\d.*?)    	            <br>';   // size
		 http_file_hosts.push(sendspace_com);
		}

		if(Check_filebase_dot_to_links){ 
		var filebase_to= new Array(6)   //http://filebase.to/files/148800/coa-tgg-xvid.avi
		 filebase_to[0]='filebase\.to\/files\/(?:\w*)'; //name and search string in link to get description
		 filebase_to[1]='Download wird';                                    // file_is_alive
		 filebase_to[2]='404';                            // file_is_dead
		 filebase_to[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 filebase_to[4]="//a[contains(@href,'filebase.to') and contains(@href,'files')]";  
		 filebase_to[5]='optional--';
		 filebase_to[6]='Dateigr&ouml;&szlig;e:</td>\r\n		<td width="50%" style="font-weight:bold;">(.*?)</td>';   // size
		 http_file_hosts.push(filebase_to);
		}
		if(Check_duckload_dot_com_links){ 
		var duckload_com= new Array(6)   //http://duckload.com/download/291391/OneClickMoviez.Com-nep-wtwta-scr.avi
		 duckload_com[0]='(|www\.)duckload\.com\/d'; //name and search string in link to get description
		 duckload_com[1]='box_heading';                                    // file_is_alive
		 duckload_com[2]='error_message';                            // file_is_dead
		 duckload_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 duckload_com[4]="//a[contains(@href,'duckload.com')]";  
		 duckload_com[5]='optional--';
		 duckload_com[6]=' \\((\d.*?)\\) Down';   // size
		 http_file_hosts.push(duckload_com);
		}
		if(Check_fileop_dot_com_links){ 
		var fileop_com= new Array(6)   //
		 fileop_com[0]='(?:www.|)fileop\.com'; //name and search string in link to get description
		 fileop_com[1]='File Download';                                    // file_is_alive
		 fileop_com[2]='No such file ';                            // file_is_dead
		 fileop_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 fileop_com[4]="//a[contains(@href,'fileop.com')]";  
		 fileop_com[5]='optional--';
		 fileop_com[6]='<small>(\d.*?)<\\/small>';   // size
		 http_file_hosts.push(fileop_com);
		}				
		if(Check_gigasize_dot_com_links){ 
		var gigasize_com= new Array(6)   //
		 gigasize_com[0]='(?:www.|)gigasize\.com'; //name and search string in link to get description
		 gigasize_com[1]='download_button';                                    // file_is_alive
		 gigasize_com[2]='(downloadError)|(Download error)';                            // file_is_dead
		 gigasize_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 gigasize_com[4]="//a[contains(@href,'gigasize.com')]";  
		 gigasize_com[5]='optional--';
		 gigasize_com[6]='<p>Size. <span>(\d.*?)<';   // size
		 http_file_hosts.push(gigasize_com);
		}			 
		if(Check_bitroad_dot_net_links){ 
		var bitroad_net= new Array(6)   //http://bitroad.net/download/6b440b200685/ruby-warw.avi.html //http://bitroad.net/download/4c3b36023b23c985ddece76f2603e54c3/The%20Anal%20Supremacy%20(2004).wmv.html
		 bitroad_net[0]='bitroad\.net\/download\/(?:.*?)/(?:.*?)\.html';      //name and search string in link to get description
		 bitroad_net[1]='btn_2';                            // file_is_alive
		 bitroad_net[2]='not found';                            // file_is_dead
		 bitroad_net[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 bitroad_net[4]="//a[contains(@href,'bitroad.net') and contains(@href,'download')]";  
		 bitroad_net[5]='optional--';
		 bitroad_net[6]=' \\[ (\\d.*?) \\]</h1>';   // size
		 http_file_hosts.push(bitroad_net);
		}

		if(Check_oron_dot_com_links){ 
		var oron_com= new Array(6)  //http://oron.com/g67xl3xancwj/addiction-counseling-review-preparing-for-comprehensive-certification-and-licensing-examinations.9780805843118.18444.pdf.html
		                            //http://oron.com/ctbh124ldlxo/tna.impact.2009.10.15.hdtv.xvid--kyr.WRESTLINGCONCEPTS.COM.part8.rar.html
		 oron_com[0]='(?:www.|)oron\.com\/';  //name and search string in link to get description
		 //oron_com[1]='<h3>.*?\\: ..*?</h3>';                            // file_is_alive
		 oron_com[1]='Ð˜Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð°';
		 oron_com[2]='(<h3>.*?\\: </h3>)|(?:File Not Found)|(?:No such file)|(?:No such user)|(?:Ð¤Ð°Ð¹Ð» Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½)';                            // file_is_dead
		 oron_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 oron_com[4]="//a[contains(@href,'oron.com')]";  
		 oron_com[5]='optional--';
		 oron_com[6]=' (\\d.*?)</h3>';   // size
		 http_file_hosts.push(oron_com);
		}
		if(Check_quickupload_dot_net_links){ 
		var quickupload_net= new Array(6)  //http://quickupload.net/bps409i74nop/vmt-bgplan-xvid.vx.avi.html
		                                   //http://quickupload.net/u909952me81y/en-quickupload.net.zip.html
		 quickupload_net[0]='(?:www.|)quickupload\.net\/';  //name and search string in link to get description
		 quickupload_net[1]='You have requested';                            // file_is_alive
		 quickupload_net[2]='File Not Found';                            // file_is_dead
		 quickupload_net[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 quickupload_net[4]="//a[contains(@href,'quickupload.net')]";  
		 quickupload_net[5]='optional--';
		 quickupload_net[6]='</font> \\((\\d.*?)\\)</font>';   // size
		 http_file_hosts.push(quickupload_net);
		}		
		if(Check_good_dot_com_links){ 
		var good_com= new Array(6)  //http://good.net/_2Jhh4stm7
		                            //http://good.net/dl/au/47b12eaa42215b1e69ab7d6ab750b2c5f9226700/d45900cd0d7f/September%20morning.rar/info
		 good_com[0]='(?:www.|)good\.net\/(?:_|dl)';  //name and search string in link to get description
		 good_com[1]='Free Download';                            // file_is_alive
		 good_com[2]='Not Found';                            // file_is_dead
		 good_com[3]='Forbidden';                 // no download slots or temporarily unavailable or servererror
		 good_com[4]="//a[contains(@href,'good.net')]";  
		 good_com[5]='optional--';
		 good_com[6]='<span id="humansize">(\\d.*?)</span>';   // size
		 http_file_hosts.push(good_com);
		}
		if(Check_2shared_dot_com_links){ 
		var twoshared_com= new Array(6)  //http://www.2shared.com/file/8232418/a8af73bf/MEDiAWWEHellInaCell2009SDTVWSXviD-FWG-WRESTLiNGCONCEPTSCOMpart1.html
		 twoshared_com[0]='(?:www.|)2shared\.com\/file\/(?:\w*)';  //name and search string in link to get description
		 twoshared_com[1]='File size';                       // file_is_alive
		 twoshared_com[2]='(File not found)|(is not valid)';                            // file_is_dead
		 twoshared_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 twoshared_com[4]="//a[contains(@href,'2shared.com/file/')]";  
		 twoshared_com[5]='optional--'; 
		 twoshared_com[6]='                          (\\d.*?) &nbsp; &nbsp;';   // size
		 http_file_hosts.push(twoshared_com);
		}	

		if(Check_uploadcell_dot_com_links){ 
		var uploadcell_com= new Array(6)  //http://www.uploadcell.com/97z3mmlfllfm	http://www.uploadcell.com/5u78g5iddgp9/FuNa.ORG.RU.CC.rar.html
		 uploadcell_com[0]='(?:www.|)uploadcell\.com\/(?:\\w*)';  //name and search string in link to get description
		 uploadcell_com[1]='You have requested';                       // file_is_alive
		 uploadcell_com[2]='File Not Found';                            // file_is_dead
		 uploadcell_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 uploadcell_com[4]="//a[contains(@href,'uploadcell.com/')]";  
		 uploadcell_com[5]='optional--'; 
		 uploadcell_com[6]='</font> \\((\\d.*?)\\)</font>';   // size
		 http_file_hosts.push(uploadcell_com);
		}		
		if(Check_ziddu_dot_com_links){ 
		var ziddu_com= new Array(6)  //
		 ziddu_com[0]='(?:www.|)ziddu\.com\/download\/(?:\\d*)\/(?:\\w*)';  //name and search string in link to get description
		 ziddu_com[1]='File Size';                       // file_is_alive
		 ziddu_com[2]='File not found';                            // file_is_dead
		 ziddu_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 ziddu_com[4]="//a[contains(@href,'ziddu.com/download/')]";  
		 ziddu_com[5]='optional--'; 
		 ziddu_com[6]='                          <td height=.*?<span class=".*?">(\\d.*?) </span></td>';   // size
		 http_file_hosts.push(ziddu_com);
		}			
		if(Check_turboupload_dot_com_links){ 
		var turboupload_com= new Array(6)  
		 turboupload_com[0]='(?:www.|)turboupload\.com\/(?:\\w*)';  //name and search string in link to get description
		 turboupload_com[1]='You have requested';                       // file_is_alive
		 turboupload_com[2]='File Not Found';                            // file_is_dead
		 turboupload_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 turboupload_com[4]="//a[contains(@href,'turboupload.com')]";  
		 turboupload_com[5]='optional--'; 
		 turboupload_com[6]='</font> \\((\\d.*?)\\)</font>';   // size
		 http_file_hosts.push(turboupload_com);
		}		
		if(Check_bigandfree_dot_com_links){ //http://www.BigAndFree.com/188766
		var bigandfree_com= new Array(6)  
		 bigandfree_com[0]='(?:www.|)bigandfree\.com\/(?:\\d*)';  //name and search string in link to get description
		 bigandfree_com[1]='(Basic Download)|(Regular Download)|(You have exceeded)';                       // file_is_alive
		 bigandfree_com[2]='has been removed';                            // file_is_dead
		 bigandfree_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 bigandfree_com[4]="//a[contains(@href,'bigandfree.com') or contains (@href,'BigAndFree.com')]";  
		 bigandfree_com[5]='optional--'; 
		 bigandfree_com[6]='optional--';   // size
		 http_file_hosts.push(bigandfree_com);
		}			
		if(Check_badongo_dot_com_links){ 
		var badongo_com= new Array(6)  //http://www.badongo.com/vid/1057847  http://www.badongo.com/cfile/14283773 /http://www.badongo.com/file/8718084
		 badongo_com[0]='(?:www.|)badongo\.com\/(?:vid|cfile|file)\/(?:\w*)';  //name and search string in link to get description
		 badongo_com[1]='Direct Link';                       // file_is_alive
		 badongo_com[2]='File not found';                            // file_is_dead
		 badongo_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 badongo_com[4]="//a[contains(@href,'badongo.com')]";  
		 badongo_com[5]='optional--'; 
		 badongo_com[6]='Filesize : (\\d.*?)</div>';   // size
		 http_file_hosts.push(badongo_com);
		}
		if(Check_filenavi_dot_com_links){ 
		var filenavi_com= new Array(6)  //http://www.filenavi.com/direct/77916e8f0181a71d2695d3c3196b30a3
		 filenavi_com[0]='(?:www.|)filenavi\.com\/direct\/(?:\w*)';  //name and search string in link to get description
		 filenavi_com[1]='file_name';                       // file_is_alive
		 filenavi_com[2]='ì‚­ì œëœ';                            // file_is_dead
		 filenavi_com[3]='optional--';            // no download slots or temporarily unavailable or servererror
		 filenavi_com[4]="//a[contains(@href,'filenavi.com') and contains(@href,'direct')]";  
		 filenavi_com[5]='optional--'; 
		 filenavi_com[6]='<td>(\\d.*?)</td>';   // size
		 http_file_hosts.push(filenavi_com);
		}
		if(Check_sharingmatrix_dot_com_links){  
		var sharingmatrix_com= new Array(6)  //http://sharingmatrix.com/file/448591/80.part01.rar
		 sharingmatrix_com[0]='sharingmatrix\.com\/file\/';       //name and search string in link to get description
		 sharingmatrix_com[1]='maximum speed';                           // file_is_alive
		 sharingmatrix_com[2]='Error\.';                            // file_is_dead
		 sharingmatrix_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 sharingmatrix_com[4]="//a[contains(@href,'sharingmatrix.com') and contains(@href,'file')]";  
		 sharingmatrix_com[5]='optional--'; 
		 sharingmatrix_com[6]='Size:</th>\\n.*?<td>(\\d.*?)</td>';   // size
		 http_file_hosts.push(sharingmatrix_com);
		}
		if(Check_uploadbox_dot_com_links){  
		var uploadbox_com= new Array(6)  //http://uploadbox.com/files/dHKtTbMPCJ
		 uploadbox_com[0]='uploadbox.com/(?:.{1,3}\/|)files/(?:\w*)';       //name and search string in link to get description
		 uploadbox_com[1]='Free Download';                           // file_is_alive
		 uploadbox_com[2]='(not_found)|(File deleted from service)';                            // file_is_dead
		 uploadbox_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 uploadbox_com[4]="//a[contains(@href,'uploadbox.com') and contains(@href,'files')]";  
		 uploadbox_com[5]='optional--'; 
		 //uploadbox_com[6]='<strong>File size:</strong> (\\d.*?)</li>';   // size
		 uploadbox_com[6]='Size:</td>\\n.*<td>\\n.*?<b>(.*?)</b>';   // size
		 http_file_hosts.push(uploadbox_com);
		}

		if(Check_up_dash_file_dot_com_links){  
		var up_dash_file_com= new Array(6)  //http://up-file.com/download/6952.6d52fcce89162cdbe08a34398b
		 up_dash_file_com[0]='up-file.com/download/(?:\w*)';       //name and search string in link to get description
		 up_dash_file_com[1]='Download the file';                           // file_is_alive
		 up_dash_file_com[2]='is not found';                            // file_is_dead
		 up_dash_file_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 up_dash_file_com[4]="//a[contains(@href,'up-file.com') and contains(@href,'download')]";  
		 up_dash_file_com[5]='optional--'; 
		 up_dash_file_com[6]='size::</span> (.*?)</h1>';   // size
		 http_file_hosts.push(up_dash_file_com);
		}
		
		if(Check_share_dash_rapid_dot_com_links){  
		var share_dash_rapid_com= new Array(6)  //http://share-rapid.com/stahuj/82085/dj-tiesto-forbidden-paradise-1-garden-of-evil.rar
		 share_dash_rapid_com[0]='share-rapid.com/stahuj/(?:\w*)';       //name and search string in link to get description
		 share_dash_rapid_com[1]='Velikost';                           // file_is_alive
		 share_dash_rapid_com[2]='Not Found';                            // file_is_dead
		 share_dash_rapid_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 share_dash_rapid_com[4]="//a[contains(@href,'share-rapid.com')]";  
		 share_dash_rapid_com[5]='optional--'; 
		 share_dash_rapid_com[6]='	(\\d.*?)</strong></td>';   // size
		 http_file_hosts.push(share_dash_rapid_com);
		}
				
		if(Check_getthebit_dot_com_links){  
		var getthebit_com= new Array(6)  //http://www.getthebit.com/f/ctf/adjaaaaaabsdhtzc/yjx_at-e290-hd-500.part1.rar
		 getthebit_com[0]='(?:www.|)getthebit.com/f/(?:\w*)';       //name and search string in link to get description
		 getthebit_com[1]='Ð’Ñ‹ Ð²Ñ‹Ð±Ñ€Ð°Ð»Ð¸ Ñ„Ð°Ð¹Ð»';                           // file_is_alive
		 getthebit_com[2]='Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½';                            // file_is_dead
		 getthebit_com[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 getthebit_com[4]="//a[contains(@href,'getthebit.com')]";  
		 getthebit_com[5]='optional--'; 
		 getthebit_com[6]='&nbsp;\\(<b>(.*?)</b>\\)';   // size
		 http_file_hosts.push(getthebit_com);
		}
				
		if(Check_vip_dash_file_dot_com_links){
		var vip_file_com= new Array(6)  //http://vip-file.com/download/7baaff893275/coa-tgg-xvid-IRFree.com.avi.html
		 vip_file_com[0]='vip-file\.com\/download\/(?:.*?)/(?:.*?)\.html'; //name and search string in link to get description
		 vip_file_com[1]='Description';                                    // file_is_alive
		 vip_file_com[2]='This file not found';                            // file_is_dead
		 vip_file_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 vip_file_com[4]="//a[contains(@href,'vip-file.com') and contains(@href,'download')]";  
		 vip_file_com[5]='optional--'; 
		 vip_file_com[6]='Size: <b style="padding-left:5px;">(.*?)</b></span>';   // size
		 http_file_hosts.push(vip_file_com);
		}

		if(Check_letitbit_dot_net_links){
		var letitbit_net= new Array(6)  //http://letitbit.net/download/a884f3171672/Hero.S03E19.avi.html
		 letitbit_net[0]='letitbit\.net\/download\/(?:\w*)';     //name and search string in link to get description
		 letitbit_net[1]='dlBlock';                              // file_is_alive
		 letitbit_net[2]='style7';                            // file_is_dead
		 letitbit_net[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 letitbit_net[4]="//a[contains(@href,'letitbit.net') and contains(@href,'download')]";  
		 letitbit_net[5]='optional--'; 
		 letitbit_net[6]='File size::</span> (\\d.*?)</h1>';   // size
		 http_file_hosts.push(letitbit_net);
		}
		
		if(Check_zshare_dot_net_links){ 
		var zshare_net= new Array(6)  //http://www.zshare.net/video/567993565c0c9478/
		 zshare_net[0]='(?:www.|)zshare\.net\/(?:(?:download)|(?:video)|(?:audio))\/(?:\w*)';       //name and search string in link to get description
		 zshare_net[1]='File Name';                              // file_is_alive
		 zshare_net[2]='File Not Found';                            // file_is_dead
		 zshare_net[3]='optional--';                 // no download slots or temporarily unavailable or servererror
		 zshare_net[4]="//a[contains(@href,'zshare.net/video') or contains(@href,'zshare.net/download') or contains(@href,'zshare.net/audio')]";  
		 zshare_net[5]='optional--'; 
		 zshare_net[6]='Size: <font color="#666666">(\\d.*?)</font></td>';   // size
		 http_file_hosts.push(zshare_net);
		}				
		 
		if(Check_uploaded_dot_to_links){ 
		var uploaded_to= new Array(6)  //http://uploaded.to/file/ezim9d/hio-oth.509.notv.part1.rar
		                               //http://ul.to/2lcwcj
		 uploaded_to[0]='(?:uploaded\.to\/(?:.id|file))|(?:ul\.to\/)';                //name and search string in link to get description
		 uploaded_to[1]='"inputActive"';                              // file_is_alive
		 uploaded_to[2]='"box_red"';                                  // file_is_dead
		 uploaded_to[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 uploaded_to[4]="//a[contains(@href,'uploaded.to/') or contains(@href,'ul.to/')]";  
		 uploaded_to[5]='optional--';   
		 uploaded_to[6]=': &nbsp;</td><td>      (\\d.*?)	</td>';   // size
		 http_file_hosts.push(uploaded_to);
		}
		
		if(Check_filesend_dot_net_links){
		var filesend_net= new Array(6)  
		 filesend_net[0]='(?:www.|)filesend\.net\/download';                //name and search string in link to get description
		 filesend_net[1]='buttdl';                              // file_is_alive
		 filesend_net[2]='File removed';                                  // file_is_dead
		 filesend_net[3]='Error';                       // no download slots or temporarily unavailable or servererror
		 filesend_net[4]="//a[contains(@href,'filesend.net') and contains(@href,'download')]";  
		 filesend_net[5]='optional--';   
		 filesend_net[6]='File Size:</strong>\\n\\n(\\d*.*?)\\n</td></tr>';   // size
		 http_file_hosts.push(filesend_net);
		}
		

		if(Check_egoshare_dot_com_links){
		var egoshare_com= new Array(6)  //http://www.egoshare.com/download.php?id=5A1D9AA044
		 egoshare_com[0]='(?:www.|)egoshare\.com\/download\.php';                //name and search string in link to get description
		 egoshare_com[1]='have requested';                              // file_is_alive
		 egoshare_com[2]='file could not be found';                                  // file_is_dead
		 egoshare_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 egoshare_com[4]="//a[contains(@href,'egoshare.com/download')]";  
		 egoshare_com[5]='optional--';   
		 egoshare_com[6]='\\((\\d*.*?)\\) .</b>';   // size
		 http_file_hosts.push(egoshare_com);
		}	
			
		if(Check_ifile_dot_it_links){
		var ifile_it= new Array(6)  
		 ifile_it[0]='ifile\.it\/';                //name and search string in link to get description
		 ifile_it[1]='(Request Download Ticket)|(in order to download)';                              // file_is_alive
		 ifile_it[2]='(file removed)|(file expired)|(no such file)';                                  // file_is_dead
		 ifile_it[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 ifile_it[4]="//a[contains(@href,'ifile.it')]";  
		 ifile_it[5]='optional--';   
		 ifile_it[6]='&nbsp;\\n\\t\\t(\\d.*?)	</span>';   // size
		 http_file_hosts.push(ifile_it);
		}
		if(Check_superfastfile_dot_com_links){
		var superfastfile_com= new Array(6)  
		 superfastfile_com[0]='(|www\.)superfastfile\.com\/(?:\\w*)';                //name and search string in link to get description
		 superfastfile_com[1]='method_free';                              // file_is_alive
		 superfastfile_com[2]='(file removed)|(file expired)|(no such file)|(Datei nicht gefunden)';                                  // file_is_dead
		 superfastfile_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 superfastfile_com[4]="//a[contains(@href,'superfastfile.com')]";  
		 superfastfile_com[5]='optional--';   
		 superfastfile_com[6]='<h2>(\\d.*?)</h2>';   // size
		 http_file_hosts.push(superfastfile_com);
		}
		//if(Check_superfastfile_dot_com_links){		
		//var superfastfile_com= new Array(6) //http://www.superfastfile.com/3heyvf4m9otk/www.AZmovie.net_lap-objctf.part1.rar
		 //superfastfile_com[0]='(|www\.)superfastfile\.com\/(?:\\w*)\/';                //name and search string in link to get description
		 //superfastfile_com[1]='method_free';                              // file_is_alive
		 //superfastfile_com[2]='File Not Found';                                  // file_is_dead
		 //superfastfile_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 //superfastfile_com[4]="//a[contains(@href,'superfastfile.com/')]"; 
		 //superfastfile_com[5]='optional--';   
		 //superfastfile_com[6]='<h2>(\\d.*?)</h2>';   // size
		 //http_file_hosts.push(storage_to);
		//}
		if(Check_storage_dot_to_links){		
		var storage_to= new Array(6)
		 storage_to[0]='(|www\.)storage\.to\/get\/';                //name and search string in link to get description
		 storage_to[1]='Downloading:';                              // file_is_alive
		 storage_to[2]='File not found';                                  // file_is_dead
		 storage_to[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 storage_to[4]="//a[contains(@href,'storage.to') and contains(@href,'get')]"; 
		 storage_to[5]='optional--';   
		 storage_to[6]='>\\((\\d.*?)\\)<\/span>';   // size
		 http_file_hosts.push(storage_to);
		}


		if(Check_filebox_dot_com_links){ //http://www.filebox.com/kh95l3lkw6uk			
		var filebox_com= new Array(6)  // is mulfunctioning
		 filebox_com[0]='(|www\.)filebox\.com\/';                //name and search string in link to get description
		 filebox_com[1]='(splash_DownLoadBtn)|(Download File)';                              // file_is_alive
		 filebox_com[2]='(No such file)|(has been removed)|(Not Available)';                                  // file_is_dead
		 filebox_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 filebox_com[4]="//a[contains(@href,'filebox.com')]"; 
		 filebox_com[5]='optional--';   
		 filebox_com[6]=': &nbsp; \\((\\d.*?)\\)';   // size
		 http_file_hosts.push(filebox_com);
		}
		
		if(Check_megaftp_dot_com_links){	//http://www.megaftp.com/147473		
		var megaftp_com= new Array(6)  // is mulfunctioning
		 megaftp_com[0]='(?:(?:|www\.)MegaFTP\.com\/)|(?:(?:|www\.)megaftp\.com\/)';                //name and search string in link to get description
		 megaftp_com[1]='Click here to continue to your download';                              // file_is_alive
		 megaftp_com[2]='(Not Found)|(has been removed)';                                  // file_is_dead
		 megaftp_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 megaftp_com[4]="//a[contains(@href,'MegaFTP') or contains(@href,'megaftp')]"; 
		 megaftp_com[5]='optional--';   
		 megaftp_com[6]='>\\((\\d.*?)\\)<\/span>';   // size
		 http_file_hosts.push(megaftp_com);
		}
		
		if(Check_turbobit_dot_net_links){	//http://turbobit.net/nziqw5xui5yd.html	
		var turbobit_net= new Array(6)  // is mulfunctioning
		 turbobit_net[0]='turbobit\.net\/';                //name and search string in link to get description
		 turbobit_net[1]='Ð Ð°Ð·Ð¼ÐµÑ€ Ñ„Ð°Ð¹Ð»Ð°';                              // file_is_alive
		 turbobit_net[2]='Ð¤Ð°Ð¹Ð» Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½';                                  // file_is_dead
		 turbobit_net[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 turbobit_net[4]="//a[contains(@href,'turbobit')]"; 
		 turbobit_net[5]='optional--';   
		 turbobit_net[6]='Ð Ð°Ð·Ð¼ÐµÑ€ Ñ„Ð°Ð¹Ð»Ð°.</b> (\\d.*?)</div></div>';   // size
		 http_file_hosts.push(turbobit_net);
		}

		if(Check_link_dash_protector_dot_com_links){		
		var link_protector_com= new Array(6)   //http://link-protector.com/686842/
		 link_protector_com[0]='link-protector\.com\/(?:\d*)'; //name and search string in link to get description
		 link_protector_com[1]='This link is';                                    // file_is_alive
		 link_protector_com[2]='from automatic stealing';                            // file_is_dead
		 link_protector_com[3]='optional--';                                            // no download slots or temporarily unavailable or servererror
		 link_protector_com[4]="//a[contains(@href,'link-protector.com')]";  
		 link_protector_com[5]='optional--';
		 link_protector_com[6]='</strong> \((.*?)\)</h1>';   // size
		 http_file_hosts.push(link_protector_com);
		}
					 
		var co_cc_vault= new Array(6)   
		 co_cc_vault[0]='(?:(?:defensive-pro\.org)|(?:.*?/(?:(?:vault)|(?:backup))/.*?))/downloads/';                //name and search string in link to get description
		 co_cc_vault[1]='<input type="hidden" name="link" value="(.*)(?:|)';       // file_is_alive = real link
		 co_cc_vault[2] = '( *$| "|>)';                                 // file_is_dead = reallinkcorrection
		 co_cc_vault[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 co_cc_vault[4]="//a[contains(@href,'vault') or contains(@href,'downloads')]"; 
		 co_cc_vault[5]='optional--';   
		 co_cc_vault[6]='&nbsp;\\n.\\((.*?)\\)\\n&nbsp;';   // size
		 co_cc_vault[7]='1'; 
		 
		var uploading_com= new Array(6)  
		 uploading_com[0]='uploading\.com\/files';                //name and search string in link to get description
		 uploading_com[1]='ico_download_file';                              // file_is_alive
		 uploading_com[2]='FILE REMOVED BECAUSE';                                  // file_is_dead
		 uploading_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 uploading_com[4]="//a[contains(@href,'uploading.com') and contains(@href,'files')]";  
		 uploading_com[5]='optional--';   
		 uploading_com[6]='File size: (.*?)<br />';   // size
		 		 
		// ONLY FOR co_cc_vault USAGE ------------START

		var hotfile_com= new Array(6)  
		 hotfile_com[0]='hotfile\.com\/dl';                             //name and search string in link to get description
		 hotfile_com[1]='<td>Downloading <b>';   // file_is_alive
		 hotfile_com[2]='is deleted by the';                            // file_is_dead
		 hotfile_com[3]='optional--';                         // no download slots or temporarily unavailable or servererror
		 hotfile_com[4]="//a[contains(@href,'hotfile.com') and contains(@href,'dl')]";  
		 hotfile_com[5]='optional--';   
		 hotfile_com[6]='<span class="size">\\| (\\d.*?)</span>';   // size

		var rapidshare_com= new Array(6) 
		 rapidshare_com[0]='(|www\.)rapidshare\.com\/files';         //name and search string in link to get description
		 rapidshare_com[1]='File Name';                              // file_is_alive
		 rapidshare_com[2]='error';                                  // file_is_dead
		 rapidshare_com[3]='optional--';                   // no download slots or temporarily unavailable or servererror
		 rapidshare_com[4]="//a[contains(@href,'rapidshare')]"; 
		 rapidshare_com[5]='optional--';   
		 rapidshare_com[6]='^(.*?)$';   // size

		var netload_in= new Array(6)
		 netload_in[0]="(?:www.|)netload.in/date";              //name and search string in link to get description
		 netload_in[1]='dl_first_tacho.gif';                    // file_is_alive
		 netload_in[2]='Please contact the';                    // file_is_dead
		 netload_in[3]='optional--';                  // no download slots or temporarily unavailable or servererror                  
		 netload_in[4]="//a[contains(@href,'netload.in') and contains(@href,'date')]";  
		 netload_in[5]='optional--';                  // tos violation
		 netload_in[6]='<span style="color: #8d8d8d;">, (.*?)</span></div>';   // size

		var megaupload_com= new Array(6) 
		 megaupload_com[0]='(|www\.)megaupload\.com';                 //name and search string in link to get description
		 megaupload_com[1]='Filename:';                              // file_is_alive
		 megaupload_com[2]='Unfortunately, the link you have clicked';                                  // file_is_dead
		 megaupload_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 megaupload_com[4]="//a[contains(@href,'megaupload')]"; 
		 megaupload_com[5]='optional--';   
		 megaupload_com[6]='font-size:13px;">(\d.*?)<\/font>';   // size
		 
		var filefactory_com= new Array(6) 
		 filefactory_com[0]='(|www\.)filefactory\.com';                 //name and search string in link to get description
		 filefactory_com[1]='file uploaded';                              // file_is_alive
		 filefactory_com[2]='no longer available';                                  // file_is_dead
		 filefactory_com[3]='optional--';                       // no download slots or temporarily unavailable or servererror
		 filefactory_com[4]="//a[contains(@href,'filefactory')]"; 
		 filefactory_com[5]='optional--';   
		 filefactory_com[6]='<span>(\d.*?) file uploaded .*ago.<\/span>';   // size
// ONLY FOR co_cc_vault USAGE ------------END 

	var http_file_hosts_all = [bigandfree_com,netload_in,easy_share_com,mediafire_com,megashares_com,rapidshare_de,vip_file_com,yourfilehost_com,sendspace_com,gigasize_com,fileop_com,duckload_com,filebase_to,link_protector_com,bitroad_net,filenavi_com,uploadbox_com,letitbit_net,zshare_net,uploaded_to,filesend_net,ifile_it,storage_to,megaftp_com,co_cc_vault,rapidshare_com,megaupload_com,filefactory_com];
	var totalxpath='';
	var totalourls='';

    for (var x=0;x<http_file_hosts.length;x++){
	   totalxpath = totalxpath + http_file_hosts[x][4] + '|';
	   totalourls = totalourls + http_file_hosts[x][0] + '|';
	}
		
	totalxpath = totalxpath.replace(/\|$/g, "");
	totalourls = totalourls.replace(/\|$/g, "");
	linkify(totalourls);	

if(!totalxpath)return;

    var lianks = document.evaluate(totalxpath,  document,	null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,	null);

if (lianks.snapshotLength > 0){	
	add_RSLC_style();
	if ( lianks.snapshotLength > 200 ){ checktill = "200";}else{checktill = lianks.snapshotLength;}
	
		for (var y = 0; y < checktill; y++) {
			var link = lianks.snapshotItem(y);	
		
			if ( link.href.match(/(megaftp)|(bigandfree)/i)) {
				 link.href = link.href.toLowerCase();
				 link.href = link.href.replace(/\&.*/,'');
				}

	        for (var i=0; i<http_file_hosts.length; i++) { 
				       
				if ( (link.href.match(http_file_hosts[i][0])) && (!(link.href.match(/google\./))) && (!(link.href.match(/cache:/))) && (!(link.href.match(/translate/))) && (!(link.id.match(/(alive_link)|(adead_link)|(NDSTUSERROR)/))) ){  
				   
					   var URL                                          = link.href.replace(/http:\/\/.*?(?:\?|=)http:\/\//,'http://');    	
					   var name                                         = http_file_hosts[i][0];
					   var file_is_alive                                = http_file_hosts[i][1];
					   var file_is_dead                                 = http_file_hosts[i][2]; 
					   var no_dd_slots_temp_unavail_servererror         = http_file_hosts[i][3];
					   var whattoreplace                                = http_file_hosts[i][4];
					   var tos_violation                                = http_file_hosts[i][5];
					   var size                                         = http_file_hosts[i][6];
					   var url2decode                                   = http_file_hosts[i][7];
					   	   
					if (url2decode == 1){
						decurl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation, size , http_file_hosts_all,replace_co_cc_vault_links);
						}else{	
						geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation, size);
						}
                 }
            }
       }
}

//function to find the real urls, show them on the page and then check them
function decurl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation, size,http_file_hosts_all,replace_co_cc_vault_links){

		GM_xmlhttpRequest({
		method: 'GET',
		url: URL,
		headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
		onload: function(responseDetails) {

		var reallinkreg = file_is_alive;
		var reallinkcorrection = file_is_dead;	
		var reallink  = responseDetails.responseText.match(reallinkreg)[1];
			reallink  = reallink.replace( new RegExp( reallinkcorrection, "g" ), "" );  
			
			addRealLinksNextToCodedOnes(URL,reallink,replace_co_cc_vault_links);
			
			}});		

}

function addRealLinksNextToCodedOnes(URL,reallink,replace_co_cc_vault_links){
   var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";	
   var allliveLinks, thisLink;
       allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

   for (var i = 0; i < allliveLinks.snapshotLength; i++) {
       var thisLink = allliveLinks.snapshotItem(i);

       if (replace_co_cc_vault_links == '1'){
		   thisLink.href = reallink;		   
		   thisLink.innerHTML = reallink;
		   }else{
			   if (thisLink.id != 'checked'){
		   thisLink.id = 'checked';
		   div = document.createElement('div');
		   div.innerHTML = '<a href="'+reallink+'">'+reallink+'</a>';
		   thisLink.parentNode.insertBefore(div,thisLink);
		   }
	    }
	   
	     for (var i=0; i<http_file_hosts_all.length; i++) {
					
             if ( (reallink.match(http_file_hosts_all[i][0])) && (!(reallink.match(/google\./))) && (!(reallink.match(/cache:/))) && (!(reallink.match(/translate/))) ){  
			   var URL                                          = reallink.replace(/http:\/\/.*?\?http:\/\//,'http://');    	
			   var name                                         = http_file_hosts_all[i][0];
			   var file_is_alive                                = http_file_hosts_all[i][1];
			   var file_is_dead                                 = http_file_hosts_all[i][2]; 
			   var no_dd_slots_temp_unavail_servererror         = http_file_hosts_all[i][3];
			   var whattoreplace                                = http_file_hosts_all[i][4];
			   var tos_violation                                = http_file_hosts_all[i][5];
			   var size                                         = http_file_hosts_all[i][6];
	           var url2decode                                   = http_file_hosts_all[i][7];			   
               geturl(URL , name , file_is_alive , file_is_dead , no_dd_slots_temp_unavail_servererror , whattoreplace , tos_violation, size);       			   
		  }	
	   }	   
	}	
 }

function geturl(URL,name,file_is_alive,file_is_dead,no_dd_slots_temp_unavail_servererror,whattoreplace,tos_violation, size){

//http://files-search.com/tools.comuf.com/rapidcheck/rapidcheck.php?link=222352037/Hannah_Montana_The_Movie_TS_XVID_-_STG.part1.rar&out=xml
if (URL.match(/rapidshare\.com/)){
	URL = URL.replace(/http:\/\/rapidshare\.com\/files\//,'http://files-search.com/tools.comuf.com/rapidcheck/rapidcheck.php?link=');
	}

GM_xmlhttpRequest({
method: 'GET',
url: URL,
headers: { 'User-agent': 'Mozilla/4.0 [en] (Windows NT 6.0; U)', },
onload: function(responseDetails) {

if (URL.match(/tools\.comuf\.com/)){
	URL = URL.replace(/http:\/\/files-search.com\/tools.comuf.com\/rapidcheck\/rapidcheck.php\?link=/,'http://rapidshare.com/files/');
	}

if (responseDetails.status == 403 || responseDetails.status == 404 ){
	DiplayTheNDSTUSERROR(URL);
	}	
	
	  var alivelink = responseDetails.responseText.match(file_is_alive);
	  var deadylink = responseDetails.responseText.match(file_is_dead);
      var tosviolat = responseDetails.responseText.match(tos_violation);
      var noddslotstempunavailservererror = responseDetails.responseText.match(no_dd_slots_temp_unavail_servererror);

if (deadylink && (deadylink != null)){
		DiplayTheDeletedLinks(URL);
}

else if (alivelink && (alivelink != null)){

	if (responseDetails.responseText.match(size) != null){
	var fileSize  = responseDetails.responseText.match(size)[1];
	fileSize = fileSize.replace(/&nbsp;/,' ');
	  }else{
	  	fileSize  = "unknown";
	  	}
		DiplayTheLiveLinks(URL,fileSize);	
}

else if (tosviolat && (tosviolat != null)){
		DiplayTheDeletedLinks(URL);	
}

else if (noddslotstempunavailservererror && (noddslotstempunavailservererror != null)){
		DiplayTheNDSTUSERROR(URL);	
}

}
});
}


function DiplayTheLiveLinks(URL,fileSize){
	
   var xpathoflivelinklinks = "//a[contains(@href,\'"+URL+"\')]";	

   var allliveLinks, thisLink;
       allliveLinks = document.evaluate( xpathoflivelinklinks,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

  for (var i = 0; i < allliveLinks.snapshotLength; i++) {
       var thisLink = allliveLinks.snapshotItem(i);
           thisLink.id = 'alive_link';
							if (Show_info_in_tooltip){
								var instead_of_title = "size: " + fileSize;
								thisLink.setAttribute("dll_info", instead_of_title);
								thisLink.addEventListener("mouseover", create_window, false);
								thisLink.addEventListener("mouseout", function() { kill_window(); }, false);
								thisLink.addEventListener("mousemove", function(event) { locate(event); }, true);
								}else{
								thisLink.title = 'size = '+fileSize;
								}		   
				if (No_live_links) {	
					delinkify(allliveLinks.snapshotItem(i), thisLink.id);
				}		   
		   
     }
}


function DiplayTheDeletedLinks(URL){

	var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
	var allLinks, thisLink;

	allLinks = document.evaluate( xpathoffotfoundlinks,
	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    thisLink.id = 'adead_link';
				if (No_live_links) {	
				   delinkify(allLinks.snapshotItem(i), thisLink.id);
				}	
   }
}


function DiplayTheNDSTUSERROR(URL){
		var xpathoffotfoundlinks = "//a[contains(@href,\'"+URL+"\')]";
		var allLinks, thisLink;
		allLinks = document.evaluate( xpathoffotfoundlinks,
		document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
		for (var i = 0; i < allLinks.snapshotLength; i++) {
		  var thisLink = allLinks.snapshotItem(i);
			if (! (thisLink.href.match(/(google|search%3Fq%3D|search\?q=)/))) {
				thisLink.id = 'unava_link';
				if (No_live_links) {	
					delinkify(allLinks.snapshotItem(i), thisLink.id);
				}					
			}			
		}	
	}





function linkify(totalourls){ // code from http://userscripts.org/scripts/review/2254  Linkify ting
try{

//var regex = /http:\/\/(netload\.in\/date|w\d\d\.easy-share\.com|uploaded\.to\/file|filebase\.to\/files|link-protector\.com\/|depositfiles\.com\/files\/|bitroad\.net\/download\/|vip-file\.com\/download\/|www.filenavi\.com\/direct\/|(www\.|)yourfilehost\.com|vip-file\.com|rapidshare\.de|(www\.|)sendspace\.com|uploadbox\.com\/files\/|www\.zshare\.net\/|(www\.|)mediafire\.com|(www\.|d\d\d\.|)megashares\.com)[\w\-.+$!*\/(),~%?:@#&=\\]*/gi;
	
	//GM_log('totalourls '+totalourls);
	//GM_log('11111dasdasd '+window.location.href);
	//GM_log('window.location.href = '+window.location.href+ ' -------- window.document.body.innerHTML = '+window.document.body.innerHTML);

var regexy = "http:\/\/("+ totalourls +")[\\w\\-.+$!*\\/(),~%?:@#&=\\\\]*";

var regex = new RegExp(regexy,"ig");

var altText, tekst, muligtLink;
var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'title', 'option', 'iframe', 'textarea' ];//tags, hvor det der stAÎžâ€™Î’Â¥r inden i ikke skal vAÎžâ€™Î’Â¦re links

//var ikkeTilladteTags = ['a', 'head', 'script', 'style', 'textarea', 'title', 'option', 'pre', 'code'];//tags, hvor det der stAÎžâ€™Î’Â¥r inden i ikke skal vAÎžâ€™Î’Â¦re links
var path = "//text()[not(parent::" + ikkeTilladteTags.join(" or parent::") +")]";

altText = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i=0;i<altText.snapshotLength;i++){
	
	tekst = altText.snapshotItem(i);
	muligtLink = tekst.nodeValue;
	
	if(regex.test(muligtLink)){
		
		//til at holde det nye link, og teksten omkring det
		var span = document.createElement('span');	
		var lastLastIndex = 0;
		regex.lastIndex = 0;
		for(myArray = null; myArray = regex.exec(muligtLink); ){
			//vores match gemmes
			var link = myArray[0];
			
			//alert("har fundet dette link: " + link);
			
			span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex, myArray.index))); //inds?t det der kommer for dette hit
						
			var href = link;
			
			//s?tter http:// foran href, hvis der ikke er det
			var prefix = '';
			if(href.length > 7){
				prefix = href.substring(0,7);
			}
			if(prefix.toLowerCase() != 'http://'){
				href = 'http://' + href;
			}
			
			//skab vores link:
			var a = document.createElement('a');
			a.setAttribute('href', href); //giv det en href
			//a.setAttribute('href', href.toLowerCase()); //giv det en href
			a.appendChild(document.createTextNode(link)); //linkteksten
			//a.appendChild(document.createTextNode(link.toLowerCase())); //linkteksten
			span.appendChild(a); //s?tter ind i span
								
			lastLastIndex = regex.lastIndex;
			
		}
		
		span.appendChild(document.createTextNode(muligtLink.substring(lastLastIndex))); //ins?t det der kommer efter sidste hit
		tekst.parentNode.replaceChild(span, tekst);

	}
	
		
}
//}else{	return;	}

} catch(e){alert(e);}

	}

}

start();	

//GM_registerMenuCommand("Check the links in this page (Universal Links Checker)", start, "q", "shift alt", "q");
