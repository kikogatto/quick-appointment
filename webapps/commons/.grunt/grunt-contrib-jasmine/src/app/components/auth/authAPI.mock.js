"use strict";
var __cov_NNqSCu5S4L3gSq57FK50GA = (Function('return this'))();
if (!__cov_NNqSCu5S4L3gSq57FK50GA.__coverage__) { __cov_NNqSCu5S4L3gSq57FK50GA.__coverage__ = {}; }
__cov_NNqSCu5S4L3gSq57FK50GA = __cov_NNqSCu5S4L3gSq57FK50GA.__coverage__;
if (!(__cov_NNqSCu5S4L3gSq57FK50GA['src/app/components/auth/authAPI.mock.js'])) {
   __cov_NNqSCu5S4L3gSq57FK50GA['src/app/components/auth/authAPI.mock.js'] = {"path":"src/app/components/auth/authAPI.mock.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"b":{"1":[0,0]},"f":{"1":0,"2":0},"fnMap":{"1":{"name":"(anonymous_1)","line":5,"loc":{"start":{"line":5,"column":42},"end":{"line":5,"column":55}}},"2":{"name":"(anonymous_2)","line":7,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":45}}}},"statementMap":{"1":{"start":{"line":3,"column":0},"end":{"line":3,"column":50}},"2":{"start":{"line":5,"column":0},"end":{"line":23,"column":4}},"3":{"start":{"line":6,"column":4},"end":{"line":22,"column":6}},"4":{"start":{"line":8,"column":12},"end":{"line":8,"column":37}},"5":{"start":{"line":9,"column":12},"end":{"line":9,"column":59}},"6":{"start":{"line":10,"column":12},"end":{"line":10,"column":58}},"7":{"start":{"line":11,"column":12},"end":{"line":19,"column":13}},"8":{"start":{"line":12,"column":16},"end":{"line":15,"column":18}},"9":{"start":{"line":16,"column":16},"end":{"line":16,"column":39}},"10":{"start":{"line":18,"column":16},"end":{"line":18,"column":68}},"11":{"start":{"line":20,"column":12},"end":{"line":20,"column":35}}},"branchMap":{"1":{"line":11,"type":"if","locations":[{"start":{"line":11,"column":12},"end":{"line":11,"column":12}},{"start":{"line":11,"column":12},"end":{"line":11,"column":12}}]}}};
}
__cov_NNqSCu5S4L3gSq57FK50GA = __cov_NNqSCu5S4L3gSq57FK50GA['src/app/components/auth/authAPI.mock.js'];
__cov_NNqSCu5S4L3gSq57FK50GA.s['1']++;var authAPIModule=angular.module('authAPI',[]);__cov_NNqSCu5S4L3gSq57FK50GA.s['2']++;authAPIModule.service('authAPI',['$q',function($q){__cov_NNqSCu5S4L3gSq57FK50GA.f['1']++;__cov_NNqSCu5S4L3gSq57FK50GA.s['3']++;return{login:function(username,password){__cov_NNqSCu5S4L3gSq57FK50GA.f['2']++;__cov_NNqSCu5S4L3gSq57FK50GA.s['4']++;var defered=$q.defer();__cov_NNqSCu5S4L3gSq57FK50GA.s['5']++;defered.promise.success=defered.promise.then;__cov_NNqSCu5S4L3gSq57FK50GA.s['6']++;defered.promise.error=defered.promise.catch;__cov_NNqSCu5S4L3gSq57FK50GA.s['7']++;if(password.indexOf('incorrect')>=0){__cov_NNqSCu5S4L3gSq57FK50GA.b['1'][0]++;__cov_NNqSCu5S4L3gSq57FK50GA.s['8']++;var error={status:400,data:{error:'invalid_grant',error_description:'The user name or password is incorrect.'}};__cov_NNqSCu5S4L3gSq57FK50GA.s['9']++;defered.reject(error);}else{__cov_NNqSCu5S4L3gSq57FK50GA.b['1'][1]++;__cov_NNqSCu5S4L3gSq57FK50GA.s['10']++;defered.resolve({access_token:'ANiceBearerToken'});}__cov_NNqSCu5S4L3gSq57FK50GA.s['11']++;return defered.promise;}};}]);