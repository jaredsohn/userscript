// ==UserScript==
// @name           Avalloc Extender
// @namespace      kelly14
// @description	   Avalloc Extender pour Firefox
// @version        1.0.12
// @author         kelly14

// @include        http://*avalloc.fr/*
// @exclude		   http://forum.avalloc.fr/*
// @exclude		   http://*avalloc.fr/register
// @exclude		   http://*avalloc.fr/server.php*
// ==/UserScript==

var Version = '1.0.12';

/*=================================================================================================================
 Topic du forum officiel : http://forum.avalloc.fr/index.php?/topic/1055-avalloc-extender/
 Site Web : http://www.roromix.net/2010/06/22/avalloc-extender/
 Forum : http://www.roromix.net/forum/
/*=================================================================================================================*/
// VARIABLES
// Chargement des URL de fichiers internes
var img_colos = 'http://www.roromix.net/img/avalloc_extender/ipt1.gif';
var img_dest = 'http://www.roromix.net/img/avalloc_extender/ipt2.gif';
var img_mis = 'http://www.roromix.net/img/avalloc_extender/ipt3.gif';
var img_prev = 'http://www.roromix.net/img/avalloc_extender/fg.png';
var img_next = 'http://www.roromix.net/img/avalloc_extender/fd.png';
var img_ovvo = 'http://www.roromix.net/img/avalloc_extender/ovvo2.png';
var img_copy = 'http://www.roromix.net/img/avalloc_extender/copy.png';
var css = 'http://www.roromix.net/img/avalloc_extender/style.css';

// Options
var opts_ae = { 'selectmonde': {'titre': 'Selection du monde automatique', 'activable': true, 'select': ['Monde 1,Monde \u03B2','Monde 1']},
				'loginauto': {'titre': 'Login automatique', 'activable': true, 'inputs': ['Login,Pass','text,password','60,60']},
				'heureserver': {'titre': 'Heure du serveur en temps reel', 'activable': true},
				'navcolo': {'titre': 'Navigation entre les colonies par fleche', 'activable': true},
				'convertisseur': {'titre': 'Convertisseur', 'activable': true},
				'resmanquantes': {'titre': 'Ressources manquantes', 'activable': true},
				'nbslots': {'titre': 'Nombre de slots du terrain', 'activable': true},
				'datefin': {'titre': 'Date de fin des compte a rebours', 'activable': true},
				'missionfav': {'titre': 'Mission favorite', 'activable': true, 'select': ['Baser,Transporter,Coloniser,Recycler,Espionner,Explorer,Attaquer,Simulateur','Transporter']},
				'destfav': {'titre': 'Destination favorite', 'activable': true, 'inputs': ['X,Y','text,text','30,30']}
};

// XML des unites
var units = "<div style='display:none'><units>"
+"<unit id='1'><name>Gouverneur</name>"
+"<rs1>90</rs1><rs2>200</rs2><rs3>30</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>0</blin><park>1</park><vite>10</vite>"
+"<aas>1</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>100</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>1</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='3'><name>Secouriste</name>"
+"<rs1>675</rs1><rs2>338</rs2><rs3>113</rs3><rs4>0</rs4>"
+"<vie>90</vie><blin>0</blin><park>1</park><vite>10</vite>"
+"<aas>1</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>100</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>1</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='4'><name>M\u00E9decin</name>"
+"<rs1>1125</rs1><rs2>450</rs2><rs3>169</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>0</blin><park>1</park><vite>10</vite>"
+"<aas>1</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>100</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>1</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='5'><name>Chirurgien</name>"
+"<rs1>1575</rs1><rs2>551</rs2><rs3>236</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>20</blin><park>2</park><vite>10</vite>"
+"<aas>1</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>100</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>1</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='6'><name>Jeep Willys</name>"
+"<rs1>18</rs1><rs2>121</rs2><rs3>26</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>50</blin><park>1</park><vite>80</vite>"
+"<aas>30</aas><aac>5</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>60</pas><pac>70</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>300</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>150</fre><tran>5</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='7'><name>VBL RECO 12.7</name>"
+"<rs1>51</rs1><rs2>302</rs2><rs3>151</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>70</blin><park>3</park><vite>90</vite>"
+"<aas>120</aas><aac>40</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>75</pas><pac>80</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>350</poas><poac>350</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>2</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='8'><name>Grand Transporteur</name>"
+"<rs1>56</rs1><rs2>473</rs2><rs3>209</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>70</blin><park>4</park><vite>120</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>6250</fre><tran>60</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='9'><name>MARK IV</name>"
+"<rs1>251</rs1><rs2>2334</rs2><rs3>751</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>360</blin><park>5</park><vite>27</vite>"
+"<aas>180</aas><aac>180</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>60</pas><pac>60</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1500</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>25</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='10'><name>A40D</name>"
+"<rs1>145</rs1><rs2>1882</rs2><rs3>435</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>80</blin><park>7</park><vite>55</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>15000</fre><tran>10</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='11'><name>VBL Milan</name>"
+"<rs1>15</rs1><rs2>422</rs2><rs3>169</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>70</blin><park>3</park><vite>95</vite>"
+"<aas>120</aas><aac>150</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>70</pas><pac>85</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>400</poas><poac>1800</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>2</fre><tran>2</tran><trs>non</trs>"
+"</unit>"
+"<unit id='12'><name>VBL Azur</name>"
+"<rs1>62</rs1><rs2>398</rs2><rs3>138</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>70</blin><park>3</park><vite>95</vite>"
+"<aas>200</aas><aac>40</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>90</pas><pac>90</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>450</poas><poac>450</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>2</fre><tran>2</tran><trs>non</trs>"
+"</unit>"
+"<unit id='13'><name>VAB</name>"
+"<rs1>131</rs1><rs2>848</rs2><rs3>294</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>120</blin><park>3</park><vite>90</vite>"
+"<aas>48</aas><aac>10</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>60</pas><pac>75</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>350</poas><poac>300</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>2</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='14'><name>Leclerc</name>"
+"<rs1>115</rs1><rs2>6899</rs2><rs3>3105</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>2520</blin><park>15</park><vite>72</vite>"
+"<aas>360</aas><aac>350</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>98</pas><pac>99</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>3550</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>40</fre><tran>4</tran><trs>non</trs>"
+"</unit>"
+"<unit id='15'><name>TPK 432 SB Long</name>"
+"<rs1>26</rs1><rs2>167</rs2><rs3>58</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>40</blin><park>4</park><vite>110</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>2500</fre><tran>35</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='16'><name>T-34</name>"
+"<rs1>264</rs1><rs2>3684</rs2><rs3>1579</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>1170</blin><park>6</park><vite>55</vite>"
+"<aas>300</aas><aac>140</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>70</pas><pac>80</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>2200</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>15</fre><tran>4</tran><trs>non</trs>"
+"</unit>"
+"<unit id='17'><name>2S25 Sprut</name>"
+"<rs1>121</rs1><rs2>1922</rs2><rs3>649</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>160</blin><park>6</park><vite>70</vite>"
+"<aas>160</aas><aac>230</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>80</pas><pac>80</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>3000</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>20</fre><tran>4</tran><trs>non</trs>"
+"</unit>"
+"<unit id='18'><name>AMX-30 B2</name>"
+"<rs1>169</rs1><rs2>5051</rs2><rs3>435</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>1140</blin><park>12</park><vite>45</vite>"
+"<aas>225</aas><aac>260</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>75</pas><pac>85</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>3500</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>25</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='19'><name>Leopard 2A6 EX</name>"
+"<rs1>114</rs1><rs2>6801</rs2><rs3>3061</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>1600</blin><park>13</park><vite>72</vite>"
+"<aas>310</aas><aac>310</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>90</pas><pac>90</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>3550</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>40</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='20'><name>M41 Walker Bulldog</name>"
+"<rs1>194</rs1><rs2>2712</rs2><rs3>1163</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>890</blin><park>5</park><vite>72</vite>"
+"<aas>280</aas><aac>120</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>65</pas><pac>75</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>2000</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>15</fre><tran>4</tran><trs>non</trs>"
+"</unit>"
+"<unit id='21'><name>CV-90</name>"
+"<rs1>329</rs1><rs2>3062</rs2><rs3>985</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>590</blin><park>5</park><vite>70</vite>"
+"<aas>160</aas><aac>240</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>92</pas><pac>92</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1800</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>26</fre><tran>4</tran><trs>non</trs>"
+"</unit>"
+"<unit id='22'><name>C.740</name>"
+"<rs1>116</rs1><rs2>1074</rs2><rs3>346</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>40</blin><park>5</park><vite>80</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>12000</fre><tran>10</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='23'><name>B40D</name>"
+"<rs1>35</rs1><rs2>2794</rs2><rs3>472</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>80</blin><park>9</park><vite>52</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>20000</fre><tran>10</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='24'><name>M163 VADS</name>"
+"<rs1>132</rs1><rs2>1970</rs2><rs3>394</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>100</blin><park>6</park><vite>60</vite>"
+"<aas>180</aas><aac>180</aac><aaa>180</aaa><aasm>0</aasm>"
+"<pas>85</pas><pac>85</pac><paa>85</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1200</poac><poaa>3000</poaa><poasm>0</poasm>"
+"<fre>20</fre><tran>4</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='25'><name>Ariane 1</name>"
+"<rs1>0</rs1><rs2>21600</rs2><rs3>14400</rs3><rs4>9600</rs4>"
+"<vie>100</vie><blin>0</blin><park>50</park><vite>22000</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"<unit id='26'><name>Corona KH-1</name>"
+"<rs1>0</rs1><rs2>4680</rs2><rs3>7020</rs3><rs4>4680</rs4>"
+"<vie>100</vie><blin>0</blin><park>15</park><vite>0</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='27'><name>Ballon Sonde</name>"
+"<rs1>0</rs1><rs2>90</rs2><rs3>90</rs3><rs4>0</rs4>"
+"<vie>1</vie><blin>0</blin><park>1</park><vite>0</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='28'><name>Radar M\u00E9t\u00E9orologique</name>"
+"<rs1>0</rs1><rs2>605</rs2><rs3>743</rs3><rs4>0</rs4>"
+"<vie>10</vie><blin>0</blin><park>5</park><vite>0</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='29'><name>H\u00E9lios II-A</name>"
+"<rs1>0</rs1><rs2>5022</rs2><rs3>7533</rs3><rs4>5022</rs4>"
+"<vie>100</vie><blin>0</blin><park>25</park><vite>0</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='30'><name>Ariane 5ECB</name>"
+"<rs1>0</rs1><rs2>62550</rs2><rs3>41700</rs3><rs4>55600</rs4>"
+"<vie>100</vie><blin>0</blin><park>75</park><vite>24000</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='31'><name>RQ-4 Global Hawk</name>"
+"<rs1>8</rs1><rs2>444</rs2><rs3>422</rs3><rs4>89</rs4>"
+"<vie>100</vie><blin>10</blin><park>4</park><vite>2000</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>450</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='32'><name>M\u00E9t\u00E9osat 7</name>"
+"<rs1>0</rs1><rs2>4500</rs2><rs3>6750</rs3><rs4>4500</rs4>"
+"<vie>100</vie><blin>0</blin><park>10</park><vite>0</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>0</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='33'><name>Lockheed Blackbird</name>"
+"<rs1>339</rs1><rs2>3390</rs2><rs3>2615</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>50</blin><park>1</park><vite>3529</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>3000</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"<unit id='34'><name>D. Rafale</name>"
+"<rs1>302</rs1><rs2>1608</rs2><rs3>603</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>250</blin><park>1</park><vite>2203</vite>"
+"<aas>40</aas><aac>250</aac><aaa>300</aaa><aasm>0</aasm>"
+"<pas>60</pas><pac>75</pac><paa>95</paa><pasm>0</pasm>"
+"<poas>400</poas><poac>2500</poac><poaa>1000</poaa><poasm>0</poasm>"
+"<fre>540</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"<unit id='35'><name>Thunderbolt II</name>"
+"<rs1>208</rs1><rs2>1109</rs2><rs3>416</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>240</blin><park>2</park><vite>676</vite>"
+"<aas>95</aas><aac>450</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>75</pas><pac>90</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>500</poas><poac>2800</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>480</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"<unit id='36'><name>MV-22</name>"
+"<rs1>503</rs1><rs2>2681</rs2><rs3>1508</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>800</blin><park>3</park><vite>560</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>8000</fre><tran>25</tran><trs>non</trs>"
+"</unit>"
+"<unit id='37'><name>SA-341 Gazelle</name>"
+"<rs1>44</rs1><rs2>351</rs2><rs3>351</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>50</blin><park>2</park><vite>310</vite>"
+"<aas>50</aas><aac>170</aac><aaa>100</aaa><aasm>0</aasm>"
+"<pas>75</pas><pac>85</pac><paa>50</paa><pasm>0</pasm>"
+"<poas>500</poas><poac>500</poac><poaa>2200</poaa><poasm>0</poasm>"
+"<fre>84</fre><tran>2</tran><trs>non</trs>"
+"</unit>"
+"<unit id='38'><name>Eurofigther Typhoon</name>"
+"<rs1>395</rs1><rs2>2050</rs2><rs3>946</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>300</blin><park>2</park><vite>2470</vite>"
+"<aas>0</aas><aac>200</aac><aaa>400</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>75</pac><paa>90</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>1500</poac><poaa>2500</poaa><poasm>0</poasm>"
+"<fre>460</fre><tran>2</tran><trs>non</trs>"
+"</unit>"
+"<unit id='39'><name>B-52H Stratofortress</name>"
+"<rs1>819</rs1><rs2>16362</rs2><rs3>4091</rs3><rs4>1091</rs4>"
+"<vie>100</vie><blin>1200</blin><park>8</park><vite>1046</vite>"
+"<aas>210</aas><aac>2100</aac><aaa>100</aaa><aasm>0</aasm>"
+"<pas>10</pas><pac>30</pac><paa>50</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1000</poac><poaa>2000</poaa><poasm>0</poasm>"
+"<fre>5000</fre><tran>25</tran><trs>non</trs>"
+"</unit>"
+"<unit id='40'><name>AH-64A Apache</name>"
+"<rs1>165</rs1><rs2>1814</rs2><rs3>743</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>200</blin><park>5</park><vite>365</vite>"
+"<aas>90</aas><aac>400</aac><aaa>120</aaa><aasm>0</aasm>"
+"<pas>80</pas><pac>90</pac><paa>65</paa><pasm>0</pasm>"
+"<poas>500</poas><poac>1000</poac><poaa>2500</poaa><poasm>0</poasm>"
+"<fre>75</fre><tran>3</tran><trs>non</trs>"
+"</unit>"
+"<unit id='41'><name>F35</name>"
+"<rs1>215</rs1><rs2>2147</rs2><rs3>1196</rs3><rs4>246</rs4>"
+"<vie>100</vie><blin>380</blin><park>3</park><vite>1930</vite>"
+"<aas>0</aas><aac>800</aac><aaa>400</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>75</pac><paa>80</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>3500</poac><poaa>3500</poaa><poasm>0</poasm>"
+"<fre>500</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"<unit id='42'><name>Lockheed U-2S</name>"
+"<rs1>82</rs1><rs2>433</rs2><rs3>163</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>20</blin><park>1</park><vite>821</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>330</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"<unit id='43'><name>Northrop B-2 Spirit</name>"
+"<rs1>128</rs1><rs2>6889</rs2><rs3>3062</rs3><rs4>1021</rs4>"
+"<vie>100</vie><blin>950</blin><park>7</park><vite>973</vite>"
+"<aas>200</aas><aac>2000</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>25</pas><pac>35</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1000</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>5900</fre><tran>25</tran><trs>non</trs>"
+"</unit>"
+"<unit id='44'><name>C-17 Globemaster III</name>"
+"<rs1>738</rs1><rs2>5901</rs2><rs3>3320</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>700</blin><park>5</park><vite>820</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>15000</fre><tran>60</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='45'><name>MI-24</name>"
+"<rs1>88</rs1><rs2>1245</rs2><rs3>1681</rs3><rs4>100</rs4>"
+"<vie>100</vie><blin>400</blin><park>6</park><vite>322</vite>"
+"<aas>140</aas><aac>600</aac><aaa>100</aaa><aasm>0</aasm>"
+"<pas>90</pas><pac>90</pac><paa>65</paa><pasm>0</pasm>"
+"<poas>500</poas><poac>1250</poac><poaa>3000</poaa><poasm>0</poasm>"
+"<fre>120</fre><tran>8</tran><trs>non</trs>"
+"</unit>"
+"<unit id='46'><name>Lockheed F-22A Raptor</name>"
+"<rs1>235</rs1><rs2>2615</rs2><rs3>1710</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>420</blin><park>2</park><vite>2400</vite>"
+"<aas>0</aas><aac>200</aac><aaa>450</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>75</pac><paa>95</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>2500</poac><poaa>2500</poaa><poasm>0</poasm>"
+"<fre>800</fre><tran>2</tran><trs>non</trs>"
+"</unit>"
+"<unit id='47'><name>747-400BCF</name>"
+"<rs1>1530</rs1><rs2>13387</rs2><rs3>4590</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>700</blin><park>10</park><vite>913</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>40000</fre><tran>110</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='48'><name>B1-B Lancer</name>"
+"<rs1>2473</rs1><rs2>24722</rs2><rs3>18012</rs3><rs4>1413</rs4>"
+"<vie>100</vie><blin>1100</blin><park>5</park><vite>1529</vite>"
+"<aas>300</aas><aac>3000</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>25</pas><pac>40</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>1000</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>5800</fre><tran>3</tran><trs>non</trs>"
+"</unit>"
+"<unit id='49'><name>RAH-66 Commanche</name>"
+"<rs1>15</rs1><rs2>467</rs2><rs3>729</rs3><rs4>59</rs4>"
+"<vie>100</vie><blin>150</blin><park>4</park><vite>324</vite>"
+"<aas>70</aas><aac>190</aac><aaa>240</aaa><aasm>0</aasm>"
+"<pas>90</pas><pac>90</pac><paa>90</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1500</poac><poaa>3500</poaa><poasm>0</poasm>"
+"<fre>75</fre><tran>8</tran><trs>non</trs>"
+"</unit>"
+"<unit id='50'><name>Sukhoi SU-47</name>"
+"<rs1>35</rs1><rs2>1872</rs2><rs3>1560</rs3><rs4>555</rs4>"
+"<vie>100</vie><blin>450</blin><park>3</park><vite>2500</vite>"
+"<aas>0</aas><aac>0</aac><aaa>600</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>97</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>4500</poaa><poasm>0</poasm>"
+"<fre>120</fre><tran>3</tran><trs>non</trs>"
+"</unit>"
+"<unit id='51'><name>Prototype X47</name>"
+"<rs1>9</rs1><rs2>449</rs2><rs3>424</rs3><rs4>166</rs4>"
+"<vie>100</vie><blin>60</blin><park>2</park><vite>1000</vite>"
+"<aas>100</aas><aac>200</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>85</pas><pac>90</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>3000</poas><poac>4500</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>48</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='52'><name>Camion Benne</name>"
+"<rs1>125</rs1><rs2>3000</rs2><rs3>375</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>0</blin><park>3</park><vite>90</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>30000</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='53'><name>Recycleur</name>"
+"<rs1>240</rs1><rs2>4800</rs2><rs3>720</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>50</blin><park>4</park><vite>110</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>60000</fre><tran>0</tran><trs>non</trs>"
+"</unit>"
+"<unit id='54'><name>A.310-MRTT</name>"
+"<rs1>510</rs1><rs2>2945</rs2><rs3>1634</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>500</blin><park>4</park><vite>950</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>12000</fre><tran>0</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='55'><name>Navette de Transport</name>"
+"<rs1>21</rs1><rs2>134</rs2><rs3>93</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>600</blin><park>1</park><vite>40</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>40000</fre><tran>25</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='56'><name>Classe Queen Elisabeth</name>"
+"<rs1>30198</rs1><rs2>857727</rs2><rs3>113241</rs3><rs4>3020</rs4>"
+"<vie>100</vie><blin>30000</blin><park>7</park><vite>44</vite>"
+"<aas>300</aas><aac>2000</aac><aaa>800</aaa><aasm>0</aasm>"
+"<pas>85</pas><pac>90</pac><paa>95</paa><pasm>0</pasm>"
+"<poas>5000</poas><poac>5000</poac><poaa>5000</poaa><poasm>0</poasm>"
+"<fre>83700</fre><tran>60</tran><trs>non</trs>"
+"</unit>"
+"<unit id='57'><name>Vraquier Panamax</name>"
+"<rs1>13495</rs1><rs2>161936</rs2><rs3>60726</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>2500</blin><park>7</park><vite>27</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>800000</fre><tran>40</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='58'><name>HMS Hermes</name>"
+"<rs1>26486</rs1><rs2>145672</rs2><rs3>19865</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>15000</blin><park>12</park><vite>52</vite>"
+"<aas>50</aas><aac>290</aac><aaa>350</aaa><aasm>0</aasm>"
+"<pas>70</pas><pac>70</pac><paa>90</paa><pasm>0</pasm>"
+"<poas>5000</poas><poac>5000</poac><poaa>5000</poaa><poasm>0</poasm>"
+"<fre>60000</fre><tran>60</tran><trs>non</trs>"
+"</unit>"
+"<unit id='59'><name>Transporteur lourd</name>"
+"<rs1>293</rs1><rs2>3798</rs2><rs3>2629</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>1110</blin><park>3</park><vite>30</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>80000</fre><tran>50</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='60'><name>USS Enterprise</name>"
+"<rs1>128746</rs1><rs2>1493451</rs2><rs3>11175</rs3><rs4>5960</rs4>"
+"<vie>100</vie><blin>45000</blin><park>20</park><vite>62</vite>"
+"<aas>200</aas><aac>500</aac><aaa>500</aaa><aasm>0</aasm>"
+"<pas>80</pas><pac>85</pac><paa>60</paa><pasm>0</pasm>"
+"<poas>5000</poas><poac>5000</poac><poaa>5000</poaa><poasm>0</poasm>"
+"<fre>90000</fre><tran>100</tran><trs>non</trs>"
+"</unit>"
+"<unit id='61'><name>Classe Victoria</name>"
+"<rs1>925</rs1><rs2>26813</rs2><rs3>6935</rs3><rs4>925</rs4>"
+"<vie>100</vie><blin>2000</blin><park>3</park><vite>31</vite>"
+"<aas>0</aas><aac>1100</aac><aaa>0</aaa><aasm>1350</aasm>"
+"<pas>0</pas><pac>75</pac><paa>0</paa><pasm>70</pasm>"
+"<poas>0</poas><poac>5000</poac><poaa>0</poaa><poasm>5000</poasm>"
+"<fre>83700</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='62'><name>Rubis</name>"
+"<rs1>22350</rs1><rs2>148998</rs2><rs3>22350</rs3><rs4>14900</rs4>"
+"<vie>100</vie><blin>750</blin><park>2</park><vite>45</vite>"
+"<aas>0</aas><aac>400</aac><aaa>0</aaa><aasm>1050</aasm>"
+"<pas>0</pas><pac>90</pac><paa>0</paa><pasm>85</pasm>"
+"<poas>0</poas><poac>5000</poac><poaa>0</poaa><poasm>5000</poasm>"
+"<fre>7000</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='63'><name>Dupuy de L\u00F4me</name>"
+"<rs1>333</rs1><rs2>3654</rs2><rs3>2989</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>3000</blin><park>4</park><vite>40</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>12600</fre><tran>5</tran><trs>non</trs>"
+"</unit>"
+"<unit id='64'><name>Vraquier Capesize</name>"
+"<rs1>13818</rs1><rs2>290160</rs2><rs3>103629</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>3500</blin><park>10</park><vite>27</vite>"
+"<aas>0</aas><aac>0</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>0</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>0</poas><poac>0</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>2000000</fre><tran>75</tran><trs>oui</trs>"
+"</unit>"
+"<unit id='65'><name>Classe Perth</name>"
+"<rs1>4178</rs1><rs2>45952</rs2><rs3>10026</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>4500</blin><park>6</park><vite>60</vite>"
+"<aas>0</aas><aac>1200</aac><aaa>400</aaa><aasm>100</aasm>"
+"<pas>0</pas><pac>65</pac><paa>60</paa><pasm>65</pasm>"
+"<poas>0</poas><poac>5000</poac><poaa>5000</poaa><poasm>5000</poasm>"
+"<fre>13500</fre><tran>10</tran><trs>non</trs>"
+"</unit>"
+"<unit id='66'><name>Classe Cornwall</name>"
+"<rs1>21178</rs1><rs2>172070</rs2><rs3>107213</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>9000</blin><park>2</park><vite>55</vite>"
+"<aas>110</aas><aac>800</aac><aaa>230</aaa><aasm>700</aasm>"
+"<pas>80</pas><pac>80</pac><paa>80</paa><pasm>80</pasm>"
+"<poas>5000</poas><poac>5000</poac><poaa>5000</poaa><poasm>5000</poasm>"
+"<fre>13500</fre><tran>2</tran><trs>non</trs>"
+"</unit>"
+"<unit id='67'><name>VBCI</name>"
+"<rs1>248</rs1><rs2>3465</rs2><rs3>1485</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>610</blin><park>5</park><vite>100</vite>"
+"<aas>210</aas><aac>180</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>0</pas><pac>80</pac><paa>80</paa><pasm>0</pasm>"
+"<poas>600</poas><poac>1600</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>20</fre><tran>3</tran><trs>non</trs>"
+"</unit>"
+"<unit id='68'><name>M60A3 TTS Patton</name>"
+"<rs1>313</rs1><rs2>7492</rs2><rs3>3746</rs3><rs4>0</rs4>"
+"<vie>100</vie><blin>2060</blin><park>12</park><vite>48</vite>"
+"<aas>330</aas><aac>340</aac><aaa>0</aaa><aasm>0</aasm>"
+"<pas>90</pas><pac>95</pac><paa>0</paa><pasm>0</pasm>"
+"<poas>300</poas><poac>2800</poac><poaa>0</poaa><poasm>0</poasm>"
+"<fre>40</fre><tran>1</tran><trs>non</trs>"
+"</unit>"
+"</units></div>";
var res = new Array(5);
var spe = new Array(2);
var heure = new Array(3);
var slots = new String;

// JQUERY
var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
		handlePages();
    }

	
// DEBUT DU SCRIPT
function handlePages()
{
    // URL courante
    var url = document.URL;
	
	// Test de l'url pour savoir dans quelle page on se trouve
	if (url.indexOf("avalloc", 0) > 0) {
		
		if($('#rss').is('div')) {
			// Actualisation des options de login
			if(TestCookie(true)) {
				var cook = GetCookie().split(',');
				localStorage.clear();
				GM_setValue('monde_inputs',cook[0]);
				GM_setValue('select',cook[1]);
				GM_setValue('login_inputs',cook[2]);
				GM_setValue('pass_inputs',cook[3]);
				GM_setValue('logauto_inputs',cook[4]);
				DelCookie();
			}
			
			// Selection automatique du monde
			var monde = GM_getValue('monde_inputs');
			if(GM_getValue('select')=='true' && monde!='') {
				$('#servs_combo').val(monde);
				$('#servs option:selected').removeAttr('selected');
				$('#servs option:contains('+monde+')').attr('selected', 'selected');
			}
			
			// Login et identification automatique
			var login = GM_getValue('login_inputs');
			var pass = GM_getValue('pass_inputs');
			if(login!='' && pass!='') {
				$('input[name="login"]').val(login);
				$('input[name="password"]').val(pass);
			}
			if(GM_getValue('logauto_inputs')=='true' && $('input[name="login"]').val()!='' && $('input[name="password"]').val()!='') {
				$('input[type="Image"]').click();
			}
		} else {
			// Ajout du CSS de l'add-on
			$('head').append('<link href="'+css+'" type="text/css" rel="stylesheet">');
			$('.ctbgnb').removeClass('ctbgnb')
						.addClass('ae_ctbgnb');

			// Navigation entre les colonies avec des fleches
			if(GM_getValue('navcolo')=='true') {
				$('.cthipt2 > *').css({'width': '175px'});
				$('.cthipt2 > :input').css({'background-image': 'url('+img_colos+')'});
				$('.cthipt2').before('<div id="ae_prev" style="float:left;cursor:pointer"><img src="'+img_prev+'" alt="" title="Colonie precedente"/></div>');
				$('.cthipt2').after('<div id="ae_next" style="float:left;cursor:pointer"><img src="'+img_next+'" alt="" title="Colonie suivante"/></div>');
				$('#ae_prev').bind('click', function(event) {event.stopPropagation(); nav_colo('prev');});
				$('#ae_next').bind('click', function(event) {event.stopPropagation(); nav_colo('next');});
			}
		}
	}
	if($('#rss').length<1) {
		// Page Missions
		if (url.indexOf("missions", 0) > 0) {
				
			// Renommage de "Attaquer (simulateur)" en "Simulateur"
			$('#missions_combo').bind('click',function(){
				$('li[id*="simulator"]').text('Simulateur');
			});
			
			// Affichage de la mission favorite
			if(url.indexOf("missions-", 0) < 0 && GM_getValue('missionfav') == 'true' && $('#missions').is('select')) {
				var mission = ((GM_getValue('missionfav_select')=='Simulateur')?GM_getValue('missionfav_select').toLowerCase():GM_getValue('missionfav_select'));
				mission = $('#missions > option:contains("'+mission+'")').val();
				$.ajax({
					url: mission,
					success: function(data) {
							if($(data).find('.ddfbgb').length==1)
								document.location.href=mission;
					}
				});
			}
			
			// Colonie de destination
			$('.ctmslgcx:eq(0), .ctmslgcx:eq(0) > *').css({'width': '95px'});
			$('.ctmslgb').css({'margin': '5px 10px 1px 5px'});
			$('.ctmslga1 > input, .ctmslga2 > input').css({width:43});
			$('.ctmslga1, .ctmslga2').css({width:50});
			$('.ctmslgcx:eq(0) > input').css({'background-image': 'url('+img_mis+')'});
			$('.ctmslgb').after('<div class="ctmslgcx"></div>');
			$('.cthipt2 > select').clone().appendTo('.ctmslgcx:eq(1)');
			$('.ctmslgcx:eq(1) > select').removeAttr('name')
										.attr('id', 'dest');
			$('#dest option:selected').removeAttr('selected');
			$('#dest option:first').attr('selected', 'selected');
			$('.ctmslgcx:eq(1)').append('<script type="text/javascript"> new Autocompleter.SelectBox(\'dest\'); </script>');
			$('.ctmslgcx:eq(1)').css({'width': '155px'});
			$('.ctmslgcx:eq(1) > *').css({'width': '150px'});
			$('.ctmslgcx:eq(1) > input').css({'background-image': 'url('+img_dest+')'});
			$('#dest_options').bind('click', function() {
				var crd = $('#dest_options li.selected').text();
				var fin = crd.indexOf(' -');
				crd = crd.substring(0,fin);
				crd = crd.split(':');
				$('input[name="crdx"]').val(crd[0]);
				$('input[name="crdy"]').val(crd[1]);
			});
			
			// Destination Favorite
			if(GM_getValue('destfav') == 'true') {
				var crdx = $('input[name="crdx"]');
				var crdy = $('input[name="crdy"]');
				var coo_x = GM_getValue('destfav_inputs_x');
				var coo_y = GM_getValue('destfav_inputs_y');
				if((coo_x != '' && coo_y != '') && (crdx.val() == '' && crdy.val() == '')) {
					crdx.val(coo_x);
					crdy.val(coo_y);
				}
			}
			
			// Suppression des zeros
			del_zero('.ctbms input,.ctmsgvw2 input');
			
			// Affichage des bulles info unites
			add_inf_units('.ctmruntlgc1m', 'ctmruntlgc1m');
			
		}
		// Nouveau Commerce
		else if (url.indexOf("contract", 0) > 0) {
			// Suppression des zeros
			del_zero('.ctdpr2xm input');
			
			// Affichage des bulles info unites
			add_inf_units('.ctdcmlgc', 'ctdcmlgc');
		}
		// Commerces recus, en cours, termines, proposes
		else if (url.indexOf("trade") > 0) {
			// Affichage des bulles info unites
			add_inf_units('.ctdpldtlg2b:has(img[src*="gif"]) ~ .ctdpldtlg2c:first', 'ctdpldtlg2c');
		}
		// Pre requis des unites
		else if (url.indexOf("require-units") > 0) {
			// Affichage des bulles info unites
			add_inf_units('.ctprqlgb', 'ctprqlgb');
		}
		else if (url.indexOf("radar") > 0) {
			// Affichage des bulles info unites
			add_inf_units('.ctmruntlgaxbx ~ .ctmruntlgcx1', 'ctmruntlgcx1');
		}
		else if (url.indexOf("bats") > 0 || url.indexOf("techs") > 0 || url.indexOf("defs") > 0) {
			// Affichage des ressources manquantes
			aff_res_manquantes();
			
			// Affichage des slots dans Batiments uniquement
			if (url.indexOf("bats") > 0) aff_slots();
		}
		// Unites
		else if (url.indexOf("units") > 0) {
			// Affichage des ressources manquantes
			aff_res_manquantes();
			
			// Affichage de Transport de ressources oui/non
			$('.cbm').append(units);
			$('.cchamp:has(img[src*="parking"]) ~ div:first').css({width:37}).after('<div class="cchamp" style="width:140px"><span id="fret">Transport de ressources</span></div><div id="trs" class="cvalue">'+$('name:contains('+$('.ctbdha').text().trim()+') ~ trs').text()+'</div>');
		}
		else if (url.indexOf("simulator") > 0) {
			// Suppression des zeros
			del_zero('.ctbms input,.ctbmsz input');
			
			// Affichage des bulles info unites
			add_inf_units('.ctmruntcty:first .ctmruntlgc1m', 'ctmruntlgc1m');
		}
		else if (url.indexOf("empire") > 0) {
			// Decouverte des options de Avalloc Extender
			if(GM_getValue('afficherlesoptions') == 'true') {
				document.location.href='settings#ae_opts';
			}
			$('.epctm1xm').append('<br/>Vous utilisez <strong>Avalloc Extender 1.0.12 (<a href="settings#ae_opts" id="lk_opts" class="bbc_url" title="Options">Options</a> | <a href="http://forum.avalloc.fr/index.php?/topic/1055-avalloc-extender/" class="bbc_url" title="Forum">Informations</a>)</strong><br/>');
		}
		
		// Page Rapports de combats
		else if (url.indexOf("messager-fights") > 0) {		
			// Copie des rapports de combats
			$('.ctmsgdel').append('<br/><textarea id="copy" style="width:0;height:0;opacity:0"></textarea>');
			$('.ctmsglgc2 > a').bind('click', function(){
				var id = $(this).parent().parent().find('img:first').attr('id').substr(4);
				$(this).parent().parent().find('.ctmsglgd:last').html('<a href="javascript:void(0);"><img id="copy'+id+'" src="'+img_copy+'" alt title="Copier" width="16" height="16" border="0"/></a>');
				$('img[id*="copy"]').unbind().bind('click', function() {
					generate_rc($(this));
					$('#copy').focus().select();
					document.execCommand('Copy');
					document.location.href='#imsg'+$(this).attr('id').substr(4);
				});
			});		
		}
		
		// Page Options
		else if (url.indexOf("settings#ae_opts") > 0) {
			// Affichage des options
			$('.ctc').insertBefore('#fx');
			$('.ctbm,#fx,#fx2,#fx3').remove();
			$('.ctc').next('script').remove();
			var ae_opts = '<div class="ctbm">'
							+'<div class="ctbmh" style="height:400px">'
							+'<h3 style="text-align:center;margin-top:5px">Avalloc Extender : Options</h3>'
							+'<div class="ctbmhbr"></div>';
							for( var opt in opts_ae ) {
								ae_opts += '<div class="ctbmhlg2">'
									+'<div class="ctbmha" style="margin-top:6px;width:250px;height:25px">'+opts_ae[opt].titre+'</div>'
									+'<div id="actif" class="ctbmhb" style="margin:6px 0px 0 5px;height:25px">'
										+'<div class="ctbmhb1"><a href="javascript:void(0);"><img id="cima" src="./skins/default/medias/sa1.gif" alt="" height="14" width="16" border="0"></a></div>'
										+'<div id="cida" class="ctbmhb2a "><a href="javascript:void(0);">actif</a></div>'
									+'</div>'
									+'<input id="'+opt+'" type="checkbox" value="checkbox" checked="true" style="display:none">'
									+'<div id="inactif" class="ctbmhb" style="margin:6px 5px 0 0px;height:25px">'
										+'<div class="ctbmhb1"><a href="javascript:void(0);"><img id="cimi" src="./skins/default/medias/sb2.gif" alt="" height="14" width="16" border="0"></a></div>'
										+'<div id="cidi" class="ctbmhb2b"><a href="javascript:void(0);">inactif</a></div>'
									+'</div>'
									+'<div class="ctbmhc" style="width:200px;"><b>';
									if(opts_ae[opt].select) {
										ae_opts += '<select id="'+opt+'_select">';
										var select = opts_ae[opt].select[0].split(',');
										for ( var i in select ) {
											ae_opts += '<option value="'+select[i]+'">'+select[i]+'</option>';
										}
										ae_opts += '</select>';
									}
									if(opts_ae[opt].inputs) {
										var inputs = opts_ae[opt].inputs[0].split(',');
										var type = opts_ae[opt].inputs[1].split(',');
										var wdth = opts_ae[opt].inputs[2].split(',');
										for ( var i in inputs ) {
											ae_opts += inputs[i]+' <input type="'+type[i]+'" id="'+opt+'_inputs_'+inputs[i].toLowerCase()+'" style="width:'+wdth[i]+'px"/> ';
										}
									}
									ae_opts += '</b></div>'
								+'</div>'
								+'<div class="ctbmhbr"></div>';
							}
							ae_opts += '<input id="clearlocal" type="button" value="Par defaut" style="margin-left:15px"/></div>'
						+'</div>';
			$('.ctbh2s').after(ae_opts);
			
			// Decouverte des options de Avalloc Extender
			if(GM_getValue('afficherlesoptions') == 'true') {
				$(document).ready(function() {
					alert("Merci d\'utiliser Avalloc Extender !\nVeuillez modifier et/ou valider les options de l\'add-on au moins une fois pour que ce message ne s\'affiche plus.\nBon jeu! kelly14\n\nINFO: Les Options sont accessibles depuis la page Empire.(Dans \"Actualites\")");
				});
			}
			
			$('#clearlocal').bind('click',function(){
				localStorage.clear();
				document.location.reload();
			});
			
			// Chargement des options en memoire
			for( var opt in opts_ae ) {
				if(opts_ae[opt].activable == true) {
					var activ = GM_getValue(opt);
					var checkbox = $('#'+opt);
					var ina = checkbox.siblings('#inactif');
					var act = checkbox.siblings('#actif');
					if(activ == 'true') {
						checkbox.attr('checked', true);
						ina.find('img').attr('src','./skins/default/medias/sb2.gif');
						ina.find('.ctbmhb2c').addClass('ctbmhb2b').removeClass('ctbmhb2c');
						act.find('img').attr('src','./skins/default/medias/sa1.gif');
						act.find('.ctbmhb2b').addClass('ctbmhb2a').removeClass('ctbmhb2b');
					} else {
						checkbox.attr('checked', false);
						act.find('img').attr('src','./skins/default/medias/sa2.gif');
						act.find('.ctbmhb2a').addClass('ctbmhb2b').removeClass('ctbmhb2a');
						ina.find('img').attr('src','./skins/default/medias/sb1.gif');
						ina.find('.ctbmhb2b').addClass('ctbmhb2c').removeClass('ctbmhb2b');
					}
				}
				if(opts_ae[opt].select) {
					var val = GM_getValue(opt+'_select');
					$('#'+opt+'_select > option:contains("'+val+'")').attr('selected','selected');
				}
				if(opts_ae[opt].inputs) {
					var inputs = opts_ae[opt].inputs[0].split(',');
					for ( var i in inputs ) {
						$('#'+opt+'_inputs_'+inputs[i].toLowerCase()).val(GM_getValue(opt+'_inputs_'+inputs[i].toLowerCase()));
					}
				}
			}
			
			// Activation/Desactivation des options
			$('#actif,#inactif').bind('click',function(){
				var checkbox = $(this).siblings('input');
				if($(this).attr('id') == 'actif') {
					if(checkbox.not(':checked')) {
						checkbox.attr('checked', true);
						var oth = $(this).siblings('#inactif');
						oth.find('img').attr('src','./skins/default/medias/sb2.gif');
						oth.find('.ctbmhb2c').addClass('ctbmhb2b').removeClass('ctbmhb2c');
						$(this).find('img').attr('src','./skins/default/medias/sa1.gif');
						$(this).find('.ctbmhb2b').addClass('ctbmhb2a').removeClass('ctbmhb2b');
					}
				} else {
					if(checkbox.is(':checked')) {
						checkbox.attr('checked', false);
						var oth = $(this).siblings('#actif');
						oth.find('img').attr('src','./skins/default/medias/sa2.gif');
						oth.find('.ctbmhb2a').addClass('ctbmhb2b').removeClass('ctbmhb2a');
						$(this).find('img').attr('src','./skins/default/medias/sb1.gif');
						$(this).find('.ctbmhb2b').addClass('ctbmhb2c').removeClass('ctbmhb2b');
					}
				}
			});
			
			// Sauvegarde des options
			$('.ctbmbt2 > input').bind('click',function(){
				localStorage.clear();
				for( var opt in opts_ae ) {
					if(opts_ae[opt].activable == true) {
						var activ = $('#'+opt).is(':checked');
						if(opts_ae[opt].globale)
							GM_setValue(opt,activ);
						else
							GM_setValue(opt,activ);
					}
					if(opts_ae[opt].select) {
						var select = $('#'+opt+'_select > option:selected').val();
						if(opts_ae[opt].globale)
							GM_setValue(opt+'_select',select);
						else
							GM_setValue(opt+'_select',select);
					}
					if(opts_ae[opt].inputs) {
						var inputs = opts_ae[opt].inputs[0].split(',');
						for ( var i in inputs ) {
							var val = $('#'+opt+'_inputs_'+inputs[i].toLowerCase()).val();
							if(opts_ae[opt].globale)
								GM_setValue(opt+'_inputs_'+inputs[i].toLowerCase(),val);
							else
								GM_setValue(opt+'_inputs_'+inputs[i].toLowerCase(),val);
						}
					}
				}
				GM_setValue('afficherlesoptions',false);
				SetCookie('set',30);
				alert('Sauvegarde reussi!');
				document.location.reload();
			});
		}
		if(url.indexOf("map", 0) <= 0) add_converter();
		aff_fin_chronos();
		aff_heure_serveur();
		del_zero('#dnbre,#cnbre');
	}
}

// Generation des Rapports de combats
function generate_rc(rc) {
	rc = rc.parent().parent().parent().nextAll('.ctmsgvwx:first');
	var titre = "[center]Rapport de combat ["+rc.find('.rapport_strong:eq(2)').text()+"] du "+rc.find('.ctmsgvwtrc').text()+"[/center]\n\n";
	var attaquant_name = rc.find('.rapport_bfight2a1_body:eq(0)').text();
	var defenseur_name = rc.find('.rapport_bfight2a1_body:eq(1)').text();
	var joueurs = "";
	rc.find('.rapport_bfight2a_body').each(function(i) {
		joueurs += ((i==0)?"Attaquant : [size=3]"+attaquant_name:"D\u00E9fenseur : [size=3]"+defenseur_name)+"[/size][list][*]"+$(this).find('.rapport_bfight2a2_body > p:eq(0)').text()+"[*]Sp\u00E9cialit\u00E9s : "+$(this).find('.rapport_bfight2a2_body > ul > li:eq(0)').text()+" - "+$(this).find('.rapport_bfight2a2_body > ul > li:eq(1)').text()+"[*]Technologies :[list]";
		$(this).find('.rapport_bfight2a3_body > ul > li').each(function() {
			joueurs += "[*]"+$(this).text();
		});
		joueurs += "[/list][/list]\n";
	});
	joueurs += "\n";
	var rounds = "";
	rc.find('.rapport_entete:not(:first,:last)').each(function(){
		rounds += "[center]"+$(this).find('div:first').text()+"[/center]";
		$(this).find('tbody').each(function(i) {
			rounds += "[b]"+((i==0)?attaquant_name:defenseur_name)+"[/b][list]"
			$(this).find('tr').each(function() {
				function a_td(i,th) {
					return th.find('td:eq('+i+')').text();
				}
				rounds += "[*]"+a_td(0,$(this))+(($(this).find('td').length>1)?" - "+a_td(1,$(this))+" - "+a_td(2,$(this))+" - "+a_td(3,$(this))+" - "+((a_td(4,$(this))!="-")?a_td(4,$(this)):"Aucun mouvement")+" - "+a_td(5,$(this)):"");
			});
			var units = $(this).parent().parent().next();
			rounds += "[/list][right]"+units.find('li:eq(0)').text()+" - "+units.find('li:eq(1)').text()+"[/right]";
		});
	});
	var issue = "\n\n[center]Issue du combat[/center]";
	rc.find('.rapport_bfight5a_body').each(function(i) {
		issue += "[b]"+((i==0)?attaquant_name:defenseur_name)+"[/b] a perdu "+$(this).next().find('span:eq(0)').text()+" unit\u00E9(s) ("+$(this).next().find('span:eq(1)').text()+" points)\n";
	});
	issue += "[center]"+rc.find('.rapport_bfight6_body').text().trim()+"[/center]";
	rc.find('.rapport_bfight7a1_body').each(function() {
		issue += $(this).text()+" :[list]";
		$(this).next().find('li').each(function() {
			issue += "[*]"+$(this).text();
		});
		issue += "[/list]";
	});
	$('#copy').text(titre+joueurs+rounds+issue);
}

// Activation des bulles d Infos des unites
function add_inf_units(selector,classe) {
$('.cbm').append(units);
var caract = '<div class="ctbdmdsc">'
+'<div class="ctbdmdscv">'
	+'<div class="cchamp"><span id="vitalite">Vitalit&eacute;</span></div><div id="vie" class="cvalue"></div>'
	+'<div class="cchamp"><span id="attaque">Attaque</div><div id="arm" class="cvalue2"></div>'

	+'<div class="cchamp"><span id="blindage">Blindage</span></div><div id="blin" class="cvalue"></div>'
	+'<div class="cchamp"><span id="precision">Pr&eacute;cision</span></div><div id="pre" class="cvalue2"></div>'

	+'<div class="cchamp"><span id="furtivite">Furtivit&eacute;</span></div><div id="fur" class="cvalue">?</div>'
	+'<div class="cchamp"><span id="portee">Port&eacute;e</span></div><div id="por" class="cvalue2"></div>'

	+'<div class="cchampl">&nbsp;</div>'

	+'<div class="cchamp"><span id="vitesse">Vitesse</span></div><div id="vite" class="cvalue"></div>'
	+'<div class="cchamp"><span id="transport">Transport</span></div><div id="tran" class="cvalue"></div>'
	+'<div class="cchamp"><span id="fret">Fr&ecirc;t</span></div><div id="fre" class="cvalue"></div>'

	+'<div class="cchamp"><img src="./skins/default/medias/parking.gif" alt="" height="11" width="43" border="0"></div><div id="park" class="cvalue"></div>'
	+'<div class="cchamp" style="width:140px"><span id="fret">Transport de ressources</span></div><div id="trs" class="cvalue"></div>'
	+'<div class="cchamp"></div>'
+'</div>'
+'</div>'
+'<div class="ctbdmdsd">'
+'<div class="ctmdbim"><img src="./skins/default/medias/wcs.gif" alt="" height="20" width="18" border="0"></div>'
+'<div class="ctmdbri"><img src="./skins/default/medias/rs1.png" alt="" title="Pierre"  height="17" width="24" border="0"></div><div id="rs1" class="ctmdbrv"></div>'
+'<div class="ctmdbri"><img src="./skins/default/medias/rs2.png" alt="" title="M&eacute;tal" height="17" width="24" border="0"></div><div id="rs2" class="ctmdbrv"></div>'
+'<div class="ctmdbri"><img src="./skins/default/medias/rs3.png" alt="" title="P&eacute;trole" height="17" width="24" border="0"></div><div id="rs3" class="ctmdbrv"></div>'
+'<div class="ctmdbri"><img src="./skins/default/medias/rs4.png" alt="" title="P&eacute;trole" height="17" width="24" border="0"></div><div id="rs4" class="ctmdbrv"></div>'
+'</div>';
$('.cbm').append("<script type='text/javascript'>var vUnit = \"<div class='ovvo'><div class='ovvoa'><div class='ovvoa1' id='ovvoa1cc'></div><div class='epcth1d' id='epcth1dcc'></div></div><div class='ovvops'></div><div class='ovvob'><div class='ovvob1' id='ovvob1cc'></div></div></div>\";</script>");
$(selector).each(function() {
	if(classe=='rc' && $(this).not('.tds6x')) {
		$(this).after('<td onmouseover="javascript:aBulle(vUnit,\'ovvo\');return false;" onmouseout="javascript:zBulle(); return false;" onclick="javascript:zBulle(); return false;">'+$(this).text()+'</td>');
		$(this).remove();
	} else {	
		$(this).after('<div class="'+classe+'" onmouseover="javascript:aBulle(vUnit,\'ovvo\');return false;" onmouseout="javascript:zBulle(); return false;" onclick="javascript:zBulle(); return false;">'+$(this).text()+'</div>');
		$(this).remove();
	}
});
$(selector).bind('mouseover',function(){
	$('head').append("<style>.ovvo2{position:absolute;margin:0;color:#abafb8;z-index:14;width:315px;height:135px;font-family:Arial;background-image:url("+img_ovvo+")!important;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+img_ovvo+"',sizingMethod='crop');background-image:url('')}</style>");
	$('#ovvoa1cc').text($(this).text());
	$('#overdiv').removeClass('ovvo')
				 .addClass('ovvo2');
	$('#overdiv > .ovvo').addClass('ovvo2')
						 .removeClass('ovvo');
	$('.ovvops').css({width:305});
	$('#ovvob1cc').append(caract);
	var unit = $('name:contains('+$(this).text().trim()+')').parent().children();
	unit.each(function() {
		var tag = $(this).attr('nodeName').toLowerCase();
		var val = $(this).text();
		switch(tag) {
			case 'rs4':
			case 'rs3':
			case 'rs2':
			case 'rs1':
				var them = $('#'+tag);
				if(val == 0) {
					them.prev().remove();
					them.remove();
				} else {
					them.text(val);
				}
				break;
			case 'aasm':
				if(val == 0 && $('#arm').text() == '') $('#arm').text('Aucune');
			case 'aac':
			case 'aaa':
			case 'aas':
				if(val != 0)
					$('#arm').append(tag.toUpperCase().substr(1)+': '+val+' ');
				break;
			case 'pasm':
				if(val == 0 && $('#pre').text() == '') $('#pre').text('Aucune');
			case 'pac':
			case 'paa':
			case 'pas':
				if(val != 0)
					$('#pre').append(tag.toUpperCase().substr(1)+': '+val+'% ');
				break;
			case 'poasm':
				if(val == 0 && $('#por').text() == '') $('#por').text('Aucune');
			case 'poac':
			case 'poaa':
			case 'poas':
				if(val != 0)
					$('#por').append(tag.toUpperCase().substr(2)+': '+(val/1000).toFixed(1)+'km'+' ');
				break;
			default: $('#'+tag).text(val);
		}
	});
});
}

// Affichage des ressources manquantes
function aff_res_manquantes() {
	if(GM_getValue('resmanquantes')=='true') {
		// Initialisation des ressources
		getRessources();
		
		$('.ctmdbrv2').each(function() {
			var rsd = $(this).text().replace(/[^0-9]/g, '');
			var index = $(this).prev().find('img').attr('src').substr(-5,1)-1;
			var mqt = rsd-res[index];
			$(this).attr('title', 'Manquant: '+mqt);
		});
	}
}

// Automatisation de la suppression des zeros genants
function del_zero(selector) {
	$(selector).bind('focus',function(){ if($(this).val()==0) $(this).val('');})
					  .bind('keyup',function(){ if($(this).val()==0) $(this).val('');})
					  .bind('blur',function(){ if($(this).val()=='') $(this).val('0');});
}

// CONVERTISSEUR - Creation du convertisseur et ajout du lien dans le menu
function add_converter() {
	if(GM_getValue('convertisseur')=='true') {
		var converter = '<div id="converter" class="ddfbgb" style="display:none">'
						+'<div class="ctmslga">Convertisseur :</div>'
						+'<div class="ctmslgcx">'
						+'<select id="convert1" class="combo" style="background-image: url('+img_mis+'); display: none;">'
						+'<option value="rs1" selected="">Pierre</option><option value="rs2">Metal</option><option value="rs3">Petrole</option><option value="rs4">Uranium</option><option value="rs5">Debris</option>'
						+'</select>'
						+'</div>'
						+'<div class="c_rsnc"><input type="text" id="res1" size="24"><img src="'+img_next+'" alt="" title=""></div>'
						+'<div class="ctmslgcx">'
						+'<select id="convert2" class="combo" style="background-image: url('+img_mis+'); display: none;">'
						+'<option value="rs1">Pierre</option><option value="rs2" selected="">Metal</option><option value="rs3">Petrole</option><option value="rs4">Uranium</option><option value="rs5">Debris</option>'
						+'</select>'
						+'</div>'
						+'<div class="c_rsnc"><input type="text" id="res2" size="24"></div>'
						+'</div>';
						
		if($('.ovtxt > .cth').length == 0) {
			$('.ovtxt').prepend(converter);
			$('#converter').attr('style','display:none; margin:0px 0px 5px 3px');
		} else { $('.ovtxt > .cth').after(converter); }
		$('a[href="./techs"]').after('<a href="javascript:void(0);" id="lk_converter">Convertisseur</a>')
							.parent().parent().attr('class','mn3b')
							.parent().attr('class','mn3');
		$('#lk_converter').bind('click', function() {
			$('#converter').slideToggle(150);
		});
		$('#converter > .ctmslgcx:eq(0)').append('<script type="text/javascript"> new Autocompleter.SelectBox(\'convert1\'); </script>');
		$('#converter > .ctmslgcx:eq(1)').append('<script type="text/javascript"> new Autocompleter.SelectBox(\'convert2\'); </script>');
		$('#converter > .ctmslgcx, #converter > .ctmslgcx > input').css({'width': '95px'});
		$('#converter > .ctmslgcx > input').css({'background-image': 'url('+img_mis+')'});
		$('#res1,#res2').bind('keyup',function(){convert()});
		$('#convert1_options,#convert2_options').bind('click',function(){convert()});
	}
}

// CONVERTISSEUR - Convertion
function convert() {
	var value = $('#res1').val().substr(0,10).replace(/\D/g,'');
	var pierre = 0;
	var result = 0;
	switch($('#convert1').val()) {
		case 'rs1': pierre = value*1; break;
		case 'rs2': pierre = value*(4/3); break;
		case 'rs3': pierre = value*2; break;
		case 'rs4': pierre = value*4; break;
		case 'rs5': pierre = value*(1/2);
	}
	switch($('#convert2').val()) {
		case 'rs1': result = pierre*1; break;
		case 'rs2': result = pierre*(3/4); break;
		case 'rs3': result = pierre/2; break;
		case 'rs4': result = pierre/4; break;
		case 'rs5': result = pierre*2;
	}
	$('#res1').val(value);
	$('#res2').val(result);
}

// Affichage de la date de fin des chronos
function aff_fin_chronos() {
	if(GM_getValue('datefin')=='true') {
		$('.chrono').each(function(i) {
			var time = $('.chrono:eq('+i+')').next('script:first').text();
			var debut = time.indexOf('(')+1;
			var fin = time.indexOf(',');
			time = time.substring(debut, fin)*1000;
			var date = new Date();
			var auj_j = date.getDate();
			var auj_m = date.getMonth()+1;
			var auj_a = 1900+date.getYear();
			var ms = date.getTime()+time;
			date.setTime(ms);
			var j = date.getDate();
			var m = date.getMonth()+1;
			var a = 1900+date.getYear();
			var h = date.getHours();
			var min = date.getMinutes();
			var s = date.getSeconds();
			var fin = ((auj_j==j && auj_m==m && auj_a==a)?'aujourd\'hui':((j<10)?'0'+j:j)+'/'+((m<10)?'0'+m:m)+'/'+a)+' a '+((h<10)?'0'+h:h)+'h '+((min<10)?'0'+min:min)+'m '+((s<10)?'0'+s:s)+'s';
			$('.chrono:eq('+i+')').attr('title', fin);
		});
	}
}

// Deplacement dans les colonies
function nav_colo(sens) {
	var length = $('#czone option').length-1;
	var index = $('#czone option').index($('option:selected'));
	if(sens=='prev') {
		if(index == 0) {index = length;} else {index = index-1;}
	}else {
		if(index == length) {index = 0;} else {index = index+1;}
	}
	$('#czone option:selected').removeAttr('selected');
	$('#czone option:eq('+index+')').attr('selected', 'selected');
	$('#fzone').submit();
}

// Obtention des ressources disponibles
function getRessources() {
	$('.rsnb').each(function(i){
		var val = $(this).text().replace(/[^0-9]/g, '');
		switch(i) {
			case 0: res[0] = val; break;
			case 1: res[1] = val; break;
			case 2: res[2] = val; break;
			case 3: res[3] = val; break;
			case 5: val = $(this).text(); res[5] = val.substring(0,val.indexOf('/')).replace(/[^0-9]/g, '');
		}
	});
}

// Obtention des specialites
function getSpecialites() {
	$.ajax({
		url: './options',
		success: function(data) {
			$(data).find('.ctbma3').find('div').each(function(i) {
				var val = $(this).text();
				switch(i) {
					case 1: spe[0] = val; break;
					case 2: spe[1] = val;
				}
			});
		}
	});
}

// Actualisation de l heure du serveur
function showTime() {
	heure[2] = ((heure[2]==59)?0:heure[2]+1);
	heure[1] = ((heure[2]==0)?((heure[1]==59)?0:heure[1]+1):heure[1]);
	heure[0] = ((heure[2]==0 && heure[1]==0)?((heure[0]==23)?0:heure[0]+1):heure[0]);
	var hour = ((heure[0]<10)?"0":"") + heure[0];
	var minute = ((heure[1]<10)?"0":"") + heure[1];
	var second = ((heure[2]<10)?"0":"") + heure[2];
	var heureserveur = hour +"h "+minute+"m "+second+"s";
	$('#heureserveur').html(heureserveur);
	setTimeout("showTime();",1000);
}
			
// Affichage de l heure du serveur
function aff_heure_serveur() {
	if(GM_getValue('heureserver')=='true') {
		$.ajax({
			url: './empire',
			success: function(data) {
					var val = $(data).find('.epctm1xhb').text().substr(-5,5);
					heure = Array(parseInt(val.substr(0,2)), parseInt(val.substr(-2,2)), 0);
			}
		});
		$('#overdiv').ajaxStop(function() {
			if(heure) {
				$('#overdiv').after('<div style="width:100px;margin:auto;margin-top:140px"><span id="heureserveur" title="Heure du serveur" style="width:100px;display:block;margin-left:200px;color:#a0a0a0;font-family:Arial;font-size:13px"></span></div>');
				showTime();
			}
		});
	}
}

// Affichage des slots
function aff_slots() {
	if(GM_getValue('nbslots')=='true') {
		$.ajax({
			url: './empire',
			success: function(data) {
					slots = $(data).find('.epcth1d').text();
			}
		});
		$('.ctm').ajaxStop(function() {
			if(slots) {
				$('.ctm').after('<div style="position:absolute;top:200px;right:20px;width:85px;color:#00bb0d">'+slots+'</div>');
			}
		});
	}
}

// FONCTION PERMETTANT LACCES AUX OPTIONS
/* Creation d un cookie */
function SetCookie(value,jours) {
	var value = ((value=='del')?'':GM_getValue('selectmonde_select')+','+GM_getValue('selectmonde')+','+GM_getValue('loginauto_inputs_login')+','+GM_getValue('loginauto_inputs_pass')+','+GM_getValue('loginauto'));
	var expires = new Date();
    expires.setTime(expires.getTime() + jours*24*3600*1000);
    document.cookie = "avallocext=" + escape (value) +
	"; expires=" + expires.toGMTString() +
	"; path=/" +
	"; domain=.avalloc.fr"
}

/* Recuperation d un cookie */
function GetCookie() {
	var nom = 'avallocext';
	var deb,fin
	deb = document.cookie.indexOf(nom+"=")
	if (deb >= 0) {
		deb += nom.length + 1
		fin = document.cookie.indexOf(";",deb)
		if (fin < 0) fin = document.cookie.length
		return unescape(document.cookie.substring(deb,fin))
	}
	return ""
}

/* Test l existance d un cookie */
function TestCookie(log) {
      c=GetCookie();
      if(c=="") return false;
      else return true;
}

/* Suppression d un cookie */
function DelCookie() {
	SetCookie('del',-1);
}

/* Enregistrement d une variable locale */
function GM_setValue(str,value) {
	localStorage.setItem(str,value);
};

/* Recuperation d une variable locale */
function GM_getValue(str) { 
	if(localStorage.getItem(str)==null) {
		if(str.indexOf('_select') > 0) {
			for (var cle in opts_ae) {
				if(str.indexOf(cle) >= 0) {
					localStorage.setItem(str,opts_ae[cle].select[1]);
				}
			}
		} else if(str.indexOf('_inputs') > 0) {
			localStorage.setItem(str,'');
		} else {
			localStorage.setItem(str,true);
		}
	}
	return localStorage.getItem(str);
};