// Based on the original emoticonsforblogger by Kuribo (http://www.kuribo.info/2006/04/emoticons-for-blogger.html)
// Modified by Nia (http://michaela-nathania.blogspot.com/) 

// FEATURES
// Works only in Compose modes
// Add the emoticons at the end of the text

// TODO
// modify the script to insert the emoticon directly after the cursor

// ==UserScript==
// @name           Funny Crazy Monkey Emoticon
// @namespace      http://michaela-nathania.blogspot.com
// @description    You can use emoticons in Blogger by michaela-nathania.blogspot.com. Follow my blog for the notification of new script
// @include        http://*.blogger.com/post-edit.g?*
// @include        http://*.blogger.com/post-create.g?*
// ==/UserScript==

window.addEventListener("load", function(e) {


function setemoticons(domname) 
{
var editbar = document.getElementById(domname);
  if (editbar) {

    var buttons = "<br />";

buttons += emoticonButton("crazy-monkey-emoticon-001", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-001.gif");
buttons += emoticonButton("crazy-monkey-emoticon-002", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-002.gif");
buttons += emoticonButton("crazy-monkey-emoticon-003", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-003.gif");
buttons += emoticonButton("crazy-monkey-emoticon-004", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-004.gif");
buttons += emoticonButton("crazy-monkey-emoticon-005", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-005.gif");
buttons += emoticonButton("crazy-monkey-emoticon-006", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-006.gif");
buttons += emoticonButton("crazy-monkey-emoticon-007", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-007.gif");
buttons += emoticonButton("crazy-monkey-emoticon-008", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-008.gif");
buttons += emoticonButton("crazy-monkey-emoticon-009", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-009.gif");
buttons += emoticonButton("crazy-monkey-emoticon-010", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-010.gif");
buttons += emoticonButton("crazy-monkey-emoticon-011", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-011.gif");
buttons += emoticonButton("crazy-monkey-emoticon-012", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-012.gif");
buttons += emoticonButton("crazy-monkey-emoticon-013", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-013.gif");
buttons += emoticonButton("crazy-monkey-emoticon-014", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-014.gif");
buttons += emoticonButton("crazy-monkey-emoticon-015", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-015.gif");
buttons += emoticonButton("crazy-monkey-emoticon-016", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-016.gif");
buttons += emoticonButton("crazy-monkey-emoticon-017", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-017.gif");
buttons += emoticonButton("crazy-monkey-emoticon-018", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-018.gif");
buttons += emoticonButton("crazy-monkey-emoticon-019", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-019.gif");
buttons += emoticonButton("crazy-monkey-emoticon-020", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-020.gif");
buttons += emoticonButton("crazy-monkey-emoticon-021", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-021.gif");
buttons += emoticonButton("crazy-monkey-emoticon-022", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-022.gif");
buttons += emoticonButton("crazy-monkey-emoticon-024", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-024.gif");
buttons += emoticonButton("crazy-monkey-emoticon-025", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-025.gif");
buttons += emoticonButton("crazy-monkey-emoticon-026", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-026.gif");
buttons += emoticonButton("crazy-monkey-emoticon-027", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-027.gif");
buttons += emoticonButton("crazy-monkey-emoticon-028", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-028.gif");
buttons += emoticonButton("crazy-monkey-emoticon-029", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-029.gif");
buttons += emoticonButton("crazy-monkey-emoticon-030", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-030.gif");
buttons += emoticonButton("crazy-monkey-emoticon-031", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-031.gif");
buttons += emoticonButton("crazy-monkey-emoticon-033", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-033.gif");
buttons += emoticonButton("crazy-monkey-emoticon-034", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-034.gif");
buttons += emoticonButton("crazy-monkey-emoticon-035", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-035.gif");
buttons += emoticonButton("crazy-monkey-emoticon-036", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-036.gif");
buttons += emoticonButton("crazy-monkey-emoticon-037", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-037.gif");
buttons += emoticonButton("crazy-monkey-emoticon-039", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-039.gif");
buttons += emoticonButton("crazy-monkey-emoticon-040", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-040.gif");
buttons += emoticonButton("crazy-monkey-emoticon-041", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-041.gif");
buttons += emoticonButton("crazy-monkey-emoticon-042", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-042.gif");
buttons += emoticonButton("crazy-monkey-emoticon-043", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-043.gif");
buttons += emoticonButton("crazy-monkey-emoticon-044", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-044.gif");
buttons += emoticonButton("crazy-monkey-emoticon-045", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-045.gif");
buttons += emoticonButton("crazy-monkey-emoticon-046", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-046.gif");
buttons += emoticonButton("crazy-monkey-emoticon-047", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-047.gif");
buttons += emoticonButton("crazy-monkey-emoticon-048", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-048.gif");
buttons += emoticonButton("crazy-monkey-emoticon-049", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-049.gif");
buttons += emoticonButton("crazy-monkey-emoticon-050", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-050.gif");
buttons += emoticonButton("crazy-monkey-emoticon-051", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-051.gif");
buttons += emoticonButton("crazy-monkey-emoticon-052", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-052.gif");
buttons += emoticonButton("crazy-monkey-emoticon-053", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-053.gif");
buttons += emoticonButton("crazy-monkey-emoticon-054", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-054.gif");
buttons += emoticonButton("crazy-monkey-emoticon-055", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-055.gif");
buttons += emoticonButton("crazy-monkey-emoticon-056", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-056.gif");
buttons += emoticonButton("crazy-monkey-emoticon-057", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-057.gif");
buttons += emoticonButton("crazy-monkey-emoticon-058", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-058.gif");
buttons += emoticonButton("crazy-monkey-emoticon-059", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-059.gif");
buttons += emoticonButton("crazy-monkey-emoticon-060", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-060.gif");
buttons += emoticonButton("crazy-monkey-emoticon-061", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-061.gif");
buttons += emoticonButton("crazy-monkey-emoticon-062", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-062.gif");
buttons += emoticonButton("crazy-monkey-emoticon-064", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-064.gif");
buttons += emoticonButton("crazy-monkey-emoticon-065", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-065.gif");
buttons += emoticonButton("crazy-monkey-emoticon-066", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-066.gif");
buttons += emoticonButton("crazy-monkey-emoticon-067", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-067.gif");
buttons += emoticonButton("crazy-monkey-emoticon-068", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-068.gif");
buttons += emoticonButton("crazy-monkey-emoticon-069", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-069.gif");
buttons += emoticonButton("crazy-monkey-emoticon-070", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-070.gif");
buttons += emoticonButton("crazy-monkey-emoticon-071", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-071.gif");
buttons += emoticonButton("crazy-monkey-emoticon-072", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-072.gif");
buttons += emoticonButton("crazy-monkey-emoticon-073", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-073.gif");
buttons += emoticonButton("crazy-monkey-emoticon-074", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-074.gif");
buttons += emoticonButton("crazy-monkey-emoticon-075", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-075.gif");
buttons += emoticonButton("crazy-monkey-emoticon-076", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-076.gif");
buttons += emoticonButton("crazy-monkey-emoticon-077", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-077.gif");
buttons += emoticonButton("crazy-monkey-emoticon-078", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-078.gif");
buttons += emoticonButton("crazy-monkey-emoticon-079", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-079.gif");
buttons += emoticonButton("crazy-monkey-emoticon-080", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-080.gif");
buttons += emoticonButton("crazy-monkey-emoticon-081", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-081.gif");
buttons += emoticonButton("crazy-monkey-emoticon-082", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-082.gif");
buttons += emoticonButton("crazy-monkey-emoticon-083", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-083.gif");
buttons += emoticonButton("crazy-monkey-emoticon-084", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-084.gif");
buttons += emoticonButton("crazy-monkey-emoticon-085", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-085.gif");
buttons += emoticonButton("crazy-monkey-emoticon-086", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-086.gif");
buttons += emoticonButton("crazy-monkey-emoticon-087", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-087.gif");
buttons += emoticonButton("crazy-monkey-emoticon-088", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-088.gif");
buttons += emoticonButton("crazy-monkey-emoticon-089", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-089.gif");
buttons += emoticonButton("crazy-monkey-emoticon-090", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-090.gif");
buttons += emoticonButton("crazy-monkey-emoticon-091", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-091.gif");
buttons += emoticonButton("crazy-monkey-emoticon-092", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-092.gif");
buttons += emoticonButton("crazy-monkey-emoticon-093", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-093.gif");
buttons += emoticonButton("crazy-monkey-emoticon-094", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-094.gif");
buttons += emoticonButton("crazy-monkey-emoticon-095", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-095.gif");
buttons += emoticonButton("crazy-monkey-emoticon-096", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-096.gif");
buttons += emoticonButton("crazy-monkey-emoticon-097", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-097.gif");
buttons += emoticonButton("crazy-monkey-emoticon-099", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-099.gif");
buttons += emoticonButton("crazy-monkey-emoticon-100", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-100.gif");
buttons += emoticonButton("crazy-monkey-emoticon-101", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-101.gif");
buttons += emoticonButton("crazy-monkey-emoticon-102", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-102.gif");
buttons += emoticonButton("crazy-monkey-emoticon-103", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-103.gif");
buttons += emoticonButton("crazy-monkey-emoticon-104", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-104.gif");
buttons += emoticonButton("crazy-monkey-emoticon-105", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-105.gif");
buttons += emoticonButton("crazy-monkey-emoticon-106", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-106.gif");
buttons += emoticonButton("crazy-monkey-emoticon-107", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-107.gif");
buttons += emoticonButton("crazy-monkey-emoticon-108", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-108.gif");
buttons += emoticonButton("crazy-monkey-emoticon-109", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-109.gif");
buttons += emoticonButton("crazy-monkey-emoticon-110", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-110.gif");
buttons += emoticonButton("crazy-monkey-emoticon-111", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-111.gif");
buttons += emoticonButton("crazy-monkey-emoticon-112", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-112.gif");
buttons += emoticonButton("crazy-monkey-emoticon-113", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-113.gif");
buttons += emoticonButton("crazy-monkey-emoticon-114", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-114.gif");
buttons += emoticonButton("crazy-monkey-emoticon-115", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-115.gif");
buttons += emoticonButton("crazy-monkey-emoticon-116", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-116.gif");
buttons += emoticonButton("crazy-monkey-emoticon-117", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-117.gif");
buttons += emoticonButton("crazy-monkey-emoticon-118", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-118.gif");
buttons += emoticonButton("crazy-monkey-emoticon-119", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-119.gif");
buttons += emoticonButton("crazy-monkey-emoticon-120", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-120.gif");
buttons += emoticonButton("crazy-monkey-emoticon-121", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-121.gif");
buttons += emoticonButton("crazy-monkey-emoticon-122", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-122.gif");
buttons += emoticonButton("crazy-monkey-emoticon-123", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-123.gif");
buttons += emoticonButton("crazy-monkey-emoticon-124", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-124.gif");
buttons += emoticonButton("crazy-monkey-emoticon-125", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-125.gif");
buttons += emoticonButton("crazy-monkey-emoticon-126", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-126.gif");
buttons += emoticonButton("crazy-monkey-emoticon-127", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-127.gif");
buttons += emoticonButton("crazy-monkey-emoticon-128", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-128.gif");
buttons += emoticonButton("crazy-monkey-emoticon-129", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-129.gif");
buttons += emoticonButton("crazy-monkey-emoticon-130", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-130.gif");
buttons += emoticonButton("crazy-monkey-emoticon-131", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-131.gif");
buttons += emoticonButton("crazy-monkey-emoticon-132", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-132.gif");
buttons += emoticonButton("crazy-monkey-emoticon-133", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-133.gif");
buttons += emoticonButton("crazy-monkey-emoticon-134", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-134.gif");
buttons += emoticonButton("crazy-monkey-emoticon-135", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-135.gif");
buttons += emoticonButton("crazy-monkey-emoticon-136", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-136.gif");
buttons += emoticonButton("crazy-monkey-emoticon-137", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-137.gif");
buttons += emoticonButton("crazy-monkey-emoticon-138", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-138.gif");
buttons += emoticonButton("crazy-monkey-emoticon-139", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-139.gif");
buttons += emoticonButton("crazy-monkey-emoticon-140", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-140.gif");
buttons += emoticonButton("crazy-monkey-emoticon-141", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-141.gif");
buttons += emoticonButton("crazy-monkey-emoticon-142", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-142.gif");
buttons += emoticonButton("crazy-monkey-emoticon-143", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-143.gif");
buttons += emoticonButton("crazy-monkey-emoticon-144", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-144.gif");
buttons += emoticonButton("crazy-monkey-emoticon-145", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-145.gif");
buttons += emoticonButton("crazy-monkey-emoticon-146", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-146.gif");
buttons += emoticonButton("crazy-monkey-emoticon-147", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-147.gif");
buttons += emoticonButton("crazy-monkey-emoticon-148", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-148.gif");
buttons += emoticonButton("crazy-monkey-emoticon-149", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-149.gif");
buttons += emoticonButton("crazy-monkey-emoticon-150", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-150.gif");
buttons += emoticonButton("crazy-monkey-emoticon-151", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-151.gif");
buttons += emoticonButton("crazy-monkey-emoticon-152", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-152.gif");
buttons += emoticonButton("crazy-monkey-emoticon-153", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-153.gif");
buttons += emoticonButton("crazy-monkey-emoticon-154", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-154.gif");
buttons += emoticonButton("crazy-monkey-emoticon-155", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-155.gif");
buttons += emoticonButton("crazy-monkey-emoticon-156", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-156.gif");
buttons += emoticonButton("crazy-monkey-emoticon-157", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-157.gif");
buttons += emoticonButton("crazy-monkey-emoticon-158", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-158.gif");
buttons += emoticonButton("crazy-monkey-emoticon-159", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-159.gif");
buttons += emoticonButton("crazy-monkey-emoticon-160", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-160.gif");
buttons += emoticonButton("crazy-monkey-emoticon-161", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-161.gif");
buttons += emoticonButton("crazy-monkey-emoticon-162", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-162.gif");
buttons += emoticonButton("crazy-monkey-emoticon-163", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-163.gif");
buttons += emoticonButton("crazy-monkey-emoticon-164", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-164.gif");
buttons += emoticonButton("crazy-monkey-emoticon-165", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-165.gif");
buttons += emoticonButton("crazy-monkey-emoticon-166", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-166.gif");
buttons += emoticonButton("crazy-monkey-emoticon-167", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-167.gif");
buttons += emoticonButton("crazy-monkey-emoticon-168", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-168.gif");
buttons += emoticonButton("crazy-monkey-emoticon-169", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-169.gif");
buttons += emoticonButton("crazy-monkey-emoticon-170", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-170.gif");
buttons += emoticonButton("crazy-monkey-emoticon-171", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-171.gif");
buttons += emoticonButton("crazy-monkey-emoticon-173", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-173.gif");
buttons += emoticonButton("crazy-monkey-emoticon-174", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-174.gif");
buttons += emoticonButton("crazy-monkey-emoticon-175", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-175.gif");
buttons += emoticonButton("crazy-monkey-emoticon-176", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-176.gif");
buttons += emoticonButton("crazy-monkey-emoticon-177", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-177.gif");
buttons += emoticonButton("crazy-monkey-emoticon-178", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-178.gif");
buttons += emoticonButton("crazy-monkey-emoticon-179", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-179.gif");
buttons += emoticonButton("crazy-monkey-emoticon-180", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-180.gif");
buttons += emoticonButton("crazy-monkey-emoticon-181", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-181.gif");
buttons += emoticonButton("crazy-monkey-emoticon-182", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-182.gif");
buttons += emoticonButton("crazy-monkey-emoticon-183", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-183.gif");
buttons += emoticonButton("crazy-monkey-emoticon-184", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-184.gif");
buttons += emoticonButton("crazy-monkey-emoticon-185", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-185.gif");
buttons += emoticonButton("crazy-monkey-emoticon-186", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-186.gif");
buttons += emoticonButton("crazy-monkey-emoticon-187", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-187.gif");
buttons += emoticonButton("crazy-monkey-emoticon-188", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-188.gif");
buttons += emoticonButton("crazy-monkey-emoticon-189", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-189.gif");
buttons += emoticonButton("crazy-monkey-emoticon-190", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-190.gif");
buttons += emoticonButton("crazy-monkey-emoticon-191", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-191.gif");
buttons += emoticonButton("crazy-monkey-emoticon-192", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-192.gif");
buttons += emoticonButton("crazy-monkey-emoticon-193", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-193.gif");
buttons += emoticonButton("crazy-monkey-emoticon-194", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-194.gif");
buttons += emoticonButton("crazy-monkey-emoticon-195", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-195.gif");
buttons += emoticonButton("crazy-monkey-emoticon-196", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-196.gif");
buttons += emoticonButton("crazy-monkey-emoticon-197", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-197.gif");
buttons += emoticonButton("crazy-monkey-emoticon-198", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-198.gif");
buttons += emoticonButton("crazy-monkey-emoticon-199", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-199.gif");
buttons += emoticonButton("crazy-monkey-emoticon-200", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-200.gif");
buttons += emoticonButton("crazy-monkey-emoticon-201", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-201.gif");
buttons += emoticonButton("crazy-monkey-emoticon-202", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-202.gif");
buttons += emoticonButton("crazy-monkey-emoticon-203", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-203.gif");
buttons += emoticonButton("crazy-monkey-emoticon-204", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-204.gif");
buttons += emoticonButton("crazy-monkey-emoticon-205", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-205.gif");
buttons += emoticonButton("crazy-monkey-emoticon-206", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-206.gif");
buttons += emoticonButton("crazy-monkey-emoticon-207", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-207.gif");
buttons += emoticonButton("crazy-monkey-emoticon-208", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-208.gif");
buttons += emoticonButton("crazy-monkey-emoticon-209", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-209.gif");
buttons += emoticonButton("crazy-monkey-emoticon-210", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-210.gif");
buttons += emoticonButton("crazy-monkey-emoticon-211", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-211.gif");
buttons += emoticonButton("crazy-monkey-emoticon-212", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-212.gif");
buttons += emoticonButton("crazy-monkey-emoticon-213", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-213.gif");
buttons += emoticonButton("crazy-monkey-emoticon-214", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-214.gif");
buttons += emoticonButton("crazy-monkey-emoticon-215", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-215.gif");
buttons += emoticonButton("crazy-monkey-emoticon-216", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-216.gif");
buttons += emoticonButton("crazy-monkey-emoticon-217", "http://s1219.photobucket.com/albums/dd425/michaela_nathania/crazy-monkey/crazy-monkey-emoticon-217.gif");

	
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