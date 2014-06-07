// ==UserScript==
// @name           iForum
// @namespace      http://forum.ge/
// @description    გაფართოება Forum.ge-ს მომხმარებლებისთვის
// @author         Beqa Arabuli
// @include        http://*forum.ge/*
// ==/UserScript==



var _FORMAT_TOOLBAR = {
	_BLOG_AREA: undefined,
	_BLOG_AREA_ID: 'blogarea',
	_WRAPPERS: {
		'_BOLD': {
			'start': '[b]',
			'end': '[/b]',
			'text': 'B'
		},
		'_ITALIC': {
			'start': '[i]',
			'end': '[/i]',
			'text': 'I'
		},
		'_UNDERLINE': {
			'start': '[u]',
			'end': '[/u]',
			'text': 'U'
		},
		'_STRIKE': {
			'start': '[s]',
			'end': '[/s]',
			'text': 'S'
		},
		'_KILLER': {
			'start': '[b]                                        ',
			'end': '[/b]',
			'text': 'KILLER'
		},
		'_EMAIL': {
			'start': '[email]',
			'end': '[/email]',
			'text': '@'
		},
		'_URL': {
			'start': '[url=]',
			'end': '[/url]',
			'text': 'URL'
		},
		'_SIZE': {
			'start': '[size=7]',
			'end': '[/size]',
			'text': 'ზომა'
		},
		'_FONT': {
			'start': '[font=times]',
			'end': '[/font]',
			'text': 'შრიფტი'
		},
		'_COLOR': {
			'start': '[color=red]',
			'end': '[/color]',
			'text': 'ფერი'
		},
		'_IMG': {
			'start': '[img]',
			'end': '[/img]',
			'text': 'სურათი'
		},
		'_QUOTE': {
			'start': '[quote]',
			'end': '[/quote]',
			'text': 'ციტატა'
		},
		'_SPOILER': {
			'start': '[spoiler]',
			'end': '[/spoiler]',
			'text': 'სპოილერი'
		},
		'_YOUTUBE': {
			'start': '[YOUTUBE]',
			'end': '[/YOUTUBE]',
			'text': 'YouTube'
		},
		'_OFFTOPIC': {
			'start': '[OFFTOPIC]',
			'end': '[/OFFTOPIC]',
			'text': 'OFFTOPIC'
		},
		'_FACEPALM': {
			'start': '[img]http://a.pix.ge/o/1tfbc.gif[/img] ',
			'end': '',
			'text': 'Facepalm'
		},
		'_FACEPALM2': {
			'start': '[IMG]http://b.pix.ge/l/lthc6.gif[/IMG] ',
			'end': '',
			'text': 'Facepalm2'
		},
		'_EEH': {
			'start': '[img]http://forum.ge/html/emoticons/keh.gif[/img] ',
			'end': '',
			'text': 'Keh'
		},
		'_PUKE': {
			'start': '[img]http://forum.ge/html/emoticons/puke.gif[/img] ',
			'end': '',
			'text': 'Puke'
		},
		'_MAD': {
			'start': ':mad: ',
			'end': '',
			'text': 'Mad'
		},
		'_GIVI': {
			'start': ':givi: ',
			'end': '',
			'text': 'Givi'
		},
    	'_DRUG': {
			'start': ':drug: ',
			'end': '',
			'text': 'Drug'
		},
		'_USER': {
			'start': ':user: ',
			'end': '',
			'text': 'User'
		},
		'_MO': {
			'start': ':mo: ',
			'end': '',
			'text': 'Mo'
		},
		'_CHUPS': {
			'start': ':chups: ',
			'end': '',
			'text': 'Chups'
		},
		'_KISS': {
			'start': ':2kiss: ',
			'end': '',
			'text': 'Kiss'
		},
		'_JUMP': {
			'start': ':jump: ',
			'end': '',
			'text': 'Jump'
		},
		'_YAWN': {
			'start': ':yawn: ',
			'end': '',
			'text': 'Yawn'
		},
		'_BOLI': {
			'start': ':boli: ',
			'end': '',
			'text': 'Boli'
		},
		'_YES': {
			'start': ':yes: ',
			'end': '',
			'text': 'Yes'
		},
		'_NO': {
			'start': ':no: ',
			'end': '',
			'text': 'NO'
		},
		'_CRY': {
			'start': ':cry: ',
			'end': '',
			'text': 'CRY'
		},
		'_POP': {
			'start': ':pop: ',
			'end': '',
			'text': 'POP'
		},
		'_WEEP': {
			'start': ':weep: ',
			'end': '',
			'text': 'Weep'
		},
		'_EEK': {
			'start': ':eek: ',
			'end': '',
			'text': 'EEK'
		},
		'_ROLLEYES': {
			'start': ':rolleyes: ',
			'end': '',
			'text': 'ROLL'
		},
		'_UP': {
			'start': ':up: ',
			'end': '',
			'text': 'UP'
		},
		'_DOWN': {
			'start': ':down: ',
			'end': '',
			'text': 'Down'
		},
		'_EVILGRIN': {
			'start': '[IMG]http://a.pix.ge/e/5zoar.gif[/IMG] ',
			'end': '',
			'text': 'Evil'
		},
		'_WORRIED': {
			'start': '[IMG]http://a.pix.ge/t/m9w60.gif[/IMG] ',
			'end': '',
			'text': 'Worried'
		},
		'_MEGALOL': {
			'start': '[IMG]http://i.imgur.com/xEJkG.gif[/IMG] ',
			'end': '',
			'text': 'Mega'
		},
		'_MANYLOL': {
			'start': '[IMG]http://i.imgur.com/AHjI9.gif[/IMG] ',
			'end': '',
			'text': 'Many'
		},
	},
	init: function(){
		this._BLOG_AREA = document.getElementsByTagName("textarea")[0];
		if(!this._BLOG_AREA){
			return;
		}
		this._createToolbar();
	},
	_createToolbar: function(){
		var toolbar = document.createElement('div');
		this._BLOG_AREA.parentNode.insertBefore(toolbar, this._BLOG_AREA);
		var base = this;
        toolbar.addEventListener('click', function(ev){
            base.replaceRange(ev);
            ev.preventDefault();
            ev.stopPropagation();
        },false); 		
		for(var id in this._WRAPPERS){
			var wrapper = this._WRAPPERS[id];
			var button = document.createElement('button');
			button.id = id;
			button.innerHTML = wrapper.text;
			toolbar.appendChild(button);
		}
	},
	replaceRange: function(ev){
		var method = ev.target.id;
		var wrapper = this._WRAPPERS[method];
		var val = this._BLOG_AREA.value;

		var len = val.length;

		var start = this._BLOG_AREA.selectionStart;
		var end = this._BLOG_AREA.selectionEnd;

		if (method == '_EMAIL') {
   
            email = prompt('შეიყვანეთ ელ-ფოსტის მისამართი', 'user@domain.com');

            if (email) {
                wrapper.start = '[email]' + email;
                wrapper.end   = '[/email]';
            } else {
                return false;
            }
        }
		
		
		

       if (method == '_SIZE') {
			var selection = val.substring(start, end);
   
            size = prompt('შეიყვანეთ სასურველი ზომა', '7');

            if (size) {
                wrapper.start = '[size=' + size + ']' 
                wrapper.end   = '[/size]';
            } else {
                return false;
            }
        }
		
		if (method == '_COLOR') {
			var selection = val.substring(start, end);
   
            color = prompt('შეიყვანეთ სასურველი ფერი, თქვენ შეგიძლიათ გამოიყენოთ შემდეგი ფერები: aqua, black, blue, fuchsia, gray, grey, green, lime, maroon, navy, olive, purple, red, silver, teal, white, და yellow.', 'red');

            if (color) {
                wrapper.start = '[color=' + color + ']' 
                wrapper.end   = '[/color]';
            } else {
                return false;
            }
        }
		
		if (method == '_FONT') {
			var selection = val.substring(start, end);
   
            font = prompt('შეიყვანეთ შრიფტის დასახელება (მოქმედებს მხოლოდ ინგლისურ სიმბოლოებზე) თქვენ შეგიძლიათ გამოიყენოთ შემდეგი შრიფტები: algerian, braggadocio, chicago, desdemona, fantasy, cursive, marlett, playbill, symbol, webdings, wingdings ა.შ');

            if (font) {
                wrapper.start = '[font=' + font + ']' 
                wrapper.end   = '[/font]';
            } else {
                return false;
            }
        }
		
		else if (method == '_URL') {
            var selection = wrapper.start+val.substring(start, end)+wrapper.end;

            url = prompt('შეიყვანეთ საიტის ბმული', 'www.chromer.wordpress.com');

            if (url) {
                wrapper.start = '[url=' + url + ']';

            } else {
                return false;
            }
        }

		
		
		if (method == '_YOUTUBE') {
   
            youtube = prompt('შეიყვანეთ Youtube-ს ბმულის ის ნაწილი რომელიც http://www.youtube.com/watch?v= ს მერე მდებარეობს ', 'Vqfb6sfH-0U');

            if (youtube) {
                wrapper.start = '[youtube]' + youtube;
                wrapper.end   = '[/youtube]';
            } else {
                return false;
            }
        }

		var replaced = wrapper.start+val.substring(start, end)+wrapper.end;
		
		this._BLOG_AREA.value = val.substring(0, start) + replaced + val.substring(end, len);
		this._BLOG_AREA.selectionStart = start;
		this._BLOG_AREA.selectionEnd = end+wrapper.start.length+wrapper.end.length;
	}
	
	
};


_FORMAT_TOOLBAR.init();




//Show Character Count onMouseOver script by Alan Berman

(function() {
  var inputs, input;
  inputs = document.evaluate(
    '//textarea',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  if(!inputs.snapshotLength) return;
  for(var i = 0; i < inputs.snapshotLength; i++) {
    input = inputs.snapshotItem(i);
    input.addEventListener('mouseover', function(event) {
      this.title = this.value.length;
    }, false);
  }
})();