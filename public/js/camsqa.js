
/* mck */
document.getElementById('choose').hidden = false;
document.getElementById('check').hidden = true;
document.getElementById('lock').hidden = true;
var classAdd = 0;

var data = {
    /* qa */
    items: [ { text: 'Functionality', checked: false }, 
    { text: 'Efficiency', checked: false },
    { text: 'Maintainability', checked: false },
    { text: 'Portability', checked: false } ],
    title: 'Quality Attributes ISO/IEC 9126',
    /* cn */
    newClassName: '',
    classList: [],
    /* mck */
    metrics: [ { text:'Weighted Methods Per Class', id:'wmc'}, 
    { text:'Coupling Between Objects', id:'cbo'},
    { text: 'Depth Of Inheritance Tree', id:'dit'},
    { text:'No. Of Children', id:'noc'} ],
    metric: '',
    /* cl */
    mckValues: [],
    selectedClassName: '',
    selectedClassValue: '',
};

new Vue ({
    el: '#cam',
    data: data,
    methods: {
        /* cn */
        addClass: function() {
            var name;
            name = this.newClassName.trim();
            /*var list =  { 'text':name, 'value':0 };*/
            if(name) {
                this.classList.push(name);
                classAdd += 1;
                this.newClassName = '';
            }
        },
        removeClass: function() {
            var trashClass;
            trashClass = this.selectedClassName;
            var i = this.classList.indexOf(trashClass);
            if(i!=-1) {
                this.classList.splice(i, 1);
                classAdd -= 1;
                this.selectedClassName = '';
            }
        },
        /* mck */
        disabledMetrics: function() {
            for (i = 0; i < this.metrics.length; i++) {
                var id;
                var metricId;
                id = this.metrics[i]['id'];
                metricId = this.metric;
                if(this.metric!='') {
                    if(metricId!=id) {
                        document.getElementById('choose').hidden = true;
                        document.getElementById('check').hidden = false;
                        document.getElementById(id).disabled = true;
                    }
                }
            }
        },
        activateMetrics: function() {
            for (i = 0; i < this.metrics.length; i++) {
                var id;
                id = this.metrics[i]['id'];
                var numberOfClasses;
                numberOfClasses = classAdd;
                if(numberOfClasses>=0) {
                    document.getElementById('choose').hidden = false;
                    document.getElementById('check').hidden = true;
                    document.getElementById(id).disabled = false;
                }
                else if(numberOfClasses==-1) {
                    document.getElementById('choose').hidden = true;
                    document.getElementById('check').hidden = true;
                    document.getElementById(id).disabled = true;
                    document.getElementById('lock').hidden = false; 
                }
            }
        },
        /* cl */
        disabledClass: function() {
            var id;
            var classValue;
            id = this.selectedClassName;
            classValue = this.selectedClassValue;
            if(id && classValue) {
                classAdd = -1;
                this.mckValues.push(classValue);
                document.getElementById(id).disabled = true;
                this.selectedClassName = '';
                this.selectedClassValue = '';
            }
        },
        /* graph */
        graph: function() {
            var sizeMckValues;
            sizeMckValues = this.mckValues.length;
            if (sizeMckValues>=3) {
                /* Calculos */
                document.getElementById('choose').hidden = true;
            }
        }
    }
});