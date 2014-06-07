// ==UserScript==
// @name           best
// @namespace      here
// @description    Add info to better
// @include        http://what.cd/better.php?method*
// @include        https://ssl.what.cd/better.php?method*
// @exclude        http://what.cd/better.php?method=bad_flac
// @exclude        https://ssl.what.cd/better.php?method=bad_flac
// ==/UserScript==

var base = (window.location.toString().indexOf('ssl.what') != -1) ? 'https://ssl.what.cd/' : 'http://what.cd/';
var links = $x("//div[@id='content']/table/tbody/tr[position()!=1]/td[position()=1]/a[position()=2]/@href", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
var tds = $x("//div[@id='content']/table/tbody/tr[position()!=1]/td[position()=1]", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
var i = 0;

tds.forEach(function(td) {
  // xhr
  get(base+links[i++].textContent, function(resp){
    // create dom
    var shtml = prep(resp);
    
    // tags
    var tags = $xo("//UL[@class='stats nobullet']/LI/A[position()=1]", shtml);
    if (tags) {
      var tags_text = '';
      for (var j=0,l=tags.length;j<l;j++) {
        tags_text += (j<l-1) ? tags[j].textContent + ', ' : tags[j].textContent;
      }
    }
    // console.log(tags_text);
    
    // s/l/sn
    var snatch = $xo("//TABLE[@class='torrent_table']//TR[@class='group_torrent']/TD[position()=3]", shtml);
    var seed = $xo("//TABLE[@class='torrent_table']//TR[@class='group_torrent']/TD[position()=4]", shtml);
    var leech = $xo("//TABLE[@class='torrent_table']//TR[@class='group_torrent']/TD[position()=5]", shtml);
    snatch = addAll(snatch);
    seed = addAll(seed);
    leech = addAll(leech);
    
    // place information
    td.innerHTML = td.innerHTML + '<br/>' + 'Snatches: ' + snatch + ' (total), Seeds: ' + seed + ' (total), Leeches: ' + leech + ' (total)<br/>Tags: ' + tags_text;
    
  });  
});

// add em up
function addAll(arr) {
  var sum = 0;
  for (var i=0;i<arr.length;i++) {
    sum += parseInt(arr[i].textContent);
  };
  return sum;
}

// xpath helper
function $x() {
  var x='', node=document, type=0, fix=true, i=0, cur,
  toAr=function(xp){      // xpath result to array
    var final=[], next;
    while(next=xp.iterateNext())
      final.push(next);
    return final
  };
while (cur=arguments[i++])      // argument handler
  switch(typeof cur) {
    case "string":x+=(x=='') ? cur : " | " + cur;continue;
    case "number":type=cur;continue;
    case "object":node=cur;continue;
    case "boolean":fix=cur;continue;
  }
if (fix) {      // array conversion logic
  if (type==6) type=4;
  if (type==7) type=5;
}
if (!/^\//.test(x)) x="//"+x;         	 // selection mistake helper
if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
var temp=node.evaluate(x,node,null,type,null); //evaluate!
if (fix)
  switch(type) {                              // automatically return special type
    case 1:return temp.numberValue;
    case 2:return temp.stringValue;
    case 3:return temp.booleanValue;
    case 8:return temp.singleNodeValue;
    case 9:return temp.singleNodeValue;
  }
  return fix ? toAr(temp) : temp;
}

// custom owner xpath helper
// XML needs xpath to be in all caps for some strange reason
function $xo(xpath, owner) {  
	// Evaluate xpath
	var nodes = owner.evaluate(xpath, owner, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (nodes.snapshotLength > 0) {
		// Prepare result array
		var result = new Array(nodes.snapshotLength);

		// Iterate results
		for (var x=0; x<result.length; x++) {
			result[x] = nodes.snapshotItem(x);
		}
	} else {
		result = false;
	}
	
	return result;
}

// ajax helper
function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText) }
  })
}

// tag stripper
function stripHTML(oldString) {

   var newString = "";
   var inTag = false;
   for(var i = 0; i < oldString.length; i++) {
   
        if(oldString.charAt(i) == '<') inTag = true;
        if(oldString.charAt(i) == '>') {
              if(oldString.charAt(i+1)=="<")
              {
                  //dont do anything
  }
  else
  {
    inTag = false;
    i++;
  }
        }
   
        if(!inTag) newString += oldString.charAt(i);

   }

   return newString;
}

// bracket stripper
function stripBrackets(oldString) {

   var newString = "";
   var inTag = false;
   for(var i = 0; i < oldString.length; i++) {
   
        if(oldString.charAt(i) == '[') inTag = true;
        if(oldString.charAt(i) == ']') {
              if(oldString.charAt(i+1)=="[")
              {
                  //dont do anything
  }
  else
  {
    inTag = false;
    i++;
  }
        }
   
        if(!inTag) newString += oldString.charAt(i);

   }

   return newString;
}

// whitespace stripper
function stripWhiteSpace(str) {
  var l = str.length, str_new = '';
  for(var i=0;i<l;i++) {
    if (str.charAt(i) != ' ' && str.charAt(i) != '\t' && str.charAt(i) != '\n') {
      str_new += str.charAt(i);
      if (str.charAt(i+1) == ' ' || str.charAt(i+1) == '\t' || str.charAt(i+1) == '\n') str_new += ', ';
    }
  }
  return str_new.substring(0, str_new.length - 2);
}

// serialize dom object
function prep(html) {
  var p = new DOMParser(), xs = new XMLSerializer(), div = document.createElement('div');
  div.innerHTML = html.split(/<body[^>]*>((.|\n|\r|\u2028|\u2029)*)<\/body>/gi)[1];
  return p.parseFromString(xs.serializeToString(div),"text/xml");
}