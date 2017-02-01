var UI = {
    
    $grid: document.querySelector('.grid-container'),
    
    $controls: document.querySelector('.controls'),

    init: function() {
        UI.$grid.addEventListener('click', UI.draw, false);
        UI.$controls.addEventListener('click', UI.userControl, false);
    },

    draw: function(e) {
        var elem = e.target.classList;

        if ( !App.allowUser || !elem.contains('col') ) return;        

        elem.toggle('live');
        UI.$controls.querySelector('.clear').classList.remove('disabled');
        UI.$controls.querySelector('.play').classList.remove('disabled');
    },

    userControl: function(e) {
        var elem = e.target.classList;

        if ( elem.contains('disabled') ) return;

        var actions = {
            'play': App.start,
            'pause': App.pause,
            'clear': App.clear
        };

        actions[elem.item(1)] ();
        elem.add('disabled');
    }
};