import m from 'mithril'
import ResultsTable from './results-table.js'
import ResultsLinePlot from './results-lineplot.js'


function viewDisable(view,state){
    return state.viewTypes[view] == undefined
}

function currentView(view,state){
    return state.currentViewType == view
}

export default function Results(){
    return {
        view : function(vnode){
            return m('div',{class:'mb-4 row'},[
                        (vnode.attrs.state.results.length > 0) ?
                        m('div', {class: 'col-md-12'}, [
                            // Title
                            m('h3', [
                                m('i', {class: 'fas fa-list-ul'}),
                                ' Query results'
                            ]),
                            m('div', {class: 'mb-4 mt-4 text-center col-md-12'},[
                                // Buttons
                                m(currentView("viewTable",vnode.attrs.state) ? 'button.btn.btn-primary.mr-1' : 'button.btn.btn-dark.mr-1',
                                {
                                    onclick : () => {vnode.attrs.state.currentViewType = "viewTable"}
                                },
                                "Table"),
                                m(currentView("viewLinePlot",vnode.attrs.state) ? 'button.btn.btn-primary.mr-1' : 'button.btn.btn-dark.mr-1',
                                {
                                    onclick : () => {vnode.attrs.state.currentViewType = "viewLinePlot"},
                                    disabled:viewDisable("viewLinePlot",vnode.attrs.state)
                                },
                                "LinePlot"),
                                m(currentView("viewNetwork",vnode.attrs.state) ? 'button.btn.btn-primary.mr-1' : 'button.btn.btn-dark.mr-1', 
                                {
                                    onclick : () => {vnode.attrs.state.currentViewType = "viewNetwork"}, 
                                    disabled:viewDisable("viewNetwork",vnode.attrs.state)
                                },
                                "Network")
                            ]),
                            m(ResultsTable(vnode.attrs.state)),
                            m(ResultsLinePlot,{state:vnode.attrs.state})
                        ]) : null
            ])
        }
    }
}

