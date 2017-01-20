var App = {

    allowUser: true,

    $grid: document.querySelector('.grid-container'),

    board: [],

    nextBoard: [],

    init: function() {
        App.$grid.addEventListener('click', App.draw, false);
    },

    draw: function(e) {
        var elem = e.target.classList;

        if ( !App.allowUser || !elem.contains('col') ) return;        

        elem.toggle('live');
    },

    start: function() {
        App.generateBoard();
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
        console.table(App.board);
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

        App.nextBoard = nextBoard;
        console.table(App.nextBoard);
    },

    checkNeighbors: function(row, col) {
        var board = App.board;

        return board[row][col]==='1' ? false : true;
    }

};

App.init();

/*
- read array, check each neighboor and generate next array
- update array with next array
- read array and update dom
*/