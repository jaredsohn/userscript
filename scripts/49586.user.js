// ==UserScript==
// @name           Emoji!!! Emoticons [Emoplurk Add-On]
// @namespace      http://userscripts.org/users/89517
// @description    Smilies Set for "EMOPLURK 2.0"
// @version        1
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="Emoji!!!"href="http://obp.owind.com:801/emoji/emoji-E">001.png,002.png,003.png,004.png,005.png,006.png,007.png,008.png,009.png,00A.png,00B.png,00C.png,00D.png,00E.png,00F.png,010.png,011.png,012.png,013.png,014.png,015.png,016.png,017.png,018.png,019.png,01A.png,01B.png,01C.png,01D.png,01E.png,01F.png,020.png,021.png,022.png,023.png,024.png,025.png,026.png,027.png,028.png,029.png,02A.png,02B.png,02C.png,02D.png,02E.png,02F.png,030.png,031.png,032.png,033.png,034.png,035.png,036.png,037.png,038.png,039.png,03A.png,03B.png,03C.png,03D.png,03E.png,03F.png,040.png,041.png,042.png,043.png,044.png,045.png,046.png,047.png,048.png,049.png,04A.png,04B.png,04C.png,04D.png,04E.png,04F.png,050.png,051.png,052.png,053.png,054.png,055.png,056.png,057.png,058.png,059.png,05A.png,101.png,102.png,103.png,104.png,105.png,106.png,107.png,108.png,109.png,10A.png,10B.png,10C.png,10D.png,10E.png,10F.png,110.png,111.png,112.png,113.png,114.png,115.png,116.png,117.png,118.png,119.png,11A.png,11B.png,11C.png,11D.png,11E.png,11F.png,120.png,121.png,122.png,123.png,124.png,125.png,126.png,127.png,128.png,129.png,12A.png,12B.png,12C.png,12D.png,12E.png,12F.png,130.png,131.png,132.png,133.png,134.png,135.png,136.png,137.png,138.png,139.png,13A.png,13B.png,13C.png,13D.png,13E.png,13F.png,140.png,141.png,142.png,143.png,144.png,145.png,146.png,147.png,148.png,149.png,14A.png,14B.png,14C.png,14D.png,14E.png,14F.png,150.png,151.png,152.png,153.png,154.png,155.png,156.png,157.png,158.png,159.png,15A.png,201.png,202.png,203.png,204.png,205.png,206.png,207.png,208.png,209.png,20A.png,20B.png,20C.png,20D.png,20E.png,20F.png,210.png,211.png,212.png,213.png,214.png,215.png,216.png,217.png,218.png,219.png,21A.png,21B.png,21C.png,21D.png,21E.png,21F.png,220.png,221.png,222.png,223.png,224.png,225.png,226.png,227.png,228.png,229.png,22A.png,22B.png,22C.png,22D.png,22E.png,22F.png,230.png,231.png,232.png,233.png,234.png,235.png,236.png,237.png,238.png,239.png,23A.png,23B.png,23C.png,23D.png,23E.png,23F.png,240.png,241.png,242.png,243.png,244.png,245.png,246.png,247.png,248.png,249.png,24A.png,24B.png,24C.png,24D.png,24E.png,24F.png,250.png,251.png,252.png,253.png,301.png,302.png,303.png,304.png,305.png,306.png,307.png,308.png,309.png,30A.png,30B.png,30C.png,30D.png,30E.png,30F.png,310.png,311.png,312.png,313.png,314.png,315.png,316.png,317.png,318.png,319.png,31A.png,31B.png,31C.png,31D.png,31E.png,31F.png,320.png,321.png,322.png,323.png,324.png,325.png,326.png,327.png,328.png,329.png,32A.png,32B.png,32C.png,32D.png,32E.png,32F.png,330.png,331.png,332.png,333.png,334.png,335.png,336.png,337.png,338.png,339.png,33A.png,33B.png,33C.png,33D.png,33E.png,33F.png,340.png,341.png,342.png,343.png,344.png,345.png,346.png,347.png,348.png,349.png,34A.png,34B.png,34C.png,34D.png,401.png,402.png,403.png,404.png,405.png,406.png,407.png,408.png,409.png,40A.png,40B.png,40C.png,40D.png,40E.png,40F.png,410.png,411.png,412.png,413.png,414.png,415.png,416.png,417.png,418.png,419.png,41A.png,41B.png,41C.png,41D.png,41E.png,41F.png,420.png,421.png,422.png,423.png,424.png,425.png,426.png,427.png,428.png,429.png,42A.png,42B.png,42C.png,42D.png,42E.png,42F.png,430.png,431.png,432.png,433.png,434.png,435.png,436.png,437.png,438.png,439.png,43A.png,43B.png,43C.png,43D.png,43E.png,43F.png,440.png,441.png,442.png,443.png,444.png,445.png,446.png,447.png,448.png,449.png,44A.png,44B.png,44C.png,501.png,502.png,503.png,504.png,505.png,506.png,507.png,508.png,509.png,50A.png,50B.png,50C.png,50D.png,50E.png,50F.png,510.png,511.png,512.png,513.png,514.png,515.png,516.png,517.png,518.png,519.png,51A.png,51B.png,51C.png,51D.png,51E.png,51F.png,520.png,521.png,522.png,523.png,524.png,525.png,526.png,527.png,528.png,529.png,52A.png,52B.png,52C.png,52D.png,52E.png,52F.png,530.png,531.png,532.png,533.png,534.png,535.png,536.png,537.png</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);