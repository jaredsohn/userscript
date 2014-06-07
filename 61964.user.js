// ==UserScript==
// @name           Panoramio ListView
// @version        2.07.1
// @description    Panoramio PhotoTrack like Greasemonkey script
// @uso:script     61964
// @namespace      http://www.panoramio.com/forum/viewtopic.php?t=8563
// @include        http://www.panoramio.com/user/*
// @include        http://www.panoramio.com/tags/*
// @include        http://www.panoramio.com/places/*
// @include        http://www.panoramio.com/upload/*
// @include        http://www.panoramio.com/photo/*
// @include        http://www.panoramio.com/profile/*
// @include        http://www.panoramio.com/forum/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==
//
//Change Log
// 2.00 Now ListView can save data locally and restore data from it.
// 2.01 Save data to HTML5 localStorage instead of Firefox preferences.
// 2.01.1 fixed bug : <span></div>
// 2.02 add geolocated, selected for Google Earth and Upload-date columns.
// 2.02.1 bug fix (upload-date)
// 2.02.2 fixed bug : photos not selected for GE always not geolocated.
// 2.03 add Create KML file function
//			(this KML file includes the photos geotagged but not selected for GE and photos selected but not yet on GE )
// 2.04 Now created KMLis organized by tag
// 2.05 kml data format.
// 2.06 marker-label behavior.
// 2.07 add script status message box
// 2.07.1 spell miss fixed: localStrage -> loacalStorage


GM_registerMenuCommand( "Clear Panoramio ListView Data", clearListViewData);
function clearListViewData () {
	var uidForClear = prompt('user ID','');
	if (! isNull(uidForClear) ) {
		unsafeWindow.localStorage.removeItem("panoramioUser"+uidForClear);
		GM_log("panoramioUser"+uidForClear+" user data cleared");
	}
}



MESSAGE_CONTAINER = "span#message";
DOWNLOAD_ALBUM_BUTTON = "input#downloadAlbumB";
TABLE_CONTAINER = "div#tbl";
SAVEDATE_CONTAINER = "span#savedate";
CREATE_KML_BUTTON = "input#createKMLB";
KML_CONTAINER = "span#kmllink";
MESSAGE_BOX = "div#msgbox";

uid = new String("");
photos = new Object();
photos.Length = new Number(0);
photos.data = new Object();
PhotoPagesHaveToDownload = new Array();
var timerId;
var LoadingPage = 0;
var denominator = 1;
var numerator = 1;

var first_menu = $('ul#main-menu li a:first').attr('href');
if ( first_menu.match(/\/user\/\d*/) ) {
	uid = first_menu.match(/\/user\/(\d*)/)[1];

	$('ul#main-menu>li[class="last-child"]').removeClass('last-child'); 
	$('<li class="last-child"><a href="javascript:void(0)" id="startLV">ListView</a></li>')
		.appendTo('ul#main-menu');
	var slvbt = document.getElementById('startLV');
	slvbt.addEventListener("click", startListView, true);
}




function startListView () {

	var slvbt = document.getElementById('startLV');
	slvbt.removeEventListener("click", startListView, true);

	$('a#startLV').text('Loading....'); 
	timerId = setTimeout(function(){
		clearTimeout(timerId);
		startListView2();
	}, 100);

}

function startListView2 () {

	// disable all externally linked stylesheets
	for (var i = document.styleSheets.length - 1; i >= 0; i--) {
		document.styleSheets[i].disabled = true;
	}

	var p_top = Math.floor(parseInt($(window).height()) / 2) - 24;
	var p_left = Math.floor(parseInt($(window).width()) / 2) - 320;

	var css = 'div#tbl table#myTable {min-width: 80em; overflow: scroll;} '
					+ 'table#myTable thead th, table#myTable tbody th {background-color: #e6EEEE; border: 1px solid #FFF;} '
					+ 'table#myTable tbody td {border-right: 1px solid #888; border-bottom: 1px solid #888;} '
					+ 'table#myTable th.photo_num {width: 2em; text-align: right;} '
					+ 'table#myTable td.photo_id {width: 2em; text-align: right; background-color: #ffffff;} '
					+ 'table#myTable td.photo_thumb {width: 100px; text-align: left; background-color: #ffffff;} '
					+ 'table#myTable td.photo_title {width: 10em; text-align: left; background-color: #ffffff;} '
					+ 'table#myTable td.photo_viewcount {width: 2em; text-align: right; background-color: #ffffff;} '
					+ 'table#myTable td.photo_newviewcount {width: 2em; text-align: right; background-color: #ffffff;} '
					+ 'table#myTable td.photo_tags {width: 8em;text-align: left; background-color: #ffffff;} '
					+ 'table#myTable td.photo_geolocate {width: 1em;text-align: left; background-color: #ffffff;} '
					+ 'table#myTable td.photo_GE {width: 1em;text-align: left; background-color: #ffffff;} '
					+ 'table#myTable td.photo_reldbtn {width: 4em; text-align: center; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_status {width: 1em; text-align: left; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_width {width: 3em; text-align: right; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_height {width: 3em; text-align: right; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_Lat {width: 6em; text-align: right; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_Lng {width: 6em; text-align: right; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_place {width: 18em; text-align: left; background-color: #eeeeee;} '
					+ 'table#myTable td.photo_uploaddate {width: 16em; text-align: left; background-color: #eeeeee;} '
					+ 'div#ctrlPanel, div.ctrlPanelsub, div.ctrlPanelsub input, div.ctrlPanelsub div {margin:2.5px; padding:2.5px; display:block;height:28px;} '
					+ 'div.ctrlPanelsub {float:left;} '
					+ 'div#msgbox {font-size: 24px; color: #FFFFFF; padding: 12px; position: fixed; z-index: 2; top:' + p_top + 'px; left:' + p_left + 'px; background-color: #DDBB00; width: 640px; height: 24px; visibility: hidden; text-align: center;}';
	GM_addStyle(css);


	$(document.body).empty();

	$('<div id="ctrlPanel"></div>')
		.html('<div class="ctrlPanelsub">'
				+ '	<input type="button" id="downloadAlbumB" value="Download Album Pages" />'
				+ '</div>'
				+ '<div class="ctrlPanelsub">'
				+ '	<span id="savedate"></span>'
				+ '</div>'
				+ '<div class="ctrlPanelsub">'
				+ '	<input type="button" id="createKMLB" value="Create KML" />'
				+ '</div>'
				+ '<div class="ctrlPanelsub">'
				+ '	<span id="kmllink"></span>'
				+ '</div>')
		.appendTo(document.body);


	$('<br /><span id="message"></span>')
		.appendTo(document.body);

	$(document.body).append('<div id="tbl"></div>');

	drawEmptyTable();

	var dabt = document.getElementById('downloadAlbumB');
	dabt.addEventListener("click", downloadAlbumPages, true);

	var ckmlbt = document.getElementById('createKMLB');
	ckmlbt.addEventListener("click", createKML, true);

	$('<div id="msgbox"></div>').appendTo(document.body);

	restorePhotoData();
}



function createKML () {
	disableButtons();

	var kml = '<';
	kml += '?xml version="1.0" encoding="utf-8"?>\n'
				+ '<kml xmlns = "http://www.opengis.net/kml/2.2">\n'
				+ '<Document>\n'
				+ '  <name>Photos from Panoramio LisrView</name>\n'
				+ '  <StyleMap id="panoramio">\n'
				+ '    <Pair>\n'
				+ '      <key>normal</key>\n'
				+ '      <styleUrl>#panoramioN</styleUrl>\n'
				+ '    </Pair>\n'
				+ '    <Pair>\n'
				+ '      <key>highlight</key>\n'
				+ '      <styleUrl>#panoramioH</styleUrl>\n'
				+ '    </Pair>\n'
				+ '  </StyleMap>\n'
				+ '  <Style id="panoramioH">\n'
				+ '    <IconStyle>\n'
				+ '      <Icon>\n'
				+ '        <href>http://www.panoramio.com/img/selected-icon.png</href>\n'
				+ '      </Icon>\n'
				+ '      <scale>0.75</scale>\n'
				+ '    </IconStyle>\n'
				+ '    <BalloonStyle>\n'
				+ '      <text>\n'
				+ '        <![C';
	kml += 'DATA[\n'
				+ '          <a href="http://www.panoramio.com/photo/$[id]">\n'
				+ '            <img src="$[thumbSrc]" style="width:$[thumbWidth]px; height:$[thumbHeight]px;" />\n'
				+ '          </a>\n'
				+ '          <h2>$[name]</h2>\n'
				+ '          <div>$[tagsUrls]</div>\n'
				+ '          <p>$[viewCount] views <span>$[geolocateIcon] $[GE] $[status]</span></p>\n'
				+ '          <div>$[imgWidth]x$[imgHeight]</div>\n'
				+ '          <div>$[address]</div>\n'
				+ '          <div>$[uploadDate]</div>\n'
				+ '        ]';
	kml += ']>\n'
				+ '      </text>\n'
				+ '    </BalloonStyle>\n'
				+ '    <LabelStyle>\n'
				+ '      <color>ffffffff</color>\n'
				+ '      <colorMode>normal</colorMode>\n'
				+ '      <scale>1.25</scale>\n'
				+ '    </LabelStyle>\n'
				+ '  </Style>\n'
				+ '  <Style id="panoramioN">\n'
				+ '    <IconStyle>\n'
				+ '      <Icon>\n'
				+ '        <href>http://www.panoramio.com/img/selected-icon.png</href>\n'
				+ '      </Icon>\n'
				+ '      <scale>0.5</scale>\n'
				+ '    </IconStyle>\n'
				+ '    <BalloonStyle>\n'
				+ '      <text>\n'
				+ '        <![C';
	kml += 'DATA[\n'
				+ '          <a href="http://www.panoramio.com/photo/$[id]">\n'
				+ '            <img src="$[thumbSrc]" style="width:$[thumbWidth]px; height:$[thumbHeight]px;" />\n'
				+ '          </a>\n'
				+ '          <h2>$[name]</h2>\n'
				+ '          <div>$[tagsUrls]</div>\n'
				+ '          <p>$[viewCount] views <span>$[geolocateIcon] $[GE] $[status]</span></p>\n'
				+ '          <div>$[imgWidth]x$[imgHeight]</div>\n'
				+ '          <div>$[address]</div>\n'
				+ '          <div>$[uploadDate]</div>\n'
				+ '        ]';
	kml += ']>\n'
				+ '      </text>\n'
				+ '    </BalloonStyle>\n'
				+ '    <LabelStyle>\n'
				+ '      <color>ffffffff</color>\n'
				+ '      <colorMode>normal</colorMode>\n'
				+ '      <scale>0.00</scale>\n'
				+ '    </LabelStyle>\n'
				+ '  </Style>\n';

	var tagFolders = {};
	for (var id in photos.data) {

		if (photos.data[id+""].geolocate) {

			var tagdatas = [];
			for (var j = 0; j < photos.data[id+""].tags.length; j++) {
				tagdatas.push('<a href="' + photos.data[id+""].tags[j].taglink + '" target="_blank">' + photos.data[id+""].tags[j].tagname + '</a>');
			}

			var geolocate = (photos.data[id+""].geolocate) ? '<img src="http://www.panoramio.com/img/geolocated.gif" width="13" height="18" />' : '<img src="http://www.panoramio.com/img/geolocated-off.gif" width="13" height="18" />';
			var GE = (photos.data[id+""].GE) ? '<img src="http://www.panoramio.com/img/selected-icon.png" width="17" height="17" />' : '';

			var imgW = parseInt(photos.data[id+""].size.width);
			var imgH = parseInt(photos.data[id+""].size.height);
			if (imgW  >= imgH) {
				var thumbW = 200;
				var thumbH = (imgH / imgW * thumbW).toFixed(0);
			} else {
				var thumbH = 200;
				var thumbW = (imgW  / imgH * thumbH).toFixed(0);
			}

			var placemarkHTML = '  <Placemark id="' + id + '">\n'
				+ '    <name>' + photos.data[id+""].title + '</name>\n'
				+ '    <Snippet/>\n'
				+ '    <address>' + photos.data[id+""].place + '</address>\n'
				+ '    <ExtendedData>\n'
				+ '      <Data name="thumbSrc">\n'
				+ '        <value>' + photos.data[id+""].thumbsrc + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="thumbWidth">\n'
				+ '        <value>' + thumbW + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="thumbHeight">\n'
				+ '        <value>' + thumbH + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="tagsUrls">\n'
				+ '        <value>' + tagdatas.join(', ') + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="viewCount">\n'
				+ '        <value>' + photos.data[id+""].viewcount + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="newViewCount">\n'
				+ '        <value>' + photos.data[id+""].newviewcount + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="geolocateIcon">\n'
				+ '        <value>' + geolocate + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="GE">\n'
				+ '        <value>' + GE + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="status">\n'
				+ '        <value>' + photos.data[id+""].status + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="imgWidth">\n'
				+ '        <value>' + photos.data[id+""].size.width + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="imgHeight">\n'
				+ '        <value>' + photos.data[id+""].size.height + '</value>\n'
				+ '      </Data>\n'
				+ '      <Data name="uploadDate">\n'
				+ '        <value>' + photos.data[id+""].uploaddate + '</value>\n'
				+ '      </Data>\n'
				+ '    </ExtendedData>\n';

			placemarkHTML += '    <Point>\n'
				+ '      <coordinates>' + photos.data[id+""].Lng + ',' + photos.data[id+""].Lat + '</coordinates>\n'
				+ '    </Point>\n';

			placemarkHTML += '    <styleUrl>#panoramio</styleUrl>\n';

			placemarkHTML += '  </Placemark>\n';


			if (photos.data[id+""].tags.length == 0) {
				if (! tagFolders['Not tagged']) tagFolders['Not tagged'] = [];
				tagFolders['Not tagged'].push(placemarkHTML);
			} else {
				for (var j = 0; j < photos.data[id+""].tags.length; j++) {
					if (! tagFolders[ photos.data[id+""].tags[j].tagname ] ) tagFolders[ photos.data[id+""].tags[j].tagname ] = [];
					tagFolders[ photos.data[id+""].tags[j].tagname ].push(placemarkHTML);
				}
			}

		}

	}

	for (var tag in tagFolders) {
		kml += ' <Folder>\n'
				+ '  <name>' + tag + '</name>\n';

		kml += tagFolders[tag].join('\n');

		kml += ' </Folder>\n';
	}

	kml += '</Document>\n'
			+ '</kml>\n';

	var kmlLinkHTML = '<a href="data:application/vnd.google-earth.kml+xml,' + encodeURIComponent(kml) + '" title="Alt+click to download">Panoramio_LisrView.kml</a>(Alt+click to download)';

	$(KML_CONTAINER).html(kmlLinkHTML);

	enableButtons();
}



function drawEmptyTable() {
	$(TABLE_CONTAINER)
		.html('<table id="myTable" class="tablesorter" cellspacing="1">'
					+ '	<colgroup id="photo_num" span="1" />'
					+ '	<colgroup id="photo_id" span="1" />'
					+ '	<colgroup id="photo_thumb" span="1" />'
					+ '	<colgroup id="photo_title" span="1" />'
					+ '	<colgroup id="photo_viewcount" span="1" />'
					+ '	<colgroup id="photo_newviewcount" span="1" />'
					+ '	<colgroup id="photo_tags" span="1" />'
					+ '	<colgroup id="photo_geolocate" span="1" />'
					+ ' <colgroup id="photo_GE" span="1" />'
					+ '	<colgroup id="photo_reldbtn" span="1" />'
					+ '	<colgroup id="photo_status" span="1" />'
					+ '	<colgroup id="photo_width" span="1" />'
					+ '	<colgroup id="photo_height" span="1" />'
					+ '	<colgroup id="photo_Lat" span="1" />'
					+ '	<colgroup id="photo_Lng" span="1" />'
					+ '	<colgroup id="photo_place" span="1" />'
					+ '	<colgroup id="photo_uploaddate" span="1" />'
					+ '	<thead>'
					+ '		<tr>'
					+ '			<th class="photo_num">#</th>'
					+ '			<th class="photo_id">ID</th>'
					+ '			<th class="photo_thumb">Thumbnail</th>'
					+ '			<th class="photo_title">Title</th>'
					+ '			<th class="photo_viewcount">Total<br />Views</th>'
					+ '			<th class="photo_newviewcount">New<br />Views</th>'
					+ '			<th class="photo_tags">Tags</th>'
					+ '			<th class="photo_geolocate">Geo-<br />locate</th>'
					+ '			<th class="photo_GE">GE</th>'
					+ '			<th class="photo_reldbtn">Download<br />Photo<br />Page</th>'
					+ '			<th class="photo_status">Status</th>'
					+ '			<th class="photo_width">Width</th>'
					+ '			<th class="photo_height">Height</th>'
					+ '			<th class="photo_Lat">Latitude</th>'
					+ '			<th class="photo_Lng">Longitude</th>'
					+ '			<th class="photo_place">Place</th>'
					+ '			<th class="photo_uploaddate">Upload<br />Date</th>'
					+ '		</tr>'
					+ '	</thead>'
					+ '	<tbody>'
					+ '	</tbody>'
					+ '</table>');
}


function displayMessageBox (toggle, func) {
	if (toggle == "start") {
		$(MESSAGE_BOX).css('visibility','visible');
		$(MESSAGE_BOX).text(func());
		timerId = setInterval(function(){
			$(MESSAGE_BOX).text(func());
		}, 1000);
	} else {
		clearInterval(timerId);
		$(MESSAGE_BOX).css('visibility','hidden');
	}
}


function restorePhotoData () {
	displayMessageBox ("start", function () {return "Loading....";});
	var getBuffer = unsafeWindow.localStorage.getItem("panoramioUser"+uid)
	if (getBuffer) {
		GM_log('saved data exist');
		photos = JSON.parse(getBuffer);
		$(SAVEDATE_CONTAINER).text('Last save:'+photos.saveDate);
		drawTableNaddData ();
		$(MESSAGE_CONTAINER).text('Restored saved data');
	} else {
		GM_log('saved data NOT exist');
	}
	displayMessageBox("stop");
}


function storePhotoData () {
	photos.saveDate = new Date().toLocaleString();
	unsafeWindow.localStorage.setItem("panoramioUser"+uid, JSON.stringify(photos));

	$(SAVEDATE_CONTAINER).text('Last save:'+photos.saveDate);
	$(MESSAGE_CONTAINER).text('Saved');
	GM_log('saved');
}

function disableButtons () {
	$(DOWNLOAD_ALBUM_BUTTON).attr('disabled', 'disabled');
	$(CREATE_KML_BUTTON).attr('disabled', 'disabled');
	$('input[name="dloppB"]').attr('disabled', 'disabled');
	$(KML_CONTAINER).text('');
}


function downloadAlbumPages () {
	oldPhotosData = new Object();
	oldPhotosData = photos.data;
	delete photos.data;
	photos.data = new Object();
	photos.Length = 0;
	delete PhotoPagesHaveToDownload;
	PhotoPagesHaveToDownload = new Array();

	$(MESSAGE_CONTAINER).text('Started');
	disableButtons();
	displayMessageBox ("start", function () {return "Loading Page" + LoadingPage;});
	downloadOneAlbumPage(1);
}


function downloadOneAlbumPage (page) {
	LoadingPage = page;
	var url = "http://www.panoramio.com/user/" + uid + "?comment_page=1&photo_page=" + page;
	Gxhr (url, function(resp, page) {
		var doc = createHTMLDocumentByString(resp.responseText);

		var photo_imgs = getElementsByXPath("//div[@id='photos_cont']//img[@class='photo']",doc);
		var photo_totalviews = getElementsByXPath("//div[@id='photos_cont']//div[@class='photoinfo']/p[1]",doc);
		var photo_captions = getElementsByXPath("//div[@id='photos_cont']//div[@class='caption']",doc);
		var photo_icons = getElementsByXPath("//div[@id='photos_cont']//span[@class='icons']",doc);

		for (var i = 0; i < photo_imgs.length; i++) {

			var id = photo_imgs[i].getAttribute('id').match(/photo_(\d+)/)[1];

			photos.data[id+""] = new Object();

			photos.data[id+""].thumbsrc = photo_imgs[i].getAttribute('src');

			photos.data[id+""].title = photo_imgs[i].getAttribute('title');

			var tags = [];
			var anchors = photo_captions[i].getElementsByTagName('a');
			for (var j = 0; j < anchors.length; j++) {
				tags[j] = {};
				tags[j].tagname = anchors[j].textContent;
				tags[j].taglink = "http://www.panoramio.com" + anchors[j].getAttribute('href');
			}
			photos.data[id+""].tags = tags;

			var icons = photo_icons[i].getElementsByTagName('img');
			if (icons.length == 2) {
				photos.data[id+""].geolocate = true;
				photos.data[id+""].GE = true;
			} else if (icons.length == 1) {
				photos.data[id+""].geolocate = ( icons[0].getAttribute('src').match(/geolocated-off/) ) ? false : true;
				photos.data[id+""].GE = false;
			} else {
				photos.data[id+""].geolocate = false;
				photos.data[id+""].GE = false;
			}

			var totalview = photo_totalviews[i].textContent.match(/(\d+) view/)[1];
			photos.data[id+""].viewcount = totalview;

			if (oldPhotosData[id+""]) {
				var oldview = oldPhotosData[id+""].viewcount;
				photos.data[id+""].newviewcount = ( parseInt(totalview) - parseInt(oldview) ).toString();

				var oldGE = oldPhotosData[id+""].GE;
				if (oldGE == false && photos.data[id+""].GE == true) PhotoPagesHaveToDownload.push(id+"");

				photos.data[id+""].status = oldPhotosData[id+""].status;
				photos.data[id+""].size = {};
				photos.data[id+""].size.width = oldPhotosData[id+""].size.width;
				photos.data[id+""].size.height = oldPhotosData[id+""].size.height;
				photos.data[id+""].Lat = oldPhotosData[id+""].Lat;
				photos.data[id+""].Lng = oldPhotosData[id+""].Lng;
				photos.data[id+""].place = oldPhotosData[id+""].place;
				photos.data[id+""].uploaddate = oldPhotosData[id+""].uploaddate;
			} else {
				GM_log(id+'is new photo');
				photos.data[id+""].newviewcount = totalview;

				photos.data[id+""].status = "";
				photos.data[id+""].size = {};
				photos.data[id+""].size.width = "";
				photos.data[id+""].size.height = "";
				photos.data[id+""].Lat = "";
				photos.data[id+""].Lng = "";
				photos.data[id+""].place = "";
				photos.data[id+""].uploaddate = "";

				PhotoPagesHaveToDownload.push(id+"");
			}

			photos.Length++;

		}

		GM_log("page " + page +"downloaded.");
		$(MESSAGE_CONTAINER).text('Album page ' + page + ' downloaded.');

		var inactivelinks = getElementsByXPath("//div[@class='content']/div[@class='pages']/span[@class='inactive']",doc);

		if ( (inactivelinks.length == 2) || ((inactivelinks.length == 1) && (page != 1)) )  {
//		if (page == 1)  {
				if (PhotoPagesHaveToDownload.length != 0) {
					displayMessageBox("stop");
					downloadPhotoPage(PhotoPagesHaveToDownload);
				} else {
					afterDownloadAllAlbumPages();
				}
		} else {
				downloadOneAlbumPage(page + 1);
		}
	}	, page);
}


function downloadPhotoPage (pid) {

	if (typeof pid == "string") {
		pids = [pid];
		var bulk = false;
	} else {
		pids = pid;
		var bulk = true;
	}

	downloadedPhotoPagesCount = 0;

	displayMessageBox ("start", function () {return "Loading the photo page: " + LoadingPage + "(" + numerator + "/" + denominator + ")";});

	for (var i = 0; i < pids.length; i++) {

		var id = pids[i];
		LoadingPage = id;
		denominator = pids.length;
		numerator = i;
		$(MESSAGE_CONTAINER).text('Start to download photo page ' + id );

		var url = "http://www.panoramio.com/photo/" + id;
		GM_log(id+":"+url);
		Gxhr (url, function (resp, id, pidsLength) {
			var doc = createHTMLDocumentByString(resp.responseText);

			var photo_WH = getElementsByXPath("//a[@id='main-photo']",doc);
			var photo_status = getElementsByXPath("//p[@class='photo-status']",doc);
			var photo_Lat = getElementsByXPath("//abbr[@class='latitude']",doc);
			var photo_Lng = getElementsByXPath("//abbr[@class='longitude']",doc);
			var photo_place = getElementsByXPath("//p[@id='place']",doc);
			var photo_uploaddate = getElementsByXPath("//div[@id='photo-info']/div[@id='photo-details']/ul[@id='details']/li[2]",doc);

			if (photo_WH.length != 0) {
				photos.data[id+""].size.width = photo_WH[0].getAttribute('title').match(/- (\d+) x (\d+) pixels/)[1];
				photos.data[id+""].size.height = photo_WH[0].getAttribute('title').match(/- (\d+) x (\d+) pixels/)[2];
			} else {
				photos.data[id+""].size.width = "N/A";
				photos.data[id+""].size.height = "N/A";
			}

			if (photo_status.length != 0) {
				var status = photo_status[0].textContent;

				var reg = new RegExp('This photo has not yet')
				if (reg.test(status)) photos.data[id+""].status = "W";

				var reg = new RegExp('This photo is selected')
				if (reg.test(status)) photos.data[id+""].status = "G";

				var reg = new RegExp('This photo is not selected')
				if (reg.test(status)) photos.data[id+""].status = "N";

				var reg = new RegExp('Small photos are not selected')
				if (reg.test(status)) photos.data[id+""].status = "S";

				var reg = new RegExp('Unmapped photos are not selected')
				if (reg.test(status)) photos.data[id+""].status = "U";
			} else {
				photos.data[id+""].status = "N/A";
			}


			if (photo_Lat.length != 0) {
				photos.data[id+""].Lat = photo_Lat[0].getAttribute('title');
			} else {
				photos.data[id+""].Lat = "N/A";
			}

			if (photo_Lng.length != 0) {
				photos.data[id+""].Lng = photo_Lng[0].getAttribute('title');
			} else {
				photos.data[id+""].Lng = "N/A";
			}

			if (photo_place.length != 0) {
				photos.data[id+""].place = photo_place[0].textContent.match(/in (.*)/)[1];
			} else {
				photos.data[id+""].place = "N/A";
			}

			if (photo_uploaddate.length != 0) {
				photos.data[id+""].uploaddate = photo_uploaddate[0].textContent;
			} else {
				photos.data[id+""].uploaddate = "N/A";
			}

			downloadedPhotoPagesCount++;

			if (bulk) {
				if (downloadedPhotoPagesCount == pidsLength) {
					afterDownloadAllAlbumPages();
				}
			} else {
				addOnePhotoPageToTable(id);
				storePhotoData ();
				$(MESSAGE_CONTAINER).text('photo page ' + id + ' downloaded');
				displayMessageBox("stop");
				enableButtons ();
			}

			GM_log('photo data:' + id + ' - downloaded');

		}, id, pids.length);
	}

}


function enableButtons () {
	$(DOWNLOAD_ALBUM_BUTTON).removeAttr('disabled');
	$(CREATE_KML_BUTTON).removeAttr('disabled');
	$('input[name="dloppB"]').removeAttr('disabled');
}


function afterDownloadAllAlbumPages () {
	drawTableNaddData();
	storePhotoData ();
	displayMessageBox("stop");
	$(MESSAGE_CONTAINER).text('Download Finished!!');
	enableButtons();
}


function drawTableNaddData () {

		var downloadOnePhotoPageButtons = document.getElementsByName('dloppB');
		for (var j=0; j<downloadOnePhotoPageButtons.length;j++) {
			downloadOnePhotoPageButtons[j].removeEventListener('click', arguments.callee, false);
		}

		$(TABLE_CONTAINER).empty();

		drawEmptyTable();

		var num = 0;
		for (var id in photos.data) {

			var tagdatas = [];
			for (var j = 0; j < photos.data[id+""].tags.length; j++) {
				tagdatas.push('<a href="' + photos.data[id+""].tags[j].taglink + '" target="_blank">' + photos.data[id+""].tags[j].tagname + '</a>');
			}

			var geolocate = (photos.data[id+""].geolocate) ? '<img src="/img/geolocated.gif" width="13" height="18" />' : '<img src="/img/geolocated-off.gif" width="13" height="18" />';
			var GE = (photos.data[id+""].GE) ? '<img src="/img/selected-icon.png" width="17" height="17" />' : '';

			var imgW = parseInt(photos.data[id+""].size.width);
			var imgH = parseInt(photos.data[id+""].size.height);
			if (imgW  >= imgH) {
				var thumbW = 100;
				var thumbH = (imgH / imgW *100).toFixed(0);
			} else {
				var thumbH = 100;
				var thumbW = (imgW  / imgH *100).toFixed(0);
			}

			num++;
			$('<tr id="' + id + '">'
			+ '<th class="photo_num">' + num + '</th>'
			+ '<td class="photo_id"><a href="http://www.panoramio.com/photo/' + id + '" target="_blank">' + id + '</a></td>'
			+ '<td class="photo_thumb"><img src="' + photos.data[id+""].thumbsrc + '" style="width:' + thumbW + 'px; height:' + thumbH + 'px;" /></td>'
			+ '<td class="photo_title">' + photos.data[id+""].title + '</td>'
			+ '<td class="photo_viewcount">' + photos.data[id+""].viewcount + '</td>'
			+ '<td class="photo_newviewcount">' + photos.data[id+""].newviewcount + '</td>'
			+ '<td class="photo_tags">' + tagdatas.join(',') + '</td>'
			+ '<td class="photo_geolocate">' + geolocate + '</td>'
			+ '<td class="photo_GE">' + GE + '</td>'
			+ '<td class="photo_reldbtn"><input type="button" name="dloppB" value="DLoad" /></td>'
			+ '<td class="photo_status">' + photos.data[id+""].status + '</td>'
			+ '<td class="photo_width">' + photos.data[id+""].size.width + '</td>'
			+ '<td class="photo_height">' + photos.data[id+""].size.height + '</td>'
			+ '<td class="photo_Lat">' + photos.data[id+""].Lat + '</td>'
			+ '<td class="photo_Lng">' + photos.data[id+""].Lng + '</td>'
			+ '<td class="photo_place">' + photos.data[id+""].place + '</td>'
			+ '<td class="photo_uploaddate">' + photos.data[id+""].uploaddate + '</td>'
			+ '</tr>')
				.appendTo(TABLE_CONTAINER + " table#myTable tbody");
		}

		GM_log("Finish");

		var downloadOnePhotoPageButtons = document.getElementsByName('dloppB');
		for (var j=0; j<downloadOnePhotoPageButtons.length;j++) {
			downloadOnePhotoPageButtons[j].addEventListener("click", function(event) {
				var id = event.target.parentNode.parentNode.id;

				$(MESSAGE_CONTAINER).text('Start downloading'+id);
				disableButtons();
				downloadPhotoPage(id);
			}, true);
		}

}


function addOnePhotoPageToTable (id) {
	var cls = {10:'status', 11:'width', 12:'height', 13:'Lat', 14:'Lng', 15:'place', 16:'uploaddate'};

	for (var i = 10; i < 17; i++) {

		var targetNode = document.getElementById(id).childNodes[i];
		var oldChilds = targetNode.childNodes;
		for (var j=0; j<oldChilds.length; j++) {
				targetNode.removeChild(oldChilds[j]);
		}

		if (i == 11 || i == 12) {
			var newChild =  photos.data[id+""].size[cls[i]];
		} else {
			var newChild =  photos.data[id+""][cls[i]];
		}

		targetNode.appendChild(document.createTextNode(newChild));

	}

}


function Gxhr (url, cb, opt1, opt2) {
	var opt = {
		method: 'get',
		url: url,
		overrideMimeType: 'text/html',
		onload: function(res) {
			cb(res, opt1, opt2);
		}
	};
	GM_xmlhttpRequest(opt);
}


function isNull(value) {
	if (!value && value !== 0 ||
		value === undefined ||
		value === "" ||
		value === null ||
		typeof value === "undefined") {
		return true;
	}
	return false;
};


// functions copied from AutoPageriize GM-script http://userscripts.org/scripts/review/8551

function createHTMLDocumentByString(str) {
	if (document.documentElement.nodeName != 'HTML') {
		return new DOMParser().parseFromString(str, 'application/xhtml+xml')
	}
	var html = strip_html_tag(str)
	var htmlDoc
	try {
		// We have to handle exceptions since Opera 9.6 throws
		// a NOT_SUPPORTED_ERR exception for |document.cloneNode(false)|
		// against the DOM 3 Core spec.
		htmlDoc = document.cloneNode(false)
		htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false))
	}
	catch(e) {
		htmlDoc = document.implementation.createDocument(null, 'html', null)
	}
	var fragment = createDocumentFragmentByString(html)
	try {
		fragment = htmlDoc.adoptNode(fragment)
	}
	catch(e) {
		fragment = htmlDoc.importNode(fragment, true)
	}
	htmlDoc.documentElement.appendChild(fragment)
	return htmlDoc
}


function strip_html_tag(str) {
	var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/)
	if (chunks.length >= 3) {
		chunks.splice(0, 2)
	}
	str = chunks.join('')
	chunks = str.split(/(<\/html[ \t\r\n]*>)/)
	if (chunks.length >= 3) {
		chunks.splice(chunks.length - 2)
	}
	return chunks.join('')
}


function createDocumentFragmentByString(str) {
	var range = document.createRange()
	range.setStartAfter(document.body)
	return range.createContextualFragment(str)
}


function getElementsByXPath(xpath, node) {
	var nodesSnapshot = getXPathResult(xpath, node,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE)
	var data = []
	for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
		data.push(nodesSnapshot.snapshotItem(i))
	}
	return data
}


function getXPathResult(xpath, node, resultType) {
	var node = node || document
	var doc = node.ownerDocument || node
	var resolver = doc.createNSResolver(node.documentElement || node)
	// Use |node.lookupNamespaceURI('')| for Opera 9.5
	var defaultNS = node.lookupNamespaceURI(null)
	if (defaultNS) {
		const defaultPrefix = '__default__'
		xpath = addDefaultPrefix(xpath, defaultPrefix)
		var defaultResolver = resolver
		resolver = function (prefix) {
			return (prefix == defaultPrefix)
				? defaultNS : defaultResolver.lookupNamespaceURI(prefix)
		}
	}
	return doc.evaluate(xpath, node, resolver, resultType, null)
}


function getFirstElementByXPath(xpath, node) {
	var result = getXPathResult(xpath, node,
		XPathResult.FIRST_ORDERED_NODE_TYPE)
	return result.singleNodeValue
}


function resolvePath(path, base) {
	var XHTML_NS = "http://www.w3.org/1999/xhtml"
	var XML_NS   = "http://www.w3.org/XML/1998/namespace"
	var a = document.createElementNS(XHTML_NS, 'a')
	a.setAttributeNS(XML_NS, 'xml:base', base)
	a.href = path
	return a.href
}
