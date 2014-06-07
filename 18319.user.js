// ==UserScript==
// @name		MusicBrainz: Custom language list
// @description		A script to include more languages in the short list.
// @version		2008-12-15
// @author		-
// @namespace		8e2e6eea-f610-43ad-87bb-6fe31c1ee471
//
// @include		http://musicbrainz.org/edit/album/editall.html*
// @include		http://musicbrainz.org/edit/albumlanguage/edit.html*
// @include		http://musicbrainz.org/cdi/enter.html*

// ==/UserScript==
//**************************************************************************//

var list;
// Edit Language page:
list = document.getElementById('id_language_new');
if (!list) {
	// Edit All page:
	list = document.getElementById('releaselanguage').getElementsByTagName('select')[0];
}

function addLanguage(id, name) {
	var newLanguage = document.createElement('option');
	newLanguage.text = name;
	newLanguage.value = id;

	list.add(newLanguage, null);
}

function compareOptionText(a, b) {
	return a.text != b.text ? a.text < b.text ? -1 : 1 : 0;
}
 
function sortList() {
	var i;
	var listEntries = new Array();
	var entry1, entry2;
	var selected;

	// Save the currently selected option
	selected = list[list.selectedIndex].text;
	
	// Copy the list into an array
	for (i = 0; i < list.length; i++) {
		listEntries[i] = new Option(list.options[i].text, list.options[i].value);
	}

	// Sort the array
	// Remove the first two entries before sorting because they should stay where they are
	entry1 = listEntries.shift();
	entry2 = listEntries.shift();
	listEntries.sort(compareOptionText);
	listEntries.unshift(entry1, entry2);

	// Update the list
	for (i = 0; i < list.length; i++) {
		list.options[i] = new Option(listEntries[i].text, listEntries[i].value);
	}

	// Cycle through the list and delete any duplicates
	// Also select the originally selected entry
	var prevEntry = "";
	for (i = 0; i < list.length; i++) {
		if (prevEntry == list.options[i].text) {
			list.remove(i);
			i--;
		}

		if (list.options[i].text == selected) {
			list.selectedIndex = i;
		}

		prevEntry = list.options[i].text;
	}
}

if (list) {

// START LIST **************************************************************//
// Remove the slashes in front of languages you want in the short list
// Add two slashes in front of languages you don't want in the short list

//	addLanguage(2, "Abkhazian");
//	addLanguage(3, "Achinese");
//	addLanguage(4, "Acoli");
//	addLanguage(5, "Adangme");
//	addLanguage(6, "Adyghe");
//	addLanguage(1, "Afar");
//	addLanguage(8, "Afrihili");
	addLanguage(9, "Afrikaans");
//	addLanguage(473, "Ainu");
//	addLanguage(10, "Akan");
//	addLanguage(12, "Albanian");
//	addLanguage(13, "Aleut");
//	addLanguage(15, "Amharic");
//	addLanguage(475, "Angika");
//	addLanguage(18, "Arabic");
//	addLanguage(20, "Aragonese");
//	addLanguage(23, "Arapaho");
//	addLanguage(25, "Arawak");
//	addLanguage(21, "Armenian");
//	addLanguage(479, "Aromanian");
//	addLanguage(26, "Assamese");
//	addLanguage(27, "Asturian");
//	addLanguage(30, "Avaric");
//	addLanguage(31, "Avestan");
//	addLanguage(32, "Awadhi");
//	addLanguage(33, "Aymara");
//	addLanguage(34, "Azerbaijani");
//	addLanguage(40, "Balinese");
//	addLanguage(38, "Baluchi");
//	addLanguage(39, "Bambara");
//	addLanguage(42, "Basa");
//	addLanguage(37, "Bashkir");
	addLanguage(41, "Basque");
//	addLanguage(44, "Beja");
//	addLanguage(45, "Belarusian");
//	addLanguage(46, "Bemba");
//	addLanguage(47, "Bengali");
//	addLanguage(49, "Bhojpuri");
//	addLanguage(50, "Bihari");
//	addLanguage(51, "Bikol");
//	addLanguage(52, "Bini");
//	addLanguage(53, "Bislama");
//	addLanguage(64, "Blin");
//	addLanguage(56, "Bosnian");
//	addLanguage(57, "Braj");
//	addLanguage(58, "Breton");
//	addLanguage(61, "Buginese");
//	addLanguage(62, "Bulgarian");
//	addLanguage(60, "Buriat");
//	addLanguage(63, "Burmese");
//	addLanguage(65, "Caddo");
	addLanguage(68, "Catalan");
//	addLanguage(70, "Cebuano");
//	addLanguage(75, "Chagatai");
//	addLanguage(72, "Chamorro");
//	addLanguage(74, "Chechen");
//	addLanguage(82, "Cherokee");
//	addLanguage(85, "Cheyenne");
//	addLanguage(73, "Chibcha");
//	addLanguage(313, "Chichewa");
//	addLanguage(76, "Chinese");
//	addLanguage(79, "Chinook jargon");
//	addLanguage(81, "Chipewyan");
//	addLanguage(80, "Choctaw");
//	addLanguage(83, "Church Slavic");
//	addLanguage(77, "Chuukese");
//	addLanguage(84, "Chuvash");
//	addLanguage(87, "Coptic");
//	addLanguage(88, "Cornish");
//	addLanguage(89, "Corsican");
//	addLanguage(93, "Cree");
//	addLanguage(286, "Creek");
//	addLanguage(94, "Crimean Tatar");
	addLanguage(366, "Croatian");
	addLanguage(98, "Czech");
//	addLanguage(99, "Dakota");
	addLanguage(100, "Danish");
//	addLanguage(101, "Dargwa");
//	addLanguage(103, "Delaware");
//	addLanguage(106, "Dinka");
//	addLanguage(107, "Divehi");
//	addLanguage(108, "Dogri");
//	addLanguage(105, "Dogrib");
//	addLanguage(111, "Duala");
	addLanguage(113, "Dutch");
//	addLanguage(114, "Dyula");
//	addLanguage(115, "Dzongkha");
//	addLanguage(116, "Efik");
//	addLanguage(118, "Ekajuk");
//	addLanguage(119, "Elamite");
//	addLanguage(120, "English");
//	addLanguage(290, "Erzya");
//	addLanguage(122, "Esperanto");
	addLanguage(123, "Estonian");
//	addLanguage(124, "Ewe");
//	addLanguage(125, "Ewondo");
//	addLanguage(126, "Fang");
//	addLanguage(128, "Fanti");
//	addLanguage(127, "Faroese");
//	addLanguage(129, "Fijian");
//	addLanguage(130, "Filipino");
	addLanguage(131, "Finnish");
//	addLanguage(133, "Fon");
//	addLanguage(134, "French");
//	addLanguage(485, "Frisian, Eastern");
//	addLanguage(484, "Frisian, Northern");
//	addLanguage(137, "Frisian, Western");
//	addLanguage(139, "Friulian");
//	addLanguage(138, "Fulah");
//	addLanguage(140, "Ga");
//	addLanguage(67, "Galibi Carib");
//	addLanguage(150, "Galician");
//	addLanguage(249, "Ganda");
//	addLanguage(141, "Gayo");
//	addLanguage(142, "Gbaya");
//	addLanguage(146, "Geez");
//	addLanguage(144, "Georgian");
	addLanguage(145, "German");
//	addLanguage(299, "German, Low");
//	addLanguage(476, "German, Swiss");
//	addLanguage(147, "Gilbertese");
//	addLanguage(154, "Gondi");
//	addLanguage(155, "Gorontalo");
//	addLanguage(156, "Gothic");
//	addLanguage(157, "Grebo");
	addLanguage(159, "Greek");
//	addLanguage(204, "Greenlandic");
//	addLanguage(160, "Guarani");
//	addLanguage(161, "Gujarati");
//	addLanguage(162, "Gwich&#39;in");
//	addLanguage(163, "Haida");
//	addLanguage(164, "Haitian Creole");
//	addLanguage(165, "Hausa");
	addLanguage(166, "Hawaiian");
	addLanguage(167, "Hebrew");
//	addLanguage(168, "Herero");
//	addLanguage(169, "Hiligaynon");
//	addLanguage(170, "Himachali");
	addLanguage(171, "Hindi");
//	addLanguage(174, "Hiri Motu");
//	addLanguage(173, "Hmong");
	addLanguage(176, "Hungarian");
//	addLanguage(177, "Hupa");
//	addLanguage(178, "Iban");
	addLanguage(180, "Icelandic");
//	addLanguage(181, "Ido");
//	addLanguage(179, "Igbo");
//	addLanguage(186, "Iloko");
	addLanguage(189, "Indonesian");
//	addLanguage(191, "Ingush");
//	addLanguage(187, "Interlingua");
//	addLanguage(185, "Interlingue");
//	addLanguage(184, "Inuktitut");
//	addLanguage(192, "Inupiaq");
//	addLanguage(149, "Irish");
	addLanguage(195, "Italian");
	addLanguage(198, "Japanese");
//	addLanguage(196, "Javanese");
//	addLanguage(200, "Judeo-Arabic");
//	addLanguage(199, "Judeo-Persian");
//	addLanguage(212, "Kabardian");
//	addLanguage(202, "Kabyle");
//	addLanguage(203, "Kachin");
//	addLanguage(459, "Kalmyk");
//	addLanguage(205, "Kamba");
//	addLanguage(206, "Kannada");
//	addLanguage(209, "Kanuri");
//	addLanguage(201, "Kara-Kalpak");
//	addLanguage(227, "Karachay-Balkar");
//	addLanguage(477, "Karelian");
//	addLanguage(208, "Kashmiri");
//	addLanguage(96, "Kashubian");
//	addLanguage(211, "Kazakh");
//	addLanguage(213, "Khasi");
//	addLanguage(215, "Khmer, Central");
//	addLanguage(217, "Kikuyu");
//	addLanguage(220, "Kimbundu");
//	addLanguage(218, "Kinyarwanda");
//	addLanguage(219, "Kirghiz");
//	addLanguage(421, "Klingon");
//	addLanguage(222, "Komi");
//	addLanguage(223, "Kongo");
//	addLanguage(221, "Konkani");
	addLanguage(224, "Korean");
//	addLanguage(225, "Kosraean");
//	addLanguage(226, "Kpelle");
//	addLanguage(230, "Kuanyama");
//	addLanguage(231, "Kumyk");
//	addLanguage(232, "Kurdish");
//	addLanguage(229, "Kurukh");
//	addLanguage(233, "Kutenai");
//	addLanguage(234, "Ladino");
//	addLanguage(235, "Lahnda");
//	addLanguage(236, "Lamba");
//	addLanguage(237, "Lao");
	addLanguage(238, "Latin");
	addLanguage(239, "Latvian");
//	addLanguage(240, "Lezghian");
//	addLanguage(241, "Limburgish");
//	addLanguage(242, "Lingala");
	addLanguage(243, "Lithuanian");
//	addLanguage(197, "Lojban");
//	addLanguage(245, "Lozi");
//	addLanguage(248, "Luba-Katanga");
//	addLanguage(247, "Luba-Lulua");
//	addLanguage(250, "Luiseno");
//	addLanguage(251, "Lunda");
//	addLanguage(252, "Luo");
//	addLanguage(253, "Lushai");
//	addLanguage(246, "Luxembourgish");
//	addLanguage(254, "Macedonian");
//	addLanguage(255, "Madurese");
//	addLanguage(256, "Magahi");
//	addLanguage(258, "Maithili");
//	addLanguage(259, "Makasar");
//	addLanguage(275, "Malagasy");
//	addLanguage(266, "Malay");
//	addLanguage(260, "Malayalam");
//	addLanguage(276, "Maltese");
//	addLanguage(277, "Manchu");
//	addLanguage(268, "Mandar");
//	addLanguage(261, "Mandingo");
//	addLanguage(278, "Manipuri");
//	addLanguage(151, "Manx");
//	addLanguage(262, "Maori");
//	addLanguage(22, "Mapudungun");
//	addLanguage(264, "Marathi");
//	addLanguage(78, "Mari");
//	addLanguage(257, "Marshallese");
//	addLanguage(288, "Marwari");
//	addLanguage(265, "Masai");
//	addLanguage(269, "Mende");
//	addLanguage(271, "Mi&#39;kmaq");
//	addLanguage(272, "Minangkabau");
//	addLanguage(287, "Mirandese");
//	addLanguage(280, "Mohawk");
//	addLanguage(267, "Moksha");
//	addLanguage(244, "Mongo");
//	addLanguage(282, "Mongolian");
//	addLanguage(283, "Mossi");
//	addLanguage(478, "N&#39;Ko");
//	addLanguage(294, "Nauru");
//	addLanguage(295, "Navajo");
//	addLanguage(297, "Ndebele, North");
//	addLanguage(296, "Ndebele, South");
//	addLanguage(298, "Ndonga");
//	addLanguage(293, "Neapolitan");
//	addLanguage(300, "Nepali");
//	addLanguage(301, "Nepal Bhasa");
//	addLanguage(302, "Nias");
//	addLanguage(304, "Niuean");
//	addLanguage(307, "Nogai");
//	addLanguage(308, "Norse, Old");
	addLanguage(309, "Norwegian");
//	addLanguage(306, "Norwegian Bokmål");
//	addLanguage(305, "Norwegian Nynorsk");
//	addLanguage(314, "Nyamwezi");
//	addLanguage(315, "Nyankole");
//	addLanguage(316, "Nyoro");
//	addLanguage(317, "Nzima");
//	addLanguage(318, "Occitan");
//	addLanguage(319, "Ojibwa");
//	addLanguage(320, "Oriya");
//	addLanguage(321, "Oromo");
//	addLanguage(322, "Osage");
//	addLanguage(323, "Ossetian");
//	addLanguage(332, "Palauan");
//	addLanguage(337, "Pali");
//	addLanguage(329, "Pampanga");
//	addLanguage(327, "Pangasinan");
	addLanguage(330, "Panjabi");
//	addLanguage(331, "Papiamento");
//	addLanguage(334, "Persian");
//	addLanguage(339, "Pohnpeian");
	addLanguage(338, "Polish");
	addLanguage(340, "Portuguese");
//	addLanguage(343, "Pushto");
//	addLanguage(344, "Quechua");
//	addLanguage(345, "Rajasthani");
//	addLanguage(346, "Rapanui");
//	addLanguage(347, "Rarotongan");
	addLanguage(351, "Romanian");
//	addLanguage(349, "Romansh");
//	addLanguage(350, "Romany");
//	addLanguage(352, "Rundi");
//	addLanguage(353, "Russian");
//	addLanguage(359, "Samaritan Aramaic");
//	addLanguage(383, "Sami, Inari");
//	addLanguage(382, "Sami, Lule");
//	addLanguage(380, "Sami, Northern");
//	addLanguage(385, "Sami, Skolt");
//	addLanguage(379, "Sami, Southern");
//	addLanguage(384, "Samoan");
//	addLanguage(354, "Sandawe");
//	addLanguage(355, "Sango");
//	addLanguage(360, "Sanskrit");
//	addLanguage(362, "Santali");
//	addLanguage(394, "Sardinian");
//	addLanguage(361, "Sasak");
//	addLanguage(365, "Scots");
//	addLanguage(148, "Scottish Gaelic");
//	addLanguage(367, "Selkup");
	addLanguage(363, "Serbian");
//	addLanguage(395, "Serer");
//	addLanguage(371, "Shan");
//	addLanguage(386, "Shona");
//	addLanguage(182, "Sichuan Yi");
//	addLanguage(364, "Sicilian");
//	addLanguage(372, "Sidamo");
//	addLanguage(54, "Siksika");
//	addLanguage(387, "Sindhi");
//	addLanguage(373, "Sinhala");
//	addLanguage(104, "Slave (Athapascan)");
	addLanguage(377, "Slovak");
	addLanguage(378, "Slovenian");
//	addLanguage(390, "Somali");
//	addLanguage(388, "Soninke");
//	addLanguage(110, "Sorbian, Lower");
//	addLanguage(175, "Sorbian, Upper");
//	addLanguage(310, "Sotho, Northern");
//	addLanguage(392, "Sotho, Southern");
//	addLanguage(474, "Southern Altai");
//	addLanguage(393, "Spanish");
//	addLanguage(398, "Sukuma");
//	addLanguage(480, "Sranan Tongo");
//	addLanguage(399, "Sundanese");
//	addLanguage(400, "Susu");
//	addLanguage(402, "Swahili");
//	addLanguage(397, "Swati");
	addLanguage(403, "Swedish");
//	addLanguage(404, "Syriac");
//	addLanguage(414, "Tagalog");
//	addLanguage(405, "Tahitian");
//	addLanguage(413, "Tajik");
//	addLanguage(423, "Tamashek");
//	addLanguage(407, "Tamil");
//	addLanguage(408, "Tatar");
//	addLanguage(409, "Telugu");
//	addLanguage(411, "Tereno");
//	addLanguage(412, "Tetum");
//	addLanguage(415, "Thai");
//	addLanguage(416, "Tibetan");
//	addLanguage(417, "Tigre");
//	addLanguage(418, "Tigrinya");
//	addLanguage(410, "Timne");
//	addLanguage(419, "Tiv");
//	addLanguage(422, "Tlingit");
//	addLanguage(426, "Tok Pisin");
//	addLanguage(420, "Tokelau");
//	addLanguage(424, "Tonga (Nyasa)");
//	addLanguage(425, "Tonga (Tonga Islands)");
//	addLanguage(427, "Tsimshian");
//	addLanguage(429, "Tsonga");
//	addLanguage(428, "Tswana");
//	addLanguage(431, "Tumbuka");
	addLanguage(433, "Turkish");
//	addLanguage(324, "Turkish, Ottoman");
//	addLanguage(430, "Turkmen");
//	addLanguage(435, "Tuvalu");
//	addLanguage(437, "Tuvinian");
//	addLanguage(436, "Twi");
//	addLanguage(438, "Udmurt");
//	addLanguage(440, "Uighur");
	addLanguage(441, "Ukrainian");
//	addLanguage(442, "Umbundu");
//	addLanguage(444, "Urdu");
//	addLanguage(445, "Uzbek");
//	addLanguage(446, "Vai");
//	addLanguage(447, "Venda");
	addLanguage(448, "Vietnamese");
//	addLanguage(449, "Volapük");
//	addLanguage(450, "Votic");
//	addLanguage(457, "Walloon");
//	addLanguage(453, "Waray");
//	addLanguage(454, "Washo");
//	addLanguage(455, "Welsh");
//	addLanguage(452, "Wolaitta");
//	addLanguage(458, "Wolof");
//	addLanguage(460, "Xhosa");
//	addLanguage(356, "Yakut");
//	addLanguage(461, "Yao");
//	addLanguage(462, "Yapese");
//	addLanguage(463, "Yiddish");
//	addLanguage(464, "Yoruba");
//	addLanguage(466, "Zapotec");
//	addLanguage(483, "Zaza");
//	addLanguage(467, "Zenaga");
//	addLanguage(468, "Zhuang");
//	addLanguage(470, "Zulu");
//	addLanguage(471, "Zuni");
//	addLanguage(24, "[Artificial (Other)]");
//	addLanguage(284, "[Multiple languages]");

// END LIST ****************************************************************//

	sortList();
}
