var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done){
        console.log(res);
        done();        
    }
});

var cookies = [];
var JSESSIONID = '';
var locationId = '';
var clientId = '';
var stateId = '';
var setCookies = function (set) {
    for(cooks of set){
        for(cook of cooks.split(';')){
            if (cook.split("=")[0] === 'JSESSIONID') {JSESSIONID = cook.split("=")[1]}
            cookies.push({
                "name": cook.split("=")[0],
                "value": cook.split("=")[1],
                "expires": null,
                "httpOnly": false,
                "secure": false
            })
        }        
    }
};
var setLocation = function (loc) {
    locationId = loc
};
var setClient = function (loc) {
    clientId = loc.split("client_id=")[1].split("&")[0]
    stateId = loc.split("state=")[1].split("&")[0]
};

var get_session3 = {
    "followRedirect": false,
    "method": "GET",
    "url": "https://notaparana.pr.gov.br/nfprweb/",
    "httpVersion": "HTTP/1.1",
    "headers": [
        {   "name": "Accept-Encoding", "value": "gzip, deflate, sdch, br"},
        {   "name": "Host", "value": "authz.identidadedigital.pr.gov.br" },
        {   "name": "Accept-Language",  "value": "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},
        {   "name": "Upgrade-Insecure-Requests", "value": "1" },
        {   "name": "User-Agent",   "value": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36" },
        {   "name": "Accept",   "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" },    
        {   "name": "Connection", "value": "keep-alive"}
    ],
    "queryString": [],
    "headersSize": 504,
    "bodySize": 0, 
    "callback" : function (error, res, done) {
        console.log(res)
        done();
    }
};

var get_session2 = {
    "followRedirect": false,
    "method": "GET",
    "url": "https://notaparana.pr.gov.br/nfprweb/",
    "httpVersion": "HTTP/1.1",
    "headers": [
        {   "name": "Accept-Encoding", "value": "gzip, deflate, sdch, br"},
        {   "name": "Host", "value": "authz.identidadedigital.pr.gov.br" },
        {   "name": "Accept-Language",  "value": "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},
        {   "name": "Upgrade-Insecure-Requests", "value": "1" },
        {   "name": "User-Agent",   "value": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36" },
        {   "name": "Accept",   "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" },    
        {   "name": "Connection", "value": "keep-alive"}
    ],
    "queryString": [],
    "headersSize": 504,
    "bodySize": 0, 
    "callback" : function (error, res, done) {
        console.log(res)
        setLocation(res.headers.location)
        get_session3.url = locationId
        get_session3.cookie = cookies
        c.queue(get_session3)
        done();
    }
};

var get_session = {
    "followRedirect": false,
    "method": "GET",
    "url": "https://notaparana.pr.gov.br/nfprweb/",
    "httpVersion": "HTTP/1.1",
    "headers": [
        {   "name": "Accept-Encoding", "value": "gzip, deflate, sdch, br"},
        {   "name": "Host", "value": "notaparana.pr.gov.br" },
        {   "name": "Accept-Language",  "value": "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4"},
        {   "name": "Upgrade-Insecure-Requests", "value": "1" },
        {   "name": "User-Agent",   "value": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36" },
        {   "name": "Accept",   "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" },    
        {   "name": "Connection", "value": "keep-alive"}
    ],
    "queryString": [],
    "headersSize": 504,
    "bodySize": 0, 
    "callback" : function (error, res, done) {
        console.log(res)
        setCookies(res.headers['set-cookie'])        
        setLocation(res.headers.location)
        setClient(res.headers.location)
        get_session2.url = locationId
        get_session2.cookie = cookies
        c.queue(get_session2)
        done();
    }
};

var post_login = {
    "followRedirect": false,
    "method": "POST",
    "url": "https://authz.identidadedigital.pr.gov.br/cidadao_authz/api/v1/authorize",
    "httpVersion": "HTTP/1.1",
    "headersSize": 1446,
    "bodySize": 756,
    "headers": [
        {   "name": "Cookie", "value": "JSESSIONID="+JSESSIONID },
        {   "name": "Origin", "value": "https://authz.identidadedigital.pr.gov.br" },
        {   "name": "Accept-Encoding", "value": "gzip, deflate, br" },
        {   "name": "Host", "value": "authz.identidadedigital.pr.gov.br" },
        {   "name": "Accept-Language", "value": "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4" },
        {   "name": "Upgrade-Insecure-Requests", "value": "1" },
        {   "name": "User-Agent", "value": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.101 Safari/537.36" },
        {   "name": "Content-Type", "value": "application/x-www-form-urlencoded" },
        {   "name": "Accept", "value": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8" },
        {   "name": "Cache-Control", "value": "max-age=0" },
        {   "name": "Referer", "value": "https://authz.identidadedigital.pr.gov.br/cidadao_authz/authentication.html?response_type=code&client_id=8cb1b61969446782289b3c2c3558f3b6&redirect_uri=https://notaparana.pr.gov.br/nfprweb&scope=cliente_authz.basic&state=1498087080081&urlCadCPF=https://notaparana.pr.gov.br/nfprweb/publico/CadastroConsumidor&urlCadCNPJ=https://admin.identidadedigital.pr.gov.br/cidadao_admin/publico/CadastroEstabelecimento&urlWWW=null&urlCadastroCPF=https://notaparana.pr.gov.br/nfprweb/publico/CadastroConsumidor&urlCadastroCNPJ=https://admin.identidadedigital.pr.gov.br/cidadao_admin/publico/CadastroEstabelecimento&forgotPass=https://admin.identidadedigital.pr.gov.br/cidadao_admin/publico/RecuperacaoConta&serverAS=https://authz.identidadedigital.pr.gov.br&serverAD=https://admin.identidadedigital.pr.gov.br" },
        {   "name": "Connection", "value": "keep-alive" },
        {   "name": "Content-Length", "value": "756" }
    ],
    "queryString": [],
    "cookies": cookies,
    "postData": {
        "params": [
            { "name": "step", "value": "2" },
            { "name": "response_type", "value": "code" },
            { "name": "client_id", "value": "8cb1b61969446782289b3c2c3558f3b6" },
            { "name": "redirect_uri", "value": "https://notaparana.pr.gov.br/nfprweb" },
            { "name": "scope", "value": "cliente_authz.basic" },
            { "name": "state", "value": "1498087080081" },
            { "name": "mensagem", "value": "" },
            { "name": "urlCadCPF", "value": "https%3A%2F%2Fnotaparana.pr.gov.br%2Fnfprweb%2Fpublico%2FCadastroConsumidor" },
            { "name": "urlCadCNPJ", "value": "https%3A%2F%2Fadmin.identidadedigital.pr.gov.br%2Fcidadao_admin%2Fpublico%2FCadastroEstabelecimento" },
            { "name": "forgotPass", "value": "https%3A%2F%2Fadmin.identidadedigital.pr.gov.br%2Fcidadao_admin%2Fpublico%2FRecuperacaoConta" },
            { "name": "urlWWW", "value": "null" },
            { "name": "urlCadastroCPF", "value": "https%3A%2F%2Fnotaparana.pr.gov.br%2Fnfprweb%2Fpublico%2FCadastroConsumidor" },
            { "name": "urlCadastroCNPJ", "value": "https%3A%2F%2Fadmin.identidadedigital.pr.gov.br%2Fcidadao_admin%2Fpublico%2FCadastroEstabelecimento" },
            { "name": "tipo", "value": "" },
            { "name": "attribute", "value": "07365093994" },
            { "name": "password", "value": "h1deout865473753" }
        ]  
    }
};

c.queue(get_session)

$('#entrar').on('click',function(){
    var usuario = $('#usuario').val();
    var pass = $('#senha').val();
    post_login.postData.params[14].value = usuario
    post_login.postData.params[15].value = pass
    post_login.postData.params[2].value = clientId
    post_login.postData.params[5].value = stateId
    post_login.headers[0].value = "JSESSIONID="+JSESSIONID 
    post_login.headers[10].value = locationId
    c.queue(post_login);
});

/*
console.log('1')
c.queue(get_session)
console.log('2')
c.queue(post_login)
console.log('3')
*/