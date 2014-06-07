// ==UserScript==
// @name           111
// @version        1
// @author         1
// @include        http*://x2056.speed-travian.com/*
// ==/UserScript==


var iimCode = "CODE:"
var i, j, k=0, l=0
var jsNewLine="\n"
var container = new Array()
var pids = new Array()
var server="travian.com.br" // e.g. travian.it
var short="ts6" //e.g. ts5
var village="121120" //your village name !!! important 

var subject="bla bla"//message topic goes gere
var text1="Venho através deste jogo, convidar-te a experimentar o jogo E-sim. Neste jogo, desempenhas o papel de um cidadão do Brasil ou de outro país, pelo qual tens de lutar e defender os territórios. Estando os nossos inimigos a aumentar o seu poder, o governo do Brasil decidiu levar a cabo o maior recrutamento de sempre. Anda experimentar este jogo, e regista-te através do meu link para receberes 7 de ouro no nível 7 em vez dos habituais 5g o que seria muito útil para você: http://secura.e-sim.org/lan.37441/ Por favor registem-se pelo Brasil, estamos a precisar de novos jogadores  Este jogo desenrola-se em três campos: - Campo militar: No qual tens de lutar pelo teu país ou por um aliado e tornar-te forte. - Campo políco: No qual desempenhas um papel activo na sociedade, através de eleições democráticas através das quais aprovas e crias leis que favoreçam o país. Campo econômico No qual crias empresas e empregas os jogadores do E-sim tornando-te assim rico e consequentemente mais forte militarmente. Este é um jogo com bastante actividade dos administradores onde regularmente são inseridas novos updates no jogo, tornando-o mais viciante. E para promover um jogo limpo, são constantemente banidas as multie contas. Aqui fica o meu tuturial em jornal http://miburl.com/mNRuDv Obrigado pela atenção.  Link de Registro: http://secura.e-sim.org/lan.37441/ Link do Tutorial de jogo: http://secura.e-sim.org/article.html?id=5054"//message text goes here.
var text2="Venho através deste jogo, convidar-te a experimentar o jogo E-sim. Neste jogo, desempenhas o papel de um cidadão do Brasil ou de outro país, pelo qual tens de lutar e defender os territórios. Estando os nossos inimigos a aumentar o seu poder, o governo do Brasil decidiu levar a cabo o maior recrutamento de sempre. Anda experimentar este jogo, e regista-te através do meu link para receberes 7 de ouro no nível 7 em vez dos habituais 5g o que seria muito útil para você: http://secura.e-sim.org/lan.37441/ Por favor registem-se pelo Brasil, estamos a precisar de novos jogadores  Este jogo desenrola-se em três campos: - Campo militar: No qual tens de lutar pelo teu país ou por um aliado e tornar-te forte. - Campo políco: No qual desempenhas um papel activo na sociedade, através de eleições democráticas através das quais aprovas e crias leis que favoreçam o país. Campo econômico No qual crias empresas e empregas os jogadores do E-sim tornando-te assim rico e consequentemente mais forte militarmente. Este é um jogo com bastante actividade dos administradores onde regularmente são inseridas novos updates no jogo, tornando-o mais viciante. E para promover um jogo limpo, são constantemente banidas as multie contas. Aqui fica o meu tuturial em jornal http://miburl.com/mNRuDv Obrigado pela atenção.  Link de Registro: http://secura.e-sim.org/lan.37441/ Link do Tutorial de jogo: http://secura.e-sim.org/article.html?id=5054"//message text goes here.
text1=text1.replace(/ /gi,"<SP>")
text2=text2.replace(/ /gi,"<SP>")
subject=subject.replace(/ /gi,"<SP>")
iimDisplay("Nick Gathering")
iimCode = iimCode+"URL GOTO=http://"+short+"."+server+"/statistiken.php" + jsNewLine
iimCode = iimCode+"TAG POS=1 TYPE=SPAN ATTR=CLASS:number<SP>currentPage EXTRACT=TXT" + jsNewLine
iimPlay(iimCode)
iimCode = "CODE:"
var currentPage = iimGetLastExtract()
for (i = 1; i <=currentPage; i=i+1) {
iimCode = iimCode+"URL GOTO=http://"+short+"."+server+"/statistiken.php?id=0&page=" + i + jsNewLine
for (j = 1; j <= 20; j++) {
//iimCode = iimCode+"TAG POS="+j+" TYPE=TD ATTR=CLASS:pla EXTRACT=TXT" + jsNewLine
iimCode = iimCode+"TAG POS="+j+" TYPE=A ATTR=HREF:spieler.php?uid=* EXTRACT=HREF" + jsNewLine
}
iimPlay(iimCode)
iimCode="CODE:"
container = iimGetLastExtract().split("[EXTRACT]")
for (j=0;j<=19;j++){
pids.push(container[j].replace("http://"+short+"."+server+"/spieler.php?uid=",""))
//pids.push(container[j].replace("http://"+short+"."+server+"/game.php?village="+village+"&s=info_player&id=",""))
}
}
iimDisplay("Nick Gather finished!")
iimDisplay("Message Sender")
for (j=0; j<=10; j++) {
iimCode = "CODE:"
iimCode = iimCode + "URL GOTO=http://"+short+"."+server+"/nachrichten.php?t=1&id="+village+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:nachrichten.php ATTR=NAME:be CONTENT=Test"+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=TEXTAREA FORM=ACTION:nachrichten.php ATTR=ID:message CONTENT=Testing<SP>Message<SP>:)"+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=BUTTON ATTR=ID:s1"+jsNewLine
iimCode = iimCode + "WAIT SECONDS=10"+jsNewLine
iimPlay(iimCode)
}
for (j=0; j<pids.length; j++) {
if (k>=4) {// k>=4 - means it will send both messages 50%
iimCode = "CODE:"
iimCode = iimCode + "URL GOTO=http://"+short+"."+server+"/nachrichten.php?t=1&id="+pids[j]+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:nachrichten.php ATTR=NAME:be CONTENT="+subject+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=TEXTAREA FORM=ACTION:nachrichten.php ATTR=ID:message CONTENT="+text1+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=BUTTON ATTR=ID:s1"+jsNewLine
iimCode = iimCode + "WAIT SECONDS=0.5"+jsNewLine
iimPlay(iimCode)
if (k>=10) k=0
} else {
iimCode = "CODE:"
iimCode = iimCode + "URL GOTO=http://"+short+"."+server+"/nachrichten.php?t=1&id="+pids[j]+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=INPUT:TEXT FORM=ACTION:nachrichten.php ATTR=NAME:be CONTENT="+subject+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=TEXTAREA FORM=ACTION:nachrichten.php ATTR=ID:message CONTENT="+text1+jsNewLine
iimCode = iimCode + "TAG POS=1 TYPE=BUTTON ATTR=ID:s1"+jsNewLine
iimCode = iimCode + "WAIT SECONDS=0.5"+jsNewLine
iimPlay(iimCode)
}
k++
} 