
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
    listClassValue: [1, 2, 3, 4, 5, 6],
    selectedClassValue: 0,
    /* graph */
    qualityAttribute: [],
    sourceCodeAttribute: '',
     /* complexity */
    cfWeight: 0.00,
    eWeight: 0.00,
    cmWeight: 0.00,
    cpWeight: 0.00,
     /* coupling */
    coupfWeight: 0.00,
    coupeWeight: 0.00,
    coupmWeight: 0.00,
    couppWeight: 0.00,
     /* inheritancev */
    ifWeight: 0.00,
    ieWeight: 0.00,
    imWeight: 0.00,
    ipWeight: 0.00,
     /* abstraction */
    afWeight: 0.00,
    aeWeight: 0.00,
    amWeight: 0.00,
    apWeight: 0.00,
    /**/
    /* totalValue: 0, */
    /*complexityFunction: 0,
    couplingFunction: 0,
    inheritanceFunction: 0,
    abstractionFunction: 0,
    utilityFunction: 5,
    complexity: [] */
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
                    else {
                        if(id=='wmc') this.sourceCodeAttribute = 'complexity';
                        if(id=='cbo') this.sourceCodeAttribute = 'coupling';
                        if(id=='dit') this.sourceCodeAttribute = 'inheritance';
                        if(id=='noc') this.sourceCodeAttribute = 'abstraction';
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
            if(id) {
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
                for(var i = 0; i < this.items.length; i++) {
                    var itemState;
                    itemState = this.items[i]['checked'];
                    if (itemState == true) {
                        var qa = this.items[i]['text'];
                        this.qualityAttribute.push(qa);
                        graphics.labels.push(qa);
                        /*graphics.datasets[0].data.push(i);*/
                    }
                }
                for (var i = 0; i <= this.qualityAttribute.length; i++) {
                    graphics.datasets[0].data[i-1] = i;
                }
                displaychart.update();
                /*
                for(var i = 0; i < this.qualityAttribute.length; i++) {
                    var sca = this.sourceCodeAttribute;
                    var qa = this.qualityAttribute[i];
                    if(sca=='complexity') {
                        if(qa=='Functionality') this.cfWeight = 0.10;
                        if(qa=='Efficiency') this.ceWeight = 0.07;
                        if(qa=='Maintainability') this.cmWeight = -0.12;
                        if(qa=='Portability') this.cpWeight = -0.10;
                    }
                    if(sca=='coupling') {
                        if(qa=='Functionality') this.coupfWeight = 0.07;
                        if(qa=='Efficiency') this.coupeWeight = 0.08;
                        if(qa=='Maintainability') this.coupmWeight = -0.12;
                        if(qa=='Portability') this.couppWeight = -0.16;
                    }
                    if(sca=='inheritance') {
                        if(qa=='Functionality') this.ifWeight = 0.07;
                        if(qa=='Efficiency') this.ieWeight = 0.13;
                        if(qa=='Maintainability') this.imWeight = 0.04;
                        if(qa=='Portability') this.ipWeight = 0.16;
                    }
                    if(sca=='abstraction') {
                        if(qa=='Functionality') this.afWeight = 0.05;
                        if(qa=='Efficiency') this.aeWeight = 0.13;
                        if(qa=='Maintainability') this.amWeight = 0.12;
                        if(qa=='Portability') this.apWeight = 0.16;
                    }
                } */
                 
                /*var totalValue = 0;
                for (var i = 0; i < this.qualityAttribute.length; i++) {
                    totalValue += this.mckValues[i];
                    graphics.datasets[0].data[i] = i;
                } */
                /* Complexity */
                var complexityFunctionality = this.totalValue * this.cfWeight;
                var complexityEfficiency = this.totalValue * this.ceWeight;
                var complexityMaintainability = this.totalValue * this.cmWeight;
                var complexityPortability = this.totalValue * this.cpWeight;
                  /* complexity function */
                this.complexityFunction = complexityFunctionality + complexityEfficiency + complexityMaintainability + complexityPortability;
                /* Coupling */
                var couplingFunctionality = this.totalValue * this.coupfWeight;
                var couplingEfficiency = this.totalValue * this.coupeWeight;
                var couplingMaintainability = this.totalValue * this.coupmWeight;
                var couplingPortability = this.totalValue * this.couppWeight;
                  /* coupling function */
                this.couplingFunction = couplingFunctionality + couplingEfficiency + complexityMaintainability + couplingPortability;
                /* inheritance */
                var inheritanceFunctionality = this.totalValue * this.ifWeight;
                var inheritanceEfficiency = this.totalValue * this.ieWeight;
                var inheritanceMaintainability = this.totalValue * this.imWeight;
                var inheritancePortability = this.totalValue * this.ipWeight;
                  /* inheritance function */
                this.inheritanceFunction = inheritanceFunctionality + inheritanceEfficiency + inheritanceMaintainability + inheritancePortability;
                /* abstraction */
                var abstractionFunctionality = this.totalValue * this.afWeight;
                var abstractionEfficiency = this.totalValue * this.aeWeight;
                var abstractionMaintainability = this.totalValue * this.amWeight;
                var abstractionPortability = this.totalValue * this.apWeight;
                  /* abstraction function */
                this.abstractionFunction = abstractionFunctionality + abstractionEfficiency + abstractionMaintainability + abstractionPortability;
                  /* utility function */
                this.utilityFunction = this.complexityFunction + this.couplingFunction + this.inheritanceFunction + this.abstractionFunction;
               /* for(i = 0; i < this.qualityAttribute.length; i++) {
                    var sca = this.sourceCodeAttribute;
                    var qa = this.qualityAttribute[i];
                    if(sca=='complexity') {
                        if(qa=='Functionality') this.complexity.push(complexityFunctionality);
                        if(qa=='Efficiency') this.complexity.push(complexityEfficiency);
                        if(qa=='Maintainability') this.complexity.push(complexityMaintainability);
                        if(qa=='Portability') this.complexity.push(complexityPortability);
                    }
                    if(sca=='coupling') {
                        if(qa=='Functionality') graphics.datasets.data.push(couplingFunctionality);
                        if(qa=='Efficiency') graphics.datasets.data.push(couplingEfficiency);
                        if(qa=='Maintainability') graphics.datasets.data.push(couplingMaintainability);
                        if(qa=='Portability') graphics.datasets.data.push(couplingPortability);
                    }
                    if(sca=='inheritance') {
                        if(qa=='Functionality') graphics.data.push(inheritanceFunctionality);
                        if(qa=='Efficiency') graphics.data.push(inheritanceEfficiency);
                        if(qa=='Maintainability') graphics.data.push(inheritanceMaintainability);
                        if(qa=='Portability') graphics.data.push(inheritancePortability);
                    }
                    if(sca=='abstraction') {
                        if(qa=='Functionality') graphics.data.push(abstractionFunctionality);
                        if(qa=='Efficiency') graphics.data.push(abstractionEfficiency);
                        if(qa=='Maintainability') graphics.data.push(abstractionMaintainability);
                        if(qa=='Portability') graphics.data.push(abstractionPortability);
                    }
                } */
            }
        }
    }
});




var chart = document.getElementById("chart").getContext("2d");
var graphics = {
    labels: [],
    datasets: [ 
        {
            label: "ISO/IEC-9126-Characteristics",
            backgroundColor: 
            [
                "rgba(255, 0, 0, 1)",
                "rgba(255, 0, 123, 50)",
                "rgba(255, 0, 324, 200)",
                "rgba(255, 0, 543, 400)",
                "rgba(0, 0, 0, 500)"
            ],
            borderColor: 
            [
                "rgba(0, 0, 0, 0)", 
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)",
                "rgba(0, 0, 0, 0)"
            ],
            highlightFill: "rgba(220, 220, 220, 0.8)",
            highlightStroke: "rgba(220, 220, 220, 0.8)",
            data: []
        }  
    ]
};

var options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: { yAxes: [ { ticks: { beginAtZero: true } } ] }
};

chart.canvas.parentNode.style.height = 'auto';
chart.canvas.parentNode.style.width = '100%';
var displaychart = new Chart(chart, 
    {
        type: 'bar', 
        data: graphics, 
        options: options
    }
);