!function e(t,r,a){function n(s,o){if(!r[s]){if(!t[s]){var c="function"==typeof require&&require;if(!o&&c)return c(s,!0);if(i)return i(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var u=r[s]={exports:{}};t[s][0].call(u.exports,function(e){var r=t[s][1][e];return n(r?r:e)},u,u.exports,e,t,r,a)}return r[s].exports}for(var i="function"==typeof require&&require,s=0;s<a.length;s++)n(a[s]);return n}({1:[function(e,t,r){"use strict";var a=e("react"),n=e("./board_thumb"),i=e("./install_extension"),s={introContainer:function(e){return{marginLeft:"10%",marginRight:"10%",marginTop:32,marginBottom:32,display:e?"inherit":"none"}},intro:{backgroundColor:"#FAFAFA",padding:20,borderRadius:5,textAlign:"left",maxWidth:700}},o=a.createClass({displayName:"BoardList",propTypes:{data:a.PropTypes.array,searching:a.PropTypes.bool},render:function(){var e=i,t=!this.props.searching;if(0===this.props.data.length)return a.createElement("div",null,a.createElement("div",{style:{height:"40%"}}),a.createElement("div",{style:{width:"100%",textAlign:"center"}},"No results"));var r=this.props.data.map(function(e,t){return a.createElement(n,{data:e,key:e.id+t,lazyLoad:!0})}),o=a.createElement("center",null,a.createElement("div",{style:s.introContainer(t)},a.createElement("div",{className:"introText",style:s.intro},a.createElement("p",null,"Kitnic is a registry of open hardware electronics projects that are ready for you to order and build. Click on any project to get further info, download the gerbers and see the bill of materials."),a.createElement("p",null,"To quickly purchase the parts from various retailers you should ",a.createElement("a",{className:"clickableLink",onClick:e},"install")," the 1-click BOM extension. It's pretty useful on it's own too and can be used on other sites. Read more about it ",a.createElement("a",{className:"clickableLink",href:"http://1clickBOM.com"},"here"),"."),a.createElement("p",null,a.createElement("a",{href:"https://github.com/monostable/kitnic/#submitting-your-project"},"Submit")," your own project to have it listed here! Follow this project on ",a.createElement("a",{href:"https://twitter.com/kitnic_it"},"Twitter"),", ",a.createElement("a",{href:"https://hackaday.io/project/11871-kitnic"},"Hackaday.io")," or ",a.createElement("a",{href:"https://github.com/monostable/kitnic"},"GitHub")," to get updates as we progress and add content."))));return a.createElement("div",null,o,a.createElement("div",{style:{margin:32,textAlign:"center"}},r))}});t.exports=o},{"./board_thumb":2,"./install_extension":5,react:"react"}],2:[function(e,t,r){"use strict";function a(e){return e.split("").reverse().join("")}function n(e,t,r){var n=e;return r&&(n=a(n)),n.length>t&&(n=n.substr(0,t)," "!==n[t]&&(n=n.concat(" ")),n=n.concat("...")),r&&(n=a(n)),n}var i=e("react"),s=e("./lazy_load"),o=e("./fade_image"),c=i.createClass({displayName:"BoardThumb",propTypes:{lazyLoad:i.PropTypes.bool,data:i.PropTypes.object},render:function(){var e;return e=this.props.lazyLoad?i.createElement(s,{once:!0,component:i.createElement("div",{className:"img"}),distance:300},i.createElement(o,{src:"boards/"+this.props.data.id+"/images/top.svg",className:"img"})):i.createElement("img",{src:"boards/"+this.props.data.id+"/images/top.svg",className:"img"}),i.createElement("div",{className:"boardThumb"},i.createElement("a",{href:"/boards/"+this.props.data.id},i.createElement("div",{className:"imgContainer"},i.createElement("center",null,e)),i.createElement("div",{className:"title"},n(this.props.data.id.split("/").slice(2).join(" / "),30,!0)),i.createElement("div",{className:"url"},n(this.props.data.id.split("/").slice(0,2).join(" / "),30,!0)),i.createElement("div",{className:"summary"},n(this.props.data.summary,85))))}});t.exports=c},{"./fade_image":4,"./lazy_load":7,react:"react"}],3:[function(e,t,r){t.exports=[{id:"github.com/JarrettR/USBvil",summary:"USBvil is a low-cost PIC dev board that fits into a common flashdrive case."},{id:"github.com/kasbah/nomech",summary:"NoMech touch sensor board"},{id:"github.com/kasbah/push-on-hold-off",summary:"Simple power switch using a push button. Push to turn on, hold to turn off."},{id:"github.com/kitnic/arduino-uno",summary:"The Arduino Uno is a microcontroller board based on the ATmega328."},{id:"github.com/kitnic/BQ25570_Harvester",summary:"TI BQ25570 step-up DC-DC energy harvester and battery charger"},{id:"github.com/kitnic/Bus_Pirate",summary:"The Bus Pirate is an open source hacker multi-tool that talks to electronic stuff."},{id:"github.com/kitnic/FM_Transmitter",summary:"Simple low powered FM radio transmitter based on a MAX2606"},{id:"github.com/kitnic/HACK",summary:"HackAday Cortex Kit"}]},{}],4:[function(e,t,r){"use strict";var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},n=e("react"),i=n.createClass({displayName:"FadeImage",propTypes:{style:n.PropTypes.any,speed:n.PropTypes.any,src:n.PropTypes.string.isRequired},getInitialState:function(){return{opacity:0}},fadeIn:function(){this.setState({opacity:1})},render:function(){var e=this.props.style||{};return e.transition="opacity "+(this.props.speed||1)+"s",e.opacity=this.state.opacity,n.createElement("img",a({},this.props,{style:e,src:this.props.src,onLoad:this.fadeIn}))}});t.exports=i},{react:"react"}],5:[function(e,t,r){"use strict";var a=e("browser-version"),n=function(){var e=a(),t=void 0;return t=/Chrome/.test(e)?function(){chrome.webstore.install(void 0,void 0,function(e){return console.log(e)})}:/Firefox/.test(e)?function(){window.open("//addons.mozilla.org/firefox/downloads/latest/634060/addon-634060-latest.xpi","_self")}:function(){window.open("//1clickBOM.com","_self")}};t.exports=n()},{"browser-version":"browser-version"}],6:[function(e,t,r){"use strict";t.exports=function(e,t){"number"!=typeof t&&(t=0);var r=e.getBoundingClientRect(),a={top:r.top+t,left:r.left+t,right:r.right-t,bottom:r.bottom-t},n=window.innerHeight||document.documentElement.clientHeight,i=window.innerWidth||document.documentElement.clientWidth,s=a.top>=0&&a.left>=0,o=a.bottom<=n&&a.right<=i;return s&&o}},{}],7:[function(e,t,r){"use strict";var a=e("react"),n=e("react-dom"),i=e("./is_visible"),s=a.createClass({displayName:"LazyLoad",propTypes:{distance:a.PropTypes.number,component:a.PropTypes.node.isRequired,children:a.PropTypes.node.isRequired,once:a.PropTypes.bool},getDefaultProps:function(){return{distance:100,component:a.createElement("div",null),once:!1}},getInitialState:function(){return{visible:!1}},componentDidMount:function(){this._checkViewport(),this._timer=setInterval(this._checkViewport,1e3)},componentWillUnmount:function(){clearInterval(this._timer)},_checkViewport:function(){if(!this.props.once||!this.state.visible){var e=n.findDOMNode(this);this.setState({visible:i(e,this.props.distance)})}},render:function(){return this.state.visible?this.props.children:this.props.component}});t.exports=s},{"./is_visible":6,react:"react","react-dom":"react-dom"}],8:[function(e,t,r){"use strict";var a=e("react"),n=e("react-search-input"),i=e("./title_bar"),s=e("./board_list"),o=e("./boards.json"),c=a.createClass({displayName:"Main",getInitialState:function(){return{result:o,searching:!1}},render:function(){return a.createElement("div",null,a.createElement(i,null,a.createElement("div",{className:"searchContainer"},a.createElement("div",{className:"searchBackground"},a.createElement("div",{className:"searchInputIcon"},a.createElement("span",{className:"icon-search searchIcon"})),a.createElement(n,{className:"searchInput",ref:"search",onChange:this.searchUpdated})))),a.createElement(s,{data:this.state.result,searching:this.state.searching}))},handleKeydown:function(e){return 13==e.which&&document.getElementsByClassName("searchInput")[0].firstElementChild.blur(),!1},componentDidMount:function(){document.getElementsByClassName("searchInput")[0].firstElementChild.addEventListener("keydown",this.handleKeydown)},searchUpdated:function(e){if(this.refs.search){var t=["id","summary"],r=o.filter(this.refs.search.filter(t));if(e.length>2){var a=0===r.length?"no_result":"result";ga("send","pageview","/search?q="+e+"&results="+a)}this.setState({result:r,searching:e.length>0})}}});t.exports=c},{"./board_list":1,"./boards.json":3,"./title_bar":10,react:"react","react-search-input":11}],9:[function(e,t,r){"use strict";var a=e("react"),n=e("react-dom"),i=e("./main");n.render(a.createElement(i,null),document.getElementById("content"))},{"./main":8,react:"react","react-dom":"react-dom"}],10:[function(e,t,r){"use strict";var a=e("react"),n=a.createClass({displayName:"TitleBar",propTypes:{children:a.PropTypes.any},render:function(){return a.createElement("div",{className:"titleBar"},a.createElement("div",{className:"logoContainer"},a.createElement("a",{href:"/"},a.createElement("center",{className:"logoImgContainer"},a.createElement("img",{className:"logoImg",src:"/images/logo.svg"})))),a.createElement("div",{className:"middleContainer"},this.props.children),a.createElement("div",{className:"submitContainer"},a.createElement("a",{className:"uploadContainer",href:"https://github.com/monostable/kitnic/#submitting-your-project"},a.createElement("div",{className:"submissionButton"},a.createElement("span",null,"Register a project"))),a.createElement("a",{className:"contributeContainer",title:"Contribute to Kitnic",href:"https://github.com/monostable/kitnic/"},a.createElement("div",{className:"contributeButton"},a.createElement("span",{className:"octicon octicon-mark-github githubIcon"})))))}});t.exports=n},{react:"react"}],11:[function(e,t,r){!function(r,a){"undefined"!=typeof t&&t.exports?t.exports=a(e("react")):"function"==typeof define&&define.amd?define(["react"],a):r.SearchInput=a(r.React)}(this,function(e){"use strict";function t(e,t){var r={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r}var r=e.createClass({propTypes:{className:e.PropTypes.string,onChange:e.PropTypes.func,caseSensitive:e.PropTypes.bool,throttle:e.PropTypes.number,filterKeys:e.PropTypes.oneOf([e.PropTypes.string,e.PropTypes.arrayOf(e.PropTypes.string)]),value:e.PropTypes.string},getDefaultProps:function(){return{className:"",onChange:function(){},caseSensitive:!1,throttle:200}},getInitialState:function(){return{searchTerm:this.props.value||""}},componentWillReceiveProps:function(e){if(e.value&&e.value!==this.props.value){var t={target:{value:e.value}};this.updateSearch(t)}},render:function(){var r=t(this.props,["className","onChange","caseSensitive","throttle","filterKeys","value"]);return r.type=r.type||"search",r.value=this.state.searchTerm,r.onChange=this.updateSearch,r.placeholder=r.placeholder||"Search",e.createElement("div",{className:this.props.className||""},e.createElement("input",r))},updateSearch:function(e){var t=e.target.value;this.setState({searchTerm:t},function(){this._throttleTimeout&&clearTimeout(this._throttleTimeout),this._throttleTimeout=setTimeout(this.props.onChange,this.props.throttle,t)}.bind(this))},filter:function(e){return r.filter(this.state.searchTerm,e||this.props.filterKeys,this.props.caseSensitive)},statics:{filter:function(e,t,r){return function(n){if(""===e)return!0;r||(e=e.toLowerCase());var i=e.split(" "),s=0;return t?("string"==typeof t&&(t=[t]),i.forEach(function(e){var r;if(e.indexOf(":")>-1){var i=e.split(":")[0];e=e.split(":")[1],r=t.filter(function(e){return e.indexOf(i)>-1})}else r=t;for(var o=!1,c=0;c<r.length;c++){var l=a(r[c],n);if(l.forEach(function(t){try{t&&-1!==t.search(e)&&(o=!0)}catch(r){}}),o)break}o&&s++})):i.forEach(function(e){try{var t=n.toLowerCase();-1!==t.search(e)&&s++}catch(r){}}),s===i.length}}}}),a=function(e,t){var r=e.split("."),a=[t];return r.forEach(function(e){var t=[];a.forEach(function(r){r&&(r instanceof Array?r.forEach(function(r){t.push(r[e])}):t.push(r[e]))}),a=t}),a.map(function(e){return"string"==typeof e?e.toLowerCase():null})};return r})},{react:"react"}]},{},[9]);