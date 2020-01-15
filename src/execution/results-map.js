import m from 'mithril'
import Map from '../views/map.js'

function _filter(state){
    if(state.viewTypes['viewMap'] == undefined){
        return false
    }else if(state.viewTypes['viewMap'].length >=0 && state.currentViewType == "viewMap"){
        return true
    }else 
        return false
}


export default function ResultsMap(){

    return {

        oncreate: function(vnode){
            console.log('create')
            
            if(_filter(vnode.attrs.state)){
                var view = new Map('chartMap',vnode.attrs.state.replaySubject,vnode.attrs.state.viewTypes['viewMap'][0],vnode.attrs.state.viewTypes['viewMap'][1])
                view.display()
            }
        },
        view : function(vnode){
            return m('div', {class: 'row justify-content-center', hidden:(!_filter(vnode.attrs.state))}, [
                (vnode.attrs.state.results.length > 0) ? m('div', {class: 'col-md-8'},[
                    m('div',{id:"chartMap",width:"400",height:"200"})
                ]) : null
            ])
        }
    }
}