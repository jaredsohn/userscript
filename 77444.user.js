// ==UserScript==
// @name           showtagimages
// @namespace      tmb
// @description    show tag images on torrent details page
// @include        http*://*themixingbowl.org/torrent/view/*
// @include        http*://*tmb.dj/torrent/view/*
// ==/UserScript==


var tagsArr = [	'1xtra','6 mix','ambient','annie mac','annie on one',
				'bbc other','big beat','blue room','breakcore','breaks',
				'breezeblock/mah','broken beat','bttb','chill','deep house',
				'drum and bass','dub','dubstep','eclectic','electro',
				'essential mix','essential selection','experimental','funk','grime',
				'hard house','hip hop','house','idm','jjj',
				'jungle','kiss 100','live dj mix','mashup','misc.',
				'old skool','one world','other','other radio','peel',
				'progressive','psytrance','readers mixes','reggae','solid steel',
				'soul','studio/promo','tech house','techno','trance',
				'tribal','trip-hop','vids','worldwide','xfm' 
			   ];
var tags = document.getElementById('tags').getElementsByTagName('a');
for (var i = 0, l = tags.length; i < l; i++) {

	if(tags[i].innerHTML.length > 0 & tags[i].innerHTML.length < 26){ //ignore the delete post links

		ln  = tags[i].innerHTML.toLowerCase();
		
		if(tagsArr.indexOf(ln) > -1){
			switch(ln){
			case 'readers mixes':
				tag = 'readermixes';
				break;
			case 'drum and bass':
				tag = 'dnb';
				break;
			case '6 mix':
				tag = 'sixmix';
				break;
			case 'annie on one':
				tag = 'annie';
				break;
			case 'breezeblock/mah':
				tag = 'breezeblock';
				break;
			case 'essential mix':
				tag = 'em';
				break;
			case 'essential selection':
				tag = 'esssel';
				break;
			case 'progressive':
				tag = 'proghouse';
				break;
			default:
				tag = ln.replace(/([ \./]+)/g,'');
			}

			img = document.createElement('img');
			img.src = '/static/img/tags/'+tag+'.png';
			tags[i].innerHTML = '';
			tags[i].appendChild(img);
		}
	}
}
