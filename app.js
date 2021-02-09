window.addEventListener("load", () => {
  const polja = document.querySelectorAll(".polje");
  console.log(polja);
  polja.forEach((polje) => {
    polje.addEventListener("click", clickHandler, { once: true });
  });
  let player1Turn = true;
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let player1 = [];
  let player2 = [];
  let nizPolja = Array.from(polja);
  //prikaz X i O
  function prikaz(turn, e) {
    let indeks = nizPolja.indexOf(e.target);
    if (turn) {
      polja.item(indeks).innerHTML = "X";
      player1.push(indeks);
      console.log("player1 " + player1);
    } else {
      polja.item(indeks).innerHTML = "O";
      player2.push(indeks);
      console.log("player2 " + player2);
    }
  }

  //clikc handler
  async function clickHandler(e) {
    //prikaz X i O na klik
    await prikaz(player1Turn, e);
    //provjera pobjednika
    if (provjeraPobjednika(player1)) {
      endGame("X");
    }
    if (provjeraPobjednika(player2)) {
      endGame("O");
    }
    //provjera nerijesenog rezultata
    if (
      nizPolja.every((p) => {
        return p.innerHTML != "";
      })
    ) {
      alert("Nerijeseno!");
      startGame();
    }
    //smjena igraca
    player1Turn = !player1Turn;
  }

  //restart game
  function startGame() {
    polja.forEach((polje) => {
      polje.removeEventListener("click", clickHandler, { once: true });
      polje.innerHTML = "";
    });
    player1 = [];
    player2 = [];
    polja.forEach((polje) => {
      polje.addEventListener("click", clickHandler, { once: true });
    });
    document.querySelector("#rezultat").style.visibility = "hidden";
  }

  document.querySelector("#restart").addEventListener("click", startGame);
  //provjera pobjednika
  function provjeraPobjednika(player) {
    return winningCombinations.some((com) => {
      return com.every((c) => {
        return player.some((pc) => {
          return pc == c;
        });
      });
    });
  }

  //end game func
  function endGame(player) {
    document.querySelector("#rezultat").style.visibility = "visible";
    document.querySelector("#rezultat h3").innerHTML = `${player} je pobijedio`;
  }
});
