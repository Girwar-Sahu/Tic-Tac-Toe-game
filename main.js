const game = {
    xTurn : true,
    xState : [],
    oState : [],
    winningState : [
        //rows
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],

        //columns
        ['0','3','6'],
        ['1','4','7'],
        ['2','5','8'],

        //diagonal
        ['0','4','8'],
        ['2','4','6']
    ]
}

$(document).click(function(event) {
    const target = event.target;
    // console.log(target);
    const isCell = target.classList.contains('grid-cell');
    // console.log(isCell);
    const isDisabled = target.classList.contains('disabled');

    if(isCell && !isDisabled){
        // blocks
        const cellValue = target.dataset.value;
        game.xTurn === true 
            ? game.xState.push(cellValue)
            : game.oState.push(cellValue)
        // console.log(game.xTurn);
        $(target).addClass('disabled');
        $(target).addClass(game.xTurn ? 'x' : 'o');
        game.xTurn = !game.xTurn;
    }

    if(!$('.grid-cell:not(.disabled)').length){
        $('.game-over').addClass('visible');
        $('.game-over-text').text('Draw!');
    }

    game.winningState.forEach(function(winningState) {
        const xWins = winningState.every(function(state){return game.xState.includes(state)});
        const oWins = winningState.every(function(state){return game.oState.includes(state)});
        // console.log(xWins,oWins);
        if(xWins || oWins){
            $('.grid-cell').addClass('disabled');
            $('.game-over').addClass('visible');
            $('.game-over-text').text(xWins ? 'X Wins!' : "O Wins!");
        }
    });

    $('.restart').click(function(){
        $('.game-over').removeClass('visible');
        $('.grid-cell').removeClass('disabled x o');
        game.xTurn = true;
        game.xState = [];
        game.oState = [];
    });
});

