(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{118:function(e,t,n){e.exports=n(194)},132:function(e,t,n){},133:function(e,t,n){},194:function(e,t,n){"use strict";n.r(t);var o=n(39),r=n(0),a=n.n(r),i=n(26),c=n.n(i);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=n(63),s=n(31),d=n(117),u=n(196),m=n(197),p=n(115),h=n(111),w=n.n(h),f=(n(132),n(84)),O=n(85),v=n(88),y=n(86),b=n(87),R=(n(133),n(64)),g=(n(193),function(e){function t(){return Object(f.a)(this,t),Object(v.a)(this,Object(y.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(O.a)(t,[{key:"render",value:function(){var e=this.props,t=e.title,n=e.style,o=e.index,r="//via.placeholder.com/90x90.png?text=".concat(t);return a.a.createElement("div",{className:"item",style:n},t,"::",o,a.a.createElement("img",{alt:t,src:r}))}}]),t}(r.PureComponent)),j=function(e){function t(){var e,n;Object(f.a)(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=Object(v.a)(this,(e=Object(y.a)(t)).call.apply(e,[this].concat(r)))).itemCount=I,n.itemsPerRow=0,n.loadMoreItems=function(e){var t=e.startIndex,o=e.stopIndex,r=0;t>0&&(r=t*n.itemsPerRow);var a=o*n.itemsPerRow+n.itemsPerRow;return console.log("load",t,o,r,a),n.props.loadMore(r,a),Promise.resolve()},n}return Object(b.a)(t,e),Object(O.a)(t,[{key:"componentDidMount",value:function(){this.props.loadMore(0,59)}},{key:"render",value:function(){var e=this,t=this.props.items;console.log("items length",t);var n=function(n){for(var o=n.index*e.itemsPerRow,r=Math.min(o+e.itemsPerRow,e.itemCount),a=o;a<r;a++)if(!t[a])return!1;return!0};return a.a.createElement("div",{className:"App"},a.a.createElement(R.a,null,function(o){var r=o.height,i=o.width;e.itemsPerRow=Math.floor(i/275);var c=Math.ceil(e.itemCount/e.itemsPerRow);return a.a.createElement(R.b,{isRowLoaded:n,loadMoreRows:e.loadMoreItems,rowCount:c,minimumBatchSize:Math.floor(30/e.itemsPerRow)},function(n){var o=n.onRowsRendered,l=n.registerChild;return a.a.createElement(R.c,{ref:l,onRowsRendered:o,height:r,width:i,rowHeight:200,rowCount:c,rowRenderer:function(n){for(var o=n.index,r=n.key,i=n.style,c=[],l=o*e.itemsPerRow,s=Math.min(l+e.itemsPerRow,e.itemCount),d=l;d<s;d++){var u=t[d],m=u?u.title:"Loading";c.push(a.a.createElement(g,{className:"Item",key:d,index:d,title:m}))}return a.a.createElement("div",{className:"Row",key:r,style:i},c)}})})}))}}]),t}(r.Component),E=Object(l.b)(function(e){return{items:e.items}},function(e){return{loadMore:function(t,n){return e({type:"LOAD_MORE",payload:{startIndex:t,endIndex:n}})}}})(j);n.d(t,"totalItems",function(){return I});var x=function(e,t){var n=t.startIndex;t.endIndex;return Array.from({length:e},function(e,t){var o=w()().toString()+n.toString();return{id:o,title:"title-".concat(o)}})},I=6e3,M=new Array(I).fill(null),P=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d,_=Object(u.a)(),k=Object(s.e)(Object(s.c)({items:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"MORE_LOADED":return console.log(t.payload),t.payload.startIndex>0?[].concat(Object(o.a)(e.slice(0,t.payload.startIndex)),Object(o.a)(t.payload.items),Object(o.a)(e.slice(t.payload.endIndex,I))):[].concat(Object(o.a)(t.payload.items),Object(o.a)(e.slice(t.payload.endIndex+1,I)));default:return e}}}),{},P(Object(s.a)(_)));_.run(function(e){return e.pipe(Object(d.a)("LOAD_MORE"),Object(m.a)(Math.floor(301*Math.random()+200)),Object(p.a)(function(e){var t=e.payload,n=t.startIndex,o=t.endIndex,r=o-n;return 0===n&&(r+=1),console.log("creating",r,n,o),{type:"MORE_LOADED",payload:{items:x(r,e.payload),startIndex:n,endIndex:o,totalItems:I}}}))}),c.a.render(a.a.createElement(l.a,{store:k},a.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[118,1,2]]]);
//# sourceMappingURL=main.ea3f3ff6.chunk.js.map