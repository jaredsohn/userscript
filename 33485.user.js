// ==UserScript==
// @name           RecordSearch Image Tools
// @namespace      http://ozhistory.info/rsviewer
// @description    Adds some useful tools to the National Archives of Australia's RecordSearch image pages
// @version        0.25
// @date           2012-08-16
// @creator        Tim Sherratt
// @include        /^http://(recordsearch|naa12)\.naa\.gov\.au/scripts/Imagine\.asp\?B=\d+$/
// ==/UserScript==

if (document.location.href.match(/imagine.asp/i)) {
    var params = window.location.search;
    if (params.match(/page=(\d+)/)) {
        var page = RegExp.$1;
    }
    head = document.getElementsByTagName('head')[0];
    body = document.getElementsByTagName('body')[0];
    var barcode = document.getElementById('Hidden1').value;
    var totalPages = document.getElementById('Hidden3').value;
    var baseURL = document.location.href.match(/(http:\/\/[a-z0-9]+\.naa\.gov\.au)/)[1];
    if (document.referrer.match(/NameSearch/i)) {
        var strURL = baseURL + "/NameSearch/Interface/ItemDetail.aspx?Barcode=" + barcode;
    } else {
        var strURL = baseURL + "/SearchNRetrieve/Interface/DetailsReports/ItemDetail.aspx?Barcode=" + barcode;
    }
    //Get rid of the stuff we don't want
    var oldContent = document.getElementById('Form2');
    oldContent.parentNode.removeChild(oldContent);
    var oldScripts = document.getElementsByTagName('script');
    for (var i = (oldScripts.length -1); i >= 0; i--) {
        oldScripts[i].parentNode.removeChild(oldScripts[i]);
    }
    //Get reference from item details page
    GM_xmlhttpRequest({
        method: 'GET',
        url: strURL,
        onload: function(responseDetails) {
            var item = responseDetails.responseText;
            item.match(/Item details for: ([\w\/]*), ([\w\s\/\-]*)/);
            var series = RegExp.$1;
            var control = RegExp.$2;
            var reference = series + ", " + control;
            updatePage(reference);
        }
    });
}
//Rewrite the page
function updatePage(reference) {
    var rssLink = "http://discontents.com.au/shed/rs/media-rss.php?b=" + barcode + "&r=" + encodeURI(reference) + "&p=" + totalPages;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "var totalPages = " + totalPages + ";\nvar barcode = " + barcode + ";\nvar heading = 'Digital copy of NAA: " + reference + "';\nvar nextImage = new Image();\n";
    head.appendChild(script);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://lite.piclens.com/current/piclens.js';
    head.appendChild(script);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'http://discontents.com.au/shed/rs/jquery.js';
    head.appendChild(script);
    var script = document.createElement('script');
    script.type = 'text/javascript';
    head.appendChild(script);
    embedFunction(printFile);
    embedFunction(changeImage);
    embedFunction(goPage);
    embedFunction(changeSize);
    embedFunction(fadeInImage);
    var style = document.createElement('style');
    style.type = 'text/css';
    var styleHTML = "h1 { font-size: 100%; background-color: #000000; color: #ffffff; margin: 0; border-bottom: 1px solid #555555; padding: 2px; font-weight: normal;}\n";
    styleHTML += "body {font-family: Arial, sans-serif; font-size: 0.9em; background-color: #202020; margin:0;}\n";
    styleHTML += "#details {font-size: 80%; font-weight: normal;}";
    styleHTML += "#details a {color: #acacac;}";
    styleHTML += ".buttons button, .buttons div {font-family: Arial, sans-serif; display: block; background-color: #000000; border: 1px solid #acacac; color: #acacac; height: 26px; float: left; margin: 0; padding: 0 2px 0 0; font-size: 80%; text-align: center; margin: 2px 2px 2px 0;}";
    styleHTML += ".buttons button:hover, .buttons div:hover {background-color: #202020; cursor: pointer; border: 1px solid #ffffff;}";
    styleHTML += ".buttons button img {float: left;}";
    styleHTML += ".buttons div {height: 22px; padding: 1px 4px 1px 1px;}";
    styleHTML += ".buttons div a {color: #acacac; text-decoration: none;}";
    styleHTML += ".buttons div a img {border: 0; float:left; padding: 2px;}";
    styleHTML += "#printfrom, #printto, #goto {height: 1.6em; width: 2.2em; font-size: 0.9em; padding: 0 2px 0 0; margin-top: 4px; font-family: Arial, sans-serif;}";
    styleHTML += "#imgdiv {clear: both;}";
    styleHTML += "#size {display: none;}";
    style.innerHTML = styleHTML;
    head.appendChild(style);
    
    var contentDiv = document.createElement('div');
    contentDiv.setAttribute('id', 'content');
    body.appendChild(contentDiv);
    var heading = document.createElement('h1');
    heading.innerHTML = '<img src="http://naa.gov.au/naaresources/favicon.ico" alt="NAA icon"> Digital copy of NAA: ' + reference + ' <span id="details">(<a name="top" href="' + strURL + '">details</a>)</span>';
    contentDiv.appendChild(heading);   
    // Adding the buttons
    var buttons = document.createElement('div');
    buttons.className = "buttons";
    contentDiv.appendChild(buttons);
    var prevLink = document.createElement('button');
    prevLink.setAttribute('onclick', 'changeImage(-1);');
    prevLink.innerHTML = "<img src='http://discontents.com.au/shed/rs/images/resultset_previous.png' alt=''/> Previous";
    var nextLink = document.createElement('button');
    nextLink.setAttribute('onclick', 'changeImage(1);');
    nextLink.innerHTML = "<img src='http://discontents.com.au/shed/rs/images/resultset_next.png' alt=''/> Next ";
    var upLink = document.createElement('div');
    upLink.id = "uplink";
    upLink.innerHTML = "<a href='#top'><img src='http://discontents.com.au/shed/rs/images/resultset_up.png' alt=''/><span style='position:relative;top:4px;height: 23px;'> Top </span></a>";
    var magLink = document.createElement('button');
    magLink.id = "maglink";
    magLink.setAttribute('onclick', 'changeSize()');
    var goLink = document.createElement('div');
    goLink.innerHTML = "<a href='#' onclick='goPage(); return false;'><img src='http://discontents.com.au/shed/rs/images/page.png' alt=''/> Go to </a><input type='text' id='goto' value='1' /><a href='#' onclick='goPage(); return false;'> of " + totalPages + "</a>";
    var coolLink = document.createElement('button');
    coolLink.setAttribute('onclick','PicLensLite.start({feedUrl:\'' + rssLink + '\', guid: \'' + barcode + '-1\'}); return false;');
    coolLink.innerHTML = "<img src='http://lite.piclens.com/images/PicLensButton.png' alt=''/> Browse in 3D";
    var printLink = document.createElement('div');
    var printFrom = document.createElement('input');
    var printTo = document.createElement('input');
    printLink.innerHTML = "<a href='#' onclick='printFile(); return false;'><img src='http://discontents.com.au/shed/rs/images/printer.png' alt=''/> Print from </a><input type='text' id='printfrom' value='1' /> to <input type='text' id='printto' value='" + totalPages + "' /> ";
    buttons.appendChild(prevLink);
    buttons.appendChild(goLink);
    buttons.appendChild(nextLink);
    buttons.appendChild(magLink);
    buttons.appendChild(coolLink);
    buttons.appendChild(printLink);
    //Add the image
    var size = document.createElement('div');
    size.id = "size";
    var imgDiv = document.createElement('div');
    imgDiv.id = 'imgdiv';
    var image = document.createElement('img');
    image.id = "fileimage";
    image.setAttribute('onload','fadeInImage()');
    if (page) {
        image.src = 'http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + page + '&T=P';
        magLink.innerHTML = "<img src='http://discontents.com.au/shed/rs/images/magnifier_zoom_out.png' alt=''/> Reduce ";
        size.innerHTML = "enlarged";
        document.getElementById('goto').value = page;
    } else {
        image.src = 'http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=1&T=R';
        magLink.innerHTML = "<img src='http://discontents.com.au/shed/rs/images/magnifier_zoom_in.png' alt=''/> Enlarge ";
        size.innerHTML = "regular";
    }
    imgDiv.appendChild(image);
    contentDiv.appendChild(imgDiv);
    var buttons2 = buttons.cloneNode(false);
    var prevLink2 = prevLink.cloneNode(true);
    var nextLink2 = nextLink.cloneNode(true);
    buttons2.id = "buttons2";
    buttons2.className = "buttons";
    buttons2.appendChild(prevLink2);
    buttons2.appendChild(upLink);
    buttons2.appendChild(nextLink2);
    contentDiv.appendChild(buttons2);
    contentDiv.appendChild(size);
}

function embedFunction(s) {
    head.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function printFile() {
    from = document.getElementById('printfrom').value;
    to = document.getElementById('printto').value;
    printWindow = window.open('','_blank');
    printWindow.document.open("text/html", "replace");
    var css = ".portrait { page-break-inside: avoid; page-break-after: always; page: normal;}\n";
    css += ".landscape { page-break-inside: avoid; page-break-after: always; page: normal;}\n";
    css += "p {margin:0;}\n";
    css += ".portrait img {height: 24cm;}\n";
    css += ".landscape img {width: 16cm;}\n";
    css += "@page normal { size: 21.0cm 29.7cm portrait;}\n";
    css += "@page rotated { size: 21.0cm 29.7cm landscape;}\n";
    var js = "function checkSize(num) {\n";
    js += "var div = document.getElementById('div'+num);\n";
    js += "var img = document.getElementById('img'+num);\n";
    js += "var width = img.width;\n";
    js += "var height = img.height;\n";
    js += "var ratio = height / width;\n";
    js += "if (ratio < 1.4) {\n";
    js += "    div.className = 'landscape';\n";
    js += "} else {\n";
    js += "    div.className = 'portrait';\n";
    js += "}\n";
    js += "}\n";
    printWindow.document.write("<html>\n<head>\n<title>Print " + heading + "</title>\n</head>\n<body>\n</body>\n</html>");
    var head = printWindow.document.getElementsByTagName('head')[0];
    var style = printWindow.document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    var script = printWindow.document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
    i = from;
    while (i <= to) {
        var imageDiv = printWindow.document.createElement('div');
        imageDiv.setAttribute("id", "div"+i);
        var image = printWindow.document.createElement('img');
        image.src = 'http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + i + '&T=P';
        image.setAttribute("id","img"+i);
        image.setAttribute("onload","checkSize(" + i + ")");
        imageDiv.appendChild(image);
        var caption = printWindow.document.createElement('p');
        caption.innerHTML = heading + " -- page " + i + " of " + totalPages;
        imageDiv.appendChild(caption);
        printWindow.document.body.appendChild(imageDiv);
        i++;
    }
    printWindow.document.close();
    printWindow.print();
}
function changeImage(direction) {
    var goPage = parseInt($("#goto").val()) + direction;
    var code;
    ($('#size').text() == 'regular') ? code = 'R' : code = 'P';
    if (goPage > 0 && goPage <= totalPages) {
        $('#buttons2').hide();
        $('#fileimage').fadeOut('def', function() {
            $('#fileimage').attr('src','http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + goPage + '&T=' + code);
        });
        $('#goto').val(goPage);
        nextImage.src = 'http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + (goPage + direction) + '&T=R' + code;
    }
}
function goPage() {
    var goPage = $('#goto').val();
    var code;
    ($('#size').text() == 'regular') ? code = 'R' : code = 'P';
    if (goPage > 0 && goPage <= totalPages) {
        $('#buttons2').hide();
        $('#fileimage').fadeOut('def', function() {
            $('#fileimage').attr('src','http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + goPage + '&T=' + code);
        });
    }
}
function changeSize() {
    $('#buttons2').hide();
    if ($('#size').text() == "regular") {
        $('#maglink').html("<img src='http://discontents.com.au/shed/rs/images/magnifier_zoom_out.png' alt=''/> Reduce ");
        $("#fileimage").fadeOut("def", function() {
            $('#fileimage').attr('src','http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + $('#goto').val() + '&T=P');
        });
        $('#size').text("enlarged");
    } else if ($('#size').text() == "enlarged") {
        $('#maglink').html("<img src='http://discontents.com.au/shed/rs/images/magnifier_zoom_in.png' alt=''/> Enlarge ");
        $("#fileimage").fadeOut("def", function() {
            $('#fileimage').attr('src','http://naa16.naa.gov.au/rs_images/ShowImage.php?B=' + barcode + '&S=' + $('#goto').val() + '&T=R');
        });
        $('#size').text("regular");
    }
}
function fadeInImage() {
    $("#fileimage").fadeIn("def");
    $("#buttons2").show();
}
