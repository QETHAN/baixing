/**
 * Created with JetBrains WebStorm.
 * User: shenli
 * Date: 13-1-30
 * Time: 下午3:13
 * To change this template use File | Settings | File Templates.
 */
var $ = {
    byId: function(id) {
        return typeof id == "string" ? document.getElementById(id) : id;
    },
    byClass: function(cls, parent, tag) {
        var parent = parent || document;
        var tag = tag || "*";
        if(parent.getElementsByClassName) {
            return parent.getElementsByClassName(cls);
        } else {
            var aClass = [];
            var reg = new RegExp("(^| )" + cls + "( |$)");
            var aele = this.byTag(tag, parent);
            for(var i = 0, len = aele.length; i < len; i++) {
                reg.test(aele[i].className) && aClass.push(aele[i]);
            }
            return aClass;
        }
    },
    byTag: function(element, obj) {
        return(obj || document).getElementsByTagName(element);
    }
}
var eventUtil={
    addHandler:function(element,type,handler){
        if ( element.nodeType === 3 || element.nodeType === 8 ) {
            return;
        }

        if ( handler === false ) { // 如果事件处理函数是false，则用returnFalse代替false
            handler = this.preventDefault(); // returnFalse会取消事件的默认行为
        } else if ( !handler ) {
            return; // 如果handler是undefined null ''，则直接返回，不执行后边的代码
        }
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    removeHandler:function(element,type,handler){
        if ( element.nodeType === 3 || element.nodeType === 8 ) {
            return;
        }

        if ( handler === false ) { // 如果事件处理函数是false，则用returnFalse代替false
            handler = this.preventDefault(); // returnFalse会取消事件的默认行为
        } else if ( !handler ) {
            return; // 如果handler是undefined null ''，则直接返回，不执行后边的代码
        }
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type]=null;
        }
    },
    getEvent:function(e){
        return e?e:window.event;
    },
    getTarget:function(e){
        return e.target|| e.srcElement;
    },
    preventDefault:function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue=false;
        }
    },
    stopPropgation:function(e){
        if(e.stopPropgation){
            e.stopPropgation();
        }else{
            e.cancelBubble=true;
        }
    },
    contains:function(a, b, itself){
        // 第一个节点是否包含第二个节点
        //contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
        if(itself && a == b){
            return true
        }
        if(a.contains){
            if(a.nodeType === 9 )
                return true;
            return a.contains(b);
        }else if(a.compareDocumentPosition){
            return !!(a.compareDocumentPosition(b) & 16);
        }
        while ((b = b.parentNode))
            if (a === b) return true;
        return false;
    },
    addMouseEnterLeave:function(element, type, handler) {
        var fun = function(e){
            var target = e.target,
                related = e.relatedTarget;
            if( !related || (related !== target && !this.contains( related,target))){
                 handler.call(e.currentTarget,e);
             }
        }
        if(element.addEventListener){
            if(type=='mouseenter'){
                element.addEventListener('mouseover', fun, false);
            }else if(type=='mouseleave'){
                element.addEventListener('mouseout', fun, false);
            }else{
                element.addEventListener(type, handler, false);
            }
        }else{
            element.attachEvent('on' + type, handler);
        }
    }

}