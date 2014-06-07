// ==UserScript==
// @name           deliscrobbler
// @namespace      http://hublog.hubmed.org
// @description    deliciousifies Audioscrobbler pages
// @include        http://www.audioscrobbler.com/music/*
// ==/UserScript==
//
// by Alf Eaton, modified from a script by Matt Biddulph at http://hackdiary.com/greasemonkey

function fixyear(n){ return (n<1000)?n+1900 : n; }
function fixmonth(n){ n++; return (n<10)?'0'+n : n; }
function fixdate(n){ return (n<10)?'0'+n : n; }

function tagit() {

    title = document.title;
    title = title.replace('/:: Statistics/', '');
    var today = new Date();
    var y = fixyear(today.getYear());
    var m = fixmonth(today.getMonth());
    var d  = fixdate(today.getDate());
    var dateString = y + '-' + m + '-' + d;
    
    tagbox = document.getElementById('tags');
    tagbutton = document.getElementById('tagbutton');

    post_url = 'http://del.icio.us/api/posts/add?url=' + url + '&description=' + escape(title) + '&tags=' + escape(tagbox.value) + '&dt=' + dateString +'T00:00:00Z&extended=';
    
    GM_xmlhttpRequest({
      method:"GET",
      url:post_url,
      onload:function(result) {
//        document.getElementById('tags').value = "";
        tagbutton.value = "tag";
      }
    });

    tagbutton.value = "posting...";
    tagbutton.disabled = true;
    return false;
}

var artist = document.body.innerHTML.match(/Search for (.*?) at Google/)[1].replace(/\W/, '');
var url = encodeURIComponent(location.href);
var durl = 'http://del.icio.us/url/?url=' + url;
var rss_url = 'http://del.icio.us/rss/tag/' + artist;
var links_url = 'http://del.icio.us/tag/' + artist;

var ndiv=document.createElement('div');
    ndiv.setAttribute('id', 'placeholder');
    ndiv.className = 'sidebox';
//    ndiv.className = 'content';

var nform=document.createElement('form');
    nform.setAttribute('onsubmit', 'tagit(); return false;');

    var ninput=document.createElement('input');
        ninput.setAttribute('id', 'tagbutton');
        ninput.setAttribute('type', 'button');
        ninput.setAttribute('onclick', 'tagit();');
        ninput.setAttribute('value', 'tag');
        ninput.className = 'form';
    var ntext=document.createElement('input');
        ntext.setAttribute('type', 'text');
        ntext.setAttribute('id', 'tags');
        ntext.setAttribute('size', '10');
        ntext.className = 'form';
        
    nform.appendChild(ntext);
    nform.appendChild(ninput);
ndiv.appendChild(nform);

var np = document.createElement('p');
    var na = document.createElement('a');
        na.setAttribute('href', durl);
        na.innerHTML = '<b>tags</b>';
    np.appendChild(na);
ndiv.appendChild(np);

var nlist = document.createElement('ul');
    nlist.setAttribute('style', 'list-style-type: none;');
    nlist.setAttribute('id', 'taglist');
    nlist.className = 'menu';
ndiv.appendChild(nlist);

var np = document.createElement('p');
    var na = document.createElement('a');
        na.setAttribute('href', links_url);
        na.innerHTML = '<b>links</b>';
    np.appendChild(na);
ndiv.appendChild(np);

var nlist = document.createElement('ul');
    nlist.setAttribute('style', 'list-style-type: none;');
    nlist.setAttribute('id', 'linklist');
    nlist.className = 'menu';
ndiv.appendChild(nlist);

document.getElementById('sidebar').appendChild(ndiv);

GM_xmlhttpRequest({
  method:"GET",
  url:durl,
  onload:function(result) {
            
    var findtag = /<a class="delNav" href=".*\/.*\/.*">(.*)<\/a>/g;
    tagged = 0;
    
    while(ar = findtag.exec(result.responseText)) {
        tag = ar[1];
        if(!(tag.match(/^200/))) {
            tagged = 1;
            document.getElementById('tags').value += tag + " ";
    
            var nli=document.createElement('li');
                nli.setAttribute('id', 'tag_'+tag);
                var na=document.createElement('a');
                    na.setAttribute('href','http://del.icio.us/tag/'+tag);
                    na.innerHTML = tag;
            nli.appendChild(na);
            document.getElementById('taglist').appendChild(nli);
        }
    }
    if(!tagged) {
        var nli = document.createElement('li');
            nli.innerHTML = 'no tags yet';
        document.getElementById('taglist').appendChild(nli);
    }
  }
});


GM_xmlhttpRequest({
  method:"GET",
  url:rss_url,
  onload:function(result) {
    var findtitle = /<title>(.*)<\/title>/g;
    content = result.responseText;
    titles = Array();
    while(ar = findtitle.exec(content)) {
        titles[titles.length] = ar[1];
    }

    var findlink = /<link>(.*)<\/link>/g;
    content = result.responseText;
    links = Array();
    while(ar = findlink.exec(content)) {
        links[links.length] = ar[1];
    }

    if(titles.length>2) {
        
        for(var i = 1; i<titles.length; i++) {     
            if(links[i] != location.href) {         
                var nli=document.createElement('li');
                    var na=document.createElement('a');
                        na.setAttribute('href',links[i]);
                        na.innerHTML = titles[i];
                nli.appendChild(na);
                document.getElementById('linklist').appendChild(nli);          
            }
        }
    }
  }
});



