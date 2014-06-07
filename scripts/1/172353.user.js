// ==UserScript==
// @name           Memrise Verify Pinyin/English
// @description    Alerts you if you start typing in English when Memrise is asking for pinyin (or vice versa)
// @match          http://www.memrise.com/course/*/garden/*
// @match          http://www.memrise.com/garden/water/*
// @version        0.7
// @updateURL      https://userscripts.org/scripts/source/172353.meta.js
// @downloadURL    https://userscripts.org/scripts/source/172353.user.js
// @grant          none
// ==/UserScript==
// Forked from memrise-forgive-typos by raneksi <https://github.com/raneksi/memrise-forgive-typos>

var onLoad = function($) {

	var get_question = function() {
		return $('.qquestion')[0].childNodes[0].nodeValue.trim();
	};

	var things, thingusers;
	var get_things = function() {
		if (things === undefined) {
			things     = MEMRISE.garden.things;
			thingusers = MEMRISE.garden.thingusers._list;
		}
	};

	var get_thinguser = function(id) {
		return thingusers.filter(function(e) {
			return e.thing_id === id;
		})[0];
	};

	var get_thing_by_q = function(str) {
		get_things();

		for (var id in things) {
			var thing = things[id];
			var thinguser = get_thinguser(thing.id);
			if (thinguser) {
				// Get the 'question' for the current `thing` based on the
				// column_b from `thinguser` for this particular `thing.
				// Compare the `question` with the given question str and if
				// they match, we can pick the current `thing`.
				//
				// Sometimes the 'question' seems to have trailing
				// whitespace, perhaps because they are written by users who
				// may accidentally put spaces in the end
				var question = thing.columns[thinguser.column_b].val;
				if ($.trim(question) === $.trim(str)) {
					return {
						answer   : thing.columns[thinguser.column_a].val,
						question : thing.columns[thinguser.column_b].val,
						askingfor: thinguser.column_a
					};
				}
			}
		}
	};


	  var setup = function() {
      var handlers = [];
      var keydowns = $._data($('body').get(0), 'events').keydown;

      for (var i = keydowns.length - 1; i >= 0; i--){
        handlers.push(keydowns[i]);
      }

      var trigger = function(event) {
        if ($(event.target).is('textarea'))
          return;

        for (var i = handlers.length - 1; i >= 0; i--) {
          handlers[i].handler(event);
        }
      };

    $("input").css("width","auto");
		$('body').off('keyup');
		$('body').on('keyup', function(e) {
      try {
        var copytyping = $('.garden-box').hasClass('copytyping');
        if (!copytyping && $(e.target).is('input') ) {
          var q         = get_question();
          var given     = $('input').val();
          //var askingfor = get_thing_by_q(q).askingfor;  //If two items in a watering list have the same "question" but different prompts (e.g. one for pronunciation, one for definition), this function will return the same information for both (even though they should be different)
          var category  = MEMRISE.garden.session.category.name;
          hint      = ($(".column-label").eq(2).text()=="") ? hint : $(".column-label").eq(2).text();
          
          //console.log("Question: "+q+"; Column: "+hint); //askingfor+" (2 is English, 3 is Pinyin?)");
          
          var looksLikeEnglish = given.match(/^(?:[a-zA-Z,\.\'\-\!\?\&\%\#\(\)]+)(?:\s[a-zA-Z,\.\'\-\!\?\&\%\#\(\)]*)*$/) || (given=="");
          var looksLikePinyin  = given.match(/^(?:(?:[bpmfdtnlgkhjqxrwy]|[zcs]h*)?(?:(?:er|[aeiouv]+)(?:n?(?:g?(?:[1-5])?)?)?)?)(?:\s(?:[bpmfdtnlgkhjqxrwy]|[zcs]h*)?(?:(?:er|[aeiouv]+)(?:n?(?:g?(?:[1-5])?)?)?)?)*$/) || (given=="");
          
          if (given.match(/\s/) && !given.match(/[1-5]\s/)) looksLikePinyin = false;
          
          //if ((askingfor==2 && looksLikeEnglish) ||
          //    (askingfor==3 && looksLikePinyin )) {
            $("input").removeClass("nearly");
            $(".alert").hide();
          //}
          
          if (category=="Chinese" && hint=="Definition" && !looksLikeEnglish) {
            $("input").addClass("nearly");
            $(".alert").html("This doesn't looks like English.  Please type in the <b>Definition</b>.").show();
          }
          if (category=="Chinese" && hint=="Pronunciation" && !looksLikePinyin ) {
            $("input").addClass("nearly");
            $(".alert").html("This doesn't look like Pinyin.  Please type in the <b>Pronunciation</b>.").show();
          }
          
          
        } //if is a real question

        //trigger(e);
      } catch (err) {
        console.log('error - falling back to default behavior', err);
        trigger(e);
      }
    }); //keyup event
    
  }; //setup function

	var ready = function(f) {
		$._data($('body').get(0), 'events') ? f() : setTimeout(ready, 9, f);
	};

	ready(setup);
};

var injectWithJQ = function(f) {
	var script = document.createElement('script');
	script.textContent = '$(' + f.toString() + '($));';
	document.body.appendChild(script);
};

var inject = function(f) {
	var script = document.createElement('script');
	script.textContent = '(' + f.toString() + ')();';
	document.body.appendChild(script);
};

injectWithJQ(onLoad);