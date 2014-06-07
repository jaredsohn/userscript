// ==UserScript==
// @name 贴吧自定义表情
// @author jackchen2345
// @namespace   http://tieba.baidu.com/
// @version 1.5
// @description 在百度贴吧中使用自定义表情
// @include http://tieba.baidu.com/tb/editor/v2/smiley.html*
// @download http://userscripts.org/scripts/review/134297
// ==/UserScript==


(function(){
		
    var Youxihou_collection_name='悠嘻猴';
    var Youxihou_collection=[
'http://www.yoyocici.com/biaoqing50/BQ001_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ002_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ003_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ004_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ005_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ006_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ007_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ008_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ009_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ010_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ011_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ012_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ013_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ014_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ015_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ016_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ017_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ018_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ019_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ020_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ021_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ022_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ023_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ024_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ025_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ026_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ027_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ028_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ029_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ030_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ031_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ032_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ033_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ034_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ035_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ036_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ037_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ038_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ039_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ040_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ041_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ042_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ043_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ044_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ045_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ046_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ047_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ048_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ049_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ050_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ051_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ052_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ053_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ054_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ055_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ056_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ057_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ058_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ059_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ060_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ061_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ062_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ063_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ064_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ065_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ066_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ067_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ068_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ069_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ070_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ071_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ072_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ073_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ074_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ075_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ076_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ077_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ078_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ079_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ080_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ081_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ082_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ083_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ084_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ085_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ086_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ087_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ088_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ089_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ090_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ091_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ092_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ093_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ094_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ095_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ096_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ097_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ098_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ099_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ100_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ101_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ102_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ103_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ104_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ105_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ106_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ107_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ108_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ109_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ110_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ111_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ112_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ113_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ118_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ119_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ120_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ121_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ122_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ123_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ124_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ125_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ126_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ127_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ128_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ129_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ130_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ131_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ132_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ133_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ134_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ135_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ136_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ137_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ138_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ139_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ140_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ141_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ142_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ143_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ144_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ145_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ146_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ147_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ148_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ149_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ150_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ151_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ152_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ153_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ154_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ155_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ156_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ157_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ158_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ159_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ160_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ161_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ162_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ163_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ164_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ165_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ166_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ167_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ168_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ169_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ170_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ171_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ172_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ173_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ174_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ175_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ176_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ177_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ178_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ179_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ180_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ181_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ182_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ183_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ184_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ185_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ186_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ187_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ188_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ189_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ190_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ191_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ192_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ193_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ194_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ195_yoci.gif',
'http://www.yoyocici.com/biaoqing50/BQ196_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ197_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ198_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ199_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ200_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ201_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ202_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ203_cici.gif',
'http://www.yoyocici.com/biaoqing50/BQ204_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ205_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ206_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ207_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ208_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ209_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ210_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ211_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ212_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ213_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ214_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ215_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ216_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ217_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ218_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ219_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ220_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ221_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ222_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ223_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ224_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ225_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ226_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ227_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ228_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ229_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ230_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ231_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ232_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ233_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ234_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ235_yoyo.gif',
'http://www.yoyocici.com/biaoqing50/BQ236_yoyo.gif',
'http://www.yoyocici.com/biaoqing128/bq044x128.gif',
'http://www.yoyocici.com/biaoqing128/bq043x128.gif',
'http://www.yoyocici.com/biaoqing128/bq042x128.gif',
'http://www.yoyocici.com/biaoqing128/bq042x128.gif',
'http://www.yoyocici.com/biaoqing128/bq041x128.gif',
'http://www.yoyocici.com/biaoqing128/bq040x128.gif',
'http://www.yoyocici.com/biaoqing128/bq039x128.gif',
'http://www.yoyocici.com/biaoqing128/bq038x128.gif',
'http://www.yoyocici.com/biaoqing128/bq037x128.gif',
'http://www.yoyocici.com/biaoqing128/bq036x128.gif',
'http://www.yoyocici.com/biaoqing128/bq034x128.gif',
'http://www.yoyocici.com/biaoqing128/bq033x128.gif',
'http://www.yoyocici.com/biaoqing128/bq032x128.gif',
'http://www.yoyocici.com/biaoqing128/bq031x128.gif',
'http://www.yoyocici.com/biaoqing128/bq030x128.gif',
'http://www.yoyocici.com/biaoqing128/bq029x128.gif',
'http://www.yoyocici.com/biaoqing128/bq028x128.gif',
'http://www.yoyocici.com/biaoqing128/bq027x128.gif',
'http://www.yoyocici.com/biaoqing128/bq026x128.gif',
'http://www.yoyocici.com/biaoqing128/bq025x128.gif',
'http://www.yoyocici.com/biaoqing128/bq024x128.gif',
'http://www.yoyocici.com/biaoqing128/bq023x128.gif',
'http://www.yoyocici.com/biaoqing128/bq022x128.gif',
'http://www.yoyocici.com/biaoqing128/bq021x128.gif',
'http://www.yoyocici.com/biaoqing128/bq020x128.gif',
'http://www.yoyocici.com/biaoqing128/bq019x128.gif',
'http://www.yoyocici.com/biaoqing128/bq018x128.gif',
'http://www.yoyocici.com/biaoqing128/bq017x128.gif',
'http://www.yoyocici.com/biaoqing128/bq016x128.gif',
'http://www.yoyocici.com/biaoqing128/bq015x128.gif',
'http://www.yoyocici.com/biaoqing128/bq014x128.gif',
'http://www.yoyocici.com/biaoqing128/bq013x128.gif',
'http://www.yoyocici.com/biaoqing128/bq012x128.gif',
'http://www.yoyocici.com/biaoqing128/bq011x128.gif',
'http://www.yoyocici.com/biaoqing128/bq010x128.gif',
'http://www.yoyocici.com/biaoqing128/bq009x128.gif',
'http://www.yoyocici.com/biaoqing128/bq008x128.gif',
'http://www.yoyocici.com/biaoqing128/bq007x128.gif',
'http://www.yoyocici.com/biaoqing128/bq006x128.gif',
'http://www.yoyocici.com/biaoqing128/bq005x128.gif',
'http://www.yoyocici.com/biaoqing128/bq004x128.gif',
'http://www.yoyocici.com/biaoqing128/bq003x128.gif',
'http://www.yoyocici.com/biaoqing128/bq002x128.gif',
'http://www.yoyocici.com/biaoqing128/bq001x128.gif',
];

var Goofans_collection_name='goofans论坛';
    var Goofans_collection=[
'http://goofans.com/sites/all/modules/smileys/packs/Roving/smile.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/lol.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/bigsmile.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/wink.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/tongue.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/shock.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/flat.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/aw.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/puzzled.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/sad.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/cool.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/steve.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/crazy.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/glasses.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/party.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/love.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/oups.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/shy.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/innocent.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/sexy.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/angry.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/sick.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/tired.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/santa.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/mail.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/sushi.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/hat.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/grade.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/ghost.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/cash.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/crown.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/davie.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/drunk.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/evil.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/beer.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/star.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/arrow.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/quest.png',
'http://goofans.com/sites/all/modules/smileys/packs/Roving/mark.png',
];

var Paopaobing_collection_name='炮炮兵';
    var Paopaobing_collection=[
'http://www.popois.com/userfiles/bq/1345619648748766041542.gif',
'http://www.popois.com/userfiles/bq/13455327673381803819773.gif',
'http://www.popois.com/userfiles/bq/134545166522237350906.gif',
'http://www.popois.com/userfiles/bq/13451843010962052320231.gif',
'http://www.popois.com/userfiles/bq/13450987422991332844752.gif',
'http://www.popois.com/userfiles/bq/13449150935252127109344.gif',
'http://www.popois.com/userfiles/bq/13448202153061609886208.gif',
'http://www.popois.com/userfiles/bq/13446468222141952277185.gif',
'http://www.popois.com/userfiles/bq/13445604218331621296703.gif',
'http://www.popois.com/userfiles/bq/1344303631160497949042.gif',
'http://www.popois.com/userfiles/bq/1344228717120655026976.gif',
'http://www.popois.com/userfiles/bq/1343982738578285055569.gif',
'http://www.popois.com/userfiles/bq/13439648054711175914274.gif',
'http://www.popois.com/userfiles/bq/13438744631891304045579.gif',
'http://www.popois.com/userfiles/bq/13445604218331621296703.gif',
'http://www.popois.com/userfiles/bq/1343355510702309703402.gif',
'http://www.popois.com/userfiles/bq/13432672570551574779317.gif',
'http://www.popois.com/userfiles/bq/13432672570551574779317.gif',
'http://www.popois.com/userfiles/bq/13430968036691010903284.gif',
'http://www.popois.com/userfiles/bq/1342764423203656938524.gif',
'http://www.popois.com/userfiles/bq/1342764423203656938524.gif',
'http://www.popois.com/userfiles/bq/13426621864311974281360.gif', 
'http://www.popois.com/userfiles/bq/1342490455541184396805.gif', 
'http://www.popois.com/userfiles/bq/13421420152231129322248.gif', 
'http://www.popois.com/userfiles/bq/13420556218711836563046.gif', 
'http://www.popois.com/userfiles/bq/13418890113761074857004.gif', 
'http://www.popois.com/userfiles/bq/13415373157081888355651.gif', 
'http://www.popois.com/userfiles/bq/13415373027931252807266.gif', 
'http://www.popois.com/userfiles/bq/13414511176181633853601.gif', 
'http://www.popois.com/userfiles/bq/1341363956893928361247.gif', 
'http://www.popois.com/userfiles/bq/13411939214241438626822.gif', 
'http://www.popois.com/userfiles/bq/1340935779068503449530.gif', 
'http://www.popois.com/userfiles/bq/1340848037648927968767.gif', 
'http://www.popois.com/userfiles/bq/13407600166052034410820.gif', 
'http://www.popois.com/userfiles/bq/1340677010045308534952.gif', 
'http://www.popois.com/userfiles/bq/134058819645151330465.gif', 
'http://www.popois.com/userfiles/bq/1340588157809527136244.gif', 
"http://www.popois.com/userfiles/bq/13402446382791770956934.gif",
"http://www.popois.com/userfiles/bq/1340156665944241916963.gif", 
"http://www.popois.com/userfiles/bq/1340069473126474815284.gif", 
"http://www.popois.com/userfiles/bq/1340001714214482719694.gif", 
"http://www.popois.com/userfiles/bq/1338960658334283782165.gif", 
"http://www.popois.com/userfiles/bq/1338960658333498636755.gif", 
"http://www.popois.com/userfiles/bq/1338960658333486862781.gif", 
"http://www.popois.com/userfiles/bq/13389606583321035421172.gif", 
"http://www.popois.com/userfiles/bq/1338960658332590916888.gif", 
"http://www.popois.com/userfiles/bq/13389606583311403862784.gif", 
"http://www.popois.com/userfiles/bq/1338898477542576610275.gif", 
"http://www.popois.com/userfiles/bq/13378396994911786244363.gif", 
"http://www.popois.com/userfiles/bq/13378396994902039952064.gif", 
"http://www.popois.com/userfiles/bq/1337839699489436150945.gif", 
"http://www.popois.com/userfiles/bq/1337839699489378539788.gif", 
"http://www.popois.com/userfiles/bq/13378396994881235283644.gif", 
"http://www.popois.com/userfiles/bq/13378396994871585047267.gif", 
"http://www.popois.com/userfiles/bq/1337148968881383903802.gif", 
"http://www.popois.com/userfiles/bq/1337148968880290404489.gif", 
"http://www.popois.com/userfiles/bq/13371489688791584670658.gif", 
"http://www.popois.com/userfiles/bq/13371489688781700572673.gif", 
"http://www.popois.com/userfiles/bq/1337148968876711490990.gif", 
"http://www.popois.com/userfiles/bq/1337148968875585356869.gif", 
"http://www.popois.com/userfiles/bq/13371489688751877799589.gif", 
"http://www.popois.com/userfiles/bq/1337148968874920051729.gif", 
"http://www.popois.com/userfiles/bq/1337148968873305298855.gif", 
"http://www.popois.com/userfiles/bq/1337148968873821606603.gif", 
"http://www.popois.com/userfiles/bq/13371489688721807777686.gif", 
"http://www.popois.com/userfiles/bq/1337148968871964230346.gif",
"http://www.popois.com/userfiles/bq/1337148968871908106268.gif",
"http://www.popois.com/userfiles/bq/13371489688701069126552.gif",  
"http://www.popois.com/userfiles/bq/13371489688691621900687.gif", 
"http://www.popois.com/userfiles/bq/1337148968869329012678.gif", 
"http://www.popois.com/userfiles/bq/1337148968868106148195.gif", 
"http://www.popois.com/userfiles/bq/1337148968867525857451.gif", 
"http://www.popois.com/userfiles/bq/13371489688671685539897.gif", 
"http://www.popois.com/userfiles/bq/1337148968866514740772.gif", 
"http://www.popois.com/userfiles/bq/13371489688651216372289.gif", 
"http://www.popois.com/userfiles/bq/1337148968864837194055.gif", 
"http://www.popois.com/userfiles/bq/13371489688631313664499.gif", 
"http://www.popois.com/userfiles/bq/1337148968863231596827.gif", 
"http://www.popois.com/userfiles/bq/1333939393425692700235.gif",
"http://www.popois.com/userfiles/bq/1333939384703207033302.gif",  
"http://www.popois.com/userfiles/bq/1333939376846333163404.gif",
"http://www.popois.com/userfiles/bq/1333939367388224810266.gif", 
"http://www.popois.com/userfiles/bq/1333939360040945857025.gif",
"http://www.popois.com/userfiles/bq/1333939352217780871446.gif",   
"http://www.popois.com/userfiles/bq/13339393446641616208865.gif", 
"http://www.popois.com/userfiles/bq/1333939337653633134799.gif", 
"http://www.popois.com/userfiles/bq/13339393307401320680608.gif", 
"http://www.popois.com/userfiles/bq/13339393221581314274519.gif", 
"http://www.popois.com/userfiles/bq/13339393139441164980978.gif", 
"http://www.popois.com/userfiles/bq/13339393052582065628756.gif", 
"http://www.popois.com/userfiles/bq/13339392968921226050506.gif", 
"http://www.popois.com/userfiles/bq/13339392887722059030688.gif",
"http://www.popois.com/userfiles/bq/1333939280757435324074.gif", 
"http://www.popois.com/userfiles/bq/1333939272782497280471.gif",  
"http://www.popois.com/userfiles/bq/1333939263048132059399.gif", 
"http://www.popois.com/userfiles/bq/13339392542331171157149.gif", 
"http://www.popois.com/userfiles/bq/13339392472911445934029.gif", 
"http://www.popois.com/userfiles/bq/1333939239086777260924.gif", 
"http://www.popois.com/userfiles/bq/1333939228688603578886.gif", 
"http://www.popois.com/userfiles/bq/1333939214696630200401.gif", 
"http://www.popois.com/userfiles/bq/13339392066491423975154.gif", 
"http://www.popois.com/userfiles/bq/1333939198938896208331.gif", 
"http://www.popois.com/userfiles/bq/13339391908741104918095.gif", 
"http://www.popois.com/userfiles/bq/1333939181655493288915.gif", 
"http://www.popois.com/userfiles/bq/1333939171956615676374.gif", 
"http://www.popois.com/userfiles/bq/1333939164682709614261.gif", 
"http://www.popois.com/userfiles/bq/13339391561051167907676.gif", 
"http://www.popois.com/userfiles/bq/1333939148328711708518.gif", 
"http://www.popois.com/userfiles/bq/1333939140931803956506.gif", 
"http://www.popois.com/userfiles/bq/1333939131941521851246.gif", 
"http://www.popois.com/userfiles/bq/13339391240481632587935.gif", 
"http://www.popois.com/userfiles/bq/13339391151361577531197.gif",
"http://www.popois.com/userfiles/bq/1333939107287868127089.gif",  
"http://www.popois.com/userfiles/bq/1333939098948194207913.gif", 
"http://www.popois.com/userfiles/bq/1333939084845870871069.gif", 
"http://www.popois.com/userfiles/bq/1333939076837363926573.gif", 
"http://www.popois.com/userfiles/bq/13339390682421261636518.gif", 
"http://www.popois.com/userfiles/bq/1333939059399824761818.gif", 
"http://www.popois.com/userfiles/bq/13339390511301326293155.gif", 
"http://www.popois.com/userfiles/bq/13339390425611927407441.gif", 
"http://www.popois.com/userfiles/bq/13339390349182134959448.gif", 
"http://www.popois.com/userfiles/bq/13339390267361302226949.gif", 
"http://www.popois.com/userfiles/bq/1333939019806923974610.gif", 
"http://www.popois.com/userfiles/bq/13339390123551250133717.gif", 
"http://www.popois.com/userfiles/bq/13339390047261764111715.gif", 
"http://www.popois.com/userfiles/bq/13339389967911456599526.gif", 
"http://www.popois.com/userfiles/bq/13339389887961432805701.gif", 
"http://www.popois.com/userfiles/bq/13339389814531949564077.gif", 
"http://www.popois.com/userfiles/bq/1333938973618491467060.gif", 
"http://www.popois.com/userfiles/bq/1333938965184193702068.gif", 
"http://www.popois.com/userfiles/bq/13339389562181437582573.gif",
"http://www.popois.com/userfiles/bq/13339389461382140937862.gif",  
"http://www.popois.com/userfiles/bq/13339389343341497227958.gif", 
"http://www.popois.com/userfiles/bq/1333938919867688869013.gif", 
"http://www.popois.com/userfiles/bq/13339389106351903861583.gif", 
"http://www.popois.com/userfiles/bq/1333938903457484168466.gif", 
"http://www.popois.com/userfiles/bq/1333938895435796321050.gif", 
"http://www.popois.com/userfiles/bq/13339388878891941225358.gif", 
"http://www.popois.com/userfiles/bq/1333938879873300893242.gif", 
"http://www.popois.com/userfiles/bq/1333938872272157327826.gif", 
"http://www.popois.com/userfiles/bq/1333938863772956033808.gif", 
"http://www.popois.com/userfiles/bq/13339388564001405396982.gif",
"http://www.popois.com/userfiles/bq/13339388485151173575950.gif",  
"http://www.popois.com/userfiles/bq/13339388399161459281327.gif", 
"http://www.popois.com/userfiles/bq/13339388313462135322569.gif", 
"http://www.popois.com/userfiles/bq/1333938821757205256470.gif",
"http://www.popois.com/userfiles/bq/1333938812473599546969.gif", 
"http://www.popois.com/userfiles/bq/13339388033321011320683.gif", 
"http://www.popois.com/userfiles/bq/1333938795968759150977.gif", 
"http://www.popois.com/userfiles/bq/1333938788911498210294.gif", 
"http://www.popois.com/userfiles/bq/1333938781030405987378.gif",
"http://www.popois.com/userfiles/bq/13339387722321996556806.gif", 
"http://www.popois.com/userfiles/bq/1333938762230498566875.gif", 
"http://www.popois.com/userfiles/bq/1333938753398326100701.gif", 
"http://www.popois.com/userfiles/bq/13339387412311887967964.gif", 
"http://www.popois.com/userfiles/bq/13339387344151514900149.gif", 
"http://www.popois.com/userfiles/bq/13339387232841567155757.gif", 
"http://www.popois.com/userfiles/bq/1333938713944117308733.gif", 
"http://www.popois.com/userfiles/bq/13339387079021294128383.gif", 
"http://www.popois.com/userfiles/bq/13339386992951844967578.gif", 
"http://www.popois.com/userfiles/bq/1333938690212380202105.gif", 
"http://www.popois.com/userfiles/bq/13339386723471988607033.gif", 
"http://www.popois.com/userfiles/bq/1333938663785598051998.gif", 
"http://www.popois.com/userfiles/bq/1333938654369511385373.gif", 
"http://www.popois.com/userfiles/bq/13339386468471956654162.gif", 
"http://www.popois.com/userfiles/bq/13339386388272139172765.gif", 
"http://www.popois.com/userfiles/bq/1333938630794320362034.gif", 
"http://www.popois.com/userfiles/bq/1333938620893304766761.gif", 
"http://www.popois.com/userfiles/bq/13339386123081224858613.gif", 
"http://www.popois.com/userfiles/bq/13339385984161645120379.gif", 
"http://www.popois.com/userfiles/bq/13339385905531968270113.gif", 
"http://www.popois.com/userfiles/bq/13339385812271739023092.gif", 
"http://www.popois.com/userfiles/bq/1333938573083302808543.gif", 
"http://www.popois.com/userfiles/bq/13339385572841052074944.gif", 
];
    setTimeout(function(){
        //表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
        fun_UserDefinedSmiley(Youxihou_collection_name, Youxihou_collection, 'tab100', 'tab_100');
	fun_UserDefinedSmiley(Goofans_collection_name, Goofans_collection, 'tab101', 'tab_101');  
	fun_UserDefinedSmiley(Paopaobing_collection_name, Paopaobing_collection, 'tab102', 'tab_102');       
    }, 0);


    function fun_UserDefinedSmiley(collection_name, collection, content_id, menu_id ){
        var f1=document.getElementById('tabContent');
        var f2=document.getElementById('tabMenu');
        if(f1&&f2){
            //添加自定义表情存储表格
            var node=document.createElement('div');
            node.id=content_id;
            node.setAttribute('style', 'display: none;');
            var text='<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
            var number=0;
            for(var i=0; i<collection.length/7;i++){
                text+='<tr>';
                for(var j=0; j<7 ; j++){
                    var posflag=j>3?1:0;
                    var image_src=collection[number++];
                    if(image_src){
                        text+='<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="FrozenFaceSmileyInsertSmiley(\''+image_src+'\')" onmouseover="FrozenFaceSmileyOver(this,\''+image_src+'\',\''+posflag+'\')" onmouseout="FrozenFaceSmileyOut(this)">';
                        text+='<img width=35px src="'+image_src+'">';
                        text+='</td>';
                    }else{
                        text+='<td width=35px bgcolor="#FFFFFF"></td>';
                    }
                }
                text+='</tr>';
            }
            text+='</tbody></table>';
            node.innerHTML=text;
            f1.appendChild(node);

            //添加自定义表情切换按钮
            var node=document.createElement('div');
            node.id=menu_id;
            node.setAttribute('class', 'menuDefault');
            node.setAttribute('onclick', 'FrozenFaceSwitchTab("'+content_id+'","'+menu_id+'");');
            node.innerHTML='<u>'+collection_name+'</u>';
            f2.appendChild(node);

            //设置预览框大小
            document.getElementById('faceReview').setAttribute('style', 'width:100px;height:100px;');
        }
    }
    unsafeWindow.FrozenFaceSwitchTab=function(content_id, menu_id){
        var f1=document.getElementById(content_id);
        if(f1){
            //显示自定义表情储存表格
            var f2=document.getElementById('tabContent');
            if(f2){
                for(var i=0; i<f2.children.length; i++){
                    if(f2.children[i].getAttribute('style')=='display: block;'||
                        f2.children[i].getAttribute('style')=='display: block; '){
                        f2.children[i].setAttribute('style', 'display:none;');
                    }
                }
            }
            f1.setAttribute('style', 'display: block;');

            //表情切换按钮调整
            var f3=document.getElementById('tabMenu');
            if(f3){
                for(var i=0; i<f3.children.length; i++){
                    var item=f3.children[i];
                    if(item.getAttribute('class')!='menuDefault disable'){
                        item.setAttribute('class', 'menuDefault');
                    }
                    var tab_number=item.id.match(/\d+/);
                    if(parseInt(tab_number)<16&&item.getAttribute('class')!='menuDefault disable'){    //假定16以下的序号已被百度贴吧占用，其他序号保留给小脸使用
                        item.setAttribute('onclick', 'document.getElementById("'+content_id+'").setAttribute("style", "display:none;");document.getElementById("'+menu_id+'").setAttribute("class", "menuDefault");switchTab('+tab_number+')');
                    }
                }
                document.getElementById(menu_id).setAttribute('class', 'menuFocus');
            }
        }
    }
    unsafeWindow.FrozenFaceSmileyInsertSmiley=function(image_src){
        var editorID=unsafeWindow.getSearchById('id');
        var editor=parent.wrappedJSObject.TED.Editor.getInstanceById(editorID);
        editor.execCommand('insertimage',  image_src);
        editor.overlay.close();
    }
    unsafeWindow.FrozenFaceSmileyOver=function(td, image_src, posflag){
        td.style.backgroundColor="#E8E8FD";
        document.getElementById('faceReview').setAttribute('src', image_src);
        if(posflag==1)
            document.getElementById("tabIconReview").className="show";
        document.getElementById("tabIconReview").style.display='block';
    }
    unsafeWindow.FrozenFaceSmileyOut=function(td){
        td.style.backgroundColor="#FFFFFF";
        document.getElementById('faceReview').setAttribute('src', 'http://static.tieba.baidu.com/tb/editor/images/default/0.gif');
        document.getElementById("tabIconReview").className="";
        document.getElementById("tabIconReview").style.display='none';
    }


})();