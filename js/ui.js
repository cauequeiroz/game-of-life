var UI = {
    
    $grid: document.querySelector('.grid-container'),
    
    $controls: document.querySelector('.controls'),

    init: function() {
        this.$grid.addEventListener('click', UI.draw, false);
        this.$controls.addEventListener('click', UI.userControl, false);
    },

    draw: function(e) {
        var elem = e.target.classList;

        if ( !App.allowUser || !elem.contains('col') ) return;        

        elem.toggle('live');

        UI.enableButton('clear');
        UI.enableButton('play');
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
    },

    enableButton: function(type) {
        this.$controls.querySelector('.'+type+'').classList.remove('disabled');
    },

    disableButton: function(type) {
        this.$controls.querySelector('.'+type+'').classList.add('disabled');
    },

    updateGrid: function() {
        var grid  = this.$grid,
            board = Engine.getBoard();

        for ( var i=0; i<20; i++ ) {
            for ( var j=0; j<20; j++ ) {
                var elem = grid.querySelectorAll('.row')[i]
                               .querySelectorAll('.col')[j]
                               .classList;

                if ( board[i][j] === '1' ) {

                    if ( !elem.contains('live') ) elem.add('live');

                } else {

                    if ( elem.contains('live') ) elem.remove('live');

                }
            }
        }
    }
};