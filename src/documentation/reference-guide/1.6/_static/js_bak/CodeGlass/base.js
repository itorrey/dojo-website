/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/


if(!dojo._hasResource["CodeGlass.base"]){dojo._hasResource["CodeGlass.base"]=true;dojo.provide("CodeGlass.base");dojo.require("dijit._Widget");dojo.require("dojox.dtl._DomTemplated");dojo.require("dojox.dtl.tag.loader");dojo.require("dojox.dtl.tag.logic");dojo.require("dojox.dtl.tag.loop");dojo.require("dojox.dtl.filter.lists");dojo.require("dojox.dtl.tag.logic");dojo.require("dojox.dtl.filter.dates");dojo.require("dojox.dtl.utils.date");dojo.require("dojox.dtl.filter.strings");dojo.require("dojox.dtl.filter.htmlstrings");dojo.require("dojo.fx");dojo.require("dojox.highlight");dojo.require("dojox.highlight.languages._www");dojo.require("CodeGlass.HTML-Beautify");dojo.require("dojox.html._base");dojo.declare("CodeGlass.base",[dijit._Widget,dijit._Templated],{width:"700",height:"400",src:"",plugins:["dojo.version","dojo.i18n","dojo.extra","dojo.themes","dojo.a11y","dojo.dir"],chrome:"default",pluginArgs:{},type:"dialog",constructor:function(){this.injectToolbars=[];this.injectVars=[];},postMixInProperties:function(){this.content={};if(this.src){this.content.src=this.src;}else{this.content=this.parseNodes(this.srcNodeRef);}this["templatePath"]=dojo.moduleUrl("CodeGlass.chromes."+this.chrome,"template.html");},postCreate:function(){var d=dojo;if(this.type=="dialog"||this.type=="basic"){d.place(this.viewerNode,d.body(),"last");d.removeClass(this.type=="dialog"?this.nodeDialog:this.nodeBasic,"displayNone");d.connect(window,"onresize",this,"_position");d.subscribe("codeglass/open",this,function(t){if(this.isOpen&&t!=this){this.hide();}});}if(this.type=="basic"){d.style(this.domNode,"display","inline");}d.forEach(this.plugins,function(_1){d["require"]("CodeGlass.plugins."+_1);});d.ready(this,function(){this._initPlugins();this._setupViewer();});},_initPlugins:function(){this.pluginInstances=[];this.pluginSharedVars=[];dojo.forEach(this.plugins,function(_2){var o=dojo.getObject("CodeGlass.plugins."+_2),_3=new o({sharedVars:this.pluginSharedVars,vars:this.pluginArgs,codeGlassBaseId:this.id});this.pluginInstances.push(_3);this._preparePlugin(_3);},this);dojo.subscribe("CodeGlass/plugin/change/"+this.id,this,"_refreshViewer");},_preparePlugin:function(_4){var _5=_4.getVars();if(_5.injectToolbar){if(!this.injectToolbars[_5.injectToolbar]){this.injectToolbars[_5.injectToolbar]=[];}this.injectToolbars[_5.injectToolbar].push(_4.domNode);}if(_5.iframeProps){for(var p in _5.iframeProps){if(!this.injectVars[p]){this.injectVars[p]="";}this.injectVars[p]+=_5.iframeProps[p];}}},_refreshViewer:function(){this.injectToolbars=[];this.injectVars=[];dojo.forEach(this.pluginInstances,function(_6){this._preparePlugin(_6);},this);this.viewer.toolbars=this.injectToolbars;this.viewer.iframeVars=this.injectVars;this.viewer._setup();},_setupViewer:function(){var v=this.viewer=new CodeGlass.CodeViewer({id:this.id+"_Content",content:this.content,viewerBox:{w:this.width,h:this.height},iframeTemplate:dojo["cache"]("CodeGlass.chromes."+this.chrome,"iframe.html"),toolbars:this.injectToolbars,iframeVars:this.injectVars,showHeader:(this.type=="inline"&&this.src.length?false:true)},this.viewerNode);dojo.addClass(v.domNode,"CodeGlassViewer"+this.chrome);if(this.type=="dialog"||this.type=="basic"){dojo.query(".header .close",v.domNode).removeClass("displayNone").onclick(dojo.hitch(this,function(e){this.hide();}));}else{dojo.removeClass(v.domNode,"displayNone");v._setupIframe();dojo.addClass(v.domNode,"CodeGlassInline"+this.chrome);}},show:function(e){e.preventDefault(e);if(this.isOpen){return;}this.ce=dojo.coords(e.target,true);this._position();var v=this.viewer;v._toggleView();dojo.publish("codeglass/open",[this]);dojo.animateProperty({node:v.domNode,beforeBegin:dojo.hitch(this,function(){dojo.removeClass(v.domNode,"displayNone");dojo.query(".wrapper",v.domNode).style({"visibility":"hidden"});}),properties:{width:{start:this.ce.w,end:this.width},height:{start:this.ce.h,end:this.height},top:{start:this.ce.y,end:this.top},left:{start:this.ce.x,end:this.left}},duration:300,onEnd:dojo.hitch(this,function(){dojo.style(v.loader,"opacity","0");dojo.query(".wrapper",v.domNode).style({"visibility":"visible"});v._setupIframe();this.isOpen=true;})}).play();},hide:function(e){var v=this.viewer;dojo.query(".wrapper",v.domNode).style("visibility","hidden");dojo.animateProperty({node:v.domNode,properties:{width:this.ce.w,height:this.ce.h,top:this.ce.y,left:this.ce.x},onEnd:dojo.hitch(this,function(){dojo.addClass(v.domNode,"displayNone");this.isOpen=false;})}).play();},_position:function(){if(!this.viewer||!this.viewer.domNode){return;}var _7=dijit.getViewport();this.top=_7.t+_7.h/2-this.height/2;this.left=_7.l+_7.w/2-this.width/2;dojo.style(this.viewer.domNode,{top:this.top+"px",left:this.left+"px"});},parseNodes:function(_8){var el=_8.firstChild,i=0,_9=dojo.create("div"),_a=dojo.create("textarea"),_b,_c=[];while(el){if(dojo.attr(el,"lang")!=null){_b=dojo.query("pre",el).attr("innerHTML");_a.innerHTML=_b;_b=_a.value;_c[el.lang]={"content":_9.innerHTML,"label":dojo.attr(el,"label"),"lang":el.lang,"code":_b,"index":i};_9.innerHTML="";}else{_9.appendChild(dojo.clone(el));}el=el.nextSibling;i++;}dojo.destroy(_a);dojo.destroy(_9);return _c;}});dojo.declare("CodeGlass.CodeViewer",[dijit._Widget,dojox.dtl._DomTemplated],{templateString:dojo.cache("CodeGlass","templates/codeViewer.html","<div class=\"codeGlassViewer displayNone\">\n\t<div class=\"wrapper\">\n\t\t<div class=\"header {% if not showHeader %}displayNone{% endif %}\" dojoAttachEvent=\"onclick: _toggleView\"\n\t\t\t>{% if showTabs %}<div title=\"containerIframe\" class=\"menuItem demo active\"><a href='#' dojoAttachPoint=\"firstLink\">Demo</a></div\n\t\t\t><div title=\"containerFull\" class=\"menuItem copy\"><a href=\"#\">Copy &amp; Paste</a></div\n\t\t\t\t>{% if javascriptcode %}<div title=\"containerJs\" class=\"menuItem javascript\"><a href='#'>JavaScript</a></div\n\t\t\t\t>{% endif %}{% if htmlcode %}<div title=\"containerHtml\" class=\"menuItem html\"><a href='#'>HTML</a></div\n\t\t\t\t>{% endif %}{% if csscode %}<div title=\"containerCss\" class=\"menuItem css\"><a href='#'>CSS</a></div>{% endif %}{% endif %}\n\t\t\t<div class=\"close displayNone\"><a href=\"#\"><span style=\"visibility:hidden\">X</span></a></div>\n\t\t</div>\n\t\t<div dojoAttachPoint=\"contentWrapper\" class=\"contentWrapper\">\n\t\t\t<div dojoAttachPoint=\"containerIframe\" class=\"iframe container\">\n\t\t\t\t<div dojoAttachPoint=\"loader\" class=\"loader\"><span>&nbsp;</span></div>\n\t\t\t</div>\n\t\t\t<div dojoAttachPoint=\"containerFull\" class=\"full container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\"><a href=\"#\">Copy to clipboard</a></div>\n\t\t\t\t\t<p>To run the demo in your own environment, copy and paste the full source into an editor and open it in a browser.</p>\n\t\t\t\t</div>\n\t\t\t\t<textarea dojoAttachPoint=\"textareaCode\">{{ renderedContent }}</textarea>\n\t\t\t</div>\n\t\t\t{% if javascriptcode %}\n\t\t\t<div dojoAttachPoint=\"containerJs\" class=\"js container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\">Copy to clipboard</div>\n\t\t\t\t\t{% if javascriptlabel %}<h1>{{ javascriptlabel|safe }}</h1>{% endif %}\n\t\t\t\t\t<div class=\"content\">{% if javascriptcontent %}{{ javascriptcontent|safe }}{% endif %}</div>\n\t\t\t\t</div>\n\t\t\t\t<pre>\n\t\t\t\t\t<code class=\"javascript\">{{ javascriptcode }}</code>\n\t\t\t\t</pre>\n\t\t\t</div>\n\t\t\t{% endif %}\n\t\t\t{% if htmlcode %}\n\t\t\t<div dojoAttachPoint=\"containerHtml\" class=\"html container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\">Copy to clipboard</div>\n\t\t\t\t\t{% if htmllabel %}<h1>{{ htmllabel|safe }}</h1>{% endif %}\n\t\t\t\t\t<div class=\"content\">{% if htmlcontent %}{{ htmlcontent|safe }}{% endif %}</div>\n\t\t\t\t</div>\n\t\t\t\t<pre>\n\t\t\t\t\t<code class=\"html\">{{ htmlcode }}</code>\n\t\t\t\t</pre>\n\t\t\t</div>\n\t\t\t{% endif %}\n\t\t\t{% if csscode %}\n\t\t\t<div dojoAttachPoint=\"containerCss\" class=\"css container displayNone\">\n\t\t\t\t<div class=\"info\">\n\t\t\t\t\t<div class=\"clipboard\" dojoAttachEvent=\"onclick: _copyClipboard\">Copy to clipboard</div>\n\t\t\t\t\t{% if csslabel %}<h1>{{ csslabel|safe }}</h1>{% endif %}\n\t\t\t\t\t<div class=\"content\">{% if csscontent %}{{ csscontent|safe }}{% endif %}</div>\n\t\t\t\t</div>\n\t\t\t\t<pre>\n\t\t\t\t\t<code class=\"css\">{{ csscode }}</code>\n\t\t\t\t</pre>\n\t\t\t</div>\n\t\t\t{% endif %}\n\t\t</div>\n\t\t<div class=\"footer {% if not showFooter %}displayNone{% endif %}\" dojoAttachPoint=\"toolbarBottom\">\n\t\t\t{% if toolbarBottom %}{{ toolbarBottom|safe }}{% endif %}\n\t\t</div>\n\t</div>\n</div>\n"),iframeTemplate:dojo.cache("CodeGlass","templates/iframe.html","<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n<html {% if html %}{{ html|safe }}{% endif %}>\n\t<head>\n\t\t{% if customHead %}{{ customHead|safe }}{% endif %}\n\t\t<style type=\"text/css\">\n\t\t\tbody, html {\n\t\t\t\tfont-family:helvetica,arial,sans-serif;\n\t\t\t\tfont-size:90%;\n\t\t\t}\n\t\t</style>\n\t\t{% if csscode %}{{ csscode|safe }}{% endif %}\n\t</head>\n\t<body {% if classBody %}class=\"{{ classBody }}\"{% endif %}>\n\t\t{% if htmlcode %}{{ htmlcode|safe }}{% endif %}\n\t</body>\n\n\t{% if customJavaScript %}{{ customJavaScript|safe }}{% endif %}\n\t{% if javascriptcode %}{{ javascriptcode|safe }}{% endif %}\n\n\t<!--\n\t\tNOTE: the following script tag is not intended for usage in real world!!\n\t\tit is part of the CodeGlass and you should just REMOVE it when you use the code\n\t-->\n\t<script type=\"text/javascript\">\n\t\tdojo.addOnLoad(function(){\n\t\t\tif (document.pub){\n\t\t\t\tdocument.pub();\n\t\t\t}\n\t\t});\n\t</script>\n</html>\n"),currentView:"containerIframe",showHeader:true,showFooter:true,showTabs:true,toolbars:null,iframeVars:null,constructor:function(_d){this.toolbars=this.toolbars||[];this.iframeVars=this.iframeVars||[];},postMixInProperties:function(){if(this.content.src){this.showTabs=false;this.showFooter=false;}else{this._buildTemplate();}},postCreate:function(){for(var _e in this.toolbars){dojo.forEach(this.toolbars[_e],function(n){this[_e].appendChild(n);},this);}dojo.style(this.domNode,{width:this.viewerBox.w+"px",height:this.viewerBox.h+"px"});if(!this.showHeader){dojo.style(this.contentWrapper,"marginTop",0+"px");}if(!this.showFooter){dojo.style(this.contentWrapper,"marginBottom",0+"px");}dojo.query(".header > div, .footer > div",this.domNode).addClass("displayNone");dojo.subscribe("codeglass/loaded",this,function(){if(this==arguments[0]){dojo.fadeOut({node:this.loader,onEnd:dojo.hitch(this,function(){dojo.addClass(this.loader,"displayNone");dojo.query(".header > div, .footer > div",this.domNode).removeClass("displayNone");setTimeout(dojo.hitch(this,function(){this.isDialog&&this.firstLink&&this.firstLink.focus();}),25);})}).play();}});this._highlight();this.iframe=dojo.create("iframe",{},this.containerIframe);},_buildTemplate:function(){var t={},_f,_10,_11;for(var _12 in this.iframeVars){t[_12]=this.iframeVars[_12];}for(var _13 in this.content){for(_f in this.content[_13]){var tk=_13+""+_f;if(_f=="code"){_10=new dojox.dtl.Template(this.content[_13][_f]);_11=new dojox.dtl.Context(t);this[tk]=t[tk]=CodeGlass.style_html(_10.render(_11),4);}else{this[tk]=t[tk]=this.content[_13][_f];}}}var _14=new dojox.dtl.Template(this.iframeTemplate);_11=new dojox.dtl.Context(t);this.renderedContent=CodeGlass.style_html(_14.render(_11),4);},_setupIframe:function(){if(this.iframe){dojo.destroy(this.iframe);}this.iframe=dojo.create("iframe",{},this.containerIframe);if(!this.content.src){var doc=this.iframe.contentWindow.document,_15=this.renderedContent;doc.open();if(!dojo.isIE){doc.write(_15);doc.close();}else{var _16=_15.split("<"+"/script>"),_17=_16.pop(),_18;var _19=function(){if(_18.readyState=="complete"||_18.readyState=="loaded"){_18.detachEvent("onreadystatechange",_19);_1a();}};var _1a=function(){var bit=_16.shift();if(dojo.isString(bit)){doc.write(bit+"<"+"/script>");_18=dojo.query("script",doc).pop();_18.attachEvent("onreadystatechange",_19);_19();}else{doc.write(_17);if(dojo.isIE>7){setTimeout(function(){doc.close();},100);}else{doc.close();}}};_1a();}doc.pub=dojo.hitch(this,function(){dojo.publish("codeglass/loaded",[this]);});}else{var e;if(this.iframe.addEventListener){e=this.iframe.addEventListener("load",dojo.hitch(this,function(){dojo.publish("codeglass/loaded",[this]);this.iframe.removeEventListener(e);}),false);}else{if(this.iframe.attachEvent){e=this.iframe.attachEvent("onload",dojo.hitch(this,function(){dojo.publish("codeglass/loaded",[this]);this.iframe.detachEvent(e);}));}}dojo.attr(this.iframe,"src",this.content.src);}dojo.query(this.loader).removeClass("displayNone").style("opacity",1);},_setup:function(){dojo.query(".header ul",this.domNode).addClass("displayNone");this._buildTemplate();this._toggleView();this._setupIframe();this.textareaCode.value=this.renderedContent;},_toggleView:function(e){e&&e.preventDefault();var _1b=e?(dojo.attr(e.target,"title")||dojo.attr(e.target.parentNode,"title")):null,_1c=_1b?_1b:"containerIframe";if(this[_1c]){dojo.query("[title$=\""+this.currentView+"\"]",this.domNode).removeClass("active");dojo.toggleClass(this[this.currentView],"displayNone");dojo.query("[title$=\""+_1c+"\"]",this.domNode).addClass("active");dojo.toggleClass(this[_1c],"displayNone");this.currentView=_1c;this._size(this[_1c]);}},_highlight:function(){dojo.query("code",this.domNode).forEach(dojox.highlight.init);},_size:function(_1d){if(!this._sized){this._sized={};}if(this._sized[_1d.className]){return;}var _1e=dojo.query("> div.info",_1d)[0];if(_1e){var _1f=dojo.coords(_1d),_20=dojo.marginBox(_1e);dojo.query("textarea",_1d).style("height",(_1f.h-_20.h)+"px");dojo.query("pre",_1d).style("height",(_1f.h-_20.h-10)+"px");}this._sized[_1d.className]=true;},_copyClipboard:function(){console.warn("Not working yet :(\nDo you know flash and can write something to support this feature cross browser?\nThat would be awesome!!");}});dojo.extend(dojo.NodeList,{CodeGlass:function(_21){var o=dojo.getObject("CodeGlass.base");return this.forEach(function(elm){dojo.mixin({type:"dialog"},_21);new o(_21,elm);});}});}