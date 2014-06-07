// ==UserScript==
// @name           YouTube Perfect - Embedded version
// @namespace      http://victorpimentel.com/
// @description    No autoplay; buttons to play HD/HQ with MP4 or Flash plugin; download.
// @include        *
// @exclude        http://*youtube.*
// @exclude        http://*video.google.*
// @exclude        http://mail.google.*
// @exclude        https://mail.google.*
// @author         Victor Pimentel <victor.pimentel@gmail.com>
// @copyright      2009 by Victor Pimentel
// @license        Public Domain
// @version        0.3
// @lastupdated    2009-12-25
// ==/UserScript== 

// Wrap everything in an anonymous function because this script doesn't run
// in a wrapper when used in GreaseKit or other contexts other than Firefox
(function() {

// Load styles for every video
GM_addStyle("\
    .play_btn { position: relative; display: block; opacity: 0.6; z-index: 200; }\
    .play_btn:hover { opacity: 1; cursor: pointer; }\
    div:hover > #play_btn { opacity: 1; cursor: pointer; }\
    .watch-player-div { margin: 0 auto; }\
    .watch-player-div br { clear: both !important; }\
    .control_table, .control_table tr, .control_table td {\
    margin: 0 !important; padding: 0 !important; border: 0 !important; outline: 0 !important; font-size: 100% !important; \
    vertical-align: baseline !important; background: transparent !important; }\
    .control_table { border-collapse: collapse !important; border-spacing: 0 !important; margin: 0 auto !important; }\
    .control_table button { margin: 15px 5px 0 !important; }\
    .control_table td { vertical-align: top !important; text-align: center !important; }".
      replace(/}/g,"}\n"));

// Shortcut for getElementById
function $(id) {
  return typeof id == 'string' ? document.getElementById(id) : id;
}

// Shortcut for createElement
function $E(name, attributes, content) {
  if (typeof attributes == 'string') {
    content = attributes;
    attributes = null;
  }
  var node = document.createElement(name);
  if (attributes) for (var attr in attributes) node.setAttribute(attr, attributes[attr]);
  if (content) node.innerHTML = content;
  return node;
}

// Generate an HTML button
function buildButton(text, id, target) {

  // Create the button
  var b = $E('button', { 'id': id }, text);

  // Create a container TD
  var n = $E('td', { 'id': id + '_td' });

  // Add the target
  if (target) {
    b.addEventListener('click', target, false);
  }

  // Append the button to the TD
  n.appendChild(b);

  // Return the TD node
  return n;

}

// Generate the player
function buildPlayer(player, videoID) {

  // Set the player
  $('div_' + videoID).innerHTML = player;

}

// Stop the player, show the previews
function stopPlayer(videoID, player) {

  // Remove everything
  $('div_' + videoID).innerHTML = '';

  // Container div for the previews and button to play
  var stills = $E('div');

  // First preview
  var still0 = $E('img',
        { 'class': 'still0',
          'src': 'http://i3.ytimg.com/vi/' + videoID + '/0.jpg' });
  still0.style.cssFloat = 'left';
  stills.appendChild(still0);

  // Button to play
  var play_btn = $E('img',
        { 'class': 'play_btn',
          'src': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABkCAYAAABkW8nwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABR9JREFUeNrsm21olWUYx69z5o57OxtJUjRaTIzJYrDQtl4oyZVNhKCoL4YQBEEfRlEkQYEkfgikPknRIIIgKcSiSBwI0UASRdictjRfivVOsTE5eM42z9Z1PZ2HDoezdbZzn5c9z+8Hf89kTnguft73dd/PZUSOTMkyaNE8rtmp2ajZLBBUkppxzXHNkGZ4OT8cKVCsVs2bml2aemoeSv7SvKc5oEkUK5atUK9pXkQoyBJsr2ZQk16JWLbVHct8AuRiW+OTmsl834wu8kP9mhGkgiXYqjml6ShULGvOv9I0UTv4H2zh+TbfApQrVo/msKaGmkGBrNN8kenH84plf+ATTYxawTLpzLiTV6z9mnZqBCvE+vLnck+FZtwYWyA4uIrYoEn4K9arSAUOWO+vWrZiWdP1u3ABCm64qNkUzVwvIBW4wu61uqKZpgvAJTtNrPuoAzimx8Rqow7gejuMchqEEtAapQZQApoQC0pBDWJBSUAsQCxALEAsAMQqms/ubZSNHIYRyzVP3FYrY31x2d9ZJ01rIhiAWO6or4nI65vq5NL2uDx7B5PYiOWYW+ui8uHmBjn1cFx6buLNFmI5xqQyuT6+p0Fa6ykJYjlm1+0xufBo3NsmbbsExHKGNfTW2JtgT7XWUhDEcktbQ1QO9zbKNw81SXcL/RdiOWbrzWtkpC8u79/dIOtibI+I5Zjn22Ny9bFmefnOtRKjaojlkpbaiLzdVS9jfc3Sfwv9F2I5piMelWMPNHrpbKb/QizH2Ko1si3urWK2mgFiOcP6Leu7rP96YcNaCoJYbrET47vd9d4J0k6SiAVOsTsvu/uy8Ry7C0MscIqN59jtfVjHcxCrhGSP5+xuiyEWuMXGcz7aEq7xHMQqI/54jklmsiEWOMW2Rdsegzyeg1gVwh/P+e6RuNfoIxY4pb0x6l1NBG08B7GqBLtUPbMt7l2yBmE8B7GqCGu37LWQP56zmtsvxKpC/hvPia/a8RzEqmJi0dW7ZPG2tAqZnluQfRdScvDKjMzOIxY44IOfZmXP+aRMzi6s6udArCph+O8b8tLZpIxOpwPxPIhVYSauz3sr1Ke/zAXquRCrQiRuLMhbP8zIO5dmJJleCNzzIVYFOPSz9VEp+TU5H9hnRKwycnoqLQOj173PoINYZeCP1Ly8MZ7yTnxhAbFKiPVO1kNZL2U9VZhArBLx+W9z3mnvcmI+lM+PWI45d836qKR3LxVmEMsRdlNufdTgjzOSXqAeiFUkJpG909v7fcp7xweIVTRDf87JK+dSMn4tTTEQq3isIR84m/TEAsQqmiCMsyBWlRGUcRbEqhKCNs6CWBUmqOMsiFUhgj7OglgVIAzjLIhVRsI0zoJYZSCM4yyIVULCPM6CWCUi7OMs5SIiR6b4JwvO4b/YA2IBYgFiASAWIBaEmFnEglKQMLF4nwGumTCxLlMHcMy4iTVMHcAxJ0ysr6kDOOaoiXVUM0ktwBEn/R4rqTlIPcARB+wXm26wzybNVc166gJFrlb32xf+PVZCs4+6QJHs8b/IviAd1JymNrBCrJ064f/G3wp92jRn2BJhmRzX7NCk861YxoRmO6dEWAYXNU9nS5VPLGNU0yvcyENhK5U169O531jsJbRJtUUzRO1giZ5qx2K721LTDdOZH3yG1QuysAPeg5qB3O2vULF8DmnuyvxFCBZeTmZ6qd7s099i5J4KC6Fb06/p0nTIv5erHdQ9UIxmVqPRTL7MHOwK5h8BBgAHUHTXJ6KlKQAAAABJRU5ErkJggg==' });
  stills.appendChild(play_btn);

  // Link to play the video
  var play_video_link = $E('a',
      { 'class': 'play_video_link',
        'href': 'javascript:void(0);' });
  play_video_link.appendChild(stills);

  // Append the previews and the link (and a break)
  $('div_' + videoID).appendChild(play_video_link);
  $('div_' + videoID).appendChild($E('br'));

  // When clicked, that link should create the player
  play_video_link.addEventListener('click', function(e){buildPlayer(player,videoID)}, false);

}

// Checks if the URL is a Youtube Video
function makeVideoRequests(embed, embedURL) {

  // Start of the URLs
  var baseURL = 'http://youtube.com/watch?v=';

  // Regular expression to match the video ID
  var re = new RegExp("http:\/\/.*youtube(-nocookie)?\.com\/v\/([^\&]*).*");

  // Check the URL and process the result
  var result = re.exec(embedURL);
  if (result) {

    // Extract the data from the url and build a link
    var parts = embedURL.split(re);
    var videoID = parts[2];
    var link = baseURL + videoID;

    // Set the ID to the embed, we need to reach it later
    embed.id = videoID;

    // Make the request to gather all the needed data
    GM_xmlhttpRequest({ method: 'GET', url: link, onload: processResponse });

  }

}

// Receives the requested page and process it
function processResponse(response) {

  // Search the videoID in the source code
  try {
    var videoID = response.responseText.match(/'VIDEO_ID': '([^']+)'/)[1];
  } catch (e) {
    return;
  }

  // Get the old player and its height/width
  var embed = $(videoID);
  var height = (embed.height ? embed.height : 385);
  var width = (embed.width ? embed.width : 480);

  // Build the div that will contains the new player
  var embedDiv = $E('div', {'id': 'div_' + videoID, 'class': 'watch-player-div'});

  // Insert the Div/Delete the old player
  // There are two cases: it's the official code or it's the one that validates
  if (embed.parentNode.nodeName.toLowerCase() == 'object') {
    embed.parentNode.parentNode.insertBefore(embedDiv, embed.parentNode);
    embed.parentNode.parentNode.removeChild(embed.parentNode);
  } else {
    embed.parentNode.insertBefore(embedDiv, embed);
    embed.parentNode.removeChild(embed);
  }

  // Get the video "T", the temporal variable that allows to play the video like if we were in the site
  var videoT = response.responseText.match(/"t": "([^"]+)"/)[1];

  // BTW, calculate if the video is HD or not
  if (response.responseText.match(/'IS_HD_AVAILABLE': true/))
    var isHDAvailable = true;
  else
    var isHDAvailable = false;

  // Map with the qualities of the video (needed for offering HD in Flash)
  var fmtMap = response.responseText.match(/"fmt_map": "([^"]+)"/)[1];

  // Generate the link to the Youtube Page
  var directLink = 'http://youtube.com/watch?v=' + videoID;

  var mp4SrcSD = 'http://www.youtube.com/get_video?video_id=' + videoID + '&t=' + videoT + '&fmt=18';

  var mp4SrcHD = 'http://www.youtube.com/get_video?video_id=' + videoID + '&t=' + videoT + '&fmt=22';

  var flashPlayer = '<embed type="application/x-shockwave-flash" src="http://s.ytimg.com/yt/swf/watch_as3-vfl138567.swf" ' +
    'flashvars="video_id=' + videoID + '&amp;t=' + videoT + '&amp;fmt_map=' + fmtMap + '" quality="high" allowfullscreen="true" height="' + height +
    '" width="' + width + '">';

  var mp4Player = '<embed class="mp4-player" type="video/mp4" src="' + mp4SrcSD + '" '
          + 'height="' + height + '" width="' + width + '" scale="aspect"></embed>';

  var hdPlayer = '<embed class="hd-player" type="video/mp4" src="' + mp4SrcHD + '" '
          + 'height="' + height + '" width="' + width + '" scale="aspect"></embed>';

  GM_addStyle("\
      #div_" + videoID + " { height: " + height + "px !important; width: " + width + "px; !important}\
      #table_" + videoID + " { width: " + width + "px; !important}\
      #div_" + videoID + " .play_btn { left: -" + width + "px !important; \
      padding: " + (height - 100)/2 + "px " + (width - 150)/2 + "px !important}\
      #div_" + videoID + " .still0 { height: " + height + "px !important; width: " + width + "px !important; }".
        replace(/}/g,"}\n"));

  // Generate the preview
  stopPlayer(videoID, mp4Player);

  // Create the buttons
  var control_table = $E('table', { 'class': 'control_table', 'id': 'table_' + videoID });
  var control_row = $E('tr');
  control_row.appendChild(buildButton('Play MP4', 'mp4play' + videoID, function(e){buildPlayer(mp4Player,videoID)}));
  if (isHDAvailable) {
    control_row.appendChild(buildButton('Play HD', 'hdplay' + videoID, function(e){buildPlayer(hdPlayer,videoID)}));
  }
  control_row.appendChild(buildButton('Play Flash', 'flashplay' + videoID, function(e){buildPlayer(flashPlayer,videoID)}));
  control_row.appendChild(buildButton('Stop', 'stop' + videoID, function(e){stopPlayer(videoID,mp4Player)}));
  control_row.appendChild(buildButton('Download', 'download' + videoID, (isHDAvailable ?
    function(e){window.location = mp4SrcHD} : function(e){window.location = mp4SrcSD})));
  control_row.appendChild(buildButton('Go to YouTube', 'link' + videoID, function(e){window.open(directLink)}));
  control_table.appendChild(control_row);

  // Insert the buttons
  embedDiv.parentNode.insertBefore(control_table, embedDiv.nextSibling);

}

// Search for embedded YouTube videos
function searchForVideos() {

  // Nodes that can be a video (embed, object)
  var embeds, embed;

  // URL extracted from the embeds
  var embedURL;

  // We have to look look for <embed> tags, as well as <object> tags that have data attributes
  embeds = document.evaluate(
           "//object[@data] | //embed",
           document,
           null,
           XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
           null);

  // Process all the found nodes, one by one
  for (i = 0; i < embeds.snapshotLength; i++) {

    // Reset the url
    embedURL = 0;

    // Get an embed
    embed = embeds.snapshotItem(i);

    // Get the embed url from the embed node
    if (embed.nodeName.toLowerCase() == 'object')
      embedURL = embed.data;
    else
      embedURL = embed.src;

    // If exists, process the node
    if (embedURL) {
      makeVideoRequests(embed, embedURL);
    }

  }

}

// This will be called when the DOM is loaded, searching for any video
searchForVideos();

// This will be called when new elements appears in the DOM, like when loading a new post in Google Reader
document.body.addEventListener('DOMNodeInserted', function(e) {setTimeout(function() {searchForVideos()},0)}, false);

})();