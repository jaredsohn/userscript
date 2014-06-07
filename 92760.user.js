// ==UserScript==
// @name           xmas_canceler
// @namespace      natsumatsuri.team-lab.com
// @include        *
// ==/UserScript==

function $(id){
  return document.getElementById(id);
}
function xpath(query,cont) {
  var results = document.evaluate(query, cont||document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var nodes = new Array();
  for(var i=0; i<results.snapshotLength; i++){
    nodes.push(results.snapshotItem(i));
  }
  return nodes;
}
// Google Calendar
if(/https?\:\/\/www\.google\.com\/calendar/.test(document.location.toString())){
  // xx xmas on Google calender
  document.addEventListener('DOMContentLoaded', function(e) {
    function delcal2(){
      var gridcontainer = $("gridcontainer");
      var cdate = $('currentDate:0');
      if(gridcontainer && cdate && / 12/.test(cdate.textContent)){
        if(gridcontainer.firstChild.className=='mv-container'){
          // month
          var daycel23 = xpath("//td[contains(@class,'st-dtitle')]/span[text()='23'][not(@xxmax)]")[0];
          if(daycel23){
            daycel23.setAttribute("xxmax","23");
            var ci = daycel23.parentNode.cellIndex;
            if(ci < 6 ){
              daycel23.parentNode.setAttribute("colspan","2");
              var daycel24 = xpath("//td[@class='st-dtitle']/span[text()='24']")[0];
              daycel24.setAttribute("xxmax","24");
              daycel24.parentNode.style.display="none";
              var t = daycel24.parentNode;
              var pp = xpath("ancestor::div[contains(@class,'month-row')]//td[contains(@class,'st-bg')]",t)[ci];
              pp.setAttribute("colspan","2");
              var d24=xpath("following-sibling::td",pp)[0];
              if(d24)d24.style.display="none";
              if(ci < 5 ){
                daycel23.parentNode.setAttribute("colspan","3");
                daycel25 = xpath("//td[@class='st-dtitle']/span[text()='25']")[0];
                daycel25.setAttribute("xxmax","25");
                daycel25.parentNode.style.display="none";
                var t = daycel25.parentNode;
                pp.setAttribute("colspan","3");
                var d25=xpath("following-sibling::td",d24)[0];
                if(d25)d25.style.display="none";
              }
            }
          }
          var cb=xpath("//td[@class='cb-value'][contains(text(),'24日')]")[0] || xpath("//div[@class='eb-date'][contains(text(),'24日')]")[0];
          if(cb){
            cb.textContent = cb.textContent.replace('24日','23日中盤');
          }
          var cb=xpath("//td[@class='cb-value'][contains(text(),'25日')]")[0] || xpath("//div[@class='eb-date'][contains(text(),'25日')]")[0];
          if(cb){
            cb.textContent = cb.textContent.replace('25日','23日終盤');
          }
        }
      }
      // 左上
      var dp0 = $('dp_0_cur');
      if(/ 12/.test(dp0.textContent)){
        var cel23 = xpath("//td[contains(text(),'23')]",$('dp_0_row_0'))[0];
        if(cel23 && cel23.cellIndex<6){
          if(cel23.cellIndex<5){
            cel23.setAttribute("colspan","3");
            cel23.nextSibling.style.display="none";
            cel23.nextSibling.nextSibling.style.display="none";
          }else{
            cel23.setAttribute("colspan","2");
            cel23.nextSibling.style.display="none";
          }
        }
      }
      setTimeout(delcal,300);
    }
    function delcal(){
      try{
        delcal2()
      }catch(e){
        console.log(e);
      }
    }
    delcal();
  }, false);
}
// Twitter
if(/https?\:\/\/twitter\.com\/.?/.test(document.location.toString())){
  // xx xmas on Google calender
  var $j = null;
  var growlbox = null;
  var showing = null;
function growl(element){
  if(!growlbox){
    growlbox = document.createElement('div');
    growlbox.setAttribute('style','position:fixed;right:0px;bottom:0px;z-index:9999');
    document.body.appendChild(growlbox);
  }
  var grow = document.createElement('div');
  grow.setAttribute('style','color:#fff;width:300px;background:#444;background:rgb(119,34,34);-moz-border-radius:10px;margin:5px;padding:10px;display:none');
  var clbtn = document.createElement('a');
  clbtn.setAttribute('style','float:right;padding:2px;text-decoration:none;color:white;cursor:pointer');
  clbtn.innerHTML='x';
  $j(clbtn).click(close);
  grow.appendChild(clbtn)
  grow.appendChild(element);
  growlbox.appendChild(grow);
  var growq = $j(grow);
  if(showing) showing.end();
  showing = growq;
  showing.slideDown('slow');
  var id = setTimeout(close,20000);
  function close(){
    if(id){
      try{ clearTimeout(id); }catch(e){};
      id=null;
    }
    growq.slideUp('slow').remove();
    return false;
  }
}
var reported={}
function spam(i,div){
  var div = $j(div);
  if(!reported[div.attr('data-user-id')]){
    var user = {
      "name":div.attr('data-screen-name'),
      "id":div.attr('data-user-id'),
      "icon":div.find('.tweet-image:has(.user-profile-link)')[0]
      };
    reported[user.id]=true;
    var tw = document.createElement('div');
    var m = {
      "Remove":"unfollow",
      "Block":"block",
      "Report Spam":"report"
      };
    var buttons = [];
    for(var method in m){
      buttons.push("<a href='#' onclick='javascript:twttr.API.User.find("+user.id+",function(u){if(confirm(u.screenName+\" を "+method+" しますか？\")){ u."+m[method]+"(function(a){alert(u.screenName+\"を "+method+" しました\")}) }});return false'>"+method+"</a>");
    }
    tw.innerHTML='<div style="float:left;margin-right:4px">'+user.icon.innerHTML+'</div>'+user.name+" は精神に害を与えるツイートを発っしました。<br />"+buttons.join(" / ")+"<br style='clear:both' />";
    growl(tw);
  }
}
function jqcheck(){
  if(!unsafeWindow.jQuery) return setTimeout(jqcheck,100);
  $j = unsafeWindow.jQuery;
  document.addEventListener('DOMNodeInserted', function(e) {
    $j("div.stream-tweet:has(div[@class='tweet-text']:contains('クリスマス'))").each(spam);
  },false);
}
  jqcheck();
}
function walker(node) {
	if (node.nodeType === 3) {
          node.textContent = node.textContent.replace(/クリスマス/g, 'ナツマツリ');
          node.textContent = node.textContent.replace(/Christmas/g, 'Natu-matsuri');
	} else if (node.nodeType === 1) {
		if(/^(IFRAME|STYLE|SCRIPT)$/i.test(node.tagName)) {
			// TODO
		} else if (/^(INPUT|TEXTAREA)$/i.test(node.tagName)) {
			node.value = node.value.replace(/クリスマス/g, 'ナツマツリ');
			node.value = node.value.replace(/Christmas/g, 'Natu-matsuri');
		} else {
			var childNodes = node.childNodes;
			for (var i = 0, len = childNodes.length; i < len; ++i) {
				walker(childNodes[i]);
			}
		}
	}
}

walker(document.body || document.documentElement);

if(!/https?\:\/\/twitter\.com\/.?/.test(document.location.toString())){
  document.addEventListener('DOMNodeInserted', function(e) {
    walker(e.target);
  }, false);
}
