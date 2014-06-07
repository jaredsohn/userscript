// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Nia (http://michaela-nathania.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Tes Emoticon
// @namespace      http://michaela-nathania.blogspot.com
// @description    You can use emoticons in Blogger by michaela-nathania.blogspot.com
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";


buttons += emoticonButton("text-line-smiley-001", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-001.gif");
buttons += emoticonButton("text-line-smiley-002", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-002.gif");
buttons += emoticonButton("text-line-smiley-003", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-003.gif");
buttons += emoticonButton("text-line-smiley-004", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-004.gif");
buttons += emoticonButton("text-line-smiley-005", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-005.gif");
buttons += emoticonButton("text-line-smiley-006", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-006.gif");
buttons += emoticonButton("text-line-smiley-007", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-007.gif");
buttons += emoticonButton("text-line-smiley-008", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-008.gif");
buttons += emoticonButton("text-line-smiley-009", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-009.gif");
buttons += emoticonButton("text-line-smiley-010", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-010.gif");
buttons += emoticonButton("text-line-smiley-011", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-011.gif");
buttons += emoticonButton("text-line-smiley-012", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-012.gif");
buttons += emoticonButton("text-line-smiley-013", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-013.gif");
buttons += emoticonButton("text-line-smiley-014", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-014.gif");
buttons += emoticonButton("text-line-smiley-015", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-015.gif");
buttons += emoticonButton("text-line-smiley-016", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-016.gif");
buttons += emoticonButton("text-line-smiley-017", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-017.gif");
buttons += emoticonButton("text-line-smiley-018", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-018.gif");
buttons += emoticonButton("text-line-smiley-019", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-019.gif");
buttons += emoticonButton("text-line-smiley-020", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-020.gif");
buttons += emoticonButton("text-line-smiley-021", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-021.gif");
buttons += emoticonButton("text-line-smiley-022", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-022.gif");
buttons += emoticonButton("text-line-smiley-023", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-023.gif");
buttons += emoticonButton("text-line-smiley-024", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-024.gif");
buttons += emoticonButton("text-line-smiley-025", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-025.gif");
buttons += emoticonButton("text-line-smiley-026", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-026.gif");
buttons += emoticonButton("text-line-smiley-027", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-027.gif");
buttons += emoticonButton("text-line-smiley-028", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-028.gif");
buttons += emoticonButton("text-line-smiley-029", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-029.gif");
buttons += emoticonButton("text-line-smiley-030", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-030.gif");
buttons += emoticonButton("text-line-smiley-031", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-031.gif");
buttons += emoticonButton("text-line-smiley-032", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-032.gif");
buttons += emoticonButton("text-line-smiley-033", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-033.gif");
buttons += emoticonButton("text-line-smiley-034", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-034.gif");
buttons += emoticonButton("text-line-smiley-035", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-035.gif");
buttons += emoticonButton("text-line-smiley-036", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-036.gif");
buttons += emoticonButton("text-line-smiley-037", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-037.gif");
buttons += emoticonButton("text-line-smiley-038", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-038.gif");
buttons += emoticonButton("text-line-smiley-039", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-039.gif");
buttons += emoticonButton("text-line-smiley-040", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-040.gif");
buttons += emoticonButton("text-line-smiley-041", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-041.gif");
buttons += emoticonButton("text-line-smiley-042", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-042.gif");
buttons += emoticonButton("text-line-smiley-043", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-043.gif");
buttons += emoticonButton("text-line-smiley-044", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-044.gif");
buttons += emoticonButton("text-line-smiley-045", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-045.gif");
buttons += emoticonButton("text-line-smiley-046", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-046.gif");
buttons += emoticonButton("text-line-smiley-047", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-047.gif");
buttons += emoticonButton("text-line-smiley-048", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-048.gif");
buttons += emoticonButton("text-line-smiley-049", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-049.gif");
buttons += emoticonButton("text-line-smiley-050", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-050.gif");
buttons += emoticonButton("text-line-smiley-050_002", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-050_002.gif");
buttons += emoticonButton("text-line-smiley-051", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-051.gif");
buttons += emoticonButton("text-line-smiley-052", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-052.gif");
buttons += emoticonButton("text-line-smiley-053", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-053.gif");
buttons += emoticonButton("text-line-smiley-054", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-054.gif");
buttons += emoticonButton("text-line-smiley-055", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-055.gif");
buttons += emoticonButton("text-line-smiley-056", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-056.gif");
buttons += emoticonButton("text-line-smiley-057", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-057.gif");
buttons += emoticonButton("text-line-smiley-058", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-058.gif");
buttons += emoticonButton("text-line-smiley-059", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-059.gif");
buttons += emoticonButton("text-line-smiley-060", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-060.gif");
buttons += emoticonButton("text-line-smiley-061", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-061.gif");
buttons += emoticonButton("text-line-smiley-062", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-062.gif");
buttons += emoticonButton("text-line-smiley-063", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-063.gif");
buttons += emoticonButton("text-line-smiley-064", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-064.gif");
buttons += emoticonButton("text-line-smiley-065", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-065.gif");
buttons += emoticonButton("text-line-smiley-066", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-066.gif");
buttons += emoticonButton("text-line-smiley-067", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-067.gif");
buttons += emoticonButton("text-line-smiley-068", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-068.gif");
buttons += emoticonButton("text-line-smiley-069", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-069.gif");
buttons += emoticonButton("text-line-smiley-070", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-070.gif");
buttons += emoticonButton("text-line-smiley-071", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-071.gif");
buttons += emoticonButton("text-line-smiley-072", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-072.gif");
buttons += emoticonButton("text-line-smiley-073", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-073.gif");
buttons += emoticonButton("text-line-smiley-074", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-074.gif");
buttons += emoticonButton("text-line-smiley-075", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-075.gif");
buttons += emoticonButton("text-line-smiley-076", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-076.gif");
buttons += emoticonButton("text-line-smiley-077", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-077.gif");
buttons += emoticonButton("text-line-smiley-078", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-078.gif");
buttons += emoticonButton("text-line-smiley-079", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-079.gif");
buttons += emoticonButton("text-line-smiley-080", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-080.gif");
buttons += emoticonButton("text-line-smiley-081", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-081.gif");
buttons += emoticonButton("text-line-smiley-082", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-082.gif");
buttons += emoticonButton("text-line-smiley-083", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-083.gif");
buttons += emoticonButton("text-line-smiley-084", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-084.gif");
buttons += emoticonButton("text-line-smiley-085", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-085.gif");
buttons += emoticonButton("text-line-smiley-086", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-086.gif");
buttons += emoticonButton("text-line-smiley-087", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-087.gif");
buttons += emoticonButton("text-line-smiley-088", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-088.gif");
buttons += emoticonButton("text-line-smiley-089", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-089.gif");
buttons += emoticonButton("text-line-smiley-090", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-090.gif");
buttons += emoticonButton("text-line-smiley-091", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-091.gif");
buttons += emoticonButton("text-line-smiley-092", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-092.gif");
buttons += emoticonButton("text-line-smiley-093", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-093.gif");
buttons += emoticonButton("text-line-smiley-094", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-094.gif");
buttons += emoticonButton("text-line-smiley-095", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-095.gif");
buttons += emoticonButton("text-line-smiley-096", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-096.gif");
buttons += emoticonButton("text-line-smiley-097", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-097.gif");
buttons += emoticonButton("text-line-smiley-098", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-098.gif");
buttons += emoticonButton("text-line-smiley-099", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-099.gif");
buttons += emoticonButton("text-line-smiley-100", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-100.gif");
buttons += emoticonButton("text-line-smiley-101", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-101.gif");
buttons += emoticonButton("text-line-smiley-102", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-102.gif");
buttons += emoticonButton("text-line-smiley-103", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-103.gif");
buttons += emoticonButton("text-line-smiley-104", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-104.gif");
buttons += emoticonButton("text-line-smiley-105", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-105.gif");
buttons += emoticonButton("text-line-smiley-106", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-106.gif");
buttons += emoticonButton("text-line-smiley-107", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-107.gif");
buttons += emoticonButton("text-line-smiley-108", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-108.gif");
buttons += emoticonButton("text-line-smiley-109", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-109.gif");
buttons += emoticonButton("text-line-smiley-110", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-110.gif");
buttons += emoticonButton("text-line-smiley-111", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-111.gif");
buttons += emoticonButton("text-line-smiley-112", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-112.gif");
buttons += emoticonButton("text-line-smiley-113", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-113.gif");
buttons += emoticonButton("text-line-smiley-114", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-114.gif");
buttons += emoticonButton("text-line-smiley-116", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-116.gif");
buttons += emoticonButton("text-line-smiley-117", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-117.gif");
buttons += emoticonButton("text-line-smiley-118", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-118.gif");
buttons += emoticonButton("text-line-smiley-119", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-119.gif");
buttons += emoticonButton("text-line-smiley-120", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-120.gif");
buttons += emoticonButton("text-line-smiley-121", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-121.gif");
buttons += emoticonButton("text-line-smiley-122", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-122.gif");
buttons += emoticonButton("text-line-smiley-123", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-123.gif");
buttons += emoticonButton("text-line-smiley-124", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-124.gif");
buttons += emoticonButton("text-line-smiley-125", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-125.gif");
buttons += emoticonButton("text-line-smiley-126", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-126.gif");
buttons += emoticonButton("text-line-smiley-127", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-127.gif");
buttons += emoticonButton("text-line-smiley-128", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-128.gif");
buttons += emoticonButton("text-line-smiley-129", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-129.gif");
buttons += emoticonButton("text-line-smiley-130", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-130.gif");
buttons += emoticonButton("text-line-smiley-131", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-131.gif");
buttons += emoticonButton("text-line-smiley-132", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-132.gif");
buttons += emoticonButton("text-line-smiley-133", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-133.gif");
buttons += emoticonButton("text-line-smiley-134", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-134.gif");
buttons += emoticonButton("text-line-smiley-135", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-135.gif");
buttons += emoticonButton("text-line-smiley-136", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-136.gif");
buttons += emoticonButton("text-line-smiley-137", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-137.gif");
buttons += emoticonButton("text-line-smiley-138", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-138.gif");
buttons += emoticonButton("text-line-smiley-139", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-139.gif");
buttons += emoticonButton("text-line-smiley-140", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-140.gif");
buttons += emoticonButton("text-line-smiley-141", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-141.gif");
buttons += emoticonButton("text-line-smiley-142", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-142.gif");
buttons += emoticonButton("text-line-smiley-143", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-143.gif");
buttons += emoticonButton("text-line-smiley-144", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-144.gif");
buttons += emoticonButton("text-line-smiley-145", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-145.gif");
buttons += emoticonButton("text-line-smiley-146", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-146.gif");
buttons += emoticonButton("text-line-smiley-147", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-147.gif");
buttons += emoticonButton("text-line-smiley-148", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-148.gif");
buttons += emoticonButton("text-line-smiley-149", "http://i1219.photobucket.com/albums/dd425/michaela_nathania/emoticon_textline/text-line-smiley-149.gif");



	
    buttons += separator();

    editbar.innerHTML += buttons;
  }
}


function emoticonButton(name, url) {
  return "<span class='' style='display: block;' id='htmlbar_undefined' title='" + name + "' onmouseover='ButtonHoverOn(this);' onmouseout='ButtonHoverOff(this);' onmouseup='' onmousedown='CheckFormatting(event);(function() {var rich_edit = document.getElementById(\"richeditorframe\");var rich_body = rich_edit.contentDocument.getElementsByTagName(\"body\");rich_body[0].innerHTML+=\"<img src=\\\""+url+"\\\" alt=\\\"" + name + "\\\" title=\\\"" + name + "\\\" />\";})();ButtonMouseDown(this);'><img src='" + url + "' alt='" + name + "' border='0'></span>\n";
}

function separator() {
  return "<div style=\"display: block;\" class=\"vertbar\"><span style=\"display: block;\" class=\"g\">&nbsp;</span><span style=\"display: block;\" class=\"w\">&nbsp;</span></div>\n";
}

setemoticons("formatbar");

 }, false);