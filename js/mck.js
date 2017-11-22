
var data = {
    metrics: [ { text:'Weighted Methods Per Class', checked: false}, 
    { text:'Coupling Between Objects', checked: false},
    { text: 'Depth Of Inheritance Tree', checked: false},
    { text:'No. Of Children', checked: false} ]
};

new Vue({
    el: '#mck',
    data: data
});