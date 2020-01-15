import m from 'mithril'
import LinePlot from '../views/lineplot.js'


function _filter(state){
    if(state.viewTypes['viewLinePlot'] == undefined){
        return false
    }else if(state.viewTypes['viewLinePlot'].length == 2 
            && state.currentViewType == "viewLinePlot"
    ){
        return true
    }else return false
}

export default function ResultsLinePlot(){

    return {

        oncreate: function(vnode){
            console.log('create')
            
            if(vnode.attrs.state.viewTypes['viewLinePlot'] != undefined){
                var view = new LinePlot('chartLinePlot',vnode.attrs.state.replaySubject,vnode.attrs.state.viewTypes['viewLinePlot'][0],vnode.attrs.state.viewTypes['viewLinePlot'][1])
                view.display()
            }
        },
        view : function(vnode){
            return m('div', {class: 'row justify-content-center', hidden:(!_filter(vnode.attrs.state))}, [
                (vnode.attrs.state.results.length > 0) ? m('div', {class: 'col-md-8'},[
                    m('canvas',{id:"chartLinePlot",width:"400",height:"200"})
                ]) : null
            ])
        }
    }
}