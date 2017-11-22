
var data = {
    classList: ['s'],
    newClass: ''
};

new Vue ({
    el: '#cn',
    data: data,
    methods: {
        addClass: function() {
            var text;
            text = this.newClass.trim();
            if(text) {
                this.classList.push(text);
                this.newClass = '';
            }
        }
    }
});