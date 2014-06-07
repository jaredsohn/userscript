// ==UserScript==
// @name           Fandor Roxee Overload
// @description    Demonstrate uses of the Roxee API to access the most complete movie database
// @version        0.1.1
// @author         <dev@webitup.fr>
// @licence        WTFPL
//
// @include        http://www.fandor.com/films/*
// @include        http://www.fandor.com/filmmakers/*
// ==/UserScript==

var dirtyHelper = function(d){
  var res = JSON.stringify(d);
  res = res.replace(/((?:"BEFORE_MUTATION"|"CHANGE"|"AFTER_MUTATION"):"[^"]+",?)/g, '');
  res = res.replace(/((?:"[^"]+":(?:null|\[\]|\{\})),?)/g, '');
  return res;
// "BEFORE_MUTATION":"changestart","CHANGE":"change","AFTER_MUTATION
};


var overloadFilms = function(data){
  var id = data.docid.split('_').pop();

  var media = Roxee.controller.dataFactory.getData(Roxee.model.data.types.MOVIE, id);

  media.addEventListener(media.AFTER_MUTATION, function(){
    var nod = document.createElement('div');
    nod.setAttribute('class', 'span-8 last');
    unsafeWindow.$('.span-24.last.film-page')[0].appendChild(nod);
    // document.body.appendChild(nod);
    var add = '<table id="roxee-datas" style="width: 90%; border: 1px solid black; max-width: 600px; overflow: scroll;">'
    add += '<tr><td>title</td><td>' + media.title + '</td></tr>';

    add += '<tr><td>picture</td><td><img src="' + (media.links.covers.medium ? media.links.covers.medium : media.links.covers.thumbnail) + '" /></td></td>';
    if(media.links.gallery.fanart.length)
      add += '<tr><td>fanart</td><td><img src="' + media.links.gallery.fanart.pop() + '" /></td></td>';
    if(media.links.gallery.posters.length)
      add += '<tr><td>posters</td><td><img src="' + media.links.gallery.posters.pop() + '" /></td></td>';
    if(media.links.gallery.banners.length)
      add += '<tr><td>banners</td><td><img src="' + media.links.gallery.banners.pop() + '" /></td></td>';

    if(media.links.imdb)
      add += '<tr><td>imdb</td><td><a href="' + media.links.imdb + '">imdb</a></td></tr>';
    if(media.links.wikipedia)
      add += '<tr><td>wikipedia</td><td><a href="' + media.links.wikipedia + '">wikipedia</a></td></tr>';
    if(media.links.freebase)
      add += '<tr><td>freebase</td><td><a href="' + media.links.freebase + '">freebase</a></td></tr>';
    if(media.links.homepage)
      add += '<tr><td>homepage</td><td><a href="' + media.links.homepage + '">homepage</a></td></tr>';
    if(media.links.trailer)
      add += '<tr><td>trailer</td><td><a href="' + media.links.trailer + '">trailer</a></td></tr>';


    add += '<tr><td>summary</td><td>' + media.summary + '</td></tr>';
    add += '<tr><td>akas</td><td>' + media.akas.join('<br />') + '</td></tr>';
    add += '<tr><td>taglines</td><td>' + media.taglines.join('<br />') + '</td></tr>';
    add += '<tr><td>keywords</td><td>' + media.keywords.join('<br />') + '</td></tr>';
    add += '<tr><td>genres</td><td>' + media.genres.join('<br />') + '</td></tr>';
    add += '<tr><td>releaseDate</td><td>' + media.releaseDate + '</td></tr>';
    add += '<tr><td>specs</td><td>' + dirtyHelper(media.specs) + '</td></tr>';
    // add += '<tr><td>links</td><td>' + dirtyHelper(media.links) + '</td></tr>';
    add += '<tr><td>popularity</td><td>' + dirtyHelper(media.popularity) + '</td></tr>';
    add += '<tr><td>companies</td><td>' + dirtyHelper(media.companies) + '</td></tr>';

    add += '<tr><td>countries</td><td>' + media.countries.join('<br />') + '</td></tr>';
    add += '<tr><td>quotes</td><td>' + media.quotes.join('<br />') + '</td></tr>';


    add += '<tr><td>writers</td><td>' + dirtyHelper(media.writers) + '</td></tr>';
    add += '<tr><td>directors</td><td>' + dirtyHelper(media.directors) + '</td></tr>';
    add += '<tr><td>actors</td><td>' + dirtyHelper(media.actors) + '</td></tr>';

    add += '<tr><td>locations</td><td>' + (media.locations.join('<br />')) + '</td></tr>';

    add += '</table>';


    nod.innerHTML = add;
    unsafeWindow.$('#roxee-datas td').css('border', '1px solid black');
  });
  media.getMaster().fetch();

}

var failure = function(){
  console.error("The requested lookup id is not in roxee");
};

unsafeWindow.RoxeeConfig = {
  appKey: 'partners.fandor',
  appSig: '7f291e339887a2b957efb5bd6aa784773c807cab',
  onready: function(){
    window.Roxee = unsafeWindow.Roxee;
    var anal = document.location.href.split('/');
    var id = anal.pop();
    var type = anal.pop();
    if(type == 'films'){
      Roxee.core.services.lookup.fandor(overloadFilms, failure, id);
    }else{
      alert("Unhandled! type: " + type);
    }
  }
};


// Insert script
var s = document.createElement('script');
s.setAttribute('type', 'text/javascript');
s.setAttribute('src', 'http://static.sn.ackitup.net/lib/roxeecore/0.1-alpha/partner-api.js');
document.body.appendChild(s);
