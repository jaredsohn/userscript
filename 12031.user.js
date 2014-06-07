// ==UserScript==
// @name          Pipe-related Flickr images
// @description   On a Yahoo! Pipe's page, displays any related Flickr images (i.e. those tagged with corresponding pipe:id machine tag)
// @namespace     http://flickr.com/groups/flickrpipes/
// @include       http://pipes.yahoo.com/*/*
// @version       2
//by Edward Grech (http://www.flickr.com/people/dwardu/)
// ==/UserScript==
(function() {
  var this_version = 2;
  if(!document.getElementById('runform'))
    return;
  num = 5;
  pipe_id = document.evaluate("//form[@id='runform']//input[@name='_id']/@value", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
  GM_xmlhttpRequest(
    {
      method: 'GET',
      url:    'http://pipes.yahoo.com/pipes/pipe.run?_id=cvlreqAv3BGnitHFyzUFzw&_render=json&num='+num+'&pipe_id='+pipe_id+'&sort=interestingness&v='+this_version,
      onload: function(responseDetails) {
        if(responseDetails.status == 200) {
          eval('rsp='+responseDetails.responseText);
          if(rsp.count > 0) {
            sideentry = document.evaluate("//div[@class='sideentry pipeentry']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            sideentry.appendChild(document.createElement('br'));
            flickr_ulist = document.createElement('ul');
            flickr_ulist.className = 'taglist sidebartags';
            flickr_ulist.innerHTML = '<li class="first">Related <span style="color: #0063dc;">flick</span><span style="color: #ff0084;">r</span> images:</li>';
            items = rsp.value.items;
            for(i = 0; i < items.length; i++) {
              item = items[i];
              flickr_ulist.innerHTML += '\
                <li style="margin: 12px 0 12px 0;">\
                  <a href="'+item.link+'" title="'+item.title+' (posted by '+item.author+')">\
                    <img style="margin: 0; display:block; border:1px solid #e0e0e0;" \
                         src="'+item['media:thumbnail'].url+'" \
                         width="178px" \
                         alt="'+item.title+'" />\
                  </a>\
                </li>'
            }
            flickr_ulist.innerHTML += '<li><a class="thumba" href="http://pipes.yahoo.com/pipes/pipe.info?_id=cvlreqAv3BGnitHFyzUFzw&_run=1&pipe_id='+pipe_id+'&num=20&sort=interestingness&v='+this_version+'">More&hellip;</a></li>';
            sideentry.appendChild(flickr_ulist);
          }
        } else {
          //alert(responseDetails.statusText);
        }
      }
    }
  );
})();