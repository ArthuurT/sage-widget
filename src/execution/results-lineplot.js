import m from 'mithril'
import createPlot from './line.js'
import {of} from 'rxjs'


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
            if(_filter(vnode.attrs.state)){
                var labelx = vnode.attrs.state.viewTypes['viewLinePlot'][0]
                var labely = vnode.attrs.state.viewTypes['viewLinePlot'][1]
                createPlot(vnode.attrs.state.currentIterator,labelx,labely) // ChartJS's plot
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