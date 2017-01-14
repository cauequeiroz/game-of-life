var App = {

    allowUser: true,

    $grid: document.querySelector('.grid-container'),

    init: function() {
        App.$grid.addEventListener('click', App.draw, false);
    },

    draw: function(e) {
        var elem = e.target.classList;

        if ( !App.allowUser || !elem.contains('col') ) return;        

        elem.toggle('live');
    }
};

App.init();

/*
- read dom and create array
- read array, check each neighboor and generate next array
- update array with next array
- read array and update dom
*/