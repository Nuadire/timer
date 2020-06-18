(this.webpackJsonptimer=this.webpackJsonptimer||[]).push([[0],{135:function(e,t,a){},136:function(e,t,a){},141:function(e,t,a){},155:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(11),c=a.n(i),o=a(157),l=(a(88),a(89),a(37)),s=a(38),m=a(46),u=a(45),d=a(160),v=(a(90),function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleStart=function(){var e=n.state,t=e.state,a=e.timerValue,r=e.timerCurrent;"active"===t?(n.setState({state:"inactive",timeStart:0,timerCurrent:0,timerValue:a+r}),clearInterval(n.timerId)):(n.setState({state:"active",timeStart:Date.now()}),n.timerId=setInterval((function(){n.tick()}),10))},n.reset=function(){clearInterval(n.timerId),n.setState({state:"inactive",timerValue:0,timerCurrent:0})},n.state={timerValue:0,timerCurrent:0,state:"inactive"},n}return Object(s.a)(a,[{key:"componentWillUnmount",value:function(){clearInterval(this.timerId)}},{key:"tick",value:function(){this.setState((function(e){var t=e.timeStart;return{timerCurrent:Date.now()-t}}))}},{key:"render",value:function(){var e=this.state,t=e.state,a=e.timerCurrent+e.timerValue,n="active"===t?"Pause":"Start",i=Math.trunc(a/6e4).toFixed(0),c=(a/1e3%60).toFixed(0),o=(a%1e3).toFixed(0);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"timer-view"},"".concat(i,"min - ").concat(c,"sec - ").concat(o,"ms")),r.a.createElement(d.a,{className:"timer-btn",onClick:this.handleStart,type:"primary"},n),r.a.createElement(d.a,{onClick:this.reset,className:"timer-btn",type:"primary"},"Reset"))}}]),a}(r.a.Component)),h=(a(135),a(156)),f=a(161),C=(a(136),function(e){var t=e.onChangeMin,a=e.onChangeSec,n=e.onChangeSlider,i=e.minute,c=e.second,o=e.disabled,l=60*i+c;return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{className:"form-slider",min:0,max:3600,step:15,onChange:n,value:l,tipFormatter:null,disabled:o}),r.a.createElement(f.a,{className:"form-minute",type:"number",id:"minute",min:0,max:720,value:i,onChange:t,disabled:o}),r.a.createElement("label",{htmlFor:"minute"}," minute(s)"),r.a.createElement(f.a,{className:"form-second",type:"number",id:"second",min:0,max:59,value:c,onChange:a,disabled:o}),r.a.createElement("label",{htmlFor:"second"}," second(s)"))});C.defaultProps={minute:0,second:0,disabled:!1};var p=a(159),T=(a(141),function(e){var t=e.minute,a=e.second,n=e.percent;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"view-title"},"".concat(t," minut - ").concat(a," second")),r.a.createElement(p.a,{type:"circle",percent:n}))});T.defaultProps={minute:0,second:0,percent:0};var b=function(e){Object(m.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).onChangeSlider=function(e){var t=1e3*e;n.setState({totalTime:t,srcTotalTime:t})},n.onChangeMin=function(e){if(!(Number.isNaN(e)||e>720)){var t=1e3*(60*e+n.state.srcTotalTime/1e3%60);n.setState({totalTime:t,srcTotalTime:t})}},n.onChangeSec=function(e){if(!(Number.isNaN(e)||e>59)){var t=n.state.srcTotalTime,a=t+1e3*(e-t/1e3%60);n.setState({totalTime:a,srcTotalTime:a})}},n.resetCountdown=function(){clearInterval(n.intervalId),n.setState({totalTime:0,srcTotalTime:0,isActive:!1})},n.startCountdown=function(){var e=n.state,t=e.isActive,a=e.srcTotalTime,r=e.totalTime;t?(clearInterval(n.intervalId),n.setState({isActive:!1})):(n.setState({isActive:!0,totalTime:r||a}),n.intervalId=setInterval(n.tickCountdown,1e3))},n.playAudio=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"countdown.mp3",t=new Audio(e);t.play()},n.tickCountdown=function(){n.setState((function(e){var t=e.totalTime-1e3;return t<=0?(clearInterval(n.intervalId),n.playAudio(),{totalTime:0,isActive:!1}):{totalTime:t}}))},n.state={srcTotalTime:0,totalTime:0,isActive:!1},n}return Object(s.a)(a,[{key:"componentWillUnmount",value:function(){clearInterval(this.intervalId)}},{key:"render",value:function(){var e,t,a=this.state,n=a.totalTime,i=a.srcTotalTime,c=a.isActive,o=function(e){return Math.trunc(e/6e4)},l=function(e){return Math.ceil(e/1e3%60)};return r.a.createElement(r.a.Fragment,null,r.a.createElement(C,{onChangeMin:this.onChangeMin,onChangeSec:this.onChangeSec,onChangeSlider:this.onChangeSlider,minute:o(i),second:l(i),disabled:c}),r.a.createElement(T,{minute:o(n),second:l(n),percent:(e=n,t=i,Math.floor(100*(t-e)/t))}),r.a.createElement(d.a,{type:"primary",className:"countdown-btn",onClick:this.startCountdown},c?"Pause":"Play"),r.a.createElement(d.a,{type:"primary",className:"countdown-btn",onClick:this.resetCountdown},"Reset"))}}]),a}(r.a.Component),g=function(){var e=o.a.TabPane;return r.a.createElement(o.a,{defaultActiveKey:"2"},r.a.createElement(e,{tab:"Timer",key:"1"},r.a.createElement(v,null)),r.a.createElement(e,{tab:"Countdown",key:"2"},r.a.createElement(b,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},83:function(e,t,a){e.exports=a(155)},88:function(e,t,a){},90:function(e,t,a){}},[[83,1,2]]]);
//# sourceMappingURL=main.511e237e.chunk.js.map