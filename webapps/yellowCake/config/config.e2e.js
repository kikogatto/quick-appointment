'use strict';

document.write('<script src="angular-1.2.20/angular-mocks.js" type="text/javascript"></script>');
document.write('<script src="data/calendar/calendarBackend.js" type="text/javascript"></script>');
document.write('<script src="data/people/peopleBackend.js" type="text/javascript"></script>');
document.write('<script src="data/knowledge/knowledgeBackend.js" type="text/javascript"></script>');
document.write('<script src="data/authBackend.js" type="text/javascript"></script>');


/************************************************************************************************
 * MODULE: Prontmed Site
 *
 ************************************************************************************************/
var appConfig = angular.module('appConfig', ['ngCookies', 'ngMockE2E']);

appConfig.constant('basePath', '');

appConfig.constant('calendarConfig', {
    endpoint : 'calendar/api'
});

appConfig.constant('peopleConfig', {
    endpoint : 'people/api'
});

appConfig.constant('authConfig', {
    endpoint : 'people'
});

appConfig.constant('knowledgeConfig', {
    endpoint : 'knowledge/api'
});

appConfig.constant('emrConfig', {
    path: 'emr/api',
	endpoint: 'emr/api'
});

appConfig.constant('timerConfig', {
    logger : 'console'
});

appConfig.constant('accountConfig', {
    logger : 'people/api'
});

appConfig.constant('cepServiceConfig', {
    endpoint : '//homolog.prontmed.com/cep/',
    finalUrl : function( cep ) {
        return this.endpoint + cep.replace('-','');
    },
    processResponse : function(data, address) {
        if( data.resultado_txt !== 'sucesso - cep completo') {
            return;
        }
        scope.address.Logradouro = data.tipo_logradouro + ' ' + data.logradouro;
        scope.address.City = data.cidade;
        scope.address.State = data.uf;
        scope.address.Neighborhood = data.bairro;

        // scope.address.Logradouro =  data.logradouro;
        // scope.address.City = data.localidade;
        // scope.address.State = data.uf;
        // scope.address.Neighborhood = data.bairro;
    }
});

appConfig.run( ['$httpBackend', 'authConfig', function ( $httpBackend, authConfig ) {
    authBackend($httpBackend, authConfig);
}]);

appConfig.run( ['$httpBackend', 'peopleConfig', function ( $httpBackend, peopleConfig ) {
    peopleBackend($httpBackend, peopleConfig);
}]);

appConfig.run( ['$httpBackend', 'emrConfig', function ( $httpBackend, emrConfig ) {
    peopleBackend($httpBackend, emrConfig);
}]);

appConfig.run( ['$httpBackend', 'calendarConfig', function ( $httpBackend, calendarConfig ) {
    calendarsBackend($httpBackend, calendarConfig);
}]);

appConfig.run( ['$httpBackend', function ( $httpBackend ) {
    //$httpBackend.whenGET(/(.*)*www.cepaberto.com\/(.*)*/).passThrough();
    $httpBackend.whenGET('http://www.cepaberto.com/api/v1/ceps.json?cep=01226030').passThrough();

    knowledgeBackend($httpBackend);
}]);
