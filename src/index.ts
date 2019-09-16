import Game from "./game";

let p1: string, p2: string;
while (!p1) {
  p1 = window.prompt('Enter player 1 name:');
}

while (!p2 && p1 !== p2) {
  p2 = window.prompt(p1 === p2
                     ? `Please enter a different name than ${p1}.`
                     : 'Enter player 2 name:');
}

window.onload = () => {
  const game = new Game(p1, p2)
  const turn: HTMLElement = document.getElementById('turn')
  const player: HTMLElement = document.getElementById('player')
  player.innerText = game.player

  document.querySelectorAll('td').forEach((el: HTMLElement) => {
    el.onclick = (evt: Event) => {
      const target = evt.target;
      if (isElement(target)) {
        target.innerText = game.sym
        target.onclick = undefined

        const [row, col] = [target.classList.item(0), target.classList.item(1)];
        game.turn(game.player, row, col)

        if (game.hasWinner()) {
          turn.innerText = `${game.player} wins!`
        } else {
          game.nextPlayer()
          player.innerText = game.player
        }
      }
    }
  })

  function isElement(el: EventTarget): el is HTMLElement {
    return (({}).hasOwnProperty.call(el, "innerText")) ;
  }
}
