"use strict";
var __cov_s8gBYsB8QP19NiznffCO5g = (Function('return this'))();
if (!__cov_s8gBYsB8QP19NiznffCO5g.__coverage__) { __cov_s8gBYsB8QP19NiznffCO5g.__coverage__ = {}; }
__cov_s8gBYsB8QP19NiznffCO5g = __cov_s8gBYsB8QP19NiznffCO5g.__coverage__;
if (!(__cov_s8gBYsB8QP19NiznffCO5g['src/app/components/calendar/calendarServices.js'])) {
   __cov_s8gBYsB8QP19NiznffCO5g['src/app/components/calendar/calendarServices.js'] = {"path":"src/app/components/calendar/calendarServices.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0},"b":{},"f":{"1":0,"2":0,"3":0,"4":0,"5":0},"fnMap":{"1":{"name":"(anonymous_1)","line":6,"loc":{"start":{"line":6,"column":45},"end":{"line":6,"column":56}}},"2":{"name":"(anonymous_2)","line":13,"loc":{"start":{"line":13,"column":27},"end":{"line":13,"column":45}}},"3":{"name":"(anonymous_3)","line":17,"loc":{"start":{"line":17,"column":26},"end":{"line":17,"column":38}}},"4":{"name":"(anonymous_4)","line":25,"loc":{"start":{"line":25,"column":24},"end":{"line":25,"column":36}}},"5":{"name":"(anonymous_5)","line":29,"loc":{"start":{"line":29,"column":24},"end":{"line":29,"column":40}}}},"statementMap":{"1":{"start":{"line":4,"column":0},"end":{"line":4,"column":60}},"2":{"start":{"line":6,"column":0},"end":{"line":33,"column":4}},"3":{"start":{"line":7,"column":4},"end":{"line":9,"column":6}},"4":{"start":{"line":10,"column":4},"end":{"line":10,"column":31}},"5":{"start":{"line":11,"column":1},"end":{"line":32,"column":6}},"6":{"start":{"line":14,"column":12},"end":{"line":14,"column":58}},"7":{"start":{"line":18,"column":12},"end":{"line":18,"column":28}},"8":{"start":{"line":19,"column":12},"end":{"line":21,"column":13}},"9":{"start":{"line":20,"column":16},"end":{"line":20,"column":82}},"10":{"start":{"line":22,"column":12},"end":{"line":22,"column":26}},"11":{"start":{"line":26,"column":12},"end":{"line":26,"column":37}},"12":{"start":{"line":30,"column":12},"end":{"line":30,"column":37}}},"branchMap":{}};
}
__cov_s8gBYsB8QP19NiznffCO5g = __cov_s8gBYsB8QP19NiznffCO5g['src/app/components/calendar/calendarServices.js'];
__cov_s8gBYsB8QP19NiznffCO5g.s['1']++;var commonsCalendar=angular.module('commonsCalendar',[]);__cov_s8gBYsB8QP19NiznffCO5g.s['2']++;commonsCalendar.service('calendarServices',[function(){__cov_s8gBYsB8QP19NiznffCO5g.f['1']++;__cov_s8gBYsB8QP19NiznffCO5g.s['3']++;var _selectedDay={date:new Date()};__cov_s8gBYsB8QP19NiznffCO5g.s['4']++;var _firstDayOfTheWeek=1;__cov_s8gBYsB8QP19NiznffCO5g.s['5']++;return{fixDayOfWeekIndex:function(broken){__cov_s8gBYsB8QP19NiznffCO5g.f['2']++;__cov_s8gBYsB8QP19NiznffCO5g.s['6']++;return(broken+(7-_firstDayOfTheWeek))%7;},getWeekdayLabels:function(){__cov_s8gBYsB8QP19NiznffCO5g.f['3']++;__cov_s8gBYsB8QP19NiznffCO5g.s['7']++;var labels=[];__cov_s8gBYsB8QP19NiznffCO5g.s['8']++;for(var i=0;i<7;i++){__cov_s8gBYsB8QP19NiznffCO5g.s['9']++;labels.push(Date.weekdayLabels[(i+_firstDayOfTheWeek)%7]);}__cov_s8gBYsB8QP19NiznffCO5g.s['10']++;return labels;},getSelectedDay:function(){__cov_s8gBYsB8QP19NiznffCO5g.f['4']++;__cov_s8gBYsB8QP19NiznffCO5g.s['11']++;return _selectedDay.date;},setSelectedDay:function(date){__cov_s8gBYsB8QP19NiznffCO5g.f['5']++;__cov_s8gBYsB8QP19NiznffCO5g.s['12']++;_selectedDay.date=date;}};}]);