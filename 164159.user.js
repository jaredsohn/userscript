// ==UserScript==
// @name           n in 1
// @description    n个全域脚本合而为一
// @include        *
// @require        http://code.jquery.com/jquery-latest.min.js
// @author         congxz6688
// @version        2012.8.16
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// ==/UserScript==


//脚本应用范围的过滤器
function lodex(r) {
	return window.location.href.indexOf(r);
}
function tidex(r) {
	return document.title.indexOf(r);
}

/***************繁转简*****************/
//繁体字列表
var fanti = unescape("%u9312%u769A%u85F9%u7919%u611B%u566F%u5B21%u74A6%u66D6%u9744%u8AF3%u92A8%u9D6A%u9AAF%u8956%u5967%u5ABC%u9A41%u9C32%u58E9%u7F77%u9200%u64FA%u6557%u5504%u9812%u8FA6%u7D46%u9211%u5E6B%u7D81%u938A%u8B17%u525D%u98FD%u5BF6%u5831%u9B91%u9D07%u9F59%u8F29%u8C9D%u92C7%u72FD%u5099%u618A%u9D6F%u8CC1%u931B%u7E43%u7B46%u7562%u6583%u5E63%u9589%u84FD%u55F6%u6F77%u924D%u7BF3%u8E55%u908A%u7DE8%u8CB6%u8B8A%u8FAF%u8FAE%u8290%u7DF6%u7C69%u6A19%u9A43%u98AE%u98C6%u93E2%u9463%u9C3E%u9C49%u5225%u765F%u7015%u6FF1%u8CD3%u64EF%u5110%u7E7D%u6AB3%u6BAF%u81CF%u944C%u9AD5%u9B22%u9905%u7A1F%u64A5%u7F3D%u9251%u99C1%u9911%u9238%u9D53%u88DC%u923D%u8CA1%u53C3%u8836%u6B98%u615A%u6158%u71E6%u9A42%u9EF2%u84BC%u8259%u5009%u6EC4%u5EC1%u5074%u518A%u6E2C%u60FB%u5C64%u8A6B%u9364%u5115%u91F5%u6519%u647B%u87EC%u995E%u8B92%u7E8F%u93DF%u7522%u95E1%u986B%u56C5%u8AC2%u8B96%u8546%u61FA%u5B0B%u9A4F%u8998%u79AA%u9414%u5834%u5617%u9577%u511F%u8178%u5EE0%u66A2%u5000%u8407%u60B5%u95B6%u9BE7%u9214%u8ECA%u5FB9%u7868%u5875%u9673%u896F%u5096%u8AF6%u6AEC%u78E3%u9F54%u6490%u7A31%u61F2%u8AA0%u9A01%u68D6%u6A89%u92EE%u943A%u7661%u9072%u99B3%u6065%u9F52%u71BE%u98ED%u9D1F%u6C96%u885D%u87F2%u5BF5%u9283%u7587%u8E8A%u7C4C%u7DA2%u5114%u5E6C%u8B8E%u6AE5%u5EDA%u92E4%u96DB%u790E%u5132%u89F8%u8655%u82BB%u7D40%u8E95%u50B3%u91E7%u7621%u95D6%u5275%u6134%u9318%u7D9E%u7D14%u9D89%u7DBD%u8F1F%u9F6A%u8FAD%u8A5E%u8CDC%u9DBF%u8070%u8525%u56EA%u5F9E%u53E2%u84EF%u9A44%u6A05%u6E4A%u8F33%u8EA5%u7AC4%u651B%u932F%u92BC%u9E7A%u9054%u5660%u97C3%u5E36%u8CB8%u99D8%u7D3F%u64D4%u55AE%u9132%u64A3%u81BD%u619A%u8A95%u5F48%u6BAB%u8CE7%u7649%u7C1E%u7576%u64CB%u9EE8%u8569%u6A94%u8B9C%u78AD%u8960%u6417%u5CF6%u79B1%u5C0E%u76DC%u71FE%u71C8%u9127%u9419%u6575%u6ECC%u905E%u7DE0%u7CF4%u8A46%u8AE6%u7D88%u89BF%u93D1%u985B%u9EDE%u588A%u96FB%u5DD4%u923F%u7672%u91E3%u8ABF%u929A%u9BDB%u8ADC%u758A%u9C08%u91D8%u9802%u9320%u8A02%u92CC%u4E1F%u92A9%u6771%u52D5%u68DF%u51CD%u5D20%u9D87%u7AC7%u72A2%u7368%u8B80%u8CED%u934D%u7006%u6ADD%u7258%u7BE4%u9EF7%u935B%u65B7%u7DDE%u7C6A%u514C%u968A%u5C0D%u61DF%u9413%u5678%u9813%u920D%u71C9%u8E89%u596A%u58AE%u9438%u9D5D%u984D%u8A1B%u60E1%u9913%u8AE4%u580A%u95BC%u8EDB%u92E8%u9354%u9D9A%u984E%u9853%u9C77%u8A92%u5152%u723E%u990C%u8CB3%u9087%u927A%u9D2F%u9B9E%u767C%u7F70%u95A5%u743A%u792C%u91E9%u7169%u8CA9%u98EF%u8A2A%u7D21%u9201%u9B74%u98DB%u8AB9%u5EE2%u8CBB%u7DCB%u9428%u9BE1%u7D1B%u58B3%u596E%u61A4%u7CDE%u50E8%u8C50%u6953%u92D2%u98A8%u760B%u99AE%u7E2B%u8AF7%u9CF3%u7043%u819A%u8F3B%u64AB%u8F14%u8CE6%u5FA9%u8907%u8CA0%u8A03%u5A66%u7E1B%u9CE7%u99D9%u7D31%u7D3C%u8CFB%u9EA9%u9B92%u9C12%u91D3%u8A72%u9223%u84CB%u8CC5%u687F%u8D95%u7A08%u8D1B%u5C37%u641F%u7D3A%u5CA1%u525B%u92FC%u7DB1%u5D17%u6207%u93AC%u776A%u8AA5%u7E1E%u92EF%u64F1%u9D3F%u95A3%u927B%u500B%u7D07%u9398%u6F41%u7D66%u4E99%u8CE1%u7D86%u9BC1%u9F94%u5BAE%u978F%u8CA2%u9264%u6E9D%u830D%u69CB%u8CFC%u5920%u8A6C%u7DF1%u89AF%u8831%u9867%u8A41%u8F42%u9237%u932E%u9D23%u9D60%u9DBB%u526E%u639B%u9D30%u6451%u95DC%u89C0%u9928%u6163%u8CAB%u8A7F%u645C%u9E1B%u9C25%u5EE3%u7377%u898F%u6B78%u9F9C%u95A8%u8ECC%u8A6D%u8CB4%u528A%u532D%u528C%u5AAF%u6A9C%u9BAD%u9C56%u8F25%u6EFE%u889E%u7DC4%u9BC0%u934B%u570B%u904E%u581D%u54BC%u5E57%u69E8%u87C8%u927F%u99ED%u97D3%u6F22%u95DE%u7D4E%u9821%u865F%u705D%u9865%u95A1%u9DB4%u8CC0%u8A36%u95D4%u8823%u6A6B%u8F5F%u9D3B%u7D05%u9ECC%u8A0C%u8452%u958E%u9C5F%u58FA%u8B77%u6EEC%u6236%u6EF8%u9D98%u5629%u83EF%u756B%u5283%u8A71%u9A4A%u6A3A%u93F5%u61F7%u58DE%u6B61%u74B0%u9084%u7DE9%u63DB%u559A%u7613%u7165%u6E19%u5950%u7E6F%u9370%u9BC7%u9EC3%u8B0A%u9C09%u63EE%u8F1D%u6BC0%u8CC4%u7A62%u6703%u71F4%u532F%u5F59%u8AF1%u8AA8%u7E6A%u8A7C%u8588%u5666%u6FAE%u7E62%u743F%u6689%u8477%u6E3E%u8AE2%u991B%u95BD%u7372%u8CA8%u798D%u9225%u944A%u64CA%u6A5F%u7A4D%u9951%u8DE1%u8B4F%u96DE%u7E3E%u7DDD%u6975%u8F2F%u7D1A%u64E0%u5E7E%u858A%u5291%u6FDF%u8A08%u8A18%u969B%u7E7C%u7D00%u8A10%u8A70%u85BA%u5630%u568C%u9A65%u74A3%u89AC%u9F4F%u78EF%u7F88%u8806%u8E8B%u973D%u9C6D%u9BFD%u593E%u83A2%u9830%u8CC8%u9240%u50F9%u99D5%u90DF%u6D79%u92CF%u93B5%u87EF%u6BB2%u76E3%u5805%u7B8B%u9593%u8271%u7DD8%u7E6D%u6AA2%u583F%u9E7C%u63C0%u64BF%u7C21%u5109%u6E1B%u85A6%u6ABB%u9452%u8E10%u8CE4%u898B%u9375%u8266%u528D%u991E%u6F38%u6FFA%u6F97%u8AEB%u7E11%u6214%u6229%u77BC%u9DBC%u7B67%u9C39%u97C9%u5C07%u6F3F%u8523%u69F3%u734E%u8B1B%u91AC%u7D73%u97C1%u81A0%u6F86%u9A55%u5B0C%u652A%u9278%u77EF%u50E5%u8173%u9903%u7E73%u7D5E%u8F4E%u8F03%u649F%u5DA0%u9DE6%u9BAB%u968E%u7BC0%u6F54%u7D50%u8AA1%u5C46%u7664%u981C%u9B9A%u7DCA%u9326%u50C5%u8B39%u9032%u6649%u71FC%u76E1%u5118%u52C1%u834A%u8396%u5DF9%u85CE%u9949%u7E09%u8D10%u89B2%u9BE8%u9A5A%u7D93%u9838%u975C%u93E1%u5F91%u75D9%u7AF6%u51C8%u5244%u6D87%u9015%u5F33%u811B%u975A%u7CFE%u5EC4%u820A%u9B2E%u9CE9%u9DF2%u99D2%u8209%u64DA%u92F8%u61FC%u5287%u8A4E%u5C68%u6AF8%u98B6%u9245%u92E6%u7AB6%u9F5F%u9D51%u7D79%u9308%u942B%u96CB%u89BA%u6C7A%u7D55%u8B4E%u73A8%u921E%u8ECD%u99FF%u76B8%u958B%u51F1%u5274%u584F%u613E%u6137%u93A7%u9347%u9F95%u958C%u9227%u92AC%u9846%u6BBC%u8AB2%u9A0D%u7DD9%u8EFB%u9233%u9301%u9837%u58BE%u61C7%u9F66%u93D7%u6473%u5EAB%u8932%u56B3%u584A%u5108%u9136%u5672%u81BE%u5BEC%u736A%u9AD6%u7926%u66E0%u6CC1%u8A86%u8A91%u913A%u58D9%u7E8A%u8CBA%u8667%u5DCB%u7ABA%u994B%u6F70%u5331%u8562%u6192%u8075%u7C23%u95AB%u9315%u9BE4%u64F4%u95CA%u8810%u881F%u81D8%u840A%u4F86%u8CF4%u5D0D%u5FA0%u6DF6%u7028%u8CDA%u775E%u9338%u7669%u7C5F%u85CD%u6B04%u6514%u7C43%u95CC%u862D%u703E%u8B95%u652C%u89BD%u61F6%u7E9C%u721B%u6FEB%u5D50%u6B16%u6595%u946D%u8964%u746F%u95AC%u92C3%u6488%u52DE%u6F87%u562E%u5D97%u92A0%u9412%u7646%u6A02%u9C33%u9433%u58D8%u985E%u6DDA%u8A84%u7E32%u7C6C%u8C8D%u96E2%u9BC9%u79AE%u9E97%u53B2%u52F5%u792B%u66C6%u6B77%u701D%u96B8%u5137%u9148%u58E2%u85F6%u849E%u863A%u56A6%u9090%u9A6A%u7E2D%u6AEA%u6ADF%u8F62%u792A%u92F0%u9E1D%u7658%u7CF2%u8E92%u9742%u9C7A%u9C67%u5006%u806F%u84EE%u9023%u942E%u6190%u6F23%u7C3E%u6582%u81C9%u93C8%u6200%u7149%u7DF4%u861E%u5969%u7032%u7489%u6BAE%u8933%u895D%u9C31%u7CE7%u6DBC%u5169%u8F1B%u8AD2%u9B4E%u7642%u907C%u9410%u7E5A%u91D5%u9DEF%u7375%u81E8%u9130%u9C57%u51DC%u8CC3%u85FA%u5EE9%u6A81%u8F54%u8EAA%u9F61%u9234%u9748%u5DBA%u9818%u7DBE%u6B1E%u87F6%u9BEA%u993E%u5289%u700F%u9A2E%u7DB9%u93A6%u9DDA%u9F8D%u807E%u56A8%u7C60%u58DF%u650F%u96B4%u8622%u7027%u74CF%u6AF3%u6727%u7931%u6A13%u5A41%u645F%u7C0D%u50C2%u851E%u560D%u5D81%u93E4%u763A%u802C%u87BB%u9ACF%u8606%u76E7%u9871%u5EEC%u7210%u64C4%u9E75%u865C%u9B6F%u8CC2%u797F%u9304%u9678%u58DA%u64FC%u5695%u95AD%u7018%u6DE5%u6AE8%u6AD3%u8F64%u8F05%u8F46%u6C0C%u81DA%u9E15%u9DFA%u826B%u9C78%u5DD2%u6523%u5B7F%u7064%u4E82%u81E0%u5B4C%u6B12%u9E1E%u947E%u6384%u8F2A%u502B%u4F96%u6DEA%u7DB8%u8AD6%u5707%u863F%u7F85%u908F%u947C%u7C6E%u9A3E%u99F1%u7D61%u7296%u7380%u6FFC%u6B0F%u8161%u93CD%u9A62%u5442%u92C1%u4FB6%u5C62%u7E37%u616E%u6FFE%u7DA0%u6ADA%u8938%u92DD%u5638%u5ABD%u746A%u78BC%u879E%u99AC%u7F75%u55CE%u561C%u5B24%u69AA%u8CB7%u9EA5%u8CE3%u9081%u8108%u52F1%u779E%u9945%u883B%u6EFF%u8B3E%u7E35%u93DD%u9859%u9C3B%u8C93%u9328%u925A%u8CBF%u9EBC%u9EBD%u6C92%u9382%u9580%u60B6%u5011%u636B%u71DC%u61E3%u9346%u9333%u5922%u7787%u8B0E%u5F4C%u8993%u51AA%u7F8B%u8B10%u737C%u79B0%u7DBF%u7DEC%u6FA0%u9766%u9EFD%u5EDF%u7DF2%u7E46%u6EC5%u61AB%u95A9%u9594%u7DE1%u9CF4%u9298%u8B2C%u8B28%u9A40%u9943%u6B7F%u93CC%u8B00%u755D%u926C%u5436%u9209%u7D0D%u96E3%u6493%u8166%u60F1%u9B27%u9403%u8A25%u9912%u5167%u64EC%u81A9%u922E%u9BE2%u6506%u8F26%u9BF0%u91C0%u9CE5%u8526%u88CA%u8076%u5699%u9477%u93B3%u9689%u8617%u56C1%u9862%u8EA1%u6AB8%u7370%u5BE7%u64F0%u6FD8%u82E7%u5680%u8079%u9215%u7D10%u81BF%u6FC3%u8FB2%u5102%u5665%u99D1%u91F9%u8AFE%u513A%u7627%u6B50%u9DD7%u6BC6%u5614%u6F1A%u8B33%u616A%u750C%u76E4%u8E63%u9F90%u62CB%u76B0%u8CE0%u8F61%u5674%u9D6C%u7D15%u7F86%u9239%u9A19%u8ADE%u99E2%u98C4%u7E39%u983B%u8CA7%u5B2A%u860B%u6191%u8A55%u6F51%u9817%u91D9%u64B2%u92EA%u6A38%u8B5C%u93F7%u9420%u68F2%u81CD%u9F4A%u9A0E%u8C48%u555F%u6C23%u68C4%u8A16%u8604%u9A0F%u7DBA%u69BF%u78E7%u980E%u980F%u9C2D%u727D%u91EC%u925B%u9077%u7C3D%u7C64%u8B19%u9322%u9257%u6F5B%u6DFA%u8B74%u5879%u50C9%u8541%u6173%u9A2B%u7E7E%u69E7%u9210%u69CD%u55C6%u58BB%u8594%u5F37%u6436%u5B19%u6AA3%u6227%u7197%u9306%u93D8%u93F9%u7FA5%u8E4C%u936C%u6A4B%u55AC%u50D1%u7FF9%u7AC5%u8A9A%u8B59%u854E%u7E70%u78FD%u8E7A%u7ACA%u611C%u9365%u7BCB%u6B3D%u89AA%u5BE2%u92DF%u8F15%u6C2B%u50BE%u9803%u8ACB%u6176%u64B3%u9BD6%u74CA%u7AAE%u7162%u86FA%u5DF0%u8CD5%u87E3%u9C0D%u8DA8%u5340%u8EC0%u9A45%u9F72%u8A58%u5D87%u95C3%u89B7%u9D1D%u9874%u6B0A%u52F8%u8A6E%u7DA3%u8F07%u9293%u537B%u9D72%u78BA%u95CB%u95D5%u6128%u8B93%u9952%u64FE%u7E5E%u8558%u5B08%u6A48%u71B1%u97CC%u8A8D%u7D09%u98EA%u8ED4%u69AE%u7D68%u5DB8%u8811%u7E1F%u92A3%u9870%u8EDF%u92B3%u8706%u958F%u6F64%u7051%u85A9%u98AF%u9C13%u8CFD%u5098%u6BFF%u7CDD%u55AA%u9A37%u6383%u7E45%u6F80%u55C7%u92AB%u7A61%u6BBA%u524E%u7D17%u93A9%u9BCA%u7BE9%u66EC%u91C3%u522A%u9583%u965C%u8D0D%u7E55%u8A15%u59CD%u9A38%u91E4%u9C54%u5891%u50B7%u8CDE%u5770%u6BA4%u89F4%u71D2%u7D39%u8CD2%u651D%u61FE%u8A2D%u5399%u7044%u756C%u7D33%u5BE9%u5B38%u814E%u6EF2%u8A75%u8AD7%u700B%u8072%u7E69%u52DD%u5E2B%u7345%u6FD5%u8A69%u6642%u8755%u5BE6%u8B58%u99DB%u52E2%u9069%u91CB%u98FE%u8996%u8A66%u8B1A%u5852%u8494%u5F12%u8EFE%u8CB0%u9230%u9C23%u58FD%u7378%u7DAC%u6A1E%u8F38%u66F8%u8D16%u5C6C%u8853%u6A39%u8C4E%u6578%u6504%u7D13%u5E25%u9582%u96D9%u8AB0%u7A05%u9806%u8AAA%u78A9%u720D%u9460%u7D72%u98FC%u5EDD%u99DF%u7DE6%u9376%u9DE5%u8073%u616B%u980C%u8A1F%u8AA6%u64FB%u85EA%u993F%u98BC%u93AA%u8607%u8A34%u8085%u8B16%u7A4C%u96D6%u96A8%u7D8F%u6B72%u8AB6%u5B6B%u640D%u7B4D%u84C0%u733B%u7E2E%u7463%u9396%u55E9%u8127%u737A%u64BB%u95E5%u9248%u9C28%u81FA%u614B%u9226%u9B90%u6524%u8CAA%u7671%u7058%u58C7%u8B5A%u8AC7%u5606%u66C7%u926D%u931F%u9807%u6E6F%u71D9%u513B%u9933%u940B%u93DC%u6FE4%u7D73%u8A0E%u97DC%u92F1%u9A30%u8B04%u92BB%u984C%u9AD4%u5C5C%u7DF9%u9D5C%u95D0%u689D%u7CF6%u9F60%u9C37%u8CBC%u9435%u5EF3%u807D%u70F4%u9285%u7D71%u615F%u982D%u9204%u79BF%u5716%u91F7%u5718%u6476%u9839%u86FB%u98E9%u812B%u9D15%u99B1%u99DD%u6A62%u7C5C%u9F09%u896A%u5AA7%u8183%u5F4E%u7063%u9811%u842C%u7D08%u7DB0%u7DB2%u8F1E%u97CB%u9055%u570D%u70BA%u7232%u6FF0%u7DAD%u8466%u5049%u507D%u7DEF%u8B02%u885B%u8AC9%u5E43%u95C8%u6E88%u6F7F%u744B%u97D9%u7152%u9BAA%u6EAB%u805E%u7D0B%u7A69%u554F%u95BF%u7515%u64BE%u8778%u6E26%u7AA9%u81E5%u8435%u9F77%u55DA%u93A2%u70CF%u8AA3%u7121%u856A%u5433%u5862%u9727%u52D9%u8AA4%u9114%u5EE1%u61AE%u5AF5%u9A16%u9D61%u9DA9%u932B%u72A7%u8972%u7FD2%u9291%u6232%u7D30%u993C%u9B29%u74BD%u89A1%u8766%u8F44%u5CFD%u4FE0%u72F9%u5EC8%u5687%u7864%u9BAE%u7E96%u8CE2%u929C%u9591%u9592%u986F%u96AA%u73FE%u737B%u7E23%u9921%u7FA8%u61B2%u7DDA%u83A7%u859F%u861A%u5CF4%u736B%u5AFB%u9DF4%u7647%u8814%u79C8%u8E9A%u5EC2%u9472%u9109%u8A73%u97FF%u9805%u858C%u9909%u9A64%u7DD7%u9957%u856D%u56C2%u92B7%u66C9%u562F%u5635%u701F%u9A4D%u7D83%u689F%u7C2B%u5354%u633E%u651C%u8105%u8AE7%u5BEB%u7009%u8B1D%u893B%u64F7%u7D32%u7E88%u92C5%u91C1%u8208%u9658%u6ECE%u5147%u6D36%u92B9%u7E61%u9948%u9D42%u865B%u5653%u9808%u8A31%u6558%u7DD2%u7E8C%u8A61%u980A%u8ED2%u61F8%u9078%u766C%u7D62%u8AFC%u9249%u93C7%u5B78%u8B14%u6FA9%u9C48%u52DB%u8A62%u5C0B%u99B4%u8A13%u8A0A%u905C%u5864%u6F6F%u9C58%u58D3%u9D09%u9D28%u555E%u4E9E%u8A1D%u57E1%u5A6D%u690F%u6C2C%u95B9%u7159%u9E7D%u56B4%u5DD6%u984F%u95BB%u8277%u8C54%u53AD%u786F%u5F65%u8AFA%u9A57%u53B4%u8D17%u513C%u5157%u8B9E%u61E8%u9586%u91C5%u9B58%u995C%u9F34%u9D26%u694A%u63DA%u760D%u967D%u7662%u990A%u6A23%u716C%u7464%u6416%u582F%u9059%u7AAF%u8B20%u85E5%u8EFA%u9DC2%u9C29%u723A%u9801%u696D%u8449%u9768%u8B01%u9134%u66C4%u71C1%u91AB%u92A5%u9824%u907A%u5100%u87FB%u85DD%u5104%u61B6%u7FA9%u8A63%u8B70%u8ABC%u8B6F%u7570%u7E79%u8A52%u56C8%u5DA7%u98F4%u61CC%u9A5B%u7E0A%u8EFC%u8CBD%u91D4%u93B0%u943F%u761E%u8264%u852D%u9670%u9280%u98F2%u96B1%u92A6%u766E%u6AFB%u5B30%u9DF9%u61C9%u7E93%u7469%u87A2%u71DF%u7192%u8805%u8D0F%u7A4E%u584B%u9DAF%u7E08%u93A3%u6516%u56B6%u7005%u7020%u74D4%u9E1A%u766D%u9826%u7F4C%u55B2%u64C1%u50AD%u7670%u8E34%u8A60%u93DE%u512A%u6182%u90F5%u923E%u7336%u8A98%u8555%u92AA%u9B77%u8F3F%u9B5A%u6F01%u5A1B%u8207%u5DBC%u8A9E%u7344%u8B7D%u9810%u99AD%u50B4%u4FC1%u8ADB%u8AED%u8577%u5D33%u98EB%u95BE%u5AD7%u7D06%u89A6%u6B5F%u923A%u9D52%u9DF8%u9F6C%u9D1B%u6DF5%u8F45%u5712%u54E1%u5713%u7DE3%u9060%u6ADE%u9CF6%u9EFF%u7D04%u8E8D%u9470%u7CB5%u6085%u95B1%u925E%u9116%u52FB%u9695%u904B%u860A%u919E%u6688%u97FB%u9106%u8553%u60F2%u614D%u7D1C%u97DE%u6B9E%u6C33%u96DC%u707D%u8F09%u6522%u66AB%u8D0A%u74DA%u8DB2%u93E8%u8D13%u9AD2%u81DF%u99D4%u947F%u68D7%u8CAC%u64C7%u5247%u6FA4%u8CFE%u5616%u5E58%u7C00%u8CCA%u8B56%u8D08%u7D9C%u7E52%u8ECB%u9358%u9598%u67F5%u8A50%u9F4B%u50B5%u6C08%u76DE%u65AC%u8F3E%u5D84%u68E7%u6230%u7DBB%u8B6B%u5F35%u6F32%u5E33%u8CEC%u8139%u8D99%u8A54%u91D7%u87C4%u8F4D%u937A%u9019%u8B2B%u8F12%u9DD3%u8C9E%u91DD%u5075%u8A3A%u93AE%u9663%u6E5E%u7E1D%u6968%u8EEB%u8CD1%u798E%u9D06%u6399%u775C%u7319%u722D%u5E40%u7665%u912D%u8B49%u8ACD%u5D22%u9266%u931A%u7B8F%u7E54%u8077%u57F7%u7D19%u646F%u64F2%u5E5F%u8CEA%u6EEF%u9A2D%u6ADB%u6894%u8EF9%u8F0A%u8D04%u9DD9%u8784%u7E36%u8E93%u8E91%u89F6%u9418%u7D42%u7A2E%u816B%u773E%u937E%u8B05%u8EF8%u76BA%u665D%u9A5F%u7D02%u7E10%u8C6C%u8AF8%u8A85%u71ED%u77DA%u56D1%u8CAF%u9444%u99D0%u4F47%u6AE7%u9296%u5C08%u78DA%u8F49%u8CFA%u56C0%u994C%u9873%u6A01%u838A%u88DD%u599D%u58EF%u72C0%u9310%u8D05%u589C%u7DB4%u9A05%u7E0B%u8AC4%u6E96%u8457%u6FC1%u8AD1%u9432%u8332%u8CC7%u6F2C%u8AEE%u7DC7%u8F1C%u8CB2%u7725%u9319%u9F5C%u9BD4%u8E64%u7E3D%u7E31%u50AF%u9112%u8ACF%u9A36%u9BEB%u8A5B%u7D44%u93C3%u9246%u7E98%u8EA6%u9C52%u7FFA%u4F75%u4E26%u8514%u6C88%u919C%u6FB1%u9B25%u7BC4%u5E79%u81EF%u77FD%u6AC3%u5F8C%u5925%u7A2D%u5091%u8A23%u8A87%u88CF%u6DE9%u9EF4%u649A%u6DD2%u6261%u8056%u5C4D%u64E1%u5857%u7AAA%u9935%u6C59%u9341%u9E79%u880D%u5F5C%u6E67%u904A%u7C72%u79A6%u9858%u5DBD%u96F2%u7AC8%u7D2E%u5284%u7BC9%u65BC%u8A8C%u8A3B%u96D5%u8A01%u8B7E%u90E4%u6C39%u962A%u58DF%u5816%u57B5%u588A%u6ABE%u8552%u8464%u84E7%u8493%u83C7%u69C1%u6463%u54A4%u551A%u54E2%u565D%u5645%u6485%u5288%u8B14%u8946%u5DB4%u810A%u50E5%u7341%u9E85%u9918%u9937%u994A%u9962%u695E%u6035%u61CD%u723F%u6F35%u7069%u6FEB%u7026%u6DE1%u5BE7%u7CF8%u7D5D%u7DD4%u7449%u6898%u68EC%u6A70%u6AEB%u8EF2%u8EE4%u8CEB%u8181%u8156%u98C8%u7CCA%u7146%u6E9C%u6E63%u78B8%u6EFE%u7798%u9208%u9255%u92E3%u92B1%u92E5%u92F6%u9426%u9427%u9369%u9340%u9343%u9307%u9384%u9387%u93BF%u941D%u9465%u9479%u9454%u7A6D%u9D93%u9DA5%u9E0C%u7667%u5C59%u7602%u81D2%u8947%u7E48%u802E%u986C%u87CE%u9EAF%u9B81%u9B83%u9B8E%u9BD7%u9BDD%u9BF4%u9C5D%u9BFF%u9C20%u9C35%u9C45%u97BD%u97DD%u9F47%u8E2B%u7526%u6DE8%u7246%u80C7%u6046%u672E%u6AFA%u75FA%u7921%u6AB7%u7955%u7D5B%u5191%u866F%u8837%u8949%u8A3C%u9451%u947D%u93FD%u9394%u965D%u98E2%u9C4D%u88FD%u6BAD%u7343%u5FB5%u5690%u7652%u8B41%u7260%u617E%u8216%u7E6B%u4FC2%u88E1%u63A1%u95E2%u9B31%u4F48%u4F54%u771E%u9031%u9EB5%u95C6");
//对应的简体字
var jianti = unescape("%u9515%u7691%u853C%u788D%u7231%u55F3%u5AD2%u7477%u66A7%u972D%u8C19%u94F5%u9E4C%u80AE%u8884%u5965%u5AAA%u9A9C%u9CCC%u575D%u7F62%u94AF%u6446%u8D25%u5457%u9881%u529E%u7ECA%u94A3%u5E2E%u7ED1%u9551%u8C24%u5265%u9971%u5B9D%u62A5%u9C8D%u9E28%u9F85%u8F88%u8D1D%u94A1%u72C8%u5907%u60EB%u9E4E%u8D32%u951B%u7EF7%u7B14%u6BD5%u6BD9%u5E01%u95ED%u835C%u54D4%u6ED7%u94CB%u7B5A%u8DF8%u8FB9%u7F16%u8D2C%u53D8%u8FA9%u8FAB%u82C4%u7F0F%u7B3E%u6807%u9AA0%u98D1%u98D9%u9556%u9573%u9CD4%u9CD6%u522B%u762A%u6FD2%u6EE8%u5BBE%u6448%u50A7%u7F24%u69DF%u6BA1%u8191%u9554%u9ACC%u9B13%u997C%u7980%u62E8%u94B5%u94C2%u9A73%u997D%u94B9%u9E41%u8865%u94B8%u8D22%u53C2%u8695%u6B8B%u60ED%u60E8%u707F%u9A96%u9EEA%u82CD%u8231%u4ED3%u6CA7%u5395%u4FA7%u518C%u6D4B%u607B%u5C42%u8BE7%u9538%u4FAA%u9497%u6400%u63BA%u8749%u998B%u8C17%u7F20%u94F2%u4EA7%u9610%u98A4%u5181%u8C04%u8C36%u8487%u5FCF%u5A75%u9AA3%u89C7%u7985%u9561%u573A%u5C1D%u957F%u507F%u80A0%u5382%u7545%u4F25%u82CC%u6005%u960A%u9CB3%u949E%u8F66%u5F7B%u7817%u5C18%u9648%u886C%u4F27%u8C0C%u6987%u789C%u9F80%u6491%u79F0%u60E9%u8BDA%u9A8B%u67A8%u67FD%u94D6%u94DB%u75F4%u8FDF%u9A70%u803B%u9F7F%u70BD%u996C%u9E31%u51B2%u51B2%u866B%u5BA0%u94F3%u7574%u8E0C%u7B79%u7EF8%u4FE6%u5E31%u96E0%u6A71%u53A8%u9504%u96CF%u7840%u50A8%u89E6%u5904%u520D%u7ECC%u8E70%u4F20%u948F%u75AE%u95EF%u521B%u6006%u9524%u7F0D%u7EAF%u9E51%u7EF0%u8F8D%u9F8A%u8F9E%u8BCD%u8D50%u9E5A%u806A%u8471%u56F1%u4ECE%u4E1B%u82C1%u9AA2%u679E%u51D1%u8F8F%u8E7F%u7A9C%u64BA%u9519%u9509%u9E7E%u8FBE%u54D2%u9791%u5E26%u8D37%u9A80%u7ED0%u62C5%u5355%u90F8%u63B8%u80C6%u60EE%u8BDE%u5F39%u6B9A%u8D55%u7605%u7BAA%u5F53%u6321%u515A%u8361%u6863%u8C20%u7800%u88C6%u6363%u5C9B%u7977%u5BFC%u76D7%u7118%u706F%u9093%u956B%u654C%u6DA4%u9012%u7F14%u7C74%u8BCB%u8C1B%u7EE8%u89CC%u955D%u98A0%u70B9%u57AB%u7535%u5DC5%u94BF%u766B%u9493%u8C03%u94EB%u9CB7%u8C0D%u53E0%u9CBD%u9489%u9876%u952D%u8BA2%u94E4%u4E22%u94E5%u4E1C%u52A8%u680B%u51BB%u5CBD%u9E2B%u7AA6%u728A%u72EC%u8BFB%u8D4C%u9540%u6E0E%u691F%u724D%u7B03%u9EE9%u953B%u65AD%u7F0E%u7C16%u5151%u961F%u5BF9%u603C%u9566%u5428%u987F%u949D%u7096%u8DB8%u593A%u5815%u94CE%u9E45%u989D%u8BB9%u6076%u997F%u8C14%u57A9%u960F%u8F6D%u9507%u9537%u9E57%u989A%u989B%u9CC4%u8BF6%u513F%u5C14%u9975%u8D30%u8FE9%u94D2%u9E38%u9C95%u53D1%u7F5A%u9600%u73D0%u77FE%u9492%u70E6%u8D29%u996D%u8BBF%u7EBA%u94AB%u9C82%u98DE%u8BFD%u5E9F%u8D39%u7EEF%u9544%u9CB1%u7EB7%u575F%u594B%u6124%u7CAA%u507E%u4E30%u67AB%u950B%u98CE%u75AF%u51AF%u7F1D%u8BBD%u51E4%u6CA3%u80A4%u8F90%u629A%u8F85%u8D4B%u590D%u590D%u8D1F%u8BA3%u5987%u7F1A%u51EB%u9A78%u7EC2%u7ECB%u8D59%u9EB8%u9C8B%u9CC6%u9486%u8BE5%u9499%u76D6%u8D45%u6746%u8D76%u79C6%u8D63%u5C34%u64C0%u7EC0%u5188%u521A%u94A2%u7EB2%u5C97%u6206%u9550%u777E%u8BF0%u7F1F%u9506%u6401%u9E3D%u9601%u94EC%u4E2A%u7EA5%u9549%u988D%u7ED9%u4E98%u8D53%u7EE0%u9CA0%u9F9A%u5BAB%u5DE9%u8D21%u94A9%u6C9F%u82DF%u6784%u8D2D%u591F%u8BDF%u7F11%u89CF%u86CA%u987E%u8BC2%u6BC2%u94B4%u9522%u9E2A%u9E44%u9E58%u5250%u6302%u9E39%u63B4%u5173%u89C2%u9986%u60EF%u8D2F%u8BD6%u63BC%u9E73%u9CCF%u5E7F%u72B7%u89C4%u5F52%u9F9F%u95FA%u8F68%u8BE1%u8D35%u523D%u5326%u523F%u59AB%u6867%u9C91%u9CDC%u8F8A%u6EDA%u886E%u7EF2%u9CA7%u9505%u56FD%u8FC7%u57DA%u5459%u5E3C%u6901%u8748%u94EA%u9A87%u97E9%u6C49%u961A%u7ED7%u9889%u53F7%u704F%u98A2%u9602%u9E64%u8D3A%u8BC3%u9616%u86CE%u6A2A%u8F70%u9E3F%u7EA2%u9EC9%u8BA7%u836D%u95F3%u9C8E%u58F6%u62A4%u6CAA%u6237%u6D52%u9E55%u54D7%u534E%u753B%u5212%u8BDD%u9A85%u6866%u94E7%u6000%u574F%u6B22%u73AF%u8FD8%u7F13%u6362%u5524%u75EA%u7115%u6DA3%u5942%u7F33%u953E%u9CA9%u9EC4%u8C0E%u9CC7%u6325%u8F89%u6BC1%u8D3F%u79FD%u4F1A%u70E9%u6C47%u6C47%u8BB3%u8BF2%u7ED8%u8BD9%u835F%u54D5%u6D4D%u7F0B%u73F2%u6656%u8364%u6D51%u8BE8%u9984%u960D%u83B7%u8D27%u7978%u94AC%u956C%u51FB%u673A%u79EF%u9965%u8FF9%u8BA5%u9E21%u7EE9%u7F09%u6781%u8F91%u7EA7%u6324%u51E0%u84DF%u5242%u6D4E%u8BA1%u8BB0%u9645%u7EE7%u7EAA%u8BA6%u8BD8%u8360%u53FD%u54DC%u9AA5%u7391%u89CA%u9F51%u77F6%u7F81%u867F%u8DFB%u9701%u9C9A%u9CAB%u5939%u835A%u988A%u8D3E%u94BE%u4EF7%u9A7E%u90CF%u6D43%u94D7%u9553%u86F2%u6B7C%u76D1%u575A%u7B3A%u95F4%u8270%u7F04%u8327%u68C0%u78B1%u7877%u62E3%u6361%u7B80%u4FED%u51CF%u8350%u69DB%u9274%u8DF5%u8D31%u89C1%u952E%u8230%u5251%u996F%u6E10%u6E85%u6DA7%u8C0F%u7F23%u620B%u622C%u7751%u9E63%u7B15%u9CA3%u97AF%u5C06%u6D46%u848B%u6868%u5956%u8BB2%u9171%u7EDB%u7F30%u80F6%u6D47%u9A84%u5A07%u6405%u94F0%u77EB%u4FA5%u811A%u997A%u7F34%u7EDE%u8F7F%u8F83%u6322%u5CE4%u9E6A%u9C9B%u9636%u8282%u6D01%u7ED3%u8BEB%u5C4A%u7596%u988C%u9C92%u7D27%u9526%u4EC5%u8C28%u8FDB%u664B%u70EC%u5C3D%u5C3D%u52B2%u8346%u830E%u537A%u8369%u9991%u7F19%u8D46%u89D0%u9CB8%u60CA%u7ECF%u9888%u9759%u955C%u5F84%u75C9%u7ADE%u51C0%u522D%u6CFE%u8FF3%u5F2A%u80EB%u9753%u7EA0%u53A9%u65E7%u9604%u9E20%u9E6B%u9A79%u4E3E%u636E%u952F%u60E7%u5267%u8BB5%u5C66%u6989%u98D3%u949C%u9514%u7AAD%u9F83%u9E43%u7EE2%u9529%u954C%u96BD%u89C9%u51B3%u7EDD%u8C32%u73CF%u94A7%u519B%u9A8F%u76B2%u5F00%u51EF%u5240%u57B2%u5FFE%u607A%u94E0%u9534%u9F9B%u95F6%u94AA%u94D0%u9897%u58F3%u8BFE%u9A92%u7F02%u8F72%u94B6%u951E%u9894%u57A6%u6073%u9F88%u94FF%u62A0%u5E93%u88E4%u55BE%u5757%u4FA9%u90D0%u54D9%u810D%u5BBD%u72EF%u9ACB%u77FF%u65F7%u51B5%u8BD3%u8BF3%u909D%u5739%u7EA9%u8D36%u4E8F%u5CBF%u7AA5%u9988%u6E83%u532E%u8489%u6126%u8069%u7BD1%u9603%u951F%u9CB2%u6269%u9614%u86F4%u8721%u814A%u83B1%u6765%u8D56%u5D03%u5F95%u6D9E%u6FD1%u8D49%u7750%u94FC%u765E%u7C41%u84DD%u680F%u62E6%u7BEE%u9611%u5170%u6F9C%u8C30%u63FD%u89C8%u61D2%u7F06%u70C2%u6EE5%u5C9A%u6984%u6593%u9567%u8934%u7405%u9606%u9512%u635E%u52B3%u6D9D%u5520%u5D02%u94D1%u94F9%u75E8%u4E50%u9CD3%u956D%u5792%u7C7B%u6CEA%u8BD4%u7F27%u7BF1%u72F8%u79BB%u9CA4%u793C%u4E3D%u5389%u52B1%u783E%u5386%u5386%u6CA5%u96B6%u4FEA%u90E6%u575C%u82C8%u8385%u84E0%u5456%u9026%u9A8A%u7F21%u67A5%u680E%u8F79%u783A%u9502%u9E42%u75A0%u7C9D%u8DDE%u96F3%u9CA1%u9CE2%u4FE9%u8054%u83B2%u8FDE%u9570%u601C%u6D9F%u5E18%u655B%u8138%u94FE%u604B%u70BC%u7EC3%u8539%u5941%u6F4B%u740F%u6B93%u88E2%u88E3%u9CA2%u7CAE%u51C9%u4E24%u8F86%u8C05%u9B49%u7597%u8FBD%u9563%u7F2D%u948C%u9E69%u730E%u4E34%u90BB%u9CDE%u51DB%u8D41%u853A%u5EEA%u6AA9%u8F9A%u8E8F%u9F84%u94C3%u7075%u5CAD%u9886%u7EEB%u68C2%u86CF%u9CAE%u998F%u5218%u6D4F%u9A9D%u7EFA%u954F%u9E68%u9F99%u804B%u5499%u7B3C%u5784%u62E2%u9647%u830F%u6CF7%u73D1%u680A%u80E7%u783B%u697C%u5A04%u6402%u7BD3%u507B%u848C%u55BD%u5D5D%u9542%u7618%u8027%u877C%u9AC5%u82A6%u5362%u9885%u5E90%u7089%u63B3%u5364%u864F%u9C81%u8D42%u7984%u5F55%u9646%u5786%u64B8%u565C%u95FE%u6CF8%u6E0C%u680C%u6A79%u8F73%u8F82%u8F98%u6C07%u80EA%u9E2C%u9E6D%u823B%u9C88%u5CE6%u631B%u5B6A%u6EE6%u4E71%u8114%u5A08%u683E%u9E3E%u92AE%u62A1%u8F6E%u4F26%u4ED1%u6CA6%u7EB6%u8BBA%u56F5%u841D%u7F57%u903B%u9523%u7BA9%u9AA1%u9A86%u7EDC%u8366%u7321%u6CFA%u6924%u8136%u9559%u9A74%u5415%u94DD%u4FA3%u5C61%u7F15%u8651%u6EE4%u7EFF%u6988%u891B%u950A%u5452%u5988%u739B%u7801%u8682%u9A6C%u9A82%u5417%u551B%u5B37%u6769%u4E70%u9EA6%u5356%u8FC8%u8109%u52A2%u7792%u9992%u86EE%u6EE1%u8C29%u7F26%u9558%u98A1%u9CD7%u732B%u951A%u94C6%u8D38%u4E48%u4E48%u6CA1%u9541%u95E8%u95F7%u4EEC%u626A%u7116%u61D1%u9494%u9530%u68A6%u772F%u8C1C%u5F25%u89C5%u5E42%u8288%u8C27%u7315%u7962%u7EF5%u7F05%u6E11%u817C%u9EFE%u5E99%u7F08%u7F2A%u706D%u60AF%u95FD%u95F5%u7F17%u9E23%u94ED%u8C2C%u8C1F%u84E6%u998D%u6B81%u9546%u8C0B%u4EA9%u94BC%u5450%u94A0%u7EB3%u96BE%u6320%u8111%u607C%u95F9%u94D9%u8BB7%u9981%u5185%u62DF%u817B%u94CC%u9CB5%u64B5%u8F87%u9CB6%u917F%u9E1F%u8311%u8885%u8042%u556E%u954A%u954D%u9667%u8616%u55EB%u989F%u8E51%u67E0%u72DE%u5B81%u62E7%u6CDE%u82CE%u549B%u804D%u94AE%u7EBD%u8113%u6D53%u519C%u4FAC%u54DD%u9A7D%u9495%u8BFA%u50A9%u759F%u6B27%u9E25%u6BB4%u5455%u6CA4%u8BB4%u6004%u74EF%u76D8%u8E52%u5E9E%u629B%u75B1%u8D54%u8F94%u55B7%u9E4F%u7EB0%u7F74%u94CD%u9A97%u8C1D%u9A88%u98D8%u7F25%u9891%u8D2B%u5AD4%u82F9%u51ED%u8BC4%u6CFC%u9887%u948B%u6251%u94FA%u6734%u8C31%u9564%u9568%u6816%u8110%u9F50%u9A91%u5C82%u542F%u6C14%u5F03%u8BAB%u8572%u9A90%u7EEE%u6864%u789B%u9880%u9883%u9CCD%u7275%u948E%u94C5%u8FC1%u7B7E%u7B7E%u8C26%u94B1%u94B3%u6F5C%u6D45%u8C34%u5811%u4F65%u8368%u60AD%u9A9E%u7F31%u6920%u94A4%u67AA%u545B%u5899%u8537%u5F3A%u62A2%u5AF1%u6A2F%u6217%u709D%u9516%u9535%u956A%u7F9F%u8DC4%u9539%u6865%u4E54%u4FA8%u7FD8%u7A8D%u8BEE%u8C2F%u835E%u7F32%u7857%u8DF7%u7A83%u60EC%u9532%u7BA7%u94A6%u4EB2%u5BDD%u9513%u8F7B%u6C22%u503E%u9877%u8BF7%u5E86%u63FF%u9CAD%u743C%u7A77%u8315%u86F1%u5DEF%u8D47%u866E%u9CC5%u8D8B%u533A%u8EAF%u9A71%u9F8B%u8BCE%u5C96%u9612%u89D1%u9E32%u98A7%u6743%u529D%u8BE0%u7EFB%u8F81%u94E8%u5374%u9E4A%u786E%u9615%u9619%u60AB%u8BA9%u9976%u6270%u7ED5%u835B%u5A06%u6861%u70ED%u97E7%u8BA4%u7EAB%u996A%u8F6B%u8363%u7ED2%u5D58%u877E%u7F1B%u94F7%u98A6%u8F6F%u9510%u86AC%u95F0%u6DA6%u6D12%u8428%u98D2%u9CC3%u8D5B%u4F1E%u6BF5%u7CC1%u4E27%u9A9A%u626B%u7F2B%u6DA9%u556C%u94EF%u7A51%u6740%u5239%u7EB1%u94E9%u9CA8%u7B5B%u6652%u917E%u5220%u95EA%u9655%u8D61%u7F2E%u8BAA%u59D7%u9A9F%u9490%u9CDD%u5892%u4F24%u8D4F%u57A7%u6B87%u89DE%u70E7%u7ECD%u8D4A%u6444%u6151%u8BBE%u538D%u6EE0%u7572%u7EC5%u5BA1%u5A76%u80BE%u6E17%u8BDC%u8C02%u6E16%u58F0%u7EF3%u80DC%u5E08%u72EE%u6E7F%u8BD7%u65F6%u8680%u5B9E%u8BC6%u9A76%u52BF%u9002%u91CA%u9970%u89C6%u8BD5%u8C25%u57D8%u83B3%u5F11%u8F7C%u8D33%u94C8%u9CA5%u5BFF%u517D%u7EF6%u67A2%u8F93%u4E66%u8D4E%u5C5E%u672F%u6811%u7AD6%u6570%u6445%u7EBE%u5E05%u95E9%u53CC%u8C01%u7A0E%u987A%u8BF4%u7855%u70C1%u94C4%u4E1D%u9972%u53AE%u9A77%u7F0C%u9536%u9E36%u8038%u6002%u9882%u8BBC%u8BF5%u64DE%u85AE%u998A%u98D5%u953C%u82CF%u8BC9%u8083%u8C21%u7A23%u867D%u968F%u7EE5%u5C81%u8C07%u5B59%u635F%u7B0B%u836A%u72F2%u7F29%u7410%u9501%u5522%u7743%u736D%u631E%u95FC%u94CA%u9CCE%u53F0%u6001%u949B%u9C90%u644A%u8D2A%u762B%u6EE9%u575B%u8C2D%u8C08%u53F9%u6619%u94BD%u952C%u9878%u6C64%u70EB%u50A5%u9967%u94F4%u9557%u6D9B%u7EE6%u8BA8%u97EC%u94FD%u817E%u8A8A%u9511%u9898%u4F53%u5C49%u7F07%u9E48%u9617%u6761%u7C9C%u9F86%u9CA6%u8D34%u94C1%u5385%u542C%u70C3%u94DC%u7EDF%u6078%u5934%u94AD%u79C3%u56FE%u948D%u56E2%u629F%u9893%u8715%u9968%u8131%u9E35%u9A6E%u9A7C%u692D%u7BA8%u9F0D%u889C%u5A32%u817D%u5F2F%u6E7E%u987D%u4E07%u7EA8%u7EFE%u7F51%u8F8B%u97E6%u8FDD%u56F4%u4E3A%u4E3A%u6F4D%u7EF4%u82C7%u4F1F%u4F2A%u7EAC%u8C13%u536B%u8BFF%u5E0F%u95F1%u6CA9%u6DA0%u73AE%u97EA%u709C%u9C94%u6E29%u95FB%u7EB9%u7A33%u95EE%u960C%u74EE%u631D%u8717%u6DA1%u7A9D%u5367%u83B4%u9F8C%u545C%u94A8%u4E4C%u8BEC%u65E0%u829C%u5434%u575E%u96FE%u52A1%u8BEF%u90AC%u5E91%u6003%u59A9%u9A9B%u9E49%u9E5C%u9521%u727A%u88AD%u4E60%u94E3%u620F%u7EC6%u9969%u960B%u73BA%u89CB%u867E%u8F96%u5CE1%u4FA0%u72ED%u53A6%u5413%u7856%u9C9C%u7EA4%u8D24%u8854%u95F2%u95F2%u663E%u9669%u73B0%u732E%u53BF%u9985%u7FA1%u5BAA%u7EBF%u82CB%u83B6%u85D3%u5C98%u7303%u5A34%u9E47%u75EB%u869D%u7C7C%u8DF9%u53A2%u9576%u4E61%u8BE6%u54CD%u9879%u8297%u9977%u9AA7%u7F03%u98E8%u8427%u56A3%u9500%u6653%u5578%u54D3%u6F47%u9A81%u7EE1%u67AD%u7BAB%u534F%u631F%u643A%u80C1%u8C10%u5199%u6CFB%u8C22%u4EB5%u64B7%u7EC1%u7F2C%u950C%u8845%u5174%u9649%u8365%u51F6%u6C79%u9508%u7EE3%u9990%u9E3A%u865A%u5618%u987B%u8BB8%u53D9%u7EEA%u7EED%u8BE9%u987C%u8F69%u60AC%u9009%u7663%u7EDA%u8C16%u94C9%u955F%u5B66%u8C11%u6CF6%u9CD5%u52CB%u8BE2%u5BFB%u9A6F%u8BAD%u8BAF%u900A%u57D9%u6D54%u9C9F%u538B%u9E26%u9E2D%u54D1%u4E9A%u8BB6%u57AD%u5A05%u6860%u6C29%u9609%u70DF%u76D0%u4E25%u5CA9%u989C%u960E%u8273%u8273%u538C%u781A%u5F66%u8C1A%u9A8C%u53A3%u8D5D%u4FE8%u5156%u8C33%u6079%u95EB%u917D%u9B47%u990D%u9F39%u9E2F%u6768%u626C%u75A1%u9633%u75D2%u517B%u6837%u7080%u7476%u6447%u5C27%u9065%u7A91%u8C23%u836F%u8F7A%u9E5E%u9CD0%u7237%u9875%u4E1A%u53F6%u9765%u8C12%u90BA%u6654%u70E8%u533B%u94F1%u9890%u9057%u4EEA%u8681%u827A%u4EBF%u5FC6%u4E49%u8BE3%u8BAE%u8C0A%u8BD1%u5F02%u7ECE%u8BD2%u5453%u5CC4%u9974%u603F%u9A7F%u7F22%u8F76%u8D3B%u9487%u9552%u9571%u7617%u8223%u836B%u9634%u94F6%u996E%u9690%u94DF%u763E%u6A31%u5A74%u9E70%u5E94%u7F28%u83B9%u8424%u8425%u8367%u8747%u8D62%u9896%u8314%u83BA%u8426%u84E5%u6484%u5624%u6EE2%u6F46%u748E%u9E66%u763F%u988F%u7F42%u54DF%u62E5%u4F63%u75C8%u8E0A%u548F%u955B%u4F18%u5FE7%u90AE%u94C0%u72B9%u8BF1%u83B8%u94D5%u9C7F%u8206%u9C7C%u6E14%u5A31%u4E0E%u5C7F%u8BED%u72F1%u8A89%u9884%u9A6D%u4F1B%u4FE3%u8C00%u8C15%u84E3%u5D5B%u996B%u9608%u59AA%u7EA1%u89CE%u6B24%u94B0%u9E46%u9E6C%u9F89%u9E33%u6E0A%u8F95%u56ED%u5458%u5706%u7F18%u8FDC%u6A7C%u9E22%u9F0B%u7EA6%u8DC3%u94A5%u7CA4%u60A6%u9605%u94BA%u90E7%u5300%u9668%u8FD0%u8574%u915D%u6655%u97F5%u90D3%u82B8%u607D%u6120%u7EAD%u97EB%u6B92%u6C32%u6742%u707E%u8F7D%u6512%u6682%u8D5E%u74D2%u8DB1%u933E%u8D43%u810F%u810F%u9A75%u51FF%u67A3%u8D23%u62E9%u5219%u6CFD%u8D5C%u5567%u5E3B%u7BA6%u8D3C%u8C2E%u8D60%u7EFC%u7F2F%u8F67%u94E1%u95F8%u6805%u8BC8%u658B%u503A%u6BE1%u76CF%u65A9%u8F97%u5D2D%u6808%u6218%u7EFD%u8C35%u5F20%u6DA8%u5E10%u8D26%u80C0%u8D75%u8BCF%u948A%u86F0%u8F99%u9517%u8FD9%u8C2A%u8F84%u9E67%u8D1E%u9488%u4FA6%u8BCA%u9547%u9635%u6D48%u7F1C%u6862%u8F78%u8D48%u796F%u9E29%u6323%u7741%u72F0%u4E89%u5E27%u75C7%u90D1%u8BC1%u8BE4%u5CE5%u94B2%u94EE%u7B5D%u7EC7%u804C%u6267%u7EB8%u631A%u63B7%u5E1C%u8D28%u6EDE%u9A98%u6809%u6800%u8F75%u8F7E%u8D3D%u9E37%u86F3%u7D77%u8E2C%u8E2F%u89EF%u949F%u7EC8%u79CD%u80BF%u4F17%u953A%u8BCC%u8F74%u76B1%u663C%u9AA4%u7EA3%u7EC9%u732A%u8BF8%u8BDB%u70DB%u77A9%u5631%u8D2E%u94F8%u9A7B%u4F2B%u69E0%u94E2%u4E13%u7816%u8F6C%u8D5A%u556D%u9994%u989E%u6869%u5E84%u88C5%u5986%u58EE%u72B6%u9525%u8D58%u5760%u7F00%u9A93%u7F12%u8C06%u51C6%u7740%u6D4A%u8BFC%u956F%u5179%u8D44%u6E0D%u8C18%u7F01%u8F8E%u8D40%u7726%u9531%u9F87%u9CBB%u8E2A%u603B%u7EB5%u506C%u90B9%u8BF9%u9A7A%u9CB0%u8BC5%u7EC4%u955E%u94BB%u7F35%u8E9C%u9CDF%u7FF1%u5E76%u5E76%u535C%u6C88%u4E11%u6DC0%u6597%u8303%u5E72%u768B%u7845%u67DC%u540E%u4F19%u79F8%u6770%u8BC0%u5938%u91CC%u51CC%u9709%u637B%u51C4%u6266%u5723%u5C38%u62AC%u6D82%u6D3C%u5582%u6C61%u9528%u54B8%u874E%u5F5D%u6D8C%u6E38%u5401%u5FA1%u613F%u5CB3%u4E91%u7076%u624E%u672D%u7B51%u4E8E%u5FD7%u6CE8%u96D5%u8BA0%u8C2B%u90C4%u51FC%u5742%u5785%u57B4%u57EF%u57DD%u82D8%u836C%u836E%u839C%u83BC%u83F0%u85C1%u63F8%u5412%u5423%u5494%u549D%u54B4%u5658%u567C%u56AF%u5E5E%u5C99%u5D74%u5FBC%u72B8%u72CD%u9980%u9987%u9993%u9995%u6123%u61B7%u61D4%u4E2C%u6E86%u6EDF%u6F24%u6F74%u6FB9%u752F%u7E9F%u7ED4%u7EF1%u73C9%u67A7%u684A%u69D4%u6A65%u8F71%u8F77%u8D4D%u80B7%u80E8%u98DA%u7173%u7145%u7198%u610D%u781C%u78D9%u770D%u949A%u94B7%u94D8%u94DE%u9503%u950D%u950E%u950F%u9518%u951D%u952A%u952B%u953F%u9545%u954E%u9562%u9565%u9569%u9572%u7A06%u9E4B%u9E5B%u9E71%u75AC%u75B4%u75D6%u766F%u88E5%u8941%u8022%u98A5%u87A8%u9EB4%u9C85%u9C86%u9C87%u9C9E%u9CB4%u9CBA%u9CBC%u9CCA%u9CCB%u9CD8%u9CD9%u9792%u97B4%u9F44%u78B0%u82CF%u51C0%u5899%u5DEF%u6052%u672F%u68C2%u75F9%u7934%u7962%u79D8%u7EE6%u80C4%u866C%u883C%u88E5%u8BC1%u9274%u94BB%u9508%u9555%u9655%u9965%u9C85%u5236%u50F5%u5446%u5F81%u5C1D%u6108%u54D7%u5B83%u6B32%u94FA%u7CFB%u7CFB%u91CC%u91C7%u8F9F%u90C1%u5E03%u5360%u771F%u5468%u9762%u677F");
document.title = simplized(document.title);
try {
	findTextNode(document.documentElement);
} catch (e) {}
function findTextNode(o) {
	var obj = o.childNodes;
	var olen = obj.length;
	for (var i = 0; i < olen; i++) {
		if (obj[i].splitText)
			obj[i].data = simplized(obj[i].data);
		else if (obj[i].childNodes)
			findTextNode(obj[i]);
	}
}

function simplized(cc) {
	var str = "";
	var find;
	var clen = cc.length;
	for (var i = 0; i < clen; i++) {
		var ch = cc.charAt(i);
		var rerr = new RegExp("[^\x00-\xff]");
		if (ch.search(rerr) == -1)
			find = -1;
		else
			find = fanti.indexOf(ch);
		if (find != -1)
			str += jianti.charAt(find);
		else
			str += ch;
	}
	return str
}

//伊甸园电骡资源直接可用
if (lodex("www.sfileydy.com") != -1) {
	$('a').each(function () {
		this.href = unescape(this.href);
	});
}


//www.xvideos.com视频播放界面处置
if (lodex("www.xvideos.com/video") != -1) {
	$('td[valign="top"]:eq(1)').detach();
}

/***************以下为应用于SIS部分***************/
if (tidex("SexInSex") != -1 || tidex("SiS001!") != -1) {
	//旧地址换当前地址
	var yesorno = false;
	var allareas = ["文学作者区", "评论推荐区", "征文活动区", "文学交流区", "长篇连载区", "家庭乱伦区", "都市校园区", "原创人生区", "意淫强奸区", "武侠玄幻区", "明星校园区", "人妻女友区", "名家经典作品集"];
	for (s = 0; s < allareas.length; s++) {
		if (tidex(allareas[s]) != -1) {
			yesorno = true;
			break;
		}
	}
	if (yesorno) {
		var rer = new RegExp("http://.*?/");
		var myhost = window.location.href.match(rer)[0];
		$("a").each(function () {
			this.href = this.href.replace(rer, myhost);
		})
	}
	
	//帖子正文上方显示发贴者
	GM_addStyle('.postcontent>.postinfo{background:url("images/green/h1-bg.gif")}');
	var getAuthors = $('.postauthor>cite');
	$('.postcontent>.postinfo').html(function (s, w) {
		return w = "由 " + $(getAuthors[s]).text().bold() + " " + $(getAuthors[s]).nextAll('p:has(em)').text() + w;
	});
	
	//图区默认排序
	$('#css7_menu>li>a').each(function () {
		this.href += "&filter=0&orderby=dateline&ascdesc=DESC";
	});
	
	//自动感谢作者
	$('[onclick*="thanks.php"]').eq(0).click();
	
	//增加底部树链接
	var getPageBt2 = $('.postinfo.postactions')[0];
	var getPageBt = $('.pages_btns');
	var getAnchors = $("#nav").get(0);
	if (getAnchors.innerHTML.indexOf("版主") == -1 && getPageBt.length != 0) {
		var newDiv = getAnchors.cloneNode(true);
		newDiv.innerHTML += "<br>"
		$(newDiv).insertAfter(getPageBt[1]);
		
		if (getPageBt2 != null) {
			var newDiv2 = getAnchors.cloneNode(true);
			newDiv2.innerHTML += "<br>"
			$(newDiv2).insertBefore(getPageBt2);
		}
	}
}

//所有网页鼠标悬停显示图片信息
(function () {
	var URL_MAX_LENGTH = 100;
	var MIN_SIZE_DISPLAY = 1;
	var url;
	document.addEventListener('mouseover', function (e) {
		var tar = e.target;
		if (tar.nodeName.toLowerCase() == 'img') { //&& tar.src.indexOf("gif")==-1
			if (tar.naturalWidth > MIN_SIZE_DISPLAY || tar.naturalWidth == 0) {
				imgSize = "[ " + tar.naturalWidth + "×" + tar.naturalHeight + " ]";
				url = tar.src;
				if (tar.src.match("data:image")) {
					url = "(Base64 Image)";
				} else if (tar.src.length > URL_MAX_LENGTH) {
					var str = tar.src;
					url = str.substr(0, 50) + "..." + str.substr(str.length - 50, 50);
				}
				if (tar.title.indexOf("×") == -1) {
					tar.title = imgSize + ((tar.alt) ? ("[" + tar.alt + "]") : "") + "  -- " + url;
				}
			}
		}
		if (tar.nodeName.toLowerCase() == 'input' && tar.id != null && tar.id != "" && tar.title.indexOf("id=") == -1) {
			var temm = (tar.title) ? ("title=" + tar.title + "  ") : ("");
			tar.title = temm + "id=" + tar.id;
		}
	}, false);
})();

//土豆网式样应用
if (lodex("http://www.tudou.com/playlist/p/") != -1) {
	(function () {
		content.scrollTo(0, 37);
	})();
}
//joy网式样应用
if (lodex("http://you.joy.cn/video/") != -1) {
	(function () {
		content.scrollTo(0, 73);
	})();
}

//痴汉俱乐部应用
if (lodex("www.piring.com/bbs/tcn") != -1) {
	//自动感谢
	if (lodex("forumdisplay.php") != -1) {
		var lotD = new RegExp("\\d+");
		var fid = window.location.href.split("fid=")[1].match(lotD)[0];
		$('[href*="viewthread.php"]').click(function () {
			GM_log("开始运行自动感谢程序……");
			var wwe = this.href;
			var tid = wwe.split("tid=")[1].match(lotD)[0];
			var urll = "http://www.piring.com/bbs/tcn/bbs2methankyou.php?fid=" + fid + "&tid=" + tid + "&thankyousubmit=1";
			GM_xmlhttpRequest({
				method : 'POST',
				synchronous : true,
				url : urll,
				onload : function () {
					GM_log("自动感谢 ok!");
					window.location = wwe;
				}
			});
		})
	}
	//帖子正文上方显示发贴者
	if (lodex("viewthread.php") != -1) {
		var getAuthors = $('.postauthor>cite');
		$('.postcontent>.postinfo').html(function (s, w) {
			return w = "由 " + $(getAuthors[s]).text().bold() + " " + w;
		});
	}
}

/*****************18P2P自动感谢******************/
if (tidex("18P2P -") != -1) {
	//运行于帖子列表的部分
	if (lodex("forumdisplay.php") != -1) {
		//添加隔行颜色
		$('tr[valign="top"]>td').css({
			"border-bottom-style" : "solid",
			"border-width" : "1px",
			"border-color" : "#CCCCCC"
		});
		//添加返回树
		$('.mediumtxt>.smalltxt').eq(0).replaceWith($('.nav').get(0).cloneNode(true));
		GM_addStyle('.outertxt{background-color:#CCCCCC !important;}');
		//自动感谢
		var fid = window.location.href.split("fid=")[1].match(/\d+/)[0];
		$('[href*="viewthread.php"],[href*="redirect.php"]').click(function () {
			GM_log("开始运行自动感谢程序……")
			var formhash = $('[name="formhash"]').val();
			var wwe = this.href;
			var tid = wwe.split("tid=")[1].match(/\d+/)[0];
			var urll = wwe.match(/htt.*?(?=(viewthread|redirect))/)[0] + "thankyou.php?fid=" + fid + "&tid=" + tid + "&thankyousubmit=1&formhash=" + formhash + "&reason=";
			GM_xmlhttpRequest({
				method : 'POST',
				synchronous : true,
				url : urll,
				onload : function () {
					GM_log("自动感谢 ok!");
					window.location = wwe;
				}
			})
		})
	}
	//帖子内运行的部分
	if (lodex("viewthread.php") != -1 || lodex("redirect.php") != -1) {
		//删除签名档上方空白
		//$('td[valign="bottom"]').removeAttr("style");
		//删除引用区上方空白
		$('[valign="top"]>p').each(function () {
			if ($(this).text().match(/.+/) == null) {
				$(this).detach();
			}
		})
		//帖子下方添加返回列表树
		if ($('.smalltxt>table').length != 0) {
			$('tr[valign="top"]>td:first').replaceWith($('.smalltxt>table').get(0).cloneNode(true));
			$('table:has(.nav)').clone().insertAfter($('table:has(tr[valign="top"])'));
		} else {
			$('.nav').clone().appendTo($('tr[valign="top"]>td:first'));
			GM_addStyle('tr[valign="top"]{background-color:#CCCCCC !important;line-height:0px !important;}');
		};
		//帖子正文上方显示发贴者
		var levels = $('fieldset>span').text().match(/等级.(\d+)?.*职业/g);
		var number = $('fieldset>span').text().match(/总分.-?\d+/g);
		var money = $('fieldset>span').text().match(/金币.\d+/g);
		var tables = $('fieldset>span').text().match(/贴子.\d+/g);
		var suppor = $('fieldset>span').text().match(/支持.\d+/g);
		var getAllTac = $('legend');
		var getAllTop = $('td[class^="altbg"]>table [colspan="2"]:not([valign="bottom"]');
		for (w = 0; w < getAllTac.length; w++) {
			if ($(getAllTac[w]).text().indexOf("该用户已被删除") != -1) {
				levels.splice(w, 0, "删号");
				number.splice(w, 0, "0");
				money.splice(w, 0, "0");
				tables.splice(w, 0, "0");
				suppor.splice(w, 0, "0");
			}
			getAllTop[w].insertBefore($("<font>", {
					color : "#000000",
					html : "&nbsp;&nbsp;&nbsp;由 " + $(getAllTac[w]).text().trim().match(/.*/)[0].bold() + "（" + levels[w].replace(/等级|职业/g, "").trim() + "|" + number[w].match(/-?\d+/)[0] + "分|" + money[w].match(/-?\d+/)[0] + "金|" + tables[w].match(/\d+/)[0] + "帖|" + suppor[w].match(/\d+/)[0] + "谢） 发表于 "
				}).get(0), getAllTop[w].childNodes[3])
		}
		//一键感谢
		var formhash = $('[name="formhash"]').val();
		var mainurl = $('[href*="thankyou.php"]')[0].href;
		$('[href*="thankyou.php"]:has(img)').attr({
			"href" : ""
		}).click(function () {
			GM_log("开始运行一键感谢程序……")
			var urll = mainurl + "&thankyousubmit=1&formhash=" + formhash + "&reason=";
			var thankcl = new XMLHttpRequest();
			thankcl.open('POST', urll, false);
			thankcl.onreadystatechange = callback;
			thankcl.send(null);
			function callback() {
				GM_log("一键感谢 ok!")
				window.location.reload();
			}
		})
	}
}

//18P2P图片加宽显示
if (tidex("18P2P") != -1 && (lodex("viewthread.php") != -1 || lodex("redirect.php") != -1) && (tidex("音画时尚版") == -1)) {
	var cssStyle = "";
	cssStyle += ".hideclass>img,td>[id^='resize'],span>[id^='resize'] {max-width: 1030px !important;}";
	cssStyle += "TD[width='190'][valign='top']{width:140px  !important;}";
	GM_addStyle(cssStyle)
	$("IMG:not(center>img)").each(function (i) {
		if (this.src.indexOf(".jpg") != -1) {
			$(this).removeAttr('onclick').removeAttr('onload').removeAttr('onmouseover').removeAttr('changedsize').removeAttr('onmousewheel').removeAttr('height').removeAttr('width').attr({
				id : "resize" + i
			});
		}
	})
	//视频加宽按钮
	$('object>embed:not([flename="wmv"],[flename="mp3"])').attr({
		id : "ACFlashPlayer-re",
		width : "640",
		height : "411"
	});
	$('embed[src^="http://you.video.sina.com.cn"]').attr("src", function (sasa, oldSrc) {
		thisVid = oldSrc.match(/\d+(?=[_]\d+)/)[0];
		movName = "http://1.hgdmb.sinaapp.com/bplayer/mukioplayer.swf?type=sina&vid=" + thisVid;
		$(this).prevAll('param[name="movie"]').val(movName);
		return oldSrc = movName;
	}).attr({
		id : "ACFlashPlayer-re"
	});
	$('embed[src^="http://player.youku.com"]').attr("src", function (sasa, oldSrc) {
		thisVid = oldSrc.split("/sid/")[1].match(/.*?(?=\/)/)[0];
		movName = "http://1.hgdmb.sinaapp.com/bplayer/mukioplayer.swf?type=youku&vid=" + thisVid;
		$(this).prevAll('param[name="movie"]').val(movName);
		return oldSrc = movName;
	}).attr({
		id : "ACFlashPlayer-re"
	});
	
	function changeToo(e) {
		var thisButton = e.target;
		var widd = thisButton.value;
		newCss = "";
		newCss += "#ACFlashPlayer-re{width:" + widd + "px !important;height:" + (Number(widd) / 16 * 9 + 51) + "px !important;}";
		GM_addStyle(newCss);
	}
	
	function changeTo(w) {
		var buttonn = w.target;
		var wid = buttonn.value;
		var movName = $(buttonn.parentNode).next("iframe")[0].src;
		var newOb = $("<object>", {
				width : wid,
				height : (Number(wid) / 16 * 9 + 51),
				"codebase" : "http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0",
				"classid" : "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
			});
		$("<param>", {
			val : "sameDomain",
			name : "allowScriptAccess"
		}).appendTo(newOb);
		$("<param>", {
			val : movName,
			name : "movie"
		}).appendTo(newOb);
		$("<param>", {
			val : "high",
			name : "quality"
		}).appendTo(newOb);
		$("<param>", {
			val : "#ffffff",
			name : "bgcolor"
		}).appendTo(newOb);
		$("<embed>", {
			id : "ACFlashPlayer-re",
			width : wid,
			height : (Number(wid) / 16 * 9 + 51),
			"pluginspage" : "http://www.macromedia.com/go/getflashplayer",
			"type" : "application/x-shockwave-flash",
			"allowscriptaccess" : "sameDomain",
			"bgcolor" : "#ffffff",
			"quality" : "high",
			src : movName
		}).appendTo(newOb);
		$(buttonn.parentNode).next("iframe").replaceWith(newOb);
		
		var newSpanas = $("<span>").css({
				"display" : "block"
			});
		$("<input>", {
			type : "button",
			val : "640",
			click : changeToo
		}).appendTo(newSpanas);
		$("<input>", {
			type : "button",
			val : "720",
			click : changeToo
		}).appendTo(newSpanas);
		$("<input>", {
			type : "button",
			val : "800",
			click : changeToo
		}).appendTo(newSpanas);
		
		$(buttonn.parentNode).replaceWith(newSpanas);
	}
	
	$('iframe[height="500"]').each(function () {
		$(this).prev("a").detach();
		var movName = this.src;
		if (movName.indexOf("http://you.video.sina.com.cn") != -1) {
			thisVid = movName.match(/\d+(?=[_]\d+)/)[0];
			movName = "http://1.hgdmb.sinaapp.com/bplayer/mukioplayer.swf?type=sina&vid=" + thisVid;
		} else if (movName.indexOf("http://player.youku.com") != -1) {
			thisVid = movName.split("/sid/")[1].match(/\w+?(?=\/)/)[0];
			movName = "http://1.hgdmb.sinaapp.com/bplayer/mukioplayer.swf?type=youku&vid=" + thisVid;
		}
		this.src = movName;
		var newSpanasa = $("<span>").css({
				"display" : "block"
			}).insertBefore(this);
		$("<input>", {
			type : "button",
			val : "640",
			click : changeTo
		}).appendTo(newSpanasa);
		$("<input>", {
			type : "button",
			val : "720",
			click : changeTo
		}).appendTo(newSpanasa);
		$("<input>", {
			type : "button",
			val : "800",
			click : changeTo
		}).appendTo(newSpanasa);
	})
	
	$('param[name="movie"]').each(function (wq) {
		var newSpanasa = $("<span>").css({
				"display" : "block"
			}).insertBefore(this.parentNode);
		$("<input>", {
			type : "button",
			val : "640",
			click : changeToo
		}).appendTo(newSpanasa);
		$("<input>", {
			type : "button",
			val : "720",
			click : changeToo
		}).appendTo(newSpanasa);
		$("<input>", {
			type : "button",
			val : "800",
			click : changeToo
		}).appendTo(newSpanasa);
	})
}

//Acfun播放窗口调整
if (lodex("http://www.acfun.tv/v/") != -1 && $("#info-article").children("a")[1].href.indexOf("/v/list63/index.htm") == -1) {
	GM_addStyle("#ACFlashPlayer-re{position:static;}#item-player-shadow{display:none;}body{overflow-x:hidden;}");
	function changeTo(w) {
		var buttonn = w.target;
		var wid = buttonn.value;
		acFuncss = "";
		acFuncss += "#ACFlashPlayer-re{width:" + (Number(wid) + 407) + "px;height:" + (Math.floor(Number(wid) / 16 * 9) + 47) + "px;}";
		GM_addStyle(acFuncss);
		content.scrollTo(0, 145);
	}
	
	var newSpanasa = $("<span>").css({
			"display" : "block"
		}).appendTo($("#area-player"));
	$("<input>", {
		type : "button",
		val : "640",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "720",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "800",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "854",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "960",
		click : changeTo
	}).appendTo(newSpanasa);
}

//redtube播放窗口调整
if (window.location.href.match(/www\.redtube\.com\/\d+/) != null) {
	$("#iframeLogin").nextAll().detach();
	$(".videoPage").nextAll().detach();
	function changeTo(w) {
		var buttonn = w.target;
		var wid = buttonn.value;
		redtubecss = "";
		redtubecss += "#redtubeplayer{width:" + wid + "px;height:" + (Number(wid) / 16 * 9 + 25) + "px;}";
		redtubecss += "#redtube_flv_player,.videoPlayer,.watch{width:" + wid + "px;height:" + (Number(wid) / 16 * 9 + 50) + "px;}";
		GM_addStyle(redtubecss);
	}
	
	var newSpanasa = $("<span>").insertBefore($("#redtubeplayer"));
	$("<input>", {
		type : "button",
		val : "584",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "640",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "720",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "800",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "854",
		click : changeTo
	}).appendTo(newSpanasa);
	$("<input>", {
		type : "button",
		val : "960",
		click : changeTo
	}).appendTo(newSpanasa);
}

//mycould.com图片加宽显示
if (lodex("www.mycould.com") != -1) {
	var cssStyle = "";
	cssStyle += "[id^='resize'] {max-width: 928px !important;}";
	GM_addStyle(cssStyle)
	$(".t_msgfont>img").each(function (i) {
		$(this).removeAttr('onload').removeAttr('height').removeAttr('width').attr({
			id : "resize" + i
		});
	})
}

//table width = 0 的BUG修改
GM_addStyle(".t_table {width: 100% !important ;}");

//草榴社区部分
if (tidex("草榴社区") != -1) {
	//图片放大显示、去除可点击属性
	var cssStyle6 = "";
	cssStyle6 += ".r_two {display:none !important;}";
	cssStyle6 += "img[id^='newImage'],IMG[onclick^='window.open'] {max-width: 1130px  !important;}";
	GM_addStyle(cssStyle6);
	$('input[type="image"]').each(function (i) {
		var createImage = document.createElement("img");
		createImage.id = "newImage" + i;
		createImage.src = this.src;
		if (this.parentNode.nodeName != "A") {
			this.parentNode.replaceChild(createImage, this);
		} else {
			this.parentNode.parentNode.replaceChild(createImage, this.parentNode);
		}
	});
	//去除下载链接的重定向
	$('[href^="http://www.viidii.com"]').each(function () {
		this.href = this.href.replace("http://www.viidii.com/?", "").replace(/_+/g, ".").replace("&z", "");
	});
}
//去除种子下载页的按钮上的跳转函数
if (lodex("rmdown.com") != -1 || lodex("zz1su.info") != -1 || lodex("wkdown.info") != -1) {
	$('[type="submit"]').removeAttr("onclick");
}

//所有网页背景颜色调整部分
var color = "#D8E0E0";
function FGrgb(Grgb) {
	if (Grgb && Grgb != "transparent") {
		var clearC = Grgb.toString().replace(/rgb\(/, "").replace(/\)/, "");
		var kaisi = clearC.split(",");
		if (kaisi[0] > 240 && kaisi[1] > 240 && kaisi[2] > 240) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}
var Lcolor = $("body").css("background-Color");
if (FGrgb(Lcolor) || Lcolor == "transparent") {
	$("body").css("background-Color", color);
}
$("*:not(input):not(.goog-icon-list-icon-meta)").each(function () {
	if (document.defaultView.getComputedStyle(this, "")) {
		var thisColor = document.defaultView.getComputedStyle(this, "").getPropertyValue("background-Color");
		if (FGrgb(thisColor)) {
			this.style.backgroundColor = color;
		}
	}
})

//背景音乐播放
if ($('BGSOUND').length > 0) {
	$("<embed>", {
		width : "1",
		height : "1",
		'autostart' : "true",
		'loop' : true,
		'volume' : "100",
		src : $('BGSOUND').attr("src")
	}).appendTo("body");
	$('BGSOUND').detach();
}