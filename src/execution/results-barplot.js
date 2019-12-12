import m from 'mithril'
import BarPlot from '../views/barplot.js'


function _filter(state){
    if(state.viewTypes['viewBarPlot'] == undefined){
        return false
    }else if(state.viewTypes['viewBarPlot'].length == 2 
            && state.currentViewType == "viewBarPlot"
    ){
        return true
    }else return false
}

export default function ResultsBarPlot(){

    return {

        oncreate: function(vnode){
            console.log('create')
            
            if(_filter(vnode.attrs.state)){
                var view = new BarPlot('chartBarPlot',vnode.attrs.state.replaySubject,vnode.attrs.state.viewTypes['viewBarPlot'][0],vnode.attrs.state.viewTypes['viewBarPlot'][1])
                view.display()
            }
        },
        view : function(vnode){
            return m('div', {class: 'row justify-content-center', hidden:(!_filter(vnode.attrs.state))}, [
                (vnode.attrs.state.results.length > 0) ? m('div', {class: 'col-md-8'},[
                    m('canvas',{id:"chartBarPlot",width:"400",height:"200"})
                ]) : null
            ])
        }
    }
}