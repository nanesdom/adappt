function firstGame()
{
errorCount = 0;
game = shuffle([1,2,3,4,5,6,7,8,9,0]);
numGame = -1;
totLetters = 0;
lttsCompl = 0;
setsWon = 0;
contentArray = [];
questions = [];
answers = [];
getContent(true);
}

function  chkLttr(lttr)
{
    document.getElementById(lttr).disabled = true;
    flag = true;
    var slots = document.getElementsByClassName("lttrSlot");

    for (i = 0; i < slots.length; i++)
    {
      if (slots[i].value == lttr) 
      {
        flag = false;
        slots[i].innerHTML = lttr;
        lttsCompl = lttsCompl + 1
        if (totLetters == lttsCompl)
        {
          winSet();
        }
      }
    }
    if (flag) { setError();}
}

function setError()
{
    errorCount = errorCount + 1;
    if (errorCount  < 6)
    {
      newImg = "sources/" + errorCount + "w.png";
      document.getElementById('imgBody').src= newImg;
    }
    else
    {
      newImg = "sources/" + errorCount + "w.png";
      document.getElementById('imgBody').src = newImg;
      reveal();
      errorCount = 0;
    }
}

function reveal()
{
  blockKeyboard();
  var slots = document.getElementsByClassName("lttrSlot");
  for (i = 0; i < slots.length; i++)
  {
    slots[i].style.background = "red";
    slots[i].innerHTML = slots[i].value;
  }
  document.getElementById('btnNext').innerHTML = "Siguiente";
  document.getElementById('btnNext').onclick = newGame;
}

function newGame()
{
  character = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  numGame = numGame + 1;
  //console.log(game[numGame]);
  if(numGame < 10)
  {
    document.getElementById('btnNext').innerHTML = "Resolver";
    document.getElementById('btnNext').onclick = reveal;
    document.getElementById('imgBody').src= "sources/0w.png";
    errorCount = 0;

    resetKeyboard();
    document.getElementById('question').innerHTML = questions[game[numGame]];
    document.getElementById('phrase').innerHTML = "";
    totLetters = 0;
    lttsCompl = 0;
    for (var i = 0; i < answers[game[numGame]].length; i++) 
    {
      console.log(answers[game[numGame]].substring(i, i+1));
      if(character.includes(answers[game[numGame]].substring(i, i+1)))
      {
        document.getElementById('phrase').innerHTML += '<button class="lttrSlot" value="' + answers[game[numGame]].substring(i, i+1) + '" disabled></button>';
        totLetters++;
      }
    }
  }
  else
  {
    gameOver();
  }
}

function gameOver()
{
  document.getElementById('Ahorcado').innerHTML = "<h1 class='resText'>Juegos Ganados: " + setsWon +"/10</h1>"
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function resetKeyboard()
{
  document.getElementById('A').disabled = false;
  document.getElementById('B').disabled = false;
  document.getElementById('C').disabled = false;
  document.getElementById('D').disabled = false;
  document.getElementById('E').disabled = false;
  document.getElementById('F').disabled = false;
  document.getElementById('G').disabled = false;
  document.getElementById('H').disabled = false;
  document.getElementById('I').disabled = false;
  document.getElementById('J').disabled = false;
  document.getElementById('K').disabled = false;
  document.getElementById('L').disabled = false;
  document.getElementById('M').disabled = false;
  document.getElementById('N').disabled = false;
  document.getElementById('Ñ').disabled = false;
  document.getElementById('O').disabled = false;
  document.getElementById('P').disabled = false;
  document.getElementById('Q').disabled = false;
  document.getElementById('R').disabled = false;
  document.getElementById('S').disabled = false;
  document.getElementById('T').disabled = false;
  document.getElementById('U').disabled = false;
  document.getElementById('V').disabled = false;
  document.getElementById('W').disabled = false;
  document.getElementById('X').disabled = false;
  document.getElementById('Y').disabled = false;
  document.getElementById('Z').disabled = false;
}

function blockKeyboard()
{
  document.getElementById('A').disabled = true;
  document.getElementById('B').disabled = true;
  document.getElementById('C').disabled = true;
  document.getElementById('D').disabled = true;
  document.getElementById('E').disabled = true;
  document.getElementById('F').disabled = true;
  document.getElementById('G').disabled = true;
  document.getElementById('H').disabled = true;
  document.getElementById('I').disabled = true;
  document.getElementById('J').disabled = true;
  document.getElementById('K').disabled = true;
  document.getElementById('L').disabled = true;
  document.getElementById('M').disabled = true;
  document.getElementById('N').disabled = true;
  document.getElementById('Ñ').disabled = true;
  document.getElementById('O').disabled = true;
  document.getElementById('P').disabled = true;
  document.getElementById('Q').disabled = true;
  document.getElementById('R').disabled = true;
  document.getElementById('S').disabled = true;
  document.getElementById('T').disabled = true;
  document.getElementById('U').disabled = true;
  document.getElementById('V').disabled = true;
  document.getElementById('W').disabled = true;
  document.getElementById('X').disabled = true;
  document.getElementById('Y').disabled = true;
  document.getElementById('Z').disabled = true; 
}

function winSet()
{
  blockKeyboard();
  var slots = document.getElementsByClassName("lttrSlot");
  for (i = 0; i < slots.length; i++)
  {
    slots[i].style.background = "green";

  }
  document.getElementById('btnNext').innerHTML = "Siguiente";
  document.getElementById('btnNext').onclick = newGame;
  setsWon = setsWon + 1;
}

function getContent(flag)
{
  fetch('/SocialApp/sources/questions.txt')
  .then(res => res.text())
  .then(content => {
    let lines = content.split(/\n/);
    lines.forEach(line => contentArray.push(line));
    divideQuestions(contentArray, flag);
  });
}

function divideQuestions(arr, flag)
{
  for (i = 0; i < arr.length; i++)
  {
    if(i % 2 == 0)
    {
      questions.push(arr[i]);
    }
    else
    {
      answers.push(arr[i]);
    }
  }
  if (flag)
  {
    newGame();
  } else {
    getQuestions();
  }
  
}

function loadSet()
{
  contentArray = [];
questions = [];
answers = [];
  getContent(false);
}

function getQuestions()
{   
  var sel = document.getElementById('preguntas');
  for(var i = 0; i < questions.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = questions[i];
    opt.value = i;
    sel.appendChild(opt);
  }
}

function newQuestion()
{
  var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/newQuestion.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    p = document.getElementById('newPregunta').value;
    q = document.getElementById('newRespuesta').value;
    
    xhttp.send('p=' + p + '&q=' + q);
}

function deleteQuestion()
{
  var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "php/deleteQuestion.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    p = document.getElementById('preguntas').value;
    
    xhttp.send('p=' + p);
}