var App = {

    allowUser: true,

    status: 'pause',

    init: function() {    
        UI.init();
        Engine.init();
    },

    start: function() {
        App.status = 'running';
        App.allowUser = false;
        
        UI.enableButton('pause');
        UI.disableButton('clear');

        Engine.generateBoard();
        
        var run = setInterval(function() {
            if ( App.status !== 'running' ) {
                clearInterval(run);
            }

            Engine.generateNextBoard();
        }, 200);
    },

    pause: function() {
        if ( App.status === 'finish' ) {
            UI.disableButton('pause');
        }

        UI.enableButton('play');
        UI.enableButton('clear');

        App.status = 'pause';
        App.allowUser = true;        
    },

    clear: function() {
        Engine.clearBoard();

        UI.updateGrid();
        UI.disableButton('play');
    }

};

App.init();