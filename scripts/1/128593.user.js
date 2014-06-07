// ==UserScript==
// @name           MusicBrainz: Relate recordings to works from a release
// @version        2012-10-16
// @author         Michael Wiencek
// @namespace      http://userscripts.org/users/266906
// @include        *://musicbrainz.org/release/*
// @include        *://*.musicbrainz.org/release/*
// @match          *://musicbrainz.org/release/*
// @match          *://*.musicbrainz.org/release/*
// ==/UserScript==

var scr = document.createElement("script");
scr.textContent = "(" + relate_recordings_to_works + ")();";
document.body.appendChild(scr);

function relate_recordings_to_works() {
    var location = window.location.pathname;
    if (!location.match(/\/release\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/))
        return;

    if ($("li.account").length == 0)
        return;

    var MBID_REGEX = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/,
        PENDING_EDITS = [];

    function RequestManager(default_rate) {
        this.queue = [];
        this.last = 0;
        this.active = false;

        this.next = function() {
            if (this.queue.length == 0) {
                this.active = false;
                return;
            }
            var foo = this.queue.shift(),
                request = foo[0],
                timeout = foo[1];
            request();
            this.last = new Date().getTime();
            if (this.queue.length > 0) {
                setTimeout(function(foo) {foo.next();}, timeout, this);
            } else {
                this.active = false;
            }
        }

        this.push = function(req, timeout) {
            this.queue.push([req, timeout || default_rate]);
            if (!this.active)
                this.start_queue();
        }

        this.unshift = function(req, timeout) {
            this.queue.unshift([req, timeout || default_rate]);
            if (!this.active)
                this.start_queue();
        }

        this.start_queue = function() {
            if (this.active) return;
            this.active = true;
            var now = new Date().getTime();
            if (now - this.last >= default_rate) {
                this.next();
            } else {
                setTimeout(function(foo) {foo.next();},
                    default_rate - now + this.last, this);
            }
        }
    }

    var requests = new RequestManager(1000);

    var $autocomplete = $('<span class="work autocomplete"></span>').append(
        '<img class="search" src="/static/images/icons/search.png"/>',
        '<input type="text" class="name"/>',
        '<input type="hidden" class="id"/>',
        '<input type="hidden" class="gid"/>');

    var $new_work = $('<div>\
<label><span>Name:</span> <input type="text" class="name"/></label>\
<label><span>Disambiguation:</span> <input type="text" class="disambig"/></label>\
<label><span>ISWC:</span> <input type="text" class="iswc"/></label>\
<label><span>Type:</span>\
<select class="type">\
<option selected="selected"></option>\
<option value="1">Aria</option>\
<option value="2">Ballet</option>\
<option value="3">Cantata</option>\
<option value="4">Concerto</option>\
<option value="5">Sonata</option>\
<option value="6">Suite</option>\
<option value="7">Madrigal</option>\
<option value="8">Mass</option>\
<option value="9">Motet</option>\
<option value="10">Opera</option>\
<option value="11">Oratorio</option>\
<option value="12">Overture</option>\
<option value="13">Partita</option>\
<option value="14">Quartet</option>\
<option value="15">Song-cycle</option>\
<option value="16">Symphony</option>\
<option value="17">Song</option>\
<option value="18">Symphonic poem</option>\
<option value="19">Zarzuela</option>\
<option value="20">Étude</option>\
<option value="21">Poem</option>\
</select>\
</label>\
<label><span>Lyrics Language:</span>\
<select class="language">\
<option selected="selected"></option>\
<optgroup label="Frequently used">\
<option value="18">Arabic</option>\
<option value="76">Chinese</option>\
<option value="98">Czech</option>\
<option value="100">Danish</option>\
<option value="113">Dutch</option>\
<option value="120">English</option>\
<option value="131">Finnish</option>\
<option value="134">French</option>\
<option value="145">German</option>\
<option value="159">Greek</option>\
<option value="195">Italian</option>\
<option value="198">Japanese</option>\
<option value="309">Norwegian</option>\
<option value="338">Polish</option>\
<option value="340">Portuguese</option>\
<option value="353">Russian</option>\
<option value="393">Spanish</option>\
<option value="403">Swedish</option>\
<option value="433">Turkish</option>\
<option value="284">[Multiple languages]</option>\
</optgroup>\
<optgroup label="Other">\
<option value="2">Abkhazian</option>\
<option value="3">Achinese</option>\
<option value="4">Acoli</option>\
<option value="5">Adangme</option>\
<option value="6">Adyghe</option>\
<option value="1">Afar</option>\
<option value="8">Afrihili</option>\
<option value="9">Afrikaans</option>\
<option value="473">Ainu</option>\
<option value="10">Akan</option>\
<option value="12">Albanian</option>\
<option value="13">Aleut</option>\
<option value="15">Amharic</option>\
<option value="475">Angika</option>\
<option value="20">Aragonese</option>\
<option value="23">Arapaho</option>\
<option value="25">Arawak</option>\
<option value="21">Armenian</option>\
<option value="479">Aromanian</option>\
<option value="26">Assamese</option>\
<option value="27">Asturian</option>\
<option value="30">Avaric</option>\
<option value="31">Avestan</option>\
<option value="32">Awadhi</option>\
<option value="33">Aymara</option>\
<option value="34">Azerbaijani</option>\
<option value="40">Balinese</option>\
<option value="38">Baluchi</option>\
<option value="39">Bambara</option>\
<option value="42">Basa</option>\
<option value="37">Bashkir</option>\
<option value="41">Basque</option>\
<option value="44">Beja</option>\
<option value="45">Belarusian</option>\
<option value="46">Bemba</option>\
<option value="47">Bengali</option>\
<option value="49">Bhojpuri</option>\
<option value="51">Bikol</option>\
<option value="52">Bini</option>\
<option value="53">Bislama</option>\
<option value="64">Blin</option>\
<option value="56">Bosnian</option>\
<option value="57">Braj</option>\
<option value="58">Breton</option>\
<option value="61">Buginese</option>\
<option value="62">Bulgarian</option>\
<option value="60">Buriat</option>\
<option value="63">Burmese</option>\
<option value="65">Caddo</option>\
<option value="68">Catalan</option>\
<option value="70">Cebuano</option>\
<option value="75">Chagatai</option>\
<option value="72">Chamorro</option>\
<option value="74">Chechen</option>\
<option value="82">Cherokee</option>\
<option value="85">Cheyenne</option>\
<option value="73">Chibcha</option>\
<option value="313">Chichewa</option>\
<option value="79">Chinook jargon</option>\
<option value="81">Chipewyan</option>\
<option value="80">Choctaw</option>\
<option value="83">Church Slavic</option>\
<option value="77">Chuukese</option>\
<option value="84">Chuvash</option>\
<option value="87">Coptic</option>\
<option value="88">Cornish</option>\
<option value="89">Corsican</option>\
<option value="93">Cree</option>\
<option value="286">Creek</option>\
<option value="94">Crimean Tatar</option>\
<option value="366">Croatian</option>\
<option value="99">Dakota</option>\
<option value="101">Dargwa</option>\
<option value="103">Delaware</option>\
<option value="106">Dinka</option>\
<option value="107">Divehi</option>\
<option value="108">Dogri</option>\
<option value="105">Dogrib</option>\
<option value="111">Duala</option>\
<option value="114">Dyula</option>\
<option value="115">Dzongkha</option>\
<option value="116">Efik</option>\
<option value="118">Ekajuk</option>\
<option value="119">Elamite</option>\
<option value="290">Erzya</option>\
<option value="122">Esperanto</option>\
<option value="123">Estonian</option>\
<option value="124">Ewe</option>\
<option value="125">Ewondo</option>\
<option value="126">Fang</option>\
<option value="128">Fanti</option>\
<option value="127">Faroese</option>\
<option value="129">Fijian</option>\
<option value="130">Filipino</option>\
<option value="133">Fon</option>\
<option value="485">Frisian, Eastern</option>\
<option value="484">Frisian, Northern</option>\
<option value="137">Frisian, Western</option>\
<option value="139">Friulian</option>\
<option value="138">Fulah</option>\
<option value="140">Ga</option>\
<option value="67">Galibi Carib</option>\
<option value="150">Galician</option>\
<option value="249">Ganda</option>\
<option value="141">Gayo</option>\
<option value="142">Gbaya</option>\
<option value="146">Geez</option>\
<option value="144">Georgian</option>\
<option value="299">German, Low</option>\
<option value="476">German, Swiss</option>\
<option value="147">Gilbertese</option>\
<option value="154">Gondi</option>\
<option value="155">Gorontalo</option>\
<option value="156">Gothic</option>\
<option value="157">Grebo</option>\
<option value="158">Greek, Ancient</option>\
<option value="204">Greenlandic</option>\
<option value="160">Guarani</option>\
<option value="161">Gujarati</option>\
<option value="162">Gwich\'in</option>\
<option value="163">Haida</option>\
<option value="164">Haitian Creole</option>\
<option value="165">Hausa</option>\
<option value="166">Hawaiian</option>\
<option value="167">Hebrew</option>\
<option value="168">Herero</option>\
<option value="169">Hiligaynon</option>\
<option value="171">Hindi</option>\
<option value="174">Hiri Motu</option>\
<option value="173">Hmong</option>\
<option value="176">Hungarian</option>\
<option value="177">Hupa</option>\
<option value="178">Iban</option>\
<option value="180">Icelandic</option>\
<option value="181">Ido</option>\
<option value="179">Igbo</option>\
<option value="186">Iloko</option>\
<option value="189">Indonesian</option>\
<option value="191">Ingush</option>\
<option value="187">Interlingua</option>\
<option value="185">Interlingue</option>\
<option value="184">Inuktitut</option>\
<option value="192">Inupiaq</option>\
<option value="149">Irish</option>\
<option value="196">Javanese</option>\
<option value="200">Judeo-Arabic</option>\
<option value="199">Judeo-Persian</option>\
<option value="212">Kabardian</option>\
<option value="202">Kabyle</option>\
<option value="203">Kachin</option>\
<option value="459">Kalmyk</option>\
<option value="205">Kamba</option>\
<option value="206">Kannada</option>\
<option value="209">Kanuri</option>\
<option value="201">Kara-Kalpak</option>\
<option value="227">Karachay-Balkar</option>\
<option value="477">Karelian</option>\
<option value="208">Kashmiri</option>\
<option value="96">Kashubian</option>\
<option value="211">Kazakh</option>\
<option value="213">Khasi</option>\
<option value="215">Khmer, Central</option>\
<option value="217">Kikuyu</option>\
<option value="220">Kimbundu</option>\
<option value="218">Kinyarwanda</option>\
<option value="219">Kirghiz</option>\
<option value="421">Klingon</option>\
<option value="222">Komi</option>\
<option value="223">Kongo</option>\
<option value="221">Konkani</option>\
<option value="224">Korean</option>\
<option value="225">Kosraean</option>\
<option value="226">Kpelle</option>\
<option value="230">Kuanyama</option>\
<option value="231">Kumyk</option>\
<option value="232">Kurdish</option>\
<option value="229">Kurukh</option>\
<option value="233">Kutenai</option>\
<option value="3529">Kölsch</option>\
<option value="234">Ladino</option>\
<option value="235">Lahnda</option>\
<option value="236">Lamba</option>\
<option value="237">Lao</option>\
<option value="238">Latin</option>\
<option value="239">Latvian</option>\
<option value="240">Lezghian</option>\
<option value="241">Limburgish</option>\
<option value="242">Lingala</option>\
<option value="243">Lithuanian</option>\
<option value="3858">Liv</option>\
<option value="197">Lojban</option>\
<option value="245">Lozi</option>\
<option value="248">Luba-Katanga</option>\
<option value="247">Luba-Lulua</option>\
<option value="250">Luiseno</option>\
<option value="251">Lunda</option>\
<option value="252">Luo</option>\
<option value="253">Lushai</option>\
<option value="246">Luxembourgish</option>\
<option value="254">Macedonian</option>\
<option value="255">Madurese</option>\
<option value="256">Magahi</option>\
<option value="258">Maithili</option>\
<option value="259">Makasar</option>\
<option value="275">Malagasy</option>\
<option value="266">Malay</option>\
<option value="260">Malayalam</option>\
<option value="276">Maltese</option>\
<option value="277">Manchu</option>\
<option value="268">Mandar</option>\
<option value="1739">Mandarin Chinese</option>\
<option value="261">Mandingo</option>\
<option value="278">Manipuri</option>\
<option value="151">Manx</option>\
<option value="262">Maori</option>\
<option value="22">Mapudungun</option>\
<option value="264">Marathi</option>\
<option value="78">Mari</option>\
<option value="257">Marshallese</option>\
<option value="288">Marwari</option>\
<option value="265">Masai</option>\
<option value="269">Mende</option>\
<option value="271">Mi\'kmaq</option>\
<option value="4663">Min Nan Chinese</option>\
<option value="272">Minangkabau</option>\
<option value="287">Mirandese</option>\
<option value="280">Mohawk</option>\
<option value="267">Moksha</option>\
<option value="244">Mongo</option>\
<option value="282">Mongolian</option>\
<option value="4369">Montagnais</option>\
<option value="283">Mossi</option>\
<option value="478">N\'Ko</option>\
<option value="294">Nauru</option>\
<option value="295">Navajo</option>\
<option value="297">Ndebele, North</option>\
<option value="296">Ndebele, South</option>\
<option value="298">Ndonga</option>\
<option value="293">Neapolitan</option>\
<option value="301">Nepal Bhasa</option>\
<option value="300">Nepali</option>\
<option value="302">Nias</option>\
<option value="304">Niuean</option>\
<option value="486">No linguistic content</option>\
<option value="307">Nogai</option>\
<option value="308">Norse, Old</option>\
<option value="306">Norwegian Bokmål</option>\
<option value="305">Norwegian Nynorsk</option>\
<option value="314">Nyamwezi</option>\
<option value="315">Nyankole</option>\
<option value="316">Nyoro</option>\
<option value="317">Nzima</option>\
<option value="318">Occitan</option>\
<option value="319">Ojibwa</option>\
<option value="320">Oriya</option>\
<option value="321">Oromo</option>\
<option value="322">Osage</option>\
<option value="323">Ossetian</option>\
<option value="332">Palauan</option>\
<option value="337">Pali</option>\
<option value="329">Pampanga</option>\
<option value="327">Pangasinan</option>\
<option value="330">Panjabi</option>\
<option value="331">Papiamento</option>\
<option value="334">Persian</option>\
<option value="339">Pohnpeian</option>\
<option value="343">Pushto</option>\
<option value="5603">Puyuma</option>\
<option value="344">Quechua</option>\
<option value="345">Rajasthani</option>\
<option value="346">Rapanui</option>\
<option value="347">Rarotongan</option>\
<option value="351">Romanian</option>\
<option value="349">Romansh</option>\
<option value="350">Romany</option>\
<option value="352">Rundi</option>\
<option value="5690">Réunion Creole French</option>\
<option value="359">Samaritan Aramaic</option>\
<option value="383">Sami, Inari</option>\
<option value="382">Sami, Lule</option>\
<option value="380">Sami, Northern</option>\
<option value="385">Sami, Skolt</option>\
<option value="379">Sami, Southern</option>\
<option value="384">Samoan</option>\
<option value="354">Sandawe</option>\
<option value="355">Sango</option>\
<option value="360">Sanskrit</option>\
<option value="362">Santali</option>\
<option value="394">Sardinian</option>\
<option value="361">Sasak</option>\
<option value="365">Scots</option>\
<option value="148">Scottish Gaelic</option>\
<option value="367">Selkup</option>\
<option value="363">Serbian</option>\
<option value="395">Serer</option>\
<option value="371">Shan</option>\
<option value="386">Shona</option>\
<option value="182">Sichuan Yi</option>\
<option value="364">Sicilian</option>\
<option value="372">Sidamo</option>\
<option value="54">Siksika</option>\
<option value="387">Sindhi</option>\
<option value="373">Sinhala</option>\
<option value="104">Slave (Athapascan)</option>\
<option value="377">Slovak</option>\
<option value="378">Slovenian</option>\
<option value="390">Somali</option>\
<option value="388">Soninke</option>\
<option value="110">Sorbian, Lower</option>\
<option value="175">Sorbian, Upper</option>\
<option value="310">Sotho, Northern</option>\
<option value="392">Sotho, Southern</option>\
<option value="474">Southern Altai</option>\
<option value="480">Sranan Tongo</option>\
<option value="398">Sukuma</option>\
<option value="399">Sundanese</option>\
<option value="400">Susu</option>\
<option value="402">Swahili</option>\
<option value="397">Swati</option>\
<option value="404">Syriac</option>\
<option value="414">Tagalog</option>\
<option value="405">Tahitian</option>\
<option value="413">Tajik</option>\
<option value="423">Tamashek</option>\
<option value="407">Tamil</option>\
<option value="408">Tatar</option>\
<option value="409">Telugu</option>\
<option value="411">Tereno</option>\
<option value="412">Tetum</option>\
<option value="415">Thai</option>\
<option value="416">Tibetan</option>\
<option value="417">Tigre</option>\
<option value="418">Tigrinya</option>\
<option value="410">Timne</option>\
<option value="419">Tiv</option>\
<option value="422">Tlingit</option>\
<option value="426">Tok Pisin</option>\
<option value="420">Tokelau</option>\
<option value="424">Tonga (Nyasa)</option>\
<option value="425">Tonga (Tonga Islands)</option>\
<option value="427">Tsimshian</option>\
<option value="429">Tsonga</option>\
<option value="428">Tswana</option>\
<option value="431">Tumbuka</option>\
<option value="324">Turkish, Ottoman</option>\
<option value="430">Turkmen</option>\
<option value="435">Tuvalu</option>\
<option value="437">Tuvinian</option>\
<option value="436">Twi</option>\
<option value="438">Udmurt</option>\
<option value="440">Uighur</option>\
<option value="441">Ukrainian</option>\
<option value="442">Umbundu</option>\
<option value="444">Urdu</option>\
<option value="445">Uzbek</option>\
<option value="446">Vai</option>\
<option value="447">Venda</option>\
<option value="448">Vietnamese</option>\
<option value="449">Volapük</option>\
<option value="450">Votic</option>\
<option value="6966">Võro</option>\
<option value="457">Walloon</option>\
<option value="453">Waray</option>\
<option value="454">Washo</option>\
<option value="455">Welsh</option>\
<option value="452">Wolaitta</option>\
<option value="458">Wolof</option>\
<option value="460">Xhosa</option>\
<option value="5808">Yaeyama</option>\
<option value="356">Yakut</option>\
<option value="461">Yao</option>\
<option value="462">Yapese</option>\
<option value="463">Yiddish</option>\
<option value="464">Yoruba</option>\
<option value="7640">Yue Chinese</option>\
<option value="466">Zapotec</option>\
<option value="483">Zaza</option>\
<option value="467">Zenaga</option>\
<option value="468">Zhuang</option>\
<option value="470">Zulu</option>\
<option value="471">Zuni</option>\
<option value="24">[Artificial (Other)]</option>\
</optgroup>\
</select>\
</label>\
<br/>\
<div>\
<label><strong>Edit note:</strong><br/>\
<textarea style="width: 100%;" class="note"></textarea></label>\
</div>\
<button>Create work</button>\
</div>').css("color", "#000");

    $new_work.children("label").css({"display": "block", "padding-bottom": "2px"})
        .children("span").css({"display": "inline-block", "width": "9em"});
    $new_work.find("input, textarea, select").css({"font-size": "12px", "padding": "1px"});
    $new_work.children("button").css({
        "color": "#565656",
        "background-color": "#F0F0F0",
        "border": "1px solid #D0D0D0",
        "padding": "2px",
        "margin-top": "0.5em"});

    var last_work_type = "", last_work_lang = "", last_work_edit_note = "", track_numbers = [];

    function parse_date(str) {
        var date = str.match(/^([0-9]{4})(?:-([0-9]{2})(?:-([0-9]{2}))?)?$/);
        if (date == null) return null;
        var data = {}, year = date[1], month = date[2], day = date[3];
        data["year"] = parseInt(year, 10);
        if (month) {
            month = parseInt(month, 10);
            if (month < 1 || month > 12) {
                return null;
            }
            data["month"] = month;
        }
        if (day) {
            day = parseInt(day, 10);
            if (day < 1 || day > 31) {
                return null;
            }
            data["day"] = day;
        }
        return data;
    }

    function date_input() {
        return $('<input type="text" class="date"/>')
            .css({"background": "inherit", "border": "1px solid #aaa", "width": "6.8em", "color": "#999"})
            .val("yyyy-mm-dd")
            .bind("focus", function() {
                if (this.value == "yyyy-mm-dd") {
                    $(this).val("").css("color", "#000");
                }
            })
            .bind("blur", function() {
                if (this.value == "") {
                    $(this).val("yyyy-mm-dd").css("color", "#999");
                    $(this).data("date", null);
                }
            })
            .bind("input", function() {
                var data = parse_date(this.value);
                $(this).css({"color": "#000", "border-color": (this.value && data == null) ? "#f00" : "#aaa"})
                       .data("date", data);
            });
    }

    function relationship_inputs(type, attrs, mbid, begin_date, end_date, pending, rec_mbid, rec_title) {
        var $ac = $autocomplete.clone(), $name = $ac.children("input.name").bind("blur lookup-performed", generate_changes),
            autocomplete = MB.Control.EntityAutocomplete({inputs: $ac});
        if (mbid) {
            $.get("/ws/js/entity/" + mbid, function(data) {
                $ac.children("input.id").val(data.id);
                $ac.children("input.gid").val(data.gid);
                $name.val(data.name).removeClass("error").addClass("lookup-performed");
            });
        } else {
            $name.val(rec_title);
        }
        var $attrs = $('<span class="attrs">' +
            '<label><input type="checkbox" name="partial"' + (attrs["partial"] ? " checked" : "") + '/> partial</label> ' +
            '<label><input type="checkbox" name="live"' + (attrs["live"] ? " checked" : "") + '/> live</label> ' +
            '<label><input type="checkbox" name="instrumental"' + (attrs["instrumental"] ? " checked" : "") + '/> instrumental</label> ' +
            '<label><input type="checkbox" name="cover"' + (attrs["cover"] ? " checked" : "") + '/> cover</label>' +
            '</span>');
        $attrs.find("input").change(generate_changes);
        var $link = $('<div class="rrw-link"></div>').append(
            "is a ", $attrs, " ",
            $('<select class="type"></select>').append(
                '<option value="278"' + (type == "recording of:" ? " selected" : "") + '>recording</option>' +
                '<option value="244"' + (type == "medley of:" ? ($attrs.hide() && " selected") : "") + '>medley</option>')
                .change(function() {
                    ((this.value == "278") && $attrs.show()) || $attrs.hide();
                    $(this).parent().data("type", this.value);
                    generate_changes();
                }),
            " of ", $ac, " from ",
            date_input().addClass("begin-date").val(begin_date).trigger("input").blur().bind("input", function() {
                var $end = $(this).next("input.end-date"), thisdate = $(this).data("date"), thatdate = $end.data("date");
                if (thatdate == null || (thisdate &&
                    (thisdate["year"] == thatdate["year"] && (!thatdate["month"] ||
                    thisdate["month"] == thatdate["month"] && !thatdate["day"])))) {
                    $end.val($(this).val()).trigger("input").blur();
                }
                generate_changes();
            }), " &ndash; ",
            date_input().addClass("end-date").val(end_date).trigger("input").blur().bind("input", generate_changes), " ",
            $('<span>new work</span>')
                .css({"cursor": "pointer", "color": "#002bba"})
                .data("popup", null)
                .click(function(event) {
                    event.stopPropagation();
                    var $btn = $(this), $popup = $btn.data("popup");
                    if ($popup == null) {
                        var hovering = false, $nw = $new_work.clone(true);
                        $nw.children("button").click(function() {
                            var title = $nw.find("input.name").val();
                            if (!title) return;
                            var data = {
                                "edit-work.name": title,
                                "edit-work.comment": $nw.find("input.disambig").val(),
                                "edit-work.iswc": $nw.find("input.iswc").val(),
                                "edit-work.type_id": $nw.find("select.type").val(),
                                "edit-work.language_id": $nw.find("select.language").val(),
                                "edit-work.edit_note": $nw.find("textarea.note").val()
                            };
                            function error() {
                                if (!$popup.children("p.error")[0])
                                    $popup.append($('<p class="error"></p>')
                                        .css("color", "red")
                                        .text("There was an error creating the work."));
                            }
                            $nw.append('<img src="/static/images/icons/loading.gif"/>');
                            requests.push(function() {
                                $.post("/work/create", data, function(data) {
                                    var work = data.match(/\/work\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/);
                                    if (work == null) {
                                        error();
                                        return;
                                    }
                                    requests.push(function() {
                                        $.getJSON("/ws/js/entity/" + work[1], function(data) {
                                            autocomplete.select(event, {item: data});
                                            autocomplete.autocomplete.term = data.name;
                                            autocomplete.autocomplete.selectedItem = null;
                                        });
                                    });
                                    $popup.remove();
                                    $btn.remove();
                                })
                                .error(error)
                                .complete(function() {
                                    $nw.children("img").remove();
                                });
                            }, 2000);
                        });
                        $nw.find("input.name").val($btn.parent().children("span.work.autocomplete").children("input.name").val());
                        $nw.find("select").eq(0).change(function() {
                            last_work_type = this.value;
                        }).val(last_work_type);
                        $nw.find("select").eq(1).change(function() {
                            last_work_lang = this.value;
                        }).val(last_work_lang);
                        $nw.find("textarea").bind("input", function() {
                            last_work_edit_note = this.value;
                        }).val(last_work_edit_note);
                        $popup = $('<div class="rrw-popup"></div>')
                            .css({"border": "1px #999 solid",
                                  "background": "#f0f0f0",
                                  "padding": "1em",
                                  "color": "#F0F0F0",
                                  "position": "absolute",
                                  "left": event.pageX + 5,
                                  "top": event.pageY + 5,
                                  "z-index": "20"})
                            .hover(function() {hovering = true;}, function() {hovering = false;})
                            .append($nw)
                            .hide();
                        $btn.data("popup", $popup);
                        $("body")
                            .append($popup)
                            .click(function() {
                                (!hovering) && $popup.hide("fast");
                            });
                        $popup.show("fast");
                    } else {
                        $popup.toggle("fast");
                    }
                }),
            $('<img src="/static/images/icons/delete_row.png"/>')
                .css({"cursor": "pointer", "vertical-align": "middle", "display": pending ? "inline" : "none", "padding-left": "4px"})
                .click(function() {
                    var $container = $(this).parents("div.rrw-container");
                    var $link = $(this).parent();
                    $link.slideUp("fast", function() {$link.remove(); generate_changes();});
                }))
            .css("padding-bottom", "2px")
            .data({"pending": pending, "type": type == "recording of:" ? "278" : "244", "recording": rec_mbid, "recording-title": rec_title});
        $link.find("input[type=text], select, label").css({"padding": "1px", "font-size": "12px", "height": "auto"});
        return $link;
    }

    function disable_all_inputs() {
        var $links = $("div.rrw-link");
        $links.find("input").attr("disabled", "disabled");
        $links.children("select").attr("disabled", "disabled");
        $("div.rrw-container").children("span.rrw-add-link").remove();
        $links.find("img").remove();
        $("span.rrw-works-btn").remove();
        $links.children("span:contains(new work)").remove();
    }

    function bubble() {
        return $('<div></div>')
            .css({"margin": "0",
                  "padding": "12px",
                  "border": "1px solid #999",
                  "background": "#F0F0F0",
                  "-moz-border-radius": "12px",
                  "-webkit-border-radius": "12px",
                  "border-radius": "12px"});
    }

    var $changes = $("<div>You've made no changes.</div>"),
        $edit_note = $("<textarea></textarea>").css({"width": "40em", "height": "5em"}),
        $submit = $("<button>Submit edits</button>").click(function() {
            var edit_count = PENDING_EDITS.length, FAILED_EDITS = [];
            if (edit_count == 0) return;
            $(this).attr("disabled", "disabled");
            $edit_note.attr("disabled", "disabled");
            disable_all_inputs();
            $submit.after('<img src="/static/images/icons/loading.gif"/>');
            for (var i = 0; i < edit_count; i++) {(function(i) {
                var edit = PENDING_EDITS[i], data = edit["data"];
                data["ar.edit_note"] = $edit_note.val();
                requests.push(function() {
                    var $item = edit["item"].append('<img src="/static/images/icons/loading.gif"/>');
                    $.post(edit["url"], data, function() {
                        $item.hide("fast", function() {$item.remove();});
                    }).error(function() {
                        $item.css("color", "red").children("img").remove();
                        FAILED_EDITS.push(edit);
                    }).complete(function() {
                        if (i == edit_count - 1) {
                            if (FAILED_EDITS.length == 0) {
                                window.location.reload();
                            } else {
                                PENDING_EDITS = FAILED_EDITS;
                                $submit.next("img").remove();
                                if ($bottom.children("p.rrw-error").length == 0) {
                                    $bottom.children("h4").eq(0).after('<p class="rrw-error">There were errors trying to submit the following edits:</p>');
                                }
                                $submit.removeAttr("disabled").text("Retry");
                                $edit_note.removeAttr("disabled");
                            }
                        }
                    });
                }, 2000);
            })(i);}
        }).css({"color": "#565656",
                "background-color": "#F0F0F0",
                "border": "1px solid #D0D0D0",
                "padding": "2px"}),
        $submission = $("<div></div>").append("<h5>Edit note</h5>", $edit_note, "<p>Note: The page will reload after all edits are submitted.</p>", $submit).hide(),
        $bottom = bubble().css("margin-top", "1em").append("<h4>Work edits</h4>", $changes, $submission).hide();
    $bottom.insertAfter("table.tbl");

    function check_link_for_changes($link) {
        var type = $link.data("type"), original_data = $link.data("original-data");
        if (type != original_data["type"]) return true;
        if ($link.data("work_mbid") != original_data["mbid"]) return true;
        var begin_dateval = $link.children("input.begin-date").val(),
            end_dateval = $link.children("input.end-date").val(),
            begin_date = (parse_date(begin_dateval) == null ? null : begin_dateval),
            end_date = (parse_date(end_dateval) == null ? null : end_dateval);
        if (begin_date != original_data["begin-date"]) return true;
        if (end_date != original_data["end-date"]) return true;
        if (type == "278") {
            var $attrs = $link.children("span.attrs").find("input"),
                attrs = original_data["attrs"];
            if ($attrs[0].checked != attrs["partial"]) return true;
            if ($attrs[1].checked != attrs["live"]) return true;
            if ($attrs[2].checked != attrs["instrumental"]) return true;
            if ($attrs[3].checked != attrs["cover"]) return true;
        }
        return false;
    }

    function generate_changes() {
        $changes.html("");
        PENDING_EDITS = [];
        $.each($("div.rrw-container"), function(i, container) {
            var $container = $(container),
                $links = $container.children("div.rrw-link");
            for (var j = 0; j < $links.length; j++) {
                var $link = $links.eq(j), $autocomplete = $link.children("span.work.autocomplete"),
                    work_mbid = $autocomplete.children("input.gid").val(),
                    work_id = $autocomplete.children("input.id").val(),
                    $work_name = $autocomplete.children("input[type=text]");
                $link.data({
                    "work_mbid": work_mbid,
                    "work_id": work_id,
                    "work_name": $work_name.val()
                });
                if (!$work_name.hasClass("lookup-performed")) {
                    continue;
                }
                if ($link.data("pending")) {
                    var $item = $("<p></p>").append("Adding \"", generate_phrase($link), "\" to track " + track_numbers[i] + " (" + $link.data("recording-title") + ").").appendTo($changes);
                    PENDING_EDITS.push({
                        "url": "/edit/relationship/create?type0=recording&type1=work&entity0=" + $link.data("recording") + "&entity1=" + $link.data("work_mbid"),
                        "data": get_add_data($link),
                        "item": $item,
                        "link": $link
                    });
                } else if (check_link_for_changes($link)) {
                    var od = $link.data("original-data"), attrs = "", type = "medley";
                    if (od["type"] == "278") {
                        type = "recording";
                        var orig_attrs = od["attrs"];
                        if (orig_attrs["partial"]) attrs += "partial ";
                        if (orig_attrs["live"]) attrs += "live ";
                        if (orig_attrs["instrumental"]) attrs += "instrumental ";
                        if (orig_attrs["cover"]) attrs += "cover ";
                    }
                    var $original_phrase = _phrase(attrs, type, od["mbid"], od["name"], od["begin-date"] ? od["begin-date"] : "", od["end-date"] ? od["end-date"] : ""),
                        $item = $("<p></p>").append("Changing \"", $original_phrase, "\" to \"", generate_phrase($link), "\" on track " + track_numbers[i] + " (" + $link.data("recording-title") + ").").appendTo($changes);
                    PENDING_EDITS.push({
                        "url": $link.data("post-url"),
                        "data": get_edit_data($link),
                        "item": $item,
                        "link": $link
                    });
                }
            }
        });
        if ($changes.html() == "") {
            $changes.html("You've made no changes.")
            $submission.hide();
        } else {
             $submission.show();
        }
    }

    function generate_phrase($link) {
        var attrs = "", type = "medley",
            $begin_date = $link.children("input.begin-date"),
            $end_date = $link.children("input.end-date");
        if ($link.data("type") == "278") {
            type = "recording";
            var $attrs = $link.children("span.attrs").find("input");
            if ($attrs[0].checked) attrs += "partial ";
            if ($attrs[1].checked) attrs += "live ";
            if ($attrs[2].checked) attrs += "instrumental ";
            if ($attrs[3].checked) attrs += "cover ";
        }
        return _phrase(attrs, type, $link.data("work_mbid"), $link.data("work_name"),
            $begin_date.data("date") ? $begin_date.val() : "",
            $end_date.data("date") ? $end_date.val() : "");
    }

    function _phrase(attrs, type, mbid, name, begin_date, end_date) {
        var date = "";
        if (begin_date && end_date && begin_date == end_date) {
            date = " on " + begin_date;
        } else {
            begin_date = begin_date || "????";
            end_date = end_date || "????";
            if (begin_date != "????" || end_date != "????")
                date = " from " + begin_date + " &ndash; " + end_date;
        }
        return $("<span></span>")
            .append(attrs + type + " of ", $("<a></a>").attr("href", "/work/" + mbid).text(name), date);
    }

    var date_regex = /\((\d{4}(?:-\d{2}){0,2})?( ?– ?)?(\d{4}(?:-\d{2}){0,2}|\?{4})?\)/,
        perf_regex = /^(partial )?(live )?(instrumental )?(cover )?recording of:$/,
        ENTITIES = {};

    function adjust_cols() {
        var total_cols = $("table.tbl tbody tr[typeof=mo\\:Track]").eq(0).children("td").length;
        $("table.tbl tbody tr.subh td:nth-child(2)").attr("colspan", (total_cols - 1).toString());
        $(".rrw-td").attr("colspan", total_cols.toString());
    }

    var $works_col = $("<th>Works</th>")
        .append(" (", $("<span>edit all</span>").css({"color": "#002bba", "cursor": "pointer"})
            .click(function() {
                $("span.rrw-works-btn:contains(\u25c0 edit)").click();
            }), ")")
        .css("width", "3em").appendTo("table.tbl thead tr").hide();

    adjust_cols();

    var disc = 0, track = 0,
        total_discs = $("table.tbl tr.subh").length,
        total_tracks = 0;

    $.each($("table.tbl tr"), function(i, row) {
        if ($(row).hasClass("subh")) {
            disc += 1;
            track = 0;
            return;
        }
        if ($(row).attr("typeof") != "mo:Track") return;
        total_tracks += 1;
        track += 1;
        track_numbers.push((total_discs > 1 ? disc.toString() + "." : "") + track.toString());

        var $td = $(row).children("td").eq(1),
            node = $td.find("a[rel=mo\\:publication_of]")[0];
        var rec_mbid = node.href.match(MBID_REGEX)[0],
            rec_title = node.textContent,
            $container = bubble()
            .addClass("rrw-container")
            .data("loaded", false)
            .hide();

        var $row = $($("table.tbl")[0].insertRow(i + total_tracks))
            .addClass("rrw-row")
            .addClass(row.className)
            .append($('<td colspan="6"></td>')
                .addClass("rrw-td")
                .append($container))
            .hide();

        $works_col = $works_col.add($('<span class="rrw-works-btn">\u25c0 edit</span>')
            .css({"color": "#888", "cursor": "pointer"})
            .click(function() {
                if ($row.is(":visible")) {
                    $(this).text("\u25c0 edit");
                    $container.slideUp("fast", function() {
                        $row.hide();
                    });
                    return;
                }
                $(this).text("\u25bc edit");
                $row.show();
                $container.slideDown("fast");
                if ($container.data("loaded")) return;
                $container.html('<img src="/static/images/icons/loading.gif"/>');

                requests.push(function() {
                $.get(node.href, function(data) {
                    $container.html("").data("loaded", true);
                    var $table = $(data).find("h2:contains(Relationships)").next("table.details");
                    while ($table.length > 0) {
                        $.each($table.find("tbody > tr"), function(i, row) {
                            var $row = $(row),
                                type = $row.children("th").eq(0).text(),
                                perf_match = type.match(perf_regex);

                            if (perf_match == null && type != "medley of:") {
                                return;
                            }
                            var attrs = {}, typenum = "244";
                            if (perf_match != null) {
                                type = "recording of:";
                                typenum = "278";
                                attrs["partial"] = Boolean(perf_match[1]);
                                attrs["live"] = Boolean(perf_match[2]);
                                attrs["instrumental"] = Boolean(perf_match[3]);
                                attrs["cover"] = Boolean(perf_match[4]);
                            }
                            var $cell = $row.children("td").eq(0),
                                $spans = $cell.children("span");

                            $.each($spans, function(i, span) {
                                var $span = $(span),
                                    link = $span.children("a")[0] || $span.children("span.mp").children("a")[0],
                                    mbid = link.href.match(MBID_REGEX)[0],
                                    name = link.textContent,
                                    post_url = $span.children("span[style=float\\: right]").children("a")[1].href,
                                    begin_date = null, end_date = null;
                                for (var i = 0; i < span.childNodes.length; i++) {
                                    var child = span.childNodes[i];
                                    if (child.nodeType == 3) {
                                        date = child.nodeValue.match(date_regex);
                                        if (date == null) continue;
                                        begin_date = date[1] || null;
                                        end_date = (date[3] && date[3] != "????" ? date[3] : null);
                                        if (begin_date && end_date == null && date[2] == undefined) end_date = begin_date;
                                        break;
                                    }
                                }
                                var original_data = {
                                    "attrs": attrs,
                                    "type": typenum,
                                    "mbid": mbid,
                                    "name": name,
                                    "begin-date": begin_date,
                                    "end-date": end_date
                                };
                                $container.append(relationship_inputs(type, attrs, mbid, begin_date, end_date, false, rec_mbid, rec_title)
                                    .data({"original-data": original_data, "post-url": post_url}));
                            });
                        });
                        $table = $table.next();
                        if (!$table.is("table.details")) {
                            break;
                        }
                    }
                    if ($container.children().length == 0) {
                        $container.append(
                            "<strong>There are currently no works linked to this recording.</strong><br/><br/>",
                            relationship_inputs("recording of:", {}, "", "", "", true, rec_mbid, rec_title));
                    }
                    $container.append(
                        $('<span class="rrw-add-link"></span>')
                            .append("Link another work ", $('<img src="/static/images/icons/add_row.png"/>').css("vertical-align", "middle"))
                            .css("cursor", "pointer")
                            .click(function() {
                                var $link = relationship_inputs("recording of:", {}, "", "", "", true, rec_mbid, rec_title).hide();
                                $(this).before($link);
                                $link.slideDown("fast");
                            }));
                });});

                requests.push(function() {
                $.get("/ws/js/entity/" + node.href.match(MBID_REGEX)[0], function(data) {
                    ENTITIES[data["gid"]] = {"id": data["id"], "name": data["name"]};
                });});
            })
            .appendTo($("<td></td>").appendTo(row))
            .parent()
            .hide());
    });

    $("table.tbl").before(
        $('<div style="float: right;"></div>').append(
            $("<label></label>").append(
                $('<input type="checkbox"/>')
                    .change(function() {
                        adjust_cols();
                        $works_col.toggle();
                        $("span.rrw-works-btn").text("\u25c0 edit");
                        $bottom.toggle();
                        if (!this.checked) {
                            $("div.rrw-container").slideUp(function() {
                                $("tr.rrw-row").hide();
                            });
                        }
                    }),
                " Edit works"
        )));

    function get_add_data($link) {
        var begin_date = $link.children("input.begin-date").data("date") || {},
            end_date = $link.children("input.end-date").data("date") || {},
            link_type_id = $link.data("type"),
            data = {
                "ar.link_type_id": link_type_id,
                "ar.period.begin_date.year": begin_date["year"] || "",
                "ar.period.begin_date.month": begin_date["month"] || "",
                "ar.period.begin_date.day": begin_date["day"] || "",
                "ar.period.end_date.year": end_date["year"] || "",
                "ar.period.end_date.month": end_date["month"] || "",
                "ar.period.end_date.day": end_date["day"] || "",
                "ar.as_auto_editor": "1"
            };
        if (link_type_id == "278") {
            var $attrs = $link.children("span.attrs").find("input");
            data["ar.attrs.partial"] = ($attrs[0].checked && "1") || "0";
            data["ar.attrs.live"] = ($attrs[1].checked && "1") || "0";
            data["ar.attrs.instrumental"] = ($attrs[2].checked && "1") || "0";
            data["ar.attrs.cover"] = ($attrs[3].checked && "1") || "0";
        }
        return data;
    }

    function get_edit_data($link) {
        var recording = ENTITIES[$link.data("recording")],
            $attrs = $link.children("span.attrs").find("input"),
            begin_date = $link.children("input.begin-date").data("date") || {},
            end_date = $link.children("input.end-date").data("date") || {};
        return {
            "ar.entity0.id": recording["id"],
            "ar.entity0.name": recording["name"],
            "ar.entity1.id": $link.data("work_id"),
            "ar.entity1.name": $link.data("work_name"),
            "ar.link_type_id": $link.data("type"),
            "ar.attrs.partial": ($attrs[0].checked && "1") || "0",
            "ar.attrs.live": ($attrs[1].checked && "1") || "0",
            "ar.attrs.instrumental": ($attrs[2].checked && "1") || "0",
            "ar.attrs.cover": ($attrs[3].checked && "1") || "0",
            "ar.period.begin_date.year": begin_date["year"] || "",
            "ar.period.begin_date.month": begin_date["month"] || "",
            "ar.period.begin_date.day": begin_date["day"] || "",
            "ar.period.end_date.year": end_date["year"] || "",
            "ar.period.end_date.month": end_date["month"] || "",
            "ar.period.end_date.day": end_date["day"] || "",
            "ar.as_auto_editor": "1"
        };
    }
}