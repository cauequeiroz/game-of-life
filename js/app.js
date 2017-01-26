var App = {

    allowUser: true,

    status: 'pause',

    $grid: document.querySelector('.grid-container'),

    $controls: document.querySelector('.controls'),

    board: [],

    init: function() {
        App.$grid.addEventListener('click', App.draw, false);
        App.$controls.addEventListener('click', App.userControl, false);
    },

    draw: function(e) {
        var elem = e.target.classList;

        if ( !App.allowUser || !elem.contains('col') ) return;        

        elem.toggle('live');
    },

    userControl: function(e) {
        var elem = e.target.classList;

        if ( elem.contains('disabled') ) return;

        var actions = {
            'play': App.start,
            'pause': App.pause,
            'reset': App.reset
        };

        actions[elem.item(1)] ();
        elem.add('disabled');
    },

    start: function() {
        App.status = 'running';
        App.allowUser = false;
        App.$controls.querySelector('.pause').classList.remove('disabled');

        App.generateBoard();
        
        var run = setInterval(function() {
            if ( App.status !== 'running' ) {
                clearInterval(run);
            }

            App.generateNextBoard();
        }, 200);
    },

    pause: function() {
        if ( App.status === 'finish' ) {
            App.$controls.querySelector('.pause').classList.add('disabled');
        }

        App.$controls.querySelector('.play').classList.remove('disabled');

        App.status = 'pause';
        App.allowUser = true;        
    },

    reset: function() {
        
    },

    generateBoard: function() {
        var grid  = App.$grid,
            board = [];
            line  = [];

        for ( var i=0; i<20; i++ ) {
            for ( var j=0; j<20; j++ ) {
                var elem = grid.querySelectorAll('.row')[i]
                               .querySelectorAll('.col')[j];

                line.push(elem.classList.contains('live') ? '1' : '0');
            }

            board.push(line);
            line = [];
        }

        App.board = board;
    },

    generateNextBoard: function() {
        var board     = App.board,
            nextBoard = [],
            line      = [];

        for ( var i=0; i<20; i++ ) {
            for ( var j=0; j<20; j++ ) {
                line.push(App.checkNeighbors(i, j) ? '1' : '0');
            }

            nextBoard.push(line);
            line = [];
        }

        if ( App.compareBoards(board, nextBoard) ) {
            App.status = 'finish';
            App.pause();
            return false;
        }

        App.board = nextBoard;
        App.updateGrid();
    },

    checkNeighbors: function(row, col) {
        var board = App.board,
            cell  = board[row][col],
            ref   = [row, col];
            neighbors = [];

        neighbors.push(
            App.getNeighbor(ref, 'top', 'left'),
            App.getNeighbor(ref, 'top', 'center'),
            App.getNeighbor(ref, 'top', 'right'),
            App.getNeighbor(ref, 'center', 'left'),
            App.getNeighbor(ref, 'center', 'right'),
            App.getNeighbor(ref, 'bottom', 'left'),
            App.getNeighbor(ref, 'bottom', 'center'),
            App.getNeighbor(ref, 'bottom', 'right')
        );

        neighbors = neighbors.filter(function(elem) {
            return elem === '1';
        }).length;

        return (cell === '1')
            ? (neighbors < 2 || neighbors > 3) ? false : true
            : (neighbors === 3);
    },

    getNeighbor: function(ref, y, x) {
        var board = App.board,
            row = {
                'top': ref[0]-1,
                'center': ref[0],
                'bottom': ref[0]+1
            },
            col = {
                'left': ref[1]-1,
                'center': ref[1],
                'right': ref[1]+1
            };

        return board[row[y]] !== undefined ? board[row[y]][col[x]] : '0';
    },

    compareBoards: function(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    },

    updateGrid: function() {
        var grid  = App.$grid,
            board = App.board;

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

App.init();