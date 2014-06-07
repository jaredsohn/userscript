// ==UserScript==
// @name        Santander Modulo de Proteção Java
// @namespace   https://www.santandernet.com.br/IBPF/
// @description Script para habilitar o modulo de proteção Java, para funcionamento em outros SO's que não Windows, ou sem a necessidade de instalação de plugins específicos
// @include     https://www.santandernet.com.br/IBPF/LoginEscolhaUsuarios.asp
// @version     1
// @grant       none
// ==/UserScript==
window.ExecutaMain = function()
{
    try
    {
        try
        {
            executaJAVA();
            cadeado('fechado', 'OK');
            return ;
        } catch (err) {
        }
    } 
    catch (err)
    {
        cadeado('aberto', '');
    }
}
