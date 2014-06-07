// ==UserScript==
// @name           Darwin's Data
// @namespace      Darwin's Data
// @description    Datos de Darwin's.
// @author         Monkey
// ==/UserScript==

var default_style = <><![CDATA[
#overview__table .resources_table, 
#overview__table .buildings_table, 
#overview__table .army_table, 
#overview__table .players_table, 
#overview__table .transporters_table, 
#overview__table .research_table {
  text-align: center;
  border-style: dotted;
  width: 1000px;
  font-size: 12px;
  color: #3a0d0d;
}

#overview__table td {
  padding: 1px;
}

table.table_script caption {
	font:bold 14px Comic Sans MS, Calibri, Arial;
	text-align:left;
}

#overview__table tr {
	font-weight:normal;
  background-color: #f6ebba;
}
	
.time_counter {
  font-weight: bold;
  color: #101668;
}

.lf {
  border-left: double;
  border-color: #ca9d69;
}

#overview__table th.table_header_city {
  text-align: left;
  font-weight: bold;
  width: 130px;
  padding-left: 3px;
}

.current_city_highlight {
  background-color: #fffbdb;
}

#overview__table .upgrading {
  background-color: #fbe5ba;
}

#overview__table tr.table_header {
  font-weight: bold;
  background-color: #ecdfa2;
  height: 21px;
  background-repeat: repeat-x;
}

#overview__table th.table_header {
  text-align: center;
  font-weight: bold;
}

#overview__table tr.table_footer {
  background-color: #ecdfa2;
  height: 21px;
  background-repeat: repeat-x;
}

td.table_footer {
  font-weight: bold;
}

.arrivinggoods {
  font-weight: bold;
  color: #ff0000;
}

td.arrivinggoodstooltip {
  padding: 3px;
}

td.arrivinggoodstooltip {
  border-width: 1px;
  border-style: dotted;
}

/*** progress bar styles ***/
table.myPercent {
  height: 4px;
  width: 100%;
}
tr.myPercent {
  height: 4px;
}
td.myPercentRemaining {
  background-color: #fffbdb;
}
td.myPercentNormal { /* normal state. you have plenty of rooms */
  background-color: #7d6432;
}
td.myPercentWarning { /* warehose is getting full */
  background-color: #C00000;
}
td.myPercentAlmostFull { /* warehouse is almost full */
  background-color: #ff0000;
}
td.myPercentFull { /* warehouse is full */
  background-color: #ff0000;
}

/*** highscore styles ***/
tr.hs_ownally {
  background-color: #DAF887 !important;
}
tr.hs_friendlyally {
  background-color: #FFFF80 !important;
}
tr.hs_hostileally {
  background-color: #FF979B !important;
}

/****************** population full *******************/
td.populationfull {
  color: #ff0000;
  font-weight: bold;
}

/****************** current building *******************/
th.current_building {
  background-color: #fffbdb;
  height: 21px;
  background-repeat: repeat-x;
}

td.current_building {
}

#overview__table a {
 color: #064027;
}
]]></>.toXMLString();

var TimeUnits                = {day: 86400, hour: 3600, minute: 60, second: 1};

var academyCapacities        = [0, 
								8, 		//Level 1
								12, 		//Level 2
								16, 		//Level 3
								22, 		//Level 4
								28, 		//Level 5
								35, 		//Level 6
								43, 		//Level 7
								51, 		//Level 8
								60, 		//Level 9
								69, 		//Level 10
								79, 		//Level 11
								89, 		//Level 12
								100, 		//Level 13
								111, 		//Level 14
								122, 		//Level 15
								134, 		//Level 16
								146, 		//Level 17
								159, 		//Level 18
								172, 		//Level 19
								185, 		//Level 20
								198, 		//Level 21
								212, 		//Level 22
								226,		//Level 23
								241];		//Level 24

var tavernWineUsage      	 = [0, 
								4, 		//Level 1
								8, 		//Level 2
								13, 		//Level 3
								18, 		//Level 4
								24, 		//Level 5
								30, 		//Level 6
								37, 		//Level 7
								44, 		//Level 8
								51, 		//Level 9
								60, 		//Level 10
								68, 		//Level 11
								78, 		//Level 12
								88, 		//Level 13
								99, 		//Level 14
								110, 		//Level 15
								122, 		//Level 16
								136, 		//Level 17
								150, 		//Level 18
								165, 		//Level 19
								180, 		//Level 20
								197, 		//Level 21
								216, 		//Level 22
								235, 		//Level 23
								255, 		//Level 24
								277, 		//Level 25
								300, 		//Level 26
								325];		//Level 27

var townHallSpaces      	 = [0, 
								60, 		//Level 1
								96, 		//Level 2
								142, 		//Level 3
								200, 		//Level 4
								262, 		//Level 5
								332, 		//Level 6
								410, 		//Level 7
								492, 		//Level 8
								580, 		//Level 9
								672, 		//Level 10
								768, 		//Level 11
								870, 		//Level 12
								976, 		//Level 13
								1086, 	//Level 14
								1200, 	//Level 15
								1320, 	//Level 16
								1440, 	//Level 17
								1566, 	//Level 18
								1696, 	//Level 19
								1828, 	//Level 20
								1964, 	//Level 21
								2102, 	//Level 22
								2246, 	//Level 23
								2390, 	//Level 24
								2540, 	//Level 25
								2690, 	//Level 26
								2845, 	//Level 27
								3061];	//Level 28


var unitScoreBasePoints      = {"wood": 0.02, 
								"wine": 0.02, 
								"glass": 0.02, 
								"sulfur": 0.02};

var unitScoreBaseIndex       = {"wood": "w", 
								"wine": "W", 
								"glass":"C", 
								"sulfur":"S"};

var costs = {
"townHall" : [
  //Wood		Marble		Time			Level
  {}, 
  {w:158, 					t:"59m 4s"},	// Level 2
  {w:335, 					t:"1h 6m"}, 	// Level 3
  {w:623, 					t:"1h 14m"}, 	// Level 4
  {w:923, 		M:285, 		t:"1h 23m"}, 	// Level 5
  {w:1390, 		M:551, 		t:"1h 34m"}, 	// Level 6
  {w:2015, 		M:936, 		t:"1h 48m"}, 	// Level 7
  {w:2706, 		M:1411, 		t:"2h 3m"}, 	// Level 8
  {w:3661, 		M:2091, 		t:"2h 21m"}, 	// Level 9
  {w:4776,		M:2945, 		t:"2h 42m"}, 	// Level 10
  {w:6173, 		M:4072, 		t:"3h 6m"}, 	// Level 11
  {w:8074, 		M:5664, 		t:"3h 35m"}, 	// Level 12
  {w:10280, 	M:7637, 		t:"4h 8m"}, 	// Level 13
  {w:13023, 	M:10214, 		t:"4h 48m"}, 	// Level 14
  {w:16424, 	M:13575, 		t:"5h 34m"}, 	// Level 15
  {w:20986, 	M:18254, 		t:"6h 27m"}, 	// Level 16
  {w:25423, 	M:23250, 		t:"7h 30m"}, 	// Level 17
  {w:32285, 	M:31022, 		t:"8h 44m"}, 	// Level 18
  {w:40232, 	M:40599, 		t:"10h 10m"}, 	// Level 19
  {w:49286, 	M:52216, 		t:"11h 51m"}, 	// Level 20
  {w:61207, 	M:68069, 		t:"13h 49m"}, 	// Level 21
  {w:74804, 	M:87316, 		t:"16h 6m"}, 	// Level 22
  {w:93956, 	M:115101, 		t:"18h 48m"}, 	// Level 23
  {w:113035, 	M:145326, 		t:"21h 56m"}, 	// Level 24
  {w:141594, 	M:191053, 		t:"1D 1h"}, 	// Level 25
  {w:170213, 	M:241039, 		t:"1D 5h"}, 	// Level 26
  {w:210011, 	M:312128, 		t:"1D 10h"}, 	// Level 27
  {w:258875, 	M:403824, 		t:"1D 16h"}], 	// Level 28

"academy" : [
  //Wood		Crystal		Time			Level
  {w:64, 					t:"16m 48s"},	// Level 1
  {w:68, 					t:"22m 34s"}, 	// Level 2
  {w:115, 					t:"29m 28s"}, 	// Level 3
  {w:263, 					t:"37m 46s"}, 	// Level 4
  {w:382, 		C:225, 		t:"47m 43s"}, 	// Level 5
  {w:626, 		C:428, 		t:"59m 40s"}, 	// Level 6
  {w:982, 		C:744, 		t:"1h 14m"}, 	// Level 7
  {w:1330, 		C:1089, 		t:"1h 31m"}, 	// Level 8
  {w:2004, 		C:1748, 		t:"1h 51m"}, 	// Level 9
  {w:2665, 		C:2454, 		t:"2h 16m"}, 	// Level 10
  {w:3916, 		C:3786, 		t:"2h 46m"}, 	// Level 11
  {w:5156, 		C:5216, 		t:"3h 21m"}, 	// Level 12
  {w:7446, 		C:7862, 		t:"4h 4m"}, 	// Level 13
  {w:9753, 		C:10729, 		t:"4h 56m"}, 	// Level 14
  {w:12751, 	C:14599, 		t:"5h 57m"}, 	// Level 15
  {w:18163, 	C:21627, 		t:"7h 11m"}, 	// Level 16
  {w:23691, 	C:29321, 		t:"8h 40m"}, 	// Level 17
  {w:33450, 	C:43020, 		t:"10h 26m"}, 	// Level 18
  {w:43571, 	C:58213, 		t:"12h 34m"}, 	// Level 19
  {w:56728, 	C:78724, 		t:"15h 8m"}, 	// Level 20
  {w:74804, 	C:106414, 		t:"18h 12m"}, 	// Level 21
  {w:105921, 	C:158544, 		t:"21h 52m"}, 	// Level 22
  {w:144203, 	C:224146, 		t:"1D 2h"}],	// Level 23

"port" : [
  //Wood		Marble		Time			Level
  {w:60, 					t:"16m 48s"}, 	// Level 1
  {w:150, 					t:"23m 6s"}, 	// Level 2
  {w:274, 					t:"30m 21s"}, 	// Level 3
  {w:429, 					t:"38m 41s"}, 	// Level 4
  {w:637, 					t:"48m 15s"}, 	// Level 5
  {w:894, 		M:176, 		t:"59m 17s"}, 	// Level 6
  {w:1207, 		M:326, 		t:"1h 11m"}, 	// Level 7
  {w:1645, 		M:540, 		t:"1h 26m"}, 	// Level 8
  {w:2106, 		M:791, 		t:"1h 43m"}, 	// Level 9
  {w:2735, 		M:1138, 		t:"2h 2m"}, 	// Level 10
  {w:3537, 		M:1598, 		t:"2h 24m"}, 	// Level 11
  {w:4492, 		M:2176, 		t:"2h 50m"}, 	// Level 12
  {w:5689, 		M:2928, 		t:"3h 19m"}, 	// Level 13
  {w:7103, 		M:3859, 		t:"3h 53m"}, 	// Level 14
  {w:8850, 		M:5051, 		t:"4h 31m"}, 	// Level 15
  {w:11094, 	M:6628, 		t:"5h 16m"}, 	// Level 16
  {w:13731, 	M:8566, 		t:"6h 7m"}, 	// Level 17
  {w:17062, 	M:11089, 		t:"7h 6m"}, 	// Level 18
  {w:21097, 	M:14265, 		t:"8h 14m"}, 	// Level 19
  {w:25965, 	M:18241, 		t:"9h 32m"}, 	// Level 20
  {w:31810, 	M:23197, 		t:"11h 2m"}, 	// Level 21
  {w:39190, 	M:29642, 		t:"12h 45m"}, 	// Level 22
  {w:47998, 	M:37636, 		t:"14h 43m"}, 	// Level 23
  {w:58713, 	M:47703, 		t:"17h 14s"},	// Level 24
  {w:71955, 	M:60556, 		t:"19h 37m"},	// Level 25
  {w:87627, 	M:76366, 		t:"22h 37m"}],	// Level 26

"shipyard" : [
  //Wood		Marble		Time			Level
  {w:105, 					t:"43m 12s"}, 	// Level 1
  {w:202, 					t:"51m 18s"}, 	// Level 2
  {w:324, 					t:"59m 48s"}, 	// Level 3
  {w:477, 					t:"1h 8m"}, 	// Level 4
  {w:671, 					t:"1h 18m"}, 	// Level 5
  {w:914, 		M:778, 		t:"1h 27m"}, 	// Level 6
  {w:1222, 		M:1052, 		t:"1h 38m"}, 	// Level 7
  {w:1609, 		M:1397, 		t:"1h 49m"}, 	// Level 8
  {w:2096, 		M:1832, 		t:"2h 33s"}, 	// Level 9
  {w:2711, 		M:2381, 		t:"2h 12m"}, 	// Level 10
  {w:3485, 		M:3071, 		t:"2h 25m"}, 	// Level 11
  {w:4460, 		M:3942, 		t:"2h 38m"}, 	// Level 12
  {w:5689, 		M:5038, 		t:"2h 52m"}, 	// Level 13
  {w:7238, 		M:6420, 		t:"3h 6m"}, 	// Level 14
  {w:9190, 		M:8161, 		t:"3h 21m"}, 	// Level 15
  {w:11648, 	M:10354, 		t:"3h 37m"}, 	// Level 16
  {w:14745, 	M:13117, 		t:"3h 54m"}, 	// Level 17
  {w:18650, 	M:16601, 		t:"4h 12m"}, 	// Level 18
  {w:23568, 	M:20989, 		t:"4h 31m"},	// Level 19
  {w:29765, 	M:26517, 		t:"4h 50m"},	// Level 20
  {w:37572, 	M:33484, 		t:"5h 11m"},	// Level 21
  {w:47412, 	M:42261, 		t:"5h 32m"}],	// Level 22
	
"warehouse" : [
  //Wood		Marble		Time			Level
  {w:160, 					t:"18m 43s"}, 	// Level 1
  {w:288, 					t:"26m 23s"}, 	// Level 2
  {w:442, 					t:"35m 7s"}, 	// Level 3
  {w:626, 		M:96, 		t:"45m 4s"}, 	// Level 4
  {w:847, 		M:211, 		t:"56m 25s"}, 	// Level 5
  {w:1113, 		M:349, 		t:"1h 9m"}, 	// Level 6
  {w:1431, 		M:515, 		t:"1h 24m"}, 	// Level 7
  {w:1813, 		M:714, 		t:"1h 40m"}, 	// Level 8
  {w:2272, 		M:953, 		t:"2h 6m"}, 	// Level 9
  {w:2822, 		M:1240, 		t:"2h 21m"}, 	// Level 10
  {w:3483, 		M:1584, 		t:"2h 46m"}, 	// Level 11
  {w:4275, 		M:1997, 		t:"3h 15m"}, 	// Level 12
  {w:5226, 		M:2492, 		t:"3h 47m"}, 	// Level 13
  {w:6368, 		M:3086, 		t:"4h 24m"}, 	// Level 14
  {w:7737, 		M:3800, 		t:"5h 6m"}, 	// Level 15
  {w:9380, 		M:4656, 		t:"5h 54m"}, 	// Level 16
  {w:11353, 	M:5683, 		t:"6h 49m"}, 	// Level 17
  {w:13719, 	M:6915, 		t:"7h 51m"}, 	// Level 18
  {w:16559, 	M:8394, 		t:"9h 2m"}, 	// Level 19
  {w:19967, 	M:10169, 		t:"10h 23m"}, 	// Level 20
  {w:24056, 	M:12299, 		t:"11h 56m"}, 	// Level 21
  {w:28963, 	M:14855, 		t:"13h 41m"}, 	// Level 22
  {w:34852, 	M:17921, 		t:"15h 41m"}, 	// Level 23
  {w:41917, 	M:21602, 		t:"17h 58m"}, 	// Level 24
  {w:50398, 	M:26019, 		t:"20h 34m"}, 	// Level 25
  {w:60574, 	M:31319, 		t:"23h 32m"}, 	// Level 26
  {w:72784, 	M:37679, 		t:"1d 2h"}, 	// Level 27
  {w:87437, 	M:45310, 		t:"1d 6h"}, 	// Level 28
  {w:105021, 	M:54468, 		t:"1d 11h"}, 	// Level 29
  {w:126333, 	M:65457, 		t:"1d 16h"}, 	// Level 30
  {w:151441, 	M:78645, 		t:"1d 21h"}, 	// Level 31
  {w:181825, 	M:94471, 		t:"2d 4h"}, 	// Level 32
  {w:218300, 	M:113455, 		t:"2d 12h"}, 	// Level 33
  {w:262039, 	M:136249, 		t:"2D 20h"}, 	// Level 34
  {w:314543, 	M:163595, 		t:"3D 16h"}, 	// Level 35
  {w:377548, 	M:196409, 		t:"4D ?h"}, 	// Level 36
  {w:453153, 	M:235787, 		t:"?D ?h"}, 	// Level 37
  {w:543880, 	M:283041, 		t:"?D ?h"}, 	// Level 38
  {w:652752, 	M:339745, 		t:"?D ?h"}, 	// Level 39
  {w:783398, 	M:407790, 		t:"?D ?h"}], 	// Level 40

"wall" : [
  //Wood		Marble		Time			Level
  {w:114, 					t:"42m"}, 		// Level 1
  {w:361, 		M:203, 		t:"52m"}, 		// Level 2
  {w:657, 		M:516, 		t:"1h 2m"}, 	// Level 3
  {w:1012, 		M:892, 		t:"1h 13m"}, 	// Level 4
  {w:1439, 		M:1344, 		t:"1h 26m"}, 	// Level 5
  {w:1951, 		M:1885, 		t:"1h 40m"}, 	// Level 6
  {w:2565, 		M:2535, 		t:"1h 56m"}, 	// Level 7
  {w:3302, 		M:3315, 		t:"2h 13m"}, 	// Level 8
  {w:4186, 		M:4251, 		t:"2h 31m"}, 	// Level 9
  {w:5247, 		M:5374, 		t:"2h 52m"}, 	// Level 10
  {w:6521, 		M:6721, 		t:"3h 15m"}, 	// Level 11
  {w:8049, 		M:8338, 		t:"3h 39m"}, 	// Level 12
  {w:9882, 		M:10279, 		t:"4h 7m"}, 	// Level 13
  {w:12083, 	M:12608, 		t:"4h 37m"}, 	// Level 14
  {w:14724, 	M:15402, 		t:"5h 10m"}, 	// Level 15
  {w:17892, 	M:18755, 		t:"5h 47m"}, 	// Level 16
  {w:21695, 	M:22779, 		t:"6h 27m"}, 	// Level 17
  {w:26258, 	M:27607, 		t:"7h 11m"}, 	// Level 18
  {w:31733, 	M:33402, 		t:"7h 59m"}, 	// Level 19
  {w:38304, 	M:40355, 		t:"8h 53m"}, 	// Level 20
  {w:46189, 	M:48699, 		t:"9h 51m"}, 	// Level 21
  {w:55650, 	M:58711, 		t:"10h 56m"}, 	// Level 22
  {w:67004, 	M:70726, 		t:"12h 7m"}, 	// Level 23
  {w:80629, 	M:85144, 		t:"13h 25m"}, 	// Level 24
  {w:96978, 	M:102445, 		t:"14h 51m"}, 	// Level 25
  {w:116599, 	M:123208, 		t:"16h 26m"}, 	// Level 26
  {w:140142, 	M:148121, 		t:"18h 10m"}, 	// Level 27
  {w:168395, 	M:178019, 		t:"20h 4m"}, 	// Level 28
  {w:202298, 	M:213896, 		t:"22h 10m"},	// Level 29
  {w:242982, 	M:256948, 		t:"23h ?m"},	// Level 30
  {w:291802, 	M:308610, 		t:"1D 3h"},		// Level 31
  {w:350387, 	M:370605, 		t:"1D ?h"}],	// Level 32

"tavern" : [
  //Wood		Marble		Time			Level
  {w:101, 					t:"16m 48s"}, 	// Level 1
  {w:222, 					t:"28m 15s"}, 	// Level 2
  {w:367, 					t:"40m 23s"}, 	// Level 3
  {w:541, 		M:94, 		t:"53m 15s"}, 	// Level 4
  {w:750, 		M:122, 		t:"1h 6m"}, 	// Level 5
  {w:1001, 		M:158, 		t:"1h 21m"}, 	// Level 6
  {w:1302, 		M:206, 		t:"1h 36m"}, 	// Level 7
  {w:1663, 		M:267, 		t:"1h 52m"}, 	// Level 8
  {w:2097, 		M:348, 		t:"2h 10m"}, 	// Level 9
  {w:2617, 		M:452, 		t:"2h 28m"}, 	// Level 10
  {w:3241, 		M:587, 		t:"2h 47m"}, 	// Level 11
  {w:3990, 		M:764, 		t:"3h 8m"}, 	// Level 12
  {w:4888, 		M:993, 		t:"3h 29m"}, 	// Level 13
  {w:5967, 		M:1290, 		t:"3h 52m"}, 	// Level 14
  {w:7261, 		M:1677, 		t:"4h 17m"}, 	// Level 15
  {w:8814, 		M:2181, 		t:"4h 43m"}, 	// Level 16
  {w:10678, 	M:2835, 		t:"5h 10m"}, 	// Level 17
  {w:12914, 	M:3685, 		t:"5h 39m"}, 	// Level 18
  {w:15598, 	M:4791, 		t:"6h 10m"}, 	// Level 19
  {w:18818, 	M:6228, 		t:"6h 43m"}, 	// Level 20
  {w:22683, 	M:8097, 		t:"7h 17m"}, 	// Level 21
  {w:27320, 	M:10526, 		t:"7h 54m"}, 	// Level 22
  {w:32885, 	M:13684, 		t:"8h 33m"}, 	// Level 23
  {w:39562, 	M:17789, 		t:"9h 14m"}, 	// Level 24
  {w:47576, 	M:23125, 		t:"9h 58m"}, 	// Level 25
  {w:57193, 	M:30063, 		t:"10h 44m"},	// Level 26
  {w:68731, 	M:39082, 		t:"11h 34m"},	// Level 27
  {w:82578, 	M:50806, 		t:"12h 26m"},	// Level 28
  {w:99194, 	M:66048, 		t:"13h 21m"},	// Level 29
  {w:119134, 	M:85862, 		t:"14h 19m"},	// Level 30
  {w:143061, 	M:111621, 		t:"15h ?m"},	// Level 31
  {w:171774, 	M:145107, 		t:"16h ?m"},	// Level 32
  {w:206230, 	M:188640, 		t:"17h 37m"},	// Level 33
  {w:247577, 	M:245231, 		t:"18h 51m"}],	// Level 34

"museum" : [
  //Wood		Marble		Time			Level
  {w:560, 		M:280, 		t:"1h 36m"}, 	// Level 1
  {w:1435, 		M:1190, 		t:"2h 9m"}, 	// Level 2
  {w:2748, 		M:2573, 		t:"2h 45m"}, 	// Level 3
  {w:4716, 		M:4676, 		t:"3h 25m"}, 	// Level 4
  {w:7669, 		M:7871, 		t:"4h 9m"}, 	// Level 5
  {w:12099, 	M:12729, 		t:"4h 57m"}, 	// Level 6
  {w:18744, 	M:20112, 		t:"5h 50m"}, 	// Level 7
  {w:28710, 	M:31335, 		t:"6h 49m"}, 	// Level 8
  {w:43661, 	M:48394, 		t:"7h 53m"}, 	// Level 9
  {w:66085, 	M:74323, 		t:"9h 4m"}, 	// Level 10
  {w:99724, 	M:113736, 		t:"10h 21m"}, 	// Level 11
  {w:150181, 	M:173642, 		t:"11h 47m"}, 	// Level 12
  {w:225866, 	M:264701, 		t:"13h 21m"},	// Level 13
  {w:339394, 	M:403110, 		t:"15h 5m"},	// Level 14
  {w:509686, 	M:613492, 		t:"16h 59m"},	// Level 15
  {w:765124, 	M:933272, 		t:"18h ?m"}],	// Level 16

"palace" : [
  //Wood		Wine		Marble	Crystal	Sulphure	Time			Level
  {w:712, 										t:"4h 28m"},  	// Level 1
  {w:5824, 				M:1434, 					t:"6h 16m"},  	// Level 2
  {w:16048, 			M:4546, 			S:3089, 	t:"8h 46m"},  	// Level 3
  {w:36496, 	W:10898, 	M:10770, 			S:10301, 	t:"12h 17m"},  	// Level 4
  {w:77392, 	W:22110, 	M:23218, 	C:21188, 	S:24725, 	t:"17h 12m"},  	// Level 5
  {w:159184, 	W:44534, 	M:48114, 	C:42400, 	S:53573, 	t:"1d 5m"},  	// Level 6
  {w:322768, 	W:89382, 	M:97906, 	C:84824, 	S:111269, 	t:"1d 9h"},  	// Level 7
  {w:649935, 	W:179078, 	M:185744, 	C:169671, 	S:226661, 	t:"1d 23h"},  	// Level 8
  {w:1304271, 	W:358470, 	M:396658, 	C:339368, 	S:457445, 	t:"2D 18h"}, 	// Level 9
  {w:2612944, 	W:717254, 	M:794994, 	C:678760, 	S:919013, 	t:"3D 20h"}], 	// Level 10

"palaceColony" : [
  //Wood		Wine		Marble	Crystal	Sulphure	Time			Level
  {w:712, 										t:"4h 28m"},  	// Level 1
  {w:5824, 				M:1434, 					t:"6h 16m"},  	// Level 2
  {w:16048, 			M:4546, 			S:3089, 	t:"8h 46m"},  	// Level 3
  {w:36496, 	W:10898, 	M:10770, 			S:10301, 	t:"12h 17m"},  	// Level 4
  {w:77392, 	W:22110, 	M:23218, 	C:21188, 	S:24725, 	t:"17h 12m"},  	// Level 5
  {w:159184, 	W:44534, 	M:48114, 	C:42400, 	S:53573, 	t:"1d 5m"},  	// Level 6
  {w:322768, 	W:89382, 	M:97906, 	C:84824, 	S:111269, 	t:"1d 9h"},  	// Level 7
  {w:649935, 	W:179078, 	M:185744, 	C:169671, 	S:226661, 	t:"1d 23h"},  	// Level 8
  {w:1304271, 	W:358470, 	M:396658, 	C:339368, 	S:457445, 	t:"2D 18h"}, 	// Level 9
  {w:2612944, 	W:717254, 	M:794994, 	C:678760, 	S:919013, 	t:"3D 20h"}], 	// Level 10

"embassy" : [
  //Wood		Marble		Time			Level
  {w:242, 		M:155, 		t:"1h 12m"},	// Level 1
  {w:415, 		M:342, 		t:"1h 24m"}, 	// Level 2
  {w:623, 		M:571, 		t:"1h 36m"}, 	// Level 3
  {w:873, 		M:850, 		t:"1h 49m"}, 	// Level 4
  {w:1173, 		M:1190, 		t:"2h 3m"}, 	// Level 5
  {w:1532, 		M:1606, 		t:"2h 18m"}, 	// Level 6
  {w:1964, 		M:2112, 		t:"2h 33m"}, 	// Level 7
  {w:2482, 		M:2730, 		t:"2h 49m"}, 	// Level 8
  {w:3103, 		M:3484, 		t:"3h 6m"}, 	// Level 9
  {w:3849, 		M:4404, 		t:"3h 24m"}, 	// Level 10
  {w:4743, 		M:5527, 		t:"3h 42m"}, 	// Level 11
  {w:5817, 		M:6896, 		t:"4h 2m"}, 	// Level 12
  {w:7105, 		M:8566, 		t:"4h 23m"}, 	// Level 13
  {w:8651, 		M:10604, 		t:"4h 44m"}, 	// Level 14
  {w:10507, 	M:13090, 		t:"5h 7m"}, 	// Level 15
  {w:12733, 	M:16123, 		t:"5h 30m"}, 	// Level 16
  {w:15404, 	M:19824, 		t:"5h 55m"}, 	// Level 17
  {w:18498, 	M:24339, 		t:"6h 22m"}, 	// Level 18
  {w:22457, 	M:29846, 		t:"6h 49m"}, 	// Level 19
  {w:27074, 	M:36564, 		t:"7h 18m"}, 	// Level 20
  {w:32290, 	M:45216, 		t:"7h 48m"}, 	// Level 21
  {w:39261, 	M:54769, 		t:"8h 20m"}, 	// Level 22
  {w:47240, 	M:66733, 		t:"8h 54m"}, 	// Level 23
  {w:56812, 	M:81859, 		t:"9h 29m"}, 	// Level 24
  {w:70157, 	M:104537, 		t:"10h 6m"}, 	// Level 25
  {w:84318, 	M:129580, 		t:"10h 44m"},	// Level 26
  {w:101310, 	M:158759, 		t:"11h 25m"},	// Level 27
  {w:121979, 	M:193849, 		t:"12h 8m"},	// Level 28
  {w:146503, 	M:236659, 		t:"12h 52m"},	// Level 29
  {w:175932, 	M:288888, 		t:"13h 39m"},	// Level 30
  {w:222202, 	M:358869, 		t:"14h 29m"},	// Level 31
  {w:266778, 	M:437985, 		t:"15h 31m"}],	// Level 32
  
"branchOffice" : [
  //Wood		Marble		Time			Level
  {w:48, 					t:"24m"}, 		// Level 1
  {w:173, 					t:"42m"}, 		// Level 2
  {w:346, 					t:"1h 1m"}, 	// Level 3
  {w:581, 					t:"1h 23m"}, 	// Level 4
  {w:896, 		M:540, 		t:"1h 47m"}, 	// Level 5
  {w:1314, 		M:792, 		t:"2h 13m"}, 	// Level 6
  {w:1863, 		M:1123, 		t:"2h 42m"}, 	// Level 7
  {w:2580, 		M:1555, 		t:"3h 14m"}, 	// Level 8
  {w:3509, 		M:2115, 		t:"3h 49m"}, 	// Level 9
  {w:4706, 		M:2837, 		t:"4h 28m"}, 	// Level 10
  {w:6241, 		M:3762, 		t:"5h 10m"}, 	// Level 11
  {w:8203, 		M:7945, 		t:"5h 57m"}, 	// Level 12
  {w:10699, 	M:6450, 		t:"6h 48m"}, 	// Level 13
  {w:13866, 	M:8359, 		t:"7h 45m"}, 	// Level 14
  {w:17872, 	M:10774, 		t:"8h 47m"}, 	// Level 15
  {w:22926, 	M:13820, 		t:"9h 55m"}, 	// Level 16
  {w:29286, 	M:17654, 		t:"11h 11m"}, 	// Level 17
  {w:37272, 	M:22469, 		t:"12h 33m"},	// Level 18
  {w:47282, 	M:28502, 		t:"14h 4m"},	// Level 19
  {w:59806, 	M:36051, 		t:"15h 44m"},	// Level 20
  {w:75448, 	M:45481, 		t:"17h 34m"}],	// Level 21


"safehouse" : [
  //Wood		Marble			Time			Level
  {w:113, 						t:"24m 00s"}, 	// Level 1
  {w:248, 						t:"36m 00s"}, 	// Level 2
  {w:402, 						t:"48m 36s"}, 	// Level 3
  {w:578, 		M:129, 			t:"1h 1m"}, 	// Level 4
  {w:779, 		M:197, 			t:"1h 15m"}, 	// Level 5
  {w:1007, 		M:275, 			t:"1h 30m"}, 	// Level 6
  {w:1267, 		M:366, 			t:"1h 45m"}, 	// Level 7
  {w:1564, 		M:471, 			t:"2h 1m"}, 	// Level 8
  {w:1903, 		M:593, 			t:"2h 18m"}, 	// Level 9
  {w:2288, 		M:735, 			t:"2h 36m"}, 	// Level 10
  {w:2728, 		M:900, 			t:"2h 54m"}, 	// Level 11
  {w:3230, 		M:1090, 		t:"3h 14m"}, 	// Level 12
  {w:3801, 		M:1312, 		t:"3h 35m"}, 	// Level 13
  {w:4453, 		M:1569, 		t:"3h 56m"}, 	// Level 14
  {w:5195, 		M:1866, 		t:"4h 19m"}, 	// Level 15
  {w:6042, 		M:2212, 		t:"4h 42m"}, 	// Level 16
  {w:7008, 		M:2613, 		t:"5h 4m"}, 	// Level 17
  {w:8107, 		M:2924, 		t:"5h 34m"}, 	// Level 18
  {w:9547, 		M:3617, 		t:"6h 1m"}, 	// Level 19
  {w:10793, 	M:4242, 		t:"6h 30m"}, 	// Level 20
  {w:12422, 	M:4967, 		t:"7h 47s"}, 	// Level 21
  {w:14282, 	M:5810, 		t:"7h 32m"}, 	// Level 22
  {w:16401, 	M:6787, 		t:"8h 6m"}, 	// Level 23
  {w:18815, 	M:7919, 		t:"8h 41m"}, 	// Level 24
  {w:21570, 	M:9233, 		t:"9h 18m"}, 	// Level 25
  {w:24708, 	M:10757, 		t:"9h 56m"}, 	// Level 26
  {w:29488, 	M:12526, 		t:"10h 37m"}, 	// Level 27
  {w:33741, 	M:14577, 		t:"11h 20m"}, 	// Level 28
  {w:38589, 	M:16956, 		t:"12h 4m"}, 	// Level 29
  {w:44115, 	M:19715, 		t:"12h 51m"}, 	// Level 30
  {w:46585, 	M:21399, 		t:"13h 41m"}, 	// Level 31
  {w:53221, 	M:24867, 		t:"14h 33m"}], 	// Level 32

"barracks" : [
  //Wood		Marble		Time			Level
  {w:49, 					t:"13m 12s"}, 	// Level 1
  {w:114, 					t:"17m 24s"}, 	// Level 2
  {w:195, 					t:"22m 1s"}, 	// Level 3
  {w:296, 					t:"27m 6s"}, 	// Level 4
  {w:420, 					t:"32m 42s"}, 	// Level 5
  {w:574, 					t:"38m 50s"}, 	// Level 6
  {w:766, 					t:"45m 36s"}, 	// Level 7
  {w:1003, 					t:"53m 3s"}, 	// Level 8
  {w:1297, 		M:178, 		t:"1h 1m"}, 	// Level 9
  {w:1662, 		M:431, 		t:"1h 10m"}, 	// Level 10
  {w:2115, 		M:745, 		t:"1h 20m"}, 	// Level 11
  {w:2676, 		M:1134, 		t:"1h 31m"}, 	// Level 12
  {w:3371, 		M:1616, 		t:"1h 43m"}, 	// Level 13
  {w:4234, 		M:2214, 		t:"1h 56m"}, 	// Level 14
  {w:5304, 		M:2956, 		t:"2h 10m"}, 	// Level 15
  {w:6630, 		M:3875, 		t:"2h 26m"}, 	// Level 16
  {w:8275, 		M:5015, 		t:"2h 44m"}, 	// Level 17
  {w:10314, 	M:6429, 		t:"3h 3m"}, 	// Level 18
  {w:12843, 	M:8183, 		t:"3h 24m"}, 	// Level 19
  {w:15979, 	M:10357, 		t:"3h 48m"}, 	// Level 20
  {w:19868, 	M:13052, 		t:"4h 13m"}, 	// Level 21
  {w:24690, 	M:16395, 		t:"4h 42m"}, 	// Level 22
  {w:30669, 	M:20540, 		t:"5h 13m"}, 	// Level 23
  {w:38083, 	M:25680, 		t:"5h 47m"}, 	// Level 24
  {w:47277, 	M:32054, 		t:"6h 24m"}, 	// Level 25
  {w:58772, 	M:39957, 		t:"7h 6m"}, 	// Level 26
  {w:72812, 	M:49756, 		t:"7h 51m"},	// Level 27
  {w:90490, 	M:61909, 		t:"8h 41m"}], 	// Level 28
  
"workshop" : [
  //Wood		Marble			Time			Level
  {w:220, 		M:95, 			t:"42m"}, 		// Level 1
  {w:383, 		M:167, 			t:"54m"}, 		// Level 2
  {w:569, 		M:251, 			t:"1h 6m"}, 	// Level 3
  {w:781, 		M:349, 			t:"1h 19m"}, 	// Level 4
  {w:1023, 		M:461, 			t:"1h 33m"}, 	// Level 5
  {w:1299, 		M:592, 			t:"1h 48m"}, 	// Level 6
  {w:1613, 		M:744, 			t:"2h 3m"}, 	// Level 7
  {w:1972, 		M:920, 			t:"2h 19m"}, 	// Level 8
  {w:2380, 		M:1125, 		t:"2h 36m"}, 	// Level 9
  {w:2846, 		M:1362, 		t:"2h 54m"}, 	// Level 10
  {w:3377, 		M:1637, 		t:"3h 12m"}, 	// Level 11
  {w:3982, 		M:1956, 		t:"3h 32m"}, 	// Level 12
  {w:4672, 		M:2326, 		t:"3h 53m"}, 	// Level 13
  {w:5458, 		M:2755, 		t:"4h 14m"}, 	// Level 14
  {w:6355, 		M:3253, 		t:"4h 37m"}, 	// Level 15
  {w:7377, 		M:3831, 		t:"5h 57s"}, 	// Level 16
  {w:8542, 		M:4500, 		t:"5h 25m"}, 	// Level 17
  {w:9870, 		M:5279, 		t:"5h 52m"}, 	// Level 18
  {w:11385, 	M:6180,		t:"6h 19m"}, 	// Level 19
  {w:13111, 	M:7226, 		t:"6h 48m"}, 	// Level 20
  {w:15078, 	M:8439, 		t:"7h 18m"}, 	// Level 21
  {w:17714, 	M:9776, 		t:"7h 50m"}, 	// Level 22
  {w:19481, 	M:11477, 		t:"8h 24m"}, 	// Level 23
  {w:22796, 	M:13373, 		t:"8h 59m"}, 	// Level 24
  {w:26119, 	M:15570, 		t:"9h 36m"}, 	// Level 25
  {w:29909, 	M:18118, 		t:"10h 14m"}], 	// Level 26

"forester" : [
  //Wood		Marble		Time			Level
  {w:250, 					t:"18m"}, 		// Level 1
  {w:430, 		M:104, 		t:"30m"}, 		// Level 2
  {w:664, 		M:237, 		t:"43m 12s"}, 	// Level 3
  {w:968, 		M:410, 		t:"57m 43s"}, 	// Level 4
  {w:1364, 		M:635, 		t:"1h 13m"}, 	// Level 5
  {w:1878, 		M:928, 		t:"1h 31m"}, 	// Level 6
  {w:2546, 		M:1309, 		t:"1h 50m"}, 	// Level 7
  {w:3415, 		M:1803, 		t:"2h 11m"}, 	// Level 8
  {w:4544, 		M:2446, 		t:"2h 35m"}, 	// Level 9
  {w:6013, 		M:3282, 		t:"3h 57s"}, 	// Level 10
  {w:7922, 		M:4368, 		t:"3h 29m"}, 	// Level 11
  {w:10403, 	M:5781, 		t:"4h 22s"}, 	// Level 12
  {w:13629, 	M:7617, 		t:"4h 34m"}, 	// Level 13
  {w:17823, 	M:10004, 		t:"5h 12m"}, 	// Level 14
  {w:23274, 	M:13108, 		t:"5h 53m"}, 	// Level 15
  {w:30362, 	M:17142, 		t:"6h 39m"}, 	// Level 16
  {w:39575, 	M:22386, 		t:"7h 28m"}, 	// Level 17
  {w:51551, 	M:29204, 		t:"8h 24m"}, 	// Level 18
  {w:67123, 	M:38068, 		t:"9h 25m"}, 	// Level 19
  {w:87363, 	M:49589, 		t:"10h 31m"}, 	// Level 20
  {w:113680, 	M:64569, 		t:"11h 45m"}, 	// Level 21
  {w:160157, 	M:91013, 		t:"13h 6m"}], 	// Level 22
  
"stonemason" : [
  //Wood		Marble		Time			Level
  {w:274, 					t:"18m"}, 		// Level 1
  {w:467, 		M:116, 		t:"30m"}, 		// Level 2
  {w:718, 		M:255, 		t:"43m 12s"}, 	// Level 3
  {w:1045, 		M:436, 		t:"57m 43s"}, 	// Level 4
  {w:1469, 		M:671, 		t:"1h 13m"}, 	// Level 5
  {w:2021, 		M:977, 		t:"1h 31m"}, 	// Level 6
  {w:2738, 		M:1375, 		t:"1h 50m"}, 	// Level 7
  {w:3671, 		M:1892, 		t:"2h 11m"}, 	// Level 8
  {w:4883, 		M:2564, 		t:"2h 35m"}, 	// Level 9
  {w:6459, 		M:3437, 		t:"3h 57s"}, 	// Level 10
  {w:8508, 		M:4572, 		t:"3h 29m"}, 	// Level 11
  {w:11172, 	M:6049, 		t:"4h 22s"}, 	// Level 12
  {w:14634, 	M:7968, 		t:"4h 34m"}, 	// Level 13
  {w:19135, 	M:10462, 		t:"5h 12m"}, 	// Level 14
  {w:24987, 	M:13705, 		t:"5h 53m"}, 	// Level 15
  {w:32594, 	M:17921, 		t:"6h 39m"}, 	// Level 16
  {w:42483, 	M:23402, 		t:"7h 29m"}, 	// Level 17
  {w:55339, 	M:30527, 		t:"8h 24m"}, 	// Level 18
  {w:72050, 	M:39790, 		t:"9h 25m"}, 	// Level 19
  {w:93778, 	M:51830, 		t:"10h 28m"}, 	// Level 20
  {w:122021, 	M:67485, 		t:"11h 44m"},	// Level 21
  {w:158740, 	M:87833, 		t:"13h 6m"},	// Level 22
  {w:206471, 	M:114289, 		t:"14h 34m"},	// Level 23
  {w:268524, 	M:148680, 		t:"16h 12m"}],	// Level 24
  
"glassblowing" : [
  //Wood		Marble		Time			Level
  {w:274, 					t:"18m"}, 		// Level 1
  {w:467, 		M:116, 		t:"30m"}, 		// Level 2
  {w:718, 		M:255, 		t:"43m 12s"}, 	// Level 3
  {w:1045, 		M:436, 		t:"57m 43s"}, 	// Level 4
  {w:1469, 		M:671, 		t:"1h 13m"}, 	// Level 5
  {w:2021, 		M:977, 		t:"1h 31m"}, 	// Level 6
  {w:2738, 		M:1375, 		t:"1h 50m"}, 	// Level 7
  {w:3671, 		M:1892, 		t:"2h 11m"}, 	// Level 8
  {w:4883, 		M:2564, 		t:"2h 35m"}, 	// Level 9
  {w:6459, 		M:3437, 		t:"3h 57s"}, 	// Level 10
  {w:8508, 		M:4572, 		t:"3h 29m"}, 	// Level 11
  {w:11172, 	M:6049, 		t:"4h 22s"}, 	// Level 12
  {w:14634, 	M:7968, 		t:"4h 34m"}, 	// Level 13
  {w:19135, 	M:10462, 		t:"5h 12m"}, 	// Level 14
  {w:24987, 	M:13705, 		t:"5h 53m"}, 	// Level 15
  {w:32594, 	M:17921, 		t:"6h 39m"}, 	// Level 16
  {w:42483, 	M:23402, 		t:"7h 29m"}, 	// Level 17
  {w:55339, 	M:30527, 		t:"8h 24m"}, 	// Level 18
  {w:72050, 	M:39790, 		t:"9h 25m"}, 	// Level 19
  {w:93778, 	M:51830, 		t:"10h 28m"}, 	// Level 20
  {w:122021, 	M:67485, 		t:"11h 44m"},	// Level 21
  {w:158740, 	M:87833, 		t:"13h 6m"},	// Level 22
  {w:206471, 	M:114289, 		t:"14h 34m"},	// Level 23
  {w:268524, 	M:148680, 		t:"16h 12m"}],	// Level 24

"winegrower" : [
  //Wood		Marble		Time			Level
  {w:274, 					t:"18m"}, 		// Level 1
  {w:467, 		M:116, 		t:"30m"}, 		// Level 2
  {w:718, 		M:255, 		t:"43m 12s"}, 	// Level 3
  {w:1045, 		M:436, 		t:"57m 43s"}, 	// Level 4
  {w:1469, 		M:671, 		t:"1h 13m"}, 	// Level 5
  {w:2021, 		M:977, 		t:"1h 31m"}, 	// Level 6
  {w:2738, 		M:1375, 		t:"1h 50m"}, 	// Level 7
  {w:3671, 		M:1892, 		t:"2h 11m"}, 	// Level 8
  {w:4883, 		M:2564, 		t:"2h 35m"}, 	// Level 9
  {w:6459, 		M:3437, 		t:"3h 57s"}, 	// Level 10
  {w:8508, 		M:4572, 		t:"3h 29m"}, 	// Level 11
  {w:11172, 	M:6049, 		t:"4h 22s"}, 	// Level 12
  {w:14634, 	M:7968, 		t:"4h 34m"}, 	// Level 13
  {w:19135, 	M:10462, 		t:"5h 12m"}, 	// Level 14
  {w:24987, 	M:13705, 		t:"5h 53m"}, 	// Level 15
  {w:32594, 	M:17921, 		t:"6h 39m"}, 	// Level 16
  {w:42483, 	M:23402, 		t:"7h 29m"}, 	// Level 17
  {w:55339, 	M:30527, 		t:"8h 24m"}, 	// Level 18
  {w:72050, 	M:39790, 		t:"9h 25m"}, 	// Level 19
  {w:93778, 	M:51830, 		t:"10h 28m"}, 	// Level 20
  {w:122021, 	M:67485, 		t:"11h 44m"},	// Level 21
  {w:158740, 	M:87833, 		t:"13h 6m"},	// Level 22
  {w:206471, 	M:114289, 		t:"14h 34m"},	// Level 23
  {w:268524, 	M:148680, 		t:"16h 12m"}],	// Level 24
  
"alchemist" : [
  //Wood		Marble		Time			Level
  {w:274, 					t:"18m"}, 		// Level 1
  {w:467, 		M:116, 		t:"30m"}, 		// Level 2
  {w:718, 		M:255, 		t:"43m 12s"}, 	// Level 3
  {w:1045, 		M:436, 		t:"57m 43s"}, 	// Level 4
  {w:1469, 		M:671, 		t:"1h 13m"}, 	// Level 5
  {w:2021, 		M:977, 		t:"1h 31m"}, 	// Level 6
  {w:2738, 		M:1375, 		t:"1h 50m"}, 	// Level 7
  {w:3671, 		M:1892, 		t:"2h 11m"}, 	// Level 8
  {w:4883, 		M:2564, 		t:"2h 35m"}, 	// Level 9
  {w:6459, 		M:3437, 		t:"3h 57s"}, 	// Level 10
  {w:8508, 		M:4572, 		t:"3h 29m"}, 	// Level 11
  {w:11172, 	M:6049, 		t:"4h 22s"}, 	// Level 12
  {w:14634, 	M:7968, 		t:"4h 34m"}, 	// Level 13
  {w:19135, 	M:10462, 		t:"5h 12m"}, 	// Level 14
  {w:24987, 	M:13705, 		t:"5h 53m"}, 	// Level 15
  {w:32594, 	M:17921, 		t:"6h 39m"}, 	// Level 16
  {w:42483, 	M:23402, 		t:"7h 29m"}, 	// Level 17
  {w:55339, 	M:30527, 		t:"8h 24m"}, 	// Level 18
  {w:72050, 	M:39790, 		t:"9h 25m"}, 	// Level 19
  {w:93778, 	M:51830, 		t:"10h 28m"}, 	// Level 20
  {w:122022, 	M:67485, 		t:"11h 44m"}],	// Level 21

"carpentering" : [
  //Wood		Marble			Time			Level
  {w:63, 						t:"13m 12s"}, 	// Level 1
  {w:122, 						t:"16m 48s"}, 	// Level 2
  {w:192, 						t:"20m 37s"}, 	// Level 3
  {w:274, 						t:"24m 40s"}, 	// Level 4
  {w:372, 						t:"28m 57s"}, 	// Level 5
  {w:486, 						t:"33m 30s"}, 	// Level 6
  {w:620, 						t:"38m 19s"}, 	// Level 7
  {w:777, 		M:359, 			t:"43m 25s"}, 	// Level 8
  {w:962, 		M:444, 			t:"48m 50s"}, 	// Level 9
  {w:1178, 		M:546, 			t:"54m 34s"}, 	// Level 10
  {w:1432, 		M:669, 			t:"1h 39s"}, 	// Level 11
  {w:1730, 		M:816, 			t:"1h 7m"}, 	// Level 12
  {w:2078, 		M:993, 			t:"1h 13m"}, 	// Level 13
  {w:2486, 		M:1205, 		t:"1h 21m"}, 	// Level 14
  {w:2964, 		M:1459, 		t:"1h 28m"}, 	// Level 15
  {w:3524, 		M:1765, 		t:"1h 37m"}, 	// Level 16
  {w:4178, 		M:2131, 		t:"1h 45m"}, 	// Level 17
  {w:4944, 		M:2571, 		t:"1h 54m"}, 	// Level 18
  {w:5841, 		M:3097, 		t:"2h 4m"}, 	// Level 19
  {w:6890, 		M:3731, 		t:"2h 14m"}, 	// Level 20
  {w:8117, 		M:4490, 		t:"2h 25m"}, 	// Level 21
  {w:9550, 		M:5401, 		t:"2h 37m"}, 	// Level 22
  {w:11229, 	M:6496, 		t:"2h 49m"}, 	// Level 23
  {w:13190, 	M:7809, 		t:"3h 3m"}, 	// Level 24
  {w:15484, 	M:9383, 		t:"3h 16m"}, 	// Level 25
  {w:18167, 	M:11273, 		t:"3h 30m"}, 	// Level 26
  {w:21299, 	M:13543, 		t:"3h 46m"}, 	// Level 27
  {w:24946, 	M:16263, 		t:"4h 2m"}, 	// Level 28
  {w:29245, 	M:19531, 		t:"4h 16m"}, 	// Level 29
  {w:34247, 	M:23450, 		t:"4h 36m"}, 	// Level 30
  {w:40096, 	M:28153, 		t:"4h 56m"}, 	// Level 31
  {w:46930, 	M:33798, 		t:"5h 16m"}],	// Level 32

"architect" : [
  //Wood		Marble		Time			Level
  {w:185, 		M:106, 		t:"16m 12s"}, 	// Level 1
  {w:291, 		M:160, 		t:"19m 48s"}, 	// Level 2
  {w:413, 		M:222, 		t:"23m 37s"}, 	// Level 3
  {w:555, 		M:295, 		t:"27m 40s"}, 	// Level 4
  {w:720, 		M:379, 		t:"31m 57s"}, 	// Level 5
  {w:911, 		M:475, 		t:"36m 30s"}, 	// Level 6
  {w:1133, 		M:587, 		t:"41m 19s"}, 	// Level 7
  {w:1390, 		M:716, 		t:"46m 25s"}, 	// Level 8
  {w:1689, 		M:865, 		t:"51m 50s"}, 	// Level 9
  {w:2035, 		M:1036, 		t:"57m 34s"}, 	// Level 10
  {w:2437, 		M:1233, 		t:"1h 3m"}, 	// Level 11
  {w:2902, 		M:1460, 		t:"1h 10m"}, 	// Level 12
  {w:3443, 		M:1722, 		t:"1h 16m"}, 	// Level 13
  {w:4070, 		M:2023, 		t:"1h 24m"}, 	// Level 14
  {w:4797, 		M:2369, 		t:"1h 31m"}, 	// Level 15
  {w:5640, 		M:2767,		t:"1h 40m"}, 	// Level 16
  {w:6618, 		M:3226, 		t:"1h 45m"}, 	// Level 17
  {w:7754, 		M:3752, 		t:"1h 57m"}, 	// Level 18
  {w:9070, 		M:4358, 		t:"2h 7m"}, 	// Level 19
  {w:10598, 	M:5056, 		t:"2h 17m"}, 	// Level 20
  {w:12369, 	M:5857, 		t:"2h 28m"}, 	// Level 21
  {w:14424, 	M:6777, 		t:"2h 40m"}, 	// Level 22
  {w:16807, 	M:7836, 		t:"2h 52m"}, 	// Level 23
  {w:19573, 	M:9052, 		t:"3h 5m"}, 	// Level 24
  {w:22780, 	M:10448,	 	t:"3h 19m"}, 	// Level 25
  {w:26501, 	M:12055,	 	t:"3h 33m"}, 	// Level 26
  {w:30817, 	M:13899, 		t:"3h 49m"}, 	// Level 27
  {w:35825, 	M:16017, 		t:"4h 5m"}, 	// Level 28
  {w:41633, 	M:18450, 		t:"4h 22m"}, 	// Level 29
  {w:48371, 	M:21245, 		t:"4h 41m"}, 	// Level 30
  {w:56185, 	M:24454, 		t:"5h 49s"}, 	// Level 31
  {w:65251, 	M:28141, 		t:"5h 21m"}],	// Level 32

"optician" : [
  //Wood		Marble		Time			Level
  {w:119, 					t:"13m 48s"}, 	// Level 1
  {w:188, 		M:35, 		t:"17m 24s"}, 	// Level 2
  {w:269, 		M:96, 		t:"21m 13s"}, 	// Level 3
  {w:362, 		M:167, 		t:"25m 16s"}, 	// Level 4
  {w:471, 		M:249, 		t:"29m 33s"}, 	// Level 5
  {w:597, 		M:345, 		t:"34m 6s"}, 	// Level 6
  {w:742, 		M:455, 		t:"38m 55s"}, 	// Level 7
  {w:912, 		M:584, 		t:"44m 1s"}, 	// Level 8
  {w:1108, 		M:733, 		t:"49m 26s"}, 	// Level 9
  {w:1335, 		M:905, 		t:"55m 10s"}, 	// Level 10
  {w:1600, 		M:1106, 		t:"1h 1m"}, 	// Level 11
  {w:1906, 		M:1338, 		t:"1h 7m"}, 	// Level 12
  {w:2261, 		M:1608, 		t:"1h 14m"}, 	// Level 13
  {w:2673, 		M:1921, 		t:"1h 21m"}, 	// Level 14
  {w:3152, 		M:2283, 		t:"1h 29m"}, 	// Level 15
  {w:3706, 		M:2704, 		t:"1h 37m"},	// Level 16
  {w:4348, 		M:3191, 		t:"1h 46m"},	// Level 17
  {w:5096, 		M:3759, 		t:"1h 55m"},	// Level 18
  {w:5962, 		M:4416, 		t:"2h 5m"},		// Level 19
  {w:6966, 		M:5178, 		t:"2h 15m"},	// Level 20
  {w:8131, 		M:6062, 		t:"2h 26m"},	// Level 21
  {w:9482, 		M:7087, 		t:"2h 37m"},	// Level 22
  {w:11050, 	M:8276, 		t:"2h 50m"},	// Level 23
  {w:12868, 	M:9656, 		t:"3h 2m"},		// Level 24
  {w:14978, 	M:11257, 		t:"3h 16m"},	// Level 25
  {w:17424, 	M:13113, 		t:"3h 31m"},	// Level 26
  {w:20262, 	M:15267, 		t:"3h 46m"},	// Level 27
  {w:23553, 	M:17762, 		t:"4h 3m"},		// Level 28
  {w:27373, 	M:20662, 		t:"4h 20m"},	// Level 29
  {w:31804, 	M:24024, 		t:"4h 38m"},	// Level 30
  {w:36943, 	M:27922, 		t:"4h 58m"},	// Level 31
  {w:42904, 	M:32447, 		t:"5h 19m"}],	// Level 32

"vineyard" : [
  //Wood		Marble			Time			Level
  {w:339, 		M:123, 			t:"22m 48s"}, 	// Level 1
  {w:423, 		M:198, 			t:"26m 24s"}, 	// Level 2
  {w:520, 		M:285, 			t:"30m 13s"}, 	// Level 3
  {w:631, 		M:387, 			t:"34m 16s"}, 	// Level 4
  {w:758, 		M:504, 			t:"38m 33s"}, 	// Level 5
  {w:905, 		M:640, 			t:"43m 6s"}, 	// Level 6
  {w:1074, 		M:798, 			t:"47m 55s"}, 	// Level 7
  {w:1269, 		M:981, 			t:"53m 1s"}, 	// Level 8
  {w:1492, 		M:1194, 		t:"58m 26s"}, 	// Level 9
  {w:1749, 		M:1440, 		t:"1h 4m"}, 	// Level 10
  {w:2045, 		M:1726, 		t:"1h 10m"}, 	// Level 11
  {w:2384, 		M:2058, 		t:"1h 16m"}, 	// Level 12
  {w:2775, 		M:2443, 		t:"1h 23m"}, 	// Level 13
  {w:3225, 		M:2889, 		t:"1h 30m"}, 	// Level 14
  {w:3741, 		M:3407, 		t:"1h 38m"}, 	// Level 15
  {w:4336, 		M:4008, 		t:"1h 46m"}, 	// Level 16
  {w:5019, 		M:4705, 		t:"1h 55m"}, 	// Level 17
  {w:5813, 		M:5513, 		t:"2h 4m"}, 	// Level 18
  {w:6875, 		M:6450, 		t:"2h 14m"}, 	// Level 19
  {w:7941, 		M:7537, 		t:"2h 24m"}, 	// Level 20
  {w:8944, 		M:8800, 		t:"2h 35m"}, 	// Level 21
  {w:10319, 	M:10263, 		t:"2h 46m"}, 	// Level 22
  {w:11900, 	M:11961, 		t:"2h 59m"}, 	// Level 23
  {w:13718, 	M:13930, 		t:"3h 11m"}, 	// Level 24
  {w:15809, 	M:16214, 		t:"3h 25m"}, 	// Level 25
  {w:18215, 	M:18864, 		t:"3h 40m"}, 	// Level 26
  {w:20978, 	M:21938, 		t:"3h 55m"}, 	// Level 27
  {w:24159, 	M:25503, 		t:"4h 12m"}, 	// Level 28
  {w:27816, 	M:29639, 		t:"4h 29m"}, 	// Level 29
  {w:32021, 	M:34437, 		t:"4h 47m"}, 	// Level 30
  {w:36857, 	M:40002, 		t:"5h 7m"}, 	// Level 31
  {w:42419, 	M:46457, 		t:"5h 28m"}], 	// Level 32
  

"fireworker" : [
  //Wood		Marble		Time			Level
  {w:272, 		M:135, 		t:"16m 12s"}, 	// Level 1
  {w:353, 		M:212, 		t:"19m 48s"}, 	// Level 2
  {w:445, 		M:302, 		t:"23m 37s"}, 	// Level 3
  {w:551, 		M:405, 		t:"27m 40s"}, 	// Level 4
  {w:673, 		M:526, 		t:"31m 57s"}, 	// Level 5
  {w:813, 		M:665, 		t:"36m 30s"}, 	// Level 6
  {w:974, 		M:827, 		t:"41m 19s"}, 	// Level 7
  {w:1159, 		M:1015, 		t:"46m 25s"}, 	// Level 8
  {w:1373, 		M:1233, 		t:"51m 50s"}, 	// Level 9
  {w:1618, 		M:1486, 		t:"57m 34s"}, 	// Level 10
  {w:1899, 		M:1779, 		t:"1h 3m"}, 	// Level 11
  {w:2223, 		M:2120, 		t:"1h 10m"}, 	// Level 12
  {w:2596, 		M:2514, 		t:"1h 16m"}, 	// Level 13
  {w:3025, 		M:2972, 		t:"1h 24m"}, 	// Level 14
  {w:3517, 		M:3503, 		t:"1h 31m"}, 	// Level 15
  {w:4084, 		M:4119, 		t:"1h 40m"},	// Level 16
  {w:4737, 		M:4834, 		t:"1h 48m"},	// Level 17
  {w:5487, 		M:5663, 		t:"1h 57m"},	// Level 18
  {w:6347, 		M:6624, 		t:"2h 7m"},		// Level 19
  {w:7339, 		M:7739, 		t:"2h 17m"},	// Level 20
  {w:8480, 		M:9033, 		t:"2h 28m"},	// Level 21
  {w:9791, 		M:10534, 		t:"2h 40m"},	// Level 22
  {w:11298, 	M:12275, 		t:"2h 52m"},	// Level 23
  {w:13031, 	M:14295, 		t:"3h 5m"},		// Level 24
  {w:15025, 	M:16637, 		t:"3h 19m"},	// Level 25
  {w:17318, 	M:19355, 		t:"3h 33m"},	// Level 26
  {w:19955, 	M:22508, 		t:"3h 49m"},	// Level 27
  {w:22987, 	M:16164, 		t:"4h 5m"}],	// Level 28
};

var unit_cost = { 
// p: Citizen, w:wood, S:sulfur, b:Build, u:Upkeep, m:Minimal Level, o:Optimun Level, a:Attack, d:Defend, s:Stamina, c:class, v:Speed, x:Special
           "unit slinger" :	{i:301, y:"unit", p:1, w:40,       b:"17m 11s", u:3, m:1, o: 2,a:  7, d: 6, A3:  8, D3:  7, A2:  9, D2:  8, A1: 10, D1:  9, s: 7, c:"Human", v:70},
         "unit swordsman" :	{i:302, y:"unit", p:2, w:28, S:36, b:"13m 34s", u:5, m:3, o: 4,a: 18, d:11, A3: 20, D3: 12, A2: 23, D2: 13, A1: 27, D1: 15, s: 4, c:"Human", v:60, x:"Assault"},
           "unit phalanx" :	{i:303, y:"unit", p:3, w:46, S:52, b:"20m 51s", u:8, m:4, o: 6,a: 14, d:30, A3: 16, D3: 34, A2: 18, D2: 39, A1: 20, D1: 45, s: 8, c:"Human", v:50, x:"Resistance"},
            "unit archer" :	{i:313, y:"unit", p:3, w:55, S:76, b:"14m 10s", u:8, m:7, o:10,a: 26, d:23, A3: 29, D3: 24, A2: 34, D2: 25, A1: 41, D1: 26, s: 4, c:"Human", v:60, x:"Resistance"},
          "unit marksman" :	{i:304, y:"unit", p:4, w:73, S:122,b:"10m 31s", u:10,m:12,o:14,a: 42, d:21, A3: 47, D3: 23, A2: 55, D2: 66, A1: 66, D1: 27, s: 5, c:"Human", v:60, x:"Assault"},
        "unit gyrocopter" :	{i:312, y:"unit", p:4, w:91, S:164,b:"19m 57s", u:10,m:15,o:17,a: 35, d:30, A3: 39, D3: 33, A2: 44, D2: 37, A1: 50, D1: 42, s: 3, c:"Machina",v:80},
        "unit steamgiant" :	{i:308, y:"unit", p:12,w:54, S:235,b:"24m 57s", u:15,m:19,o:22,a: 67, d:50, A3: 75, D3: 58, A2: 85, D2: 68, A1: 97, D1: 80, s: 4, c:"Machina",v:50},
        "unit bombardier" :	{i:309, y:"unit", p:8, w:320,S:640,b:"45m",     u:30,m:22,o:24,a:184, d:54, A3:206, D3: 60, A2:234, D2: 68, A1:268, D1: 78, s: 3, c:"Machina",v:40,x:"Assault"},
               "unit ram" :	{i:307, y:"unit", p:8, w:98, S:112,b:"23m 3s" , u:30,m:6, o:8, a:6,   d:50, A3:  8, D3: 58, A2: 10, D2: 68, A1: 12, D1: 80, s: 5, c:"Machina",v:50,x:"Ram"},
          "unit catapult" :	{i:306, y:"unit", p:6, w:145,S:311,b:"34m 28s", u:30,m:11,o:13,a:34,  d:33, A3: 42, D3: 37, A2: 52, D2: 43, A1: 64, D1: 51, s: 5, c:"Machina",v:40,x:"Ram"},
            "unit mortar" :	{i:305, y:"unit", p:10,w:208,S:845,b:"34m",     u:60,m:24,o:24,a:142, d:92, A3:157, D3:102, A2:175, D2:114, A1:196, D1:128, s: 5, c:"Machina",v:30,x:"Ram"},
             "unit medic" :	{i:311, y:"unit", p:1, w:84, C:622,b:"38m 13s", u:30,m:16,o:28,a:8,   d:22, A3:  8, D3:  8, A2:  8, D2:  8, A1:  8, D1:  8, s:10, c:"Human", v:60, x:"Healer"},
              "unit cook" :	{i:301, y:"unit", p:1, w:108,W:345,b:"1h 52s",  u:30,m:9, o:9, a:12,  d:18, A3: 12, D3: 18, A2: 12, D2: 18, A1: 12, D1: 12, s:10, c:"Human", v:60, x:"Regeneration"},

          "unit ship_ram" :	{i:210, y:"ship", p:6, w:88, S:56, b:"28m 16s", u:13,m:1, o:3, a: 16, d: 13, A3: 18, D3: 14, A2: 21, D2: 15, A1: 24, D1: 17, s:5,  c:"Sailer",    v:40, x:"Assault"},
     "unit ship_ballista" :	{i:213, y:"ship", p:5, w:86, S:67, b:"34m 45s", u:14,m:3, o:5, a: 15, d: 17, A3: 16, D3: 20, A2: 18, D2: 23, A1: 20, D1: 27, s:6,  c:"Sailer",    v:30, x:"Resistance"},
  "unit ship_flamethrower" :{i:211, y:"ship", p:4, w:67, S:123,b:"32m 40s", u:20,m:6, o:8, a: 39, d: 17, A3: 44, D3: 19, A2: 50, D2: 22, A1: 57, D1: 26, s:5,  c:"Steamship", v:33, x:"Assault"},
     "unit ship_catapult" :	{i:214, y:"ship", p:5, w:122,S:135,b:"42m 30s", u:24,m:8, o:10,a: 26, d: 38, A3: 29, D3: 43, A2: 33, D2: 49, A1: 38, D1: 56, s:6,  c:"Sailer",    v:26, x:"Resistance"},
    "unit ship_steamboat" :	{i:216, y:"ship", p:7, w:90, S:256,b:"42m 18s", u:33,m:11,o:13,a: 84, d: 25, A3: 94, D3: 27, A2:107, D2: 31, A1:123, D1: 37, s:5,  c:"Steamship", v:38, x:"Assault"},
       "unit ship_mortar" :	{i:215, y:"ship", p:10,w:165,S:367,b:"1h 2m",   u:50,m:12,o:15,a: 54, d:108, A3: 60, D3:120, A2: 68, D2:136, A1: 78, D1:156, s:6,  c:"Steamship", v:24, x:"Resistance"},
    "unit ship_submarine" :	{i:212, y:"ship", p:6, w:255,C:457,b:"1h 23m",  u:50,m:16,o:16,a:142, d: 56, A3:160, D3: 62, A2:181, D2: 70, A1:205, D1: 80, s:3,  c:"Steamship", v:32},
};

var unitsAndShipsIndexes = {
           "unit slinger" :	0,
         "unit swordsman" :	1,
           "unit phalanx" :	2,
               "unit ram" :	3,
            "unit archer" :	4,
          "unit catapult" :	5,
          "unit marksman" :	6,
            "unit mortar" :	7,
        "unit steamgiant" :	8,
        "unit gyrocopter" :	9,
        "unit bombardier" :	10,
             "unit medic" :	11,
              "unit cook" :	12,

          "unit ship_ram" :	13,
     "unit ship_ballista" :	14,
 "unit ship_flamethrower" :	15,
     "unit ship_catapult" :	16,
       "unit ship_mortar" :	17,
    "unit ship_steamboat" :	18,
    "unit ship_submarine" :	19,
};
var unitsAndShipsIndexesR = [
                 // Units
           "unit slinger",
         "unit swordsman",
           "unit phalanx",
               "unit ram",
            "unit archer",
          "unit catapult",
          "unit marksman",
            "unit mortar",
        "unit steamgiant",
        "unit gyrocopter",
        "unit bombardier",
             "unit medic",
              "unit cook",

                 // Ships
          "unit ship_ram",
     "unit ship_ballista",
 "unit ship_flamethrower",
     "unit ship_catapult",
       "unit ship_mortar",
    "unit ship_steamboat",
    "unit ship_submarine",
];

var icons = {
 					 gold: base64img["icon_gold"],
    				 wood: base64img["icon_wood"],
    				 wine: base64img["icon_wine"],
  					glass: base64img["icon_glass"],
 				   marble: base64img["icon_marble"],
  				   sulfur: base64img["icon_sulfur"],
    				 time: base64img["icon_time"],
				 citizens: base64img["icon_citizen"],
 				   upkeep: base64img["icon_upkeep"],
   					 bulb: base64img["icon_bulb"],
				   attack: base64img["icon_atack"],
 				   defend: base64img["icon_defend"],	
  					speed: base64img["icon_speed"],		       
  					close: base64img["icon_close"],
  			       banned: base64img["player_banned"],
  	 		     vacation: base64img["player_vacation"],  
};
var title_icons = {
           "unit slinger" : base64img["unit_slinger"],
         "unit swordsman" : base64img["unit_swordsman"],
           "unit phalanx" : base64img["unit_phalanx"],
               "unit ram" : base64img["unit_ram"],
            "unit archer" : base64img["unit_archer"],
          "unit catapult" : base64img["unit_catapult"],
          "unit marksman" : base64img["unit_marksman"],
            "unit mortar" : base64img["unit_mortar"],
        "unit steamgiant" : base64img["unit_steamgiant"],
        "unit gyrocopter" : base64img["unit_gyrocopter"],
        "unit bombardier" : base64img["unit_bombardier"],
             "unit medic" : base64img["unit_medic"],
              "unit cook" : base64img["unit_cook"],

          "unit ship_ram" : base64img["ship_ram"],
     "unit ship_ballista" : base64img["ship_ballista"],
 "unit ship_flamethrower" : base64img["ship_flamethrower"],
     "unit ship_catapult" : base64img["ship_catapult"],
       "unit ship_mortar" : base64img["ship_mortar"],
    "unit ship_steamboat" : base64img["ship_steamboat"],
    "unit ship_submarine" : base64img["ship_submarine"],

               "townHall" : base64img["building_townhall"],
                   "port" : base64img["building_port"],
                "academy" : base64img["building_academy"],
               "shipyard" : base64img["building_shipyard"],
               "barracks" : base64img["building_barracks"],
              "warehouse" : base64img["building_warehouse"],
                   "wall" : base64img["building_wall"],
                 "tavern" : base64img["building_tavern"],
                 "museum" : base64img["building_museum"],
                 "palace" : base64img["building_palace"],
           "palaceColony" : base64img["building_palacecolony"],
                "embassy" : base64img["building_embassy"],
           "branchOffice" : base64img["building_branchOffice"],
          "workshop-army" : base64img["building_workshop"],
               "workshop" : base64img["building_workshop"],
              "safehouse" : base64img["building_safehouse"],
               "forester" : base64img["building_forester"],
             "stonemason" : base64img["building_stonemason"],
           "glassblowing" : base64img["building_glassblowing"],
             "winegrower" : base64img["building_winegrower"],
              "alchemist" : base64img["building_alchemist"],
           "carpentering" : base64img["building_carpentering"],
              "architect" : base64img["building_architect"],
               "optician" : base64img["building_optician"],
               "vineyard" : base64img["building_vineyard"],
             "fireworker" : base64img["building_fireworker"],

           "ActionPoints" : base64img["icon_actionpoints"],
             "Population" : base64img["icon_population"],
            "FreeWorkers" : base64img["icon_freeworker"],
            "Woodworkers" : base64img["icon_woodworker"],
         "Specialworkers" : base64img["icon_specialworker"],
             "scientists" : base64img["icon_scientists"],
              "Happiness" : base64img["icon_happiness"],
                 "Growth" : base64img["icon_growth"],
             "Incomegold" : base64img["icon_income"],
             "Corruption" : base64img["icon_corruption"],

             	   "wood" : base64img["icon_wood"],
             	   "wine" : base64img["icon_wine"],
                 "marble" : base64img["icon_marble"],
                "crystal" : base64img["icon_glass"],
             	 "sulfur" : base64img["icon_sulfur"],
};
var wonders_img  = {
				"wonder1" : base64img["wonder1"],
				"wonder2" : base64img["wonder2"],
				"wonder3" : base64img["wonder3"],
				"wonder4" : base64img["wonder4"],
				"wonder5" : base64img["wonder5"],
				"wonder6" : base64img["wonder6"],
				"wonder7" : base64img["wonder7"],
				"wonder8" : base64img["wonder8"],
};   