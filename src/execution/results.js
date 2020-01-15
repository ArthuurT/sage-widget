import m from 'mithril'
import ResultsTable from './results-table.js'
import ResultsLinePlot from './results-lineplot.js'
import ResultsBarPlot from './results-barplot.js'
import ResultsMap from './results-map.js'


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
                            // Dropdown menu
                            m('div', {class: 'mb-4 mt-4 text-center col-md-12'},[
                                m('button', {
                                    id: 'dropdownMenu',
                                    class: 'btn btn-outline-primary dropdown-toggle',
                                    type: 'button',
                                    'data-toggle': 'dropdown',
                                    'aria-haspopup': 'true',
                                    'aria-expanded': 'false'
                                  }, 
                                  'Choose your view'
                                ),
                                m('div', {class: 'dropdown-menu','aria-labelledby':"dropDownMenu"},[
                                    // Buttons
                                    m('button',
                                        {
                                            class : 'dropdown-item',
                                            type : 'button',
                                            onclick : () => {vnode.attrs.state.currentViewType = "viewTable"}
                                        },
                                        "Table"
                                    ),
                                    m('button',
                                        {
                                            class : 'dropdown-item',
                                            type : 'button',
                                            onclick : () => {vnode.attrs.state.currentViewType = "viewLinePlot"},
                                            disabled : viewDisable("viewLinePlot",vnode.attrs.state) ? true : false
                                        },
                                        "LinePlot"
                                    ),
                                    m('button',
                                        {
                                            class : 'dropdown-item',
                                            type : 'button',
                                            onclick : () => {vnode.attrs.state.currentViewType = "viewBarPlot"},
                                            disabled : viewDisable("viewBarPlot",vnode.attrs.state) ? true : false
                                        },
                                        "BarPlot"
                                    ),
                                    m('button',
                                        {
                                            class : 'dropdown-item',
                                            type : 'button',
                                            onclick : () => {vnode.attrs.state.currentViewType = "viewMap"},
                                            disabled : viewDisable("viewMap",vnode.attrs.state) ? true : false
                                        },
                                        "Map"
                                    ),
                                    m('button',
                                        {
                                            class : 'dropdown-item',
                                            type : 'button',
                                            onclick : () => {vnode.attrs.state.currentViewType = "viewNetwork"},
                                            disabled : viewDisable("viewNetwork",vnode.attrs.state) ? true : false
                                        },
                                        "Network"
                                    )
                                ])
                            ]),
                            m(ResultsTable,{state:vnode.attrs.state}),
                            m(ResultsLinePlot,{state:vnode.attrs.state}),
                            m(ResultsBarPlot,{state:vnode.attrs.state}),
                            m(ResultsMap,{state:vnode.attrs.state})
                        ]) : null
            ])
        }
    }
}

